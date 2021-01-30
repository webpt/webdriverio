"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementTagName_1 = __importDefault(require("../scripts/getElementTagName"));
const utils_1 = require("../utils");
async function getElementTagName({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const page = this.getPageHandle(true);
    const result = await page.$eval('html', getElementTagName_1.default, elementHandle);
    return (result || '').toLowerCase();
}
exports.default = getElementTagName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudFRhZ05hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2V0RWxlbWVudFRhZ05hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxRkFBa0Q7QUFDbEQsb0NBQStDO0FBV2hDLEtBQUssVUFBVSxpQkFBaUIsQ0FFM0MsRUFBRSxTQUFTLEVBQXlCO0lBRXBDLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNoQixNQUFNLDRCQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0tBQ3hDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLDJCQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDL0QsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUN2QyxDQUFDO0FBWkQsb0NBWUMifQ==