"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function selectByAttribute(attribute, value) {
    value = typeof value === 'number'
        ? value.toString()
        : value;
    const normalized = `[normalize-space(@${attribute.trim()}) = "${value.trim()}"]`;
    const optionElement = await this.findElementFromElement(this.elementId, 'xpath', `./option${normalized}|./optgroup/option${normalized}`);
    if (optionElement && optionElement.error === 'no such element') {
        throw new Error(`Option with attribute "${attribute}=${value}" not found.`);
    }
    return this.elementClick(utils_1.getElementFromResponse(optionElement));
}
exports.default = selectByAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0QnlBdHRyaWJ1dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9zZWxlY3RCeUF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFvRDtBQXFDckMsS0FBSyxVQUFVLGlCQUFpQixDQUUzQyxTQUFpQixFQUNqQixLQUFzQjtJQUt0QixLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUTtRQUM3QixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUNsQixDQUFDLENBQUMsS0FBSyxDQUFBO0lBS1gsTUFBTSxVQUFVLEdBQUcscUJBQXFCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQTtJQUNoRixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FDbkQsSUFBSSxDQUFDLFNBQVMsRUFDZCxPQUFPLEVBQ1AsV0FBVyxVQUFVLHFCQUFxQixVQUFVLEVBQUUsQ0FDekQsQ0FBQTtJQUVELElBQUksYUFBYSxJQUFLLGFBQXFCLENBQUMsS0FBSyxLQUFLLGlCQUFpQixFQUFFO1FBQ3JFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLFNBQVMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxDQUFBO0tBQzlFO0lBS0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLDhCQUFzQixDQUFDLGFBQWEsQ0FBVyxDQUFDLENBQUE7QUFDN0UsQ0FBQztBQTlCRCxvQ0E4QkMifQ==