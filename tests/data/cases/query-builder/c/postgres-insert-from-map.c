#include "gntrees-sql-builder.h"

Builder postgres_insert_from_map_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        insert(table("users"), map(entry("name", "bob"))));
}
