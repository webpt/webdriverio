import { Job } from 'saucelabs';
import type { Services, Capabilities, Options, Frameworks } from '@wdio/types';
import type { Browser, MultiRemoteBrowser } from 'webdriverio';
import { SauceServiceConfig } from './types';
export default class SauceService implements Services.ServiceInstance {
    private _options;
    private _capabilities;
    private _config;
    private _testCnt;
    private _maxErrorStackLength;
    private _failures;
    private _isServiceEnabled;
    private _isJobNameSet;
    private _api;
    private _isRDC;
    private _browser?;
    private _isUP?;
    private _suiteTitle?;
    constructor(_options: SauceServiceConfig, _capabilities: Capabilities.RemoteCapability, _config: Options.Testrunner);
    beforeSession(): void;
    before(caps: unknown, specs: string[], browser: Browser<'async'> | MultiRemoteBrowser<'async'>): void;
    beforeSuite(suite: Frameworks.Suite): void;
    beforeTest(test: Frameworks.Test): void;
    afterSuite(suite: Frameworks.Suite): void;
    afterTest(test: Frameworks.Test, context: unknown, results: Frameworks.TestResult): void;
    beforeFeature(uri: unknown, feature: {
        name: string;
    }): void;
    beforeScenario(world: Frameworks.World): void;
    afterScenario(world: Frameworks.World): void;
    after(result: any): Promise<unknown> | undefined;
    onReload(oldSessionId: string, newSessionId: string): Promise<void> | undefined;
    updateJob(sessionId: string, failures: number, calledOnReload?: boolean, browserName?: string): Promise<void>;
    getBody(failures: number, calledOnReload?: boolean, browserName?: string): Partial<Job>;
    updateUP(failures: number): Promise<unknown> | undefined;
}
//# sourceMappingURL=service.d.ts.map