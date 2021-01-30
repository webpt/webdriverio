"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getElementObject_1 = require("../../utils/getElementObject");
const resq_1 = require("../../scripts/resq");
const resqScript = fs_1.default.readFileSync(require.resolve('resq'));
async function react$(selector, { props = {}, state = {} } = {}) {
    await this.executeScript(resqScript.toString(), []);
    await this.execute(resq_1.waitToLoadReact);
    const res = await this.execute(resq_1.react$, selector, props, state);
    return getElementObject_1.getElement.call(this, selector, res, true);
}
exports.default = react$;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Jyb3dzZXIvcmVhY3QkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQW1CO0FBR25CLG1FQUF5RDtBQUN6RCw2Q0FBNEU7QUFHNUUsTUFBTSxVQUFVLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUE2QzVDLEtBQUssVUFBVSxNQUFNLENBRWhDLFFBQWdCLEVBQ2hCLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxLQUEyQixFQUFFO0lBRXJELE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFlLENBQUMsQ0FBQTtJQUNuQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQzFCLGFBQW1CLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQ25CLENBQUE7SUFFNUIsT0FBTyw2QkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNyRCxDQUFDO0FBWkQseUJBWUMifQ==