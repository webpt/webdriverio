"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
const launcher_1 = __importDefault(require("./launcher"));
const run_1 = require("./commands/run");
const constants_1 = require("./constants");
const DEFAULT_CONFIG_FILENAME = 'wdio.conf.js';
const DESCRIPTION = [
    'The `wdio` command allows you run and manage your WebdriverIO test suite.',
    'If no command is provided it calls the `run` command by default, so:',
    '',
    '$ wdio wdio.conf.js',
    '',
    'is the same as:',
    '$ wdio run wdio.conf.js',
    '',
    'For more information, visit: https://webdriver.io/docs/clioptions'
];
exports.run = async () => {
    const argv = yargs_1.default
        .commandDir('commands')
        .example('$0 run wdio.conf.js --suite foobar', 'Run suite on testsuite "foobar"')
        .example('$0 run wdio.conf.js --spec ./tests/e2e/a.js --spec ./tests/e2e/b.js', 'Run suite on specific specs')
        .example('$0 run wdio.conf.js --spec ./tests/e2e/a.feature:5', 'Run scenario by line number')
        .example('$0 run wdio.conf.js --spec ./tests/e2e/a.feature:5:10', 'Run scenarios by line number')
        .example('$0 run wdio.conf.js --spec ./tests/e2e/a.feature:5:10 --spec ./test/e2e/b.feature', 'Run scenarios by line number in single feature and another complete feature')
        .example('$0 install reporter spec', 'Install @wdio/spec-reporter')
        .example('$0 repl chrome -u <SAUCE_USERNAME> -k <SAUCE_ACCESS_KEY>', 'Run repl in Sauce Labs cloud')
        .updateStrings({ 'Commands:': `${DESCRIPTION.join('\n')}\n\nCommands:` })
        .epilogue(constants_1.CLI_EPILOGUE);
    if (!process.argv.find((arg) => arg === '--help')) {
        argv.options(run_1.cmdArgs);
    }
    const params = { ...argv.argv };
    const supportedCommands = fs_1.default
        .readdirSync(path_1.default.join(__dirname, 'commands'))
        .map((file) => file.slice(0, -3));
    if (!params._.find((param) => supportedCommands.includes(param))) {
        const args = {
            ...argv.argv,
            configPath: path_1.default.resolve(process.cwd(), argv.argv._[0] && argv.argv._[0].toString() || DEFAULT_CONFIG_FILENAME)
        };
        return run_1.handler(args).catch(async (err) => {
            const output = await new Promise((resolve) => (yargs_1.default.parse('--help', (err, argv, output) => resolve(output))));
            console.error(`${output}\n\n${err.stack}`);
            if (!process.env.JEST_WORKER_ID) {
                process.exit(1);
            }
        });
    }
};
exports.default = launcher_1.default;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFtQjtBQUNuQixnREFBdUI7QUFFdkIsa0RBQXlCO0FBRXpCLDBEQUFpQztBQUNqQyx3Q0FBaUQ7QUFDakQsMkNBQTBDO0FBRzFDLE1BQU0sdUJBQXVCLEdBQUcsY0FBYyxDQUFBO0FBQzlDLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLDJFQUEyRTtJQUMzRSxzRUFBc0U7SUFDdEUsRUFBRTtJQUNGLHFCQUFxQjtJQUNyQixFQUFFO0lBQ0YsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixFQUFFO0lBQ0YsbUVBQW1FO0NBQ3RFLENBQUE7QUFFWSxRQUFBLEdBQUcsR0FBRyxLQUFLLElBQUksRUFBRTtJQUMxQixNQUFNLElBQUksR0FBRyxlQUFLO1NBQ2IsVUFBVSxDQUFDLFVBQVUsQ0FBQztTQUN0QixPQUFPLENBQUMsb0NBQW9DLEVBQUUsaUNBQWlDLENBQUM7U0FDaEYsT0FBTyxDQUFDLHFFQUFxRSxFQUFFLDZCQUE2QixDQUFDO1NBQzdHLE9BQU8sQ0FBQyxvREFBb0QsRUFBRSw2QkFBNkIsQ0FBQztTQUM1RixPQUFPLENBQUMsdURBQXVELEVBQUUsOEJBQThCLENBQUM7U0FDaEcsT0FBTyxDQUFDLG1GQUFtRixFQUFFLDZFQUE2RSxDQUFDO1NBQzNLLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSw2QkFBNkIsQ0FBQztTQUNsRSxPQUFPLENBQUMsMERBQTBELEVBQUUsOEJBQThCLENBQUM7U0FDbkcsYUFBYSxDQUFDLEVBQUUsV0FBVyxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEUsUUFBUSxDQUFDLHdCQUFZLENBQW9DLENBQUE7SUFPOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLEVBQUU7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFPLENBQUMsQ0FBQTtLQUN4QjtJQVVELE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDL0IsTUFBTSxpQkFBaUIsR0FBRyxZQUFFO1NBQ3ZCLFdBQVcsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVyQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3RFLE1BQU0sSUFBSSxHQUF3QjtZQUM5QixHQUFHLElBQUksQ0FBQyxJQUFJO1lBQ1osVUFBVSxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLHVCQUF1QixDQUFDO1NBQ2xILENBQUE7UUFFRCxPQUFPLGFBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQzFDLGVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQ2xCLEdBQVUsRUFDVixJQUF5QixFQUN6QixNQUFjLEVBQ2hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUN6QixDQUFBO1lBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUUxQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDbEI7UUFDTCxDQUFDLENBQUMsQ0FBQTtLQUNMO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsa0JBQVEsQ0FBQTtBQUN2QiwwQ0FBdUIifQ==