"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiseWorkerService = exports.initialiseLauncherService = void 0;
const logger_1 = __importDefault(require("@wdio/logger"));
const initialisePlugin_1 = __importDefault(require("./initialisePlugin"));
const log = logger_1.default('@wdio/utils:initialiseServices');
function initialiseServices(services) {
    const initialisedServices = [];
    for (let [serviceName, serviceConfig = {}] of services) {
        if (typeof serviceName === 'object') {
            log.debug('initialise custom initiated service');
            initialisedServices.push([serviceName, {}]);
            continue;
        }
        if (typeof serviceName === 'function') {
            log.debug(`initialise custom service "${serviceName.name}"`);
            initialisedServices.push([serviceName, serviceConfig]);
            continue;
        }
        log.debug(`initialise service "${serviceName}" as NPM package`);
        const service = initialisePlugin_1.default(serviceName, 'service');
        initialisedServices.push([service, serviceConfig, serviceName]);
    }
    return initialisedServices;
}
function sanitizeServiceArray(service) {
    return Array.isArray(service) ? service : [service, {}];
}
function initialiseLauncherService(config, caps) {
    const ignoredWorkerServices = [];
    const launcherServices = [];
    try {
        const services = initialiseServices(config.services.map(sanitizeServiceArray));
        for (const [service, serviceConfig, serviceName] of services) {
            if (typeof service === 'object' && !serviceName) {
                launcherServices.push(service);
                continue;
            }
            const Launcher = service.launcher;
            if (typeof Launcher === 'function' && serviceName) {
                launcherServices.push(new Launcher(serviceConfig, caps, config));
            }
            if (typeof service === 'function' && !serviceName) {
                launcherServices.push(new service(serviceConfig, caps, config));
            }
            if (serviceName &&
                typeof service.default !== 'function' &&
                typeof service !== 'function') {
                ignoredWorkerServices.push(serviceName);
            }
        }
    }
    catch (err) {
        log.error(err);
    }
    return { ignoredWorkerServices, launcherServices };
}
exports.initialiseLauncherService = initialiseLauncherService;
function initialiseWorkerService(config, caps, ignoredWorkerServices = []) {
    const workerServices = config.services
        .map(sanitizeServiceArray)
        .filter(([serviceName]) => !ignoredWorkerServices.includes(serviceName));
    try {
        const services = initialiseServices(workerServices);
        return services.map(([service, serviceConfig, serviceName]) => {
            if (typeof service === 'object' && !serviceName) {
                return service;
            }
            const Service = service.default || service;
            if (typeof Service === 'function') {
                return new Service(serviceConfig, caps, config);
            }
        }).filter((service) => Boolean(service));
    }
    catch (err) {
        log.error(err);
        return [];
    }
}
exports.initialiseWorkerService = initialiseWorkerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbGlzZVNlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luaXRpYWxpc2VTZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwREFBaUM7QUFFakMsMEVBQWlEO0FBRWpELE1BQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtBQWlCcEQsU0FBUyxrQkFBa0IsQ0FBRSxRQUE4QjtJQUN2RCxNQUFNLG1CQUFtQixHQUF3QixFQUFFLENBQUE7SUFDbkQsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUU7UUFVcEQsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDakMsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO1lBQ2hELG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLFdBQXFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNyRSxTQUFRO1NBQ1g7UUFlRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUNuQyxHQUFHLENBQUMsS0FBSyxDQUFDLDhCQUE4QixXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUM1RCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFvQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUE7WUFDL0UsU0FBUTtTQUNYO1FBU0QsR0FBRyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsV0FBVyxrQkFBa0IsQ0FBQyxDQUFBO1FBQy9ELE1BQU0sT0FBTyxHQUFHLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUN4RCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFnQyxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFBO0tBQzNGO0lBRUQsT0FBTyxtQkFBbUIsQ0FBQTtBQUM5QixDQUFDO0FBU0QsU0FBUyxvQkFBb0IsQ0FBRSxPQUE4QjtJQUN6RCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDM0QsQ0FBQztBQVVELFNBQWdCLHlCQUF5QixDQUFFLE1BQStFLEVBQUUsSUFBc0M7SUFDOUosTUFBTSxxQkFBcUIsR0FBRyxFQUFFLENBQUE7SUFDaEMsTUFBTSxnQkFBZ0IsR0FBK0IsRUFBRSxDQUFBO0lBRXZELElBQUk7UUFDQSxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsUUFBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUE7UUFDL0UsS0FBSyxNQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsSUFBSSxRQUFRLEVBQUU7WUFJMUQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzdDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFpQixDQUFDLENBQUE7Z0JBQ3hDLFNBQVE7YUFDWDtZQUtELE1BQU0sUUFBUSxHQUFJLE9BQWtDLENBQUMsUUFBUSxDQUFBO1lBQzdELElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxJQUFJLFdBQVcsRUFBRTtnQkFDL0MsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTthQUNuRTtZQUtELElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMvQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO2FBQ2xFO1lBS0QsSUFDSSxXQUFXO2dCQUNYLE9BQVEsT0FBaUMsQ0FBQyxPQUFPLEtBQUssVUFBVTtnQkFDaEUsT0FBTyxPQUFPLEtBQUssVUFBVSxFQUMvQjtnQkFDRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7YUFDMUM7U0FDSjtLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFJVixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2pCO0lBRUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLENBQUE7QUFDdEQsQ0FBQztBQWpERCw4REFpREM7QUFVRCxTQUFnQix1QkFBdUIsQ0FDbkMsTUFBMEIsRUFDMUIsSUFBc0MsRUFDdEMsd0JBQWtDLEVBQUU7SUFFcEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVM7U0FDbEMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO1NBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLFdBQXFCLENBQUMsQ0FBQyxDQUFBO0lBRXRGLElBQUk7UUFDQSxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNuRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRTtZQUkxRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDN0MsT0FBTyxPQUFtQyxDQUFBO2FBQzdDO1lBRUQsTUFBTSxPQUFPLEdBQUksT0FBa0MsQ0FBQyxPQUFPLElBQUksT0FBZ0MsQ0FBQTtZQUMvRixJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO2FBQ2xEO1FBQ0wsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUNMLENBQUMsT0FBNkMsRUFBdUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDM0csQ0FBQTtLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFJVixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2QsT0FBTyxFQUFFLENBQUE7S0FDWjtBQUNMLENBQUM7QUFqQ0QsMERBaUNDIn0=