"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const cucumberEventListener_1 = __importDefault(require("./cucumberEventListener"));
const utils_1 = require("./utils");
class CucumberReporter {
    constructor(eventBroadcaster, pickleFilter, _options, _cid, _specs, _reporter) {
        this._options = _options;
        this._cid = _cid;
        this._specs = _specs;
        this._reporter = _reporter;
        this.failedCount = 0;
        this._tagsInTitle = this._options.tagsInTitle || false;
        this._scenarioLevelReport = this._options.scenarioLevelReporter;
        this.eventListener = new cucumberEventListener_1.default(eventBroadcaster, pickleFilter)
            .on('before-feature', this.handleBeforeFeature.bind(this))
            .on('before-scenario', this.handleBeforeScenario.bind(this))
            .on('after-scenario', this.handleAfterScenario.bind(this))
            .on('after-feature', this.handleAfterFeature.bind(this));
        if (!this._scenarioLevelReport) {
            this.eventListener
                .on('before-step', this.handleBeforeStep.bind(this))
                .on('after-step', this.handleAfterStep.bind(this));
        }
    }
    handleBeforeFeature(uri, feature) {
        this._featureStart = new Date();
        this.emit('suite:start', {
            uid: utils_1.getFeatureId(uri, feature),
            title: this.getTitle(feature),
            type: 'feature',
            file: uri,
            tags: feature.tags,
            description: feature.description,
            keyword: feature.keyword
        });
    }
    handleBeforeScenario(uri, feature, scenario) {
        this._scenarioStart = new Date();
        this._testStart = new Date();
        this.emit(this._scenarioLevelReport ? 'test:start' : 'suite:start', {
            uid: scenario.id,
            title: this.getTitle(scenario),
            parent: utils_1.getFeatureId(uri, feature),
            type: 'scenario',
            file: uri,
            tags: scenario.tags
        });
    }
    handleBeforeStep(uri, feature, scenario, step) {
        this._testStart = new Date();
        const type = utils_1.getStepType(step);
        const payload = utils_1.buildStepPayload(uri, feature, scenario, step, { type });
        this.emit(`${type}:start`, payload);
    }
    handleAfterStep(uri, feature, scenario, step, result) {
        const type = utils_1.getStepType(step);
        if (type === 'hook') {
            return this.afterHook(uri, feature, scenario, step, result);
        }
        return this.afterTest(uri, feature, scenario, step, result);
    }
    afterHook(uri, feature, scenario, step, result) {
        var _a;
        let error;
        if (result.message) {
            error = new Error(result.message.split('\n')[0]);
            error.stack = result.message;
        }
        const payload = utils_1.buildStepPayload(uri, feature, scenario, step, {
            type: 'hook',
            state: result.status,
            error,
            duration: Date.now() - ((_a = this._testStart) === null || _a === void 0 ? void 0 : _a.getTime())
        });
        this.emit('hook:end', payload);
    }
    afterTest(uri, feature, scenario, step, result) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let state = 'undefined';
        switch (result.status) {
            case cucumber_1.Status.FAILED:
            case cucumber_1.Status.UNDEFINED:
                state = 'fail';
                break;
            case cucumber_1.Status.PASSED:
                state = 'pass';
                break;
            case cucumber_1.Status.PENDING:
            case cucumber_1.Status.SKIPPED:
            case cucumber_1.Status.AMBIGUOUS:
                state = 'pending';
        }
        let error = result.message ? new Error(result.message) : undefined;
        let title = step
            ? step === null || step === void 0 ? void 0 : step.text : this.getTitle(scenario);
        if (result.status === cucumber_1.Status.UNDEFINED) {
            if (this._options.ignoreUndefinedDefinitions) {
                state = 'pending';
                title += ' (undefined step)';
            }
            else {
                this.failedCount++;
                const err = new Error((step ? `Step "${title}" is not defined. ` : `Scenario ${title} has undefined steps. `) +
                    'You can ignore this error by setting cucumberOpts.ignoreUndefinedDefinitions as true.');
                err.stack = `${err.message}\n\tat Feature(${uri}):1:1\n`;
                const featChildren = (_a = feature.children) === null || _a === void 0 ? void 0 : _a.find(c => { var _a; return scenario.astNodeIds && ((_a = c.scenario) === null || _a === void 0 ? void 0 : _a.id) === scenario.astNodeIds[0]; });
                if (featChildren) {
                    err.stack += `\tat Scenario(${(_b = featChildren.scenario) === null || _b === void 0 ? void 0 : _b.name}):${(_d = (_c = featChildren.scenario) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.line}:${(_f = (_e = featChildren.scenario) === null || _e === void 0 ? void 0 : _e.location) === null || _f === void 0 ? void 0 : _f.column}\n`;
                    const featStep = (_h = (_g = featChildren.scenario) === null || _g === void 0 ? void 0 : _g.steps) === null || _h === void 0 ? void 0 : _h.find(s => step.astNodeIds && s.id === step.astNodeIds[0]);
                    if (featStep) {
                        err.stack += `\tat Step(${featStep.text}):${(_j = featStep.location) === null || _j === void 0 ? void 0 : _j.line}:${(_k = featStep.location) === null || _k === void 0 ? void 0 : _k.column}\n`;
                    }
                }
                error = err;
            }
        }
        else if (result.status === cucumber_1.Status.FAILED && !result.willBeRetried) {
            error = new Error((_l = result.message) === null || _l === void 0 ? void 0 : _l.split('\n')[0]);
            error.stack = result.message;
            this.failedCount++;
        }
        else if (result.status === cucumber_1.Status.AMBIGUOUS && this._options.failAmbiguousDefinitions) {
            state = 'fail';
            this.failedCount++;
            error = new Error((_m = result.message) === null || _m === void 0 ? void 0 : _m.split('\n')[0]);
            error.stack = result.message;
        }
        else if (result.willBeRetried) {
            state = 'retry';
        }
        const common = {
            title: title,
            state,
            error,
            duration: Date.now() - ((_o = this._testStart) === null || _o === void 0 ? void 0 : _o.getTime()),
            passed: state === 'pass',
            file: uri
        };
        const payload = step
            ? utils_1.buildStepPayload(uri, feature, scenario, step, {
                type: 'step',
                ...common
            })
            : {
                type: 'scenario',
                uid: scenario.id,
                parent: utils_1.getFeatureId(uri, feature),
                tags: scenario.tags,
                ...common
            };
        this.emit('test:' + state, payload);
    }
    handleAfterScenario(uri, feature, scenario, result) {
        var _a;
        if (this._scenarioLevelReport) {
            return this.afterTest(uri, feature, scenario, { id: scenario.id }, result);
        }
        this.emit('suite:end', {
            uid: scenario.id,
            title: this.getTitle(scenario),
            parent: utils_1.getFeatureId(uri, feature),
            type: 'scenario',
            file: uri,
            duration: Date.now() - ((_a = this._scenarioStart) === null || _a === void 0 ? void 0 : _a.getTime()),
            tags: scenario.tags
        });
    }
    handleAfterFeature(uri, feature) {
        var _a;
        this.emit('suite:end', {
            uid: utils_1.getFeatureId(uri, feature),
            title: this.getTitle(feature),
            type: 'feature',
            file: uri,
            duration: Date.now() - ((_a = this._featureStart) === null || _a === void 0 ? void 0 : _a.getTime()),
            tags: feature.tags
        });
    }
    emit(event, payload) {
        let message = utils_1.formatMessage({ payload });
        message.cid = this._cid;
        message.specs = this._specs;
        message.uid = payload.uid;
        this._reporter.emit(event, message);
    }
    getTitle(featureOrScenario) {
        const name = featureOrScenario.name;
        const tags = featureOrScenario.tags;
        if (!this._tagsInTitle || !tags || !tags.length)
            return name;
        return `${tags.map(tag => tag.name).join(', ')}: ${name}`;
    }
}
exports.default = CucumberReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxpREFBeUQ7QUFHekQsb0ZBQTJEO0FBQzNELG1DQUFvRjtBQUdwRixNQUFNLGdCQUFnQjtJQVVsQixZQUNJLGdCQUE4QixFQUM5QixZQUEwQixFQUNsQixRQUF5QixFQUN6QixJQUFZLEVBQ1osTUFBZ0IsRUFDaEIsU0FBdUI7UUFIdkIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQWQ1QixnQkFBVyxHQUFHLENBQUMsQ0FBQTtRQWdCbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUE7UUFDdEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUE7UUFFL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLCtCQUFxQixDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQzthQUN6RSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6RCxFQUFFLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzRCxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6RCxFQUFFLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUU1RCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFv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