"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function refresh() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.reload();
    return null;
}
exports.default = refresh;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZWZyZXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUWUsS0FBSyxVQUFVLE9BQU87SUFDakMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBRXhCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUNqQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNuQixPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFORCwwQkFNQyJ9