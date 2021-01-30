"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reporter_1 = __importDefault(require("@wdio/reporter"));
class CustomSmokeTestReporter extends reporter_1.default {
    onRunnerStart() {
        this.write('onRunnerStart\n');
    }
    onBeforeCommand() {
        this.write('onBeforeCommand\n');
    }
    onAfterCommand() {
        this.write('onAfterCommand\n');
    }
    onSuiteStart() {
        this.write('onSuiteStart\n');
    }
    onHookStart() {
        this.write('onHookStart\n');
    }
    onHookEnd() {
        this.write('onHookEnd\n');
    }
    onTestStart() {
        this.write('onTestStart\n');
    }
    onTestPass() {
        this.write('onTestPass\n');
    }
    onTestFail() {
        this.write('onTestFail\n');
    }
    onTestSkip() {
        this.write('onTestSkip\n');
    }
    onTestEnd() {
        this.write('onTestEnd\n');
    }
    onSuiteEnd() {
        this.write('onSuiteEnd\n');
    }
    onRunnerEnd() {
        this.write('onRunnerEnd\n');
    }
}
exports.default = CustomSmokeTestReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBeUM7QUFFekMsTUFBcUIsdUJBQXdCLFNBQVEsa0JBQVk7SUFDN0QsYUFBYTtRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBQ0QsZUFBZTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBQ0QsY0FBYztRQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBQ0QsWUFBWTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0QsV0FBVztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUNELFNBQVM7UUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBQ0QsVUFBVTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUNELFVBQVU7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFDRCxVQUFVO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUNELFVBQVU7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMvQixDQUFDO0NBQ0o7QUF4Q0QsMENBd0NDIn0=