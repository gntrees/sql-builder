import { parse } from 'pgsql-parser';
import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import keywords from '../../../keywords.json' assert { type: 'json' };
import pgFunctionList from './postgres-functions-list.js';

const EXCEPTION_KEYWORDS = ['CONSTRUCTOR', 'VALUE_OF', 'EXECUTE', 'EXEC'] as const;
const KEEP_AS_FUNCTIONS = ['MERGE_ACTION', 'ROW_NUMBER'] as const;

const keywordsExtracted = keywords['keywords'].map((keyword: { KEY_WORD: string }) => ({
    key: keyword.KEY_WORD,
}));

function extractMethodNamesFromFile(filePath: string, className: string): string[] {
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);
    const methods: string[] = [];

    function visit(node: ts.Node): void {
        if (ts.isClassDeclaration(node) && node.name?.getText() === className) {
            node.members.forEach((member) => {
                if (
                    ts.isMethodDeclaration(member) &&
                    member.name &&
                    !hasVisibilityModifier(member) &&
                    member.name.getText() !== 'constructor'
                ) {
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
    return node.modifiers?.some(
        (mod) =>
            mod.kind === ts.SyntaxKind.PrivateKeyword ||
            mod.kind === ts.SyntaxKind.ProtectedKeyword
    ) ?? false;
}

function writeFile(fileName: string, data: string): void {
    fs.writeFileSync(path.join(__dirname, fileName), data, 'utf8');
}

function writeJsonFile(fileName: string, data: unknown): void {
    fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(data, null, 2), 'utf8');
}

function toCamelCase(str: string): string {
    return str
        .split(/[_-]+/)
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('')
        .replace(/\u200B/g, '');
}

function getKeywordName(keyword: string): string {
    const camelCase = toCamelCase(keyword);
    if (EXCEPTION_KEYWORDS.includes(keyword as typeof EXCEPTION_KEYWORDS[number])) {
        return camelCase + 'Keyword';
    }
    return camelCase;
}

function getBaseRawQueryBuilderMethods(): string[] {
    return extractMethodNamesFromFile(
        path.join(__dirname, 'base-raw-query-builder.ts'),
        'BaseRawQueryBuilder'
    );
}

function getBaseQueryBuilderMethods(): string[] {
    return extractMethodNamesFromFile(
        path.join(__dirname, './generated/base-query-builder.ts'),
        'BaseQueryBuilder'
    );
}

function getOverrideMethods(): string[] {
    const overrideMethods = extractMethodNamesFromFile(
        path.join(__dirname, 'override-query-builder.ts'),
        'OverrideQueryBuilder'
    );

    const parentFiles = [
        { file: './generated/override-all-functions.ts', class: 'AllFunctionBuilder' },
        { file: 'override-operator-functions.ts', class: 'OperatorFunctionBuilder' },
    ];

    const parentMethods = parentFiles.flatMap(({ file, class: className }) =>
        extractMethodNamesFromFile(path.join(__dirname, file), className)
    );

    return [...overrideMethods, ...parentMethods];
}

function generateBaseQueryBuilder(): string {
    const methods = keywordsExtracted
        .map(
            (keyword) => `
    ${getKeywordName(keyword.key)}() {
        this.query.sql.push('${keyword.key.replace(/\u200B/g, '')}');
        return this.endClass();
    }`
        )
        .join('');

    return `import { BaseRawQueryBuilder } from "../base-raw-query-builder";
export class BaseQueryBuilder extends BaseRawQueryBuilder {${methods}
 }`;
}

function generateSchemaOverrider(): string {
    const baseRawMethods = getBaseRawQueryBuilderMethods();
    const overrideMethods = getOverrideMethods();
    const keywordMethods = keywordsExtracted.map((keyword) => getKeywordName(keyword.key));

    const methodSet = new Set<string>([...baseRawMethods, ...overrideMethods, ...keywordMethods]);
    const excludedMethods = new Set<string>([
        'raw', 'r', 'schemaParam', 'schemaCase', 'setParams'
    ]);
    // exclude raw and r
    const filteredMethods = Array.from(methodSet).filter((method) => !excludedMethods.has(method));
    const sortedMethods = Array.from(filteredMethods).sort((a, b) => a.localeCompare(b));

    const methodDeclarations = sortedMethods
        .map((name) => {
            return `\n  override ${name}(...args: Parameters<OverrideQueryBuilder["${name}"]>) {\n    this.resolveSchemaParam('function','${name}', args);\n    return super.${name}(...args);\n  }`;
        })
        .join('');

    return `// AUTO-GENERATED - DO NOT EDIT.
import { OverrideQueryBuilder } from "../override-query-builder";

export class SchemaOverrider extends OverrideQueryBuilder {${methodDeclarations}
}`;
}


function generateQueryInstance(): string {
    const baseRawMethods = getBaseRawQueryBuilderMethods();
    const overrideMethods = getOverrideMethods();
    const keywordMethods = keywordsExtracted.map((keyword) => getKeywordName(keyword.key));

    const methodSet = new Set<string>([...baseRawMethods, ...overrideMethods, ...keywordMethods]);
    const sortedMethods = Array.from(methodSet).sort((a, b) => a.localeCompare(b));

    const methodDeclarations = sortedMethods
        .map((name) => {
            if (overrideMethods.includes(name)) {
                return `\n  ${name}(...args: Parameters<OverrideQueryBuilder["${name}"]>) {\n    return (new QueryBuilder(this)).${name}(...args);\n  }`;
            }
            if (baseRawMethods.includes(name)) {
                return `\n  ${name}(...args: Parameters<BaseRawQueryBuilder["${name}"]>) {\n    return (new QueryBuilder(this)).${name}(...args);\n  }`;
            }
            return `\n  ${name}() {\n    return (new QueryBuilder(this)).${name}();\n  }`;
        })
        .join('');

    return `// AUTO-GENERATED - DO NOT EDIT.
import type { RequiredDBInstance } from "../types";
import { QueryBuilder } from "../query-builder";
import { BaseRawQueryBuilder } from "../base-raw-query-builder";
import { OverrideQueryBuilder } from "../override-query-builder";

export class QueryInstance {
  protected dbInstance: RequiredDBInstance;
  constructor(dbInstance: RequiredDBInstance) {
    this.dbInstance = dbInstance;
  }
  getDbInstance() {
    return this.dbInstance;
  }${methodDeclarations}
}`;
}

function generateOverrideAllFunctions(): string {
    const baseQueryBuilderMethods = getBaseQueryBuilderMethods();
    const allExistingMethods = new Set(baseQueryBuilderMethods);
    const keepAsFunctionsCamel = KEEP_AS_FUNCTIONS.map(toCamelCase);

    const processedFunctions = new Map<string, typeof pgFunctionList[0]>();

    for (const func of pgFunctionList) {
        const methodName = toCamelCase(func.name.toLowerCase());
        const existing = processedFunctions.get(methodName);

        if (existing && func.args.length > existing.args.length) {
            processedFunctions.set(methodName, func);
        } else if (!existing) {
            processedFunctions.set(methodName, func);
        }
    }

    const generatedMethods: string[] = [];

    for (let [methodName, func] of processedFunctions) {
        func.name = func.name.toUpperCase();
        methodName = func.format === 'COERCE_EXPLICIT_CAST' ? toCamelCase('to_' + methodName) : methodName;
        const needsOverride = allExistingMethods.has(methodName);
        const isKeepAsFunction = keepAsFunctionsCamel.includes(methodName);
        const overrideKeyword = needsOverride ? 'override ' : '';

        const methodBody = `    ${overrideKeyword}${methodName}(...params: Statement[]) {${
            needsOverride && !isKeepAsFunction
                ? '\n        if (params.length == 0) {\n            return super.' +
                  methodName +
                  '();\n        }'
                : ''
        }
          return super.pushFunction({ name: "${func.name}", args: [{ name: "params", variadic: true }], format: "${func.format}" }, ...params);
          }`;

        generatedMethods.push(methodBody);
    }

    generatedMethods.sort((a, b) => {
        const nameA = a.match(/(\w+)\(/)?.[1] || '';
        const nameB = b.match(/(\w+)\(/)?.[1] || '';
        return nameA.localeCompare(nameB);
    });

    return `// AUTO-GENERATED - DO NOT EDIT.
import { BaseQueryBuilder } from "./base-query-builder";
import type { Statement } from "../types";

export class AllFunctionBuilder extends BaseQueryBuilder {
${generatedMethods.join('\n\n')}
}`;
}

function generateFunctionListJson(): Record<string, unknown> {
    const baseRawMethods = getBaseRawQueryBuilderMethods().sort();
    const overrideMethods = getOverrideMethods().sort();
    const keywordMethods = keywordsExtracted.map((keyword) => getKeywordName(keyword.key)).sort();

    const methodSet = new Set<string>([...baseRawMethods, ...overrideMethods, ...keywordMethods]);
    const allMethods = Array.from(methodSet).sort((a, b) => a.localeCompare(b));

    return {
        baseRawMethods,
        overrideMethods,
        keywordMethods,
        allMethods,
        totalCount: allMethods.length,
    };
}

async function main(): Promise<void> {
    writeFile('./generated/base-query-builder.ts', generateBaseQueryBuilder());
    writeFile('./generated/query-instance.ts', generateQueryInstance());
    writeFile('./generated/override-all-functions.ts', generateOverrideAllFunctions());
    writeJsonFile('./generated/function-list.json', generateFunctionListJson());
    writeFile('./generated/schema-overrider.ts', generateSchemaOverrider());
}

main();
