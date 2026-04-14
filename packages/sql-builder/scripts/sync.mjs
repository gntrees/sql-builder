import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const syncFiles = [
  {
    source: resolve(__dirname, "../../sql-builder-shared/src/function-list-type.ts"),
    target: resolve(__dirname, "../src/dialects/pg/function-list-type.ts"),
  },
];

for (const { source, target } of syncFiles) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}
