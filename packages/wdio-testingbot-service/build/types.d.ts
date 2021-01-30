export interface TunnelLauncherOptions {
    apiKey: string;
    apiSecret: string;
    verbose?: boolean;
    'se-port'?: number;
    proxy?: string;
    'fast-fail-regexps'?: string;
    logfile?: string;
    tunnelVersion?: string;
    tunnelIdentifier?: string;
    readyFile?: string;
    dns?: string;
    noproxy?: string;
}
export interface TestingbotOptions {
    tbTunnel?: boolean;
    tbTunnelOpts?: TunnelLauncherOptions;
}
export interface TestingbotTunnel {
    close: (cb: unknown) => void;
}
//# sourceMappingURL=types.d.ts.map