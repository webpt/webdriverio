"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const events_1 = require("events");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("./utils");
const log = logger_1.default('@wdio/cli');
class WDIOCLInterface extends events_1.EventEmitter {
    constructor(_config, totalWorkerCnt, _isWatchMode = false) {
        super();
        this._config = _config;
        this.totalWorkerCnt = totalWorkerCnt;
        this._isWatchMode = _isWatchMode;
        this.result = {
            finished: 0,
            passed: 0,
            retries: 0,
            failed: 0
        };
        this._jobs = new Map();
        this._skippedSpecs = 0;
        this._inDebugMode = false;
        this._start = new Date();
        this._messages = {
            reporter: {},
            debugger: {}
        };
        this.hasAnsiSupport = chalk_1.default.supportsColor.hasBasic;
        this.totalWorkerCnt = totalWorkerCnt;
        this._isWatchMode = _isWatchMode;
        this._specFileRetries = _config.specFileRetries || 0;
        this._specFileRetriesDelay = _config.specFileRetriesDelay || 0;
        this.on('job:start', this.addJob.bind(this));
        this.on('job:end', this.clearJob.bind(this));
        this.setup();
        this.onStart();
    }
    setup() {
        this._jobs = new Map();
        this._start = new Date();
        this.result = {
            finished: 0,
            passed: 0,
            retries: 0,
            failed: 0
        };
        this._messages = {
            reporter: {},
            debugger: {}
        };
    }
    onStart() {
        this.log(chalk_1.default.bold(`\nExecution of ${chalk_1.default.blue(this.totalWorkerCnt)} spec files started at`), this._start.toISOString());
        if (this._inDebugMode) {
            this.log(chalk_1.default.bgYellow.black('DEBUG mode enabled!'));
        }
        if (this._isWatchMode) {
            this.log(chalk_1.default.bgYellow.black('WATCH mode enabled!'));
        }
        this.log('');
    }
    onSpecRunning(rid) {
        this.onJobComplete(rid, this._jobs.get(rid), 0, chalk_1.default.bold.cyan('RUNNING'));
    }
    onSpecRetry(rid, job, retries) {
        const delayMsg = this._specFileRetriesDelay > 0 ? ` after ${this._specFileRetriesDelay}s` : '';
        this.onJobComplete(rid, job, retries, chalk_1.default.bold(chalk_1.default.yellow('RETRYING') + delayMsg));
    }
    onSpecPass(rid, job, retries) {
        this.onJobComplete(rid, job, retries, chalk_1.default.bold.green('PASSED'));
    }
    onSpecFailure(rid, job, retries) {
        this.onJobComplete(rid, job, retries, chalk_1.default.bold.red('FAILED'));
    }
    onSpecSkip(rid, job) {
        this.onJobComplete(rid, job, 0, 'SKIPPED', log.info);
    }
    onJobComplete(cid, job, retries = 0, message = '', _logger = this.log) {
        const details = [`[${cid}]`, message];
        if (job) {
            details.push('in', utils_1.getRunnerName(job.caps), this.getFilenames(job.specs));
        }
        if (retries > 0) {
            details.push(`(${retries} retries)`);
        }
        return _logger(...details);
    }
    onTestError(payload) {
        var _a, _b, _c;
        const error = {
            type: ((_a = payload.error) === null || _a === void 0 ? void 0 : _a.type) || 'Error',
            message: ((_b = payload.error) === null || _b === void 0 ? void 0 : _b.message) || (typeof payload.error === 'string' ? payload.error : 'Unknown error.'),
            stack: (_c = payload.error) === null || _c === void 0 ? void 0 : _c.stack
        };
        return this.log(`[${payload.cid}]`, `${chalk_1.default.red(error.type)} in "${payload.fullTitle}"\n${chalk_1.default.red(error.stack || error.message)}`);
    }
    getFilenames(specs = []) {
        if (specs.length > 0) {
            return '- ' + specs.join(', ').replace(new RegExp(`${process.cwd()}`, 'g'), '');
        }
        return '';
    }
    addJob({ cid, caps, specs, hasTests }) {
        this._jobs.set(cid, { caps, specs, hasTests });
        if (hasTests) {
            this.onSpecRunning(cid);
        }
        else {
            this._skippedSpecs++;
        }
    }
    clearJob({ cid, passed, retries }) {
        const job = this._jobs.get(cid);
        this._jobs.delete(cid);
        const retryAttempts = this._specFileRetries - retries;
        const retry = !passed && retries > 0;
        if (!retry) {
            this.result.finished++;
        }
        if (job && job.hasTests === false) {
            return this.onSpecSkip(cid, job);
        }
        if (!job) {
            throw new Error('Could not find job');
        }
        if (passed) {
            this.result.passed++;
            this.onSpecPass(cid, job, retryAttempts);
        }
        else if (retry) {
            this.totalWorkerCnt++;
            this.result.retries++;
            this.onSpecRetry(cid, job, retryAttempts);
        }
        else {
            this.result.failed++;
            this.onSpecFailure(cid, job, retryAttempts);
        }
    }
    log(...args) {
        console.log(...args);
        return args;
    }
    onMessage(event) {
        if (event.origin === 'debugger' && event.name === 'start') {
            this.log(chalk_1.default.yellow(event.params.introMessage));
            this._inDebugMode = true;
            return this._inDebugMode;
        }
        if (event.origin === 'debugger' && event.name === 'stop') {
            this._inDebugMode = false;
            return this._inDebugMode;
        }
        if (event.name === 'testFrameworkInit') {
            return this.emit('job:start', event.content);
        }
        if (!event.origin) {
            return log.warn(`Can't identify message from worker: ${JSON.stringify(event)}, ignoring!`);
        }
        if (event.origin === 'worker' && event.name === 'error') {
            return this.log(`[${event.cid}]`, chalk_1.default.white.bgRed.bold(' Error: '), event.content.message || event.content.stack || event.content);
        }
        if (event.origin !== 'reporter' && event.origin !== 'debugger') {
            return this.log(event.cid, event.origin, event.name, event.content);
        }
        if (event.name === 'printFailureMessage') {
            return this.onTestError(event.content);
        }
        if (!this._messages[event.origin][event.name]) {
            this._messages[event.origin][event.name] = [];
        }
        this._messages[event.origin][event.name].push(event.content);
        if (this._isWatchMode) {
            this.printReporters();
        }
    }
    sigintTrigger() {
        if (this._inDebugMode) {
            return false;
        }
        const isRunning = this._jobs.size !== 0;
        const shutdownMessage = isRunning
            ? 'Ending WebDriver sessions gracefully ...\n' +
                '(press ctrl+c again to hard kill the runner)'
            : 'Ended WebDriver sessions gracefully after a SIGINT signal was received!';
        return this.log('\n\n' + shutdownMessage);
    }
    printReporters() {
        const reporter = this._messages.reporter;
        this._messages.reporter = {};
        for (const [reporterName, messages] of Object.entries(reporter)) {
            this.log('\n', chalk_1.default.bold.magenta(`"${reporterName}" Reporter:`));
            this.log(messages.join(''));
        }
    }
    printSummary() {
        const totalJobs = this.totalWorkerCnt - this.result.retries;
        const elapsed = (new Date(Date.now() - this._start.getTime())).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        const retries = this.result.retries ? chalk_1.default.yellow(this.result.retries, 'retries') + ', ' : '';
        const failed = this.result.failed ? chalk_1.default.red(this.result.failed, 'failed') + ', ' : '';
        const skipped = this._skippedSpecs > 0 ? chalk_1.default.gray(this._skippedSpecs, 'skipped') + ', ' : '';
        const percentCompleted = totalJobs ? Math.round(this.result.finished / totalJobs * 100) : 0;
        return this.log('\nSpec Files:\t', chalk_1.default.green(this.result.passed, 'passed') + ', ' + retries + failed + skipped + totalJobs, 'total', `(${percentCompleted}% completed)`, 'in', elapsed, '\n');
    }
    finalise() {
        if (this._isWatchMode) {
            return;
        }
        this.printReporters();
        this.printSummary();
    }
}
exports.default = WDIOCLInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUF5QjtBQUN6QixtQ0FBcUM7QUFDckMsMERBQWlDO0FBR2pDLG1DQUF1QztBQUV2QyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBd0IvQixNQUFxQixlQUFnQixTQUFRLHFCQUFZO0lBd0JyRCxZQUNZLE9BQTJCLEVBQzVCLGNBQXNCLEVBQ3JCLGVBQWUsS0FBSztRQUU1QixLQUFLLEVBQUUsQ0FBQTtRQUpDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBekJ6QixXQUFNLEdBQUc7WUFDWixRQUFRLEVBQUUsQ0FBQztZQUNYLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUM7WUFDVixNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFFTyxVQUFLLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUE7UUFJbkMsa0JBQWEsR0FBRyxDQUFDLENBQUE7UUFDakIsaUJBQVksR0FBRyxLQUFLLENBQUE7UUFDcEIsV0FBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7UUFDbkIsY0FBUyxHQUdiO1lBQ0EsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUE7UUFjRyxJQUFJLENBQUMsY0FBYyxHQUFJLGVBQUssQ0FBQyxhQUFvQyxDQUFDLFFBQVEsQ0FBQTtRQUUxRSxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUE7UUFDcEQsSUFBSSxDQUFDLHFCQUFxQixHQUFH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