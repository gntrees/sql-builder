// Lt.swift — the tiny dynamic runtime that Lingua Tungga's Swift emitter targets.
//
// Swift has a universal top type (`Any?`), so LT values are native Swift values:
// String, Int, Double, Bool, nil, [Any?], and the ordered `LtMap`. Deliberately
// Foundation-free (no `NSNumber` bridging surprises, no import needed).

/// Sentinel for "argument not supplied" in generated fluent signatures.
final class LtMissing {}

/// Error type for the (internal) throwing path used to resolve union types.
/// The public method-chain API is non-throwing and turns these into `fatalError`.
enum LtError: Error {
    case message(String)
}

/// Insertion-ordered map (Swift `Dictionary` is unordered).
final class LtMap {
    var entries: [(String, Any?)]

    init(_ entries: [(String, Any?)]) {
        self.entries = entries
    }

    func get(_ key: String) -> Any? {
        for (k, v) in entries where k == key { return v }
        return nil
    }

    func has(_ key: String) -> Bool {
        for (k, _) in entries where k == key { return true }
        return false
    }

    func set(_ key: String, _ value: Any?) {
        for i in 0..<entries.count where entries[i].0 == key {
            entries[i].1 = value
            return
        }
        entries.append((key, value))
    }
}

enum Lt {
    /// Sentinel for "argument not supplied" in generated fluent signatures.
    static let MISSING: Any = LtMissing()

    static func isMissing(_ v: Any?) -> Bool { return v is LtMissing }

    // -------------------------------------------------------------- constructors

    static func nullValue() -> Any? { return nil }
    static func string(_ s: String) -> Any? { return s }
    static func boolean(_ b: Bool) -> Any? { return b }

    static func number(_ n: Double) -> Any? {
        if n.isFinite && n < 9.007199254740992e15 && n > -9.007199254740992e15 && Double(Int(n)) == n {
            return Int(n)
        }
        return n
    }

    static func array(_ items: [Any?]) -> [Any?] { return items }
    static func map(_ entries: [(String, Any?)]) -> LtMap { return LtMap(entries) }

    // ---------------------------------------------------------------- conversion

    static func asString(_ v: Any?) -> String {
        guard let value = v else { return "null" }
        if let b = value as? Bool { return b ? "true" : "false" }
        if let i = value as? Int { return String(i) }
        if let d = value as? Double {
            if d.isFinite && d < 9.007199254740992e15 && d > -9.007199254740992e15 && Double(Int(d)) == d {
                return String(Int(d))
            }
            return String(d)
        }
        if let s = value as? String { return s }
        if let arr = value as? [Any?] {
            return "[" + arr.map { asString($0) }.joined(separator: ",") + "]"
        }
        if let m = value as? LtMap {
            return "{" + m.entries.map { "\"\($0.0)\":\(asString($0.1))" }.joined(separator: ",") + "}"
        }
        return String(describing: value)
    }

    static func toString(_ v: Any?) -> Any? { return asString(v) }

    static func truthy(_ v: Any?) -> Bool {
        guard let value = v else { return false }
        if let b = value as? Bool { return b }
        if let i = value as? Int { return i != 0 }
        if let d = value as? Double { return d != 0 }
        if let s = value as? String { return !s.isEmpty }
        if let arr = value as? [Any?] { return !arr.isEmpty }
        if let m = value as? LtMap { return !m.entries.isEmpty }
        return true
    }

    static func valueEquals(_ a: Any?, _ b: Any?) -> Bool {
        if let x = a as? Bool, let y = b as? Bool { return x == y }
        if let x = a as? Int, let y = b as? Int { return x == y }
        if let x = a as? Int, let y = b as? Double { return Double(x) == y }
        if let x = a as? Double, let y = b as? Int { return x == Double(y) }
        if let x = a as? Double, let y = b as? Double { return x == y }
        if let x = a as? String, let y = b as? String { return x == y }
        if a == nil && b == nil { return true }
        if let x = a as? [Any?], let y = b as? [Any?] {
            if x.count != y.count { return false }
            for i in 0..<x.count where !valueEquals(x[i], y[i]) { return false }
            return true
        }
        if let x = a as? LtMap, let y = b as? LtMap {
            if x.entries.count != y.entries.count { return false }
            for (key, value) in x.entries {
                if !y.has(key) { return false }
                if !valueEquals(value, y.get(key)) { return false }
            }
            return true
        }
        return false
    }

    // --------------------------------------------------------------------- helper

    static func asInt(_ v: Any?) -> Int {
        guard let value = v else { return 0 }
        if let i = value as? Int { return i }
        if let d = value as? Double { return Int(d) }
        if let b = value as? Bool { return b ? 1 : 0 }
        if let s = value as? String { return Int(s) ?? 0 }
        return 0
    }

    // -------------------------------------------------------------------- buffers

    static func bufNew() -> Any? { return [Any?]() }

    static func bufAppend(_ v: Any?, _ x: Any?) -> Any? {
        var out: [Any?] = []
        if let arr = v as? [Any?] { out = arr }
        out.append(x)
        return out
    }

