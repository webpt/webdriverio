"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementRect_1 = __importDefault(require("../scripts/getElementRect"));
const utils_1 = require("../utils");
async function getElementRect({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    return page.$eval('html', getElementRect_1.default, elementHandle);
}
exports.default = getElementRect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudFJlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2V0RWxlbWVudFJlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrRUFBK0M7QUFDL0Msb0NBQStDO0FBV2hDLEtBQUssVUFBVSxjQUFjLENBRXhDLEVBQUUsU0FBUyxFQUF5QjtJQUVwQyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzVELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDaEIsTUFBTSw0QkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUN4QztJQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSx3QkFBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQ3JELENBQUM7QUFYRCxpQ0FXQyJ9