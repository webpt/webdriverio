"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiremoteHandler = exports.elementErrorHandler = void 0;
const refetchElement_1 = __importDefault(require("./utils/refetchElement"));
const implicitWait_1 = __importDefault(require("./utils/implicitWait"));
const constants_1 = require("./constants");
exports.elementErrorHandler = (fn) => (commandName, commandFn) => {
    return function elementErrorHandlerCallback(...args) {
        return fn(commandName, async function elementErrorHandlerCallbackFn() {
            const element = await implicitWait_1.default(this, commandName);
            this.elementId = element.elementId;
            this[constants_1.ELEMENT_KEY] = element.elementId;
            try {
                const result = await fn(commandName, commandFn).apply(this, args);
                if (result && result.error === 'no such element') {
                    const err = new Error();
                    err.name = 'stale element reference';
                    throw err;
                }
                return result;
            }
            catch (error) {
                if (error.name === 'stale element reference') {
                    const element = await refetchElement_1.default(this, commandName);
                    this.elementId = element.elementId;
                    this.parent = element.parent;
                    return await fn(commandName, commandFn).apply(this, args);
                }
                throw error;
            }
        }).apply(this);
    };
};
exports.multiremoteHandler = (wrapCommand) => (commandName) => {
    return wrapCommand(commandName, function (...args) {
        const commandResults = this.instances.map((instanceName) => {
            return this[instanceName][commandName](...args);
        });
        return Promise.all(commandResults);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWlkZGxld2FyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNEVBQW1EO0FBQ25ELHdFQUErQztBQUMvQywyQ0FBeUM7QUFRNUIsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLEVBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFtQixFQUFFLFNBQW1CLEVBQUUsRUFBRTtJQUM5RixPQUFPLFNBQVMsMkJBQTJCLENBQTZCLEdBQUcsSUFBVztRQUNsRixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLDZCQUE2QjtZQUMvRCxNQUFNLE9BQU8sR0FBRyxNQUFNLHNCQUFZLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtZQUNsQyxJQUFJLENBQUMsdUJBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUE7WUFFckMsSUFBSTtnQkFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFNakUsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxpQkFBaUIsRUFBRTtvQkFDOUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtvQkFDdkIsR0FBRyxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQTtvQkFDcEMsTUFBTSxHQUFHLENBQUE7aUJBQ1o7Z0JBRUQsT0FBTyxNQUFNLENBQUE7YUFDaEI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUsseUJBQXlCLEVBQUU7b0JBQzFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUE7b0JBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQTtvQkFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFBO29CQUU1QixPQUFPLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2lCQUM1RDtnQkFDRCxNQUFNLEtBQUssQ0FBQTthQUNkO1FBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRWxCLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUtZLFFBQUEsa0JBQWtCLEdBQUcsQ0FDOUIsV0FBcUIsRUFDdkIsRUFBRSxDQUFDLENBQUMsV0FBc0MsRUFBRSxFQUFFO0lBQzVDLE9BQU8sV0FBVyxDQUFDLFdBQVcsRUFBRSxVQUFnRCxHQUFHLElBQVc7UUFFMUYsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFvQixFQUFFLEVBQUU7WUFFL0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUNuRCxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUN0QyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSJ9