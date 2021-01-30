import type { Services, Capabilities, Options } from '@wdio/types';
import type { AppiumServiceConfig } from './types';
export default class AppiumLauncher implements Services.ServiceInstance {
    private _options;
    private _capabilities;
    private _config?;
    private readonly _logPath?;
    private readonly _appiumCliArgs;
    private readonly _args;
    private _command;
    private _process?;
    constructor(_options: AppiumServiceConfig, _capabilities: Capabilities.RemoteCapabilities, _config?: Options.Testrunner | undefined);
    private _getCommand;
    private _setCapabilities;
    onPrepare(): Promise<void>;
    onComplete(): void;
    private _startAppium;
    private _redirectLogStream;
    private static _getAppiumCommand;
}
//# sourceMappingURL=launcher.d.ts.map