import type { FunctionListType } from '../types.ts';

export const functionListToString = (fnList: FunctionListType[], baseQueryBuilder: string): string => {
    const INDENT = "    ";

    function stringifyFunction(fn: FunctionListType, asExpression = false): string {
        const emitPrefix = asExpression ? `${baseQueryBuilder}` : '';
        if (fn.paramType === "function") {
            const argsArr = fn.arguments.map(stringifyArg);
            const args = argsArr.join(", ");
            const body = `${fn.name}(${args})`;
            return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
        } else if (fn.paramType === "array") {
            // Support array literal paramType: produce [item1, item2, ...]
            const itemsSource = Array.isArray(fn.name)
            ? fn.name
            : null
            if (!itemsSource) {
                throw new Error(`Invalid array paramType: name should be an array, got ${typeof fn.name}`);
            }
            const items = itemsSource.map((item: any) => stringifyArg(item)).join(", ");
            return asExpression ? `${emitPrefix}[${items}]` : `[${items}]`;
        } else if (fn.paramType === "template-literal") {
            const parts = (fn.arguments || []).map((raw: any, idx: number) => {
                const isEven = ((idx + 1) % 2) === 0;
                if (typeof raw === "string") {
                    const escaped = raw.replace(/`/g, "\\`").replace(/\\/g, "\\\\");
                    return isEven ? `\${\`${escaped}\`}` : `${escaped}`;
                }
                const s = stringifyArg(raw);
                if (isEven) {                    
                    // embed as expression
                    return `\${${s}}`;
                } else {
                    // plain literal part: if s is a quoted/string-literal, strip surrounding quotes/backticks
                    const m = /^([`"'])([\s\S]*)\1$/.exec(s);
                    return m ? m[2] : s;
                }
            });
            const content = parts.join("");
            return asExpression ? `${emitPrefix}.${fn.name}\`${content}\`` : `.${fn.name}\`${content}\``;
        } else if (fn.paramType === "string") {
            const content = (fn.name || "").toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return `\`${content}\``;
        } else if (fn.paramType === "object") {
            const content = Object.entries(fn.name as Record<string, any>).map(([key, value]) => {
                const valueStr = stringifyArg(value);
                return `${key}: ${valueStr}`;
            }).join(", ");
            return asExpression ? `${emitPrefix}{${content}}` : `{${content}}`;
        } else if (fn.paramType === "undefined") {
            return "undefined";
        } else if (fn.paramType === "number" || fn.paramType === "boolean" || fn.paramType === "null") {
            const contentRaw = fn.paramType === "null" ? "null" : (fn.name ?? "");
            const content = contentRaw.toString().replace(/`/g, "\\`").replace(/\\/g, "\\\\");
            return asExpression ? `${content}` : `${content}`;
        } else if (fn.paramType === "raw") {
            const content = Array.isArray(fn.name)
                ? fn.name.map((item: any) => (typeof item === "string" ? item : stringifyArg(item))).join(", ")
                : (typeof fn.name === "string" ? fn.name : stringifyArg(fn.name));
            return content;
        } else {
            throw new Error(`Unknown paramType: ${(fn as any).paramType}`);
        }
    }

    function stringifyArg(arg: any): string {
        if (typeof arg === "string") {
            return `\`${arg.replace(/`/g, "\\`").replace(/\\/g, "\\\\")}\``;
        }
        if (arg === null || arg === undefined || typeof arg === "number" || typeof arg === "boolean") {
            return JSON.stringify(arg);
        }
        if (Array.isArray(arg)) {
            const result = arg.map((item, index) => {
                if (typeof item === 'object' && 'name' in item && 'paramType' in item) {
                    const parts = item as FunctionListType[];
                    return stringifyFunction(item, index === 0);
                } else if (Array.isArray(item)) {
                    return stringifyArg(item);
                } else if (typeof item === "string") {
                    return `\`${item.replace(/`/g, "\\`").replace(/\\/g, "\\\\")}\``;
                } else if (item === null || item === undefined || typeof item === "number" || typeof item === "boolean") {
                    return JSON.stringify(item);
                } else if (typeof item === "object") {
                    return JSON.stringify(item);
                } else {
                    throw new Error(`Unknown array item type: ${typeof item}`);
                }
            }).join("");
            return result;
        }
        if (typeof arg === "object") {
            const maybeFn = arg as FunctionListType;
            if (maybeFn && typeof maybeFn.paramType === "string" && typeof maybeFn.name !== "undefined") {
                return stringifyFunction(maybeFn, maybeFn.paramType == "array" ? false : true);
            }
            return JSON.stringify(arg);
        }
        throw new Error(`Unknown argument type: ${typeof arg}`);
    }

    return fnList.map(fn => stringifyFunction(fn, false)).join("");
};
