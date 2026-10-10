// Auto-generated index for gntrees-sql-builder

// parse() returns a Map<String, Any?>: { "sql": String, "sqlWithParam": String, "param": List }

// Auto-generated Kotlin method-chain types.
//
// Kotlin has a universal top type (`Any?`), so LT values are native Kotlin
// values (String / Long / Double / Boolean / null / List<Any?> / LinkedHashMap),
// and there is no `Value` enum. The one shared abstraction is `Structure`: every
// generated builder class implements it, which lets the generic runtime
// (`copy` / `make_copy`) call `getSchema()`.

interface Structure {
    fun getSchema(): MutableMap<String, Any?>
}


object Mc {
    // Auto-generated Kotlin method-chain runtime (Lingua Tungga Gelombang 2).
    //
    // The static counterpart of `core/base/python/base-utils.py`. Schemas are
    // plain nested maps; the generator inlines this fragment inside an `object Mc`
    // in the generated `index.kt`.
    //
    // `normalize_argument_structure_call` and `copy` are *not* defined here: like
    // the TypeScript/Python runtimes they are emitted by the generator because they
    // reference the project's structure classes.

    fun _typeof(value: Any?): String {
        if (value == null) return "object"
        if (value is Boolean) return "boolean"
        if (value is Number) return "number"
        if (value is String) return "string"
        if (value is List<*> || value is Map<*, *>) return "object"
        return value.javaClass.simpleName
    }

    fun validate_schema(schema: Any?) {
        val message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
        if (schema !is Map<*, *>) throw RuntimeException(message)
        val inner = Lt.get(schema, "schema")
        if (inner !is Map<*, *>) throw RuntimeException(message)
        val chain = Lt.get(inner, "chain")
        if (chain !is Map<*, *>) throw RuntimeException(message)
        val chainChain = Lt.get(chain, "chain")
        if (chainChain !is Map<*, *>) throw RuntimeException(message)
        if (Lt.get(chainChain, "values") !is List<*> || !Lt.truthy(Lt.get(chainChain, "initFunction"))) {
            throw RuntimeException(message)
        }
    }

    fun unwrap_argument_value(value: Any?): Any? {
        if (value !is Map<*, *>) throw RuntimeException("Unknown argument value type")
        if (Lt.has(value, "string")) return Lt.get(Lt.get(value, "string"), "value")
        if (Lt.has(value, "number")) return Lt.get(Lt.get(value, "number"), "value")
        if (Lt.has(value, "boolean")) return Lt.get(Lt.get(value, "boolean"), "value")
        if (Lt.has(value, "null")) return Lt.get(Lt.get(value, "null"), "value")
        if (Lt.has(value, "array")) {
            val out = ArrayList<Any?>()
            for (item in Lt.items(Lt.get(Lt.get(value, "array"), "value"))) out.add(unwrap_argument_value(item))
            return out
        }
        if (Lt.has(value, "object")) {
            val out = LinkedHashMap<String, Any?>()
            for ((key, item) in Lt.asMap(Lt.get(Lt.get(value, "object"), "value"))) out[key] = unwrap_argument_value(item)
            return out
        }
        if (Lt.has(value, "chain")) throw RuntimeException("Cannot validate a chain default value at runtime")
        throw RuntimeException("Unknown argument value type")
    }

    fun validate_default(defaultVal: Any?, struct: Any?) {
        normalize_argument(unwrap_argument_value(defaultVal), struct)
    }

    fun normalize_argument(arg: Any?, struct: Any?): Any? {
        if (struct !is Map<*, *>) throw RuntimeException("Unsupported struct type in normalizeArgument")

        if (Lt.has(struct, "array")) {
            if (arg !is List<*>) throw RuntimeException("Expected an array argument, but got " + _typeof(arg))
            if (Lt.items(arg).isEmpty()) return Lt.map(listOf("array" to Lt.map(listOf("value" to Lt.array(emptyList<Any?>())))))
            val itemType = Lt.get(Lt.get(struct, "array"), "type")
            val normalizedItems = ArrayList<Any?>()
            for (item in Lt.items(arg)) normalizedItems.add(normalize_argument(item, itemType))
            if (normalizedItems[0] == null) throw RuntimeException("Unexpected undefined value in array")
            return Lt.map(listOf("array" to Lt.map(listOf("value" to normalizedItems))))
        }

        if (Lt.has(struct, "object")) {
            if (arg !is Map<*, *>) throw RuntimeException("Expected an object argument, but got " + _typeof(arg))
            val declared = Lt.get(struct, "object")
            val missingKeys = ArrayList<String>()
            for (key in Lt.items(Lt.keys(declared))) {
                if (!Lt.has(arg, key)) missingKeys.add(Lt.asString(key))
            }
            if (missingKeys.isNotEmpty()) {
                throw RuntimeException("Missing required key(s) \"" + missingKeys.joinToString("\", \"") + "\" in object argument")
            }
            val normalizedObject = LinkedHashMap<String, Any?>()
            for ((key, item) in Lt.asMap(arg)) {
                if (!Lt.has(declared, key)) throw RuntimeException("Unexpected key \"" + key + "\" in object argument")
                normalizedObject[key] = normalize_argument(item, Lt.get(declared, key))
            }
            return Lt.map(listOf("object" to Lt.map(listOf("value" to normalizedObject))))
        }

        if (Lt.has(struct, "string")) {
            if (arg !is String) throw RuntimeException("Expected a string argument, but got " + _typeof(arg))
            return Lt.map(listOf("string" to Lt.map(listOf("value" to arg))))
        }

        if (Lt.has(struct, "number")) {
            if (arg is Boolean || arg !is Number) {
                throw RuntimeException("Expected a number argument, but got " + _typeof(arg))
            }
            val number = arg.toDouble()
            if (!number.isFinite()) throw RuntimeException("Expected a finite number argument, but got " + number)
            return Lt.map(listOf("number" to Lt.map(listOf("value" to number))))
        }

        if (Lt.has(struct, "boolean")) {
            if (arg !is Boolean) throw RuntimeException("Expected a boolean argument, but got " + _typeof(arg))
            return Lt.map(listOf("boolean" to Lt.map(listOf("value" to arg))))
        }

        if (Lt.has(struct, "null")) {
            if (arg != null) throw RuntimeException("Expected a null argument, but got " + _typeof(arg))
            return Lt.map(listOf("null" to Lt.map(listOf("value" to null))))
        }

        if (Lt.has(struct, "union")) {
            val reasons = ArrayList<String>()
            val normalizedUnionTypes = ArrayList<Any?>()
            for (unionType in Lt.items(Lt.get(Lt.get(struct, "union"), "types"))) {
                try {
                    normalizedUnionTypes.add(normalize_argument(arg, unionType))
                } catch (error: RuntimeException) {
                    reasons.add(error.message ?: "")
                }
            }
            if (normalizedUnionTypes.isEmpty() || normalizedUnionTypes[0] == null) {
                throw RuntimeException("Argument does not match any type in the union: " + reasons.joinToString(" | "))
            }
            if (normalizedUnionTypes.size > 1) {
                if (arg is List<*> && Lt.items(arg).isEmpty()) return normalizedUnionTypes[0]
                throw RuntimeException("Argument matches multiple types in the union, which is ambiguous")
            }
            return normalizedUnionTypes[0]
        }

        if (Lt.has(struct, "map")) {
            if (arg !is Map<*, *>) throw RuntimeException("Expected an object argument for map type, but got " + _typeof(arg))
            val normalizedMap = LinkedHashMap<String, Any?>()
            val valueType = Lt.get(Lt.get(struct, "map"), "type")
            for ((key, item) in Lt.asMap(arg)) normalizedMap[key] = normalize_argument(item, valueType)
            return Lt.map(listOf("object" to Lt.map(listOf("value" to normalizedMap))))
        }

        if (Lt.has(struct, "structureCall")) {
            return normalize_argument_structure_call(arg)
        }

        if (Lt.has(struct, "literal")) {
            val expected = Lt.get(Lt.get(struct, "literal"), "value")
            val literalType = Lt.get(Lt.get(struct, "literal"), "type")
            if (literalType == "string") {
                if (arg !is String) throw RuntimeException("Expected a string literal argument, but got " + _typeof(arg))
                if (arg != expected) throw RuntimeException("Expected string literal " + Lt.json(expected) + ", but got " + Lt.json(arg))
                return Lt.map(listOf("string" to Lt.map(listOf("value" to arg))))
            }
            if (literalType == "number") {
                if (arg is Boolean || arg !is Number) {
                    throw RuntimeException("Expected a number literal argument, but got " + _typeof(arg))
                }
                if (arg != expected) throw RuntimeException("Expected number literal " + expected + ", but got " + arg)
                return Lt.map(listOf("number" to Lt.map(listOf("value" to arg))))
            }
            if (arg !is Boolean) throw RuntimeException("Expected a boolean literal argument, but got " + _typeof(arg))
            if (arg != expected) throw RuntimeException("Expected boolean literal " + expected + ", but got " + arg)
            return Lt.map(listOf("boolean" to Lt.map(listOf("value" to arg))))
        }

        throw RuntimeException("Unsupported struct type in normalizeArgument")
    }

