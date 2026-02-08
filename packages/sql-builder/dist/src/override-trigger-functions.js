"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerFunctionBuilder = void 0;
const override_admin_functions_1 = require("./override-admin-functions");
class TriggerFunctionBuilder extends override_admin_functions_1.AdminFunctionBuilder {
    // 9.29. Trigger Functions
    suppressRedundantUpdatesTrigger() {
        return this.pushFunction("suppress_redundant_updates_trigger");
    }
    tsvectorUpdateTrigger(tsvcol, configName, ...columns) {
        const args = [tsvcol, configName, ...columns]
            .filter((arg) => arg !== undefined && arg !== null)
            .map((arg) => this.toLiteral(arg));
        return this.pushFunction("tsvector_update_trigger", ...args);
    }
    tsvectorUpdateTriggerColumn(tsvcol, tsconfigcol, ...columns) {
        const args = [tsvcol, tsconfigcol, ...columns]
            .filter((arg) => arg !== undefined && arg !== null)
            .map((arg) => this.toLiteral(arg));
        return this.pushFunction("tsvector_update_trigger_column", ...args);
    }
}
exports.TriggerFunctionBuilder = TriggerFunctionBuilder;
