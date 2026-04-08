import { generate as generateTypes, PostgresDialect as CodegenPostgresDialect } from "kysely-codegen";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import type { DbSchemaStructure } from "./types.js";
import { createDbSchemaSource } from "./utils/db-schema-writer.js";

export interface GenerateOptions {
  url: string;
  output?: string;
}

type ParsedTable = {
  tableName: string;
  tableVar: string;
  tableClass: string;
  columns: { name: string; prop: string }[];
};

const DEFAULT_DB_NAME = "DbName";

const extractDbName = (urlValue: string): string => {
  try {
    const url = new URL(urlValue);
    const path = url.pathname.replace(/^\/+/, "");
    const dbName = path.split("/")[0] ?? "";
    return dbName || DEFAULT_DB_NAME;
  } catch {
    return DEFAULT_DB_NAME;
  }
};

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

const getInterfaceBlock = (source: string, name: string): string | null => {
  const pattern = new RegExp(`export\\s+interface\\s+${name}\\s*\\{([\\s\\S]*?)\\}`, "m");
  const match = source.match(pattern);
  return match?.[1] ?? null;
};

const parseInterfaceProperties = (block: string): { key: string; type: string }[] => {
  const properties: { key: string; type: string }[] = [];
  const lines = block.split("\n");
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z0-9_]+|'[^']+'|"[^"]+")\??:\s*([^;]+);/);
    const rawKey = match?.[1];
    const rawType = match?.[2];
    if (!rawKey || !rawType) continue;
    const key = rawKey.replace(/^['"]|['"]$/g, "");
    properties.push({ key, type: rawType.trim() });
  }
  return properties;
};

const parseTables = (source: string): { tableName: string; tableType: string }[] => {
  const dbBlock = getInterfaceBlock(source, "DB");
  if (!dbBlock) return [];
  const props = parseInterfaceProperties(dbBlock);
  return props
    .map((prop) => {
      const typeMatch = prop.type.match(/([A-Za-z0-9_]+)/);
      const tableType = typeMatch?.[1] ?? "";
      return tableType ? { tableName: prop.key, tableType } : null;
    })
    .filter((item): item is { tableName: string; tableType: string } => Boolean(item));
};

const parseColumns = (source: string, tableType: string): string[] => {
  const tableBlock = getInterfaceBlock(source, tableType);
  if (!tableBlock) return [];
  return parseInterfaceProperties(tableBlock).map((prop) => prop.key);
};

const buildSchemaSource = (structure: DbSchemaStructure): string => {
  return createDbSchemaSource(structure);
};

const buildParsedTables = (source: string): ParsedTable[] => {
  const tables = parseTables(source);
  const usedTableVars = new Set<string>();
  const usedTableClasses = new Set<string>();
  const parsed: ParsedTable[] = [];

  for (const table of tables) {
    const tableVarBase = toSafeIdentifier(toCamelCase(table.tableName), "table");
    const tableVar = makeUnique(tableVarBase, usedTableVars);
    const tableClassBase = toSafeIdentifier(toPascalCase(table.tableName), "Table");
    const tableClass = makeUnique(tableClassBase, usedTableClasses);
    const rawColumns = parseColumns(source, table.tableType);
    const usedColumns = new Set<string>();
    const columns = rawColumns.map((columnName) => {
      const propBase = toSafeIdentifier(toCamelCase(columnName), "column");
      const prop = makeUnique(propBase, usedColumns);
      return { name: columnName, prop };
    });
    parsed.push({ tableName: table.tableName, tableVar, tableClass, columns });
  }

  return parsed;
};

export async function generate(options: GenerateOptions): Promise<{ outputPath: string }> {
  const dbNameRaw = extractDbName(options.url);
  const outputPath = options.output ?? `./${dbNameRaw}.schema.ts`;
  const absoluteOutputPath = resolve(process.cwd(), outputPath);
  await mkdir(dirname(absoluteOutputPath), { recursive: true });

  const db = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: options.url,
      }),
    }),
  });

  const tempOutFile = resolve(process.cwd(), `.kysely-codegen-${Date.now()}.d.ts`);
  try {
    await generateTypes({
      db,
      dialect: new CodegenPostgresDialect(),
      camelCase: false,
      outFile: tempOutFile,
    });
    const generated = await readFile(tempOutFile, "utf8");
    const tables = buildParsedTables(generated);
    const structure: DbSchemaStructure = {
      dbName: dbNameRaw,
      tables: tables.map((table) => ({
        name: table.tableName,
        columns: table.columns.map((column) => column.name),
      })),
    };
    const schemaSource = buildSchemaSource(structure);
    await writeFile(absoluteOutputPath, schemaSource, "utf8");
    return { outputPath: absoluteOutputPath };
  } finally {
    await db.destroy();
    await unlink(tempOutFile).catch(() => undefined);
  }
}
