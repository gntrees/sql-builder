#pragma once



// Auto-generated index for gntrees-sql-builder



#include "lt.hpp"

#include <map>

#include <stdexcept>

#include <string>

#include <utility>

#include <vector>

// parse() returns an lt::Value map: { "sql": string, "sqlWithParam": string, "param": array }

// Auto-generated C++ method-chain types.
//
// C++ has no universal type, so LT values are `lt::Value` (a tagged union). There
// is no `Value` enum beyond that. The one shared abstraction is `Structure`: every
// generated builder class implements it, which lets the generic runtime (`copy` /
// `make_copy`) call `getSchema()` and name the structure.

struct Structure {
    virtual ~Structure() = default;
    virtual lt::Value getSchema() const = 0;
    virtual std::string kebabName() const = 0;
};


struct Mc {
    // Auto-generated C++ method-chain runtime (Lingua Tungga Gelombang 3).
    //
    // The static counterpart of `core/base/python/base-utils.py`. Schemas are
    // `lt::Value` maps; the generator inlines this fragment inside a `struct Mc` in
    // the generated `index.hpp`.
    //
    // `normalize_argument_structure_call` and `copy` are *not* defined here: like
    // the other runtimes they are emitted by the generator because they reference
    // the project's structure classes.
    //
    // C++ has exceptions, so (like Java) the "try each union member and collect
    // failures" step is a plain try/catch.

    static std::string mc_typeof(const lt::Value& value) {
        switch (value.kind) {
            case lt::Value::Kind::Bool: return "boolean";
            case lt::Value::Kind::Int:
            case lt::Value::Kind::Float: return "number";
            case lt::Value::Kind::Str: return "string";
            default: return "object";
        }
    }

    static bool has_key(const lt::Value& value, const std::string& key) {
        return lt::truthy(lt::has(value, lt::string(key)));
    }

    static void set_entry(std::vector<std::pair<std::string, lt::Value>>& entries, const std::string& key, const lt::Value& value) {
        for (auto& entry : entries) {
            if (entry.first == key) {
                entry.second = value;
                return;
            }
        }
        entries.push_back({key, value});
    }

    /** Reference to a map entry, creating an empty one when absent. */
    static lt::Value& map_ref(lt::Value& value, const std::string& key) {
        for (auto& entry : value.entries) {
            if (entry.first == key) return entry.second;
        }
        value.entries.push_back({key, lt::Value{}});
        return value.entries.back().second;
    }

    static void validate_schema(const lt::Value& schema) {
        const std::string message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction";
        if (schema.kind != lt::Value::Kind::Map) throw std::runtime_error(message);
        lt::Value inner = lt::get(schema, "schema");
        if (inner.kind != lt::Value::Kind::Map) throw std::runtime_error(message);
        lt::Value chain = lt::get(inner, "chain");
        if (chain.kind != lt::Value::Kind::Map) throw std::runtime_error(message);
        lt::Value chainChain = lt::get(chain, "chain");
        if (chainChain.kind != lt::Value::Kind::Map) throw std::runtime_error(message);
        if (lt::get(chainChain, "values").kind != lt::Value::Kind::Array || !lt::truthy(lt::get(chainChain, "initFunction"))) {
            throw std::runtime_error(message);
        }
    }

    static lt::Value unwrap_argument_value(const lt::Value& value) {
        if (value.kind != lt::Value::Kind::Map) throw std::runtime_error("Unknown argument value type");
        if (has_key(value, "string")) return lt::get(lt::get(value, "string"), "value");
        if (has_key(value, "number")) return lt::get(lt::get(value, "number"), "value");
        if (has_key(value, "boolean")) return lt::get(lt::get(value, "boolean"), "value");
        if (has_key(value, "null")) return lt::get(lt::get(value, "null"), "value");
        if (has_key(value, "array")) {
            std::vector<lt::Value> out;
            for (const lt::Value& item : lt::array_items(lt::get(lt::get(value, "array"), "value"))) {
                out.push_back(unwrap_argument_value(item));
            }
            return lt::array(out);
        }
        if (has_key(value, "object")) {
            std::vector<std::pair<std::string, lt::Value>> out;
            for (const auto& entry : lt::get(lt::get(value, "object"), "value").entries) {
                out.push_back({entry.first, unwrap_argument_value(entry.second)});
            }
            return lt::map(out);
        }
        if (has_key(value, "chain")) throw std::runtime_error("Cannot validate a chain default value at runtime");
        throw std::runtime_error("Unknown argument value type");
    }

    static void validate_default(const lt::Value& defaultVal, const lt::Value& structType) {
        normalize_argument(unwrap_argument_value(defaultVal), structType);
    }

    static lt::Value normalize_argument(const lt::Value& arg, const lt::Value& structType) {
        if (structType.kind != lt::Value::Kind::Map) throw std::runtime_error("Unsupported struct type in normalizeArgument");

        if (has_key(structType, "array")) {
            if (arg.kind != lt::Value::Kind::Array) throw std::runtime_error("Expected an array argument, but got " + mc_typeof(arg));
            std::vector<lt::Value> items = lt::array_items(arg);
            if (items.empty()) return lt::map({{"array", lt::map({{"value", lt::array({})}})}});
            lt::Value itemType = lt::get(lt::get(structType, "array"), "type");
            std::vector<lt::Value> normalizedItems;
            for (const lt::Value& item : items) normalizedItems.push_back(normalize_argument(item, itemType));
            if (normalizedItems[0].kind == lt::Value::Kind::Null) throw std::runtime_error("Unexpected undefined value in array");
            return lt::map({{"array", lt::map({{"value", lt::array(normalizedItems)}})}});
        }

        if (has_key(structType, "object")) {
            if (arg.kind != lt::Value::Kind::Map) throw std::runtime_error("Expected an object argument, but got " + mc_typeof(arg));
            lt::Value declared = lt::get(structType, "object");
            std::vector<std::string> missingKeys;
            for (const lt::Value& key : lt::array_items(lt::keys(declared))) {
                std::string keyText = lt::as_string(key);
                if (!has_key(arg, keyText)) missingKeys.push_back(keyText);
            }
            if (!missingKeys.empty()) {
                std::string joined;
                for (size_t i = 0; i < missingKeys.size(); i++) {
                    if (i) joined += "\", \"";
                    joined += missingKeys[i];
                }
                throw std::runtime_error("Missing required key(s) \"" + joined + "\" in object argument");
            }
            std::vector<std::pair<std::string, lt::Value>> normalizedObject;
            for (const auto& entry : arg.entries) {
                if (!has_key(declared, entry.first)) throw std::runtime_error("Unexpected key \"" + entry.first + "\" in object argument");
                normalizedObject.push_back({entry.first, normalize_argument(entry.second, lt::get(declared, entry.first))});
            }
            return lt::map({{"object", lt::map({{"value", lt::map(normalizedObject)}})}});
        }

        if (has_key(structType, "string")) {
            if (arg.kind != lt::Value::Kind::Str) throw std::runtime_error("Expected a string argument, but got " + mc_typeof(arg));
            return lt::map({{"string", lt::map({{"value", arg}})}});
        }

        if (has_key(structType, "number")) {
            if (arg.kind == lt::Value::Kind::Bool || (arg.kind != lt::Value::Kind::Int && arg.kind != lt::Value::Kind::Float)) {
                throw std::runtime_error("Expected a number argument, but got " + mc_typeof(arg));
            }
            double number = arg.kind == lt::Value::Kind::Int ? static_cast<double>(arg.integer) : arg.number;
            if (!std::isfinite(number)) throw std::runtime_error("Expected a finite number argument, but got " + lt::as_string(arg));
            return lt::map({{"number", lt::map({{"value", lt::number(number)}})}});
        }

        if (has_key(structType, "boolean")) {
            if (arg.kind != lt::Value::Kind::Bool) throw std::runtime_error("Expected a boolean argument, but got " + mc_typeof(arg));
            return lt::map({{"boolean", lt::map({{"value", arg}})}});
        }

        if (has_key(structType, "null")) {
            if (arg.kind != lt::Value::Kind::Null) throw std::runtime_error("Expected a null argument, but got " + mc_typeof(arg));
            return lt::map({{"null", lt::map({{"value", lt::null()}})}});
        }

        if (has_key(structType, "union")) {
            std::vector<std::string> reasons;
            std::vector<lt::Value> normalizedUnionTypes;
            for (const lt::Value& unionType : lt::array_items(lt::get(lt::get(structType, "union"), "types"))) {
                try {
                    normalizedUnionTypes.push_back(normalize_argument(arg, unionType));
                } catch (const std::exception& error) {
                    reasons.push_back(error.what());
                }
            }
            if (normalizedUnionTypes.empty() || normalizedUnionTypes[0].kind == lt::Value::Kind::Null) {
                std::string joined;
                for (size_t i = 0; i < reasons.size(); i++) {
                    if (i) joined += " | ";
                    joined += reasons[i];
                }
                throw std::runtime_error("Argument does not match any type in the union: " + joined);
            }
            if (normalizedUnionTypes.size() > 1) {
                if (arg.kind == lt::Value::Kind::Array && lt::array_items(arg).empty()) return normalizedUnionTypes[0];
                throw std::runtime_error("Argument matches multiple types in the union, which is ambiguous");
            }
            return normalizedUnionTypes[0];
        }

        if (has_key(structType, "map")) {
            if (arg.kind != lt::Value::Kind::Map) throw std::runtime_error("Expected an object argument for map type, but got " + mc_typeof(arg));
            lt::Value valueType = lt::get(lt::get(structType, "map"), "type");
            std::vector<std::pair<std::string, lt::Value>> normalizedMap;
            for (const auto& entry : arg.entries) normalizedMap.push_back({entry.first, normalize_argument(entry.second, valueType)});
            return lt::map({{"object", lt::map({{"value", lt::map(normalizedMap)}})}});
        }

        if (has_key(structType, "structureCall")) {
            return normalize_argument_structure_call(arg);
        }

        if (has_key(structType, "literal")) {
            lt::Value expected = lt::get(lt::get(structType, "literal"), "value");
            std::string literalType = lt::as_string(lt::get(lt::get(structType, "literal"), "type"));
            if (literalType == "string") {
                if (arg.kind != lt::Value::Kind::Str) throw std::runtime_error("Expected a string literal argument, but got " + mc_typeof(arg));
                if (arg.text != expected.text) throw std::runtime_error("Expected string literal " + lt::as_string(expected) + ", but got " + lt::as_string(arg));
                return lt::map({{"string", lt::map({{"value", arg}})}});
            }
            if (literalType == "number") {
                if (arg.kind == lt::Value::Kind::Bool || (arg.kind != lt::Value::Kind::Int && arg.kind != lt::Value::Kind::Float)) {
                    throw std::runtime_error("Expected a number literal argument, but got " + mc_typeof(arg));
                }
                if (!lt::value_equals(arg, expected)) throw std::runtime_error("Expected number literal " + lt::as_string(expected) + ", but got " + lt::as_string(arg));
                return lt::map({{"number", lt::map({{"value", arg}})}});
            }
            if (arg.kind != lt::Value::Kind::Bool) throw std::runtime_error("Expected a boolean literal argument, but got " + mc_typeof(arg));
            if (!lt::value_equals(arg, expected)) throw std::runtime_error("Expected boolean literal " + lt::as_string(expected) + ", but got " + lt::as_string(arg));
            return lt::map({{"boolean", lt::map({{"value", arg}})}});
        }

        throw std::runtime_error("Unsupported struct type in normalizeArgument");
    }

