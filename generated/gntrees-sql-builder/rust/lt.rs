//! `lt` — the tiny dynamic runtime that Lingua Tungga's Rust emitter targets.
//!
//! Rust has no `any`, so every LT value is a [`Value`] enum. This module is the
//! Rust equivalent of the C `base-utils`/`base-types` runtime and of the native
//! dynamic types TS/Python get for free. It is deliberately small: only the
//! primitives the emitter can reference.
//!
//! Fase 4d decision gate: this file is the measured "runtime cost" of a static
//! language target.
#![allow(dead_code)]
#![allow(unused_mut)]
#![allow(unused_variables)]

#[derive(Clone, Debug, PartialEq)]
pub enum Value {
    Null,
    Bool(bool),
    Int(i64),
    Float(f64),
    Str(String),
    Array(Vec<Value>),
    /// Insertion-ordered map (mirrors the JS object/Map used by the TS emitter).
    Map(Vec<(String, Value)>),
}

// ---------------------------------------------------------------- constructors

pub fn null() -> Value {
    Value::Null
}

pub fn boolean(b: bool) -> Value {
    Value::Bool(b)
}

pub fn number<N: Into<f64>>(n: N) -> Value {
    let n = n.into();
    if n.fract() == 0.0 && n.abs() < 9_007_199_254_740_992.0 {
        Value::Int(n as i64)
    } else {
        Value::Float(n)
    }
}

pub fn string(s: &str) -> Value {
    Value::Str(s.to_string())
}

pub fn array(items: Vec<Value>) -> Value {
    Value::Array(items)
}

pub fn map(entries: Vec<(&str, Value)>) -> Value {
    Value::Map(entries.into_iter().map(|(k, v)| (k.to_string(), v)).collect())
}

// ------------------------------------------------------------------ conversion

/// Host-facing stringification (used by the compiler shim / tests).
pub fn as_string(v: &Value) -> String {
    match v {
        Value::Null => "null".to_string(),
        Value::Bool(b) => b.to_string(),
        Value::Int(i) => i.to_string(),
        Value::Float(f) => {
            let mut s = f.to_string();
            if !s.contains('.') && !s.contains('e') && !s.contains('E') {
                s.push_str(".0");
            }
            s
        }
        Value::Str(s) => s.clone(),
        Value::Array(items) => {
            let parts: Vec<String> = items.iter().map(as_string).collect();
            format!("[{}]", parts.join(","))
        }
        Value::Map(entries) => {
            let parts: Vec<String> = entries
                .iter()
                .map(|(k, val)| format!("\"{}\":{}", k, as_string(val)))
                .collect();
            format!("{{{}}}", parts.join(","))
        }
    }
}

/// LT `stringOf`: returns a `Value` (so it composes with `str_concat`).
pub fn to_string(v: &Value) -> Value {
    Value::Str(as_string(v))
}

pub fn truthy(v: &Value) -> bool {
    match v {
        Value::Null => false,
        Value::Bool(b) => *b,
        Value::Int(i) => *i != 0,
        Value::Float(f) => *f != 0.0,
        Value::Str(s) => !s.is_empty(),
        Value::Array(items) => !items.is_empty(),
        Value::Map(entries) => !entries.is_empty(),
    }
}

pub fn value_equals(a: &Value, b: &Value) -> bool {
    match (a, b) {
        (Value::Null, Value::Null) => true,
        (Value::Bool(x), Value::Bool(y)) => x == y,
        (Value::Int(x), Value::Int(y)) => x == y,
        (Value::Float(x), Value::Float(y)) => x == y,
        (Value::Int(x), Value::Float(y)) | (Value::Float(y), Value::Int(x)) => (*x as f64) == *y,
        (Value::Str(x), Value::Str(y)) => x == y,
        (Value::Array(x), Value::Array(y)) => {
            x.len() == y.len() && x.iter().zip(y.iter()).all(|(p, q)| value_equals(p, q))
        }
        (Value::Map(x), Value::Map(y)) => {
            x.len() == y.len()
                && x.iter().all(|(k, v)| {
                    y.iter().find(|(k2, _)| k2 == k).map_or(false, |(_, v2)| value_equals(v, v2))
                })
        }
        _ => false,
    }
}

// --------------------------------------------------------------------- buffers

pub fn buf_new() -> Value {
    Value::Array(Vec::new())
}

/// Move-in / move-out append: matches `name = lt::buf_append(name, x)`.
pub fn buf_append(v: Value, x: Value) -> Value {
    match v {
        Value::Array(mut items) => {
            items.push(x);
            Value::Array(items)
        }
        other => other,
    }
}

pub fn buf_len(v: &Value) -> Value {
    len(v)
}

pub fn buf_str(v: &Value) -> Value {
    let s = match v {
        Value::Array(items) => items.iter().map(as_string).collect::<Vec<_>>().join(""),
        other => as_string(other),
    };
    Value::Str(s)
}

// ----------------------------------------------------------------------- lists

pub fn list_new() -> Value {
    Value::Array(Vec::new())
}

pub fn list_push(v: Value, x: Value) -> Value {
    buf_append(v, x)
}

pub fn list_len(v: &Value) -> Value {
    len(v)
}

pub fn list_get(v: &Value, i: &Value) -> Value {
    index(v, i)
}

pub fn list_value(v: &Value) -> Value {
    v.clone()
}

// ------------------------------------------------------------------- iteration

/// Yields the items of an array `Value` (Rust `Value` is not iterable by itself).
pub fn array_items(v: &Value) -> Vec<Value> {
    match v {
        Value::Array(items) => items.clone(),
        _ => Vec::new(),
    }
}

// ---------------------------------------------------------------- string domain

pub fn str_concat(a: &Value, b: &Value) -> Value {
    Value::Str(format!("{}{}", as_string(a), as_string(b)))
}

pub fn str_len(a: &Value) -> Value {
    Value::Int(as_string(a).chars().count() as i64)
}

pub fn to_upper(a: &Value) -> Value {
    Value::Str(as_string(a).to_uppercase())
}

pub fn to_lower(a: &Value) -> Value {
    Value::Str(as_string(a).to_lowercase())
}

pub fn trim(a: &Value) -> Value {
    Value::Str(as_string(a).trim().to_string())
}

pub fn slice(a: &Value, start: &Value, end: &Value) -> Value {
    match a {
        Value::Array(items) => {
            let s = as_i64(start).max(0) as usize;
            let e = as_i64(end).max(0) as usize;
            let e = e.min(items.len());
            let s = s.min(e);
            Value::Array(items[s..e].to_vec())
        }
        other => {
            let chars: Vec<char> = as_string(other).chars().collect();
            let s = as_i64(start).max(0) as usize;
            let e = as_i64(end).max(0) as usize;
            let e = e.min(chars.len());
            let s = s.min(e);
            Value::Str(chars[s..e].iter().collect())
        }
    }
}

pub fn replace(a: &Value, search: &Value, replacement: &Value) -> Value {
    Value::Str(as_string(a).replace(&as_string(search), &as_string(replacement)))
}

pub fn split(a: &Value, separator: &Value) -> Value {
    Value::Array(
        as_string(a)
            .split(&as_string(separator))
            .map(|part| Value::Str(part.to_string()))
            .collect(),
    )
}

pub fn contains(a: &Value, item: &Value) -> Value {
    match a {
        Value::Array(items) => Value::Bool(items.iter().any(|x| value_equals(x, item))),
        Value::Str(s) => Value::Bool(s.contains(&as_string(item))),
        _ => Value::Bool(false),
    }
}

pub fn repeat(a: &Value, count: &Value) -> Value {
    Value::Str(as_string(a).repeat(as_i64(count).max(0) as usize))
}

pub fn char_at(a: &Value, index: &Value) -> Value {
    let chars: Vec<char> = as_string(a).chars().collect();
    let i = as_i64(index);
    if i < 0 || i as usize >= chars.len() {
        Value::Null
    } else {
        Value::Str(chars[i as usize].to_string())
    }
}

pub fn starts_with(a: &Value, prefix: &Value) -> Value {
    Value::Bool(as_string(a).starts_with(&as_string(prefix)))
}

pub fn ends_with(a: &Value, suffix: &Value) -> Value {
    Value::Bool(as_string(a).ends_with(&as_string(suffix)))
}

// -------------------------------------------------------------------- arrays

pub fn len(a: &Value) -> Value {
    match a {
        Value::Array(items) => Value::Int(items.len() as i64),
        Value::Map(entries) => Value::Int(entries.len() as i64),
        Value::Str(s) => Value::Int(s.chars().count() as i64),
        _ => Value::Int(0),
    }
}

