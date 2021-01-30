"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const css_shorthand_properties_1 = __importDefault(require("css-shorthand-properties"));
const utils_1 = require("../../utils");
async function getCSSProperty(cssProperty) {
    if (!css_shorthand_properties_1.default.isShorthand(cssProperty)) {
        const cssValue = await this.getElementCSSValue(this.elementId, cssProperty);
        return utils_1.parseCSS(cssValue, cssProperty);
    }
    const properties = css_shorthand_properties_1.default.expand(cssProperty);
    let cssValues = await Promise.all(properties.map((prop) => this.getElementCSSValue(this.elementId, prop)));
    while ((cssValues.length % 2) === 0) {
        const mergedValues = [
            cssValues.slice(0, cssValues.length / 2).join(' '),
            cssValues.slice(cssValues.length / 2).join(' ')
        ];
        const hasEqualProperties = mergedValues.every((v) => v === mergedValues[0]);
        if (!hasEqualProperties) {
            break;
        }
        cssValues = cssValues.slice(0, cssValues.length / 2);
    }
    return utils_1.parseCSS(cssValues.join(' '), cssProperty);
}
exports.default = getCSSProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q1NTUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9nZXRDU1NQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdGQUF3RDtBQUN4RCx1Q0FBc0M7QUF1RXZCLEtBQUssVUFBVSxjQUFjLENBRXhDLFdBQW1CO0lBUW5CLElBQUksQ0FBQyxrQ0FBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDN0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUMzRSxPQUFPLGdCQUFRLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0tBQ3pDO0lBRUQsTUFBTSxVQUFVLEdBQUcsa0NBQWlCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3hELElBQUksU0FBUyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDN0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDMUUsQ0FBQTtJQU9ELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQyxNQUFNLFlBQVksR0FBRztZQUNqQixTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDbEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbEQsQ0FBQTtRQUVELE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNyQixNQUFLO1NBQ1I7UUFFRCxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUN2RDtJQUVELE9BQU8sZ0JBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBQ3JELENBQUM7QUF4Q0QsaUNBd0NDIn0=