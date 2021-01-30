import { ArgValue, KeyValueArgs } from './types';
export declare function getFilePath(filePath: string, defaultFilename: string): string;
export declare function formatCliArgs(args: KeyValueArgs | ArgValue[]): string[];
export declare function sanitizeCliOptionValue(value: ArgValue): string;
export declare function isWindows(): boolean;
//# sourceMappingURL=utils.d.ts.map