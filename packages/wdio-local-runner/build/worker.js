"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = __importDefault(require("child_process"));
const events_1 = require("events");
const logger_1 = __importDefault(require("@wdio/logger"));
const transformStream_1 = __importDefault(require("./transformStream"));
const replQueue_1 = __importDefault(require("./replQueue"));
const stdStream_1 = __importDefault(require("./stdStream"));
const log = logger_1.default('@wdio/local-runner');
const replQueue = new replQueue_1.default();
const stdOutStream = new stdStream_1.default();
const stdErrStream = new stdStream_1.default();
stdOutStream.pipe(process.stdout);
stdErrStream.pipe(process.stderr);
class WorkerInstance extends events_1.EventEmitter {
    constructor(config, { cid, configFile, caps, specs, execArgv, retries }, stdout, stderr) {
        super();
        this.isBusy = false;
        this.cid = cid;
        this.config = config;
        this.configFile = configFile;
        this.caps = caps;
        this.specs = specs;
        this.execArgv = execArgv;
        this.retries = retries;
        this.stdout = stdout;
        this.stderr = stderr;
    }
    startProcess() {
        var _a, _b;
        const { cid, execArgv } = this;
        const argv = process.argv.slice(2);
        const runnerEnv = Object.assign({}, process.env, this.config.runnerEnv, {
            WDIO_WORKER: true
        });
        if (this.config.outputDir) {
            runnerEnv.WDIO_LOG_PATH = path_1.default.join(this.config.outputDir, `wdio-${cid}.log`);
        }
        log.info(`Start worker ${cid} with arg: ${argv}`);
        const childProcess = this.childProcess = child_process_1.default.fork(path_1.default.join(__dirname, 'run.js'), argv, {
            cwd: process.cwd(),
            env: runnerEnv,
            execArgv,
            stdio: ['inherit', 'pipe', 'pipe', 'ipc']
        });
        childProcess.on('message', this._handleMessage.bind(this));
        childProcess.on('error', this._handleError.bind(this));
        childProcess.on('exit', this._handleExit.bind(this));
        if (!process.env.JEST_WORKER_ID) {
            (_a = childProcess.stdout) === null || _a === void 0 ? void 0 : _a.pipe(new transformStream_1.default(cid)).pipe(stdOutStream);
            (_b = childProcess.stderr) === null || _b === void 0 ? void 0 : _b.pipe(new transformStream_1.default(cid)).pipe(stdErrStream);
        }
        return childProcess;
    }
    _handleMessage(payload) {
        var _a;
        const { cid, childProcess } = this;
        if (payload.name === 'finisedCommand') {
            this.isBusy = false;
        }
        if (payload.name === 'sessionStarted') {
            if (payload.content.isMultiremote) {
                Object.assign(this, payload.content);
            }
            else {
                this.sessionId = payload.content.sessionId;
                delete payload.content.sessionId;
            }
            return;
        }
        if (childProcess && payload.origin === 'debugger' && payload.name === 'start') {
            replQueue.add(childProcess, { prompt: `[${cid}] \u203A `, ...payload.params }, () => this.emit('message', Object.assign(payload, { cid })), (ev) => this.emit('message', ev));
            return replQueue.next();
        }
        if (replQueue.isRunning && payload.origin === 'debugger' && payload.name === 'result') {
            (_a = replQueue.runningRepl) === null || _a === void 0 ? void 0 : _a.onResult(payload.params);
        }
        this.emit('message', Object.assign(payload, { cid }));
    }
    _handleError(payload) {
        const { cid } = this;
        this.emit('error', Object.assign(payload, { cid }));
    }
    _handleExit(exitCode) {
        const { cid, childProcess, specs, retries } = this;
        delete this.childProcess;
        this.isBusy = false;
        log.debug(`Runner ${cid} finished with exit code ${exitCode}`);
        this.emit('exit', { cid, exitCode, specs, retries });
        if (childProcess) {
            childProcess.kill('SIGTERM');
        }
    }
    postMessage(command, args) {
        const { cid, configFile, caps, specs, retries, isBusy } = this;
        if (isBusy && command !== 'endSession') {
            return log.info(`worker with cid ${cid} already busy and can't take new commands`);
        }
        if (!this.childProcess) {
            this.childProcess = this.startProcess();
        }
        const cmd = { cid, command, configFile, args, caps, specs, retries };
        this.childProcess.send(cmd);
        this.isBusy = true;
    }
}
exports.default = WorkerInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF1QjtBQUN2QixrRUFBaUM7QUFDakMsbUNBQXFDO0FBS3JDLDBEQUFpQztBQUVqQyx3RUFBcUQ7QUFDckQsNERBQW1DO0FBQ25DLDREQUFzQztBQUl0QyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUE7QUFDeEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUE7QUFFakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUE7QUFDdkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUE7QUFDdkMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDakMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFPakMsTUFBcUIsY0FBZSxTQUFRLHFCQUFZO0lBNkJwRCxZQUNJLE1BQTBCLEVBQzFCLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQW9CLEVBQ3JFLE1BQTRCLEVBQzVCLE1BQTRCO1FBRTVCLEtBQUssRUFBRSxDQUFBO1FBbEJYLFdBQU0sR0FBRyxLQUFLLENBQUE7UUFtQlYsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsT0FBTyxH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