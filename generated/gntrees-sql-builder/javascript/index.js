// parse() returns { sql: string, sqlWithParam: string, param: (string|number|boolean|null)[] }

// Auto-generated index for gntrees-sql-builder

// Auto-generated JavaScript method-chain types.
//
// JavaScript is dynamic, so there is no static type block to emit (unlike
// `base-types.ts`). The runtime contract is documented here instead.
//
// A schema is a plain nested object:
//
//     { schema: {
//         exportName: string,
//         importPaths: { language: string, ... },
//         chain: { chain: {
//             values: [...],
//             initFunction: { name: string, variableName: string },
//         } },
//     } }
//
// Each entry of `values` is one of:
//
//     { functionCall: { name: string, arguments: [Argument, ...],
//                       isTemplateLiteral: boolean } }
//     { propertyCall: { name: string } }
//     { copy: { structureName: string, chain: Chain } }
//
// An `Argument` is `{ argument: ArgumentValue, default: ArgumentValue | null }`.
// An `ArgumentValue` is a tagged object, one of:
//
//     { string: { value: string } }
//     { number: { value: number } }
//     { boolean: { value: boolean } }
//     { null: { value: null } }
//     { array: { value: [ArgumentValue, ...] } }
//     { object: { value: { key: ArgumentValue, ... } } }
//     { chain: Chain }
//
// Struct definitions used by the runtime mirror the TypeScript `StructType`
// (`array`/`object`/`string`/`number`/`boolean`/`null`/`union`/`map`/`literal`/
// `structureCall`), expressed as plain objects.



    // Auto-generated utils
    export const normalizeArgumentStructureCall = (arg) => {
        if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
            throw new Error("Expected a structure instance for structure calls, but got " + (arg === null ? "null" : Array.isArray(arg) ? "array" : typeof arg));
        } else if (arg instanceof SqlBuilder) {
                    return arg.getSchema().schema.chain
                 } else {
            throw new Error("Unknown structure call argument type");
         }
    }
    export function copy(source) {
        if (source instanceof SqlBuilder) {
                return makeCopy("sql-builder", source);
            } 
        throw new Error("copy() expects a structure instance created by an init function");
    }
    


export function createSchema(
    oldSchema,
    functionName,
    functionArgs,
    isTemplateLiteral
) {
    validateSchema(oldSchema);
    const newSchema = {
        schema: {
            ...oldSchema.schema,
            chain: {
                chain: {
                    values: [...oldSchema.schema.chain.chain.values],
                    initFunction: oldSchema.schema.chain.chain.initFunction,
                }
            }
        }
    };
    let args = [];
    if (isTemplateLiteral && functionArgs[0]) {
        const strings = functionArgs[0].arg;
        if (!Array.isArray(strings) || !strings.every(str => typeof str === "string")) {
            throw new Error(`Expected a template strings array for ${functionName}`);
        }
        const expressions = functionArgs.slice(1);
        if (expressions.length !== strings.length - 1) {
            throw new Error(`Template literal for ${functionName} expects ${strings.length - 1} expression(s), but got ${expressions.length}`);
        }
        const normalizedTemplateLiteralArgs = strings.reduce((acc, str, index) => {
            if (str) {
                acc.push({ argument: { string: { value: str } }, default: null });
            }
            if (index < expressions.length) {
                const expr = expressions[index];
                if (!expr) {
                    throw new Error(`Missing expression for template literal at index ${index}`);
                }
                acc.push({ argument: normalizeArgument(expr.arg, expr.struct), default: null });
            }
            return acc;
        }, []);
        args = normalizedTemplateLiteralArgs;
    } else {
        args = functionArgs.map((fa, index) => {
            if (fa.arg === undefined) {
                if (fa.provided) {
                    throw new Error(`Parameter "${functionName}" argument #${index + 1} cannot be undefined`);
                }
                if (fa.default !== undefined) {
                    validateDefault(fa.default, fa.struct);
                    return { argument: fa.default, default: fa.default };
                }
                throw new Error(`Parameter "${functionName}" argument #${index + 1} was not provided`);
            }
            const argument = normalizeArgument(fa.arg, fa.struct);
            if (fa.default !== undefined) validateDefault(fa.default, fa.struct);
            return { argument, default: fa.default ?? null };
        });
    }
    newSchema.schema.chain.chain.values.push({
        functionCall: {
            name: functionName,
            arguments: args,
            isTemplateLiteral: isTemplateLiteral,
        }
    })
    return newSchema;
}

export function createPropertyCallSchema(
    oldSchema,
    propertyName,
) {
    return {
        schema: {
            ...oldSchema.schema,
            chain: {
                chain: {
                    values: [
                        ...oldSchema.schema.chain.chain.values,
                        { propertyCall: { name: propertyName } },
                    ],
                    initFunction: oldSchema.schema.chain.chain.initFunction,
                },
            },
        },
    };
}

export function validateSchema(schema) {
    if (
        typeof schema !== "object" ||
        schema === null ||
        !schema.schema ||
        !schema.schema.chain ||
        !schema.schema.chain.chain ||
        !Array.isArray(schema.schema.chain.chain.values) ||
        !schema.schema.chain.chain.initFunction
    ) {
        throw new Error("Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction");
    }
}

function unwrapArgumentValue(val) {
    if ("string" in val) return val.string.value;
    if ("number" in val) return val.number.value;
    if ("boolean" in val) return val.boolean.value;
    if ("null" in val) return val.null.value;
    if ("array" in val) return val.array.value.map(unwrapArgumentValue);
    if ("object" in val) {
        const obj = {};
        for (const [key, value] of Object.entries(val.object.value)) {
            obj[key] = unwrapArgumentValue(value);
        }
        return obj;
    }
    if ("chain" in val) throw new Error("Cannot validate a chain default value at runtime");
    throw new Error("Unknown argument value type");
}

function validateDefault(defaultVal, struct) {
    normalizeArgument(unwrapArgumentValue(defaultVal), struct);
}

