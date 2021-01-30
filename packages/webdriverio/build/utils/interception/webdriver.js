"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const constants_1 = require("../../constants");
class WebDriverInterception extends _1.default {
    async init() {
        const { mockId } = await this.browser.mockRequest(this.url, this.filterOptions);
        this.mockId = mockId;
    }
    get calls() {
        return this.browser.call(async () => this.browser.getMockCalls(this.mockId));
    }
    clear() {
        return this.browser.call(async () => this.browser.clearMockCalls(this.mockId));
    }
    restore() {
        return this.browser.call(async () => this.browser.clearMockCalls(this.mockId, true));
    }
    respond(overwrite, params = {}) {
        return this.browser.call(async () => this.browser.respondMock(this.mockId, { overwrite, params, sticky: true }));
    }
    respondOnce(overwrite, params = {}) {
        return this.browser.call(async () => this.browser.respondMock(this.mockId, { overwrite, params }));
    }
    abort(errorReason, sticky = true) {
        if (typeof errorReason !== 'string' || !constants_1.ERROR_REASON.includes(errorReason)) {
            throw new Error(`Invalid value for errorReason, allowed are: ${constants_1.ERROR_REASON.join(', ')}`);
        }
        return this.browser.call(async () => this.browser.respondMock(this.mockId, { errorReason, sticky }));
    }
    abortOnce(errorReason) {
        return this.abort(errorReason, false);
    }
}
exports.default = WebDriverInterception;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViZHJpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2ludGVyY2VwdGlvbi93ZWJkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBNEI7QUFDNUIsK0NBQThDO0FBUzlDLE1BQXFCLHFCQUFzQixTQUFRLFVBQVk7SUFHM0QsS0FBSyxDQUFDLElBQUk7UUFDTixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUMvRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBS0QsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBZ0IsQ0FDbEQsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUtELEtBQUs7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFnQixDQUFDLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBTUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBT0QsT0FBTyxDQUFFLFNBQXdCLEVBQUUsU0FBNkIsRUFBRTtRQUM5RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUNoQyxJQUFJLENBQUMsTUFBZ0IsRUFDckIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FDdEMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQU9ELFdBQVcsQ0FBRSxTQUF3QixFQUFFLFNBQTZCLEVBQUU7UUFDbEUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDcEIsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FDaEMsSUFBSSxDQUFDLE1BQWdCLEVBQ3JCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUN4QixDQUNKLENBQUE7SUFDTCxDQUFDO0lBTUQsS0FBSyxDQUFFLFdBQW1CLEVBQUUsU0FBa0IsSUFBSTtRQUM5QyxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsSUFBSSxDQUFDLHdCQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLHdCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUM1RjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQ2hDLElBQUksQ0FBQyxNQUFnQixFQUNyQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FDMUIsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQU1ELFNBQVMsQ0FBRSxXQUFtQjtRQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDSjtBQXJGRCx3Q0FxRkMifQ==