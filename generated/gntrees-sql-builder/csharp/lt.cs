// lt — runtime for the Lingua Tungga C# emitter (Gelombang 2).
//
// C# is static but has a universal type (`object`), so an LT value is just
// `object`: string / double / bool / null / List<object> / LtObject (plus
// StringBuilder for buffers). Like Java/Go, no `Value` enum is required.
//
// **Objects are ordered.** `Dictionary<K,V>` enumeration order is not guaranteed,
// but LT objects (and therefore generated SQL) must be deterministic and match
// the reference (TypeScript). So LT objects use `LtObject`, which keeps an
// explicit key order (and a JSON writer that preserves it).
//
// Semantics deliberately mirror JavaScript (the TypeScript backend is the
// reference).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

public sealed class LtObject : IEnumerable<KeyValuePair<string, object>>
{
    private readonly List<string> keys = new List<string>();
    private readonly Dictionary<string, object> values = new Dictionary<string, object>();

    public void Set(string key, object value)
    {
        if (!values.ContainsKey(key))
        {
            keys.Add(key);
        }
        values[key] = value;
    }

    public object Get(string key)
    {
        values.TryGetValue(key, out object value);
        return value;
    }

    public bool Has(string key)
    {
        return values.ContainsKey(key);
    }

    public IReadOnlyList<string> Keys
    {
        get { return keys; }
    }

    public int Count
    {
        get { return keys.Count; }
    }

