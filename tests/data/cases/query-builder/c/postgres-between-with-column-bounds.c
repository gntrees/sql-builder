#include "gntrees-sql-builder.h"

Builder postgres_between_with_column_bounds_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), between(ch(col("lo")), ch(col("hi"))))));
}
