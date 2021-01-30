import TestingBotLauncher from './launcher';
import TestingBotService from './service';
import { TestingbotOptions } from './types';
export default TestingBotService;
export declare const launcher: typeof TestingBotLauncher;
export * from './types';
declare global {
    namespace WebdriverIO {
        interface ServiceOption extends TestingbotOptions {
        }
    }
}
//# sourceMappingURL=index.d.ts.map