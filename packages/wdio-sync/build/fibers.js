"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Future = void 0;
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/sync');
let Fiber;
let Future;
exports.Future = Future;
global._HAS_FIBER_CONTEXT = false;
const origErrorFn = console.error.bind(console);
const errors = [];
console.error = (...args) => errors.push(...args);
try {
    Fiber = require('fibers');
    exports.Future = Future = require('fibers/future');
}
catch (e) {
    log.debug('Couldn\'t load fibers package for Node v12 and above');
}
console.error = origErrorFn;
if (!Fiber || !Future) {
    throw new Error('No proper `fibers` package could be loaded. It might be not ' +
        'supported with your current Node version. Please ensure to use ' +
        `only WebdriverIOs recommended Node versions.\n${errors.join('\n')}`);
}
exports.default = Fiber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmliZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ZpYmVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwREFBaUM7QUFJakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUVoQyxJQUFJLEtBQXVCLENBQUE7QUFDM0IsSUFBSSxNQUF5QixDQUFBO0FBb0NwQix3QkFBTTtBQWxDZixNQUFNLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFBO0FBRWpDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQy9DLE1BQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQTtBQUMxQixPQUFPLENBQUMsS0FBSyxHQUE4QixDQUFDLEdBQUcsSUFBYSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFLckYsSUFBSTtJQUlBLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDekIsaUJBQUEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtDQUNwQztBQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ1IsR0FBRyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFBO0NBQ3BFO0FBRUQsT0FBTyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUE7QUFNM0IsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUNuQixNQUFNLElBQUksS0FBSyxDQUNYLDhEQUE4RDtRQUM5RCxpRUFBaUU7UUFDakUsaURBQWlELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDdkUsQ0FBQTtDQUNKO0FBRUQsa0JBQWUsS0FBSyxDQUFBIn0=