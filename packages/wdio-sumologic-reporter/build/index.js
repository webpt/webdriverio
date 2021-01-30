"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const dateformat_1 = __importDefault(require("dateformat"));
const json_stringify_safe_1 = __importDefault(require("json-stringify-safe"));
const reporter_1 = __importDefault(require("@wdio/reporter"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/sumologic-reporter');
const MAX_LINES = 100;
const DATE_FORMAT = 'yyyy-mm-dd HH:mm:ss,l o';
class SumoLogicReporter extends reporter_1.default {
    constructor(options) {
        super(options);
        this._unsynced = [];
        this._isSynchronising = false;
        this._hasRunnerEnd = false;
        this._options = Object.assign({
            stdout: true,
            syncInterval: 100,
            sourceAddress: process.env.SUMO_SOURCE_ADDRESS
        }, options);
        if (typeof this._options.sourceAddress !== 'string') {
            log.error('Sumo Logic requires "sourceAddress" paramater');
        }
        this._interval = setInterval(this.sync.bind(this), this._options.syncInterval);
    }
    get isSynchronised() {
        return this._unsynced.length === 0;
    }
    onRunnerStart(runner) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'runner:start',
            data: runner
        }));
    }
    onSuiteStart(suite) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'suite:start',
            data: suite
        }));
    }
    onTestStart(test) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'test:start',
            data: test
        }));
    }
    onTestSkip(test) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'test:skip',
            data: test
        }));
    }
    onTestPass(test) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'test:pass',
            data: test
        }));
    }
    onTestFail(test) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'test:fail',
            data: test
        }));
    }
    onTestEnd(test) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'test:end',
            data: test
        }));
    }
    onSuiteEnd(suite) {
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'suite:end',
            data: suite
        }));
    }
    onRunnerEnd(runner) {
        this._hasRunnerEnd = true;
        this._unsynced.push(json_stringify_safe_1.default({
            time: dateformat_1.default(new Date(), DATE_FORMAT),
            event: 'runner:end',
            data: runner
        }));
    }
    async sync() {
        if (this._hasRunnerEnd && this._unsynced.length === 0) {
            clearInterval(this._interval);
        }
        if (this._isSynchronising || this._unsynced.length === 0 || typeof this._options.sourceAddress !== 'string') {
            return;
        }
        const logLines = this._unsynced.slice(0, MAX_LINES).join('\n');
        this._isSynchronising = true;
        log.debug('start synchronization');
        try {
            const resp = await got_1.default(this._options.sourceAddress, {
                method: 'POST',
                json: logLines
            });
            this._unsynced.splice(0, MAX_LINES);
            this._isSynchronising = false;
            return log.debug(`synchronised collector data, server status: ${resp.statusCode}`);
        }
        catch (err) {
            return log.error('failed send data to Sumo Logic:\n', err.stack);
        }
    }
}
exports.default = SumoLogicReporter;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXFCO0FBQ3JCLDREQUFtQztBQUNuQyw4RUFBMkM7QUFFM0MsOERBQWlGO0FBQ2pGLDBEQUFpQztBQUlqQyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUE7QUFFOUMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFBO0FBQ3JCLE1BQU0sV0FBVyxHQUFHLHlCQUF5QixDQUFBO0FBSzdDLE1BQXFCLGlCQUFrQixTQUFRLGtCQUFZO0lBUXZELFlBQVksT0FBZ0I7UUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBTFYsY0FBUyxHQUFhLEVBQUUsQ0FBQTtRQUN4QixxQkFBZ0IsR0FBRyxLQUFLLENBQUE7UUFDeEIsa0JBQWEsR0FBRyxLQUFLLENBQUE7UUFJekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRTFCLE1BQU0sRUFBRSxJQUFJO1lBRVosWUFBWSxFQUFFLEdBQUc7WUFFakIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO1NBQ2pELEVBQUUsT0FBTyxDQUFDLENBQUE7UUFFWCxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQTtTQUM3RDtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbEYsQ0FBQztJQUdELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFB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