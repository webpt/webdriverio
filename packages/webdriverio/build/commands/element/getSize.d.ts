import type { RectReturn } from '@wdio/protocols';
export default function getSize(this: WebdriverIO.Element, prop?: keyof RectReturn): Promise<number | {
    width: number | undefined;
    height: number | undefined;
} | undefined>;
//# sourceMappingURL=getSize.d.ts.map