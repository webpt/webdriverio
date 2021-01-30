"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/modules/web.url");
const events_1 = require("events");
const network_recorder_1 = __importDefault(require("lighthouse/lighthouse-core/lib/network-recorder"));
const logger_1 = __importDefault(require("@wdio/logger"));
const registerPerformanceObserverInPage_1 = __importDefault(require("../scripts/registerPerformanceObserverInPage"));
const checkTimeSinceLastLongTask_1 = __importDefault(require("../scripts/checkTimeSinceLastLongTask"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const log = logger_1.default('@wdio/devtools-service:TraceGatherer');
const NOOP_WAIT_EVENT = {
    promise: Promise.resolve(),
    cancel: () => { }
};
class TraceGatherer extends events_1.EventEmitter {
    constructor(_session, _page) {
        super();
        this._session = _session;
        this._page = _page;
        this._failingFrameLoadIds = [];
        this._pageLoadDetected = false;
        this._networkListeners = {};
        this._waitForNetworkIdleEvent = NOOP_WAIT_EVENT;
        this._waitForCPUIdleEvent = NOOP_WAIT_EVENT;
        constants_1.NETWORK_RECORDER_EVENTS.forEach((method) => {
            this._networkListeners[method] = (params) => this._networkStatusMonitor.dispatch({ method, params });
        });
    }
    async startTracing(url) {
        delete this._trace;
        this._networkStatusMonitor = new network_recorder_1.default();
        constants_1.NETWORK_RECORDER_EVENTS.forEach((method) => {
            this._session.on(method, this._networkListeners[method]);
        });
        this._traceStart = Date.now();
        log.info(`Start tracing frame with url ${url}`);
        await this._page.tracing.start({
            categories: constants_1.DEFAULT_TRACING_CATEGORIES,
            screenshots: true
        });
        if (url === constants_1.CLICK_TRANSITION) {
            log.info('Start checking for page load for click');
            this._clickTraceTimeout = setTimeout(async () => {
                log.info('No page load detected, canceling trace');
                await this._page.tracing.stop();
                return this.finishTracing();
            }, constants_1.FRAME_LOAD_START_TIMEOUT);
        }
        await this._page.evaluateOnNewDocument(registerPerformanceObserverInPage_1.default);
        this._waitForNetworkIdleEvent = this.waitForNetworkIdle(this._session);
        this._waitForCPUIdleEvent = this.waitForCPUIdle();
    }
    async onFrameNavigated(msgObj) {
        if (!this.isTracing) {
            return;
        }
        if (this._failingFrameLoadIds.includes(msgObj.frame.id)) {
            delete this._traceStart;
            this._waitForNetworkIdleEvent.cancel();
            this._waitForCPUIdleEvent.cancel();
            this._frameId = '"unsuccessful loaded frame"';
            this.finishTracing();
            this.emit('tracingError', new Error(`Page with url "${msgObj.frame.url}" failed to load`));
            if (this._clickTraceTimeout) {
                clearTimeout(this._clickTraceTimeout);
            }
        }
        if (this._frameId ||
            msgObj.frame.parentId ||
            !utils_1.isSupportedUrl(msgObj.frame.url)) {
            log.info(`Ignore navigated frame with url ${msgObj.frame.url}`);
            return;
        }
        this._frameId = msgObj.frame.id;
        this._loaderId = msgObj.frame.loaderId;
        this._pageUrl = msgObj.frame.url;
        log.info(`Page load detected: ${this._pageUrl}, set frameId ${this._frameId}, set loaderId ${this._loaderId}`);
        if (this._clickTraceTimeout && !this._pageLoadDetected) {
            log.info('Page load detected for click, clearing click trace timeout}');
            this._pageLoadDetected = true;
            clearTimeout(this._clickTraceTimeout);
        }
        this.emit('tracingStarted', msgObj.frame.id);
    }
    async onLoadEventFired() {
        if (!this.isTracing) {
            return;
        }
        const loadPromise = Promise.all([
            this._waitForNetworkIdleEvent.promise,
            this._waitForCPUIdleEvent.promise
        ]).then(() => async () => {
            const minTraceTime = constants_1.TRACING_TIMEOUT - (Date.now() - (this._traceStart || 0));
            if (minTraceTime > 0) {
                log.info(`page load happen to quick, waiting ${minTraceTime}ms more`);
                await new Promise((resolve) => setTimeout(resolve, minTraceTime));
            }
            return this.completeTracing();
        });
        const cleanupFn = await Promise.race([
            loadPromise,
            this.waitForMaxTimeout()
        ]);
        this._waitForNetworkIdleEvent.cancel();
        this._waitForCPUIdleEvent.cancel();
        return cleanupFn();
    }
    onFrameLoadFail(request) {
        const frame = request.frame();
        if (frame) {
            this._failingFrameLoadIds.push(frame._id);
        }
    }
    get isTracing() {
        return typeof this._traceStart === 'number';
    }
    async completeTracing() {
        const traceDuration = Date.now() - (this._traceStart || 0);
        log.info(`Tracing completed after ${traceDuration}ms, capturing performance data for frame ${this._frameId}`);
        try {
            const traceBuffer = await this._page.tracing.stop();
            const traceEvents = JSON.parse(traceBuffer.toString('utf8'));
            const startedInBrowserEvt = traceEvents.traceEvents.find(e => e.name === 'TracingStartedInBrowser');
            const mainFrame = (startedInBrowserEvt &&
                startedInBrowserEvt.args &&
                startedInBrowserEvt.args['data']['frames'] &&
                startedInBrowserEvt.args['data']['frames'].find((frame) => !frame.parent));
            if (mainFrame && mainFrame.processId) {
                const threadNameEvt = traceEvents.traceEvents.find(e => e.ph === 'R' &&
                    e.cat === 'blink.user_timing' && e.name === 'navigationStart' && e.args.data.isLoadingMainFrame);
                if (threadNameEvt) {
                    log.info(`Replace mainFrame process id ${mainFrame.processId} with actual thread process id ${threadNameEvt.pid}`);
                    mainFrame.processId = threadNameEvt.pid;
                }
                else {
                    log.info(`Couldn't replace mainFrame process id ${mainFrame.processId} with actual thread process id`);
                }
            }
            this._trace = {
                ...traceEvents,
                frameId: this._frameId,
                loaderId: this._loaderId,
                pageUrl: this._pageUrl,
                traceStart: this._traceStart,
                traceEnd: Date.now()
            };
            this.emit('tracingComplete', this._trace);
            this.finishTracing();
        }
        catch (err) {
            log.error(`Error capturing tracing logs: ${err.stack}`);
            this.emit('tracingError', err);
            return this.finishTracing();
        }
    }
    finishTracing() {
        log.info(`Tracing for ${this._frameId} completed`);
        this._pageLoadDetected = false;
        constants_1.NETWORK_RECORDER_EVENTS.forEach((method) => this._session.removeListener(method, this._networkListeners[method]));
        delete this._networkStatusMonitor;
        delete this._traceStart;
        delete this._frameId;
        delete this._loaderId;
        delete this._pageUrl;
        this._failingFrameLoadIds = [];
        this._waitForNetworkIdleEvent.cancel();
        this._waitForCPUIdleEvent.cancel();
        this.emit('tracingFinished');
    }
    waitForNetworkIdle(session, networkQuietThresholdMs = constants_1.NETWORK_IDLE_TIMEOUT) {
        let hasDCLFired = false;
        let idleTimeout;
        let cancel = () => {
            throw new Error('_waitForNetworkIdle.cancel() called before it was defined');
        };
        if (!this._networkStatusMonitor) {
            throw new Error('TraceGatherer.waitForNetworkIdle called with no networkStatusMonitor');
        }
        const networkStatusMonitor = this._networkStatusMonitor;
        const promise = new Promise((resolve) => {
            const onIdle = () => {
                networkStatusMonitor.once('network-2-busy', onBusy);
                idleTimeout = setTimeout(() => {
                    log.info('Network became finally idle');
                    cancel();
                    resolve();
                }, networkQuietThresholdMs);
            };
            const onBusy = () => {
                networkStatusMonitor.once('network-2-idle', onIdle);
                idleTimeout && clearTimeout(idleTimeout);
            };
            const domContentLoadedListener = () => {
                hasDCLFired = true;
                networkStatusMonitor.is2Idle()
                    ? onIdle()
                    : onBusy();
            };
            const logStatus = () => {
                if (!hasDCLFired) {
                    return log.info('Waiting on DomContentLoaded');
                }
                const inflightRecords = networkStatusMonitor.getInflightRecords();
                log.info(`Found ${inflightRecords.length} inflight network records`);
                if (inflightRecords.length < 10) {
                    for (const record of inflightRecords) {
                        log.info(`Waiting on ${record.url.slice(0, 120)} to finish`);
                    }
                }
            };
            networkStatusMonitor.on('requeststarted', logStatus);
            networkStatusMonitor.on('requestloaded', logStatus);
            networkStatusMonitor.on('network-2-busy', logStatus);
            session.once('Page.domContentEventFired', domContentLoadedListener);
            let canceled = false;
            cancel = () => {
                if (canceled)
                    return;
                canceled = true;
                log.info('Wait for network idle canceled');
                idleTimeout && clearTimeout(idleTimeout);
                session.removeListener('Page.domContentEventFired', domContentLoadedListener);
                networkStatusMonitor.removeListener('network-2-busy', onBusy);
                networkStatusMonitor.removeListener('network-2-idle', onIdle);
                networkStatusMonitor.removeListener('requeststarted', logStatus);
                networkStatusMonitor.removeListener('requestloaded', logStatus);
                networkStatusMonitor.removeListener('network-2-busy', logStatus);
            };
        });
        return { promise, cancel };
    }
    waitForCPUIdle(waitForCPUIdle = constants_1.CPU_IDLE_TRESHOLD) {
        if (!waitForCPUIdle) {
            return {
                promise: Promise.resolve(),
                cancel: () => undefined
            };
        }
        let lastTimeout;
        let canceled = false;
        const checkForQuietExpression = `(${checkTimeSinceLastLongTask_1.default.toString()})()`;
        async function checkForQuiet(resolve, reject) {
            if (canceled)
                return;
            let timeSinceLongTask;
            try {
                timeSinceLongTask = (await this._page.evaluate(checkForQuietExpression)) || 0;
            }
            catch (e) {
                log.warn(`Page evaluate rejected while evaluating checkForQuietExpression: ${e.stack}`);
                setTimeout(() => checkForQuiet.call(this, resolve, reject), 100);
                return;
            }
            if (canceled)
                return;
            if (typeof timeSinceLongTask !== 'number') {
                log.warn(`unexpected value for timeSinceLongTask: ${timeSinceLongTask}`);
                return reject(new Error('timeSinceLongTask is not a number'));
            }
            log.info('Driver', `CPU has been idle for ${timeSinceLongTask} ms`);
            if (timeSinceLongTask >= waitForCPUIdle) {
                return resolve();
            }
            const timeToWait = waitForCPUIdle - timeSinceLongTask;
            lastTimeout = setTimeout(() => checkForQuiet.call(this, resolve, reject), timeToWait);
        }
        let cancel = () => {
            throw new Error('_waitForCPUIdle.cancel() called before it was defined');
        };
        const promise = new Promise((resolve, reject) => {
            log.info('Waiting for CPU to become idle');
            checkForQuiet.call(this, resolve, reject);
            cancel = () => {
                if (canceled)
                    return;
                canceled = true;
                if (lastTimeout)
                    clearTimeout(lastTimeout);
                resolve(new Error('Wait for CPU idle canceled'));
            };
        });
        return { promise, cancel };
    }
    waitForMaxTimeout(maxWaitForLoadedMs = constants_1.MAX_TRACE_WAIT_TIME) {
        return new Promise((resolve) => setTimeout(resolve, maxWaitForLoadedMs)).then(() => async () => {
            log.error('Neither network nor CPU idle time could be detected within timeout, wrapping up tracing');
            return this.completeTracing();
        });
    }
}
exports.default = TraceGatherer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2F0aGVyZXIvdHJhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBZ0M7QUFFaEMsbUNBQXFDO0FBQ3JDLHVHQUE2RTtBQUM3RSwwREFBaUM7QUFRakMscUhBQTRGO0FBQzVGLHVHQUE4RTtBQUU5RSw0Q0FJcUI7QUFDckIsb0NBQXlDO0FBRXpDLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtBQStCMUQsTUFBTSxlQUFlLEdBQUc7SUFDcEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUU7SUFDMUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7Q0FDbkIsQ0FBQTtBQUVELE1BQXFCLGFBQWMsU0FBUSxxQkFBWTtJQWVuRCxZQUFxQixRQUFvQixFQUFVLEtBQVc7UUFDMUQsS0FBSyxFQUFFLENBQUE7UUFEVSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQWR0RCx5QkFBb0IsR0FBYSxFQUFFLENBQUE7UUFDbkMsc0JBQWlCLEdBQUcsS0FBSyxDQUFBO1FBQ3pCLHNCQUFpQixHQUEwQyxFQUFFLENBQUE7UUFTN0QsNkJBQXdCLEdBQWdCLGVBQWUsQ0FBQTtRQUN2RCx5QkFBb0IsR0FBZ0IsZUFBZSxDQUFBO1FBS3ZELG1DQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ3hHLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUUsR0FBVztRQUkzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7UUFLbEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksMEJBQWUsRUFBRSxDQUFBO1FBQ2xELG1DQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUM1RCxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDL0MsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDM0IsVUFBVSxFQUFFLHNDQUEwQjtZQUN0QyxXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDLENBQUE7UUFNRixJQUFJLEdBQUcsS0FBSyw0QkFBZ0IsRUFBRTtZQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUE7WUFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO2dCQUNsRCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtZQUMvQixDQUFDLEVBQUUsb0NBQXdCLENBQUMsQ0FBQTtTQUMvQjtRQUtELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQywyQ0FBaUMsQ0FBQyxDQUFBO1FBRXpFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3RFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDckQsQ0FBQztJQUtELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBRSxNQUF5QztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixPQUFNO1NBQ1Q7UUFJRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNyRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDdkIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ3RDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLDZCQUE2QixDQUFBO1lBQzdDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtZQUUxRixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO2FBQ3hDO1NBQ0o7UUFLRCxJQUVJLElBQUksQ0FBQyxRQUFRO1lBRWIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBRXJCLENBQUMsc0JBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNuQztZQUNFLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUMvRCxPQUFNO1NBQ1Q7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFBO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUE7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQTtRQUNoQyxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsUUFBUSxpQkFBaUIsSUFBSSxDQUFDLFFBQVEsa0JBQWtCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBUzlHLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3BELEdBQUcsQ0FBQyxJQUFJLENBQUMsNkRBQTZELENBQUMsQ0FBQTtZQUN2RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO1lBQzdCLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtTQUN4QztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBTUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixPQUFNO1NBQ1Q7UUFhRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzVCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPO1lBQ3JDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPO1NBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFLckIsTUFBTSxZQUFZLEdBQUcsMkJBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3RSxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLFlBQVksU0FBUyxDQUFDLENBQUE7Z0JBQ3JFLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTthQUNwRTtZQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxTQUFTLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2pDLFdBQVc7WUFDWCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNsQyxPQUFPLFNBQVMsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxlQUFlLENBQUUsT0FBb0I7UUFDakMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBRTdCLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDNUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFBO0lBQy9DLENBQUM7SUFLRCxLQUFLLENBQUMsZUFBZTtRQUNqQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQzFELEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLGFBQWEsNENBQTRDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBTTdHLElBQUk7WUFDQSxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ25ELE1BQU0sV0FBVyxHQUFvQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQU03RSxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyx5QkFBeUIsQ0FBQyxDQUFBO1lBQ25HLE1BQU0sU0FBUyxHQUFHLENBQ2QsbUJBQW1CO2dCQUNuQixtQkFBbUIsQ0FBQyxJQUFJO2dCQUN2QixtQkFBbUIsQ0FBQyxJQUE4QixDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDcEUsbUJBQW1CLENBQUMsSUFBOEIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUM1RyxDQUFBO1lBQ0QsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUc7b0JBQ2hFLENBQUMsQ0FBQyxHQUFHLEtBQUssbUJBQW1CLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxpQkFBaUIsSUFBSyxDQUFDLENBQUMsSUFBNkIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtnQkFDOUgsSUFBSSxhQUFhLEVBQUU7b0JBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsU0FBUyxDQUFDLFNBQVMsa0NBQWtDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO29CQUNsSCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUE7aUJBQzFDO3FCQUFNO29CQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMseUNBQXlDLFNBQVMsQ0FBQyxTQUFTLGdDQUFnQyxDQUFDLENBQUE7aUJBQ3pHO2FBQ0o7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLEdBQUcsV0FBVztnQkFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDeEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN0QixVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO2FBQ3ZCLENBQUE7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7U0FDdkI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1NBQzlCO0lBQ0wsQ0FBQztJQUtELGFBQWE7UUFDVCxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFFBQVEsWUFBWSxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQTtRQUs5QixtQ0FBdUIsQ0FBQyxPQUFPLENBQzNCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyRixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQTtRQUVqQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDcEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBV0Qsa0JBQWtCLENBQUUsT0FBbUIsRUFBRSx1QkFBdUIsR0FBRyxnQ0FBb0I7UUFDbkYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLElBQUksV0FBMkIsQ0FBQTtRQUMvQixJQUFJLE1BQU0sR0FBYSxHQUFHLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFBO1FBQ2hGLENBQUMsQ0FBQTtRQUlELElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFBO1NBQzFGO1FBQ0QsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUE7UUFFdkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBRWhCLG9CQUFvQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtnQkFDbkQsV0FBVyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtvQkFDdkMsTUFBTSxFQUFFLENBQUE7b0JBQ1IsT0FBTyxFQUFFLENBQUE7Z0JBQ2IsQ0FBQyxFQUFFLHVCQUF1QixDQUFDLENBQUE7WUFDL0IsQ0FBQyxDQUFBO1lBRUQsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNoQixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUE7Z0JBQ25ELFdBQVcsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDNUMsQ0FBQyxDQUFBO1lBRUQsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLEVBQUU7Z0JBQ2xDLFdBQVcsR0FBRyxJQUFJLENBQUE7Z0JBQ2xCLG9CQUFvQixDQUFDLE9BQU8sRUFBRTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDVixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDbEIsQ0FBQyxDQUFBO1lBSUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFO2dCQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNkLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO2lCQUNqRDtnQkFFRCxNQUFNLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO2dCQUNqRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsZUFBZSxDQUFDLE1BQU0sMkJBQTJCLENBQUMsQ0FBQTtnQkFHcEUsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtvQkFDN0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxlQUFlLEVBQUU7d0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO3FCQUMvRDtpQkFDSjtZQUNMLENBQUMsQ0FBQTtZQUVELG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUNwRCxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQ25ELG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUVwRCxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLHdCQUF3QixDQUFDLENBQUE7WUFFbkUsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3BCLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxRQUFRO29CQUFFLE9BQU07Z0JBQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUE7Z0JBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO2dCQUMxQyxXQUFXLElBQUksWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUV4QyxPQUFPLENBQUMsY0FBYyxDQUFDLDJCQUEyQixFQUFFLHdCQUF3QixDQUFDLENBQUE7Z0JBRTdFLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtnQkFDN0Qsb0JBQW9CLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUM3RCxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUE7Z0JBQ2hFLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUE7Z0JBQy9ELG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUNwRSxDQUFDLENBQUE7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQVNELGNBQWMsQ0FBRSxjQUFjLEdBQUcsNkJBQWlCO1FBQzlDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakIsT0FBTztnQkFDSCxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFNBQVM7YUFDMUIsQ0FBQTtTQUNKO1FBR0QsSUFBSSxXQUEyQixDQUFBO1FBQy9CLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQTtRQUVwQixNQUFNLHVCQUF1QixHQUFHLElBQUksb0NBQTBCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQTtRQUM5RSxLQUFLLFVBQVUsYUFBYSxDQUF1QixPQUFpQixFQUFFLE1BQWdCO1lBQ2xGLElBQUksUUFBUTtnQkFBRSxPQUFNO1lBQ3BCLElBQUksaUJBQWlCLENBQUE7WUFDckIsSUFBSTtnQkFDQSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNoRjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0VBQW9FLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO2dCQUN2RixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUNoRSxPQUFNO2FBQ1Q7WUFFRCxJQUFJLFFBQVE7Z0JBQUUsT0FBTTtZQUVwQixJQUFJLE9BQU8saUJBQWlCLEtBQUssUUFBUSxFQUFFO2dCQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxpQkFBaUIsRUFBRSxDQUFDLENBQUE7Z0JBQ3hFLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQTthQUNoRTtZQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHlCQUF5QixpQkFBaUIsS0FBSyxDQUFDLENBQUE7WUFFbkUsSUFBSSxpQkFBaUIsSUFBSSxjQUFjLEVBQUU7Z0JBQ3JDLE9BQU8sT0FBTyxFQUFFLENBQUE7YUFDbkI7WUFFRCxNQUFNLFVBQVUsR0FBRyxjQUFjLEdBQUcsaUJBQWlCLENBQUE7WUFDckQsV0FBVyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDekYsQ0FBQztRQUVELElBQUksTUFBTSxHQUFhLEdBQUcsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUE7UUFDNUUsQ0FBQyxDQUFBO1FBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1lBQzFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUN6QyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNWLElBQUksUUFBUTtvQkFBRSxPQUFNO2dCQUNwQixRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUNmLElBQUksV0FBVztvQkFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQzFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUE7WUFDcEQsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFBO0lBQzlCLENBQUM7SUFFRCxpQkFBaUIsQ0FBRSxrQkFBa0IsR0FBRywrQkFBbUI7UUFDdkQsT0FBTyxJQUFJLE9BQU8sQ0FDZCxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUN2RCxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQixHQUFHLENBQUMsS0FBSyxDQUFDLHlGQUF5RixDQUFDLENBQUE7WUFDcEcsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDakMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUF6YUQsZ0NBeWFDIn0=