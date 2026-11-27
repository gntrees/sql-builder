#include "gntrees-sql-builder.h"

Builder mysql_nested_subquery_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(col("id")),
        where(ch(col("id"), in(ch(select(col("uid")), from(table("m")), where(ch(col("uid"), in(ch(select(col("id")), from(table("b")), where(ch(col("ok"), eq(true))))))))))));
}
