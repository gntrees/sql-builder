import { parse } from 'pgsql-parser';

const sql = 'SELECT COUNT(*), AVG(price) FROM products';
const ast = await parse(sql);
console.log(JSON.stringify(ast, null, 2));
