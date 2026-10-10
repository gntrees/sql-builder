// Auto-generated index for gntrees-sql-builder

// parse() returns an LtMap: { "sql": String, "sqlWithParam": String, "param": [Any?] }

// Auto-generated Swift method-chain types.
//
// Swift has a universal top type (`Any?`), so LT values are native Swift values
// (String / Int / Double / Bool / nil / [Any?] / the ordered `LtMap`), and there
// is no `Value` enum. The one shared abstraction is `Structure`: every generated
// builder class conforms to it, which lets the generic runtime (`copy` /
// `make_copy`) call `getSchema()`.

protocol Structure {
    func getSchema() -> LtMap
}


enum Mc {
    // Auto-generated Swift method-chain runtime (Lingua Tungga Gelombang 2).
    //
    // The static counterpart of `core/base/python/base-utils.py`. Schemas are the
    // ordered `LtMap`; the generator inlines this fragment inside an `enum Mc` in
    // the generated `index.swift`.
    //
    // Swift has no exceptions, so the public API is non-throwing and invalid input
    // hits `fatalError` (matching the Swift emitter's `throwError`). Union
    // resolution is the one place that must "try each type and collect failures",
    // so it uses an internal `throws` helper; `normalize_argument` wraps it.

    static func _typeof(_ value: Any?) -> String {
        guard let value = value else { return "object" }
        if value is Bool { return "boolean" }
        if value is Int || value is Double { return "number" }
        if value is String { return "string" }
        if value is [Any?] || value is LtMap { return "object" }
        return String(describing: type(of: value))
    }

    static func validate_schema(_ schema: Any?) {
        let message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
        guard let schemaMap = schema as? LtMap else { fatalError(message) }
        guard let inner = Lt.get(schemaMap, "schema") as? LtMap else { fatalError(message) }
        guard let chain = Lt.get(inner, "chain") as? LtMap else { fatalError(message) }
        guard let chainChain = Lt.get(chain, "chain") as? LtMap else { fatalError(message) }
        if (Lt.get(chainChain, "values") as? [Any?]) == nil || !Lt.truthy(Lt.get(chainChain, "initFunction")) {
            fatalError(message)
        }
    }

    static func unwrap_argument_value(_ value: Any?) -> Any? {
        guard let valueMap = value as? LtMap else { fatalError("Unknown argument value type") }
        if Lt.has(valueMap, "string") { return Lt.get(Lt.get(valueMap, "string"), "value") }
        if Lt.has(valueMap, "number") { return Lt.get(Lt.get(valueMap, "number"), "value") }
        if Lt.has(valueMap, "boolean") { return Lt.get(Lt.get(valueMap, "boolean"), "value") }
        if Lt.has(valueMap, "null") { return Lt.get(Lt.get(valueMap, "null"), "value") }
        if Lt.has(valueMap, "array") {
            var out: [Any?] = []
            for item in Lt.items(Lt.get(Lt.get(valueMap, "array"), "value")) {
                out.append(unwrap_argument_value(item))
            }
            return out
        }
        if Lt.has(valueMap, "object") {
            let out = LtMap([])
            for (key, item) in Lt.asMap(Lt.get(Lt.get(valueMap, "object"), "value")).entries {
                out.set(key, unwrap_argument_value(item))
            }
            return out
        }
        if Lt.has(valueMap, "chain") { fatalError("Cannot validate a chain default value at runtime") }
        fatalError("Unknown argument value type")
    }

    static func validate_default(_ defaultVal: Any?, _ structType: Any?) {
        _ = normalize_argument(unwrap_argument_value(defaultVal), structType)
    }

    static func normalize_argument(_ arg: Any?, _ structType: Any?) -> Any? {
        do {
            return try normalize_argument_throwing(arg, structType)
        } catch let error as LtError {
            switch error {
            case .message(let text): fatalError(text)
            }
        } catch {
            fatalError("\(error)")
        }
    }

    static func normalize_argument_throwing(_ arg: Any?, _ structType: Any?) throws -> Any? {
        guard let structMap = structType as? LtMap else { throw LtError.message("Unsupported struct type in normalizeArgument") }

        if Lt.has(structMap, "array") {
            guard let argArr = arg as? [Any?] else { throw LtError.message("Expected an array argument, but got " + _typeof(arg)) }
            if Lt.items(argArr).isEmpty { return Lt.map([("array", Lt.map([("value", Lt.array([]))]))]) }
            let itemType = Lt.get(Lt.get(structMap, "array"), "type")
            var normalizedItems: [Any?] = []
            for item in Lt.items(argArr) { normalizedItems.append(try normalize_argument_throwing(item, itemType)) }
            if normalizedItems[0] == nil { throw LtError.message("Unexpected undefined value in array") }
            return Lt.map([("array", Lt.map([("value", normalizedItems)]))])
        }

        if Lt.has(structMap, "object") {
            guard let argMap = arg as? LtMap else { throw LtError.message("Expected an object argument, but got " + _typeof(arg)) }
            let declared = Lt.get(structMap, "object")
            var missingKeys: [String] = []
            for key in Lt.items(Lt.keys(declared)) {
                if !Lt.has(argMap, key) { missingKeys.append(Lt.asString(key)) }
            }
            if !missingKeys.isEmpty {
                throw LtError.message("Missing required key(s) \"" + missingKeys.joined(separator: "\", \"") + "\" in object argument")
            }
            let normalizedObject = LtMap([])
            for (key, item) in argMap.entries {
                if !Lt.has(declared, key) { throw LtError.message("Unexpected key \"" + key + "\" in object argument") }
                normalizedObject.set(key, try normalize_argument_throwing(item, Lt.get(declared, key)))
            }
            return Lt.map([("object", Lt.map([("value", normalizedObject)]))])
        }

        if Lt.has(structMap, "string") {
            guard let argStr = arg as? String else { throw LtError.message("Expected a string argument, but got " + _typeof(arg)) }
            return Lt.map([("string", Lt.map([("value", argStr)]))])
        }

        if Lt.has(structMap, "number") {
            if arg is Bool || !(arg is Int || arg is Double) {
                throw LtError.message("Expected a number argument, but got " + _typeof(arg))
            }
            let number: Double
            if let i = arg as? Int { number = Double(i) } else { number = (arg as? Double) ?? 0 }
            if !number.isFinite { throw LtError.message("Expected a finite number argument, but got " + Lt.asString(number)) }
            return Lt.map([("number", Lt.map([("value", number)]))])
        }

        if Lt.has(structMap, "boolean") {
            guard let argBool = arg as? Bool else { throw LtError.message("Expected a boolean argument, but got " + _typeof(arg)) }
            return Lt.map([("boolean", Lt.map([("value", argBool)]))])
        }

        if Lt.has(structMap, "null") {
            if arg != nil { throw LtError.message("Expected a null argument, but got " + _typeof(arg)) }
            return Lt.map([("null", Lt.map([("value", Lt.nullValue())]))])
        }

        if Lt.has(structMap, "union") {
            var reasons: [String] = []
            var normalizedUnionTypes: [Any?] = []
            for unionType in Lt.items(Lt.get(Lt.get(structMap, "union"), "types")) {
                do {
                    normalizedUnionTypes.append(try normalize_argument_throwing(arg, unionType))
                } catch let error as LtError {
                    switch error { case .message(let text): reasons.append(text) }
                } catch {
                    reasons.append("\(error)")
                }
            }
            if normalizedUnionTypes.isEmpty || normalizedUnionTypes[0] == nil {
                throw LtError.message("Argument does not match any type in the union: " + reasons.joined(separator: " | "))
            }
            if normalizedUnionTypes.count > 1 {
                if let argArr = arg as? [Any?], argArr.isEmpty { return normalizedUnionTypes[0] }
                throw LtError.message("Argument matches multiple types in the union, which is ambiguous")
            }
            return normalizedUnionTypes[0]
        }

        if Lt.has(structMap, "map") {
            guard let argMap = arg as? LtMap else { throw LtError.message("Expected an object argument for map type, but got " + _typeof(arg)) }
            let normalizedMap = LtMap([])
            let valueType = Lt.get(Lt.get(structMap, "map"), "type")
            for (key, item) in argMap.entries {
                normalizedMap.set(key, try normalize_argument_throwing(item, valueType))
            }
            return Lt.map([("object", Lt.map([("value", normalizedMap)]))])
        }

        if Lt.has(structMap, "structureCall") {
            return try normalize_argument_structure_call(arg)
        }

        if Lt.has(structMap, "literal") {
            let expected = Lt.get(Lt.get(structMap, "literal"), "value")
            let literalType = Lt.get(Lt.get(structMap, "literal"), "type")
            if Lt.asString(literalType) == "string" {
                guard let argStr = arg as? String else { throw LtError.message("Expected a string literal argument, but got " + _typeof(arg)) }
                if argStr != Lt.asString(expected) { throw LtError.message("Expected string literal " + Lt.json(expected) + ", but got " + Lt.json(arg)) }
                return Lt.map([("string", Lt.map([("value", argStr)]))])
            }
            if Lt.asString(literalType) == "number" {
                if arg is Bool || !(arg is Int || arg is Double) {
                    throw LtError.message("Expected a number literal argument, but got " + _typeof(arg))
                }
                if !Lt.valueEquals(arg, expected) { throw LtError.message("Expected number literal " + Lt.asString(expected) + ", but got " + Lt.asString(arg)) }
                return Lt.map([("number", Lt.map([("value", arg)]))])
            }
            guard let argBool = arg as? Bool else { throw LtError.message("Expected a boolean literal argument, but got " + _typeof(arg)) }
            if !Lt.valueEquals(argBool, expected) { throw LtError.message("Expected boolean literal " + Lt.asString(expected) + ", but got " + Lt.asString(arg)) }
            return Lt.map([("boolean", Lt.map([("value", argBool)]))])
        }

        throw LtError.message("Unsupported struct type in normalizeArgument")
    }

