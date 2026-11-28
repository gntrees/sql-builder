import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { buildSchemaIR, type DmmfDocument } from "../dmmf.ts";

const fixture = JSON.parse(
    readFileSync(join(import.meta.dir, "fixtures/dmmf.json"), "utf8"),
) as DmmfDocument;

function build() {
    return buildSchemaIR(fixture, { prismaVersion: "7.10.1" });
}

describe("DMMF -> schema IR", () => {
    test("keeps tables from every schema", () => {
        const { schema, unsupported } = build();
        expect(schema.tables.map((table) => table.name)).toEqual([
            "audit",
            "organizations",
            "users",
        ]);
        expect(schema.tables.find((table) => table.name === "audit")?.schema).toBe("auth");
        expect(unsupported.entries.some((entry) => entry.kind === "schema")).toBe(false);
    });

    test("maps columns, defaults, enum, nullability, and unsupported types", () => {
        const { schema } = build();
        const users = schema.tables.find((table) => table.name === "users")!;
        const byName = new Map(users.columns.map((column) => [column.name, column]));

        expect(users.primaryKey).toEqual(["id"]);
        expect(users.dbName).toBe("users");

        expect(byName.get("id")).toMatchObject({
            dbName: "id",
            type: "Int",
            nullable: false,
            default: { kind: "autoincrement" },
        });
        expect(byName.get("email")).toMatchObject({
            type: "Str",
            nullable: false,
            unique: true,
        });
        expect(byName.get("display_name")).toMatchObject({
            type: "Str",
            nullable: true,
        });
        expect(byName.get("role")).toMatchObject({
            type: "Enum",
            enum: "Role",
            default: { kind: "literal", value: "USER" },
        });
        expect(byName.get("created_at")).toMatchObject({
            type: "Temporal",
            default: { kind: "now" },
        });
        expect(byName.get("external_id")).toMatchObject({
            type: "Uuid",
            nullable: true,
        });
        expect(byName.get("balance")).toMatchObject({
            type: "Decimal",
            default: { kind: "literal", value: 0 },
        });
        expect(byName.get("metadata")).toMatchObject({
            type: "Unsupported",
            nativeType: "JsonB",
        });
    });

    test("maps enums with original database values", () => {
        const { schema } = build();
        expect(schema.enums).toEqual([
            {
                name: "Role",
                dbName: "role",
                package: "schema_enum_role",
                values: [
                    { name: "Admin", dbName: "admin" },
                    { name: "User", dbName: "user" },
                ],
            },
        ]);
    });

    test("extracts foreign keys from the owning side only", () => {
        const { schema } = build();
        expect(schema.foreignKeys).toEqual([
            {
                name: "UserToOrganization",
                fromTable: "users",
                fromColumns: ["org_id"],
                toTable: "organizations",
                toColumns: ["id"],
                onDelete: "Cascade",
                onUpdate: "Cascade",
            },
        ]);
    });

    test("emits composite uniques and indexes as table metadata", () => {
        const { schema, unsupported } = build();
        const users = schema.tables.find((table) => table.name === "users")!;
        expect(users.indexes).toContainEqual({
            name: "users_email_org_id_key",
            columns: ["email", "orgId"],
            unique: true,
        });
        expect(users.indexes).toContainEqual({
            name: "users_email_idx",
            columns: ["email"],
            unique: false,
        });
        expect(unsupported.entries.some((entry) => entry.kind === "index")).toBe(false);
        expect(unsupported.entries.some((entry) => entry.kind === "unique-constraint")).toBe(false);
        expect(unsupported.entries).toContainEqual({
            kind: "column-type",
            table: "users",
            column: "metadata",
            type: "JsonB",
            reason: "JSON values have no LT value type yet",
        });
    });

    test("prefixes accessors when two schemas share a table name", () => {
        const document = structuredClone(fixture);
        const audit = document.datamodel.models.find((model) => model.name === "Audit")!;
        const publicAudit = structuredClone(audit);
        publicAudit.name = "PublicAudit";
        publicAudit.schema = "public";
        publicAudit.dbName = "audit";
        document.datamodel.models.push(publicAudit);

        const { schema } = buildSchemaIR(document, { prismaVersion: "7.10.1" });
        expect(
            schema.tables
                .filter((table) => table.dbName === "audit")
                .map((table) => table.name)
                .sort(),
        ).toEqual(["auth_audit", "public_audit"]);
    });

    test("extracts composite foreign keys with aligned columns", () => {
        const document = structuredClone(fixture);
        const user = document.datamodel.models.find((model) => model.name === "User")!;
        const relation = user.fields.find((field) => field.kind === "object")!;
        relation.relationFromFields = ["orgId", "email"];
        relation.relationToFields = ["id", "name"];

        const { schema, unsupported } = buildSchemaIR(document, { prismaVersion: "7.10.1" });
        expect(schema.foreignKeys).toContainEqual({
            name: "UserToOrganization",
            fromTable: "users",
            fromColumns: ["org_id", "email"],
            toTable: "organizations",
            toColumns: ["id", "name"],
            onDelete: "Cascade",
            onUpdate: "Cascade",
        });
        expect(unsupported.entries.some((entry) => entry.kind === "foreign-key")).toBe(false);
    });

    test("can ignore internal tables such as migration metadata", () => {
        const result = buildSchemaIR(fixture, {
            prismaVersion: "7.10.1",
            ignoreTables: ["users"],
        });
        expect(result.schema.tables.map((table) => table.name)).toEqual([
            "audit",
            "organizations",
        ]);
    });

    test("is deterministic", () => {
        expect(JSON.stringify(build())).toBe(JSON.stringify(build()));
    });
});
