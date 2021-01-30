"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.launch = exports.launchWithStdin = exports.builder = exports.cmdArgs = exports.desc = exports.command = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const launcher_1 = __importDefault(require("../launcher"));
const watcher_1 = __importDefault(require("../watcher"));
const constants_1 = require("../constants");
exports.command = 'run <configPath>';
exports.desc = 'Run your WDIO configuration file to initialize your tests. (default)';
exports.cmdArgs = {
    watch: {
        desc: 'Run WebdriverIO in watch mode',
        type: 'boolean',
    },
    hostname: {
        alias: 'h',
        desc: 'automation driver host address',
        type: 'string'
    },
    port: {
        alias: 'p',
        desc: 'automation driver port',
        type: 'number'
    },
    path: {
        type: 'string',
        desc: 'path to WebDriver endpoints (default "/")'
    },
    user: {
        alias: 'u',
        desc: 'username if using a cloud service as automation backend',
        type: 'string'
    },
    key: {
        alias: 'k',
        desc: 'corresponding access key to the user',
        type: 'string'
    },
    logLevel: {
        alias: 'l',
        desc: 'level of logging verbosity',
        choices: ['trace', 'debug', 'info', 'warn', 'error', 'silent']
    },
    bail: {
        desc: 'stop test runner after specific amount of tests have failed',
        type: 'number'
    },
    baseUrl: {
        desc: 'shorten url command calls by setting a base url',
        type: 'string'
    },
    waitforTimeout: {
        alias: 'w',
        desc: 'timeout for all waitForXXX commands',
        type: 'number'
    },
    framework: {
        alias: 'f',
        desc: 'defines the framework (Mocha, Jasmine or Cucumber) to run the specs',
        type: 'string'
    },
    reporters: {
        alias: 'r',
        desc: 'reporters to print out the results on stdout',
        type: 'array'
    },
    suite: {
        desc: 'overwrites the specs attribute and runs the defined suite',
        type: 'array'
    },
    spec: {
        desc: 'run only a certain spec file - overrides specs piped from stdin',
        type: 'array'
    },
    exclude: {
        desc: 'exclude certain spec file from the test run - overrides exclude piped from stdin',
        type: 'array'
    },
    mochaOpts: {
        desc: 'Mocha options'
    },
    jasmineNodeOpts: {
        desc: 'Jasmine options'
    },
    cucumberOpts: {
        desc: 'Cucumber options'
    },
    tsNodeOpts: {
        desc: 'ts-node options'
    }
};
exports.builder = (yargs) => {
    return yargs
        .options(exports.cmdArgs)
        .example('$0 run wdio.conf.js --suite foobar', 'Run suite on testsuite "foobar"')
        .example('$0 run wdio.conf.js --spec ./tests/e2e/a.js --spec ./tests/e2e/b.js', 'Run suite on specific specs')
        .example('$0 run wdio.conf.js --mochaOpts.timeout 60000', 'Run suite with custom Mocha timeout')
        .epilogue(constants_1.CLI_EPILOGUE)
        .help();
};
function launchWithStdin(wdioConfPath, params) {
    let stdinData = '';
    const stdin = process.openStdin();
    stdin.setEncoding('utf8');
    stdin.on('data', (data) => {
        stdinData += data;
    });
    stdin.on('end', () => {
        if (stdinData.length > 0) {
            params.spec = stdinData.trim().split(/\r?\n/);
        }
        launch(wdioConfPath, params);
    });
}
exports.launchWithStdin = launchWithStdin;
function launch(wdioConfPath, params) {
    const launcher = new launcher_1.default(wdioConfPath, params);
    return launcher.run()
        .then((...args) => {
        if (!process.env.JEST_WORKER_ID) {
            process.exit(...args);
        }
    })
        .catch(err => {
        console.error(err);
        if (!process.env.JEST_WORKER_ID) {
            process.exit(1);
        }
    });
}
exports.launch = launch;
async function handler(argv) {
    const { configPath, ...params } = argv;
    if (!fs_extra_1.default.existsSync(configPath)) {
        await config_1.missingConfigurationPrompt('run', `No WebdriverIO configuration found in "${process.cwd()}"`);
    }
    const localConf = path_1.default.join(process.cwd(), 'wdio.conf.js');
    const wdioConf = configPath || (fs_extra_1.default.existsSync(localConf) ? localConf : undefined);
    if (params.watch) {
        const watcher = new watcher_1.default(wdioConf, params);
        return watcher.watch();
    }
    if (process.stdin.isTTY || !process.stdout.isTTY) {
        return launch(wdioConf, params);
    }
    launchWithStdin(wdioConf, params);
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3J1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBeUI7QUFDekIsZ0RBQXVCO0FBRXZCLHFDQUFxRDtBQUdyRCwyREFBa0M7QUFDbEMseURBQWdDO0FBQ2hDLDRDQUEyQztBQUc5QixRQUFBLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQTtBQUU1QixRQUFBLElBQUksR0FBRyxzRUFBc0UsQ0FBQTtBQUU3RSxRQUFBLE9BQU8sR0FBRztJQUNuQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsK0JBQStCO1FBQ3JDLElBQUksRUFBRSxTQUFTO0tBQ2xCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsMkNBQTJDO0tBQ3BEO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUseURBQXlEO1FBQy9ELElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsc0NBQXNDO1FBQzVDLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsNEJBQTRCO1FBQ2xDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0tBQ2pFO0lBQ0QsSUFBSSxFQUFF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