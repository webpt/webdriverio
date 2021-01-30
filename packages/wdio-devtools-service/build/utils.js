"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowserSupported = exports.getBrowserMajorVersion = exports.isBrowserVersionLower = exports.isSupportedUrl = exports.sumByKey = exports.setUnsupportedCommand = void 0;
const constants_1 = require("./constants");
const VERSION_PROPS = ['browserVersion', 'browser_version', 'version'];
const SUPPORTED_BROWSERS_AND_MIN_VERSIONS = {
    'chrome': 63,
    'chromium': 63,
    'googlechrome': 63,
    'google chrome': 63
};
function setUnsupportedCommand(browser) {
    return browser.addCommand('cdp', () => {
        throw new Error(constants_1.UNSUPPORTED_ERROR_MESSAGE);
    });
}
exports.setUnsupportedCommand = setUnsupportedCommand;
function sumByKey(list, key) {
    return list.map((data) => data[key]).reduce((acc, val) => acc + val, 0);
}
exports.sumByKey = sumByKey;
function isSupportedUrl(url) {
    return constants_1.IGNORED_URLS.filter((ignoredUrl) => url.startsWith(ignoredUrl)).length === 0;
}
exports.isSupportedUrl = isSupportedUrl;
function isBrowserVersionLower(caps, minVersion) {
    const versionProp = VERSION_PROPS.find((prop) => caps[prop]);
    const browserVersion = getBrowserMajorVersion(caps[versionProp]);
    return typeof browserVersion === 'number' && browserVersion < minVersion;
}
exports.isBrowserVersionLower = isBrowserVersionLower;
function getBrowserMajorVersion(version) {
    if (typeof version === 'string') {
        const majorVersion = Number(version.split('.')[0]);
        return isNaN(majorVersion) ? parseInt(version, 10) : majorVersion;
    }
    return version;
}
exports.getBrowserMajorVersion = getBrowserMajorVersion;
function isBrowserSupported(caps) {
    if (!caps.browserName ||
        !(caps.browserName.toLowerCase() in SUPPORTED_BROWSERS_AND_MIN_VERSIONS) ||
        isBrowserVersionLower(caps, SUPPORTED_BROWSERS_AND_MIN_VERSIONS[caps.browserName.toLowerCase()])) {
        return false;
    }
    return true;
}
exports.isBrowserSupported = isBrowserSupported;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsMkNBQXFFO0FBR3JFLE1BQU0sYUFBYSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDdEUsTUFBTSxtQ0FBbUMsR0FBRztJQUN4QyxRQUFRLEVBQUUsRUFBRTtJQUNaLFVBQVUsRUFBRyxFQUFFO0lBQ2YsY0FBYyxFQUFFLEVBQUU7SUFDbEIsZUFBZSxFQUFFLEVBQUU7Q0FDdEIsQ0FBQTtBQUVELFNBQWdCLHFCQUFxQixDQUFFLE9BQXVEO0lBQzFGLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQTRCLEdBQUcsRUFBRTtRQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUF5QixDQUFDLENBQUE7SUFDOUMsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBSkQsc0RBSUM7QUFPRCxTQUFnQixRQUFRLENBQUUsSUFBc0IsRUFBRSxHQUF5QjtJQUN2RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDM0UsQ0FBQztBQUZELDRCQUVDO0FBT0QsU0FBZ0IsY0FBYyxDQUFFLEdBQVc7SUFDdkMsT0FBTyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUE7QUFDdkYsQ0FBQztBQUZELHdDQUVDO0FBT0QsU0FBZ0IscUJBQXFCLENBQUUsSUFBK0IsRUFBRSxVQUFrQjtJQUN0RixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUNsQyxDQUFDLElBQXFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDcEMsQ0FBQTtJQUNyQixNQUFNLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUNoRSxPQUFPLE9BQU8sY0FBYyxLQUFLLFFBQVEsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFBO0FBQzVFLENBQUM7QUFORCxzREFNQztBQU9ELFNBQWdCLHNCQUFzQixDQUFFLE9BQXlCO0lBQzdELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzdCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEQsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQTtLQUNwRTtJQUNELE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7QUFORCx3REFNQztBQU1ELFNBQWdCLGtCQUFrQixDQUFDLElBQStCO0lBQzlELElBQ0ksQ0FBQyxJQUFJLENBQUMsV0FBVztRQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxtQ0FBbUMsQ0FBQztRQUN4RSxxQkFBcUIsQ0FDakIsSUFBSSxFQUNKLG1DQUFtQyxDQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBc0QsQ0FDckYsQ0FDSixFQUNIO1FBQ0UsT0FBTyxLQUFLLENBQUE7S0FDZjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQWZELGdEQWVDIn0=