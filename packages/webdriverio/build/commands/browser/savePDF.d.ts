/// <reference types="node" />
declare type PDFPrintOptions = {
    orientation?: string;
    scale?: number;
    background?: boolean;
    width?: number;
    height?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    shrinkToFit?: boolean;
    pageRanges?: object[];
};
export default function savePDF(this: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser, filepath: string, options?: PDFPrintOptions): Promise<Buffer>;
export {};
//# sourceMappingURL=savePDF.d.ts.map