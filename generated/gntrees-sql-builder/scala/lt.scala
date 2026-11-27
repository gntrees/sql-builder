// lt.scala — the tiny dynamic runtime that Lingua Tungga's Scala emitter targets.
//
// Scala has a universal top type (`Any`), so LT values are native Scala values:
// String, Long, Double, Boolean, null, mutable.ArrayBuffer, and
// mutable.LinkedHashMap (insertion-ordered). This is the Scala counterpart of the
// Kotlin `lt.kt` runtime.
//
// Plain `"..."` strings in Scala do NOT interpolate (`s"..."` does), so no `$`
// escaping is needed when the generator emits string literals.

import scala.collection.mutable
import scala.util.control.ControlThrowable

/** Signals used to emulate `continue`/`break` in generated loops (Scala 3 has neither). */
class LoopContinue extends ControlThrowable
class LoopBreak extends ControlThrowable

object Lt {
  /** Sentinel for "argument not supplied" in generated fluent signatures. */
  val MISSING: Any = new Object()

  def nullValue(): Any = null

  def string(s: String): Any = s

  def boolean(b: Boolean): Any = b

  def number(n: Double): Any = {
    val d = n
    if (d.isFinite && d == math.floor(d) && math.abs(d) < 9.007199254740992E15) d.toLong else d
  }

  def array(items: Any*): mutable.ArrayBuffer[Any] = mutable.ArrayBuffer(items*)

  def map(entries: (String, Any)*): mutable.LinkedHashMap[String, Any] = {
    val out = mutable.LinkedHashMap[String, Any]()
    for ((key, value) <- entries) out(key) = value
    out
  }

  // --------------------------------------------------------------- conversion

  def asString(v: Any): String = v match {
    case null => "null"
    case b: Boolean => b.toString
    case l: Long => l.toString
    case i: Int => i.toString
    case d: Double =>
      // Integral doubles render without the trailing `.0` (TypeScript parity):
      // `Lt.asString(10.0)` must yield "10", not "10.0".
      if (d.isFinite && d == math.floor(d) && math.abs(d) < 9.007199254740992E15) d.toLong.toString else d.toString
    case s: String => s
    case s: scala.collection.Seq[_] => s.map(asString).mkString("[", ",", "]")
    case m: scala.collection.Map[_, _] => m.map { case (k, value) => "\"" + k.toString + "\":" + asString(value) }.mkString("{", ",", "}")
    case other => other.toString
  }

  def toString(v: Any): Any = asString(v)

  def truthy(v: Any): Boolean = v match {
    case null => false
    case b: Boolean => b
    case l: Long => l != 0L
    case i: Int => i != 0
    case d: Double => d != 0.0
    case s: String => s.nonEmpty
    case s: scala.collection.Seq[_] => s.nonEmpty
    case m: scala.collection.Map[_, _] => m.nonEmpty
    case _ => true
  }

  def valueEquals(a: Any, b: Any): Boolean = {
    if (isNumber(a) && isNumber(b)) {
      toDouble(a) == toDouble(b)
    } else if (a.isInstanceOf[scala.collection.Seq[_]] && b.isInstanceOf[scala.collection.Seq[_]]) {
      val x = a.asInstanceOf[scala.collection.Seq[Any]]
      val y = b.asInstanceOf[scala.collection.Seq[Any]]
      x.size == y.size && x.indices.forall(i => valueEquals(x(i), y(i)))
    } else if (a.isInstanceOf[scala.collection.Map[_, _]] && b.isInstanceOf[scala.collection.Map[_, _]]) {
      val x = a.asInstanceOf[scala.collection.Map[Any, Any]]
      val y = b.asInstanceOf[scala.collection.Map[Any, Any]]
      x.size == y.size && x.forall { case (key, value) => y.contains(key) && valueEquals(value, y(key)) }
    } else {
      a == b
    }
  }

  // ------------------------------------------------------------------- helper

