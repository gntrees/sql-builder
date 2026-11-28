// Canonical schema IR shared by the Prisma generator and the LT emitter.
//
// The JSON shape is intentionally boring and deterministic: no timestamps,
// stable ordering, and an explicit format version. Bump SCHEMA_IR_VERSION only
// when the shape or the meaning of a field changes.

export const SCHEMA_IR_VERSION = 3 as const;

export type SemanticType =
    | "Int"
    | "Float"
    | "Str"
    | "Bool"
    | "Decimal"
    | "Uuid"
    | "Temporal"
    | "Enum"
    | "Unsupported";

export type DefaultIR =
    | { kind: "autoincrement" }
    | { kind: "now" }
    | { kind: "uuid"; version?: string }
    | { kind: "cuid"; version?: string }
    | { kind: "dbgenerated"; value: string }
    | { kind: "literal"; value: string | number | boolean | null }
    | { kind: "function"; name: string; args: string[] }
    | { kind: "unknown"; value: string };

export type ColumnIR = {
    /** Accessor name (snake_case). */
    name: string;
    /** SQL column name. */
    dbName: string;
    type: SemanticType;
    /** Native type reported by Prisma, or the Prisma scalar when absent. */
    nativeType: string;
    nullable: boolean;
    default?: DefaultIR;
    unique: boolean;
    /** Set when type is "Enum". */
    enum?: string;
};

export type IndexIR = {
    /** Index/constraint name from the database. */
    name: string;
    /** SQL column names, in index order. */
    columns: string[];
    /** True for unique constraints/indexes. */
    unique: boolean;
};

export type TableIR = {
    /** Prisma model name. */
    model: string;
    /** Accessor/binding name (snake_case). */
    name: string;
    /** SQL table name. */
    dbName: string;
    /** SQL schema name. */
    schema: string;
    /** Column accessor names. */
    primaryKey: string[];
    columns: ColumnIR[];
    /** Non-primary indexes and composite unique constraints. */
    indexes: IndexIR[];
};

export type EnumValueIR = {
    /** Accessor/variant name (PascalCase). */
    name: string;
    /** SQL enum value. */
    dbName: string;
};

export type EnumIR = {
    /** LT enum type name (PascalCase). */
    name: string;
    /** SQL enum name. */
    dbName: string;
    /** Generated package name, e.g. schema_enum_role. */
    package: string;
    values: EnumValueIR[];
};

export type ForeignKeyIR = {
    name: string;
    fromTable: string;
    fromColumns: string[];
    toTable: string;
    toColumns: string[];
    onDelete?: string;
    onUpdate?: string;
};

export type SchemaIR = {
    version: typeof SCHEMA_IR_VERSION;
    generator: "prisma-lt";
    dialect: "postgres";
    prismaVersion: string;
    tables: TableIR[];
    enums: EnumIR[];
    foreignKeys: ForeignKeyIR[];
};

export type UnsupportedKind =
    | "column-type"
    | "schema"
    | "index"
    | "unique-constraint"
    | "foreign-key";

export type UnsupportedEntry = {
    kind: UnsupportedKind;
    table?: string;
    column?: string;
    schema?: string;
    name?: string;
    fields?: string[];
    type?: string;
    reason: string;
};

export type UnsupportedIR = {
    version: typeof SCHEMA_IR_VERSION;
    entries: UnsupportedEntry[];
};

export type SchemaBuildResult = {
    schema: SchemaIR;
    unsupported: UnsupportedIR;
};
