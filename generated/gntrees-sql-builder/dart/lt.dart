// lt.dart — the tiny dynamic runtime that Lingua Tungga's Dart emitter targets.
//
// Dart has a universal top type (`dynamic`), so LT values are native Dart
// values: String, int, double, bool, null, List<dynamic>, and
// Map<String, dynamic> (insertion-ordered, since Dart's default map is a
// LinkedHashMap). This is the Dart counterpart of the Kotlin `Lt.kt` runtime.
//
// Dart has no `object` singleton, so the helpers live on a `class Lt` with
// static members — the `Lt.foo(...)` call sites therefore match the Kotlin
// recipe verbatim.

/// Error thrown by the generated runtime. Carries a message (Dart's built-in
/// `Exception` has none) so union resolution can collect the per-type reasons.
class LtError implements Exception {
  final String message;
  LtError(this.message);
  @override
  String toString() => message;
}

class Lt {
  /// Sentinel for "argument not supplied" in generated fluent signatures.
  static final Object MISSING = Object();

  static bool isMissing(Object? v) => identical(v, MISSING);

  // ------------------------------------------------------------- constructors

  static dynamic nullValue() => null;

  static dynamic string(String s) => s;

  static dynamic boolean(bool b) => b;

  /// Normalize a number. `int` and `double` are distinct in Dart, so an
  /// integral double collapses to an `int` (which keeps `asString` honest:
  /// `10.0` must render `"10"`, exactly like TypeScript).
  static dynamic number(num n) {
    final d = n.toDouble();
    if (d.isFinite && d == d.floorToDouble() && d.abs() < 9.007199254740992e15) {
      return d.toInt();
    }
    return d;
  }

  static List<dynamic> array(List<dynamic> items) => List<dynamic>.from(items);

  /// Build an insertion-ordered `Map<String, dynamic>`. The generator emits map
  /// literals (`Lt.map({"k": v})`), so the entries arrive as a `Map`.
  static Map<String, dynamic> map(Map<dynamic, dynamic> entries) {
    final out = <String, dynamic>{};
    entries.forEach((key, value) => out[asString(key)] = value);
    return out;
  }

  // --------------------------------------------------------------- conversion

  static String asString(Object? v) {
    if (v == null) return "null";
    if (v is bool) return v ? "true" : "false";
    if (v is int) return v.toString();
    if (v is double) {
      // Integral doubles render without the trailing `.0` (TypeScript parity).
      if (v.isFinite && v == v.floorToDouble() && v.abs() < 9.007199254740992e15) {
        return v.toInt().toString();
      }
      return v.toString();
    }
    if (v is String) return v;
    if (v is List) return "[" + v.map((x) => asString(x)).join(",") + "]";
    if (v is Map) {
      return "{" + v.entries.map((e) => "\"${e.key}\":${asString(e.value)}").join(",") + "}";
    }
    return v.toString();
  }

  // NOTE: no `toString` helper — a static `toString` would clash with
  // `Object.toString`. Emitters and runtime code call `asString` instead.

  static bool truthy(Object? v) {
    if (v == null) return false;
    if (v is bool) return v;
    if (v is int) return v != 0;
    if (v is double) return v != 0.0;
    if (v is String) return v.isNotEmpty;
    if (v is List) return v.isNotEmpty;
    if (v is Map) return v.isNotEmpty;
    return true;
  }

  static bool valueEquals(Object? a, Object? b) {
    if (a is num && b is num) return a.toDouble() == b.toDouble();
    if (a is List && b is List) {
      if (a.length != b.length) return false;
      for (var i = 0; i < a.length; i++) {
        if (!valueEquals(a[i], b[i])) return false;
      }
      return true;
    }
    if (a is Map && b is Map) {
      if (a.length != b.length) return false;
      for (final entry in a.entries) {
        if (!b.containsKey(entry.key)) return false;
        if (!valueEquals(entry.value, b[entry.key])) return false;
      }
      return true;
    }
    return a == b;
  }

  // ------------------------------------------------------------------- helper

  static int asLong(Object? v) {
    if (v is int) return v;
    if (v is double) return v.toInt();
    if (v is bool) return v ? 1 : 0;
    if (v is String) return int.tryParse(v) ?? 0;
    return 0;
  }

