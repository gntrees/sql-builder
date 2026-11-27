// lt — runtime for the Lingua Tungga Java emitter (Gelombang 2).
//
// Java is statically typed but has a universal reference type, so an LT value is
// just `Object`: String / Double / Boolean / null / List<Object> / Map<String,Object>
// (plus StringBuilder for buffers). This class is the measured "runtime cost" of a
// static, GC language target — compare with the Rust `lt.rs` (which needs an enum
// `Value` *and* an ownership model) and the Python `lt.py` (dynamic, ~100 LOC).
//
// Semantics deliberately mirror JavaScript (the TypeScript backend is the
// reference): truthiness of empty containers, `String(x)` formatting, `obj[key]`
// returning null on a missing key, etc.
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

class Lt {
    private Lt() { }

    /** Sentinel for "argument not supplied" in generated fluent signatures. */
    static final Object MISSING = new Object();

    /** A local function: variable arity, returns an LT value. */
    interface Fn {
        Object apply(Object... args);
    }

    static Object call(Map<String, Fn> fns, String name, Object... args) {
        Fn fn = fns.get(name);
        if (fn == null) {
            throw new RuntimeException("Lingua Tungga: unknown local function \"" + name + "\"");
        }
        return fn.apply(args);
    }

    // ---- literals ----

    static Object str(String value) { return value; }
    static Object num(double value) { return value; }
    static Object bool(boolean value) { return value; }
    static Object nullValue() { return null; }

    static List<Object> array(Object... items) { return new ArrayList<>(Arrays.asList(items)); }

    /** Alternating key/value arguments: `map("a", 1, "b", 2)`. */
    static Map<String, Object> map(Object... keyValues) {
        Map<String, Object> out = new LinkedHashMap<>();
        for (int i = 0; i + 1 < keyValues.length; i += 2) {
            out.put(to_string(keyValues[i]), keyValues[i + 1]);
        }
        return out;
    }

    // ---- numbers ----

    private static double toDouble(Object value) {
        if (value instanceof Number) return ((Number) value).doubleValue();
        if (value instanceof Boolean) return ((Boolean) value) ? 1 : 0;
        if (value instanceof String) {
            try { return Double.parseDouble((String) value); } catch (NumberFormatException ignored) { return 0; }
        }
        return 0;
    }

    private static int toIndex(Object value) { return (int) toDouble(value); }

    // ---- values ----

    static boolean truthy(Object value) {
        if (value == null) return false;
        if (value instanceof Boolean) return (Boolean) value;
        if (value instanceof String) return !((String) value).isEmpty();
        if (value instanceof Number) return ((Number) value).doubleValue() != 0;
        return true; // JS: [] and {} are truthy
    }

