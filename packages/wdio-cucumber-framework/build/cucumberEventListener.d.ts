/// <reference types="node" />
import { EventEmitter } from 'events';
import { PickleFilter } from '@cucumber/cucumber';
import { messages } from '@cucumber/messages';
import type { Capabilities } from '@wdio/types';
import { HookParams } from './types';
export default class CucumberEventListener extends EventEmitter {
    private _pickleFilter;
    private _gherkinDocEvents;
    private _scenarios;
    private _testCases;
    private _currentTestCase?;
    private _currentPickle?;
    private _suiteMap;
    constructor(eventBroadcaster: EventEmitter, _pickleFilter: PickleFilter);
    onGherkinDocument(gherkinDocEvent: messages.IGherkinDocument): void;
    onPickleAccepted(pickleEvent: messages.IPickle): void;
    onTestRunStarted(): void;
    onTestCasePrepared(testCase: messages.ITestCase): void;
    onTestCaseStarted(testcase: messages.ITestCaseStarted): void;
    onTestStepStarted(testStepStartedEvent: messages.ITestStepStarted): void;
    onTestStepFinished(testStepFinishedEvent: messages.ITestStepFinished): void;
    onTestCaseFinished(results: messages.TestStepFinished.ITestStepResult[]): void;
    onTestRunFinished(): void;
    getHookParams(): HookParams | undefined;
    getPickleIds(caps: Capabilities.RemoteCapability): string[];
}
//# sourceMappingURL=cucumberEventListener.d.ts.map