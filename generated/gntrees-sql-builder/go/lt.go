// lt — runtime for the Lingua Tungga Go emitter (Gelombang 2).
//
// Go is static but has a universal type (`any`), so an LT value is just `any`:
// string / float64 / bool / nil / []any / *ltObject (plus *strings.Builder for
// buffers). Like Java, no `Value` enum is required.
//
// **Objects are ordered.** Go's built-in map iteration order is randomized, but
// LT objects (and therefore generated SQL) must be deterministic and match the
// insertion order of the reference (TypeScript). So LT objects use `ltObject`,
// which keeps an explicit key order. Use the exported `Obj(...)` helper to build
// one (the generated schema literals do the same via `ltMap`).
//
// Semantics deliberately mirror JavaScript (the TypeScript backend is the
// reference). This file lives in the *same package* as the generated
// `index.go`, so most helpers are unexported (`lt` prefix).
package gntrees

import (
	"bytes"
	"encoding/json"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

// ltObject is an insertion-ordered string-keyed map.
type ltObject struct {
	keys   []string
	values map[string]any
}

func newLtObject() *ltObject {
	return &ltObject{values: map[string]any{}}
}

func (o *ltObject) set(key string, value any) {
	if _, present := o.values[key]; !present {
		o.keys = append(o.keys, key)
	}
	o.values[key] = value
}

func (o *ltObject) get(key string) (any, bool) {
	value, ok := o.values[key]
	return value, ok
}

// MarshalJSON renders the object with keys in insertion order.
func (o *ltObject) MarshalJSON() ([]byte, error) {
	var buffer bytes.Buffer
	buffer.WriteByte('{')
	for index, key := range o.keys {
		if index > 0 {
			buffer.WriteByte(',')
		}
		encodedKey, err := json.Marshal(key)
		if err != nil {
			return nil, err
		}
		buffer.Write(encodedKey)
		buffer.WriteByte(':')
		encodedValue, err := json.Marshal(o.values[key])
		if err != nil {
			return nil, err
		}
		buffer.Write(encodedValue)
	}
	buffer.WriteByte('}')
	return buffer.Bytes(), nil
}

// ---- literals ----

// ltMissing is the sentinel for "argument not supplied" in generated signatures.
var ltMissingSentinel = new(struct{})

func ltMissing() any { return ltMissingSentinel }

func ltString(v string) any  { return v }
func ltNumber(v float64) any { return v }
func ltBool(v bool) any      { return v }
func ltNull() any            { return nil }

func ltArray(items ...any) []any {
	if items == nil {
		return []any{}
	}
	return items
}

// ltMap takes alternating key/value arguments: ltMap("a", 1, "b", 2).
func ltMap(keyValues ...any) *ltObject {
	out := newLtObject()
	for i := 0; i+1 < len(keyValues); i += 2 {
		out.set(ltToString(keyValues[i]), keyValues[i+1])
	}
	return out
}

// Obj builds an ordered LT object (for callers outside the package).
func Obj(keyValues ...any) any { return ltMap(keyValues...) }

// ---- conversions ----

func ltToFloat(v any) float64 {
	switch n := v.(type) {
	case nil:
		return 0
	case bool:
		if n {
			return 1
		}
		return 0
	case float64:
		return n
	case float32:
		return float64(n)
	case int:
		return float64(n)
	case int64:
		return float64(n)
	case string:
		f, err := strconv.ParseFloat(n, 64)
		if err != nil {
			return 0
		}
		return f
	}
	return 0
}

func ltToIndex(v any) int { return int(ltToFloat(v)) }

func ltIsMap(v any) bool {
	switch v.(type) {
	case *ltObject, map[string]any:
		return true
	}
	return false
}

func ltAsMap(v any) *ltObject {
	switch m := v.(type) {
	case *ltObject:
		return m
	case map[string]any:
		out := newLtObject()
		keys := make([]string, 0, len(m))
		for key := range m {
			keys = append(keys, key)
		}
		sort.Strings(keys)
		for _, key := range keys {
			out.set(key, m[key])
		}
		return out
	}
	return newLtObject()
}

func ltAsList(v any) []any {
	if l, ok := v.([]any); ok {
		return l
	}
	return []any{}
}

func isNumber(v any) bool {
	switch v.(type) {
	case float64, float32, int, int64:
		return true
	}
	return false
}

// ---- values ----

func ltTruthy(v any) bool {
	switch x := v.(type) {
	case nil:
		return false
	case bool:
		return x
	case string:
		return len(x) > 0
	case float64:
		return x != 0
	case float32:
		return x != 0
	case int:
		return x != 0
	case int64:
		return x != 0
	}
	return true // JS: [] and {} are truthy
}

func ltToString(v any) string {
	switch x := v.(type) {
	case nil:
		return "null"
	case bool:
		if x {
			return "true"
		}
		return "false"
	case string:
		return x
	case float64:
		if x == float64(int64(x)) {
			return strconv.FormatInt(int64(x), 10)
		}
		return strconv.FormatFloat(x, 'f', -1, 64)
	case float32:
		return ltToString(float64(x))
	case int:
		return strconv.Itoa(x)
	case int64:
		return strconv.FormatInt(x, 10)
	case []any:
		parts := make([]string, len(x))
		for i, item := range x {
			parts[i] = ltToString(item)
		}
		return "[" + strings.Join(parts, ",") + "]"
	case *ltObject:
		parts := make([]string, 0, len(x.keys))
		for _, key := range x.keys {
			parts = append(parts, "\""+key+"\":"+ltToString(x.values[key]))
		}
		return "{" + strings.Join(parts, ",") + "}"
	case map[string]any:
		return ltToString(ltAsMap(x))
	}
	return fmt.Sprintf("%v", v)
}

func ltValueEquals(a, b any) bool {
	if isNumber(a) && isNumber(b) {
		return ltToFloat(a) == ltToFloat(b)
	}
	return ltDeepEqual(a, b)
}

func ltValueNotEquals(a, b any) bool { return !ltValueEquals(a, b) }

func ltDeepEqual(a, b any) bool {
	switch x := a.(type) {
	case nil:
		return b == nil
	case string:
		y, ok := b.(string)
		return ok && x == y
	case bool:
		y, ok := b.(bool)
		return ok && x == y
	case []any:
		y, ok := b.([]any)
		if !ok || len(x) != len(y) {
			return false
		}
		for i := range x {
			if !ltDeepEqual(x[i], y[i]) {
				return false
			}
		}
		return true
	}
	if ltIsMap(a) && ltIsMap(b) {
		am, bm := ltAsMap(a), ltAsMap(b)
		if len(am.keys) != len(bm.keys) {
			return false
		}
		for _, key := range am.keys {
			other, present := bm.get(key)
			if !present || !ltDeepEqual(am.values[key], other) {
				return false
			}
		}
		return true
	}
	return false
}

// ---- operators ----

func ltGt(a, b any) bool  { return ltToFloat(a) > ltToFloat(b) }
func ltLt(a, b any) bool  { return ltToFloat(a) < ltToFloat(b) }
func ltGte(a, b any) bool { return ltToFloat(a) >= ltToFloat(b) }
func ltLte(a, b any) bool { return ltToFloat(a) <= ltToFloat(b) }

func ltAdd(a, b any) any { return ltToFloat(a) + ltToFloat(b) }
func ltSub(a, b any) any { return ltToFloat(a) - ltToFloat(b) }
func ltMul(a, b any) any { return ltToFloat(a) * ltToFloat(b) }
func ltDiv(a, b any) any { return ltToFloat(a) / ltToFloat(b) }
func ltMod(a, b any) any { return float64(int64(ltToFloat(a)) % int64(ltToFloat(b))) }

// LT only uses these as conditions, so returning a bool is correct and lets them
// appear directly in a Go `if`.
func ltAnd(a, b any) bool { return ltTruthy(a) && ltTruthy(b) }
func ltOr(a, b any) bool  { return ltTruthy(a) || ltTruthy(b) }
func ltXor(a, b any) bool { return ltTruthy(a) != ltTruthy(b) }
func ltNot(a any) bool    { return !ltTruthy(a) }

func ltBitAnd(a, b any) any { return float64(int64(ltToFloat(a)) & int64(ltToFloat(b))) }
func ltBitOr(a, b any) any  { return float64(int64(ltToFloat(a)) | int64(ltToFloat(b))) }
func ltShl(a, b any) any    { return float64(int64(ltToFloat(a)) << uint(ltToFloat(b))) }
func ltShr(a, b any) any    { return float64(int64(ltToFloat(a)) >> uint(ltToFloat(b))) }

// ---- containers ----

func ltLen(v any) int {
	switch x := v.(type) {
	case string:
		return len(x)
	case []any:
		return len(x)
	case *ltObject:
		return len(x.keys)
	case map[string]any:
		return len(x)
	}
	return 0
}

func ltIndex(v, key any) any {
	switch x := v.(type) {
	case []any:
		i := ltToIndex(key)
		if i >= 0 && i < len(x) {
			return x[i]
		}
	case string:
		i := ltToIndex(key)
		if i >= 0 && i < len(x) {
			return string(x[i])
		}
		return ""
	}
	return nil
}

func ltGet(v, key any) any {
	if ltIsMap(v) {
		value, _ := ltAsMap(v).get(ltToString(key))
		return value
	}
	return ltIndex(v, key)
}

func ltHas(v, key any) bool {
	if ltIsMap(v) {
		_, ok := ltAsMap(v).get(ltToString(key))
		return ok
	}
	if x, ok := v.([]any); ok {
		i := ltToIndex(key)
		return i >= 0 && i < len(x)
	}
	return false
}

func ltSet(v, key, value any) any {
	out := newLtObject()
	if ltIsMap(v) {
		source := ltAsMap(v)
		for _, k := range source.keys {
			out.set(k, source.values[k])
		}
	}
	out.set(ltToString(key), value)
	return out
}

func ltMerge(a, b any) any {
	out := newLtObject()
	if ltIsMap(a) {
		source := ltAsMap(a)
		for _, k := range source.keys {
			out.set(k, source.values[k])
		}
	}
	if ltIsMap(b) {
		source := ltAsMap(b)
		for _, k := range source.keys {
			out.set(k, source.values[k])
		}
	}
	return out
}

func ltDelete(v, key any) any {
	if !ltIsMap(v) {
		return v
	}
	source := ltAsMap(v)
	name := ltToString(key)
	out := newLtObject()
	for _, k := range source.keys {
		if k != name {
			out.set(k, source.values[k])
		}
	}
	return out
}

func ltKeys(v any) []any {
	out := []any{}
	if ltIsMap(v) {
		for _, key := range ltAsMap(v).keys {
			out = append(out, key)
		}
	}
	return out
}

func ltValues(v any) []any {
	out := []any{}
	if ltIsMap(v) {
		source := ltAsMap(v)
		for _, key := range source.keys {
			out = append(out, source.values[key])
		}
	}
	return out
}

func ltEntries(v any) []any {
	out := []any{}
	if ltIsMap(v) {
		source := ltAsMap(v)
		for _, key := range source.keys {
			out = append(out, ltArray(key, source.values[key]))
		}
	}
	return out
}

func ltItems(v any) []any {
	if l, ok := v.([]any); ok {
		out := make([]any, len(l))
		copy(out, l)
		return out
	}
	return []any{}
}

// ---- strings ----

func ltStrConcat(a, b any) string { return ltToString(a) + ltToString(b) }
func ltToUpper(v any) string      { return strings.ToUpper(ltToString(v)) }
func ltToLower(v any) string      { return strings.ToLower(ltToString(v)) }
func ltTrim(v any) string         { return strings.TrimSpace(ltToString(v)) }
func ltRepeat(v, count any) string {
	return strings.Repeat(ltToString(v), ltToIndex(count))
}

func ltSlice(v, start, end any) string {
	text := ltToString(v)
	from := ltToIndex(start)
	to := ltToIndex(end)
	if from < 0 {
		from = 0
	}
	if from > len(text) {
		from = len(text)
	}
	if to < from {
		to = from
	}
	if to > len(text) {
		to = len(text)
	}
	return text[from:to]
}

func ltReplace(v, search, replacement any) string {
	return strings.ReplaceAll(ltToString(v), ltToString(search), ltToString(replacement))
}

func ltSplit(v, separator any) []any {
	text := ltToString(v)
	sep := ltToString(separator)
	out := []any{}
	if sep == "" {
		for _, ch := range text {
			out = append(out, string(ch))
		}
		return out
	}
	for _, part := range strings.Split(text, sep) {
		out = append(out, part)
	}
	return out
}

func ltContains(v, item any) bool {
	switch x := v.(type) {
	case string:
		return strings.Contains(x, ltToString(item))
	case []any:
		for _, element := range x {
			if ltValueEquals(element, item) {
				return true
			}
		}
	}
	return false
}

func ltCharAt(v, index any) string {
	text := ltToString(v)
	i := ltToIndex(index)
	if i >= 0 && i < len(text) {
		return string(text[i])
	}
	return ""
}

func ltStartsWith(v, prefix any) bool { return strings.HasPrefix(ltToString(v), ltToString(prefix)) }
func ltEndsWith(v, suffix any) bool   { return strings.HasSuffix(ltToString(v), ltToString(suffix)) }

func ltJoin(v, separator any) string {
	sep := ltToString(separator)
	parts := []string{}
	for _, item := range ltAsList(v) {
		parts = append(parts, ltToString(item))
	}
	return strings.Join(parts, sep)
}

// ---- arrays ----

func ltAppend(v, item any) []any {
	out := ltItems(v)
	return append(out, item)
}

func ltArrConcat(a, b any) []any {
	out := ltItems(a)
	return append(out, ltAsList(b)...)
}

func ltIndexOf(v, item any) int {
	for i, element := range ltAsList(v) {
		if ltValueEquals(element, item) {
			return i
		}
	}
	return -1
}

func ltReverse(v any) []any {
	out := ltItems(v)
	for i, j := 0, len(out)-1; i < j; i, j = i+1, j-1 {
		out[i], out[j] = out[j], out[i]
	}
	return out
}

func ltSort(v any) []any {
	out := ltItems(v)
	sort.SliceStable(out, func(i, j int) bool {
		if isNumber(out[i]) && isNumber(out[j]) {
			return ltToFloat(out[i]) < ltToFloat(out[j])
		}
		return ltToString(out[i]) < ltToString(out[j])
	})
	return out
}

func ltUnique(v any) []any {
	out := []any{}
	for _, item := range ltItems(v) {
		if ltIndexOf(out, item) < 0 {
			out = append(out, item)
		}
	}
	return out
}

// ---- buffers / lists ----

func ltBufNew() *strings.Builder { return &strings.Builder{} }

func ltBufAppend(buffer, text any) *strings.Builder {
	b, ok := buffer.(*strings.Builder)
	if !ok {
		b = &strings.Builder{}
	}
	b.WriteString(ltToString(text))
	return b
}

func ltBufLen(buffer any) int {
	if b, ok := buffer.(*strings.Builder); ok {
		return b.Len()
	}
	return 0
}

func ltBufStr(buffer any) string {
	if b, ok := buffer.(*strings.Builder); ok {
		return b.String()
	}
	return ""
}

func ltListNew() []any { return []any{} }

func ltListValue(v any) any { return v }

func ltListPush(list, item any) []any {
	return append(ltAsList(list), item)
}

func ltListLen(list any) int { return len(ltAsList(list)) }

// ---- local function table / parse bridge ----

func ltCall(fns map[string]func(...any) any, name string, args ...any) any {
	fn, ok := fns[name]
	if !ok {
		panic("Lingua Tungga: unknown local function \"" + name + "\"")
	}
	return fn(args...)
}

// ltParams extracts [string|number|boolean|null, ...] from wrapped {tag: {value}} params.
func ltParams(v any) []any {
	out := []any{}
	for _, entry := range ltItems(v) {
		inner := ltGet(entry, "string")
		if inner == nil {
			inner = ltGet(entry, "number")
		}
		if inner == nil {
			inner = ltGet(entry, "boolean")
		}
		if inner == nil {
			out = append(out, nil)
		} else {
			out = append(out, ltGet(inner, "value"))
		}
	}
	return out
}

func ltJson(v any) string {
	encoded, err := json.Marshal(v)
	if err != nil {
		return ltToString(v)
	}
	return string(encoded)
}
