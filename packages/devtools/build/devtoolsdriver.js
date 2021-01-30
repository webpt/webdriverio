"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("@wdio/logger"));
const elementstore_1 = __importDefault(require("./elementstore"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const log = logger_1.default('devtools');
class DevToolsDriver {
    constructor(browser, pages) {
        this.commands = {};
        this.elementStore = new elementstore_1.default();
        this.windows = new Map();
        this.timeouts = new Map();
        this.activeDialog = undefined;
        this.browser = browser;
        const dir = path_1.default.resolve(__dirname, 'commands');
        const files = fs_1.default.readdirSync(dir).filter((file) => (file.endsWith('.js') ||
            (file.endsWith('.ts') &&
                !file.endsWith('.d.ts'))));
        for (let filename of files) {
            const commandName = path_1.default.basename(filename, path_1.default.extname(filename));
            if (!commandName) {
                throw new Error('Couldn\'t determine command name');
            }
            this.commands[commandName] = DevToolsDriver.requireCommand(path_1.default.join(dir, commandName));
        }
        for (const page of pages) {
            const pageId = uuid_1.v4();
            this.windows.set(pageId, page);
            this.currentFrame = page;
            this.currentWindowHandle = pageId;
        }
        this.setTimeouts(constants_1.DEFAULT_IMPLICIT_TIMEOUT, constants_1.DEFAULT_PAGELOAD_TIMEOUT, constants_1.DEFAULT_SCRIPT_TIMEOUT);
        const page = this.getPageHandle();
        if (page) {
            page.on('dialog', this.dialogHandler.bind(this));
            page.on('framenavigated', this.framenavigatedHandler.bind(this));
        }
    }
    static requireCommand(filePath) {
        return require(filePath).default;
    }
    register(commandInfo) {
        const self = this;
        const { command, ref, parameters, variables = [] } = commandInfo;
        if (typeof this.commands[command] !== 'function') {
            return () => { throw new Error(`Command "${command}" is not yet implemented`); };
        }
        let retries = 0;
        const wrappedCommand = async function (...args) {
            await self.checkPendingNavigations();
            const params = utils_1.validate(command, parameters, variables, ref, args);
            let result;
            try {
                this.emit('command', { command, params, retries });
                result = await self.commands[command].call(self, params);
            }
            catch (err) {
                if (err.message.includes('most likely because of a navigation')) {
                    log.debug('Command failed due to unfinished page transition, retrying...');
                    const page = self.getPageHandle();
                    await new Promise((resolve, reject) => {
                        const pageloadTimeout = setTimeout(() => reject(new Error('page load timeout')), self.timeouts.get('pageLoad'));
                        page.once('load', () => {
                            clearTimeout(pageloadTimeout);
                            resolve();
                        });
                    });
                    ++retries;
                    return wrappedCommand.apply(this, args);
                }
                throw utils_1.sanitizeError(err);
            }
            this.emit('result', { command, params, retries, result: { value: result } });
            if (typeof result !== 'undefined') {
                const isScreenshot = (command.toLowerCase().includes('screenshot') &&
                    typeof result === 'string' &&
                    result.length > 64);
                log.info('RESULT', isScreenshot ? `${result.substr(0, 61)}...` : result);
            }
            return result;
        };
        return wrappedCommand;
    }
    dialogHandler(dialog) {
        this.activeDialog = dialog;
    }
    framenavigatedHandler(frame) {
        this.currentFrameUrl = frame.url();
        this.elementStore.clear();
    }
    setTimeouts(implicit, pageLoad, script) {
        if (typeof implicit === 'number') {
            this.timeouts.set('implicit', implicit);
        }
        if (typeof pageLoad === 'number') {
            this.timeouts.set('pageLoad', pageLoad);
        }
        if (typeof script === 'number') {
            this.timeouts.set('script', script);
        }
        const page = this.getPageHandle();
        const pageloadTimeout = this.timeouts.get('pageLoad');
        if (page && pageloadTimeout) {
            page.setDefaultTimeout(pageloadTimeout);
        }
    }
    getPageHandle(isInFrame = false) {
        if (isInFrame && this.currentFrame) {
            return this.currentFrame;
        }
        if (!this.currentWindowHandle) {
            throw new Error('no current window handle registered');
        }
        const pageHandle = this.windows.get(this.currentWindowHandle);
        if (!pageHandle) {
            throw new Error('Couldn\'t find page handle');
        }
        return pageHandle;
    }
    async checkPendingNavigations(pendingNavigationStart = Date.now()) {
        let page = this.getPageHandle();
        if (this.activeDialog || !page) {
            return;
        }
        if (!page.mainFrame) {
            const pages = await this.browser.pages();
            const mainFrame = pages.find((browserPage) => (browserPage.frames().find((frame) => page === frame)));
            if (mainFrame) {
                page = mainFrame;
            }
        }
        const pageloadTimeout = this.timeouts.get('pageLoad');
        const pageloadTimeoutReached = pageloadTimeout != null
            ? Date.now() - pendingNavigationStart > pageloadTimeout
            : false;
        try {
            const executionContext = await page.mainFrame().executionContext();
            await executionContext.evaluate('1');
            const readyState = await executionContext.evaluate('document.readyState');
            if (readyState === 'complete' || pageloadTimeoutReached) {
                return;
            }
        }
        catch (err) {
            if (pageloadTimeoutReached) {
                throw err;
            }
        }
        await new Promise(resolve => setTimeout(resolve, Math.min(100, typeof pageloadTimeout === 'number' ? pageloadTimeout / 10 : 100)));
        await this.checkPendingNavigations(pendingNavigationStart);
    }
}
exports.default = DevToolsDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2dG9vbHNkcml2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGV2dG9vbHNkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBQ3ZCLCtCQUFtQztBQUVuQywwREFBaUM7QUFNakMsa0VBQXlDO0FBQ3pDLG1DQUFpRDtBQUNqRCwyQ0FBd0c7QUFFeEcsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUU5QixNQUFxQixjQUFjO0lBWS9CLFlBQVksT0FBZ0IsRUFBRSxLQUFhO1FBWDNDLGFBQVEsR0FBNkIsRUFBRSxDQUFBO1FBQ3ZDLGlCQUFZLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUE7UUFDakMsWUFBTyxHQUFzQixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3RDLGFBQVEsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN6QyxpQkFBWSxHQUFZLFNBQVMsQ0FBQTtRQVE3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUV0QixNQUFNLEdBQUcsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUMvQyxNQUFNLEtBQUssR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FDcEMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDcEIsQ0FDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDcEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUMxQixDQUNKLENBQ0osQ0FBQTtRQUNELEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3hCLE1BQU0sV0FBVyxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGNBQUksQ0FBQyxP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