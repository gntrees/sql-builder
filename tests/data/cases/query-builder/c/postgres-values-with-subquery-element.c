#include "gntrees-sql-builder.h"

Builder postgres_values_with_subquery_element_schema(void) {
    Builder valSub = ch(select(col("id")), from(table("b")));
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        values(arr(arr(valSub, 1))));
}
