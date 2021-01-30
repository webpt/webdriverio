/// <reference types="node" />
import type { Capabilities, Options } from '@wdio/types';
import * as SeleniumStandalone from 'selenium-standalone';
import type { SeleniumStandaloneOptions } from './types';
declare type SeleniumStartArgs = Partial<import('selenium-standalone').StartOpts>;
declare type SeleniumInstallArgs = Partial<import('selenium-standalone').InstallOpts>;
export default class SeleniumStandaloneLauncher {
    private _options;
    private _capabilities;
    private _config;
    args: SeleniumStartArgs;
    installArgs: SeleniumInstallArgs;
    skipSeleniumInstall: boolean;
    watchMode: boolean;
    process: SeleniumStandalone.ChildProcess;
    drivers?: {
        chrome?: string;
        firefox?: string;
        chromiumedge?: string;
        ie?: string;
        edge?: string;
    };
    constructor(_options: SeleniumStandaloneOptions, _capabilities: Capabilities.RemoteCapabilities, _config: Omit<Options.Testrunner, 'capabilities'>);
    onPrepare(config: Options.Testrunner): Promise<void>;
    onComplete(): void;
    _redirectLogStream(): void;
    _stopProcess: () => void;
    private isSimplifiedMode;
}
export {};
//# sourceMappingURL=launcher.d.ts.map