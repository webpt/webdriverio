"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (_, script, scriptTimeout, dataProperty, dataFlag, ...commandArgs) => {
    return new Promise((_resolve, _reject) => {
        setTimeout(() => _reject('script timeout'), scriptTimeout);
        window.arguments = [...commandArgs, (result) => {
                let tmpResult = result instanceof NodeList ? Array.from(result) : result;
                const isResultArray = Array.isArray(tmpResult);
                tmpResult = isResultArray ? tmpResult : [tmpResult];
                if (tmpResult.find((r) => r instanceof HTMLElement)) {
                    tmpResult = tmpResult.map((r, i) => {
                        if (r instanceof HTMLElement) {
                            const dataPropertyValue = `${dataFlag}_${i}`;
                            r.setAttribute(dataProperty, dataPropertyValue);
                            return dataPropertyValue;
                        }
                        return result;
                    });
                }
                return _resolve(isResultArray ? tmpResult : tmpResult[0]);
            }];
        return eval(script);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZUFzeW5jU2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvZXhlY3V0ZUFzeW5jU2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBZUEsa0JBQWUsQ0FDWCxDQUFVLEVBQ1YsTUFBYyxFQUNkLGFBQXFCLEVBQ3JCLFlBQW9CLEVBQ3BCLFFBQWdCLEVBQ2hCLEdBQUcsV0FBa0IsRUFDVCxFQUFFO0lBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUNyQyxVQUFVLENBQ04sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQy9CLGFBQWEsQ0FDaEIsQ0FFQTtRQUFDLE1BQWMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLE1BQXNCLEVBQUUsRUFBRTtnQkFDckUsSUFBSSxTQUFTLEdBQW1CLE1BQU0sWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtnQkFDeEYsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDOUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQTRCLENBQUMsQ0FBQTtnQkFFdEUsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFlBQVksV0FBVyxDQUFDLEVBQUU7b0JBQ2pELFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUMvQixJQUFJLENBQUMsWUFBWSxXQUFXLEVBQUU7NEJBQzFCLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUE7NEJBQzVDLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUE7NEJBQy9DLE9BQU8saUJBQWlCLENBQUE7eUJBQzNCO3dCQUVELE9BQU8sTUFBTSxDQUFBO29CQUNqQixDQUFDLENBQUMsQ0FBQTtpQkFDTDtnQkFFRCxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDN0QsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSJ9