import { MathFunctionBuilder } from "./override-math-functions";
import type { Statement } from "./types";
export declare class NetworkFunctionBuilder extends MathFunctionBuilder {
    abbrev(value?: Statement): this;
    broadcast(value?: Statement): this;
    host(value?: Statement): this;
    hostmask(value?: Statement): this;
    inetMerge(left?: Statement, right?: Statement): this;
    inetSameFamily(left?: Statement, right?: Statement): this;
    masklen(value?: Statement): this;
    netmask(value?: Statement): this;
    network(value?: Statement): this;
    setMasklen(value?: Statement, length?: Statement): this;
    textInet(value?: Statement): this;
    macaddrTrunc(value?: Statement): this;
    macaddr8Trunc(value?: Statement): this;
    macaddr8Set7bit(value?: Statement): this;
}
