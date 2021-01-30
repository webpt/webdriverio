import type { ReportOptions } from 'istanbul-reports';
import type { Totals, CoverageSummaryData } from 'istanbul-lib-coverage';
import type { Viewport } from 'puppeteer-core/lib/cjs/puppeteer/common/PuppeteerViewport';
import type { NETWORK_STATES, PWA_AUDITS } from './constants';
export interface DevtoolsConfig {
    coverageReporter?: CoverageReporterOptions;
}
export interface CoverageReporterOptions {
    enable?: boolean;
    logDir?: string;
    type?: keyof ReportOptions;
    options?: any;
}
export declare type FormFactor = 'mobile' | 'desktop' | 'none';
export interface EnablePerformanceAuditsOptions {
    cacheEnabled: boolean;
    cpuThrottling: number;
    networkThrottling: keyof typeof NETWORK_STATES;
    formFactor: FormFactor;
}
export interface DeviceDescription {
    viewport: Viewport;
    userAgent: string;
}
export interface Device {
    name: string;
    userAgent: string;
    viewport: {
        width: number;
        height: number;
        deviceScaleFactor: number;
        isMobile: boolean;
        hasTouch: boolean;
        isLandscape: boolean;
    };
}
export interface Audit {
    audit: (opts: any, context: any) => Promise<any>;
    defaultOptions: Record<string, any>;
}
export interface AuditResults {
    'speed-index': MetricsResult;
    'first-contentful-paint': MetricsResult;
    'largest-contentful-paint': MetricsResult;
    'cumulative-layout-shift': MetricsResult;
    'total-blocking-time': MetricsResult;
    interactive: MetricsResult;
}
export interface AuditRef {
    id: keyof AuditResults;
    weight: number;
}
export interface MainThreadWorkBreakdownResult {
    details: {
        items: {
            group: string;
            duration: number;
        }[];
    };
}
export interface DiagnosticsResults {
    details: {
        items: any[];
    };
}
export interface ResponseTimeResult {
    numericValue: number;
}
export interface MetricsResult {
    score: number;
}
export interface MetricsResults {
    details: {
        items: {
            estimatedInputLatency: number;
            observedDomContentLoaded: number;
            observedFirstVisualChange: number;
            observedFirstPaint: number;
            firstContentfulPaint: number;
            firstMeaningfulPaint: number;
            largestContentfulPaint: number;
            observedLastVisualChange: number;
            firstCPUIdle: number;
            interactive: number;
            observedLoad: number;
            speedIndex: number;
            totalBlockingTime: number;
        }[];
    };
}
export interface LHAuditResult {
    score: number;
    warnings?: any[];
    notApplicable?: boolean;
    numericValue?: number;
    numericUnit?: string;
    displayValue?: {
        i18nId: string;
        values: any;
        formattedDefault: string;
    };
    details?: any;
}
export interface AuditResult {
    passed: boolean;
    details: Record<string, LHAuditResult | ErrorAudit>;
}
export interface ErrorAudit {
    score: 0;
    error: Error;
}
export declare type PWAAudits = keyof typeof PWA_AUDITS;
export declare type NetworkStates = 'offline' | 'GPRS' | 'Regular 2G' | 'Good 2G' | 'Regular 3G' | 'Good 3G' | 'Regular 4G' | 'DSL' | 'Wifi' | 'online';
export interface Coverage {
    lines: Totals;
    statements: Totals;
    functions: Totals;
    branches: Totals;
    files: Record<string, CoverageSummaryData>;
}
export interface CustomDevice {
    viewport: Viewport;
    userAgent: string;
}
export declare type DeviceProfiles = 'Blackberry PlayBook' | 'BlackBerry Z30' | 'Galaxy Note 3' | 'Galaxy Note II' | 'Galaxy S III' | 'Galaxy S5' | 'iPad' | 'iPad Mini' | 'iPad Pro' | 'iPhone 4' | 'iPhone 5' | 'iPhone 6' | 'iPhone 6 Plus' | 'iPhone 7' | 'iPhone 7 Plus' | 'iPhone 8' | 'iPhone 8 Plus' | 'iPhone SE' | 'iPhone X' | 'JioPhone 2' | 'Kindle Fire HDX' | 'LG Optimus L70' | 'Microsoft Lumia 550' | 'Microsoft Lumia 950' | 'Nexus 10' | 'Nexus 4' | 'Nexus 5' | 'Nexus 5X' | 'Nexus 6' | 'Nexus 6P' | 'Nexus 7' | 'Nokia Lumia 520' | 'Nokia N9' | 'Pixel 2' | 'Pixel 2 XL' | CustomDevice;
export interface PerformanceAuditOptions {
    networkThrottling?: NetworkStates;
    cpuThrottling?: number;
    cacheEnabled?: boolean;
}
export interface DevtoolsBrowser {
    enablePerformanceAudits(params?: PerformanceAuditOptions): void;
    disablePerformanceAudits(): void;
    getMetrics(): object;
    getDiagnostics(): object;
    getMainThreadWorkBreakdown(): object[];
    getPerformanceScore(): number;
    emulateDevice(deviceProfile: DeviceProfiles): void;
    checkPWA(auditsToBeRun?: PWAAudits[]): AuditResult;
    getCoverageReport(): Coverage;
    cdp(domain: string, command: string, args?: object): any;
    cdpConnection(): {
        host: string;
        port: number;
    };
    getNodeId(selector: string): number;
    getNodeIds(selector: string): number[];
    startTracing(categories?: string, samplingFrequency?: number): void;
    endTracing(): void;
    getTraceLogs(): object;
    getPageWeight(): object;
}
//# sourceMappingURL=types.d.ts.map