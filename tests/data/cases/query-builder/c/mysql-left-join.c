#include "gntrees-sql-builder.h"

Builder mysql_left_join_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(col("id")),
        from(table("users")),
        leftJoin(table("posts"), ch(col("users.id"), eq(ch(col("posts.user_id"))))));
}
