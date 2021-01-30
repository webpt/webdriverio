/// <reference types="node" />
import type { ExtendedCapabilities } from '../types';
import type DevToolsDriver from '../devtoolsdriver';
export default function newSession(this: DevToolsDriver, { capabilities }: {
    capabilities: ExtendedCapabilities;
}): Promise<{
    sessionId: string;
    capabilities: {
        browserName: string;
        browserVersion: string;
        platformName: NodeJS.Platform;
        platformVersion: string;
    };
}>;
//# sourceMappingURL=newSession.d.ts.map