import type { Browser, MultiRemoteBrowser } from 'webdriverio';
import type { Capabilities } from '@wdio/types';
import { RequestPayload } from './handler/network';
export declare function setUnsupportedCommand(browser: Browser<'async'> | MultiRemoteBrowser<'async'>): void;
export declare function sumByKey(list: RequestPayload[], key: keyof RequestPayload): number;
export declare function isSupportedUrl(url: string): boolean;
export declare function isBrowserVersionLower(caps: Capabilities.Capabilities, minVersion: number): boolean;
export declare function getBrowserMajorVersion(version?: string | number): number | undefined;
export declare function isBrowserSupported(caps: Capabilities.Capabilities): boolean;
//# sourceMappingURL=utils.d.ts.map