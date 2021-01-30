"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webdriverEnvironmentDetector = exports.devtoolsEnvironmentDetector = exports.sessionEnvironmentDetector = exports.capabilitiesEnvironmentDetector = exports.isW3C = void 0;
const MOBILE_BROWSER_NAMES = ['ipad', 'iphone', 'android'];
const MOBILE_CAPABILITIES = [
    'appium-version', 'appiumVersion', 'device-type', 'deviceType',
    'device-orientation', 'deviceOrientation', 'deviceName'
];
function isW3C(capabilities) {
    if (!capabilities) {
        return false;
    }
    const isAppium = Boolean(capabilities.automationName ||
        capabilities.deviceName ||
        capabilities.appiumVersion);
    const hasW3CCaps = Boolean(capabilities.platformName &&
        capabilities.browserVersion &&
        (capabilities.platformVersion || Object.prototype.hasOwnProperty.call(capabilities, 'setWindowRect')));
    return Boolean(hasW3CCaps || isAppium);
}
exports.isW3C = isW3C;
function isChrome(capabilities) {
    if (!capabilities) {
        return false;
    }
    return Boolean(capabilities.chrome || capabilities['goog:chromeOptions']);
}
function isMobile(capabilities) {
    if (!capabilities) {
        return false;
    }
    const browserName = (capabilities.browserName || '').toLowerCase();
    return Boolean(Object.keys(capabilities).find((cap) => MOBILE_CAPABILITIES.includes(cap)) ||
        capabilities.browserName === '' ||
        MOBILE_BROWSER_NAMES.includes(browserName));
}
function isIOS(capabilities) {
    if (!capabilities) {
        return false;
    }
    return Boolean((capabilities.platformName && capabilities.platformName.match(/iOS/i)) ||
        (capabilities.deviceName && capabilities.deviceName.match(/(iPad|iPhone)/i)));
}
function isAndroid(capabilities) {
    if (!capabilities) {
        return false;
    }
    return Boolean((capabilities.platformName && capabilities.platformName.match(/Android/i)) ||
        (capabilities.browserName && capabilities.browserName.match(/Android/i)));
}
function isSauce(capabilities) {
    if (!capabilities) {
        return false;
    }
    const caps = capabilities.alwaysMatch
        ? capabilities.alwaysMatch
        : capabilities;
    return Boolean(caps.extendedDebugging ||
        (caps['sauce:options'] &&
            caps['sauce:options'].extendedDebugging));
}
function isSeleniumStandalone(capabilities) {
    if (!capabilities) {
        return false;
    }
    return Boolean(capabilities['webdriver.remote.sessionid']);
}
function capabilitiesEnvironmentDetector(capabilities, automationProtocol) {
    return automationProtocol === 'devtools'
        ? devtoolsEnvironmentDetector(capabilities)
        : webdriverEnvironmentDetector(capabilities);
}
exports.capabilitiesEnvironmentDetector = capabilitiesEnvironmentDetector;
function sessionEnvironmentDetector({ capabilities, requestedCapabilities }) {
    return {
        isW3C: isW3C(capabilities),
        isChrome: isChrome(capabilities),
        isMobile: isMobile(capabilities),
        isIOS: isIOS(capabilities),
        isAndroid: isAndroid(capabilities),
        isSauce: isSauce(requestedCapabilities),
        isSeleniumStandalone: isSeleniumStandalone(capabilities)
    };
}
exports.sessionEnvironmentDetector = sessionEnvironmentDetector;
function devtoolsEnvironmentDetector({ browserName }) {
    return {
        isDevTools: true,
        isW3C: true,
        isMobile: false,
        isIOS: false,
        isAndroid: false,
        isChrome: browserName === 'chrome',
        isSauce: false,
        isSeleniumStandalone: false,
    };
}
exports.devtoolsEnvironmentDetector = devtoolsEnvironmentDetector;
function webdriverEnvironmentDetector(capabilities) {
    return {
        isChrome: isChrome(capabilities),
        isMobile: isMobile(capabilities),
        isIOS: isIOS(capabilities),
        isAndroid: isAndroid(capabilities),
        isSauce: isSauce(capabilities)
    };
}
exports.webdriverEnvironmentDetector = webdriverEnvironmentDetector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52RGV0ZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW52RGV0ZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDMUQsTUFBTSxtQkFBbUIsR0FBRztJQUN4QixnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLFlBQVk7SUFDOUQsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsWUFBWTtDQUMxRCxDQUFBO0FBT0QsU0FBZ0IsS0FBSyxDQUFFLFlBQStDO0lBS2xFLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDZixPQUFPLEtBQUssQ0FBQTtLQUNmO0lBUUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUNwQixZQUFZLENBQUMsY0FBYztRQUMzQixZQUFZLENBQUMsVUFBVTtRQUN2QixZQUFZLENBQUMsYUFBYSxDQUM3QixDQUFBO0lBQ0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUN0QixZQUFZLENBQUMsWUFBWTtRQUN6QixZQUFZLENBQUMsY0FBYztRQUszQixDQUFDLFlBQVksQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUN4RyxDQUFBO0lBQ0QsT0FBTyxPQUFPLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxDQUFBO0FBQzFDLENBQUM7QUE5QkQsc0JBOEJDO0FBT0QsU0FBUyxRQUFRLENBQUUsWUFBK0M7SUFDOUQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNmLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7SUFDRCxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUE7QUFDN0UsQ0FBQztBQVFELFNBQVMsUUFBUSxDQUFFLFlBQXdDO0lBQ3ZE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