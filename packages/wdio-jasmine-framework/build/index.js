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
exports.adapterFactory = exports.JasmineAdapter = void 0;
const jasmine_1 = __importDefault(require("jasmine"));
const utils_1 = require("@wdio/utils");
const logger_1 = __importDefault(require("@wdio/logger"));
const reporter_1 = __importDefault(require("./reporter"));
const INTERFACES = {
    bdd: ['beforeAll', 'beforeEach', 'it', 'xit', 'fit', 'afterEach', 'afterAll']
};
const TEST_INTERFACES = ['it', 'fit', 'xit'];
const NOOP = function noop() { };
const DEFAULT_TIMEOUT_INTERVAL = 60000;
const log = logger_1.default('@wdio/jasmine-framework');
class JasmineAdapter {
    constructor(_cid, _config, _specs, _capabilities, reporter) {
        this._cid = _cid;
        this._config = _config;
        this._specs = _specs;
        this._capabilities = _capabilities;
        this._totalTests = 0;
        this._hookIds = 0;
        this._hasTests = true;
        this._jasmineNodeOpts = Object.assign({
            cleanStack: true
        }, this._config.jasmineNodeOpts);
        this._reporter = new reporter_1.default(reporter, {
            cid: this._cid,
            specs: this._specs,
            cleanStack: this._jasmineNodeOpts.cleanStack
        });
        this._hasTests = true;
    }
    async init() {
        const self = this;
        this._jrunner = new jasmine_1.default({});
        const { jasmine } = this._jrunner;
        const jasmineEnv = jasmine.getEnv();
        this._jrunner.projectBaseDir = '';
        this._jrunner.specDir = '';
        this._jrunner.addSpecFiles(this._specs);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = this._jasmineNodeOpts.defaultTimeoutInterval || DEFAULT_TIMEOUT_INTERVAL;
        jasmineEnv.addReporter(this._reporter);
        jasmineEnv.configure({
            specFilter: this._jasmineNodeOpts.specFilter || this.customSpecFilter.bind(this),
            stopOnSpecFailure: Boolean(this._jasmineNodeOpts.stopOnSpecFailure),
            failSpecWithNoExpectations: Boolean(this._jasmineNodeOpts.failSpecWithNoExpectations),
            failFast: this._jasmineNodeOpts.failFast,
            random: Boolean(this._jasmineNodeOpts.random),
            seed: Boolean(this._jasmineNodeOpts.seed),
            oneFailurePerSpec: Boolean(this._jasmineNodeOpts.stopSpecOnExpectationFailure ||
                this._jasmineNodeOpts.oneFailurePerSpec)
        });
        jasmine.Spec.prototype.addExpectationResult = this.getExpectationResultHandler(jasmine);
        const hookArgsFn = (context) => [{ ...(self._lastTest || {}) }, context];
        const emitHookEvent = (fnName, eventType) => (_test, _context, { error } = {}) => {
            const title = `"${fnName === 'beforeAll' ? 'before' : 'after'} all" hook`;
            const hook = {
                id: '',
                start: new Date(),
                type: 'hook',
                description: title,
                fullName: title,
                ...(error ? { error } : {})
            };
            this._reporter.emit('hook:' + eventType, hook);
        };
        INTERFACES['bdd'].forEach((fnName) => {
            const isTest = TEST_INTERFACES.includes(fnName);
            const beforeHook = [...this._config.beforeHook];
            const afterHook = [...this._config.afterHook];
            if (fnName.includes('All')) {
                beforeHook.push(emitHookEvent(fnName, 'start'));
                afterHook.push(emitHookEvent(fnName, 'end'));
            }
            this._config.beforeTest;
            utils_1.runTestInFiberContext(isTest, isTest ? this._config.beforeTest : beforeHook, hookArgsFn, isTest ? this._config.afterTest : afterHook, hookArgsFn, fnName, this._cid);
        });
        jasmine_1.default.prototype.configureDefaultReporter = NOOP;
        let beforeAllMock = jasmine.Suite.prototype.beforeAll;
        jasmine.Suite.prototype.beforeAll = function (...args) {
            self._lastSpec = this.result;
            beforeAllMock.apply(this, args);
        };
        let executeMock = jasmine.Spec.prototype.execute;
        jasmine.Spec.prototype.execute = function (...args) {
            self._lastTest = this.result;
            self._lastTest.start = new Date().getTime();
            executeMock.apply(this, args);
        };
        this._loadFiles();
        const { setOptions } = require('expect-webdriverio');
        setOptions({
            wait: this._config.waitforTimeout,
            interval: this._config.waitforInterval,
        });
        return this;
    }
    _loadFiles() {
        if (!this._jrunner) {
            throw new Error('Jasmine not initiate yet');
        }
        try {
            if (Array.isArray(this._jasmineNodeOpts.requires)) {
                this._jrunner.addRequires(this._jasmineNodeOpts.requires);
            }
            if (Array.isArray(this._jasmineNodeOpts.helpers)) {
                this._jrunner.addHelperFiles(this._jasmineNodeOpts.helpers);
            }
            this._jrunner.loadRequires();
            this._jrunner.loadHelpers();
            this._jrunner.loadSpecs();
            this._grep(this._jrunner.env.topSuite());
            this._hasTests = this._totalTests > 0;
        }
        catch (err) {
            log.warn('Unable to load spec files quite likely because they rely on `browser` object that is not fully initialised.\n' +
                '`browser` object has only `capabilities` and some flags like `isMobile`.\n' +
                'Helper files that use other `browser` commands have to be moved to `before` hook.\n' +
                `Spec file(s): ${this._specs.join(',')}\n`, 'Error: ', err);
        }
    }
    _grep(suite) {
        suite.children.forEach((child) => {
            if (Array.isArray(child.children)) {
                return this._grep(child);
            }
            if (this.customSpecFilter(child)) {
                this._totalTests++;
            }
        });
    }
    hasTests() {
        return this._hasTests;
    }
    async run() {
        const result = await new Promise((resolve, reject) => {
            if (!this._jrunner) {
                return reject(new Error('Jasmine not initiate yet'));
            }
            this._jrunner.env.beforeAll(this.wrapHook('beforeSuite'));
            this._jrunner.env.afterAll(this.wrapHook('afterSuite'));
            this._jrunner.onComplete(() => resolve(this._reporter.getFailedCount()));
            this._jrunner.execute();
        });
        await utils_1.executeHooksWithArgs('after', this._config.after, [result, this._capabilities, this._specs]);
        return result;
    }
    customSpecFilter(spec) {
        const { grep, invertGrep } = this._jasmineNodeOpts;
        const grepMatch = !grep || spec.getFullName().match(new RegExp(grep)) !== null;
        if (grepMatch === Boolean(invertGrep)) {
            spec.pend('grep');
            return false;
        }
        return true;
    }
    wrapHook(hookName) {
        return (done) => utils_1.executeHooksWithArgs(hookName, this._config[hookName], [this.prepareMessage(hookName)]).then(() => done(), (e) => {
            log.info(`Error in ${hookName} hook: ${e.stack.slice(7)}`);
            done();
        });
    }
    prepareMessage(hookName) {
        var _a, _b;
        const params = { type: hookName };
        switch (hookName) {
            case 'beforeSuite':
            case 'afterSuite':
                params.payload = Object.assign({
                    file: (_a = this._jrunner) === null || _a === void 0 ? void 0 : _a.specFiles[0]
                }, this._lastSpec);
                break;
            case 'beforeTest':
            case 'afterTest':
                params.payload = Object.assign({
                    file: (_b = this._jrunner) === null || _b === void 0 ? void 0 : _b.specFiles[0]
                }, this._lastTest);
                break;
        }
        return this.formatMessage(params);
    }
    formatMessage(params) {
        var _a;
        let message = {
            type: params.type
        };
        if (params.payload) {
            message.title = params.payload.description;
            message.fullName = params.payload.fullName || null;
            message.file = params.payload.file;
            if (params.payload.failedExpectations && params.payload.failedExpectations.length) {
                message.errors = params.payload.failedExpectations;
                message.error = params.payload.failedExpectations[0];
            }
            if (params.payload.id && params.payload.id.startsWith('spec')) {
                message.parent = (_a = this._lastSpec) === null || _a === void 0 ? void 0 : _a.description;
                message.passed = params.payload.failedExpectations.length === 0;
            }
            if (params.type === 'afterTest') {
                message.duration = new Date().getTime() - params.payload.start;
            }
            if (typeof params.payload.duration === 'number') {
                message.duration = params.payload.duration;
            }
        }
        return message;
    }
    getExpectationResultHandler(jasmine) {
        let { expectationResultHandler } = this._jasmineNodeOpts;
        const origHandler = jasmine.Spec.prototype.addExpectationResult;
        if (typeof expectationResultHandler !== 'function') {
            return origHandler;
        }
        return this.expectationResultHandler(origHandler);
    }
    expectationResultHandler(origHandler) {
        const { expectationResultHandler } = this._jasmineNodeOpts;
        return function (passed, data) {
            try {
                expectationResultHandler.call(this, passed, data);
            }
            catch (e) {
                if (passed) {
                    passed = false;
                    data = {
                        passed,
                        message: 'expectationResultHandlerError: ' + e.message,
                        error: e
                    };
                }
            }
            return origHandler.call(this, passed, data);
        };
    }
}
exports.JasmineAdapter = JasmineAdapter;
const adapterFactory = {};
exports.adapterFactory = adapterFactory;
adapterFactory.init = async function (...args) {
    const adapter = new JasmineAdapter(...args);
    const instance = await adapter.init();
    return instance;
};
exports.default = adapterFactory;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHNEQUE2QjtBQUM3Qix1Q0FBeUU7QUFDekUsMERBQWlDO0FBSWpDLDBEQUF3QztBQUd4QyxNQUFNLFVBQVUsR0FBRztJQUNmLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztDQUNoRixDQUFBO0FBRUQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQzVDLE1BQU0sSUFBSSxHQUFHLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQTtBQUNoQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQTtBQUV0QyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUE7QUFhN0MsTUFBTSxjQUFjO0lBV2hCLFlBQ1ksSUFBWSxFQUNaLE9BQWlDLEVBQ2pDLE1BQWdCLEVBQ2hCLGFBQThDLEVBQ3RELFFBQXNCO1FBSmQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsa0JBQWEsR0FBYixhQUFhLENBQWlDO1FBWmxELGdCQUFXLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsYUFBUSxHQUFHLENBQUMsQ0FBQTtRQUNaLGNBQVMsR0FBRyxJQUFJLENBQUE7UUFhcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEMsVUFBVSxFQUFFLElBQUk7U0FDbkIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRWhDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxrQkFBZSxDQUFDLFFBQVEs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