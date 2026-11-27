// Package lt is the Lingua Tungga runtime. Generated packages inline it.
package lt

import (
	"fmt"
	"math"
	"sort"
	"strconv"
	"strings"
)

// --- Variant: enums, Option and Result -------------------------------------

type Variant struct {
	Tag     string
	Order   int
	Values  []any
	Display func(Variant) string
}

type Cmper interface {
	LtCmp(any) int
}

func (v Variant) LtDisplay() string {
	if v.Display != nil {
		return v.Display(v)
	}
	return v.Tag
}

func (v Variant) LtEq(other any) bool {
	o, ok := other.(Variant)
	if !ok || o.Tag != v.Tag || len(o.Values) != len(v.Values) {
		return false
	}
	for index := range v.Values {
		if !Eq(v.Values[index], o.Values[index]) {
			return false
		}
	}
	return true
}

type Eqer interface {
	LtEq(any) bool
}

type Displayer interface {
	LtDisplay() string
}

func Eq(a, b any) bool {
	if left, ok := a.(Eqer); ok {
		return left.LtEq(b)
	}
	if right, ok := b.(Eqer); ok {
		return right.LtEq(a)
	}
	return a == b
}

func Disp(value any) string {
	switch v := value.(type) {
	case nil:
		return "None"
	case bool:
		if v {
			return "true"
		}
		return "false"
	case int64:
		return strconv.FormatInt(v, 10)
	case float64:
		if math.IsNaN(v) {
			return "NaN"
		}
		if math.IsInf(v, 1) {
			return "Infinity"
		}
		if math.IsInf(v, -1) {
			return "-Infinity"
		}
		if v == math.Trunc(v) {
			return strconv.FormatFloat(v, 'f', 1, 64)
		}
		return strconv.FormatFloat(v, 'g', -1, 64)
	case string:
		return v
	case Displayer:
		return v.LtDisplay()
	default:
		return fmt.Sprint(value)
	}
}

func Cmp(a, b any) int {
	if left, ok := a.(Cmper); ok {
		return left.LtCmp(b)
	}
	if left, ok := a.(Variant); ok {
		if right, ok := b.(Variant); ok {
			if left.Order != right.Order {
				return compareOrdered(left.Order < right.Order, left.Order > right.Order)
			}
			limit := len(left.Values)
			if len(right.Values) < limit {
				limit = len(right.Values)
			}
			for index := 0; index < limit; index++ {
				if step := Cmp(left.Values[index], right.Values[index]); step != 0 {
					return step
				}
			}
			return len(left.Values) - len(right.Values)
		}
	}
	switch left := a.(type) {
	case int64:
		if right, ok := b.(int64); ok {
			return compareOrdered(left < right, left > right)
		}
	case float64:
		if right, ok := b.(float64); ok {
			return compareOrdered(left < right, left > right)
		}
	case string:
		if right, ok := b.(string); ok {
			return strings.Compare(left, right)
		}
	case bool:
		if right, ok := b.(bool); ok {
			if left == right {
				return 0
			}
			if !left {
				return -1
			}
			return 1
		}
	}
	return strings.Compare(Disp(a), Disp(b))
}

func compareOrdered(less, greater bool) int {
	if less {
		return -1
	}
	if greater {
		return 1
	}
	return 0
}

// FDiv keeps float division through a function call so Go cannot reject
// constant expressions such as 1.0/0.0 at compile time.
func FDiv(a, b float64) float64 {
	return a / b
}

// --- Option ----------------------------------------------------------------

func optDisplay(value Variant) string {
	if value.Tag == "none" {
		return "None"
	}
	return "Some(" + Disp(value.Values[0]) + ")"
}

func Some[T any](value T) Variant {
	return Variant{Tag: "some", Order: 1, Values: []any{value}, Display: optDisplay}
}

func None() Variant {
	return Variant{Tag: "none", Order: 0, Display: optDisplay}
}

func OptIsSome(value Variant) bool { return value.Tag == "some" }
func OptIsNone(value Variant) bool { return value.Tag == "none" }

func OptUnwrap[T any](value Variant) T {
	if value.Tag == "none" {
		panic("unwrap on None")
	}
	return value.Values[0].(T)
}

func OptUnwrapOr[T any](value Variant, fallback T) T {
	if value.Tag == "some" {
		return value.Values[0].(T)
	}
	return fallback
}

func OptMap[T any, U any](value Variant, f func(T) U) Variant {
	if value.Tag == "some" {
		return Some(f(value.Values[0].(T)))
	}
	return None()
}

