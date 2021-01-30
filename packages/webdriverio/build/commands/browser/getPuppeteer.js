"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const constants_1 = require("../../constants");
async function getPuppeteer() {
    var _a, _b, _c;
    if (this.puppeteer) {
        return this.puppeteer;
    }
    const caps = this.capabilities.alwaysMatch || this.capabilities;
    const chromiumOptions = caps['goog:chromeOptions'] || caps['ms:edgeOptions'];
    if (chromiumOptions && chromiumOptions.debuggerAddress) {
        this.puppeteer = await puppeteer_core_1.default.connect({
            browserURL: `http://${chromiumOptions.debuggerAddress}`,
            defaultViewport: null
        });
        return this.puppeteer;
    }
    if (((_a = caps.browserName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'firefox') {
        if (!caps.browserVersion) {
            throw new Error('Can\'t find "browserVersion" in capabilities');
        }
        const majorVersion = parseInt(caps.browserVersion.split('.').shift() || '', 10);
        if (majorVersion >= 79) {
            const reqCaps = this.requestedCapabilities.alwaysMatch || this.requestedCapabilities;
            const ffOptions = caps['moz:firefoxOptions'];
            const ffArgs = (_b = reqCaps['moz:firefoxOptions']) === null || _b === void 0 ? void 0 : _b.args;
            const rdPort = ffOptions && ffOptions.debuggerAddress
                ? ffOptions.debuggerAddress
                : (_c = ffArgs === null || ffArgs === void 0 ? void 0 : ffArgs[ffArgs.findIndex((arg) => arg === constants_1.FF_REMOTE_DEBUG_ARG) + 1]) !== null && _c !== void 0 ? _c : null;
            if (!rdPort) {
                throw new Error('Could\'t find remote debug port in Firefox options');
            }
            this.puppeteer = await puppeteer_core_1.default.connect({
                browserURL: `http://localhost:${rdPort}`,
                defaultViewport: null
            });
            return this.puppeteer;
        }
    }
    throw new Error('Using DevTools capabilities is not supported for this session. ' +
        'This feature is only supported for local testing on Chrome, Firefox and Chromium Edge.');
}
exports.default = getPuppeteer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHVwcGV0ZWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Jyb3dzZXIvZ2V0UHVwcGV0ZWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQXNDO0FBSXRDLCtDQUFxRDtBQXFDdEMsS0FBSyxVQUFVLFlBQVk7O0lBS3RDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7S0FDeEI7SUFLRCxNQUFNLElBQUksR0FBSSxJQUFJLENBQUMsWUFBNkMsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQWdELENBQUE7SUFDckksTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDNUUsSUFBSSxlQUFlLElBQUksZUFBZSxDQUFDLGVBQWUsRUFBRTtRQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUM7WUFDckMsVUFBVSxFQUFFLFVBQVUsZUFBZSxDQUFDLGVBQWUsRUFBRTtZQUN2RCxlQUFlLEVBQUUsSUFBSTtTQUN4QixDQUE0QixDQUFBO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQTtLQUN4QjtJQUtELElBQUksT0FBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxXQUFXLFFBQU8sU0FBUyxFQUFFO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQTtTQUNsRTtRQUVELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDL0UsSUFBSSxZQUFZLElBQUksRUFBRSxFQUFFO1lBQ3BCLE1BQU0sT0FBTyxHQUFJLElBQUksQ0FBQyxxQkFBc0QsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLHFCQUF5RCxDQUFBO1lBQzFKLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1lBQzVDLE1BQU0sTUFBTSxTQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQywwQ0FBRSxJQUFJLENBQUE7WUFFbEQsTUFBTSxNQUFNLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxlQUFlO2dCQUNqRCxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWU7Z0JBQzNCLENBQUMsT0FBQyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLCtCQUFtQixDQUFDLEdBQUcsQ0FBQyxvQ0FBSyxJQUFJLENBQUE7WUFFMUYsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUE7YUFDeEU7WUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLFVBQVUsRUFBRSxvQkFBb0IsTUFBTSxFQUFFO2dCQUN4QyxlQUFlLEVBQUUsSUFBSTthQUN4QixDQUE0QixDQUFBO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFNBQW9DLENBQUE7U0FDbkQ7S0FDSjtJQUVELE1BQU0sSUFBSSxLQUFLLENBQ1gsaUVBQWlFO1FBQ2pFLHdGQUF3RixDQUMzRixDQUFBO0FBQ0wsQ0FBQztBQXhERCwrQkF3REMifQ==