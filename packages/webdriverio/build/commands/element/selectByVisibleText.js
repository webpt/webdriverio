"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function selectByVisibleText(text) {
    text = typeof text === 'number'
        ? text.toString()
        : text;
    const normalized = text
        .trim()
        .replace(/\s+/, ' ');
    const formatted = /"/.test(normalized)
        ? 'concat("' + normalized.split('"').join('", \'"\', "') + '")'
        : `"${normalized}"`;
    const dotFormat = `[. = ${formatted}]`;
    const spaceFormat = `[normalize-space(text()) = ${formatted}]`;
    const selections = [
        `./option${dotFormat}`,
        `./option${spaceFormat}`,
        `./optgroup/option${dotFormat}`,
        `./optgroup/option${spaceFormat}`,
    ];
    const optionElement = await this.findElementFromElement(this.elementId, 'xpath', selections.join('|'));
    if (optionElement && optionElement.error === 'no such element') {
        throw new Error(`Option with text "${text}" not found.`);
    }
    return this.elementClick(utils_1.getElementFromResponse(optionElement));
}
exports.default = selectByVisibleText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0QnlWaXNpYmxlVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lbGVtZW50L3NlbGVjdEJ5VmlzaWJsZVRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0Q7QUErQnJDLEtBQUssVUFBVSxtQkFBbUIsQ0FFN0MsSUFBcUI7SUFLckIsSUFBSSxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUVWLE1BQU0sVUFBVSxHQUFHLElBQUk7U0FDbEIsSUFBSSxFQUFFO1NBQ04sT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUt4QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUk7UUFDL0QsQ0FBQyxDQUFDLElBQUksVUFBVSxHQUFHLENBQUE7SUFDdkIsTUFBTSxTQUFTLEdBQUcsUUFBUSxTQUFTLEdBQUcsQ0FBQTtJQUN0QyxNQUFNLFdBQVcsR0FBRyw4QkFBOEIsU0FBUyxHQUFHLENBQUE7SUFFOUQsTUFBTSxVQUFVLEdBQUc7UUFDZixXQUFXLFNBQVMsRUFBRTtRQUN0QixXQUFXLFdBQVcsRUFBRTtRQUN4QixvQkFBb0IsU0FBUyxFQUFFO1FBQy9CLG9CQUFvQixXQUFXLEVBQUU7S0FDcEMsQ0FBQTtJQUVELE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUV0RyxJQUFJLGFBQWEsSUFBSyxhQUFxQixDQUFDLEtBQUssS0FBSyxpQkFBaUIsRUFBRTtRQUNyRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixJQUFJLGNBQWMsQ0FBQyxDQUFBO0tBQzNEO0lBS0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLDhCQUFzQixDQUFDLGFBQWEsQ0FBVyxDQUFDLENBQUE7QUFDN0UsQ0FBQztBQXpDRCxzQ0F5Q0MifQ==