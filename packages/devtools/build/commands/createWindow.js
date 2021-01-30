"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const createWindow_1 = __importDefault(require("../scripts/createWindow"));
const WINDOW_FEATURES = 'menubar=1,toolbar=1,location=1,resizable=1,scrollbars=1';
const NEW_PAGE_URL = 'about:blank';
const DEFAULT_WINDOW_TYPE = 'tab';
async function createWindow({ type }) {
    type = type || DEFAULT_WINDOW_TYPE;
    let newPage;
    if (type === 'window') {
        const page = this.getPageHandle();
        await page.evaluate(createWindow_1.default, NEW_PAGE_URL, WINDOW_FEATURES);
        const newWindowTarget = await this.browser.waitForTarget((target) => target.url() === NEW_PAGE_URL);
        newPage = await newWindowTarget.page();
        if (!newPage) {
            throw new Error('Couldn\'t find page to switch to');
        }
    }
    else {
        newPage = await this.browser.newPage();
    }
    const handle = uuid_1.v4();
    await newPage.bringToFront();
    this.currentWindowHandle = handle;
    this.windows.set(handle, newPage);
    return {
        handle: this.currentWindowHandle,
        type
    };
}
exports.default = createWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlV2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NyZWF0ZVdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtCQUFtQztBQUduQywyRUFBNkM7QUFFN0MsTUFBTSxlQUFlLEdBQUcseURBQXlELENBQUE7QUFDakYsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFBO0FBQ2xDLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFBO0FBVWxCLEtBQUssVUFBVSxZQUFZLENBRXRDLEVBQUUsSUFBSSxFQUE4QjtJQUVwQyxJQUFJLEdBQUcsSUFBSSxJQUFJLG1CQUFtQixDQUFBO0lBQ2xDLElBQUksT0FBTyxDQUFBO0lBRVgsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUVqQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFDM0QsTUFBTSxlQUFlLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FDcEQsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxZQUFZLENBQUMsQ0FBQTtRQUU5QyxPQUFPLEdBQUcsTUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtTQUN0RDtLQUNKO1NBQU07UUFDSCxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0tBQ3pDO0lBRUQsTUFBTSxNQUFNLEdBQUcsU0FBTSxFQUFFLENBQUE7SUFDdkIsTUFBTSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUE7SUFFNUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQTtJQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDakMsT0FBTztRQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CO1FBQ2hDLElBQUk7S0FDUCxDQUFBO0FBQ0wsQ0FBQztBQS9CRCwrQkErQkMifQ==