/// <reference types="node" />
import fs from 'fs';
export default class SmokeService {
    logFile: fs.WriteStream;
    constructor();
    beforeSession(): void;
    before(): void;
    beforeSuite(): void;
    beforeHook(): void;
    afterHook(): void;
    beforeTest(): void;
    beforeCommand(): void;
    afterCommand(): void;
    afterTest(): void;
    afterSuite(): void;
    after(): void;
    afterSession(): void;
}
declare class SmokeServiceLauncher {
    logFile: fs.WriteStream;
    constructor();
    onPrepare(): void;
    onWorkerStart(): void;
    onComplete(): void;
}
export declare const launcher: typeof SmokeServiceLauncher;
export {};
//# sourceMappingURL=index.d.ts.map