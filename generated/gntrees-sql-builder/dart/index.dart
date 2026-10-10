// Auto-generated index for gntrees-sql-builder

import "lt.dart";

// parse() returns a Map<String, dynamic>: { "sql": String, "sqlWithParam": String, "param": List }

// Auto-generated Dart method-chain types.
//
// Dart has a universal top type (`dynamic`), so LT values are native Dart
// values (String / int / double / bool / null / List<dynamic> / Map<String, dynamic>),
// and there is no `Value` enum. The one shared abstraction is `Structure`: every
// generated builder class implements it, which lets the generic runtime
// (`copy` / `make_copy`) call `getSchema()`.

abstract class Structure {
  Map<String, dynamic> getSchema();
}


// Auto-generated Dart method-chain runtime (Lingua Tungga Gelombang 2).
//
// The static counterpart of `core/base/python/base-utils.py`. Schemas are plain
// nested `Map<String, dynamic>`s; the generator inlines this fragment as
// top-level functions in the generated `index.dart` (Dart has no `object`
// singleton, so the Kotlin `object Mc` becomes free functions and call sites
// read `create_schema(...)` instead of `Mc.create_schema(...)`).
//
// `normalize_argument_structure_call` and `copy` are *not* defined here: like
// the TypeScript/Python runtimes they are emitted by the generator because they
// reference the project's structure classes.

String _typeof(Object? value) {
  if (value == null) return "object";
  if (value is bool) return "boolean";
  if (value is num) return "number";
  if (value is String) return "string";
  if (value is List || value is Map) return "object";
  return value.runtimeType.toString();
}

void validate_schema(Object? schema) {
  const message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction";
  if (schema is! Map) throw LtError(message);
  final inner = Lt.get(schema, "schema");
  if (inner is! Map) throw LtError(message);
  final chain = Lt.get(inner, "chain");
  if (chain is! Map) throw LtError(message);
  final chainChain = Lt.get(chain, "chain");
  if (chainChain is! Map) throw LtError(message);
  if (Lt.get(chainChain, "values") is! List || !Lt.truthy(Lt.get(chainChain, "initFunction"))) {
    throw LtError(message);
  }
}

dynamic unwrap_argument_value(Object? value) {
  if (value is! Map) throw LtError("Unknown argument value type");
  if (Lt.has(value, "string")) return Lt.get(Lt.get(value, "string"), "value");
  if (Lt.has(value, "number")) return Lt.get(Lt.get(value, "number"), "value");
  if (Lt.has(value, "boolean")) return Lt.get(Lt.get(value, "boolean"), "value");
  if (Lt.has(value, "null")) return Lt.get(Lt.get(value, "null"), "value");
  if (Lt.has(value, "array")) {
    final out = <dynamic>[];
    for (final item in Lt.items(Lt.get(Lt.get(value, "array"), "value"))) {
      out.add(unwrap_argument_value(item));
    }
    return out;
  }
  if (Lt.has(value, "object")) {
    final out = <String, dynamic>{};
    Lt.asMap(Lt.get(Lt.get(value, "object"), "value")).forEach((key, item) {
      out[key] = unwrap_argument_value(item);
    });
    return out;
  }
  if (Lt.has(value, "chain")) throw LtError("Cannot validate a chain default value at runtime");
  throw LtError("Unknown argument value type");
}

void validate_default(Object? defaultVal, Object? struct) {
  normalize_argument(unwrap_argument_value(defaultVal), struct);
}

dynamic normalize_argument(Object? arg, Object? struct) {
  if (struct is! Map) throw LtError("Unsupported struct type in normalizeArgument");

  if (Lt.has(struct, "array")) {
    if (arg is! List) throw LtError("Expected an array argument, but got " + _typeof(arg));
    if (Lt.items(arg).isEmpty) {
      return Lt.map({"array": Lt.map({"value": Lt.array(<dynamic>[])})});
    }
    final itemType = Lt.get(Lt.get(struct, "array"), "type");
    final normalizedItems = <dynamic>[];
    for (final item in Lt.items(arg)) {
      normalizedItems.add(normalize_argument(item, itemType));
    }
    if (normalizedItems[0] == null) throw LtError("Unexpected undefined value in array");
    return Lt.map({"array": Lt.map({"value": normalizedItems})});
  }

  if (Lt.has(struct, "object")) {
    if (arg is! Map) throw LtError("Expected an object argument, but got " + _typeof(arg));
    final declared = Lt.get(struct, "object");
    final missingKeys = <String>[];
    for (final key in Lt.items(Lt.keys(declared))) {
      if (!Lt.has(arg, key)) missingKeys.add(Lt.asString(key));
    }
    if (missingKeys.isNotEmpty) {
      throw LtError("Missing required key(s) \"" + missingKeys.join("\", \"") + "\" in object argument");
    }
    final normalizedObject = <String, dynamic>{};
    Lt.asMap(arg).forEach((key, item) {
      if (!Lt.has(declared, key)) throw LtError("Unexpected key \"" + key + "\" in object argument");
      normalizedObject[key] = normalize_argument(item, Lt.get(declared, key));
    });
    return Lt.map({"object": Lt.map({"value": normalizedObject})});
  }

  if (Lt.has(struct, "string")) {
    if (arg is! String) throw LtError("Expected a string argument, but got " + _typeof(arg));
    return Lt.map({"string": Lt.map({"value": arg})});
  }

  if (Lt.has(struct, "number")) {
    if (arg is bool || arg is! num) {
      throw LtError("Expected a number argument, but got " + _typeof(arg));
    }
    // Dart promotes `arg` to `num` after the guard above.
    final number = arg.toDouble();
    if (!number.isFinite) throw LtError("Expected a finite number argument, but got " + number.toString());
    return Lt.map({"number": Lt.map({"value": number})});
  }

  if (Lt.has(struct, "boolean")) {
    if (arg is! bool) throw LtError("Expected a boolean argument, but got " + _typeof(arg));
    return Lt.map({"boolean": Lt.map({"value": arg})});
  }

  if (Lt.has(struct, "null")) {
    if (arg != null) throw LtError("Expected a null argument, but got " + _typeof(arg));
    return Lt.map({"null": Lt.map({"value": null})});
  }

  if (Lt.has(struct, "union")) {
    final reasons = <String>[];
    final normalizedUnionTypes = <dynamic>[];
    for (final unionType in Lt.items(Lt.get(Lt.get(struct, "union"), "types"))) {
      try {
        normalizedUnionTypes.add(normalize_argument(arg, unionType));
      } catch (error) {
        reasons.add(error is LtError ? error.message : error.toString());
      }
    }
    if (normalizedUnionTypes.isEmpty || normalizedUnionTypes[0] == null) {
      throw LtError("Argument does not match any type in the union: " + reasons.join(" | "));
    }
    if (normalizedUnionTypes.length > 1) {
      if (arg is List && Lt.items(arg).isEmpty) return normalizedUnionTypes[0];
      throw LtError("Argument matches multiple types in the union, which is ambiguous");
    }
    return normalizedUnionTypes[0];
  }

  if (Lt.has(struct, "map")) {
    if (arg is! Map) throw LtError("Expected an object argument for map type, but got " + _typeof(arg));
    final normalizedMap = <String, dynamic>{};
    final valueType = Lt.get(Lt.get(struct, "map"), "type");
    Lt.asMap(arg).forEach((key, item) {
      normalizedMap[key] = normalize_argument(item, valueType);
    });
    return Lt.map({"object": Lt.map({"value": normalizedMap})});
  }

  if (Lt.has(struct, "structureCall")) {
    return normalize_argument_structure_call(arg);
  }

  if (Lt.has(struct, "literal")) {
    final expected = Lt.get(Lt.get(struct, "literal"), "value");
    final literalType = Lt.get(Lt.get(struct, "literal"), "type");
    if (literalType == "string") {
      if (arg is! String) throw LtError("Expected a string literal argument, but got " + _typeof(arg));
      if (!Lt.valueEquals(arg, expected)) {
        throw LtError("Expected string literal " + Lt.json(expected) + ", but got " + Lt.json(arg));
      }
      return Lt.map({"string": Lt.map({"value": arg})});
    }
    if (literalType == "number") {
      if (arg is bool || arg is! num) {
        throw LtError("Expected a number literal argument, but got " + _typeof(arg));
      }
      if (!Lt.valueEquals(arg, expected)) {
        throw LtError("Expected number literal " + Lt.asString(expected) + ", but got " + Lt.asString(arg));
      }
      return Lt.map({"number": Lt.map({"value": arg})});
    }
    if (arg is! bool) throw LtError("Expected a boolean literal argument, but got " + _typeof(arg));
    if (!Lt.valueEquals(arg, expected)) {
      throw LtError("Expected boolean literal " + Lt.asString(expected) + ", but got " + Lt.asString(arg));
    }
    return Lt.map({"boolean": Lt.map({"value": arg})});
  }

  throw LtError("Unsupported struct type in normalizeArgument");
}

