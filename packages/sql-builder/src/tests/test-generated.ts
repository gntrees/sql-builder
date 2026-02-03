
// import { SelectStmtBuilder, ResTargetBuilder, RangeVarBuilder, A_ExprBuilder, A_ConstBuilder, IntegerBuilder, ColumnRefBuilder, StringBuilder } from '../generated-builder';
// import * as types from '../clone-types';

// // Helper to create a string ColumnRef
// function createColumnRef(name: string): types.Node {
//     // ColumnRef structure: fields: [ { String: { sval: name } } ]
//     const stringNode = new StringBuilder().sval(name).buildWrapped();
    
//     return new ColumnRefBuilder()
//         .addToFields(stringNode)
//         .buildWrapped();
// }

// function createIntConst(val: number): types.Node {
//     const intNode = new IntegerBuilder().ival(val).build(); // A_Const.ival expects Integer, not Wrapped Integer?
//     // Let's check clone-types.ts for A_Const
//     // A_Const: { ival?: Integer; ... }
//     // It seems it expects the raw Integer interface, NOT wrapped.
    
//     // BUT, A_Expr.lexpr expects Node, which IS wrapped.
    
//     // Let's re-verify A_Const structure in clone-types.ts
//     // export interface A_Const { ival?: Integer; ... }
//     // export interface Integer { ival?: number; }
    
//     // So createIntConst for use in A_Expr (which needs a Node -> A_Const)
//     // A_Const is a Node.
    
//     return new A_ConstBuilder()
//         .ival(intNode) // ival property of A_Const takes Integer interface
//         .buildWrapped(); // Returns { A_Const: ... }
// }

// const query = new SelectStmtBuilder()
//     // SELECT id, name
//     .addToTargetList(
//         new ResTargetBuilder()
//             .name('id') // Alias? Or just name? ResTarget.name is usually the alias or the column name if simple
//             .val(createColumnRef('id'))
//             .buildWrapped() // ResTarget is a Node
//     )
//     .addToTargetList(
//         new ResTargetBuilder()
//             .name('name')
//             .val(createColumnRef('name'))
//             .buildWrapped()
//     )
//     // FROM users
//     .addToFromClause(
//         new RangeVarBuilder()
//             .relname('users')
//             .inh(true)
//             .relpersistence('p')
//             .buildWrapped() // RangeVar is a Node
//     )
//     // WHERE id = 1
//     .whereClause(
//         new A_ExprBuilder()
//             .kind(types.A_Expr_Kind.AEXPR_OP)
//             .name([new StringBuilder().sval('=').buildWrapped()]) // Operator name is a List of Strings (wrapped)
//             .lexpr(createColumnRef('id'))
//             .rexpr(createIntConst(1))
//             .buildWrapped()
//     )
//     .build();

// console.log(JSON.stringify({ SelectStmt: query }, null, 2));
