import { TextSearchFunctionBuilder } from "./override-textsearch-functions";
import type { Statement } from "./types";
export declare class UUIDFunctionBuilder extends TextSearchFunctionBuilder {
    genRandomUuid(): this;
    uuidv4(): this;
    uuidv7(shift?: Statement): this;
    uuidExtractTimestamp(uuid?: Statement): this;
    uuidExtractVersion(uuid?: Statement): this;
}
