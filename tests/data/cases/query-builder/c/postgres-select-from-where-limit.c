#include "gntrees-sql-builder.h"

Builder postgres_select_from_where_limit_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(col("active"), eq(true))),
        limit(10));
}
