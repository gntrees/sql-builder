"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbSchemaSource = void 0;
const DEFAULT_DB_NAME = "DbName";
const splitWords = (value) => {
    return value
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
};
const toPascalCase = (value) => {
    const words = splitWords(value);
    if (words.length === 0)
        return DEFAULT_DB_NAME;
    return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
};
const toCamelCase = (value) => {
    const words = splitWords(value);
    const [first, ...rest] = words;
    if (!first)
        return "db";
    return (first.charAt(0).toLowerCase() +
        first.slice(1) +
        rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(""));
};
const toSafeIdentifier = (value, fallback) => {
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) {
        return value;
    }
    const candidate = value.replace(/[^A-Za-z0-9_]/g, "_");
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(candidate)) {
        return candidate;
    }
    return fallback;
};
const normalizeQualifiedName = (value) => {
    const normalized = value.replace(/"/g, "").trim();
    if (!normalized)
        return normalized;
    return normalized;
};
const parseQualifiedTableName = (value) => {
    const normalized = normalizeQualifiedName(value);
    const parts = normalized.split(".");
    if (parts.length >= 2) {
        const tableName = parts[parts.length - 1] ?? normalized;
        const schemaName = parts.slice(0, -1).join(".");
        return { schemaName: schemaName || undefined, tableName };
    }
    return { tableName: normalized };
};
const buildTableNameBase = (tableName) => {
    const { schemaName, tableName: baseTableName } = parseQualifiedTableName(tableName);
    if (!schemaName) {
        return baseTableName;
    }
    return `${schemaName} ${baseTableName}`;
};
const registerUniqueOrThrow = (identifier, sourceName, used, kind) => {
    const existing = used.get(identifier);
    if (existing && existing !== sourceName) {
        throw new Error(`Identifier collision for ${kind}: "${existing}" and "${sourceName}" both map to "${identifier}".`);
    }
    used.set(identifier, sourceName);
    return identifier;
};
const buildTableMetadata = (structure) => {
    const usedTableVars = new Map();
    const usedTableClasses = new Map();
    return structure.tables.map((table) => {
        const tableNameBase = buildTableNameBase(table.name);
        const tableVarBase = toSafeIdentifier(toCamelCase(tableNameBase), "table");
        const tableVar = registerUniqueOrThrow(tableVarBase, table.name, usedTableVars, "table variable");
        const tableClassBase = toSafeIdentifier(toPascalCase(tableNameBase), "Table");
        const tableClass = registerUniqueOrThrow(tableClassBase, table.name, usedTableClasses, "table class");
        const usedColumns = new Map();
        const columns = table.columns.map((columnName) => {
            const propBase = toSafeIdentifier(toCamelCase(columnName), "column");
            const prop = registerUniqueOrThrow(propBase, `${table.name}.${columnName}`, usedColumns, "column property");
            return { name: columnName, prop };
        });
        return { name: table.name, tableVar, tableClass, columns };
    });
};
const createDbSchemaSource = (structure) => {
    const tableMeta = buildTableMetadata(structure);
    const importLine = 'import { ColumnSchema, DBSchema, TableSchema } from "@gntrees/sql-builder/pg";';
    const dbClassName = toPascalCase(structure.dbName || DEFAULT_DB_NAME);
    const dbVarName = toSafeIdentifier(toCamelCase(dbClassName), "db");
    const dbClassLines = [];
    dbClassLines.push(`class ${dbClassName} extends DBSchema {`);
    for (const table of tableMeta) {
        dbClassLines.push(`  public ${table.tableVar}: ${table.tableClass};`);
    }
    dbClassLines.push("  constructor(dbSchemaName: string) {");
    dbClassLines.push("    super(dbSchemaName);");
    for (const table of tableMeta) {
        dbClassLines.push(`    this.${table.tableVar} = new ${table.tableClass}(this);`);
    }
    dbClassLines.push("  }");
    dbClassLines.push("}");
    const tableClassBlocks = tableMeta
        .map((table) => {
        const lines = [];
        lines.push(`class ${table.tableClass} extends TableSchema {`);
        for (const column of table.columns) {
            lines.push(`  public ${column.prop}: ColumnSchema;`);
        }
        lines.push("  constructor(dbSchema: DBSchema) {");
        lines.push(`    super(dbSchema, "${table.name}");`);
        for (const column of table.columns) {
            lines.push(`    this.${column.prop} = new ColumnSchema(this.dbSchema, this, "${column.name}");`);
        }
        lines.push("  }");
        lines.push("}");
        return lines.join("\n");
    })
        .join("\n\n");
    const exportLines = [];
    exportLines.push(`export const ${dbVarName} = new ${dbClassName}("${structure.dbName}");`);
    for (const table of tableMeta) {
        exportLines.push(`export const ${table.tableVar} = ${dbVarName}.${table.tableVar};`);
    }
    return [
        importLine,
        "",
        dbClassLines.join("\n"),
        "",
        tableClassBlocks,
        "",
        exportLines.join("\n"),
        "",
    ].join("\n");
};
exports.createDbSchemaSource = createDbSchemaSource;
