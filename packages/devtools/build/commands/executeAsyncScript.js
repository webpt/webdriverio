"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeAsyncScript_1 = __importDefault(require("../scripts/executeAsyncScript"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
async function executeAsyncScript({ script, args }) {
    const page = this.getPageHandle(true);
    const scriptTimeout = this.timeouts.get('script') || 0;
    script = script.trim();
    if (script.startsWith('return (')) {
        script = script.slice(7);
    }
    if (script.startsWith('return')) {
        script = `(function () { ${script} }).apply(null, arguments)`;
    }
    const result = await page.$eval('html', executeAsyncScript_1.default, script, scriptTimeout, constants_1.SERIALIZE_PROPERTY, constants_1.SERIALIZE_FLAG, ...(await utils_1.transformExecuteArgs.call(this, args)));
    return utils_1.transformExecuteResult.call(this, page, result);
}
exports.default = executeAsyncScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZUFzeW5jU2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2V4ZWN1dGVBc3luY1NjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVGQUFtRDtBQUNuRCxvQ0FBdUU7QUFDdkUsNENBQWlFO0FBZWxELEtBQUssVUFBVSxrQkFBa0IsQ0FFNUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFtQztJQUVqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0RCxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO0lBRXRCLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMvQixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMzQjtJQUVELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM3QixNQUFNLEdBQUcsa0JBQWtCLE1BQU0sNEJBQTRCLENBQUE7S0FDaEU7SUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQzNCLE1BQU0sRUFDTiw0QkFBTyxFQUNQLE1BQU0sRUFDTixhQUFhLEVBQ2IsOEJBQWtCLEVBQ2xCLDBCQUFjLEVBQ2QsR0FBRyxDQUFDLE1BQU0sNEJBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUNuRCxDQUFBO0lBRUQsT0FBTyw4QkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMxRCxDQUFDO0FBM0JELHFDQTJCQyJ9