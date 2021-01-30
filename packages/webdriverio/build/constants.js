"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_REASON = exports.FF_REMOTE_DEBUG_ARG = exports.DRIVER_DEFAULT_ENDPOINT = exports.APPIUM_CAPABILITES = exports.APPIUM_IOS_CAPABILITIES = exports.APPIUM_ANDROID_CAPABILITIES = exports.JSONWP_CAPABILITIES = exports.W3C_CAPABILITIES = exports.W3C_SELECTOR_STRATEGIES = exports.UNICODE_CHARACTERS = exports.WDIO_DEFAULTS = exports.ELEMENT_KEY = void 0;
const HOOK_DEFINITION = {
    type: 'object',
    validate: (param) => {
        if (!Array.isArray(param)) {
            throw new Error('a hook option needs to be a list of functions');
        }
        for (const option of param) {
            if (typeof option === 'function') {
                continue;
            }
            throw new Error('expected hook to be type of function');
        }
    }
};
exports.ELEMENT_KEY = 'element-6066-11e4-a52e-4f735466cecf';
exports.WDIO_DEFAULTS = {
    automationProtocol: {
        type: 'string',
        validate: (param) => {
            if (!['webdriver', 'devtools', './protocol-stub'].includes(param.toLowerCase())) {
                throw new Error(`Currently only "webdriver" and "devtools" is supproted as automationProtocol, you set "${param}"`);
            }
            try {
                require.resolve(param);
            }
            catch (e) {
                throw new Error('Automation protocol package is not installed!\n' +
                    `Please install it via \`npm install ${param}\``);
            }
        }
    },
    specs: {
        type: 'object',
        validate: (param) => {
            if (!Array.isArray(param)) {
                throw new Error('the "specs" option needs to be a list of strings');
            }
        }
    },
    exclude: {
        type: 'object',
        validate: (param) => {
            if (!Array.isArray(param)) {
                throw new Error('the "exclude" option needs to be a list of strings');
            }
        }
    },
    suites: {
        type: 'object'
    },
    capabilities: {
        type: 'object',
        validate: (param) => {
            if (!Array.isArray(param)) {
                if (typeof param === 'object') {
                    return true;
                }
                throw new Error('the "capabilities" options needs to be an object or a list of objects');
            }
            for (const option of param) {
                if (typeof option === 'object') {
                    continue;
                }
                throw new Error('expected every item of a list of capabilities to be of type object');
            }
            return true;
        },
        required: true
    },
    baseUrl: {
        type: 'string'
    },
    bail: {
        type: 'number',
        default: 0
    },
    waitforInterval: {
        type: 'number',
        default: 500
    },
    waitforTimeout: {
        type: 'number',
        default: 3000
    },
    framework: {
        type: 'string'
    },
    reporters: {
        type: 'object',
        validate: (param) => {
            if (!Array.isArray(param)) {
                throw new Error('the "reporters" options needs to be a list of strings');
            }
            const isValidReporter = (option) => ((typeof option === 'string') ||
                (typeof option === 'function'));
            for (const option of param) {
                if (isValidReporter(option)) {
                    continue;
                }
                if (Array.isArray(option) &&
                    typeof option[1] === 'object' &&
                    isValidReporter(option[0])) {
                    continue;
                }
                throw new Error('a reporter should be either a string in the format "wdio-<reportername>-reporter" ' +
                    'or a function/class. Please see the docs for more information on custom reporters ' +
                    '(https://webdriver.io/docs/customreporter)');
            }
            return true;
        }
    },
    services: {
        type: 'object',
        validate: (param) => {
            if (!Array.isArray(param)) {
                throw new Error('the "services" options needs to be a list of strings and/or arrays');
            }
            for (const option of param) {
                if (!Array.isArray(option)) {
                    if (typeof option === 'string') {
                        continue;
                    }
                    throw new Error('the "services" options needs to be a list of strings and/or arrays');
                }
            }
            return true;
        },
        default: []
    },
    execArgv: {
        type: 'object',
        validate: (param) => {
            if (!Array.isArray(param)) {
                throw new Error('the "execArgv" options needs to be a list of strings');
            }
        },
        default: []
    },
    maxInstances: {
        type: 'number'
    },
    maxInstancesPerCapability: {
        type: 'number'
    },
    filesToWatch: {
        type: 'object',
        validate: (param) => {
            if (!Array.isArray(param)) {
                throw new Error('the "filesToWatch" options needs to be a list of strings');
            }
        }
    },
    onPrepare: HOOK_DEFINITION,
    onWorkerStart: HOOK_DEFINITION,
    before: HOOK_DEFINITION,
    beforeSession: HOOK_DEFINITION,
    beforeSuite: HOOK_DEFINITION,
    beforeHook: HOOK_DEFINITION,
    beforeTest: HOOK_DEFINITION,
    beforeCommand: HOOK_DEFINITION,
    afterCommand: HOOK_DEFINITION,
    afterTest: HOOK_DEFINITION,
    afterHook: HOOK_DEFINITION,
    afterSuite: HOOK_DEFINITION,
    afterSession: HOOK_DEFINITION,
    after: HOOK_DEFINITION,
    onComplete: HOOK_DEFINITION,
    onReload: HOOK_DEFINITION,
};
exports.UNICODE_CHARACTERS = {
    'NULL': '\uE000',
    'Unidentified': '\uE000',
    'Cancel': '\uE001',
    'Help': '\uE002',
    'Back space': '\uE003',
    'Backspace': '\uE003',
    'Tab': '\uE004',
    'Clear': '\uE005',
    'Return': '\uE006',
    'Enter': '\uE007',
    'Shift': '\uE008',
    'Control': '\uE009',
    'Control Left': '\uE009',
    'Control Right': '\uE051',
    'Alt': '\uE00A',
    'Pause': '\uE00B',
    'Escape': '\uE00C',
    'Space': '\uE00D',
    ' ': '\uE00D',
    'Pageup': '\uE00E',
    'PageUp': '\uE00E',
    'Page_Up': '\uE00E',
    'Pagedown': '\uE00F',
    'PageDown': '\uE00F',
    'Page_Down': '\uE00F',
    'End': '\uE010',
    'Home': '\uE011',
    'Left arrow': '\uE012',
    'Arrow_Left': '\uE012',
    'ArrowLeft': '\uE012',
    'Up arrow': '\uE013',
    'Arrow_Up': '\uE013',
    'ArrowUp': '\uE013',
    'Right arrow': '\uE014',
    'Arrow_Right': '\uE014',
    'ArrowRight': '\uE014',
    'Down arrow': '\uE015',
    'Arrow_Down': '\uE015',
    'ArrowDown': '\uE015',
    'Insert': '\uE016',
    'Delete': '\uE017',
    'Semicolon': '\uE018',
    'Equals': '\uE019',
    'Numpad 0': '\uE01A',
    'Numpad 1': '\uE01B',
    'Numpad 2': '\uE01C',
    'Numpad 3': '\uE01D',
    'Numpad 4': '\uE01E',
    'Numpad 5': '\uE01F',
    'Numpad 6': '\uE020',
    'Numpad 7': '\uE021',
    'Numpad 8': '\uE022',
    'Numpad 9': '\uE023',
    'Multiply': '\uE024',
    'Add': '\uE025',
    'Separator': '\uE026',
    'Subtract': '\uE027',
    'Decimal': '\uE028',
    'Divide': '\uE029',
    'F1': '\uE031',
    'F2': '\uE032',
    'F3': '\uE033',
    'F4': '\uE034',
    'F5': '\uE035',
    'F6': '\uE036',
    'F7': '\uE037',
    'F8': '\uE038',
    'F9': '\uE039',
    'F10': '\uE03A',
    'F11': '\uE03B',
    'F12': '\uE03C',
    'Command': '\uE03D',
    'Meta': '\uE03D',
    'Zenkaku_Hankaku': '\uE040',
    'ZenkakuHankaku': '\uE040'
};
exports.W3C_SELECTOR_STRATEGIES = ['css selector', 'link text', 'partial link text', 'tag name', 'xpath'];
exports.W3C_CAPABILITIES = [
    'browserName', 'browserVersion', 'platformName', 'acceptInsecureCerts', 'pageLoadStrategy', 'proxy',
    'setWindowRect', 'timeouts', 'unhandledPromptBehavior'
];
exports.JSONWP_CAPABILITIES = [
    'browserName', 'version', 'platform', 'javascriptEnabled', 'takesScreenshot', 'handlesAlerts', 'databaseEnabled',
    'locationContextEnabled', 'applicationCacheEnabled', 'browserConnectionEnabled', 'cssSelectorsEnabled',
    'webStorageEnabled', 'rotatable', 'acceptSslCerts', 'nativeEvents', 'proxy'
];
exports.APPIUM_ANDROID_CAPABILITIES = [
    'appActivity', 'appPackage', 'appWaitActivity', 'appWaitPackage', 'appWaitDuration', 'deviceReadyTimeout',
    'androidCoverage', 'androidCoverageEndIntent', 'androidDeviceReadyTimeout', 'androidInstallTimeout',
    'androidInstallPath', 'adbPort', 'systemPort', 'remoteAdbHost', 'androidDeviceSocket', 'avd', 'avdLaunchTimeout',
    'avdReadyTimeout', 'avdArgs', 'useKeystore', 'keystorePath', 'keystorePassword', 'keyAlias', 'keyPassword',
    'chromedriverExecutable', 'chromedriverExecutableDir', 'chromedriverChromeMappingFile', 'autoWebviewTimeout',
    'intentAction', 'intentCategory', 'intentFlags', 'optionalIntentArguments', 'dontStopAppOnReset',
    'unicodeKeyboard', 'resetKeyboard', 'noSign', 'ignoreUnimportantViews', 'disableAndroidWatchers', 'chromeOptions',
    'recreateChromeDriverSessions', 'nativeWebScreenshot', 'androidScreenshotPath', 'autoGrantPermissions',
    'networkSpeed', 'gpsEnabled', 'isHeadless', 'uiautomator2ServerLaunchTimeout', 'uiautomator2ServerInstallTimeout',
    'otherApps'
];
exports.APPIUM_IOS_CAPABILITIES = [
    'calendarFormat', 'bundleId', 'udid', 'launchTimeout', 'locationServicesEnabled', 'locationServicesAuthorized',
    'autoAcceptAlerts', 'autoDismissAlerts', 'nativeInstrumentsLib', 'nativeWebTap', 'safariInitialUrl',
    'safariAllowPopups', 'safariIgnoreFraudWarning', 'safariOpenLinksInBackground', 'keepKeyChains',
    'localizableStringsDir', 'processArguments', 'interKeyDelay', 'showIOSLog', 'sendKeyStrategy',
    'screenshotWaitTimeout', 'waitForAppScript', 'webviewConnectRetries', 'appName', 'customSSLCert',
    'webkitResponseTimeout'
];
exports.APPIUM_CAPABILITES = [
    'automationName', 'platformName', 'platformVersion', 'deviceName', 'app', 'browserName', 'newCommandTimeout',
    'language', 'locale', 'udid', 'orientation', 'autoWebview', 'noReset', 'fullReset', 'eventTimings',
    'enablePerformanceLogging', 'printPageSourceOnFindFailure',
    ...exports.APPIUM_ANDROID_CAPABILITIES,
    ...exports.APPIUM_IOS_CAPABILITIES
];
exports.DRIVER_DEFAULT_ENDPOINT = {
    method: 'GET',
    host: 'localhost',
    port: 4444,
    path: '/status'
};
exports.FF_REMOTE_DEBUG_ARG = '-remote-debugging-port';
exports.ERROR_REASON = [
    'Failed', 'Aborted', 'TimedOut', 'AccessDenied', 'ConnectionClosed',
    'ConnectionReset', 'ConnectionRefused', 'ConnectionAborted',
    'ConnectionFailed', 'NameNotResolved', 'InternetDisconnected',
    'AddressUnreachable', 'BlockedByClient', 'BlockedByResponse'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFNLGVBQWUsR0FBRztJQUNwQixJQUFJLEVBQUUsUUFBaUI7SUFDdkIsUUFBUSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFJckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO1NBQ25FO1FBS0QsS0FBSyxNQUFNLE1BQU0sSUFBSSxLQUFLLEVBQUU7WUFJeEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7Z0JBQzlCLFNBQVE7YUFDWDtZQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtTQUMxRDtJQUNMLENBQUM7Q0FDSixDQUFBO0FBQ1ksUUFBQSxXQUFXLEdBQUcscUNBQXFDLENBQUE7QUFFbkQsUUFBQSxhQUFhLEdBQWlFO0lBSXZGLGtCQUFrQixFQUFFO1FBQ2hCLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLENBQUMsS0FBaUMsRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7Z0JBQzdFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEZBQTBGLEtBQUssR0FBRyxDQUFDLENBQUE7YUFDdEg7WUFFRCxJQUFJO2dCQUNBLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDekI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFFUixNQUFNLElBQUksS0FBSyxDQUNYLGlEQUFpRDtvQkFDakQsdUNBQXVDLEtBQUssSUFBSSxDQUNuRCxDQUFBO2FBQ0o7UUFDTCxDQUFDO0tBQ0o7SUFJ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RUFBRSxRQUFRO0lBQ3RCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLGFBQWEsRUFBRSxRQUFRO0lBQ3ZCLGFBQWEsRUFBRSxRQUFRO0lBQ3ZCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFdBQVcsRUFBRSxRQUFRO0lBQ3JCLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLEtBQUssRUFBRSxRQUFRO0lBQ2YsV0FBVyxFQUFFLFFBQVE7SUFDckIsVUFBVSxFQUFFLFFBQVE7SUFDcEIsU0FBUyxFQUFFLFFBQVE7SUFDbkIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsSUFBSSxFQUFFLFFBQVE7SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLFFBQVE7SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLFFBQVE7SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFFBQVE7SUFDZixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFR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