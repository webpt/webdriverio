"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devtools_1 = __importDefault(require("../../utils/interception/devtools"));
const webdriver_1 = __importDefault(require("../../utils/interception/webdriver"));
const utils_1 = require("../../utils");
const SESSION_MOCKS = {};
async function mock(url, filterOptions) {
    const NetworkInterception = this.isSauce ? webdriver_1.default : devtools_1.default;
    if (!this.isSauce) {
        await this.getPuppeteer();
    }
    if (!this.puppeteer) {
        throw new Error('No Puppeteer connection could be established which is required to use this command');
    }
    const browser = utils_1.getBrowserObject(this);
    const handle = await browser.getWindowHandle();
    if (!SESSION_MOCKS[handle]) {
        SESSION_MOCKS[handle] = new Set();
    }
    if (SESSION_MOCKS[handle].size === 0 && !this.isSauce) {
        const pages = await this.puppeteer.pages();
        let page;
        for (let i = 0; i < pages.length && !page; i++) {
            const isHidden = await pages[i].evaluate(() => document.hidden);
            if (!isHidden) {
                page = pages[i];
            }
        }
        if (!page) {
            page = pages[0];
        }
        const client = await page.target().createCDPSession();
        await client.send('Fetch.enable', {
            patterns: [{ requestStage: 'Request' }, { requestStage: 'Response' }]
        });
        client.on('Fetch.requestPaused', NetworkInterception
            .handleRequestInterception(client, SESSION_MOCKS[handle]));
    }
    const networkInterception = new NetworkInterception(url, filterOptions, browser);
    SESSION_MOCKS[handle].add(networkInterception);
    if (this.isSauce) {
        await networkInterception.init();
    }
    return networkInterception;
}
exports.default = mock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxpRkFBMkU7QUFDM0UsbUZBQTZFO0FBQzdFLHVDQUE4QztBQUk5QyxNQUFNLGFBQWEsR0FBc0MsRUFBRSxDQUFBO0FBeUc1QyxLQUFLLFVBQVUsSUFBSSxDQUU5QixHQUFXLEVBQ1gsYUFBaUM7SUFFakMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBNEIsQ0FBQyxDQUFDLENBQUMsa0JBQTJCLENBQUE7SUFFckcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDZixNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtLQUM1QjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0ZBQW9GLENBQUMsQ0FBQTtLQUN4RztJQUVELE1BQU0sT0FBTyxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDeEIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7S0FDcEM7SUFLRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNuRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7UUFLMUMsSUFBSSxJQUFJLENBQUE7UUFDUixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQy9ELElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ1gsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNsQjtTQUNKO1FBS0QsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbEI7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBQ3JELE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDOUIsUUFBUSxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLENBQUM7U0FDeEUsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLEVBQUUsQ0FDTCxxQkFBcUIsRUFDcEIsbUJBQXFFO2FBQ2pFLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDaEUsQ0FBQTtLQUNKO0lBRUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDaEYsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUMsQ0FBQyxDQUFBO0lBRTlELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNkLE1BQU8sbUJBQW9ELENBQUMsSUFBSSxFQUFFLENBQUE7S0FDckU7SUFFRCxPQUFPLG1CQUEyQixDQUFBO0FBQ3RDLENBQUM7QUFoRUQsdUJBZ0VDIn0=