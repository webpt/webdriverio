"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementInViewport(elem) {
    if (!elem.getBoundingClientRect) {
        return false;
    }
    const rect = elem.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) > 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) > 0);
    return (vertInView && horInView);
}
exports.default = isElementInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbGVtZW50SW5WaWV3cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2lzRWxlbWVudEluVmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxTQUF3QixtQkFBbUIsQ0FBRSxJQUFpQjtJQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1FBQzdCLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtJQUV6QyxNQUFNLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNsRixNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUUvRSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQy9FLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFOUUsT0FBTyxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsQ0FBQTtBQUNwQyxDQUFDO0FBZEQsc0NBY0MifQ==