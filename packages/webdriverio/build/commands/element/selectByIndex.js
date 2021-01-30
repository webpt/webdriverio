"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function selectByIndex(index) {
    if (index < 0) {
        throw new Error('Index needs to be 0 or any other positive number');
    }
    const optionElements = await this.findElementsFromElement(this.elementId, 'css selector', 'option');
    if (optionElements.length === 0) {
        throw new Error('Select element doesn\'t contain any option element');
    }
    if (optionElements.length - 1 < index) {
        throw new Error(`Option with index "${index}" not found. Select element only contains ${optionElements.length} option elements`);
    }
    return this.elementClick(utils_1.getElementFromResponse(optionElements[index]));
}
exports.default = selectByIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0QnlJbmRleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lbGVtZW50L3NlbGVjdEJ5SW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0Q7QUErQnJDLEtBQUssVUFBVSxhQUFhLENBRXZDLEtBQWE7SUFLYixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7S0FDdEU7SUFLRCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRyxRQUFRLENBQUMsQ0FBQTtJQUVwRyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtLQUN4RTtJQUVELElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLEtBQUssNkNBQTZDLGNBQWMsQ0FBQyxNQUFNLGtCQUFrQixDQUFDLENBQUE7S0FDbkk7SUFLRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsOEJBQXNCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFXLENBQUMsQ0FBQTtBQUNyRixDQUFDO0FBNUJELGdDQTRCQyJ9