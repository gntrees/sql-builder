#include "gntrees-sql-builder.h"

Builder postgres_insert_subquery_value_schema(void) {
    Builder insSub = ch(select(col("id")), from(table("b")));
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        insert(table("t"), map(entry("x", insSub))));
}
