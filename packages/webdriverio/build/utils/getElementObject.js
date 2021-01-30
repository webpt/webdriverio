"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElements = exports.getElement = void 0;
const utils_1 = require("@wdio/utils");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const _1 = require(".");
const middlewares_1 = require("../middlewares");
const constants_1 = require("../constants");
exports.getElement = function findElement(selector, res, isReactElement = false) {
    const browser = _1.getBrowserObject(this);
    const propertiesObject = {
        ...lodash_clonedeep_1.default(browser.__propertiesObject__),
        ..._1.getPrototype('element'),
        scope: { value: 'element' }
    };
    const element = utils_1.webdriverMonad(this.options, (client) => {
        const elementId = _1.getElementFromResponse(res);
        if (elementId) {
            client.elementId = elementId;
            if (this.isW3C) {
                client[constants_1.ELEMENT_KEY] = elementId;
            }
            else {
                client.ELEMENT = elementId;
            }
        }
        else {
            client.error = res;
        }
        client.selector = selector || '';
        client.parent = this;
        client.emit = this.emit.bind(this);
        client.isReactElement = isReactElement;
        return client;
    }, propertiesObject);
    const elementInstance = element(this.sessionId, middlewares_1.elementErrorHandler(utils_1.wrapCommand));
    const origAddCommand = elementInstance.addCommand.bind(elementInstance);
    elementInstance.addCommand = (name, fn) => {
        browser.__propertiesObject__[name] = { value: fn };
        origAddCommand(name, utils_1.runFnInFiberContext(fn));
    };
    return elementInstance;
};
exports.getElements = function getElements(selector, elemResponse, isReactElement = false) {
    const browser = _1.getBrowserObject(this);
    const propertiesObject = {
        ...lodash_clonedeep_1.default(browser.__propertiesObject__),
        ..._1.getPrototype('element')
    };
    const elements = elemResponse.map((res, i) => {
        propertiesObject.scope = { value: 'element' };
        const element = utils_1.webdriverMonad(this.options, (client) => {
            const elementId = _1.getElementFromResponse(res);
            if (elementId) {
                client.elementId = elementId;
                const elementKey = this.isW3C ? constants_1.ELEMENT_KEY : 'ELEMENT';
                client[elementKey] = elementId;
            }
            else {
                client.error = res;
            }
            client.selector = selector;
            client.parent = this;
            client.index = i;
            client.emit = this.emit.bind(this);
            client.isReactElement = isReactElement;
            return client;
        }, propertiesObject);
        const elementInstance = element(this.sessionId, middlewares_1.elementErrorHandler(utils_1.wrapCommand));
        const origAddCommand = elementInstance.addCommand.bind(elementInstance);
        elementInstance.addCommand = (name, fn) => {
            browser.__propertiesObject__[name] = { value: fn };
            origAddCommand(name, utils_1.runFnInFiberContext(fn));
        };
        return elementInstance;
    });
    return elements;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXRFbGVtZW50T2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUE4RTtBQUM5RSx3RUFBb0M7QUFHcEMsd0JBQThGO0FBQzlGLGdEQUFvRDtBQUNwRCw0Q0FBMEM7QUFTN0IsUUFBQSxVQUFVLEdBQUcsU0FBUyxXQUFXLENBRTFDLFFBQW1CLEVBQ25CLEdBQThCLEVBQzlCLGNBQWMsR0FBRyxLQUFLO0lBRXRCLE1BQU0sT0FBTyxHQUFHLG1CQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sZ0JBQWdCLEdBQUc7UUFDckIsR0FBRywwQkFBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztRQUN0QyxHQUFHLGVBQWdCLENBQUMsU0FBUyxDQUFDO1FBQzlCLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7S0FDOUIsQ0FBQTtJQUVELE1BQU0sT0FBTyxHQUFHLHNCQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQTJCLEVBQUUsRUFBRTtRQUN6RSxNQUFNLFNBQVMsR0FBRyx5QkFBc0IsQ0FBQyxHQUF1QixDQUFDLENBQUE7UUFFakUsSUFBSSxTQUFTLEVBQUU7WUFJWCxNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtZQUs1QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1gsTUFBYyxDQUFDLHVCQUFXLENBQUMsR0FBRyxTQUFTLENBQUE7YUFDM0M7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUE7YUFDN0I7U0FDSjthQUFNO1lBQ0gsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFZLENBQUE7U0FDOUI7UUFFRCxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUE7UUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FB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