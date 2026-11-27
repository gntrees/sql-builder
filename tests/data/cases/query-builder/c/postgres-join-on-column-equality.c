#include "gntrees-sql-builder.h"

Builder postgres_join_on_column_equality_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        join(table("posts"), ch(col("users.id"), eq(ch(col("posts.user_id"))))));
}
