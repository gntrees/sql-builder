# parse() returns a dict: { "sql": str, "sqlWithParam": str, "param": list }

# Auto-generated index for gntrees-sql-builder

import lt

"""Auto-generated Python method-chain types.

Python is dynamic, so there is no static type block to emit (unlike
`base-types.ts`). The runtime contract is documented here instead.

A schema is a plain nested dictionary:

    {"schema": {
        "exportName": str,
        "importPaths": {language: str, ...},
        "chain": {"chain": {
            "values": [...],
            "initFunction": {"name": str, "variableName": str},
        }},
    }}

Each entry of ``values`` is one of::

    {"functionCall": {"name": str, "arguments": [Argument, ...],
                      "isTemplateLiteral": bool}}
    {"propertyCall": {"name": str}}
    {"copy": {"structureName": str, "chain": Chain}}

An ``Argument`` is ``{"argument": ArgumentValue, "default": ArgumentValue | None}``.
An ``ArgumentValue`` is a tagged dictionary, one of::

    {"string": {"value": str}}
    {"number": {"value": int | float}}
    {"boolean": {"value": bool}}
    {"null": {"value": None}}
    {"array": {"value": [ArgumentValue, ...]}}
    {"object": {"value": {key: ArgumentValue, ...}}}
    {"chain": Chain}

Struct definitions used by the runtime mirror the TypeScript ``StructType``
(``array``/``object``/``string``/``number``/``boolean``/``null``/``union``/
``map``/``literal``/``structureCall``), expressed as plain dictionaries.
"""


# Auto-generated utils
def normalize_argument_structure_call(arg):
    if isinstance(arg, (SqlBuilder)):
        return arg.get_schema()["schema"]["chain"]
    if arg is None:
        got = "null"
    elif isinstance(arg, list):
        got = "array"
    elif isinstance(arg, dict):
        raise Exception("Unknown structure call argument type")
    else:
        got = type(arg).__name__
    raise Exception("Expected a structure instance for structure calls, but got " + got)

def copy(source):
    if isinstance(source, SqlBuilder):
        return make_copy("sql-builder", source)
    raise Exception("copy() expects a structure instance created by an init function")

"""Auto-generated Python method-chain runtime.

This is the dynamic counterpart of `core/base/typescript/base-utils.ts`. Schemas
are plain nested dictionaries; the generator inlines this module (after
stripping relative imports) at the top of the generated `index.py`.

`normalize_argument_structure_call` and `copy` are *not* defined here: like the
TypeScript runtime they are emitted by the generator because they reference the
project's structure classes.
"""

import json
import math

# Sentinel for "argument not supplied". Generated methods give every parameter
# this default so optional arguments work; the runtime treats it like the
# TypeScript runtime treats `undefined`.
_MISSING = object()


def _typeof(value):
    """Best-effort analogue of JavaScript's `typeof` for error messages."""
    if value is None:
        return "object"
    if isinstance(value, bool):
        return "boolean"
    if isinstance(value, (int, float)):
        return "number"
    if isinstance(value, str):
        return "string"
    if isinstance(value, (list, dict)):
        return "object"
    return type(value).__name__


def validate_schema(schema):
    if not isinstance(schema, dict):
        raise Exception(
            "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
        )
    inner = schema.get("schema")
    if not isinstance(inner, dict):
        raise Exception(
            "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
        )
    chain = inner.get("chain")
    if not isinstance(chain, dict):
        raise Exception(
            "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
        )
    chain_chain = chain.get("chain")
    if not isinstance(chain_chain, dict):
        raise Exception(
            "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
        )
    if not isinstance(chain_chain.get("values"), list) or not chain_chain.get("initFunction"):
        raise Exception(
            "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
        )


def _unwrap_argument_value(val):
    if not isinstance(val, dict):
        raise Exception("Unknown argument value type")
    if "string" in val:
        return val["string"]["value"]
    if "number" in val:
        return val["number"]["value"]
    if "boolean" in val:
        return val["boolean"]["value"]
    if "null" in val:
        return val["null"]["value"]
    if "array" in val:
        return [_unwrap_argument_value(item) for item in val["array"]["value"]]
    if "object" in val:
        return {key: _unwrap_argument_value(item) for key, item in val["object"]["value"].items()}
    if "chain" in val:
        raise Exception("Cannot validate a chain default value at runtime")
    raise Exception("Unknown argument value type")


def validate_default(default_val, struct):
    normalize_argument(_unwrap_argument_value(default_val), struct)


def normalize_argument(arg, struct):
    if not isinstance(struct, dict):
        raise Exception("Unsupported struct type in normalizeArgument")

    if "array" in struct:
        if not isinstance(arg, list):
            raise Exception(f"Expected an array argument, but got {_typeof(arg)}")
        if len(arg) == 0:
            return {"array": {"value": []}}
        item_type = struct["array"]["type"]
        normalized_items = [normalize_argument(item, item_type) for item in arg]
        if normalized_items[0] is None:
            raise Exception("Unexpected undefined value in array")
        return {"array": {"value": normalized_items}}

    if "object" in struct:
        if not isinstance(arg, dict):
            raise Exception(f"Expected an object argument, but got {_typeof(arg)}")
        declared = struct["object"]
        missing_keys = [key for key in declared if key not in arg]
        if len(missing_keys) > 0:
            raise Exception('Missing required key(s) "' + '", "'.join(missing_keys) + '" in object argument')
        normalized_object = {}
        for key, value in arg.items():
            if key not in declared:
                raise Exception(f'Unexpected key "{key}" in object argument')
            normalized_object[key] = normalize_argument(value, declared[key])
        return {"object": {"value": normalized_object}}

    if "string" in struct:
        if not isinstance(arg, str):
            raise Exception(f"Expected a string argument, but got {_typeof(arg)}")
        return {"string": {"value": arg}}

    if "number" in struct:
        if isinstance(arg, bool) or not isinstance(arg, (int, float)):
            raise Exception(f"Expected a number argument, but got {_typeof(arg)}")
        if not math.isfinite(arg):
            raise Exception(f"Expected a finite number argument, but got {arg}")
        return {"number": {"value": arg}}

    if "boolean" in struct:
        if not isinstance(arg, bool):
            raise Exception(f"Expected a boolean argument, but got {_typeof(arg)}")
        return {"boolean": {"value": arg}}

    if "null" in struct:
        if arg is not None:
            raise Exception(f"Expected a null argument, but got {_typeof(arg)}")
        return {"null": {"value": arg}}

    if "union" in struct:
        reasons = []
        normalized_union_types = []
        for union_type in struct["union"]["types"]:
            try:
                normalized_union_types.append(normalize_argument(arg, union_type))
            except Exception as error:
                reasons.append(str(error))
        if len(normalized_union_types) == 0 or not normalized_union_types[0]:
            raise Exception("Argument does not match any type in the union: " + " | ".join(reasons))
        if len(normalized_union_types) > 1:
            if isinstance(arg, list) and len(arg) == 0:
                return normalized_union_types[0]
            raise Exception("Argument matches multiple types in the union, which is ambiguous")
        return normalized_union_types[0]

    if "map" in struct:
        if not isinstance(arg, dict):
            raise Exception(f"Expected an object argument for map type, but got {_typeof(arg)}")
        normalized_map = {}
        for key, value in arg.items():
            normalized_map[key] = normalize_argument(value, struct["map"]["type"])
        return {"object": {"value": normalized_map}}

    if "structureCall" in struct:
        return normalize_argument_structure_call(arg)

    if "literal" in struct:
        expected = struct["literal"]["value"]
        literal_type = struct["literal"].get("type")
        if literal_type == "string":
            if not isinstance(arg, str):
                raise Exception(f"Expected a string literal argument, but got {_typeof(arg)}")
            if arg != expected:
                raise Exception(f"Expected string literal {json.dumps(expected)}, but got {json.dumps(arg)}")
            return {"string": {"value": arg}}
        if literal_type == "number":
            if isinstance(arg, bool) or not isinstance(arg, (int, float)):
                raise Exception(f"Expected a number literal argument, but got {_typeof(arg)}")
            if not math.isfinite(arg):
                raise Exception(f"Expected a finite number argument, but got {arg}")
            if arg != expected:
                raise Exception(f"Expected number literal {expected}, but got {arg}")
            return {"number": {"value": arg}}
        if not isinstance(arg, bool):
            raise Exception(f"Expected a boolean literal argument, but got {_typeof(arg)}")
        if arg != expected:
            raise Exception(f"Expected boolean literal {expected}, but got {arg}")
        return {"boolean": {"value": arg}}

    raise Exception("Unsupported struct type in normalizeArgument")


