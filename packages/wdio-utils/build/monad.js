"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("./utils");
const SCOPE_TYPES = {
    browser: function Browser() { },
    element: function Element() { }
};
function WebDriver(options, modifier, propertiesObject = {}) {
    var _a;
    const scopeType = SCOPE_TYPES[((_a = propertiesObject.scope) === null || _a === void 0 ? void 0 : _a.value) || 'browser'];
    delete propertiesObject.scope;
    const prototype = Object.create(scopeType.prototype);
    const log = logger_1.default('webdriver');
    const eventHandler = new events_1.EventEmitter();
    const EVENTHANDLER_FUNCTIONS = Object.getPrototypeOf(eventHandler);
    function unit(sessionId, commandWrapper) {
        propertiesObject.commandList = { value: Object.keys(propertiesObject) };
        propertiesObject.options = { value: options };
        propertiesObject.requestedCapabilities = { value: options.requestedCapabilities };
        if (typeof commandWrapper === 'function') {
            for (const [commandName, { value }] of Object.entries(propertiesObject)) {
                if (typeof value !== 'function') {
                    continue;
                }
                propertiesObject[commandName].value = commandWrapper(commandName, value);
                propertiesObject[commandName].configurable = true;
            }
        }
        utils_1.overwriteElementCommands.call(this, propertiesObject);
        const { puppeteer, ...propertiesObjectWithoutPuppeteer } = propertiesObject;
        propertiesObject['__propertiesObject__'] = { value: propertiesObjectWithoutPuppeteer };
        let client = Object.create(prototype, propertiesObject);
        client.sessionId = sessionId;
        if (scopeType.name === 'Browser') {
            client.capabilities = options.capabilities;
        }
        if (typeof modifier === 'function') {
            client = modifier(client, options);
        }
        client.addCommand = function (name, func, attachToElement = false, proto, instances) {
            const customCommand = typeof commandWrapper === 'function'
                ? commandWrapper(name, func)
                : func;
            if (attachToElement) {
                if (instances) {
                    Object.values(instances).forEach(instance => {
                        instance.__propertiesObject__[name] = {
                            value: customCommand
                        };
                    });
                }
                this.__propertiesObject__[name] = { value: customCommand };
            }
            else {
                unit.lift(name, customCommand, proto);
            }
        };
        client.overwriteCommand = function (name, func, attachToElement = false, proto, instances) {
            let customCommand = typeof commandWrapper === 'function'
                ? commandWrapper(name, func)
                : func;
            if (attachToElement) {
                if (instances) {
                    Object.values(instances).forEach(instance => {
                        instance.__propertiesObject__.__elementOverrides__.value[name] = customCommand;
                    });
                }
                else {
                    this.__propertiesObject__.__elementOverrides__.value[name] = customCommand;
                }
            }
            else if (client[name]) {
                const origCommand = client[name];
                delete client[name];
                unit.lift(name, customCommand, proto, (...args) => origCommand.apply(this, args));
            }
            else {
                throw new Error('overwriteCommand: no command to be overwritten: ' + name);
            }
        };
        return client;
    }
    unit.lift = function (name, func, proto, origCommand) {
        (proto || prototype)[name] = function next(...args) {
            log.info('COMMAND', utils_1.commandCallStructure(name, args));
            Object.defineProperty(func, 'name', {
                value: name,
                writable: false,
            });
            const result = func.apply(this, origCommand ? [origCommand, ...args] : args);
            Promise.resolve(result).then((res) => {
                log.info('RESULT', res);
                this.emit('result', { name, result: res });
            }).catch(() => { });
            return result;
        };
    };
    for (let eventCommand in EVENTHANDLER_FUNCTIONS) {
        prototype[eventCommand] = function (...args) {
            eventHandler[eventCommand](...args);
            return this;
        };
    }
    return unit;
}
exports.default = WebDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbW9uYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxtQ0FBcUM7QUFDckMsMERBQWlDO0FBRWpDLG1DQUF3RTtBQUV4RSxNQUFNLFdBQVcsR0FBNkI7SUFDMUMsT0FBTyxFQUE2QixTQUFTLE9BQU8sS0FBSyxDQUFDO0lBQzFELE9BQU8sRUFBNkIsU0FBUyxPQUFPLEtBQUssQ0FBQztDQUM3RCxDQUFBO0FBTUQsU0FBd0IsU0FBUyxDQUFFLE9BQTRCLEVBQUUsUUFBbUIsRUFBRSxtQkFBcUMsRUFBRTs7SUFNekgsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQUEsZ0JBQWdCLENBQUMsS0FBSywwQ0FBRSxLQUFLLEtBQUksU0FBUyxDQUFDLENBQUE7SUFDekUsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUE7SUFFN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDcEQsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUUvQixNQUFNLFlBQVksR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUE7SUFLbEUsU0FBUyxJQUFJLENBQWMsU0FBaUIsRUFBRSxjQUF5QjtRQUtuRSxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUE7UUFDdkUsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFBO1FBQzdDLGdCQUFnQixDQUFDLHFCQUFxQixHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1FBTWpGLElBQUks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