import type * as Capabilities from './Capabilities';
import type * as Clients from './Clients';
import type * as Options from './Options';
import type * as Services from './Services';
import type * as Reporters from './Reporters';
import type * as Frameworks from './Frameworks';
export type { Capabilities, Clients, Options, Services, Frameworks, Reporters };
export declare type JsonPrimitive = string | number | boolean | null;
export declare type JsonObject = {
    [x: string]: JsonPrimitive | JsonObject | JsonArray;
};
export declare type JsonArray = Array<JsonPrimitive | JsonObject | JsonArray>;
export declare type JsonCompatible = JsonObject | JsonArray;
export declare type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
export declare type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
export declare type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
declare global {
    namespace WebdriverIO {
        interface MochaOpts {
            [key: string]: any;
        }
        interface JasmineOpts {
            [key: string]: any;
        }
        interface CucumberOpts {
            [key: string]: any;
        }
        interface TsNodeOpts {
            [key: string]: any;
        }
        interface ServiceOption extends Services.ServiceOption {
        }
        interface ReporterOption extends Reporters.Options {
        }
        interface Config extends Options.Testrunner {
        }
        interface HookFunctionExtension {
        }
    }
    namespace WebDriver {
        type Capabilities = Capabilities.Capabilities;
        type DesiredCapabilities = Capabilities.DesiredCapabilities;
    }
}
//# sourceMappingURL=index.d.ts.map