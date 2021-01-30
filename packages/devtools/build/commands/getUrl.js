"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUrl_1 = __importDefault(require("../scripts/getUrl"));
async function getUrl() {
    const page = this.getPageHandle(true);
    return page.$eval('html', getUrl_1.default);
}
exports.default = getUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dldFVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUF1QztBQVV4QixLQUFLLFVBQVUsTUFBTTtJQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsZ0JBQU8sQ0FBQyxDQUFBO0FBQ3RDLENBQUM7QUFIRCx5QkFHQyJ9