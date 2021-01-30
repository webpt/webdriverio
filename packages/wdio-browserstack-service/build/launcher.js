"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const perf_hooks_1 = require("perf_hooks");
const BrowserstackLocalLauncher = __importStar(require("browserstack-local"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/browserstack-service');
class BrowserstackLauncherService {
    constructor(_options, capabilities, _config) {
        this._options = _options;
        this._config = _config;
    }
    onPrepare(config, capabilities) {
        if (!this._options.browserstackLocal) {
            return log.info('browserstackLocal is not enabled - skipping...');
        }
        const opts = {
            key: this._config.key,
            forcelocal: true,
            onlyAutomate: true,
            ...this._options.opts
        };
        this.browserstackLocal = new BrowserstackLocalLauncher.Local();
        if (Array.isArray(capabilities)) {
            capabilities.forEach((capability) => {
                if (!capability['bstack:options']) {
                    capability['bstack:options'] = {};
                }
                capability['bstack:options'].local = true;
            });
        }
        else if (typeof capabilities === 'object') {
            Object.entries(capabilities).forEach(([, caps]) => {
                if (!caps.capabilities['bstack:options']) {
                    caps.capabilities['bstack:options'] = {};
                }
                caps.capabilities['bstack:options'].local = true;
            });
        }
        else {
            throw TypeError('Capabilities should be an object or Array!');
        }
        const obs = new perf_hooks_1.PerformanceObserver((list) => {
            const entry = list.getEntries()[0];
            log.info(`Browserstack Local successfully started after ${entry.duration}ms`);
        });
        obs.observe({ entryTypes: ['measure'], buffered: false });
        let timer;
        perf_hooks_1.performance.mark('tbTunnelStart');
        return Promise.race([
            util_1.promisify(this.browserstackLocal.start.bind(this.browserstackLocal))(opts),
            new Promise((resolve, reject) => {
                timer = setTimeout(function () {
                    reject('Browserstack Local failed to start within 60 seconds!');
                }, 60000);
            })
        ]).then(function (result) {
            clearTimeout(timer);
            perf_hooks_1.performance.mark('tbTunnelEnd');
            perf_hooks_1.performance.measure('bootTime', 'tbTunnelStart', 'tbTunnelEnd');
            return Promise.resolve(result);
        }, function (err) {
            clearTimeout(timer);
            return Promise.reject(err);
        });
    }
    onComplete() {
        if (!this.browserstackLocal || !this.browserstackLocal.isRunning()) {
            return;
        }
        if (this._options.forcedStop) {
            return process.kill(this.browserstackLocal.pid);
        }
        let timer;
        return Promise.race([
            new Promise((resolve, reject) => {
                var _a;
                (_a = this.browserstackLocal) === null || _a === void 0 ? void 0 : _a.stop((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }),
            new Promise((resolve, reject) => {
                timer = setTimeout(() => reject(new Error('Browserstack Local failed to stop within 60 seconds!')), 60000);
            })
        ]).then(function (result) {
            clearTimeout(timer);
            return Promise.resolve(result);
        }, function (err) {
            clearTimeout(timer);
            return Promise.reject(err);
        });
    }
}
exports.default = BrowserstackLauncherService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQWdDO0FBQ2hDLDJDQUE2RDtBQUU3RCw4RUFBK0Q7QUFDL0QsMERBQWlDO0FBS2pDLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtBQU9oRCxNQUFxQiwyQkFBMkI7SUFHNUMsWUFDWSxRQUE0QixFQUNwQyxZQUEyQyxFQUNuQyxPQUEyQjtRQUYzQixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUU1QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUNwQyxDQUFDO0lBRUosU0FBUyxDQUFFLE1BQTJCLEVBQUUsWUFBOEM7UUFDbEYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDbEMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUE7U0FDcEU7UUFFRCxNQUFNLElBQUksR0FBRztZQUNULEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7U0FDeEIsQ0FBQTtRQUVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFBO1FBRTlELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM3QixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBNEMsRUFBRSxFQUFFO2dCQUNsRSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQy9CLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtpQkFDcEM7Z0JBQ0QsVUFBVSxDQUFD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