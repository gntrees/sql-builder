import { parse } from 'pgsql-parser';

const sql = 'SELECT * FROM users LIMIT 10';
const ast = await parse(sql);
console.log(JSON.stringify(ast, null, 2));
