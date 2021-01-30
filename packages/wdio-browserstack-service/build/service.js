"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const got_1 = __importDefault(require("got"));
const util_1 = require("./util");
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/browserstack-service');
class BrowserstackService {
    constructor(_options, _caps, _config) {
        this._options = _options;
        this._caps = _caps;
        this._config = _config;
        this._sessionBaseUrl = 'https://api.browserstack.com/automate/sessions';
        this._failReasons = [];
        this._scenariosThatRan = [];
        this._failureStatuses = ['failed', 'ambiguous', 'undefined', 'unknown'];
        const strict = Boolean(this._config.cucumberOpts && this._config.cucumberOpts.strict);
        if (strict) {
            this._failureStatuses.push('pending');
        }
    }
    _updateCaps(fn) {
        const multiRemoteCap = this._caps;
        if (multiRemoteCap.capabilities) {
            return Object.entries(multiRemoteCap).forEach(([, caps]) => fn(caps.capabilities));
        }
        return fn(this._caps);
    }
    beforeSession(config) {
        if (!config.user) {
            config.user = 'NotSetUser';
        }
        if (!config.key) {
            config.key = 'NotSetKey';
        }
        this._config.user = config.user;
        this._config.key = config.key;
    }
    before(caps, specs, browser) {
        this._browser = browser;
        if (this._browser.capabilities.app || this._caps.app) {
            this._sessionBaseUrl = 'https://api-cloud.browserstack.com/app-automate/sessions';
        }
        this._scenariosThatRan = [];
        return this._printSessionURL();
    }
    beforeSuite(suite) {
        this._fullTitle = suite.title;
        return this._updateJob({ name: this._fullTitle });
    }
    beforeFeature(uri, feature) {
        this._fullTitle = feature.name;
        return this._updateJob({ name: this._fullTitle });
    }
    afterTest(test, context, results) {
        const { error, passed } = results;
        this._fullTitle = (test.fullName ||
            `${test.parent} - ${test.title}`);
        if (!passed) {
            this._failReasons.push((error && error.message) || 'Unknown Error');
        }
    }
    after(result) {
        if (this._options.preferScenarioName && this._scenariosThatRan.length === 1) {
            this._fullTitle = this._scenariosThatRan.pop();
        }
        const hasReasons = Boolean(this._failReasons.filter(Boolean).length);
        return this._updateJob({
            status: result === 0 ? 'passed' : 'failed',
            name: this._fullTitle,
            reason: hasReasons ? this._failReasons.join('\n') : undefined
        });
    }
    afterScenario(world) {
        var _a;
        const status = constants_1.CUCUMBER_STATUS_MAP[((_a = world.result) === null || _a === void 0 ? void 0 : _a.status) || 0].toLowerCase();
        if (status === 'skipped') {
            this._scenariosThatRan.push(world.pickle.name || 'unknown pickle name');
        }
        if (this._failureStatuses.includes(status)) {
            const exception = ((world.result && world.result.message) ||
                (status === 'pending'
                    ? `Some steps/hooks are pending for scenario "${world.pickle.name}"`
                    : 'Unknown Error'));
            this._failReasons.push(exception);
        }
    }
    async onReload(oldSessionId, newSessionId) {
        if (!this._browser) {
            return Promise.resolve();
        }
        const hasReasons = Boolean(this._failReasons.filter(Boolean).length);
        let status = hasReasons ? 'failed' : 'passed';
        if (!this._browser.isMultiremote) {
            log.info(`Update (reloaded) job with sessionId ${oldSessionId}, ${status}`);
        }
        else {
            const browserName = this._browser.instances.filter((browserName) => this._browser && this._browser[browserName].sessionId === newSessionId)[0];
            log.info(`Update (reloaded) multiremote job for browser "${browserName}" and sessionId ${oldSessionId}, ${status}`);
        }
        await this._update(oldSessionId, {
            name: this._fullTitle,
            status,
            reason: hasReasons ? this._failReasons.join('\n') : undefined
        });
        this._scenariosThatRan = [];
        delete this._fullTitle;
        this._failReasons = [];
        await this._printSessionURL();
    }
    _updateJob(requestBody) {
        return this._multiRemoteAction((sessionId, browserName) => {
            log.info(browserName
                ? `Update multiremote job for browser "${browserName}" and sessionId ${sessionId}`
                : `Update job with sessionId ${sessionId}`);
            return this._update(sessionId, requestBody);
        });
    }
    _multiRemoteAction(action) {
        const { _browser } = this;
        if (!_browser) {
            return Promise.resolve();
        }
        if (!_browser.isMultiremote) {
            return action(_browser.sessionId);
        }
        return Promise.all(_browser.instances
            .filter(browserName => {
            const cap = util_1.getBrowserCapabilities(_browser, this._caps, browserName);
            return util_1.isBrowserstackCapability(cap);
        })
            .map((browserName) => (action(_browser[browserName].sessionId, browserName))));
    }
    _update(sessionId, requestBody) {
        const sessionUrl = `${this._sessionBaseUrl}/${sessionId}.json`;
        log.debug(`Updating Browserstack session at ${sessionUrl} with request body: `, requestBody);
        return got_1.default.put(sessionUrl, {
            json: requestBody,
            username: this._config.user,
            password: this._config.key
        });
    }
    async _printSessionURL() {
        if (!this._browser) {
            return Promise.resolve();
        }
        await this._multiRemoteAction(async (sessionId, browserName) => {
            const sessionUrl = `${this._sessionBaseUrl}/${sessionId}.json`;
            log.debug(`Requesting Browserstack session URL at ${sessionUrl}`);
            const response = await got_1.default(sessionUrl, {
                username: this._config.user,
                password: this._config.key,
                responseType: 'json'
            });
            if (!this._browser) {
                return;
            }
            const capabilities = util_1.getBrowserCapabilities(this._browser, this._caps, browserName);
            const browserString = util_1.getBrowserDescription(capabilities);
            log.info(`${browserString} session: ${response.body.automation_session.browser_url}`);
        });
    }
}
exports.default = BrowserstackService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQWlDO0FBQ2pDLDhDQUFxQjtBQUlyQixpQ0FBZ0c7QUFFaEcsMkNBQWlEO0FBRWpELE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtBQUVoRCxNQUFxQixtQkFBbUI7SUFRcEMsWUFDWSxRQUE0QixFQUM1QixLQUFvQyxFQUNwQyxPQUEyQjtRQUYzQixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUM1QixVQUFLLEdBQUwsS0FBSyxDQUErQjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVYvQixvQkFBZSxHQUFHLGdEQUFnRCxDQUFBO1FBQ2xFLGlCQUFZLEdBQWEsRUFBRSxDQUFBO1FBQzNCLHNCQUFpQixHQUFhLEVBQUUsQ0FBQTtRQUNoQyxxQkFBZ0IsR0FBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBVWhGLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVyRixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDeEM7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFFLEVBQWdGO1FBQ3pGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUE2QyxDQUFBO1FBRXpFLElBQUksY0FBYyxDQUFDLFlBQVksRUFBRTtZQUM3QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFB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