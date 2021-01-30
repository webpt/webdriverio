"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnable_1 = __importDefault(require("./runnable"));
const utils_1 = require("../utils");
class RunnerStats extends runnable_1.default {
    constructor(runner) {
        super('runner');
        this.cid = runner.cid;
        this.capabilities = runner.capabilities;
        this.sanitizedCapabilities = utils_1.sanitizeCaps(runner.capabilities);
        this.config = runner.config;
        this.specs = runner.specs;
        this.sessionId = runner.sessionId;
        this.isMultiremote = runner.isMultiremote;
        this.retry = runner.retry;
    }
}
exports.default = RunnerStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0YXRzL3J1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDBEQUFzQztBQUN0QyxvQ0FBdUM7QUFrQnZDLE1BQXFCLFdBQVksU0FBUSxrQkFBYTtJQVlsRCxZQUFhLE1BQWM7UUFDdkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQTtRQUN2QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFBO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUM3QixDQUFDO0NBQ0o7QUF2QkQsOEJBdUJDIn0=