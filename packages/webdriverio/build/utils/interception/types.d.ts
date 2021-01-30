/// <reference types="node" />
import type { CDPSession } from 'puppeteer-core/lib/cjs/puppeteer/common/Connection';
import { JsonCompatible } from '@wdio/types';
export declare type ResourcePriority = 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh';
export declare type MixedContentType = 'blockable' | 'optionally-blockable' | 'none';
export declare type ReferrerPolicy = 'unsafe-url' | 'no-referrer-when-downgrade' | 'no-referrer' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin';
export interface Request {
    url: string;
    urlFragment?: string;
    method: string;
    headers: Record<string, string>;
    postData?: string;
    hasPostData?: boolean;
    mixedContentType?: MixedContentType;
    initialPriority: ResourcePriority;
    referrerPolicy: ReferrerPolicy;
    isLinkPreload?: boolean;
}
export interface Matches extends Request {
    body: string | Buffer | JsonCompatible;
    responseHeaders: Record<string, string>;
    statusCode: number;
}
export declare type MockOverwriteFunction = (request: Matches, client: CDPSession) => Promise<string | Record<string, any>>;
export declare type MockOverwrite = string | Record<string, any> | MockOverwriteFunction;
export declare type MockResponseParams = {
    statusCode?: number | ((request: Matches) => number);
    headers?: Record<string, string> | ((request: Matches) => Record<string, string>);
    fetchResponse?: boolean;
};
export declare type MockFilterOptions = {
    method?: string | ((method: string) => boolean);
    headers?: Record<string, string> | ((headers: Record<string, string>) => boolean);
    requestHeaders?: Record<string, string> | ((headers: Record<string, string>) => boolean);
    responseHeaders?: Record<string, string> | ((headers: Record<string, string>) => boolean);
    statusCode?: number | ((statusCode: number) => boolean);
    postData?: string | ((payload: string | undefined) => boolean);
};
export declare type ErrorCode = 'Failed' | 'Aborted' | 'TimedOut' | 'AccessDenied' | 'ConnectionClosed' | 'ConnectionReset' | 'ConnectionRefused' | 'ConnectionAborted' | 'ConnectionFailed' | 'NameNotResolved' | 'InternetDisconnected' | 'AddressUnreachable' | 'BlockedByClient' | 'BlockedByResponse';
export declare type ThrottlePreset = 'offline' | 'GPRS' | 'Regular2G' | 'Good2G' | 'Regular3G' | 'Good3G' | 'Regular4G' | 'DSL' | 'WiFi' | 'online';
export interface CustomThrottle {
    offline: boolean;
    downloadThroughput: number;
    uploadThroughput: number;
    latency: number;
}
export declare type ThrottleOptions = ThrottlePreset | CustomThrottle;
//# sourceMappingURL=types.d.ts.map