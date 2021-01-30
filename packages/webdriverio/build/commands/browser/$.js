"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const getElementObject_1 = require("../../utils/getElementObject");
const constants_1 = require("../../constants");
async function $(selector) {
    if (typeof selector === 'object' && typeof selector[constants_1.ELEMENT_KEY] === 'string') {
        return getElementObject_1.getElement.call(this, undefined, selector);
    }
    const res = await utils_1.findElement.call(this, selector);
    return getElementObject_1.getElement.call(this, selector, res);
}
exports.default = $;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiJC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyLyQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFDekMsbUVBQXlEO0FBQ3pELCtDQUE2QztBQXlEOUIsS0FBSyxVQUFVLENBQUMsQ0FFM0IsUUFBa0I7SUFNbEIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksT0FBTyxRQUFRLENBQUMsdUJBQVcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUMzRSxPQUFPLDZCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDcEQ7SUFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNsRCxPQUFPLDZCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3pELENBQUM7QUFkRCxvQkFjQyJ9