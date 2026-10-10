// lt.hpp — the tiny dynamic runtime that Lingua Tungga's C++ emitter targets.
//
// C++ has no universal type, so every LT value is an `lt::Value` variant struct.
// This is the C++ counterpart of the Rust `lt.rs` runtime, but without any
// ownership/borrow machinery: C++ copies by default, so read and "move"
// manipulations look the same.
#pragma once

struct Structure;  // forward declaration (defined by the generated project)

#include <algorithm>
#include <cmath>
#include <functional>
#include <map>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace lt {

struct Value {
    enum class Kind { Null, Bool, Int, Float, Str, Array, Map, Structure };

    Kind kind = Kind::Null;
    bool boolean = false;
    long long integer = 0;
    double number = 0;
    std::string text;
    std::vector<Value> items;
    std::vector<std::pair<std::string, Value>> entries;
    Structure* structure = nullptr;  // set for Kind::Structure (a builder argument)
};

using Fn = std::function<Value(std::vector<Value>)>;
using Fns = std::map<std::string, Fn>;

// Forward declarations (defined below, used earlier by the buffer/list helpers).
inline Value len(const Value& a);
inline Value index(const Value& a, const Value& idx);

// ---------------------------------------------------------------- constructors

inline Value null() { return Value{}; }

inline Value boolean(bool b) {
    Value v;
    v.kind = Value::Kind::Bool;
    v.boolean = b;
    return v;
}

inline Value number(double n) {
    Value v;
    if (std::isfinite(n) && n == std::floor(n) && std::abs(n) < 9.007199254740992e15) {
        v.kind = Value::Kind::Int;
        v.integer = static_cast<long long>(n);
    } else {
        v.kind = Value::Kind::Float;
        v.number = n;
    }
    return v;
}

inline Value string(const std::string& s) {
    Value v;
    v.kind = Value::Kind::Str;
    v.text = s;
    return v;
}

inline Value array(std::vector<Value> items) {
    Value v;
    v.kind = Value::Kind::Array;
    v.items = std::move(items);
    return v;
}

inline Value map(std::vector<std::pair<std::string, Value>> entries) {
    Value v;
    v.kind = Value::Kind::Map;
    v.entries = std::move(entries);
    return v;
}

inline Value structure(Structure* s) {
    Value v;
    v.kind = Value::Kind::Structure;
    v.structure = s;
    return v;
}

// ------------------------------------------------------------------ conversion

inline std::string as_string(const Value& v) {
    switch (v.kind) {
        case Value::Kind::Null:
            return "null";
        case Value::Kind::Bool:
            return v.boolean ? "true" : "false";
        case Value::Kind::Int:
            return std::to_string(v.integer);
        case Value::Kind::Float: {
            std::ostringstream oss;
            oss << v.number;
            std::string s = oss.str();
            if (s.find('.') == std::string::npos && s.find('e') == std::string::npos && s.find('E') == std::string::npos) {
                s += ".0";
            }
            return s;
        }
        case Value::Kind::Str:
            return v.text;
        case Value::Kind::Array: {
            std::string out = "[";
            for (std::size_t i = 0; i < v.items.size(); i++) {
                if (i) out += ",";
                out += as_string(v.items[i]);
            }
            return out + "]";
        }
        case Value::Kind::Map: {
            std::string out = "{";
            for (std::size_t i = 0; i < v.entries.size(); i++) {
                if (i) out += ",";
                out += "\"" + v.entries[i].first + "\":" + as_string(v.entries[i].second);
            }
            return out + "}";
        }
    }
    return "null";
}

inline Value to_string(const Value& v) { return string(as_string(v)); }

inline bool truthy(const Value& v) {
    switch (v.kind) {
        case Value::Kind::Null:
            return false;
        case Value::Kind::Bool:
            return v.boolean;
        case Value::Kind::Int:
            return v.integer != 0;
        case Value::Kind::Float:
            return v.number != 0;
        case Value::Kind::Str:
            return !v.text.empty();
        case Value::Kind::Array:
            return !v.items.empty();
        case Value::Kind::Map:
            return !v.entries.empty();
    }
    return false;
}

