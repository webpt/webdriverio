"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Timer_1 = __importDefault(require("../Timer"));
class Interception {
    constructor(url, filterOptions = {}, browser) {
        this.respondOverwrites = [];
        this.matches = [];
        this.url = url;
        this.filterOptions = filterOptions;
        this.browser = browser;
    }
    get calls() {
        throw new Error('Implement me');
    }
    waitForResponse({ timeout = this.browser.options.waitforTimeout, interval = this.browser.options.waitforInterval, timeoutMsg, } = {}) {
        if (typeof timeout !== 'number') {
            timeout = this.browser.options.waitforTimeout;
        }
        if (typeof interval !== 'number') {
            interval = this.browser.options.waitforInterval;
        }
        const fn = async () => this.calls && (await this.calls).length > 0;
        const timer = new Timer_1.default(interval, timeout, fn, true);
        return this.browser.call(() => timer.catch((e) => {
            if (e.message === 'timeout') {
                if (typeof timeoutMsg === 'string') {
                    throw new Error(timeoutMsg);
                }
                throw new Error(`waitForResponse timed out after ${timeout}ms`);
            }
            throw new Error(`waitForResponse failed with the following reason: ${(e && e.message) || e}`);
        }));
    }
}
exports.default = Interception;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvaW50ZXJjZXB0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQTRCO0FBTTVCLE1BQXFCLFlBQVk7SUFZN0IsWUFBYSxHQUFXLEVBQUUsZ0JBQW1DLEVBQUUsRUFBRSxPQUE0QjtRQVI3RixzQkFBaUIsR0FLWCxFQUFFLENBQUE7UUFDUixZQUFPLEdBQWMsRUFBRSxDQUFBO1FBR25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDMUIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELGVBQWUsQ0FBRSxFQUNiLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQzdDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQy9DLFVBQVUsTUFDTSxFQUFFO1FBSWxCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUF3QixDQUFBO1NBQzFEO1FBRUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDOUIsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQXlCLENBQUE7U0FDNUQ7UUFHRCxNQUFNLEVBQUUsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ2xFLE1BQU0sS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBNEIsQ0FBQTtRQUUvRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUN6QixJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtpQkFDOUI7Z0JBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsT0FBTyxJQUFJLENBQUMsQ0FBQTthQUNsRTtZQUVELE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2pHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDUCxDQUFDO0NBQ0o7QUFyREQsK0JBcURDIn0=