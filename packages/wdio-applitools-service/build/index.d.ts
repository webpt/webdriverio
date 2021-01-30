import type { Services, Capabilities, FunctionProperties } from '@wdio/types';
import type { Browser } from 'webdriverio';
import { ApplitoolsConfig, Frame, Region } from './types';
export default class ApplitoolsService implements Services.ServiceInstance {
    private _options;
    private _isConfigured;
    private _viewport;
    private _eyes;
    private _browser?;
    constructor(_options: ApplitoolsConfig);
    beforeSession(): void;
    before(caps: Capabilities.RemoteCapability, specs: string[], browser: Browser<'async'>): void;
    _takeSnapshot(title: string): void;
    _takeRegionSnapshot(title: string, region: Region, frame: Frame): void;
    beforeTest(test: {
        title: string;
        parent: string;
    }): void;
    afterTest(): void;
    after(): void;
}
export * from './types';
declare type ServiceCommands = FunctionProperties<ApplitoolsService>;
interface BrowserExtension {
    takeSnapshot: ServiceCommands['_takeSnapshot'];
    takeRegionSnapshot: ServiceCommands['_takeRegionSnapshot'];
}
declare global {
    namespace WebdriverIO {
        interface ServiceOption extends ApplitoolsConfig {
        }
    }
    namespace WebdriverIOAsync {
        interface Browser extends BrowserExtension {
        }
        interface MultiRemoteBrowser extends BrowserExtension {
        }
    }
    namespace WebdriverIOSync {
        interface Browser extends BrowserExtension {
        }
        interface MultiRemoteBrowser extends BrowserExtension {
        }
    }
}
//# sourceMappingURL=index.d.ts.map