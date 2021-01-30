"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const isElementDisplayed_1 = __importDefault(require("../../scripts/isElementDisplayed"));
const noW3CEndpoint = ['microsoftedge', 'safari', 'chrome', 'safari technology preview'];
async function isDisplayed() {
    var _a;
    const browser = utils_1.getBrowserObject(this);
    if (!await utils_1.hasElementId(this)) {
        return false;
    }
    const useAtom = (browser.isDevTools ||
        (browser.isW3C &&
            !browser.isMobile &&
            noW3CEndpoint.includes((_a = browser.capabilities.browserName) === null || _a === void 0 ? void 0 : _a.toLowerCase())));
    return useAtom
        ? await browser.execute(isElementDisplayed_1.default, {
            [constants_1.ELEMENT_KEY]: this.elementId,
            ELEMENT: this.elementId
        }) :
        await this.isElementDisplayed(this.elementId);
}
exports.default = isDisplayed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNEaXNwbGF5ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9pc0Rpc3BsYXllZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLCtDQUE2QztBQUM3Qyx1Q0FBNEQ7QUFDNUQsMEZBQXVFO0FBRXZFLE1BQU0sYUFBYSxHQUFHLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsMkJBQTJCLENBQUMsQ0FBQTtBQTJDekUsS0FBSyxVQUFVLFdBQVc7O0lBQ3JDLE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBRXRDLElBQUksQ0FBQyxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDM0IsT0FBTyxLQUFLLENBQUE7S0FDZjtJQVlELE1BQU0sT0FBTyxHQUFHLENBQ1osT0FBTyxDQUFDLFVBQVU7UUFDbEIsQ0FDSSxPQUFPLENBQUMsS0FBSztZQUNiLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDakIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFDLE9BQU8sQ0FBQyxZQUEwQyxDQUFDLFdBQVcsMENBQUUsV0FBVyxFQUFHLENBQUMsQ0FDMUcsQ0FDSixDQUFBO0lBRUQsT0FBTyxPQUFPO1FBQ1YsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyw0QkFBd0IsRUFBRTtZQUM5QyxDQUFDLHVCQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDSixDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDckQsQ0FBQztBQWhDRCw4QkFnQ0MifQ==