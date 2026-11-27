// Auto-generated index for gntrees-sql-builder

#![allow(dead_code)]

#![allow(unused_mut)]

#![allow(unused_variables)]

use crate::lt;

// parse() returns an lt::Value map: { "sql": string, "sqlWithParam": string, "param": array }

// Auto-generated Rust method-chain types.
//
// Rust has no `any`, so LT values are `lt::Value`. There is no `Value` enum
// beyond that. The one shared abstraction is `Structure`: every generated builder
// implements it, which lets the generic runtime (`copy` / `make_copy`) call
// `get_schema()` and name the structure.

pub trait Structure {
    fn get_schema(&self) -> lt::Value;
    fn kebab_name(&self) -> String;
}


pub mod mc {
    use crate::lt;
    use super::Structure;

// Auto-generated Rust method-chain runtime (Lingua Tungga Gelombang 3).
//
// The static counterpart of `core/base/python/base-utils.py`. Schemas are
// `lt::Value` maps; the generator inlines this fragment inside `pub mod mc`.
//
// Rust has no exceptions, so — like Go/Swift — union resolution needs a
// non-panicking path: `try_normalize_argument` returns `Result<Value, String>`
// and the public `normalize_argument` turns an `Err` into a `panic!` (matching
// the Rust emitter's `throwError`).

pub fn mc_typeof(value: &lt::Value) -> &'static str {
    match value {
        lt::Value::Bool(_) => "boolean",
        lt::Value::Int(_) | lt::Value::Float(_) => "number",
        lt::Value::Str(_) => "string",
        _ => "object",
    }
}

pub fn has_key(value: &lt::Value, key: &str) -> bool {
    matches!(value, lt::Value::Map(entries) if entries.iter().any(|(k, _)| k == key))
}

pub fn set_entry(entries: &mut Vec<(String, lt::Value)>, key: &str, value: lt::Value) {
    for (k, v) in entries.iter_mut() {
        if k == key {
            *v = value;
            return;
        }
    }
    entries.push((key.to_string(), value));
}

/// Mutable reference to a map entry (for in-place schema updates).
pub fn map_get_mut<'a>(value: &'a mut lt::Value, key: &str) -> Option<&'a mut lt::Value> {
    if let lt::Value::Map(entries) = value {
        for (k, v) in entries.iter_mut() {
            if k == key {
                return Some(v);
            }
        }
    }
    None
}

pub fn map_set(value: &mut lt::Value, key: &str, new_value: lt::Value) {
    if let lt::Value::Map(entries) = value {
        for (k, v) in entries.iter_mut() {
            if k == key {
                *v = new_value;
                return;
            }
        }
        entries.push((key.to_string(), new_value));
    }
}

pub fn validate_schema(schema: &lt::Value) {
    let message = "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction";
    if !matches!(schema, lt::Value::Map(_)) {
        panic!("{}", message);
    }
    let inner = lt::get(schema, "schema");
    if !matches!(inner, lt::Value::Map(_)) {
        panic!("{}", message);
    }
    let chain = lt::get(&inner, "chain");
    if !matches!(chain, lt::Value::Map(_)) {
        panic!("{}", message);
    }
    let chain_chain = lt::get(&chain, "chain");
    if !matches!(chain_chain, lt::Value::Map(_)) {
        panic!("{}", message);
    }
    if !matches!(lt::get(&chain_chain, "values"), lt::Value::Array(_))
        || !lt::truthy(&lt::get(&chain_chain, "initFunction"))
    {
        panic!("{}", message);
    }
}

pub fn unwrap_argument_value(value: &lt::Value) -> lt::Value {
    if !matches!(value, lt::Value::Map(_)) {
        panic!("Unknown argument value type");
    }
    if has_key(value, "string") {
        return lt::get(&lt::get(value, "string"), "value");
    }
    if has_key(value, "number") {
        return lt::get(&lt::get(value, "number"), "value");
    }
    if has_key(value, "boolean") {
        return lt::get(&lt::get(value, "boolean"), "value");
    }
    if has_key(value, "null") {
        return lt::get(&lt::get(value, "null"), "value");
    }
    if has_key(value, "array") {
        let mut out: Vec<lt::Value> = Vec::new();
        for item in lt::array_items(&lt::get(&lt::get(value, "array"), "value")) {
            out.push(unwrap_argument_value(&item));
        }
        return lt::array(out);
    }
    if has_key(value, "object") {
        let mut out: Vec<(String, lt::Value)> = Vec::new();
        if let lt::Value::Map(entries) = lt::get(&lt::get(value, "object"), "value") {
            for (k, v) in entries {
                out.push((k, unwrap_argument_value(&v)));
            }
        }
        return lt::Value::Map(out);
    }
    if has_key(value, "chain") {
        panic!("Cannot validate a chain default value at runtime");
    }
    panic!("Unknown argument value type");
}

pub fn validate_default(default_val: &lt::Value, struct_type: &lt::Value) {
    let _ = normalize_argument(&unwrap_argument_value(default_val), struct_type);
}

pub fn normalize_argument(arg: &lt::Value, struct_type: &lt::Value) -> lt::Value {
    match try_normalize_argument(arg, struct_type) {
        Ok(value) => value,
        Err(message) => panic!("{}", message),
    }
}

pub fn try_normalize_argument(
    arg: &lt::Value,
    struct_type: &lt::Value,
) -> Result<lt::Value, String> {
    if !matches!(struct_type, lt::Value::Map(_)) {
        return Err("Unsupported struct type in normalizeArgument".to_string());
    }

    if has_key(struct_type, "array") {
        let items = match arg {
            lt::Value::Array(items) => items,
            _ => {
                return Err(format!(
                    "Expected an array argument, but got {}",
                    mc_typeof(arg)
                ))
            }
        };
        if items.is_empty() {
            return Ok(lt::map(vec![(
                "array",
                lt::map(vec![("value", lt::array(vec![]))]),
            )]));
        }
        let item_type = lt::get(&lt::get(struct_type, "array"), "type");
        let mut normalized_items: Vec<lt::Value> = Vec::new();
        for item in items {
            normalized_items.push(try_normalize_argument(item, &item_type)?);
        }
        if matches!(normalized_items[0], lt::Value::Null) {
            return Err("Unexpected undefined value in array".to_string());
        }
        return Ok(lt::map(vec![(
            "array",
            lt::map(vec![("value", lt::array(normalized_items))]),
        )]));
    }

    if has_key(struct_type, "object") {
        let entries = match arg {
            lt::Value::Map(entries) => entries,
            _ => {
                return Err(format!(
                    "Expected an object argument, but got {}",
                    mc_typeof(arg)
                ))
            }
        };
        let declared = lt::get(struct_type, "object");
        let mut missing: Vec<String> = Vec::new();
        for key in lt::array_items(&lt::keys(&declared)) {
            let key_text = lt::as_string(&key);
            if !has_key(arg, &key_text) {
                missing.push(key_text);
            }
        }
        if !missing.is_empty() {
            return Err(format!(
                "Missing required key(s) \"{}\" in object argument",
                missing.join("\", \"")
            ));
        }
        let mut normalized: Vec<(String, lt::Value)> = Vec::new();
        for (k, v) in entries {
            if !has_key(&declared, k) {
                return Err(format!("Unexpected key \"{}\" in object argument", k));
            }
            normalized.push((
                k.clone(),
                try_normalize_argument(v, &lt::get(&declared, k))?,
            ));
        }
        return Ok(lt::map(vec![(
            "object",
            lt::map(vec![("value", lt::Value::Map(normalized))]),
        )]));
    }

    if has_key(struct_type, "string") {
        if !matches!(arg, lt::Value::Str(_)) {
            return Err(format!(
                "Expected a string argument, but got {}",
                mc_typeof(arg)
            ));
        }
        return Ok(lt::map(vec![(
            "string",
            lt::map(vec![("value", arg.clone())]),
        )]));
    }

    if has_key(struct_type, "number") {
        if matches!(arg, lt::Value::Bool(_))
            || !matches!(arg, lt::Value::Int(_) | lt::Value::Float(_))
        {
            return Err(format!(
                "Expected a number argument, but got {}",
                mc_typeof(arg)
            ));
        }
        let number = match arg {
            lt::Value::Int(i) => *i as f64,
            lt::Value::Float(f) => *f,
            _ => 0.0,
        };
        if !number.is_finite() {
            return Err(format!(
                "Expected a finite number argument, but got {}",
                lt::as_string(arg)
            ));
        }
        return Ok(lt::map(vec![(
            "number",
            lt::map(vec![("value", lt::number(number))]),
        )]));
    }

    if has_key(struct_type, "boolean") {
        if !matches!(arg, lt::Value::Bool(_)) {
            return Err(format!(
                "Expected a boolean argument, but got {}",
                mc_typeof(arg)
            ));
        }
        return Ok(lt::map(vec![(
            "boolean",
            lt::map(vec![("value", arg.clone())]),
        )]));
    }

    if has_key(struct_type, "null") {
        if !matches!(arg, lt::Value::Null) {
            return Err(format!(
                "Expected a null argument, but got {}",
                mc_typeof(arg)
            ));
        }
        return Ok(lt::map(vec![(
            "null",
            lt::map(vec![("value", lt::null())]),
        )]));
    }

    if has_key(struct_type, "union") {
        let mut reasons: Vec<String> = Vec::new();
        let mut normalized: Vec<lt::Value> = Vec::new();
        for union_type in lt::array_items(&lt::get(&lt::get(struct_type, "union"), "types")) {
            match try_normalize_argument(arg, &union_type) {
                Ok(value) => normalized.push(value),
                Err(message) => reasons.push(message),
            }
        }
        if normalized.is_empty() || matches!(normalized[0], lt::Value::Null) {
            return Err(format!(
                "Argument does not match any type in the union: {}",
                reasons.join(" | ")
            ));
        }
        if normalized.len() > 1 {
            if let lt::Value::Array(items) = arg {
                if items.is_empty() {
                    return Ok(normalized.remove(0));
                }
            }
            return Err(
                "Argument matches multiple types in the union, which is ambiguous".to_string(),
            );
        }
        return Ok(normalized.remove(0));
    }

    if has_key(struct_type, "map") {
        let entries = match arg {
            lt::Value::Map(entries) => entries,
            _ => {
                return Err(format!(
                    "Expected an object argument for map type, but got {}",
                    mc_typeof(arg)
                ))
            }
        };
        let value_type = lt::get(&lt::get(struct_type, "map"), "type");
        let mut normalized: Vec<(String, lt::Value)> = Vec::new();
        for (k, v) in entries {
            normalized.push((k.clone(), try_normalize_argument(v, &value_type)?));
        }
        return Ok(lt::map(vec![(
            "object",
            lt::map(vec![("value", lt::Value::Map(normalized))]),
        )]));
    }

    if has_key(struct_type, "structureCall") {
        return try_normalize_argument_structure_call(arg);
    }

    if has_key(struct_type, "literal") {
        let expected = lt::get(&lt::get(struct_type, "literal"), "value");
        let literal_type = lt::as_string(&lt::get(&lt::get(struct_type, "literal"), "type"));
        if literal_type == "string" {
            if !matches!(arg, lt::Value::Str(_)) {
                return Err(format!(
                    "Expected a string literal argument, but got {}",
                    mc_typeof(arg)
                ));
            }
            if lt::as_string(arg) != lt::as_string(&expected) {
                return Err(format!(
                    "Expected string literal {}, but got {}",
                    lt::as_string(&expected),
                    lt::as_string(arg)
                ));
            }
            return Ok(lt::map(vec![(
                "string",
                lt::map(vec![("value", arg.clone())]),
            )]));
        }
        if literal_type == "number" {
            if matches!(arg, lt::Value::Bool(_))
                || !matches!(arg, lt::Value::Int(_) | lt::Value::Float(_))
            {
                return Err(format!(
                    "Expected a number literal argument, but got {}",
                    mc_typeof(arg)
                ));
            }
            if !lt::value_equals(arg, &expected) {
                return Err(format!(
                    "Expected number literal {}, but got {}",
                    lt::as_string(&expected),
                    lt::as_string(arg)
                ));
            }
            return Ok(lt::map(vec![(
                "number",
                lt::map(vec![("value", arg.clone())]),
            )]));
        }
        if !matches!(arg, lt::Value::Bool(_)) {
            return Err(format!(
                "Expected a boolean literal argument, but got {}",
                mc_typeof(arg)
            ));
        }
        if !lt::value_equals(arg, &expected) {
            return Err(format!(
                "Expected boolean literal {}, but got {}",
                lt::as_string(&expected),
                lt::as_string(arg)
            ));
        }
        return Ok(lt::map(vec![(
            "boolean",
            lt::map(vec![("value", arg.clone())]),
        )]));
    }

    Err("Unsupported struct type in normalizeArgument".to_string())
}

/// A structure-call argument is the builder's schema `Value`; its chain is
/// `schema.schema.chain`.
pub fn try_normalize_argument_structure_call(arg: &lt::Value) -> Result<lt::Value, String> {
    if matches!(arg, lt::Value::Map(_)) {
        let inner = lt::get(arg, "schema");
        if matches!(inner, lt::Value::Map(_)) {
            return Ok(lt::get(&inner, "chain"));
        }
    }
    Err(format!(
        "Expected a structure instance for structure calls, but got {}",
        mc_typeof(arg)
    ))
}

