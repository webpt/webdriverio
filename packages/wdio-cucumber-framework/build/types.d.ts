import type { Capabilities } from '@wdio/types';
import type { messages } from '@cucumber/messages';
import type { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
export interface CucumberOptions {
    backtrace: boolean;
    requireModule: string[];
    failAmbiguousDefinitions: boolean;
    failFast: boolean;
    ignoreUndefinedDefinitions: boolean;
    names: (string | RegExp)[];
    profile: string[];
    require: string[];
    snippetSyntax?: string;
    snippets: boolean;
    source: boolean;
    strict: boolean;
    tagExpression: string;
    tagsInTitle: boolean;
    timeout: number;
    scenarioLevelReporter: boolean;
    order: string;
    featureDefaultLanguage: string;
}
export interface ReporterOptions {
    capabilities: Capabilities.RemoteCapability;
    ignoreUndefinedDefinitions: boolean;
    failAmbiguousDefinitions: boolean;
    tagsInTitle: boolean;
    scenarioLevelReporter: boolean;
}
export interface TestHookDefinitionConfig {
    code: Function;
    line: number;
    options: any;
    uri: string;
}
export interface HookParams {
    uri?: string | null;
    feature?: messages.GherkinDocument.IFeature | null;
    scenario?: messages.IPickle;
    step?: messages.Pickle.IPickleStep;
}
export interface StepDefinitionOptions {
    retry: number;
}
export interface HookFunctionExtension {
    beforeFeature?(uri: string, feature: messages.GherkinDocument.IFeature): void;
    beforeScenario?(world: ITestCaseHookParameter): void;
    beforeStep?(step: messages.Pickle.IPickleStep, context: unknown): void;
    afterStep?(step: messages.Pickle.IPickleStep, context: unknown): void;
    afterScenario?(world: ITestCaseHookParameter): void;
    afterFeature?(uri: string, feature: messages.GherkinDocument.IFeature): void;
}
//# sourceMappingURL=types.d.ts.map