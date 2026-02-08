const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(
    q.c(`service`),
    q.c(`sub_service`),
    q.c(`sla`),
    q.count(1).as(`jumlah_keluhan`),
    q.round(q.avg(q.c(`spend_hours`))).as(`rata_rata_jam`),
    q
      .round(
        q.r`((count(1) FILTER (WHERE NOT (is_late)))::numeric / (count(1))::numeric) * 100`,
        2,
      )
      .as(`close_sesuai_target`),
    q
      .round(
        q.r`((count(1) FILTER (WHERE is_late))::numeric / (count(1))::numeric) * 100`,
        2,
      )
      .as(`close_tidak_sesuai_target`),
  )
  .groupBy(q.c(`service`), q.c(`sub_service`), q.c(`sla`))
  .orderBy(1);return query;