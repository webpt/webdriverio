"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function doubleClick() {
    if (!this.isW3C) {
        await this.moveTo();
        return this.positionDoubleClick();
    }
    return this.performActions([{
            type: 'pointer',
            id: 'pointer1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', origin: this, x: 0, y: 0 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 },
                { type: 'pause', duration: 10 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
}
exports.default = doubleClick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG91YmxlQ2xpY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9kb3VibGVDbGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXVCZSxLQUFLLFVBQVUsV0FBVztJQUlyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNiLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ25CLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7S0FDcEM7SUFLRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN4QixJQUFJLEVBQUUsU0FBUztZQUNmLEVBQUUsRUFBRSxVQUFVO1lBQ2QsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRTtZQUNwQyxPQUFPLEVBQUU7Z0JBQ0wsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqRCxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDbEMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7Z0JBQ2hDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO2dCQUMvQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDbEMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7YUFDbkM7U0FDSixDQUFDLENBQUMsQ0FBQTtBQUNQLENBQUM7QUF6QkQsOEJBeUJDIn0=