func OptAndThen[T any, U any](value Variant, f func(T) Variant) Variant {
	if value.Tag == "some" {
		return f(value.Values[0].(T))
	}
	return None()
}

// --- Result ----------------------------------------------------------------

func resDisplay(value Variant) string {
	if value.Tag == "ok" {
		return "Ok(" + Disp(value.Values[0]) + ")"
	}
	return "Err(" + Disp(value.Values[0]) + ")"
}

func Ok[T any](value T) Variant {
	return Variant{Tag: "ok", Order: 0, Values: []any{value}, Display: resDisplay}
}

func Err[E any](value E) Variant {
	return Variant{Tag: "err", Order: 1, Values: []any{value}, Display: resDisplay}
}

func ResIsOk(value Variant) bool  { return value.Tag == "ok" }
func ResIsErr(value Variant) bool { return value.Tag == "err" }

func ResUnwrap[T any, E any](value Variant) T {
	if value.Tag == "err" {
		panic("unwrap on Err")
	}
	return value.Values[0].(T)
}

func ResUnwrapOr[T any, E any](value Variant, fallback T) T {
	if value.Tag == "ok" {
		return value.Values[0].(T)
	}
	return fallback
}

func ResMap[T any, U any, E any](value Variant, f func(T) U) Variant {
	if value.Tag == "ok" {
		return Ok(f(value.Values[0].(T)))
	}
	return Err(value.Values[0].(E))
}

func ResMapErr[T any, E any, F any](value Variant, f func(E) F) Variant {
	if value.Tag == "ok" {
		return Ok(value.Values[0].(T))
	}
	return Err(f(value.Values[0].(E)))
}

func ResAndThen[T any, U any, E any](value Variant, f func(T) Variant) Variant {
	if value.Tag == "ok" {
		return f(value.Values[0].(T))
	}
	return Err(value.Values[0].(E))
}

// --- Immutable collections -------------------------------------------------

type List[T any] struct {
	Items []T
}

func NewList[T any](items []T) List[T] {
	cloned := make([]T, len(items))
	copy(cloned, items)
	return List[T]{Items: cloned}
}

func (l List[T]) Len() int64 { return int64(len(l.Items)) }

func (l List[T]) Get(index int64) Variant {
	if index < 0 || int(index) >= len(l.Items) {
		return None()
	}
	return Some(l.Items[index])
}

func (l List[T]) Push(value T) List[T] {
	return NewList(append(append([]T{}, l.Items...), value))
}

func (l List[T]) Pop() Variant {
	if len(l.Items) == 0 {
		return None()
	}
	return Some(l.Items[len(l.Items)-1])
}

func (l List[T]) Filter(f func(T) bool) List[T] {
	kept := make([]T, 0, len(l.Items))
	for _, item := range l.Items {
		if f(item) {
			kept = append(kept, item)
		}
	}
	return NewList(kept)
}

func (l List[T]) Any(f func(T) bool) bool {
	for _, item := range l.Items {
		if f(item) {
			return true
		}
	}
	return false
}

func (l List[T]) All(f func(T) bool) bool {
	for _, item := range l.Items {
		if !f(item) {
			return false
		}
	}
	return true
}

func (l List[T]) Sort() List[T] {
	sorted := append([]T{}, l.Items...)
	sort.SliceStable(sorted, func(i, j int) bool {
		return Cmp(sorted[i], sorted[j]) < 0
	})
	return NewList(sorted)
}

func (l List[T]) Reverse() List[T] {
	reversed := make([]T, len(l.Items))
	for index, item := range l.Items {
		reversed[len(l.Items)-1-index] = item
	}
	return NewList(reversed)
}

func (l List[T]) Concat(other List[T]) List[T] {
	return NewList(append(append([]T{}, l.Items...), other.Items...))
}

func (l List[T]) Contains(value T) bool {
	for _, item := range l.Items {
		if Eq(item, value) {
			return true
		}
	}
	return false
}

func (l List[T]) IndexOf(value T) Variant {
	for index, item := range l.Items {
		if Eq(item, value) {
			return Some(int64(index))
		}
	}
	return None()
}

func (l List[T]) LtEq(other any) bool {
	o, ok := other.(List[T])
	if !ok || len(o.Items) != len(l.Items) {
		return false
	}
	for index := range l.Items {
		if !Eq(l.Items[index], o.Items[index]) {
			return false
		}
	}
	return true
}

func (l List[T]) LtDisplay() string {
	parts := make([]string, len(l.Items))
	for index, item := range l.Items {
		parts[index] = Disp(item)
	}
	return "List(" + strings.Join(parts, ", ") + ")"
}

