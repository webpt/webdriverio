"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class NetworkHandler {
    constructor(session) {
        this.requestLog = { requests: [] };
        this.requestTypes = {};
        session.on('Network.dataReceived', this.onDataReceived.bind(this));
        session.on('Network.responseReceived', this.onNetworkResponseReceived.bind(this));
        session.on('Network.requestWillBeSent', this.onNetworkRequestWillBeSent.bind(this));
        session.on('Page.frameNavigated', this.onPageFrameNavigated.bind(this));
    }
    findRequest(params) {
        let request = this.requestLog.requests.find((req) => req.id === params.requestId);
        if (!request && this.cachedFirstRequest && this.cachedFirstRequest.id === params.requestId) {
            request = this.cachedFirstRequest;
        }
        return request;
    }
    onDataReceived(params) {
        let request = this.findRequest(params);
        if (!request || !request.type || !this.requestTypes[request.type]) {
            return;
        }
        const type = request.type;
        const requestType = this.requestTypes[type] || {};
        requestType.size += params.dataLength;
        requestType.encoded += params.encodedDataLength;
    }
    onNetworkResponseReceived(params) {
        let request = this.findRequest(params);
        if (!request) {
            return;
        }
        request.statusCode = params.response.status;
        request.requestHeaders = params.response.requestHeaders;
        request.responseHeaders = params.response.headers;
        request.timing = params.response.timing;
        request.type = params.type;
    }
    onNetworkRequestWillBeSent(params) {
        let isFirstRequestOfFrame = false;
        if (params.type === 'Document' &&
            params.initiator.type === 'other' &&
            constants_1.IGNORED_URLS.filter((url) => params.request.url.startsWith(url)).length === 0) {
            isFirstRequestOfFrame = true;
            this.requestTypes = {};
        }
        const log = {
            id: params.requestId,
            url: params.request.url,
            method: params.request.method
        };
        if (params.redirectResponse) {
            log.redirect = {
                url: params.redirectResponse.url,
                statusCode: params.redirectResponse.status,
                requestHeaders: params.redirectResponse.requestHeaders,
                responseHeaders: params.redirectResponse.headers,
                timing: params.redirectResponse.timing
            };
        }
        if (params.type) {
            const requestType = this.requestTypes[params.type];
            if (!requestType) {
                this.requestTypes[params.type] = {
                    size: 0,
                    encoded: 0,
                    count: 1
                };
            }
            else if (requestType) {
                requestType.count++;
            }
        }
        if (isFirstRequestOfFrame) {
            log.loaderId = params.loaderId;
            this.cachedFirstRequest = log;
            return;
        }
        return this.requestLog.requests.push(log);
    }
    onPageFrameNavigated(params) {
        if (!params.frame.parentId && constants_1.IGNORED_URLS.filter((url) => params.frame.url.startsWith(url)).length === 0) {
            this.requestLog = {
                id: params.frame.loaderId,
                url: params.frame.url,
                requests: []
            };
            if (this.cachedFirstRequest && this.cachedFirstRequest.loaderId === params.frame.loaderId) {
                delete this.cachedFirstRequest.loaderId;
                this.requestLog.requests.push(this.cachedFirstRequest);
                this.cachedFirstRequest = undefined;
            }
        }
    }
}
exports.default = NetworkHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVyL25ldHdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw0Q0FBMkM7QUFpQzNDLE1BQXFCLGNBQWM7SUFPL0IsWUFBYSxPQUFtQjtRQU5oQyxlQUFVLEdBQWUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUE7UUFDekMsaUJBQVksR0FFUixFQUFFLENBQUE7UUFJRixPQUFPLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDbEUsT0FBTyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDakYsT0FBTyxDQUFDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDbkYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDM0UsQ0FBQztJQUVELFdBQVcsQ0FBRSxNQUFtRjtRQUM1RixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBS2pGLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUN4RixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxPQUFPLENBQUE7SUFDbEIsQ0FBQztJQUVELGNBQWMsQ0FBRSxNQUEwQztRQUN0RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBT3RDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0QsT0FBTTtTQUNUO1FBRUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFLLEVBQXFCLENBQUE7UUFDckUsV0FBVyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFBO1FBQ3JDLFdBQVcsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFBO0lBQ25ELENBQUM7SUFFRCx5QkFBeUIsQ0FBRSxNQUE4QztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBSXRDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixPQUFNO1NBQ1Q7UUFFRCxPQUFPLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBQzNDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUE7UUFDdkQsT0FBTyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQTtRQUNqRCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBQ3ZDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUM5QixDQUFDO0lBRUQsMEJBQTBCLENBQUUsTUFBK0M7UUFDdkUsSUFBSSxxQkFBcUIsR0FBRyxLQUFLLENBQUE7UUFFakMsSUFNSSxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVU7WUFLMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssT0FBTztZQUlqQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDL0U7WUFDRSxxQkFBcUIsR0FBRyxJQUFJLENBQUE7WUFLNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUE7U0FDekI7UUFFRCxNQUFNLEdBQUcsR0FBWTtZQUNqQixFQUFFLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDcEIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztZQUN2QixNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQ2hDLENBQUE7UUFFRCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixHQUFHLENBQUMsUUFBUSxHQUFHO2dCQUNYLEdBQUcsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRztnQkFDaEMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUMxQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWM7Z0JBQ3RELGVBQWUsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTztnQkFDaEQsTUFBTSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO2FBQ3pDLENBQUE7U0FDSjtRQUVELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNiLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2xELElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQzdCLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxDQUFDO29CQUNWLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUE7YUFDSjtpQkFBTSxJQUFJLFdBQVcsRUFBRTtnQkFDcEIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFBO2FBQ3RCO1NBQ0o7UUFFRCxJQUFJLHFCQUFxQixFQUFFO1lBQ3ZCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQTtZQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFBO1lBQzdCLE9BQU07U0FDVDtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFFRCxvQkFBb0IsQ0FBRSxNQUF5QztRQUszRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksd0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkcsSUFBSSxDQUFDLFVBQVUsR0FBRztnQkFDZCxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUN6QixHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHO2dCQUNyQixRQUFRLEVBQUUsRUFBRTthQUNmLENBQUE7WUFJRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUl2RixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUE7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtnQkFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQTthQUN0QztTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBckpELGlDQXFKQyJ9