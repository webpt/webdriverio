"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
async function getLocation(prop) {
    let location = {};
    if (this.isW3C) {
        location = await utils_1.getElementRect(this);
        delete location.width;
        delete location.height;
    }
    else {
        location = await this.getElementLocation(this.elementId);
    }
    if (prop === 'x' || prop === 'y') {
        return location[prop];
    }
    return location;
}
exports.default = getLocation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0TG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9nZXRMb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUE0QztBQTZCN0IsS0FBSyxVQUFVLFdBQVcsQ0FFckMsSUFBWTtJQUVaLElBQUksUUFBUSxHQUtSLEVBQUUsQ0FBQTtJQUVOLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNaLFFBQVEsR0FBRyxNQUFNLHNCQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQ3JCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQTtLQUN6QjtTQUFNO1FBQ0gsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUMzRDtJQUVELElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQzlCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBVyxDQUFBO0tBQ2xDO0lBRUQsT0FBTyxRQUdOLENBQUE7QUFDTCxDQUFDO0FBM0JELDhCQTJCQyJ9