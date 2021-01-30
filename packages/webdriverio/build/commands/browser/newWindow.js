"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newWindow_1 = __importDefault(require("../../scripts/newWindow"));
async function newWindow(url, { windowName = 'New Window', windowFeatures = '' } = {}) {
    if (typeof url !== 'string') {
        throw new Error('number or type of arguments don\'t agree with newWindow command');
    }
    if (this.isMobile) {
        throw new Error('newWindow command is not supported on mobile platforms');
    }
    await this.execute(newWindow_1.default, url, windowName, windowFeatures);
    const tabs = await this.getWindowHandles();
    const newTab = tabs.pop();
    if (!newTab) {
        throw new Error('No window handle was found to switch to');
    }
    await this.switchToWindow(newTab);
    return newTab;
}
exports.default = newWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3V2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Jyb3dzZXIvbmV3V2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQXFEO0FBbUN0QyxLQUFLLFVBQVUsU0FBUyxDQUVuQyxHQUFXLEVBQ1gsRUFBRSxVQUFVLEdBQUcsWUFBWSxFQUFFLGNBQWMsR0FBRyxFQUFFLEtBQXVCLEVBQUU7SUFLekUsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFBO0tBQ3JGO0lBS0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO0tBQzVFO0lBRUQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFlLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUVwRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0lBQzFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUV6QixJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO0tBQzdEO0lBRUQsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2pDLE9BQU8sTUFBTSxDQUFBO0FBQ2pCLENBQUM7QUE5QkQsNEJBOEJDIn0=