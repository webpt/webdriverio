/// <reference types="node" />
import { EventEmitter } from 'events';
import type { Options, Capabilities } from '@wdio/types';
declare global {
    namespace NodeJS {
        interface Global {
            $: any;
            $$: any;
            browser: any;
            driver: any;
        }
    }
}
interface Args extends Partial<Options.Testrunner> {
    ignoredWorkerServices?: string[];
    watch?: boolean;
}
declare type RunParams = {
    cid: string;
    args: Args;
    specs: string[];
    caps: Capabilities.RemoteCapability;
    configFile: string;
    retries: number;
};
declare global {
    var _HAS_FIBER_CONTEXT: boolean;
}
export default class Runner extends EventEmitter {
    private _configParser;
    private _sigintWasCalled;
    private _isMultiremote;
    private _specFileRetryAttempts;
    private _reporter?;
    private _framework?;
    private _config?;
    private _cid?;
    private _specs?;
    private _caps?;
    run({ cid, args, specs, caps, configFile, retries }: RunParams): Promise<number>;
    private _initSession;
    private _startSession;
    private _fetchDriverLogs;
    private _shutdown;
    endSession(): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map