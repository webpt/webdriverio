"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSync = exports.executeSync = exports.runFnInFiberContext = exports.wrapCommand = exports.executeHooksWithArgs = void 0;
const fibers_1 = __importDefault(require("./fibers"));
const executeHooksWithArgs_1 = __importDefault(require("./executeHooksWithArgs"));
exports.executeHooksWithArgs = executeHooksWithArgs_1.default;
const runFnInFiberContext_1 = __importDefault(require("./runFnInFiberContext"));
exports.runFnInFiberContext = runFnInFiberContext_1.default;
const wrapCommand_1 = __importDefault(require("./wrapCommand"));
exports.wrapCommand = wrapCommand_1.default;
const utils_1 = require("./utils");
const defaultRetries = { attempts: 0, limit: 0 };
async function executeSync(fn, retries = defaultRetries, args = []) {
    if (global.browser) {
        delete global.browser._NOT_FIBER;
    }
    if (this) {
        this.wdioRetries = retries.attempts;
    }
    try {
        global._HAS_FIBER_CONTEXT = true;
        let res = fn.apply(this, args);
        global._HAS_FIBER_CONTEXT = false;
        if (res instanceof Promise) {
            return await res;
        }
        return res;
    }
    catch (e) {
        if (retries.limit > retries.attempts) {
            retries.attempts++;
            return await executeSync.call(this, fn, retries, args);
        }
        if (!e.stack) {
            return Promise.reject(e);
        }
        e.stack = e.stack.split('\n').filter(utils_1.stackTraceFilter).join('\n');
        return Promise.reject(e);
    }
}
exports.executeSync = executeSync;
function runSync(fn, repeatTest, args = []) {
    return (resolve, reject) => fibers_1.default(() => executeSync.call(this, fn, repeatTest, args).then(resolve, reject)).run();
}
exports.runSync = runSync;
function sync(testFn) {
    return new Promise((resolve, reject) => {
        return runSync(testFn)(resolve, reject);
    });
}
exports.default = sync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTRCO0FBRzVCLGtGQUF5RDtBQTBFckQsK0JBMUVHLDhCQUFvQixDQTBFSDtBQXpFeEIsZ0ZBQXVEO0FBMkVuRCw4QkEzRUcsNkJBQW1CLENBMkVIO0FBMUV2QixnRUFBdUM7QUF5RW5DLHNCQXpFRyxxQkFBVyxDQXlFSDtBQXZFZixtQ0FBMEM7QUFDMUMsTUFBTSxjQUFjLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQTtBQWVoRCxLQUFLLFVBQVUsV0FBVyxDQUEwQixFQUFZLEVBQUUsT0FBTyxHQUFHLGNBQWMsRUFBRSxPQUFjLEVBQUU7SUFNeEcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUE7S0FDbkM7SUFDRCxJQUFJLElBQUksRUFBRTtRQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtLQUN0QztJQUVELElBQUk7UUFDQSxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO1FBQ2hDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUE7UUFNakMsSUFBSSxHQUFHLFlBQVksT0FBTyxFQUFFO1lBQ3hCLE9BQU8sTUFBTSxHQUFHLENBQUE7U0FDbkI7UUFFRCxPQUFPLEdBQUcsQ0FBQTtLQUNiO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixJQUFJLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNsQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDbEIsT0FBTyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDekQ7UUFLRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUMzQjtRQUVELENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLHdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMzQjtBQUNMLENBQUM7QUFjRyxrQ0FBVztBQVRmLFNBQVMsT0FBTyxDQUFhLEVBQVksRUFBRSxVQUFrQyxFQUFFLE9BQWMsRUFBRTtJQUMzRixPQUFPLENBQUMsT0FBNkIsRUFBRSxNQUE4QixFQUFFLEVBQUUsQ0FDckUsZ0JBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUM3RixDQUFDO0FBT0csMEJBQU87QUFHWCxTQUF3QixJQUFJLENBQUMsTUFBZ0I7SUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBSkQsdUJBSUMifQ==