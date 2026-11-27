#include "gntrees-sql-builder.h"

Builder postgres_group_by_having_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("x")),
        from(table("t")),
        groupBy(col("x")),
        having(ch(col("count"), gt(1))));
}