function normalizeArgument(arg, struct) {
    if ("array" in struct) {
        if (!Array.isArray(arg)) {
            throw new Error(`Expected an array argument, but got ${typeof arg}`);
        }
        if (arg.length === 0) {
            return { array: { value: [] } };
        }
        const itemType = struct.array.type;
        const normalizedItems = arg.map(item => normalizeArgument(item, itemType));
        if (normalizedItems[0] === undefined) throw new Error("Unexpected undefined value in array");
        return { array: { value: normalizedItems } };
    } else if ("object" in struct) {
        if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
            throw new Error(`Expected an object argument, but got ${typeof arg}`);
        }
        if (Object.keys(arg).length === 0 && Object.getPrototypeOf(arg) !== Object.prototype && Object.getPrototypeOf(arg) !== null) {
            throw new Error(`Expected a plain object argument, but got ${Object.prototype.toString.call(arg)}`);
        }
        const missingKeys = Object.keys(struct.object).filter(key => !Object.prototype.hasOwnProperty.call(arg, key));
        if (missingKeys.length > 0) {
            throw new Error(`Missing required key(s) "${missingKeys.join('", "')}" in object argument`);
        }
        const normalizedObject = Object.fromEntries(
            Object.entries(arg).map(([key, value]) => {
                if (!struct.object[key]) {
                    throw new Error(`Unexpected key "${key}" in object argument`);
                }
                const valueType = struct.object[key];
                return [key, normalizeArgument(value, valueType)];
            })
        );
        return { object: { value: normalizedObject } };
    } else if ("string" in struct) {
        if (typeof arg !== "string") {
            throw new Error(`Expected a string argument, but got ${typeof arg}`);
        }
        return { string: { value: arg } };
    } else if ("number" in struct) {
        if (typeof arg !== "number") {
            throw new Error(`Expected a number argument, but got ${typeof arg}`);
        }
        if (!Number.isFinite(arg)) {
            throw new Error(`Expected a finite number argument, but got ${arg}`);
        }
        return { number: { value: arg } };
    } else if ("boolean" in struct) {
        if (typeof arg !== "boolean") {
            throw new Error(`Expected a boolean argument, but got ${typeof arg}`);
        }
        return { boolean: { value: arg } };
    } else if ("null" in struct) {
        if (arg !== null) {
            throw new Error(`Expected a null argument, but got ${typeof arg}`);
        }
        return { null: { value: arg } };
    } else if ("union" in struct) {
        const reasons = [];
        const normalizedUnionTypes = struct.union.types.map(type => {
            try {
                return normalizeArgument(arg, type);
            } catch (e) {
                reasons.push(e instanceof Error ? e.message : String(e));
                return null;
            }
        }).filter(type => type !== null);
        if (normalizedUnionTypes.length === 0 || !(normalizedUnionTypes[0])) {
            throw new Error(`Argument does not match any type in the union: ${reasons.join(" | ")}`);
        }
        if (normalizedUnionTypes.length > 1) {
            if (Array.isArray(arg) && arg.length === 0) {
                return normalizedUnionTypes[0];
            }
            throw new Error(`Argument matches multiple types in the union, which is ambiguous`);
        }
        return normalizedUnionTypes[0];
    } else if ("map" in struct) {
        if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
            throw new Error(`Expected an object argument for map type, but got ${typeof arg}`);
        }
        if (Object.keys(arg).length === 0 && Object.getPrototypeOf(arg) !== Object.prototype && Object.getPrototypeOf(arg) !== null) {
            throw new Error(`Expected a plain object argument for map type, but got ${Object.prototype.toString.call(arg)}`);
        }
        const normalizedMap = Object.fromEntries(
            Object.entries(arg).map(([key, value]) => [key, normalizeArgument(value, struct.map.type)])
        );
        return { object: { value: normalizedMap } };
    } else if ("structureCall" in struct) {
        const normalizedArgumentStructureCall = normalizeArgumentStructureCall(arg);
        return normalizedArgumentStructureCall;
    } else if ("literal" in struct) {
        const expected = struct.literal.value;
        if (struct.literal.type === "string") {
            if (typeof arg !== "string") {
                throw new Error(`Expected a string literal argument, but got ${typeof arg}`);
            }
            if (arg !== expected) {
                throw new Error(`Expected string literal ${JSON.stringify(expected)}, but got ${JSON.stringify(arg)}`);
            }
            return { string: { value: arg } };
        } else if (struct.literal.type === "number") {
            if (typeof arg !== "number") {
                throw new Error(`Expected a number literal argument, but got ${typeof arg}`);
            }
            if (!Number.isFinite(arg)) {
                throw new Error(`Expected a finite number argument, but got ${arg}`);
            }
            if (arg !== expected) {
                throw new Error(`Expected number literal ${expected}, but got ${arg}`);
            }
            return { number: { value: arg } };
        } else {
            if (typeof arg !== "boolean") {
                throw new Error(`Expected a boolean literal argument, but got ${typeof arg}`);
            }
            if (arg !== expected) {
                throw new Error(`Expected boolean literal ${expected}, but got ${arg}`);
            }
            return { boolean: { value: arg } };
        }
    } else {
        throw new Error("Unsupported struct type in normalizeArgument");
    }
}

export function makeCopy(structureName, source) {
    const schema = source.getSchema();
    validateSchema(schema);
    return {
        copy: {
            structureName,
            chain: schema.schema.chain,
        },
    };
}

export function applyCopies(schema, copies, targetStructureName) {
    if (!copies || copies.length === 0) return;
    for (const cp of copies) {
        if (
            typeof cp !== "object" ||
            cp === null ||
            !("copy" in cp) ||
            typeof cp.copy?.structureName !== "string" ||
            typeof cp.copy?.chain !== "object" ||
            cp.copy?.chain === null
        ) {
            throw new Error("Invalid builder argument in init function: wrap the structure with copy(...)");
        }
        if (cp.copy.structureName !== targetStructureName) {
            throw new Error(`Cannot copy builder of structure '${cp.copy.structureName}' into '${targetStructureName}'`);
        }
        const value = {
            copy: {
                structureName: cp.copy.structureName,
                chain: cp.copy.chain,
            },
        };
        schema.schema.chain.chain.values.push(value);
    }
}


