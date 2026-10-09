#include "gntrees-sql-builder.h"

Builder order_by_multiple_directions_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(col("x")),
        from(table("t")),
        orderBy(arr(ch(col("name"), asc()), ch(col("age"), desc()))));
}
