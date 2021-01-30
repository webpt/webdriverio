"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nock_1 = __importDefault(require("nock"));
const protocols_1 = require("@wdio/protocols");
const REGEXP_SESSION_ID = /\/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;
const SESSION_ID = 'XXX';
const protocols = [
    protocols_1.JsonWProtocol, protocols_1.WebDriverProtocol, protocols_1.MJsonWProtocol, protocols_1.AppiumProtocol,
    protocols_1.ChromiumProtocol, protocols_1.SauceLabsProtocol, protocols_1.SeleniumProtocol
];
const protocolFlattened = new Map();
for (const protocol of protocols) {
    for (const [endpoint, methods] of Object.entries(protocol)) {
        for (const [method, commandData] of Object.entries(methods)) {
            protocolFlattened.set(commandData.command, { method, endpoint, commandData });
        }
    }
}
class WebDriverMock {
    constructor(host = 'localhost', port = 4444, path = '/') {
        this.path = path;
        this.scope = nock_1.default(`http://${host}:${port}`, { 'encodedQueryParams': true });
        this.command = new Proxy({}, { get: this.get.bind(this) });
    }
    static pathMatcher(expectedPath) {
        return (path) => {
            const sessionId = path.match(REGEXP_SESSION_ID);
            if (!sessionId) {
                return path === expectedPath;
            }
            expectedPath = expectedPath.replace(':sessionId', SESSION_ID);
            path = path.replace(`${sessionId[0].slice(1)}`, SESSION_ID);
            return path === expectedPath;
        };
    }
    get(obj, commandName) {
        const { method, endpoint, commandData } = protocolFlattened.get(commandName);
        return (...args) => {
            let urlPath = endpoint;
            for (const [i, param] of Object.entries(commandData.variables || [])) {
                urlPath = urlPath.replace(`:${param.name}`, args[parseInt(i)]);
            }
            if (method === 'POST') {
                const reqMethod = method.toLowerCase();
                return this.scope[reqMethod](WebDriverMock.pathMatcher(urlPath), (body) => {
                    for (const param of commandData.parameters) {
                        if (!body[param.name]) {
                            return false;
                        }
                        if (param.required && typeof body[param.name] === 'undefined') {
                            return false;
                        }
                    }
                    return true;
                });
            }
            const reqMethod = method.toLowerCase();
            return this.scope[reqMethod](WebDriverMock.pathMatcher(urlPath));
        };
    }
}
exports.default = WebDriverMock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViRHJpdmVyTW9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9XZWJEcml2ZXJNb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXVCO0FBR3ZCLCtDQUd3QjtBQUV4QixNQUFNLGlCQUFpQixHQUFHLGdFQUFnRSxDQUFBO0FBQzFGLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQTtBQUN4QixNQUFNLFNBQVMsR0FBRztJQUNkLHlCQUFhLEVBQUUsNkJBQWlCLEVBQUUsMEJBQWMsRUFBRSwwQkFBYztJQUNoRSw0QkFBZ0IsRUFBRSw2QkFBaUIsRUFBRSw0QkFBZ0I7Q0FDeEQsQ0FBQTtBQUlELE1BQU0saUJBQWlCLEdBQXVDLElBQUksR0FBRyxFQUFFLENBQUE7QUFNdkUsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUU7SUFDOUIsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEQsS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekQsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7U0FDaEY7S0FDSjtDQUNKO0FBRUQsTUFBcUIsYUFBYTtJQUc5QixZQUFZLE9BQWUsV0FBVyxFQUFFLE9BQWUsSUFBSSxFQUFTLE9BQWUsR0FBRztRQUFsQixTQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2xGLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUMzRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQVNELE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBb0I7UUFDbkMsT0FBTyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUsvQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLE9BQU8sSUFBSSxLQUFLLFlBQVksQ0FBQTthQUMvQjtZQU1ELFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUM3RCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUMzRCxPQUFPLElBQUksS0FBSyxZQUFZLENBQUE7UUFDaEMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFRLEVBQUUsV0FBbUI7UUFFN0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBMEIsQ0FBQTtRQUVyRyxPQUFPLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTtZQUN0QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUE7WUFDdEIsS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRTtnQkFDbEUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDakU7WUFFRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ25CLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQW9CLENBQUE7Z0JBQ3hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBeUIsRUFBRSxFQUFFO29CQUMzRixLQUFLLE1BQU0sS0FBSyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUU7d0JBSXhDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNuQixPQUFPLEtBQUssQ0FBQTt5QkFDZjt3QkFLRCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTs0QkFDM0QsT0FBTyxLQUFLLENBQUE7eUJBQ2Y7cUJBQ0o7b0JBS0QsT0FBTyxJQUFJLENBQUE7Z0JBQ2YsQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQW9CLENBQUE7WUFDeEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNwRSxDQUFDLENBQUE7SUFDTCxDQUFDO0NBQ0o7QUE1RUQsZ0NBNEVDIn0=