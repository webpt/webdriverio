"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterFactory = exports.CucumberAdapter = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const events_1 = require("events");
const mockery_1 = __importDefault(require("mockery"));
const is_glob_1 = __importDefault(require("is-glob"));
const glob_1 = __importDefault(require("glob"));
const Cucumber = __importStar(require("@cucumber/cucumber"));
const event_data_collector_1 = __importDefault(require("@cucumber/cucumber/lib/formatter/helpers/event_data_collector"));
const gherkin_1 = require("@cucumber/gherkin");
const messages_1 = require("@cucumber/messages");
const utils_1 = require("@wdio/utils");
const reporter_1 = __importDefault(require("./reporter"));
const constants_1 = require("./constants");
const utils_2 = require("./utils");
const { incrementing } = messages_1.IdGenerator;
class CucumberAdapter {
    constructor(_cid, _config, _specs, _capabilities, _reporter) {
        this._cid = _cid;
        this._config = _config;
        this._specs = _specs;
        this._capabilities = _capabilities;
        this._reporter = _reporter;
        this._cwd = process.cwd();
        this._newId = incrementing();
        this._cucumberOpts = Object.assign({}, constants_1.DEFAULT_OPTS, this._config.cucumberOpts);
        this._hasTests = true;
        this._cucumberFeaturesWithLineNumbers = this._config.cucumberFeaturesWithLineNumbers || [];
        this._eventBroadcaster = new events_1.EventEmitter();
        this._eventDataCollector = new event_data_collector_1.default(this._eventBroadcaster);
        const featurePathsToRun = this._cucumberFeaturesWithLineNumbers.length > 0 ? this._cucumberFeaturesWithLineNumbers : this._specs;
        this._pickleFilter = new Cucumber.PickleFilter({
            cwd: this._cwd,
            featurePaths: featurePathsToRun,
            names: this._cucumberOpts.names,
            tagExpression: this._cucumberOpts.tagExpression
        });
        const reporterOptions = {
            capabilities: this._capabilities,
            ignoreUndefinedDefinitions: Boolean(this._cucumberOpts.ignoreUndefinedDefinitions),
            failAmbiguousDefinitions: Boolean(this._cucumberOpts.failAmbiguousDefinitions),
            tagsInTitle: Boolean(this._cucumberOpts.tagsInTitle),
            scenarioLevelReporter: Boolean(this._cucumberOpts.scenarioLevelReporter)
        };
        this._cucumberReporter = new reporter_1.default(this._eventBroadcaster, this._pickleFilter, reporterOptions, this._cid, this._specs, this._reporter);
    }
    async init() {
        try {
            const gherkinMessageStream = gherkin_1.GherkinStreams.fromPaths(this._specs, {
                defaultDialect: this._cucumberOpts.featureDefaultLanguage,
                newId: this._newId,
                createReadStream: (path) => fs_1.default.createReadStream(path, { encoding: 'utf-8' })
            });
            await Cucumber.parseGherkinMessageStream({
                cwd: this._cwd,
                eventBroadcaster: this._eventBroadcaster,
                gherkinMessageStream,
                eventDataCollector: this._eventDataCollector,
                order: this._cucumberOpts.order,
                pickleFilter: this._pickleFilter
            });
            this._hasTests = this._cucumberReporter.eventListener.getPickleIds(this._capabilities).length > 0;
        }
        catch (runtimeError) {
            await utils_1.executeHooksWithArgs('after', this._config.after, [runtimeError, this._capabilities, this._specs]);
            throw runtimeError;
        }
        const { setOptions } = require('expect-webdriverio');
        setOptions({
            wait: this._config.waitforTimeout,
            interval: this._config.waitforInterval,
        });
        return this;
    }
    hasTests() {
        return this._hasTests;
    }
    async run() {
        let runtimeError;
        let result;
        try {
            this.registerRequiredModules();
            Cucumber.supportCodeLibraryBuilder.reset(this._cwd, this._newId);
            this.addWdioHooks(this._config);
            this.loadSpecFiles();
            this.wrapSteps(this._config);
            utils_2.setUserHookNames(Cucumber.supportCodeLibraryBuilder);
            Cucumber.setDefaultTimeout(this._cucumberOpts.timeout);
            const supportCodeLibrary = Cucumber.supportCodeLibraryBuilder.finalize();
            this.getHookParams = this._cucumberReporter
                .eventListener
                .getHookParams
                .bind(this._cucumberReporter.eventListener);
            const runtime = new Cucumber.Runtime({
                newId: this._newId,
                eventBroadcaster: this._eventBroadcaster,
                options: this._cucumberOpts,
                supportCodeLibrary,
                eventDataCollector: this._eventDataCollector,
                pickleIds: this._cucumberReporter.eventListener.getPickleIds(this._capabilities)
            });
            result = await runtime.start() ? 0 : 1;
            if (this._cucumberOpts.ignoreUndefinedDefinitions && result) {
                result = this._cucumberReporter.failedCount;
            }
        }
        catch (e) {
            runtimeError = e;
            result = 1;
        }
        await utils_1.executeHooksWithArgs('after', this._config.after, [runtimeError || result, this._capabilities, this._specs]);
        if (runtimeError) {
            throw runtimeError;
        }
        return result;
    }
    registerRequiredModules() {
        this._cucumberOpts.requireModule.map(requiredModule => {
            if (Array.isArray(requiredModule)) {
                require(requiredModule[0])(requiredModule[1]);
            }
            else if (typeof requiredModule === 'function') {
                requiredModule();
            }
            else {
                require(requiredModule);
            }
        });
    }
    requiredFiles() {
        return this._cucumberOpts.require.reduce((files, requiredFile) => files.concat(is_glob_1.default(requiredFile)
            ? glob_1.default.sync(requiredFile)
            : [requiredFile]), []);
    }
    loadSpecFiles() {
        mockery_1.default.enable({
            useCleanCache: false,
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        mockery_1.default.registerMock('@cucumber/cucumber', Cucumber);
        this.requiredFiles().forEach((codePath) => {
            const filepath = path_1.default.isAbsolute(codePath)
                ? codePath
                : path_1.default.join(process.cwd(), codePath);
            delete require.cache[require.resolve(filepath)];
            require(filepath);
        });
        mockery_1.default.disable();
    }
    addWdioHooks(config) {
        var _a;
        const eventListener = (_a = this._cucumberReporter) === null || _a === void 0 ? void 0 : _a.eventListener;
        Cucumber.BeforeAll(async function wdioHookBeforeFeature() {
            const params = eventListener === null || eventListener === void 0 ? void 0 : eventListener.getHookParams();
            await utils_1.executeHooksWithArgs('beforeFeature', config.beforeFeature, [params === null || params === void 0 ? void 0 : params.uri, params === null || params === void 0 ? void 0 : params.feature]);
        });
        Cucumber.AfterAll(async function wdioHookAfterFeature() {
            const params = eventListener === null || eventListener === void 0 ? void 0 : eventListener.getHookParams();
            await utils_1.executeHooksWithArgs('afterFeature', config.afterFeature, [params === null || params === void 0 ? void 0 : params.uri, params === null || params === void 0 ? void 0 : params.feature]);
        });
        Cucumber.Before(async function wdioHookBeforeScenario(world) {
            await utils_1.executeHooksWithArgs('beforeScenario', config.beforeScenario, [world]);
        });
        Cucumber.After(async function wdioHookAfterScenario(world) {
            await utils_1.executeHooksWithArgs('afterScenario', config.afterScenario, [world]);
        });
    }
    wrapSteps(config) {
        const wrapStep = this.wrapStep;
        const cid = this._cid;
        const getHookParams = () => this.getHookParams && this.getHookParams();
        Cucumber.setDefinitionFunctionWrapper((fn, options = { retry: 0 }) => {
            if (fn.name.startsWith('wdioHook')) {
                return fn;
            }
            const isStep = !fn.name.startsWith('userHook');
            return wrapStep(fn, isStep, config, cid, options, getHookParams);
        });
    }
    wrapStep(code, isStep, config, cid, options, getHookParams) {
        return function (...args) {
            const hookParams = getHookParams();
            const retryTest = isStep && isFinite(options.retry) ? options.retry : 0;
            const beforeFn = isStep ? config.beforeStep : config.beforeHook;
            const afterFn = isStep ? config.afterStep : config.afterHook;
            return utils_1.testFnWrapper.call(this, isStep ? 'Step' : 'Hook', { specFn: code, specFnArgs: args }, { beforeFn: beforeFn, beforeFnArgs: (context) => [hookParams === null || hookParams === void 0 ? void 0 : hookParams.step, context] }, { afterFn: afterFn, afterFnArgs: (context) => [hookParams === null || hookParams === void 0 ? void 0 : hookParams.step, context] }, cid, retryTest);
        };
    }
}
exports.CucumberAdapter = CucumberAdapter;
const _CucumberAdapter = CucumberAdapter;
const adapterFactory = {};
exports.adapterFactory = adapterFactory;
adapterFactory.init = async function (...args) {
    const adapter = new _CucumberAdapter(...args);
    const instance = await adapter.init();
    return instance;
};
exports.default = adapterFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFtQjtBQUNuQixnREFBdUI7QUFDdkIsbUNBQXFDO0FBRXJDLHNEQUE2QjtBQUM3QixzREFBNEI7QUFDNUIsZ0RBQXVCO0FBRXZCLDZEQUE4QztBQUM5Qyx5SEFBOEY7QUFHOUYsK0NBQWtEO0FBRWxELGlEQUFnRDtBQUVoRCx1Q0FBaUU7QUFHakUsMERBQXlDO0FBQ3pDLDJDQUEwQztBQUUxQyxtQ0FBMEM7QUFFMUMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLHNCQUFXLENBQUE7QUFFcEMsTUFBTSxlQUFlO0lBbUJqQixZQUNZLElBQVksRUFDWixPQUEyQixFQUMzQixNQUFnQixFQUNoQixhQUE0QyxFQUM1QyxTQUF1QjtRQUp2QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUNoQixrQkFBYSxHQUFiLGFBQWEsQ0FBK0I7UUFDNUMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQXZCM0IsU0FBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNwQixXQUFNLEdBQUcsWUFBWSxFQUFFLENBQUE7UUF3QjNCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsd0JBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQy9FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixJQUFJLEVBQUUsQ0FBQTtRQUMxRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUE7UUFDM0MsSUFB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