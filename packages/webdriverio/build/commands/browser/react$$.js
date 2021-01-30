"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
const getElementObject_1 = require("../../utils/getElementObject");
const resq_1 = require("../../scripts/resq");
const resqScript = fs_1.default.readFileSync(require.resolve('resq'));
async function react$$(selector, { props = {}, state = {} } = {}) {
    await this.executeScript(resqScript.toString(), []);
    await this.execute(resq_1.waitToLoadReact);
    const res = await this.execute(resq_1.react$$, selector, props, state);
    const elements = await getElementObject_1.getElements.call(this, selector, res, true);
    return utils_1.enhanceElementsArray(elements, this, selector, 'react$$', [props, state]);
}
exports.default = react$$;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QkJC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3JlYWN0JCQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFHbkIsdUNBQWtEO0FBQ2xELG1FQUEwRDtBQUMxRCw2Q0FBOEU7QUFHOUUsTUFBTSxVQUFVLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFrQzVDLEtBQUssVUFBVSxPQUFPLENBRWpDLFFBQWdCLEVBQ2hCLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxLQUEyQixFQUFFO0lBRXJELE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFlLENBQUMsQ0FBQTtJQUNuQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQzFCLGNBQW9CLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQ3pCLENBQUE7SUFFdkIsTUFBTSxRQUFRLEdBQWlCLE1BQU0sOEJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDaEYsT0FBTyw0QkFBb0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUNwRixDQUFDO0FBYkQsMEJBYUMifQ==