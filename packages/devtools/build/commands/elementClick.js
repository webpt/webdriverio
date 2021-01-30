"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementTagName_1 = __importDefault(require("./getElementTagName"));
const selectOption_1 = __importDefault(require("../scripts/selectOption"));
const utils_1 = require("../utils");
async function elementClick({ elementId }) {
    const page = this.getPageHandle();
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const tagName = await getElementTagName_1.default.call(this, { elementId });
    if (tagName === 'option') {
        return page.$eval('html', selectOption_1.default, elementHandle);
    }
    return new Promise((resolve, reject) => {
        const dialogHandler = () => resolve(null);
        page.once('dialog', dialogHandler);
        return elementHandle.click().then(() => {
            page.removeListener('dialog', dialogHandler);
            resolve(null);
        }).catch(reject);
    });
}
exports.default = elementClick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudENsaWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2VsZW1lbnRDbGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUFtRDtBQUNuRCwyRUFBd0Q7QUFDeEQsb0NBQStDO0FBY2hDLEtBQUssVUFBVSxZQUFZLENBRXRDLEVBQUUsU0FBUyxFQUF5QjtJQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUU1RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2hCLE1BQU0sNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEM7SUFPRCxNQUFNLE9BQU8sR0FBRyxNQUFNLDJCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBO0lBQ2pFLElBQUksT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLHNCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFBO0tBQy9EO0lBS0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUtuQyxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDbEMsT0FBTyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUluQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQTtZQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQXZDRCwrQkF1Q0MifQ==