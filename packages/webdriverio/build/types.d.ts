/// <reference types="node" />
import type { EventEmitter } from 'events';
import type { SessionFlags } from 'webdriver';
import type { Options, Capabilities, FunctionProperties, ThenArg } from '@wdio/types';
import type { ElementReference, ProtocolCommandsAsync, ProtocolCommands } from '@wdio/protocols';
import type { Browser as PuppeteerBrowser } from 'puppeteer-core/lib/cjs/puppeteer/common/Browser';
import type BrowserCommands from './commands/browser';
import type ElementCommands from './commands/element';
import type DevtoolsInterception from './utils/interception/devtools';
export declare type BrowserCommandsType = typeof BrowserCommands;
export declare type BrowserCommandsTypeSync = {
    [K in keyof Omit<BrowserCommandsType, 'execute'>]: (...args: Parameters<BrowserCommandsType[K]>) => ThenArg<ReturnType<BrowserCommandsType[K]>>;
} & {
    execute: <T, U extends any[] = any[], V extends U = any>(script: string | ((...innerArgs: V) => T), ...args: U) => T;
};
export declare type ElementCommandsType = typeof ElementCommands;
export declare type ElementCommandsTypeSync = {
    [K in keyof ElementCommandsType]: (...args: Parameters<ElementCommandsType[K]>) => ThenArg<ReturnType<ElementCommandsType[K]>>;
};
export interface ElementArray extends Array<WebdriverIO.Element> {
    selector: Selector;
    parent: WebdriverIO.Element | WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser;
    foundWith: string;
    props: any[];
}
declare type AddCommandFnScoped<InstanceType = WebdriverIO.Browser, IsElement extends boolean = false> = (this: IsElement extends true ? WebdriverIO.Element : InstanceType, ...args: any[]) => any;
declare type AddCommandFn = (...args: any[]) => any;
declare type OverwriteCommandFnScoped<ElementKey extends keyof ElementCommandsType, BrowserKey extends keyof BrowserCommandsType, IsElement extends boolean = false> = (this: IsElement extends true ? WebdriverIO.Element : WebdriverIO.Browser, origCommand: (...args: any[]) => IsElement extends true ? WebdriverIO.Element[ElementKey] : WebdriverIO.Browser[BrowserKey], ...args: any[]) => Promise<any>;
declare type OverwriteCommandFn<ElementKey extends keyof ElementCommandsType, BrowserKey extends keyof BrowserCommandsType, IsElement extends boolean = false> = (origCommand: (...args: any[]) => IsElement extends true ? WebdriverIO.Element[ElementKey] : WebdriverIO.Browser[BrowserKey], ...args: any[]) => Promise<any>;
export interface CustomInstanceCommands<T> {
    addCommand<IsElement extends boolean = false>(name: string, func: AddCommandFn | AddCommandFnScoped<T, IsElement>, attachToElement?: IsElement, proto?: Record<string, any>, instances?: Record<string, WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser>): void;
    overwriteCommand<ElementKey extends keyof ElementCommandsType, BrowserKey extends keyof BrowserCommandsType, IsElement extends boolean = false>(name: IsElement extends true ? ElementKey : BrowserKey, func: OverwriteCommandFn<ElementKey, BrowserKey, IsElement> | OverwriteCommandFnScoped<ElementKey, BrowserKey, IsElement>, attachToElement?: IsElement, proto?: Record<string, any>, instances?: Record<string, WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser>): void;
    addLocatorStrategy(name: string, func: (selector: string) => HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>): void;
}
interface InstanceBase extends EventEmitter, SessionFlags {
    sessionId: string;
    capabilities: Capabilities.RemoteCapability;
    requestedCapabilities: Capabilities.RemoteCapability;
    options: Options.WebdriverIO | Options.Testrunner;
    puppeteer?: PuppeteerBrowser;
    strategies: Map<any, any>;
    __propertiesObject__: Record<string, PropertyDescriptor>;
    _NOT_FIBER?: boolean;
    wdioRetries?: number;
}
export interface BrowserBase extends InstanceBase, CustomInstanceCommands<WebdriverIO.Browser> {
    isMultiremote: false;
}
interface BrowserAsync extends BrowserBase, BrowserCommandsType, ProtocolCommandsAsync {
}
interface BrowserSync extends BrowserBase, BrowserCommandsTypeSync, ProtocolCommands {
}
export declare type Browser<T extends 'sync' | 'async'> = T extends 'sync' ? BrowserSync : BrowserAsync;
export interface ElementBase extends InstanceBase, ElementReference, CustomInstanceCommands<WebdriverIO.Element> {
    isMultiremote: false;
    elementId: string;
    ELEMENT: string;
    selector: Selector;
    index?: number;
    parent: WebdriverIO.Element | WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser;
    isReactElement?: boolean;
    error?: Error;
}
interface ElementAsync extends ElementBase, ProtocolCommandsAsync, Omit<BrowserCommandsType, keyof ElementCommandsType>, ElementCommandsType {
}
interface ElementSync extends ElementBase, ProtocolCommands, Omit<BrowserCommandsTypeSync, keyof ElementCommandsTypeSync>, ElementCommandsTypeSync {
}
export declare type Element<T extends 'sync' | 'async'> = T extends 'sync' ? ElementSync : ElementAsync;
interface MultiRemoteBase extends Omit<InstanceBase, 'sessionId'>, CustomInstanceCommands<WebdriverIO.MultiRemoteBrowser> {
    instances: string[];
    isMultiremote: true;
}
declare type MultiRemoteBrowserReferenceAsync = Record<string, Browser<'async'> | Element<'async'>>;
declare type MultiRemoteBrowserReferenceSync = Record<string, Browser<'sync'> | Element<'sync'>>;
interface MultiRemoteBrowserAsync extends MultiRemoteBase, BrowserCommandsType, ProtocolCommandsAsync {
}
interface MultiRemoteBrowserSync extends MultiRemoteBase, BrowserCommandsTypeSync, ProtocolCommands {
}
export declare type MultiRemoteBrowser<T extends 'sync' | 'async'> = T extends 'sync' ? MultiRemoteBrowserReferenceSync & MultiRemoteBrowserSync : MultiRemoteBrowserReferenceAsync & MultiRemoteBrowserAsync;
export declare type ElementFunction = ((elem: HTMLElement) => HTMLElement) | ((elem: HTMLElement) => HTMLElement[]);
export declare type Selector = string | ElementReference | ElementFunction;
interface CSSValue {
    type: string;
    string: string;
    unit: string;
    value: any;
}
interface ParsedColor extends Partial<CSSValue> {
    rgb?: string;
    rgba?: string;
}
export interface ParsedCSSValue {
    property?: string;
    value?: string;
    parsed: ParsedColor;
}
interface NoneActionEntity {
    type: 'pause';
    duration: number;
}
interface PointerActionEntity {
    type: 'pointerMove' | 'pointerDown' | 'pointerUp' | 'pointerCancel' | 'pause';
    duration?: number;
    x?: number;
    y?: number;
    button?: number;
}
interface KeyActionEntity {
    type: 'keyUp' | 'keyDown';
    duration?: number;
    value?: string;
}
export interface Action {
    id: string;
    actions: (NoneActionEntity & PointerActionEntity & KeyActionEntity)[];
    type?: 'pointer' | 'key';
    parameters?: {
        pointerType: 'mouse' | 'pen' | 'touch';
    };
}
export interface ActionParameter {
    actions: Action[];
}
export declare type ActionTypes = 'press' | 'longPress' | 'tap' | 'moveTo' | 'wait' | 'release';
export interface TouchAction {
    action: ActionTypes;
    x?: number;
    y?: number;
    element?: WebdriverIO.Element;
    ms?: number;
}
export declare type TouchActionParameter = string | string[] | TouchAction | TouchAction[];
export declare type TouchActions = TouchActionParameter | TouchActionParameter[];
export declare type Matcher = {
    name: string;
    args: Array<string | object>;
    class?: string;
};
export declare type ReactSelectorOptions = {
    props?: object;
    state?: any[] | number | string | object | boolean;
};
export declare type MoveToOptions = {
    xOffset?: number;
    yOffset?: number;
};
export declare type DragAndDropOptions = {
    duration?: number;
};
export declare type NewWindowOptions = {
    windowName?: string;
    windowFeatures?: string;
};
export declare type ClickOptions = {
    button?: number | string;
    x?: number;
    y?: number;
};
export declare type WaitForOptions = {
    timeout?: number;
    interval?: number;
    timeoutMsg?: string;
    reverse?: boolean;
};
export declare type WaitUntilOptions = {
    timeout?: number;
    timeoutMsg?: string;
    interval?: number;
};
export declare type DragAndDropCoordinate = {
    x: number;
    y: number;
};
declare type MockFunctions = FunctionProperties<DevtoolsInterception>;
declare type MockProperties = Pick<DevtoolsInterception, 'calls'>;
export interface Mock extends MockFunctions, MockProperties {
}
export {};
//# sourceMappingURL=types.d.ts.map