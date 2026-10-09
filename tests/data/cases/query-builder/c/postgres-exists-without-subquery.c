#include "gntrees-sql-builder.h"

Builder postgres_exists_without_subquery_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        where(ch(exists(col("x")))));
}
