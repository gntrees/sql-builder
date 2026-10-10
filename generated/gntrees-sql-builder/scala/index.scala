// Auto-generated index for gntrees-sql-builder

import scala.collection.mutable

// parse() returns a mutable.LinkedHashMap[String, Any]: { "sql": String, "sqlWithParam": String, "param": List }

// Auto-generated Scala method-chain types.
//
// Scala has a universal top type (`Any`), so LT values are native Scala values
// (String / Long / Double / Boolean / null / mutable.ArrayBuffer /
// mutable.LinkedHashMap), and there is no `Value` enum. The one shared
// abstraction is `Structure`: every generated builder class implements it, which
// lets the generic runtime (`copy` / `make_copy`) call `getSchema()`.

trait Structure {
  def getSchema(): scala.collection.mutable.LinkedHashMap[String, Any]
}


object Mc {
  // Auto-generated Scala method-chain runtime (Lingua Tungga Gelombang 2).
  //
  // The static counterpart of `core/base/python/base-utils.py`. Schemas are plain
  // nested `mutable.LinkedHashMap`s; the generator inlines this fragment inside an
  // `object Mc` in the generated `index.scala`.
  //
  // `normalize_argument_structure_call` and `copy` are *not* defined here: like the
  // TypeScript/Python runtimes they are emitted by the generator because they
  // reference the project's structure classes.

  def _typeof(value: Any): String = value match {
    case null => "object"
    case _: Boolean => "boolean"
    case _: Double | _: Float | _: Long | _: Int | _: Short | _: Byte => "number"
    case _: String => "string"
    case _: scala.collection.Seq[_] => "object"
    case _: scala.collection.Map[_, _] => "object"
    case other => other.getClass.getSimpleName
  }

