# Auto-generated index for gntrees-sql-builder

require_relative "lt"

# parse() returns { "sql" => String, "sqlWithParam" => String, "param" => Array }

# Auto-generated Ruby method-chain types.
#
# Ruby is dynamic, so there is no static type block to emit (unlike
# `base-types.ts`). The runtime contract is documented here instead.
#
# A schema is a plain nested Ruby hash:
#
#     { "schema" => {
#         "exportName" => String,
#         "importPaths" => { language => String, ... },
#         "chain" => { "chain" => {
#             "values" => [...],
#             "initFunction" => { "name" => String, "variableName" => String },
#         } },
#     } }
#
# Each entry of `values` is one of:
#
#     { "functionCall" => { "name" => String, "arguments" => [Argument, ...],
#                           "isTemplateLiteral" => true | false } }
#     { "propertyCall" => { "name" => String } }
#     { "copy" => { "structureName" => String, "chain" => Chain } }
#
# An `Argument` is `{ "argument" => ArgumentValue, "default" => ArgumentValue | nil }`.
# An `ArgumentValue` is a tagged hash, one of:
#
#     { "string" => { "value" => String } }
#     { "number" => { "value" => Integer | Float } }
#     { "boolean" => { "value" => true | false } }
#     { "null" => { "value" => nil } }
#     { "array" => { "value" => [ArgumentValue, ...] } }
#     { "object" => { "value" => { key => ArgumentValue, ... } } }
#     { "chain" => Chain }
#
# Struct definitions used by the runtime mirror the TypeScript `StructType`
# (`array`/`object`/`string`/`number`/`boolean`/`null`/`union`/`map`/`literal`/
# `structureCall`), expressed as plain hashes.


# Auto-generated utils
def normalize_argument_structure_call(arg)
  if arg.is_a?(SqlBuilder)
    return arg.get_schema["schema"]["chain"]
  end
  if arg.nil?
    got = "null"
  elsif arg.is_a?(Array)
    got = "array"
  elsif arg.is_a?(Hash)
    raise "Unknown structure call argument type"
  else
    got = _typeof(arg)
  end
  raise "Expected a structure instance for structure calls, but got " + got
end

def copy(source)
  if source.is_a?(SqlBuilder)
    return make_copy("sql-builder", source)
  end
  raise "copy() expects a structure instance created by an init function"
end

# Auto-generated Ruby method-chain runtime.
#
# This is the dynamic counterpart of `core/base/typescript/base-utils.ts`.
# Schemas are plain nested Ruby hashes; the generator inlines this module at the
# top of the generated `index.rb` (right after the `require_relative "lt"`), so
# this file must not require anything itself.
#
# `normalize_argument_structure_call` and `copy` are *not* defined here: like the
# TypeScript runtime they are emitted by the generator because they reference the
# project's structure classes. (Unlike PHP, `copy` is not a Ruby built-in, so the
# generated helper keeps the plain name.)
#
# Ruby note: hashes are reference types (as in TypeScript/Python), so
# `apply_copies` mutates the caller's builder in place — no by-reference handling
# is needed the way PHP requires it for its value-type arrays.

# Sentinel for "argument not supplied". Generated methods default every
# parameter to this constant so optional arguments work; the runtime treats it
# like the TypeScript runtime treats `undefined`.
MISSING = Object.new.freeze

def _typeof(value)
  # Best-effort analogue of JavaScript's `typeof` for error messages.
  return "object" if value.nil?
  return "boolean" if value == true || value == false
  return "number" if value.is_a?(Numeric)
  return "string" if value.is_a?(String)
  return "object" if value.is_a?(Hash) || value.is_a?(Array)
  value.class.name
end

def validate_schema(schema)
  message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
  raise message unless schema.is_a?(Hash)
  inner = schema["schema"]
  raise message unless inner.is_a?(Hash)
  chain = inner["chain"]
  raise message unless chain.is_a?(Hash)
  chain_chain = chain["chain"]
  raise message unless chain_chain.is_a?(Hash)
  raise message unless chain_chain["values"].is_a?(Array)
  raise message if chain_chain["initFunction"].nil?
end

def _unwrap_argument_value(val)
  raise "Unknown argument value type" unless val.is_a?(Hash)
  return val["string"]["value"] if val.key?("string")
  return val["number"]["value"] if val.key?("number")
  return val["boolean"]["value"] if val.key?("boolean")
  return val["null"]["value"] if val.key?("null")
  return val["array"]["value"].map { |item| _unwrap_argument_value(item) } if val.key?("array")
  if val.key?("object")
    object = {}
    val["object"]["value"].each { |key, item| object[key] = _unwrap_argument_value(item) }
    return object
  end
  raise "Cannot validate a chain default value at runtime" if val.key?("chain")
  raise "Unknown argument value type"
end

def validate_default(default_val, struct)
  normalize_argument(_unwrap_argument_value(default_val), struct)
end

def normalize_argument(arg, struct)
  raise "Unsupported struct type in normalizeArgument" unless struct.is_a?(Hash)

  if struct.key?("array")
    raise "Expected an array argument, but got #{_typeof(arg)}" unless arg.is_a?(Array)
    return { "array" => { "value" => [] } } if arg.empty?
    item_type = struct["array"]["type"]
    normalized_items = arg.map { |item| normalize_argument(item, item_type) }
    raise "Unexpected undefined value in array" if normalized_items[0].nil?
    return { "array" => { "value" => normalized_items } }
  end

  if struct.key?("object")
    raise "Expected an object argument, but got #{_typeof(arg)}" unless arg.is_a?(Hash)
    declared = struct["object"]
    missing_keys = declared.keys.reject { |key| arg.key?(key) }
    raise "Missing required key(s) \"#{missing_keys.join('", "')}\" in object argument" if missing_keys.any?
    normalized_object = {}
    arg.each do |key, value|
      raise "Unexpected key \"#{key}\" in object argument" unless declared.key?(key)
      normalized_object[key] = normalize_argument(value, declared[key])
    end
    return { "object" => { "value" => normalized_object } }
  end

  if struct.key?("string")
    raise "Expected a string argument, but got #{_typeof(arg)}" unless arg.is_a?(String)
    return { "string" => { "value" => arg } }
  end

  if struct.key?("number")
    raise "Expected a number argument, but got #{_typeof(arg)}" if arg == true || arg == false || !arg.is_a?(Numeric)
    raise "Expected a finite number argument, but got #{arg}" unless arg.finite?
    return { "number" => { "value" => arg } }
  end

  if struct.key?("boolean")
    raise "Expected a boolean argument, but got #{_typeof(arg)}" unless arg == true || arg == false
    return { "boolean" => { "value" => arg } }
  end

  if struct.key?("null")
    raise "Expected a null argument, but got #{_typeof(arg)}" unless arg.nil?
    return { "null" => { "value" => arg } }
  end

  if struct.key?("union")
    reasons = []
    normalized_union_types = []
    struct["union"]["types"].each do |union_type|
      begin
        normalized_union_types << normalize_argument(arg, union_type)
      rescue StandardError => error
        reasons << error.message
      end
    end
    if normalized_union_types.empty? || !normalized_union_types[0]
      raise "Argument does not match any type in the union: #{reasons.join(' | ')}"
    end
    if normalized_union_types.length > 1
      return normalized_union_types[0] if arg.is_a?(Array) && arg.empty?
      raise "Argument matches multiple types in the union, which is ambiguous"
    end
    return normalized_union_types[0]
  end

  if struct.key?("map")
    raise "Expected an object argument for map type, but got #{_typeof(arg)}" unless arg.is_a?(Hash)
    normalized_map = {}
    arg.each { |key, value| normalized_map[key] = normalize_argument(value, struct["map"]["type"]) }
    return { "object" => { "value" => normalized_map } }
  end

  if struct.key?("structureCall")
    return normalize_argument_structure_call(arg)
  end

  if struct.key?("literal")
    expected = struct["literal"]["value"]
    literal_type = struct["literal"]["type"]
    if literal_type == "string"
      raise "Expected a string literal argument, but got #{_typeof(arg)}" unless arg.is_a?(String)
      raise "Expected string literal #{expected.inspect}, but got #{arg.inspect}" if arg != expected
      return { "string" => { "value" => arg } }
    end
    if literal_type == "number"
      raise "Expected a number literal argument, but got #{_typeof(arg)}" if arg == true || arg == false || !arg.is_a?(Numeric)
      raise "Expected a finite number argument, but got #{arg}" unless arg.finite?
      raise "Expected number literal #{expected}, but got #{arg}" if arg != expected
      return { "number" => { "value" => arg } }
    end
    raise "Expected a boolean literal argument, but got #{_typeof(arg)}" unless arg == true || arg == false
    raise "Expected boolean literal #{expected}, but got #{arg}" if arg != expected
    return { "boolean" => { "value" => arg } }
  end

  raise "Unsupported struct type in normalizeArgument"
