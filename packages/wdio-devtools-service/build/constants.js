"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWA_AUDITS = exports.NETWORK_RECORDER_EVENTS = exports.DEFAULT_THROTTLE_STATE = exports.CLICK_TRANSITION = exports.NETWORK_STATES = exports.UNSUPPORTED_ERROR_MESSAGE = exports.DEFAULT_FORM_FACTOR = exports.DEFAULT_NETWORK_THROTTLING_STATE = exports.NETWORK_IDLE_TIMEOUT = exports.MAX_TRACE_WAIT_TIME = exports.CPU_IDLE_TRESHOLD = exports.TRACING_TIMEOUT = exports.FRAME_LOAD_START_TIMEOUT = exports.IGNORED_URLS = exports.DEFAULT_TRACING_CATEGORIES = void 0;
const installable_manifest_1 = __importDefault(require("lighthouse/lighthouse-core/audits/installable-manifest"));
const service_worker_1 = __importDefault(require("lighthouse/lighthouse-core/audits/service-worker"));
const splash_screen_1 = __importDefault(require("lighthouse/lighthouse-core/audits/splash-screen"));
const themed_omnibox_1 = __importDefault(require("lighthouse/lighthouse-core/audits/themed-omnibox"));
const content_width_1 = __importDefault(require("lighthouse/lighthouse-core/audits/content-width"));
const viewport_1 = __importDefault(require("lighthouse/lighthouse-core/audits/viewport"));
const apple_touch_icon_1 = __importDefault(require("lighthouse/lighthouse-core/audits/apple-touch-icon"));
const maskable_icon_1 = __importDefault(require("lighthouse/lighthouse-core/audits/maskable-icon"));
const constants_1 = require("lighthouse/lighthouse-core/config/constants");
exports.DEFAULT_TRACING_CATEGORIES = [
    '-*',
    'disabled-by-default-lighthouse',
    'v8',
    'v8.execute',
    'blink.user_timing',
    'blink.console',
    'devtools.timeline',
    'disabled-by-default-devtools.timeline',
    'disabled-by-default-devtools.screenshot',
    'disabled-by-default-devtools.timeline.stack',
    'disabled-by-default-devtools.screenshot'
];
exports.IGNORED_URLS = [
    'data:,',
    'about:',
    'chrome-extension://'
];
exports.FRAME_LOAD_START_TIMEOUT = 2000;
exports.TRACING_TIMEOUT = 15000;
exports.CPU_IDLE_TRESHOLD = 15000;
exports.MAX_TRACE_WAIT_TIME = 45000;
exports.NETWORK_IDLE_TIMEOUT = 5000;
exports.DEFAULT_NETWORK_THROTTLING_STATE = 'online';
exports.DEFAULT_FORM_FACTOR = 'desktop';
exports.UNSUPPORTED_ERROR_MESSAGE = 'The @wdio/devtools-service currently only supports Chrome version 63 and up, and Chromium as the browserName!';
exports.NETWORK_STATES = {
    offline: {
        offline: true,
        latency: 0,
        downloadThroughput: 0,
        uploadThroughput: 0
    },
    GPRS: {
        offline: false,
        downloadThroughput: 50 * 1024 / 8,
        uploadThroughput: 20 * 1024 / 8,
        latency: 500
    },
    'Regular 2G': {
        offline: false,
        downloadThroughput: 250 * 1024 / 8,
        uploadThroughput: 50 * 1024 / 8,
        latency: 300
    },
    'Good 2G': {
        offline: false,
        downloadThroughput: 450 * 1024 / 8,
        uploadThroughput: 150 * 1024 / 8,
        latency: 150
    },
    'Regular 3G': {
        offline: false,
        latency: constants_1.throttling.mobileRegular3G.requestLatencyMs,
        downloadThroughput: Math.floor(constants_1.throttling.mobileRegular3G.downloadThroughputKbps * 1024 / 8),
        uploadThroughput: Math.floor(constants_1.throttling.mobileRegular3G.uploadThroughputKbps * 1024 / 8)
    },
    'Good 3G': {
        offline: false,
        latency: constants_1.throttling.mobileSlow4G.requestLatencyMs,
        downloadThroughput: Math.floor(constants_1.throttling.mobileSlow4G.downloadThroughputKbps * 1024 / 8),
        uploadThroughput: Math.floor(constants_1.throttling.mobileSlow4G.uploadThroughputKbps * 1024 / 8)
    },
    'Regular 4G': {
        offline: false,
        downloadThroughput: 4 * 1024 * 1024 / 8,
        uploadThroughput: 3 * 1024 * 1024 / 8,
        latency: 20
    },
    'DSL': {
        offline: false,
        downloadThroughput: 2 * 1024 * 1024 / 8,
        uploadThroughput: 1 * 1024 * 1024 / 8,
        latency: 5
    },
    'Wifi': {
        offline: false,
        downloadThroughput: 30 * 1024 * 1024 / 8,
        uploadThroughput: 15 * 1024 * 1024 / 8,
        latency: 2
    },
    online: {
        offline: false,
        latency: 0,
        downloadThroughput: -1,
        uploadThroughput: -1
    }
};
exports.CLICK_TRANSITION = 'click transition';
exports.DEFAULT_THROTTLE_STATE = {
    networkThrottling: exports.DEFAULT_NETWORK_THROTTLING_STATE,
    cpuThrottling: 0,
    cacheEnabled: false,
    formFactor: exports.DEFAULT_FORM_FACTOR
};
exports.NETWORK_RECORDER_EVENTS = [
    'Network.requestWillBeSent',
    'Network.requestServedFromCache',
    'Network.responseReceived',
    'Network.dataReceived',
    'Network.loadingFinished',
    'Network.loadingFailed',
    'Network.resourceChangedPriority'
];
exports.PWA_AUDITS = {
    isInstallable: installable_manifest_1.default,
    serviceWorker: service_worker_1.default,
    splashScreen: splash_screen_1.default,
    themedOmnibox: themed_omnibox_1.default,
    contentWith: content_width_1.default,
    viewport: viewport_1.default,
    appleTouchIcon: apple_touch_icon_1.default,
    maskableIcon: maskable_icon_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrSEFBd0Y7QUFDeEYsc0dBQTRFO0FBQzVFLG9HQUEwRTtBQUMxRSxzR0FBNEU7QUFDNUUsb0dBQTBFO0FBQzFFLDBGQUFpRTtBQUNqRSwwR0FBK0U7QUFDL0Usb0dBQTBFO0FBRTFFLDJFQUF3RTtBQUszRCxRQUFBLDBCQUEwQixHQUFHO0lBRXRDLElBQUk7SUFHSixnQ0FBZ0M7SUFJaEMsSUFBSTtJQUdKLFlBQVk7SUFHWixtQkFBbUI7SUFHbkIsZUFBZTtJQUdmLG1CQUFtQjtJQUNuQix1Q0FBdUM7SUFHdkMseUNBQXlDO0lBR3pDLDZDQUE2QztJQUc3Qyx5Q0FBeUM7Q0FDNUMsQ0FBQTtBQUtZLFFBQUEsWUFBWSxHQUFHO0lBQ3hCLFFBQVE7SUFDUixRQUFRO0lBQ1IscUJBQXFCO0NBQ2YsQ0FBQTtBQUVHLFFBQUEsd0JBQXdCLEdBQUcsSUFBSSxDQUFBO0FBQy9CLFFBQUEsZUFBZSxHQUFHLEtBQUssQ0FBQTtBQUN2QixRQUFBLGlCQUFpQixHQUFHLEtBQUssQ0FBQTtBQUN6QixRQUFBLG1CQUFtQixHQUFHLEtBQUssQ0FBQTtBQUMzQixRQUFBLG9CQUFvQixHQUFHLElBQUksQ0FBQTtBQUMzQixRQUFBLGdDQUFnQyxHQUFHLFFBQWlCLENBQUE7QUFDcEQsUUFBQSxtQkFBbUIsR0FBRyxTQUFrQixDQUFBO0FBQ3hDLFFBQUEseUJBQXlCLEdBQUcsK0dBQStHLENBQUE7QUFFM0ksUUFBQSxjQUFjLEdBQUc7SUFDMUIsT0FBTyxFQUFFO1FBQ0wsT0FBTyxFQUFFLElBQUk7UUFDYixPQUFPLEVBQUUsQ0FBQztRQUNWLGtCQUFrQixFQUFFLENBQUM7UUFDckIsZ0JBQWdCLEVBQUUsQ0FBQztLQUN0QjtJQUNELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBRSxLQUFLO1FBQ2Qsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ2pDLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUMvQixPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsT0FBTyxFQUFFLEtBQUs7UUFDZCxrQkFBa0IsRUFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDbEMsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDO1FBQy9CLE9BQU8sRUFBRSxHQUFHO0tBQ2Y7SUFDRCxTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsS0FBSztRQUNkLGtCQUFrQixFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNsQyxnQkFBZ0IsRUFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDaEMsT0FBTyxFQUFFLEdBQUc7S0FDZjtJQUNELFlBQVksRUFBRTtRQUNWLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLHNCQUFVLENBQUMsZUFBZSxDQUFDLGdCQUFnQjtRQUVwRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFVLENBQUMsZUFBZSxDQUFDLHNCQUFzQixHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7UUFDNUYsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBVSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0tBQzNGO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsc0JBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCO1FBRWpELGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQVUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN6RixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFVLENBQUMsWUFBWSxDQUFDLG9CQUFvQixHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7S0FDeEY7SUFDRCxZQUFZLEVBQUU7UUFDVixPQUFPLEVBQUUsS0FBSztRQUNkLGtCQUFrQixFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDdkMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNyQyxPQUFPLEVBQUUsRUFBRTtLQUNkO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsT0FBTyxFQUFFLEtBQUs7UUFDZCxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ3ZDLGdCQUFnQixFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDckMsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE1BQU0sRUFBRTtRQUNKLE9BQU8sRUFBRSxLQUFLO1FBQ2Qsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUN4QyxnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ3RDLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxNQUFNLEVBQUU7UUFDSixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1Ysa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFnQixFQUFFLENBQUMsQ0FBQztLQUN2QjtDQUNKLENBQUE7QUFFWSxRQUFBLGdCQUFnQixHQUFHLGtCQUFrQixDQUFBO0FBQ3JDLFFBQUEsc0JBQXNCLEdBQUc7SUFDbEMsaUJBQWlCLEVBQUUsd0NBQStEO0lBQ2xGLGFBQWEsRUFBRSxDQUFDO0lBQ2hCLFlBQVksRUFBRSxLQUFLO0lBQ25CLFVBQVUsRUFBRSwyQkFBbUI7Q0FDekIsQ0FBQTtBQUVHLFFBQUEsdUJBQXVCLEdBQUc7SUFDbkMsMkJBQTJCO0lBQzNCLGdDQUFnQztJQUNoQywwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLHlCQUF5QjtJQUN6Qix1QkFBdUI7SUFDdkIsaUNBQWlDO0NBQzNCLENBQUE7QUFFRyxRQUFBLFVBQVUsR0FBRztJQUN0QixhQUFhLEVBQUUsOEJBQW1CO0lBQ2xDLGFBQWEsRUFBRSx3QkFBYTtJQUM1QixZQUFZLEVBQUUsdUJBQVk7SUFDMUIsYUFBYSxFQUFFLHdCQUFhO0lBQzVCLFdBQVcsRUFBRSx1QkFBWTtJQUN6QixRQUFRLEVBQUUsa0JBQVE7SUFDbEIsY0FBYyxFQUFFLDBCQUFjO0lBQzlCLFlBQVksRUFBRSx1QkFBWTtDQUNwQixDQUFBIn0=