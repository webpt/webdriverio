import type { Options } from '@wdio/types';
import { SUPPORTED_BROWSER } from './constants';
export declare const sessionMap: Map<any, any>;
export default class DevTools {
    static newSession(options: Options.WebDriver, modifier?: Function, userPrototype?: {}, customCommandWrapper?: Function): Promise<any>;
    static reloadSession(instance: any): Promise<any>;
    static attachToSession(): void;
}
export { SUPPORTED_BROWSER };
//# sourceMappingURL=index.d.ts.map