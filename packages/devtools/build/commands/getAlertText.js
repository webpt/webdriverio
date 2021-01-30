"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAlertText() {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    return this.activeDialog.message();
}
exports.default = getAlertText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWxlcnRUZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dldEFsZXJ0VGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLFNBQXdCLFlBQVk7SUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtLQUNuQztJQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUN0QyxDQUFDO0FBTkQsK0JBTUMifQ==