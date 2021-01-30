import WDIOReporter from '@wdio/reporter';
import type { Reporters } from '@wdio/types';
export default class DotReporter extends WDIOReporter {
    constructor(options: Reporters.Options);
    onTestSkip(): void;
    onTestPass(): void;
    onTestFail(): void;
}
//# sourceMappingURL=index.d.ts.map