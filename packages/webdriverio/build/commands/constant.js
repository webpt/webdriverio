"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.touchAction = exports.validateParameters = exports.formatArgs = void 0;
const TOUCH_ACTIONS = ['press', 'longPress', 'tap', 'moveTo', 'wait', 'release'];
const POS_ACTIONS = TOUCH_ACTIONS.slice(0, 4);
const ACCEPTED_OPTIONS = ['x', 'y', 'element'];
exports.formatArgs = function (scope, actions) {
    return actions.map((action) => {
        if (Array.isArray(action)) {
            return exports.formatArgs(scope, action);
        }
        if (typeof action === 'string') {
            action = { action };
        }
        const formattedAction = {
            action: action.action,
            options: {}
        };
        const actionElement = action.element && typeof action.element.elementId === 'string'
            ? action.element.elementId
            : scope.elementId;
        if (POS_ACTIONS.includes(action.action) && formattedAction.options && actionElement) {
            formattedAction.options.element = actionElement;
        }
        if (formattedAction.options && typeof action.x === 'number' && isFinite(action.x))
            formattedAction.options.x = action.x;
        if (formattedAction.options && typeof action.y === 'number' && isFinite(action.y))
            formattedAction.options.y = action.y;
        if (formattedAction.options && action.ms)
            formattedAction.options.ms = action.ms;
        if (formattedAction.options && Object.keys(formattedAction.options).length === 0) {
            delete formattedAction.options;
        }
        return formattedAction;
    });
};
exports.validateParameters = (params) => {
    const options = Object.keys(params.options || {});
    if (params.action === 'release' && options.length !== 0) {
        throw new Error('action "release" doesn\'t accept any options ' +
            `("${options.join('", "')}" found)`);
    }
    if (params.action === 'wait' &&
        (options.includes('x') || options.includes('y'))) {
        throw new Error('action "wait" doesn\'t accept x or y options');
    }
    if (POS_ACTIONS.includes(params.action)) {
        for (const option in params.options) {
            if (!ACCEPTED_OPTIONS.includes(option)) {
                throw new Error(`action "${params.action}" doesn't accept "${option}" as option`);
            }
        }
        if (options.length === 0) {
            throw new Error(`Touch actions like "${params.action}" need at least some kind of ` +
                'position information like "element", "x" or "y" options, you\'ve none given.');
        }
    }
};
exports.touchAction = function (actions) {
    if (!this.multiTouchPerform || !this.touchPerform) {
        throw new Error('touchAction can be used with Appium only.');
    }
    if (!Array.isArray(actions)) {
        actions = [actions];
    }
    const formattedAction = exports.formatArgs(this, actions);
    const protocolCommand = Array.isArray(actions[0])
        ? this.multiTouchPerform.bind(this)
        : this.touchPerform.bind(this);
    formattedAction.forEach((params) => exports.validateParameters(params));
    return protocolCommand(formattedAction);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ2hGLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBV2pDLFFBQUEsVUFBVSxHQUFHLFVBQ3RCLEtBQWlGLEVBQ2pGLE9BQXVCO0lBRXZCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQW1CLEVBQUUsRUFBRTtRQUN2QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsT0FBTyxrQkFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQVEsQ0FBQTtTQUMxQztRQUVELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLE1BQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFBO1NBQ3RCO1FBRUQsTUFBTSxlQUFlLEdBQXFCO1lBQ3RDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixPQUFPLEVBQUUsRUFBMEI7U0FDdEMsQ0FBQTtRQUtELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBUSxNQUFNLENBQUMsT0FBc0MsQ0FBQyxTQUFTLEtBQUssUUFBUTtZQUNoSCxDQUFDLENBQUUsTUFBTSxDQUFDLE9BQXNDLENBQUMsU0FBUztZQUMxRCxDQUFDLENBQUUsS0FBNkIsQ0FBQyxTQUFTLENBQUE7UUFDOUMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxN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