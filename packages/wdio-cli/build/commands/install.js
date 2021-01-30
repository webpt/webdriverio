"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.cmdArgs = exports.desc = exports.command = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const yarn_install_1 = __importDefault(require("yarn-install"));
const utils_1 = require("../utils");
const config_1 = require("./config");
const constants_1 = require("../constants");
const supportedInstallations = {
    service: constants_1.SUPPORTED_PACKAGES.service.map(({ value }) => utils_1.convertPackageHashToObject(value)),
    reporter: constants_1.SUPPORTED_PACKAGES.reporter.map(({ value }) => utils_1.convertPackageHashToObject(value)),
    framework: constants_1.SUPPORTED_PACKAGES.framework.map(({ value }) => utils_1.convertPackageHashToObject(value))
};
exports.command = 'install <type> <name>';
exports.desc = [
    'Add a `reporter`, `service`, or `framework` to your WebdriverIO project.',
    'The command installs the package from NPM, adds it to your package.json',
    'and modifies the wdio.conf.js accordingly.'
].join(' ');
exports.cmdArgs = {
    yarn: {
        desc: 'Install packages using yarn',
        type: 'boolean',
        default: false
    },
    config: {
        desc: 'Location of your WDIO configuration',
        default: './wdio.conf.js',
    },
};
exports.builder = (yargs) => {
    yargs
        .options(exports.cmdArgs)
        .epilogue(constants_1.CLI_EPILOGUE)
        .help();
    for (const [type, plugins] of Object.entries(supportedInstallations)) {
        for (const plugin of plugins) {
            yargs.example(`$0 install ${type} ${plugin.short}`, `Install ${plugin.package}`);
        }
    }
    return yargs;
};
async function handler(argv) {
    const { type, name, yarn, config } = argv;
    if (!Object.keys(supportedInstallations).includes(type)) {
        console.log(`Type ${type} is not supported.`);
        process.exit(0);
        return;
    }
    if (!supportedInstallations[type].find(pkg => pkg.short === name)) {
        console.log(`${name} is not a supported ${type}.`);
        process.exit(0);
        return;
    }
    const localConfPath = path_1.default.join(process.cwd(), config);
    if (!fs_extra_1.default.existsSync(localConfPath)) {
        try {
            const promptMessage = `Cannot install packages without a WebdriverIO configuration.
You can create one by running 'wdio config'`;
            await config_1.missingConfigurationPrompt('install', promptMessage, yarn);
        }
        catch {
            process.exit(1);
            return;
        }
    }
    const configFile = fs_extra_1.default.readFileSync(localConfPath, { encoding: 'utf-8' });
    const match = utils_1.findInConfig(configFile, type);
    if (match && match[0].includes(name)) {
        console.log(`The ${type} ${name} is already part of your configuration.`);
        process.exit(0);
        return;
    }
    const selectedPackage = supportedInstallations[type].find(({ short }) => short === name);
    const pkgsToInstall = selectedPackage ? [selectedPackage.package] : [];
    utils_1.addServiceDeps(selectedPackage ? [selectedPackage] : [], pkgsToInstall, true);
    console.log(`Installing "${selectedPackage.package}"${yarn ? ' using yarn.' : '.'}`);
    const install = yarn_install_1.default({ deps: pkgsToInstall, dev: true, respectNpm5: !yarn });
    if (install.status !== 0) {
        console.error('Error installing packages', install.stderr);
        process.exit(1);
        return;
    }
    console.log(`Package "${selectedPackage.package}" installed successfully.`);
    const newConfig = utils_1.replaceConfig(configFile, type, name);
    if (!newConfig) {
        throw new Error(`Couldn't find "${type}" property in ${path_1.default.basename(localConfPath)}`);
    }
    fs_extra_1.default.writeFileSync(localConfPath, newConfig, { encoding: 'utf-8' });
    console.log('Your wdio.conf.js file has been updated.');
    process.exit(0);
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbnN0YWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHdEQUF5QjtBQUN6QixnREFBdUI7QUFDdkIsZ0VBQXNDO0FBRXRDLG9DQUtpQjtBQUNqQixxQ0FBcUQ7QUFFckQsNENBQStEO0FBRy9ELE1BQU0sc0JBQXNCLEdBQUc7SUFDM0IsT0FBTyxFQUFFLDhCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxrQ0FBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RixRQUFRLEVBQUUsOEJBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLGtDQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNGLFNBQVMsRUFBRSw4QkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsa0NBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEcsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLHVCQUF1QixDQUFBO0FBQ2pDLFFBQUEsSUFBSSxHQUFHO0lBQ2hCLDBFQUEwRTtJQUMxRSx5RUFBeUU7SUFDekUsNENBQTRDO0NBQy9DLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRUUsUUFBQSxPQUFPLEdBQUc7SUFDbkIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLDZCQUE2QjtRQUNuQyxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLHFDQUFxQztRQUMzQyxPQUFPLEVBQUUsZ0JBQWdCO0tBQzVCO0NBQ0ssQ0FBQTtBQUVHLFFBQUEsT0FBTyxHQUFHLENBQUMsS0FB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