const q = sqlBuilder({formatParamHandler: "pg",execHandler: async ({ sql, parameters, meta }) => { return { sql, parameters }; }});const query = q
  .select(q.i(`u.name`), q.count(q.i(`o.id`)).as(`order_count`))
  .from(q.r`users AS u`)
  .leftJoin(q.r`orders AS o`, q.r`u.id = o.user_id`)
  .where(q.r`u.active = true`)
  .groupBy(q.i(`u.name`))
  .having(q.r`count(o.id) > 0`)
  .orderBy(q.desc(q.c(`order_count`)));return query;