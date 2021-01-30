"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_CAPS = exports.DEFAULTS = void 0;
exports.DEFAULTS = {
    protocol: {
        type: 'string',
        default: 'http',
        match: /(http|https)/
    },
    hostname: {
        type: 'string',
        default: 'localhost'
    },
    port: {
        type: 'number',
        default: 4444
    },
    path: {
        type: 'string',
        validate: (path) => {
            if (!path.startsWith('/')) {
                throw new TypeError('The option "path" needs to start with a "/"');
            }
            return true;
        },
        default: '/'
    },
    queryParams: {
        type: 'object'
    },
    capabilities: {
        type: 'object',
        required: true
    },
    logLevel: {
        type: 'string',
        default: 'info',
        match: /(trace|debug|info|warn|error|silent)/
    },
    outputDir: {
        type: 'string'
    },
    connectionRetryTimeout: {
        type: 'number',
        default: 120000
    },
    connectionRetryCount: {
        type: 'number',
        default: 3
    },
    user: {
        type: 'string'
    },
    key: {
        type: 'string'
    },
    agent: {
        type: 'object'
    },
    logLevels: {
        type: 'object'
    },
    headers: {
        type: 'object'
    },
    transformRequest: {
        type: 'function',
        default: (requestOptions) => requestOptions
    },
    transformResponse: {
        type: 'function',
        default: (response) => response
    },
    directConnectProtocol: {
        type: 'string'
    },
    directConnectHost: {
        type: 'string'
    },
    directConnectPort: {
        type: 'number'
    },
    directConnectPath: {
        type: 'string'
    },
    strictSSL: {
        type: 'boolean',
        default: true
    }
};
exports.VALID_CAPS = [
    'browserName', 'browserVersion', 'platformName', 'acceptInsecureCerts',
    'pageLoadStrategy', 'proxy', 'setWindowRect', 'timeouts', 'strictFileInteractability',
    'unhandledPromptBehavior'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLYSxRQUFBLFFBQVEsR0FBMEM7SUFJM0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxjQUFjO0tBQ3hCO0lBSUQsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsV0FBVztLQUN2QjtJQUlELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFJRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxDQUFDLElBQVksRUFBVyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixNQUFNLElBQUksU0FBUyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7YUFDckU7WUFFRCxPQUFPLElBQUksQ0FBQTtRQUNmLENBQUM7UUFDRCxPQUFPLEVBQUUsR0FBRztLQUNmO0lBSUQsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFJRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBSUQsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxzQ0FBc0M7S0FDaEQ7SUFJRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUlELHNCQUFzQixFQUFFO1FBQ3BCLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLE1BQU07S0FDbEI7SUFJRCxvQkFBb0IsRUFBRTtRQUNsQixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFJRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUlELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBSUQsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFJRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUlELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBSUQsZ0JBQWdCLEVBQUU7UUFDZCxJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxjQUFrQyxFQUFFLEVBQUUsQ0FBQyxjQUFjO0tBQ2xFO0lBSUQsaUJBQWlCLEVBQUU7UUFDZixJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxRQUFzQixFQUFFLEVBQUUsQ0FBQyxRQUFRO0tBQ2hEO0lBSUQscUJBQXFCLEVBQUU7UUFDbkIsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZixJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELGlCQUFpQixFQUFFO1FBQ2YsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFLRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0NBQ0osQ0FBQTtBQUVZLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUscUJBQXFCO0lBQ3RFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLDJCQUEyQjtJQUNyRix5QkFBeUI7Q0FDNUIsQ0FBQSJ9