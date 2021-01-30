"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingConfigurationPrompt = exports.handler = exports.builder = exports.cmdArgs = exports.desc = exports.command = void 0;
const util_1 = __importDefault(require("util"));
const inquirer_1 = __importDefault(require("inquirer"));
const yarn_install_1 = __importDefault(require("yarn-install"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
exports.command = 'config';
exports.desc = 'Initialize WebdriverIO and setup configuration in your current project.';
exports.cmdArgs = {
    yarn: {
        type: 'boolean',
        desc: 'Install packages via yarn package manager.',
        default: utils_1.hasFile('yarn.lock')
    },
    yes: {
        alias: 'y',
        desc: 'will fill in all config defaults without prompting',
        type: 'boolean',
        default: false
    }
};
exports.builder = (yargs) => {
    return yargs
        .options(exports.cmdArgs)
        .epilogue(constants_1.CLI_EPILOGUE)
        .help();
};
const runConfig = async function (useYarn, yes, exit = false) {
    console.log(constants_1.CONFIG_HELPER_INTRO);
    const answers = await utils_1.getAnswers(yes);
    const frameworkPackage = utils_1.convertPackageHashToObject(answers.framework);
    const runnerPackage = utils_1.convertPackageHashToObject(answers.runner || constants_1.SUPPORTED_PACKAGES.runner[0].value);
    const servicePackages = answers.services.map((service) => utils_1.convertPackageHashToObject(service));
    const reporterPackages = answers.reporters.map((reporter) => utils_1.convertPackageHashToObject(reporter));
    const packagesToInstall = [
        runnerPackage.package,
        frameworkPackage.package,
        ...reporterPackages.map(reporter => reporter.package),
        ...servicePackages.map(service => service.package)
    ];
    const syncExecution = answers.executionMode === 'sync';
    if (syncExecution) {
        packagesToInstall.push('@wdio/sync');
    }
    if (answers.isUsingCompiler === constants_1.COMPILER_OPTIONS.ts) {
        try {
            if (process.env.JEST_WORKER_ID && process.env.WDIO_TEST_THROW_RESOLVE) {
                throw new Error('resolve error');
            }
            require.resolve('ts-node');
        }
        catch (e) {
            packagesToInstall.push('ts-node', 'typescript');
        }
    }
    if (answers.isUsingCompiler === constants_1.COMPILER_OPTIONS.babel) {
        try {
            if (process.env.JEST_WORKER_ID && process.env.WDIO_TEST_THROW_RESOLVE) {
                throw new Error('resolve error');
            }
            require.resolve('@babel/register');
        }
        catch (e) {
            packagesToInstall.push('@babel/register');
        }
    }
    utils_1.addServiceDeps(servicePackages, packagesToInstall);
    console.log('\nInstalling wdio packages:\n-', packagesToInstall.join('\n- '));
    const result = yarn_install_1.default({ deps: packagesToInstall, dev: true, respectNpm5: !useYarn });
    if (result.status !== 0) {
        throw new Error(result.stderr);
    }
    console.log('\nPackages installed successfully, creating configuration file...');
    const parsedPaths = utils_1.getPathForFileGeneration(answers);
    const parsedAnswers = {
        ...answers,
        runner: runnerPackage.short,
        framework: frameworkPackage.short,
        reporters: reporterPackages.map(({ short }) => short),
        services: servicePackages.map(({ short }) => short),
        packagesToInstall,
        isUsingTypeScript: answers.isUsingCompiler === constants_1.COMPILER_OPTIONS.ts,
        isUsingBabel: answers.isUsingCompiler === constants_1.COMPILER_OPTIONS.babel,
        isSync: syncExecution,
        _async: syncExecution ? '' : 'async ',
        _await: syncExecution ? '' : 'await ',
        destSpecRootPath: parsedPaths.destSpecRootPath,
        destPageObjectRootPath: parsedPaths.destPageObjectRootPath,
        relativePath: parsedPaths.relativePath
    };
    try {
        await utils_1.renderConfigurationFile(parsedAnswers);
        if (answers.generateTestFiles) {
            console.log('\nConfig file installed successfully, creating test files...');
            await utils_1.generateTestFiles(parsedAnswers);
        }
    }
    catch (e) {
        console.error(`Couldn't write config file: ${e.stack}`);
        return !process.env.JEST_WORKER_ID && process.exit(1);
    }
    if (answers.isUsingCompiler === constants_1.COMPILER_OPTIONS.ts) {
        const wdioTypes = syncExecution ? '@wdio/sync' : 'webdriverio';
        const tsPkgs = `"${[
            wdioTypes,
            frameworkPackage.package,
            ...servicePackages
                .map(service => service.package)
                .filter(service => service.startsWith('@wdio'))
        ].join('", "')}"`;
        console.log(util_1.default.format(constants_1.TS_COMPILER_INSTRUCTIONS, tsPkgs));
    }
    console.log(constants_1.CONFIG_HELPER_SUCCESS_MESSAGE);
    if (exit && !process.env.JEST_WORKER_ID) {
        process.exit(0);
    }
};
async function handler(argv) {
    try {
        await runConfig(argv.yarn, argv.yes);
    }
    catch (error) {
        throw new Error(`something went wrong during setup: ${error.stack.slice(7)}`);
    }
}
exports.handler = handler;
async function missingConfigurationPrompt(command, message, useYarn = false, runConfigCmd = runConfig) {
    const { config } = await inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'config',
            message: `Error: Could not execute "${command}" due to missing configuration. Would you like to create one?`,
            default: false
        }
    ]);
    if (!config && !process.env.JEST_WORKER_ID) {
        console.log(message);
        return process.exit(0);
    }
    return await runConfigCmd(useYarn, false, true);
}
exports.missingConfigurationPrompt = missingConfigurationPrompt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsd0RBQStCO0FBQy9CLGdFQUFzQztBQUV0Qyw0Q0FJcUI7QUFDckIsb0NBR2lCO0FBSUosUUFBQSxPQUFPLEdBQUcsUUFBUSxDQUFBO0FBQ2xCLFFBQUEsSUFBSSxHQUFHLHlFQUF5RSxDQUFBO0FBRWhGLFFBQUEsT0FBTyxHQUFHO0lBQ25CLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLDRDQUE0QztRQUNsRCxPQUFPLEVBQUUsZUFBTyxDQUFDLFdBQVcsQ0FBQztLQUNoQztJQUNELEdBQUcsRUFBRTtRQUNELEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLG9EQUFvRDtRQUMxRCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0NBQ0ssQ0FBQTtBQUVHLFFBQUEsT0FBTyxHQUFHLENBQUMsS0FBaUIsRUFBRSxFQUFFO0lBQ3pDLE9BQU8sS0FBSztTQUNQLE9BQU8sQ0FBQyxlQUFPLENBQUM7U0FDaEIsUUFBUSxDQUFDLHdCQUFZLENBQUM7U0FDdEIsSUFBSSxFQUFFLENBQUE7QUFDZixDQUFDLENBQUE7QUFFRCxNQUFNLFNBQVMsR0FBRyxLQUFLLFdBQVcsT0FBZ0IsRUFBRSxHQUFZLEVBQUUsSUFBSSxHQUFHLEtBQUs7SUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBbUIsQ0FBQyxDQUFBO0lBQ2hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQyxNQUFNLGdCQUFnQixHQUFHLGtDQUEwQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN0RSxNQUFNLGFBQWEsR0FBRyxrQ0FBMEIsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJ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