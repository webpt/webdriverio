"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
async function saveScreenshot(filepath) {
    if (typeof filepath !== 'string' || !filepath.endsWith('.png')) {
        throw new Error('saveScreenshot expects a filepath of type string and ".png" file ending');
    }
    const absoluteFilepath = utils_1.getAbsoluteFilepath(filepath);
    utils_1.assertDirectoryExists(absoluteFilepath);
    const screenBuffer = await this.takeElementScreenshot(this.elementId);
    const screenshot = Buffer.from(screenBuffer, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, screenshot);
    return screenshot;
}
exports.default = saveScreenshot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVNjcmVlbnNob3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9zYXZlU2NyZWVuc2hvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUFtQjtBQUNuQix1Q0FBd0U7QUFvQnpELEtBQUssVUFBVSxjQUFjLENBRXhDLFFBQWdCO0lBS2hCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUE7S0FDN0Y7SUFFRCxNQUFNLGdCQUFnQixHQUFHLDJCQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RELDZCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFFdkMsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3RELFlBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFFOUMsT0FBTyxVQUFVLENBQUE7QUFDckIsQ0FBQztBQW5CRCxpQ0FtQkMifQ==