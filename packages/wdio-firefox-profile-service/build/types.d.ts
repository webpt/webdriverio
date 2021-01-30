declare type FirefoxSettings = Record<string, any>;
interface NoProxySettings {
    proxyType: 'direct';
}
interface SystemProxySettings {
    proxyType: 'system';
}
interface AutomaticProxySettings {
    proxyType: 'pac';
    autoConfigUrl: string;
}
interface ManualProxySettings {
    proxyType: 'manual';
    ftpProxy?: string;
    httpProxy?: string;
    sslProxy?: string;
    socksProxy?: string;
}
declare type ProxySettings = NoProxySettings | SystemProxySettings | AutomaticProxySettings | ManualProxySettings;
export interface FirefoxProfileOptions extends FirefoxSettings {
    extensions?: string[];
    profileDirectory?: string;
    proxy?: ProxySettings;
    legacy?: boolean;
}
export {};
//# sourceMappingURL=types.d.ts.map