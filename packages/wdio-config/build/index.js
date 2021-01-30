"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIGS = exports.ConfigParser = exports.isCloudCapability = exports.detectBackend = exports.getSauceEndpoint = exports.validateConfig = void 0;
const ConfigParser_1 = __importDefault(require("./lib/ConfigParser"));
exports.ConfigParser = ConfigParser_1.default;
const utils_1 = require("./utils");
Object.defineProperty(exports, "validateConfig", { enumerable: true, get: function () { return utils_1.validateConfig; } });
Object.defineProperty(exports, "getSauceEndpoint", { enumerable: true, get: function () { return utils_1.getSauceEndpoint; } });
Object.defineProperty(exports, "detectBackend", { enumerable: true, get: function () { return utils_1.detectBackend; } });
Object.defineProperty(exports, "isCloudCapability", { enumerable: true, get: function () { return utils_1.isCloudCapability; } });
const constants_1 = require("./constants");
Object.defineProperty(exports, "DEFAULT_CONFIGS", { enumerable: true, get: function () { return constants_1.DEFAULT_CONFIGS; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsc0VBQTZDO0FBU3pDLHVCQVRHLHNCQUFZLENBU0g7QUFSaEIsbUNBQTRGO0FBSXhGLCtGQUpLLHNCQUFjLE9BSUw7QUFDZCxpR0FMcUIsd0JBQWdCLE9BS3JCO0FBQ2hCLDhGQU51QyxxQkFBYSxPQU12QztBQUNiLGtHQVBzRCx5QkFBaUIsT0FPdEQ7QUFOckIsMkNBQTZDO0FBWXpDLGdHQVpLLDJCQUFlLE9BWUwifQ==