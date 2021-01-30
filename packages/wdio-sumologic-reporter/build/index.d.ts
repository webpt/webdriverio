import WDIOReporter, { RunnerStats, SuiteStats, TestStats } from '@wdio/reporter';
import type { Options } from './types';
export default class SumoLogicReporter extends WDIOReporter {
    private _options;
    private _interval;
    private _unsynced;
    private _isSynchronising;
    private _hasRunnerEnd;
    constructor(options: Options);
    get isSynchronised(): boolean;
    onRunnerStart(runner: RunnerStats): void;
    onSuiteStart(suite: SuiteStats): void;
    onTestStart(test: TestStats): void;
    onTestSkip(test: TestStats): void;
    onTestPass(test: TestStats): void;
    onTestFail(test: TestStats): void;
    onTestEnd(test: TestStats): void;
    onSuiteEnd(suite: SuiteStats): void;
    onRunnerEnd(runner: RunnerStats): void;
    sync(): Promise<void>;
}
export * from './types';
declare global {
    namespace WebdriverIO {
        interface ReporterOption extends Options {
        }
    }
}
//# sourceMappingURL=index.d.ts.map