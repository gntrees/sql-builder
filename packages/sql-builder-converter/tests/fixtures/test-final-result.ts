import { sqlBuilder } from "@gntrees/sql-builder";

const q = sqlBuilder({
  formatParamHandler: "pg",
  execHandler: async ({ sql, parameters, meta }): Promise<any> => {
    return "Executed";
  },
});

const query = q.select(
  q.c(`service`),
  q.c(`sub_service`),
  q.c(`sla`),
  q.count(1),
  q.round(q.avg(q.c(`spend_hours`))),
  q.round(
    q.r`((count(1) FILTER (WHERE NOT (is_late)))::numeric / (count(1))::numeric) * 100`,
    2,
  ),
  q.round(
    q.r`((count(1) FILTER (WHERE is_late))::numeric / (count(1))::numeric) * 100`,
    2,
  ),
);
console.log(query.getSql());
