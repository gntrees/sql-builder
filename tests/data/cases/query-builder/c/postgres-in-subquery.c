#include "gntrees-sql-builder.h"

Builder postgres_in_subquery_schema(void) {
    Builder inSub = ch(select(col("uid")), from(table("members")));
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(col("id"), in(inSub))));
}
