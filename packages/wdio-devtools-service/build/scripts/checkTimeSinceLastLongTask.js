"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkTimeSinceLastLongTask() {
    return new Promise(resolve => {
        const timeoutRequested = window.performance.now() + 50;
        setTimeout(() => {
            const timeoutFired = window.performance.now();
            const timeSinceLongTask = timeoutFired - timeoutRequested < 50
                ? timeoutFired - window.____lastLongTask : 0;
            resolve(timeSinceLongTask);
        }, 50);
    });
}
exports.default = checkTimeSinceLastLongTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tUaW1lU2luY2VMYXN0TG9uZ1Rhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NyaXB0cy9jaGVja1RpbWVTaW5jZUxhc3RMb25nVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLFNBQXdCLDBCQUEwQjtJQUc5QyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFFdEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUVaLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDN0MsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLEdBQUcsZ0JBQWdCLEdBQUcsRUFBRTtnQkFDMUQsQ0FBQyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNoRCxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUM5QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDVixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFkRCw2Q0FjQyJ9