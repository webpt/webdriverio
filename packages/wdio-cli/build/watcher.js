"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const logger_1 = __importDefault(require("@wdio/logger"));
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
const lodash_flattendeep_1 = __importDefault(require("lodash.flattendeep"));
const lodash_union_1 = __importDefault(require("lodash.union"));
const launcher_1 = __importDefault(require("./launcher"));
const log = logger_1.default('@wdio/cli:watch');
class Watcher {
    constructor(_configFile, _args) {
        this._configFile = _configFile;
        this._args = _args;
        log.info('Starting launcher in watch mode');
        this._launcher = new launcher_1.default(this._configFile, this._args, true);
        const specs = this._launcher.configParser.getSpecs();
        const capSpecs = this._launcher.isMultiremote ? [] : lodash_union_1.default(lodash_flattendeep_1.default(this._launcher.configParser.getCapabilities().map(cap => cap.specs || [])));
        this._specs = [...specs, ...capSpecs];
    }
    async watch() {
        chokidar_1.default.watch(this._specs, { ignoreInitial: true })
            .on('add', this.getFileListener())
            .on('change', this.getFileListener());
        const { filesToWatch } = this._launcher.configParser.getConfig();
        if (filesToWatch.length) {
            chokidar_1.default.watch(filesToWatch, { ignoreInitial: true })
                .on('add', this.getFileListener(false))
                .on('change', this.getFileListener(false));
        }
        await this._launcher.run();
        const workers = this.getWorkers();
        Object.values(workers).forEach((worker) => worker.on('exit', () => {
            if (Object.values(workers).find((w) => w.isBusy)) {
                return;
            }
            this._launcher.interface.finalise();
        }));
    }
    getFileListener(passOnFile = true) {
        return (spec) => this.run(Object.assign({}, this._args, passOnFile ? { spec: [spec] } : {}));
    }
    getWorkers(pickByFn, includeBusyWorker) {
        let workers = this._launcher.runner.workerPool;
        if (typeof pickByFn === 'function') {
            workers = lodash_pickby_1.default(workers, pickByFn);
        }
        if (!includeBusyWorker) {
            workers = lodash_pickby_1.default(workers, (worker) => !worker.isBusy);
        }
        return workers;
    }
    run(params = {}) {
        const workers = this.getWorkers((params.spec ? (worker) => worker.specs.includes(params.spec) : undefined));
        if (Object.keys(workers).length === 0) {
            return;
        }
        this._launcher.interface.totalWorkerCnt = Object.entries(workers).length;
        this.cleanUp();
        for (const [, worker] of Object.entries(workers)) {
            const { cid, caps, specs, sessionId } = worker;
            const args = Object.assign({ sessionId }, params);
            worker.postMessage('run', args);
            this._launcher.interface.emit('job:start', { cid, caps, specs });
        }
    }
    cleanUp() {
        this._launcher.interface.setup();
    }
}
exports.default = Watcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93YXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQStCO0FBQy9CLDBEQUFpQztBQUNqQyxrRUFBa0M7QUFDbEMsNEVBQTRDO0FBQzVDLGdFQUFnQztBQUVoQywwREFBaUM7QUFLakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXJDLE1BQXFCLE9BQU87SUFJeEIsWUFDWSxXQUFtQixFQUNuQixLQUErQztRQUQvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUEwQztRQUV2RCxHQUFHLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtCQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRWpFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLHNCQUFLLENBQUMsNEJBQVcsQ0FDakUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUF5QyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQ3BILENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztRQUlQLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxN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