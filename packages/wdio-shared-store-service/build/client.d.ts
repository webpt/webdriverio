import type { JsonCompatible, JsonPrimitive, JsonObject, JsonArray } from '@wdio/types';
export declare const setPort: (port: string) => void;
export declare const getValue: (key: string) => Promise<string | number | boolean | JsonObject | JsonArray | null | undefined>;
export declare const setValue: (key: string, value: JsonCompatible | JsonPrimitive) => Promise<void>;
//# sourceMappingURL=client.d.ts.map