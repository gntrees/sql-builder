import type { Node, SortBy } from '../ast-types.js';
import { SORT_DIR_METHOD, SORTBY_NULLS_METHOD } from '../constants.js';
import type { FunctionListType } from '../types.ts';
import { fallbackNode, normalizeNode, resolveNode, resolveNodeArray } from '../utils/resolvers.js';

const specialNodeClauses = {
    SortBy: (rawNode: any): FunctionListType[] => {
        const result: FunctionListType[] = [];
        const node = normalizeNode<SortBy, "SortBy">("SortBy", rawNode);

        if (node.SortBy.useOp) return fallbackNode(node);
        if (node.SortBy.node) {
            const resolvedNode = resolveNode(node.SortBy.node).map(func => {
                if ([ "string" ,"number" ,"boolean" ,"null"].includes(func.paramType)) {
                    return {
                        paramType: "function",
                        name: "l",
                        arguments: [func],
                    } as FunctionListType;
                } else 
                return func;
            });
            result.push(...resolvedNode);
        }
        if (node.SortBy.sortby_dir) {
            const methodName = SORT_DIR_METHOD[node.SortBy.sortby_dir];
            if (methodName) {
                result.push({
                    name: methodName,
                    arguments: [],
                    paramType: 'function'
                });
            }
        }
        if (node.SortBy.sortby_nulls) {
            const nullsMethodName = SORTBY_NULLS_METHOD[node.SortBy.sortby_nulls];
            if (nullsMethodName) {
                result.push({
                    name: nullsMethodName,
                    arguments: [],
                    paramType: 'function'
                });
            }
        }

        return result;

    }
};

export { specialNodeClauses };
