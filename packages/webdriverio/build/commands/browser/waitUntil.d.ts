import type { WaitUntilOptions } from '../../types';
export default function waitUntil(this: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser | WebdriverIO.Element, condition: () => boolean | Promise<boolean>, { timeout, interval, timeoutMsg }?: Partial<WaitUntilOptions>): any;
//# sourceMappingURL=waitUntil.d.ts.map