pub fn index(a: &Value, idx: &Value) -> Value {
    match a {
        Value::Array(items) => {
            let i = as_i64(idx);
            if i < 0 || i as usize >= items.len() {
                Value::Null
            } else {
                items[i as usize].clone()
            }
        }
        Value::Str(s) => char_at(a, idx),
        Value::Map(entries) => entries
            .iter()
            .find(|(k, _)| k == &as_string(idx))
            .map(|(_, v)| v.clone())
            .unwrap_or(Value::Null),
        _ => Value::Null,
    }
}

pub fn append(a: &Value, item: &Value) -> Value {
    match a {
        Value::Array(items) => {
            let mut out = items.clone();
            out.push(item.clone());
            Value::Array(out)
        }
        _ => Value::Array(vec![item.clone()]),
    }
}

pub fn arr_concat(a: &Value, b: &Value) -> Value {
    let mut out = match a {
        Value::Array(items) => items.clone(),
        _ => Vec::new(),
    };
    if let Value::Array(items) = b {
        out.extend(items.iter().cloned());
    }
    Value::Array(out)
}

pub fn join(a: &Value, separator: &Value) -> Value {
    let sep = as_string(separator);
    match a {
        Value::Array(items) => {
            Value::Str(items.iter().map(as_string).collect::<Vec<_>>().join(&sep))
        }
        other => Value::Str(as_string(other)),
    }
}

pub fn reverse(a: &Value) -> Value {
    match a {
        Value::Array(items) => {
            let mut out = items.clone();
            out.reverse();
            Value::Array(out)
        }
        other => other.clone(),
    }
}

pub fn sort(a: &Value) -> Value {
    match a {
        Value::Array(items) => {
            let mut out = items.clone();
            out.sort_by(|x, y| as_string(x).cmp(&as_string(y)));
            Value::Array(out)
        }
        other => other.clone(),
    }
}

pub fn unique(a: &Value) -> Value {
    match a {
        Value::Array(items) => {
            let mut out: Vec<Value> = Vec::new();
            for item in items {
                if !out.iter().any(|x| value_equals(x, item)) {
                    out.push(item.clone());
                }
            }
            Value::Array(out)
        }
        other => other.clone(),
    }
}

pub fn index_of(a: &Value, item: &Value) -> Value {
    match a {
        Value::Array(items) => {
            match items.iter().position(|x| value_equals(x, item)) {
                Some(i) => Value::Int(i as i64),
                None => Value::Int(-1),
            }
        }
        _ => Value::Int(-1),
    }
}

// --------------------------------------------------------------------- objects

pub fn get(a: &Value, key: &str) -> Value {
    match a {
        Value::Map(entries) => entries
            .iter()
            .find(|(k, _)| k == key)
            .map(|(_, v)| v.clone())
            .unwrap_or(Value::Null),
        _ => Value::Null,
    }
}

pub fn set(a: &Value, key: &Value, value: &Value) -> Value {
    let key = as_string(key);
    match a {
        Value::Map(entries) => {
            let mut out: Vec<(String, Value)> = entries
                .iter()
                .filter(|(k, _)| k != &key)
                .cloned()
                .collect();
            out.push((key, value.clone()));
            Value::Map(out)
        }
        _ => Value::Map(vec![(key, value.clone())]),
    }
}

pub fn keys(a: &Value) -> Value {
    match a {
        Value::Map(entries) => {
            Value::Array(entries.iter().map(|(k, _)| Value::Str(k.clone())).collect())
        }
        _ => Value::Array(Vec::new()),
    }
}

pub fn values(a: &Value) -> Value {
    match a {
        Value::Map(entries) => Value::Array(entries.iter().map(|(_, v)| v.clone()).collect()),
        _ => Value::Array(Vec::new()),
    }
}

pub fn has(a: &Value, key: &Value) -> Value {
    let key = as_string(key);
    match a {
        Value::Map(entries) => Value::Bool(entries.iter().any(|(k, _)| k == &key)),
        _ => Value::Bool(false),
    }
}

pub fn merge(a: &Value, b: &Value) -> Value {
    let mut out = match a {
        Value::Map(entries) => entries.clone(),
        _ => Vec::new(),
    };
    if let Value::Map(entries) = b {
        for (k, v) in entries {
            out.retain(|(k2, _)| k2 != k);
            out.push((k.clone(), v.clone()));
        }
    }
    Value::Map(out)
}

