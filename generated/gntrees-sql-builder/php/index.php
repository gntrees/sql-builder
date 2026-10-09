<?php

require_once __DIR__ . "/lt.php";

// parse() returns ["sql" => string, "sqlWithParam" => string, "param" => array]

/**
 * Auto-generated PHP method-chain types.
 *
 * PHP is dynamic, so there is no static type block to emit (unlike
 * `base-types.ts`). The runtime contract is documented here instead.
 *
 * A schema is a plain nested PHP array:
 *
 *     ["schema" => [
 *         "exportName" => string,
 *         "importPaths" => [language => string, ...],
 *         "chain" => ["chain" => [
 *             "values" => [...],
 *             "initFunction" => ["name" => string, "variableName" => string],
 *         ]],
 *     ]]
 *
 * Each entry of `values` is one of:
 *
 *     ["functionCall" => ["name" => string, "arguments" => [Argument, ...],
 *                         "isTemplateLiteral" => bool]]
 *     ["propertyCall" => ["name" => string]]
 *     ["copy" => ["structureName" => string, "chain" => Chain]]
 *
 * An `Argument` is `["argument" => ArgumentValue, "default" => ArgumentValue | null]`.
 * An `ArgumentValue` is a tagged array, one of:
 *
 *     ["string" => ["value" => string]]
 *     ["number" => ["value" => int | float]]
 *     ["boolean" => ["value" => bool]]
 *     ["null" => ["value" => null]]
 *     ["array" => ["value" => [ArgumentValue, ...]]]
 *     ["object" => ["value" => [key => ArgumentValue, ...]]]
 *     ["chain" => Chain]
 *
 * Struct definitions used by the runtime mirror the TypeScript `StructType`
 * (`array`/`object`/`string`/`number`/`boolean`/`null`/`union`/`map`/`literal`/
 * `structureCall`), expressed as plain PHP arrays.
 */


// Auto-generated utils
function normalizeArgumentStructureCall($arg)
{
    if ($arg instanceof SqlBuilder) {
        return $arg->getSchema()["schema"]["chain"];
    }
    if (is_object($arg)) {
        throw new Exception("Unknown structure call argument type");
    }
    $got = $arg === null ? "null" : (is_array($arg) ? "array" : _typeof($arg));
    throw new Exception("Expected a structure instance for structure calls, but got " . $got);
}

function _copy($source)
{
    if ($source instanceof SqlBuilder) {
        return makeCopy('sql-builder', $source);
    }
    throw new Exception("_copy() expects a structure instance created by an init function");
}

/**
 * Auto-generated PHP method-chain runtime.
 *
 * This is the dynamic counterpart of `core/base/typescript/base-utils.ts`.
 * Schemas are plain nested PHP arrays; the generator inlines this module at the
 * top of the generated `index.php` (right after the `<?php` header and the
 * `lt.php` require), so this file must not carry a `<?php` tag of its own.
 *
 * `normalizeArgumentStructureCall` and `_copy` are *not* defined here: like the
 * TypeScript runtime they are emitted by the generator because they reference
 * the project's structure classes. (`copy` is a PHP built-in function, so the
 * generator uses `_copy` to avoid a redeclaration fatal error.)
 *
 * PHP note: arrays are value types, so `applyCopies` takes its schema argument
 * by reference (`&$schema`) to mutate the caller's builder, mirroring the
 * in-place mutation the TypeScript/Python runtimes perform.
 */

// Sentinel for "argument not supplied". Generated methods default every
// parameter to this constant so optional arguments work; the runtime treats it
// like the TypeScript runtime treats `undefined`.
if (!defined("_MISSING")) {
    define("_MISSING", "\x00__missing__\x00");
}

function _typeof($value)
{
    // Best-effort analogue of JavaScript's `typeof` for error messages.
    if ($value === null) {
        return "object";
    }
    if (is_bool($value)) {
        return "boolean";
    }
    if (is_int($value) || is_float($value)) {
        return "number";
    }
    if (is_string($value)) {
        return "string";
    }
    if (is_array($value)) {
        return "object";
    }
    if (is_object($value)) {
        return "object";
    }
    return gettype($value);
}

function validateSchema($schema)
{
    $message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction";
    if (!is_array($schema)) {
        throw new Exception($message);
    }
    $inner = isset($schema["schema"]) ? $schema["schema"] : null;
    if (!is_array($inner)) {
        throw new Exception($message);
    }
    $chain = isset($inner["chain"]) ? $inner["chain"] : null;
    if (!is_array($chain)) {
        throw new Exception($message);
    }
    $chainChain = isset($chain["chain"]) ? $chain["chain"] : null;
    if (!is_array($chainChain)) {
        throw new Exception($message);
    }
    if (!is_array(isset($chainChain["values"]) ? $chainChain["values"] : null) || empty($chainChain["initFunction"])) {
        throw new Exception($message);
    }
}

function _unwrapArgumentValue($val)
{
    if (!is_array($val)) {
        throw new Exception("Unknown argument value type");
    }
    if (array_key_exists("string", $val)) {
        return $val["string"]["value"];
    }
    if (array_key_exists("number", $val)) {
        return $val["number"]["value"];
    }
    if (array_key_exists("boolean", $val)) {
        return $val["boolean"]["value"];
    }
    if (array_key_exists("null", $val)) {
        return $val["null"]["value"];
    }
    if (array_key_exists("array", $val)) {
        $items = [];
        foreach ($val["array"]["value"] as $item) {
            $items[] = _unwrapArgumentValue($item);
        }
        return $items;
    }
    if (array_key_exists("object", $val)) {
        $object = [];
        foreach ($val["object"]["value"] as $key => $item) {
            $object[$key] = _unwrapArgumentValue($item);
        }
        return $object;
    }
    if (array_key_exists("chain", $val)) {
        throw new Exception("Cannot validate a chain default value at runtime");
    }
    throw new Exception("Unknown argument value type");
}

function validateDefault($defaultVal, $struct)
{
    normalizeArgument(_unwrapArgumentValue($defaultVal), $struct);
}

function normalizeArgument($arg, $struct)
{
    if (!is_array($struct)) {
        throw new Exception("Unsupported struct type in normalizeArgument");
    }

    if (array_key_exists("array", $struct)) {
        // PHP arrays serve as both lists and maps; a list-array is the `array` type.
        if (!is_array($arg) || !array_is_list($arg)) {
            throw new Exception("Expected an array argument, but got " . _typeof($arg));
        }
        if (count($arg) === 0) {
            return ["array" => ["value" => []]];
        }
        $itemType = $struct["array"]["type"];
        $normalizedItems = [];
        foreach ($arg as $item) {
            $normalizedItems[] = normalizeArgument($item, $itemType);
        }
        if (!isset($normalizedItems[0])) {
            throw new Exception("Unexpected undefined value in array");
        }
        return ["array" => ["value" => $normalizedItems]];
    }

    if (array_key_exists("object", $struct)) {
        if (!is_array($arg)) {
            throw new Exception("Expected an object argument, but got " . _typeof($arg));
        }
        $declared = $struct["object"];
        $missingKeys = [];
        foreach ($declared as $key => $unused) {
            if (!array_key_exists($key, $arg)) {
                $missingKeys[] = $key;
            }
        }
        if (count($missingKeys) > 0) {
            throw new Exception('Missing required key(s) "' . implode('", "', $missingKeys) . '" in object argument');
        }
        $normalizedObject = [];
        foreach ($arg as $key => $value) {
            if (!array_key_exists($key, $declared)) {
                throw new Exception('Unexpected key "' . $key . '" in object argument');
            }
            $normalizedObject[$key] = normalizeArgument($value, $declared[$key]);
        }
        return ["object" => ["value" => $normalizedObject]];
    }

    if (array_key_exists("string", $struct)) {
        if (!is_string($arg)) {
            throw new Exception("Expected a string argument, but got " . _typeof($arg));
        }
        return ["string" => ["value" => $arg]];
    }

    if (array_key_exists("number", $struct)) {
        if (is_bool($arg) || (!is_int($arg) && !is_float($arg))) {
            throw new Exception("Expected a number argument, but got " . _typeof($arg));
        }
        if (!is_finite($arg)) {
            throw new Exception("Expected a finite number argument, but got " . $arg);
        }
        return ["number" => ["value" => $arg]];
    }

    if (array_key_exists("boolean", $struct)) {
        if (!is_bool($arg)) {
            throw new Exception("Expected a boolean argument, but got " . _typeof($arg));
        }
        return ["boolean" => ["value" => $arg]];
    }

    if (array_key_exists("null", $struct)) {
        if ($arg !== null) {
            throw new Exception("Expected a null argument, but got " . _typeof($arg));
        }
        return ["null" => ["value" => $arg]];
    }

    if (array_key_exists("union", $struct)) {
        $reasons = [];
        $normalizedUnionTypes = [];
        foreach ($struct["union"]["types"] as $unionType) {
            try {
                $normalizedUnionTypes[] = normalizeArgument($arg, $unionType);
            } catch (Throwable $error) {
                $reasons[] = $error->getMessage();
            }
        }
        if (count($normalizedUnionTypes) === 0 || !$normalizedUnionTypes[0]) {
            throw new Exception("Argument does not match any type in the union: " . implode(" | ", $reasons));
        }
        if (count($normalizedUnionTypes) > 1) {
            if (is_array($arg) && count($arg) === 0) {
                return $normalizedUnionTypes[0];
            }
            throw new Exception("Argument matches multiple types in the union, which is ambiguous");
        }
        return $normalizedUnionTypes[0];
    }

    if (array_key_exists("map", $struct)) {
        if (!is_array($arg) || array_is_list($arg)) {
            throw new Exception("Expected an object argument for map type, but got " . _typeof($arg));
        }
        $normalizedMap = [];
        foreach ($arg as $key => $value) {
            $normalizedMap[$key] = normalizeArgument($value, $struct["map"]["type"]);
        }
        return ["object" => ["value" => $normalizedMap]];
    }

    if (array_key_exists("structureCall", $struct)) {
        return normalizeArgumentStructureCall($arg);
    }

    if (array_key_exists("literal", $struct)) {
        $expected = $struct["literal"]["value"];
        $literalType = isset($struct["literal"]["type"]) ? $struct["literal"]["type"] : null;
        if ($literalType === "string") {
            if (!is_string($arg)) {
                throw new Exception("Expected a string literal argument, but got " . _typeof($arg));
            }
            if ($arg !== $expected) {
                throw new Exception("Expected string literal " . json_encode($expected) . ", but got " . json_encode($arg));
            }
            return ["string" => ["value" => $arg]];
        }
        if ($literalType === "number") {
            if (is_bool($arg) || (!is_int($arg) && !is_float($arg))) {
                throw new Exception("Expected a number literal argument, but got " . _typeof($arg));
            }
            if (!is_finite($arg)) {
                throw new Exception("Expected a finite number argument, but got " . $arg);
            }
            if ($arg !== $expected) {
                throw new Exception("Expected number literal " . $expected . ", but got " . $arg);
            }
            return ["number" => ["value" => $arg]];
        }
        if (!is_bool($arg)) {
            throw new Exception("Expected a boolean literal argument, but got " . _typeof($arg));
        }
        if ($arg !== $expected) {
            throw new Exception(
                "Expected boolean literal " . ($expected ? "true" : "false") . ", but got " . ($arg ? "true" : "false")
            );
        }
        return ["boolean" => ["value" => $arg]];
    }

    throw new Exception("Unsupported struct type in normalizeArgument");
}

