import { HookStats, TestStats } from '@wdio/reporter';
import type { Options } from '@wdio/types';
import CompoundError from './compoundError';
import type { Status } from './types';
export declare const getTestStatus: (test: TestStats | HookStats, config?: Options.Testrunner | undefined) => Status;
export declare const isEmpty: (object: any) => boolean;
export declare const isMochaEachHooks: (title: string) => boolean;
export declare const isMochaAllHooks: (title: string) => boolean;
export declare const tellReporter: (event: string, msg?: any) => void;
export declare const getErrorFromFailedTest: (test: TestStats | HookStats) => Error | CompoundError | undefined;
export declare const getLinkByTemplate: (template: string | undefined, id: string) => string;
//# sourceMappingURL=utils.d.ts.map