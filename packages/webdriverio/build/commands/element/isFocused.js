"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const isFocused_1 = __importDefault(require("../../scripts/isFocused"));
async function isFocused() {
    const browser = await utils_1.getBrowserObject(this);
    return browser.execute(isFocused_1.default, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId
    });
}
exports.default = isFocused;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNGb2N1c2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2VsZW1lbnQvaXNGb2N1c2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQTZDO0FBQzdDLHVDQUE4QztBQUM5Qyx3RUFBcUQ7QUE0QnRDLEtBQUssVUFBVSxTQUFTO0lBQ25DLE1BQU0sT0FBTyxHQUFHLE1BQU0sd0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFlLEVBQUU7UUFDcEMsQ0FBQyx1QkFBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVM7UUFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO0tBQ0osQ0FBQyxDQUFBO0FBQzVCLENBQUM7QUFORCw0QkFNQyJ9