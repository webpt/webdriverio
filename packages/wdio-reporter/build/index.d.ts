/// <reference types="node" />
import type { WriteStream } from 'fs';
import { EventEmitter } from 'events';
import type { Reporters } from '@wdio/types';
import SuiteStats from './stats/suite';
import HookStats from './stats/hook';
import TestStats from './stats/test';
import RunnerStats from './stats/runner';
import { AfterCommandArgs, BeforeCommandArgs, CommandArgs, Tag, Argument } from './types';
declare type CustomWriteStream = {
    write: (content: any) => boolean;
};
export default class WDIOReporter extends EventEmitter {
    options: Partial<Reporters.Options>;
    outputStream: WriteStream | CustomWriteStream;
    failures: number;
    suites: Record<string, SuiteStats>;
    hooks: Record<string, HookStats>;
    tests: Record<string, TestStats>;
    currentSuites: SuiteStats[];
    counts: {
        suites: number;
        tests: number;
        hooks: number;
        passes: number;
        skipping: number;
        failures: number;
    };
    retries: number;
    runnerStat?: RunnerStats;
    isContentPresent: boolean;
    constructor(options: Partial<Reporters.Options>);
    get isSynchronised(): boolean;
    write(content: any): void;
    onRunnerStart(runnerStats: RunnerStats): void;
    onBeforeCommand(commandArgs: BeforeCommandArgs): void;
    onAfterCommand(commandArgs: AfterCommandArgs): void;
    onSuiteStart(suiteStats: SuiteStats): void;
    onHookStart(hookStat: HookStats): void;
    onHookEnd(hookStats: HookStats): void;
    onTestStart(testStats: TestStats): void;
    onTestPass(testStats: TestStats): void;
    onTestFail(testStats: TestStats): void;
    onTestRetry(testStats: TestStats): void;
    onTestSkip(testStats: TestStats): void;
    onTestEnd(testStats: TestStats): void;
    onSuiteEnd(suiteStats: SuiteStats): void;
    onRunnerEnd(runnerStats: RunnerStats): void;
}
export { SuiteStats, Tag, HookStats, TestStats, RunnerStats, BeforeCommandArgs, AfterCommandArgs, CommandArgs, Argument };
//# sourceMappingURL=index.d.ts.map