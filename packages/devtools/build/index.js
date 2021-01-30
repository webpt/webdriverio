"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_BROWSER = exports.sessionMap = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const config_1 = require("@wdio/config");
const devtoolsdriver_1 = __importDefault(require("./devtoolsdriver"));
const launcher_1 = __importDefault(require("./launcher"));
const constants_1 = require("./constants");
Object.defineProperty(exports, "SUPPORTED_BROWSER", { enumerable: true, get: function () { return constants_1.SUPPORTED_BROWSER; } });
const utils_2 = require("./utils");
const log = logger_1.default('devtools:puppeteer');
utils_2.patchDebug(log);
exports.sessionMap = new Map();
class DevTools {
    static async newSession(options, modifier, userPrototype = {}, customCommandWrapper) {
        var _a, _b;
        const params = config_1.validateConfig(constants_1.DEFAULTS, options);
        if (params.logLevel && (!options.logLevels || !options.logLevels['devtools'])) {
            logger_1.default.setLevel('devtools', params.logLevel);
        }
        if (params.outputDir && !process.env.WDIO_LOG_PATH) {
            process.env.WDIO_LOG_PATH = path_1.default.join(params.outputDir, 'wdio.log');
        }
        log.info('Initiate new session using the DevTools protocol');
        const requestedCapabilities = { ...params.capabilities };
        const browser = await launcher_1.default(params.capabilities);
        const pages = await browser.pages();
        const driver = new devtoolsdriver_1.default(browser, pages);
        const sessionId = uuid_1.v4();
        const uaParser = new ua_parser_js_1.default(await browser.userAgent());
        const userAgent = uaParser.getResult();
        const availableVendorPrefixes = Object.values(constants_1.VENDOR_PREFIX);
        const vendorCapPrefix = Object.keys(params.capabilities)
            .find((capKey) => availableVendorPrefixes.includes(capKey));
        params.capabilities = {
            browserName: userAgent.browser.name,
            browserVersion: userAgent.browser.version,
            platformName: os_1.default.platform(),
            platformVersion: os_1.default.release()
        };
        if (vendorCapPrefix) {
            Object.assign(params.capabilities, {
                [vendorCapPrefix]: Object.assign({ debuggerAddress: browser._connection.url().split('/')[2] }, params.capabilities[vendorCapPrefix])
            });
        }
        exports.sessionMap.set(sessionId, { browser, session: driver });
        const environmentPrototype = { puppeteer: { value: browser } };
        Object.entries(utils_1.devtoolsEnvironmentDetector({
            browserName: (_b = (_a = userAgent === null || userAgent === void 0 ? void 0 : userAgent.browser) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()
        })).forEach(([name, value]) => {
            environmentPrototype[name] = { value };
        });
        const commandWrapper = (method, endpoint, commandInfo) => driver.register(commandInfo);
        const protocolCommands = utils_2.getPrototype(commandWrapper);
        const prototype = {
            ...protocolCommands,
            ...userPrototype,
            ...environmentPrototype
        };
        const monad = utils_1.webdriverMonad({ ...params, requestedCapabilities }, modifier, prototype);
        return monad(sessionId, customCommandWrapper);
    }
    static async reloadSession(instance) {
        const { session } = exports.sessionMap.get(instance.sessionId);
        const browser = await launcher_1.default(instance.requestedCapabilities);
        const pages = await browser.pages();
        session.elementStore.clear();
        session.windows = new Map();
        session.browser = browser;
        for (const page of pages) {
            const pageId = uuid_1.v4();
            session.windows.set(pageId, page);
            session.currentWindowHandle = pageId;
        }
        exports.sessionMap.set(instance.sessionId, { browser, session });
        return instance.sessionId;
    }
    static attachToSession() {
        throw new Error('not yet implemented');
    }
}
exports.default = DevTools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUN2QixnRUFBbUM7QUFDbkMsK0JBQW1DO0FBRW5DLDBEQUFpQztBQUNqQyx1Q0FBeUU7QUFDekUseUNBQTZDO0FBSzdDLHNFQUE2QztBQUM3QywwREFBK0I7QUFDL0IsMkNBQXdFO0FBdUgvRCxrR0F2SFUsNkJBQWlCLE9BdUhWO0FBdEgxQixtQ0FBa0Q7QUFHbEQsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBS3hDLGtCQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFRixRQUFBLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBRW5DLE1BQXFCLFFBQVE7SUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUUsT0FBMEIsRUFBRSxRQUFtQixFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQUUsb0JBQStCOztRQUN6SCxNQUFNLE1BQU0sR0FBRyx1QkFBYyxDQUFDLG9CQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFaEQsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUUsT0FBTyxDQUFDLFNBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtZQUNwRixnQkFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQy9DO1FBS0QsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQ3RFO1FBRUQs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