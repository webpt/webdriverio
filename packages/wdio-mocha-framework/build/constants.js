"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCHA_TIMEOUT_MESSAGE_REPLACEMENT = exports.MOCHA_TIMEOUT_MESSAGE = exports.NOOP = exports.EVENTS = exports.INTERFACES = void 0;
exports.INTERFACES = {
    bdd: ['it', 'before', 'beforeEach', 'after', 'afterEach'],
    tdd: ['test', 'suiteSetup', 'setup', 'suiteTeardown', 'teardown'],
    qunit: ['test', 'before', 'beforeEach', 'after', 'afterEach']
};
exports.EVENTS = {
    'suite': 'suite:start',
    'suite end': 'suite:end',
    'test': 'test:start',
    'test end': 'test:end',
    'hook': 'hook:start',
    'hook end': 'hook:end',
    'pass': 'test:pass',
    'fail': 'test:fail',
    'retry': 'test:retry',
    'pending': 'test:pending'
};
exports.NOOP = function () { };
exports.MOCHA_TIMEOUT_MESSAGE = 'For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.';
exports.MOCHA_TIMEOUT_MESSAGE_REPLACEMENT = [
    'The execution in the test "%s %s" took too long. Try to reduce the run time or',
    'increase your timeout for test specs (https://webdriver.io/docs/timeouts).'
].join(' ');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLFVBQVUsR0FBRztJQUN0QixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDO0lBQ3pELEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7SUFDakUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQztDQUN2RCxDQUFBO0FBS0csUUFBQSxNQUFNLEdBQUc7SUFDbEIsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFdBQVc7SUFDeEIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsVUFBVSxFQUFFLFVBQVU7SUFDdEIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsVUFBVSxFQUFFLFVBQVU7SUFDdEIsTUFBTSxFQUFFLFdBQVc7SUFDbkIsTUFBTSxFQUFFLFdBQVc7SUFDbkIsT0FBTyxFQUFFLFlBQVk7SUFDckIsU0FBUyxFQUFFLGNBQWM7Q0FDbkIsQ0FBQTtBQUVHLFFBQUEsSUFBSSxHQUE4QixjQUFjLENBQUMsQ0FBQTtBQUNqRCxRQUFBLHFCQUFxQixHQUFHLG1HQUFtRyxDQUFBO0FBQzNILFFBQUEsaUNBQWlDLEdBQUc7SUFDN0MsZ0ZBQWdGO0lBQ2hGLDRFQUE0RTtDQUMvRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSJ9