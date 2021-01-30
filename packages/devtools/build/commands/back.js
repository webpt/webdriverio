"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function back() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.goBack();
    return null;
}
exports.default = back;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9iYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVWUsS0FBSyxVQUFVLElBQUk7SUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUVqQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNuQixPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFORCx1QkFNQyJ9