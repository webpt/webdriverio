import { TouchAction, TouchActions } from '../types';
interface FormattedTouchAction extends Omit<TouchAction, 'element'> {
    element?: string;
}
interface FormattedActions {
    action: string;
    options?: FormattedTouchAction;
}
export declare const formatArgs: (scope: WebdriverIO.Browser | WebdriverIO.Element | WebdriverIO.MultiRemoteBrowser, actions: TouchActions[]) => FormattedActions[];
export declare const validateParameters: (params: FormattedActions) => void;
export declare const touchAction: (this: WebdriverIO.Browser | WebdriverIO.Element | WebdriverIO.MultiRemoteBrowser, actions: TouchActions) => void;
export {};
//# sourceMappingURL=constant.d.ts.map