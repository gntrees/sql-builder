import { parse } from 'pgsql-parser';
const ast = await parse('SELECT ROW_NUMBER() OVER (ORDER BY created_at) FROM users');
console.log(JSON.stringify(ast, null, 2));
