"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_1 = __importDefault(require("lighthouse/lighthouse-core/gather/driver"));
const page_functions_1 = __importDefault(require("lighthouse/lighthouse-core/lib/page-functions"));
const network_recorder_1 = __importDefault(require("lighthouse/lighthouse-core/lib/network-recorder"));
const gather_runner_1 = __importDefault(require("lighthouse/lighthouse-core/gather/gather-runner"));
const link_elements_1 = __importDefault(require("lighthouse/lighthouse-core/gather/gatherers/link-elements"));
const viewport_dimensions_1 = __importDefault(require("lighthouse/lighthouse-core/gather/gatherers/viewport-dimensions"));
const collectMetaElements_1 = __importDefault(require("../scripts/collectMetaElements"));
const constants_1 = require("../constants");
class PWAGatherer {
    constructor(_session, _page) {
        this._session = _session;
        this._page = _page;
        this._networkRecords = [];
        this._networkRecorder = new network_recorder_1.default();
        constants_1.NETWORK_RECORDER_EVENTS.forEach((method) => {
            this._session.on(method, (params) => this._networkRecorder.dispatch({ method, params }));
        });
        const connection = this._session;
        connection.sendCommand = (method, sessionId, ...paramAgrs) => this._session.send(method, ...paramAgrs);
        this._driver = new driver_1.default(connection);
        this._session['_connection']._transport._ws.addEventListener('message', (message) => this._driver._handleProtocolEvent(JSON.parse(message.data)));
        this._page.on('load', () => {
            this._networkRecords = this._networkRecorder.getRecords();
            delete this._networkRecorder;
            this._networkRecorder = new network_recorder_1.default();
        });
    }
    async gatherData() {
        var _a;
        const pageUrl = await ((_a = this._page) === null || _a === void 0 ? void 0 : _a.url());
        const passContext = {
            url: pageUrl,
            driver: this._driver
        };
        const loadData = {
            networkRecords: this._networkRecords
        };
        const linkElements = new link_elements_1.default();
        const viewportDimensions = new viewport_dimensions_1.default();
        const { versions } = await this._driver.getServiceWorkerVersions();
        const { registrations } = await this._driver.getServiceWorkerRegistrations();
        return {
            URL: { requestedUrl: pageUrl, finalUrl: pageUrl },
            WebAppManifest: await gather_runner_1.default.getWebAppManifest(passContext),
            InstallabilityErrors: await gather_runner_1.default.getInstallabilityErrors(passContext),
            MetaElements: await this._driver.evaluate(collectMetaElements_1.default, {
                args: [],
                useIsolation: true,
                deps: [page_functions_1.default.getElementsInDocument],
            }),
            ViewportDimensions: await viewportDimensions.afterPass(passContext),
            ServiceWorker: { versions, registrations },
            LinkElements: await linkElements.afterPass(passContext, loadData)
        };
    }
}
exports.default = PWAGatherer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dhdGhlcmVyL3B3YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNGQUE2RDtBQUM3RCxtR0FBeUU7QUFDekUsdUdBQTZFO0FBRTdFLG9HQUEwRTtBQUMxRSw4R0FBb0Y7QUFDcEYsMEhBQWdHO0FBS2hHLHlGQUFnRTtBQUNoRSw0Q0FBc0Q7QUFFdEQsTUFBcUIsV0FBVztJQUs1QixZQUNZLFFBQW9CLEVBQ3BCLEtBQVc7UUFEWCxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLFVBQUssR0FBTCxLQUFLLENBQU07UUFKZixvQkFBZSxHQUFVLEVBQUUsQ0FBQTtRQVMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSwwQkFBZSxFQUFFLENBQUE7UUFDN0MsbUNBQXVCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM1RixDQUFDLENBQUMsQ0FBQTtRQUtGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFlLENBQUE7UUFDdkMsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLE1BQVcsRUFBRSxTQUFnQixFQUFFLEdBQUcsU0FBZ0IsRUFBRSxFQUFFLENBQzVFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQWEsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRXJDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FDeEQsU0FBUyxFQUNULENBQUMsT0FBeUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUM3RixDQUFBO1FBS0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUN6RCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtZQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSwwQkFBZSxFQUFFLENBQUE7UUFDakQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7O1FBQ1osTUFBTSxPQUFPLEdBQUcsYUFBTSxJQUFJLENBQUMsS0FBSywwQ0FBRSxHQUFHLEdBQUUsQ0FBQTtRQUN2QyxNQUFNLFdBQVcsR0FBRztZQUNoQixHQUFHLEVBQUUsT0FBTztZQUNaLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN2QixDQUFBO1FBQ0QsTUFBTSxRQUFRLEdBQUc7WUFDYixjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDdkMsQ0FBQTtRQUVELE1BQU0sWUFBWSxHQUFHLElBQUksdUJBQVksRUFBRSxDQUFBO1FBQ3ZDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSw2QkFBa0IsRUFBRSxDQUFBO1FBQ25ELE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsQ0FBQTtRQUNsRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixFQUFFLENBQUE7UUFDNUUsT0FBTztZQUNILEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtZQUNqRCxjQUFjLEVBQUUsTUFBTSx1QkFBWSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztZQUNqRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUFZLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDO1lBQzdFLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLDZCQUFtQixFQUFFO2dCQUMzRCxJQUFJLEVBQUUsRUFBRTtnQkFDUixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsSUFBSSxFQUFFLENBQUMsd0JBQWEsQ0FBQyxxQkFBcUIsQ0FBQzthQUM5QyxDQUFDO1lBQ0Ysa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQ25FLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7WUFDMUMsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO1NBQ3BFLENBQUE7SUFDTCxDQUFDO0NBQ0o7QUFwRUQsOEJBb0VDIn0=