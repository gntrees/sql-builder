#include "gntrees-sql-builder.h"

Builder postgres_from_subquery_with_alias_schema(void) {
    Builder fromSub = ch(select(col("id")), from(table("users")), as("u"));
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(fromSub));
}
