"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const getElementObject_1 = require("../../utils/getElementObject");
const constants_1 = require("../../constants");
async function $(selector) {
    if (selector && typeof selector[constants_1.ELEMENT_KEY] === 'string') {
        return getElementObject_1.getElement.call(this, undefined, selector);
    }
    const res = await utils_1.findElement.call(this, selector);
    return getElementObject_1.getElement.call(this, selector, res);
}
exports.default = $;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiJC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lbGVtZW50LyQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx1Q0FBeUM7QUFDekMsbUVBQXlEO0FBQ3pELCtDQUE2QztBQXlEOUIsS0FBSyxVQUFVLENBQUMsQ0FFM0IsUUFBa0I7SUFNbEIsSUFBSSxRQUFRLElBQUksT0FBUSxRQUE2QixDQUFDLHVCQUFXLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDN0UsT0FBTyw2QkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQTRCLENBQUMsQ0FBQTtLQUN4RTtJQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2xELE9BQU8sNkJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUMvQyxDQUFDO0FBZEQsb0JBY0MifQ==