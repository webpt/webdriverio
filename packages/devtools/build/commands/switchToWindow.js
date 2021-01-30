"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function switchToWindow({ handle }) {
    if (!this.windows.has(handle)) {
        throw new Error(`window with handle ${handle} not found`);
    }
    delete this.currentFrame;
    this.currentWindowHandle = handle;
    const page = this.getPageHandle();
    page.on('dialog', this.dialogHandler.bind(this));
    await page.bringToFront();
    return handle;
}
exports.default = switchToWindow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoVG9XaW5kb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3dpdGNoVG9XaW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVZSxLQUFLLFVBQVUsY0FBYyxDQUV4QyxFQUFFLE1BQU0sRUFBc0I7SUFFOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLE1BQU0sWUFBWSxDQUFDLENBQUE7S0FDNUQ7SUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUE7SUFDeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQTtJQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNoRCxNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUV6QixPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO0FBZkQsaUNBZUMifQ==