def create_schema(old_schema, function_name, function_args, is_template_literal):
    validate_schema(old_schema)
    old = old_schema["schema"]
    old_chain = old["chain"]["chain"]
    new_schema = {
        "schema": {
            **old,
            "chain": {
                "chain": {
                    "values": list(old_chain["values"]),
                    "initFunction": old_chain["initFunction"],
                }
            },
        }
    }

    if is_template_literal and function_args and function_args[0]:
        strings = function_args[0].get("arg")
        if not isinstance(strings, list) or not all(isinstance(text, str) for text in strings):
            raise Exception(f"Expected a template strings array for {function_name}")
        expressions = function_args[1:]
        if len(expressions) != len(strings) - 1:
            raise Exception(
                f"Template literal for {function_name} expects {len(strings) - 1} expression(s), but got {len(expressions)}"
            )
        args = []
        for index, text in enumerate(strings):
            if text:
                args.append({"argument": {"string": {"value": text}}, "default": None})
            if index < len(expressions):
                expression = expressions[index]
                if not expression:
                    raise Exception(f"Missing expression for template literal at index {index}")
                args.append(
                    {"argument": normalize_argument(expression.get("arg"), expression.get("struct")), "default": None}
                )
    else:
        args = []
        for index, function_arg in enumerate(function_args):
            arg = function_arg.get("arg")
            if arg is _MISSING:
                if function_arg.get("provided"):
                    raise Exception(f'Parameter "{function_name}" argument #{index + 1} cannot be undefined')
                default = function_arg.get("default")
                if default is not None:
                    validate_default(default, function_arg.get("struct"))
                    args.append({"argument": default, "default": default})
                    continue
                raise Exception(f'Parameter "{function_name}" argument #{index + 1} was not provided')
            argument = normalize_argument(arg, function_arg.get("struct"))
            default = function_arg.get("default")
            if default is not None:
                validate_default(default, function_arg.get("struct"))
            args.append({"argument": argument, "default": default})

    new_schema["schema"]["chain"]["chain"]["values"].append(
        {
            "functionCall": {
                "name": function_name,
                "arguments": args,
                "isTemplateLiteral": bool(is_template_literal),
            }
        }
    )
    return new_schema


def create_property_call_schema(old_schema, property_name):
    old = old_schema["schema"]
    old_chain = old["chain"]["chain"]
    return {
        "schema": {
            **old,
            "chain": {
                "chain": {
                    "values": list(old_chain["values"]) + [{"propertyCall": {"name": property_name}}],
                    "initFunction": old_chain["initFunction"],
                }
            },
        }
    }


def make_copy(structure_name, source):
    schema = source.get_schema()
    validate_schema(schema)
    return {
        "copy": {
            "structureName": structure_name,
            "chain": schema["schema"]["chain"],
        }
    }


def apply_copies(schema, copies, target_structure_name):
    if not copies:
        return
    for cp in copies:
        if (
            not isinstance(cp, dict)
            or "copy" not in cp
            or not isinstance(cp["copy"], dict)
            or not isinstance(cp["copy"].get("structureName"), str)
            or not isinstance(cp["copy"].get("chain"), dict)
        ):
            raise Exception("Invalid builder argument in init function: wrap the structure with copy(...)")
        if cp["copy"]["structureName"] != target_structure_name:
            raise Exception(
                f"Cannot copy builder of structure '{cp['copy']['structureName']}' into '{target_structure_name}'"
            )
        value = {
            "copy": {
                "structureName": cp["copy"]["structureName"],
                "chain": cp["copy"]["chain"],
            }
        }
        schema["schema"]["chain"]["chain"]["values"].append(value)


