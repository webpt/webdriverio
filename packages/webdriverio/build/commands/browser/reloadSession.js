"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('webdriverio');
async function reloadSession() {
    const oldSessionId = this.sessionId;
    try {
        await this.deleteSession();
    }
    catch (err) {
        log.warn(`Suppressing error closing the session: ${err.stack}`);
    }
    const ProtocolDriver = require(this.options.automationProtocol).default;
    await ProtocolDriver.reloadSession(this);
    const options = this.options;
    if (Array.isArray(options.onReload) && options.onReload.length) {
        await Promise.all(options.onReload.map((hook) => hook(oldSessionId, this.sessionId)));
    }
    return this.sessionId;
}
exports.default = reloadSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsb2FkU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3JlbG9hZFNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBaUM7QUFHakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQXVCbEIsS0FBSyxVQUFVLGFBQWE7SUFDdkMsTUFBTSxZQUFZLEdBQUksSUFBNEIsQ0FBQyxTQUFTLENBQUE7SUFLNUQsSUFBSTtRQUNBLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0tBQzdCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFNVixHQUFHLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtLQUNsRTtJQUVELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFtQixDQUFDLENBQUMsT0FBTyxDQUFBO0lBQ3hFLE1BQU0sY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUV4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBNkIsQ0FBQTtJQUNsRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQzVELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRyxJQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNqSDtJQUVELE9BQU8sSUFBSSxDQUFDLFNBQW1CLENBQUE7QUFDbkMsQ0FBQztBQTFCRCxnQ0EwQkMifQ==