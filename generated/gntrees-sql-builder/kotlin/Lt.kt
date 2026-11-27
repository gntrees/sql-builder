// Lt.kt — the tiny dynamic runtime that Lingua Tungga's Kotlin emitter targets.
//
// Kotlin has a universal top type (`Any?`), so LT values are native Kotlin
// values: String, Long, Double, Boolean, null, List<Any?>, and LinkedHashMap
// (insertion-ordered). This is the Kotlin counterpart of the Go `lt.go` runtime.

object Lt {
    /** Sentinel for "argument not supplied" in generated fluent signatures. */
    val MISSING: Any = Any()

    fun nullValue(): Any? = null

    fun string(s: String): Any? = s

    fun boolean(b: Boolean): Any? = b

    fun number(n: Number): Any? {
        val d = n.toDouble()
        return if (d.isFinite() && d == Math.floor(d) && Math.abs(d) < 9.007199254740992E15) d.toLong() else d
    }

    fun array(items: List<Any?>): MutableList<Any?> = ArrayList(items)

    fun map(entries: List<Pair<String, Any?>>): MutableMap<String, Any?> {
        val out = LinkedHashMap<String, Any?>()
        for ((key, value) in entries) out[key] = value
        return out
    }

    // --------------------------------------------------------------- conversion

    fun asString(v: Any?): String = when (v) {
        null -> "null"
        is Boolean -> v.toString()
        is Long -> v.toString()
        is Int -> v.toString()
        is Double -> {
            if (v.isFinite() && v == Math.floor(v) && Math.abs(v) < 9.007199254740992E15) v.toLong().toString()
            else v.toString()
        }
        is String -> v
        is List<*> -> "[" + v.joinToString(",") { asString(it) } + "]"
        is Map<*, *> -> "{" + v.entries.joinToString(",") { "\"${it.key}\":${asString(it.value)}" } + "}"
        else -> v.toString()
    }

    fun toString(v: Any?): Any? = asString(v)

    fun truthy(v: Any?): Boolean = when (v) {
        null -> false
        is Boolean -> v
        is Long -> v != 0L
        is Int -> v != 0
        is Double -> v != 0.0
        is String -> v.isNotEmpty()
        is List<*> -> v.isNotEmpty()
        is Map<*, *> -> v.isNotEmpty()
        else -> true
    }

    fun valueEquals(a: Any?, b: Any?): Boolean {
        if (a is Number && b is Number) return a.toDouble() == b.toDouble()
        if (a is List<*> && b is List<*>) {
            if (a.size != b.size) return false
            for (i in a.indices) if (!valueEquals(a[i], b[i])) return false
            return true
        }
        if (a is Map<*, *> && b is Map<*, *>) {
            if (a.size != b.size) return false
            for ((key, value) in a) {
                if (!b.containsKey(key)) return false
                if (!valueEquals(value, b[key])) return false
            }
            return true
        }
        return a == b
    }

    // ------------------------------------------------------------------- helper

    fun asLong(v: Any?): Long = when (v) {
        is Long -> v
        is Int -> v.toLong()
        is Double -> v.toLong()
        is Boolean -> if (v) 1L else 0L
        is String -> v.toLongOrNull() ?: 0L
        else -> 0L
    }

    // ------------------------------------------------------------------ buffers

    fun bufNew(): Any? = ArrayList<Any?>()

    fun bufAppend(v: Any?, x: Any?): Any? {
        val out = ArrayList<Any?>()
        if (v is List<*>) out.addAll(v)
        out.add(x)
        return out
    }

    fun bufLen(v: Any?): Any? = len(v)

    fun bufStr(v: Any?): Any? =
        if (v is List<*>) v.joinToString("") { asString(it) } else asString(v)

    // -------------------------------------------------------------------- lists

    fun listNew(): Any? = ArrayList<Any?>()
    fun listPush(v: Any?, x: Any?): Any? = bufAppend(v, x)
    fun listLen(v: Any?): Any? = len(v)
    fun listGet(v: Any?, i: Any?): Any? = index(v, i)
    fun listValue(v: Any?): Any? = v

