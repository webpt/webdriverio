"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnable_1 = __importDefault(require("./runnable"));
class HookStats extends runnable_1.default {
    constructor(runner) {
        super('hook');
        this.uid = runnable_1.default.getIdentifier(runner);
        this.cid = runner.cid;
        this.title = runner.title;
        this.parent = runner.parent;
        this.currentTest = runner.currentTest;
    }
    complete(errors) {
        this.errors = errors;
        if (errors && errors.length) {
            this.error = errors[0];
            this.state = 'failed';
        }
        super.complete();
    }
}
exports.default = HookStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdGF0cy9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQXNDO0FBa0J0QyxNQUFxQixTQUFVLFNBQVEsa0JBQWE7SUFVaEQsWUFBYSxNQUFZO1FBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFBO0lBQ3pDLENBQUM7SUFFRCxRQUFRLENBQUUsTUFBZ0I7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQTtTQUN4QjtRQUVELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0NBQ0o7QUE1QkQsNEJBNEJDIn0=