#include "gntrees-sql-builder.h"

Builder postgres_on_conflict_do_update_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        insert(table("t"), map(entry("name", "x"))),
        onConflictDoUpdate(col("id"), map(entry("name", "y"))));
}
