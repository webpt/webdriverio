"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const archiver_1 = __importDefault(require("archiver"));
async function uploadFile(localPath) {
    if (typeof localPath !== 'string') {
        throw new Error('number or type of arguments don\'t agree with uploadFile command');
    }
    if (typeof this.file !== 'function') {
        throw new Error(`The uploadFile command is not available in ${this.capabilities.browserName}`);
    }
    let zipData = [];
    let source = fs_1.default.createReadStream(localPath);
    return new Promise((resolve, reject) => {
        archiver_1.default('zip')
            .on('error', (err) => reject(err))
            .on('data', (data) => zipData.push(data))
            .on('end', () => this.file(Buffer.concat(zipData).toString('base64')).then((localPath) => resolve(localPath), reject))
            .append(source, { name: path_1.default.basename(localPath) })
            .finalize();
    });
}
exports.default = uploadFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3VwbG9hZEZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBQ3ZCLHdEQUErQjtBQWlDaEIsS0FBSyxVQUFVLFVBQVUsQ0FFcEMsU0FBaUI7SUFLakIsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFBO0tBQ3RGO0lBS0QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQStDLElBQUksQ0FBQyxZQUEwQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7S0FDaEk7SUFFRCxJQUFJLE9BQU8sR0FBaUIsRUFBRSxDQUFBO0lBQzlCLElBQUksTUFBTSxHQUFHLFlBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUUzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLGtCQUFRLENBQUMsS0FBSyxDQUFDO2FBQ1YsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BELEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQzVDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDakQsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxjQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7YUFDbEQsUUFBUSxFQUFFLENBQUE7SUFDbkIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBL0JELDZCQStCQyJ9