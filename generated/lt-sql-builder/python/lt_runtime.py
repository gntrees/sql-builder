"""Lingua Tungga runtime (Python). Generated packages inline this file."""

from __future__ import annotations

import math
import textwrap
from dataclasses import dataclass
from functools import cmp_to_key
from typing import Any, Callable, Generic, Iterable, Sequence, TypeVar, cast

T = TypeVar("T")
U = TypeVar("U")
A = TypeVar("A")
K = TypeVar("K")
V = TypeVar("V")
E = TypeVar("E")
F = TypeVar("F")

# --- Int: i64 with wrapping overflow ---------------------------------------

_MASK = (1 << 64) - 1
_SIGN = 1 << 63


def _i64(value: int) -> int:
    value &= _MASK
    return value - (1 << 64) if value >= _SIGN else value


def iadd(a: int, b: int) -> int:
    return _i64(a + b)


def isub(a: int, b: int) -> int:
    return _i64(a - b)


def imul(a: int, b: int) -> int:
    return _i64(a * b)


def idiv(a: int, b: int) -> int:
    if b == 0:
        raise ZeroDivisionError("integer division by zero")
    quotient = abs(a) // abs(b)
    if (a < 0) != (b < 0):
        quotient = -quotient
    return _i64(quotient)


def irem(a: int, b: int) -> int:
    return _i64(a - idiv(a, b) * b)


def ineg(a: int) -> int:
    return _i64(-a)


def fdiv(a: float, b: float) -> float:
    if b != 0.0:
        return a / b
    if a != a or a == 0.0:
        return float("nan")
    positive = (a > 0.0) == (math.copysign(1.0, b) > 0.0)
    return float("inf") if positive else float("-inf")


# --- Display, equality, ordering -------------------------------------------


def disp(value: Any) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, float):
        if math.isnan(value):
            return "NaN"
        if math.isinf(value):
            return "Infinity" if value > 0 else "-Infinity"
        if value.is_integer():
            return f"{value:.1f}"
        return repr(value)
    if isinstance(value, str):
        return value
    if value is None:
        return "None"
    display = getattr(value, "to_display", None)
    if callable(display):
        return cast(str, display())
    return str(value)


def eq(a: Any, b: Any) -> bool:
    if isinstance(a, float) and isinstance(b, float) and math.isnan(a) and math.isnan(b):
        return False
    return bool(a == b)


def cmp(a: Any, b: Any) -> int:
    compare_method = getattr(a, "lt_cmp", None)
    if callable(compare_method):
        return cast(int, compare_method(b))
    if hasattr(a, "order") and hasattr(b, "order") and hasattr(a, "values") and hasattr(b, "values"):
        if a.order != b.order:
            return -1 if a.order < b.order else 1
        for left, right in zip(a.values, b.values):
            step = cmp(left, right)
            if step != 0:
                return step
        return len(a.values) - len(b.values)
    if isinstance(a, bool) and isinstance(b, bool):
        return (a > b) - (a < b)
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return (a > b) - (a < b)
    if isinstance(a, str) and isinstance(b, str):
        return (a > b) - (a < b)
    left, right = disp(a), disp(b)
    return (left > right) - (left < right)


# --- Option / Result --------------------------------------------------------


@dataclass(frozen=True)
class Opt(Generic[T]):
    tag: str  # "some" | "none"
    values: tuple[Any, ...]
    order: int

    def to_display(self) -> str:
        if self.tag == "none":
            return "None"
        return f"Some({disp(self.values[0])})"


def Some(value: T) -> Opt[T]:
    return Opt("some", (value,), 1)


def None_() -> Opt[Any]:
    return Opt("none", (), 0)


def opt_is_some(value: Opt[Any]) -> bool:
    return value.tag == "some"


def opt_is_none(value: Opt[Any]) -> bool:
    return value.tag == "none"


def opt_unwrap(value: Opt[T]) -> T:
    if value.tag == "none":
        raise ValueError("unwrap on None")
    return cast(T, value.values[0])


def opt_unwrap_or(value: Opt[T], fallback: T) -> T:
    return cast(T, value.values[0]) if value.tag == "some" else fallback


def opt_map(value: Opt[T], f: Callable[[T], U]) -> Opt[U]:
    return Some(f(cast(T, value.values[0]))) if value.tag == "some" else None_()


def opt_and_then(value: Opt[T], f: Callable[[T], Opt[U]]) -> Opt[U]:
    return f(cast(T, value.values[0])) if value.tag == "some" else None_()


