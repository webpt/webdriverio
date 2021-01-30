import type { Services } from '@wdio/types';
import type { Browser, MultiRemoteBrowser } from 'webdriverio';
import WebDriverMock from './WebDriverMock';
export default class WebdriverMockService implements Services.ServiceInstance {
    private _browser?;
    private _mock;
    constructor();
    init(): void;
    before(caps: unknown, specs: unknown, browser: Browser<'async'> | MultiRemoteBrowser<'async'>): void;
    clickScenario(): void;
    isExistingScenario(): void;
    waitForElementScenario(): void;
    isNeverDisplayedScenario(): void;
    isEventuallyDisplayedScenario(): void;
    staleElementRefetchScenario(): void;
    customCommandScenario(times?: number): void;
    waitForDisplayedScenario(): void;
    cucumberScenario(): void;
    nockReset(): void;
}
export { WebDriverMock };
//# sourceMappingURL=index.d.ts.map