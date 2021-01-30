import { ConfigParser } from '@wdio/config';
import type { Options, Capabilities, Services } from '@wdio/types';
import CLInterface from './interface';
import { RunCommandArguments } from './types';
interface EndMessage {
    cid: string;
    exitCode: number;
    specs: string[];
    retries: number;
}
declare class Launcher {
    private _configFilePath;
    private _args;
    private _isWatchMode;
    configParser: ConfigParser;
    isMultiremote: boolean;
    runner: Services.RunnerInstance;
    interface: CLInterface;
    private _exitCode;
    private _hasTriggeredExitRoutine;
    private _schedule;
    private _rid;
    private _runnerStarted;
    private _runnerFailed;
    private _launcher?;
    private _resolve?;
    constructor(_configFilePath: string, _args?: Partial<RunCommandArguments>, _isWatchMode?: boolean);
    run(): Promise<number>;
    runMode(config: Required<Options.Testrunner>, caps: Capabilities.Capabilities): Promise<number>;
    runSpecs(): boolean;
    getNumberOfRunningInstances(): number;
    getNumberOfSpecsLeft(): number;
    startInstance(specs: string[], caps: Capabilities.DesiredCapabilities | Capabilities.W3CCapabilities | Capabilities.MultiRemoteCapabilities, cid: number, rid: string | undefined, retries: number): Promise<void>;
    getRunnerId(cid: number): string;
    endHandler({ cid: rid, exitCode, specs, retries }: EndMessage): void;
    exitHandler(callback?: (value: void) => void): void | Promise<void>;
    private _isWatchModeHalted;
}
export default Launcher;
//# sourceMappingURL=launcher.d.ts.map