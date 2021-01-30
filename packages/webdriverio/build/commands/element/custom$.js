"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getElementObject_1 = require("../../utils/getElementObject");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
async function custom$(strategyName, strategyArguments) {
    const browserObject = utils_1.getBrowserObject(this);
    const strategy = browserObject.strategies.get(strategyName);
    if (!strategy) {
        throw Error('No strategy found for ' + strategyName);
    }
    if (!this.elementId) {
        throw Error(`Can't call custom$ on element with selector "${this.selector}" because element wasn't found`);
    }
    let res = await this.execute(strategy, strategyArguments, this);
    if (Array.isArray(res)) {
        res = res[0];
    }
    if (res && typeof res[constants_1.ELEMENT_KEY] === 'string') {
        return await getElementObject_1.getElement.call(this, strategy, res);
    }
    throw Error('Your locator strategy script must return an element');
}
exports.default = custom$;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tJC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9lbGVtZW50L2N1c3RvbSQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxtRUFBeUQ7QUFDekQsdUNBQThDO0FBQzlDLCtDQUE2QztBQTBCN0MsS0FBSyxVQUFVLE9BQU8sQ0FFbEIsWUFBb0IsRUFDcEIsaUJBQXlCO0lBRXpCLE1BQU0sYUFBYSxHQUFHLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVDLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBc0IsQ0FBQTtJQUVoRixJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ1gsTUFBTSxLQUFLLENBQUMsd0JBQXdCLEdBQUcsWUFBWSxDQUFDLENBQUE7S0FDdkQ7SUFNRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNqQixNQUFNLEtBQUssQ0FBQyxnREFBZ0QsSUFBSSxDQUFDLFFBQVEsZ0NBQWdDLENBQUMsQ0FBQTtLQUM3RztJQUVELElBQUksR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUF3QyxDQUFBO0lBT3RHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2Y7SUFFRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsQ0FBQyx1QkFBVyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQzdDLE9BQU8sTUFBTSw2QkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0tBQ3BEO0lBRUQsTUFBTSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQTtBQUN0RSxDQUFDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIn0=