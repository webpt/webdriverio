import { Browser } from 'webdriverio';
import { BrowserExtension } from './index';
import type { Services } from '@wdio/types';
interface ServiceBrowser extends Browser<'async'>, BrowserExtension {
}
export default class SharedStoreService implements Services.ServiceInstance {
    private _browser?;
    beforeSession(): Promise<void>;
    before(caps: unknown, specs: unknown, browser: ServiceBrowser): void;
}
export {};
//# sourceMappingURL=service.d.ts.map