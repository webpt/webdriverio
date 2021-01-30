"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fibers_1 = __importDefault(require("./fibers"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/sync');
async function executeHooksWithArgs(hookName, hooks = [], args) {
    if (typeof hooks === 'function') {
        hooks = [hooks];
    }
    if (!Array.isArray(args)) {
        args = [args];
    }
    const hookPromise = hooks.map((hook) => new Promise((resolve) => {
        let result;
        const execHook = () => {
            delete global.browser._NOT_FIBER;
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
        };
        return hook.constructor.name === 'AsyncFunction' ? execHook() : fibers_1.default(execHook).run();
    }));
    const start = Date.now();
    const result = await Promise.all(hookPromise);
    if (hookPromise.length) {
        log.debug(`Finished to run "${hookName}" hook in ${Date.now() - start}ms`);
    }
    return result;
}
exports.default = executeHooksWithArgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZUhvb2tzV2l0aEFyZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXhlY3V0ZUhvb2tzV2l0aEFyZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNEI7QUFDNUIsMERBQWlDO0FBRWpDLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7QUFXakIsS0FBSyxVQUFVLG9CQUFvQixDQUFFLFFBQWlCLEVBQUUsUUFBK0IsRUFBRSxFQUFFLElBQXNCO0lBSTVILElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO1FBQzdCLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ2xCO0lBS0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDaEI7SUFFRCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzVELElBQUksTUFBTSxDQUFBO1FBRVYsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ2xCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUE7WUFFaEMsSUFBSTtnQkFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDbEM7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbEIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDcEI7WUFDRCxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUM3QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUU7b0JBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2QsQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuQixDQUFDLENBQUE7UUFLRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDekYsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN4QixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDN0MsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO1FBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLFFBQVEsYUFBYSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQTtLQUM3RTtJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2pCLENBQUM7QUFsREQsdUNBa0RDIn0=