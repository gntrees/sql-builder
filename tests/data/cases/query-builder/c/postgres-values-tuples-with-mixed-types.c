#include "gntrees-sql-builder.h"

Builder postgres_values_tuples_with_mixed_types_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        values(arr(arr("a", 1), arr("b", 2))));
}
