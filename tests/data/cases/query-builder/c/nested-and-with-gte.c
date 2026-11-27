#include "gntrees-sql-builder.h"

Builder nested_and_with_gte_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(and(arr(
            ch(col("age"), gte(18)),
            ch(col("active"), eq(true)))))));
}
