# lt.rb — minimal runtime for the Lingua Tungga Ruby emitter.
#
# Ruby is dynamic, so the emitter maps almost everything onto native syntax.
# This file only covers the handful of places where JS semantics differ from
# Ruby's:
#
#   * truthiness  — Ruby treats `0` and `""` as truthy; JS treats both as falsy
#   * `obj[key]`  — must yield `nil` on a missing key, not behave oddly
#   * `String(x)` — JS stringification of nil/bool/containers
#   * `a.join(sep)` — argument order vs Ruby's `sep.join(a)`
#
# Fase 6 decision gate: this is the measured "runtime cost" of a dynamic target
# (compare with the Rust `lt.rs` / `Value` enum).

def lt_truthy(v)
  return false if v.nil? || v == false
  return !v.empty? if v.is_a?(String)
  return false if v.is_a?(Numeric) && v == 0
  true
end

def lt_to_string(v)
  case v
  when nil then "null"
  when true then "true"
  when false then "false"
  when String then v
  when Integer then v.to_s
  when Float
    v.finite? && v == v.to_i ? v.to_i.to_s : v.to_s
  when Array then "[" + v.map { |x| lt_to_string(x) }.join(",") + "]"
  when Hash then "{" + v.map { |k, val| "\"#{k}\":#{lt_to_string(val)}" }.join(",") + "}"
  else v.to_s
  end
end

def lt_get(obj, key)
  if obj.is_a?(Hash)
    obj[key]
  elsif obj.is_a?(Array)
    key.is_a?(Integer) && key >= 0 && key < obj.length ? obj[key] : nil
  end
end

def lt_has(obj, key)
  if obj.is_a?(Hash)
    obj.key?(key)
  elsif obj.is_a?(Array)
    key.is_a?(Integer) && key >= 0 && key < obj.length
  else
    false
  end
end

def lt_set(obj, key, value)
  out = obj.is_a?(Hash) ? obj.dup : {}
  out[key] = value
  out
end

def lt_keys(obj)
  obj.is_a?(Hash) ? obj.keys : []
end

def lt_values(obj)
  obj.is_a?(Hash) ? obj.values : []
end

def lt_merge(a, b)
  out = a.is_a?(Hash) ? a.dup : {}
  out.merge!(b) if b.is_a?(Hash)
  out
end

def lt_delete(obj, key)
  obj.is_a?(Hash) ? obj.reject { |k, _| k == key } : obj
end

def lt_entries(obj)
  obj.is_a?(Hash) ? obj.to_a : []
end

def lt_buf_str(buf)
  buf.is_a?(Array) ? buf.map { |x| lt_to_string(x) }.join("") : ""
end

def lt_join(arr, separator)
  arr.is_a?(Array) ? arr.map { |x| lt_to_string(x) }.join(lt_to_string(separator)) : ""
end

def lt_index_of(arr, item)
  return -1 unless arr.is_a?(Array)
  idx = arr.index { |x| x == item }
  idx.nil? ? -1 : idx
end
