import type { Options } from '@wdio/types';
import type { ProtocolCommands } from '@wdio/protocols';
import type { BrowserCommandsType } from './types';
declare type EventEmitter = (args: any) => void;
export default class MultiRemote {
    instances: Record<string, WebdriverIO.Browser>;
    baseInstance?: MultiRemoteDriver;
    sessionId?: string;
    addInstance(browserName: string, client: any): Promise<WebdriverIO.Browser>;
    modifier(wrapperClient: {
        options: Options.WebdriverIO;
        commandList: (keyof (ProtocolCommands & BrowserCommandsType))[];
    }): any;
    static elementWrapper(instances: Record<string, WebdriverIO.Browser>, result: any, propertiesObject: Record<string, PropertyDescriptor>): any;
    commandWrapper(commandName: keyof (ProtocolCommands & BrowserCommandsType)): (...args: any) => Promise<unknown>;
}
export declare class MultiRemoteDriver {
    instances: string[];
    isMultiremote: true;
    __propertiesObject__: Record<string, PropertyDescriptor>;
    constructor(instances: Record<string, WebdriverIO.Browser>, propertiesObject: Record<string, PropertyDescriptor>);
    on(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): any;
    once(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): any;
    emit(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): boolean;
    eventNames(this: WebdriverIO.MultiRemoteBrowser): any;
    getMaxListeners(this: WebdriverIO.MultiRemoteBrowser): number;
    listenerCount(this: WebdriverIO.MultiRemoteBrowser, eventName: string): number;
    listeners(this: WebdriverIO.MultiRemoteBrowser, eventName: string): Function[];
    removeListener(this: WebdriverIO.MultiRemoteBrowser, eventName: string, emitter: EventEmitter): any;
    removeAllListeners(this: WebdriverIO.MultiRemoteBrowser, eventName: string): any;
}
export {};
//# sourceMappingURL=multiremote.d.ts.map