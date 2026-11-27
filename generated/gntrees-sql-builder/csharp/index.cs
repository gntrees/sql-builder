// Auto-generated index for gntrees-sql-builder

using System;

using System.Collections.Generic;

// parse() returns an LtObject: { "sql": string, "sqlWithParam": string, "param": List<object> }

// Auto-generated C# method-chain types.
//
// C# is statically typed, but LT values are `object` (a schema is a nested
// `LtObject` / `List<object>`). The one shared abstraction is `IStructure`: every
// generated builder implements it so the generic runtime (`McCopy`/`MakeCopy`)
// can call `GetSchema()`.

public interface IStructure
{
    LtObject GetSchema();
}


public static class Mc
{
// Auto-generated C# method-chain runtime (Lingua Tungga Gelombang 2).
//
// This is the static counterpart of `core/base/python/base-utils.py`. Schemas are
// ordered `LtObject` / `List<object>` graphs; the generator inlines this fragment
// inside the `Mc` class in the generated `index.cs`.
//
// `NormalizeArgumentStructureCall` and `McCopy` are *not* defined here: like the
// TypeScript/Python/Java/Go runtimes they are emitted by the generator because
// they reference the project's structure types.

public static string Typeof(object value)
{
    if (value == null) return "object";
    if (value is bool) return "boolean";
    if (LT.IsNumber(value)) return "number";
    if (value is string) return "string";
    if (value is List<object> || value is LtObject) return "object";
    return value.GetType().Name;
}

public static void ValidateSchema(object schema)
{
    const string message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction";
    if (!LT.IsMap(schema)) throw new Exception(message);
    object inner = LT.Get(schema, "schema");
    if (!LT.IsMap(inner)) throw new Exception(message);
    object chain = LT.Get(inner, "chain");
    if (!LT.IsMap(chain)) throw new Exception(message);
    object chainChain = LT.Get(chain, "chain");
    if (!LT.IsMap(chainChain)) throw new Exception(message);
    if (!(LT.Get(chainChain, "values") is List<object>) || !LT.Truthy(LT.Get(chainChain, "initFunction")))
    {
        throw new Exception(message);
    }
}

public static object UnwrapArgumentValue(object value)
{
    if (!LT.IsMap(value)) throw new Exception("Unknown argument value type");
    if (LT.Has(value, "string")) return LT.Get(LT.Get(value, "string"), "value");
    if (LT.Has(value, "number")) return LT.Get(LT.Get(value, "number"), "value");
    if (LT.Has(value, "boolean")) return LT.Get(LT.Get(value, "boolean"), "value");
    if (LT.Has(value, "null")) return LT.Get(LT.Get(value, "null"), "value");
    if (LT.Has(value, "array"))
    {
        List<object> result = new List<object>();
        foreach (object item in LT.Items(LT.Get(LT.Get(value, "array"), "value")))
        {
            result.Add(UnwrapArgumentValue(item));
        }
        return result;
    }
    if (LT.Has(value, "object"))
    {
        LtObject result = new LtObject();
        foreach (KeyValuePair<string, object> entry in LT.AsMap(LT.Get(LT.Get(value, "object"), "value")))
        {
            result.Set(entry.Key, UnwrapArgumentValue(entry.Value));
        }
        return result;
    }
    if (LT.Has(value, "chain")) throw new Exception("Cannot validate a chain default value at runtime");
    throw new Exception("Unknown argument value type");
}

public static void ValidateDefault(object defaultVal, object structType)
{
    NormalizeArgument(UnwrapArgumentValue(defaultVal), structType);
}

public static object NormalizeArgument(object arg, object structType)
{
    if (!LT.IsMap(structType)) throw new Exception("Unsupported struct type in NormalizeArgument");
    LtObject st = LT.AsMap(structType);

    if (st.Has("array"))
    {
        if (!(arg is List<object> list)) throw new Exception("Expected an array argument, but got " + Typeof(arg));
        if (list.Count == 0) return LT.Map("array", LT.Map("value", LT.Array()));
        object itemType = LT.Get(st.Get("array"), "type");
        List<object> normalizedItems = new List<object>();
        foreach (object item in list) normalizedItems.Add(NormalizeArgument(item, itemType));
        if (normalizedItems[0] == null) throw new Exception("Unexpected undefined value in array");
        return LT.Map("array", LT.Map("value", normalizedItems));
    }

    if (st.Has("object"))
    {
        if (!LT.IsMap(arg)) throw new Exception("Expected an object argument, but got " + Typeof(arg));
        object declared = st.Get("object");
        LtObject argMap = LT.AsMap(arg);
        List<string> missingKeys = new List<string>();
        foreach (object key in LT.Keys(declared))
        {
            if (!LT.Has(argMap, key)) missingKeys.Add(LT.ToStr(key));
        }
        if (missingKeys.Count > 0)
        {
            throw new Exception("Missing required key(s) \"" + string.Join("\", \"", missingKeys) + "\" in object argument");
        }
        LtObject normalizedObject = new LtObject();
        foreach (KeyValuePair<string, object> entry in argMap)
        {
            if (!LT.Has(declared, entry.Key)) throw new Exception("Unexpected key \"" + entry.Key + "\" in object argument");
            normalizedObject.Set(entry.Key, NormalizeArgument(entry.Value, LT.Get(declared, entry.Key)));
        }
        return LT.Map("object", LT.Map("value", normalizedObject));
    }

    if (st.Has("string"))
    {
        if (!(arg is string)) throw new Exception("Expected a string argument, but got " + Typeof(arg));
        return LT.Map("string", LT.Map("value", arg));
    }

    if (st.Has("number"))
    {
        if (arg is bool || !LT.IsNumber(arg)) throw new Exception("Expected a number argument, but got " + Typeof(arg));
        double number = LT.ToFloat(arg);
        if (double.IsInfinity(number) || double.IsNaN(number)) throw new Exception("Expected a finite number argument, but got " + LT.ToStr(number));
        return LT.Map("number", LT.Map("value", number));
    }

    if (st.Has("boolean"))
    {
        if (!(arg is bool)) throw new Exception("Expected a boolean argument, but got " + Typeof(arg));
        return LT.Map("boolean", LT.Map("value", arg));
    }

    if (st.Has("null"))
    {
        if (arg != null) throw new Exception("Expected a null argument, but got " + Typeof(arg));
        return LT.Map("null", LT.Map("value", null));
    }

    if (st.Has("union"))
    {
        List<string> reasons = new List<string>();
        List<object> normalizedUnionTypes = new List<object>();
        foreach (object unionType in LT.Items(LT.Get(st.Get("union"), "types")))
        {
            try
            {
                normalizedUnionTypes.Add(NormalizeArgument(arg, unionType));
            }
            catch (Exception error)
            {
                reasons.Add(error.Message);
            }
        }
        if (normalizedUnionTypes.Count == 0 || normalizedUnionTypes[0] == null)
        {
            throw new Exception("Argument does not match any type in the union: " + string.Join(" | ", reasons));
        }
        if (normalizedUnionTypes.Count > 1)
        {
            if (arg is List<object> empty && empty.Count == 0) return normalizedUnionTypes[0];
            throw new Exception("Argument matches multiple types in the union, which is ambiguous");
        }
        return normalizedUnionTypes[0];
    }

    if (st.Has("map"))
    {
        if (!LT.IsMap(arg)) throw new Exception("Expected an object argument for map type, but got " + Typeof(arg));
        LtObject argMap = LT.AsMap(arg);
        LtObject normalizedMap = new LtObject();
        object valueType = LT.Get(st.Get("map"), "type");
        foreach (KeyValuePair<string, object> entry in argMap)
        {
            normalizedMap.Set(entry.Key, NormalizeArgument(entry.Value, valueType));
        }
        return LT.Map("object", LT.Map("value", normalizedMap));
    }

    if (st.Has("structureCall"))
    {
        return NormalizeArgumentStructureCall(arg);
    }

    if (st.Has("literal"))
    {
        object expected = LT.Get(st.Get("literal"), "value");
        object literalType = LT.Get(st.Get("literal"), "type");
        if (Equals(literalType, "string"))
        {
            if (!(arg is string text)) throw new Exception("Expected a string literal argument, but got " + Typeof(arg));
            if (text != LT.ToStr(expected)) throw new Exception("Expected string literal " + LT.Json(expected) + ", but got " + LT.Json(arg));
            return LT.Map("string", LT.Map("value", arg));
        }
        if (Equals(literalType, "number"))
        {
            if (arg is bool || !LT.IsNumber(arg)) throw new Exception("Expected a number literal argument, but got " + Typeof(arg));
            if (LT.ToFloat(arg) != LT.ToFloat(expected)) throw new Exception("Expected number literal " + LT.ToStr(expected) + ", but got " + LT.ToStr(arg));
            return LT.Map("number", LT.Map("value", arg));
        }
        if (!(arg is bool boolean)) throw new Exception("Expected a boolean literal argument, but got " + Typeof(arg));
        if (boolean != LT.Truthy(expected)) throw new Exception("Expected boolean literal " + LT.ToStr(expected) + ", but got " + LT.ToStr(arg));
        return LT.Map("boolean", LT.Map("value", arg));
    }

    throw new Exception("Unsupported struct type in NormalizeArgument");
}

public static LtObject CreateSchema(LtObject oldSchema, string functionName, List<object> functionArgs, bool isTemplateLiteral)
{
    ValidateSchema(oldSchema);
    LtObject old = LT.AsMap(LT.Get(oldSchema, "schema"));
    LtObject oldChain = LT.AsMap(LT.Get(LT.Get(old, "chain"), "chain"));

    LtObject inner = new LtObject();
    foreach (KeyValuePair<string, object> entry in old) inner.Set(entry.Key, entry.Value);
    List<object> values = new List<object>(LT.Items(LT.Get(oldChain, "values")));
    LtObject chainChain = LT.Map(
        "values", values,
        "initFunction", LT.Get(oldChain, "initFunction")
    );
    inner.Set("chain", LT.Map("chain", chainChain));

    List<object> args = new List<object>();
    if (isTemplateLiteral && functionArgs.Count > 0 && functionArgs[0] != null)
    {
        object stringsValue = LT.Get(functionArgs[0], "arg");
        if (!(stringsValue is List<object> list)) throw new Exception("Expected a template strings array for " + functionName);
        foreach (object text in list)
        {
            if (!(text is string)) throw new Exception("Expected a template strings array for " + functionName);
        }
        List<object> expressions = functionArgs.GetRange(1, functionArgs.Count - 1);
        if (expressions.Count != list.Count - 1)
        {
            throw new Exception("Template literal for " + functionName + " expects " + (list.Count - 1) + " expression(s), but got " + expressions.Count);
        }
        for (int index = 0; index < list.Count; index++)
        {
            if (LT.ToStr(list[index]) != "")
            {
                args.Add(LT.Map("argument", LT.Map("string", LT.Map("value", list[index])), "default", null));
            }
            if (index < expressions.Count)
            {
                object expression = expressions[index];
                if (expression == null) throw new Exception("Missing expression for template literal at index " + index);
                args.Add(LT.Map("argument", NormalizeArgument(LT.Get(expression, "arg"), LT.Get(expression, "struct")), "default", null));
            }
        }
    }
    else
    {
        for (int index = 0; index < functionArgs.Count; index++)
        {
            object functionArg = functionArgs[index];
            object arg = LT.Get(functionArg, "arg");
            if (arg == LT.Missing)
            {
                if (LT.Truthy(LT.Get(functionArg, "provided")))
                {
                    throw new Exception("Parameter \"" + functionName + "\" argument #" + (index + 1) + " cannot be undefined");
                }
                object defaultVal = LT.Get(functionArg, "default");
                if (defaultVal != null)
                {
                    ValidateDefault(defaultVal, LT.Get(functionArg, "struct"));
                    args.Add(LT.Map("argument", defaultVal, "default", defaultVal));
                    continue;
                }
                throw new Exception("Parameter \"" + functionName + "\" argument #" + (index + 1) + " was not provided");
            }
            object argument = NormalizeArgument(arg, LT.Get(functionArg, "struct"));
            object defaultValue = LT.Get(functionArg, "default");
            if (defaultValue != null) ValidateDefault(defaultValue, LT.Get(functionArg, "struct"));
            args.Add(LT.Map("argument", argument, "default", defaultValue));
        }
    }

    values.Add(LT.Map("functionCall", LT.Map(
        "name", functionName,
        "arguments", args,
        "isTemplateLiteral", isTemplateLiteral
    )));
    return LT.Map("schema", inner);
}

public static LtObject CreatePropertyCallSchema(LtObject oldSchema, string propertyName)
{
    LtObject old = LT.AsMap(LT.Get(oldSchema, "schema"));
    LtObject oldChain = LT.AsMap(LT.Get(LT.Get(old, "chain"), "chain"));
    List<object> values = new List<object>(LT.Items(LT.Get(oldChain, "values")));
    values.Add(LT.Map("propertyCall", LT.Map("name", propertyName)));

    LtObject inner = new LtObject();
    foreach (KeyValuePair<string, object> entry in old) inner.Set(entry.Key, entry.Value);
    inner.Set("chain", LT.Map("chain", LT.Map(
        "values", values,
        "initFunction", LT.Get(oldChain, "initFunction")
    )));
    return LT.Map("schema", inner);
}

public static object MakeCopy(string structureName, IStructure source)
{
    LtObject schema = source.GetSchema();
    ValidateSchema(schema);
    return LT.Map("copy", LT.Map(
        "structureName", structureName,
        "chain", LT.Get(LT.Get(schema, "schema"), "chain")
    ));
}

public static void ApplyCopies(LtObject schema, object copies, string targetStructureName)
{
    List<object> list = LT.AsList(copies);
    if (list.Count == 0) return;
    foreach (object cp in list)
    {
        if (!LT.IsMap(cp)) throw new Exception("Invalid builder argument in init function: wrap the structure with copy(...)");
        LtObject inner = LT.Get(cp, "copy") as LtObject;
        if (inner == null) throw new Exception("Invalid builder argument in init function: wrap the structure with copy(...)");
        if (!(LT.Get(inner, "structureName") is string name)) throw new Exception("Invalid builder argument in init function: wrap the structure with copy(...)");
        if (!(LT.Get(inner, "chain") is LtObject)) throw new Exception("Invalid builder argument in init function: wrap the structure with copy(...)");
        if (name != targetStructureName)
        {
            throw new Exception("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'");
        }
        object value = LT.Map("copy", LT.Map("structureName", name, "chain", LT.Get(inner, "chain")));
        LtObject chainChain = LT.AsMap(LT.Get(LT.Get(LT.Get(schema, "schema"), "chain"), "chain"));
        List<object> values = LT.Items(LT.Get(chainChain, "values"));
        values.Add(value);
        chainChain.Set("values", values);
    }
}


    public static object NormalizeArgumentStructureCall(object arg)
    {
        if (arg is IStructure s) return LT.Get(LT.Get(s.GetSchema(), "schema"), "chain");
        string got;
        if (arg == null) got = "null";
        else if (arg is List<object>) got = "array";
        else if (LT.IsMap(arg)) throw new Exception("Unknown structure call argument type");
        else got = Typeof(arg);
        throw new Exception("Expected a structure instance for structure calls, but got " + got);
    }

    public static object McCopy(object source)
    {
        if (source is SqlBuilder s) return MakeCopy("sql-builder", s);
        throw new Exception("copy() expects a structure instance created by an init function");
    }
}

public class SqlBuilder : IStructure
{
    private LtObject schema;

    public SqlBuilder()
    {
        schema = LT.Map("schema", LT.Map("exportName", "schema", "importPaths", LT.Map("typescript", "../../../gntrees-sql-builder/typescript/index"), "chain", LT.Map("chain", LT.Map("values", LT.Array(), "initFunction", LT.Map("name", "sql-builder", "variableName", "s1")))));
    }

    public LtObject GetSchema()
    {
        return schema;
    }

    public SqlBuilder InitFromStructure(LtObject schema)
    {
        Mc.ValidateSchema(schema);
        this.schema = schema;
        return this;
    }

    public SqlBuilder InitFromInitFunction(LtObject initFunction, params object[] copies)
    {
        if (!(LT.Get(initFunction, "name") is string) || !(LT.Get(initFunction, "variableName") is string))
        {
            throw new Exception("Invalid init function");
        }
        LT.AsMap(LT.Get(LT.Get(LT.Get(schema, "schema"), "chain"), "chain")).Set("initFunction", initFunction);
        Mc.ApplyCopies(schema, copies, "sql-builder");
        return this;
    }

    public SqlBuilder Select(params object[] __a)
    {
        object columns = __a.Length > 0 ? __a[0] : LT.Missing;
        if (columns == LT.Missing) throw new Exception("Parameter \"select\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "select", new List<object>
        {
            LT.Map("arg", columns, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))))), LT.Map("map", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", columns != LT.Missing),
        }, false));
    }

    public SqlBuilder From(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"from\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "from", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
        }, false));
    }

    public SqlBuilder Transaction(params object[] __a)
    {
        object transaction = __a.Length > 0 ? __a[0] : LT.Missing;
        if (transaction == LT.Missing) throw new Exception("Parameter \"transaction\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "transaction", new List<object>
        {
            LT.Map("arg", transaction, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", transaction != LT.Missing),
        }, false));
    }

    public SqlBuilder OrderBy(params object[] __a)
    {
        object columns = __a.Length > 0 ? __a[0] : LT.Missing;
        if (columns == LT.Missing) throw new Exception("Parameter \"orderBy\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "orderBy", new List<object>
        {
            LT.Map("arg", columns, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", columns != LT.Missing),
        }, false));
    }

    public SqlBuilder Limit(params object[] __a)
    {
        object count = __a.Length > 0 ? __a[0] : LT.Missing;
        if (count == LT.Missing) throw new Exception("Parameter \"limit\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "limit", new List<object>
        {
            LT.Map("arg", count, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", count != LT.Missing),
        }, false));
    }

    public SqlBuilder Offset(params object[] __a)
    {
        object count = __a.Length > 0 ? __a[0] : LT.Missing;
        if (count == LT.Missing) throw new Exception("Parameter \"offset\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "offset", new List<object>
        {
            LT.Map("arg", count, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", count != LT.Missing),
        }, false));
    }

    public SqlBuilder With(params object[] __a)
    {
        object statement = __a.Length > 0 ? __a[0] : LT.Missing;
        object @as = __a.Length > 1 ? __a[1] : LT.Missing;
        if (statement == LT.Missing) throw new Exception("Parameter \"with\" argument #1 was not provided");
        if (@as == LT.Missing) throw new Exception("Parameter \"with\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "with", new List<object>
        {
            LT.Map("arg", statement, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", statement != LT.Missing),
            LT.Map("arg", @as, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", @as != LT.Missing),
        }, false));
    }

    public SqlBuilder GroupBy(params object[] __a)
    {
        object columns = __a.Length > 0 ? __a[0] : LT.Missing;
        if (columns == LT.Missing) throw new Exception("Parameter \"groupBy\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "groupBy", new List<object>
        {
            LT.Map("arg", columns, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", columns != LT.Missing),
        }, false));
    }

    public SqlBuilder Having(params object[] __a)
    {
        object statement = __a.Length > 0 ? __a[0] : LT.Missing;
        if (statement == LT.Missing) throw new Exception("Parameter \"having\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "having", new List<object>
        {
            LT.Map("arg", statement, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", statement != LT.Missing),
        }, false));
    }

    public SqlBuilder Where(params object[] __a)
    {
        object statement = __a.Length > 0 ? __a[0] : LT.Missing;
        if (statement == LT.Missing) throw new Exception("Parameter \"where\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "where", new List<object>
        {
            LT.Map("arg", statement, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", statement != LT.Missing),
        }, false));
    }

    public SqlBuilder Update(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object set = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"update\" argument #1 was not provided");
        if (set == LT.Missing) throw new Exception("Parameter \"update\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "update", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", set, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("map", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", set != LT.Missing),
        }, false));
    }

    public SqlBuilder Set(params object[] __a)
    {
        object statement = __a.Length > 0 ? __a[0] : LT.Missing;
        if (statement == LT.Missing) throw new Exception("Parameter \"set\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "set", new List<object>
        {
            LT.Map("arg", statement, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("map", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", statement != LT.Missing),
        }, false));
    }

    public SqlBuilder Insert(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object set = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"insert\" argument #1 was not provided");
        if (set == LT.Missing) throw new Exception("Parameter \"insert\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "insert", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", set, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("map", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", set != LT.Missing),
        }, false));
    }

    public SqlBuilder Values(params object[] __a)
    {
        object values = __a.Length > 0 ? __a[0] : LT.Missing;
        if (values == LT.Missing) throw new Exception("Parameter \"values\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "values", new List<object>
        {
            LT.Map("arg", values, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))))), LT.Map("array", LT.Map("type", LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))))), "provided", values != LT.Missing),
        }, false));
    }

    public SqlBuilder Returning(params object[] __a)
    {
        object columns = __a.Length > 0 ? __a[0] : LT.Missing;
        if (columns == LT.Missing) throw new Exception("Parameter \"returning\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "returning", new List<object>
        {
            LT.Map("arg", columns, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))))), LT.Map("map", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", columns != LT.Missing),
        }, false));
    }

    public SqlBuilder OnConflictDoNothing(params object[] __a)
    {
        object target = __a.Length > 0 ? __a[0] : LT.Missing;
        if (target == LT.Missing) throw new Exception("Parameter \"onConflictDoNothing\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "onConflictDoNothing", new List<object>
        {
            LT.Map("arg", target, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", target != LT.Missing),
        }, false));
    }

    public SqlBuilder OnConflictDoUpdate(params object[] __a)
    {
        object target = __a.Length > 0 ? __a[0] : LT.Missing;
        object set = __a.Length > 1 ? __a[1] : LT.Missing;
        if (target == LT.Missing) throw new Exception("Parameter \"onConflictDoUpdate\" argument #1 was not provided");
        if (set == LT.Missing) throw new Exception("Parameter \"onConflictDoUpdate\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "onConflictDoUpdate", new List<object>
        {
            LT.Map("arg", target, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", target != LT.Missing),
            LT.Map("arg", set, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("map", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", set != LT.Missing),
        }, false));
    }

    public SqlBuilder Delete(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"delete\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "delete", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
        }, false));
    }

    public SqlBuilder Join(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object on = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"join\" argument #1 was not provided");
        if (on == LT.Missing) throw new Exception("Parameter \"join\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "join", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", on, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", on != LT.Missing),
        }, false));
    }

    public SqlBuilder LeftJoin(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object on = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"leftJoin\" argument #1 was not provided");
        if (on == LT.Missing) throw new Exception("Parameter \"leftJoin\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "leftJoin", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", on, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", on != LT.Missing),
        }, false));
    }

    public SqlBuilder RightJoin(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object on = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"rightJoin\" argument #1 was not provided");
        if (on == LT.Missing) throw new Exception("Parameter \"rightJoin\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "rightJoin", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", on, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", on != LT.Missing),
        }, false));
    }

    public SqlBuilder InnerJoin(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object on = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"innerJoin\" argument #1 was not provided");
        if (on == LT.Missing) throw new Exception("Parameter \"innerJoin\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "innerJoin", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", on, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", on != LT.Missing),
        }, false));
    }

    public SqlBuilder FullJoin(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object on = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"fullJoin\" argument #1 was not provided");
        if (on == LT.Missing) throw new Exception("Parameter \"fullJoin\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "fullJoin", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", on, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", on != LT.Missing),
        }, false));
    }

    public SqlBuilder CrossJoin(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        object on = __a.Length > 1 ? __a[1] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"crossJoin\" argument #1 was not provided");
        if (on == LT.Missing) throw new Exception("Parameter \"crossJoin\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "crossJoin", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
            LT.Map("arg", on, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", on != LT.Missing),
        }, false));
    }

    public SqlBuilder Eq(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"eq\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "eq", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Gt(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"gt\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "gt", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Gte(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"gte\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "gte", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Lt(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"lt\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "lt", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Lte(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"lte\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "lte", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Exists(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"exists\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "exists", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder IsNull(params object[] __a)
    {
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "isNull", new List<object>
        {
        }, false));
    }

    public SqlBuilder IsNotNull(params object[] __a)
    {
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "isNotNull", new List<object>
        {
        }, false));
    }

    public SqlBuilder In(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"in\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "in", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Between(params object[] __a)
    {
        object first = __a.Length > 0 ? __a[0] : LT.Missing;
        object second = __a.Length > 1 ? __a[1] : LT.Missing;
        if (first == LT.Missing) throw new Exception("Parameter \"between\" argument #1 was not provided");
        if (second == LT.Missing) throw new Exception("Parameter \"between\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "between", new List<object>
        {
            LT.Map("arg", first, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", first != LT.Missing),
            LT.Map("arg", second, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", second != LT.Missing),
        }, false));
    }

    public SqlBuilder Like(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"like\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "like", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Ilike(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"ilike\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "ilike", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Not(params object[] __a)
    {
        object value = __a.Length > 0 ? __a[0] : LT.Missing;
        if (value == LT.Missing) throw new Exception("Parameter \"not\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "not", new List<object>
        {
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder And(params object[] __a)
    {
        object values = __a.Length > 0 ? __a[0] : LT.Missing;
        if (values == LT.Missing) throw new Exception("Parameter \"and\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "and", new List<object>
        {
            LT.Map("arg", values, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", values != LT.Missing),
        }, false));
    }

    public SqlBuilder Or(params object[] __a)
    {
        object values = __a.Length > 0 ? __a[0] : LT.Missing;
        if (values == LT.Missing) throw new Exception("Parameter \"or\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "or", new List<object>
        {
            LT.Map("arg", values, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), LT.Map("array", LT.Map("type", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))))))), "provided", values != LT.Missing),
        }, false));
    }

    public SqlBuilder Op(params object[] __a)
    {
        object operation = __a.Length > 0 ? __a[0] : LT.Missing;
        object value = __a.Length > 1 ? __a[1] : LT.Missing;
        if (operation == LT.Missing) throw new Exception("Parameter \"op\" argument #1 was not provided");
        if (value == LT.Missing) throw new Exception("Parameter \"op\" argument #2 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "op", new List<object>
        {
            LT.Map("arg", operation, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", operation != LT.Missing),
            LT.Map("arg", value, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", value != LT.Missing),
        }, false));
    }

    public SqlBuilder Raw(params object[] __a)
    {
        List<object> __fargs = new List<object>();
        if (__a.Length > 0) __fargs.Add(LT.Map("arg", __a[0], "struct", LT.Map("string", LT.Map("type", "string"))));
        for (int __i = 1; __i < __a.Length; __i++) __fargs.Add(LT.Map("arg", __a[__i], "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder")))))));
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "raw", __fargs, true));
    }

    public SqlBuilder Asc(params object[] __a)
    {
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "asc", new List<object>
        {
        }, false));
    }

    public SqlBuilder Desc(params object[] __a)
    {
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "desc", new List<object>
        {
        }, false));
    }

    public SqlBuilder As(params object[] __a)
    {
        object alias = __a.Length > 0 ? __a[0] : LT.Missing;
        if (alias == LT.Missing) throw new Exception("Parameter \"as\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "as", new List<object>
        {
            LT.Map("arg", alias, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", alias != LT.Missing),
        }, false));
    }

    public SqlBuilder Col(params object[] __a)
    {
        object column = __a.Length > 0 ? __a[0] : LT.Missing;
        if (column == LT.Missing) throw new Exception("Parameter \"col\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "col", new List<object>
        {
            LT.Map("arg", column, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", column != LT.Missing),
        }, false));
    }

    public SqlBuilder Table(params object[] __a)
    {
        object table = __a.Length > 0 ? __a[0] : LT.Missing;
        if (table == LT.Missing) throw new Exception("Parameter \"table\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "table", new List<object>
        {
            LT.Map("arg", table, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("string", LT.Map("type", "string")), LT.Map("number", LT.Map("type", "number")), LT.Map("boolean", LT.Map("type", "boolean")), LT.Map("structureCall", LT.Map("name", "sql-builder"))))), "provided", table != LT.Missing),
        }, false));
    }

    public SqlBuilder SetDialect(params object[] __a)
    {
        object db = __a.Length > 0 ? __a[0] : LT.Missing;
        if (db == LT.Missing) throw new Exception("Parameter \"setDialect\" argument #1 was not provided");
        return new SqlBuilder().InitFromStructure(Mc.CreateSchema(GetSchema(), "setDialect", new List<object>
        {
            LT.Map("arg", db, "struct", LT.Map("union", LT.Map("types", LT.Array(LT.Map("literal", LT.Map("value", "postgres", "type", "string")), LT.Map("literal", LT.Map("value", "mysql", "type", "string")), LT.Map("literal", LT.Map("value", "sqlite", "type", "string")), LT.Map("literal", LT.Map("value", "single-store", "type", "string")), LT.Map("literal", LT.Map("value", "mssql", "type", "string")), LT.Map("literal", LT.Map("value", "cockroach", "type", "string"))))), "provided", db != LT.Missing),
        }, false));
    }

    public object Parse()
    {
        object root = this.GetSchema();
        Dictionary<string, Func<object[], object>> __fns = new Dictionary<string, Func<object[], object>>();
        object dialect = LT.Str("");
        object quote = LT.Str("");
        object sql = LT.BufNew();
        object wsql = LT.BufNew();
        object @params = LT.ListNew();
        object orderSql = LT.Str("");
        object orderW = LT.Str("");
        object hasOrder = LT.Bool(false);
        object tmp = LT.Str("");
        object tmp2 = LT.Str("");
        object tmpRef = LT.Str("");
        object subAlias = LT.Str("");
        object withFirst = LT.Bool(true);
        __fns["normName"] = (object[] __a) => {
          object n = __a[0];
          return LT.ToLower(LT.Replace(n, LT.Str("-"), LT.Str("")));
        };
        __fns["pushSql"] = (object[] __a) => {
          object text = __a[0];
          sql = LT.BufAppend(sql, LT.Str(" "));
          sql = LT.BufAppend(sql, text);
          return LT.Null();
        };
        __fns["pushW"] = (object[] __a) => {
          object text = __a[0];
          wsql = LT.BufAppend(wsql, LT.Str(" "));
          wsql = LT.BufAppend(wsql, text);
          return LT.Null();
        };
        __fns["asString"] = (object[] __a) => {
          object arg = __a[0];
          return LT.Get(LT.Get(arg, LT.Str("string")), LT.Str("value"));
        };
        __fns["identStr"] = (object[] __a) => {
          object name = __a[0];
          object escapedName = LT.Replace(name, quote, LT.StrConcat(quote, quote));
          object qualifiedName = LT.Replace(escapedName, LT.Str("."), LT.StrConcat(quote, LT.StrConcat(LT.Str("."), quote)));
          return LT.StrConcat(quote, LT.StrConcat(qualifiedName, quote));
        };
        __fns["literalOf"] = (object[] __a) => {
          object arg = __a[0];
          object outLiteral = LT.Str("");
          if (LT.Truthy(LT.Has(arg, LT.Str("string")))) {
            outLiteral = LT.StrConcat(LT.Str("'"), LT.StrConcat(LT.Replace(LT.Call(__fns, "asString", arg), LT.Str("'"), LT.Str("''")), LT.Str("'")));
          }
          else if (LT.Truthy(LT.Has(arg, LT.Str("number")))) {
            outLiteral = LT.ToStr(LT.Get(LT.Get(arg, LT.Str("number")), LT.Str("value")));
          }
          else if (LT.Truthy(LT.Has(arg, LT.Str("boolean")))) {
            if (LT.Truthy(LT.Get(LT.Get(arg, LT.Str("boolean")), LT.Str("value")))) {
              outLiteral = LT.Str("TRUE");
            }
            else {
              outLiteral = LT.Str("FALSE");
            }
          }
          else {
            outLiteral = LT.Str("NULL");
          }
          return outLiteral;
        };
        __fns["opOf"] = (object[] __a) => {
          object n = __a[0];
          object o = LT.Str("");
          if (LT.ValueEquals(n, LT.Str("eq"))) {
            o = LT.Str("=");
          }
          else if (LT.ValueEquals(n, LT.Str("gt"))) {
            o = LT.Str(">");
          }
          else if (LT.ValueEquals(n, LT.Str("gte"))) {
            o = LT.Str(">=");
          }
          else if (LT.ValueEquals(n, LT.Str("lt"))) {
            o = LT.Str("<");
          }
          else if (LT.ValueEquals(n, LT.Str("lte"))) {
            o = LT.Str("<=");
          }
          else if (LT.ValueEquals(n, LT.Str("like"))) {
            o = LT.Str("LIKE");
          }
          else if (LT.ValueEquals(n, LT.Str("ilike"))) {
            if (LT.ValueEquals(dialect, LT.Str("postgres"))) {
              o = LT.Str("ILIKE");
            }
            else {
              o = LT.Str("LIKE");
            }
          }
          return o;
        };
        __fns["itemsOf"] = (object[] __a) => {
          object arg = __a[0];
          if (LT.Truthy(LT.Has(arg, LT.Str("array")))) {
            return LT.Get(LT.Get(arg, LT.Str("array")), LT.Str("value"));
          }
          return LT.Append(LT.Array(), arg);
        };
        __fns["isRef"] = (object[] __a) => {
          object chainValues = __a[0];
          tmpRef = LT.Str("");
          if (LT.And(LT.ValueEquals(LT.Len(chainValues), LT.Num(1)), LT.Truthy(LT.Has(LT.Index(chainValues, LT.Num(0)), LT.Str("functionCall"))))) {
            object firstName = LT.Get(LT.Get(LT.Index(chainValues, LT.Num(0)), "functionCall"), "name");
            if (LT.Or(LT.ValueEquals(firstName, LT.Str("col")), LT.ValueEquals(firstName, LT.Str("table")))) {
              tmpRef = LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(LT.Index(chainValues, LT.Num(0)), "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
            }
          }
          return tmpRef;
        };
        __fns["emitParam"] = (object[] __a) => {
          object arg = __a[0];
          @params = LT.ListPush(@params, arg);
          if (LT.ValueEquals(dialect, LT.Str("postgres"))) {
            tmp = LT.StrConcat(LT.Str("$"), LT.ToStr(LT.ListLen(@params)));
          }
          else {
            tmp = LT.Str("?");
          }
          LT.Call(__fns, "pushSql", tmp);
          tmp2 = LT.Call(__fns, "literalOf", arg);
          LT.Call(__fns, "pushW", tmp2);
          return LT.Null();
        };
        __fns["emitIdent"] = (object[] __a) => {
          object name = __a[0];
          tmp = LT.Call(__fns, "identStr", name);
          LT.Call(__fns, "pushSql", tmp);
          LT.Call(__fns, "pushW", tmp);
          return LT.Null();
        };
        __fns["emitRaw"] = (object[] __a) => {
          object node = __a[0];
          if (LT.ValueNotEquals(LT.BufLen(sql), LT.Num(0))) {
            sql = LT.BufAppend(sql, LT.Str(" "));
            wsql = LT.BufAppend(wsql, LT.Str(" "));
          }
          foreach (object rawArg in LT.Items(LT.Get(LT.Get(node, "functionCall"), "arguments"))) {
            object rawVal = LT.Get(rawArg, LT.Str("argument"));
            if (LT.Truthy(LT.Has(rawVal, LT.Str("string")))) {
              sql = LT.BufAppend(sql, LT.Call(__fns, "asString", rawVal));
              wsql = LT.BufAppend(wsql, LT.Call(__fns, "asString", rawVal));
            }
            else if (LT.Truthy(LT.Has(rawVal, LT.Str("chain")))) {
              tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(rawVal, "chain"), "values"));
              if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                sql = LT.BufAppend(sql, LT.Call(__fns, "identStr", tmpRef));
                wsql = LT.BufAppend(wsql, LT.Call(__fns, "identStr", tmpRef));
              }
              else {
                @params = LT.ListPush(@params, rawVal);
                if (LT.ValueEquals(dialect, LT.Str("postgres"))) {
                  tmp = LT.StrConcat(LT.Str("$"), LT.ToStr(LT.ListLen(@params)));
                }
                else {
                  tmp = LT.Str("?");
                }
                sql = LT.BufAppend(sql, tmp);
                tmp2 = LT.Call(__fns, "literalOf", rawVal);
                wsql = LT.BufAppend(wsql, tmp2);
              }
            }
            else {
              @params = LT.ListPush(@params, rawVal);
              if (LT.ValueEquals(dialect, LT.Str("postgres"))) {
                tmp = LT.StrConcat(LT.Str("$"), LT.ToStr(LT.ListLen(@params)));
              }
              else {
                tmp = LT.Str("?");
              }
              sql = LT.BufAppend(sql, tmp);
              tmp2 = LT.Call(__fns, "literalOf", rawVal);
              wsql = LT.BufAppend(wsql, tmp2);
            }
          }
          return LT.Null();
        };
        __fns["conflictTarget"] = (object[] __a) => {
          object arg = __a[0];
          object ct = LT.Str("()");
          if (LT.Truthy(LT.Has(arg, LT.Str("chain")))) {
            tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(arg, "chain"), "values"));
            if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
              ct = LT.StrConcat(LT.Str("("), LT.StrConcat(LT.Call(__fns, "identStr", tmpRef), LT.Str(")")));
            }
          }
          else if (LT.Truthy(LT.Has(arg, LT.Str("string")))) {
            ct = LT.StrConcat(LT.Str("("), LT.StrConcat(LT.Call(__fns, "identStr", LT.Call(__fns, "asString", arg)), LT.Str(")")));
          }
          return ct;
        };
        __fns["firstKind"] = (object[] __a) => {
          object chainValues = __a[0];
          object kind = LT.Str("");
          if (LT.And(LT.ValueNotEquals(LT.Len(chainValues), LT.Num(0)), LT.Truthy(LT.Has(LT.Index(chainValues, LT.Num(0)), LT.Str("functionCall"))))) {
            kind = LT.Call(__fns, "normName", LT.Get(LT.Get(LT.Index(chainValues, LT.Num(0)), "functionCall"), "name"));
          }
          return kind;
        };
        __fns["emitOrderItem"] = (object[] __a) => {
          object item = __a[0];
          object dir = LT.Str("");
          object ordName = LT.Str("");
          if (LT.Truthy(LT.Has(item, LT.Str("chain")))) {
            foreach (object on in LT.Items(LT.Get(LT.Get(item, "chain"), "values"))) {
              object onn = LT.Call(__fns, "normName", LT.Get(LT.Get(on, "functionCall"), "name"));
              if (LT.ValueEquals(onn, LT.Str("asc"))) {
                dir = LT.Str(" ASC");
              }
              else if (LT.ValueEquals(onn, LT.Str("desc"))) {
                dir = LT.Str(" DESC");
              }
              else if (LT.Or(LT.ValueEquals(onn, LT.Str("col")), LT.ValueEquals(onn, LT.Str("table")))) {
                ordName = LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(on, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
              }
            }
          }
          if (LT.ValueNotEquals(ordName, LT.Str(""))) {
            tmp = LT.Call(__fns, "identStr", ordName);
            orderSql = LT.StrConcat(orderSql, LT.StrConcat(tmp, dir));
            orderW = LT.StrConcat(orderW, LT.StrConcat(tmp, dir));
          }
          return LT.Null();
        };
        __fns["emitOrderList"] = (object[] __a) => {
          object arg = __a[0];
          object firstOrder = LT.Bool(true);
          foreach (object item in LT.Items(LT.Call(__fns, "itemsOf", arg))) {
            if (LT.ValueEquals(firstOrder, LT.Bool(false))) {
              orderSql = LT.StrConcat(orderSql, LT.Str(", "));
              orderW = LT.StrConcat(orderW, LT.Str(", "));
            }
            firstOrder = LT.Bool(false);
            LT.Call(__fns, "emitOrderItem", item);
          }
          return LT.Null();
        };
        __fns["flushOrder"] = (object[] __a) => {
          if (LT.Truthy(hasOrder)) {
            LT.Call(__fns, "pushSql", LT.Str("ORDER"));
            LT.Call(__fns, "pushSql", LT.Str("BY"));
            LT.Call(__fns, "pushW", LT.Str("ORDER"));
            LT.Call(__fns, "pushW", LT.Str("BY"));
            tmp = orderSql;
            if (LT.ValueNotEquals(tmp, LT.Str(""))) {
              LT.Call(__fns, "pushSql", tmp);
            }
            tmp2 = orderW;
            if (LT.ValueNotEquals(tmp2, LT.Str(""))) {
              LT.Call(__fns, "pushW", tmp2);
            }
            hasOrder = LT.Bool(false);
          }
          return LT.Null();
        };
        foreach (object dialectNode in LT.Items(LT.Get(LT.Get(LT.Get(LT.Get(root, "schema"), "chain"), "chain"), "values"))) {
          if (LT.ValueEquals(LT.Call(__fns, "normName", LT.Get(LT.Get(dialectNode, "functionCall"), "name")), LT.Str("setdialect"))) {
            dialect = LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(dialectNode, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("string")), LT.Str("value"));
          }
        }
        if (LT.ValueEquals(dialect, LT.Str(""))) {
          throw new Exception(LT.ToStr(LT.Str("sql-builder parse: setDialect(...) must be called before parse()")));
        }
        else if (LT.And(LT.ValueNotEquals(dialect, LT.Str("postgres")), LT.ValueNotEquals(dialect, LT.Str("mysql")))) {
          throw new Exception(LT.ToStr(LT.StrConcat(LT.Str("sql-builder parse: unsupported dialect "), dialect)));
        }
        if (LT.ValueEquals(dialect, LT.Str("mysql"))) {
          quote = LT.Str("`");
        }
        else {
          quote = LT.Str("\"");
        }
        __fns["renderNodes"] = (object[] __a) => {
          object nodes = __a[0];
          object mode = __a[1];
          object savedSql = LT.Str("");
          object savedW = LT.Str("");
          object savedOrderSql = LT.Str("");
          object savedOrderW = LT.Str("");
          object savedHasOrder = LT.Bool(false);
          object savedAlias = LT.Str("");
          object subSql = LT.Str("");
          object subW = LT.Str("");
          object subAliasText = LT.Str("");
          object first = LT.Bool(true);
          object left = LT.Str("");
          object hasLeft = LT.Bool(false);
          object @base = LT.Str("");
          if (LT.ValueEquals(mode, LT.Num(0))) {
            foreach (object node in LT.Items(nodes)) {
              if (LT.Truthy(LT.Has(node, LT.Str("functionCall")))) {
                object name = LT.Get(LT.Get(node, "functionCall"), "name");
                object nameNorm = LT.Call(__fns, "normName", name);
                if (LT.ValueEquals(nameNorm, LT.Str("setdialect"))) {
                  continue;
                }
                else if (LT.Or(LT.ValueEquals(nameNorm, LT.Str("asc")), LT.ValueEquals(nameNorm, LT.Str("desc")))) {
                  if (LT.Truthy(hasOrder)) {
                    tmp = LT.ToUpper(nameNorm);
                    orderSql = LT.StrConcat(orderSql, LT.StrConcat(LT.Str(" "), tmp));
                    orderW = LT.StrConcat(orderW, LT.StrConcat(LT.Str(" "), tmp));
                  }
                }
                else {
                  if (LT.ValueEquals(nameNorm, LT.Str("with"))) {
                    savedSql = sql;
                    savedW = wsql;
                    savedOrderSql = orderSql;
                    savedOrderW = orderW;
                    savedHasOrder = hasOrder;
                    sql = LT.BufNew();
                    wsql = LT.BufNew();
                    orderSql = LT.Str("");
                    orderW = LT.Str("");
                    hasOrder = LT.Bool(false);
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                    subSql = LT.Trim(LT.BufStr(sql));
                    subW = LT.Trim(LT.BufStr(wsql));
                    sql = savedSql;
                    wsql = savedW;
                    orderSql = savedOrderSql;
                    orderW = savedOrderW;
                    hasOrder = savedHasOrder;
                    if (LT.ValueEquals(withFirst, LT.Bool(false))) {
                      sql = LT.BufAppend(sql, LT.Str(","));
                      wsql = LT.BufAppend(wsql, LT.Str(","));
                    }
                    else {
                      withFirst = LT.Bool(false);
                      LT.Call(__fns, "pushSql", LT.Str("WITH"));
                      LT.Call(__fns, "pushW", LT.Str("WITH"));
                    }
                    LT.Call(__fns, "pushSql", LT.Call(__fns, "identStr", LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")))));
                    LT.Call(__fns, "pushW", LT.Call(__fns, "identStr", LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")))));
                    LT.Call(__fns, "pushSql", LT.Str("AS"));
                    LT.Call(__fns, "pushW", LT.Str("AS"));
                    LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                    LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("transaction"))) {
                    LT.Call(__fns, "pushSql", LT.Str("BEGIN"));
                    LT.Call(__fns, "pushW", LT.Str("BEGIN"));
                    sql = LT.BufAppend(sql, LT.Str(";"));
                    wsql = LT.BufAppend(wsql, LT.Str(";"));
                    object txnFirst = LT.Bool(true);
                    foreach (object txnItem in LT.Items(LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))))) {
                      if (LT.ValueEquals(txnFirst, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(";"));
                        wsql = LT.BufAppend(wsql, LT.Str(";"));
                      }
                      txnFirst = LT.Bool(false);
                      if (LT.Truthy(LT.Has(txnItem, LT.Str("chain")))) {
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(txnItem, "chain"), "values"), LT.Num(0));
                      }
                      else if (LT.Truthy(LT.Has(txnItem, LT.Str("string")))) {
                        LT.Call(__fns, "pushSql", LT.Call(__fns, "asString", txnItem));
                        LT.Call(__fns, "pushW", LT.Call(__fns, "asString", txnItem));
                      }
                      else {
                        if (LT.Truthy(LT.Has(txnItem, LT.Str("chain")))) {
                          tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(txnItem, "chain"), "values"));
                          if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                            LT.Call(__fns, "emitIdent", tmpRef);
                          }
                          else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(txnItem, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(txnItem, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(txnItem, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(txnItem, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(txnItem, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(txnItem, "chain"), "values")), LT.Str("delete"))))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = LT.BufNew();
                            wsql = LT.BufNew();
                            orderSql = LT.Str("");
                            orderW = LT.Str("");
                            hasOrder = LT.Bool(false);
                            subAlias = LT.Str("");
                            LT.Call(__fns, "renderNodes", LT.Get(LT.Get(txnItem, "chain"), "values"), LT.Num(0));
                            subSql = LT.Trim(LT.BufStr(sql));
                            subW = LT.Trim(LT.BufStr(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                            LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                            if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                              LT.Call(__fns, "pushSql", subAliasText);
                              LT.Call(__fns, "pushW", subAliasText);
                            }
                          }
                          else {
                            LT.Call(__fns, "emitParam", txnItem);
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", txnItem);
                        }
                      }
                    }
                    if (LT.ValueEquals(txnFirst, LT.Bool(false))) {
                      sql = LT.BufAppend(sql, LT.Str(";"));
                      wsql = LT.BufAppend(wsql, LT.Str(";"));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("COMMIT"));
                    LT.Call(__fns, "pushW", LT.Str("COMMIT"));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("select"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("SELECT"));
                    LT.Call(__fns, "pushW", LT.Str("SELECT"));
                    object firstItem = LT.Bool(true);
                    foreach (object item in LT.Items(LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))))) {
                      if (LT.ValueEquals(firstItem, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(","));
                        wsql = LT.BufAppend(wsql, LT.Str(","));
                      }
                      firstItem = LT.Bool(false);
                      if (LT.Truthy(LT.Has(item, LT.Str("chain")))) {
                        tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(item, "chain"), "values"));
                        if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                          LT.Call(__fns, "emitIdent", tmpRef);
                        }
                        else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("delete"))))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = LT.BufNew();
                          wsql = LT.BufNew();
                          orderSql = LT.Str("");
                          orderW = LT.Str("");
                          hasOrder = LT.Bool(false);
                          subAlias = LT.Str("");
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(item, "chain"), "values"), LT.Num(0));
                          subSql = LT.Trim(LT.BufStr(sql));
                          subW = LT.Trim(LT.BufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                          LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                          if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                            LT.Call(__fns, "pushSql", subAliasText);
                            LT.Call(__fns, "pushW", subAliasText);
                          }
                        }
                        else {
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(item, "chain"), "values"), LT.Num(1));
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", item);
                      }
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("from"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("FROM"));
                    LT.Call(__fns, "pushW", LT.Str("FROM"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("join"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("JOIN"));
                    LT.Call(__fns, "pushW", LT.Str("JOIN"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("ON"));
                    LT.Call(__fns, "pushW", LT.Str("ON"));
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("leftjoin"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("LEFT JOIN"));
                    LT.Call(__fns, "pushW", LT.Str("LEFT JOIN"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("ON"));
                    LT.Call(__fns, "pushW", LT.Str("ON"));
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("rightjoin"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("RIGHT JOIN"));
                    LT.Call(__fns, "pushW", LT.Str("RIGHT JOIN"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("ON"));
                    LT.Call(__fns, "pushW", LT.Str("ON"));
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("innerjoin"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("INNER JOIN"));
                    LT.Call(__fns, "pushW", LT.Str("INNER JOIN"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("ON"));
                    LT.Call(__fns, "pushW", LT.Str("ON"));
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("fulljoin"))) {
                    if (LT.ValueEquals(dialect, LT.Str("mysql"))) {
                      throw new Exception(LT.ToStr(LT.Str("sql-builder parse: FULL JOIN is not supported by mysql")));
                    }
                    else {
                      LT.Call(__fns, "flushOrder");
                      LT.Call(__fns, "pushSql", LT.Str("FULL JOIN"));
                      LT.Call(__fns, "pushW", LT.Str("FULL JOIN"));
                      if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                        tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                        if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                          LT.Call(__fns, "emitIdent", tmpRef);
                        }
                        else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = LT.BufNew();
                          wsql = LT.BufNew();
                          orderSql = LT.Str("");
                          orderW = LT.Str("");
                          hasOrder = LT.Bool(false);
                          subAlias = LT.Str("");
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                          subSql = LT.Trim(LT.BufStr(sql));
                          subW = LT.Trim(LT.BufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                          LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                          if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                            LT.Call(__fns, "pushSql", subAliasText);
                            LT.Call(__fns, "pushW", subAliasText);
                          }
                        }
                        else {
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                      }
                      LT.Call(__fns, "pushSql", LT.Str("ON"));
                      LT.Call(__fns, "pushW", LT.Str("ON"));
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("crossjoin"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("CROSS JOIN"));
                    LT.Call(__fns, "pushW", LT.Str("CROSS JOIN"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("ON"));
                    LT.Call(__fns, "pushW", LT.Str("ON"));
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("where"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("WHERE"));
                    LT.Call(__fns, "pushW", LT.Str("WHERE"));
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("groupby"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("GROUP BY"));
                    LT.Call(__fns, "pushW", LT.Str("GROUP BY"));
                    object firstItem = LT.Bool(true);
                    foreach (object item in LT.Items(LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))))) {
                      if (LT.ValueEquals(firstItem, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(","));
                        wsql = LT.BufAppend(wsql, LT.Str(","));
                      }
                      firstItem = LT.Bool(false);
                      if (LT.Truthy(LT.Has(item, LT.Str("chain")))) {
                        tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(item, "chain"), "values"));
                        if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                          LT.Call(__fns, "emitIdent", tmpRef);
                        }
                        else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("delete"))))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = LT.BufNew();
                          wsql = LT.BufNew();
                          orderSql = LT.Str("");
                          orderW = LT.Str("");
                          hasOrder = LT.Bool(false);
                          subAlias = LT.Str("");
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(item, "chain"), "values"), LT.Num(0));
                          subSql = LT.Trim(LT.BufStr(sql));
                          subW = LT.Trim(LT.BufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                          LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                          if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                            LT.Call(__fns, "pushSql", subAliasText);
                            LT.Call(__fns, "pushW", subAliasText);
                          }
                        }
                        else {
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(item, "chain"), "values"), LT.Num(1));
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", item);
                      }
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("having"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("HAVING"));
                    LT.Call(__fns, "pushW", LT.Str("HAVING"));
                    LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("returning"))) {
                    if (LT.ValueEquals(dialect, LT.Str("mysql"))) {
                      throw new Exception(LT.ToStr(LT.Str("sql-builder parse: RETURNING is not supported by mysql")));
                    }
                    else {
                      LT.Call(__fns, "flushOrder");
                      LT.Call(__fns, "pushSql", LT.Str("RETURNING"));
                      LT.Call(__fns, "pushW", LT.Str("RETURNING"));
                      object firstItem = LT.Bool(true);
                      foreach (object item in LT.Items(LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))))) {
                        if (LT.ValueEquals(firstItem, LT.Bool(false))) {
                          sql = LT.BufAppend(sql, LT.Str(","));
                          wsql = LT.BufAppend(wsql, LT.Str(","));
                        }
                        firstItem = LT.Bool(false);
                        if (LT.Truthy(LT.Has(item, LT.Str("chain")))) {
                          tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(item, "chain"), "values"));
                          if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                            LT.Call(__fns, "emitIdent", tmpRef);
                          }
                          else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(item, "chain"), "values")), LT.Str("delete"))))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = LT.BufNew();
                            wsql = LT.BufNew();
                            orderSql = LT.Str("");
                            orderW = LT.Str("");
                            hasOrder = LT.Bool(false);
                            subAlias = LT.Str("");
                            LT.Call(__fns, "renderNodes", LT.Get(LT.Get(item, "chain"), "values"), LT.Num(0));
                            subSql = LT.Trim(LT.BufStr(sql));
                            subW = LT.Trim(LT.BufStr(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                            LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                            if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                              LT.Call(__fns, "pushSql", subAliasText);
                              LT.Call(__fns, "pushW", subAliasText);
                            }
                          }
                          else {
                            LT.Call(__fns, "renderNodes", LT.Get(LT.Get(item, "chain"), "values"), LT.Num(1));
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", item);
                        }
                      }
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("orderby"))) {
                    hasOrder = LT.Bool(true);
                    orderSql = LT.Str("");
                    orderW = LT.Str("");
                    LT.Call(__fns, "emitOrderList", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("limit"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("LIMIT"));
                    LT.Call(__fns, "pushW", LT.Str("LIMIT"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("offset"))) {
                    LT.Call(__fns, "flushOrder");
                    LT.Call(__fns, "pushSql", LT.Str("OFFSET"));
                    LT.Call(__fns, "pushW", LT.Str("OFFSET"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("raw"))) {
                    LT.Call(__fns, "emitRaw", node);
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("as"))) {
                    subAlias = LT.StrConcat(LT.Str("AS "), LT.Call(__fns, "identStr", LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")))));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("update"))) {
                    LT.Call(__fns, "pushSql", LT.Str("UPDATE"));
                    LT.Call(__fns, "pushW", LT.Str("UPDATE"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("SET"));
                    LT.Call(__fns, "pushW", LT.Str("SET"));
                    object assnFirst = LT.Bool(true);
                    foreach (object ak in LT.Items(LT.Keys(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value")))) {
                      if (LT.ValueEquals(assnFirst, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(","));
                        wsql = LT.BufAppend(wsql, LT.Str(","));
                      }
                      assnFirst = LT.Bool(false);
                      LT.Call(__fns, "pushSql", LT.Call(__fns, "identStr", ak));
                      LT.Call(__fns, "pushW", LT.Call(__fns, "identStr", ak));
                      LT.Call(__fns, "pushSql", LT.Str("="));
                      LT.Call(__fns, "pushW", LT.Str("="));
                      if (LT.Truthy(LT.Has(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), LT.Str("chain")))) {
                        tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"));
                        if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                          LT.Call(__fns, "emitIdent", tmpRef);
                        }
                        else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("delete"))))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = LT.BufNew();
                          wsql = LT.BufNew();
                          orderSql = LT.Str("");
                          orderW = LT.Str("");
                          hasOrder = LT.Bool(false);
                          subAlias = LT.Str("");
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"), LT.Num(0));
                          subSql = LT.Trim(LT.BufStr(sql));
                          subW = LT.Trim(LT.BufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                          LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                          if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                            LT.Call(__fns, "pushSql", subAliasText);
                            LT.Call(__fns, "pushW", subAliasText);
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak));
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak));
                      }
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("insert"))) {
                    LT.Call(__fns, "pushSql", LT.Str("INSERT"));
                    LT.Call(__fns, "pushW", LT.Str("INSERT"));
                    LT.Call(__fns, "pushSql", LT.Str("INTO"));
                    LT.Call(__fns, "pushW", LT.Str("INTO"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                    LT.Call(__fns, "pushSql", LT.Str("("));
                    LT.Call(__fns, "pushW", LT.Str("("));
                    object colFirst = LT.Bool(true);
                    foreach (object ck in LT.Items(LT.Keys(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value")))) {
                      if (LT.ValueEquals(colFirst, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(","));
                        wsql = LT.BufAppend(wsql, LT.Str(","));
                      }
                      colFirst = LT.Bool(false);
                      LT.Call(__fns, "pushSql", LT.Call(__fns, "identStr", ck));
                      LT.Call(__fns, "pushW", LT.Call(__fns, "identStr", ck));
                    }
                    LT.Call(__fns, "pushSql", LT.Str(")"));
                    LT.Call(__fns, "pushW", LT.Str(")"));
                    LT.Call(__fns, "pushSql", LT.Str("VALUES"));
                    LT.Call(__fns, "pushW", LT.Str("VALUES"));
                    LT.Call(__fns, "pushSql", LT.Str("("));
                    LT.Call(__fns, "pushW", LT.Str("("));
                    object valFirst = LT.Bool(true);
                    foreach (object vk in LT.Items(LT.Keys(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value")))) {
                      if (LT.ValueEquals(valFirst, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(","));
                        wsql = LT.BufAppend(wsql, LT.Str(","));
                      }
                      valFirst = LT.Bool(false);
                      if (LT.Truthy(LT.Has(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), LT.Str("chain")))) {
                        tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values"));
                        if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                          LT.Call(__fns, "emitIdent", tmpRef);
                        }
                        else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values")), LT.Str("delete"))))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = LT.BufNew();
                          wsql = LT.BufNew();
                          orderSql = LT.Str("");
                          orderW = LT.Str("");
                          hasOrder = LT.Bool(false);
                          subAlias = LT.Str("");
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk), "chain"), "values"), LT.Num(0));
                          subSql = LT.Trim(LT.BufStr(sql));
                          subW = LT.Trim(LT.BufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                          LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                          if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                            LT.Call(__fns, "pushSql", subAliasText);
                            LT.Call(__fns, "pushW", subAliasText);
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk));
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), vk));
                      }
                    }
                    LT.Call(__fns, "pushSql", LT.Str(")"));
                    LT.Call(__fns, "pushW", LT.Str(")"));
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("delete"))) {
                    LT.Call(__fns, "pushSql", LT.Str("DELETE"));
                    LT.Call(__fns, "pushW", LT.Str("DELETE"));
                    LT.Call(__fns, "pushSql", LT.Str("FROM"));
                    LT.Call(__fns, "pushW", LT.Str("FROM"));
                    if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                      tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                      if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                        LT.Call(__fns, "emitIdent", tmpRef);
                      }
                      else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                        savedSql = sql;
                        savedW = wsql;
                        savedOrderSql = orderSql;
                        savedOrderW = orderW;
                        savedHasOrder = hasOrder;
                        savedAlias = subAlias;
                        sql = LT.BufNew();
                        wsql = LT.BufNew();
                        orderSql = LT.Str("");
                        orderW = LT.Str("");
                        hasOrder = LT.Bool(false);
                        subAlias = LT.Str("");
                        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                        subSql = LT.Trim(LT.BufStr(sql));
                        subW = LT.Trim(LT.BufStr(wsql));
                        subAliasText = subAlias;
                        sql = savedSql;
                        wsql = savedW;
                        orderSql = savedOrderSql;
                        orderW = savedOrderW;
                        hasOrder = savedHasOrder;
                        subAlias = savedAlias;
                        LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                        LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                        if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                          LT.Call(__fns, "pushSql", subAliasText);
                          LT.Call(__fns, "pushW", subAliasText);
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("set"))) {
                    LT.Call(__fns, "pushSql", LT.Str("SET"));
                    LT.Call(__fns, "pushW", LT.Str("SET"));
                    object assnFirst = LT.Bool(true);
                    foreach (object ak in LT.Items(LT.Keys(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value")))) {
                      if (LT.ValueEquals(assnFirst, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(","));
                        wsql = LT.BufAppend(wsql, LT.Str(","));
                      }
                      assnFirst = LT.Bool(false);
                      LT.Call(__fns, "pushSql", LT.Call(__fns, "identStr", ak));
                      LT.Call(__fns, "pushW", LT.Call(__fns, "identStr", ak));
                      LT.Call(__fns, "pushSql", LT.Str("="));
                      LT.Call(__fns, "pushW", LT.Str("="));
                      if (LT.Truthy(LT.Has(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), LT.Str("chain")))) {
                        tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"));
                        if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                          LT.Call(__fns, "emitIdent", tmpRef);
                        }
                        else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("delete"))))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = LT.BufNew();
                          wsql = LT.BufNew();
                          orderSql = LT.Str("");
                          orderW = LT.Str("");
                          hasOrder = LT.Bool(false);
                          subAlias = LT.Str("");
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"), LT.Num(0));
                          subSql = LT.Trim(LT.BufStr(sql));
                          subW = LT.Trim(LT.BufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                          LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                          if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                            LT.Call(__fns, "pushSql", subAliasText);
                            LT.Call(__fns, "pushW", subAliasText);
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak));
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "object"), "value"), ak));
                      }
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("values"))) {
                    LT.Call(__fns, "pushSql", LT.Str("VALUES"));
                    LT.Call(__fns, "pushW", LT.Str("VALUES"));
                    object valueRows = LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    object valueFirst = LT.Bool(true);
                    if (LT.And(LT.ValueNotEquals(LT.Len(valueRows), LT.Num(0)), LT.Truthy(LT.Has(LT.Index(valueRows, LT.Num(0)), LT.Str("array"))))) {
                      foreach (object tuple in LT.Items(valueRows)) {
                        if (LT.ValueEquals(valueFirst, LT.Bool(false))) {
                          sql = LT.BufAppend(sql, LT.Str(","));
                          wsql = LT.BufAppend(wsql, LT.Str(","));
                        }
                        valueFirst = LT.Bool(false);
                        if (LT.ValueEquals(dialect, LT.Str("mysql"))) {
                          LT.Call(__fns, "pushSql", LT.Str("ROW"));
                          LT.Call(__fns, "pushW", LT.Str("ROW"));
                        }
                        LT.Call(__fns, "pushSql", LT.Str("("));
                        LT.Call(__fns, "pushW", LT.Str("("));
                        object itemFirst = LT.Bool(true);
                        foreach (object ti in LT.Items(LT.Call(__fns, "itemsOf", tuple))) {
                          if (LT.ValueEquals(itemFirst, LT.Bool(false))) {
                            sql = LT.BufAppend(sql, LT.Str(","));
                            wsql = LT.BufAppend(wsql, LT.Str(","));
                          }
                          itemFirst = LT.Bool(false);
                          if (LT.Truthy(LT.Has(ti, LT.Str("chain")))) {
                            tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(ti, "chain"), "values"));
                            if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                              LT.Call(__fns, "emitIdent", tmpRef);
                            }
                            else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("delete"))))))) {
                              savedSql = sql;
                              savedW = wsql;
                              savedOrderSql = orderSql;
                              savedOrderW = orderW;
                              savedHasOrder = hasOrder;
                              savedAlias = subAlias;
                              sql = LT.BufNew();
                              wsql = LT.BufNew();
                              orderSql = LT.Str("");
                              orderW = LT.Str("");
                              hasOrder = LT.Bool(false);
                              subAlias = LT.Str("");
                              LT.Call(__fns, "renderNodes", LT.Get(LT.Get(ti, "chain"), "values"), LT.Num(0));
                              subSql = LT.Trim(LT.BufStr(sql));
                              subW = LT.Trim(LT.BufStr(wsql));
                              subAliasText = subAlias;
                              sql = savedSql;
                              wsql = savedW;
                              orderSql = savedOrderSql;
                              orderW = savedOrderW;
                              hasOrder = savedHasOrder;
                              subAlias = savedAlias;
                              LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                              LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                              if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                                LT.Call(__fns, "pushSql", subAliasText);
                                LT.Call(__fns, "pushW", subAliasText);
                              }
                            }
                            else {
                              LT.Call(__fns, "emitParam", ti);
                            }
                          }
                          else {
                            LT.Call(__fns, "emitParam", ti);
                          }
                        }
                        LT.Call(__fns, "pushSql", LT.Str(")"));
                        LT.Call(__fns, "pushW", LT.Str(")"));
                      }
                    }
                    else {
                      if (LT.ValueEquals(dialect, LT.Str("mysql"))) {
                        LT.Call(__fns, "pushSql", LT.Str("ROW"));
                        LT.Call(__fns, "pushW", LT.Str("ROW"));
                      }
                      LT.Call(__fns, "pushSql", LT.Str("("));
                      LT.Call(__fns, "pushW", LT.Str("("));
                      object itemFirst = LT.Bool(true);
                      foreach (object ti in LT.Items(valueRows)) {
                        if (LT.ValueEquals(itemFirst, LT.Bool(false))) {
                          sql = LT.BufAppend(sql, LT.Str(","));
                          wsql = LT.BufAppend(wsql, LT.Str(","));
                        }
                        itemFirst = LT.Bool(false);
                        if (LT.Truthy(LT.Has(ti, LT.Str("chain")))) {
                          tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(ti, "chain"), "values"));
                          if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                            LT.Call(__fns, "emitIdent", tmpRef);
                          }
                          else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(ti, "chain"), "values")), LT.Str("delete"))))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = LT.BufNew();
                            wsql = LT.BufNew();
                            orderSql = LT.Str("");
                            orderW = LT.Str("");
                            hasOrder = LT.Bool(false);
                            subAlias = LT.Str("");
                            LT.Call(__fns, "renderNodes", LT.Get(LT.Get(ti, "chain"), "values"), LT.Num(0));
                            subSql = LT.Trim(LT.BufStr(sql));
                            subW = LT.Trim(LT.BufStr(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                            LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                            if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                              LT.Call(__fns, "pushSql", subAliasText);
                              LT.Call(__fns, "pushW", subAliasText);
                            }
                          }
                          else {
                            LT.Call(__fns, "emitParam", ti);
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", ti);
                        }
                      }
                      LT.Call(__fns, "pushSql", LT.Str(")"));
                      LT.Call(__fns, "pushW", LT.Str(")"));
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("onconflictdonothing"))) {
                    if (LT.ValueEquals(dialect, LT.Str("mysql"))) {
                      throw new Exception(LT.ToStr(LT.Str("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")));
                    }
                    else {
                      LT.Call(__fns, "pushSql", LT.Str("ON"));
                      LT.Call(__fns, "pushW", LT.Str("ON"));
                      LT.Call(__fns, "pushSql", LT.Str("CONFLICT"));
                      LT.Call(__fns, "pushW", LT.Str("CONFLICT"));
                      LT.Call(__fns, "pushSql", LT.Call(__fns, "conflictTarget", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                      LT.Call(__fns, "pushW", LT.Call(__fns, "conflictTarget", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                      LT.Call(__fns, "pushSql", LT.Str("DO"));
                      LT.Call(__fns, "pushW", LT.Str("DO"));
                      LT.Call(__fns, "pushSql", LT.Str("NOTHING"));
                      LT.Call(__fns, "pushW", LT.Str("NOTHING"));
                    }
                  }
                  else if (LT.ValueEquals(nameNorm, LT.Str("onconflictdoupdate"))) {
                    if (LT.ValueEquals(dialect, LT.Str("mysql"))) {
                      LT.Call(__fns, "pushSql", LT.Str("ON"));
                      LT.Call(__fns, "pushW", LT.Str("ON"));
                      LT.Call(__fns, "pushSql", LT.Str("DUPLICATE"));
                      LT.Call(__fns, "pushW", LT.Str("DUPLICATE"));
                      LT.Call(__fns, "pushSql", LT.Str("KEY"));
                      LT.Call(__fns, "pushW", LT.Str("KEY"));
                      LT.Call(__fns, "pushSql", LT.Str("UPDATE"));
                      LT.Call(__fns, "pushW", LT.Str("UPDATE"));
                      object assnFirst = LT.Bool(true);
                      foreach (object ak in LT.Items(LT.Keys(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value")))) {
                        if (LT.ValueEquals(assnFirst, LT.Bool(false))) {
                          sql = LT.BufAppend(sql, LT.Str(","));
                          wsql = LT.BufAppend(wsql, LT.Str(","));
                        }
                        assnFirst = LT.Bool(false);
                        LT.Call(__fns, "pushSql", LT.Call(__fns, "identStr", ak));
                        LT.Call(__fns, "pushW", LT.Call(__fns, "identStr", ak));
                        LT.Call(__fns, "pushSql", LT.Str("="));
                        LT.Call(__fns, "pushW", LT.Str("="));
                        if (LT.Truthy(LT.Has(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), LT.Str("chain")))) {
                          tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"));
                          if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                            LT.Call(__fns, "emitIdent", tmpRef);
                          }
                          else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("delete"))))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = LT.BufNew();
                            wsql = LT.BufNew();
                            orderSql = LT.Str("");
                            orderW = LT.Str("");
                            hasOrder = LT.Bool(false);
                            subAlias = LT.Str("");
                            LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"), LT.Num(0));
                            subSql = LT.Trim(LT.BufStr(sql));
                            subW = LT.Trim(LT.BufStr(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                            LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                            if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                              LT.Call(__fns, "pushSql", subAliasText);
                              LT.Call(__fns, "pushW", subAliasText);
                            }
                          }
                          else {
                            LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak));
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak));
                        }
                      }
                    }
                    else {
                      LT.Call(__fns, "pushSql", LT.Str("ON"));
                      LT.Call(__fns, "pushW", LT.Str("ON"));
                      LT.Call(__fns, "pushSql", LT.Str("CONFLICT"));
                      LT.Call(__fns, "pushW", LT.Str("CONFLICT"));
                      LT.Call(__fns, "pushSql", LT.Call(__fns, "conflictTarget", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                      LT.Call(__fns, "pushW", LT.Call(__fns, "conflictTarget", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                      LT.Call(__fns, "pushSql", LT.Str("DO"));
                      LT.Call(__fns, "pushW", LT.Str("DO"));
                      LT.Call(__fns, "pushSql", LT.Str("UPDATE"));
                      LT.Call(__fns, "pushW", LT.Str("UPDATE"));
                      LT.Call(__fns, "pushSql", LT.Str("SET"));
                      LT.Call(__fns, "pushW", LT.Str("SET"));
                      object assnFirst = LT.Bool(true);
                      foreach (object ak in LT.Items(LT.Keys(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value")))) {
                        if (LT.ValueEquals(assnFirst, LT.Bool(false))) {
                          sql = LT.BufAppend(sql, LT.Str(","));
                          wsql = LT.BufAppend(wsql, LT.Str(","));
                        }
                        assnFirst = LT.Bool(false);
                        LT.Call(__fns, "pushSql", LT.Call(__fns, "identStr", ak));
                        LT.Call(__fns, "pushW", LT.Call(__fns, "identStr", ak));
                        LT.Call(__fns, "pushSql", LT.Str("="));
                        LT.Call(__fns, "pushW", LT.Str("="));
                        if (LT.Truthy(LT.Has(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), LT.Str("chain")))) {
                          tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"));
                          if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                            LT.Call(__fns, "emitIdent", tmpRef);
                          }
                          else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values")), LT.Str("delete"))))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = LT.BufNew();
                            wsql = LT.BufNew();
                            orderSql = LT.Str("");
                            orderW = LT.Str("");
                            hasOrder = LT.Bool(false);
                            subAlias = LT.Str("");
                            LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak), "chain"), "values"), LT.Num(0));
                            subSql = LT.Trim(LT.BufStr(sql));
                            subW = LT.Trim(LT.BufStr(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                            LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                            if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                              LT.Call(__fns, "pushSql", subAliasText);
                              LT.Call(__fns, "pushW", subAliasText);
                            }
                          }
                          else {
                            LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak));
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", LT.Get(LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "object"), "value"), ak));
                        }
                      }
                    }
                  }
                  else {
                    throw new Exception(LT.ToStr(LT.StrConcat(LT.Str("sql-builder parse: unsupported clause "), name)));
                  }
                }
              }
            }
            LT.Call(__fns, "flushOrder");
            return LT.Null();
          }
          else {
            first = LT.Bool(true);
            left = LT.Str("");
            hasLeft = LT.Bool(false);
            @base = LT.Str("");
            foreach (object node in LT.Items(nodes)) {
              object pn = LT.Call(__fns, "normName", LT.Get(LT.Get(node, "functionCall"), "name"));
              object op = LT.Call(__fns, "opOf", pn);
              if (LT.Truthy(LT.Has(node, LT.Str("functionCall")))) {
                if (LT.Or(LT.ValueEquals(pn, LT.Str("col")), LT.ValueEquals(pn, LT.Str("table")))) {
                  left = LT.Call(__fns, "identStr", LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                  hasLeft = LT.Bool(true);
                }
                else if (LT.Truthy(op)) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  if (LT.Truthy(hasLeft)) {
                    @base = left;
                  }
                  else {
                    @base = LT.Str("?");
                  }
                  LT.Call(__fns, "pushSql", @base);
                  LT.Call(__fns, "pushW", @base);
                  LT.Call(__fns, "pushSql", op);
                  LT.Call(__fns, "pushW", op);
                  if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                    tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                    if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                      LT.Call(__fns, "emitIdent", tmpRef);
                    }
                    else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = LT.BufNew();
                      wsql = LT.BufNew();
                      orderSql = LT.Str("");
                      orderW = LT.Str("");
                      hasOrder = LT.Bool(false);
                      subAlias = LT.Str("");
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                      subSql = LT.Trim(LT.BufStr(sql));
                      subW = LT.Trim(LT.BufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                      LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                      if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                        LT.Call(__fns, "pushSql", subAliasText);
                        LT.Call(__fns, "pushW", subAliasText);
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                  }
                  else {
                    LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                  }
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("exists"))) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  LT.Call(__fns, "pushSql", LT.Str("EXISTS"));
                  LT.Call(__fns, "pushW", LT.Str("EXISTS"));
                  if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                    tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                    if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                      LT.Call(__fns, "emitIdent", tmpRef);
                    }
                    else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = LT.BufNew();
                      wsql = LT.BufNew();
                      orderSql = LT.Str("");
                      orderW = LT.Str("");
                      hasOrder = LT.Bool(false);
                      subAlias = LT.Str("");
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                      subSql = LT.Trim(LT.BufStr(sql));
                      subW = LT.Trim(LT.BufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                      LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                      if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                        LT.Call(__fns, "pushSql", subAliasText);
                        LT.Call(__fns, "pushW", subAliasText);
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                  }
                  else {
                    LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                  }
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("in"))) {
                  if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                    if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                      if (LT.ValueEquals(first, LT.Bool(false))) {
                        LT.Call(__fns, "pushSql", LT.Str("AND"));
                        LT.Call(__fns, "pushW", LT.Str("AND"));
                      }
                      first = LT.Bool(false);
                      if (LT.Truthy(hasLeft)) {
                        @base = left;
                      }
                      else {
                        @base = LT.Str("?");
                      }
                      LT.Call(__fns, "pushSql", @base);
                      LT.Call(__fns, "pushW", @base);
                      LT.Call(__fns, "pushSql", LT.Str("IN"));
                      LT.Call(__fns, "pushW", LT.Str("IN"));
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = LT.BufNew();
                      wsql = LT.BufNew();
                      orderSql = LT.Str("");
                      orderW = LT.Str("");
                      hasOrder = LT.Bool(false);
                      subAlias = LT.Str("");
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                      subSql = LT.Trim(LT.BufStr(sql));
                      subW = LT.Trim(LT.BufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                      LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                      if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                        LT.Call(__fns, "pushSql", subAliasText);
                        LT.Call(__fns, "pushW", subAliasText);
                      }
                    }
                    else {
                      if (LT.ValueEquals(first, LT.Bool(false))) {
                        LT.Call(__fns, "pushSql", LT.Str("AND"));
                        LT.Call(__fns, "pushW", LT.Str("AND"));
                      }
                      first = LT.Bool(false);
                      if (LT.Truthy(hasLeft)) {
                        @base = left;
                      }
                      else {
                        @base = LT.Str("?");
                      }
                      LT.Call(__fns, "pushSql", @base);
                      LT.Call(__fns, "pushW", @base);
                      LT.Call(__fns, "pushSql", LT.Str("IN ("));
                      LT.Call(__fns, "pushW", LT.Str("IN ("));
                      object inFirst = LT.Bool(true);
                      foreach (object iv in LT.Items(LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))))) {
                        if (LT.ValueEquals(inFirst, LT.Bool(false))) {
                          sql = LT.BufAppend(sql, LT.Str(","));
                          wsql = LT.BufAppend(wsql, LT.Str(","));
                        }
                        inFirst = LT.Bool(false);
                        if (LT.Truthy(LT.Has(iv, LT.Str("chain")))) {
                          tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(iv, "chain"), "values"));
                          if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                            LT.Call(__fns, "emitIdent", tmpRef);
                          }
                          else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("delete"))))))) {
                            savedSql = sql;
                            savedW = wsql;
                            savedOrderSql = orderSql;
                            savedOrderW = orderW;
                            savedHasOrder = hasOrder;
                            savedAlias = subAlias;
                            sql = LT.BufNew();
                            wsql = LT.BufNew();
                            orderSql = LT.Str("");
                            orderW = LT.Str("");
                            hasOrder = LT.Bool(false);
                            subAlias = LT.Str("");
                            LT.Call(__fns, "renderNodes", LT.Get(LT.Get(iv, "chain"), "values"), LT.Num(0));
                            subSql = LT.Trim(LT.BufStr(sql));
                            subW = LT.Trim(LT.BufStr(wsql));
                            subAliasText = subAlias;
                            sql = savedSql;
                            wsql = savedW;
                            orderSql = savedOrderSql;
                            orderW = savedOrderW;
                            hasOrder = savedHasOrder;
                            subAlias = savedAlias;
                            LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                            LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                            if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                              LT.Call(__fns, "pushSql", subAliasText);
                              LT.Call(__fns, "pushW", subAliasText);
                            }
                          }
                          else {
                            LT.Call(__fns, "emitParam", iv);
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", iv);
                        }
                      }
                      LT.Call(__fns, "pushSql", LT.Str(")"));
                      LT.Call(__fns, "pushW", LT.Str(")"));
                    }
                  }
                  else {
                    if (LT.ValueEquals(first, LT.Bool(false))) {
                      LT.Call(__fns, "pushSql", LT.Str("AND"));
                      LT.Call(__fns, "pushW", LT.Str("AND"));
                    }
                    first = LT.Bool(false);
                    if (LT.Truthy(hasLeft)) {
                      @base = left;
                    }
                    else {
                      @base = LT.Str("?");
                    }
                    LT.Call(__fns, "pushSql", @base);
                    LT.Call(__fns, "pushW", @base);
                    LT.Call(__fns, "pushSql", LT.Str("IN ("));
                    LT.Call(__fns, "pushW", LT.Str("IN ("));
                    object inFirst = LT.Bool(true);
                    foreach (object iv in LT.Items(LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))))) {
                      if (LT.ValueEquals(inFirst, LT.Bool(false))) {
                        sql = LT.BufAppend(sql, LT.Str(","));
                        wsql = LT.BufAppend(wsql, LT.Str(","));
                      }
                      inFirst = LT.Bool(false);
                      if (LT.Truthy(LT.Has(iv, LT.Str("chain")))) {
                        tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(iv, "chain"), "values"));
                        if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                          LT.Call(__fns, "emitIdent", tmpRef);
                        }
                        else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(iv, "chain"), "values")), LT.Str("delete"))))))) {
                          savedSql = sql;
                          savedW = wsql;
                          savedOrderSql = orderSql;
                          savedOrderW = orderW;
                          savedHasOrder = hasOrder;
                          savedAlias = subAlias;
                          sql = LT.BufNew();
                          wsql = LT.BufNew();
                          orderSql = LT.Str("");
                          orderW = LT.Str("");
                          hasOrder = LT.Bool(false);
                          subAlias = LT.Str("");
                          LT.Call(__fns, "renderNodes", LT.Get(LT.Get(iv, "chain"), "values"), LT.Num(0));
                          subSql = LT.Trim(LT.BufStr(sql));
                          subW = LT.Trim(LT.BufStr(wsql));
                          subAliasText = subAlias;
                          sql = savedSql;
                          wsql = savedW;
                          orderSql = savedOrderSql;
                          orderW = savedOrderW;
                          hasOrder = savedHasOrder;
                          subAlias = savedAlias;
                          LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                          LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                          if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                            LT.Call(__fns, "pushSql", subAliasText);
                            LT.Call(__fns, "pushW", subAliasText);
                          }
                        }
                        else {
                          LT.Call(__fns, "emitParam", iv);
                        }
                      }
                      else {
                        LT.Call(__fns, "emitParam", iv);
                      }
                    }
                    LT.Call(__fns, "pushSql", LT.Str(")"));
                    LT.Call(__fns, "pushW", LT.Str(")"));
                  }
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("between"))) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  if (LT.Truthy(hasLeft)) {
                    @base = left;
                  }
                  else {
                    @base = LT.Str("?");
                  }
                  LT.Call(__fns, "pushSql", @base);
                  LT.Call(__fns, "pushW", @base);
                  LT.Call(__fns, "pushSql", LT.Str("BETWEEN"));
                  LT.Call(__fns, "pushW", LT.Str("BETWEEN"));
                  if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), LT.Str("chain")))) {
                    tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"));
                    if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                      LT.Call(__fns, "emitIdent", tmpRef);
                    }
                    else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = LT.BufNew();
                      wsql = LT.BufNew();
                      orderSql = LT.Str("");
                      orderW = LT.Str("");
                      hasOrder = LT.Bool(false);
                      subAlias = LT.Str("");
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                      subSql = LT.Trim(LT.BufStr(sql));
                      subW = LT.Trim(LT.BufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                      LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                      if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                        LT.Call(__fns, "pushSql", subAliasText);
                        LT.Call(__fns, "pushW", subAliasText);
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                    }
                  }
                  else {
                    LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")));
                  }
                  LT.Call(__fns, "pushSql", LT.Str("AND"));
                  LT.Call(__fns, "pushW", LT.Str("AND"));
                  if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), LT.Str("chain")))) {
                    tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"));
                    if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                      LT.Call(__fns, "emitIdent", tmpRef);
                    }
                    else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = LT.BufNew();
                      wsql = LT.BufNew();
                      orderSql = LT.Str("");
                      orderW = LT.Str("");
                      hasOrder = LT.Bool(false);
                      subAlias = LT.Str("");
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                      subSql = LT.Trim(LT.BufStr(sql));
                      subW = LT.Trim(LT.BufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                      LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                      if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                        LT.Call(__fns, "pushSql", subAliasText);
                        LT.Call(__fns, "pushW", subAliasText);
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")));
                    }
                  }
                  else {
                    LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")));
                  }
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("isnull"))) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  if (LT.Truthy(hasLeft)) {
                    @base = left;
                  }
                  else {
                    @base = LT.Str("?");
                  }
                  LT.Call(__fns, "pushSql", @base);
                  LT.Call(__fns, "pushW", @base);
                  LT.Call(__fns, "pushSql", LT.Str("IS NULL"));
                  LT.Call(__fns, "pushW", LT.Str("IS NULL"));
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("isnotnull"))) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  if (LT.Truthy(hasLeft)) {
                    @base = left;
                  }
                  else {
                    @base = LT.Str("?");
                  }
                  LT.Call(__fns, "pushSql", @base);
                  LT.Call(__fns, "pushW", @base);
                  LT.Call(__fns, "pushSql", LT.Str("IS NOT NULL"));
                  LT.Call(__fns, "pushW", LT.Str("IS NOT NULL"));
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("not"))) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  LT.Call(__fns, "pushSql", LT.Str("NOT ("));
                  LT.Call(__fns, "pushW", LT.Str("NOT ("));
                  LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument")), "chain"), "values"), LT.Num(1));
                  LT.Call(__fns, "pushSql", LT.Str(")"));
                  LT.Call(__fns, "pushW", LT.Str(")"));
                  hasLeft = LT.Bool(false);
                }
                else if (LT.Or(LT.ValueEquals(pn, LT.Str("and")), LT.ValueEquals(pn, LT.Str("or")))) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  LT.Call(__fns, "pushSql", LT.Str("("));
                  LT.Call(__fns, "pushW", LT.Str("("));
                  object boolFirst = LT.Bool(true);
                  foreach (object bv in LT.Items(LT.Call(__fns, "itemsOf", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))))) {
                    if (LT.ValueEquals(boolFirst, LT.Bool(false))) {
                      tmp = LT.ToUpper(pn);
                      LT.Call(__fns, "pushSql", tmp);
                      LT.Call(__fns, "pushW", tmp);
                    }
                    boolFirst = LT.Bool(false);
                    if (LT.Truthy(LT.Has(bv, LT.Str("chain")))) {
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(bv, "chain"), "values"), LT.Num(1));
                    }
                    else {
                      LT.Call(__fns, "emitParam", bv);
                    }
                  }
                  LT.Call(__fns, "pushSql", LT.Str(")"));
                  LT.Call(__fns, "pushW", LT.Str(")"));
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("as"))) {
                  if (LT.Truthy(hasLeft)) {
                    @base = left;
                  }
                  else {
                    @base = LT.Str("?");
                  }
                  LT.Call(__fns, "pushSql", @base);
                  LT.Call(__fns, "pushW", @base);
                  LT.Call(__fns, "pushSql", LT.Str("AS"));
                  LT.Call(__fns, "pushW", LT.Str("AS"));
                  LT.Call(__fns, "emitIdent", LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("op"))) {
                  if (LT.ValueEquals(first, LT.Bool(false))) {
                    LT.Call(__fns, "pushSql", LT.Str("AND"));
                    LT.Call(__fns, "pushW", LT.Str("AND"));
                  }
                  first = LT.Bool(false);
                  if (LT.Truthy(hasLeft)) {
                    @base = left;
                  }
                  else {
                    @base = LT.Str("?");
                  }
                  LT.Call(__fns, "pushSql", @base);
                  LT.Call(__fns, "pushW", @base);
                  LT.Call(__fns, "pushSql", LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                  LT.Call(__fns, "pushW", LT.Call(__fns, "asString", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(0)), LT.Str("argument"))));
                  if (LT.Truthy(LT.Has(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), LT.Str("chain")))) {
                    tmpRef = LT.Call(__fns, "isRef", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"));
                    if (LT.ValueNotEquals(tmpRef, LT.Str(""))) {
                      LT.Call(__fns, "emitIdent", tmpRef);
                    }
                    else if (LT.Or(LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("select")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("with"))), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("values")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("insert")), LT.Or(LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("update")), LT.ValueEquals(LT.Call(__fns, "firstKind", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values")), LT.Str("delete"))))))) {
                      savedSql = sql;
                      savedW = wsql;
                      savedOrderSql = orderSql;
                      savedOrderW = orderW;
                      savedHasOrder = hasOrder;
                      savedAlias = subAlias;
                      sql = LT.BufNew();
                      wsql = LT.BufNew();
                      orderSql = LT.Str("");
                      orderW = LT.Str("");
                      hasOrder = LT.Bool(false);
                      subAlias = LT.Str("");
                      LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")), "chain"), "values"), LT.Num(0));
                      subSql = LT.Trim(LT.BufStr(sql));
                      subW = LT.Trim(LT.BufStr(wsql));
                      subAliasText = subAlias;
                      sql = savedSql;
                      wsql = savedW;
                      orderSql = savedOrderSql;
                      orderW = savedOrderW;
                      hasOrder = savedHasOrder;
                      subAlias = savedAlias;
                      LT.Call(__fns, "pushSql", LT.StrConcat(LT.Str("("), LT.StrConcat(subSql, LT.Str(")"))));
                      LT.Call(__fns, "pushW", LT.StrConcat(LT.Str("("), LT.StrConcat(subW, LT.Str(")"))));
                      if (LT.ValueNotEquals(subAliasText, LT.Str(""))) {
                        LT.Call(__fns, "pushSql", subAliasText);
                        LT.Call(__fns, "pushW", subAliasText);
                      }
                    }
                    else {
                      LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")));
                    }
                  }
                  else {
                    LT.Call(__fns, "emitParam", LT.Get(LT.Index(LT.Get(LT.Get(node, "functionCall"), "arguments"), LT.Num(1)), LT.Str("argument")));
                  }
                  hasLeft = LT.Bool(false);
                }
                else if (LT.ValueEquals(pn, LT.Str("raw"))) {
                  LT.Call(__fns, "emitRaw", node);
                }
                else {
                  throw new Exception(LT.ToStr(LT.Str("sql-builder parse: unsupported predicate")));
                }
              }
            }
            return LT.Null();
          }
        };
        LT.Call(__fns, "renderNodes", LT.Get(LT.Get(LT.Get(LT.Get(root, "schema"), "chain"), "chain"), "values"), LT.Num(0));
        sql = LT.BufStr(sql);
        wsql = LT.BufStr(wsql);
        @params = LT.ListValue(@params);
        return LT.Map("sql", LT.Trim(sql), "sqlWithParam", LT.Trim(wsql), "param", LT.Params(@params));
    }

}

public static class Init
{
    public static SqlBuilder NewSqlBuilder(string variableName = null, params object[] copies)
    {
        SqlBuilder structure = new SqlBuilder();
        object __variableName = variableName;
        if (variableName == null)
        {
            __variableName = LT.Get(LT.Get(LT.Get(LT.Get(LT.Get(structure.GetSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName");
        }
        structure.InitFromInitFunction(LT.Map(
            "name", "sql-builder",
            "variableName", __variableName
        ), copies);
        return structure;
    }
}