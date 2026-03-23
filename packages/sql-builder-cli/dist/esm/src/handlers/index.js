export { specialNodeQuery } from './query.js';
export { specialNodeExpressions } from './expressions.js';
export { specialNodeValues } from './values.js';
export { specialNodeClauses } from './clauses.js';
export { specialNodeTransactions } from './transactions.js';
export { specialNodeWindowFunc } from './window-func.js';
// Combine all handlers
import { specialNodeQuery } from './query.js';
import { specialNodeExpressions } from './expressions.js';
import { specialNodeValues } from './values.js';
import { specialNodeClauses } from './clauses.js';
import { specialNodeTransactions } from './transactions.js';
import { specialNodeWindowFunc } from './window-func.js';
export const specialNode = {
    ...specialNodeQuery,
    ...specialNodeExpressions,
    ...specialNodeValues,
    ...specialNodeClauses,
    ...specialNodeTransactions,
    ...specialNodeWindowFunc,
};
