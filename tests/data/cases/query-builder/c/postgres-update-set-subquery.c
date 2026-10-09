#include "gntrees-sql-builder.h"

Builder postgres_update_set_subquery_schema(void) {
    Builder setSub = ch(select(col("id")), from(table("b")));
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        update(table("t"), map(entry("x", setSub))));
}