    fun create_schema(oldSchema: MutableMap<String, Any?>, functionName: String, functionArgs: List<Any?>, isTemplateLiteral: Boolean): MutableMap<String, Any?> {
        validate_schema(oldSchema)
        val old = Lt.asMap(Lt.get(oldSchema, "schema"))
        val oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"))

        val inner = LinkedHashMap<String, Any?>()
        for ((key, value) in old) inner[key] = value
        val values = ArrayList<Any?>(Lt.items(Lt.get(oldChain, "values")))
        inner["chain"] = Lt.map(listOf("chain" to Lt.map(listOf(
            "values" to values,
            "initFunction" to Lt.get(oldChain, "initFunction"),
        ))))
        val newSchema = Lt.map(listOf("schema" to inner))

        val args = ArrayList<Any?>()
        if (isTemplateLiteral && functionArgs.isNotEmpty() && functionArgs[0] != null) {
            val strings = Lt.get(functionArgs[0], "arg")
            if (strings !is List<*>) throw RuntimeException("Expected a template strings array for " + functionName)
            for (text in Lt.items(strings)) {
                if (text !is String) throw RuntimeException("Expected a template strings array for " + functionName)
            }
            val expressions = functionArgs.subList(1, functionArgs.size)
            if (expressions.size != Lt.items(strings).size - 1) {
                throw RuntimeException(
                    "Template literal for " + functionName + " expects " + (Lt.items(strings).size - 1)
                        + " expression(s), but got " + expressions.size
                )
            }
            for (index in Lt.items(strings).indices) {
                val text = Lt.asString(Lt.items(strings)[index])
                if (text.isNotEmpty()) {
                    args.add(Lt.map(listOf("argument" to Lt.map(listOf("string" to Lt.map(listOf("value" to text)))), "default" to null)))
                }
                if (index < expressions.size) {
                    val expression = expressions[index]
                    if (expression == null) throw RuntimeException("Missing expression for template literal at index " + index)
                    args.add(Lt.map(listOf(
                        "argument" to normalize_argument(Lt.get(expression, "arg"), Lt.get(expression, "struct")),
                        "default" to null,
                    )))
                }
            }
        } else {
            for (index in functionArgs.indices) {
                val functionArg = functionArgs[index]
                val arg = Lt.get(functionArg, "arg")
                if (arg == Lt.MISSING) {
                    if (Lt.truthy(Lt.get(functionArg, "provided"))) {
                        throw RuntimeException("Parameter \"" + functionName + "\" argument #" + (index + 1) + " cannot be undefined")
                    }
                    val defaultVal = Lt.get(functionArg, "default")
                    if (defaultVal != null) {
                        validate_default(defaultVal, Lt.get(functionArg, "struct"))
                        args.add(Lt.map(listOf("argument" to defaultVal, "default" to defaultVal)))
                        continue
                    }
                    throw RuntimeException("Parameter \"" + functionName + "\" argument #" + (index + 1) + " was not provided")
                }
                val argument = normalize_argument(arg, Lt.get(functionArg, "struct"))
                val defaultVal = Lt.get(functionArg, "default")
                if (defaultVal != null) validate_default(defaultVal, Lt.get(functionArg, "struct"))
                args.add(Lt.map(listOf("argument" to argument, "default" to defaultVal)))
            }
        }

        values.add(Lt.map(listOf("functionCall" to Lt.map(listOf(
            "name" to functionName,
            "arguments" to args,
            "isTemplateLiteral" to isTemplateLiteral,
        )))))
        return newSchema
    }

    fun create_property_call_schema(oldSchema: MutableMap<String, Any?>, propertyName: String): MutableMap<String, Any?> {
        val old = Lt.asMap(Lt.get(oldSchema, "schema"))
        val oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"))
        val values = ArrayList<Any?>(Lt.items(Lt.get(oldChain, "values")))
        values.add(Lt.map(listOf("propertyCall" to Lt.map(listOf("name" to propertyName)))))

        val inner = LinkedHashMap<String, Any?>()
        for ((key, value) in old) inner[key] = value
        inner["chain"] = Lt.map(listOf("chain" to Lt.map(listOf(
            "values" to values,
            "initFunction" to Lt.get(oldChain, "initFunction"),
        ))))
        return Lt.map(listOf("schema" to inner))
    }

    fun make_copy(structureName: String, source: Structure): Any? {
        val schema = source.getSchema()
        validate_schema(schema)
        return Lt.map(listOf("copy" to Lt.map(listOf(
            "structureName" to structureName,
            "chain" to Lt.get(Lt.get(schema, "schema"), "chain"),
        ))))
    }

    fun apply_copies(schema: MutableMap<String, Any?>, copies: Any?, targetStructureName: String) {
        if (!Lt.truthy(copies)) return
        for (cp in Lt.items(copies)) {
            if (
                cp !is Map<*, *>
                || !Lt.has(cp, "copy")
                || Lt.get(cp, "copy") !is Map<*, *>
                || Lt.get(Lt.get(cp, "copy"), "structureName") !is String
                || Lt.get(Lt.get(cp, "copy"), "chain") !is Map<*, *>
            ) {
                throw RuntimeException("Invalid builder argument in init function: wrap the structure with copy(...)")
            }
            val name = Lt.asString(Lt.get(Lt.get(cp, "copy"), "structureName"))
            if (name != targetStructureName) {
                throw RuntimeException("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'")
            }
            val value = Lt.map(listOf("copy" to Lt.map(listOf(
                "structureName" to name,
                "chain" to Lt.get(Lt.get(cp, "copy"), "chain"),
            ))))
            Lt.asList(Lt.get(Lt.get(Lt.get(Lt.get(schema, "schema"), "chain"), "chain"), "values")).add(value)
        }
    }


    fun normalize_argument_structure_call(arg: Any?): Any? {
        if (arg is SqlBuilder) {
            return Lt.get(Lt.get((arg as Structure).getSchema(), "schema"), "chain")
        }
        if (arg is Map<*, *>) throw RuntimeException("Unknown structure call argument type")
        val got = when {
            arg == null -> "null"
            arg is List<*> -> "array"
            else -> _typeof(arg)
        }
        throw RuntimeException("Expected a structure instance for structure calls, but got " + got)
    }

    fun copy(source: Any?): Any? {
        if (source is SqlBuilder) return make_copy("sql-builder", source)
        throw RuntimeException("copy() expects a structure instance created by an init function")
    }
}

class SqlBuilder : Structure {
    var schemaSqlBuilder: MutableMap<String, Any?> = Lt.map(listOf("schema" to Lt.map(listOf("exportName" to "schema", "importPaths" to Lt.map(listOf("typescript" to "../../../gntrees-sql-builder/typescript/index")), "chain" to Lt.map(listOf("chain" to Lt.map(listOf("values" to Lt.array(emptyList<Any?>()), "initFunction" to Lt.map(listOf("name" to "sql-builder", "variableName" to "s1"))))))))))

    override fun getSchema(): MutableMap<String, Any?> = schemaSqlBuilder

    fun getSchema(exportName: String?, importPaths: MutableMap<String, Any?>?): MutableMap<String, Any?> {
        val inner = Lt.asMap(Lt.get(schemaSqlBuilder, "schema"))
        if (exportName != null && exportName.isNotEmpty()) inner["exportName"] = exportName
        if (importPaths != null) {
            val merged = LinkedHashMap<String, Any?>()
            val existing = inner["importPaths"]
            if (existing is Map<*, *>) merged.putAll(Lt.asMap(existing))
            merged.putAll(importPaths)
            inner["importPaths"] = merged
        }
        return schemaSqlBuilder
    }

    fun initFromStructure(schema: MutableMap<String, Any?>): SqlBuilder {
        Mc.validate_schema(schema)
        schemaSqlBuilder = schema
        return this
    }

    fun initFromInitFunction(initFunction: MutableMap<String, Any?>): SqlBuilder = initFromInitFunction(initFunction, null)

    fun initFromInitFunction(initFunction: MutableMap<String, Any?>, copies: Any?): SqlBuilder {
        if (Lt.get(initFunction, "name") !is String || Lt.get(initFunction, "variableName") !is String) {
            throw RuntimeException("Invalid init function")
        }
        Lt.asMap(Lt.get(Lt.get(Lt.get(schemaSqlBuilder, "schema"), "chain"), "chain"))["initFunction"] = initFunction
        Mc.apply_copies(schemaSqlBuilder, copies, "sql-builder")
        return this
    }

