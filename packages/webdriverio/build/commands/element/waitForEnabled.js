"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function waitForEnabled({ timeout = this.options.waitforTimeout, interval = this.options.waitforInterval, reverse = false, timeoutMsg = `element ("${this.selector}") still ${reverse ? '' : 'not '}enabled after ${timeout}ms` } = {}) {
    if (!this.elementId && !reverse) {
        await this.waitForExist({ timeout, interval, timeoutMsg });
    }
    return this.waitUntil(async () => reverse !== await this.isEnabled(), { timeout, interval, timeoutMsg });
}
exports.default = waitForEnabled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdEZvckVuYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC93YWl0Rm9yRW5hYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXNDZSxLQUFLLFVBQVUsY0FBYyxDQUV4QyxFQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFDckMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUN2QyxPQUFPLEdBQUcsS0FBSyxFQUNmLFVBQVUsR0FBRyxhQUFhLElBQUksQ0FBQyxRQUFRLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0saUJBQWlCLE9BQU8sSUFBSSxLQUNwRixFQUFFO0lBS3RCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtLQUM3RDtJQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FDakIsS0FBSyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQzlDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FDcEMsQ0FBQTtBQUNMLENBQUM7QUFwQkQsaUNBb0JDIn0=