function createSchema($oldSchema, $functionName, $functionArgs, $isTemplateLiteral)
{
    validateSchema($oldSchema);
    $old = $oldSchema["schema"];
    $oldChain = $old["chain"]["chain"];
    $newInner = $old;
    $newInner["chain"] = [
        "chain" => [
            "values" => $oldChain["values"],
            "initFunction" => $oldChain["initFunction"],
        ],
    ];
    $newSchema = ["schema" => $newInner];

    if ($isTemplateLiteral && count($functionArgs) > 0 && !empty($functionArgs[0])) {
        $strings = isset($functionArgs[0]["arg"]) ? $functionArgs[0]["arg"] : null;
        if (!is_array($strings)) {
            throw new Exception("Expected a template strings array for " . $functionName);
        }
        foreach ($strings as $text) {
            if (!is_string($text)) {
                throw new Exception("Expected a template strings array for " . $functionName);
            }
        }
        $expressions = array_slice($functionArgs, 1);
        if (count($expressions) !== count($strings) - 1) {
            throw new Exception(
                "Template literal for " . $functionName . " expects " . (count($strings) - 1)
                . " expression(s), but got " . count($expressions)
            );
        }
        $args = [];
        $stringsList = array_values($strings);
        $stringCount = count($stringsList);
        $expressionCount = count($expressions);
        for ($index = 0; $index < $stringCount; $index++) {
            $text = $stringsList[$index];
            if ($text !== "") {
                $args[] = ["argument" => ["string" => ["value" => $text]], "default" => null];
            }
            if ($index < $expressionCount) {
                $expression = $expressions[$index];
                if (empty($expression)) {
                    throw new Exception("Missing expression for template literal at index " . $index);
                }
                $args[] = [
                    "argument" => normalizeArgument(
                        isset($expression["arg"]) ? $expression["arg"] : null,
                        isset($expression["struct"]) ? $expression["struct"] : null
                    ),
                    "default" => null,
                ];
            }
        }
    } else {
        $args = [];
        foreach ($functionArgs as $index => $functionArg) {
            $arg = array_key_exists("arg", $functionArg) ? $functionArg["arg"] : _MISSING;
            if ($arg === _MISSING) {
                if (!empty($functionArg["provided"])) {
                    throw new Exception('Parameter "' . $functionName . '" argument #' . ($index + 1) . ' cannot be undefined');
                }
                $default = array_key_exists("default", $functionArg) ? $functionArg["default"] : null;
                if ($default !== null) {
                    validateDefault($default, $functionArg["struct"]);
                    $args[] = ["argument" => $default, "default" => $default];
                    continue;
                }
                throw new Exception('Parameter "' . $functionName . '" argument #' . ($index + 1) . ' was not provided');
            }
            $argument = normalizeArgument($arg, $functionArg["struct"]);
            $default = array_key_exists("default", $functionArg) ? $functionArg["default"] : null;
            if ($default !== null) {
                validateDefault($default, $functionArg["struct"]);
            }
            $args[] = ["argument" => $argument, "default" => $default];
        }
    }

    $newSchema["schema"]["chain"]["chain"]["values"][] = [
        "functionCall" => [
            "name" => $functionName,
            "arguments" => $args,
            "isTemplateLiteral" => (bool) $isTemplateLiteral,
        ],
    ];
    return $newSchema;
}

function createPropertyCallSchema($oldSchema, $propertyName)
{
    $old = $oldSchema["schema"];
    $oldChain = $old["chain"]["chain"];
    $newInner = $old;
    $newInner["chain"] = [
        "chain" => [
            "values" => array_merge($oldChain["values"], [["propertyCall" => ["name" => $propertyName]]]),
            "initFunction" => $oldChain["initFunction"],
        ],
    ];
    return ["schema" => $newInner];
}

function makeCopy($structureName, $source)
{
    $schema = $source->getSchema();
    validateSchema($schema);
    return [
        "copy" => [
            "structureName" => $structureName,
            "chain" => $schema["schema"]["chain"],
        ],
    ];
}

function applyCopies(&$schema, $copies, $targetStructureName)
{
    if (!$copies) {
        return;
    }
    foreach ($copies as $cp) {
        if (!is_array($cp) || !array_key_exists("copy", $cp) || !is_array($cp["copy"])) {
            throw new Exception("Invalid builder argument in init function: wrap the structure with copy(...)");
        }
        $copy = $cp["copy"];
        if (!is_string(isset($copy["structureName"]) ? $copy["structureName"] : null) || !is_array(isset($copy["chain"]) ? $copy["chain"] : null)) {
            throw new Exception("Invalid builder argument in init function: wrap the structure with copy(...)");
        }
        if ($copy["structureName"] !== $targetStructureName) {
            throw new Exception(
                "Cannot copy builder of structure '" . $copy["structureName"] . "' into '" . $targetStructureName . "'"
            );
        }
        $schema["schema"]["chain"]["chain"]["values"][] = [
            "copy" => [
                "structureName" => $copy["structureName"],
                "chain" => $copy["chain"],
            ],
        ];
    }
}


class SqlBuilder
{
    public $schemaSqlBuilder;

    public function __construct()
    {
        $this->schemaSqlBuilder = [
            "schema" => [
                "exportName" => 'schema',
                "importPaths" => ['typescript' => '../../../gntrees-sql-builder/typescript/index'],
                "chain" => [
                    "chain" => [
                        "values" => [],
                        "initFunction" => [
                            "name" => 'sql-builder',
                            "variableName" => 's1',
                        ],
                    ],
                ],
            ],
        ];
    }

    public function getSchema($exportName = null, $importPaths = null)
    {
        if ($exportName !== null && !is_string($exportName)) {
            throw new Exception("getSchema exportName must be a string, but got " . _typeof($exportName));
        }
        if ($importPaths !== null && !is_array($importPaths)) {
            throw new Exception("getSchema importPaths must be an object, but got " . _typeof($importPaths));
        }
        if ($exportName !== null && $exportName !== "") {
            $this->schemaSqlBuilder["schema"]["exportName"] = $exportName;
        }
        if ($importPaths) {
            $this->schemaSqlBuilder["schema"]["importPaths"] = array_merge((array) ($this->schemaSqlBuilder["schema"]["importPaths"] ?? []), $importPaths);
        }
        return $this->schemaSqlBuilder;
    }

    public function initFromStructure($schema)
    {
        validateSchema($schema);
        $this->schemaSqlBuilder = $schema;
        return $this;
    }

    public function initFromInitFunction($initFunction, $copies = [])
    {
        if (!is_array($initFunction) || !is_string($initFunction["name"] ?? null) || !is_string($initFunction["variableName"] ?? null)) {
            throw new Exception("Invalid init function");
        }
        $this->schemaSqlBuilder["schema"]["chain"]["chain"]["initFunction"] = $initFunction;
        applyCopies($this->schemaSqlBuilder, $copies, 'sql-builder');
        return $this;
    }