@dataclass(frozen=True)
class Res(Generic[T, E]):
    tag: str  # "ok" | "err"
    values: tuple[Any, ...]
    order: int

    def to_display(self) -> str:
        if self.tag == "ok":
            return f"Ok({disp(self.values[0])})"
        return f"Err({disp(self.values[0])})"


def Ok(value: T) -> Res[T, Any]:
    return Res("ok", (value,), 0)


def Err(value: E) -> Res[Any, E]:
    return Res("err", (value,), 1)


def res_is_ok(value: Res[Any, Any]) -> bool:
    return value.tag == "ok"


def res_is_err(value: Res[Any, Any]) -> bool:
    return value.tag == "err"


def res_unwrap(value: Res[T, E]) -> T:
    if value.tag == "err":
        raise ValueError(f"unwrap on Err({disp(value.values[0])})")
    return cast(T, value.values[0])


def res_unwrap_or(value: Res[T, E], fallback: T) -> T:
    return cast(T, value.values[0]) if value.tag == "ok" else fallback


def res_map(value: Res[T, E], f: Callable[[T], U]) -> Res[U, E]:
    return (
        Ok(f(cast(T, value.values[0])))
        if value.tag == "ok"
        else Err(cast(E, value.values[0]))
    )


def res_map_err(value: Res[T, E], f: Callable[[E], F]) -> Res[T, F]:
    return (
        Ok(cast(T, value.values[0]))
        if value.tag == "ok"
        else Err(f(cast(E, value.values[0])))
    )


def res_and_then(value: Res[T, E], f: Callable[[T], Res[U, E]]) -> Res[U, E]:
    return (
        f(cast(T, value.values[0]))
        if value.tag == "ok"
        else Err(cast(E, value.values[0]))
    )


# --- Immutable collections --------------------------------------------------


@dataclass(frozen=True)
class LList(Generic[T]):
    items: tuple[T, ...]

    def len(self) -> int:
        return len(self.items)

    def get(self, index: int) -> Opt[T]:
        if index < 0 or index >= len(self.items):
            return None_()
        return Some(self.items[index])

    def push(self, value: T) -> "LList[T]":
        return LList(self.items + (value,))

    def pop(self) -> Opt[T]:
        if not self.items:
            return None_()
        return Some(self.items[-1])

    def map(self, f: Callable[[T], U]) -> "LList[U]":
        return LList(tuple(f(item) for item in self.items))

    def filter(self, f: Callable[[T], bool]) -> "LList[T]":
        return LList(tuple(item for item in self.items if f(item)))

    def fold(self, init: A, f: Callable[[A, T], A]) -> A:
        result = init
        for item in self.items:
            result = f(result, item)
        return result

    def any(self, f: Callable[[T], bool]) -> bool:
        return any(f(item) for item in self.items)

    def all(self, f: Callable[[T], bool]) -> bool:
        return all(f(item) for item in self.items)

    def sort(self) -> "LList[T]":
        return LList(tuple(sorted(self.items, key=cmp_to_key(cmp))))

    def reverse(self) -> "LList[T]":
        return LList(tuple(reversed(self.items)))

    def concat(self, other: "LList[T]") -> "LList[T]":
        return LList(self.items + other.items)

    def contains(self, value: T) -> bool:
        return any(eq(item, value) for item in self.items)

    def index_of(self, value: T) -> Opt[int]:
        for index, item in enumerate(self.items):
            if eq(item, value):
                return Some(index)
        return None_()

    def join(self, separator: str) -> str:
        return separator.join(disp(item) for item in self.items)

    def to_display(self) -> str:
        return "List(" + ", ".join(disp(item) for item in self.items) + ")"


