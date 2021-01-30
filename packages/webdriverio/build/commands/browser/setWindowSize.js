"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const minWindowSize = 0;
const maxWindowSize = Number.MAX_SAFE_INTEGER;
async function setWindowSize(width, height) {
    if (typeof width !== 'number' || typeof height !== 'number') {
        throw new Error('setWindowSize expects width and height of type number');
    }
    if (width < minWindowSize || width > maxWindowSize || height < minWindowSize || height > maxWindowSize) {
        throw new Error('setWindowSize expects width and height to be a number in the 0 to 2^31 − 1 range');
    }
    const browser = utils_1.getBrowserObject(this);
    if (!browser.isW3C) {
        return browser._setWindowSize(width, height);
    }
    await browser.setWindowRect(null, null, width, height);
}
exports.default = setWindowSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0V2luZG93U2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3NldFdpbmRvd1NpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBOEM7QUFFOUMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFBO0FBQ3ZCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQTtBQW9COUIsS0FBSyxVQUFVLGFBQWEsQ0FFdkMsS0FBYSxFQUNiLE1BQWM7SUFLZCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0tBQzNFO0lBS0QsSUFBSSxLQUFLLEdBQUcsYUFBYSxJQUFJLEtBQUssR0FBRyxhQUFhLElBQUksTUFBTSxHQUFHLGFBQWEsSUFBSSxNQUFNLEdBQUcsYUFBYSxFQUFFO1FBQ3BHLE1BQU0sSUFBSSxLQUFLLENBQUMsa0ZBQWtGLENBQUMsQ0FBQTtLQUN0RztJQUVELE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBRXRDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ2hCLE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7S0FDL0M7SUFFRCxNQUFNLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDMUQsQ0FBQztBQTFCRCxnQ0EwQkMifQ==