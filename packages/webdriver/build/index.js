"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULTS = exports.getPrototype = void 0;
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const config_1 = require("@wdio/config");
const constants_1 = require("./constants");
Object.defineProperty(exports, "DEFAULTS", { enumerable: true, get: function () { return constants_1.DEFAULTS; } });
const utils_2 = require("./utils");
Object.defineProperty(exports, "getPrototype", { enumerable: true, get: function () { return utils_2.getPrototype; } });
const log = logger_1.default('webdriver');
class WebDriver {
    static async newSession(options, modifier, userPrototype = {}, customCommandWrapper) {
        const params = config_1.validateConfig(constants_1.DEFAULTS, options);
        if (!options.logLevels || !options.logLevels.webdriver) {
            logger_1.default.setLevel('webdriver', params.logLevel);
        }
        if (params.outputDir && !process.env.WDIO_LOG_PATH) {
            process.env.WDIO_LOG_PATH = path_1.default.join(params.outputDir, 'wdio.log');
        }
        log.info('Initiate new session using the WebDriver protocol');
        const { directConnectProtocol, directConnectHost, directConnectPort, directConnectPath } = params;
        if (directConnectProtocol && directConnectHost && directConnectPort && (directConnectPath || directConnectPath === '')) {
            log.info('Found direct connect information in new session response. ' +
                `Will connect to server at ${directConnectProtocol}://${directConnectHost}:${directConnectPort}/${directConnectPath}`);
            params.protocol = directConnectProtocol;
            params.hostname = directConnectHost;
            params.port = directConnectPort;
            params.path = directConnectPath;
        }
        const requestedCapabilities = { ...params.capabilities };
        const { sessionId, capabilities } = await utils_2.startWebDriverSession(params);
        const environment = utils_1.sessionEnvironmentDetector({ capabilities, requestedCapabilities });
        const environmentPrototype = utils_2.getEnvironmentVars(environment);
        const protocolCommands = utils_2.getPrototype(environment);
        const prototype = { ...protocolCommands, ...environmentPrototype, ...userPrototype };
        const monad = utils_1.webdriverMonad({ ...params, requestedCapabilities }, modifier, prototype);
        return monad(sessionId, customCommandWrapper);
    }
    static attachToSession(options, modifier, userPrototype = {}, commandWrapper) {
        if (!options || typeof options.sessionId !== 'string') {
            throw new Error('sessionId is required to attach to existing session');
        }
        if (options.logLevel) {
            logger_1.default.setLevel('webdriver', options.logLevel);
        }
        options.capabilities = options.capabilities || {};
        options.isW3C = options.isW3C === false ? false : true;
        const environmentPrototype = utils_2.getEnvironmentVars(options);
        const protocolCommands = utils_2.getPrototype(options);
        const prototype = { ...protocolCommands, ...environmentPrototype, ...userPrototype };
        const monad = utils_1.webdriverMonad(options, modifier, prototype);
        return monad(options.sessionId, commandWrapper);
    }
    static async reloadSession(instance) {
        const params = {
            ...instance.options,
            capabilities: instance.requestedCapabilities
        };
        const { sessionId, capabilities } = await utils_2.startWebDriverSession(params);
        instance.sessionId = sessionId;
        instance.capabilities = capabilities;
        return sessionId;
    }
    static get WebDriver() {
        return WebDriver;
    }
}
exports.default = WebDriver;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF1QjtBQUN2QiwwREFBaUM7QUFFakMsdUNBQXdFO0FBQ3hFLHlDQUE2QztBQUc3QywyQ0FBc0M7QUFrSGYseUZBbEhkLG9CQUFRLE9Ba0hjO0FBakgvQixtQ0FBaUY7QUFpSHhFLDZGQWpIdUIsb0JBQVksT0FpSHZCO0FBOUdyQixNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBRS9CLE1BQXFCLFNBQVM7SUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQ25CLE9BQTBCLEVBQzFCLFFBQWtDLEVBQ2xDLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLG9CQUE4QztRQUU5QyxNQUFNLE1BQU0sR0FBRyx1QkFBYyxDQUFDLG9CQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUNwRCxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFFBQVMsQ0FBQyxDQUFBO1NBQ2pEO1FBS0QsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1NBQ3RFO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxtREFBbUQsQ0FBQyxDQUFBO1FBUzdELE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNqRyxJQUFJLHFCQUFxQixJ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