    fun select(vararg __a: Any?): SqlBuilder {
        val columns: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (columns == Lt.MISSING) throw RuntimeException("Parameter \"select\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "select", Lt.array(listOf(
            Lt.map(listOf("arg" to columns, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))), Lt.map(listOf("map" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (columns != Lt.MISSING)))
        )), false))
    }

    fun from(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"from\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "from", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING)))
        )), false))
    }

    fun transaction(vararg __a: Any?): SqlBuilder {
        val transaction: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (transaction == Lt.MISSING) throw RuntimeException("Parameter \"transaction\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "transaction", Lt.array(listOf(
            Lt.map(listOf("arg" to transaction, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (transaction != Lt.MISSING)))
        )), false))
    }

    fun orderBy(vararg __a: Any?): SqlBuilder {
        val columns: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (columns == Lt.MISSING) throw RuntimeException("Parameter \"orderBy\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "orderBy", Lt.array(listOf(
            Lt.map(listOf("arg" to columns, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (columns != Lt.MISSING)))
        )), false))
    }

    fun limit(vararg __a: Any?): SqlBuilder {
        val count: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (count == Lt.MISSING) throw RuntimeException("Parameter \"limit\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "limit", Lt.array(listOf(
            Lt.map(listOf("arg" to count, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (count != Lt.MISSING)))
        )), false))
    }

    fun offset(vararg __a: Any?): SqlBuilder {
        val count: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (count == Lt.MISSING) throw RuntimeException("Parameter \"offset\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "offset", Lt.array(listOf(
            Lt.map(listOf("arg" to count, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (count != Lt.MISSING)))
        )), false))
    }

    fun with(vararg __a: Any?): SqlBuilder {
        val statement: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val as_: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (statement == Lt.MISSING) throw RuntimeException("Parameter \"with\" argument #1 was not provided")
        if (as_ == Lt.MISSING) throw RuntimeException("Parameter \"with\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "with", Lt.array(listOf(
            Lt.map(listOf("arg" to statement, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (statement != Lt.MISSING))),
            Lt.map(listOf("arg" to as_, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (as_ != Lt.MISSING)))
        )), false))
    }

    fun groupBy(vararg __a: Any?): SqlBuilder {
        val columns: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (columns == Lt.MISSING) throw RuntimeException("Parameter \"groupBy\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "groupBy", Lt.array(listOf(
            Lt.map(listOf("arg" to columns, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (columns != Lt.MISSING)))
        )), false))
    }

    fun having(vararg __a: Any?): SqlBuilder {
        val statement: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (statement == Lt.MISSING) throw RuntimeException("Parameter \"having\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "having", Lt.array(listOf(
            Lt.map(listOf("arg" to statement, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (statement != Lt.MISSING)))
        )), false))
    }

    fun where(vararg __a: Any?): SqlBuilder {
        val statement: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (statement == Lt.MISSING) throw RuntimeException("Parameter \"where\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "where", Lt.array(listOf(
            Lt.map(listOf("arg" to statement, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (statement != Lt.MISSING)))
        )), false))
    }

    fun update(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val set: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"update\" argument #1 was not provided")
        if (set == Lt.MISSING) throw RuntimeException("Parameter \"update\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "update", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to set, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("map" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (set != Lt.MISSING)))
        )), false))
    }

    fun set(vararg __a: Any?): SqlBuilder {
        val statement: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (statement == Lt.MISSING) throw RuntimeException("Parameter \"set\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "set", Lt.array(listOf(
            Lt.map(listOf("arg" to statement, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("map" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (statement != Lt.MISSING)))
        )), false))
    }

    fun insert(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val set: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"insert\" argument #1 was not provided")
        if (set == Lt.MISSING) throw RuntimeException("Parameter \"insert\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "insert", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to set, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("map" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (set != Lt.MISSING)))
        )), false))
    }

    fun values(vararg __a: Any?): SqlBuilder {
        val values: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (values == Lt.MISSING) throw RuntimeException("Parameter \"values\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "values", Lt.array(listOf(
            Lt.map(listOf("arg" to values, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))))))), "provided" to (values != Lt.MISSING)))
        )), false))
    }

    fun returning(vararg __a: Any?): SqlBuilder {
        val columns: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (columns == Lt.MISSING) throw RuntimeException("Parameter \"returning\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "returning", Lt.array(listOf(
            Lt.map(listOf("arg" to columns, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))), Lt.map(listOf("map" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (columns != Lt.MISSING)))
        )), false))
    }

    fun onConflictDoNothing(vararg __a: Any?): SqlBuilder {
        val target: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (target == Lt.MISSING) throw RuntimeException("Parameter \"onConflictDoNothing\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoNothing", Lt.array(listOf(
            Lt.map(listOf("arg" to target, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (target != Lt.MISSING)))
        )), false))
    }

    fun onConflictDoUpdate(vararg __a: Any?): SqlBuilder {
        val target: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val set: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (target == Lt.MISSING) throw RuntimeException("Parameter \"onConflictDoUpdate\" argument #1 was not provided")
        if (set == Lt.MISSING) throw RuntimeException("Parameter \"onConflictDoUpdate\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoUpdate", Lt.array(listOf(
            Lt.map(listOf("arg" to target, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (target != Lt.MISSING))),
            Lt.map(listOf("arg" to set, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("map" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (set != Lt.MISSING)))
        )), false))
    }

    fun delete(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"delete\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "delete", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING)))
        )), false))
    }

    fun join(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val on: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"join\" argument #1 was not provided")
        if (on == Lt.MISSING) throw RuntimeException("Parameter \"join\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "join", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to on, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (on != Lt.MISSING)))
        )), false))
    }

    fun leftJoin(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val on: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"leftJoin\" argument #1 was not provided")
        if (on == Lt.MISSING) throw RuntimeException("Parameter \"leftJoin\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "leftJoin", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to on, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (on != Lt.MISSING)))
        )), false))
    }

    fun rightJoin(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val on: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"rightJoin\" argument #1 was not provided")
        if (on == Lt.MISSING) throw RuntimeException("Parameter \"rightJoin\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "rightJoin", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to on, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (on != Lt.MISSING)))
        )), false))
    }

    fun innerJoin(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val on: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"innerJoin\" argument #1 was not provided")
        if (on == Lt.MISSING) throw RuntimeException("Parameter \"innerJoin\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "innerJoin", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to on, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (on != Lt.MISSING)))
        )), false))
    }

    fun fullJoin(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val on: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"fullJoin\" argument #1 was not provided")
        if (on == Lt.MISSING) throw RuntimeException("Parameter \"fullJoin\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "fullJoin", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to on, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (on != Lt.MISSING)))
        )), false))
    }

    fun crossJoin(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val on: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"crossJoin\" argument #1 was not provided")
        if (on == Lt.MISSING) throw RuntimeException("Parameter \"crossJoin\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "crossJoin", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING))),
            Lt.map(listOf("arg" to on, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (on != Lt.MISSING)))
        )), false))
    }

    fun eq(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"eq\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "eq", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun gt(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"gt\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gt", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun gte(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"gte\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gte", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun lt(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"lt\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lt", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun lte(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"lte\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lte", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun exists(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"exists\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "exists", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun isNull(vararg __a: Any?): SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNull", Lt.array(listOf(
        )), false))
    }

    fun isNotNull(vararg __a: Any?): SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNotNull", Lt.array(listOf(
        )), false))
    }

    fun in_(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"in\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "in", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun between(vararg __a: Any?): SqlBuilder {
        val first: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val second: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (first == Lt.MISSING) throw RuntimeException("Parameter \"between\" argument #1 was not provided")
        if (second == Lt.MISSING) throw RuntimeException("Parameter \"between\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "between", Lt.array(listOf(
            Lt.map(listOf("arg" to first, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (first != Lt.MISSING))),
            Lt.map(listOf("arg" to second, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (second != Lt.MISSING)))
        )), false))
    }

    fun like(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"like\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "like", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun ilike(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"ilike\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "ilike", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun not(vararg __a: Any?): SqlBuilder {
        val value: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"not\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "not", Lt.array(listOf(
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun and(vararg __a: Any?): SqlBuilder {
        val values: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (values == Lt.MISSING) throw RuntimeException("Parameter \"and\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "and", Lt.array(listOf(
            Lt.map(listOf("arg" to values, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (values != Lt.MISSING)))
        )), false))
    }

    fun or(vararg __a: Any?): SqlBuilder {
        val values: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (values == Lt.MISSING) throw RuntimeException("Parameter \"or\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "or", Lt.array(listOf(
            Lt.map(listOf("arg" to values, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), Lt.map(listOf("array" to Lt.map(listOf("type" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))))))))), "provided" to (values != Lt.MISSING)))
        )), false))
    }

    fun op(vararg __a: Any?): SqlBuilder {
        val operation: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        val value: Any? = if (__a.size > 1) __a[1] else Lt.MISSING
        if (operation == Lt.MISSING) throw RuntimeException("Parameter \"op\" argument #1 was not provided")
        if (value == Lt.MISSING) throw RuntimeException("Parameter \"op\" argument #2 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "op", Lt.array(listOf(
            Lt.map(listOf("arg" to operation, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (operation != Lt.MISSING))),
            Lt.map(listOf("arg" to value, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (value != Lt.MISSING)))
        )), false))
    }

    fun raw(vararg __a: Any?): SqlBuilder {
        val __fargs = ArrayList<Any?>()
        __fargs.add(Lt.map(listOf("arg" to (if (__a.size > 0) __a[0] else Lt.MISSING), "struct" to Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))))))
        for (__i in 1 until __a.size) __fargs.add(Lt.map(listOf("arg" to __a[__i], "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))))))
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "raw", __fargs, true))
    }

    fun asc(vararg __a: Any?): SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "asc", Lt.array(listOf(
        )), false))
    }

    fun desc(vararg __a: Any?): SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "desc", Lt.array(listOf(
        )), false))
    }

    fun as_(vararg __a: Any?): SqlBuilder {
        val alias: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (alias == Lt.MISSING) throw RuntimeException("Parameter \"as\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "as", Lt.array(listOf(
            Lt.map(listOf("arg" to alias, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (alias != Lt.MISSING)))
        )), false))
    }

    fun col(vararg __a: Any?): SqlBuilder {
        val column: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (column == Lt.MISSING) throw RuntimeException("Parameter \"col\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "col", Lt.array(listOf(
            Lt.map(listOf("arg" to column, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (column != Lt.MISSING)))
        )), false))
    }

    fun table(vararg __a: Any?): SqlBuilder {
        val table: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (table == Lt.MISSING) throw RuntimeException("Parameter \"table\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "table", Lt.array(listOf(
            Lt.map(listOf("arg" to table, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("string" to Lt.map(listOf("type" to "string")))), Lt.map(listOf("number" to Lt.map(listOf("type" to "number")))), Lt.map(listOf("boolean" to Lt.map(listOf("type" to "boolean")))), Lt.map(listOf("structureCall" to Lt.map(listOf("name" to "sql-builder")))))))))), "provided" to (table != Lt.MISSING)))
        )), false))
    }

    fun setDialect(vararg __a: Any?): SqlBuilder {
        val db: Any? = if (__a.size > 0) __a[0] else Lt.MISSING
        if (db == Lt.MISSING) throw RuntimeException("Parameter \"setDialect\" argument #1 was not provided")
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "setDialect", Lt.array(listOf(
            Lt.map(listOf("arg" to db, "struct" to Lt.map(listOf("union" to Lt.map(listOf("types" to Lt.array(listOf(Lt.map(listOf("literal" to Lt.map(listOf("value" to "postgres", "type" to "string")))), Lt.map(listOf("literal" to Lt.map(listOf("value" to "mysql", "type" to "string")))), Lt.map(listOf("literal" to Lt.map(listOf("value" to "sqlite", "type" to "string")))), Lt.map(listOf("literal" to Lt.map(listOf("value" to "single-store", "type" to "string")))), Lt.map(listOf("literal" to Lt.map(listOf("value" to "mssql", "type" to "string")))), Lt.map(listOf("literal" to Lt.map(listOf("value" to "cockroach", "type" to "string")))))))))), "provided" to (db != Lt.MISSING)))
        )), false))
    }

    fun parse(): MutableMap<String, Any?> {
        val root: Any? = this.getSchema()
        val __fns = LinkedHashMap<String, (List<Any?>) -> Any?>()
        var dialect: Any? = Lt.string("")
        var quote: Any? = Lt.string("")
        var sql: Any? = Lt.bufNew()
        var wsql: Any? = Lt.bufNew()
        var params: Any? = Lt.listNew()
        var orderSql: Any? = Lt.string("")
        var orderW: Any? = Lt.string("")
        var hasOrder: Any? = Lt.boolean(false)
        var tmp: Any? = Lt.string("")
        var tmp2: Any? = Lt.string("")
        var tmpRef: Any? = Lt.string("")
        var subAlias: Any? = Lt.string("")
        var withFirst: Any? = Lt.boolean(true)
        __fns["normName"] = fun(__a: List<Any?>): Any? {
          val n: Any? = __a[0]
          return Lt.toLower(Lt.replace(n, Lt.string("-"), Lt.string("")))
          return Lt.nullValue()
        }
        __fns["pushSql"] = fun(__a: List<Any?>): Any? {
          val text: Any? = __a[0]
          sql = Lt.bufAppend(sql, Lt.string(" "))
          sql = Lt.bufAppend(sql, text)
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["pushW"] = fun(__a: List<Any?>): Any? {
          val text: Any? = __a[0]
          wsql = Lt.bufAppend(wsql, Lt.string(" "))
          wsql = Lt.bufAppend(wsql, text)
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["asString"] = fun(__a: List<Any?>): Any? {
          val arg: Any? = __a[0]
          return Lt.get(Lt.get(arg, Lt.string("string")), Lt.string("value"))
          return Lt.nullValue()
        }
        __fns["identStr"] = fun(__a: List<Any?>): Any? {
          val name: Any? = __a[0]
          var escapedName: Any? = Lt.replace(name, quote, Lt.strConcat(quote, quote))
          var qualifiedName: Any? = Lt.replace(escapedName, Lt.string("."), Lt.strConcat(quote, Lt.strConcat(Lt.string("."), quote)))
          return Lt.strConcat(quote, Lt.strConcat(qualifiedName, quote))
          return Lt.nullValue()
        }
        __fns["literalOf"] = fun(__a: List<Any?>): Any? {
          val arg: Any? = __a[0]
          var outLiteral: Any? = Lt.string("")
          if (Lt.truthy(Lt.has(arg, Lt.string("string")))) {
            outLiteral = Lt.strConcat(Lt.string("'"), Lt.strConcat(Lt.replace(__fns.getValue("asString")(listOf(arg)), Lt.string("'"), Lt.string("''")), Lt.string("'")))
          }
          else if (Lt.truthy(Lt.has(arg, Lt.string("number")))) {
            outLiteral = Lt.toString(Lt.get(Lt.get(arg, Lt.string("number")), Lt.string("value")))
          }
          else if (Lt.truthy(Lt.has(arg, Lt.string("boolean")))) {
            if (Lt.truthy(Lt.get(Lt.get(arg, Lt.string("boolean")), Lt.string("value")))) {
              outLiteral = Lt.string("TRUE")
            }
            else {
              outLiteral = Lt.string("FALSE")
            }
          }
          else {
            outLiteral = Lt.string("NULL")
          }
          return outLiteral
          return Lt.nullValue()
        }
        __fns["opOf"] = fun(__a: List<Any?>): Any? {
          val n: Any? = __a[0]
          var o: Any? = Lt.string("")
          if (Lt.valueEquals(n, Lt.string("eq"))) {
            o = Lt.string("=")
          }
          else if (Lt.valueEquals(n, Lt.string("gt"))) {
            o = Lt.string(">")
          }
          else if (Lt.valueEquals(n, Lt.string("gte"))) {
            o = Lt.string(">=")
          }
          else if (Lt.valueEquals(n, Lt.string("lt"))) {
            o = Lt.string("<")
          }
          else if (Lt.valueEquals(n, Lt.string("lte"))) {
            o = Lt.string("<=")
          }
          else if (Lt.valueEquals(n, Lt.string("like"))) {
            o = Lt.string("LIKE")
          }
          else if (Lt.valueEquals(n, Lt.string("ilike"))) {
            if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
              o = Lt.string("ILIKE")
            }
            else {
              o = Lt.string("LIKE")
            }
          }
          return o
          return Lt.nullValue()
        }
        __fns["itemsOf"] = fun(__a: List<Any?>): Any? {
          val arg: Any? = __a[0]
          if (Lt.truthy(Lt.has(arg, Lt.string("array")))) {
            return Lt.get(Lt.get(arg, Lt.string("array")), Lt.string("value"))
          }
          return Lt.append(Lt.array(listOf()), arg)
          return Lt.nullValue()
        }
        __fns["isRef"] = fun(__a: List<Any?>): Any? {
          val chainValues: Any? = __a[0]
          tmpRef = Lt.string("")
          if (Lt.valueEquals(Lt.len(chainValues), Lt.number(1)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall")))) {
            var firstName: Any? = Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name")
            if (Lt.valueEquals(firstName, Lt.string("col")) || Lt.valueEquals(firstName, Lt.string("table"))) {
              tmpRef = __fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
            }
          }
          return tmpRef
          return Lt.nullValue()
        }
        __fns["emitParam"] = fun(__a: List<Any?>): Any? {
          val arg: Any? = __a[0]
          params = Lt.listPush(params, arg)
          if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
            tmp = Lt.strConcat(Lt.string("$"), Lt.toString(Lt.listLen(params)))
          }
          else {
            tmp = Lt.string("?")
          }
          __fns.getValue("pushSql")(listOf(tmp))
          tmp2 = __fns.getValue("literalOf")(listOf(arg))
          __fns.getValue("pushW")(listOf(tmp2))
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["emitIdent"] = fun(__a: List<Any?>): Any? {
          val name: Any? = __a[0]
          tmp = __fns.getValue("identStr")(listOf(name))
          __fns.getValue("pushSql")(listOf(tmp))
          __fns.getValue("pushW")(listOf(tmp))
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["emitRaw"] = fun(__a: List<Any?>): Any? {
          val node: Any? = __a[0]
          if (!Lt.valueEquals(Lt.bufLen(sql), Lt.number(0))) {
            sql = Lt.bufAppend(sql, Lt.string(" "))
            wsql = Lt.bufAppend(wsql, Lt.string(" "))
          }
          for (rawArg in Lt.arrayItems(Lt.get(Lt.get(node, "functionCall"), "arguments"))) {
            var rawVal: Any? = Lt.get(rawArg, Lt.string("argument"))
            if (Lt.truthy(Lt.has(rawVal, Lt.string("string")))) {
              sql = Lt.bufAppend(sql, __fns.getValue("asString")(listOf(rawVal)))
              wsql = Lt.bufAppend(wsql, __fns.getValue("asString")(listOf(rawVal)))
            }
            else if (Lt.truthy(Lt.has(rawVal, Lt.string("chain")))) {
              tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(rawVal, "chain"), "values")))
              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                sql = Lt.bufAppend(sql, __fns.getValue("identStr")(listOf(tmpRef)))
                wsql = Lt.bufAppend(wsql, __fns.getValue("identStr")(listOf(tmpRef)))
              }
              else {
                params = Lt.listPush(params, rawVal)
                if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
                  tmp = Lt.strConcat(Lt.string("$"), Lt.toString(Lt.listLen(params)))
                }
                else {
                  tmp = Lt.string("?")
                }
                sql = Lt.bufAppend(sql, tmp)
                tmp2 = __fns.getValue("literalOf")(listOf(rawVal))
                wsql = Lt.bufAppend(wsql, tmp2)
              }
            }
            else {
              params = Lt.listPush(params, rawVal)
              if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
                tmp = Lt.strConcat(Lt.string("$"), Lt.toString(Lt.listLen(params)))
              }
              else {
                tmp = Lt.string("?")
              }
              sql = Lt.bufAppend(sql, tmp)
              tmp2 = __fns.getValue("literalOf")(listOf(rawVal))
              wsql = Lt.bufAppend(wsql, tmp2)
            }
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["conflictTarget"] = fun(__a: List<Any?>): Any? {
          val arg: Any? = __a[0]
          var ct: Any? = Lt.string("()")
          if (Lt.truthy(Lt.has(arg, Lt.string("chain")))) {
            tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(arg, "chain"), "values")))
            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
              ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns.getValue("identStr")(listOf(tmpRef)), Lt.string(")")))
            }
          }
          else if (Lt.truthy(Lt.has(arg, Lt.string("string")))) {
            ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns.getValue("identStr")(listOf(__fns.getValue("asString")(listOf(arg)))), Lt.string(")")))
          }
          return ct
          return Lt.nullValue()
        }
        __fns["firstKind"] = fun(__a: List<Any?>): Any? {
          val chainValues: Any? = __a[0]
          var kind: Any? = Lt.string("")
          if (!Lt.valueEquals(Lt.len(chainValues), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall")))) {
            kind = __fns.getValue("normName")(listOf(Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name")))
          }
          return kind
          return Lt.nullValue()
        }
        __fns["emitOrderItem"] = fun(__a: List<Any?>): Any? {
          val item: Any? = __a[0]
          var dir: Any? = Lt.string("")
          var ordName: Any? = Lt.string("")
          if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
            for (on in Lt.arrayItems(Lt.get(Lt.get(item, "chain"), "values"))) {
              var onn: Any? = __fns.getValue("normName")(listOf(Lt.get(Lt.get(on, "functionCall"), "name")))
              if (Lt.valueEquals(onn, Lt.string("asc"))) {
                dir = Lt.string(" ASC")
              }
              else if (Lt.valueEquals(onn, Lt.string("desc"))) {
                dir = Lt.string(" DESC")
              }
              else if (Lt.valueEquals(onn, Lt.string("col")) || Lt.valueEquals(onn, Lt.string("table"))) {
                ordName = __fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(on, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
              }
            }
          }
          if (!Lt.valueEquals(ordName, Lt.string(""))) {
            tmp = __fns.getValue("identStr")(listOf(ordName))
            orderSql = Lt.strConcat(orderSql, Lt.strConcat(tmp, dir))
            orderW = Lt.strConcat(orderW, Lt.strConcat(tmp, dir))
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["emitOrderList"] = fun(__a: List<Any?>): Any? {
          val arg: Any? = __a[0]
          var firstOrder: Any? = Lt.boolean(true)
          for (item in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(arg)))) {
            if (Lt.valueEquals(firstOrder, Lt.boolean(false))) {
              orderSql = Lt.strConcat(orderSql, Lt.string(", "))
              orderW = Lt.strConcat(orderW, Lt.string(", "))
            }
            firstOrder = Lt.boolean(false)
            __fns.getValue("emitOrderItem")(listOf(item))
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["flushOrder"] = fun(__a: List<Any?>): Any? {
          if (Lt.truthy(hasOrder)) {
            __fns.getValue("pushSql")(listOf(Lt.string("ORDER")))
            __fns.getValue("pushSql")(listOf(Lt.string("BY")))
            __fns.getValue("pushW")(listOf(Lt.string("ORDER")))
            __fns.getValue("pushW")(listOf(Lt.string("BY")))
            tmp = orderSql
            if (!Lt.valueEquals(tmp, Lt.string(""))) {
              __fns.getValue("pushSql")(listOf(tmp))
            }
            tmp2 = orderW
            if (!Lt.valueEquals(tmp2, Lt.string(""))) {
              __fns.getValue("pushW")(listOf(tmp2))
            }
            hasOrder = Lt.boolean(false)
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        for (dialectNode in Lt.arrayItems(Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values"))) {
          if (Lt.valueEquals(__fns.getValue("normName")(listOf(Lt.get(Lt.get(dialectNode, "functionCall"), "name"))), Lt.string("setdialect"))) {
            dialect = Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(dialectNode, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("string")), Lt.string("value"))
          }
        }
        if (Lt.valueEquals(dialect, Lt.string(""))) {
          throw RuntimeException(Lt.asString(Lt.string("sql-builder parse: setDialect(...) must be called before parse()")))
        }
        else if (!Lt.valueEquals(dialect, Lt.string("postgres")) && !Lt.valueEquals(dialect, Lt.string("mysql"))) {
          throw RuntimeException(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported dialect "), dialect)))
        }
        if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
          quote = Lt.string("`")
        }
        else {
          quote = Lt.string("\"")
        }
        __fns["renderNodes"] = fun(__a: List<Any?>): Any? {
          val nodes: Any? = __a[0]
          val mode: Any? = __a[1]
          var savedSql: Any? = Lt.string("")
          var savedW: Any? = Lt.string("")
          var savedOrderSql: Any? = Lt.string("")
          var savedOrderW: Any? = Lt.string("")
          var savedHasOrder: Any? = Lt.boolean(false)
          var savedAlias: Any? = Lt.string("")
          var subSql: Any? = Lt.string("")
          var subW: Any? = Lt.string("")
          var subAliasText: Any? = Lt.string("")
          var first: Any? = Lt.boolean(true)
          var left: Any? = Lt.string("")
          var hasLeft: Any? = Lt.boolean(false)
          var base: Any? = Lt.string("")
          if (Lt.valueEquals(mode, Lt.number(0))) {
            for (node in Lt.arrayItems(nodes)) {
              if (Lt.truthy(Lt.has(node, Lt.string("functionCall")))) {
                var name: Any? = Lt.get(Lt.get(node, "functionCall"), "name")
                var nameNorm: Any? = __fns.getValue("normName")(listOf(name))
                if (Lt.valueEquals(nameNorm, Lt.string("setdialect"))) {
                  continue
                }
                else if (Lt.valueEquals(nameNorm, Lt.string("asc")) || Lt.valueEquals(nameNorm, Lt.string("desc"))) {
                  if (Lt.truthy(hasOrder)) {
                    tmp = Lt.toUpper(nameNorm)
                    orderSql = Lt.strConcat(orderSql, Lt.strConcat(Lt.string(" "), tmp))
                    orderW = Lt.strConcat(orderW, Lt.strConcat(Lt.string(" "), tmp))
                  }
                }
                else {
                  if (Lt.valueEquals(nameNorm, Lt.string("with"))) {
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    sql = Lt.bufNew()
                    wsql = Lt.bufNew()
                    orderSql = Lt.string("")
                    orderW = Lt.string("")
                    hasOrder = Lt.boolean(false)
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                    subSql = Lt.trim(Lt.bufStr(sql))
                    subW = Lt.trim(Lt.bufStr(wsql))
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    if (Lt.valueEquals(withFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(","))
                      wsql = Lt.bufAppend(wsql, Lt.string(","))
                    }
                    else {
                      withFirst = Lt.boolean(false)
                      __fns.getValue("pushSql")(listOf(Lt.string("WITH")))
                      __fns.getValue("pushW")(listOf(Lt.string("WITH")))
                    }
                    __fns.getValue("pushSql")(listOf(__fns.getValue("identStr")(listOf(__fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))))))
                    __fns.getValue("pushW")(listOf(__fns.getValue("identStr")(listOf(__fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))))))
                    __fns.getValue("pushSql")(listOf(Lt.string("AS")))
                    __fns.getValue("pushW")(listOf(Lt.string("AS")))
                    __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                    __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("transaction"))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("BEGIN")))
                    __fns.getValue("pushW")(listOf(Lt.string("BEGIN")))
                    sql = Lt.bufAppend(sql, Lt.string(";"))
                    wsql = Lt.bufAppend(wsql, Lt.string(";"))
                    var txnFirst: Any? = Lt.boolean(true)
                    for (txnItem in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                      if (Lt.valueEquals(txnFirst, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(";"))
                        wsql = Lt.bufAppend(wsql, Lt.string(";"))
                      }
                      txnFirst = Lt.boolean(false)
                      if (Lt.truthy(Lt.has(txnItem, Lt.string("chain")))) {
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)))
                      }
                      else if (Lt.truthy(Lt.has(txnItem, Lt.string("string")))) {
                        __fns.getValue("pushSql")(listOf(__fns.getValue("asString")(listOf(txnItem))))
                        __fns.getValue("pushW")(listOf(__fns.getValue("asString")(listOf(txnItem))))
                      }
                      else {
                        if (Lt.truthy(Lt.has(txnItem, Lt.string("chain")))) {
                          tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values")))
                          if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                            __fns.getValue("emitIdent")(listOf(tmpRef))
                          }
                          else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("delete")))))) {
                            savedSql = sql
                            savedW = wsql
                            savedOrderSql = orderSql
                            savedOrderW = orderW
                            savedHasOrder = hasOrder
                            savedAlias = subAlias
                            sql = Lt.bufNew()
                            wsql = Lt.bufNew()
                            orderSql = Lt.string("")
                            orderW = Lt.string("")
                            hasOrder = Lt.boolean(false)
                            subAlias = Lt.string("")
                            __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)))
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                            __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                            if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                              __fns.getValue("pushSql")(listOf(subAliasText))
                              __fns.getValue("pushW")(listOf(subAliasText))
                            }
                          }
                          else {
                            __fns.getValue("emitParam")(listOf(txnItem))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(txnItem))
                        }
                      }
                    }
                    if (Lt.valueEquals(txnFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(";"))
                      wsql = Lt.bufAppend(wsql, Lt.string(";"))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("COMMIT")))
                    __fns.getValue("pushW")(listOf(Lt.string("COMMIT")))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("select"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("SELECT")))
                    __fns.getValue("pushW")(listOf(Lt.string("SELECT")))
                    var firstItem: Any? = Lt.boolean(true)
                    for (item in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                      if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      firstItem = Lt.boolean(false)
                      if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                        tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(item, "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns.getValue("emitIdent")(listOf(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("delete")))))) {
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = Lt.bufNew()
                          wsql = Lt.bufNew()
                          orderSql = Lt.string("")
                          orderW = Lt.string("")
                          hasOrder = Lt.boolean(false)
                          subAlias = Lt.string("")
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns.getValue("pushSql")(listOf(subAliasText))
                            __fns.getValue("pushW")(listOf(subAliasText))
                          }
                        }
                        else {
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(item))
                      }
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("from"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("FROM")))
                    __fns.getValue("pushW")(listOf(Lt.string("FROM")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("join"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("JOIN")))
                    __fns.getValue("pushW")(listOf(Lt.string("JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                    __fns.getValue("pushW")(listOf(Lt.string("ON")))
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("leftjoin"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("LEFT JOIN")))
                    __fns.getValue("pushW")(listOf(Lt.string("LEFT JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                    __fns.getValue("pushW")(listOf(Lt.string("ON")))
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("rightjoin"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("RIGHT JOIN")))
                    __fns.getValue("pushW")(listOf(Lt.string("RIGHT JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                    __fns.getValue("pushW")(listOf(Lt.string("ON")))
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("innerjoin"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("INNER JOIN")))
                    __fns.getValue("pushW")(listOf(Lt.string("INNER JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                    __fns.getValue("pushW")(listOf(Lt.string("ON")))
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("fulljoin"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      throw RuntimeException(Lt.asString(Lt.string("sql-builder parse: FULL JOIN is not supported by mysql")))
                    }
                    else {
                      __fns.getValue("flushOrder")(listOf())
                      __fns.getValue("pushSql")(listOf(Lt.string("FULL JOIN")))
                      __fns.getValue("pushW")(listOf(Lt.string("FULL JOIN")))
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                        tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns.getValue("emitIdent")(listOf(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = Lt.bufNew()
                          wsql = Lt.bufNew()
                          orderSql = Lt.string("")
                          orderW = Lt.string("")
                          hasOrder = Lt.boolean(false)
                          subAlias = Lt.string("")
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns.getValue("pushSql")(listOf(subAliasText))
                            __fns.getValue("pushW")(listOf(subAliasText))
                          }
                        }
                        else {
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                      __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                      __fns.getValue("pushW")(listOf(Lt.string("ON")))
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("crossjoin"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("CROSS JOIN")))
                    __fns.getValue("pushW")(listOf(Lt.string("CROSS JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                    __fns.getValue("pushW")(listOf(Lt.string("ON")))
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("where"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("WHERE")))
                    __fns.getValue("pushW")(listOf(Lt.string("WHERE")))
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("groupby"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("GROUP BY")))
                    __fns.getValue("pushW")(listOf(Lt.string("GROUP BY")))
                    var firstItem: Any? = Lt.boolean(true)
                    for (item in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                      if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      firstItem = Lt.boolean(false)
                      if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                        tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(item, "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns.getValue("emitIdent")(listOf(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("delete")))))) {
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = Lt.bufNew()
                          wsql = Lt.bufNew()
                          orderSql = Lt.string("")
                          orderW = Lt.string("")
                          hasOrder = Lt.boolean(false)
                          subAlias = Lt.string("")
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns.getValue("pushSql")(listOf(subAliasText))
                            __fns.getValue("pushW")(listOf(subAliasText))
                          }
                        }
                        else {
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(item))
                      }
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("having"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("HAVING")))
                    __fns.getValue("pushW")(listOf(Lt.string("HAVING")))
                    __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("returning"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      throw RuntimeException(Lt.asString(Lt.string("sql-builder parse: RETURNING is not supported by mysql")))
                    }
                    else {
                      __fns.getValue("flushOrder")(listOf())
                      __fns.getValue("pushSql")(listOf(Lt.string("RETURNING")))
                      __fns.getValue("pushW")(listOf(Lt.string("RETURNING")))
                      var firstItem: Any? = Lt.boolean(true)
                      for (item in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                        if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        firstItem = Lt.boolean(false)
                        if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                          tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(item, "chain"), "values")))
                          if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                            __fns.getValue("emitIdent")(listOf(tmpRef))
                          }
                          else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("delete")))))) {
                            savedSql = sql
                            savedW = wsql
                            savedOrderSql = orderSql
                            savedOrderW = orderW
                            savedHasOrder = hasOrder
                            savedAlias = subAlias
                            sql = Lt.bufNew()
                            wsql = Lt.bufNew()
                            orderSql = Lt.string("")
                            orderW = Lt.string("")
                            hasOrder = Lt.boolean(false)
                            subAlias = Lt.string("")
                            __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)))
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                            __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                            if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                              __fns.getValue("pushSql")(listOf(subAliasText))
                              __fns.getValue("pushW")(listOf(subAliasText))
                            }
                          }
                          else {
                            __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(item))
                        }
                      }
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("orderby"))) {
                    hasOrder = Lt.boolean(true)
                    orderSql = Lt.string("")
                    orderW = Lt.string("")
                    __fns.getValue("emitOrderList")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("limit"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("LIMIT")))
                    __fns.getValue("pushW")(listOf(Lt.string("LIMIT")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("offset"))) {
                    __fns.getValue("flushOrder")(listOf())
                    __fns.getValue("pushSql")(listOf(Lt.string("OFFSET")))
                    __fns.getValue("pushW")(listOf(Lt.string("OFFSET")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("raw"))) {
                    __fns.getValue("emitRaw")(listOf(node))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("as"))) {
                    subAlias = Lt.strConcat(Lt.string("AS "), __fns.getValue("identStr")(listOf(__fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("update"))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("UPDATE")))
                    __fns.getValue("pushW")(listOf(Lt.string("UPDATE")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("SET")))
                    __fns.getValue("pushW")(listOf(Lt.string("SET")))
                    var assnFirst: Any? = Lt.boolean(true)
                    for (ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                      if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      assnFirst = Lt.boolean(false)
                      __fns.getValue("pushSql")(listOf(__fns.getValue("identStr")(listOf(ak))))
                      __fns.getValue("pushW")(listOf(__fns.getValue("identStr")(listOf(ak))))
                      __fns.getValue("pushSql")(listOf(Lt.string("=")))
                      __fns.getValue("pushW")(listOf(Lt.string("=")))
                      if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                        tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns.getValue("emitIdent")(listOf(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = Lt.bufNew()
                          wsql = Lt.bufNew()
                          orderSql = Lt.string("")
                          orderW = Lt.string("")
                          hasOrder = Lt.boolean(false)
                          subAlias = Lt.string("")
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns.getValue("pushSql")(listOf(subAliasText))
                            __fns.getValue("pushW")(listOf(subAliasText))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                      }
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("insert"))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("INSERT")))
                    __fns.getValue("pushW")(listOf(Lt.string("INSERT")))
                    __fns.getValue("pushSql")(listOf(Lt.string("INTO")))
                    __fns.getValue("pushW")(listOf(Lt.string("INTO")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string("(")))
                    __fns.getValue("pushW")(listOf(Lt.string("(")))
                    var colFirst: Any? = Lt.boolean(true)
                    for (ck in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                      if (Lt.valueEquals(colFirst, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      colFirst = Lt.boolean(false)
                      __fns.getValue("pushSql")(listOf(__fns.getValue("identStr")(listOf(ck))))
                      __fns.getValue("pushW")(listOf(__fns.getValue("identStr")(listOf(ck))))
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string(")")))
                    __fns.getValue("pushW")(listOf(Lt.string(")")))
                    __fns.getValue("pushSql")(listOf(Lt.string("VALUES")))
                    __fns.getValue("pushW")(listOf(Lt.string("VALUES")))
                    __fns.getValue("pushSql")(listOf(Lt.string("(")))
                    __fns.getValue("pushW")(listOf(Lt.string("(")))
                    var valFirst: Any? = Lt.boolean(true)
                    for (vk in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                      if (Lt.valueEquals(valFirst, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      valFirst = Lt.boolean(false)
                      if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), Lt.string("chain")))) {
                        tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns.getValue("emitIdent")(listOf(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("delete")))))) {
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = Lt.bufNew()
                          wsql = Lt.bufNew()
                          orderSql = Lt.string("")
                          orderW = Lt.string("")
                          hasOrder = Lt.boolean(false)
                          subAlias = Lt.string("")
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns.getValue("pushSql")(listOf(subAliasText))
                            __fns.getValue("pushW")(listOf(subAliasText))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)))
                      }
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string(")")))
                    __fns.getValue("pushW")(listOf(Lt.string(")")))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("delete"))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("DELETE")))
                    __fns.getValue("pushW")(listOf(Lt.string("DELETE")))
                    __fns.getValue("pushSql")(listOf(Lt.string("FROM")))
                    __fns.getValue("pushW")(listOf(Lt.string("FROM")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns.getValue("emitIdent")(listOf(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = Lt.bufNew()
                        wsql = Lt.bufNew()
                        orderSql = Lt.string("")
                        orderW = Lt.string("")
                        hasOrder = Lt.boolean(false)
                        subAlias = Lt.string("")
                        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns.getValue("pushSql")(listOf(subAliasText))
                          __fns.getValue("pushW")(listOf(subAliasText))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("set"))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("SET")))
                    __fns.getValue("pushW")(listOf(Lt.string("SET")))
                    var assnFirst: Any? = Lt.boolean(true)
                    for (ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value")))) {
                      if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      assnFirst = Lt.boolean(false)
                      __fns.getValue("pushSql")(listOf(__fns.getValue("identStr")(listOf(ak))))
                      __fns.getValue("pushW")(listOf(__fns.getValue("identStr")(listOf(ak))))
                      __fns.getValue("pushSql")(listOf(Lt.string("=")))
                      __fns.getValue("pushW")(listOf(Lt.string("=")))
                      if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                        tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns.getValue("emitIdent")(listOf(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = Lt.bufNew()
                          wsql = Lt.bufNew()
                          orderSql = Lt.string("")
                          orderW = Lt.string("")
                          hasOrder = Lt.boolean(false)
                          subAlias = Lt.string("")
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns.getValue("pushSql")(listOf(subAliasText))
                            __fns.getValue("pushW")(listOf(subAliasText))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)))
                      }
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("values"))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("VALUES")))
                    __fns.getValue("pushW")(listOf(Lt.string("VALUES")))
                    var valueRows: Any? = __fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    var valueFirst: Any? = Lt.boolean(true)
                    if (!Lt.valueEquals(Lt.len(valueRows), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(valueRows, Lt.number(0)), Lt.string("array")))) {
                      for (tuple in Lt.arrayItems(valueRows)) {
                        if (Lt.valueEquals(valueFirst, Lt.boolean(false))) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        valueFirst = Lt.boolean(false)
                        if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                          __fns.getValue("pushSql")(listOf(Lt.string("ROW")))
                          __fns.getValue("pushW")(listOf(Lt.string("ROW")))
                        }
                        __fns.getValue("pushSql")(listOf(Lt.string("(")))
                        __fns.getValue("pushW")(listOf(Lt.string("(")))
                        var itemFirst: Any? = Lt.boolean(true)
                        for (ti in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(tuple)))) {
                          if (Lt.valueEquals(itemFirst, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          itemFirst = Lt.boolean(false)
                          if (Lt.truthy(Lt.has(ti, Lt.string("chain")))) {
                            tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(ti, "chain"), "values")))
                            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                              __fns.getValue("emitIdent")(listOf(tmpRef))
                            }
                            else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("delete")))))) {
                              savedSql = sql
                              savedW = wsql
                              savedOrderSql = orderSql
                              savedOrderW = orderW
                              savedHasOrder = hasOrder
                              savedAlias = subAlias
                              sql = Lt.bufNew()
                              wsql = Lt.bufNew()
                              orderSql = Lt.string("")
                              orderW = Lt.string("")
                              hasOrder = Lt.boolean(false)
                              subAlias = Lt.string("")
                              __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)))
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                              __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                              if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                __fns.getValue("pushSql")(listOf(subAliasText))
                                __fns.getValue("pushW")(listOf(subAliasText))
                              }
                            }
                            else {
                              __fns.getValue("emitParam")(listOf(ti))
                            }
                          }
                          else {
                            __fns.getValue("emitParam")(listOf(ti))
                          }
                        }
                        __fns.getValue("pushSql")(listOf(Lt.string(")")))
                        __fns.getValue("pushW")(listOf(Lt.string(")")))
                      }
                    }
                    else {
                      if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                        __fns.getValue("pushSql")(listOf(Lt.string("ROW")))
                        __fns.getValue("pushW")(listOf(Lt.string("ROW")))
                      }
                      __fns.getValue("pushSql")(listOf(Lt.string("(")))
                      __fns.getValue("pushW")(listOf(Lt.string("(")))
                      var itemFirst: Any? = Lt.boolean(true)
                      for (ti in Lt.arrayItems(valueRows)) {
                        if (Lt.valueEquals(itemFirst, Lt.boolean(false))) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        itemFirst = Lt.boolean(false)
                        if (Lt.truthy(Lt.has(ti, Lt.string("chain")))) {
                          tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(ti, "chain"), "values")))
                          if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                            __fns.getValue("emitIdent")(listOf(tmpRef))
                          }
                          else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("delete")))))) {
                            savedSql = sql
                            savedW = wsql
                            savedOrderSql = orderSql
                            savedOrderW = orderW
                            savedHasOrder = hasOrder
                            savedAlias = subAlias
                            sql = Lt.bufNew()
                            wsql = Lt.bufNew()
                            orderSql = Lt.string("")
                            orderW = Lt.string("")
                            hasOrder = Lt.boolean(false)
                            subAlias = Lt.string("")
                            __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)))
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                            __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                            if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                              __fns.getValue("pushSql")(listOf(subAliasText))
                              __fns.getValue("pushW")(listOf(subAliasText))
                            }
                          }
                          else {
                            __fns.getValue("emitParam")(listOf(ti))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(ti))
                        }
                      }
                      __fns.getValue("pushSql")(listOf(Lt.string(")")))
                      __fns.getValue("pushW")(listOf(Lt.string(")")))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("onconflictdonothing"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      throw RuntimeException(Lt.asString(Lt.string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")))
                    }
                    else {
                      __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                      __fns.getValue("pushW")(listOf(Lt.string("ON")))
                      __fns.getValue("pushSql")(listOf(Lt.string("CONFLICT")))
                      __fns.getValue("pushW")(listOf(Lt.string("CONFLICT")))
                      __fns.getValue("pushSql")(listOf(__fns.getValue("conflictTarget")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns.getValue("pushW")(listOf(__fns.getValue("conflictTarget")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns.getValue("pushSql")(listOf(Lt.string("DO")))
                      __fns.getValue("pushW")(listOf(Lt.string("DO")))
                      __fns.getValue("pushSql")(listOf(Lt.string("NOTHING")))
                      __fns.getValue("pushW")(listOf(Lt.string("NOTHING")))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("onconflictdoupdate"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                      __fns.getValue("pushW")(listOf(Lt.string("ON")))
                      __fns.getValue("pushSql")(listOf(Lt.string("DUPLICATE")))
                      __fns.getValue("pushW")(listOf(Lt.string("DUPLICATE")))
                      __fns.getValue("pushSql")(listOf(Lt.string("KEY")))
                      __fns.getValue("pushW")(listOf(Lt.string("KEY")))
                      __fns.getValue("pushSql")(listOf(Lt.string("UPDATE")))
                      __fns.getValue("pushW")(listOf(Lt.string("UPDATE")))
                      var assnFirst: Any? = Lt.boolean(true)
                      for (ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                        if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        assnFirst = Lt.boolean(false)
                        __fns.getValue("pushSql")(listOf(__fns.getValue("identStr")(listOf(ak))))
                        __fns.getValue("pushW")(listOf(__fns.getValue("identStr")(listOf(ak))))
                        __fns.getValue("pushSql")(listOf(Lt.string("=")))
                        __fns.getValue("pushW")(listOf(Lt.string("=")))
                        if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                          tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                          if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                            __fns.getValue("emitIdent")(listOf(tmpRef))
                          }
                          else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
                            savedSql = sql
                            savedW = wsql
                            savedOrderSql = orderSql
                            savedOrderW = orderW
                            savedHasOrder = hasOrder
                            savedAlias = subAlias
                            sql = Lt.bufNew()
                            wsql = Lt.bufNew()
                            orderSql = Lt.string("")
                            orderW = Lt.string("")
                            hasOrder = Lt.boolean(false)
                            subAlias = Lt.string("")
                            __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                            __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                            if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                              __fns.getValue("pushSql")(listOf(subAliasText))
                              __fns.getValue("pushW")(listOf(subAliasText))
                            }
                          }
                          else {
                            __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                        }
                      }
                    }
                    else {
                      __fns.getValue("pushSql")(listOf(Lt.string("ON")))
                      __fns.getValue("pushW")(listOf(Lt.string("ON")))
                      __fns.getValue("pushSql")(listOf(Lt.string("CONFLICT")))
                      __fns.getValue("pushW")(listOf(Lt.string("CONFLICT")))
                      __fns.getValue("pushSql")(listOf(__fns.getValue("conflictTarget")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns.getValue("pushW")(listOf(__fns.getValue("conflictTarget")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns.getValue("pushSql")(listOf(Lt.string("DO")))
                      __fns.getValue("pushW")(listOf(Lt.string("DO")))
                      __fns.getValue("pushSql")(listOf(Lt.string("UPDATE")))
                      __fns.getValue("pushW")(listOf(Lt.string("UPDATE")))
                      __fns.getValue("pushSql")(listOf(Lt.string("SET")))
                      __fns.getValue("pushW")(listOf(Lt.string("SET")))
                      var assnFirst: Any? = Lt.boolean(true)
                      for (ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                        if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        assnFirst = Lt.boolean(false)
                        __fns.getValue("pushSql")(listOf(__fns.getValue("identStr")(listOf(ak))))
                        __fns.getValue("pushW")(listOf(__fns.getValue("identStr")(listOf(ak))))
                        __fns.getValue("pushSql")(listOf(Lt.string("=")))
                        __fns.getValue("pushW")(listOf(Lt.string("=")))
                        if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                          tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                          if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                            __fns.getValue("emitIdent")(listOf(tmpRef))
                          }
                          else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
                            savedSql = sql
                            savedW = wsql
                            savedOrderSql = orderSql
                            savedOrderW = orderW
                            savedHasOrder = hasOrder
                            savedAlias = subAlias
                            sql = Lt.bufNew()
                            wsql = Lt.bufNew()
                            orderSql = Lt.string("")
                            orderW = Lt.string("")
                            hasOrder = Lt.boolean(false)
                            subAlias = Lt.string("")
                            __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                            __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                            if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                              __fns.getValue("pushSql")(listOf(subAliasText))
                              __fns.getValue("pushW")(listOf(subAliasText))
                            }
                          }
                          else {
                            __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                        }
                      }
                    }
                  }
                  else {
                    throw RuntimeException(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported clause "), name)))
                  }
                }
              }
            }
            __fns.getValue("flushOrder")(listOf())
            return Lt.nullValue()
          }
          else {
            first = Lt.boolean(true)
            left = Lt.string("")
            hasLeft = Lt.boolean(false)
            base = Lt.string("")
            for (node in Lt.arrayItems(nodes)) {
              var pn: Any? = __fns.getValue("normName")(listOf(Lt.get(Lt.get(node, "functionCall"), "name")))
              var op: Any? = __fns.getValue("opOf")(listOf(pn))
              if (Lt.truthy(Lt.has(node, Lt.string("functionCall")))) {
                if (Lt.valueEquals(pn, Lt.string("col")) || Lt.valueEquals(pn, Lt.string("table"))) {
                  left = __fns.getValue("identStr")(listOf(__fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  hasLeft = Lt.boolean(true)
                }
                else if (Lt.truthy(op)) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns.getValue("pushSql")(listOf(base))
                  __fns.getValue("pushW")(listOf(base))
                  __fns.getValue("pushSql")(listOf(op))
                  __fns.getValue("pushW")(listOf(op))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns.getValue("emitIdent")(listOf(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = Lt.bufNew()
                      wsql = Lt.bufNew()
                      orderSql = Lt.string("")
                      orderW = Lt.string("")
                      hasOrder = Lt.boolean(false)
                      subAlias = Lt.string("")
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns.getValue("pushSql")(listOf(subAliasText))
                        __fns.getValue("pushW")(listOf(subAliasText))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("exists"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  __fns.getValue("pushSql")(listOf(Lt.string("EXISTS")))
                  __fns.getValue("pushW")(listOf(Lt.string("EXISTS")))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns.getValue("emitIdent")(listOf(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = Lt.bufNew()
                      wsql = Lt.bufNew()
                      orderSql = Lt.string("")
                      orderW = Lt.string("")
                      hasOrder = Lt.boolean(false)
                      subAlias = Lt.string("")
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns.getValue("pushSql")(listOf(subAliasText))
                        __fns.getValue("pushW")(listOf(subAliasText))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("in"))) {
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                      if (Lt.valueEquals(first, Lt.boolean(false))) {
                        __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                        __fns.getValue("pushW")(listOf(Lt.string("AND")))
                      }
                      first = Lt.boolean(false)
                      if (Lt.truthy(hasLeft)) {
                        base = left
                      }
                      else {
                        base = Lt.string("?")
                      }
                      __fns.getValue("pushSql")(listOf(base))
                      __fns.getValue("pushW")(listOf(base))
                      __fns.getValue("pushSql")(listOf(Lt.string("IN")))
                      __fns.getValue("pushW")(listOf(Lt.string("IN")))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = Lt.bufNew()
                      wsql = Lt.bufNew()
                      orderSql = Lt.string("")
                      orderW = Lt.string("")
                      hasOrder = Lt.boolean(false)
                      subAlias = Lt.string("")
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns.getValue("pushSql")(listOf(subAliasText))
                        __fns.getValue("pushW")(listOf(subAliasText))
                      }
                    }
                    else {
                      if (Lt.valueEquals(first, Lt.boolean(false))) {
                        __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                        __fns.getValue("pushW")(listOf(Lt.string("AND")))
                      }
                      first = Lt.boolean(false)
                      if (Lt.truthy(hasLeft)) {
                        base = left
                      }
                      else {
                        base = Lt.string("?")
                      }
                      __fns.getValue("pushSql")(listOf(base))
                      __fns.getValue("pushW")(listOf(base))
                      __fns.getValue("pushSql")(listOf(Lt.string("IN (")))
                      __fns.getValue("pushW")(listOf(Lt.string("IN (")))
                      var inFirst: Any? = Lt.boolean(true)
                      for (iv in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                        if (Lt.valueEquals(inFirst, Lt.boolean(false))) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        inFirst = Lt.boolean(false)
                        if (Lt.truthy(Lt.has(iv, Lt.string("chain")))) {
                          tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(iv, "chain"), "values")))
                          if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                            __fns.getValue("emitIdent")(listOf(tmpRef))
                          }
                          else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("delete")))))) {
                            savedSql = sql
                            savedW = wsql
                            savedOrderSql = orderSql
                            savedOrderW = orderW
                            savedHasOrder = hasOrder
                            savedAlias = subAlias
                            sql = Lt.bufNew()
                            wsql = Lt.bufNew()
                            orderSql = Lt.string("")
                            orderW = Lt.string("")
                            hasOrder = Lt.boolean(false)
                            subAlias = Lt.string("")
                            __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)))
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                            __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                            if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                              __fns.getValue("pushSql")(listOf(subAliasText))
                              __fns.getValue("pushW")(listOf(subAliasText))
                            }
                          }
                          else {
                            __fns.getValue("emitParam")(listOf(iv))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(iv))
                        }
                      }
                      __fns.getValue("pushSql")(listOf(Lt.string(")")))
                      __fns.getValue("pushW")(listOf(Lt.string(")")))
                    }
                  }
                  else {
                    if (Lt.valueEquals(first, Lt.boolean(false))) {
                      __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                      __fns.getValue("pushW")(listOf(Lt.string("AND")))
                    }
                    first = Lt.boolean(false)
                    if (Lt.truthy(hasLeft)) {
                      base = left
                    }
                    else {
                      base = Lt.string("?")
                    }
                    __fns.getValue("pushSql")(listOf(base))
                    __fns.getValue("pushW")(listOf(base))
                    __fns.getValue("pushSql")(listOf(Lt.string("IN (")))
                    __fns.getValue("pushW")(listOf(Lt.string("IN (")))
                    var inFirst: Any? = Lt.boolean(true)
                    for (iv in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                      if (Lt.valueEquals(inFirst, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      inFirst = Lt.boolean(false)
                      if (Lt.truthy(Lt.has(iv, Lt.string("chain")))) {
                        tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(iv, "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns.getValue("emitIdent")(listOf(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("delete")))))) {
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = Lt.bufNew()
                          wsql = Lt.bufNew()
                          orderSql = Lt.string("")
                          orderW = Lt.string("")
                          hasOrder = Lt.boolean(false)
                          subAlias = Lt.string("")
                          __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns.getValue("pushSql")(listOf(subAliasText))
                            __fns.getValue("pushW")(listOf(subAliasText))
                          }
                        }
                        else {
                          __fns.getValue("emitParam")(listOf(iv))
                        }
                      }
                      else {
                        __fns.getValue("emitParam")(listOf(iv))
                      }
                    }
                    __fns.getValue("pushSql")(listOf(Lt.string(")")))
                    __fns.getValue("pushW")(listOf(Lt.string(")")))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("between"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns.getValue("pushSql")(listOf(base))
                  __fns.getValue("pushW")(listOf(base))
                  __fns.getValue("pushSql")(listOf(Lt.string("BETWEEN")))
                  __fns.getValue("pushW")(listOf(Lt.string("BETWEEN")))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns.getValue("emitIdent")(listOf(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = Lt.bufNew()
                      wsql = Lt.bufNew()
                      orderSql = Lt.string("")
                      orderW = Lt.string("")
                      hasOrder = Lt.boolean(false)
                      subAlias = Lt.string("")
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns.getValue("pushSql")(listOf(subAliasText))
                        __fns.getValue("pushW")(listOf(subAliasText))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                  __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns.getValue("emitIdent")(listOf(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = Lt.bufNew()
                      wsql = Lt.bufNew()
                      orderSql = Lt.string("")
                      orderW = Lt.string("")
                      hasOrder = Lt.boolean(false)
                      subAlias = Lt.string("")
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns.getValue("pushSql")(listOf(subAliasText))
                        __fns.getValue("pushW")(listOf(subAliasText))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("isnull"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns.getValue("pushSql")(listOf(base))
                  __fns.getValue("pushW")(listOf(base))
                  __fns.getValue("pushSql")(listOf(Lt.string("IS NULL")))
                  __fns.getValue("pushW")(listOf(Lt.string("IS NULL")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("isnotnull"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns.getValue("pushSql")(listOf(base))
                  __fns.getValue("pushW")(listOf(base))
                  __fns.getValue("pushSql")(listOf(Lt.string("IS NOT NULL")))
                  __fns.getValue("pushW")(listOf(Lt.string("IS NOT NULL")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("not"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  __fns.getValue("pushSql")(listOf(Lt.string("NOT (")))
                  __fns.getValue("pushW")(listOf(Lt.string("NOT (")))
                  __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  __fns.getValue("pushSql")(listOf(Lt.string(")")))
                  __fns.getValue("pushW")(listOf(Lt.string(")")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("and")) || Lt.valueEquals(pn, Lt.string("or"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  __fns.getValue("pushSql")(listOf(Lt.string("(")))
                  __fns.getValue("pushW")(listOf(Lt.string("(")))
                  var boolFirst: Any? = Lt.boolean(true)
                  for (bv in Lt.arrayItems(__fns.getValue("itemsOf")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                    if (Lt.valueEquals(boolFirst, Lt.boolean(false))) {
                      tmp = Lt.toUpper(pn)
                      __fns.getValue("pushSql")(listOf(tmp))
                      __fns.getValue("pushW")(listOf(tmp))
                    }
                    boolFirst = Lt.boolean(false)
                    if (Lt.truthy(Lt.has(bv, Lt.string("chain")))) {
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(bv, "chain"), "values"), Lt.number(1)))
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(bv))
                    }
                  }
                  __fns.getValue("pushSql")(listOf(Lt.string(")")))
                  __fns.getValue("pushW")(listOf(Lt.string(")")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("as"))) {
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns.getValue("pushSql")(listOf(base))
                  __fns.getValue("pushW")(listOf(base))
                  __fns.getValue("pushSql")(listOf(Lt.string("AS")))
                  __fns.getValue("pushW")(listOf(Lt.string("AS")))
                  __fns.getValue("emitIdent")(listOf(__fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("op"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns.getValue("pushSql")(listOf(Lt.string("AND")))
                    __fns.getValue("pushW")(listOf(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns.getValue("pushSql")(listOf(base))
                  __fns.getValue("pushW")(listOf(base))
                  __fns.getValue("pushSql")(listOf(__fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  __fns.getValue("pushW")(listOf(__fns.getValue("asString")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns.getValue("isRef")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns.getValue("emitIdent")(listOf(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns.getValue("firstKind")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = Lt.bufNew()
                      wsql = Lt.bufNew()
                      orderSql = Lt.string("")
                      orderW = Lt.string("")
                      hasOrder = Lt.boolean(false)
                      subAlias = Lt.string("")
                      __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns.getValue("pushSql")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns.getValue("pushW")(listOf(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns.getValue("pushSql")(listOf(subAliasText))
                        __fns.getValue("pushW")(listOf(subAliasText))
                      }
                    }
                    else {
                      __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns.getValue("emitParam")(listOf(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("raw"))) {
                  __fns.getValue("emitRaw")(listOf(node))
                }
                else {
                  throw RuntimeException(Lt.asString(Lt.string("sql-builder parse: unsupported predicate")))
                }
              }
            }
            return Lt.nullValue()
          }
          return Lt.nullValue()
        }
        __fns.getValue("renderNodes")(listOf(Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values"), Lt.number(0)))
        sql = Lt.bufStr(sql)
        wsql = Lt.bufStr(wsql)
        params = Lt.listValue(params)
        return Lt.map(listOf("sql" to Lt.trim(sql), "sqlWithParam" to Lt.trim(wsql), "param" to Lt.params(params)))
    }

}

object Init {
    fun sqlBuilder(variableName: String?, vararg copies: Any?): SqlBuilder {
        val structure = SqlBuilder()
        structure.initFromInitFunction(Lt.map(listOf(
            "name" to "sql-builder",
            "variableName" to (if (variableName != null) variableName else Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(structure.getSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName")),
        )), Lt.array(copies.toList()))
        return structure
    }

    fun sqlBuilder(): SqlBuilder = sqlBuilder(null)
}