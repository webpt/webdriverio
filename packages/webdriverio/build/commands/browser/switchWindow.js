"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function switchWindow(urlOrTitleToMatch) {
    if (typeof urlOrTitleToMatch !== 'string' && !(urlOrTitleToMatch instanceof RegExp)) {
        throw new Error('Unsupported parameter for switchWindow, required is "string" or an RegExp');
    }
    const tabs = await this.getWindowHandles();
    const matchesTarget = (target) => {
        if (typeof urlOrTitleToMatch === 'string') {
            return target.includes(urlOrTitleToMatch);
        }
        return !!target.match(urlOrTitleToMatch);
    };
    for (const tab of tabs) {
        await this.switchToWindow(tab);
        const url = await this.getUrl();
        if (matchesTarget(url)) {
            return tab;
        }
        const title = await this.getTitle();
        if (matchesTarget(title)) {
            return tab;
        }
    }
    throw new Error(`No window found with title or url matching "${urlOrTitleToMatch}"`);
}
exports.default = switchWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoV2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Jyb3dzZXIvc3dpdGNoV2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBMkJlLEtBQUssVUFBVSxZQUFZLENBRXRDLGlCQUFrQztJQUtsQyxJQUFJLE9BQU8saUJBQWlCLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsWUFBWSxNQUFNLENBQUMsRUFBRTtRQUNqRixNQUFNLElBQUksS0FBSyxDQUFDLDJFQUEyRSxDQUFDLENBQUE7S0FDL0Y7SUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0lBRTFDLE1BQU0sYUFBYSxHQUFHLENBQUMsTUFBYyxFQUFXLEVBQUU7UUFDOUMsSUFBSSxPQUFPLGlCQUFpQixLQUFJLFFBQVEsRUFBRTtZQUN0QyxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtTQUM1QztRQUNELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUM1QyxDQUFDLENBQUE7SUFFRCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtRQUNwQixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7UUFLOUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDL0IsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxHQUFHLENBQUE7U0FDYjtRQUtELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ25DLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sR0FBRyxDQUFBO1NBQ2I7S0FDSjtJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLGlCQUFpQixHQUFHLENBQUMsQ0FBQTtBQUN4RixDQUFDO0FBekNELCtCQXlDQyJ9