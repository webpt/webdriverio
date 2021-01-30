/// <reference types="node" />
/// <reference types="jasmine" />
/// <reference types="jest" />
import { EventEmitter } from 'events';
import type { Options, Services, Capabilities } from '@wdio/types';
import type { JasmineNodeOpts, ResultHandlerPayload, FrameworkMessage, FormattedMessage } from './types';
declare type HooksArray = {
    [K in keyof Required<Services.HookFunctions>]: Required<Services.HookFunctions>[K][];
};
interface WebdriverIOJasmineConfig extends Omit<Options.Testrunner, keyof HooksArray>, HooksArray {
    jasmineNodeOpts: Omit<JasmineNodeOpts, 'cleanStack'>;
}
declare class JasmineAdapter {
    private _cid;
    private _config;
    private _specs;
    private _capabilities;
    private _jasmineNodeOpts;
    private _reporter;
    private _totalTests;
    private _hookIds;
    private _hasTests;
    private _lastTest?;
    private _lastSpec?;
    private _jrunner?;
    constructor(_cid: string, _config: WebdriverIOJasmineConfig, _specs: string[], _capabilities: Capabilities.RemoteCapabilities, reporter: EventEmitter);
    init(): Promise<this>;
    _loadFiles(): void;
    _grep(suite: jasmine.Suite): void;
    hasTests(): boolean;
    run(): Promise<unknown>;
    customSpecFilter(spec: jasmine.Spec): boolean;
    wrapHook(hookName: keyof Services.HookFunctions): (done: Function) => Promise<any>;
    prepareMessage(hookName: keyof Services.HookFunctions): FormattedMessage;
    formatMessage(params: FrameworkMessage): FormattedMessage;
    getExpectationResultHandler(jasmine: jasmine.Jasmine): any;
    expectationResultHandler(origHandler: Function): (this: jasmine.Spec, passed: boolean, data: ResultHandlerPayload) => any;
}
declare const adapterFactory: {
    init?: Function;
};
export default adapterFactory;
export { JasmineAdapter, adapterFactory };
export * from './types';
declare global {
    namespace WebdriverIO {
        interface JasmineOpts extends JasmineNodeOpts {
        }
    }
}
//# sourceMappingURL=index.d.ts.map