    public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
    {
        foreach (string key in keys)
        {
            yield return new KeyValuePair<string, object>(key, values[key]);
        }
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

public static class LT
{
    /// <summary>Sentinel for "argument not supplied" in generated signatures.</summary>
    public static readonly object Missing = new object();

    public static object Call(Dictionary<string, Func<object[], object>> fns, string name, params object[] args)
    {
        if (!fns.TryGetValue(name, out Func<object[], object> fn))
        {
            throw new Exception("Lingua Tungga: unknown local function \"" + name + "\"");
        }
        return fn(args);
    }

    // ---- literals ----

    public static object Str(string value) { return value; }
    public static object Num(double value) { return value; }
    public static object Bool(bool value) { return value; }
    public static object Null() { return null; }

    public static List<object> Array(params object[] items)
    {
        return new List<object>(items ?? new object[0]);
    }

    /// <summary>Alternating key/value arguments: Map("a", 1, "b", 2).</summary>
    public static LtObject Map(params object[] keyValues)
    {
        LtObject result = new LtObject();
        for (int i = 0; i + 1 < keyValues.Length; i += 2)
        {
            result.Set(ToStr(keyValues[i]), keyValues[i + 1]);
        }
        return result;
    }

    /// <summary>Builds an ordered LT object (for callers outside this file).</summary>
    public static object Obj(params object[] keyValues) { return Map(keyValues); }

    // ---- conversions ----

    public static double ToFloat(object value)
    {
        if (value == null) return 0;
        if (value is bool b) return b ? 1 : 0;
        if (value is double d) return d;
        if (value is float f) return f;
        if (value is int i) return i;
        if (value is long l) return l;
        if (value is string s) return double.TryParse(s, NumberStyles.Any, CultureInfo.InvariantCulture, out double parsed) ? parsed : 0;
        return 0;
    }

    private static int ToIndex(object value) { return (int)ToFloat(value); }

    public static bool IsMap(object value) { return value is LtObject; }

    public static LtObject AsMap(object value)
    {
        return value as LtObject ?? new LtObject();
    }

    public static List<object> AsList(object value)
    {
        if (value is List<object> list) return list;
        if (value is object[] array) return new List<object>(array);
        return new List<object>();
    }

    public static bool IsNumber(object value)
    {
        return value is double || value is float || value is int || value is long;
    }

    // ---- values ----

    public static bool Truthy(object value)
    {
        if (value == null) return false;
        if (value is bool b) return b;
        if (value is string s) return s.Length > 0;
        if (value is double d) return d != 0;
        if (value is float f) return f != 0;
        if (value is int i) return i != 0;
        if (value is long l) return l != 0;
        return true; // JS: [] and {} are truthy
    }

    public static string ToStr(object value)
    {
        if (value == null) return "null";
        if (value is bool b) return b ? "true" : "false";
        if (value is string s) return s;
        if (value is double d) return d == Math.Floor(d) && !double.IsInfinity(d) ? ((long)d).ToString(CultureInfo.InvariantCulture) : d.ToString(CultureInfo.InvariantCulture);
        if (value is float f) return ToStr((double)f);
        if (value is int i) return i.ToString(CultureInfo.InvariantCulture);
        if (value is long l) return l.ToString(CultureInfo.InvariantCulture);
        if (value is List<object> list)
        {
            StringBuilder builder = new StringBuilder("[");
            for (int index = 0; index < list.Count; index++)
            {
                if (index > 0) builder.Append(",");
                builder.Append(ToStr(list[index]));
            }
            return builder.Append("]").ToString();
        }
        if (value is LtObject obj)
        {
            StringBuilder builder = new StringBuilder("{");
            bool first = true;
            foreach (KeyValuePair<string, object> entry in obj)
            {
                if (!first) builder.Append(",");
                first = false;
                builder.Append("\"").Append(entry.Key).Append("\":").Append(ToStr(entry.Value));
            }
            return builder.Append("}").ToString();
        }
        return value.ToString();
    }

    public static bool ValueEquals(object left, object right)
    {
        if (IsNumber(left) && IsNumber(right))
        {
            return ToFloat(left) == ToFloat(right);
        }
        if (left == null || right == null)
        {
            return left == null && right == null;
        }
        if (left is List<object> la && right is List<object> lb)
        {
            if (la.Count != lb.Count) return false;
            for (int index = 0; index < la.Count; index++)
            {
                if (!ValueEquals(la[index], lb[index])) return false;
            }
            return true;
        }
        if (left is LtObject oa && right is LtObject ob)
        {
            if (oa.Count != ob.Count) return false;
            foreach (KeyValuePair<string, object> entry in oa)
            {
                if (!ob.Has(entry.Key) || !ValueEquals(entry.Value, ob.Get(entry.Key))) return false;
            }
            return true;
        }
        return left.Equals(right);
    }

    public static bool ValueNotEquals(object left, object right) { return !ValueEquals(left, right); }

    // ---- operators ----

    public static bool Gt(object a, object b) { return ToFloat(a) > ToFloat(b); }
    public static bool LtValue(object a, object b) { return ToFloat(a) < ToFloat(b); }
    public static bool Gte(object a, object b) { return ToFloat(a) >= ToFloat(b); }
    public static bool Lte(object a, object b) { return ToFloat(a) <= ToFloat(b); }

    public static object Add(object a, object b) { return ToFloat(a) + ToFloat(b); }
    public static object Sub(object a, object b) { return ToFloat(a) - ToFloat(b); }
    public static object Mul(object a, object b) { return ToFloat(a) * ToFloat(b); }
    public static object Div(object a, object b) { return ToFloat(a) / ToFloat(b); }
    public static object Mod(object a, object b) { return (double)((long)ToFloat(a) % (long)ToFloat(b)); }

    // LT only uses these as conditions, so returning a bool is correct.
    public static bool And(object a, object b) { return Truthy(a) && Truthy(b); }
    public static bool Or(object a, object b) { return Truthy(a) || Truthy(b); }
    public static bool Xor(object a, object b) { return Truthy(a) != Truthy(b); }
    public static bool Not(object a) { return !Truthy(a); }

    public static object BitAnd(object a, object b) { return (double)((long)ToFloat(a) & (long)ToFloat(b)); }
    public static object BitOr(object a, object b) { return (double)((long)ToFloat(a) | (long)ToFloat(b)); }
    public static object Shl(object a, object b) { return (double)((long)ToFloat(a) << (int)ToFloat(b)); }
    public static object Shr(object a, object b) { return (double)((long)ToFloat(a) >> (int)ToFloat(b)); }

    // ---- containers ----

    public static int Len(object value)
    {
        if (value is string s) return s.Length;
        if (value is List<object> list) return list.Count;
        if (value is LtObject obj) return obj.Count;
        return 0;
    }

    public static object Index(object value, object key)
    {
        if (value is List<object> list)
        {
            int i = ToIndex(key);
            return i >= 0 && i < list.Count ? list[i] : null;
        }
        if (value is string s)
        {
            int i = ToIndex(key);
            return i >= 0 && i < s.Length ? s[i].ToString() : "";
        }
        return null;
    }

    public static object Get(object value, object key)
    {
        if (value is LtObject obj) return obj.Get(ToStr(key));
        return Index(value, key);
    }

    public static bool Has(object value, object key)
    {
        if (value is LtObject obj) return obj.Has(ToStr(key));
        if (value is List<object> list)
        {
            int i = ToIndex(key);
            return i >= 0 && i < list.Count;
        }
        return false;
    }

    public static object Set(object value, object key, object item)
    {
        LtObject result = new LtObject();
        if (value is LtObject obj)
        {
            foreach (KeyValuePair<string, object> entry in obj) result.Set(entry.Key, entry.Value);
        }
        result.Set(ToStr(key), item);
        return result;
    }

    public static object Merge(object a, object b)
    {
        LtObject result = new LtObject();
        if (a is LtObject oa)
        {
            foreach (KeyValuePair<string, object> entry in oa) result.Set(entry.Key, entry.Value);
        }
        if (b is LtObject ob)
        {
            foreach (KeyValuePair<string, object> entry in ob) result.Set(entry.Key, entry.Value);
        }
        return result;
    }

    public static object Delete(object value, object key)
    {
        if (!(value is LtObject obj)) return value;
        LtObject result = new LtObject();
        string name = ToStr(key);
        foreach (KeyValuePair<string, object> entry in obj)
        {
            if (entry.Key != name) result.Set(entry.Key, entry.Value);
        }
        return result;
    }

    public static List<object> Keys(object value)
    {
        List<object> result = new List<object>();
        if (value is LtObject obj)
        {
            foreach (string key in obj.Keys) result.Add(key);
        }
        return result;
    }

    public static List<object> Values(object value)
    {
        List<object> result = new List<object>();
        if (value is LtObject obj)
        {
            foreach (KeyValuePair<string, object> entry in obj) result.Add(entry.Value);
        }
        return result;
    }

    public static List<object> Entries(object value)
    {
        List<object> result = new List<object>();
        if (value is LtObject obj)
        {
            foreach (KeyValuePair<string, object> entry in obj) result.Add(Array(entry.Key, entry.Value));
        }
        return result;
    }

    public static List<object> Items(object value)
    {
        if (value is List<object> list) return new List<object>(list);
        if (value is object[] array) return new List<object>(array);
        return new List<object>();
    }

    // ---- strings ----

    public static string StrConcat(object a, object b) { return ToStr(a) + ToStr(b); }
    public static string ToUpper(object value) { return ToStr(value).ToUpperInvariant(); }
    public static string ToLower(object value) { return ToStr(value).ToLowerInvariant(); }
    public static string Trim(object value) { return ToStr(value).Trim(); }
    public static string Repeat(object value, object count)
    {
        string text = ToStr(value);
        int n = ToIndex(count);
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < n; i++) builder.Append(text);
        return builder.ToString();
    }

    public static string Slice(object value, object start, object end)
    {
        string text = ToStr(value);
        int from = Math.Max(0, Math.Min(text.Length, ToIndex(start)));
        int to = Math.Max(from, Math.Min(text.Length, ToIndex(end)));
        return text.Substring(from, to - from);
    }

    public static string Replace(object value, object search, object replacement)
    {
        return ToStr(value).Replace(ToStr(search), ToStr(replacement));
    }

    public static List<object> Split(object value, object separator)
    {
        string text = ToStr(value);
        string sep = ToStr(separator);
        List<object> result = new List<object>();
        if (sep.Length == 0)
        {
            foreach (char ch in text) result.Add(ch.ToString());
            return result;
        }
        foreach (string part in text.Split(new[] { sep }, StringSplitOptions.None)) result.Add(part);
        return result;
    }

    public static bool Contains(object value, object item)
    {
        if (value is string s) return s.Contains(ToStr(item));
        if (value is List<object> list)
        {
            foreach (object element in list)
            {
                if (ValueEquals(element, item)) return true;
            }
        }
        return false;
    }

    public static string CharAt(object value, object index)
    {
        string text = ToStr(value);
        int i = ToIndex(index);
        return i >= 0 && i < text.Length ? text[i].ToString() : "";
    }

    public static bool StartsWith(object value, object prefix) { return ToStr(value).StartsWith(ToStr(prefix)); }
    public static bool EndsWith(object value, object suffix) { return ToStr(value).EndsWith(ToStr(suffix)); }

    public static string Join(object value, object separator)
    {
        string sep = ToStr(separator);
        StringBuilder builder = new StringBuilder();
        List<object> list = AsList(value);
        for (int index = 0; index < list.Count; index++)
        {
            if (index > 0) builder.Append(sep);
            builder.Append(ToStr(list[index]));
        }
        return builder.ToString();
    }

    // ---- arrays ----

    public static List<object> Append(object value, object item)
    {
        List<object> result = Items(value);
        result.Add(item);
        return result;
    }

    public static List<object> ArrConcat(object a, object b)
    {
        List<object> result = Items(a);
        result.AddRange(AsList(b));
        return result;
    }

    public static int IndexOf(object value, object item)
    {
        List<object> list = AsList(value);
        for (int index = 0; index < list.Count; index++)
        {
            if (ValueEquals(list[index], item)) return index;
        }
        return -1;
    }

    public static List<object> Reverse(object value)
    {
        List<object> result = Items(value);
        result.Reverse();
        return result;
    }

    public static List<object> Sort(object value)
    {
        List<object> result = Items(value);
        result.Sort((a, b) =>
        {
            if (IsNumber(a) && IsNumber(b)) return ToFloat(a).CompareTo(ToFloat(b));
            return string.CompareOrdinal(ToStr(a), ToStr(b));
        });
        return result;
    }

    public static List<object> Unique(object value)
    {
        List<object> result = new List<object>();
        foreach (object item in Items(value))
        {
            if (IndexOf(result, item) < 0) result.Add(item);
        }
        return result;
    }

    // ---- buffers / lists ----

    public static StringBuilder BufNew() { return new StringBuilder(); }

    public static StringBuilder BufAppend(object buffer, object text)
    {
        StringBuilder builder = buffer as StringBuilder ?? new StringBuilder();
        builder.Append(ToStr(text));
        return builder;
    }

    public static int BufLen(object buffer) { return (buffer as StringBuilder)?.Length ?? 0; }
    public static string BufStr(object buffer) { return (buffer as StringBuilder)?.ToString() ?? ""; }

    public static List<object> ListNew() { return new List<object>(); }
    public static object ListValue(object value) { return value; }

    public static List<object> ListPush(object list, object item)
    {
        List<object> target = AsList(list);
        target.Add(item);
        return target;
    }

    public static int ListLen(object list) { return AsList(list).Count; }

    // ---- local function table / parse bridge ----

    public static List<object> Params(object value)
    {
        List<object> result = new List<object>();
        foreach (object entry in Items(value))
        {
            object inner = Get(entry, "string");
            if (inner == null) inner = Get(entry, "number");
            if (inner == null) inner = Get(entry, "boolean");
            result.Add(inner == null ? null : Get(inner, "value"));
        }
        return result;
    }

    public static string Json(object value)
    {
        if (value == null) return "null";
        if (value is bool b) return b ? "true" : "false";
        if (value is string s) return JsonString(s);
        if (IsNumber(value)) return ToStr(value);
        if (value is List<object> list)
        {
            StringBuilder builder = new StringBuilder("[");
            for (int index = 0; index < list.Count; index++)
            {
                if (index > 0) builder.Append(",");
                builder.Append(Json(list[index]));
            }
            return builder.Append("]").ToString();
        }
        if (value is LtObject obj)
        {
            StringBuilder builder = new StringBuilder("{");
            bool first = true;
            foreach (KeyValuePair<string, object> entry in obj)
            {
                if (!first) builder.Append(",");
                first = false;
                builder.Append(JsonString(entry.Key)).Append(":").Append(Json(entry.Value));
            }
            return builder.Append("}").ToString();
        }
        return JsonString(value.ToString());
    }

    private static string JsonString(string value)
    {
        StringBuilder builder = new StringBuilder("\"");
        foreach (char c in value)
        {
            switch (c)
            {
                case '"': builder.Append("\\\""); break;
                case '\\': builder.Append("\\\\"); break;
                case '\n': builder.Append("\\n"); break;
                case '\r': builder.Append("\\r"); break;
                case '\t': builder.Append("\\t"); break;
                default: builder.Append(c); break;
            }
        }
        return builder.Append("\"").ToString();
    }
}
