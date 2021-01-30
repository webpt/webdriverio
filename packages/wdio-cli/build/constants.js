"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUESTIONNAIRE = exports.MODE_OPTIONS = exports.REGION_OPTION = exports.PROTOCOL_OPTIONS = exports.BACKEND_CHOICES = exports.SUPPORTED_PACKAGES = exports.TS_COMPILER_INSTRUCTIONS = exports.COMPILER_OPTIONS = exports.COMPILER_OPTION_ANSWERS = exports.IOS_CONFIG = exports.ANDROID_CONFIG = exports.CONFIG_HELPER_SUCCESS_MESSAGE = exports.CONFIG_HELPER_INTRO = exports.EXCLUSIVE_SERVICES = exports.CLI_EPILOGUE = void 0;
const utils_1 = require("./utils");
const pkg = require('../package.json');
exports.CLI_EPILOGUE = `Documentation: https://webdriver.io\n@wdio/cli (v${pkg.version})`;
exports.EXCLUSIVE_SERVICES = {
    'wdio-chromedriver-service': {
        services: ['@wdio/selenium-standalone-service'],
        message: '@wdio/selenium-standalone-service already includes chromedriver'
    }
};
exports.CONFIG_HELPER_INTRO = `
=========================
WDIO Configuration Helper
=========================
`;
exports.CONFIG_HELPER_SUCCESS_MESSAGE = `
Configuration file was created successfully!
To run your tests, execute:
$ npx wdio run wdio.conf.js
`;
exports.ANDROID_CONFIG = {
    platformName: 'Android',
    automationName: 'UiAutomator2',
    deviceName: 'Test'
};
exports.IOS_CONFIG = {
    platformName: 'iOS',
    automationName: 'XCUITest',
    deviceName: 'iPhone Simulator'
};
exports.COMPILER_OPTION_ANSWERS = [
    'Babel (https://babeljs.io/)',
    'TypeScript (https://www.typescriptlang.org/)',
    'No!'
];
exports.COMPILER_OPTIONS = {
    babel: exports.COMPILER_OPTION_ANSWERS[0],
    ts: exports.COMPILER_OPTION_ANSWERS[1],
    nil: exports.COMPILER_OPTION_ANSWERS[2]
};
exports.TS_COMPILER_INSTRUCTIONS = `To have TypeScript support please add the following packages to your "types" list:
{
  "compilerOptions": {
    "types": ["node", %s]
  }
}

For for information on TypeScript integration check out: https://webdriver.io/docs/typescript
`;
exports.SUPPORTED_PACKAGES = {
    runner: [
        { name: 'local', value: '@wdio/local-runner$--$local' }
    ],
    framework: [
        { name: 'mocha', value: '@wdio/mocha-framework$--$mocha' },
        { name: 'jasmine', value: '@wdio/jasmine-framework$--$jasmine' },
        { name: 'cucumber', value: '@wdio/cucumber-framework$--$cucumber' }
    ],
    reporter: [
        { name: 'spec', value: '@wdio/spec-reporter$--$spec' },
        { name: 'dot', value: '@wdio/dot-reporter$--$dot' },
        { name: 'junit', value: '@wdio/junit-reporter$--$junit' },
        { name: 'allure', value: '@wdio/allure-reporter$--$allure' },
        { name: 'sumologic', value: '@wdio/sumologic-reporter$--$sumologic' },
        { name: 'concise', value: '@wdio/concise-reporter$--$concise' },
        { name: 'reportportal', value: 'wdio-reportportal-reporter$--$reportportal' },
        { name: 'video', value: 'wdio-video-reporter$--$video' },
        { name: 'json', value: 'wdio-json-reporter$--$json' },
        { name: 'cucumber', value: 'wdio-cucumber-reporter$--$cucumber' },
        { name: 'mochawesome', value: 'wdio-mochawesome-reporter$--$mochawesome' },
        { name: 'timeline', value: 'wdio-timeline-reporter$--$timeline' },
        { name: 'html', value: '@rpii/wdio-html-reporter$--$html' },
        { name: 'markdown', value: 'carmenmitru/wdio-markdown-reporter' },
        { name: 'delta', value: '@delta-reporter/wdio-delta-reporter-service' }
    ],
    service: [
        { name: 'chromedriver', value: 'wdio-chromedriver-service$--$chromedriver' },
        { name: 'sauce', value: '@wdio/sauce-service$--$sauce' },
        { name: 'testingbot', value: '@wdio/testingbot-service$--$testingbot' },
        { name: 'selenium-standalone', value: '@wdio/selenium-standalone-service$--$selenium-standalone' },
        { name: 'devtools', value: '@wdio/devtools-service$--$devtools' },
        { name: 'applitools', value: '@wdio/applitools-service$--$applitools' },
        { name: 'browserstack', value: '@wdio/browserstack-service$--$browserstack' },
        { name: 'appium', value: '@wdio/appium-service$--$appium' },
        { name: 'firefox-profile', value: '@wdio/firefox-profile-service$--$firefox-profile' },
        { name: 'crossbrowsertesting', value: '@wdio/crossbrowsertesting-service$--$crossbrowsertesting' },
        { name: 'lambdatest', value: 'wdio-lambdatest-service$--$lambdatest' },
        { name: 'zafira-listener', value: 'wdio-zafira-listener-service$--$zafira-listener' },
        { name: 'reportportal', value: 'wdio-reportportal-service$--$reportportal' },
        { name: 'docker', value: 'wdio-docker-service$--$docker' },
        { name: 'wdio-ui5', value: 'wdio-ui5-service$--$wdio-ui5' },
        { name: 'wiremock', value: 'wdio-wiremock-service$--$wiremock' },
        { name: 'ng-apimock', value: 'wdio-ng-apimock-service$--ng-apimock' },
        { name: 'slack', value: 'wdio-slack-service$--$slack' },
        { name: 'intercept', value: 'wdio-intercept-service$--$intercept' },
        { name: 'docker', value: 'wdio-docker-service$--$docker' },
        { name: 'visual-regression-testing', value: 'wdio-image-comparison-service$--$visual-regression-testing' },
        { name: 'novus-visual-regression', value: 'wdio-novus-visual-regression-service$--$novus-visual-regression' },
        { name: 'rerun', value: 'wdio-rerun-service$--$rerun' },
        { name: 'winappdriver', value: 'wdio-winappdriver-service$--$winappdriver' },
        { name: 'ywinappdriver', value: 'wdio-ywinappdriver-service$--$ywinappdriver' },
        { name: 'performancetotal', value: 'wdio-performancetotal-service$--$performancetotal' },
        { name: 'aws-device-farm', value: 'wdio-aws-device-farm-service$--$aws-device-farm' }
    ]
};
exports.BACKEND_CHOICES = [
    'On my local machine',
    'In the cloud using Experitest',
    'In the cloud using Sauce Labs',
    'In the cloud using Browserstack or Testingbot or LambdaTest or a different service',
    'I have my own Selenium cloud'
];
exports.PROTOCOL_OPTIONS = [
    'https',
    'http'
];
exports.REGION_OPTION = [
    'us',
    'eu'
];
exports.MODE_OPTIONS = [
    'sync',
    'async'
];
exports.QUESTIONNAIRE = [{
        type: 'list',
        name: 'runner',
        message: 'Where should your tests be launched?',
        choices: exports.SUPPORTED_PACKAGES.runner,
        when: () => exports.SUPPORTED_PACKAGES.runner.length > 1
    }, {
        type: 'list',
        name: 'backend',
        message: 'Where is your automation backend located?',
        choices: exports.BACKEND_CHOICES
    }, {
        type: 'input',
        name: 'hostname',
        message: 'What is the host address of that cloud service?',
        when: (answers) => answers.backend.indexOf('different service') > -1
    }, {
        type: 'input',
        name: 'port',
        message: 'What is the port on which that service is running?',
        default: '80',
        when: (answers) => answers.backend.indexOf('different service') > -1
    }, {
        type: 'input',
        name: 'expEnvAccessKey',
        message: 'Access key from Experitest Cloud',
        default: 'EXPERITEST_ACCESS_KEY',
        when: (answers) => answers.backend === 'In the cloud using Experitest'
    }, {
        type: 'input',
        name: 'expEnvHostname',
        message: 'Environment variable for cloud url',
        default: 'example.experitest.com',
        when: (answers) => answers.backend === 'In the cloud using Experitest'
    }, {
        type: 'input',
        name: 'expEnvPort',
        message: 'Environment variable for port',
        default: '443',
        when: (answers) => answers.backend === 'In the cloud using Experitest'
    }, {
        type: 'list',
        name: 'expEnvProtocol',
        message: 'Choose a protocol for environment variable',
        default: 'https',
        choices: exports.PROTOCOL_OPTIONS,
        when: (answers) => {
            return answers.backend === 'In the cloud using Experitest' && answers.expEnvPort !== '80' && answers.expEnvPort !== '443';
        }
    }, {
        type: 'input',
        name: 'env_user',
        message: 'Environment variable for username',
        default: 'LT_USERNAME',
        when: (answers) => (answers.backend.indexOf('LambdaTest') > -1 &&
            answers.hostname.indexOf('lambdatest.com') > -1)
    }, {
        type: 'input',
        name: 'env_key',
        message: 'Environment variable for access key',
        default: 'LT_ACCESS_KEY',
        when: (answers) => (answers.backend.indexOf('LambdaTest') > -1 &&
            answers.hostname.indexOf('lambdatest.com') > -1)
    }, {
        type: 'input',
        name: 'env_user',
        message: 'Environment variable for username',
        default: 'BROWSERSTACK_USER',
        when: (answers) => answers.backend.startsWith('In the cloud using Browserstack')
    }, {
        type: 'input',
        name: 'env_key',
        message: 'Environment variable for access key',
        default: 'BROWSERSTACK_ACCESSKEY',
        when: (answers) => answers.backend.startsWith('In the cloud using Browserstack')
    }, {
        type: 'input',
        name: 'env_user',
        message: 'Environment variable for username',
        default: 'SAUCE_USERNAME',
        when: (answers) => answers.backend === 'In the cloud using Sauce Labs'
    }, {
        type: 'input',
        name: 'env_key',
        message: 'Environment variable for access key',
        default: 'SAUCE_ACCESS_KEY',
        when: (answers) => answers.backend === 'In the cloud using Sauce Labs'
    }, {
        type: 'confirm',
        name: 'headless',
        message: 'Do you want to run your test on Sauce Headless? (https://saucelabs.com/products/web-testing/sauce-headless)',
        default: false,
        when: (answers) => answers.backend === 'In the cloud using Sauce Labs'
    }, {
        type: 'list',
        name: 'region',
        message: 'In which region do you want to run your Sauce Labs tests in?',
        choices: exports.REGION_OPTION,
        when: (answers) => !answers.headless && answers.backend === 'In the cloud using Sauce Labs'
    }, {
        type: 'input',
        name: 'hostname',
        message: 'What is the IP or URI to your Selenium standalone or grid server?',
        default: 'localhost',
        when: (answers) => answers.backend.indexOf('own Selenium cloud') > -1
    }, {
        type: 'input',
        name: 'port',
        message: 'What is the port which your Selenium standalone or grid server is running on?',
        default: '4444',
        when: (answers) => answers.backend.indexOf('own Selenium cloud') > -1
    }, {
        type: 'input',
        name: 'path',
        message: 'What is the path to your browser driver or grid server?',
        default: '/',
        when: (answers) => answers.backend.indexOf('own Selenium cloud') > -1
    }, {
        type: 'list',
        name: 'framework',
        message: 'Which framework do you want to use?',
        choices: exports.SUPPORTED_PACKAGES.framework,
    }, {
        type: 'list',
        name: 'executionMode',
        message: 'Do you want to run WebdriverIO commands synchronous or asynchronous?',
        choices: exports.MODE_OPTIONS
    }, {
        type: 'input',
        name: 'specs',
        message: 'Where are your test specs located?',
        default: './test/specs/**/*.js',
        when: (answers) => answers.framework.match(/(mocha|jasmine)/)
    }, {
        type: 'input',
        name: 'specs',
        message: 'Where are your feature files located?',
        default: './features/**/*.feature',
        when: (answers) => answers.framework.includes('cucumber')
    }, {
        type: 'input',
        name: 'stepDefinitions',
        message: 'Where are your step definitions located?',
        default: './features/step-definitions/steps.js',
        when: (answers) => answers.framework.includes('cucumber')
    }, {
        type: 'confirm',
        name: 'generateTestFiles',
        message: 'Do you want WebdriverIO to autogenerate some test files?',
        default: true
    }, {
        type: 'confirm',
        name: 'usePageObjects',
        message: 'Do you want to use page objects (https://martinfowler.com/bliki/PageObject.html)?',
        default: true,
        when: (answers) => answers.generateTestFiles
    }, {
        type: 'input',
        name: 'pages',
        message: 'Where are your page objects located?',
        default: (answers) => (answers.framework.match(/(mocha|jasmine)/)
            ? './test/pageobjects/**/*.js'
            : './features/pageobjects/**/*.js'),
        when: (answers) => answers.generateTestFiles && answers.usePageObjects
    }, {
        type: 'list',
        name: 'isUsingCompiler',
        message: 'Are you using a compiler?',
        choices: exports.COMPILER_OPTION_ANSWERS,
        default: () => utils_1.hasFile('babel.config.js')
            ? exports.COMPILER_OPTIONS.babel
            : utils_1.hasFile('tsconfig.json')
                ? exports.COMPILER_OPTIONS.ts
                : exports.COMPILER_OPTIONS.nil
    }, {
        type: 'checkbox',
        name: 'reporters',
        message: 'Which reporter do you want to use?',
        choices: exports.SUPPORTED_PACKAGES.reporter,
        default: [exports.SUPPORTED_PACKAGES.reporter.find(({ name }) => name === 'spec').value
        ]
    }, {
        type: 'checkbox',
        name: 'services',
        message: 'Do you want to add a service to your test setup?',
        choices: exports.SUPPORTED_PACKAGES.service,
        default: [exports.SUPPORTED_PACKAGES.service.find(({ name }) => name === 'chromedriver').value
        ],
        validate: (answers) => utils_1.validateServiceAnswers(answers)
    }, {
        type: 'input',
        name: 'outputDir',
        message: 'In which directory should the xunit reports get stored?',
        default: './',
        when: (answers) => answers.reporters.includes('junit')
    }, {
        type: 'input',
        name: 'outputDir',
        message: 'In which directory should the json reports get stored?',
        default: './',
        when: (answers) => answers.reporters.includes('json')
    }, {
        type: 'input',
        name: 'outputDir',
        message: 'In which directory should the mochawesome json reports get stored?',
        default: './',
        when: (answers) => answers.reporters.includes('mochawesome')
    }, {
        type: 'input',
        name: 'baseUrl',
        message: 'What is the base url?',
        default: 'http://localhost'
    }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBeUQ7QUFFekQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFFekIsUUFBQSxZQUFZLEdBQUcsb0RBQW9ELEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQTtBQUVqRixRQUFBLGtCQUFrQixHQUFHO0lBQzlCLDJCQUEyQixFQUFFO1FBQ3pCLFFBQVEsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1FBQy9DLE9BQU8sRUFBRSxpRUFBaUU7S0FDN0U7Q0FDSixDQUFBO0FBRVksUUFBQSxtQkFBbUIsR0FBRzs7OztDQUlsQyxDQUFBO0FBRVksUUFBQSw2QkFBNkIsR0FBRzs7OztDQUk1QyxDQUFBO0FBRVksUUFBQSxjQUFjLEdBQUc7SUFDMUIsWUFBWSxFQUFFLFNBQVM7SUFDdkIsY0FBYyxFQUFFLGNBQWM7SUFDOUIsVUFBVSxFQUFFLE1BQU07Q0FDckIsQ0FBQTtBQUVZLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLFlBQVksRUFBRSxLQUFLO0lBQ25CLGNBQWMsRUFBRSxVQUFVO0lBQzFCLFVBQVUsRUFBRSxrQkFBa0I7Q0FDakMsQ0FBQTtBQUVZLFFBQUEsdUJBQXVCLEdBQUc7SUFDbkMsNkJBQTZCO0lBQzdCLDhDQUE4QztJQUM5QyxLQUFLO0NBQ0MsQ0FBQTtBQUVHLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIsS0FBSyxFQUFFLCtCQUF1QixDQUFDLENBQUMsQ0FBQztJQUNqQyxFQUFFLEVBQUUsK0JBQXVCLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEdBQUcsRUFBRSwrQkFBdUIsQ0FBQyxDQUFDLENBQUM7Q0FDekIsQ0FBQTtBQUVHLFFBQUEsd0JBQXdCLEdBQUc7Ozs7Ozs7O0NBUXZDLENBQUE7QUFNWSxRQUFBLGtCQUFrQixHQUFHO0lBQzlCLE1BQU0sRUFBRTtRQUNKLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsNkJBQTZCLEVBQUU7S0FDMUQ7SUFDRCxTQUFTLEVBQUU7UUFDUCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGdDQUFnQyxFQUFFO1FBQzFELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsb0NBQW9DLEVBQUU7UUFDaEUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxzQ0FBc0MsRUFBRTtLQUN0RTtJQUNELFFBQVEsRUFBRTtRQUNOLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsNkJBQTZCLEVBQUU7UUFDdEQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTtRQUNuRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLCtCQUErQixFQUFFO1FBQ3pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsaUNBQWlDLEVBQUU7UUFDNUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSx1Q0FBdUMsRUFBRTtRQUNyRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLG1DQUFtQyxFQUFFO1FBRS9ELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsNENBQTRDLEVBQUU7UUFDN0UsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSw4QkFBOEIsRUFBRTtRQUN4RCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFO1FBQ3JELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsb0NBQW9DLEVBQUU7UUFDakUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSwwQ0FBMEMsRUFBRTtRQUMxRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLG9DQUFvQyxFQUFFO1FBQ2pFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsa0NBQWtDLEVBQUU7UUFDM0QsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxvQ0FBb0MsRUFBRTtRQUNqRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLDZDQUE2QyxFQUFFO0tBQzFFO0lBQ0QsT0FBTyxFQUFFO1FBR0wsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSwyQ0FBMkMsRUFBRTtRQUU1RSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLDhCQUE4QixFQUFFO1FBQ3hELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsd0NBQXdDLEVBQUU7UUFDdkUsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLDBEQUEwRCxFQUFFO1FBQ2xHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsb0NBQW9DLEVBQUU7UUFDakUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSx3Q0FBd0MsRUFBRTtRQUN2RSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLDRDQUE0QyxFQUFFO1FBQzdFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsZ0NBQWdDLEVBQUU7UUFDM0QsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGtEQUFrRCxFQUFFO1FBQ3RGLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSwwREFBMEQsRUFBRTtRQUVsRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLHVDQUF1QyxFQUFFO1FBQ3RFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxpREFBaUQsRUFBRTtRQUNyRixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLDJDQUEyQyxFQUFFO1FBQzVFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUU7UUFDMUQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSw4QkFBOEIsRUFBRTtRQUMzRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLG1DQUFtQyxFQUFFO1FBQ2hFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsc0NBQXNDLEVBQUU7UUFDckUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSw2QkFBNkIsRUFBRTtRQUN2RCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLHFDQUFxQyxFQUFFO1FBQ25FLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsK0JBQStCLEVBQUU7UUFDMUQsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxFQUFFLDREQUE0RCxFQUFFO1FBQzFHLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLEtBQUssRUFBRSxpRUFBaUUsRUFBRTtRQUM3RyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLDZCQUE2QixFQUFFO1FBQ3ZELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsMkNBQTJDLEVBQUU7UUFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSw2Q0FBNkMsRUFBRTtRQUMvRSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsbURBQW1ELEVBQUU7UUFDeEYsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGlEQUFpRCxFQUFFO0tBQ3hGO0NBQ0ssQ0FBQTtBQUVHLFFBQUEsZUFBZSxHQUFHO0lBQzNCLHFCQUFxQjtJQUNyQiwrQkFBK0I7SUFDL0IsK0JBQStCO0lBQy9CLG9GQUFvRjtJQUNwRiw4QkFBOEI7Q0FDeEIsQ0FBQTtBQUVHLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIsT0FBTztJQUNQLE1BQU07Q0FDQSxDQUFBO0FBRUcsUUFBQSxhQUFhLEdBQUc7SUFDekIsSUFBSTtJQUNKLElBQUk7Q0FDRSxDQUFBO0FBRUcsUUFBQSxZQUFZLEdBQUc7SUFDeEIsTUFBTTtJQUNOLE9BQU87Q0FDRCxDQUFBO0FBRUcsUUFBQSxhQUFhLEdBQUcsQ0FBQztRQUMxQixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLHNDQUFzQztRQUMvQyxPQUFPLEVBQUUsMEJBQWtCLENBQUMsTUFBTTtRQUVsQyxJQUFJLEVBQTZCLEdBQUcsRUFBRSxDQUFDLDBCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztLQUM5RSxFQUFFO1FBQ0MsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSwyQ0FBMkM7UUFDcEQsT0FBTyxFQUFFLHVCQUFlO0tBQzNCLEVBQUU7UUFDQyxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxpREFBaUQ7UUFDMUQsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkcsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsb0RBQW9EO1FBQzdELE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkcsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixPQUFPLEVBQUUsa0NBQWtDO1FBQzNDLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSywrQkFBK0I7S0FDekcsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSywrQkFBK0I7S0FDekcsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFlBQVk7UUFDbEIsT0FBTyxFQUFFLCtCQUErQjtRQUN4QyxPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBNkIsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssK0JBQStCO0tBQ3pHLEVBQUU7UUFDQyxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsT0FBTyxFQUFFLDRDQUE0QztRQUNyRCxPQUFPLEVBQUUsT0FBTztRQUNoQixPQUFPLEVBQUUsd0JBQWdCO1FBQ3pCLElBQUksRUFBNkIsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUM5QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssK0JBQStCLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUE7UUFDN0gsQ0FBQztLQUNKLEVBQUU7UUFDQyxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxtQ0FBbUM7UUFDNUMsT0FBTyxFQUFFLGFBQWE7UUFDdEIsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsQ0FDL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2xEO0tBQ0osRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUscUNBQXFDO1FBQzlDLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLElBQUksRUFBNkIsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLENBQy9DLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNsRDtLQUNKLEVBQUU7UUFDQyxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxtQ0FBbUM7UUFDNUMsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixJQUFJLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUNuSCxFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxxQ0FBcUM7UUFDOUMsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxJQUFJLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUNuSCxFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsbUNBQW1DO1FBQzVDLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSywrQkFBK0I7S0FDekcsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUscUNBQXFDO1FBQzlDLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSywrQkFBK0I7S0FDekcsRUFBRTtRQUNDLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLFVBQVU7UUFDaEIsT0FBTyxFQUFFLDZHQUE2RztRQUN0SCxPQUFPLEVBQUUsS0FBSztRQUNkLElBQUksRUFBNkIsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssK0JBQStCO0tBQ3pHLEVBQUU7UUFDQyxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLDhEQUE4RDtRQUN2RSxPQUFPLEVBQUUscUJBQWE7UUFDdEIsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssK0JBQStCO0tBQzlILEVBQUU7UUFDQyxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxtRUFBbUU7UUFDNUUsT0FBTyxFQUFFLFdBQVc7UUFDcEIsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEcsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsK0VBQStFO1FBQ3hGLE9BQU8sRUFBRSxNQUFNO1FBQ2YsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEcsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUseURBQXlEO1FBQ2xFLE9BQU8sRUFBRSxHQUFHO1FBQ1osSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEcsRUFBRTtRQUNDLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLHFDQUFxQztRQUM5QyxPQUFPLEVBQUUsMEJBQWtCLENBQUMsU0FBUztLQUN4QyxFQUFFO1FBQ0MsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsc0VBQXNFO1FBQy9FLE9BQU8sRUFBRSxvQkFBWTtLQUN4QixFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxvQ0FBb0M7UUFDN0MsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixJQUFJLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztLQUNoRyxFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSx1Q0FBdUM7UUFDaEQsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxJQUFJLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7S0FDNUYsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixPQUFPLEVBQUUsMENBQTBDO1FBQ25ELE9BQU8sRUFBRSxzQ0FBc0M7UUFDL0MsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0tBQzVGLEVBQUU7UUFDQyxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxtQkFBbUI7UUFDekIsT0FBTyxFQUFFLDBEQUEwRDtRQUNuRSxPQUFPLEVBQUUsSUFBSTtLQUNoQixFQUFFO1FBQ0MsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE9BQU8sRUFBRSxtRkFBbUY7UUFDNUYsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCO0tBQy9FLEVBQUU7UUFDQyxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLHNDQUFzQztRQUMvQyxPQUFPLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUNsRCxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUN0QyxDQUFDLENBQUMsNEJBQTRCO1lBQzlCLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FDekM7UUFDRCxJQUFJLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLGNBQWM7S0FDekcsRUFBRTtRQUNDLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixPQUFPLEVBQUUsMkJBQTJCO1FBQ3BDLE9BQU8sRUFBRSwrQkFBdUI7UUFDaEMsT0FBTyxFQUE2QixHQUFHLEVBQUUsQ0FBQyxlQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDaEUsQ0FBQyxDQUFDLHdCQUFnQixDQUFDLEtBQUs7WUFDeEIsQ0FBQyxDQUFDLGVBQU8sQ0FBQyxlQUFlLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyx3QkFBZ0IsQ0FBQyxFQUFFO2dCQUNyQixDQUFDLENBQUMsd0JBQWdCLENBQUMsR0FBRztLQUNqQyxFQUFFO1FBQ0MsSUFBSSxFQUFFLFVBQVU7UUFDaEIsSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLG9DQUFvQztRQUM3QyxPQUFPLEVBQUUsMEJBQWtCLENBQUMsUUFBUTtRQUVwQyxPQUFPLEVBQUUsQ0FBQywwQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUV0QyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxLQUFLO1NBQ3ZDO0tBQ0osRUFBRTtRQUNDLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSxrREFBa0Q7UUFDM0QsT0FBTyxFQUFFLDBCQUFrQixDQUFDLE9BQU87UUFFbkMsT0FBTyxFQUFFLENBQUMsMEJBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FFckMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLENBQUMsS0FBSztTQUMvQztRQUNELFFBQVEsRUFBNkIsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLDhCQUFzQixDQUFDLE9BQU8sQ0FBQztLQUN6RixFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUUseURBQXlEO1FBQ2xFLE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUE2QixDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0tBQ3pGLEVBQUU7UUFDQyxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU8sRUFBRSx3REFBd0Q7UUFDakUsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQTZCLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7S0FDeEYsRUFBRTtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLG9FQUFvRTtRQUM3RSxPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBNkIsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztLQUMvRixFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsT0FBTyxFQUFFLGtCQUFrQjtLQUM5QixDQUFDLENBQUEifQ==