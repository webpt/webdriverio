"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getCookies(names) {
    if (names === undefined) {
        return this.getAllCookies();
    }
    const namesList = Array.isArray(names) ? names : [names];
    if (namesList.every(obj => typeof obj !== 'string')) {
        throw new Error('Invalid input (see https://webdriver.io/docs/api/browser/getCookies for documentation)');
    }
    const allCookies = await this.getAllCookies();
    return allCookies.filter(cookie => namesList.includes(cookie.name));
}
exports.default = getCookies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29va2llcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL2dldENvb2tpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQ2UsS0FBSyxVQUFVLFVBQVUsQ0FFcEMsS0FBeUI7SUFFekIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0tBQzlCO0lBRUQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXhELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsd0ZBQXdGLENBQUMsQ0FBQTtLQUM1RztJQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQzdDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDdkUsQ0FBQztBQWhCRCw2QkFnQkMifQ==