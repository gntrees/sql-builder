import { deparse, deparseSync } from 'pgsql-parser';
const ast = deparseSync([
    {
        // SelectStmt: {
        //     fromClause: [],
        //     distinctClause: [],
        //     intoClause: {},
        //     targetList: [],
        //     // whereClause: {
        //     //     Boolean:{
        //     //         boolval:true
        //     //     }
        //     // },
        //     // groupClause: [],
        //     // groupDistinct: true,
        //     // havingClause: {
        //     //     Boolean:{
        //     //         boolval:true
        //     //     }
        //     // },
        //     // windowClause: [],
        //     // valuesLists: [],
        //     // sortClause: [],
        //     // limitOffset: {
        //     //     Boolean:{
        //     //         boolval:true
        //     //     }
        //     // },
        //     // limitCount: {
        //     //     Boolean:{
        //     //         boolval:true
        //     //     }
        //     // },
        //     // limitOption: "LIMIT_OPTION_COUNT",
        //     // lockingClause: [],
        //     // withClause: {},
        //     // op: "SETOP_UNION",
        //     // all: true,
        //     // larg: {},
        //     // rarg: {},
        // },
        SetOperationStmt: {
            op: "SETOP_UNION",
            all: true,
            larg: {
                SelectStmt: {
                    fromClause: [],
                    distinctClause: [],
                    intoClause: {
                        rel: {
                            catalogname: "test",
                        }
                    },
                    targetList: [],
                    op: "SETOP_UNION",
                    all: true,
                    larg: {
                        fromClause: [],
                        distinctClause: [],
                        intoClause: {
                            rel: {
                                catalogname: "public",
                            }
                        },
                        targetList: [],
                    },
                    rarg: {
                        fromClause: [],
                        distinctClause: [],
                        intoClause: {},
                        targetList: [],
                    }
                },
            },
            rarg: {
                SelectStmt: {
                    fromClause: [],
                    distinctClause: [],
                    intoClause: {},
                    targetList: [],
                }
            }
        },

        // InsertStmt:{
        //     // returningList:[],
        //     // cols:[
        //     //     {
        //     //         ResTarget:{
        //     //             name:"nama_kolom"
        //     //         }
        //     //     }
        //     // ],
        //     relation:{
        //         catalogname:"public",
        //         relname:"nama_tabel",
        //         schemaname:"skema_tabel",
        //         inh: true,
        //     },
        // }
    }
])

const ast2 = deparseSync({
    SelectStmt: {
        fromClause: [],
        distinctClause: [],
        intoClause: {
            rel: {
                catalogname: "test",
            }
        },
        targetList: [],
        op: "SETOP_UNION",
        all: true,
        larg: {
            fromClause: [],
            distinctClause: [],
            intoClause: {
                rel: {
                    catalogname: "public",
                }
            },
            targetList: [],
        },
        rarg: {
            fromClause: [],
            distinctClause: [],
            intoClause: {},
            targetList: [],
        }
    },
})
console.log(ast)
console.log("----");

console.log(ast2)