// Convert a Prisma DMMF document into the schema IR.
//
// This module is intentionally free of Prisma runtime imports so it can be
// tested with a plain JSON fixture. The generator wrapper in
// schema/prisma-generator.mjs passes options.dmmf here.

import {
    enumPackageName,
    tableTypeName,
    toPascalCase,
    toSnakeCase,
} from "./naming.ts";
import {
    SCHEMA_IR_VERSION,
    type ColumnIR,
    type DefaultIR,
    type EnumIR,
    type ForeignKeyIR,
    type SchemaBuildResult,
    type SchemaIR,
    type SemanticType,
    type TableIR,
    type UnsupportedEntry,
    type UnsupportedIR,
} from "./types.ts";

type DmmfNativeType = [string, string[]] | null | undefined;

export type DmmfField = {
    name: string;
    dbName?: string | null;
    kind: "scalar" | "object" | "enum" | "unsupported";
    type: string;
    isList: boolean;
    isRequired: boolean;
    isUnique: boolean;
    isId: boolean;
    hasDefaultValue: boolean;
    default?: unknown;
    nativeType?: DmmfNativeType;
    relationName?: string | null;
    relationFromFields?: string[];
    relationToFields?: string[];
    relationOnDelete?: string | null;
    relationOnUpdate?: string | null;
};

export type DmmfModel = {
    name: string;
    dbName?: string | null;
    schema?: string | null;
    fields: DmmfField[];
    primaryKey?: { name?: string | null; fields: string[] } | null;
    uniqueFields?: string[][];
    uniqueIndexes?: { name?: string | null; fields: string[] }[];
};

export type DmmfEnum = {
    name: string;
    dbName?: string | null;
    values: { name: string; dbName?: string | null }[];
};

export type DmmfIndex = {
    model: string;
    name?: string | null;
    type?: string;
    fields?: { name: string }[];
};

export type DmmfDocument = {
    datamodel: {
        models: DmmfModel[];
        enums: DmmfEnum[];
        indexes?: DmmfIndex[];
    };
};

export type BuildSchemaOptions = {
    prismaVersion: string;
    dialect?: "postgres";
    /** SQL table names that should not appear in the generated schema. */
    ignoreTables?: string[];
};

type ScalarMapping = {
    type: SemanticType;
    reason?: string;
};

const DIALECT = "postgres" as const;

function nativeName(field: DmmfField): string {
    return field.nativeType?.[0] ?? field.type;
}

function mapScalar(field: DmmfField): ScalarMapping {
    if (field.isList) {
        return { type: "Unsupported", reason: "array/list columns are not supported" };
    }

    if (field.kind === "unsupported") {
        return { type: "Unsupported", reason: "Prisma reports an unsupported column type" };
    }

    const native = nativeName(field);

    if (native === "Uuid") return { type: "Uuid" };
    if (native === "Json" || native === "JsonB") {
        return { type: "Unsupported", reason: "JSON values have no LT value type yet" };
    }
    if (native === "ByteA") {
        return { type: "Unsupported", reason: "binary values have no LT value type yet" };
    }

    switch (field.type) {
        case "Int":
        case "BigInt":
            return { type: "Int" };
        case "Float":
            return { type: "Float" };
        case "Decimal":
            return { type: "Decimal" };
        case "String":
            return { type: "Str" };
        case "Boolean":
            return { type: "Bool" };
        case "DateTime":
            return { type: "Temporal" };
        case "Json":
            return { type: "Unsupported", reason: "JSON values have no LT value type yet" };
        case "Bytes":
            return { type: "Unsupported", reason: "binary values have no LT value type yet" };
        default:
            return {
                type: "Unsupported",
                reason: `no LT mapping for Prisma scalar "${field.type}"`,
            };
    }
}

function normalizeDefault(field: DmmfField): DefaultIR | undefined {
    if (!field.hasDefaultValue) return undefined;
    const value = field.default;

    if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return { kind: "literal", value: value as string | number | boolean | null };
    }

    if (typeof value === "object" && value !== null && "name" in value) {
        const named = value as { name: string; args?: unknown[] };
        const args = (named.args ?? []).map((arg) => String(arg));
        switch (named.name) {
            case "autoincrement":
                return { kind: "autoincrement" };
            case "now":
                return { kind: "now" };
            case "uuid":
                return { kind: "uuid", version: args[0] };
            case "cuid":
                return { kind: "cuid", version: args[0] };
            case "dbgenerated":
                return { kind: "dbgenerated", value: args[0] ?? "" };
            default:
                return { kind: "function", name: named.name, args };
        }
    }

    return { kind: "unknown", value: JSON.stringify(value) };
}

