import { parse } from 'pgsql-parser';

const sql1 = 'SELECT * FROM users u CROSS JOIN products p';
const sql2 = 'SELECT * FROM users u INNER JOIN products p ON u.id = p.user_id';
const ast1 = await parse(sql1);
const ast2 = await parse(sql2);

console.log("CROSS JOIN keys:", Object.keys(ast1.stmts[0].stmt.SelectStmt.fromClause[0].JoinExpr));
console.log("INNER JOIN keys:", Object.keys(ast2.stmts[0].stmt.SelectStmt.fromClause[0].JoinExpr));
console.log("\nCROSS JOIN full:", JSON.stringify(ast1.stmts[0].stmt.SelectStmt.fromClause[0].JoinExpr, null, 2));
