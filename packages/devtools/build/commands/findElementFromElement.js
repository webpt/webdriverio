"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
async function findElementFromElement({ elementId, using, value }) {
    if (!constants_1.SUPPORTED_SELECTOR_STRATEGIES.includes(using)) {
        throw new Error(`selector strategy "${using}" is not yet supported`);
    }
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    if (using === 'link text') {
        using = 'xpath';
        value = `.//a[normalize-space() = "${value}"]`;
    }
    else if (using === 'partial link text') {
        using = 'xpath';
        value = `.//a[contains(., "${value}")]`;
    }
    return utils_1.findElement.call(this, elementHandle, using, value);
}
exports.default = findElementFromElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEVsZW1lbnRGcm9tRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9maW5kRWxlbWVudEZyb21FbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTREO0FBQzVELG9DQUE0RDtBQWE3QyxLQUFLLFVBQVUsc0JBQXNCLENBRWhELEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQXVEO0lBRWhGLElBQUksQ0FBQyx5Q0FBNkIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsS0FBSyx3QkFBd0IsQ0FBQyxDQUFBO0tBQ3ZFO0lBRUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUU1RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2hCLE1BQU0sNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEM7SUFFRCxJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDdkIsS0FBSyxHQUFHLE9BQU8sQ0FBQTtRQUNmLEtBQUssR0FBRyw2QkFBNkIsS0FBSyxJQUFJLENBQUE7S0FDakQ7U0FBTSxJQUFJLEtBQUssS0FBSyxtQkFBbUIsRUFBRTtRQUN0QyxLQUFLLEdBQUcsT0FBTyxDQUFBO1FBQ2YsS0FBSyxHQUFHLHFCQUFxQixLQUFLLEtBQUssQ0FBQTtLQUMxQztJQUVELE9BQU8sbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDOUQsQ0FBQztBQXZCRCx5Q0F1QkMifQ==