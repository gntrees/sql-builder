// Auto-generated index for gntrees-sql-builder

import java.util.*;

// parse() returns a Map<String, Object>: { "sql": String, "sqlWithParam": String, "param": List }

// Auto-generated Java method-chain types.
//
// Java is statically typed, but LT values are `Object` (a schema is a nested
// Map<String,Object> / List<Object>), so there is no `Value` enum. The one shared
// abstraction is `Structure`: every generated builder class implements it, which
// lets the generic runtime (`copy` / `make_copy`) call `getSchema()`.

interface Structure {
    Map<String, Object> getSchema();
}


class Mc {
    // Auto-generated Java method-chain runtime (Lingua Tungga Gelombang 2).
    //
    // This is the static counterpart of `core/base/python/base-utils.py`. Schemas
    // are plain nested maps; the generator inlines this fragment inside a `Mc`
    // utility class in the generated `index.java`.
    //
    // `normalize_argument_structure_call` and `copy` are *not* defined here: like
    // the TypeScript/Python runtimes they are emitted by the generator because they
    // reference the project's structure classes.

    static String _typeof(Object value) {
        if (value == null) return "object";
        if (value instanceof Boolean) return "boolean";
        if (value instanceof Number) return "number";
        if (value instanceof String) return "string";
        if (value instanceof List || value instanceof Map) return "object";
        return value.getClass().getSimpleName();
    }

    static void validate_schema(Object schema) {
        String message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction";
        if (!(schema instanceof Map)) throw new RuntimeException(message);
        Object inner = Lt.get(schema, "schema");
        if (!(inner instanceof Map)) throw new RuntimeException(message);
        Object chain = Lt.get(inner, "chain");
        if (!(chain instanceof Map)) throw new RuntimeException(message);
        Object chainChain = Lt.get(chain, "chain");
        if (!(chainChain instanceof Map)) throw new RuntimeException(message);
        if (!(Lt.get(chainChain, "values") instanceof List) || !Lt.truthy(Lt.get(chainChain, "initFunction"))) {
            throw new RuntimeException(message);
        }
    }

    static Object unwrapArgumentValue(Object value) {
        if (!(value instanceof Map)) throw new RuntimeException("Unknown argument value type");
        if (Lt.has(value, "string")) return Lt.get(Lt.get(value, "string"), "value");
        if (Lt.has(value, "number")) return Lt.get(Lt.get(value, "number"), "value");
        if (Lt.has(value, "boolean")) return Lt.get(Lt.get(value, "boolean"), "value");
        if (Lt.has(value, "null")) return Lt.get(Lt.get(value, "null"), "value");
        if (Lt.has(value, "array")) {
            List<Object> out = new ArrayList<>();
            for (Object item : Lt.items(Lt.get(Lt.get(value, "array"), "value"))) out.add(unwrapArgumentValue(item));
            return out;
        }
        if (Lt.has(value, "object")) {
            Map<String, Object> out = new LinkedHashMap<>();
            for (Map.Entry<?, ?> entry : Lt.asMap(Lt.get(Lt.get(value, "object"), "value")).entrySet()) {
                out.put(String.valueOf(entry.getKey()), unwrapArgumentValue(entry.getValue()));
            }
            return out;
        }
        if (Lt.has(value, "chain")) throw new RuntimeException("Cannot validate a chain default value at runtime");
        throw new RuntimeException("Unknown argument value type");
    }

    static void validate_default(Object defaultVal, Object struct) {
        normalize_argument(unwrapArgumentValue(defaultVal), struct);
    }

    static Object normalize_argument(Object arg, Object struct) {
        if (!(struct instanceof Map)) throw new RuntimeException("Unsupported struct type in normalizeArgument");

        if (Lt.has(struct, "array")) {
            if (!(arg instanceof List)) throw new RuntimeException("Expected an array argument, but got " + _typeof(arg));
            if (Lt.asList(arg).isEmpty()) return Lt.map("array", Lt.map("value", Lt.array()));
            Object itemType = Lt.get(Lt.get(struct, "array"), "type");
            List<Object> normalizedItems = new ArrayList<>();
            for (Object item : Lt.asList(arg)) normalizedItems.add(normalize_argument(item, itemType));
            if (normalizedItems.get(0) == null) throw new RuntimeException("Unexpected undefined value in array");
            return Lt.map("array", Lt.map("value", normalizedItems));
        }

        if (Lt.has(struct, "object")) {
            if (!(arg instanceof Map)) throw new RuntimeException("Expected an object argument, but got " + _typeof(arg));
            Object declared = Lt.get(struct, "object");
            List<String> missingKeys = new ArrayList<>();
            for (Object key : Lt.keys(declared)) {
                if (!Lt.has(arg, key)) missingKeys.add(Lt.to_string(key));
            }
            if (!missingKeys.isEmpty()) {
                throw new RuntimeException("Missing required key(s) \"" + String.join("\", \"", missingKeys) + "\" in object argument");
            }
            Map<String, Object> normalizedObject = new LinkedHashMap<>();
            for (Map.Entry<?, ?> entry : Lt.asMap(arg).entrySet()) {
                String key = String.valueOf(entry.getKey());
                if (!Lt.has(declared, key)) throw new RuntimeException("Unexpected key \"" + key + "\" in object argument");
                normalizedObject.put(key, normalize_argument(entry.getValue(), Lt.get(declared, key)));
            }
            return Lt.map("object", Lt.map("value", normalizedObject));
        }

        if (Lt.has(struct, "string")) {
            if (!(arg instanceof String)) throw new RuntimeException("Expected a string argument, but got " + _typeof(arg));
            return Lt.map("string", Lt.map("value", arg));
        }

        if (Lt.has(struct, "number")) {
            if (arg instanceof Boolean || !(arg instanceof Number)) {
                throw new RuntimeException("Expected a number argument, but got " + _typeof(arg));
            }
            double number = ((Number) arg).doubleValue();
            if (!Double.isFinite(number)) throw new RuntimeException("Expected a finite number argument, but got " + number);
            return Lt.map("number", Lt.map("value", number));
        }

        if (Lt.has(struct, "boolean")) {
            if (!(arg instanceof Boolean)) throw new RuntimeException("Expected a boolean argument, but got " + _typeof(arg));
            return Lt.map("boolean", Lt.map("value", arg));
        }

        if (Lt.has(struct, "null")) {
            if (arg != null) throw new RuntimeException("Expected a null argument, but got " + _typeof(arg));
            return Lt.map("null", Lt.map("value", (Object) null));
        }

        if (Lt.has(struct, "union")) {
            List<String> reasons = new ArrayList<>();
            List<Object> normalizedUnionTypes = new ArrayList<>();
            for (Object unionType : Lt.items(Lt.get(Lt.get(struct, "union"), "types"))) {
                try {
                    normalizedUnionTypes.add(normalize_argument(arg, unionType));
                } catch (RuntimeException error) {
                    reasons.add(String.valueOf(error.getMessage()));
                }
            }
            if (normalizedUnionTypes.isEmpty() || normalizedUnionTypes.get(0) == null) {
                throw new RuntimeException("Argument does not match any type in the union: " + String.join(" | ", reasons));
            }
            if (normalizedUnionTypes.size() > 1) {
                if (arg instanceof List && Lt.asList(arg).isEmpty()) return normalizedUnionTypes.get(0);
                throw new RuntimeException("Argument matches multiple types in the union, which is ambiguous");
            }
            return normalizedUnionTypes.get(0);
        }

        if (Lt.has(struct, "map")) {
            if (!(arg instanceof Map)) throw new RuntimeException("Expected an object argument for map type, but got " + _typeof(arg));
            Map<String, Object> normalizedMap = new LinkedHashMap<>();
            Object valueType = Lt.get(Lt.get(struct, "map"), "type");
            for (Map.Entry<?, ?> entry : Lt.asMap(arg).entrySet()) {
                normalizedMap.put(String.valueOf(entry.getKey()), normalize_argument(entry.getValue(), valueType));
            }
            return Lt.map("object", Lt.map("value", normalizedMap));
        }

        if (Lt.has(struct, "structureCall")) {
            return normalize_argument_structure_call(arg);
        }

        if (Lt.has(struct, "literal")) {
            Object expected = Lt.get(Lt.get(struct, "literal"), "value");
            Object literalType = Lt.get(Lt.get(struct, "literal"), "type");
            if ("string".equals(literalType)) {
                if (!(arg instanceof String)) throw new RuntimeException("Expected a string literal argument, but got " + _typeof(arg));
                if (!arg.equals(expected)) throw new RuntimeException("Expected string literal " + Lt.json(expected) + ", but got " + Lt.json(arg));
                return Lt.map("string", Lt.map("value", arg));
            }
            if ("number".equals(literalType)) {
                if (arg instanceof Boolean || !(arg instanceof Number)) {
                    throw new RuntimeException("Expected a number literal argument, but got " + _typeof(arg));
                }
                if (!arg.equals(expected)) throw new RuntimeException("Expected number literal " + expected + ", but got " + arg);
                return Lt.map("number", Lt.map("value", arg));
            }
            if (!(arg instanceof Boolean)) throw new RuntimeException("Expected a boolean literal argument, but got " + _typeof(arg));
            if (!arg.equals(expected)) throw new RuntimeException("Expected boolean literal " + expected + ", but got " + arg);
            return Lt.map("boolean", Lt.map("value", arg));
        }

        throw new RuntimeException("Unsupported struct type in normalizeArgument");
    }

    static Map<String, Object> create_schema(Map<String, Object> oldSchema, String functionName, List<Object> functionArgs, boolean isTemplateLiteral) {
        validate_schema(oldSchema);
        Map<String, Object> old = Lt.asMap(Lt.get(oldSchema, "schema"));
        Map<String, Object> oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"));

        Map<String, Object> inner = new LinkedHashMap<>();
        for (Map.Entry<String, Object> entry : old.entrySet()) inner.put(entry.getKey(), entry.getValue());
        List<Object> values = new ArrayList<>(Lt.items(Lt.get(oldChain, "values")));
        inner.put("chain", Lt.map("chain", Lt.map(
            "values", values,
            "initFunction", Lt.get(oldChain, "initFunction")
        )));
        Map<String, Object> newSchema = Lt.map("schema", inner);

        List<Object> args = new ArrayList<>();
        if (isTemplateLiteral && !functionArgs.isEmpty() && functionArgs.get(0) != null) {
            Object strings = Lt.get(functionArgs.get(0), "arg");
            if (!(strings instanceof List)) throw new RuntimeException("Expected a template strings array for " + functionName);
            for (Object text : Lt.asList(strings)) {
                if (!(text instanceof String)) throw new RuntimeException("Expected a template strings array for " + functionName);
            }
            List<Object> expressions = functionArgs.subList(1, functionArgs.size());
            if (expressions.size() != Lt.asList(strings).size() - 1) {
                throw new RuntimeException(
                    "Template literal for " + functionName + " expects " + (Lt.asList(strings).size() - 1)
                        + " expression(s), but got " + expressions.size()
                );
            }
            for (int index = 0; index < Lt.asList(strings).size(); index++) {
                String text = Lt.to_string(Lt.asList(strings).get(index));
                if (!text.isEmpty()) {
                    args.add(Lt.map("argument", Lt.map("string", Lt.map("value", text)), "default", (Object) null));
                }
                if (index < expressions.size()) {
                    Object expression = expressions.get(index);
                    if (expression == null) throw new RuntimeException("Missing expression for template literal at index " + index);
                    args.add(Lt.map(
                        "argument", normalize_argument(Lt.get(expression, "arg"), Lt.get(expression, "struct")),
                        "default", (Object) null
                    ));
                }
            }
        } else {
            for (int index = 0; index < functionArgs.size(); index++) {
                Object functionArg = functionArgs.get(index);
                Object arg = Lt.get(functionArg, "arg");
                if (arg == Lt.MISSING) {
                    if (Lt.truthy(Lt.get(functionArg, "provided"))) {
                        throw new RuntimeException("Parameter \"" + functionName + "\" argument #" + (index + 1) + " cannot be undefined");
                    }
                    Object defaultVal = Lt.get(functionArg, "default");
                    if (defaultVal != null) {
                        validate_default(defaultVal, Lt.get(functionArg, "struct"));
                        args.add(Lt.map("argument", defaultVal, "default", defaultVal));
                        continue;
                    }
                    throw new RuntimeException("Parameter \"" + functionName + "\" argument #" + (index + 1) + " was not provided");
                }
                Object argument = normalize_argument(arg, Lt.get(functionArg, "struct"));
                Object defaultVal = Lt.get(functionArg, "default");
                if (defaultVal != null) validate_default(defaultVal, Lt.get(functionArg, "struct"));
                args.add(Lt.map("argument", argument, "default", defaultVal));
            }
        }

        values.add(Lt.map("functionCall", Lt.map(
            "name", functionName,
            "arguments", args,
            "isTemplateLiteral", isTemplateLiteral
        )));
        return newSchema;
    }

    static Map<String, Object> create_property_call_schema(Map<String, Object> oldSchema, String propertyName) {
        Map<String, Object> old = Lt.asMap(Lt.get(oldSchema, "schema"));
        Map<String, Object> oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"));
        List<Object> values = new ArrayList<>(Lt.items(Lt.get(oldChain, "values")));
        values.add(Lt.map("propertyCall", Lt.map("name", propertyName)));

        Map<String, Object> inner = new LinkedHashMap<>();
        for (Map.Entry<String, Object> entry : old.entrySet()) inner.put(entry.getKey(), entry.getValue());
        inner.put("chain", Lt.map("chain", Lt.map(
            "values", values,
            "initFunction", Lt.get(oldChain, "initFunction")
        )));
        return Lt.map("schema", inner);
    }

