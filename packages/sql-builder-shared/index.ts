import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const functionList = require('../../src/function-list.json');

export default functionList;
export { functionList };
