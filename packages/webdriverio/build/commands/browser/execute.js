"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function execute(script, ...args) {
    if ((typeof script !== 'string' && typeof script !== 'function')) {
        throw new Error('number or type of arguments don\'t agree with execute protocol command');
    }
    if (typeof script === 'function') {
        script = `return (${script}).apply(null, arguments)`;
    }
    return this.executeScript(script, utils_1.verifyArgsAndStripIfElement(args));
}
exports.default = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL2V4ZWN1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUQ7QUFxQ3pELFNBQXdCLE9BQU8sQ0FNM0IsTUFBeUMsRUFDekMsR0FBRyxJQUFPO0lBS1YsSUFBSSxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLENBQUMsRUFBRTtRQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUE7S0FDNUY7SUFNRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUM5QixNQUFNLEdBQUcsV0FBVyxNQUFNLDBCQUEwQixDQUFBO0tBQ3ZEO0lBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxtQ0FBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3hFLENBQUM7QUF6QkQsMEJBeUJDIn0=