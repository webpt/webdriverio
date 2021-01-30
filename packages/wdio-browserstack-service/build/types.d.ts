export interface SessionResponse {
    automation_session: {
        browser_url: string;
    };
}
export declare type MultiRemoteAction = (sessionId: string, browserName?: string) => Promise<any>;
export interface BrowserstackConfig {
    browserstackLocal?: boolean;
    preferScenarioName?: boolean;
    forcedStop?: boolean;
    opts?: Partial<import('browserstack-local').Options>;
}
//# sourceMappingURL=types.d.ts.map