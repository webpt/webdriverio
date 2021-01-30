"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function addValue(value, { translateToUnicode = true } = {}) {
    if (!this.isW3C) {
        return this.elementSendKeys(this.elementId, utils_1.transformToCharString(value, translateToUnicode));
    }
    return this.elementSendKeys(this.elementId, utils_1.transformToCharString(value, translateToUnicode).join(''));
}
exports.default = addValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9hZGRWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFtRDtBQWlDbkQsU0FBd0IsUUFBUSxDQUU1QixLQUFzRCxFQUN0RCxFQUFFLGtCQUFrQixHQUFHLElBQUksS0FBc0IsRUFBRTtJQUVuRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDZCQUFxQixDQUFDLEtBQWlCLEVBQUUsa0JBQWtCLENBQWtCLENBQUMsQ0FBQTtLQUM3SDtJQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDZCQUFxQixDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzFHLENBQUM7QUFWRCwyQkFVQyJ9