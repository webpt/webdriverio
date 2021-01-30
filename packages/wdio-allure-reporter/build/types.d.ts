export interface AllureReporterOptions {
    outputDir?: string;
    useCucumberStepReporter?: boolean;
    disableMochaHooks?: boolean;
    disableWebdriverStepsReporting?: boolean;
    disableWebdriverScreenshotsReporting?: boolean;
    issueLinkTemplate?: string;
    tmsLinkTemplate?: string;
}
export interface AddLabelEventArgs {
    name: string;
    value: string;
}
export interface AddStoryEventArgs {
    storyName: string;
}
export interface AddFeatureEventArgs {
    featureName: string;
}
export interface AddSeverityEventArgs {
    severity: string;
}
export interface AddIssueEventArgs {
    issue: string;
}
export interface AddTestIdEventArgs {
    testId: string;
}
export interface AddEnvironmentEventArgs {
    name: string;
    value: string;
}
declare enum TYPE {
    TEXT = "text",
    HTML = "html",
    MARKDOWN = "markdown"
}
export interface AddDescriptionEventArgs {
    description?: string;
    descriptionType?: TYPE;
}
export interface AddAttachmentEventArgs {
    name: string;
    content: string | object;
    type: string;
}
export interface Step {
    attachments: Attachment[];
    addStep(step: Step): void;
    addAttachment(attachment: Attachment): void;
    end(status: Status, error: Error, timestamp?: number): void;
    toXML(): string;
}
export declare type Status = 'passed' | 'pending' | 'skipped' | 'failed' | 'broken' | 'canceled';
export interface Attachment {
    addStep(step: Step): void;
    addAttachment(attachment: Attachment): void;
    end(status: Status, error: Error, timestamp?: number): void;
    toXML(): string;
}
export {};
//# sourceMappingURL=types.d.ts.map