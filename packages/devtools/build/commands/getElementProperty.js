"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
async function getElementProperty({ elementId, name }) {
    const elementHandle = await this.elementStore.get(elementId);
    if (!elementHandle) {
        throw utils_1.getStaleElementError(elementId);
    }
    const jsHandle = await elementHandle.getProperty(name);
    if (!jsHandle) {
        return null;
    }
    return jsHandle.jsonValue();
}
exports.default = getElementProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dldEVsZW1lbnRQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUErQztBQVloQyxLQUFLLFVBQVUsa0JBQWtCLENBRTVDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBdUM7SUFFeEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUU1RCxJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2hCLE1BQU0sNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDeEM7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNYLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7SUFFRCxPQUFPLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtBQUMvQixDQUFDO0FBaEJELHFDQWdCQyJ9