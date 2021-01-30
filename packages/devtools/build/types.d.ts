import type { Capabilities } from '@wdio/types';
export interface ExtendedCapabilities extends Capabilities.Capabilities {
    'wdio:devtoolsOptions'?: DevToolsOptions;
}
export interface DevToolsOptions {
    ignoreDefaultArgs?: string[] | boolean;
    headless?: boolean;
    defaultViewport?: {
        width: number;
        height: number;
    };
}
//# sourceMappingURL=types.d.ts.map