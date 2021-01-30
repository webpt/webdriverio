"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
async function takeElementScreenshot({ elementId }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    return elementHandle.screenshot({
        encoding: 'base64',
        type: 'png'
    });
}
exports.default = takeElementScreenshot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZUVsZW1lbnRTY3JlZW5zaG90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3Rha2VFbGVtZW50U2NyZWVuc2hvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUErQztBQVloQyxLQUFLLFVBQVUscUJBQXFCLENBRS9DLEVBQUUsU0FBUyxFQUF5QjtJQUVwQyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRTVELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDaEIsTUFBTSw0QkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUN4QztJQUVELE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUM1QixRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUUsS0FBSztLQUNkLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFkRCx3Q0FjQyJ9