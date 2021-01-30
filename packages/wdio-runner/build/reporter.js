"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const utils_2 = require("./utils");
const log = logger_1.default('@wdio/runner');
class BaseReporter {
    constructor(_config, _cid, caps) {
        this._config = _config;
        this._cid = _cid;
        this.caps = caps;
        this._reporters = this._config.reporters.map(this.initReporter.bind(this));
    }
    emit(e, payload) {
        payload.cid = this._cid;
        utils_2.sendFailureMessage(e, payload);
        this._reporters.forEach((reporter) => reporter.emit(e, payload));
    }
    getLogFile(name) {
        let options = Object.assign({}, this._config);
        let filename = `wdio-${this._cid}-${name}-reporter.log`;
        const reporterOptions = this._config.reporters.find((reporter) => (Array.isArray(reporter) &&
            (reporter[0] === name ||
                typeof reporter[0] === 'function' && reporter[0].name === name)));
        if (reporterOptions) {
            const fileformat = reporterOptions[1].outputFileFormat;
            options.cid = this._cid;
            options.capabilities = this.caps;
            Object.assign(options, reporterOptions[1]);
            if (fileformat) {
                if (typeof fileformat !== 'function') {
                    throw new Error('outputFileFormat must be a function');
                }
                filename = fileformat(options);
            }
        }
        if (!options.outputDir) {
            return;
        }
        return path_1.default.join(options.outputDir, filename);
    }
    getWriteStreamObject(reporter) {
        return {
            write: (content) => process.send({
                origin: 'reporter',
                name: reporter,
                content
            })
        };
    }
    waitForSync() {
        const startTime = Date.now();
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const unsyncedReporter = this._reporters
                    .filter((reporter) => !reporter.isSynchronised)
                    .map((reporter) => reporter.constructor.name);
                if ((Date.now() - startTime) > this._config.reporterSyncTimeout && unsyncedReporter.length) {
                    clearInterval(interval);
                    return reject(new Error(`Some reporters are still unsynced: ${unsyncedReporter.join(', ')}`));
                }
                if (!unsyncedReporter.length) {
                    clearInterval(interval);
                    return resolve(true);
                }
                log.info(`Wait for ${unsyncedReporter.length} reporter to synchronise`);
            }, this._config.reporterSyncInterval);
        });
    }
    initReporter(reporter) {
        let ReporterClass;
        let options = {};
        if (Array.isArray(reporter)) {
            options = Object.assign({}, options, reporter[1]);
            reporter = reporter[0];
        }
        if (typeof reporter === 'function') {
            ReporterClass = reporter;
            options.logFile = options.setLogFile
                ? options.setLogFile(this._cid, ReporterClass.name)
                : this.getLogFile(ReporterClass.name);
            options.writeStream = this.getWriteStreamObject(ReporterClass.name);
            return new ReporterClass(options);
        }
        if (typeof reporter === 'string') {
            ReporterClass = utils_1.initialisePlugin(reporter, 'reporter').default;
            options.logFile = options.setLogFile
                ? options.setLogFile(this._cid, reporter)
                : this.getLogFile(reporter);
            options.writeStream = this.getWriteStreamObject(reporter);
            return new ReporterClass(options);
        }
        throw new Error('Invalid reporters config');
    }
}
exports.default = BaseReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsMERBQWlDO0FBQ2pDLHVDQUE4QztBQUc5QyxtQ0FBNEM7QUFFNUMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQU9sQyxNQUFxQixZQUFZO0lBRzdCLFlBQ1ksT0FBMkIsRUFDM0IsSUFBWSxFQUNiLElBQW1DO1FBRmxDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDYixTQUFJLEdBQUosSUFBSSxDQUErQjtRQUcxQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQy9FLENBQUM7SUFRRCxJQUFJLENBQUUsQ0FBUyxFQUFFLE9BQVk7UUFDekIsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBS3ZCLDBCQUFrQixDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUU5QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0lBRUQsVUFBVSxDQUFFLElBQVk7UUFFcEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBUSxDQUFBO1FBQ3BELElBQUksUUFBUSxHQUFHLFFBQVEsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLGVBQWUsQ0FBQTtRQUV2RCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMs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