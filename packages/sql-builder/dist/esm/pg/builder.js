import { QueryInstance } from "../src/dialects/pg/generated/query-instance";
class QueryInstanceBuilder extends QueryInstance {
    setFormatParamHandler(formatParamHandler) {
        this.dbInstance.formatParamHandler = formatParamHandler;
        return this;
    }
    setExecutionHandler(execHandler) {
        this.dbInstance.execHandler = execHandler;
        return this;
    }
}
export function sqlBuilder() {
    const requiredDbInstance = {
        execHandler: async () => {
            throw new Error("Execution is not supported in @gntrees/sql-builder/pg/builder");
        },
        formatParamHandler: "pg",
    };
    return new QueryInstanceBuilder(requiredDbInstance);
}
