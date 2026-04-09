import { describe, test } from "bun:test";
import { sqlBuilder } from "../../../../pg/builder";

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

        // type InferredSetParams = Parameters<typeof query.setParams>[0];
        // type ExpectedSetParams = {
        //     userId?: number;
        //     filter?: {
        //         name?: string;
        //     } | boolean;
        // };
        // type _assertParams = Assert<Equal<InferredSetParams, ExpectedSetParams>>;
        // const _unused: _assertParams = true;
        // void _unused;

        query.setParams({
            userId: 1,
            // userId: 1,
            filter: { name: "john" },
        });

        query.setParams({
            filter: true,
        });

        // if (false) {
        //     // @ts-expect-error invalid top-level key
        //     query.setParams({
        //         unknownKey: 1,
        //     });

        //     // @ts-expect-error invalid schemaParam value type
        //     query.setParams({
        //         userId: "1",
        //     });

        //     // @ts-expect-error invalid nested key
        //     query.setParams({
        //         filter: { unknownNested: "x" },
        //     });

        //     // @ts-expect-error invalid nested schemaParam value type
        //     query.setParams({
        //         filter: { name: 123 },
        //     });
        // }
    });
});
