"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getElementObject_1 = require("../../utils/getElementObject");
const constants_1 = require("../../constants");
async function custom$(strategyName, ...strategyArguments) {
    const strategy = this.strategies.get(strategyName);
    if (!strategy) {
        throw Error('No strategy found for ' + strategyName);
    }
    let res = await this.execute(strategy, ...strategyArguments);
    if (Array.isArray(res)) {
        res = res[0];
    }
    if (res && typeof res[constants_1.ELEMENT_KEY] === 'string') {
        return await getElementObject_1.getElement.call(this, strategy.toString(), res);
    }
    throw Error('Your locator strategy script must return an element');
}
exports.default = custom$;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tJC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL2N1c3RvbSQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxtRUFBeUQ7QUFDekQsK0NBQTZDO0FBeUI5QixLQUFLLFVBQVUsT0FBTyxDQUVqQyxZQUFvQixFQUNwQixHQUFHLGlCQUF3QjtJQUUzQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVsRCxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ1gsTUFBTSxLQUFLLENBQUMsd0JBQXdCLEdBQUcsWUFBWSxDQUFDLENBQUE7S0FDdkQ7SUFFRCxJQUFJLEdBQUcsR0FBMEMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUMvRCxRQUFRLEVBQ1IsR0FBRyxpQkFBaUIsQ0FDdkIsQ0FBQTtJQU9ELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2Y7SUFFRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsQ0FBQyx1QkFBVyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQzdDLE9BQU8sTUFBTSw2QkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0tBQy9EO0lBRUQsTUFBTSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQTtBQUN0RSxDQUFDO0FBOUJELDBCQThCQyJ9