"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function getWindowSize() {
    const browser = utils_1.getBrowserObject(this);
    if (!browser.isW3C) {
        return browser._getWindowSize();
    }
    const { width, height } = await browser.getWindowRect();
    return { width, height };
}
exports.default = getWindowSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0V2luZG93U2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL2dldFdpbmRvd1NpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBOEM7QUF5Qi9CLEtBQUssVUFBVSxhQUFhO0lBQ3ZDLE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBRXRDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ2hCLE9BQU8sT0FBTyxDQUFDLGNBQWMsRUFBNEIsQ0FBQTtLQUM1RDtJQUVELE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFpQixDQUFBO0lBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFpQixDQUFBO0FBQzNDLENBQUM7QUFURCxnQ0FTQyJ9