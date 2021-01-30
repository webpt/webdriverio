"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSync = exports.executeAsync = exports.executeSync = exports.hasWdioSyncSupport = exports.wrapCommand = exports.runFnInFiberContext = exports.executeHooksWithArgs = void 0;
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/utils:shim');
let inCommandHook = false;
let hasWdioSyncSupport = false;
exports.hasWdioSyncSupport = hasWdioSyncSupport;
let runSync;
exports.runSync = runSync;
let executeHooksWithArgs = async function executeHooksWithArgsShim(hookName, hooks = [], args = []) {
    if (!Array.isArray(hooks)) {
        hooks = [hooks];
    }
    if (!Array.isArray(args)) {
        args = [args];
    }
    const hooksPromises = hooks.map((hook) => new Promise((resolve) => {
        let result;
        try {
            result = hook.apply(null, args);
        }
        catch (e) {
            log.error(e.stack);
            return resolve(e);
        }
        if (result && typeof result.then === 'function') {
            return result.then(resolve, (e) => {
                log.error(e.stack);
                resolve(e);
            });
        }
        resolve(result);
    }));
    const start = Date.now();
    const result = await Promise.all(hooksPromises);
    if (hooksPromises.length) {
        log.debug(`Finished to run "${hookName}" hook in ${Date.now() - start}ms`);
    }
    return result;
};
exports.executeHooksWithArgs = executeHooksWithArgs;
let runFnInFiberContext = function (fn) {
    return function (...args) {
        return Promise.resolve(fn.apply(this, args));
    };
};
exports.runFnInFiberContext = runFnInFiberContext;
let wrapCommand = function wrapCommand(commandName, fn) {
    return async function wrapCommandFn(...args) {
        const beforeHookArgs = [commandName, args];
        if (!inCommandHook && this.options.beforeCommand) {
            inCommandHook = true;
            await executeHooksWithArgs.call(this, 'beforeCommand', this.options.beforeCommand, beforeHookArgs);
            inCommandHook = false;
        }
        let commandResult;
        let commandError;
        try {
            commandResult = await fn.apply(this, args);
        }
        catch (err) {
            commandError = err;
        }
        if (!inCommandHook && this.options.afterCommand) {
            inCommandHook = true;
            const afterHookArgs = [...beforeHookArgs, commandResult, commandError];
            await executeHooksWithArgs.call(this, 'afterCommand', this.options.afterCommand, afterHookArgs);
            inCommandHook = false;
        }
        if (commandError) {
            throw commandError;
        }
        return commandResult;
    };
};
exports.wrapCommand = wrapCommand;
async function executeSyncFn(fn, retries, args = []) {
    this.wdioRetries = retries.attempts;
    try {
        let res = fn.apply(this, args);
        if (res instanceof Promise) {
            return await res;
        }
        return res;
    }
    catch (e) {
        if (retries.limit > retries.attempts) {
            retries.attempts++;
            return await executeSync.call(this, fn, retries, args);
        }
        return Promise.reject(e);
    }
}
async function executeAsync(fn, retries, args = []) {
    this.wdioRetries = retries.attempts;
    try {
        return await fn.apply(this, args);
    }
    catch (e) {
        if (retries.limit > retries.attempts) {
            retries.attempts++;
            return await executeAsync.call(this, fn, retries, args);
        }
        throw e;
    }
}
exports.executeAsync = executeAsync;
let executeSync = executeSyncFn;
exports.executeSync = executeSync;
try {
    if (!process.env.WDIO_NO_SYNC_SUPPORT) {
        const packageName = '@wdio/sync';
        const wdioSync = require(packageName);
        exports.hasWdioSyncSupport = hasWdioSyncSupport = true;
        exports.runFnInFiberContext = runFnInFiberContext = wdioSync.runFnInFiberContext;
        exports.wrapCommand = wrapCommand = wdioSync.wrapCommand;
        exports.executeHooksWithArgs = executeHooksWithArgs = wdioSync.executeHooksWithArgs;
        exports.executeSync = executeSync = wdioSync.executeSync;
        exports.runSync = runSync = wdioSync.runSync;
    }
}
catch {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaGltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBEQUFpQztBQUlqQyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFFdEMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3pCLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFBO0FBd0wxQixnREFBa0I7QUF2THRCLElBQUksT0FBNEgsQ0FBQTtBQTBMNUgsMEJBQU87QUFuTFgsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLFVBQVUsd0JBQXdCLENBQUssUUFBZ0IsRUFBRSxRQUErQixFQUFFLEVBQUUsT0FBYyxFQUFFO0lBSXhJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2xCO0lBS0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDaEI7SUFFRCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBWSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3pFLElBQUksTUFBTSxDQUFBO1FBRVYsSUFBSTtZQUNBLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNsQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDbEIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDcEI7UUFNRCxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUss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