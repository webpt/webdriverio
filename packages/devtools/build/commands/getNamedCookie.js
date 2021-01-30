"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getNamedCookie({ name }) {
    const page = this.getPageHandle();
    const cookies = await page.cookies();
    const cookie = cookies.find((cookie) => cookie.name === name);
    if (!cookie) {
        throw new Error(`No cookie with name ${name}`);
    }
    return cookie;
}
exports.default = getNamedCookie;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TmFtZWRDb29raWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2V0TmFtZWRDb29raWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZZSxLQUFLLFVBQVUsY0FBYyxDQUV4QyxFQUFFLElBQUksRUFBb0I7SUFFMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUE7SUFFN0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLElBQUksRUFBRSxDQUFDLENBQUE7S0FDakQ7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO0FBYkQsaUNBYUMifQ==