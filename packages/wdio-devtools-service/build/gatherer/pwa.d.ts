import type { CDPSession } from 'puppeteer-core/lib/cjs/puppeteer/common/Connection';
import type { Page } from 'puppeteer-core/lib/cjs/puppeteer/common/Page';
export default class PWAGatherer {
    private _session;
    private _page;
    private _driver;
    private _networkRecorder;
    private _networkRecords;
    constructor(_session: CDPSession, _page: Page);
    gatherData(): Promise<{
        URL: {
            requestedUrl: string;
            finalUrl: string;
        };
        WebAppManifest: any;
        InstallabilityErrors: any;
        MetaElements: any;
        ViewportDimensions: any;
        ServiceWorker: {
            versions: any;
            registrations: any;
        };
        LinkElements: any;
    }>;
}
//# sourceMappingURL=pwa.d.ts.map