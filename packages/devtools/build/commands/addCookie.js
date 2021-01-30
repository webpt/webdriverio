"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function addCookie({ cookie }) {
    const page = this.getPageHandle();
    const cookieProps = Object.keys(cookie);
    if (!cookieProps.includes('name') || !cookieProps.includes('value')) {
        throw new Error('Provided cookie object is missing either "name" or "value" property');
    }
    if (typeof cookie.value !== 'string') {
        cookie.value = cookie.value.toString();
    }
    await page.setCookie(cookie);
    return null;
}
exports.default = addCookie;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQ29va2llLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FkZENvb2tpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVllLEtBQUssVUFBVSxTQUFTLENBRW5DLEVBQUUsTUFBTSxFQUFzQjtJQUU5QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFFakMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakUsTUFBTSxJQUFJLEtBQUssQ0FDWCxxRUFBcUUsQ0FDeEUsQ0FBQTtLQUNKO0lBRUQsSUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ2xDLE1BQU0sQ0FBQyxLQUFLLEdBQUksTUFBTSxDQUFDLEtBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtLQUNsRDtJQUVELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM1QixPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFuQkQsNEJBbUJDIn0=