"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const cucumber_1 = require("@cucumber/cucumber");
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("./utils");
const log = logger_1.default('CucumberEventListener');
class CucumberEventListener extends events_1.EventEmitter {
    constructor(eventBroadcaster, _pickleFilter) {
        super();
        this._pickleFilter = _pickleFilter;
        this._gherkinDocEvents = [];
        this._scenarios = [];
        this._testCases = [];
        this._currentPickle = {};
        this._suiteMap = new Map();
        let results = [];
        eventBroadcaster.on('envelope', (envelope) => {
            var _a;
            if (envelope.gherkinDocument) {
                this.onGherkinDocument(envelope.gherkinDocument);
            }
            else if (envelope.testRunStarted) {
                this.onTestRunStarted();
            }
            else if (envelope.pickle) {
                this.onPickleAccepted(envelope.pickle);
            }
            else if (envelope.testCase) {
                this.onTestCasePrepared(envelope.testCase);
            }
            else if (envelope.testCaseStarted) {
                results = [];
                this.onTestCaseStarted(envelope.testCaseStarted);
            }
            else if (envelope.testStepStarted) {
                this.onTestStepStarted(envelope.testStepStarted);
            }
            else if (envelope.testStepFinished) {
                if (!((_a = envelope.testStepFinished.testStepResult) === null || _a === void 0 ? void 0 : _a.willBeRetried)) {
                    results.push(envelope.testStepFinished.testStepResult);
                }
                this.onTestStepFinished(envelope.testStepFinished);
            }
            else if (envelope.testCaseFinished) {
                this.onTestCaseFinished(results);
            }
            else if (envelope.testRunFinished) {
                this.onTestRunFinished();
            }
            else if (envelope.source) {
            }
            else {
                log.debug(`Unknown envelope received: ${JSON.stringify(envelope, null, 4)}`);
            }
        });
    }
    onGherkinDocument(gherkinDocEvent) {
        this._currentPickle = { uri: gherkinDocEvent.uri, feature: gherkinDocEvent.feature };
        this._gherkinDocEvents.push(gherkinDocEvent);
    }
    onPickleAccepted(pickleEvent) {
        const id = this._suiteMap.size.toString();
        this._suiteMap.set(pickleEvent.id, id);
        const scenario = { ...pickleEvent, id };
        this._scenarios.push(scenario);
    }
    onTestRunStarted() {
        const doc = this._gherkinDocEvents[this._gherkinDocEvents.length - 1];
        this.emit('before-feature', doc.uri, doc.feature);
    }
    onTestCasePrepared(testCase) {
        this._testCases.push(testCase);
    }
    onTestCaseStarted(testcase) {
        this._currentTestCase = testcase;
        const { uri, feature } = this._gherkinDocEvents[this._gherkinDocEvents.length - 1];
        const tc = this._testCases.find(tc => tc.id === testcase.testCaseId);
        const scenario = this._scenarios.find(sc => sc.id === this._suiteMap.get(tc === null || tc === void 0 ? void 0 : tc.pickleId));
        if (!scenario) {
            return;
        }
        const doc = this._gherkinDocEvents.find(gde => gde.uri === (scenario === null || scenario === void 0 ? void 0 : scenario.uri));
        this._currentPickle = { uri, feature, scenario };
        this.emit('before-scenario', scenario.uri, doc === null || doc === void 0 ? void 0 : doc.feature, scenario);
    }
    onTestStepStarted(testStepStartedEvent) {
        var _a, _b;
        const { uri, feature } = this._gherkinDocEvents[this._gherkinDocEvents.length - 1];
        const testcase = this._testCases.find((testcase) => this._currentTestCase && testcase.id === this._currentTestCase.testCaseId);
        const scenario = this._scenarios.find(sc => sc.id === this._suiteMap.get(testcase === null || testcase === void 0 ? void 0 : testcase.pickleId));
        const teststep = (_a = testcase === null || testcase === void 0 ? void 0 : testcase.testSteps) === null || _a === void 0 ? void 0 : _a.find((step) => step.id === testStepStartedEvent.testStepId);
        const step = ((_b = scenario === null || scenario === void 0 ? void 0 : scenario.steps) === null || _b === void 0 ? void 0 : _b.find((s) => s.id === (teststep === null || teststep === void 0 ? void 0 : teststep.pickleStepId))) || teststep;
        if (!step) {
            return;
        }
        this._currentPickle = { uri, feature, scenario, step };
        this.emit('before-step', uri, feature, scenario, step);
    }
    onTestStepFinished(testStepFinishedEvent) {
        var _a, _b;
        const { uri, feature } = this._gherkinDocEvents[this._gherkinDocEvents.length - 1];
        const testcase = this._testCases.find((testcase) => { var _a; return testcase.id === ((_a = this._currentTestCase) === null || _a === void 0 ? void 0 : _a.testCaseId); });
        const scenario = this._scenarios.find(sc => sc.id === this._suiteMap.get(testcase === null || testcase === void 0 ? void 0 : testcase.pickleId));
        const teststep = (_a = testcase === null || testcase === void 0 ? void 0 : testcase.testSteps) === null || _a === void 0 ? void 0 : _a.find((step) => step.id === testStepFinishedEvent.testStepId);
        const step = ((_b = scenario === null || scenario === void 0 ? void 0 : scenario.steps) === null || _b === void 0 ? void 0 : _b.find((s) => s.id === (teststep === null || teststep === void 0 ? void 0 : teststep.pickleStepId))) || teststep;
        const result = testStepFinishedEvent.testStepResult;
        if (!step) {
            return;
        }
        this.emit('after-step', uri, feature, scenario, step, result);
        delete this._currentPickle;
    }
    onTestCaseFinished(results) {
        const { uri, feature } = this._gherkinDocEvents[this._gherkinDocEvents.length - 1];
        const tc = this._testCases.find(tc => { var _a; return tc.id === ((_a = this._currentTestCase) === null || _a === void 0 ? void 0 : _a.testCaseId); });
        const scenario = this._scenarios.find(sc => sc.id === this._suiteMap.get(tc === null || tc === void 0 ? void 0 : tc.pickleId));
        if (!scenario) {
            return;
        }
        const finalResult = results.find((r) => r.status !== cucumber_1.Status.PASSED) || results.pop();
        const doc = this._gherkinDocEvents.find(gde => gde.uri === (scenario === null || scenario === void 0 ? void 0 : scenario.uri));
        this._currentPickle = { uri, feature, scenario };
        this.emit('after-scenario', doc === null || doc === void 0 ? void 0 : doc.uri, doc === null || doc === void 0 ? void 0 : doc.feature, scenario, finalResult);
    }
    onTestRunFinished() {
        delete this._currentTestCase;
        const gherkinDocEvent = this._gherkinDocEvents.pop();
        if (!gherkinDocEvent) {
            return;
        }
        this.emit('after-feature', gherkinDocEvent.uri, gherkinDocEvent.feature);
    }
    getHookParams() {
        return this._currentPickle;
    }
    getPickleIds(caps) {
        const gherkinDocument = this._gherkinDocEvents[this._gherkinDocEvents.length - 1];
        return [...this._suiteMap.entries()]
            .filter(([, fakeId]) => utils_1.filterPickles(caps, this._scenarios.find(s => s.id === fakeId)))
            .filter(([, fakeId]) => this._pickleFilter.matches({
            gherkinDocument,
            pickle: this._scenarios.find(s => s.id === fakeId)
        }))
            .map(([id]) => id);
    }
}
exports.default = CucumberEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VjdW1iZXJFdmVudExpc3RlbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2N1Y3VtYmVyRXZlbnRMaXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUFxQztBQUNyQyxpREFBeUQ7QUFFekQsMERBQWlDO0FBSWpDLG1DQUF1QztBQUV2QyxNQUFNLEdBQUcsR0FBRyxnQkFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUE7QUFFM0MsTUFBcUIscUJBQXNCLFNBQVEscUJBQVk7SUFRM0QsWUFBYSxnQkFBOEIsRUFBVSxhQUEyQjtRQUM1RSxLQUFLLEVBQUUsQ0FBQTtRQUQwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQVB4RSxzQkFBaUIsR0FBZ0MsRUFBRSxDQUFBO1FBQ25ELGVBQVUsR0FBdUIsRUFBRSxDQUFBO1FBQ25DLGVBQVUsR0FBeUIsRUFBRSxDQUFBO1FBRXJDLG1CQUFjLEdBQWdCLEVBQUUsQ0FBQTtRQUNoQyxjQUFTLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUE7UUFJOUMsSUFBSSxPQUFPLEdBQWdELEVBQUUsQ0FBQTtRQUM3RCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBMkIsRUFBRSxFQUFFOztZQUM1RCxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUE7YUFDbkQ7aUJBQU0sSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTthQUMxQjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDekM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzdDO2lCQUFNLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDakMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtnQkFDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2FBQ25EO2lCQUFNLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQTthQUNuRDtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFJbEMsSUFBSSxRQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLDBDQUFFLGFBQWEsQ0FBQSxFQUFFO29CQUMxRCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFlLENBQUMsQ0FBQTtpQkFDMUQ7Z0JBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2FBQ3JEO2lCQUFNLElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFO2dCQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDbkM7aUJBQU0sSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTthQUMzQjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7YUFFM0I7aUJBQU07Z0JBRUgsR0FBRyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUMvRTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQWtERCxpQkFBaUIsQ0FBRSxlQUEwQztRQUN6RCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxFQUFFLGVBQWUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNwRixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUE2QkQsZ0JBQWdCLENBQUUsV0FBNkI7UUFDM0MsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNoRCxNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUcsV0FBVyxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBRXZDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFVRCxnQkFBZ0I7UUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFzRUQsa0JBQWtCLENBQUUsUUFBNEI7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQWFELGlCQUFpQixDQUFFLFFBQW1DO1FBQ2xELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUE7UUFDaEMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNsRixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3BFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsUUFBa0IsQ0FBQyxDQUFDLENBQUE7UUFHakcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE9BQU07U0FDVDtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLENBQUEsQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFBO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3RFLENBQUM7SUFZRCxpQkFBaUIsQ0FBRSxvQkFBK0M7O1FBQzlELE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDbEYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM5SCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQWtCLENBQUMsQ0FBQyxDQUFBO1FBQ3ZHLE1BQU0sUUFBUSxTQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxTQUFTLDBDQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqRyxNQUFNLElBQUksR0FBRyxPQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxLQUFLLDBDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBSyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsWUFBWSxDQUFBLE1BQUssUUFBUSxDQUFBO1FBR3RGLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFNO1NBQ1Q7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQW1CRCxrQkFBa0IsQ0FBRSxxQkFBaUQ7O1FBQ2pFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDbEYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFDLE9BQUEsUUFBUSxDQUFDLEVBQUUsWUFBSyxJQUFJLENBQUMsZ0JBQWdCLDBDQUFFLFVBQVUsQ0FBQSxDQUFBLEVBQUEsQ0FBQyxDQUFBO1FBQ3RHLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsUUFBa0IsQ0FBQyxDQUFDLENBQUE7UUFDdkcsTUFBTSxRQUFRLFNBQUcsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFNBQVMsMENBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2xHLE1BQU0sSUFBSSxHQUFHLE9BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUssMENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxZQUFZLENBQUEsTUFBSyxRQUFRLENBQUE7UUFDdEYsTUFBTSxNQUFNLEdBQUcscUJBQXFCLENBQUMsY0FBYyxDQUFBO1FBR25ELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFNO1NBQ1Q7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDN0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO0lBQzlCLENBQUM7SUFXRCxrQkFBa0IsQ0FDZCxPQUFvRDtRQUVwRCxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2xGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQUMsT0FBQSxFQUFFLENBQUMsRUFBRSxZQUFLLElBQUksQ0FBQyxnQkFBZ0IsMENBQUUsVUFBVSxDQUFBLENBQUEsRUFBQSxDQUFDLENBQUE7UUFDbEYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxRQUFrQixDQUFDLENBQUMsQ0FBQTtRQUdqRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsT0FBTTtTQUNUO1FBS0QsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxpQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUVwRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBSyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRyxDQUFBLENBQUMsQ0FBQTtRQUN6RSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQTtRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxHQUFHLEVBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDOUUsQ0FBQztJQVFELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFBO1FBQzVCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUdwRCxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xCLE9BQU07U0FDVDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzVFLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO0lBQzlCLENBQUM7SUFNRCxZQUFZLENBQUUsSUFBbUM7UUFDN0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDakYsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUkvQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLHFCQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBSXZGLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDL0MsZUFBZTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFxQjtTQUN6RSxDQUFDLENBQUM7YUFDRixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMxQixDQUFDO0NBQ0o7QUE1WEQsd0NBNFhDIn0=