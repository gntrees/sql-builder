#include "gntrees-sql-builder.h"

Builder is_null_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), isNull())));
}
