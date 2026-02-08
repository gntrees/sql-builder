// Simulate what stringifyFunction does
function stringifyFunction(fn, asExpression = false) {
    const baseQueryBuilder = 'q';
    const emitPrefix = asExpression ? `${baseQueryBuilder}` : '';
    if (fn.paramType === "function") {
        const argsArr = fn.arguments.map(a => stringifyArg(a));
        const args = argsArr.join(", ");
        const body = `${fn.name}(${args})`;
        return asExpression ? `${emitPrefix}.${body}` : `.${body}`;
    }
    return '';
}

function stringifyArg(arg) {
    if (typeof arg === "string") {
        return `\`${arg}\``;
    }
    if (typeof arg === "object" && arg !== null) {
        if (arg.name && arg.paramType) {
            const res = stringifyFunction(arg, true);
            return res;
        }
        return JSON.stringify(arg);
    }
    return JSON.stringify(arg);
}

// Test desc
const descExpr = { name: 'desc', arguments: [{name: 'c', arguments: ['name'], paramType: 'function'}], paramType: 'function' };
console.log("desc:", stringifyFunction(descExpr, true));

// Test as
const asExpr = { name: 'as', arguments: [{name: 'r', arguments: ['(SELECT COUNT(*) FROM orders)'], paramType: 'template-literal'}, 'alias'], paramType: 'function' };
console.log("as:", stringifyFunction(asExpr, true));
