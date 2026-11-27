// Canonical case line: `<sql>\t<param1>,<param2>` (plan P8). The same format is
// implemented in support.lt; keep both in sync.
export function line(sql: string, params: readonly unknown[]): string {
  const parts = params.map((value) => {
    if (value === null || value === undefined) return "null";
    if (typeof value === "boolean") return `bool:${value}`;
    if (typeof value === "number") {
      return Number.isInteger(value) ? `int:${value}` : `float:${value}`;
    }
    if (typeof value === "bigint") return `int:${value}`;
    return `text:${String(value)}`;
  });
  return `${sql}\t${parts.join(",")}`;
}
