#include "gntrees-sql-builder.h"

Builder mysql_multi_column_with_order_desc_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(arr(col("id"), col("name"))),
        from(table("users")),
        where(ch(col("age"), gte(18))),
        orderBy(ch(col("name"), desc())));
}
