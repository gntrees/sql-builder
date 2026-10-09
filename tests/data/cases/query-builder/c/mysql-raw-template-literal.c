#include "gntrees-sql-builder.h"

Builder mysql_raw_template_literal_schema(void) {
    return sqlBuilder(
        variableName("q"),
        setDialect("mysql"),
        raw("SELECT ", col("id"), " FROM ", table("t")));
}
