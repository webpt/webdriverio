"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const getProperty_1 = __importDefault(require("../../scripts/getProperty"));
function getProperty(property) {
    if (this.isW3C) {
        return this.getElementProperty(this.elementId, property);
    }
    const browser = utils_1.getBrowserObject(this);
    return browser.execute(getProperty_1.default, { ELEMENT: this.elementId }, property);
}
exports.default = getProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9nZXRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUE4QztBQUM5Qyw0RUFBeUQ7QUFrQnpELFNBQXdCLFdBQVcsQ0FFL0IsUUFBZ0I7SUFFaEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUMzRDtJQUVELE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FDbEIscUJBQWlCLEVBQ2pCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQXdCLEVBQ2pELFFBQVEsQ0FDWCxDQUFBO0FBQ0wsQ0FBQztBQWRELDhCQWNDIn0=