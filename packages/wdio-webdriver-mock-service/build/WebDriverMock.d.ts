import nock from 'nock';
export interface CommandMock {
    [commandName: string]: (...args: any[]) => nock.Interceptor;
}
export default class WebDriverMock {
    path: string;
    command: CommandMock;
    scope: nock.Scope;
    constructor(host?: string, port?: number, path?: string);
    static pathMatcher(expectedPath: string): (path: string) => boolean;
    get(obj: any, commandName: string): (...args: any[]) => nock.Interceptor;
}
//# sourceMappingURL=WebDriverMock.d.ts.map