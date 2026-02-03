import { MathFunctionBuilder } from "./override-math-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";

export class NetworkFunctionBuilder extends MathFunctionBuilder {
    // IP Address Functions (Table 9.40)
    abbrev(value?: StatementValueQueryBuilder) {
        return this.pushFunction("ABBREV", value);
    }

    broadcast(value?: StatementValueQueryBuilder) {
        return this.pushFunction("BROADCAST", value);
    }

    host(value?: StatementValueQueryBuilder) {
        return this.pushFunction("HOST", value);
    }

    hostmask(value?: StatementValueQueryBuilder) {
        return this.pushFunction("HOSTMASK", value);
    }

    inetMerge(left?: StatementValueQueryBuilder, right?: StatementValueQueryBuilder) {
        return this.pushFunction("INET_MERGE", left, right);
    }

    inetSameFamily(left?: StatementValueQueryBuilder, right?: StatementValueQueryBuilder) {
        return this.pushFunction("INET_SAME_FAMILY", left, right);
    }

    masklen(value?: StatementValueQueryBuilder) {
        return this.pushFunction("MASKLEN", value);
    }

    netmask(value?: StatementValueQueryBuilder) {
        return this.pushFunction("NETMASK", value);
    }

    network(value?: StatementValueQueryBuilder) {
        return this.pushFunction("NETWORK", value);
    }

    setMasklen(value?: StatementValueQueryBuilder, length?: StatementValueLiteral) {
        return this.pushFunction("SET_MASKLEN",
            value,
            length === undefined ? undefined : this.toLiteralValue(length));
    }

    textInet(value?: StatementValueQueryBuilder) {
        return this.pushFunction("TEXT", value);
    }

    // MAC Address Functions (Table 9.41)
    macaddrTrunc(value?: StatementValueQueryBuilder) {
        return this.pushFunction("TRUNC", value);
    }

    macaddr8Trunc(value?: StatementValueQueryBuilder) {
        return this.pushFunction("TRUNC", value);
    }

    macaddr8Set7bit(value?: StatementValueQueryBuilder) {
        return this.pushFunction("MACADDR8_SET7BIT", value);
    }
}
