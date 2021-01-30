"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = void 0;
const path_1 = __importDefault(require("path"));
const FILE_EXTENSION_REGEX = /\.[0-9a-z]+$/i;
function getFilePath(filePath, defaultFilename) {
    let absolutePath = path_1.default.resolve(filePath);
    if (!FILE_EXTENSION_REGEX.test(path_1.default.basename(absolutePath))) {
        absolutePath = path_1.default.join(absolutePath, defaultFilename);
    }
    return absolutePath;
}
exports.getFilePath = getFilePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXVCO0FBRXZCLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFBO0FBUTVDLFNBQWdCLFdBQVcsQ0FBRSxRQUFnQixFQUFFLGVBQXVCO0lBQ2xFLElBQUksWUFBWSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFJekMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUU7UUFDekQsWUFBWSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFBO0tBQzFEO0lBRUQsT0FBTyxZQUFZLENBQUE7QUFDdkIsQ0FBQztBQVZELGtDQVVDIn0=