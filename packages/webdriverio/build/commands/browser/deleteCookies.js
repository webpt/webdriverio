"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deleteCookies(names) {
    if (names === undefined) {
        return this.deleteAllCookies();
    }
    const namesList = Array.isArray(names) ? names : [names];
    if (namesList.every(obj => typeof obj !== 'string')) {
        return Promise.reject(new Error('Invalid input (see https://webdriver.io/docs/api/browser/deleteCookies for documentation)'));
    }
    return Promise.all(namesList.map(name => this.deleteCookie(name)));
}
exports.default = deleteCookies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlQ29va2llcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL2RlbGV0ZUNvb2tpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUEyQ0EsU0FBd0IsYUFBYSxDQUVqQyxLQUF5QjtJQUV6QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDckIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtLQUNqQztJQUVELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUV4RCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsRUFBRTtRQUNqRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsMkZBQTJGLENBQUMsQ0FBQyxDQUFBO0tBQ2hJO0lBRUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN0RSxDQUFDO0FBZkQsZ0NBZUMifQ==