import type { WindowDef } from '../ast-types.js';
import type { FunctionListType } from '../types.ts';
import { normalizeNode, resolveNode, resolveNodeArray } from '../utils/resolvers.js';

const specialNodeWindowFunc: Record<string, (node: any) => FunctionListType[]> = {

    WindowDef: (rawNode): FunctionListType[] => {
        let result: FunctionListType[] = [];
        const node = normalizeNode<WindowDef, "WindowDef">("WindowDef", rawNode);

        if (node.WindowDef.partitionClause && node.WindowDef.partitionClause.length > 0) {
            result.push({
                name: 'partitionBy',
                arguments: [resolveNodeArray(node.WindowDef.partitionClause)],
                paramType: 'function'
            });
        }
        if (node.WindowDef.orderClause && node.WindowDef.orderClause.length > 0) {
            result.push({
                name: 'orderBy',
                arguments: [resolveNodeArray(node.WindowDef.orderClause)],
                paramType: 'function'
            });
        }
        if (node.WindowDef.frameOptions !== undefined && node.WindowDef.startOffset && node.WindowDef.endOffset) {
            result.push(
                {
                    name: "rows",
                    arguments: [],
                    paramType: "function"
                },
                {
                    name: "between",
                    arguments: [
                        ...resolveNode(node.WindowDef.startOffset),
                    ],
                    paramType: "function"
                },
                {
                    name: "preceding",
                    arguments: [],
                    paramType: "function"
                },
                {
                    name: "and",
                    arguments: [],
                    paramType: "function"
                },
                {
                    name: "l",
                    arguments: [
                        ...resolveNode(node.WindowDef.endOffset),
                    ],
                    paramType: "function"
                },
                {
                    name: "following",
                    arguments: [],
                    paramType: "function"
                }
            )
        }
        if (node.WindowDef.name) {
            result = [
                {
                    name: "i",
                    arguments: [node.WindowDef.name],
                    paramType: "function"
                },
                {
                    name: "as",
                    arguments: [result],
                    paramType: "function"
                }
            ]
        }

        return result
    }
};

export { specialNodeWindowFunc };
