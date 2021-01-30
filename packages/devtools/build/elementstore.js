"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ElementStore {
    constructor() {
        this._index = 0;
        this._elementMap = new Map();
    }
    set(elementHandle) {
        const index = `ELEMENT-${++this._index}`;
        this._elementMap.set(index, elementHandle);
        return index;
    }
    async get(index) {
        const elementHandle = this._elementMap.get(index);
        if (!elementHandle) {
            return elementHandle;
        }
        const isElementAttachedToDOM = await elementHandle.evaluate((el) => {
            return el.isConnected;
        });
        return isElementAttachedToDOM ? elementHandle : undefined;
    }
    clear() {
        this._elementMap.clear();
    }
}
exports.default = ElementStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudHN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VsZW1lbnRzdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQXFCLFlBQVk7SUFBakM7UUFDWSxXQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsZ0JBQVcsR0FBK0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQTBCL0QsQ0FBQztJQXhCRyxHQUFHLENBQUUsYUFBNEI7UUFDN0IsTUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDMUMsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUUsS0FBYTtRQUNwQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVqRCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2hCLE9BQU8sYUFBYSxDQUFBO1NBQ3ZCO1FBRUQsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFlLEVBQUUsRUFBRTtZQUU1RSxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUE7UUFDekIsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsQ0FBQztDQUNKO0FBNUJELCtCQTRCQyJ9