    static func bufLen(_ v: Any?) -> Any? { return len(v) }

    static func bufStr(_ v: Any?) -> Any? {
        if let arr = v as? [Any?] { return arr.map { asString($0) }.joined() }
        return asString(v)
    }

    // ---------------------------------------------------------------------- lists

    static func listNew() -> Any? { return [Any?]() }
    static func listPush(_ v: Any?, _ x: Any?) -> Any? { return bufAppend(v, x) }
    static func listLen(_ v: Any?) -> Any? { return len(v) }
    static func listGet(_ v: Any?, _ i: Any?) -> Any? { return index(v, i) }
    static func listValue(_ v: Any?) -> Any? { return v }

    // ------------------------------------------------------------------ iteration

    static func arrayItems(_ v: Any?) -> [Any?] {
        if let arr = v as? [Any?] { return arr }
        return []
    }

    // --------------------------------------------------------------- string domain

    static func strConcat(_ a: Any?, _ b: Any?) -> Any? { return asString(a) + asString(b) }
    static func strLen(_ a: Any?) -> Any? { return asString(a).count }
    static func toUpper(_ a: Any?) -> Any? { return asString(a).uppercased() }
    static func toLower(_ a: Any?) -> Any? { return asString(a).lowercased() }

    static func trim(_ a: Any?) -> Any? {
        let chars = Array(asString(a))
        let whitespace: Set<Character> = [" ", "\t", "\n", "\r"]
        var start = 0
        var end = chars.count
        while start < end && whitespace.contains(chars[start]) { start += 1 }
        while end > start && whitespace.contains(chars[end - 1]) { end -= 1 }
        return String(chars[start..<end])
    }

    static func slice(_ a: Any?, _ start: Any?, _ end: Any?) -> Any? {
        var s = asInt(start)
        var e = asInt(end)
        if s < 0 { s = 0 }
        if e < 0 { e = 0 }
        if let arr = a as? [Any?] {
            let n = arr.count
            if e > n { e = n }
            if s > e { s = e }
            return Array(arr[s..<e])
        }
        let chars = Array(asString(a))
        let n = chars.count
        if e > n { e = n }
        if s > e { s = e }
        return String(chars[s..<e])
    }

    static func replace(_ a: Any?, _ search: Any?, _ replacement: Any?) -> Any? {
        let chars = Array(asString(a))
        let from = Array(asString(search))
        let to = asString(replacement)
        if from.isEmpty { return String(chars) }
        var out = ""
        var i = 0
        while i < chars.count {
            if i + from.count <= chars.count && Array(chars[i..<(i + from.count)]) == from {
                out += to
                i += from.count
            } else {
                out.append(chars[i])
                i += 1
            }
        }
        return out
    }

    static func split(_ a: Any?, _ separator: Any?) -> Any? {
        let chars = Array(asString(a))
        let sep = Array(asString(separator))
        var out: [Any?] = []
        if sep.isEmpty { return [String(chars)] }
        var current = ""
        var i = 0
        while i < chars.count {
            if i + sep.count <= chars.count && Array(chars[i..<(i + sep.count)]) == sep {
                out.append(current)
                current = ""
                i += sep.count
            } else {
                current.append(chars[i])
                i += 1
            }
        }
        out.append(current)
        return out
    }

    static func contains(_ a: Any?, _ item: Any?) -> Any? {
        if let arr = a as? [Any?] { return arr.contains { valueEquals($0, item) } }
        return asString(a).contains(asString(item))
    }

    static func repeatStr(_ a: Any?, _ count: Any?) -> Any? {
        return String(repeating: asString(a), count: max(0, asInt(count)))
    }

    static func charAt(_ a: Any?, _ i: Any?) -> Any? {
        let chars = Array(asString(a))
        let index = asInt(i)
        if index < 0 || index >= chars.count { return nil }
        return String(chars[index])
    }

    static func startsWith(_ a: Any?, _ prefix: Any?) -> Any? {
        return asString(a).hasPrefix(asString(prefix))
    }

    static func endsWith(_ a: Any?, _ suffix: Any?) -> Any? {
        return asString(a).hasSuffix(asString(suffix))
    }

    // ---------------------------------------------------------------------- arrays

    static func len(_ a: Any?) -> Any? {
        guard let value = a else { return 0 }
        if let arr = value as? [Any?] { return arr.count }
        if let m = value as? LtMap { return m.entries.count }
        if let s = value as? String { return s.count }
        return 0
    }

    static func index(_ a: Any?, _ idx: Any?) -> Any? {
        guard let value = a else { return nil }
        if let arr = value as? [Any?] {
            let i = asInt(idx)
            if i < 0 || i >= arr.count { return nil }
            return arr[i]
        }
        if let s = value as? String { return charAt(s, idx) }
        if let m = value as? LtMap { return m.get(asString(idx)) }
        return nil
    }

    static func append(_ a: Any?, _ item: Any?) -> Any? { return bufAppend(a, item) }

