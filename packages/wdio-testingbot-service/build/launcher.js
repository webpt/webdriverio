"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const util_1 = require("util");
const testingbot_tunnel_launcher_1 = __importDefault(require("testingbot-tunnel-launcher"));
const logger_1 = __importDefault(require("@wdio/logger"));
const log = logger_1.default('@wdio/testingbot-service');
class TestingBotLauncher {
    constructor(options) {
        this.options = options;
    }
    async onPrepare(config, capabilities) {
        var _a;
        if (!this.options.tbTunnel || !config.user || !config.key) {
            return;
        }
        const tbTunnelIdentifier = ((_a = this.options.tbTunnelOpts) === null || _a === void 0 ? void 0 : _a.tunnelIdentifier) || `TB-tunnel-${Math.random().toString().slice(2)}`;
        this.tbTunnelOpts = Object.assign({
            apiKey: config.user,
            apiSecret: config.key,
            'tunnel-identifier': tbTunnelIdentifier,
        }, this.options.tbTunnelOpts);
        const capabilitiesEntries = Array.isArray(capabilities) ? capabilities : Object.values(capabilities);
        for (const capability of capabilitiesEntries) {
            const caps = capability.capabilities || capability;
            const c = caps.alwaysMatch || caps;
            if (!c['tb:options']) {
                c['tb:options'] = {};
            }
            c['tb:options']['tunnel-identifier'] = tbTunnelIdentifier;
        }
        const obs = new perf_hooks_1.PerformanceObserver((list) => {
            const entry = list.getEntries()[0];
            log.info(`TestingBot tunnel successfully started after ${entry.duration}ms`);
        });
        obs.observe({ entryTypes: ['measure'], buffered: false });
        perf_hooks_1.performance.mark('tbTunnelStart');
        this.tunnel = await util_1.promisify(testingbot_tunnel_launcher_1.default)(this.tbTunnelOpts);
        perf_hooks_1.performance.mark('tbTunnelEnd');
        perf_hooks_1.performance.measure('bootTime', 'tbTunnelStart', 'tbTunnelEnd');
    }
    onComplete() {
        if (!this.tunnel) {
            return;
        }
        return new Promise(resolve => this.tunnel.close(resolve));
    }
}
exports.default = TestingBotLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBNkQ7QUFDN0QsK0JBQWdDO0FBRWhDLDRGQUF5RDtBQUN6RCwwREFBaUM7QUFLakMsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0FBRTlDLE1BQXFCLGtCQUFrQjtJQUluQyxZQUFhLE9BQTBCO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFFLE1BQTBCLEVBQUUsWUFBNkM7O1FBQ3RGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ3ZELE9BQU07U0FDVDtRQUVELE1BQU0sa0JBQWtCLEdBQUcsT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksMENBQUUsZ0JBQWdCLEtBQUksYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFFMUgsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNuQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDckIsbUJBQW1CLEVBQUUsa0JBQWtCO1NBQzFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUU3QixNQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwRyxLQUFLLE1BQU0sVUFBVSxJQUFJLG1CQUFtQixFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFJLFVBQWdDLENBQUMsWUFBWSxJQUFJLFVBQVUsQ0FBQTtZQUN6RSxNQUFNLENBQUMsR0FBSSxJQUFxQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUE7WUFFcEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQTthQUN2QjtZQUVELENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLGtCQUFrQixDQUFBO1NBQzVEO1FBS0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxnQ0FBbUIsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQTtRQUNoRixDQUFDLENBQUMsQ0FBQTtRQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUV6RCx3QkFBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQyxvQ0FBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNsRSx3QkFBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUMvQix3QkFBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFNRCxVQUFVO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxPQUFNO1NBQ1Q7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0NBQ0o7QUEzREQscUNBMkRDIn0=