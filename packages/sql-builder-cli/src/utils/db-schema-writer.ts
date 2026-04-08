import type { DbSchemaStructure } from "../types.js";

const DEFAULT_DB_NAME = "DbName";

const splitWords = (value: string): string[] => {
  return value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
};

const toPascalCase = (value: string): string => {
  const words = splitWords(value);
  if (words.length === 0) return DEFAULT_DB_NAME;
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const toCamelCase = (value: string): string => {
  const words = splitWords(value);
  const [first, ...rest] = words;
  if (!first) return "db";
  return (
    first.charAt(0).toLowerCase() +
    first.slice(1) +
    rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("")
  );
};

const toSafeIdentifier = (value: string, fallback: string): string => {
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) {
    return value;
  }
  const candidate = value.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(candidate)) {
    return candidate;
  }
  return fallback;
};

const makeUnique = (value: string, used: Set<string>): string => {
  if (!used.has(value)) {
    used.add(value);
    return value;
  }
  let counter = 2;
  while (used.has(`${value}${counter}`)) {
    counter += 1;
  }
  const unique = `${value}${counter}`;
  used.add(unique);
  return unique;
};

const stripSchemaPrefix = (value: string): string => {
  const normalized = value.replace(/"/g, "").trim();
  const parts = normalized.split(".");
  return parts[parts.length - 1] ?? normalized;
};

type TableMetadata = {
  name: string;
  tableVar: string;
  tableClass: string;
  columns: { name: string; prop: string }[];
};

const buildTableMetadata = (structure: DbSchemaStructure): TableMetadata[] => {
  const usedTableVars = new Set<string>();
  const usedTableClasses = new Set<string>();
  return structure.tables.map((table) => {
    const tableVarBase = toSafeIdentifier(toCamelCase(stripSchemaPrefix(table.name)), "table");
    const tableVar = makeUnique(tableVarBase, usedTableVars);
    const tableClassBase = toSafeIdentifier(toPascalCase(stripSchemaPrefix(table.name)), "Table");
    const tableClass = makeUnique(tableClassBase, usedTableClasses);
    const usedColumns = new Set<string>();
    const columns = table.columns.map((columnName) => {
      const propBase = toSafeIdentifier(toCamelCase(columnName), "column");
      const prop = makeUnique(propBase, usedColumns);
      return { name: columnName, prop };
    });
    return { name: table.name, tableVar, tableClass, columns };
  });
};

export const createDbSchemaSource = (structure: DbSchemaStructure): string => {
  const tableMeta = buildTableMetadata(structure);
  const importLine = 'import { ColumnSchema, DBSchema, TableSchema } from "@gntrees/sql-builder/pg";';
  const dbClassName = toPascalCase(structure.dbName || DEFAULT_DB_NAME);
  const dbVarName = toSafeIdentifier(toCamelCase(dbClassName), "db");

  const dbClassLines: string[] = [];
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
      const lines: string[] = [];
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

  const exportLines: string[] = [];
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
