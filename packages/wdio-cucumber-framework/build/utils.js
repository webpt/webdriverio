"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPickles = exports.setUserHookNames = exports.buildStepPayload = exports.getFeatureId = exports.getStepType = exports.formatMessage = exports.createStepArgument = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("@wdio/utils");
const logger_1 = __importDefault(require("@wdio/logger"));
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/cucumber-framework:utils');
function createStepArgument({ argument }) {
    var _a;
    if (!argument) {
        return undefined;
    }
    if (argument.dataTable) {
        return {
            rows: (_a = argument.dataTable.rows) === null || _a === void 0 ? void 0 : _a.map((row) => {
                var _a;
                return ({
                    cells: (_a = row.cells) === null || _a === void 0 ? void 0 : _a.map((cell) => cell.value)
                });
            })
        };
    }
    if (argument.docString) {
        return argument.docString.content;
    }
    return undefined;
}
exports.createStepArgument = createStepArgument;
function formatMessage({ payload = {} }) {
    let content = { ...payload };
    if (payload.error && (payload.error.message || payload.error.stack)) {
        const { name, message, stack } = payload.error;
        content.error = { name, message, stack };
    }
    if (payload.title && payload.parent) {
        content.fullTitle = `${payload.parent}: ${payload.title}`;
    }
    return content;
}
exports.formatMessage = formatMessage;
function getStepType(step) {
    return step.hookId ? 'hook' : 'test';
}
exports.getStepType = getStepType;
function getFeatureId(uri, feature) {
    var _a, _b;
    return `${path_1.default.basename(uri)}:${(_a = feature.location) === null || _a === void 0 ? void 0 : _a.line}:${(_b = feature.location) === null || _b === void 0 ? void 0 : _b.column}`;
}
exports.getFeatureId = getFeatureId;
function buildStepPayload(uri, feature, scenario, step, params) {
    return {
        uid: step.id,
        title: step.text,
        parent: scenario.id,
        argument: createStepArgument(step),
        file: uri,
        tags: scenario.tags,
        featureName: feature.name,
        scenarioName: scenario.name,
        ...params
    };
}
exports.buildStepPayload = buildStepPayload;
function setUserHookNames(options) {
    constants_1.CUCUMBER_HOOK_DEFINITION_TYPES.forEach(hookName => {
        options[hookName].forEach((testRunHookDefinition) => {
            const hookFn = testRunHookDefinition.code;
            if (!hookFn.name.startsWith('wdioHook')) {
                const userHookAsyncFn = async function (...args) {
                    return hookFn.apply(this, args);
                };
                const userHookFn = function (...args) {
                    return hookFn.apply(this, args);
                };
                testRunHookDefinition.code = (utils_1.isFunctionAsync(hookFn)) ? userHookAsyncFn : userHookFn;
            }
        });
    });
}
exports.setUserHookNames = setUserHookNames;
function filterPickles(capabilities, pickle) {
    const skipTag = /^@skip\((.*)\)$/;
    const match = (value, expr) => {
        if (Array.isArray(expr)) {
            return expr.indexOf(value) >= 0;
        }
        else if (expr instanceof RegExp) {
            return expr.test(value);
        }
        return (expr && ('' + expr).toLowerCase()) === (value && ('' + value).toLowerCase());
    };
    const parse = (skipExpr) => skipExpr.split(';').reduce((acc, splitItem) => {
        const pos = splitItem.indexOf('=');
        if (pos > 0) {
            try {
                acc[splitItem.substring(0, pos)] = eval(splitItem.substring(pos + 1));
            }
            catch (e) {
                log.error(`Couldn't use tag "${splitItem}" for filtering because it is malformed`);
            }
        }
        return acc;
    }, {});
    return !(pickle && pickle.tags && pickle.tags
        .map(p => { var _a; return (_a = p.name) === null || _a === void 0 ? void 0 : _a.match(skipTag); })
        .filter(Boolean)
        .map(m => parse(m[1]))
        .find((filter) => Object.keys(filter)
        .every((key) => match(capabilities[key], filter[key]))));
}
exports.filterPickles = filterPickles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXVCO0FBRXZCLHVDQUE2QztBQUM3QywwREFBaUM7QUFPakMsMkNBQTREO0FBRzVELE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtBQVFwRCxTQUFnQixrQkFBa0IsQ0FBRSxFQUFFLFFBQVEsRUFBK0I7O0lBQ3pFLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDWCxPQUFPLFNBQVMsQ0FBQTtLQUNuQjtJQUVELElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNwQixPQUFPO1lBQ0gsSUFBSSxRQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSwwQ0FBRSxHQUFHLENBQUMsQ0FBQyxHQUFvQixFQUFFLEVBQUU7O2dCQUFDLE9BQUEsQ0FDekQ7b0JBQ0ksS0FBSyxRQUFFLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLEdBQUcsQ0FBQyxDQUFDLElBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ2hFLENBQ0osQ0FBQTthQUFBLENBQUM7U0FDTCxDQUFBO0tBQ0o7SUFFRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDcEIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQTtLQUNwQztJQUVELE9BQU8sU0FBUyxDQUFBO0FBQ3BCLENBQUM7QUFwQkQsZ0RBb0JDO0FBTUQsU0FBZ0IsYUFBYSxDQUFFLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBTztJQUNoRCxJQUFJLE9BQU8sR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUE7SUFLNUIsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1FBQzlDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFBO0tBQzNDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDakMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQzVEO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQWhCRCxzQ0FnQkM7QUFNRCxTQUFnQixXQUFXLENBQUUsSUFBaUM7SUFDMUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtBQUN4QyxDQUFDO0FBRkQsa0NBRUM7QUFFRCxTQUFnQixZQUFZLENBQUUsR0FBVyxFQUFFLE9BQTBDOztJQUNqRixPQUFPLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFBLE9BQU8sQ0FBQyxRQUFRLDBDQUFFLElBQUksSUFBSSxNQUFBLE9BQU8sQ0FBQyxRQUFRLDBDQUFFLE1BQU0sRUFBRSxDQUFBO0FBQ3hGLENBQUM7QUFGRCxvQ0FFQztBQUtELFNBQWdCLGdCQUFnQixDQUM1QixHQUFXLEVBQ1gsT0FBMEMsRUFDMUMsUUFBMEIsRUFDMUIsSUFBaUMsRUFDakMsTUFRQztJQUVELE9BQU87UUFDSCxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7UUFDaEIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7UUFFbkIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJO1FBQ3pCLFlBQVksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUMzQixHQUFHLE1BQU07S0FDWixDQUFBO0FBQ0wsQ0FBQztBQTNCRCw0Q0EyQkM7QUFPRCxTQUFnQixnQkFBZ0IsQ0FBRSxPQUF5QztJQUN2RSwwQ0FBOEIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHFCQUErQyxFQUFFLEVBQUU7WUFDMUUsTUFBTSxNQUFNLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFBO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDckMsTUFBTSxlQUFlLEdBQUcsS0FBSyxXQUFpQyxHQUFHLElBQVM7b0JBQ3RFLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ25DLENBQUMsQ0FBQTtnQkFDRCxNQUFNLFVBQVUsR0FBRyxVQUFnQyxHQUFHLElBQVM7b0JBQzNELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ25DLENBQUMsQ0FBQTtnQkFDRCxxQkFBcUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyx1QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFBO2FBQ3hGO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFmRCw0Q0FlQztBQVFELFNBQWdCLGFBQWEsQ0FBRSxZQUEyQyxFQUFFLE1BQXlCO0lBQ2pHLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFBO0lBRWpDLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBYSxFQUFFLElBQVksRUFBRSxFQUFFO1FBQzFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2xDO2FBQU0sSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMxQjtRQUNELE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO0lBQ3hGLENBQUMsQ0FBQTtJQUVELE1BQU0sS0FBSyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFLENBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBMkIsRUFBRSxTQUFpQixFQUFFLEVBQUU7UUFDMUUsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDVCxJQUFJO2dCQUNBLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3hFO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsU0FBUyx5Q0FBeUMsQ0FBQyxDQUFBO2FBQ3JGO1NBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUVWLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJO1NBQ3hDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSx3QkFBQyxDQUFDLENBQUMsSUFBSSwwQ0FBRSxLQUFLLENBQUMsT0FBTyxJQUFDLENBQUM7U0FDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUNmLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QixJQUFJLENBQUMsQ0FBQyxNQUFpQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUMzRCxLQUFLLENBQUMsQ0FBQyxHQUFvQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUUsWUFBb0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN4SCxDQUFDO0FBL0JELHNDQStCQyJ9