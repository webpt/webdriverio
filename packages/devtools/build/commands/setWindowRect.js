"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function setWindowRect(params) {
    const page = this.getPageHandle();
    await page.setViewport(params);
    return { width: params.width, height: params.height };
}
exports.default = setWindowRect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0V2luZG93UmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZXRXaW5kb3dSZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBY2UsS0FBSyxVQUFVLGFBQWEsQ0FFdkMsTUFBeUM7SUFFekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ2pDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM5QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUN6RCxDQUFDO0FBUEQsZ0NBT0MifQ==