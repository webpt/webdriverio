"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.cmdArgs = exports.desc = exports.command = void 0;
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
const webdriverio_1 = require("webdriverio");
const utils_1 = require("@wdio/utils");
const utils_2 = require("../utils");
const constants_1 = require("../constants");
const IGNORED_ARGS = [
    'bail', 'framework', 'reporters', 'suite', 'spec', 'exclude',
    'mochaOpts', 'jasmineNodeOpts', 'cucumberOpts'
];
exports.command = 'repl <option> [capabilities]';
exports.desc = 'Run WebDriver session in command line';
exports.cmdArgs = {
    platformVersion: {
        alias: 'v',
        desc: 'Version of OS for mobile devices',
        type: 'string',
    },
    deviceName: {
        alias: 'd',
        desc: 'Device name for mobile devices',
        type: 'string',
    },
    udid: {
        alias: 'u',
        desc: 'UDID of real mobile devices',
        type: 'string',
    }
};
exports.builder = (yargs) => {
    return yargs
        .options(lodash_pickby_1.default(exports.cmdArgs, (_, key) => !IGNORED_ARGS.includes(key)))
        .example('$0 repl firefox --path /', 'Run repl locally')
        .example('$0 repl chrome -u <SAUCE_USERNAME> -k <SAUCE_ACCESS_KEY>', 'Run repl in Sauce Labs cloud')
        .example('$0 repl android', 'Run repl browser on launched Android device')
        .example('$0 repl "./path/to/your_app.app"', 'Run repl native app on iOS simulator')
        .example('$0 repl ios -v 11.3 -d "iPhone 7" -u 123432abc', 'Run repl browser on iOS device with capabilities')
        .epilogue(constants_1.CLI_EPILOGUE)
        .help();
};
exports.handler = async (argv) => {
    const caps = utils_2.getCapabilities(argv);
    const execMode = utils_1.hasWdioSyncSupport ? { runner: 'local' } : {};
    const client = await webdriverio_1.remote({ ...argv, ...caps, ...execMode });
    global.$ = client.$.bind(client);
    global.$$ = client.$$.bind(client);
    global.browser = client;
    await client.debug();
    return client.deleteSession();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUFrQztBQUNsQyw2Q0FBb0M7QUFDcEMsdUNBQWdEO0FBRWhELG9DQUEwQztBQUUxQyw0Q0FBMkM7QUFHM0MsTUFBTSxZQUFZLEdBQUc7SUFDakIsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTO0lBQzVELFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxjQUFjO0NBQ2pELENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQTtBQUN4QyxRQUFBLElBQUksR0FBRyx1Q0FBdUMsQ0FBQTtBQUM5QyxRQUFBLE9BQU8sR0FBRztJQUNuQixlQUFlLEVBQUU7UUFDYixLQUFLLEVBQUUsR0FBRztRQUNWLElBQUksRUFBRSxrQ0FBa0M7UUFDeEMsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxVQUFVLEVBQUU7UUFDUixLQUFLLEVBQUUsR0FBRztRQUNWLElBQUksRUFBRSxnQ0FBZ0M7UUFDdEMsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDRixLQUFLLEVBQUUsR0FBRztRQUNWLElBQUksRUFBRSw2QkFBNkI7UUFDbkMsSUFBSSxFQUFFLFFBQVE7S0FDakI7Q0FDSyxDQUFBO0FBRUcsUUFBQSxPQUFPLEdBQUcsQ0FBQyxLQUFpQixFQUFFLEVBQUU7SUFDekMsT0FBTyxLQUFLO1NBQ1AsT0FBTyxDQUFDLHVCQUFNLENBQUMsZUFBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDakUsT0FBTyxDQUFDLDBCQUEwQixFQUFFLGtCQUFrQixDQUFDO1NBQ3ZELE9BQU8sQ0FBQywwREFBMEQsRUFBRSw4QkFBOEIsQ0FBQztTQUNuRyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsNkNBQTZDLENBQUM7U0FDekUsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLHNDQUFzQyxDQUFDO1NBQ25GLE9BQU8sQ0FBQyxnREFBZ0QsRUFBRSxrREFBa0QsQ0FBQztTQUM3RyxRQUFRLENBQUMsd0JBQVksQ0FBQztTQUN0QixJQUFJLEVBQUUsQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQVlZLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxJQUEwQixFQUFFLEVBQUU7SUFDeEQsTUFBTSxJQUFJLEdBQUcsdUJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUtsQyxNQUFNLFFBQVEsR0FBRywwQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDdkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBRTlELE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDaEMsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtJQUV2QixNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNwQixPQUFPLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtBQUNqQyxDQUFDLENBQUEifQ==