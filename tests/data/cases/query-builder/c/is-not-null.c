#include "gntrees-sql-builder.h"

Builder is_not_null_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), isNotNull())));
}
