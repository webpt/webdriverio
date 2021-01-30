import type { Browser, MultiRemoteBrowser } from 'webdriverio';
import type { Capabilities } from '@wdio/types';
export declare function getBrowserDescription(cap: Capabilities.DesiredCapabilities): string;
export declare function getBrowserCapabilities(browser: Browser<'async'> | MultiRemoteBrowser<'async'>, caps?: Capabilities.RemoteCapability, browserName?: string): Capabilities.Capabilities;
export declare function isBrowserstackCapability(cap?: Capabilities.Capabilities): boolean;
//# sourceMappingURL=util.d.ts.map