#include "gntrees-sql-builder.h"

Builder postgres_generic_operator_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        where(ch(col("a"), op("~", "x"))));
}
