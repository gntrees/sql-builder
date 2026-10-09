#include "gntrees-sql-builder.h"

Builder in_with_literal_list_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        where(ch(col("x"), in("1,2,3"))));
}
