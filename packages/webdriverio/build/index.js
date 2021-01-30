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
exports.SevereServiceError = exports.multiremote = exports.attach = exports.remote = void 0;
const logger_1 = __importDefault(require("@wdio/logger"));
const webdriver_1 = __importDefault(require("webdriver"));
const webdriver_2 = require("webdriver");
const config_1 = require("@wdio/config");
const utils_1 = require("@wdio/utils");
const multiremote_1 = __importDefault(require("./multiremote"));
const SevereServiceError_1 = __importDefault(require("./utils/SevereServiceError"));
const constants_1 = require("./constants");
const utils_2 = require("./utils");
exports.remote = async function (params, remoteModifier) {
    logger_1.default.setLogLevelsConfig(params.logLevels, params.logLevel);
    const config = config_1.validateConfig(constants_1.WDIO_DEFAULTS, params, Object.keys(webdriver_2.DEFAULTS));
    const automationProtocol = await utils_2.getAutomationProtocol(config);
    const modifier = (client, options) => {
        Object.assign(options, Object.entries(config)
            .reduce((a, [k, v]) => (v == null ? a : { ...a, [k]: v }), {}));
        if (typeof remoteModifier === 'function') {
            client = remoteModifier(client, options);
        }
        options.automationProtocol = automationProtocol;
        return client;
    };
    if (params.user && params.key) {
        params = Object.assign({}, config_1.detectBackend(params), params);
    }
    const prototype = utils_2.getPrototype('browser');
    const ProtocolDriver = require(automationProtocol).default;
    await utils_2.updateCapabilities(params, automationProtocol);
    const instance = await ProtocolDriver.newSession(params, modifier, prototype, utils_1.wrapCommand);
    if (params.framework && !utils_2.isStub(automationProtocol)) {
        const origAddCommand = instance.addCommand.bind(instance);
        instance.addCommand = (name, fn, attachToElement) => (origAddCommand(name, utils_1.runFnInFiberContext(fn), attachToElement));
        const origOverwriteCommand = instance.overwriteCommand.bind(instance);
        instance.overwriteCommand = (name, fn, attachToElement) => (origOverwriteCommand(name, utils_1.runFnInFiberContext(fn), attachToElement));
    }
    instance.addLocatorStrategy = utils_2.addLocatorStrategyHandler(instance);
    return instance;
};
exports.attach = function (params) {
    const prototype = utils_2.getPrototype('browser');
    return webdriver_1.default.attachToSession(params, undefined, prototype, utils_1.wrapCommand);
};
exports.multiremote = async function (params, { automationProtocol } = {}) {
    const multibrowser = new multiremote_1.default();
    const browserNames = Object.keys(params);
    await Promise.all(browserNames.map(async (browserName) => {
        const instance = await exports.remote(params[browserName]);
        return multibrowser.addInstance(browserName, instance);
    }));
    const prototype = utils_2.getPrototype('browser');
    const sessionParams = utils_2.isStub(automationProtocol) ? undefined : {
        sessionId: '',
        isW3C: multibrowser.instances[browserNames[0]].isW3C,
        logLevel: multibrowser.instances[browserNames[0]].options.logLevel
    };
    const ProtocolDriver = automationProtocol && utils_2.isStub(automationProtocol)
        ? require(automationProtocol).default
        : webdriver_1.default;
    const driver = ProtocolDriver.attachToSession(sessionParams, multibrowser.modifier.bind(multibrowser), prototype, utils_1.wrapCommand);
    if (!utils_2.isStub(automationProtocol)) {
        const origAddCommand = driver.addCommand.bind(driver);
        driver.addCommand = (name, fn, attachToElement) => {
            return origAddCommand(name, utils_1.runFnInFiberContext(fn), attachToElement, Object.getPrototypeOf(multibrowser.baseInstance), multibrowser.instances);
        };
        const origOverwriteCommand = driver.overwriteCommand.bind(driver);
        driver.overwriteCommand = (name, fn, attachToElement) => {
            return origOverwriteCommand(name, utils_1.runFnInFiberContext(fn), attachToElement, Object.getPrototypeOf(multibrowser.baseInstance), multibrowser.instances);
        };
    }
    driver.addLocatorStrategy = utils_2.addLocatorStrategyHandler(driver);
    return driver;
};
exports.SevereServiceError = SevereServiceError_1.default;
__exportStar(require("./types"), exports);
__exportStar(require("./utils/interception/types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDBEQUFpQztBQUVqQywwREFBaUM7QUFDakMseUNBQW9DO0FBQ3BDLHlDQUE0RDtBQUM1RCx1Q0FBOEQ7QUFHOUQsZ0VBQXVDO0FBRXZDLG9GQUFpRTtBQUNqRSwyQ0FBMkM7QUFDM0MsbUNBR2dCO0FBWUgsUUFBQSxNQUFNLEdBQUcsS0FBSyxXQUFXLE1BQXFCLEVBQUUsY0FBeUI7SUFDbEYsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsU0FBZ0IsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFbkUsTUFBTSxNQUFNLEdBQUcsdUJBQWMsQ0FBZ0IseUJBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBUSxDQUFRLENBQUMsQ0FBQTtJQUNqRyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sNkJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDOUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUE2QixFQUFFLE9BQTRCLEVBQUUsRUFBRTtRQUs3RSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRW5FLElBQUksT0FBTyxjQUFjLEtBQUssVUFBVSxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFF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