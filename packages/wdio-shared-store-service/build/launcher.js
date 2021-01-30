"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("./utils");
const log = logger_1.default('@wdio/shared-store-service');
let server;
class SharedStoreLauncher {
    constructor() {
        this.pidFile = utils_1.getPidPath(process.pid);
    }
    async onPrepare() {
        server = require('./server').default;
        const result = await server.startServer();
        log.info(`Started shared server on port ${result.port}`);
        await utils_1.writeFile(this.pidFile, result.port.toString());
    }
    async onComplete() {
        await server.stopServer();
        await utils_1.deleteFile(this.pidFile);
    }
}
exports.default = SharedStoreLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBaUM7QUFFakMsbUNBQTJEO0FBRTNELE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtBQUVoRCxJQUFJLE1BQXlCLENBQUE7QUFFN0IsTUFBcUIsbUJBQW1CO0lBRXBDO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVM7UUFDWCxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtRQUNwQyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUV6QyxHQUFHLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN4RCxNQUFNLGlCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ1osTUFBTSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDekIsTUFBTSxrQkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0NBQ0o7QUFuQkQsc0NBbUJDIn0=