    static String to_string(Object value) {
        if (value == null) return "null";
        if (value instanceof Boolean) return ((Boolean) value) ? "true" : "false";
        if (value instanceof Double || value instanceof Float) {
            double d = ((Number) value).doubleValue();
            if (d == Math.rint(d) && !Double.isInfinite(d)) return Long.toString((long) d);
            return Double.toString(d);
        }
        if (value instanceof Number) return value.toString();
        if (value instanceof String) return (String) value;
        if (value instanceof List) {
            StringBuilder builder = new StringBuilder("[");
            List<?> list = (List<?>) value;
            for (int i = 0; i < list.size(); i++) {
                if (i > 0) builder.append(",");
                builder.append(to_string(list.get(i)));
            }
            return builder.append("]").toString();
        }
        if (value instanceof Map) {
            StringBuilder builder = new StringBuilder("{");
            boolean first = true;
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
                if (!first) builder.append(",");
                first = false;
                builder.append("\"").append(entry.getKey()).append("\":").append(to_string(entry.getValue()));
            }
            return builder.append("}").toString();
        }
        return value.toString();
    }

    static boolean value_equals(Object left, Object right) {
        if (left instanceof Number && right instanceof Number) {
            return ((Number) left).doubleValue() == ((Number) right).doubleValue();
        }
        return Objects.equals(left, right);
    }

    static boolean value_not_equals(Object left, Object right) { return !value_equals(left, right); }

    static boolean gt(Object a, Object b) { return toDouble(a) > toDouble(b); }
    static boolean lt(Object a, Object b) { return toDouble(a) < toDouble(b); }
    static boolean gte(Object a, Object b) { return toDouble(a) >= toDouble(b); }
    static boolean lte(Object a, Object b) { return toDouble(a) <= toDouble(b); }

    static Object add(Object a, Object b) { return toDouble(a) + toDouble(b); }
    static Object sub(Object a, Object b) { return toDouble(a) - toDouble(b); }
    static Object mul(Object a, Object b) { return toDouble(a) * toDouble(b); }
    static Object div(Object a, Object b) { return toDouble(a) / toDouble(b); }
    static Object mod(Object a, Object b) { return toDouble(a) % toDouble(b); }

    /** Boolean connectives. LT only uses these as conditions, so returning a
     *  `boolean` (rather than JS's operand-returning `||`/`&&`) is correct and lets
     *  them appear directly in a Java `if`/`while`. */
    static boolean or(Object a, Object b) { return truthy(a) || truthy(b); }
    static boolean and(Object a, Object b) { return truthy(a) && truthy(b); }
    static boolean xor(Object a, Object b) { return truthy(a) != truthy(b); }
    static boolean not(Object a) { return !truthy(a); }
    static Object bitAnd(Object a, Object b) { return (double) (((long) toDouble(a)) & ((long) toDouble(b))); }
    static Object bitOr(Object a, Object b) { return (double) (((long) toDouble(a)) | ((long) toDouble(b))); }
    static Object shl(Object a, Object b) { return (double) (((long) toDouble(a)) << ((long) toDouble(b))); }
    static Object shr(Object a, Object b) { return (double) (((long) toDouble(a)) >> ((long) toDouble(b))); }

    // ---- containers ----

    static int len(Object value) {
        if (value instanceof String) return ((String) value).length();
        if (value instanceof List) return ((List<?>) value).size();
        if (value instanceof Map) return ((Map<?, ?>) value).size();
        return 0;
    }

    static Object index(Object value, Object key) {
        if (value instanceof List) {
            List<?> list = (List<?>) value;
            int i = toIndex(key);
            return (i >= 0 && i < list.size()) ? list.get(i) : null;
        }
        if (value instanceof String) {
            String text = (String) value;
            int i = toIndex(key);
            return (i >= 0 && i < text.length()) ? String.valueOf(text.charAt(i)) : "";
        }
        return null;
    }

    static Object get(Object value, Object key) {
        if (value instanceof Map) return ((Map<?, ?>) value).get(to_string(key));
        return index(value, key);
    }

    static boolean has(Object value, Object key) {
        if (value instanceof Map) return ((Map<?, ?>) value).containsKey(to_string(key));
        if (value instanceof List) {
            int i = toIndex(key);
            return i >= 0 && i < ((List<?>) value).size();
        }
        return false;
    }

    static Object set(Object value, Object key, Object item) {
        Map<String, Object> out = new LinkedHashMap<>();
        if (value instanceof Map) {
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
                out.put(String.valueOf(entry.getKey()), entry.getValue());
            }
        }
        out.put(to_string(key), item);
        return out;
    }

    static Object merge(Object a, Object b) {
        Map<String, Object> out = new LinkedHashMap<>();
        if (a instanceof Map) {
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) a).entrySet()) {
                out.put(String.valueOf(entry.getKey()), entry.getValue());
            }
        }
        if (b instanceof Map) {
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) b).entrySet()) {
                out.put(String.valueOf(entry.getKey()), entry.getValue());
            }
        }
        return out;
    }

    static Object delete(Object value, Object key) {
        if (!(value instanceof Map)) return value;
        Map<String, Object> out = new LinkedHashMap<>();
        String name = to_string(key);
        for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
            if (!String.valueOf(entry.getKey()).equals(name)) {
                out.put(String.valueOf(entry.getKey()), entry.getValue());
            }
        }
        return out;
    }

    static List<Object> keys(Object value) {
        List<Object> out = new ArrayList<>();
        if (value instanceof Map) {
            for (Object key : ((Map<?, ?>) value).keySet()) out.add(String.valueOf(key));
        }
        return out;
    }

    static List<Object> values(Object value) {
        List<Object> out = new ArrayList<>();
        if (value instanceof Map) out.addAll(((Map<?, ?>) value).values());
        return out;
    }

    static List<Object> entries(Object value) {
        List<Object> out = new ArrayList<>();
        if (value instanceof Map) {
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
                out.add(array(String.valueOf(entry.getKey()), entry.getValue()));
            }
        }
        return out;
    }

    /** Iterate an LT array value (used by `forEach`). */
    static List<Object> items(Object value) {
        if (value instanceof List) {
            return new ArrayList<>(((List<?>) value));
        }
        return new ArrayList<>();
    }

    // ---- strings ----

    static String str_concat(Object a, Object b) { return to_string(a) + to_string(b); }
    static String to_upper(Object value) { return to_string(value).toUpperCase(); }
    static String to_lower(Object value) { return to_string(value).toLowerCase(); }
    static String trim(Object value) { return to_string(value).trim(); }
    static String repeat(Object value, Object count) { return to_string(value).repeat(toIndex(count)); }

    static String slice(Object value, Object start, Object end) {
        String text = to_string(value);
        int from = Math.max(0, Math.min(text.length(), toIndex(start)));
        int to = Math.max(from, Math.min(text.length(), toIndex(end)));
        return text.substring(from, to);
    }

    static String replace(Object value, Object search, Object replacement) {
        return to_string(value).replace(to_string(search), to_string(replacement));
    }

    static List<Object> split(Object value, Object separator) {
        String text = to_string(value);
        String sep = to_string(separator);
        List<Object> out = new ArrayList<>();
        if (sep.isEmpty()) {
            for (int i = 0; i < text.length(); i++) out.add(String.valueOf(text.charAt(i)));
            return out;
        }
        out.addAll(Arrays.asList((Object[]) text.split(java.util.regex.Pattern.quote(sep), -1)));
        return out;
    }

    static boolean contains(Object value, Object item) {
        if (value instanceof String) return ((String) value).contains(to_string(item));
        if (value instanceof List) return ((List<?>) value).contains(item);
        return false;
    }

    static String char_at(Object value, Object index) {
        String text = to_string(value);
        int i = toIndex(index);
        return (i >= 0 && i < text.length()) ? String.valueOf(text.charAt(i)) : "";
    }

    static boolean starts_with(Object value, Object prefix) { return to_string(value).startsWith(to_string(prefix)); }
    static boolean ends_with(Object value, Object suffix) { return to_string(value).endsWith(to_string(suffix)); }

    static String join(Object value, Object separator) {
        String sep = to_string(separator);
        StringBuilder builder = new StringBuilder();
        if (value instanceof List) {
            List<?> list = (List<?>) value;
            for (int i = 0; i < list.size(); i++) {
                if (i > 0) builder.append(sep);
                builder.append(to_string(list.get(i)));
            }
        }
        return builder.toString();
    }

    // ---- arrays ----

    static List<Object> append(Object value, Object item) {
        List<Object> out = items(value);
        out.add(item);
        return out;
    }

    static List<Object> arr_concat(Object a, Object b) {
        List<Object> out = items(a);
        out.addAll(items(b));
        return out;
    }

    static int index_of(Object value, Object item) {
        if (value instanceof List) return ((List<?>) value).indexOf(item);
        return -1;
    }

    static List<Object> reverse(Object value) {
        List<Object> out = items(value);
        java.util.Collections.reverse(out);
        return out;
    }

    static List<Object> sort(Object value) {
        List<Object> out = items(value);
        out.sort((a, b) -> {
            if (a instanceof Number && b instanceof Number) {
                return Double.compare(((Number) a).doubleValue(), ((Number) b).doubleValue());
            }
            return to_string(a).compareTo(to_string(b));
        });
        return out;
    }

    static List<Object> unique(Object value) {
        List<Object> out = new ArrayList<>();
        for (Object item : items(value)) {
            if (!out.contains(item)) out.add(item);
        }
        return out;
    }

    // ---- buffers / lists (mutable, like the C runtime) ----

    static StringBuilder bufNew() { return new StringBuilder(); }

    static StringBuilder bufAppend(Object buffer, Object text) {
        ((StringBuilder) buffer).append(to_string(text));
        return (StringBuilder) buffer;
    }

    static int bufLen(Object buffer) { return ((StringBuilder) buffer).length(); }
    static String bufStr(Object buffer) { return ((StringBuilder) buffer).toString(); }

    static List<Object> listNew() { return new ArrayList<>(); }

    static List<Object> listPush(Object list, Object item) {
        @SuppressWarnings("unchecked")
        List<Object> target = (List<Object>) list;
        target.add(item);
        return target;
    }

    static int listLen(Object list) { return ((List<?>) list).size(); }

    // ---- parse bridge helper ----

    // ---- misc helpers -------

    @SuppressWarnings("unchecked")
    static Map<String, Object> asMap(Object value) { return (Map<String, Object>) value; }

    @SuppressWarnings("unchecked")
    static List<Object> asList(Object value) { return (List<Object>) value; }

    /** A JSON-ish rendering used only in runtime error messages. */
    static String json(Object value) {
        if (value == null) return "null";
        if (value instanceof Boolean) return value.toString();
        if (value instanceof Number) return to_string(value);
        if (value instanceof String) {
            StringBuilder builder = new StringBuilder("\"");
            for (int i = 0; i < ((String) value).length(); i++) {
                char c = ((String) value).charAt(i);
                if (c == '"' || c == '\\') builder.append('\\').append(c);
                else builder.append(c);
            }
            return builder.append("\"").toString();
        }
        if (value instanceof List) {
            StringBuilder builder = new StringBuilder("[");
            List<?> list = (List<?>) value;
            for (int i = 0; i < list.size(); i++) {
                if (i > 0) builder.append(", ");
                builder.append(json(list.get(i)));
            }
            return builder.append("]").toString();
        }
        if (value instanceof Map) {
            StringBuilder builder = new StringBuilder("{");
            boolean first = true;
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
                if (!first) builder.append(", ");
                first = false;
                builder.append(json(String.valueOf(entry.getKey()))).append(": ").append(json(entry.getValue()));
            }
            return builder.append("}").toString();
        }
        return json(to_string(value));
    }

    /** Extract `[string|number|boolean|null, ...]` from the wrapped `{tag: {value}}` params. */
    static List<Object> params(Object value) {
        List<Object> out = new ArrayList<>();
        for (Object entry : items(value)) {
            Object inner = get(entry, "string");
            if (inner == null) inner = get(entry, "number");
            if (inner == null) inner = get(entry, "boolean");
            out.add(inner == null ? null : get(inner, "value"));
        }
        return out;
    }
}
