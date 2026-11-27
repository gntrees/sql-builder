#include "gntrees-sql-builder.h"

Builder postgres_exists_subquery_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(exists(ch(select(col("id")), from(table("posts")), where(ch(col("posts.user_id"), eq(ch(col("users.id"))))))))));
}