end

def create_schema(old_schema, function_name, function_args, is_template_literal)
  validate_schema(old_schema)
  old = old_schema["schema"]
  old_chain = old["chain"]["chain"]
  new_inner = old.dup
  new_inner["chain"] = {
    "chain" => {
      "values" => old_chain["values"].dup,
      "initFunction" => old_chain["initFunction"],
    },
  }
  new_schema = { "schema" => new_inner }

  if is_template_literal && function_args[0]
    strings = function_args[0]["arg"]
    unless strings.is_a?(Array) && strings.all? { |text| text.is_a?(String) }
      raise "Expected a template strings array for #{function_name}"
    end
    expressions = function_args[1..] || []
    if expressions.length != strings.length - 1
      raise "Template literal for #{function_name} expects #{strings.length - 1} expression(s), but got #{expressions.length}"
    end
    args = []
    strings.each_with_index do |text, index|
      args << { "argument" => { "string" => { "value" => text } }, "default" => nil } unless text.empty?
      if index < expressions.length
        expression = expressions[index]
        raise "Missing expression for template literal at index #{index}" if expression.nil?
        args << {
          "argument" => normalize_argument(expression["arg"], expression["struct"]),
          "default" => nil,
        }
      end
    end
  else
    args = []
    function_args.each_with_index do |function_arg, index|
      arg = function_arg["arg"]
      if arg.equal?(MISSING)
        if function_arg["provided"]
          raise "Parameter \"#{function_name}\" argument ##{index + 1} cannot be undefined"
        end
        default = function_arg["default"]
        unless default.nil?
          validate_default(default, function_arg["struct"])
          args << { "argument" => default, "default" => default }
          next
        end
        raise "Parameter \"#{function_name}\" argument ##{index + 1} was not provided"
      end
      argument = normalize_argument(arg, function_arg["struct"])
      default = function_arg["default"]
      validate_default(default, function_arg["struct"]) unless default.nil?
      args << { "argument" => argument, "default" => default }
    end
  end

  new_schema["schema"]["chain"]["chain"]["values"] << {
    "functionCall" => {
      "name" => function_name,
      "arguments" => args,
      "isTemplateLiteral" => is_template_literal ? true : false,
    },
  }
  new_schema
end

def create_property_call_schema(old_schema, property_name)
  old = old_schema["schema"]
  old_chain = old["chain"]["chain"]
  new_inner = old.dup
  new_inner["chain"] = {
    "chain" => {
      "values" => old_chain["values"].dup + [{ "propertyCall" => { "name" => property_name } }],
      "initFunction" => old_chain["initFunction"],
    },
  }
  { "schema" => new_inner }
end

def make_copy(structure_name, source)
  schema = source.get_schema
  validate_schema(schema)
  {
    "copy" => {
      "structureName" => structure_name,
      "chain" => schema["schema"]["chain"],
    },
  }
end

def apply_copies(schema, copies, target_structure_name)
  return if copies.nil? || copies.empty?
  copies.each do |cp|
    valid = cp.is_a?(Hash) &&
      cp["copy"].is_a?(Hash) &&
      cp["copy"]["structureName"].is_a?(String) &&
      cp["copy"]["chain"].is_a?(Hash)
    raise "Invalid builder argument in init function: wrap the structure with copy(...)" unless valid
    if cp["copy"]["structureName"] != target_structure_name
      raise "Cannot copy builder of structure '#{cp["copy"]["structureName"]}' into '#{target_structure_name}'"
    end
    schema["schema"]["chain"]["chain"]["values"] << {
      "copy" => {
        "structureName" => cp["copy"]["structureName"],
        "chain" => cp["copy"]["chain"],
      },
    }
  end
end


