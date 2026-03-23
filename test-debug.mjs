import { parse } from 'pgsql-parser';
import { normalizeNode } from './packages/sql-builder-cli/dist/src/utils/resolvers.js';

const sql = 'SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rn FROM users';
const ast = await parse(sql);

const targetList = ast.stmts[0].stmt.SelectStmt.targetList;
const funcCall = targetList[0].ResTarget.val.FuncCall;

console.log('FuncCall:', JSON.stringify(funcCall, null, 2));

const normalized = normalizeNode(funcCall, 'FuncCall');
console.log('Normalized:', JSON.stringify(normalized, null, 2));

console.log('Has over?', !!normalized.FuncCall.over);
console.log('Over:', JSON.stringify(normalized.FuncCall.over, null, 2));
