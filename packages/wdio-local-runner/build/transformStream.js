"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const constants_1 = require("./constants");
class RunnerTransformStream extends stream_1.Transform {
    constructor(cid) {
        super();
        this.cid = cid;
    }
    _transform(chunk, encoding, callback) {
        const logMsg = chunk.toString();
        if (constants_1.DEBUGGER_MESSAGES.some(m => logMsg.startsWith(m))) {
            return callback();
        }
        this.push(`[${this.cid}] ${logMsg}`);
        callback();
    }
    _final(callback) {
        this.unpipe();
        callback();
    }
}
exports.default = RunnerTransformStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RyYW5zZm9ybVN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxRDtBQUNyRCwyQ0FBK0M7QUFFL0MsTUFBcUIscUJBQXNCLFNBQVEsa0JBQVM7SUFHeEQsWUFBYSxHQUFXO1FBQ3BCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7SUFDbEIsQ0FBQztJQUVELFVBQVUsQ0FBRSxLQUFVLEVBQUUsUUFBd0IsRUFBRSxRQUEyQjtRQUN6RSxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFL0IsSUFBSSw2QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbkQsT0FBTyxRQUFRLEVBQUUsQ0FBQTtTQUNwQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDcEMsUUFBUSxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUFFLFFBQXdDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNiLFFBQVEsRUFBRSxDQUFBO0lBQ2QsQ0FBQztDQUNKO0FBdkJELHdDQXVCQyJ9