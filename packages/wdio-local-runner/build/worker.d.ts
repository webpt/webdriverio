/// <reference types="node" />
import child from 'child_process';
import { EventEmitter } from 'events';
import type { WritableStreamBuffer } from 'stream-buffers';
import type { ChildProcess } from 'child_process';
import type { Capabilities, Options } from '@wdio/types';
import type { WorkerRunPayload } from './types';
export default class WorkerInstance extends EventEmitter {
    cid: string;
    config: Options.Testrunner;
    configFile: string;
    caps: Capabilities.RemoteCapability;
    specs: string[];
    execArgv: string[];
    retries: number;
    stdout: WritableStreamBuffer;
    stderr: WritableStreamBuffer;
    childProcess?: ChildProcess;
    sessionId?: string;
    server?: Record<string, any>;
    instances?: Record<string, {
        sessionId: string;
    }>;
    isMultiremote?: boolean;
    isBusy: boolean;
    constructor(config: Options.Testrunner, { cid, configFile, caps, specs, execArgv, retries }: WorkerRunPayload, stdout: WritableStreamBuffer, stderr: WritableStreamBuffer);
    startProcess(): child.ChildProcess;
    private _handleMessage;
    private _handleError;
    private _handleExit;
    postMessage(command: string, args: any): void;
}
//# sourceMappingURL=worker.d.ts.map