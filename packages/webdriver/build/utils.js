"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionError = exports.getEnvironmentVars = exports.CustomRequestError = exports.getErrorFromResponseBody = exports.getPrototype = exports.isSuccessfulResponse = exports.startWebDriverSession = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const logger_1 = __importDefault(require("@wdio/logger"));
const protocols_1 = require("@wdio/protocols");
const request_1 = __importDefault(require("./request"));
const command_1 = __importDefault(require("./command"));
const constants_1 = require("./constants");
const log = logger_1.default('webdriver');
const BROWSER_DRIVER_ERRORS = [
    'unknown command: wd/hub/session',
    'HTTP method not allowed',
    "'POST /wd/hub/session' was not found.",
    'Command not found'
];
async function startWebDriverSession(params) {
    if (params.capabilities) {
        const extensionCaps = Object.keys(params.capabilities).filter((cap) => cap.includes(':'));
        const invalidWebDriverCaps = Object.keys(params.capabilities)
            .filter((cap) => !constants_1.VALID_CAPS.includes(cap) && !cap.includes(':'));
        if (extensionCaps.length && invalidWebDriverCaps.length) {
            throw new Error(`Invalid or unsupported WebDriver capabilities found ("${invalidWebDriverCaps.join('", "')}"). ` +
                'Ensure to only use valid W3C WebDriver capabilities (see https://w3c.github.io/webdriver/#capabilities).');
        }
    }
    const [w3cCaps, jsonwpCaps] = params.capabilities && params.capabilities.alwaysMatch
        ? [params.capabilities, params.capabilities.alwaysMatch]
        : [{ alwaysMatch: params.capabilities, firstMatch: [{}] }, params.capabilities];
    const sessionRequest = new request_1.default('POST', '/session', {
        capabilities: w3cCaps,
        desiredCapabilities: jsonwpCaps
    });
    let response;
    try {
        response = await sessionRequest.makeRequest(params);
    }
    catch (err) {
        log.error(err);
        const message = exports.getSessionError(err, params);
        throw new Error('Failed to create session.\n' + message);
    }
    const sessionId = response.value.sessionId || response.sessionId;
    params.capabilities = response.value.capabilities || response.value;
    return { sessionId, capabilities: params.capabilities };
}
exports.startWebDriverSession = startWebDriverSession;
function isSuccessfulResponse(statusCode, body) {
    if (!body || typeof body.value === 'undefined') {
        log.debug('request failed due to missing body');
        return false;
    }
    if (body.status === 7 && body.value && body.value.message &&
        (body.value.message.toLowerCase().startsWith('no such element') ||
            body.value.message === 'An element could not be located on the page using the given search parameters.' ||
            body.value.message.toLowerCase().startsWith('unable to find element'))) {
        return true;
    }
    if (body.status && body.status !== 0) {
        log.debug(`request failed due to status ${body.status}`);
        return false;
    }
    const hasErrorResponse = body.value && (body.value.error || body.value.stackTrace || body.value.stacktrace);
    if (statusCode === 200 && !hasErrorResponse) {
        return true;
    }
    if (statusCode === 404 && body.value && body.value.error === 'no such element') {
        return true;
    }
    if (hasErrorResponse) {
        log.debug('request failed due to response error:', body.value.error);
        return false;
    }
    return true;
}
exports.isSuccessfulResponse = isSuccessfulResponse;
function getPrototype({ isW3C, isChrome, isMobile, isSauce, isSeleniumStandalone }) {
    const prototype = {};
    const ProtocolCommands = lodash_merge_1.default(isMobile
        ? lodash_merge_1.default({}, protocols_1.JsonWProtocol, protocols_1.WebDriverProtocol)
        : isW3C ? protocols_1.WebDriverProtocol : protocols_1.JsonWProtocol, isMobile ? lodash_merge_1.default({}, protocols_1.MJsonWProtocol, protocols_1.AppiumProtocol) : {}, isChrome ? protocols_1.ChromiumProtocol : {}, isSauce ? protocols_1.SauceLabsProtocol : {}, isSeleniumStandalone ? protocols_1.SeleniumProtocol : {});
    for (const [endpoint, methods] of Object.entries(ProtocolCommands)) {
        for (const [method, commandData] of Object.entries(methods)) {
            prototype[commandData.command] = { value: command_1.default(method, endpoint, commandData, isSeleniumStandalone) };
        }
    }
    return prototype;
}
exports.getPrototype = getPrototype;
function getErrorFromResponseBody(body) {
    if (!body) {
        return new Error('Response has empty body');
    }
    if (typeof body === 'string' && body.length) {
        return new Error(body);
    }
    if (typeof body !== 'object' || (!body.value && !body.error)) {
        return new Error('unknown error');
    }
    return new CustomRequestError(body);
}
exports.getErrorFromResponseBody = getErrorFromResponseBody;
class CustomRequestError extends Error {
    constructor(body) {
        const errorObj = body.value || body;
        super(errorObj.message || errorObj.class || 'unknown error');
        if (errorObj.error) {
            this.name = errorObj.error;
        }
        else if (errorObj.message && errorObj.message.includes('stale element reference')) {
            this.name = 'stale element reference';
        }
    }
}
exports.CustomRequestError = CustomRequestError;
function getEnvironmentVars({ isW3C, isMobile, isIOS, isAndroid, isChrome, isSauce, isSeleniumStandalone }) {
    return {
        isW3C: { value: isW3C },
        isMobile: { value: isMobile },
        isIOS: { value: isIOS },
        isAndroid: { value: isAndroid },
        isChrome: { value: isChrome },
        isSauce: { value: isSauce },
        isSeleniumStandalone: { value: isSeleniumStandalone }
    };
}
exports.getEnvironmentVars = getEnvironmentVars;
exports.getSessionError = (err, params = {}) => {
    if (err.code === 'ECONNREFUSED') {
        return `Unable to connect to "${params.protocol}://${params.hostname}:${params.port}${params.path}", make sure browser driver is running on that address.` +
            '\nIf you use services like chromedriver see initialiseServices logs above or in wdio.log file as the service might had problems to start the driver.';
    }
    if (err.message === 'unhandled request') {
        return 'The browser driver couldn\'t start the session. Make sure you have set the "path" correctly!';
    }
    if (!err.message) {
        return 'See wdio.* logs for more information.';
    }
    if (err.message.includes('Whoops! The URL specified routes to this help page.')) {
        return "It seems you are running a Selenium Standalone server and point to a wrong path. Please set `path: '/wd/hub'` in your wdio.conf.js!";
    }
    if (BROWSER_DRIVER_ERRORS.some(m => err && err.message && err.message.includes(m))) {
        return "Make sure to set `path: '/'` in your wdio.conf.js!";
    }
    if (err.message.includes('Bad Request - Invalid Hostname') && err.message.includes('HTTP Error 400')) {
        return "Run edge driver on 127.0.0.1 instead of localhost, ex: --host=127.0.0.1, or set `hostname: 'localhost'` in your wdio.conf.js";
    }
    const w3cCapMessage = '\nMake sure to add vendor prefix like "goog:", "appium:", "moz:", etc to non W3C capabilities.' +
        '\nSee more https://www.w3.org/TR/webdriver/#capabilities';
    if (err.message.includes('Illegal key values seen in w3c capabilities')) {
        return err.message + w3cCapMessage;
    }
    if (err.message === 'Response has empty body') {
        return 'Make sure to connect to valid hostname:port or the port is not in use.' +
            '\nIf you use a grid server ' + w3cCapMessage;
    }
    return err.message;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0VBQWdDO0FBQ2hDLDBEQUFpQztBQUNqQywrQ0FHd0I7QUFJeEIsd0RBQStEO0FBQy9ELHdEQUErQjtBQUMvQiwyQ0FBd0M7QUFHeEMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUUvQixNQUFNLHFCQUFxQixHQUFHO0lBQzFCLGlDQUFpQztJQUNqQyx5QkFBeUI7SUFDekIsdUNBQXVDO0lBQ3ZDLG1CQUFtQjtDQUN0QixDQUFBO0FBS00sS0FBSyxVQUFVLHFCQUFxQixDQUFFLE1BQXlCO0lBS2xFLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtRQUNyQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN6RixNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUN4RCxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsc0JBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFPckUsSUFBSSxhQUFhLENBQUMsTUFBTSxJQUFJLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtZQUNyRCxNQUFNLElBQUksS0FBSyxDQUNYLHlEQUF5RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ2hHLDBHQUEwRyxDQUM3RyxDQUFBO1NBQ0o7S0FDSjtJQVFELE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksSUFBSyxNQUFNLENBQUMsWUFBNkMsQ0FBQyxXQUFXO1FBSWxILENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUcsTUFBTSxDQUFDLFlBQTZDLENBQUMsV0FBVyxDQUFDO1FBSTFGLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFbkYsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBZ0IsQ0FDdkMsTUFBTSxFQUNOLFVBQVUsRUFDVjtRQUNJLFlBQVksRUFBRSxPQUFPO1FBQ3JCLG1CQUFtQixFQUFFLFVBQVU7S0FDbEMsQ0FDSixDQUFBO0lBRUQsSUFBSSxRQUFRLENBQUE7SUFDWixJQUFJO1FBQ0EsUUFBUSxHQUFHLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUN0RDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNkLE1BQU0sT0FBTyxHQUFHLHVCQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLEdBQUcsT0FBTyxDQUFDLENBQUE7S0FDM0Q7SUFDRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFBO0lBS2hFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQTtJQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBZ0QsRUFBRSxDQUFBO0FBQy9GLENBQUM7QUFoRUQsc0RBZ0VDO0FBUUQsU0FBZ0Isb0JBQW9CLENBQUUsVUFBbUIsRUFBRSxJQUF3QjtJQUkvRSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDNUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO1FBQy9DLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7SUFLRCxJQUNJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1FBQ3JELENBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDO1lBRTlELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLGdGQUFnRjtZQUV2RyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FDeEUsRUFDSDtRQUNFLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7SUFNRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDeEQsT0FBTyxLQUFLLENBQUE7S0FDZjtJQUVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFLM0csSUFBSSxVQUFVLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDekMsT0FBTyxJQUFJLENBQUE7S0FDZDtJQU1ELElBQUksVUFBVSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLGlCQUFpQixFQUFFO1FBQzVFLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7SUFLRCxJQUFJLGdCQUFnQixFQUFFO1FBQ2xCLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwRSxPQUFPLEtBQUssQ0FBQTtLQUNmO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO0FBNURELG9EQTREQztBQUtELFNBQWdCLFlBQVksQ0FBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBeUI7SUFDN0csTUFBTSxTQUFTLEdBQXVDLEVBQUUsQ0FBQTtJQUN4RCxNQUFNLGdCQUFnQixHQUF1QixzQkFBSyxDQU05QyxRQUFRO1FBQ0osQ0FBQyxDQUFDLHNCQUFLLENBQUMsRUFBRSxFQUFFLHlCQUFhLEVBQUUsNkJBQWlCLENBQUM7UUFDN0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsNkJBQWlCLENBQUMsQ0FBQyxDQUFDLHlCQUFhLEVBSS9DLFFBQVEsQ0FBQyxDQUFDLENBQUMsc0JBQUssQ0FBQyxFQUFFLEVBQUUsMEJBQWMsRUFBRSwwQkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFJekQsUUFBUSxDQUFDLENBQUMsQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUloQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDZCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBS2hDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUMvQyxDQUFBO0lBRUQsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNoRSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN6RCxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLGlCQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxDQUFBO1NBQzNHO0tBQ0o7SUFFRCxPQUFPLFNBQVMsQ0FBQTtBQUNwQixDQUFDO0FBckNELG9DQXFDQztBQU9ELFNBQWdCLHdCQUF3QixDQUFFLElBQVM7SUFDL0MsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNQLE9BQU8sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtLQUM5QztJQUVELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDekMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN6QjtJQUVELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzFELE9BQU8sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7S0FDcEM7SUFFRCxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdkMsQ0FBQztBQWRELDREQWNDO0FBR0QsTUFBYSxrQkFBbUIsU0FBUSxLQUFLO0lBQ3pDLFlBQVksSUFBdUI7UUFDL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUE7UUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxlQUFlLENBQUMsQ0FBQTtRQUM1RCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO1NBQzdCO2FBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDakYsSUFBSSxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQTtTQUN4QztJQUNMLENBQUM7Q0FDSjtBQVZELGdEQVVDO0FBUUQsU0FBZ0Isa0JBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBeUI7SUFDcEksT0FBTztRQUNILEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7UUFDdkIsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUM3QixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1FBQ3ZCLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7UUFDL0IsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUM3QixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1FBQzNCLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFO0tBQ3hELENBQUE7QUFDTCxDQUFDO0FBVkQsZ0RBVUM7QUFNWSxRQUFBLGVBQWUsR0FBRyxDQUFDLEdBQXVCLEVBQUUsU0FBcUMsRUFBRSxFQUFFLEVBQUU7SUFFaEcsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtRQUM3QixPQUFPLHlCQUF5QixNQUFNLENBQUMsUUFBUSxNQUFNLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSx5REFBeUQ7WUFDdEosc0pBQXNKLENBQUE7S0FDN0o7SUFFRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssbUJBQW1CLEVBQUU7UUFDckMsT0FBTyw4RkFBOEYsQ0FBQTtLQUN4RztJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1FBQ2QsT0FBTyx1Q0FBdUMsQ0FBQTtLQUNqRDtJQUdELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMscURBQXFELENBQUMsRUFBRTtRQUM3RSxPQUFPLHFJQUFxSSxDQUFBO0tBQy9JO0lBR0QsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2hGLE9BQU8sb0RBQW9ELENBQUE7S0FDOUQ7SUFHRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdDQUFnQyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNsRyxPQUFPLDhIQUE4SCxDQUFBO0tBQ3hJO0lBRUQsTUFBTSxhQUFhLEdBQUcsZ0dBQWdHO1FBQ2xILDBEQUEwRCxDQUFBO0lBRzlELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsNkNBQTZDLENBQUMsRUFBRTtRQUNyRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFBO0tBQ3JDO0lBR0QsSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLHlCQUF5QixFQUFFO1FBQzNDLE9BQU8sd0VBQXdFO1lBQzNFLDZCQUE2QixHQUFHLGFBQWEsQ0FBQTtLQUNwRDtJQUVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQTtBQUN0QixDQUFDLENBQUEifQ==