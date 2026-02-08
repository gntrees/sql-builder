import { QueryInstance } from "./src/generated/query-instance";
import type { DBInstance } from "./src/types";
import { QueryBuilder } from "./src/query-builder";
export declare function sqlBuilder(db: DBInstance): QueryInstance;
export { QueryBuilder, QueryInstance };
