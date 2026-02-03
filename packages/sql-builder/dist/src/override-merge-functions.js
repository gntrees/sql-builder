"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeFunctionBuilder = void 0;
const override_window_functions_1 = require("./override-window-functions");
class MergeFunctionBuilder extends override_window_functions_1.WindowFunctionBuilder {
    mergeAction() {
        return this.pushFunction("MERGE_ACTION");
    }
}
exports.MergeFunctionBuilder = MergeFunctionBuilder;
