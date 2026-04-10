import { describe, test } from "bun:test";
import { sqlBuilder } from "../../../../pg/builder";

type Equal<T, U> =
    (<G>() => G extends T ? 1 : 2) extends
    (<G>() => G extends U ? 1 : 2)
        ? true
        : false;

type Assert<T extends true> = T;

describe("schema param typing", () => {
    test("setParams infers keys from schemaParam and schemaCase", () => {
        const q = sqlBuilder();
        const base = q.select("*").from("users");

        const query = base
            .where(
                q.eq(
                    q.c("users.id"),
                    base.schemaParam("userId").number(),
                ),
            )
            .schemaCase(
                "filter",
                q.where(
                    q.ilike(
                        q.c("users.name"),
                        q.schemaParam("name").string().default("test"),
                    ),
                ),
            );

        query.setParams({
            userId: 1,
            // userId: 1,
            filter: { 
                name: "john",
             },
        });

        query.setParams({
            filter: true,
        });


    });
});
