import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("string functions", () => {
    it("builds lower", () => {
        const builder = q.select(q.lower("TOM"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT LOWER($1)");
        expect(parameters).toEqual(["TOM"]);
    });

    it("builds concat", () => {
        const builder = q.select(q.concat("abc", 2, "def"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CONCAT($1, $2, $3)");
        expect(parameters).toEqual(["abc", 2, "def"]);
    });

    it("builds concat_ws", () => {
        const builder = q.select(q.concatWs(",", "abcde", 2, "22"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT CONCAT_WS($1, $2, $3, $4)");
        expect(parameters).toEqual([",", "abcde", 2, "22"]);
    });

    it("builds substring", () => {
        const builder = q.select(q.substring("Thomas", 2, 3));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT SUBSTRING($1, $2, $3)");
        expect(parameters).toEqual(["Thomas", 2, 3]);
    });

    it("builds regexp_replace", () => {
        const builder = q.select(q.regexpReplace("Thomas", ".[mN]a.", "M"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT REGEXP_REPLACE($1, $2, $3)");
        expect(parameters).toEqual(["Thomas", ".[mN]a.", "M"]);
    });

    it("builds starts_with", () => {
        const builder = q.select(q.startsWith("alphabet", "alph"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT STARTS_WITH($1, $2)");
        expect(parameters).toEqual(["alphabet", "alph"]);
    });

    it("builds like with escape", () => {
        const builder = q.select(q.i("name").op("LIKE").l("A\\_%").escape("\\"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT name LIKE $1 ESCAPE $2");
        expect(parameters).toEqual(["A\\_%", "\\"]);
    });

    it("builds ilike with escape", () => {
        const builder = q.select(q.i("name").op("ILIKE").l("a%_").escape("#"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT name ILIKE $1 ESCAPE $2");
        expect(parameters).toEqual(["a%_", "#"]);
    });

    it("builds similar to with escape", () => {
        const builder = q.select(q.i("code").op("SIMILAR TO").l("%(a|b)%").escape("!"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT code SIMILAR TO $1 ESCAPE $2");
        expect(parameters).toEqual(["%(a|b)%", "!"]);
    });

    it("builds regex operators", () => {
        const builder = q.select(
            q.i("text").op("~").l("foo.*bar")
                .i("text").op("~*").l("Foo.*Bar")
                .i("text").op("!~").l("baz")
                .i("text").op("!~*").l("BAZ"),
        );
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT text ~ $1 text ~* $2 text !~ $3 text !~* $4");
        expect(parameters).toEqual(["foo.*bar", "Foo.*Bar", "baz", "BAZ"]);
    });

    it("builds starts-with operator", () => {
        const builder = q.select(q.i("name").op("^@").l("Al"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT name ^@ $1");
        expect(parameters).toEqual(["Al"]);
    });

    it("builds pg_client_encoding", () => {
        const builder = q.select(q.pgClientEncoding());
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT PG_CLIENT_ENCODING()");
        expect(parameters).toEqual([]);
    });

    it("builds bit_count", () => {
        const builder = q.select(q.bitCount("10111"));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT BIT_COUNT($1)");
        expect(parameters).toEqual(["10111"]);
    });

    it("builds get_bit", () => {
        const builder = q.select(q.getBit("101010101010101010", 6));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT GET_BIT($1, $2)");
        expect(parameters).toEqual(["101010101010101010", 6]);
    });

    it("builds set_bit", () => {
        const builder = q.select(q.setBit("101010101010101010", 6, 0));
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT SET_BIT($1, $2, $3)");
        expect(parameters).toEqual(["101010101010101010", 6, 0]);
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
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe(
            "SELECT GET_BYTE($1, $2), SET_BYTE($3, $4, $5), GET_BIT($6, $7), SET_BIT($8, $9, $10), ENCODE($11, $12), DECODE($13, $14), $15 || $16",
        );
        expect(parameters).toEqual([
            "\\xDEADBEEF",
            2,
            "\\xDEADBEEF",
            2,
            255,
            "\\xDEADBEEF",
            1,
            "\\xDEADBEEF",
            1,
            1,
            "\\xDEADBEEF",
            "hex",
            "deadbeef",
            "hex",
            "\\xDEADBEEF",
            "\\x00",
        ]);
    });

    describe("bit string functions", () => {
        it("builds bit_count for bit strings", () => {
            const builder = q.select(q.bitCount("10111"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT BIT_COUNT($1)");
            expect(parameters).toEqual(["10111"]);
        });

        it("builds bit_length for bit strings", () => {
            const builder = q.select(q.bitLength("10111"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT BIT_LENGTH($1)");
            expect(parameters).toEqual(["10111"]);
        });

        it("builds length for bit strings", () => {
            const builder = q.select(q.length("10111"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT LENGTH($1)");
            expect(parameters).toEqual(["10111"]);
        });

        it("builds octet_length for bit strings", () => {
            const builder = q.select(q.octetLength("1011111011"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT OCTET_LENGTH($1)");
            expect(parameters).toEqual(["1011111011"]);
        });

        it("builds get_bit for bit strings", () => {
            const builder = q.select(q.getBit("101010101010101010", 6));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GET_BIT($1, $2)");
            expect(parameters).toEqual(["101010101010101010", 6]);
        });

        it("builds set_bit for bit strings", () => {
            const builder = q.select(q.setBit("101010101010101010", 6, 0));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SET_BIT($1, $2, $3)");
            expect(parameters).toEqual(["101010101010101010", 6, 0]);
        });

        it("builds overlay for bit strings without count", () => {
            const builder = q.select(q.overlay("01010101010101010", "11111", 2));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT OVERLAY($1, $2, $3)");
            expect(parameters).toEqual(["01010101010101010", "11111", 2]);
        });

        it("builds overlay for bit strings with count", () => {
            const builder = q.select(q.overlay("01010101010101010", "11111", 2, 3));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT OVERLAY($1, $2, $3, $4)");
            expect(parameters).toEqual(["01010101010101010", "11111", 2, 3]);
        });

        it("builds position for bit strings", () => {
            const builder = q.select(q.position("010", "000001101011"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT POSITION($1, $2)");
            expect(parameters).toEqual(["010", "000001101011"]);
        });

        it("builds substring for bit strings with start only", () => {
            const builder = q.select(q.substring("110010111111", 3));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SUBSTRING($1, $2)");
            expect(parameters).toEqual(["110010111111", 3]);
        });

        it("builds substring for bit strings with start and count", () => {
            const builder = q.select(q.substring("110010111111", 3, 2));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SUBSTRING($1, $2, $3)");
            expect(parameters).toEqual(["110010111111", 3, 2]);
        });
    });
});
