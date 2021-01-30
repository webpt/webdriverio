"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const getWebElement = (el) => ({
    [constants_1.ELEMENT_KEY]: el.elementId,
    ELEMENT: el.elementId
});
async function isEqual(el) {
    const browser = utils_1.getBrowserObject(this);
    if (browser.isMobile) {
        const context = await browser.getContext();
        if (context === null || context === void 0 ? void 0 : context.toLowerCase().includes('native')) {
            return this.elementId === el.elementId;
        }
    }
    let result;
    try {
        result = await browser.execute((el1, el2) => el1 === el2, getWebElement(this), getWebElement(el));
    }
    catch (err) {
        result = false;
    }
    return result;
}
exports.default = isEqual;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFcXVhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lbGVtZW50L2lzRXF1YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBNkM7QUFDN0MsdUNBQThDO0FBRTlDLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDLHVCQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUztJQUMzQixPQUFPLEVBQUUsRUFBRSxDQUFDLFNBQVM7Q0FDeEIsQ0FBQyxDQUFBO0FBd0JhLEtBQUssVUFBVSxPQUFPLENBRWpDLEVBQXVCO0lBRXZCLE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBR3RDLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNsQixNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMxQyxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsR0FBRztZQUMzQyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQTtTQUN6QztLQUNKO0lBR0QsSUFBSSxNQUFlLENBQUE7SUFDbkIsSUFBSTtRQUNBLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBRTFCLENBQUMsR0FBd0IsRUFBRSxHQUF3QixFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUNuRSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDOUM7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sR0FBRyxLQUFLLENBQUE7S0FDakI7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO0FBMUJELDBCQTBCQyJ9