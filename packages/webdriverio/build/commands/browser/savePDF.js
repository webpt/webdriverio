"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
async function savePDF(filepath, options) {
    if (typeof filepath != 'string' || !filepath.endsWith('.pdf')) {
        throw new Error('savePDF expects a filepath of type string and ".pdf" file ending');
    }
    const absoluteFilepath = utils_1.getAbsoluteFilepath(filepath);
    utils_1.assertDirectoryExists(absoluteFilepath);
    const pdf = await this.printPage(options === null || options === void 0 ? void 0 : options.orientation, options === null || options === void 0 ? void 0 : options.scale, options === null || options === void 0 ? void 0 : options.background, options === null || options === void 0 ? void 0 : options.width, options === null || options === void 0 ? void 0 : options.height, options === null || options === void 0 ? void 0 : options.top, options === null || options === void 0 ? void 0 : options.bottom, options === null || options === void 0 ? void 0 : options.left, options === null || options === void 0 ? void 0 : options.right, options === null || options === void 0 ? void 0 : options.shrinkToFit, options === null || options === void 0 ? void 0 : options.pageRanges);
    const page = Buffer.from(pdf, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, page);
    return page;
}
exports.default = savePDF;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVBERi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3NhdmVQREYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsdUNBQXdFO0FBNkN6RCxLQUFLLFVBQVUsT0FBTyxDQUVqQyxRQUFnQixFQUNoQixPQUF5QjtJQUt6QixJQUFJLE9BQU8sUUFBUSxJQUFJLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFBO0tBQ3RGO0lBRUQsTUFBTSxnQkFBZ0IsR0FBRywyQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RCw2QkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRXZDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxFQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsRUFDdEYsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEtBQUssRUFBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxFQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sRUFBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxFQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLEVBQzdGLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzlDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZDLFlBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFeEMsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO0FBdEJELDBCQXNCQyJ9