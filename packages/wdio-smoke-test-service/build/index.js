"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launcher = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SmokeService {
    constructor() {
        this.logFile = fs_1.default.createWriteStream(path_1.default.join(process.cwd(), 'tests', 'helpers', 'service.log'));
    }
    beforeSession() { this.logFile.write('beforeSession called\n'); }
    before() { this.logFile.write('before called\n'); }
    beforeSuite() { this.logFile.write('beforeSuite called\n'); }
    beforeHook() { this.logFile.write('beforeHook called\n'); }
    afterHook() { this.logFile.write('afterHook called\n'); }
    beforeTest() { this.logFile.write('beforeTest called\n'); }
    beforeCommand() { this.logFile.write('beforeCommand called\n'); }
    afterCommand() { this.logFile.write('afterCommand called\n'); }
    afterTest() { this.logFile.write('afterTest called\n'); }
    afterSuite() { this.logFile.write('afterSuite called\n'); }
    after() { this.logFile.write('after called\n'); }
    afterSession() { this.logFile.write('afterSession called\n'); }
}
exports.default = SmokeService;
class SmokeServiceLauncher {
    constructor() {
        this.logFile = fs_1.default.createWriteStream(path_1.default.join(process.cwd(), 'tests', 'helpers', 'launcher.log'));
    }
    onPrepare() { this.logFile.write('onPrepare called\n'); }
    onWorkerStart() { this.logFile.write('onWorkerStart called\n'); }
    onComplete() { this.logFile.write('onComplete called\n'); }
}
exports.launcher = SmokeServiceLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUV2QixNQUFxQixZQUFZO0lBRTdCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFFLENBQUMsaUJBQWlCLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBQ3BHLENBQUM7SUFDRCxhQUFhLEtBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDakUsTUFBTSxLQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ25ELFdBQVcsS0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUM3RCxVQUFVLEtBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDM0QsU0FBUyxLQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ3pELFVBQVUsS0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUMzRCxhQUFhLEtBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDakUsWUFBWSxLQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQy9ELFNBQVMsS0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUN6RCxVQUFVLEtBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDM0QsS0FBSyxLQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ2pELFlBQVksS0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztDQUNsRTtBQWpCRCwrQkFpQkM7QUFFRCxNQUFNLG9CQUFvQjtJQUV0QjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBRSxDQUFDLGlCQUFpQixDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUNyRyxDQUFDO0lBQ0QsU0FBUyxLQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ3pELGFBQWEsS0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBLENBQUEsQ0FBQztJQUNoRSxVQUFVLEtBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQSxDQUFDLENBQUM7Q0FDOUQ7QUFFWSxRQUFBLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQSJ9