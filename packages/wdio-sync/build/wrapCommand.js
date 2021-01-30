"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const executeHooksWithArgs_1 = __importDefault(require("./executeHooksWithArgs"));
const utils_1 = require("./utils");
const fibers_1 = require("./fibers");
const log = logger_1.default('@wdio/sync');
let inCommandHook = false;
const timers = [];
const elements = new Set();
process.on('WDIO_TIMER', (payload) => {
    if (payload.start) {
        return timers.push(payload.id);
    }
    if (timers.includes(payload.id)) {
        while (timers.pop() !== payload.id)
            ;
    }
    if (payload.timeout) {
        elements.forEach(element => { delete element._NOT_FIBER; });
    }
    if (timers.length === 0) {
        elements.clear();
    }
});
function wrapCommand(commandName, fn) {
    return function wrapCommandFn(...args) {
        if (!global._HAS_FIBER_CONTEXT && global.WDIO_WORKER) {
            log.warn(`Can't return command result of ${commandName} synchronously because command ` +
                'was executed outside of an it block, hook or step definition!');
        }
        if (timers.length > 0) {
            elements.add(this);
        }
        if (this._NOT_FIBER === true) {
            this._NOT_FIBER = isNotInFiber(this, fn.name);
            return fn.apply(this, args);
        }
        this._NOT_FIBER = fn.name !== '';
        const future = new fibers_1.Future();
        const result = runCommandWithHooks.apply(this, [commandName, fn, ...args]);
        result.then(future.return.bind(future), future.throw.bind(future));
        try {
            const futureResult = future.wait();
            inFiber(this);
            return futureResult;
        }
        catch (e) {
            if (typeof e === 'string') {
                throw new Error(e);
            }
            if (e.message.includes('Can\'t wait without a fiber')) {
                return result;
            }
            inFiber(this);
            throw e;
        }
    };
}
exports.default = wrapCommand;
async function runCommandWithHooks(commandName, fn, ...args) {
    const stackError = new Error();
    await runCommandHook.call(this, 'beforeCommand', this.options.beforeCommand, [commandName, args]);
    let commandResult;
    let commandError;
    try {
        commandResult = await fn.apply(this, args);
    }
    catch (err) {
        commandError = utils_1.sanitizeErrorMessage(err, stackError);
    }
    await runCommandHook.call(this, 'afterCommand', this.options.afterCommand, [commandName, args, commandResult, commandError]);
    if (commandError) {
        throw commandError;
    }
    return commandResult;
}
async function runCommandHook(hookName, hookFn, args) {
    if (!inCommandHook) {
        inCommandHook = true;
        await executeHooksWithArgs_1.default(hookName, hookFn, args);
        inCommandHook = false;
    }
}
function isNotInFiber(context, fnName) {
    return fnName !== '' && !!(context.elementId || (context.parent && context.parent.elementId));
}
function inFiber(context) {
    const multiRemoteContext = context;
    if (multiRemoteContext.constructor.name === 'MultiRemoteDriver') {
        return multiRemoteContext.instances.forEach(instance => {
            multiRemoteContext[instance]._NOT_FIBER = false;
            let parent = multiRemoteContext[instance].parent;
            while (parent && parent._NOT_FIBER) {
                parent._NOT_FIBER = false;
                parent = parent.parent;
            }
        });
    }
    context._NOT_FIBER = false;
    let parent = context.parent;
    while (parent && parent._NOT_FIBER) {
        parent._NOT_FIBER = false;
        parent = parent.parent;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd3JhcENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBaUM7QUFJakMsa0ZBQXlEO0FBQ3pELG1DQUE4QztBQUM5QyxxQ0FBaUM7QUFFakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUVoQyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUE7QUFDekIsTUFBTSxNQUFNLEdBQVUsRUFBRSxDQUFBO0FBQ3hCLE1BQU0sUUFBUSxHQUEwQixJQUFJLEdBQUcsRUFBRSxDQUFBO0FBU2pELE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDakMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ2YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNqQztJQUNELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDN0IsT0FBTyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUU7WUFBQyxDQUFDO0tBQ3ZDO0lBQ0QsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ2pCLFFBQVEsQ0FBQyxPQUFPLENBQTRCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDeEY7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtLQUNuQjtBQUNMLENBQUMsQ0FBQyxDQUFBO0FBVUYsU0FBd0IsV0FBVyxDQUFFLFdBQW1CLEVBQUUsRUFBWTtJQUNsRSxPQUFPLFNBQVMsYUFBYSxDQUE0QyxHQUFHLElBQVc7UUFJbkYsSUFBSSxD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