    // ---------------------------------------------------------------- iteration

    @Suppress("UNCHECKED_CAST")
    fun arrayItems(v: Any?): List<Any?> = if (v is List<*>) v as List<Any?> else emptyList()

    // ------------------------------------------------------------- string domain

    fun strConcat(a: Any?, b: Any?): Any? = asString(a) + asString(b)
    fun strLen(a: Any?): Any? = asString(a).length.toLong()
    fun toUpper(a: Any?): Any? = asString(a).uppercase()
    fun toLower(a: Any?): Any? = asString(a).lowercase()
    fun trim(a: Any?): Any? = asString(a).trim()

    fun slice(a: Any?, start: Any?, end: Any?): Any? {
        var s = asLong(start)
        var e = asLong(end)
        if (s < 0) s = 0
        if (e < 0) e = 0
        if (a is List<*>) {
            val n = a.size.toLong()
            if (e > n) e = n
            if (s > e) s = e
            return ArrayList(a.subList(s.toInt(), e.toInt()))
        }
        val text = asString(a)
        val n = text.length.toLong()
        if (e > n) e = n
        if (s > e) s = e
        return text.substring(s.toInt(), e.toInt())
    }

    fun replace(a: Any?, search: Any?, replacement: Any?): Any? =
        asString(a).replace(asString(search), asString(replacement))

    fun split(a: Any?, separator: Any?): Any? {
        val sep = asString(separator)
        if (sep.isEmpty()) return ArrayList(listOf<Any?>(asString(a)))
        return ArrayList(asString(a).split(sep))
    }

    fun contains(a: Any?, item: Any?): Any? {
        if (a is List<*>) return a.any { valueEquals(it, item) }
        return asString(a).contains(asString(item))
    }

    fun repeat(a: Any?, count: Any?): Any? = asString(a).repeat(maxOf(0L, asLong(count)).toInt())

    fun charAt(a: Any?, i: Any?): Any? {
        val text = asString(a)
        val indexValue = asLong(i)
        if (indexValue < 0 || indexValue >= text.length) return null
        return text.substring(indexValue.toInt(), indexValue.toInt() + 1)
    }

    fun startsWith(a: Any?, prefix: Any?): Any? = asString(a).startsWith(asString(prefix))
    fun endsWith(a: Any?, suffix: Any?): Any? = asString(a).endsWith(asString(suffix))

    // -------------------------------------------------------------------- arrays

    fun len(a: Any?): Any? = when (a) {
        is List<*> -> a.size.toLong()
        is Map<*, *> -> a.size.toLong()
        is String -> a.length.toLong()
        else -> 0L
    }

    fun index(a: Any?, idx: Any?): Any? = when (a) {
        is List<*> -> {
            val i = asLong(idx)
            if (i < 0 || i >= a.size) null else a[i.toInt()]
        }
        is String -> charAt(a, idx)
        is Map<*, *> -> a[asString(idx)]
        else -> null
    }

    fun append(a: Any?, item: Any?): Any? = bufAppend(a, item)

    fun arrConcat(a: Any?, b: Any?): Any? {
        val out = ArrayList<Any?>()
        if (a is List<*>) out.addAll(a)
        if (b is List<*>) out.addAll(b)
        return out
    }

    fun join(a: Any?, separator: Any?): Any? {
        if (a !is List<*>) return asString(a)
        return a.joinToString(asString(separator)) { asString(it) }
    }

    fun reverse(a: Any?): Any? {
        if (a !is List<*>) return a
        val out = ArrayList(a)
        out.reverse()
        return out
    }

    fun sort(a: Any?): Any? {
        if (a !is List<*>) return a
        val out = ArrayList(a)
        out.sortWith(compareBy { asString(it) })
        return out
    }