    static lt::Value create_schema(const lt::Value& oldSchema, const std::string& functionName, const std::vector<lt::Value>& functionArgs, bool isTemplateLiteral) {
        validate_schema(oldSchema);
        lt::Value old = lt::get(oldSchema, "schema");
        lt::Value oldChain = lt::get(lt::get(old, "chain"), "chain");

        std::vector<lt::Value> args;
        if (isTemplateLiteral && !functionArgs.empty()) {
            lt::Value strings = lt::get(functionArgs[0], "arg");
            if (strings.kind != lt::Value::Kind::Array) throw std::runtime_error("Expected a template strings array for " + functionName);
            std::vector<lt::Value> stringItems = lt::array_items(strings);
            for (const lt::Value& text : stringItems) {
                if (text.kind != lt::Value::Kind::Str) throw std::runtime_error("Expected a template strings array for " + functionName);
            }
            std::vector<lt::Value> expressions(functionArgs.begin() + 1, functionArgs.end());
            if (expressions.size() != stringItems.size() - 1) {
                throw std::runtime_error(
                    "Template literal for " + functionName + " expects " + std::to_string(stringItems.size() - 1)
                        + " expression(s), but got " + std::to_string(expressions.size())
                );
            }
            for (size_t index = 0; index < stringItems.size(); index++) {
                std::string text = lt::as_string(stringItems[index]);
                if (!text.empty()) {
                    args.push_back(lt::map({{"argument", lt::map({{"string", lt::map({{"value", lt::string(text)}})}})}, {"default", lt::null()}}));
                }
                if (index < expressions.size()) {
                    lt::Value expression = expressions[index];
                    if (expression.kind == lt::Value::Kind::Null) throw std::runtime_error("Missing expression for template literal at index " + std::to_string(index));
                    args.push_back(lt::map({
                        {"argument", normalize_argument(lt::get(expression, "arg"), lt::get(expression, "struct"))},
                        {"default", lt::null()},
                    }));
                }
            }
        } else {
            for (size_t index = 0; index < functionArgs.size(); index++) {
                lt::Value functionArg = functionArgs[index];
                bool provided = lt::truthy(lt::get(functionArg, "provided"));
                lt::Value defaultVal = lt::get(functionArg, "default");
                if (!provided) {
                    if (defaultVal.kind != lt::Value::Kind::Null) {
                        validate_default(defaultVal, lt::get(functionArg, "struct"));
                        args.push_back(lt::map({{"argument", defaultVal}, {"default", defaultVal}}));
                        continue;
                    }
                    throw std::runtime_error("Parameter \"" + functionName + "\" argument #" + std::to_string(index + 1) + " was not provided");
                }
                lt::Value argument = normalize_argument(lt::get(functionArg, "arg"), lt::get(functionArg, "struct"));
                if (defaultVal.kind != lt::Value::Kind::Null) validate_default(defaultVal, lt::get(functionArg, "struct"));
                args.push_back(lt::map({{"argument", argument}, {"default", defaultVal}}));
            }
        }

        std::vector<lt::Value> values = lt::array_items(lt::get(oldChain, "values"));
        values.push_back(lt::map({{"functionCall", lt::map({
            {"name", lt::string(functionName)},
            {"arguments", lt::array(args)},
            {"isTemplateLiteral", lt::boolean(isTemplateLiteral)},
        })}}));

        std::vector<std::pair<std::string, lt::Value>> innerEntries = old.entries;
        set_entry(innerEntries, "chain", lt::map({{"chain", lt::map({
            {"values", lt::array(values)},
            {"initFunction", lt::get(oldChain, "initFunction")},
        })}}));
        return lt::map({{"schema", lt::map(innerEntries)}});
    }

    static lt::Value create_property_call_schema(const lt::Value& oldSchema, const std::string& propertyName) {
        lt::Value old = lt::get(oldSchema, "schema");
        lt::Value oldChain = lt::get(lt::get(old, "chain"), "chain");

        std::vector<lt::Value> values = lt::array_items(lt::get(oldChain, "values"));
        values.push_back(lt::map({{"propertyCall", lt::map({{"name", lt::string(propertyName)}})}}));

        std::vector<std::pair<std::string, lt::Value>> innerEntries = old.entries;
        set_entry(innerEntries, "chain", lt::map({{"chain", lt::map({
            {"values", lt::array(values)},
            {"initFunction", lt::get(oldChain, "initFunction")},
        })}}));
        return lt::map({{"schema", lt::map(innerEntries)}});
    }

    static lt::Value make_copy(const std::string& structureName, const Structure& source) {
        lt::Value schema = source.getSchema();
        validate_schema(schema);
        return lt::map({{"copy", lt::map({
            {"structureName", lt::string(structureName)},
            {"chain", lt::get(lt::get(schema, "schema"), "chain")},
        })}});
    }

    static lt::Value normalize_argument_structure_call(const lt::Value& arg) {
        if (arg.kind == lt::Value::Kind::Structure && arg.structure != nullptr) {
            return lt::get(lt::get(arg.structure->getSchema(), "schema"), "chain");
        }
        if (arg.kind == lt::Value::Kind::Map) throw std::runtime_error("Unknown structure call argument type");
        std::string got = arg.kind == lt::Value::Kind::Array ? "array" : mc_typeof(arg);
        throw std::runtime_error("Expected a structure instance for structure calls, but got " + got);
    }

    static lt::Value copy(const Structure& source) {
        return make_copy(source.kebabName(), source);
    }

    static void apply_copies(lt::Value& schema, const lt::Value& copies, const std::string& targetStructureName) {
        if (!lt::truthy(copies)) return;
        for (const lt::Value& cp : lt::array_items(copies)) {
            if (
                cp.kind != lt::Value::Kind::Map
                || !has_key(cp, "copy")
                || lt::get(cp, "copy").kind != lt::Value::Kind::Map
                || lt::get(lt::get(cp, "copy"), "structureName").kind != lt::Value::Kind::Str
                || lt::get(lt::get(cp, "copy"), "chain").kind != lt::Value::Kind::Map
            ) {
                throw std::runtime_error("Invalid builder argument in init function: wrap the structure with copy(...)");
            }
            std::string name = lt::as_string(lt::get(lt::get(cp, "copy"), "structureName"));
            if (name != targetStructureName) {
                throw std::runtime_error("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'");
            }
            lt::Value value = lt::map({{"copy", lt::map({
                {"structureName", lt::string(name)},
                {"chain", lt::get(lt::get(cp, "copy"), "chain")},
            })}});
            lt::Value& chainChainValue = map_ref(map_ref(map_ref(schema, "schema"), "chain"), "chain");
            std::vector<lt::Value> chainValues = lt::array_items(lt::get(chainChainValue, "values"));
            chainValues.push_back(value);
            map_ref(chainChainValue, "values") = lt::array(chainValues);
        }
    }

};

class SqlBuilder : public Structure {
public:
    lt::Value schemaSqlBuilder = lt::map({{"schema", lt::map({{"exportName", lt::string("schema")}, {"importPaths", lt::map({{"typescript", lt::string("../../../gntrees-sql-builder/typescript/index")}})}, {"chain", lt::map({{"chain", lt::map({{"values", lt::array({})}, {"initFunction", lt::map({{"name", lt::string("sql-builder")}, {"variableName", lt::string("s1")}})}})}})}})}});

    lt::Value getSchema() const override { return schemaSqlBuilder; }

    std::string kebabName() const override { return "sql-builder"; }

    lt::Value getSchema(std::string exportName, lt::Value importPaths) {
        lt::Value& inner = Mc::map_ref(schemaSqlBuilder, "schema");
        if (!exportName.empty()) Mc::map_ref(inner, "exportName") = lt::string(exportName);
        if (importPaths.kind == lt::Value::Kind::Map) {
            std::vector<std::pair<std::string, lt::Value>> merged;
            lt::Value existing = lt::get(inner, "importPaths");
            if (existing.kind == lt::Value::Kind::Map) for (const auto& entry : existing.entries) merged.push_back(entry);
            for (const auto& entry : importPaths.entries) Mc::set_entry(merged, entry.first, entry.second);
            Mc::map_ref(inner, "importPaths") = lt::map(merged);
        }
        return schemaSqlBuilder;
    }

    SqlBuilder initFromStructure(lt::Value schema) {
        Mc::validate_schema(schema);
        schemaSqlBuilder = schema;
        return *this;
    }

    SqlBuilder initFromInitFunction(lt::Value initFunction) { return initFromInitFunction(initFunction, lt::Value{}); }

    SqlBuilder initFromInitFunction(lt::Value initFunction, lt::Value copies) {
        if (lt::get(initFunction, "name").kind != lt::Value::Kind::Str || lt::get(initFunction, "variableName").kind != lt::Value::Kind::Str) {
            throw std::runtime_error("Invalid init function");
        }
        lt::Value& chainChain = Mc::map_ref(Mc::map_ref(Mc::map_ref(schemaSqlBuilder, "schema"), "chain"), "chain");
        Mc::map_ref(chainChain, "initFunction") = initFunction;
        Mc::apply_copies(schemaSqlBuilder, copies, "sql-builder");
        return *this;
    }