  // ------------------------------------------------------------------ buffers

  static dynamic bufNew() => <dynamic>[];

  static dynamic bufAppend(Object? v, Object? x) {
    final out = <dynamic>[];
    if (v is List) out.addAll(v);
    out.add(x);
    return out;
  }

  static dynamic bufLen(Object? v) => len(v);

  static dynamic bufStr(Object? v) => v is List ? v.map((x) => asString(x)).join("") : asString(v);

  // -------------------------------------------------------------------- lists

  static dynamic listNew() => <dynamic>[];
  static dynamic listPush(Object? v, Object? x) => bufAppend(v, x);
  static dynamic listLen(Object? v) => len(v);
  static dynamic listGet(Object? v, Object? i) => index(v, i);
  static dynamic listValue(Object? v) => v;

  // ---------------------------------------------------------------- iteration

  static List<dynamic> arrayItems(Object? v) => v is List ? List<dynamic>.from(v) : <dynamic>[];

  // ------------------------------------------------------------- string domain

  static dynamic strConcat(Object? a, Object? b) => asString(a) + asString(b);
  static dynamic strLen(Object? a) => asString(a).length;
  static dynamic toUpper(Object? a) => asString(a).toUpperCase();
  static dynamic toLower(Object? a) => asString(a).toLowerCase();
  static dynamic trim(Object? a) => asString(a).trim();

  static dynamic slice(Object? a, Object? start, Object? end) {
    var s = asLong(start);
    var e = asLong(end);
    if (s < 0) s = 0;
    if (e < 0) e = 0;
    if (a is List) {
      final n = a.length;
      if (e > n) e = n;
      if (s > e) s = e;
      return a.sublist(s, e);
    }
    final text = asString(a);
    final n = text.length;
    if (e > n) e = n;
    if (s > e) s = e;
    return text.substring(s, e);
  }

  static dynamic replace(Object? a, Object? search, Object? replacement) =>
      asString(a).replaceAll(asString(search), asString(replacement));

  static dynamic split(Object? a, Object? separator) {
    final sep = asString(separator);
    if (sep.isEmpty) return <dynamic>[asString(a)];
    return asString(a).split(sep);
  }

  static dynamic contains(Object? a, Object? item) {
    if (a is List) return a.any((x) => valueEquals(x, item));
    return asString(a).contains(asString(item));
  }

  static dynamic repeat(Object? a, Object? count) {
    final n = asLong(count);
    return asString(a) * (n < 0 ? 0 : n);
  }

  static dynamic charAt(Object? a, Object? i) {
    final text = asString(a);
    final indexValue = asLong(i);
    if (indexValue < 0 || indexValue >= text.length) return null;
    return text.substring(indexValue, indexValue + 1);
  }

  static dynamic startsWith(Object? a, Object? prefix) => asString(a).startsWith(asString(prefix));
  static dynamic endsWith(Object? a, Object? suffix) => asString(a).endsWith(asString(suffix));

  // -------------------------------------------------------------------- arrays

  static dynamic len(Object? a) {
    if (a is List) return a.length;
    if (a is Map) return a.length;
    if (a is String) return a.length;
    return 0;
  }

  static dynamic index(Object? a, Object? idx) {
    if (a is List) {
      final i = asLong(idx);
      if (i < 0 || i >= a.length) return null;
      return a[i];
    }
    if (a is String) return charAt(a, idx);
    if (a is Map) return a[asString(idx)];
    return null;
  }

  static dynamic append(Object? a, Object? item) => bufAppend(a, item);

  static dynamic arrConcat(Object? a, Object? b) {
    final out = <dynamic>[];
    if (a is List) out.addAll(a);
    if (b is List) out.addAll(b);
    return out;
  }

  static dynamic join(Object? a, Object? separator) {
    if (a is! List) return asString(a);
    return a.map((x) => asString(x)).join(asString(separator));
  }

  static dynamic reverse(Object? a) {
    if (a is! List) return a;
    return List<dynamic>.from(a).reversed.toList();
  }

  static dynamic sort(Object? a) {
    if (a is! List) return a;
    final out = List<dynamic>.from(a);
    out.sort((x, y) => asString(x).compareTo(asString(y)));
    return out;
  }

