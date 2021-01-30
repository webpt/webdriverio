"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const saucelabs_1 = __importDefault(require("saucelabs"));
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("./utils");
const jobDataProperties = ['name', 'tags', 'public', 'build', 'custom-data'];
const log = logger_1.default('@wdio/sauce-service');
class SauceService {
    constructor(_options, _capabilities, _config) {
        this._options = _options;
        this._capabilities = _capabilities;
        this._config = _config;
        this._testCnt = 0;
        this._maxErrorStackLength = 5;
        this._failures = 0;
        this._isServiceEnabled = true;
        this._isJobNameSet = false;
        this._api = new saucelabs_1.default(this._config);
        this._isRDC = 'testobject_api_key' in this._capabilities;
        this._maxErrorStackLength = this._options.maxErrorStackLength || this._maxErrorStackLength;
    }
    beforeSession() {
        if (!this._isRDC && !this._config.user) {
            this._isServiceEnabled = false;
            this._config.user = 'unknown_user';
        }
        if (!this._isRDC && !this._config.key) {
            this._isServiceEnabled = false;
            this._config.key = 'unknown_key';
        }
    }
    before(caps, specs, browser) {
        this._browser = browser;
        const capabilities = this._browser.requestedCapabilities || {};
        this._isUP = utils_1.isUnifiedPlatform(capabilities);
    }
    beforeSuite(suite) {
        this._suiteTitle = suite.title;
    }
    beforeTest(test) {
        if (!this._isServiceEnabled || this._isRDC || this._isUP || !this._browser) {
            return;
        }
        if (this._suiteTitle === 'Jasmine__TopLevel__Suite') {
            this._suiteTitle = test.fullName.slice(0, test.fullName.indexOf(test.description || '') - 1);
        }
        if (this._browser && !this._isUP && !this._isJobNameSet) {
            this._browser.execute('sauce:job-name=' + this._suiteTitle);
            this._isJobNameSet = true;
        }
        const fullTitle = (test.fullName ||
            `${test.parent} - ${test.title}`);
        this._browser.execute('sauce:context=' + fullTitle);
    }
    afterSuite(suite) {
        if (Object.prototype.hasOwnProperty.call(suite, 'error')) {
            ++this._failures;
        }
    }
    afterTest(test, context, results) {
        const { error } = results;
        if (error && !this._isUP) {
            const lines = error.stack.split(/\r?\n/).slice(0, this._maxErrorStackLength);
            lines.forEach((line) => this._browser.execute('sauce:context=' + line));
        }
        if (test._retriedTest && results.passed) {
            --this._failures;
            return;
        }
        if (test._retriedTest &&
            !results.passed &&
            (typeof test._currentRetry === 'number' &&
                typeof test._retries === 'number' &&
                test._currentRetry < test._retries)) {
            return;
        }
        if (!results.passed) {
            ++this._failures;
        }
    }
    beforeFeature(uri, feature) {
        if (!this._isServiceEnabled || this._isRDC || this._isUP || !this._browser) {
            return;
        }
        this._suiteTitle = feature.name;
        this._browser.execute('sauce:context=Feature: ' + this._suiteTitle);
    }
    beforeScenario(world) {
        if (!this._isServiceEnabled || this._isRDC || this._isUP || !this._browser) {
            return;
        }
        const scenarioName = world.pickle.name || 'unknown scenario';
        this._browser.execute('sauce:context=Scenario: ' + scenarioName);
    }
    afterScenario(world) {
        if (world.result && world.result.status === 6) {
            ++this._failures;
        }
    }
    after(result) {
        if (!this._browser || (!this._isServiceEnabled && !this._isRDC)) {
            return;
        }
        let failures = this._failures;
        if (this._config.mochaOpts && this._config.mochaOpts.bail && Boolean(result)) {
            failures = 1;
        }
        const status = 'status: ' + (failures > 0 ? 'failing' : 'passing');
        if (!this._browser.isMultiremote) {
            log.info(`Update job with sessionId ${this._browser.sessionId}, ${status}`);
            return this._isUP ? this.updateUP(failures) : this.updateJob(this._browser.sessionId, failures);
        }
        const mulitremoteBrowser = this._browser;
        return Promise.all(Object.keys(this._capabilities).map((browserName) => {
            log.info(`Update multiremote job for browser "${browserName}" and sessionId ${mulitremoteBrowser[browserName].sessionId}, ${status}`);
            return this._isUP ? this.updateUP(failures) : this.updateJob(mulitremoteBrowser[browserName].sessionId, failures, false, browserName);
        }));
    }
    onReload(oldSessionId, newSessionId) {
        if (!this._browser || (!this._isServiceEnabled && !this._isRDC)) {
            return;
        }
        const status = 'status: ' + (this._failures > 0 ? 'failing' : 'passing');
        if (!this._browser.isMultiremote) {
            log.info(`Update (reloaded) job with sessionId ${oldSessionId}, ${status}`);
            return this.updateJob(oldSessionId, this._failures, true);
        }
        const mulitremoteBrowser = this._browser;
        const browserName = mulitremoteBrowser.instances.filter((browserName) => mulitremoteBrowser[browserName].sessionId === newSessionId)[0];
        log.info(`Update (reloaded) multiremote job for browser "${browserName}" and sessionId ${oldSessionId}, ${status}`);
        return this.updateJob(oldSessionId, this._failures, true, browserName);
    }
    async updateJob(sessionId, failures, calledOnReload = false, browserName) {
        if (this._isRDC) {
            await this._api.updateTest(sessionId, { passed: failures === 0 });
            this._failures = 0;
            return;
        }
        const body = this.getBody(failures, calledOnReload, browserName);
        await this._api.updateJob(this._config.user, sessionId, body);
        this._failures = 0;
    }
    getBody(failures, calledOnReload = false, browserName) {
        let body = {};
        if (calledOnReload || this._testCnt) {
            body.name = this._suiteTitle;
            if (browserName) {
                body.name = `${browserName}: ${body.name}`;
            }
            let testCnt = ++this._testCnt;
            const mulitremoteBrowser = this._browser;
            if (this._browser && this._browser.isMultiremote) {
                testCnt = Math.ceil(testCnt / mulitremoteBrowser.instances.length);
            }
            body.name += ` (${testCnt})`;
        }
        let caps = this._capabilities['sauce:options'] || this._capabilities;
        for (let prop of jobDataProperties) {
            if (!caps[prop]) {
                continue;
            }
            body[prop] = caps[prop];
        }
        body.passed = failures === 0;
        return body;
    }
    updateUP(failures) {
        if (!this._browser) {
            return;
        }
        return this._browser.execute(`sauce:job-result=${failures === 0}`);
    }
}
exports.default = SauceService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQTREO0FBQzVELDBEQUFpQztBQUlqQyxtQ0FBMkM7QUFHM0MsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQVUsQ0FBQTtBQUVyRixNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFFekMsTUFBcUIsWUFBWTtJQWE3QixZQUNZLFFBQTRCLEVBQzVCLGFBQTRDLEVBQzVDLE9BQTJCO1FBRjNCLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUErQjtRQUM1QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQWYvQixhQUFRLEdBQUcsQ0FBQyxDQUFBO1FBQ1oseUJBQW9CLEdBQUcsQ0FBQyxDQUFBO1FBQ3hCLGNBQVMsR0FBRyxDQUFDLENBQUE7UUFDYixzQkFBaUIsR0FBRyxJQUFJLENBQUE7UUFDeEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFhMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLE9BQXNDLENBQUMsQ0FBQTtRQUN0RSxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFvQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDeEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFBO0lBQzlGLENBQUM7SUFLRCxhQUFhO1FBTVQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFBO1lBQzlCLElBQUks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