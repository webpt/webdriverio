import Interception from '.';
import type { Matches, MockResponseParams, MockOverwrite } from './types';
export default class WebDriverInterception extends Interception {
    mockId?: string;
    init(): Promise<void>;
    get calls(): Promise<Matches[]>;
    clear(): Promise<void>;
    restore(): Promise<void>;
    respond(overwrite: MockOverwrite, params?: MockResponseParams): Promise<void>;
    respondOnce(overwrite: MockOverwrite, params?: MockResponseParams): Promise<void>;
    abort(errorReason: string, sticky?: boolean): Promise<void>;
    abortOnce(errorReason: string): Promise<void>;
}
//# sourceMappingURL=webdriver.d.ts.map