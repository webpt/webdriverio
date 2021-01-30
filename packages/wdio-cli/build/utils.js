"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathForFileGeneration = exports.getAnswers = exports.generateTestFiles = exports.hasFile = exports.getCapabilities = exports.validateServiceAnswers = exports.renderConfigurationFile = exports.convertPackageHashToObject = exports.addServiceDeps = exports.replaceConfig = exports.findInConfig = exports.getRunnerName = exports.runOnCompleteHook = exports.runLauncherHook = exports.runServiceHook = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const logger_1 = __importDefault(require("@wdio/logger"));
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const webdriverio_1 = require("webdriverio");
const child_process_1 = require("child_process");
const util_1 = require("util");
const constants_1 = require("./constants");
const log = logger_1.default('@wdio/cli:utils');
const TEMPLATE_ROOT_DIR = path_1.default.join(__dirname, 'templates', 'exampleFiles');
const renderFile = util_1.promisify(ejs_1.default.renderFile);
async function runServiceHook(launcher, hookName, ...args) {
    const start = Date.now();
    return Promise.all(launcher.map(async (service) => {
        try {
            if (typeof service[hookName] === 'function') {
                await service[hookName](...args);
            }
        }
        catch (e) {
            const message = `A service failed in the '${hookName}' hook\n${e.stack}\n\n`;
            if (e instanceof webdriverio_1.SevereServiceError) {
                return { status: 'rejected', reason: message };
            }
            log.error(`${message}Continue...`);
        }
    })).then(results => {
        if (launcher.length) {
            log.debug(`Finished to run "${hookName}" hook in ${Date.now() - start}ms`);
        }
        const rejectedHooks = results.filter(p => p && p.status === 'rejected');
        if (rejectedHooks.length) {
            return Promise.reject(new Error(`\n${rejectedHooks.map(p => p && p.reason).join()}\n\nStopping runner...`));
        }
    });
}
exports.runServiceHook = runServiceHook;
async function runLauncherHook(hook, ...args) {
    const catchFn = (e) => log.error(`Error in hook: ${e.stack}`);
    if (typeof hook === 'function') {
        hook = [hook];
    }
    return Promise.all(hook.map((hook) => {
        try {
            return hook(...args);
        }
        catch (e) {
            return catchFn(e);
        }
    })).catch(catchFn);
}
exports.runLauncherHook = runLauncherHook;
async function runOnCompleteHook(onCompleteHook, config, capabilities, exitCode, results) {
    if (typeof onCompleteHook === 'function') {
        onCompleteHook = [onCompleteHook];
    }
    return Promise.all(onCompleteHook.map(async (hook) => {
        try {
            await hook(exitCode, config, capabilities, results);
            return 0;
        }
        catch (e) {
            log.error(`Error in onCompleteHook: ${e.stack}`);
            return 1;
        }
    }));
}
exports.runOnCompleteHook = runOnCompleteHook;
function getRunnerName(caps = {}) {
    let runner = caps.browserName ||
        caps.appPackage ||
        caps.appWaitActivity ||
        caps.app ||
        caps.platformName;
    if (!runner) {
        runner = Object.values(caps).length === 0 || Object.values(caps).some(cap => !cap.capabilities) ? 'undefined' : 'MultiRemote';
    }
    return runner;
}
exports.getRunnerName = getRunnerName;
function buildNewConfigArray(str, type, change) {
    var _a;
    const newStr = str
        .split(`${type}s: `)[1]
        .replace('\'', '');
    let newArray = ((_a = newStr.match(/(\w*)/gmi)) === null || _a === void 0 ? void 0 : _a.filter(e => !!e).concat([change])) || [];
    return str
        .replace('// ', '')
        .replace(new RegExp(`(${type}s: )((.*\\s*)*)`), `$1[${newArray.map(e => `'${e}'`)}]`);
}
function buildNewConfigString(str, type, change) {
    return str.replace(new RegExp(`(${type}: )('\\w*')`), `$1'${change}'`);
}
function findInConfig(config, type) {
    let regexStr = `[\\/\\/]*[\\s]*${type}s: [\\s]*\\[([\\s]*['|"]\\w*['|"],*)*[\\s]*\\]`;
    if (type === 'framework') {
        regexStr = `[\\/\\/]*[\\s]*${type}: ([\\s]*['|"]\\w*['|"])`;
    }
    const regex = new RegExp(regexStr, 'gmi');
    return config.match(regex);
}
exports.findInConfig = findInConfig;
function replaceConfig(config, type, name) {
    if (type === 'framework') {
        return buildNewConfigString(config, type, name);
    }
    const match = findInConfig(config, type);
    if (!match || match.length === 0) {
        return;
    }
    const text = match.pop() || '';
    return config.replace(text, buildNewConfigArray(text, type, name));
}
exports.replaceConfig = replaceConfig;
function addServiceDeps(names, packages, update = false) {
    if (names.some(({ short }) => short === 'chromedriver')) {
        packages.push('chromedriver');
        if (update) {
            console.log('\n=======', '\nPlease change path to / in your wdio.conf.js:', "\npath: '/'", '\n=======\n');
        }
    }
    if (names.some(({ short }) => short === 'appium')) {
        const result = child_process_1.execSync('appium --version || echo APPIUM_MISSING').toString().trim();
        if (result === 'APPIUM_MISSING') {
            packages.push('appium');
        }
        else if (update) {
            console.log('\n=======', '\nUsing globally installed appium', result, '\nPlease add the following to your wdio.conf.js:', "\nappium: { command: 'appium' }", '\n=======\n');
        }
    }
}
exports.addServiceDeps = addServiceDeps;
function convertPackageHashToObject(pkg, hash = '$--$') {
    const splitHash = pkg.split(hash);
    return {
        package: splitHash[0],
        short: splitHash[1]
    };
}
exports.convertPackageHashToObject = convertPackageHashToObject;
async function renderConfigurationFile(answers) {
    const tplPath = path_1.default.join(__dirname, 'templates/wdio.conf.tpl.ejs');
    const renderedTpl = await renderFile(tplPath, { answers });
    fs_extra_1.default.writeFileSync(path_1.default.join(process.cwd(), 'wdio.conf.js'), renderedTpl);
}
exports.renderConfigurationFile = renderConfigurationFile;
exports.validateServiceAnswers = (answers) => {
    let result = true;
    Object.entries(constants_1.EXCLUSIVE_SERVICES).forEach(([name, { services, message }]) => {
        const exists = answers.some(answer => answer.includes(name));
        const hasExclusive = services.some(service => answers.some(answer => answer.includes(service)));
        if (exists && hasExclusive) {
            result = `${name} cannot work together with ${services.join(', ')}\n${message}\nPlease uncheck one of them.`;
        }
    });
    return result;
};
function getCapabilities(arg) {
    const optionalCapabilites = {
        platformVersion: arg.platformVersion,
        udid: arg.udid,
        ...(arg.deviceName && { deviceName: arg.deviceName })
    };
    if (/.*\.(apk|app|ipa)$/.test(arg.option)) {
        return {
            capabilities: {
                app: arg.option,
                ...(arg.option.endsWith('apk') ? constants_1.ANDROID_CONFIG : constants_1.IOS_CONFIG),
                ...optionalCapabilites,
            }
        };
    }
    else if (/android/.test(arg.option)) {
        return { capabilities: { browserName: 'Chrome', ...constants_1.ANDROID_CONFIG, ...optionalCapabilites } };
    }
    else if (/ios/.test(arg.option)) {
        return { capabilities: { browserName: 'Safari', ...constants_1.IOS_CONFIG, ...optionalCapabilites } };
    }
    return { capabilities: { browserName: arg.option } };
}
exports.getCapabilities = getCapabilities;
function hasFile(filename) {
    return fs_extra_1.default.existsSync(path_1.default.join(process.cwd(), filename));
}
exports.hasFile = hasFile;
async function generateTestFiles(answers) {
    const testFiles = answers.framework === 'cucumber'
        ? [path_1.default.join(TEMPLATE_ROOT_DIR, 'cucumber')]
        : [path_1.default.join(TEMPLATE_ROOT_DIR, 'mochaJasmine')];
    if (answers.usePageObjects) {
        testFiles.push(path_1.default.join(TEMPLATE_ROOT_DIR, 'pageobjects'));
    }
    const files = (await Promise.all(testFiles.map((dirPath) => recursive_readdir_1.default(dirPath, [(file, stats) => !stats.isDirectory() && !(file.endsWith('.ejs') || file.endsWith('.feature'))])))).reduce((cur, acc) => [...acc, ...(cur)], []);
    for (const file of files) {
        const renderedTpl = await renderFile(file, answers);
        let destPath = (file.endsWith('page.js.ejs')
            ? `${answers.destPageObjectRootPath}/${path_1.default.basename(file)}`
            : file.includes('step_definition')
                ? `${answers.stepDefinitions}`
                : `${answers.destSpecRootPath}/${path_1.default.basename(file)}`).replace(/\.ejs$/, '').replace(/\.js$/, answers.isUsingTypeScript ? '.ts' : '.js');
        fs_extra_1.default.ensureDirSync(path_1.default.dirname(destPath));
        fs_extra_1.default.writeFileSync(destPath, renderedTpl);
    }
}
exports.generateTestFiles = generateTestFiles;
async function getAnswers(yes) {
    return yes
        ? constants_1.QUESTIONNAIRE.reduce((answers, question) => Object.assign(answers, question.when && !question.when(answers)
            ? {}
            : { [question.name]: typeof question.default !== 'undefined'
                    ? typeof question.default === 'function'
                        ? question.default(answers)
                        : question.default
                    : question.choices && question.choices.length
                        ? question.choices[0].value
                            ? question.choices[0].value
                            : question.choices[0]
                        : {}
            }), {})
        : await inquirer_1.default.prompt(constants_1.QUESTIONNAIRE);
}
exports.getAnswers = getAnswers;
function getPathForFileGeneration(answers) {
    const destSpecRootPath = path_1.default.join(process.cwd(), path_1.default.dirname(answers.specs || '').replace(/\*\*$/, ''));
    const destStepRootPath = path_1.default.join(process.cwd(), path_1.default.dirname(answers.stepDefinitions || ''));
    const destPageObjectRootPath = answers.usePageObjects
        ? path_1.default.join(process.cwd(), path_1.default.dirname(answers.pages || '').replace(/\*\*$/, ''))
        : '';
    let relativePath = (answers.generateTestFiles && answers.usePageObjects)
        ? !(convertPackageHashToObject(answers.framework).short === 'cucumber')
            ? path_1.default.relative(destSpecRootPath, destPageObjectRootPath)
            : path_1.default.relative(destStepRootPath, destPageObjectRootPath)
        : '';
    if (process.platform === 'win32') {
        relativePath = relativePath.replace(/\\/g, '/');
    }
    return {
        destSpecRootPath: destSpecRootPath,
        destStepRootPath: destStepRootPath,
        destPageObjectRootPath: destPageObjectRootPath,
        relativePath: relativePath
    };
}
exports.getPathForFileGeneration = getPathForFileGeneration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQXlCO0FBQ3pCLDhDQUFxQjtBQUNyQixnREFBdUI7QUFDdkIsd0RBQStCO0FBQy9CLDBEQUFpQztBQUNqQywwRUFBdUM7QUFDdkMsNkNBQWdEO0FBQ2hELGlEQUF3QztBQUN4QywrQkFBZ0M7QUFJaEMsMkNBQTJGO0FBRTNGLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUVyQyxNQUFNLGlCQUFpQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQTtBQUMzRSxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLGFBQUcsQ0FBQyxVQUFVLENBQWlFLENBQUE7QUFLckcsS0FBSyxVQUFVLGNBQWMsQ0FDaEMsUUFBb0MsRUFDcEMsUUFBc0MsRUFDdEMsR0FBRyxJQUFXO0lBRWQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ3hCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFpQyxFQUFFLEVBQUU7UUFDeEUsSUFBSTtZQUNBLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUN6QyxNQUFPLE9BQU8sQ0FBQyxRQUFRLENBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO2FBQ2pEO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE1BQU0sT0FBTyxHQUFHLDRCQUE0QixRQUFRLFdBQVcsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFBO1lBRTVFLElBQUksQ0FBQyxZQUFZLGdDQUFrQixFQUFFO2dCQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsT0FBTyxF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