"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValue = exports.getValue = exports.setPort = void 0;
const got_1 = __importDefault(require("got"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/shared-store-service');
let baseUrl;
exports.setPort = (port) => { baseUrl = `http://localhost:${port}`; };
exports.getValue = async (key) => {
    const res = await got_1.default.post(`${baseUrl}/get`, { json: { key }, responseType: 'json' }).catch(errHandler);
    return (res && res.body) ? res.body.value : undefined;
};
exports.setValue = async (key, value) => {
    await got_1.default.post(`${baseUrl}/set`, { json: { key, value } }).catch(errHandler);
};
const errHandler = (err) => {
    log.warn(err.statusCode, err.statusMessage, err.url, err.body);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBbUM7QUFDbkMsMERBQWlDO0FBSWpDLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtBQUVoRCxJQUFJLE9BQWUsQ0FBQTtBQUNOLFFBQUEsT0FBTyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsR0FBRyxPQUFPLEdBQUcsb0JBQW9CLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBT3BFLFFBQUEsUUFBUSxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQWtGLEVBQUU7SUFDMUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxhQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDdkcsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxJQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO0FBQ3pFLENBQUMsQ0FBQTtBQU9ZLFFBQUEsUUFBUSxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQUUsS0FBcUMsRUFBRSxFQUFFO0lBQ2pGLE1BQU0sYUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDaEYsQ0FBQyxDQUFBO0FBRUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEVBQUU7SUFDeEMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFBIn0=