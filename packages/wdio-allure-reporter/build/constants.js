"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkPlaceholder = exports.mochaAllHooks = exports.mochaEachHooks = exports.events = exports.stepStatuses = exports.testStatuses = exports.SKIPPED = exports.CANCELED = exports.PENDING = exports.BROKEN = exports.FAILED = exports.PASSED = void 0;
exports.PASSED = 'passed';
exports.FAILED = 'failed';
exports.BROKEN = 'broken';
exports.PENDING = 'pending';
exports.CANCELED = 'canceled';
exports.SKIPPED = 'skipped';
const testStatuses = {
    PASSED: exports.PASSED,
    FAILED: exports.FAILED,
    BROKEN: exports.BROKEN,
    PENDING: exports.PENDING
};
exports.testStatuses = testStatuses;
const stepStatuses = {
    PASSED: exports.PASSED,
    FAILED: exports.FAILED,
    BROKEN: exports.BROKEN,
    CANCELED: exports.CANCELED,
    SKIPPED: exports.SKIPPED
};
exports.stepStatuses = stepStatuses;
const events = {
    addLabel: 'allure:addLabel',
    addFeature: 'allure:addFeature',
    addStory: 'allure:addStory',
    addSeverity: 'allure:addSeverity',
    addIssue: 'allure:addIssue',
    addTestId: 'allure:addTestId',
    addEnvironment: 'allure:addEnvironment',
    addDescription: 'allure:addDescription',
    addAttachment: 'allure:addAttachment',
    startStep: 'allure:startStep',
    endStep: 'allure:endStep',
    addStep: 'allure:addStep',
    addArgument: 'allure:addArgument'
};
exports.events = events;
const mochaEachHooks = ['"before each" hook', '"after each" hook'];
exports.mochaEachHooks = mochaEachHooks;
const mochaAllHooks = ['"before all" hook', '"after all" hook'];
exports.mochaAllHooks = mochaAllHooks;
const linkPlaceholder = '{}';
exports.linkPlaceholder = linkPlaceholder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFYSxRQUFBLE1BQU0sR0FBRyxRQUFRLENBQUE7QUFDakIsUUFBQSxNQUFNLEdBQUcsUUFBUSxDQUFBO0FBQ2pCLFFBQUEsTUFBTSxHQUFHLFFBQVEsQ0FBQTtBQUNqQixRQUFBLE9BQU8sR0FBRyxTQUFTLENBQUE7QUFDbkIsUUFBQSxRQUFRLEdBQUcsVUFBVSxDQUFBO0FBQ3JCLFFBQUEsT0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUVoQyxNQUFNLFlBQVksR0FBMkI7SUFDekMsTUFBTSxFQUFOLGNBQU07SUFDTixNQUFNLEVBQU4sY0FBTTtJQUNOLE1BQU0sRUFBTixjQUFNO0lBQ04sT0FBTyxFQUFQLGVBQU87Q0FDRCxDQUFBO0FBNkJELG9DQUFZO0FBNUJyQixNQUFNLFlBQVksR0FBMkI7SUFDekMsTUFBTSxFQUFOLGNBQU07SUFDTixNQUFNLEVBQU4sY0FBTTtJQUNOLE1BQU0sRUFBTixjQUFNO0lBQ04sUUFBUSxFQUFSLGdCQUFRO0lBQ1IsT0FBTyxFQUFQLGVBQU87Q0FDRCxDQUFBO0FBc0JhLG9DQUFZO0FBcEJuQyxNQUFNLE1BQU0sR0FBRztJQUNYLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsVUFBVSxFQUFFLG1CQUFtQjtJQUMvQixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLFdBQVcsRUFBRSxvQkFBb0I7SUFDakMsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLGNBQWMsRUFBRSx1QkFBdUI7SUFDdkMsY0FBYyxFQUFFLHVCQUF1QjtJQUN2QyxhQUFhLEVBQUUsc0JBQXNCO0lBQ3JDLFNBQVMsRUFBRSxrQkFBa0I7SUFDN0IsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFdBQVcsRUFBRSxvQkFBb0I7Q0FDM0IsQ0FBQTtBQU0yQix3QkFBTTtBQUozQyxNQUFNLGNBQWMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFVLENBQUE7QUFJOUIsd0NBQWM7QUFIM0QsTUFBTSxhQUFhLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBVSxDQUFBO0FBR1gsc0NBQWE7QUFGMUUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFBO0FBRWdELDBDQUFlIn0=