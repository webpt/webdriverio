"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("@wdio/utils");
const request_1 = __importDefault(require("./request"));
const log = logger_1.default('webdriver');
function default_1(method, endpointUri, commandInfo, doubleEncodeVariables = false) {
    const { command, ref, parameters, variables = [], isHubCommand = false } = commandInfo;
    return function protocolCommand(...args) {
        let endpoint = endpointUri;
        const commandParams = [...variables.map((v) => Object.assign(v, {
                required: true,
                type: 'string'
            })), ...parameters];
        const commandUsage = `${command}(${commandParams.map((p) => p.name).join(', ')})`;
        const moreInfo = `\n\nFor more info see ${ref}\n`;
        const body = {};
        const minAllowedParams = commandParams.filter((param) => param.required).length;
        if (args.length < minAllowedParams || args.length > commandParams.length) {
            const parameterDescription = commandParams.length
                ? `\n\nProperty Description:\n${commandParams.map((p) => `  "${p.name}" (${p.type}): ${p.description}`).join('\n')}`
                : '';
            throw new Error(`Wrong parameters applied for ${command}\n` +
                `Usage: ${commandUsage}` +
                parameterDescription +
                moreInfo);
        }
        for (const [it, arg] of Object.entries(args)) {
            const i = parseInt(it, 10);
            const commandParam = commandParams[i];
            if (!utils_1.isValidParameter(arg, commandParam.type)) {
                if (typeof arg === 'undefined' && !commandParam.required) {
                    continue;
                }
                const actual = commandParam.type.endsWith('[]')
                    ? `(${(Array.isArray(arg) ? arg : [arg]).map((a) => utils_1.getArgumentType(a))})[]`
                    : utils_1.getArgumentType(arg);
                throw new Error(`Malformed type for "${commandParam.name}" parameter of command ${command}\n` +
                    `Expected: ${commandParam.type}\n` +
                    `Actual: ${actual}` +
                    moreInfo);
            }
            if (i < variables.length) {
                const encodedArg = doubleEncodeVariables ? encodeURIComponent(encodeURIComponent(arg)) : encodeURIComponent(arg);
                endpoint = endpoint.replace(`:${commandParams[i].name}`, encodedArg);
                continue;
            }
            body[commandParams[i].name] = arg;
        }
        const request = new request_1.default(method, endpoint, body, isHubCommand);
        this.emit('command', { method, endpoint, body });
        log.info('COMMAND', utils_1.commandCallStructure(command, args));
        return request.makeRequest(this.options, this.sessionId).then((result) => {
            if (result.value != null) {
                log.info('RESULT', /screenshot|recording/i.test(command)
                    && typeof result.value === 'string' && result.value.length > 64
                    ? `${result.value.substr(0, 61)}...` : result.value);
            }
            this.emit('result', { method, endpoint, body, result });
            if (command === 'deleteSession') {
                logger_1.default.clearLogger();
            }
            return result.value;
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQWlDO0FBQ2pDLHVDQUFxRjtBQUdyRix3REFBK0Q7QUFHL0QsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUUvQixtQkFDSSxNQUFjLEVBQ2QsV0FBbUIsRUFDbkIsV0FBc0MsRUFDdEMscUJBQXFCLEdBQUcsS0FBSztJQUU3QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBRSxZQUFZLEdBQUcsS0FBSyxFQUFFLEdBQUcsV0FBVyxDQUFBO0lBRXRGLE9BQU8sU0FBUyxlQUFlLENBQW9CLEdBQUcsSUFBVztRQUM3RCxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUE7UUFDMUIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO2dCQUk1RCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxJQUFJLEVBQUUsUUFBUTthQUNqQixDQUFDLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFBO1FBRW5CLE1BQU0sWUFBWSxHQUFHLEdBQUcsT0FBTyxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNqRixNQUFNLFFBQVEsR0FBRyx5QkFBeUIsR0FBRyxJQUFJLENBQUE7UUFDakQsTUFBTSxJQUFJLEdBQXdCLEVBQUUsQ0FBQTtRQUtwQyxNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUss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