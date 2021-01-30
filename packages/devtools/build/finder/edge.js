"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const edge_paths_1 = require("edge-paths");
const child_process_1 = require("child_process");
const utils_1 = require("@wdio/utils");
const utils_2 = require("../utils");
const finder_1 = require("./finder");
const newLineRegex = /\r?\n/;
const EDGE_BINARY_NAMES = ['edge', 'msedge', 'microsoftedge'];
const EDGE_REGEX = /((ms|microsoft))?edge/g;
function darwin() {
    const suffixes = [
        '/Contents/MacOS/Microsoft Edge'
    ];
    const appName = 'Microsoft Edge';
    const defaultPath = `/Applications/${appName}.app${suffixes[0]}`;
    let installations;
    if (utils_1.canAccess(defaultPath)) {
        installations = [defaultPath];
    }
    else {
        const appPaths = finder_1.darwinGetAppPaths(appName);
        installations = finder_1.darwinGetInstallations(appPaths, suffixes);
    }
    const priorities = [
        { regex: new RegExp(`^${process.env.HOME}/Applications/.*Microsoft Edge.app`), weight: 50 },
        { regex: /^\/Applications\/.*Microsoft Edge.app/, weight: 100 },
        { regex: /^\/Volumes\/.*Microsoft Edge.app/, weight: -2 }
    ];
    const whichFinds = utils_2.findByWhich(EDGE_BINARY_NAMES, [{ regex: EDGE_REGEX, weight: 51 }]);
    const installFinds = utils_2.sort(installations, priorities);
    return [...installFinds, ...whichFinds];
}
function linux() {
    let installations = [];
    const desktopInstallationFolders = [
        path_1.default.join(require('os').homedir(), '.local/share/applications/'),
        '/usr/share/applications/',
    ];
    desktopInstallationFolders.forEach(folder => {
        installations = installations.concat(findEdgeExecutables(folder));
    });
    return utils_2.findByWhich(EDGE_BINARY_NAMES, [{ regex: EDGE_REGEX, weight: 51 }]);
}
function win32() {
    const installations = [];
    const suffixes = [
        `${path_1.default.sep}Microsoft${path_1.default.sep}Edge${path_1.default.sep}Application${path_1.default.sep}edge.exe`,
        `${path_1.default.sep}Microsoft${path_1.default.sep}Edge${path_1.default.sep}Application${path_1.default.sep}msedge.exe`,
        `${path_1.default.sep}Microsoft${path_1.default.sep}Edge Dev${path_1.default.sep}Application${path_1.default.sep}msedge.exe`
    ];
    const prefixes = [
        process.env.LOCALAPPDATA || '', process.env.PROGRAMFILES || '', process.env['PROGRAMFILES(X86)'] || ''
    ].filter(Boolean);
    prefixes.forEach(prefix => suffixes.forEach(suffix => {
        const edgePath = path_1.default.join(prefix, suffix);
        if (utils_1.canAccess(edgePath)) {
            installations.push(edgePath);
        }
    }));
    if (installations.length === 0) {
        const edgePath = edge_paths_1.getEdgePath();
        if (utils_1.canAccess(edgePath)) {
            installations.push(edgePath);
        }
    }
    return installations;
}
function findEdgeExecutables(folder) {
    const argumentsRegex = /(^[^ ]+).*/;
    const edgeExecRegex = '^Exec=/.*/(edge)-.*';
    let installations = [];
    if (utils_1.canAccess(folder)) {
        let execPaths;
        try {
            execPaths = child_process_1.execSync(`grep -ER "${edgeExecRegex}" ${folder} | awk -F '=' '{print $2}'`, { stdio: 'pipe' });
        }
        catch (e) {
            execPaths = child_process_1.execSync(`grep -Er "${edgeExecRegex}" ${folder} | awk -F '=' '{print $2}'`, { stdio: 'pipe' });
        }
        execPaths = execPaths.toString().split(newLineRegex).map((execPath) => execPath.replace(argumentsRegex, '$1'));
        execPaths.forEach((execPath) => utils_1.canAccess(execPath) && installations.push(execPath));
    }
    return installations;
}
exports.default = {
    darwin,
    linux,
    win32
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maW5kZXIvZWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BLGdEQUF1QjtBQUN2QiwyQ0FBd0M7QUFDeEMsaURBQXdDO0FBQ3hDLHVDQUF1QztBQUV2QyxvQ0FBNEM7QUFDNUMscUNBQW9FO0FBRXBFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQTtBQUM1QixNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQTtBQUM3RCxNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQTtBQUUzQyxTQUFTLE1BQU07SUFDWCxNQUFNLFFBQVEsR0FBRztRQUNiLGdDQUFnQztLQUNuQyxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7SUFDaEMsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLE9BQU8sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUVoRSxJQUFJLGFBQWEsQ0FBQTtJQUNqQixJQUFJLGlCQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDeEIsYUFBYSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7S0FDaEM7U0FBTTtRQUNILE1BQU0sUUFBUSxHQUFHLDBCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzNDLGFBQWEsR0FBRywrQkFBc0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDN0Q7SUFJRCxNQUFNLFVBQVUsR0FBRztRQUNmLEVBQUUsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLG9DQUFvQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUMzRixFQUFFLEtBQUssRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1FBQy9ELEVBQUUsS0FBSyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0s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