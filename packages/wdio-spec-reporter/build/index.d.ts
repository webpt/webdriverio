import WDIOReporter, { SuiteStats, HookStats, RunnerStats, TestStats } from '@wdio/reporter';
import { Capabilities } from '@wdio/types';
import type { Symbols, SpecReporterOptions, TestLink } from './types';
export default class SpecReporter extends WDIOReporter {
    private _suiteUids;
    private _indents;
    private _suiteIndents;
    private _orderedSuites;
    private _stateCounts;
    private _symbols;
    constructor(options: SpecReporterOptions);
    onSuiteStart(suite: SuiteStats): void;
    onSuiteEnd(): void;
    onHookEnd(hook: HookStats): void;
    onTestPass(): void;
    onTestFail(): void;
    onTestSkip(): void;
    onRunnerEnd(runner: RunnerStats): void;
    printReport(runner: RunnerStats): void;
    getTestLink({ config, sessionId, isMultiremote, instanceName, capabilities }: TestLink): string[];
    getHeaderDisplay(runner: RunnerStats): string[];
    getEventsToReport(suite: SuiteStats): (HookStats | TestStats)[];
    getResultDisplay(): string[];
    getCountDisplay(duration: string): string[];
    getFailureDisplay(): string[];
    getOrderedSuites(): SuiteStats[];
    indent(uid: string): string;
    getSymbol(state?: keyof Symbols): string;
    getColor(state?: string): "red" | "green" | "cyan" | "gray";
    getEnviromentCombo(capability: Capabilities.RemoteCapability, verbose?: boolean, isMultiremote?: boolean): string;
}
//# sourceMappingURL=index.d.ts.map