    static func arrConcat(_ a: Any?, _ b: Any?) -> Any? {
        var out: [Any?] = []
        if let x = a as? [Any?] { out += x }
        if let y = b as? [Any?] { out += y }
        return out
    }

    static func join(_ a: Any?, _ separator: Any?) -> Any? {
        guard let arr = a as? [Any?] else { return asString(a) }
        return arr.map { asString($0) }.joined(separator: asString(separator))
    }

    static func reverse(_ a: Any?) -> Any? {
        guard let arr = a as? [Any?] else { return a }
        return Array(arr.reversed())
    }

    static func sort(_ a: Any?) -> Any? {
        guard let arr = a as? [Any?] else { return a }
        return arr.sorted { asString($0) < asString($1) }
    }

    static func unique(_ a: Any?) -> Any? {
        guard let arr = a as? [Any?] else { return a }
        var out: [Any?] = []
        for item in arr where !out.contains(where: { valueEquals($0, item) }) {
            out.append(item)
        }
        return out
    }

    static func indexOf(_ a: Any?, _ item: Any?) -> Any? {
        if let arr = a as? [Any?] {
            for i in 0..<arr.count where valueEquals(arr[i], item) { return i }
        }
        return -1
    }

    // --------------------------------------------------------------------- objects

    static func get(_ a: Any?, _ key: String) -> Any? {
        if let m = a as? LtMap { return m.get(key) }
        return nil
    }

    static func get(_ a: Any?, _ key: Any?) -> Any? { return get(a, asString(key)) }

    static func setValue(_ a: Any?, _ key: Any?, _ value: Any?) -> Any? {
        let k = asString(key)
        var out: [(String, Any?)] = []
        if let m = a as? LtMap {
            for (existing, v) in m.entries where existing != k { out.append((existing, v)) }
        }
        out.append((k, value))
        return LtMap(out)
    }

    static func keys(_ a: Any?) -> Any? {
        guard let m = a as? LtMap else { return [Any?]() }
        return m.entries.map { $0.0 as Any? }
    }

    static func values(_ a: Any?) -> Any? {
        guard let m = a as? LtMap else { return [Any?]() }
        return m.entries.map { $0.1 }
    }

    static func has(_ a: Any?, _ key: Any?) -> Bool {
        if let m = a as? LtMap { return m.has(asString(key)) }
        return false
    }

    static func merge(_ a: Any?, _ b: Any?) -> Any? {
        var out: [(String, Any?)] = []
        if let m = a as? LtMap { out = m.entries }
        if let n = b as? LtMap {
            for (k, v) in n.entries {
                out = out.filter { $0.0 != k }
                out.append((k, v))
            }
        }
        return LtMap(out)
    }

    static func remove(_ a: Any?, _ key: Any?) -> Any? {
        guard let m = a as? LtMap else { return a }
        let k = asString(key)
        return LtMap(m.entries.filter { $0.0 != k })
    }

    static func entries(_ a: Any?) -> Any? {
        guard let m = a as? LtMap else { return [Any?]() }
        return m.entries.map { [$0.0 as Any?, $0.1] as [Any?] }
    }

    // ------------------------------------------------------- method-chain helpers

    /// View a value as its ordered map (schemas are `LtMap`s).
    static func asMap(_ v: Any?) -> LtMap {
        if let m = v as? LtMap { return m }
        return LtMap([])
    }

    /// View a value as a list.
    static func asList(_ v: Any?) -> [Any?] {
        if let arr = v as? [Any?] { return arr }
        return []
    }

    /// Iterate a value as a list (alias of `arrayItems`).
    static func items(_ v: Any?) -> [Any?] { return arrayItems(v) }

    /// A JSON-ish rendering used only in runtime error messages and test drivers.
    static func json(_ v: Any?) -> String {
        guard let value = v else { return "null" }
        if let b = value as? Bool { return b ? "true" : "false" }
        if let i = value as? Int { return String(i) }
        if let d = value as? Double { return asString(d) }
        if let s = value as? String {
            var out = "\""
            for ch in s {
                if ch == "\"" || ch == "\\" { out.append("\\") }
                out.append(ch)
            }
            out += "\""
            return out
        }
        if let arr = value as? [Any?] {
            return "[" + arr.map { json($0) }.joined(separator: ", ") + "]"
        }
        if let m = value as? LtMap {
            return "{" + m.entries.map { json($0.0) + ": " + json($0.1) }.joined(separator: ", ") + "}"
        }
        return json(asString(value))
    }

    // ------------------------------------------------------------------ LT bridge

    /// Bridge helper: unwrap the `{string|number|boolean: {value}}` param entries.
    static func params(_ v: Any?) -> Any? {
        var out: [Any?] = []
        for entry in arrayItems(v) {
            if let s = get(entry, "string") {
                out.append(get(s, "value"))
                continue
            }
            if let n = get(entry, "number") {
                out.append(get(n, "value"))
                continue
            }
            if let b = get(entry, "boolean") {
                out.append(get(b, "value"))
                continue
            }
            out.append(nil)
        }
        return out
    }
}
