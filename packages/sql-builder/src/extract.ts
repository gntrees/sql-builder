import { parse } from 'pgsql-parser';
import * as ts from 'typescript';
import keywords from "../keywords.json" assert { type: "json" };
import pgFunctionList from "./postgres-functions-list.js";



const keywordsExtracted = keywords['keywords'].map(keywords => ({
  "key": keywords.KEY_WORD
}));

// Function to write keywords to file

function extractMethodNamesFromFile(filePath: string, className: string): string[] {
    const fs = require('fs');
    const path = require('path');
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);
    
    const methods: string[] = [];
    
    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node) && node.name?.getText() === className) {
            node.members.forEach(member => {
                if (ts.isMethodDeclaration(member) && 
                    member.name && 
                    !hasVisibilityModifier(member) &&
                    member.name.getText() !== 'constructor') {
                    methods.push(member.name.getText());
                }
            });
        }
        ts.forEachChild(node, visit);
    }
    
    visit(sourceFile);
    return methods;
}

function hasVisibilityModifier(node: ts.MethodDeclaration): boolean {
    return node.modifiers?.some(mod => 
        mod.kind === ts.SyntaxKind.PrivateKeyword || 
        mod.kind === ts.SyntaxKind.ProtectedKeyword
    ) ?? false;
}

// function untuk write keywords to file
function writeKeywordsToFile(data: string, fileName: string = 'base-query-builder.ts') {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, data, 'utf8');
}

