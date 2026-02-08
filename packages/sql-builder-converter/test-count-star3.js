import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

// Test 1: with *
const query1 = q.select(q.count(q.r`*`), q.avg(q.c(`price`))).from(`products`);
console.log("Test 1:", query1.getSql());

// Test 2: with literal
const query2 = q.select(q.count(q.l("*")), q.avg(q.c(`price`))).from(`products`);
console.log("Test 2:", query2.getSql());

// Test 3: direct count
const query3 = q.select(q.count(), q.avg(q.c(`price`))).from(`products`);
console.log("Test 3:", query3.getSql());
