import type { Services, Capabilities, Options, Frameworks } from '@wdio/types';
import type { Browser, MultiRemoteBrowser } from 'webdriverio';
import { BrowserstackConfig, MultiRemoteAction } from './types';
export default class BrowserstackService implements Services.ServiceInstance {
    private _options;
    private _caps;
    private _config;
    private _sessionBaseUrl;
    private _failReasons;
    private _scenariosThatRan;
    private _failureStatuses;
    private _browser?;
    private _fullTitle?;
    constructor(_options: BrowserstackConfig, _caps: Capabilities.RemoteCapability, _config: Options.Testrunner);
    _updateCaps(fn: (caps: Capabilities.Capabilities | Capabilities.DesiredCapabilities) => void): void;
    beforeSession(config: Options.Testrunner): void;
    before(caps: Capabilities.RemoteCapability, specs: string[], browser: Browser<'async'> | MultiRemoteBrowser<'async'>): Promise<void>;
    beforeSuite(suite: Frameworks.Suite): Promise<any>;
    beforeFeature(uri: unknown, feature: {
        name: string;
    }): Promise<any>;
    afterTest(test: Frameworks.Test, context: never, results: Frameworks.TestResult): void;
    after(result: number): Promise<any>;
    afterScenario(world: Frameworks.World): void;
    onReload(oldSessionId: string, newSessionId: string): Promise<void>;
    _updateJob(requestBody: any): Promise<any>;
    _multiRemoteAction(action: MultiRemoteAction): Promise<any>;
    _update(sessionId: string, requestBody: any): import("got/dist/source").CancelableRequest<import("got/dist/source").Response<string>>;
    _printSessionURL(): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map