  static dynamic unique(Object? a) {
    if (a is! List) return a;
    final out = <dynamic>[];
    for (final item in a) {
      if (!out.any((x) => valueEquals(x, item))) out.add(item);
    }
    return out;
  }

  static dynamic indexOf(Object? a, Object? item) {
    if (a is List) {
      for (var i = 0; i < a.length; i++) {
        if (valueEquals(a[i], item)) return i;
      }
    }
    return -1;
  }

  // ------------------------------------------------------------------- objects

  static dynamic get(Object? a, Object? key) {
    if (a is Map) return a[asString(key)];
    return null;
  }

  static dynamic set(Object? a, Object? key, Object? value) {
    final out = <String, dynamic>{};
    if (a is Map) {
      a.forEach((k, v) {
        if (k != key) out["$k"] = v;
      });
    }
    out[asString(key)] = value;
    return out;
  }

  static dynamic keys(Object? a) {
    final out = <dynamic>[];
    if (a is Map) {
      for (final key in a.keys) {
        out.add("$key");
      }
    }
    return out;
  }

  static dynamic values(Object? a) {
    final out = <dynamic>[];
    if (a is Map) out.addAll(a.values);
    return out;
  }

  static bool has(Object? a, Object? key) => (a is Map) && a.containsKey(asString(key));

  static dynamic merge(Object? a, Object? b) {
    final out = <String, dynamic>{};
    if (a is Map) a.forEach((k, v) => out["$k"] = v);
    if (b is Map) b.forEach((k, v) => out["$k"] = v);
    return out;
  }

  static dynamic remove(Object? a, Object? key) {
    if (a is! Map) return a;
    final out = <String, dynamic>{};
    a.forEach((k, v) {
      if (k != key) out["$k"] = v;
    });
    return out;
  }

  static dynamic entries(Object? a) {
    final out = <dynamic>[];
    if (a is Map) {
      a.forEach((k, v) {
        out.add(<dynamic>["$k", v]);
      });
    }
    return out;
  }

  // ------------------------------------------------------- method-chain helpers

  /// View a value as a mutable map (schemas are `Map<String, dynamic>`s).
  /// Returns the *same* map when possible so callers can mutate it in place
  /// (mirrors Kotlin's `Lt.asMap`).
  static Map<String, dynamic> asMap(Object? v) {
    if (v is Map<String, dynamic>) return v;
    if (v is Map) {
      final out = <String, dynamic>{};
      v.forEach((k, value) => out[asString(k)] = value);
      return out;
    }
    return <String, dynamic>{};
  }

  /// View a value as a mutable list (schema `values` are `List<dynamic>`s).
  static List<dynamic> asList(Object? v) {
    if (v is List<dynamic>) return v;
    if (v is List) return List<dynamic>.from(v);
    return <dynamic>[];
  }

  /// Iterate a value as a list (alias of `arrayItems`).
  static List<dynamic> items(Object? v) => arrayItems(v);

  /// A JSON-ish rendering used only in runtime error messages (and the parity
  /// driver). Whitespace after `,`/`:` mirrors the Kotlin runtime; `JSON.parse`
  /// on the receiving side does not care.
  static String json(Object? v) {
    if (v == null) return "null";
    if (v is bool) return v ? "true" : "false";
    if (v is num) return asString(v);
    if (v is String) return "\"" + v.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"") + "\"";
    if (v is List) return "[" + v.map((x) => json(x)).join(", ") + "]";
    if (v is Map) {
      return "{" + v.entries.map((e) => json(asString(e.key)) + ": " + json(e.value)).join(", ") + "}";
    }
    return json(asString(v));
  }

  // ------------------------------------------------------------------ LT bridge

  /// Bridge helper: unwrap the `{string|number|boolean: {value}}` param entries.
  static dynamic params(Object? v) {
    final out = <dynamic>[];
    for (final entry in arrayItems(v)) {
      final s = get(entry, "string");
      if (s != null) {
        out.add(get(s, "value"));
        continue;
      }
      final n = get(entry, "number");
      if (n != null) {
        out.add(get(n, "value"));
        continue;
      }
      final b = get(entry, "boolean");
      if (b != null) {
        out.add(get(b, "value"));
        continue;
      }
      out.add(null);
    }
    return out;
  }
}
