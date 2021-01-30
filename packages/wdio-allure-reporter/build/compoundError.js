"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indentAll(lines) {
    return lines.split('\n').map(x => '    ' + x).join('\n');
}
class CompoundError extends Error {
    constructor(...innerErrors) {
        const message = ['CompoundError: One or more errors occurred. ---'].
            concat(innerErrors.map(x => {
            if (x.stack)
                return `${indentAll(x.stack)}\n--- End of stack trace ---`;
            return `   ${x.message}\n--- End of error message ---`;
        })).join('\n');
        super(message);
        this.innerErrors = innerErrors;
    }
}
exports.default = CompoundError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb3VuZEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBUyxTQUFTLENBQUMsS0FBYTtJQUM1QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM1RCxDQUFDO0FBTUQsTUFBcUIsYUFBYyxTQUFRLEtBQUs7SUFHNUMsWUFBWSxHQUFHLFdBQW9CO1FBQy9CLE1BQU0sT0FBTyxHQUFHLENBQUMsaURBQWlELENBQUM7WUFDL0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLENBQUMsS0FBSztnQkFBRSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUE7WUFDdkUsT0FBTyxNQUFNLENBQUMsQ0FBQyxPQUFPLGdDQUFnQyxDQUFBO1FBQzFELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWxCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0lBQ2xDLENBQUM7Q0FDSjtBQWJELGdDQWFDIn0=