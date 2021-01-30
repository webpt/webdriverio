"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fibers_1 = __importDefault(require("./fibers"));
function runFnInFiberContext(fn) {
    return function (...args) {
        delete global.browser._NOT_FIBER;
        return new Promise((resolve, reject) => fibers_1.default(() => {
            try {
                global._HAS_FIBER_CONTEXT = true;
                const result = fn.apply(this, args);
                global._HAS_FIBER_CONTEXT = false;
                return resolve(result);
            }
            catch (err) {
                return reject(err);
            }
        }).run());
    };
}
exports.default = runFnInFiberContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuRm5JbkZpYmVyQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ydW5GbkluRmliZXJDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsc0RBQTRCO0FBTzVCLFNBQXdCLG1CQUFtQixDQUFFLEVBQVk7SUFDckQsT0FBTyxVQUFrQyxHQUFHLElBQVc7UUFDbkQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQTtRQUVoQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsZ0JBQUssQ0FBQyxHQUFHLEVBQUU7WUFDL0MsSUFBSTtnQkFDQSxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO2dCQUNoQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDbkMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQTtnQkFDakMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDekI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNyQjtRQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDYixDQUFDLENBQUE7QUFDTCxDQUFDO0FBZkQsc0NBZUMifQ==