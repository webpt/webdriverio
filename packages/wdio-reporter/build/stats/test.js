"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnable_1 = __importDefault(require("./runnable"));
class TestStats extends runnable_1.default {
    constructor(test) {
        super('test');
        this.uid = runnable_1.default.getIdentifier(test);
        this.cid = test.cid;
        this.title = test.title;
        this.fullTitle = test.fullTitle;
        this.output = [];
        this.argument = test.argument;
        this.retries = test.retries;
        this.state = 'pending';
    }
    pass() {
        this.complete();
        this.state = 'passed';
    }
    skip(reason) {
        this.pendingReason = reason;
        this.state = 'skipped';
    }
    fail(errors) {
        this.complete();
        this.state = 'failed';
        this.errors = errors;
        if (errors && errors.length) {
            this.error = errors[0];
        }
    }
}
exports.default = TestStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdGF0cy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQXNDO0FBdUN0QyxNQUFxQixTQUFVLFNBQVEsa0JBQWE7SUFrQmhELFlBQVksSUFBVTtRQUNsQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLGtCQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7UUFNM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUE7SUFDMUIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQWM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQTtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQWdCO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBRXBCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDekI7SUFDTCxDQUFDO0NBQ0o7QUF0REQsNEJBc0RDIn0=