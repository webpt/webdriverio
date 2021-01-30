"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCapabilityFactory = exports.isEmuSim = exports.isUnifiedPlatform = void 0;
const utils_1 = require("@wdio/utils");
function isUnifiedPlatform(caps) {
    const { 'appium:deviceName': appiumDeviceName = '', deviceName = '', platformName = '' } = caps;
    const name = appiumDeviceName || deviceName;
    return !name.match(/(simulator)|(emulator)/gi) && !!platformName.match(/(ios)|(android)/gi);
}
exports.isUnifiedPlatform = isUnifiedPlatform;
function isEmuSim(caps) {
    const { 'appium:deviceName': appiumDeviceName = '', deviceName = '', platformName = '' } = caps;
    const name = appiumDeviceName || deviceName;
    return !!name.match(/(simulator)|(emulator)/gi) && !!platformName.match(/(ios)|(android)/gi);
}
exports.isEmuSim = isEmuSim;
function makeCapabilityFactory(tunnelIdentifier, options) {
    return (capability) => {
        const isLegacy = Boolean((capability.platform || capability.version) &&
            !utils_1.isW3C(capability) &&
            !capability['sauce:options']);
        if (!capability['sauce:options'] && !isLegacy && !isUnifiedPlatform(capability) && !isEmuSim(capability)) {
            capability['sauce:options'] = {};
        }
        Object.assign(capability, options);
        const sauceOptions = (!isLegacy && !isUnifiedPlatform(capability) && !isEmuSim(capability) ? capability['sauce:options'] : capability);
        sauceOptions.tunnelIdentifier = (capability.tunnelIdentifier ||
            sauceOptions.tunnelIdentifier ||
            tunnelIdentifier);
        if (!isLegacy && !isUnifiedPlatform(capability) && !isEmuSim(capability)) {
            delete capability.tunnelIdentifier;
        }
    };
}
exports.makeCapabilityFactory = makeCapabilityFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQW1DO0FBK0NuQyxTQUFnQixpQkFBaUIsQ0FBRSxJQUFzQztJQUNyRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEdBQUcsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQUUsWUFBWSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQTtJQUMvRixNQUFNLElBQUksR0FBRyxnQkFBZ0IsSUFBSSxVQUFVLENBQUE7SUFHM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQy9GLENBQUM7QUFORCw4Q0FNQztBQU9ELFNBQWdCLFFBQVEsQ0FBRSxJQUFzQztJQUM1RCxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEdBQUcsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQUUsWUFBWSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQTtJQUMvRixNQUFNLElBQUksR0FBRyxnQkFBZ0IsSUFBSSxVQUFVLENBQUE7SUFHM0MsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDaEcsQ0FBQztBQU5ELDRCQU1DO0FBT0QsU0FBZ0IscUJBQXFCLENBQUMsZ0JBQXdCLEVBQUUsT0FBWTtJQUN4RSxPQUFPLENBQUMsVUFBNEMsRUFBRSxFQUFFO1FBR3BELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FDcEIsQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDM0MsQ0FBQyxhQUFLLENBQUMsVUFBVSxDQUFDO1lBQ2xCLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUMvQixDQUFBO1FBR0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RHLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUE7U0FDbkM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUVsQyxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUF1QixDQUFBO1FBQzVKLFlBQVksQ0FBQyxnQkFBZ0IsR0FBRyxDQUM1QixVQUFVLENBQUMsZ0JBQWdCO1lBQzNCLFlBQVksQ0FBQyxnQkFBZ0I7WUFDN0IsZ0JBQWdCLENBQ25CLENBQUE7UUFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEUsT0FBTyxVQUFVLENBQUMsZ0JBQWdCLENBQUE7U0FDckM7SUFDTCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBNUJELHNEQTRCQyJ9