"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.react$$ = exports.react$ = exports.waitToLoadReact = void 0;
exports.waitToLoadReact = function waitToLoadReact() {
    window.resq.waitToLoadReact();
};
exports.react$ = function react$(selector, props, state, reactElement) {
    props = props || {};
    state = state || {};
    let element = window.resq.resq$(selector, reactElement);
    if (Object.keys(props).length) {
        element = element.byProps(props);
    }
    if (Object.keys(state).length) {
        element = element.byState(state);
    }
    if (!element.name) {
        return { message: `React element with selector "${selector}" wasn't found` };
    }
    return element.isFragment && element.node
        ? element.node[0]
        : element.node;
};
exports.react$$ = function react$$(selector, props, state, reactElement) {
    let elements = window.resq.resq$$(selector, reactElement);
    if (Object.keys(props).length) {
        elements = elements.byProps(props);
    }
    if (Object.keys(state).length) {
        elements = elements.byState(state);
    }
    if (!elements.length) {
        return [];
    }
    let nodes = [];
    elements.forEach(element => {
        const { node, isFragment } = element;
        if (isFragment) {
            nodes = nodes.concat(node || []);
        }
        else if (node) {
            nodes.push(node);
        }
    });
    return [...nodes];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL3Jlc3EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUWEsUUFBQSxlQUFlLEdBQUcsU0FBUyxlQUFlO0lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7QUFDakMsQ0FBQyxDQUFBO0FBRVksUUFBQSxNQUFNLEdBQUcsU0FBUyxNQUFNLENBQ2pDLFFBQWdCLEVBQ2hCLEtBQVksRUFDWixLQUEwQixFQUMxQixZQUF5QjtJQUV6QixLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQTtJQUNuQixLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQTtJQUVuQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFFdkQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUUzQixPQUFPLEdBQUksT0FBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUM1QztJQUVELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFFM0IsT0FBTyxHQUFJLE9BQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDNUM7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtRQUNmLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLFFBQVEsZ0JBQWdCLEVBQUUsQ0FBQTtLQUMvRTtJQUlELE9BQU8sT0FBTyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsSUFBSTtRQUNyQyxDQUFDLENBQUUsT0FBTyxDQUFDLElBQTZCLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO0FBQ3RCLENBQUMsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUNuQyxRQUFnQixFQUNoQixLQUFZLEVBQ1osS0FBNkIsRUFDN0IsWUFBeUI7SUFFekIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBRXpELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFFM0IsUUFBUSxHQUFJLFFBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQzlDO0lBRUQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUUzQixRQUFRLEdBQUksUUFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDOUM7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNsQixPQUFPLEVBQUUsQ0FBQTtLQUNaO0lBS0QsSUFBSSxLQUFLLEdBQWtCLEVBQUUsQ0FBQTtJQUU3QixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFBO1FBRXBDLElBQUksVUFBVSxFQUFFO1lBQ1osS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQ25DO2FBQU0sSUFBSSxJQUFJLEVBQUU7WUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ25CO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtBQUNyQixDQUFDLENBQUEifQ==