inline bool value_equals(const Value& a, const Value& b) {
    if (a.kind == Value::Kind::Int && b.kind == Value::Kind::Float) return static_cast<double>(a.integer) == b.number;
    if (a.kind == Value::Kind::Float && b.kind == Value::Kind::Int) return a.number == static_cast<double>(b.integer);
    if (a.kind != b.kind) return false;
    switch (a.kind) {
        case Value::Kind::Null:
            return true;
        case Value::Kind::Bool:
            return a.boolean == b.boolean;
        case Value::Kind::Int:
            return a.integer == b.integer;
        case Value::Kind::Float:
            return a.number == b.number;
        case Value::Kind::Str:
            return a.text == b.text;
        case Value::Kind::Array:
            if (a.items.size() != b.items.size()) return false;
            for (std::size_t i = 0; i < a.items.size(); i++) {
                if (!value_equals(a.items[i], b.items[i])) return false;
            }
            return true;
        case Value::Kind::Map:
            if (a.entries.size() != b.entries.size()) return false;
            for (const auto& entry : a.entries) {
                bool found = false;
                for (const auto& other : b.entries) {
                    if (other.first == entry.first) {
                        found = value_equals(entry.second, other.second);
                        break;
                    }
                }
                if (!found) return false;
            }
            return true;
    }
    return false;
}

// ----------------------------------------------------------------------- helper

inline long long as_i64(const Value& v) {
    switch (v.kind) {
        case Value::Kind::Int:
            return v.integer;
        case Value::Kind::Float:
            return static_cast<long long>(v.number);
        case Value::Kind::Bool:
            return v.boolean ? 1 : 0;
        case Value::Kind::Str: {
            try {
                return std::stoll(v.text);
            } catch (...) {
                return 0;
            }
        }
        default:
            return 0;
    }
}

// --------------------------------------------------------------------- buffers

inline Value buf_new() { return array({}); }

inline Value buf_append(const Value& v, const Value& x) {
    if (v.kind == Value::Kind::Array) {
        std::vector<Value> out = v.items;
        out.push_back(x);
        return array(std::move(out));
    }
    return array({x});
}

inline Value buf_len(const Value& v) { return len(v); }

inline Value buf_str(const Value& v) {
    if (v.kind == Value::Kind::Array) {
        std::string out;
        for (const auto& item : v.items) out += as_string(item);
        return string(out);
    }
    return string(as_string(v));
}

// ----------------------------------------------------------------------- lists

inline Value list_new() { return array({}); }
inline Value list_push(const Value& v, const Value& x) { return buf_append(v, x); }
inline Value list_len(const Value& v) { return len(v); }
inline Value list_get(const Value& v, const Value& i) { return index(v, i); }
inline Value list_value(const Value& v) { return v; }

// ------------------------------------------------------------------- iteration

inline std::vector<Value> array_items(const Value& v) {
    return v.kind == Value::Kind::Array ? v.items : std::vector<Value>{};
}

// ------------------------------------------------------------------ string domain

