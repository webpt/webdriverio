import { Capabilities, Options, Services, Frameworks } from '@wdio/types';
import type { Browser, MultiRemoteBrowser } from 'webdriverio';
import { TestingbotOptions } from './types';
export default class TestingBotService implements Services.ServiceInstance {
    private _options;
    private _capabilities;
    private _config;
    private _browser?;
    private _isServiceEnabled?;
    private _suiteTitle?;
    private _tbSecret?;
    private _tbUser?;
    private _failures;
    private _testCnt;
    constructor(_options: TestingbotOptions, _capabilities: Capabilities.RemoteCapability, _config: Omit<Options.Testrunner, 'capabilities'>);
    before(caps: unknown, specs: unknown, browser: Browser<'async'> | MultiRemoteBrowser<'async'>): void;
    beforeSuite(suite: Frameworks.Suite): void;
    beforeTest(test: Frameworks.Test): void;
    afterSuite(suite: Frameworks.Suite): void;
    afterTest(test: Frameworks.Test, context: any, results: Frameworks.TestResult): void;
    beforeFeature(uri: unknown, feature: {
        name: string;
    }): void;
    beforeScenario(world: Frameworks.World): void;
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