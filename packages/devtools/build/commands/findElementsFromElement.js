"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
async function findElementFromElements({ elementId, using, value }) {
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
    return utils_1.findElements.call(this, elementHandle, using, value);
}
exports.default = findElementFromElements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEVsZW1lbnRzRnJvbUVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmluZEVsZW1lbnRzRnJvbUVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEQ7QUFDNUQsb0NBQTZEO0FBYTlDLEtBQUssVUFBVSx1QkFBdUIsQ0FFakQsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBdUQ7SUFFaEYsSUFBSSxDQUFDLHlDQUE2QixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixLQUFLLHdCQUF3QixDQUFDLENBQUE7S0FDdkU7SUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBRTVELElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDaEIsTUFBTSw0QkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUN4QztJQUVELElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUN2QixLQUFLLEdBQUcsT0FBTyxDQUFBO1FBQ2YsS0FBSyxHQUFHLDZCQUE2QixLQUFLLElBQUksQ0FBQTtLQUNqRDtTQUFNLElBQUksS0FBSyxLQUFLLG1CQUFtQixFQUFFO1FBQ3RDLEtBQUssR0FBRyxPQUFPLENBQUE7UUFDZixLQUFLLEdBQUcscUJBQXFCLEtBQUssS0FBSyxDQUFBO0tBQzFDO0lBRUQsT0FBTyxvQkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUMvRCxDQUFDO0FBdkJELDBDQXVCQyJ9