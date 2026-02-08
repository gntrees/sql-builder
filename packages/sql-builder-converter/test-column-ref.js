import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

// Test 1: simple column
const query1 = q.select(q.c("name")).from("users");
console.log("Test 1:", query1.getSql());

// Test 2: qualified column with string
try {
    const query2 = q.select(q.c("u.name")).from("users AS u");
    console.log("Test 2:", query2.getSql());
} catch (e) {
    console.log("Test 2 error:", e.message);
}

// Test 3: qualified column with raw
try {
    const query3 = q.select(q.c(q.r`u.name`)).from("users AS u");
    console.log("Test 3:", query3.getSql());
} catch (e) {
    console.log("Test 3 error:", e.message);
}

// Test 4: qualified column using i()
try {
    const query4 = q.select(q.i("u.name")).from("users AS u");
    console.log("Test 4:", query4.getSql());
} catch (e) {
    console.log("Test 4 error:", e.message);
}
