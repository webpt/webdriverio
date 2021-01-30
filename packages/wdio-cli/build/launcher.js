"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const async_exit_hook_1 = __importDefault(require("async-exit-hook"));
const logger_1 = __importDefault(require("@wdio/logger"));
const config_1 = require("@wdio/config");
const utils_1 = require("@wdio/utils");
const interface_1 = __importDefault(require("./interface"));
const utils_2 = require("./utils");
const log = logger_1.default('@wdio/cli:launcher');
class Launcher {
    constructor(_configFilePath, _args = {}, _isWatchMode = false) {
        this._configFilePath = _configFilePath;
        this._args = _args;
        this._isWatchMode = _isWatchMode;
        this._exitCode = 0;
        this._hasTriggeredExitRoutine = false;
        this._schedule = [];
        this._rid = [];
        this._runnerStarted = 0;
        this._runnerFailed = 0;
        this.configParser = new config_1.ConfigParser();
        this.configParser.addConfigFile(_configFilePath);
        this.configParser.merge(_args);
        const config = this.configParser.getConfig();
        const capabilities = this.configParser.getCapabilities();
        this.isMultiremote = !Array.isArray(capabilities);
        if (config.outputDir) {
            fs_extra_1.default.ensureDirSync(path_1.default.join(config.outputDir));
            process.env.WDIO_LOG_PATH = path_1.default.join(config.outputDir, 'wdio.log');
        }
        logger_1.default.setLogLevelsConfig(config.logLevels, config.logLevel);
        const totalWorkerCnt = Array.isArray(capabilities)
            ? capabilities
                .map((c) => this.configParser.getSpecs(c.specs, c.exclude).length)
                .reduce((a, b) => a + b, 0)
            : 1;
        const Runner = utils_1.initialisePlugin(config.runner, 'runner').default;
        this.runner = new Runner(_configFilePath, config);
        this.interface = new interface_1.default(config, totalWorkerCnt, this._isWatchMode);
        config.runnerEnv.FORCE_COLOR = Number(this.interface.hasAnsiSupport);
    }
    async run() {
        async_exit_hook_1.default(this.exitHandler.bind(this));
        let exitCode = 0;
        let error = undefined;
        try {
            const config = this.configParser.getConfig();
            const caps = this.configParser.getCapabilities();
            const { ignoredWorkerServices, launcherServices } = utils_1.initialiseLauncherService(config, caps);
            this._launcher = launcherServices;
            this._args.ignoredWorkerServices = ignoredWorkerServices;
            await this.runner.initialise();
            log.info('Run onPrepare hook');
            await utils_2.runLauncherHook(config.onPrepare, config, caps);
            await utils_2.runServiceHook(this._launcher, 'onPrepare', config, caps);
            exitCode = await this.runMode(config, caps);
            log.info('Run onComplete hook');
            await utils_2.runServiceHook(this._launcher, 'onComplete', exitCode, config, caps);
            const onCompleteResults = await utils_2.runOnCompleteHook(config.onComplete, config, caps, exitCode, this.interface.result);
            exitCode = onCompleteResults.includes(1) ? 1 : exitCode;
            await logger_1.default.waitForBuffer();
            this.interface.finalise();
        }
        catch (err) {
            error = err;
        }
        finally {
            if (!this._hasTriggeredExitRoutine) {
                this._hasTriggeredExitRoutine = true;
                await this.runner.shutdown();
            }
        }
        if (error) {
            throw error;
        }
        return exitCode;
    }
    runMode(config, caps) {
        if (!caps) {
            return new Promise((resolve) => {
                log.error('Missing capabilities, exiting with failure');
                return resolve(1);
            });
        }
        const specFileRetries = this._isWatchMode ? 0 : config.specFileRetries;
        let cid = 0;
        if (this.isMultiremote) {
            this._schedule.push({
                cid: cid++,
                caps,
                specs: this.configParser.getSpecs(caps.specs, caps.exclude).map(s => ({ files: [s], retries: specFileRetries })),
                availableInstances: config.maxInstances || 1,
                runningInstances: 0
            });
        }
        else {
            for (let capabilities of caps) {
                this._schedule.push({
                    cid: cid++,
                    caps: capabilities,
                    specs: this.configParser.getSpecs(capabilities.specs, capabilities.exclude).map(s => ({ files: [s], retries: specFileRetries })),
                    availableInstances: capabilities.maxInstances || config.maxInstancesPerCapability,
                    runningInstances: 0
                });
            }
        }
        return new Promise((resolve) => {
            this._resolve = resolve;
            if (Object.values(this._schedule).reduce((specCnt, schedule) => specCnt + schedule.specs.length, 0) === 0) {
                log.error('No specs found to run, exiting with failure');
                return resolve(1);
            }
            if (this.runSpecs()) {
                resolve(0);
            }
        });
    }
    runSpecs() {
        let config = this.configParser.getConfig();
        if (this._hasTriggeredExitRoutine) {
            return true;
        }
        while (this.getNumberOfRunningInstances() < config.maxInstances) {
            let schedulableCaps = this._schedule
                .filter(() => {
                const filter = typeof config.bail !== 'number' || config.bail < 1 ||
                    config.bail > this._runnerFailed;
                if (!filter) {
                    this._schedule.forEach((t) => { t.specs = []; });
                }
                return filter;
            })
                .filter(() => this.getNumberOfRunningInstances() < config.maxInstances)
                .filter((a) => a.availableInstances > 0)
                .filter((a) => a.specs.length > 0)
                .sort((a, b) => a.runningInstances - b.runningInstances);
            if (schedulableCaps.length === 0) {
                break;
            }
            let specs = schedulableCaps[0].specs.shift();
            this.startInstance(specs.files, schedulableCaps[0].caps, schedulableCaps[0].cid, specs.rid, specs.retries);
            schedulableCaps[0].availableInstances--;
            schedulableCaps[0].runningInstances++;
        }
        return this.getNumberOfRunningInstances() === 0 && this.getNumberOfSpecsLeft() === 0;
    }
    getNumberOfRunningInstances() {
        return this._schedule.map((a) => a.runningInstances).reduce((a, b) => a + b);
    }
    getNumberOfSpecsLeft() {
        return this._schedule.map((a) => a.specs.length).reduce((a, b) => a + b);
    }
    async startInstance(specs, caps, cid, rid, retries) {
        let config = this.configParser.getConfig();
        if (typeof config.specFileRetriesDelay === 'number' && config.specFileRetries > 0 && config.specFileRetries !== retries) {
            await utils_1.sleep(config.specFileRetriesDelay * 1000);
        }
        const runnerId = rid || this.getRunnerId(cid);
        let processNumber = this._runnerStarted + 1;
        let debugArgs = [];
        let debugType;
        let debugHost = '';
        let debugPort = process.debugPort;
        for (let i in process.execArgv) {
            const debugArgs = process.execArgv[i].match('--(debug|inspect)(?:-brk)?(?:=(.*):)?');
            if (debugArgs) {
                let [, type, host] = debugArgs;
                if (type) {
                    debugType = type;
                }
                if (host) {
                    debugHost = `${host}:`;
                }
            }
        }
        if (debugType) {
            debugArgs.push(`--${debugType}=${debugHost}${(debugPort + processNumber)}`);
        }
        let capExecArgs = [...(config.execArgv || [])];
        let defaultArgs = (capExecArgs.length) ? process.execArgv : [];
        let execArgv = [...defaultArgs, ...debugArgs, ...capExecArgs];
        this._runnerStarted++;
        log.info('Run onWorkerStart hook');
        await utils_2.runLauncherHook(config.onWorkerStart, runnerId, caps, specs, this._args, execArgv);
        await utils_2.runServiceHook(this._launcher, 'onWorkerStart', runnerId, caps, specs, this._args, execArgv);
        const worker = this.runner.run({
            cid: runnerId,
            command: 'run',
            configFile: this._configFilePath,
            args: this._args,
            caps,
            specs,
            execArgv,
            retries
        });
        worker.on('message', this.interface.onMessage.bind(this.interface));
        worker.on('error', this.interface.onMessage.bind(this.interface));
        worker.on('exit', this.endHandler.bind(this));
    }
    getRunnerId(cid) {
        if (!this._rid[cid]) {
            this._rid[cid] = 0;
        }
        return `${cid}-${this._rid[cid]++}`;
    }
    endHandler({ cid: rid, exitCode, specs, retries }) {
        const passed = this._isWatchModeHalted() || exitCode === 0;
        if (!passed && retries > 0) {
            const requeue = this.configParser.getConfig().specFileRetriesDeferred !== false ? 'push' : 'unshift';
            this._schedule[parseInt(rid, 10)].specs[requeue]({ files: specs, retries: retries - 1, rid });
        }
        else {
            this._exitCode = this._isWatchModeHalted() ? 0 : this._exitCode || exitCode;
            this._runnerFailed += !passed ? 1 : 0;
        }
        if (!this._isWatchModeHalted()) {
            this.interface.emit('job:end', { cid: rid, passed, retries });
        }
        const cid = parseInt(rid, 10);
        this._schedule[cid].availableInstances++;
        this._schedule[cid].runningInstances--;
        const shouldRunSpecs = this.runSpecs();
        if (!shouldRunSpecs || (this._isWatchMode && !this._hasTriggeredExitRoutine)) {
            return;
        }
        if (this._resolve) {
            this._resolve(passed ? this._exitCode : 1);
        }
    }
    exitHandler(callback) {
        if (!callback) {
            return;
        }
        if (this._hasTriggeredExitRoutine) {
            return callback();
        }
        this._hasTriggeredExitRoutine = true;
        this.interface.sigintTrigger();
        return this.runner.shutdown().then(callback);
    }
    _isWatchModeHalted() {
        return this._isWatchMode && this._hasTriggeredExitRoutine;
    }
}
exports.default = Launcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsd0RBQXlCO0FBQ3pCLHNFQUFzQztBQUV0QywwREFBaUM7QUFDakMseUNBQTJDO0FBQzNDLHVDQUFnRjtBQUdoRiw0REFBcUM7QUFFckMsbUNBQTRFO0FBRTVFLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtBQXVCeEMsTUFBTSxRQUFRO0lBZ0JWLFlBQ1ksZUFBdUIsRUFDdkIsUUFBc0MsRUFBRSxFQUN4QyxlQUFlLEtBQUs7UUFGcEIsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFDdkIsVUFBSyxHQUFMLEtBQUssQ0FBbUM7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQVE7UUFieEIsY0FBUyxHQUFHLENBQUMsQ0FBQTtRQUNiLDZCQUF3QixHQUFHLEtBQUssQ0FBQTtRQUNoQyxjQUFTLEdBQWUsRUFBRSxDQUFBO1FBQzFCLFNBQUksR0FBYSxFQUFFLENBQUE7UUFDbkIsbUJBQWMsR0FBRyxDQUFDLENBQUE7UUFDbEIsa0JBQWEsR0FBRyxDQUFDLENBQUE7UUFVckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUU5QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUF1RyxDQUFBO1FBQzdKLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FB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