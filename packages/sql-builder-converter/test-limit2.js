import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

// Test with raw
const query1 = q.select(q.c(q.r`*`)).from(`users`).limit(q.r`10`);
console.log("Test 1:", query1.getSql());

// Test with literal
const query2 = q.select(q.c(q.r`*`)).from(`users`).limit(q.l(10));
console.log("Test 2:", query2.getSql());
