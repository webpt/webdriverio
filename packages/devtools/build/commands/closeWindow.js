"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
async function closeWindow() {
    delete this.currentFrame;
    const page = this.getPageHandle();
    await page.close();
    this.windows.delete(this.currentWindowHandle || '');
    const handles = this.windows.keys();
    this.currentWindowHandle = handles.next().value;
    if (!this.currentWindowHandle) {
        const page = await this.browser.newPage();
        const newWindowHandle = uuid_1.v4();
        this.windows.set(newWindowHandle, page);
        this.currentWindowHandle = newWindowHandle;
    }
    const newPage = this.getPageHandle();
    await newPage.bringToFront();
    return this.currentWindowHandle;
}
exports.default = closeWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VXaW5kb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY2xvc2VXaW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBbUM7QUFXcEIsS0FBSyxVQUFVLFdBQVc7SUFDckMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBRXhCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUNqQyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQUE7SUFFbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQTtJQUUvQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1FBQzNCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN6QyxNQUFNLGVBQWUsR0FBRyxTQUFNLEVBQUUsQ0FBQTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQTtLQUM3QztJQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUNwQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUM1QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQTtBQUNuQyxDQUFDO0FBcEJELDhCQW9CQyJ9