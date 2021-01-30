"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function forward() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.goForward();
    return null;
}
exports.default = forward;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yd2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9mb3J3YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU2UsS0FBSyxVQUFVLE9BQU87SUFDakMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUNqQyxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUN0QixPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFMRCwwQkFLQyJ9