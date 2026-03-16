import type { Node } from "../../src/ast-types";

export interface LocationResult {
    start: number;
    end: number;
    sql: string;
}

/**
 * Extracts location information for a node at a specific index in a node array.
 *
 * @param nodes - Array of AST nodes
 * @param index - Index of the node to extract location from
 * @param sql - Original SQL string
 * @returns Object containing start, end positions and the extracted SQL substring
 */
export function getLocationsNodeArray(
    nodes: Node[],
    index: number,
    sql: string
): LocationResult {
    const node = nodes[index];
    if (!node) {
        return { start: 0, end: 0, sql: "" };
    }

    // Get the location from the current node
    const location = getNodeLocation(node);
    const start = location ?? 0;

    // Determine the end position
    let end: number;
    if (index + 1 < nodes.length) {
        const nextNode = nodes[index + 1];
        const nextLocation = nextNode ? getNodeLocation(nextNode) : undefined;
        end = nextLocation ?? sql.length;
    } else {
        end = sql.length;
    }

    // Extract the SQL substring
    const extractedSql = sql.substring(start, end);

    return { start, end, sql: extractedSql };
}

/**
 * Extracts the location property from a Node.
 * Nodes are discriminated unions with a single property key.
 *
 * @param node - AST node
 * @returns Location number if found, undefined otherwise
 */
function getNodeLocation(node: Node): number | undefined {
    const nodeKey = Object.keys(node)[0] as keyof Node;
    const nodeValue = node[nodeKey];

    if (nodeValue && typeof nodeValue === "object") {
        if (nodeValue['location']) {
            return nodeValue['location'] as number;
        } else if (nodeValue['stmt_location']) {
            return nodeValue['stmt_location'] as number;
        }
    }

    return undefined;
}
