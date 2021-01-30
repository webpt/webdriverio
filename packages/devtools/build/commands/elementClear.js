"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elementClear_1 = __importDefault(require("../scripts/elementClear"));
const utils_1 = require("../utils");
async function elementClear({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    await page.$eval('html', elementClear_1.default, elementHandle);
    return null;
}
exports.default = elementClear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudENsZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2VsZW1lbnRDbGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJFQUE2QztBQUM3QyxvQ0FBK0M7QUFXaEMsS0FBSyxVQUFVLFlBQVksQ0FFdEMsRUFBRSxTQUFTLEVBQXlCO0lBRXBDLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNoQixNQUFNLDRCQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0tBQ3hDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLHNCQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDaEQsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO0FBWkQsK0JBWUMifQ==