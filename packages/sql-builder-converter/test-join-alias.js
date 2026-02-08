import { parse } from 'pgsql-parser';

const sql = 'SELECT u.name, o.total FROM users u LEFT JOIN orders o ON u.id = o.user_id';
const ast = await parse(sql);
console.log(JSON.stringify(ast, null, 2));
