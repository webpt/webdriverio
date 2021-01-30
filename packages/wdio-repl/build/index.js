"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vm_1 = __importDefault(require("vm"));
const repl_1 = __importDefault(require("repl"));
const utils_1 = require("@wdio/utils");
const constants_1 = require("./constants");
class WDIORepl {
    constructor(config) {
        this._isCommandRunning = false;
        this._config = Object.assign(constants_1.DEFAULT_CONFIG, { eval: this.eval.bind(this) }, config);
    }
    eval(cmd, context, filename, callback) {
        if (this._isCommandRunning) {
            return;
        }
        if (cmd && constants_1.STATIC_RETURNS[cmd.trim()]) {
            return callback(null, constants_1.STATIC_RETURNS[cmd.trim()]);
        }
        vm_1.default.createContext(context);
        this._isCommandRunning = true;
        if (utils_1.hasWdioSyncSupport) {
            return utils_1.runFnInFiberContext(() => this._runCmd(cmd, context, callback))();
        }
        return this._runCmd(cmd, context, callback);
    }
    _runCmd(cmd, context, callback) {
        try {
            const result = vm_1.default.runInContext(cmd, context);
            return this._handleResult(result, callback);
        }
        catch (e) {
            this._isCommandRunning = false;
            return callback(e, undefined);
        }
    }
    _handleResult(result, callback) {
        if (!result || typeof result.then !== 'function') {
            this._isCommandRunning = false;
            return callback(null, result);
        }
        let timeoutCalled = false;
        const timeout = setTimeout(() => {
            callback(new Error('Command execution timed out'), undefined);
            this._isCommandRunning = false;
            timeoutCalled = true;
        }, this._config.commandTimeout);
        result.then((res) => {
            if (timeoutCalled) {
                return;
            }
            this._isCommandRunning = false;
            clearTimeout(timeout);
            return callback(null, res);
        }, (e) => {
            if (timeoutCalled) {
                return;
            }
            this._isCommandRunning = false;
            clearTimeout(timeout);
            const errorMessage = e ? e.message : 'Command execution timed out';
            const commandError = new Error(errorMessage);
            delete commandError.stack;
            return callback(commandError, undefined);
        });
    }
    start(context) {
        if (this._replServer) {
            throw new Error('a repl was already initialised');
        }
        if (context) {
            const evalFn = this._config.eval;
            this._config.eval = function (cmd, _, filename, callback) {
                return evalFn.call(this, cmd, context, filename, callback);
            };
        }
        this._replServer = repl_1.default.start(this._config);
        return new Promise((resolve) => {
            return this._replServer.on('exit', resolve);
        });
    }
}
exports.default = WDIORepl;
WDIORepl.introMessage = constants_1.INTRO_MESSAGE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFnQ0EsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUV2Qix1Q0FBcUU7QUFFckUsMkNBQTJFO0FBWTNFLE1BQXFCLFFBQVE7SUFNekIsWUFBWSxNQUFtQjtRQUh2QixzQkFBaUIsR0FBRyxLQUFLLENBQUE7UUFJN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN4QiwwQkFBYyxFQUNkLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQzlCLE1BQU0sQ0FDVCxDQUFBO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBRSxHQUFXLEVBQUUsT0FBbUIsRUFBRSxRQUE0QixFQUFFLFFBQXNCO1FBQ3hGLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLE9BQU07U0FDVDtRQUVELElBQUksR0FBRyxJQUFJLDBCQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDbkMsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLDBCQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUNwRDtRQUVELFlBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQTtRQUc3QixJQUFJLDBCQUFrQixFQUFFO1lBQ3BCLE9BQU8sMkJBQW1CLENBQ3RCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUE7U0FDcEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMvQyxDQUFD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