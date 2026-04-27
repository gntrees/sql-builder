import { QueryInstance } from "./generated/query-instance";
export function sqlBuilder(variableName) {
    const requiredDbInstance = {
        execHandler: async () => {
            throw new Error("Execution handler is not configured. Call setExecutionHandler() on sqlBuilder() before execute().");
        },
        formatParamHandler: "pg",
    };
    const queryInstance = new QueryInstance(requiredDbInstance);
    if (typeof variableName === "string") {
        queryInstance.setVariableName(variableName);
    }
    return queryInstance;
}
export * from "./base-export";
