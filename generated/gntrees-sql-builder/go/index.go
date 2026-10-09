// Auto-generated index for gntrees-sql-builder

package gntrees



import (

	"fmt"

	"math"

	"strings"

)

// parse() returns a map[string]any: {"sql": string, "sqlWithParam": string, "param": []any}

// Auto-generated Go method-chain types.
//
// Go is statically typed, but LT values are `any` (a schema is a nested
// `*ltObject` / `[]any`). The one shared abstraction is `Structure`: every
// generated builder implements it so the generic runtime (`McCopy`/`makeCopy`)
// can call `GetSchema()`.

type Structure interface {
	GetSchema() *ltObject
}


// Auto-generated Go method-chain runtime (Lingua Tungga Gelombang 2).
//
// This is the static counterpart of `core/base/python/base-utils.py`. Schemas are
// ordered `*ltObject` / `[]any` graphs; the generator inlines this fragment into
// the generated `index.go` (after the import block).
//
// `normalizeArgumentStructureCall` and `McCopy` are *not* defined here: like the
// TypeScript/Python/Java runtimes they are emitted by the generator because they
// reference the project's structure types.

func mcTypeof(value any) string {
	switch value.(type) {
	case nil:
		return "object"
	case bool:
		return "boolean"
	case float64, float32, int, int64:
		return "number"
	case string:
		return "string"
	}
	if ltIsMap(value) {
		return "object"
	}
	if _, ok := value.([]any); ok {
		return "object"
	}
	return fmt.Sprintf("%T", value)
}

func validateSchema(schema any) {
	message := "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction"
	if !ltIsMap(schema) {
		panic(message)
	}
	inner := ltGet(schema, "schema")
	if !ltIsMap(inner) {
		panic(message)
	}
	chain := ltGet(inner, "chain")
	if !ltIsMap(chain) {
		panic(message)
	}
	chainChain := ltGet(chain, "chain")
	if !ltIsMap(chainChain) {
		panic(message)
	}
	if _, ok := ltGet(chainChain, "values").([]any); !ok || !ltTruthy(ltGet(chainChain, "initFunction")) {
		panic(message)
	}
}

func unwrapArgumentValue(value any) any {
	if !ltIsMap(value) {
		panic("Unknown argument value type")
	}
	if ltHas(value, "string") {
		return ltGet(ltGet(value, "string"), "value")
	}
	if ltHas(value, "number") {
		return ltGet(ltGet(value, "number"), "value")
	}
	if ltHas(value, "boolean") {
		return ltGet(ltGet(value, "boolean"), "value")
	}
	if ltHas(value, "null") {
		return ltGet(ltGet(value, "null"), "value")
	}
	if ltHas(value, "array") {
		out := []any{}
		for _, item := range ltItems(ltGet(ltGet(value, "array"), "value")) {
			out = append(out, unwrapArgumentValue(item))
		}
		return out
	}
	if ltHas(value, "object") {
		out := newLtObject()
		source := ltAsMap(ltGet(ltGet(value, "object"), "value"))
		for _, key := range source.keys {
			out.set(key, unwrapArgumentValue(source.values[key]))
		}
		return out
	}
	if ltHas(value, "chain") {
		panic("Cannot validate a chain default value at runtime")
	}
	panic("Unknown argument value type")
}

func validateDefault(defaultVal, structType any) {
	normalizeArgument(unwrapArgumentValue(defaultVal), structType)
}

func normalizeArgument(arg, structType any) any {
	if !ltIsMap(structType) {
		panic("Unsupported struct type in normalizeArgument")
	}
	st := ltAsMap(structType)

	if ltHas(st, "array") {
		list, ok := arg.([]any)
		if !ok {
			panic("Expected an array argument, but got " + mcTypeof(arg))
		}
		if len(list) == 0 {
			return ltMap("array", ltMap("value", ltArray()))
		}
		itemType := ltGet(ltGet(st, "array"), "type")
		normalizedItems := []any{}
		for _, item := range list {
			normalizedItems = append(normalizedItems, normalizeArgument(item, itemType))
		}
		if normalizedItems[0] == nil {
			panic("Unexpected undefined value in array")
		}
		return ltMap("array", ltMap("value", normalizedItems))
	}

	if ltHas(st, "object") {
		if !ltIsMap(arg) {
			panic("Expected an object argument, but got " + mcTypeof(arg))
		}
		declared := ltGet(st, "object")
		argMap := ltAsMap(arg)
		missingKeys := []string{}
		for _, key := range ltKeys(declared) {
			if !ltHas(argMap, key) {
				missingKeys = append(missingKeys, ltToString(key))
			}
		}
		if len(missingKeys) > 0 {
			panic("Missing required key(s) \"" + strings.Join(missingKeys, "\", \"") + "\" in object argument")
		}
		normalizedObject := newLtObject()
		for _, key := range argMap.keys {
			if !ltHas(declared, key) {
				panic("Unexpected key \"" + key + "\" in object argument")
			}
			normalizedObject.set(key, normalizeArgument(argMap.values[key], ltGet(declared, key)))
		}
		return ltMap("object", ltMap("value", normalizedObject))
	}

	if ltHas(st, "string") {
		if _, ok := arg.(string); !ok {
			panic("Expected a string argument, but got " + mcTypeof(arg))
		}
		return ltMap("string", ltMap("value", arg))
	}

	if ltHas(st, "number") {
		if _, isBool := arg.(bool); isBool || !isNumber(arg) {
			panic("Expected a number argument, but got " + mcTypeof(arg))
		}
		number := ltToFloat(arg)
		if math.IsInf(number, 0) || math.IsNaN(number) {
			panic("Expected a finite number argument, but got " + ltToString(number))
		}
		return ltMap("number", ltMap("value", number))
	}

	if ltHas(st, "boolean") {
		if _, ok := arg.(bool); !ok {
			panic("Expected a boolean argument, but got " + mcTypeof(arg))
		}
		return ltMap("boolean", ltMap("value", arg))
	}

	if ltHas(st, "null") {
		if arg != nil {
			panic("Expected a null argument, but got " + mcTypeof(arg))
		}
		return ltMap("null", ltMap("value", nil))
	}

	if ltHas(st, "union") {
		reasons := []string{}
		normalizedUnionTypes := []any{}
		for _, unionType := range ltItems(ltGet(ltGet(st, "union"), "types")) {
			func() {
				defer func() {
					if r := recover(); r != nil {
						reasons = append(reasons, ltToString(r))
					}
				}()
				normalizedUnionTypes = append(normalizedUnionTypes, normalizeArgument(arg, unionType))
			}()
		}
		if len(normalizedUnionTypes) == 0 || normalizedUnionTypes[0] == nil {
			panic("Argument does not match any type in the union: " + strings.Join(reasons, " | "))
		}
		if len(normalizedUnionTypes) > 1 {
			if list, ok := arg.([]any); ok && len(list) == 0 {
				return normalizedUnionTypes[0]
			}
			panic("Argument matches multiple types in the union, which is ambiguous")
		}
		return normalizedUnionTypes[0]
	}

	if ltHas(st, "map") {
		if !ltIsMap(arg) {
			panic("Expected an object argument for map type, but got " + mcTypeof(arg))
		}
		argMap := ltAsMap(arg)
		normalizedMap := newLtObject()
		valueType := ltGet(ltGet(st, "map"), "type")
		for _, key := range argMap.keys {
			normalizedMap.set(key, normalizeArgument(argMap.values[key], valueType))
		}
		return ltMap("object", ltMap("value", normalizedMap))
	}

	if ltHas(st, "structureCall") {
		return normalizeArgumentStructureCall(arg)
	}

	if ltHas(st, "literal") {
		expected := ltGet(ltGet(st, "literal"), "value")
		literalType := ltGet(ltGet(st, "literal"), "type")
		if literalType == "string" {
			text, ok := arg.(string)
			if !ok {
				panic("Expected a string literal argument, but got " + mcTypeof(arg))
			}
			if text != ltToString(expected) {
				panic("Expected string literal " + ltJson(expected) + ", but got " + ltJson(arg))
			}
			return ltMap("string", ltMap("value", arg))
		}
		if literalType == "number" {
			if _, isBool := arg.(bool); isBool || !isNumber(arg) {
				panic("Expected a number literal argument, but got " + mcTypeof(arg))
			}
			if ltToFloat(arg) != ltToFloat(expected) {
				panic("Expected number literal " + ltToString(expected) + ", but got " + ltToString(arg))
			}
			return ltMap("number", ltMap("value", arg))
		}
		boolean, ok := arg.(bool)
		if !ok {
			panic("Expected a boolean literal argument, but got " + mcTypeof(arg))
		}
		if boolean != ltTruthy(expected) {
			panic("Expected boolean literal " + ltToString(expected) + ", but got " + ltToString(arg))
		}
		return ltMap("boolean", ltMap("value", arg))
	}

	panic("Unsupported struct type in normalizeArgument")
}

func createSchema(oldSchema *ltObject, functionName string, functionArgs []any, isTemplateLiteral bool) *ltObject {
	validateSchema(oldSchema)
	old := ltAsMap(ltGet(oldSchema, "schema"))
	oldChain := ltAsMap(ltGet(ltGet(old, "chain"), "chain"))

	inner := newLtObject()
	for _, key := range old.keys {
		inner.set(key, old.values[key])
	}
	values := append([]any{}, ltItems(ltGet(oldChain, "values"))...)
	chainChain := ltMap(
		"values", values,
		"initFunction", ltGet(oldChain, "initFunction"),
	)
	inner.set("chain", ltMap("chain", chainChain))

	args := []any{}
	if isTemplateLiteral && len(functionArgs) > 0 && functionArgs[0] != nil {
		stringsValue := ltGet(functionArgs[0], "arg")
		list, ok := stringsValue.([]any)
		if !ok {
			panic("Expected a template strings array for " + functionName)
		}
		for _, text := range list {
			if _, ok := text.(string); !ok {
				panic("Expected a template strings array for " + functionName)
			}
		}
		expressions := functionArgs[1:]
		if len(expressions) != len(list)-1 {
			panic("Template literal for " + functionName + " expects " + ltToString(float64(len(list)-1)) + " expression(s), but got " + ltToString(float64(len(expressions))))
		}
		for index, text := range list {
			if ltToString(text) != "" {
				args = append(args, ltMap("argument", ltMap("string", ltMap("value", text)), "default", nil))
			}
			if index < len(expressions) {
				expression := expressions[index]
				if expression == nil {
					panic("Missing expression for template literal at index " + ltToString(float64(index)))
				}
				args = append(args, ltMap("argument", normalizeArgument(ltGet(expression, "arg"), ltGet(expression, "struct")), "default", nil))
			}
		}
	} else {
		for index, functionArg := range functionArgs {
			arg := ltGet(functionArg, "arg")
			if arg == ltMissing() {
				if ltTruthy(ltGet(functionArg, "provided")) {
					panic("Parameter \"" + functionName + "\" argument #" + ltToString(float64(index+1)) + " cannot be undefined")
				}
				defaultVal := ltGet(functionArg, "default")
				if defaultVal != nil {
					validateDefault(defaultVal, ltGet(functionArg, "struct"))
					args = append(args, ltMap("argument", defaultVal, "default", defaultVal))
					continue
				}
				panic("Parameter \"" + functionName + "\" argument #" + ltToString(float64(index+1)) + " was not provided")
			}
			argument := normalizeArgument(arg, ltGet(functionArg, "struct"))
			defaultVal := ltGet(functionArg, "default")
			if defaultVal != nil {
				validateDefault(defaultVal, ltGet(functionArg, "struct"))
			}
			args = append(args, ltMap("argument", argument, "default", defaultVal))
		}
	}

	chainChain.set("values", append(values, ltMap("functionCall", ltMap(
		"name", functionName,
		"arguments", args,
		"isTemplateLiteral", isTemplateLiteral,
	))))
	return ltMap("schema", inner)
}

