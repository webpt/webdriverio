"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const USKeyboardLayout_1 = require("puppeteer-core/lib/cjs/puppeteer/common/USKeyboardLayout");
const getElementRect_1 = __importDefault(require("./getElementRect"));
const constants_1 = require("../constants");
const KEY = 'key';
const POINTER = 'pointer';
const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));
async function performActions({ actions }) {
    const page = this.getPageHandle();
    const lastPointer = {};
    for (const action of actions) {
        if (action.type === null || action.type === 'null') {
            for (const singleAction of action.actions) {
                await sleep(singleAction.duration);
            }
            continue;
        }
        if (action.type === 'key') {
            const skipChars = [];
            for (const singleAction of action.actions) {
                if (singleAction.type === 'pause') {
                    await sleep(singleAction.duration);
                    continue;
                }
                const cmd = singleAction.type.slice(KEY.length).toLowerCase();
                const keyboardFn = page.keyboard[cmd].bind(page.keyboard);
                if (cmd === 'up' && skipChars[0] === singleAction.value) {
                    skipChars.shift();
                    continue;
                }
                if (!USKeyboardLayout_1.keyDefinitions[singleAction.value]) {
                    await page.keyboard.sendCharacter(singleAction.value);
                    skipChars.push(singleAction.value);
                    continue;
                }
                await keyboardFn(singleAction.value);
                continue;
            }
            continue;
        }
        if (action.type === 'pointer') {
            if (action.parameters && action.parameters.pointerType && action.parameters.pointerType !== 'mouse') {
                throw new Error('Currently only "mouse" is supported as pointer type');
            }
            for (const singleAction of action.actions) {
                if (singleAction.type === 'pause') {
                    await sleep(singleAction.duration);
                    continue;
                }
                const cmd = singleAction.type.slice(POINTER.length).toLowerCase();
                const keyboardFn = page.mouse[cmd].bind(page.mouse);
                let { x, y, duration, button, origin } = singleAction;
                if (cmd === 'move') {
                    if (typeof x === 'number' &&
                        typeof y === 'number' &&
                        origin === 'pointer' &&
                        lastPointer.x && lastPointer.y) {
                        x += lastPointer.x;
                        y += lastPointer.y;
                    }
                    if (origin && typeof origin[constants_1.ELEMENT_KEY] === 'string' && typeof x === 'number' && typeof y === 'number') {
                        const elemRect = await getElementRect_1.default.call(this, { elementId: origin[constants_1.ELEMENT_KEY] });
                        x += elemRect.x + (elemRect.width / 2);
                        y += elemRect.y + (elemRect.height / 2);
                    }
                    lastPointer.x = x;
                    lastPointer.y = y;
                    await keyboardFn(x, y, { steps: 10 });
                    continue;
                }
                else {
                    const pptrButton = (button === 1 ? 'middle' : (button === 2 ? 'right' : 'left'));
                    await keyboardFn({ button: pptrButton });
                }
                if (duration) {
                    await sleep(duration);
                }
                continue;
            }
            continue;
        }
        throw new Error(`Unknown action type ("${action.type}"), allowed are only: null, key and pointer`);
    }
}
exports.default = performActions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybUFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcGVyZm9ybUFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrRkFBbUc7QUFHbkcsc0VBQTZDO0FBQzdDLDRDQUEwQztBQUcxQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUE7QUFDakIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFBO0FBRXpCLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQ25DLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7QUE0QjVCLEtBQUssVUFBVSxjQUFjLENBRXhDLEVBQUUsT0FBTyxFQUFtQztJQUU1QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsTUFBTSxXQUFXLEdBR2IsRUFBRSxDQUFBO0lBTU4sS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDMUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNoRCxLQUFLLE1BQU0sWUFBWSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZDLE1BQU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTthQUNyQztZQUNELFNBQVE7U0FDWDtRQUVELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDdkIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFBO1lBQ3BCLEtBQUssTUFBTSxZQUFZLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsSUFBSSxZQUFZLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDL0IsTUFBTSxLQUFLLENBQUMsWUFBWSxD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