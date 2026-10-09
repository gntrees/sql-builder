#include "gntrees-sql-builder.h"

Builder postgres_exists_subquery_parameter_order_schema(void) {
    Builder orderSub = ch(select(col("id")), from(table("orders")), where(ch(col("total"), gt(100))));
    return sqlBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col("id")),
        from(table("users")),
        where(ch(exists(orderSub))),
        where(ch(col("active"), eq(true))));
}
