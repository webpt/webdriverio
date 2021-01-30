/// <reference types="node" />
import type { Options } from '@wdio/types';
import { RunCommandArguments } from './types.js';
import { EventEmitter } from 'events';
export default class Watcher {
    private _configFile;
    private _args;
    private _launcher;
    private _specs;
    constructor(_configFile: string, _args: Omit<Options.Testrunner, 'capabilities'>);
    watch(): Promise<void>;
    getFileListener(passOnFile?: boolean): (spec: string) => void;
    getWorkers(pickByFn?: (value: any, key: string) => any, includeBusyWorker?: boolean): EventEmitter;
    run(params?: Partial<RunCommandArguments>): void;
    cleanUp(): void;
}
//# sourceMappingURL=watcher.d.ts.map