Map<String, dynamic> create_schema(Map<String, dynamic> oldSchema, String functionName, List<dynamic> functionArgs, bool isTemplateLiteral) {
  validate_schema(oldSchema);
  final old = Lt.asMap(Lt.get(oldSchema, "schema"));
  final oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"));

  final inner = <String, dynamic>{};
  old.forEach((key, value) => inner[key] = value);
  final values = List<dynamic>.from(Lt.items(Lt.get(oldChain, "values")));
  inner["chain"] = Lt.map({"chain": Lt.map({
    "values": values,
    "initFunction": Lt.get(oldChain, "initFunction"),
  })});
  final newSchema = Lt.map({"schema": inner});

  final args = <dynamic>[];
  if (isTemplateLiteral && functionArgs.isNotEmpty && functionArgs[0] != null) {
    final strings = Lt.get(functionArgs[0], "arg");
    if (strings is! List) throw LtError("Expected a template strings array for " + functionName);
    for (final text in Lt.items(strings)) {
      if (text is! String) throw LtError("Expected a template strings array for " + functionName);
    }
    final expressions = functionArgs.sublist(1, functionArgs.length);
    if (expressions.length != Lt.items(strings).length - 1) {
      throw LtError(
        "Template literal for " + functionName + " expects " + (Lt.items(strings).length - 1).toString()
          + " expression(s), but got " + expressions.length.toString(),
      );
    }
    for (var index = 0; index < Lt.items(strings).length; index++) {
      final text = Lt.asString(Lt.items(strings)[index]);
      if (text.isNotEmpty) {
        args.add(Lt.map({"argument": Lt.map({"string": Lt.map({"value": text})}), "default": null}));
      }
      if (index < expressions.length) {
        final expression = expressions[index];
        if (expression == null) throw LtError("Missing expression for template literal at index " + index.toString());
        args.add(Lt.map({
          "argument": normalize_argument(Lt.get(expression, "arg"), Lt.get(expression, "struct")),
          "default": null,
        }));
      }
    }
  } else {
    for (var index = 0; index < functionArgs.length; index++) {
      final functionArg = functionArgs[index];
      final arg = Lt.get(functionArg, "arg");
      if (Lt.isMissing(arg)) {
        if (Lt.truthy(Lt.get(functionArg, "provided"))) {
          throw LtError("Parameter \"" + functionName + "\" argument #" + (index + 1).toString() + " cannot be undefined");
        }
        final defaultVal = Lt.get(functionArg, "default");
        if (defaultVal != null) {
          validate_default(defaultVal, Lt.get(functionArg, "struct"));
          args.add(Lt.map({"argument": defaultVal, "default": defaultVal}));
          continue;
        }
        throw LtError("Parameter \"" + functionName + "\" argument #" + (index + 1).toString() + " was not provided");
      }
      final argument = normalize_argument(arg, Lt.get(functionArg, "struct"));
      final defaultVal = Lt.get(functionArg, "default");
      if (defaultVal != null) validate_default(defaultVal, Lt.get(functionArg, "struct"));
      args.add(Lt.map({"argument": argument, "default": defaultVal}));
    }
  }

  values.add(Lt.map({"functionCall": Lt.map({
    "name": functionName,
    "arguments": args,
    "isTemplateLiteral": isTemplateLiteral,
  })}));
  return newSchema;
}

Map<String, dynamic> create_property_call_schema(Map<String, dynamic> oldSchema, String propertyName) {
  final old = Lt.asMap(Lt.get(oldSchema, "schema"));
  final oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"));
  final values = List<dynamic>.from(Lt.items(Lt.get(oldChain, "values")));
  values.add(Lt.map({"propertyCall": Lt.map({"name": propertyName})}));

  final inner = <String, dynamic>{};
  old.forEach((key, value) => inner[key] = value);
  inner["chain"] = Lt.map({"chain": Lt.map({
    "values": values,
    "initFunction": Lt.get(oldChain, "initFunction"),
  })});
  return Lt.map({"schema": inner});
}

dynamic make_copy(String structureName, Structure source) {
  final schema = source.getSchema();
  validate_schema(schema);
  return Lt.map({"copy": Lt.map({
    "structureName": structureName,
    "chain": Lt.get(Lt.get(schema, "schema"), "chain"),
  })});
}

void apply_copies(Map<String, dynamic> schema, Object? copies, String targetStructureName) {
  if (!Lt.truthy(copies)) return;
  for (final cp in Lt.items(copies)) {
    if (
        cp is! Map
        || !Lt.has(cp, "copy")
        || Lt.get(cp, "copy") is! Map
        || Lt.get(Lt.get(cp, "copy"), "structureName") is! String
        || Lt.get(Lt.get(cp, "copy"), "chain") is! Map) {
      throw LtError("Invalid builder argument in init function: wrap the structure with copy(...)");
    }
    final name = Lt.asString(Lt.get(Lt.get(cp, "copy"), "structureName"));
    if (name != targetStructureName) {
      throw LtError("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'");
    }
    final value = Lt.map({"copy": Lt.map({
      "structureName": name,
      "chain": Lt.get(Lt.get(cp, "copy"), "chain"),
    })});
    // Navigate to the live `values` list and mutate it in place (Kotlin's
    // `Lt.asList(...).add(value)`): `Lt.asList` returns the same list for the
    // `List<dynamic>` schemas we build.
    final values = Lt.asList(Lt.get(Lt.get(Lt.get(schema, "schema"), "chain"), "chain")["values"]);
    values.add(value);
  }
}


dynamic normalize_argument_structure_call(Object? arg) {
  if (arg is SqlBuilder) {
    return Lt.get(Lt.get((arg as Structure).getSchema(), "schema"), "chain");
  }
  if (arg is Map) throw LtError("Unknown structure call argument type");
  final got = arg == null ? "null" : (arg is List ? "array" : _typeof(arg));
  throw LtError("Expected a structure instance for structure calls, but got " + got);
}

dynamic copy(Object? source) {
  if (source is SqlBuilder) return make_copy("sql-builder", source);
  throw LtError("copy() expects a structure instance created by an init function");
}

class SqlBuilder implements Structure {
  Map<String, dynamic> schemaSqlBuilder = Lt.map({"schema": Lt.map({"exportName": "schema", "importPaths": Lt.map({"typescript": "../../../gntrees-sql-builder/typescript/index"}), "chain": Lt.map({"chain": Lt.map({"values": Lt.array([]), "initFunction": Lt.map({"name": "sql-builder", "variableName": "s1"})})})})});

  @override
  Map<String, dynamic> getSchema() => schemaSqlBuilder;

  Map<String, dynamic> getSchemaWith(String? exportName, Map<String, dynamic>? importPaths) {
    final inner = Lt.asMap(Lt.get(schemaSqlBuilder, "schema"));
    if (exportName != null && exportName.isNotEmpty) inner["exportName"] = exportName;
    if (importPaths != null) {
      final merged = <String, dynamic>{};
      final existing = inner["importPaths"];
      if (existing is Map) merged.addAll(Lt.asMap(existing));
      merged.addAll(importPaths);
      inner["importPaths"] = merged;
    }
    return schemaSqlBuilder;
  }

  SqlBuilder initFromStructure(Map<String, dynamic> schema) {
    validate_schema(schema);
    schemaSqlBuilder = schema;
    return this;
  }

  SqlBuilder initFromInitFunction(Map<String, dynamic> initFunction, [Object? copies]) {
    if (Lt.get(initFunction, "name") is! String || Lt.get(initFunction, "variableName") is! String) {
      throw LtError("Invalid init function");
    }
    Lt.asMap(Lt.get(Lt.get(Lt.get(schemaSqlBuilder, "schema"), "chain"), "chain"))["initFunction"] = initFunction;
    apply_copies(schemaSqlBuilder, copies, "sql-builder");
    return this;
  }

