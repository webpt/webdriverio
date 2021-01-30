"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const reporter_1 = __importDefault(require("@wdio/reporter"));
class DotReporter extends reporter_1.default {
    constructor(options) {
        super(Object.assign({ stdout: true }, options));
    }
    onTestSkip() {
        this.write(chalk_1.default.cyanBright('.'));
    }
    onTestPass() {
        this.write(chalk_1.default.greenBright('.'));
    }
    onTestFail() {
        this.write(chalk_1.default.redBright('F'));
    }
}
exports.default = DotReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBeUI7QUFDekIsOERBQXlDO0FBTXpDLE1BQXFCLFdBQVksU0FBUSxrQkFBWTtJQUNqRCxZQUFZLE9BQTBCO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUtELFVBQVU7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBS0QsVUFBVTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFLRCxVQUFVO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDcEMsQ0FBQztDQUNKO0FBekJELDhCQXlCQyJ9