import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const syncFiles = [
  {
    source: resolve(__dirname, "../../sql-builder-shared/src/function-list-type.ts"),
    target: resolve(__dirname, "../src/shared/function-list-type.ts"),
  },
];

for (const { source, target } of syncFiles) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

const functionListJsonPath = resolve(__dirname, "../../sql-builder-shared/src/function-list.json");
const functionListTsPath = resolve(__dirname, "../src/shared/function-list.ts");

const functionListJson = readFileSync(functionListJsonPath, "utf8");
const functionListSource = `const functionList = ${functionListJson} as const;\n\nexport default functionList;\n`;

mkdirSync(dirname(functionListTsPath), { recursive: true });
writeFileSync(functionListTsPath, functionListSource);
