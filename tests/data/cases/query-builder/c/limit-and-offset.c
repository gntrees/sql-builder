#include "gntrees-sql-builder.h"

Builder limit_and_offset_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("t")),
        limit(5),
        offset(10));
}
