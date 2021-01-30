"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const saucelabs_1 = __importDefault(require("saucelabs"));
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("./utils");
const SC_RELAY_DEPCRECATION_WARNING = [
    'The "scRelay" option is depcrecated and will be removed',
    'with the upcoming versions of @wdio/sauce-service. Please',
    'remove the option as tests should work identically without it.'
].join(' ');
const MAX_SC_START_TRIALS = 3;
const log = logger_1.default('@wdio/sauce-service');
class SauceLauncher {
    constructor(_options, _capabilities, _config) {
        this._options = _options;
        this._capabilities = _capabilities;
        this._config = _config;
        this._api = new saucelabs_1.default(this._config);
    }
    async onPrepare(config, capabilities) {
        var _a;
        if (!this._options.sauceConnect) {
            return;
        }
        const sauceConnectTunnelIdentifier = (((_a = this._options.sauceConnectOpts) === null || _a === void 0 ? void 0 : _a.tunnelIdentifier) ||
            `SC-tunnel-${Math.random().toString().slice(2)}`);
        const sauceConnectOpts = {
            noAutodetect: true,
            tunnelIdentifier: sauceConnectTunnelIdentifier,
            ...this._options.sauceConnectOpts
        };
        let endpointConfigurations = {};
        if (this._options.scRelay) {
            log.warn(SC_RELAY_DEPCRECATION_WARNING);
            const scRelayPort = sauceConnectOpts.sePort || 4445;
            sauceConnectOpts.sePort = scRelayPort;
            endpointConfigurations = {
                protocol: 'http',
                hostname: 'localhost',
                port: scRelayPort
            };
        }
        const prepareCapability = utils_1.makeCapabilityFactory(sauceConnectTunnelIdentifier, endpointConfigurations);
        if (Array.isArray(capabilities)) {
            for (const capability of capabilities) {
                prepareCapability(capability);
            }
        }
        else {
            for (const browserName of Object.keys(capabilities)) {
                const caps = capabilities[browserName].capabilities;
                prepareCapability(caps.alwaysMatch || caps);
            }
        }
        const obs = new perf_hooks_1.PerformanceObserver((list) => {
            const entry = list.getEntries()[0];
            log.info(`Sauce Connect successfully started after ${entry.duration}ms`);
        });
        obs.observe({ entryTypes: ['measure'], buffered: false });
        perf_hooks_1.performance.mark('sauceConnectStart');
        this._sauceConnectProcess = await this.startTunnel(sauceConnectOpts);
        perf_hooks_1.performance.mark('sauceConnectEnd');
        perf_hooks_1.performance.measure('bootTime', 'sauceConnectStart', 'sauceConnectEnd');
    }
    async startTunnel(sauceConnectOpts, retryCount = 0) {
        try {
            const scProcess = await this._api.startSauceConnect(sauceConnectOpts);
            return scProcess;
        }
        catch (err) {
            ++retryCount;
            if (!err.message.includes('ENOENT') ||
                retryCount >= MAX_SC_START_TRIALS) {
                throw err;
            }
            log.debug(`Failed to start Sauce Connect Proxy due to ${err.stack}`);
            log.debug(`Retrying ${retryCount}/${MAX_SC_START_TRIALS}`);
            return this.startTunnel(sauceConnectOpts, retryCount);
        }
    }
    onComplete() {
        if (!this._sauceConnectProcess) {
            return;
        }
        return this._sauceConnectProcess.close();
    }
}
exports.default = SauceLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBNkQ7QUFDN0QsMERBQWtHO0FBRWxHLDBEQUFpQztBQUdqQyxtQ0FBK0M7QUFHL0MsTUFBTSw2QkFBNkIsR0FBRztJQUNsQyx5REFBeUQ7SUFDekQsMkRBQTJEO0lBQzNELGdFQUFnRTtDQUNuRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNYLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFBO0FBRTdCLE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUN6QyxNQUFxQixhQUFhO0lBSTlCLFlBQ1ksUUFBNEIsRUFDNUIsYUFBc0IsRUFDdEIsT0FBMkI7UUFGM0IsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQVM7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFFbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLE9BQXNDLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBS0QsS0FBSyxDQUFDLFNBQVMsQ0FDWCxNQUEwQixFQUMxQixZQUE2Qzs7UUFFN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQzdCLE9BQU07U0FDVDtRQUVELE1BQU0sNEJBQTRCLEdBQUcsQ0FDakMsT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQiwwQ0FBRSxnQkFBZ0I7WUFJaEQsYUFBYSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUVyRCxNQUFNLGdCQUFnQixHQUF3QjtZQUMxQyxZQUFZLEVBQUUsSUFBSTtZQUNsQixnQkFBZ0IsRUFBRSw0QkFBNEI7WUFDOUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQjtTQUNwQyxDQUFBO1FBRUQsSUFBSSxzQkFBc0IsR0FBRyxFQUFFLENBQUE7UUFDL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUE7WUFFdkMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQTtZQUNuRCxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFBO1lBQ3JDLHNCQUFzQixHQUFHO2dCQUNyQixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLElBQUksRUFBRSxXQUFXO2FBQ3BCLENBQUE7U0FDSjtRQUVELE1BQU0saUJBQWlCLEdBQUcsNkJBQXFCLENBQUMsNEJBQTRCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQTtRQUVyRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDN0IsS0FBSyxNQUFNLFVBQVUsSUFBSSxZQUFZLEVBQUU7Z0JBQ25DLGlCQUFpQixDQUFDLFVBQThDLENBQUMsQ0FBQTthQUNwRTtTQUNKO2FBQU07WUFDSCxLQUFLLE1BQU0sV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pELE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUE7Z0JBQ25ELGlCQUFpQixDQUFFLElBQXFDLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFBO2FBQ2hGO1NBQ0o7UUFLRCxNQUFNLEdBQUcsR0FBRyxJQUFJLGdDQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsNENBQTRDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFBO1FBQzVFLENBQUMsQ0FBQyxDQUFBO1FBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBRXpELHdCQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDckMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3BFLHdCQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDbkMsd0JBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFDM0UsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUUsZ0JBQXFDLEVBQUUsVUFBVSxHQUFHLENBQUM7UUFDcEUsSUFBSTtZQUNBLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ3JFLE9BQU8sU0FBUyxDQUFBO1NBQ25CO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixFQUFFLFVBQVUsQ0FBQTtZQUlaLElBS0ksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBSS9CLFVBQVUsSUFBSSxtQkFBbUIsRUFDbkM7Z0JBQ0UsTUFBTSxHQUFHLENBQUE7YUFDWjtZQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsOENBQThDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BFLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxVQUFVLElBQUksbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO1lBQzFELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQTtTQUN4RDtJQUNMLENBQUM7SUFLRCxVQUFVO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM1QixPQUFNO1NBQ1Q7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QyxDQUFDO0NBQ0o7QUFuSEQsZ0NBbUhDIn0=