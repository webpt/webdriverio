"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
async function getWindowRect() {
    const page = this.getPageHandle();
    const viewport = await page.viewport() || {};
    return Object.assign({ width: constants_1.DEFAULT_WIDTH, height: constants_1.DEFAULT_HEIGHT, x: 0, y: 0 }, viewport);
}
exports.default = getWindowRect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0V2luZG93UmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nZXRXaW5kb3dSZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTREO0FBVzdDLEtBQUssVUFBVSxhQUFhO0lBQ3ZDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUNqQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFDNUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUNoQixFQUFFLEtBQUssRUFBRSx5QkFBYSxFQUFFLE1BQU0sRUFBRSwwQkFBYyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUM1RCxRQUFRLENBQ1gsQ0FBQTtBQUNMLENBQUM7QUFQRCxnQ0FPQyJ9