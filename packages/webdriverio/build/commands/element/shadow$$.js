"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shadowFnFactory_1 = require("../../scripts/shadowFnFactory");
async function shadowRoot(selector) {
    return await this.$$(shadowFnFactory_1.shadowFnFactory(selector, true));
}
exports.default = shadowRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZG93JCQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9zaGFkb3ckJC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUErRDtBQXdCaEQsS0FBSyxVQUFVLFVBQVUsQ0FFcEMsUUFBZ0I7SUFFaEIsT0FBTyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsaUNBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUN6RCxDQUFDO0FBTEQsNkJBS0MifQ==