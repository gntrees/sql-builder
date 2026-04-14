import { createRequire } from 'node:module';
export type { ArgumentType, FunctionListType, SchemaLiteral } from './src/function-list-type';

const require = createRequire(import.meta.url);
const functionList = require('../../src/function-list.json');

export default functionList;
export { functionList };
