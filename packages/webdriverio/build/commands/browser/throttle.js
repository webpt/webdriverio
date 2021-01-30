"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const NETWORK_PRESETS = {
    'offline': {
        offline: true,
        downloadThroughput: 0,
        uploadThroughput: 0,
        latency: 1
    },
    'GPRS': {
        offline: false,
        downloadThroughput: 50 * 1024 / 8,
        uploadThroughput: 20 * 1024 / 8,
        latency: 500
    },
    'Regular2G': {
        offline: false,
        downloadThroughput: 250 * 1024 / 8,
        uploadThroughput: 50 * 1024 / 8,
        latency: 300
    },
    'Good2G': {
        offline: false,
        downloadThroughput: 450 * 1024 / 8,
        uploadThroughput: 150 * 1024 / 8,
        latency: 150
    },
    'Regular3G': {
        offline: false,
        downloadThroughput: 750 * 1024 / 8,
        uploadThroughput: 250 * 1024 / 8,
        latency: 100
    },
    'Good3G': {
        offline: false,
        downloadThroughput: 1.5 * 1024 * 1024 / 8,
        uploadThroughput: 750 * 1024 / 8,
        latency: 40
    },
    'Regular4G': {
        offline: false,
        downloadThroughput: 4 * 1024 * 1024 / 8,
        uploadThroughput: 3 * 1024 * 1024 / 8,
        latency: 20
    },
    'DSL': {
        offline: false,
        downloadThroughput: 2 * 1024 * 1024 / 8,
        uploadThroughput: 1 * 1024 * 1024 / 8,
        latency: 5
    },
    'WiFi': {
        offline: false,
        downloadThroughput: 30 * 1024 * 1024 / 8,
        uploadThroughput: 15 * 1024 * 1024 / 8,
        latency: 2
    },
    'online': {
        offline: false,
        latency: 0,
        downloadThroughput: -1,
        uploadThroughput: -1
    }
};
const NETWORK_PRESET_TYPES = Object.keys(NETWORK_PRESETS);
async function throttle(params) {
    if ((typeof params !== 'string' || !NETWORK_PRESET_TYPES.includes(params)) &&
        (typeof params !== 'object')) {
        throw new Error(`Invalid parameter for "throttle". Expected it to be typeof object or one of the following values: ${NETWORK_PRESET_TYPES.join(', ')} but found "${params}"`);
    }
    if (this.isSauce) {
        const browser = utils_1.getBrowserObject(this);
        await browser.throttleNetwork(params);
        return null;
    }
    await this.getPuppeteer();
    if (!this.puppeteer) {
        throw new Error('No Puppeteer connection could be established which is required to use this command');
    }
    const pages = await this.puppeteer.pages();
    const client = await pages[0].target().createCDPSession();
    await client.send('Network.emulateNetworkConditions', typeof params === 'string'
        ? NETWORK_PRESETS[params]
        : params);
    return null;
}
exports.default = throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvYnJvd3Nlci90aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTRDQSx1Q0FBOEM7QUFHOUMsTUFBTSxlQUFlLEdBQUc7SUFDcEIsU0FBUyxFQUFFO1FBQ1AsT0FBTyxFQUFFLElBQUk7UUFDYixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLGdCQUFnQixFQUFFLENBQUM7UUFDbkIsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE1BQU0sRUFBRTtRQUNKLE9BQU8sRUFBRSxLQUFLO1FBQ2Qsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ2pDLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUMvQixPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsT0FBTyxFQUFFLEtBQUs7UUFDZCxrQkFBa0IsRUFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDbEMsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDO1FBQy9CLE9BQU8sRUFBRSxHQUFHO0tBQ2Y7SUFDRCxRQUFRLEVBQUU7UUFDTixPQUFPLEVBQUUsS0FBSztRQUNkLGtCQUFrQixFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNsQyxnQkFBZ0IsRUFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDaEMsT0FBTyxFQUFFLEdBQUc7S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNULE9BQU8sRUFBRSxLQUFLO1FBQ2Qsa0JBQWtCLEVBQUUsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ2xDLGdCQUFnQixFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNoQyxPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ04sT0FBTyxFQUFFLEtBQUs7UUFDZCxrQkFB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