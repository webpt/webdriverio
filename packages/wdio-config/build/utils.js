"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBabelCompiler = exports.loadTypeScriptCompiler = exports.validateConfig = exports.detectBackend = exports.isCloudCapability = exports.isCucumberFeatureWithLineNumber = exports.removeLineNumbers = exports.getSauceEndpoint = exports.validObjectOrArray = void 0;
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/config:utils');
const DEFAULT_HOSTNAME = '127.0.0.1';
const DEFAULT_PORT = 4444;
const DEFAULT_PROTOCOL = 'http';
const DEFAULT_PATH = '/';
const LEGACY_PATH = '/wd/hub';
const REGION_MAPPING = {
    'us': 'us-west-1.',
    'eu': 'eu-central-1.',
    'eu-central-1': 'eu-central-1.',
    'us-east-1': 'us-east-1.'
};
exports.validObjectOrArray = (object) => (Array.isArray(object) && object.length > 0) ||
    (typeof object === 'object' && Object.keys(object).length > 0);
function getSauceEndpoint(region, { isRDC, isVisual } = {}) {
    const shortRegion = REGION_MAPPING[region] ? region : 'us';
    if (isRDC) {
        return `${shortRegion}1.appium.testobject.com`;
    }
    else if (isVisual) {
        return 'hub.screener.io';
    }
    return `ondemand.${REGION_MAPPING[shortRegion]}saucelabs.com`;
}
exports.getSauceEndpoint = getSauceEndpoint;
function removeLineNumbers(filePath) {
    const matcher = filePath.match(/:\d+(:\d+$|$)/);
    if (matcher) {
        filePath = filePath.substring(0, matcher.index);
    }
    return filePath;
}
exports.removeLineNumbers = removeLineNumbers;
function isCucumberFeatureWithLineNumber(spec) {
    const specs = Array.isArray(spec) ? spec : [spec];
    return specs.some((s) => s.match(/:\d+(:\d+$|$)/));
}
exports.isCucumberFeatureWithLineNumber = isCucumberFeatureWithLineNumber;
function isCloudCapability(caps) {
    return Boolean(caps && (caps['bstack:options'] || caps['sauce:options'] || caps['tb:options']));
}
exports.isCloudCapability = isCloudCapability;
function detectBackend(options = {}) {
    var _a, _b;
    let { port, hostname, user, key, protocol, region, headless, path, capabilities } = options;
    if (typeof user === 'string' && typeof key === 'string' && key.length === 20) {
        return {
            protocol: protocol || 'https',
            hostname: hostname || 'hub-cloud.browserstack.com',
            port: port || 443,
            path: path || LEGACY_PATH
        };
    }
    if (typeof user === 'string' && typeof key === 'string' && key.length === 32) {
        return {
            protocol: protocol || 'https',
            hostname: hostname || 'hub.testingbot.com',
            port: port || 443,
            path: path || LEGACY_PATH
        };
    }
    const isRDC = Boolean(!Array.isArray(capabilities) && ((_a = capabilities) === null || _a === void 0 ? void 0 : _a.testobject_api_key));
    const isVisual = Boolean(!Array.isArray(capabilities) && capabilities && ((_b = capabilities['sauce:visual']) === null || _b === void 0 ? void 0 : _b.apiKey));
    if ((typeof user === 'string' && typeof key === 'string' && key.length === 36) ||
        (isRDC || isVisual)) {
        const sauceRegion = headless ? 'us-east-1' : region;
        return {
            protocol: protocol || 'https',
            hostname: hostname || getSauceEndpoint(sauceRegion, { isRDC, isVisual }),
            port: port || 443,
            path: path || LEGACY_PATH
        };
    }
    if ((typeof user === 'string' || typeof key === 'string') &&
        !hostname) {
        throw new Error('A "user" or "key" was provided but could not be connected to a ' +
            'known cloud service (Sauce Labs, Browerstack or Testingbot). ' +
            'Please check if given user and key properties are correct!');
    }
    if (hostname || port || protocol || path) {
        return {
            hostname: hostname || DEFAULT_HOSTNAME,
            port: port || DEFAULT_PORT,
            protocol: protocol || DEFAULT_PROTOCOL,
            path: path || DEFAULT_PATH
        };
    }
    return { hostname, port, protocol, path };
}
exports.detectBackend = detectBackend;
function validateConfig(defaults, options, keysToKeep = []) {
    const params = {};
    for (const [name, expectedOption] of Object.entries(defaults)) {
        if (typeof options[name] === 'undefined' && !expectedOption.default && expectedOption.required) {
            throw new Error(`Required option "${name}" is missing`);
        }
        if (typeof options[name] === 'undefined' && expectedOption.default) {
            params[name] = expectedOption.default;
        }
        if (typeof options[name] !== 'undefined') {
            const optValue = options[name];
            if (typeof optValue !== expectedOption.type) {
                throw new Error(`Expected option "${name}" to be type of ${expectedOption.type} but was ${typeof options[name]}`);
            }
            if (typeof expectedOption.validate === 'function') {
                try {
                    expectedOption.validate(optValue);
                }
                catch (e) {
                    throw new Error(`Type check for option "${name}" failed: ${e.message}`);
                }
            }
            if (typeof optValue === 'string' && expectedOption.match && !optValue.match(expectedOption.match)) {
                throw new Error(`Option "${name}" doesn't match expected values: ${expectedOption.match}`);
            }
            params[name] = options[name];
        }
    }
    for (const [name, option] of Object.entries(options)) {
        if (keysToKeep.includes(name)) {
            params[name] = option;
        }
    }
    return params;
}
exports.validateConfig = validateConfig;
function loadTypeScriptCompiler(tsNodeOpts) {
    try {
        require.resolve('ts-node');
        require('ts-node').register(tsNodeOpts);
        log.debug('Found \'ts-node\' package, auto-compiling TypeScript files');
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.loadTypeScriptCompiler = loadTypeScriptCompiler;
function loadBabelCompiler() {
    try {
        require.resolve('@babel/register');
        if (process.env.JEST_WORKER_ID && process.env.THROW_BABEL_REGISTER) {
            throw new Error('test fail');
        }
        require('@babel/register');
        log.debug('Found \'@babel/register\' package, auto-compiling files with Babel');
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.loadBabelCompiler = loadBabelCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMERBQWlDO0FBSWpDLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtBQUV4QyxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQTtBQUNwQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUE7QUFDekIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUE7QUFDL0IsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFBO0FBQ3hCLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQTtBQUU3QixNQUFNLGNBQWMsR0FBRztJQUNuQixJQUFJLEVBQUUsWUFBWTtJQUNsQixJQUFJLEVBQUUsZUFBZTtJQUNyQixjQUFjLEVBQUUsZUFBZTtJQUMvQixXQUFXLEVBQUUsWUFBWTtDQUM1QixDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRyxDQUFDLE1BQVcsRUFBaUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMxSCxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUVsRSxTQUFnQixnQkFBZ0IsQ0FDNUIsTUFBbUMsRUFDbkMsRUFBRSxLQUFLLEVBQUUsUUFBUSxLQUE4QyxFQUFFO0lBRWpFLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDMUQsSUFBSSxLQUFLLEVBQUU7UUFDUCxPQUFPLEdBQUcsV0FBVyx5QkFBeUIsQ0FBQTtLQUNqRDtTQUFNLElBQUksUUFBUSxFQUFFO1FBQ2pCLE9BQU8s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