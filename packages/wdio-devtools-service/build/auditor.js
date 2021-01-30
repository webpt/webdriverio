"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnostics_1 = __importDefault(require("lighthouse/lighthouse-core/audits/diagnostics"));
const mainthread_work_breakdown_1 = __importDefault(require("lighthouse/lighthouse-core/audits/mainthread-work-breakdown"));
const metrics_1 = __importDefault(require("lighthouse/lighthouse-core/audits/metrics"));
const server_response_time_1 = __importDefault(require("lighthouse/lighthouse-core/audits/server-response-time"));
const cumulative_layout_shift_1 = __importDefault(require("lighthouse/lighthouse-core/audits/metrics/cumulative-layout-shift"));
const first_contentful_paint_1 = __importDefault(require("lighthouse/lighthouse-core/audits/metrics/first-contentful-paint"));
const largest_contentful_paint_1 = __importDefault(require("lighthouse/lighthouse-core/audits/metrics/largest-contentful-paint"));
const speed_index_1 = __importDefault(require("lighthouse/lighthouse-core/audits/metrics/speed-index"));
const interactive_1 = __importDefault(require("lighthouse/lighthouse-core/audits/metrics/interactive"));
const total_blocking_time_1 = __importDefault(require("lighthouse/lighthouse-core/audits/metrics/total-blocking-time"));
const scoring_1 = __importDefault(require("lighthouse/lighthouse-core/scoring"));
const default_config_1 = __importDefault(require("lighthouse/lighthouse-core/config/default-config"));
const logger_1 = __importDefault(require("@wdio/logger"));
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/devtools-service:Auditor');
class Auditor {
    constructor(_traceLogs, _devtoolsLogs, _formFactor) {
        this._traceLogs = _traceLogs;
        this._devtoolsLogs = _devtoolsLogs;
        this._formFactor = _formFactor;
        if (_traceLogs) {
            this._url = _traceLogs.pageUrl;
        }
    }
    _audit(AUDIT, params = {}) {
        const auditContext = {
            options: {
                ...AUDIT.defaultOptions
            },
            settings: {
                throttlingMethod: 'devtools',
                formFactor: this._formFactor || constants_1.DEFAULT_FORM_FACTOR
            },
            LighthouseRunWarnings: false,
            computedCache: new Map()
        };
        try {
            return AUDIT.audit({
                traces: { defaultPass: this._traceLogs },
                devtoolsLogs: { defaultPass: this._devtoolsLogs },
                TestedAsMobileDevice: true,
                ...params
            }, auditContext);
        }
        catch (error) {
            log.error(error);
            return {
                score: 0,
                error
            };
        }
    }
    updateCommands(browser, customFn) {
        const commands = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(fnName => fnName !== 'constructor' && fnName !== 'updateCommands' && !fnName.startsWith('_'));
        commands.forEach(fnName => browser.addCommand(fnName, customFn || this[fnName].bind(this)));
    }
    async getMainThreadWorkBreakdown() {
        const result = await this._audit(mainthread_work_breakdown_1.default);
        return result.details.items.map(({ group, duration }) => ({ group, duration }));
    }
    async getDiagnostics() {
        const result = await this._audit(diagnostics_1.default);
        if (!Object.prototype.hasOwnProperty.call(result, 'details')) {
            return null;
        }
        return result.details.items[0];
    }
    async getMetrics() {
        const serverResponseTime = await this._audit(server_response_time_1.default, { URL: this._url });
        const cumulativeLayoutShift = await this._audit(cumulative_layout_shift_1.default);
        const result = await this._audit(metrics_1.default);
        const metrics = result.details.items[0] || {};
        return {
            estimatedInputLatency: metrics.estimatedInputLatency,
            timeToFirstByte: Math.round(serverResponseTime.numericValue),
            serverResponseTime: Math.round(serverResponseTime.numericValue),
            domContentLoaded: metrics.observedDomContentLoaded,
            firstVisualChange: metrics.observedFirstVisualChange,
            firstPaint: metrics.observedFirstPaint,
            firstContentfulPaint: metrics.firstContentfulPaint,
            firstMeaningfulPaint: metrics.firstMeaningfulPaint,
            largestContentfulPaint: metrics.largestContentfulPaint,
            lastVisualChange: metrics.observedLastVisualChange,
            firstCPUIdle: metrics.firstCPUIdle,
            firstInteractive: metrics.interactive,
            load: metrics.observedLoad,
            speedIndex: metrics.speedIndex,
            totalBlockingTime: metrics.totalBlockingTime,
            cumulativeLayoutShift: cumulativeLayoutShift.numericValue,
        };
    }
    async getPerformanceScore() {
        const auditResults = {
            'speed-index': await this._audit(speed_index_1.default),
            'first-contentful-paint': await this._audit(first_contentful_paint_1.default),
            'largest-contentful-paint': await this._audit(largest_contentful_paint_1.default),
            'cumulative-layout-shift': await this._audit(cumulative_layout_shift_1.default),
            'total-blocking-time': await this._audit(total_blocking_time_1.default),
            interactive: await this._audit(interactive_1.default)
        };
        if (!auditResults.interactive || !auditResults['cumulative-layout-shift'] || !auditResults['first-contentful-paint'] ||
            !auditResults['largest-contentful-paint'] || !auditResults['speed-index'] || !auditResults['total-blocking-time']) {
            log.info('One or multiple required metrics couldn\'t be found, setting performance score to: null');
            return null;
        }
        const scores = default_config_1.default.categories.performance.auditRefs.filter((auditRef) => auditRef.weight).map((auditRef) => ({
            score: auditResults[auditRef.id].score,
            weight: auditRef.weight,
        }));
        return scoring_1.default.arithmeticMean(scores);
    }
    async _auditPWA(params, auditsToBeRun = Object.keys(constants_1.PWA_AUDITS)) {
        const audits = await Promise.all(Object.entries(constants_1.PWA_AUDITS)
            .filter(([name]) => auditsToBeRun.includes(name))
            .map(async ([name, Audit]) => [name, await this._audit(Audit, params)]));
        return {
            passed: !audits.find(([, result]) => result.score < 1),
            details: audits.reduce((details, [name, result]) => {
                details[name] = result;
                return details;
            }, {})
        };
    }
}
exports.default = Auditor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0dBQXVFO0FBQ3ZFLDRIQUFpRztBQUNqRyx3RkFBK0Q7QUFDL0Qsa0hBQXVGO0FBQ3ZGLGdJQUFxRztBQUNyRyw4SEFBbUc7QUFDbkcsa0lBQXVHO0FBQ3ZHLHdHQUE4RTtBQUM5RSx3R0FBcUY7QUFDckYsd0hBQTZGO0FBRTdGLGlGQUE4RDtBQUM5RCxzR0FBNEU7QUFDNUUsMERBQWlDO0FBR2pDLDJDQUE2RDtBQVM3RCxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLGdDQUFnQyxDQUFDLENBQUE7QUFJcEQsTUFBcUIsT0FBTztJQUd4QixZQUNZLFVBQWtCLEVBQ2xCLGFBQTJDLEVBQzNDLFdBQXdCO1FBRnhCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQThCO1FBQzNDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRWhDLElBQUksVUFBVSxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBRSxLQUFZLEVBQUUsTUFBTSxHQUFHLEVBQUU7UUFDN0IsTUFBTSxZQUFZLEdBQUc7WUFDakIsT0FBTyxFQUFFO2dCQUNMLEdBQUcsS0FBSyxDQUFDLGNBQWM7YUFDMUI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sZ0JBQWdCLEVBQUUsVUFBVTtnQkFDNUIsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksK0JBQW1CO2FBQ3REO1lBQ0QscUJBQXFCLEVBQUUsS0FBSztZQUM1QixhQUFhLEVBQUUsSUFBSSxHQUFHLEVBQUU7U0FDM0IsQ0FBQTtRQUVELElBQUk7WUFDQSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ2YsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FB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