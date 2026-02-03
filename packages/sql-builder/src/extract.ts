import { parse } from 'pgsql-parser';
import * as ts from 'typescript';
import keywords from "../keywords.json" assert { type: "json" };
import { BaseQueryBuilder } from './generated/base-query-builder';
import type { BaseRawQueryBuilder } from "./base-raw-query-builder";
import type { OverrideQueryBuilder } from "./override-query-builder";



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
export function writeKeywordsToFile(data: string, fileName: string = 'base-query-builder.ts') {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, data, 'utf8');
}

function toCamelCase(str: string): string {
  // Split the string by hyphens or underscores 
  // console.log(str.split(/[_-]+/));

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
      // ast: resultParser
    }
  } catch (error) {
    return {
      key: i.key,
      // ast: error
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

function getOverrideQueryBuilderFunctionName() {
    const path = require('path');
    const overrideMethods = extractMethodNamesFromFile(
        path.join(__dirname, 'override-query-builder.ts'),
        'OverrideQueryBuilder'
    );
    
    const parentFiles = [
        { file: 'override-uuid-functions.ts', class: 'UUIDFunctionBuilder' },
        { file: 'override-xml-functions.ts', class: 'XMLFunctionBuilder' },
        { file: 'override-sequence-functions.ts', class: 'SequenceFunctionBuilder' },
        { file: 'override-json-functions.ts', class: 'JSONFunctionBuilder' },
        { file: 'override-textsearch-functions.ts', class: 'TextSearchFunctionBuilder' },
        { file: 'override-string-functions.ts', class: 'StringFunctionBuilder' },
        { file: 'override-conditional-functions.ts', class: 'ConditionalFunctionBuilder' },
        { file: 'override-array-functions.ts', class: 'ArrayFunctionBuilder' },
        { file: 'override-network-functions.ts', class: 'NetworkFunctionBuilder' },
        { file: 'override-math-functions.ts', class: 'MathFunctionBuilder' },
        { file: 'override-geometry-functions.ts', class: 'GeometryFunctionBuilder' },
        { file: 'override-enum-functions.ts', class: 'EnumFunctionBuilder' },
        { file: 'override-date-time-function.ts', class: 'DateTimeFunctionBuilder' },
        { file: 'override-set-returning-functions.ts', class: 'SetReturningFunctionBuilder' },
        { file: 'override-range-functions.ts', class: 'RangeFunctionBuilder' },
        { file: 'override-aggregate-functions.ts', class: 'AggregateFunctionBuilder' },
        { file: 'override-window-functions.ts', class: 'WindowFunctionBuilder' },
        { file: 'override-merge-functions.ts', class: 'MergeFunctionBuilder' },
        { file: 'override-subquery-functions.ts', class: 'SubqueryFunctionBuilder' },
        { file: 'override-info-functions.ts', class: 'InfoFunctionBuilder' },
        { file: 'override-admin-functions.ts', class: 'AdminFunctionBuilder' },
        { file: 'override-trigger-functions.ts', class: 'TriggerFunctionBuilder' },
        { file: 'override-event-trigger-functions.ts', class: 'EventTriggerFunctionBuilder' },
        { file: 'override-statistics-functions.ts', class: 'StatisticsFunctionBuilder' },
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

const main = async () => {
  // console.log(fixKeywords.filter((i) => i.category.includes("Fungsi Bawaan")).length);

  // merge keywords by dynamic import fix-keyword-chunk-i.json to fix-keyword-with-category.json
  // const mergedKeywords: any[] = [];
  // for (let i = 1; i <= 9; i++) {
  //   const chunk = await import(`./fix-keyword-chunk-${i}.json`);
  //   mergedKeywords.push(...chunk.default);
  // }
  // writeKeywordsToFile(JSON.stringify(mergedKeywords.filter((i) => i.ast !== null), null, 2)
  //   , 'fix-keyword-with-category.json');
  writeKeywordsToFile(baseQueryBuilder, './generated/base-query-builder.ts');
  writeKeywordsToFile(queryInstance, './generated/query-instance.ts');
  // Promise.all(keywordsFix).then((data) => {

  //   const chunkSize = 100;
  //   for (let i = 0; i < data.length; i += chunkSize) {
  //     const chunk = data.slice(i, i + chunkSize);
  //     writeKeywordsToFile(
  //     JSON.stringify(chunk, null, 2),
  //     `fix-keyword-chunk-${i / chunkSize + 1}.json`
  //     );
  //   }
  //   // writeKeywordsToFile(JSON.stringify(data.filter((i)=>i.ast !== null),null,2)
  //   // , 'fix-keyword-not-null.json');
  // })
}
main()
