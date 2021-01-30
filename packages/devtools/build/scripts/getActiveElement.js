"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getActiveElement(_, dataProperty) {
    if (!document.activeElement) {
        return false;
    }
    document.activeElement.setAttribute(dataProperty, 'true');
    return true;
}
exports.default = getActiveElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWN0aXZlRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2dldEFjdGl2ZUVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxTQUF3QixnQkFBZ0IsQ0FBRSxDQUFVLEVBQUUsWUFBb0I7SUFDdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDekIsT0FBTyxLQUFLLENBQUE7S0FDZjtJQUVELFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN6RCxPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFQRCxtQ0FPQyJ9