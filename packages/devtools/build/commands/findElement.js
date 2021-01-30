"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
function findElement({ using, value }) {
    if (!constants_1.SUPPORTED_SELECTOR_STRATEGIES.includes(using)) {
        throw new Error(`selector strategy "${using}" is not yet supported`);
    }
    if (using === 'link text') {
        using = 'xpath';
        value = `//a[normalize-space() = "${value}"]`;
    }
    else if (using === 'partial link text') {
        using = 'xpath';
        value = `//a[contains(., "${value}")]`;
    }
    const page = this.getPageHandle(true);
    return utils_1.findElement.call(this, page, using, value);
}
exports.default = findElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmluZEVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEQ7QUFDNUQsb0NBQXlEO0FBYXpELFNBQXdCLFdBQVcsQ0FFL0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFvQztJQUVsRCxJQUFJLENBQUMseUNBQTZCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLEtBQUssd0JBQXdCLENBQUMsQ0FBQTtLQUN2RTtJQUVELElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUN2QixLQUFLLEdBQUcsT0FBTyxDQUFBO1FBQ2YsS0FBSyxHQUFHLDRCQUE0QixLQUFLLElBQUksQ0FBQTtLQUNoRDtTQUFNLElBQUksS0FBSyxLQUFLLG1CQUFtQixFQUFFO1FBQ3RDLEtBQUssR0FBRyxPQUFPLENBQUE7UUFDZixLQUFLLEdBQUcsb0JBQW9CLEtBQUssS0FBSyxDQUFBO0tBQ3pDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxPQUFPLG1CQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ3pELENBQUM7QUFsQkQsOEJBa0JDIn0=