function sortEntries(entries: UnsupportedEntry[]): UnsupportedEntry[] {
    const key = (entry: UnsupportedEntry): string =>
        [
            entry.kind,
            entry.schema ?? "",
            entry.table ?? "",
            entry.column ?? "",
            entry.name ?? "",
            (entry.fields ?? []).join(","),
            entry.type ?? "",
            entry.reason,
        ].join("\u0000");

    // A single database feature can be visible through more than one DMMF path
    // (for example @@unique also appears as a unique index). Keep one entry per
    // kind + identity, ignoring the reason text.
    const identity = (entry: UnsupportedEntry): string =>
        [
            entry.kind,
            entry.schema ?? "",
            entry.table ?? "",
            entry.column ?? "",
            entry.name ?? "",
            (entry.fields ?? []).join(","),
            entry.type ?? "",
        ].join("\u0000");

    const seen = new Set<string>();
    return entries
        .slice()
        .sort((a, b) => key(a).localeCompare(key(b)))
        .filter((entry) => {
            const id = identity(entry);
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
        });
}

function assertUnique(values: string[], context: string): void {
    const seen = new Set<string>();
    for (const value of values) {
        const key = value.toLowerCase();
        if (seen.has(key)) {
            throw new Error(`${context}: identifier collision after sanitising "${value}"`);
        }
        seen.add(key);
    }
}

