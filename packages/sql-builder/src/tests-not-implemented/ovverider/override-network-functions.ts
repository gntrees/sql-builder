import { MathFunctionBuilder } from "./override-math-functions";
import type { Statement } from "../../types";

export class NetworkFunctionBuilder extends MathFunctionBuilder {
    // IP Address Functions (Table 9.40)
    abbrev(value?: Statement) {
        return this.pushFunction("ABBREV", value);
    }

    broadcast(value?: Statement) {
        return this.pushFunction("BROADCAST", value);
    }

    host(value?: Statement) {
        return this.pushFunction("HOST", value);
    }

    hostmask(value?: Statement) {
        return this.pushFunction("HOSTMASK", value);
    }

    inetMerge(left?: Statement, right?: Statement) {
        return this.pushFunction("INET_MERGE", left, right);
    }

    inetSameFamily(left?: Statement, right?: Statement) {
        return this.pushFunction("INET_SAME_FAMILY", left, right);
    }

    masklen(value?: Statement) {
        return this.pushFunction("MASKLEN", value);
    }

    netmask(value?: Statement) {
        return this.pushFunction("NETMASK", value);
    }

    network(value?: Statement) {
        return this.pushFunction("NETWORK", value);
    }

    setMasklen(value?: Statement, length?: Statement) {
        return this.pushFunction("SET_MASKLEN",
            value,
            length);
    }

    textInet(value?: Statement) {
        return this.pushFunction("TEXT", value);
    }

    // MAC Address Functions (Table 9.41)
    macaddrTrunc(value?: Statement) {
        return this.pushFunction("TRUNC", value);
    }

    macaddr8Trunc(value?: Statement) {
        return this.pushFunction("TRUNC", value);
    }

    macaddr8Set7bit(value?: Statement) {
        return this.pushFunction("MACADDR8_SET7BIT", value);
    }
}
