"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const atob_1 = __importDefault(require("atob"));
const events_1 = require("events");
const core_1 = require("@babel/core");
const babel_plugin_istanbul_1 = __importDefault(require("babel-plugin-istanbul"));
const istanbul_lib_coverage_1 = __importDefault(require("istanbul-lib-coverage"));
const istanbul_lib_report_1 = __importDefault(require("istanbul-lib-report"));
const istanbul_reports_1 = __importDefault(require("istanbul-reports"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/devtools-service:CoverageGatherer');
const MAX_WAIT_RETRIES = 10;
const CAPTURE_INTERVAL = 1000;
const DEFAULT_REPORT_TYPE = 'json';
const DEFAULT_REPORT_DIR = path_1.default.join(process.cwd(), 'coverage');
class CoverageGatherer extends events_1.EventEmitter {
    constructor(_page, _options) {
        super();
        this._page = _page;
        this._options = _options;
        this._coverageLogDir = path_1.default.resolve(process.cwd(), this._options.logDir || DEFAULT_REPORT_DIR);
        this._page.on('load', this._captureCoverage.bind(this));
    }
    async init() {
        this._client = await this._page.target().createCDPSession();
        await this._client.send('Fetch.enable', {
            patterns: [{ requestStage: 'Response' }]
        });
        this._client.on('Fetch.requestPaused', this._handleRequests.bind(this));
    }
    async _handleRequests(event) {
        const { requestId, request, responseStatusCode = 200 } = event;
        if (!this._client) {
            return;
        }
        if (!request.url.endsWith('.js')) {
            return this._client.send('Fetch.continueRequest', { requestId }).catch((err) => log.debug(err.message));
        }
        const { body, base64Encoded } = await this._client.send('Fetch.getResponseBody', { requestId });
        const inputCode = base64Encoded ? atob_1.default(body) : body;
        const url = new URL(request.url);
        const fullPath = path_1.default.join(this._coverageLogDir, 'files', url.hostname, url.pathname);
        const dirPath = path_1.default.dirname(fullPath);
        if (!fs_1.default.existsSync(dirPath)) {
            await fs_1.default.promises.mkdir(dirPath, { recursive: true });
        }
        await fs_1.default.promises.writeFile(fullPath, inputCode, 'utf-8');
        const result = await core_1.transformAsync(inputCode, {
            auxiliaryCommentBefore: ' istanbul ignore next ',
            babelrc: false,
            caller: {
                name: '@wdio/devtools-service'
            },
            configFile: false,
            filename: path_1.default.join(url.hostname, url.pathname),
            plugins: [
                [
                    babel_plugin_istanbul_1.default,
                    {
                        compact: false,
                        exclude: [],
                        extension: false,
                        useInlineSourceMaps: false,
                    },
                ],
            ],
            sourceMaps: false
        });
        return this._client.send('Fetch.fulfillRequest', {
            requestId,
            responseCode: responseStatusCode,
            body: !result ? undefined : Buffer.from(result.code, 'utf8').toString('base64')
        });
    }
    _clearCaptureInterval() {
        if (!this._captureInterval) {
            return;
        }
        clearInterval(this._captureInterval);
        delete this._captureInterval;
    }
    _captureCoverage() {
        if (this._captureInterval) {
            this._clearCaptureInterval();
        }
        this._captureInterval = setInterval(async () => {
            log.info('capturing coverage data');
            try {
                const globalCoverageVar = await this._page.evaluate(() => window['__coverage__']);
                this._coverageMap = istanbul_lib_coverage_1.default.createCoverageMap(globalCoverageVar);
                log.info(`Captured coverage data of ${this._coverageMap.files().length} files`);
            }
            catch (e) {
                log.warn(`Couldn't capture data: ${e.message}`);
                this._clearCaptureInterval();
            }
        }, CAPTURE_INTERVAL);
    }
    async _getCoverageMap(retries = 0) {
        if (retries > MAX_WAIT_RETRIES) {
            return Promise.reject(new Error('Couldn\'t capture coverage data for page'));
        }
        if (!this._coverageMap) {
            log.info('No coverage data collected, waiting...');
            await new Promise((resolve) => setTimeout(resolve, CAPTURE_INTERVAL));
            return this._getCoverageMap(++retries);
        }
        return this._coverageMap;
    }
    async logCoverage() {
        this._clearCaptureInterval();
        const coverageMap = await this._getCoverageMap();
        const context = istanbul_lib_report_1.default.createContext({
            dir: this._coverageLogDir,
            defaultSummarizer: 'nested',
            coverageMap,
            sourceFinder: (source) => {
                const f = fs_1.default.readFileSync(path_1.default.join(this._coverageLogDir, 'files', source.replace(process.cwd(), '')));
                return f.toString('utf8');
            }
        });
        const report = istanbul_reports_1.default.create(this._options.type || DEFAULT_REPORT_TYPE, this._options.options);
        report.execute(context);
    }
    async getCoverageReport() {
        const files = {};
        const coverageMap = await this._getCoverageMap();
        const summary = istanbul_lib_coverage_1.default.createCoverageSummary();
        for (const f of coverageMap.files()) {
            const fc = coverageMap.fileCoverageFor(f);
            const s = fc.toSummary();
            files[f] = s;
            summary.merge(s);
        }
        return {
            ...summary.data,
            files: Object.entries(files).reduce((obj, [filename, { data }]) => {
                obj[filename.replace(process.cwd(), '')] = data;
                return obj;
            }, {})
        };
    }
}
exports.default = CoverageGatherer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY292ZXJhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2F0aGVyZXIvY292ZXJhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBQ3ZCLGdEQUF1QjtBQUN2QixtQ0FBcUM7QUFDckMsc0NBQThEO0FBQzlELGtGQUF1RDtBQUN2RCxrRkFBK0M7QUFDL0MsOEVBQTJDO0FBQzNDLHdFQUFzQztBQUV0QywwREFBaUM7QUFPakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBRTdELE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFBO0FBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFBO0FBQzdCLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFBO0FBQ2xDLE1BQU0sa0JBQWtCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFFL0QsTUFBcUIsZ0JBQWlCLFNBQVEscUJBQVk7SUFNdEQsWUFBcUIsS0FBVyxFQUFVLFFBQWlDO1FBQ3ZFLEtBQUssRUFBRSxDQUFBO1FBRFUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBRXZFLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsQ0FBQTtRQUM5RixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMs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