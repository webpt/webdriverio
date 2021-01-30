"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementCSSValue_1 = __importDefault(require("../scripts/getElementCSSValue"));
const utils_1 = require("../utils");
async function getElementCSSValue({ elementId, propertyName }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementCSSValue_1.default, elementHandle, propertyName);
}
exports.default = getElementCSSValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudENTU1ZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dldEVsZW1lbnRDU1NWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVGQUFtRDtBQUNuRCxvQ0FBK0M7QUFhaEMsS0FBSyxVQUFVLGtCQUFrQixDQUU1QyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQStDO0lBRXhFLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNoQixNQUFNLDRCQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0tBQ3hDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLDRCQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ25FLENBQUM7QUFYRCxxQ0FXQyJ9