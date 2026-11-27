#include "gntrees-sql-builder.h"

Builder postgres_aliased_columns_and_tables_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(ch(col("x"), as("alias"))),
        from(ch(table("users"), as("u"))),
        join(ch(table("posts"), as("p")), ch(col("u.id"), eq(ch(col("p.uid"))))));
}
