"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/crossbrowsertesting-service');
const jobDataProperties = ['name', 'tags', 'public', 'build', 'extra'];
class CrossBrowserTestingService {
    constructor(_config, _capabilities) {
        this._config = _config;
        this._capabilities = _capabilities;
        this._testCnt = 0;
        this._failures = 0;
        this._cbtUsername = this._config.user;
        this._cbtAuthkey = this._config.key;
        this._isServiceEnabled = !!(this._cbtUsername && this._cbtAuthkey);
    }
    before(caps, specs, browser) {
        this._browser = browser;
    }
    beforeSuite(suite) {
        this._suiteTitle = suite.title;
    }
    beforeTest(test) {
        if (!this._isServiceEnabled) {
            return;
        }
        if (this._suiteTitle === 'Jasmine__TopLevel__Suite') {
            this._suiteTitle = test.fullName.slice(0, test.fullName.indexOf(test.title) - 1);
        }
    }
    afterSuite(suite) {
        if (Object.prototype.hasOwnProperty.call(suite, 'error')) {
            ++this._failures;
        }
    }
    afterTest(test, context, results) {
        if (!results.passed) {
            ++this._failures;
        }
    }
    beforeFeature(uri, feature) {
        if (!this._isServiceEnabled) {
            return;
        }
        this._suiteTitle = feature.name;
    }
    afterScenario(world) {
        if (world.result && world.result.status === 6) {
            ++this._failures;
        }
    }
    after(result) {
        if (!this._isServiceEnabled || !this._browser) {
            return;
        }
        let failures = this._failures;
        if (this._config.mochaOpts && this._config.mochaOpts.bail && Boolean(result)) {
            failures = 1;
        }
        const status = 'status: ' + (failures > 0 ? 'failing' : 'passing');
        if (!this._browser.isMultiremote) {
            log.info(`Update job with sessionId ${this._browser.sessionId}, ${status}`);
            return this.updateJob(this._browser.sessionId, failures);
        }
        const browser = this._browser;
        return Promise.all(Object.keys(this._capabilities).map((browserName) => {
            log.info(`Update multiremote job for browser "${browserName}" and sessionId ${browser[browserName].sessionId}, ${status}`);
            return this.updateJob(browser[browserName].sessionId, failures, false, browserName);
        }));
    }
    onReload(oldSessionId, newSessionId) {
        if (!this._isServiceEnabled || !this._browser) {
            return;
        }
        const status = 'status: ' + (this._failures > 0 ? 'failing' : 'passing');
        if (!this._browser.isMultiremote) {
            log.info(`Update (reloaded) job with sessionId ${oldSessionId}, ${status}`);
            return this.updateJob(oldSessionId, this._failures, true);
        }
        const browserName = this._browser.instances.filter((browserName) => this._browser[browserName].sessionId === newSessionId)[0];
        log.info(`Update (reloaded) multiremote job for browser "${browserName}" and sessionId ${oldSessionId}, ${status}`);
        return this.updateJob(oldSessionId, this._failures, true, browserName);
    }
    async updateJob(sessionId, failures, calledOnReload = false, browserName) {
        const json = this.getBody(failures, calledOnReload, browserName);
        this._failures = 0;
        const response = await got_1.default.put(this.getRestUrl(sessionId), {
            json,
            responseType: 'json',
            username: this._cbtUsername,
            password: this._cbtAuthkey
        });
        return response.body;
    }
    getRestUrl(sessionId) {
        return `https://crossbrowsertesting.com/api/v3/selenium/${sessionId}`;
    }
    getBody(failures, calledOnReload = false, browserName) {
        let body = { test: {} };
        body.test['name'] = this._suiteTitle;
        if ((calledOnReload || this._testCnt) && this._browser) {
            let testCnt = ++this._testCnt;
            if (this._browser.isMultiremote) {
                testCnt = Math.ceil(testCnt / this._browser.instances.length);
            }
            body.test['name'] += ` (${testCnt})`;
        }
        for (let prop of jobDataProperties) {
            if (!this._capabilities[prop]) {
                continue;
            }
            body.test[prop] = this._capabilities[prop];
        }
        if (browserName) {
            body.test['name'] = `${browserName}: ${body.test['name']}`;
        }
        body.test['success'] = failures === 0 ? '1' : '0';
        return body;
    }
}
exports.default = CrossBrowserTestingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXFCO0FBQ3JCLDBEQUFpQztBQUlqQyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUE7QUFDdkQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUV0RSxNQUFxQiwwQkFBMEI7SUFTM0MsWUFDWSxPQUEyQixFQUMzQixhQUF3QztRQUR4QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBMkI7UUFUNUMsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFVbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWMsQ0FBQTtRQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBYSxDQUFBO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBRUQsTUFBTSxDQUNGLElBQStCLEVBQy9CLEtBQWUsRUFDZixPQUF1RDtRQUV2RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtJQUMzQixDQUFDO0lBTUQsV0FBVyxDQUFFLEtBQXVCO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtJQUNsQyxDQUFDO0lBTUQsVUFBVSxDQUFFLElBQXFCO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsT0FBTTtTQUNUO1FBUUQsSUFBSSxJQUFJLENBQUMsV0FBVyxL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