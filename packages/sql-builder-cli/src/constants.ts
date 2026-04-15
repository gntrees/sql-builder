import type { BoolExprType, SortByDir } from "./ast-types.js";

// Default handlers
export const DEFAULT_FORMAT_PARAM_HANDLER = 'pg';
export const DEFAULT_EXEC_HANDLER = `async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
}`;

// Join type mappings
export const JOIN_METHOD_MAP: Record<string, string> = {
    'JOIN_INNER': 'innerJoin',
    'JOIN_LEFT': 'leftJoin',
    'JOIN_RIGHT': 'rightJoin',
    'JOIN_FULL': 'fullJoin',
    'JOIN_CROSS': 'crossJoin',
};

// Boolean operator mappings
export const BOOL_OP_METHOD: Record<BoolExprType, string> = {
    'AND_EXPR': 'and',
    'OR_EXPR': 'or',
    'NOT_EXPR': 'not',
};

// Sort direction mappings
export const SORT_DIR_METHOD: Record<SortByDir, string | null> = {
    'SORTBY_ASC': 'asc',
    'SORTBY_DESC': 'desc',
    'SORTBY_DEFAULT': null, // No explicit direction, use default
    'SORTBY_USING': 'using', // For custom operator sorting
};

// Nulls ordering mappings
export const SORTBY_NULLS_METHOD: Record<string, string | null> = {
    'SORTBY_NULLS_FIRST': 'nullsFirst',
    'SORTBY_NULLS_LAST': 'nullsLast',
    'SORTBY_NULLS_DEFAULT': null, // PostgreSQL default is NULLS LAST for ASC, NULLS FIRST for DESC
};

// Set operation mappings
export const SET_OP_METHOD: Record<string, string> = {
    'SETOP_UNION': 'union',
    'SETOP_INTERSECT': 'intersect',
    'SETOP_EXCEPT': 'except',
};

// Locking clause strength mappings
export const LOCK_STRENGTH_METHOD: Record<string, string> = {
    'LCS_FORUPDATE': 'forUpdate',
    'LCS_FORSHARE': 'forShare',
    'LCS_FORKEYSHARE': 'forKeyShare',
    'LCS_FORNOKEYUPDATE': 'forNoKeyUpdate',
};

// Locking clause wait policy mappings
export const LOCK_WAIT_POLICY: Record<string, 'nowait' | 'skipLocked'> = {
    'LockWaitSkip': 'skipLocked',
    'LockWaitError': 'nowait',
};
