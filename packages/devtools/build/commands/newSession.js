"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const uuid_1 = require("uuid");
const launcher_1 = __importDefault(require("../launcher"));
const index_1 = require("../index");
async function newSession({ capabilities }) {
    const browser = await launcher_1.default(capabilities);
    const sessionId = uuid_1.v4();
    const [browserName, browserVersion] = (await browser.version()).split('/');
    index_1.sessionMap.set(sessionId, browser);
    return {
        sessionId,
        capabilities: {
            browserName,
            browserVersion,
            platformName: os_1.default.platform(),
            platformVersion: os_1.default.release()
        }
    };
}
exports.default = newSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3U2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uZXdTZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLCtCQUFtQztBQUVuQywyREFBZ0M7QUFDaEMsb0NBQXFDO0FBYXRCLEtBQUssVUFBVSxVQUFVLENBRXBDLEVBQUUsWUFBWSxFQUEwQztJQUV4RCxNQUFNLE9BQU8sR0FBRyxNQUFNLGtCQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDMUMsTUFBTSxTQUFTLEdBQUcsU0FBTSxFQUFFLENBQUE7SUFDMUIsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRTFFLGtCQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUVsQyxPQUFPO1FBQ0gsU0FBUztRQUNULFlBQVksRUFBRTtZQUNWLFdBQVc7WUFDWCxjQUFjO1lBQ2QsWUFBWSxFQUFFLFlBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsZUFBZSxFQUFFLFlBQUUsQ0FBQyxPQUFPLEVBQUU7U0FDaEM7S0FDSixDQUFBO0FBQ0wsQ0FBQztBQW5CRCw2QkFtQkMifQ==