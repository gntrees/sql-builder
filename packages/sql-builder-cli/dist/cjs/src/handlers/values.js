import { fallbackNode, normalizeNode, resolveNode, resolveNodeArray, toCamelCase } from '../utils/resolvers.js';
import functionList from '@gntrees/sql-builder-shared';
// const currentDir = dirname(fileURLToPath(import.meta.url));
// const functionListPath = resolve(currentDir, "../../../../src/generated/function-list.json");
// const functionList = JSON.parse(readFileSync(functionListPath, "utf-8")) as {
//     baseRawMethods?: string[];
//     overrideMethods?: string[];
//     keywordMethods?: string[];
//     allMethods: string[];
//     totalCount?: number;
// };
const specialNodeValues = {
    A_Const: (rawNode) => {
        let result = [];
        const node = normalizeNode("A_Const", rawNode);
        if (node.A_Const.ival) {
            result.push({
                name: node.A_Const.ival.ival?.toString() ?? "0",
                arguments: [],
                paramType: "number"
            });
        }
        if (node.A_Const.fval) {
            result.push({
                name: "r",
                arguments: [node.A_Const.fval.fval],
                paramType: "template-literal"
            });
        }
        if (node.A_Const.boolval) {
            result.push({
                name: node.A_Const.boolval ? (node.A_Const.boolval.boolval ? "true" : "false") : "",
                arguments: [],
                paramType: "boolean"
            });
        }
        if (node.A_Const.bsval) {
            result.push({
                name: node.A_Const.bsval.bsval?.toString() ?? "",
                arguments: [],
                paramType: "string"
            });
        }
        if (node.A_Const.sval) {
            result.push({
                name: node.A_Const.sval.sval?.toString() ?? "",
                arguments: [],
                paramType: "string"
            });
        }
        if (node.A_Const.isnull) {
            result.push({
                name: "NULL",
                arguments: [],
                paramType: "null"
            });
        }
        result = [
            {
                name: "l",
                arguments: result,
                paramType: "function"
            }
        ];
        return result;
    },
    String: (rawNode) => {
        const node = normalizeNode("String", rawNode);
        return [{
                name: node.String.sval || "",
                arguments: [],
                paramType: "string"
            }];
    },
    FuncCall: (rawNode) => {
        const params = [];
        const node = normalizeNode("FuncCall", rawNode);
        const result = [];
        const funcName = node.FuncCall.funcname?.map(resolveNode).flat().map((r) => r.name.toUpperCase()).join('_') || "";
        const availableFuncName = functionList.allMethods.find((f) => f === toCamelCase(funcName));
        if (!availableFuncName) {
            return fallbackNode(node);
        }
        if (node.FuncCall.agg_distinct) {
            params.push({ name: 'distinct', arguments: [], paramType: 'function' });
        }
        if (node.FuncCall.func_variadic) {
            return fallbackNode(node);
        }
        if (node.FuncCall.args && node.FuncCall.args.length > 0) {
            params.push(...resolveNodeArray(node.FuncCall.args));
        }
        if (node.FuncCall.agg_order && node.FuncCall.agg_order.length > 0) {
            params.push({
                name: 'orderBy',
                arguments: resolveNodeArray(node.FuncCall.agg_order),
                paramType: 'function'
            });
        }
        if (node.FuncCall.agg_filter) {
            params.push({
                name: 'filter',
                arguments: resolveNode(node.FuncCall.agg_filter),
                paramType: 'function'
            });
        }
        if (node.FuncCall.agg_within_group) {
            return fallbackNode(node);
        }
        if (node.FuncCall.agg_distinct) {
            return fallbackNode(node);
        }
        if (node.FuncCall.agg_star) {
            params.push({
                name: '*',
                arguments: [],
                paramType: 'string'
            });
        }
        if (node.FuncCall.funcformat) {
            if (node.FuncCall.funcformat !== "COERCE_EXPLICIT_CALL")
                return fallbackNode(node);
        }
        result.push({
            name: toCamelCase(funcName),
            arguments: params,
            paramType: "function"
        });
        if (node.FuncCall.over) {
            const child = resolveNode({ WindowDef: node.FuncCall.over });
            result.push({
                name: 'over',
                arguments: [child],
                paramType: 'function'
            });
            if (child.length == 0) {
                result.push({
                    name: "sub",
                    arguments: [],
                    paramType: "function"
                });
            }
        }
        return result;
    },
    List: (rawNode) => {
        const node = normalizeNode("List", rawNode);
        const tempFunction = {
            name: [],
            arguments: [],
            paramType: 'raw'
        };
        if (node.List.items && node.List.items.length > 0) {
            tempFunction.name = resolveNodeArray(node.List.items);
        }
        return [tempFunction];
    }
};
export { specialNodeValues };
