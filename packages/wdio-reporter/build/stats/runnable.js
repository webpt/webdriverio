"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RunnableStats {
    constructor(type) {
        this.type = type;
        this.start = new Date();
        this._duration = 0;
    }
    complete() {
        this.end = new Date();
        this._duration = this.end.getTime() - this.start.getTime();
    }
    get duration() {
        if (this.end) {
            return this._duration;
        }
        return new Date().getTime() - this.start.getTime();
    }
    static getIdentifier(runner) {
        return runner.uid || runner.title;
    }
}
exports.default = RunnableStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVubmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHMvcnVubmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxNQUE4QixhQUFhO0lBS3ZDLFlBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSmhDLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBRWxCLGNBQVMsR0FBRyxDQUFDLENBQUE7SUFFc0IsQ0FBQztJQUVwQyxRQUFRO1FBQ0osSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzlELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7U0FDeEI7UUFDRCxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN0RCxDQUFDO0lBS0QsTUFBTSxDQUFDLGFBQWEsQ0FBRSxNQUEyQjtRQUM3QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUNyQyxDQUFDO0NBQ0o7QUF6QkQsZ0NBeUJDIn0=