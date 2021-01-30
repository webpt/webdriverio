import type { Browser } from 'webdriverio';
export default function runFnInFiberContext(fn: Function): (this: Browser<'async'>, ...args: any[]) => Promise<unknown>;
//# sourceMappingURL=runFnInFiberContext.d.ts.map