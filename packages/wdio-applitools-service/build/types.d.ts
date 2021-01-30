interface ProxySettings {
    url: string | boolean;
    username: string;
    password: string;
    isHttpOnly: boolean;
}
export interface ApplitoolsConfig {
    key?: string;
    serverUrl?: string;
    viewport?: {
        width?: number;
        height?: number;
    };
    eyesProxy?: ProxySettings;
}
export declare type Region = {
    top: number;
    left: number;
    width: number;
    height: number;
} | Element | string;
export declare type Frame = Element | string;
export {};
//# sourceMappingURL=types.d.ts.map