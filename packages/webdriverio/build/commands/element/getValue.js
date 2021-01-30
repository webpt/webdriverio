"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getValue() {
    if (this.isW3C && !this.isMobile) {
        return this.getElementProperty(this.elementId, 'value');
    }
    return this.getElementAttribute(this.elementId, 'value');
}
exports.default = getValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9nZXRWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXVCQSxTQUF3QixRQUFRO0lBRTVCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDOUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUMxRDtJQUVELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDNUQsQ0FBQztBQVBELDJCQU9DIn0=