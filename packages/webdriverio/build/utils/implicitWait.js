"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('webdriverio');
async function implicitWait(currentElement, commandName) {
    if (!currentElement.elementId && !commandName.match(/(waitUntil|waitFor|isExisting|is?\w+Displayed|is?\w+Clickable)/)) {
        log.debug(`command ${commandName} was called on an element ("${currentElement.selector}") ` +
            'that wasn\'t found, waiting for it...');
        try {
            await currentElement.waitForExist();
            return currentElement.parent.$(currentElement.selector);
        }
        catch {
            if (currentElement.selector.toString().includes('this.previousElementSibling')) {
                throw new Error(`Can't call ${commandName} on previous element of element with selector "${currentElement.parent.selector}" because sibling wasn't found`);
            }
            if (currentElement.selector.toString().includes('this.nextElementSibling')) {
                throw new Error(`Can't call ${commandName} on next element of element with selector "${currentElement.parent.selector}" because sibling wasn't found`);
            }
            if (currentElement.selector.toString().includes('this.parentElement')) {
                throw new Error(`Can't call ${commandName} on parent element of element with selector "${currentElement.parent.selector}" because it wasn't found`);
            }
            throw new Error(`Can't call ${commandName} on element with selector "${currentElement.selector}" because element wasn't found`);
        }
    }
    return currentElement;
}
exports.default = implicitWait;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbGljaXRXYWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2ltcGxpY2l0V2FpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUFpQztBQUVqQyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBT2xCLEtBQUssVUFBVSxZQUFZLENBQUUsY0FBbUMsRUFBRSxXQUFtQjtJQUNoRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsRUFBRTtRQUNuSCxHQUFHLENBQUMsS0FBSyxDQUNMLFdBQVcsV0FBVywrQkFBK0IsY0FBYyxDQUFDLFFBQVEsS0FBSztZQUNqRix1Q0FBdUMsQ0FDMUMsQ0FBQTtRQUVELElBQUk7WUFDQSxNQUFNLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUluQyxPQUFRLGNBQWMsQ0FBQyxNQUE4QixDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDbkY7UUFBQyxNQUFNO1lBQ0osSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFO2dCQUM1RSxNQUFNLElBQUksS0FBSyxDQUNYLGNBQWMsV0FBVyxrREFBbUQsY0FBYyxDQUFDLE1BQThCLENBQUMsUUFBUSxnQ0FBZ0MsQ0FBQyxDQUFBO2FBQzFLO1lBRUQsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO2dCQUN4RSxNQUFNLElBQUksS0FBSyxDQUNYLGNBQWMsV0FBVyw4Q0FBK0MsY0FBYyxDQUFDLE1BQThCLENBQUMsUUFBUSxnQ0FBZ0MsQ0FBQyxDQUFBO2FBQ3RLO1lBRUQsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO2dCQUNuRSxNQUFNLElBQUksS0FBSyxDQUNYLGNBQWMsV0FBVyxnREFBaUQsY0FBYyxDQUFDLE1BQThCLENBQUMsUUFBUSwyQkFBMkIsQ0FBQyxDQUFBO2FBQ25LO1lBRUQsTUFBTSxJQUFJLEtBQUssQ0FDWCxjQUFjLFdBQVcsOEJBQThCLGNBQWMsQ0FBQyxRQUFRLGdDQUFnQyxDQUFDLENBQUE7U0FDdEg7S0FDSjtJQUVELE9BQU8sY0FBYyxDQUFBO0FBQ3pCLENBQUM7QUFuQ0QsK0JBbUNDIn0=