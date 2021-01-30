"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const commands_1 = __importDefault(require("./commands"));
const auditor_1 = __importDefault(require("./auditor"));
const pwa_1 = __importDefault(require("./gatherer/pwa"));
const trace_1 = __importDefault(require("./gatherer/trace"));
const coverage_1 = __importDefault(require("./gatherer/coverage"));
const devtools_1 = __importDefault(require("./gatherer/devtools"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/devtools-service');
const TRACE_COMMANDS = ['click', 'navigateTo', 'url'];
class DevToolsService {
    constructor(_options) {
        this._options = _options;
        this._isSupported = false;
        this._shouldRunPerformanceAudits = false;
        this._page = null;
    }
    beforeSession(_, caps) {
        if (!utils_1.isBrowserSupported(caps)) {
            return log.error(constants_1.UNSUPPORTED_ERROR_MESSAGE);
        }
        this._isSupported = true;
    }
    before(caps, specs, browser) {
        this._browser = browser;
        this._isSupported = this._isSupported || Boolean(this._browser.puppeteer);
        return this._setupHandler();
    }
    async onReload() {
        if (!this._browser) {
            return;
        }
        delete this._browser.puppeteer;
        return this._setupHandler();
    }
    async beforeCommand(commandName, params) {
        if (!this._shouldRunPerformanceAudits || !this._traceGatherer || this._traceGatherer.isTracing || !TRACE_COMMANDS.includes(commandName)) {
            return;
        }
        this._setThrottlingProfile(this._networkThrottling, this._cpuThrottling, this._cacheEnabled);
        const url = ['url', 'navigateTo'].some(cmdName => cmdName === commandName)
            ? params[0]
            : constants_1.CLICK_TRANSITION;
        return this._traceGatherer.startTracing(url);
    }
    async afterCommand(commandName) {
        if (!this._traceGatherer || !this._traceGatherer.isTracing || !TRACE_COMMANDS.includes(commandName)) {
            return;
        }
        this._traceGatherer.once('tracingComplete', (traceEvents) => {
            var _a;
            const auditor = new auditor_1.default(traceEvents, (_a = this._devtoolsGatherer) === null || _a === void 0 ? void 0 : _a.getLogs(), this._formFactor);
            auditor.updateCommands(this._browser);
        });
        this._traceGatherer.once('tracingError', (err) => {
            const auditor = new auditor_1.default();
            auditor.updateCommands(this._browser, () => {
                throw new Error(`Couldn't capture performance due to: ${err.message}`);
            });
        });
        return new Promise((resolve) => {
            var _a;
            log.info(`Wait until tracing for command ${commandName} finishes`);
            (_a = this._traceGatherer) === null || _a === void 0 ? void 0 : _a.once('tracingFinished', async () => {
                log.info('Disable throttling');
                await this._setThrottlingProfile('online', 0, true);
                log.info('continuing with next WebDriver command');
                resolve();
            });
        });
    }
    async after() {
        if (this._coverageGatherer) {
            await this._coverageGatherer.logCoverage();
        }
    }
    _enablePerformanceAudits({ networkThrottling, cpuThrottling, cacheEnabled, formFactor } = constants_1.DEFAULT_THROTTLE_STATE) {
        if (!constants_1.NETWORK_STATES[networkThrottling]) {
            throw new Error(`Network throttling profile "${networkThrottling}" is unknown, choose between ${Object.keys(constants_1.NETWORK_STATES).join(', ')}`);
        }
        if (typeof cpuThrottling !== 'number') {
            throw new Error(`CPU throttling rate needs to be typeof number but was "${typeof cpuThrottling}"`);
        }
        this._networkThrottling = networkThrottling;
        this._cpuThrottling = cpuThrottling;
        this._cacheEnabled = Boolean(cacheEnabled);
        this._formFactor = formFactor;
        this._shouldRunPerformanceAudits = true;
    }
    _disablePerformanceAudits() {
        this._shouldRunPerformanceAudits = false;
    }
    async _emulateDevice(device, inLandscape) {
        if (!this._page) {
            throw new Error('No page has been captured yet');
        }
        if (typeof device === 'string') {
            const deviceName = device + (inLandscape ? ' landscape' : '');
            const deviceCapabilities = puppeteer_core_1.default.devices[deviceName];
            if (!deviceCapabilities) {
                const deviceNames = Object.values(puppeteer_core_1.default.devices)
                    .map((device) => device.name)
                    .filter((device) => !device.endsWith('landscape'));
                throw new Error(`Unknown device, available options: ${deviceNames.join(', ')}`);
            }
            return this._page.emulate(deviceCapabilities);
        }
        return this._page.emulate(device);
    }
    async _setThrottlingProfile(networkThrottling = constants_1.DEFAULT_THROTTLE_STATE.networkThrottling, cpuThrottling = constants_1.DEFAULT_THROTTLE_STATE.cpuThrottling, cacheEnabled = constants_1.DEFAULT_THROTTLE_STATE.cacheEnabled) {
        if (!this._page || !this._session) {
            throw new Error('No page or session has been captured yet');
        }
        await this._page.setCacheEnabled(Boolean(cacheEnabled));
        await this._session.send('Emulation.setCPUThrottlingRate', { rate: cpuThrottling });
        await this._session.send('Network.emulateNetworkConditions', constants_1.NETWORK_STATES[networkThrottling]);
    }
    async _checkPWA(auditsToBeRun = []) {
        const auditor = new auditor_1.default();
        const artifacts = await this._pwaGatherer.gatherData();
        return auditor._auditPWA(artifacts, auditsToBeRun);
    }
    _getCoverageReport() {
        return this._coverageGatherer.getCoverageReport();
    }
    async _setupHandler() {
        var _a;
        if (!this._isSupported || !this._browser) {
            return utils_1.setUnsupportedCommand(this._browser);
        }
        this._puppeteer = await this._browser.getPuppeteer();
        if (!this._puppeteer) {
            throw new Error('Could not initiate Puppeteer instance');
        }
        this._target = await this._puppeteer.waitForTarget((t) => t.type() === 'page');
        if (!this._target) {
            throw new Error('No page target found');
        }
        this._page = await this._target.page();
        if (!this._page) {
            throw new Error('No page found');
        }
        this._session = await this._target.createCDPSession();
        new commands_1.default(this._session, this._page, this._browser);
        this._traceGatherer = new trace_1.default(this._session, this._page);
        this._session.on('Page.loadEventFired', this._traceGatherer.onLoadEventFired.bind(this._traceGatherer));
        this._session.on('Page.frameNavigated', this._traceGatherer.onFrameNavigated.bind(this._traceGatherer));
        this._page.on('requestfailed', this._traceGatherer.onFrameLoadFail.bind(this._traceGatherer));
        await Promise.all(['Page', 'Network', 'Console'].map((domain) => {
            var _a;
            return Promise.all([
                (_a = this._session) === null || _a === void 0 ? void 0 : _a.send(`${domain}.enable`)
            ]);
        }));
        if ((_a = this._options.coverageReporter) === null || _a === void 0 ? void 0 : _a.enable) {
            this._coverageGatherer = new coverage_1.default(this._page, this._options.coverageReporter);
            this._browser.addCommand('getCoverageReport', this._getCoverageReport.bind(this));
            await this._coverageGatherer.init();
        }
        this._devtoolsGatherer = new devtools_1.default();
        this._puppeteer['_connection']._transport._ws.addEventListener('message', (event) => {
            var _a;
            const data = JSON.parse(event.data);
            (_a = this._devtoolsGatherer) === null || _a === void 0 ? void 0 : _a.onMessage(data);
            const method = data.method || 'event';
            log.debug(`cdp event: ${method} with params ${JSON.stringify(data.params)}`);
            if (this._browser) {
                this._browser.emit(method, data.params);
            }
        });
        this._browser.addCommand('enablePerformanceAudits', this._enablePerformanceAudits.bind(this));
        this._browser.addCommand('disablePerformanceAudits', this._disablePerformanceAudits.bind(this));
        this._browser.addCommand('emulateDevice', this._emulateDevice.bind(this));
        this._pwaGatherer = new pwa_1.default(this._session, this._page);
        this._browser.addCommand('checkPWA', this._checkPWA.bind(this));
    }
}
exports.default = DevToolsService;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWlDO0FBQ2pDLG9FQUEwQztBQVMxQywwREFBdUM7QUFDdkMsd0RBQStCO0FBQy9CLHlEQUF3QztBQUN4Qyw2REFBNEM7QUFDNUMsbUVBQWtEO0FBQ2xELG1FQUFpRjtBQUNqRixtQ0FBbUU7QUFDbkUsMkNBQWlIO0FBR2pILE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtBQUM1QyxNQUFNLGNBQWMsR0FBRyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFFckQsTUFBcUIsZUFBZTtJQW9CaEMsWUFBcUIsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFuQnJDLGlCQUFZLEdBQUcsS0FBSyxDQUFBO1FBQ3BCLGdDQUEyQixHQUFHLEtBQUssQ0FBQTtRQUluQyxVQUFLLEdBQWdCLElBQUksQ0FBQTtJQWNlLENBQUM7SUFFakQsYUFBYSxDQUFFLENBQVUsRUFBRSxJQUErQjtRQUN0RCxJQUFJLENBQUMsMEJBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLHFDQUF5QixDQUFDLENBQUE7U0FDOUM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtJQUM1QixDQUFDO0lBRUQsTUFBTSxDQUNGLElBQW1DLEVBQ25DLEtBQWUsRUFDZixPQUF1RDtRQUV2RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDekUsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDL0IsQ0FB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