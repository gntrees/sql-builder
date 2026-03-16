import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("string functions", () => {
    it("builds lower", () => {
        const builder = q.select(q.lower("TOM"));
        expectQuery(builder, "strings", "lower");
    });

    it("builds concat", () => {
        const builder = q.select(q.concat("abc", 2, "def"));
        expectQuery(builder, "strings", "concat");
    });

    it("builds concat_ws", () => {
        const builder = q.select(q.concatWs(",", "abcde", 2, "22"));
        expectQuery(builder, "strings", "concat_ws");
    });

    it("builds substring", () => {
        const builder = q.select(q.substring("Thomas", 2, 3));
        expectQuery(builder, "strings", "substring");
    });

    it("builds regexp_replace", () => {
        const builder = q.select(q.regexpReplace("Thomas", ".[mN]a.", "M"));
        expectQuery(builder, "strings", "regexp_replace");
    });

    it("builds starts_with", () => {
        const builder = q.select(q.startsWith("alphabet", "alph"));
        expectQuery(builder, "strings", "starts_with");
    });

    it("builds like with escape", () => {
        const builder = q.select(q.i("name").op("LIKE").l("A\\_%").escape("\\"));
        expectQuery(builder, "strings", "like with escape");
    });

    it("builds ilike with escape", () => {
        const builder = q.select(q.i("name").op("ILIKE").l("a%_").escape("#"));
        expectQuery(builder, "strings", "ilike with escape");
    });

    it("builds similar to with escape", () => {
        const builder = q.select(q.i("code").op("SIMILAR TO").l("%(a|b)%").escape("!"));
        expectQuery(builder, "strings", "similar to with escape");
    });

    it("builds regex operators", () => {
        const builder = q.select(
            q.i("text").op("~").l("foo.*bar")
                .i("text").op("~*").l("Foo.*Bar")
                .i("text").op("!~").l("baz")
                .i("text").op("!~*").l("BAZ"),
        );
        expectQuery(builder, "strings", "regex operators");
    });

    it("builds starts-with operator", () => {
        const builder = q.select(q.i("name").op("^@").l("Al"));
        expectQuery(builder, "strings", "starts-with operator");
    });

    it("builds pg_client_encoding", () => {
        const builder = q.select(q.pgClientEncoding());
        expectQuery(builder, "strings", "pg_client_encoding");
    });

    it("builds bit_count", () => {
        const builder = q.select(q.bitCount("10111"));
        expectQuery(builder, "strings", "bit_count");
    });

    it("builds get_bit", () => {
        const builder = q.select(q.getBit("101010101010101010", 6));
        expectQuery(builder, "strings", "get_bit");
    });

    it("builds set_bit", () => {
        const builder = q.select(q.setBit("101010101010101010", 6, 0));
        expectQuery(builder, "strings", "set_bit");
    });

    it("builds bytea functions", () => {
        const builder = q.select(
            q.getByte("\\xDEADBEEF", 2),
            q.setByte("\\xDEADBEEF", 2, 255),
            q.getBit("\\xDEADBEEF", 1),
            q.setBit("\\xDEADBEEF", 1, 1),
            q.encode("\\xDEADBEEF", "hex"),
            q.decode("deadbeef", "hex"),
            q.op("\\xDEADBEEF","||", "\\x00"),
        );
        expectQuery(builder, "strings", "bytea functions");
    });

    describe("bit string functions", () => {
        it("builds bit_count for bit strings", () => {
            const builder = q.select(q.bitCount("10111"));
            expectQuery(builder, "strings", "bit_count for bit strings");
        });

        it("builds bit_length for bit strings", () => {
            const builder = q.select(q.bitLength("10111"));
            expectQuery(builder, "strings", "bit_length for bit strings");
        });

        it("builds length for bit strings", () => {
            const builder = q.select(q.length("10111"));
            expectQuery(builder, "strings", "length for bit strings");
        });

        it("builds octet_length for bit strings", () => {
            const builder = q.select(q.octetLength("1011111011"));
            expectQuery(builder, "strings", "octet_length for bit strings");
        });

        it("builds get_bit for bit strings", () => {
            const builder = q.select(q.getBit("101010101010101010", 6));
            expectQuery(builder, "strings", "get_bit for bit strings");
        });

        it("builds set_bit for bit strings", () => {
            const builder = q.select(q.setBit("101010101010101010", 6, 0));
            expectQuery(builder, "strings", "set_bit for bit strings");
        });

        it("builds overlay for bit strings without count", () => {
            const builder = q.select(q.overlay("01010101010101010", "11111", 2));
            expectQuery(builder, "strings", "overlay for bit strings without count");
        });

        it("builds overlay for bit strings with count", () => {
            const builder = q.select(q.overlay("01010101010101010", "11111", 2, 3));
            expectQuery(builder, "strings", "overlay for bit strings with count");
        });

        it("builds position for bit strings", () => {
            const builder = q.select(q.position("010", "000001101011"));
            expectQuery(builder, "strings", "position for bit strings");
        });

        it("builds substring for bit strings with start only", () => {
            const builder = q.select(q.substring("110010111111", 3));
            expectQuery(builder, "strings", "substring for bit strings with start only");
        });

        it("builds substring for bit strings with start and count", () => {
            const builder = q.select(q.substring("110010111111", 3, 2));
            expectQuery(builder, "strings", "substring for bit strings with start and count");
        });
    });
});
