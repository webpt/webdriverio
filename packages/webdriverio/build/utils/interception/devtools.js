"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const atob_1 = __importDefault(require("atob"));
const minimatch_1 = __importDefault(require("minimatch"));
const logger_1 = __importDefault(require("@wdio/logger"));
const _1 = __importDefault(require("."));
const __1 = require("..");
const constants_1 = require("../../constants");
const log = logger_1.default('webdriverio');
class DevtoolsInterception extends _1.default {
    static handleRequestInterception(client, mocks) {
        return async (event) => {
            const isRequest = !event.responseHeaders;
            const eventResponseHeaders = event.responseHeaders || [];
            const responseHeaders = eventResponseHeaders.reduce((headers, { name, value }) => {
                headers[name] = value;
                return headers;
            }, {});
            const { requestId, request, responseStatusCode = 200 } = event;
            for (const mock of mocks) {
                if (isRequest && (mock.respondOverwrites.length === 0 ||
                    (!mock.respondOverwrites[0].errorReason &&
                        mock.respondOverwrites[0].params &&
                        mock.respondOverwrites[0].params.fetchResponse !== false))) {
                    continue;
                }
                if (!minimatch_1.default(request.url, mock.url)) {
                    continue;
                }
                request.statusCode = responseStatusCode;
                request.responseHeaders = { ...responseHeaders };
                if (filterMethod(request.method, mock.filterOptions.method) ||
                    filterHeaders(request.headers, mock.filterOptions.requestHeaders) ||
                    filterHeaders(responseHeaders, mock.filterOptions.headers) ||
                    filterRequest(request.postData, mock.filterOptions.postData) ||
                    filterStatusCode(responseStatusCode, mock.filterOptions.statusCode)) {
                    continue;
                }
                const { body, base64Encoded = undefined } = isRequest ? { body: '' } : await client.send('Fetch.getResponseBody', { requestId }).catch(() => ({}));
                request.body = base64Encoded ? atob_1.default(body) : body;
                const contentTypeHeader = Object.keys(responseHeaders).find(h => h.toLowerCase() === 'content-type') || '';
                const responseContentType = responseHeaders[contentTypeHeader];
                request.body = responseContentType && responseContentType.includes('application/json')
                    ? tryParseJson(request.body)
                    : request.body;
                mock.matches.push(request);
                if (mock.respondOverwrites.length === 0) {
                    continue;
                }
                const { errorReason, overwrite, params = {} } = mock.respondOverwrites[0].sticky
                    ? mock.respondOverwrites[0]
                    : mock.respondOverwrites.shift() || {};
                if (overwrite !== undefined) {
                    let newBody = overwrite;
                    if (typeof overwrite === 'function') {
                        newBody = await overwrite(request, client);
                    }
                    const isBodyUndefined = typeof newBody === 'undefined';
                    if (isBodyUndefined) {
                        newBody = '';
                    }
                    if (typeof newBody !== 'string') {
                        newBody = JSON.stringify(newBody);
                    }
                    let responseCode = typeof params.statusCode === 'function' ? params.statusCode(request) : params.statusCode || responseStatusCode;
                    let responseHeaders = [
                        ...eventResponseHeaders,
                        ...Object.entries(typeof params.headers === 'function' ? params.headers(request) : params.headers || {}).map(([name, value]) => ({ name, value }))
                    ];
                    const responseFilePath = path_1.default.isAbsolute(newBody) ? newBody : path_1.default.join(process.cwd(), newBody);
                    if (newBody.length > 0 && await fs_extra_1.default.pathExists(responseFilePath) && await canAccess(responseFilePath)) {
                        newBody = await fs_extra_1.default.readFile(responseFilePath);
                    }
                    else if (newBody.startsWith('http')) {
                        responseCode = 301;
                        responseHeaders = responseHeaders.filter(({ name }) => name.toLowerCase() !== 'location');
                        responseHeaders.push({ name: 'Location', value: newBody });
                    }
                    request.mockedResponse = newBody;
                    return client.send('Fetch.fulfillRequest', {
                        requestId,
                        responseCode,
                        responseHeaders,
                        body: isBodyUndefined ? undefined : (newBody instanceof Buffer ? newBody : Buffer.from(newBody, 'utf8')).toString('base64')
                    }).catch(logFetchError);
                }
                if (errorReason) {
                    return client.send('Fetch.failRequest', {
                        requestId,
                        errorReason
                    }).catch(logFetchError);
                }
            }
            return client.send('Fetch.continueRequest', { requestId }).catch(logFetchError);
        };
    }
    get calls() {
        return this.matches;
    }
    clear() {
        this.matches = [];
    }
    restore() {
        this.clear();
        this.respondOverwrites = [];
    }
    respond(overwrite, params = {}) {
        this.respondOverwrites.push({ overwrite, params, sticky: true });
    }
    respondOnce(overwrite, params = {}) {
        this.respondOverwrites.push({ overwrite, params });
    }
    abort(errorReason, sticky = true) {
        if (typeof errorReason !== 'string' || !constants_1.ERROR_REASON.includes(errorReason)) {
            throw new Error(`Invalid value for errorReason, allowed are: ${constants_1.ERROR_REASON.join(', ')}`);
        }
        this.respondOverwrites.push({ errorReason, sticky });
    }
    abortOnce(errorReason) {
        this.abort(errorReason, false);
    }
}
exports.default = DevtoolsInterception;
const filterMethod = (method, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(method) !== true;
    }
    return expected.toLowerCase() !== method.toLowerCase();
};
const filterHeaders = (responseHeaders, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(responseHeaders) !== true;
    }
    return !__1.containsHeaderObject(responseHeaders, expected);
};
const filterRequest = (postData, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(postData) !== true;
    }
    return postData !== expected;
};
const filterStatusCode = (statusCode, expected) => {
    if (typeof expected === 'undefined') {
        return false;
    }
    if (typeof expected === 'function') {
        return expected(statusCode) !== true;
    }
    return statusCode !== expected;
};
const canAccess = async (filepath) => {
    try {
        await fs_extra_1.default.access(filepath);
        return true;
    }
    catch {
        return false;
    }
};
const tryParseJson = (body) => {
    try {
        return JSON.parse(body) || body;
    }
    catch {
        return body;
    }
};
const logFetchError = (err) => {
    log.debug(err === null || err === void 0 ? void 0 : err.message);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2dG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvaW50ZXJjZXB0aW9uL2RldnRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTBCO0FBQzFCLGdEQUF1QjtBQUN2QixnREFBdUI7QUFDdkIsMERBQWlDO0FBSWpDLDBEQUFpQztBQUNqQyx5Q0FBNEI7QUFFNUIsMEJBQXlDO0FBQ3pDLCtDQUE4QztBQUU5QyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBcUJqQyxNQUFxQixvQkFBcUIsU0FBUSxVQUFZO0lBQzFELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBRSxNQUFrQixFQUFFLEtBQXdCO1FBQzFFLE9BQU8sS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBR25CLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQTtZQUN4QyxNQUFNLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFBO1lBQ3hELE1BQU0sZUFBZSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO2dCQUM3RSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFBO2dCQUNyQixPQUFPLE9BQU8sQ0FBQTtZQUNsQixDQUFDLEVBQUUsRUFBNEIsQ0FBQyxDQUFBO1lBQ2hDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQTtZQUU5RCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFJdEIsSUFBSSxTQUFTLElBQUksQ0FDYixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FB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