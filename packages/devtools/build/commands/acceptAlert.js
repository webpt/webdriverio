"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function acceptAlert() {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    await this.activeDialog.accept();
    delete this.activeDialog;
    return null;
}
exports.default = acceptAlert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXB0QWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYWNjZXB0QWxlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRZSxLQUFLLFVBQVUsV0FBVztJQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0tBQ25DO0lBRUQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2hDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTtJQUN4QixPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFSRCw4QkFRQyJ9