// Auto-generated definition for sql-builder

            // Auto-generated definition for sql-builder
            export class SqlBuilder {
            schemaSqlBuilder = {
                schema: {
                    exportName: "schema",
                    importPaths: {"typescript":"../../../gntrees-sql-builder/typescript/index"},
                    chain: {
                        chain: {
                            values: [],
                            initFunction: {
                                name: "sql-builder",
                                variableName: "s1"
                            },
                        }
                    }
                }
            }
            getSchema(exportName, importPaths) {
                if (exportName !== undefined && typeof exportName !== "string") {
                    throw new Error(`getSchema exportName must be a string, but got ${typeof exportName}`);
                }
                if (importPaths !== undefined && (typeof importPaths !== "object" || importPaths === null || Array.isArray(importPaths))) {
                    throw new Error(`getSchema importPaths must be an object, but got ${typeof importPaths}`);
                }
                if (exportName) { this.schemaSqlBuilder.schema.exportName = exportName }
                if (importPaths) { this.schemaSqlBuilder.schema.importPaths = { ...this.schemaSqlBuilder.schema.importPaths, ...importPaths } }
                return this.schemaSqlBuilder;
            }
            initFromStructure(schema) {
                validateSchema(schema);
                this.schemaSqlBuilder = schema;
                return this;
            }
            initFromInitFunction(initFunction, copies) {
                if (typeof initFunction !== "object" || initFunction === null || typeof initFunction.name !== "string" || typeof initFunction.variableName !== "string") {
                    throw new Error("Invalid init function");
                }
                this.schemaSqlBuilder.schema.chain.chain.initFunction = initFunction;
                applyCopies(this.schemaSqlBuilder, copies, "sql-builder");
                return this;
            }
        select(columns) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "select", [{ arg: columns, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}},{"map":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
from(table) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "from", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
transaction(transaction) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "transaction", [{ arg: transaction, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
orderBy(columns) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "orderBy", [{ arg: columns, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
limit(count) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "limit", [{ arg: count, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
offset(count) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "offset", [{ arg: count, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
with(statement, as) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "with", [{ arg: statement, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: as, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
groupBy(columns) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "groupBy", [{ arg: columns, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
having(statement) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "having", [{ arg: statement, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
where(statement) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "where", [{ arg: statement, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
update(table, set) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "update", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: set, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"map":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 2 }], false))
                }
set(statement) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "set", [{ arg: statement, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"map":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
insert(table, set) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "insert", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: set, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"map":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 2 }], false))
                }
values(values) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "values", [{ arg: values, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}},{"array":{"type":{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}}}]}}, provided: arguments.length >= 1 }], false))
                }
returning(columns) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "returning", [{ arg: columns, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}},{"map":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
onConflictDoNothing(target) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "onConflictDoNothing", [{ arg: target, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
onConflictDoUpdate(target, set) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "onConflictDoUpdate", [{ arg: target, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: set, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"map":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 2 }], false))
                }
delete(table) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "delete", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
join(table, on) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "join", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: on, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
leftJoin(table, on) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "leftJoin", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: on, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
rightJoin(table, on) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "rightJoin", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: on, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
innerJoin(table, on) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "innerJoin", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: on, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
fullJoin(table, on) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "fullJoin", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: on, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
crossJoin(table, on) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "crossJoin", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: on, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
eq(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "eq", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
gt(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "gt", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
gte(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "gte", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
lt(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "lt", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
lte(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "lte", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
exists(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "exists", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
isNull() {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "isNull", [], false))
                }
isNotNull() {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "isNotNull", [], false))
                }
in(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "in", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
between(first, second) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "between", [{ arg: first, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: second, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
like(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "like", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
ilike(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "ilike", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
not(value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "not", [{ arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
and(values) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "and", [{ arg: values, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
or(values) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "or", [{ arg: values, struct: {"union":{"types":[{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}},{"array":{"type":{"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}}}]}}, provided: arguments.length >= 1 }], false))
                }
op(operation, value) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "op", [{ arg: operation, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }, { arg: value, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 2 }], false))
                }
raw(strings, ...args) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "raw", [{ arg: strings, struct: { string: { type: 'string' } } }, ...args.map(arg => { return { arg: arg, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}} }})], true))
                }
asc() {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "asc", [], false))
                }
desc() {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "desc", [], false))
                }
as(alias) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "as", [{ arg: alias, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
col(column) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "col", [{ arg: column, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
table(table) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "table", [{ arg: table, struct: {"union":{"types":[{"string":{"type":"string"}},{"number":{"type":"number"}},{"boolean":{"type":"boolean"}},{"structureCall":{"name":"sql-builder"}}]}}, provided: arguments.length >= 1 }], false))
                }
setDialect(db) {
                    return (new SqlBuilder())
                                .initFromStructure(createSchema(this.getSchema(), "setDialect", [{ arg: db, struct: {"union":{"types":[{"literal":{"value":"postgres","type":"string"}},{"literal":{"value":"mysql","type":"string"}},{"literal":{"value":"sqlite","type":"string"}},{"literal":{"value":"single-store","type":"string"}},{"literal":{"value":"mssql","type":"string"}},{"literal":{"value":"cockroach","type":"string"}}]}}, provided: arguments.length >= 1 }], false))
                }
parse() {
const root = this.getSchema();
let dialect = "";
let quote = "";
let sql = [];
let wsql = [];
let params = [];
let orderSql = "";
let orderW = "";
let hasOrder = false;
let tmp = "";
let tmp2 = "";
let tmpRef = "";
let subAlias = "";
let withFirst = true;
function normName(n) {
  return n.replaceAll("-", "").toLowerCase();
}
function pushSql(text) {
  sql = (sql.push(" "), sql);
  sql = (sql.push(text), sql);
  return null;
}
function pushW(text) {
  wsql = (wsql.push(" "), wsql);
  wsql = (wsql.push(text), wsql);
  return null;
}
function asString(arg) {
  return arg["string"]["value"];
}
function identStr(name) {
  let escapedName = name.replaceAll(quote, (quote + quote));
  let qualifiedName = escapedName.replaceAll(".", (quote + ("." + quote)));
  return (quote + (qualifiedName + quote));
}
function literalOf(arg) {
  let outLiteral = "";
  if (!!(Object.prototype.hasOwnProperty.call(arg, "string"))) {
    outLiteral = ("'" + (asString(arg).replaceAll("'", "''") + "'"));
  }
  else if (!!(Object.prototype.hasOwnProperty.call(arg, "number"))) {
    outLiteral = String(arg["number"]["value"]);
  }
  else if (!!(Object.prototype.hasOwnProperty.call(arg, "boolean"))) {
    if (!!(arg["boolean"]["value"])) {
      outLiteral = "TRUE";
    }
    else {
      outLiteral = "FALSE";
    }
  }
  else {
    outLiteral = "NULL";
  }
  return outLiteral;
}
function opOf(n) {
  let o = "";
  if (n === "eq") {
    o = "=";
  }
  else if (n === "gt") {
    o = ">";
  }
  else if (n === "gte") {
    o = ">=";
  }
  else if (n === "lt") {
    o = "<";
  }
  else if (n === "lte") {
    o = "<=";
  }
  else if (n === "like") {
    o = "LIKE";
  }
  else if (n === "ilike") {
    if (dialect === "postgres") {
      o = "ILIKE";
    }
    else {
      o = "LIKE";
    }
  }
  return o;
}
function itemsOf(arg) {
  if (!!(Object.prototype.hasOwnProperty.call(arg, "array"))) {
    return arg["array"]["value"];
  }
  return [...[], arg];
}
function isRef(chainValues) {
  tmpRef = "";
  if ((chainValues.length === 1) && !!(Object.prototype.hasOwnProperty.call(chainValues[0], "functionCall"))) {
    let firstName = chainValues[0]["functionCall"]["name"];
    if ((firstName === "col") || (firstName === "table")) {
      tmpRef = asString(chainValues[0]["functionCall"]["arguments"][0]["argument"]);
    }
  }
  return tmpRef;
}
function emitParam(arg) {
  params = (params.push(arg), params);
  if (dialect === "postgres") {
    tmp = ("$" + String(params.length));
  }
  else {
    tmp = "?";
  }
  pushSql(tmp);
  tmp2 = literalOf(arg);
  pushW(tmp2);
  return null;
}
function emitIdent(name) {
  tmp = identStr(name);
  pushSql(tmp);
  pushW(tmp);
  return null;
}
function emitRaw(node) {
  if (sql.length !== 0) {
    sql = (sql.push(" "), sql);
    wsql = (wsql.push(" "), wsql);
  }
  for (const rawArg of node["functionCall"]["arguments"]) {
    let rawVal = rawArg["argument"];
    if (!!(Object.prototype.hasOwnProperty.call(rawVal, "string"))) {
      sql = (sql.push(asString(rawVal)), sql);
      wsql = (wsql.push(asString(rawVal)), wsql);
    }
    else if (!!(Object.prototype.hasOwnProperty.call(rawVal, "chain"))) {
      tmpRef = isRef(rawVal["chain"]["values"]);
      if (tmpRef !== "") {
        sql = (sql.push(identStr(tmpRef)), sql);
        wsql = (wsql.push(identStr(tmpRef)), wsql);
      }
      else {
        params = (params.push(rawVal), params);
        if (dialect === "postgres") {
          tmp = ("$" + String(params.length));
        }
        else {
          tmp = "?";
        }
        sql = (sql.push(tmp), sql);
        tmp2 = literalOf(rawVal);
        wsql = (wsql.push(tmp2), wsql);
      }
    }
    else {
      params = (params.push(rawVal), params);
      if (dialect === "postgres") {
        tmp = ("$" + String(params.length));
      }
      else {
        tmp = "?";
      }
      sql = (sql.push(tmp), sql);
      tmp2 = literalOf(rawVal);
      wsql = (wsql.push(tmp2), wsql);
    }
  }
  return null;
}
function conflictTarget(arg) {
  let ct = "()";
  if (!!(Object.prototype.hasOwnProperty.call(arg, "chain"))) {
    tmpRef = isRef(arg["chain"]["values"]);
    if (tmpRef !== "") {
      ct = ("(" + (identStr(tmpRef) + ")"));
    }
  }
  else if (!!(Object.prototype.hasOwnProperty.call(arg, "string"))) {
    ct = ("(" + (identStr(asString(arg)) + ")"));
  }
  return ct;
}
function firstKind(chainValues) {
  let kind = "";
  if ((chainValues.length !== 0) && !!(Object.prototype.hasOwnProperty.call(chainValues[0], "functionCall"))) {
    kind = normName(chainValues[0]["functionCall"]["name"]);
  }
  return kind;
}
function emitOrderItem(item) {
  let dir = "";
  let ordName = "";
  if (!!(Object.prototype.hasOwnProperty.call(item, "chain"))) {
    for (const on of item["chain"]["values"]) {
      let onn = normName(on["functionCall"]["name"]);
      if (onn === "asc") {
        dir = " ASC";
      }
      else if (onn === "desc") {
        dir = " DESC";
      }
      else if ((onn === "col") || (onn === "table")) {
        ordName = asString(on["functionCall"]["arguments"][0]["argument"]);
      }
    }
  }
  if (ordName !== "") {
    tmp = identStr(ordName);
    orderSql = (orderSql + (tmp + dir));
    orderW = (orderW + (tmp + dir));
  }
  return null;
}
function emitOrderList(arg) {
  let firstOrder = true;
  for (const item of itemsOf(arg)) {
    if (firstOrder === false) {
      orderSql = (orderSql + ", ");
      orderW = (orderW + ", ");
    }
    firstOrder = false;
    emitOrderItem(item);
  }
  return null;
}
function flushOrder() {
  if (!!(hasOrder)) {
    pushSql("ORDER");
    pushSql("BY");
    pushW("ORDER");
    pushW("BY");
    tmp = orderSql;
    if (tmp !== "") {
      pushSql(tmp);
    }
    tmp2 = orderW;
    if (tmp2 !== "") {
      pushW(tmp2);
    }
    hasOrder = false;
  }
  return null;
}
for (const dialectNode of root["schema"]["chain"]["chain"]["values"]) {
  if (normName(dialectNode["functionCall"]["name"]) === "setdialect") {
    dialect = dialectNode["functionCall"]["arguments"][0]["argument"]["string"]["value"];
  }
}
if (dialect === "") {
  throw new Error(String("sql-builder parse: setDialect(...) must be called before parse()"));
}
else if ((dialect !== "postgres") && (dialect !== "mysql")) {
  throw new Error(String(("sql-builder parse: unsupported dialect " + dialect)));
}
if (dialect === "mysql") {
  quote = "`";
}
else {
  quote = "\"";
}
function renderNodes(nodes, mode) {
  let savedSql = "";
  let savedW = "";
  let savedOrderSql = "";
  let savedOrderW = "";
  let savedHasOrder = false;
  let savedAlias = "";
  let subSql = "";
  let subW = "";
  let subAliasText = "";
  let first = true;
  let left = "";
  let hasLeft = false;
  let base = "";
  if (mode === 0) {
    for (const node of nodes) {
      if (!!(Object.prototype.hasOwnProperty.call(node, "functionCall"))) {
        let name = node["functionCall"]["name"];
        let nameNorm = normName(name);
        if (nameNorm === "setdialect") {
          continue;
        }
        else if ((nameNorm === "asc") || (nameNorm === "desc")) {
          if (!!(hasOrder)) {
            tmp = nameNorm.toUpperCase();
            orderSql = (orderSql + (" " + tmp));
            orderW = (orderW + (" " + tmp));
          }
        }
        else {
          if (nameNorm === "with") {
            savedSql = sql;
            savedW = wsql;
            savedOrderSql = orderSql;
            savedOrderW = orderW;
            savedHasOrder = hasOrder;
            sql = [];
            wsql = [];
            orderSql = "";
            orderW = "";
            hasOrder = false;
            renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
            subSql = sql.join("").trim();
            subW = wsql.join("").trim();
            sql = savedSql;
            wsql = savedW;
            orderSql = savedOrderSql;
            orderW = savedOrderW;
            hasOrder = savedHasOrder;
            if (withFirst === false) {
              sql = (sql.push(","), sql);
              wsql = (wsql.push(","), wsql);
            }
            else {
              withFirst = false;
              pushSql("WITH");
              pushW("WITH");
            }
            pushSql(identStr(asString(node["functionCall"]["arguments"][1]["argument"])));
            pushW(identStr(asString(node["functionCall"]["arguments"][1]["argument"])));
            pushSql("AS");
            pushW("AS");
            pushSql(("(" + (subSql + ")")));
            pushW(("(" + (subW + ")")));
          }
          else if (nameNorm === "transaction") {
            pushSql("BEGIN");
            pushW("BEGIN");
            sql = (sql.push(";"), sql);
            wsql = (wsql.push(";"), wsql);
            let txnFirst = true;
            for (const txnItem of itemsOf(node["functionCall"]["arguments"][0]["argument"])) {
              if (txnFirst === false) {
                sql = (sql.push(";"), sql);
                wsql = (wsql.push(";"), wsql);
              }
              txnFirst = false;
              if (!!(Object.prototype.hasOwnProperty.call(txnItem, "chain"))) {
                renderNodes(txnItem["chain"]["values"], 0);
              }
              else if (!!(Object.prototype.hasOwnProperty.call(txnItem, "string"))) {
                pushSql(asString(txnItem));
                pushW(asString(txnItem));
              }
              else {
                if (!!(Object.prototype.hasOwnProperty.call(txnItem, "chain"))) {
                  tmpRef = isRef(txnItem["chain"]["values"]);
                  if (tmpRef !== "") {
                    emitIdent(tmpRef);
                  }
                  else if (((firstKind(txnItem["chain"]["values"]) === "select") || (firstKind(txnItem["chain"]["values"]) === "with")) || ((firstKind(txnItem["chain"]["values"]) === "values") || ((firstKind(txnItem["chain"]["values"]) === "insert") || ((firstKind(txnItem["chain"]["values"]) === "update") || (firstKind(txnItem["chain"]["values"]) === "delete"))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = [];
                    wsql = [];
                    orderSql = "";
                    orderW = "";
                    hasOrder = false;
                    subAlias = "";
                    renderNodes(txnItem["chain"]["values"], 0);
                    subSql = sql.join("").trim();
                    subW = wsql.join("").trim();
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    pushSql(("(" + (subSql + ")")));
                    pushW(("(" + (subW + ")")));
                    if (subAliasText !== "") {
                      pushSql(subAliasText);
                      pushW(subAliasText);
                    }
                  }
                  else {
                    emitParam(txnItem);
                  }
                }
                else {
                  emitParam(txnItem);
                }
              }
            }
            if (txnFirst === false) {
              sql = (sql.push(";"), sql);
              wsql = (wsql.push(";"), wsql);
            }
            pushSql("COMMIT");
            pushW("COMMIT");
          }
          else if (nameNorm === "select") {
            flushOrder();
            pushSql("SELECT");
            pushW("SELECT");
            let firstItem = true;
            for (const item of itemsOf(node["functionCall"]["arguments"][0]["argument"])) {
              if (firstItem === false) {
                sql = (sql.push(","), sql);
                wsql = (wsql.push(","), wsql);
              }
              firstItem = false;
              if (!!(Object.prototype.hasOwnProperty.call(item, "chain"))) {
                tmpRef = isRef(item["chain"]["values"]);
                if (tmpRef !== "") {
                  emitIdent(tmpRef);
                }
                else if (((firstKind(item["chain"]["values"]) === "select") || (firstKind(item["chain"]["values"]) === "with")) || ((firstKind(item["chain"]["values"]) === "values") || ((firstKind(item["chain"]["values"]) === "insert") || ((firstKind(item["chain"]["values"]) === "update") || (firstKind(item["chain"]["values"]) === "delete"))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = [];
                  wsql = [];
                  orderSql = "";
                  orderW = "";
                  hasOrder = false;
                  subAlias = "";
                  renderNodes(item["chain"]["values"], 0);
                  subSql = sql.join("").trim();
                  subW = wsql.join("").trim();
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  pushSql(("(" + (subSql + ")")));
                  pushW(("(" + (subW + ")")));
                  if (subAliasText !== "") {
                    pushSql(subAliasText);
                    pushW(subAliasText);
                  }
                }
                else {
                  renderNodes(item["chain"]["values"], 1);
                }
              }
              else {
                emitParam(item);
              }
            }
          }
          else if (nameNorm === "from") {
            flushOrder();
            pushSql("FROM");
            pushW("FROM");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
          }
          else if (nameNorm === "join") {
            flushOrder();
            pushSql("JOIN");
            pushW("JOIN");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
            pushSql("ON");
            pushW("ON");
            renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 1);
          }
          else if (nameNorm === "leftjoin") {
            flushOrder();
            pushSql("LEFT JOIN");
            pushW("LEFT JOIN");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
            pushSql("ON");
            pushW("ON");
            renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 1);
          }
          else if (nameNorm === "rightjoin") {
            flushOrder();
            pushSql("RIGHT JOIN");
            pushW("RIGHT JOIN");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
            pushSql("ON");
            pushW("ON");
            renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 1);
          }
          else if (nameNorm === "innerjoin") {
            flushOrder();
            pushSql("INNER JOIN");
            pushW("INNER JOIN");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
            pushSql("ON");
            pushW("ON");
            renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 1);
          }
          else if (nameNorm === "fulljoin") {
            if (dialect === "mysql") {
              throw new Error(String("sql-builder parse: FULL JOIN is not supported by mysql"));
            }
            else {
              flushOrder();
              pushSql("FULL JOIN");
              pushW("FULL JOIN");
              if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
                tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
                if (tmpRef !== "") {
                  emitIdent(tmpRef);
                }
                else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = [];
                  wsql = [];
                  orderSql = "";
                  orderW = "";
                  hasOrder = false;
                  subAlias = "";
                  renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                  subSql = sql.join("").trim();
                  subW = wsql.join("").trim();
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  pushSql(("(" + (subSql + ")")));
                  pushW(("(" + (subW + ")")));
                  if (subAliasText !== "") {
                    pushSql(subAliasText);
                    pushW(subAliasText);
                  }
                }
                else {
                  renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][0]["argument"]);
              }
              pushSql("ON");
              pushW("ON");
              renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 1);
            }
          }
          else if (nameNorm === "crossjoin") {
            flushOrder();
            pushSql("CROSS JOIN");
            pushW("CROSS JOIN");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
            pushSql("ON");
            pushW("ON");
            renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 1);
          }
          else if (nameNorm === "where") {
            flushOrder();
            pushSql("WHERE");
            pushW("WHERE");
            renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
          }
          else if (nameNorm === "groupby") {
            flushOrder();
            pushSql("GROUP BY");
            pushW("GROUP BY");
            let firstItem = true;
            for (const item of itemsOf(node["functionCall"]["arguments"][0]["argument"])) {
              if (firstItem === false) {
                sql = (sql.push(","), sql);
                wsql = (wsql.push(","), wsql);
              }
              firstItem = false;
              if (!!(Object.prototype.hasOwnProperty.call(item, "chain"))) {
                tmpRef = isRef(item["chain"]["values"]);
                if (tmpRef !== "") {
                  emitIdent(tmpRef);
                }
                else if (((firstKind(item["chain"]["values"]) === "select") || (firstKind(item["chain"]["values"]) === "with")) || ((firstKind(item["chain"]["values"]) === "values") || ((firstKind(item["chain"]["values"]) === "insert") || ((firstKind(item["chain"]["values"]) === "update") || (firstKind(item["chain"]["values"]) === "delete"))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = [];
                  wsql = [];
                  orderSql = "";
                  orderW = "";
                  hasOrder = false;
                  subAlias = "";
                  renderNodes(item["chain"]["values"], 0);
                  subSql = sql.join("").trim();
                  subW = wsql.join("").trim();
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  pushSql(("(" + (subSql + ")")));
                  pushW(("(" + (subW + ")")));
                  if (subAliasText !== "") {
                    pushSql(subAliasText);
                    pushW(subAliasText);
                  }
                }
                else {
                  renderNodes(item["chain"]["values"], 1);
                }
              }
              else {
                emitParam(item);
              }
            }
          }
          else if (nameNorm === "having") {
            flushOrder();
            pushSql("HAVING");
            pushW("HAVING");
            renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
          }
          else if (nameNorm === "returning") {
            if (dialect === "mysql") {
              throw new Error(String("sql-builder parse: RETURNING is not supported by mysql"));
            }
            else {
              flushOrder();
              pushSql("RETURNING");
              pushW("RETURNING");
              let firstItem = true;
              for (const item of itemsOf(node["functionCall"]["arguments"][0]["argument"])) {
                if (firstItem === false) {
                  sql = (sql.push(","), sql);
                  wsql = (wsql.push(","), wsql);
                }
                firstItem = false;
                if (!!(Object.prototype.hasOwnProperty.call(item, "chain"))) {
                  tmpRef = isRef(item["chain"]["values"]);
                  if (tmpRef !== "") {
                    emitIdent(tmpRef);
                  }
                  else if (((firstKind(item["chain"]["values"]) === "select") || (firstKind(item["chain"]["values"]) === "with")) || ((firstKind(item["chain"]["values"]) === "values") || ((firstKind(item["chain"]["values"]) === "insert") || ((firstKind(item["chain"]["values"]) === "update") || (firstKind(item["chain"]["values"]) === "delete"))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = [];
                    wsql = [];
                    orderSql = "";
                    orderW = "";
                    hasOrder = false;
                    subAlias = "";
                    renderNodes(item["chain"]["values"], 0);
                    subSql = sql.join("").trim();
                    subW = wsql.join("").trim();
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    pushSql(("(" + (subSql + ")")));
                    pushW(("(" + (subW + ")")));
                    if (subAliasText !== "") {
                      pushSql(subAliasText);
                      pushW(subAliasText);
                    }
                  }
                  else {
                    renderNodes(item["chain"]["values"], 1);
                  }
                }
                else {
                  emitParam(item);
                }
              }
            }
          }
          else if (nameNorm === "orderby") {
            hasOrder = true;
            orderSql = "";
            orderW = "";
            emitOrderList(node["functionCall"]["arguments"][0]["argument"]);
          }
          else if (nameNorm === "limit") {
            flushOrder();
            pushSql("LIMIT");
            pushW("LIMIT");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][0]["argument"]);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
          }
          else if (nameNorm === "offset") {
            flushOrder();
            pushSql("OFFSET");
            pushW("OFFSET");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][0]["argument"]);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
          }
          else if (nameNorm === "raw") {
            emitRaw(node);
          }
          else if (nameNorm === "as") {
            subAlias = ("AS " + identStr(asString(node["functionCall"]["arguments"][0]["argument"])));
          }
          else if (nameNorm === "update") {
            pushSql("UPDATE");
            pushW("UPDATE");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][0]["argument"]);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
            pushSql("SET");
            pushW("SET");
            let assnFirst = true;
            for (const ak of Object.keys(node["functionCall"]["arguments"][1]["argument"]["object"]["value"])) {
              if (assnFirst === false) {
                sql = (sql.push(","), sql);
                wsql = (wsql.push(","), wsql);
              }
              assnFirst = false;
              pushSql(identStr(ak));
              pushW(identStr(ak));
              pushSql("=");
              pushW("=");
              if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak], "chain"))) {
                tmpRef = isRef(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]);
                if (tmpRef !== "") {
                  emitIdent(tmpRef);
                }
                else if (((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "delete"))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = [];
                  wsql = [];
                  orderSql = "";
                  orderW = "";
                  hasOrder = false;
                  subAlias = "";
                  renderNodes(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"], 0);
                  subSql = sql.join("").trim();
                  subW = wsql.join("").trim();
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  pushSql(("(" + (subSql + ")")));
                  pushW(("(" + (subW + ")")));
                  if (subAliasText !== "") {
                    pushSql(subAliasText);
                    pushW(subAliasText);
                  }
                }
                else {
                  emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]);
              }
            }
          }
          else if (nameNorm === "insert") {
            pushSql("INSERT");
            pushW("INSERT");
            pushSql("INTO");
            pushW("INTO");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][0]["argument"]);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
            pushSql("(");
            pushW("(");
            let colFirst = true;
            for (const ck of Object.keys(node["functionCall"]["arguments"][1]["argument"]["object"]["value"])) {
              if (colFirst === false) {
                sql = (sql.push(","), sql);
                wsql = (wsql.push(","), wsql);
              }
              colFirst = false;
              pushSql(identStr(ck));
              pushW(identStr(ck));
            }
            pushSql(")");
            pushW(")");
            pushSql("VALUES");
            pushW("VALUES");
            pushSql("(");
            pushW("(");
            let valFirst = true;
            for (const vk of Object.keys(node["functionCall"]["arguments"][1]["argument"]["object"]["value"])) {
              if (valFirst === false) {
                sql = (sql.push(","), sql);
                wsql = (wsql.push(","), wsql);
              }
              valFirst = false;
              if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk], "chain"))) {
                tmpRef = isRef(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"]);
                if (tmpRef !== "") {
                  emitIdent(tmpRef);
                }
                else if (((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"]) === "delete"))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = [];
                  wsql = [];
                  orderSql = "";
                  orderW = "";
                  hasOrder = false;
                  subAlias = "";
                  renderNodes(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]["chain"]["values"], 0);
                  subSql = sql.join("").trim();
                  subW = wsql.join("").trim();
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  pushSql(("(" + (subSql + ")")));
                  pushW(("(" + (subW + ")")));
                  if (subAliasText !== "") {
                    pushSql(subAliasText);
                    pushW(subAliasText);
                  }
                }
                else {
                  emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][vk]);
              }
            }
            pushSql(")");
            pushW(")");
          }
          else if (nameNorm === "delete") {
            pushSql("DELETE");
            pushW("DELETE");
            pushSql("FROM");
            pushW("FROM");
            if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
              tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
              if (tmpRef !== "") {
                emitIdent(tmpRef);
              }
              else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                savedAlias = subAlias;
                sql = [];
                wsql = [];
                orderSql = "";
                orderW = "";
                hasOrder = false;
                subAlias = "";
                renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
                subSql = sql.join("").trim();
                subW = wsql.join("").trim();
                subAliasText = subAlias;
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                subAlias = savedAlias;
                pushSql(("(" + (subSql + ")")));
                pushW(("(" + (subW + ")")));
                if (subAliasText !== "") {
                  pushSql(subAliasText);
                  pushW(subAliasText);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][0]["argument"]);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
          }
          else if (nameNorm === "set") {
            pushSql("SET");
            pushW("SET");
            let assnFirst = true;
            for (const ak of Object.keys(node["functionCall"]["arguments"][0]["argument"]["object"]["value"])) {
              if (assnFirst === false) {
                sql = (sql.push(","), sql);
                wsql = (wsql.push(","), wsql);
              }
              assnFirst = false;
              pushSql(identStr(ak));
              pushW(identStr(ak));
              pushSql("=");
              pushW("=");
              if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak], "chain"))) {
                tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"]);
                if (tmpRef !== "") {
                  emitIdent(tmpRef);
                }
                else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"]) === "delete"))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = [];
                  wsql = [];
                  orderSql = "";
                  orderW = "";
                  hasOrder = false;
                  subAlias = "";
                  renderNodes(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]["chain"]["values"], 0);
                  subSql = sql.join("").trim();
                  subW = wsql.join("").trim();
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  pushSql(("(" + (subSql + ")")));
                  pushW(("(" + (subW + ")")));
                  if (subAliasText !== "") {
                    pushSql(subAliasText);
                    pushW(subAliasText);
                  }
                }
                else {
                  emitParam(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]);
                }
              }
              else {
                emitParam(node["functionCall"]["arguments"][0]["argument"]["object"]["value"][ak]);
              }
            }
          }
          else if (nameNorm === "values") {
            pushSql("VALUES");
            pushW("VALUES");
            let valueRows = itemsOf(node["functionCall"]["arguments"][0]["argument"]);
            let valueFirst = true;
            if ((valueRows.length !== 0) && !!(Object.prototype.hasOwnProperty.call(valueRows[0], "array"))) {
              for (const tuple of valueRows) {
                if (valueFirst === false) {
                  sql = (sql.push(","), sql);
                  wsql = (wsql.push(","), wsql);
                }
                valueFirst = false;
                if (dialect === "mysql") {
                  pushSql("ROW");
                  pushW("ROW");
                }
                pushSql("(");
                pushW("(");
                let itemFirst = true;
                for (const ti of itemsOf(tuple)) {
                  if (itemFirst === false) {
                    sql = (sql.push(","), sql);
                    wsql = (wsql.push(","), wsql);
                  }
                  itemFirst = false;
                  if (!!(Object.prototype.hasOwnProperty.call(ti, "chain"))) {
                    tmpRef = isRef(ti["chain"]["values"]);
                    if (tmpRef !== "") {
                      emitIdent(tmpRef);
                    }
                    else if (((firstKind(ti["chain"]["values"]) === "select") || (firstKind(ti["chain"]["values"]) === "with")) || ((firstKind(ti["chain"]["values"]) === "values") || ((firstKind(ti["chain"]["values"]) === "insert") || ((firstKind(ti["chain"]["values"]) === "update") || (firstKind(ti["chain"]["values"]) === "delete"))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = [];
                      wsql = [];
                      orderSql = "";
                      orderW = "";
                      hasOrder = false;
                      subAlias = "";
                      renderNodes(ti["chain"]["values"], 0);
                      subSql = sql.join("").trim();
                      subW = wsql.join("").trim();
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      pushSql(("(" + (subSql + ")")));
                      pushW(("(" + (subW + ")")));
                      if (subAliasText !== "") {
                        pushSql(subAliasText);
                        pushW(subAliasText);
                      }
                    }
                    else {
                      emitParam(ti);
                    }
                  }
                  else {
                    emitParam(ti);
                  }
                }
                pushSql(")");
                pushW(")");
              }
            }
            else {
              if (dialect === "mysql") {
                pushSql("ROW");
                pushW("ROW");
              }
              pushSql("(");
              pushW("(");
              let itemFirst = true;
              for (const ti of valueRows) {
                if (itemFirst === false) {
                  sql = (sql.push(","), sql);
                  wsql = (wsql.push(","), wsql);
                }
                itemFirst = false;
                if (!!(Object.prototype.hasOwnProperty.call(ti, "chain"))) {
                  tmpRef = isRef(ti["chain"]["values"]);
                  if (tmpRef !== "") {
                    emitIdent(tmpRef);
                  }
                  else if (((firstKind(ti["chain"]["values"]) === "select") || (firstKind(ti["chain"]["values"]) === "with")) || ((firstKind(ti["chain"]["values"]) === "values") || ((firstKind(ti["chain"]["values"]) === "insert") || ((firstKind(ti["chain"]["values"]) === "update") || (firstKind(ti["chain"]["values"]) === "delete"))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = [];
                    wsql = [];
                    orderSql = "";
                    orderW = "";
                    hasOrder = false;
                    subAlias = "";
                    renderNodes(ti["chain"]["values"], 0);
                    subSql = sql.join("").trim();
                    subW = wsql.join("").trim();
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    pushSql(("(" + (subSql + ")")));
                    pushW(("(" + (subW + ")")));
                    if (subAliasText !== "") {
                      pushSql(subAliasText);
                      pushW(subAliasText);
                    }
                  }
                  else {
                    emitParam(ti);
                  }
                }
                else {
                  emitParam(ti);
                }
              }
              pushSql(")");
              pushW(")");
            }
          }
          else if (nameNorm === "onconflictdonothing") {
            if (dialect === "mysql") {
              throw new Error(String("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql"));
            }
            else {
              pushSql("ON");
              pushW("ON");
              pushSql("CONFLICT");
              pushW("CONFLICT");
              pushSql(conflictTarget(node["functionCall"]["arguments"][0]["argument"]));
              pushW(conflictTarget(node["functionCall"]["arguments"][0]["argument"]));
              pushSql("DO");
              pushW("DO");
              pushSql("NOTHING");
              pushW("NOTHING");
            }
          }
          else if (nameNorm === "onconflictdoupdate") {
            if (dialect === "mysql") {
              pushSql("ON");
              pushW("ON");
              pushSql("DUPLICATE");
              pushW("DUPLICATE");
              pushSql("KEY");
              pushW("KEY");
              pushSql("UPDATE");
              pushW("UPDATE");
              let assnFirst = true;
              for (const ak of Object.keys(node["functionCall"]["arguments"][1]["argument"]["object"]["value"])) {
                if (assnFirst === false) {
                  sql = (sql.push(","), sql);
                  wsql = (wsql.push(","), wsql);
                }
                assnFirst = false;
                pushSql(identStr(ak));
                pushW(identStr(ak));
                pushSql("=");
                pushW("=");
                if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak], "chain"))) {
                  tmpRef = isRef(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]);
                  if (tmpRef !== "") {
                    emitIdent(tmpRef);
                  }
                  else if (((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "delete"))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = [];
                    wsql = [];
                    orderSql = "";
                    orderW = "";
                    hasOrder = false;
                    subAlias = "";
                    renderNodes(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"], 0);
                    subSql = sql.join("").trim();
                    subW = wsql.join("").trim();
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    pushSql(("(" + (subSql + ")")));
                    pushW(("(" + (subW + ")")));
                    if (subAliasText !== "") {
                      pushSql(subAliasText);
                      pushW(subAliasText);
                    }
                  }
                  else {
                    emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]);
                  }
                }
                else {
                  emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]);
                }
              }
            }
            else {
              pushSql("ON");
              pushW("ON");
              pushSql("CONFLICT");
              pushW("CONFLICT");
              pushSql(conflictTarget(node["functionCall"]["arguments"][0]["argument"]));
              pushW(conflictTarget(node["functionCall"]["arguments"][0]["argument"]));
              pushSql("DO");
              pushW("DO");
              pushSql("UPDATE");
              pushW("UPDATE");
              pushSql("SET");
              pushW("SET");
              let assnFirst = true;
              for (const ak of Object.keys(node["functionCall"]["arguments"][1]["argument"]["object"]["value"])) {
                if (assnFirst === false) {
                  sql = (sql.push(","), sql);
                  wsql = (wsql.push(","), wsql);
                }
                assnFirst = false;
                pushSql(identStr(ak));
                pushW(identStr(ak));
                pushSql("=");
                pushW("=");
                if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak], "chain"))) {
                  tmpRef = isRef(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]);
                  if (tmpRef !== "") {
                    emitIdent(tmpRef);
                  }
                  else if (((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"]) === "delete"))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = [];
                    wsql = [];
                    orderSql = "";
                    orderW = "";
                    hasOrder = false;
                    subAlias = "";
                    renderNodes(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]["chain"]["values"], 0);
                    subSql = sql.join("").trim();
                    subW = wsql.join("").trim();
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    pushSql(("(" + (subSql + ")")));
                    pushW(("(" + (subW + ")")));
                    if (subAliasText !== "") {
                      pushSql(subAliasText);
                      pushW(subAliasText);
                    }
                  }
                  else {
                    emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]);
                  }
                }
                else {
                  emitParam(node["functionCall"]["arguments"][1]["argument"]["object"]["value"][ak]);
                }
              }
            }
          }
          else {
            throw new Error(String(("sql-builder parse: unsupported clause " + name)));
          }
        }
      }
    }
    flushOrder();
    return null;
  }
  else {
    first = true;
    left = "";
    hasLeft = false;
    base = "";
    for (const node of nodes) {
      let pn = normName(node["functionCall"]["name"]);
      let op = opOf(pn);
      if (!!(Object.prototype.hasOwnProperty.call(node, "functionCall"))) {
        if ((pn === "col") || (pn === "table")) {
          left = identStr(asString(node["functionCall"]["arguments"][0]["argument"]));
          hasLeft = true;
        }
        else if (!!(op)) {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          if (!!(hasLeft)) {
            base = left;
          }
          else {
            base = "?";
          }
          pushSql(base);
          pushW(base);
          pushSql(op);
          pushW(op);
          if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
            tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
            if (tmpRef !== "") {
              emitIdent(tmpRef);
            }
            else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
              savedSql = sql;
              savedW = wsql;
              savedOrderSql = orderSql;
              savedOrderW = orderW;
              savedHasOrder = hasOrder;
              savedAlias = subAlias;
              sql = [];
              wsql = [];
              orderSql = "";
              orderW = "";
              hasOrder = false;
              subAlias = "";
              renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
              subSql = sql.join("").trim();
              subW = wsql.join("").trim();
              subAliasText = subAlias;
              sql = savedSql;
              wsql = savedW;
              orderSql = savedOrderSql;
              orderW = savedOrderW;
              hasOrder = savedHasOrder;
              subAlias = savedAlias;
              pushSql(("(" + (subSql + ")")));
              pushW(("(" + (subW + ")")));
              if (subAliasText !== "") {
                pushSql(subAliasText);
                pushW(subAliasText);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
          }
          else {
            emitParam(node["functionCall"]["arguments"][0]["argument"]);
          }
          hasLeft = false;
        }
        else if (pn === "exists") {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          pushSql("EXISTS");
          pushW("EXISTS");
          if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
            tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
            if (tmpRef !== "") {
              emitIdent(tmpRef);
            }
            else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
              savedSql = sql;
              savedW = wsql;
              savedOrderSql = orderSql;
              savedOrderW = orderW;
              savedHasOrder = hasOrder;
              savedAlias = subAlias;
              sql = [];
              wsql = [];
              orderSql = "";
              orderW = "";
              hasOrder = false;
              subAlias = "";
              renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
              subSql = sql.join("").trim();
              subW = wsql.join("").trim();
              subAliasText = subAlias;
              sql = savedSql;
              wsql = savedW;
              orderSql = savedOrderSql;
              orderW = savedOrderW;
              hasOrder = savedHasOrder;
              subAlias = savedAlias;
              pushSql(("(" + (subSql + ")")));
              pushW(("(" + (subW + ")")));
              if (subAliasText !== "") {
                pushSql(subAliasText);
                pushW(subAliasText);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
          }
          else {
            emitParam(node["functionCall"]["arguments"][0]["argument"]);
          }
          hasLeft = false;
        }
        else if (pn === "in") {
          if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
            if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
              if (first === false) {
                pushSql("AND");
                pushW("AND");
              }
              first = false;
              if (!!(hasLeft)) {
                base = left;
              }
              else {
                base = "?";
              }
              pushSql(base);
              pushW(base);
              pushSql("IN");
              pushW("IN");
              savedSql = sql;
              savedW = wsql;
              savedOrderSql = orderSql;
              savedOrderW = orderW;
              savedHasOrder = hasOrder;
              savedAlias = subAlias;
              sql = [];
              wsql = [];
              orderSql = "";
              orderW = "";
              hasOrder = false;
              subAlias = "";
              renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
              subSql = sql.join("").trim();
              subW = wsql.join("").trim();
              subAliasText = subAlias;
              sql = savedSql;
              wsql = savedW;
              orderSql = savedOrderSql;
              orderW = savedOrderW;
              hasOrder = savedHasOrder;
              subAlias = savedAlias;
              pushSql(("(" + (subSql + ")")));
              pushW(("(" + (subW + ")")));
              if (subAliasText !== "") {
                pushSql(subAliasText);
                pushW(subAliasText);
              }
            }
            else {
              if (first === false) {
                pushSql("AND");
                pushW("AND");
              }
              first = false;
              if (!!(hasLeft)) {
                base = left;
              }
              else {
                base = "?";
              }
              pushSql(base);
              pushW(base);
              pushSql("IN (");
              pushW("IN (");
              let inFirst = true;
              for (const iv of itemsOf(node["functionCall"]["arguments"][0]["argument"])) {
                if (inFirst === false) {
                  sql = (sql.push(","), sql);
                  wsql = (wsql.push(","), wsql);
                }
                inFirst = false;
                if (!!(Object.prototype.hasOwnProperty.call(iv, "chain"))) {
                  tmpRef = isRef(iv["chain"]["values"]);
                  if (tmpRef !== "") {
                    emitIdent(tmpRef);
                  }
                  else if (((firstKind(iv["chain"]["values"]) === "select") || (firstKind(iv["chain"]["values"]) === "with")) || ((firstKind(iv["chain"]["values"]) === "values") || ((firstKind(iv["chain"]["values"]) === "insert") || ((firstKind(iv["chain"]["values"]) === "update") || (firstKind(iv["chain"]["values"]) === "delete"))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = [];
                    wsql = [];
                    orderSql = "";
                    orderW = "";
                    hasOrder = false;
                    subAlias = "";
                    renderNodes(iv["chain"]["values"], 0);
                    subSql = sql.join("").trim();
                    subW = wsql.join("").trim();
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    pushSql(("(" + (subSql + ")")));
                    pushW(("(" + (subW + ")")));
                    if (subAliasText !== "") {
                      pushSql(subAliasText);
                      pushW(subAliasText);
                    }
                  }
                  else {
                    emitParam(iv);
                  }
                }
                else {
                  emitParam(iv);
                }
              }
              pushSql(")");
              pushW(")");
            }
          }
          else {
            if (first === false) {
              pushSql("AND");
              pushW("AND");
            }
            first = false;
            if (!!(hasLeft)) {
              base = left;
            }
            else {
              base = "?";
            }
            pushSql(base);
            pushW(base);
            pushSql("IN (");
            pushW("IN (");
            let inFirst = true;
            for (const iv of itemsOf(node["functionCall"]["arguments"][0]["argument"])) {
              if (inFirst === false) {
                sql = (sql.push(","), sql);
                wsql = (wsql.push(","), wsql);
              }
              inFirst = false;
              if (!!(Object.prototype.hasOwnProperty.call(iv, "chain"))) {
                tmpRef = isRef(iv["chain"]["values"]);
                if (tmpRef !== "") {
                  emitIdent(tmpRef);
                }
                else if (((firstKind(iv["chain"]["values"]) === "select") || (firstKind(iv["chain"]["values"]) === "with")) || ((firstKind(iv["chain"]["values"]) === "values") || ((firstKind(iv["chain"]["values"]) === "insert") || ((firstKind(iv["chain"]["values"]) === "update") || (firstKind(iv["chain"]["values"]) === "delete"))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = [];
                  wsql = [];
                  orderSql = "";
                  orderW = "";
                  hasOrder = false;
                  subAlias = "";
                  renderNodes(iv["chain"]["values"], 0);
                  subSql = sql.join("").trim();
                  subW = wsql.join("").trim();
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  pushSql(("(" + (subSql + ")")));
                  pushW(("(" + (subW + ")")));
                  if (subAliasText !== "") {
                    pushSql(subAliasText);
                    pushW(subAliasText);
                  }
                }
                else {
                  emitParam(iv);
                }
              }
              else {
                emitParam(iv);
              }
            }
            pushSql(")");
            pushW(")");
          }
          hasLeft = false;
        }
        else if (pn === "between") {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          if (!!(hasLeft)) {
            base = left;
          }
          else {
            base = "?";
          }
          pushSql(base);
          pushW(base);
          pushSql("BETWEEN");
          pushW("BETWEEN");
          if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][0]["argument"], "chain"))) {
            tmpRef = isRef(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]);
            if (tmpRef !== "") {
              emitIdent(tmpRef);
            }
            else if (((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"]) === "delete"))))) {
              savedSql = sql;
              savedW = wsql;
              savedOrderSql = orderSql;
              savedOrderW = orderW;
              savedHasOrder = hasOrder;
              savedAlias = subAlias;
              sql = [];
              wsql = [];
              orderSql = "";
              orderW = "";
              hasOrder = false;
              subAlias = "";
              renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 0);
              subSql = sql.join("").trim();
              subW = wsql.join("").trim();
              subAliasText = subAlias;
              sql = savedSql;
              wsql = savedW;
              orderSql = savedOrderSql;
              orderW = savedOrderW;
              hasOrder = savedHasOrder;
              subAlias = savedAlias;
              pushSql(("(" + (subSql + ")")));
              pushW(("(" + (subW + ")")));
              if (subAliasText !== "") {
                pushSql(subAliasText);
                pushW(subAliasText);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][0]["argument"]);
            }
          }
          else {
            emitParam(node["functionCall"]["arguments"][0]["argument"]);
          }
          pushSql("AND");
          pushW("AND");
          if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][1]["argument"], "chain"))) {
            tmpRef = isRef(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]);
            if (tmpRef !== "") {
              emitIdent(tmpRef);
            }
            else if (((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "delete"))))) {
              savedSql = sql;
              savedW = wsql;
              savedOrderSql = orderSql;
              savedOrderW = orderW;
              savedHasOrder = hasOrder;
              savedAlias = subAlias;
              sql = [];
              wsql = [];
              orderSql = "";
              orderW = "";
              hasOrder = false;
              subAlias = "";
              renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 0);
              subSql = sql.join("").trim();
              subW = wsql.join("").trim();
              subAliasText = subAlias;
              sql = savedSql;
              wsql = savedW;
              orderSql = savedOrderSql;
              orderW = savedOrderW;
              hasOrder = savedHasOrder;
              subAlias = savedAlias;
              pushSql(("(" + (subSql + ")")));
              pushW(("(" + (subW + ")")));
              if (subAliasText !== "") {
                pushSql(subAliasText);
                pushW(subAliasText);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][1]["argument"]);
            }
          }
          else {
            emitParam(node["functionCall"]["arguments"][1]["argument"]);
          }
          hasLeft = false;
        }
        else if (pn === "isnull") {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          if (!!(hasLeft)) {
            base = left;
          }
          else {
            base = "?";
          }
          pushSql(base);
          pushW(base);
          pushSql("IS NULL");
          pushW("IS NULL");
          hasLeft = false;
        }
        else if (pn === "isnotnull") {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          if (!!(hasLeft)) {
            base = left;
          }
          else {
            base = "?";
          }
          pushSql(base);
          pushW(base);
          pushSql("IS NOT NULL");
          pushW("IS NOT NULL");
          hasLeft = false;
        }
        else if (pn === "not") {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          pushSql("NOT (");
          pushW("NOT (");
          renderNodes(node["functionCall"]["arguments"][0]["argument"]["chain"]["values"], 1);
          pushSql(")");
          pushW(")");
          hasLeft = false;
        }
        else if ((pn === "and") || (pn === "or")) {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          pushSql("(");
          pushW("(");
          let boolFirst = true;
          for (const bv of itemsOf(node["functionCall"]["arguments"][0]["argument"])) {
            if (boolFirst === false) {
              tmp = pn.toUpperCase();
              pushSql(tmp);
              pushW(tmp);
            }
            boolFirst = false;
            if (!!(Object.prototype.hasOwnProperty.call(bv, "chain"))) {
              renderNodes(bv["chain"]["values"], 1);
            }
            else {
              emitParam(bv);
            }
          }
          pushSql(")");
          pushW(")");
          hasLeft = false;
        }
        else if (pn === "as") {
          if (!!(hasLeft)) {
            base = left;
          }
          else {
            base = "?";
          }
          pushSql(base);
          pushW(base);
          pushSql("AS");
          pushW("AS");
          emitIdent(asString(node["functionCall"]["arguments"][0]["argument"]));
          hasLeft = false;
        }
        else if (pn === "op") {
          if (first === false) {
            pushSql("AND");
            pushW("AND");
          }
          first = false;
          if (!!(hasLeft)) {
            base = left;
          }
          else {
            base = "?";
          }
          pushSql(base);
          pushW(base);
          pushSql(asString(node["functionCall"]["arguments"][0]["argument"]));
          pushW(asString(node["functionCall"]["arguments"][0]["argument"]));
          if (!!(Object.prototype.hasOwnProperty.call(node["functionCall"]["arguments"][1]["argument"], "chain"))) {
            tmpRef = isRef(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]);
            if (tmpRef !== "") {
              emitIdent(tmpRef);
            }
            else if (((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "select") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "with")) || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "values") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "insert") || ((firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "update") || (firstKind(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"]) === "delete"))))) {
              savedSql = sql;
              savedW = wsql;
              savedOrderSql = orderSql;
              savedOrderW = orderW;
              savedHasOrder = hasOrder;
              savedAlias = subAlias;
              sql = [];
              wsql = [];
              orderSql = "";
              orderW = "";
              hasOrder = false;
              subAlias = "";
              renderNodes(node["functionCall"]["arguments"][1]["argument"]["chain"]["values"], 0);
              subSql = sql.join("").trim();
              subW = wsql.join("").trim();
              subAliasText = subAlias;
              sql = savedSql;
              wsql = savedW;
              orderSql = savedOrderSql;
              orderW = savedOrderW;
              hasOrder = savedHasOrder;
              subAlias = savedAlias;
              pushSql(("(" + (subSql + ")")));
              pushW(("(" + (subW + ")")));
              if (subAliasText !== "") {
                pushSql(subAliasText);
                pushW(subAliasText);
              }
            }
            else {
              emitParam(node["functionCall"]["arguments"][1]["argument"]);
            }
          }
          else {
            emitParam(node["functionCall"]["arguments"][1]["argument"]);
          }
          hasLeft = false;
        }
        else if (pn === "raw") {
          emitRaw(node);
        }
        else {
          throw new Error(String("sql-builder parse: unsupported predicate"));
        }
      }
    }
    return null;
  }
}
renderNodes(root["schema"]["chain"]["chain"]["values"], 0);
sql = sql.join("");
wsql = wsql.join("");
params = params;
return { sql: sql.trim(), sqlWithParam: wsql.trim(), param: params.map((p) => p.string ? p.string.value : p.number ? p.number.value : p.boolean ? p.boolean.value : null) };
}
}


// Auto-generated init functions
export function sqlBuilder(variableName, ...copies) {
                    const structure = new SqlBuilder();
                    structure.initFromInitFunction({
                        name: "sql-builder",
                        variableName: variableName || structure.getSchema().schema.chain.chain.initFunction.variableName
                    }, copies)
                    return structure;
                }
