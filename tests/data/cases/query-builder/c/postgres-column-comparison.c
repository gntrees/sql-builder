#include "gntrees-sql-builder.h"

Builder postgres_column_comparison_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(col("a"), eq(ch(col("b"))))));
}
