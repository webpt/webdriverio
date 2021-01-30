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
const reporter_1 = __importDefault(require("@wdio/reporter"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const Allure = require('allure-js-commons');
const Step = require('allure-js-commons/beans/step');
class AllureReporter extends reporter_1.default {
    constructor(options = {}) {
        const outputDir = options.outputDir || 'allure-results';
        super({
            ...options,
            outputDir,
        });
        this._allure = new Allure();
        this._capabilities = {};
        this._options = options;
        this._allure.setOptions({ targetDir: outputDir });
        this.registerListeners();
        this._lastScreenshot = undefined;
    }
    registerListeners() {
        process.on(constants_1.events.addLabel, this.addLabel.bind(this));
        process.on(constants_1.events.addFeature, this.addFeature.bind(this));
        process.on(constants_1.events.addStory, this.addStory.bind(this));
        process.on(constants_1.events.addSeverity, this.addSeverity.bind(this));
        process.on(constants_1.events.addIssue, this.addIssue.bind(this));
        process.on(constants_1.events.addTestId, this.addTestId.bind(this));
        process.on(constants_1.events.addEnvironment, this.addEnvironment.bind(this));
        process.on(constants_1.events.addAttachment, this.addAttachment.bind(this));
        process.on(constants_1.events.addDescription, this.addDescription.bind(this));
        process.on(constants_1.events.startStep, this.startStep.bind(this));
        process.on(constants_1.events.endStep, this.endStep.bind(this));
        process.on(constants_1.events.addStep, this.addStep.bind(this));
        process.on(constants_1.events.addArgument, this.addArgument.bind(this));
    }
    onRunnerStart(runner) {
        this._config = runner.config;
        this._capabilities = runner.capabilities;
        this._isMultiremote = runner.isMultiremote || false;
    }
    onSuiteStart(suite) {
        if (this._options.useCucumberStepReporter) {
            if (suite.type === 'feature') {
                return this._allure.startSuite(suite.title);
            }
            this._allure.startCase(suite.title);
            const currentTest = this._allure.getCurrentTest();
            this.getLabels(suite).forEach(({ name, value }) => {
                currentTest.addLabel(name, value);
            });
            if (suite.description) {
                this.addDescription(suite);
            }
            return this.setCaseParameters(suite.cid);
        }
        const currentSuite = this._allure.getCurrentSuite();
        const prefix = currentSuite ? currentSuite.name + ': ' : '';
        this._allure.startSuite(prefix + suite.title);
    }
    onSuiteEnd(suite) {
        if (this._options.useCucumberStepReporter && suite.type === 'scenario') {
            suite.hooks = suite.hooks.map((hook) => {
                hook.state = hook.state ? hook.state : 'passed';
                return hook;
            });
            const suiteChildren = [...suite.tests, ...suite.hooks];
            const isPassed = !suiteChildren.some(item => item.state !== 'passed');
            if (isPassed) {
                return this._allure.endCase('passed');
            }
            const isSkipped = suiteChildren.every(item => [constants_1.PASSED, constants_1.SKIPPED].indexOf(item.state) >= 0);
            if (isSkipped) {
                return this._allure.endCase(constants_1.PENDING);
            }
            return;
        }
        this._allure.endSuite();
    }
    onTestStart(test) {
        const testTitle = test.currentTest ? test.currentTest : test.title;
        if (this.isAnyTestRunning() && this._allure.getCurrentTest().name == testTitle) {
            this.setCaseParameters(test.cid);
            return;
        }
        if (this._options.useCucumberStepReporter) {
            return this._allure.startStep(testTitle);
        }
        this._allure.startCase(testTitle);
        this.setCaseParameters(test.cid);
    }
    setCaseParameters(cid) {
        const currentTest = this._allure.getCurrentTest();
        if (!this._isMultiremote) {
            const caps = this._capabilities;
            const { browserName, deviceName, desired, device } = caps;
            let targetName = device || browserName || deviceName || cid;
            if (desired && desired.deviceName && desired.platformVersion) {
                targetName = `${device || desired.deviceName} ${desired.platformVersion}`;
            }
            const browserstackVersion = caps.os_version || caps.osVersion;
            const version = browserstackVersion || caps.browserVersion || caps.version || caps.platformVersion || '';
            const paramName = (deviceName || device) ? 'device' : 'browser';
            const paramValue = version ? `${targetName}-${version}` : targetName;
            currentTest.addParameter('argument', paramName, paramValue);
        }
        else {
            currentTest.addParameter('argument', 'isMultiremote', 'true');
        }
        currentTest.addLabel('language', 'javascript');
        currentTest.addLabel('framework', 'wdio');
        currentTest.addLabel('thread', cid);
    }
    getLabels({ tags }) {
        const labels = [];
        if (tags) {
            tags.forEach((tag) => {
                const label = tag.name.replace(/[@]/, '').split('=');
                if (label.length === 2) {
                    labels.push({ name: label[0], value: label[1] });
                }
            });
        }
        return labels;
    }
    onTestPass() {
        if (this._options.useCucumberStepReporter) {
            return this._allure.endStep('passed');
        }
        this._allure.endCase(constants_1.PASSED);
    }
    onTestFail(test) {
        if (this._options.useCucumberStepReporter) {
            const testStatus = utils_1.getTestStatus(test, this._config);
            const stepStatus = Object.values(constants_1.stepStatuses).indexOf(testStatus) >= 0 ?
                testStatus : 'failed';
            this._allure.endStep(stepStatus);
            this._allure.endCase(testStatus, utils_1.getErrorFromFailedTest(test));
            return;
        }
        if (!this.isAnyTestRunning()) {
            this.onTestStart(test);
        }
        else {
            this._allure.getCurrentTest().name = test.title;
        }
        const status = utils_1.getTestStatus(test, this._config);
        while (this._allure.getCurrentSuite().currentStep instanceof Step) {
            this._allure.endStep(status);
        }
        this._allure.endCase(status, utils_1.getErrorFromFailedTest(test));
    }
    onTestSkip(test) {
        if (this._options.useCucumberStepReporter) {
            this._allure.endStep('canceled');
        }
        else if (!this._allure.getCurrentTest() || this._allure.getCurrentTest().name !== test.title) {
            this._allure.pendingCase(test.title);
        }
        else {
            this._allure.endCase('pending');
        }
    }
    onBeforeCommand(command) {
        if (!this.isAnyTestRunning()) {
            return;
        }
        const { disableWebdriverStepsReporting } = this._options;
        if (disableWebdriverStepsReporting || this._isMultiremote) {
            return;
        }
        this._allure.startStep(command.method
            ? `${command.method} ${command.endpoint}`
            : command.command);
        const payload = command.body || command.params;
        if (!utils_1.isEmpty(payload)) {
            this.dumpJSON('Request', payload);
        }
    }
    onAfterCommand(command) {
        const { disableWebdriverStepsReporting, disableWebdriverScreenshotsReporting } = this._options;
        if (this.isScreenshotCommand(command) && command.result.value) {
            if (!disableWebdriverScreenshotsReporting) {
                this._lastScreenshot = command.result.value;
            }
        }
        if (!this.isAnyTestRunning()) {
            return;
        }
        this.attachScreenshot();
        if (this._isMultiremote) {
            return;
        }
        if (!disableWebdriverStepsReporting) {
            if (command.result && command.result.value && !this.isScreenshotCommand(command)) {
                this.dumpJSON('Response', command.result.value);
            }
            const suite = this._allure.getCurrentSuite();
            if (!suite || !(suite.currentStep instanceof Step)) {
                return;
            }
            this._allure.endStep('passed');
        }
    }
    onHookStart(hook) {
        if (!hook.parent || !this._allure.getCurrentSuite()) {
            return false;
        }
        if (this._options.disableMochaHooks && utils_1.isMochaEachHooks(hook.title)) {
            if (this._allure.getCurrentTest()) {
                this._allure.startStep(hook.title);
            }
            return;
        }
        if (this._options.disableMochaHooks && utils_1.isMochaAllHooks(hook.title)) {
            return;
        }
        this.onTestStart(hook);
    }
    onHookEnd(hook) {
        if (!hook.parent || !this._allure.getCurrentSuite() || (this._options.disableMochaHooks && !utils_1.isMochaAllHooks(hook.title) && !this._allure.getCurrentTest())) {
            return false;
        }
        if (this._options.disableMochaHooks && utils_1.isMochaEachHooks(hook.title)) {
            if (hook.error) {
                this._allure.endStep('failed');
            }
            else {
                this._allure.endStep('passed');
            }
            return;
        }
        if (hook.error) {
            if (this._options.disableMochaHooks && utils_1.isMochaAllHooks(hook.title)) {
                this.onTestStart(hook);
                this.attachScreenshot();
            }
            this.onTestFail(hook);
        }
        else if (this._options.disableMochaHooks || this._options.useCucumberStepReporter) {
            if (!utils_1.isMochaAllHooks(hook.title)) {
                this.onTestPass();
                if (this._allure.getCurrentTest().steps.length === 0 && !this._options.useCucumberStepReporter) {
                    this._allure.getCurrentSuite().testcases.pop();
                }
                else if (this._options.useCucumberStepReporter) {
                    const step = this._allure.getCurrentTest().steps.pop();
                    if (step && step.attachments.length >= 1) {
                        step.attachments.forEach((attachment) => {
                            this._allure.getCurrentTest().addAttachment(attachment);
                        });
                    }
                }
            }
        }
        else if (!this._options.disableMochaHooks)
            this.onTestPass();
    }
    addLabel({ name, value }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        test.addLabel(name, value);
    }
    addStory({ storyName }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        test.addLabel('story', storyName);
    }
    addFeature({ featureName }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        test.addLabel('feature', featureName);
    }
    addSeverity({ severity }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        test.addLabel('severity', severity);
    }
    addIssue({ issue }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        const issueLink = utils_1.getLinkByTemplate(this._options.issueLinkTemplate, issue);
        test.addLabel('issue', issueLink);
    }
    addTestId({ testId }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        const tmsLink = utils_1.getLinkByTemplate(this._options.tmsLinkTemplate, testId);
        test.addLabel('testId', tmsLink);
    }
    addEnvironment({ name, value }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        test.addParameter('environment-variable', name, value);
    }
    addDescription({ description, descriptionType }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        test.setDescription(description, descriptionType);
    }
    addAttachment({ name, content, type = 'text/plain' }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        if (type === 'application/json') {
            this.dumpJSON(name, content);
        }
        else {
            this._allure.addAttachment(name, Buffer.from(content), type);
        }
    }
    startStep(title) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        this._allure.startStep(title);
    }
    endStep(status) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        this._allure.endStep(status);
    }
    addStep({ step }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        this.startStep(step.title);
        if (step.attachment) {
            this.addAttachment(step.attachment);
        }
        this.endStep(step.status);
    }
    addArgument({ name, value }) {
        if (!this.isAnyTestRunning()) {
            return false;
        }
        const test = this._allure.getCurrentTest();
        test.addParameter('argument', name, value);
    }
    isAnyTestRunning() {
        return this._allure.getCurrentSuite() && this._allure.getCurrentTest();
    }
    isScreenshotCommand(command) {
        const isScrenshotEndpoint = /\/session\/[^/]*(\/element\/[^/]*)?\/screenshot/;
        return ((command.endpoint && isScrenshotEndpoint.test(command.endpoint)) ||
            command.command === 'takeScreenshot');
    }
    dumpJSON(name, json) {
        const content = JSON.stringify(json, null, 2);
        const isStr = typeof content === 'string';
        this._allure.addAttachment(name, isStr ? content : `${content}`, isStr ? 'application/json' : 'text/plain');
    }
    attachScreenshot() {
        if (this._lastScreenshot && !this._options.disableWebdriverScreenshotsReporting) {
            this._allure.addAttachment('Screenshot', Buffer.from(this._lastScreenshot, 'base64'));
            this._lastScreenshot = undefined;
        }
    }
}
AllureReporter.addFeature = (featureName) => {
    utils_1.tellReporter(constants_1.events.addFeature, { featureName });
};
AllureReporter.addLabel = (name, value) => {
    utils_1.tellReporter(constants_1.events.addLabel, { name, value });
};
AllureReporter.addSeverity = (severity) => {
    utils_1.tellReporter(constants_1.events.addSeverity, { severity });
};
AllureReporter.addIssue = (issue) => {
    utils_1.tellReporter(constants_1.events.addIssue, { issue });
};
AllureReporter.addTestId = (testId) => {
    utils_1.tellReporter(constants_1.events.addTestId, { testId });
};
AllureReporter.addStory = (storyName) => {
    utils_1.tellReporter(constants_1.events.addStory, { storyName });
};
AllureReporter.addEnvironment = (name, value) => {
    utils_1.tellReporter(constants_1.events.addEnvironment, { name, value });
};
AllureReporter.addDescription = (description, descriptionType) => {
    utils_1.tellReporter(constants_1.events.addDescription, { description, descriptionType });
};
AllureReporter.addAttachment = (name, content, type) => {
    if (!type) {
        type = content instanceof Buffer ? 'image/png' : typeof content === 'string' ? 'text/plain' : 'application/json';
    }
    utils_1.tellReporter(constants_1.events.addAttachment, { name, content, type });
};
AllureReporter.startStep = (title) => {
    utils_1.tellReporter(constants_1.events.startStep, title);
};
AllureReporter.endStep = (status = 'passed') => {
    if (!Object.values(constants_1.stepStatuses).includes(status)) {
        throw new Error(`Step status must be ${Object.values(constants_1.stepStatuses).join(' or ')}. You tried to set "${status}"`);
    }
    utils_1.tellReporter(constants_1.events.endStep, status);
};
AllureReporter.addStep = (title, { content, name = 'attachment', type = 'text/plain' } = {}, status = 'passed') => {
    if (!Object.values(constants_1.stepStatuses).includes(status)) {
        throw new Error(`Step status must be ${Object.values(constants_1.stepStatuses).join(' or ')}. You tried to set "${status}"`);
    }
    const step = content ? { title, attachment: { content, name, type }, status } : { title, status };
    utils_1.tellReporter(constants_1.events.addStep, { step });
};
AllureReporter.addArgument = (name, value) => {
    utils_1.tellReporter(constants_1.events.addArgument, { name, value });
};
exports.default = AllureReporter;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBR3VCO0FBR3ZCLG1DQUdnQjtBQUNoQiwyQ0FBNEU7QUFXNUUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDM0MsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUE7QUFFcEQsTUFBTSxjQUFlLFNBQVEsa0JBQVk7SUFRckMsWUFBWSxVQUFpQyxFQUFFO1FBQzNDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksZ0JBQWdCLENBQUE7UUFDdkQsS0FBSyxDQUFDO1lBQ0YsR0FBRyxPQUFPO1lBQ1YsU0FBUztTQUNaLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtRQUV2QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBRXhCLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFBO0lBQ3BDLENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLENBQUMsRUFBRSxDQUFDLGtCQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ3pELE9BQU8sQ0FBQyxFQUFF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