import type { ElementReference } from '@wdio/protocols';
import type { Selector, ElementArray } from '../types';
export declare const getElement: (this: WebdriverIO.Browser | WebdriverIO.Element | WebdriverIO.MultiRemoteBrowser, selector?: string | Record<"element-6066-11e4-a52e-4f735466cecf", string> | ((elem: HTMLElement) => HTMLElement) | ((elem: HTMLElement) => HTMLElement[]) | undefined, res?: Error | Record<"element-6066-11e4-a52e-4f735466cecf", string> | undefined, isReactElement?: boolean) => WebdriverIO.Element;
export declare const getElements: (this: WebdriverIO.Browser | WebdriverIO.Element | WebdriverIO.MultiRemoteBrowser, selector: Selector, elemResponse: ElementReference[], isReactElement?: boolean) => ElementArray;
//# sourceMappingURL=getElementObject.d.ts.map