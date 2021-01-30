"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firefox_profile_1 = __importDefault(require("firefox-profile"));
const util_1 = require("util");
class FirefoxProfileLauncher {
    constructor(_options) {
        this._options = _options;
    }
    async onPrepare(config, capabilities) {
        if (Object.keys(this._options).length === 0) {
            return;
        }
        if (this._options.profileDirectory) {
            this._profile = await util_1.promisify(firefox_profile_1.default.copy)(this._options.profileDirectory);
        }
        else {
            this._profile = new firefox_profile_1.default();
        }
        if (!this._profile) {
            return;
        }
        this._setPreferences();
        if (!Array.isArray(this._options.extensions)) {
            return this._buildExtension(capabilities);
        }
        await util_1.promisify(this._profile.addExtensions.bind(this._profile))(this._options.extensions);
        return this._buildExtension(capabilities);
    }
    _setPreferences() {
        if (!this._profile) {
            return;
        }
        for (const [preference, value] of Object.entries(this._options)) {
            if (['extensions', 'proxy', 'legacy', 'profileDirectory'].includes(preference)) {
                continue;
            }
            this._profile.setPreference(preference, value);
        }
        if (this._options.proxy) {
            this._profile.setProxy(this._options.proxy);
        }
        this._profile.updatePreferences();
    }
    async _buildExtension(capabilities) {
        if (!this._profile) {
            return;
        }
        const zippedProfile = await util_1.promisify(this._profile.encoded.bind(this._profile))();
        if (Array.isArray(capabilities)) {
            capabilities
                .filter((capability) => capability.browserName === 'firefox')
                .forEach((capability) => {
                this._setProfile(capability, zippedProfile);
            });
            return;
        }
        for (const browser in capabilities) {
            const capability = capabilities[browser].capabilities;
            if (!capability || capability.browserName !== 'firefox') {
                continue;
            }
            this._setProfile(capability, zippedProfile);
        }
    }
    _setProfile(capability, zippedProfile) {
        if (this._options.legacy) {
            capability.firefox_profile = zippedProfile;
        }
        else {
            capability['moz:firefoxOptions'] = capability['moz:firefoxOptions'] || {};
            capability['moz:firefoxOptions'].profile = zippedProfile;
        }
    }
}
exports.default = FirefoxProfileLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzRUFBcUM7QUFDckMsK0JBQWdDO0FBS2hDLE1BQXFCLHNCQUFzQjtJQUV2QyxZQUFvQixRQUErQjtRQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtJQUFHLENBQUM7SUFFdkQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFhLEVBQUUsWUFBNkM7UUFJeEUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLE9BQU07U0FDVDtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQyx5QkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtTQUNoRjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHlCQUFPLEVBQUUsQ0FBQTtTQUNoQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE9BQU07U0FDVDtRQUdELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUV0QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUM1QztRQUdELE1BQU0sZ0JBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUMxRixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUtELGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixPQUFNO1NBQ1Q7UUFFRCxLQUFLLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1RSxTQUFRO2FBQ1g7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDakQ7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDOUM7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUE7SUFDckMsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsWUFBNkM7UUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsT0FBTTtTQUNUO1FBRUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxnQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFBO1FBRWxGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1QixZQUFtRDtpQkFDL0MsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQztpQkFDNUQsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFBO1lBQy9DLENBQUMsQ0FBQyxDQUFBO1lBRU4sT0FBTTtTQUNUO1FBRUQsS0FBSyxNQUFNLE9BQU8sSUFBSSxZQUFZLEVBQUU7WUFDaEMsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQWdELENBQUE7WUFFekYsSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtnQkFDckQsU0FBUTthQUNYO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUE7U0FDOUM7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLFVBQXFDLEVBQUUsYUFBcUI7UUFDcEUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUV0QixVQUFVLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQTtTQUM3QzthQUFNO1lBRUgsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3pFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUE7U0FDM0Q7SUFDTCxDQUFDO0NBQ0o7QUEvRkQseUNBK0ZDIn0=