"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitHookFn = exports.runner = void 0;
const async_exit_hook_1 = __importDefault(require("async-exit-hook"));
const runner_1 = __importDefault(require("@wdio/runner"));
const logger_1 = __importDefault(require("@wdio/logger"));
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/local-runner');
exports.runner = new runner_1.default();
exports.runner.on('exit', process.exit.bind(process));
exports.runner.on('error', ({ name, message, stack }) => process.send({
    origin: 'worker',
    name: 'error',
    content: { name, message, stack }
}));
process.on('message', (m) => {
    if (!m || !m.command) {
        return;
    }
    log.info(`Run worker command: ${m.command}`);
    exports.runner[m.command](m).then((result) => process.send({
        origin: 'worker',
        name: 'finisedCommand',
        content: {
            command: m.command,
            result
        }
    }), (e) => {
        log.error(`Failed launching test session: ${e.stack}`);
        process.exit(1);
    });
});
exports.exitHookFn = (callback) => {
    if (!callback) {
        return;
    }
    exports.runner.sigintWasCalled = true;
    log.info(`Received SIGINT, giving process ${constants_1.SHUTDOWN_TIMEOUT}ms to shutdown gracefully`);
    setTimeout(callback, constants_1.SHUTDOWN_TIMEOUT);
};
async_exit_hook_1.default(exports.exitHookFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzRUFBc0M7QUFFdEMsMERBQWlDO0FBQ2pDLDBEQUFpQztBQUVqQywyQ0FBOEM7QUFHOUMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBVTNCLFFBQUEsTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBZ0MsQ0FBQTtBQUNoRSxjQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQzdDLGNBQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSyxDQUFDO0lBQzNELE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSxPQUFPO0lBQ2IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7Q0FDcEMsQ0FBQyxDQUFDLENBQUE7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQWdCLEVBQUUsRUFBRTtJQUN2QyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtRQUNsQixPQUFNO0tBQ1Q7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUM1QyxjQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDckIsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFLLENBQUM7UUFDM0IsTUFBTSxFQUFFLFFBQVE7UUFDaEIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixPQUFPLEVBQUU7WUFDTCxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87WUFDbEIsTUFBTTtTQUNUO0tBQ0osQ0FBQyxFQUNGLENBQUMsQ0FBUSxFQUFFLEVBQUU7UUFDVCxHQUFHLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25CLENBQUMsQ0FDSixDQUFBO0FBQ0wsQ0FBQyxDQUFDLENBQUE7QUFLVyxRQUFBLFVBQVUsR0FBRyxDQUFDLFFBQW9CLEVBQUUsRUFBRTtJQUMvQyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ1gsT0FBTTtLQUNUO0lBRUQsY0FBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUE7SUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsNEJBQWdCLDJCQUEyQixDQUFDLENBQUE7SUFDeEYsVUFBVSxDQUFDLFFBQVEsRUFBRSw0QkFBZ0IsQ0FBQyxDQUFBO0FBQzFDLENBQUMsQ0FBQTtBQUNELHlCQUFRLENBQUMsa0JBQVUsQ0FBQyxDQUFBIn0=