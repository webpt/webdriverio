"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function navigateTo({ url }) {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.goto(url);
    return null;
}
exports.default = navigateTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGVUby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uYXZpZ2F0ZVRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBV2UsS0FBSyxVQUFVLFVBQVUsQ0FFcEMsRUFBRSxHQUFHLEVBQW1CO0lBS3hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTtJQUV4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BCLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQVpELDZCQVlDIn0=