"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function setCookies(cookieObjs) {
    const cookieObjsList = !Array.isArray(cookieObjs) ? [cookieObjs] : cookieObjs;
    if (cookieObjsList.some(obj => (typeof obj !== 'object'))) {
        throw new Error('Invalid input (see https://webdriver.io/docs/api/browser/setCookies for documentation)');
    }
    await Promise.all(cookieObjsList
        .map(cookieObj => this.addCookie(cookieObj)));
    return;
}
exports.default = setCookies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q29va2llcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3NldENvb2tpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3RGUsS0FBSyxVQUFVLFVBQVUsQ0FFcEMsVUFBNkI7SUFFN0IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7SUFFN0UsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFO1FBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsd0ZBQXdGLENBQUMsQ0FBQTtLQUM1RztJQUVELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO1NBQzNCLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pELE9BQU07QUFDVixDQUFDO0FBYkQsNkJBYUMifQ==