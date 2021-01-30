"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANNEL_FIREFOX_TRUNK = exports.CHANNEL_FIREFOX_NIGHTLY = exports.VENDOR_PREFIX = exports.BROWSER_ERROR_MESSAGES = exports.ERROR_MESSAGES = exports.PPTR_LOG_PREFIX = exports.SERIALIZE_FLAG = exports.SERIALIZE_PROPERTY = exports.SUPPORTED_SELECTOR_STRATEGIES = exports.DEFAULT_SCRIPT_TIMEOUT = exports.DEFAULT_PAGELOAD_TIMEOUT = exports.DEFAULT_IMPLICIT_TIMEOUT = exports.DEFAULTS = exports.BROWSER_TYPE = exports.SUPPORTED_BROWSER = exports.EDGE_NAMES = exports.FIREFOX_NAMES = exports.CHROME_NAMES = exports.DEFAULT_FLAGS = exports.ELEMENT_KEY = exports.DEFAULT_Y_POSITION = exports.DEFAULT_X_POSITION = exports.DEFAULT_HEIGHT = exports.DEFAULT_WIDTH = void 0;
exports.DEFAULT_WIDTH = 1200;
exports.DEFAULT_HEIGHT = 900;
exports.DEFAULT_X_POSITION = 0;
exports.DEFAULT_Y_POSITION = 0;
exports.ELEMENT_KEY = 'element-6066-11e4-a52e-4f735466cecf';
exports.DEFAULT_FLAGS = [
    '--enable-automation',
    '--disable-popup-blocking',
    '--disable-extensions',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-sync',
    '--metrics-recording-only',
    '--disable-default-apps',
    '--mute-audio',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-hang-monitor',
    '--disable-prompt-on-repost',
    '--disable-client-side-phishing-detection',
    '--password-store=basic',
    '--use-mock-keychain',
    '--disable-component-extensions-with-background-pages',
    '--disable-breakpad',
    '--disable-dev-shm-usage',
    '--disable-ipc-flooding-protection',
    '--disable-renderer-backgrounding',
    '--force-fieldtrials=*BackgroundTracing/default/',
    '--enable-features=NetworkService,NetworkServiceInProcess',
    '--disable-features=site-per-process,TranslateUI,BlinkGenPropertyTrees'
];
exports.CHROME_NAMES = ['chrome', 'googlechrome', 'headlesschrome', 'google-chrome', 'chromium'];
exports.FIREFOX_NAMES = ['firefox', 'ff', 'mozilla', 'mozillafirefox', 'headless firefox', 'headlessfirefox'];
exports.EDGE_NAMES = ['edge', 'msedge', 'microsoft-edge', 'microsoftedge'];
exports.SUPPORTED_BROWSER = [...exports.CHROME_NAMES, ...exports.FIREFOX_NAMES, ...exports.EDGE_NAMES];
exports.BROWSER_TYPE = {
    chrome: 'chrome',
    firefox: 'firefox',
    edge: 'edge'
};
exports.DEFAULTS = {
    capabilities: {
        type: 'object',
        required: true
    },
    logLevel: {
        type: 'string',
        default: 'info',
        match: /(trace|debug|info|warn|error|silent)/
    },
    outputDir: {
        type: 'string'
    },
    connectionRetryCount: {
        type: 'number',
        default: 50
    }
};
exports.DEFAULT_IMPLICIT_TIMEOUT = 0;
exports.DEFAULT_PAGELOAD_TIMEOUT = 5 * 60 * 1000;
exports.DEFAULT_SCRIPT_TIMEOUT = 30 * 1000;
exports.SUPPORTED_SELECTOR_STRATEGIES = ['css selector', 'tag name', 'xpath', 'link text', 'partial link text'];
exports.SERIALIZE_PROPERTY = 'data-devtoolsdriver-fetchedElement';
exports.SERIALIZE_FLAG = '__executeElement';
exports.PPTR_LOG_PREFIX = 'puppeteer:protocol';
exports.ERROR_MESSAGES = {
    staleElement: {
        name: 'stale element reference',
        message: 'stale element reference: The element reference is stale; either the element is no longer attached to the DOM, it is not in the current frame context, or the document has been refreshed'
    }
};
exports.BROWSER_ERROR_MESSAGES = {
    firefoxNightly: `Only Nightly release channel is supported in Devtools/Puppeteer for Firefox. Refer to the following issue:
        https://bugzilla.mozilla.org/show_bug.cgi?id=1606604

        You can use the following link to download Firefox Nightly edition:
        https://www.mozilla.org/en-US/firefox/channel/desktop/

        Adding the following binary capability in Firefox Options is mandatory to run with Nightly edition:

        'moz:firefoxOptions': {
            binary: '/path/to/firefox'
        }

        Note: "Nightly" as a term should be present in the "Firefox Application Name" across all OS's in binary path mentioned above for this to work.`
};
exports.VENDOR_PREFIX = {
    chrome: 'goog:chromeOptions',
    firefox: 'moz:firefoxOptions',
    edge: 'ms:edgeOptions'
};
exports.CHANNEL_FIREFOX_NIGHTLY = 'nightly';
exports.CHANNEL_FIREFOX_TRUNK = 'trunk';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFYSxRQUFBLGFBQWEsR0FBRyxJQUFJLENBQUE7QUFDcEIsUUFBQSxjQUFjLEdBQUcsR0FBRyxDQUFBO0FBQ3BCLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxDQUFBO0FBQ3RCLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxDQUFBO0FBRXRCLFFBQUEsV0FBVyxHQUFHLHFDQUFxQyxDQUFBO0FBR25ELFFBQUEsYUFBYSxHQUFHO0lBRXpCLHFCQUFxQjtJQUVyQiwwQkFBMEI7SUFFMUIsc0JBQXNCO0lBR3RCLGlDQUFpQztJQUNqQyx1Q0FBdUM7SUFDdkMsMENBQTBDO0lBRTFDLGdCQUFnQjtJQUVoQiwwQkFBMEI7SUFFMUIsd0JBQXdCO0lBRXhCLGNBQWM7SUFFZCxnQkFBZ0I7SUFDaEIsNEJBQTRCO0lBRTVCLHdCQUF3QjtJQUN4Qiw0QkFBNEI7SUFDNUIsMENBQTBDO0lBQzFDLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsc0RBQXNEO0lBQ3RELG9CQUFvQjtJQUNwQix5QkFBeUI7SUFDekIsbUNBQW1DO0lBQ25DLGtDQUFrQztJQUNsQyxpREFBaUQ7SUFDakQsMERBQTBEO0lBSzFELHVFQUF1RTtDQUMxRSxDQUFBO0FBRVksUUFBQSxZQUFZLEdBQUcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUN4RixRQUFBLGFBQWEsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQUE7QUFDckcsUUFBQSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFBO0FBQ2xFLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLG9CQUFZLEVBQUUsR0FBRyxxQkFBYSxFQUFFLEdBQUcsa0JBQVUsQ0FBQyxDQUFBO0FBRXRFLFFBQUEsWUFBWSxHQUlyQjtJQUNBLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLElBQUksRUFBRSxNQUFNO0NBQ2YsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUEwQztJQUMzRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBSUQsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxzQ0FBc0M7S0FDaEQ7SUFJRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUlELG9CQUFvQixFQUFFO1FBQ2xCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZDtDQUNKLENBQUE7QUFFWSxRQUFBLHdCQUF3QixHQUFHLENBQUMsQ0FBQTtBQUM1QixRQUFBLHdCQUF3QixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO0FBQ3hDLFFBQUEsc0JBQXNCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtBQUVsQyxRQUFBLDZCQUE2QixHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDLENBQUE7QUFDdkcsUUFBQSxrQkFBa0IsR0FBRyxvQ0FBb0MsQ0FBQTtBQUN6RCxRQUFBLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQTtBQUVuQyxRQUFBLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQTtBQUV0QyxRQUFBLGNBQWMsR0FBRztJQUMxQixZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUseUJBQXlCO1FBQy9CLE9BQU8sRUFBRSwwTEFBMEw7S0FDdE07Q0FDSixDQUFBO0FBRVksUUFBQSxzQkFBc0IsR0FBRztJQUNsQyxjQUFjLEVBQUU7Ozs7Ozs7Ozs7Ozt1SkFZbUk7Q0FDdEosQ0FBQTtBQUVZLFFBQUEsYUFBYSxHQUl0QjtJQUNBLE1BQU0sRUFBRSxvQkFBb0I7SUFDNUIsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixJQUFJLEVBQUUsZ0JBQWdCO0NBQ3pCLENBQUE7QUFFWSxRQUFBLHVCQUF1QixHQUFHLFNBQVMsQ0FBQTtBQUNuQyxRQUFBLHFCQUFxQixHQUFHLE9BQU8sQ0FBQSJ9