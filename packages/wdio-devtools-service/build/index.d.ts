import type { Browser, MultiRemoteBrowser } from 'webdriverio';
import type { Capabilities, Services, FunctionProperties, ThenArg } from '@wdio/types';
import CommandHandler from './commands';
import Auditor from './auditor';
import { DevtoolsConfig, EnablePerformanceAuditsOptions, DeviceDescription, PWAAudits } from './types';
export default class DevToolsService implements Services.ServiceInstance {
    private _options;
    private _isSupported;
    private _shouldRunPerformanceAudits;
    private _puppeteer?;
    private _target?;
    private _page;
    private _session?;
    private _cacheEnabled?;
    private _cpuThrottling?;
    private _networkThrottling?;
    private _formFactor?;
    private _traceGatherer?;
    private _devtoolsGatherer?;
    private _coverageGatherer?;
    private _pwaGatherer?;
    private _browser?;
    constructor(_options: DevtoolsConfig);
    beforeSession(_: unknown, caps: Capabilities.Capabilities): void;
    before(caps: Capabilities.RemoteCapability, specs: string[], browser: Browser<'async'> | MultiRemoteBrowser<'async'>): Promise<void>;
    onReload(): Promise<void>;
    beforeCommand(commandName: string, params: any[]): Promise<void>;
    afterCommand(commandName: string): Promise<void>;
    after(): Promise<void>;
    _enablePerformanceAudits({ networkThrottling, cpuThrottling, cacheEnabled, formFactor }?: EnablePerformanceAuditsOptions): void;
    _disablePerformanceAudits(): void;
    _emulateDevice(device: string | DeviceDescription, inLandscape?: boolean): Promise<void>;
    _setThrottlingProfile(networkThrottling?: "online" | "offline" | "GPRS" | "Regular 2G" | "Good 2G" | "Regular 3G" | "Good 3G" | "Regular 4G" | "DSL" | "Wifi", cpuThrottling?: number, cacheEnabled?: boolean): Promise<void>;
    _checkPWA(auditsToBeRun?: PWAAudits[]): Promise<import("./types").AuditResult>;
    _getCoverageReport(): Promise<import("./types").Coverage | null>;
    _setupHandler(): Promise<void>;
}
export * from './types';
declare type ServiceCommands = Omit<FunctionProperties<DevToolsService>, keyof Services.HookFunctions | '_setupHandler'>;
declare type CommandHandlerCommands = FunctionProperties<CommandHandler>;
declare type AuditorCommands = Omit<FunctionProperties<Auditor>, '_audit' | '_auditPWA' | 'updateCommands'>;
interface BrowserExtension extends CommandHandlerCommands, AuditorCommands {
    enablePerformanceAudits: ServiceCommands['_enablePerformanceAudits'];
    disablePerformanceAudits: ServiceCommands['_disablePerformanceAudits'];
    emulateDevice: ServiceCommands['_emulateDevice'];
    setThrottlingProfile: ServiceCommands['_setThrottlingProfile'];
    checkPWA: ServiceCommands['_checkPWA'];
    getCoverageReport: ServiceCommands['_getCoverageReport'];
}
export declare type BrowserExtensionSync = {
    [K in keyof BrowserExtension]: (...args: Parameters<BrowserExtension[K]>) => ThenArg<ReturnType<BrowserExtension[K]>>;
};
declare global {
    namespace WebdriverIO {
        interface ServiceOption extends DevtoolsConfig {
        }
    }
    namespace WebdriverIOAsync {
        interface Browser extends BrowserExtension {
        }
        interface MultiRemoteBrowser extends BrowserExtension {
        }
    }
    namespace WebdriverIOSync {
        interface Browser extends BrowserExtensionSync {
        }
        interface MultiRemoteBrowser extends BrowserExtensionSync {
        }
    }
}
//# sourceMappingURL=index.d.ts.map