inline Value str_concat(const Value& a, const Value& b) { return string(as_string(a) + as_string(b)); }
inline Value str_len(const Value& a) { return number(static_cast<double>(as_string(a).size())); }
inline Value to_upper(const Value& a) {
    std::string s = as_string(a);
    std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c) { return static_cast<char>(std::toupper(c)); });
    return string(s);
}
inline Value to_lower(const Value& a) {
    std::string s = as_string(a);
    std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
    return string(s);
}
inline Value trim(const Value& a) {
    std::string s = as_string(a);
    std::size_t start = s.find_first_not_of(" \t\n\r");
    std::size_t end = s.find_last_not_of(" \t\n\r");
    return string(start == std::string::npos ? "" : s.substr(start, end - start + 1));
}
inline Value replace(const Value& a, const Value& search, const Value& replacement) {
    std::string s = as_string(a);
    const std::string from = as_string(search);
    const std::string to = as_string(replacement);
    if (from.empty()) return string(s);
    std::string out;
    std::size_t pos = 0;
    while (true) {
        std::size_t hit = s.find(from, pos);
        if (hit == std::string::npos) {
            out += s.substr(pos);
            break;
        }
        out += s.substr(pos, hit - pos);
        out += to;
        pos = hit + from.size();
    }
    return string(out);
}
inline Value split(const Value& a, const Value& separator) {
    std::string s = as_string(a);
    const std::string sep = as_string(separator);
    std::vector<Value> out;
    if (sep.empty()) {
        out.push_back(string(s));
        return array(std::move(out));
    }
    std::size_t pos = 0;
    while (true) {
        std::size_t hit = s.find(sep, pos);
        if (hit == std::string::npos) {
            out.push_back(string(s.substr(pos)));
            break;
        }
        out.push_back(string(s.substr(pos, hit - pos)));
        pos = hit + sep.size();
    }
    return array(std::move(out));
}
inline Value contains(const Value& a, const Value& item) {
    if (a.kind == Value::Kind::Array) {
        for (const auto& x : a.items) {
            if (value_equals(x, item)) return boolean(true);
        }
        return boolean(false);
    }
    return boolean(as_string(a).find(as_string(item)) != std::string::npos);
}
inline Value repeat(const Value& a, const Value& count) {
    std::string s = as_string(a);
    long long n = as_i64(count);
    std::string out;
    for (long long i = 0; i < n; i++) out += s;
    return string(out);
}
inline Value char_at(const Value& a, const Value& i) {
    std::string s = as_string(a);
    long long index_value = as_i64(i);
    if (index_value < 0 || static_cast<std::size_t>(index_value) >= s.size()) return null();
    return string(s.substr(static_cast<std::size_t>(index_value), 1));
}
inline Value starts_with(const Value& a, const Value& prefix) {
    const std::string s = as_string(a);
    const std::string p = as_string(prefix);
    return boolean(s.size() >= p.size() && s.compare(0, p.size(), p) == 0);
}
inline Value ends_with(const Value& a, const Value& suffix) {
    const std::string s = as_string(a);
    const std::string p = as_string(suffix);
    return boolean(s.size() >= p.size() && s.compare(s.size() - p.size(), p.size(), p) == 0);
}
inline Value slice(const Value& a, const Value& start, const Value& end) {
    long long s = as_i64(start);
    long long e = as_i64(end);
    if (s < 0) s = 0;
    if (e < 0) e = 0;
    if (a.kind == Value::Kind::Array) {
        long long n = static_cast<long long>(a.items.size());
        if (e > n) e = n;
        if (s > e) s = e;
        return array(std::vector<Value>(a.items.begin() + s, a.items.begin() + e));
    }
    std::string text = as_string(a);
    long long n = static_cast<long long>(text.size());
    if (e > n) e = n;
    if (s > e) s = e;
    return string(text.substr(static_cast<std::size_t>(s), static_cast<std::size_t>(e - s)));
}

// -------------------------------------------------------------------- arrays

inline Value len(const Value& a) {
    switch (a.kind) {
        case Value::Kind::Array:
            return number(static_cast<double>(a.items.size()));
        case Value::Kind::Map:
            return number(static_cast<double>(a.entries.size()));
        case Value::Kind::Str:
            return number(static_cast<double>(a.text.size()));
        default:
            return number(0);
    }
}
inline Value index(const Value& a, const Value& idx) {
    if (a.kind == Value::Kind::Array) {
        long long i = as_i64(idx);
        if (i < 0 || static_cast<std::size_t>(i) >= a.items.size()) return null();
        return a.items[static_cast<std::size_t>(i)];
    }
    if (a.kind == Value::Kind::Str) return char_at(a, idx);
    if (a.kind == Value::Kind::Map) {
        const std::string key = as_string(idx);
        for (const auto& entry : a.entries) {
            if (entry.first == key) return entry.second;
        }
    }
    return null();
}
inline Value append(const Value& a, const Value& item) { return buf_append(a, item); }
inline Value arr_concat(const Value& a, const Value& b) {
    std::vector<Value> out;
    if (a.kind == Value::Kind::Array) out = a.items;
    if (b.kind == Value::Kind::Array) out.insert(out.end(), b.items.begin(), b.items.end());
    return array(std::move(out));
}
inline Value join(const Value& a, const Value& separator) {
    const std::string sep = as_string(separator);
    if (a.kind != Value::Kind::Array) return string(as_string(a));
    std::string out;
    for (std::size_t i = 0; i < a.items.size(); i++) {
        if (i) out += sep;
        out += as_string(a.items[i]);
    }
    return string(out);
}
inline Value reverse(const Value& a) {
    if (a.kind != Value::Kind::Array) return a;
    std::vector<Value> out = a.items;
    std::reverse(out.begin(), out.end());
    return array(std::move(out));
}
inline Value sort(const Value& a) {
    if (a.kind != Value::Kind::Array) return a;
    std::vector<Value> out = a.items;
    std::sort(out.begin(), out.end(), [](const Value& x, const Value& y) { return as_string(x) < as_string(y); });
    return array(std::move(out));
}
inline Value unique(const Value& a) {
    if (a.kind != Value::Kind::Array) return a;
    std::vector<Value> out;
    for (const auto& item : a.items) {
        bool seen = false;
        for (const auto& x : out) {
            if (value_equals(x, item)) {
                seen = true;
                break;
            }
        }
        if (!seen) out.push_back(item);
    }
    return array(std::move(out));
}
inline Value index_of(const Value& a, const Value& item) {
    if (a.kind == Value::Kind::Array) {
        for (std::size_t i = 0; i < a.items.size(); i++) {
            if (value_equals(a.items[i], item)) return number(static_cast<double>(i));
        }
    }
    return number(-1);
}

