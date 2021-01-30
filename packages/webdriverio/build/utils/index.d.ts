import type { ElementReference } from '@wdio/protocols';
import type { Options } from '@wdio/types';
import type { ElementArray, Selector, ParsedCSSValue } from '../types';
export declare const getPrototype: (scope: 'browser' | 'element') => Record<string, PropertyDescriptor>;
export declare const getElementFromResponse: (res: ElementReference) => any;
export declare function getBrowserObject(elem: WebdriverIO.Element | WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser): WebdriverIO.Browser;
export declare function transformToCharString(value: any, translateToUnicode?: boolean): string[];
export declare function parseCSS(cssPropertyValue: string, cssProperty?: string): ParsedCSSValue;
export declare function checkUnicode(value: string, isDevTools?: boolean): string[];
export declare function findElement(this: WebdriverIO.Browser | WebdriverIO.Element | WebdriverIO.MultiRemoteBrowser, selector: Selector): Promise<Error | Record<"element-6066-11e4-a52e-4f735466cecf", string>>;
export declare function findElements(this: WebdriverIO.Browser | WebdriverIO.Element, selector: Selector): Promise<Record<"element-6066-11e4-a52e-4f735466cecf", string>[]>;
export declare function verifyArgsAndStripIfElement(args: any): any;
export declare function getElementRect(scope: WebdriverIO.Element): Promise<import("@wdio/protocols").RectReturn>;
export declare function getAbsoluteFilepath(filepath: string): string;
export declare function assertDirectoryExists(filepath: string): void;
export declare function validateUrl(url: string, origError?: Error): string;
export declare function getScrollPosition(scope: WebdriverIO.Element): Promise<{
    scrollX: number;
    scrollY: number;
}>;
export declare function hasElementId(element: WebdriverIO.Element): Promise<boolean>;
export declare function addLocatorStrategyHandler(scope: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser): (name: string, func: (selector: string) => HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>) => void;
export declare const enhanceElementsArray: (elements: ElementArray, parent: WebdriverIO.Browser | WebdriverIO.Element | WebdriverIO.MultiRemoteBrowser, selector: Selector, foundWith?: string, props?: any[]) => ElementArray;
export declare const isStub: (automationProtocol?: string | undefined) => boolean;
export declare const getAutomationProtocol: (config: Options.WebdriverIO | Options.Testrunner) => Promise<Options.SupportedProtocols>;
export declare const updateCapabilities: (params: Options.WebdriverIO | Options.Testrunner, automationProtocol?: string | undefined) => Promise<void>;
export declare const containsHeaderObject: (base: Record<string, string>, match: Record<string, string>) => boolean;
//# sourceMappingURL=index.d.ts.map