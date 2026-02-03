"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDFunctionBuilder = void 0;
const override_textsearch_functions_1 = require("./override-textsearch-functions");
class UUIDFunctionBuilder extends override_textsearch_functions_1.TextSearchFunctionBuilder {
    genRandomUuid() {
        return this.pushFunction("GEN_RANDOM_UUID");
    }
    uuidv4() {
        return this.pushFunction("UUIDV4");
    }
    uuidv7(shift) {
        return this.pushFunction("UUIDV7", shift === undefined ? undefined : this.toLiteralValue(shift));
    }
    uuidExtractTimestamp(uuid) {
        return this.pushFunction("UUID_EXTRACT_TIMESTAMP", uuid);
    }
    uuidExtractVersion(uuid) {
        return this.pushFunction("UUID_EXTRACT_VERSION", uuid);
    }
}
exports.UUIDFunctionBuilder = UUIDFunctionBuilder;
