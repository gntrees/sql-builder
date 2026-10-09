#include "gntrees-sql-builder.h"

Builder postgres_values_tuples_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        values(arr(arr("a", "b"), arr("c", "d"))));
}
