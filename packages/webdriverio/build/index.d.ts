import type * as WebDriverTypes from 'webdriver';
import { Options, Capabilities } from '@wdio/types';
import SevereServiceErrorImport from './utils/SevereServiceError';
import type { Browser, MultiRemoteBrowser } from './types';
declare type RemoteOptions = Options.WebdriverIO & Omit<Options.Testrunner, 'capabilities'>;
export declare const remote: (params: RemoteOptions, remoteModifier?: Function | undefined) => Promise<Browser<'async'>>;
export declare const attach: (params: WebDriverTypes.AttachOptions) => Browser<'async'>;
export declare const multiremote: (params: Capabilities.MultiRemoteCapabilities, { automationProtocol }?: {
    automationProtocol?: string | undefined;
}) => Promise<MultiRemoteBrowser<'async'>>;
export declare const SevereServiceError: typeof SevereServiceErrorImport;
export * from './types';
export * from './utils/interception/types';
//# sourceMappingURL=index.d.ts.map