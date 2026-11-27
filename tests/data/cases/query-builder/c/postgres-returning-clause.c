#include "gntrees-sql-builder.h"

Builder postgres_returning_clause_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("t")),
        returning(col("id")));
}