    static Object make_copy(String structureName, Structure source) {
        Map<String, Object> schema = source.getSchema();
        validate_schema(schema);
        return Lt.map("copy", Lt.map(
            "structureName", structureName,
            "chain", Lt.get(Lt.get(schema, "schema"), "chain")
        ));
    }

    static void apply_copies(Map<String, Object> schema, Object copies, String targetStructureName) {
        if (!Lt.truthy(copies)) return;
        for (Object cp : Lt.items(copies)) {
            if (
                !(cp instanceof Map)
                || !Lt.has(cp, "copy")
                || !(Lt.get(cp, "copy") instanceof Map)
                || !(Lt.get(Lt.get(cp, "copy"), "structureName") instanceof String)
                || !(Lt.get(Lt.get(cp, "copy"), "chain") instanceof Map)
            ) {
                throw new RuntimeException("Invalid builder argument in init function: wrap the structure with copy(...)");
            }
            String name = Lt.to_string(Lt.get(Lt.get(cp, "copy"), "structureName"));
            if (!name.equals(targetStructureName)) {
                throw new RuntimeException("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'");
            }
            Object value = Lt.map("copy", Lt.map(
                "structureName", name,
                "chain", Lt.get(Lt.get(cp, "copy"), "chain")
            ));
            Lt.asList(Lt.get(Lt.get(Lt.get(Lt.get(schema, "schema"), "chain"), "chain"), "values")).add(value);
        }
    }


    static Object normalize_argument_structure_call(Object arg) {
        if (arg instanceof SqlBuilder) {
            return Lt.get(Lt.get(((Structure) arg).getSchema(), "schema"), "chain");
        }
        String got;
        if (arg == null) got = "null";
        else if (arg instanceof List) got = "array";
        else if (arg instanceof Map) throw new RuntimeException("Unknown structure call argument type");
        else got = Mc._typeof(arg);
        throw new RuntimeException("Expected a structure instance for structure calls, but got " + got);
    }

    static Object copy(Object source) {
        if (source instanceof SqlBuilder) return make_copy("sql-builder", (Structure) source);
        throw new RuntimeException("copy() expects a structure instance created by an init function");
    }
}

class SqlBuilder implements Structure {
    Map<String, Object> schemaSqlBuilder;

    SqlBuilder() {
        schemaSqlBuilder = Lt.map("schema", Lt.map("exportName", "schema", "importPaths", Lt.map("typescript", "../../../gntrees-sql-builder/typescript/index"), "chain", Lt.map("chain", Lt.map("values", Lt.array(), "initFunction", Lt.map("name", "sql-builder", "variableName", "s1")))));
    }

    public Map<String, Object> getSchema() {
        return schemaSqlBuilder;
    }

    Map<String, Object> getSchema(String exportName, Map<String, Object> importPaths) {
        Map<String, Object> inner = Lt.asMap(schemaSqlBuilder.get("schema"));
        if (exportName != null && !exportName.isEmpty()) inner.put("exportName", exportName);
        if (importPaths != null) {
            Map<String, Object> merged = new LinkedHashMap<>();
            Object existing = inner.get("importPaths");
            if (existing instanceof Map) merged.putAll(Lt.asMap(existing));
            merged.putAll(importPaths);
            inner.put("importPaths", merged);
        }
        return schemaSqlBuilder;
    }

    SqlBuilder initFromStructure(Map<String, Object> schema) {
        Mc.validate_schema(schema);
        schemaSqlBuilder = schema;
        return this;
    }

    SqlBuilder initFromInitFunction(Map<String, Object> initFunction) {
        return initFromInitFunction(initFunction, null);
    }

    SqlBuilder initFromInitFunction(Map<String, Object> initFunction, List<Object> copies) {
        if (!(Lt.get(initFunction, "name") instanceof String) || !(Lt.get(initFunction, "variableName") instanceof String)) {
            throw new RuntimeException("Invalid init function");
        }
        Lt.asMap(Lt.get(Lt.get(Lt.get(schemaSqlBuilder, "schema"), "chain"), "chain")).put("initFunction", initFunction);
        Mc.apply_copies(schemaSqlBuilder, copies, "sql-builder");
        return this;
    }

