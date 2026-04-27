import { describe, test } from "bun:test";
import { sqlBuilder } from "../index";

describe("schema param typing", () => {
    test("setParams infers keys from schemaParam and schemaCase", () => {
        const q = sqlBuilder();

        const query = q.select("*").from("users")
            .where(
                q.schemaCase(
                    "filter",
                    q.where(
                        q.ilike(
                            q.c("users.name"),
                            q.schemaParam("name").string().default("test"),
                        ),
                    ),
                ),
                // q.eq(
                //     q.c("users.id"),
                // ),
            )
            .limit(
                q.schemaParam("userIds").number(),
            );
            // .schemaCase(
            //     "filter",
            //     q.where(
            //         q.ilike(
            //             q.c("users.name"),
            //             q.schemaParam("name").string().default("test"),
            //         ),
            //     ),
            // );

        query.setParams({
            userIds: 1,
            filter: {
                name: "john",
            },
        });

        query.setParams({
            filter: true,
        });


    });
});
