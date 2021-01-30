/// <reference types="node" />
import { EventEmitter } from 'events';
import * as Cucumber from '@cucumber/cucumber';
import { Long } from 'long';
import type { Capabilities, Options } from '@wdio/types';
import { CucumberOptions, StepDefinitionOptions, HookFunctionExtension as HookFunctionExtensionImport } from './types';
declare class CucumberAdapter {
    private _cid;
    private _config;
    private _specs;
    private _capabilities;
    private _reporter;
    private _cwd;
    private _newId;
    private _cucumberOpts;
    private _hasTests;
    private _cucumberFeaturesWithLineNumbers;
    private _eventBroadcaster;
    private _cucumberReporter;
    private _eventDataCollector;
    private _pickleFilter;
    getHookParams?: Function;
    never?: Long;
    constructor(_cid: string, _config: Options.Testrunner, _specs: string[], _capabilities: Capabilities.RemoteCapability, _reporter: EventEmitter);
    init(): Promise<this>;
    hasTests(): boolean;
    run(): Promise<number>;
    registerRequiredModules(): void;
    requiredFiles(): string[];
    loadSpecFiles(): void;
    addWdioHooks(config: Options.Testrunner): void;
    wrapSteps(config: Options.Testrunner): void;
    wrapStep(code: Function, isStep: boolean, config: Options.Testrunner, cid: string, options: StepDefinitionOptions, getHookParams: Function): (this: Cucumber.World, ...args: any[]) => Promise<unknown>;
}
declare const adapterFactory: {
    init?: Function;
};
export default adapterFactory;
export { CucumberAdapter, adapterFactory };
declare global {
    namespace WebdriverIO {
        interface CucumberOpts extends CucumberOptions {
        }
        interface HookFunctionExtension extends HookFunctionExtensionImport {
        }
    }
}
//# sourceMappingURL=index.d.ts.map