  /** Scala's `Number` hierarchy across boxed primitives (Boolean excluded). */
  def isNumber(v: Any): Boolean = v match {
    case _: Boolean => false
    case _: Double | _: Float | _: Long | _: Int | _: Short | _: Byte => true
    case _: java.lang.Number => true
    case _ => false
  }

  def toDouble(v: Any): Double = v match {
    case n: Double => n
    case n: Float => n.toDouble
    case n: Long => n.toDouble
    case n: Int => n.toDouble
    case n: Short => n.toDouble
    case n: Byte => n.toDouble
    case n: java.lang.Number => n.doubleValue
    case _ => Double.NaN
  }

  def asLong(v: Any): Long = v match {
    case l: Long => l
    case i: Int => i.toLong
    case d: Double => d.toLong
    case b: Boolean => if (b) 1L else 0L
    case s: String => s.toLongOption.getOrElse(0L)
    case _ => 0L
  }

  // ------------------------------------------------------------------ buffers

  def bufNew(): Any = mutable.ArrayBuffer[Any]()

  def bufAppend(v: Any, x: Any): Any = {
    val out = mutable.ArrayBuffer[Any]()
    if (v.isInstanceOf[scala.collection.Seq[_]]) out.addAll(v.asInstanceOf[scala.collection.Seq[Any]])
    out += x
    out
  }

  def bufLen(v: Any): Any = len(v)

  def bufStr(v: Any): Any = v match {
    case s: scala.collection.Seq[_] => s.map(asString).mkString("")
    case _ => asString(v)
  }

  // -------------------------------------------------------------------- lists

  def listNew(): Any = mutable.ArrayBuffer[Any]()
  def listPush(v: Any, x: Any): Any = bufAppend(v, x)
  def listLen(v: Any): Any = len(v)
  def listGet(v: Any, i: Any): Any = index(v, i)
  def listValue(v: Any): Any = v

  // ---------------------------------------------------------------- iteration

  def arrayItems(v: Any): scala.collection.Seq[Any] = v match {
    case s: scala.collection.Seq[_] => s.asInstanceOf[scala.collection.Seq[Any]]
    case _ => Nil
  }

  // ------------------------------------------------------------- string domain

  def strConcat(a: Any, b: Any): Any = asString(a) + asString(b)
  def strLen(a: Any): Any = asString(a).length.toLong
  def toUpper(a: Any): Any = asString(a).toUpperCase
  def toLower(a: Any): Any = asString(a).toLowerCase
  def trim(a: Any): Any = asString(a).trim

  def slice(a: Any, start: Any, end: Any): Any = {
    var s = asLong(start)
    var e = asLong(end)
    if (s < 0) s = 0
    if (e < 0) e = 0
    if (a.isInstanceOf[scala.collection.Seq[_]]) {
      val seq = a.asInstanceOf[scala.collection.Seq[Any]]
      val n = seq.size.toLong
      if (e > n) e = n
      if (s > e) s = e
      mutable.ArrayBuffer.from(seq.slice(s.toInt, e.toInt))
    } else {
      val text = asString(a)
      val n = text.length.toLong
      if (e > n) e = n
      if (s > e) s = e
      text.substring(s.toInt, e.toInt)
    }
  }

  def replace(a: Any, search: Any, replacement: Any): Any =
    asString(a).replace(asString(search), asString(replacement))

  def split(a: Any, separator: Any): Any = {
    val sep = asString(separator)
    if (sep.isEmpty) mutable.ArrayBuffer[Any](asString(a))
    else mutable.ArrayBuffer.from(asString(a).split(java.util.regex.Pattern.quote(sep), -1).toSeq)
  }

  def contains(a: Any, item: Any): Any = {
    if (a.isInstanceOf[scala.collection.Seq[_]]) a.asInstanceOf[scala.collection.Seq[Any]].exists(valueEquals(_, item))
    else asString(a).contains(asString(item))
  }

  def repeat(a: Any, count: Any): Any = asString(a) * math.max(0L, asLong(count)).toInt

  def charAt(a: Any, i: Any): Any = {
    val text = asString(a)
    val indexValue = asLong(i)
    if (indexValue < 0 || indexValue >= text.length) null
    else text.substring(indexValue.toInt, indexValue.toInt + 1)
  }

  def startsWith(a: Any, prefix: Any): Any = asString(a).startsWith(asString(prefix))
  def endsWith(a: Any, suffix: Any): Any = asString(a).endsWith(asString(suffix))

  // -------------------------------------------------------------------- arrays

  def len(a: Any): Any = a match {
    case s: scala.collection.Seq[_] => s.size.toLong
    case m: scala.collection.Map[_, _] => m.size.toLong
    case s: String => s.length.toLong
    case _ => 0L
  }

  def index(a: Any, idx: Any): Any = a match {
    case s: scala.collection.Seq[_] =>
      val i = asLong(idx)
      if (i < 0 || i >= s.size) null else s.asInstanceOf[scala.collection.Seq[Any]].apply(i.toInt)
    case s: String => charAt(s, idx)
    case m: scala.collection.Map[_, _] => m.asInstanceOf[scala.collection.Map[Any, Any]].getOrElse(asString(idx), null)
    case _ => null
  }

  def append(a: Any, item: Any): Any = bufAppend(a, item)

  def arrConcat(a: Any, b: Any): Any = {
    val out = mutable.ArrayBuffer[Any]()
    if (a.isInstanceOf[scala.collection.Seq[_]]) out.addAll(a.asInstanceOf[scala.collection.Seq[Any]])
    if (b.isInstanceOf[scala.collection.Seq[_]]) out.addAll(b.asInstanceOf[scala.collection.Seq[Any]])
    out
  }

  def join(a: Any, separator: Any): Any = a match {
    case s: scala.collection.Seq[_] => s.map(asString).mkString(asString(separator))
    case _ => asString(a)
  }

  def reverse(a: Any): Any = a match {
    case s: scala.collection.Seq[_] => mutable.ArrayBuffer.from(s.asInstanceOf[scala.collection.Seq[Any]].reverse)
    case _ => a
  }

  def sort(a: Any): Any = a match {
    case s: scala.collection.Seq[_] => mutable.ArrayBuffer.from(s.asInstanceOf[scala.collection.Seq[Any]].sortBy(asString))
    case _ => a
  }

  def unique(a: Any): Any = a match {
    case s: scala.collection.Seq[_] =>
      val out = mutable.ArrayBuffer[Any]()
      for (item <- s) if (!out.exists(valueEquals(_, item))) out += item
      out
    case _ => a
  }

  def indexOf(a: Any, item: Any): Any = a match {
    case s: scala.collection.Seq[_] =>
      val i = s.asInstanceOf[scala.collection.Seq[Any]].indexWhere(valueEquals(_, item))
      if (i < 0) -1L else i.toLong
    case _ => -1L
  }

  // ------------------------------------------------------------------- objects

  def get(a: Any, key: String): Any = a match {
    case m: scala.collection.Map[_, _] => m.asInstanceOf[scala.collection.Map[Any, Any]].getOrElse(key, null)
    case _ => null
  }

  def get(a: Any, key: Any): Any = get(a, asString(key))

  def set(a: Any, key: Any, value: Any): Any = {
    val out = mutable.LinkedHashMap[String, Any]()
    if (a.isInstanceOf[scala.collection.Map[_, _]]) {
      for ((k, v) <- a.asInstanceOf[scala.collection.Map[Any, Any]]) if (k != key) out(k.toString) = v
    }
    out(asString(key)) = value
    out
  }

  def keys(a: Any): Any = {
    val out = mutable.ArrayBuffer[Any]()
    if (a.isInstanceOf[scala.collection.Map[_, _]]) {
      for (key <- a.asInstanceOf[scala.collection.Map[Any, Any]].keys) out += key.toString
    }
    out
  }

