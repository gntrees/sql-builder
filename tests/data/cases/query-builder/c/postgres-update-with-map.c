#include "gntrees-sql-builder.h"

Builder postgres_update_with_map_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        update(table("users"), map(entry("name", "bob"), entry("age", 3))));
}
