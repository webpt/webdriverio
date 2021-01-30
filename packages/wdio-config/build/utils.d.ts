import type { Capabilities, Options } from '@wdio/types';
declare const REGION_MAPPING: {
    us: string;
    eu: string;
    'eu-central-1': string;
    'us-east-1': string;
};
export declare const validObjectOrArray: (object: any) => object is object | any[];
export declare function getSauceEndpoint(region: keyof typeof REGION_MAPPING, { isRDC, isVisual }?: {
    isRDC?: boolean;
    isVisual?: boolean;
}): string;
export declare function removeLineNumbers(filePath: string): string;
export declare function isCucumberFeatureWithLineNumber(spec: string | string[]): boolean;
export declare function isCloudCapability(caps: Capabilities.Capabilities): boolean;
interface BackendConfigurations {
    port?: number;
    hostname?: string;
    user?: string;
    key?: string;
    protocol?: string;
    region?: string;
    headless?: boolean;
    path?: string;
    capabilities?: Capabilities.RemoteCapabilities | Capabilities.RemoteCapability;
}
export declare function detectBackend(options?: BackendConfigurations): {
    hostname: string | undefined;
    port: number | undefined;
    protocol: string | undefined;
    path: string | undefined;
};
export declare function validateConfig<T>(defaults: Options.Definition<T>, options: T, keysToKeep?: (keyof T)[]): T;
export declare function loadTypeScriptCompiler(tsNodeOpts?: WebdriverIO.TsNodeOpts): boolean;
export declare function loadBabelCompiler(): boolean;
export {};
//# sourceMappingURL=utils.d.ts.map