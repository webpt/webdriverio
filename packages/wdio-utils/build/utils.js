"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.canAccess = exports.isBase64 = exports.filterSpecArgs = exports.isFunctionAsync = exports.safeRequire = exports.getArgumentType = exports.isValidParameter = exports.transformCommandLogResult = exports.commandCallStructure = exports.overwriteElementCommands = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SCREENSHOT_REPLACEMENT = '"<Screenshot[base64]>"';
function overwriteElementCommands(propertiesObject) {
    const elementOverrides = propertiesObject['__elementOverrides__'] ? propertiesObject['__elementOverrides__'].value : {};
    for (const [commandName, userDefinedCommand] of Object.entries(elementOverrides)) {
        if (typeof userDefinedCommand !== 'function') {
            throw new Error('overwriteCommand: commands be overwritten only with functions, command: ' + commandName);
        }
        if (!propertiesObject[commandName]) {
            throw new Error('overwriteCommand: no command to be overwritten: ' + commandName);
        }
        if (typeof propertiesObject[commandName].value !== 'function') {
            throw new Error('overwriteCommand: only functions can be overwritten, command: ' + commandName);
        }
        const origCommand = propertiesObject[commandName].value;
        delete propertiesObject[commandName];
        const newCommand = function (...args) {
            const element = this;
            return userDefinedCommand.apply(element, [
                function origCommandFunction() {
                    const context = this || element;
                    return origCommand.apply(context, arguments);
                },
                ...args
            ]);
        };
        propertiesObject[commandName] = {
            value: newCommand,
            configurable: true
        };
    }
    delete propertiesObject['__elementOverrides__'];
    propertiesObject['__elementOverrides__'] = { value: {} };
}
exports.overwriteElementCommands = overwriteElementCommands;
function commandCallStructure(commandName, args) {
    const callArgs = args.map((arg) => {
        if (typeof arg === 'string' && (arg.startsWith('!function(') || arg.startsWith('return (function'))) {
            arg = '<fn>';
        }
        else if (typeof arg === 'string' &&
            !commandName.startsWith('findElement') &&
            isBase64(arg)) {
            arg = SCREENSHOT_REPLACEMENT;
        }
        else if (typeof arg === 'string') {
            arg = `"${arg}"`;
        }
        else if (typeof arg === 'function') {
            arg = '<fn>';
        }
        else if (arg === null) {
            arg = 'null';
        }
        else if (typeof arg === 'object') {
            arg = '<object>';
        }
        else if (typeof arg === 'undefined') {
            arg = typeof arg;
        }
        return arg;
    }).join(', ');
    return `${commandName}(${callArgs})`;
}
exports.commandCallStructure = commandCallStructure;
function transformCommandLogResult(result) {
    if (typeof result.file === 'string' && isBase64(result.file)) {
        return SCREENSHOT_REPLACEMENT;
    }
    return result;
}
exports.transformCommandLogResult = transformCommandLogResult;
function isValidParameter(arg, expectedType) {
    let shouldBeArray = false;
    if (expectedType.slice(-2) === '[]') {
        expectedType = expectedType.slice(0, -2);
        shouldBeArray = true;
    }
    if (shouldBeArray) {
        if (!Array.isArray(arg)) {
            return false;
        }
    }
    else {
        arg = [arg];
    }
    for (const argEntity of arg) {
        const argEntityType = getArgumentType(argEntity);
        if (!argEntityType.match(expectedType)) {
            return false;
        }
    }
    return true;
}
exports.isValidParameter = isValidParameter;
function getArgumentType(arg) {
    return arg === null ? 'null' : typeof arg;
}
exports.getArgumentType = getArgumentType;
function safeRequire(name) {
    var _a, _b, _c;
    let requirePath;
    try {
        const localNodeModules = path_1.default.join(process.cwd(), '/node_modules');
        if (!((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.paths.includes(localNodeModules))) {
            (_b = require === null || require === void 0 ? void 0 : require.main) === null || _b === void 0 ? void 0 : _b.paths.push(localNodeModules);
            const requireOpts = process.env.JEST_WORKER_ID
                ? {}
                : { paths: (_c = require === null || require === void 0 ? void 0 : require.main) === null || _c === void 0 ? void 0 : _c.paths };
            requirePath = require.resolve(name, requireOpts);
        }
        else {
            requirePath = require.resolve(name);
        }
    }
    catch (e) {
        return null;
    }
    try {
        return require(requirePath);
    }
    catch (e) {
        throw new Error(`Couldn't initialise "${name}".\n${e.stack}`);
    }
}
exports.safeRequire = safeRequire;
function isFunctionAsync(fn) {
    return (fn.constructor && fn.constructor.name === 'AsyncFunction') || fn.name === 'async';
}
exports.isFunctionAsync = isFunctionAsync;
function filterSpecArgs(args) {
    return args.filter((arg) => typeof arg !== 'function');
}
exports.filterSpecArgs = filterSpecArgs;
function isBase64(str) {
    var notBase64 = new RegExp('[^A-Z0-9+\\/=]', 'i');
    if (typeof str !== 'string') {
        throw new Error('Expected string but received invalid type.');
    }
    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) {
        return false;
    }
    const firstPaddingChar = str.indexOf('=');
    return firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && str[len - 1] === '=');
}
exports.isBase64 = isBase64;
exports.canAccess = (file) => {
    if (!file) {
        return false;
    }
    try {
        fs_1.default.accessSync(file);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUl2QixNQUFNLHNCQUFzQixHQUFHLHdCQUF3QixDQUFBO0FBTXZELFNBQWdCLHdCQUF3QixDQUFDLGdCQUFpRjtJQUN0SCxNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFFdkgsS0FBSyxNQUFNLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQzlFLElBQUksT0FBTyxrQkFBa0IsS0FBSyxVQUFVLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQywwRUFBMEUsR0FBRyxXQUFXLENBQUMsQ0FBQTtTQUM1RztRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxHQUFHLFdBQVcsQ0FBQyxDQUFBO1NBQ3BGO1FBRUQsSUFBSSxPQUFPLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsR0FBRyxXQUFXLENBQUMsQ0FBQTtTQUNsRztRQUVELE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUN2RCxPQUFPLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRXBDLE1BQU0sVUFBVSxHQUFHLFVBQWlDLEdBQUcsSUFBVztZQUM5RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUE7WUFDcEIsT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNyQyxTQUFTLG1CQUFtQjtvQkFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQTtvQkFDL0IsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTtnQkFDaEQsQ0FBQztnQkFDRCxHQUFHLElBQUk7YUFDVixDQUFDLENBQUE7UUFDTixDQUFDLENBQUE7UUFFRCxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsR0FBRztZQUM1QixLQUFLLEVBQUUsVUFBVTtZQUNqQixZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFBO0tBQ0o7SUFFRCxPQUFPLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDL0MsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQTtBQUM1RCxDQUFDO0FBdENELDREQXNDQztBQU1ELFNBQWdCLG9CQUFvQixDQUFFLFdBQW1CLEVBQUUsSUFBVztJQUNsRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFO1lBQ2pHLEdBQUcsR0FBRyxNQUFNLENBQUE7U0FDZjthQUFNLElBQ0gsT0FBTyxHQUFHLEtBQUssUUFBUTtZQU12QixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFDZjtZQUNFLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQTtTQUMvQjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2hDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFBO1NBQ25CO2FBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLEVBQUU7WUFDbEMsR0FBRyxHQUFHLE1BQU0sQ0FBQTtTQUNmO2FBQU0sSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ3JCLEdBQUcsR0FBRyxNQUFNLENBQUE7U0FDZjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2hDLEdBQUcsR0FBRyxVQUFVLENBQUE7U0FDbkI7YUFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtZQUNuQyxHQUFHLEdBQUcsT0FBTyxHQUFHLENBQUE7U0FDbkI7UUFFRCxPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUViLE9BQU8sR0FBRyxXQUFXLElBQUksUUFBUSxHQUFHLENBQUE7QUFDeEMsQ0FBQztBQS9CRCxvREErQkM7QUFPRCxTQUFnQix5QkFBeUIsQ0FBRSxNQUF5QjtJQUNoRSxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxRCxPQUFPLHNCQUFzQixDQUFBO0tBQ2hDO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDakIsQ0FBQztBQU5ELDhEQU1DO0FBU0QsU0FBZ0IsZ0JBQWdCLENBQUUsR0FBUSxFQUFFLFlBQW9CO0lBQzVELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQTtJQUV6QixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDakMsWUFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDeEMsYUFBYSxHQUFHLElBQUksQ0FBQTtLQUN2QjtJQUtELElBQUksYUFBYSxFQUFFO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO1NBQU07UUFJSCxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNkO0lBRUQsS0FBSyxNQUFNLFNBQVMsSUFBSSxHQUFHLEVBQUU7UUFDekIsTUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sS0FBSyxDQUFBO1NBQ2Y7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQTlCRCw0Q0E4QkM7QUFLRCxTQUFnQixlQUFlLENBQUUsR0FBUTtJQUNyQyxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUE7QUFDN0MsQ0FBQztBQUZELDBDQUVDO0FBUUQsU0FBZ0IsV0FBVyxDQUFFLElBQVk7O0lBQ3JDLElBQUksV0FBVyxDQUFBO0lBQ2YsSUFBSTtRQVNBLE1BQU0sZ0JBQWdCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFFbEUsSUFBSSxRQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLDBDQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUMsRUFBRTtZQUNsRCxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLDBDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7WUFNM0MsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUMxQyxDQUFDLENBQUMsRUFBRTtnQkFDSixDQUFDLENBQUMsRUFBRSxLQUFLLFFBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLElBQUksMENBQUUsS0FBSyxFQUFFLENBQUE7WUFDckMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1NBQ25EO2FBQU07WUFDSCxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN0QztLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLElBQUksQ0FBQTtLQUNkO0lBRUQsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0tBQzlCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7S0FDaEU7QUFDTCxDQUFDO0FBcENELGtDQW9DQztBQU9ELFNBQWdCLGVBQWUsQ0FBRSxFQUFZO0lBQ3pDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFBO0FBQzdGLENBQUM7QUFGRCwwQ0FFQztBQU1ELFNBQWdCLGNBQWMsQ0FBRSxJQUFXO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUE7QUFDMUQsQ0FBQztBQUZELHdDQUVDO0FBT0QsU0FBZ0IsUUFBUSxDQUFDLEdBQVc7SUFDaEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUcsR0FBRyxDQUFDLENBQUE7SUFDbEQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO0tBQ2hFO0lBQ0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUN0QixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDOUMsT0FBTyxLQUFLLENBQUE7S0FDZjtJQUNELE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN6QyxPQUFPLGdCQUFnQixLQUFLLENBQUMsQ0FBQztRQUM1QixnQkFBZ0IsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUM1QixDQUFDLGdCQUFnQixLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtBQUM1RCxDQUFDO0FBYkQsNEJBYUM7QUFPWSxRQUFBLFNBQVMsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO0lBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDUCxPQUFPLEtBQUssQ0FBQTtLQUNmO0lBRUQsSUFBSTtRQUNBLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsT0FBTyxJQUFJLENBQUE7S0FDZDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUE7S0FDZjtBQUNMLENBQUMsQ0FBQTtBQU1ZLFFBQUEsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQSJ9