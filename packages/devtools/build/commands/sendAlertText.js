"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function sendAlertText({ text }) {
    if (!this.activeDialog) {
        throw new Error('no such alert');
    }
    await this.activeDialog.accept(text);
    return null;
}
exports.default = sendAlertText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFsZXJ0VGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZW5kQWxlcnRUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU2UsS0FBSyxVQUFVLGFBQWEsQ0FFdkMsRUFBRSxJQUFJLEVBQW9CO0lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7S0FDbkM7SUFFRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BDLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQVRELGdDQVNDIn0=