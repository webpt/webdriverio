"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getElementProperty_1 = __importDefault(require("./getElementProperty"));
const getElementTagName_1 = __importDefault(require("./getElementTagName"));
async function isElementSelected({ elementId }) {
    const tagName = await getElementTagName_1.default.call(this, { elementId });
    const name = tagName === 'option' ? 'selected' : 'checked';
    const isSelected = await getElementProperty_1.default.call(this, { elementId, name });
    return Boolean(isSelected);
}
exports.default = isElementSelected;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbGVtZW50U2VsZWN0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvaXNFbGVtZW50U2VsZWN0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBcUQ7QUFDckQsNEVBQW1EO0FBYXBDLEtBQUssVUFBVSxpQkFBaUIsQ0FFM0MsRUFBRSxTQUFTLEVBQXlCO0lBRXBDLE1BQU0sT0FBTyxHQUFJLE1BQU0sMkJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7SUFDbEUsTUFBTSxJQUFJLEdBQUcsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7SUFDMUQsTUFBTSxVQUFVLEdBQUcsTUFBTSw0QkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDM0UsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQVJELG9DQVFDIn0=