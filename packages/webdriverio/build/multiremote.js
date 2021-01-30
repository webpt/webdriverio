"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiRemoteDriver = void 0;
const lodash_zip_1 = __importDefault(require("lodash.zip"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const utils_1 = require("@wdio/utils");
const middlewares_1 = require("./middlewares");
const utils_2 = require("./utils");
class MultiRemote {
    constructor() {
        this.instances = {};
    }
    async addInstance(browserName, client) {
        this.instances[browserName] = await client;
        return this.instances[browserName];
    }
    modifier(wrapperClient) {
        const propertiesObject = {};
        propertiesObject.commandList = { value: wrapperClient.commandList };
        propertiesObject.options = { value: wrapperClient.options };
        for (const commandName of wrapperClient.commandList) {
            propertiesObject[commandName] = {
                value: this.commandWrapper(commandName),
                configurable: true
            };
        }
        propertiesObject['__propertiesObject__'] = {
            value: propertiesObject
        };
        this.baseInstance = new MultiRemoteDriver(this.instances, propertiesObject);
        const client = Object.create(this.baseInstance, propertiesObject);
        for (const [identifier, instance] of Object.entries(this.instances)) {
            client[identifier] = instance;
        }
        return client;
    }
    static elementWrapper(instances, result, propertiesObject) {
        const prototype = { ...propertiesObject, ...lodash_clonedeep_1.default(utils_2.getPrototype('element')), scope: { value: 'element' } };
        const element = utils_1.webdriverMonad({}, (client) => {
            for (const [i, identifier] of Object.entries(Object.keys(instances))) {
                client[identifier] = result[i];
            }
            client.instances = Object.keys(instances);
            delete client.sessionId;
            return client;
        }, prototype);
        return element(this.sessionId, middlewares_1.multiremoteHandler(utils_1.wrapCommand));
    }
    commandWrapper(commandName) {
        const instances = this.instances;
        return utils_1.wrapCommand(commandName, async function (...args) {
            const result = await Promise.all(Object.entries(instances).map(([, instance]) => instance[commandName](...args)));
            if (commandName === '$') {
                return MultiRemote.elementWrapper(instances, result, this.__propertiesObject__);
            }
            else if (commandName === '$$') {
                const zippedResult = lodash_zip_1.default(...result);
                return zippedResult.map((singleResult) => MultiRemote.elementWrapper(instances, singleResult, this.__propertiesObject__));
            }
            return result;
        });
    }
}
exports.default = MultiRemote;
class MultiRemoteDriver {
    constructor(instances, propertiesObject) {
        this.isMultiremote = true;
        this.instances = Object.keys(instances);
        this.__propertiesObject__ = propertiesObject;
    }
    on(eventName, emitter) {
        this.instances.forEach((instanceName) => this[instanceName].on(eventName, emitter));
        return undefined;
    }
    once(eventName, emitter) {
        this.instances.forEach((instanceName) => this[instanceName].once(eventName, emitter));
        return undefined;
    }
    emit(eventName, emitter) {
        return this.instances.map((instanceName) => this[instanceName].emit(eventName, emitter)).some(Boolean);
    }
    eventNames() {
        return this.instances.map((instanceName) => this[instanceName].eventNames());
    }
    getMaxListeners() {
        return this.instances.map((instanceName) => this[instanceName].getMaxListeners());
    }
    listenerCount(eventName) {
        return this.instances.map((instanceName) => this[instanceName].listenerCount(eventName));
    }
    listeners(eventName) {
        return this.instances.map((instanceName) => this[instanceName].listeners(eventName)).reduce((prev, cur) => {
            prev.concat(cur);
            return prev;
        }, []);
    }
    removeListener(eventName, emitter) {
        this.instances.forEach((instanceName) => this[instanceName].removeListener(eventName, emitter));
        return undefined;
    }
    removeAllListeners(eventName) {
        this.instances.forEach((instanceName) => this[instanceName].removeAllListeners(eventName));
        return undefined;
    }
}
exports.MultiRemoteDriver = MultiRemoteDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlyZW1vdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbXVsdGlyZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNERBQTRCO0FBQzVCLHdFQUFvQztBQUNwQyx1Q0FBeUQ7QUFJekQsK0NBQWtEO0FBQ2xELG1DQUFzQztBQVF0QyxNQUFxQixXQUFXO0lBQWhDO1FBQ0ksY0FBUyxHQUF3QyxFQUFFLENBQUE7SUEyR3ZELENBQUM7SUFwR0csS0FBSyxDQUFDLFdBQVcsQ0FBRSxXQUFtQixFQUFFLE1BQVc7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLE1BQTZCLENBQUE7UUFDakUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFLRCxRQUFRLENBQUUsYUFBZ0g7UUFDdEgsTUFBTSxnQkFBZ0IsR0FBdUMsRUFBRSxDQUFBO1FBQy9ELGdCQUFnQixDQUFDLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbkUsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUUzRCxLQUFLLE1BQU0sV0FBVyxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDakQsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztnQkFDdkMsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQTtTQUNKO1FBRUQsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsR0FBRztZQUN2QyxLQUFLLEVBQUUsZ0JBQWdCO1NBQzFCLENBQUE7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFB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