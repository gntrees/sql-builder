import * as convertModule from './src/convert.js';
import * as generateModule from './src/generate.js';
const convert = convertModule.convert ??
    convertModule.default
        ?.convert ??
    convertModule.default;
const generate = generateModule.generate ??
    generateModule.default
        ?.generate ??
    generateModule.default;
export { convert, generate };
