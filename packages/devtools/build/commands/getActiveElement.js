"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findElement_1 = __importDefault(require("./findElement"));
const getActiveElement_1 = __importDefault(require("../scripts/getActiveElement"));
const cleanUpSerializationSelector_1 = __importDefault(require("../scripts/cleanUpSerializationSelector"));
const constants_1 = require("../constants");
async function getActiveElement() {
    const page = this.getPageHandle(true);
    const selector = `[${constants_1.SERIALIZE_PROPERTY}]`;
    const hasElem = await page.$eval('html', getActiveElement_1.default, constants_1.SERIALIZE_PROPERTY);
    if (!hasElem) {
        throw new Error('no element active');
    }
    const activeElement = await findElement_1.default.call(this, {
        using: 'css selector',
        value: selector
    });
    await page.$eval(selector, cleanUpSerializationSelector_1.default, constants_1.SERIALIZE_PROPERTY);
    return activeElement;
}
exports.default = getActiveElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWN0aXZlRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nZXRBY3RpdmVFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXVDO0FBQ3ZDLG1GQUFpRDtBQUNqRCwyR0FBNkQ7QUFDN0QsNENBQWlEO0FBVWxDLEtBQUssVUFBVSxnQkFBZ0I7SUFHMUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLDhCQUFrQixHQUFHLENBQUE7SUFLMUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSwwQkFBTyxFQUFFLDhCQUFrQixDQUFDLENBQUE7SUFFckUsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtLQUN2QztJQUtELE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQy9DLEtBQUssRUFBRSxjQUFjO1FBQ3JCLEtBQUssRUFBRSxRQUFRO0tBQ2xCLENBQUMsQ0FBQTtJQUtGLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsc0NBQU8sRUFBRSw4QkFBa0IsQ0FBQyxDQUFBO0lBRXZELE9BQU8sYUFBYSxDQUFBO0FBQ3hCLENBQUM7QUE3QkQsbUNBNkJDIn0=