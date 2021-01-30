import type { Options, Capabilities } from '@wdio/types';
import type { Browser, MultiRemoteBrowser } from 'webdriverio';
export interface ConfigWithSessionId extends Omit<Options.Testrunner, 'capabilities'> {
    sessionId?: string;
    capabilities: Capabilities.RemoteCapability;
}
export declare function sanitizeCaps(caps: Capabilities.RemoteCapability, filterOut?: boolean): Omit<Capabilities.RemoteCapability, 'logLevel'> | Partial<Options.Testrunner>;
export declare function initialiseInstance(config: ConfigWithSessionId, capabilities: Capabilities.RemoteCapability, isMultiremote?: boolean): Promise<Browser<'async'> | MultiRemoteBrowser<'async'>>;
export declare function filterLogTypes(excludeDriverLogs: string[], driverLogTypes: string[]): string[];
export declare function sendFailureMessage(e: string, payload: any): void;
declare type BrowserData = {
    sessionId: string;
    isW3C: boolean;
    protocol: string;
    hostname: string;
    port: number;
    path: string;
    queryParams: Record<string, string>;
};
export declare function getInstancesData(browser: Browser<'async'> | MultiRemoteBrowser<'async'>, isMultiremote: boolean): Record<string, Partial<BrowserData>> | undefined;
export {};
//# sourceMappingURL=utils.d.ts.map