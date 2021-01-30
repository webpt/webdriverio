"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const isElementInViewport_1 = __importDefault(require("../../scripts/isElementInViewport"));
async function isDisplayedInViewport() {
    if (!await this.isDisplayed()) {
        return false;
    }
    const browser = utils_1.getBrowserObject(this);
    return browser.execute(isElementInViewport_1.default, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId
    });
}
exports.default = isDisplayedInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNEaXNwbGF5ZWRJblZpZXdwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2VsZW1lbnQvaXNEaXNwbGF5ZWRJblZpZXdwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQTZDO0FBQzdDLHVDQUE4QztBQUM5Qyw0RkFBeUU7QUFzQzFELEtBQUssVUFBVSxxQkFBcUI7SUFDL0MsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQzNCLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7SUFFRCxNQUFNLE9BQU8sR0FBRyx3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsNkJBQXlCLEVBQUU7UUFDOUMsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVM7UUFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO0tBQ0osQ0FBQyxDQUFBO0FBQzVCLENBQUM7QUFWRCx3Q0FVQyJ9