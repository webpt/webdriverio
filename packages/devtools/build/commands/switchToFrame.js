"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../utils");
async function switchToFrame({ id }) {
    const page = this.getPageHandle(true);
    if (id === null && typeof page.parentFrame === 'function') {
        let parentFrame = await page.parentFrame();
        while (parentFrame) {
            parentFrame = await parentFrame.parentFrame();
        }
        this.currentFrame = parentFrame;
        return null;
    }
    const idAsElementReference = id;
    if (typeof idAsElementReference[constants_1.ELEMENT_KEY] === 'string') {
        const elementHandle = await this.elementStore.get(idAsElementReference[constants_1.ELEMENT_KEY]);
        if (!elementHandle) {
            throw utils_1.getStaleElementError(id);
        }
        const contentFrame = await elementHandle.contentFrame();
        if (!contentFrame) {
            throw new Error('no such frame');
        }
        this.currentFrame = contentFrame;
        return null;
    }
    if (typeof id === 'number') {
        let getFrames = page.frames || page.childFrames;
        const childFrames = await getFrames.apply(page);
        const childFrame = childFrames[id];
        if (!childFrame) {
            throw new Error('no such frame');
        }
        this.currentFrame = childFrame;
        return null;
    }
    throw new Error(`Could not switch frame, unknwon id: ${id}`);
}
exports.default = switchToFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoVG9GcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zd2l0Y2hUb0ZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsNENBQTBDO0FBQzFDLG9DQUErQztBQVloQyxLQUFLLFVBQVUsYUFBYSxDQUV2QyxFQUFFLEVBQUUsRUFBa0I7SUFFdEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQXFCLENBQUE7SUFLekQsSUFBSSxFQUFFLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7UUFDdkQsSUFBSSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDMUMsT0FBTyxXQUFXLEVBQUU7WUFDaEIsV0FBVyxHQUFHLE1BQU0sV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUE4QixDQUFBO1FBQ2xELE9BQU8sSUFBSSxDQUFBO0tBQ2Q7SUFLRCxNQUFNLG9CQUFvQixHQUFHLEVBQWlDLENBQUE7SUFDOUQsSUFBSSxPQUFPLG9CQUFvQixDQUFDLHVCQUFXLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBVyxDQUFDLENBQUMsQ0FBQTtRQUVwRixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2hCLE1BQU0sNEJBQW9CLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDakM7UUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUV2RCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtTQUNuQztRQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBK0IsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQTtLQUNkO0lBS0QsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7UUFJeEIsSUFBSSxTQUFTLEdBQUksSUFBd0IsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUNwRSxNQUFNLFdBQVcsR0FBRyxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDL0MsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRWxDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1NBQ25DO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUE2QixDQUFBO1FBQ2pELE9BQU8sSUFBSSxDQUFBO0tBQ2Q7SUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ2hFLENBQUM7QUEzREQsZ0NBMkRDIn0=