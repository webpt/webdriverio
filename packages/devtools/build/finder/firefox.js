"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const utils_1 = require("@wdio/utils");
const utils_2 = require("../utils");
const finder_1 = require("./finder");
const newLineRegex = /\r?\n/;
function darwin() {
    const suffixes = [
        '/Contents/MacOS/firefox-bin'
    ];
    const appName = 'Firefox Nightly';
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
        { regex: new RegExp(`^${process.env.HOME}/Applications/.*Firefox.app`), weight: 50 },
        { regex: /^\/Applications\/.*Firefox.app/, weight: 100 },
        { regex: /^\/Volumes\/.*Firefox.app/, weight: -2 }
    ];
    const whichFinds = utils_2.findByWhich(['firefox-nightly', 'firefox-trunk'], [{ regex: /firefox-nightly/, weight: 51 }]);
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
        installations = installations.concat(findFirefoxExecutables(folder));
    });
    const whichFinds = utils_2.findByWhich(['firefox-nightly', 'firefox-trunk', 'firefox'], [{ regex: /firefox/, weight: 51 }]);
    return [...installations, ...whichFinds];
}
function win32() {
    const installations = [];
    const suffixes = [
        `${path_1.default.sep}Firefox Nightly${path_1.default.sep}Application${path_1.default.sep}firefox.exe`
    ];
    const prefixes = [
        process.env.LOCALAPPDATA || '', process.env.PROGRAMFILES || '', process.env['PROGRAMFILES(X86)'] || ''
    ].filter(Boolean);
    prefixes.forEach(prefix => suffixes.forEach(suffix => {
        const firefoxPath = path_1.default.join(prefix, suffix);
        if (utils_1.canAccess(firefoxPath)) {
            installations.push(firefoxPath);
        }
    }));
    return installations;
}
function findFirefoxExecutables(folder) {
    const argumentsRegex = /(^[^ ]+).*/;
    const edgeExecRegex = '^Exec=/.*/(firefox)-.*';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWZveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maW5kZXIvZmlyZWZveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BLGdEQUF1QjtBQUN2QixpREFBd0M7QUFDeEMsdUNBQXVDO0FBRXZDLG9DQUE0QztBQUM1QyxxQ0FBb0U7QUFFcEUsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFBO0FBTzVCLFNBQVMsTUFBTTtJQUNYLE1BQU0sUUFBUSxHQUFHO1FBQ2IsNkJBQTZCO0tBQ2hDLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQTtJQUNqQyxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsT0FBTyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBRWhFLElBQUksYUFBYSxDQUFBO0lBQ2pCLElBQUksaUJBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN4QixhQUFhLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtLQUNoQztTQUFNO1FBQ0gsTUFBTSxRQUFRLEdBQUcsMEJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDM0MsYUFBYSxHQUFHLCtCQUFzQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUM3RDtJQUtELE1BQU0sVUFBVSxHQUFpQjtRQUM3QixFQUFFLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSw2QkFBNkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDcEYsRUFBRSxLQUFLLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtRQUN4RCxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUU7S0FDckQsQ0FBQTtJQUVELE1BQU0sVUFBVSxHQUFHLG1CQUFXLENBQzFCLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLEVBQ3BDLENBQUMs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