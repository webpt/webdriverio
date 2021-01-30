import type { Browser, CustomInstanceCommands } from 'webdriverio';
import type { Audit, AuditResult, LHAuditResult, ErrorAudit } from './types';
import type { Trace } from './gatherer/trace';
import type { CDPSessionOnMessageObject } from './gatherer/devtools';
export default class Auditor {
    private _traceLogs?;
    private _devtoolsLogs?;
    private _formFactor?;
    private _url?;
    constructor(_traceLogs?: Trace | undefined, _devtoolsLogs?: CDPSessionOnMessageObject[] | undefined, _formFactor?: "desktop" | "none" | "mobile" | undefined);
    _audit(AUDIT: Audit, params?: {}): Promise<LHAuditResult> | ErrorAudit;
    updateCommands(browser: Browser<'async'>, customFn?: CustomInstanceCommands<Browser<'async'>>['addCommand']): void;
    getMainThreadWorkBreakdown(): Promise<{
        group: string;
        duration: number;
    }[]>;
    getDiagnostics(): Promise<any>;
    getMetrics(): Promise<{
        estimatedInputLatency: number;
        timeToFirstByte: number;
        serverResponseTime: number;
        domContentLoaded: number;
        firstVisualChange: number;
        firstPaint: number;
        firstContentfulPaint: number;
        firstMeaningfulPaint: number;
        largestContentfulPaint: number;
        lastVisualChange: number;
        firstCPUIdle: number;
        firstInteractive: number;
        load: number;
        speedIndex: number;
        totalBlockingTime: number;
        cumulativeLayoutShift: number;
    }>;
    getPerformanceScore(): Promise<any>;
    _auditPWA(params: any, auditsToBeRun?: ("isInstallable" | "serviceWorker" | "splashScreen" | "themedOmnibox" | "contentWith" | "viewport" | "appleTouchIcon" | "maskableIcon")[]): Promise<AuditResult>;
}
//# sourceMappingURL=auditor.d.ts.map