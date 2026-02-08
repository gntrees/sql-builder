import { QueryInstance } from "./src/generated/query-instance";
import { QueryBuilder } from "./src/query-builder";
export function sqlBuilder(db) {
    const requiredDbInstance = {
        ...db,
        formatParamHandler: db.formatParamHandler || "pg",
    };
    return new QueryInstance(requiredDbInstance);
}
export { QueryBuilder, QueryInstance };
