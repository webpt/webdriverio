"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWindows = exports.sanitizeCliOptionValue = exports.formatCliArgs = exports.getFilePath = void 0;
const path_1 = require("path");
const param_case_1 = require("param-case");
const FILE_EXTENSION_REGEX = /\.[0-9a-z]+$/i;
function getFilePath(filePath, defaultFilename) {
    let absolutePath = path_1.resolve(filePath);
    if (!FILE_EXTENSION_REGEX.test(path_1.basename(absolutePath))) {
        absolutePath = path_1.join(absolutePath, defaultFilename);
    }
    return absolutePath;
}
exports.getFilePath = getFilePath;
function formatCliArgs(args) {
    if (Array.isArray(args)) {
        return args.map(arg => sanitizeCliOptionValue(arg));
    }
    const cliArgs = [];
    for (const key in args) {
        let value = args[key];
        if ((typeof value === 'boolean' && !value) || value === null) {
            continue;
        }
        cliArgs.push(`--${param_case_1.paramCase(key)}`);
        if (typeof value !== 'boolean' && value !== null) {
            cliArgs.push(sanitizeCliOptionValue(value));
        }
    }
    return cliArgs;
}
exports.formatCliArgs = formatCliArgs;
function sanitizeCliOptionValue(value) {
    const valueString = String(value);
    return /\s/.test(valueString) ? `'${valueString}'` : valueString;
}
exports.sanitizeCliOptionValue = sanitizeCliOptionValue;
function isWindows() {
    return process.platform === 'win32';
}
exports.isWindows = isWindows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThDO0FBQzlDLDJDQUFzQztBQUl0QyxNQUFNLG9CQUFvQixHQUFHLGVBQWUsQ0FBQTtBQVE1QyxTQUFnQixXQUFXLENBQUUsUUFBZ0IsRUFBRSxlQUF1QjtJQUNsRSxJQUFJLFlBQVksR0FBRyxjQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFJcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxlQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtRQUNwRCxZQUFZLEdBQUcsV0FBSSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQTtLQUNyRDtJQUVELE9BQU8sWUFBWSxDQUFBO0FBQ3ZCLENBQUM7QUFWRCxrQ0FVQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUErQjtJQUN6RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUN0RDtJQUVELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtRQUNwQixJQUFJLEtBQUssR0FBMEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTVDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQzFELFNBQVE7U0FDWDtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxzQkFBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUVuQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtTQUM5QztLQUNKO0lBQ0QsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQXBCRCxzQ0FvQkM7QUFFRCxTQUFnQixzQkFBc0IsQ0FBRSxLQUFlO0lBQ25ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtBQUNwRSxDQUFDO0FBSkQsd0RBSUM7QUFFRCxTQUFnQixTQUFTO0lBQ3JCLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUE7QUFDdkMsQ0FBQztBQUZELDhCQUVDIn0=