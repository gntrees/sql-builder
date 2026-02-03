import { TextSearchFunctionBuilder } from "./override-textsearch-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";

export class UUIDFunctionBuilder extends TextSearchFunctionBuilder {
    genRandomUuid() {
        return this.pushFunction("GEN_RANDOM_UUID");
    }

    uuidv4() {
        return this.pushFunction("UUIDV4");
    }

    uuidv7(shift?: StatementValueLiteral) {
        return this.pushFunction("UUIDV7",
            shift === undefined ? undefined : this.toLiteralValue(shift));
    }

    uuidExtractTimestamp(uuid?: StatementValueQueryBuilder) {
        return this.pushFunction("UUID_EXTRACT_TIMESTAMP", uuid);
    }

    uuidExtractVersion(uuid?: StatementValueQueryBuilder) {
        return this.pushFunction("UUID_EXTRACT_VERSION", uuid);
    }
}
