"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limit = void 0;
const json_stringify_safe_1 = __importDefault(require("json-stringify-safe"));
const validator_1 = __importDefault(require("validator"));
const OBJLENGTH = 10;
const ARRLENGTH = 10;
const STRINGLIMIT = 1000;
const STRINGTRUNCATE = 200;
exports.limit = function (rawVal) {
    if (!rawVal)
        return rawVal;
    let val = JSON.parse(json_stringify_safe_1.default(rawVal));
    const type = Object.prototype.toString.call(val);
    if (type === '[object String]') {
        if (val.length > 100 && validator_1.default.isBase64(val)) {
            return `[base64] ${val.length} bytes`;
        }
        if (val.length > STRINGLIMIT) {
            return val.substr(0, STRINGTRUNCATE) + ` ... (${val.length - STRINGTRUNCATE} more bytes)`;
        }
        return val;
    }
    else if (type === '[object Array]') {
        const length = val.length;
        if (length > ARRLENGTH) {
            val = val.slice(0, ARRLENGTH);
            val.push(`(${length - ARRLENGTH} more items)`);
        }
        return val.map(exports.limit);
    }
    else if (type === '[object Object]') {
        const keys = Object.keys(val);
        const removed = [];
        for (let i = 0, l = keys.length; i < l; i++) {
            if (i < OBJLENGTH) {
                val[keys[i]] = exports.limit(val[keys[i]]);
            }
            else {
                delete val[keys[i]];
                removed.push(keys[i]);
            }
        }
        if (removed.length) {
            val._ = (keys.length - OBJLENGTH) + ' more keys: ' + JSON.stringify(removed);
        }
        return val;
    }
    return val;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOEVBQTJDO0FBQzNDLDBEQUFpQztBQUVqQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUE7QUFDcEIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFBO0FBQ3BCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQTtBQUN4QixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7QUFFYixRQUFBLEtBQUssR0FBRyxVQUFVLE1BQVk7SUFDdkMsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPLE1BQU0sQ0FBQTtJQUcxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLDZCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN2QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFaEQsSUFBSSxJQUFJLEtBQUssaUJBQWlCLEVBQUU7UUFDNUIsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QyxPQUFPLFlBQVksR0FBRyxDQUFDLE1BQU0sUUFBUSxDQUFBO1NBQ3hDO1FBRUQsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLFdBQVcsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLE1BQU0sR0FBRyxjQUFjLGNBQWMsQ0FBQTtTQUM1RjtRQUVELE9BQU8sR0FBRyxDQUFBO0tBQ2I7U0FBTSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtRQUNsQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO1FBQ3pCLElBQUksTUFBTSxHQUFHLFNBQVMsRUFBRTtZQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sR0FBRyxTQUFTLGNBQWMsQ0FBQyxDQUFBO1NBQ2pEO1FBQ0QsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQUssQ0FBQyxDQUFBO0tBQ3hCO1NBQU0sSUFBSSxJQUFJLEtBQUssaUJBQWlCLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM3QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsR0FBRyxTQUFTLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNyQztpQkFBTTtnQkFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUN4QjtTQUNKO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQy9FO1FBQ0QsT0FBTyxHQUFHLENBQUE7S0FDYjtJQUNELE9BQU8sR0FBRyxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=