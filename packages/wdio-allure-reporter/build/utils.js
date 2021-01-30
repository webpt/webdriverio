"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkByTemplate = exports.getErrorFromFailedTest = exports.tellReporter = exports.isMochaAllHooks = exports.isMochaEachHooks = exports.isEmpty = exports.getTestStatus = void 0;
const process_1 = __importDefault(require("process"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const compoundError_1 = __importDefault(require("./compoundError"));
const constants_1 = require("./constants");
exports.getTestStatus = (test, config) => {
    if (config && config.framework === 'jasmine') {
        return 'failed';
    }
    if (test.error) {
        if (test.error.name && test.error.message) {
            const message = test.error.message.trim();
            return (test.error.name === 'AssertionError' || message.includes('Expect')) ? 'failed' : 'broken';
        }
        if (test.error.name) {
            return test.error.name === 'AssertionError' ? 'failed' : 'broken';
        }
        if (test.error.stack) {
            const stackTrace = test.error.stack.trim();
            return (stackTrace.startsWith('AssertionError') || stackTrace.includes('Expect')) ? 'failed' : 'broken';
        }
    }
    return 'broken';
};
exports.isEmpty = (object) => !object || Object.keys(object).length === 0;
exports.isMochaEachHooks = (title) => constants_1.mochaEachHooks.some(hook => title.includes(hook));
exports.isMochaAllHooks = (title) => constants_1.mochaAllHooks.some(hook => title.includes(hook));
exports.tellReporter = (event, msg = {}) => {
    process_1.default.emit(event, msg);
};
exports.getErrorFromFailedTest = (test) => {
    if (test.errors && Array.isArray(test.errors)) {
        for (let i = 0; i < test.errors.length; i += 1) {
            if (test.errors[i].message)
                test.errors[i].message = strip_ansi_1.default(test.errors[i].message);
            if (test.errors[i].stack)
                test.errors[i].stack = strip_ansi_1.default(test.errors[i].stack);
        }
        return test.errors.length === 1 ? test.errors[0] : new compoundError_1.default(...test.errors);
    }
    if (test.error) {
        if (test.error.message)
            test.error.message = strip_ansi_1.default(test.error.message);
        if (test.error.stack)
            test.error.stack = strip_ansi_1.default(test.error.stack);
    }
    return test.error;
};
exports.getLinkByTemplate = (template, id) => {
    if (typeof template !== 'string') {
        return id;
    }
    if (!template.includes(constants_1.linkPlaceholder)) {
        throw Error(`The link template "${template}" must contain ${constants_1.linkPlaceholder} substring.`);
    }
    return template.replace(constants_1.linkPlaceholder, id);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTZCO0FBQzdCLDREQUFrQztBQUlsQyxvRUFBMkM7QUFDM0MsMkNBQTRFO0FBUy9ELFFBQUEsYUFBYSxHQUFHLENBQUMsSUFBMkIsRUFBRSxNQUEyQixFQUFXLEVBQUU7SUFDL0YsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDMUMsT0FBTyxRQUFRLENBQUE7S0FDbEI7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDWixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFBO1NBQ3JHO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtTQUNwRTtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDMUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFBO1NBQzNHO0tBQ0o7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUNuQixDQUFDLENBQUE7QUFPWSxRQUFBLE9BQU8sR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFBO0FBUXRFLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLDBCQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBUXZGLFFBQUEsZUFBZSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyx5QkFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQVFyRixRQUFBLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxNQUFXLEVBQUUsRUFBRSxFQUFFO0lBRXpELGlCQUFPLENBQUMsSUFBSSxDQUFDLEtBQVksRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUE7QUFRWSxRQUFBLHNCQUFzQixHQUFHLENBQUMsSUFBMkIsRUFBdUMsRUFBRTtJQUN2RyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsb0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3RGLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLG9CQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFNLENBQUMsQ0FBQTtTQUNwRjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLHVCQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBaUIsQ0FBQyxDQUFBO0tBQ2xHO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1osSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxvQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDMUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxvQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDdkU7SUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBU1ksUUFBQSxpQkFBaUIsR0FBRyxDQUFDLFFBQTRCLEVBQUUsRUFBVSxFQUFFLEVBQUU7SUFDMUUsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDOUIsT0FBTyxFQUFFLENBQUE7S0FDWjtJQUNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLDJCQUFlLENBQUMsRUFBRTtRQUNyQyxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsUUFBUSxrQkFBa0IsMkJBQWUsYUFBYSxDQUFDLENBQUE7S0FDNUY7SUFDRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsMkJBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNoRCxDQUFDLENBQUEifQ==