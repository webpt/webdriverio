import type { Options, Capabilities, Reporters } from '@wdio/types';
export default class BaseReporter {
    private _config;
    private _cid;
    caps: Capabilities.RemoteCapability;
    private _reporters;
    constructor(_config: Options.Testrunner, _cid: string, caps: Capabilities.RemoteCapability);
    emit(e: string, payload: any): void;
    getLogFile(name: string): string | undefined;
    getWriteStreamObject(reporter: string): {
        write: (content: unknown) => boolean;
    };
    waitForSync(): Promise<unknown>;
    initReporter(reporter: Reporters.ReporterEntry): Reporters.ReporterInstance;
}
//# sourceMappingURL=reporter.d.ts.map