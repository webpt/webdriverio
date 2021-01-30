"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DevtoolsGatherer {
    constructor() {
        this._logs = [];
    }
    onMessage(msgObj) {
        this._logs.push(msgObj);
    }
    getLogs() {
        return this._logs.splice(0, this._logs.length);
    }
}
exports.default = DevtoolsGatherer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2dG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2F0aGVyZXIvZGV2dG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQSxNQUFxQixnQkFBZ0I7SUFBckM7UUFDWSxVQUFLLEdBQWdDLEVBQUUsQ0FBQTtJQVluRCxDQUFDO0lBVkcsU0FBUyxDQUFFLE1BQWlDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFLRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0NBQ0o7QUFiRCxtQ0FhQyJ9