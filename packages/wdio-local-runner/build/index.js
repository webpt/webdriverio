"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const stream_buffers_1 = require("stream-buffers");
const worker_1 = __importDefault(require("./worker"));
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/local-runner');
class LocalRunner {
    constructor(configFile, _config) {
        this._config = _config;
        this.workerPool = {};
        this.stdout = new stream_buffers_1.WritableStreamBuffer(constants_1.BUFFER_OPTIONS);
        this.stderr = new stream_buffers_1.WritableStreamBuffer(constants_1.BUFFER_OPTIONS);
    }
    initialise() { }
    getWorkerCount() {
        return Object.keys(this.workerPool).length;
    }
    run({ command, args, ...workerOptions }) {
        const workerCnt = this.getWorkerCount();
        if (workerCnt >= process.stdout.getMaxListeners() - 2) {
            process.stdout.setMaxListeners(workerCnt + 2);
            process.stderr.setMaxListeners(workerCnt + 2);
        }
        const worker = new worker_1.default(this._config, workerOptions, this.stdout, this.stderr);
        this.workerPool[workerOptions.cid] = worker;
        worker.postMessage(command, args);
        return worker;
    }
    shutdown() {
        log.info('Shutting down spawned worker');
        for (const [cid, worker] of Object.entries(this.workerPool)) {
            const { caps, server, sessionId, config, isMultiremote, instances } = worker;
            let payload = {};
            if (config && config.watch && (sessionId || isMultiremote)) {
                payload = {
                    config: { ...server, sessionId },
                    caps,
                    watch: true,
                    isMultiremote,
                    instances
                };
            }
            else if (!worker.isBusy) {
                delete this.workerPool[cid];
                continue;
            }
            worker.postMessage('endSession', payload);
        }
        return new Promise((resolve) => {
            const timeout = setTimeout(resolve, constants_1.SHUTDOWN_TIMEOUT);
            const interval = setInterval(() => {
                const busyWorker = Object.entries(this.workerPool)
                    .filter(([, worker]) => worker.isBusy).length;
                log.info(`Waiting for ${busyWorker} to shut down gracefully`);
                if (busyWorker === 0) {
                    clearTimeout(timeout);
                    clearInterval(interval);
                    log.info('shutting down');
                    return resolve();
                }
            }, 250);
        });
    }
}
exports.default = LocalRunner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBaUM7QUFDakMsbURBQXFEO0FBR3JELHNEQUFxQztBQUNyQywyQ0FBOEQ7QUFHOUQsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBT3hDLE1BQXFCLFdBQVc7SUFNNUIsWUFDSSxVQUFtQixFQUNYLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBUHZDLGVBQVUsR0FBbUMsRUFBRSxDQUFBO1FBRS9DLFdBQU0sR0FBRyxJQUFJLHFDQUFvQixDQUFDLDBCQUFjLENBQUMsQ0FBQTtRQUNqRCxXQUFNLEdBQUcsSUFBSSxxQ0FBb0IsQ0FBQywwQkFBYyxDQUFDLENBQUE7SUFLOUMsQ0FBQztJQUtKLFVBQVUsS0FBSyxDQUFDO0lBRWhCLGNBQWM7UUFDVixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUM5QyxDQUFDO0lBRUQsR0FBRyxDQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsRUFBVztRQUk3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDdkMsSUFBSSxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDbkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUNoRDtRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4RixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUE7UUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFakMsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQVFELFFBQVE7UUFDSixHQUFHLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFFeEMsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pELE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQTtZQUM1RSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7WUFNaEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsSUFBSSxhQUFhLENBQUMsRUFBRTtnQkFDeEQsT0FBTyxHQUFHO29CQUNOLE1BQU0sRUFBRSxFQUFFLEdBQUcsTUFBTSxFQUFFLFNBQVMsRUFBRTtvQkFDaEMsSUFBSTtvQkFDSixLQUFLLEVBQUUsSUFBSTtvQkFDWCxhQUFhO29CQUNiLFNBQVM7aUJBQ1osQ0FBQTthQUNKO2lCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNCLFNBQVE7YUFDWDtZQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQzVDO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsNEJBQWdCLENBQUMsQ0FBQTtZQUNyRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUM5QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7cUJBQzdDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFFakQsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLFVBQVUsMEJBQTBCLENBQUMsQ0FBQTtnQkFDN0QsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO29CQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBQ3JCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtvQkFDekIsT0FBTyxPQUFPLEVBQUUsQ0FBQTtpQkFDbkI7WUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDWCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQXRGRCw4QkFzRkMifQ==