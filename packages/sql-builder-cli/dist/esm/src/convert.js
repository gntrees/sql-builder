import prettier from "prettier/standalone";
import parserTypescript from "prettier/plugins/typescript";
import parserEstree from "prettier/plugins/estree";
// import { parse } from 'pgsql-parser';
import { parse } from 'pgsql-parser';
import { functionListToString } from './utils/stringifiers.js';
import { resolveNode } from './utils/resolvers.js';
const MOCK_EXEC_HANDLER_BODY = "return { sql, parameters };";
const MOCK_FORMAT_PARAM_HANDLER = "pg";
const extractQueryBuildingPart = async (code) => {
    const lines = code.split("\n");
    let queryBuildingPart = "";
    let inQueryBuilding = false;
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("const query = q") ||
            (inQueryBuilding && (trimmedLine.startsWith(".select") || trimmedLine.startsWith("q.select")))) {
            inQueryBuilding = true;
        }
        if (inQueryBuilding) {
            queryBuildingPart += line + "\n";
        }
        if (trimmedLine.startsWith("console.log")) {
            break;
        }
    }
    queryBuildingPart = queryBuildingPart.replace(/console\.log\(query\.getSql\(\)\);?\n?/g, "");
    return queryBuildingPart.trim();
};
const DEFAULT_FORMAT_PARAM_HANDLER = 'pg';
const DEFAULT_EXEC_HANDLER = `async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
}`;
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
const normalizeSqlIdentifier = (value) => {
    return value.replace(/"/g, "").trim();
};
const stripTemplateLiteral = (value) => {
    const trimmed = value.trim();
    if (trimmed.startsWith("`") && trimmed.endsWith("`")) {
        return trimmed.slice(1, -1);
    }
    return trimmed;
};
const stripSchemaPrefix = (value) => {
    const normalized = normalizeSqlIdentifier(value);
    const parts = normalized.split(".");
    return parts[parts.length - 1] ?? normalized;
};
const parseTableName = (rawName) => {
    const cleaned = normalizeSqlIdentifier(stripTemplateLiteral(rawName));
    const parts = cleaned.split(".");
    if (parts.length >= 2) {
        return parts.slice(1).join(".");
    }
    return cleaned;
};
const parseDbName = (rawName) => {
    const cleaned = normalizeSqlIdentifier(stripTemplateLiteral(rawName));
    const parts = cleaned.split(".");
    if (parts.length >= 2) {
        return parts[0] || undefined;
    }
    return undefined;
};
const parseColumnRef = (rawColumn) => {
    const cleaned = normalizeSqlIdentifier(stripTemplateLiteral(rawColumn));
    if (!cleaned || cleaned === "*") {
        return {};
    }
    const parts = cleaned.split(".").filter(Boolean);
    if (parts.length >= 2) {
        const column = parts[parts.length - 1];
        const table = parts[parts.length - 2];
        return { table, column };
    }
    if (parts.length === 1) {
        return { column: parts[0] };
    }
    return {};
};
const extractStringArguments = (args) => {
    return args.flatMap((arg) => {
        if (typeof arg === "string")
            return [arg];
        if (Array.isArray(arg))
            return extractStringArguments(arg);
        if (arg && typeof arg === "object" && "name" in arg) {
            const named = arg;
            if (named.paramType === "string" && typeof named.name === "string") {
                return [named.name];
            }
            if (named.paramType === "template-literal" && Array.isArray(arg.arguments)) {
                const parts = arg.arguments.filter((item) => typeof item === "string");
                if (parts.length > 0) {
                    return [parts.join("")];
                }
            }
        }
        return [];
    });
};
const extractFunctionArguments = (args) => {
    return args.flatMap((arg) => {
        if (Array.isArray(arg))
            return extractFunctionArguments(arg);
        if (arg && typeof arg === "object" && "paramType" in arg && arg.paramType === "function") {
            return [arg];
        }
        return [];
    });
};
const inferDbSchemaStructure = (functionList) => {
    let dbName = DEFAULT_DB_NAME;
    const tables = [];
    const tableMap = new Map();
    const aliasMap = new Map();
    let lastTableName = null;
    const pendingColumns = [];
    const pendingQualified = new Map();
    const visitFunction = (fn) => {
        if (fn.paramType !== "function")
            return;
        if (fn.name === "t") {
            const values = extractStringArguments(fn.arguments);
            const raw = values[0];
            if (!raw)
                return;
            const tableName = parseTableName(raw);
            const maybeDbName = parseDbName(raw);
            if (maybeDbName) {
                dbName = maybeDbName;
            }
            lastTableName = tableName;
            if (!tableMap.has(tableName)) {
                tableMap.set(tableName, { name: tableName, columns: new Set() });
            }
            if (pendingColumns.length > 0) {
                const entry = tableMap.get(tableName);
                if (entry) {
                    pendingColumns.forEach((column) => entry.columns.add(column));
                }
                pendingColumns.length = 0;
            }
            const pendingForTable = pendingQualified.get(tableName);
            if (pendingForTable && pendingForTable.size > 0) {
                const entry = tableMap.get(tableName);
                if (entry) {
                    pendingForTable.forEach((column) => entry.columns.add(column));
                }
                pendingQualified.delete(tableName);
            }
        }
        if (fn.name === "as") {
            const values = extractStringArguments(fn.arguments);
            const aliasValue = values[0];
            if (!aliasValue)
                return;
            if (lastTableName) {
                aliasMap.set(aliasValue, lastTableName);
                const entry = tableMap.get(lastTableName);
                if (entry) {
                    entry.alias = aliasValue;
                }
            }
            const pendingForAlias = pendingQualified.get(aliasValue);
            if (pendingForAlias && pendingForAlias.size > 0 && lastTableName) {
                const entry = tableMap.get(lastTableName);
                if (entry) {
                    pendingForAlias.forEach((column) => entry.columns.add(column));
                }
                pendingQualified.delete(aliasValue);
            }
        }
        if (fn.name === "c") {
            const values = extractStringArguments(fn.arguments);
            const raw = values[0];
            if (!raw)
                return;
            const { table, column } = parseColumnRef(raw);
            if (!column)
                return;
            let targetTable = table;
            if (targetTable && aliasMap.has(targetTable)) {
                targetTable = aliasMap.get(targetTable);
            }
            if (!targetTable && lastTableName) {
                targetTable = lastTableName;
            }
            if (!targetTable) {
                pendingColumns.push(column);
                return;
            }
            if (table) {
                if (tableMap.has(targetTable)) {
                    tableMap.get(targetTable)?.columns.add(column);
                }
                else {
                    const pendingSet = pendingQualified.get(table) ?? new Set();
                    pendingSet.add(column);
                    pendingQualified.set(table, pendingSet);
                }
                return;
            }
            if (!tableMap.has(targetTable)) {
                tableMap.set(targetTable, { name: targetTable, columns: new Set() });
            }
            tableMap.get(targetTable)?.columns.add(column);
        }
        const nestedFunctions = extractFunctionArguments(fn.arguments);
        for (const nested of nestedFunctions) {
            visitFunction(nested);
        }
    };
    for (const fn of functionList) {
        visitFunction(fn);
    }
    if (pendingColumns.length > 0) {
        if (tableMap.size === 1) {
            const entry = Array.from(tableMap.values())[0];
            if (entry) {
                pendingColumns.forEach((column) => entry.columns.add(column));
            }
        }
        pendingColumns.length = 0;
    }
    if (pendingQualified.size > 0) {
        for (const [tableName, columns] of pendingQualified.entries()) {
            const resolvedTable = aliasMap.get(tableName) ?? tableName;
            if (tableMap.has(resolvedTable)) {
                const entry = tableMap.get(resolvedTable);
                if (entry) {
                    columns.forEach((column) => entry.columns.add(column));
                }
            }
        }
        pendingQualified.clear();
    }
    for (const entry of tableMap.values()) {
        tables.push({
            name: entry.name,
            alias: entry.alias,
            columns: Array.from(entry.columns),
        });
    }
    tables.sort((a, b) => a.name.localeCompare(b.name));
    for (const table of tables) {
        table.columns.sort((a, b) => a.localeCompare(b));
    }
    return { dbName, tables };
};
const buildTableMetadata = (structure) => {
    const usedTableVars = new Set();
    const usedTableClasses = new Set();
    return structure.tables.map((table) => {
        const tableVarBase = toSafeIdentifier(toCamelCase(stripSchemaPrefix(table.name)), "table");
        const tableVar = makeUnique(tableVarBase, usedTableVars);
        const tableClassBase = toSafeIdentifier(toPascalCase(stripSchemaPrefix(table.name)), "Table");
        const tableClass = makeUnique(tableClassBase, usedTableClasses);
        const usedColumns = new Set();
        const columns = table.columns.map((columnName) => {
            const propBase = toSafeIdentifier(toCamelCase(columnName), "column");
            const prop = makeUnique(propBase, usedColumns);
            return { name: columnName, prop };
        });
        return { name: table.name, tableVar, tableClass, columns };
    });
};
const applySchemaInjection = (queryBuilderChain, structure) => {
    const tableMeta = buildTableMetadata(structure);
    const tableVarMap = new Map();
    const columnMap = new Map();
    const aliasMap = new Map();
    for (const table of structure.tables) {
        if (table.alias) {
            aliasMap.set(table.alias, table.name);
        }
    }
    for (const table of tableMeta) {
        tableVarMap.set(table.name, table.tableVar);
        const colMap = new Map();
        for (const column of table.columns) {
            colMap.set(column.name, column.prop);
        }
        columnMap.set(table.name, colMap);
    }
    const findTableForColumn = (column) => {
        const matches = tableMeta.filter((table) => table.columns.some((col) => col.name === column));
        if (matches.length === 1)
            return matches[0]?.name;
        return undefined;
    };
    const resolveTableVar = (rawTable) => {
        const tableName = parseTableName(rawTable);
        if (tableVarMap.has(tableName)) {
            return tableVarMap.get(tableName);
        }
        if (aliasMap.has(tableName)) {
            const resolved = aliasMap.get(tableName);
            if (resolved && tableVarMap.has(resolved)) {
                return tableVarMap.get(resolved);
            }
            return undefined;
        }
        return undefined;
    };
    const resolveColumnRef = (rawColumn) => {
        const { table, column } = parseColumnRef(rawColumn);
        if (!column)
            return {};
        let tableName = table;
        if (tableName) {
            if (aliasMap.has(tableName)) {
                tableName = aliasMap.get(tableName);
            }
            else if (!tableVarMap.has(tableName)) {
                return {};
            }
        }
        else {
            tableName = findTableForColumn(column);
        }
        if (!tableName)
            return {};
        const tableVar = tableVarMap.get(tableName);
        const columnProp = columnMap.get(tableName)?.get(column);
        if (!tableVar || !columnProp)
            return {};
        return { tableVar, columnProp };
    };
    let chain = queryBuilderChain;
    chain = chain.replace(/q\.t\(`([^`]*)`\)(?=\.)/g, (match, raw) => {
        const tableVar = resolveTableVar(raw);
        if (!tableVar)
            return match;
        return `q.t(${tableVar})`;
    });
    chain = chain.replace(/q\.t\(`([^`]*)`\)(?!\.)/g, (match, raw) => {
        const tableVar = resolveTableVar(raw);
        return tableVar ?? match;
    });
    chain = chain.replace(/q\.c\(`([^`]*)`\)(?=\.)/g, (match, raw) => {
        const resolved = resolveColumnRef(raw);
        if (!resolved.tableVar || !resolved.columnProp)
            return match;
        return `q.c(${resolved.tableVar}.${resolved.columnProp})`;
    });
    chain = chain.replace(/q\.c\(`([^`]*)`\)(?!\.)/g, (match, raw) => {
        const resolved = resolveColumnRef(raw);
        if (!resolved.tableVar || !resolved.columnProp)
            return match;
        return `${resolved.tableVar}.${resolved.columnProp}`;
    });
    return { chain, imports: tableMeta.map((table) => table.tableVar) };
};
export async function convert(sql, options = {}) {
    // await loadModule();
    const ast = await parse(sql);
    const functionList = [];
    for (const [i, stmt] of ast.stmts.entries()) {
        if (stmt.stmt) {
            const nodes = resolveNode({ RawStmt: stmt });
            functionList.push(...nodes);
            // if (options.testName == 'query-builder-83') {
            //     const normalized = normalizeLocationsNode(ast,sql);
            //     write('src/generated/normalized.json', JSON.stringify(normalized,null,2));
            //     // console.log(JSON.stringify(normalized,null,2));
            // }
            if (i !== ast.stmts.length - 1) {
                functionList.push({
                    name: 'sc',
                    arguments: [],
                    paramType: 'function'
                });
            }
        }
    }
    ;
    // await dumpTestResult({
    //     testName: "test",
    //     inputSql: sql,
    //     outputSql : deparseSync(ast),
    //     generatedCode: "",
    //     functionBody: "",
    //     rawInput:"",
    //     functionList,
    //     match: true,
    //     error: undefined,
    // });
    const baseQueryBuilder = 'q';
    const queryBuilderChain = `q${functionListToString(functionList, baseQueryBuilder)}`;
    let dbSchemaStructure;
    let chainForOutput = queryBuilderChain;
    if (options.dbSchema) {
        dbSchemaStructure = inferDbSchemaStructure(functionList);
    }
    if (options.dbSchema && dbSchemaStructure) {
        const { chain } = applySchemaInjection(chainForOutput, dbSchemaStructure);
        chainForOutput = chain;
    }
    let code = options.sqlSchema
        ? `import { sqlBuilder, sqlSchema } from "@gntrees/sql-builder/pg";

const q = sqlBuilder();
const sch = sqlSchema();
const schema = sch.set("query", sch
    .query(${chainForOutput}));
    
export default schema;`
        : `import { sqlBuilder } from "@gntrees/sql-builder/pg/builder";

const q = sqlBuilder();
const query = ${chainForOutput};

export default query;`;
    const formatted = await prettier.format(code, {
        parser: 'typescript',
        plugins: [parserTypescript, parserEstree],
    });
    return { code, formatted, functionList, options, dbSchemaStructure };
}
