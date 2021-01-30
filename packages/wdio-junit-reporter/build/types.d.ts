import { Reporters } from '@wdio/types';
export interface JUnitReporterOptions extends Reporters.Options {
    outputFileFormat?: (opts: any) => string;
    suiteNameFormat?: RegExp;
    addFileAttribute?: boolean;
    packageName?: string;
    errorOptions?: Record<string, string>;
}
//# sourceMappingURL=types.d.ts.map