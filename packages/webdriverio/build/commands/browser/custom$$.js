"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const getElementObject_1 = require("../../utils/getElementObject");
const constants_1 = require("../../constants");
async function custom$$(strategyName, ...strategyArguments) {
    const strategy = this.strategies.get(strategyName);
    if (!strategy) {
        throw Error('No strategy found for ' + strategyName);
    }
    let res = await this.execute(strategy, ...strategyArguments);
    if (!Array.isArray(res)) {
        res = [res];
    }
    res = res.filter(el => !!el && typeof el[constants_1.ELEMENT_KEY] === 'string');
    const elements = res.length ? await getElementObject_1.getElements.call(this, strategy.toString(), res) : [];
    return utils_1.enhanceElementsArray(elements, this, strategyName, 'custom$$', [strategyArguments]);
}
exports.default = custom$$;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tJCQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvYnJvd3Nlci9jdXN0b20kJC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFrRDtBQUNsRCxtRUFBMEQ7QUFDMUQsK0NBQTZDO0FBMEI5QixLQUFLLFVBQVUsUUFBUSxDQUVsQyxZQUFvQixFQUNwQixHQUFHLGlCQUF3QjtJQUUzQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVsRCxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ1gsTUFBTSxLQUFLLENBQUMsd0JBQXdCLEdBQUcsWUFBWSxDQUFDLENBQUE7S0FDdkQ7SUFFRCxJQUFJLEdBQUcsR0FBMEMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUMvRCxRQUFRLEVBQ1IsR0FBRyxpQkFBaUIsQ0FDdkIsQ0FBQTtJQU9ELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2Q7SUFFRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLENBQUMsdUJBQVcsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFBO0lBRW5FLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sOEJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBeUIsQ0FBQTtJQUNoSCxPQUFPLDRCQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtBQUM5RixDQUFDO0FBN0JELDJCQTZCQyJ9