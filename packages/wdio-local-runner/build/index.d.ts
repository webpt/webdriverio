import { WritableStreamBuffer } from 'stream-buffers';
import type { Options } from '@wdio/types';
import WorkerInstance from './worker';
import type { WorkerRunPayload } from './types';
interface RunArgs extends WorkerRunPayload {
    command: string;
    args: any;
}
export default class LocalRunner {
    private _config;
    workerPool: Record<string, WorkerInstance>;
    stdout: WritableStreamBuffer;
    stderr: WritableStreamBuffer;
    constructor(configFile: unknown, _config: Options.Testrunner);
    initialise(): void;
    getWorkerCount(): number;
    run({ command, args, ...workerOptions }: RunArgs): WorkerInstance;
    shutdown(): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map