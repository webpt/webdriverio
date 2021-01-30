"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeErrorMessage = exports.stackTraceFilter = void 0;
const constants_1 = require("./constants");
exports.stackTraceFilter = (stackRow) => {
    if (stackRow.match(constants_1.STACK_START)) {
        return !constants_1.STACKTRACE_FILTER.some(r => stackRow.includes(r));
    }
    return true;
};
function sanitizeErrorMessage(commandError, savedError) {
    var _a;
    let name, stack, message;
    if (commandError instanceof Error) {
        ({ name, message, stack } = commandError);
    }
    else {
        name = 'Error';
        message = commandError;
    }
    const err = new Error(message);
    err.name = name;
    let stackArr = ((_a = savedError.stack) === null || _a === void 0 ? void 0 : _a.split('\n')) || [];
    if (stack) {
        stack = stack.replace(`${err.name}: ${err.name}`, err.name);
        stackArr[0] = '\n';
        stackArr = [...stack.split('\n'), ...stackArr];
    }
    err.stack = stackArr
        .filter(exports.stackTraceFilter)
        .reduce((acc, currentValue) => {
        return acc.includes(currentValue) ? acc : `${acc}\n${currentValue}`;
    }, '')
        .trim();
    return err;
}
exports.sanitizeErrorMessage = sanitizeErrorMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTREO0FBTy9DLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDakQsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLHVCQUFXLENBQUMsRUFBRTtRQUM3QixPQUFPLENBQUMsNkJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzVEO0lBQ0QsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDLENBQUE7QUFRRCxTQUFnQixvQkFBb0IsQ0FBRSxZQUFtQixFQUFFLFVBQWlCOztJQUN4RSxJQUFJLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFBO0lBQ3hCLElBQUksWUFBWSxZQUFZLEtBQUssRUFBRTtRQUMvQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQTtLQUM1QztTQUFNO1FBQ0gsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNkLE9BQU8sR0FBRyxZQUFZLENBQUE7S0FDekI7SUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM5QixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUVmLElBQUksUUFBUSxHQUFHLE9BQUEsVUFBVSxDQUFDLEtBQUssMENBQUUsS0FBSyxDQUFDLElBQUksTUFBSyxFQUFFLENBQUE7SUFLbEQsSUFBSSxLQUFLLEVBQUU7UUFFUCxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUUzRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO1FBRWxCLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFBO0tBQ2pEO0lBRUQsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRO1NBRWYsTUFBTSxDQUFDLHdCQUFnQixDQUFDO1NBRXhCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsRUFBRTtRQUMxQixPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssWUFBWSxFQUFFLENBQUE7SUFDdkUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNMLElBQUksRUFBRSxDQUFBO0lBRVgsT0FBTyxHQUFHLENBQUE7QUFDZCxDQUFDO0FBcENELG9EQW9DQyJ9