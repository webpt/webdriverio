"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/testingbot-service');
const jobDataProperties = ['name', 'tags', 'public', 'build', 'extra'];
class TestingBotService {
    constructor(_options, _capabilities, _config) {
        this._options = _options;
        this._capabilities = _capabilities;
        this._config = _config;
        this._failures = 0;
        this._testCnt = 0;
        this._tbUser = this._config.user;
        this._tbSecret = this._config.key;
        this._isServiceEnabled = Boolean(this._tbUser && this._tbSecret);
    }
    before(caps, specs, browser) {
        this._browser = browser;
    }
    beforeSuite(suite) {
        this._suiteTitle = suite.title;
    }
    beforeTest(test) {
        if (!this._isServiceEnabled || !this._browser) {
            return;
        }
        if (this._suiteTitle === 'Jasmine__TopLevel__Suite') {
            this._suiteTitle = test.fullName.slice(0, test.fullName.indexOf(test.title) - 1);
        }
        const context = (test.fullName ||
            `${test.parent} - ${test.title}`);
        this._browser.execute('tb:test-context=' + context);
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
        if (!this._isServiceEnabled || !this._browser) {
            return;
        }
        this._suiteTitle = feature.name;
        this._browser.execute('tb:test-context=Feature: ' + this._suiteTitle);
    }
    beforeScenario(world) {
        if (!this._isServiceEnabled || !this._browser) {
            return;
        }
        const scenarioName = world.pickle.name;
        this._browser.execute('tb:test-context=Scenario: ' + scenarioName);
    }
    afterScenario(world) {
        if (world.result && world.result.status === 6) {
            ++this._failures;
        }
    }
    after(result) {
        var _a;
        if (!this._isServiceEnabled || !this._browser) {
            return;
        }
        let failures = this._failures;
        if (((_a = this._config.mochaOpts) === null || _a === void 0 ? void 0 : _a.bail) && Boolean(result)) {
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
        const browser = this._browser;
        const browserName = browser.instances.filter((browserName) => browser[browserName].sessionId === newSessionId)[0];
        log.info(`Update (reloaded) multiremote job for browser "${browserName}" and sessionId ${oldSessionId}, ${status}`);
        return this.updateJob(oldSessionId, this._failures, true, browserName);
    }
    async updateJob(sessionId, failures, calledOnReload = false, browserName) {
        if (!this._browser) {
            return;
        }
        const json = this.getBody(failures, calledOnReload, browserName);
        this._failures = 0;
        const response = await got_1.default.put(this.getRestUrl(sessionId), {
            json,
            responseType: 'json',
            username: this._tbUser,
            password: this._tbSecret
        });
        return response.body;
    }
    getRestUrl(sessionId) {
        return `https://api.testingbot.com/v1/tests/${sessionId}`;
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
exports.default = TestingBotService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXFCO0FBQ3JCLDBEQUFpQztBQU1qQyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFDOUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUV0RSxNQUFxQixpQkFBaUI7SUFTbEMsWUFDWSxRQUEyQixFQUMzQixhQUE0QyxFQUM1QyxPQUFpRDtRQUZqRCxhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBK0I7UUFDNUMsWUFBTyxHQUFQLE9BQU8sQ0FBMEM7UUFOckQsY0FBUyxHQUFHLENBQUMsQ0FBQTtRQUNiLGFBQVEsR0FBRyxDQUFDLENBQUE7UUFPaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBO1FBRWpDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDcEUsQ0FBQztJQUVELE1BQU0sQ0FDRixJQUFhLEVBQ2IsS0FBYyxFQUNkLE9BQXVEO1FBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFBO0lBQzNCLENBQUM7SUFNRCxXQUFXLENBQUUsS0FBdUI7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO0lBQ2xDLENBQUM7SUFNRCxVQUFVLENBQUUsSUFBcUI7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUks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