    static func create_schema(_ oldSchema: LtMap, _ functionName: String, _ functionArgs: [Any?], _ isTemplateLiteral: Bool) -> LtMap {
        validate_schema(oldSchema)
        let old = Lt.asMap(Lt.get(oldSchema, "schema"))
        let oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"))

        var args: [Any?] = []
        if isTemplateLiteral && !functionArgs.isEmpty && functionArgs[0] != nil {
            guard let stringsArr = Lt.get(functionArgs[0], "arg") as? [Any?] else { fatalError("Expected a template strings array for " + functionName) }
            for text in Lt.items(stringsArr) {
                if !(text is String) { fatalError("Expected a template strings array for " + functionName) }
            }
            let expressions = Array(functionArgs[1...])
            if expressions.count != stringsArr.count - 1 {
                fatalError("Template literal for " + functionName + " expects " + String(stringsArr.count - 1) + " expression(s), but got " + String(expressions.count))
            }
            for index in 0..<stringsArr.count {
                let text = Lt.asString(stringsArr[index])
                if !text.isEmpty {
                    args.append(Lt.map([("argument", Lt.map([("string", Lt.map([("value", text)]))])), ("default", Lt.nullValue())]))
                }
                if index < expressions.count {
                    guard let expressionMap = expressions[index] as? LtMap else { fatalError("Missing expression for template literal at index " + String(index)) }
                    args.append(Lt.map([
                        ("argument", normalize_argument(Lt.get(expressionMap, "arg"), Lt.get(expressionMap, "struct"))),
                        ("default", Lt.nullValue()),
                    ]))
                }
            }
        } else {
            for index in 0..<functionArgs.count {
                let functionArg = functionArgs[index]
                let arg = Lt.get(functionArg, "arg")
                if Lt.isMissing(arg) {
                    if Lt.truthy(Lt.get(functionArg, "provided")) {
                        fatalError("Parameter \"" + functionName + "\" argument #" + String(index + 1) + " cannot be undefined")
                    }
                    let defaultVal = Lt.get(functionArg, "default")
                    if defaultVal != nil {
                        validate_default(defaultVal, Lt.get(functionArg, "struct"))
                        args.append(Lt.map([("argument", defaultVal), ("default", defaultVal)]))
                        continue
                    }
                    fatalError("Parameter \"" + functionName + "\" argument #" + String(index + 1) + " was not provided")
                }
                let argument = normalize_argument(arg, Lt.get(functionArg, "struct"))
                let defaultVal = Lt.get(functionArg, "default")
                if defaultVal != nil { validate_default(defaultVal, Lt.get(functionArg, "struct")) }
                args.append(Lt.map([("argument", argument), ("default", defaultVal)]))
            }
        }

        var values = Lt.items(Lt.get(oldChain, "values"))
        values.append(Lt.map([("functionCall", Lt.map([("name", functionName), ("arguments", args), ("isTemplateLiteral", isTemplateLiteral)]))]))

        let inner = LtMap([])
        for (key, value) in old.entries { inner.set(key, value) }
        inner.set("chain", Lt.map([("chain", Lt.map([("values", values), ("initFunction", Lt.get(oldChain, "initFunction"))]))]))
        return Lt.asMap(Lt.map([("schema", inner)]))
    }

    static func create_property_call_schema(_ oldSchema: LtMap, _ propertyName: String) -> LtMap {
        let old = Lt.asMap(Lt.get(oldSchema, "schema"))
        let oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"))
        var values = Lt.items(Lt.get(oldChain, "values"))
        values.append(Lt.map([("propertyCall", Lt.map([("name", propertyName)]))]))

        let inner = LtMap([])
        for (key, value) in old.entries { inner.set(key, value) }
        inner.set("chain", Lt.map([("chain", Lt.map([("values", values), ("initFunction", Lt.get(oldChain, "initFunction"))]))]))
        return Lt.asMap(Lt.map([("schema", inner)]))
    }

    static func make_copy(_ structureName: String, _ source: Structure) -> Any? {
        let schema = source.getSchema()
        validate_schema(schema)
        return Lt.map([("copy", Lt.map([("structureName", structureName), ("chain", Lt.get(Lt.get(schema, "schema"), "chain"))]))])
    }

    static func apply_copies(_ schema: LtMap, _ copies: Any?, _ targetStructureName: String) {
        if !Lt.truthy(copies) { return }
        for cp in Lt.items(copies) {
            guard let cpMap = cp as? LtMap,
                  Lt.has(cpMap, "copy"),
                  let copyMap = Lt.get(cpMap, "copy") as? LtMap,
                  Lt.get(copyMap, "structureName") is String,
                  Lt.get(copyMap, "chain") is LtMap
            else {
                fatalError("Invalid builder argument in init function: wrap the structure with copy(...)")
            }
            let name = Lt.asString(Lt.get(copyMap, "structureName"))
            if name != targetStructureName {
                fatalError("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'")
            }
            let value = Lt.map([("copy", Lt.map([("structureName", name), ("chain", Lt.get(copyMap, "chain"))]))])
            let chainChain = Lt.asMap(Lt.get(Lt.get(Lt.get(schema, "schema"), "chain"), "chain"))
            var values = Lt.items(Lt.get(chainChain, "values"))
            values.append(value)
            chainChain.set("values", values)
        }
    }


    static func normalize_argument_structure_call(_ arg: Any?) throws -> Any? {
        if arg is SqlBuilder {
            return Lt.get(Lt.get((arg as! Structure).getSchema(), "schema"), "chain")
        }
        if arg is LtMap { throw LtError.message("Unknown structure call argument type") }
        var got = "null"
        if arg is [Any?] { got = "array" }
        else if arg != nil { got = _typeof(arg) }
        throw LtError.message("Expected a structure instance for structure calls, but got " + got)
    }

    static func copy(_ source: Any?) -> Any? {
        if let s = source as? SqlBuilder { return make_copy("sql-builder", s) }
        fatalError("copy() expects a structure instance created by an init function")
    }
}

final class SqlBuilder: Structure {
    var schemaSqlBuilder: LtMap = Lt.map([("schema", Lt.map([("exportName", "schema"), ("importPaths", Lt.map([("typescript", "../../../gntrees-sql-builder/typescript/index")])), ("chain", Lt.map([("chain", Lt.map([("values", Lt.array([])), ("initFunction", Lt.map([("name", "sql-builder"), ("variableName", "s1")]))]))]))]))])

    func getSchema() -> LtMap { return schemaSqlBuilder }

    func getSchema(_ exportName: String?, _ importPaths: LtMap?) -> LtMap {
        let inner = Lt.asMap(Lt.get(schemaSqlBuilder, "schema"))
        if let name = exportName, !name.isEmpty { inner.set("exportName", name) }
        if let paths = importPaths {
            let merged = LtMap([])
            if let existing = inner.get("importPaths") as? LtMap {
                for (key, value) in existing.entries { merged.set(key, value) }
            }
            for (key, value) in paths.entries { merged.set(key, value) }
            inner.set("importPaths", merged)
        }
        return schemaSqlBuilder
    }

    func initFromStructure(_ schema: LtMap) -> SqlBuilder {
        Mc.validate_schema(schema)
        schemaSqlBuilder = schema
        return self
    }

    func initFromInitFunction(_ initFunction: LtMap) -> SqlBuilder {
        return initFromInitFunction(initFunction, nil)
    }

    func initFromInitFunction(_ initFunction: LtMap, _ copies: Any?) -> SqlBuilder {
        if !(Lt.get(initFunction, "name") is String) || !(Lt.get(initFunction, "variableName") is String) {
            fatalError("Invalid init function")
        }
        Lt.asMap(Lt.get(Lt.get(Lt.get(schemaSqlBuilder, "schema"), "chain"), "chain")).set("initFunction", initFunction)
        Mc.apply_copies(schemaSqlBuilder, copies, "sql-builder")
        return self
    }

