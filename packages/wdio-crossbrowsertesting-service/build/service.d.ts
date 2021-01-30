import type { Capabilities, Services, Options, Frameworks } from '@wdio/types';
import type { Browser, MultiRemoteBrowser } from 'webdriverio';
export default class CrossBrowserTestingService implements Services.ServiceInstance {
    private _config;
    private _capabilities;
    private _browser?;
    private _testCnt;
    private _failures;
    private _isServiceEnabled;
    private _suiteTitle?;
    private _cbtUsername;
    private _cbtAuthkey;
    constructor(_config: Options.Testrunner, _capabilities: Capabilities.Capabilities);
    before(caps: Capabilities.Capabilities, specs: string[], browser: Browser<'async'> | MultiRemoteBrowser<'async'>): void;
    beforeSuite(suite: Frameworks.Suite): void;
    beforeTest(test: Frameworks.Test): void;
    afterSuite(suite: Frameworks.Suite): void;
    afterTest(test: Frameworks.Test, context: any, results: Frameworks.TestResult): void;
    beforeFeature(uri: unknown, feature: {
        name: string;
    }): void;
    afterScenario(world: Frameworks.World): void;
    after(result?: number): Promise<unknown> | undefined;
    onReload(oldSessionId: string, newSessionId: string): Promise<unknown> | undefined;
    updateJob(sessionId: string, failures: number, calledOnReload?: boolean, browserName?: string): Promise<unknown>;
    getRestUrl(sessionId: string): string;
    getBody(failures: number, calledOnReload?: boolean, browserName?: string): {
        test: any;
    };
}
//# sourceMappingURL=service.d.ts.map