"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const getHTML_1 = __importDefault(require("../../scripts/getHTML"));
function getHTML(includeSelectorTag = true) {
    const browser = utils_1.getBrowserObject(this);
    return browser.execute(getHTML_1.default, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId
    }, includeSelectorTag);
}
exports.default = getHTML;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SFRNTC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lbGVtZW50L2dldEhUTUwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQ0FBNkM7QUFDN0MsdUNBQThDO0FBQzlDLG9FQUFpRDtBQWdDakQsU0FBd0IsT0FBTyxDQUUzQixrQkFBa0IsR0FBRyxJQUFJO0lBRXpCLE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBYSxFQUFFO1FBQ2xDLENBQUMsdUJBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUztLQUNKLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUNoRCxDQUFDO0FBVEQsMEJBU0MifQ==