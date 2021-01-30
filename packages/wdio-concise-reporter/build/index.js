"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reporter_1 = __importDefault(require("@wdio/reporter"));
const chalk_1 = __importDefault(require("chalk"));
class ConciseReporter extends reporter_1.default {
    constructor(options) {
        super(Object.assign(options, { stdout: true }));
        this._suiteUids = [];
        this._suites = [];
        this._stateCounts = { failed: 0 };
    }
    onSuiteStart(suite) {
        this._suiteUids.push(suite.uid);
    }
    onSuiteEnd(suite) {
        this._suites.push(suite);
    }
    onTestFail() {
        this._stateCounts.failed++;
    }
    onRunnerEnd(runner) {
        this.printReport(runner);
    }
    printReport(runner) {
        const header = chalk_1.default.yellow('========= Your concise report ==========');
        const output = [
            this.getEnviromentCombo(runner.capabilities),
            this.getCountDisplay(),
            ...this.getFailureDisplay()
        ];
        this.write(`${header}\n${output.join('\n')}\n`);
    }
    getCountDisplay() {
        const failedTestsCount = this._stateCounts.failed;
        return failedTestsCount > 0
            ? `Test${failedTestsCount > 1 ? 's' : ''} failed (${failedTestsCount}):`
            : 'All went well !!';
    }
    getFailureDisplay() {
        const output = [];
        this.getOrderedSuites().map(suite => suite.tests.map(test => {
            var _a;
            if (test.state === 'failed') {
                output.push(`  Fail : ${chalk_1.default.red(test.title)}`, `    ${test.error.type} : ${chalk_1.default.yellow((_a = test.error) === null || _a === void 0 ? void 0 : _a.message)}`);
            }
        }));
        return output;
    }
    getOrderedSuites() {
        const orderedSuites = [];
        this._suiteUids.map(uid => this._suites.map(suite => {
            if (suite.uid === uid) {
                orderedSuites.push(suite);
            }
        }));
        return orderedSuites;
    }
    getEnviromentCombo(caps) {
        const device = caps.deviceName;
        const browser = caps.browserName || caps.browser;
        const version = caps.version || caps.platformVersion || caps.browser_version;
        const platform = caps.os ? (caps.os + ' ' + caps.os_version) : (caps.platform || caps.platformName);
        if (device) {
            const program = (caps.app || '').replace('sauce-storage:', '') || caps.browserName;
            const executing = program ? `executing ${program}` : '';
            return `${device} on ${platform} ${version} ${executing}`.trim();
        }
        return browser
            + (version ? ` (v${version})` : '')
            + (platform ? ` on ${platform}` : '');
    }
}
exports.default = ConciseReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBc0U7QUFDdEUsa0RBQXlCO0FBSXpCLE1BQXFCLGVBQWdCLFNBQVEsa0JBQVk7SUFNckQsWUFBWSxPQUEwQjtRQUlsQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBUjNDLGVBQVUsR0FBYSxFQUFFLENBQUE7UUFDekIsWUFBTyxHQUFpQixFQUFFLENBQUE7UUFDMUIsaUJBQVksR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQTtJQU9wQyxDQUFDO0lBRUQsWUFBWSxDQUFFLEtBQWlCO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsVUFBVSxDQUFFLEtBQWlCO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUM5QixDQUFDO0lBRUQsV0FBVyxDQUFFLE1BQW1CO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQU1ELFdBQVcsQ0FBQyxNQUFtQjtRQUMzQixNQUFNLE1BQU0sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDLDBDQUEwQyxDQUFDLENBQUE7UUFFdkUsTUFBTSxNQUFNLEdBQUc7WUFDWCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFlBQWdELENBQUM7WUFDaEYsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtTQUM5QixDQUFB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