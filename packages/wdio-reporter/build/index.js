"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnerStats = exports.TestStats = exports.HookStats = exports.SuiteStats = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = require("fs-extra");
const events_1 = require("events");
const utils_1 = require("./utils");
const suite_1 = __importDefault(require("./stats/suite"));
exports.SuiteStats = suite_1.default;
const hook_1 = __importDefault(require("./stats/hook"));
exports.HookStats = hook_1.default;
const test_1 = __importDefault(require("./stats/test"));
exports.TestStats = test_1.default;
const runner_1 = __importDefault(require("./stats/runner"));
exports.RunnerStats = runner_1.default;
class WDIOReporter extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.failures = 0;
        this.suites = {};
        this.hooks = {};
        this.tests = {};
        this.currentSuites = [];
        this.counts = {
            suites: 0,
            tests: 0,
            hooks: 0,
            passes: 0,
            skipping: 0,
            failures: 0
        };
        this.retries = 0;
        this.isContentPresent = false;
        if (this.options.outputDir) {
            fs_extra_1.ensureDirSync(this.options.outputDir);
        }
        this.outputStream = (this.options.stdout || !this.options.logFile) && this.options.writeStream
            ? this.options.writeStream
            : fs_extra_1.createWriteStream(this.options.logFile);
        let currentTest;
        const rootSuite = new suite_1.default({
            title: '(root)',
            fullTitle: '(root)',
        });
        this.currentSuites.push(rootSuite);
        this.on('client:beforeCommand', this.onBeforeCommand.bind(this));
        this.on('client:afterCommand', this.onAfterCommand.bind(this));
        this.on('runner:start', (runner) => {
            rootSuite.cid = runner.cid;
            this.runnerStat = new runner_1.default(runner);
            this.onRunnerStart(this.runnerStat);
        });
        this.on('suite:start', (params) => {
            const suite = new suite_1.default(params);
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentSuite.suites.push(suite);
            this.currentSuites.push(suite);
            this.suites[suite.uid] = suite;
            this.onSuiteStart(suite);
        });
        this.on('hook:start', (hook) => {
            const hookStats = new hook_1.default(hook);
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentSuite.hooks.push(hookStats);
            currentSuite.hooksAndTests.push(hookStats);
            this.hooks[hook.uid] = hookStats;
            this.onHookStart(hookStats);
        });
        this.on('hook:end', (hook) => {
            const hookStats = this.hooks[hook.uid];
            hookStats.complete(utils_1.getErrorsFromEvent(hook));
            this.counts.hooks++;
            this.onHookEnd(hookStats);
        });
        this.on('test:start', (test) => {
            test.retries = this.retries;
            currentTest = new test_1.default(test);
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentSuite.tests.push(currentTest);
            currentSuite.hooksAndTests.push(currentTest);
            this.tests[test.uid] = currentTest;
            this.onTestStart(currentTest);
        });
        this.on('test:pass', (test) => {
            const testStat = this.tests[test.uid];
            testStat.pass();
            this.counts.passes++;
            this.counts.tests++;
            this.onTestPass(testStat);
        });
        this.on('test:fail', (test) => {
            const testStat = this.tests[test.uid];
            testStat.fail(utils_1.getErrorsFromEvent(test));
            this.counts.failures++;
            this.counts.tests++;
            this.onTestFail(testStat);
        });
        this.on('test:retry', (test) => {
            const testStat = this.tests[test.uid];
            testStat.fail(utils_1.getErrorsFromEvent(test));
            this.onTestRetry(testStat);
            this.retries++;
        });
        this.on('test:pending', (test) => {
            test.retries = this.retries;
            const currentSuite = this.currentSuites[this.currentSuites.length - 1];
            currentTest = new test_1.default(test);
            if (test.uid in this.tests && this.tests[test.uid].state !== 'pending') {
                currentTest.uid = test.uid in this.tests ? 'skipped-' + this.counts.skipping : currentTest.uid;
            }
            const suiteTests = currentSuite.tests;
            if (!suiteTests.length || currentTest.uid !== suiteTests[suiteTests.length - 1].uid) {
                currentSuite.tests.push(currentTest);
                currentSuite.hooksAndTests.push(currentTest);
            }
            else {
                suiteTests[suiteTests.length - 1] = currentTest;
                currentSuite.hooksAndTests[currentSuite.hooksAndTests.length - 1] = currentTest;
            }
            this.tests[currentTest.uid] = currentTest;
            currentTest.skip(test.pendingReason);
            this.counts.skipping++;
            this.counts.tests++;
            this.onTestSkip(currentTest);
        });
        this.on('test:end', (test) => {
            const testStat = this.tests[test.uid];
            this.retries = 0;
            this.onTestEnd(testStat);
        });
        this.on('suite:end', (suite) => {
            const suiteStat = this.suites[suite.uid];
            suiteStat.complete();
            this.currentSuites.pop();
            this.onSuiteEnd(suiteStat);
        });
        this.on('runner:end', (runner) => {
            rootSuite.complete();
            if (this.runnerStat) {
                this.runnerStat.failures = runner.failures;
                this.runnerStat.retries = runner.retries;
                this.runnerStat.complete();
                this.onRunnerEnd(this.runnerStat);
            }
            const logFile = this.options.logFile;
            if (!this.isContentPresent && logFile && fs_1.default.existsSync(logFile)) {
                fs_1.default.unlinkSync(logFile);
            }
        });
        this.on('client:beforeCommand', (payload) => {
            if (!currentTest) {
                return;
            }
            currentTest.output.push(Object.assign(payload, { type: 'command' }));
        });
        this.on('client:afterCommand', (payload) => {
            if (!currentTest) {
                return;
            }
            currentTest.output.push(Object.assign(payload, { type: 'result' }));
        });
    }
    get isSynchronised() {
        return true;
    }
    write(content) {
        if (content) {
            this.isContentPresent = true;
        }
        this.outputStream.write(content);
    }
    onRunnerStart(runnerStats) { }
    onBeforeCommand(commandArgs) { }
    onAfterCommand(commandArgs) { }
    onSuiteStart(suiteStats) { }
    onHookStart(hookStat) { }
    onHookEnd(hookStats) { }
    onTestStart(testStats) { }
    onTestPass(testStats) { }
    onTestFail(testStats) { }
    onTestRetry(testStats) { }
    onTestSkip(testStats) { }
    onTestEnd(testStats) { }
    onSuiteEnd(suiteStats) { }
    onRunnerEnd(runnerStats) { }
}
exports.default = WDIOReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW1CO0FBRW5CLHVDQUEyRDtBQUMzRCxtQ0FBcUM7QUFHckMsbUNBQTRDO0FBQzVDLDBEQUFpRDtBQTRQN0MscUJBNVBHLGVBQVUsQ0E0UEg7QUEzUGQsd0RBQThDO0FBMlB6QixvQkEzUGQsY0FBUyxDQTJQYztBQTFQOUIsd0RBQThDO0FBMFBkLG9CQTFQekIsY0FBUyxDQTBQeUI7QUF6UHpDLDREQUFvRDtBQXlQVCxzQkF6UHBDLGdCQUFXLENBeVBvQztBQXBQdEQsTUFBcUIsWUFBYSxTQUFRLHFCQUFZO0lBbUJsRCxZQUFtQixPQUFtQztRQUNsRCxLQUFLLEVBQUUsQ0FBQTtRQURRLFlBQU8sR0FBUCxPQUFPLENBQTRCO1FBakJ0RCxhQUFRLEdBQUcsQ0FBQyxDQUFBO1FBQ1osV0FBTSxHQUErQixFQUFFLENBQUE7UUFDdkMsVUFBSyxHQUE4QixFQUFFLENBQUE7UUFDckMsVUFBSyxHQUE2QixFQUFFLENBQUE7UUFDcEMsa0JBQWEsR0FBaUIsRUFBRSxDQUFBO1FBQ2hDLFdBQU0sR0FBRztZQUNMLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1lBQ1QsUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQztTQUNkLENBQUE7UUFDRCxZQUFPLEdBQUcsQ0FBQyxDQUFBO1FBRVgscUJBQWdCLEdBQUcsS0FBSyxDQUFBO1FBTXBCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDeEIsd0JBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJ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