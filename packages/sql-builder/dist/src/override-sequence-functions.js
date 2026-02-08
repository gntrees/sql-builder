"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceFunctionBuilder = void 0;
const override_xml_functions_1 = require("./override-xml-functions");
class SequenceFunctionBuilder extends override_xml_functions_1.XMLFunctionBuilder {
    // Sequence name is flexible - can be string literal or identifier
    nextval(sequence) {
        return this.pushFunction("NEXTVAL", sequence === undefined ? undefined : this.toLiteral(sequence));
    }
    setval(sequence, value, isCalled) {
        return this.pushFunction("SETVAL", sequence === undefined ? undefined : this.toLiteral(sequence), value === undefined ? undefined : this.toLiteral(value), isCalled === undefined ? undefined : this.toLiteral(isCalled));
    }
    currval(sequence) {
        return this.pushFunction("CURRVAL", sequence === undefined ? undefined : this.toLiteral(sequence));
    }
    lastval() {
        return this.pushFunction("LASTVAL");
    }
}
exports.SequenceFunctionBuilder = SequenceFunctionBuilder;
