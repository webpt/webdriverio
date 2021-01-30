"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = __importDefault(require("./repl"));
class ReplQueue {
    constructor() {
        this._repls = [];
    }
    add(childProcess, options, onStart, onEnd) {
        this._repls.push({ childProcess, options, onStart, onEnd });
    }
    next() {
        if (this.isRunning || this._repls.length === 0) {
            return;
        }
        const nextRepl = this._repls.shift();
        if (!nextRepl) {
            return;
        }
        const { childProcess, options, onStart, onEnd } = nextRepl;
        const runningRepl = this.runningRepl = new repl_1.default(childProcess, options);
        onStart();
        runningRepl.start().then(() => {
            const ev = {
                origin: 'debugger',
                name: 'stop'
            };
            runningRepl.childProcess.send(ev);
            onEnd(ev);
            delete this.runningRepl;
            this.next();
        });
    }
    get isRunning() {
        return Boolean(this.runningRepl);
    }
}
exports.default = ReplQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbFF1ZXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JlcGxRdWV1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLGtEQUE2QjtBQWE3QixNQUFxQixTQUFTO0lBQTlCO1FBQ1ksV0FBTSxHQUFXLEVBQUUsQ0FBQTtJQXFDL0IsQ0FBQztJQWxDRyxHQUFHLENBQUUsWUFBMEIsRUFBRSxPQUFZLEVBQUUsT0FBaUIsRUFBRSxLQUFlO1FBQzdFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUMsT0FBTTtTQUNUO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsT0FBTTtTQUNUO1FBRUQsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQTtRQUMxRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksY0FBUSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUUxRSxPQUFPLEVBQUUsQ0FBQTtRQUNULFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzFCLE1BQU0sRUFBRSxHQUFHO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUE7WUFDRCxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNqQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7WUFFVCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7Q0FDSjtBQXRDRCw0QkFzQ0MifQ==