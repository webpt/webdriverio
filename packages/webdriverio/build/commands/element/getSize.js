"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function getSize(prop) {
    let rect = {};
    if (this.isW3C) {
        rect = await utils_1.getElementRect(this);
    }
    else {
        rect = await this.getElementSize(this.elementId);
    }
    if (prop && rect[prop]) {
        return rect[prop];
    }
    return {
        width: rect.width,
        height: rect.height
    };
}
exports.default = getSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lbGVtZW50L2dldFNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSx1Q0FBNEM7QUE2QjdCLEtBQUssVUFBVSxPQUFPLENBRWpDLElBQXVCO0lBRXZCLElBQUksSUFBSSxHQUF3QixFQUFFLENBQUE7SUFFbEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1osSUFBSSxHQUFHLE1BQU0sc0JBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUNwQztTQUFNO1FBQ0gsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFlLENBQUE7S0FDakU7SUFFRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDcEI7SUFFRCxPQUFPO1FBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1FBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtLQUN0QixDQUFBO0FBQ0wsQ0FBQztBQXBCRCwwQkFvQkMifQ==