class SqlBuilder
  def initialize
    @schema = {
      "schema" => {
        "exportName" => "schema",
        "importPaths" => {"typescript" => "../../../gntrees-sql-builder/typescript/index"},
        "chain" => {
          "chain" => {
            "values" => [],
            "initFunction" => {
              "name" => "sql-builder",
              "variableName" => "s1",
            },
          },
        },
      },
    }
  end

  def get_schema(export_name = nil, import_paths = nil)
    if !export_name.nil? && !export_name.is_a?(String)
      raise "get_schema exportName must be a string, but got " + _typeof(export_name)
    end
    if !import_paths.nil? && !import_paths.is_a?(Hash)
      raise "get_schema importPaths must be an object, but got " + _typeof(import_paths)
    end
    if !export_name.nil? && export_name != ""
      @schema["schema"]["exportName"] = export_name
    end
    if import_paths
      @schema["schema"]["importPaths"] = (@schema["schema"]["importPaths"] || {}).merge(import_paths)
    end
    @schema
  end

  def init_from_structure(schema)
    validate_schema(schema)
    @schema = schema
    self
  end

  def init_from_init_function(init_function, copies = [])
    if !init_function.is_a?(Hash) || !init_function["name"].is_a?(String) || !init_function["variableName"].is_a?(String)
      raise "Invalid init function"
    end
    @schema["schema"]["chain"]["chain"]["initFunction"] = init_function
    apply_copies(@schema, copies, "sql-builder")
    self
  end

  def select(columns = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "select", [
      { "arg" => columns, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}, {"map" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => columns != MISSING },
    ], false))
  end

  def from(table = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "from", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
    ], false))
  end

  def transaction(transaction = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "transaction", [
      { "arg" => transaction, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => transaction != MISSING },
    ], false))
  end

  def orderBy(columns = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "orderBy", [
      { "arg" => columns, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => columns != MISSING },
    ], false))
  end

  def limit(count = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "limit", [
      { "arg" => count, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => count != MISSING },
    ], false))
  end

  def offset(count = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "offset", [
      { "arg" => count, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => count != MISSING },
    ], false))
  end

  def with(statement = MISSING, as = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "with", [
      { "arg" => statement, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => statement != MISSING },
      { "arg" => as, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => as != MISSING },
    ], false))
  end

  def groupBy(columns = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "groupBy", [
      { "arg" => columns, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => columns != MISSING },
    ], false))
  end

  def having(statement = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "having", [
      { "arg" => statement, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => statement != MISSING },
    ], false))
  end

  def where(statement = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "where", [
      { "arg" => statement, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => statement != MISSING },
    ], false))
  end

  def update(table = MISSING, set = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "update", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => set, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"map" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => set != MISSING },
    ], false))
  end

  def set(statement = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "set", [
      { "arg" => statement, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"map" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => statement != MISSING },
    ], false))
  end

  def insert(table = MISSING, set = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "insert", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => set, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"map" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => set != MISSING },
    ], false))
  end

  def values(values = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "values", [
      { "arg" => values, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}, {"array" => {"type" => {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}}}]}}, "provided" => values != MISSING },
    ], false))
  end

  def returning(columns = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "returning", [
      { "arg" => columns, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}, {"map" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => columns != MISSING },
    ], false))
  end

  def onConflictDoNothing(target = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "onConflictDoNothing", [
      { "arg" => target, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => target != MISSING },
    ], false))
  end

  def onConflictDoUpdate(target = MISSING, set = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "onConflictDoUpdate", [
      { "arg" => target, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => target != MISSING },
      { "arg" => set, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"map" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => set != MISSING },
    ], false))
  end

  def delete(table = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "delete", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
    ], false))
  end

  def join(table = MISSING, on = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "join", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => on, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => on != MISSING },
    ], false))
  end

  def leftJoin(table = MISSING, on = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "leftJoin", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => on, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => on != MISSING },
    ], false))
  end

  def rightJoin(table = MISSING, on = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "rightJoin", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => on, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => on != MISSING },
    ], false))
  end

  def innerJoin(table = MISSING, on = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "innerJoin", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => on, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => on != MISSING },
    ], false))
  end

  def fullJoin(table = MISSING, on = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "fullJoin", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => on, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => on != MISSING },
    ], false))
  end

  def crossJoin(table = MISSING, on = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "crossJoin", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
      { "arg" => on, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => on != MISSING },
    ], false))
  end

  def eq(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "eq", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def gt(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "gt", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def gte(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "gte", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def lt(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "lt", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def lte(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "lte", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def exists(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "exists", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def isNull()
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "isNull", [
    ], false))
  end

  def isNotNull()
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "isNotNull", [
    ], false))
  end

  def in(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "in", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def between(first = MISSING, second = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "between", [
      { "arg" => first, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => first != MISSING },
      { "arg" => second, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => second != MISSING },
    ], false))
  end

  def like(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "like", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def ilike(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "ilike", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def not(value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "not", [
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def and(values = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "and", [
      { "arg" => values, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => values != MISSING },
    ], false))
  end

  def or(values = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "or", [
      { "arg" => values, "struct" => {"union" => {"types" => [{"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, {"array" => {"type" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}}}]}}, "provided" => values != MISSING },
    ], false))
  end

  def op(operation = MISSING, value = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "op", [
      { "arg" => operation, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => operation != MISSING },
      { "arg" => value, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => value != MISSING },
    ], false))
  end

  def raw(strings, *args)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "raw", [
      { "arg" => strings, "struct" => { "string" => { "type" => "string" } } },
    ] + args.map { |__arg| { "arg" => __arg, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}} } }, true))
  end

  def asc()
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "asc", [
    ], false))
  end

  def desc()
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "desc", [
    ], false))
  end

  def as(alias_ = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "as", [
      { "arg" => alias_, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => alias_ != MISSING },
    ], false))
  end

  def col(column = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "col", [
      { "arg" => column, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => column != MISSING },
    ], false))
  end

  def table(table = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "table", [
      { "arg" => table, "struct" => {"union" => {"types" => [{"string" => {"type" => "string"}}, {"number" => {"type" => "number"}}, {"boolean" => {"type" => "boolean"}}, {"structureCall" => {"name" => "sql-builder"}}]}}, "provided" => table != MISSING },
    ], false))
  end

  def setDialect(db = MISSING)
    SqlBuilder.new.init_from_structure(create_schema(get_schema, "setDialect", [
      { "arg" => db, "struct" => {"union" => {"types" => [{"literal" => {"value" => "postgres", "type" => "string"}}, {"literal" => {"value" => "mysql", "type" => "string"}}, {"literal" => {"value" => "sqlite", "type" => "string"}}, {"literal" => {"value" => "single-store", "type" => "string"}}, {"literal" => {"value" => "mssql", "type" => "string"}}, {"literal" => {"value" => "cockroach", "type" => "string"}}]}}, "provided" => db != MISSING },
    ], false))
  end

  def parse()
    root = get_schema
    dialect = ""
    quote = ""
    sql = []
    wsql = []
    params = []
    orderSql = ""
    orderW = ""
    hasOrder = false
    tmp = ""
    tmp2 = ""
    tmpRef = ""
    subAlias = ""
    withFirst = true
    normName = ->(n) {
      return n.gsub("-", "").downcase
    }
    define_singleton_method(:normName, normName)
    pushSql = ->(text) {
      sql = (sql + [" "])
      sql = (sql + [text])
      return nil
    }
    define_singleton_method(:pushSql, pushSql)
    pushW = ->(text) {
      wsql = (wsql + [" "])
      wsql = (wsql + [text])
      return nil
    }
    define_singleton_method(:pushW, pushW)
    asString = ->(arg) {
      return lt_get(lt_get(arg, "string"), "value")
    }
    define_singleton_method(:asString, asString)
    identStr = ->(name) {
      escapedName = name.gsub(quote, (quote + quote))
      qualifiedName = escapedName.gsub(".", (quote + ("." + quote)))
      return (quote + (qualifiedName + quote))
    }
    define_singleton_method(:identStr, identStr)
    literalOf = ->(arg) {
      outLiteral = ""
      if lt_truthy(lt_has(arg, "string"))
        outLiteral = ("'" + (asString(arg).gsub("'", "''") + "'"))
      elsif lt_truthy(lt_has(arg, "number"))
        outLiteral = lt_to_string(lt_get(lt_get(arg, "number"), "value"))
      elsif lt_truthy(lt_has(arg, "boolean"))
        if lt_truthy(lt_get(lt_get(arg, "boolean"), "value"))
          outLiteral = "TRUE"
        else
          outLiteral = "FALSE"
        end
      else
        outLiteral = "NULL"
      end
      return outLiteral
    }
    define_singleton_method(:literalOf, literalOf)
    opOf = ->(n) {
      o = ""
      if n == "eq"
        o = "="
      elsif n == "gt"
        o = ">"
      elsif n == "gte"
        o = ">="
      elsif n == "lt"
        o = "<"
      elsif n == "lte"
        o = "<="
      elsif n == "like"
        o = "LIKE"
      elsif n == "ilike"
        if dialect == "postgres"
          o = "ILIKE"
        else
          o = "LIKE"
        end
      end
      return o
    }
    define_singleton_method(:opOf, opOf)
    itemsOf = ->(arg) {
      if lt_truthy(lt_has(arg, "array"))
        return lt_get(lt_get(arg, "array"), "value")
      end
      return ([] + [arg])
    }
    define_singleton_method(:itemsOf, itemsOf)
    isRef = ->(chainValues) {
      tmpRef = ""
      if ((chainValues).length == 1) && lt_truthy(lt_has(lt_get(chainValues, 0), "functionCall"))
        firstName = lt_get(lt_get(lt_get(chainValues, 0), "functionCall"), "name")
        if (firstName == "col") || (firstName == "table")
          tmpRef = asString(lt_get(lt_get(lt_get(lt_get(lt_get(chainValues, 0), "functionCall"), "arguments"), 0), "argument"))
        end
      end
      return tmpRef
    }
    define_singleton_method(:isRef, isRef)
    emitParam = ->(arg) {
      params = (params + [arg])
      if dialect == "postgres"
        tmp = ("$" + lt_to_string((params).length))
      else
        tmp = "?"
      end
      pushSql(tmp)
      tmp2 = literalOf(arg)
      pushW(tmp2)
      return nil
    }
    define_singleton_method(:emitParam, emitParam)
    emitIdent = ->(name) {
      tmp = identStr(name)
      pushSql(tmp)
      pushW(tmp)
      return nil
    }
    define_singleton_method(:emitIdent, emitIdent)
    emitRaw = ->(node) {
      if (sql).length != 0
        sql = (sql + [" "])
        wsql = (wsql + [" "])
      end
      lt_get(lt_get(node, "functionCall"), "arguments").each do |rawArg|
        rawVal = lt_get(rawArg, "argument")
        if lt_truthy(lt_has(rawVal, "string"))
          sql = (sql + [asString(rawVal)])
          wsql = (wsql + [asString(rawVal)])
        elsif lt_truthy(lt_has(rawVal, "chain"))
          tmpRef = isRef(lt_get(lt_get(rawVal, "chain"), "values"))
          if tmpRef != ""
            sql = (sql + [identStr(tmpRef)])
            wsql = (wsql + [identStr(tmpRef)])
          else
            params = (params + [rawVal])
            if dialect == "postgres"
              tmp = ("$" + lt_to_string((params).length))
            else
              tmp = "?"
            end
            sql = (sql + [tmp])
            tmp2 = literalOf(rawVal)
            wsql = (wsql + [tmp2])
          end
        else
          params = (params + [rawVal])
          if dialect == "postgres"
            tmp = ("$" + lt_to_string((params).length))
          else
            tmp = "?"
          end
          sql = (sql + [tmp])
          tmp2 = literalOf(rawVal)
          wsql = (wsql + [tmp2])
        end
      end
      return nil
    }
    define_singleton_method(:emitRaw, emitRaw)
    conflictTarget = ->(arg) {
      ct = "()"
      if lt_truthy(lt_has(arg, "chain"))
        tmpRef = isRef(lt_get(lt_get(arg, "chain"), "values"))
        if tmpRef != ""
          ct = ("(" + (identStr(tmpRef) + ")"))
        end
      elsif lt_truthy(lt_has(arg, "string"))
        ct = ("(" + (identStr(asString(arg)) + ")"))
      end
      return ct
    }
    define_singleton_method(:conflictTarget, conflictTarget)
    firstKind = ->(chainValues) {
      kind = ""
      if ((chainValues).length != 0) && lt_truthy(lt_has(lt_get(chainValues, 0), "functionCall"))
        kind = normName(lt_get(lt_get(lt_get(chainValues, 0), "functionCall"), "name"))
      end
      return kind
    }
    define_singleton_method(:firstKind, firstKind)
    emitOrderItem = ->(item) {
      dir = ""
      ordName = ""
      if lt_truthy(lt_has(item, "chain"))
        lt_get(lt_get(item, "chain"), "values").each do |on|
          onn = normName(lt_get(lt_get(on, "functionCall"), "name"))
          if onn == "asc"
            dir = " ASC"
          elsif onn == "desc"
            dir = " DESC"
          elsif (onn == "col") || (onn == "table")
            ordName = asString(lt_get(lt_get(lt_get(lt_get(on, "functionCall"), "arguments"), 0), "argument"))
          end
        end
      end
      if ordName != ""
        tmp = identStr(ordName)
        orderSql = (orderSql + (tmp + dir))
        orderW = (orderW + (tmp + dir))
      end
      return nil
    }
    define_singleton_method(:emitOrderItem, emitOrderItem)
    emitOrderList = ->(arg) {
      firstOrder = true
      itemsOf(arg).each do |item|
        if firstOrder == false
          orderSql = (orderSql + ", ")
          orderW = (orderW + ", ")
        end
        firstOrder = false
        emitOrderItem(item)
      end
      return nil
    }
    define_singleton_method(:emitOrderList, emitOrderList)
    flushOrder = ->() {
      if lt_truthy(hasOrder)
        pushSql("ORDER")
        pushSql("BY")
        pushW("ORDER")
        pushW("BY")
        tmp = orderSql
        if tmp != ""
          pushSql(tmp)
        end
        tmp2 = orderW
        if tmp2 != ""
          pushW(tmp2)
        end
        hasOrder = false
      end
      return nil
    }
    define_singleton_method(:flushOrder, flushOrder)
    lt_get(lt_get(lt_get(lt_get(root, "schema"), "chain"), "chain"), "values").each do |dialectNode|
      if normName(lt_get(lt_get(dialectNode, "functionCall"), "name")) == "setdialect"
        dialect = lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(dialectNode, "functionCall"), "arguments"), 0), "argument"), "string"), "value")
      end
    end
    if dialect == ""
      raise lt_to_string("sql-builder parse: setDialect(...) must be called before parse()")
    elsif (dialect != "postgres") && (dialect != "mysql")
      raise lt_to_string(("sql-builder parse: unsupported dialect " + dialect))
    end
    if dialect == "mysql"
      quote = "`"
    else
      quote = "\""
    end
    renderNodes = ->(nodes, mode) {
      savedSql = ""
      savedW = ""
      savedOrderSql = ""
      savedOrderW = ""
      savedHasOrder = false
      savedAlias = ""
      subSql = ""
      subW = ""
      subAliasText = ""
      first = true
      left = ""
      hasLeft = false
      base = ""
      if mode == 0
        nodes.each do |node|
          if lt_truthy(lt_has(node, "functionCall"))
            name = lt_get(lt_get(node, "functionCall"), "name")
            nameNorm = normName(name)
            if nameNorm == "setdialect"
              next
            elsif (nameNorm == "asc") || (nameNorm == "desc")
              if lt_truthy(hasOrder)
                tmp = nameNorm.upcase
                orderSql = (orderSql + (" " + tmp))
                orderW = (orderW + (" " + tmp))
              end
            else
              if nameNorm == "with"
                savedSql = sql
                savedW = wsql
                savedOrderSql = orderSql
                savedOrderW = orderW
                savedHasOrder = hasOrder
                sql = []
                wsql = []
                orderSql = ""
                orderW = ""
                hasOrder = false
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                subSql = lt_buf_str(sql).strip
                subW = lt_buf_str(wsql).strip
                sql = savedSql
                wsql = savedW
                orderSql = savedOrderSql
                orderW = savedOrderW
                hasOrder = savedHasOrder
                if withFirst == false
                  sql = (sql + [","])
                  wsql = (wsql + [","])
                else
                  withFirst = false
                  pushSql("WITH")
                  pushW("WITH")
                end
                pushSql(identStr(asString(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"))))
                pushW(identStr(asString(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"))))
                pushSql("AS")
                pushW("AS")
                pushSql(("(" + (subSql + ")")))
                pushW(("(" + (subW + ")")))
              elsif nameNorm == "transaction"
                pushSql("BEGIN")
                pushW("BEGIN")
                sql = (sql + [";"])
                wsql = (wsql + [";"])
                txnFirst = true
                itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")).each do |txnItem|
                  if txnFirst == false
                    sql = (sql + [";"])
                    wsql = (wsql + [";"])
                  end
                  txnFirst = false
                  if lt_truthy(lt_has(txnItem, "chain"))
                    renderNodes(lt_get(lt_get(txnItem, "chain"), "values"), 0)
                  elsif lt_truthy(lt_has(txnItem, "string"))
                    pushSql(asString(txnItem))
                    pushW(asString(txnItem))
                  else
                    if lt_truthy(lt_has(txnItem, "chain"))
                      tmpRef = isRef(lt_get(lt_get(txnItem, "chain"), "values"))
                      if tmpRef != ""
                        emitIdent(tmpRef)
                      elsif ((firstKind(lt_get(lt_get(txnItem, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(txnItem, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(txnItem, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(txnItem, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(txnItem, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(txnItem, "chain"), "values")) == "delete"))))
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = []
                        wsql = []
                        orderSql = ""
                        orderW = ""
                        hasOrder = false
                        subAlias = ""
                        renderNodes(lt_get(lt_get(txnItem, "chain"), "values"), 0)
                        subSql = lt_buf_str(sql).strip
                        subW = lt_buf_str(wsql).strip
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        pushSql(("(" + (subSql + ")")))
                        pushW(("(" + (subW + ")")))
                        if subAliasText != ""
                          pushSql(subAliasText)
                          pushW(subAliasText)
                        end
                      else
                        emitParam(txnItem)
                      end
                    else
                      emitParam(txnItem)
                    end
                  end
                end
                if txnFirst == false
                  sql = (sql + [";"])
                  wsql = (wsql + [";"])
                end
                pushSql("COMMIT")
                pushW("COMMIT")
              elsif nameNorm == "select"
                flushOrder()
                pushSql("SELECT")
                pushW("SELECT")
                firstItem = true
                itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")).each do |item|
                  if firstItem == false
                    sql = (sql + [","])
                    wsql = (wsql + [","])
                  end
                  firstItem = false
                  if lt_truthy(lt_has(item, "chain"))
                    tmpRef = isRef(lt_get(lt_get(item, "chain"), "values"))
                    if tmpRef != ""
                      emitIdent(tmpRef)
                    elsif ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(item, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(item, "chain"), "values")) == "delete"))))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = []
                      wsql = []
                      orderSql = ""
                      orderW = ""
                      hasOrder = false
                      subAlias = ""
                      renderNodes(lt_get(lt_get(item, "chain"), "values"), 0)
                      subSql = lt_buf_str(sql).strip
                      subW = lt_buf_str(wsql).strip
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      pushSql(("(" + (subSql + ")")))
                      pushW(("(" + (subW + ")")))
                      if subAliasText != ""
                        pushSql(subAliasText)
                        pushW(subAliasText)
                      end
                    else
                      renderNodes(lt_get(lt_get(item, "chain"), "values"), 1)
                    end
                  else
                    emitParam(item)
                  end
                end
              elsif nameNorm == "from"
                flushOrder()
                pushSql("FROM")
                pushW("FROM")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
              elsif nameNorm == "join"
                flushOrder()
                pushSql("JOIN")
                pushW("JOIN")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
                pushSql("ON")
                pushW("ON")
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
              elsif nameNorm == "leftjoin"
                flushOrder()
                pushSql("LEFT JOIN")
                pushW("LEFT JOIN")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
                pushSql("ON")
                pushW("ON")
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
              elsif nameNorm == "rightjoin"
                flushOrder()
                pushSql("RIGHT JOIN")
                pushW("RIGHT JOIN")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
                pushSql("ON")
                pushW("ON")
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
              elsif nameNorm == "innerjoin"
                flushOrder()
                pushSql("INNER JOIN")
                pushW("INNER JOIN")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
                pushSql("ON")
                pushW("ON")
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
              elsif nameNorm == "fulljoin"
                if dialect == "mysql"
                  raise lt_to_string("sql-builder parse: FULL JOIN is not supported by mysql")
                else
                  flushOrder()
                  pushSql("FULL JOIN")
                  pushW("FULL JOIN")
                  if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                    tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                    if tmpRef != ""
                      emitIdent(tmpRef)
                    elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = []
                      wsql = []
                      orderSql = ""
                      orderW = ""
                      hasOrder = false
                      subAlias = ""
                      renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                      subSql = lt_buf_str(sql).strip
                      subW = lt_buf_str(wsql).strip
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      pushSql(("(" + (subSql + ")")))
                      pushW(("(" + (subW + ")")))
                      if subAliasText != ""
                        pushSql(subAliasText)
                        pushW(subAliasText)
                      end
                    else
                      renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                  end
                  pushSql("ON")
                  pushW("ON")
                  renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
                end
              elsif nameNorm == "crossjoin"
                flushOrder()
                pushSql("CROSS JOIN")
                pushW("CROSS JOIN")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
                pushSql("ON")
                pushW("ON")
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
              elsif nameNorm == "where"
                flushOrder()
                pushSql("WHERE")
                pushW("WHERE")
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
              elsif nameNorm == "groupby"
                flushOrder()
                pushSql("GROUP BY")
                pushW("GROUP BY")
                firstItem = true
                itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")).each do |item|
                  if firstItem == false
                    sql = (sql + [","])
                    wsql = (wsql + [","])
                  end
                  firstItem = false
                  if lt_truthy(lt_has(item, "chain"))
                    tmpRef = isRef(lt_get(lt_get(item, "chain"), "values"))
                    if tmpRef != ""
                      emitIdent(tmpRef)
                    elsif ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(item, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(item, "chain"), "values")) == "delete"))))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = []
                      wsql = []
                      orderSql = ""
                      orderW = ""
                      hasOrder = false
                      subAlias = ""
                      renderNodes(lt_get(lt_get(item, "chain"), "values"), 0)
                      subSql = lt_buf_str(sql).strip
                      subW = lt_buf_str(wsql).strip
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      pushSql(("(" + (subSql + ")")))
                      pushW(("(" + (subW + ")")))
                      if subAliasText != ""
                        pushSql(subAliasText)
                        pushW(subAliasText)
                      end
                    else
                      renderNodes(lt_get(lt_get(item, "chain"), "values"), 1)
                    end
                  else
                    emitParam(item)
                  end
                end
              elsif nameNorm == "having"
                flushOrder()
                pushSql("HAVING")
                pushW("HAVING")
                renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
              elsif nameNorm == "returning"
                if dialect == "mysql"
                  raise lt_to_string("sql-builder parse: RETURNING is not supported by mysql")
                else
                  flushOrder()
                  pushSql("RETURNING")
                  pushW("RETURNING")
                  firstItem = true
                  itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")).each do |item|
                    if firstItem == false
                      sql = (sql + [","])
                      wsql = (wsql + [","])
                    end
                    firstItem = false
                    if lt_truthy(lt_has(item, "chain"))
                      tmpRef = isRef(lt_get(lt_get(item, "chain"), "values"))
                      if tmpRef != ""
                        emitIdent(tmpRef)
                      elsif ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(item, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(item, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(item, "chain"), "values")) == "delete"))))
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = []
                        wsql = []
                        orderSql = ""
                        orderW = ""
                        hasOrder = false
                        subAlias = ""
                        renderNodes(lt_get(lt_get(item, "chain"), "values"), 0)
                        subSql = lt_buf_str(sql).strip
                        subW = lt_buf_str(wsql).strip
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        pushSql(("(" + (subSql + ")")))
                        pushW(("(" + (subW + ")")))
                        if subAliasText != ""
                          pushSql(subAliasText)
                          pushW(subAliasText)
                        end
                      else
                        renderNodes(lt_get(lt_get(item, "chain"), "values"), 1)
                      end
                    else
                      emitParam(item)
                    end
                  end
                end
              elsif nameNorm == "orderby"
                hasOrder = true
                orderSql = ""
                orderW = ""
                emitOrderList(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
              elsif nameNorm == "limit"
                flushOrder()
                pushSql("LIMIT")
                pushW("LIMIT")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
              elsif nameNorm == "offset"
                flushOrder()
                pushSql("OFFSET")
                pushW("OFFSET")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
              elsif nameNorm == "raw"
                emitRaw(node)
              elsif nameNorm == "as"
                subAlias = ("AS " + identStr(asString(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))))
              elsif nameNorm == "update"
                pushSql("UPDATE")
                pushW("UPDATE")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
                pushSql("SET")
                pushW("SET")
                assnFirst = true
                lt_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value")).each do |ak|
                  if assnFirst == false
                    sql = (sql + [","])
                    wsql = (wsql + [","])
                  end
                  assnFirst = false
                  pushSql(identStr(ak))
                  pushW(identStr(ak))
                  pushSql("=")
                  pushW("=")
                  if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"))
                    tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"))
                    if tmpRef != ""
                      emitIdent(tmpRef)
                    elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete"))))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = []
                      wsql = []
                      orderSql = ""
                      orderW = ""
                      hasOrder = false
                      subAlias = ""
                      renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                      subSql = lt_buf_str(sql).strip
                      subW = lt_buf_str(wsql).strip
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      pushSql(("(" + (subSql + ")")))
                      pushW(("(" + (subW + ")")))
                      if subAliasText != ""
                        pushSql(subAliasText)
                        pushW(subAliasText)
                      end
                    else
                      emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                  end
                end
              elsif nameNorm == "insert"
                pushSql("INSERT")
                pushW("INSERT")
                pushSql("INTO")
                pushW("INTO")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
                pushSql("(")
                pushW("(")
                colFirst = true
                lt_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value")).each do |ck|
                  if colFirst == false
                    sql = (sql + [","])
                    wsql = (wsql + [","])
                  end
                  colFirst = false
                  pushSql(identStr(ck))
                  pushW(identStr(ck))
                end
                pushSql(")")
                pushW(")")
                pushSql("VALUES")
                pushW("VALUES")
                pushSql("(")
                pushW("(")
                valFirst = true
                lt_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value")).each do |vk|
                  if valFirst == false
                    sql = (sql + [","])
                    wsql = (wsql + [","])
                  end
                  valFirst = false
                  if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"))
                    tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values"))
                    if tmpRef != ""
                      emitIdent(tmpRef)
                    elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "delete"))))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = []
                      wsql = []
                      orderSql = ""
                      orderW = ""
                      hasOrder = false
                      subAlias = ""
                      renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values"), 0)
                      subSql = lt_buf_str(sql).strip
                      subW = lt_buf_str(wsql).strip
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      pushSql(("(" + (subSql + ")")))
                      pushW(("(" + (subW + ")")))
                      if subAliasText != ""
                        pushSql(subAliasText)
                        pushW(subAliasText)
                      end
                    else
                      emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk))
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk))
                  end
                end
                pushSql(")")
                pushW(")")
              elsif nameNorm == "delete"
                pushSql("DELETE")
                pushW("DELETE")
                pushSql("FROM")
                pushW("FROM")
                if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                  tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                  if tmpRef != ""
                    emitIdent(tmpRef)
                  elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                    savedSql = sql
                    savedW = wsql
                    savedOrderSql = orderSql
                    savedOrderW = orderW
                    savedHasOrder = hasOrder
                    savedAlias = subAlias
                    sql = []
                    wsql = []
                    orderSql = ""
                    orderW = ""
                    hasOrder = false
                    subAlias = ""
                    renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                    subSql = lt_buf_str(sql).strip
                    subW = lt_buf_str(wsql).strip
                    subAliasText = subAlias
                    sql = savedSql
                    wsql = savedW
                    orderSql = savedOrderSql
                    orderW = savedOrderW
                    hasOrder = savedHasOrder
                    subAlias = savedAlias
                    pushSql(("(" + (subSql + ")")))
                    pushW(("(" + (subW + ")")))
                    if subAliasText != ""
                      pushSql(subAliasText)
                      pushW(subAliasText)
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
              elsif nameNorm == "set"
                pushSql("SET")
                pushW("SET")
                assnFirst = true
                lt_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value")).each do |ak|
                  if assnFirst == false
                    sql = (sql + [","])
                    wsql = (wsql + [","])
                  end
                  assnFirst = false
                  pushSql(identStr(ak))
                  pushW(identStr(ak))
                  pushSql("=")
                  pushW("=")
                  if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"))
                    tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values"))
                    if tmpRef != ""
                      emitIdent(tmpRef)
                    elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete"))))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = []
                      wsql = []
                      orderSql = ""
                      orderW = ""
                      hasOrder = false
                      subAlias = ""
                      renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                      subSql = lt_buf_str(sql).strip
                      subW = lt_buf_str(wsql).strip
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      pushSql(("(" + (subSql + ")")))
                      pushW(("(" + (subW + ")")))
                      if subAliasText != ""
                        pushSql(subAliasText)
                        pushW(subAliasText)
                      end
                    else
                      emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak))
                    end
                  else
                    emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak))
                  end
                end
              elsif nameNorm == "values"
                pushSql("VALUES")
                pushW("VALUES")
                valueRows = itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                valueFirst = true
                if ((valueRows).length != 0) && lt_truthy(lt_has(lt_get(valueRows, 0), "array"))
                  valueRows.each do |tuple|
                    if valueFirst == false
                      sql = (sql + [","])
                      wsql = (wsql + [","])
                    end
                    valueFirst = false
                    if dialect == "mysql"
                      pushSql("ROW")
                      pushW("ROW")
                    end
                    pushSql("(")
                    pushW("(")
                    itemFirst = true
                    itemsOf(tuple).each do |ti|
                      if itemFirst == false
                        sql = (sql + [","])
                        wsql = (wsql + [","])
                      end
                      itemFirst = false
                      if lt_truthy(lt_has(ti, "chain"))
                        tmpRef = isRef(lt_get(lt_get(ti, "chain"), "values"))
                        if tmpRef != ""
                          emitIdent(tmpRef)
                        elsif ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(ti, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(ti, "chain"), "values")) == "delete"))))
                          savedSql = sql
                          savedW = wsql
                          savedOrderSql = orderSql
                          savedOrderW = orderW
                          savedHasOrder = hasOrder
                          savedAlias = subAlias
                          sql = []
                          wsql = []
                          orderSql = ""
                          orderW = ""
                          hasOrder = false
                          subAlias = ""
                          renderNodes(lt_get(lt_get(ti, "chain"), "values"), 0)
                          subSql = lt_buf_str(sql).strip
                          subW = lt_buf_str(wsql).strip
                          subAliasText = subAlias
                          sql = savedSql
                          wsql = savedW
                          orderSql = savedOrderSql
                          orderW = savedOrderW
                          hasOrder = savedHasOrder
                          subAlias = savedAlias
                          pushSql(("(" + (subSql + ")")))
                          pushW(("(" + (subW + ")")))
                          if subAliasText != ""
                            pushSql(subAliasText)
                            pushW(subAliasText)
                          end
                        else
                          emitParam(ti)
                        end
                      else
                        emitParam(ti)
                      end
                    end
                    pushSql(")")
                    pushW(")")
                  end
                else
                  if dialect == "mysql"
                    pushSql("ROW")
                    pushW("ROW")
                  end
                  pushSql("(")
                  pushW("(")
                  itemFirst = true
                  valueRows.each do |ti|
                    if itemFirst == false
                      sql = (sql + [","])
                      wsql = (wsql + [","])
                    end
                    itemFirst = false
                    if lt_truthy(lt_has(ti, "chain"))
                      tmpRef = isRef(lt_get(lt_get(ti, "chain"), "values"))
                      if tmpRef != ""
                        emitIdent(tmpRef)
                      elsif ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(ti, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(ti, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(ti, "chain"), "values")) == "delete"))))
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = []
                        wsql = []
                        orderSql = ""
                        orderW = ""
                        hasOrder = false
                        subAlias = ""
                        renderNodes(lt_get(lt_get(ti, "chain"), "values"), 0)
                        subSql = lt_buf_str(sql).strip
                        subW = lt_buf_str(wsql).strip
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        pushSql(("(" + (subSql + ")")))
                        pushW(("(" + (subW + ")")))
                        if subAliasText != ""
                          pushSql(subAliasText)
                          pushW(subAliasText)
                        end
                      else
                        emitParam(ti)
                      end
                    else
                      emitParam(ti)
                    end
                  end
                  pushSql(")")
                  pushW(")")
                end
              elsif nameNorm == "onconflictdonothing"
                if dialect == "mysql"
                  raise lt_to_string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")
                else
                  pushSql("ON")
                  pushW("ON")
                  pushSql("CONFLICT")
                  pushW("CONFLICT")
                  pushSql(conflictTarget(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
                  pushW(conflictTarget(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
                  pushSql("DO")
                  pushW("DO")
                  pushSql("NOTHING")
                  pushW("NOTHING")
                end
              elsif nameNorm == "onconflictdoupdate"
                if dialect == "mysql"
                  pushSql("ON")
                  pushW("ON")
                  pushSql("DUPLICATE")
                  pushW("DUPLICATE")
                  pushSql("KEY")
                  pushW("KEY")
                  pushSql("UPDATE")
                  pushW("UPDATE")
                  assnFirst = true
                  lt_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value")).each do |ak|
                    if assnFirst == false
                      sql = (sql + [","])
                      wsql = (wsql + [","])
                    end
                    assnFirst = false
                    pushSql(identStr(ak))
                    pushW(identStr(ak))
                    pushSql("=")
                    pushW("=")
                    if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"))
                      tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"))
                      if tmpRef != ""
                        emitIdent(tmpRef)
                      elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete"))))
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = []
                        wsql = []
                        orderSql = ""
                        orderW = ""
                        hasOrder = false
                        subAlias = ""
                        renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                        subSql = lt_buf_str(sql).strip
                        subW = lt_buf_str(wsql).strip
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        pushSql(("(" + (subSql + ")")))
                        pushW(("(" + (subW + ")")))
                        if subAliasText != ""
                          pushSql(subAliasText)
                          pushW(subAliasText)
                        end
                      else
                        emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                      end
                    else
                      emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                    end
                  end
                else
                  pushSql("ON")
                  pushW("ON")
                  pushSql("CONFLICT")
                  pushW("CONFLICT")
                  pushSql(conflictTarget(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
                  pushW(conflictTarget(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
                  pushSql("DO")
                  pushW("DO")
                  pushSql("UPDATE")
                  pushW("UPDATE")
                  pushSql("SET")
                  pushW("SET")
                  assnFirst = true
                  lt_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value")).each do |ak|
                    if assnFirst == false
                      sql = (sql + [","])
                      wsql = (wsql + [","])
                    end
                    assnFirst = false
                    pushSql(identStr(ak))
                    pushW(identStr(ak))
                    pushSql("=")
                    pushW("=")
                    if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"))
                      tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"))
                      if tmpRef != ""
                        emitIdent(tmpRef)
                      elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete"))))
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = []
                        wsql = []
                        orderSql = ""
                        orderW = ""
                        hasOrder = false
                        subAlias = ""
                        renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                        subSql = lt_buf_str(sql).strip
                        subW = lt_buf_str(wsql).strip
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        pushSql(("(" + (subSql + ")")))
                        pushW(("(" + (subW + ")")))
                        if subAliasText != ""
                          pushSql(subAliasText)
                          pushW(subAliasText)
                        end
                      else
                        emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                      end
                    else
                      emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                    end
                  end
                end
              else
                raise lt_to_string(("sql-builder parse: unsupported clause " + name))
              end
            end
          end
        end
        flushOrder()
        return nil
      else
        first = true
        left = ""
        hasLeft = false
        base = ""
        nodes.each do |node|
          pn = normName(lt_get(lt_get(node, "functionCall"), "name"))
          op = opOf(pn)
          if lt_truthy(lt_has(node, "functionCall"))
            if (pn == "col") || (pn == "table")
              left = identStr(asString(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
              hasLeft = true
            elsif lt_truthy(op)
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              if lt_truthy(hasLeft)
                base = left
              else
                base = "?"
              end
              pushSql(base)
              pushW(base)
              pushSql(op)
              pushW(op)
              if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                if tmpRef != ""
                  emitIdent(tmpRef)
                elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                  savedSql = sql
                  savedW = wsql
                  savedOrderSql = orderSql
                  savedOrderW = orderW
                  savedHasOrder = hasOrder
                  savedAlias = subAlias
                  sql = []
                  wsql = []
                  orderSql = ""
                  orderW = ""
                  hasOrder = false
                  subAlias = ""
                  renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                  subSql = lt_buf_str(sql).strip
                  subW = lt_buf_str(wsql).strip
                  subAliasText = subAlias
                  sql = savedSql
                  wsql = savedW
                  orderSql = savedOrderSql
                  orderW = savedOrderW
                  hasOrder = savedHasOrder
                  subAlias = savedAlias
                  pushSql(("(" + (subSql + ")")))
                  pushW(("(" + (subW + ")")))
                  if subAliasText != ""
                    pushSql(subAliasText)
                    pushW(subAliasText)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
              else
                emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
              end
              hasLeft = false
            elsif pn == "exists"
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              pushSql("EXISTS")
              pushW("EXISTS")
              if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                if tmpRef != ""
                  emitIdent(tmpRef)
                elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                  savedSql = sql
                  savedW = wsql
                  savedOrderSql = orderSql
                  savedOrderW = orderW
                  savedHasOrder = hasOrder
                  savedAlias = subAlias
                  sql = []
                  wsql = []
                  orderSql = ""
                  orderW = ""
                  hasOrder = false
                  subAlias = ""
                  renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                  subSql = lt_buf_str(sql).strip
                  subW = lt_buf_str(wsql).strip
                  subAliasText = subAlias
                  sql = savedSql
                  wsql = savedW
                  orderSql = savedOrderSql
                  orderW = savedOrderW
                  hasOrder = savedHasOrder
                  subAlias = savedAlias
                  pushSql(("(" + (subSql + ")")))
                  pushW(("(" + (subW + ")")))
                  if subAliasText != ""
                    pushSql(subAliasText)
                    pushW(subAliasText)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
              else
                emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
              end
              hasLeft = false
            elsif pn == "in"
              if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                if ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                  if first == false
                    pushSql("AND")
                    pushW("AND")
                  end
                  first = false
                  if lt_truthy(hasLeft)
                    base = left
                  else
                    base = "?"
                  end
                  pushSql(base)
                  pushW(base)
                  pushSql("IN")
                  pushW("IN")
                  savedSql = sql
                  savedW = wsql
                  savedOrderSql = orderSql
                  savedOrderW = orderW
                  savedHasOrder = hasOrder
                  savedAlias = subAlias
                  sql = []
                  wsql = []
                  orderSql = ""
                  orderW = ""
                  hasOrder = false
                  subAlias = ""
                  renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                  subSql = lt_buf_str(sql).strip
                  subW = lt_buf_str(wsql).strip
                  subAliasText = subAlias
                  sql = savedSql
                  wsql = savedW
                  orderSql = savedOrderSql
                  orderW = savedOrderW
                  hasOrder = savedHasOrder
                  subAlias = savedAlias
                  pushSql(("(" + (subSql + ")")))
                  pushW(("(" + (subW + ")")))
                  if subAliasText != ""
                    pushSql(subAliasText)
                    pushW(subAliasText)
                  end
                else
                  if first == false
                    pushSql("AND")
                    pushW("AND")
                  end
                  first = false
                  if lt_truthy(hasLeft)
                    base = left
                  else
                    base = "?"
                  end
                  pushSql(base)
                  pushW(base)
                  pushSql("IN (")
                  pushW("IN (")
                  inFirst = true
                  itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")).each do |iv|
                    if inFirst == false
                      sql = (sql + [","])
                      wsql = (wsql + [","])
                    end
                    inFirst = false
                    if lt_truthy(lt_has(iv, "chain"))
                      tmpRef = isRef(lt_get(lt_get(iv, "chain"), "values"))
                      if tmpRef != ""
                        emitIdent(tmpRef)
                      elsif ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(iv, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(iv, "chain"), "values")) == "delete"))))
                        savedSql = sql
                        savedW = wsql
                        savedOrderSql = orderSql
                        savedOrderW = orderW
                        savedHasOrder = hasOrder
                        savedAlias = subAlias
                        sql = []
                        wsql = []
                        orderSql = ""
                        orderW = ""
                        hasOrder = false
                        subAlias = ""
                        renderNodes(lt_get(lt_get(iv, "chain"), "values"), 0)
                        subSql = lt_buf_str(sql).strip
                        subW = lt_buf_str(wsql).strip
                        subAliasText = subAlias
                        sql = savedSql
                        wsql = savedW
                        orderSql = savedOrderSql
                        orderW = savedOrderW
                        hasOrder = savedHasOrder
                        subAlias = savedAlias
                        pushSql(("(" + (subSql + ")")))
                        pushW(("(" + (subW + ")")))
                        if subAliasText != ""
                          pushSql(subAliasText)
                          pushW(subAliasText)
                        end
                      else
                        emitParam(iv)
                      end
                    else
                      emitParam(iv)
                    end
                  end
                  pushSql(")")
                  pushW(")")
                end
              else
                if first == false
                  pushSql("AND")
                  pushW("AND")
                end
                first = false
                if lt_truthy(hasLeft)
                  base = left
                else
                  base = "?"
                end
                pushSql(base)
                pushW(base)
                pushSql("IN (")
                pushW("IN (")
                inFirst = true
                itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")).each do |iv|
                  if inFirst == false
                    sql = (sql + [","])
                    wsql = (wsql + [","])
                  end
                  inFirst = false
                  if lt_truthy(lt_has(iv, "chain"))
                    tmpRef = isRef(lt_get(lt_get(iv, "chain"), "values"))
                    if tmpRef != ""
                      emitIdent(tmpRef)
                    elsif ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(iv, "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(iv, "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(iv, "chain"), "values")) == "delete"))))
                      savedSql = sql
                      savedW = wsql
                      savedOrderSql = orderSql
                      savedOrderW = orderW
                      savedHasOrder = hasOrder
                      savedAlias = subAlias
                      sql = []
                      wsql = []
                      orderSql = ""
                      orderW = ""
                      hasOrder = false
                      subAlias = ""
                      renderNodes(lt_get(lt_get(iv, "chain"), "values"), 0)
                      subSql = lt_buf_str(sql).strip
                      subW = lt_buf_str(wsql).strip
                      subAliasText = subAlias
                      sql = savedSql
                      wsql = savedW
                      orderSql = savedOrderSql
                      orderW = savedOrderW
                      hasOrder = savedHasOrder
                      subAlias = savedAlias
                      pushSql(("(" + (subSql + ")")))
                      pushW(("(" + (subW + ")")))
                      if subAliasText != ""
                        pushSql(subAliasText)
                        pushW(subAliasText)
                      end
                    else
                      emitParam(iv)
                    end
                  else
                    emitParam(iv)
                  end
                end
                pushSql(")")
                pushW(")")
              end
              hasLeft = false
            elsif pn == "between"
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              if lt_truthy(hasLeft)
                base = left
              else
                base = "?"
              end
              pushSql(base)
              pushW(base)
              pushSql("BETWEEN")
              pushW("BETWEEN")
              if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"))
                tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                if tmpRef != ""
                  emitIdent(tmpRef)
                elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete"))))
                  savedSql = sql
                  savedW = wsql
                  savedOrderSql = orderSql
                  savedOrderW = orderW
                  savedHasOrder = hasOrder
                  savedAlias = subAlias
                  sql = []
                  wsql = []
                  orderSql = ""
                  orderW = ""
                  hasOrder = false
                  subAlias = ""
                  renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                  subSql = lt_buf_str(sql).strip
                  subW = lt_buf_str(wsql).strip
                  subAliasText = subAlias
                  sql = savedSql
                  wsql = savedW
                  orderSql = savedOrderSql
                  orderW = savedOrderW
                  hasOrder = savedHasOrder
                  subAlias = savedAlias
                  pushSql(("(" + (subSql + ")")))
                  pushW(("(" + (subW + ")")))
                  if subAliasText != ""
                    pushSql(subAliasText)
                    pushW(subAliasText)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
                end
              else
                emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"))
              end
              pushSql("AND")
              pushW("AND")
              if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"))
                tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"))
                if tmpRef != ""
                  emitIdent(tmpRef)
                elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "delete"))))
                  savedSql = sql
                  savedW = wsql
                  savedOrderSql = orderSql
                  savedOrderW = orderW
                  savedHasOrder = hasOrder
                  savedAlias = subAlias
                  sql = []
                  wsql = []
                  orderSql = ""
                  orderW = ""
                  hasOrder = false
                  subAlias = ""
                  renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 0)
                  subSql = lt_buf_str(sql).strip
                  subW = lt_buf_str(wsql).strip
                  subAliasText = subAlias
                  sql = savedSql
                  wsql = savedW
                  orderSql = savedOrderSql
                  orderW = savedOrderW
                  hasOrder = savedHasOrder
                  subAlias = savedAlias
                  pushSql(("(" + (subSql + ")")))
                  pushW(("(" + (subW + ")")))
                  if subAliasText != ""
                    pushSql(subAliasText)
                    pushW(subAliasText)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"))
                end
              else
                emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"))
              end
              hasLeft = false
            elsif pn == "isnull"
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              if lt_truthy(hasLeft)
                base = left
              else
                base = "?"
              end
              pushSql(base)
              pushW(base)
              pushSql("IS NULL")
              pushW("IS NULL")
              hasLeft = false
            elsif pn == "isnotnull"
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              if lt_truthy(hasLeft)
                base = left
              else
                base = "?"
              end
              pushSql(base)
              pushW(base)
              pushSql("IS NOT NULL")
              pushW("IS NOT NULL")
              hasLeft = false
            elsif pn == "not"
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              pushSql("NOT (")
              pushW("NOT (")
              renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
              pushSql(")")
              pushW(")")
              hasLeft = false
            elsif (pn == "and") || (pn == "or")
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              pushSql("(")
              pushW("(")
              boolFirst = true
              itemsOf(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")).each do |bv|
                if boolFirst == false
                  tmp = pn.upcase
                  pushSql(tmp)
                  pushW(tmp)
                end
                boolFirst = false
                if lt_truthy(lt_has(bv, "chain"))
                  renderNodes(lt_get(lt_get(bv, "chain"), "values"), 1)
                else
                  emitParam(bv)
                end
              end
              pushSql(")")
              pushW(")")
              hasLeft = false
            elsif pn == "as"
              if lt_truthy(hasLeft)
                base = left
              else
                base = "?"
              end
              pushSql(base)
              pushW(base)
              pushSql("AS")
              pushW("AS")
              emitIdent(asString(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
              hasLeft = false
            elsif pn == "op"
              if first == false
                pushSql("AND")
                pushW("AND")
              end
              first = false
              if lt_truthy(hasLeft)
                base = left
              else
                base = "?"
              end
              pushSql(base)
              pushW(base)
              pushSql(asString(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
              pushW(asString(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 0), "argument")))
              if lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"))
                tmpRef = isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"))
                if tmpRef != ""
                  emitIdent(tmpRef)
                elsif ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "select") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "with")) || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "values") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "insert") || ((firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "update") || (firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "delete"))))
                  savedSql = sql
                  savedW = wsql
                  savedOrderSql = orderSql
                  savedOrderW = orderW
                  savedHasOrder = hasOrder
                  savedAlias = subAlias
                  sql = []
                  wsql = []
                  orderSql = ""
                  orderW = ""
                  hasOrder = false
                  subAlias = ""
                  renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 0)
                  subSql = lt_buf_str(sql).strip
                  subW = lt_buf_str(wsql).strip
                  subAliasText = subAlias
                  sql = savedSql
                  wsql = savedW
                  orderSql = savedOrderSql
                  orderW = savedOrderW
                  hasOrder = savedHasOrder
                  subAlias = savedAlias
                  pushSql(("(" + (subSql + ")")))
                  pushW(("(" + (subW + ")")))
                  if subAliasText != ""
                    pushSql(subAliasText)
                    pushW(subAliasText)
                  end
                else
                  emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"))
                end
              else
                emitParam(lt_get(lt_get(lt_get(lt_get(node, "functionCall"), "arguments"), 1), "argument"))
              end
              hasLeft = false
            elsif pn == "raw"
              emitRaw(node)
            else
              raise lt_to_string("sql-builder parse: unsupported predicate")
            end
          end
        end
        return nil
      end
      return nil
    }
    define_singleton_method(:renderNodes, renderNodes)
    renderNodes(lt_get(lt_get(lt_get(lt_get(root, "schema"), "chain"), "chain"), "values"), 0)
    sql = lt_buf_str(sql)
    wsql = lt_buf_str(wsql)
    params = params
    return { "sql" => sql.strip, "sqlWithParam" => wsql.strip, "param" => params.map { |p| (p["string"] || p["number"] || p["boolean"] || { "value" => nil })["value"] } }
  end
end

# Auto-generated init functions
def sqlBuilder(variable_name = nil, *copies)
  structure = SqlBuilder.new
  structure.init_from_init_function({
    "name" => "sql-builder",
    "variableName" => !variable_name.nil? && variable_name != "" ? variable_name : structure.get_schema["schema"]["chain"]["chain"]["initFunction"]["variableName"],
  }, copies)
  structure
end
