"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function dismissAlert() {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    await this.activeDialog.dismiss();
    delete this.activeDialog;
    return null;
}
exports.default = dismissAlert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzbWlzc0FsZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Rpc21pc3NBbGVydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVlLEtBQUssVUFBVSxZQUFZO0lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7S0FDbkM7SUFFRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDakMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBQ3hCLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQVJELCtCQVFDIn0=