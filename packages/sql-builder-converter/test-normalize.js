import { normalizeSql } from './tests/utils/normalize-sql.ts';

const input = "SELECT u.name, o.total FROM users u LEFT JOIN orders o ON u.id = o.user_id";
const output = "SELECT u.name, o.total FROM users AS u LEFT JOIN orders AS o ON u.id = o.user_id";

console.log("Normalized input:", normalizeSql(input));
console.log("Normalized output:", normalizeSql(output));
console.log("Match:", normalizeSql(input) === normalizeSql(output));
