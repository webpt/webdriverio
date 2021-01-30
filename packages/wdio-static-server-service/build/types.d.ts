export interface MiddleWareOption {
    mount: string;
    middleware: string;
}
export interface FolderOption {
    mount: string;
    path: string;
}
export interface StaticServerOptions {
    folders?: FolderOption[];
    port?: number;
    middleware?: MiddleWareOption[];
}
//# sourceMappingURL=types.d.ts.map