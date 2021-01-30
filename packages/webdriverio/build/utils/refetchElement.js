"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const implicitWait_1 = __importDefault(require("./implicitWait"));
async function refetchElement(currentElement, commandName) {
    let selectors = [];
    while (currentElement.elementId && currentElement.parent) {
        selectors.push({ selector: currentElement.selector, index: currentElement.index || 0 });
        currentElement = currentElement.parent;
    }
    selectors.reverse();
    const length = selectors.length;
    return selectors.reduce(async (elementPromise, { selector, index }, currentIndex) => {
        const resolvedElement = await elementPromise;
        let nextElement = index > 0 ? (await resolvedElement.$$(selector))[index] : null;
        nextElement = nextElement || await resolvedElement.$(selector);
        return await implicitWait_1.default(nextElement, currentIndex + 1 < length ? '$' : commandName);
    }, Promise.resolve(currentElement));
}
exports.default = refetchElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmZXRjaEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVmZXRjaEVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBeUM7QUFPMUIsS0FBSyxVQUFVLGNBQWMsQ0FDeEMsY0FBbUMsRUFDbkMsV0FBbUI7SUFFbkIsSUFBSSxTQUFTLEdBR1AsRUFBRSxDQUFBO0lBR1IsT0FBTyxjQUFjLENBQUMsU0FBUyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDdEQsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkYsY0FBYyxHQUFHLGNBQWMsQ0FBQyxNQUE2QixDQUFBO0tBQ2hFO0lBQ0QsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRW5CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7SUFHL0IsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUU7UUFDaEYsTUFBTSxlQUFlLEdBQUcsTUFBTSxjQUFjLENBQUE7UUFDNUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBa0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUMxRixXQUFXLEdBQUcsV0FBVyxJQUFJLE1BQU0sZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUs5RCxPQUFPLE1BQU0sc0JBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDekYsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBN0JELGlDQTZCQyJ9