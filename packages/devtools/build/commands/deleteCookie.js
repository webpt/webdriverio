"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function deleteCookie({ name }) {
    const page = this.getPageHandle();
    const cookies = await page.cookies();
    const cookieToDelete = cookies.find((cookie) => cookie.name === name);
    if (cookieToDelete) {
        await page.deleteCookie(cookieToDelete);
    }
    return null;
}
exports.default = deleteCookie;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlQ29va2llLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2RlbGV0ZUNvb2tpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVlLEtBQUssVUFBVSxZQUFZLENBRXRDLEVBQUUsSUFBSSxFQUFvQjtJQUUxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDcEMsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQTtJQUVyRSxJQUFJLGNBQWMsRUFBRTtRQUNoQixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUE7S0FDMUM7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFiRCwrQkFhQyJ9