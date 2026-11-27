#include "gntrees-sql-builder.h"

Builder between_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), between(1, 2))));
}
