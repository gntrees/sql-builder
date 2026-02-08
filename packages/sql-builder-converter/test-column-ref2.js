import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

// Test i() with single string
const query1 = q.select(q.i("u.name")).from("users AS u");
console.log("Test 1:", query1.getSql());

// Test i() with multiple strings
try {
    const query2 = q.select(q.i("u", "name")).from("users AS u");
    console.log("Test 2:", query2.getSql());
} catch (e) {
    console.log("Test 2 error:", e.message);
}
