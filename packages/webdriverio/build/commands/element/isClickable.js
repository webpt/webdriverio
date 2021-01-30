"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const isElementClickable_1 = __importDefault(require("../../scripts/isElementClickable"));
async function isClickable() {
    if (!await this.isDisplayed()) {
        return false;
    }
    const browser = utils_1.getBrowserObject(this);
    return browser.execute(isElementClickable_1.default, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId
    });
}
exports.default = isClickable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNDbGlja2FibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9pc0NsaWNrYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtDQUE2QztBQUM3Qyx1Q0FBOEM7QUFDOUMsMEZBQXVFO0FBc0N4RCxLQUFLLFVBQVUsV0FBVztJQUNyQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDM0IsT0FBTyxLQUFLLENBQUE7S0FDZjtJQUVELE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyw0QkFBd0IsRUFBRTtRQUM3QyxDQUFDLHVCQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUztRQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVM7S0FDSixDQUFDLENBQUE7QUFDNUIsQ0FBQztBQVZELDhCQVVDIn0=