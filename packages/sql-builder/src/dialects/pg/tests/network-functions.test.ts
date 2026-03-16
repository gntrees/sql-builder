import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("network functions", () => {
    describe("IP address functions", () => {
        it("builds abbrev for inet", () => {
            const builder = q.select(q.abbrev(q.l("192.168.1.0/32")));
            expectQuery(builder, "network", "abbrev for inet");
        });

        it("builds broadcast", () => {
            const builder = q.select(q.broadcast(q.l("192.168.1.5/24")));
            expectQuery(builder, "network", "broadcast");
        });

        it("builds host", () => {
            const builder = q.select(q.host(q.l("192.168.1.0/24")));
            expectQuery(builder, "network", "host");
        });

        it("builds hostmask", () => {
            const builder = q.select(q.hostmask(q.l("192.168.23.20/30")));
            expectQuery(builder, "network", "hostmask");
        });

        it("builds inet_merge", () => {
            const builder = q.select(q.inetMerge(q.l("192.168.1.5/24"), q.l("192.168.2.5/24")));
            expectQuery(builder, "network", "inet_merge");
        });

        it("builds inet_same_family", () => {
            const builder = q.select(q.inetSameFamily(q.l("192.168.1.5/24"), q.l("::1")));
            expectQuery(builder, "network", "inet_same_family");
        });

        it("builds masklen", () => {
            const builder = q.select(q.masklen(q.l("192.168.1.5/24")));
            expectQuery(builder, "network", "masklen");
        });

        it("builds netmask", () => {
            const builder = q.select(q.netmask(q.l("192.168.1.5/24")));
            expectQuery(builder, "network", "netmask");
        });

        it("builds network", () => {
            const builder = q.select(q.network(q.l("192.168.1.5/24")));
            expectQuery(builder, "network", "network");
        });

        it("builds set_masklen", () => {
            const builder = q.select(q.setMasklen(q.l("192.168.1.5/24"), 16));
            expectQuery(builder, "network", "set_masklen");
        });

        it("builds text for inet", () => {
            const builder = q.select(q.toText(q.l("192.168.1.5")));
            expectQuery(builder, "network", "text for inet");
        });
    });

    describe("IP address operators", () => {
        it("builds << (subnet strictly contained by)", () => {
            const builder = q.select(q.l("192.168.1.5").op("<<").l("192.168.1/24"));
            expectQuery(builder, "network", "<< (subnet strictly contained by)");
        });

        it("builds <<= (subnet contained by or equal to)", () => {
            const builder = q.select(q.l("192.168.1/24").op("<<=").l("192.168.1/24"));
            expectQuery(builder, "network", "<<= (subnet contained by or equal to)");
        });

        it("builds >> (subnet strictly contains)", () => {
            const builder = q.select(q.l("192.168.1/24").op(">>").l("192.168.1.5"));
            expectQuery(builder, "network", ">> (subnet strictly contains)");
        });

        it("builds >>= (subnet contains or equal to)", () => {
            const builder = q.select(q.l("192.168.1/24").op(">>=").l("192.168.1/24"));
            expectQuery(builder, "network", ">>= (subnet contains or equal to)");
        });

        it("builds && (overlap/contain check)", () => {
            const builder = q.select(q.l("192.168.1/24").op("&&").l("192.168.1.80/28"));
            expectQuery(builder, "network", "&& (overlap/contain check)");
        });

        it("builds ~ (bitwise NOT)", () => {
            const builder = q.select(q.raw`~$1`);
            expectQuery(builder, "network", "~ (bitwise NOT)");
        });

        it("builds & (bitwise AND)", () => {
            const builder = q.select(q.l("192.168.1.6").op("&").l("0.0.0.255"));
            expectQuery(builder, "network", "& (bitwise AND)");
        });

        it("builds | (bitwise OR)", () => {
            const builder = q.select(q.l("192.168.1.6").op("|").l("0.0.0.255"));
            expectQuery(builder, "network", "| (bitwise OR)");
        });

        it("builds + (add offset)", () => {
            const builder = q.select(q.l("192.168.1.6").op("+").l(25));
            expectQuery(builder, "network", "+ (add offset)");
        });

        it("builds - (subtract offset)", () => {
            const builder = q.select(q.l("192.168.1.43").op("-").l(36));
            expectQuery(builder, "network", "- (subtract offset)");
        });

        it("builds - (difference)", () => {
            const builder = q.select(q.l("192.168.1.43").op("-").l("192.168.1.19"));
            expectQuery(builder, "network", "- (difference)");
        });
    });

    describe("MAC address functions", () => {
        it("builds trunc for macaddr", () => {
            const builder = q.select(q.trunc("12:34:56:78:90:ab"));
            expectQuery(builder, "network", "trunc for macaddr");
        });

        it("builds trunc for macaddr8", () => {
            const builder = q.select(q.trunc("12:34:56:78:90:ab:cd:ef"));
            expectQuery(builder, "network", "trunc for macaddr8");
        });

        it("builds macaddr8_set7bit", () => {
            const builder = q.select(q.macaddr8Set7bit(q.l("00:34:56:ab:cd:ef")));
            expectQuery(builder, "network", "macaddr8_set7bit");
        });
    });

    describe("complex queries with network functions", () => {
        it("builds query with network function in WHERE clause", () => {
            const builder = q.select("*").from(q.t("devices")).where(q.network(q.c("ip_address")).op("=").network(q.l("192.168.1.0/24")));
            expectQuery(builder, "network", "query with network function in WHERE clause");
        });

        it("builds query with subnet containment check", () => {
            const builder = q.select("*").from(q.t("networks")).where(q.i("ip_range").op("<<").l("10.0.0.0/8"));
            expectQuery(builder, "network", "query with subnet containment check");
        });

        it("builds query with multiple network functions", () => {
            const builder = q.select(
                q.broadcast(q.c("ip_address")).as(q.c("broadcast")),
                q.netmask(q.c("ip_address")).as(q.c("netmask")),
                q.host(q.c("ip_address")).as(q.c("host")),
            ).from(q.t("devices"));
            expectQuery(builder, "network", "query with multiple network functions");
        });
    });
});
