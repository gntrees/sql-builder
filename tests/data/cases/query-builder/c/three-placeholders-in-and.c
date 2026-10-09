#include "gntrees-sql-builder.h"

Builder three_placeholders_in_and_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(col("id")),
        where(ch(and(arr(
            ch(col("a"), eq(1)),
            ch(col("b"), eq(2)),
            ch(col("c"), eq(3)))))));
}