function toCamelCase(str: string): string {
  // Split the string by hyphens or underscores
  return str.split(/[_-]+/)
    .map((word, index) => {
      // If it is the first word, make sure it is all lowercase
      if (index === 0) {
        return word.toLowerCase();
      }
      // For subsequent words, capitalize the first letter and lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("").replace(/\u200B/g, ''); // Join all words back together without spaces
}
const keywordsFix = keywordsExtracted.map(async (i) => {
  try {
    const resultParser = await parse(i.key);
    return {
      key: i.key,
    }
  } catch (error) {
    return {
      key: i.key,
    }
  }
})

const exceptionKeywords = [
  "CONSTRUCTOR",
  "VALUE_OF",
  "EXECUTE",
  "EXEC"
];

function getKeywordName(keyword: string): string {
  if (exceptionKeywords.includes(keyword)) {
    return toCamelCase(keyword) + 'Keyword';
  }
  return toCamelCase(keyword);
}

function getBaseRawQueryBuilderFunctionName() {
    const path = require('path');
    return extractMethodNamesFromFile(
        path.join(__dirname, 'base-raw-query-builder.ts'),
        'BaseRawQueryBuilder'
    );
}

function getBaseQueryBuilderFunctionName(){
    const path = require('path');
    return extractMethodNamesFromFile(
        path.join(__dirname, './generated/base-query-builder.ts'),
        'BaseQueryBuilder'
    );
}

function getOverrideQueryBuilderFunctionName() {
    const path = require('path');
    const overrideMethods = extractMethodNamesFromFile(
        path.join(__dirname, 'override-query-builder.ts'),
        'OverrideQueryBuilder'
    );
    
    const parentFiles = [
        { file: './generated/override-all-functions.ts', class: 'AllFunctionBuilder' },
        { file: 'override-operator-functions.ts', class: 'OperatorFunctionBuilder' },
        // { file: 'override-xml-functions.ts', class: 'XMLFunctionBuilder' },
        // { file: 'override-sequence-functions.ts', class: 'SequenceFunctionBuilder' },
        // { file: 'override-json-functions.ts', class: 'JSONFunctionBuilder' },
        // { file: 'override-textsearch-functions.ts', class: 'TextSearchFunctionBuilder' },
        // { file: 'override-string-functions.ts', class: 'StringFunctionBuilder' },
        // { file: 'override-conditional-functions.ts', class: 'ConditionalFunctionBuilder' },
        // { file: 'override-array-functions.ts', class: 'ArrayFunctionBuilder' },
        // { file: 'override-network-functions.ts', class: 'NetworkFunctionBuilder' },
        // { file: 'override-math-functions.ts', class: 'MathFunctionBuilder' },
        // { file: 'override-geometry-functions.ts', class: 'GeometryFunctionBuilder' },
        // { file: 'override-enum-functions.ts', class: 'EnumFunctionBuilder' },
        // { file: 'override-date-time-function.ts', class: 'DateTimeFunctionBuilder' },
        // { file: 'override-set-returning-functions.ts', class: 'SetReturningFunctionBuilder' },
        // { file: 'override-range-functions.ts', class: 'RangeFunctionBuilder' },
        // { file: 'override-aggregate-functions.ts', class: 'AggregateFunctionBuilder' },
        // { file: 'override-window-functions.ts', class: 'WindowFunctionBuilder' },
        // { file: 'override-merge-functions.ts', class: 'MergeFunctionBuilder' },
        // { file: 'override-subquery-functions.ts', class: 'SubqueryFunctionBuilder' },
        // { file: 'override-info-functions.ts', class: 'InfoFunctionBuilder' },
        // { file: 'override-admin-functions.ts', class: 'AdminFunctionBuilder' },
        // { file: 'override-trigger-functions.ts', class: 'TriggerFunctionBuilder' },
        // { file: 'override-event-trigger-functions.ts', class: 'EventTriggerFunctionBuilder' },
        // { file: 'override-statistics-functions.ts', class: 'StatisticsFunctionBuilder' },
    ];
    
    const parentMethods = parentFiles.flatMap(({ file, class: className }) => 
        extractMethodNamesFromFile(path.join(__dirname, file), className)
    );
    
    return [...overrideMethods, ...parentMethods];
}

const baseQueryBuilder = `
import { BaseRawQueryBuilder } from "../base-raw-query-builder";
export class BaseQueryBuilder extends BaseRawQueryBuilder {` +
  keywordsExtracted.map(keyword => `    
    ${(getKeywordName(keyword.key))}(){
        this.query.sql.push('${keyword.key.replace(/\u200B/g, '')}');
        return this;
    }`).join('') + `
 }`;


const queryInstance = (() => {
  const baseRawMethods = getBaseRawQueryBuilderFunctionName();
  const overrideMethods = getOverrideQueryBuilderFunctionName();
  const keywordMethods = keywordsExtracted.map((keyword) => getKeywordName(keyword.key));
  const methodSet = new Set<string>([...baseRawMethods, ...overrideMethods, ...keywordMethods]);
  const methods = Array.from(methodSet).sort((a, b) => a.localeCompare(b)).map((name) => {
    if (overrideMethods.includes(name)) {
      return `\n  ${name}(...args: Parameters<OverrideQueryBuilder["${name}"]>) {\n    return (new QueryBuilder(this)).${name}(...args);\n  }`;
    }
    if (baseRawMethods.includes(name)) {
      return `\n  ${name}(...args: Parameters<BaseRawQueryBuilder["${name}"]>) {\n    return (new QueryBuilder(this)).${name}(...args);\n  }`;
    }
    return `\n  ${name}() {\n    return (new QueryBuilder(this)).${name}();\n  }`;
  }).join("");
  return `// AUTO-GENERATED - DO NOT EDIT.\nimport type { RequiredDBInstance } from "../types";\nimport { QueryBuilder } from "../query-builder";\nimport { BaseRawQueryBuilder } from "../base-raw-query-builder";\nimport { OverrideQueryBuilder } from "../override-query-builder";\n\nexport class QueryInstance {\n  protected dbInstance: RequiredDBInstance;\n  constructor(dbInstance: RequiredDBInstance) {\n    this.dbInstance = dbInstance;\n  }\n  getDbInstance() {\n    return this.dbInstance;\n  }${methods}\n}\n`;
})();

function generateOverrideAllFunctions() {
    const path = require('path');
    // const existingMethods = getOverrideQueryBuilderFunctionName();
    const baseQueryBuilderMethods = getBaseQueryBuilderFunctionName();
    const allExistingMethods = new Set([...baseQueryBuilderMethods]);

    const generatedMethods: string[] = [];
    const processedFunctions = new Map<string, typeof pgFunctionList[0]>();

    for (const func of pgFunctionList) {
        const methodName = toCamelCase(func.name.toLowerCase());

        if (processedFunctions.has(methodName)) {
            const existing = processedFunctions.get(methodName);
            if (existing && func.args.length > existing.args.length) {
                processedFunctions.set(methodName, func);
            }
        } else {
            processedFunctions.set(methodName, func);
        }
    }

    for (let [methodName, func] of processedFunctions) {
        func.name = func.name.toUpperCase();
        methodName = func.format == "COERCE_EXPLICIT_CAST" ? toCamelCase("to_" + methodName) : methodName;
        const needsOverride = allExistingMethods.has(methodName);

        const params = func.args.map(arg => {
            if (arg.variadic) {
                return `...${arg.name}: Statement[]`;
            }
            return `${arg.name}?: Statement`;
        }).join(', ');

        const paramsAnd = func.args.map(arg => {
            return arg.variadic ? `${arg.name}.length === 0` : `${arg.name} === undefined`;
        }).join(' && ');

        const paramNames = func.args.map(arg => {
            if (arg.variadic) {
                return `...${arg.name}`;
            }
            return arg.name;
        }).join(', ');

        const overrideKeyword = needsOverride ? 'override ' : '';

        const argsString = func.args.map(arg => {
            if (arg.variadic) {
                return `{ name: "${arg.name}", variadic: true }`;
            }
            return `{ name: "${arg.name}" }`;
        }).join(', ');

    //     if (func.args.length === 0) {
    //         generatedMethods.push(`    ${overrideKeyword}${methodName}() {
    //     return super.pushFunction({ name: "${func.name}", args: [], format: "${func.format}" });
    // }`);
    //     } else {
    //         generatedMethods.push(`    ${overrideKeyword}${methodName}(${params}) {${needsOverride ? 
    //           "\n        if (" + paramsAnd + ") {\n            return super."+methodName+"();\n        }"
    //           : ""}
    //     return super.pushFunction({ name: "${func.name}", args: [${argsString}], format: "${func.format}" }, ${paramNames});
    // }`);
    // }
              generatedMethods.push(`    ${overrideKeyword}${methodName}(...params: Statement[]) {${needsOverride ? 
                "\n        if (params.length == 0) {\n            return super."+methodName+"();\n        }"
                : ""}
          return super.pushFunction({ name: "${func.name}", args: [{ name: "params", variadic: true }], format: "${func.format}" }, ...params);
          }`);
    }

    return `// AUTO-GENERATED - DO NOT EDIT.
import { BaseQueryBuilder } from "./base-query-builder";
import type { Statement } from "../types";

export class AllFunctionBuilder extends BaseQueryBuilder {
${generatedMethods.sort((a, b) => {
    const nameA = a.match(/(\w+)\(/)?.[1] || '';
    const nameB = b.match(/(\w+)\(/)?.[1] || '';
    return nameA.localeCompare(nameB);
}).join('\n\n')}
}`;
}

const main = async () => {
  writeKeywordsToFile(baseQueryBuilder, './generated/base-query-builder.ts');
  writeKeywordsToFile(queryInstance, './generated/query-instance.ts');
  writeKeywordsToFile(generateOverrideAllFunctions(), './generated/override-all-functions.ts');
}
main()
