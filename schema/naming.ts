// Identifier sanitising for generated Lingua Tungga source.
//
// LT identifiers are case-insensitive within a package, and several language
// keywords are reserved. Database names are never changed: only the accessor
// identifiers are sanitised.

const RESERVED = new Set([
    "and",
    "as",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "defer",
    "else",
    "enum",
    "export",
    "false",
    "finally",
    "fn",
    "for",
    "from",
    "if",
    "impl",
    "import",
    "in",
    "interface",
    "let",
    "loop",
    "match",
    "mod",
    "mut",
    "new",
    "nil",
    "none",
    "not",
    "null",
    "or",
    "package",
    "private",
    "protected",
    "pub",
    "public",
    "readonly",
    "return",
    "self",
    "static",
    "struct",
    "super",
    "test",
    "this",
    "throw",
    "trait",
    "true",
    "try",
    "type",
    "use",
    "var",
    "void",
    "where",
    "while",
    "yield",
]);

function words(raw: string): string[] {
    return raw
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
        .replace(/[^A-Za-z0-9]+/g, "_")
        .split("_")
        .filter((part) => part.length > 0);
}

function finish(parts: string[], pascal: boolean): string {
    let name = parts
        .map((part) =>
            pascal
                ? part[0]!.toUpperCase() + part.slice(1).toLowerCase()
                : part.toLowerCase(),
        )
        .join(pascal ? "" : "_");

    if (name.length === 0) name = "_";
    if (/^[0-9]/.test(name)) name = `_${name}`;
    if (RESERVED.has(name.toLowerCase())) name = `${name}_`;
    return name;
}

export function toSnakeCase(raw: string): string {
    return finish(words(raw), false);
}

export function toPascalCase(raw: string): string {
    return finish(words(raw), true);
}

export function tableTypeName(tableName: string): string {
    return `${toPascalCase(tableName)}Table`;
}

export function enumColumnTypeName(enumName: string): string {
    return `${toPascalCase(enumName)}Column`;
}

export function enumPackageName(enumName: string): string {
    return `schema_enum_${toSnakeCase(enumName)}`;
}

export function enumValueFunctionName(enumName: string): string {
    return `${toSnakeCase(enumName)}_value`;
}

export function ltString(value: string): string {
    return JSON.stringify(value);
}
