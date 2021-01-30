"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const utils_1 = require("./utils");
class RunnerStream extends stream_1.Transform {
    constructor() {
        super();
        this.on('pipe', () => {
            utils_1.removeLastListener(this, 'close');
            utils_1.removeLastListener(this, 'drain');
            utils_1.removeLastListener(this, 'error');
            utils_1.removeLastListener(this, 'finish');
            utils_1.removeLastListener(this, 'unpipe');
        });
    }
    _transform(chunk, encoding, callback) {
        callback(undefined, chunk);
    }
    _final(callback) {
        this.unpipe();
        callback();
    }
}
exports.default = RunnerStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RkU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0ZFN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxRDtBQUNyRCxtQ0FBNEM7QUFFNUMsTUFBcUIsWUFBYSxTQUFRLGtCQUFTO0lBQy9DO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFLUCxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDakIsMEJBQWtCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ2pDLDBCQUFrQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUNqQywwQkFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDakMsMEJBQWtCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ2xDLDBCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxVQUFVLENBQUUsS0FBVSxFQUFFLFFBQXdCLEVBQUUsUUFBMkI7UUFDekUsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRUQsTUFBTSxDQUFFLFFBQTZDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNiLFFBQVEsRUFBRSxDQUFBO0lBQ2QsQ0FBQztDQUNKO0FBeEJELCtCQXdCQyJ9