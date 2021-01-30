"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reporter_1 = __importDefault(require("@wdio/reporter"));
const chalk_1 = __importDefault(require("chalk"));
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const utils_1 = require("./utils");
const DEFAULT_INDENT = '   ';
class SpecReporter extends reporter_1.default {
    constructor(options) {
        super(Object.assign({ stdout: true }, options));
        this._suiteUids = new Set();
        this._indents = 0;
        this._suiteIndents = {};
        this._orderedSuites = [];
        this._stateCounts = {
            passed: 0,
            failed: 0,
            skipped: 0
        };
        this._symbols = {
            passed: '✓',
            skipped: '-',
            pending: '?',
            failed: '✖'
        };
        this._symbols = { ...this._symbols, ...this.options.symbols || {} };
    }
    onSuiteStart(suite) {
        this._suiteUids.add(suite.uid);
        this._suiteIndents[suite.uid] = ++this._indents;
    }
    onSuiteEnd() {
        this._indents--;
    }
    onHookEnd(hook) {
        if (hook.error) {
            this._stateCounts.failed++;
        }
    }
    onTestPass() {
        this._stateCounts.passed++;
    }
    onTestFail() {
        this._stateCounts.failed++;
    }
    onTestSkip() {
        this._stateCounts.skipped++;
    }
    onRunnerEnd(runner) {
        this.printReport(runner);
    }
    printReport(runner) {
        const duration = `(${pretty_ms_1.default(runner._duration)})`;
        const preface = `[${this.getEnviromentCombo(runner.capabilities, false, runner.isMultiremote).trim()} #${runner.cid}]`;
        const divider = '------------------------------------------------------------------';
        const results = this.getResultDisplay();
        if (results.length === 0) {
            return;
        }
        const testLinks = runner.isMultiremote
            ? Object.entries(runner.capabilities).map(([instanceName, capabilities]) => this.getTestLink({
                config: runner.config,
                capabilities,
                sessionId: capabilities.sessionId,
                isMultiremote: runner.isMultiremote,
                instanceName
            })).filter((links) => links.length)
            : this.getTestLink(runner);
        const output = [
            ...this.getHeaderDisplay(runner),
            '',
            ...results,
            ...this.getCountDisplay(duration),
            ...this.getFailureDisplay(),
            ...(testLinks.length
                ? ['', ...testLinks]
                : [])
        ];
        const prefacedOutput = output.map((value) => {
            return value ? `${preface} ${value}` : preface;
        });
        this.write(`${divider}\n${prefacedOutput.join('\n')}\n`);
    }
    getTestLink({ config, sessionId, isMultiremote, instanceName, capabilities }) {
        const isSauceJob = ((config.hostname && config.hostname.includes('saucelabs')) ||
            capabilities && (capabilities['sauce:options'] ||
                capabilities.tunnelIdentifier ||
                (capabilities.alwaysMatch &&
                    capabilities.alwaysMatch['sauce:options'])));
        if (isSauceJob) {
            const dc = config.headless
                ? '.us-east-1'
                : ['eu', 'eu-central-1'].includes(config.region || '') ? '.eu-central-1' : '';
            const multiremoteNote = isMultiremote ? ` ${instanceName}` : '';
            return [`Check out${multiremoteNote} job at https://app${dc}.saucelabs.com/tests/${sessionId}`];
        }
        return [];
    }
    getHeaderDisplay(runner) {
        const combo = this.getEnviromentCombo(runner.capabilities, undefined, runner.isMultiremote).trim();
        const output = [
            `Spec: ${runner.specs[0]}`,
            `Running: ${combo}`
        ];
        if (runner.capabilities.sessionId) {
            output.push(`Session ID: ${runner.capabilities.sessionId}`);
        }
        return output;
    }
    getEventsToReport(suite) {
        return [
            ...suite.hooksAndTests
                .filter((item) => {
                return item.type === 'test' || Boolean(item.error);
            })
        ];
    }
    getResultDisplay() {
        const output = [];
        const suites = this.getOrderedSuites();
        for (const suite of suites) {
            if (suite.tests.length === 0 && suite.suites.length === 0 && suite.hooks.length === 0) {
                continue;
            }
            const suiteIndent = this.indent(suite.uid);
            output.push(`${suiteIndent}${suite.title}`);
            if (suite.description) {
                output.push(...suite.description.trim().split('\n')
                    .map((l) => `${suiteIndent}${chalk_1.default.grey(l.trim())}`));
                output.push('');
            }
            const eventsToReport = this.getEventsToReport(suite);
            for (const test of eventsToReport) {
                const testTitle = test.title;
                const state = test.state;
                const testIndent = `${DEFAULT_INDENT}${suiteIndent}`;
                output.push(`${testIndent}${chalk_1.default[this.getColor(state)](this.getSymbol(state))} ${testTitle}`);
                const args = test.argument;
                if (args && args.rows && args.rows.length) {
                    const data = utils_1.buildTableData(args.rows);
                    const rawTable = utils_1.printTable(data);
                    const table = utils_1.getFormattedRows(rawTable, testIndent);
                    output.push(...table);
                }
            }
            if (eventsToReport.length) {
                output.push('');
            }
        }
        return output;
    }
    getCountDisplay(duration) {
        const output = [];
        if (this._stateCounts.passed > 0) {
            const text = `${this._stateCounts.passed} passing ${duration}`;
            output.push(chalk_1.default[this.getColor('passed')](text));
            duration = '';
        }
        if (this._stateCounts.failed > 0) {
            const text = `${this._stateCounts.failed} failing ${duration}`.trim();
            output.push(chalk_1.default[this.getColor('failed')](text));
            duration = '';
        }
        if (this._stateCounts.skipped > 0) {
            const text = `${this._stateCounts.skipped} skipped ${duration}`.trim();
            output.push(chalk_1.default[this.getColor('skipped')](text));
        }
        return output;
    }
    getFailureDisplay() {
        let failureLength = 0;
        const output = [];
        const suites = this.getOrderedSuites();
        for (const suite of suites) {
            const suiteTitle = suite.title;
            const eventsToReport = this.getEventsToReport(suite);
            for (const test of eventsToReport) {
                if (test.state !== 'failed') {
                    continue;
                }
                const testTitle = test.title;
                const errors = test.errors || (test.error ? [test.error] : []);
                output.push('', `${++failureLength}) ${suiteTitle} ${testTitle}`);
                for (let error of errors) {
                    output.push(chalk_1.default.red(error.message));
                    if (error.stack) {
                        output.push(...error.stack.split(/\n/g).map(value => chalk_1.default.gray(value)));
                    }
                }
            }
        }
        return output;
    }
    getOrderedSuites() {
        if (this._orderedSuites.length) {
            return this._orderedSuites;
        }
        this._orderedSuites = [];
        for (const uid of this._suiteUids) {
            for (const [suiteUid, suite] of Object.entries(this.suites)) {
                if (suiteUid !== uid) {
                    continue;
                }
                this._orderedSuites.push(suite);
            }
        }
        return this._orderedSuites;
    }
    indent(uid) {
        const indents = this._suiteIndents[uid];
        return indents === 0 ? '' : Array(indents).join('    ');
    }
    getSymbol(state) {
        return (state && this._symbols[state]) || '?';
    }
    getColor(state) {
        let color = 'gray';
        switch (state) {
            case 'passed':
                color = 'green';
                break;
            case 'pending':
            case 'skipped':
                color = 'cyan';
                break;
            case 'failed':
                color = 'red';
                break;
        }
        return color;
    }
    getEnviromentCombo(capability, verbose = true, isMultiremote = false) {
        const caps = (capability.alwaysMatch ||
            capability);
        const device = caps.deviceName;
        const browser = isMultiremote ? 'MultiremoteBrowser' : (caps.browserName || caps.browser);
        const version = caps.browserVersion || caps.version || caps.platformVersion || caps.browser_version;
        const platform = isMultiremote
            ? ''
            : caps.platformName || caps.platform || (caps.os ? caps.os + (caps.os_version ? ` ${caps.os_version}` : '') : '(unknown)');
        if (device) {
            const program = (caps.app || '').replace('sauce-storage:', '') || caps.browserName;
            const executing = program ? `executing ${program}` : '';
            if (!verbose) {
                return `${device} ${platform} ${version}`;
            }
            return `${device} on ${platform} ${version} ${executing}`.trim();
        }
        if (!verbose) {
            return (browser + (version ? ` ${version} ` : ' ') + (platform)).trim();
        }
        if (isMultiremote) {
            return browser + (version ? ` (v${version})` : '') + ` on ${Object.values(capability).map((c) => c.browserName).join(', ')}`;
        }
        return browser + (version ? ` (v${version})` : '') + (` on ${platform}`);
    }
}
exports.default = SpecReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBc0c7QUFFdEcsa0RBQW9DO0FBQ3BDLDBEQUFnQztBQUNoQyxtQ0FBc0U7QUFHdEUsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFBO0FBRTVCLE1BQXFCLFlBQWEsU0FBUSxrQkFBWTtJQW9CbEQsWUFBYSxPQUE0QjtRQUlyQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBdkIzQyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN0QixhQUFRLEdBQUcsQ0FBQyxDQUFBO1FBQ1osa0JBQWEsR0FBMkIsRUFBRSxDQUFBO1FBQzFDLG1CQUFjLEdBQWlCLEVBQUUsQ0FBQTtRQUdqQyxpQkFBWSxHQUFlO1lBQy9CLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsQ0FBQztTQUNiLENBQUE7UUFFTyxhQUFRLEdBQVk7WUFDeEIsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsR0FBRztZQUNaLE9BQU8sRUFBRSxHQUFHO1lBQ1osTUFBTSxFQUFFLEdBQUc7U0FDZCxDQUFBO1FBT0csSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFBO0lBQ3ZFLENBQUM7SUFFRCxZQUFZLENBQUUsS0FBaUI7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUNuRCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRUQsU0FBUyxDQUFFLElBQWU7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtTQUM3QjtJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUM5QixDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFRCxXQUFXLENBQUUsTUFBbUI7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBS0QsV0FBVyxDQUFDLE1BQW1CO1FBQzNCLE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQTtRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFBO1FBQ3RILE1BQU0sT0FBTyxHQUFHLG9FQUFvRSxDQUFBO1FBR3BGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBR3ZDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTTtTQUNUO1FBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGFBQWE7WUFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN6RixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07Z0JBQ3JCLFlBQVk7Z0JBQ1osU0FBUyxFQUFFLFlBQVksQ0FBQyxTQUFTO2dCQUNqQyxhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7Z0JBQ25DLFlBQVk7YUFDZixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUIsTUFBTSxNQUFNLEdBQUc7WUFDWCxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7WUFDaEMsRUFBRTtZQUNGLEdBQUcsT0FBTztZQUNWLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7WUFDakMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNO2dCQUloQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxTQUFTLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQ1A7U0FDSixDQUFBO1FBR0QsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO1FBQ2xELENBQUMsQ0FBQyxDQUFBO1FBR0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sS0FBSyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBS0QsV0FBVyxDQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBWTtRQUNuRixNQUFNLFVBQVUsR0FBRyxDQUNmLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUxRCxZQUFZLElBQUksQ0FFWCxZQUFpRCxDQUFDLGVBQWUsQ0FBQztnQkFFbEUsWUFBaUQsQ0FBQyxnQkFBZ0I7Z0JBRW5FLENBQ0ssWUFBNkMsQ0FBQyxXQUFXO29CQUN6RCxZQUE2QyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FDOUUsQ0FDSixDQUNKLENBQUE7UUFFRCxJQUFJLFVBQVUsRUFBRTtZQUNaLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRO2dCQUN0QixDQUFDLENBQUMsWUFBWTtnQkFDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQ2pGLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQy9ELE9BQU8sQ0FBQyxZQUFZLGVBQWUsc0JBQXNCLEVBQUUsd0JBQXdCLFNBQVMsRUFBRSxDQUFDLENBQUE7U0FDbEc7UUFFRCxPQUFPLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFPRCxnQkFBZ0IsQ0FBRSxNQUFtQjtRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1FBR2xHLE1BQU0sTUFBTSxHQUFHO1lBQ1gsU0FBUyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFCLFlBQVksS0FBSyxFQUFFO1NBQ3RCLENBQUE7UUFNRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFO1lBRS9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7U0FDOUQ7UUFFRCxPQUFPLE1BQU0sQ0FBQTtJQUNqQixDQUFDO0lBT0QsaUJBQWlCLENBQUUsS0FBaUI7UUFDaEMsT0FBTztZQUlILEdBQUcsS0FBSyxDQUFDLGFBQWE7aUJBQ2pCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN0RCxDQUFDLENBQUM7U0FDVCxDQUFBO0lBQ0wsQ0FBQztJQU9ELGdCQUFnQjtRQUNaLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUV0QyxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUV4QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNuRixTQUFRO2FBQ1g7WUFHRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUcxQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBRzNDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztxQkFDOUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxlQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQ2xCO1lBRUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BELEtBQUssTUFBTSxJQUFJLElBQUksY0FBYyxFQUFFO2dCQUMvQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUN4QixNQUFNLFVBQVUsR0FBRyxHQUFHLGNBQWMsR0FBRyxXQUFXLEVBQUUsQ0FBQTtnQkFHcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxlQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFBO2dCQUc5RixNQUFNLElBQUksR0FBSSxJQUFrQixDQUFDLFFBQW9CLENBQUE7Z0JBQ3JELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZDLE1BQU0sSUFBSSxHQUFHLHNCQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUN0QyxNQUFNLFFBQVEsR0FBRyxrQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUNqQyxNQUFNLEtBQUssR0FBRyx3QkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUE7b0JBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtpQkFDeEI7YUFDSjtZQUdELElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNsQjtTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQU9ELGVBQWUsQ0FBRSxRQUFnQjtRQUM3QixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUE7UUFHM0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sWUFBWSxRQUFRLEVBQUUsQ0FBQTtZQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNqRCxRQUFRLEdBQUcsRUFBRSxDQUFBO1NBQ2hCO1FBR0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sWUFBWSxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNyRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNqRCxRQUFRLEdBQUcsRUFBRSxDQUFBO1NBQ2hCO1FBR0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sWUFBWSxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUNyRDtRQUVELE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7SUFNRCxpQkFBaUI7UUFDYixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUE7UUFDckIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBRXRDLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ3hCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDOUIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BELEtBQUssTUFBTSxJQUFJLElBQUksY0FBYyxFQUFFO2dCQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUN6QixTQUFRO2lCQUNYO2dCQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7Z0JBQzVCLE1BQU0sTUFBTSxHQUFZLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBRXZFLE1BQU0sQ0FBQyxJQUFJLENBQ1AsRUFBRSxFQUNGLEdBQUcsRUFBRSxhQUFhLEtBQUssVUFBVSxJQUFJLFNBQVMsRUFBRSxDQUVuRCxDQUFBO2dCQUNELEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO29CQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7b0JBQ3JDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQzNFO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7SUFNRCxnQkFBZ0I7UUFDWixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQTtTQUM3QjtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFBO1FBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMvQixLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3pELElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtvQkFDbEIsU0FBUTtpQkFDWDtnQkFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNsQztTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO0lBQzlCLENBQUM7SUFPRCxNQUFNLENBQUUsR0FBVztRQUNmLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkMsT0FBTyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDM0QsQ0FBQztJQU9ELFNBQVMsQ0FBRSxLQUFxQjtRQUM1QixPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUE7SUFDakQsQ0FBQztJQU9ELFFBQVEsQ0FBRSxLQUFjO1FBRXBCLElBQUksS0FBSyxHQUFnQixNQUFNLENBQUE7UUFFL0IsUUFBUSxLQUFLLEVBQUU7WUFDZixLQUFLLFFBQVE7Z0JBQ1QsS0FBSyxHQUFHLE9BQU8sQ0FBQTtnQkFDZixNQUFLO1lBQ1QsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFNBQVM7Z0JBQ1YsS0FBSyxHQUFHLE1BQU0sQ0FBQTtnQkFDZCxNQUFLO1lBQ1QsS0FBSyxRQUFRO2dCQUNULEtBQUssR0FBRyxLQUFLLENBQUE7Z0JBQ2IsTUFBSztTQUNSO1FBRUQsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQVFELGtCQUFrQixDQUFFLFVBQXlDLEVBQUUsT0FBTyxHQUFHLElBQUksRUFBRSxhQUFhLEdBQUcsS0FBSztRQUNoRyxNQUFNLElBQUksR0FBRyxDQUNQLFVBQTJDLENBQUMsV0FBZ0Q7WUFDN0YsVUFBK0MsQ0FDbkQsQ0FBQTtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUE7UUFDOUIsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQVF6RixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFBO1FBT25HLE1BQU0sUUFBUSxHQUFHLGFBQWE7WUFDMUIsQ0FBQyxDQUFDLEVBQUU7WUFDSixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUE7UUFHL0gsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDbEYsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDdkQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixPQUFPLEdBQUcsTUFBTSxJQUFJLFFBQVEsSUFBSSxPQUFPLEVBQUUsQ0FBQTthQUM1QztZQUNELE9BQU8sR0FBRyxNQUFNLE9BQU8sUUFBUSxJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUNuRTtRQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDMUU7UUFFRCxJQUFJLGFBQWEsRUFBRTtZQUNmLE9BQU8sT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7U0FDL0g7UUFFRCxPQUFPLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDNUUsQ0FBQztDQUNKO0FBeGFELCtCQXdhQyJ9