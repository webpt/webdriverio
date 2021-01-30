"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Timer_1 = __importDefault(require("../../utils/Timer"));
function waitUntil(condition, { timeout = this.options.waitforTimeout, interval = this.options.waitforInterval, timeoutMsg } = {}) {
    if (typeof condition !== 'function') {
        throw new Error('Condition is not a function');
    }
    if (typeof timeout !== 'number') {
        timeout = this.options.waitforTimeout;
    }
    if (typeof interval !== 'number') {
        interval = this.options.waitforInterval;
    }
    const fn = condition.bind(this);
    let timer = new Timer_1.default(interval, timeout, fn, true);
    return timer.catch((e) => {
        if (e.message === 'timeout') {
            if (typeof timeoutMsg === 'string') {
                throw new Error(timeoutMsg);
            }
            throw new Error(`waitUntil condition timed out after ${timeout}ms`);
        }
        throw new Error(`waitUntil condition failed with the following reason: ${(e && e.message) || e}`);
    });
}
exports.default = waitUntil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdFVudGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Jyb3dzZXIvd2FpdFVudGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBNENyQyxTQUF3QixTQUFTLENBRTdCLFNBQTJDLEVBQzNDLEVBQ0ksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZDLFVBQVUsS0FDaUIsRUFBRTtJQUVqQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7S0FDakQ7SUFLRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUM3QixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUF3QixDQUFBO0tBQ2xEO0lBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDOUIsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBeUIsQ0FBQTtLQUNwRDtJQUVELE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsUUFBa0IsRUFBRSxPQUFpQixFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN0RSxPQUFRLEtBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2FBQzlCO1lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsT0FBTyxJQUFJLENBQUMsQ0FBQTtTQUN0RTtRQUVELE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3JHLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQXBDRCw0QkFvQ0MifQ==