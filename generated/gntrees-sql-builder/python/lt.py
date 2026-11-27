"""lt — minimal runtime for the Lingua Tungga Python emitter.

Python is dynamic, so the emitter maps almost everything onto native syntax.
This module only covers the handful of places where JS semantics differ from
Python's:

    * truthiness  — JS ``[]``/``{}`` are truthy; Python's are falsy
    * ``obj[key]`` — must yield ``None`` on a missing key, not raise KeyError
    * ``String(x)`` — JS stringification of None/bool/containers
    * ``a.join(sep)`` — argument order vs ``sep.join(a)``

Fase 4e decision gate: this file is the measured "runtime cost" of a dynamic
language target. Compare with the Rust ``lt.rs`` (~480 LOC + a ``Value`` enum).
"""
import math

_JS = None  # module marker


def truthy(v):
    """JS `!!v` — note empty list/dict are truthy in JS but falsy in Python."""
    if v is None:
        return False
    if isinstance(v, bool):
        return v
    if isinstance(v, (int, float)):
        return v != 0
    if isinstance(v, str):
        return len(v) > 0
    return True


def to_string(v):
    """JS `String(v)`."""
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, float):
        return str(int(v)) if v.is_integer() and not math.isinf(v) else str(v)
    if isinstance(v, int):
        return str(v)
    if isinstance(v, str):
        return v
    if isinstance(v, (list, tuple)):
        return "[" + ",".join(to_string(x) for x in v) + "]"
    if isinstance(v, dict):
        return "{" + ",".join('"%s":%s' % (k, to_string(val)) for k, val in v.items()) + "}"
    return str(v)


def get(obj, key):
    """JS `obj[key]`, returning None instead of raising."""
    if isinstance(obj, dict):
        return obj.get(key)
    if isinstance(obj, (list, tuple)):
        if isinstance(key, int) and 0 <= key < len(obj):
            return obj[key]
        return None
    return None


def has(obj, key):
    if isinstance(obj, dict):
        return key in obj
    if isinstance(obj, (list, tuple)):
        return isinstance(key, int) and 0 <= key < len(obj)
    return False


def set(obj, key, value):
    out = dict(obj) if isinstance(obj, dict) else {}
    out[key] = value
    return out


def merge(a, b):
    out = dict(a) if isinstance(a, dict) else {}
    if isinstance(b, dict):
        out.update(b)
    return out


def delete(obj, key):
    if isinstance(obj, dict):
        return {k: v for k, v in obj.items() if k != key}
    return obj


def buf_str(buf):
    return "".join(to_string(x) for x in buf)


def join(arr, separator):
    return to_string(separator).join(to_string(x) for x in arr)


def index_of(arr, item):
    for i, x in enumerate(arr):
        if x == item:
            return i
    return -1