pub fn create_schema(
    old_schema: &lt::Value,
    function_name: &str,
    function_args: &[lt::Value],
    is_template_literal: bool,
) -> lt::Value {
    validate_schema(old_schema);
    let old = lt::get(old_schema, "schema");
    let old_chain = lt::get(&lt::get(&old, "chain"), "chain");

    let mut args: Vec<lt::Value> = Vec::new();
    if is_template_literal && !function_args.is_empty() {
        let strings = lt::get(&function_args[0], "arg");
        let string_items = match strings {
            lt::Value::Array(items) => items,
            _ => panic!("Expected a template strings array for {}", function_name),
        };
        for text in &string_items {
            if !matches!(text, lt::Value::Str(_)) {
                panic!("Expected a template strings array for {}", function_name);
            }
        }
        let expressions: Vec<lt::Value> = function_args[1..].to_vec();
        if expressions.len() != string_items.len() - 1 {
            panic!(
                "Template literal for {} expects {} expression(s), but got {}",
                function_name,
                string_items.len() - 1,
                expressions.len()
            );
        }
        for index in 0..string_items.len() {
            let text = lt::as_string(&string_items[index]);
            if !text.is_empty() {
                args.push(lt::map(vec![
                    (
                        "argument",
                        lt::map(vec![(
                            "string",
                            lt::map(vec![("value", lt::string(&text))]),
                        )]),
                    ),
                    ("default", lt::null()),
                ]));
            }
            if index < expressions.len() {
                let expression = &expressions[index];
                if matches!(expression, lt::Value::Null) {
                    panic!("Missing expression for template literal at index {}", index);
                }
                args.push(lt::map(vec![
                    (
                        "argument",
                        normalize_argument(
                            &lt::get(expression, "arg"),
                            &lt::get(expression, "struct"),
                        ),
                    ),
                    ("default", lt::null()),
                ]));
            }
        }
    } else {
        for (index, function_arg) in function_args.iter().enumerate() {
            let provided = lt::truthy(&lt::get(function_arg, "provided"));
            let default_val = lt::get(function_arg, "default");
            if !provided {
                if !matches!(default_val, lt::Value::Null) {
                    validate_default(&default_val, &lt::get(function_arg, "struct"));
                    args.push(lt::map(vec![
                        ("argument", default_val.clone()),
                        ("default", default_val),
                    ]));
                    continue;
                }
                panic!(
                    "Parameter \"{}\" argument #{} was not provided",
                    function_name,
                    index + 1
                );
            }
            let argument = normalize_argument(
                &lt::get(function_arg, "arg"),
                &lt::get(function_arg, "struct"),
            );
            if !matches!(default_val, lt::Value::Null) {
                validate_default(&default_val, &lt::get(function_arg, "struct"));
            }
            args.push(lt::map(vec![
                ("argument", argument),
                ("default", default_val),
            ]));
        }
    }

    let mut values = lt::array_items(&lt::get(&old_chain, "values"));
    values.push(lt::map(vec![(
        "functionCall",
        lt::map(vec![
            ("name", lt::string(function_name)),
            ("arguments", lt::array(args)),
            ("isTemplateLiteral", lt::boolean(is_template_literal)),
        ]),
    )]));

    let mut inner_entries = match &old {
        lt::Value::Map(entries) => entries.clone(),
        _ => Vec::new(),
    };
    set_entry(
        &mut inner_entries,
        "chain",
        lt::map(vec![(
            "chain",
            lt::map(vec![
                ("values", lt::array(values)),
                ("initFunction", lt::get(&old_chain, "initFunction")),
            ]),
        )]),
    );
    lt::map(vec![("schema", lt::Value::Map(inner_entries))])
}

pub fn create_property_call_schema(old_schema: &lt::Value, property_name: &str) -> lt::Value {
    let old = lt::get(old_schema, "schema");
    let old_chain = lt::get(&lt::get(&old, "chain"), "chain");

    let mut values = lt::array_items(&lt::get(&old_chain, "values"));
    values.push(lt::map(vec![(
        "propertyCall",
        lt::map(vec![("name", lt::string(property_name))]),
    )]));

    let mut inner_entries = match &old {
        lt::Value::Map(entries) => entries.clone(),
        _ => Vec::new(),
    };
    set_entry(
        &mut inner_entries,
        "chain",
        lt::map(vec![(
            "chain",
            lt::map(vec![
                ("values", lt::array(values)),
                ("initFunction", lt::get(&old_chain, "initFunction")),
            ]),
        )]),
    );
    lt::map(vec![("schema", lt::Value::Map(inner_entries))])
}

pub fn make_copy(structure_name: &str, source: &dyn Structure) -> lt::Value {
    let schema = source.get_schema();
    validate_schema(&schema);
    lt::map(vec![(
        "copy",
        lt::map(vec![
            ("structureName", lt::string(structure_name)),
            ("chain", lt::get(&lt::get(&schema, "schema"), "chain")),
        ]),
    )])
}

pub fn copy(source: &dyn Structure) -> lt::Value {
    make_copy(&source.kebab_name(), source)
}

pub fn apply_copies(schema: &mut lt::Value, copies: &lt::Value, target_structure_name: &str) {
    if !lt::truthy(copies) {
        return;
    }
    for cp in lt::array_items(copies) {
        let valid = matches!(&cp, lt::Value::Map(_))
            && has_key(&cp, "copy")
            && matches!(lt::get(&cp, "copy"), lt::Value::Map(_))
            && matches!(
                lt::get(&lt::get(&cp, "copy"), "structureName"),
                lt::Value::Str(_)
            )
            && matches!(lt::get(&lt::get(&cp, "copy"), "chain"), lt::Value::Map(_));
        if !valid {
            panic!("Invalid builder argument in init function: wrap the structure with copy(...)");
        }
        let name = lt::as_string(&lt::get(&lt::get(&cp, "copy"), "structureName"));
        if name != target_structure_name {
            panic!(
                "Cannot copy builder of structure '{}' into '{}'",
                name, target_structure_name
            );
        }
        let value = lt::map(vec![(
            "copy",
            lt::map(vec![
                ("structureName", lt::string(&name)),
                ("chain", lt::get(&lt::get(&cp, "copy"), "chain")),
            ]),
        )]);
        if let Some(inner) = map_get_mut(schema, "schema") {
            if let Some(chain) = map_get_mut(inner, "chain") {
                if let Some(chain_chain) = map_get_mut(chain, "chain") {
                    if let Some(values) = map_get_mut(chain_chain, "values") {
                        if let lt::Value::Array(items) = values {
                            items.push(value);
                        }
                    }
                }
            }
        }
    }
}

}

pub struct SqlBuilder {
    schema: lt::Value,
}

impl SqlBuilder {
    pub fn new() -> Self {
        SqlBuilder { schema: lt::map(vec![("schema", lt::map(vec![("exportName", lt::string("schema")), ("importPaths", lt::map(vec![("typescript", lt::string("../../../gntrees-sql-builder/typescript/index"))])), ("chain", lt::map(vec![("chain", lt::map(vec![("values", lt::array(vec![])), ("initFunction", lt::map(vec![("name", lt::string("sql-builder")), ("variableName", lt::string("s1"))]))]))]))]))]) }
    }

    pub fn init_from_structure(&self, schema: lt::Value) -> SqlBuilder {
        mc::validate_schema(&schema);
        SqlBuilder { schema }
    }

    pub fn init_from_init_function(&self, init_function: lt::Value, copies: &lt::Value) -> SqlBuilder {
        if !matches!(lt::get(&init_function, "name"), lt::Value::Str(_)) || !matches!(lt::get(&init_function, "variableName"), lt::Value::Str(_)) {
            panic!("Invalid init function");
        }
        let mut schema = self.get_schema();
        if let Some(inner) = mc::map_get_mut(&mut schema, "schema") {
            if let Some(chain) = mc::map_get_mut(inner, "chain") {
                if let Some(chain_chain) = mc::map_get_mut(chain, "chain") {
                    mc::map_set(chain_chain, "initFunction", init_function);
                }
            }
        }
        mc::apply_copies(&mut schema, copies, "sql-builder");
        SqlBuilder { schema }
    }

