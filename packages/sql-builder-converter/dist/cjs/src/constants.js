"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCK_WAIT_POLICY = exports.LOCK_STRENGTH_METHOD = exports.SET_OP_METHOD = exports.SORTBY_NULLS_METHOD = exports.SORT_DIR_METHOD = exports.BOOL_OP_METHOD = exports.JOIN_METHOD_MAP = exports.DEFAULT_EXEC_HANDLER = exports.DEFAULT_FORMAT_PARAM_HANDLER = void 0;
// Default handlers
exports.DEFAULT_FORMAT_PARAM_HANDLER = 'pg';
exports.DEFAULT_EXEC_HANDLER = `async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
}`;
// Join type mappings
exports.JOIN_METHOD_MAP = {
    'JOIN_INNER': 'innerJoin',
    'JOIN_LEFT': 'leftJoin',
    'JOIN_RIGHT': 'rightJoin',
    'JOIN_FULL': 'fullJoin',
    'JOIN_CROSS': 'crossJoin',
};
// Boolean operator mappings
exports.BOOL_OP_METHOD = {
    'AND_EXPR': 'and',
    'OR_EXPR': 'or',
    'NOT_EXPR': 'not',
};
// Sort direction mappings
exports.SORT_DIR_METHOD = {
    'SORTBY_ASC': 'asc',
    'SORTBY_DESC': 'desc',
    'SORTBY_DEFAULT': null, // No explicit direction, use default
    'SORTBY_USING': 'using', // For custom operator sorting
};
// Nulls ordering mappings
exports.SORTBY_NULLS_METHOD = {
    'SORTBY_NULLS_FIRST': 'nullsFirst',
    'SORTBY_NULLS_LAST': 'nullsLast',
    'SORTBY_NULLS_DEFAULT': null, // PostgreSQL default is NULLS LAST for ASC, NULLS FIRST for DESC
};
// Set operation mappings
exports.SET_OP_METHOD = {
    'SETOP_UNION': 'union',
    'SETOP_INTERSECT': 'intersect',
    'SETOP_EXCEPT': 'except',
};
// Locking clause strength mappings
exports.LOCK_STRENGTH_METHOD = {
    'LCS_FORUPDATE': 'forUpdate',
    'LCS_FORSHARE': 'forShare',
    'LCS_FORKEYSHARE': 'forKeyShare',
    'LCS_FORNOKEYUPDATE': 'forNoKeyUpdate',
};
// Locking clause wait policy mappings
exports.LOCK_WAIT_POLICY = {
    'LockWaitSkip': 'skipLocked',
    'LockWaitError': 'nowait',
};
