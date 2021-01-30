import type { Capabilities, Services, Options } from '@wdio/types';
export declare function initialiseLauncherService(config: Omit<Options.Testrunner, 'capabilities' | keyof Services.HookFunctions>, caps: Capabilities.DesiredCapabilities): {
    ignoredWorkerServices: string[];
    launcherServices: Services.ServiceInstance[];
};
export declare function initialiseWorkerService(config: Options.Testrunner, caps: Capabilities.DesiredCapabilities, ignoredWorkerServices?: string[]): Services.ServiceInstance[];
//# sourceMappingURL=initialiseServices.d.ts.map