func MapList[T any, U any](l List[T], f func(T) U) List[U] {
	mapped := make([]U, len(l.Items))
	for index, item := range l.Items {
		mapped[index] = f(item)
	}
	return NewList(mapped)
}

func FoldList[T any, A any](l List[T], init A, f func(A, T) A) A {
	result := init
	for _, item := range l.Items {
		result = f(result, item)
	}
	return result
}

func JoinList(l List[string], separator string) string {
	return strings.Join(l.Items, separator)
}

type Set[T any] struct {
	Items []T
}

func NewSet[T any]() Set[T] { return Set[T]{} }

func setOf[T any](values []T) Set[T] {
	unique := make([]T, 0, len(values))
	for _, value := range values {
		found := false
		for _, existing := range unique {
			if Eq(existing, value) {
				found = true
				break
			}
		}
		if !found {
			unique = append(unique, value)
		}
	}
	sort.SliceStable(unique, func(i, j int) bool { return Cmp(unique[i], unique[j]) < 0 })
	return Set[T]{Items: unique}
}

func (s Set[T]) Len() int64 { return int64(len(s.Items)) }

func (s Set[T]) Insert(value T) Set[T] { return setOf(append(append([]T{}, s.Items...), value)) }

func (s Set[T]) Remove(value T) Set[T] {
	kept := make([]T, 0, len(s.Items))
	for _, item := range s.Items {
		if !Eq(item, value) {
			kept = append(kept, item)
		}
	}
	return setOf(kept)
}

func (s Set[T]) Contains(value T) bool {
	for _, item := range s.Items {
		if Eq(item, value) {
			return true
		}
	}
	return false
}

func (s Set[T]) Union(other Set[T]) Set[T] {
	return setOf(append(append([]T{}, s.Items...), other.Items...))
}

func (s Set[T]) Intersect(other Set[T]) Set[T] {
	kept := make([]T, 0, len(s.Items))
	for _, item := range s.Items {
		if other.Contains(item) {
			kept = append(kept, item)
		}
	}
	return setOf(kept)
}

func (s Set[T]) Difference(other Set[T]) Set[T] {
	kept := make([]T, 0, len(s.Items))
	for _, item := range s.Items {
		if !other.Contains(item) {
			kept = append(kept, item)
		}
	}
	return setOf(kept)
}

func (s Set[T]) LtEq(other any) bool {
	o, ok := other.(Set[T])
	if !ok || len(o.Items) != len(s.Items) {
		return false
	}
	for index := range s.Items {
		if !Eq(s.Items[index], o.Items[index]) {
			return false
		}
	}
	return true
}

func (s Set[T]) LtDisplay() string {
	parts := make([]string, len(s.Items))
	for index, item := range s.Items {
		parts[index] = Disp(item)
	}
	return "Set(" + strings.Join(parts, ", ") + ")"
}

type Entry[K any, V any] struct {
	Key   K
	Value V
}

type Map[K any, V any] struct {
	Entries []Entry[K, V]
}

func NewMap[K any, V any]() Map[K, V] { return Map[K, V]{} }

func mapOf[K any, V any](entries []Entry[K, V]) Map[K, V] {
	sorted := append([]Entry[K, V]{}, entries...)
	sort.SliceStable(sorted, func(i, j int) bool {
		return Cmp(sorted[i].Key, sorted[j].Key) < 0
	})
	unique := make([]Entry[K, V], 0, len(sorted))
	for _, entry := range sorted {
		replaced := false
		for index := range unique {
			if Eq(unique[index].Key, entry.Key) {
				unique[index] = entry
				replaced = true
				break
			}
		}
		if !replaced {
			unique = append(unique, entry)
		}
	}
	return Map[K, V]{Entries: unique}
}

func (m Map[K, V]) Len() int64 { return int64(len(m.Entries)) }

func (m Map[K, V]) Get(key K) Variant {
	for _, entry := range m.Entries {
		if Eq(entry.Key, key) {
			return Some(entry.Value)
		}
	}
	return None()
}

func (m Map[K, V]) Insert(key K, value V) Map[K, V] {
	return mapOf(append(append([]Entry[K, V]{}, m.Entries...), Entry[K, V]{Key: key, Value: value}))
}

func (m Map[K, V]) Remove(key K) Map[K, V] {
	kept := make([]Entry[K, V], 0, len(m.Entries))
	for _, entry := range m.Entries {
		if !Eq(entry.Key, key) {
			kept = append(kept, entry)
		}
	}
	return mapOf(kept)
}

