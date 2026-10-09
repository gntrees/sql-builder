#include "gntrees-sql-builder.h"

Builder group_by_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("x")),
        from(table("t")),
        groupBy(col("x")));
}
