import type { Capabilities, Services, Options } from '@wdio/types';
import { CrossBrowserTestingConfig } from './types';
export default class CrossBrowserTestingLauncher implements Services.ServiceInstance {
    private _options;
    private _caps;
    private _config;
    private _isUsingTunnel;
    private _cbtTunnelOpts;
    constructor(_options: CrossBrowserTestingConfig, _caps: Capabilities.Capabilities, _config: Options.Testrunner);
    onPrepare(): Promise<void>;
    onComplete(): Promise<unknown> | undefined;
}
//# sourceMappingURL=launcher.d.ts.map