"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_FILE_EXTENSIONS = exports.SUPPORTED_HOOKS = exports.DEFAULT_CONFIGS = void 0;
const DEFAULT_TIMEOUT = 10000;
exports.DEFAULT_CONFIGS = () => ({
    specs: [],
    suites: {},
    exclude: [],
    outputDir: undefined,
    logLevel: 'info',
    logLevels: {},
    excludeDriverLogs: [],
    bail: 0,
    waitforInterval: 500,
    waitforTimeout: 5000,
    framework: 'mocha',
    reporters: [],
    services: [],
    maxInstances: 100,
    maxInstancesPerCapability: 100,
    filesToWatch: [],
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    execArgv: [],
    runnerEnv: {},
    runner: 'local',
    specFileRetries: 0,
    specFileRetriesDelay: 0,
    specFileRetriesDeferred: false,
    reporterSyncInterval: 100,
    reporterSyncTimeout: 5000,
    cucumberFeaturesWithLineNumbers: [],
    mochaOpts: {
        timeout: DEFAULT_TIMEOUT
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: DEFAULT_TIMEOUT
    },
    cucumberOpts: {
        timeout: DEFAULT_TIMEOUT
    },
    tsNodeOpts: {
        transpileOnly: true
    },
    onPrepare: [],
    onWorkerStart: [],
    before: [],
    beforeSession: [],
    beforeSuite: [],
    beforeHook: [],
    beforeTest: [],
    beforeCommand: [],
    afterCommand: [],
    afterTest: [],
    afterHook: [],
    afterSuite: [],
    afterSession: [],
    after: [],
    onComplete: [],
    onReload: [],
    beforeFeature: [],
    beforeScenario: [],
    beforeStep: [],
    afterStep: [],
    afterScenario: [],
    afterFeature: []
});
exports.SUPPORTED_HOOKS = [
    'before', 'beforeSession', 'beforeSuite', 'beforeHook', 'beforeTest', 'beforeCommand',
    'afterCommand', 'afterTest', 'afterHook', 'afterSuite', 'afterSession', 'after',
    'beforeFeature', 'beforeScenario', 'beforeStep', 'afterStep', 'afterScenario', 'afterFeature',
    'onReload', 'onPrepare', 'onWorkerStart', 'onComplete'
];
exports.SUPPORTED_FILE_EXTENSIONS = [
    '.js', '.mjs', '.es6', '.ts', '.feature', '.coffee', '.cjs'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUE7QUFJaEIsUUFBQSxlQUFlLEdBQW1ELEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEYsS0FBSyxFQUFFLEVBQUU7SUFDVCxNQUFNLEVBQUUsRUFBRTtJQUNWLE9BQU8sRUFBRSxFQUFFO0lBQ1gsU0FBUyxFQUFFLFNBQVM7SUFDcEIsUUFBUSxFQUFFLE1BQWU7SUFDekIsU0FBUyxFQUFFLEVBQUU7SUFDYixpQkFBaUIsRUFBRSxFQUFFO0lBQ3JCLElBQUksRUFBRSxDQUFDO0lBQ1AsZUFBZSxFQUFFLEdBQUc7SUFDcEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsU0FBUyxFQUFFLE9BQWdCO0lBQzNCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsUUFBUSxFQUFFLEVBQUU7SUFDWixZQUFZLEVBQUUsR0FBRztJQUNqQix5QkFBeUIsRUFBRSxHQUFHO0lBQzlCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLHNCQUFzQixFQUFFLE1BQU07SUFDOUIsb0JBQW9CLEVBQUUsQ0FBQztJQUN2QixRQUFRLEVBQUUsRUFBRTtJQUNaLFNBQVMsRUFBRSxFQUFFO0lBQ2IsTUFBTSxFQUFFLE9BQWdCO0lBQ3hCLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLG9CQUFvQixFQUFFLENBQUM7SUFDdkIsdUJBQXVCLEVBQUUsS0FBSztJQUM5QixvQkFBb0IsRUFBRSxHQUFHO0lBQ3pCLG1CQUFtQixFQUFFLElBQUk7SUFDekIsK0JBQStCLEVBQUUsRUFBRTtJQUtuQyxTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsZUFBZTtLQUMzQjtJQUNELGVBQWUsRUFBRTtRQUNiLHNCQUFzQixFQUFFLGVBQWU7S0FDMUM7SUFDRCxZQUFZLEVBQUU7UUFDVixPQUFPLEVBQUUsZUFBZTtLQUMzQjtJQUNELFVBQVUsRUFBRTtRQUNSLGFBQWEsRUFBRSxJQUFJO0tBQ3RCO0lBS0QsU0FBUyxFQUFFLEVBQUU7SUFDYixhQUFhLEVBQUUsRUFBRTtJQUNqQixNQUFNLEVBQUUsRUFBRTtJQUNWLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLFdBQVcsRUFBRSxFQUFFO0lBQ2YsVUFBVSxFQUFFLEVBQUU7SUFDZCxVQUFVLEVBQUUsRUFBRTtJQUNkLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsU0FBUyxFQUFFLEVBQUU7SUFDYixVQUFVLEVBQUUsRUFBRTtJQUNkLFlBQVksRUFBRSxFQUFFO0lBQ2hCLEtBQUssRUFBRSxFQUFFO0lBQ1QsVUFBVSxFQUFFLEVBQUU7SUFDZCxRQUFRLEVBQUUsRUFBRTtJQUtaLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLFVBQVUsRUFBRSxFQUFFO0lBQ2QsU0FBUyxFQUFFLEVBQUU7SUFDYixhQUFhLEVBQUUsRUFBRTtJQUNqQixZQUFZLEVBQUUsRUFBRTtDQUNuQixDQUFDLENBQUE7QUFFVyxRQUFBLGVBQWUsR0FBNkI7SUFDckQsUUFBUSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlO0lBQ3JGLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsT0FBTztJQUUvRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsY0FBYztJQUM3RixVQUFVLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxZQUFZO0NBQ3pELENBQUE7QUFFWSxRQUFBLHlCQUF5QixHQUFHO0lBQ3JDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU07Q0FDOUQsQ0FBQSJ9