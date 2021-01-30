"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFrameworkFnWrapper = exports.testFnWrapper = void 0;
const utils_1 = require("../utils");
const errorHandler_1 = require("./errorHandler");
const shim_1 = require("../shim");
exports.testFnWrapper = function (...args) {
    return exports.testFrameworkFnWrapper.call(this, { executeHooksWithArgs: shim_1.executeHooksWithArgs, executeAsync: shim_1.executeAsync, runSync: shim_1.runSync }, ...args);
};
exports.testFrameworkFnWrapper = async function ({ executeHooksWithArgs, executeAsync, runSync }, type, { specFn, specFnArgs }, { beforeFn, beforeFnArgs }, { afterFn, afterFnArgs }, cid, repeatTest = 0) {
    const retries = { attempts: 0, limit: repeatTest };
    const beforeArgs = beforeFnArgs(this);
    await errorHandler_1.logHookError(`Before${type}`, await executeHooksWithArgs(`before${type}`, beforeFn, beforeArgs), cid);
    let promise;
    let result;
    let error;
    if (utils_1.isFunctionAsync(specFn) || !runSync) {
        promise = executeAsync.call(this, specFn, retries, specFnArgs);
    }
    else {
        promise = new Promise(runSync.call(this, specFn, retries, specFnArgs));
    }
    const testStart = Date.now();
    try {
        result = await promise;
    }
    catch (err) {
        error = err;
    }
    const duration = Date.now() - testStart;
    let afterArgs = afterFnArgs(this);
    if (!error && afterArgs[0] && afterArgs[0].failedExpectations && afterArgs[0].failedExpectations.length) {
        error = afterArgs[0].failedExpectations[0];
    }
    afterArgs.push({
        retries,
        error,
        result,
        duration,
        passed: !error
    });
    await errorHandler_1.logHookError(`After${type}`, await executeHooksWithArgs(`after${type}`, afterFn, [...afterArgs]), cid);
    if (error) {
        throw error;
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdEZuV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0LWZyYW1ld29yay90ZXN0Rm5XcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUEwQztBQUMxQyxpREFBNkM7QUFDN0Msa0NBQXFFO0FBcUJ4RCxRQUFBLGFBQWEsR0FBRyxVQUV6QixHQUFHLElBT0Y7SUFFRCxPQUFPLDhCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxvQkFBb0IsRUFBcEIsMkJBQW9CLEVBQUUsWUFBWSxFQUFaLG1CQUFZLEVBQUUsT0FBTyxFQUFQLGNBQU8sRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDdEcsQ0FBQyxDQUFBO0FBY1ksUUFBQSxzQkFBc0IsR0FBRyxLQUFLLFdBRXZDLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBa0IsRUFDL0QsSUFBWSxFQUNaLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBZ0IsRUFDcEMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUE0QixFQUNwRCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQTJCLEVBQ2pELEdBQVcsRUFDWCxVQUFVLEdBQUcsQ0FBQztJQUVkLE1BQU0sT0FBTyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUE7SUFDbEQsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JDLE1BQU0sMkJBQVksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFFM0csSUFBSSxPQUFPLENBQUE7SUFDWCxJQUFJLE1BQU0sQ0FBQTtJQUNWLElBQUksS0FBSyxDQUFBO0lBSVQsSUFBSSx1QkFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ3JDLE9BQU8sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0tBQ2pFO1NBQU07UUFDSCxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFBO0tBQ3pFO0lBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQzVCLElBQUk7UUFDQSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUE7S0FDekI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLEtBQUssR0FBRyxHQUFHLENBQUE7S0FDZDtJQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUE7SUFDdkMsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBT2pDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFLLFNBQXVDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLElBQUssU0FBdUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7UUFDbkssS0FBSyxHQUFJLFNBQXVDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDNUU7SUFFRCxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ1gsT0FBTztRQUNQLEtBQUs7UUFDTCxNQUFNO1FBQ04sUUFBUTtRQUNSLE1BQU0sRUFBRSxDQUFDLEtBQUs7S0FDakIsQ0FBQyxDQUFBO0lBRUYsTUFBTSwyQkFBWSxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUU1RyxJQUFJLEtBQUssRUFBRTtRQUNQLE1BQU0sS0FBSyxDQUFBO0tBQ2Q7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDLENBQUEifQ==