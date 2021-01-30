import { SauceConnectOptions, SauceConnectInstance } from 'saucelabs';
import type { Services, Capabilities, Options } from '@wdio/types';
import type { SauceServiceConfig } from './types';
export default class SauceLauncher implements Services.ServiceInstance {
    private _options;
    private _capabilities;
    private _config;
    private _api;
    private _sauceConnectProcess?;
    constructor(_options: SauceServiceConfig, _capabilities: unknown, _config: Options.Testrunner);
    onPrepare(config: Options.Testrunner, capabilities: Capabilities.RemoteCapabilities): Promise<void>;
    startTunnel(sauceConnectOpts: SauceConnectOptions, retryCount?: number): Promise<SauceConnectInstance>;
    onComplete(): Promise<undefined> | undefined;
}
//# sourceMappingURL=launcher.d.ts.map