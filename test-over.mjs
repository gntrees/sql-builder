import { convert } from './packages/sql-builder-cli/dist/index.mjs';

const sql = 'SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rn FROM users';
const result = await convert(sql);
console.log('Generated code:');
console.log(result.formatted);
console.log('\nFunction list:');
console.log(JSON.stringify(result.functionList, null, 2));
