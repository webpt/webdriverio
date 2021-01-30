"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/modules/web.url");
const logger_1 = __importDefault(require("@wdio/logger"));
const network_1 = __importDefault(require("./handler/network"));
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const log = logger_1.default('@wdio/devtools-service:CommandHandler');
class CommandHandler {
    constructor(_session, _page, browser) {
        this._session = _session;
        this._page = _page;
        this._isTracing = false;
        this._session = _session;
        this._page = _page;
        this._networkHandler = new network_1.default(_session);
        const commands = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(fnName => fnName !== 'constructor' && !fnName.startsWith('_'));
        commands.forEach(fnName => browser.addCommand(fnName, this[fnName].bind(this)));
    }
    cdp(domain, command, args = {}) {
        log.info(`Send command "${domain}.${command}" with args: ${JSON.stringify(args)}`);
        return this._session.send(`${domain}.${command}`, args);
    }
    async getNodeId(selector) {
        const document = await this._session.send('DOM.getDocument');
        const { nodeId } = await this._session.send('DOM.querySelector', { nodeId: document.root.nodeId, selector });
        return nodeId;
    }
    async getNodeIds(selector) {
        const document = await this._session.send('DOM.getDocument');
        const { nodeIds } = await this._session.send('DOM.querySelectorAll', { nodeId: document.root.nodeId, selector });
        return nodeIds;
    }
    startTracing({ categories = constants_1.DEFAULT_TRACING_CATEGORIES, path, screenshots = true } = {}) {
        if (this._isTracing) {
            throw new Error('browser is already being traced');
        }
        this._isTracing = true;
        this._traceEvents = undefined;
        return this._page.tracing.start({ categories, path, screenshots });
    }
    async endTracing() {
        if (!this._isTracing) {
            throw new Error('No tracing was initiated, call `browser.startTracing()` first');
        }
        try {
            const traceBuffer = await this._page.tracing.stop();
            this._traceEvents = JSON.parse(traceBuffer.toString('utf8'));
            this._isTracing = false;
        }
        catch (err) {
            throw new Error(`Couldn't parse trace events: ${err.message}`);
        }
        return this._traceEvents;
    }
    getTraceLogs() {
        return this._traceEvents;
    }
    getPageWeight() {
        const requestTypes = Object.values(this._networkHandler.requestTypes).filter(Boolean);
        const pageWeight = utils_1.sumByKey(requestTypes, 'size');
        const transferred = utils_1.sumByKey(requestTypes, 'encoded');
        const requestCount = utils_1.sumByKey(requestTypes, 'count');
        return { pageWeight, transferred, requestCount, details: this._networkHandler.requestTypes };
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbWFuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBZ0M7QUFDaEMsMERBQWlDO0FBUWpDLGdFQUFrRTtBQUVsRSwyQ0FBd0Q7QUFDeEQsbUNBQWtDO0FBRWxDLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtBQUUzRCxNQUFxQixjQUFjO0lBSy9CLFlBQ1ksUUFBb0IsRUFDcEIsS0FBVyxFQUNuQixPQUF1RDtRQUYvQyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLFVBQUssR0FBTCxLQUFLLENBQU07UUFOZixlQUFVLEdBQUcsS0FBSyxDQUFBO1FBU3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBS25ELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUMzRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxhQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDbEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQ3pDLE1BQU0sRUFDTixJQUFJLENBQUMsTUFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbEQsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUtELEdBQUcsQ0FBRSxNQUFjLEVBQUUsT0FBZSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQzNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLE1B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