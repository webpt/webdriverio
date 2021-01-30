"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const events_1 = require("events");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const config_1 = require("@wdio/config");
const reporter_1 = __importDefault(require("./reporter"));
const utils_2 = require("./utils");
const log = logger_1.default('@wdio/runner');
class Runner extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._configParser = new config_1.ConfigParser();
        this._sigintWasCalled = false;
        this._isMultiremote = false;
        this._specFileRetryAttempts = 0;
    }
    async run({ cid, args, specs, caps, configFile, retries }) {
        this._cid = cid;
        this._specs = specs;
        this._caps = caps;
        try {
            this._configParser.addConfigFile(configFile);
        }
        catch (e) {
            return this._shutdown(1, retries);
        }
        this._configParser.merge(args);
        this._config = this._configParser.getConfig();
        this._specFileRetryAttempts = (this._config.specFileRetries || 0) - (retries || 0);
        logger_1.default.setLogLevelsConfig(this._config.logLevels, this._config.logLevel);
        const isMultiremote = this._isMultiremote = !Array.isArray(this._configParser.getCapabilities());
        let browser = await this._startSession({
            ...this._config,
            _automationProtocol: this._config.automationProtocol,
            automationProtocol: './protocol-stub'
        }, caps);
        utils_1.initialiseWorkerService(this._config, caps, args.ignoredWorkerServices).map(this._configParser.addService.bind(this._configParser));
        await utils_1.executeHooksWithArgs('beforeSession', this._config.beforeSession, [this._config, this._caps, this._specs]);
        this._reporter = new reporter_1.default(this._config, this._cid, { ...caps });
        this._framework = utils_1.initialisePlugin(this._config.framework, 'framework').default;
        this._framework = await this._framework.init(cid, this._config, specs, caps, this._reporter);
        process.send({ name: 'testFrameworkInit', content: { cid, caps, specs, hasTests: this._framework.hasTests() } });
        if (!this._framework.hasTests()) {
            return this._shutdown(0, retries);
        }
        browser = await this._initSession(this._config, this._caps, browser);
        if (!browser) {
            return this._shutdown(1, retries);
        }
        this._reporter.caps = browser.capabilities;
        await utils_1.executeHooksWithArgs('before', this._config.before, [this._caps, this._specs, browser]);
        if (this._sigintWasCalled) {
            log.info('SIGINT signal detected while starting session, shutting down...');
            await this.endSession();
            return this._shutdown(0, retries);
        }
        const multiRemoteBrowser = browser;
        this._reporter.emit('runner:start', {
            cid,
            specs,
            config: this._config,
            isMultiremote,
            sessionId: browser.sessionId,
            capabilities: isMultiremote
                ? multiRemoteBrowser.instances.reduce((caps, browserName) => {
                    caps[browserName] = multiRemoteBrowser[browserName].capabilities;
                    caps[browserName].sessionId = multiRemoteBrowser[browserName].sessionId;
                    return caps;
                }, {})
                : { ...browser.capabilities, sessionId: browser.sessionId },
            retry: this._specFileRetryAttempts
        });
        const { protocol, hostname, port, path, queryParams } = browser.options;
        const { isW3C, sessionId } = browser;
        const instances = utils_2.getInstancesData(browser, isMultiremote);
        process.send({
            origin: 'worker',
            name: 'sessionStarted',
            content: { sessionId, isW3C, protocol, hostname, port, path, queryParams, isMultiremote, instances }
        });
        let failures = 0;
        try {
            failures = await this._framework.run();
            await this._fetchDriverLogs(this._config, caps.excludeDriverLogs);
        }
        catch (e) {
            log.error(e);
            this.emit('error', e);
            failures = 1;
        }
        if (!args.watch) {
            await this.endSession();
        }
        return this._shutdown(failures, retries);
    }
    async _initSession(config, caps, browserStub) {
        const browser = await this._startSession(config, caps);
        if (!browser) {
            return;
        }
        if (browserStub) {
            Object.entries(browserStub).forEach(([key, value]) => {
                if (typeof browser[key] === 'undefined') {
                    browser[key] = value;
                }
            });
        }
        global.$ = (selector) => browser.$(selector);
        global.$$ = (selector) => browser.$$(selector);
        browser.on('command', (command) => { var _a; return (_a = this._reporter) === null || _a === void 0 ? void 0 : _a.emit('client:beforeCommand', Object.assign(command, { sessionId: browser.sessionId })); });
        browser.on('result', (result) => { var _a; return (_a = this._reporter) === null || _a === void 0 ? void 0 : _a.emit('client:afterCommand', Object.assign(result, { sessionId: browser.sessionId })); });
        return browser;
    }
    async _startSession(config, caps) {
        let browser;
        try {
            browser = global.browser = global.driver = await utils_2.initialiseInstance(config, caps, this._isMultiremote);
        }
        catch (e) {
            log.error(e);
            return;
        }
        browser.config = config;
        return browser;
    }
    async _fetchDriverLogs(config, excludeDriverLogs) {
        if (!config.outputDir ||
            !global.browser.sessionId ||
            typeof global.browser.getLogs === 'undefined') {
            return;
        }
        global._HAS_FIBER_CONTEXT = true;
        let logTypes;
        try {
            logTypes = await global.browser.getLogTypes();
        }
        catch (errIgnored) {
            return;
        }
        logTypes = utils_2.filterLogTypes(excludeDriverLogs, logTypes);
        log.debug(`Fetching logs for ${logTypes.join(', ')}`);
        return Promise.all(logTypes.map(async (logType) => {
            let logs;
            try {
                logs = await global.browser.getLogs(logType);
            }
            catch (e) {
                return log.warn(`Couldn't fetch logs for ${logType}: ${e.message}`);
            }
            if (logs.length === 0) {
                return;
            }
            const stringLogs = logs.map((log) => JSON.stringify(log)).join('\n');
            return util_1.default.promisify(fs_1.default.writeFile)(path_1.default.join(config.outputDir, `wdio-${this._cid}-${logType}.log`), stringLogs, 'utf-8');
        }));
    }
    async _shutdown(failures, retries) {
        this._reporter.emit('runner:end', {
            failures,
            cid: this._cid,
            retries
        });
        try {
            await this._reporter.waitForSync();
        }
        catch (e) {
            log.error(e);
        }
        this.emit('exit', failures === 0 ? 0 : 1);
        return failures;
    }
    async endSession() {
        const multiremoteBrowser = global.browser;
        const hasSessionId = Boolean(global.browser) && (this._isMultiremote
            ? !multiremoteBrowser.instances.some(i => multiremoteBrowser[i] && !multiremoteBrowser[i].sessionId)
            : global.browser.sessionId);
        if (!hasSessionId) {
            return;
        }
        const capabilities = global.browser.capabilities || {};
        if (this._isMultiremote) {
            multiremoteBrowser.instances.forEach((browserName) => {
                capabilities[browserName] = multiremoteBrowser[browserName].capabilities;
            });
        }
        await global.browser.deleteSession();
        if (this._isMultiremote) {
            multiremoteBrowser.instances.forEach(i => {
                delete multiremoteBrowser[i].sessionId;
            });
        }
        else {
            delete global.browser.sessionId;
        }
        await utils_1.executeHooksWithArgs('afterSession', global.browser.config.afterSession, [this._config, capabilities, this._specs]);
    }
}
exports.default = Runner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBQ3ZCLGdEQUF1QjtBQUN2QixtQ0FBcUM7QUFFckMsMERBQWlDO0FBQ2pDLHVDQUE2RjtBQUM3Rix5Q0FBMkM7QUFJM0MsMERBQXFDO0FBQ3JDLG1DQUE4RTtBQUU5RSxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBZ0RsQyxNQUFxQixNQUFPLFNBQVEscUJBQVk7SUFBaEQ7O1FBQ1ksa0JBQWEsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQTtRQUNsQyxxQkFBZ0IsR0FBRyxLQUFLLENBQUE7UUFDeEIsbUJBQWMsR0FBRyxLQUFLLENBQUE7UUFDdEIsMkJBQXNCLEdBQUcsQ0FBQyxDQUFBO0lBMFh0QyxDQUFDO0lBdldHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBYTtRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBS2pCLElBQUk7WUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUMvQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNwQztRQUtELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRTlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQXdCLENBQUE7UUFDbkUs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