pub fn delete(a: &Value, key: &Value) -> Value {
    let key = as_string(key);
    match a {
        Value::Map(entries) => {
            Value::Map(entries.iter().filter(|(k, _)| k != &key).cloned().collect())
        }
        other => other.clone(),
    }
}

pub fn entries(a: &Value) -> Value {
    match a {
        Value::Map(entries) => Value::Array(
            entries
                .iter()
                .map(|(k, v)| Value::Array(vec![Value::Str(k.clone()), v.clone()]))
                .collect(),
        ),
        _ => Value::Array(Vec::new()),
    }
}

// ----------------------------------------------------------------------- helper

fn as_i64(v: &Value) -> i64 {
    match v {
        Value::Int(i) => *i,
        Value::Float(f) => *f as i64,
        Value::Bool(b) => *b as i64,
        Value::Str(s) => s.parse::<i64>().unwrap_or(0),
        _ => 0,
    }
}

// ------------------------------------------------- thread-local LT state (Rust)
//
// The Rust emitter keeps LT variables and local functions in thread-local maps
// instead of Rust locals/closures. This is what makes the parse-body pattern
// (recursive local functions + mutation of outer buffers like `sql`/`wsql`)
// expressible without `RefCell` double-borrows at every call site: closures
// capture nothing, they only touch these maps.

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

thread_local! {
    static VARS: RefCell<HashMap<String, Value>> = RefCell::new(HashMap::new());
    static FNS: RefCell<HashMap<String, Rc<dyn Fn(&[Value]) -> Value>>> = RefCell::new(HashMap::new());
}

/// Declare/assign an LT variable; read it back with [`get_var`].
pub fn set_var(name: &str, value: Value) {
    VARS.with(|vars| {
        vars.borrow_mut().insert(name.to_string(), value);
    });
}

/// Read an LT variable (cloned). Missing variables read as `Null`.
pub fn get_var(name: &str) -> Value {
    VARS.with(|vars| vars.borrow().get(name).cloned().unwrap_or(Value::Null))
}

/// Register a local function. Closures capture nothing (they only touch the
/// thread-local maps), so recursion and forward references are free.
pub fn def_fn<F: Fn(&[Value]) -> Value + 'static>(name: &str, f: F) {
    FNS.with(|fns| {
        fns.borrow_mut().insert(name.to_string(), Rc::new(f));
    });
}

/// Call a local function by name. Missing functions are a no-op returning `Null`.
pub fn call_fn(name: &str, args: &[Value]) -> Value {
    let f = FNS.with(|fns| fns.borrow().get(name).cloned());
    match f {
        Some(f) => f(args),
        None => Value::Null,
    }
}

/// RAII parameter scope: binds parameters on creation and restores the previous
/// bindings on drop — including on an early `return`.
pub struct Scope(Vec<(String, Option<Value>)>);

impl Drop for Scope {
    fn drop(&mut self) {
        VARS.with(|vars| {
            let mut vars = vars.borrow_mut();
            for (name, previous) in self.0.drain(..) {
                match previous {
                    Some(value) => {
                        vars.insert(name, value);
                    }
                    None => {
                        vars.remove(&name);
                    }
                }
            }
        });
    }
}

pub fn scope(params: &[(&str, Value)]) -> Scope {
    let saved = VARS.with(|vars| {
        let mut vars = vars.borrow_mut();
        params
            .iter()
            .map(|(name, value)| (name.to_string(), vars.insert(name.to_string(), value.clone())))
            .collect()
    });
    Scope(saved)
}

/// `objectGet` with a rendered `Value` key (the emitter maps it here; `member`
/// uses [`get`] with a `&str` key instead).
pub fn get_key(a: &Value, key: &Value) -> Value {
    get(a, &as_string(key))
}

/// Bridge helper: unwrap the `{string|number|boolean: {value}}` param entries.
pub fn params(v: &Value) -> Value {
    Value::Array(
        array_items(v)
            .iter()
            .map(|entry| {
                let string = get(entry, "string");
                if !matches!(string, Value::Null) {
                    return get(&string, "value");
                }
                let number = get(entry, "number");
                if !matches!(number, Value::Null) {
                    return get(&number, "value");
                }
                let boolean = get(entry, "boolean");
                if !matches!(boolean, Value::Null) {
                    return get(&boolean, "value");
                }
                Value::Null
            })
            .collect(),
    )
}
