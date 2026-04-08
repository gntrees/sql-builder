export type PGFunction = {
    name: string;
    args: {
        name: string;
        variadic?: boolean;
    }[];
    format: "COERCE_EXPLICIT_CALL" | "COERCE_EXPLICIT_CAST";
};
declare const pgFunctionList: PGFunction[];
export default pgFunctionList;
