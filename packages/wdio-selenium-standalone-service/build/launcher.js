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
const logger_1 = __importDefault(require("@wdio/logger"));
const config_1 = require("@wdio/config");
const util_1 = require("util");
const fs_extra_1 = __importDefault(require("fs-extra"));
const SeleniumStandalone = __importStar(require("selenium-standalone"));
const utils_1 = require("./utils");
const DEFAULT_LOG_FILENAME = 'wdio-selenium-standalone.log';
const log = logger_1.default('@wdio/selenium-standalone-service');
const DEFAULT_CONNECTION = {
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub'
};
class SeleniumStandaloneLauncher {
    constructor(_options, _capabilities, _config) {
        this._options = _options;
        this._capabilities = _capabilities;
        this._config = _config;
        this.watchMode = false;
        this._stopProcess = () => {
            if (this.process) {
                log.info('shutting down all browsers');
                this.process.kill();
            }
        };
        this.skipSeleniumInstall = Boolean(this._options.skipSeleniumInstall);
        if (this.isSimplifiedMode(this._options)) {
            this.args = Object.entries(this._options.drivers).reduce((acc, [browserDriver, version]) => {
                if (typeof version === 'string') {
                    acc.drivers[browserDriver] = { version };
                }
                else if (version === true) {
                    acc.drivers[browserDriver] = {};
                }
                return acc;
            }, { drivers: {} });
            this.installArgs = { ...this.args };
        }
        else {
            this.args = this._options.args || {};
            this.installArgs = this._options.installArgs || {};
        }
    }
    async onPrepare(config) {
        this.watchMode = Boolean(config.watch);
        if (!this.skipSeleniumInstall) {
            const install = util_1.promisify(SeleniumStandalone.install);
            await install(this.installArgs);
        }
        const capabilities = (Array.isArray(this._capabilities) ? this._capabilities : Object.values(this._capabilities));
        for (const capability of capabilities) {
            const cap = capability.capabilities || capability;
            const c = cap.alwaysMatch || cap;
            if (!config_1.isCloudCapability(c)) {
                Object.assign(c, DEFAULT_CONNECTION, { ...c });
            }
        }
        const start = util_1.promisify(SeleniumStandalone.start);
        this.process = await start(this.args);
        if (typeof this._config.outputDir === 'string') {
            this._redirectLogStream();
        }
        if (this.watchMode) {
            process.on('SIGINT', this._stopProcess);
            process.on('exit', this._stopProcess);
            process.on('uncaughtException', this._stopProcess);
        }
    }
    onComplete() {
        if (!this.watchMode) {
            this._stopProcess();
        }
    }
    _redirectLogStream() {
        var _a, _b;
        const logFile = utils_1.getFilePath(this._config.outputDir, DEFAULT_LOG_FILENAME);
        fs_extra_1.default.ensureFileSync(logFile);
        const logStream = fs_extra_1.default.createWriteStream(logFile, { flags: 'w' });
        (_a = this.process.stdout) === null || _a === void 0 ? void 0 : _a.pipe(logStream);
        (_b = this.process.stderr) === null || _b === void 0 ? void 0 : _b.pipe(logStream);
    }
    isSimplifiedMode(options) {
        return options.drivers && Object.keys(options.drivers).length > 0;
    }
}
exports.default = SeleniumStandaloneLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWlDO0FBQ2pDLHlDQUFnRDtBQUdoRCwrQkFBZ0M7QUFDaEMsd0RBQXlCO0FBQ3pCLHdFQUF5RDtBQUV6RCxtQ0FBcUM7QUFHckMsTUFBTSxvQkFBb0IsR0FBRyw4QkFBOEIsQ0FBQTtBQUMzRCxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUE7QUFFdkQsTUFBTSxrQkFBa0IsR0FBRztJQUN2QixRQUFRLEVBQUUsTUFBTTtJQUNoQixRQUFRLEVBQUUsV0FBVztJQUNyQixJQUFJLEVBQUUsSUFBSTtJQUNWLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUE7QUFZRCxNQUFxQiwwQkFBMEI7SUFjM0MsWUFDWSxRQUFtQyxFQUNuQyxhQUE4QyxFQUM5QyxPQUFpRDtRQUZqRCxhQUFRLEdBQVIsUUFBUSxDQUEyQjtRQUNuQyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUM7UUFDOUMsWUFBTyxHQUFQLE9BQU8sQ0FBMEM7UUFiN0QsY0FBUyxHQUFZLEtBQUssQ0FBQTtRQTJGMUIsaUJBQVksR0FBRyxHQUFTLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtnQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTthQUN0QjtRQUNMLENBQUMsQ0FBQTtRQWpGRyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUdyRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxN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