    fun unique(a: Any?): Any? {
        if (a !is List<*>) return a
        val out = ArrayList<Any?>()
        for (item in a) {
            if (!out.any { valueEquals(it, item) }) out.add(item)
        }
        return out
    }

    fun indexOf(a: Any?, item: Any?): Any? {
        if (a is List<*>) {
            for (i in a.indices) if (valueEquals(a[i], item)) return i.toLong()
        }
        return -1L
    }

    // ------------------------------------------------------------------- objects

    fun get(a: Any?, key: String): Any? = if (a is Map<*, *>) a[key] else null

    fun get(a: Any?, key: Any?): Any? = get(a, asString(key))

    fun set(a: Any?, key: Any?, value: Any?): Any? {
        val out = LinkedHashMap<String, Any?>()
        if (a is Map<*, *>) for ((k, v) in a) if (k != key) out[k.toString()] = v
        out[asString(key)] = value
        return out
    }

    fun keys(a: Any?): Any? {
        val out = ArrayList<Any?>()
        if (a is Map<*, *>) for (key in a.keys) out.add(key.toString())
        return out
    }

    fun values(a: Any?): Any? {
        val out = ArrayList<Any?>()
        if (a is Map<*, *>) for (value in a.values) out.add(value)
        return out
    }

    fun has(a: Any?, key: Any?): Boolean = (a is Map<*, *>) && a.containsKey(asString(key))

    fun merge(a: Any?, b: Any?): Any? {
        val out = LinkedHashMap<String, Any?>()
        if (a is Map<*, *>) for ((k, v) in a) out[k.toString()] = v
        if (b is Map<*, *>) for ((k, v) in b) out[k.toString()] = v
        return out
    }

    fun remove(a: Any?, key: Any?): Any? {
        if (a !is Map<*, *>) return a
        val out = LinkedHashMap<String, Any?>()
        for ((k, v) in a) if (k != key) out[k.toString()] = v
        return out
    }

    fun entries(a: Any?): Any? {
        val out = ArrayList<Any?>()
        if (a is Map<*, *>) for ((k, v) in a) out.add(ArrayList(listOf<Any?>(k.toString(), v)))
        return out
    }

    // ------------------------------------------------------- method-chain helpers

    /** View a value as a mutable map (schemas are `LinkedHashMap`s). */
    @Suppress("UNCHECKED_CAST")
    fun asMap(v: Any?): MutableMap<String, Any?> = (v as? MutableMap<String, Any?>) ?: LinkedHashMap()

    /** View a value as a mutable list. */
    @Suppress("UNCHECKED_CAST")
    fun asList(v: Any?): MutableList<Any?> = (v as? MutableList<Any?>) ?: ArrayList()

    /** Iterate a value as a list (alias of `arrayItems`). */
    fun items(v: Any?): List<Any?> = arrayItems(v)

    /** A JSON-ish rendering used only in runtime error messages. */
    fun json(v: Any?): String = when (v) {
        null -> "null"
        is Boolean -> v.toString()
        is Number -> asString(v)
        is String -> "\"" + v.replace("\\", "\\\\").replace("\"", "\\\"") + "\""
        is List<*> -> v.joinToString(", ", "[", "]") { json(it) }
        is Map<*, *> -> v.entries.joinToString(", ", "{", "}") { (k, value) -> json(asString(k)) + ": " + json(value) }
        else -> json(asString(v))
    }

    // ----------------------------------------------------------------- LT bridge

    /// Bridge helper: unwrap the `{string|number|boolean: {value}}` param entries.
    fun params(v: Any?): Any? {
        val out = ArrayList<Any?>()
        for (entry in arrayItems(v)) {
            val s = get(entry, "string")
            if (s != null) {
                out.add(get(s, "value"))
                continue
            }
            val n = get(entry, "number")
            if (n != null) {
                out.add(get(n, "value"))
                continue
            }
            val b = get(entry, "boolean")
            if (b != null) {
                out.add(get(b, "value"))
                continue
            }
            out.add(null)
        }
        return out
    }
}