    pub fn select(&self, __a: &[lt::Value]) -> SqlBuilder {
        let columns = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "select", &[
            lt::map(vec![("arg", columns), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))]), lt::map(vec![("map", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn from(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "from", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn transaction(&self, __a: &[lt::Value]) -> SqlBuilder {
        let transaction = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "transaction", &[
            lt::map(vec![("arg", transaction), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn order_by(&self, __a: &[lt::Value]) -> SqlBuilder {
        let columns = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "orderBy", &[
            lt::map(vec![("arg", columns), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn limit(&self, __a: &[lt::Value]) -> SqlBuilder {
        let count = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "limit", &[
            lt::map(vec![("arg", count), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn offset(&self, __a: &[lt::Value]) -> SqlBuilder {
        let count = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "offset", &[
            lt::map(vec![("arg", count), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn with(&self, __a: &[lt::Value]) -> SqlBuilder {
        let statement = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let as_ = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "with", &[
            lt::map(vec![("arg", statement), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", as_), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn group_by(&self, __a: &[lt::Value]) -> SqlBuilder {
        let columns = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "groupBy", &[
            lt::map(vec![("arg", columns), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn having(&self, __a: &[lt::Value]) -> SqlBuilder {
        let statement = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "having", &[
            lt::map(vec![("arg", statement), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn where_(&self, __a: &[lt::Value]) -> SqlBuilder {
        let statement = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "where", &[
            lt::map(vec![("arg", statement), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn update(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let set = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "update", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", set), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("map", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn set(&self, __a: &[lt::Value]) -> SqlBuilder {
        let statement = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "set", &[
            lt::map(vec![("arg", statement), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("map", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn insert(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let set = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "insert", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", set), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("map", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn values(&self, __a: &[lt::Value]) -> SqlBuilder {
        let values = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "values", &[
            lt::map(vec![("arg", values), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn returning(&self, __a: &[lt::Value]) -> SqlBuilder {
        let columns = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "returning", &[
            lt::map(vec![("arg", columns), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))]), lt::map(vec![("map", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn on_conflict_do_nothing(&self, __a: &[lt::Value]) -> SqlBuilder {
        let target = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "onConflictDoNothing", &[
            lt::map(vec![("arg", target), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn on_conflict_do_update(&self, __a: &[lt::Value]) -> SqlBuilder {
        let target = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let set = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "onConflictDoUpdate", &[
            lt::map(vec![("arg", target), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", set), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("map", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn delete(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "delete", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn join(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let on = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "join", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", on), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn left_join(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let on = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "leftJoin", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", on), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn right_join(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let on = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "rightJoin", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", on), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn inner_join(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let on = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "innerJoin", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", on), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn full_join(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let on = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "fullJoin", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", on), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn cross_join(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let on = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "crossJoin", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", on), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn eq(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "eq", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn gt(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "gt", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn gte(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "gte", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn lt(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "lt", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn lte(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "lte", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn exists(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "exists", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn is_null(&self, __a: &[lt::Value]) -> SqlBuilder {
        self.init_from_structure(mc::create_schema(&self.get_schema(), "isNull", &[
        ], false))
    }

    pub fn is_not_null(&self, __a: &[lt::Value]) -> SqlBuilder {
        self.init_from_structure(mc::create_schema(&self.get_schema(), "isNotNull", &[
        ], false))
    }

    pub fn in_(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "in", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn between(&self, __a: &[lt::Value]) -> SqlBuilder {
        let first = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let second = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "between", &[
            lt::map(vec![("arg", first), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", second), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn like(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "like", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn ilike(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "ilike", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn not(&self, __a: &[lt::Value]) -> SqlBuilder {
        let value = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "not", &[
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn and(&self, __a: &[lt::Value]) -> SqlBuilder {
        let values = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "and", &[
            lt::map(vec![("arg", values), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn or(&self, __a: &[lt::Value]) -> SqlBuilder {
        let values = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "or", &[
            lt::map(vec![("arg", values), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]), lt::map(vec![("array", lt::map(vec![("type", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn op(&self, __a: &[lt::Value]) -> SqlBuilder {
        let operation = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        let value = if __a.len() > 1 { __a[1].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "op", &[
            lt::map(vec![("arg", operation), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))]),
            lt::map(vec![("arg", value), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 1))])
        ], false))
    }

    pub fn raw(&self, __a: &[lt::Value]) -> SqlBuilder {
        let mut __fargs: Vec<lt::Value> = Vec::new();
        __fargs.push(lt::map(vec![("arg", if __a.len() > 0 { __a[0].clone() } else { lt::null() }), ("struct", lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]))]));
        for __i in 1..__a.len() {
            __fargs.push(lt::map(vec![("arg", __a[__i].clone()), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))]))]));
        }
        self.init_from_structure(mc::create_schema(&self.get_schema(), "raw", &__fargs, true))
    }

    pub fn asc(&self, __a: &[lt::Value]) -> SqlBuilder {
        self.init_from_structure(mc::create_schema(&self.get_schema(), "asc", &[
        ], false))
    }

    pub fn desc(&self, __a: &[lt::Value]) -> SqlBuilder {
        self.init_from_structure(mc::create_schema(&self.get_schema(), "desc", &[
        ], false))
    }

    pub fn as_(&self, __a: &[lt::Value]) -> SqlBuilder {
        let alias = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "as", &[
            lt::map(vec![("arg", alias), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn col(&self, __a: &[lt::Value]) -> SqlBuilder {
        let column = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "col", &[
            lt::map(vec![("arg", column), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn table(&self, __a: &[lt::Value]) -> SqlBuilder {
        let table = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "table", &[
            lt::map(vec![("arg", table), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("string", lt::map(vec![("type", lt::string("string"))]))]), lt::map(vec![("number", lt::map(vec![("type", lt::string("number"))]))]), lt::map(vec![("boolean", lt::map(vec![("type", lt::string("boolean"))]))]), lt::map(vec![("structureCall", lt::map(vec![("name", lt::string("sql-builder"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn set_dialect(&self, __a: &[lt::Value]) -> SqlBuilder {
        let db = if __a.len() > 0 { __a[0].clone() } else { lt::null() };
        self.init_from_structure(mc::create_schema(&self.get_schema(), "setDialect", &[
            lt::map(vec![("arg", db), ("struct", lt::map(vec![("union", lt::map(vec![("types", lt::array(vec![lt::map(vec![("literal", lt::map(vec![("value", lt::string("postgres")), ("type", lt::string("string"))]))]), lt::map(vec![("literal", lt::map(vec![("value", lt::string("mysql")), ("type", lt::string("string"))]))]), lt::map(vec![("literal", lt::map(vec![("value", lt::string("sqlite")), ("type", lt::string("string"))]))]), lt::map(vec![("literal", lt::map(vec![("value", lt::string("single-store")), ("type", lt::string("string"))]))]), lt::map(vec![("literal", lt::map(vec![("value", lt::string("mssql")), ("type", lt::string("string"))]))]), lt::map(vec![("literal", lt::map(vec![("value", lt::string("cockroach")), ("type", lt::string("string"))]))])]))]))])), ("provided", lt::boolean(__a.len() > 0))])
        ], false))
    }

    pub fn parse(&self) -> lt::Value {
        lt::set_var("root", self.get_schema());
        lt::set_var("dialect", lt::string(""));
        lt::set_var("quote", lt::string(""));
        lt::set_var("sql", lt::buf_new());
        lt::set_var("wsql", lt::buf_new());
        lt::set_var("params", lt::list_new());
        lt::set_var("orderSql", lt::string(""));
        lt::set_var("orderW", lt::string(""));
        lt::set_var("hasOrder", lt::boolean(false));
        lt::set_var("tmp", lt::string(""));
        lt::set_var("tmp2", lt::string(""));
        lt::set_var("tmpRef", lt::string(""));
        lt::set_var("subAlias", lt::string(""));
        lt::set_var("withFirst", lt::boolean(true));
        lt::def_fn("normName", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("n", __args[0].clone())]);
          return lt::to_lower(&lt::replace(&lt::get_var("n"), &lt::string("-"), &lt::string("")));
          lt::null()
        });
        lt::def_fn("pushSql", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("text", __args[0].clone())]);
          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(" ")));
          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::get_var("text")));
          return lt::null();
          lt::null()
        });
        lt::def_fn("pushW", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("text", __args[0].clone())]);
          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(" ")));
          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::get_var("text")));
          return lt::null();
          lt::null()
        });
        lt::def_fn("asString", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("arg", __args[0].clone())]);
          return lt::get_key(&lt::get_key(&lt::get_var("arg"), &lt::string("string")), &lt::string("value"));
          lt::null()
        });
        lt::def_fn("identStr", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("name", __args[0].clone())]);
          let mut escapedName = lt::replace(&lt::get_var("name"), &lt::get_var("quote"), &lt::str_concat(&lt::get_var("quote"), &lt::get_var("quote")));
          let mut qualifiedName = lt::replace(&escapedName.clone(), &lt::string("."), &lt::str_concat(&lt::get_var("quote"), &lt::str_concat(&lt::string("."), &lt::get_var("quote"))));
          return lt::str_concat(&lt::get_var("quote"), &lt::str_concat(&qualifiedName.clone(), &lt::get_var("quote")));
          lt::null()
        });
        lt::def_fn("literalOf", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("arg", __args[0].clone())]);
          let mut outLiteral = lt::string("");
          if (lt::truthy(&lt::has(&lt::get_var("arg"), &lt::string("string")))) {
            outLiteral = lt::str_concat(&lt::string("'"), &lt::str_concat(&lt::replace(&lt::call_fn("asString", &[lt::get_var("arg")]), &lt::string("'"), &lt::string("''")), &lt::string("'")));
          }
          else if (lt::truthy(&lt::has(&lt::get_var("arg"), &lt::string("number")))) {
            outLiteral = lt::to_string(&lt::get_key(&lt::get_key(&lt::get_var("arg"), &lt::string("number")), &lt::string("value")));
          }
          else if (lt::truthy(&lt::has(&lt::get_var("arg"), &lt::string("boolean")))) {
            if (lt::truthy(&lt::get_key(&lt::get_key(&lt::get_var("arg"), &lt::string("boolean")), &lt::string("value")))) {
              outLiteral = lt::string("TRUE");
            }
            else {
              outLiteral = lt::string("FALSE");
            }
          }
          else {
            outLiteral = lt::string("NULL");
          }
          return outLiteral.clone();
          lt::null()
        });
        lt::def_fn("opOf", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("n", __args[0].clone())]);
          let mut o = lt::string("");
          if (lt::value_equals(&lt::get_var("n"), &lt::string("eq"))) {
            o = lt::string("=");
          }
          else if (lt::value_equals(&lt::get_var("n"), &lt::string("gt"))) {
            o = lt::string(">");
          }
          else if (lt::value_equals(&lt::get_var("n"), &lt::string("gte"))) {
            o = lt::string(">=");
          }
          else if (lt::value_equals(&lt::get_var("n"), &lt::string("lt"))) {
            o = lt::string("<");
          }
          else if (lt::value_equals(&lt::get_var("n"), &lt::string("lte"))) {
            o = lt::string("<=");
          }
          else if (lt::value_equals(&lt::get_var("n"), &lt::string("like"))) {
            o = lt::string("LIKE");
          }
          else if (lt::value_equals(&lt::get_var("n"), &lt::string("ilike"))) {
            if (lt::value_equals(&lt::get_var("dialect"), &lt::string("postgres"))) {
              o = lt::string("ILIKE");
            }
            else {
              o = lt::string("LIKE");
            }
          }
          return o.clone();
          lt::null()
        });
        lt::def_fn("itemsOf", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("arg", __args[0].clone())]);
          if (lt::truthy(&lt::has(&lt::get_var("arg"), &lt::string("array")))) {
            return lt::get_key(&lt::get_key(&lt::get_var("arg"), &lt::string("array")), &lt::string("value"));
          }
          return lt::append(&lt::array(vec![]), &lt::get_var("arg"));
          lt::null()
        });
        lt::def_fn("isRef", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("chainValues", __args[0].clone())]);
          lt::set_var("tmpRef", lt::string(""));
          if (lt::value_equals(&lt::len(&lt::get_var("chainValues")), &lt::number(1)) && lt::truthy(&lt::has(&lt::index(&lt::get_var("chainValues"), &lt::number(0)), &lt::string("functionCall")))) {
            let mut firstName = lt::get(&lt::get(&lt::index(&lt::get_var("chainValues"), &lt::number(0)), "functionCall"), "name");
            if (lt::value_equals(&firstName.clone(), &lt::string("col")) || lt::value_equals(&firstName.clone(), &lt::string("table"))) {
              lt::set_var("tmpRef", lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::index(&lt::get_var("chainValues"), &lt::number(0)), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]));
            }
          }
          return lt::get_var("tmpRef");
          lt::null()
        });
        lt::def_fn("emitParam", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("arg", __args[0].clone())]);
          lt::set_var("params", lt::list_push(lt::get_var("params"), lt::get_var("arg")));
          if (lt::value_equals(&lt::get_var("dialect"), &lt::string("postgres"))) {
            lt::set_var("tmp", lt::str_concat(&lt::string("$"), &lt::to_string(&lt::list_len(&lt::get_var("params")))));
          }
          else {
            lt::set_var("tmp", lt::string("?"));
          }
          lt::call_fn("pushSql", &[lt::get_var("tmp")]);
          lt::set_var("tmp2", lt::call_fn("literalOf", &[lt::get_var("arg")]));
          lt::call_fn("pushW", &[lt::get_var("tmp2")]);
          return lt::null();
          lt::null()
        });
        lt::def_fn("emitIdent", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("name", __args[0].clone())]);
          lt::set_var("tmp", lt::call_fn("identStr", &[lt::get_var("name")]));
          lt::call_fn("pushSql", &[lt::get_var("tmp")]);
          lt::call_fn("pushW", &[lt::get_var("tmp")]);
          return lt::null();
          lt::null()
        });
        lt::def_fn("emitRaw", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("node", __args[0].clone())]);
          if (!lt::value_equals(&lt::buf_len(&lt::get_var("sql")), &lt::number(0))) {
            lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(" ")));
            lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(" ")));
          }
          for __lt_item_rawArg in lt::array_items(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments")) {
            let __lt_scope_rawArg = lt::scope(&[("rawArg", __lt_item_rawArg)]);
            let mut rawVal = lt::get_key(&lt::get_var("rawArg"), &lt::string("argument"));
            if (lt::truthy(&lt::has(&rawVal.clone(), &lt::string("string")))) {
              lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::call_fn("asString", &[rawVal.clone()])));
              lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::call_fn("asString", &[rawVal.clone()])));
            }
            else if (lt::truthy(&lt::has(&rawVal.clone(), &lt::string("chain")))) {
              lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&rawVal.clone(), "chain"), "values")]));
              if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::call_fn("identStr", &[lt::get_var("tmpRef")])));
                lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::call_fn("identStr", &[lt::get_var("tmpRef")])));
              }
              else {
                lt::set_var("params", lt::list_push(lt::get_var("params"), rawVal.clone()));
                if (lt::value_equals(&lt::get_var("dialect"), &lt::string("postgres"))) {
                  lt::set_var("tmp", lt::str_concat(&lt::string("$"), &lt::to_string(&lt::list_len(&lt::get_var("params")))));
                }
                else {
                  lt::set_var("tmp", lt::string("?"));
                }
                lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::get_var("tmp")));
                lt::set_var("tmp2", lt::call_fn("literalOf", &[rawVal.clone()]));
                lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::get_var("tmp2")));
              }
            }
            else {
              lt::set_var("params", lt::list_push(lt::get_var("params"), rawVal.clone()));
              if (lt::value_equals(&lt::get_var("dialect"), &lt::string("postgres"))) {
                lt::set_var("tmp", lt::str_concat(&lt::string("$"), &lt::to_string(&lt::list_len(&lt::get_var("params")))));
              }
              else {
                lt::set_var("tmp", lt::string("?"));
              }
              lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::get_var("tmp")));
              lt::set_var("tmp2", lt::call_fn("literalOf", &[rawVal.clone()]));
              lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::get_var("tmp2")));
            }
          }
          return lt::null();
          lt::null()
        });
        lt::def_fn("conflictTarget", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("arg", __args[0].clone())]);
          let mut ct = lt::string("()");
          if (lt::truthy(&lt::has(&lt::get_var("arg"), &lt::string("chain")))) {
            lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("arg"), "chain"), "values")]));
            if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
              ct = lt::str_concat(&lt::string("("), &lt::str_concat(&lt::call_fn("identStr", &[lt::get_var("tmpRef")]), &lt::string(")")));
            }
          }
          else if (lt::truthy(&lt::has(&lt::get_var("arg"), &lt::string("string")))) {
            ct = lt::str_concat(&lt::string("("), &lt::str_concat(&lt::call_fn("identStr", &[lt::call_fn("asString", &[lt::get_var("arg")])]), &lt::string(")")));
          }
          return ct.clone();
          lt::null()
        });
        lt::def_fn("firstKind", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("chainValues", __args[0].clone())]);
          let mut kind = lt::string("");
          if (!lt::value_equals(&lt::len(&lt::get_var("chainValues")), &lt::number(0)) && lt::truthy(&lt::has(&lt::index(&lt::get_var("chainValues"), &lt::number(0)), &lt::string("functionCall")))) {
            kind = lt::call_fn("normName", &[lt::get(&lt::get(&lt::index(&lt::get_var("chainValues"), &lt::number(0)), "functionCall"), "name")]);
          }
          return kind.clone();
          lt::null()
        });
        lt::def_fn("emitOrderItem", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("item", __args[0].clone())]);
          let mut dir = lt::string("");
          let mut ordName = lt::string("");
          if (lt::truthy(&lt::has(&lt::get_var("item"), &lt::string("chain")))) {
            for __lt_item_on in lt::array_items(&lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")) {
              let __lt_scope_on = lt::scope(&[("on", __lt_item_on)]);
              let mut onn = lt::call_fn("normName", &[lt::get(&lt::get(&lt::get_var("on"), "functionCall"), "name")]);
              if (lt::value_equals(&onn.clone(), &lt::string("asc"))) {
                dir = lt::string(" ASC");
              }
              else if (lt::value_equals(&onn.clone(), &lt::string("desc"))) {
                dir = lt::string(" DESC");
              }
              else if (lt::value_equals(&onn.clone(), &lt::string("col")) || lt::value_equals(&onn.clone(), &lt::string("table"))) {
                ordName = lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("on"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
              }
            }
          }
          if (!lt::value_equals(&ordName.clone(), &lt::string(""))) {
            lt::set_var("tmp", lt::call_fn("identStr", &[ordName.clone()]));
            lt::set_var("orderSql", lt::str_concat(&lt::get_var("orderSql"), &lt::str_concat(&lt::get_var("tmp"), &dir.clone())));
            lt::set_var("orderW", lt::str_concat(&lt::get_var("orderW"), &lt::str_concat(&lt::get_var("tmp"), &dir.clone())));
          }
          return lt::null();
          lt::null()
        });
        lt::def_fn("emitOrderList", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("arg", __args[0].clone())]);
          let mut firstOrder = lt::boolean(true);
          for __lt_item_item in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_var("arg")])) {
            let __lt_scope_item = lt::scope(&[("item", __lt_item_item)]);
            if (lt::value_equals(&firstOrder.clone(), &lt::boolean(false))) {
              lt::set_var("orderSql", lt::str_concat(&lt::get_var("orderSql"), &lt::string(", ")));
              lt::set_var("orderW", lt::str_concat(&lt::get_var("orderW"), &lt::string(", ")));
            }
            firstOrder = lt::boolean(false);
            lt::call_fn("emitOrderItem", &[lt::get_var("item")]);
          }
          return lt::null();
          lt::null()
        });
        lt::def_fn("flushOrder", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[]);
          if (lt::truthy(&lt::get_var("hasOrder"))) {
            lt::call_fn("pushSql", &[lt::string("ORDER")]);
            lt::call_fn("pushSql", &[lt::string("BY")]);
            lt::call_fn("pushW", &[lt::string("ORDER")]);
            lt::call_fn("pushW", &[lt::string("BY")]);
            lt::set_var("tmp", lt::get_var("orderSql"));
            if (!lt::value_equals(&lt::get_var("tmp"), &lt::string(""))) {
              lt::call_fn("pushSql", &[lt::get_var("tmp")]);
            }
            lt::set_var("tmp2", lt::get_var("orderW"));
            if (!lt::value_equals(&lt::get_var("tmp2"), &lt::string(""))) {
              lt::call_fn("pushW", &[lt::get_var("tmp2")]);
            }
            lt::set_var("hasOrder", lt::boolean(false));
          }
          return lt::null();
          lt::null()
        });
        for __lt_item_dialectNode in lt::array_items(&lt::get(&lt::get(&lt::get(&lt::get(&lt::get_var("root"), "schema"), "chain"), "chain"), "values")) {
          let __lt_scope_dialectNode = lt::scope(&[("dialectNode", __lt_item_dialectNode)]);
          if (lt::value_equals(&lt::call_fn("normName", &[lt::get(&lt::get(&lt::get_var("dialectNode"), "functionCall"), "name")]), &lt::string("setdialect"))) {
            lt::set_var("dialect", lt::get_key(&lt::get_key(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("dialectNode"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("string")), &lt::string("value")));
          }
        }
        if (lt::value_equals(&lt::get_var("dialect"), &lt::string(""))) {
          panic!("{}", lt::as_string(&lt::string("sql-builder parse: setDialect(...) must be called before parse()")));
        }
        else if (!lt::value_equals(&lt::get_var("dialect"), &lt::string("postgres")) && !lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
          panic!("{}", lt::as_string(&lt::str_concat(&lt::string("sql-builder parse: unsupported dialect "), &lt::get_var("dialect"))));
        }
        if (lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
          lt::set_var("quote", lt::string("`"));
        }
        else {
          lt::set_var("quote", lt::string("\""));
        }
        lt::def_fn("renderNodes", move |__args: &[lt::Value]| -> lt::Value {
          let __scope = lt::scope(&[("nodes", __args[0].clone()), ("mode", __args[1].clone())]);
          let mut savedSql = lt::string("");
          let mut savedW = lt::string("");
          let mut savedOrderSql = lt::string("");
          let mut savedOrderW = lt::string("");
          let mut savedHasOrder = lt::boolean(false);
          let mut savedAlias = lt::string("");
          let mut subSql = lt::string("");
          let mut subW = lt::string("");
          let mut subAliasText = lt::string("");
          let mut first = lt::boolean(true);
          let mut left = lt::string("");
          let mut hasLeft = lt::boolean(false);
          let mut base = lt::string("");
          if (lt::value_equals(&lt::get_var("mode"), &lt::number(0))) {
            for __lt_item_node in lt::array_items(&lt::get_var("nodes")) {
              let __lt_scope_node = lt::scope(&[("node", __lt_item_node)]);
              if (lt::truthy(&lt::has(&lt::get_var("node"), &lt::string("functionCall")))) {
                let mut name = lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "name");
                let mut nameNorm = lt::call_fn("normName", &[name.clone()]);
                if (lt::value_equals(&nameNorm.clone(), &lt::string("setdialect"))) {
                  continue;
                }
                else if (lt::value_equals(&nameNorm.clone(), &lt::string("asc")) || lt::value_equals(&nameNorm.clone(), &lt::string("desc"))) {
                  if (lt::truthy(&lt::get_var("hasOrder"))) {
                    lt::set_var("tmp", lt::to_upper(&nameNorm.clone()));
                    lt::set_var("orderSql", lt::str_concat(&lt::get_var("orderSql"), &lt::str_concat(&lt::string(" "), &lt::get_var("tmp"))));
                    lt::set_var("orderW", lt::str_concat(&lt::get_var("orderW"), &lt::str_concat(&lt::string(" "), &lt::get_var("tmp"))));
                  }
                }
                else {
                  if (lt::value_equals(&nameNorm.clone(), &lt::string("with"))) {
                    savedSql = lt::get_var("sql");
                    savedW = lt::get_var("wsql");
                    savedOrderSql = lt::get_var("orderSql");
                    savedOrderW = lt::get_var("orderW");
                    savedHasOrder = lt::get_var("hasOrder");
                    lt::set_var("sql", lt::buf_new());
                    lt::set_var("wsql", lt::buf_new());
                    lt::set_var("orderSql", lt::string(""));
                    lt::set_var("orderW", lt::string(""));
                    lt::set_var("hasOrder", lt::boolean(false));
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                    subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                    subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                    lt::set_var("sql", savedSql.clone());
                    lt::set_var("wsql", savedW.clone());
                    lt::set_var("orderSql", savedOrderSql.clone());
                    lt::set_var("orderW", savedOrderW.clone());
                    lt::set_var("hasOrder", savedHasOrder.clone());
                    if (lt::value_equals(&lt::get_var("withFirst"), &lt::boolean(false))) {
                      lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                      lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                    }
                    else {
                      lt::set_var("withFirst", lt::boolean(false));
                      lt::call_fn("pushSql", &[lt::string("WITH")]);
                      lt::call_fn("pushW", &[lt::string("WITH")]);
                    }
                    lt::call_fn("pushSql", &[lt::call_fn("identStr", &[lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument"))])])]);
                    lt::call_fn("pushW", &[lt::call_fn("identStr", &[lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument"))])])]);
                    lt::call_fn("pushSql", &[lt::string("AS")]);
                    lt::call_fn("pushW", &[lt::string("AS")]);
                    lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                    lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("transaction"))) {
                    lt::call_fn("pushSql", &[lt::string("BEGIN")]);
                    lt::call_fn("pushW", &[lt::string("BEGIN")]);
                    lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(";")));
                    lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(";")));
                    let mut txnFirst = lt::boolean(true);
                    for __lt_item_txnItem in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])) {
                      let __lt_scope_txnItem = lt::scope(&[("txnItem", __lt_item_txnItem)]);
                      if (lt::value_equals(&txnFirst.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(";")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(";")));
                      }
                      txnFirst = lt::boolean(false);
                      if (lt::truthy(&lt::has(&lt::get_var("txnItem"), &lt::string("chain")))) {
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values"), lt::number(0)]);
                      }
                      else if (lt::truthy(&lt::has(&lt::get_var("txnItem"), &lt::string("string")))) {
                        lt::call_fn("pushSql", &[lt::call_fn("asString", &[lt::get_var("txnItem")])]);
                        lt::call_fn("pushW", &[lt::call_fn("asString", &[lt::get_var("txnItem")])]);
                      }
                      else {
                        if (lt::truthy(&lt::has(&lt::get_var("txnItem"), &lt::string("chain")))) {
                          lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values")]));
                          if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                            lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                          }
                          else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values")]), &lt::string("delete")))))) {
                            savedSql = lt::get_var("sql");
                            savedW = lt::get_var("wsql");
                            savedOrderSql = lt::get_var("orderSql");
                            savedOrderW = lt::get_var("orderW");
                            savedHasOrder = lt::get_var("hasOrder");
                            savedAlias = lt::get_var("subAlias");
                            lt::set_var("sql", lt::buf_new());
                            lt::set_var("wsql", lt::buf_new());
                            lt::set_var("orderSql", lt::string(""));
                            lt::set_var("orderW", lt::string(""));
                            lt::set_var("hasOrder", lt::boolean(false));
                            lt::set_var("subAlias", lt::string(""));
                            lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("txnItem"), "chain"), "values"), lt::number(0)]);
                            subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                            subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                            subAliasText = lt::get_var("subAlias");
                            lt::set_var("sql", savedSql.clone());
                            lt::set_var("wsql", savedW.clone());
                            lt::set_var("orderSql", savedOrderSql.clone());
                            lt::set_var("orderW", savedOrderW.clone());
                            lt::set_var("hasOrder", savedHasOrder.clone());
                            lt::set_var("subAlias", savedAlias.clone());
                            lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                            lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                            if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                              lt::call_fn("pushSql", &[subAliasText.clone()]);
                              lt::call_fn("pushW", &[subAliasText.clone()]);
                            }
                          }
                          else {
                            lt::call_fn("emitParam", &[lt::get_var("txnItem")]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_var("txnItem")]);
                        }
                      }
                    }
                    if (lt::value_equals(&txnFirst.clone(), &lt::boolean(false))) {
                      lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(";")));
                      lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(";")));
                    }
                    lt::call_fn("pushSql", &[lt::string("COMMIT")]);
                    lt::call_fn("pushW", &[lt::string("COMMIT")]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("select"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("SELECT")]);
                    lt::call_fn("pushW", &[lt::string("SELECT")]);
                    let mut firstItem = lt::boolean(true);
                    for __lt_item_item in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])) {
                      let __lt_scope_item = lt::scope(&[("item", __lt_item_item)]);
                      if (lt::value_equals(&firstItem.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                      }
                      firstItem = lt::boolean(false);
                      if (lt::truthy(&lt::has(&lt::get_var("item"), &lt::string("chain")))) {
                        lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]));
                        if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                          lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                        }
                        else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("delete")))))) {
                          savedSql = lt::get_var("sql");
                          savedW = lt::get_var("wsql");
                          savedOrderSql = lt::get_var("orderSql");
                          savedOrderW = lt::get_var("orderW");
                          savedHasOrder = lt::get_var("hasOrder");
                          savedAlias = lt::get_var("subAlias");
                          lt::set_var("sql", lt::buf_new());
                          lt::set_var("wsql", lt::buf_new());
                          lt::set_var("orderSql", lt::string(""));
                          lt::set_var("orderW", lt::string(""));
                          lt::set_var("hasOrder", lt::boolean(false));
                          lt::set_var("subAlias", lt::string(""));
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values"), lt::number(0)]);
                          subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                          subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                          subAliasText = lt::get_var("subAlias");
                          lt::set_var("sql", savedSql.clone());
                          lt::set_var("wsql", savedW.clone());
                          lt::set_var("orderSql", savedOrderSql.clone());
                          lt::set_var("orderW", savedOrderW.clone());
                          lt::set_var("hasOrder", savedHasOrder.clone());
                          lt::set_var("subAlias", savedAlias.clone());
                          lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                          lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                          if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                            lt::call_fn("pushSql", &[subAliasText.clone()]);
                            lt::call_fn("pushW", &[subAliasText.clone()]);
                          }
                        }
                        else {
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values"), lt::number(1)]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_var("item")]);
                      }
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("from"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("FROM")]);
                    lt::call_fn("pushW", &[lt::string("FROM")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("join"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("JOIN")]);
                    lt::call_fn("pushW", &[lt::string("JOIN")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                    lt::call_fn("pushSql", &[lt::string("ON")]);
                    lt::call_fn("pushW", &[lt::string("ON")]);
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("leftjoin"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("LEFT JOIN")]);
                    lt::call_fn("pushW", &[lt::string("LEFT JOIN")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                    lt::call_fn("pushSql", &[lt::string("ON")]);
                    lt::call_fn("pushW", &[lt::string("ON")]);
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("rightjoin"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("RIGHT JOIN")]);
                    lt::call_fn("pushW", &[lt::string("RIGHT JOIN")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                    lt::call_fn("pushSql", &[lt::string("ON")]);
                    lt::call_fn("pushW", &[lt::string("ON")]);
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("innerjoin"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("INNER JOIN")]);
                    lt::call_fn("pushW", &[lt::string("INNER JOIN")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                    lt::call_fn("pushSql", &[lt::string("ON")]);
                    lt::call_fn("pushW", &[lt::string("ON")]);
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("fulljoin"))) {
                    if (lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
                      panic!("{}", lt::as_string(&lt::string("sql-builder parse: FULL JOIN is not supported by mysql")));
                    }
                    else {
                      lt::call_fn("flushOrder", &[]);
                      lt::call_fn("pushSql", &[lt::string("FULL JOIN")]);
                      lt::call_fn("pushW", &[lt::string("FULL JOIN")]);
                      if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                        lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                        if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                          lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                        }
                        else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                          savedSql = lt::get_var("sql");
                          savedW = lt::get_var("wsql");
                          savedOrderSql = lt::get_var("orderSql");
                          savedOrderW = lt::get_var("orderW");
                          savedHasOrder = lt::get_var("hasOrder");
                          savedAlias = lt::get_var("subAlias");
                          lt::set_var("sql", lt::buf_new());
                          lt::set_var("wsql", lt::buf_new());
                          lt::set_var("orderSql", lt::string(""));
                          lt::set_var("orderW", lt::string(""));
                          lt::set_var("hasOrder", lt::boolean(false));
                          lt::set_var("subAlias", lt::string(""));
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                          subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                          subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                          subAliasText = lt::get_var("subAlias");
                          lt::set_var("sql", savedSql.clone());
                          lt::set_var("wsql", savedW.clone());
                          lt::set_var("orderSql", savedOrderSql.clone());
                          lt::set_var("orderW", savedOrderW.clone());
                          lt::set_var("hasOrder", savedHasOrder.clone());
                          lt::set_var("subAlias", savedAlias.clone());
                          lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                          lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                          if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                            lt::call_fn("pushSql", &[subAliasText.clone()]);
                            lt::call_fn("pushW", &[subAliasText.clone()]);
                          }
                        }
                        else {
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                      }
                      lt::call_fn("pushSql", &[lt::string("ON")]);
                      lt::call_fn("pushW", &[lt::string("ON")]);
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("crossjoin"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("CROSS JOIN")]);
                    lt::call_fn("pushW", &[lt::string("CROSS JOIN")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                    lt::call_fn("pushSql", &[lt::string("ON")]);
                    lt::call_fn("pushW", &[lt::string("ON")]);
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("where"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("WHERE")]);
                    lt::call_fn("pushW", &[lt::string("WHERE")]);
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("groupby"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("GROUP BY")]);
                    lt::call_fn("pushW", &[lt::string("GROUP BY")]);
                    let mut firstItem = lt::boolean(true);
                    for __lt_item_item in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])) {
                      let __lt_scope_item = lt::scope(&[("item", __lt_item_item)]);
                      if (lt::value_equals(&firstItem.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                      }
                      firstItem = lt::boolean(false);
                      if (lt::truthy(&lt::has(&lt::get_var("item"), &lt::string("chain")))) {
                        lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]));
                        if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                          lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                        }
                        else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("delete")))))) {
                          savedSql = lt::get_var("sql");
                          savedW = lt::get_var("wsql");
                          savedOrderSql = lt::get_var("orderSql");
                          savedOrderW = lt::get_var("orderW");
                          savedHasOrder = lt::get_var("hasOrder");
                          savedAlias = lt::get_var("subAlias");
                          lt::set_var("sql", lt::buf_new());
                          lt::set_var("wsql", lt::buf_new());
                          lt::set_var("orderSql", lt::string(""));
                          lt::set_var("orderW", lt::string(""));
                          lt::set_var("hasOrder", lt::boolean(false));
                          lt::set_var("subAlias", lt::string(""));
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values"), lt::number(0)]);
                          subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                          subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                          subAliasText = lt::get_var("subAlias");
                          lt::set_var("sql", savedSql.clone());
                          lt::set_var("wsql", savedW.clone());
                          lt::set_var("orderSql", savedOrderSql.clone());
                          lt::set_var("orderW", savedOrderW.clone());
                          lt::set_var("hasOrder", savedHasOrder.clone());
                          lt::set_var("subAlias", savedAlias.clone());
                          lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                          lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                          if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                            lt::call_fn("pushSql", &[subAliasText.clone()]);
                            lt::call_fn("pushW", &[subAliasText.clone()]);
                          }
                        }
                        else {
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values"), lt::number(1)]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_var("item")]);
                      }
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("having"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("HAVING")]);
                    lt::call_fn("pushW", &[lt::string("HAVING")]);
                    lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("returning"))) {
                    if (lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
                      panic!("{}", lt::as_string(&lt::string("sql-builder parse: RETURNING is not supported by mysql")));
                    }
                    else {
                      lt::call_fn("flushOrder", &[]);
                      lt::call_fn("pushSql", &[lt::string("RETURNING")]);
                      lt::call_fn("pushW", &[lt::string("RETURNING")]);
                      let mut firstItem = lt::boolean(true);
                      for __lt_item_item in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])) {
                        let __lt_scope_item = lt::scope(&[("item", __lt_item_item)]);
                        if (lt::value_equals(&firstItem.clone(), &lt::boolean(false))) {
                          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                        }
                        firstItem = lt::boolean(false);
                        if (lt::truthy(&lt::has(&lt::get_var("item"), &lt::string("chain")))) {
                          lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]));
                          if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                            lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                          }
                          else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values")]), &lt::string("delete")))))) {
                            savedSql = lt::get_var("sql");
                            savedW = lt::get_var("wsql");
                            savedOrderSql = lt::get_var("orderSql");
                            savedOrderW = lt::get_var("orderW");
                            savedHasOrder = lt::get_var("hasOrder");
                            savedAlias = lt::get_var("subAlias");
                            lt::set_var("sql", lt::buf_new());
                            lt::set_var("wsql", lt::buf_new());
                            lt::set_var("orderSql", lt::string(""));
                            lt::set_var("orderW", lt::string(""));
                            lt::set_var("hasOrder", lt::boolean(false));
                            lt::set_var("subAlias", lt::string(""));
                            lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values"), lt::number(0)]);
                            subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                            subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                            subAliasText = lt::get_var("subAlias");
                            lt::set_var("sql", savedSql.clone());
                            lt::set_var("wsql", savedW.clone());
                            lt::set_var("orderSql", savedOrderSql.clone());
                            lt::set_var("orderW", savedOrderW.clone());
                            lt::set_var("hasOrder", savedHasOrder.clone());
                            lt::set_var("subAlias", savedAlias.clone());
                            lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                            lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                            if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                              lt::call_fn("pushSql", &[subAliasText.clone()]);
                              lt::call_fn("pushW", &[subAliasText.clone()]);
                            }
                          }
                          else {
                            lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("item"), "chain"), "values"), lt::number(1)]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_var("item")]);
                        }
                      }
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("orderby"))) {
                    lt::set_var("hasOrder", lt::boolean(true));
                    lt::set_var("orderSql", lt::string(""));
                    lt::set_var("orderW", lt::string(""));
                    lt::call_fn("emitOrderList", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("limit"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("LIMIT")]);
                    lt::call_fn("pushW", &[lt::string("LIMIT")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("offset"))) {
                    lt::call_fn("flushOrder", &[]);
                    lt::call_fn("pushSql", &[lt::string("OFFSET")]);
                    lt::call_fn("pushW", &[lt::string("OFFSET")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("raw"))) {
                    lt::call_fn("emitRaw", &[lt::get_var("node")]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("as"))) {
                    lt::set_var("subAlias", lt::str_concat(&lt::string("AS "), &lt::call_fn("identStr", &[lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])])));
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("update"))) {
                    lt::call_fn("pushSql", &[lt::string("UPDATE")]);
                    lt::call_fn("pushW", &[lt::string("UPDATE")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                    lt::call_fn("pushSql", &[lt::string("SET")]);
                    lt::call_fn("pushW", &[lt::string("SET")]);
                    let mut assnFirst = lt::boolean(true);
                    for __lt_item_ak in lt::array_items(&lt::keys(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"))) {
                      let __lt_scope_ak = lt::scope(&[("ak", __lt_item_ak)]);
                      if (lt::value_equals(&assnFirst.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                      }
                      assnFirst = lt::boolean(false);
                      lt::call_fn("pushSql", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                      lt::call_fn("pushW", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                      lt::call_fn("pushSql", &[lt::string("=")]);
                      lt::call_fn("pushW", &[lt::string("=")]);
                      if (lt::truthy(&lt::has(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), &lt::string("chain")))) {
                        lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]));
                        if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                          lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                        }
                        else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("delete")))))) {
                          savedSql = lt::get_var("sql");
                          savedW = lt::get_var("wsql");
                          savedOrderSql = lt::get_var("orderSql");
                          savedOrderW = lt::get_var("orderW");
                          savedHasOrder = lt::get_var("hasOrder");
                          savedAlias = lt::get_var("subAlias");
                          lt::set_var("sql", lt::buf_new());
                          lt::set_var("wsql", lt::buf_new());
                          lt::set_var("orderSql", lt::string(""));
                          lt::set_var("orderW", lt::string(""));
                          lt::set_var("hasOrder", lt::boolean(false));
                          lt::set_var("subAlias", lt::string(""));
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values"), lt::number(0)]);
                          subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                          subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                          subAliasText = lt::get_var("subAlias");
                          lt::set_var("sql", savedSql.clone());
                          lt::set_var("wsql", savedW.clone());
                          lt::set_var("orderSql", savedOrderSql.clone());
                          lt::set_var("orderW", savedOrderW.clone());
                          lt::set_var("hasOrder", savedHasOrder.clone());
                          lt::set_var("subAlias", savedAlias.clone());
                          lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                          lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                          if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                            lt::call_fn("pushSql", &[subAliasText.clone()]);
                            lt::call_fn("pushW", &[subAliasText.clone()]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                      }
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("insert"))) {
                    lt::call_fn("pushSql", &[lt::string("INSERT")]);
                    lt::call_fn("pushW", &[lt::string("INSERT")]);
                    lt::call_fn("pushSql", &[lt::string("INTO")]);
                    lt::call_fn("pushW", &[lt::string("INTO")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                    lt::call_fn("pushSql", &[lt::string("(")]);
                    lt::call_fn("pushW", &[lt::string("(")]);
                    let mut colFirst = lt::boolean(true);
                    for __lt_item_ck in lt::array_items(&lt::keys(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"))) {
                      let __lt_scope_ck = lt::scope(&[("ck", __lt_item_ck)]);
                      if (lt::value_equals(&colFirst.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                      }
                      colFirst = lt::boolean(false);
                      lt::call_fn("pushSql", &[lt::call_fn("identStr", &[lt::get_var("ck")])]);
                      lt::call_fn("pushW", &[lt::call_fn("identStr", &[lt::get_var("ck")])]);
                    }
                    lt::call_fn("pushSql", &[lt::string(")")]);
                    lt::call_fn("pushW", &[lt::string(")")]);
                    lt::call_fn("pushSql", &[lt::string("VALUES")]);
                    lt::call_fn("pushW", &[lt::string("VALUES")]);
                    lt::call_fn("pushSql", &[lt::string("(")]);
                    lt::call_fn("pushW", &[lt::string("(")]);
                    let mut valFirst = lt::boolean(true);
                    for __lt_item_vk in lt::array_items(&lt::keys(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"))) {
                      let __lt_scope_vk = lt::scope(&[("vk", __lt_item_vk)]);
                      if (lt::value_equals(&valFirst.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                      }
                      valFirst = lt::boolean(false);
                      if (lt::truthy(&lt::has(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), &lt::string("chain")))) {
                        lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values")]));
                        if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                          lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                        }
                        else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values")]), &lt::string("delete")))))) {
                          savedSql = lt::get_var("sql");
                          savedW = lt::get_var("wsql");
                          savedOrderSql = lt::get_var("orderSql");
                          savedOrderW = lt::get_var("orderW");
                          savedHasOrder = lt::get_var("hasOrder");
                          savedAlias = lt::get_var("subAlias");
                          lt::set_var("sql", lt::buf_new());
                          lt::set_var("wsql", lt::buf_new());
                          lt::set_var("orderSql", lt::string(""));
                          lt::set_var("orderW", lt::string(""));
                          lt::set_var("hasOrder", lt::boolean(false));
                          lt::set_var("subAlias", lt::string(""));
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk")), "chain"), "values"), lt::number(0)]);
                          subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                          subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                          subAliasText = lt::get_var("subAlias");
                          lt::set_var("sql", savedSql.clone());
                          lt::set_var("wsql", savedW.clone());
                          lt::set_var("orderSql", savedOrderSql.clone());
                          lt::set_var("orderW", savedOrderW.clone());
                          lt::set_var("hasOrder", savedHasOrder.clone());
                          lt::set_var("subAlias", savedAlias.clone());
                          lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                          lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                          if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                            lt::call_fn("pushSql", &[subAliasText.clone()]);
                            lt::call_fn("pushW", &[subAliasText.clone()]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk"))]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("vk"))]);
                      }
                    }
                    lt::call_fn("pushSql", &[lt::string(")")]);
                    lt::call_fn("pushW", &[lt::string(")")]);
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("delete"))) {
                    lt::call_fn("pushSql", &[lt::string("DELETE")]);
                    lt::call_fn("pushW", &[lt::string("DELETE")]);
                    lt::call_fn("pushSql", &[lt::string("FROM")]);
                    lt::call_fn("pushW", &[lt::string("FROM")]);
                    if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                      lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                      if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                        lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                      }
                      else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                        savedSql = lt::get_var("sql");
                        savedW = lt::get_var("wsql");
                        savedOrderSql = lt::get_var("orderSql");
                        savedOrderW = lt::get_var("orderW");
                        savedHasOrder = lt::get_var("hasOrder");
                        savedAlias = lt::get_var("subAlias");
                        lt::set_var("sql", lt::buf_new());
                        lt::set_var("wsql", lt::buf_new());
                        lt::set_var("orderSql", lt::string(""));
                        lt::set_var("orderW", lt::string(""));
                        lt::set_var("hasOrder", lt::boolean(false));
                        lt::set_var("subAlias", lt::string(""));
                        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                        subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                        subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                        subAliasText = lt::get_var("subAlias");
                        lt::set_var("sql", savedSql.clone());
                        lt::set_var("wsql", savedW.clone());
                        lt::set_var("orderSql", savedOrderSql.clone());
                        lt::set_var("orderW", savedOrderW.clone());
                        lt::set_var("hasOrder", savedHasOrder.clone());
                        lt::set_var("subAlias", savedAlias.clone());
                        lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                        lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                        if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                          lt::call_fn("pushSql", &[subAliasText.clone()]);
                          lt::call_fn("pushW", &[subAliasText.clone()]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("set"))) {
                    lt::call_fn("pushSql", &[lt::string("SET")]);
                    lt::call_fn("pushW", &[lt::string("SET")]);
                    let mut assnFirst = lt::boolean(true);
                    for __lt_item_ak in lt::array_items(&lt::keys(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"))) {
                      let __lt_scope_ak = lt::scope(&[("ak", __lt_item_ak)]);
                      if (lt::value_equals(&assnFirst.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                      }
                      assnFirst = lt::boolean(false);
                      lt::call_fn("pushSql", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                      lt::call_fn("pushW", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                      lt::call_fn("pushSql", &[lt::string("=")]);
                      lt::call_fn("pushW", &[lt::string("=")]);
                      if (lt::truthy(&lt::has(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), &lt::string("chain")))) {
                        lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]));
                        if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                          lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                        }
                        else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("delete")))))) {
                          savedSql = lt::get_var("sql");
                          savedW = lt::get_var("wsql");
                          savedOrderSql = lt::get_var("orderSql");
                          savedOrderW = lt::get_var("orderW");
                          savedHasOrder = lt::get_var("hasOrder");
                          savedAlias = lt::get_var("subAlias");
                          lt::set_var("sql", lt::buf_new());
                          lt::set_var("wsql", lt::buf_new());
                          lt::set_var("orderSql", lt::string(""));
                          lt::set_var("orderW", lt::string(""));
                          lt::set_var("hasOrder", lt::boolean(false));
                          lt::set_var("subAlias", lt::string(""));
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values"), lt::number(0)]);
                          subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                          subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                          subAliasText = lt::get_var("subAlias");
                          lt::set_var("sql", savedSql.clone());
                          lt::set_var("wsql", savedW.clone());
                          lt::set_var("orderSql", savedOrderSql.clone());
                          lt::set_var("orderW", savedOrderW.clone());
                          lt::set_var("hasOrder", savedHasOrder.clone());
                          lt::set_var("subAlias", savedAlias.clone());
                          lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                          lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                          if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                            lt::call_fn("pushSql", &[subAliasText.clone()]);
                            lt::call_fn("pushW", &[subAliasText.clone()]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                      }
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("values"))) {
                    lt::call_fn("pushSql", &[lt::string("VALUES")]);
                    lt::call_fn("pushW", &[lt::string("VALUES")]);
                    let mut valueRows = lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    let mut valueFirst = lt::boolean(true);
                    if (!lt::value_equals(&lt::len(&valueRows.clone()), &lt::number(0)) && lt::truthy(&lt::has(&lt::index(&valueRows.clone(), &lt::number(0)), &lt::string("array")))) {
                      for __lt_item_tuple in lt::array_items(&valueRows.clone()) {
                        let __lt_scope_tuple = lt::scope(&[("tuple", __lt_item_tuple)]);
                        if (lt::value_equals(&valueFirst.clone(), &lt::boolean(false))) {
                          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                        }
                        valueFirst = lt::boolean(false);
                        if (lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
                          lt::call_fn("pushSql", &[lt::string("ROW")]);
                          lt::call_fn("pushW", &[lt::string("ROW")]);
                        }
                        lt::call_fn("pushSql", &[lt::string("(")]);
                        lt::call_fn("pushW", &[lt::string("(")]);
                        let mut itemFirst = lt::boolean(true);
                        for __lt_item_ti in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_var("tuple")])) {
                          let __lt_scope_ti = lt::scope(&[("ti", __lt_item_ti)]);
                          if (lt::value_equals(&itemFirst.clone(), &lt::boolean(false))) {
                            lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                            lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                          }
                          itemFirst = lt::boolean(false);
                          if (lt::truthy(&lt::has(&lt::get_var("ti"), &lt::string("chain")))) {
                            lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]));
                            if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                              lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                            }
                            else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("delete")))))) {
                              savedSql = lt::get_var("sql");
                              savedW = lt::get_var("wsql");
                              savedOrderSql = lt::get_var("orderSql");
                              savedOrderW = lt::get_var("orderW");
                              savedHasOrder = lt::get_var("hasOrder");
                              savedAlias = lt::get_var("subAlias");
                              lt::set_var("sql", lt::buf_new());
                              lt::set_var("wsql", lt::buf_new());
                              lt::set_var("orderSql", lt::string(""));
                              lt::set_var("orderW", lt::string(""));
                              lt::set_var("hasOrder", lt::boolean(false));
                              lt::set_var("subAlias", lt::string(""));
                              lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values"), lt::number(0)]);
                              subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                              subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                              subAliasText = lt::get_var("subAlias");
                              lt::set_var("sql", savedSql.clone());
                              lt::set_var("wsql", savedW.clone());
                              lt::set_var("orderSql", savedOrderSql.clone());
                              lt::set_var("orderW", savedOrderW.clone());
                              lt::set_var("hasOrder", savedHasOrder.clone());
                              lt::set_var("subAlias", savedAlias.clone());
                              lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                              lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                              if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                                lt::call_fn("pushSql", &[subAliasText.clone()]);
                                lt::call_fn("pushW", &[subAliasText.clone()]);
                              }
                            }
                            else {
                              lt::call_fn("emitParam", &[lt::get_var("ti")]);
                            }
                          }
                          else {
                            lt::call_fn("emitParam", &[lt::get_var("ti")]);
                          }
                        }
                        lt::call_fn("pushSql", &[lt::string(")")]);
                        lt::call_fn("pushW", &[lt::string(")")]);
                      }
                    }
                    else {
                      if (lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
                        lt::call_fn("pushSql", &[lt::string("ROW")]);
                        lt::call_fn("pushW", &[lt::string("ROW")]);
                      }
                      lt::call_fn("pushSql", &[lt::string("(")]);
                      lt::call_fn("pushW", &[lt::string("(")]);
                      let mut itemFirst = lt::boolean(true);
                      for __lt_item_ti in lt::array_items(&valueRows.clone()) {
                        let __lt_scope_ti = lt::scope(&[("ti", __lt_item_ti)]);
                        if (lt::value_equals(&itemFirst.clone(), &lt::boolean(false))) {
                          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                        }
                        itemFirst = lt::boolean(false);
                        if (lt::truthy(&lt::has(&lt::get_var("ti"), &lt::string("chain")))) {
                          lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]));
                          if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                            lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                          }
                          else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values")]), &lt::string("delete")))))) {
                            savedSql = lt::get_var("sql");
                            savedW = lt::get_var("wsql");
                            savedOrderSql = lt::get_var("orderSql");
                            savedOrderW = lt::get_var("orderW");
                            savedHasOrder = lt::get_var("hasOrder");
                            savedAlias = lt::get_var("subAlias");
                            lt::set_var("sql", lt::buf_new());
                            lt::set_var("wsql", lt::buf_new());
                            lt::set_var("orderSql", lt::string(""));
                            lt::set_var("orderW", lt::string(""));
                            lt::set_var("hasOrder", lt::boolean(false));
                            lt::set_var("subAlias", lt::string(""));
                            lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("ti"), "chain"), "values"), lt::number(0)]);
                            subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                            subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                            subAliasText = lt::get_var("subAlias");
                            lt::set_var("sql", savedSql.clone());
                            lt::set_var("wsql", savedW.clone());
                            lt::set_var("orderSql", savedOrderSql.clone());
                            lt::set_var("orderW", savedOrderW.clone());
                            lt::set_var("hasOrder", savedHasOrder.clone());
                            lt::set_var("subAlias", savedAlias.clone());
                            lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                            lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                            if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                              lt::call_fn("pushSql", &[subAliasText.clone()]);
                              lt::call_fn("pushW", &[subAliasText.clone()]);
                            }
                          }
                          else {
                            lt::call_fn("emitParam", &[lt::get_var("ti")]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_var("ti")]);
                        }
                      }
                      lt::call_fn("pushSql", &[lt::string(")")]);
                      lt::call_fn("pushW", &[lt::string(")")]);
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("onconflictdonothing"))) {
                    if (lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
                      panic!("{}", lt::as_string(&lt::string("sql-builder parse: ON CONFLICT DO NOTHING is not supported by mysql")));
                    }
                    else {
                      lt::call_fn("pushSql", &[lt::string("ON")]);
                      lt::call_fn("pushW", &[lt::string("ON")]);
                      lt::call_fn("pushSql", &[lt::string("CONFLICT")]);
                      lt::call_fn("pushW", &[lt::string("CONFLICT")]);
                      lt::call_fn("pushSql", &[lt::call_fn("conflictTarget", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                      lt::call_fn("pushW", &[lt::call_fn("conflictTarget", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                      lt::call_fn("pushSql", &[lt::string("DO")]);
                      lt::call_fn("pushW", &[lt::string("DO")]);
                      lt::call_fn("pushSql", &[lt::string("NOTHING")]);
                      lt::call_fn("pushW", &[lt::string("NOTHING")]);
                    }
                  }
                  else if (lt::value_equals(&nameNorm.clone(), &lt::string("onconflictdoupdate"))) {
                    if (lt::value_equals(&lt::get_var("dialect"), &lt::string("mysql"))) {
                      lt::call_fn("pushSql", &[lt::string("ON")]);
                      lt::call_fn("pushW", &[lt::string("ON")]);
                      lt::call_fn("pushSql", &[lt::string("DUPLICATE")]);
                      lt::call_fn("pushW", &[lt::string("DUPLICATE")]);
                      lt::call_fn("pushSql", &[lt::string("KEY")]);
                      lt::call_fn("pushW", &[lt::string("KEY")]);
                      lt::call_fn("pushSql", &[lt::string("UPDATE")]);
                      lt::call_fn("pushW", &[lt::string("UPDATE")]);
                      let mut assnFirst = lt::boolean(true);
                      for __lt_item_ak in lt::array_items(&lt::keys(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"))) {
                        let __lt_scope_ak = lt::scope(&[("ak", __lt_item_ak)]);
                        if (lt::value_equals(&assnFirst.clone(), &lt::boolean(false))) {
                          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                        }
                        assnFirst = lt::boolean(false);
                        lt::call_fn("pushSql", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                        lt::call_fn("pushW", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                        lt::call_fn("pushSql", &[lt::string("=")]);
                        lt::call_fn("pushW", &[lt::string("=")]);
                        if (lt::truthy(&lt::has(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), &lt::string("chain")))) {
                          lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]));
                          if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                            lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                          }
                          else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("delete")))))) {
                            savedSql = lt::get_var("sql");
                            savedW = lt::get_var("wsql");
                            savedOrderSql = lt::get_var("orderSql");
                            savedOrderW = lt::get_var("orderW");
                            savedHasOrder = lt::get_var("hasOrder");
                            savedAlias = lt::get_var("subAlias");
                            lt::set_var("sql", lt::buf_new());
                            lt::set_var("wsql", lt::buf_new());
                            lt::set_var("orderSql", lt::string(""));
                            lt::set_var("orderW", lt::string(""));
                            lt::set_var("hasOrder", lt::boolean(false));
                            lt::set_var("subAlias", lt::string(""));
                            lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values"), lt::number(0)]);
                            subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                            subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                            subAliasText = lt::get_var("subAlias");
                            lt::set_var("sql", savedSql.clone());
                            lt::set_var("wsql", savedW.clone());
                            lt::set_var("orderSql", savedOrderSql.clone());
                            lt::set_var("orderW", savedOrderW.clone());
                            lt::set_var("hasOrder", savedHasOrder.clone());
                            lt::set_var("subAlias", savedAlias.clone());
                            lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                            lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                            if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                              lt::call_fn("pushSql", &[subAliasText.clone()]);
                              lt::call_fn("pushW", &[subAliasText.clone()]);
                            }
                          }
                          else {
                            lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                        }
                      }
                    }
                    else {
                      lt::call_fn("pushSql", &[lt::string("ON")]);
                      lt::call_fn("pushW", &[lt::string("ON")]);
                      lt::call_fn("pushSql", &[lt::string("CONFLICT")]);
                      lt::call_fn("pushW", &[lt::string("CONFLICT")]);
                      lt::call_fn("pushSql", &[lt::call_fn("conflictTarget", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                      lt::call_fn("pushW", &[lt::call_fn("conflictTarget", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                      lt::call_fn("pushSql", &[lt::string("DO")]);
                      lt::call_fn("pushW", &[lt::string("DO")]);
                      lt::call_fn("pushSql", &[lt::string("UPDATE")]);
                      lt::call_fn("pushW", &[lt::string("UPDATE")]);
                      lt::call_fn("pushSql", &[lt::string("SET")]);
                      lt::call_fn("pushW", &[lt::string("SET")]);
                      let mut assnFirst = lt::boolean(true);
                      for __lt_item_ak in lt::array_items(&lt::keys(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"))) {
                        let __lt_scope_ak = lt::scope(&[("ak", __lt_item_ak)]);
                        if (lt::value_equals(&assnFirst.clone(), &lt::boolean(false))) {
                          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                        }
                        assnFirst = lt::boolean(false);
                        lt::call_fn("pushSql", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                        lt::call_fn("pushW", &[lt::call_fn("identStr", &[lt::get_var("ak")])]);
                        lt::call_fn("pushSql", &[lt::string("=")]);
                        lt::call_fn("pushW", &[lt::string("=")]);
                        if (lt::truthy(&lt::has(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), &lt::string("chain")))) {
                          lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]));
                          if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                            lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                          }
                          else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values")]), &lt::string("delete")))))) {
                            savedSql = lt::get_var("sql");
                            savedW = lt::get_var("wsql");
                            savedOrderSql = lt::get_var("orderSql");
                            savedOrderW = lt::get_var("orderW");
                            savedHasOrder = lt::get_var("hasOrder");
                            savedAlias = lt::get_var("subAlias");
                            lt::set_var("sql", lt::buf_new());
                            lt::set_var("wsql", lt::buf_new());
                            lt::set_var("orderSql", lt::string(""));
                            lt::set_var("orderW", lt::string(""));
                            lt::set_var("hasOrder", lt::boolean(false));
                            lt::set_var("subAlias", lt::string(""));
                            lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak")), "chain"), "values"), lt::number(0)]);
                            subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                            subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                            subAliasText = lt::get_var("subAlias");
                            lt::set_var("sql", savedSql.clone());
                            lt::set_var("wsql", savedW.clone());
                            lt::set_var("orderSql", savedOrderSql.clone());
                            lt::set_var("orderW", savedOrderW.clone());
                            lt::set_var("hasOrder", savedHasOrder.clone());
                            lt::set_var("subAlias", savedAlias.clone());
                            lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                            lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                            if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                              lt::call_fn("pushSql", &[subAliasText.clone()]);
                              lt::call_fn("pushW", &[subAliasText.clone()]);
                            }
                          }
                          else {
                            lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_key(&lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "object"), "value"), &lt::get_var("ak"))]);
                        }
                      }
                    }
                  }
                  else {
                    panic!("{}", lt::as_string(&lt::str_concat(&lt::string("sql-builder parse: unsupported clause "), &name.clone())));
                  }
                }
              }
            }
            lt::call_fn("flushOrder", &[]);
            return lt::null();
          }
          else {
            first = lt::boolean(true);
            left = lt::string("");
            hasLeft = lt::boolean(false);
            base = lt::string("");
            for __lt_item_node in lt::array_items(&lt::get_var("nodes")) {
              let __lt_scope_node = lt::scope(&[("node", __lt_item_node)]);
              let mut pn = lt::call_fn("normName", &[lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "name")]);
              let mut op = lt::call_fn("opOf", &[pn.clone()]);
              if (lt::truthy(&lt::has(&lt::get_var("node"), &lt::string("functionCall")))) {
                if (lt::value_equals(&pn.clone(), &lt::string("col")) || lt::value_equals(&pn.clone(), &lt::string("table"))) {
                  left = lt::call_fn("identStr", &[lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                  hasLeft = lt::boolean(true);
                }
                else if (lt::truthy(&op.clone())) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(&hasLeft.clone())) {
                    base = left.clone();
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call_fn("pushSql", &[base.clone()]);
                  lt::call_fn("pushW", &[base.clone()]);
                  lt::call_fn("pushSql", &[op.clone()]);
                  lt::call_fn("pushW", &[op.clone()]);
                  if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                    lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                    if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                      lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                    }
                    else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                      savedSql = lt::get_var("sql");
                      savedW = lt::get_var("wsql");
                      savedOrderSql = lt::get_var("orderSql");
                      savedOrderW = lt::get_var("orderW");
                      savedHasOrder = lt::get_var("hasOrder");
                      savedAlias = lt::get_var("subAlias");
                      lt::set_var("sql", lt::buf_new());
                      lt::set_var("wsql", lt::buf_new());
                      lt::set_var("orderSql", lt::string(""));
                      lt::set_var("orderW", lt::string(""));
                      lt::set_var("hasOrder", lt::boolean(false));
                      lt::set_var("subAlias", lt::string(""));
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                      subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                      subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                      subAliasText = lt::get_var("subAlias");
                      lt::set_var("sql", savedSql.clone());
                      lt::set_var("wsql", savedW.clone());
                      lt::set_var("orderSql", savedOrderSql.clone());
                      lt::set_var("orderW", savedOrderW.clone());
                      lt::set_var("hasOrder", savedHasOrder.clone());
                      lt::set_var("subAlias", savedAlias.clone());
                      lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                      lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                      if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                        lt::call_fn("pushSql", &[subAliasText.clone()]);
                        lt::call_fn("pushW", &[subAliasText.clone()]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                  }
                  else {
                    lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("exists"))) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  lt::call_fn("pushSql", &[lt::string("EXISTS")]);
                  lt::call_fn("pushW", &[lt::string("EXISTS")]);
                  if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                    lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                    if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                      lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                    }
                    else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                      savedSql = lt::get_var("sql");
                      savedW = lt::get_var("wsql");
                      savedOrderSql = lt::get_var("orderSql");
                      savedOrderW = lt::get_var("orderW");
                      savedHasOrder = lt::get_var("hasOrder");
                      savedAlias = lt::get_var("subAlias");
                      lt::set_var("sql", lt::buf_new());
                      lt::set_var("wsql", lt::buf_new());
                      lt::set_var("orderSql", lt::string(""));
                      lt::set_var("orderW", lt::string(""));
                      lt::set_var("hasOrder", lt::boolean(false));
                      lt::set_var("subAlias", lt::string(""));
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                      subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                      subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                      subAliasText = lt::get_var("subAlias");
                      lt::set_var("sql", savedSql.clone());
                      lt::set_var("wsql", savedW.clone());
                      lt::set_var("orderSql", savedOrderSql.clone());
                      lt::set_var("orderW", savedOrderW.clone());
                      lt::set_var("hasOrder", savedHasOrder.clone());
                      lt::set_var("subAlias", savedAlias.clone());
                      lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                      lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                      if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                        lt::call_fn("pushSql", &[subAliasText.clone()]);
                        lt::call_fn("pushW", &[subAliasText.clone()]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                  }
                  else {
                    lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("in"))) {
                  if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                    if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                      if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                        lt::call_fn("pushSql", &[lt::string("AND")]);
                        lt::call_fn("pushW", &[lt::string("AND")]);
                      }
                      first = lt::boolean(false);
                      if (lt::truthy(&hasLeft.clone())) {
                        base = left.clone();
                      }
                      else {
                        base = lt::string("?");
                      }
                      lt::call_fn("pushSql", &[base.clone()]);
                      lt::call_fn("pushW", &[base.clone()]);
                      lt::call_fn("pushSql", &[lt::string("IN")]);
                      lt::call_fn("pushW", &[lt::string("IN")]);
                      savedSql = lt::get_var("sql");
                      savedW = lt::get_var("wsql");
                      savedOrderSql = lt::get_var("orderSql");
                      savedOrderW = lt::get_var("orderW");
                      savedHasOrder = lt::get_var("hasOrder");
                      savedAlias = lt::get_var("subAlias");
                      lt::set_var("sql", lt::buf_new());
                      lt::set_var("wsql", lt::buf_new());
                      lt::set_var("orderSql", lt::string(""));
                      lt::set_var("orderW", lt::string(""));
                      lt::set_var("hasOrder", lt::boolean(false));
                      lt::set_var("subAlias", lt::string(""));
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                      subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                      subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                      subAliasText = lt::get_var("subAlias");
                      lt::set_var("sql", savedSql.clone());
                      lt::set_var("wsql", savedW.clone());
                      lt::set_var("orderSql", savedOrderSql.clone());
                      lt::set_var("orderW", savedOrderW.clone());
                      lt::set_var("hasOrder", savedHasOrder.clone());
                      lt::set_var("subAlias", savedAlias.clone());
                      lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                      lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                      if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                        lt::call_fn("pushSql", &[subAliasText.clone()]);
                        lt::call_fn("pushW", &[subAliasText.clone()]);
                      }
                    }
                    else {
                      if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                        lt::call_fn("pushSql", &[lt::string("AND")]);
                        lt::call_fn("pushW", &[lt::string("AND")]);
                      }
                      first = lt::boolean(false);
                      if (lt::truthy(&hasLeft.clone())) {
                        base = left.clone();
                      }
                      else {
                        base = lt::string("?");
                      }
                      lt::call_fn("pushSql", &[base.clone()]);
                      lt::call_fn("pushW", &[base.clone()]);
                      lt::call_fn("pushSql", &[lt::string("IN (")]);
                      lt::call_fn("pushW", &[lt::string("IN (")]);
                      let mut inFirst = lt::boolean(true);
                      for __lt_item_iv in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])) {
                        let __lt_scope_iv = lt::scope(&[("iv", __lt_item_iv)]);
                        if (lt::value_equals(&inFirst.clone(), &lt::boolean(false))) {
                          lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                          lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                        }
                        inFirst = lt::boolean(false);
                        if (lt::truthy(&lt::has(&lt::get_var("iv"), &lt::string("chain")))) {
                          lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]));
                          if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                            lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                          }
                          else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("delete")))))) {
                            savedSql = lt::get_var("sql");
                            savedW = lt::get_var("wsql");
                            savedOrderSql = lt::get_var("orderSql");
                            savedOrderW = lt::get_var("orderW");
                            savedHasOrder = lt::get_var("hasOrder");
                            savedAlias = lt::get_var("subAlias");
                            lt::set_var("sql", lt::buf_new());
                            lt::set_var("wsql", lt::buf_new());
                            lt::set_var("orderSql", lt::string(""));
                            lt::set_var("orderW", lt::string(""));
                            lt::set_var("hasOrder", lt::boolean(false));
                            lt::set_var("subAlias", lt::string(""));
                            lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values"), lt::number(0)]);
                            subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                            subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                            subAliasText = lt::get_var("subAlias");
                            lt::set_var("sql", savedSql.clone());
                            lt::set_var("wsql", savedW.clone());
                            lt::set_var("orderSql", savedOrderSql.clone());
                            lt::set_var("orderW", savedOrderW.clone());
                            lt::set_var("hasOrder", savedHasOrder.clone());
                            lt::set_var("subAlias", savedAlias.clone());
                            lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                            lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                            if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                              lt::call_fn("pushSql", &[subAliasText.clone()]);
                              lt::call_fn("pushW", &[subAliasText.clone()]);
                            }
                          }
                          else {
                            lt::call_fn("emitParam", &[lt::get_var("iv")]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_var("iv")]);
                        }
                      }
                      lt::call_fn("pushSql", &[lt::string(")")]);
                      lt::call_fn("pushW", &[lt::string(")")]);
                    }
                  }
                  else {
                    if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                      lt::call_fn("pushSql", &[lt::string("AND")]);
                      lt::call_fn("pushW", &[lt::string("AND")]);
                    }
                    first = lt::boolean(false);
                    if (lt::truthy(&hasLeft.clone())) {
                      base = left.clone();
                    }
                    else {
                      base = lt::string("?");
                    }
                    lt::call_fn("pushSql", &[base.clone()]);
                    lt::call_fn("pushW", &[base.clone()]);
                    lt::call_fn("pushSql", &[lt::string("IN (")]);
                    lt::call_fn("pushW", &[lt::string("IN (")]);
                    let mut inFirst = lt::boolean(true);
                    for __lt_item_iv in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])) {
                      let __lt_scope_iv = lt::scope(&[("iv", __lt_item_iv)]);
                      if (lt::value_equals(&inFirst.clone(), &lt::boolean(false))) {
                        lt::set_var("sql", lt::buf_append(lt::get_var("sql"), lt::string(",")));
                        lt::set_var("wsql", lt::buf_append(lt::get_var("wsql"), lt::string(",")));
                      }
                      inFirst = lt::boolean(false);
                      if (lt::truthy(&lt::has(&lt::get_var("iv"), &lt::string("chain")))) {
                        lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]));
                        if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                          lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                        }
                        else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values")]), &lt::string("delete")))))) {
                          savedSql = lt::get_var("sql");
                          savedW = lt::get_var("wsql");
                          savedOrderSql = lt::get_var("orderSql");
                          savedOrderW = lt::get_var("orderW");
                          savedHasOrder = lt::get_var("hasOrder");
                          savedAlias = lt::get_var("subAlias");
                          lt::set_var("sql", lt::buf_new());
                          lt::set_var("wsql", lt::buf_new());
                          lt::set_var("orderSql", lt::string(""));
                          lt::set_var("orderW", lt::string(""));
                          lt::set_var("hasOrder", lt::boolean(false));
                          lt::set_var("subAlias", lt::string(""));
                          lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("iv"), "chain"), "values"), lt::number(0)]);
                          subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                          subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                          subAliasText = lt::get_var("subAlias");
                          lt::set_var("sql", savedSql.clone());
                          lt::set_var("wsql", savedW.clone());
                          lt::set_var("orderSql", savedOrderSql.clone());
                          lt::set_var("orderW", savedOrderW.clone());
                          lt::set_var("hasOrder", savedHasOrder.clone());
                          lt::set_var("subAlias", savedAlias.clone());
                          lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                          lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                          if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                            lt::call_fn("pushSql", &[subAliasText.clone()]);
                            lt::call_fn("pushW", &[subAliasText.clone()]);
                          }
                        }
                        else {
                          lt::call_fn("emitParam", &[lt::get_var("iv")]);
                        }
                      }
                      else {
                        lt::call_fn("emitParam", &[lt::get_var("iv")]);
                      }
                    }
                    lt::call_fn("pushSql", &[lt::string(")")]);
                    lt::call_fn("pushW", &[lt::string(")")]);
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("between"))) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(&hasLeft.clone())) {
                    base = left.clone();
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call_fn("pushSql", &[base.clone()]);
                  lt::call_fn("pushW", &[base.clone()]);
                  lt::call_fn("pushSql", &[lt::string("BETWEEN")]);
                  lt::call_fn("pushW", &[lt::string("BETWEEN")]);
                  if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), &lt::string("chain")))) {
                    lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]));
                    if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                      lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                    }
                    else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                      savedSql = lt::get_var("sql");
                      savedW = lt::get_var("wsql");
                      savedOrderSql = lt::get_var("orderSql");
                      savedOrderW = lt::get_var("orderW");
                      savedHasOrder = lt::get_var("hasOrder");
                      savedAlias = lt::get_var("subAlias");
                      lt::set_var("sql", lt::buf_new());
                      lt::set_var("wsql", lt::buf_new());
                      lt::set_var("orderSql", lt::string(""));
                      lt::set_var("orderW", lt::string(""));
                      lt::set_var("hasOrder", lt::boolean(false));
                      lt::set_var("subAlias", lt::string(""));
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                      subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                      subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                      subAliasText = lt::get_var("subAlias");
                      lt::set_var("sql", savedSql.clone());
                      lt::set_var("wsql", savedW.clone());
                      lt::set_var("orderSql", savedOrderSql.clone());
                      lt::set_var("orderW", savedOrderW.clone());
                      lt::set_var("hasOrder", savedHasOrder.clone());
                      lt::set_var("subAlias", savedAlias.clone());
                      lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                      lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                      if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                        lt::call_fn("pushSql", &[subAliasText.clone()]);
                        lt::call_fn("pushW", &[subAliasText.clone()]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                    }
                  }
                  else {
                    lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))]);
                  }
                  lt::call_fn("pushSql", &[lt::string("AND")]);
                  lt::call_fn("pushW", &[lt::string("AND")]);
                  if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), &lt::string("chain")))) {
                    lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]));
                    if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                      lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                    }
                    else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                      savedSql = lt::get_var("sql");
                      savedW = lt::get_var("wsql");
                      savedOrderSql = lt::get_var("orderSql");
                      savedOrderW = lt::get_var("orderW");
                      savedHasOrder = lt::get_var("hasOrder");
                      savedAlias = lt::get_var("subAlias");
                      lt::set_var("sql", lt::buf_new());
                      lt::set_var("wsql", lt::buf_new());
                      lt::set_var("orderSql", lt::string(""));
                      lt::set_var("orderW", lt::string(""));
                      lt::set_var("hasOrder", lt::boolean(false));
                      lt::set_var("subAlias", lt::string(""));
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                      subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                      subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                      subAliasText = lt::get_var("subAlias");
                      lt::set_var("sql", savedSql.clone());
                      lt::set_var("wsql", savedW.clone());
                      lt::set_var("orderSql", savedOrderSql.clone());
                      lt::set_var("orderW", savedOrderW.clone());
                      lt::set_var("hasOrder", savedHasOrder.clone());
                      lt::set_var("subAlias", savedAlias.clone());
                      lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                      lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                      if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                        lt::call_fn("pushSql", &[subAliasText.clone()]);
                        lt::call_fn("pushW", &[subAliasText.clone()]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument"))]);
                    }
                  }
                  else {
                    lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument"))]);
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("isnull"))) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(&hasLeft.clone())) {
                    base = left.clone();
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call_fn("pushSql", &[base.clone()]);
                  lt::call_fn("pushW", &[base.clone()]);
                  lt::call_fn("pushSql", &[lt::string("IS NULL")]);
                  lt::call_fn("pushW", &[lt::string("IS NULL")]);
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("isnotnull"))) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(&hasLeft.clone())) {
                    base = left.clone();
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call_fn("pushSql", &[base.clone()]);
                  lt::call_fn("pushW", &[base.clone()]);
                  lt::call_fn("pushSql", &[lt::string("IS NOT NULL")]);
                  lt::call_fn("pushW", &[lt::string("IS NOT NULL")]);
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("not"))) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  lt::call_fn("pushSql", &[lt::string("NOT (")]);
                  lt::call_fn("pushW", &[lt::string("NOT (")]);
                  lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument")), "chain"), "values"), lt::number(1)]);
                  lt::call_fn("pushSql", &[lt::string(")")]);
                  lt::call_fn("pushW", &[lt::string(")")]);
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("and")) || lt::value_equals(&pn.clone(), &lt::string("or"))) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  lt::call_fn("pushSql", &[lt::string("(")]);
                  lt::call_fn("pushW", &[lt::string("(")]);
                  let mut boolFirst = lt::boolean(true);
                  for __lt_item_bv in lt::array_items(&lt::call_fn("itemsOf", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])) {
                    let __lt_scope_bv = lt::scope(&[("bv", __lt_item_bv)]);
                    if (lt::value_equals(&boolFirst.clone(), &lt::boolean(false))) {
                      lt::set_var("tmp", lt::to_upper(&pn.clone()));
                      lt::call_fn("pushSql", &[lt::get_var("tmp")]);
                      lt::call_fn("pushW", &[lt::get_var("tmp")]);
                    }
                    boolFirst = lt::boolean(false);
                    if (lt::truthy(&lt::has(&lt::get_var("bv"), &lt::string("chain")))) {
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_var("bv"), "chain"), "values"), lt::number(1)]);
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_var("bv")]);
                    }
                  }
                  lt::call_fn("pushSql", &[lt::string(")")]);
                  lt::call_fn("pushW", &[lt::string(")")]);
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("as"))) {
                  if (lt::truthy(&hasLeft.clone())) {
                    base = left.clone();
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call_fn("pushSql", &[base.clone()]);
                  lt::call_fn("pushW", &[base.clone()]);
                  lt::call_fn("pushSql", &[lt::string("AS")]);
                  lt::call_fn("pushW", &[lt::string("AS")]);
                  lt::call_fn("emitIdent", &[lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("op"))) {
                  if (lt::value_equals(&first.clone(), &lt::boolean(false))) {
                    lt::call_fn("pushSql", &[lt::string("AND")]);
                    lt::call_fn("pushW", &[lt::string("AND")]);
                  }
                  first = lt::boolean(false);
                  if (lt::truthy(&hasLeft.clone())) {
                    base = left.clone();
                  }
                  else {
                    base = lt::string("?");
                  }
                  lt::call_fn("pushSql", &[base.clone()]);
                  lt::call_fn("pushW", &[base.clone()]);
                  lt::call_fn("pushSql", &[lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                  lt::call_fn("pushW", &[lt::call_fn("asString", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(0)), &lt::string("argument"))])]);
                  if (lt::truthy(&lt::has(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), &lt::string("chain")))) {
                    lt::set_var("tmpRef", lt::call_fn("isRef", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]));
                    if (!lt::value_equals(&lt::get_var("tmpRef"), &lt::string(""))) {
                      lt::call_fn("emitIdent", &[lt::get_var("tmpRef")]);
                    }
                    else if ((lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("select")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("with"))) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("values")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("insert")) || (lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("update")) || lt::value_equals(&lt::call_fn("firstKind", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values")]), &lt::string("delete")))))) {
                      savedSql = lt::get_var("sql");
                      savedW = lt::get_var("wsql");
                      savedOrderSql = lt::get_var("orderSql");
                      savedOrderW = lt::get_var("orderW");
                      savedHasOrder = lt::get_var("hasOrder");
                      savedAlias = lt::get_var("subAlias");
                      lt::set_var("sql", lt::buf_new());
                      lt::set_var("wsql", lt::buf_new());
                      lt::set_var("orderSql", lt::string(""));
                      lt::set_var("orderW", lt::string(""));
                      lt::set_var("hasOrder", lt::boolean(false));
                      lt::set_var("subAlias", lt::string(""));
                      lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument")), "chain"), "values"), lt::number(0)]);
                      subSql = lt::trim(&lt::buf_str(&lt::get_var("sql")));
                      subW = lt::trim(&lt::buf_str(&lt::get_var("wsql")));
                      subAliasText = lt::get_var("subAlias");
                      lt::set_var("sql", savedSql.clone());
                      lt::set_var("wsql", savedW.clone());
                      lt::set_var("orderSql", savedOrderSql.clone());
                      lt::set_var("orderW", savedOrderW.clone());
                      lt::set_var("hasOrder", savedHasOrder.clone());
                      lt::set_var("subAlias", savedAlias.clone());
                      lt::call_fn("pushSql", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subSql.clone(), &lt::string(")")))]);
                      lt::call_fn("pushW", &[lt::str_concat(&lt::string("("), &lt::str_concat(&subW.clone(), &lt::string(")")))]);
                      if (!lt::value_equals(&subAliasText.clone(), &lt::string(""))) {
                        lt::call_fn("pushSql", &[subAliasText.clone()]);
                        lt::call_fn("pushW", &[subAliasText.clone()]);
                      }
                    }
                    else {
                      lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument"))]);
                    }
                  }
                  else {
                    lt::call_fn("emitParam", &[lt::get_key(&lt::index(&lt::get(&lt::get(&lt::get_var("node"), "functionCall"), "arguments"), &lt::number(1)), &lt::string("argument"))]);
                  }
                  hasLeft = lt::boolean(false);
                }
                else if (lt::value_equals(&pn.clone(), &lt::string("raw"))) {
                  lt::call_fn("emitRaw", &[lt::get_var("node")]);
                }
                else {
                  panic!("{}", lt::as_string(&lt::string("sql-builder parse: unsupported predicate")));
                }
              }
            }
            return lt::null();
          }
          lt::null()
        });
        lt::call_fn("renderNodes", &[lt::get(&lt::get(&lt::get(&lt::get(&lt::get_var("root"), "schema"), "chain"), "chain"), "values"), lt::number(0)]);
        lt::set_var("sql", lt::buf_str(&lt::get_var("sql")));
        lt::set_var("wsql", lt::buf_str(&lt::get_var("wsql")));
        lt::set_var("params", lt::list_value(&lt::get_var("params")));
        return lt::map(vec![("sql", lt::trim(&lt::get_var("sql"))), ("sqlWithParam", lt::trim(&lt::get_var("wsql"))), ("param", lt::params(&lt::get_var("params")))]);
    }

}

impl Structure for SqlBuilder {
    fn get_schema(&self) -> lt::Value { self.schema.clone() }
    fn kebab_name(&self) -> String { "sql-builder".to_string() }
}

pub struct Init;

impl Init {
    pub fn sql_builder(variable_name: Option<&str>, copies: &[lt::Value]) -> SqlBuilder {
        let structure = SqlBuilder::new();
        let variable_name_value = match variable_name {
            Some(value) => lt::string(value),
            None => lt::get(&lt::get(&lt::get(&lt::get(&lt::get(&structure.get_schema(), "schema"), "chain"), "chain"), "initFunction"), "variableName"),
        };
        structure.init_from_init_function(lt::map(vec![("name", lt::string("sql-builder")), ("variableName", variable_name_value)]), &lt::array(copies.to_vec()))
    }
}