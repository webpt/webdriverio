"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function switchToParentFrame() {
    const page = this.getPageHandle(true);
    if (typeof page.parentFrame !== 'function') {
        return null;
    }
    this.currentFrame = await page.parentFrame();
    return null;
}
exports.default = switchToParentFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoVG9QYXJlbnRGcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zd2l0Y2hUb1BhcmVudEZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBV2UsS0FBSyxVQUFVLG1CQUFtQjtJQUM3QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBcUIsQ0FBQTtJQU16RCxJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7UUFDeEMsT0FBTyxJQUFJLENBQUE7S0FDZDtJQUtELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFxQixDQUFBO0lBQy9ELE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQWhCRCxzQ0FnQkMifQ==