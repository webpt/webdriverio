"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const puppeteerPath = require.resolve('puppeteer-core');
const puppeteerPkg = require(`${path_1.default.dirname(puppeteerPath)}/package.json`);
async function status() {
    return {
        message: '',
        ready: true,
        puppeteerVersion: puppeteerPkg.version
    };
}
exports.default = status;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3N0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF1QjtBQUV2QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDdkQsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUE7QUFXNUQsS0FBSyxVQUFVLE1BQU07SUFDaEMsT0FBTztRQUNILE9BQU8sRUFBRSxFQUFFO1FBQ1gsS0FBSyxFQUFFLElBQUk7UUFDWCxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsT0FBTztLQUN6QyxDQUFBO0FBQ0wsQ0FBQztBQU5ELHlCQU1DIn0=