"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowserstackCapability = exports.getBrowserCapabilities = exports.getBrowserDescription = void 0;
const constants_1 = require("./constants");
function getBrowserDescription(cap) {
    cap = cap || {};
    if (cap['bstack:options']) {
        cap = { ...cap, ...cap['bstack:options'] };
    }
    return constants_1.BROWSER_DESCRIPTION
        .map((k) => cap[k])
        .filter(Boolean)
        .join(' ');
}
exports.getBrowserDescription = getBrowserDescription;
function getBrowserCapabilities(browser, caps, browserName) {
    if (!browser.isMultiremote) {
        return { ...browser.capabilities, ...caps };
    }
    const multiCaps = caps;
    const globalCap = browserName && browser[browserName] ? browser[browserName].capabilities : {};
    const cap = browserName && multiCaps[browserName] ? multiCaps[browserName].capabilities : {};
    return { ...globalCap, ...cap };
}
exports.getBrowserCapabilities = getBrowserCapabilities;
function isBrowserstackCapability(cap) {
    return Boolean(cap && cap['bstack:options']);
}
exports.isBrowserstackCapability = isBrowserstackCapability;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDJDQUFpRDtBQU1qRCxTQUFnQixxQkFBcUIsQ0FBQyxHQUFxQztJQUN2RSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUNmLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDdkIsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBc0MsQ0FBQTtLQUNqRjtJQUtELE9BQU8sK0JBQW1CO1NBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQXlDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRCxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2xCLENBQUM7QUFiRCxzREFhQztBQVFELFNBQWdCLHNCQUFzQixDQUFDLE9BQXVELEVBQUUsSUFBb0MsRUFBRSxXQUFvQjtJQUN0SixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtRQUN4QixPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUE7S0FDOUM7SUFFRCxNQUFNLFNBQVMsR0FBRyxJQUE0QyxDQUFBO0lBQzlELE1BQU0sU0FBUyxHQUFHLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUM5RixNQUFNLEdBQUcsR0FBRyxXQUFXLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDNUYsT0FBTyxFQUFFLEdBQUcsU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUErQixDQUFBO0FBQ2hFLENBQUM7QUFURCx3REFTQztBQU1ELFNBQWdCLHdCQUF3QixDQUFDLEdBQStCO0lBQ3BFLE9BQU8sT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0FBQ2hELENBQUM7QUFGRCw0REFFQyJ9