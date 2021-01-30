"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function click(options) {
    if (typeof options === 'undefined') {
        return this.elementClick(this.elementId);
    }
    if (typeof options !== 'object' || Array.isArray(options)) {
        throw new TypeError('Options must be an object');
    }
    let { button = 0, x: xoffset = 0, y: yoffset = 0 } = options || {};
    if (typeof xoffset !== 'number'
        || typeof yoffset !== 'number'
        || !Number.isInteger(xoffset)
        || !Number.isInteger(yoffset)) {
        throw new TypeError('Coördinates must be integers');
    }
    if (button === 'left') {
        button = 0;
    }
    if (button === 'middle') {
        button = 1;
    }
    if (button === 'right') {
        button = 2;
    }
    if (![0, 1, 2].includes(button)) {
        throw new Error('Button type not supported.');
    }
    if (this.isW3C) {
        await this.performActions([{
                type: 'pointer',
                id: 'pointer1',
                parameters: {
                    pointerType: 'mouse'
                },
                actions: [{
                        type: 'pointerMove',
                        origin: this,
                        x: xoffset,
                        y: yoffset
                    }, {
                        type: 'pointerDown',
                        button
                    }, {
                        type: 'pointerUp',
                        button
                    }]
            }]);
        return this.releaseActions();
    }
    const { width, height } = await this.getElementSize(this.elementId);
    await this.moveToElement(this.elementId, xoffset + (width / 2), yoffset + (height / 2));
    return this.positionClick(button);
}
exports.default = click;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9jbGljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXdFZSxLQUFLLFVBQVUsS0FBSyxDQUUvQixPQUFzQjtJQUV0QixJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0tBQzNDO0lBRUQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN2RCxNQUFNLElBQUksU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUE7S0FDbkQ7SUFFRCxJQUFJLEVBQ0EsTUFBTSxHQUFHLENBQUMsRUFDVixDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFDZCxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFDakIsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO0lBRWpCLElBQ0ksT0FBTyxPQUFPLEtBQUssUUFBUTtXQUN4QixPQUFPLE9BQU8sS0FBSyxRQUFRO1dBQzNCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7V0FDMUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQy9CLE1BQU0sSUFBSSxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQTtLQUN0RDtJQUVELElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtRQUNuQixNQUFNLEdBQUcsQ0FBQyxDQUFBO0tBQ2I7SUFDRCxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDckIsTUFBTSxHQUFHLENBQUMsQ0FBQTtLQUNiO0lBQ0QsSUFBSSxNQUFNLEtBQUssT0FBTyxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxDQUFDLENBQUE7S0FDYjtJQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQWdCLENBQUMsRUFBRTtRQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7S0FDaEQ7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDWixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsVUFBVSxFQUFFO29CQUNSLFdBQVcsRUFBRSxPQUFPO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQzt3QkFDTixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsTUFBTSxFQUFFLElBQUk7d0JBQ1osQ0FBQyxFQUFFLE9BQU87d0JBQ1YsQ0FBQyxFQUFFLE9BQU87cUJBQ2IsRUFBRTt3QkFDQyxJQUFJLEVBQUUsYUFBYTt3QkFDbkIsTUFBTTtxQkFDVCxFQUFFO3dCQUNDLElBQUksRUFBRSxXQUFXO3dCQUNqQixNQUFNO3FCQUNULENBQUM7YUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVILE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0tBQy9CO0lBRUQsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ25FLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN2RixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBZ0IsQ0FBQyxDQUFBO0FBQy9DLENBQUM7QUFsRUQsd0JBa0VDIn0=