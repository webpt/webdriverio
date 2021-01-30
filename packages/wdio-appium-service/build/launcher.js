"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const child_process_1 = require("child_process");
const fs_extra_1 = require("fs-extra");
const util_1 = require("util");
const config_1 = require("@wdio/config");
const utils_1 = require("./utils");
const log = logger_1.default('@wdio/appium-service');
const DEFAULT_LOG_FILENAME = 'wdio-appium.log';
const DEFAULT_CONNECTION = {
    protocol: 'http',
    hostname: 'localhost',
    port: 4723,
    path: '/'
};
class AppiumLauncher {
    constructor(_options, _capabilities, _config) {
        var _a;
        this._options = _options;
        this._capabilities = _capabilities;
        this._config = _config;
        this._appiumCliArgs = [];
        this._args = {
            basePath: DEFAULT_CONNECTION.path,
            ...(this._options.args || {})
        };
        this._logPath = _options.logPath || ((_a = this._config) === null || _a === void 0 ? void 0 : _a.outputDir);
        this._command = this._getCommand(_options.command);
    }
    _getCommand(command) {
        if (!command) {
            command = 'node';
            this._appiumCliArgs.push(AppiumLauncher._getAppiumCommand());
        }
        if (process.platform === 'win32') {
            this._appiumCliArgs.unshift('/c', command);
            command = 'cmd';
        }
        return command;
    }
    _setCapabilities() {
        if (!Array.isArray(this._capabilities)) {
            for (const [, capability] of Object.entries(this._capabilities)) {
                const cap = capability.capabilities || capability;
                const c = cap.alwaysMatch || cap;
                !config_1.isCloudCapability(c) && Object.assign(capability, DEFAULT_CONNECTION, 'port' in this._args ? { port: this._args.port } : {}, { path: this._args.basePath }, { ...capability });
            }
            return;
        }
        this._capabilities.forEach((cap) => !config_1.isCloudCapability(cap.alwaysMatch || cap) && Object.assign(cap, DEFAULT_CONNECTION, 'port' in this._args ? { port: this._args.port } : {}, { path: this._args.basePath }, { ...cap }));
    }
    async onPrepare() {
        this._appiumCliArgs.push(...utils_1.formatCliArgs(this._args));
        this._setCapabilities();
        this._process = await util_1.promisify(this._startAppium)(this._command, this._appiumCliArgs);
        if (this._logPath) {
            this._redirectLogStream(this._logPath);
        }
    }
    onComplete() {
        if (this._process) {
            log.debug(`Appium (pid: ${this._process.pid}) killed`);
            this._process.kill();
        }
    }
    _startAppium(command, args, callback) {
        log.debug(`Will spawn Appium process: ${command} ${args.join(' ')}`);
        let process = child_process_1.spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
        let error;
        process.stdout.on('data', (data) => {
            if (data.includes('Appium REST http interface listener started')) {
                log.debug(`Appium started with ID: ${process.pid}`);
                callback(null, process);
            }
        });
        process.stderr.once('data', err => { error = err; });
        process.once('exit', exitCode => {
            let errorMessage = `Appium exited before timeout (exit code: ${exitCode})`;
            if (exitCode == 2) {
                errorMessage += '\n' + (error || 'Check that you don\'t already have a running Appium service.');
                log.error(errorMessage);
            }
            callback(new Error(errorMessage), null);
        });
    }
    _redirectLogStream(logPath) {
        if (!this._process) {
            throw Error('No Appium process to redirect log stream');
        }
        const logFile = utils_1.getFilePath(logPath, DEFAULT_LOG_FILENAME);
        fs_extra_1.ensureFileSync(logFile);
        log.debug(`Appium logs written to: ${logFile}`);
        const logStream = fs_extra_1.createWriteStream(logFile, { flags: 'w' });
        this._process.stdout.pipe(logStream);
        this._process.stderr.pipe(logStream);
    }
    static _getAppiumCommand(moduleName = 'appium') {
        try {
            return require.resolve(moduleName);
        }
        catch (err) {
            log.error('Appium is not installed locally.\n' +
                'If you use globally installed appium please add\n' +
                "appium: { command: 'appium' }\n" +
                'to your wdio.conf.js!');
            throw err;
        }
    }
}
exports.default = AppiumLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBaUM7QUFDakMsaURBQTBEO0FBQzFELHVDQUE0RDtBQUM1RCwrQkFBZ0M7QUFFaEMseUNBQWdEO0FBR2hELG1DQUFvRDtBQUdwRCxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFDMUMsTUFBTSxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQTtBQUU5QyxNQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLElBQUksRUFBRSxJQUFJO0lBQ1YsSUFBSSxFQUFFLEdBQUc7Q0FDWixDQUFBO0FBRUQsTUFBcUIsY0FBYztJQU8vQixZQUNZLFFBQTZCLEVBQzdCLGFBQThDLEVBQzlDLE9BQTRCOztRQUY1QixhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUM7UUFDOUMsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFSdkIsbUJBQWMsR0FBYSxFQUFFLENBQUE7UUFVMUMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7U0FDaEMsQ0FBQTtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sV0FBSSxJQUFJLENBQUMsT0FBTywwQ0FBRSxTQUFTLENBQUEsQ0FBQTtRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFTyxXQUFXLENBQUMsT0FBZ0I7UUFLaEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8s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