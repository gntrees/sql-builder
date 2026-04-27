export type SchemaLiteral = string;

export type ArgumentType =
  | SchemaLiteral
  | number
  | boolean
  | null
  | undefined
  | FunctionListType
  | {
      [key: string]: ArgumentType;
    }
  | ArgumentType[];

export type FunctionListType =
  | {
      paramType: "function" | "template-literal";
      arguments: ArgumentType[];
      name: string;
    }
  | {
      paramType: "string" | "number" | "boolean" | "null" | "raw" | "array" | "object" | "undefined";
      arguments: ArgumentType[];
      name: ArgumentType[] | ArgumentType;
    };

// implementation Target:
// type FunctionListTypeChainType = {
//   "functionCall": {
//     name: string;
//     arguments: FunctionListType[];
//   }
// } | {
//   "variableCall": {
//     name: string;
//   }
// } | {
//   "templateLiteralFunctionCall": {
//     name: string;
//     arguments: [
//       TemplateStringsArray,
//       ...FunctionListType[]
//     ]
//   }
// }

// export type FunctionListType =
//   | {
//     "string": {
//       value: string;
//     }
//   }
//   | {
//     "number": {
//       value: number;
//     }
//   }
//   | {
//     "boolean": {
//       value: boolean;
//     }
//   }
//   | {
//     "null": {
//       value: null;
//     }
//   }
//   | {
//     "undefined": {
//       value: undefined;
//     }
//   }
//   | {
//     "array": {
//       values: FunctionListType[]
//     }
//   }
//   | {
//     "object": {
//       values: Record<string, FunctionListType>;
//     }
//   }
//   | {
//     "chain": {
//       values: FunctionListTypeChainType[]
//     }
//   } 
//   | FunctionListTypeChainType; 
