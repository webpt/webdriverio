import { supportCodeLibraryBuilder } from '@cucumber/cucumber';
import { messages } from '@cucumber/messages';
import { Capabilities } from '@wdio/types';
export declare function createStepArgument({ argument }: messages.Pickle.IPickleStep): string | {
    rows: {
        cells: (string | null | undefined)[] | undefined;
    }[] | undefined;
} | null | undefined;
export declare function formatMessage({ payload }: any): any;
export declare function getStepType(step: messages.TestCase.ITestStep): "hook" | "test";
export declare function getFeatureId(uri: string, feature: messages.GherkinDocument.IFeature): string;
export declare function buildStepPayload(uri: string, feature: messages.GherkinDocument.IFeature, scenario: messages.IPickle, step: messages.Pickle.IPickleStep, params: {
    type: string;
    state?: messages.TestStepFinished.TestStepResult.Status | string | null;
    error?: Error;
    duration?: number;
    title?: string | null;
    passed?: boolean;
    file?: string;
}): {
    type: string;
    state?: string | messages.TestStepFinished.TestStepResult.Status | null | undefined;
    error?: Error | undefined;
    duration?: number | undefined;
    title: string | null | undefined;
    passed?: boolean | undefined;
    file: string;
    uid: string | null | undefined;
    parent: string | null | undefined;
    argument: string | {
        rows: {
            cells: (string | null | undefined)[] | undefined;
        }[] | undefined;
    } | null | undefined;
    tags: messages.Pickle.IPickleTag[] | null | undefined;
    featureName: string | null | undefined;
    scenarioName: string | null | undefined;
};
export declare function setUserHookNames(options: typeof supportCodeLibraryBuilder): void;
export declare function filterPickles(capabilities: Capabilities.RemoteCapability, pickle?: messages.IPickle): boolean;
//# sourceMappingURL=utils.d.ts.map