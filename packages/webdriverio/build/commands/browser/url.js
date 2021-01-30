"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function url(path) {
    if (typeof path !== 'string') {
        throw new Error('Parameter for "url" command needs to be type of string');
    }
    if (typeof this.options.baseUrl === 'string') {
        path = (new URL(path, this.options.baseUrl)).href;
    }
    return this.navigateTo(utils_1.validateUrl(path));
}
exports.default = url;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Jyb3dzZXIvdXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBbUN6QyxTQUF3QixHQUFHLENBRXZCLElBQVk7SUFFWixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUE7S0FDNUU7SUFFRCxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0tBQ3BEO0lBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM3QyxDQUFDO0FBYkQsc0JBYUMifQ==