#include "gntrees-sql-builder.h"

Builder postgres_single_cte_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        with(ch(select(col("id")), from(table("users"))), "cte"),
        select(col("id")),
        from(table("cte")));
}
