"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorsFromEvent = exports.sanitizeCaps = exports.sanitizeString = void 0;
function sanitizeString(str) {
    if (!str) {
        return '';
    }
    return String(str)
        .replace(/^.*\/([^/]+)\/?$/, '$1')
        .replace(/\./g, '_')
        .replace(/\s/g, '')
        .toLowerCase();
}
exports.sanitizeString = sanitizeString;
function sanitizeCaps(caps) {
    if (!caps) {
        return '';
    }
    let result;
    if (caps.deviceName) {
        result = [
            sanitizeString(caps.deviceName),
            sanitizeString(caps.platformName),
            sanitizeString(caps.platformVersion),
            sanitizeString(caps.app)
        ];
    }
    else {
        result = [
            sanitizeString(caps.browserName),
            sanitizeString(caps.version || caps.browserVersion),
            sanitizeString(caps.platform || caps.platformName),
            sanitizeString(caps.app)
        ];
    }
    result = result.filter(n => n !== undefined && n !== '');
    return result.join('.');
}
exports.sanitizeCaps = sanitizeCaps;
function getErrorsFromEvent(e) {
    if (e.errors)
        return e.errors;
    if (e.error)
        return [e.error];
    return [];
}
exports.getErrorsFromEvent = getErrorsFromEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsU0FBZ0IsY0FBYyxDQUFFLEdBQVk7SUFDeEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNOLE9BQU8sRUFBRSxDQUFBO0tBQ1o7SUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDYixPQUFPLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO1NBQ2pDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQ25CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1NBQ2xCLFdBQVcsRUFBRSxDQUFBO0FBQ3RCLENBQUM7QUFWRCx3Q0FVQztBQU1ELFNBQWdCLFlBQVksQ0FBRSxJQUF1QztJQUNqRSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1AsT0FBTyxFQUFFLENBQUE7S0FDWjtJQUVELElBQUksTUFBTSxDQUFBO0lBS1YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2pCLE1BQU0sR0FBRztZQUNMLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9CLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQ3BDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQzNCLENBQUE7S0FDSjtTQUFNO1FBQ0gsTUFBTSxHQUFHO1lBQ0wsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDaEMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNuRCxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2xELGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQzNCLENBQUE7S0FDSjtJQUVELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDeEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLENBQUM7QUE1QkQsb0NBNEJDO0FBVUQsU0FBZ0Isa0JBQWtCLENBQUMsQ0FBZ0M7SUFDL0QsSUFBSSxDQUFDLENBQUMsTUFBTTtRQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUM3QixJQUFJLENBQUMsQ0FBQyxLQUFLO1FBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3QixPQUFPLEVBQUUsQ0FBQTtBQUNiLENBQUM7QUFKRCxnREFJQyJ9