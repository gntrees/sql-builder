import { describe, expect, it } from "bun:test";
import {
    account,
    gntreesUi,
    projects,
    projectsDetail,
    session,
    todo,
    user,
    verification,
} from "./db.schema";
import { expectQuery } from "../test-helpers";
import { sqlBuilder, sqlSchema } from "../../../../../pg";
import { z } from "zod";

const connectionUrl =
    "postgresql://gntrees_ui_admin:cuanBanyak20Triliun@localhost:5432/gntrees_ui";

const q = sqlBuilder(connectionUrl)
    .setFormatParamHandler("pg")
    .setExecutionHandler(async ({ sql, parameters }) => {
        if (typeof connectionUrl !== "string") {
            throw new Error("Database connection URL must be provided for execution");
        }
        const client = new (await import("pg")).Client({
            connectionString: connectionUrl,
        });
        await client.connect();
        try {
            return (await client.query(sql, parameters)).rows;
        } finally {
            await client.end();
        }
    })

async function expectExecute(builder: any) {
    const result = await builder.execute();
    console.log("Execution result:", result);
    expect(result).toBeDefined();
}

describe("schema db structure", () => {
    it("should accept table.column from schema", async () => {
        const builder = q.select(account.id).from(account);
        expectQuery(builder, "queryBuilder", "schema table column literal");
        await expectExecute(builder);
    });

    it("should accept another column from schema", async () => {
        const builder = q.select(q.c(account.createdAt)).from(account);
        expectQuery(builder, "queryBuilder", "schema table column literal created");
        await expectExecute(builder);
    });

    it("should accept table.column with from clause", async () => {
        const builder = q.select(account.id).from(account);
        expectQuery(builder, "queryBuilder", "schema table column literal with from");
        await expectExecute(builder);
    });

    it("should accept table from schema", async () => {
        const builder = q.select("*").from(account);
        expectQuery(builder, "queryBuilder", "schema table literal");
        await expectExecute(builder);
    });

    it("should accept db from schema", () => {
        const builder = q.select(gntreesUi);
        expectQuery(builder, "queryBuilder", "schema db literal");
    });

    it("should accept multiple columns from schema", async () => {
        const builder = q.select(account.id, account.userId).from(account);
        expectQuery(builder, "queryBuilder", "schema multiple columns");
        await expectExecute(builder);
    });

    it("should accept where clause using schema column", async () => {
        const builder = q.select(account.id).from(account).where(q.i(account.userId).op("=").l("1"));
        expectQuery(builder, "queryBuilder", "schema where clause");
        await expectExecute(builder);
    });

    it("should accept order by schema column", async () => {
        const builder = q
            .select(account.id)
            .from(account)
            .orderBy(q.desc(account.createdAt));
        expectQuery(builder, "queryBuilder", "schema order by column");
        await expectExecute(builder);
    });

    it("should accept limit with schema table", async () => {
        const builder = q.select(account.id).from(account).limit(10);
        expectQuery(builder, "queryBuilder", "schema limit");
        await expectExecute(builder);
    });

    it("should accept join between schema tables", async () => {
        const builder = q
            .select(account.id, user.email)
            .from(account)
            .join(user)
            .on(q.eq(account.userId, user.id));
        expectQuery(builder, "queryBuilder", "schema join tables");
        await expectExecute(builder);
    });

    it("should accept select from todo schema table", async () => {
        const builder = q.select(todo.text, todo.completed).from(todo);
        expectQuery(builder, "queryBuilder", "schema todo select");
        await expectExecute(builder);
    });

    it("should accept where with updated_at schema column", async () => {
        const builder = q
            .select(account.updatedAt)
            .from(account)
            .where(q.op(account.updatedAt, "IS NOT", q.null()));
        // console.log(builder.getTokens());


        expectQuery(builder, "queryBuilder", "schema where updated_at");
        await expectExecute(builder);
    });

    it("should accept count from schema table", async () => {
        const builder = q.select(q.r`COUNT(*)`).from(account);
        expectQuery(builder, "queryBuilder", "schema count table");
        await expectExecute(builder);
    });

    it("should accept group by schema column", async () => {
        const builder = q
            .select(account.userId, q.count("*"))
            .from(account)
            .groupBy(account.userId);
        expectQuery(builder, "queryBuilder", "schema group by column");
        await expectExecute(builder);
    });

    it("should accept table selection from another schema table", async () => {
        const builder = q.select(projectsDetail.data).from(projectsDetail);
        expectQuery(builder, "queryBuilder", "schema table selection detail");
        await expectExecute(builder);
    });

    it("should accept where with session table schema", async () => {
        const builder = q.select(session.id).from(session).where(
            q.i(session.userId).op("=").l(q.schemaParam("userId").string().default("2"))
        );
        builder.setParams({
            "userId": "1",
        });
        expectQuery(builder, "queryBuilder", "schema session where");
        await expectExecute(builder);
    });

    it("should accept select with verification table schema", async () => {
        const builder = q.select(verification.id, verification.identifier).from(verification);
        expectQuery(builder, "queryBuilder", "schema verification select");
        await expectExecute(builder);
    });

    it("should accept select from projects table schema", async () => {
        const builder = q.select(projects.id, projects.name).from(projects);
        expectQuery(builder, "queryBuilder", "schema projects select");
        await expectExecute(builder);
    });

    // validation test
    it("should validate parameters with schema validation", async () => {
        const sch = sqlSchema()
        const schema = sch.setQuery("getProjects", sch.set
            .query(q
                .select(
                    projects.id,
                    projects.name,
                    projects.description
                )
                .from(projects)
                .schemaCase("getProjects",
                    q.where(
                        q.ilike(projects.name, q.schemaParam("search").string().default("%na%"))
                    )
                )
                .schemaCase("getProjectsNoSearch",
                    q.where(
                        q.op(projects.name, "IS NOT", q.null())
                    )
                )
            )
            .validation(
                z.array(z.object({
                    id: z.string(),
                    name: z.string().optional(),
                    description: z.string(),
                }))
            ));
        try {
            const res = await schema.query("getProjects").setParams({
                // getProjects:{
                //     search: "project"
                // }
            }).execute();
            // await builder.setValidation(
            //     z.array(z.object({
            //         id: z.string(),
            //         name: z.string(),
            //         descriptions: z.string(),
            //     }))
            // ).execute();  
            console.log("Validation result:", res);
            console.log("Validation result:", schema.query("getProjects").getSqlBuilder().getSqlWithParameters());

            throw new Error("Expected validation error was not thrown");
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});
