import WDIOReporter, { RunnerStats } from '@wdio/reporter';
import type { JUnitReporterOptions } from './types';
declare class JunitReporter extends WDIOReporter {
    options: JUnitReporterOptions;
    private _suiteNameRegEx;
    private _packageName?;
    private _suiteTitleLabel?;
    private _fileNameLabel?;
    private _activeFeature?;
    private _activeFeatureName?;
    constructor(options: JUnitReporterOptions);
    onRunnerEnd(runner: RunnerStats): void;
    private _prepareName;
    private _addFailedHooks;
    private _addCucumberFeatureToBuilder;
    private _addSuiteToBuilder;
    private _buildJunitXml;
    private _getStandardOutput;
    private _format;
}
export default JunitReporter;
//# sourceMappingURL=index.d.ts.map