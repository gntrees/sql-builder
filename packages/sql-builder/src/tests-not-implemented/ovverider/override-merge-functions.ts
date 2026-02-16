import { WindowFunctionBuilder } from "./override-window-functions";

export class MergeFunctionBuilder extends WindowFunctionBuilder {
    override mergeAction() {
        return this.pushFunction("MERGE_ACTION");
    }
}
