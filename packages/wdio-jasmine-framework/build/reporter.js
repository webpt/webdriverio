"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/jasmine-framework');
const STACKTRACE_FILTER = /(node_modules(\/|\\)(\w+)*|@wdio\/sync\/(build|src)|- - - - -)/g;
class JasmineReporter {
    constructor(_reporter, params) {
        this._reporter = _reporter;
        this._parent = [];
        this._failedCount = 0;
        this._suiteStart = new Date();
        this._testStart = new Date();
        this._cid = params.cid;
        this._specs = params.specs;
        this._shouldCleanStack = typeof params.cleanStack === 'boolean' ? params.cleanStack : true;
    }
    suiteStarted(suite) {
        this._suiteStart = new Date();
        const newSuite = {
            type: 'suite',
            start: this._suiteStart,
            ...suite
        };
        this.startedSuite = newSuite;
        this.emit('suite:start', newSuite);
        this._parent.push({
            description: suite.description,
            id: suite.id,
            tests: 0
        });
    }
    specStarted(test) {
        this._testStart = new Date();
        const newTest = {
            type: 'test',
            start: this._testStart,
            ...test
        };
        const parentSuite = this._parent[this._parent.length - 1];
        if (!parentSuite) {
            log.warn('No root suite was defined! This can cause reporters to malfunction. ' +
                'Please always start a spec file with describe("...", () => { ... }).');
        }
        else {
            parentSuite.tests++;
        }
        this.emit('test:start', newTest);
    }
    specDone(test) {
        const newTest = {
            start: this._testStart,
            type: 'test',
            duration: Date.now() - this._testStart.getTime(),
            ...test
        };
        if (test.status === 'excluded') {
            newTest.status = 'pending';
        }
        if (test.failedExpectations && test.failedExpectations.length) {
            let errors = test.failedExpectations;
            if (this._shouldCleanStack) {
                errors = test.failedExpectations.map(x => this.cleanStack(x));
            }
            newTest.errors = errors;
            newTest.error = errors[0];
        }
        const e = 'test:' + (newTest.status ? newTest.status.replace(/ed/, '') : 'unknown');
        this.emit(e, newTest);
        this._failedCount += test.status === 'failed' ? 1 : 0;
        this.emit('test:end', newTest);
    }
    suiteDone(suite) {
        const parentSuite = this._parent[this._parent.length - 1];
        const newSuite = {
            type: 'suite',
            start: this._suiteStart,
            duration: Date.now() - this._suiteStart.getTime(),
            ...suite
        };
        if (parentSuite.tests === 0 && suite.failedExpectations && suite.failedExpectations.length) {
            const id = 'spec' + Math.random();
            this.specStarted({
                id,
                description: '<unknown test>',
                fullName: '<unknown test>'
            });
            this.specDone({
                id,
                description: '<unknown test>',
                fullName: '<unknown test>',
                failedExpectations: suite.failedExpectations,
                status: 'failed'
            });
        }
        this._parent.pop();
        this.emit('suite:end', newSuite);
        delete this.startedSuite;
    }
    emit(event, payload) {
        let message = {
            cid: this._cid,
            uid: this.getUniqueIdentifier(payload),
            event: event,
            title: payload.description,
            fullTitle: payload.fullName,
            pending: payload.status === 'pending',
            pendingReason: payload.pendingReason,
            parent: this._parent.length ? this.getUniqueIdentifier(this._parent[this._parent.length - 1]) : null,
            type: payload.type,
            error: payload.error,
            errors: payload.errors,
            duration: payload.duration || 0,
            specs: this._specs,
            start: payload.start,
        };
        this._reporter.emit(event, message);
    }
    getFailedCount() {
        return this._failedCount;
    }
    getUniqueIdentifier(target) {
        return target.description + target.id;
    }
    cleanStack(error) {
        if (!error.stack) {
            return error;
        }
        let stack = error.stack.split('\n');
        stack = stack.filter((line) => !line.match(STACKTRACE_FILTER));
        error.stack = stack.join('\n');
        return error;
    }
}
exports.default = JasmineReporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBaUM7QUFLakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0FBRTdDLE1BQU0saUJBQWlCLEdBQUcsaUVBQWlFLENBQUE7QUFFM0YsTUFBcUIsZUFBZTtJQVdoQyxZQUNZLFNBQXVCLEVBQy9CLE1BQXVCO1FBRGYsY0FBUyxHQUFULFNBQVMsQ0FBYztRQU4zQixZQUFPLEdBQWtCLEVBQUUsQ0FBQTtRQUMzQixpQkFBWSxHQUFHLENBQUMsQ0FBQTtRQUNoQixnQkFBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7UUFDeEIsZUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7UUFNM0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQzlGLENBQUM7SUFFRCxZQUFZLENBQUUsS0FBbUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQzdCLE1BQU0sUUFBUSxHQUFjO1lBQ3hCLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3ZCLEdBQUcsS0FBSztTQUNYLENBQUE7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElB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