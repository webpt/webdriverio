import type { SauceConnectOptions } from 'saucelabs';
export interface SauceServiceConfig {
    maxErrorStackLength?: number;
    tunnelIdentifier?: string;
    parentTunnel?: string;
    sauceConnect?: boolean;
    sauceConnectOpts?: SauceConnectOptions;
    scRelay?: boolean;
}
//# sourceMappingURL=types.d.ts.map