func createPropertyCallSchema(oldSchema *ltObject, propertyName string) *ltObject {
	old := ltAsMap(ltGet(oldSchema, "schema"))
	oldChain := ltAsMap(ltGet(ltGet(old, "chain"), "chain"))
	values := append([]any{}, ltItems(ltGet(oldChain, "values"))...)
	values = append(values, ltMap("propertyCall", ltMap("name", propertyName)))

	inner := newLtObject()
	for _, key := range old.keys {
		inner.set(key, old.values[key])
	}
	inner.set("chain", ltMap("chain", ltMap(
		"values", values,
		"initFunction", ltGet(oldChain, "initFunction"),
	)))
	return ltMap("schema", inner)
}

func makeCopy(structureName string, source Structure) any {
	schema := source.GetSchema()
	validateSchema(schema)
	return ltMap("copy", ltMap(
		"structureName", structureName,
		"chain", ltGet(ltGet(schema, "schema"), "chain"),
	))
}

func applyCopies(schema *ltObject, copies any, targetStructureName string) {
	list := ltAsList(copies)
	if len(list) == 0 {
		return
	}
	for _, cp := range list {
		if !ltIsMap(cp) {
			panic("Invalid builder argument in init function: wrap the structure with copy(...)")
		}
		inner, ok := ltGet(cp, "copy").(*ltObject)
		if !ok {
			panic("Invalid builder argument in init function: wrap the structure with copy(...)")
		}
		name, ok := ltGet(inner, "structureName").(string)
		if !ok {
			panic("Invalid builder argument in init function: wrap the structure with copy(...)")
		}
		if _, ok := ltGet(inner, "chain").(*ltObject); !ok {
			panic("Invalid builder argument in init function: wrap the structure with copy(...)")
		}
		if name != targetStructureName {
			panic("Cannot copy builder of structure '" + name + "' into '" + targetStructureName + "'")
		}
		value := ltMap("copy", ltMap("structureName", name, "chain", ltGet(inner, "chain")))
		chainChain := ltAsMap(ltGet(ltGet(ltGet(schema, "schema"), "chain"), "chain"))
		chainChain.set("values", append(ltItems(ltGet(chainChain, "values")), value))
	}
}


func normalizeArgumentStructureCall(arg any) any {
	if s, ok := arg.(Structure); ok {
		return ltGet(ltGet(s.GetSchema(), "schema"), "chain")
	}
	got := ""
	if arg == nil {
		got = "null"
	} else if _, ok := arg.([]any); ok {
		got = "array"
	} else if _, ok := arg.(map[string]any); ok {
		panic("Unknown structure call argument type")
	} else {
		got = mcTypeof(arg)
	}
	panic("Expected a structure instance for structure calls, but got " + got)
}

func McCopy(source any) any {
	if s, ok := source.(*SqlBuilder); ok {
		return makeCopy("sql-builder", s)
	}
	panic("copy() expects a structure instance created by an init function")
}

type SqlBuilder struct {
	schema *ltObject
}

func newSqlBuilder() *SqlBuilder {
	return &SqlBuilder{schema: ltMap("schema", ltMap("exportName", "schema", "importPaths", ltMap("typescript", "../../../gntrees-sql-builder/typescript/index"), "chain", ltMap("chain", ltMap("values", []any{}, "initFunction", ltMap("name", "sql-builder", "variableName", "s1")))))}
}

func (b *SqlBuilder) GetSchema() *ltObject {
	return b.schema
}

func (b *SqlBuilder) initFromStructure(schema *ltObject) *SqlBuilder {
	validateSchema(schema)
	b.schema = schema
	return b
}

func (b *SqlBuilder) initFromInitFunction(initFunction *ltObject, copies ...any) *SqlBuilder {
	if _, ok := ltGet(initFunction, "name").(string); !ok {
		panic("Invalid init function")
	}
	if _, ok := ltGet(initFunction, "variableName").(string); !ok {
		panic("Invalid init function")
	}
	ltAsMap(ltGet(ltGet(ltGet(b.schema, "schema"), "chain"), "chain")).set("initFunction", initFunction)
	applyCopies(b.schema, copies, "sql-builder")
	return b
}

func (b *SqlBuilder) Select(__a ...any) *SqlBuilder {
	columns := ltMissing()
	if len(__a) > 0 {
		columns = __a[0]
	}
	if columns == ltMissing() {
		panic("Parameter \"select\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "select", []any{
		ltMap("arg", columns, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})))), ltMap("map", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", columns != ltMissing()),
	}, false))
}

