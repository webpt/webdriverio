"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function setTimeout(timeouts) {
    if (typeof timeouts !== 'object') {
        throw new Error('Parameter for "setTimeout" command needs to be an object');
    }
    const timeoutValues = Object.values(timeouts);
    if (timeoutValues.length && timeoutValues.every(timeout => typeof timeout !== 'number' || timeout < 0 || timeout > Number.MAX_SAFE_INTEGER)) {
        throw new Error('Specified timeout values are not valid integer (see https://webdriver.io/docs/api/browser/setTimeout for documentation).');
    }
    const implicit = timeouts.implicit;
    const pageLoad = timeouts['page load'] || timeouts.pageLoad;
    const script = timeouts.script;
    const setTimeouts = this.setTimeouts.bind(this);
    if (!this.isW3C) {
        await Promise.all([
            isFinite(implicit) && setTimeouts('implicit', implicit),
            isFinite(pageLoad) && setTimeouts('page load', pageLoad),
            isFinite(script) && setTimeouts('script', script),
        ].filter(Boolean));
        return;
    }
    return setTimeouts(implicit, pageLoad, script);
}
exports.default = setTimeout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0VGltZW91dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL3NldFRpbWVvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUErQmUsS0FBSyxVQUFVLFVBQVUsQ0FFcEMsUUFBMkI7SUFFM0IsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFBO0tBQzlFO0lBTUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM3QyxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUN6SSxNQUFNLElBQUksS0FBSyxDQUFDLDBIQUEwSCxDQUFDLENBQUE7S0FDOUk7SUFFRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBa0IsQ0FBQTtJQUU1QyxNQUFNLFFBQVEsR0FBSSxRQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUE7SUFDcEUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQWdCLENBQUE7SUFDeEMsTUFBTSxXQUFXLEdBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFLcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDYixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDZCxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7WUFDdkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDO1lBQ3hELFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztTQUNwRCxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLE9BQU07S0FDVDtJQUVELE9BQU8sV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDbEQsQ0FBQztBQXBDRCw2QkFvQ0MifQ==