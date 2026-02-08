import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

// What q.as(q.r`...`, 'alias') generates
try {
    const query1 = q.select(q.as(q.r`(SELECT COUNT(*) FROM orders)`, 'total_orders'));
    console.log("q.as(q.r...):", query1.getSql());
} catch (e) {
    console.log("q.as error:", e.message);
}

// What q.r`...`.as('alias') generates
try {
    const query2 = q.select(q.r`(SELECT COUNT(*) FROM orders)`.as('total_orders'));
    console.log("q.r`...`.as():", query2.getSql());
} catch (e) {
    console.log("q.r.as error:", e.message);
}