export function buildSchemaIR(dmmf: DmmfDocument, options: BuildSchemaOptions): SchemaBuildResult {
    const models = dmmf.datamodel.models ?? [];
    const dmmfEnums = dmmf.datamodel.enums ?? [];
    const ignoredTables = new Set(options.ignoreTables ?? []);
    const unsupported: UnsupportedEntry[] = [];

    const enumByName = new Map<string, DmmfEnum>();
    for (const item of dmmfEnums) {
        enumByName.set(item.name, item);
    }

    const enums: EnumIR[] = dmmfEnums.map((item) => {
        if (item.values.length === 0) {
            throw new Error(`enum ${item.name}: database enums must have at least one value`);
        }
        const values = item.values.map((value) => ({
            name: toPascalCase(value.name),
            dbName: value.dbName ?? value.name,
        }));
        assertUnique(values.map((value) => value.name), `enum ${item.name}`);
        return {
            name: toPascalCase(item.name),
            dbName: item.dbName ?? item.name,
            package: enumPackageName(item.name),
            values,
        };
    });
    assertUnique(enums.map((item) => item.name), "enums");
    assertUnique(enums.map((item) => item.package), "enum packages");

    const enumByNameForLookup = new Map<string, EnumIR>();
    for (const item of enums) enumByNameForLookup.set(item.name, item);

    type ModelInfo = {
        model: DmmfModel;
        table: TableIR;
        columnByField: Map<string, string>;
        supported: boolean;
    };

    const modelInfos = new Map<string, ModelInfo>();
    const tables: TableIR[] = [];

    for (const model of models) {
        const schema = model.schema ?? "public";
        const dbName = model.dbName ?? model.name;
        if (ignoredTables.has(dbName)) continue;
        const tableName = toSnakeCase(dbName);

        if (schema !== "public") {
            unsupported.push({
                kind: "schema",
                schema,
                table: tableName,
                reason: "only the public schema is supported",
            });
            modelInfos.set(model.name, {
                model,
                table: {
                    model: model.name,
                    name: tableName,
                    dbName: model.dbName ?? model.name,
                    schema,
                    primaryKey: [],
                    columns: [],
                },
                columnByField: new Map(),
                supported: false,
            });
            continue;
        }

        const columns: ColumnIR[] = [];
        const columnByField = new Map<string, string>();
        const columnNames: string[] = [];

        for (const field of model.fields) {
            if (field.kind === "object") continue;

            const columnName = toSnakeCase(field.name);
            if (columnByField.has(field.name)) {
                throw new Error(`table ${tableName}: duplicate field ${field.name}`);
            }
            columnByField.set(field.name, columnName);
            columnNames.push(columnName);

            const defaultIR = normalizeDefault(field);
            const base = {
                name: columnName,
                dbName: field.dbName ?? field.name,
                nullable: !field.isRequired,
                unique: field.isUnique,
                ...(defaultIR ? { default: defaultIR } : {}),
            };

            if (field.kind === "enum") {
                const enumIR = enumByNameForLookup.get(toPascalCase(field.type));
                if (!enumIR) {
                    columns.push({
                        ...base,
                        type: "Unsupported",
                        nativeType: nativeName(field),
                    });
                    unsupported.push({
                        kind: "column-type",
                        table: tableName,
                        column: columnName,
                        type: nativeName(field),
                        reason: `enum "${field.type}" was not present in the DMMF enum list`,
                    });
                    continue;
                }
                columns.push({ ...base, type: "Enum", nativeType: nativeName(field), enum: enumIR.name });
                continue;
            }

            const mapping = mapScalar(field);
            columns.push({ ...base, type: mapping.type, nativeType: nativeName(field) });
            if (mapping.type === "Unsupported") {
                unsupported.push({
                    kind: "column-type",
                    table: tableName,
                    column: columnName,
                    type: nativeName(field),
                    reason: mapping.reason ?? "unsupported column type",
                });
            }
        }

        assertUnique(columnNames, `table ${tableName}`);

        const primaryKey: string[] = [];
        if (model.primaryKey && model.primaryKey.fields.length > 0) {
            for (const fieldName of model.primaryKey.fields) {
                const column = columnByField.get(fieldName);
                if (!column) {
                    unsupported.push({
                        kind: "unique-constraint",
                        table: tableName,
                        name: model.primaryKey.name ?? undefined,
                        fields: model.primaryKey.fields,
                        reason: `primary key references unknown field "${fieldName}"`,
                    });
                    continue;
                }
                primaryKey.push(column);
            }
        } else {
            for (const field of model.fields) {
                if (field.isId) {
                    const column = columnByField.get(field.name);
                    if (column) primaryKey.push(column);
                }
            }
        }

        for (const fields of model.uniqueFields ?? []) {
            if (fields.length > 1) {
                unsupported.push({
                    kind: "unique-constraint",
                    table: tableName,
                    fields: fields.map((field) => columnByField.get(field) ?? field),
                    reason: "composite unique constraints are not emitted yet",
                });
            } else if (fields.length === 1) {
                const columnName = columnByField.get(fields[0]!);
                const column = columns.find((item) => item.name === columnName);
                if (column) column.unique = true;
            }
        }

        for (const index of model.uniqueIndexes ?? []) {
            if (index.fields.length > 1) {
                unsupported.push({
                    kind: "unique-constraint",
                    table: tableName,
                    name: index.name ?? undefined,
                    fields: index.fields.map((field) => columnByField.get(field) ?? field),
                    reason: "composite unique indexes are not emitted yet",
                });
            } else if (index.fields.length === 1) {
                const columnName = columnByField.get(index.fields[0]!);
                const column = columns.find((item) => item.name === columnName);
                if (column) column.unique = true;
            }
        }

        const table: TableIR = {
            model: model.name,
            name: tableName,
            dbName: model.dbName ?? model.name,
            schema,
            primaryKey,
            columns,
        };
        tables.push(table);
        modelInfos.set(model.name, { model, table, columnByField, supported: true });
    }

    assertUnique(tables.map((table) => table.name), "tables");
    assertUnique(tables.map((table) => tableTypeName(table.name)), "table type names");

    for (const index of dmmf.datamodel.indexes ?? []) {
        // Primary keys and unique constraints are handled above; recording them
        // again as indexes only creates duplicate unsupported entries.
        if (index.type === "id" || index.type === "unique") continue;
        const info = modelInfos.get(index.model);
        const tableName = info?.table.name ?? toSnakeCase(index.model);
        unsupported.push({
            kind: "index",
            table: tableName,
            name: index.name ?? undefined,
            fields: index.fields?.map((field) => info?.columnByField.get(field.name) ?? toSnakeCase(field.name)),
            reason: "indexes are not emitted yet",
        });
    }

    const foreignKeys: ForeignKeyIR[] = [];
    const seenForeignKeys = new Set<string>();

    for (const model of models) {
        const info = modelInfos.get(model.name);
        if (!info?.supported) continue;

        for (const field of model.fields) {
            if (field.kind !== "object") continue;
            if (!field.relationFromFields || field.relationFromFields.length === 0) continue;
            if (!field.relationToFields || field.relationToFields.length === 0) continue;

            const target = modelInfos.get(field.type);
            if (!target?.supported) {
                unsupported.push({
                    kind: "foreign-key",
                    table: info.table.name,
                    name: field.relationName ?? undefined,
                    reason: `relation target "${field.type}" is not an emitted table`,
                });
                continue;
            }

            const fromColumns = field.relationFromFields.map(
                (name) => info.columnByField.get(name) ?? name,
            );
            const toColumns = field.relationToFields.map(
                (name) => target.columnByField.get(name) ?? name,
            );
            const key = `${info.table.name}(${fromColumns.join(",")})->${target.table.name}(${toColumns.join(",")})`;
            if (seenForeignKeys.has(key)) continue;
            seenForeignKeys.add(key);

            foreignKeys.push({
                name: field.relationName ?? `${info.table.name}_${fromColumns.join("_")}_${target.table.name}`,
                fromTable: info.table.name,
                fromColumns,
                toTable: target.table.name,
                toColumns,
                ...(field.relationOnDelete ? { onDelete: field.relationOnDelete } : {}),
                ...(field.relationOnUpdate ? { onUpdate: field.relationOnUpdate } : {}),
            });
        }
    }

    tables.sort((a, b) => a.name.localeCompare(b.name));
    enums.sort((a, b) => a.package.localeCompare(b.package));
    foreignKeys.sort((a, b) => {
        const left = `${a.fromTable}\u0000${a.fromColumns.join(",")}\u0000${a.toTable}`;
        const right = `${b.fromTable}\u0000${b.fromColumns.join(",")}\u0000${b.toTable}`;
        return left.localeCompare(right);
    });

    const schema: SchemaIR = {
        version: SCHEMA_IR_VERSION,
        generator: "prisma-lt",
        dialect: DIALECT,
        prismaVersion: options.prismaVersion,
        tables,
        enums,
        foreignKeys,
    };

    const unsupportedIR: UnsupportedIR = {
        version: SCHEMA_IR_VERSION,
        entries: sortEntries(unsupported),
    };

    return { schema, unsupported: unsupportedIR };
}
