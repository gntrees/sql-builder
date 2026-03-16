"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionListToString = void 0;
const functionListToString = (fnList, baseQueryBuilder) => {
    const INDENT = "    ";
    function stringifyFunction(fn, asExpression = false) {
        const emitPrefix = asExpression ? `${baseQueryBuilder}` : '';
        if (fn.paramType === "function") {
            const argsArr = fn.arguments.map(stringifyArg);
            const args = argsArr.join(", ");
            const body = `${fn.name}(${args})`;
            return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
        }
        else if (fn.paramType === "array") {
            // Support array literal paramType: produce [item1, item2, ...]
            const itemsSource = Array.isArray(fn.name)
                ? fn.name
                : null;
            if (!itemsSource) {
                throw new Error(`Invalid array paramType: name should be an array, got ${typeof fn.name}`);
            }
            const items = itemsSource.map((item) => stringifyArg(item)).join(", ");
            return asExpression ? `${emitPrefix}[${items}]` : `[${items}]`;
        }
        else if (fn.paramType === "template-literal") {
            const raw = fn.arguments[0];
            const content = typeof raw === "string"
                ? raw.replace(/`/g, "\\`").replace(/\\/g, "\\\\")
                : typeof raw === "object"
                    ? Array.isArray(raw)
                        ? raw.map(stringifyArg).join("")
                        : stringifyArg(raw)
                    : JSON.stringify(raw);
            return asExpression ? `${emitPrefix}.${fn.name}\`${content}\`` : `.${fn.name}\`${content}\``;
        }
        else if (fn.paramType === "string") {
            const content = (fn.name || "").toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return `\`${content}\``;
        }
        else if (fn.paramType === "number" || fn.paramType === "boolean" || fn.paramType === "null") {
            const contentRaw = fn.paramType === "null" ? "null" : (fn.name ?? "");
            const content = contentRaw.toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return asExpression ? `${content}` : `${content}`;
        }
        else if (fn.paramType === "raw") {
            const content = Array.isArray(fn.name)
                ? fn.name.map((item) => (typeof item === "string" ? item : stringifyArg(item))).join(", ")
                : (typeof fn.name === "string" ? fn.name : stringifyArg(fn.name));
            return content;
        }
        else {
            throw new Error(`Unknown paramType: ${fn.paramType}`);
        }
    }
    function stringifyArg(arg) {
        if (typeof arg === "string") {
            return `\`${arg.replace(/`/g, "\\`").replace(/\\/g, "\\\\")}\``;
        }
        if (arg === null || arg === undefined || typeof arg === "number" || typeof arg === "boolean") {
            return JSON.stringify(arg);
        }
        if (Array.isArray(arg)) {
            const result = arg.map((item, index) => {
                if (typeof item === 'object' && 'name' in item && 'paramType' in item) {
                    const parts = item;
                    return stringifyFunction(item, index === 0);
                }
                else if (Array.isArray(item)) {
                    return stringifyArg(item);
                }
                else if (typeof item === "string") {
                    return `\`${item.replace(/`/g, "\\`").replace(/\\/g, "\\\\")}\``;
                }
                else if (item === null || item === undefined || typeof item === "number" || typeof item === "boolean") {
                    return JSON.stringify(item);
                }
                else if (typeof item === "object") {
                    return JSON.stringify(item);
                }
                else {
                    throw new Error(`Unknown array item type: ${typeof item}`);
                }
            }).join("");
            return result;
        }
        if (typeof arg === "object") {
            const maybeFn = arg;
            if (maybeFn && typeof maybeFn.paramType === "string" && typeof maybeFn.name !== "undefined") {
                return stringifyFunction(maybeFn, maybeFn.paramType == "array" ? false : true);
            }
            return JSON.stringify(arg);
        }
        throw new Error(`Unknown argument type: ${typeof arg}`);
    }
    return fnList.map(fn => stringifyFunction(fn, false)).join("");
};
exports.functionListToString = functionListToString;
