import type { Capabilities } from '@wdio/types';
export declare function isW3C(capabilities?: Capabilities.DesiredCapabilities): boolean;
export declare function capabilitiesEnvironmentDetector(capabilities: Capabilities.Capabilities, automationProtocol: string): {
    isChrome: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
};
export declare function sessionEnvironmentDetector({ capabilities, requestedCapabilities }: {
    capabilities?: Capabilities.DesiredCapabilities;
    requestedCapabilities?: Capabilities.DesiredCapabilities | Capabilities.W3CCapabilities;
}): {
    isW3C: boolean;
    isChrome: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
    isSeleniumStandalone: boolean;
};
export declare function devtoolsEnvironmentDetector({ browserName }: Capabilities.Capabilities): {
    isDevTools: boolean;
    isW3C: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isChrome: boolean;
    isSauce: boolean;
    isSeleniumStandalone: boolean;
};
export declare function webdriverEnvironmentDetector(capabilities: Capabilities.Capabilities): {
    isChrome: boolean;
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isSauce: boolean;
};
//# sourceMappingURL=envDetector.d.ts.map