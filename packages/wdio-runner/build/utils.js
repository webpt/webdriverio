"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstancesData = exports.sendFailureMessage = exports.filterLogTypes = exports.initialiseInstance = exports.sanitizeCaps = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
const logger_1 = __importDefault(require("@wdio/logger"));
const webdriverio_1 = require("webdriverio");
const webdriver_1 = require("webdriver");
const config_1 = require("@wdio/config");
const log = logger_1.default('@wdio/local-runner:utils');
const MERGE_OPTIONS = { clone: false };
const mochaAllHooks = ['"before all" hook', '"after all" hook'];
function sanitizeCaps(caps, filterOut) {
    const defaultConfigsKeys = [
        ...Object.keys(config_1.DEFAULT_CONFIGS()),
        ...Object.keys(webdriver_1.DEFAULTS)
    ];
    return Object.keys(caps).filter((key) => (!defaultConfigsKeys.includes(key) === !filterOut)).reduce((obj, key) => {
        obj[key] = caps[key];
        return obj;
    }, {});
}
exports.sanitizeCaps = sanitizeCaps;
async function initialiseInstance(config, capabilities, isMultiremote) {
    if (config.sessionId) {
        log.debug(`attach to session with id ${config.sessionId}`);
        config.capabilities = sanitizeCaps(capabilities);
        return webdriverio_1.attach({ ...config });
    }
    if (!isMultiremote) {
        log.debug('init remote session');
        const sessionConfig = {
            ...config,
            ...sanitizeCaps(capabilities, true),
            capabilities: sanitizeCaps(capabilities)
        };
        return webdriverio_1.remote(sessionConfig);
    }
    const options = {};
    log.debug('init multiremote session');
    delete config.capabilities;
    for (let browserName of Object.keys(capabilities)) {
        options[browserName] = deepmerge_1.default(config, capabilities[browserName], MERGE_OPTIONS);
    }
    const browser = await webdriverio_1.multiremote(options, config);
    for (let browserName of Object.keys(capabilities)) {
        global[browserName] = browser[browserName];
    }
    return browser;
}
exports.initialiseInstance = initialiseInstance;
function filterLogTypes(excludeDriverLogs, driverLogTypes) {
    let logTypes = [...driverLogTypes];
    if (Array.isArray(excludeDriverLogs)) {
        log.debug('filtering logTypes', logTypes);
        if (excludeDriverLogs.length === 1 && excludeDriverLogs[0] === '*') {
            logTypes = [];
        }
        else {
            logTypes = logTypes.filter(x => !excludeDriverLogs.includes(x));
        }
        log.debug('filtered logTypes', logTypes);
    }
    return logTypes;
}
exports.filterLogTypes = filterLogTypes;
function sendFailureMessage(e, payload) {
    if (e === 'test:fail' ||
        (e === 'hook:end' &&
            payload.error &&
            mochaAllHooks.some(hook => payload.title.startsWith(hook)))) {
        process.send({
            origin: 'reporter',
            name: 'printFailureMessage',
            content: payload
        });
    }
}
exports.sendFailureMessage = sendFailureMessage;
function getInstancesData(browser, isMultiremote) {
    if (!isMultiremote) {
        return;
    }
    const multiRemoteBrowser = browser;
    const instances = {};
    multiRemoteBrowser.instances.forEach((browserName) => {
        const { protocol, hostname, port, path, queryParams } = multiRemoteBrowser[browserName].options;
        const { isW3C, sessionId } = multiRemoteBrowser[browserName];
        instances[browserName] = { sessionId, isW3C, protocol, hostname, port, path, queryParams };
    });
    return instances;
}
exports.getInstancesData = getInstancesData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMERBQTZCO0FBQzdCLDBEQUFpQztBQUNqQyw2Q0FBeUQ7QUFDekQseUNBQW9DO0FBQ3BDLHlDQUE4QztBQUk5QyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFFOUMsTUFBTSxhQUFhLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUE7QUFDdEMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0FBWS9ELFNBQWdCLFlBQVksQ0FDeEIsSUFBbUMsRUFDbkMsU0FBbUI7SUFFbkIsTUFBTSxrQkFBa0IsR0FBRztRQUV2QixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQWUsRUFBRSxDQUFDO1FBRWpDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBUSxDQUFDO0tBQzNCLENBQUE7SUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBd0MsRUFBRSxFQUFFLENBQUMsQ0FJMUUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsR0FBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQzdELENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FDTixHQUFrQyxFQUNsQyxHQUF3QyxFQUMxQyxFQUFFO1FBQ0EsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNWLENBQUM7QUF2QkQsb0NBdUJDO0FBU00sS0FBSyxVQUFVLGtCQUFrQixDQUNwQyxNQUEyQixFQUMzQixZQUEyQyxFQUMzQyxhQUF1QjtJQUt2QixJQUFJLE1BQU0sQ0FBQyxTQUFT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