  def validate_schema(schema: Any): Unit = {
    val message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
    if (!schema.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException(message)
    val inner = Lt.get(schema, "schema")
    if (!inner.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException(message)
    val chain = Lt.get(inner, "chain")
    if (!chain.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException(message)
    val chainChain = Lt.get(chain, "chain")
    if (!chainChain.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException(message)
    if (!Lt.get(chainChain, "values").isInstanceOf[scala.collection.Seq[_]] || !Lt.truthy(Lt.get(chainChain, "initFunction"))) {
      throw new RuntimeException(message)
    }
  }

  def unwrap_argument_value(value: Any): Any = {
    if (!value.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException("Unknown argument value type")
    if (Lt.has(value, "string")) return Lt.get(Lt.get(value, "string"), "value")
    if (Lt.has(value, "number")) return Lt.get(Lt.get(value, "number"), "value")
    if (Lt.has(value, "boolean")) return Lt.get(Lt.get(value, "boolean"), "value")
    if (Lt.has(value, "null")) return Lt.get(Lt.get(value, "null"), "value")
    if (Lt.has(value, "array")) {
      val out = mutable.ArrayBuffer[Any]()
      for (item <- Lt.items(Lt.get(Lt.get(value, "array"), "value"))) out += unwrap_argument_value(item)
      return out
    }
    if (Lt.has(value, "object")) {
      val out = mutable.LinkedHashMap[String, Any]()
      for ((key, item) <- Lt.asMap(Lt.get(Lt.get(value, "object"), "value"))) out(key) = unwrap_argument_value(item)
      return out
    }
    if (Lt.has(value, "chain")) throw new RuntimeException("Cannot validate a chain default value at runtime")
    throw new RuntimeException("Unknown argument value type")
  }

  def validate_default(defaultVal: Any, struct: Any): Unit = {
    normalize_argument(unwrap_argument_value(defaultVal), struct)
  }

  def normalize_argument(arg: Any, struct: Any): Any = {
    if (!struct.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException("Unsupported struct type in normalizeArgument")

    if (Lt.has(struct, "array")) {
      if (!arg.isInstanceOf[scala.collection.Seq[_]]) throw new RuntimeException("Expected an array argument, but got " + _typeof(arg))
      if (Lt.items(arg).isEmpty) return Lt.map("array" -> Lt.map("value" -> Lt.array()))
      val itemType = Lt.get(Lt.get(struct, "array"), "type")
      val normalizedItems = mutable.ArrayBuffer[Any]()
      for (item <- Lt.items(arg)) normalizedItems += normalize_argument(item, itemType)
      if (normalizedItems(0) == null) throw new RuntimeException("Unexpected undefined value in array")
      return Lt.map("array" -> Lt.map("value" -> normalizedItems))
    }

    if (Lt.has(struct, "object")) {
      if (!arg.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException("Expected an object argument, but got " + _typeof(arg))
      val declared = Lt.get(struct, "object")
      val missingKeys = mutable.ArrayBuffer[String]()
      for (key <- Lt.items(Lt.keys(declared))) {
        if (!Lt.has(arg, key)) missingKeys += Lt.asString(key)
      }
      if (missingKeys.nonEmpty) {
        throw new RuntimeException("Missing required key(s) \"" + missingKeys.mkString("\", \"") + "\" in object argument")
      }
      val normalizedObject = mutable.LinkedHashMap[String, Any]()
      for ((key, item) <- Lt.asMap(arg)) {
        if (!Lt.has(declared, key)) throw new RuntimeException("Unexpected key \"" + key + "\" in object argument")
        normalizedObject(key) = normalize_argument(item, Lt.get(declared, key))
      }
      return Lt.map("object" -> Lt.map("value" -> normalizedObject))
    }

    if (Lt.has(struct, "string")) {
      if (!arg.isInstanceOf[String]) throw new RuntimeException("Expected a string argument, but got " + _typeof(arg))
      return Lt.map("string" -> Lt.map("value" -> arg))
    }

    if (Lt.has(struct, "number")) {
      if (arg.isInstanceOf[Boolean] || !Lt.isNumber(arg)) {
        throw new RuntimeException("Expected a number argument, but got " + _typeof(arg))
      }
      val number = Lt.toDouble(arg)
      if (!number.isFinite) throw new RuntimeException("Expected a finite number argument, but got " + number)
      return Lt.map("number" -> Lt.map("value" -> number))
    }

    if (Lt.has(struct, "boolean")) {
      if (!arg.isInstanceOf[Boolean]) throw new RuntimeException("Expected a boolean argument, but got " + _typeof(arg))
      return Lt.map("boolean" -> Lt.map("value" -> arg))
    }

    if (Lt.has(struct, "null")) {
      if (arg != null) throw new RuntimeException("Expected a null argument, but got " + _typeof(arg))
      return Lt.map("null" -> Lt.map("value" -> null))
    }

    if (Lt.has(struct, "union")) {
      val reasons = mutable.ArrayBuffer[String]()
      val normalizedUnionTypes = mutable.ArrayBuffer[Any]()
      for (unionType <- Lt.items(Lt.get(Lt.get(struct, "union"), "types"))) {
        try {
          normalizedUnionTypes += normalize_argument(arg, unionType)
        } catch {
          case error: RuntimeException => reasons += (if (error.getMessage != null) error.getMessage else "")
        }
      }
      if (normalizedUnionTypes.isEmpty || normalizedUnionTypes(0) == null) {
        throw new RuntimeException("Argument does not match any type in the union: " + reasons.mkString(" | "))
      }
      if (normalizedUnionTypes.size > 1) {
        if (arg.isInstanceOf[scala.collection.Seq[_]] && Lt.items(arg).isEmpty) return normalizedUnionTypes(0)
        throw new RuntimeException("Argument matches multiple types in the union, which is ambiguous")
      }
      return normalizedUnionTypes(0)
    }

    if (Lt.has(struct, "map")) {
      if (!arg.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException("Expected an object argument for map type, but got " + _typeof(arg))
      val normalizedMap = mutable.LinkedHashMap[String, Any]()
      val valueType = Lt.get(Lt.get(struct, "map"), "type")
      for ((key, item) <- Lt.asMap(arg)) normalizedMap(key) = normalize_argument(item, valueType)
      return Lt.map("object" -> Lt.map("value" -> normalizedMap))
    }

    if (Lt.has(struct, "structureCall")) {
      return normalize_argument_structure_call(arg)
    }

    if (Lt.has(struct, "literal")) {
      val expected = Lt.get(Lt.get(struct, "literal"), "value")
      val literalType = Lt.get(Lt.get(struct, "literal"), "type")
      if (literalType == "string") {
        if (!arg.isInstanceOf[String]) throw new RuntimeException("Expected a string literal argument, but got " + _typeof(arg))
        if (arg != expected) throw new RuntimeException("Expected string literal " + Lt.json(expected) + ", but got " + Lt.json(arg))
        return Lt.map("string" -> Lt.map("value" -> arg))
      }
      if (literalType == "number") {
        if (arg.isInstanceOf[Boolean] || !Lt.isNumber(arg)) {
          throw new RuntimeException("Expected a number literal argument, but got " + _typeof(arg))
        }
        if (arg != expected) throw new RuntimeException("Expected number literal " + expected + ", but got " + arg)
        return Lt.map("number" -> Lt.map("value" -> arg))
      }
      if (!arg.isInstanceOf[Boolean]) throw new RuntimeException("Expected a boolean literal argument, but got " + _typeof(arg))
      if (arg != expected) throw new RuntimeException("Expected boolean literal " + expected + ", but got " + arg)
      return Lt.map("boolean" -> Lt.map("value" -> arg))
    }

    throw new RuntimeException("Unsupported struct type in normalizeArgument")
  }

  def create_schema(oldSchema: mutable.LinkedHashMap[String, Any], functionName: String, functionArgs: scala.collection.Seq[Any], isTemplateLiteral: Boolean): mutable.LinkedHashMap[String, Any] = {
    validate_schema(oldSchema)
    val old = Lt.asMap(Lt.get(oldSchema, "schema"))
    val oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"))

    val inner = mutable.LinkedHashMap[String, Any]()
    for ((key, value) <- old) inner(key) = value
    val values = mutable.ArrayBuffer[Any]()
    for (v <- Lt.items(Lt.get(oldChain, "values"))) values += v
    inner("chain") = Lt.map("chain" -> Lt.map(
      "values" -> values,
      "initFunction" -> Lt.get(oldChain, "initFunction"),
    ))
    val newSchema = Lt.map("schema" -> inner)

    val args = mutable.ArrayBuffer[Any]()
    if (isTemplateLiteral && functionArgs.nonEmpty && functionArgs(0) != null) {
      val strings = Lt.get(functionArgs(0), "arg")
      if (!strings.isInstanceOf[scala.collection.Seq[_]]) throw new RuntimeException("Expected a template strings array for " + functionName)
      for (text <- Lt.items(strings)) {
        if (!text.isInstanceOf[String]) throw new RuntimeException("Expected a template strings array for " + functionName)
      }
      val expressions = functionArgs.drop(1)
      if (expressions.size != Lt.items(strings).size - 1) {
        throw new RuntimeException(
          "Template literal for " + functionName + " expects " + (Lt.items(strings).size - 1)
            + " expression(s), but got " + expressions.size
        )
      }
      for (index <- Lt.items(strings).indices) {
        val text = Lt.asString(Lt.items(strings)(index))
        if (text.nonEmpty) {
          args += Lt.map("argument" -> Lt.map("string" -> Lt.map("value" -> text)), "default" -> null)
        }
        if (index < expressions.size) {
          val expression = expressions(index)
          if (expression == null) throw new RuntimeException("Missing expression for template literal at index " + index)
          args += Lt.map(
            "argument" -> normalize_argument(Lt.get(expression, "arg"), Lt.get(expression, "struct")),
            "default" -> null,
          )
        }
      }
    } else {
      for (index <- functionArgs.indices) {
        val functionArg = functionArgs(index)
        val arg = Lt.get(functionArg, "arg")
        if (arg == Lt.MISSING) {
          if (Lt.truthy(Lt.get(functionArg, "provided"))) {
            throw new RuntimeException("Parameter \"" + functionName + "\" argument #" + (index + 1) + " cannot be undefined")
          }
          val defaultVal = Lt.get(functionArg, "default")
          if (defaultVal != null) {
            validate_default(defaultVal, Lt.get(functionArg, "struct"))
            args += Lt.map("argument" -> defaultVal, "default" -> defaultVal)
          } else {
            throw new RuntimeException("Parameter \"" + functionName + "\" argument #" + (index + 1) + " was not provided")
          }
        } else {
          val argument = normalize_argument(arg, Lt.get(functionArg, "struct"))
          val defaultVal = Lt.get(functionArg, "default")
          if (defaultVal != null) validate_default(defaultVal, Lt.get(functionArg, "struct"))
          args += Lt.map("argument" -> argument, "default" -> defaultVal)
        }
      }
    }

    values += Lt.map("functionCall" -> Lt.map(
      "name" -> functionName,
      "arguments" -> args,
      "isTemplateLiteral" -> isTemplateLiteral,
    ))
    newSchema
  }

  def create_property_call_schema(oldSchema: mutable.LinkedHashMap[String, Any], propertyName: String): mutable.LinkedHashMap[String, Any] = {
    val old = Lt.asMap(Lt.get(oldSchema, "schema"))
    val oldChain = Lt.asMap(Lt.get(Lt.get(old, "chain"), "chain"))
    val values = mutable.ArrayBuffer[Any]()
    for (v <- Lt.items(Lt.get(oldChain, "values"))) values += v
    values += Lt.map("propertyCall" -> Lt.map("name" -> propertyName))

    val inner = mutable.LinkedHashMap[String, Any]()
    for ((key, value) <- old) inner(key) = value
    inner("chain") = Lt.map("chain" -> Lt.map(
      "values" -> values,
      "initFunction" -> Lt.get(oldChain, "initFunction"),
    ))
    Lt.map("schema" -> inner)
  }

  def make_copy(structureName: String, source: Structure): Any = {
    val schema = source.getSchema()
    validate_schema(schema)
    Lt.map("copy" -> Lt.map(
      "structureName" -> structureName,
      "chain" -> Lt.get(Lt.get(schema, "schema"), "chain"),
    ))
  }

  def apply_copies(schema: mutable.LinkedHashMap[String, Any], copies: Any, targetStructureName: String): Unit = {
    if (!Lt.truthy(copies)) return
    for (cp <- Lt.items(copies)) {
      if (
        !cp.isInstanceOf[scala.collection.Map[_, _]]
          || !Lt.has(cp, "copy")
          || !Lt.get(cp, "copy").isInstanceOf[scala.collection.Map[_, _]]
          || !Lt.get(Lt.get(cp, "copy"), "structureName").isInstanceOf[String]
          || !Lt.get(Lt.get(cp, "copy"), "chain").isInstanceOf[scala.collection.Map[_, _]]
      ) {
        throw new RuntimeException("Invalid builder argument in init function: wrap the structure with copy(...)")
      }
      val name = Lt.asString(Lt.get(Lt.get(cp, "copy"), "structureName"))
      if (name != targetStructureName) {
        throw new RuntimeException("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'")
      }
      val value = Lt.map("copy" -> Lt.map(
        "structureName" -> name,
        "chain" -> Lt.get(Lt.get(cp, "copy"), "chain"),
      ))
      Lt.asList(Lt.get(Lt.get(Lt.get(Lt.get(schema, "schema"), "chain"), "chain"), "values")) += value
    }
  }


  def normalize_argument_structure_call(arg: Any): Any = {
    if (arg.isInstanceOf[SqlBuilder]) {
      return Lt.get(Lt.get(arg.asInstanceOf[Structure].getSchema(), "schema"), "chain")
    }
    if (arg.isInstanceOf[scala.collection.Map[_, _]]) throw new RuntimeException("Unknown structure call argument type")
    val got = arg match {
      case null => "null"
      case _: scala.collection.Seq[_] => "array"
      case _ => _typeof(arg)
    }
    throw new RuntimeException("Expected a structure instance for structure calls, but got " + got)
  }

  def copy(source: Any): Any = {
    if (source.isInstanceOf[SqlBuilder]) return make_copy("sql-builder", source.asInstanceOf[Structure])
    throw new RuntimeException("copy() expects a structure instance created by an init function")
  }
}

class SqlBuilder extends Structure {
  var schemaSqlBuilder: mutable.LinkedHashMap[String, Any] = Lt.map("schema" -> Lt.map("exportName" -> "schema", "importPaths" -> Lt.map("typescript" -> "../../../gntrees-sql-builder/typescript/index"), "chain" -> Lt.map("chain" -> Lt.map("values" -> Lt.array(), "initFunction" -> Lt.map("name" -> "sql-builder", "variableName" -> "s1")))))

  override def getSchema(): mutable.LinkedHashMap[String, Any] = schemaSqlBuilder

  def getSchema(exportName: String, importPaths: mutable.LinkedHashMap[String, Any]): mutable.LinkedHashMap[String, Any] = {
    val inner = Lt.asMap(Lt.get(schemaSqlBuilder, "schema"))
    if (exportName != null && exportName.nonEmpty) inner("exportName") = exportName
    if (importPaths != null) {
      val merged = mutable.LinkedHashMap[String, Any]()
      val existing = inner("importPaths")
      if (existing.isInstanceOf[scala.collection.Map[_, _]]) for ((k, v) <- Lt.asMap(existing)) merged(k) = v
      for ((k, v) <- importPaths) merged(k) = v
      inner("importPaths") = merged
    }
    schemaSqlBuilder
  }

  def initFromStructure(schema: mutable.LinkedHashMap[String, Any]): SqlBuilder = {
    Mc.validate_schema(schema)
    schemaSqlBuilder = schema
    this
  }

  def initFromInitFunction(initFunction: mutable.LinkedHashMap[String, Any]): SqlBuilder = initFromInitFunction(initFunction, null)

  def initFromInitFunction(initFunction: mutable.LinkedHashMap[String, Any], copies: Any): SqlBuilder = {
    if (!Lt.get(initFunction, "name").isInstanceOf[String] || !Lt.get(initFunction, "variableName").isInstanceOf[String]) {
      throw new RuntimeException("Invalid init function")
    }
    Lt.asMap(Lt.get(Lt.get(Lt.get(schemaSqlBuilder, "schema"), "chain"), "chain"))("initFunction") = initFunction
    Mc.apply_copies(schemaSqlBuilder, copies, "sql-builder")
    this
  }

  def select(__a: Any*): SqlBuilder = {
    val columns: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"select\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "select", Lt.array(
      Lt.map("arg" -> columns, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))))), Lt.map("map" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (columns != Lt.MISSING))
    ), false))
  }

  def from(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"from\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "from", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING))
    ), false))
  }

  def transaction(__a: Any*): SqlBuilder = {
    val transaction: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (transaction == Lt.MISSING) throw new RuntimeException("Parameter \"transaction\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "transaction", Lt.array(
      Lt.map("arg" -> transaction, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (transaction != Lt.MISSING))
    ), false))
  }

  def orderBy(__a: Any*): SqlBuilder = {
    val columns: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"orderBy\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "orderBy", Lt.array(
      Lt.map("arg" -> columns, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (columns != Lt.MISSING))
    ), false))
  }

  def limit(__a: Any*): SqlBuilder = {
    val count: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (count == Lt.MISSING) throw new RuntimeException("Parameter \"limit\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "limit", Lt.array(
      Lt.map("arg" -> count, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (count != Lt.MISSING))
    ), false))
  }

  def offset(__a: Any*): SqlBuilder = {
    val count: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (count == Lt.MISSING) throw new RuntimeException("Parameter \"offset\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "offset", Lt.array(
      Lt.map("arg" -> count, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (count != Lt.MISSING))
    ), false))
  }

  def with_(__a: Any*): SqlBuilder = {
    val statement: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val as: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"with\" argument #1 was not provided")
    if (as == Lt.MISSING) throw new RuntimeException("Parameter \"with\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "with", Lt.array(
      Lt.map("arg" -> statement, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (statement != Lt.MISSING)),
      Lt.map("arg" -> as, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (as != Lt.MISSING))
    ), false))
  }

  def groupBy(__a: Any*): SqlBuilder = {
    val columns: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"groupBy\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "groupBy", Lt.array(
      Lt.map("arg" -> columns, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (columns != Lt.MISSING))
    ), false))
  }

  def having(__a: Any*): SqlBuilder = {
    val statement: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"having\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "having", Lt.array(
      Lt.map("arg" -> statement, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (statement != Lt.MISSING))
    ), false))
  }

  def where(__a: Any*): SqlBuilder = {
    val statement: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"where\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "where", Lt.array(
      Lt.map("arg" -> statement, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (statement != Lt.MISSING))
    ), false))
  }

  def update(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val set: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"update\" argument #1 was not provided")
    if (set == Lt.MISSING) throw new RuntimeException("Parameter \"update\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "update", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> set, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("map" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (set != Lt.MISSING))
    ), false))
  }

  def set(__a: Any*): SqlBuilder = {
    val statement: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (statement == Lt.MISSING) throw new RuntimeException("Parameter \"set\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "set", Lt.array(
      Lt.map("arg" -> statement, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("map" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (statement != Lt.MISSING))
    ), false))
  }

  def insert(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val set: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"insert\" argument #1 was not provided")
    if (set == Lt.MISSING) throw new RuntimeException("Parameter \"insert\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "insert", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> set, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("map" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (set != Lt.MISSING))
    ), false))
  }

  def values(__a: Any*): SqlBuilder = {
    val values: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (values == Lt.MISSING) throw new RuntimeException("Parameter \"values\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "values", Lt.array(
      Lt.map("arg" -> values, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))))), Lt.map("array" -> Lt.map("type" -> Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))))), "provided" -> (values != Lt.MISSING))
    ), false))
  }

  def returning(__a: Any*): SqlBuilder = {
    val columns: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (columns == Lt.MISSING) throw new RuntimeException("Parameter \"returning\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "returning", Lt.array(
      Lt.map("arg" -> columns, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))))), Lt.map("map" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (columns != Lt.MISSING))
    ), false))
  }

  def onConflictDoNothing(__a: Any*): SqlBuilder = {
    val target: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (target == Lt.MISSING) throw new RuntimeException("Parameter \"onConflictDoNothing\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoNothing", Lt.array(
      Lt.map("arg" -> target, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (target != Lt.MISSING))
    ), false))
  }

  def onConflictDoUpdate(__a: Any*): SqlBuilder = {
    val target: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val set: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (target == Lt.MISSING) throw new RuntimeException("Parameter \"onConflictDoUpdate\" argument #1 was not provided")
    if (set == Lt.MISSING) throw new RuntimeException("Parameter \"onConflictDoUpdate\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "onConflictDoUpdate", Lt.array(
      Lt.map("arg" -> target, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (target != Lt.MISSING)),
      Lt.map("arg" -> set, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("map" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (set != Lt.MISSING))
    ), false))
  }

  def delete(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"delete\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "delete", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING))
    ), false))
  }

  def join(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val on: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"join\" argument #1 was not provided")
    if (on == Lt.MISSING) throw new RuntimeException("Parameter \"join\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "join", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> on, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (on != Lt.MISSING))
    ), false))
  }

  def leftJoin(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val on: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"leftJoin\" argument #1 was not provided")
    if (on == Lt.MISSING) throw new RuntimeException("Parameter \"leftJoin\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "leftJoin", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> on, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (on != Lt.MISSING))
    ), false))
  }

  def rightJoin(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val on: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"rightJoin\" argument #1 was not provided")
    if (on == Lt.MISSING) throw new RuntimeException("Parameter \"rightJoin\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "rightJoin", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> on, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (on != Lt.MISSING))
    ), false))
  }

  def innerJoin(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val on: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"innerJoin\" argument #1 was not provided")
    if (on == Lt.MISSING) throw new RuntimeException("Parameter \"innerJoin\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "innerJoin", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> on, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (on != Lt.MISSING))
    ), false))
  }

  def fullJoin(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val on: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"fullJoin\" argument #1 was not provided")
    if (on == Lt.MISSING) throw new RuntimeException("Parameter \"fullJoin\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "fullJoin", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> on, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (on != Lt.MISSING))
    ), false))
  }

  def crossJoin(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val on: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"crossJoin\" argument #1 was not provided")
    if (on == Lt.MISSING) throw new RuntimeException("Parameter \"crossJoin\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "crossJoin", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING)),
      Lt.map("arg" -> on, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (on != Lt.MISSING))
    ), false))
  }

  def eq(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"eq\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "eq", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def gt(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"gt\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gt", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def gte(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"gte\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "gte", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def lt(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"lt\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lt", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def lte(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"lte\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "lte", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def exists(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"exists\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "exists", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def isNull(__a: Any*): SqlBuilder = {
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNull", Lt.array(
    ), false))
  }

  def isNotNull(__a: Any*): SqlBuilder = {
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "isNotNull", Lt.array(
    ), false))
  }

  def in(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"in\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "in", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def between(__a: Any*): SqlBuilder = {
    val first: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val second: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (first == Lt.MISSING) throw new RuntimeException("Parameter \"between\" argument #1 was not provided")
    if (second == Lt.MISSING) throw new RuntimeException("Parameter \"between\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "between", Lt.array(
      Lt.map("arg" -> first, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (first != Lt.MISSING)),
      Lt.map("arg" -> second, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (second != Lt.MISSING))
    ), false))
  }

  def like(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"like\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "like", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def ilike(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"ilike\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "ilike", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def not(__a: Any*): SqlBuilder = {
    val value: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"not\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "not", Lt.array(
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def and(__a: Any*): SqlBuilder = {
    val values: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (values == Lt.MISSING) throw new RuntimeException("Parameter \"and\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "and", Lt.array(
      Lt.map("arg" -> values, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (values != Lt.MISSING))
    ), false))
  }

  def or(__a: Any*): SqlBuilder = {
    val values: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (values == Lt.MISSING) throw new RuntimeException("Parameter \"or\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "or", Lt.array(
      Lt.map("arg" -> values, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), Lt.map("array" -> Lt.map("type" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder")))))))))), "provided" -> (values != Lt.MISSING))
    ), false))
  }

  def op(__a: Any*): SqlBuilder = {
    val operation: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    val value: Any = if (__a.size > 1) __a(1) else Lt.MISSING
    if (operation == Lt.MISSING) throw new RuntimeException("Parameter \"op\" argument #1 was not provided")
    if (value == Lt.MISSING) throw new RuntimeException("Parameter \"op\" argument #2 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "op", Lt.array(
      Lt.map("arg" -> operation, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (operation != Lt.MISSING)),
      Lt.map("arg" -> value, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (value != Lt.MISSING))
    ), false))
  }

  def raw(__a: Any*): SqlBuilder = {
    val __fargs = mutable.ArrayBuffer[Any]()
    __fargs += Lt.map("arg" -> (if (__a.size > 0) __a(0) else Lt.MISSING), "struct" -> Lt.map("string" -> Lt.map("type" -> "string")))
    for (__i <- 1 until __a.size) __fargs += Lt.map("arg" -> __a(__i), "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))))
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "raw", __fargs, true))
  }

  def asc(__a: Any*): SqlBuilder = {
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "asc", Lt.array(
    ), false))
  }

  def desc(__a: Any*): SqlBuilder = {
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "desc", Lt.array(
    ), false))
  }

  def as(__a: Any*): SqlBuilder = {
    val alias: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (alias == Lt.MISSING) throw new RuntimeException("Parameter \"as\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "as", Lt.array(
      Lt.map("arg" -> alias, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (alias != Lt.MISSING))
    ), false))
  }

  def col(__a: Any*): SqlBuilder = {
    val column: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (column == Lt.MISSING) throw new RuntimeException("Parameter \"col\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "col", Lt.array(
      Lt.map("arg" -> column, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (column != Lt.MISSING))
    ), false))
  }

  def table(__a: Any*): SqlBuilder = {
    val table: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (table == Lt.MISSING) throw new RuntimeException("Parameter \"table\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "table", Lt.array(
      Lt.map("arg" -> table, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("string" -> Lt.map("type" -> "string")), Lt.map("number" -> Lt.map("type" -> "number")), Lt.map("boolean" -> Lt.map("type" -> "boolean")), Lt.map("structureCall" -> Lt.map("name" -> "sql-builder"))))), "provided" -> (table != Lt.MISSING))
    ), false))
  }

  def setDialect(__a: Any*): SqlBuilder = {
    val db: Any = if (__a.size > 0) __a(0) else Lt.MISSING
    if (db == Lt.MISSING) throw new RuntimeException("Parameter \"setDialect\" argument #1 was not provided")
    SqlBuilder().initFromStructure(Mc.create_schema(getSchema(), "setDialect", Lt.array(
      Lt.map("arg" -> db, "struct" -> Lt.map("union" -> Lt.map("types" -> Lt.array(Lt.map("literal" -> Lt.map("value" -> "postgres", "type" -> "string")), Lt.map("literal" -> Lt.map("value" -> "mysql", "type" -> "string")), Lt.map("literal" -> Lt.map("value" -> "sqlite", "type" -> "string")), Lt.map("literal" -> Lt.map("value" -> "single-store", "type" -> "string")), Lt.map("literal" -> Lt.map("value" -> "mssql", "type" -> "string")), Lt.map("literal" -> Lt.map("value" -> "cockroach", "type" -> "string"))))), "provided" -> (db != Lt.MISSING))
    ), false))
  }

  def parse(): Any = {
    val root: Any = this.getSchema()
    val __fns = scala.collection.mutable.LinkedHashMap[String, List[Any] => Any]()
    var dialect: Any = Lt.string("")
    var quote: Any = Lt.string("")
    var sql: Any = Lt.bufNew()
    var wsql: Any = Lt.bufNew()
    var params: Any = Lt.listNew()
    var orderSql: Any = Lt.string("")
    var orderW: Any = Lt.string("")
    var hasOrder: Any = Lt.boolean(false)
    var tmp: Any = Lt.string("")
    var tmp2: Any = Lt.string("")
    var tmpRef: Any = Lt.string("")
    var subAlias: Any = Lt.string("")
    var withFirst: Any = Lt.boolean(true)
    def __fn_normName(__a: List[Any]): Any = {
      val n: Any = __a(0)
      return Lt.toLower(Lt.replace(n, Lt.string("-"), Lt.string("")))
      return Lt.nullValue()
    }
    __fns("normName") = __fn_normName
    def __fn_pushSql(__a: List[Any]): Any = {
      val text: Any = __a(0)
      sql = Lt.bufAppend(sql, Lt.string(" "))
      sql = Lt.bufAppend(sql, text)
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("pushSql") = __fn_pushSql
    def __fn_pushW(__a: List[Any]): Any = {
      val text: Any = __a(0)
      wsql = Lt.bufAppend(wsql, Lt.string(" "))
      wsql = Lt.bufAppend(wsql, text)
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("pushW") = __fn_pushW
    def __fn_asString(__a: List[Any]): Any = {
      val arg: Any = __a(0)
      return Lt.get(Lt.get(arg, Lt.string("string")), Lt.string("value"))
      return Lt.nullValue()
    }
    __fns("asString") = __fn_asString
    def __fn_identStr(__a: List[Any]): Any = {
      val name: Any = __a(0)
      var escapedName: Any = Lt.replace(name, quote, Lt.strConcat(quote, quote))
      var qualifiedName: Any = Lt.replace(escapedName, Lt.string("."), Lt.strConcat(quote, Lt.strConcat(Lt.string("."), quote)))
      return Lt.strConcat(quote, Lt.strConcat(qualifiedName, quote))
      return Lt.nullValue()
    }
    __fns("identStr") = __fn_identStr
    def __fn_literalOf(__a: List[Any]): Any = {
      val arg: Any = __a(0)
      var outLiteral: Any = Lt.string("")
      if (Lt.truthy(Lt.has(arg, Lt.string("string")))) {
        outLiteral = Lt.strConcat(Lt.string("'"), Lt.strConcat(Lt.replace(__fns("asString")(List(arg)), Lt.string("'"), Lt.string("''")), Lt.string("'")))
      }
      else if (Lt.truthy(Lt.has(arg, Lt.string("number")))) {
        outLiteral = Lt.asString(Lt.get(Lt.get(arg, Lt.string("number")), Lt.string("value")))
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
    __fns("literalOf") = __fn_literalOf
    def __fn_opOf(__a: List[Any]): Any = {
      val n: Any = __a(0)
      var o: Any = Lt.string("")
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
    __fns("opOf") = __fn_opOf
    def __fn_itemsOf(__a: List[Any]): Any = {
      val arg: Any = __a(0)
      if (Lt.truthy(Lt.has(arg, Lt.string("array")))) {
        return Lt.get(Lt.get(arg, Lt.string("array")), Lt.string("value"))
      }
      return Lt.append(Lt.array(), arg)
      return Lt.nullValue()
    }
    __fns("itemsOf") = __fn_itemsOf
    def __fn_isRef(__a: List[Any]): Any = {
      val chainValues: Any = __a(0)
      tmpRef = Lt.string("")
      if (Lt.valueEquals(Lt.len(chainValues), Lt.number(1)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall")))) {
        var firstName: Any = Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name")
        if (Lt.valueEquals(firstName, Lt.string("col")) || Lt.valueEquals(firstName, Lt.string("table"))) {
          tmpRef = __fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
        }
      }
      return tmpRef
      return Lt.nullValue()
    }
    __fns("isRef") = __fn_isRef
    def __fn_emitParam(__a: List[Any]): Any = {
      val arg: Any = __a(0)
      params = Lt.listPush(params, arg)
      if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
        tmp = Lt.strConcat(Lt.string("$"), Lt.asString(Lt.listLen(params)))
      }
      else {
        tmp = Lt.string("?")
      }
      __fns("pushSql")(List(tmp))
      tmp2 = __fns("literalOf")(List(arg))
      __fns("pushW")(List(tmp2))
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("emitParam") = __fn_emitParam
    def __fn_emitIdent(__a: List[Any]): Any = {
      val name: Any = __a(0)
      tmp = __fns("identStr")(List(name))
      __fns("pushSql")(List(tmp))
      __fns("pushW")(List(tmp))
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("emitIdent") = __fn_emitIdent
    def __fn_emitRaw(__a: List[Any]): Any = {
      val node: Any = __a(0)
      if (!Lt.valueEquals(Lt.bufLen(sql), Lt.number(0))) {
        sql = Lt.bufAppend(sql, Lt.string(" "))
        wsql = Lt.bufAppend(wsql, Lt.string(" "))
      }
      try {
        for (rawArg <- Lt.arrayItems(Lt.get(Lt.get(node, "functionCall"), "arguments"))) {
          try {
            var rawVal: Any = Lt.get(rawArg, Lt.string("argument"))
            if (Lt.truthy(Lt.has(rawVal, Lt.string("string")))) {
              sql = Lt.bufAppend(sql, __fns("asString")(List(rawVal)))
              wsql = Lt.bufAppend(wsql, __fns("asString")(List(rawVal)))
            }
            else if (Lt.truthy(Lt.has(rawVal, Lt.string("chain")))) {
              tmpRef = __fns("isRef")(List(Lt.get(Lt.get(rawVal, "chain"), "values")))
              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                sql = Lt.bufAppend(sql, __fns("identStr")(List(tmpRef)))
                wsql = Lt.bufAppend(wsql, __fns("identStr")(List(tmpRef)))
              }
              else {
                params = Lt.listPush(params, rawVal)
                if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
                  tmp = Lt.strConcat(Lt.string("$"), Lt.asString(Lt.listLen(params)))
                }
                else {
                  tmp = Lt.string("?")
                }
                sql = Lt.bufAppend(sql, tmp)
                tmp2 = __fns("literalOf")(List(rawVal))
                wsql = Lt.bufAppend(wsql, tmp2)
              }
            }
            else {
              params = Lt.listPush(params, rawVal)
              if (Lt.valueEquals(dialect, Lt.string("postgres"))) {
                tmp = Lt.strConcat(Lt.string("$"), Lt.asString(Lt.listLen(params)))
              }
              else {
                tmp = Lt.string("?")
              }
              sql = Lt.bufAppend(sql, tmp)
              tmp2 = __fns("literalOf")(List(rawVal))
              wsql = Lt.bufAppend(wsql, tmp2)
            }
          } catch { case _: LoopContinue => () }
        }
      } catch { case _: LoopBreak => () }
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("emitRaw") = __fn_emitRaw
    def __fn_conflictTarget(__a: List[Any]): Any = {
      val arg: Any = __a(0)
      var ct: Any = Lt.string("()")
      if (Lt.truthy(Lt.has(arg, Lt.string("chain")))) {
        tmpRef = __fns("isRef")(List(Lt.get(Lt.get(arg, "chain"), "values")))
        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
          ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns("identStr")(List(tmpRef)), Lt.string(")")))
        }
      }
      else if (Lt.truthy(Lt.has(arg, Lt.string("string")))) {
        ct = Lt.strConcat(Lt.string("("), Lt.strConcat(__fns("identStr")(List(__fns("asString")(List(arg)))), Lt.string(")")))
      }
      return ct
      return Lt.nullValue()
    }
    __fns("conflictTarget") = __fn_conflictTarget
    def __fn_firstKind(__a: List[Any]): Any = {
      val chainValues: Any = __a(0)
      var kind: Any = Lt.string("")
      if (!Lt.valueEquals(Lt.len(chainValues), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(chainValues, Lt.number(0)), Lt.string("functionCall")))) {
        kind = __fns("normName")(List(Lt.get(Lt.get(Lt.index(chainValues, Lt.number(0)), "functionCall"), "name")))
      }
      return kind
      return Lt.nullValue()
    }
    __fns("firstKind") = __fn_firstKind
    def __fn_emitOrderItem(__a: List[Any]): Any = {
      val item: Any = __a(0)
      var dir: Any = Lt.string("")
      var ordName: Any = Lt.string("")
      if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
        try {
          for (on <- Lt.arrayItems(Lt.get(Lt.get(item, "chain"), "values"))) {
            try {
              var onn: Any = __fns("normName")(List(Lt.get(Lt.get(on, "functionCall"), "name")))
              if (Lt.valueEquals(onn, Lt.string("asc"))) {
                dir = Lt.string(" ASC")
              }
              else if (Lt.valueEquals(onn, Lt.string("desc"))) {
                dir = Lt.string(" DESC")
              }
              else if (Lt.valueEquals(onn, Lt.string("col")) || Lt.valueEquals(onn, Lt.string("table"))) {
                ordName = __fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(on, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
              }
            } catch { case _: LoopContinue => () }
          }
        } catch { case _: LoopBreak => () }
      }
      if (!Lt.valueEquals(ordName, Lt.string(""))) {
        tmp = __fns("identStr")(List(ordName))
        orderSql = Lt.strConcat(orderSql, Lt.strConcat(tmp, dir))
        orderW = Lt.strConcat(orderW, Lt.strConcat(tmp, dir))
      }
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("emitOrderItem") = __fn_emitOrderItem
    def __fn_emitOrderList(__a: List[Any]): Any = {
      val arg: Any = __a(0)
      var firstOrder: Any = Lt.boolean(true)
      try {
        for (item <- Lt.arrayItems(__fns("itemsOf")(List(arg)))) {
          try {
            if (Lt.valueEquals(firstOrder, Lt.boolean(false))) {
              orderSql = Lt.strConcat(orderSql, Lt.string(", "))
              orderW = Lt.strConcat(orderW, Lt.string(", "))
            }
            firstOrder = Lt.boolean(false)
            __fns("emitOrderItem")(List(item))
          } catch { case _: LoopContinue => () }
        }
      } catch { case _: LoopBreak => () }
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("emitOrderList") = __fn_emitOrderList
    def __fn_flushOrder(__a: List[Any]): Any = {
      if (Lt.truthy(hasOrder)) {
        __fns("pushSql")(List(Lt.string("ORDER")))
        __fns("pushSql")(List(Lt.string("BY")))
        __fns("pushW")(List(Lt.string("ORDER")))
        __fns("pushW")(List(Lt.string("BY")))
        tmp = orderSql
        if (!Lt.valueEquals(tmp, Lt.string(""))) {
          __fns("pushSql")(List(tmp))
        }
        tmp2 = orderW
        if (!Lt.valueEquals(tmp2, Lt.string(""))) {
          __fns("pushW")(List(tmp2))
        }
        hasOrder = Lt.boolean(false)
      }
      return Lt.nullValue()
      return Lt.nullValue()
    }
    __fns("flushOrder") = __fn_flushOrder
    try {
      for (dialectNode <- Lt.arrayItems(Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values"))) {
        try {
          if (Lt.valueEquals(__fns("normName")(List(Lt.get(Lt.get(dialectNode, "functionCall"), "name"))), Lt.string("setdialect"))) {
            dialect = Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(dialectNode, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("string")), Lt.string("value"))
          }
        } catch { case _: LoopContinue => () }
      }
    } catch { case _: LoopBreak => () }
    if (Lt.valueEquals(dialect, Lt.string(""))) {
      throw new RuntimeException(Lt.asString(Lt.string("sql-builder parse: setDialect(...) must be called before parse()")))
    }
    else if (!Lt.valueEquals(dialect, Lt.string("postgres")) && !Lt.valueEquals(dialect, Lt.string("mysql"))) {
      throw new RuntimeException(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported dialect "), dialect)))
    }
    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
      quote = Lt.string("`")
    }
    else {
      quote = Lt.string("\"")
    }
    def __fn_renderNodes(__a: List[Any]): Any = {
      val nodes: Any = __a(0)
      val mode: Any = __a(1)
      var savedSql: Any = Lt.string("")
      var savedW: Any = Lt.string("")
      var savedOrderSql: Any = Lt.string("")
      var savedOrderW: Any = Lt.string("")
      var savedHasOrder: Any = Lt.boolean(false)
      var savedAlias: Any = Lt.string("")
      var subSql: Any = Lt.string("")
      var subW: Any = Lt.string("")
      var subAliasText: Any = Lt.string("")
      var first: Any = Lt.boolean(true)
      var left: Any = Lt.string("")
      var hasLeft: Any = Lt.boolean(false)
      var base: Any = Lt.string("")
      if (Lt.valueEquals(mode, Lt.number(0))) {
        try {
          for (node <- Lt.arrayItems(nodes)) {
            try {
              if (Lt.truthy(Lt.has(node, Lt.string("functionCall")))) {
                var name: Any = Lt.get(Lt.get(node, "functionCall"), "name")
                var nameNorm: Any = __fns("normName")(List(name))
                if (Lt.valueEquals(nameNorm, Lt.string("setdialect"))) {
                  throw new LoopContinue
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
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
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
                      __fns("pushSql")(List(Lt.string("WITH")))
                      __fns("pushW")(List(Lt.string("WITH")))
                    }
                    __fns("pushSql")(List(__fns("identStr")(List(__fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))))))
                    __fns("pushW")(List(__fns("identStr")(List(__fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))))))
                    __fns("pushSql")(List(Lt.string("AS")))
                    __fns("pushW")(List(Lt.string("AS")))
                    __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                    __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("transaction"))) {
                    __fns("pushSql")(List(Lt.string("BEGIN")))
                    __fns("pushW")(List(Lt.string("BEGIN")))
                    sql = Lt.bufAppend(sql, Lt.string(";"))
                    wsql = Lt.bufAppend(wsql, Lt.string(";"))
                    var txnFirst: Any = Lt.boolean(true)
                    try {
                      for (txnItem <- Lt.arrayItems(__fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                        try {
                          if (Lt.valueEquals(txnFirst, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(";"))
                            wsql = Lt.bufAppend(wsql, Lt.string(";"))
                          }
                          txnFirst = Lt.boolean(false)
                          if (Lt.truthy(Lt.has(txnItem, Lt.string("chain")))) {
                            __fns("renderNodes")(List(Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)))
                          }
                          else if (Lt.truthy(Lt.has(txnItem, Lt.string("string")))) {
                            __fns("pushSql")(List(__fns("asString")(List(txnItem))))
                            __fns("pushW")(List(__fns("asString")(List(txnItem))))
                          }
                          else {
                            if (Lt.truthy(Lt.has(txnItem, Lt.string("chain")))) {
                              tmpRef = __fns("isRef")(List(Lt.get(Lt.get(txnItem, "chain"), "values")))
                              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                                __fns("emitIdent")(List(tmpRef))
                              }
                              else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(txnItem, "chain"), "values"))), Lt.string("delete")))))) {
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
                                __fns("renderNodes")(List(Lt.get(Lt.get(txnItem, "chain"), "values"), Lt.number(0)))
                                subSql = Lt.trim(Lt.bufStr(sql))
                                subW = Lt.trim(Lt.bufStr(wsql))
                                subAliasText = subAlias
                                sql = savedSql
                                wsql = savedW
                                orderSql = savedOrderSql
                                orderW = savedOrderW
                                hasOrder = savedHasOrder
                                subAlias = savedAlias
                                __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                                __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                                if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                  __fns("pushSql")(List(subAliasText))
                                  __fns("pushW")(List(subAliasText))
                                }
                              }
                              else {
                                __fns("emitParam")(List(txnItem))
                              }
                            }
                            else {
                              __fns("emitParam")(List(txnItem))
                            }
                          }
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                    if (Lt.valueEquals(txnFirst, Lt.boolean(false))) {
                      sql = Lt.bufAppend(sql, Lt.string(";"))
                      wsql = Lt.bufAppend(wsql, Lt.string(";"))
                    }
                    __fns("pushSql")(List(Lt.string("COMMIT")))
                    __fns("pushW")(List(Lt.string("COMMIT")))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("select"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("SELECT")))
                    __fns("pushW")(List(Lt.string("SELECT")))
                    var firstItem: Any = Lt.boolean(true)
                    try {
                      for (item <- Lt.arrayItems(__fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                        try {
                          if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          firstItem = Lt.boolean(false)
                          if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                            tmpRef = __fns("isRef")(List(Lt.get(Lt.get(item, "chain"), "values")))
                            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                              __fns("emitIdent")(List(tmpRef))
                            }
                            else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("delete")))))) {
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
                              __fns("renderNodes")(List(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)))
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                              __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                              if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                __fns("pushSql")(List(subAliasText))
                                __fns("pushW")(List(subAliasText))
                              }
                            }
                            else {
                              __fns("renderNodes")(List(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)))
                            }
                          }
                          else {
                            __fns("emitParam")(List(item))
                          }
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("from"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("FROM")))
                    __fns("pushW")(List(Lt.string("FROM")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("join"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("JOIN")))
                    __fns("pushW")(List(Lt.string("JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns("pushSql")(List(Lt.string("ON")))
                    __fns("pushW")(List(Lt.string("ON")))
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("leftjoin"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("LEFT JOIN")))
                    __fns("pushW")(List(Lt.string("LEFT JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns("pushSql")(List(Lt.string("ON")))
                    __fns("pushW")(List(Lt.string("ON")))
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("rightjoin"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("RIGHT JOIN")))
                    __fns("pushW")(List(Lt.string("RIGHT JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns("pushSql")(List(Lt.string("ON")))
                    __fns("pushW")(List(Lt.string("ON")))
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("innerjoin"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("INNER JOIN")))
                    __fns("pushW")(List(Lt.string("INNER JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns("pushSql")(List(Lt.string("ON")))
                    __fns("pushW")(List(Lt.string("ON")))
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("fulljoin"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      throw new RuntimeException(Lt.asString(Lt.string("sql-builder parse: FULL JOIN is not supported by mysql")))
                    }
                    else {
                      __fns("flushOrder")(List())
                      __fns("pushSql")(List(Lt.string("FULL JOIN")))
                      __fns("pushW")(List(Lt.string("FULL JOIN")))
                      if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                        tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                        if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                          __fns("emitIdent")(List(tmpRef))
                        }
                        else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                          __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                          subSql = Lt.trim(Lt.bufStr(sql))
                          subW = Lt.trim(Lt.bufStr(wsql))
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                          __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                          if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                            __fns("pushSql")(List(subAliasText))
                            __fns("pushW")(List(subAliasText))
                          }
                        }
                        else {
                          __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                        }
                      }
                      else {
                        __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                      __fns("pushSql")(List(Lt.string("ON")))
                      __fns("pushW")(List(Lt.string("ON")))
                      __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("crossjoin"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("CROSS JOIN")))
                    __fns("pushW")(List(Lt.string("CROSS JOIN")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns("pushSql")(List(Lt.string("ON")))
                    __fns("pushW")(List(Lt.string("ON")))
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("where"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("WHERE")))
                    __fns("pushW")(List(Lt.string("WHERE")))
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("groupby"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("GROUP BY")))
                    __fns("pushW")(List(Lt.string("GROUP BY")))
                    var firstItem: Any = Lt.boolean(true)
                    try {
                      for (item <- Lt.arrayItems(__fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                        try {
                          if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          firstItem = Lt.boolean(false)
                          if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                            tmpRef = __fns("isRef")(List(Lt.get(Lt.get(item, "chain"), "values")))
                            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                              __fns("emitIdent")(List(tmpRef))
                            }
                            else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("delete")))))) {
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
                              __fns("renderNodes")(List(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)))
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                              __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                              if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                __fns("pushSql")(List(subAliasText))
                                __fns("pushW")(List(subAliasText))
                              }
                            }
                            else {
                              __fns("renderNodes")(List(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)))
                            }
                          }
                          else {
                            __fns("emitParam")(List(item))
                          }
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("having"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("HAVING")))
                    __fns("pushW")(List(Lt.string("HAVING")))
                    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("returning"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      throw new RuntimeException(Lt.asString(Lt.string("sql-builder parse: RETURNING is not supported by mysql")))
                    }
                    else {
                      __fns("flushOrder")(List())
                      __fns("pushSql")(List(Lt.string("RETURNING")))
                      __fns("pushW")(List(Lt.string("RETURNING")))
                      var firstItem: Any = Lt.boolean(true)
                      try {
                        for (item <- Lt.arrayItems(__fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                          try {
                            if (Lt.valueEquals(firstItem, Lt.boolean(false))) {
                              sql = Lt.bufAppend(sql, Lt.string(","))
                              wsql = Lt.bufAppend(wsql, Lt.string(","))
                            }
                            firstItem = Lt.boolean(false)
                            if (Lt.truthy(Lt.has(item, Lt.string("chain")))) {
                              tmpRef = __fns("isRef")(List(Lt.get(Lt.get(item, "chain"), "values")))
                              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                                __fns("emitIdent")(List(tmpRef))
                              }
                              else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(item, "chain"), "values"))), Lt.string("delete")))))) {
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
                                __fns("renderNodes")(List(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(0)))
                                subSql = Lt.trim(Lt.bufStr(sql))
                                subW = Lt.trim(Lt.bufStr(wsql))
                                subAliasText = subAlias
                                sql = savedSql
                                wsql = savedW
                                orderSql = savedOrderSql
                                orderW = savedOrderW
                                hasOrder = savedHasOrder
                                subAlias = savedAlias
                                __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                                __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                                if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                  __fns("pushSql")(List(subAliasText))
                                  __fns("pushW")(List(subAliasText))
                                }
                              }
                              else {
                                __fns("renderNodes")(List(Lt.get(Lt.get(item, "chain"), "values"), Lt.number(1)))
                              }
                            }
                            else {
                              __fns("emitParam")(List(item))
                            }
                          } catch { case _: LoopContinue => () }
                        }
                      } catch { case _: LoopBreak => () }
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("orderby"))) {
                    hasOrder = Lt.boolean(true)
                    orderSql = Lt.string("")
                    orderW = Lt.string("")
                    __fns("emitOrderList")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("limit"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("LIMIT")))
                    __fns("pushW")(List(Lt.string("LIMIT")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("offset"))) {
                    __fns("flushOrder")(List())
                    __fns("pushSql")(List(Lt.string("OFFSET")))
                    __fns("pushW")(List(Lt.string("OFFSET")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("raw"))) {
                    __fns("emitRaw")(List(node))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("as"))) {
                    subAlias = Lt.strConcat(Lt.string("AS "), __fns("identStr")(List(__fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("update"))) {
                    __fns("pushSql")(List(Lt.string("UPDATE")))
                    __fns("pushW")(List(Lt.string("UPDATE")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns("pushSql")(List(Lt.string("SET")))
                    __fns("pushW")(List(Lt.string("SET")))
                    var assnFirst: Any = Lt.boolean(true)
                    try {
                      for (ak <- Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                        try {
                          if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          assnFirst = Lt.boolean(false)
                          __fns("pushSql")(List(__fns("identStr")(List(ak))))
                          __fns("pushW")(List(__fns("identStr")(List(ak))))
                          __fns("pushSql")(List(Lt.string("=")))
                          __fns("pushW")(List(Lt.string("=")))
                          if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                            tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                              __fns("emitIdent")(List(tmpRef))
                            }
                            else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
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
                              __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                              __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                              if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                __fns("pushSql")(List(subAliasText))
                                __fns("pushW")(List(subAliasText))
                              }
                            }
                            else {
                              __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                            }
                          }
                          else {
                            __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                          }
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("insert"))) {
                    __fns("pushSql")(List(Lt.string("INSERT")))
                    __fns("pushW")(List(Lt.string("INSERT")))
                    __fns("pushSql")(List(Lt.string("INTO")))
                    __fns("pushW")(List(Lt.string("INTO")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                    __fns("pushSql")(List(Lt.string("(")))
                    __fns("pushW")(List(Lt.string("(")))
                    var colFirst: Any = Lt.boolean(true)
                    try {
                      for (ck <- Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                        try {
                          if (Lt.valueEquals(colFirst, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          colFirst = Lt.boolean(false)
                          __fns("pushSql")(List(__fns("identStr")(List(ck))))
                          __fns("pushW")(List(__fns("identStr")(List(ck))))
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                    __fns("pushSql")(List(Lt.string(")")))
                    __fns("pushW")(List(Lt.string(")")))
                    __fns("pushSql")(List(Lt.string("VALUES")))
                    __fns("pushW")(List(Lt.string("VALUES")))
                    __fns("pushSql")(List(Lt.string("(")))
                    __fns("pushW")(List(Lt.string("(")))
                    var valFirst: Any = Lt.boolean(true)
                    try {
                      for (vk <- Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                        try {
                          if (Lt.valueEquals(valFirst, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          valFirst = Lt.boolean(false)
                          if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), Lt.string("chain")))) {
                            tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values")))
                            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                              __fns("emitIdent")(List(tmpRef))
                            }
                            else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"))), Lt.string("delete")))))) {
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
                              __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk), "chain"), "values"), Lt.number(0)))
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                              __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                              if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                __fns("pushSql")(List(subAliasText))
                                __fns("pushW")(List(subAliasText))
                              }
                            }
                            else {
                              __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)))
                            }
                          }
                          else {
                            __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), vk)))
                          }
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                    __fns("pushSql")(List(Lt.string(")")))
                    __fns("pushW")(List(Lt.string(")")))
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("delete"))) {
                    __fns("pushSql")(List(Lt.string("DELETE")))
                    __fns("pushW")(List(Lt.string("DELETE")))
                    __fns("pushSql")(List(Lt.string("FROM")))
                    __fns("pushW")(List(Lt.string("FROM")))
                    if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                      tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                      if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                        __fns("emitIdent")(List(tmpRef))
                      }
                      else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                        __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                        subSql = Lt.trim(Lt.bufStr(sql))
                        subW = Lt.trim(Lt.bufStr(wsql))
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                        __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                        if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                          __fns("pushSql")(List(subAliasText))
                          __fns("pushW")(List(subAliasText))
                        }
                      }
                      else {
                        __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("set"))) {
                    __fns("pushSql")(List(Lt.string("SET")))
                    __fns("pushW")(List(Lt.string("SET")))
                    var assnFirst: Any = Lt.boolean(true)
                    try {
                      for (ak <- Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value")))) {
                        try {
                          if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          assnFirst = Lt.boolean(false)
                          __fns("pushSql")(List(__fns("identStr")(List(ak))))
                          __fns("pushW")(List(__fns("identStr")(List(ak))))
                          __fns("pushSql")(List(Lt.string("=")))
                          __fns("pushW")(List(Lt.string("=")))
                          if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                            tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                              __fns("emitIdent")(List(tmpRef))
                            }
                            else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
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
                              __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                              __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                              if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                __fns("pushSql")(List(subAliasText))
                                __fns("pushW")(List(subAliasText))
                              }
                            }
                            else {
                              __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)))
                            }
                          }
                          else {
                            __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "object"), "value"), ak)))
                          }
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("values"))) {
                    __fns("pushSql")(List(Lt.string("VALUES")))
                    __fns("pushW")(List(Lt.string("VALUES")))
                    var valueRows: Any = __fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    var valueFirst: Any = Lt.boolean(true)
                    if (!Lt.valueEquals(Lt.len(valueRows), Lt.number(0)) && Lt.truthy(Lt.has(Lt.index(valueRows, Lt.number(0)), Lt.string("array")))) {
                      try {
                        for (tuple <- Lt.arrayItems(valueRows)) {
                          try {
                            if (Lt.valueEquals(valueFirst, Lt.boolean(false))) {
                              sql = Lt.bufAppend(sql, Lt.string(","))
                              wsql = Lt.bufAppend(wsql, Lt.string(","))
                            }
                            valueFirst = Lt.boolean(false)
                            if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                              __fns("pushSql")(List(Lt.string("ROW")))
                              __fns("pushW")(List(Lt.string("ROW")))
                            }
                            __fns("pushSql")(List(Lt.string("(")))
                            __fns("pushW")(List(Lt.string("(")))
                            var itemFirst: Any = Lt.boolean(true)
                            try {
                              for (ti <- Lt.arrayItems(__fns("itemsOf")(List(tuple)))) {
                                try {
                                  if (Lt.valueEquals(itemFirst, Lt.boolean(false))) {
                                    sql = Lt.bufAppend(sql, Lt.string(","))
                                    wsql = Lt.bufAppend(wsql, Lt.string(","))
                                  }
                                  itemFirst = Lt.boolean(false)
                                  if (Lt.truthy(Lt.has(ti, Lt.string("chain")))) {
                                    tmpRef = __fns("isRef")(List(Lt.get(Lt.get(ti, "chain"), "values")))
                                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                                      __fns("emitIdent")(List(tmpRef))
                                    }
                                    else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("delete")))))) {
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
                                      __fns("renderNodes")(List(Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)))
                                      subSql = Lt.trim(Lt.bufStr(sql))
                                      subW = Lt.trim(Lt.bufStr(wsql))
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                                      __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                        __fns("pushSql")(List(subAliasText))
                                        __fns("pushW")(List(subAliasText))
                                      }
                                    }
                                    else {
                                      __fns("emitParam")(List(ti))
                                    }
                                  }
                                  else {
                                    __fns("emitParam")(List(ti))
                                  }
                                } catch { case _: LoopContinue => () }
                              }
                            } catch { case _: LoopBreak => () }
                            __fns("pushSql")(List(Lt.string(")")))
                            __fns("pushW")(List(Lt.string(")")))
                          } catch { case _: LoopContinue => () }
                        }
                      } catch { case _: LoopBreak => () }
                    }
                    else {
                      if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                        __fns("pushSql")(List(Lt.string("ROW")))
                        __fns("pushW")(List(Lt.string("ROW")))
                      }
                      __fns("pushSql")(List(Lt.string("(")))
                      __fns("pushW")(List(Lt.string("(")))
                      var itemFirst: Any = Lt.boolean(true)
                      try {
                        for (ti <- Lt.arrayItems(valueRows)) {
                          try {
                            if (Lt.valueEquals(itemFirst, Lt.boolean(false))) {
                              sql = Lt.bufAppend(sql, Lt.string(","))
                              wsql = Lt.bufAppend(wsql, Lt.string(","))
                            }
                            itemFirst = Lt.boolean(false)
                            if (Lt.truthy(Lt.has(ti, Lt.string("chain")))) {
                              tmpRef = __fns("isRef")(List(Lt.get(Lt.get(ti, "chain"), "values")))
                              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                                __fns("emitIdent")(List(tmpRef))
                              }
                              else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(ti, "chain"), "values"))), Lt.string("delete")))))) {
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
                                __fns("renderNodes")(List(Lt.get(Lt.get(ti, "chain"), "values"), Lt.number(0)))
                                subSql = Lt.trim(Lt.bufStr(sql))
                                subW = Lt.trim(Lt.bufStr(wsql))
                                subAliasText = subAlias
                                sql = savedSql
                                wsql = savedW
                                orderSql = savedOrderSql
                                orderW = savedOrderW
                                hasOrder = savedHasOrder
                                subAlias = savedAlias
                                __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                                __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                                if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                  __fns("pushSql")(List(subAliasText))
                                  __fns("pushW")(List(subAliasText))
                                }
                              }
                              else {
                                __fns("emitParam")(List(ti))
                              }
                            }
                            else {
                              __fns("emitParam")(List(ti))
                            }
                          } catch { case _: LoopContinue => () }
                        }
                      } catch { case _: LoopBreak => () }
                      __fns("pushSql")(List(Lt.string(")")))
                      __fns("pushW")(List(Lt.string(")")))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("onconflictdonothing"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      throw new RuntimeException(Lt.asString(Lt.string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")))
                    }
                    else {
                      __fns("pushSql")(List(Lt.string("ON")))
                      __fns("pushW")(List(Lt.string("ON")))
                      __fns("pushSql")(List(Lt.string("CONFLICT")))
                      __fns("pushW")(List(Lt.string("CONFLICT")))
                      __fns("pushSql")(List(__fns("conflictTarget")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns("pushW")(List(__fns("conflictTarget")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns("pushSql")(List(Lt.string("DO")))
                      __fns("pushW")(List(Lt.string("DO")))
                      __fns("pushSql")(List(Lt.string("NOTHING")))
                      __fns("pushW")(List(Lt.string("NOTHING")))
                    }
                  }
                  else if (Lt.valueEquals(nameNorm, Lt.string("onconflictdoupdate"))) {
                    if (Lt.valueEquals(dialect, Lt.string("mysql"))) {
                      __fns("pushSql")(List(Lt.string("ON")))
                      __fns("pushW")(List(Lt.string("ON")))
                      __fns("pushSql")(List(Lt.string("DUPLICATE")))
                      __fns("pushW")(List(Lt.string("DUPLICATE")))
                      __fns("pushSql")(List(Lt.string("KEY")))
                      __fns("pushW")(List(Lt.string("KEY")))
                      __fns("pushSql")(List(Lt.string("UPDATE")))
                      __fns("pushW")(List(Lt.string("UPDATE")))
                      var assnFirst: Any = Lt.boolean(true)
                      try {
                        for (ak <- Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                          try {
                            if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                              sql = Lt.bufAppend(sql, Lt.string(","))
                              wsql = Lt.bufAppend(wsql, Lt.string(","))
                            }
                            assnFirst = Lt.boolean(false)
                            __fns("pushSql")(List(__fns("identStr")(List(ak))))
                            __fns("pushW")(List(__fns("identStr")(List(ak))))
                            __fns("pushSql")(List(Lt.string("=")))
                            __fns("pushW")(List(Lt.string("=")))
                            if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                              tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                                __fns("emitIdent")(List(tmpRef))
                              }
                              else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
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
                                __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                                subSql = Lt.trim(Lt.bufStr(sql))
                                subW = Lt.trim(Lt.bufStr(wsql))
                                subAliasText = subAlias
                                sql = savedSql
                                wsql = savedW
                                orderSql = savedOrderSql
                                orderW = savedOrderW
                                hasOrder = savedHasOrder
                                subAlias = savedAlias
                                __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                                __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                                if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                  __fns("pushSql")(List(subAliasText))
                                  __fns("pushW")(List(subAliasText))
                                }
                              }
                              else {
                                __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                              }
                            }
                            else {
                              __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                            }
                          } catch { case _: LoopContinue => () }
                        }
                      } catch { case _: LoopBreak => () }
                    }
                    else {
                      __fns("pushSql")(List(Lt.string("ON")))
                      __fns("pushW")(List(Lt.string("ON")))
                      __fns("pushSql")(List(Lt.string("CONFLICT")))
                      __fns("pushW")(List(Lt.string("CONFLICT")))
                      __fns("pushSql")(List(__fns("conflictTarget")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns("pushW")(List(__fns("conflictTarget")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                      __fns("pushSql")(List(Lt.string("DO")))
                      __fns("pushW")(List(Lt.string("DO")))
                      __fns("pushSql")(List(Lt.string("UPDATE")))
                      __fns("pushW")(List(Lt.string("UPDATE")))
                      __fns("pushSql")(List(Lt.string("SET")))
                      __fns("pushW")(List(Lt.string("SET")))
                      var assnFirst: Any = Lt.boolean(true)
                      try {
                        for (ak <- Lt.arrayItems(Lt.keys(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value")))) {
                          try {
                            if (Lt.valueEquals(assnFirst, Lt.boolean(false))) {
                              sql = Lt.bufAppend(sql, Lt.string(","))
                              wsql = Lt.bufAppend(wsql, Lt.string(","))
                            }
                            assnFirst = Lt.boolean(false)
                            __fns("pushSql")(List(__fns("identStr")(List(ak))))
                            __fns("pushW")(List(__fns("identStr")(List(ak))))
                            __fns("pushSql")(List(Lt.string("=")))
                            __fns("pushW")(List(Lt.string("=")))
                            if (Lt.truthy(Lt.has(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), Lt.string("chain")))) {
                              tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values")))
                              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                                __fns("emitIdent")(List(tmpRef))
                              }
                              else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"))), Lt.string("delete")))))) {
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
                                __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak), "chain"), "values"), Lt.number(0)))
                                subSql = Lt.trim(Lt.bufStr(sql))
                                subW = Lt.trim(Lt.bufStr(wsql))
                                subAliasText = subAlias
                                sql = savedSql
                                wsql = savedW
                                orderSql = savedOrderSql
                                orderW = savedOrderW
                                hasOrder = savedHasOrder
                                subAlias = savedAlias
                                __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                                __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                                if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                  __fns("pushSql")(List(subAliasText))
                                  __fns("pushW")(List(subAliasText))
                                }
                              }
                              else {
                                __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                              }
                            }
                            else {
                              __fns("emitParam")(List(Lt.get(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "object"), "value"), ak)))
                            }
                          } catch { case _: LoopContinue => () }
                        }
                      } catch { case _: LoopBreak => () }
                    }
                  }
                  else {
                    throw new RuntimeException(Lt.asString(Lt.strConcat(Lt.string("sql-builder parse: unsupported clause "), name)))
                  }
                }
              }
            } catch { case _: LoopContinue => () }
          }
        } catch { case _: LoopBreak => () }
        __fns("flushOrder")(List())
        return Lt.nullValue()
      }
      else {
        first = Lt.boolean(true)
        left = Lt.string("")
        hasLeft = Lt.boolean(false)
        base = Lt.string("")
        try {
          for (node <- Lt.arrayItems(nodes)) {
            try {
              var pn: Any = __fns("normName")(List(Lt.get(Lt.get(node, "functionCall"), "name")))
              var op: Any = __fns("opOf")(List(pn))
              if (Lt.truthy(Lt.has(node, Lt.string("functionCall")))) {
                if (Lt.valueEquals(pn, Lt.string("col")) || Lt.valueEquals(pn, Lt.string("table"))) {
                  left = __fns("identStr")(List(__fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  hasLeft = Lt.boolean(true)
                }
                else if (Lt.truthy(op)) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns("pushSql")(List(base))
                  __fns("pushW")(List(base))
                  __fns("pushSql")(List(op))
                  __fns("pushW")(List(op))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns("emitIdent")(List(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                      __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns("pushSql")(List(subAliasText))
                        __fns("pushW")(List(subAliasText))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("exists"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  __fns("pushSql")(List(Lt.string("EXISTS")))
                  __fns("pushW")(List(Lt.string("EXISTS")))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns("emitIdent")(List(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                      __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns("pushSql")(List(subAliasText))
                        __fns("pushW")(List(subAliasText))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("in"))) {
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
                      if (Lt.valueEquals(first, Lt.boolean(false))) {
                        __fns("pushSql")(List(Lt.string("AND")))
                        __fns("pushW")(List(Lt.string("AND")))
                      }
                      first = Lt.boolean(false)
                      if (Lt.truthy(hasLeft)) {
                        base = left
                      }
                      else {
                        base = Lt.string("?")
                      }
                      __fns("pushSql")(List(base))
                      __fns("pushW")(List(base))
                      __fns("pushSql")(List(Lt.string("IN")))
                      __fns("pushW")(List(Lt.string("IN")))
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
                      __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns("pushSql")(List(subAliasText))
                        __fns("pushW")(List(subAliasText))
                      }
                    }
                    else {
                      if (Lt.valueEquals(first, Lt.boolean(false))) {
                        __fns("pushSql")(List(Lt.string("AND")))
                        __fns("pushW")(List(Lt.string("AND")))
                      }
                      first = Lt.boolean(false)
                      if (Lt.truthy(hasLeft)) {
                        base = left
                      }
                      else {
                        base = Lt.string("?")
                      }
                      __fns("pushSql")(List(base))
                      __fns("pushW")(List(base))
                      __fns("pushSql")(List(Lt.string("IN (")))
                      __fns("pushW")(List(Lt.string("IN (")))
                      var inFirst: Any = Lt.boolean(true)
                      try {
                        for (iv <- Lt.arrayItems(__fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                          try {
                            if (Lt.valueEquals(inFirst, Lt.boolean(false))) {
                              sql = Lt.bufAppend(sql, Lt.string(","))
                              wsql = Lt.bufAppend(wsql, Lt.string(","))
                            }
                            inFirst = Lt.boolean(false)
                            if (Lt.truthy(Lt.has(iv, Lt.string("chain")))) {
                              tmpRef = __fns("isRef")(List(Lt.get(Lt.get(iv, "chain"), "values")))
                              if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                                __fns("emitIdent")(List(tmpRef))
                              }
                              else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("delete")))))) {
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
                                __fns("renderNodes")(List(Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)))
                                subSql = Lt.trim(Lt.bufStr(sql))
                                subW = Lt.trim(Lt.bufStr(wsql))
                                subAliasText = subAlias
                                sql = savedSql
                                wsql = savedW
                                orderSql = savedOrderSql
                                orderW = savedOrderW
                                hasOrder = savedHasOrder
                                subAlias = savedAlias
                                __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                                __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                                if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                  __fns("pushSql")(List(subAliasText))
                                  __fns("pushW")(List(subAliasText))
                                }
                              }
                              else {
                                __fns("emitParam")(List(iv))
                              }
                            }
                            else {
                              __fns("emitParam")(List(iv))
                            }
                          } catch { case _: LoopContinue => () }
                        }
                      } catch { case _: LoopBreak => () }
                      __fns("pushSql")(List(Lt.string(")")))
                      __fns("pushW")(List(Lt.string(")")))
                    }
                  }
                  else {
                    if (Lt.valueEquals(first, Lt.boolean(false))) {
                      __fns("pushSql")(List(Lt.string("AND")))
                      __fns("pushW")(List(Lt.string("AND")))
                    }
                    first = Lt.boolean(false)
                    if (Lt.truthy(hasLeft)) {
                      base = left
                    }
                    else {
                      base = Lt.string("?")
                    }
                    __fns("pushSql")(List(base))
                    __fns("pushW")(List(base))
                    __fns("pushSql")(List(Lt.string("IN (")))
                    __fns("pushW")(List(Lt.string("IN (")))
                    var inFirst: Any = Lt.boolean(true)
                    try {
                      for (iv <- Lt.arrayItems(__fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                        try {
                          if (Lt.valueEquals(inFirst, Lt.boolean(false))) {
                            sql = Lt.bufAppend(sql, Lt.string(","))
                            wsql = Lt.bufAppend(wsql, Lt.string(","))
                          }
                          inFirst = Lt.boolean(false)
                          if (Lt.truthy(Lt.has(iv, Lt.string("chain")))) {
                            tmpRef = __fns("isRef")(List(Lt.get(Lt.get(iv, "chain"), "values")))
                            if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                              __fns("emitIdent")(List(tmpRef))
                            }
                            else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(iv, "chain"), "values"))), Lt.string("delete")))))) {
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
                              __fns("renderNodes")(List(Lt.get(Lt.get(iv, "chain"), "values"), Lt.number(0)))
                              subSql = Lt.trim(Lt.bufStr(sql))
                              subW = Lt.trim(Lt.bufStr(wsql))
                              subAliasText = subAlias
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              subAlias = savedAlias
                              __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                              __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                              if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                                __fns("pushSql")(List(subAliasText))
                                __fns("pushW")(List(subAliasText))
                              }
                            }
                            else {
                              __fns("emitParam")(List(iv))
                            }
                          }
                          else {
                            __fns("emitParam")(List(iv))
                          }
                        } catch { case _: LoopContinue => () }
                      }
                    } catch { case _: LoopBreak => () }
                    __fns("pushSql")(List(Lt.string(")")))
                    __fns("pushW")(List(Lt.string(")")))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("between"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns("pushSql")(List(base))
                  __fns("pushW")(List(base))
                  __fns("pushSql")(List(Lt.string("BETWEEN")))
                  __fns("pushW")(List(Lt.string("BETWEEN")))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns("emitIdent")(List(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                      __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns("pushSql")(List(subAliasText))
                        __fns("pushW")(List(subAliasText))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))
                  }
                  __fns("pushSql")(List(Lt.string("AND")))
                  __fns("pushW")(List(Lt.string("AND")))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns("emitIdent")(List(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                      __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns("pushSql")(List(subAliasText))
                        __fns("pushW")(List(subAliasText))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("isnull"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns("pushSql")(List(base))
                  __fns("pushW")(List(base))
                  __fns("pushSql")(List(Lt.string("IS NULL")))
                  __fns("pushW")(List(Lt.string("IS NULL")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("isnotnull"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns("pushSql")(List(base))
                  __fns("pushW")(List(base))
                  __fns("pushSql")(List(Lt.string("IS NOT NULL")))
                  __fns("pushW")(List(Lt.string("IS NOT NULL")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("not"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  __fns("pushSql")(List(Lt.string("NOT (")))
                  __fns("pushW")(List(Lt.string("NOT (")))
                  __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")), "chain"), "values"), Lt.number(1)))
                  __fns("pushSql")(List(Lt.string(")")))
                  __fns("pushW")(List(Lt.string(")")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("and")) || Lt.valueEquals(pn, Lt.string("or"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  __fns("pushSql")(List(Lt.string("(")))
                  __fns("pushW")(List(Lt.string("(")))
                  var boolFirst: Any = Lt.boolean(true)
                  try {
                    for (bv <- Lt.arrayItems(__fns("itemsOf")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument")))))) {
                      try {
                        if (Lt.valueEquals(boolFirst, Lt.boolean(false))) {
                          tmp = Lt.toUpper(pn)
                          __fns("pushSql")(List(tmp))
                          __fns("pushW")(List(tmp))
                        }
                        boolFirst = Lt.boolean(false)
                        if (Lt.truthy(Lt.has(bv, Lt.string("chain")))) {
                          __fns("renderNodes")(List(Lt.get(Lt.get(bv, "chain"), "values"), Lt.number(1)))
                        }
                        else {
                          __fns("emitParam")(List(bv))
                        }
                      } catch { case _: LoopContinue => () }
                    }
                  } catch { case _: LoopBreak => () }
                  __fns("pushSql")(List(Lt.string(")")))
                  __fns("pushW")(List(Lt.string(")")))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("as"))) {
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns("pushSql")(List(base))
                  __fns("pushW")(List(base))
                  __fns("pushSql")(List(Lt.string("AS")))
                  __fns("pushW")(List(Lt.string("AS")))
                  __fns("emitIdent")(List(__fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("op"))) {
                  if (Lt.valueEquals(first, Lt.boolean(false))) {
                    __fns("pushSql")(List(Lt.string("AND")))
                    __fns("pushW")(List(Lt.string("AND")))
                  }
                  first = Lt.boolean(false)
                  if (Lt.truthy(hasLeft)) {
                    base = left
                  }
                  else {
                    base = Lt.string("?")
                  }
                  __fns("pushSql")(List(base))
                  __fns("pushW")(List(base))
                  __fns("pushSql")(List(__fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  __fns("pushW")(List(__fns("asString")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(0)), Lt.string("argument"))))))
                  if (Lt.truthy(Lt.has(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), Lt.string("chain")))) {
                    tmpRef = __fns("isRef")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values")))
                    if (!Lt.valueEquals(tmpRef, Lt.string(""))) {
                      __fns("emitIdent")(List(tmpRef))
                    }
                    else if ((Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("select")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("with"))) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("values")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("insert")) || (Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("update")) || Lt.valueEquals(__fns("firstKind")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"))), Lt.string("delete")))))) {
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
                      __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument")), "chain"), "values"), Lt.number(0)))
                      subSql = Lt.trim(Lt.bufStr(sql))
                      subW = Lt.trim(Lt.bufStr(wsql))
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      __fns("pushSql")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subSql, Lt.string(")")))))
                      __fns("pushW")(List(Lt.strConcat(Lt.string("("), Lt.strConcat(subW, Lt.string(")")))))
                      if (!Lt.valueEquals(subAliasText, Lt.string(""))) {
                        __fns("pushSql")(List(subAliasText))
                        __fns("pushW")(List(subAliasText))
                      }
                    }
                    else {
                      __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                    }
                  }
                  else {
                    __fns("emitParam")(List(Lt.get(Lt.index(Lt.get(Lt.get(node, "functionCall"), "arguments"), Lt.number(1)), Lt.string("argument"))))
                  }
                  hasLeft = Lt.boolean(false)
                }
                else if (Lt.valueEquals(pn, Lt.string("raw"))) {
                  __fns("emitRaw")(List(node))
                }
                else {
                  throw new RuntimeException(Lt.asString(Lt.string("sql-builder parse: unsupported predicate")))
                }
              }
            } catch { case _: LoopContinue => () }
          }
        } catch { case _: LoopBreak => () }
        return Lt.nullValue()
      }
      return Lt.nullValue()
    }
    __fns("renderNodes") = __fn_renderNodes
    __fns("renderNodes")(List(Lt.get(Lt.get(Lt.get(Lt.get(root, "schema"), "chain"), "chain"), "values"), Lt.number(0)))
    sql = Lt.bufStr(sql)
    wsql = Lt.bufStr(wsql)
    params = Lt.listValue(params)
    return Lt.map("sql" -> Lt.trim(sql), "sqlWithParam" -> Lt.trim(wsql), "param" -> Lt.params(params))
  }

}

object Init {
  def sqlBuilder(variableName: String, copies: Any*): SqlBuilder = {
    val structure = SqlBuilder()
    structure.initFromInitFunction(Lt.map(
      "name" -> "sql-builder",
      "variableName" -> (if (variableName != null) variableName else Lt.get(Lt.get(Lt.get(Lt.get(Lt.get(structure.getSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName")),
    ), Lt.array(copies*))
    structure
  }

  def sqlBuilder(): SqlBuilder = sqlBuilder(null)
}