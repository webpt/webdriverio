"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const client_1 = require("./client");
class SharedStoreService {
    async beforeSession() {
        const port = await utils_1.readFile(utils_1.getPidPath(process.ppid));
        client_1.setPort(port.toString());
    }
    before(caps, specs, browser) {
        this._browser = browser;
        const sharedStore = Object.create({}, {
            get: {
                value: (key) => { var _a; return (_a = this._browser) === null || _a === void 0 ? void 0 : _a.call(() => client_1.getValue(key)); }
            },
            set: {
                value: (key, value) => { var _a; return (_a = this._browser) === null || _a === void 0 ? void 0 : _a.call(() => client_1.setValue(key, value)); }
            }
        });
        this._browser.sharedStore = sharedStore;
    }
}
exports.default = SharedStoreService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUNBQThDO0FBQzlDLHFDQUFzRDtBQVN0RCxNQUFxQixrQkFBa0I7SUFHbkMsS0FBSyxDQUFDLGFBQWE7UUFJZixNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFRLENBQUMsa0JBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUVyRCxnQkFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCxNQUFNLENBQ0YsSUFBYSxFQUNiLEtBQWMsRUFDZCxPQUF1QjtRQUV2QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtRQUN2QixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxHQUFHLEVBQUU7Z0JBQ0QsS0FBSyxFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUUsd0JBQUMsSUFBSSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLElBQUM7YUFDbkU7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsS0FBSyxFQUFFLENBQ0gsR0FBVyxFQUNYLEtBQXFDLEVBQ3ZDLEVBQUUsd0JBQUMsSUFBSSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFDO2FBQ3ZEO1NBQ0osQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0lBQzNDLENBQUM7Q0FDSjtBQWhDRCxxQ0FnQ0MifQ==