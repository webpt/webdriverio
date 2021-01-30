"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const eyes_webdriverio_1 = require("@applitools/eyes-webdriverio");
const log = logger_1.default('@wdio/applitools-service');
const DEFAULT_VIEWPORT = {
    width: 1440,
    height: 900
};
class ApplitoolsService {
    constructor(_options) {
        this._options = _options;
        this._isConfigured = false;
        this._eyes = new eyes_webdriverio_1.Eyes();
    }
    beforeSession() {
        const key = this._options.key || process.env.APPLITOOLS_KEY;
        const serverUrl = this._options.serverUrl || process.env.APPLITOOLS_SERVER_URL;
        if (!key) {
            throw new Error('Couldn\'t find an Applitools "applitools.key" in config nor "APPLITOOLS_KEY" in the environment');
        }
        if (serverUrl) {
            this._eyes.setServerUrl(serverUrl);
        }
        this._isConfigured = true;
        this._eyes.setApiKey(key);
        if (this._options.eyesProxy) {
            this._eyes.setProxy(this._options.eyesProxy);
        }
        this._viewport = Object.assign({ ...DEFAULT_VIEWPORT }, this._options.viewport);
    }
    before(caps, specs, browser) {
        this._browser = browser;
        if (!this._isConfigured) {
            return;
        }
        this._browser.addCommand('takeSnapshot', this._takeSnapshot.bind(this));
        this._browser.addCommand('takeRegionSnapshot', this._takeRegionSnapshot.bind(this));
    }
    _takeSnapshot(title) {
        if (!title) {
            throw new Error('A title for the Applitools snapshot is missing');
        }
        return this._eyes.check(title, eyes_webdriverio_1.Target.window());
    }
    _takeRegionSnapshot(title, region, frame) {
        if (!title) {
            throw new Error('A title for the Applitools snapshot is missing');
        }
        if (!region || region === null) {
            throw new Error('A region for the Applitools snapshot is missing');
        }
        if (!frame) {
            return this._eyes.check(title, eyes_webdriverio_1.Target.region(region));
        }
        return this._eyes.check(title, eyes_webdriverio_1.Target.region(region, frame));
    }
    beforeTest(test) {
        if (!this._isConfigured || !this._browser) {
            return;
        }
        log.info(`Open eyes for ${test.parent} ${test.title}`);
        this._browser.call(() => this._eyes.open(this._browser, test.title, test.parent, this._viewport));
    }
    afterTest() {
        if (!this._isConfigured || !this._browser) {
            return;
        }
        this._browser.call(this._eyes.close.bind(this._eyes));
    }
    after() {
        if (!this._isConfigured || !this._browser) {
            return;
        }
        this._browser.call(this._eyes.abortIfNotClosed.bind(this._eyes));
    }
}
exports.default = ApplitoolsService;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWlDO0FBQ2pDLG1FQUEyRDtBQU0zRCxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFFOUMsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQixLQUFLLEVBQUUsSUFBSTtJQUNYLE1BQU0sRUFBRSxHQUFHO0NBQ2QsQ0FBQTtBQUVELE1BQXFCLGlCQUFpQjtJQU1sQyxZQUFvQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUx0QyxrQkFBYSxHQUFZLEtBQUssQ0FBQTtRQUU5QixVQUFLLEdBQUcsSUFBSSx1QkFBSSxFQUFFLENBQUE7SUFHdUIsQ0FBQztJQUtsRCxhQUFhO1FBQ1QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7UUFDM0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQTtRQUU5RSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxpR0FBaUcsQ0FBQyxDQUFBO1NBQ3JIO1FBS0QsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUNyQztRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRXpCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFB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