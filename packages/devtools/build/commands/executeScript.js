"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeScript_1 = __importDefault(require("../scripts/executeScript"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
async function executeScript({ script, args }) {
    const page = this.getPageHandle(true);
    const scriptTimeout = this.timeouts.get('script');
    script = script.trim();
    if (script.startsWith('return (')) {
        script = script.slice(7);
    }
    if (script.startsWith('return')) {
        script = `(function () { ${script} }).apply(null, arguments)`;
    }
    const executePromise = page.$eval('html', executeScript_1.default, script, constants_1.SERIALIZE_PROPERTY, constants_1.SERIALIZE_FLAG, ...(await utils_1.transformExecuteArgs.call(this, args)));
    let executeTimeout;
    const timeoutPromise = new Promise((_, reject) => {
        executeTimeout = setTimeout(() => {
            const timeoutError = `script timeout${this.activeDialog
                ? ' reason: a browser dialog has opened as result of a executeScript call'
                : ''}`;
            return reject(new Error(timeoutError));
        }, scriptTimeout);
    });
    const result = await Promise.race([executePromise, timeoutPromise]);
    clearTimeout(executeTimeout);
    return utils_1.transformExecuteResult.call(this, page, result);
}
exports.default = executeScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZVNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9leGVjdXRlU2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkVBQThDO0FBQzlDLG9DQUF1RTtBQUN2RSw0Q0FBaUU7QUFhbEQsS0FBSyxVQUFVLGFBQWEsQ0FFdkMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFtQztJQUVqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFdEIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQy9CLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzNCO0lBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzdCLE1BQU0sR0FBRyxrQkFBa0IsTUFBTSw0QkFBNEIsQ0FBQTtLQUNoRTtJQUVELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzdCLE1BQU0sRUFDTix1QkFBTyxFQUNQLE1BQU0sRUFDTiw4QkFBa0IsRUFDbEIsMEJBQWMsRUFDZCxHQUFHLENBQUMsTUFBTSw0QkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQ25ELENBQUE7SUFFRCxJQUFJLGNBQWMsQ0FBQTtJQUNsQixNQUFNLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM3QyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUM3QixNQUFNLFlBQVksR0FBRyxpQkFDakIsSUFBSSxDQUFDLFlBQVk7Z0JBQ2IsQ0FBQyxDQUFDLHdFQUF3RTtnQkFDMUUsQ0FBQyxDQUFDLEVBQ1YsRUFBRSxDQUFBO1lBRUYsT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUMxQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUNuRSxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUIsT0FBTyw4QkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMxRCxDQUFDO0FBekNELGdDQXlDQyJ9