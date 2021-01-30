import type { Browser, Element } from 'webdriverio';
declare global {
    var WDIO_WORKER: boolean;
}
export default function wrapCommand(commandName: string, fn: Function): (this: Browser<'async'> | Element<'async'>, ...args: any[]) => any;
//# sourceMappingURL=wrapCommand.d.ts.map