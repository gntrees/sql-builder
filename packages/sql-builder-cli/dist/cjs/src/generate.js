"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
const kysely_codegen_1 = require("kysely-codegen");
const kysely_1 = require("kysely");
const pg_1 = require("pg");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const db_schema_writer_js_1 = require("./utils/db-schema-writer.js");
const DEFAULT_DB_NAME = "DbName";
const extractDbName = (urlValue) => {
    try {
        const url = new URL(urlValue);
        const path = url.pathname.replace(/^\/+/, "");
        const dbName = path.split("/")[0] ?? "";
        return dbName || DEFAULT_DB_NAME;
    }
    catch {
        return DEFAULT_DB_NAME;
    }
};
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
const makeUnique = (value, used) => {
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
const getInterfaceBlock = (source, name) => {
    const pattern = new RegExp(`export\\s+interface\\s+${name}\\s*\\{([\\s\\S]*?)\\}`, "m");
    const match = source.match(pattern);
    return match?.[1] ?? null;
};
const parseInterfaceProperties = (block) => {
    const properties = [];
    const lines = block.split("\n");
    for (const line of lines) {
        const match = line.match(/^\s*([A-Za-z0-9_]+|'[^']+'|"[^"]+")\??:\s*([^;]+);/);
        const rawKey = match?.[1];
        const rawType = match?.[2];
        if (!rawKey || !rawType)
            continue;
        const key = rawKey.replace(/^['"]|['"]$/g, "");
        properties.push({ key, type: rawType.trim() });
    }
    return properties;
};
const parseTables = (source) => {
    const dbBlock = getInterfaceBlock(source, "DB");
    if (!dbBlock)
        return [];
    const props = parseInterfaceProperties(dbBlock);
    return props
        .map((prop) => {
        const typeMatch = prop.type.match(/([A-Za-z0-9_]+)/);
        const tableType = typeMatch?.[1] ?? "";
        return tableType ? { tableName: prop.key, tableType } : null;
    })
        .filter((item) => Boolean(item));
};
const parseColumns = (source, tableType) => {
    const tableBlock = getInterfaceBlock(source, tableType);
    if (!tableBlock)
        return [];
    return parseInterfaceProperties(tableBlock).map((prop) => prop.key);
};
const buildSchemaSource = (structure) => {
    return (0, db_schema_writer_js_1.createDbSchemaSource)(structure);
};
const buildParsedTables = (source) => {
    const tables = parseTables(source);
    const usedTableVars = new Set();
    const usedTableClasses = new Set();
    const parsed = [];
    for (const table of tables) {
        const tableVarBase = toSafeIdentifier(toCamelCase(table.tableName), "table");
        const tableVar = makeUnique(tableVarBase, usedTableVars);
        const tableClassBase = toSafeIdentifier(toPascalCase(table.tableName), "Table");
        const tableClass = makeUnique(tableClassBase, usedTableClasses);
        const rawColumns = parseColumns(source, table.tableType);
        const usedColumns = new Set();
        const columns = rawColumns.map((columnName) => {
            const propBase = toSafeIdentifier(toCamelCase(columnName), "column");
            const prop = makeUnique(propBase, usedColumns);
            return { name: columnName, prop };
        });
        parsed.push({ tableName: table.tableName, tableVar, tableClass, columns });
    }
    return parsed;
};
async function generate(options) {
    const dbNameRaw = extractDbName(options.url);
    const outputPath = options.output ?? `./${dbNameRaw}.schema.ts`;
    const absoluteOutputPath = (0, path_1.resolve)(process.cwd(), outputPath);
    await (0, promises_1.mkdir)((0, path_1.dirname)(absoluteOutputPath), { recursive: true });
    const db = new kysely_1.Kysely({
        dialect: new kysely_1.PostgresDialect({
            pool: new pg_1.Pool({
                connectionString: options.url,
            }),
        }),
    });
    const tempOutFile = (0, path_1.resolve)(process.cwd(), `.kysely-codegen-${Date.now()}.d.ts`);
    try {
        await (0, kysely_codegen_1.generate)({
            db: db,
            dialect: new kysely_codegen_1.PostgresDialect(),
            camelCase: false,
            outFile: tempOutFile,
        });
        const generated = await (0, promises_1.readFile)(tempOutFile, "utf8");
        const tables = buildParsedTables(generated);
        const structure = {
            dbName: dbNameRaw,
            tables: tables.map((table) => ({
                name: table.tableName,
                columns: table.columns.map((column) => column.name),
            })),
        };
        const schemaSource = buildSchemaSource(structure);
        await (0, promises_1.writeFile)(absoluteOutputPath, schemaSource, "utf8");
        return { outputPath: absoluteOutputPath };
    }
    finally {
        await db.destroy();
        await (0, promises_1.unlink)(tempOutFile).catch(() => undefined);
    }
}
