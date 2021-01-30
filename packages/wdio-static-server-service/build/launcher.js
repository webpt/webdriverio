"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const util_1 = require("util");
const express_1 = __importDefault(require("express"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/static-server-service');
const DEFAULT_LOG_NAME = 'wdio-static-server-service.log';
class StaticServerLauncher {
    constructor({ folders, port = 4567, middleware = [] }) {
        this._folders = folders ? Array.isArray(folders) ? folders : [folders] : null;
        this._port = port;
        this._middleware = middleware;
    }
    async onPrepare({ outputDir }) {
        if (!this._folders) {
            return;
        }
        this._server = express_1.default();
        if (outputDir) {
            const file = path_1.join(outputDir, DEFAULT_LOG_NAME);
            fs_extra_1.default.createFileSync(file);
            const stream = fs_extra_1.default.createWriteStream(file);
            this._server.use(morgan_1.default('tiny', { stream }));
        }
        this._folders.forEach((folder) => {
            log.info('Mounting folder `%s` at `%s`', path_1.resolve(folder.path), folder.mount);
            this._server.use(folder.mount, express_1.default.static(folder.path));
        });
        this._middleware.forEach((ware) => this._server.use(ware.mount, ware.middleware));
        const listen = util_1.promisify(this._server.listen.bind(this._server));
        await listen(this._port);
        log.info(`Static server running at http://localhost:${this._port}`);
    }
}
exports.default = StaticServerLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQkFBb0M7QUFDcEMsK0JBQWdDO0FBQ2hDLHNEQUE2QjtBQUM3Qix3REFBeUI7QUFDekIsb0RBQTJCO0FBQzNCLDBEQUFpQztBQUtqQyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUFFakQsTUFBTSxnQkFBZ0IsR0FBRyxnQ0FBZ0MsQ0FBQTtBQUV6RCxNQUFxQixvQkFBb0I7SUFNckMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQStGO1FBQzlJLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUM3RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBMEI7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsT0FBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBTyxFQUFFLENBQUE7UUFFeEIsSUFBSSxTQUFTLEVBQUU7WUFDWCxNQUFNLElBQUksR0FBRyxXQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUE7WUFDOUMsa0JBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsTUFBTSxNQUFNLEdBQUcsa0JBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUMvQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBb0IsRUFBRSxFQUFFO1lBQzNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsY0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUUsSUFBSSxDQUFDLE9BQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNoRSxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUNwQixDQUFDLElBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQTRDLENBQUMsQ0FBQyxDQUFBO1FBRWpILE1BQU0sTUFBTSxHQUFvQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNqRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDdkUsQ0FBQztDQUNKO0FBdENELHVDQXNDQyJ9