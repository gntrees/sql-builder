#include "gntrees-sql-builder.h"

Builder postgres_scalar_subquery_with_alias_schema(void) {
    Builder scalarSub = ch(select(col("cnt")), from(table("t")), as("c"));
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(scalarSub),
        from(table("u")));
}
