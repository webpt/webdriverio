"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const perf_hooks_1 = require("perf_hooks");
const cbt_tunnels_1 = __importDefault(require("cbt_tunnels"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/crossbrowsertesting-service');
class CrossBrowserTestingLauncher {
    constructor(_options, _caps, _config) {
        this._options = _options;
        this._caps = _caps;
        this._config = _config;
        this._isUsingTunnel = false;
        this._cbtTunnelOpts = Object.assign({
            username: this._config.user,
            authkey: this._config.key,
            nokill: true
        }, this._options.cbtTunnelOpts);
    }
    async onPrepare() {
        if (!this._options.cbtTunnel) {
            return;
        }
        const obs = new perf_hooks_1.PerformanceObserver((list) => {
            const entry = list.getEntries()[0];
            log.info(`CrossBrowserTesting tunnel successfully started after ${entry.duration}ms`);
        });
        obs.observe({ entryTypes: ['measure'], buffered: false });
        perf_hooks_1.performance.mark('tbTunnelStart');
        await util_1.promisify(cbt_tunnels_1.default.start)(this._cbtTunnelOpts);
        this._isUsingTunnel = true;
        perf_hooks_1.performance.mark('tbTunnelEnd');
        perf_hooks_1.performance.measure('bootTime', 'tbTunnelStart', 'tbTunnelEnd');
    }
    onComplete() {
        if (!this._isUsingTunnel) {
            return;
        }
        return new Promise((resolve, reject) => cbt_tunnels_1.default.stop((err) => {
            if (err) {
                return reject(err);
            }
            return resolve('stopped');
        }));
    }
}
exports.default = CrossBrowserTestingLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQkFBZ0M7QUFDaEMsMkNBQTZEO0FBRzdELDhEQUE2QjtBQUM3QiwwREFBaUM7QUFJakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBRXZELE1BQXFCLDJCQUEyQjtJQUk1QyxZQUNZLFFBQW1DLEVBQ25DLEtBQWdDLEVBQ2hDLE9BQTJCO1FBRjNCLGFBQVEsR0FBUixRQUFRLENBQTJCO1FBQ25DLFVBQUssR0FBTCxLQUFLLENBQTJCO1FBQ2hDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBTi9CLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBUXBDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7WUFDekIsTUFBTSxFQUFFLElBQUk7U0FDZixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQzFCLE9BQU07U0FDVDtRQUtELE1BQU0sR0FBRyxHQUFHLElBQUksZ0NBQW1CLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyx5REFBeUQsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUE7UUFDekYsQ0FBQyxDQUFDLENBQUE7UUFDRixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFFekQsd0JBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDakMsTUFBTSxnQkFBUyxDQUFDLHFCQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO1FBQzFCLHdCQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQy9CLHdCQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDbkUsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQztZQUNyQixPQUFNO1NBQ1Q7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMscUJBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRTtZQUM1RCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNyQjtZQUNELE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDUCxDQUFDO0NBQ0o7QUFqREQsOENBaURDIn0=