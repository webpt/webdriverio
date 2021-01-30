"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementAttribute_1 = __importDefault(require("./getElementAttribute"));
async function isElementEnabled({ elementId }) {
    const result = await getElementAttribute_1.default.call(this, { elementId, name: 'disabled' });
    return result === null;
}
exports.default = isElementEnabled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbGVtZW50RW5hYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pc0VsZW1lbnRFbmFibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQXVEO0FBWXhDLEtBQUssVUFBVSxnQkFBZ0IsQ0FFMUMsRUFBRSxTQUFTLEVBQXlCO0lBRXBDLE1BQU0sTUFBTSxHQUFHLE1BQU0sNkJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUNwRixPQUFPLE1BQU0sS0FBSyxJQUFJLENBQUE7QUFDMUIsQ0FBQztBQU5ELG1DQU1DIn0=