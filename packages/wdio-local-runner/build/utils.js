"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLastListener = void 0;
function removeLastListener(target, eventName) {
    const listener = target.listeners(eventName).reverse()[0];
    if (listener) {
        target.removeListener(eventName, listener);
    }
}
exports.removeLastListener = removeLastListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0Isa0JBQWtCLENBQUUsTUFBaUIsRUFBRSxTQUFpQjtJQUNwRSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBZSxDQUFBO0lBQ3ZFLElBQUksUUFBUSxFQUFFO1FBQ1YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDN0M7QUFDTCxDQUFDO0FBTEQsZ0RBS0MifQ==