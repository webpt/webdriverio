"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = __importDefault(require("@wdio/repl"));
class WDIORunnerRepl extends repl_1.default {
    constructor(childProcess, options) {
        super(options);
        this.commandIsRunning = false;
        this.childProcess = childProcess;
    }
    _getError(params) {
        if (!params.error) {
            return null;
        }
        const err = new Error(params.message);
        err.stack = params.stack;
        return err;
    }
    eval(cmd, context, filename, callback) {
        if (this.commandIsRunning) {
            return;
        }
        this.commandIsRunning = true;
        this.childProcess.send({
            origin: 'debugger',
            name: 'eval',
            content: { cmd }
        });
        this.callback = callback;
    }
    onResult(params) {
        const error = this._getError(params);
        if (this.callback) {
            this.callback(error, params.result);
        }
        this.commandIsRunning = false;
    }
    start(context) {
        this.childProcess.send({
            origin: 'debugger',
            name: 'start'
        });
        return super.start(context);
    }
}
exports.default = WDIORunnerRepl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsc0RBQStEO0FBRy9ELE1BQXFCLGNBQWUsU0FBUSxjQUFRO0lBS2hELFlBQWEsWUFBMEIsRUFBRSxPQUFtQjtRQUN4RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFIbEIscUJBQWdCLEdBQUcsS0FBSyxDQUFBO1FBSXBCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0lBQ3BDLENBQUM7SUFFTyxTQUFTLENBQUUsTUFBVztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFBO1NBQ2Q7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckMsR0FBRyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQ3hCLE9BQU8sR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQUVELElBQUksQ0FBRSxHQUFXLEVBQUUsT0FBbUIsRUFBRSxRQUFnQixFQUFFLFFBQXNCO1FBQzVFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLE9BQU07U0FDVDtRQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUE7UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLFVBQVU7WUFDbEIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUU7U0FDbkIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7SUFDNUIsQ0FBQztJQUVELFFBQVEsQ0FBRSxNQUFXO1FBQ2pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQTtJQUNqQyxDQUFDO0lBRUQsS0FBSyxDQUFFLE9BQW9CO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQTtRQUVGLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvQixDQUFDO0NBQ0o7QUFyREQsaUNBcURDIn0=