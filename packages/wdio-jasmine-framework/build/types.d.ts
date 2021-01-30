/// <reference types="jasmine" />
export interface ReporterOptions {
    cid: string;
    specs: string[];
    cleanStack?: boolean;
}
export interface ParentSuite {
    description: string;
    id: string;
    tests: number;
}
export interface TestEvent extends jasmine.CustomReporterResult {
    type: 'suite' | 'test' | 'hook';
    start: Date;
    duration?: number;
    errors?: jasmine.FailedExpectation[];
    error?: jasmine.FailedExpectation;
}
export interface ResultHandlerPayload {
    passed: boolean;
    message?: string;
    error?: Error;
}
export interface FrameworkMessage {
    type: string;
    payload?: any;
    err?: jasmine.FailedExpectation;
}
export interface FormattedMessage {
    type: string;
    cid?: string;
    specs?: string[];
    uid?: string;
    title?: string;
    parent?: string;
    fullTitle?: string;
    pending?: boolean;
    passed?: boolean;
    file?: string;
    duration?: number;
    currentTest?: string;
    error?: jasmine.FailedExpectation;
    context?: any;
    fullName?: string;
    errors?: jasmine.FailedExpectation[];
}
export interface JasmineNodeOpts {
    defaultTimeoutInterval?: number;
    helpers?: string[];
    requires?: string[];
    random?: boolean;
    seed?: Function;
    failFast?: boolean;
    failSpecWithNoExpectations?: boolean;
    oneFailurePerSpec?: boolean;
    specFilter?: () => boolean;
    grep?: string | RegExp;
    invertGrep?: boolean;
    cleanStack: boolean;
    stopOnSpecFailure: boolean;
    stopSpecOnExpectationFailure: boolean;
    expectationResultHandler: (passed: boolean, data: ResultHandlerPayload) => void;
}
//# sourceMappingURL=types.d.ts.map