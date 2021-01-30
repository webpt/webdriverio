import WDIOReporter from '@wdio/reporter';
export default class CustomSmokeTestReporter extends WDIOReporter {
    onRunnerStart(): void;
    onBeforeCommand(): void;
    onAfterCommand(): void;
    onSuiteStart(): void;
    onHookStart(): void;
    onHookEnd(): void;
    onTestStart(): void;
    onTestPass(): void;
    onTestFail(): void;
    onTestSkip(): void;
    onTestEnd(): void;
    onSuiteEnd(): void;
    onRunnerEnd(): void;
}
//# sourceMappingURL=index.d.ts.map