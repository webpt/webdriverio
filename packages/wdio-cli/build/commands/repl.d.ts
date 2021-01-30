import { ReplCommandArguments } from '../types';
import yargs from 'yargs';
export declare const command = "repl <option> [capabilities]";
export declare const desc = "Run WebDriver session in command line";
export declare const cmdArgs: {
    readonly platformVersion: {
        readonly alias: "v";
        readonly desc: "Version of OS for mobile devices";
        readonly type: "string";
    };
    readonly deviceName: {
        readonly alias: "d";
        readonly desc: "Device name for mobile devices";
        readonly type: "string";
    };
    readonly udid: {
        readonly alias: "u";
        readonly desc: "UDID of real mobile devices";
        readonly type: "string";
    };
};
export declare const builder: (yargs: yargs.Argv<{}>) => yargs.Argv<yargs.Omit<{}, string | number> & yargs.InferredOptionTypes<import("lodash").Dictionary<{
    readonly alias: "v";
    readonly desc: "Version of OS for mobile devices";
    readonly type: "string";
} | {
    readonly alias: "d";
    readonly desc: "Device name for mobile devices";
    readonly type: "string";
} | {
    readonly alias: "u";
    readonly desc: "UDID of real mobile devices";
    readonly type: "string";
}>>>;
declare global {
    namespace NodeJS {
        interface Global {
            $: any;
            $$: any;
            browser: any;
        }
    }
}
export declare const handler: (argv: ReplCommandArguments) => Promise<void>;
//# sourceMappingURL=repl.d.ts.map