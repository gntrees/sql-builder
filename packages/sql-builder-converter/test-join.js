import { parse } from 'pgsql-parser';

const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id';
const ast = await parse(sql);
console.log(JSON.stringify(ast, null, 2));