func (m Map[K, V]) Keys() List[K] {
	keys := make([]K, len(m.Entries))
	for index, entry := range m.Entries {
		keys[index] = entry.Key
	}
	return NewList(keys)
}

func (m Map[K, V]) Values() List[V] {
	values := make([]V, len(m.Entries))
	for index, entry := range m.Entries {
		values[index] = entry.Value
	}
	return NewList(values)
}

func (m Map[K, V]) ContainsKey(key K) bool {
	for _, entry := range m.Entries {
		if Eq(entry.Key, key) {
			return true
		}
	}
	return false
}

func (m Map[K, V]) LtEq(other any) bool {
	o, ok := other.(Map[K, V])
	if !ok || len(o.Entries) != len(m.Entries) {
		return false
	}
	for index := range m.Entries {
		if !Eq(m.Entries[index].Key, o.Entries[index].Key) ||
			!Eq(m.Entries[index].Value, o.Entries[index].Value) {
			return false
		}
	}
	return true
}

func (m Map[K, V]) LtDisplay() string {
	parts := make([]string, len(m.Entries))
	for index, entry := range m.Entries {
		parts[index] = Disp(entry.Key) + ": " + Disp(entry.Value)
	}
	return "Map(" + strings.Join(parts, ", ") + ")"
}

// --- Str helpers (indexing is by Unicode code point) -----------------------

func StrLen(value string) int64 { return int64(len([]rune(value))) }

func StrTrim(value string) string { return strings.TrimSpace(value) }

func StrLower(value string) string { return strings.ToLower(value) }

func StrUpper(value string) string { return strings.ToUpper(value) }

func StrStartsWith(value string, prefix string) bool { return strings.HasPrefix(value, prefix) }

func StrEndsWith(value string, suffix string) bool { return strings.HasSuffix(value, suffix) }

func StrContains(value string, needle string) bool { return strings.Contains(value, needle) }

func StrSlice(value string, start int64, end int64) string {
	runes := []rune(value)
	if start < 0 {
		start = 0
	}
	if end > int64(len(runes)) {
		end = int64(len(runes))
	}
	if start > end {
		start = end
	}
	return string(runes[start:end])
}

func StrChars(value string) List[string] {
	runes := []rune(value)
	chars := make([]string, len(runes))
	for index, char := range runes {
		chars[index] = string(char)
	}
	return NewList(chars)
}

func StrTrimIndent(value string) string {
	lines := strings.Split(value, "\n")
	if len(lines) > 0 && strings.TrimSpace(lines[0]) == "" {
		lines = lines[1:]
	}
	for len(lines) > 0 && strings.TrimSpace(lines[len(lines)-1]) == "" {
		lines = lines[:len(lines)-1]
	}
	common := -1
	for _, line := range lines {
		if strings.TrimSpace(line) == "" {
			continue
		}
		width := len(line) - len(strings.TrimLeft(line, " \t"))
		if common < 0 || width < common {
			common = width
		}
	}
	if common <= 0 {
		return strings.Join(lines, "\n")
	}
	for index, line := range lines {
		if len(line) >= common {
			lines[index] = line[common:]
		}
	}
	return strings.Join(lines, "\n")
}

func StrSplit(value string, separator string) List[string] {
	return NewList(strings.Split(value, separator))
}

func StrReplace(value string, old string, new string) string {
	if old == "" {
		return value
	}
	return strings.ReplaceAll(value, old, new)
}

func StrParseInt(value string) Variant {
	text := strings.TrimSpace(value)
	if text == "" {
		return None()
	}
	parsed, err := strconv.ParseInt(text, 10, 64)
	if err != nil {
		return None()
	}
	return Some(parsed)
}

func StrParseFloat(value string) Variant {
	text := strings.TrimSpace(value)
	if text == "" {
		return None()
	}
	parsed, err := strconv.ParseFloat(text, 64)
	if err != nil {
		return None()
	}
	return Some(parsed)
}

// --- Test assertions -------------------------------------------------------

func ExpectEqual(actual any, expected any) {
	if !Eq(actual, expected) {
		panic("assertion failed: expected " + Disp(expected) + ", got " + Disp(actual))
	}
}

func ExpectNotEqual(actual any, expected any) {
	if Eq(actual, expected) {
		panic("assertion failed: expected " + Disp(actual) + " to differ from " + Disp(expected))
	}
}

func ExpectTrue(value bool) {
	if !value {
		panic("assertion failed: expected true")
	}
}

func ExpectFalse(value bool) {
	if value {
		panic("assertion failed: expected false")
	}
}
