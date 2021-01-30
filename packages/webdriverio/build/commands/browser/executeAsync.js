"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function executeAsync(script, ...args) {
    if ((typeof script !== 'string' && typeof script !== 'function')) {
        throw new Error('number or type of arguments don\'t agree with execute protocol command');
    }
    if (typeof script === 'function') {
        script = `return (${script}).apply(null, arguments)`;
    }
    return this.executeAsyncScript(script, utils_1.verifyArgsAndStripIfElement(args));
}
exports.default = executeAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZUFzeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Jyb3dzZXIvZXhlY3V0ZUFzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlEO0FBNkN6RCxTQUF3QixZQUFZLENBRWhDLE1BRTBELEVBQzFELEdBQUcsSUFBTztJQUtWLElBQUksQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDLEVBQUU7UUFDOUQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFBO0tBQzVGO0lBTUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDOUIsTUFBTSxHQUFHLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQTtLQUN2RDtJQUVELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxtQ0FBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQzdFLENBQUM7QUF2QkQsK0JBdUJDIn0=