import type { Capabilities, Options } from '@wdio/types';
import RunnableStats from './runnable';
export interface Runner {
    cid: string;
    specs: string[];
    config: Options.Testrunner;
    isMultiremote: boolean;
    sessionId?: string;
    capabilities: Capabilities.Capabilities;
    retry?: number;
    failures?: number;
    retries?: number;
}
export default class RunnerStats extends RunnableStats {
    cid: string;
    capabilities: Capabilities.RemoteCapability;
    sanitizedCapabilities: string;
    config: Options.Testrunner;
    specs: string[];
    sessionId?: string;
    isMultiremote: boolean;
    retry?: number;
    failures?: number;
    retries?: number;
    constructor(runner: Runner);
}
//# sourceMappingURL=runner.d.ts.map