import type { InstallOpts, StartOpts } from 'selenium-standalone';
export interface SeleniumStandaloneOptions {
    logs?: string;
    installArgs?: Partial<InstallOpts>;
    args?: Partial<StartOpts>;
    skipSeleniumInstall?: boolean;
    drivers?: {
        chrome?: string | boolean;
        firefox?: string | boolean;
        chromiumedge?: string | boolean;
        ie?: string | boolean;
        edge?: string | boolean;
    };
}
//# sourceMappingURL=types.d.ts.map