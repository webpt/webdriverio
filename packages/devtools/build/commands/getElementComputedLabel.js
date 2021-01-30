"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getElementComputedLabel({ elementId }) {
    const page = this.getPageHandle(true);
    const elementHandle = await this.elementStore.get(elementId);
    const snapshot = await page.accessibility.snapshot({
        root: elementHandle
    });
    if (!snapshot) {
        return '';
    }
    return snapshot.name;
}
exports.default = getElementComputedLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudENvbXB1dGVkTGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2V0RWxlbWVudENvbXB1dGVkTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVZSxLQUFLLFVBQVUsdUJBQXVCLENBRWpELEVBQUUsU0FBUyxFQUF5QjtJQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JDLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUMvQyxJQUFJLEVBQUUsYUFBYTtLQUN0QixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ1gsT0FBTyxFQUFFLENBQUE7S0FDWjtJQUVELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQTtBQUN4QixDQUFDO0FBZkQsMENBZUMifQ==