import { parse } from 'pgsql-parser';

const sql = 'SELECT (SELECT COUNT(*) FROM orders) AS total_orders';
const ast = await parse(sql);
console.log(JSON.stringify(ast, null, 2));
