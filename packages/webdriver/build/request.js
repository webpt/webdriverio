"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const events_1 = require("events");
const got = __importStar(require("got"));
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const utils_2 = require("./utils");
const pkg = require('../package.json');
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Connection': 'keep-alive',
    'Accept': 'application/json',
    'User-Agent': 'webdriver/' + pkg.version
};
const log = logger_1.default('webdriver');
const agents = {
    http: new http_1.default.Agent({ keepAlive: true }),
    https: new https_1.default.Agent({ keepAlive: true })
};
class WebDriverRequest extends events_1.EventEmitter {
    constructor(method, endpoint, body, isHubCommand = false) {
        super();
        this.defaultOptions = {
            retry: 0,
            followRedirect: true,
            responseType: 'json',
            throwHttpErrors: false
        };
        this.body = body;
        this.method = method;
        this.endpoint = endpoint;
        this.isHubCommand = isHubCommand;
        this.requiresSessionId = Boolean(this.endpoint.match(/:sessionId/));
    }
    makeRequest(options, sessionId) {
        let fullRequestOptions = Object.assign({
            method: this.method
        }, this.defaultOptions, this._createOptions(options, sessionId));
        if (typeof options.transformRequest === 'function') {
            fullRequestOptions = options.transformRequest(fullRequestOptions);
        }
        this.emit('request', fullRequestOptions);
        return this._request(fullRequestOptions, options.transformResponse, options.connectionRetryCount, 0);
    }
    _createOptions(options, sessionId) {
        const requestOptions = {
            https: {},
            agent: options.agent || agents,
            headers: {
                ...DEFAULT_HEADERS,
                ...(typeof options.headers === 'object' ? options.headers : {})
            },
            searchParams: typeof options.queryParams === 'object' ? options.queryParams : {},
            timeout: options.connectionRetryTimeout
        };
        if (this.body && (Object.keys(this.body).length || this.method === 'POST')) {
            const contentLength = Buffer.byteLength(JSON.stringify(this.body), 'utf8');
            requestOptions.json = this.body;
            requestOptions.headers['Content-Length'] = `${contentLength}`;
        }
        let endpoint = this.endpoint;
        if (this.requiresSessionId) {
            if (!sessionId) {
                throw new Error('A sessionId is required for this command');
            }
            endpoint = endpoint.replace(':sessionId', sessionId);
        }
        requestOptions.url = new URL(`${options.protocol}://` +
            `${options.hostname}:${options.port}` +
            (this.isHubCommand ? this.endpoint : path_1.default.join(options.path || '', endpoint)));
        if (this.endpoint === '/session' && options.user && options.key) {
            requestOptions.username = options.user;
            requestOptions.password = options.key;
        }
        requestOptions.https.rejectUnauthorized = !(options.strictSSL === false ||
            process.env.STRICT_SSL === 'false' ||
            process.env.strict_ssl === 'false');
        return requestOptions;
    }
    async _request(fullRequestOptions, transformResponse, totalRetryCount = 0, retryCount = 0) {
        log.info(`[${fullRequestOptions.method}] ${fullRequestOptions.url.href}`);
        if (fullRequestOptions.json && Object.keys(fullRequestOptions.json).length) {
            log.info('DATA', utils_1.transformCommandLogResult(fullRequestOptions.json));
        }
        const { url, ...gotOptions } = fullRequestOptions;
        let response = await got.default(url, gotOptions)
            .catch((err) => err);
        const retry = (error, msg) => {
            if (retryCount >= totalRetryCount || error.message.includes('invalid session id')) {
                log.error(`Request failed with status ${response.statusCode} due to ${error}`);
                this.emit('response', { error });
                throw error;
            }
            ++retryCount;
            this.emit('retry', { error, retryCount });
            log.warn(msg);
            log.info(`Retrying ${retryCount}/${totalRetryCount}`);
            return this._request(fullRequestOptions, transformResponse, totalRetryCount, retryCount);
        };
        if (response instanceof Error) {
            if (response.code === 'ETIMEDOUT') {
                return retry(response, 'Request timed out! Consider increasing the "connectionRetryTimeout" option.');
            }
            throw response;
        }
        if (typeof transformResponse === 'function') {
            response = transformResponse(response, fullRequestOptions);
        }
        const error = utils_2.getErrorFromResponseBody(response.body);
        if (this.isHubCommand) {
            if (typeof response.body === 'string' && response.body.startsWith('<!DOCTYPE html>')) {
                return Promise.reject(new Error('Command can only be called to a Selenium Hub'));
            }
            return { value: response.body || null };
        }
        if (utils_2.isSuccessfulResponse(response.statusCode, response.body)) {
            this.emit('response', { result: response.body });
            return response.body;
        }
        if (error.name === 'stale element reference') {
            log.warn('Request encountered a stale element - terminating request');
            this.emit('response', { error });
            throw error;
        }
        return retry(error, `Request failed with status ${response.statusCode} due to ${error.message}`);
    }
}
exports.default = WebDriverRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF1QjtBQUN2QixnREFBdUI7QUFDdkIsa0RBQXlCO0FBQ3pCLG1DQUFxQztBQUVyQyx5Q0FBMEI7QUFDMUIsMERBQWlDO0FBQ2pDLHVDQUF1RDtBQUd2RCxtQ0FBd0U7QUFFeEUsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFhdEMsTUFBTSxlQUFlLEdBQUc7SUFDcEIsY0FBYyxFQUFFLGlDQUFpQztJQUNqRCxZQUFZLEVBQUUsWUFBWTtJQUMxQixRQUFRLEVBQUUsa0JBQWtCO0lBQzVCLFlBQVksRUFBRSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU87Q0FDM0MsQ0FBQTtBQUVELE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDL0IsTUFBTSxNQUFNLEdBQUc7SUFDWCxJQUFJLEVBQUUsSUFBSSxjQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3pDLEtBQUssRUFBRSxJQUFJLGVBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDOUMsQ0FBQTtBQUVELE1BQXFCLGdCQUFpQixTQUFRLHFCQUFZO0lBYXRELFlBQWEsTUFBYyxFQUFFLFFBQWdCLEVBQUUsSUFBOEIsRUFBRSxlQUF3QixLQUFLO1FBQ3hHLEtBQUssRUFBRSxDQUFBO1FBUlgsbUJBQWMsR0FBZ0I7WUFDMUIsS0FBSyxFQUFFLENBQUM7WUFDUixjQUFjLEVBQUUsSUFBSTtZQUNwQixZQUFZLEVBQUUsTUFBTTtZQUNwQixlQUFlLEVBQUUsS0FBSztTQUN6QixDQUFBO1FBSUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxD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