func (b *SqlBuilder) From(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	if table == ltMissing() {
		panic("Parameter \"from\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "from", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Transaction(__a ...any) *SqlBuilder {
	transaction := ltMissing()
	if len(__a) > 0 {
		transaction = __a[0]
	}
	if transaction == ltMissing() {
		panic("Parameter \"transaction\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "transaction", []any{
		ltMap("arg", transaction, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", transaction != ltMissing()),
	}, false))
}

func (b *SqlBuilder) OrderBy(__a ...any) *SqlBuilder {
	columns := ltMissing()
	if len(__a) > 0 {
		columns = __a[0]
	}
	if columns == ltMissing() {
		panic("Parameter \"orderBy\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "orderBy", []any{
		ltMap("arg", columns, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", columns != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Limit(__a ...any) *SqlBuilder {
	count := ltMissing()
	if len(__a) > 0 {
		count = __a[0]
	}
	if count == ltMissing() {
		panic("Parameter \"limit\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "limit", []any{
		ltMap("arg", count, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", count != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Offset(__a ...any) *SqlBuilder {
	count := ltMissing()
	if len(__a) > 0 {
		count = __a[0]
	}
	if count == ltMissing() {
		panic("Parameter \"offset\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "offset", []any{
		ltMap("arg", count, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", count != ltMissing()),
	}, false))
}

func (b *SqlBuilder) With(__a ...any) *SqlBuilder {
	statement := ltMissing()
	if len(__a) > 0 {
		statement = __a[0]
	}
	as := ltMissing()
	if len(__a) > 1 {
		as = __a[1]
	}
	if statement == ltMissing() {
		panic("Parameter \"with\" argument #1 was not provided")
	}
	if as == ltMissing() {
		panic("Parameter \"with\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "with", []any{
		ltMap("arg", statement, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", statement != ltMissing()),
		ltMap("arg", as, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", as != ltMissing()),
	}, false))
}

func (b *SqlBuilder) GroupBy(__a ...any) *SqlBuilder {
	columns := ltMissing()
	if len(__a) > 0 {
		columns = __a[0]
	}
	if columns == ltMissing() {
		panic("Parameter \"groupBy\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "groupBy", []any{
		ltMap("arg", columns, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", columns != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Having(__a ...any) *SqlBuilder {
	statement := ltMissing()
	if len(__a) > 0 {
		statement = __a[0]
	}
	if statement == ltMissing() {
		panic("Parameter \"having\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "having", []any{
		ltMap("arg", statement, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", statement != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Where(__a ...any) *SqlBuilder {
	statement := ltMissing()
	if len(__a) > 0 {
		statement = __a[0]
	}
	if statement == ltMissing() {
		panic("Parameter \"where\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "where", []any{
		ltMap("arg", statement, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", statement != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Update(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	set := ltMissing()
	if len(__a) > 1 {
		set = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"update\" argument #1 was not provided")
	}
	if set == ltMissing() {
		panic("Parameter \"update\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "update", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", set, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("map", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", set != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Set(__a ...any) *SqlBuilder {
	statement := ltMissing()
	if len(__a) > 0 {
		statement = __a[0]
	}
	if statement == ltMissing() {
		panic("Parameter \"set\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "set", []any{
		ltMap("arg", statement, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("map", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", statement != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Insert(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	set := ltMissing()
	if len(__a) > 1 {
		set = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"insert\" argument #1 was not provided")
	}
	if set == ltMissing() {
		panic("Parameter \"insert\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "insert", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", set, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("map", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", set != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Values(__a ...any) *SqlBuilder {
	values := ltMissing()
	if len(__a) > 0 {
		values = __a[0]
	}
	if values == ltMissing() {
		panic("Parameter \"values\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "values", []any{
		ltMap("arg", values, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})))), ltMap("array", ltMap("type", ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))))})), "provided", values != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Returning(__a ...any) *SqlBuilder {
	columns := ltMissing()
	if len(__a) > 0 {
		columns = __a[0]
	}
	if columns == ltMissing() {
		panic("Parameter \"returning\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "returning", []any{
		ltMap("arg", columns, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})))), ltMap("map", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", columns != ltMissing()),
	}, false))
}

func (b *SqlBuilder) OnConflictDoNothing(__a ...any) *SqlBuilder {
	target := ltMissing()
	if len(__a) > 0 {
		target = __a[0]
	}
	if target == ltMissing() {
		panic("Parameter \"onConflictDoNothing\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "onConflictDoNothing", []any{
		ltMap("arg", target, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", target != ltMissing()),
	}, false))
}

func (b *SqlBuilder) OnConflictDoUpdate(__a ...any) *SqlBuilder {
	target := ltMissing()
	if len(__a) > 0 {
		target = __a[0]
	}
	set := ltMissing()
	if len(__a) > 1 {
		set = __a[1]
	}
	if target == ltMissing() {
		panic("Parameter \"onConflictDoUpdate\" argument #1 was not provided")
	}
	if set == ltMissing() {
		panic("Parameter \"onConflictDoUpdate\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "onConflictDoUpdate", []any{
		ltMap("arg", target, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", target != ltMissing()),
		ltMap("arg", set, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("map", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", set != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Delete(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	if table == ltMissing() {
		panic("Parameter \"delete\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "delete", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Join(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	on := ltMissing()
	if len(__a) > 1 {
		on = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"join\" argument #1 was not provided")
	}
	if on == ltMissing() {
		panic("Parameter \"join\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "join", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", on, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", on != ltMissing()),
	}, false))
}

func (b *SqlBuilder) LeftJoin(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	on := ltMissing()
	if len(__a) > 1 {
		on = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"leftJoin\" argument #1 was not provided")
	}
	if on == ltMissing() {
		panic("Parameter \"leftJoin\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "leftJoin", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", on, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", on != ltMissing()),
	}, false))
}

func (b *SqlBuilder) RightJoin(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	on := ltMissing()
	if len(__a) > 1 {
		on = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"rightJoin\" argument #1 was not provided")
	}
	if on == ltMissing() {
		panic("Parameter \"rightJoin\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "rightJoin", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", on, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", on != ltMissing()),
	}, false))
}

func (b *SqlBuilder) InnerJoin(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	on := ltMissing()
	if len(__a) > 1 {
		on = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"innerJoin\" argument #1 was not provided")
	}
	if on == ltMissing() {
		panic("Parameter \"innerJoin\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "innerJoin", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", on, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", on != ltMissing()),
	}, false))
}

func (b *SqlBuilder) FullJoin(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	on := ltMissing()
	if len(__a) > 1 {
		on = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"fullJoin\" argument #1 was not provided")
	}
	if on == ltMissing() {
		panic("Parameter \"fullJoin\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "fullJoin", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", on, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", on != ltMissing()),
	}, false))
}

func (b *SqlBuilder) CrossJoin(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	on := ltMissing()
	if len(__a) > 1 {
		on = __a[1]
	}
	if table == ltMissing() {
		panic("Parameter \"crossJoin\" argument #1 was not provided")
	}
	if on == ltMissing() {
		panic("Parameter \"crossJoin\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "crossJoin", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
		ltMap("arg", on, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", on != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Eq(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"eq\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "eq", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Gt(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"gt\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "gt", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Gte(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"gte\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "gte", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Lt(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"lt\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "lt", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Lte(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"lte\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "lte", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Exists(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"exists\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "exists", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) IsNull(__a ...any) *SqlBuilder {
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "isNull", []any{
	}, false))
}

func (b *SqlBuilder) IsNotNull(__a ...any) *SqlBuilder {
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "isNotNull", []any{
	}, false))
}

func (b *SqlBuilder) In(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"in\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "in", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Between(__a ...any) *SqlBuilder {
	first := ltMissing()
	if len(__a) > 0 {
		first = __a[0]
	}
	second := ltMissing()
	if len(__a) > 1 {
		second = __a[1]
	}
	if first == ltMissing() {
		panic("Parameter \"between\" argument #1 was not provided")
	}
	if second == ltMissing() {
		panic("Parameter \"between\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "between", []any{
		ltMap("arg", first, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", first != ltMissing()),
		ltMap("arg", second, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", second != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Like(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"like\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "like", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Ilike(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"ilike\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "ilike", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Not(__a ...any) *SqlBuilder {
	value := ltMissing()
	if len(__a) > 0 {
		value = __a[0]
	}
	if value == ltMissing() {
		panic("Parameter \"not\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "not", []any{
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) And(__a ...any) *SqlBuilder {
	values := ltMissing()
	if len(__a) > 0 {
		values = __a[0]
	}
	if values == ltMissing() {
		panic("Parameter \"and\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "and", []any{
		ltMap("arg", values, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", values != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Or(__a ...any) *SqlBuilder {
	values := ltMissing()
	if len(__a) > 0 {
		values = __a[0]
	}
	if values == ltMissing() {
		panic("Parameter \"or\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "or", []any{
		ltMap("arg", values, "struct", ltMap("union", ltMap("types", []any{ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), ltMap("array", ltMap("type", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))})), "provided", values != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Op(__a ...any) *SqlBuilder {
	operation := ltMissing()
	if len(__a) > 0 {
		operation = __a[0]
	}
	value := ltMissing()
	if len(__a) > 1 {
		value = __a[1]
	}
	if operation == ltMissing() {
		panic("Parameter \"op\" argument #1 was not provided")
	}
	if value == ltMissing() {
		panic("Parameter \"op\" argument #2 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "op", []any{
		ltMap("arg", operation, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", operation != ltMissing()),
		ltMap("arg", value, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", value != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Raw(__a ...any) *SqlBuilder {
	__fargs := []any{}
	if len(__a) > 0 {
		__fargs = append(__fargs, ltMap("arg", __a[0], "struct", map[string]any{"string": map[string]any{"type": "string"}}))
	}
	for __i := 1; __i < len(__a); __i++ {
		__fargs = append(__fargs, ltMap("arg", __a[__i], "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))}))))
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "raw", __fargs, true))
}

func (b *SqlBuilder) Asc(__a ...any) *SqlBuilder {
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "asc", []any{
	}, false))
}

func (b *SqlBuilder) Desc(__a ...any) *SqlBuilder {
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "desc", []any{
	}, false))
}

func (b *SqlBuilder) As(__a ...any) *SqlBuilder {
	alias := ltMissing()
	if len(__a) > 0 {
		alias = __a[0]
	}
	if alias == ltMissing() {
		panic("Parameter \"as\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "as", []any{
		ltMap("arg", alias, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", alias != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Col(__a ...any) *SqlBuilder {
	column := ltMissing()
	if len(__a) > 0 {
		column = __a[0]
	}
	if column == ltMissing() {
		panic("Parameter \"col\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "col", []any{
		ltMap("arg", column, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", column != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Table(__a ...any) *SqlBuilder {
	table := ltMissing()
	if len(__a) > 0 {
		table = __a[0]
	}
	if table == ltMissing() {
		panic("Parameter \"table\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "table", []any{
		ltMap("arg", table, "struct", ltMap("union", ltMap("types", []any{ltMap("string", ltMap("type", "string")), ltMap("number", ltMap("type", "number")), ltMap("boolean", ltMap("type", "boolean")), ltMap("structureCall", ltMap("name", "sql-builder"))})), "provided", table != ltMissing()),
	}, false))
}

func (b *SqlBuilder) SetDialect(__a ...any) *SqlBuilder {
	db := ltMissing()
	if len(__a) > 0 {
		db = __a[0]
	}
	if db == ltMissing() {
		panic("Parameter \"setDialect\" argument #1 was not provided")
	}
	return newSqlBuilder().initFromStructure(createSchema(b.GetSchema(), "setDialect", []any{
		ltMap("arg", db, "struct", ltMap("union", ltMap("types", []any{ltMap("literal", ltMap("value", "postgres", "type", "string")), ltMap("literal", ltMap("value", "mysql", "type", "string")), ltMap("literal", ltMap("value", "sqlite", "type", "string")), ltMap("literal", ltMap("value", "single-store", "type", "string")), ltMap("literal", ltMap("value", "mssql", "type", "string")), ltMap("literal", ltMap("value", "cockroach", "type", "string"))})), "provided", db != ltMissing()),
	}, false))
}

func (b *SqlBuilder) Parse() any {
	root := b.GetSchema()
	__fns := map[string]func(...any) any{}
	var dialect any = ltString("")
	var quote any = ltString("")
	var sql any = ltBufNew()
	var wsql any = ltBufNew()
	var params any = ltListNew()
	var orderSql any = ltString("")
	var orderW any = ltString("")
	var hasOrder any = ltBool(false)
	var tmp any = ltString("")
	var tmp2 any = ltString("")
	var tmpRef any = ltString("")
	var subAlias any = ltString("")
	var withFirst any = ltBool(true)
	__fns["normName"] = func(__a ...any) any {
	  n := __a[0]
	  return ltToLower(ltReplace(n, ltString("-"), ltString("")))
	}
	__fns["pushSql"] = func(__a ...any) any {
	  text := __a[0]
	  sql = ltBufAppend(sql, ltString(" "))
	  sql = ltBufAppend(sql, text)
	  return ltNull()
	}
	__fns["pushW"] = func(__a ...any) any {
	  text := __a[0]
	  wsql = ltBufAppend(wsql, ltString(" "))
	  wsql = ltBufAppend(wsql, text)
	  return ltNull()
	}
	__fns["asString"] = func(__a ...any) any {
	  arg := __a[0]
	  return ltGet(ltGet(arg, ltString("string")), ltString("value"))
	}
	__fns["identStr"] = func(__a ...any) any {
	  name := __a[0]
	  var escapedName any = ltReplace(name, quote, ltStrConcat(quote, quote))
	  var qualifiedName any = ltReplace(escapedName, ltString("."), ltStrConcat(quote, ltStrConcat(ltString("."), quote)))
	  return ltStrConcat(quote, ltStrConcat(qualifiedName, quote))
	}
	__fns["literalOf"] = func(__a ...any) any {
	  arg := __a[0]
	  var outLiteral any = ltString("")
	  if ltTruthy(ltHas(arg, ltString("string"))) {
	    outLiteral = ltStrConcat(ltString("'"), ltStrConcat(ltReplace(ltCall(__fns, "asString", arg), ltString("'"), ltString("''")), ltString("'")))
	  } else if ltTruthy(ltHas(arg, ltString("number"))) {
	    outLiteral = ltToString(ltGet(ltGet(arg, ltString("number")), ltString("value")))
	  } else if ltTruthy(ltHas(arg, ltString("boolean"))) {
	    if ltTruthy(ltGet(ltGet(arg, ltString("boolean")), ltString("value"))) {
	      outLiteral = ltString("TRUE")
	    } else {
	      outLiteral = ltString("FALSE")
	    }
	  } else {
	    outLiteral = ltString("NULL")
	  }
	  return outLiteral
	}
	__fns["opOf"] = func(__a ...any) any {
	  n := __a[0]
	  var o any = ltString("")
	  if ltValueEquals(n, ltString("eq")) {
	    o = ltString("=")
	  } else if ltValueEquals(n, ltString("gt")) {
	    o = ltString(">")
	  } else if ltValueEquals(n, ltString("gte")) {
	    o = ltString(">=")
	  } else if ltValueEquals(n, ltString("lt")) {
	    o = ltString("<")
	  } else if ltValueEquals(n, ltString("lte")) {
	    o = ltString("<=")
	  } else if ltValueEquals(n, ltString("like")) {
	    o = ltString("LIKE")
	  } else if ltValueEquals(n, ltString("ilike")) {
	    if ltValueEquals(dialect, ltString("postgres")) {
	      o = ltString("ILIKE")
	    } else {
	      o = ltString("LIKE")
	    }
	  }
	  return o
	}
	__fns["itemsOf"] = func(__a ...any) any {
	  arg := __a[0]
	  if ltTruthy(ltHas(arg, ltString("array"))) {
	    return ltGet(ltGet(arg, ltString("array")), ltString("value"))
	  }
	  return ltAppend(ltArray(), arg)
	}
	__fns["isRef"] = func(__a ...any) any {
	  chainValues := __a[0]
	  tmpRef = ltString("")
	  if ltAnd(ltValueEquals(ltLen(chainValues), ltNumber(1)), ltTruthy(ltHas(ltIndex(chainValues, ltNumber(0)), ltString("functionCall")))) {
	    var firstName any = ltGet(ltGet(ltIndex(chainValues, ltNumber(0)), "functionCall"), "name")
	    if ltOr(ltValueEquals(firstName, ltString("col")), ltValueEquals(firstName, ltString("table"))) {
	      tmpRef = ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(ltIndex(chainValues, ltNumber(0)), "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	    }
	  }
	  return tmpRef
	}
	__fns["emitParam"] = func(__a ...any) any {
	  arg := __a[0]
	  params = ltListPush(params, arg)
	  if ltValueEquals(dialect, ltString("postgres")) {
	    tmp = ltStrConcat(ltString("$"), ltToString(ltListLen(params)))
	  } else {
	    tmp = ltString("?")
	  }
	  ltCall(__fns, "pushSql", tmp)
	  tmp2 = ltCall(__fns, "literalOf", arg)
	  ltCall(__fns, "pushW", tmp2)
	  return ltNull()
	}
	__fns["emitIdent"] = func(__a ...any) any {
	  name := __a[0]
	  tmp = ltCall(__fns, "identStr", name)
	  ltCall(__fns, "pushSql", tmp)
	  ltCall(__fns, "pushW", tmp)
	  return ltNull()
	}
	__fns["emitRaw"] = func(__a ...any) any {
	  node := __a[0]
	  if ltValueNotEquals(ltBufLen(sql), ltNumber(0)) {
	    sql = ltBufAppend(sql, ltString(" "))
	    wsql = ltBufAppend(wsql, ltString(" "))
	  }
	  for _, rawArg := range ltItems(ltGet(ltGet(node, "functionCall"), "arguments")) {
	    var rawVal any = ltGet(rawArg, ltString("argument"))
	    if ltTruthy(ltHas(rawVal, ltString("string"))) {
	      sql = ltBufAppend(sql, ltCall(__fns, "asString", rawVal))
	      wsql = ltBufAppend(wsql, ltCall(__fns, "asString", rawVal))
	    } else if ltTruthy(ltHas(rawVal, ltString("chain"))) {
	      tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(rawVal, "chain"), "values"))
	      if ltValueNotEquals(tmpRef, ltString("")) {
	        sql = ltBufAppend(sql, ltCall(__fns, "identStr", tmpRef))
	        wsql = ltBufAppend(wsql, ltCall(__fns, "identStr", tmpRef))
	      } else {
	        params = ltListPush(params, rawVal)
	        if ltValueEquals(dialect, ltString("postgres")) {
	          tmp = ltStrConcat(ltString("$"), ltToString(ltListLen(params)))
	        } else {
	          tmp = ltString("?")
	        }
	        sql = ltBufAppend(sql, tmp)
	        tmp2 = ltCall(__fns, "literalOf", rawVal)
	        wsql = ltBufAppend(wsql, tmp2)
	      }
	    } else {
	      params = ltListPush(params, rawVal)
	      if ltValueEquals(dialect, ltString("postgres")) {
	        tmp = ltStrConcat(ltString("$"), ltToString(ltListLen(params)))
	      } else {
	        tmp = ltString("?")
	      }
	      sql = ltBufAppend(sql, tmp)
	      tmp2 = ltCall(__fns, "literalOf", rawVal)
	      wsql = ltBufAppend(wsql, tmp2)
	    }
	  }
	  return ltNull()
	}
	__fns["conflictTarget"] = func(__a ...any) any {
	  arg := __a[0]
	  var ct any = ltString("()")
	  if ltTruthy(ltHas(arg, ltString("chain"))) {
	    tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(arg, "chain"), "values"))
	    if ltValueNotEquals(tmpRef, ltString("")) {
	      ct = ltStrConcat(ltString("("), ltStrConcat(ltCall(__fns, "identStr", tmpRef), ltString(")")))
	    }
	  } else if ltTruthy(ltHas(arg, ltString("string"))) {
	    ct = ltStrConcat(ltString("("), ltStrConcat(ltCall(__fns, "identStr", ltCall(__fns, "asString", arg)), ltString(")")))
	  }
	  return ct
	}
	__fns["firstKind"] = func(__a ...any) any {
	  chainValues := __a[0]
	  var kind any = ltString("")
	  if ltAnd(ltValueNotEquals(ltLen(chainValues), ltNumber(0)), ltTruthy(ltHas(ltIndex(chainValues, ltNumber(0)), ltString("functionCall")))) {
	    kind = ltCall(__fns, "normName", ltGet(ltGet(ltIndex(chainValues, ltNumber(0)), "functionCall"), "name"))
	  }
	  return kind
	}
	__fns["emitOrderItem"] = func(__a ...any) any {
	  item := __a[0]
	  var dir any = ltString("")
	  var ordName any = ltString("")
	  if ltTruthy(ltHas(item, ltString("chain"))) {
	    for _, on := range ltItems(ltGet(ltGet(item, "chain"), "values")) {
	      var onn any = ltCall(__fns, "normName", ltGet(ltGet(on, "functionCall"), "name"))
	      if ltValueEquals(onn, ltString("asc")) {
	        dir = ltString(" ASC")
	      } else if ltValueEquals(onn, ltString("desc")) {
	        dir = ltString(" DESC")
	      } else if ltOr(ltValueEquals(onn, ltString("col")), ltValueEquals(onn, ltString("table"))) {
	        ordName = ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(on, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	      }
	    }
	  }
	  if ltValueNotEquals(ordName, ltString("")) {
	    tmp = ltCall(__fns, "identStr", ordName)
	    orderSql = ltStrConcat(orderSql, ltStrConcat(tmp, dir))
	    orderW = ltStrConcat(orderW, ltStrConcat(tmp, dir))
	  }
	  return ltNull()
	}
	__fns["emitOrderList"] = func(__a ...any) any {
	  arg := __a[0]
	  var firstOrder any = ltBool(true)
	  for _, item := range ltItems(ltCall(__fns, "itemsOf", arg)) {
	    if ltValueEquals(firstOrder, ltBool(false)) {
	      orderSql = ltStrConcat(orderSql, ltString(", "))
	      orderW = ltStrConcat(orderW, ltString(", "))
	    }
	    firstOrder = ltBool(false)
	    ltCall(__fns, "emitOrderItem", item)
	  }
	  return ltNull()
	}
	__fns["flushOrder"] = func(__a ...any) any {
	  if ltTruthy(hasOrder) {
	    ltCall(__fns, "pushSql", ltString("ORDER"))
	    ltCall(__fns, "pushSql", ltString("BY"))
	    ltCall(__fns, "pushW", ltString("ORDER"))
	    ltCall(__fns, "pushW", ltString("BY"))
	    tmp = orderSql
	    if ltValueNotEquals(tmp, ltString("")) {
	      ltCall(__fns, "pushSql", tmp)
	    }
	    tmp2 = orderW
	    if ltValueNotEquals(tmp2, ltString("")) {
	      ltCall(__fns, "pushW", tmp2)
	    }
	    hasOrder = ltBool(false)
	  }
	  return ltNull()
	}
	for _, dialectNode := range ltItems(ltGet(ltGet(ltGet(ltGet(root, "schema"), "chain"), "chain"), "values")) {
	  if ltValueEquals(ltCall(__fns, "normName", ltGet(ltGet(dialectNode, "functionCall"), "name")), ltString("setdialect")) {
	    dialect = ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(dialectNode, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("string")), ltString("value"))
	  }
	}
	if ltValueEquals(dialect, ltString("")) {
	  panic(ltToString(ltString("sql-builder parse: setDialect(...) must be called before parse()")))
	} else if ltAnd(ltValueNotEquals(dialect, ltString("postgres")), ltValueNotEquals(dialect, ltString("mysql"))) {
	  panic(ltToString(ltStrConcat(ltString("sql-builder parse: unsupported dialect "), dialect)))
	}
	if ltValueEquals(dialect, ltString("mysql")) {
	  quote = ltString("`")
	} else {
	  quote = ltString("\"")
	}
	__fns["renderNodes"] = func(__a ...any) any {
	  nodes := __a[0]
	  mode := __a[1]
	  var savedSql any = ltString("")
	  var savedW any = ltString("")
	  var savedOrderSql any = ltString("")
	  var savedOrderW any = ltString("")
	  var savedHasOrder any = ltBool(false)
	  var savedAlias any = ltString("")
	  var subSql any = ltString("")
	  var subW any = ltString("")
	  var subAliasText any = ltString("")
	  var first any = ltBool(true)
	  var left any = ltString("")
	  var hasLeft any = ltBool(false)
	  var base any = ltString("")
	  if ltValueEquals(mode, ltNumber(0)) {
	    for _, node := range ltItems(nodes) {
	      if ltTruthy(ltHas(node, ltString("functionCall"))) {
	        var name any = ltGet(ltGet(node, "functionCall"), "name")
	        var nameNorm any = ltCall(__fns, "normName", name)
	        if ltValueEquals(nameNorm, ltString("setdialect")) {
	          continue
	        } else if ltOr(ltValueEquals(nameNorm, ltString("asc")), ltValueEquals(nameNorm, ltString("desc"))) {
	          if ltTruthy(hasOrder) {
	            tmp = ltToUpper(nameNorm)
	            orderSql = ltStrConcat(orderSql, ltStrConcat(ltString(" "), tmp))
	            orderW = ltStrConcat(orderW, ltStrConcat(ltString(" "), tmp))
	          }
	        } else {
	          if ltValueEquals(nameNorm, ltString("with")) {
	            savedSql = sql
	            savedW = wsql
	            savedOrderSql = orderSql
	            savedOrderW = orderW
	            savedHasOrder = hasOrder
	            sql = ltBufNew()
	            wsql = ltBufNew()
	            orderSql = ltString("")
	            orderW = ltString("")
	            hasOrder = ltBool(false)
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	            subSql = ltTrim(ltBufStr(sql))
	            subW = ltTrim(ltBufStr(wsql))
	            sql = savedSql
	            wsql = savedW
	            orderSql = savedOrderSql
	            orderW = savedOrderW
	            hasOrder = savedHasOrder
	            if ltValueEquals(withFirst, ltBool(false)) {
	              sql = ltBufAppend(sql, ltString(","))
	              wsql = ltBufAppend(wsql, ltString(","))
	            } else {
	              withFirst = ltBool(false)
	              ltCall(__fns, "pushSql", ltString("WITH"))
	              ltCall(__fns, "pushW", ltString("WITH"))
	            }
	            ltCall(__fns, "pushSql", ltCall(__fns, "identStr", ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")))))
	            ltCall(__fns, "pushW", ltCall(__fns, "identStr", ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")))))
	            ltCall(__fns, "pushSql", ltString("AS"))
	            ltCall(__fns, "pushW", ltString("AS"))
	            ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	            ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	          } else if ltValueEquals(nameNorm, ltString("transaction")) {
	            ltCall(__fns, "pushSql", ltString("BEGIN"))
	            ltCall(__fns, "pushW", ltString("BEGIN"))
	            sql = ltBufAppend(sql, ltString(";"))
	            wsql = ltBufAppend(wsql, ltString(";"))
	            var txnFirst any = ltBool(true)
	            for _, txnItem := range ltItems(ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))) {
	              if ltValueEquals(txnFirst, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(";"))
	                wsql = ltBufAppend(wsql, ltString(";"))
	              }
	              txnFirst = ltBool(false)
	              if ltTruthy(ltHas(txnItem, ltString("chain"))) {
	                ltCall(__fns, "renderNodes", ltGet(ltGet(txnItem, "chain"), "values"), ltNumber(0))
	              } else if ltTruthy(ltHas(txnItem, ltString("string"))) {
	                ltCall(__fns, "pushSql", ltCall(__fns, "asString", txnItem))
	                ltCall(__fns, "pushW", ltCall(__fns, "asString", txnItem))
	              } else {
	                if ltTruthy(ltHas(txnItem, ltString("chain"))) {
	                  tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(txnItem, "chain"), "values"))
	                  if ltValueNotEquals(tmpRef, ltString("")) {
	                    ltCall(__fns, "emitIdent", tmpRef)
	                  } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(txnItem, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(txnItem, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(txnItem, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(txnItem, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(txnItem, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(txnItem, "chain"), "values")), ltString("delete")))))) {
	                    savedSql = sql
	                    savedW = wsql
	                    savedOrderSql = orderSql
	                    savedOrderW = orderW
	                    savedHasOrder = hasOrder
	                    savedAlias = subAlias
	                    sql = ltBufNew()
	                    wsql = ltBufNew()
	                    orderSql = ltString("")
	                    orderW = ltString("")
	                    hasOrder = ltBool(false)
	                    subAlias = ltString("")
	                    ltCall(__fns, "renderNodes", ltGet(ltGet(txnItem, "chain"), "values"), ltNumber(0))
	                    subSql = ltTrim(ltBufStr(sql))
	                    subW = ltTrim(ltBufStr(wsql))
	                    subAliasText = subAlias
	                    sql = savedSql
	                    wsql = savedW
	                    orderSql = savedOrderSql
	                    orderW = savedOrderW
	                    hasOrder = savedHasOrder
	                    subAlias = savedAlias
	                    ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                    ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                    if ltValueNotEquals(subAliasText, ltString("")) {
	                      ltCall(__fns, "pushSql", subAliasText)
	                      ltCall(__fns, "pushW", subAliasText)
	                    }
	                  } else {
	                    ltCall(__fns, "emitParam", txnItem)
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", txnItem)
	                }
	              }
	            }
	            if ltValueEquals(txnFirst, ltBool(false)) {
	              sql = ltBufAppend(sql, ltString(";"))
	              wsql = ltBufAppend(wsql, ltString(";"))
	            }
	            ltCall(__fns, "pushSql", ltString("COMMIT"))
	            ltCall(__fns, "pushW", ltString("COMMIT"))
	          } else if ltValueEquals(nameNorm, ltString("select")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("SELECT"))
	            ltCall(__fns, "pushW", ltString("SELECT"))
	            var firstItem any = ltBool(true)
	            for _, item := range ltItems(ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))) {
	              if ltValueEquals(firstItem, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(","))
	                wsql = ltBufAppend(wsql, ltString(","))
	              }
	              firstItem = ltBool(false)
	              if ltTruthy(ltHas(item, ltString("chain"))) {
	                tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(item, "chain"), "values"))
	                if ltValueNotEquals(tmpRef, ltString("")) {
	                  ltCall(__fns, "emitIdent", tmpRef)
	                } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("delete")))))) {
	                  savedSql = sql
	                  savedW = wsql
	                  savedOrderSql = orderSql
	                  savedOrderW = orderW
	                  savedHasOrder = hasOrder
	                  savedAlias = subAlias
	                  sql = ltBufNew()
	                  wsql = ltBufNew()
	                  orderSql = ltString("")
	                  orderW = ltString("")
	                  hasOrder = ltBool(false)
	                  subAlias = ltString("")
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(item, "chain"), "values"), ltNumber(0))
	                  subSql = ltTrim(ltBufStr(sql))
	                  subW = ltTrim(ltBufStr(wsql))
	                  subAliasText = subAlias
	                  sql = savedSql
	                  wsql = savedW
	                  orderSql = savedOrderSql
	                  orderW = savedOrderW
	                  hasOrder = savedHasOrder
	                  subAlias = savedAlias
	                  ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                  ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                  if ltValueNotEquals(subAliasText, ltString("")) {
	                    ltCall(__fns, "pushSql", subAliasText)
	                    ltCall(__fns, "pushW", subAliasText)
	                  }
	                } else {
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(item, "chain"), "values"), ltNumber(1))
	                }
	              } else {
	                ltCall(__fns, "emitParam", item)
	              }
	            }
	          } else if ltValueEquals(nameNorm, ltString("from")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("FROM"))
	            ltCall(__fns, "pushW", ltString("FROM"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	          } else if ltValueEquals(nameNorm, ltString("join")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("JOIN"))
	            ltCall(__fns, "pushW", ltString("JOIN"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	            ltCall(__fns, "pushSql", ltString("ON"))
	            ltCall(__fns, "pushW", ltString("ON"))
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          } else if ltValueEquals(nameNorm, ltString("leftjoin")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("LEFT JOIN"))
	            ltCall(__fns, "pushW", ltString("LEFT JOIN"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	            ltCall(__fns, "pushSql", ltString("ON"))
	            ltCall(__fns, "pushW", ltString("ON"))
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          } else if ltValueEquals(nameNorm, ltString("rightjoin")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("RIGHT JOIN"))
	            ltCall(__fns, "pushW", ltString("RIGHT JOIN"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	            ltCall(__fns, "pushSql", ltString("ON"))
	            ltCall(__fns, "pushW", ltString("ON"))
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          } else if ltValueEquals(nameNorm, ltString("innerjoin")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("INNER JOIN"))
	            ltCall(__fns, "pushW", ltString("INNER JOIN"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	            ltCall(__fns, "pushSql", ltString("ON"))
	            ltCall(__fns, "pushW", ltString("ON"))
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          } else if ltValueEquals(nameNorm, ltString("fulljoin")) {
	            if ltValueEquals(dialect, ltString("mysql")) {
	              panic(ltToString(ltString("sql-builder parse: FULL JOIN is not supported by mysql")))
	            } else {
	              ltCall(__fns, "flushOrder")
	              ltCall(__fns, "pushSql", ltString("FULL JOIN"))
	              ltCall(__fns, "pushW", ltString("FULL JOIN"))
	              if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	                tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	                if ltValueNotEquals(tmpRef, ltString("")) {
	                  ltCall(__fns, "emitIdent", tmpRef)
	                } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                  savedSql = sql
	                  savedW = wsql
	                  savedOrderSql = orderSql
	                  savedOrderW = orderW
	                  savedHasOrder = hasOrder
	                  savedAlias = subAlias
	                  sql = ltBufNew()
	                  wsql = ltBufNew()
	                  orderSql = ltString("")
	                  orderW = ltString("")
	                  hasOrder = ltBool(false)
	                  subAlias = ltString("")
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                  subSql = ltTrim(ltBufStr(sql))
	                  subW = ltTrim(ltBufStr(wsql))
	                  subAliasText = subAlias
	                  sql = savedSql
	                  wsql = savedW
	                  orderSql = savedOrderSql
	                  orderW = savedOrderW
	                  hasOrder = savedHasOrder
	                  subAlias = savedAlias
	                  ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                  ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                  if ltValueNotEquals(subAliasText, ltString("")) {
	                    ltCall(__fns, "pushSql", subAliasText)
	                    ltCall(__fns, "pushW", subAliasText)
	                  }
	                } else {
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	              }
	              ltCall(__fns, "pushSql", ltString("ON"))
	              ltCall(__fns, "pushW", ltString("ON"))
	              ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(1))
	            }
	          } else if ltValueEquals(nameNorm, ltString("crossjoin")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("CROSS JOIN"))
	            ltCall(__fns, "pushW", ltString("CROSS JOIN"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	            ltCall(__fns, "pushSql", ltString("ON"))
	            ltCall(__fns, "pushW", ltString("ON"))
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          } else if ltValueEquals(nameNorm, ltString("where")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("WHERE"))
	            ltCall(__fns, "pushW", ltString("WHERE"))
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          } else if ltValueEquals(nameNorm, ltString("groupby")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("GROUP BY"))
	            ltCall(__fns, "pushW", ltString("GROUP BY"))
	            var firstItem any = ltBool(true)
	            for _, item := range ltItems(ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))) {
	              if ltValueEquals(firstItem, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(","))
	                wsql = ltBufAppend(wsql, ltString(","))
	              }
	              firstItem = ltBool(false)
	              if ltTruthy(ltHas(item, ltString("chain"))) {
	                tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(item, "chain"), "values"))
	                if ltValueNotEquals(tmpRef, ltString("")) {
	                  ltCall(__fns, "emitIdent", tmpRef)
	                } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("delete")))))) {
	                  savedSql = sql
	                  savedW = wsql
	                  savedOrderSql = orderSql
	                  savedOrderW = orderW
	                  savedHasOrder = hasOrder
	                  savedAlias = subAlias
	                  sql = ltBufNew()
	                  wsql = ltBufNew()
	                  orderSql = ltString("")
	                  orderW = ltString("")
	                  hasOrder = ltBool(false)
	                  subAlias = ltString("")
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(item, "chain"), "values"), ltNumber(0))
	                  subSql = ltTrim(ltBufStr(sql))
	                  subW = ltTrim(ltBufStr(wsql))
	                  subAliasText = subAlias
	                  sql = savedSql
	                  wsql = savedW
	                  orderSql = savedOrderSql
	                  orderW = savedOrderW
	                  hasOrder = savedHasOrder
	                  subAlias = savedAlias
	                  ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                  ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                  if ltValueNotEquals(subAliasText, ltString("")) {
	                    ltCall(__fns, "pushSql", subAliasText)
	                    ltCall(__fns, "pushW", subAliasText)
	                  }
	                } else {
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(item, "chain"), "values"), ltNumber(1))
	                }
	              } else {
	                ltCall(__fns, "emitParam", item)
	              }
	            }
	          } else if ltValueEquals(nameNorm, ltString("having")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("HAVING"))
	            ltCall(__fns, "pushW", ltString("HAVING"))
	            ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          } else if ltValueEquals(nameNorm, ltString("returning")) {
	            if ltValueEquals(dialect, ltString("mysql")) {
	              panic(ltToString(ltString("sql-builder parse: RETURNING is not supported by mysql")))
	            } else {
	              ltCall(__fns, "flushOrder")
	              ltCall(__fns, "pushSql", ltString("RETURNING"))
	              ltCall(__fns, "pushW", ltString("RETURNING"))
	              var firstItem any = ltBool(true)
	              for _, item := range ltItems(ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))) {
	                if ltValueEquals(firstItem, ltBool(false)) {
	                  sql = ltBufAppend(sql, ltString(","))
	                  wsql = ltBufAppend(wsql, ltString(","))
	                }
	                firstItem = ltBool(false)
	                if ltTruthy(ltHas(item, ltString("chain"))) {
	                  tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(item, "chain"), "values"))
	                  if ltValueNotEquals(tmpRef, ltString("")) {
	                    ltCall(__fns, "emitIdent", tmpRef)
	                  } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(item, "chain"), "values")), ltString("delete")))))) {
	                    savedSql = sql
	                    savedW = wsql
	                    savedOrderSql = orderSql
	                    savedOrderW = orderW
	                    savedHasOrder = hasOrder
	                    savedAlias = subAlias
	                    sql = ltBufNew()
	                    wsql = ltBufNew()
	                    orderSql = ltString("")
	                    orderW = ltString("")
	                    hasOrder = ltBool(false)
	                    subAlias = ltString("")
	                    ltCall(__fns, "renderNodes", ltGet(ltGet(item, "chain"), "values"), ltNumber(0))
	                    subSql = ltTrim(ltBufStr(sql))
	                    subW = ltTrim(ltBufStr(wsql))
	                    subAliasText = subAlias
	                    sql = savedSql
	                    wsql = savedW
	                    orderSql = savedOrderSql
	                    orderW = savedOrderW
	                    hasOrder = savedHasOrder
	                    subAlias = savedAlias
	                    ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                    ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                    if ltValueNotEquals(subAliasText, ltString("")) {
	                      ltCall(__fns, "pushSql", subAliasText)
	                      ltCall(__fns, "pushW", subAliasText)
	                    }
	                  } else {
	                    ltCall(__fns, "renderNodes", ltGet(ltGet(item, "chain"), "values"), ltNumber(1))
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", item)
	                }
	              }
	            }
	          } else if ltValueEquals(nameNorm, ltString("orderby")) {
	            hasOrder = ltBool(true)
	            orderSql = ltString("")
	            orderW = ltString("")
	            ltCall(__fns, "emitOrderList", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	          } else if ltValueEquals(nameNorm, ltString("limit")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("LIMIT"))
	            ltCall(__fns, "pushW", ltString("LIMIT"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	          } else if ltValueEquals(nameNorm, ltString("offset")) {
	            ltCall(__fns, "flushOrder")
	            ltCall(__fns, "pushSql", ltString("OFFSET"))
	            ltCall(__fns, "pushW", ltString("OFFSET"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	          } else if ltValueEquals(nameNorm, ltString("raw")) {
	            ltCall(__fns, "emitRaw", node)
	          } else if ltValueEquals(nameNorm, ltString("as")) {
	            subAlias = ltStrConcat(ltString("AS "), ltCall(__fns, "identStr", ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))))
	          } else if ltValueEquals(nameNorm, ltString("update")) {
	            ltCall(__fns, "pushSql", ltString("UPDATE"))
	            ltCall(__fns, "pushW", ltString("UPDATE"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	            ltCall(__fns, "pushSql", ltString("SET"))
	            ltCall(__fns, "pushW", ltString("SET"))
	            var assnFirst any = ltBool(true)
	            for _, ak := range ltItems(ltKeys(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"))) {
	              if ltValueEquals(assnFirst, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(","))
	                wsql = ltBufAppend(wsql, ltString(","))
	              }
	              assnFirst = ltBool(false)
	              ltCall(__fns, "pushSql", ltCall(__fns, "identStr", ak))
	              ltCall(__fns, "pushW", ltCall(__fns, "identStr", ak))
	              ltCall(__fns, "pushSql", ltString("="))
	              ltCall(__fns, "pushW", ltString("="))
	              if ltTruthy(ltHas(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), ltString("chain"))) {
	                tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values"))
	                if ltValueNotEquals(tmpRef, ltString("")) {
	                  ltCall(__fns, "emitIdent", tmpRef)
	                } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("delete")))))) {
	                  savedSql = sql
	                  savedW = wsql
	                  savedOrderSql = orderSql
	                  savedOrderW = orderW
	                  savedHasOrder = hasOrder
	                  savedAlias = subAlias
	                  sql = ltBufNew()
	                  wsql = ltBufNew()
	                  orderSql = ltString("")
	                  orderW = ltString("")
	                  hasOrder = ltBool(false)
	                  subAlias = ltString("")
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values"), ltNumber(0))
	                  subSql = ltTrim(ltBufStr(sql))
	                  subW = ltTrim(ltBufStr(wsql))
	                  subAliasText = subAlias
	                  sql = savedSql
	                  wsql = savedW
	                  orderSql = savedOrderSql
	                  orderW = savedOrderW
	                  hasOrder = savedHasOrder
	                  subAlias = savedAlias
	                  ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                  ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                  if ltValueNotEquals(subAliasText, ltString("")) {
	                    ltCall(__fns, "pushSql", subAliasText)
	                    ltCall(__fns, "pushW", subAliasText)
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak))
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak))
	              }
	            }
	          } else if ltValueEquals(nameNorm, ltString("insert")) {
	            ltCall(__fns, "pushSql", ltString("INSERT"))
	            ltCall(__fns, "pushW", ltString("INSERT"))
	            ltCall(__fns, "pushSql", ltString("INTO"))
	            ltCall(__fns, "pushW", ltString("INTO"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	            ltCall(__fns, "pushSql", ltString("("))
	            ltCall(__fns, "pushW", ltString("("))
	            var colFirst any = ltBool(true)
	            for _, ck := range ltItems(ltKeys(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"))) {
	              if ltValueEquals(colFirst, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(","))
	                wsql = ltBufAppend(wsql, ltString(","))
	              }
	              colFirst = ltBool(false)
	              ltCall(__fns, "pushSql", ltCall(__fns, "identStr", ck))
	              ltCall(__fns, "pushW", ltCall(__fns, "identStr", ck))
	            }
	            ltCall(__fns, "pushSql", ltString(")"))
	            ltCall(__fns, "pushW", ltString(")"))
	            ltCall(__fns, "pushSql", ltString("VALUES"))
	            ltCall(__fns, "pushW", ltString("VALUES"))
	            ltCall(__fns, "pushSql", ltString("("))
	            ltCall(__fns, "pushW", ltString("("))
	            var valFirst any = ltBool(true)
	            for _, vk := range ltItems(ltKeys(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"))) {
	              if ltValueEquals(valFirst, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(","))
	                wsql = ltBufAppend(wsql, ltString(","))
	              }
	              valFirst = ltBool(false)
	              if ltTruthy(ltHas(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), ltString("chain"))) {
	                tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values"))
	                if ltValueNotEquals(tmpRef, ltString("")) {
	                  ltCall(__fns, "emitIdent", tmpRef)
	                } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values")), ltString("delete")))))) {
	                  savedSql = sql
	                  savedW = wsql
	                  savedOrderSql = orderSql
	                  savedOrderW = orderW
	                  savedHasOrder = hasOrder
	                  savedAlias = subAlias
	                  sql = ltBufNew()
	                  wsql = ltBufNew()
	                  orderSql = ltString("")
	                  orderW = ltString("")
	                  hasOrder = ltBool(false)
	                  subAlias = ltString("")
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk), "chain"), "values"), ltNumber(0))
	                  subSql = ltTrim(ltBufStr(sql))
	                  subW = ltTrim(ltBufStr(wsql))
	                  subAliasText = subAlias
	                  sql = savedSql
	                  wsql = savedW
	                  orderSql = savedOrderSql
	                  orderW = savedOrderW
	                  hasOrder = savedHasOrder
	                  subAlias = savedAlias
	                  ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                  ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                  if ltValueNotEquals(subAliasText, ltString("")) {
	                    ltCall(__fns, "pushSql", subAliasText)
	                    ltCall(__fns, "pushW", subAliasText)
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk))
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), vk))
	              }
	            }
	            ltCall(__fns, "pushSql", ltString(")"))
	            ltCall(__fns, "pushW", ltString(")"))
	          } else if ltValueEquals(nameNorm, ltString("delete")) {
	            ltCall(__fns, "pushSql", ltString("DELETE"))
	            ltCall(__fns, "pushW", ltString("DELETE"))
	            ltCall(__fns, "pushSql", ltString("FROM"))
	            ltCall(__fns, "pushW", ltString("FROM"))
	            if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	              tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	              if ltValueNotEquals(tmpRef, ltString("")) {
	                ltCall(__fns, "emitIdent", tmpRef)
	              } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	                savedSql = sql
	                savedW = wsql
	                savedOrderSql = orderSql
	                savedOrderW = orderW
	                savedHasOrder = hasOrder
	                savedAlias = subAlias
	                sql = ltBufNew()
	                wsql = ltBufNew()
	                orderSql = ltString("")
	                orderW = ltString("")
	                hasOrder = ltBool(false)
	                subAlias = ltString("")
	                ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	                subSql = ltTrim(ltBufStr(sql))
	                subW = ltTrim(ltBufStr(wsql))
	                subAliasText = subAlias
	                sql = savedSql
	                wsql = savedW
	                orderSql = savedOrderSql
	                orderW = savedOrderW
	                hasOrder = savedHasOrder
	                subAlias = savedAlias
	                ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                if ltValueNotEquals(subAliasText, ltString("")) {
	                  ltCall(__fns, "pushSql", subAliasText)
	                  ltCall(__fns, "pushW", subAliasText)
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	          } else if ltValueEquals(nameNorm, ltString("set")) {
	            ltCall(__fns, "pushSql", ltString("SET"))
	            ltCall(__fns, "pushW", ltString("SET"))
	            var assnFirst any = ltBool(true)
	            for _, ak := range ltItems(ltKeys(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"))) {
	              if ltValueEquals(assnFirst, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(","))
	                wsql = ltBufAppend(wsql, ltString(","))
	              }
	              assnFirst = ltBool(false)
	              ltCall(__fns, "pushSql", ltCall(__fns, "identStr", ak))
	              ltCall(__fns, "pushW", ltCall(__fns, "identStr", ak))
	              ltCall(__fns, "pushSql", ltString("="))
	              ltCall(__fns, "pushW", ltString("="))
	              if ltTruthy(ltHas(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), ltString("chain"))) {
	                tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values"))
	                if ltValueNotEquals(tmpRef, ltString("")) {
	                  ltCall(__fns, "emitIdent", tmpRef)
	                } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("delete")))))) {
	                  savedSql = sql
	                  savedW = wsql
	                  savedOrderSql = orderSql
	                  savedOrderW = orderW
	                  savedHasOrder = hasOrder
	                  savedAlias = subAlias
	                  sql = ltBufNew()
	                  wsql = ltBufNew()
	                  orderSql = ltString("")
	                  orderW = ltString("")
	                  hasOrder = ltBool(false)
	                  subAlias = ltString("")
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak), "chain"), "values"), ltNumber(0))
	                  subSql = ltTrim(ltBufStr(sql))
	                  subW = ltTrim(ltBufStr(wsql))
	                  subAliasText = subAlias
	                  sql = savedSql
	                  wsql = savedW
	                  orderSql = savedOrderSql
	                  orderW = savedOrderW
	                  hasOrder = savedHasOrder
	                  subAlias = savedAlias
	                  ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                  ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                  if ltValueNotEquals(subAliasText, ltString("")) {
	                    ltCall(__fns, "pushSql", subAliasText)
	                    ltCall(__fns, "pushW", subAliasText)
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak))
	                }
	              } else {
	                ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "object"), "value"), ak))
	              }
	            }
	          } else if ltValueEquals(nameNorm, ltString("values")) {
	            ltCall(__fns, "pushSql", ltString("VALUES"))
	            ltCall(__fns, "pushW", ltString("VALUES"))
	            var valueRows any = ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            var valueFirst any = ltBool(true)
	            if ltAnd(ltValueNotEquals(ltLen(valueRows), ltNumber(0)), ltTruthy(ltHas(ltIndex(valueRows, ltNumber(0)), ltString("array")))) {
	              for _, tuple := range ltItems(valueRows) {
	                if ltValueEquals(valueFirst, ltBool(false)) {
	                  sql = ltBufAppend(sql, ltString(","))
	                  wsql = ltBufAppend(wsql, ltString(","))
	                }
	                valueFirst = ltBool(false)
	                if ltValueEquals(dialect, ltString("mysql")) {
	                  ltCall(__fns, "pushSql", ltString("ROW"))
	                  ltCall(__fns, "pushW", ltString("ROW"))
	                }
	                ltCall(__fns, "pushSql", ltString("("))
	                ltCall(__fns, "pushW", ltString("("))
	                var itemFirst any = ltBool(true)
	                for _, ti := range ltItems(ltCall(__fns, "itemsOf", tuple)) {
	                  if ltValueEquals(itemFirst, ltBool(false)) {
	                    sql = ltBufAppend(sql, ltString(","))
	                    wsql = ltBufAppend(wsql, ltString(","))
	                  }
	                  itemFirst = ltBool(false)
	                  if ltTruthy(ltHas(ti, ltString("chain"))) {
	                    tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ti, "chain"), "values"))
	                    if ltValueNotEquals(tmpRef, ltString("")) {
	                      ltCall(__fns, "emitIdent", tmpRef)
	                    } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("delete")))))) {
	                      savedSql = sql
	                      savedW = wsql
	                      savedOrderSql = orderSql
	                      savedOrderW = orderW
	                      savedHasOrder = hasOrder
	                      savedAlias = subAlias
	                      sql = ltBufNew()
	                      wsql = ltBufNew()
	                      orderSql = ltString("")
	                      orderW = ltString("")
	                      hasOrder = ltBool(false)
	                      subAlias = ltString("")
	                      ltCall(__fns, "renderNodes", ltGet(ltGet(ti, "chain"), "values"), ltNumber(0))
	                      subSql = ltTrim(ltBufStr(sql))
	                      subW = ltTrim(ltBufStr(wsql))
	                      subAliasText = subAlias
	                      sql = savedSql
	                      wsql = savedW
	                      orderSql = savedOrderSql
	                      orderW = savedOrderW
	                      hasOrder = savedHasOrder
	                      subAlias = savedAlias
	                      ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                      ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                      if ltValueNotEquals(subAliasText, ltString("")) {
	                        ltCall(__fns, "pushSql", subAliasText)
	                        ltCall(__fns, "pushW", subAliasText)
	                      }
	                    } else {
	                      ltCall(__fns, "emitParam", ti)
	                    }
	                  } else {
	                    ltCall(__fns, "emitParam", ti)
	                  }
	                }
	                ltCall(__fns, "pushSql", ltString(")"))
	                ltCall(__fns, "pushW", ltString(")"))
	              }
	            } else {
	              if ltValueEquals(dialect, ltString("mysql")) {
	                ltCall(__fns, "pushSql", ltString("ROW"))
	                ltCall(__fns, "pushW", ltString("ROW"))
	              }
	              ltCall(__fns, "pushSql", ltString("("))
	              ltCall(__fns, "pushW", ltString("("))
	              var itemFirst any = ltBool(true)
	              for _, ti := range ltItems(valueRows) {
	                if ltValueEquals(itemFirst, ltBool(false)) {
	                  sql = ltBufAppend(sql, ltString(","))
	                  wsql = ltBufAppend(wsql, ltString(","))
	                }
	                itemFirst = ltBool(false)
	                if ltTruthy(ltHas(ti, ltString("chain"))) {
	                  tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ti, "chain"), "values"))
	                  if ltValueNotEquals(tmpRef, ltString("")) {
	                    ltCall(__fns, "emitIdent", tmpRef)
	                  } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ti, "chain"), "values")), ltString("delete")))))) {
	                    savedSql = sql
	                    savedW = wsql
	                    savedOrderSql = orderSql
	                    savedOrderW = orderW
	                    savedHasOrder = hasOrder
	                    savedAlias = subAlias
	                    sql = ltBufNew()
	                    wsql = ltBufNew()
	                    orderSql = ltString("")
	                    orderW = ltString("")
	                    hasOrder = ltBool(false)
	                    subAlias = ltString("")
	                    ltCall(__fns, "renderNodes", ltGet(ltGet(ti, "chain"), "values"), ltNumber(0))
	                    subSql = ltTrim(ltBufStr(sql))
	                    subW = ltTrim(ltBufStr(wsql))
	                    subAliasText = subAlias
	                    sql = savedSql
	                    wsql = savedW
	                    orderSql = savedOrderSql
	                    orderW = savedOrderW
	                    hasOrder = savedHasOrder
	                    subAlias = savedAlias
	                    ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                    ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                    if ltValueNotEquals(subAliasText, ltString("")) {
	                      ltCall(__fns, "pushSql", subAliasText)
	                      ltCall(__fns, "pushW", subAliasText)
	                    }
	                  } else {
	                    ltCall(__fns, "emitParam", ti)
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", ti)
	                }
	              }
	              ltCall(__fns, "pushSql", ltString(")"))
	              ltCall(__fns, "pushW", ltString(")"))
	            }
	          } else if ltValueEquals(nameNorm, ltString("onconflictdonothing")) {
	            if ltValueEquals(dialect, ltString("mysql")) {
	              panic(ltToString(ltString("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")))
	            } else {
	              ltCall(__fns, "pushSql", ltString("ON"))
	              ltCall(__fns, "pushW", ltString("ON"))
	              ltCall(__fns, "pushSql", ltString("CONFLICT"))
	              ltCall(__fns, "pushW", ltString("CONFLICT"))
	              ltCall(__fns, "pushSql", ltCall(__fns, "conflictTarget", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	              ltCall(__fns, "pushW", ltCall(__fns, "conflictTarget", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	              ltCall(__fns, "pushSql", ltString("DO"))
	              ltCall(__fns, "pushW", ltString("DO"))
	              ltCall(__fns, "pushSql", ltString("NOTHING"))
	              ltCall(__fns, "pushW", ltString("NOTHING"))
	            }
	          } else if ltValueEquals(nameNorm, ltString("onconflictdoupdate")) {
	            if ltValueEquals(dialect, ltString("mysql")) {
	              ltCall(__fns, "pushSql", ltString("ON"))
	              ltCall(__fns, "pushW", ltString("ON"))
	              ltCall(__fns, "pushSql", ltString("DUPLICATE"))
	              ltCall(__fns, "pushW", ltString("DUPLICATE"))
	              ltCall(__fns, "pushSql", ltString("KEY"))
	              ltCall(__fns, "pushW", ltString("KEY"))
	              ltCall(__fns, "pushSql", ltString("UPDATE"))
	              ltCall(__fns, "pushW", ltString("UPDATE"))
	              var assnFirst any = ltBool(true)
	              for _, ak := range ltItems(ltKeys(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"))) {
	                if ltValueEquals(assnFirst, ltBool(false)) {
	                  sql = ltBufAppend(sql, ltString(","))
	                  wsql = ltBufAppend(wsql, ltString(","))
	                }
	                assnFirst = ltBool(false)
	                ltCall(__fns, "pushSql", ltCall(__fns, "identStr", ak))
	                ltCall(__fns, "pushW", ltCall(__fns, "identStr", ak))
	                ltCall(__fns, "pushSql", ltString("="))
	                ltCall(__fns, "pushW", ltString("="))
	                if ltTruthy(ltHas(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), ltString("chain"))) {
	                  tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values"))
	                  if ltValueNotEquals(tmpRef, ltString("")) {
	                    ltCall(__fns, "emitIdent", tmpRef)
	                  } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("delete")))))) {
	                    savedSql = sql
	                    savedW = wsql
	                    savedOrderSql = orderSql
	                    savedOrderW = orderW
	                    savedHasOrder = hasOrder
	                    savedAlias = subAlias
	                    sql = ltBufNew()
	                    wsql = ltBufNew()
	                    orderSql = ltString("")
	                    orderW = ltString("")
	                    hasOrder = ltBool(false)
	                    subAlias = ltString("")
	                    ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values"), ltNumber(0))
	                    subSql = ltTrim(ltBufStr(sql))
	                    subW = ltTrim(ltBufStr(wsql))
	                    subAliasText = subAlias
	                    sql = savedSql
	                    wsql = savedW
	                    orderSql = savedOrderSql
	                    orderW = savedOrderW
	                    hasOrder = savedHasOrder
	                    subAlias = savedAlias
	                    ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                    ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                    if ltValueNotEquals(subAliasText, ltString("")) {
	                      ltCall(__fns, "pushSql", subAliasText)
	                      ltCall(__fns, "pushW", subAliasText)
	                    }
	                  } else {
	                    ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak))
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak))
	                }
	              }
	            } else {
	              ltCall(__fns, "pushSql", ltString("ON"))
	              ltCall(__fns, "pushW", ltString("ON"))
	              ltCall(__fns, "pushSql", ltString("CONFLICT"))
	              ltCall(__fns, "pushW", ltString("CONFLICT"))
	              ltCall(__fns, "pushSql", ltCall(__fns, "conflictTarget", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	              ltCall(__fns, "pushW", ltCall(__fns, "conflictTarget", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	              ltCall(__fns, "pushSql", ltString("DO"))
	              ltCall(__fns, "pushW", ltString("DO"))
	              ltCall(__fns, "pushSql", ltString("UPDATE"))
	              ltCall(__fns, "pushW", ltString("UPDATE"))
	              ltCall(__fns, "pushSql", ltString("SET"))
	              ltCall(__fns, "pushW", ltString("SET"))
	              var assnFirst any = ltBool(true)
	              for _, ak := range ltItems(ltKeys(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"))) {
	                if ltValueEquals(assnFirst, ltBool(false)) {
	                  sql = ltBufAppend(sql, ltString(","))
	                  wsql = ltBufAppend(wsql, ltString(","))
	                }
	                assnFirst = ltBool(false)
	                ltCall(__fns, "pushSql", ltCall(__fns, "identStr", ak))
	                ltCall(__fns, "pushW", ltCall(__fns, "identStr", ak))
	                ltCall(__fns, "pushSql", ltString("="))
	                ltCall(__fns, "pushW", ltString("="))
	                if ltTruthy(ltHas(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), ltString("chain"))) {
	                  tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values"))
	                  if ltValueNotEquals(tmpRef, ltString("")) {
	                    ltCall(__fns, "emitIdent", tmpRef)
	                  } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values")), ltString("delete")))))) {
	                    savedSql = sql
	                    savedW = wsql
	                    savedOrderSql = orderSql
	                    savedOrderW = orderW
	                    savedHasOrder = hasOrder
	                    savedAlias = subAlias
	                    sql = ltBufNew()
	                    wsql = ltBufNew()
	                    orderSql = ltString("")
	                    orderW = ltString("")
	                    hasOrder = ltBool(false)
	                    subAlias = ltString("")
	                    ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak), "chain"), "values"), ltNumber(0))
	                    subSql = ltTrim(ltBufStr(sql))
	                    subW = ltTrim(ltBufStr(wsql))
	                    subAliasText = subAlias
	                    sql = savedSql
	                    wsql = savedW
	                    orderSql = savedOrderSql
	                    orderW = savedOrderW
	                    hasOrder = savedHasOrder
	                    subAlias = savedAlias
	                    ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                    ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                    if ltValueNotEquals(subAliasText, ltString("")) {
	                      ltCall(__fns, "pushSql", subAliasText)
	                      ltCall(__fns, "pushW", subAliasText)
	                    }
	                  } else {
	                    ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak))
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", ltGet(ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "object"), "value"), ak))
	                }
	              }
	            }
	          } else {
	            panic(ltToString(ltStrConcat(ltString("sql-builder parse: unsupported clause "), name)))
	          }
	        }
	      }
	    }
	    ltCall(__fns, "flushOrder")
	    return ltNull()
	  } else {
	    first = ltBool(true)
	    left = ltString("")
	    hasLeft = ltBool(false)
	    base = ltString("")
	    for _, node := range ltItems(nodes) {
	      var pn any = ltCall(__fns, "normName", ltGet(ltGet(node, "functionCall"), "name"))
	      var op any = ltCall(__fns, "opOf", pn)
	      if ltTruthy(ltHas(node, ltString("functionCall"))) {
	        if ltOr(ltValueEquals(pn, ltString("col")), ltValueEquals(pn, ltString("table"))) {
	          left = ltCall(__fns, "identStr", ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	          hasLeft = ltBool(true)
	        } else if ltTruthy(op) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          if ltTruthy(hasLeft) {
	            base = left
	          } else {
	            base = ltString("?")
	          }
	          ltCall(__fns, "pushSql", base)
	          ltCall(__fns, "pushW", base)
	          ltCall(__fns, "pushSql", op)
	          ltCall(__fns, "pushW", op)
	          if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	            tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	            if ltValueNotEquals(tmpRef, ltString("")) {
	              ltCall(__fns, "emitIdent", tmpRef)
	            } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	              savedSql = sql
	              savedW = wsql
	              savedOrderSql = orderSql
	              savedOrderW = orderW
	              savedHasOrder = hasOrder
	              savedAlias = subAlias
	              sql = ltBufNew()
	              wsql = ltBufNew()
	              orderSql = ltString("")
	              orderW = ltString("")
	              hasOrder = ltBool(false)
	              subAlias = ltString("")
	              ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	              subSql = ltTrim(ltBufStr(sql))
	              subW = ltTrim(ltBufStr(wsql))
	              subAliasText = subAlias
	              sql = savedSql
	              wsql = savedW
	              orderSql = savedOrderSql
	              orderW = savedOrderW
	              hasOrder = savedHasOrder
	              subAlias = savedAlias
	              ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	              ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	              if ltValueNotEquals(subAliasText, ltString("")) {
	                ltCall(__fns, "pushSql", subAliasText)
	                ltCall(__fns, "pushW", subAliasText)
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	          } else {
	            ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	          }
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("exists")) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          ltCall(__fns, "pushSql", ltString("EXISTS"))
	          ltCall(__fns, "pushW", ltString("EXISTS"))
	          if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	            tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	            if ltValueNotEquals(tmpRef, ltString("")) {
	              ltCall(__fns, "emitIdent", tmpRef)
	            } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	              savedSql = sql
	              savedW = wsql
	              savedOrderSql = orderSql
	              savedOrderW = orderW
	              savedHasOrder = hasOrder
	              savedAlias = subAlias
	              sql = ltBufNew()
	              wsql = ltBufNew()
	              orderSql = ltString("")
	              orderW = ltString("")
	              hasOrder = ltBool(false)
	              subAlias = ltString("")
	              ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	              subSql = ltTrim(ltBufStr(sql))
	              subW = ltTrim(ltBufStr(wsql))
	              subAliasText = subAlias
	              sql = savedSql
	              wsql = savedW
	              orderSql = savedOrderSql
	              orderW = savedOrderW
	              hasOrder = savedHasOrder
	              subAlias = savedAlias
	              ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	              ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	              if ltValueNotEquals(subAliasText, ltString("")) {
	                ltCall(__fns, "pushSql", subAliasText)
	                ltCall(__fns, "pushW", subAliasText)
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	          } else {
	            ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	          }
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("in")) {
	          if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	            if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	              if ltValueEquals(first, ltBool(false)) {
	                ltCall(__fns, "pushSql", ltString("AND"))
	                ltCall(__fns, "pushW", ltString("AND"))
	              }
	              first = ltBool(false)
	              if ltTruthy(hasLeft) {
	                base = left
	              } else {
	                base = ltString("?")
	              }
	              ltCall(__fns, "pushSql", base)
	              ltCall(__fns, "pushW", base)
	              ltCall(__fns, "pushSql", ltString("IN"))
	              ltCall(__fns, "pushW", ltString("IN"))
	              savedSql = sql
	              savedW = wsql
	              savedOrderSql = orderSql
	              savedOrderW = orderW
	              savedHasOrder = hasOrder
	              savedAlias = subAlias
	              sql = ltBufNew()
	              wsql = ltBufNew()
	              orderSql = ltString("")
	              orderW = ltString("")
	              hasOrder = ltBool(false)
	              subAlias = ltString("")
	              ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	              subSql = ltTrim(ltBufStr(sql))
	              subW = ltTrim(ltBufStr(wsql))
	              subAliasText = subAlias
	              sql = savedSql
	              wsql = savedW
	              orderSql = savedOrderSql
	              orderW = savedOrderW
	              hasOrder = savedHasOrder
	              subAlias = savedAlias
	              ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	              ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	              if ltValueNotEquals(subAliasText, ltString("")) {
	                ltCall(__fns, "pushSql", subAliasText)
	                ltCall(__fns, "pushW", subAliasText)
	              }
	            } else {
	              if ltValueEquals(first, ltBool(false)) {
	                ltCall(__fns, "pushSql", ltString("AND"))
	                ltCall(__fns, "pushW", ltString("AND"))
	              }
	              first = ltBool(false)
	              if ltTruthy(hasLeft) {
	                base = left
	              } else {
	                base = ltString("?")
	              }
	              ltCall(__fns, "pushSql", base)
	              ltCall(__fns, "pushW", base)
	              ltCall(__fns, "pushSql", ltString("IN ("))
	              ltCall(__fns, "pushW", ltString("IN ("))
	              var inFirst any = ltBool(true)
	              for _, iv := range ltItems(ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))) {
	                if ltValueEquals(inFirst, ltBool(false)) {
	                  sql = ltBufAppend(sql, ltString(","))
	                  wsql = ltBufAppend(wsql, ltString(","))
	                }
	                inFirst = ltBool(false)
	                if ltTruthy(ltHas(iv, ltString("chain"))) {
	                  tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(iv, "chain"), "values"))
	                  if ltValueNotEquals(tmpRef, ltString("")) {
	                    ltCall(__fns, "emitIdent", tmpRef)
	                  } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("delete")))))) {
	                    savedSql = sql
	                    savedW = wsql
	                    savedOrderSql = orderSql
	                    savedOrderW = orderW
	                    savedHasOrder = hasOrder
	                    savedAlias = subAlias
	                    sql = ltBufNew()
	                    wsql = ltBufNew()
	                    orderSql = ltString("")
	                    orderW = ltString("")
	                    hasOrder = ltBool(false)
	                    subAlias = ltString("")
	                    ltCall(__fns, "renderNodes", ltGet(ltGet(iv, "chain"), "values"), ltNumber(0))
	                    subSql = ltTrim(ltBufStr(sql))
	                    subW = ltTrim(ltBufStr(wsql))
	                    subAliasText = subAlias
	                    sql = savedSql
	                    wsql = savedW
	                    orderSql = savedOrderSql
	                    orderW = savedOrderW
	                    hasOrder = savedHasOrder
	                    subAlias = savedAlias
	                    ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                    ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                    if ltValueNotEquals(subAliasText, ltString("")) {
	                      ltCall(__fns, "pushSql", subAliasText)
	                      ltCall(__fns, "pushW", subAliasText)
	                    }
	                  } else {
	                    ltCall(__fns, "emitParam", iv)
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", iv)
	                }
	              }
	              ltCall(__fns, "pushSql", ltString(")"))
	              ltCall(__fns, "pushW", ltString(")"))
	            }
	          } else {
	            if ltValueEquals(first, ltBool(false)) {
	              ltCall(__fns, "pushSql", ltString("AND"))
	              ltCall(__fns, "pushW", ltString("AND"))
	            }
	            first = ltBool(false)
	            if ltTruthy(hasLeft) {
	              base = left
	            } else {
	              base = ltString("?")
	            }
	            ltCall(__fns, "pushSql", base)
	            ltCall(__fns, "pushW", base)
	            ltCall(__fns, "pushSql", ltString("IN ("))
	            ltCall(__fns, "pushW", ltString("IN ("))
	            var inFirst any = ltBool(true)
	            for _, iv := range ltItems(ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))) {
	              if ltValueEquals(inFirst, ltBool(false)) {
	                sql = ltBufAppend(sql, ltString(","))
	                wsql = ltBufAppend(wsql, ltString(","))
	              }
	              inFirst = ltBool(false)
	              if ltTruthy(ltHas(iv, ltString("chain"))) {
	                tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(iv, "chain"), "values"))
	                if ltValueNotEquals(tmpRef, ltString("")) {
	                  ltCall(__fns, "emitIdent", tmpRef)
	                } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(iv, "chain"), "values")), ltString("delete")))))) {
	                  savedSql = sql
	                  savedW = wsql
	                  savedOrderSql = orderSql
	                  savedOrderW = orderW
	                  savedHasOrder = hasOrder
	                  savedAlias = subAlias
	                  sql = ltBufNew()
	                  wsql = ltBufNew()
	                  orderSql = ltString("")
	                  orderW = ltString("")
	                  hasOrder = ltBool(false)
	                  subAlias = ltString("")
	                  ltCall(__fns, "renderNodes", ltGet(ltGet(iv, "chain"), "values"), ltNumber(0))
	                  subSql = ltTrim(ltBufStr(sql))
	                  subW = ltTrim(ltBufStr(wsql))
	                  subAliasText = subAlias
	                  sql = savedSql
	                  wsql = savedW
	                  orderSql = savedOrderSql
	                  orderW = savedOrderW
	                  hasOrder = savedHasOrder
	                  subAlias = savedAlias
	                  ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	                  ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	                  if ltValueNotEquals(subAliasText, ltString("")) {
	                    ltCall(__fns, "pushSql", subAliasText)
	                    ltCall(__fns, "pushW", subAliasText)
	                  }
	                } else {
	                  ltCall(__fns, "emitParam", iv)
	                }
	              } else {
	                ltCall(__fns, "emitParam", iv)
	              }
	            }
	            ltCall(__fns, "pushSql", ltString(")"))
	            ltCall(__fns, "pushW", ltString(")"))
	          }
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("between")) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          if ltTruthy(hasLeft) {
	            base = left
	          } else {
	            base = ltString("?")
	          }
	          ltCall(__fns, "pushSql", base)
	          ltCall(__fns, "pushW", base)
	          ltCall(__fns, "pushSql", ltString("BETWEEN"))
	          ltCall(__fns, "pushW", ltString("BETWEEN"))
	          if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), ltString("chain"))) {
	            tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"))
	            if ltValueNotEquals(tmpRef, ltString("")) {
	              ltCall(__fns, "emitIdent", tmpRef)
	            } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	              savedSql = sql
	              savedW = wsql
	              savedOrderSql = orderSql
	              savedOrderW = orderW
	              savedHasOrder = hasOrder
	              savedAlias = subAlias
	              sql = ltBufNew()
	              wsql = ltBufNew()
	              orderSql = ltString("")
	              orderW = ltString("")
	              hasOrder = ltBool(false)
	              subAlias = ltString("")
	              ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(0))
	              subSql = ltTrim(ltBufStr(sql))
	              subW = ltTrim(ltBufStr(wsql))
	              subAliasText = subAlias
	              sql = savedSql
	              wsql = savedW
	              orderSql = savedOrderSql
	              orderW = savedOrderW
	              hasOrder = savedHasOrder
	              subAlias = savedAlias
	              ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	              ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	              if ltValueNotEquals(subAliasText, ltString("")) {
	                ltCall(__fns, "pushSql", subAliasText)
	                ltCall(__fns, "pushW", subAliasText)
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	            }
	          } else {
	            ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))
	          }
	          ltCall(__fns, "pushSql", ltString("AND"))
	          ltCall(__fns, "pushW", ltString("AND"))
	          if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), ltString("chain"))) {
	            tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"))
	            if ltValueNotEquals(tmpRef, ltString("")) {
	              ltCall(__fns, "emitIdent", tmpRef)
	            } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	              savedSql = sql
	              savedW = wsql
	              savedOrderSql = orderSql
	              savedOrderW = orderW
	              savedHasOrder = hasOrder
	              savedAlias = subAlias
	              sql = ltBufNew()
	              wsql = ltBufNew()
	              orderSql = ltString("")
	              orderW = ltString("")
	              hasOrder = ltBool(false)
	              subAlias = ltString("")
	              ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(0))
	              subSql = ltTrim(ltBufStr(sql))
	              subW = ltTrim(ltBufStr(wsql))
	              subAliasText = subAlias
	              sql = savedSql
	              wsql = savedW
	              orderSql = savedOrderSql
	              orderW = savedOrderW
	              hasOrder = savedHasOrder
	              subAlias = savedAlias
	              ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	              ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	              if ltValueNotEquals(subAliasText, ltString("")) {
	                ltCall(__fns, "pushSql", subAliasText)
	                ltCall(__fns, "pushW", subAliasText)
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")))
	            }
	          } else {
	            ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")))
	          }
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("isnull")) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          if ltTruthy(hasLeft) {
	            base = left
	          } else {
	            base = ltString("?")
	          }
	          ltCall(__fns, "pushSql", base)
	          ltCall(__fns, "pushW", base)
	          ltCall(__fns, "pushSql", ltString("IS NULL"))
	          ltCall(__fns, "pushW", ltString("IS NULL"))
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("isnotnull")) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          if ltTruthy(hasLeft) {
	            base = left
	          } else {
	            base = ltString("?")
	          }
	          ltCall(__fns, "pushSql", base)
	          ltCall(__fns, "pushW", base)
	          ltCall(__fns, "pushSql", ltString("IS NOT NULL"))
	          ltCall(__fns, "pushW", ltString("IS NOT NULL"))
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("not")) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          ltCall(__fns, "pushSql", ltString("NOT ("))
	          ltCall(__fns, "pushW", ltString("NOT ("))
	          ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")), "chain"), "values"), ltNumber(1))
	          ltCall(__fns, "pushSql", ltString(")"))
	          ltCall(__fns, "pushW", ltString(")"))
	          hasLeft = ltBool(false)
	        } else if ltOr(ltValueEquals(pn, ltString("and")), ltValueEquals(pn, ltString("or"))) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          ltCall(__fns, "pushSql", ltString("("))
	          ltCall(__fns, "pushW", ltString("("))
	          var boolFirst any = ltBool(true)
	          for _, bv := range ltItems(ltCall(__fns, "itemsOf", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument")))) {
	            if ltValueEquals(boolFirst, ltBool(false)) {
	              tmp = ltToUpper(pn)
	              ltCall(__fns, "pushSql", tmp)
	              ltCall(__fns, "pushW", tmp)
	            }
	            boolFirst = ltBool(false)
	            if ltTruthy(ltHas(bv, ltString("chain"))) {
	              ltCall(__fns, "renderNodes", ltGet(ltGet(bv, "chain"), "values"), ltNumber(1))
	            } else {
	              ltCall(__fns, "emitParam", bv)
	            }
	          }
	          ltCall(__fns, "pushSql", ltString(")"))
	          ltCall(__fns, "pushW", ltString(")"))
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("as")) {
	          if ltTruthy(hasLeft) {
	            base = left
	          } else {
	            base = ltString("?")
	          }
	          ltCall(__fns, "pushSql", base)
	          ltCall(__fns, "pushW", base)
	          ltCall(__fns, "pushSql", ltString("AS"))
	          ltCall(__fns, "pushW", ltString("AS"))
	          ltCall(__fns, "emitIdent", ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("op")) {
	          if ltValueEquals(first, ltBool(false)) {
	            ltCall(__fns, "pushSql", ltString("AND"))
	            ltCall(__fns, "pushW", ltString("AND"))
	          }
	          first = ltBool(false)
	          if ltTruthy(hasLeft) {
	            base = left
	          } else {
	            base = ltString("?")
	          }
	          ltCall(__fns, "pushSql", base)
	          ltCall(__fns, "pushW", base)
	          ltCall(__fns, "pushSql", ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	          ltCall(__fns, "pushW", ltCall(__fns, "asString", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(0)), ltString("argument"))))
	          if ltTruthy(ltHas(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), ltString("chain"))) {
	            tmpRef = ltCall(__fns, "isRef", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"))
	            if ltValueNotEquals(tmpRef, ltString("")) {
	              ltCall(__fns, "emitIdent", tmpRef)
	            } else if ltOr(ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("select")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("with"))), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("values")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("insert")), ltOr(ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("update")), ltValueEquals(ltCall(__fns, "firstKind", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values")), ltString("delete")))))) {
	              savedSql = sql
	              savedW = wsql
	              savedOrderSql = orderSql
	              savedOrderW = orderW
	              savedHasOrder = hasOrder
	              savedAlias = subAlias
	              sql = ltBufNew()
	              wsql = ltBufNew()
	              orderSql = ltString("")
	              orderW = ltString("")
	              hasOrder = ltBool(false)
	              subAlias = ltString("")
	              ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")), "chain"), "values"), ltNumber(0))
	              subSql = ltTrim(ltBufStr(sql))
	              subW = ltTrim(ltBufStr(wsql))
	              subAliasText = subAlias
	              sql = savedSql
	              wsql = savedW
	              orderSql = savedOrderSql
	              orderW = savedOrderW
	              hasOrder = savedHasOrder
	              subAlias = savedAlias
	              ltCall(__fns, "pushSql", ltStrConcat(ltString("("), ltStrConcat(subSql, ltString(")"))))
	              ltCall(__fns, "pushW", ltStrConcat(ltString("("), ltStrConcat(subW, ltString(")"))))
	              if ltValueNotEquals(subAliasText, ltString("")) {
	                ltCall(__fns, "pushSql", subAliasText)
	                ltCall(__fns, "pushW", subAliasText)
	              }
	            } else {
	              ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")))
	            }
	          } else {
	            ltCall(__fns, "emitParam", ltGet(ltIndex(ltGet(ltGet(node, "functionCall"), "arguments"), ltNumber(1)), ltString("argument")))
	          }
	          hasLeft = ltBool(false)
	        } else if ltValueEquals(pn, ltString("raw")) {
	          ltCall(__fns, "emitRaw", node)
	        } else {
	          panic(ltToString(ltString("sql-builder parse: unsupported predicate")))
	        }
	      }
	    }
	    return ltNull()
	  }
	}
	ltCall(__fns, "renderNodes", ltGet(ltGet(ltGet(ltGet(root, "schema"), "chain"), "chain"), "values"), ltNumber(0))
	sql = ltBufStr(sql)
	wsql = ltBufStr(wsql)
	params = ltListValue(params)
	return ltMap("sql", ltTrim(sql), "sqlWithParam", ltTrim(wsql), "param", ltParams(params))
}

func NewSqlBuilder(variableName string, copies ...any) *SqlBuilder {
	structure := newSqlBuilder()
	__variableName := any(variableName)
	if variableName == "" {
		__variableName = ltGet(ltGet(ltGet(ltGet(ltGet(structure.GetSchema(), "schema"), "chain"), "chain"), "initFunction"), "variableName")
	}
	structure.initFromInitFunction(ltMap(
		"name", "sql-builder",
		"variableName", __variableName,
	), copies...)
	return structure
}

func NewSqlBuilderDefault() *SqlBuilder {
	return NewSqlBuilder("")
}