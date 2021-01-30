"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function deleteAllCookies() {
    const page = this.getPageHandle();
    const cookies = await page.cookies();
    for (const cookie of cookies) {
        await page.deleteCookie(cookie);
    }
    return null;
}
exports.default = deleteAllCookies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlQWxsQ29va2llcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kZWxldGVBbGxDb29raWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU2UsS0FBSyxVQUFVLGdCQUFnQjtJQUMxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFFcEMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDMUIsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ2xDO0lBRUQsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO0FBVEQsbUNBU0MifQ==