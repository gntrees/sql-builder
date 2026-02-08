import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

const query = q.select(q.c(q.r`*`)).from(`users`).limit(10);
console.log("SQL:", query.getSql());
console.log("Parameters:", query.getParameters());
