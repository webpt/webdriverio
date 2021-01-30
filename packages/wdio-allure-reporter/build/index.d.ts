/// <reference types="node" />
import WDIOReporter, { SuiteStats, HookStats, RunnerStats, TestStats, BeforeCommandArgs, AfterCommandArgs, CommandArgs } from '@wdio/reporter';
import { AddAttachmentEventArgs, AddDescriptionEventArgs, AddEnvironmentEventArgs, AddFeatureEventArgs, AddIssueEventArgs, AddLabelEventArgs, AddSeverityEventArgs, AddStoryEventArgs, AddTestIdEventArgs, AllureReporterOptions, Status } from './types';
declare class AllureReporter extends WDIOReporter {
    private _allure;
    private _capabilities;
    private _isMultiremote?;
    private _config?;
    private _lastScreenshot?;
    private _options;
    constructor(options?: AllureReporterOptions);
    registerListeners(): void;
    onRunnerStart(runner: RunnerStats): void;
    onSuiteStart(suite: SuiteStats): any;
    onSuiteEnd(suite: SuiteStats): any;
    onTestStart(test: TestStats | HookStats): any;
    setCaseParameters(cid: string | undefined): void;
    getLabels({ tags }: SuiteStats): {
        name: string;
        value: string;
    }[];
    onTestPass(): any;
    onTestFail(test: TestStats | HookStats): void;
    onTestSkip(test: TestStats): void;
    onBeforeCommand(command: BeforeCommandArgs): void;
    onAfterCommand(command: AfterCommandArgs): void;
    onHookStart(hook: HookStats): false | undefined;
    onHookEnd(hook: HookStats): false | undefined;
    addLabel({ name, value }: AddLabelEventArgs): false | undefined;
    addStory({ storyName }: AddStoryEventArgs): false | undefined;
    addFeature({ featureName }: AddFeatureEventArgs): false | undefined;
    addSeverity({ severity }: AddSeverityEventArgs): false | undefined;
    addIssue({ issue }: AddIssueEventArgs): false | undefined;
    addTestId({ testId }: AddTestIdEventArgs): false | undefined;
    addEnvironment({ name, value }: AddEnvironmentEventArgs): false | undefined;
    addDescription({ description, descriptionType }: AddDescriptionEventArgs): false | undefined;
    addAttachment({ name, content, type }: AddAttachmentEventArgs): false | undefined;
    startStep(title: string): false | undefined;
    endStep(status: Status): false | undefined;
    addStep({ step }: any): false | undefined;
    addArgument({ name, value }: any): false | undefined;
    isAnyTestRunning(): any;
    isScreenshotCommand(command: CommandArgs): boolean;
    dumpJSON(name: string, json: object): void;
    attachScreenshot(): void;
    static addFeature: (featureName: string) => void;
    static addLabel: (name: string, value: string) => void;
    static addSeverity: (severity: string) => void;
    static addIssue: (issue: string) => void;
    static addTestId: (testId: string) => void;
    static addStory: (storyName: string) => void;
    static addEnvironment: (name: string, value: string) => void;
    static addDescription: (description: string, descriptionType: string) => void;
    static addAttachment: (name: string, content: string | Buffer | object, type: string) => void;
    static startStep: (title: string) => void;
    static endStep: (status?: Status) => void;
    static addStep: (title: string, { content, name, type }?: any, status?: Status) => void;
    static addArgument: (name: string, value: string) => void;
}
export default AllureReporter;
export { AllureReporterOptions };
export * from './types';
declare global {
    namespace WebdriverIO {
        interface ReporterOption extends AllureReporterOptions {
        }
    }
}
//# sourceMappingURL=index.d.ts.map