    func select(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let columns: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(columns) { fatalError("Parameter \"select\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "select", Lt.array([
            Lt.map([("arg", columns), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))]), Lt.map([("map", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(columns))])
        ]), false))
    }

    func from(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"from\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "from", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))])
        ]), false))
    }

    func transaction(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let transaction: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(transaction) { fatalError("Parameter \"transaction\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "transaction", Lt.array([
            Lt.map([("arg", transaction), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(transaction))])
        ]), false))
    }

    func orderBy(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let columns: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(columns) { fatalError("Parameter \"orderBy\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "orderBy", Lt.array([
            Lt.map([("arg", columns), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(columns))])
        ]), false))
    }

    func limit(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let count: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(count) { fatalError("Parameter \"limit\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "limit", Lt.array([
            Lt.map([("arg", count), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(count))])
        ]), false))
    }

    func offset(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let count: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(count) { fatalError("Parameter \"offset\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "offset", Lt.array([
            Lt.map([("arg", count), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(count))])
        ]), false))
    }

    func with(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let statement: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let as_: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(statement) { fatalError("Parameter \"with\" argument #1 was not provided") }
        if Lt.isMissing(as_) { fatalError("Parameter \"with\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "with", Lt.array([
            Lt.map([("arg", statement), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(statement))]),
            Lt.map([("arg", as_), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(as_))])
        ]), false))
    }

    func groupBy(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let columns: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(columns) { fatalError("Parameter \"groupBy\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "groupBy", Lt.array([
            Lt.map([("arg", columns), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(columns))])
        ]), false))
    }

    func having(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let statement: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(statement) { fatalError("Parameter \"having\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "having", Lt.array([
            Lt.map([("arg", statement), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(statement))])
        ]), false))
    }

    func where_(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let statement: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(statement) { fatalError("Parameter \"where\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "where", Lt.array([
            Lt.map([("arg", statement), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(statement))])
        ]), false))
    }

    func update(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let set: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"update\" argument #1 was not provided") }
        if Lt.isMissing(set) { fatalError("Parameter \"update\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "update", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", set), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("map", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(set))])
        ]), false))
    }

    func set(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let statement: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(statement) { fatalError("Parameter \"set\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "set", Lt.array([
            Lt.map([("arg", statement), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("map", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(statement))])
        ]), false))
    }

    func insert(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let set: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"insert\" argument #1 was not provided") }
        if Lt.isMissing(set) { fatalError("Parameter \"insert\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "insert", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", set), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("map", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(set))])
        ]), false))
    }

    func values(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let values: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(values) { fatalError("Parameter \"values\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "values", Lt.array([
            Lt.map([("arg", values), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(values))])
        ]), false))
    }

    func returning(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let columns: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(columns) { fatalError("Parameter \"returning\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "returning", Lt.array([
            Lt.map([("arg", columns), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))]), Lt.map([("map", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(columns))])
        ]), false))
    }

    func onConflictDoNothing(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let target: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(target) { fatalError("Parameter \"onConflictDoNothing\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoNothing", Lt.array([
            Lt.map([("arg", target), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(target))])
        ]), false))
    }

    func onConflictDoUpdate(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let target: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let set: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(target) { fatalError("Parameter \"onConflictDoUpdate\" argument #1 was not provided") }
        if Lt.isMissing(set) { fatalError("Parameter \"onConflictDoUpdate\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoUpdate", Lt.array([
            Lt.map([("arg", target), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(target))]),
            Lt.map([("arg", set), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("map", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(set))])
        ]), false))
    }

    func delete(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"delete\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "delete", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))])
        ]), false))
    }

    func join(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let on: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"join\" argument #1 was not provided") }
        if Lt.isMissing(on) { fatalError("Parameter \"join\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "join", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", on), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(on))])
        ]), false))
    }

    func leftJoin(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let on: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"leftJoin\" argument #1 was not provided") }
        if Lt.isMissing(on) { fatalError("Parameter \"leftJoin\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "leftJoin", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", on), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(on))])
        ]), false))
    }

    func rightJoin(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let on: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"rightJoin\" argument #1 was not provided") }
        if Lt.isMissing(on) { fatalError("Parameter \"rightJoin\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "rightJoin", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", on), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(on))])
        ]), false))
    }

    func innerJoin(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let on: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"innerJoin\" argument #1 was not provided") }
        if Lt.isMissing(on) { fatalError("Parameter \"innerJoin\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "innerJoin", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", on), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(on))])
        ]), false))
    }

    func fullJoin(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let on: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"fullJoin\" argument #1 was not provided") }
        if Lt.isMissing(on) { fatalError("Parameter \"fullJoin\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "fullJoin", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", on), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(on))])
        ]), false))
    }

    func crossJoin(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let on: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"crossJoin\" argument #1 was not provided") }
        if Lt.isMissing(on) { fatalError("Parameter \"crossJoin\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "crossJoin", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))]),
            Lt.map([("arg", on), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(on))])
        ]), false))
    }

    func eq(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"eq\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "eq", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func gt(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"gt\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gt", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func gte(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"gte\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gte", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func lt(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"lt\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lt", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func lte(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"lte\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lte", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func exists(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"exists\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "exists", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func isNull() -> SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNull", Lt.array([
        ]), false))
    }

    func isNotNull() -> SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNotNull", Lt.array([
        ]), false))
    }

    func in_(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"in\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "in", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func between(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let first: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let second: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(first) { fatalError("Parameter \"between\" argument #1 was not provided") }
        if Lt.isMissing(second) { fatalError("Parameter \"between\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "between", Lt.array([
            Lt.map([("arg", first), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(first))]),
            Lt.map([("arg", second), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(second))])
        ]), false))
    }

    func like(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"like\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "like", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func ilike(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"ilike\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "ilike", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func not(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let value: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(value) { fatalError("Parameter \"not\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "not", Lt.array([
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func and(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let values: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(values) { fatalError("Parameter \"and\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "and", Lt.array([
            Lt.map([("arg", values), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(values))])
        ]), false))
    }

    func or(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let values: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(values) { fatalError("Parameter \"or\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "or", Lt.array([
            Lt.map([("arg", values), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]), Lt.map([("array", Lt.map([("type", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))])]))]))])), ("provided", !Lt.isMissing(values))])
        ]), false))
    }

    func op(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let operation: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        let value: Any? = __a.count > 1 ? __a[1] : Lt.MISSING
        if Lt.isMissing(operation) { fatalError("Parameter \"op\" argument #1 was not provided") }
        if Lt.isMissing(value) { fatalError("Parameter \"op\" argument #2 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "op", Lt.array([
            Lt.map([("arg", operation), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(operation))]),
            Lt.map([("arg", value), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(value))])
        ]), false))
    }

    func raw(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        var __fargs: [Any?] = []
        __fargs.append(Lt.map([("arg", __a.count > 0 ? __a[0] : Lt.MISSING), ("struct", Lt.map([("string", Lt.map([("type", "string")]))]))]))
        for __i in stride(from: 1, to: __a.count, by: 1) {
            __fargs.append(Lt.map([("arg", __a[__i]), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))]))]))
        }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "raw", __fargs, true))
    }

    func asc() -> SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "asc", Lt.array([
        ]), false))
    }

    func desc() -> SqlBuilder {
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "desc", Lt.array([
        ]), false))
    }

    func as_(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let alias: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(alias) { fatalError("Parameter \"as\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "as", Lt.array([
            Lt.map([("arg", alias), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(alias))])
        ]), false))
    }

    func col(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let column: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(column) { fatalError("Parameter \"col\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "col", Lt.array([
            Lt.map([("arg", column), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(column))])
        ]), false))
    }

    func table(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let table: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(table) { fatalError("Parameter \"table\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "table", Lt.array([
            Lt.map([("arg", table), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("string", Lt.map([("type", "string")]))]), Lt.map([("number", Lt.map([("type", "number")]))]), Lt.map([("boolean", Lt.map([("type", "boolean")]))]), Lt.map([("structureCall", Lt.map([("name", "sql-builder")]))])]))]))])), ("provided", !Lt.isMissing(table))])
        ]), false))
    }

    func setDialect(_ __a0: Any? = Lt.MISSING, _ __aRest: Any?...) -> SqlBuilder {
        let __a: [Any?] = [__a0] + __aRest
        let db: Any? = __a.count > 0 ? __a[0] : Lt.MISSING
        if Lt.isMissing(db) { fatalError("Parameter \"setDialect\" argument #1 was not provided") }
        return SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "setDialect", Lt.array([
            Lt.map([("arg", db), ("struct", Lt.map([("union", Lt.map([("types", Lt.array([Lt.map([("literal", Lt.map([("value", "postgres"), ("type", "string")]))]), Lt.map([("literal", Lt.map([("value", "mysql"), ("type", "string")]))]), Lt.map([("literal", Lt.map([("value", "sqlite"), ("type", "string")]))]), Lt.map([("literal", Lt.map([("value", "single-store"), ("type", "string")]))]), Lt.map([("literal", Lt.map([("value", "mssql"), ("type", "string")]))]), Lt.map([("literal", Lt.map([("value", "cockroach"), ("type", "string")]))])]))]))])), ("provided", !Lt.isMissing(db))])
        ]), false))
    }

    func parse() -> LtMap {
        let root: Any? = self.getSchema()
        var __fns: [String: ([Any?]) -> Any?] = [:]
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
        __fns["normName"] = { (__a: [Any?]) -> Any? in
          let n: Any? = __a[0]
          return Lt.toLower(Lt.replace(n, Lt.string("-"), Lt.string("")))
          return Lt.nullValue()
        }
        __fns["pushSql"] = { (__a: [Any?]) -> Any? in
          let text: Any? = __a[0]
          sql = Lt.bufAppend(sql, Lt.string(" "))
          sql = Lt.bufAppend(sql, text)
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["pushW"] = { (__a: [Any?]) -> Any? in
          let text: Any? = __a[0]
          wsql = Lt.bufAppend(wsql, Lt.string(" "))
          wsql = Lt.bufAppend(wsql, text)
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["asString"] = { (__a: [Any?]) -> Any? in
          let arg: Any? = __a[0]
          return Lt.get(Lt.get(arg, Lt.string("string")), Lt.string("value"))
          return Lt.nullValue()
        }
        __fns["identStr"] = { (__a: [Any?]) -> Any? in
          let name: Any? = __a[0]
          var escapedName: Any? = Lt.replace(name, quote, Lt.strConcat(quote, quote))
          var qualifiedName: Any? = Lt.replace(escapedName, Lt.string("."), Lt.strConcat(quote, Lt.strConcat(Lt.string("."), quote)))
          return Lt.strConcat(quote, Lt.strConcat(qualifiedName, quote))
          return Lt.nullValue()
        }
        __fns["literalOf"] = { (__a: [Any?]) -> Any? in
          let arg: Any? = __a[0]
          var outLiteral: Any? = Lt.string("")
          if Lt.truthy(Lt.has(arg, Lt.string("string"))) {
            outLiteral = Lt.strConcat(Lt.string("'"), Lt.strConcat(Lt.replace(__fns["asString"]!([arg]), Lt.string("'"), Lt.string("''")), Lt.string("'")))
          }
          else if Lt.truthy(Lt.has(arg, Lt.string("number"))) {
            outLiteral = Lt.toString(Lt.get(Lt.get(arg, Lt.string("number")), Lt.string("value")))
          }
          else if Lt.truthy(Lt.has(arg, Lt.string("boolean"))) {
            if Lt.truthy(Lt.get(Lt.get(arg, Lt.string("boolean")), Lt.string("value"))) {
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
        __fns["opOf"] = { (__a: [Any?]) -> Any? in
          let n: Any? = __a[0]
          var o: Any? = Lt.string("")
          if Lt.valueEquals(n, Lt.string("eq")) {
            o = Lt.string("=")
          }
          else if Lt.valueEquals(n, Lt.string("gt")) {
            o = Lt.string(">")
          }
          else if Lt.valueEquals(n, Lt.string("gte")) {
            o = Lt.string(">=")
          }
          else if Lt.valueEquals(n, Lt.string("lt")) {
            o = Lt.string("<")
          }
          else if Lt.valueEquals(n, Lt.string("lte")) {
            o = Lt.string("<=")
          }
          else if Lt.valueEquals(n, Lt.string("like")) {
            o = Lt.string("LIKE")
          }
          else if Lt.valueEquals(n, Lt.string("ilike")) {
            if Lt.valueEquals(dialect, Lt.string("postgres")) {
              o = Lt.string("ILIKE")
            }
            else {
              o = Lt.string("LIKE")
            }
          }
          return o
          return Lt.nullValue()
        }
        __fns["itemsOf"] = { (__a: [Any?]) -> Any? in
          let arg: Any? = __a[0]
          if Lt.truthy(Lt.has(arg, Lt.string("array"))) {
            return Lt.get(Lt.get(arg, Lt.string("array")), Lt.string("value"))
          }
          return Lt.append(Lt.array([]), arg)
          return Lt.nullValue()
        }
        __fns["isRef"] = { (__a: [Any?]) -> Any? in
          let chainValues: Any? = __a[0]
          tmpRef = Lt.string("")
          if Lt.valueEquals(Lt.len(chainValues), Lt.number(1)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall"))) {
            var firstName: Any? = Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name")
            if Lt.valueEquals(firstName, Lt.string("col")) || Lt.valueEquals(firstName, Lt.string("table")) {
              tmpRef = __fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
            }
          }
          return tmpRef
          return Lt.nullValue()
        }
        __fns["emitParam"] = { (__a: [Any?]) -> Any? in
          let arg: Any? = __a[0]
          params = Lt.listPush(params, arg)
          if Lt.valueEquals(dialect, Lt.string("postgres")) {
            tmp = Lt.strConcat(Lt.string("$"), Lt.toString(Lt.listLen(params)))
          }
          else {
            tmp = Lt.string("?")
          }
          __fns["pushSql"]!([tmp])
          tmp2 = __fns["literalOf"]!([arg])
          __fns["pushW"]!([tmp2])
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["emitIdent"] = { (__a: [Any?]) -> Any? in
          let name: Any? = __a[0]
          tmp = __fns["identStr"]!([name])
          __fns["pushSql"]!([tmp])
          __fns["pushW"]!([tmp])
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["emitRaw"] = { (__a: [Any?]) -> Any? in
          let node: Any? = __a[0]
          if !Lt.valueEquals(Lt.bufLen(sql), Lt.number(0)) {
            sql = Lt.bufAppend(sql, Lt.string(" "))
            wsql = Lt.bufAppend(wsql, Lt.string(" "))
          }
          for rawArg in Lt.arrayItems(Lt.get(Lt.get(node, "functionCall"), "arguments")) {
            var rawVal: Any? = Lt.get(rawArg, Lt.string("argument"))
            if Lt.truthy(Lt.has(rawVal, Lt.string("string"))) {
              sql = Lt.bufAppend(sql, __fns["asString"]!([rawVal]))
              wsql = Lt.bufAppend(wsql, __fns["asString"]!([rawVal]))
            }
            else if Lt.truthy(Lt.has(rawVal, Lt.string("chain"))) {
              tmpRef = __fns["isRef"]!([Lt.get(Lt.get(rawVal, "chain"), "values")])
              if !Lt.valueEquals(tmpRef, Lt.string("")) {
                sql = Lt.bufAppend(sql, __fns["identStr"]!([tmpRef]))
                wsql = Lt.bufAppend(wsql, __fns["identStr"]!([tmpRef]))
              }
              else {
                params = Lt.listPush(params, rawVal)
                if Lt.valueEquals(dialect, Lt.string("postgres")) {
                  tmp = Lt.strConcat(Lt.string("$"), Lt.toString(Lt.listLen(params)))
                }
                else {
                  tmp = Lt.string("?")
                }
                sql = Lt.bufAppend(sql, tmp)
                tmp2 = __fns["literalOf"]!([rawVal])
                wsql = Lt.bufAppend(wsql, tmp2)
              }
            }
            else {
              params = Lt.listPush(params, rawVal)
              if Lt.valueEquals(dialect, Lt.string("postgres")) {
                tmp = Lt.strConcat(Lt.string("$"), Lt.toString(Lt.listLen(params)))
              }
              else {
                tmp = Lt.string("?")
              }
              sql = Lt.bufAppend(sql, tmp)
              tmp2 = __fns["literalOf"]!([rawVal])
              wsql = Lt.bufAppend(wsql, tmp2)
            }
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["conflictTarget"] = { (__a: [Any?]) -> Any? in
          let arg: Any? = __a[0]
          var ct: Any? = Lt.string("()")
          if Lt.truthy(Lt.has(arg, Lt.string("chain"))) {
            tmpRef = __fns["isRef"]!([Lt.get(Lt.get(arg, "chain"), "values")])
            if !Lt.valueEquals(tmpRef, Lt.string("")) {
              ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns["identStr"]!([tmpRef]), Lt.string(")")))
            }
          }
          else if Lt.truthy(Lt.has(arg, Lt.string("string"))) {
            ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns["identStr"]!([__fns["asString"]!([arg])]), Lt.string(")")))
          }
          return ct
          return Lt.nullValue()
        }
        __fns["firstKind"] = { (__a: [Any?]) -> Any? in
          let chainValues: Any? = __a[0]
          var kind: Any? = Lt.string("")
          if !Lt.valueEquals(Lt.len(chainValues), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall"))) {
            kind = __fns["normName"]!([Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name")])
          }
          return kind
          return Lt.nullValue()
        }
        __fns["emitOrderItem"] = { (__a: [Any?]) -> Any? in
          let item: Any? = __a[0]
          var dir: Any? = Lt.string("")
          var ordName: Any? = Lt.string("")
          if Lt.truthy(Lt.has(item, Lt.string("chain"))) {
            for on in Lt.arrayItems(Lt.get(Lt.get(item, "chain"), "values")) {
              var onn: Any? = __fns["normName"]!([Lt.get(Lt.get(on, "functionCall"), "name")])
              if Lt.valueEquals(onn, Lt.string("asc")) {
                dir = Lt.string(" ASC")
              }
              else if Lt.valueEquals(onn, Lt.string("desc")) {
                dir = Lt.string(" DESC")
              }
              else if Lt.valueEquals(onn, Lt.string("col")) || Lt.valueEquals(onn, Lt.string("table")) {
                ordName = __fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(on, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
              }
            }
          }
          if !Lt.valueEquals(ordName, Lt.string("")) {
            tmp = __fns["identStr"]!([ordName])
            orderSql = Lt.strConcat(orderSql, Lt.strConcat(tmp, dir))
            orderW = Lt.strConcat(orderW, Lt.strConcat(tmp, dir))
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["emitOrderList"] = { (__a: [Any?]) -> Any? in
          let arg: Any? = __a[0]
          var firstOrder: Any? = Lt.boolean(true)
          for item in Lt.arrayItems(__fns["itemsOf"]!([arg])) {
            if Lt.valueEquals(firstOrder, Lt.boolean(false)) {
              orderSql = Lt.strConcat(orderSql, Lt.string(", "))
              orderW = Lt.strConcat(orderW, Lt.string(", "))
            }
            firstOrder = Lt.boolean(false)
            __fns["emitOrderItem"]!([item])
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        __fns["flushOrder"] = { (__a: [Any?]) -> Any? in
          if Lt.truthy(hasOrder) {
            __fns["pushSql"]!([Lt.string("ORDER")])
            __fns["pushSql"]!([Lt.string("BY")])
            __fns["pushW"]!([Lt.string("ORDER")])
            __fns["pushW"]!([Lt.string("BY")])
            tmp = orderSql
            if !Lt.valueEquals(tmp, Lt.string("")) {
              __fns["pushSql"]!([tmp])
            }
            tmp2 = orderW
            if !Lt.valueEquals(tmp2, Lt.string("")) {
              __fns["pushW"]!([tmp2])
            }
            hasOrder = Lt.boolean(false)
          }
          return Lt.nullValue()
          return Lt.nullValue()
        }
        for dialectNode in Lt.arrayItems(Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values")) {
          if Lt.valueEquals(__fns["normName"]!([Lt.get(Lt.get(dialectNode, "functionCall"), "name")]), Lt.string("setdialect")) {
            dialect = Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(dialectNode, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("string")), Lt.string("value"))
          }
        }
        if Lt.valueEquals(dialect, Lt.string("")) {
          fatalError(Lt.asString(Lt.string("sql-builder parse: setDialect(...) must be called before parse()")))
        }
        else if !Lt.valueEquals(dialect, Lt.string("postgres")) && !Lt.valueEquals(dialect, Lt.string("mysql")) {
          fatalError(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported dialect "), dialect)))
        }
        if Lt.valueEquals(dialect, Lt.string("mysql")) {
          quote = Lt.string("`")
        }
        else {
          quote = Lt.string("\"")
        }
        __fns["renderNodes"] = { (__a: [Any?]) -> Any? in
          let nodes: Any? = __a[0]
          let mode: Any? = __a[1]
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
          if Lt.valueEquals(mode, Lt.number(0)) {
            for node in Lt.arrayItems(nodes) {
              if Lt.truthy(Lt.has(node, Lt.string("functionCall"))) {
                var name: Any? = Lt.get(Lt.get(node, "functionCall"), "name")
                var nameNorm: Any? = __fns["normName"]!([name])
                if Lt.valueEquals(nameNorm, Lt.string("setdialect")) {
                  continue
                }
                else if Lt.valueEquals(nameNorm, Lt.string("asc")) || Lt.valueEquals(nameNorm, Lt.string("desc")) {
                  if Lt.truthy(hasOrder) {
                    tmp = Lt.toUpper(nameNorm)
                    orderSql = Lt.strConcat(orderSql, Lt.strConcat(Lt.string(" "), tmp))
                    orderW = Lt.strConcat(orderW, Lt.strConcat(Lt.string(" "), tmp))
                  }
                }
                else {
                  if Lt.valueEquals(nameNorm, Lt.string("with")) {
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
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                    subSql = Lt.trim(Lt.bufStr(sql))
                    subW = Lt.trim(Lt.bufStr(wsql))
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    if Lt.valueEquals(withFirst, Lt.boolean(false)) {
                      sql = Lt.bufAppend(sql, Lt.string(","))
                      wsql = Lt.bufAppend(wsql, Lt.string(","))
                    }
                    else {
                      withFirst = Lt.boolean(false)
                      __fns["pushSql"]!([Lt.string("WITH")])
                      __fns["pushW"]!([Lt.string("WITH")])
                    }
                    __fns["pushSql"]!([__fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])])])
                    __fns["pushW"]!([__fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])])])
                    __fns["pushSql"]!([Lt.string("AS")])
                    __fns["pushW"]!([Lt.string("AS")])
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("transaction")) {
                    __fns["pushSql"]!([Lt.string("BEGIN")])
                    __fns["pushW"]!([Lt.string("BEGIN")])
                    sql = Lt.bufAppend(sql, Lt.string(";"))
                    wsql = Lt.bufAppend(wsql, Lt.string(";"))
                    var txnFirst: Any? = Lt.boolean(true)
                    for txnItem in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])) {
                      if Lt.valueEquals(txnFirst, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(";"))
                        wsql = Lt.bufAppend(wsql, Lt.string(";"))
                      }
                      txnFirst = Lt.boolean(false)
                      if Lt.truthy(Lt.has(txnItem, Lt.string("chain"))) {
                        __fns["renderNodes"]!([Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)])
                      }
                      else if Lt.truthy(Lt.has(txnItem, Lt.string("string"))) {
                        __fns["pushSql"]!([__fns["asString"]!([txnItem])])
                        __fns["pushW"]!([__fns["asString"]!([txnItem])])
                      }
                      else {
                        if Lt.truthy(Lt.has(txnItem, Lt.string("chain"))) {
                          tmpRef = __fns["isRef"]!([Lt.get(Lt.get(txnItem, "chain"), "values")])
                          if !Lt.valueEquals(tmpRef, Lt.string("")) {
                            __fns["emitIdent"]!([tmpRef])
                          }
                          else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("delete"))))) {
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
                            __fns["renderNodes"]!([Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)])
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                            __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                            if !Lt.valueEquals(subAliasText, Lt.string("")) {
                              __fns["pushSql"]!([subAliasText])
                              __fns["pushW"]!([subAliasText])
                            }
                          }
                          else {
                            __fns["emitParam"]!([txnItem])
                          }
                        }
                        else {
                          __fns["emitParam"]!([txnItem])
                        }
                      }
                    }
                    if Lt.valueEquals(txnFirst, Lt.boolean(false)) {
                      sql = Lt.bufAppend(sql, Lt.string(";"))
                      wsql = Lt.bufAppend(wsql, Lt.string(";"))
                    }
                    __fns["pushSql"]!([Lt.string("COMMIT")])
                    __fns["pushW"]!([Lt.string("COMMIT")])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("select")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("SELECT")])
                    __fns["pushW"]!([Lt.string("SELECT")])
                    var firstItem: Any? = Lt.boolean(true)
                    for item in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])) {
                      if Lt.valueEquals(firstItem, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      firstItem = Lt.boolean(false)
                      if Lt.truthy(Lt.has(item, Lt.string("chain"))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(item, "chain"), "values")])
                        if !Lt.valueEquals(tmpRef, Lt.string("")) {
                          __fns["emitIdent"]!([tmpRef])
                        }
                        else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("delete"))))) {
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
                          __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)])
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                          if !Lt.valueEquals(subAliasText, Lt.string("")) {
                            __fns["pushSql"]!([subAliasText])
                            __fns["pushW"]!([subAliasText])
                          }
                        }
                        else {
                          __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)])
                        }
                      }
                      else {
                        __fns["emitParam"]!([item])
                      }
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("from")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("FROM")])
                    __fns["pushW"]!([Lt.string("FROM")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("join")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("JOIN")])
                    __fns["pushW"]!([Lt.string("JOIN")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                    __fns["pushSql"]!([Lt.string("ON")])
                    __fns["pushW"]!([Lt.string("ON")])
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("leftjoin")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("LEFT JOIN")])
                    __fns["pushW"]!([Lt.string("LEFT JOIN")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                    __fns["pushSql"]!([Lt.string("ON")])
                    __fns["pushW"]!([Lt.string("ON")])
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("rightjoin")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("RIGHT JOIN")])
                    __fns["pushW"]!([Lt.string("RIGHT JOIN")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                    __fns["pushSql"]!([Lt.string("ON")])
                    __fns["pushW"]!([Lt.string("ON")])
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("innerjoin")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("INNER JOIN")])
                    __fns["pushW"]!([Lt.string("INNER JOIN")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                    __fns["pushSql"]!([Lt.string("ON")])
                    __fns["pushW"]!([Lt.string("ON")])
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("fulljoin")) {
                    if Lt.valueEquals(dialect, Lt.string("mysql")) {
                      fatalError(Lt.asString(Lt.string("sql-builder parse: FULL JOIN is not supported by mysql")))
                    }
                    else {
                      __fns["flushOrder"]!([])
                      __fns["pushSql"]!([Lt.string("FULL JOIN")])
                      __fns["pushW"]!([Lt.string("FULL JOIN")])
                      if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                        if !Lt.valueEquals(tmpRef, Lt.string("")) {
                          __fns["emitIdent"]!([tmpRef])
                        }
                        else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                          __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                          if !Lt.valueEquals(subAliasText, Lt.string("")) {
                            __fns["pushSql"]!([subAliasText])
                            __fns["pushW"]!([subAliasText])
                          }
                        }
                        else {
                          __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                      }
                      __fns["pushSql"]!([Lt.string("ON")])
                      __fns["pushW"]!([Lt.string("ON")])
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("crossjoin")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("CROSS JOIN")])
                    __fns["pushW"]!([Lt.string("CROSS JOIN")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                    __fns["pushSql"]!([Lt.string("ON")])
                    __fns["pushW"]!([Lt.string("ON")])
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("where")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("WHERE")])
                    __fns["pushW"]!([Lt.string("WHERE")])
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("groupby")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("GROUP BY")])
                    __fns["pushW"]!([Lt.string("GROUP BY")])
                    var firstItem: Any? = Lt.boolean(true)
                    for item in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])) {
                      if Lt.valueEquals(firstItem, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      firstItem = Lt.boolean(false)
                      if Lt.truthy(Lt.has(item, Lt.string("chain"))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(item, "chain"), "values")])
                        if !Lt.valueEquals(tmpRef, Lt.string("")) {
                          __fns["emitIdent"]!([tmpRef])
                        }
                        else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("delete"))))) {
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
                          __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)])
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                          if !Lt.valueEquals(subAliasText, Lt.string("")) {
                            __fns["pushSql"]!([subAliasText])
                            __fns["pushW"]!([subAliasText])
                          }
                        }
                        else {
                          __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)])
                        }
                      }
                      else {
                        __fns["emitParam"]!([item])
                      }
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("having")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("HAVING")])
                    __fns["pushW"]!([Lt.string("HAVING")])
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("returning")) {
                    if Lt.valueEquals(dialect, Lt.string("mysql")) {
                      fatalError(Lt.asString(Lt.string("sql-builder parse: RETURNING is not supported by mysql")))
                    }
                    else {
                      __fns["flushOrder"]!([])
                      __fns["pushSql"]!([Lt.string("RETURNING")])
                      __fns["pushW"]!([Lt.string("RETURNING")])
                      var firstItem: Any? = Lt.boolean(true)
                      for item in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])) {
                        if Lt.valueEquals(firstItem, Lt.boolean(false)) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        firstItem = Lt.boolean(false)
                        if Lt.truthy(Lt.has(item, Lt.string("chain"))) {
                          tmpRef = __fns["isRef"]!([Lt.get(Lt.get(item, "chain"), "values")])
                          if !Lt.valueEquals(tmpRef, Lt.string("")) {
                            __fns["emitIdent"]!([tmpRef])
                          }
                          else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("delete"))))) {
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
                            __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)])
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                            __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                            if !Lt.valueEquals(subAliasText, Lt.string("")) {
                              __fns["pushSql"]!([subAliasText])
                              __fns["pushW"]!([subAliasText])
                            }
                          }
                          else {
                            __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)])
                          }
                        }
                        else {
                          __fns["emitParam"]!([item])
                        }
                      }
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("orderby")) {
                    hasOrder = Lt.boolean(true)
                    orderSql = Lt.string("")
                    orderW = Lt.string("")
                    __fns["emitOrderList"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("limit")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("LIMIT")])
                    __fns["pushW"]!([Lt.string("LIMIT")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("offset")) {
                    __fns["flushOrder"]!([])
                    __fns["pushSql"]!([Lt.string("OFFSET")])
                    __fns["pushW"]!([Lt.string("OFFSET")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("raw")) {
                    __fns["emitRaw"]!([node])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("as")) {
                    subAlias = Lt.strConcat(Lt.string("AS "), __fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]))
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("update")) {
                    __fns["pushSql"]!([Lt.string("UPDATE")])
                    __fns["pushW"]!([Lt.string("UPDATE")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                    __fns["pushSql"]!([Lt.string("SET")])
                    __fns["pushW"]!([Lt.string("SET")])
                    var assnFirst: Any? = Lt.boolean(true)
                    for ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"))) {
                      if Lt.valueEquals(assnFirst, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      assnFirst = Lt.boolean(false)
                      __fns["pushSql"]!([__fns["identStr"]!([ak])])
                      __fns["pushW"]!([__fns["identStr"]!([ak])])
                      __fns["pushSql"]!([Lt.string("=")])
                      __fns["pushW"]!([Lt.string("=")])
                      if Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain"))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")])
                        if !Lt.valueEquals(tmpRef, Lt.string("")) {
                          __fns["emitIdent"]!([tmpRef])
                        }
                        else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete"))))) {
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
                          __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)])
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                          if !Lt.valueEquals(subAliasText, Lt.string("")) {
                            __fns["pushSql"]!([subAliasText])
                            __fns["pushW"]!([subAliasText])
                          }
                        }
                        else {
                          __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)])
                      }
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("insert")) {
                    __fns["pushSql"]!([Lt.string("INSERT")])
                    __fns["pushW"]!([Lt.string("INSERT")])
                    __fns["pushSql"]!([Lt.string("INTO")])
                    __fns["pushW"]!([Lt.string("INTO")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                    __fns["pushSql"]!([Lt.string("(")])
                    __fns["pushW"]!([Lt.string("(")])
                    var colFirst: Any? = Lt.boolean(true)
                    for ck in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"))) {
                      if Lt.valueEquals(colFirst, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      colFirst = Lt.boolean(false)
                      __fns["pushSql"]!([__fns["identStr"]!([ck])])
                      __fns["pushW"]!([__fns["identStr"]!([ck])])
                    }
                    __fns["pushSql"]!([Lt.string(")")])
                    __fns["pushW"]!([Lt.string(")")])
                    __fns["pushSql"]!([Lt.string("VALUES")])
                    __fns["pushW"]!([Lt.string("VALUES")])
                    __fns["pushSql"]!([Lt.string("(")])
                    __fns["pushW"]!([Lt.string("(")])
                    var valFirst: Any? = Lt.boolean(true)
                    for vk in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"))) {
                      if Lt.valueEquals(valFirst, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      valFirst = Lt.boolean(false)
                      if Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), Lt.string("chain"))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")])
                        if !Lt.valueEquals(tmpRef, Lt.string("")) {
                          __fns["emitIdent"]!([tmpRef])
                        }
                        else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("delete"))))) {
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
                          __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"), Lt.number(0)])
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                          if !Lt.valueEquals(subAliasText, Lt.string("")) {
                            __fns["pushSql"]!([subAliasText])
                            __fns["pushW"]!([subAliasText])
                          }
                        }
                        else {
                          __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)])
                      }
                    }
                    __fns["pushSql"]!([Lt.string(")")])
                    __fns["pushW"]!([Lt.string(")")])
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("delete")) {
                    __fns["pushSql"]!([Lt.string("DELETE")])
                    __fns["pushW"]!([Lt.string("DELETE")])
                    __fns["pushSql"]!([Lt.string("FROM")])
                    __fns["pushW"]!([Lt.string("FROM")])
                    if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                      if !Lt.valueEquals(tmpRef, Lt.string("")) {
                        __fns["emitIdent"]!([tmpRef])
                      }
                      else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                        if !Lt.valueEquals(subAliasText, Lt.string("")) {
                          __fns["pushSql"]!([subAliasText])
                          __fns["pushW"]!([subAliasText])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("set")) {
                    __fns["pushSql"]!([Lt.string("SET")])
                    __fns["pushW"]!([Lt.string("SET")])
                    var assnFirst: Any? = Lt.boolean(true)
                    for ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"))) {
                      if Lt.valueEquals(assnFirst, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      assnFirst = Lt.boolean(false)
                      __fns["pushSql"]!([__fns["identStr"]!([ak])])
                      __fns["pushW"]!([__fns["identStr"]!([ak])])
                      __fns["pushSql"]!([Lt.string("=")])
                      __fns["pushW"]!([Lt.string("=")])
                      if Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain"))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")])
                        if !Lt.valueEquals(tmpRef, Lt.string("")) {
                          __fns["emitIdent"]!([tmpRef])
                        }
                        else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete"))))) {
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
                          __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)])
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                          if !Lt.valueEquals(subAliasText, Lt.string("")) {
                            __fns["pushSql"]!([subAliasText])
                            __fns["pushW"]!([subAliasText])
                          }
                        }
                        else {
                          __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)])
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)])
                      }
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("values")) {
                    __fns["pushSql"]!([Lt.string("VALUES")])
                    __fns["pushW"]!([Lt.string("VALUES")])
                    var valueRows: Any? = __fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    var valueFirst: Any? = Lt.boolean(true)
                    if !Lt.valueEquals(Lt.len(valueRows), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(valueRows, Lt.number(0)), Lt.string("array"))) {
                      for tuple in Lt.arrayItems(valueRows) {
                        if Lt.valueEquals(valueFirst, Lt.boolean(false)) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        valueFirst = Lt.boolean(false)
                        if Lt.valueEquals(dialect, Lt.string("mysql")) {
                          __fns["pushSql"]!([Lt.string("ROW")])
                          __fns["pushW"]!([Lt.string("ROW")])
                        }
                        __fns["pushSql"]!([Lt.string("(")])
                        __fns["pushW"]!([Lt.string("(")])
                        var itemFirst: Any? = Lt.boolean(true)
                        for ti in Lt.arrayItems(__fns["itemsOf"]!([tuple])) {
                          if Lt.valueEquals(itemFirst, Lt.boolean(false)) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          itemFirst = Lt.boolean(false)
                          if Lt.truthy(Lt.has(ti, Lt.string("chain"))) {
                            tmpRef = __fns["isRef"]!([Lt.get(Lt.get(ti, "chain"), "values")])
                            if !Lt.valueEquals(tmpRef, Lt.string("")) {
                              __fns["emitIdent"]!([tmpRef])
                            }
                            else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("delete"))))) {
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
                              __fns["renderNodes"]!([Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)])
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                              __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                              if !Lt.valueEquals(subAliasText, Lt.string("")) {
                                __fns["pushSql"]!([subAliasText])
                                __fns["pushW"]!([subAliasText])
                              }
                            }
                            else {
                              __fns["emitParam"]!([ti])
                            }
                          }
                          else {
                            __fns["emitParam"]!([ti])
                          }
                        }
                        __fns["pushSql"]!([Lt.string(")")])
                        __fns["pushW"]!([Lt.string(")")])
                      }
                    }
                    else {
                      if Lt.valueEquals(dialect, Lt.string("mysql")) {
                        __fns["pushSql"]!([Lt.string("ROW")])
                        __fns["pushW"]!([Lt.string("ROW")])
                      }
                      __fns["pushSql"]!([Lt.string("(")])
                      __fns["pushW"]!([Lt.string("(")])
                      var itemFirst: Any? = Lt.boolean(true)
                      for ti in Lt.arrayItems(valueRows) {
                        if Lt.valueEquals(itemFirst, Lt.boolean(false)) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        itemFirst = Lt.boolean(false)
                        if Lt.truthy(Lt.has(ti, Lt.string("chain"))) {
                          tmpRef = __fns["isRef"]!([Lt.get(Lt.get(ti, "chain"), "values")])
                          if !Lt.valueEquals(tmpRef, Lt.string("")) {
                            __fns["emitIdent"]!([tmpRef])
                          }
                          else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("delete"))))) {
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
                            __fns["renderNodes"]!([Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)])
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                            __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                            if !Lt.valueEquals(subAliasText, Lt.string("")) {
                              __fns["pushSql"]!([subAliasText])
                              __fns["pushW"]!([subAliasText])
                            }
                          }
                          else {
                            __fns["emitParam"]!([ti])
                          }
                        }
                        else {
                          __fns["emitParam"]!([ti])
                        }
                      }
                      __fns["pushSql"]!([Lt.string(")")])
                      __fns["pushW"]!([Lt.string(")")])
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("onconflictdonothing")) {
                    if Lt.valueEquals(dialect, Lt.string("mysql")) {
                      fatalError(Lt.asString(Lt.string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")))
                    }
                    else {
                      __fns["pushSql"]!([Lt.string("ON")])
                      __fns["pushW"]!([Lt.string("ON")])
                      __fns["pushSql"]!([Lt.string("CONFLICT")])
                      __fns["pushW"]!([Lt.string("CONFLICT")])
                      __fns["pushSql"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                      __fns["pushW"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                      __fns["pushSql"]!([Lt.string("DO")])
                      __fns["pushW"]!([Lt.string("DO")])
                      __fns["pushSql"]!([Lt.string("NOTHING")])
                      __fns["pushW"]!([Lt.string("NOTHING")])
                    }
                  }
                  else if Lt.valueEquals(nameNorm, Lt.string("onconflictdoupdate")) {
                    if Lt.valueEquals(dialect, Lt.string("mysql")) {
                      __fns["pushSql"]!([Lt.string("ON")])
                      __fns["pushW"]!([Lt.string("ON")])
                      __fns["pushSql"]!([Lt.string("DUPLICATE")])
                      __fns["pushW"]!([Lt.string("DUPLICATE")])
                      __fns["pushSql"]!([Lt.string("KEY")])
                      __fns["pushW"]!([Lt.string("KEY")])
                      __fns["pushSql"]!([Lt.string("UPDATE")])
                      __fns["pushW"]!([Lt.string("UPDATE")])
                      var assnFirst: Any? = Lt.boolean(true)
                      for ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"))) {
                        if Lt.valueEquals(assnFirst, Lt.boolean(false)) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        assnFirst = Lt.boolean(false)
                        __fns["pushSql"]!([__fns["identStr"]!([ak])])
                        __fns["pushW"]!([__fns["identStr"]!([ak])])
                        __fns["pushSql"]!([Lt.string("=")])
                        __fns["pushW"]!([Lt.string("=")])
                        if Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain"))) {
                          tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")])
                          if !Lt.valueEquals(tmpRef, Lt.string("")) {
                            __fns["emitIdent"]!([tmpRef])
                          }
                          else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete"))))) {
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
                            __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)])
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                            __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                            if !Lt.valueEquals(subAliasText, Lt.string("")) {
                              __fns["pushSql"]!([subAliasText])
                              __fns["pushW"]!([subAliasText])
                            }
                          }
                          else {
                            __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)])
                          }
                        }
                        else {
                          __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)])
                        }
                      }
                    }
                    else {
                      __fns["pushSql"]!([Lt.string("ON")])
                      __fns["pushW"]!([Lt.string("ON")])
                      __fns["pushSql"]!([Lt.string("CONFLICT")])
                      __fns["pushW"]!([Lt.string("CONFLICT")])
                      __fns["pushSql"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                      __fns["pushW"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                      __fns["pushSql"]!([Lt.string("DO")])
                      __fns["pushW"]!([Lt.string("DO")])
                      __fns["pushSql"]!([Lt.string("UPDATE")])
                      __fns["pushW"]!([Lt.string("UPDATE")])
                      __fns["pushSql"]!([Lt.string("SET")])
                      __fns["pushW"]!([Lt.string("SET")])
                      var assnFirst: Any? = Lt.boolean(true)
                      for ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"))) {
                        if Lt.valueEquals(assnFirst, Lt.boolean(false)) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        assnFirst = Lt.boolean(false)
                        __fns["pushSql"]!([__fns["identStr"]!([ak])])
                        __fns["pushW"]!([__fns["identStr"]!([ak])])
                        __fns["pushSql"]!([Lt.string("=")])
                        __fns["pushW"]!([Lt.string("=")])
                        if Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain"))) {
                          tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")])
                          if !Lt.valueEquals(tmpRef, Lt.string("")) {
                            __fns["emitIdent"]!([tmpRef])
                          }
                          else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete"))))) {
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
                            __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)])
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                            __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                            if !Lt.valueEquals(subAliasText, Lt.string("")) {
                              __fns["pushSql"]!([subAliasText])
                              __fns["pushW"]!([subAliasText])
                            }
                          }
                          else {
                            __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)])
                          }
                        }
                        else {
                          __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)])
                        }
                      }
                    }
                  }
                  else {
                    fatalError(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported clause "), name)))
                  }
                }
              }
            }
            __fns["flushOrder"]!([])
            return Lt.nullValue()
          }
          else {
            first = Lt.boolean(true)
            left = Lt.string("")
            hasLeft = Lt.boolean(false)
            base = Lt.string("")
            for node in Lt.arrayItems(nodes) {
              var pn: Any? = __fns["normName"]!([Lt.get(Lt.get(node, "functionCall"), "name")])
              var op: Any? = __fns["opOf"]!([pn])
              if Lt.truthy(Lt.has(node, Lt.string("functionCall"))) {
                if Lt.valueEquals(pn, Lt.string("col")) || Lt.valueEquals(pn, Lt.string("table")) {
                  left = __fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                  hasLeft = Lt.boolean(true)
                }
                else if Lt.truthy(op) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  if Lt.truthy(hasLeft) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns["pushSql"]!([base])
                  __fns["pushW"]!([base])
                  __fns["pushSql"]!([op])
                  __fns["pushW"]!([op])
                  if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                    if !Lt.valueEquals(tmpRef, Lt.string("")) {
                      __fns["emitIdent"]!([tmpRef])
                    }
                    else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                      if !Lt.valueEquals(subAliasText, Lt.string("")) {
                        __fns["pushSql"]!([subAliasText])
                        __fns["pushW"]!([subAliasText])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("exists")) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  __fns["pushSql"]!([Lt.string("EXISTS")])
                  __fns["pushW"]!([Lt.string("EXISTS")])
                  if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                    if !Lt.valueEquals(tmpRef, Lt.string("")) {
                      __fns["emitIdent"]!([tmpRef])
                    }
                    else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                      if !Lt.valueEquals(subAliasText, Lt.string("")) {
                        __fns["pushSql"]!([subAliasText])
                        __fns["pushW"]!([subAliasText])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("in")) {
                  if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                    if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
                      if Lt.valueEquals(first, Lt.boolean(false)) {
                        __fns["pushSql"]!([Lt.string("AND")])
                        __fns["pushW"]!([Lt.string("AND")])
                      }
                      first = Lt.boolean(false)
                      if Lt.truthy(hasLeft) {
                        base = left
                      }
                      else {
                        base = Lt.string("?")
                      }
                      __fns["pushSql"]!([base])
                      __fns["pushW"]!([base])
                      __fns["pushSql"]!([Lt.string("IN")])
                      __fns["pushW"]!([Lt.string("IN")])
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
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                      if !Lt.valueEquals(subAliasText, Lt.string("")) {
                        __fns["pushSql"]!([subAliasText])
                        __fns["pushW"]!([subAliasText])
                      }
                    }
                    else {
                      if Lt.valueEquals(first, Lt.boolean(false)) {
                        __fns["pushSql"]!([Lt.string("AND")])
                        __fns["pushW"]!([Lt.string("AND")])
                      }
                      first = Lt.boolean(false)
                      if Lt.truthy(hasLeft) {
                        base = left
                      }
                      else {
                        base = Lt.string("?")
                      }
                      __fns["pushSql"]!([base])
                      __fns["pushW"]!([base])
                      __fns["pushSql"]!([Lt.string("IN (")])
                      __fns["pushW"]!([Lt.string("IN (")])
                      var inFirst: Any? = Lt.boolean(true)
                      for iv in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])) {
                        if Lt.valueEquals(inFirst, Lt.boolean(false)) {
                          sql = Lt.bufAppend(sql, Lt.string(","))
                          wsql = Lt.bufAppend(wsql, Lt.string(","))
                        }
                        inFirst = Lt.boolean(false)
                        if Lt.truthy(Lt.has(iv, Lt.string("chain"))) {
                          tmpRef = __fns["isRef"]!([Lt.get(Lt.get(iv, "chain"), "values")])
                          if !Lt.valueEquals(tmpRef, Lt.string("")) {
                            __fns["emitIdent"]!([tmpRef])
                          }
                          else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("delete"))))) {
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
                            __fns["renderNodes"]!([Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)])
                            subSql = Lt.trim(Lt.bufStr(sql))
                            subW = Lt.trim(Lt.bufStr(wsql))
                            subAliasText = subAlias
                            sql = savedSql
                            wsql = savedW
                            orderSql = savedOrderSql
                            orderW = savedOrderW
                            hasOrder = savedHasOrder
                            subAlias = savedAlias
                            __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                            __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                            if !Lt.valueEquals(subAliasText, Lt.string("")) {
                              __fns["pushSql"]!([subAliasText])
                              __fns["pushW"]!([subAliasText])
                            }
                          }
                          else {
                            __fns["emitParam"]!([iv])
                          }
                        }
                        else {
                          __fns["emitParam"]!([iv])
                        }
                      }
                      __fns["pushSql"]!([Lt.string(")")])
                      __fns["pushW"]!([Lt.string(")")])
                    }
                  }
                  else {
                    if Lt.valueEquals(first, Lt.boolean(false)) {
                      __fns["pushSql"]!([Lt.string("AND")])
                      __fns["pushW"]!([Lt.string("AND")])
                    }
                    first = Lt.boolean(false)
                    if Lt.truthy(hasLeft) {
                      base = left
                    }
                    else {
                      base = Lt.string("?")
                    }
                    __fns["pushSql"]!([base])
                    __fns["pushW"]!([base])
                    __fns["pushSql"]!([Lt.string("IN (")])
                    __fns["pushW"]!([Lt.string("IN (")])
                    var inFirst: Any? = Lt.boolean(true)
                    for iv in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])) {
                      if Lt.valueEquals(inFirst, Lt.boolean(false)) {
                        sql = Lt.bufAppend(sql, Lt.string(","))
                        wsql = Lt.bufAppend(wsql, Lt.string(","))
                      }
                      inFirst = Lt.boolean(false)
                      if Lt.truthy(Lt.has(iv, Lt.string("chain"))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(iv, "chain"), "values")])
                        if !Lt.valueEquals(tmpRef, Lt.string("")) {
                          __fns["emitIdent"]!([tmpRef])
                        }
                        else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("delete"))))) {
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
                          __fns["renderNodes"]!([Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)])
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                          if !Lt.valueEquals(subAliasText, Lt.string("")) {
                            __fns["pushSql"]!([subAliasText])
                            __fns["pushW"]!([subAliasText])
                          }
                        }
                        else {
                          __fns["emitParam"]!([iv])
                        }
                      }
                      else {
                        __fns["emitParam"]!([iv])
                      }
                    }
                    __fns["pushSql"]!([Lt.string(")")])
                    __fns["pushW"]!([Lt.string(")")])
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("between")) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  if Lt.truthy(hasLeft) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns["pushSql"]!([base])
                  __fns["pushW"]!([base])
                  __fns["pushSql"]!([Lt.string("BETWEEN")])
                  __fns["pushW"]!([Lt.string("BETWEEN")])
                  if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain"))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")])
                    if !Lt.valueEquals(tmpRef, Lt.string("")) {
                      __fns["emitIdent"]!([tmpRef])
                    }
                    else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                      if !Lt.valueEquals(subAliasText, Lt.string("")) {
                        __fns["pushSql"]!([subAliasText])
                        __fns["pushW"]!([subAliasText])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])
                  }
                  __fns["pushSql"]!([Lt.string("AND")])
                  __fns["pushW"]!([Lt.string("AND")])
                  if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain"))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")])
                    if !Lt.valueEquals(tmpRef, Lt.string("")) {
                      __fns["emitIdent"]!([tmpRef])
                    }
                    else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                      if !Lt.valueEquals(subAliasText, Lt.string("")) {
                        __fns["pushSql"]!([subAliasText])
                        __fns["pushW"]!([subAliasText])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("isnull")) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  if Lt.truthy(hasLeft) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns["pushSql"]!([base])
                  __fns["pushW"]!([base])
                  __fns["pushSql"]!([Lt.string("IS NULL")])
                  __fns["pushW"]!([Lt.string("IS NULL")])
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("isnotnull")) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  if Lt.truthy(hasLeft) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns["pushSql"]!([base])
                  __fns["pushW"]!([base])
                  __fns["pushSql"]!([Lt.string("IS NOT NULL")])
                  __fns["pushW"]!([Lt.string("IS NOT NULL")])
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("not")) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  __fns["pushSql"]!([Lt.string("NOT (")])
                  __fns["pushW"]!([Lt.string("NOT (")])
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)])
                  __fns["pushSql"]!([Lt.string(")")])
                  __fns["pushW"]!([Lt.string(")")])
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("and")) || Lt.valueEquals(pn, Lt.string("or")) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  __fns["pushSql"]!([Lt.string("(")])
                  __fns["pushW"]!([Lt.string("(")])
                  var boolFirst: Any? = Lt.boolean(true)
                  for bv in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])) {
                    if Lt.valueEquals(boolFirst, Lt.boolean(false)) {
                      tmp = Lt.toUpper(pn)
                      __fns["pushSql"]!([tmp])
                      __fns["pushW"]!([tmp])
                    }
                    boolFirst = Lt.boolean(false)
                    if Lt.truthy(Lt.has(bv, Lt.string("chain"))) {
                      __fns["renderNodes"]!([Lt.get(Lt.get(bv, "chain"), "values"), Lt.number(1)])
                    }
                    else {
                      __fns["emitParam"]!([bv])
                    }
                  }
                  __fns["pushSql"]!([Lt.string(")")])
                  __fns["pushW"]!([Lt.string(")")])
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("as")) {
                  if Lt.truthy(hasLeft) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns["pushSql"]!([base])
                  __fns["pushW"]!([base])
                  __fns["pushSql"]!([Lt.string("AS")])
                  __fns["pushW"]!([Lt.string("AS")])
                  __fns["emitIdent"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("op")) {
                  if Lt.valueEquals(first, Lt.boolean(false)) {
                    __fns["pushSql"]!([Lt.string("AND")])
                    __fns["pushW"]!([Lt.string("AND")])
                  }
                  first = Lt.boolean(false)
                  if Lt.truthy(hasLeft) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns["pushSql"]!([base])
                  __fns["pushW"]!([base])
                  __fns["pushSql"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                  __fns["pushW"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])])
                  if Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain"))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")])
                    if !Lt.valueEquals(tmpRef, Lt.string("")) {
                      __fns["emitIdent"]!([tmpRef])
                    }
                    else if (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete"))))) {
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
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)])
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))])
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))])
                      if !Lt.valueEquals(subAliasText, Lt.string("")) {
                        __fns["pushSql"]!([subAliasText])
                        __fns["pushW"]!([subAliasText])
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if Lt.valueEquals(pn, Lt.string("raw")) {
                  __fns["emitRaw"]!([node])
                }
                else {
                  fatalError(Lt.asString(Lt.string("sql-builder parse: unsupported predicate")))
                }
              }
            }
            return Lt.nullValue()
          }
          return Lt.nullValue()
        }
        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values"), Lt.number(0)])
        sql = Lt.bufStr(sql)
        wsql = Lt.bufStr(wsql)
        params = Lt.listValue(params)
        return Lt.map([("sql", Lt.trim(sql)), ("sqlWithParam", Lt.trim(wsql)), ("param", Lt.params(params))])
    }

}

enum Init {
    static func sqlBuilder(_ variableName: String?, _ copies: Any?...) -> SqlBuilder {
        let structure = SqlBuilder()
        var variableNameValue: Any? = nil
        if variableName != nil { variableNameValue = variableName! } else { variableNameValue = Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(structure.getSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName") }
        _ = structure.initFromInitFunction(Lt.map([("name", "sql-builder"), ("variableName", variableNameValue)]), Lt.array(copies))
        return structure
    }

    static func sqlBuilder() -> SqlBuilder { return sqlBuilder(nil) }
}