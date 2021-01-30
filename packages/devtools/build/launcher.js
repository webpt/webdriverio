"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chrome_launcher_1 = require("chrome-launcher");
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const logger_1 = __importDefault(require("@wdio/logger"));
const finder_1 = __importDefault(require("./finder"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const log = logger_1.default('devtools');
const DEVICE_NAMES = Object.values(puppeteer_core_1.default.devices).map((device) => device.name);
async function launchChrome(capabilities) {
    const chromeOptions = capabilities[constants_1.VENDOR_PREFIX.chrome] || {};
    const mobileEmulation = chromeOptions.mobileEmulation || {};
    const devtoolsOptions = capabilities['wdio:devtoolsOptions'];
    let ignoreDefaultArgs = capabilities.ignoreDefaultArgs;
    let headless = chromeOptions.headless;
    if (devtoolsOptions) {
        ignoreDefaultArgs = devtoolsOptions.ignoreDefaultArgs;
        headless = devtoolsOptions.headless;
    }
    if (typeof mobileEmulation.deviceName === 'string') {
        const deviceProperties = Object.values(puppeteer_core_1.default.devices).find(device => device.name === mobileEmulation.deviceName);
        if (!deviceProperties) {
            throw new Error(`Unknown device name "${mobileEmulation.deviceName}", available: ${DEVICE_NAMES.join(', ')}`);
        }
        mobileEmulation.userAgent = deviceProperties.userAgent;
        mobileEmulation.deviceMetrics = {
            width: deviceProperties.viewport.width,
            height: deviceProperties.viewport.height,
            pixelRatio: deviceProperties.viewport.deviceScaleFactor
        };
    }
    const defaultFlags = Array.isArray(ignoreDefaultArgs) ? constants_1.DEFAULT_FLAGS.filter(flag => !ignoreDefaultArgs.includes(flag)) : (!ignoreDefaultArgs) ? constants_1.DEFAULT_FLAGS : [];
    const deviceMetrics = mobileEmulation.deviceMetrics || {};
    const chromeFlags = [
        ...defaultFlags,
        ...[
            `--window-position=${constants_1.DEFAULT_X_POSITION},${constants_1.DEFAULT_Y_POSITION}`,
            `--window-size=${constants_1.DEFAULT_WIDTH},${constants_1.DEFAULT_HEIGHT}`
        ],
        ...(headless ? [
            '--headless',
            '--no-sandbox'
        ] : []),
        ...(chromeOptions.args || [])
    ];
    if (typeof deviceMetrics.pixelRatio === 'number') {
        chromeFlags.push(`--device-scale-factor=${deviceMetrics.pixelRatio}`);
    }
    if (typeof mobileEmulation.userAgent === 'string') {
        chromeFlags.push(`--user-agent=${mobileEmulation.userAgent}`);
    }
    log.info(`Launch Google Chrome with flags: ${chromeFlags.join(' ')}`);
    const chrome = await chrome_launcher_1.launch({
        chromePath: chromeOptions.binary,
        ignoreDefaultFlags: true,
        chromeFlags
    });
    log.info(`Connect Puppeteer with browser on port ${chrome.port}`);
    const browser = await puppeteer_core_1.default.connect({
        ...chromeOptions,
        browserURL: `http://localhost:${chrome.port}`,
        defaultViewport: null
    });
    const pages = await utils_1.getPages(browser);
    for (const page of pages.slice(0, -1)) {
        if (page.url() === 'about:blank') {
            await page.close();
        }
    }
    if (deviceMetrics.width && deviceMetrics.height) {
        await pages[0].setViewport(deviceMetrics);
    }
    return browser;
}
function launchBrowser(capabilities, browserType) {
    var _a;
    const product = browserType === constants_1.BROWSER_TYPE.firefox ? constants_1.BROWSER_TYPE.firefox : constants_1.BROWSER_TYPE.chrome;
    const vendorCapKey = constants_1.VENDOR_PREFIX[browserType];
    const devtoolsOptions = capabilities['wdio:devtoolsOptions'];
    let ignoreDefaultArgs = capabilities.ignoreDefaultArgs;
    let headless = capabilities.headless;
    if (devtoolsOptions) {
        ignoreDefaultArgs = devtoolsOptions.ignoreDefaultArgs;
        headless = devtoolsOptions.headless;
    }
    if (!capabilities[vendorCapKey]) {
        capabilities[vendorCapKey] = {};
    }
    const browserFinderMethod = finder_1.default(browserType, process.platform);
    const executablePath = (((_a = capabilities[vendorCapKey]) === null || _a === void 0 ? void 0 : _a.binary) ||
        browserFinderMethod()[0]);
    const puppeteerOptions = Object.assign({
        product,
        executablePath,
        ignoreDefaultArgs,
        headless: Boolean(headless),
        defaultViewport: {
            width: constants_1.DEFAULT_WIDTH,
            height: constants_1.DEFAULT_HEIGHT
        }
    }, capabilities[vendorCapKey] || {}, devtoolsOptions || {});
    if (!executablePath) {
        throw new Error('Couldn\'t find executable for browser');
    }
    else if (browserType === constants_1.BROWSER_TYPE.firefox &&
        executablePath !== 'firefox' &&
        !executablePath.toLowerCase().includes(constants_1.CHANNEL_FIREFOX_NIGHTLY) &&
        !executablePath.toLowerCase().includes(constants_1.CHANNEL_FIREFOX_TRUNK)) {
        throw new Error(constants_1.BROWSER_ERROR_MESSAGES.firefoxNightly);
    }
    log.info(`Launch ${executablePath} with config: ${JSON.stringify(puppeteerOptions)}`);
    return puppeteer_core_1.default.launch(puppeteerOptions);
}
function launch(capabilities) {
    var _a;
    const browserName = (_a = capabilities.browserName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (browserName && constants_1.CHROME_NAMES.includes(browserName)) {
        return launchChrome(capabilities);
    }
    if (browserName && constants_1.FIREFOX_NAMES.includes(browserName)) {
        return launchBrowser(capabilities, constants_1.BROWSER_TYPE.firefox);
    }
    if (browserName && constants_1.EDGE_NAMES.includes(browserName)) {
        return launchBrowser(capabilities, constants_1.BROWSER_TYPE.edge);
    }
    throw new Error(`Couldn't identify browserName "${browserName}"`);
}
exports.default = launch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBK0Q7QUFDL0Qsb0VBQXNDO0FBQ3RDLDBEQUFpQztBQUlqQyxzREFBb0M7QUFDcEMsbUNBQWtDO0FBQ2xDLDJDQWNvQjtBQUdwQixNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBRTlCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQU9sRixLQUFLLFVBQVUsWUFBWSxDQUFFLFlBQWtDO0lBQzNELE1BQU0sYUFBYSxHQUErQixZQUFZLENBQUMseUJBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDMUYsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUE7SUFDM0QsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFRNUQsSUFBSSxpQkFBaUIsR0FBSSxZQUFvQixDQUFDLGlCQUFpQixDQUFBO0lBQy9ELElBQUksUUFBUSxHQUFJLGFBQXFCLENBQUMsUUFBUSxDQUFBO0lBRTlDLElBQUksZUFBZSxFQUFFO1FBQ2pCLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQTtRQUNyRCxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQTtLQUN0QztJQUVELElBQUksT0FBTyxlQUFlLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNoRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUVwSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsZUFBZSxDQUFDLFVBQVUsaUJBQWlCLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ2hIO1FBRUQsZUFBZSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUE7UUFDdEQsZUFBZSxDQUFDLGFBQWEsR0FBRztZQUM1QixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDdEMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3hDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCO1NBQzFELENBQUE7S0FDSjtJQUVELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQ25LLE1BQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFBO0lBQ3pELE1BQU0sV0FBVyxHQUFHO1FBQ2hCLEdBQUcsWUFBWTtRQUNmLEdBQUc7WUFDQyxxQkFBcUIsOEJBQWtCLElBQUksOEJBQWtCLEVBQUU7WUFDL0QsaUJBQWlCLHlCQUFhLElBQUksMEJBQWMsRUFBRTtTQUNyRDtRQUNELEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsWUFBWTtZQUNaLGNBQWM7U0FDakIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ2hDLENBQUE7SUFFRCxJQUFJLE9BQU8sYUFBYSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDOUMsV0FBVyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7S0FDeEU7SUFFRCxJQUFJLE9BQU8sZUFBZSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDL0MsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7S0FDaEU7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVyRSxNQUFNLE1BQU0sR0FBRyxNQUFNLHdCQUFtQixDQUFDO1FBQ3JDLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTTtRQUNoQyxrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFdBQVc7S0FDZCxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNqRSxNQUFNLE9BQU8sR0FBRyxNQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3BDLEdBQUcsYUFBYTtRQUNoQixVQUFVLEVBQUUsb0JBQW9CLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDN0MsZUFBZSxFQUFFLElBQUk7S0FDeEIsQ0FBdUIsQ0FBQTtJQU14QixNQUFNLEtBQUssR0FBRyxNQUFNLGdCQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLGFBQWEsRUFBRTtZQUM5QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUNyQjtLQUNKO0lBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDN0MsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQzVDO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFFLFlBQWtDLEVBQUUsV0FBK0I7O0lBQ3ZGLE1BQU0sT0FBTyxHQUFHLFdBQVcsS0FBSyx3QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsd0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHdCQUFZLENBQUMsTUFBTSxDQUFBO0lBQ2pHLE1BQU0sWUFBWSxHQUFHLHlCQUFhLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDL0MsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFRNUQsSUFBSSxpQkFBaUIsR0FBSSxZQUFvQixDQUFDLGlCQUFpQixDQUFBO0lBQy9ELElBQUksUUFBUSxHQUFJLFlBQW9CLENBQUMsUUFBUSxDQUFBO0lBQzdDLElBQUksZUFBZSxFQUFFO1FBQ2pCLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQTtRQUNyRCxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQTtLQUN0QztJQUVELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDN0IsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtLQUNsQztJQUVELE1BQU0sbUJBQW1CLEdBQUcsZ0JBQWEsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3hFLE1BQU0sY0FBYyxHQUFHLENBQ25CLE9BQUEsWUFBWSxDQUFDLFlBQVksQ0FBQywwQ0FBRSxNQUFNO1FBQ2xDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQzNCLENBQUE7SUFFRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkMsT0FBTztRQUNQLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDM0IsZUFBZSxFQUFFO1lBQ2IsS0FBSyxFQUFFLHlCQUFhO1lBQ3BCLE1BQU0sRUFBRSwwQkFBYztTQUN6QjtLQUNKLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxlQUFlLElBQUksRUFBRSxDQUFDLENBQUE7SUFFM0QsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7S0FDM0Q7U0FBTSxJQUNILFdBQVcsS0FBSyx3QkFBWSxDQUFDLE9BQU87UUFDcEMsY0FBYyxLQUFLLFNBQVM7UUFDNUIsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLG1DQUF1QixDQUFDO1FBQy9ELENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQ0FBcUIsQ0FBQyxFQUMvRDtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQXNCLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDekQ7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsY0FBYyxpQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNyRixPQUFPLHdCQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFnQyxDQUFBO0FBQzVFLENBQUM7QUFFRCxTQUF3QixNQUFNLENBQUUsWUFBa0M7O0lBQzlELE1BQU0sV0FBVyxTQUFHLFlBQVksQ0FBQyxXQUFXLDBDQUFFLFdBQVcsRUFBRSxDQUFBO0lBRTNELElBQUksV0FBVyxJQUFJLHdCQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ25ELE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFBO0tBQ3BDO0lBRUQsSUFBSSxXQUFXLElBQUkseUJBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDcEQsT0FBTyxhQUFhLENBQUMsWUFBWSxFQUFFLHdCQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7S0FDM0Q7SUFHRCxJQUFJLFdBQVcsSUFBSSxzQkFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNqRCxPQUFPLGFBQWEsQ0FBQyxZQUFZLEVBQUUsd0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN4RDtJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLFdBQVcsR0FBRyxDQUFDLENBQUE7QUFDckUsQ0FBQztBQWpCRCx5QkFpQkMifQ==