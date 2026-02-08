"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkFunctionBuilder = void 0;
const override_math_functions_1 = require("./override-math-functions");
class NetworkFunctionBuilder extends override_math_functions_1.MathFunctionBuilder {
    // IP Address Functions (Table 9.40)
    abbrev(value) {
        return this.pushFunction("ABBREV", value);
    }
    broadcast(value) {
        return this.pushFunction("BROADCAST", value);
    }
    host(value) {
        return this.pushFunction("HOST", value);
    }
    hostmask(value) {
        return this.pushFunction("HOSTMASK", value);
    }
    inetMerge(left, right) {
        return this.pushFunction("INET_MERGE", left, right);
    }
    inetSameFamily(left, right) {
        return this.pushFunction("INET_SAME_FAMILY", left, right);
    }
    masklen(value) {
        return this.pushFunction("MASKLEN", value);
    }
    netmask(value) {
        return this.pushFunction("NETMASK", value);
    }
    network(value) {
        return this.pushFunction("NETWORK", value);
    }
    setMasklen(value, length) {
        return this.pushFunction("SET_MASKLEN", value, length === undefined ? undefined : this.toLiteral(length));
    }
    textInet(value) {
        return this.pushFunction("TEXT", value);
    }
    // MAC Address Functions (Table 9.41)
    macaddrTrunc(value) {
        return this.pushFunction("TRUNC", value);
    }
    macaddr8Trunc(value) {
        return this.pushFunction("TRUNC", value);
    }
    macaddr8Set7bit(value) {
        return this.pushFunction("MACADDR8_SET7BIT", value);
    }
}
exports.NetworkFunctionBuilder = NetworkFunctionBuilder;
