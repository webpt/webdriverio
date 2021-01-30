"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
async function saveRecordingScreen(filepath) {
    if (typeof filepath !== 'string') {
        throw new Error('saveRecordingScreen expects a filepath');
    }
    const absoluteFilepath = utils_1.getAbsoluteFilepath(filepath);
    utils_1.assertDirectoryExists(absoluteFilepath);
    const videoBuffer = await this.stopRecordingScreen();
    const video = Buffer.from(videoBuffer, 'base64');
    fs_1.default.writeFileSync(absoluteFilepath, video);
    return video;
}
exports.default = saveRecordingScreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVJlY29yZGluZ1NjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3NhdmVSZWNvcmRpbmdTY3JlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsdUNBQXdFO0FBMkJ6RCxLQUFLLFVBQVUsbUJBQW1CLENBRTdDLFFBQWdCO0lBS2hCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtLQUM1RDtJQUVELE1BQU0sZ0JBQWdCLEdBQUcsMkJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEQsNkJBQXFCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUV2QyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQ3BELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELFlBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFekMsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztBQW5CRCxzQ0FtQkMifQ==