"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STACKTRACE_FILTER = exports.STACK_START = void 0;
exports.STACK_START = /^\s+at /;
exports.STACKTRACE_FILTER = [
    'node_modules/@wdio/sync/',
    'node_modules/webdriverio/build/',
    'node_modules/webdriver/build/',
    'node_modules/request/request',
    ' (events.js:',
    ' (domain.js:',
    '(internal/process/next_tick.js',
    'new Promise (<anonymous>)',
    'Generator.next (<anonymous>)',
    '__awaiter ('
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLFdBQVcsR0FBRyxTQUFTLENBQUE7QUFFdkIsUUFBQSxpQkFBaUIsR0FBRztJQUU3QiwwQkFBMEI7SUFHMUIsaUNBQWlDO0lBQ2pDLCtCQUErQjtJQUcvQiw4QkFBOEI7SUFHOUIsY0FBYztJQUNkLGNBQWM7SUFHZCxnQ0FBZ0M7SUFDaEMsMkJBQTJCO0lBQzNCLDhCQUE4QjtJQUM5QixhQUFhO0NBQ1AsQ0FBQSJ9