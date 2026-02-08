import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

// Test alias on raw expression
const query1 = q.select(q.r`(SELECT COUNT(*) FROM orders)`.as('total_orders'));
console.log("Test 1:", query1.getSql());

// Test alias on column
const query2 = q.select(q.c('name').as('user_name')).from('users');
console.log("Test 2:", query2.getSql());
