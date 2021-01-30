import type { Options } from '@wdio/types';
import type { AttachOptions } from 'webdriver';
export default class ProtocolStub {
    static newSession(options: Options.WebDriver): Promise<Record<string, any>>;
    static reloadSession(): void;
    static attachToSession(options: AttachOptions, modifier?: (...args: any[]) => any): Record<string, any>;
}
//# sourceMappingURL=protocol-stub.d.ts.map