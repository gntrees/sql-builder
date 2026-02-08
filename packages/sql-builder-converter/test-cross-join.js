import { parse } from 'pgsql-parser';

const sql = 'SELECT * FROM users u CROSS JOIN products p';
const ast = await parse(sql);
console.log(JSON.stringify(ast, null, 2));
