<?php
/**
 * lt — minimal runtime for the Lingua Tungga PHP emitter.
 *
 * PHP is dynamic, so the emitter maps almost everything onto native syntax.
 * This file only covers the handful of places where JS semantics differ from
 * PHP's:
 *
 *   * truthiness  — `"0"` and `[]` are falsy in PHP but truthy in JS
 *   * `obj[key]`  — must yield `null` on a missing key, not raise a warning
 *   * `String(x)` — JS stringification of null/bool/containers
 *   * `a.join(sep)` — argument order vs `implode(sep, a)`
 *
 * Gelombang 1 decision gate: this is the measured "runtime cost" of a dynamic
 * target. Compare with Rust's `lt.rs` (~480 LOC + a `Value` enum).
 *
 * NOTE: this file intentionally has no `<?php` opening tag; the harness prepends
 * it when composing the runnable program.
 */

function lt_truthy($v)
{
    if ($v === null || $v === false) {
        return false;
    }
    if ($v === true) {
        return true;
    }
    if (is_int($v)) {
        return $v !== 0;
    }
    if (is_float($v)) {
        return !is_nan($v) && $v != 0.0;
    }
    if (is_string($v)) {
        return $v !== ""; // JS: "0" is a truthy non-empty string
    }
    return true; // arrays/objects are truthy in JS
}

function lt_to_string($v)
{
    if ($v === null) {
        return "null";
    }
    if (is_bool($v)) {
        return $v ? "true" : "false";
    }
    if (is_int($v)) {
        return (string) $v;
    }
    if (is_float($v)) {
        if (is_nan($v)) {
            return "NaN";
        }
        if (is_infinite($v)) {
            return $v > 0 ? "Infinity" : "-Infinity";
        }
        if (floor($v) === $v && abs($v) < 1.0e21) {
            return (string) (int) $v;
        }
        return (string) $v;
    }
    if (is_string($v)) {
        return $v;
    }
    if (is_array($v)) {
        if (array_is_list($v)) {
            return "[" . implode(",", array_map("lt_to_string", $v)) . "]";
        }
        $parts = [];
        foreach ($v as $key => $value) {
            $parts[] = '"' . $key . '":' . lt_to_string($value);
        }
        return "{" . implode(",", $parts) . "}";
    }
    return (string) $v;
}

function lt_get($arr, $key)
{
    if (is_array($arr) && array_key_exists($key, $arr)) {
        return $arr[$key];
    }
    return null;
}

function lt_has($arr, $key)
{
    return is_array($arr) && array_key_exists($key, $arr);
}

function lt_buf_str($buf)
{
    return implode("", array_map("lt_to_string", $buf));
}

function lt_join($arr, $separator)
{
    return implode(lt_to_string($separator), array_map("lt_to_string", $arr));
}

function lt_index_of($arr, $item)
{
    $index = 0;
    foreach ($arr as $value) {
        if ($value === $item) {
            return $index;
        }
        $index++;
    }
    return -1;
}

function lt_sort($arr)
{
    $copy = array_values($arr);
    sort($copy, SORT_STRING);
    return $copy;
}

function lt_entries($arr)
{
    $out = [];
    foreach ($arr as $key => $value) {
        $out[] = [$key, $value];
    }
    return $out;
}
