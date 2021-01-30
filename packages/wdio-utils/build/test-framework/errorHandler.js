"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logHookError = void 0;
exports.logHookError = (hookName, hookResults = [], cid) => {
    const result = hookResults.find(result => result instanceof Error);
    if (typeof result === 'undefined') {
        return;
    }
    const error = { message: result.message };
    const content = {
        cid: cid,
        error: error,
        fullTitle: `${hookName} Hook`,
        type: 'hook',
        state: 'fail'
    };
    process.send({
        origin: 'reporter',
        name: 'printFailureMessage',
        content
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3QtZnJhbWV3b3JrL2Vycm9ySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTYSxRQUFBLFlBQVksR0FBRyxDQUFDLFFBQWdCLEVBQUUsY0FBcUIsRUFBRSxFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQ25GLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDLENBQUE7SUFDbEUsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDL0IsT0FBTTtLQUNUO0lBS0QsTUFBTSxLQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRXpDLE1BQU0sT0FBTyxHQUFHO1FBQ1osR0FBRyxFQUFFLEdBQUc7UUFDUixLQUFLLEVBQUUsS0FBSztRQUNaLFNBQVMsRUFBRSxHQUFHLFFBQVEsT0FBTztRQUM3QixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxNQUFNO0tBQ2hCLENBQUE7SUFFRCxPQUFPLENBQUMsSUFBSyxDQUFDO1FBQ1YsTUFBTSxFQUFFLFVBQVU7UUFDbEIsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixPQUFPO0tBQ1YsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIn0=