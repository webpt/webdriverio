"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@wdio/utils");
const WARN_ON_COMMANDS = ['addCommand', 'overwriteCommand'];
class ProtocolStub {
    static async newSession(options) {
        const capabilities = emulateSessionCapabilities((options.capabilities || {}));
        const browser = addCommands({
            capabilities,
            ...utils_1.capabilitiesEnvironmentDetector(capabilities, options._automationProtocol || 'webdriver')
        });
        return browser;
    }
    static reloadSession() {
        throw new Error('Protocol Stub: Make sure to start webdriver or devtools session before reloading it.');
    }
    static attachToSession(options, modifier) {
        if (options || !modifier) {
            return ProtocolStub.newSession(options);
        }
        return addCommands(modifier({
            commandList: []
        }));
    }
}
exports.default = ProtocolStub;
function addCommands(browser) {
    WARN_ON_COMMANDS.forEach((commandName) => {
        browser[commandName] = commandNotAvailable(commandName);
    });
    return browser;
}
function emulateSessionCapabilities(caps) {
    const capabilities = {};
    Object.entries(caps).forEach(([key, value]) => {
        const newKey = key.replace('appium:', '');
        capabilities[newKey] = value;
    });
    if (caps.browserName && caps.browserName.toLowerCase() === 'chrome') {
        capabilities.chrome = true;
    }
    return capabilities;
}
function commandNotAvailable(commandName) {
    return () => { throw new Error(`Unable to use '${commandName}' before browser session is started.`); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9jb2wtc3R1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm90b2NvbC1zdHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTZEO0FBTzdELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQU0zRCxNQUFxQixZQUFZO0lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFFLE9BQTBCO1FBQy9DLE1BQU0sWUFBWSxHQUFHLDBCQUEwQixDQUMzQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFnRCxDQUM5RSxDQUFBO1FBRUQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ3hCLFlBQVk7WUFDWixHQUFHLHVDQUErQixDQUFDLFlBQVksRUFBRyxPQUFlLENBQUMsbUJBQW1CLElBQUksV0FBVyxDQUFDO1NBQ3hHLENBQUMsQ0FBQTtRQUVGLE9BQU8sT0FBTyxDQUFBO0lBQ2xCLENBQUM7SUFNRCxNQUFNLENBQUMsYUFBYTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHNGQUFzRixDQUFDLENBQUE7SUFDM0csQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQ2xCLE9BQXNCLEVBQ3RCLFFBQWtDO1FBRWxDLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFjLENBQUMsQ0FBQTtTQUNqRDtRQUtELE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUN4QixXQUFXLEVBQUUsRUFBRTtTQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNQLENBQUM7Q0FDSjtBQXJDRCwrQkFxQ0M7QUFPRCxTQUFTLFdBQVcsQ0FBRSxPQUE0QjtJQUM5QyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNyQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDM0QsQ0FBQyxDQUFDLENBQUE7SUFDRixPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO0FBUUQsU0FBUywwQkFBMEIsQ0FBRSxJQUFzQztJQUN2RSxNQUFNLFlBQVksR0FBd0IsRUFBRSxDQUFBO0lBRzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUMxQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUN6QyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFBO0lBQ2hDLENBQUMsQ0FBQyxDQUFBO0lBR0YsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO1FBQ2pFLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0tBQzdCO0lBRUQsT0FBTyxZQUFZLENBQUE7QUFDdkIsQ0FBQztBQU1ELFNBQVMsbUJBQW1CLENBQUUsV0FBbUI7SUFDN0MsT0FBTyxHQUFHLEVBQUUsR0FBRyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixXQUFXLHNDQUFzQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7QUFDekcsQ0FBQyJ9