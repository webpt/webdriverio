import CrossBrowserTestingLauncher from './launcher';
import CrossBrowserTestingService from './service';
import { CrossBrowserTestingConfig } from './types';
export default CrossBrowserTestingService;
export declare const launcher: typeof CrossBrowserTestingLauncher;
export * from './types';
declare global {
    namespace WebdriverIO {
        interface ServiceOption extends CrossBrowserTestingConfig {
        }
    }
}
//# sourceMappingURL=index.d.ts.map