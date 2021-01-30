"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsHeaderObject = exports.updateCapabilities = exports.getAutomationProtocol = exports.isStub = exports.enhanceElementsArray = exports.addLocatorStrategyHandler = exports.hasElementId = exports.getScrollPosition = exports.validateUrl = exports.assertDirectoryExists = exports.getAbsoluteFilepath = exports.getElementRect = exports.verifyArgsAndStripIfElement = exports.findElements = exports.findElement = exports.checkUnicode = exports.parseCSS = exports.transformToCharString = exports.getBrowserObject = exports.getElementFromResponse = exports.getPrototype = void 0;
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const css_value_1 = __importDefault(require("css-value"));
const rgb2hex_1 = __importDefault(require("rgb2hex"));
const get_port_1 = __importDefault(require("get-port"));
const grapheme_splitter_1 = __importDefault(require("grapheme-splitter"));
const logger_1 = __importDefault(require("@wdio/logger"));
const lodash_isobject_1 = __importDefault(require("lodash.isobject"));
const lodash_isplainobject_1 = __importDefault(require("lodash.isplainobject"));
const url_1 = require("url");
const devtools_1 = require("devtools");
const constants_1 = require("../constants");
const findStrategy_1 = require("./findStrategy");
const browserCommands = require('../commands/browser').default;
const elementCommands = require('../commands/element').default;
const log = logger_1.default('webdriverio');
const INVALID_SELECTOR_ERROR = 'selector needs to be typeof `string` or `function`';
const scopes = {
    browser: browserCommands,
    element: elementCommands
};
const applyScopePrototype = (prototype, scope) => {
    Object.entries(scopes[scope]).forEach(([commandName, command]) => {
        prototype[commandName] = { value: command };
    });
};
exports.getPrototype = (scope) => {
    const prototype = {
        puppeteer: { value: null, writable: true },
        _NOT_FIBER: { value: false, writable: true, configurable: true }
    };
    applyScopePrototype(prototype, scope);
    prototype.strategies = { value: new Map() };
    return prototype;
};
exports.getElementFromResponse = (res) => {
    if (!res) {
        return null;
    }
    if (res.ELEMENT) {
        return res.ELEMENT;
    }
    if (res[constants_1.ELEMENT_KEY]) {
        return res[constants_1.ELEMENT_KEY];
    }
    return null;
};
function getBrowserObject(elem) {
    const elemObject = elem;
    return elemObject.parent ? getBrowserObject(elemObject.parent) : elem;
}
exports.getBrowserObject = getBrowserObject;
function transformToCharString(value, translateToUnicode = true) {
    const ret = [];
    if (!Array.isArray(value)) {
        value = [value];
    }
    for (const val of value) {
        if (typeof val === 'string') {
            translateToUnicode
                ? ret.push(...checkUnicode(val))
                : ret.push(...`${val}`.split(''));
        }
        else if (typeof val === 'number') {
            const entry = `${val}`.split('');
            ret.push(...entry);
        }
        else if (val && typeof val === 'object') {
            try {
                ret.push(...JSON.stringify(val).split(''));
            }
            catch (e) { }
        }
        else if (typeof val === 'boolean') {
            const entry = val ? 'true'.split('') : 'false'.split('');
            ret.push(...entry);
        }
    }
    return ret;
}
exports.transformToCharString = transformToCharString;
function sanitizeCSS(value) {
    if (!value) {
        return value;
    }
    return value.trim().replace(/'/g, '').replace(/"/g, '').toLowerCase();
}
function parseCSS(cssPropertyValue, cssProperty) {
    var _a;
    const parsedValue = {
        property: cssProperty,
        value: cssPropertyValue.toLowerCase().trim(),
        parsed: {}
    };
    if (((_a = parsedValue.value) === null || _a === void 0 ? void 0 : _a.indexOf('rgb')) === 0) {
        parsedValue.value = parsedValue.value.replace(/\s/g, '');
        let color = parsedValue.value;
        parsedValue.parsed = rgb2hex_1.default(parsedValue.value);
        parsedValue.parsed.type = 'color';
        const colorType = /[rgba]+/g.exec(color) || [];
        parsedValue.parsed[colorType[0]] = color;
    }
    else if (parsedValue.property === 'font-family') {
        let font = css_value_1.default(cssPropertyValue);
        let string = parsedValue.value;
        let value = cssPropertyValue.split(/,/).map(sanitizeCSS);
        parsedValue.value = sanitizeCSS(font[0].value || font[0].string);
        parsedValue.parsed = { value, type: 'font', string };
    }
    else {
        try {
            const value = css_value_1.default(cssPropertyValue);
            if (value.length === 1) {
                parsedValue.parsed = value[0];
            }
            if (parsedValue.parsed.type && parsedValue.parsed.type === 'number' && parsedValue.parsed.unit === '') {
                parsedValue.value = parsedValue.parsed.value;
            }
        }
        catch (e) {
        }
    }
    return parsedValue;
}
exports.parseCSS = parseCSS;
function checkUnicode(value, isDevTools = false) {
    return Object.prototype.hasOwnProperty.call(constants_1.UNICODE_CHARACTERS, value)
        ? isDevTools ? [value] : [constants_1.UNICODE_CHARACTERS[value]]
        : new grapheme_splitter_1.default().splitGraphemes(value);
}
exports.checkUnicode = checkUnicode;
function fetchElementByJSFunction(selector, scope) {
    if (!scope.elementId) {
        return scope.execute(selector);
    }
    const script = (function (elem) {
        return selector.call(elem);
    }).toString().replace('selector', `(${selector.toString()})`);
    return getBrowserObject(scope).execute(`return (${script}).apply(null, arguments)`, scope);
}
async function findElement(selector) {
    if (typeof selector === 'string' || lodash_isplainobject_1.default(selector)) {
        const { using, value } = findStrategy_1.findStrategy(selector, this.isW3C, this.isMobile);
        return this.elementId
            ? this.findElementFromElement(this.elementId, using, value)
            : this.findElement(using, value);
    }
    if (typeof selector === 'function') {
        const notFoundError = new Error(`Function selector "${selector.toString()}" did not return an HTMLElement`);
        let elem = await fetchElementByJSFunction(selector, this);
        elem = Array.isArray(elem) ? elem[0] : elem;
        return exports.getElementFromResponse(elem) ? elem : notFoundError;
    }
    throw new Error(INVALID_SELECTOR_ERROR);
}
exports.findElement = findElement;
async function findElements(selector) {
    if (typeof selector === 'string' || lodash_isplainobject_1.default(selector)) {
        const { using, value } = findStrategy_1.findStrategy(selector, this.isW3C, this.isMobile);
        return this.elementId
            ? this.findElementsFromElement(this.elementId, using, value)
            : this.findElements(using, value);
    }
    if (typeof selector === 'function') {
        const elems = await fetchElementByJSFunction(selector, this);
        const elemArray = Array.isArray(elems) ? elems : [elems];
        return elemArray.filter((elem) => elem && exports.getElementFromResponse(elem));
    }
    throw new Error(INVALID_SELECTOR_ERROR);
}
exports.findElements = findElements;
function verifyArgsAndStripIfElement(args) {
    function verify(arg) {
        if (lodash_isobject_1.default(arg) && arg.constructor.name === 'Element') {
            const elem = arg;
            if (!elem.elementId) {
                throw new Error(`The element with selector "${elem.selector}" you trying to pass into the execute method wasn't found`);
            }
            return {
                [constants_1.ELEMENT_KEY]: elem.elementId,
                ELEMENT: elem.elementId
            };
        }
        return arg;
    }
    return !Array.isArray(args) ? verify(args) : args.map(verify);
}
exports.verifyArgsAndStripIfElement = verifyArgsAndStripIfElement;
async function getElementRect(scope) {
    const rect = await scope.getElementRect(scope.elementId);
    let defaults = { x: 0, y: 0, width: 0, height: 0 };
    if (Object.keys(defaults).some((key) => rect[key] == null)) {
        const rectJs = await getBrowserObject(scope).execute(function (el) {
            if (!el || !el.getBoundingClientRect) {
                return;
            }
            const { left, top, width, height } = el.getBoundingClientRect();
            return {
                x: left + this.scrollX,
                y: top + this.scrollY,
                width,
                height
            };
        }, scope);
        Object.keys(defaults).forEach((key) => {
            if (rect[key] != null) {
                return;
            }
            if (rectJs && typeof rectJs[key] === 'number') {
                rect[key] = Math.floor(rectJs[key]);
            }
            else {
                log.error('getElementRect', { rect, rectJs, key });
                throw new Error('Failed to receive element rects via execute command');
            }
        });
    }
    return rect;
}
exports.getElementRect = getElementRect;
function getAbsoluteFilepath(filepath) {
    return filepath.startsWith('/') || filepath.startsWith('\\') || filepath.match(/^[a-zA-Z]:\\/)
        ? filepath
        : path_1.default.join(process.cwd(), filepath);
}
exports.getAbsoluteFilepath = getAbsoluteFilepath;
function assertDirectoryExists(filepath) {
    if (!fs_1.default.existsSync(path_1.default.dirname(filepath))) {
        throw new Error(`directory (${path_1.default.dirname(filepath)}) doesn't exist`);
    }
}
exports.assertDirectoryExists = assertDirectoryExists;
function validateUrl(url, origError) {
    try {
        const urlObject = new url_1.URL(url);
        return urlObject.href;
    }
    catch (e) {
        if (origError) {
            throw origError;
        }
        return validateUrl(`http://${url}`, e);
    }
}
exports.validateUrl = validateUrl;
function getScrollPosition(scope) {
    return getBrowserObject(scope)
        .execute(function () {
        return { scrollX: this.pageXOffset, scrollY: this.pageYOffset };
    });
}
exports.getScrollPosition = getScrollPosition;
async function hasElementId(element) {
    if (!element.elementId) {
        const command = element.isReactElement
            ? element.parent.react$.bind(element.parent)
            : element.parent.$.bind(element.parent);
        element.elementId = (await command(element.selector)).elementId;
    }
    if (!element.elementId) {
        return false;
    }
    return true;
}
exports.hasElementId = hasElementId;
function addLocatorStrategyHandler(scope) {
    return (name, func) => {
        if (scope.strategies.get(name)) {
            throw new Error(`Strategy ${name} already exists`);
        }
        scope.strategies.set(name, func);
    };
}
exports.addLocatorStrategyHandler = addLocatorStrategyHandler;
exports.enhanceElementsArray = (elements, parent, selector, foundWith = '$$', props = []) => {
    elements.parent = parent;
    elements.selector = selector;
    elements.foundWith = foundWith;
    elements.props = props;
    return elements;
};
exports.isStub = (automationProtocol) => automationProtocol === './protocol-stub';
exports.getAutomationProtocol = async (config) => {
    var _a;
    if (config.automationProtocol) {
        return config.automationProtocol;
    }
    if (config.hostname || config.port || config.path || (config.user && config.key)) {
        return 'webdriver';
    }
    if (config.capabilities &&
        typeof config.capabilities.browserName === 'string' &&
        !devtools_1.SUPPORTED_BROWSER.includes((_a = config.capabilities.browserName) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
        return 'webdriver';
    }
    if (config.capabilities && config.capabilities.alwaysMatch) {
        return 'webdriver';
    }
    const resp = await new Promise((resolve) => {
        const req = http_1.default.request(constants_1.DRIVER_DEFAULT_ENDPOINT, resolve);
        req.on('error', (error) => resolve({ error }));
        req.end();
    });
    const driverEndpointHeaders = resp;
    if (driverEndpointHeaders.req && driverEndpointHeaders.req.agent) {
        driverEndpointHeaders.req.agent.destroy();
    }
    if (driverEndpointHeaders && driverEndpointHeaders.statusCode === 200) {
        return 'webdriver';
    }
    return 'devtools';
};
exports.updateCapabilities = async (params, automationProtocol) => {
    const caps = params.capabilities;
    if (automationProtocol === 'webdriver' && caps.browserName === 'firefox') {
        if (!caps['moz:firefoxOptions']) {
            caps['moz:firefoxOptions'] = {};
        }
        if (!caps['moz:firefoxOptions'].args) {
            caps['moz:firefoxOptions'].args = [];
        }
        if (!caps['moz:firefoxOptions'].args.includes(constants_1.FF_REMOTE_DEBUG_ARG)) {
            caps['moz:firefoxOptions'].args.push(constants_1.FF_REMOTE_DEBUG_ARG, (await get_port_1.default()).toString());
        }
    }
};
exports.containsHeaderObject = (base, match) => {
    for (const [key, value] of Object.entries(match)) {
        if (typeof base[key] === 'undefined' || base[key] !== value) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUN2QixnREFBdUI7QUFDdkIsMERBQWdDO0FBQ2hDLHNEQUE2QjtBQUM3Qix3REFBOEI7QUFDOUIsMEVBQWdEO0FBQ2hELDBEQUFpQztBQUNqQyxzRUFBc0M7QUFDdEMsZ0ZBQWdEO0FBQ2hELDZCQUF5QjtBQUN6Qix1Q0FBNEM7QUFJNUMsNENBQTRHO0FBQzVHLGlEQUE2QztBQUc3QyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUE7QUFDOUQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFBO0FBRTlELE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDakMsTUFBTSxzQkFBc0IsR0FBRyxvREFBb0QsQ0FBQTtBQUVuRixNQUFNLE1BQU0sR0FBRztJQUNYLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLE9BQU8sRUFBRSxlQUFlO0NBQzNCLENBQUE7QUFFRCxNQUFNLG1CQUFtQixHQUFHLENBQ3hCLFNBQTZDLEVBQzdDLEtBQTRCLEVBQUUsRUFBRTtJQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUU7UUFDN0QsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFBO0lBQy9DLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBS1ksUUFBQSxZQUFZLEdBQUcsQ0FBQyxLQUE0QixFQUFFLEVBQUU7SUFDekQsTUFBTSxTQUFTLEdBQXVDO1FBSWxELFNBQVMs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