    SqlBuilder select(std::vector<lt::Value> __a = {}) {
        lt::Value columns = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"select\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "select", std::vector<lt::Value>{
            lt::map({{"arg", columns}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}}), lt::map({{"map", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder from(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"from\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "from", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder transaction(std::vector<lt::Value> __a = {}) {
        lt::Value transaction = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"transaction\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "transaction", std::vector<lt::Value>{
            lt::map({{"arg", transaction}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder orderBy(std::vector<lt::Value> __a = {}) {
        lt::Value columns = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"orderBy\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "orderBy", std::vector<lt::Value>{
            lt::map({{"arg", columns}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder limit(std::vector<lt::Value> __a = {}) {
        lt::Value count = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"limit\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "limit", std::vector<lt::Value>{
            lt::map({{"arg", count}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder offset(std::vector<lt::Value> __a = {}) {
        lt::Value count = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"offset\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "offset", std::vector<lt::Value>{
            lt::map({{"arg", count}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder with(std::vector<lt::Value> __a = {}) {
        lt::Value statement = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value as = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"with\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"with\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "with", std::vector<lt::Value>{
            lt::map({{"arg", statement}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", as}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder groupBy(std::vector<lt::Value> __a = {}) {
        lt::Value columns = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"groupBy\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "groupBy", std::vector<lt::Value>{
            lt::map({{"arg", columns}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder having(std::vector<lt::Value> __a = {}) {
        lt::Value statement = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"having\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "having", std::vector<lt::Value>{
            lt::map({{"arg", statement}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder where(std::vector<lt::Value> __a = {}) {
        lt::Value statement = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"where\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "where", std::vector<lt::Value>{
            lt::map({{"arg", statement}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder update(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value set = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"update\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"update\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "update", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", set}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"map", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder set(std::vector<lt::Value> __a = {}) {
        lt::Value statement = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"set\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "set", std::vector<lt::Value>{
            lt::map({{"arg", statement}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"map", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder insert(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value set = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"insert\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"insert\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "insert", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", set}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"map", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder values(std::vector<lt::Value> __a = {}) {
        lt::Value values = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"values\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "values", std::vector<lt::Value>{
            lt::map({{"arg", values}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder returning(std::vector<lt::Value> __a = {}) {
        lt::Value columns = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"returning\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "returning", std::vector<lt::Value>{
            lt::map({{"arg", columns}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}}), lt::map({{"map", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder onConflictDoNothing(std::vector<lt::Value> __a = {}) {
        lt::Value target = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"onConflictDoNothing\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "onConflictDoNothing", std::vector<lt::Value>{
            lt::map({{"arg", target}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder onConflictDoUpdate(std::vector<lt::Value> __a = {}) {
        lt::Value target = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value set = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"onConflictDoUpdate\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"onConflictDoUpdate\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "onConflictDoUpdate", std::vector<lt::Value>{
            lt::map({{"arg", target}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", set}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"map", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder delete_(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"delete\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "delete", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder join(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value on = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"join\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"join\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "join", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", on}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder leftJoin(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value on = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"leftJoin\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"leftJoin\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "leftJoin", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", on}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder rightJoin(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value on = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"rightJoin\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"rightJoin\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "rightJoin", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", on}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder innerJoin(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value on = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"innerJoin\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"innerJoin\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "innerJoin", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", on}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder fullJoin(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value on = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"fullJoin\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"fullJoin\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "fullJoin", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", on}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder crossJoin(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value on = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"crossJoin\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"crossJoin\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "crossJoin", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", on}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder eq(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"eq\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "eq", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder gt(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"gt\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "gt", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder gte(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"gte\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "gte", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder lt(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"lt\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "lt", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder lte(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"lte\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "lte", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder exists(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"exists\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "exists", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder isNull(std::vector<lt::Value> __a = {}) {
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "isNull", std::vector<lt::Value>{
        }, false));
    }

    SqlBuilder isNotNull(std::vector<lt::Value> __a = {}) {
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "isNotNull", std::vector<lt::Value>{
        }, false));
    }

    SqlBuilder in(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"in\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "in", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder between(std::vector<lt::Value> __a = {}) {
        lt::Value first = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value second = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"between\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"between\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "between", std::vector<lt::Value>{
            lt::map({{"arg", first}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", second}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder like(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"like\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "like", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder ilike(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"ilike\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "ilike", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder not_(std::vector<lt::Value> __a = {}) {
        lt::Value value = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"not\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "not", std::vector<lt::Value>{
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder and_(std::vector<lt::Value> __a = {}) {
        lt::Value values = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"and\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "and", std::vector<lt::Value>{
            lt::map({{"arg", values}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder or_(std::vector<lt::Value> __a = {}) {
        lt::Value values = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"or\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "or", std::vector<lt::Value>{
            lt::map({{"arg", values}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}}), lt::map({{"array", lt::map({{"type", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder op(std::vector<lt::Value> __a = {}) {
        lt::Value operation = __a.size() > 0 ? __a[0] : lt::null();
        lt::Value value = __a.size() > 1 ? __a[1] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"op\" argument #1 was not provided");
        if (__a.size() <= 1) throw std::runtime_error("Parameter \"op\" argument #2 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "op", std::vector<lt::Value>{
            lt::map({{"arg", operation}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}}),
            lt::map({{"arg", value}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 1)}})
        }, false));
    }

    SqlBuilder raw(std::vector<lt::Value> __a = {}) {
        std::vector<lt::Value> __fargs;
        __fargs.push_back(lt::map({{"arg", __a.size() > 0 ? __a[0] : lt::null()}, {"struct", lt::map({{"string", lt::map({{"type", lt::string("string")}})}})}}));
        for (std::size_t __i = 1; __i < __a.size(); __i++) __fargs.push_back(lt::map({{"arg", __a[__i]}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}}));
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "raw", __fargs, true));
    }

    SqlBuilder asc(std::vector<lt::Value> __a = {}) {
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "asc", std::vector<lt::Value>{
        }, false));
    }

    SqlBuilder desc(std::vector<lt::Value> __a = {}) {
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "desc", std::vector<lt::Value>{
        }, false));
    }

    SqlBuilder as(std::vector<lt::Value> __a = {}) {
        lt::Value alias = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"as\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "as", std::vector<lt::Value>{
            lt::map({{"arg", alias}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder col(std::vector<lt::Value> __a = {}) {
        lt::Value column = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"col\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "col", std::vector<lt::Value>{
            lt::map({{"arg", column}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder table(std::vector<lt::Value> __a = {}) {
        lt::Value table = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"table\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "table", std::vector<lt::Value>{
            lt::map({{"arg", table}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"string", lt::map({{"type", lt::string("string")}})}}), lt::map({{"number", lt::map({{"type", lt::string("number")}})}}), lt::map({{"boolean", lt::map({{"type", lt::string("boolean")}})}}), lt::map({{"structureCall", lt::map({{"name", lt::string("sql-builder")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    SqlBuilder setDialect(std::vector<lt::Value> __a = {}) {
        lt::Value db = __a.size() > 0 ? __a[0] : lt::null();
        if (__a.size() <= 0) throw std::runtime_error("Parameter \"setDialect\" argument #1 was not provided");
        return SqlBuilder().initFromStructure(Mc::create_schema(getSchema(), "setDialect", std::vector<lt::Value>{
            lt::map({{"arg", db}, {"struct", lt::map({{"union", lt::map({{"types", lt::array({lt::map({{"literal", lt::map({{"value", lt::string("postgres")}, {"type", lt::string("string")}})}}), lt::map({{"literal", lt::map({{"value", lt::string("mysql")}, {"type", lt::string("string")}})}}), lt::map({{"literal", lt::map({{"value", lt::string("sqlite")}, {"type", lt::string("string")}})}}), lt::map({{"literal", lt::map({{"value", lt::string("single-store")}, {"type", lt::string("string")}})}}), lt::map({{"literal", lt::map({{"value", lt::string("mssql")}, {"type", lt::string("string")}})}}), lt::map({{"literal", lt::map({{"value", lt::string("cockroach")}, {"type", lt::string("string")}})}})})}})}})}, {"provided", lt::boolean(__a.size() > 0)}})
        }, false));
    }

    lt::Value parse() {
        lt::Value root = this->getSchema();
        lt::Fns __fns;
        lt::Value dialect = lt::string("");
        lt::Value quote = lt::string("");
        lt::Value sql = lt::buf_new();
        lt::Value wsql = lt::buf_new();
        lt::Value params = lt::list_new();
        lt::Value orderSql = lt::string("");
        lt::Value orderW = lt::string("");
        lt::Value hasOrder = lt::boolean(false);
        lt::Value tmp = lt::string("");
        lt::Value tmp2 = lt::string("");
        lt::Value tmpRef = lt::string("");
        lt::Value subAlias = lt::string("");
        lt::Value withFirst = lt::boolean(true);
        __fns["normName"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value n = __a[0];
          return lt::to_lower(lt::replace(n, lt::string("-"), lt::string("")));
        };
        __fns["pushSql"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value text = __a[0];
          sql = lt::buf_append(sql, lt::string(" "));
          sql = lt::buf_append(sql, text);
          return lt::null();
        };
        __fns["pushW"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value text = __a[0];
          wsql = lt::buf_append(wsql, lt::string(" "));
          wsql = lt::buf_append(wsql, text);
          return lt::null();
        };
        __fns["asString"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value arg = __a[0];
          return lt::get(lt::get(arg, lt::string("string")), lt::string("value"));
        };
        __fns["identStr"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value name = __a[0];
          lt::Value escapedName = lt::replace(name, quote, lt::str_concat(quote, quote));
          lt::Value qualifiedName = lt::replace(escapedName, lt::string("."), lt::str_concat(quote, lt::str_concat(lt::string("."), quote)));
          return lt::str_concat(quote, lt::str_concat(qualifiedName, quote));
        };
        __fns["literalOf"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value arg = __a[0];
          lt::Value outLiteral = lt::string("");
          if (lt::truthy(lt::has(arg, lt::string("string")))) {
            outLiteral = lt::str_concat(lt::string("'"), lt::str_concat(lt::replace(lt::call(__fns, "asString", {arg}), lt::string("'"), lt::string("''")), lt::string("'")));
          }
          else if (lt::truthy(lt::has(arg, lt::string("number")))) {
            outLiteral = lt::to_string(lt::get(lt::get(arg, lt::string("number")), lt::string("value")));
          }
          else if (lt::truthy(lt::has(arg, lt::string("boolean")))) {
            if (lt::truthy(lt::get(lt::get(arg, lt::string("boolean")), lt::string("value")))) {
              outLiteral = lt::string("TRUE");
            }
            else {
              outLiteral = lt::string("FALSE");
            }
          }
          else {
            outLiteral = lt::string("NULL");
          }
          return outLiteral;
        };
        __fns["opOf"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value n = __a[0];
          lt::Value o = lt::string("");
          if (lt::value_equals(n, lt::string("eq"))) {
            o = lt::string("=");
          }
          else if (lt::value_equals(n, lt::string("gt"))) {
            o = lt::string(">");
          }
          else if (lt::value_equals(n, lt::string("gte"))) {
            o = lt::string(">=");
          }
          else if (lt::value_equals(n, lt::string("lt"))) {
            o = lt::string("<");
          }
          else if (lt::value_equals(n, lt::string("lte"))) {
            o = lt::string("<=");
          }
          else if (lt::value_equals(n, lt::string("like"))) {
            o = lt::string("LIKE");
          }
          else if (lt::value_equals(n, lt::string("ilike"))) {
            if (lt::value_equals(dialect, lt::string("postgres"))) {
              o = lt::string("ILIKE");
            }
            else {
              o = lt::string("LIKE");
            }
          }
          return o;
        };
        __fns["itemsOf"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value arg = __a[0];
          if (lt::truthy(lt::has(arg, lt::string("array")))) {
            return lt::get(lt::get(arg, lt::string("array")), lt::string("value"));
          }
          return lt::append(lt::array({}), arg);
        };
        __fns["isRef"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value chainValues = __a[0];
          tmpRef = lt::string("");
          if (lt::value_equals(lt::len(chainValues), lt::number(1)) && lt::truthy(lt::has(lt::index(chainValues, lt::number(0)), lt::string("functionCall")))) {
            lt::Value firstName = lt::get(lt::get(lt::index(chainValues, lt::number(0)), "functionCall"), "name");
            if (lt::value_equals(firstName, lt::string("col")) || lt::value_equals(firstName, lt::string("table"))) {
              tmpRef = lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(lt::index(chainValues, lt::number(0)), "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
            }
          }
          return tmpRef;
        };
        __fns["emitParam"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value arg = __a[0];
          params = lt::list_push(params, arg);
          if (lt::value_equals(dialect, lt::string("postgres"))) {
            tmp = lt::str_concat(lt::string("$"), lt::to_string(lt::list_len(params)));
          }
          else {
            tmp = lt::string("?");
          }
          lt::call(__fns, "pushSql", {tmp});
          tmp2 = lt::call(__fns, "literalOf", {arg});
          lt::call(__fns, "pushW", {tmp2});
          return lt::null();
        };
        __fns["emitIdent"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value name = __a[0];
          tmp = lt::call(__fns, "identStr", {name});
          lt::call(__fns, "pushSql", {tmp});
          lt::call(__fns, "pushW", {tmp});
          return lt::null();
        };
        __fns["emitRaw"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value node = __a[0];
          if (!lt::value_equals(lt::buf_len(sql), lt::number(0))) {
            sql = lt::buf_append(sql, lt::string(" "));
            wsql = lt::buf_append(wsql, lt::string(" "));
          }
          for (lt::Value rawArg : lt::array_items(lt::get(lt::get(node, "functionCall"), "arguments"))) {
            lt::Value rawVal = lt::get(rawArg, lt::string("argument"));
            if (lt::truthy(lt::has(rawVal, lt::string("string")))) {
              sql = lt::buf_append(sql, lt::call(__fns, "asString", {rawVal}));
              wsql = lt::buf_append(wsql, lt::call(__fns, "asString", {rawVal}));
            }
            else if (lt::truthy(lt::has(rawVal, lt::string("chain")))) {
              tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(rawVal, "chain"), "values")});
              if (!lt::value_equals(tmpRef, lt::string(""))) {
                sql = lt::buf_append(sql, lt::call(__fns, "identStr", {tmpRef}));
                wsql = lt::buf_append(wsql, lt::call(__fns, "identStr", {tmpRef}));
              }
              else {
                params = lt::list_push(params, rawVal);
                if (lt::value_equals(dialect, lt::string("postgres"))) {
                  tmp = lt::str_concat(lt::string("$"), lt::to_string(lt::list_len(params)));
                }
                else {
                  tmp = lt::string("?");
                }
                sql = lt::buf_append(sql, tmp);
                tmp2 = lt::call(__fns, "literalOf", {rawVal});
                wsql = lt::buf_append(wsql, tmp2);
              }
            }
            else {
              params = lt::list_push(params, rawVal);
              if (lt::value_equals(dialect, lt::string("postgres"))) {
                tmp = lt::str_concat(lt::string("$"), lt::to_string(lt::list_len(params)));
              }
              else {
                tmp = lt::string("?");
              }
              sql = lt::buf_append(sql, tmp);
              tmp2 = lt::call(__fns, "literalOf", {rawVal});
              wsql = lt::buf_append(wsql, tmp2);
            }
          }
          return lt::null();
        };
        __fns["conflictTarget"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value arg = __a[0];
          lt::Value ct = lt::string("()");
          if (lt::truthy(lt::has(arg, lt::string("chain")))) {
            tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(arg, "chain"), "values")});
            if (!lt::value_equals(tmpRef, lt::string(""))) {
              ct = lt::str_concat(lt::string("("), lt::str_concat(lt::call(__fns, "identStr", {tmpRef}), lt::string(")")));
            }
          }
          else if (lt::truthy(lt::has(arg, lt::string("string")))) {
            ct = lt::str_concat(lt::string("("), lt::str_concat(lt::call(__fns, "identStr", {lt::call(__fns, "asString", {arg})}), lt::string(")")));
          }
          return ct;
        };
        __fns["firstKind"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value chainValues = __a[0];
          lt::Value kind = lt::string("");
          if (!lt::value_equals(lt::len(chainValues), lt::number(0)) && lt::truthy(lt::has(lt::index(chainValues, lt::number(0)), lt::string("functionCall")))) {
            kind = lt::call(__fns, "normName", {lt::get(lt::get(lt::index(chainValues, lt::number(0)), "functionCall"), "name")});
          }
          return kind;
        };
        __fns["emitOrderItem"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value item = __a[0];
          lt::Value dir = lt::string("");
          lt::Value ordName = lt::string("");
          if (lt::truthy(lt::has(item, lt::string("chain")))) {
            for (lt::Value on : lt::array_items(lt::get(lt::get(item, "chain"), "values"))) {
              lt::Value onn = lt::call(__fns, "normName", {lt::get(lt::get(on, "functionCall"), "name")});
              if (lt::value_equals(onn, lt::string("asc"))) {
                dir = lt::string(" ASC");
              }
              else if (lt::value_equals(onn, lt::string("desc"))) {
                dir = lt::string(" DESC");
              }
              else if (lt::value_equals(onn, lt::string("col")) || lt::value_equals(onn, lt::string("table"))) {
                ordName = lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(on, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
              }
            }
          }
          if (!lt::value_equals(ordName, lt::string(""))) {
            tmp = lt::call(__fns, "identStr", {ordName});
            orderSql = lt::str_concat(orderSql, lt::str_concat(tmp, dir));
            orderW = lt::str_concat(orderW, lt::str_concat(tmp, dir));
          }
          return lt::null();
        };
        __fns["emitOrderList"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value arg = __a[0];
          lt::Value firstOrder = lt::boolean(true);
          for (lt::Value item : lt::array_items(lt::call(__fns, "itemsOf", {arg}))) {
            if (lt::value_equals(firstOrder, lt::boolean(false))) {
              orderSql = lt::str_concat(orderSql, lt::string(", "));
              orderW = lt::str_concat(orderW, lt::string(", "));
            }
            firstOrder = lt::boolean(false);
            lt::call(__fns, "emitOrderItem", {item});
          }
          return lt::null();
        };
        __fns["flushOrder"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          if (lt::truthy(hasOrder)) {
            lt::call(__fns, "pushSql", {lt::string("ORDER")});
            lt::call(__fns, "pushSql", {lt::string("BY")});
            lt::call(__fns, "pushW", {lt::string("ORDER")});
            lt::call(__fns, "pushW", {lt::string("BY")});
            tmp = orderSql;
            if (!lt::value_equals(tmp, lt::string(""))) {
              lt::call(__fns, "pushSql", {tmp});
            }
            tmp2 = orderW;
            if (!lt::value_equals(tmp2, lt::string(""))) {
              lt::call(__fns, "pushW", {tmp2});
            }
            hasOrder = lt::boolean(false);
          }
          return lt::null();
        };
        for (lt::Value dialectNode : lt::array_items(lt::get(lt::get(lt::get(lt::get(root, "schema"), "chain"), "chain"), "values"))) {
          if (lt::value_equals(lt::call(__fns, "normName", {lt::get(lt::get(dialectNode, "functionCall"), "name")}), lt::string("setdialect"))) {
            dialect = lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(dialectNode, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("string")), lt::string("value"));
          }
        }
        if (lt::value_equals(dialect, lt::string(""))) {
          throw std::runtime_error(lt::as_string(lt::string("sql-builder parse: setDialect(...) must be called before parse()")));
        }
        else if (!lt::value_equals(dialect, lt::string("postgres")) && !lt::value_equals(dialect, lt::string("mysql"))) {
          throw std::runtime_error(lt::as_string(lt::str_concat(lt::string("sql-builder parse: unsupported dialect "), dialect)));
        }
        if (lt::value_equals(dialect, lt::string("mysql"))) {
          quote = lt::string("`");
        }
        else {
          quote = lt::string("\"");
        }
        __fns["renderNodes"] = [&](std::vector<lt::Value> __a) -> lt::Value {
          lt::Value nodes = __a[0];
          lt::Value mode = __a[1];
          lt::Value savedSql = lt::string("");
          lt::Value savedW = lt::string("");
          lt::Value savedOrderSql = lt::string("");
          lt::Value savedOrderW = lt::string("");
          lt::Value savedHasOrder = lt::boolean(false);
          lt::Value savedAlias = lt::string("");
          lt::Value subSql = lt::string("");
          lt::Value subW = lt::string("");
          lt::Value subAliasText = lt::string("");
          lt::Value first = lt::boolean(true);
          lt::Value left = lt::string("");
          lt::Value hasLeft = lt::boolean(false);
          lt::Value base = lt::string("");
          if (lt::value_equals(mode, lt::number(0))) {
            for (lt::Value node : lt::array_items(nodes)) {
              if (lt::truthy(lt::has(node, lt::string("functionCall")))) {
                lt::Value name = lt::get(lt::get(node, "functionCall"), "name");
                lt::Value nameNorm = lt::call(__fns, "normName", {name});
                if (lt::value_equals(nameNorm, lt::string("setdialect"))) {
                  continue;
                }
                else if (lt::value_equals(nameNorm, lt::string("asc")) || lt::value_equals(nameNorm, lt::string("desc"))) {
                  if (lt::truthy(hasOrder)) {
                    tmp = lt::to_upper(nameNorm);
                    orderSql = lt::str_concat(orderSql, lt::str_concat(lt::string(" "), tmp));
                    orderW = lt::str_concat(orderW, lt::str_concat(lt::string(" "), tmp));
                  }
                }
                else {
                  if (lt::value_equals(nameNorm, lt::string("with"))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    sql = lt::buf_new();
                    wsql = lt::buf_new();
                    orderSql = lt::string("");
                    orderW = lt::string("");
                    hasOrder = lt::boolean(false);
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                    subSql = lt::trim(lt::buf_str(sql));
                    subW = lt::trim(lt::buf_str(wsql));
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    if (lt::value_equals(withFirst, lt::boolean(false))) {
                      sql = lt::buf_append(sql, lt::string(","));
                      wsql = lt::buf_append(wsql, lt::string(","));
                    }
                    else {
                      withFirst = lt::boolean(false);
                      lt::call(__fns, "pushSql", {lt::string("WITH")});
                      lt::call(__fns, "pushW", {lt::string("WITH")});
                    }
                    lt::call(__fns, "pushSql", {lt::call(__fns, "identStr", {lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument"))})})});
                    lt::call(__fns, "pushW", {lt::call(__fns, "identStr", {lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument"))})})});
                    lt::call(__fns, "pushSql", {lt::string("AS")});
                    lt::call(__fns, "pushW", {lt::string("AS")});
                    lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                    lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("transaction"))) {
                    lt::call(__fns, "pushSql", {lt::string("BEGIN")});
                    lt::call(__fns, "pushW", {lt::string("BEGIN")});
                    sql = lt::buf_append(sql, lt::string(";"));
                    wsql = lt::buf_append(wsql, lt::string(";"));
                    lt::Value txnFirst = lt::boolean(true);
                    for (lt::Value txnItem : lt::array_items(lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))}))) {
                      if (lt::value_equals(txnFirst, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(";"));
                        wsql = lt::buf_append(wsql, lt::string(";"));
                      }
                      txnFirst = lt::boolean(false);
                      if (lt::truthy(lt::has(txnItem, lt::string("chain")))) {
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(txnItem, "chain"), "values"), lt::number(0)});
                      }
                      else if (lt::truthy(lt::has(txnItem, lt::string("string")))) {
                        lt::call(__fns, "pushSql", {lt::call(__fns, "asString", {txnItem})});
                        lt::call(__fns, "pushW", {lt::call(__fns, "asString", {txnItem})});
                      }
                      else {
                        if (lt::truthy(lt::has(txnItem, lt::string("chain")))) {
                          tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(txnItem, "chain"), "values")});
                          if (!lt::value_equals(tmpRef, lt::string(""))) {
                            lt::call(__fns, "emitIdent", {tmpRef});
                          }
                          else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(txnItem, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(txnItem, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(txnItem, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(txnItem, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(txnItem, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(txnItem, "chain"), "values")}), lt::string("delete")))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = lt::buf_new();
                            wsql = lt::buf_new();
                            orderSql = lt::string("");
                            orderW = lt::string("");
                            hasOrder = lt::boolean(false);
                            subAlias = lt::string("");
                            lt::call(__fns, "renderNodes", {lt::get(lt::get(txnItem, "chain"), "values"), lt::number(0)});
                            subSql = lt::trim(lt::buf_str(sql));
                            subW = lt::trim(lt::buf_str(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                            lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                            if (!lt::value_equals(subAliasText, lt::string(""))) {
                              lt::call(__fns, "pushSql", {subAliasText});
                              lt::call(__fns, "pushW", {subAliasText});
                            }
                          }
                          else {
                            lt::call(__fns, "emitParam", {txnItem});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {txnItem});
                        }
                      }
                    }
                    if (lt::value_equals(txnFirst, lt::boolean(false))) {
                      sql = lt::buf_append(sql, lt::string(";"));
                      wsql = lt::buf_append(wsql, lt::string(";"));
                    }
                    lt::call(__fns, "pushSql", {lt::string("COMMIT")});
                    lt::call(__fns, "pushW", {lt::string("COMMIT")});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("select"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("SELECT")});
                    lt::call(__fns, "pushW", {lt::string("SELECT")});
                    lt::Value firstItem = lt::boolean(true);
                    for (lt::Value item : lt::array_items(lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))}))) {
                      if (lt::value_equals(firstItem, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(","));
                        wsql = lt::buf_append(wsql, lt::string(","));
                      }
                      firstItem = lt::boolean(false);
                      if (lt::truthy(lt::has(item, lt::string("chain")))) {
                        tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(item, "chain"), "values")});
                        if (!lt::value_equals(tmpRef, lt::string(""))) {
                          lt::call(__fns, "emitIdent", {tmpRef});
                        }
                        else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = lt::buf_new();
                          wsql = lt::buf_new();
                          orderSql = lt::string("");
                          orderW = lt::string("");
                          hasOrder = lt::boolean(false);
                          subAlias = lt::string("");
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(item, "chain"), "values"), lt::number(0)});
                          subSql = lt::trim(lt::buf_str(sql));
                          subW = lt::trim(lt::buf_str(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                          lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                          if (!lt::value_equals(subAliasText, lt::string(""))) {
                            lt::call(__fns, "pushSql", {subAliasText});
                            lt::call(__fns, "pushW", {subAliasText});
                          }
                        }
                        else {
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(item, "chain"), "values"), lt::number(1)});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {item});
                      }
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("from"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("FROM")});
                    lt::call(__fns, "pushW", {lt::string("FROM")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("join"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("JOIN")});
                    lt::call(__fns, "pushW", {lt::string("JOIN")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                    lt::call(__fns, "pushSql", {lt::string("ON")});
                    lt::call(__fns, "pushW", {lt::string("ON")});
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("leftjoin"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("LEFT JOIN")});
                    lt::call(__fns, "pushW", {lt::string("LEFT JOIN")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                    lt::call(__fns, "pushSql", {lt::string("ON")});
                    lt::call(__fns, "pushW", {lt::string("ON")});
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("rightjoin"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("RIGHT JOIN")});
                    lt::call(__fns, "pushW", {lt::string("RIGHT JOIN")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                    lt::call(__fns, "pushSql", {lt::string("ON")});
                    lt::call(__fns, "pushW", {lt::string("ON")});
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("innerjoin"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("INNER JOIN")});
                    lt::call(__fns, "pushW", {lt::string("INNER JOIN")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                    lt::call(__fns, "pushSql", {lt::string("ON")});
                    lt::call(__fns, "pushW", {lt::string("ON")});
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("fulljoin"))) {
                    if (lt::value_equals(dialect, lt::string("mysql"))) {
                      throw std::runtime_error(lt::as_string(lt::string("sql-builder parse: FULL JOIN is not supported by mysql")));
                    }
                    else {
                      lt::call(__fns, "flushOrder", {});
                      lt::call(__fns, "pushSql", {lt::string("FULL JOIN")});
                      lt::call(__fns, "pushW", {lt::string("FULL JOIN")});
                      if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                        tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                        if (!lt::value_equals(tmpRef, lt::string(""))) {
                          lt::call(__fns, "emitIdent", {tmpRef});
                        }
                        else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = lt::buf_new();
                          wsql = lt::buf_new();
                          orderSql = lt::string("");
                          orderW = lt::string("");
                          hasOrder = lt::boolean(false);
                          subAlias = lt::string("");
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                          subSql = lt::trim(lt::buf_str(sql));
                          subW = lt::trim(lt::buf_str(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                          lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                          if (!lt::value_equals(subAliasText, lt::string(""))) {
                            lt::call(__fns, "pushSql", {subAliasText});
                            lt::call(__fns, "pushW", {subAliasText});
                          }
                        }
                        else {
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                      }
                      lt::call(__fns, "pushSql", {lt::string("ON")});
                      lt::call(__fns, "pushW", {lt::string("ON")});
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("crossjoin"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("CROSS JOIN")});
                    lt::call(__fns, "pushW", {lt::string("CROSS JOIN")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                    lt::call(__fns, "pushSql", {lt::string("ON")});
                    lt::call(__fns, "pushW", {lt::string("ON")});
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("where"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("WHERE")});
                    lt::call(__fns, "pushW", {lt::string("WHERE")});
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("groupby"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("GROUP BY")});
                    lt::call(__fns, "pushW", {lt::string("GROUP BY")});
                    lt::Value firstItem = lt::boolean(true);
                    for (lt::Value item : lt::array_items(lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))}))) {
                      if (lt::value_equals(firstItem, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(","));
                        wsql = lt::buf_append(wsql, lt::string(","));
                      }
                      firstItem = lt::boolean(false);
                      if (lt::truthy(lt::has(item, lt::string("chain")))) {
                        tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(item, "chain"), "values")});
                        if (!lt::value_equals(tmpRef, lt::string(""))) {
                          lt::call(__fns, "emitIdent", {tmpRef});
                        }
                        else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = lt::buf_new();
                          wsql = lt::buf_new();
                          orderSql = lt::string("");
                          orderW = lt::string("");
                          hasOrder = lt::boolean(false);
                          subAlias = lt::string("");
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(item, "chain"), "values"), lt::number(0)});
                          subSql = lt::trim(lt::buf_str(sql));
                          subW = lt::trim(lt::buf_str(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                          lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                          if (!lt::value_equals(subAliasText, lt::string(""))) {
                            lt::call(__fns, "pushSql", {subAliasText});
                            lt::call(__fns, "pushW", {subAliasText});
                          }
                        }
                        else {
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(item, "chain"), "values"), lt::number(1)});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {item});
                      }
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("having"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("HAVING")});
                    lt::call(__fns, "pushW", {lt::string("HAVING")});
                    lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("returning"))) {
                    if (lt::value_equals(dialect, lt::string("mysql"))) {
                      throw std::runtime_error(lt::as_string(lt::string("sql-builder parse: RETURNING is not supported by mysql")));
                    }
                    else {
                      lt::call(__fns, "flushOrder", {});
                      lt::call(__fns, "pushSql", {lt::string("RETURNING")});
                      lt::call(__fns, "pushW", {lt::string("RETURNING")});
                      lt::Value firstItem = lt::boolean(true);
                      for (lt::Value item : lt::array_items(lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))}))) {
                        if (lt::value_equals(firstItem, lt::boolean(false))) {
                          sql = lt::buf_append(sql, lt::string(","));
                          wsql = lt::buf_append(wsql, lt::string(","));
                        }
                        firstItem = lt::boolean(false);
                        if (lt::truthy(lt::has(item, lt::string("chain")))) {
                          tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(item, "chain"), "values")});
                          if (!lt::value_equals(tmpRef, lt::string(""))) {
                            lt::call(__fns, "emitIdent", {tmpRef});
                          }
                          else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(item, "chain"), "values")}), lt::string("delete")))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = lt::buf_new();
                            wsql = lt::buf_new();
                            orderSql = lt::string("");
                            orderW = lt::string("");
                            hasOrder = lt::boolean(false);
                            subAlias = lt::string("");
                            lt::call(__fns, "renderNodes", {lt::get(lt::get(item, "chain"), "values"), lt::number(0)});
                            subSql = lt::trim(lt::buf_str(sql));
                            subW = lt::trim(lt::buf_str(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                            lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                            if (!lt::value_equals(subAliasText, lt::string(""))) {
                              lt::call(__fns, "pushSql", {subAliasText});
                              lt::call(__fns, "pushW", {subAliasText});
                            }
                          }
                          else {
                            lt::call(__fns, "renderNodes", {lt::get(lt::get(item, "chain"), "values"), lt::number(1)});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {item});
                        }
                      }
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("orderby"))) {
                    hasOrder = lt::boolean(true);
                    orderSql = lt::string("");
                    orderW = lt::string("");
                    lt::call(__fns, "emitOrderList", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("limit"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("LIMIT")});
                    lt::call(__fns, "pushW", {lt::string("LIMIT")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("offset"))) {
                    lt::call(__fns, "flushOrder", {});
                    lt::call(__fns, "pushSql", {lt::string("OFFSET")});
                    lt::call(__fns, "pushW", {lt::string("OFFSET")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("raw"))) {
                    lt::call(__fns, "emitRaw", {node});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("as"))) {
                    subAlias = lt::str_concat(lt::string("AS "), lt::call(__fns, "identStr", {lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})}));
                  }
                  else if (lt::value_equals(nameNorm, lt::string("update"))) {
                    lt::call(__fns, "pushSql", {lt::string("UPDATE")});
                    lt::call(__fns, "pushW", {lt::string("UPDATE")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                    lt::call(__fns, "pushSql", {lt::string("SET")});
                    lt::call(__fns, "pushW", {lt::string("SET")});
                    lt::Value assnFirst = lt::boolean(true);
                    for (lt::Value ak : lt::array_items(lt::keys(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value")))) {
                      if (lt::value_equals(assnFirst, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(","));
                        wsql = lt::buf_append(wsql, lt::string(","));
                      }
                      assnFirst = lt::boolean(false);
                      lt::call(__fns, "pushSql", {lt::call(__fns, "identStr", {ak})});
                      lt::call(__fns, "pushW", {lt::call(__fns, "identStr", {ak})});
                      lt::call(__fns, "pushSql", {lt::string("=")});
                      lt::call(__fns, "pushW", {lt::string("=")});
                      if (lt::truthy(lt::has(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), lt::string("chain")))) {
                        tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")});
                        if (!lt::value_equals(tmpRef, lt::string(""))) {
                          lt::call(__fns, "emitIdent", {tmpRef});
                        }
                        else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = lt::buf_new();
                          wsql = lt::buf_new();
                          orderSql = lt::string("");
                          orderW = lt::string("");
                          hasOrder = lt::boolean(false);
                          subAlias = lt::string("");
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values"), lt::number(0)});
                          subSql = lt::trim(lt::buf_str(sql));
                          subW = lt::trim(lt::buf_str(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                          lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                          if (!lt::value_equals(subAliasText, lt::string(""))) {
                            lt::call(__fns, "pushSql", {subAliasText});
                            lt::call(__fns, "pushW", {subAliasText});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak)});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak)});
                      }
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("insert"))) {
                    lt::call(__fns, "pushSql", {lt::string("INSERT")});
                    lt::call(__fns, "pushW", {lt::string("INSERT")});
                    lt::call(__fns, "pushSql", {lt::string("INTO")});
                    lt::call(__fns, "pushW", {lt::string("INTO")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                    lt::call(__fns, "pushSql", {lt::string("(")});
                    lt::call(__fns, "pushW", {lt::string("(")});
                    lt::Value colFirst = lt::boolean(true);
                    for (lt::Value ck : lt::array_items(lt::keys(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value")))) {
                      if (lt::value_equals(colFirst, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(","));
                        wsql = lt::buf_append(wsql, lt::string(","));
                      }
                      colFirst = lt::boolean(false);
                      lt::call(__fns, "pushSql", {lt::call(__fns, "identStr", {ck})});
                      lt::call(__fns, "pushW", {lt::call(__fns, "identStr", {ck})});
                    }
                    lt::call(__fns, "pushSql", {lt::string(")")});
                    lt::call(__fns, "pushW", {lt::string(")")});
                    lt::call(__fns, "pushSql", {lt::string("VALUES")});
                    lt::call(__fns, "pushW", {lt::string("VALUES")});
                    lt::call(__fns, "pushSql", {lt::string("(")});
                    lt::call(__fns, "pushW", {lt::string("(")});
                    lt::Value valFirst = lt::boolean(true);
                    for (lt::Value vk : lt::array_items(lt::keys(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value")))) {
                      if (lt::value_equals(valFirst, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(","));
                        wsql = lt::buf_append(wsql, lt::string(","));
                      }
                      valFirst = lt::boolean(false);
                      if (lt::truthy(lt::has(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), lt::string("chain")))) {
                        tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values")});
                        if (!lt::value_equals(tmpRef, lt::string(""))) {
                          lt::call(__fns, "emitIdent", {tmpRef});
                        }
                        else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values")}), lt::string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = lt::buf_new();
                          wsql = lt::buf_new();
                          orderSql = lt::string("");
                          orderW = lt::string("");
                          hasOrder = lt::boolean(false);
                          subAlias = lt::string("");
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk), "chain"), "values"), lt::number(0)});
                          subSql = lt::trim(lt::buf_str(sql));
                          subW = lt::trim(lt::buf_str(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                          lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                          if (!lt::value_equals(subAliasText, lt::string(""))) {
                            lt::call(__fns, "pushSql", {subAliasText});
                            lt::call(__fns, "pushW", {subAliasText});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk)});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), vk)});
                      }
                    }
                    lt::call(__fns, "pushSql", {lt::string(")")});
                    lt::call(__fns, "pushW", {lt::string(")")});
                  }
                  else if (lt::value_equals(nameNorm, lt::string("delete"))) {
                    lt::call(__fns, "pushSql", {lt::string("DELETE")});
                    lt::call(__fns, "pushW", {lt::string("DELETE")});
                    lt::call(__fns, "pushSql", {lt::string("FROM")});
                    lt::call(__fns, "pushW", {lt::string("FROM")});
                    if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                      tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                      if (!lt::value_equals(tmpRef, lt::string(""))) {
                        lt::call(__fns, "emitIdent", {tmpRef});
                      }
                      else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = lt::buf_new();
                        wsql = lt::buf_new();
                        orderSql = lt::string("");
                        orderW = lt::string("");
                        hasOrder = lt::boolean(false);
                        subAlias = lt::string("");
                        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                        subSql = lt::trim(lt::buf_str(sql));
                        subW = lt::trim(lt::buf_str(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                        lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                        if (!lt::value_equals(subAliasText, lt::string(""))) {
                          lt::call(__fns, "pushSql", {subAliasText});
                          lt::call(__fns, "pushW", {subAliasText});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("set"))) {
                    lt::call(__fns, "pushSql", {lt::string("SET")});
                    lt::call(__fns, "pushW", {lt::string("SET")});
                    lt::Value assnFirst = lt::boolean(true);
                    for (lt::Value ak : lt::array_items(lt::keys(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value")))) {
                      if (lt::value_equals(assnFirst, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(","));
                        wsql = lt::buf_append(wsql, lt::string(","));
                      }
                      assnFirst = lt::boolean(false);
                      lt::call(__fns, "pushSql", {lt::call(__fns, "identStr", {ak})});
                      lt::call(__fns, "pushW", {lt::call(__fns, "identStr", {ak})});
                      lt::call(__fns, "pushSql", {lt::string("=")});
                      lt::call(__fns, "pushW", {lt::string("=")});
                      if (lt::truthy(lt::has(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), lt::string("chain")))) {
                        tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")});
                        if (!lt::value_equals(tmpRef, lt::string(""))) {
                          lt::call(__fns, "emitIdent", {tmpRef});
                        }
                        else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = lt::buf_new();
                          wsql = lt::buf_new();
                          orderSql = lt::string("");
                          orderW = lt::string("");
                          hasOrder = lt::boolean(false);
                          subAlias = lt::string("");
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak), "chain"), "values"), lt::number(0)});
                          subSql = lt::trim(lt::buf_str(sql));
                          subW = lt::trim(lt::buf_str(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                          lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                          if (!lt::value_equals(subAliasText, lt::string(""))) {
                            lt::call(__fns, "pushSql", {subAliasText});
                            lt::call(__fns, "pushW", {subAliasText});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak)});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "object"), "value"), ak)});
                      }
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("values"))) {
                    lt::call(__fns, "pushSql", {lt::string("VALUES")});
                    lt::call(__fns, "pushW", {lt::string("VALUES")});
                    lt::Value valueRows = lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    lt::Value valueFirst = lt::boolean(true);
                    if (!lt::value_equals(lt::len(valueRows), lt::number(0)) && lt::truthy(lt::has(lt::index(valueRows, lt::number(0)), lt::string("array")))) {
                      for (lt::Value tuple : lt::array_items(valueRows)) {
                        if (lt::value_equals(valueFirst, lt::boolean(false))) {
                          sql = lt::buf_append(sql, lt::string(","));
                          wsql = lt::buf_append(wsql, lt::string(","));
                        }
                        valueFirst = lt::boolean(false);
                        if (lt::value_equals(dialect, lt::string("mysql"))) {
                          lt::call(__fns, "pushSql", {lt::string("ROW")});
                          lt::call(__fns, "pushW", {lt::string("ROW")});
                        }
                        lt::call(__fns, "pushSql", {lt::string("(")});
                        lt::call(__fns, "pushW", {lt::string("(")});
                        lt::Value itemFirst = lt::boolean(true);
                        for (lt::Value ti : lt::array_items(lt::call(__fns, "itemsOf", {tuple}))) {
                          if (lt::value_equals(itemFirst, lt::boolean(false))) {
                            sql = lt::buf_append(sql, lt::string(","));
                            wsql = lt::buf_append(wsql, lt::string(","));
                          }
                          itemFirst = lt::boolean(false);
                          if (lt::truthy(lt::has(ti, lt::string("chain")))) {
                            tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(ti, "chain"), "values")});
                            if (!lt::value_equals(tmpRef, lt::string(""))) {
                              lt::call(__fns, "emitIdent", {tmpRef});
                            }
                            else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("delete")))))) {
                              savedSql = sql;
                              savedW = wsql;
                              savedOrderSql = orderSql;
                              savedOrderW = orderW;
                              savedHasOrder = hasOrder;
                              savedAlias = subAlias;
                              sql = lt::buf_new();
                              wsql = lt::buf_new();
                              orderSql = lt::string("");
                              orderW = lt::string("");
                              hasOrder = lt::boolean(false);
                              subAlias = lt::string("");
                              lt::call(__fns, "renderNodes", {lt::get(lt::get(ti, "chain"), "values"), lt::number(0)});
                              subSql = lt::trim(lt::buf_str(sql));
                              subW = lt::trim(lt::buf_str(wsql));
                              subAliasText = subAlias;
                              sql = savedSql;
                              wsql = savedW;
                              orderSql = savedOrderSql;
                              orderW = savedOrderW;
                              hasOrder = savedHasOrder;
                              subAlias = savedAlias;
                              lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                              lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                              if (!lt::value_equals(subAliasText, lt::string(""))) {
                                lt::call(__fns, "pushSql", {subAliasText});
                                lt::call(__fns, "pushW", {subAliasText});
                              }
                            }
                            else {
                              lt::call(__fns, "emitParam", {ti});
                            }
                          }
                          else {
                            lt::call(__fns, "emitParam", {ti});
                          }
                        }
                        lt::call(__fns, "pushSql", {lt::string(")")});
                        lt::call(__fns, "pushW", {lt::string(")")});
                      }
                    }
                    else {
                      if (lt::value_equals(dialect, lt::string("mysql"))) {
                        lt::call(__fns, "pushSql", {lt::string("ROW")});
                        lt::call(__fns, "pushW", {lt::string("ROW")});
                      }
                      lt::call(__fns, "pushSql", {lt::string("(")});
                      lt::call(__fns, "pushW", {lt::string("(")});
                      lt::Value itemFirst = lt::boolean(true);
                      for (lt::Value ti : lt::array_items(valueRows)) {
                        if (lt::value_equals(itemFirst, lt::boolean(false))) {
                          sql = lt::buf_append(sql, lt::string(","));
                          wsql = lt::buf_append(wsql, lt::string(","));
                        }
                        itemFirst = lt::boolean(false);
                        if (lt::truthy(lt::has(ti, lt::string("chain")))) {
                          tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(ti, "chain"), "values")});
                          if (!lt::value_equals(tmpRef, lt::string(""))) {
                            lt::call(__fns, "emitIdent", {tmpRef});
                          }
                          else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(ti, "chain"), "values")}), lt::string("delete")))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = lt::buf_new();
                            wsql = lt::buf_new();
                            orderSql = lt::string("");
                            orderW = lt::string("");
                            hasOrder = lt::boolean(false);
                            subAlias = lt::string("");
                            lt::call(__fns, "renderNodes", {lt::get(lt::get(ti, "chain"), "values"), lt::number(0)});
                            subSql = lt::trim(lt::buf_str(sql));
                            subW = lt::trim(lt::buf_str(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                            lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                            if (!lt::value_equals(subAliasText, lt::string(""))) {
                              lt::call(__fns, "pushSql", {subAliasText});
                              lt::call(__fns, "pushW", {subAliasText});
                            }
                          }
                          else {
                            lt::call(__fns, "emitParam", {ti});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {ti});
                        }
                      }
                      lt::call(__fns, "pushSql", {lt::string(")")});
                      lt::call(__fns, "pushW", {lt::string(")")});
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("onconflictdonothing"))) {
                    if (lt::value_equals(dialect, lt::string("mysql"))) {
                      throw std::runtime_error(lt::as_string(lt::string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")));
                    }
                    else {
                      lt::call(__fns, "pushSql", {lt::string("ON")});
                      lt::call(__fns, "pushW", {lt::string("ON")});
                      lt::call(__fns, "pushSql", {lt::string("CONFLICT")});
                      lt::call(__fns, "pushW", {lt::string("CONFLICT")});
                      lt::call(__fns, "pushSql", {lt::call(__fns, "conflictTarget", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                      lt::call(__fns, "pushW", {lt::call(__fns, "conflictTarget", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                      lt::call(__fns, "pushSql", {lt::string("DO")});
                      lt::call(__fns, "pushW", {lt::string("DO")});
                      lt::call(__fns, "pushSql", {lt::string("NOTHING")});
                      lt::call(__fns, "pushW", {lt::string("NOTHING")});
                    }
                  }
                  else if (lt::value_equals(nameNorm, lt::string("onconflictdoupdate"))) {
                    if (lt::value_equals(dialect, lt::string("mysql"))) {
                      lt::call(__fns, "pushSql", {lt::string("ON")});
                      lt::call(__fns, "pushW", {lt::string("ON")});
                      lt::call(__fns, "pushSql", {lt::string("DUPLICATE")});
                      lt::call(__fns, "pushW", {lt::string("DUPLICATE")});
                      lt::call(__fns, "pushSql", {lt::string("KEY")});
                      lt::call(__fns, "pushW", {lt::string("KEY")});
                      lt::call(__fns, "pushSql", {lt::string("UPDATE")});
                      lt::call(__fns, "pushW", {lt::string("UPDATE")});
                      lt::Value assnFirst = lt::boolean(true);
                      for (lt::Value ak : lt::array_items(lt::keys(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value")))) {
                        if (lt::value_equals(assnFirst, lt::boolean(false))) {
                          sql = lt::buf_append(sql, lt::string(","));
                          wsql = lt::buf_append(wsql, lt::string(","));
                        }
                        assnFirst = lt::boolean(false);
                        lt::call(__fns, "pushSql", {lt::call(__fns, "identStr", {ak})});
                        lt::call(__fns, "pushW", {lt::call(__fns, "identStr", {ak})});
                        lt::call(__fns, "pushSql", {lt::string("=")});
                        lt::call(__fns, "pushW", {lt::string("=")});
                        if (lt::truthy(lt::has(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), lt::string("chain")))) {
                          tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")});
                          if (!lt::value_equals(tmpRef, lt::string(""))) {
                            lt::call(__fns, "emitIdent", {tmpRef});
                          }
                          else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("delete")))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = lt::buf_new();
                            wsql = lt::buf_new();
                            orderSql = lt::string("");
                            orderW = lt::string("");
                            hasOrder = lt::boolean(false);
                            subAlias = lt::string("");
                            lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values"), lt::number(0)});
                            subSql = lt::trim(lt::buf_str(sql));
                            subW = lt::trim(lt::buf_str(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                            lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                            if (!lt::value_equals(subAliasText, lt::string(""))) {
                              lt::call(__fns, "pushSql", {subAliasText});
                              lt::call(__fns, "pushW", {subAliasText});
                            }
                          }
                          else {
                            lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak)});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak)});
                        }
                      }
                    }
                    else {
                      lt::call(__fns, "pushSql", {lt::string("ON")});
                      lt::call(__fns, "pushW", {lt::string("ON")});
                      lt::call(__fns, "pushSql", {lt::string("CONFLICT")});
                      lt::call(__fns, "pushW", {lt::string("CONFLICT")});
                      lt::call(__fns, "pushSql", {lt::call(__fns, "conflictTarget", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                      lt::call(__fns, "pushW", {lt::call(__fns, "conflictTarget", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                      lt::call(__fns, "pushSql", {lt::string("DO")});
                      lt::call(__fns, "pushW", {lt::string("DO")});
                      lt::call(__fns, "pushSql", {lt::string("UPDATE")});
                      lt::call(__fns, "pushW", {lt::string("UPDATE")});
                      lt::call(__fns, "pushSql", {lt::string("SET")});
                      lt::call(__fns, "pushW", {lt::string("SET")});
                      lt::Value assnFirst = lt::boolean(true);
                      for (lt::Value ak : lt::array_items(lt::keys(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value")))) {
                        if (lt::value_equals(assnFirst, lt::boolean(false))) {
                          sql = lt::buf_append(sql, lt::string(","));
                          wsql = lt::buf_append(wsql, lt::string(","));
                        }
                        assnFirst = lt::boolean(false);
                        lt::call(__fns, "pushSql", {lt::call(__fns, "identStr", {ak})});
                        lt::call(__fns, "pushW", {lt::call(__fns, "identStr", {ak})});
                        lt::call(__fns, "pushSql", {lt::string("=")});
                        lt::call(__fns, "pushW", {lt::string("=")});
                        if (lt::truthy(lt::has(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), lt::string("chain")))) {
                          tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")});
                          if (!lt::value_equals(tmpRef, lt::string(""))) {
                            lt::call(__fns, "emitIdent", {tmpRef});
                          }
                          else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values")}), lt::string("delete")))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = lt::buf_new();
                            wsql = lt::buf_new();
                            orderSql = lt::string("");
                            orderW = lt::string("");
                            hasOrder = lt::boolean(false);
                            subAlias = lt::string("");
                            lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak), "chain"), "values"), lt::number(0)});
                            subSql = lt::trim(lt::buf_str(sql));
                            subW = lt::trim(lt::buf_str(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                            lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                            if (!lt::value_equals(subAliasText, lt::string(""))) {
                              lt::call(__fns, "pushSql", {subAliasText});
                              lt::call(__fns, "pushW", {subAliasText});
                            }
                          }
                          else {
                            lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak)});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {lt::get(lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "object"), "value"), ak)});
                        }
                      }
                    }
                  }
                  else {
                    throw std::runtime_error(lt::as_string(lt::str_concat(lt::string("sql-builder parse: unsupported clause "), name)));
                  }
                }
              }
            }
            lt::call(__fns, "flushOrder", {});
            return lt::null();
          }
          else {
            first = lt::boolean(true);
            left = lt::string("");
            hasLeft = lt::boolean(false);
            base = lt::string("");
            for (lt::Value node : lt::array_items(nodes)) {
              lt::Value pn = lt::call(__fns, "normName", {lt::get(lt::get(node, "functionCall"), "name")});
              lt::Value op = lt::call(__fns, "opOf", {pn});
              if (lt::truthy(lt::has(node, lt::string("functionCall")))) {
                if (lt::value_equals(pn, lt::string("col")) || lt::value_equals(pn, lt::string("table"))) {
                  left = lt::call(__fns, "identStr", {lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                  hasLeft = lt::boolean(true);
                }
                else if (lt::truthy(op)) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call(__fns, "pushSql", {base});
                  lt::call(__fns, "pushW", {base});
                  lt::call(__fns, "pushSql", {op});
                  lt::call(__fns, "pushW", {op});
                  if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                    tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                    if (!lt::value_equals(tmpRef, lt::string(""))) {
                      lt::call(__fns, "emitIdent", {tmpRef});
                    }
                    else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = lt::buf_new();
                      wsql = lt::buf_new();
                      orderSql = lt::string("");
                      orderW = lt::string("");
                      hasOrder = lt::boolean(false);
                      subAlias = lt::string("");
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                      subSql = lt::trim(lt::buf_str(sql));
                      subW = lt::trim(lt::buf_str(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                      lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                      if (!lt::value_equals(subAliasText, lt::string(""))) {
                        lt::call(__fns, "pushSql", {subAliasText});
                        lt::call(__fns, "pushW", {subAliasText});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                  }
                  else {
                    lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("exists"))) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  lt::call(__fns, "pushSql", {lt::string("EXISTS")});
                  lt::call(__fns, "pushW", {lt::string("EXISTS")});
                  if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                    tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                    if (!lt::value_equals(tmpRef, lt::string(""))) {
                      lt::call(__fns, "emitIdent", {tmpRef});
                    }
                    else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = lt::buf_new();
                      wsql = lt::buf_new();
                      orderSql = lt::string("");
                      orderW = lt::string("");
                      hasOrder = lt::boolean(false);
                      subAlias = lt::string("");
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                      subSql = lt::trim(lt::buf_str(sql));
                      subW = lt::trim(lt::buf_str(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                      lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                      if (!lt::value_equals(subAliasText, lt::string(""))) {
                        lt::call(__fns, "pushSql", {subAliasText});
                        lt::call(__fns, "pushW", {subAliasText});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                  }
                  else {
                    lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("in"))) {
                  if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                    if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                      if (lt::value_equals(first, lt::boolean(false))) {
                        lt::call(__fns, "pushSql", {lt::string("AND")});
                        lt::call(__fns, "pushW", {lt::string("AND")});
                      }
                      first = lt::boolean(false);
                      if (lt::truthy(hasLeft)) {
                        base = left;
                      }
                      else {
                        base = lt::string("?");
                      }
                      lt::call(__fns, "pushSql", {base});
                      lt::call(__fns, "pushW", {base});
                      lt::call(__fns, "pushSql", {lt::string("IN")});
                      lt::call(__fns, "pushW", {lt::string("IN")});
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = lt::buf_new();
                      wsql = lt::buf_new();
                      orderSql = lt::string("");
                      orderW = lt::string("");
                      hasOrder = lt::boolean(false);
                      subAlias = lt::string("");
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                      subSql = lt::trim(lt::buf_str(sql));
                      subW = lt::trim(lt::buf_str(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                      lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                      if (!lt::value_equals(subAliasText, lt::string(""))) {
                        lt::call(__fns, "pushSql", {subAliasText});
                        lt::call(__fns, "pushW", {subAliasText});
                      }
                    }
                    else {
                      if (lt::value_equals(first, lt::boolean(false))) {
                        lt::call(__fns, "pushSql", {lt::string("AND")});
                        lt::call(__fns, "pushW", {lt::string("AND")});
                      }
                      first = lt::boolean(false);
                      if (lt::truthy(hasLeft)) {
                        base = left;
                      }
                      else {
                        base = lt::string("?");
                      }
                      lt::call(__fns, "pushSql", {base});
                      lt::call(__fns, "pushW", {base});
                      lt::call(__fns, "pushSql", {lt::string("IN (")});
                      lt::call(__fns, "pushW", {lt::string("IN (")});
                      lt::Value inFirst = lt::boolean(true);
                      for (lt::Value iv : lt::array_items(lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))}))) {
                        if (lt::value_equals(inFirst, lt::boolean(false))) {
                          sql = lt::buf_append(sql, lt::string(","));
                          wsql = lt::buf_append(wsql, lt::string(","));
                        }
                        inFirst = lt::boolean(false);
                        if (lt::truthy(lt::has(iv, lt::string("chain")))) {
                          tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(iv, "chain"), "values")});
                          if (!lt::value_equals(tmpRef, lt::string(""))) {
                            lt::call(__fns, "emitIdent", {tmpRef});
                          }
                          else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("delete")))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = lt::buf_new();
                            wsql = lt::buf_new();
                            orderSql = lt::string("");
                            orderW = lt::string("");
                            hasOrder = lt::boolean(false);
                            subAlias = lt::string("");
                            lt::call(__fns, "renderNodes", {lt::get(lt::get(iv, "chain"), "values"), lt::number(0)});
                            subSql = lt::trim(lt::buf_str(sql));
                            subW = lt::trim(lt::buf_str(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                            lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                            if (!lt::value_equals(subAliasText, lt::string(""))) {
                              lt::call(__fns, "pushSql", {subAliasText});
                              lt::call(__fns, "pushW", {subAliasText});
                            }
                          }
                          else {
                            lt::call(__fns, "emitParam", {iv});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {iv});
                        }
                      }
                      lt::call(__fns, "pushSql", {lt::string(")")});
                      lt::call(__fns, "pushW", {lt::string(")")});
                    }
                  }
                  else {
                    if (lt::value_equals(first, lt::boolean(false))) {
                      lt::call(__fns, "pushSql", {lt::string("AND")});
                      lt::call(__fns, "pushW", {lt::string("AND")});
                    }
                    first = lt::boolean(false);
                    if (lt::truthy(hasLeft)) {
                      base = left;
                    }
                    else {
                      base = lt::string("?");
                    }
                    lt::call(__fns, "pushSql", {base});
                    lt::call(__fns, "pushW", {base});
                    lt::call(__fns, "pushSql", {lt::string("IN (")});
                    lt::call(__fns, "pushW", {lt::string("IN (")});
                    lt::Value inFirst = lt::boolean(true);
                    for (lt::Value iv : lt::array_items(lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))}))) {
                      if (lt::value_equals(inFirst, lt::boolean(false))) {
                        sql = lt::buf_append(sql, lt::string(","));
                        wsql = lt::buf_append(wsql, lt::string(","));
                      }
                      inFirst = lt::boolean(false);
                      if (lt::truthy(lt::has(iv, lt::string("chain")))) {
                        tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(iv, "chain"), "values")});
                        if (!lt::value_equals(tmpRef, lt::string(""))) {
                          lt::call(__fns, "emitIdent", {tmpRef});
                        }
                        else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(iv, "chain"), "values")}), lt::string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = lt::buf_new();
                          wsql = lt::buf_new();
                          orderSql = lt::string("");
                          orderW = lt::string("");
                          hasOrder = lt::boolean(false);
                          subAlias = lt::string("");
                          lt::call(__fns, "renderNodes", {lt::get(lt::get(iv, "chain"), "values"), lt::number(0)});
                          subSql = lt::trim(lt::buf_str(sql));
                          subW = lt::trim(lt::buf_str(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                          lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                          if (!lt::value_equals(subAliasText, lt::string(""))) {
                            lt::call(__fns, "pushSql", {subAliasText});
                            lt::call(__fns, "pushW", {subAliasText});
                          }
                        }
                        else {
                          lt::call(__fns, "emitParam", {iv});
                        }
                      }
                      else {
                        lt::call(__fns, "emitParam", {iv});
                      }
                    }
                    lt::call(__fns, "pushSql", {lt::string(")")});
                    lt::call(__fns, "pushW", {lt::string(")")});
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("between"))) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call(__fns, "pushSql", {base});
                  lt::call(__fns, "pushW", {base});
                  lt::call(__fns, "pushSql", {lt::string("BETWEEN")});
                  lt::call(__fns, "pushW", {lt::string("BETWEEN")});
                  if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), lt::string("chain")))) {
                    tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")});
                    if (!lt::value_equals(tmpRef, lt::string(""))) {
                      lt::call(__fns, "emitIdent", {tmpRef});
                    }
                    else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = lt::buf_new();
                      wsql = lt::buf_new();
                      orderSql = lt::string("");
                      orderW = lt::string("");
                      hasOrder = lt::boolean(false);
                      subAlias = lt::string("");
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                      subSql = lt::trim(lt::buf_str(sql));
                      subW = lt::trim(lt::buf_str(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                      lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                      if (!lt::value_equals(subAliasText, lt::string(""))) {
                        lt::call(__fns, "pushSql", {subAliasText});
                        lt::call(__fns, "pushW", {subAliasText});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                    }
                  }
                  else {
                    lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))});
                  }
                  lt::call(__fns, "pushSql", {lt::string("AND")});
                  lt::call(__fns, "pushW", {lt::string("AND")});
                  if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), lt::string("chain")))) {
                    tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")});
                    if (!lt::value_equals(tmpRef, lt::string(""))) {
                      lt::call(__fns, "emitIdent", {tmpRef});
                    }
                    else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = lt::buf_new();
                      wsql = lt::buf_new();
                      orderSql = lt::string("");
                      orderW = lt::string("");
                      hasOrder = lt::boolean(false);
                      subAlias = lt::string("");
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                      subSql = lt::trim(lt::buf_str(sql));
                      subW = lt::trim(lt::buf_str(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                      lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                      if (!lt::value_equals(subAliasText, lt::string(""))) {
                        lt::call(__fns, "pushSql", {subAliasText});
                        lt::call(__fns, "pushW", {subAliasText});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument"))});
                    }
                  }
                  else {
                    lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument"))});
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("isnull"))) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call(__fns, "pushSql", {base});
                  lt::call(__fns, "pushW", {base});
                  lt::call(__fns, "pushSql", {lt::string("IS NULL")});
                  lt::call(__fns, "pushW", {lt::string("IS NULL")});
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("isnotnull"))) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call(__fns, "pushSql", {base});
                  lt::call(__fns, "pushW", {base});
                  lt::call(__fns, "pushSql", {lt::string("IS NOT NULL")});
                  lt::call(__fns, "pushW", {lt::string("IS NOT NULL")});
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("not"))) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  lt::call(__fns, "pushSql", {lt::string("NOT (")});
                  lt::call(__fns, "pushW", {lt::string("NOT (")});
                  lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument")), "chain"), "values"), lt::number(1)});
                  lt::call(__fns, "pushSql", {lt::string(")")});
                  lt::call(__fns, "pushW", {lt::string(")")});
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("and")) || lt::value_equals(pn, lt::string("or"))) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  lt::call(__fns, "pushSql", {lt::string("(")});
                  lt::call(__fns, "pushW", {lt::string("(")});
                  lt::Value boolFirst = lt::boolean(true);
                  for (lt::Value bv : lt::array_items(lt::call(__fns, "itemsOf", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))}))) {
                    if (lt::value_equals(boolFirst, lt::boolean(false))) {
                      tmp = lt::to_upper(pn);
                      lt::call(__fns, "pushSql", {tmp});
                      lt::call(__fns, "pushW", {tmp});
                    }
                    boolFirst = lt::boolean(false);
                    if (lt::truthy(lt::has(bv, lt::string("chain")))) {
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(bv, "chain"), "values"), lt::number(1)});
                    }
                    else {
                      lt::call(__fns, "emitParam", {bv});
                    }
                  }
                  lt::call(__fns, "pushSql", {lt::string(")")});
                  lt::call(__fns, "pushW", {lt::string(")")});
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("as"))) {
                  if (lt::truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call(__fns, "pushSql", {base});
                  lt::call(__fns, "pushW", {base});
                  lt::call(__fns, "pushSql", {lt::string("AS")});
                  lt::call(__fns, "pushW", {lt::string("AS")});
                  lt::call(__fns, "emitIdent", {lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("op"))) {
                  if (lt::value_equals(first, lt::boolean(false))) {
                    lt::call(__fns, "pushSql", {lt::string("AND")});
                    lt::call(__fns, "pushW", {lt::string("AND")});
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call(__fns, "pushSql", {base});
                  lt::call(__fns, "pushW", {base});
                  lt::call(__fns, "pushSql", {lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                  lt::call(__fns, "pushW", {lt::call(__fns, "asString", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(0)), lt::string("argument"))})});
                  if (lt::truthy(lt::has(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), lt::string("chain")))) {
                    tmpRef = lt::call(__fns, "isRef", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")});
                    if (!lt::value_equals(tmpRef, lt::string(""))) {
                      lt::call(__fns, "emitIdent", {tmpRef});
                    }
                    else if ((lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("select")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("with"))) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("values")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("insert")) || (lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("update")) || lt::value_equals(lt::call(__fns, "firstKind", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values")}), lt::string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = lt::buf_new();
                      wsql = lt::buf_new();
                      orderSql = lt::string("");
                      orderW = lt::string("");
                      hasOrder = lt::boolean(false);
                      subAlias = lt::string("");
                      lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument")), "chain"), "values"), lt::number(0)});
                      subSql = lt::trim(lt::buf_str(sql));
                      subW = lt::trim(lt::buf_str(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      lt::call(__fns, "pushSql", {lt::str_concat(lt::string("("), lt::str_concat(subSql, lt::string(")")))});
                      lt::call(__fns, "pushW", {lt::str_concat(lt::string("("), lt::str_concat(subW, lt::string(")")))});
                      if (!lt::value_equals(subAliasText, lt::string(""))) {
                        lt::call(__fns, "pushSql", {subAliasText});
                        lt::call(__fns, "pushW", {subAliasText});
                      }
                    }
                    else {
                      lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument"))});
                    }
                  }
                  else {
                    lt::call(__fns, "emitParam", {lt::get(lt::index(lt::get(lt::get(node, "functionCall"), "arguments"), lt::number(1)), lt::string("argument"))});
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(pn, lt::string("raw"))) {
                  lt::call(__fns, "emitRaw", {node});
                }
                else {
                  throw std::runtime_error(lt::as_string(lt::string("sql-builder parse: unsupported predicate")));
                }
              }
            }
            return lt::null();
          }
        };
        lt::call(__fns, "renderNodes", {lt::get(lt::get(lt::get(lt::get(root, "schema"), "chain"), "chain"), "values"), lt::number(0)});
        sql = lt::buf_str(sql);
        wsql = lt::buf_str(wsql);
        params = lt::list_value(params);
        return lt::map({{"sql", lt::trim(sql)}, {"sqlWithParam", lt::trim(wsql)}, {"param", lt::params(params)}});
    }

};

struct Init {
    static SqlBuilder sqlBuilder(std::string variableName, std::vector<lt::Value> copies = {}) {
        SqlBuilder structure = SqlBuilder();
        lt::Value variableNameValue = variableName.empty() ? lt::get(lt::get(lt::get(lt::get(lt::get(structure.getSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName") : lt::string(variableName);
        structure.initFromInitFunction(lt::map({{"name", lt::string("sql-builder")}, {"variableName", variableNameValue}}), lt::array(copies));
        return structure;
    }

    static SqlBuilder sqlBuilder() { return sqlBuilder("", {}); }
};