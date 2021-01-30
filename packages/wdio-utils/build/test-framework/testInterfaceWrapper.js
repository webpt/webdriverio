"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTestInFiberContext = exports.wrapTestFunction = exports.runSpec = exports.runHook = void 0;
const utils_1 = require("../utils");
const testFnWrapper_1 = require("./testFnWrapper");
const MOCHA_COMMANDS = ['skip', 'only'];
exports.runHook = function (hookFn, origFn, beforeFn, beforeFnArgs, afterFn, afterFnArgs, cid, repeatTest) {
    return origFn(function (...hookFnArgs) {
        return testFnWrapper_1.testFnWrapper.call(this, 'Hook', {
            specFn: hookFn,
            specFnArgs: utils_1.filterSpecArgs(hookFnArgs)
        }, {
            beforeFn,
            beforeFnArgs
        }, {
            afterFn,
            afterFnArgs
        }, cid, repeatTest);
    });
};
exports.runSpec = function (specTitle, specFn, origFn, beforeFn, beforeFnArgs, afterFn, afterFnArgs, cid, repeatTest) {
    return origFn(specTitle, function (...specFnArgs) {
        return testFnWrapper_1.testFnWrapper.call(this, 'Test', {
            specFn,
            specFnArgs: utils_1.filterSpecArgs(specFnArgs)
        }, {
            beforeFn,
            beforeFnArgs
        }, {
            afterFn,
            afterFnArgs
        }, cid, repeatTest);
    });
};
exports.wrapTestFunction = function (origFn, isSpec, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid) {
    return function (...specArguments) {
        let retryCnt = typeof specArguments[specArguments.length - 1] === 'number' ? specArguments.pop() : 0;
        const specFn = typeof specArguments[0] === 'function' ? specArguments.shift()
            : (typeof specArguments[1] === 'function' ? specArguments.pop() : undefined);
        const specTitle = specArguments[0];
        if (isSpec) {
            if (specFn) {
                return exports.runSpec(specTitle, specFn, origFn, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid, retryCnt);
            }
            return origFn(specTitle);
        }
        return exports.runHook(specFn, origFn, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid, retryCnt);
    };
};
exports.runTestInFiberContext = function (isSpec, beforeFn, beforeArgsFn, afterFn, afterArgsFn, fnName, cid, scope = global) {
    const origFn = scope[fnName];
    scope[fnName] = exports.wrapTestFunction(origFn, isSpec, beforeFn, beforeArgsFn, afterFn, afterArgsFn, cid);
    addMochaCommands(origFn, scope[fnName]);
};
function addMochaCommands(origFn, newFn) {
    MOCHA_COMMANDS.forEach((commandName) => {
        if (typeof origFn[commandName] === 'function') {
            newFn[commandName] = origFn[commandName];
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEludGVyZmFjZVdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC1mcmFtZXdvcmsvdGVzdEludGVyZmFjZVdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsb0NBQXlDO0FBQ3pDLG1EQUErQztBQVUvQyxNQUFNLGNBQWMsR0FBcUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFnQjVDLFFBQUEsT0FBTyxHQUFHLFVBRW5CLE1BQWdCLEVBQ2hCLE1BQWdCLEVBQ2hCLFFBQStCLEVBQy9CLFlBQWlDLEVBQ2pDLE9BQThCLEVBQzlCLFdBQWdDLEVBQ2hDLEdBQVcsRUFDWCxVQUFrQjtJQUVsQixPQUFPLE1BQU0sQ0FBQyxVQUVWLEdBQUcsVUFPRjtRQUVELE9BQU8sNkJBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksRUFDSixNQUFNLEVBQ047WUFDSSxNQUFNLEVBQUUsTUFBTTtZQUNkLFVBQVUsRUFBRSxzQkFBYyxDQUFDLFVBQVUsQ0FBQztTQUN6QyxFQUNEO1lBQ0ksUUFBUTtZQUNSLFlBQVk7U0FDZixFQUNEO1lBQ0ksT0FBTztZQUNQLFdBQVc7U0FDZCxFQUNELEdBQUcsRUFDSCxVQUFVLENBQ2IsQ0FBQTtJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBZ0JZLFFBQUEsT0FBTyxHQUFHLFVBRW5CLFNBQWlCLEVBQ2pCLE1BQWdCLEVBQ2hCLE1BQWdCLEVBQ2hCLFFBQStCLEVBQy9CLFlBQWlDLEVBQ2pDLE9BQThCLEVBQzlCLFdBQWdDLEVBQ2hDLEdBQVcsRUFDWCxVQUFrQjtJQUVsQixPQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFFckIsR0FBRyxVQU9GO1FBRUQsT0FBTyw2QkFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxFQUNKLE1BQU0sRUFDTjtZQUNJLE1BQU07WUFDTixVQUFVLEVBQUUsc0JBQWMsQ0FBQyxVQUFVLENBQUM7U0FDekMsRUFD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