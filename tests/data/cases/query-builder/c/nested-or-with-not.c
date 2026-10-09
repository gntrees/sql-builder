#include "gntrees-sql-builder.h"

Builder nested_or_with_not_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(col("id")),
        from(table("users")),
        where(ch(or(arr(
            ch(col("a"), eq(1)),
            not(ch(col("b"), eq(2))))))));
}
