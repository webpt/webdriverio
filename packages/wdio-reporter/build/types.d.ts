export interface Tag {
    name: string;
    line: number;
}
export interface CommandArgs {
    sessionId: string;
    method?: string;
    endpoint?: string;
    retries?: number;
    command?: string;
    params?: any;
}
export interface BeforeCommandArgs extends CommandArgs {
    body: any;
}
export interface AfterCommandArgs extends CommandArgs {
    result: any;
    name?: string;
}
export interface Argument {
    rows?: {
        cells: string[];
    }[];
}
//# sourceMappingURL=types.d.ts.map