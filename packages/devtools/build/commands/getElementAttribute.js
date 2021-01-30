"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementAttribute_1 = __importDefault(require("../scripts/getElementAttribute"));
const utils_1 = require("../utils");
async function getElementAttribute({ elementId, name }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementAttribute_1.default, elementHandle, name);
}
exports.default = getElementAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudEF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nZXRFbGVtZW50QXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUZBQW9EO0FBQ3BELG9DQUErQztBQVloQyxLQUFLLFVBQVUsbUJBQW1CLENBRTdDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBdUM7SUFFeEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM1RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2hCLE1BQU0sNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEM7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsNkJBQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDM0QsQ0FBQztBQVhELHNDQVdDIn0=