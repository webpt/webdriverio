import WDIOReporter, { SuiteStats, RunnerStats } from '@wdio/reporter';
import type { Capabilities, Reporters } from '@wdio/types';
export default class ConciseReporter extends WDIOReporter {
    private _suiteUids;
    private _suites;
    private _stateCounts;
    constructor(options: Reporters.Options);
    onSuiteStart(suite: SuiteStats): void;
    onSuiteEnd(suite: SuiteStats): void;
    onTestFail(): void;
    onRunnerEnd(runner: RunnerStats): void;
    printReport(runner: RunnerStats): void;
    getCountDisplay(): string;
    getFailureDisplay(): string[];
    getOrderedSuites(): SuiteStats[];
    getEnviromentCombo(caps: Capabilities.DesiredCapabilities): string;
}
//# sourceMappingURL=index.d.ts.map