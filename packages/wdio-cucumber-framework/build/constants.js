"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUCUMBER_HOOK_DEFINITION_TYPES = exports.NOOP = exports.DEFAULT_OPTS = exports.DEFAULT_TIMEOUT = void 0;
exports.DEFAULT_TIMEOUT = 60000;
exports.DEFAULT_OPTS = {
    backtrace: false,
    requireModule: [],
    failAmbiguousDefinitions: false,
    failFast: false,
    ignoreUndefinedDefinitions: false,
    names: [],
    profile: [],
    require: [],
    order: 'defined',
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    tagsInTitle: false,
    timeout: exports.DEFAULT_TIMEOUT,
    scenarioLevelReporter: false,
    featureDefaultLanguage: 'en'
};
exports.NOOP = function () { };
exports.CUCUMBER_HOOK_DEFINITION_TYPES = [
    'beforeTestRunHookDefinitionConfigs',
    'beforeTestCaseHookDefinitionConfigs',
    'afterTestCaseHookDefinitionConfigs',
    'afterTestRunHookDefinitionConfigs',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFYSxRQUFBLGVBQWUsR0FBRyxLQUFLLENBQUE7QUFFdkIsUUFBQSxZQUFZLEdBQW9CO0lBQ3pDLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLHdCQUF3QixFQUFFLEtBQUs7SUFDL0IsUUFBUSxFQUFFLEtBQUs7SUFDZiwwQkFBMEIsRUFBRSxLQUFLO0lBQ2pDLEtBQUssRUFBRSxFQUFFO0lBQ1QsT0FBTyxFQUFFLEVBQUU7SUFDWCxPQUFPLEVBQUUsRUFBRTtJQUNYLEtBQUssRUFBRSxTQUFTO0lBQ2hCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsTUFBTSxFQUFFLElBQUk7SUFDWixNQUFNLEVBQUUsS0FBSztJQUNiLGFBQWEsRUFBRSxFQUFFO0lBQ2pCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLE9BQU8sRUFBRSx1QkFBZTtJQUN4QixxQkFBcUIsRUFBRSxLQUFLO0lBQzVCLHNCQUFzQixFQUFFLElBQUk7Q0FDL0IsQ0FBQTtBQUdZLFFBQUEsSUFBSSxHQUFHLGNBQWEsQ0FBQyxDQUFBO0FBRXJCLFFBQUEsOEJBQThCLEdBQUc7SUFDMUMsb0NBQW9DO0lBQ3BDLHFDQUFxQztJQUNyQyxvQ0FBb0M7SUFDcEMsbUNBQW1DO0NBQzdCLENBQUEifQ==