  def values(a: Any): Any = {
    val out = mutable.ArrayBuffer[Any]()
    if (a.isInstanceOf[scala.collection.Map[_, _]]) {
      for (value <- a.asInstanceOf[scala.collection.Map[Any, Any]].values) out += value
    }
    out
  }

  def has(a: Any, key: Any): Boolean = a match {
    case m: scala.collection.Map[_, _] => m.asInstanceOf[scala.collection.Map[Any, Any]].contains(asString(key))
    case _ => false
  }

  def merge(a: Any, b: Any): Any = {
    val out = mutable.LinkedHashMap[String, Any]()
    if (a.isInstanceOf[scala.collection.Map[_, _]]) {
      for ((k, v) <- a.asInstanceOf[scala.collection.Map[Any, Any]]) out(k.toString) = v
    }
    if (b.isInstanceOf[scala.collection.Map[_, _]]) {
      for ((k, v) <- b.asInstanceOf[scala.collection.Map[Any, Any]]) out(k.toString) = v
    }
    out
  }

  def remove(a: Any, key: Any): Any = a match {
    case m: scala.collection.Map[_, _] =>
      val out = mutable.LinkedHashMap[String, Any]()
      for ((k, v) <- m.asInstanceOf[scala.collection.Map[Any, Any]]) if (k != key) out(k.toString) = v
      out
    case _ => a
  }

  def entries(a: Any): Any = {
    val out = mutable.ArrayBuffer[Any]()
    if (a.isInstanceOf[scala.collection.Map[_, _]]) {
      for ((k, v) <- a.asInstanceOf[scala.collection.Map[Any, Any]]) out += mutable.ArrayBuffer[Any](k.toString, v)
    }
    out
  }

  // ------------------------------------------------------- method-chain helpers

  /** View a value as a mutable map (schemas are `mutable.LinkedHashMap`s). */
  def asMap(v: Any): mutable.LinkedHashMap[String, Any] = v match {
    case m: mutable.LinkedHashMap[_, _] => m.asInstanceOf[mutable.LinkedHashMap[String, Any]]
    case _ => mutable.LinkedHashMap[String, Any]()
  }

  /** View a value as a mutable list (schema `values` are `mutable.ArrayBuffer`s). */
  def asList(v: Any): mutable.ArrayBuffer[Any] = v match {
    case l: mutable.ArrayBuffer[_] => l.asInstanceOf[mutable.ArrayBuffer[Any]]
    case s: scala.collection.Seq[_] => mutable.ArrayBuffer.from(s.asInstanceOf[scala.collection.Seq[Any]])
    case _ => mutable.ArrayBuffer[Any]()
  }

  /** Iterate a value as a list (alias of `arrayItems`). */
  def items(v: Any): scala.collection.Seq[Any] = arrayItems(v)

  /** A JSON-ish rendering used only in runtime error messages. */
  def json(v: Any): String = v match {
    case null => "null"
    case b: Boolean => b.toString
    case n if isNumber(n) => asString(n)
    case s: String => "\"" + s.replace("\\", "\\\\").replace("\"", "\\\"") + "\""
    case s: scala.collection.Seq[_] => s.map(json).mkString("[", ", ", "]")
    case m: scala.collection.Map[_, _] => m.map { case (k, value) => json(asString(k)) + ": " + json(value) }.mkString("{", ", ", "}")
    case other => json(asString(other))
  }

  // ----------------------------------------------------------------- LT bridge

  /// Bridge helper: unwrap the `{string|number|boolean: {value}}` param entries.
  def params(v: Any): Any = {
    val out = mutable.ArrayBuffer[Any]()
    for (entry <- arrayItems(v)) {
      val s = get(entry, "string")
      if (s != null) {
        out += get(s, "value")
      } else {
        val n = get(entry, "number")
        if (n != null) {
          out += get(n, "value")
        } else {
          val b = get(entry, "boolean")
          if (b != null) out += get(b, "value") else out += null
        }
      }
    }
    out
  }
}
