"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeleniumProtocol = exports.SauceLabsProtocol = exports.ChromiumProtocol = exports.AppiumProtocol = exports.JsonWProtocol = exports.MJsonWProtocol = exports.WebDriverProtocol = void 0;
const WebDriverProtocol = require('../protocols/webdriver.json');
exports.WebDriverProtocol = WebDriverProtocol;
const MJsonWProtocol = require('../protocols/mjsonwp.json');
exports.MJsonWProtocol = MJsonWProtocol;
const JsonWProtocol = require('../protocols/jsonwp.json');
exports.JsonWProtocol = JsonWProtocol;
const AppiumProtocol = require('../protocols/appium.json');
exports.AppiumProtocol = AppiumProtocol;
const ChromiumProtocol = require('../protocols/chromium.json');
exports.ChromiumProtocol = ChromiumProtocol;
const SauceLabsProtocol = require('../protocols/saucelabs.json');
exports.SauceLabsProtocol = SauceLabsProtocol;
const SeleniumProtocol = require('../protocols/selenium.json');
exports.SeleniumProtocol = SeleniumProtocol;
__exportStar(require("./types"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLE1BQU0saUJBQWlCLEdBQWEsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUEyQ3RFLDhDQUFpQjtBQTFDckIsTUFBTSxjQUFjLEdBQWEsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUE7QUEwQzlDLHdDQUFjO0FBekNyQyxNQUFNLGFBQWEsR0FBYSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtBQXlDNUIsc0NBQWE7QUF4Q3BELE1BQU0sY0FBYyxHQUFhLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0FBd0NkLHdDQUFjO0FBdkNwRSxNQUFNLGdCQUFnQixHQUFhLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0FBd0NwRSw0Q0FBZ0I7QUF2Q3BCLE1BQU0saUJBQWlCLEdBQWEsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUE7QUF1Q3BELDhDQUFpQjtBQXRDdkMsTUFBTSxnQkFBZ0IsR0FBYSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtBQXNDL0IsNENBQWdCO0FBSnpELDBDQUF1QiJ9