  SqlBuilder select([List<dynamic> __a = const []]) {
    final columns = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(columns)) throw LtError("Parameter \"select\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "select", <dynamic>[
      Lt.map({"arg": columns, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})}), Lt.map({"map": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(columns)})
    ], false));
  }

  SqlBuilder from([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"from\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "from", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)})
    ], false));
  }

  SqlBuilder transaction([List<dynamic> __a = const []]) {
    final transaction = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(transaction)) throw LtError("Parameter \"transaction\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "transaction", <dynamic>[
      Lt.map({"arg": transaction, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(transaction)})
    ], false));
  }

  SqlBuilder orderBy([List<dynamic> __a = const []]) {
    final columns = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(columns)) throw LtError("Parameter \"orderBy\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "orderBy", <dynamic>[
      Lt.map({"arg": columns, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(columns)})
    ], false));
  }

  SqlBuilder limit([List<dynamic> __a = const []]) {
    final count = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(count)) throw LtError("Parameter \"limit\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "limit", <dynamic>[
      Lt.map({"arg": count, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(count)})
    ], false));
  }

  SqlBuilder offset([List<dynamic> __a = const []]) {
    final count = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(count)) throw LtError("Parameter \"offset\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "offset", <dynamic>[
      Lt.map({"arg": count, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(count)})
    ], false));
  }

  SqlBuilder with_([List<dynamic> __a = const []]) {
    final statement = __a.length > 0 ? __a[0] : Lt.MISSING;
    final as_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(statement)) throw LtError("Parameter \"with\" argument #1 was not provided");
    if (Lt.isMissing(as_)) throw LtError("Parameter \"with\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "with", <dynamic>[
      Lt.map({"arg": statement, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(statement)}),
      Lt.map({"arg": as_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(as_)})
    ], false));
  }

  SqlBuilder groupBy([List<dynamic> __a = const []]) {
    final columns = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(columns)) throw LtError("Parameter \"groupBy\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "groupBy", <dynamic>[
      Lt.map({"arg": columns, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(columns)})
    ], false));
  }

  SqlBuilder having([List<dynamic> __a = const []]) {
    final statement = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(statement)) throw LtError("Parameter \"having\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "having", <dynamic>[
      Lt.map({"arg": statement, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(statement)})
    ], false));
  }

  SqlBuilder where([List<dynamic> __a = const []]) {
    final statement = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(statement)) throw LtError("Parameter \"where\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "where", <dynamic>[
      Lt.map({"arg": statement, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(statement)})
    ], false));
  }

  SqlBuilder update([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final set_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"update\" argument #1 was not provided");
    if (Lt.isMissing(set_)) throw LtError("Parameter \"update\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "update", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": set_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"map": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(set_)})
    ], false));
  }

  SqlBuilder set_([List<dynamic> __a = const []]) {
    final statement = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(statement)) throw LtError("Parameter \"set\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "set", <dynamic>[
      Lt.map({"arg": statement, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"map": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(statement)})
    ], false));
  }

  SqlBuilder insert([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final set_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"insert\" argument #1 was not provided");
    if (Lt.isMissing(set_)) throw LtError("Parameter \"insert\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "insert", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": set_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"map": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(set_)})
    ], false));
  }

  SqlBuilder values([List<dynamic> __a = const []]) {
    final values = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(values)) throw LtError("Parameter \"values\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "values", <dynamic>[
      Lt.map({"arg": values, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})}), Lt.map({"array": Lt.map({"type": Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})})})])})}), "provided": !Lt.isMissing(values)})
    ], false));
  }

  SqlBuilder returning([List<dynamic> __a = const []]) {
    final columns = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(columns)) throw LtError("Parameter \"returning\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "returning", <dynamic>[
      Lt.map({"arg": columns, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})}), Lt.map({"map": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(columns)})
    ], false));
  }

  SqlBuilder onConflictDoNothing([List<dynamic> __a = const []]) {
    final target = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(target)) throw LtError("Parameter \"onConflictDoNothing\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "onConflictDoNothing", <dynamic>[
      Lt.map({"arg": target, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(target)})
    ], false));
  }

  SqlBuilder onConflictDoUpdate([List<dynamic> __a = const []]) {
    final target = __a.length > 0 ? __a[0] : Lt.MISSING;
    final set_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(target)) throw LtError("Parameter \"onConflictDoUpdate\" argument #1 was not provided");
    if (Lt.isMissing(set_)) throw LtError("Parameter \"onConflictDoUpdate\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "onConflictDoUpdate", <dynamic>[
      Lt.map({"arg": target, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(target)}),
      Lt.map({"arg": set_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"map": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(set_)})
    ], false));
  }

  SqlBuilder delete([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"delete\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "delete", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)})
    ], false));
  }

  SqlBuilder join([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final on_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"join\" argument #1 was not provided");
    if (Lt.isMissing(on_)) throw LtError("Parameter \"join\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "join", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": on_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(on_)})
    ], false));
  }

  SqlBuilder leftJoin([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final on_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"leftJoin\" argument #1 was not provided");
    if (Lt.isMissing(on_)) throw LtError("Parameter \"leftJoin\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "leftJoin", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": on_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(on_)})
    ], false));
  }

  SqlBuilder rightJoin([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final on_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"rightJoin\" argument #1 was not provided");
    if (Lt.isMissing(on_)) throw LtError("Parameter \"rightJoin\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "rightJoin", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": on_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(on_)})
    ], false));
  }

  SqlBuilder innerJoin([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final on_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"innerJoin\" argument #1 was not provided");
    if (Lt.isMissing(on_)) throw LtError("Parameter \"innerJoin\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "innerJoin", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": on_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(on_)})
    ], false));
  }

  SqlBuilder fullJoin([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final on_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"fullJoin\" argument #1 was not provided");
    if (Lt.isMissing(on_)) throw LtError("Parameter \"fullJoin\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "fullJoin", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": on_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(on_)})
    ], false));
  }

  SqlBuilder crossJoin([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    final on_ = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"crossJoin\" argument #1 was not provided");
    if (Lt.isMissing(on_)) throw LtError("Parameter \"crossJoin\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "crossJoin", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)}),
      Lt.map({"arg": on_, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(on_)})
    ], false));
  }

  SqlBuilder eq([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"eq\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "eq", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder gt([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"gt\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "gt", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder gte([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"gte\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "gte", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder lt([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"lt\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "lt", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder lte([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"lte\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "lte", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder exists([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"exists\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "exists", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder isNull([List<dynamic> __a = const []]) {
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "isNull", <dynamic>[
    ], false));
  }

  SqlBuilder isNotNull([List<dynamic> __a = const []]) {
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "isNotNull", <dynamic>[
    ], false));
  }

  SqlBuilder in_([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"in\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "in", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder between([List<dynamic> __a = const []]) {
    final first = __a.length > 0 ? __a[0] : Lt.MISSING;
    final second = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(first)) throw LtError("Parameter \"between\" argument #1 was not provided");
    if (Lt.isMissing(second)) throw LtError("Parameter \"between\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "between", <dynamic>[
      Lt.map({"arg": first, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(first)}),
      Lt.map({"arg": second, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(second)})
    ], false));
  }

  SqlBuilder like([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"like\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "like", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder ilike([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"ilike\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "ilike", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder not([List<dynamic> __a = const []]) {
    final value = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(value)) throw LtError("Parameter \"not\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "not", <dynamic>[
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder and([List<dynamic> __a = const []]) {
    final values = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(values)) throw LtError("Parameter \"and\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "and", <dynamic>[
      Lt.map({"arg": values, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(values)})
    ], false));
  }

  SqlBuilder or([List<dynamic> __a = const []]) {
    final values = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(values)) throw LtError("Parameter \"or\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "or", <dynamic>[
      Lt.map({"arg": values, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), Lt.map({"array": Lt.map({"type": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})})})])})}), "provided": !Lt.isMissing(values)})
    ], false));
  }

  SqlBuilder op([List<dynamic> __a = const []]) {
    final operation = __a.length > 0 ? __a[0] : Lt.MISSING;
    final value = __a.length > 1 ? __a[1] : Lt.MISSING;
    if (Lt.isMissing(operation)) throw LtError("Parameter \"op\" argument #1 was not provided");
    if (Lt.isMissing(value)) throw LtError("Parameter \"op\" argument #2 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "op", <dynamic>[
      Lt.map({"arg": operation, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(operation)}),
      Lt.map({"arg": value, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(value)})
    ], false));
  }

  SqlBuilder raw([List<dynamic> __a = const []]) {
    final __fargs = <dynamic>[];
    __fargs.add(Lt.map({"arg": __a.length > 0 ? __a[0] : Lt.MISSING, "struct": Lt.map({"string": Lt.map({"type": "string"})})}));
    for (var __i = 1; __i < __a.length; __i++) {
      __fargs.add(Lt.map({"arg": __a[__i], "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})})}));
    }
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "raw", __fargs, true));
  }

  SqlBuilder asc([List<dynamic> __a = const []]) {
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "asc", <dynamic>[
    ], false));
  }

  SqlBuilder desc([List<dynamic> __a = const []]) {
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "desc", <dynamic>[
    ], false));
  }

  SqlBuilder as_([List<dynamic> __a = const []]) {
    final alias = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(alias)) throw LtError("Parameter \"as\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "as", <dynamic>[
      Lt.map({"arg": alias, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(alias)})
    ], false));
  }

  SqlBuilder col([List<dynamic> __a = const []]) {
    final column = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(column)) throw LtError("Parameter \"col\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "col", <dynamic>[
      Lt.map({"arg": column, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(column)})
    ], false));
  }

  SqlBuilder table([List<dynamic> __a = const []]) {
    final table = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(table)) throw LtError("Parameter \"table\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "table", <dynamic>[
      Lt.map({"arg": table, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"string": Lt.map({"type": "string"})}), Lt.map({"number": Lt.map({"type": "number"})}), Lt.map({"boolean": Lt.map({"type": "boolean"})}), Lt.map({"structureCall": Lt.map({"name": "sql-builder"})})])})}), "provided": !Lt.isMissing(table)})
    ], false));
  }

  SqlBuilder setDialect([List<dynamic> __a = const []]) {
    final db = __a.length > 0 ? __a[0] : Lt.MISSING;
    if (Lt.isMissing(db)) throw LtError("Parameter \"setDialect\" argument #1 was not provided");
    return SqlBuilder().initFromStructure(create_schema(getSchema(), "setDialect", <dynamic>[
      Lt.map({"arg": db, "struct": Lt.map({"union": Lt.map({"types": Lt.array([Lt.map({"literal": Lt.map({"value": "postgres", "type": "string"})}), Lt.map({"literal": Lt.map({"value": "mysql", "type": "string"})}), Lt.map({"literal": Lt.map({"value": "sqlite", "type": "string"})}), Lt.map({"literal": Lt.map({"value": "single-store", "type": "string"})}), Lt.map({"literal": Lt.map({"value": "mssql", "type": "string"})}), Lt.map({"literal": Lt.map({"value": "cockroach", "type": "string"})})])})}), "provided": !Lt.isMissing(db)})
    ], false));
  }

  dynamic parse([List<dynamic> __a = const []]) {
    dynamic root = this.getSchema();
    final __fns = <String, dynamic Function(List<dynamic>)>{};
    dynamic dialect = Lt.string("");
    dynamic quote = Lt.string("");
    dynamic sql = Lt.bufNew();
    dynamic wsql = Lt.bufNew();
    dynamic params = Lt.listNew();
    dynamic orderSql = Lt.string("");
    dynamic orderW = Lt.string("");
    dynamic hasOrder = Lt.boolean(false);
    dynamic tmp = Lt.string("");
    dynamic tmp2 = Lt.string("");
    dynamic tmpRef = Lt.string("");
    dynamic subAlias = Lt.string("");
    dynamic withFirst = Lt.boolean(true);
    __fns["normName"] = (List<dynamic> __a) {
      final n = __a[0];
      return Lt.toLower(Lt.replace(n, Lt.string("-"), Lt.string("")));
      return Lt.nullValue();
    };
    __fns["pushSql"] = (List<dynamic> __a) {
      final text = __a[0];
      sql = Lt.bufAppend(sql, Lt.string(" "));
      sql = Lt.bufAppend(sql, text);
      return Lt.nullValue();
      return Lt.nullValue();
    };
    __fns["pushW"] = (List<dynamic> __a) {
      final text = __a[0];
      wsql = Lt.bufAppend(wsql, Lt.string(" "));
      wsql = Lt.bufAppend(wsql, text);
      return Lt.nullValue();
      return Lt.nullValue();
    };
    __fns["asString"] = (List<dynamic> __a) {
      final arg = __a[0];
      return Lt.get(Lt.get(arg, Lt.string("string")), Lt.string("value"));
      return Lt.nullValue();
    };
    __fns["identStr"] = (List<dynamic> __a) {
      final name = __a[0];
      dynamic escapedName = Lt.replace(name, quote, Lt.strConcat(quote, quote));
      dynamic qualifiedName = Lt.replace(escapedName, Lt.string("."), Lt.strConcat(quote, Lt.strConcat(Lt.string("."), quote)));
      return Lt.strConcat(quote, Lt.strConcat(qualifiedName, quote));
      return Lt.nullValue();
    };
    __fns["literalOf"] = (List<dynamic> __a) {
      final arg = __a[0];
      dynamic outLiteral = Lt.string("");
      if (Lt.truthy(Lt.has(arg, Lt.string("string")))) {
        outLiteral = Lt.strConcat(Lt.string("'"), Lt.strConcat(Lt.replace(__fns["asString"]!([arg]), Lt.string("'"), Lt.string("''")), Lt.string("'")));
      }
      else if (Lt.truthy(Lt.has(arg, Lt.string("number")))) {
        outLiteral = Lt.asString(Lt.get(Lt.get(arg, Lt.string("number")), Lt.string("value")));
      }
      else if (Lt.truthy(Lt.has(arg, Lt.string("boolean")))) {
        if (Lt.truthy(Lt.get(Lt.get(arg, Lt.string("boolean")), Lt.string("value")))) {
          outLiteral = Lt.string("TRUE");
        }
        else {
          outLiteral = Lt.string("FALSE");
        }
      }
      else {
        outLiteral = Lt.string("NULL");
      }
      return outLiteral;
      return Lt.nullValue();
    };
    __fns["opOf"] = (List<dynamic> __a) {
      final n = __a[0];
      dynamic o = Lt.string("");
      if (Lt.valueEquals(n, Lt.string("eq"))) {
        o = Lt.string("=");
      }
      else if (Lt.valueEquals(n, Lt.string("gt"))) {
        o = Lt.string(">");
      }
      else if (Lt.valueEquals(n, Lt.string("gte"))) {
        o = Lt.string(">=");
      }
      else if (Lt.valueEquals(n, Lt.string("lt"))) {
        o = Lt.string("<");
      }
      else if (Lt.valueEquals(n, Lt.string("lte"))) {
        o = Lt.string("<=");
      }
      else if (Lt.valueEquals(n, Lt.string("like"))) {
        o = Lt.string("LIKE");
      }
      else if (Lt.valueEquals(n, Lt.string("ilike"))) {
        if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
          o = Lt.string("ILIKE");
        }
        else {
          o = Lt.string("LIKE");
        }
      }
      return o;
      return Lt.nullValue();
    };
    __fns["itemsOf"] = (List<dynamic> __a) {
      final arg = __a[0];
      if (Lt.truthy(Lt.has(arg, Lt.string("array")))) {
        return Lt.get(Lt.get(arg, Lt.string("array")), Lt.string("value"));
      }
      return Lt.append(Lt.array([]), arg);
      return Lt.nullValue();
    };
    __fns["isRef"] = (List<dynamic> __a) {
      final chainValues = __a[0];
      tmpRef = Lt.string("");
      if (Lt.valueEquals(Lt.len(chainValues), Lt.number(1)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall")))) {
        dynamic firstName = Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name");
        if (Lt.valueEquals(firstName, Lt.string("col")) || Lt.valueEquals(firstName, Lt.string("table"))) {
          tmpRef = __fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
        }
      }
      return tmpRef;
      return Lt.nullValue();
    };
    __fns["emitParam"] = (List<dynamic> __a) {
      final arg = __a[0];
      params = Lt.listPush(params, arg);
      if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
        tmp = Lt.strConcat(Lt.string("\$"), Lt.asString(Lt.listLen(params)));
      }
      else {
        tmp = Lt.string("?");
      }
      __fns["pushSql"]!([tmp]);
      tmp2 = __fns["literalOf"]!([arg]);
      __fns["pushW"]!([tmp2]);
      return Lt.nullValue();
      return Lt.nullValue();
    };
    __fns["emitIdent"] = (List<dynamic> __a) {
      final name = __a[0];
      tmp = __fns["identStr"]!([name]);
      __fns["pushSql"]!([tmp]);
      __fns["pushW"]!([tmp]);
      return Lt.nullValue();
      return Lt.nullValue();
    };
    __fns["emitRaw"] = (List<dynamic> __a) {
      final node = __a[0];
      if (!Lt.valueEquals(Lt.bufLen(sql), Lt.number(0))) {
        sql = Lt.bufAppend(sql, Lt.string(" "));
        wsql = Lt.bufAppend(wsql, Lt.string(" "));
      }
      for (final rawArg in Lt.arrayItems(Lt.get(Lt.get(node, "functionCall"), "arguments"))) {
        dynamic rawVal = Lt.get(rawArg, Lt.string("argument"));
        if (Lt.truthy(Lt.has(rawVal, Lt.string("string")))) {
          sql = Lt.bufAppend(sql, __fns["asString"]!([rawVal]));
          wsql = Lt.bufAppend(wsql, __fns["asString"]!([rawVal]));
        }
        else if (Lt.truthy(Lt.has(rawVal, Lt.string("chain")))) {
          tmpRef = __fns["isRef"]!([Lt.get(Lt.get(rawVal, "chain"), "values")]);
          if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
            sql = Lt.bufAppend(sql, __fns["identStr"]!([tmpRef]));
            wsql = Lt.bufAppend(wsql, __fns["identStr"]!([tmpRef]));
          }
          else {
            params = Lt.listPush(params, rawVal);
            if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
              tmp = Lt.strConcat(Lt.string("\$"), Lt.asString(Lt.listLen(params)));
            }
            else {
              tmp = Lt.string("?");
            }
            sql = Lt.bufAppend(sql, tmp);
            tmp2 = __fns["literalOf"]!([rawVal]);
            wsql = Lt.bufAppend(wsql, tmp2);
          }
        }
        else {
          params = Lt.listPush(params, rawVal);
          if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
            tmp = Lt.strConcat(Lt.string("\$"), Lt.asString(Lt.listLen(params)));
          }
          else {
            tmp = Lt.string("?");
          }
          sql = Lt.bufAppend(sql, tmp);
          tmp2 = __fns["literalOf"]!([rawVal]);
          wsql = Lt.bufAppend(wsql, tmp2);
        }
      }
      return Lt.nullValue();
      return Lt.nullValue();
    };
    __fns["conflictTarget"] = (List<dynamic> __a) {
      final arg = __a[0];
      dynamic ct = Lt.string("()");
      if (Lt.truthy(Lt.has(arg, Lt.string("chain")))) {
        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(arg, "chain"), "values")]);
        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
          ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns["identStr"]!([tmpRef]), Lt.string(")")));
        }
      }
      else if (Lt.truthy(Lt.has(arg, Lt.string("string")))) {
        ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns["identStr"]!([__fns["asString"]!([arg])]), Lt.string(")")));
      }
      return ct;
      return Lt.nullValue();
    };
    __fns["firstKind"] = (List<dynamic> __a) {
      final chainValues = __a[0];
      dynamic kind = Lt.string("");
      if (!Lt.valueEquals(Lt.len(chainValues), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall")))) {
        kind = __fns["normName"]!([Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name")]);
      }
      return kind;
      return Lt.nullValue();
    };
    __fns["emitOrderItem"] = (List<dynamic> __a) {
      final item = __a[0];
      dynamic dir = Lt.string("");
      dynamic ordName = Lt.string("");
      if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
        for (final on in Lt.arrayItems(Lt.get(Lt.get(item, "chain"), "values"))) {
          dynamic onn = __fns["normName"]!([Lt.get(Lt.get(on, "functionCall"), "name")]);
          if (Lt.valueEquals(onn, Lt.string("asc"))) {
            dir = Lt.string(" ASC");
          }
          else if (Lt.valueEquals(onn, Lt.string("desc"))) {
            dir = Lt.string(" DESC");
          }
          else if (Lt.valueEquals(onn, Lt.string("col")) || Lt.valueEquals(onn, Lt.string("table"))) {
            ordName = __fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(on, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
          }
        }
      }
      if (!Lt.valueEquals(ordName, Lt.string(""))) {
        tmp = __fns["identStr"]!([ordName]);
        orderSql = Lt.strConcat(orderSql, Lt.strConcat(tmp, dir));
        orderW = Lt.strConcat(orderW, Lt.strConcat(tmp, dir));
      }
      return Lt.nullValue();
      return Lt.nullValue();
    };
    __fns["emitOrderList"] = (List<dynamic> __a) {
      final arg = __a[0];
      dynamic firstOrder = Lt.boolean(true);
      for (final item in Lt.arrayItems(__fns["itemsOf"]!([arg]))) {
        if (Lt.valueEquals(firstOrder, Lt.boolean(false))) {
          orderSql = Lt.strConcat(orderSql, Lt.string(", "));
          orderW = Lt.strConcat(orderW, Lt.string(", "));
        }
        firstOrder = Lt.boolean(false);
        __fns["emitOrderItem"]!([item]);
      }
      return Lt.nullValue();
      return Lt.nullValue();
    };
    __fns["flushOrder"] = (List<dynamic> __a) {
      if (Lt.truthy(hasOrder)) {
        __fns["pushSql"]!([Lt.string("ORDER")]);
        __fns["pushSql"]!([Lt.string("BY")]);
        __fns["pushW"]!([Lt.string("ORDER")]);
        __fns["pushW"]!([Lt.string("BY")]);
        tmp = orderSql;
        if (!Lt.valueEquals(tmp, Lt.string(""))) {
          __fns["pushSql"]!([tmp]);
        }
        tmp2 = orderW;
        if (!Lt.valueEquals(tmp2, Lt.string(""))) {
          __fns["pushW"]!([tmp2]);
        }
        hasOrder = Lt.boolean(false);
      }
      return Lt.nullValue();
      return Lt.nullValue();
    };
    for (final dialectNode in Lt.arrayItems(Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values"))) {
      if (Lt.valueEquals(__fns["normName"]!([Lt.get(Lt.get(dialectNode, "functionCall"), "name")]), Lt.string("setdialect"))) {
        dialect = Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(dialectNode, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("string")), Lt.string("value"));
      }
    }
    if (Lt.valueEquals(dialect, Lt.string(""))) {
      throw LtError(Lt.asString(Lt.string("sql-builder parse: setDialect(...) must be called before parse()")));
    }
    else if (!Lt.valueEquals(dialect, Lt.string("postgres")) && !Lt.valueEquals(dialect, Lt.string("mysql"))) {
      throw LtError(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported dialect "), dialect)));
    }
    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
      quote = Lt.string("`");
    }
    else {
      quote = Lt.string("\"");
    }
    __fns["renderNodes"] = (List<dynamic> __a) {
      final nodes = __a[0];
      final mode = __a[1];
      dynamic savedSql = Lt.string("");
      dynamic savedW = Lt.string("");
      dynamic savedOrderSql = Lt.string("");
      dynamic savedOrderW = Lt.string("");
      dynamic savedHasOrder = Lt.boolean(false);
      dynamic savedAlias = Lt.string("");
      dynamic subSql = Lt.string("");
      dynamic subW = Lt.string("");
      dynamic subAliasText = Lt.string("");
      dynamic first = Lt.boolean(true);
      dynamic left = Lt.string("");
      dynamic hasLeft = Lt.boolean(false);
      dynamic base = Lt.string("");
      if (Lt.valueEquals(mode, Lt.number(0))) {
        for (final node in Lt.arrayItems(nodes)) {
          if (Lt.truthy(Lt.has(node, Lt.string("functionCall")))) {
            dynamic name = Lt.get(Lt.get(node, "functionCall"), "name");
            dynamic nameNorm = __fns["normName"]!([name]);
            if (Lt.valueEquals(nameNorm, Lt.string("setdialect"))) {
              continue;
            }
            else if (Lt.valueEquals(nameNorm, Lt.string("asc")) || Lt.valueEquals(nameNorm, Lt.string("desc"))) {
              if (Lt.truthy(hasOrder)) {
                tmp = Lt.toUpper(nameNorm);
                orderSql = Lt.strConcat(orderSql, Lt.strConcat(Lt.string(" "), tmp));
                orderW = Lt.strConcat(orderW, Lt.strConcat(Lt.string(" "), tmp));
              }
            }
            else {
              if (Lt.valueEquals(nameNorm, Lt.string("with"))) {
                savedSql = sql;
                savedW = wsql;
                savedOrderSql = orderSql;
                savedOrderW = orderW;
                savedHasOrder = hasOrder;
                sql = Lt.bufNew();
                wsql = Lt.bufNew();
                orderSql = Lt.string("");
                orderW = Lt.string("");
                hasOrder = Lt.boolean(false);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                subSql = Lt.trim(Lt.bufStr(sql));
                subW = Lt.trim(Lt.bufStr(wsql));
                sql = savedSql;
                wsql = savedW;
                orderSql = savedOrderSql;
                orderW = savedOrderW;
                hasOrder = savedHasOrder;
                if (Lt.valueEquals(withFirst, Lt.boolean(false))) {
                  sql = Lt.bufAppend(sql, Lt.string(","));
                  wsql = Lt.bufAppend(wsql, Lt.string(","));
                }
                else {
                  withFirst = Lt.boolean(false);
                  __fns["pushSql"]!([Lt.string("WITH")]);
                  __fns["pushW"]!([Lt.string("WITH")]);
                }
                __fns["pushSql"]!([__fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])])]);
                __fns["pushW"]!([__fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))])])]);
                __fns["pushSql"]!([Lt.string("AS")]);
                __fns["pushW"]!([Lt.string("AS")]);
                __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("transaction"))) {
                __fns["pushSql"]!([Lt.string("BEGIN")]);
                __fns["pushW"]!([Lt.string("BEGIN")]);
                sql = Lt.bufAppend(sql, Lt.string(";"));
                wsql = Lt.bufAppend(wsql, Lt.string(";"));
                dynamic txnFirst = Lt.boolean(true);
                for (final txnItem in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]))) {
                  if (Lt.valueEquals(txnFirst, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(";"));
                    wsql = Lt.bufAppend(wsql, Lt.string(";"));
                  }
                  txnFirst = Lt.boolean(false);
                  if (Lt.truthy(Lt.has(txnItem, Lt.string("chain")))) {
                    __fns["renderNodes"]!([Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)]);
                  }
                  else if (Lt.truthy(Lt.has(txnItem, Lt.string("string")))) {
                    __fns["pushSql"]!([__fns["asString"]!([txnItem])]);
                    __fns["pushW"]!([__fns["asString"]!([txnItem])]);
                  }
                  else {
                    if (Lt.truthy(Lt.has(txnItem, Lt.string("chain")))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]);
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns["emitIdent"]!([tmpRef]);
                      }
                      else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(txnItem, "chain"), "values")]), Lt.string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = Lt.bufNew();
                        wsql = Lt.bufNew();
                        orderSql = Lt.string("");
                        orderW = Lt.string("");
                        hasOrder = Lt.boolean(false);
                        subAlias = Lt.string("");
                        __fns["renderNodes"]!([Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)]);
                        subSql = Lt.trim(Lt.bufStr(sql));
                        subW = Lt.trim(Lt.bufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns["pushSql"]!([subAliasText]);
                          __fns["pushW"]!([subAliasText]);
                        }
                      }
                      else {
                        __fns["emitParam"]!([txnItem]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([txnItem]);
                    }
                  }
                }
                if (Lt.valueEquals(txnFirst, Lt.boolean(false))) {
                  sql = Lt.bufAppend(sql, Lt.string(";"));
                  wsql = Lt.bufAppend(wsql, Lt.string(";"));
                }
                __fns["pushSql"]!([Lt.string("COMMIT")]);
                __fns["pushW"]!([Lt.string("COMMIT")]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("select"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("SELECT")]);
                __fns["pushW"]!([Lt.string("SELECT")]);
                dynamic firstItem = Lt.boolean(true);
                for (final item in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]))) {
                  if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(","));
                    wsql = Lt.bufAppend(wsql, Lt.string(","));
                  }
                  firstItem = Lt.boolean(false);
                  if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(item, "chain"), "values")]);
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns["emitIdent"]!([tmpRef]);
                    }
                    else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = Lt.bufNew();
                      wsql = Lt.bufNew();
                      orderSql = Lt.string("");
                      orderW = Lt.string("");
                      hasOrder = Lt.boolean(false);
                      subAlias = Lt.string("");
                      __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)]);
                      subSql = Lt.trim(Lt.bufStr(sql));
                      subW = Lt.trim(Lt.bufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns["pushSql"]!([subAliasText]);
                        __fns["pushW"]!([subAliasText]);
                      }
                    }
                    else {
                      __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([item]);
                  }
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("from"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("FROM")]);
                __fns["pushW"]!([Lt.string("FROM")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("join"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("JOIN")]);
                __fns["pushW"]!([Lt.string("JOIN")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
                __fns["pushSql"]!([Lt.string("ON")]);
                __fns["pushW"]!([Lt.string("ON")]);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("leftjoin"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("LEFT JOIN")]);
                __fns["pushW"]!([Lt.string("LEFT JOIN")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
                __fns["pushSql"]!([Lt.string("ON")]);
                __fns["pushW"]!([Lt.string("ON")]);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("rightjoin"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("RIGHT JOIN")]);
                __fns["pushW"]!([Lt.string("RIGHT JOIN")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
                __fns["pushSql"]!([Lt.string("ON")]);
                __fns["pushW"]!([Lt.string("ON")]);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("innerjoin"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("INNER JOIN")]);
                __fns["pushW"]!([Lt.string("INNER JOIN")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
                __fns["pushSql"]!([Lt.string("ON")]);
                __fns["pushW"]!([Lt.string("ON")]);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("fulljoin"))) {
                if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                  throw LtError(Lt.asString(Lt.string("sql-builder parse: FULL JOIN is not supported by mysql")));
                }
                else {
                  __fns["flushOrder"]!([]);
                  __fns["pushSql"]!([Lt.string("FULL JOIN")]);
                  __fns["pushW"]!([Lt.string("FULL JOIN")]);
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns["emitIdent"]!([tmpRef]);
                    }
                    else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = Lt.bufNew();
                      wsql = Lt.bufNew();
                      orderSql = Lt.string("");
                      orderW = Lt.string("");
                      hasOrder = Lt.boolean(false);
                      subAlias = Lt.string("");
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                      subSql = Lt.trim(Lt.bufStr(sql));
                      subW = Lt.trim(Lt.bufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns["pushSql"]!([subAliasText]);
                        __fns["pushW"]!([subAliasText]);
                      }
                    }
                    else {
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                  }
                  __fns["pushSql"]!([Lt.string("ON")]);
                  __fns["pushW"]!([Lt.string("ON")]);
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("crossjoin"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("CROSS JOIN")]);
                __fns["pushW"]!([Lt.string("CROSS JOIN")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
                __fns["pushSql"]!([Lt.string("ON")]);
                __fns["pushW"]!([Lt.string("ON")]);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("where"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("WHERE")]);
                __fns["pushW"]!([Lt.string("WHERE")]);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("groupby"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("GROUP BY")]);
                __fns["pushW"]!([Lt.string("GROUP BY")]);
                dynamic firstItem = Lt.boolean(true);
                for (final item in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]))) {
                  if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(","));
                    wsql = Lt.bufAppend(wsql, Lt.string(","));
                  }
                  firstItem = Lt.boolean(false);
                  if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(item, "chain"), "values")]);
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns["emitIdent"]!([tmpRef]);
                    }
                    else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = Lt.bufNew();
                      wsql = Lt.bufNew();
                      orderSql = Lt.string("");
                      orderW = Lt.string("");
                      hasOrder = Lt.boolean(false);
                      subAlias = Lt.string("");
                      __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)]);
                      subSql = Lt.trim(Lt.bufStr(sql));
                      subW = Lt.trim(Lt.bufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns["pushSql"]!([subAliasText]);
                        __fns["pushW"]!([subAliasText]);
                      }
                    }
                    else {
                      __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([item]);
                  }
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("having"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("HAVING")]);
                __fns["pushW"]!([Lt.string("HAVING")]);
                __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("returning"))) {
                if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                  throw LtError(Lt.asString(Lt.string("sql-builder parse: RETURNING is not supported by mysql")));
                }
                else {
                  __fns["flushOrder"]!([]);
                  __fns["pushSql"]!([Lt.string("RETURNING")]);
                  __fns["pushW"]!([Lt.string("RETURNING")]);
                  dynamic firstItem = Lt.boolean(true);
                  for (final item in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]))) {
                    if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(","));
                      wsql = Lt.bufAppend(wsql, Lt.string(","));
                    }
                    firstItem = Lt.boolean(false);
                    if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(item, "chain"), "values")]);
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns["emitIdent"]!([tmpRef]);
                      }
                      else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(item, "chain"), "values")]), Lt.string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = Lt.bufNew();
                        wsql = Lt.bufNew();
                        orderSql = Lt.string("");
                        orderW = Lt.string("");
                        hasOrder = Lt.boolean(false);
                        subAlias = Lt.string("");
                        __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)]);
                        subSql = Lt.trim(Lt.bufStr(sql));
                        subW = Lt.trim(Lt.bufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns["pushSql"]!([subAliasText]);
                          __fns["pushW"]!([subAliasText]);
                        }
                      }
                      else {
                        __fns["renderNodes"]!([Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([item]);
                    }
                  }
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("orderby"))) {
                hasOrder = Lt.boolean(true);
                orderSql = Lt.string("");
                orderW = Lt.string("");
                __fns["emitOrderList"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("limit"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("LIMIT")]);
                __fns["pushW"]!([Lt.string("LIMIT")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("offset"))) {
                __fns["flushOrder"]!([]);
                __fns["pushSql"]!([Lt.string("OFFSET")]);
                __fns["pushW"]!([Lt.string("OFFSET")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("raw"))) {
                __fns["emitRaw"]!([node]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("as"))) {
                subAlias = Lt.strConcat(Lt.string("AS "), __fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]));
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("update"))) {
                __fns["pushSql"]!([Lt.string("UPDATE")]);
                __fns["pushW"]!([Lt.string("UPDATE")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
                __fns["pushSql"]!([Lt.string("SET")]);
                __fns["pushW"]!([Lt.string("SET")]);
                dynamic assnFirst = Lt.boolean(true);
                for (final ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                  if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(","));
                    wsql = Lt.bufAppend(wsql, Lt.string(","));
                  }
                  assnFirst = Lt.boolean(false);
                  __fns["pushSql"]!([__fns["identStr"]!([ak])]);
                  __fns["pushW"]!([__fns["identStr"]!([ak])]);
                  __fns["pushSql"]!([Lt.string("=")]);
                  __fns["pushW"]!([Lt.string("=")]);
                  if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]);
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns["emitIdent"]!([tmpRef]);
                    }
                    else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = Lt.bufNew();
                      wsql = Lt.bufNew();
                      orderSql = Lt.string("");
                      orderW = Lt.string("");
                      hasOrder = Lt.boolean(false);
                      subAlias = Lt.string("");
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)]);
                      subSql = Lt.trim(Lt.bufStr(sql));
                      subW = Lt.trim(Lt.bufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns["pushSql"]!([subAliasText]);
                        __fns["pushW"]!([subAliasText]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)]);
                  }
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("insert"))) {
                __fns["pushSql"]!([Lt.string("INSERT")]);
                __fns["pushW"]!([Lt.string("INSERT")]);
                __fns["pushSql"]!([Lt.string("INTO")]);
                __fns["pushW"]!([Lt.string("INTO")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
                __fns["pushSql"]!([Lt.string("(")]);
                __fns["pushW"]!([Lt.string("(")]);
                dynamic colFirst = Lt.boolean(true);
                for (final ck in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                  if (Lt.valueEquals(colFirst, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(","));
                    wsql = Lt.bufAppend(wsql, Lt.string(","));
                  }
                  colFirst = Lt.boolean(false);
                  __fns["pushSql"]!([__fns["identStr"]!([ck])]);
                  __fns["pushW"]!([__fns["identStr"]!([ck])]);
                }
                __fns["pushSql"]!([Lt.string(")")]);
                __fns["pushW"]!([Lt.string(")")]);
                __fns["pushSql"]!([Lt.string("VALUES")]);
                __fns["pushW"]!([Lt.string("VALUES")]);
                __fns["pushSql"]!([Lt.string("(")]);
                __fns["pushW"]!([Lt.string("(")]);
                dynamic valFirst = Lt.boolean(true);
                for (final vk in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                  if (Lt.valueEquals(valFirst, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(","));
                    wsql = Lt.bufAppend(wsql, Lt.string(","));
                  }
                  valFirst = Lt.boolean(false);
                  if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), Lt.string("chain")))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]);
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns["emitIdent"]!([tmpRef]);
                    }
                    else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")]), Lt.string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = Lt.bufNew();
                      wsql = Lt.bufNew();
                      orderSql = Lt.string("");
                      orderW = Lt.string("");
                      hasOrder = Lt.boolean(false);
                      subAlias = Lt.string("");
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"), Lt.number(0)]);
                      subSql = Lt.trim(Lt.bufStr(sql));
                      subW = Lt.trim(Lt.bufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns["pushSql"]!([subAliasText]);
                        __fns["pushW"]!([subAliasText]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)]);
                  }
                }
                __fns["pushSql"]!([Lt.string(")")]);
                __fns["pushW"]!([Lt.string(")")]);
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("delete"))) {
                __fns["pushSql"]!([Lt.string("DELETE")]);
                __fns["pushW"]!([Lt.string("DELETE")]);
                __fns["pushSql"]!([Lt.string("FROM")]);
                __fns["pushW"]!([Lt.string("FROM")]);
                if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                  tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                  if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                    __fns["emitIdent"]!([tmpRef]);
                  }
                  else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    savedAlias = subAlias;
                    sql = Lt.bufNew();
                    wsql = Lt.bufNew();
                    orderSql = Lt.string("");
                    orderW = Lt.string("");
                    hasOrder = Lt.boolean(false);
                    subAlias = Lt.string("");
                    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                    subSql = Lt.trim(Lt.bufStr(sql));
                    subW = Lt.trim(Lt.bufStr(wsql));
                    subAliasText = subAlias;
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    subAlias = savedAlias;
                    __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                    __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                    if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                      __fns["pushSql"]!([subAliasText]);
                      __fns["pushW"]!([subAliasText]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("set"))) {
                __fns["pushSql"]!([Lt.string("SET")]);
                __fns["pushW"]!([Lt.string("SET")]);
                dynamic assnFirst = Lt.boolean(true);
                for (final ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value")))) {
                  if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(","));
                    wsql = Lt.bufAppend(wsql, Lt.string(","));
                  }
                  assnFirst = Lt.boolean(false);
                  __fns["pushSql"]!([__fns["identStr"]!([ak])]);
                  __fns["pushW"]!([__fns["identStr"]!([ak])]);
                  __fns["pushSql"]!([Lt.string("=")]);
                  __fns["pushW"]!([Lt.string("=")]);
                  if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]);
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns["emitIdent"]!([tmpRef]);
                    }
                    else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = Lt.bufNew();
                      wsql = Lt.bufNew();
                      orderSql = Lt.string("");
                      orderW = Lt.string("");
                      hasOrder = Lt.boolean(false);
                      subAlias = Lt.string("");
                      __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)]);
                      subSql = Lt.trim(Lt.bufStr(sql));
                      subW = Lt.trim(Lt.bufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns["pushSql"]!([subAliasText]);
                        __fns["pushW"]!([subAliasText]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)]);
                  }
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("values"))) {
                __fns["pushSql"]!([Lt.string("VALUES")]);
                __fns["pushW"]!([Lt.string("VALUES")]);
                dynamic valueRows = __fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                dynamic valueFirst = Lt.boolean(true);
                if (!Lt.valueEquals(Lt.len(valueRows), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(valueRows, Lt.number(0)), Lt.string("array")))) {
                  for (final tuple in Lt.arrayItems(valueRows)) {
                    if (Lt.valueEquals(valueFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(","));
                      wsql = Lt.bufAppend(wsql, Lt.string(","));
                    }
                    valueFirst = Lt.boolean(false);
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      __fns["pushSql"]!([Lt.string("ROW")]);
                      __fns["pushW"]!([Lt.string("ROW")]);
                    }
                    __fns["pushSql"]!([Lt.string("(")]);
                    __fns["pushW"]!([Lt.string("(")]);
                    dynamic itemFirst = Lt.boolean(true);
                    for (final ti in Lt.arrayItems(__fns["itemsOf"]!([tuple]))) {
                      if (Lt.valueEquals(itemFirst, Lt.boolean(false))) {
                        sql = Lt.bufAppend(sql, Lt.string(","));
                        wsql = Lt.bufAppend(wsql, Lt.string(","));
                      }
                      itemFirst = Lt.boolean(false);
                      if (Lt.truthy(Lt.has(ti, Lt.string("chain")))) {
                        tmpRef = __fns["isRef"]!([Lt.get(Lt.get(ti, "chain"), "values")]);
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns["emitIdent"]!([tmpRef]);
                        }
                        else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("delete")))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = Lt.bufNew();
                          wsql = Lt.bufNew();
                          orderSql = Lt.string("");
                          orderW = Lt.string("");
                          hasOrder = Lt.boolean(false);
                          subAlias = Lt.string("");
                          __fns["renderNodes"]!([Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)]);
                          subSql = Lt.trim(Lt.bufStr(sql));
                          subW = Lt.trim(Lt.bufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                          __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns["pushSql"]!([subAliasText]);
                            __fns["pushW"]!([subAliasText]);
                          }
                        }
                        else {
                          __fns["emitParam"]!([ti]);
                        }
                      }
                      else {
                        __fns["emitParam"]!([ti]);
                      }
                    }
                    __fns["pushSql"]!([Lt.string(")")]);
                    __fns["pushW"]!([Lt.string(")")]);
                  }
                }
                else {
                  if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                    __fns["pushSql"]!([Lt.string("ROW")]);
                    __fns["pushW"]!([Lt.string("ROW")]);
                  }
                  __fns["pushSql"]!([Lt.string("(")]);
                  __fns["pushW"]!([Lt.string("(")]);
                  dynamic itemFirst = Lt.boolean(true);
                  for (final ti in Lt.arrayItems(valueRows)) {
                    if (Lt.valueEquals(itemFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(","));
                      wsql = Lt.bufAppend(wsql, Lt.string(","));
                    }
                    itemFirst = Lt.boolean(false);
                    if (Lt.truthy(Lt.has(ti, Lt.string("chain")))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(ti, "chain"), "values")]);
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns["emitIdent"]!([tmpRef]);
                      }
                      else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(ti, "chain"), "values")]), Lt.string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = Lt.bufNew();
                        wsql = Lt.bufNew();
                        orderSql = Lt.string("");
                        orderW = Lt.string("");
                        hasOrder = Lt.boolean(false);
                        subAlias = Lt.string("");
                        __fns["renderNodes"]!([Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)]);
                        subSql = Lt.trim(Lt.bufStr(sql));
                        subW = Lt.trim(Lt.bufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns["pushSql"]!([subAliasText]);
                          __fns["pushW"]!([subAliasText]);
                        }
                      }
                      else {
                        __fns["emitParam"]!([ti]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([ti]);
                    }
                  }
                  __fns["pushSql"]!([Lt.string(")")]);
                  __fns["pushW"]!([Lt.string(")")]);
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("onconflictdonothing"))) {
                if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                  throw LtError(Lt.asString(Lt.string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")));
                }
                else {
                  __fns["pushSql"]!([Lt.string("ON")]);
                  __fns["pushW"]!([Lt.string("ON")]);
                  __fns["pushSql"]!([Lt.string("CONFLICT")]);
                  __fns["pushW"]!([Lt.string("CONFLICT")]);
                  __fns["pushSql"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
                  __fns["pushW"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
                  __fns["pushSql"]!([Lt.string("DO")]);
                  __fns["pushW"]!([Lt.string("DO")]);
                  __fns["pushSql"]!([Lt.string("NOTHING")]);
                  __fns["pushW"]!([Lt.string("NOTHING")]);
                }
              }
              else if (Lt.valueEquals(nameNorm, Lt.string("onconflictdoupdate"))) {
                if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                  __fns["pushSql"]!([Lt.string("ON")]);
                  __fns["pushW"]!([Lt.string("ON")]);
                  __fns["pushSql"]!([Lt.string("DUPLICATE")]);
                  __fns["pushW"]!([Lt.string("DUPLICATE")]);
                  __fns["pushSql"]!([Lt.string("KEY")]);
                  __fns["pushW"]!([Lt.string("KEY")]);
                  __fns["pushSql"]!([Lt.string("UPDATE")]);
                  __fns["pushW"]!([Lt.string("UPDATE")]);
                  dynamic assnFirst = Lt.boolean(true);
                  for (final ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                    if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(","));
                      wsql = Lt.bufAppend(wsql, Lt.string(","));
                    }
                    assnFirst = Lt.boolean(false);
                    __fns["pushSql"]!([__fns["identStr"]!([ak])]);
                    __fns["pushW"]!([__fns["identStr"]!([ak])]);
                    __fns["pushSql"]!([Lt.string("=")]);
                    __fns["pushW"]!([Lt.string("=")]);
                    if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]);
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns["emitIdent"]!([tmpRef]);
                      }
                      else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = Lt.bufNew();
                        wsql = Lt.bufNew();
                        orderSql = Lt.string("");
                        orderW = Lt.string("");
                        hasOrder = Lt.boolean(false);
                        subAlias = Lt.string("");
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)]);
                        subSql = Lt.trim(Lt.bufStr(sql));
                        subW = Lt.trim(Lt.bufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns["pushSql"]!([subAliasText]);
                          __fns["pushW"]!([subAliasText]);
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)]);
                    }
                  }
                }
                else {
                  __fns["pushSql"]!([Lt.string("ON")]);
                  __fns["pushW"]!([Lt.string("ON")]);
                  __fns["pushSql"]!([Lt.string("CONFLICT")]);
                  __fns["pushW"]!([Lt.string("CONFLICT")]);
                  __fns["pushSql"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
                  __fns["pushW"]!([__fns["conflictTarget"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
                  __fns["pushSql"]!([Lt.string("DO")]);
                  __fns["pushW"]!([Lt.string("DO")]);
                  __fns["pushSql"]!([Lt.string("UPDATE")]);
                  __fns["pushW"]!([Lt.string("UPDATE")]);
                  __fns["pushSql"]!([Lt.string("SET")]);
                  __fns["pushW"]!([Lt.string("SET")]);
                  dynamic assnFirst = Lt.boolean(true);
                  for (final ak in Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                    if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(","));
                      wsql = Lt.bufAppend(wsql, Lt.string(","));
                    }
                    assnFirst = Lt.boolean(false);
                    __fns["pushSql"]!([__fns["identStr"]!([ak])]);
                    __fns["pushW"]!([__fns["identStr"]!([ak])]);
                    __fns["pushSql"]!([Lt.string("=")]);
                    __fns["pushW"]!([Lt.string("=")]);
                    if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]);
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns["emitIdent"]!([tmpRef]);
                      }
                      else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")]), Lt.string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = Lt.bufNew();
                        wsql = Lt.bufNew();
                        orderSql = Lt.string("");
                        orderW = Lt.string("");
                        hasOrder = Lt.boolean(false);
                        subAlias = Lt.string("");
                        __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)]);
                        subSql = Lt.trim(Lt.bufStr(sql));
                        subW = Lt.trim(Lt.bufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns["pushSql"]!([subAliasText]);
                          __fns["pushW"]!([subAliasText]);
                        }
                      }
                      else {
                        __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)]);
                    }
                  }
                }
              }
              else {
                throw LtError(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported clause "), name)));
              }
            }
          }
        }
        __fns["flushOrder"]!([]);
        return Lt.nullValue();
      }
      else {
        first = Lt.boolean(true);
        left = Lt.string("");
        hasLeft = Lt.boolean(false);
        base = Lt.string("");
        for (final node in Lt.arrayItems(nodes)) {
          dynamic pn = __fns["normName"]!([Lt.get(Lt.get(node, "functionCall"), "name")]);
          dynamic op = __fns["opOf"]!([pn]);
          if (Lt.truthy(Lt.has(node, Lt.string("functionCall")))) {
            if (Lt.valueEquals(pn, Lt.string("col")) || Lt.valueEquals(pn, Lt.string("table"))) {
              left = __fns["identStr"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
              hasLeft = Lt.boolean(true);
            }
            else if (Lt.truthy(op)) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              if (Lt.truthy(hasLeft)) {
                base = left;
              }
              else {
                base = Lt.string("?");
              }
              __fns["pushSql"]!([base]);
              __fns["pushW"]!([base]);
              __fns["pushSql"]!([op]);
              __fns["pushW"]!([op]);
              if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                  __fns["emitIdent"]!([tmpRef]);
                }
                else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = Lt.bufNew();
                  wsql = Lt.bufNew();
                  orderSql = Lt.string("");
                  orderW = Lt.string("");
                  hasOrder = Lt.boolean(false);
                  subAlias = Lt.string("");
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                  subSql = Lt.trim(Lt.bufStr(sql));
                  subW = Lt.trim(Lt.bufStr(wsql));
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                  __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                  if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                    __fns["pushSql"]!([subAliasText]);
                    __fns["pushW"]!([subAliasText]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
              }
              else {
                __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
              }
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("exists"))) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              __fns["pushSql"]!([Lt.string("EXISTS")]);
              __fns["pushW"]!([Lt.string("EXISTS")]);
              if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                  __fns["emitIdent"]!([tmpRef]);
                }
                else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = Lt.bufNew();
                  wsql = Lt.bufNew();
                  orderSql = Lt.string("");
                  orderW = Lt.string("");
                  hasOrder = Lt.boolean(false);
                  subAlias = Lt.string("");
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                  subSql = Lt.trim(Lt.bufStr(sql));
                  subW = Lt.trim(Lt.bufStr(wsql));
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                  __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                  if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                    __fns["pushSql"]!([subAliasText]);
                    __fns["pushW"]!([subAliasText]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
              }
              else {
                __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
              }
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("in"))) {
              if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns["pushSql"]!([Lt.string("AND")]);
                    __fns["pushW"]!([Lt.string("AND")]);
                  }
                  first = Lt.boolean(false);
                  if (Lt.truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = Lt.string("?");
                  }
                  __fns["pushSql"]!([base]);
                  __fns["pushW"]!([base]);
                  __fns["pushSql"]!([Lt.string("IN")]);
                  __fns["pushW"]!([Lt.string("IN")]);
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = Lt.bufNew();
                  wsql = Lt.bufNew();
                  orderSql = Lt.string("");
                  orderW = Lt.string("");
                  hasOrder = Lt.boolean(false);
                  subAlias = Lt.string("");
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                  subSql = Lt.trim(Lt.bufStr(sql));
                  subW = Lt.trim(Lt.bufStr(wsql));
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                  __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                  if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                    __fns["pushSql"]!([subAliasText]);
                    __fns["pushW"]!([subAliasText]);
                  }
                }
                else {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns["pushSql"]!([Lt.string("AND")]);
                    __fns["pushW"]!([Lt.string("AND")]);
                  }
                  first = Lt.boolean(false);
                  if (Lt.truthy(hasLeft)) {
                    base = left;
                  }
                  else {
                    base = Lt.string("?");
                  }
                  __fns["pushSql"]!([base]);
                  __fns["pushW"]!([base]);
                  __fns["pushSql"]!([Lt.string("IN (")]);
                  __fns["pushW"]!([Lt.string("IN (")]);
                  dynamic inFirst = Lt.boolean(true);
                  for (final iv in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]))) {
                    if (Lt.valueEquals(inFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(","));
                      wsql = Lt.bufAppend(wsql, Lt.string(","));
                    }
                    inFirst = Lt.boolean(false);
                    if (Lt.truthy(Lt.has(iv, Lt.string("chain")))) {
                      tmpRef = __fns["isRef"]!([Lt.get(Lt.get(iv, "chain"), "values")]);
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns["emitIdent"]!([tmpRef]);
                      }
                      else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("delete")))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = Lt.bufNew();
                        wsql = Lt.bufNew();
                        orderSql = Lt.string("");
                        orderW = Lt.string("");
                        hasOrder = Lt.boolean(false);
                        subAlias = Lt.string("");
                        __fns["renderNodes"]!([Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)]);
                        subSql = Lt.trim(Lt.bufStr(sql));
                        subW = Lt.trim(Lt.bufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                        __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns["pushSql"]!([subAliasText]);
                          __fns["pushW"]!([subAliasText]);
                        }
                      }
                      else {
                        __fns["emitParam"]!([iv]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([iv]);
                    }
                  }
                  __fns["pushSql"]!([Lt.string(")")]);
                  __fns["pushW"]!([Lt.string(")")]);
                }
              }
              else {
                if (Lt.valueEquals(first, Lt.boolean(false))) {
                  __fns["pushSql"]!([Lt.string("AND")]);
                  __fns["pushW"]!([Lt.string("AND")]);
                }
                first = Lt.boolean(false);
                if (Lt.truthy(hasLeft)) {
                  base = left;
                }
                else {
                  base = Lt.string("?");
                }
                __fns["pushSql"]!([base]);
                __fns["pushW"]!([base]);
                __fns["pushSql"]!([Lt.string("IN (")]);
                __fns["pushW"]!([Lt.string("IN (")]);
                dynamic inFirst = Lt.boolean(true);
                for (final iv in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]))) {
                  if (Lt.valueEquals(inFirst, Lt.boolean(false))) {
                    sql = Lt.bufAppend(sql, Lt.string(","));
                    wsql = Lt.bufAppend(wsql, Lt.string(","));
                  }
                  inFirst = Lt.boolean(false);
                  if (Lt.truthy(Lt.has(iv, Lt.string("chain")))) {
                    tmpRef = __fns["isRef"]!([Lt.get(Lt.get(iv, "chain"), "values")]);
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns["emitIdent"]!([tmpRef]);
                    }
                    else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(iv, "chain"), "values")]), Lt.string("delete")))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = Lt.bufNew();
                      wsql = Lt.bufNew();
                      orderSql = Lt.string("");
                      orderW = Lt.string("");
                      hasOrder = Lt.boolean(false);
                      subAlias = Lt.string("");
                      __fns["renderNodes"]!([Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)]);
                      subSql = Lt.trim(Lt.bufStr(sql));
                      subW = Lt.trim(Lt.bufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                      __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns["pushSql"]!([subAliasText]);
                        __fns["pushW"]!([subAliasText]);
                      }
                    }
                    else {
                      __fns["emitParam"]!([iv]);
                    }
                  }
                  else {
                    __fns["emitParam"]!([iv]);
                  }
                }
                __fns["pushSql"]!([Lt.string(")")]);
                __fns["pushW"]!([Lt.string(")")]);
              }
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("between"))) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              if (Lt.truthy(hasLeft)) {
                base = left;
              }
              else {
                base = Lt.string("?");
              }
              __fns["pushSql"]!([base]);
              __fns["pushW"]!([base]);
              __fns["pushSql"]!([Lt.string("BETWEEN")]);
              __fns["pushW"]!([Lt.string("BETWEEN")]);
              if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]);
                if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                  __fns["emitIdent"]!([tmpRef]);
                }
                else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = Lt.bufNew();
                  wsql = Lt.bufNew();
                  orderSql = Lt.string("");
                  orderW = Lt.string("");
                  hasOrder = Lt.boolean(false);
                  subAlias = Lt.string("");
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                  subSql = Lt.trim(Lt.bufStr(sql));
                  subW = Lt.trim(Lt.bufStr(wsql));
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                  __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                  if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                    __fns["pushSql"]!([subAliasText]);
                    __fns["pushW"]!([subAliasText]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
                }
              }
              else {
                __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]);
              }
              __fns["pushSql"]!([Lt.string("AND")]);
              __fns["pushW"]!([Lt.string("AND")]);
              if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain")))) {
                tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]);
                if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                  __fns["emitIdent"]!([tmpRef]);
                }
                else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = Lt.bufNew();
                  wsql = Lt.bufNew();
                  orderSql = Lt.string("");
                  orderW = Lt.string("");
                  hasOrder = Lt.boolean(false);
                  subAlias = Lt.string("");
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                  subSql = Lt.trim(Lt.bufStr(sql));
                  subW = Lt.trim(Lt.bufStr(wsql));
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                  __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                  if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                    __fns["pushSql"]!([subAliasText]);
                    __fns["pushW"]!([subAliasText]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))]);
                }
              }
              else {
                __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))]);
              }
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("isnull"))) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              if (Lt.truthy(hasLeft)) {
                base = left;
              }
              else {
                base = Lt.string("?");
              }
              __fns["pushSql"]!([base]);
              __fns["pushW"]!([base]);
              __fns["pushSql"]!([Lt.string("IS NULL")]);
              __fns["pushW"]!([Lt.string("IS NULL")]);
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("isnotnull"))) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              if (Lt.truthy(hasLeft)) {
                base = left;
              }
              else {
                base = Lt.string("?");
              }
              __fns["pushSql"]!([base]);
              __fns["pushW"]!([base]);
              __fns["pushSql"]!([Lt.string("IS NOT NULL")]);
              __fns["pushW"]!([Lt.string("IS NOT NULL")]);
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("not"))) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              __fns["pushSql"]!([Lt.string("NOT (")]);
              __fns["pushW"]!([Lt.string("NOT (")]);
              __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)]);
              __fns["pushSql"]!([Lt.string(")")]);
              __fns["pushW"]!([Lt.string(")")]);
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("and")) || Lt.valueEquals(pn, Lt.string("or"))) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              __fns["pushSql"]!([Lt.string("(")]);
              __fns["pushW"]!([Lt.string("(")]);
              dynamic boolFirst = Lt.boolean(true);
              for (final bv in Lt.arrayItems(__fns["itemsOf"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))]))) {
                if (Lt.valueEquals(boolFirst, Lt.boolean(false))) {
                  tmp = Lt.toUpper(pn);
                  __fns["pushSql"]!([tmp]);
                  __fns["pushW"]!([tmp]);
                }
                boolFirst = Lt.boolean(false);
                if (Lt.truthy(Lt.has(bv, Lt.string("chain")))) {
                  __fns["renderNodes"]!([Lt.get(Lt.get(bv, "chain"), "values"), Lt.number(1)]);
                }
                else {
                  __fns["emitParam"]!([bv]);
                }
              }
              __fns["pushSql"]!([Lt.string(")")]);
              __fns["pushW"]!([Lt.string(")")]);
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("as"))) {
              if (Lt.truthy(hasLeft)) {
                base = left;
              }
              else {
                base = Lt.string("?");
              }
              __fns["pushSql"]!([base]);
              __fns["pushW"]!([base]);
              __fns["pushSql"]!([Lt.string("AS")]);
              __fns["pushW"]!([Lt.string("AS")]);
              __fns["emitIdent"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("op"))) {
              if (Lt.valueEquals(first, Lt.boolean(false))) {
                __fns["pushSql"]!([Lt.string("AND")]);
                __fns["pushW"]!([Lt.string("AND")]);
              }
              first = Lt.boolean(false);
              if (Lt.truthy(hasLeft)) {
                base = left;
              }
              else {
                base = Lt.string("?");
              }
              __fns["pushSql"]!([base]);
              __fns["pushW"]!([base]);
              __fns["pushSql"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
              __fns["pushW"]!([__fns["asString"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))])]);
              if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain")))) {
                tmpRef = __fns["isRef"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]);
                if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                  __fns["emitIdent"]!([tmpRef]);
                }
                else if ((Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("select")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("with"))) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("values")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("insert")) || (Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("update")) || Lt.valueEquals(__fns["firstKind"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")]), Lt.string("delete")))))) {
                  savedSql = sql;
                  savedW = wsql;
                  savedOrderSql = orderSql;
                  savedOrderW = orderW;
                  savedHasOrder = hasOrder;
                  savedAlias = subAlias;
                  sql = Lt.bufNew();
                  wsql = Lt.bufNew();
                  orderSql = Lt.string("");
                  orderW = Lt.string("");
                  hasOrder = Lt.boolean(false);
                  subAlias = Lt.string("");
                  __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)]);
                  subSql = Lt.trim(Lt.bufStr(sql));
                  subW = Lt.trim(Lt.bufStr(wsql));
                  subAliasText = subAlias;
                  sql = savedSql;
                  wsql = savedW;
                  orderSql = savedOrderSql;
                  orderW = savedOrderW;
                  hasOrder = savedHasOrder;
                  subAlias = savedAlias;
                  __fns["pushSql"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))]);
                  __fns["pushW"]!([Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))]);
                  if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                    __fns["pushSql"]!([subAliasText]);
                    __fns["pushW"]!([subAliasText]);
                  }
                }
                else {
                  __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))]);
                }
              }
              else {
                __fns["emitParam"]!([Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))]);
              }
              hasLeft = Lt.boolean(false);
            }
            else if (Lt.valueEquals(pn, Lt.string("raw"))) {
              __fns["emitRaw"]!([node]);
            }
            else {
              throw LtError(Lt.asString(Lt.string("sql-builder parse: unsupported predicate")));
            }
          }
        }
        return Lt.nullValue();
      }
      return Lt.nullValue();
    };
    __fns["renderNodes"]!([Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values"), Lt.number(0)]);
    sql = Lt.bufStr(sql);
    wsql = Lt.bufStr(wsql);
    params = Lt.listValue(params);
    return Lt.map({"sql": Lt.trim(sql), "sqlWithParam": Lt.trim(wsql), "param": Lt.params(params)});
  }

}

class Init {
  static SqlBuilder sqlBuilder([String? variableName, List<dynamic> copies = const []]) {
    final structure = SqlBuilder();
    structure.initFromInitFunction(Lt.map({
      "name": "sql-builder",
      "variableName": (variableName != null ? variableName : Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(structure.getSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName")),
    }), Lt.array(copies));
    return structure;
  }
}