class SqlBuilder(object):

    # Auto-generated definition for sql-builder

    def __init__(self):
        self.schemaSqlBuilder = {
            "schema": {
                "exportName": "schema",
                "importPaths": {"typescript": "../../../gntrees-sql-builder/typescript/index"},
                "chain": {
                    "chain": {
                        "values": [],
                        "initFunction": {
                            "name": "sql-builder",
                            "variableName": "s1",
                        },
                    },
                },
            },
        }

    def get_schema(self, export_name=None, import_paths=None):
        if export_name is not None and not isinstance(export_name, str):
            raise Exception("get_schema exportName must be a string, but got " + type(export_name).__name__)
        if import_paths is not None and not isinstance(import_paths, dict):
            raise Exception("get_schema importPaths must be an object, but got " + type(import_paths).__name__)
        if export_name:
            self.schemaSqlBuilder["schema"]["exportName"] = export_name
        if import_paths:
            self.schemaSqlBuilder["schema"]["importPaths"] = {**(self.schemaSqlBuilder["schema"].get("importPaths") or {}), **import_paths}
        return self.schemaSqlBuilder

    def init_from_structure(self, schema):
        validate_schema(schema)
        self.schemaSqlBuilder = schema
        return self

    def init_from_init_function(self, init_function, copies=None):
        if (
            not isinstance(init_function, dict)
            or not isinstance(init_function.get("name"), str)
            or not isinstance(init_function.get("variableName"), str)
        ):
            raise Exception("Invalid init function")
        self.schemaSqlBuilder["schema"]["chain"]["chain"]["initFunction"] = init_function
        apply_copies(self.schemaSqlBuilder, copies, "sql-builder")
        return self

    def select(self, columns=_MISSING):
        if columns is _MISSING:
            raise Exception('Parameter "select" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "select", [
            {"arg": columns, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}, {"map": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": columns is not _MISSING},
        ], False))

    def from_(self, table=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "from" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "from", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
        ], False))

    def transaction(self, transaction=_MISSING):
        if transaction is _MISSING:
            raise Exception('Parameter "transaction" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "transaction", [
            {"arg": transaction, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": transaction is not _MISSING},
        ], False))

    def orderBy(self, columns=_MISSING):
        if columns is _MISSING:
            raise Exception('Parameter "orderBy" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "orderBy", [
            {"arg": columns, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": columns is not _MISSING},
        ], False))

    def limit(self, count=_MISSING):
        if count is _MISSING:
            raise Exception('Parameter "limit" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "limit", [
            {"arg": count, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": count is not _MISSING},
        ], False))

    def offset(self, count=_MISSING):
        if count is _MISSING:
            raise Exception('Parameter "offset" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "offset", [
            {"arg": count, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": count is not _MISSING},
        ], False))

    def with_(self, statement=_MISSING, as_=_MISSING):
        if statement is _MISSING:
            raise Exception('Parameter "with" argument #1 was not provided')
        if as_ is _MISSING:
            raise Exception('Parameter "with" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "with", [
            {"arg": statement, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": statement is not _MISSING},
            {"arg": as_, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": as_ is not _MISSING},
        ], False))

    def groupBy(self, columns=_MISSING):
        if columns is _MISSING:
            raise Exception('Parameter "groupBy" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "groupBy", [
            {"arg": columns, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": columns is not _MISSING},
        ], False))

    def having(self, statement=_MISSING):
        if statement is _MISSING:
            raise Exception('Parameter "having" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "having", [
            {"arg": statement, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": statement is not _MISSING},
        ], False))

    def where(self, statement=_MISSING):
        if statement is _MISSING:
            raise Exception('Parameter "where" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "where", [
            {"arg": statement, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": statement is not _MISSING},
        ], False))

    def update(self, table=_MISSING, set=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "update" argument #1 was not provided')
        if set is _MISSING:
            raise Exception('Parameter "update" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "update", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": set, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"map": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": set is not _MISSING},
        ], False))

    def set(self, statement=_MISSING):
        if statement is _MISSING:
            raise Exception('Parameter "set" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "set", [
            {"arg": statement, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"map": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": statement is not _MISSING},
        ], False))

    def insert(self, table=_MISSING, set=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "insert" argument #1 was not provided')
        if set is _MISSING:
            raise Exception('Parameter "insert" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "insert", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": set, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"map": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": set is not _MISSING},
        ], False))

    def values(self, values=_MISSING):
        if values is _MISSING:
            raise Exception('Parameter "values" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "values", [
            {"arg": values, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}, {"array": {"type": {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}}}]}}, "provided": values is not _MISSING},
        ], False))

    def returning(self, columns=_MISSING):
        if columns is _MISSING:
            raise Exception('Parameter "returning" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "returning", [
            {"arg": columns, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}, {"map": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": columns is not _MISSING},
        ], False))

    def onConflictDoNothing(self, target=_MISSING):
        if target is _MISSING:
            raise Exception('Parameter "onConflictDoNothing" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "onConflictDoNothing", [
            {"arg": target, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": target is not _MISSING},
        ], False))

    def onConflictDoUpdate(self, target=_MISSING, set=_MISSING):
        if target is _MISSING:
            raise Exception('Parameter "onConflictDoUpdate" argument #1 was not provided')
        if set is _MISSING:
            raise Exception('Parameter "onConflictDoUpdate" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "onConflictDoUpdate", [
            {"arg": target, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": target is not _MISSING},
            {"arg": set, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"map": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": set is not _MISSING},
        ], False))

    def delete(self, table=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "delete" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "delete", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
        ], False))

    def join(self, table=_MISSING, on=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "join" argument #1 was not provided')
        if on is _MISSING:
            raise Exception('Parameter "join" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "join", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": on, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": on is not _MISSING},
        ], False))

    def leftJoin(self, table=_MISSING, on=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "leftJoin" argument #1 was not provided')
        if on is _MISSING:
            raise Exception('Parameter "leftJoin" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "leftJoin", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": on, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": on is not _MISSING},
        ], False))

    def rightJoin(self, table=_MISSING, on=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "rightJoin" argument #1 was not provided')
        if on is _MISSING:
            raise Exception('Parameter "rightJoin" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "rightJoin", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": on, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": on is not _MISSING},
        ], False))

    def innerJoin(self, table=_MISSING, on=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "innerJoin" argument #1 was not provided')
        if on is _MISSING:
            raise Exception('Parameter "innerJoin" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "innerJoin", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": on, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": on is not _MISSING},
        ], False))

    def fullJoin(self, table=_MISSING, on=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "fullJoin" argument #1 was not provided')
        if on is _MISSING:
            raise Exception('Parameter "fullJoin" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "fullJoin", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": on, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": on is not _MISSING},
        ], False))

    def crossJoin(self, table=_MISSING, on=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "crossJoin" argument #1 was not provided')
        if on is _MISSING:
            raise Exception('Parameter "crossJoin" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "crossJoin", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
            {"arg": on, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": on is not _MISSING},
        ], False))

    def eq(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "eq" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "eq", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def gt(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "gt" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "gt", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def gte(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "gte" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "gte", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def lt(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "lt" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "lt", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def lte(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "lte" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "lte", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def exists(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "exists" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "exists", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def isNull(self):
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "isNull", [
        ], False))

    def isNotNull(self):
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "isNotNull", [
        ], False))

    def in_(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "in" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "in", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def between(self, first=_MISSING, second=_MISSING):
        if first is _MISSING:
            raise Exception('Parameter "between" argument #1 was not provided')
        if second is _MISSING:
            raise Exception('Parameter "between" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "between", [
            {"arg": first, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": first is not _MISSING},
            {"arg": second, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": second is not _MISSING},
        ], False))

    def like(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "like" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "like", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def ilike(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "ilike" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "ilike", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def not_(self, value=_MISSING):
        if value is _MISSING:
            raise Exception('Parameter "not" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "not", [
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def and_(self, values=_MISSING):
        if values is _MISSING:
            raise Exception('Parameter "and" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "and", [
            {"arg": values, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": values is not _MISSING},
        ], False))

    def or_(self, values=_MISSING):
        if values is _MISSING:
            raise Exception('Parameter "or" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "or", [
            {"arg": values, "struct": {"union": {"types": [{"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, {"array": {"type": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}}}]}}, "provided": values is not _MISSING},
        ], False))

    def op(self, operation=_MISSING, value=_MISSING):
        if operation is _MISSING:
            raise Exception('Parameter "op" argument #1 was not provided')
        if value is _MISSING:
            raise Exception('Parameter "op" argument #2 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "op", [
            {"arg": operation, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": operation is not _MISSING},
            {"arg": value, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": value is not _MISSING},
        ], False))

    def raw(self, strings, *args):
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "raw", [
            {"arg": strings, "struct": {"string": {"type": "string"}}},
        ] + [{"arg": __arg, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}} for __arg in args], True))

    def asc(self):
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "asc", [
        ], False))

    def desc(self):
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "desc", [
        ], False))

    def as_(self, alias=_MISSING):
        if alias is _MISSING:
            raise Exception('Parameter "as" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "as", [
            {"arg": alias, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": alias is not _MISSING},
        ], False))

    def col(self, column=_MISSING):
        if column is _MISSING:
            raise Exception('Parameter "col" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "col", [
            {"arg": column, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": column is not _MISSING},
        ], False))

    def table(self, table=_MISSING):
        if table is _MISSING:
            raise Exception('Parameter "table" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "table", [
            {"arg": table, "struct": {"union": {"types": [{"string": {"type": "string"}}, {"number": {"type": "number"}}, {"boolean": {"type": "boolean"}}, {"structureCall": {"name": "sql-builder"}}]}}, "provided": table is not _MISSING},
        ], False))

    def setDialect(self, db=_MISSING):
        if db is _MISSING:
            raise Exception('Parameter "setDialect" argument #1 was not provided')
        return SqlBuilder().init_from_structure(create_schema(self.get_schema(), "setDialect", [
            {"arg": db, "struct": {"union": {"types": [{"literal": {"value": "postgres", "type": "string"}}, {"literal": {"value": "mysql", "type": "string"}}, {"literal": {"value": "sqlite", "type": "string"}}, {"literal": {"value": "single-store", "type": "string"}}, {"literal": {"value": "mssql", "type": "string"}}, {"literal": {"value": "cockroach", "type": "string"}}]}}, "provided": db is not _MISSING},
        ], False))

    def parse(self):
        root = self.get_schema()
        dialect = ""
        quote = ""
        sql = []
        wsql = []
        params = []
        orderSql = ""
        orderW = ""
        hasOrder = False
        tmp = ""
        tmp2 = ""
        tmpRef = ""
        subAlias = ""
        withFirst = True
        def normName(n):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName
          return n.replace("-", "").lower()
        def pushSql(text):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql
          sql = (sql + [" "])
          sql = (sql + [text])
          return None
        def pushW(text):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW
          wsql = (wsql + [" "])
          wsql = (wsql + [text])
          return None
        def asString(arg):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString
          return lt.get(lt.get(arg, "string"), "value")
        def identStr(name):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr
          escapedName = name.replace(quote, (quote + quote))
          qualifiedName = escapedName.replace(".", (quote + ("." + quote)))
          return (quote + (qualifiedName + quote))
        def literalOf(arg):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf
          outLiteral = ""
          if lt.truthy(lt.has(arg, "string")):
              outLiteral = ("'" + (asString(arg).replace("'", "''") + "'"))
          elif lt.truthy(lt.has(arg, "number")):
              outLiteral = lt.to_string(lt.get(lt.get(arg, "number"), "value"))
          elif lt.truthy(lt.has(arg, "boolean")):
              if lt.truthy(lt.get(lt.get(arg, "boolean"), "value")):
                  outLiteral = "TRUE"
              else:
                  outLiteral = "FALSE"
          else:
              outLiteral = "NULL"
          return outLiteral
        def opOf(n):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf
          o = ""
          if n == "eq":
              o = "="
          elif n == "gt":
              o = ">"
          elif n == "gte":
              o = ">="
          elif n == "lt":
              o = "<"
          elif n == "lte":
              o = "<="
          elif n == "like":
              o = "LIKE"
          elif n == "ilike":
              if dialect == "postgres":
                  o = "ILIKE"
              else:
                  o = "LIKE"
          return o
        def itemsOf(arg):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf
          if lt.truthy(lt.has(arg, "array")):
              return lt.get(lt.get(arg, "array"), "value")
          return ([] + [arg])
        def isRef(chainValues):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef
          tmpRef = ""
          if (len(chainValues) == 1) and lt.truthy(lt.has(lt.get(chainValues, 0), "functionCall")):
              firstName = lt.get(lt.get(lt.get(chainValues, 0), "functionCall"), "name")
              if (firstName == "col") or (firstName == "table"):
                  tmpRef = asString(lt.get(lt.get(lt.get(lt.get(lt.get(chainValues, 0), "functionCall"), "arguments"), 0), "argument"))
          return tmpRef
        def emitParam(arg):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam
          params = (params + [arg])
          if dialect == "postgres":
              tmp = ("$" + lt.to_string(len(params)))
          else:
              tmp = "?"
          pushSql(tmp)
          tmp2 = literalOf(arg)
          pushW(tmp2)
          return None
        def emitIdent(name):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent
          tmp = identStr(name)
          pushSql(tmp)
          pushW(tmp)
          return None
        def emitRaw(node):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent, emitRaw
          if len(sql) != 0:
              sql = (sql + [" "])
              wsql = (wsql + [" "])
          for rawArg in lt.get(lt.get(node, "functionCall"), "arguments"):
              rawVal = lt.get(rawArg, "argument")
              if lt.truthy(lt.has(rawVal, "string")):
                  sql = (sql + [asString(rawVal)])
                  wsql = (wsql + [asString(rawVal)])
              elif lt.truthy(lt.has(rawVal, "chain")):
                  tmpRef = isRef(lt.get(lt.get(rawVal, "chain"), "values"))
                  if tmpRef != "":
                      sql = (sql + [identStr(tmpRef)])
                      wsql = (wsql + [identStr(tmpRef)])
                  else:
                      params = (params + [rawVal])
                      if dialect == "postgres":
                          tmp = ("$" + lt.to_string(len(params)))
                      else:
                          tmp = "?"
                      sql = (sql + [tmp])
                      tmp2 = literalOf(rawVal)
                      wsql = (wsql + [tmp2])
              else:
                  params = (params + [rawVal])
                  if dialect == "postgres":
                      tmp = ("$" + lt.to_string(len(params)))
                  else:
                      tmp = "?"
                  sql = (sql + [tmp])
                  tmp2 = literalOf(rawVal)
                  wsql = (wsql + [tmp2])
          return None
        def conflictTarget(arg):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent, emitRaw, conflictTarget
          ct = "()"
          if lt.truthy(lt.has(arg, "chain")):
              tmpRef = isRef(lt.get(lt.get(arg, "chain"), "values"))
              if tmpRef != "":
                  ct = ("(" + (identStr(tmpRef) + ")"))
          elif lt.truthy(lt.has(arg, "string")):
              ct = ("(" + (identStr(asString(arg)) + ")"))
          return ct
        def firstKind(chainValues):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent, emitRaw, conflictTarget, firstKind
          kind = ""
          if (len(chainValues) != 0) and lt.truthy(lt.has(lt.get(chainValues, 0), "functionCall")):
              kind = normName(lt.get(lt.get(lt.get(chainValues, 0), "functionCall"), "name"))
          return kind
        def emitOrderItem(item):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent, emitRaw, conflictTarget, firstKind, emitOrderItem
          dir = ""
          ordName = ""
          if lt.truthy(lt.has(item, "chain")):
              for on in lt.get(lt.get(item, "chain"), "values"):
                  onn = normName(lt.get(lt.get(on, "functionCall"), "name"))
                  if onn == "asc":
                      dir = " ASC"
                  elif onn == "desc":
                      dir = " DESC"
                  elif (onn == "col") or (onn == "table"):
                      ordName = asString(lt.get(lt.get(lt.get(lt.get(on, "functionCall"), "arguments"), 0), "argument"))
          if ordName != "":
              tmp = identStr(ordName)
              orderSql = (orderSql + (tmp + dir))
              orderW = (orderW + (tmp + dir))
          return None
        def emitOrderList(arg):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent, emitRaw, conflictTarget, firstKind, emitOrderItem, emitOrderList
          firstOrder = True
          for item in itemsOf(arg):
              if firstOrder == False:
                  orderSql = (orderSql + ", ")
                  orderW = (orderW + ", ")
              firstOrder = False
              emitOrderItem(item)
          return None
        def flushOrder():
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent, emitRaw, conflictTarget, firstKind, emitOrderItem, emitOrderList, flushOrder
          if lt.truthy(hasOrder):
              pushSql("ORDER")
              pushSql("BY")
              pushW("ORDER")
              pushW("BY")
              tmp = orderSql
              if tmp != "":
                  pushSql(tmp)
              tmp2 = orderW
              if tmp2 != "":
                  pushW(tmp2)
              hasOrder = False
          return None
        for dialectNode in lt.get(lt.get(lt.get(lt.get(root, "schema"), "chain"), "chain"), "values"):
            if normName(lt.get(lt.get(dialectNode, "functionCall"), "name")) == "setdialect":
                dialect = lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(dialectNode, "functionCall"), "arguments"), 0), "argument"), "string"), "value")
        if dialect == "":
            raise Exception(lt.to_string("sql-builder parse: setDialect(...) must be called before parse()"))
        elif (dialect != "postgres") and (dialect != "mysql"):
            raise Exception(lt.to_string(("sql-builder parse: unsupported dialect " + dialect)))
        if dialect == "mysql":
            quote = "`"
        else:
            quote = "\""
        def renderNodes(nodes, mode):
          nonlocal dialect, quote, sql, wsql, params, orderSql, orderW, hasOrder, tmp, tmp2, tmpRef, subAlias, withFirst, normName, pushSql, pushW, asString, identStr, literalOf, opOf, itemsOf, isRef, emitParam, emitIdent, emitRaw, conflictTarget, firstKind, emitOrderItem, emitOrderList, flushOrder, renderNodes
          savedSql = ""
          savedW = ""
          savedOrderSql = ""
          savedOrderW = ""
          savedHasOrder = False
          savedAlias = ""
          subSql = ""
          subW = ""
          subAliasText = ""
          first = True
          left = ""
          hasLeft = False
          base = ""
          if mode == 0:
              for node in nodes:
                  if lt.truthy(lt.has(node, "functionCall")):
                      name = lt.get(lt.get(node, "functionCall"), "name")
                      nameNorm = normName(name)
                      if nameNorm == "setdialect":
                          continue
                      elif (nameNorm == "asc") or (nameNorm == "desc"):
                          if lt.truthy(hasOrder):
                              tmp = nameNorm.upper()
                              orderSql = (orderSql + (" " + tmp))
                              orderW = (orderW + (" " + tmp))
                      else:
                          if nameNorm == "with":
                              savedSql = sql
                              savedW = wsql
                              savedOrderSql = orderSql
                              savedOrderW = orderW
                              savedHasOrder = hasOrder
                              sql = []
                              wsql = []
                              orderSql = ""
                              orderW = ""
                              hasOrder = False
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                              subSql = lt.buf_str(sql).strip()
                              subW = lt.buf_str(wsql).strip()
                              sql = savedSql
                              wsql = savedW
                              orderSql = savedOrderSql
                              orderW = savedOrderW
                              hasOrder = savedHasOrder
                              if withFirst == False:
                                  sql = (sql + [","])
                                  wsql = (wsql + [","])
                              else:
                                  withFirst = False
                                  pushSql("WITH")
                                  pushW("WITH")
                              pushSql(identStr(asString(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"))))
                              pushW(identStr(asString(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"))))
                              pushSql("AS")
                              pushW("AS")
                              pushSql(("(" + (subSql + ")")))
                              pushW(("(" + (subW + ")")))
                          elif nameNorm == "transaction":
                              pushSql("BEGIN")
                              pushW("BEGIN")
                              sql = (sql + [";"])
                              wsql = (wsql + [";"])
                              txnFirst = True
                              for txnItem in itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")):
                                  if txnFirst == False:
                                      sql = (sql + [";"])
                                      wsql = (wsql + [";"])
                                  txnFirst = False
                                  if lt.truthy(lt.has(txnItem, "chain")):
                                      renderNodes(lt.get(lt.get(txnItem, "chain"), "values"), 0)
                                  elif lt.truthy(lt.has(txnItem, "string")):
                                      pushSql(asString(txnItem))
                                      pushW(asString(txnItem))
                                  else:
                                      if lt.truthy(lt.has(txnItem, "chain")):
                                          tmpRef = isRef(lt.get(lt.get(txnItem, "chain"), "values"))
                                          if tmpRef != "":
                                              emitIdent(tmpRef)
                                          elif ((firstKind(lt.get(lt.get(txnItem, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(txnItem, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(txnItem, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(txnItem, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(txnItem, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(txnItem, "chain"), "values")) == "delete")))):
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
                                              hasOrder = False
                                              subAlias = ""
                                              renderNodes(lt.get(lt.get(txnItem, "chain"), "values"), 0)
                                              subSql = lt.buf_str(sql).strip()
                                              subW = lt.buf_str(wsql).strip()
                                              subAliasText = subAlias
                                              sql = savedSql
                                              wsql = savedW
                                              orderSql = savedOrderSql
                                              orderW = savedOrderW
                                              hasOrder = savedHasOrder
                                              subAlias = savedAlias
                                              pushSql(("(" + (subSql + ")")))
                                              pushW(("(" + (subW + ")")))
                                              if subAliasText != "":
                                                  pushSql(subAliasText)
                                                  pushW(subAliasText)
                                          else:
                                              emitParam(txnItem)
                                      else:
                                          emitParam(txnItem)
                              if txnFirst == False:
                                  sql = (sql + [";"])
                                  wsql = (wsql + [";"])
                              pushSql("COMMIT")
                              pushW("COMMIT")
                          elif nameNorm == "select":
                              flushOrder()
                              pushSql("SELECT")
                              pushW("SELECT")
                              firstItem = True
                              for item in itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")):
                                  if firstItem == False:
                                      sql = (sql + [","])
                                      wsql = (wsql + [","])
                                  firstItem = False
                                  if lt.truthy(lt.has(item, "chain")):
                                      tmpRef = isRef(lt.get(lt.get(item, "chain"), "values"))
                                      if tmpRef != "":
                                          emitIdent(tmpRef)
                                      elif ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(item, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(item, "chain"), "values")) == "delete")))):
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
                                          hasOrder = False
                                          subAlias = ""
                                          renderNodes(lt.get(lt.get(item, "chain"), "values"), 0)
                                          subSql = lt.buf_str(sql).strip()
                                          subW = lt.buf_str(wsql).strip()
                                          subAliasText = subAlias
                                          sql = savedSql
                                          wsql = savedW
                                          orderSql = savedOrderSql
                                          orderW = savedOrderW
                                          hasOrder = savedHasOrder
                                          subAlias = savedAlias
                                          pushSql(("(" + (subSql + ")")))
                                          pushW(("(" + (subW + ")")))
                                          if subAliasText != "":
                                              pushSql(subAliasText)
                                              pushW(subAliasText)
                                      else:
                                          renderNodes(lt.get(lt.get(item, "chain"), "values"), 1)
                                  else:
                                      emitParam(item)
                          elif nameNorm == "from":
                              flushOrder()
                              pushSql("FROM")
                              pushW("FROM")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          elif nameNorm == "join":
                              flushOrder()
                              pushSql("JOIN")
                              pushW("JOIN")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              pushSql("ON")
                              pushW("ON")
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "leftjoin":
                              flushOrder()
                              pushSql("LEFT JOIN")
                              pushW("LEFT JOIN")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              pushSql("ON")
                              pushW("ON")
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "rightjoin":
                              flushOrder()
                              pushSql("RIGHT JOIN")
                              pushW("RIGHT JOIN")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              pushSql("ON")
                              pushW("ON")
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "innerjoin":
                              flushOrder()
                              pushSql("INNER JOIN")
                              pushW("INNER JOIN")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              pushSql("ON")
                              pushW("ON")
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "fulljoin":
                              if dialect == "mysql":
                                  raise Exception(lt.to_string("sql-builder parse: FULL JOIN is not supported by mysql"))
                              else:
                                  flushOrder()
                                  pushSql("FULL JOIN")
                                  pushW("FULL JOIN")
                                  if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                      tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                      if tmpRef != "":
                                          emitIdent(tmpRef)
                                      elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                          hasOrder = False
                                          subAlias = ""
                                          renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                          subSql = lt.buf_str(sql).strip()
                                          subW = lt.buf_str(wsql).strip()
                                          subAliasText = subAlias
                                          sql = savedSql
                                          wsql = savedW
                                          orderSql = savedOrderSql
                                          orderW = savedOrderW
                                          hasOrder = savedHasOrder
                                          subAlias = savedAlias
                                          pushSql(("(" + (subSql + ")")))
                                          pushW(("(" + (subW + ")")))
                                          if subAliasText != "":
                                              pushSql(subAliasText)
                                              pushW(subAliasText)
                                      else:
                                          renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                                  pushSql("ON")
                                  pushW("ON")
                                  renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "crossjoin":
                              flushOrder()
                              pushSql("CROSS JOIN")
                              pushW("CROSS JOIN")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              pushSql("ON")
                              pushW("ON")
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "where":
                              flushOrder()
                              pushSql("WHERE")
                              pushW("WHERE")
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "groupby":
                              flushOrder()
                              pushSql("GROUP BY")
                              pushW("GROUP BY")
                              firstItem = True
                              for item in itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")):
                                  if firstItem == False:
                                      sql = (sql + [","])
                                      wsql = (wsql + [","])
                                  firstItem = False
                                  if lt.truthy(lt.has(item, "chain")):
                                      tmpRef = isRef(lt.get(lt.get(item, "chain"), "values"))
                                      if tmpRef != "":
                                          emitIdent(tmpRef)
                                      elif ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(item, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(item, "chain"), "values")) == "delete")))):
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
                                          hasOrder = False
                                          subAlias = ""
                                          renderNodes(lt.get(lt.get(item, "chain"), "values"), 0)
                                          subSql = lt.buf_str(sql).strip()
                                          subW = lt.buf_str(wsql).strip()
                                          subAliasText = subAlias
                                          sql = savedSql
                                          wsql = savedW
                                          orderSql = savedOrderSql
                                          orderW = savedOrderW
                                          hasOrder = savedHasOrder
                                          subAlias = savedAlias
                                          pushSql(("(" + (subSql + ")")))
                                          pushW(("(" + (subW + ")")))
                                          if subAliasText != "":
                                              pushSql(subAliasText)
                                              pushW(subAliasText)
                                      else:
                                          renderNodes(lt.get(lt.get(item, "chain"), "values"), 1)
                                  else:
                                      emitParam(item)
                          elif nameNorm == "having":
                              flushOrder()
                              pushSql("HAVING")
                              pushW("HAVING")
                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                          elif nameNorm == "returning":
                              if dialect == "mysql":
                                  raise Exception(lt.to_string("sql-builder parse: RETURNING is not supported by mysql"))
                              else:
                                  flushOrder()
                                  pushSql("RETURNING")
                                  pushW("RETURNING")
                                  firstItem = True
                                  for item in itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")):
                                      if firstItem == False:
                                          sql = (sql + [","])
                                          wsql = (wsql + [","])
                                      firstItem = False
                                      if lt.truthy(lt.has(item, "chain")):
                                          tmpRef = isRef(lt.get(lt.get(item, "chain"), "values"))
                                          if tmpRef != "":
                                              emitIdent(tmpRef)
                                          elif ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(item, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(item, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(item, "chain"), "values")) == "delete")))):
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
                                              hasOrder = False
                                              subAlias = ""
                                              renderNodes(lt.get(lt.get(item, "chain"), "values"), 0)
                                              subSql = lt.buf_str(sql).strip()
                                              subW = lt.buf_str(wsql).strip()
                                              subAliasText = subAlias
                                              sql = savedSql
                                              wsql = savedW
                                              orderSql = savedOrderSql
                                              orderW = savedOrderW
                                              hasOrder = savedHasOrder
                                              subAlias = savedAlias
                                              pushSql(("(" + (subSql + ")")))
                                              pushW(("(" + (subW + ")")))
                                              if subAliasText != "":
                                                  pushSql(subAliasText)
                                                  pushW(subAliasText)
                                          else:
                                              renderNodes(lt.get(lt.get(item, "chain"), "values"), 1)
                                      else:
                                          emitParam(item)
                          elif nameNorm == "orderby":
                              hasOrder = True
                              orderSql = ""
                              orderW = ""
                              emitOrderList(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          elif nameNorm == "limit":
                              flushOrder()
                              pushSql("LIMIT")
                              pushW("LIMIT")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          elif nameNorm == "offset":
                              flushOrder()
                              pushSql("OFFSET")
                              pushW("OFFSET")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          elif nameNorm == "raw":
                              emitRaw(node)
                          elif nameNorm == "as":
                              subAlias = ("AS " + identStr(asString(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))))
                          elif nameNorm == "update":
                              pushSql("UPDATE")
                              pushW("UPDATE")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              pushSql("SET")
                              pushW("SET")
                              assnFirst = True
                              for ak in list(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value").keys()):
                                  if assnFirst == False:
                                      sql = (sql + [","])
                                      wsql = (wsql + [","])
                                  assnFirst = False
                                  pushSql(identStr(ak))
                                  pushW(identStr(ak))
                                  pushSql("=")
                                  pushW("=")
                                  if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain")):
                                      tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"))
                                      if tmpRef != "":
                                          emitIdent(tmpRef)
                                      elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete")))):
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
                                          hasOrder = False
                                          subAlias = ""
                                          renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                                          subSql = lt.buf_str(sql).strip()
                                          subW = lt.buf_str(wsql).strip()
                                          subAliasText = subAlias
                                          sql = savedSql
                                          wsql = savedW
                                          orderSql = savedOrderSql
                                          orderW = savedOrderW
                                          hasOrder = savedHasOrder
                                          subAlias = savedAlias
                                          pushSql(("(" + (subSql + ")")))
                                          pushW(("(" + (subW + ")")))
                                          if subAliasText != "":
                                              pushSql(subAliasText)
                                              pushW(subAliasText)
                                      else:
                                          emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                          elif nameNorm == "insert":
                              pushSql("INSERT")
                              pushW("INSERT")
                              pushSql("INTO")
                              pushW("INTO")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              pushSql("(")
                              pushW("(")
                              colFirst = True
                              for ck in list(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value").keys()):
                                  if colFirst == False:
                                      sql = (sql + [","])
                                      wsql = (wsql + [","])
                                  colFirst = False
                                  pushSql(identStr(ck))
                                  pushW(identStr(ck))
                              pushSql(")")
                              pushW(")")
                              pushSql("VALUES")
                              pushW("VALUES")
                              pushSql("(")
                              pushW("(")
                              valFirst = True
                              for vk in list(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value").keys()):
                                  if valFirst == False:
                                      sql = (sql + [","])
                                      wsql = (wsql + [","])
                                  valFirst = False
                                  if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain")):
                                      tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values"))
                                      if tmpRef != "":
                                          emitIdent(tmpRef)
                                      elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values")) == "delete")))):
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
                                          hasOrder = False
                                          subAlias = ""
                                          renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk), "chain"), "values"), 0)
                                          subSql = lt.buf_str(sql).strip()
                                          subW = lt.buf_str(wsql).strip()
                                          subAliasText = subAlias
                                          sql = savedSql
                                          wsql = savedW
                                          orderSql = savedOrderSql
                                          orderW = savedOrderW
                                          hasOrder = savedHasOrder
                                          subAlias = savedAlias
                                          pushSql(("(" + (subSql + ")")))
                                          pushW(("(" + (subW + ")")))
                                          if subAliasText != "":
                                              pushSql(subAliasText)
                                              pushW(subAliasText)
                                      else:
                                          emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk))
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), vk))
                              pushSql(")")
                              pushW(")")
                          elif nameNorm == "delete":
                              pushSql("DELETE")
                              pushW("DELETE")
                              pushSql("FROM")
                              pushW("FROM")
                              if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                                  tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                                  if tmpRef != "":
                                      emitIdent(tmpRef)
                                  elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                      hasOrder = False
                                      subAlias = ""
                                      renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                      subSql = lt.buf_str(sql).strip()
                                      subW = lt.buf_str(wsql).strip()
                                      subAliasText = subAlias
                                      sql = savedSql
                                      wsql = savedW
                                      orderSql = savedOrderSql
                                      orderW = savedOrderW
                                      hasOrder = savedHasOrder
                                      subAlias = savedAlias
                                      pushSql(("(" + (subSql + ")")))
                                      pushW(("(" + (subW + ")")))
                                      if subAliasText != "":
                                          pushSql(subAliasText)
                                          pushW(subAliasText)
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          elif nameNorm == "set":
                              pushSql("SET")
                              pushW("SET")
                              assnFirst = True
                              for ak in list(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value").keys()):
                                  if assnFirst == False:
                                      sql = (sql + [","])
                                      wsql = (wsql + [","])
                                  assnFirst = False
                                  pushSql(identStr(ak))
                                  pushW(identStr(ak))
                                  pushSql("=")
                                  pushW("=")
                                  if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain")):
                                      tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values"))
                                      if tmpRef != "":
                                          emitIdent(tmpRef)
                                      elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete")))):
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
                                          hasOrder = False
                                          subAlias = ""
                                          renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                                          subSql = lt.buf_str(sql).strip()
                                          subW = lt.buf_str(wsql).strip()
                                          subAliasText = subAlias
                                          sql = savedSql
                                          wsql = savedW
                                          orderSql = savedOrderSql
                                          orderW = savedOrderW
                                          hasOrder = savedHasOrder
                                          subAlias = savedAlias
                                          pushSql(("(" + (subSql + ")")))
                                          pushW(("(" + (subW + ")")))
                                          if subAliasText != "":
                                              pushSql(subAliasText)
                                              pushW(subAliasText)
                                      else:
                                          emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak))
                                  else:
                                      emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "object"), "value"), ak))
                          elif nameNorm == "values":
                              pushSql("VALUES")
                              pushW("VALUES")
                              valueRows = itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                              valueFirst = True
                              if (len(valueRows) != 0) and lt.truthy(lt.has(lt.get(valueRows, 0), "array")):
                                  for tuple in valueRows:
                                      if valueFirst == False:
                                          sql = (sql + [","])
                                          wsql = (wsql + [","])
                                      valueFirst = False
                                      if dialect == "mysql":
                                          pushSql("ROW")
                                          pushW("ROW")
                                      pushSql("(")
                                      pushW("(")
                                      itemFirst = True
                                      for ti in itemsOf(tuple):
                                          if itemFirst == False:
                                              sql = (sql + [","])
                                              wsql = (wsql + [","])
                                          itemFirst = False
                                          if lt.truthy(lt.has(ti, "chain")):
                                              tmpRef = isRef(lt.get(lt.get(ti, "chain"), "values"))
                                              if tmpRef != "":
                                                  emitIdent(tmpRef)
                                              elif ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(ti, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(ti, "chain"), "values")) == "delete")))):
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
                                                  hasOrder = False
                                                  subAlias = ""
                                                  renderNodes(lt.get(lt.get(ti, "chain"), "values"), 0)
                                                  subSql = lt.buf_str(sql).strip()
                                                  subW = lt.buf_str(wsql).strip()
                                                  subAliasText = subAlias
                                                  sql = savedSql
                                                  wsql = savedW
                                                  orderSql = savedOrderSql
                                                  orderW = savedOrderW
                                                  hasOrder = savedHasOrder
                                                  subAlias = savedAlias
                                                  pushSql(("(" + (subSql + ")")))
                                                  pushW(("(" + (subW + ")")))
                                                  if subAliasText != "":
                                                      pushSql(subAliasText)
                                                      pushW(subAliasText)
                                              else:
                                                  emitParam(ti)
                                          else:
                                              emitParam(ti)
                                      pushSql(")")
                                      pushW(")")
                              else:
                                  if dialect == "mysql":
                                      pushSql("ROW")
                                      pushW("ROW")
                                  pushSql("(")
                                  pushW("(")
                                  itemFirst = True
                                  for ti in valueRows:
                                      if itemFirst == False:
                                          sql = (sql + [","])
                                          wsql = (wsql + [","])
                                      itemFirst = False
                                      if lt.truthy(lt.has(ti, "chain")):
                                          tmpRef = isRef(lt.get(lt.get(ti, "chain"), "values"))
                                          if tmpRef != "":
                                              emitIdent(tmpRef)
                                          elif ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(ti, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(ti, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(ti, "chain"), "values")) == "delete")))):
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
                                              hasOrder = False
                                              subAlias = ""
                                              renderNodes(lt.get(lt.get(ti, "chain"), "values"), 0)
                                              subSql = lt.buf_str(sql).strip()
                                              subW = lt.buf_str(wsql).strip()
                                              subAliasText = subAlias
                                              sql = savedSql
                                              wsql = savedW
                                              orderSql = savedOrderSql
                                              orderW = savedOrderW
                                              hasOrder = savedHasOrder
                                              subAlias = savedAlias
                                              pushSql(("(" + (subSql + ")")))
                                              pushW(("(" + (subW + ")")))
                                              if subAliasText != "":
                                                  pushSql(subAliasText)
                                                  pushW(subAliasText)
                                          else:
                                              emitParam(ti)
                                      else:
                                          emitParam(ti)
                                  pushSql(")")
                                  pushW(")")
                          elif nameNorm == "onconflictdonothing":
                              if dialect == "mysql":
                                  raise Exception(lt.to_string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql"))
                              else:
                                  pushSql("ON")
                                  pushW("ON")
                                  pushSql("CONFLICT")
                                  pushW("CONFLICT")
                                  pushSql(conflictTarget(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                                  pushW(conflictTarget(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                                  pushSql("DO")
                                  pushW("DO")
                                  pushSql("NOTHING")
                                  pushW("NOTHING")
                          elif nameNorm == "onconflictdoupdate":
                              if dialect == "mysql":
                                  pushSql("ON")
                                  pushW("ON")
                                  pushSql("DUPLICATE")
                                  pushW("DUPLICATE")
                                  pushSql("KEY")
                                  pushW("KEY")
                                  pushSql("UPDATE")
                                  pushW("UPDATE")
                                  assnFirst = True
                                  for ak in list(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value").keys()):
                                      if assnFirst == False:
                                          sql = (sql + [","])
                                          wsql = (wsql + [","])
                                      assnFirst = False
                                      pushSql(identStr(ak))
                                      pushW(identStr(ak))
                                      pushSql("=")
                                      pushW("=")
                                      if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain")):
                                          tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"))
                                          if tmpRef != "":
                                              emitIdent(tmpRef)
                                          elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete")))):
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
                                              hasOrder = False
                                              subAlias = ""
                                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                                              subSql = lt.buf_str(sql).strip()
                                              subW = lt.buf_str(wsql).strip()
                                              subAliasText = subAlias
                                              sql = savedSql
                                              wsql = savedW
                                              orderSql = savedOrderSql
                                              orderW = savedOrderW
                                              hasOrder = savedHasOrder
                                              subAlias = savedAlias
                                              pushSql(("(" + (subSql + ")")))
                                              pushW(("(" + (subW + ")")))
                                              if subAliasText != "":
                                                  pushSql(subAliasText)
                                                  pushW(subAliasText)
                                          else:
                                              emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                                      else:
                                          emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                              else:
                                  pushSql("ON")
                                  pushW("ON")
                                  pushSql("CONFLICT")
                                  pushW("CONFLICT")
                                  pushSql(conflictTarget(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                                  pushW(conflictTarget(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                                  pushSql("DO")
                                  pushW("DO")
                                  pushSql("UPDATE")
                                  pushW("UPDATE")
                                  pushSql("SET")
                                  pushW("SET")
                                  assnFirst = True
                                  for ak in list(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value").keys()):
                                      if assnFirst == False:
                                          sql = (sql + [","])
                                          wsql = (wsql + [","])
                                      assnFirst = False
                                      pushSql(identStr(ak))
                                      pushW(identStr(ak))
                                      pushSql("=")
                                      pushW("=")
                                      if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain")):
                                          tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"))
                                          if tmpRef != "":
                                              emitIdent(tmpRef)
                                          elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values")) == "delete")))):
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
                                              hasOrder = False
                                              subAlias = ""
                                              renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak), "chain"), "values"), 0)
                                              subSql = lt.buf_str(sql).strip()
                                              subW = lt.buf_str(wsql).strip()
                                              subAliasText = subAlias
                                              sql = savedSql
                                              wsql = savedW
                                              orderSql = savedOrderSql
                                              orderW = savedOrderW
                                              hasOrder = savedHasOrder
                                              subAlias = savedAlias
                                              pushSql(("(" + (subSql + ")")))
                                              pushW(("(" + (subW + ")")))
                                              if subAliasText != "":
                                                  pushSql(subAliasText)
                                                  pushW(subAliasText)
                                          else:
                                              emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                                      else:
                                          emitParam(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "object"), "value"), ak))
                          else:
                              raise Exception(lt.to_string(("sql-builder parse: unsupported clause " + name)))
              flushOrder()
              return None
          else:
              first = True
              left = ""
              hasLeft = False
              base = ""
              for node in nodes:
                  pn = normName(lt.get(lt.get(node, "functionCall"), "name"))
                  op = opOf(pn)
                  if lt.truthy(lt.has(node, "functionCall")):
                      if (pn == "col") or (pn == "table"):
                          left = identStr(asString(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                          hasLeft = True
                      elif lt.truthy(op):
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          if lt.truthy(hasLeft):
                              base = left
                          else:
                              base = "?"
                          pushSql(base)
                          pushW(base)
                          pushSql(op)
                          pushW(op)
                          if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                              tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                              if tmpRef != "":
                                  emitIdent(tmpRef)
                              elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                  hasOrder = False
                                  subAlias = ""
                                  renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                  subSql = lt.buf_str(sql).strip()
                                  subW = lt.buf_str(wsql).strip()
                                  subAliasText = subAlias
                                  sql = savedSql
                                  wsql = savedW
                                  orderSql = savedOrderSql
                                  orderW = savedOrderW
                                  hasOrder = savedHasOrder
                                  subAlias = savedAlias
                                  pushSql(("(" + (subSql + ")")))
                                  pushW(("(" + (subW + ")")))
                                  if subAliasText != "":
                                      pushSql(subAliasText)
                                      pushW(subAliasText)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          else:
                              emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          hasLeft = False
                      elif pn == "exists":
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          pushSql("EXISTS")
                          pushW("EXISTS")
                          if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                              tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                              if tmpRef != "":
                                  emitIdent(tmpRef)
                              elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                  hasOrder = False
                                  subAlias = ""
                                  renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                  subSql = lt.buf_str(sql).strip()
                                  subW = lt.buf_str(wsql).strip()
                                  subAliasText = subAlias
                                  sql = savedSql
                                  wsql = savedW
                                  orderSql = savedOrderSql
                                  orderW = savedOrderW
                                  hasOrder = savedHasOrder
                                  subAlias = savedAlias
                                  pushSql(("(" + (subSql + ")")))
                                  pushW(("(" + (subW + ")")))
                                  if subAliasText != "":
                                      pushSql(subAliasText)
                                      pushW(subAliasText)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          else:
                              emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          hasLeft = False
                      elif pn == "in":
                          if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                              if ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
                                  if first == False:
                                      pushSql("AND")
                                      pushW("AND")
                                  first = False
                                  if lt.truthy(hasLeft):
                                      base = left
                                  else:
                                      base = "?"
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
                                  hasOrder = False
                                  subAlias = ""
                                  renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                  subSql = lt.buf_str(sql).strip()
                                  subW = lt.buf_str(wsql).strip()
                                  subAliasText = subAlias
                                  sql = savedSql
                                  wsql = savedW
                                  orderSql = savedOrderSql
                                  orderW = savedOrderW
                                  hasOrder = savedHasOrder
                                  subAlias = savedAlias
                                  pushSql(("(" + (subSql + ")")))
                                  pushW(("(" + (subW + ")")))
                                  if subAliasText != "":
                                      pushSql(subAliasText)
                                      pushW(subAliasText)
                              else:
                                  if first == False:
                                      pushSql("AND")
                                      pushW("AND")
                                  first = False
                                  if lt.truthy(hasLeft):
                                      base = left
                                  else:
                                      base = "?"
                                  pushSql(base)
                                  pushW(base)
                                  pushSql("IN (")
                                  pushW("IN (")
                                  inFirst = True
                                  for iv in itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")):
                                      if inFirst == False:
                                          sql = (sql + [","])
                                          wsql = (wsql + [","])
                                      inFirst = False
                                      if lt.truthy(lt.has(iv, "chain")):
                                          tmpRef = isRef(lt.get(lt.get(iv, "chain"), "values"))
                                          if tmpRef != "":
                                              emitIdent(tmpRef)
                                          elif ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(iv, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(iv, "chain"), "values")) == "delete")))):
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
                                              hasOrder = False
                                              subAlias = ""
                                              renderNodes(lt.get(lt.get(iv, "chain"), "values"), 0)
                                              subSql = lt.buf_str(sql).strip()
                                              subW = lt.buf_str(wsql).strip()
                                              subAliasText = subAlias
                                              sql = savedSql
                                              wsql = savedW
                                              orderSql = savedOrderSql
                                              orderW = savedOrderW
                                              hasOrder = savedHasOrder
                                              subAlias = savedAlias
                                              pushSql(("(" + (subSql + ")")))
                                              pushW(("(" + (subW + ")")))
                                              if subAliasText != "":
                                                  pushSql(subAliasText)
                                                  pushW(subAliasText)
                                          else:
                                              emitParam(iv)
                                      else:
                                          emitParam(iv)
                                  pushSql(")")
                                  pushW(")")
                          else:
                              if first == False:
                                  pushSql("AND")
                                  pushW("AND")
                              first = False
                              if lt.truthy(hasLeft):
                                  base = left
                              else:
                                  base = "?"
                              pushSql(base)
                              pushW(base)
                              pushSql("IN (")
                              pushW("IN (")
                              inFirst = True
                              for iv in itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")):
                                  if inFirst == False:
                                      sql = (sql + [","])
                                      wsql = (wsql + [","])
                                  inFirst = False
                                  if lt.truthy(lt.has(iv, "chain")):
                                      tmpRef = isRef(lt.get(lt.get(iv, "chain"), "values"))
                                      if tmpRef != "":
                                          emitIdent(tmpRef)
                                      elif ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(iv, "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(iv, "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(iv, "chain"), "values")) == "delete")))):
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
                                          hasOrder = False
                                          subAlias = ""
                                          renderNodes(lt.get(lt.get(iv, "chain"), "values"), 0)
                                          subSql = lt.buf_str(sql).strip()
                                          subW = lt.buf_str(wsql).strip()
                                          subAliasText = subAlias
                                          sql = savedSql
                                          wsql = savedW
                                          orderSql = savedOrderSql
                                          orderW = savedOrderW
                                          hasOrder = savedHasOrder
                                          subAlias = savedAlias
                                          pushSql(("(" + (subSql + ")")))
                                          pushW(("(" + (subW + ")")))
                                          if subAliasText != "":
                                              pushSql(subAliasText)
                                              pushW(subAliasText)
                                      else:
                                          emitParam(iv)
                                  else:
                                      emitParam(iv)
                              pushSql(")")
                              pushW(")")
                          hasLeft = False
                      elif pn == "between":
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          if lt.truthy(hasLeft):
                              base = left
                          else:
                              base = "?"
                          pushSql(base)
                          pushW(base)
                          pushSql("BETWEEN")
                          pushW("BETWEEN")
                          if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain")):
                              tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"))
                              if tmpRef != "":
                                  emitIdent(tmpRef)
                              elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values")) == "delete")))):
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
                                  hasOrder = False
                                  subAlias = ""
                                  renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 0)
                                  subSql = lt.buf_str(sql).strip()
                                  subW = lt.buf_str(wsql).strip()
                                  subAliasText = subAlias
                                  sql = savedSql
                                  wsql = savedW
                                  orderSql = savedOrderSql
                                  orderW = savedOrderW
                                  hasOrder = savedHasOrder
                                  subAlias = savedAlias
                                  pushSql(("(" + (subSql + ")")))
                                  pushW(("(" + (subW + ")")))
                                  if subAliasText != "":
                                      pushSql(subAliasText)
                                      pushW(subAliasText)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          else:
                              emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"))
                          pushSql("AND")
                          pushW("AND")
                          if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain")):
                              tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"))
                              if tmpRef != "":
                                  emitIdent(tmpRef)
                              elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "delete")))):
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
                                  hasOrder = False
                                  subAlias = ""
                                  renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 0)
                                  subSql = lt.buf_str(sql).strip()
                                  subW = lt.buf_str(wsql).strip()
                                  subAliasText = subAlias
                                  sql = savedSql
                                  wsql = savedW
                                  orderSql = savedOrderSql
                                  orderW = savedOrderW
                                  hasOrder = savedHasOrder
                                  subAlias = savedAlias
                                  pushSql(("(" + (subSql + ")")))
                                  pushW(("(" + (subW + ")")))
                                  if subAliasText != "":
                                      pushSql(subAliasText)
                                      pushW(subAliasText)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"))
                          else:
                              emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"))
                          hasLeft = False
                      elif pn == "isnull":
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          if lt.truthy(hasLeft):
                              base = left
                          else:
                              base = "?"
                          pushSql(base)
                          pushW(base)
                          pushSql("IS NULL")
                          pushW("IS NULL")
                          hasLeft = False
                      elif pn == "isnotnull":
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          if lt.truthy(hasLeft):
                              base = left
                          else:
                              base = "?"
                          pushSql(base)
                          pushW(base)
                          pushSql("IS NOT NULL")
                          pushW("IS NOT NULL")
                          hasLeft = False
                      elif pn == "not":
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          pushSql("NOT (")
                          pushW("NOT (")
                          renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument"), "chain"), "values"), 1)
                          pushSql(")")
                          pushW(")")
                          hasLeft = False
                      elif (pn == "and") or (pn == "or"):
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          pushSql("(")
                          pushW("(")
                          boolFirst = True
                          for bv in itemsOf(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")):
                              if boolFirst == False:
                                  tmp = pn.upper()
                                  pushSql(tmp)
                                  pushW(tmp)
                              boolFirst = False
                              if lt.truthy(lt.has(bv, "chain")):
                                  renderNodes(lt.get(lt.get(bv, "chain"), "values"), 1)
                              else:
                                  emitParam(bv)
                          pushSql(")")
                          pushW(")")
                          hasLeft = False
                      elif pn == "as":
                          if lt.truthy(hasLeft):
                              base = left
                          else:
                              base = "?"
                          pushSql(base)
                          pushW(base)
                          pushSql("AS")
                          pushW("AS")
                          emitIdent(asString(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                          hasLeft = False
                      elif pn == "op":
                          if first == False:
                              pushSql("AND")
                              pushW("AND")
                          first = False
                          if lt.truthy(hasLeft):
                              base = left
                          else:
                              base = "?"
                          pushSql(base)
                          pushW(base)
                          pushSql(asString(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                          pushW(asString(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 0), "argument")))
                          if lt.truthy(lt.has(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain")):
                              tmpRef = isRef(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"))
                              if tmpRef != "":
                                  emitIdent(tmpRef)
                              elif ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "select") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "with")) or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "values") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "insert") or ((firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "update") or (firstKind(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values")) == "delete")))):
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
                                  hasOrder = False
                                  subAlias = ""
                                  renderNodes(lt.get(lt.get(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"), "chain"), "values"), 0)
                                  subSql = lt.buf_str(sql).strip()
                                  subW = lt.buf_str(wsql).strip()
                                  subAliasText = subAlias
                                  sql = savedSql
                                  wsql = savedW
                                  orderSql = savedOrderSql
                                  orderW = savedOrderW
                                  hasOrder = savedHasOrder
                                  subAlias = savedAlias
                                  pushSql(("(" + (subSql + ")")))
                                  pushW(("(" + (subW + ")")))
                                  if subAliasText != "":
                                      pushSql(subAliasText)
                                      pushW(subAliasText)
                              else:
                                  emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"))
                          else:
                              emitParam(lt.get(lt.get(lt.get(lt.get(node, "functionCall"), "arguments"), 1), "argument"))
                          hasLeft = False
                      elif pn == "raw":
                          emitRaw(node)
                      else:
                          raise Exception(lt.to_string("sql-builder parse: unsupported predicate"))
              return None
        renderNodes(lt.get(lt.get(lt.get(lt.get(root, "schema"), "chain"), "chain"), "values"), 0)
        sql = lt.buf_str(sql)
        wsql = lt.buf_str(wsql)
        params = params
        _param = lambda p: (lt.get(p, "string") or lt.get(p, "number") or lt.get(p, "boolean") or {"value": None})["value"]
        return {"sql": sql.strip(), "sqlWithParam": wsql.strip(), "param": [_param(p) for p in params]}

# Auto-generated init functions
def sqlBuilder(variableName=None, *copies):
    structure = SqlBuilder()
    structure.init_from_init_function(
        {
            "name": "sql-builder",
            "variableName": variableName or structure.get_schema()["schema"]["chain"]["chain"]["initFunction"]["variableName"],
        },
        copies,
    )
    return structure
