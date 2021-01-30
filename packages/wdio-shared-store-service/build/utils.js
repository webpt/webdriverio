"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPidPath = exports.deleteFile = exports.writeFile = exports.readFile = void 0;
const path_1 = require("path");
const util_1 = require("util");
const fs_1 = require("fs");
exports.readFile = util_1.promisify(fs_1.readFile);
exports.writeFile = util_1.promisify(fs_1.writeFile);
exports.deleteFile = util_1.promisify(fs_1.unlink);
exports.getPidPath = (pid) => path_1.join(__dirname, `/${pid}.pid`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQXVDO0FBQ3ZDLCtCQUFnQztBQUNoQywyQkFBOEU7QUFFakUsUUFBQSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxhQUFVLENBQUMsQ0FBQTtBQUNoQyxRQUFBLFNBQVMsR0FBRyxnQkFBUyxDQUFDLGNBQVcsQ0FBQyxDQUFBO0FBQ2xDLFFBQUEsVUFBVSxHQUFHLGdCQUFTLENBQUMsV0FBTSxDQUFDLENBQUE7QUFFOUIsUUFBQSxVQUFVLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFBIn0=