// --------------------------------------------------------------------- objects

inline Value get(const Value& a, const std::string& key) {
    if (a.kind == Value::Kind::Map) {
        for (const auto& entry : a.entries) {
            if (entry.first == key) return entry.second;
        }
    }
    return null();
}
inline Value get(const Value& a, const Value& key) { return get(a, as_string(key)); }

inline Value set(const Value& a, const Value& key, const Value& value) {
    const std::string k = as_string(key);
    std::vector<std::pair<std::string, Value>> out;
    if (a.kind == Value::Kind::Map) {
        for (const auto& entry : a.entries) {
            if (entry.first != k) out.push_back(entry);
        }
    }
    out.push_back({k, value});
    return map(std::move(out));
}
inline Value keys(const Value& a) {
    std::vector<Value> out;
    if (a.kind == Value::Kind::Map) {
        for (const auto& entry : a.entries) out.push_back(string(entry.first));
    }
    return array(std::move(out));
}
inline Value values(const Value& a) {
    std::vector<Value> out;
    if (a.kind == Value::Kind::Map) {
        for (const auto& entry : a.entries) out.push_back(entry.second);
    }
    return array(std::move(out));
}
inline Value has(const Value& a, const Value& key) {
    const std::string k = as_string(key);
    if (a.kind == Value::Kind::Map) {
        for (const auto& entry : a.entries) {
            if (entry.first == k) return boolean(true);
        }
    }
    return boolean(false);
}
inline Value merge(const Value& a, const Value& b) {
    std::vector<std::pair<std::string, Value>> out;
    if (a.kind == Value::Kind::Map) out = a.entries;
    if (b.kind == Value::Kind::Map) {
        for (const auto& entry : b.entries) {
            out.erase(std::remove_if(out.begin(), out.end(), [&](const std::pair<std::string, Value>& existing) { return existing.first == entry.first; }), out.end());
            out.push_back(entry);
        }
    }
    return map(std::move(out));
}
inline Value remove(const Value& a, const Value& key) {
    const std::string k = as_string(key);
    if (a.kind != Value::Kind::Map) return a;
    std::vector<std::pair<std::string, Value>> out;
    for (const auto& entry : a.entries) {
        if (entry.first != k) out.push_back(entry);
    }
    return map(std::move(out));
}
inline Value entries(const Value& a) {
    std::vector<Value> out;
    if (a.kind == Value::Kind::Map) {
        for (const auto& entry : a.entries) out.push_back(array({string(entry.first), entry.second}));
    }
    return array(std::move(out));
}

// ------------------------------------------------------------------- functions

inline Value call(const Fns& fns, const std::string& name, std::vector<Value> args) {
    auto it = fns.find(name);
    if (it == fns.end()) return null();
    return it->second(std::move(args));
}

// ------------------------------------------------------------------- LT bridge

/// Bridge helper: unwrap the `{string|number|boolean: {value}}` param entries.
inline Value params(const Value& v) {
    std::vector<Value> out;
    for (const auto& entry : array_items(v)) {
        Value s = get(entry, "string");
        if (s.kind != Value::Kind::Null) {
            out.push_back(get(s, "value"));
            continue;
        }
        Value n = get(entry, "number");
        if (n.kind != Value::Kind::Null) {
            out.push_back(get(n, "value"));
            continue;
        }
        Value b = get(entry, "boolean");
        if (b.kind != Value::Kind::Null) {
            out.push_back(get(b, "value"));
            continue;
        }
        out.push_back(null());
    }
    return array(std::move(out));
}

}  // namespace lt
