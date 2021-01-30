"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runnable_1 = __importDefault(require("./runnable"));
class SuiteStats extends runnable_1.default {
    constructor(suite) {
        super(suite.type || 'suite');
        this.tests = [];
        this.hooks = [];
        this.suites = [];
        this.hooksAndTests = [];
        this.uid = runnable_1.default.getIdentifier(suite);
        this.cid = suite.cid;
        this.title = suite.title;
        this.fullTitle = suite.fullTitle;
        this.tags = suite.tags;
        this.description = suite.description;
    }
}
exports.default = SuiteStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHMvc3VpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSwwREFBc0M7QUFxQnRDLE1BQXFCLFVBQVcsU0FBUSxrQkFBYTtJQWVqRCxZQUFhLEtBQVk7UUFDckIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUE7UUFWaEMsVUFBSyxHQUFnQixFQUFFLENBQUE7UUFDdkIsVUFBSyxHQUFnQixFQUFFLENBQUE7UUFDdkIsV0FBTSxHQUFpQixFQUFFLENBQUE7UUFJekIsa0JBQWEsR0FBOEIsRUFBRSxDQUFBO1FBS3pDLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUE7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1FBSXRCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQTtJQUN4QyxDQUFDO0NBQ0o7QUEzQkQsNkJBMkJDIn0=