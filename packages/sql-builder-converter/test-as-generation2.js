// Simulate what stringifyFunction does
const INDENT = "    ";

function stringifyFunction(fn, asExpression = false) {
    const baseQueryBuilder = 'q';
    const emitPrefix = asExpression ? `${baseQueryBuilder}` : '';
    if (fn.paramType === "function") {
        const argsArr = fn.arguments.map(a => stringifyArg(a));
        const args = argsArr.join(", ");
        const body = `${fn.name}(${args})`;
        return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
    } else if (fn.paramType === "template-literal") {
        const raw = fn.arguments[0];
        const content = typeof raw === "string" ? raw.replace(/`/g, "\\`") : raw;
        return asExpression ? `${emitPrefix}.${fn.name}\`${content}\`` : `.${fn.name}\`${content}\``;
    }
    return '';
}

function stringifyArg(arg) {
    if (typeof arg === "string") {
        return `\`${arg}\``;
    }
    if (arg === null || arg === undefined || typeof arg === "number" || typeof arg === "boolean") {
        return JSON.stringify(arg);
    }
    if (typeof arg === "object") {
        if (arg.name && arg.paramType) {
            const res = stringifyFunction(arg, true);
            if (res.includes("\n")) {
                return res.split("\n").map((line, i) => (i === 0 ? line : INDENT + line)).join("\n");
            }
            return res;
        }
        return JSON.stringify(arg);
    }
    return JSON.stringify(arg);
}

// Test desc
const descExpr = { name: 'desc', arguments: [{name: 'c', arguments: ['name'], paramType: 'function'}], paramType: 'function' };
console.log("desc:", stringifyFunction(descExpr, true));

// Test as - template literal
const asExpr = { name: 'as', arguments: [{name: 'r', arguments: ['(SELECT COUNT(*) FROM orders)'], paramType: 'template-literal'}, 'alias'], paramType: 'function' };
console.log("as:", stringifyFunction(asExpr, true));
