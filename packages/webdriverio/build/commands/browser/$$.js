"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const getElementObject_1 = require("../../utils/getElementObject");
async function $$(selector) {
    const res = await utils_1.findElements.call(this, selector);
    const elements = await getElementObject_1.getElements.call(this, selector, res);
    return utils_1.enhanceElementsArray(elements, this, selector);
}
exports.default = $$;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiJCQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvYnJvd3Nlci8kJC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnRTtBQUNoRSxtRUFBMEQ7QUFrRDNDLEtBQUssVUFBVSxFQUFFLENBRTVCLFFBQWtCO0lBRWxCLE1BQU0sR0FBRyxHQUFHLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ25ELE1BQU0sUUFBUSxHQUFHLE1BQU0sOEJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM1RCxPQUFPLDRCQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFpQixDQUFBO0FBQ3pFLENBQUM7QUFQRCxxQkFPQyJ9