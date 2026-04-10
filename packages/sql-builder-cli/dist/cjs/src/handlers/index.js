"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialNode = exports.specialNodeWindowFunc = exports.specialNodeTransactions = exports.specialNodeClauses = exports.specialNodeValues = exports.specialNodeExpressions = exports.specialNodeQuery = void 0;
var query_js_1 = require("./query.js");
Object.defineProperty(exports, "specialNodeQuery", { enumerable: true, get: function () { return query_js_1.specialNodeQuery; } });
var expressions_js_1 = require("./expressions.js");
Object.defineProperty(exports, "specialNodeExpressions", { enumerable: true, get: function () { return expressions_js_1.specialNodeExpressions; } });
var values_js_1 = require("./values.js");
Object.defineProperty(exports, "specialNodeValues", { enumerable: true, get: function () { return values_js_1.specialNodeValues; } });
var clauses_js_1 = require("./clauses.js");
Object.defineProperty(exports, "specialNodeClauses", { enumerable: true, get: function () { return clauses_js_1.specialNodeClauses; } });
var transactions_js_1 = require("./transactions.js");
Object.defineProperty(exports, "specialNodeTransactions", { enumerable: true, get: function () { return transactions_js_1.specialNodeTransactions; } });
var window_func_js_1 = require("./window-func.js");
Object.defineProperty(exports, "specialNodeWindowFunc", { enumerable: true, get: function () { return window_func_js_1.specialNodeWindowFunc; } });
// Combine all handlers
const query_js_2 = require("./query.js");
const expressions_js_2 = require("./expressions.js");
const values_js_2 = require("./values.js");
const clauses_js_2 = require("./clauses.js");
const transactions_js_2 = require("./transactions.js");
const window_func_js_2 = require("./window-func.js");
exports.specialNode = {
    ...query_js_2.specialNodeQuery,
    ...expressions_js_2.specialNodeExpressions,
    ...values_js_2.specialNodeValues,
    ...clauses_js_2.specialNodeClauses,
    ...transactions_js_2.specialNodeTransactions,
    ...window_func_js_2.specialNodeWindowFunc,
};
