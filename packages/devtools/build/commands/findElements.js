"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
async function findElements({ using, value }) {
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
    return utils_1.findElements.call(this, page, using, value);
}
exports.default = findElements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEVsZW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2ZpbmRFbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUE0RDtBQUM1RCxvQ0FBMkQ7QUFhNUMsS0FBSyxVQUFVLFlBQVksQ0FFdEMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFvQztJQUVsRCxJQUFJLENBQUMseUNBQTZCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLEtBQUssd0JBQXdCLENBQUMsQ0FBQTtLQUN2RTtJQUVELElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUN2QixLQUFLLEdBQUcsT0FBTyxDQUFBO1FBQ2YsS0FBSyxHQUFHLDRCQUE0QixLQUFLLElBQUksQ0FBQTtLQUNoRDtTQUFNLElBQUksS0FBSyxLQUFLLG1CQUFtQixFQUFFO1FBQ3RDLEtBQUssR0FBRyxPQUFPLENBQUE7UUFDZixLQUFLLEdBQUcsb0JBQW9CLEtBQUssS0FBSyxDQUFBO0tBQ3pDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxPQUFPLG9CQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUMxRCxDQUFDO0FBbEJELCtCQWtCQyJ9