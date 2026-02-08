import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

// Test 1: simple from
const query1 = q.select("*").from("users");
console.log("Test 1:", query1.getSql());

// Test 2: try with AS
try {
    const query2 = q.select("*").from(q.r`users AS u`);
    console.log("Test 2:", query2.getSql());
} catch (e) {
    console.log("Test 2 error:", e.message);
}

// Test 3: try from with as chained
try {
    const query3 = q.select("*").from(q.r`users`).as("u");
    console.log("Test 3:", query3.getSql());
} catch (e) {
    console.log("Test 3 error:", e.message);
}
