"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const junit_report_builder_1 = __importDefault(require("junit-report-builder"));
const reporter_1 = __importDefault(require("@wdio/reporter"));
const utils_1 = require("./utils");
class JunitReporter extends reporter_1.default {
    constructor(options) {
        super(options);
        this.options = options;
        this._suiteNameRegEx = this.options.suiteNameFormat instanceof RegExp
            ? this.options.suiteNameFormat
            : /[^a-zA-Z0-9]+/;
    }
    onRunnerEnd(runner) {
        const xml = this._buildJunitXml(runner);
        this.write(xml);
    }
    _prepareName(name = 'Skipped test') {
        return name.split(this._suiteNameRegEx).filter((item) => item && item.length).join('_');
    }
    _addFailedHooks(suite) {
        const failedHooks = suite.hooks.filter(hook => hook.error && hook.title.match(/^"(before|after)( all| each)?" hook/));
        failedHooks.forEach(hook => {
            const { title, _duration, error, state } = hook;
            suite.tests.push({
                _duration,
                title,
                error,
                state: state,
                output: []
            });
        });
        return suite;
    }
    _addCucumberFeatureToBuilder(builder, runner, specFileName, suite) {
        const featureName = this._prepareName(suite.title);
        const filePath = specFileName.replace(process.cwd(), '.');
        if (suite.type === 'feature') {
            const feature = builder.testSuite()
                .name(featureName)
                .timestamp(suite.start)
                .time(suite._duration / 1000)
                .property('specId', 0)
                .property(this._suiteTitleLabel, suite.title)
                .property('capabilities', runner.sanitizedCapabilities)
                .property(this._fileNameLabel, filePath);
            this._activeFeature = feature;
            this._activeFeatureName = featureName;
        }
        else if (this._activeFeature) {
            let scenario = suite;
            const testName = this._prepareName(suite.title);
            const testCase = this._activeFeature.testCase()
                .className(`${this._packageName}.${this._activeFeatureName}`)
                .name(`${this._activeFeatureName}.${testName}`)
                .time(scenario._duration / 1000);
            if (this.options.addFileAttribute) {
                testCase.file(filePath);
            }
            scenario = this._addFailedHooks(scenario);
            let stepsOutput = '';
            let isFailing = false;
            for (let stepKey of Object.keys(scenario.tests)) {
                if (stepKey === 'undefined') {
                    continue;
                }
                let stepEmoji = '✅';
                const step = scenario.tests[stepKey];
                if (step.state === 'pending' || step.state === 'skipped') {
                    if (!isFailing) {
                        testCase.skipped();
                    }
                    stepEmoji = '⚠️';
                }
                else if (step.state === 'failed') {
                    if (step.error) {
                        if (this.options.errorOptions) {
                            const errorOptions = this.options.errorOptions;
                            for (const key of Object.keys(errorOptions)) {
                                testCase[key](step.error
                                    ? step.error[errorOptions[key]]
                                    : null);
                            }
                        }
                        else {
                            testCase.error(step.error.message);
                        }
                        testCase.standardError(`\n${step.error.stack}\n`);
                    }
                    else {
                        testCase.error();
                    }
                    isFailing = true;
                    stepEmoji = '❗';
                }
                const output = this._getStandardOutput(step);
                stepsOutput += output ? stepEmoji + ' ' + step.title : stepEmoji + ' ' + step.title + '\n' + output;
            }
            testCase.standardOutput(`\n${stepsOutput}\n`);
        }
        return builder;
    }
    _addSuiteToBuilder(builder, runner, specFileName, suite) {
        const suiteName = this._prepareName(suite.title);
        const filePath = specFileName.replace(process.cwd(), '.');
        let testSuite = builder.testSuite()
            .name(suiteName)
            .timestamp(suite.start)
            .time(suite._duration / 1000)
            .property('specId', 0)
            .property(this._suiteTitleLabel, suite.title)
            .property('capabilities', runner.sanitizedCapabilities)
            .property(this._fileNameLabel, filePath);
        suite = this._addFailedHooks(suite);
        for (let testKey of Object.keys(suite.tests)) {
            if (testKey === 'undefined') {
                continue;
            }
            const test = suite.tests[testKey];
            const testName = this._prepareName(test.title);
            const testCase = testSuite.testCase()
                .className(`${this._packageName}.${suiteName}`)
                .name(testName)
                .time(test._duration / 1000);
            if (this.options.addFileAttribute) {
                testCase.file(filePath);
            }
            if (test.state === 'pending' || test.state === 'skipped') {
                testCase.skipped();
            }
            else if (test.state === 'failed') {
                if (test.error) {
                    if (this.options.errorOptions) {
                        const errorOptions = this.options.errorOptions;
                        for (const key of Object.keys(errorOptions)) {
                            testCase[key](test.error[errorOptions[key]]);
                        }
                    }
                    else {
                        testCase.error(test.error.message);
                    }
                    testCase.standardError(`\n${test.error.stack}\n`);
                }
                else {
                    testCase.error();
                }
            }
            const output = this._getStandardOutput(test);
            if (output)
                testCase.standardOutput(`\n${output}\n`);
        }
        return builder;
    }
    _buildJunitXml(runner) {
        let builder = junit_report_builder_1.default.newBuilder();
        if (runner.config.hostname !== undefined && runner.config.hostname.indexOf('browserstack') > -1) {
            const browserstackSanitizedCapabilities = [
                runner.capabilities.device,
                runner.capabilities.os,
                (runner.capabilities.os_version || '').replace(/\./g, '_'),
            ]
                .filter(Boolean)
                .map((capability) => capability.toLowerCase())
                .join('.')
                .replace(/ /g, '') || runner.sanitizedCapabilities;
            this._packageName = this.options.packageName ? `${browserstackSanitizedCapabilities}-${this.options.packageName}` : browserstackSanitizedCapabilities;
        }
        else {
            this._packageName = this.options.packageName ? `${runner.sanitizedCapabilities}-${this.options.packageName}` : runner.sanitizedCapabilities;
        }
        const isCucumberFrameworkRunner = runner.config.framework === 'cucumber';
        if (isCucumberFrameworkRunner) {
            this._packageName = `CucumberJUnitReport-${this._packageName}`;
            this._suiteTitleLabel = 'featureName';
            this._fileNameLabel = 'featureFile';
        }
        else {
            this._suiteTitleLabel = 'suiteName';
            this._fileNameLabel = 'file';
        }
        for (let suiteKey of Object.keys(this.suites)) {
            if (suiteKey.match(/^"before all"/)) {
                continue;
            }
            const specFileName = runner.specs[0];
            const suite = this.suites[suiteKey];
            if (isCucumberFrameworkRunner) {
                builder = this._addCucumberFeatureToBuilder(builder, runner, specFileName, suite);
            }
            else {
                builder = this._addSuiteToBuilder(builder, runner, specFileName, suite);
            }
        }
        return builder.build();
    }
    _getStandardOutput(test) {
        let standardOutput = [];
        test.output.forEach((data) => {
            switch (data.type) {
                case 'command':
                    standardOutput.push(data.method
                        ? `COMMAND: ${data.method.toUpperCase()} ` +
                            `${data.endpoint.replace(':sessionId', data.sessionId)} - ${this._format(data.body)}`
                        : `COMMAND: ${data.command} - ${this._format(data.params)}`);
                    break;
                case 'result':
                    standardOutput.push(`RESULT: ${this._format(data.body)}`);
                    break;
            }
        });
        return standardOutput.length ? standardOutput.join('\n') : '';
    }
    _format(val) {
        return JSON.stringify(utils_1.limit(val));
    }
}
exports.default = JunitReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnRkFBd0M7QUFDeEMsOERBQWlGO0FBRWpGLG1DQUErQjtBQVMvQixNQUFNLGFBQWMsU0FBUSxrQkFBWTtJQVFwQyxZQUFvQixPQUE2QjtRQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUU3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxZQUFZLE1BQU07WUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZTtZQUM5QixDQUFDLENBQUMsZUFBZSxDQUFBO0lBQ3pCLENBQUM7SUFFRCxXQUFXLENBQUUsTUFBbUI7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ25CLENBQUM7SUFFTyxZQUFZLENBQUUsSUFBSSxHQUFHLGNBQWM7UUFDdkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQzFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FDaEMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDZixDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQWlCO1FBSXJDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUE7UUFDckgsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJ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