import type { Browser } from 'webdriverio';
import executeHooksWithArgs from './executeHooksWithArgs';
import runFnInFiberContext from './runFnInFiberContext';
import wrapCommand from './wrapCommand';
declare const defaultRetries: {
    attempts: number;
    limit: number;
};
declare global {
    var _HAS_FIBER_CONTEXT: boolean;
    var browser: any;
}
declare function executeSync(this: Browser<'async'>, fn: Function, retries?: {
    attempts: number;
    limit: number;
}, args?: any[]): Promise<any>;
declare function runSync(this: any, fn: Function, repeatTest?: typeof defaultRetries, args?: any[]): (resolve: (value: any) => void, reject: (error: Error) => void) => any;
export { executeHooksWithArgs, wrapCommand, runFnInFiberContext, executeSync, runSync, };
export default function sync(testFn: Function): Promise<unknown>;
//# sourceMappingURL=index.d.ts.map