#include "gntrees-sql-builder.h"

Builder postgres_delete_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        delete(table("users")));
}
