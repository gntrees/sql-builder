#include "gntrees-sql-builder.h"

Builder postgres_transaction_block_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        transaction(arr(insert(table("t"), map(entry("a", 1))), insert(table("u"), map(entry("b", 2))))));
}
