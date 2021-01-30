"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStrategy = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_isplainobject_1 = __importDefault(require("lodash.isplainobject"));
const constants_1 = require("../constants");
const DEFAULT_STRATEGY = 'css selector';
const DIRECT_SELECTOR_REGEXP = /^(id|css selector|xpath|link text|partial link text|name|tag name|class name|-android uiautomator|-android datamatcher|-android viewmatcher|-android viewtag|-ios uiautomation|-ios predicate string|-ios class chain|accessibility id):(.+)/;
const XPATH_SELECTORS_START = [
    '/', '(', '../', './', '*/'
];
const NAME_MOBILE_SELECTORS_START = [
    'uia', 'xcuielementtype', 'android.widget', 'cyi'
];
const XPATH_SELECTOR_REGEXP = [
    /^([a-z0-9|-]*)/,
    /(?:(\.|#)(-?[_a-zA-Z]+[_a-zA-Z0-9-]*))?/,
    /(?:\[(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)(?:=(?:"|')([a-zA-z0-9\-_. ]+)(?:"|'))?\])?/,
    /(\*)?=(.+)$/,
];
const IMAGEPATH_MOBILE_SELECTORS_ENDSWITH = [
    '.jpg', '.jpeg', '.gif', '.png', '.bmp', '.svg'
];
const defineStrategy = function (selector) {
    if (lodash_isplainobject_1.default(selector)) {
        if (JSON.stringify(selector).indexOf('test.espresso.matcher.ViewMatchers') < 0)
            return '-android datamatcher';
        return '-android viewmatcher';
    }
    const stringSelector = selector;
    if (stringSelector.match(DIRECT_SELECTOR_REGEXP)) {
        return 'directly';
    }
    if (IMAGEPATH_MOBILE_SELECTORS_ENDSWITH.some(path => stringSelector.toLowerCase().endsWith(path))) {
        return '-image';
    }
    if (XPATH_SELECTORS_START.some(option => stringSelector.startsWith(option))) {
        return 'xpath';
    }
    if (stringSelector.startsWith('=')) {
        return 'link text';
    }
    if (stringSelector.startsWith('*=')) {
        return 'partial link text';
    }
    if (stringSelector.startsWith('id=')) {
        return 'id';
    }
    if (stringSelector.startsWith('android=')) {
        return '-android uiautomator';
    }
    if (stringSelector.startsWith('ios=')) {
        return '-ios uiautomation';
    }
    if (stringSelector.startsWith('~')) {
        return 'accessibility id';
    }
    if (NAME_MOBILE_SELECTORS_START.some(option => stringSelector.toLowerCase().startsWith(option))) {
        return 'class name';
    }
    if (stringSelector.search(/<[0-9a-zA-Z-]+( \/)*>/g) >= 0) {
        return 'tag name';
    }
    if (stringSelector.search(/^\[name=("|')([a-zA-z0-9\-_.@=[\] ']+)("|')]$/) >= 0) {
        return 'name';
    }
    if (selector === '..' || selector === '.') {
        return 'xpath';
    }
    if (stringSelector.match(new RegExp(XPATH_SELECTOR_REGEXP.map(rx => rx.source).join('')))) {
        return 'xpath extended';
    }
};
exports.findStrategy = function (selector, isW3C, isMobile) {
    const stringSelector = selector;
    let using = DEFAULT_STRATEGY;
    let value = selector;
    switch (defineStrategy(selector)) {
        case 'directly': {
            const match = stringSelector.match(DIRECT_SELECTOR_REGEXP);
            if (!match || !isMobile && isW3C && !constants_1.W3C_SELECTOR_STRATEGIES.includes(match[1])) {
                throw new Error('InvalidSelectorStrategy');
            }
            using = match[1];
            value = match[2];
            break;
        }
        case 'xpath': {
            using = 'xpath';
            break;
        }
        case 'id': {
            using = 'id';
            value = stringSelector.slice(3);
            break;
        }
        case 'link text': {
            using = 'link text';
            value = stringSelector.slice(1);
            break;
        }
        case 'partial link text': {
            using = 'partial link text';
            value = stringSelector.slice(2);
            break;
        }
        case '-android uiautomator': {
            using = '-android uiautomator';
            value = stringSelector.slice(8);
            break;
        }
        case '-android datamatcher': {
            using = '-android datamatcher';
            value = JSON.stringify(value);
            break;
        }
        case '-android viewmatcher': {
            using = '-android viewmatcher';
            value = JSON.stringify(value);
            break;
        }
        case '-ios uiautomation': {
            using = '-ios uiautomation';
            value = stringSelector.slice(4);
            break;
        }
        case 'accessibility id': {
            using = 'accessibility id';
            value = stringSelector.slice(1);
            break;
        }
        case 'class name': {
            using = 'class name';
            break;
        }
        case 'tag name': {
            using = 'tag name';
            value = stringSelector.replace(/<|>|\/|\s/g, '');
            break;
        }
        case 'name': {
            if (isMobile || !isW3C) {
                const match = stringSelector.match(/^\[name=("|')([a-zA-z0-9\-_.@=[\] ']+)("|')]$/);
                if (!match) {
                    throw new Error(`InvalidSelectorMatch. Strategy 'name' has failed to match '${stringSelector}'`);
                }
                using = 'name';
                value = match[2];
            }
            break;
        }
        case 'xpath extended': {
            using = 'xpath';
            const match = stringSelector.match(new RegExp(XPATH_SELECTOR_REGEXP.map(rx => rx.source).join('')));
            if (!match) {
                throw new Error(`InvalidSelectorMatch: Strategy 'xpath extended' has failed to match '${stringSelector}'`);
            }
            const PREFIX_NAME = { '.': 'class', '#': 'id' };
            const conditions = [];
            const [tag, prefix, name, attrName, attrValue, partial, query] = match.slice(1);
            if (prefix) {
                conditions.push(`contains(@${PREFIX_NAME[prefix]}, "${name}")`);
            }
            if (attrName) {
                conditions.push(attrValue
                    ? `contains(@${attrName}, "${attrValue}")`
                    : `@${attrName}`);
            }
            conditions.push(partial ? `contains(., "${query}")` : `normalize-space() = "${query}"`);
            value = `.//${tag || '*'}[${conditions.join(' and ')}]`;
            break;
        }
        case '-image': {
            using = '-image';
            value = fs_1.default.readFileSync(stringSelector, { encoding: 'base64' });
            break;
        }
    }
    if (!isMobile && isW3C && !constants_1.W3C_SELECTOR_STRATEGIES.includes(using)) {
        throw new Error('InvalidSelectorStrategy');
    }
    return { using, value };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2ZpbmRTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0ZBQWdEO0FBRWhELDRDQUFzRDtBQUV0RCxNQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQTtBQUN2QyxNQUFNLHNCQUFzQixHQUFHLDhPQUE4TyxDQUFBO0FBQzdRLE1BQU0scUJBQXFCLEdBQUc7SUFDMUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUk7Q0FDOUIsQ0FBQTtBQUNELE1BQU0sMkJBQTJCLEdBQUc7SUFDaEMsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLEtBQUs7Q0FDcEQsQ0FBQTtBQUNELE1BQU0scUJBQXFCLEdBQUc7SUFFMUIsZ0JBQWdCO0lBRWhCLHlDQUF5QztJQUV6Qyw4RUFBOEU7SUFFOUUsYUFBYTtDQUNoQixDQUFBO0FBQ0QsTUFBTSxtQ0FBbUMsR0FBRztJQUN4QyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07Q0FDbEQsQ0FBQTtBQUlELE1BQU0sY0FBYyxHQUFHLFVBQVUsUUFBMEI7SUFLdkQsSUFBSSw4QkFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsb0NBQW9DLENBQUMsR0FBRyxDQUFDO1lBQzFFLE9BQU8sc0JBQXNCLENBQUE7UUFDakMsT0FBTyxzQkFBc0IsQ0FBQTtLQUNoQztJQUVELE1BQU0sY0FBYyxHQUFHLFFBQWtCLENBQUE7SUFFekMsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDOUMsT0FBTyxVQUFVLENBQUE7S0FDcEI7SUFFRCxJQUFJLG1DQUFtQyxDQUFD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