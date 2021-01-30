"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanUp(elem, dataProperty) {
    const elems = Array.isArray(elem) ? elem : [elem];
    for (const el of elems) {
        el.removeAttribute(dataProperty);
    }
}
exports.default = cleanUp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW5VcFNlcmlhbGl6YXRpb25TZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2NsZWFuVXBTZXJpYWxpemF0aW9uU2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxTQUF3QixPQUFPLENBQUUsSUFBeUIsRUFBRSxZQUFvQjtJQUM1RSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakQsS0FBSyxNQUFNLEVBQUUsSUFBSSxLQUFLLEVBQUU7UUFDcEIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtLQUNuQztBQUNMLENBQUM7QUFMRCwwQkFLQyJ9