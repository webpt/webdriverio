"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModule = void 0;
function loadModule(name, context) {
    try {
        module.context = context;
        require(name);
    }
    catch (e) {
        throw new Error(`Module ${name} can't get loaded. Are you sure you have installed it?\n` +
            'Note: if you\'ve installed WebdriverIO globally you need to install ' +
            'these external modules globally too!');
    }
}
exports.loadModule = loadModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsVUFBVSxDQUFFLElBQVksRUFBRSxPQUFxQjtJQUMzRCxJQUFJO1FBRUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ2hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSwwREFBMEQ7WUFDeEUsc0VBQXNFO1lBQ3RFLHNDQUFzQyxDQUFDLENBQUE7S0FDMUQ7QUFDTCxDQUFDO0FBVkQsZ0NBVUMifQ==