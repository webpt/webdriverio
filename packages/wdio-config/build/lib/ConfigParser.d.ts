import type { Capabilities, Options, Services } from '@wdio/types';
interface TestrunnerOptionsWithParameters extends Omit<Options.Testrunner, 'capabilities'> {
    watch?: boolean;
    spec?: string[];
    suite?: string[];
    capabilities?: Capabilities.RemoteCapabilities;
}
interface MergeConfig extends Omit<Partial<TestrunnerOptionsWithParameters>, 'specs' | 'exclude'> {
    specs?: string | string[];
    exclude?: string | string[];
}
export default class ConfigParser {
    private _config;
    private _capabilities;
    addConfigFile(filename: string): void;
    addConfigEntry(config: TestrunnerOptionsWithParameters): void;
    merge(object?: MergeConfig): void;
    addService(service: Services.Hooks): void;
    getSpecs(capSpecs?: string[], capExclude?: string[]): string[];
    setFilePathToFilterOptions(cliArgFileList: string[], config: string[]): string[];
    getConfig(): Required<Options.Testrunner>;
    getCapabilities(i?: number): Capabilities.DesiredCapabilities | Capabilities.W3CCapabilities | (Capabilities.DesiredCapabilities | Capabilities.W3CCapabilities)[] | Capabilities.MultiRemoteCapabilities;
    static getFilePaths(patterns: string[], omitWarnings?: boolean): string[];
}
export {};
//# sourceMappingURL=ConfigParser.d.ts.map