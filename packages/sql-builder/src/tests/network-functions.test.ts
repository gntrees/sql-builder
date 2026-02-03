import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("network functions", () => {
    describe("IP address functions", () => {
        it("builds abbrev for inet", () => {
            const builder = q.select(q.abbrev(q.l("192.168.1.0/32")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT ABBREV($1)");
            expect(parameters).toEqual(["192.168.1.0/32"]);
        });

        it("builds broadcast", () => {
            const builder = q.select(q.broadcast(q.l("192.168.1.5/24")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT BROADCAST($1)");
            expect(parameters).toEqual(["192.168.1.5/24"]);
        });

        it("builds host", () => {
            const builder = q.select(q.host(q.l("192.168.1.0/24")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HOST($1)");
            expect(parameters).toEqual(["192.168.1.0/24"]);
        });

        it("builds hostmask", () => {
            const builder = q.select(q.hostmask(q.l("192.168.23.20/30")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HOSTMASK($1)");
            expect(parameters).toEqual(["192.168.23.20/30"]);
        });

        it("builds inet_merge", () => {
            const builder = q.select(q.inetMerge(q.l("192.168.1.5/24"), q.l("192.168.2.5/24")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT INET_MERGE($1, $2)");
            expect(parameters).toEqual(["192.168.1.5/24", "192.168.2.5/24"]);
        });

        it("builds inet_same_family", () => {
            const builder = q.select(q.inetSameFamily(q.l("192.168.1.5/24"), q.l("::1")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT INET_SAME_FAMILY($1, $2)");
            expect(parameters).toEqual(["192.168.1.5/24", "::1"]);
        });

        it("builds masklen", () => {
            const builder = q.select(q.masklen(q.l("192.168.1.5/24")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT MASKLEN($1)");
            expect(parameters).toEqual(["192.168.1.5/24"]);
        });

        it("builds netmask", () => {
            const builder = q.select(q.netmask(q.l("192.168.1.5/24")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT NETMASK($1)");
            expect(parameters).toEqual(["192.168.1.5/24"]);
        });

        it("builds network", () => {
            const builder = q.select(q.network(q.l("192.168.1.5/24")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT NETWORK($1)");
            expect(parameters).toEqual(["192.168.1.5/24"]);
        });

        it("builds set_masklen", () => {
            const builder = q.select(q.setMasklen(q.l("192.168.1.5/24"), 16));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SET_MASKLEN($1, $2)");
            expect(parameters).toEqual(["192.168.1.5/24", 16]);
        });

        it("builds text for inet", () => {
            const builder = q.select(q.textInet(q.l("192.168.1.5")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT TEXT($1)");
            expect(parameters).toEqual(["192.168.1.5"]);
        });
    });

    describe("IP address operators", () => {
        it("builds << (subnet strictly contained by)", () => {
            const builder = q.select(q.l("192.168.1.5").op("<<").l("192.168.1/24"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 << $2");
            expect(parameters).toEqual(["192.168.1.5", "192.168.1/24"]);
        });

        it("builds <<= (subnet contained by or equal to)", () => {
            const builder = q.select(q.l("192.168.1/24").op("<<=").l("192.168.1/24"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 <<= $2");
            expect(parameters).toEqual(["192.168.1/24", "192.168.1/24"]);
        });

        it("builds >> (subnet strictly contains)", () => {
            const builder = q.select(q.l("192.168.1/24").op(">>").l("192.168.1.5"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 >> $2");
            expect(parameters).toEqual(["192.168.1/24", "192.168.1.5"]);
        });

        it("builds >>= (subnet contains or equal to)", () => {
            const builder = q.select(q.l("192.168.1/24").op(">>=").l("192.168.1/24"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 >>= $2");
            expect(parameters).toEqual(["192.168.1/24", "192.168.1/24"]);
        });

        it("builds && (overlap/contain check)", () => {
            const builder = q.select(q.l("192.168.1/24").op("&&").l("192.168.1.80/28"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 && $2");
            expect(parameters).toEqual(["192.168.1/24", "192.168.1.80/28"]);
        });

        it("builds ~ (bitwise NOT)", () => {
            const builder = q.select(q.raw`~$1`);
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT ~$1");
            expect(parameters).toEqual([]);
        });

        it("builds & (bitwise AND)", () => {
            const builder = q.select(q.l("192.168.1.6").op("&").l("0.0.0.255"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 & $2");
            expect(parameters).toEqual(["192.168.1.6", "0.0.0.255"]);
        });

        it("builds | (bitwise OR)", () => {
            const builder = q.select(q.l("192.168.1.6").op("|").l("0.0.0.255"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 | $2");
            expect(parameters).toEqual(["192.168.1.6", "0.0.0.255"]);
        });

        it("builds + (add offset)", () => {
            const builder = q.select(q.l("192.168.1.6").op("+").l(25));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 + $2");
            expect(parameters).toEqual(["192.168.1.6", 25]);
        });

        it("builds - (subtract offset)", () => {
            const builder = q.select(q.l("192.168.1.43").op("-").l(36));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 - $2");
            expect(parameters).toEqual(["192.168.1.43", 36]);
        });

        it("builds - (difference)", () => {
            const builder = q.select(q.l("192.168.1.43").op("-").l("192.168.1.19"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT $1 - $2");
            expect(parameters).toEqual(["192.168.1.43", "192.168.1.19"]);
        });
    });

    describe("MAC address functions", () => {
        it("builds trunc for macaddr", () => {
            const builder = q.select(q.macaddrTrunc(q.l("12:34:56:78:90:ab")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT TRUNC($1)");
            expect(parameters).toEqual(["12:34:56:78:90:ab"]);
        });

        it("builds trunc for macaddr8", () => {
            const builder = q.select(q.macaddr8Trunc(q.l("12:34:56:78:90:ab:cd:ef")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT TRUNC($1)");
            expect(parameters).toEqual(["12:34:56:78:90:ab:cd:ef"]);
        });

        it("builds macaddr8_set7bit", () => {
            const builder = q.select(q.macaddr8Set7bit(q.l("00:34:56:ab:cd:ef")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT MACADDR8_SET7BIT($1)");
            expect(parameters).toEqual(["00:34:56:ab:cd:ef"]);
        });
    });

    describe("complex queries with network functions", () => {
        it("builds query with network function in WHERE clause", () => {
            const builder = q.select("*").from("devices").where(q.network(q.c("ip_address")).op("=").network(q.l("192.168.1.0/24")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM devices WHERE NETWORK(ip_address) = NETWORK($1)");
            expect(parameters).toEqual(["192.168.1.0/24"]);
        });

        it("builds query with subnet containment check", () => {
            const builder = q.select("*").from("networks").where(q.i("ip_range").op("<<").l("10.0.0.0/8"));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM networks WHERE ip_range << $1");
            expect(parameters).toEqual(["10.0.0.0/8"]);
        });

        it("builds query with multiple network functions", () => {
            const builder = q.select(
                q.broadcast(q.c("ip_address")).as("broadcast"),
                q.netmask(q.c("ip_address")).as("netmask"),
                q.host(q.c("ip_address")).as("host"),
            ).from("devices");
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT BROADCAST(ip_address) AS broadcast, NETMASK(ip_address) AS netmask, HOST(ip_address) AS host FROM devices");
            expect(parameters).toEqual([]);
        });
    });
});