    SqlBuilder select(Object... __a) {
        Object columns = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"select\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "select", Lt.array(
            Lt.map("arg", columns, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))))), Lt.map("map", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", columns != Lt.MISSING)
        ), false));
    }

    SqlBuilder from(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"from\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "from", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING)
        ), false));
    }

    SqlBuilder transaction(Object... __a) {
        Object transaction = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (transaction == Lt.MISSING) throw new RuntimeException("Parameter \"transaction\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "transaction", Lt.array(
            Lt.map("arg", transaction, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", transaction != Lt.MISSING)
        ), false));
    }

    SqlBuilder orderBy(Object... __a) {
        Object columns = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"orderBy\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "orderBy", Lt.array(
            Lt.map("arg", columns, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", columns != Lt.MISSING)
        ), false));
    }

    SqlBuilder limit(Object... __a) {
        Object count = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (count == Lt.MISSING) throw new RuntimeException("Parameter \"limit\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "limit", Lt.array(
            Lt.map("arg", count, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", count != Lt.MISSING)
        ), false));
    }

    SqlBuilder offset(Object... __a) {
        Object count = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (count == Lt.MISSING) throw new RuntimeException("Parameter \"offset\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "offset", Lt.array(
            Lt.map("arg", count, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", count != Lt.MISSING)
        ), false));
    }

    SqlBuilder with(Object... __a) {
        Object statement = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object as = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"with\" argument #1 was not provided");
        if (as == Lt.MISSING) throw new RuntimeException("Parameter \"with\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "with", Lt.array(
            Lt.map("arg", statement, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", statement != Lt.MISSING),
            Lt.map("arg", as, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", as != Lt.MISSING)
        ), false));
    }

    SqlBuilder groupBy(Object... __a) {
        Object columns = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"groupBy\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "groupBy", Lt.array(
            Lt.map("arg", columns, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", columns != Lt.MISSING)
        ), false));
    }

    SqlBuilder having(Object... __a) {
        Object statement = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"having\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "having", Lt.array(
            Lt.map("arg", statement, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", statement != Lt.MISSING)
        ), false));
    }

    SqlBuilder where(Object... __a) {
        Object statement = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"where\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "where", Lt.array(
            Lt.map("arg", statement, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", statement != Lt.MISSING)
        ), false));
    }

    SqlBuilder update(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object set = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"update\" argument #1 was not provided");
        if (set == Lt.MISSING) throw new RuntimeException("Parameter \"update\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "update", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", set, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("map", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", set != Lt.MISSING)
        ), false));
    }

    SqlBuilder set(Object... __a) {
        Object statement = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"set\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "set", Lt.array(
            Lt.map("arg", statement, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("map", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", statement != Lt.MISSING)
        ), false));
    }

    SqlBuilder insert(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object set = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"insert\" argument #1 was not provided");
        if (set == Lt.MISSING) throw new RuntimeException("Parameter \"insert\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "insert", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", set, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("map", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", set != Lt.MISSING)
        ), false));
    }

    SqlBuilder values(Object... __a) {
        Object values = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (values == Lt.MISSING) throw new RuntimeException("Parameter \"values\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "values", Lt.array(
            Lt.map("arg", values, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))))), Lt.map("array", Lt.map("type", Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))))), "provided", values != Lt.MISSING)
        ), false));
    }

    SqlBuilder returning(Object... __a) {
        Object columns = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"returning\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "returning", Lt.array(
            Lt.map("arg", columns, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))))), Lt.map("map", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", columns != Lt.MISSING)
        ), false));
    }

    SqlBuilder onConflictDoNothing(Object... __a) {
        Object target = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (target == Lt.MISSING) throw new RuntimeException("Parameter \"onConflictDoNothing\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoNothing", Lt.array(
            Lt.map("arg", target, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", target != Lt.MISSING)
        ), false));
    }

    SqlBuilder onConflictDoUpdate(Object... __a) {
        Object target = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object set = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (target == Lt.MISSING) throw new RuntimeException("Parameter \"onConflictDoUpdate\" argument #1 was not provided");
        if (set == Lt.MISSING) throw new RuntimeException("Parameter \"onConflictDoUpdate\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoUpdate", Lt.array(
            Lt.map("arg", target, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", target != Lt.MISSING),
            Lt.map("arg", set, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("map", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", set != Lt.MISSING)
        ), false));
    }

    SqlBuilder delete(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"delete\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "delete", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING)
        ), false));
    }

    SqlBuilder join(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object on = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"join\" argument #1 was not provided");
        if (on == Lt.MISSING) throw new RuntimeException("Parameter \"join\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "join", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", on, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", on != Lt.MISSING)
        ), false));
    }

    SqlBuilder leftJoin(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object on = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"leftJoin\" argument #1 was not provided");
        if (on == Lt.MISSING) throw new RuntimeException("Parameter \"leftJoin\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "leftJoin", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", on, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", on != Lt.MISSING)
        ), false));
    }

    SqlBuilder rightJoin(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object on = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"rightJoin\" argument #1 was not provided");
        if (on == Lt.MISSING) throw new RuntimeException("Parameter \"rightJoin\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "rightJoin", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", on, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", on != Lt.MISSING)
        ), false));
    }

    SqlBuilder innerJoin(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object on = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"innerJoin\" argument #1 was not provided");
        if (on == Lt.MISSING) throw new RuntimeException("Parameter \"innerJoin\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "innerJoin", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", on, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", on != Lt.MISSING)
        ), false));
    }

    SqlBuilder fullJoin(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object on = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"fullJoin\" argument #1 was not provided");
        if (on == Lt.MISSING) throw new RuntimeException("Parameter \"fullJoin\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "fullJoin", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", on, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", on != Lt.MISSING)
        ), false));
    }

    SqlBuilder crossJoin(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object on = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"crossJoin\" argument #1 was not provided");
        if (on == Lt.MISSING) throw new RuntimeException("Parameter \"crossJoin\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "crossJoin", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING),
            Lt.map("arg", on, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", on != Lt.MISSING)
        ), false));
    }

    SqlBuilder eq(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"eq\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "eq", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder gt(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"gt\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gt", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder gte(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"gte\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gte", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder lt(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"lt\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lt", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder lte(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"lte\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lte", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder exists(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"exists\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "exists", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder isNull(Object... __a) {
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNull", Lt.array(
        ), false));
    }

    SqlBuilder isNotNull(Object... __a) {
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNotNull", Lt.array(
        ), false));
    }

    SqlBuilder in(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"in\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "in", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder between(Object... __a) {
        Object first = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object second = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (first == Lt.MISSING) throw new RuntimeException("Parameter \"between\" argument #1 was not provided");
        if (second == Lt.MISSING) throw new RuntimeException("Parameter \"between\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "between", Lt.array(
            Lt.map("arg", first, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", first != Lt.MISSING),
            Lt.map("arg", second, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", second != Lt.MISSING)
        ), false));
    }

    SqlBuilder like(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"like\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "like", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder ilike(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"ilike\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "ilike", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder not(Object... __a) {
        Object value = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"not\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "not", Lt.array(
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder and(Object... __a) {
        Object values = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (values == Lt.MISSING) throw new RuntimeException("Parameter \"and\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "and", Lt.array(
            Lt.map("arg", values, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", values != Lt.MISSING)
        ), false));
    }

    SqlBuilder or(Object... __a) {
        Object values = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (values == Lt.MISSING) throw new RuntimeException("Parameter \"or\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "or", Lt.array(
            Lt.map("arg", values, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), Lt.map("array", Lt.map("type", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))))))), "provided", values != Lt.MISSING)
        ), false));
    }

    SqlBuilder op(Object... __a) {
        Object operation = __a.length > 0 ? __a[0] : Lt.MISSING;
        Object value = __a.length > 1 ? __a[1] : Lt.MISSING;
        if (operation == Lt.MISSING) throw new RuntimeException("Parameter \"op\" argument #1 was not provided");
        if (value == Lt.MISSING) throw new RuntimeException("Parameter \"op\" argument #2 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "op", Lt.array(
            Lt.map("arg", operation, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", operation != Lt.MISSING),
            Lt.map("arg", value, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", value != Lt.MISSING)
        ), false));
    }

    SqlBuilder raw(Object... __a) {
        List<Object> __fargs = new ArrayList<>();
        __fargs.add(Lt.map("arg", __a.length > 0 ? __a[0] : Lt.MISSING, "struct", Lt.map("string", Lt.map("type", "string"))));
        for (int __i = 1; __i < __a.length; __i++) __fargs.add(Lt.map("arg", __a[__i], "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder")))))));
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "raw", __fargs, true));
    }

    SqlBuilder asc(Object... __a) {
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "asc", Lt.array(
        ), false));
    }

    SqlBuilder desc(Object... __a) {
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "desc", Lt.array(
        ), false));
    }

    SqlBuilder as(Object... __a) {
        Object alias = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (alias == Lt.MISSING) throw new RuntimeException("Parameter \"as\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "as", Lt.array(
            Lt.map("arg", alias, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", alias != Lt.MISSING)
        ), false));
    }

    SqlBuilder col(Object... __a) {
        Object column = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (column == Lt.MISSING) throw new RuntimeException("Parameter \"col\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "col", Lt.array(
            Lt.map("arg", column, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", column != Lt.MISSING)
        ), false));
    }

    SqlBuilder table(Object... __a) {
        Object table = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (table == Lt.MISSING) throw new RuntimeException("Parameter \"table\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "table", Lt.array(
            Lt.map("arg", table, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("string", Lt.map("type", "string")), Lt.map("number", Lt.map("type", "number")), Lt.map("boolean", Lt.map("type", "boolean")), Lt.map("structureCall", Lt.map("name", "sql-builder"))))), "provided", table != Lt.MISSING)
        ), false));
    }

    SqlBuilder setDialect(Object... __a) {
        Object db = __a.length > 0 ? __a[0] : Lt.MISSING;
        if (db == Lt.MISSING) throw new RuntimeException("Parameter \"setDialect\" argument #1 was not provided");
        return new SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "setDialect", Lt.array(
            Lt.map("arg", db, "struct", Lt.map("union", Lt.map("types", Lt.array(Lt.map("literal", Lt.map("value", "postgres", "type", "string")), Lt.map("literal", Lt.map("value", "mysql", "type", "string")), Lt.map("literal", Lt.map("value", "sqlite", "type", "string")), Lt.map("literal", Lt.map("value", "single-store", "type", "string")), Lt.map("literal", Lt.map("value", "mssql", "type", "string")), Lt.map("literal", Lt.map("value", "cockroach", "type", "string"))))), "provided", db != Lt.MISSING)
        ), false));
    }

    Map<String, Object> parse() {
        Object[] root = new Object[]{ this.getSchema() };
        Map<String, Lt.Fn> __fns = new LinkedHashMap<>();
        Object[] dialect = new Object[]{ Lt.str("") };
        Object[] quote = new Object[]{ Lt.str("") };
        Object[] sql = new Object[]{ Lt.bufNew() };
        Object[] wsql = new Object[]{ Lt.bufNew() };
        Object[] params = new Object[]{ Lt.listNew() };
        Object[] orderSql = new Object[]{ Lt.str("") };
        Object[] orderW = new Object[]{ Lt.str("") };
        Object[] hasOrder = new Object[]{ Lt.bool(false) };
        Object[] tmp = new Object[]{ Lt.str("") };
        Object[] tmp2 = new Object[]{ Lt.str("") };
        Object[] tmpRef = new Object[]{ Lt.str("") };
        Object[] subAlias = new Object[]{ Lt.str("") };
        Object[] withFirst = new Object[]{ Lt.bool(true) };
        __fns.put("normName", (Object... __a) -> {
          Object[] n = new Object[]{ __a[0] };
          return Lt.to_lower(Lt.replace(n[0], Lt.str("-"), Lt.str("")));
        });
        __fns.put("pushSql", (Object... __a) -> {
          Object[] text = new Object[]{ __a[0] };
          sql[0] = Lt.bufAppend(sql[0], Lt.str(" "));
          sql[0] = Lt.bufAppend(sql[0], text[0]);
          return Lt.nullValue();
        });
        __fns.put("pushW", (Object... __a) -> {
          Object[] text = new Object[]{ __a[0] };
          wsql[0] = Lt.bufAppend(wsql[0], Lt.str(" "));
          wsql[0] = Lt.bufAppend(wsql[0], text[0]);
          return Lt.nullValue();
        });
        __fns.put("asString", (Object... __a) -> {
          Object[] arg = new Object[]{ __a[0] };
          return Lt.get(Lt.get(arg[0], Lt.str("string")), Lt.str("value"));
        });
        __fns.put("identStr", (Object... __a) -> {
          Object[] name = new Object[]{ __a[0] };
          Object[] escapedName = new Object[]{ Lt.replace(name[0], quote[0], Lt.str_concat(quote[0], quote[0])) };
          Object[] qualifiedName = new Object[]{ Lt.replace(escapedName[0], Lt.str("."), Lt.str_concat(quote[0], Lt.str_concat(Lt.str("."), quote[0]))) };
          return Lt.str_concat(quote[0], Lt.str_concat(qualifiedName[0], quote[0]));
        });
        __fns.put("literalOf", (Object... __a) -> {
          Object[] arg = new Object[]{ __a[0] };
          Object[] outLiteral = new Object[]{ Lt.str("") };
          if (Lt.truthy(Lt.has(arg[0], Lt.str("string")))) {
            outLiteral[0] = Lt.str_concat(Lt.str("'"), Lt.str_concat(Lt.replace(Lt.call(__fns, "asString", arg[0]), Lt.str("'"), Lt.str("''")), Lt.str("'")));
          }
          else if (Lt.truthy(Lt.has(arg[0], Lt.str("number")))) {
            outLiteral[0] = Lt.to_string(Lt.get(Lt.get(arg[0], Lt.str("number")), Lt.str("value")));
          }
          else if (Lt.truthy(Lt.has(arg[0], Lt.str("boolean")))) {
            if (Lt.truthy(Lt.get(Lt.get(arg[0], Lt.str("boolean")), Lt.str("value")))) {
              outLiteral[0] = Lt.str("TRUE");
            }
            else {
              outLiteral[0] = Lt.str("FALSE");
            }
          }
          else {
            outLiteral[0] = Lt.str("NULL");
          }
          return outLiteral[0];
        });
        __fns.put("opOf", (Object... __a) -> {
          Object[] n = new Object[]{ __a[0] };
          Object[] o = new Object[]{ Lt.str("") };
          if (Lt.value_equals(n[0], Lt.str("eq"))) {
            o[0] = Lt.str("=");
          }
          else if (Lt.value_equals(n[0], Lt.str("gt"))) {
            o[0] = Lt.str(">");
          }
          else if (Lt.value_equals(n[0], Lt.str("gte"))) {
            o[0] = Lt.str(">=");
          }
          else if (Lt.value_equals(n[0], Lt.str("lt"))) {
            o[0] = Lt.str("<");
          }
          else if (Lt.value_equals(n[0], Lt.str("lte"))) {
            o[0] = Lt.str("<=");
          }
          else if (Lt.value_equals(n[0], Lt.str("like"))) {
            o[0] = Lt.str("LIKE");
          }
          else if (Lt.value_equals(n[0], Lt.str("ilike"))) {
            if (Lt.value_equals(dialect[0], Lt.str("postgres"))) {
              o[0] = Lt.str("ILIKE");
            }
            else {
              o[0] = Lt.str("LIKE");
            }
          }
          return o[0];
        });
        __fns.put("itemsOf", (Object... __a) -> {
          Object[] arg = new Object[]{ __a[0] };
          if (Lt.truthy(Lt.has(arg[0], Lt.str("array")))) {
            return Lt.get(Lt.get(arg[0], Lt.str("array")), Lt.str("value"));
          }
          return Lt.append(Lt.array(), arg[0]);
        });
        __fns.put("isRef", (Object... __a) -> {
          Object[] chainValues = new Object[]{ __a[0] };
          tmpRef[0] = Lt.str("");
          if (Lt.and(Lt.value_equals(Lt.len(chainValues[0]), Lt.num(1)), Lt.truthy(Lt.has(Lt.index(chainValues[0], Lt.num(0)), Lt.str("functionCall"))))) {
            Object[] firstName = new Object[]{ Lt.get(Lt.get(Lt.index(chainValues[0], Lt.num(0)), "functionCall"), "name") };
            if (Lt.or(Lt.value_equals(firstName[0], Lt.str("col")), Lt.value_equals(firstName[0], Lt.str("table")))) {
              tmpRef[0] = Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(Lt.index(chainValues[0], Lt.num(0)), "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
            }
          }
          return tmpRef[0];
        });
        __fns.put("emitParam", (Object... __a) -> {
          Object[] arg = new Object[]{ __a[0] };
          params[0] = Lt.listPush(params[0], arg[0]);
          if (Lt.value_equals(dialect[0], Lt.str("postgres"))) {
            tmp[0] = Lt.str_concat(Lt.str("$"), Lt.to_string(Lt.listLen(params[0])));
          }
          else {
            tmp[0] = Lt.str("?");
          }
          Lt.call(__fns, "pushSql", tmp[0]);
          tmp2[0] = Lt.call(__fns, "literalOf", arg[0]);
          Lt.call(__fns, "pushW", tmp2[0]);
          return Lt.nullValue();
        });
        __fns.put("emitIdent", (Object... __a) -> {
          Object[] name = new Object[]{ __a[0] };
          tmp[0] = Lt.call(__fns, "identStr", name[0]);
          Lt.call(__fns, "pushSql", tmp[0]);
          Lt.call(__fns, "pushW", tmp[0]);
          return Lt.nullValue();
        });
        __fns.put("emitRaw", (Object... __a) -> {
          Object[] node = new Object[]{ __a[0] };
          if (Lt.value_not_equals(Lt.bufLen(sql[0]), Lt.num(0))) {
            sql[0] = Lt.bufAppend(sql[0], Lt.str(" "));
            wsql[0] = Lt.bufAppend(wsql[0], Lt.str(" "));
          }
          {
            List<Object> __arr_rawArg = Lt.items(Lt.get(Lt.get(node[0], "functionCall"), "arguments"));
            for (int __i_rawArg = 0; __i_rawArg < __arr_rawArg.size(); __i_rawArg++) {
              Object[] rawArg = new Object[]{ __arr_rawArg.get(__i_rawArg) };
                Object[] rawVal = new Object[]{ Lt.get(rawArg[0], Lt.str("argument")) };
                if (Lt.truthy(Lt.has(rawVal[0], Lt.str("string")))) {
                  sql[0] = Lt.bufAppend(sql[0], Lt.call(__fns, "asString", rawVal[0]));
                  wsql[0] = Lt.bufAppend(wsql[0], Lt.call(__fns, "asString", rawVal[0]));
                }
                else if (Lt.truthy(Lt.has(rawVal[0], Lt.str("chain")))) {
                  tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(rawVal[0], "chain"), "values"));
                  if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                    sql[0] = Lt.bufAppend(sql[0], Lt.call(__fns, "identStr", tmpRef[0]));
                    wsql[0] = Lt.bufAppend(wsql[0], Lt.call(__fns, "identStr", tmpRef[0]));
                  }
                  else {
                    params[0] = Lt.listPush(params[0], rawVal[0]);
                    if (Lt.value_equals(dialect[0], Lt.str("postgres"))) {
                      tmp[0] = Lt.str_concat(Lt.str("$"), Lt.to_string(Lt.listLen(params[0])));
                    }
                    else {
                      tmp[0] = Lt.str("?");
                    }
                    sql[0] = Lt.bufAppend(sql[0], tmp[0]);
                    tmp2[0] = Lt.call(__fns, "literalOf", rawVal[0]);
                    wsql[0] = Lt.bufAppend(wsql[0], tmp2[0]);
                  }
                }
                else {
                  params[0] = Lt.listPush(params[0], rawVal[0]);
                  if (Lt.value_equals(dialect[0], Lt.str("postgres"))) {
                    tmp[0] = Lt.str_concat(Lt.str("$"), Lt.to_string(Lt.listLen(params[0])));
                  }
                  else {
                    tmp[0] = Lt.str("?");
                  }
                  sql[0] = Lt.bufAppend(sql[0], tmp[0]);
                  tmp2[0] = Lt.call(__fns, "literalOf", rawVal[0]);
                  wsql[0] = Lt.bufAppend(wsql[0], tmp2[0]);
                }
            }
          }
          return Lt.nullValue();
        });
        __fns.put("conflictTarget", (Object... __a) -> {
          Object[] arg = new Object[]{ __a[0] };
          Object[] ct = new Object[]{ Lt.str("()") };
          if (Lt.truthy(Lt.has(arg[0], Lt.str("chain")))) {
            tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(arg[0], "chain"), "values"));
            if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
              ct[0] = Lt.str_concat(Lt.str("("), Lt.str_concat(Lt.call(__fns, "identStr", tmpRef[0]), Lt.str(")")));
            }
          }
          else if (Lt.truthy(Lt.has(arg[0], Lt.str("string")))) {
            ct[0] = Lt.str_concat(Lt.str("("), Lt.str_concat(Lt.call(__fns, "identStr", Lt.call(__fns, "asString", arg[0])), Lt.str(")")));
          }
          return ct[0];
        });
        __fns.put("firstKind", (Object... __a) -> {
          Object[] chainValues = new Object[]{ __a[0] };
          Object[] kind = new Object[]{ Lt.str("") };
          if (Lt.and(Lt.value_not_equals(Lt.len(chainValues[0]), Lt.num(0)), Lt.truthy(Lt.has(Lt.index(chainValues[0], Lt.num(0)), Lt.str("functionCall"))))) {
            kind[0] = Lt.call(__fns, "normName", Lt.get(Lt.get(Lt.index(chainValues[0], Lt.num(0)), "functionCall"), "name"));
          }
          return kind[0];
        });
        __fns.put("emitOrderItem", (Object... __a) -> {
          Object[] item = new Object[]{ __a[0] };
          Object[] dir = new Object[]{ Lt.str("") };
          Object[] ordName = new Object[]{ Lt.str("") };
          if (Lt.truthy(Lt.has(item[0], Lt.str("chain")))) {
            {
              List<Object> __arr_on = Lt.items(Lt.get(Lt.get(item[0], "chain"), "values"));
              for (int __i_on = 0; __i_on < __arr_on.size(); __i_on++) {
                Object[] on = new Object[]{ __arr_on.get(__i_on) };
                  Object[] onn = new Object[]{ Lt.call(__fns, "normName", Lt.get(Lt.get(on[0], "functionCall"), "name")) };
                  if (Lt.value_equals(onn[0], Lt.str("asc"))) {
                    dir[0] = Lt.str(" ASC");
                  }
                  else if (Lt.value_equals(onn[0], Lt.str("desc"))) {
                    dir[0] = Lt.str(" DESC");
                  }
                  else if (Lt.or(Lt.value_equals(onn[0], Lt.str("col")), Lt.value_equals(onn[0], Lt.str("table")))) {
                    ordName[0] = Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(on[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                  }
              }
            }
          }
          if (Lt.value_not_equals(ordName[0], Lt.str(""))) {
            tmp[0] = Lt.call(__fns, "identStr", ordName[0]);
            orderSql[0] = Lt.str_concat(orderSql[0], Lt.str_concat(tmp[0], dir[0]));
            orderW[0] = Lt.str_concat(orderW[0], Lt.str_concat(tmp[0], dir[0]));
          }
          return Lt.nullValue();
        });
        __fns.put("emitOrderList", (Object... __a) -> {
          Object[] arg = new Object[]{ __a[0] };
          Object[] firstOrder = new Object[]{ Lt.bool(true) };
          {
            List<Object> __arr_item = Lt.items(Lt.call(__fns, "itemsOf", arg[0]));
            for (int __i_item = 0; __i_item < __arr_item.size(); __i_item++) {
              Object[] item = new Object[]{ __arr_item.get(__i_item) };
                if (Lt.value_equals(firstOrder[0], Lt.bool(false))) {
                  orderSql[0] = Lt.str_concat(orderSql[0], Lt.str(", "));
                  orderW[0] = Lt.str_concat(orderW[0], Lt.str(", "));
                }
                firstOrder[0] = Lt.bool(false);
                Lt.call(__fns, "emitOrderItem", item[0]);
            }
          }
          return Lt.nullValue();
        });
        __fns.put("flushOrder", (Object... __a) -> {
          if (Lt.truthy(hasOrder[0])) {
            Lt.call(__fns, "pushSql", Lt.str("ORDER"));
            Lt.call(__fns, "pushSql", Lt.str("BY"));
            Lt.call(__fns, "pushW", Lt.str("ORDER"));
            Lt.call(__fns, "pushW", Lt.str("BY"));
            tmp[0] = orderSql[0];
            if (Lt.value_not_equals(tmp[0], Lt.str(""))) {
              Lt.call(__fns, "pushSql", tmp[0]);
            }
            tmp2[0] = orderW[0];
            if (Lt.value_not_equals(tmp2[0], Lt.str(""))) {
              Lt.call(__fns, "pushW", tmp2[0]);
            }
            hasOrder[0] = Lt.bool(false);
          }
          return Lt.nullValue();
        });
        {
          List<Object> __arr_dialectNode = Lt.items(Lt.get(Lt.get(Lt.get(Lt.get(root[0], "schema"), "chain"), "chain"), "values"));
          for (int __i_dialectNode = 0; __i_dialectNode < __arr_dialectNode.size(); __i_dialectNode++) {
            Object[] dialectNode = new Object[]{ __arr_dialectNode.get(__i_dialectNode) };
              if (Lt.value_equals(Lt.call(__fns, "normName", Lt.get(Lt.get(dialectNode[0], "functionCall"), "name")), Lt.str("setdialect"))) {
                dialect[0] = Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(dialectNode[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("string")), Lt.str("value"));
              }
          }
        }
        if (Lt.value_equals(dialect[0], Lt.str(""))) {
          throw new RuntimeException(Lt.to_string(Lt.str("sql-builder parse: setDialect(...) must be called before parse()")));
        }
        else if (Lt.and(Lt.value_not_equals(dialect[0], Lt.str("postgres")), Lt.value_not_equals(dialect[0], Lt.str("mysql")))) {
          throw new RuntimeException(Lt.to_string(Lt.str_concat(Lt.str("sql-builder parse: unsupported dialect "), dialect[0])));
        }
        if (Lt.value_equals(dialect[0], Lt.str("mysql"))) {
          quote[0] = Lt.str("`");
        }
        else {
          quote[0] = Lt.str("\"");
        }
        __fns.put("renderNodes", (Object... __a) -> {
          Object[] nodes = new Object[]{ __a[0] };
          Object[] mode = new Object[]{ __a[1] };
          Object[] savedSql = new Object[]{ Lt.str("") };
          Object[] savedW = new Object[]{ Lt.str("") };
          Object[] savedOrderSql = new Object[]{ Lt.str("") };
          Object[] savedOrderW = new Object[]{ Lt.str("") };
          Object[] savedHasOrder = new Object[]{ Lt.bool(false) };
          Object[] savedAlias = new Object[]{ Lt.str("") };
          Object[] subSql = new Object[]{ Lt.str("") };
          Object[] subW = new Object[]{ Lt.str("") };
          Object[] subAliasText = new Object[]{ Lt.str("") };
          Object[] first = new Object[]{ Lt.bool(true) };
          Object[] left = new Object[]{ Lt.str("") };
          Object[] hasLeft = new Object[]{ Lt.bool(false) };
          Object[] base = new Object[]{ Lt.str("") };
          if (Lt.value_equals(mode[0], Lt.num(0))) {
            {
              List<Object> __arr_node = Lt.items(nodes[0]);
              for (int __i_node = 0; __i_node < __arr_node.size(); __i_node++) {
                Object[] node = new Object[]{ __arr_node.get(__i_node) };
                  if (Lt.truthy(Lt.has(node[0], Lt.str("functionCall")))) {
                    Object[] name = new Object[]{ Lt.get(Lt.get(node[0], "functionCall"), "name") };
                    Object[] nameNorm = new Object[]{ Lt.call(__fns, "normName", name[0]) };
                    if (Lt.value_equals(nameNorm[0], Lt.str("setdialect"))) {
                      continue;
                    }
                    else if (Lt.or(Lt.value_equals(nameNorm[0], Lt.str("asc")), Lt.value_equals(nameNorm[0], Lt.str("desc")))) {
                      if (Lt.truthy(hasOrder[0])) {
                        tmp[0] = Lt.to_upper(nameNorm[0]);
                        orderSql[0] = Lt.str_concat(orderSql[0], Lt.str_concat(Lt.str(" "), tmp[0]));
                        orderW[0] = Lt.str_concat(orderW[0], Lt.str_concat(Lt.str(" "), tmp[0]));
                      }
                    }
                    else {
                      if (Lt.value_equals(nameNorm[0], Lt.str("with"))) {
                        savedSql[0] = sql[0];
                        savedW[0] = wsql[0];
                        savedOrderSql[0] = orderSql[0];
                        savedOrderW[0] = orderW[0];
                        savedHasOrder[0] = hasOrder[0];
                        sql[0] = Lt.bufNew();
                        wsql[0] = Lt.bufNew();
                        orderSql[0] = Lt.str("");
                        orderW[0] = Lt.str("");
                        hasOrder[0] = Lt.bool(false);
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                        subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                        subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                        sql[0] = savedSql[0];
                        wsql[0] = savedW[0];
                        orderSql[0] = savedOrderSql[0];
                        orderW[0] = savedOrderW[0];
                        hasOrder[0] = savedHasOrder[0];
                        if (Lt.value_equals(withFirst[0], Lt.bool(false))) {
                          sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                          wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                        }
                        else {
                          withFirst[0] = Lt.bool(false);
                          Lt.call(__fns, "pushSql", Lt.str("WITH"));
                          Lt.call(__fns, "pushW", Lt.str("WITH"));
                        }
                        Lt.call(__fns, "pushSql", Lt.call(__fns, "identStr", Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")))));
                        Lt.call(__fns, "pushW", Lt.call(__fns, "identStr", Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")))));
                        Lt.call(__fns, "pushSql", Lt.str("AS"));
                        Lt.call(__fns, "pushW", Lt.str("AS"));
                        Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                        Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("transaction"))) {
                        Lt.call(__fns, "pushSql", Lt.str("BEGIN"));
                        Lt.call(__fns, "pushW", Lt.str("BEGIN"));
                        sql[0] = Lt.bufAppend(sql[0], Lt.str(";"));
                        wsql[0] = Lt.bufAppend(wsql[0], Lt.str(";"));
                        Object[] txnFirst = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_txnItem = Lt.items(Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          for (int __i_txnItem = 0; __i_txnItem < __arr_txnItem.size(); __i_txnItem++) {
                            Object[] txnItem = new Object[]{ __arr_txnItem.get(__i_txnItem) };
                              if (Lt.value_equals(txnFirst[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(";"));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(";"));
                              }
                              txnFirst[0] = Lt.bool(false);
                              if (Lt.truthy(Lt.has(txnItem[0], Lt.str("chain")))) {
                                Lt.call(__fns, "renderNodes", Lt.get(Lt.get(txnItem[0], "chain"), "values"), Lt.num(0));
                              }
                              else if (Lt.truthy(Lt.has(txnItem[0], Lt.str("string")))) {
                                Lt.call(__fns, "pushSql", Lt.call(__fns, "asString", txnItem[0]));
                                Lt.call(__fns, "pushW", Lt.call(__fns, "asString", txnItem[0]));
                              }
                              else {
                                if (Lt.truthy(Lt.has(txnItem[0], Lt.str("chain")))) {
                                  tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(txnItem[0], "chain"), "values"));
                                  if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                    Lt.call(__fns, "emitIdent", tmpRef[0]);
                                  }
                                  else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(txnItem[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(txnItem[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(txnItem[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(txnItem[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(txnItem[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(txnItem[0], "chain"), "values")), Lt.str("delete"))))))) {
                                    savedSql[0] = sql[0];
                                    savedW[0] = wsql[0];
                                    savedOrderSql[0] = orderSql[0];
                                    savedOrderW[0] = orderW[0];
                                    savedHasOrder[0] = hasOrder[0];
                                    savedAlias[0] = subAlias[0];
                                    sql[0] = Lt.bufNew();
                                    wsql[0] = Lt.bufNew();
                                    orderSql[0] = Lt.str("");
                                    orderW[0] = Lt.str("");
                                    hasOrder[0] = Lt.bool(false);
                                    subAlias[0] = Lt.str("");
                                    Lt.call(__fns, "renderNodes", Lt.get(Lt.get(txnItem[0], "chain"), "values"), Lt.num(0));
                                    subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                    subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                    subAliasText[0] = subAlias[0];
                                    sql[0] = savedSql[0];
                                    wsql[0] = savedW[0];
                                    orderSql[0] = savedOrderSql[0];
                                    orderW[0] = savedOrderW[0];
                                    hasOrder[0] = savedHasOrder[0];
                                    subAlias[0] = savedAlias[0];
                                    Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                    Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                    if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                      Lt.call(__fns, "pushSql", subAliasText[0]);
                                      Lt.call(__fns, "pushW", subAliasText[0]);
                                    }
                                  }
                                  else {
                                    Lt.call(__fns, "emitParam", txnItem[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", txnItem[0]);
                                }
                              }
                          }
                        }
                        if (Lt.value_equals(txnFirst[0], Lt.bool(false))) {
                          sql[0] = Lt.bufAppend(sql[0], Lt.str(";"));
                          wsql[0] = Lt.bufAppend(wsql[0], Lt.str(";"));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("COMMIT"));
                        Lt.call(__fns, "pushW", Lt.str("COMMIT"));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("select"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("SELECT"));
                        Lt.call(__fns, "pushW", Lt.str("SELECT"));
                        Object[] firstItem = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_item = Lt.items(Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          for (int __i_item = 0; __i_item < __arr_item.size(); __i_item++) {
                            Object[] item = new Object[]{ __arr_item.get(__i_item) };
                              if (Lt.value_equals(firstItem[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                              }
                              firstItem[0] = Lt.bool(false);
                              if (Lt.truthy(Lt.has(item[0], Lt.str("chain")))) {
                                tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(item[0], "chain"), "values"));
                                if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                  Lt.call(__fns, "emitIdent", tmpRef[0]);
                                }
                                else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("delete"))))))) {
                                  savedSql[0] = sql[0];
                                  savedW[0] = wsql[0];
                                  savedOrderSql[0] = orderSql[0];
                                  savedOrderW[0] = orderW[0];
                                  savedHasOrder[0] = hasOrder[0];
                                  savedAlias[0] = subAlias[0];
                                  sql[0] = Lt.bufNew();
                                  wsql[0] = Lt.bufNew();
                                  orderSql[0] = Lt.str("");
                                  orderW[0] = Lt.str("");
                                  hasOrder[0] = Lt.bool(false);
                                  subAlias[0] = Lt.str("");
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(item[0], "chain"), "values"), Lt.num(0));
                                  subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                  subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                  subAliasText[0] = subAlias[0];
                                  sql[0] = savedSql[0];
                                  wsql[0] = savedW[0];
                                  orderSql[0] = savedOrderSql[0];
                                  orderW[0] = savedOrderW[0];
                                  hasOrder[0] = savedHasOrder[0];
                                  subAlias[0] = savedAlias[0];
                                  Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                  Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                  if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                    Lt.call(__fns, "pushSql", subAliasText[0]);
                                    Lt.call(__fns, "pushW", subAliasText[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(item[0], "chain"), "values"), Lt.num(1));
                                }
                              }
                              else {
                                Lt.call(__fns, "emitParam", item[0]);
                              }
                          }
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("from"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("FROM"));
                        Lt.call(__fns, "pushW", Lt.str("FROM"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("join"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("JOIN"));
                        Lt.call(__fns, "pushW", Lt.str("JOIN"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("ON"));
                        Lt.call(__fns, "pushW", Lt.str("ON"));
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("leftjoin"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("LEFT JOIN"));
                        Lt.call(__fns, "pushW", Lt.str("LEFT JOIN"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("ON"));
                        Lt.call(__fns, "pushW", Lt.str("ON"));
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("rightjoin"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("RIGHT JOIN"));
                        Lt.call(__fns, "pushW", Lt.str("RIGHT JOIN"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("ON"));
                        Lt.call(__fns, "pushW", Lt.str("ON"));
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("innerjoin"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("INNER JOIN"));
                        Lt.call(__fns, "pushW", Lt.str("INNER JOIN"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("ON"));
                        Lt.call(__fns, "pushW", Lt.str("ON"));
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("fulljoin"))) {
                        if (Lt.value_equals(dialect[0], Lt.str("mysql"))) {
                          throw new RuntimeException(Lt.to_string(Lt.str("sql-builder parse: FULL JOIN is not supported by mysql")));
                        }
                        else {
                          Lt.call(__fns, "flushOrder");
                          Lt.call(__fns, "pushSql", Lt.str("FULL JOIN"));
                          Lt.call(__fns, "pushW", Lt.str("FULL JOIN"));
                          if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                            tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                            if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                              Lt.call(__fns, "emitIdent", tmpRef[0]);
                            }
                            else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                              savedSql[0] = sql[0];
                              savedW[0] = wsql[0];
                              savedOrderSql[0] = orderSql[0];
                              savedOrderW[0] = orderW[0];
                              savedHasOrder[0] = hasOrder[0];
                              savedAlias[0] = subAlias[0];
                              sql[0] = Lt.bufNew();
                              wsql[0] = Lt.bufNew();
                              orderSql[0] = Lt.str("");
                              orderW[0] = Lt.str("");
                              hasOrder[0] = Lt.bool(false);
                              subAlias[0] = Lt.str("");
                              Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                              subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                              subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                              subAliasText[0] = subAlias[0];
                              sql[0] = savedSql[0];
                              wsql[0] = savedW[0];
                              orderSql[0] = savedOrderSql[0];
                              orderW[0] = savedOrderW[0];
                              hasOrder[0] = savedHasOrder[0];
                              subAlias[0] = savedAlias[0];
                              Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                              Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                              if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                Lt.call(__fns, "pushSql", subAliasText[0]);
                                Lt.call(__fns, "pushW", subAliasText[0]);
                              }
                            }
                            else {
                              Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                            }
                          }
                          else {
                            Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                          }
                          Lt.call(__fns, "pushSql", Lt.str("ON"));
                          Lt.call(__fns, "pushW", Lt.str("ON"));
                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("crossjoin"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("CROSS JOIN"));
                        Lt.call(__fns, "pushW", Lt.str("CROSS JOIN"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("ON"));
                        Lt.call(__fns, "pushW", Lt.str("ON"));
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("where"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("WHERE"));
                        Lt.call(__fns, "pushW", Lt.str("WHERE"));
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("groupby"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("GROUP BY"));
                        Lt.call(__fns, "pushW", Lt.str("GROUP BY"));
                        Object[] firstItem = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_item = Lt.items(Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          for (int __i_item = 0; __i_item < __arr_item.size(); __i_item++) {
                            Object[] item = new Object[]{ __arr_item.get(__i_item) };
                              if (Lt.value_equals(firstItem[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                              }
                              firstItem[0] = Lt.bool(false);
                              if (Lt.truthy(Lt.has(item[0], Lt.str("chain")))) {
                                tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(item[0], "chain"), "values"));
                                if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                  Lt.call(__fns, "emitIdent", tmpRef[0]);
                                }
                                else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("delete"))))))) {
                                  savedSql[0] = sql[0];
                                  savedW[0] = wsql[0];
                                  savedOrderSql[0] = orderSql[0];
                                  savedOrderW[0] = orderW[0];
                                  savedHasOrder[0] = hasOrder[0];
                                  savedAlias[0] = subAlias[0];
                                  sql[0] = Lt.bufNew();
                                  wsql[0] = Lt.bufNew();
                                  orderSql[0] = Lt.str("");
                                  orderW[0] = Lt.str("");
                                  hasOrder[0] = Lt.bool(false);
                                  subAlias[0] = Lt.str("");
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(item[0], "chain"), "values"), Lt.num(0));
                                  subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                  subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                  subAliasText[0] = subAlias[0];
                                  sql[0] = savedSql[0];
                                  wsql[0] = savedW[0];
                                  orderSql[0] = savedOrderSql[0];
                                  orderW[0] = savedOrderW[0];
                                  hasOrder[0] = savedHasOrder[0];
                                  subAlias[0] = savedAlias[0];
                                  Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                  Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                  if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                    Lt.call(__fns, "pushSql", subAliasText[0]);
                                    Lt.call(__fns, "pushW", subAliasText[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(item[0], "chain"), "values"), Lt.num(1));
                                }
                              }
                              else {
                                Lt.call(__fns, "emitParam", item[0]);
                              }
                          }
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("having"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("HAVING"));
                        Lt.call(__fns, "pushW", Lt.str("HAVING"));
                        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("returning"))) {
                        if (Lt.value_equals(dialect[0], Lt.str("mysql"))) {
                          throw new RuntimeException(Lt.to_string(Lt.str("sql-builder parse: RETURNING is not supported by mysql")));
                        }
                        else {
                          Lt.call(__fns, "flushOrder");
                          Lt.call(__fns, "pushSql", Lt.str("RETURNING"));
                          Lt.call(__fns, "pushW", Lt.str("RETURNING"));
                          Object[] firstItem = new Object[]{ Lt.bool(true) };
                          {
                            List<Object> __arr_item = Lt.items(Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                            for (int __i_item = 0; __i_item < __arr_item.size(); __i_item++) {
                              Object[] item = new Object[]{ __arr_item.get(__i_item) };
                                if (Lt.value_equals(firstItem[0], Lt.bool(false))) {
                                  sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                  wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                                }
                                firstItem[0] = Lt.bool(false);
                                if (Lt.truthy(Lt.has(item[0], Lt.str("chain")))) {
                                  tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(item[0], "chain"), "values"));
                                  if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                    Lt.call(__fns, "emitIdent", tmpRef[0]);
                                  }
                                  else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(item[0], "chain"), "values")), Lt.str("delete"))))))) {
                                    savedSql[0] = sql[0];
                                    savedW[0] = wsql[0];
                                    savedOrderSql[0] = orderSql[0];
                                    savedOrderW[0] = orderW[0];
                                    savedHasOrder[0] = hasOrder[0];
                                    savedAlias[0] = subAlias[0];
                                    sql[0] = Lt.bufNew();
                                    wsql[0] = Lt.bufNew();
                                    orderSql[0] = Lt.str("");
                                    orderW[0] = Lt.str("");
                                    hasOrder[0] = Lt.bool(false);
                                    subAlias[0] = Lt.str("");
                                    Lt.call(__fns, "renderNodes", Lt.get(Lt.get(item[0], "chain"), "values"), Lt.num(0));
                                    subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                    subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                    subAliasText[0] = subAlias[0];
                                    sql[0] = savedSql[0];
                                    wsql[0] = savedW[0];
                                    orderSql[0] = savedOrderSql[0];
                                    orderW[0] = savedOrderW[0];
                                    hasOrder[0] = savedHasOrder[0];
                                    subAlias[0] = savedAlias[0];
                                    Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                    Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                    if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                      Lt.call(__fns, "pushSql", subAliasText[0]);
                                      Lt.call(__fns, "pushW", subAliasText[0]);
                                    }
                                  }
                                  else {
                                    Lt.call(__fns, "renderNodes", Lt.get(Lt.get(item[0], "chain"), "values"), Lt.num(1));
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", item[0]);
                                }
                            }
                          }
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("orderby"))) {
                        hasOrder[0] = Lt.bool(true);
                        orderSql[0] = Lt.str("");
                        orderW[0] = Lt.str("");
                        Lt.call(__fns, "emitOrderList", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("limit"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("LIMIT"));
                        Lt.call(__fns, "pushW", Lt.str("LIMIT"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("offset"))) {
                        Lt.call(__fns, "flushOrder");
                        Lt.call(__fns, "pushSql", Lt.str("OFFSET"));
                        Lt.call(__fns, "pushW", Lt.str("OFFSET"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("raw"))) {
                        Lt.call(__fns, "emitRaw", node[0]);
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("as"))) {
                        subAlias[0] = Lt.str_concat(Lt.str("AS "), Lt.call(__fns, "identStr", Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")))));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("update"))) {
                        Lt.call(__fns, "pushSql", Lt.str("UPDATE"));
                        Lt.call(__fns, "pushW", Lt.str("UPDATE"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("SET"));
                        Lt.call(__fns, "pushW", Lt.str("SET"));
                        Object[] assnFirst = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_ak = Lt.items(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value")));
                          for (int __i_ak = 0; __i_ak < __arr_ak.size(); __i_ak++) {
                            Object[] ak = new Object[]{ __arr_ak.get(__i_ak) };
                              if (Lt.value_equals(assnFirst[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                              }
                              assnFirst[0] = Lt.bool(false);
                              Lt.call(__fns, "pushSql", Lt.call(__fns, "identStr", ak[0]));
                              Lt.call(__fns, "pushW", Lt.call(__fns, "identStr", ak[0]));
                              Lt.call(__fns, "pushSql", Lt.str("="));
                              Lt.call(__fns, "pushW", Lt.str("="));
                              if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), Lt.str("chain")))) {
                                tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"));
                                if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                  Lt.call(__fns, "emitIdent", tmpRef[0]);
                                }
                                else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("delete"))))))) {
                                  savedSql[0] = sql[0];
                                  savedW[0] = wsql[0];
                                  savedOrderSql[0] = orderSql[0];
                                  savedOrderW[0] = orderW[0];
                                  savedHasOrder[0] = hasOrder[0];
                                  savedAlias[0] = subAlias[0];
                                  sql[0] = Lt.bufNew();
                                  wsql[0] = Lt.bufNew();
                                  orderSql[0] = Lt.str("");
                                  orderW[0] = Lt.str("");
                                  hasOrder[0] = Lt.bool(false);
                                  subAlias[0] = Lt.str("");
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"), Lt.num(0));
                                  subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                  subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                  subAliasText[0] = subAlias[0];
                                  sql[0] = savedSql[0];
                                  wsql[0] = savedW[0];
                                  orderSql[0] = savedOrderSql[0];
                                  orderW[0] = savedOrderW[0];
                                  hasOrder[0] = savedHasOrder[0];
                                  subAlias[0] = savedAlias[0];
                                  Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                  Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                  if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                    Lt.call(__fns, "pushSql", subAliasText[0]);
                                    Lt.call(__fns, "pushW", subAliasText[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]));
                                }
                              }
                              else {
                                Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]));
                              }
                          }
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("insert"))) {
                        Lt.call(__fns, "pushSql", Lt.str("INSERT"));
                        Lt.call(__fns, "pushW", Lt.str("INSERT"));
                        Lt.call(__fns, "pushSql", Lt.str("INTO"));
                        Lt.call(__fns, "pushW", Lt.str("INTO"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                        Lt.call(__fns, "pushSql", Lt.str("("));
                        Lt.call(__fns, "pushW", Lt.str("("));
                        Object[] colFirst = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_ck = Lt.items(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value")));
                          for (int __i_ck = 0; __i_ck < __arr_ck.size(); __i_ck++) {
                            Object[] ck = new Object[]{ __arr_ck.get(__i_ck) };
                              if (Lt.value_equals(colFirst[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                              }
                              colFirst[0] = Lt.bool(false);
                              Lt.call(__fns, "pushSql", Lt.call(__fns, "identStr", ck[0]));
                              Lt.call(__fns, "pushW", Lt.call(__fns, "identStr", ck[0]));
                          }
                        }
                        Lt.call(__fns, "pushSql", Lt.str(")"));
                        Lt.call(__fns, "pushW", Lt.str(")"));
                        Lt.call(__fns, "pushSql", Lt.str("VALUES"));
                        Lt.call(__fns, "pushW", Lt.str("VALUES"));
                        Lt.call(__fns, "pushSql", Lt.str("("));
                        Lt.call(__fns, "pushW", Lt.str("("));
                        Object[] valFirst = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_vk = Lt.items(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value")));
                          for (int __i_vk = 0; __i_vk < __arr_vk.size(); __i_vk++) {
                            Object[] vk = new Object[]{ __arr_vk.get(__i_vk) };
                              if (Lt.value_equals(valFirst[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                              }
                              valFirst[0] = Lt.bool(false);
                              if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), Lt.str("chain")))) {
                                tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values"));
                                if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                  Lt.call(__fns, "emitIdent", tmpRef[0]);
                                }
                                else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values")), Lt.str("delete"))))))) {
                                  savedSql[0] = sql[0];
                                  savedW[0] = wsql[0];
                                  savedOrderSql[0] = orderSql[0];
                                  savedOrderW[0] = orderW[0];
                                  savedHasOrder[0] = hasOrder[0];
                                  savedAlias[0] = subAlias[0];
                                  sql[0] = Lt.bufNew();
                                  wsql[0] = Lt.bufNew();
                                  orderSql[0] = Lt.str("");
                                  orderW[0] = Lt.str("");
                                  hasOrder[0] = Lt.bool(false);
                                  subAlias[0] = Lt.str("");
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]), "chain"), "values"), Lt.num(0));
                                  subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                  subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                  subAliasText[0] = subAlias[0];
                                  sql[0] = savedSql[0];
                                  wsql[0] = savedW[0];
                                  orderSql[0] = savedOrderSql[0];
                                  orderW[0] = savedOrderW[0];
                                  hasOrder[0] = savedHasOrder[0];
                                  subAlias[0] = savedAlias[0];
                                  Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                  Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                  if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                    Lt.call(__fns, "pushSql", subAliasText[0]);
                                    Lt.call(__fns, "pushW", subAliasText[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]));
                                }
                              }
                              else {
                                Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), vk[0]));
                              }
                          }
                        }
                        Lt.call(__fns, "pushSql", Lt.str(")"));
                        Lt.call(__fns, "pushW", Lt.str(")"));
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("delete"))) {
                        Lt.call(__fns, "pushSql", Lt.str("DELETE"));
                        Lt.call(__fns, "pushW", Lt.str("DELETE"));
                        Lt.call(__fns, "pushSql", Lt.str("FROM"));
                        Lt.call(__fns, "pushW", Lt.str("FROM"));
                        if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                          tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                          if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                            Lt.call(__fns, "emitIdent", tmpRef[0]);
                          }
                          else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                            savedSql[0] = sql[0];
                            savedW[0] = wsql[0];
                            savedOrderSql[0] = orderSql[0];
                            savedOrderW[0] = orderW[0];
                            savedHasOrder[0] = hasOrder[0];
                            savedAlias[0] = subAlias[0];
                            sql[0] = Lt.bufNew();
                            wsql[0] = Lt.bufNew();
                            orderSql[0] = Lt.str("");
                            orderW[0] = Lt.str("");
                            hasOrder[0] = Lt.bool(false);
                            subAlias[0] = Lt.str("");
                            Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                            subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                            subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                            subAliasText[0] = subAlias[0];
                            sql[0] = savedSql[0];
                            wsql[0] = savedW[0];
                            orderSql[0] = savedOrderSql[0];
                            orderW[0] = savedOrderW[0];
                            hasOrder[0] = savedHasOrder[0];
                            subAlias[0] = savedAlias[0];
                            Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                            Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                            if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                              Lt.call(__fns, "pushSql", subAliasText[0]);
                              Lt.call(__fns, "pushW", subAliasText[0]);
                            }
                          }
                          else {
                            Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("set"))) {
                        Lt.call(__fns, "pushSql", Lt.str("SET"));
                        Lt.call(__fns, "pushW", Lt.str("SET"));
                        Object[] assnFirst = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_ak = Lt.items(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value")));
                          for (int __i_ak = 0; __i_ak < __arr_ak.size(); __i_ak++) {
                            Object[] ak = new Object[]{ __arr_ak.get(__i_ak) };
                              if (Lt.value_equals(assnFirst[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                              }
                              assnFirst[0] = Lt.bool(false);
                              Lt.call(__fns, "pushSql", Lt.call(__fns, "identStr", ak[0]));
                              Lt.call(__fns, "pushW", Lt.call(__fns, "identStr", ak[0]));
                              Lt.call(__fns, "pushSql", Lt.str("="));
                              Lt.call(__fns, "pushW", Lt.str("="));
                              if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), Lt.str("chain")))) {
                                tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"));
                                if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                  Lt.call(__fns, "emitIdent", tmpRef[0]);
                                }
                                else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("delete"))))))) {
                                  savedSql[0] = sql[0];
                                  savedW[0] = wsql[0];
                                  savedOrderSql[0] = orderSql[0];
                                  savedOrderW[0] = orderW[0];
                                  savedHasOrder[0] = hasOrder[0];
                                  savedAlias[0] = subAlias[0];
                                  sql[0] = Lt.bufNew();
                                  wsql[0] = Lt.bufNew();
                                  orderSql[0] = Lt.str("");
                                  orderW[0] = Lt.str("");
                                  hasOrder[0] = Lt.bool(false);
                                  subAlias[0] = Lt.str("");
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"), Lt.num(0));
                                  subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                  subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                  subAliasText[0] = subAlias[0];
                                  sql[0] = savedSql[0];
                                  wsql[0] = savedW[0];
                                  orderSql[0] = savedOrderSql[0];
                                  orderW[0] = savedOrderW[0];
                                  hasOrder[0] = savedHasOrder[0];
                                  subAlias[0] = savedAlias[0];
                                  Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                  Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                  if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                    Lt.call(__fns, "pushSql", subAliasText[0]);
                                    Lt.call(__fns, "pushW", subAliasText[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]));
                                }
                              }
                              else {
                                Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "object"), "value"), ak[0]));
                              }
                          }
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("values"))) {
                        Lt.call(__fns, "pushSql", Lt.str("VALUES"));
                        Lt.call(__fns, "pushW", Lt.str("VALUES"));
                        Object[] valueRows = new Object[]{ Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))) };
                        Object[] valueFirst = new Object[]{ Lt.bool(true) };
                        if (Lt.and(Lt.value_not_equals(Lt.len(valueRows[0]), Lt.num(0)), Lt.truthy(Lt.has(Lt.index(valueRows[0], Lt.num(0)), Lt.str("array"))))) {
                          {
                            List<Object> __arr_tuple = Lt.items(valueRows[0]);
                            for (int __i_tuple = 0; __i_tuple < __arr_tuple.size(); __i_tuple++) {
                              Object[] tuple = new Object[]{ __arr_tuple.get(__i_tuple) };
                                if (Lt.value_equals(valueFirst[0], Lt.bool(false))) {
                                  sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                  wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                                }
                                valueFirst[0] = Lt.bool(false);
                                if (Lt.value_equals(dialect[0], Lt.str("mysql"))) {
                                  Lt.call(__fns, "pushSql", Lt.str("ROW"));
                                  Lt.call(__fns, "pushW", Lt.str("ROW"));
                                }
                                Lt.call(__fns, "pushSql", Lt.str("("));
                                Lt.call(__fns, "pushW", Lt.str("("));
                                Object[] itemFirst = new Object[]{ Lt.bool(true) };
                                {
                                  List<Object> __arr_ti = Lt.items(Lt.call(__fns, "itemsOf", tuple[0]));
                                  for (int __i_ti = 0; __i_ti < __arr_ti.size(); __i_ti++) {
                                    Object[] ti = new Object[]{ __arr_ti.get(__i_ti) };
                                      if (Lt.value_equals(itemFirst[0], Lt.bool(false))) {
                                        sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                        wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                                      }
                                      itemFirst[0] = Lt.bool(false);
                                      if (Lt.truthy(Lt.has(ti[0], Lt.str("chain")))) {
                                        tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(ti[0], "chain"), "values"));
                                        if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                          Lt.call(__fns, "emitIdent", tmpRef[0]);
                                        }
                                        else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("delete"))))))) {
                                          savedSql[0] = sql[0];
                                          savedW[0] = wsql[0];
                                          savedOrderSql[0] = orderSql[0];
                                          savedOrderW[0] = orderW[0];
                                          savedHasOrder[0] = hasOrder[0];
                                          savedAlias[0] = subAlias[0];
                                          sql[0] = Lt.bufNew();
                                          wsql[0] = Lt.bufNew();
                                          orderSql[0] = Lt.str("");
                                          orderW[0] = Lt.str("");
                                          hasOrder[0] = Lt.bool(false);
                                          subAlias[0] = Lt.str("");
                                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(ti[0], "chain"), "values"), Lt.num(0));
                                          subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                          subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                          subAliasText[0] = subAlias[0];
                                          sql[0] = savedSql[0];
                                          wsql[0] = savedW[0];
                                          orderSql[0] = savedOrderSql[0];
                                          orderW[0] = savedOrderW[0];
                                          hasOrder[0] = savedHasOrder[0];
                                          subAlias[0] = savedAlias[0];
                                          Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                          Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                          if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                            Lt.call(__fns, "pushSql", subAliasText[0]);
                                            Lt.call(__fns, "pushW", subAliasText[0]);
                                          }
                                        }
                                        else {
                                          Lt.call(__fns, "emitParam", ti[0]);
                                        }
                                      }
                                      else {
                                        Lt.call(__fns, "emitParam", ti[0]);
                                      }
                                  }
                                }
                                Lt.call(__fns, "pushSql", Lt.str(")"));
                                Lt.call(__fns, "pushW", Lt.str(")"));
                            }
                          }
                        }
                        else {
                          if (Lt.value_equals(dialect[0], Lt.str("mysql"))) {
                            Lt.call(__fns, "pushSql", Lt.str("ROW"));
                            Lt.call(__fns, "pushW", Lt.str("ROW"));
                          }
                          Lt.call(__fns, "pushSql", Lt.str("("));
                          Lt.call(__fns, "pushW", Lt.str("("));
                          Object[] itemFirst = new Object[]{ Lt.bool(true) };
                          {
                            List<Object> __arr_ti = Lt.items(valueRows[0]);
                            for (int __i_ti = 0; __i_ti < __arr_ti.size(); __i_ti++) {
                              Object[] ti = new Object[]{ __arr_ti.get(__i_ti) };
                                if (Lt.value_equals(itemFirst[0], Lt.bool(false))) {
                                  sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                  wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                                }
                                itemFirst[0] = Lt.bool(false);
                                if (Lt.truthy(Lt.has(ti[0], Lt.str("chain")))) {
                                  tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(ti[0], "chain"), "values"));
                                  if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                    Lt.call(__fns, "emitIdent", tmpRef[0]);
                                  }
                                  else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(ti[0], "chain"), "values")), Lt.str("delete"))))))) {
                                    savedSql[0] = sql[0];
                                    savedW[0] = wsql[0];
                                    savedOrderSql[0] = orderSql[0];
                                    savedOrderW[0] = orderW[0];
                                    savedHasOrder[0] = hasOrder[0];
                                    savedAlias[0] = subAlias[0];
                                    sql[0] = Lt.bufNew();
                                    wsql[0] = Lt.bufNew();
                                    orderSql[0] = Lt.str("");
                                    orderW[0] = Lt.str("");
                                    hasOrder[0] = Lt.bool(false);
                                    subAlias[0] = Lt.str("");
                                    Lt.call(__fns, "renderNodes", Lt.get(Lt.get(ti[0], "chain"), "values"), Lt.num(0));
                                    subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                    subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                    subAliasText[0] = subAlias[0];
                                    sql[0] = savedSql[0];
                                    wsql[0] = savedW[0];
                                    orderSql[0] = savedOrderSql[0];
                                    orderW[0] = savedOrderW[0];
                                    hasOrder[0] = savedHasOrder[0];
                                    subAlias[0] = savedAlias[0];
                                    Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                    Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                    if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                      Lt.call(__fns, "pushSql", subAliasText[0]);
                                      Lt.call(__fns, "pushW", subAliasText[0]);
                                    }
                                  }
                                  else {
                                    Lt.call(__fns, "emitParam", ti[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", ti[0]);
                                }
                            }
                          }
                          Lt.call(__fns, "pushSql", Lt.str(")"));
                          Lt.call(__fns, "pushW", Lt.str(")"));
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("onconflictdonothing"))) {
                        if (Lt.value_equals(dialect[0], Lt.str("mysql"))) {
                          throw new RuntimeException(Lt.to_string(Lt.str("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")));
                        }
                        else {
                          Lt.call(__fns, "pushSql", Lt.str("ON"));
                          Lt.call(__fns, "pushW", Lt.str("ON"));
                          Lt.call(__fns, "pushSql", Lt.str("CONFLICT"));
                          Lt.call(__fns, "pushW", Lt.str("CONFLICT"));
                          Lt.call(__fns, "pushSql", Lt.call(__fns, "conflictTarget", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          Lt.call(__fns, "pushW", Lt.call(__fns, "conflictTarget", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          Lt.call(__fns, "pushSql", Lt.str("DO"));
                          Lt.call(__fns, "pushW", Lt.str("DO"));
                          Lt.call(__fns, "pushSql", Lt.str("NOTHING"));
                          Lt.call(__fns, "pushW", Lt.str("NOTHING"));
                        }
                      }
                      else if (Lt.value_equals(nameNorm[0], Lt.str("onconflictdoupdate"))) {
                        if (Lt.value_equals(dialect[0], Lt.str("mysql"))) {
                          Lt.call(__fns, "pushSql", Lt.str("ON"));
                          Lt.call(__fns, "pushW", Lt.str("ON"));
                          Lt.call(__fns, "pushSql", Lt.str("DUPLICATE"));
                          Lt.call(__fns, "pushW", Lt.str("DUPLICATE"));
                          Lt.call(__fns, "pushSql", Lt.str("KEY"));
                          Lt.call(__fns, "pushW", Lt.str("KEY"));
                          Lt.call(__fns, "pushSql", Lt.str("UPDATE"));
                          Lt.call(__fns, "pushW", Lt.str("UPDATE"));
                          Object[] assnFirst = new Object[]{ Lt.bool(true) };
                          {
                            List<Object> __arr_ak = Lt.items(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value")));
                            for (int __i_ak = 0; __i_ak < __arr_ak.size(); __i_ak++) {
                              Object[] ak = new Object[]{ __arr_ak.get(__i_ak) };
                                if (Lt.value_equals(assnFirst[0], Lt.bool(false))) {
                                  sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                  wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                                }
                                assnFirst[0] = Lt.bool(false);
                                Lt.call(__fns, "pushSql", Lt.call(__fns, "identStr", ak[0]));
                                Lt.call(__fns, "pushW", Lt.call(__fns, "identStr", ak[0]));
                                Lt.call(__fns, "pushSql", Lt.str("="));
                                Lt.call(__fns, "pushW", Lt.str("="));
                                if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), Lt.str("chain")))) {
                                  tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"));
                                  if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                    Lt.call(__fns, "emitIdent", tmpRef[0]);
                                  }
                                  else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("delete"))))))) {
                                    savedSql[0] = sql[0];
                                    savedW[0] = wsql[0];
                                    savedOrderSql[0] = orderSql[0];
                                    savedOrderW[0] = orderW[0];
                                    savedHasOrder[0] = hasOrder[0];
                                    savedAlias[0] = subAlias[0];
                                    sql[0] = Lt.bufNew();
                                    wsql[0] = Lt.bufNew();
                                    orderSql[0] = Lt.str("");
                                    orderW[0] = Lt.str("");
                                    hasOrder[0] = Lt.bool(false);
                                    subAlias[0] = Lt.str("");
                                    Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"), Lt.num(0));
                                    subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                    subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                    subAliasText[0] = subAlias[0];
                                    sql[0] = savedSql[0];
                                    wsql[0] = savedW[0];
                                    orderSql[0] = savedOrderSql[0];
                                    orderW[0] = savedOrderW[0];
                                    hasOrder[0] = savedHasOrder[0];
                                    subAlias[0] = savedAlias[0];
                                    Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                    Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                    if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                      Lt.call(__fns, "pushSql", subAliasText[0]);
                                      Lt.call(__fns, "pushW", subAliasText[0]);
                                    }
                                  }
                                  else {
                                    Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]));
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]));
                                }
                            }
                          }
                        }
                        else {
                          Lt.call(__fns, "pushSql", Lt.str("ON"));
                          Lt.call(__fns, "pushW", Lt.str("ON"));
                          Lt.call(__fns, "pushSql", Lt.str("CONFLICT"));
                          Lt.call(__fns, "pushW", Lt.str("CONFLICT"));
                          Lt.call(__fns, "pushSql", Lt.call(__fns, "conflictTarget", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          Lt.call(__fns, "pushW", Lt.call(__fns, "conflictTarget", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          Lt.call(__fns, "pushSql", Lt.str("DO"));
                          Lt.call(__fns, "pushW", Lt.str("DO"));
                          Lt.call(__fns, "pushSql", Lt.str("UPDATE"));
                          Lt.call(__fns, "pushW", Lt.str("UPDATE"));
                          Lt.call(__fns, "pushSql", Lt.str("SET"));
                          Lt.call(__fns, "pushW", Lt.str("SET"));
                          Object[] assnFirst = new Object[]{ Lt.bool(true) };
                          {
                            List<Object> __arr_ak = Lt.items(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value")));
                            for (int __i_ak = 0; __i_ak < __arr_ak.size(); __i_ak++) {
                              Object[] ak = new Object[]{ __arr_ak.get(__i_ak) };
                                if (Lt.value_equals(assnFirst[0], Lt.bool(false))) {
                                  sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                  wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                                }
                                assnFirst[0] = Lt.bool(false);
                                Lt.call(__fns, "pushSql", Lt.call(__fns, "identStr", ak[0]));
                                Lt.call(__fns, "pushW", Lt.call(__fns, "identStr", ak[0]));
                                Lt.call(__fns, "pushSql", Lt.str("="));
                                Lt.call(__fns, "pushW", Lt.str("="));
                                if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), Lt.str("chain")))) {
                                  tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"));
                                  if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                    Lt.call(__fns, "emitIdent", tmpRef[0]);
                                  }
                                  else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values")), Lt.str("delete"))))))) {
                                    savedSql[0] = sql[0];
                                    savedW[0] = wsql[0];
                                    savedOrderSql[0] = orderSql[0];
                                    savedOrderW[0] = orderW[0];
                                    savedHasOrder[0] = hasOrder[0];
                                    savedAlias[0] = subAlias[0];
                                    sql[0] = Lt.bufNew();
                                    wsql[0] = Lt.bufNew();
                                    orderSql[0] = Lt.str("");
                                    orderW[0] = Lt.str("");
                                    hasOrder[0] = Lt.bool(false);
                                    subAlias[0] = Lt.str("");
                                    Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]), "chain"), "values"), Lt.num(0));
                                    subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                    subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                    subAliasText[0] = subAlias[0];
                                    sql[0] = savedSql[0];
                                    wsql[0] = savedW[0];
                                    orderSql[0] = savedOrderSql[0];
                                    orderW[0] = savedOrderW[0];
                                    hasOrder[0] = savedHasOrder[0];
                                    subAlias[0] = savedAlias[0];
                                    Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                    Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                    if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                      Lt.call(__fns, "pushSql", subAliasText[0]);
                                      Lt.call(__fns, "pushW", subAliasText[0]);
                                    }
                                  }
                                  else {
                                    Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]));
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "object"), "value"), ak[0]));
                                }
                            }
                          }
                        }
                      }
                      else {
                        throw new RuntimeException(Lt.to_string(Lt.str_concat(Lt.str("sql-builder parse: unsupported clause "), name[0])));
                      }
                    }
                  }
              }
            }
            Lt.call(__fns, "flushOrder");
            return Lt.nullValue();
          }
          else {
            first[0] = Lt.bool(true);
            left[0] = Lt.str("");
            hasLeft[0] = Lt.bool(false);
            base[0] = Lt.str("");
            {
              List<Object> __arr_node = Lt.items(nodes[0]);
              for (int __i_node = 0; __i_node < __arr_node.size(); __i_node++) {
                Object[] node = new Object[]{ __arr_node.get(__i_node) };
                  Object[] pn = new Object[]{ Lt.call(__fns, "normName", Lt.get(Lt.get(node[0], "functionCall"), "name")) };
                  Object[] op = new Object[]{ Lt.call(__fns, "opOf", pn[0]) };
                  if (Lt.truthy(Lt.has(node[0], Lt.str("functionCall")))) {
                    if (Lt.or(Lt.value_equals(pn[0], Lt.str("col")), Lt.value_equals(pn[0], Lt.str("table")))) {
                      left[0] = Lt.call(__fns, "identStr", Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                      hasLeft[0] = Lt.bool(true);
                    }
                    else if (Lt.truthy(op[0])) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      if (Lt.truthy(hasLeft[0])) {
                        base[0] = left[0];
                      }
                      else {
                        base[0] = Lt.str("?");
                      }
                      Lt.call(__fns, "pushSql", base[0]);
                      Lt.call(__fns, "pushW", base[0]);
                      Lt.call(__fns, "pushSql", op[0]);
                      Lt.call(__fns, "pushW", op[0]);
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                        tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                        if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                          Lt.call(__fns, "emitIdent", tmpRef[0]);
                        }
                        else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                          savedSql[0] = sql[0];
                          savedW[0] = wsql[0];
                          savedOrderSql[0] = orderSql[0];
                          savedOrderW[0] = orderW[0];
                          savedHasOrder[0] = hasOrder[0];
                          savedAlias[0] = subAlias[0];
                          sql[0] = Lt.bufNew();
                          wsql[0] = Lt.bufNew();
                          orderSql[0] = Lt.str("");
                          orderW[0] = Lt.str("");
                          hasOrder[0] = Lt.bool(false);
                          subAlias[0] = Lt.str("");
                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                          subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                          subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                          subAliasText[0] = subAlias[0];
                          sql[0] = savedSql[0];
                          wsql[0] = savedW[0];
                          orderSql[0] = savedOrderSql[0];
                          orderW[0] = savedOrderW[0];
                          hasOrder[0] = savedHasOrder[0];
                          subAlias[0] = savedAlias[0];
                          Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                          Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                          if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                            Lt.call(__fns, "pushSql", subAliasText[0]);
                            Lt.call(__fns, "pushW", subAliasText[0]);
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                      }
                      else {
                        Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                      }
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("exists"))) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      Lt.call(__fns, "pushSql", Lt.str("EXISTS"));
                      Lt.call(__fns, "pushW", Lt.str("EXISTS"));
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                        tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                        if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                          Lt.call(__fns, "emitIdent", tmpRef[0]);
                        }
                        else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                          savedSql[0] = sql[0];
                          savedW[0] = wsql[0];
                          savedOrderSql[0] = orderSql[0];
                          savedOrderW[0] = orderW[0];
                          savedHasOrder[0] = hasOrder[0];
                          savedAlias[0] = subAlias[0];
                          sql[0] = Lt.bufNew();
                          wsql[0] = Lt.bufNew();
                          orderSql[0] = Lt.str("");
                          orderW[0] = Lt.str("");
                          hasOrder[0] = Lt.bool(false);
                          subAlias[0] = Lt.str("");
                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                          subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                          subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                          subAliasText[0] = subAlias[0];
                          sql[0] = savedSql[0];
                          wsql[0] = savedW[0];
                          orderSql[0] = savedOrderSql[0];
                          orderW[0] = savedOrderW[0];
                          hasOrder[0] = savedHasOrder[0];
                          subAlias[0] = savedAlias[0];
                          Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                          Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                          if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                            Lt.call(__fns, "pushSql", subAliasText[0]);
                            Lt.call(__fns, "pushW", subAliasText[0]);
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                      }
                      else {
                        Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                      }
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("in"))) {
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                        if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                          if (Lt.value_equals(first[0], Lt.bool(false))) {
                            Lt.call(__fns, "pushSql", Lt.str("AND"));
                            Lt.call(__fns, "pushW", Lt.str("AND"));
                          }
                          first[0] = Lt.bool(false);
                          if (Lt.truthy(hasLeft[0])) {
                            base[0] = left[0];
                          }
                          else {
                            base[0] = Lt.str("?");
                          }
                          Lt.call(__fns, "pushSql", base[0]);
                          Lt.call(__fns, "pushW", base[0]);
                          Lt.call(__fns, "pushSql", Lt.str("IN"));
                          Lt.call(__fns, "pushW", Lt.str("IN"));
                          savedSql[0] = sql[0];
                          savedW[0] = wsql[0];
                          savedOrderSql[0] = orderSql[0];
                          savedOrderW[0] = orderW[0];
                          savedHasOrder[0] = hasOrder[0];
                          savedAlias[0] = subAlias[0];
                          sql[0] = Lt.bufNew();
                          wsql[0] = Lt.bufNew();
                          orderSql[0] = Lt.str("");
                          orderW[0] = Lt.str("");
                          hasOrder[0] = Lt.bool(false);
                          subAlias[0] = Lt.str("");
                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                          subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                          subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                          subAliasText[0] = subAlias[0];
                          sql[0] = savedSql[0];
                          wsql[0] = savedW[0];
                          orderSql[0] = savedOrderSql[0];
                          orderW[0] = savedOrderW[0];
                          hasOrder[0] = savedHasOrder[0];
                          subAlias[0] = savedAlias[0];
                          Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                          Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                          if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                            Lt.call(__fns, "pushSql", subAliasText[0]);
                            Lt.call(__fns, "pushW", subAliasText[0]);
                          }
                        }
                        else {
                          if (Lt.value_equals(first[0], Lt.bool(false))) {
                            Lt.call(__fns, "pushSql", Lt.str("AND"));
                            Lt.call(__fns, "pushW", Lt.str("AND"));
                          }
                          first[0] = Lt.bool(false);
                          if (Lt.truthy(hasLeft[0])) {
                            base[0] = left[0];
                          }
                          else {
                            base[0] = Lt.str("?");
                          }
                          Lt.call(__fns, "pushSql", base[0]);
                          Lt.call(__fns, "pushW", base[0]);
                          Lt.call(__fns, "pushSql", Lt.str("IN ("));
                          Lt.call(__fns, "pushW", Lt.str("IN ("));
                          Object[] inFirst = new Object[]{ Lt.bool(true) };
                          {
                            List<Object> __arr_iv = Lt.items(Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                            for (int __i_iv = 0; __i_iv < __arr_iv.size(); __i_iv++) {
                              Object[] iv = new Object[]{ __arr_iv.get(__i_iv) };
                                if (Lt.value_equals(inFirst[0], Lt.bool(false))) {
                                  sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                  wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                                }
                                inFirst[0] = Lt.bool(false);
                                if (Lt.truthy(Lt.has(iv[0], Lt.str("chain")))) {
                                  tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(iv[0], "chain"), "values"));
                                  if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                    Lt.call(__fns, "emitIdent", tmpRef[0]);
                                  }
                                  else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("delete"))))))) {
                                    savedSql[0] = sql[0];
                                    savedW[0] = wsql[0];
                                    savedOrderSql[0] = orderSql[0];
                                    savedOrderW[0] = orderW[0];
                                    savedHasOrder[0] = hasOrder[0];
                                    savedAlias[0] = subAlias[0];
                                    sql[0] = Lt.bufNew();
                                    wsql[0] = Lt.bufNew();
                                    orderSql[0] = Lt.str("");
                                    orderW[0] = Lt.str("");
                                    hasOrder[0] = Lt.bool(false);
                                    subAlias[0] = Lt.str("");
                                    Lt.call(__fns, "renderNodes", Lt.get(Lt.get(iv[0], "chain"), "values"), Lt.num(0));
                                    subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                    subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                    subAliasText[0] = subAlias[0];
                                    sql[0] = savedSql[0];
                                    wsql[0] = savedW[0];
                                    orderSql[0] = savedOrderSql[0];
                                    orderW[0] = savedOrderW[0];
                                    hasOrder[0] = savedHasOrder[0];
                                    subAlias[0] = savedAlias[0];
                                    Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                    Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                    if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                      Lt.call(__fns, "pushSql", subAliasText[0]);
                                      Lt.call(__fns, "pushW", subAliasText[0]);
                                    }
                                  }
                                  else {
                                    Lt.call(__fns, "emitParam", iv[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", iv[0]);
                                }
                            }
                          }
                          Lt.call(__fns, "pushSql", Lt.str(")"));
                          Lt.call(__fns, "pushW", Lt.str(")"));
                        }
                      }
                      else {
                        if (Lt.value_equals(first[0], Lt.bool(false))) {
                          Lt.call(__fns, "pushSql", Lt.str("AND"));
                          Lt.call(__fns, "pushW", Lt.str("AND"));
                        }
                        first[0] = Lt.bool(false);
                        if (Lt.truthy(hasLeft[0])) {
                          base[0] = left[0];
                        }
                        else {
                          base[0] = Lt.str("?");
                        }
                        Lt.call(__fns, "pushSql", base[0]);
                        Lt.call(__fns, "pushW", base[0]);
                        Lt.call(__fns, "pushSql", Lt.str("IN ("));
                        Lt.call(__fns, "pushW", Lt.str("IN ("));
                        Object[] inFirst = new Object[]{ Lt.bool(true) };
                        {
                          List<Object> __arr_iv = Lt.items(Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                          for (int __i_iv = 0; __i_iv < __arr_iv.size(); __i_iv++) {
                            Object[] iv = new Object[]{ __arr_iv.get(__i_iv) };
                              if (Lt.value_equals(inFirst[0], Lt.bool(false))) {
                                sql[0] = Lt.bufAppend(sql[0], Lt.str(","));
                                wsql[0] = Lt.bufAppend(wsql[0], Lt.str(","));
                              }
                              inFirst[0] = Lt.bool(false);
                              if (Lt.truthy(Lt.has(iv[0], Lt.str("chain")))) {
                                tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(iv[0], "chain"), "values"));
                                if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                                  Lt.call(__fns, "emitIdent", tmpRef[0]);
                                }
                                else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(iv[0], "chain"), "values")), Lt.str("delete"))))))) {
                                  savedSql[0] = sql[0];
                                  savedW[0] = wsql[0];
                                  savedOrderSql[0] = orderSql[0];
                                  savedOrderW[0] = orderW[0];
                                  savedHasOrder[0] = hasOrder[0];
                                  savedAlias[0] = subAlias[0];
                                  sql[0] = Lt.bufNew();
                                  wsql[0] = Lt.bufNew();
                                  orderSql[0] = Lt.str("");
                                  orderW[0] = Lt.str("");
                                  hasOrder[0] = Lt.bool(false);
                                  subAlias[0] = Lt.str("");
                                  Lt.call(__fns, "renderNodes", Lt.get(Lt.get(iv[0], "chain"), "values"), Lt.num(0));
                                  subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                                  subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                                  subAliasText[0] = subAlias[0];
                                  sql[0] = savedSql[0];
                                  wsql[0] = savedW[0];
                                  orderSql[0] = savedOrderSql[0];
                                  orderW[0] = savedOrderW[0];
                                  hasOrder[0] = savedHasOrder[0];
                                  subAlias[0] = savedAlias[0];
                                  Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                                  Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                                  if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                                    Lt.call(__fns, "pushSql", subAliasText[0]);
                                    Lt.call(__fns, "pushW", subAliasText[0]);
                                  }
                                }
                                else {
                                  Lt.call(__fns, "emitParam", iv[0]);
                                }
                              }
                              else {
                                Lt.call(__fns, "emitParam", iv[0]);
                              }
                          }
                        }
                        Lt.call(__fns, "pushSql", Lt.str(")"));
                        Lt.call(__fns, "pushW", Lt.str(")"));
                      }
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("between"))) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      if (Lt.truthy(hasLeft[0])) {
                        base[0] = left[0];
                      }
                      else {
                        base[0] = Lt.str("?");
                      }
                      Lt.call(__fns, "pushSql", base[0]);
                      Lt.call(__fns, "pushW", base[0]);
                      Lt.call(__fns, "pushSql", Lt.str("BETWEEN"));
                      Lt.call(__fns, "pushW", Lt.str("BETWEEN"));
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), Lt.str("chain")))) {
                        tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"));
                        if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                          Lt.call(__fns, "emitIdent", tmpRef[0]);
                        }
                        else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                          savedSql[0] = sql[0];
                          savedW[0] = wsql[0];
                          savedOrderSql[0] = orderSql[0];
                          savedOrderW[0] = orderW[0];
                          savedHasOrder[0] = hasOrder[0];
                          savedAlias[0] = subAlias[0];
                          sql[0] = Lt.bufNew();
                          wsql[0] = Lt.bufNew();
                          orderSql[0] = Lt.str("");
                          orderW[0] = Lt.str("");
                          hasOrder[0] = Lt.bool(false);
                          subAlias[0] = Lt.str("");
                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                          subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                          subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                          subAliasText[0] = subAlias[0];
                          sql[0] = savedSql[0];
                          wsql[0] = savedW[0];
                          orderSql[0] = savedOrderSql[0];
                          orderW[0] = savedOrderW[0];
                          hasOrder[0] = savedHasOrder[0];
                          subAlias[0] = savedAlias[0];
                          Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                          Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                          if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                            Lt.call(__fns, "pushSql", subAliasText[0]);
                            Lt.call(__fns, "pushW", subAliasText[0]);
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                        }
                      }
                      else {
                        Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")));
                      }
                      Lt.call(__fns, "pushSql", Lt.str("AND"));
                      Lt.call(__fns, "pushW", Lt.str("AND"));
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), Lt.str("chain")))) {
                        tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"));
                        if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                          Lt.call(__fns, "emitIdent", tmpRef[0]);
                        }
                        else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                          savedSql[0] = sql[0];
                          savedW[0] = wsql[0];
                          savedOrderSql[0] = orderSql[0];
                          savedOrderW[0] = orderW[0];
                          savedHasOrder[0] = hasOrder[0];
                          savedAlias[0] = subAlias[0];
                          sql[0] = Lt.bufNew();
                          wsql[0] = Lt.bufNew();
                          orderSql[0] = Lt.str("");
                          orderW[0] = Lt.str("");
                          hasOrder[0] = Lt.bool(false);
                          subAlias[0] = Lt.str("");
                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                          subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                          subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                          subAliasText[0] = subAlias[0];
                          sql[0] = savedSql[0];
                          wsql[0] = savedW[0];
                          orderSql[0] = savedOrderSql[0];
                          orderW[0] = savedOrderW[0];
                          hasOrder[0] = savedHasOrder[0];
                          subAlias[0] = savedAlias[0];
                          Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                          Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                          if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                            Lt.call(__fns, "pushSql", subAliasText[0]);
                            Lt.call(__fns, "pushW", subAliasText[0]);
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")));
                        }
                      }
                      else {
                        Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")));
                      }
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("isnull"))) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      if (Lt.truthy(hasLeft[0])) {
                        base[0] = left[0];
                      }
                      else {
                        base[0] = Lt.str("?");
                      }
                      Lt.call(__fns, "pushSql", base[0]);
                      Lt.call(__fns, "pushW", base[0]);
                      Lt.call(__fns, "pushSql", Lt.str("IS NULL"));
                      Lt.call(__fns, "pushW", Lt.str("IS NULL"));
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("isnotnull"))) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      if (Lt.truthy(hasLeft[0])) {
                        base[0] = left[0];
                      }
                      else {
                        base[0] = Lt.str("?");
                      }
                      Lt.call(__fns, "pushSql", base[0]);
                      Lt.call(__fns, "pushW", base[0]);
                      Lt.call(__fns, "pushSql", Lt.str("IS NOT NULL"));
                      Lt.call(__fns, "pushW", Lt.str("IS NOT NULL"));
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("not"))) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      Lt.call(__fns, "pushSql", Lt.str("NOT ("));
                      Lt.call(__fns, "pushW", Lt.str("NOT ("));
                      Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument")), "chain"), "values"), Lt.num(1));
                      Lt.call(__fns, "pushSql", Lt.str(")"));
                      Lt.call(__fns, "pushW", Lt.str(")"));
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.or(Lt.value_equals(pn[0], Lt.str("and")), Lt.value_equals(pn[0], Lt.str("or")))) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      Lt.call(__fns, "pushSql", Lt.str("("));
                      Lt.call(__fns, "pushW", Lt.str("("));
                      Object[] boolFirst = new Object[]{ Lt.bool(true) };
                      {
                        List<Object> __arr_bv = Lt.items(Lt.call(__fns, "itemsOf", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                        for (int __i_bv = 0; __i_bv < __arr_bv.size(); __i_bv++) {
                          Object[] bv = new Object[]{ __arr_bv.get(__i_bv) };
                            if (Lt.value_equals(boolFirst[0], Lt.bool(false))) {
                              tmp[0] = Lt.to_upper(pn[0]);
                              Lt.call(__fns, "pushSql", tmp[0]);
                              Lt.call(__fns, "pushW", tmp[0]);
                            }
                            boolFirst[0] = Lt.bool(false);
                            if (Lt.truthy(Lt.has(bv[0], Lt.str("chain")))) {
                              Lt.call(__fns, "renderNodes", Lt.get(Lt.get(bv[0], "chain"), "values"), Lt.num(1));
                            }
                            else {
                              Lt.call(__fns, "emitParam", bv[0]);
                            }
                        }
                      }
                      Lt.call(__fns, "pushSql", Lt.str(")"));
                      Lt.call(__fns, "pushW", Lt.str(")"));
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("as"))) {
                      if (Lt.truthy(hasLeft[0])) {
                        base[0] = left[0];
                      }
                      else {
                        base[0] = Lt.str("?");
                      }
                      Lt.call(__fns, "pushSql", base[0]);
                      Lt.call(__fns, "pushW", base[0]);
                      Lt.call(__fns, "pushSql", Lt.str("AS"));
                      Lt.call(__fns, "pushW", Lt.str("AS"));
                      Lt.call(__fns, "emitIdent", Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("op"))) {
                      if (Lt.value_equals(first[0], Lt.bool(false))) {
                        Lt.call(__fns, "pushSql", Lt.str("AND"));
                        Lt.call(__fns, "pushW", Lt.str("AND"));
                      }
                      first[0] = Lt.bool(false);
                      if (Lt.truthy(hasLeft[0])) {
                        base[0] = left[0];
                      }
                      else {
                        base[0] = Lt.str("?");
                      }
                      Lt.call(__fns, "pushSql", base[0]);
                      Lt.call(__fns, "pushW", base[0]);
                      Lt.call(__fns, "pushSql", Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                      Lt.call(__fns, "pushW", Lt.call(__fns, "asString", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(0)), Lt.str("argument"))));
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), Lt.str("chain")))) {
                        tmpRef[0] = Lt.call(__fns, "isRef", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"));
                        if (Lt.value_not_equals(tmpRef[0], Lt.str(""))) {
                          Lt.call(__fns, "emitIdent", tmpRef[0]);
                        }
                        else if (Lt.or(Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("select")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("with"))), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("values")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("insert")), Lt.or(Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("update")), Lt.value_equals(Lt.call(__fns, "firstKind", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values")), Lt.str("delete"))))))) {
                          savedSql[0] = sql[0];
                          savedW[0] = wsql[0];
                          savedOrderSql[0] = orderSql[0];
                          savedOrderW[0] = orderW[0];
                          savedHasOrder[0] = hasOrder[0];
                          savedAlias[0] = subAlias[0];
                          sql[0] = Lt.bufNew();
                          wsql[0] = Lt.bufNew();
                          orderSql[0] = Lt.str("");
                          orderW[0] = Lt.str("");
                          hasOrder[0] = Lt.bool(false);
                          subAlias[0] = Lt.str("");
                          Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")), "chain"), "values"), Lt.num(0));
                          subSql[0] = Lt.trim(Lt.bufStr(sql[0]));
                          subW[0] = Lt.trim(Lt.bufStr(wsql[0]));
                          subAliasText[0] = subAlias[0];
                          sql[0] = savedSql[0];
                          wsql[0] = savedW[0];
                          orderSql[0] = savedOrderSql[0];
                          orderW[0] = savedOrderW[0];
                          hasOrder[0] = savedHasOrder[0];
                          subAlias[0] = savedAlias[0];
                          Lt.call(__fns, "pushSql", Lt.str_concat(Lt.str("("), Lt.str_concat(subSql[0], Lt.str(")"))));
                          Lt.call(__fns, "pushW", Lt.str_concat(Lt.str("("), Lt.str_concat(subW[0], Lt.str(")"))));
                          if (Lt.value_not_equals(subAliasText[0], Lt.str(""))) {
                            Lt.call(__fns, "pushSql", subAliasText[0]);
                            Lt.call(__fns, "pushW", subAliasText[0]);
                          }
                        }
                        else {
                          Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")));
                        }
                      }
                      else {
                        Lt.call(__fns, "emitParam", Lt.get(Lt.index(Lt.get(Lt.get(node[0], "functionCall"), "arguments"), Lt.num(1)), Lt.str("argument")));
                      }
                      hasLeft[0] = Lt.bool(false);
                    }
                    else if (Lt.value_equals(pn[0], Lt.str("raw"))) {
                      Lt.call(__fns, "emitRaw", node[0]);
                    }
                    else {
                      throw new RuntimeException(Lt.to_string(Lt.str("sql-builder parse: unsupported predicate")));
                    }
                  }
              }
            }
            return Lt.nullValue();
          }
        });
        Lt.call(__fns, "renderNodes", Lt.get(Lt.get(Lt.get(Lt.get(root[0], "schema"), "chain"), "chain"), "values"), Lt.num(0));
        sql[0] = Lt.bufStr(sql[0]);
        wsql[0] = Lt.bufStr(wsql[0]);
        params[0] = params[0];
        return Lt.map("sql", Lt.trim(sql[0]), "sqlWithParam", Lt.trim(wsql[0]), "param", Lt.params(params[0]));
    }

}

class Init {
    static SqlBuilder sqlBuilder(String variableName, Object... copies) {
        SqlBuilder structure = new SqlBuilder();
        structure.initFromInitFunction(Lt.map(
            "name", "sql-builder",
            "variableName", variableName != null ? variableName : Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(structure.getSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName")
        ), Lt.array(copies));
        return structure;
    }

    static SqlBuilder sqlBuilder() {
        return sqlBuilder(null);
    }
}