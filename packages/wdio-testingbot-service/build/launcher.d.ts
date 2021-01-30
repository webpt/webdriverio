import { Capabilities, Options, Services } from '@wdio/types';
import { TestingbotOptions, TestingbotTunnel, TunnelLauncherOptions } from './types';
export default class TestingBotLauncher implements Services.ServiceInstance {
    options: TestingbotOptions;
    tbTunnelOpts: TunnelLauncherOptions;
    tunnel?: TestingbotTunnel;
    constructor(options: TestingbotOptions);
    onPrepare(config: Options.Testrunner, capabilities: Capabilities.RemoteCapabilities): Promise<void>;
    onComplete(): Promise<unknown> | undefined;
}
//# sourceMappingURL=launcher.d.ts.map