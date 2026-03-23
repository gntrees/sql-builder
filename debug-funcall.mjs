import { parse } from 'pgsql-parser';
import { specialNodeValues } from './packages/sql-builder-cli/dist/src/handlers/values.js';
import { specialNode } from './packages/sql-builder-cli/dist/src/handlers/index.js';

const sql = 'SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rn FROM users';
const ast = await parse(sql);

const targetList = ast.stmts[0].stmt.SelectStmt.targetList;
const funcCallNode = targetList[0].ResTarget.val;

console.log('FuncCall node:', JSON.stringify(funcCallNode, null, 2));

const result = specialNodeValues.FuncCall(funcCallNode);
console.log('FuncCall result:', JSON.stringify(result, null, 2));
