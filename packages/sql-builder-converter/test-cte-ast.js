import { parse } from 'pgsql-parser';

const sql = 'WITH ranked_users AS (SELECT *, ROW_NUMBER() OVER (ORDER BY created_at) AS rn FROM users) SELECT * FROM ranked_users';
const ast = await parse(sql);
console.log(JSON.stringify(ast, null, 2));