@dataclass(frozen=True)
class LSet(Generic[T]):
    items: tuple[T, ...]

    @staticmethod
    def empty() -> "LSet[Any]":
        return LSet(())

    def _from(self, values: Iterable[T]) -> "LSet[T]":
        unique: list[Any] = []
        for value in values:
            if not any(eq(existing, value) for existing in unique):
                unique.append(value)
        unique.sort(key=cmp_to_key(cmp))
        return LSet(tuple(unique))

    @staticmethod
    def create(values: Iterable[T]) -> "LSet[T]":
        return LSet[T](())._from(values)

    def len(self) -> int:
        return len(self.items)

    def insert(self, value: T) -> "LSet[T]":
        return self._from((*self.items, value))

    def remove(self, value: T) -> "LSet[T]":
        return self._from(item for item in self.items if not eq(item, value))

    def contains(self, value: T) -> bool:
        return any(eq(item, value) for item in self.items)

    def union(self, other: "LSet[T]") -> "LSet[T]":
        return self._from((*self.items, *other.items))

    def intersect(self, other: "LSet[T]") -> "LSet[T]":
        return self._from(item for item in self.items if other.contains(item))

    def difference(self, other: "LSet[T]") -> "LSet[T]":
        return self._from(item for item in self.items if not other.contains(item))

    def to_display(self) -> str:
        return "Set(" + ", ".join(disp(item) for item in self.items) + ")"


@dataclass(frozen=True)
class LMap(Generic[K, V]):
    entries: tuple[tuple[K, V], ...]

    @staticmethod
    def empty() -> "LMap[Any, Any]":
        return LMap(())

    def _from(self, entries: Iterable[tuple[K, V]]) -> "LMap[K, V]":
        def compare_entries(left: tuple[K, V], right: tuple[K, V]) -> int:
            return cmp(left[0], right[0])

        sorted_entries = sorted(entries, key=cmp_to_key(compare_entries))
        unique: list[tuple[K, V]] = []
        for entry in sorted_entries:
            replaced = False
            for index, existing in enumerate(unique):
                if eq(existing[0], entry[0]):
                    unique[index] = entry
                    replaced = True
                    break
            if not replaced:
                unique.append(entry)
        return LMap(tuple(unique))

    @staticmethod
    def create(entries: Iterable[tuple[K, V]]) -> "LMap[K, V]":
        return LMap[K, V](())._from(entries)

    def len(self) -> int:
        return len(self.entries)

    def get(self, key: K) -> Opt[V]:
        for entry_key, entry_value in self.entries:
            if eq(entry_key, key):
                return Some(entry_value)
        return None_()

    def insert(self, key: K, value: V) -> "LMap[K, V]":
        return self._from((*self.entries, (key, value)))

    def remove(self, key: K) -> "LMap[K, V]":
        return self._from(entry for entry in self.entries if not eq(entry[0], key))

    def keys(self) -> LList[K]:
        return LList(tuple(entry[0] for entry in self.entries))

    def values(self) -> LList[V]:
        return LList(tuple(entry[1] for entry in self.entries))

    def contains_key(self, key: K) -> bool:
        return any(eq(entry[0], key) for entry in self.entries)

    def to_display(self) -> str:
        return (
            "Map("
            + ", ".join(f"{disp(key)}: {disp(value)}" for key, value in self.entries)
            + ")"
        )


# --- Str helpers (indexing is by Unicode code point) -----------------------


def str_len(value: str) -> int:
    return len(value)


def str_slice(value: str, start: int, end: int) -> str:
    return value[start:end]


def str_chars(value: str) -> LList[str]:
    return LList(tuple(value))


def str_trim_indent(value: str) -> str:
    return textwrap.dedent(value).strip("\n")


def str_split(value: str, separator: str) -> LList[str]:
    return LList(tuple(value.split(separator)))


def str_replace(value: str, old: str, new: str) -> str:
    return value.replace(old, new) if old else value


def str_parse_int(value: str) -> Opt[int]:
    text = value.strip()
    digits = text[1:] if text[:1] in ("+", "-") else text
    if not digits.isdigit():
        return None_()
    parsed = int(text)
    if parsed < -(1 << 63) or parsed > (1 << 63) - 1:
        return None_()
    return Some(parsed)


def str_parse_float(value: str) -> Opt[float]:
    text = value.strip()
    if not text:
        return None_()
    try:
        return Some(float(text))
    except ValueError:
        return None_()


# --- Test assertions --------------------------------------------------------


def expect_equal(actual: Any, expected: Any) -> None:
    if not eq(actual, expected):
        raise AssertionError(
            f"assertion failed: expected {disp(expected)}, got {disp(actual)}"
        )


def expect_not_equal(actual: Any, expected: Any) -> None:
    if eq(actual, expected):
        raise AssertionError(
            f"assertion failed: expected {disp(actual)} to differ from {disp(expected)}"
        )


def expect_true(value: bool) -> None:
    if not value:
        raise AssertionError("assertion failed: expected true")


def expect_false(value: bool) -> None:
    if value:
        raise AssertionError("assertion failed: expected false")
