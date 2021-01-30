"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterFactory = exports.MochaAdapter = void 0;
const path_1 = __importDefault(require("path"));
const mocha_1 = __importDefault(require("mocha"));
const util_1 = require("util");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const utils_2 = require("./utils");
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/mocha-framework');
const MOCHA_UI_TYPE_EXTRACTOR = /^(?:.*-)?([^-.]+)(?:.js)?$/;
const DEFAULT_INTERFACE_TYPE = 'bdd';
class MochaAdapter {
    constructor(_cid, _config, _specs, _capabilities, _reporter) {
        this._cid = _cid;
        this._config = _config;
        this._specs = _specs;
        this._capabilities = _capabilities;
        this._reporter = _reporter;
        this._level = 0;
        this._hasTests = true;
        this._suiteIds = ['0'];
        this._suiteCnt = new Map();
        this._hookCnt = new Map();
        this._testCnt = new Map();
        this._config = Object.assign({
            mochaOpts: {}
        }, _config);
    }
    async init() {
        const { mochaOpts } = this._config;
        const mocha = this._mocha = new mocha_1.default(mochaOpts);
        await mocha.loadFilesAsync();
        mocha.reporter(constants_1.NOOP);
        mocha.fullTrace();
        this._specs.forEach((spec) => mocha.addFile(spec));
        mocha.suite.on('pre-require', this.preRequire.bind(this));
        await this._loadFiles(mochaOpts);
        const { setOptions } = require('expect-webdriverio');
        setOptions({
            wait: this._config.waitforTimeout,
            interval: this._config.waitforInterval,
        });
        return this;
    }
    async _loadFiles(mochaOpts) {
        try {
            await this._mocha.loadFilesAsync();
            const mochaRunner = new mocha_1.default.Runner(this._mocha.suite, false);
            if (mochaOpts.grep) {
                mochaRunner.grep(this._mocha.options.grep, mochaOpts.invert);
            }
            this._hasTests = mochaRunner.total > 0;
        }
        catch (err) {
            const error = '' +
                'Unable to load spec files quite likely because they rely on `browser` object that is not fully initialised.\n' +
                '`browser` object has only `capabilities` and some flags like `isMobile`.\n' +
                'Helper files that use other `browser` commands have to be moved to `before` hook.\n' +
                `Spec file(s): ${this._specs.join(',')}\n` +
                `Error: ${err.stack}`;
            this._specLoadError = new Error(error);
            log.warn(error);
        }
    }
    hasTests() {
        return this._hasTests;
    }
    async run() {
        const mocha = this._mocha;
        let runtimeError;
        const result = await new Promise((resolve) => {
            try {
                this._runner = mocha.run(resolve);
            }
            catch (e) {
                runtimeError = e;
                return resolve(1);
            }
            Object.keys(constants_1.EVENTS).forEach((e) => this._runner.on(e, this.emit.bind(this, constants_1.EVENTS[e])));
            this._runner.suite.beforeAll(this.wrapHook('beforeSuite'));
            this._runner.suite.afterAll(this.wrapHook('afterSuite'));
        });
        await utils_1.executeHooksWithArgs('after', this._config.after, [runtimeError || result, this._capabilities, this._specs]);
        if (runtimeError || this._specLoadError) {
            throw runtimeError || this._specLoadError;
        }
        return result;
    }
    options(options, context) {
        let { require = [], compilers = [] } = options;
        if (typeof require === 'string') {
            require = [require];
        }
        this.requireExternalModules([...compilers, ...require], context);
    }
    preRequire(context, file, mocha) {
        const options = this._config.mochaOpts;
        const match = MOCHA_UI_TYPE_EXTRACTOR.exec(options.ui);
        const type = (match && constants_1.INTERFACES[match[1]] && match[1]) || DEFAULT_INTERFACE_TYPE;
        const hookArgsFn = (context) => {
            var _a, _b;
            return [{ ...context.test, parent: (_b = (_a = context.test) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.title }, context];
        };
        constants_1.INTERFACES[type].forEach((fnName) => {
            let testCommand = constants_1.INTERFACES[type][0];
            const isTest = [testCommand, testCommand + '.only'].includes(fnName);
            utils_1.runTestInFiberContext(isTest, isTest ? this._config.beforeTest : this._config.beforeHook, hookArgsFn, isTest ? this._config.afterTest : this._config.afterHook, hookArgsFn, fnName, this._cid);
        });
        this.options(options, { context, file, mocha, options });
    }
    wrapHook(hookName) {
        return () => utils_1.executeHooksWithArgs(hookName, this._config[hookName], [this.prepareMessage(hookName)]).catch((e) => {
            log.error(`Error in ${hookName} hook: ${e.stack.slice(7)}`);
        });
    }
    prepareMessage(hookName) {
        var _a, _b;
        const params = { type: hookName };
        switch (hookName) {
            case 'beforeSuite':
            case 'afterSuite':
                params.payload = (_a = this._runner) === null || _a === void 0 ? void 0 : _a.suite.suites[0];
                break;
            case 'beforeTest':
            case 'afterTest':
                params.payload = (_b = this._runner) === null || _b === void 0 ? void 0 : _b.test;
                break;
        }
        return this.formatMessage(params);
    }
    formatMessage(params) {
        var _a, _b, _c;
        let message = {
            type: params.type
        };
        const mochaAllHooksIfPresent = (_b = (_a = params.payload) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.match(/^"(before|after)( all| each)?" hook/);
        if (params.err) {
            if (params.err && params.err.message && params.err.message.includes(constants_1.MOCHA_TIMEOUT_MESSAGE)) {
                const replacement = util_1.format(constants_1.MOCHA_TIMEOUT_MESSAGE_REPLACEMENT, params.payload.parent.title, params.payload.title);
                params.err.message = params.err.message.replace(constants_1.MOCHA_TIMEOUT_MESSAGE, replacement);
                params.err.stack = params.err.stack.replace(constants_1.MOCHA_TIMEOUT_MESSAGE, replacement);
            }
            message.error = {
                name: params.err.name,
                message: params.err.message,
                stack: params.err.stack,
                type: params.err.type || params.err.name,
                expected: params.err.expected,
                actual: params.err.actual
            };
            if (mochaAllHooksIfPresent) {
                message.type = 'hook:end';
            }
        }
        if (params.payload) {
            message.title = params.payload.title;
            message.parent = params.payload.parent ? params.payload.parent.title : null;
            message.fullTitle = params.payload.fullTitle ? params.payload.fullTitle() : message.parent + ' ' + message.title;
            message.pending = params.payload.pending || false;
            message.file = params.payload.file;
            message.duration = params.payload.duration;
            if (params.payload.ctx && params.payload.ctx.currentTest) {
                message.currentTest = params.payload.ctx.currentTest.title;
            }
            if (params.type.match(/Test/)) {
                message.passed = (params.payload.state === 'passed');
            }
            if (((_c = params.payload.parent) === null || _c === void 0 ? void 0 : _c.title) && mochaAllHooksIfPresent) {
                const hookName = mochaAllHooksIfPresent[0];
                message.title = `${hookName} for ${params.payload.parent.title}`;
            }
            if (params.payload.context) {
                message.context = params.payload.context;
            }
        }
        return message;
    }
    requireExternalModules(modules, context) {
        modules.forEach(module => {
            if (!module) {
                return;
            }
            module = module.replace(/.*:/, '');
            if (module.substr(0, 1) === '.') {
                module = path_1.default.join(process.cwd(), module);
            }
            utils_2.loadModule(module, context);
        });
    }
    emit(event, payload, err) {
        if (payload.root)
            return;
        let message = this.formatMessage({ type: event, payload, err });
        message.cid = this._cid;
        message.specs = this._specs;
        message.uid = this.getUID(message);
        this._reporter.emit(message.type, message);
    }
    getSyncEventIdStart(type) {
        const prop = `_${type}Cnt`;
        const suiteId = this._suiteIds[this._suiteIds.length - 1];
        const cnt = this[prop].has(suiteId)
            ? this[prop].get(suiteId) || 0
            : 0;
        this[prop].set(suiteId, cnt + 1);
        return `${type}-${suiteId}-${cnt}`;
    }
    getSyncEventIdEnd(type) {
        const prop = `_${type}Cnt`;
        const suiteId = this._suiteIds[this._suiteIds.length - 1];
        const cnt = this[prop].get(suiteId) - 1;
        return `${type}-${suiteId}-${cnt}`;
    }
    getUID(message) {
        if (message.type === 'suite:start') {
            const suiteCnt = this._suiteCnt.has(this._level.toString())
                ? this._suiteCnt.get(this._level.toString())
                : 0;
            const suiteId = `suite-${this._level}-${suiteCnt}`;
            if (this._suiteCnt.has(this._level.toString())) {
                this._suiteCnt.set(this._level.toString(), this._suiteCnt.get(this._level.toString()) + 1);
            }
            else {
                this._suiteCnt.set(this._level.toString(), 1);
            }
            this._suiteIds.push(`${this._level}${suiteCnt}`);
            this._level++;
            return suiteId;
        }
        if (message.type === 'suite:end') {
            this._level--;
            const suiteCnt = this._suiteCnt.get(this._level.toString()) - 1;
            const suiteId = `suite-${this._level}-${suiteCnt}`;
            this._suiteIds.pop();
            return suiteId;
        }
        if (message.type === 'hook:start') {
            return this.getSyncEventIdStart('hook');
        }
        if (message.type === 'hook:end') {
            return this.getSyncEventIdEnd('hook');
        }
        if (['test:start', 'test:pending'].includes(message.type)) {
            return this.getSyncEventIdStart('test');
        }
        if (['test:end', 'test:pass', 'test:fail', 'test:retry'].includes(message.type)) {
            return this.getSyncEventIdEnd('test');
        }
        throw new Error(`Unknown message type : ${message.type}`);
    }
}
exports.MochaAdapter = MochaAdapter;
const adapterFactory = {};
exports.adapterFactory = adapterFactory;
adapterFactory.init = async function (...args) {
    const adapter = new MochaAdapter(...args);
    const instance = await adapter.init();
    return instance;
};
exports.default = adapterFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXVCO0FBQ3ZCLGtEQUFxQztBQUNyQywrQkFBNkI7QUFFN0IsMERBQWlDO0FBQ2pDLHVDQUF5RTtBQUd6RSxtQ0FBb0M7QUFDcEMsMkNBQWdIO0FBSWhILE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtBQVczQyxNQUFNLHVCQUF1QixHQUFHLDRCQUE0QixDQUFBO0FBQzVELE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFBO0FBUXBDLE1BQU0sWUFBWTtJQVlkLFlBQ1ksSUFBWSxFQUNaLE9BQW9CLEVBQ3BCLE1BQWdCLEVBQ2hCLGFBQTRDLEVBQzVDLFNBQXVCO1FBSnZCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsa0JBQWEsR0FBYixhQUFhLENBQStCO1FBQzVDLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFaM0IsV0FBTSxHQUFHLENBQUMsQ0FBQTtRQUNWLGNBQVMsR0FBRyxJQUFJLENBQUE7UUFDaEIsY0FBUyxHQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDM0IsY0FBUyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQzFDLGFBQVEsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN6QyxhQUFRLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUE7UUFTN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDZixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDTixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNsQyxN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