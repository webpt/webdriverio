"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
async function elementSendKeys({ elementId, text }) {
    var _a, _b;
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    await elementHandle.focus();
    const page = this.getPageHandle();
    const propertyHandles = {
        tagName: await elementHandle.getProperty('tagName'),
        type: await elementHandle.getProperty('type')
    };
    const tagName = await ((_a = propertyHandles.tagName) === null || _a === void 0 ? void 0 : _a.jsonValue());
    const type = await ((_b = propertyHandles.type) === null || _b === void 0 ? void 0 : _b.jsonValue());
    if (tagName === 'INPUT' && type === 'file') {
        const paths = (text || '').split('\n').map(p => path_1.default.resolve(p));
        await elementHandle.uploadFile(...paths);
    }
    else {
        await page.keyboard.type(text);
    }
    return null;
}
exports.default = elementSendKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudFNlbmRLZXlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2VsZW1lbnRTZW5kS2V5cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF1QjtBQUV2QixvQ0FBK0M7QUFjaEMsS0FBSyxVQUFVLGVBQWUsQ0FFekMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUF1Qzs7SUFFeEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUU1RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2hCLE1BQU0sNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEM7SUFFRCxNQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsTUFBTSxlQUFlLEdBQUc7UUFDcEIsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7UUFDbkQsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7S0FDaEQsQ0FBQTtJQUVELE1BQU0sT0FBTyxHQUFHLGFBQU0sZUFBZSxDQUFDLE9BQU8sMENBQUUsU0FBUyxHQUF1QixDQUFBO0lBQy9FLE1BQU0sSUFBSSxHQUFHLGFBQU0sZUFBZSxDQUFDLElBQUksMENBQUUsU0FBUyxHQUF1QixDQUFBO0lBQ3pFLElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEUsTUFBTSxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUE7S0FDM0M7U0FBTTtRQUNILE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDakM7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUEzQkQsa0NBMkJDIn0=