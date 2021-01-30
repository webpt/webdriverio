"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getElementObject_1 = require("../../utils/getElementObject");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
async function custom$$(strategyName, strategyArguments) {
    const browserObject = utils_1.getBrowserObject(this);
    const strategy = browserObject.strategies.get(strategyName);
    if (!strategy) {
        throw Error('No strategy found for ' + strategyName);
    }
    if (!this.elementId) {
        throw Error(`Can't call custom$ on element with selector "${this.selector}" because element wasn't found`);
    }
    let res = await this.execute(strategy, strategyArguments, this);
    if (!Array.isArray(res)) {
        res = [res];
    }
    res = res.filter((el) => !!el && typeof el[constants_1.ELEMENT_KEY] === 'string');
    const elements = res.length ? await getElementObject_1.getElements.call(this, strategy, res) : [];
    return utils_1.enhanceElementsArray(elements, this, strategyName, 'custom$$', [strategyArguments]);
}
exports.default = custom$$;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tJCQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9jdXN0b20kJC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG1FQUEwRDtBQUMxRCx1Q0FBb0U7QUFDcEUsK0NBQTZDO0FBMkI3QyxLQUFLLFVBQVUsUUFBUSxDQUVuQixZQUFvQixFQUNwQixpQkFBeUI7SUFFekIsTUFBTSxhQUFhLEdBQUcsd0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUF3QixDQUFBO0lBRWxGLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFFWCxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxZQUFZLENBQUMsQ0FBQTtLQUN2RDtJQU1ELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2pCLE1BQU0sS0FBSyxDQUFDLGdEQUFnRCxJQUFJLENBQUMsUUFBUSxnQ0FBZ0MsQ0FBQyxDQUFBO0tBQzdHO0lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQThCLENBQUE7SUFPNUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDZDtJQUVELEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sRUFBRSxDQUFDLHVCQUFXLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQTtJQUVyRSxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLDhCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXlCLENBQUE7SUFDckcsT0FBTyw0QkFBb0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7QUFDOUYsQ0FBQztBQUVELGtCQUFlLFFBQVEsQ0FBQSJ9