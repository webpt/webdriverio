"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerPerformanceObserverInPage() {
    window.____lastLongTask = window.performance.now();
    const observer = new window.PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
            if (entry.entryType === 'longtask') {
                const taskEnd = entry.startTime + entry.duration;
                window.____lastLongTask = Math.max(window.____lastLongTask, taskEnd);
            }
        }
    });
    observer.observe({ entryTypes: ['longtask'] });
    window.____lhPerformanceObserver = observer;
}
exports.default = registerPerformanceObserverInPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJQZXJmb3JtYW5jZU9ic2VydmVySW5QYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvcmVnaXN0ZXJQZXJmb3JtYW5jZU9ic2VydmVySW5QYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsU0FBd0IsaUNBQWlDO0lBQ3JELE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ2xELE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUN0QyxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUN6QixJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO2dCQUNoQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUE7Z0JBQ2hELE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQTthQUN2RTtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBTTlDLE1BQU0sQ0FBQyx5QkFBeUIsR0FBRyxRQUFRLENBQUE7QUFDL0MsQ0FBQztBQW5CRCxvREFtQkMifQ==