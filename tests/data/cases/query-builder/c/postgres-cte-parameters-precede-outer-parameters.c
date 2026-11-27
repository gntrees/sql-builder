#include "gntrees-sql-builder.h"

Builder postgres_cte_parameters_precede_outer_parameters_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        with(ch(select(col("id")), from(table("users")), where(ch(col("active"), eq(true)))), "cte"),
        select(col("id")),
        from(table("cte")),
        where(ch(col("id"), gt(5))));
}
