"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchDebug = exports.findByWhich = exports.uniq = exports.sort = exports.getPages = exports.getStaleElementError = exports.transformExecuteResult = exports.transformExecuteArgs = exports.sanitizeError = exports.findElements = exports.findElement = exports.getPrototype = exports.validate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const protocols_1 = require("@wdio/protocols");
const cleanUpSerializationSelector_1 = __importDefault(require("./scripts/cleanUpSerializationSelector"));
const constants_1 = require("./constants");
const log = logger_1.default('devtools');
exports.validate = function (command, parameters, variables, ref, args) {
    const commandParams = [...variables.map((v) => Object.assign(v, {
            required: true,
            type: 'string'
        })), ...parameters];
    const commandUsage = `${command}(${commandParams.map((p) => p.name).join(', ')})`;
    const moreInfo = `\n\nFor more info see ${ref}\n`;
    const body = {};
    const minAllowedParams = commandParams.filter((param) => param.required).length;
    if (args.length < minAllowedParams || args.length > commandParams.length) {
        const parameterDescription = commandParams.length
            ? `\n\nProperty Description:\n${commandParams.map((p) => `  "${p.name}" (${p.type}): ${p.description}`).join('\n')}`
            : '';
        throw new Error(`Wrong parameters applied for ${command}\n` +
            `Usage: ${commandUsage}` +
            parameterDescription +
            moreInfo);
    }
    for (const [i, arg] of Object.entries(args)) {
        const commandParam = commandParams[parseInt(i, 10)];
        if (!utils_1.isValidParameter(arg, commandParam.type)) {
            if (typeof arg === 'undefined' && !commandParam.required) {
                continue;
            }
            throw new Error(`Malformed type for "${commandParam.name}" parameter of command ${command}\n` +
                `Expected: ${commandParam.type}\n` +
                `Actual: ${utils_1.getArgumentType(arg)}` +
                moreInfo);
        }
        body[commandParams[parseInt(i, 10)].name] = arg;
    }
    log.info('COMMAND', utils_1.commandCallStructure(command, args));
    return body;
};
function getPrototype(commandWrapper) {
    const prototype = {};
    for (const [endpoint, methods] of Object.entries(protocols_1.WebDriverProtocol)) {
        for (const [method, commandData] of Object.entries(methods)) {
            prototype[commandData.command] = { value: commandWrapper(method, endpoint, commandData) };
        }
    }
    return prototype;
}
exports.getPrototype = getPrototype;
async function findElement(context, using, value) {
    const implicitTimeout = this.timeouts.get('implicit');
    const waitForFn = using === 'xpath' ? context.waitForXPath : context.waitForSelector;
    if (implicitTimeout && waitForFn) {
        await waitForFn.call(context, value, { timeout: implicitTimeout });
    }
    let element;
    try {
        element = using === 'xpath'
            ? (await context.$x(value))[0]
            : await context.$(value);
    }
    catch (err) {
        if (!err.message.includes('failed to find element')) {
            throw err;
        }
    }
    if (!element) {
        return new Error(`Element with selector "${value}" not found`);
    }
    const elementId = this.elementStore.set(element);
    return { [constants_1.ELEMENT_KEY]: elementId };
}
exports.findElement = findElement;
async function findElements(context, using, value) {
    const implicitTimeout = this.timeouts.get('implicit');
    const waitForFn = using === 'xpath' ? context.waitForXPath : context.waitForSelector;
    if (implicitTimeout && waitForFn) {
        await waitForFn.call(context, value, { timeout: implicitTimeout });
    }
    const elements = using === 'xpath'
        ? await context.$x(value)
        : await context.$$(value);
    if (elements.length === 0) {
        return [];
    }
    return elements.map((element) => ({
        [constants_1.ELEMENT_KEY]: this.elementStore.set(element)
    }));
}
exports.findElements = findElements;
function sanitizeError(err) {
    let errorMessage = err.message;
    if (err.message.includes('Node is detached from document')) {
        err.name = constants_1.ERROR_MESSAGES.staleElement.name;
        errorMessage = constants_1.ERROR_MESSAGES.staleElement.message;
    }
    const stack = err.stack ? err.stack.split('\n') : [];
    const asyncStack = stack.lastIndexOf('  -- ASYNC --');
    err.stack = errorMessage + '\n' + stack.slice(asyncStack + 1)
        .filter((line) => !line.includes('devtools/node_modules/puppeteer-core'))
        .join('\n');
    return err;
}
exports.sanitizeError = sanitizeError;
async function transformExecuteArgs(args = []) {
    return Promise.all(args.map(async (arg) => {
        if (arg[constants_1.ELEMENT_KEY]) {
            const elementHandle = await this.elementStore.get(arg[constants_1.ELEMENT_KEY]);
            if (!elementHandle) {
                throw getStaleElementError(arg[constants_1.ELEMENT_KEY]);
            }
            arg = elementHandle;
        }
        return arg;
    }));
}
exports.transformExecuteArgs = transformExecuteArgs;
async function transformExecuteResult(page, result) {
    const isResultArray = Array.isArray(result);
    let tmpResult = isResultArray ? result : [result];
    if (tmpResult.find((r) => typeof r === 'string' && r.startsWith(constants_1.SERIALIZE_FLAG))) {
        tmpResult = await Promise.all(tmpResult.map(async (r) => {
            if (typeof r === 'string' && r.startsWith(constants_1.SERIALIZE_FLAG)) {
                return findElement.call(this, page, 'css selector', `[${constants_1.SERIALIZE_PROPERTY}="${r}"]`);
            }
            return result;
        }));
        await page.$$eval(`[${constants_1.SERIALIZE_PROPERTY}]`, cleanUpSerializationSelector_1.default, constants_1.SERIALIZE_PROPERTY);
    }
    return isResultArray ? tmpResult : tmpResult[0];
}
exports.transformExecuteResult = transformExecuteResult;
function getStaleElementError(elementId) {
    const error = new Error(`stale element reference: The element with reference ${elementId} is stale; either the ` +
        'element is no longer attached to the DOM, it is not in the current frame context, or the ' +
        'document has been refreshed');
    error.name = 'stale element reference';
    return error;
}
exports.getStaleElementError = getStaleElementError;
async function getPages(browser, retryInterval = 100) {
    const pages = await browser.pages();
    if (pages.length === 0) {
        log.info('no browser pages found, retrying...');
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
        return getPages(browser);
    }
    return pages;
}
exports.getPages = getPages;
function sort(installations, priorities) {
    const defaultPriority = 10;
    return installations
        .map((inst) => {
        for (const pair of priorities) {
            if (pair.regex.test(inst)) {
                return { path: inst, weight: pair.weight };
            }
        }
        return { path: inst, weight: defaultPriority };
    })
        .sort((a, b) => (b.weight - a.weight))
        .map(pair => pair.path);
}
exports.sort = sort;
function uniq(arr) {
    return Array.from(new Set(arr));
}
exports.uniq = uniq;
function findByWhich(executables, priorities) {
    const installations = [];
    executables.forEach((executable) => {
        try {
            const browserPath = child_process_1.execFileSync('which', [executable], { stdio: 'pipe' }).toString().split(/\r?\n/)[0];
            if (utils_1.canAccess(browserPath)) {
                installations.push(browserPath);
            }
        }
        catch (e) {
        }
    });
    return sort(uniq(installations.filter(Boolean)), priorities);
}
exports.findByWhich = findByWhich;
function patchDebug(scoppedLogger) {
    let puppeteerDebugPkg = path_1.default.resolve(path_1.default.dirname(require.resolve('puppeteer-core')), 'node_modules', 'debug');
    if (!fs_1.default.existsSync(puppeteerDebugPkg)) {
        const pkgName = 'debug';
        puppeteerDebugPkg = require.resolve(pkgName);
    }
    require(puppeteerDebugPkg).log = (msg) => {
        if (msg.includes('puppeteer:protocol')) {
            msg = msg.slice(msg.indexOf(constants_1.PPTR_LOG_PREFIX) + constants_1.PPTR_LOG_PREFIX.length).trim();
        }
        scoppedLogger.debug(msg);
    };
}
exports.patchDebug = patchDebug;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUN2QixpREFBNEM7QUFDNUMsMERBQWlDO0FBQ2pDLHVDQUFnRztBQUNoRywrQ0FBOEc7QUFPOUcsMEdBQTREO0FBQzVELDJDQUE4RztBQUk5RyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBRWpCLFFBQUEsUUFBUSxHQUFHLFVBQ3BCLE9BQWUsRUFDZixVQUErQixFQUMvQixTQUFpQyxFQUNqQyxHQUFXLEVBQ1gsSUFBVztJQUVYLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtZQUk1RCxRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxRQUFRO1NBQ2pCLENBQUMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUE7SUFFbkIsTUFBTSxZQUFZLEdBQUcsR0FBRyxPQUFPLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBO0lBQ2pGLE1BQU0sUUFBUSxHQUFHLHlCQUF5QixHQUFHLElBQUksQ0FBQTtJQUNqRCxNQUFNLElBQUksR0FBd0IsRUFBRSxDQUFBO0lBS3BDLE1BQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUMvRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFh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