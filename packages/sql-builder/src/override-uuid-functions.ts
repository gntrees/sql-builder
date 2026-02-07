import { TextSearchFunctionBuilder } from "./override-textsearch-functions";
import type { Statement } from "./types";

export class UUIDFunctionBuilder extends TextSearchFunctionBuilder {
    genRandomUuid() {
        return this.pushFunction("GEN_RANDOM_UUID");
    }

    uuidv4() {
        return this.pushFunction("UUIDV4");
    }

    uuidv7(shift?: Statement) {
        return this.pushFunction("UUIDV7",
            shift === undefined ? undefined : this.toLiteral(shift));
    }

    uuidExtractTimestamp(uuid?: Statement) {
        return this.pushFunction("UUID_EXTRACT_TIMESTAMP", uuid);
    }

    uuidExtractVersion(uuid?: Statement) {
        return this.pushFunction("UUID_EXTRACT_VERSION", uuid);
    }
}
