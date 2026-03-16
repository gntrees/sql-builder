import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("geometry functions", () => {
    it("builds point", () => {
        const builder = q.select(q.point(23.4, -44.5));
        expectQuery(builder, "geometry", "point");
    });

    it("builds box of points", () => {
        const builder = q.select(q.box(q.point(1, 0), q.point(-1, 0)));
        expectQuery(builder, "geometry", "box of points");
    });

    it("builds circle", () => {
        const builder = q.select(q.circle(q.point(0, 0), q.l(5)));
        expectQuery(builder, "geometry", "circle");
    });

    it("builds area", () => {
        const builder = q.select(q.area(q.polygon(q.l(4), q.circle(q.point(0, 0), q.l(1)))));
        expectQuery(builder, "geometry", "area");
    });

    it("builds length", () => {
        const builder = q.select(q.length(q.path(q.point(0, 0))));
        expectQuery(builder, "geometry", "length");
    });
});
