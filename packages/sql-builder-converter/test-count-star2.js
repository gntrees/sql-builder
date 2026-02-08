import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; },
});

const query = q.select(q.count(`*`), q.avg(q.c(`price`))).from(`products`);
console.log("SQL:", query.getSql());
console.log("Parameters:", query.getParameters());
