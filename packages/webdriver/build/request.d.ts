/// <reference types="node" />
import { EventEmitter } from 'events';
import * as got from 'got';
import type { Options } from '@wdio/types';
declare type RequestOptions = Omit<Options.WebDriver, 'capabilities'>;
export interface WebDriverResponse {
    value: any;
    status?: number;
    sessionId?: string;
}
export default class WebDriverRequest extends EventEmitter {
    body?: Record<string, unknown>;
    method: string;
    endpoint: string;
    isHubCommand: boolean;
    requiresSessionId: boolean;
    defaultOptions: got.Options;
    constructor(method: string, endpoint: string, body?: Record<string, unknown>, isHubCommand?: boolean);
    makeRequest(options: RequestOptions, sessionId?: string): Promise<WebDriverResponse>;
    private _createOptions;
    private _request;
}
export {};
//# sourceMappingURL=request.d.ts.map