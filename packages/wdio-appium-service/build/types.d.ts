export declare type AppiumServerArguments = {
    [capability: string]: any;
    port?: number | string;
    basePath?: string;
};
export interface AppiumSessionCapabilities {
    port?: number;
    protocol?: string;
    hostname?: string;
    path?: string;
}
export interface AppiumServiceConfig {
    logPath?: string;
    command?: string;
    args?: AppiumServerArguments | Array<string>;
}
export declare type ArgValue = string | number | boolean | null;
export declare type KeyValueArgs = {
    [key: string]: ArgValue;
};
//# sourceMappingURL=types.d.ts.map