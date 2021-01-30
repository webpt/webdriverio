"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
function initialisePlugin(name, type) {
    if (name[0] === '@' || path_1.default.isAbsolute(name)) {
        const service = utils_1.safeRequire(name);
        if (service) {
            return service;
        }
    }
    if (typeof type !== 'string') {
        throw new Error('No plugin type provided');
    }
    const scopedPlugin = utils_1.safeRequire(`@wdio/${name.toLowerCase()}-${type}`);
    if (scopedPlugin) {
        return scopedPlugin;
    }
    const plugin = utils_1.safeRequire(`wdio-${name.toLowerCase()}-${type}`);
    if (plugin) {
        return plugin;
    }
    throw new Error(`Couldn't find plugin "${name}" ${type}, neither as wdio scoped package ` +
        `"@wdio/${name.toLowerCase()}-${type}" nor as community package ` +
        `"wdio-${name.toLowerCase()}-${type}". Please make sure you have it installed!`);
}
exports.default = initialisePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbGlzZVBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0aWFsaXNlUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXVCO0FBR3ZCLG1DQUFxQztBQVFyQyxTQUF3QixnQkFBZ0IsQ0FBRSxJQUFZLEVBQUUsSUFBYTtJQUlqRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksY0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQyxNQUFNLE9BQU8sR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWpDLElBQUksT0FBTyxFQUFFO1lBQ1QsT0FBTyxPQUFPLENBQUE7U0FDakI7S0FDSjtJQUVELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtLQUM3QztJQUtELE1BQU0sWUFBWSxHQUFHLG1CQUFXLENBQUMsU0FBUyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN2RSxJQUFJLFlBQVksRUFBRTtRQUNkLE9BQU8sWUFBWSxDQUFBO0tBQ3RCO0lBS0QsTUFBTSxNQUFNLEdBQUcsbUJBQVcsQ0FBQyxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ2hFLElBQUksTUFBTSxFQUFFO1FBQ1IsT0FBTyxNQUFNLENBQUE7S0FDaEI7SUFFRCxNQUFNLElBQUksS0FBSyxDQUNYLHlCQUF5QixJQUFJLEtBQUssSUFBSSxtQ0FBbUM7UUFDekUsVUFBVSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSw2QkFBNkI7UUFDakUsU0FBUyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSw0Q0FBNEMsQ0FDbEYsQ0FBQTtBQUNMLENBQUM7QUFyQ0QsbUNBcUNDIn0=