    public function select($columns = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'select', [
            ["arg" => $columns, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]], ['map' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $columns !== _MISSING],
        ], false));
    }

    public function from($table = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'from', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
        ], false));
    }

    public function transaction($transaction = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'transaction', [
            ["arg" => $transaction, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $transaction !== _MISSING],
        ], false));
    }

    public function orderBy($columns = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'orderBy', [
            ["arg" => $columns, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $columns !== _MISSING],
        ], false));
    }

    public function limit($count = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'limit', [
            ["arg" => $count, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $count !== _MISSING],
        ], false));
    }

    public function offset($count = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'offset', [
            ["arg" => $count, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $count !== _MISSING],
        ], false));
    }

    public function with($statement = _MISSING, $as = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'with', [
            ["arg" => $statement, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $statement !== _MISSING],
            ["arg" => $as, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $as !== _MISSING],
        ], false));
    }

    public function groupBy($columns = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'groupBy', [
            ["arg" => $columns, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $columns !== _MISSING],
        ], false));
    }

    public function having($statement = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'having', [
            ["arg" => $statement, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $statement !== _MISSING],
        ], false));
    }

    public function where($statement = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'where', [
            ["arg" => $statement, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $statement !== _MISSING],
        ], false));
    }

    public function update($table = _MISSING, $set = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'update', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $set, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['map' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $set !== _MISSING],
        ], false));
    }

    public function set($statement = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'set', [
            ["arg" => $statement, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['map' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $statement !== _MISSING],
        ], false));
    }

    public function insert($table = _MISSING, $set = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'insert', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $set, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['map' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $set !== _MISSING],
        ], false));
    }

    public function values($values = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'values', [
            ["arg" => $values, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]], ['array' => ['type' => ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]]]], "provided" => $values !== _MISSING],
        ], false));
    }

    public function returning($columns = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'returning', [
            ["arg" => $columns, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]], ['map' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $columns !== _MISSING],
        ], false));
    }

    public function onConflictDoNothing($target = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'onConflictDoNothing', [
            ["arg" => $target, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $target !== _MISSING],
        ], false));
    }

    public function onConflictDoUpdate($target = _MISSING, $set = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'onConflictDoUpdate', [
            ["arg" => $target, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $target !== _MISSING],
            ["arg" => $set, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['map' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $set !== _MISSING],
        ], false));
    }

    public function delete($table = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'delete', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
        ], false));
    }

    public function join($table = _MISSING, $on = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'join', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $on, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $on !== _MISSING],
        ], false));
    }

    public function leftJoin($table = _MISSING, $on = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'leftJoin', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $on, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $on !== _MISSING],
        ], false));
    }

    public function rightJoin($table = _MISSING, $on = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'rightJoin', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $on, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $on !== _MISSING],
        ], false));
    }

    public function innerJoin($table = _MISSING, $on = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'innerJoin', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $on, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $on !== _MISSING],
        ], false));
    }

    public function fullJoin($table = _MISSING, $on = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'fullJoin', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $on, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $on !== _MISSING],
        ], false));
    }

    public function crossJoin($table = _MISSING, $on = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'crossJoin', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
            ["arg" => $on, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $on !== _MISSING],
        ], false));
    }

    public function eq($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'eq', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function gt($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'gt', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function gte($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'gte', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function lt($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'lt', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function lte($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'lte', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function exists($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'exists', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function isNull()
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'isNull', [
        ], false));
    }

    public function isNotNull()
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'isNotNull', [
        ], false));
    }

    public function in($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'in', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function between($first = _MISSING, $second = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'between', [
            ["arg" => $first, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $first !== _MISSING],
            ["arg" => $second, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $second !== _MISSING],
        ], false));
    }

    public function like($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'like', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function ilike($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'ilike', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function not($value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'not', [
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function and($values = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'and', [
            ["arg" => $values, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $values !== _MISSING],
        ], false));
    }

    public function or($values = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'or', [
            ["arg" => $values, "struct" => ['union' => ['types' => [['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], ['array' => ['type' => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]]]]], "provided" => $values !== _MISSING],
        ], false));
    }

    public function op($operation = _MISSING, $value = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'op', [
            ["arg" => $operation, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $operation !== _MISSING],
            ["arg" => $value, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $value !== _MISSING],
        ], false));
    }

    public function raw($strings, ...$args)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'raw', array_merge(
            [["arg" => $strings, "struct" => ["string" => ["type" => "string"]]]],
            array_map(function ($__arg) { return ["arg" => $__arg, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]]]; }, $args)
        ), true));
    }

    public function asc()
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'asc', [
        ], false));
    }

    public function desc()
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'desc', [
        ], false));
    }

    public function as($alias = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'as', [
            ["arg" => $alias, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $alias !== _MISSING],
        ], false));
    }

    public function col($column = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'col', [
            ["arg" => $column, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $column !== _MISSING],
        ], false));
    }

    public function table($table = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'table', [
            ["arg" => $table, "struct" => ['union' => ['types' => [['string' => ['type' => 'string']], ['number' => ['type' => 'number']], ['boolean' => ['type' => 'boolean']], ['structureCall' => ['name' => 'sql-builder']]]]], "provided" => $table !== _MISSING],
        ], false));
    }

    public function setDialect($db = _MISSING)
    {
        return (new SqlBuilder())->initFromStructure(createSchema($this->getSchema(), 'setDialect', [
            ["arg" => $db, "struct" => ['union' => ['types' => [['literal' => ['value' => 'postgres', 'type' => 'string']], ['literal' => ['value' => 'mysql', 'type' => 'string']], ['literal' => ['value' => 'sqlite', 'type' => 'string']], ['literal' => ['value' => 'single-store', 'type' => 'string']], ['literal' => ['value' => 'mssql', 'type' => 'string']], ['literal' => ['value' => 'cockroach', 'type' => 'string']]]]], "provided" => $db !== _MISSING],
        ], false));
    }

    public function parse()
    {
        $root = $this->getSchema();
        $dialect = '';
        $quote = '';
        $sql = [];
        $wsql = [];
        $params = [];
        $orderSql = '';
        $orderW = '';
        $hasOrder = false;
        $tmp = '';
        $tmp2 = '';
        $tmpRef = '';
        $subAlias = '';
        $withFirst = true;
        $normName = function($n) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName) {
          return strtolower(str_replace('-', '', $n));
        };
        $pushSql = function($text) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql) {
          $sql = array_merge($sql, [' ']);
          $sql = array_merge($sql, [$text]);
          return null;
        };
        $pushW = function($text) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW) {
          $wsql = array_merge($wsql, [' ']);
          $wsql = array_merge($wsql, [$text]);
          return null;
        };
        $asString = function($arg) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString) {
          return lt_get(lt_get($arg, 'string'), 'value');
        };
        $identStr = function($name) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr) {
          $escapedName = str_replace($quote, ($quote . $quote), $name);
          $qualifiedName = str_replace('.', ($quote . ('.' . $quote)), $escapedName);
          return ($quote . ($qualifiedName . $quote));
        };
        $literalOf = function($arg) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf) {
          $outLiteral = '';
          if (lt_truthy(lt_has($arg, 'string'))) {
            $outLiteral = ('\'' . (str_replace('\'', '\'\'', $asString($arg)) . '\''));
          }
          elseif (lt_truthy(lt_has($arg, 'number'))) {
            $outLiteral = lt_to_string(lt_get(lt_get($arg, 'number'), 'value'));
          }
          elseif (lt_truthy(lt_has($arg, 'boolean'))) {
            if (lt_truthy(lt_get(lt_get($arg, 'boolean'), 'value'))) {
              $outLiteral = 'TRUE';
            }
            else {
              $outLiteral = 'FALSE';
            }
          }
          else {
            $outLiteral = 'NULL';
          }
          return $outLiteral;
        };
        $opOf = function($n) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf) {
          $o = '';
          if ($n === 'eq') {
            $o = '=';
          }
          elseif ($n === 'gt') {
            $o = '>';
          }
          elseif ($n === 'gte') {
            $o = '>=';
          }
          elseif ($n === 'lt') {
            $o = '<';
          }
          elseif ($n === 'lte') {
            $o = '<=';
          }
          elseif ($n === 'like') {
            $o = 'LIKE';
          }
          elseif ($n === 'ilike') {
            if ($dialect === 'postgres') {
              $o = 'ILIKE';
            }
            else {
              $o = 'LIKE';
            }
          }
          return $o;
        };
        $itemsOf = function($arg) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf) {
          if (lt_truthy(lt_has($arg, 'array'))) {
            return lt_get(lt_get($arg, 'array'), 'value');
          }
          return array_merge([], [$arg]);
        };
        $isRef = function($chainValues) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef) {
          $tmpRef = '';
          if ((count($chainValues) === 1) && lt_truthy(lt_has(lt_get($chainValues, 0), 'functionCall'))) {
            $firstName = lt_get(lt_get(lt_get($chainValues, 0), 'functionCall'), 'name');
            if (($firstName === 'col') || ($firstName === 'table')) {
              $tmpRef = $asString(lt_get(lt_get(lt_get(lt_get(lt_get($chainValues, 0), 'functionCall'), 'arguments'), 0), 'argument'));
            }
          }
          return $tmpRef;
        };
        $emitParam = function($arg) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam) {
          $params = array_merge($params, [$arg]);
          if ($dialect === 'postgres') {
            $tmp = ('$' . lt_to_string(count($params)));
          }
          else {
            $tmp = '?';
          }
          $pushSql($tmp);
          $tmp2 = $literalOf($arg);
          $pushW($tmp2);
          return null;
        };
        $emitIdent = function($name) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent) {
          $tmp = $identStr($name);
          $pushSql($tmp);
          $pushW($tmp);
          return null;
        };
        $emitRaw = function($node) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent, &$emitRaw) {
          if (count($sql) !== 0) {
            $sql = array_merge($sql, [' ']);
            $wsql = array_merge($wsql, [' ']);
          }
          foreach (lt_get(lt_get($node, 'functionCall'), 'arguments') as $rawArg) {
            $rawVal = lt_get($rawArg, 'argument');
            if (lt_truthy(lt_has($rawVal, 'string'))) {
              $sql = array_merge($sql, [$asString($rawVal)]);
              $wsql = array_merge($wsql, [$asString($rawVal)]);
            }
            elseif (lt_truthy(lt_has($rawVal, 'chain'))) {
              $tmpRef = $isRef(lt_get(lt_get($rawVal, 'chain'), 'values'));
              if ($tmpRef !== '') {
                $sql = array_merge($sql, [$identStr($tmpRef)]);
                $wsql = array_merge($wsql, [$identStr($tmpRef)]);
              }
              else {
                $params = array_merge($params, [$rawVal]);
                if ($dialect === 'postgres') {
                  $tmp = ('$' . lt_to_string(count($params)));
                }
                else {
                  $tmp = '?';
                }
                $sql = array_merge($sql, [$tmp]);
                $tmp2 = $literalOf($rawVal);
                $wsql = array_merge($wsql, [$tmp2]);
              }
            }
            else {
              $params = array_merge($params, [$rawVal]);
              if ($dialect === 'postgres') {
                $tmp = ('$' . lt_to_string(count($params)));
              }
              else {
                $tmp = '?';
              }
              $sql = array_merge($sql, [$tmp]);
              $tmp2 = $literalOf($rawVal);
              $wsql = array_merge($wsql, [$tmp2]);
            }
          }
          return null;
        };
        $conflictTarget = function($arg) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent, &$emitRaw, &$conflictTarget) {
          $ct = '()';
          if (lt_truthy(lt_has($arg, 'chain'))) {
            $tmpRef = $isRef(lt_get(lt_get($arg, 'chain'), 'values'));
            if ($tmpRef !== '') {
              $ct = ('(' . ($identStr($tmpRef) . ')'));
            }
          }
          elseif (lt_truthy(lt_has($arg, 'string'))) {
            $ct = ('(' . ($identStr($asString($arg)) . ')'));
          }
          return $ct;
        };
        $firstKind = function($chainValues) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent, &$emitRaw, &$conflictTarget, &$firstKind) {
          $kind = '';
          if ((count($chainValues) !== 0) && lt_truthy(lt_has(lt_get($chainValues, 0), 'functionCall'))) {
            $kind = $normName(lt_get(lt_get(lt_get($chainValues, 0), 'functionCall'), 'name'));
          }
          return $kind;
        };
        $emitOrderItem = function($item) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent, &$emitRaw, &$conflictTarget, &$firstKind, &$emitOrderItem) {
          $dir = '';
          $ordName = '';
          if (lt_truthy(lt_has($item, 'chain'))) {
            foreach (lt_get(lt_get($item, 'chain'), 'values') as $on) {
              $onn = $normName(lt_get(lt_get($on, 'functionCall'), 'name'));
              if ($onn === 'asc') {
                $dir = ' ASC';
              }
              elseif ($onn === 'desc') {
                $dir = ' DESC';
              }
              elseif (($onn === 'col') || ($onn === 'table')) {
                $ordName = $asString(lt_get(lt_get(lt_get(lt_get($on, 'functionCall'), 'arguments'), 0), 'argument'));
              }
            }
          }
          if ($ordName !== '') {
            $tmp = $identStr($ordName);
            $orderSql = ($orderSql . ($tmp . $dir));
            $orderW = ($orderW . ($tmp . $dir));
          }
          return null;
        };
        $emitOrderList = function($arg) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent, &$emitRaw, &$conflictTarget, &$firstKind, &$emitOrderItem, &$emitOrderList) {
          $firstOrder = true;
          foreach ($itemsOf($arg) as $item) {
            if ($firstOrder === false) {
              $orderSql = ($orderSql . ', ');
              $orderW = ($orderW . ', ');
            }
            $firstOrder = false;
            $emitOrderItem($item);
          }
          return null;
        };
        $flushOrder = function() use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent, &$emitRaw, &$conflictTarget, &$firstKind, &$emitOrderItem, &$emitOrderList, &$flushOrder) {
          if (lt_truthy($hasOrder)) {
            $pushSql('ORDER');
            $pushSql('BY');
            $pushW('ORDER');
            $pushW('BY');
            $tmp = $orderSql;
            if ($tmp !== '') {
              $pushSql($tmp);
            }
            $tmp2 = $orderW;
            if ($tmp2 !== '') {
              $pushW($tmp2);
            }
            $hasOrder = false;
          }
          return null;
        };
        foreach (lt_get(lt_get(lt_get(lt_get($root, 'schema'), 'chain'), 'chain'), 'values') as $dialectNode) {
          if ($normName(lt_get(lt_get($dialectNode, 'functionCall'), 'name')) === 'setdialect') {
            $dialect = lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($dialectNode, 'functionCall'), 'arguments'), 0), 'argument'), 'string'), 'value');
          }
        }
        if ($dialect === '') {
          throw new Exception(lt_to_string('sql-builder parse: setDialect(...) must be called before parse()'));
        }
        elseif (($dialect !== 'postgres') && ($dialect !== 'mysql')) {
          throw new Exception(lt_to_string(('sql-builder parse: unsupported dialect ' . $dialect)));
        }
        if ($dialect === 'mysql') {
          $quote = '`';
        }
        else {
          $quote = '"';
        }
        $renderNodes = function($nodes, $mode) use (&$dialect, &$quote, &$sql, &$wsql, &$params, &$orderSql, &$orderW, &$hasOrder, &$tmp, &$tmp2, &$tmpRef, &$subAlias, &$withFirst, &$normName, &$pushSql, &$pushW, &$asString, &$identStr, &$literalOf, &$opOf, &$itemsOf, &$isRef, &$emitParam, &$emitIdent, &$emitRaw, &$conflictTarget, &$firstKind, &$emitOrderItem, &$emitOrderList, &$flushOrder, &$renderNodes) {
          $savedSql = '';
          $savedW = '';
          $savedOrderSql = '';
          $savedOrderW = '';
          $savedHasOrder = false;
          $savedAlias = '';
          $subSql = '';
          $subW = '';
          $subAliasText = '';
          $first = true;
          $left = '';
          $hasLeft = false;
          $base = '';
          if ($mode === 0) {
            foreach ($nodes as $node) {
              if (lt_truthy(lt_has($node, 'functionCall'))) {
                $name = lt_get(lt_get($node, 'functionCall'), 'name');
                $nameNorm = $normName($name);
                if ($nameNorm === 'setdialect') {
                  continue;
                }
                elseif (($nameNorm === 'asc') || ($nameNorm === 'desc')) {
                  if (lt_truthy($hasOrder)) {
                    $tmp = strtoupper($nameNorm);
                    $orderSql = ($orderSql . (' ' . $tmp));
                    $orderW = ($orderW . (' ' . $tmp));
                  }
                }
                else {
                  if ($nameNorm === 'with') {
                    $savedSql = $sql;
                    $savedW = $wsql;
                    $savedOrderSql = $orderSql;
                    $savedOrderW = $orderW;
                    $savedHasOrder = $hasOrder;
                    $sql = [];
                    $wsql = [];
                    $orderSql = '';
                    $orderW = '';
                    $hasOrder = false;
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                    $subSql = trim(lt_buf_str($sql));
                    $subW = trim(lt_buf_str($wsql));
                    $sql = $savedSql;
                    $wsql = $savedW;
                    $orderSql = $savedOrderSql;
                    $orderW = $savedOrderW;
                    $hasOrder = $savedHasOrder;
                    if ($withFirst === false) {
                      $sql = array_merge($sql, [',']);
                      $wsql = array_merge($wsql, [',']);
                    }
                    else {
                      $withFirst = false;
                      $pushSql('WITH');
                      $pushW('WITH');
                    }
                    $pushSql($identStr($asString(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'))));
                    $pushW($identStr($asString(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'))));
                    $pushSql('AS');
                    $pushW('AS');
                    $pushSql(('(' . ($subSql . ')')));
                    $pushW(('(' . ($subW . ')')));
                  }
                  elseif ($nameNorm === 'transaction') {
                    $pushSql('BEGIN');
                    $pushW('BEGIN');
                    $sql = array_merge($sql, [';']);
                    $wsql = array_merge($wsql, [';']);
                    $txnFirst = true;
                    foreach ($itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')) as $txnItem) {
                      if ($txnFirst === false) {
                        $sql = array_merge($sql, [';']);
                        $wsql = array_merge($wsql, [';']);
                      }
                      $txnFirst = false;
                      if (lt_truthy(lt_has($txnItem, 'chain'))) {
                        $renderNodes(lt_get(lt_get($txnItem, 'chain'), 'values'), 0);
                      }
                      elseif (lt_truthy(lt_has($txnItem, 'string'))) {
                        $pushSql($asString($txnItem));
                        $pushW($asString($txnItem));
                      }
                      else {
                        if (lt_truthy(lt_has($txnItem, 'chain'))) {
                          $tmpRef = $isRef(lt_get(lt_get($txnItem, 'chain'), 'values'));
                          if ($tmpRef !== '') {
                            $emitIdent($tmpRef);
                          }
                          elseif ((($firstKind(lt_get(lt_get($txnItem, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($txnItem, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($txnItem, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($txnItem, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($txnItem, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($txnItem, 'chain'), 'values')) === 'delete'))))) {
                            $savedSql = $sql;
                            $savedW = $wsql;
                            $savedOrderSql = $orderSql;
                            $savedOrderW = $orderW;
                            $savedHasOrder = $hasOrder;
                            $savedAlias = $subAlias;
                            $sql = [];
                            $wsql = [];
                            $orderSql = '';
                            $orderW = '';
                            $hasOrder = false;
                            $subAlias = '';
                            $renderNodes(lt_get(lt_get($txnItem, 'chain'), 'values'), 0);
                            $subSql = trim(lt_buf_str($sql));
                            $subW = trim(lt_buf_str($wsql));
                            $subAliasText = $subAlias;
                            $sql = $savedSql;
                            $wsql = $savedW;
                            $orderSql = $savedOrderSql;
                            $orderW = $savedOrderW;
                            $hasOrder = $savedHasOrder;
                            $subAlias = $savedAlias;
                            $pushSql(('(' . ($subSql . ')')));
                            $pushW(('(' . ($subW . ')')));
                            if ($subAliasText !== '') {
                              $pushSql($subAliasText);
                              $pushW($subAliasText);
                            }
                          }
                          else {
                            $emitParam($txnItem);
                          }
                        }
                        else {
                          $emitParam($txnItem);
                        }
                      }
                    }
                    if ($txnFirst === false) {
                      $sql = array_merge($sql, [';']);
                      $wsql = array_merge($wsql, [';']);
                    }
                    $pushSql('COMMIT');
                    $pushW('COMMIT');
                  }
                  elseif ($nameNorm === 'select') {
                    $flushOrder();
                    $pushSql('SELECT');
                    $pushW('SELECT');
                    $firstItem = true;
                    foreach ($itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')) as $item) {
                      if ($firstItem === false) {
                        $sql = array_merge($sql, [',']);
                        $wsql = array_merge($wsql, [',']);
                      }
                      $firstItem = false;
                      if (lt_truthy(lt_has($item, 'chain'))) {
                        $tmpRef = $isRef(lt_get(lt_get($item, 'chain'), 'values'));
                        if ($tmpRef !== '') {
                          $emitIdent($tmpRef);
                        }
                        elseif ((($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'delete'))))) {
                          $savedSql = $sql;
                          $savedW = $wsql;
                          $savedOrderSql = $orderSql;
                          $savedOrderW = $orderW;
                          $savedHasOrder = $hasOrder;
                          $savedAlias = $subAlias;
                          $sql = [];
                          $wsql = [];
                          $orderSql = '';
                          $orderW = '';
                          $hasOrder = false;
                          $subAlias = '';
                          $renderNodes(lt_get(lt_get($item, 'chain'), 'values'), 0);
                          $subSql = trim(lt_buf_str($sql));
                          $subW = trim(lt_buf_str($wsql));
                          $subAliasText = $subAlias;
                          $sql = $savedSql;
                          $wsql = $savedW;
                          $orderSql = $savedOrderSql;
                          $orderW = $savedOrderW;
                          $hasOrder = $savedHasOrder;
                          $subAlias = $savedAlias;
                          $pushSql(('(' . ($subSql . ')')));
                          $pushW(('(' . ($subW . ')')));
                          if ($subAliasText !== '') {
                            $pushSql($subAliasText);
                            $pushW($subAliasText);
                          }
                        }
                        else {
                          $renderNodes(lt_get(lt_get($item, 'chain'), 'values'), 1);
                        }
                      }
                      else {
                        $emitParam($item);
                      }
                    }
                  }
                  elseif ($nameNorm === 'from') {
                    $flushOrder();
                    $pushSql('FROM');
                    $pushW('FROM');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                  }
                  elseif ($nameNorm === 'join') {
                    $flushOrder();
                    $pushSql('JOIN');
                    $pushW('JOIN');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                    $pushSql('ON');
                    $pushW('ON');
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 1);
                  }
                  elseif ($nameNorm === 'leftjoin') {
                    $flushOrder();
                    $pushSql('LEFT JOIN');
                    $pushW('LEFT JOIN');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                    $pushSql('ON');
                    $pushW('ON');
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 1);
                  }
                  elseif ($nameNorm === 'rightjoin') {
                    $flushOrder();
                    $pushSql('RIGHT JOIN');
                    $pushW('RIGHT JOIN');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                    $pushSql('ON');
                    $pushW('ON');
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 1);
                  }
                  elseif ($nameNorm === 'innerjoin') {
                    $flushOrder();
                    $pushSql('INNER JOIN');
                    $pushW('INNER JOIN');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                    $pushSql('ON');
                    $pushW('ON');
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 1);
                  }
                  elseif ($nameNorm === 'fulljoin') {
                    if ($dialect === 'mysql') {
                      throw new Exception(lt_to_string('sql-builder parse: FULL JOIN is not supported by mysql'));
                    }
                    else {
                      $flushOrder();
                      $pushSql('FULL JOIN');
                      $pushW('FULL JOIN');
                      if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                        $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                        if ($tmpRef !== '') {
                          $emitIdent($tmpRef);
                        }
                        elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                          $savedSql = $sql;
                          $savedW = $wsql;
                          $savedOrderSql = $orderSql;
                          $savedOrderW = $orderW;
                          $savedHasOrder = $hasOrder;
                          $savedAlias = $subAlias;
                          $sql = [];
                          $wsql = [];
                          $orderSql = '';
                          $orderW = '';
                          $hasOrder = false;
                          $subAlias = '';
                          $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                          $subSql = trim(lt_buf_str($sql));
                          $subW = trim(lt_buf_str($wsql));
                          $subAliasText = $subAlias;
                          $sql = $savedSql;
                          $wsql = $savedW;
                          $orderSql = $savedOrderSql;
                          $orderW = $savedOrderW;
                          $hasOrder = $savedHasOrder;
                          $subAlias = $savedAlias;
                          $pushSql(('(' . ($subSql . ')')));
                          $pushW(('(' . ($subW . ')')));
                          if ($subAliasText !== '') {
                            $pushSql($subAliasText);
                            $pushW($subAliasText);
                          }
                        }
                        else {
                          $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                      }
                      $pushSql('ON');
                      $pushW('ON');
                      $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 1);
                    }
                  }
                  elseif ($nameNorm === 'crossjoin') {
                    $flushOrder();
                    $pushSql('CROSS JOIN');
                    $pushW('CROSS JOIN');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                    $pushSql('ON');
                    $pushW('ON');
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 1);
                  }
                  elseif ($nameNorm === 'where') {
                    $flushOrder();
                    $pushSql('WHERE');
                    $pushW('WHERE');
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                  }
                  elseif ($nameNorm === 'groupby') {
                    $flushOrder();
                    $pushSql('GROUP BY');
                    $pushW('GROUP BY');
                    $firstItem = true;
                    foreach ($itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')) as $item) {
                      if ($firstItem === false) {
                        $sql = array_merge($sql, [',']);
                        $wsql = array_merge($wsql, [',']);
                      }
                      $firstItem = false;
                      if (lt_truthy(lt_has($item, 'chain'))) {
                        $tmpRef = $isRef(lt_get(lt_get($item, 'chain'), 'values'));
                        if ($tmpRef !== '') {
                          $emitIdent($tmpRef);
                        }
                        elseif ((($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'delete'))))) {
                          $savedSql = $sql;
                          $savedW = $wsql;
                          $savedOrderSql = $orderSql;
                          $savedOrderW = $orderW;
                          $savedHasOrder = $hasOrder;
                          $savedAlias = $subAlias;
                          $sql = [];
                          $wsql = [];
                          $orderSql = '';
                          $orderW = '';
                          $hasOrder = false;
                          $subAlias = '';
                          $renderNodes(lt_get(lt_get($item, 'chain'), 'values'), 0);
                          $subSql = trim(lt_buf_str($sql));
                          $subW = trim(lt_buf_str($wsql));
                          $subAliasText = $subAlias;
                          $sql = $savedSql;
                          $wsql = $savedW;
                          $orderSql = $savedOrderSql;
                          $orderW = $savedOrderW;
                          $hasOrder = $savedHasOrder;
                          $subAlias = $savedAlias;
                          $pushSql(('(' . ($subSql . ')')));
                          $pushW(('(' . ($subW . ')')));
                          if ($subAliasText !== '') {
                            $pushSql($subAliasText);
                            $pushW($subAliasText);
                          }
                        }
                        else {
                          $renderNodes(lt_get(lt_get($item, 'chain'), 'values'), 1);
                        }
                      }
                      else {
                        $emitParam($item);
                      }
                    }
                  }
                  elseif ($nameNorm === 'having') {
                    $flushOrder();
                    $pushSql('HAVING');
                    $pushW('HAVING');
                    $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                  }
                  elseif ($nameNorm === 'returning') {
                    if ($dialect === 'mysql') {
                      throw new Exception(lt_to_string('sql-builder parse: RETURNING is not supported by mysql'));
                    }
                    else {
                      $flushOrder();
                      $pushSql('RETURNING');
                      $pushW('RETURNING');
                      $firstItem = true;
                      foreach ($itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')) as $item) {
                        if ($firstItem === false) {
                          $sql = array_merge($sql, [',']);
                          $wsql = array_merge($wsql, [',']);
                        }
                        $firstItem = false;
                        if (lt_truthy(lt_has($item, 'chain'))) {
                          $tmpRef = $isRef(lt_get(lt_get($item, 'chain'), 'values'));
                          if ($tmpRef !== '') {
                            $emitIdent($tmpRef);
                          }
                          elseif ((($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($item, 'chain'), 'values')) === 'delete'))))) {
                            $savedSql = $sql;
                            $savedW = $wsql;
                            $savedOrderSql = $orderSql;
                            $savedOrderW = $orderW;
                            $savedHasOrder = $hasOrder;
                            $savedAlias = $subAlias;
                            $sql = [];
                            $wsql = [];
                            $orderSql = '';
                            $orderW = '';
                            $hasOrder = false;
                            $subAlias = '';
                            $renderNodes(lt_get(lt_get($item, 'chain'), 'values'), 0);
                            $subSql = trim(lt_buf_str($sql));
                            $subW = trim(lt_buf_str($wsql));
                            $subAliasText = $subAlias;
                            $sql = $savedSql;
                            $wsql = $savedW;
                            $orderSql = $savedOrderSql;
                            $orderW = $savedOrderW;
                            $hasOrder = $savedHasOrder;
                            $subAlias = $savedAlias;
                            $pushSql(('(' . ($subSql . ')')));
                            $pushW(('(' . ($subW . ')')));
                            if ($subAliasText !== '') {
                              $pushSql($subAliasText);
                              $pushW($subAliasText);
                            }
                          }
                          else {
                            $renderNodes(lt_get(lt_get($item, 'chain'), 'values'), 1);
                          }
                        }
                        else {
                          $emitParam($item);
                        }
                      }
                    }
                  }
                  elseif ($nameNorm === 'orderby') {
                    $hasOrder = true;
                    $orderSql = '';
                    $orderW = '';
                    $emitOrderList(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                  }
                  elseif ($nameNorm === 'limit') {
                    $flushOrder();
                    $pushSql('LIMIT');
                    $pushW('LIMIT');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                  }
                  elseif ($nameNorm === 'offset') {
                    $flushOrder();
                    $pushSql('OFFSET');
                    $pushW('OFFSET');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                  }
                  elseif ($nameNorm === 'raw') {
                    $emitRaw($node);
                  }
                  elseif ($nameNorm === 'as') {
                    $subAlias = ('AS ' . $identStr($asString(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'))));
                  }
                  elseif ($nameNorm === 'update') {
                    $pushSql('UPDATE');
                    $pushW('UPDATE');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                    $pushSql('SET');
                    $pushW('SET');
                    $assnFirst = true;
                    foreach (array_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value')) as $ak) {
                      if ($assnFirst === false) {
                        $sql = array_merge($sql, [',']);
                        $wsql = array_merge($wsql, [',']);
                      }
                      $assnFirst = false;
                      $pushSql($identStr($ak));
                      $pushW($identStr($ak));
                      $pushSql('=');
                      $pushW('=');
                      if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'))) {
                        $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'));
                        if ($tmpRef !== '') {
                          $emitIdent($tmpRef);
                        }
                        elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'delete'))))) {
                          $savedSql = $sql;
                          $savedW = $wsql;
                          $savedOrderSql = $orderSql;
                          $savedOrderW = $orderW;
                          $savedHasOrder = $hasOrder;
                          $savedAlias = $subAlias;
                          $sql = [];
                          $wsql = [];
                          $orderSql = '';
                          $orderW = '';
                          $hasOrder = false;
                          $subAlias = '';
                          $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'), 0);
                          $subSql = trim(lt_buf_str($sql));
                          $subW = trim(lt_buf_str($wsql));
                          $subAliasText = $subAlias;
                          $sql = $savedSql;
                          $wsql = $savedW;
                          $orderSql = $savedOrderSql;
                          $orderW = $savedOrderW;
                          $hasOrder = $savedHasOrder;
                          $subAlias = $savedAlias;
                          $pushSql(('(' . ($subSql . ')')));
                          $pushW(('(' . ($subW . ')')));
                          if ($subAliasText !== '') {
                            $pushSql($subAliasText);
                            $pushW($subAliasText);
                          }
                        }
                        else {
                          $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak));
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak));
                      }
                    }
                  }
                  elseif ($nameNorm === 'insert') {
                    $pushSql('INSERT');
                    $pushW('INSERT');
                    $pushSql('INTO');
                    $pushW('INTO');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                    $pushSql('(');
                    $pushW('(');
                    $colFirst = true;
                    foreach (array_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value')) as $ck) {
                      if ($colFirst === false) {
                        $sql = array_merge($sql, [',']);
                        $wsql = array_merge($wsql, [',']);
                      }
                      $colFirst = false;
                      $pushSql($identStr($ck));
                      $pushW($identStr($ck));
                    }
                    $pushSql(')');
                    $pushW(')');
                    $pushSql('VALUES');
                    $pushW('VALUES');
                    $pushSql('(');
                    $pushW('(');
                    $valFirst = true;
                    foreach (array_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value')) as $vk) {
                      if ($valFirst === false) {
                        $sql = array_merge($sql, [',']);
                        $wsql = array_merge($wsql, [',']);
                      }
                      $valFirst = false;
                      if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'))) {
                        $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values'));
                        if ($tmpRef !== '') {
                          $emitIdent($tmpRef);
                        }
                        elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values')) === 'delete'))))) {
                          $savedSql = $sql;
                          $savedW = $wsql;
                          $savedOrderSql = $orderSql;
                          $savedOrderW = $orderW;
                          $savedHasOrder = $hasOrder;
                          $savedAlias = $subAlias;
                          $sql = [];
                          $wsql = [];
                          $orderSql = '';
                          $orderW = '';
                          $hasOrder = false;
                          $subAlias = '';
                          $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk), 'chain'), 'values'), 0);
                          $subSql = trim(lt_buf_str($sql));
                          $subW = trim(lt_buf_str($wsql));
                          $subAliasText = $subAlias;
                          $sql = $savedSql;
                          $wsql = $savedW;
                          $orderSql = $savedOrderSql;
                          $orderW = $savedOrderW;
                          $hasOrder = $savedHasOrder;
                          $subAlias = $savedAlias;
                          $pushSql(('(' . ($subSql . ')')));
                          $pushW(('(' . ($subW . ')')));
                          if ($subAliasText !== '') {
                            $pushSql($subAliasText);
                            $pushW($subAliasText);
                          }
                        }
                        else {
                          $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk));
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $vk));
                      }
                    }
                    $pushSql(')');
                    $pushW(')');
                  }
                  elseif ($nameNorm === 'delete') {
                    $pushSql('DELETE');
                    $pushW('DELETE');
                    $pushSql('FROM');
                    $pushW('FROM');
                    if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                      $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                      if ($tmpRef !== '') {
                        $emitIdent($tmpRef);
                      }
                      elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                        $savedSql = $sql;
                        $savedW = $wsql;
                        $savedOrderSql = $orderSql;
                        $savedOrderW = $orderW;
                        $savedHasOrder = $hasOrder;
                        $savedAlias = $subAlias;
                        $sql = [];
                        $wsql = [];
                        $orderSql = '';
                        $orderW = '';
                        $hasOrder = false;
                        $subAlias = '';
                        $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                        $subSql = trim(lt_buf_str($sql));
                        $subW = trim(lt_buf_str($wsql));
                        $subAliasText = $subAlias;
                        $sql = $savedSql;
                        $wsql = $savedW;
                        $orderSql = $savedOrderSql;
                        $orderW = $savedOrderW;
                        $hasOrder = $savedHasOrder;
                        $subAlias = $savedAlias;
                        $pushSql(('(' . ($subSql . ')')));
                        $pushW(('(' . ($subW . ')')));
                        if ($subAliasText !== '') {
                          $pushSql($subAliasText);
                          $pushW($subAliasText);
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                  }
                  elseif ($nameNorm === 'set') {
                    $pushSql('SET');
                    $pushW('SET');
                    $assnFirst = true;
                    foreach (array_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value')) as $ak) {
                      if ($assnFirst === false) {
                        $sql = array_merge($sql, [',']);
                        $wsql = array_merge($wsql, [',']);
                      }
                      $assnFirst = false;
                      $pushSql($identStr($ak));
                      $pushW($identStr($ak));
                      $pushSql('=');
                      $pushW('=');
                      if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'))) {
                        $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'));
                        if ($tmpRef !== '') {
                          $emitIdent($tmpRef);
                        }
                        elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'delete'))))) {
                          $savedSql = $sql;
                          $savedW = $wsql;
                          $savedOrderSql = $orderSql;
                          $savedOrderW = $orderW;
                          $savedHasOrder = $hasOrder;
                          $savedAlias = $subAlias;
                          $sql = [];
                          $wsql = [];
                          $orderSql = '';
                          $orderW = '';
                          $hasOrder = false;
                          $subAlias = '';
                          $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'), 0);
                          $subSql = trim(lt_buf_str($sql));
                          $subW = trim(lt_buf_str($wsql));
                          $subAliasText = $subAlias;
                          $sql = $savedSql;
                          $wsql = $savedW;
                          $orderSql = $savedOrderSql;
                          $orderW = $savedOrderW;
                          $hasOrder = $savedHasOrder;
                          $subAlias = $savedAlias;
                          $pushSql(('(' . ($subSql . ')')));
                          $pushW(('(' . ($subW . ')')));
                          if ($subAliasText !== '') {
                            $pushSql($subAliasText);
                            $pushW($subAliasText);
                          }
                        }
                        else {
                          $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak));
                        }
                      }
                      else {
                        $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'object'), 'value'), $ak));
                      }
                    }
                  }
                  elseif ($nameNorm === 'values') {
                    $pushSql('VALUES');
                    $pushW('VALUES');
                    $valueRows = $itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    $valueFirst = true;
                    if ((count($valueRows) !== 0) && lt_truthy(lt_has(lt_get($valueRows, 0), 'array'))) {
                      foreach ($valueRows as $tuple) {
                        if ($valueFirst === false) {
                          $sql = array_merge($sql, [',']);
                          $wsql = array_merge($wsql, [',']);
                        }
                        $valueFirst = false;
                        if ($dialect === 'mysql') {
                          $pushSql('ROW');
                          $pushW('ROW');
                        }
                        $pushSql('(');
                        $pushW('(');
                        $itemFirst = true;
                        foreach ($itemsOf($tuple) as $ti) {
                          if ($itemFirst === false) {
                            $sql = array_merge($sql, [',']);
                            $wsql = array_merge($wsql, [',']);
                          }
                          $itemFirst = false;
                          if (lt_truthy(lt_has($ti, 'chain'))) {
                            $tmpRef = $isRef(lt_get(lt_get($ti, 'chain'), 'values'));
                            if ($tmpRef !== '') {
                              $emitIdent($tmpRef);
                            }
                            elseif ((($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'delete'))))) {
                              $savedSql = $sql;
                              $savedW = $wsql;
                              $savedOrderSql = $orderSql;
                              $savedOrderW = $orderW;
                              $savedHasOrder = $hasOrder;
                              $savedAlias = $subAlias;
                              $sql = [];
                              $wsql = [];
                              $orderSql = '';
                              $orderW = '';
                              $hasOrder = false;
                              $subAlias = '';
                              $renderNodes(lt_get(lt_get($ti, 'chain'), 'values'), 0);
                              $subSql = trim(lt_buf_str($sql));
                              $subW = trim(lt_buf_str($wsql));
                              $subAliasText = $subAlias;
                              $sql = $savedSql;
                              $wsql = $savedW;
                              $orderSql = $savedOrderSql;
                              $orderW = $savedOrderW;
                              $hasOrder = $savedHasOrder;
                              $subAlias = $savedAlias;
                              $pushSql(('(' . ($subSql . ')')));
                              $pushW(('(' . ($subW . ')')));
                              if ($subAliasText !== '') {
                                $pushSql($subAliasText);
                                $pushW($subAliasText);
                              }
                            }
                            else {
                              $emitParam($ti);
                            }
                          }
                          else {
                            $emitParam($ti);
                          }
                        }
                        $pushSql(')');
                        $pushW(')');
                      }
                    }
                    else {
                      if ($dialect === 'mysql') {
                        $pushSql('ROW');
                        $pushW('ROW');
                      }
                      $pushSql('(');
                      $pushW('(');
                      $itemFirst = true;
                      foreach ($valueRows as $ti) {
                        if ($itemFirst === false) {
                          $sql = array_merge($sql, [',']);
                          $wsql = array_merge($wsql, [',']);
                        }
                        $itemFirst = false;
                        if (lt_truthy(lt_has($ti, 'chain'))) {
                          $tmpRef = $isRef(lt_get(lt_get($ti, 'chain'), 'values'));
                          if ($tmpRef !== '') {
                            $emitIdent($tmpRef);
                          }
                          elseif ((($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($ti, 'chain'), 'values')) === 'delete'))))) {
                            $savedSql = $sql;
                            $savedW = $wsql;
                            $savedOrderSql = $orderSql;
                            $savedOrderW = $orderW;
                            $savedHasOrder = $hasOrder;
                            $savedAlias = $subAlias;
                            $sql = [];
                            $wsql = [];
                            $orderSql = '';
                            $orderW = '';
                            $hasOrder = false;
                            $subAlias = '';
                            $renderNodes(lt_get(lt_get($ti, 'chain'), 'values'), 0);
                            $subSql = trim(lt_buf_str($sql));
                            $subW = trim(lt_buf_str($wsql));
                            $subAliasText = $subAlias;
                            $sql = $savedSql;
                            $wsql = $savedW;
                            $orderSql = $savedOrderSql;
                            $orderW = $savedOrderW;
                            $hasOrder = $savedHasOrder;
                            $subAlias = $savedAlias;
                            $pushSql(('(' . ($subSql . ')')));
                            $pushW(('(' . ($subW . ')')));
                            if ($subAliasText !== '') {
                              $pushSql($subAliasText);
                              $pushW($subAliasText);
                            }
                          }
                          else {
                            $emitParam($ti);
                          }
                        }
                        else {
                          $emitParam($ti);
                        }
                      }
                      $pushSql(')');
                      $pushW(')');
                    }
                  }
                  elseif ($nameNorm === 'onconflictdonothing') {
                    if ($dialect === 'mysql') {
                      throw new Exception(lt_to_string('sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql'));
                    }
                    else {
                      $pushSql('ON');
                      $pushW('ON');
                      $pushSql('CONFLICT');
                      $pushW('CONFLICT');
                      $pushSql($conflictTarget(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                      $pushW($conflictTarget(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                      $pushSql('DO');
                      $pushW('DO');
                      $pushSql('NOTHING');
                      $pushW('NOTHING');
                    }
                  }
                  elseif ($nameNorm === 'onconflictdoupdate') {
                    if ($dialect === 'mysql') {
                      $pushSql('ON');
                      $pushW('ON');
                      $pushSql('DUPLICATE');
                      $pushW('DUPLICATE');
                      $pushSql('KEY');
                      $pushW('KEY');
                      $pushSql('UPDATE');
                      $pushW('UPDATE');
                      $assnFirst = true;
                      foreach (array_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value')) as $ak) {
                        if ($assnFirst === false) {
                          $sql = array_merge($sql, [',']);
                          $wsql = array_merge($wsql, [',']);
                        }
                        $assnFirst = false;
                        $pushSql($identStr($ak));
                        $pushW($identStr($ak));
                        $pushSql('=');
                        $pushW('=');
                        if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'))) {
                          $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'));
                          if ($tmpRef !== '') {
                            $emitIdent($tmpRef);
                          }
                          elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'delete'))))) {
                            $savedSql = $sql;
                            $savedW = $wsql;
                            $savedOrderSql = $orderSql;
                            $savedOrderW = $orderW;
                            $savedHasOrder = $hasOrder;
                            $savedAlias = $subAlias;
                            $sql = [];
                            $wsql = [];
                            $orderSql = '';
                            $orderW = '';
                            $hasOrder = false;
                            $subAlias = '';
                            $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'), 0);
                            $subSql = trim(lt_buf_str($sql));
                            $subW = trim(lt_buf_str($wsql));
                            $subAliasText = $subAlias;
                            $sql = $savedSql;
                            $wsql = $savedW;
                            $orderSql = $savedOrderSql;
                            $orderW = $savedOrderW;
                            $hasOrder = $savedHasOrder;
                            $subAlias = $savedAlias;
                            $pushSql(('(' . ($subSql . ')')));
                            $pushW(('(' . ($subW . ')')));
                            if ($subAliasText !== '') {
                              $pushSql($subAliasText);
                              $pushW($subAliasText);
                            }
                          }
                          else {
                            $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak));
                          }
                        }
                        else {
                          $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak));
                        }
                      }
                    }
                    else {
                      $pushSql('ON');
                      $pushW('ON');
                      $pushSql('CONFLICT');
                      $pushW('CONFLICT');
                      $pushSql($conflictTarget(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                      $pushW($conflictTarget(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                      $pushSql('DO');
                      $pushW('DO');
                      $pushSql('UPDATE');
                      $pushW('UPDATE');
                      $pushSql('SET');
                      $pushW('SET');
                      $assnFirst = true;
                      foreach (array_keys(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value')) as $ak) {
                        if ($assnFirst === false) {
                          $sql = array_merge($sql, [',']);
                          $wsql = array_merge($wsql, [',']);
                        }
                        $assnFirst = false;
                        $pushSql($identStr($ak));
                        $pushW($identStr($ak));
                        $pushSql('=');
                        $pushW('=');
                        if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'))) {
                          $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'));
                          if ($tmpRef !== '') {
                            $emitIdent($tmpRef);
                          }
                          elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values')) === 'delete'))))) {
                            $savedSql = $sql;
                            $savedW = $wsql;
                            $savedOrderSql = $orderSql;
                            $savedOrderW = $orderW;
                            $savedHasOrder = $hasOrder;
                            $savedAlias = $subAlias;
                            $sql = [];
                            $wsql = [];
                            $orderSql = '';
                            $orderW = '';
                            $hasOrder = false;
                            $subAlias = '';
                            $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak), 'chain'), 'values'), 0);
                            $subSql = trim(lt_buf_str($sql));
                            $subW = trim(lt_buf_str($wsql));
                            $subAliasText = $subAlias;
                            $sql = $savedSql;
                            $wsql = $savedW;
                            $orderSql = $savedOrderSql;
                            $orderW = $savedOrderW;
                            $hasOrder = $savedHasOrder;
                            $subAlias = $savedAlias;
                            $pushSql(('(' . ($subSql . ')')));
                            $pushW(('(' . ($subW . ')')));
                            if ($subAliasText !== '') {
                              $pushSql($subAliasText);
                              $pushW($subAliasText);
                            }
                          }
                          else {
                            $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak));
                          }
                        }
                        else {
                          $emitParam(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'object'), 'value'), $ak));
                        }
                      }
                    }
                  }
                  else {
                    throw new Exception(lt_to_string(('sql-builder parse: unsupported clause ' . $name)));
                  }
                }
              }
            }
            $flushOrder();
            return null;
          }
          else {
            $first = true;
            $left = '';
            $hasLeft = false;
            $base = '';
            foreach ($nodes as $node) {
              $pn = $normName(lt_get(lt_get($node, 'functionCall'), 'name'));
              $op = $opOf($pn);
              if (lt_truthy(lt_has($node, 'functionCall'))) {
                if (($pn === 'col') || ($pn === 'table')) {
                  $left = $identStr($asString(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                  $hasLeft = true;
                }
                elseif (lt_truthy($op)) {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  if (lt_truthy($hasLeft)) {
                    $base = $left;
                  }
                  else {
                    $base = '?';
                  }
                  $pushSql($base);
                  $pushW($base);
                  $pushSql($op);
                  $pushW($op);
                  if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                    $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                    if ($tmpRef !== '') {
                      $emitIdent($tmpRef);
                    }
                    elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                      $savedSql = $sql;
                      $savedW = $wsql;
                      $savedOrderSql = $orderSql;
                      $savedOrderW = $orderW;
                      $savedHasOrder = $hasOrder;
                      $savedAlias = $subAlias;
                      $sql = [];
                      $wsql = [];
                      $orderSql = '';
                      $orderW = '';
                      $hasOrder = false;
                      $subAlias = '';
                      $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                      $subSql = trim(lt_buf_str($sql));
                      $subW = trim(lt_buf_str($wsql));
                      $subAliasText = $subAlias;
                      $sql = $savedSql;
                      $wsql = $savedW;
                      $orderSql = $savedOrderSql;
                      $orderW = $savedOrderW;
                      $hasOrder = $savedHasOrder;
                      $subAlias = $savedAlias;
                      $pushSql(('(' . ($subSql . ')')));
                      $pushW(('(' . ($subW . ')')));
                      if ($subAliasText !== '') {
                        $pushSql($subAliasText);
                        $pushW($subAliasText);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                  }
                  else {
                    $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                  }
                  $hasLeft = false;
                }
                elseif ($pn === 'exists') {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  $pushSql('EXISTS');
                  $pushW('EXISTS');
                  if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                    $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                    if ($tmpRef !== '') {
                      $emitIdent($tmpRef);
                    }
                    elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                      $savedSql = $sql;
                      $savedW = $wsql;
                      $savedOrderSql = $orderSql;
                      $savedOrderW = $orderW;
                      $savedHasOrder = $hasOrder;
                      $savedAlias = $subAlias;
                      $sql = [];
                      $wsql = [];
                      $orderSql = '';
                      $orderW = '';
                      $hasOrder = false;
                      $subAlias = '';
                      $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                      $subSql = trim(lt_buf_str($sql));
                      $subW = trim(lt_buf_str($wsql));
                      $subAliasText = $subAlias;
                      $sql = $savedSql;
                      $wsql = $savedW;
                      $orderSql = $savedOrderSql;
                      $orderW = $savedOrderW;
                      $hasOrder = $savedHasOrder;
                      $subAlias = $savedAlias;
                      $pushSql(('(' . ($subSql . ')')));
                      $pushW(('(' . ($subW . ')')));
                      if ($subAliasText !== '') {
                        $pushSql($subAliasText);
                        $pushW($subAliasText);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                  }
                  else {
                    $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                  }
                  $hasLeft = false;
                }
                elseif ($pn === 'in') {
                  if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                    if ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                      if ($first === false) {
                        $pushSql('AND');
                        $pushW('AND');
                      }
                      $first = false;
                      if (lt_truthy($hasLeft)) {
                        $base = $left;
                      }
                      else {
                        $base = '?';
                      }
                      $pushSql($base);
                      $pushW($base);
                      $pushSql('IN');
                      $pushW('IN');
                      $savedSql = $sql;
                      $savedW = $wsql;
                      $savedOrderSql = $orderSql;
                      $savedOrderW = $orderW;
                      $savedHasOrder = $hasOrder;
                      $savedAlias = $subAlias;
                      $sql = [];
                      $wsql = [];
                      $orderSql = '';
                      $orderW = '';
                      $hasOrder = false;
                      $subAlias = '';
                      $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                      $subSql = trim(lt_buf_str($sql));
                      $subW = trim(lt_buf_str($wsql));
                      $subAliasText = $subAlias;
                      $sql = $savedSql;
                      $wsql = $savedW;
                      $orderSql = $savedOrderSql;
                      $orderW = $savedOrderW;
                      $hasOrder = $savedHasOrder;
                      $subAlias = $savedAlias;
                      $pushSql(('(' . ($subSql . ')')));
                      $pushW(('(' . ($subW . ')')));
                      if ($subAliasText !== '') {
                        $pushSql($subAliasText);
                        $pushW($subAliasText);
                      }
                    }
                    else {
                      if ($first === false) {
                        $pushSql('AND');
                        $pushW('AND');
                      }
                      $first = false;
                      if (lt_truthy($hasLeft)) {
                        $base = $left;
                      }
                      else {
                        $base = '?';
                      }
                      $pushSql($base);
                      $pushW($base);
                      $pushSql('IN (');
                      $pushW('IN (');
                      $inFirst = true;
                      foreach ($itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')) as $iv) {
                        if ($inFirst === false) {
                          $sql = array_merge($sql, [',']);
                          $wsql = array_merge($wsql, [',']);
                        }
                        $inFirst = false;
                        if (lt_truthy(lt_has($iv, 'chain'))) {
                          $tmpRef = $isRef(lt_get(lt_get($iv, 'chain'), 'values'));
                          if ($tmpRef !== '') {
                            $emitIdent($tmpRef);
                          }
                          elseif ((($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'delete'))))) {
                            $savedSql = $sql;
                            $savedW = $wsql;
                            $savedOrderSql = $orderSql;
                            $savedOrderW = $orderW;
                            $savedHasOrder = $hasOrder;
                            $savedAlias = $subAlias;
                            $sql = [];
                            $wsql = [];
                            $orderSql = '';
                            $orderW = '';
                            $hasOrder = false;
                            $subAlias = '';
                            $renderNodes(lt_get(lt_get($iv, 'chain'), 'values'), 0);
                            $subSql = trim(lt_buf_str($sql));
                            $subW = trim(lt_buf_str($wsql));
                            $subAliasText = $subAlias;
                            $sql = $savedSql;
                            $wsql = $savedW;
                            $orderSql = $savedOrderSql;
                            $orderW = $savedOrderW;
                            $hasOrder = $savedHasOrder;
                            $subAlias = $savedAlias;
                            $pushSql(('(' . ($subSql . ')')));
                            $pushW(('(' . ($subW . ')')));
                            if ($subAliasText !== '') {
                              $pushSql($subAliasText);
                              $pushW($subAliasText);
                            }
                          }
                          else {
                            $emitParam($iv);
                          }
                        }
                        else {
                          $emitParam($iv);
                        }
                      }
                      $pushSql(')');
                      $pushW(')');
                    }
                  }
                  else {
                    if ($first === false) {
                      $pushSql('AND');
                      $pushW('AND');
                    }
                    $first = false;
                    if (lt_truthy($hasLeft)) {
                      $base = $left;
                    }
                    else {
                      $base = '?';
                    }
                    $pushSql($base);
                    $pushW($base);
                    $pushSql('IN (');
                    $pushW('IN (');
                    $inFirst = true;
                    foreach ($itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')) as $iv) {
                      if ($inFirst === false) {
                        $sql = array_merge($sql, [',']);
                        $wsql = array_merge($wsql, [',']);
                      }
                      $inFirst = false;
                      if (lt_truthy(lt_has($iv, 'chain'))) {
                        $tmpRef = $isRef(lt_get(lt_get($iv, 'chain'), 'values'));
                        if ($tmpRef !== '') {
                          $emitIdent($tmpRef);
                        }
                        elseif ((($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get($iv, 'chain'), 'values')) === 'delete'))))) {
                          $savedSql = $sql;
                          $savedW = $wsql;
                          $savedOrderSql = $orderSql;
                          $savedOrderW = $orderW;
                          $savedHasOrder = $hasOrder;
                          $savedAlias = $subAlias;
                          $sql = [];
                          $wsql = [];
                          $orderSql = '';
                          $orderW = '';
                          $hasOrder = false;
                          $subAlias = '';
                          $renderNodes(lt_get(lt_get($iv, 'chain'), 'values'), 0);
                          $subSql = trim(lt_buf_str($sql));
                          $subW = trim(lt_buf_str($wsql));
                          $subAliasText = $subAlias;
                          $sql = $savedSql;
                          $wsql = $savedW;
                          $orderSql = $savedOrderSql;
                          $orderW = $savedOrderW;
                          $hasOrder = $savedHasOrder;
                          $subAlias = $savedAlias;
                          $pushSql(('(' . ($subSql . ')')));
                          $pushW(('(' . ($subW . ')')));
                          if ($subAliasText !== '') {
                            $pushSql($subAliasText);
                            $pushW($subAliasText);
                          }
                        }
                        else {
                          $emitParam($iv);
                        }
                      }
                      else {
                        $emitParam($iv);
                      }
                    }
                    $pushSql(')');
                    $pushW(')');
                  }
                  $hasLeft = false;
                }
                elseif ($pn === 'between') {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  if (lt_truthy($hasLeft)) {
                    $base = $left;
                  }
                  else {
                    $base = '?';
                  }
                  $pushSql($base);
                  $pushW($base);
                  $pushSql('BETWEEN');
                  $pushW('BETWEEN');
                  if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'))) {
                    $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'));
                    if ($tmpRef !== '') {
                      $emitIdent($tmpRef);
                    }
                    elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                      $savedSql = $sql;
                      $savedW = $wsql;
                      $savedOrderSql = $orderSql;
                      $savedOrderW = $orderW;
                      $savedHasOrder = $hasOrder;
                      $savedAlias = $subAlias;
                      $sql = [];
                      $wsql = [];
                      $orderSql = '';
                      $orderW = '';
                      $hasOrder = false;
                      $subAlias = '';
                      $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 0);
                      $subSql = trim(lt_buf_str($sql));
                      $subW = trim(lt_buf_str($wsql));
                      $subAliasText = $subAlias;
                      $sql = $savedSql;
                      $wsql = $savedW;
                      $orderSql = $savedOrderSql;
                      $orderW = $savedOrderW;
                      $hasOrder = $savedHasOrder;
                      $subAlias = $savedAlias;
                      $pushSql(('(' . ($subSql . ')')));
                      $pushW(('(' . ($subW . ')')));
                      if ($subAliasText !== '') {
                        $pushSql($subAliasText);
                        $pushW($subAliasText);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                    }
                  }
                  else {
                    $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'));
                  }
                  $pushSql('AND');
                  $pushW('AND');
                  if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'))) {
                    $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'));
                    if ($tmpRef !== '') {
                      $emitIdent($tmpRef);
                    }
                    elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                      $savedSql = $sql;
                      $savedW = $wsql;
                      $savedOrderSql = $orderSql;
                      $savedOrderW = $orderW;
                      $savedHasOrder = $hasOrder;
                      $savedAlias = $subAlias;
                      $sql = [];
                      $wsql = [];
                      $orderSql = '';
                      $orderW = '';
                      $hasOrder = false;
                      $subAlias = '';
                      $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 0);
                      $subSql = trim(lt_buf_str($sql));
                      $subW = trim(lt_buf_str($wsql));
                      $subAliasText = $subAlias;
                      $sql = $savedSql;
                      $wsql = $savedW;
                      $orderSql = $savedOrderSql;
                      $orderW = $savedOrderW;
                      $hasOrder = $savedHasOrder;
                      $subAlias = $savedAlias;
                      $pushSql(('(' . ($subSql . ')')));
                      $pushW(('(' . ($subW . ')')));
                      if ($subAliasText !== '') {
                        $pushSql($subAliasText);
                        $pushW($subAliasText);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'));
                    }
                  }
                  else {
                    $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'));
                  }
                  $hasLeft = false;
                }
                elseif ($pn === 'isnull') {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  if (lt_truthy($hasLeft)) {
                    $base = $left;
                  }
                  else {
                    $base = '?';
                  }
                  $pushSql($base);
                  $pushW($base);
                  $pushSql('IS NULL');
                  $pushW('IS NULL');
                  $hasLeft = false;
                }
                elseif ($pn === 'isnotnull') {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  if (lt_truthy($hasLeft)) {
                    $base = $left;
                  }
                  else {
                    $base = '?';
                  }
                  $pushSql($base);
                  $pushW($base);
                  $pushSql('IS NOT NULL');
                  $pushW('IS NOT NULL');
                  $hasLeft = false;
                }
                elseif ($pn === 'not') {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  $pushSql('NOT (');
                  $pushW('NOT (');
                  $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument'), 'chain'), 'values'), 1);
                  $pushSql(')');
                  $pushW(')');
                  $hasLeft = false;
                }
                elseif (($pn === 'and') || ($pn === 'or')) {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  $pushSql('(');
                  $pushW('(');
                  $boolFirst = true;
                  foreach ($itemsOf(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')) as $bv) {
                    if ($boolFirst === false) {
                      $tmp = strtoupper($pn);
                      $pushSql($tmp);
                      $pushW($tmp);
                    }
                    $boolFirst = false;
                    if (lt_truthy(lt_has($bv, 'chain'))) {
                      $renderNodes(lt_get(lt_get($bv, 'chain'), 'values'), 1);
                    }
                    else {
                      $emitParam($bv);
                    }
                  }
                  $pushSql(')');
                  $pushW(')');
                  $hasLeft = false;
                }
                elseif ($pn === 'as') {
                  if (lt_truthy($hasLeft)) {
                    $base = $left;
                  }
                  else {
                    $base = '?';
                  }
                  $pushSql($base);
                  $pushW($base);
                  $pushSql('AS');
                  $pushW('AS');
                  $emitIdent($asString(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                  $hasLeft = false;
                }
                elseif ($pn === 'op') {
                  if ($first === false) {
                    $pushSql('AND');
                    $pushW('AND');
                  }
                  $first = false;
                  if (lt_truthy($hasLeft)) {
                    $base = $left;
                  }
                  else {
                    $base = '?';
                  }
                  $pushSql($base);
                  $pushW($base);
                  $pushSql($asString(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                  $pushW($asString(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 0), 'argument')));
                  if (lt_truthy(lt_has(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'))) {
                    $tmpRef = $isRef(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'));
                    if ($tmpRef !== '') {
                      $emitIdent($tmpRef);
                    }
                    elseif ((($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'select') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'with')) || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'values') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'insert') || (($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'update') || ($firstKind(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values')) === 'delete'))))) {
                      $savedSql = $sql;
                      $savedW = $wsql;
                      $savedOrderSql = $orderSql;
                      $savedOrderW = $orderW;
                      $savedHasOrder = $hasOrder;
                      $savedAlias = $subAlias;
                      $sql = [];
                      $wsql = [];
                      $orderSql = '';
                      $orderW = '';
                      $hasOrder = false;
                      $subAlias = '';
                      $renderNodes(lt_get(lt_get(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'), 'chain'), 'values'), 0);
                      $subSql = trim(lt_buf_str($sql));
                      $subW = trim(lt_buf_str($wsql));
                      $subAliasText = $subAlias;
                      $sql = $savedSql;
                      $wsql = $savedW;
                      $orderSql = $savedOrderSql;
                      $orderW = $savedOrderW;
                      $hasOrder = $savedHasOrder;
                      $subAlias = $savedAlias;
                      $pushSql(('(' . ($subSql . ')')));
                      $pushW(('(' . ($subW . ')')));
                      if ($subAliasText !== '') {
                        $pushSql($subAliasText);
                        $pushW($subAliasText);
                      }
                    }
                    else {
                      $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'));
                    }
                  }
                  else {
                    $emitParam(lt_get(lt_get(lt_get(lt_get($node, 'functionCall'), 'arguments'), 1), 'argument'));
                  }
                  $hasLeft = false;
                }
                elseif ($pn === 'raw') {
                  $emitRaw($node);
                }
                else {
                  throw new Exception(lt_to_string('sql-builder parse: unsupported predicate'));
                }
              }
            }
            return null;
          }
        };
        $renderNodes(lt_get(lt_get(lt_get(lt_get($root, 'schema'), 'chain'), 'chain'), 'values'), 0);
        $sql = lt_buf_str($sql);
        $wsql = lt_buf_str($wsql);
        $params = $params;
        return ["sql" => trim($sql), "sqlWithParam" => trim($wsql), "param" => array_map(function ($p) { return $p["string"]["value"] ?? $p["number"]["value"] ?? $p["boolean"]["value"] ?? null; }, $params)];
    }
}

// Auto-generated init functions
function sqlBuilder($variableName = null, ...$copies)
{
    $structure = new SqlBuilder();
    $structure->initFromInitFunction([
        "name" => 'sql-builder',
        "variableName" => $variableName !== null && $variableName !== "" ? $variableName : $structure->getSchema()["schema"]["chain"]["chain"]["initFunction"]["variableName"],
    ], $copies);
    return $structure;
}
