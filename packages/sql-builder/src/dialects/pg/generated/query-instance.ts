// AUTO-GENERATED - DO NOT EDIT.
import type { RequiredDBInstance } from "../types";
import { QueryBuilder } from "../query-builder";
import { BaseRawQueryBuilder } from "../base-raw-query-builder";
import { OverrideQueryBuilder, type ApplyInferredBuilderParams, type InferSchemaParamsFromArgs } from "../override-query-builder";

export class QueryInstance {
  protected dbInstance: RequiredDBInstance;
  constructor(dbInstance: RequiredDBInstance) {
    this.dbInstance = dbInstance;
  }
  getDbInstance() {
    return this.dbInstance;
  }
  a() {
    return (new QueryBuilder(this)).a();
  }
  abbrev<TArgs extends Parameters<OverrideQueryBuilder["abbrev"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).abbrev(...(args as unknown as Parameters<OverrideQueryBuilder["abbrev"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  abort() {
    return (new QueryBuilder(this)).abort();
  }
  above<TArgs extends Parameters<OverrideQueryBuilder["above"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).above(...(args as unknown as Parameters<OverrideQueryBuilder["above"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  abs<TArgs extends Parameters<OverrideQueryBuilder["abs"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).abs(...(args as unknown as Parameters<OverrideQueryBuilder["abs"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  absent() {
    return (new QueryBuilder(this)).absent();
  }
  absolute() {
    return (new QueryBuilder(this)).absolute();
  }
  access() {
    return (new QueryBuilder(this)).access();
  }
  according() {
    return (new QueryBuilder(this)).according();
  }
  acldefault<TArgs extends Parameters<OverrideQueryBuilder["acldefault"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).acldefault(...(args as unknown as Parameters<OverrideQueryBuilder["acldefault"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  aclexplode<TArgs extends Parameters<OverrideQueryBuilder["aclexplode"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).aclexplode(...(args as unknown as Parameters<OverrideQueryBuilder["aclexplode"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  acos<TArgs extends Parameters<OverrideQueryBuilder["acos"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).acos(...(args as unknown as Parameters<OverrideQueryBuilder["acos"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  acosd<TArgs extends Parameters<OverrideQueryBuilder["acosd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).acosd(...(args as unknown as Parameters<OverrideQueryBuilder["acosd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  acosh<TArgs extends Parameters<OverrideQueryBuilder["acosh"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).acosh(...(args as unknown as Parameters<OverrideQueryBuilder["acosh"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  action() {
    return (new QueryBuilder(this)).action();
  }
  ada() {
    return (new QueryBuilder(this)).ada();
  }
  add() {
    return (new QueryBuilder(this)).add();
  }
  admin() {
    return (new QueryBuilder(this)).admin();
  }
  after() {
    return (new QueryBuilder(this)).after();
  }
  age<TArgs extends Parameters<OverrideQueryBuilder["age"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).age(...(args as unknown as Parameters<OverrideQueryBuilder["age"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  aggregate() {
    return (new QueryBuilder(this)).aggregate();
  }
  all<TArgs extends Parameters<OverrideQueryBuilder["all"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).all(...(args as unknown as Parameters<OverrideQueryBuilder["all"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  allocate() {
    return (new QueryBuilder(this)).allocate();
  }
  also() {
    return (new QueryBuilder(this)).also();
  }
  alter() {
    return (new QueryBuilder(this)).alter();
  }
  always() {
    return (new QueryBuilder(this)).always();
  }
  analyse() {
    return (new QueryBuilder(this)).analyse();
  }
  analyze() {
    return (new QueryBuilder(this)).analyze();
  }
  and<TArgs extends Parameters<OverrideQueryBuilder["and"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).and(...(args as unknown as Parameters<OverrideQueryBuilder["and"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  any<TArgs extends Parameters<OverrideQueryBuilder["any"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).any(...(args as unknown as Parameters<OverrideQueryBuilder["any"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  anyValue<TArgs extends Parameters<OverrideQueryBuilder["anyValue"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).anyValue(...(args as unknown as Parameters<OverrideQueryBuilder["anyValue"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  are() {
    return (new QueryBuilder(this)).are();
  }
  area<TArgs extends Parameters<OverrideQueryBuilder["area"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).area(...(args as unknown as Parameters<OverrideQueryBuilder["area"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  array() {
    return (new QueryBuilder(this)).array();
  }
  arrayAgg<TArgs extends Parameters<OverrideQueryBuilder["arrayAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayAgg(...(args as unknown as Parameters<OverrideQueryBuilder["arrayAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayAppend<TArgs extends Parameters<OverrideQueryBuilder["arrayAppend"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayAppend(...(args as unknown as Parameters<OverrideQueryBuilder["arrayAppend"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayCat<TArgs extends Parameters<OverrideQueryBuilder["arrayCat"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayCat(...(args as unknown as Parameters<OverrideQueryBuilder["arrayCat"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayDims<TArgs extends Parameters<OverrideQueryBuilder["arrayDims"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayDims(...(args as unknown as Parameters<OverrideQueryBuilder["arrayDims"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayFill<TArgs extends Parameters<OverrideQueryBuilder["arrayFill"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayFill(...(args as unknown as Parameters<OverrideQueryBuilder["arrayFill"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayLength<TArgs extends Parameters<OverrideQueryBuilder["arrayLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayLength(...(args as unknown as Parameters<OverrideQueryBuilder["arrayLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayLower<TArgs extends Parameters<OverrideQueryBuilder["arrayLower"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayLower(...(args as unknown as Parameters<OverrideQueryBuilder["arrayLower"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arraymaxcardinality() {
    return (new QueryBuilder(this)).arraymaxcardinality();
  }
  arrayNdims<TArgs extends Parameters<OverrideQueryBuilder["arrayNdims"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayNdims(...(args as unknown as Parameters<OverrideQueryBuilder["arrayNdims"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayPosition<TArgs extends Parameters<OverrideQueryBuilder["arrayPosition"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayPosition(...(args as unknown as Parameters<OverrideQueryBuilder["arrayPosition"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayPositions<TArgs extends Parameters<OverrideQueryBuilder["arrayPositions"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayPositions(...(args as unknown as Parameters<OverrideQueryBuilder["arrayPositions"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayPrepend<TArgs extends Parameters<OverrideQueryBuilder["arrayPrepend"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayPrepend(...(args as unknown as Parameters<OverrideQueryBuilder["arrayPrepend"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayRemove<TArgs extends Parameters<OverrideQueryBuilder["arrayRemove"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayRemove(...(args as unknown as Parameters<OverrideQueryBuilder["arrayRemove"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayReplace<TArgs extends Parameters<OverrideQueryBuilder["arrayReplace"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayReplace(...(args as unknown as Parameters<OverrideQueryBuilder["arrayReplace"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayReverse<TArgs extends Parameters<OverrideQueryBuilder["arrayReverse"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayReverse(...(args as unknown as Parameters<OverrideQueryBuilder["arrayReverse"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arraySample<TArgs extends Parameters<OverrideQueryBuilder["arraySample"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arraySample(...(args as unknown as Parameters<OverrideQueryBuilder["arraySample"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayShuffle<TArgs extends Parameters<OverrideQueryBuilder["arrayShuffle"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayShuffle(...(args as unknown as Parameters<OverrideQueryBuilder["arrayShuffle"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arraySort<TArgs extends Parameters<OverrideQueryBuilder["arraySort"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arraySort(...(args as unknown as Parameters<OverrideQueryBuilder["arraySort"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayToJson<TArgs extends Parameters<OverrideQueryBuilder["arrayToJson"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayToJson(...(args as unknown as Parameters<OverrideQueryBuilder["arrayToJson"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayToString<TArgs extends Parameters<OverrideQueryBuilder["arrayToString"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayToString(...(args as unknown as Parameters<OverrideQueryBuilder["arrayToString"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayToTsvector<TArgs extends Parameters<OverrideQueryBuilder["arrayToTsvector"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayToTsvector(...(args as unknown as Parameters<OverrideQueryBuilder["arrayToTsvector"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  arrayUpper<TArgs extends Parameters<OverrideQueryBuilder["arrayUpper"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).arrayUpper(...(args as unknown as Parameters<OverrideQueryBuilder["arrayUpper"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  as<TArgs extends Parameters<OverrideQueryBuilder["as"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).as(...(args as unknown as Parameters<OverrideQueryBuilder["as"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  asc<TArgs extends Parameters<OverrideQueryBuilder["asc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).asc(...(args as unknown as Parameters<OverrideQueryBuilder["asc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  ascii<TArgs extends Parameters<OverrideQueryBuilder["ascii"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ascii(...(args as unknown as Parameters<OverrideQueryBuilder["ascii"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  asensitive() {
    return (new QueryBuilder(this)).asensitive();
  }
  asin<TArgs extends Parameters<OverrideQueryBuilder["asin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).asin(...(args as unknown as Parameters<OverrideQueryBuilder["asin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  asind<TArgs extends Parameters<OverrideQueryBuilder["asind"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).asind(...(args as unknown as Parameters<OverrideQueryBuilder["asind"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  asinh<TArgs extends Parameters<OverrideQueryBuilder["asinh"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).asinh(...(args as unknown as Parameters<OverrideQueryBuilder["asinh"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  assertion() {
    return (new QueryBuilder(this)).assertion();
  }
  assignment() {
    return (new QueryBuilder(this)).assignment();
  }
  asymmetric() {
    return (new QueryBuilder(this)).asymmetric();
  }
  at() {
    return (new QueryBuilder(this)).at();
  }
  atan<TArgs extends Parameters<OverrideQueryBuilder["atan"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).atan(...(args as unknown as Parameters<OverrideQueryBuilder["atan"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  atan2<TArgs extends Parameters<OverrideQueryBuilder["atan2"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).atan2(...(args as unknown as Parameters<OverrideQueryBuilder["atan2"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  atan2d<TArgs extends Parameters<OverrideQueryBuilder["atan2d"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).atan2d(...(args as unknown as Parameters<OverrideQueryBuilder["atan2d"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  atand<TArgs extends Parameters<OverrideQueryBuilder["atand"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).atand(...(args as unknown as Parameters<OverrideQueryBuilder["atand"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  atanh<TArgs extends Parameters<OverrideQueryBuilder["atanh"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).atanh(...(args as unknown as Parameters<OverrideQueryBuilder["atanh"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  atomic() {
    return (new QueryBuilder(this)).atomic();
  }
  atSign<TArgs extends Parameters<OverrideQueryBuilder["atSign"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).atSign(...(args as unknown as Parameters<OverrideQueryBuilder["atSign"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  attach() {
    return (new QueryBuilder(this)).attach();
  }
  attribute() {
    return (new QueryBuilder(this)).attribute();
  }
  attributes() {
    return (new QueryBuilder(this)).attributes();
  }
  authorization() {
    return (new QueryBuilder(this)).authorization();
  }
  avg<TArgs extends Parameters<OverrideQueryBuilder["avg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).avg(...(args as unknown as Parameters<OverrideQueryBuilder["avg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  backward() {
    return (new QueryBuilder(this)).backward();
  }
  base64() {
    return (new QueryBuilder(this)).base64();
  }
  before() {
    return (new QueryBuilder(this)).before();
  }
  begin() {
    return (new QueryBuilder(this)).begin();
  }
  beginFrame() {
    return (new QueryBuilder(this)).beginFrame();
  }
  beginPartition() {
    return (new QueryBuilder(this)).beginPartition();
  }
  beginTransaction<TArgs extends Parameters<OverrideQueryBuilder["beginTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).beginTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["beginTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  below<TArgs extends Parameters<OverrideQueryBuilder["below"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).below(...(args as unknown as Parameters<OverrideQueryBuilder["below"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bernoulli() {
    return (new QueryBuilder(this)).bernoulli();
  }
  between<TArgs extends Parameters<OverrideQueryBuilder["between"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).between(...(args as unknown as Parameters<OverrideQueryBuilder["between"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  betweenSymmetric<TArgs extends Parameters<OverrideQueryBuilder["betweenSymmetric"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).betweenSymmetric(...(args as unknown as Parameters<OverrideQueryBuilder["betweenSymmetric"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bigint() {
    return (new QueryBuilder(this)).bigint();
  }
  binary() {
    return (new QueryBuilder(this)).binary();
  }
  bit() {
    return (new QueryBuilder(this)).bit();
  }
  bitAnd<TArgs extends Parameters<OverrideQueryBuilder["bitAnd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitAnd(...(args as unknown as Parameters<OverrideQueryBuilder["bitAnd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitCount<TArgs extends Parameters<OverrideQueryBuilder["bitCount"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitCount(...(args as unknown as Parameters<OverrideQueryBuilder["bitCount"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitLength<TArgs extends Parameters<OverrideQueryBuilder["bitLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitLength(...(args as unknown as Parameters<OverrideQueryBuilder["bitLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitOr<TArgs extends Parameters<OverrideQueryBuilder["bitOr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitOr(...(args as unknown as Parameters<OverrideQueryBuilder["bitOr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitwiseAnd<TArgs extends Parameters<OverrideQueryBuilder["bitwiseAnd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitwiseAnd(...(args as unknown as Parameters<OverrideQueryBuilder["bitwiseAnd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitwiseLeftShift<TArgs extends Parameters<OverrideQueryBuilder["bitwiseLeftShift"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitwiseLeftShift(...(args as unknown as Parameters<OverrideQueryBuilder["bitwiseLeftShift"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitwiseLeftShiftAssign<TArgs extends Parameters<OverrideQueryBuilder["bitwiseLeftShiftAssign"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitwiseLeftShiftAssign(...(args as unknown as Parameters<OverrideQueryBuilder["bitwiseLeftShiftAssign"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitwiseOr<TArgs extends Parameters<OverrideQueryBuilder["bitwiseOr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitwiseOr(...(args as unknown as Parameters<OverrideQueryBuilder["bitwiseOr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitwiseRightShift<TArgs extends Parameters<OverrideQueryBuilder["bitwiseRightShift"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitwiseRightShift(...(args as unknown as Parameters<OverrideQueryBuilder["bitwiseRightShift"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitwiseRightShiftAssign<TArgs extends Parameters<OverrideQueryBuilder["bitwiseRightShiftAssign"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitwiseRightShiftAssign(...(args as unknown as Parameters<OverrideQueryBuilder["bitwiseRightShiftAssign"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitwiseXor<TArgs extends Parameters<OverrideQueryBuilder["bitwiseXor"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitwiseXor(...(args as unknown as Parameters<OverrideQueryBuilder["bitwiseXor"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  bitXor<TArgs extends Parameters<OverrideQueryBuilder["bitXor"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).bitXor(...(args as unknown as Parameters<OverrideQueryBuilder["bitXor"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  blob() {
    return (new QueryBuilder(this)).blob();
  }
  blocked() {
    return (new QueryBuilder(this)).blocked();
  }
  bom() {
    return (new QueryBuilder(this)).bom();
  }
  boolAnd<TArgs extends Parameters<OverrideQueryBuilder["boolAnd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).boolAnd(...(args as unknown as Parameters<OverrideQueryBuilder["boolAnd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  boolean() {
    return (new QueryBuilder(this)).boolean();
  }
  boolOr<TArgs extends Parameters<OverrideQueryBuilder["boolOr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).boolOr(...(args as unknown as Parameters<OverrideQueryBuilder["boolOr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  both() {
    return (new QueryBuilder(this)).both();
  }
  boundBox<TArgs extends Parameters<OverrideQueryBuilder["boundBox"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).boundBox(...(args as unknown as Parameters<OverrideQueryBuilder["boundBox"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  box<TArgs extends Parameters<OverrideQueryBuilder["box"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).box(...(args as unknown as Parameters<OverrideQueryBuilder["box"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  breadth() {
    return (new QueryBuilder(this)).breadth();
  }
  brinDesummarizeRange<TArgs extends Parameters<OverrideQueryBuilder["brinDesummarizeRange"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).brinDesummarizeRange(...(args as unknown as Parameters<OverrideQueryBuilder["brinDesummarizeRange"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  brinSummarizeNewValues<TArgs extends Parameters<OverrideQueryBuilder["brinSummarizeNewValues"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).brinSummarizeNewValues(...(args as unknown as Parameters<OverrideQueryBuilder["brinSummarizeNewValues"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  brinSummarizeRange<TArgs extends Parameters<OverrideQueryBuilder["brinSummarizeRange"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).brinSummarizeRange(...(args as unknown as Parameters<OverrideQueryBuilder["brinSummarizeRange"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  broadcast<TArgs extends Parameters<OverrideQueryBuilder["broadcast"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).broadcast(...(args as unknown as Parameters<OverrideQueryBuilder["broadcast"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  btrim<TArgs extends Parameters<OverrideQueryBuilder["btrim"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).btrim(...(args as unknown as Parameters<OverrideQueryBuilder["btrim"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  by() {
    return (new QueryBuilder(this)).by();
  }
  c<TArgs extends Parameters<OverrideQueryBuilder["c"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).c(...(args as unknown as Parameters<OverrideQueryBuilder["c"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cache() {
    return (new QueryBuilder(this)).cache();
  }
  call() {
    return (new QueryBuilder(this)).call();
  }
  called() {
    return (new QueryBuilder(this)).called();
  }
  cardinality<TArgs extends Parameters<OverrideQueryBuilder["cardinality"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cardinality(...(args as unknown as Parameters<OverrideQueryBuilder["cardinality"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  caretAt<TArgs extends Parameters<OverrideQueryBuilder["caretAt"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).caretAt(...(args as unknown as Parameters<OverrideQueryBuilder["caretAt"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cascade() {
    return (new QueryBuilder(this)).cascade();
  }
  cascaded() {
    return (new QueryBuilder(this)).cascaded();
  }
  case<TArgs extends Parameters<OverrideQueryBuilder["case"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).case(...(args as unknown as Parameters<OverrideQueryBuilder["case"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  casefold<TArgs extends Parameters<OverrideQueryBuilder["casefold"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).casefold(...(args as unknown as Parameters<OverrideQueryBuilder["casefold"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cast() {
    return (new QueryBuilder(this)).cast();
  }
  catalog() {
    return (new QueryBuilder(this)).catalog();
  }
  catalogName() {
    return (new QueryBuilder(this)).catalogName();
  }
  cbrt<TArgs extends Parameters<OverrideQueryBuilder["cbrt"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cbrt(...(args as unknown as Parameters<OverrideQueryBuilder["cbrt"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  ceil<TArgs extends Parameters<OverrideQueryBuilder["ceil"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ceil(...(args as unknown as Parameters<OverrideQueryBuilder["ceil"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  ceiling<TArgs extends Parameters<OverrideQueryBuilder["ceiling"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ceiling(...(args as unknown as Parameters<OverrideQueryBuilder["ceiling"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  center<TArgs extends Parameters<OverrideQueryBuilder["center"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).center(...(args as unknown as Parameters<OverrideQueryBuilder["center"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  chain() {
    return (new QueryBuilder(this)).chain();
  }
  chaining() {
    return (new QueryBuilder(this)).chaining();
  }
  char() {
    return (new QueryBuilder(this)).char();
  }
  character() {
    return (new QueryBuilder(this)).character();
  }
  characteristics() {
    return (new QueryBuilder(this)).characteristics();
  }
  characterLength<TArgs extends Parameters<OverrideQueryBuilder["characterLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).characterLength(...(args as unknown as Parameters<OverrideQueryBuilder["characterLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  characters() {
    return (new QueryBuilder(this)).characters();
  }
  charactersetcatalog() {
    return (new QueryBuilder(this)).charactersetcatalog();
  }
  characterSetName() {
    return (new QueryBuilder(this)).characterSetName();
  }
  characterSetSchema() {
    return (new QueryBuilder(this)).characterSetSchema();
  }
  charLength<TArgs extends Parameters<OverrideQueryBuilder["charLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).charLength(...(args as unknown as Parameters<OverrideQueryBuilder["charLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  check() {
    return (new QueryBuilder(this)).check();
  }
  checkpoint() {
    return (new QueryBuilder(this)).checkpoint();
  }
  chr<TArgs extends Parameters<OverrideQueryBuilder["chr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).chr(...(args as unknown as Parameters<OverrideQueryBuilder["chr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  circle<TArgs extends Parameters<OverrideQueryBuilder["circle"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).circle(...(args as unknown as Parameters<OverrideQueryBuilder["circle"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  class() {
    return (new QueryBuilder(this)).class();
  }
  classifier() {
    return (new QueryBuilder(this)).classifier();
  }
  classOrigin() {
    return (new QueryBuilder(this)).classOrigin();
  }
  clob() {
    return (new QueryBuilder(this)).clob();
  }
  clockTimestamp<TArgs extends Parameters<OverrideQueryBuilder["clockTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).clockTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["clockTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  close() {
    return (new QueryBuilder(this)).close();
  }
  closestPoint<TArgs extends Parameters<OverrideQueryBuilder["closestPoint"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).closestPoint(...(args as unknown as Parameters<OverrideQueryBuilder["closestPoint"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cluster() {
    return (new QueryBuilder(this)).cluster();
  }
  coalesce<TArgs extends Parameters<OverrideQueryBuilder["coalesce"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).coalesce(...(args as unknown as Parameters<OverrideQueryBuilder["coalesce"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cobol() {
    return (new QueryBuilder(this)).cobol();
  }
  colDescription<TArgs extends Parameters<OverrideQueryBuilder["colDescription"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).colDescription(...(args as unknown as Parameters<OverrideQueryBuilder["colDescription"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  collate() {
    return (new QueryBuilder(this)).collate();
  }
  collation() {
    return (new QueryBuilder(this)).collation();
  }
  collationCatalog() {
    return (new QueryBuilder(this)).collationCatalog();
  }
  collationFor<TArgs extends Parameters<OverrideQueryBuilder["collationFor"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).collationFor(...(args as unknown as Parameters<OverrideQueryBuilder["collationFor"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  collationName() {
    return (new QueryBuilder(this)).collationName();
  }
  collationSchema() {
    return (new QueryBuilder(this)).collationSchema();
  }
  collect() {
    return (new QueryBuilder(this)).collect();
  }
  column<TArgs extends Parameters<OverrideQueryBuilder["column"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).column(...(args as unknown as Parameters<OverrideQueryBuilder["column"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  columnName() {
    return (new QueryBuilder(this)).columnName();
  }
  columns() {
    return (new QueryBuilder(this)).columns();
  }
  comma<TArgs extends Parameters<OverrideQueryBuilder["comma"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).comma(...(args as unknown as Parameters<OverrideQueryBuilder["comma"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  commandFunction() {
    return (new QueryBuilder(this)).commandFunction();
  }
  commandfunctioncode() {
    return (new QueryBuilder(this)).commandfunctioncode();
  }
  comment() {
    return (new QueryBuilder(this)).comment();
  }
  comments() {
    return (new QueryBuilder(this)).comments();
  }
  commit() {
    return (new QueryBuilder(this)).commit();
  }
  commitPreparedTransaction<TArgs extends Parameters<OverrideQueryBuilder["commitPreparedTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).commitPreparedTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["commitPreparedTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  committed() {
    return (new QueryBuilder(this)).committed();
  }
  commitTransaction<TArgs extends Parameters<OverrideQueryBuilder["commitTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).commitTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["commitTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  compression() {
    return (new QueryBuilder(this)).compression();
  }
  concat<TArgs extends Parameters<OverrideQueryBuilder["concat"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).concat(...(args as unknown as Parameters<OverrideQueryBuilder["concat"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  concatWs<TArgs extends Parameters<OverrideQueryBuilder["concatWs"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).concatWs(...(args as unknown as Parameters<OverrideQueryBuilder["concatWs"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  concurrently() {
    return (new QueryBuilder(this)).concurrently();
  }
  condition() {
    return (new QueryBuilder(this)).condition();
  }
  conditional() {
    return (new QueryBuilder(this)).conditional();
  }
  conditionNumber() {
    return (new QueryBuilder(this)).conditionNumber();
  }
  configuration() {
    return (new QueryBuilder(this)).configuration();
  }
  conflict() {
    return (new QueryBuilder(this)).conflict();
  }
  connect() {
    return (new QueryBuilder(this)).connect();
  }
  connection() {
    return (new QueryBuilder(this)).connection();
  }
  connectionName() {
    return (new QueryBuilder(this)).connectionName();
  }
  constraint() {
    return (new QueryBuilder(this)).constraint();
  }
  constraintCatalog() {
    return (new QueryBuilder(this)).constraintCatalog();
  }
  constraintName() {
    return (new QueryBuilder(this)).constraintName();
  }
  constraints() {
    return (new QueryBuilder(this)).constraints();
  }
  constraintSchema() {
    return (new QueryBuilder(this)).constraintSchema();
  }
  constructorKeyword() {
    return (new QueryBuilder(this)).constructorKeyword();
  }
  containedBy<TArgs extends Parameters<OverrideQueryBuilder["containedBy"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).containedBy(...(args as unknown as Parameters<OverrideQueryBuilder["containedBy"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  containment<TArgs extends Parameters<OverrideQueryBuilder["containment"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).containment(...(args as unknown as Parameters<OverrideQueryBuilder["containment"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  contains() {
    return (new QueryBuilder(this)).contains();
  }
  content() {
    return (new QueryBuilder(this)).content();
  }
  continue() {
    return (new QueryBuilder(this)).continue();
  }
  control() {
    return (new QueryBuilder(this)).control();
  }
  conversion() {
    return (new QueryBuilder(this)).conversion();
  }
  convert<TArgs extends Parameters<OverrideQueryBuilder["convert"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).convert(...(args as unknown as Parameters<OverrideQueryBuilder["convert"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  convertFrom<TArgs extends Parameters<OverrideQueryBuilder["convertFrom"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).convertFrom(...(args as unknown as Parameters<OverrideQueryBuilder["convertFrom"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  convertTo<TArgs extends Parameters<OverrideQueryBuilder["convertTo"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).convertTo(...(args as unknown as Parameters<OverrideQueryBuilder["convertTo"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  copartition() {
    return (new QueryBuilder(this)).copartition();
  }
  copy() {
    return (new QueryBuilder(this)).copy();
  }
  corr<TArgs extends Parameters<OverrideQueryBuilder["corr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).corr(...(args as unknown as Parameters<OverrideQueryBuilder["corr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  corresponding() {
    return (new QueryBuilder(this)).corresponding();
  }
  cos<TArgs extends Parameters<OverrideQueryBuilder["cos"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cos(...(args as unknown as Parameters<OverrideQueryBuilder["cos"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cosd<TArgs extends Parameters<OverrideQueryBuilder["cosd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cosd(...(args as unknown as Parameters<OverrideQueryBuilder["cosd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cosh<TArgs extends Parameters<OverrideQueryBuilder["cosh"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cosh(...(args as unknown as Parameters<OverrideQueryBuilder["cosh"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cost() {
    return (new QueryBuilder(this)).cost();
  }
  cot<TArgs extends Parameters<OverrideQueryBuilder["cot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cot(...(args as unknown as Parameters<OverrideQueryBuilder["cot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cotd<TArgs extends Parameters<OverrideQueryBuilder["cotd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cotd(...(args as unknown as Parameters<OverrideQueryBuilder["cotd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  count<TArgs extends Parameters<OverrideQueryBuilder["count"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).count(...(args as unknown as Parameters<OverrideQueryBuilder["count"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  covarPop<TArgs extends Parameters<OverrideQueryBuilder["covarPop"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).covarPop(...(args as unknown as Parameters<OverrideQueryBuilder["covarPop"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  covarSamp<TArgs extends Parameters<OverrideQueryBuilder["covarSamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).covarSamp(...(args as unknown as Parameters<OverrideQueryBuilder["covarSamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  crc32<TArgs extends Parameters<OverrideQueryBuilder["crc32"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).crc32(...(args as unknown as Parameters<OverrideQueryBuilder["crc32"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  crc32c<TArgs extends Parameters<OverrideQueryBuilder["crc32c"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).crc32c(...(args as unknown as Parameters<OverrideQueryBuilder["crc32c"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  create() {
    return (new QueryBuilder(this)).create();
  }
  cross() {
    return (new QueryBuilder(this)).cross();
  }
  crosses<TArgs extends Parameters<OverrideQueryBuilder["crosses"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).crosses(...(args as unknown as Parameters<OverrideQueryBuilder["crosses"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  crossJoin<TArgs extends Parameters<OverrideQueryBuilder["crossJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).crossJoin(...(args as unknown as Parameters<OverrideQueryBuilder["crossJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  crossJoinLateral<TArgs extends Parameters<OverrideQueryBuilder["crossJoinLateral"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).crossJoinLateral(...(args as unknown as Parameters<OverrideQueryBuilder["crossJoinLateral"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  csv() {
    return (new QueryBuilder(this)).csv();
  }
  cube() {
    return (new QueryBuilder(this)).cube();
  }
  cumeDist<TArgs extends Parameters<OverrideQueryBuilder["cumeDist"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cumeDist(...(args as unknown as Parameters<OverrideQueryBuilder["cumeDist"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  current() {
    return (new QueryBuilder(this)).current();
  }
  currentCatalog() {
    return (new QueryBuilder(this)).currentCatalog();
  }
  currentDatabase<TArgs extends Parameters<OverrideQueryBuilder["currentDatabase"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentDatabase(...(args as unknown as Parameters<OverrideQueryBuilder["currentDatabase"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currentDate<TArgs extends Parameters<OverrideQueryBuilder["currentDate"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentDate(...(args as unknown as Parameters<OverrideQueryBuilder["currentDate"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currentdefaulttransformgroup() {
    return (new QueryBuilder(this)).currentdefaulttransformgroup();
  }
  currentPath() {
    return (new QueryBuilder(this)).currentPath();
  }
  currentQuery<TArgs extends Parameters<OverrideQueryBuilder["currentQuery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentQuery(...(args as unknown as Parameters<OverrideQueryBuilder["currentQuery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currentRole() {
    return (new QueryBuilder(this)).currentRole();
  }
  currentRow() {
    return (new QueryBuilder(this)).currentRow();
  }
  currentSchema<TArgs extends Parameters<OverrideQueryBuilder["currentSchema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentSchema(...(args as unknown as Parameters<OverrideQueryBuilder["currentSchema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currentSchemas<TArgs extends Parameters<OverrideQueryBuilder["currentSchemas"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentSchemas(...(args as unknown as Parameters<OverrideQueryBuilder["currentSchemas"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currentSetting<TArgs extends Parameters<OverrideQueryBuilder["currentSetting"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentSetting(...(args as unknown as Parameters<OverrideQueryBuilder["currentSetting"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currentTime<TArgs extends Parameters<OverrideQueryBuilder["currentTime"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentTime(...(args as unknown as Parameters<OverrideQueryBuilder["currentTime"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currentTimestamp<TArgs extends Parameters<OverrideQueryBuilder["currentTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currentTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["currentTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  currenttransformgroupfortype() {
    return (new QueryBuilder(this)).currenttransformgroupfortype();
  }
  currentUser() {
    return (new QueryBuilder(this)).currentUser();
  }
  currval<TArgs extends Parameters<OverrideQueryBuilder["currval"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).currval(...(args as unknown as Parameters<OverrideQueryBuilder["currval"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cursor() {
    return (new QueryBuilder(this)).cursor();
  }
  cursorName() {
    return (new QueryBuilder(this)).cursorName();
  }
  cursorToXml<TArgs extends Parameters<OverrideQueryBuilder["cursorToXml"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cursorToXml(...(args as unknown as Parameters<OverrideQueryBuilder["cursorToXml"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cursorToXmlschema<TArgs extends Parameters<OverrideQueryBuilder["cursorToXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).cursorToXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["cursorToXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  cycle() {
    return (new QueryBuilder(this)).cycle();
  }
  data() {
    return (new QueryBuilder(this)).data();
  }
  database() {
    return (new QueryBuilder(this)).database();
  }
  databaseToXml<TArgs extends Parameters<OverrideQueryBuilder["databaseToXml"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).databaseToXml(...(args as unknown as Parameters<OverrideQueryBuilder["databaseToXml"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  databaseToXmlAndXmlschema<TArgs extends Parameters<OverrideQueryBuilder["databaseToXmlAndXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).databaseToXmlAndXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["databaseToXmlAndXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  databaseToXmlschema<TArgs extends Parameters<OverrideQueryBuilder["databaseToXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).databaseToXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["databaseToXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  datalink() {
    return (new QueryBuilder(this)).datalink();
  }
  date() {
    return (new QueryBuilder(this)).date();
  }
  dateAdd<TArgs extends Parameters<OverrideQueryBuilder["dateAdd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).dateAdd(...(args as unknown as Parameters<OverrideQueryBuilder["dateAdd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  dateBin<TArgs extends Parameters<OverrideQueryBuilder["dateBin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).dateBin(...(args as unknown as Parameters<OverrideQueryBuilder["dateBin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  datePart<TArgs extends Parameters<OverrideQueryBuilder["datePart"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).datePart(...(args as unknown as Parameters<OverrideQueryBuilder["datePart"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  dateSubtract<TArgs extends Parameters<OverrideQueryBuilder["dateSubtract"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).dateSubtract(...(args as unknown as Parameters<OverrideQueryBuilder["dateSubtract"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  datetimeintervalcode() {
    return (new QueryBuilder(this)).datetimeintervalcode();
  }
  datetimeintervalprecision() {
    return (new QueryBuilder(this)).datetimeintervalprecision();
  }
  dateTrunc<TArgs extends Parameters<OverrideQueryBuilder["dateTrunc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).dateTrunc(...(args as unknown as Parameters<OverrideQueryBuilder["dateTrunc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  day() {
    return (new QueryBuilder(this)).day();
  }
  db() {
    return (new QueryBuilder(this)).db();
  }
  deallocate() {
    return (new QueryBuilder(this)).deallocate();
  }
  dec() {
    return (new QueryBuilder(this)).dec();
  }
  decfloat() {
    return (new QueryBuilder(this)).decfloat();
  }
  decimal() {
    return (new QueryBuilder(this)).decimal();
  }
  declare() {
    return (new QueryBuilder(this)).declare();
  }
  decode<TArgs extends Parameters<OverrideQueryBuilder["decode"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).decode(...(args as unknown as Parameters<OverrideQueryBuilder["decode"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  default() {
    return (new QueryBuilder(this)).default();
  }
  defaults() {
    return (new QueryBuilder(this)).defaults();
  }
  deferrable() {
    return (new QueryBuilder(this)).deferrable();
  }
  deferred() {
    return (new QueryBuilder(this)).deferred();
  }
  define() {
    return (new QueryBuilder(this)).define();
  }
  defined() {
    return (new QueryBuilder(this)).defined();
  }
  definer() {
    return (new QueryBuilder(this)).definer();
  }
  degree() {
    return (new QueryBuilder(this)).degree();
  }
  degrees<TArgs extends Parameters<OverrideQueryBuilder["degrees"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).degrees(...(args as unknown as Parameters<OverrideQueryBuilder["degrees"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  delete<TArgs extends Parameters<OverrideQueryBuilder["delete"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).delete(...(args as unknown as Parameters<OverrideQueryBuilder["delete"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  delimiter() {
    return (new QueryBuilder(this)).delimiter();
  }
  delimiters() {
    return (new QueryBuilder(this)).delimiters();
  }
  denseRank<TArgs extends Parameters<OverrideQueryBuilder["denseRank"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).denseRank(...(args as unknown as Parameters<OverrideQueryBuilder["denseRank"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  depends() {
    return (new QueryBuilder(this)).depends();
  }
  depth() {
    return (new QueryBuilder(this)).depth();
  }
  deref() {
    return (new QueryBuilder(this)).deref();
  }
  derived() {
    return (new QueryBuilder(this)).derived();
  }
  desc<TArgs extends Parameters<OverrideQueryBuilder["desc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).desc(...(args as unknown as Parameters<OverrideQueryBuilder["desc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  describe() {
    return (new QueryBuilder(this)).describe();
  }
  descriptor() {
    return (new QueryBuilder(this)).descriptor();
  }
  detach() {
    return (new QueryBuilder(this)).detach();
  }
  deterministic() {
    return (new QueryBuilder(this)).deterministic();
  }
  diagnostics() {
    return (new QueryBuilder(this)).diagnostics();
  }
  diagonal<TArgs extends Parameters<OverrideQueryBuilder["diagonal"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).diagonal(...(args as unknown as Parameters<OverrideQueryBuilder["diagonal"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  diameter<TArgs extends Parameters<OverrideQueryBuilder["diameter"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).diameter(...(args as unknown as Parameters<OverrideQueryBuilder["diameter"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  dictionary() {
    return (new QueryBuilder(this)).dictionary();
  }
  disable() {
    return (new QueryBuilder(this)).disable();
  }
  discard() {
    return (new QueryBuilder(this)).discard();
  }
  disconnect() {
    return (new QueryBuilder(this)).disconnect();
  }
  dispatch() {
    return (new QueryBuilder(this)).dispatch();
  }
  distance<TArgs extends Parameters<OverrideQueryBuilder["distance"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).distance(...(args as unknown as Parameters<OverrideQueryBuilder["distance"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  distinct() {
    return (new QueryBuilder(this)).distinct();
  }
  div<TArgs extends Parameters<OverrideQueryBuilder["div"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).div(...(args as unknown as Parameters<OverrideQueryBuilder["div"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  divide<TArgs extends Parameters<OverrideQueryBuilder["divide"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).divide(...(args as unknown as Parameters<OverrideQueryBuilder["divide"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  dlnewcopy() {
    return (new QueryBuilder(this)).dlnewcopy();
  }
  dlpreviouscopy() {
    return (new QueryBuilder(this)).dlpreviouscopy();
  }
  dlurlcomplete() {
    return (new QueryBuilder(this)).dlurlcomplete();
  }
  dlurlcompleteonly() {
    return (new QueryBuilder(this)).dlurlcompleteonly();
  }
  dlurlcompletewrite() {
    return (new QueryBuilder(this)).dlurlcompletewrite();
  }
  dlurlpath() {
    return (new QueryBuilder(this)).dlurlpath();
  }
  dlurlpathonly() {
    return (new QueryBuilder(this)).dlurlpathonly();
  }
  dlurlpathwrite() {
    return (new QueryBuilder(this)).dlurlpathwrite();
  }
  dlurlscheme() {
    return (new QueryBuilder(this)).dlurlscheme();
  }
  dlurlserver() {
    return (new QueryBuilder(this)).dlurlserver();
  }
  dlvalue() {
    return (new QueryBuilder(this)).dlvalue();
  }
  do() {
    return (new QueryBuilder(this)).do();
  }
  document() {
    return (new QueryBuilder(this)).document();
  }
  domain() {
    return (new QueryBuilder(this)).domain();
  }
  doNothing<TArgs extends Parameters<OverrideQueryBuilder["doNothing"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).doNothing(...(args as unknown as Parameters<OverrideQueryBuilder["doNothing"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  double() {
    return (new QueryBuilder(this)).double();
  }
  doUpdate<TArgs extends Parameters<OverrideQueryBuilder["doUpdate"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).doUpdate(...(args as unknown as Parameters<OverrideQueryBuilder["doUpdate"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  drop() {
    return (new QueryBuilder(this)).drop();
  }
  dynamic() {
    return (new QueryBuilder(this)).dynamic();
  }
  dynamicFunction() {
    return (new QueryBuilder(this)).dynamicFunction();
  }
  dynamicfunctioncode() {
    return (new QueryBuilder(this)).dynamicfunctioncode();
  }
  each() {
    return (new QueryBuilder(this)).each();
  }
  element() {
    return (new QueryBuilder(this)).element();
  }
  else<TArgs extends Parameters<OverrideQueryBuilder["else"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).else(...(args as unknown as Parameters<OverrideQueryBuilder["else"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  empty() {
    return (new QueryBuilder(this)).empty();
  }
  enable() {
    return (new QueryBuilder(this)).enable();
  }
  encode<TArgs extends Parameters<OverrideQueryBuilder["encode"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).encode(...(args as unknown as Parameters<OverrideQueryBuilder["encode"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  encoding() {
    return (new QueryBuilder(this)).encoding();
  }
  encrypted() {
    return (new QueryBuilder(this)).encrypted();
  }
  end() {
    return (new QueryBuilder(this)).end();
  }
  endExec() {
    return (new QueryBuilder(this)).endExec();
  }
  endFrame() {
    return (new QueryBuilder(this)).endFrame();
  }
  endPartition() {
    return (new QueryBuilder(this)).endPartition();
  }
  enforced() {
    return (new QueryBuilder(this)).enforced();
  }
  enum() {
    return (new QueryBuilder(this)).enum();
  }
  enumFirst<TArgs extends Parameters<OverrideQueryBuilder["enumFirst"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).enumFirst(...(args as unknown as Parameters<OverrideQueryBuilder["enumFirst"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  enumLast<TArgs extends Parameters<OverrideQueryBuilder["enumLast"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).enumLast(...(args as unknown as Parameters<OverrideQueryBuilder["enumLast"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  enumRange<TArgs extends Parameters<OverrideQueryBuilder["enumRange"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).enumRange(...(args as unknown as Parameters<OverrideQueryBuilder["enumRange"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  eq<TArgs extends Parameters<OverrideQueryBuilder["eq"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).eq(...(args as unknown as Parameters<OverrideQueryBuilder["eq"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  equals() {
    return (new QueryBuilder(this)).equals();
  }
  erf<TArgs extends Parameters<OverrideQueryBuilder["erf"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).erf(...(args as unknown as Parameters<OverrideQueryBuilder["erf"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  erfc<TArgs extends Parameters<OverrideQueryBuilder["erfc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).erfc(...(args as unknown as Parameters<OverrideQueryBuilder["erfc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  error() {
    return (new QueryBuilder(this)).error();
  }
  escape<TArgs extends Parameters<OverrideQueryBuilder["escape"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).escape(...(args as unknown as Parameters<OverrideQueryBuilder["escape"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  event() {
    return (new QueryBuilder(this)).event();
  }
  every<TArgs extends Parameters<OverrideQueryBuilder["every"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).every(...(args as unknown as Parameters<OverrideQueryBuilder["every"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  except<TArgs extends Parameters<OverrideQueryBuilder["except"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).except(...(args as unknown as Parameters<OverrideQueryBuilder["except"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  exceptAll<TArgs extends Parameters<OverrideQueryBuilder["exceptAll"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).exceptAll(...(args as unknown as Parameters<OverrideQueryBuilder["exceptAll"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  exception() {
    return (new QueryBuilder(this)).exception();
  }
  exclamation<TArgs extends Parameters<OverrideQueryBuilder["exclamation"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).exclamation(...(args as unknown as Parameters<OverrideQueryBuilder["exclamation"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  exclude() {
    return (new QueryBuilder(this)).exclude();
  }
  excluding() {
    return (new QueryBuilder(this)).excluding();
  }
  exclusive() {
    return (new QueryBuilder(this)).exclusive();
  }
  execKeyword() {
    return (new QueryBuilder(this)).execKeyword();
  }
  executeKeyword() {
    return (new QueryBuilder(this)).executeKeyword();
  }
  exists<TArgs extends Parameters<OverrideQueryBuilder["exists"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).exists(...(args as unknown as Parameters<OverrideQueryBuilder["exists"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  exp<TArgs extends Parameters<OverrideQueryBuilder["exp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).exp(...(args as unknown as Parameters<OverrideQueryBuilder["exp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  explain() {
    return (new QueryBuilder(this)).explain();
  }
  expression() {
    return (new QueryBuilder(this)).expression();
  }
  extension() {
    return (new QueryBuilder(this)).extension();
  }
  external() {
    return (new QueryBuilder(this)).external();
  }
  extract<TArgs extends Parameters<OverrideQueryBuilder["extract"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).extract(...(args as unknown as Parameters<OverrideQueryBuilder["extract"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  factorial<TArgs extends Parameters<OverrideQueryBuilder["factorial"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).factorial(...(args as unknown as Parameters<OverrideQueryBuilder["factorial"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  false() {
    return (new QueryBuilder(this)).false();
  }
  family<TArgs extends Parameters<OverrideQueryBuilder["family"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).family(...(args as unknown as Parameters<OverrideQueryBuilder["family"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  fetch<TArgs extends Parameters<OverrideQueryBuilder["fetch"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).fetch(...(args as unknown as Parameters<OverrideQueryBuilder["fetch"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  file() {
    return (new QueryBuilder(this)).file();
  }
  filter() {
    return (new QueryBuilder(this)).filter();
  }
  final() {
    return (new QueryBuilder(this)).final();
  }
  finalize() {
    return (new QueryBuilder(this)).finalize();
  }
  finish() {
    return (new QueryBuilder(this)).finish();
  }
  first() {
    return (new QueryBuilder(this)).first();
  }
  firstValue<TArgs extends Parameters<OverrideQueryBuilder["firstValue"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).firstValue(...(args as unknown as Parameters<OverrideQueryBuilder["firstValue"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  flag() {
    return (new QueryBuilder(this)).flag();
  }
  float() {
    return (new QueryBuilder(this)).float();
  }
  floor<TArgs extends Parameters<OverrideQueryBuilder["floor"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).floor(...(args as unknown as Parameters<OverrideQueryBuilder["floor"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  following() {
    return (new QueryBuilder(this)).following();
  }
  for() {
    return (new QueryBuilder(this)).for();
  }
  force() {
    return (new QueryBuilder(this)).force();
  }
  foreign() {
    return (new QueryBuilder(this)).foreign();
  }
  format<TArgs extends Parameters<OverrideQueryBuilder["format"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).format(...(args as unknown as Parameters<OverrideQueryBuilder["format"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  formatType<TArgs extends Parameters<OverrideQueryBuilder["formatType"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).formatType(...(args as unknown as Parameters<OverrideQueryBuilder["formatType"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  fortran() {
    return (new QueryBuilder(this)).fortran();
  }
  forward() {
    return (new QueryBuilder(this)).forward();
  }
  found() {
    return (new QueryBuilder(this)).found();
  }
  frameRow() {
    return (new QueryBuilder(this)).frameRow();
  }
  free() {
    return (new QueryBuilder(this)).free();
  }
  freeze() {
    return (new QueryBuilder(this)).freeze();
  }
  from<TArgs extends Parameters<OverrideQueryBuilder["from"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).from(...(args as unknown as Parameters<OverrideQueryBuilder["from"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  fs() {
    return (new QueryBuilder(this)).fs();
  }
  fulfill() {
    return (new QueryBuilder(this)).fulfill();
  }
  full() {
    return (new QueryBuilder(this)).full();
  }
  fullJoin<TArgs extends Parameters<OverrideQueryBuilder["fullJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).fullJoin(...(args as unknown as Parameters<OverrideQueryBuilder["fullJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  function() {
    return (new QueryBuilder(this)).function();
  }
  functions() {
    return (new QueryBuilder(this)).functions();
  }
  fusion() {
    return (new QueryBuilder(this)).fusion();
  }
  g() {
    return (new QueryBuilder(this)).g();
  }
  gamma<TArgs extends Parameters<OverrideQueryBuilder["gamma"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).gamma(...(args as unknown as Parameters<OverrideQueryBuilder["gamma"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  gcd<TArgs extends Parameters<OverrideQueryBuilder["gcd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).gcd(...(args as unknown as Parameters<OverrideQueryBuilder["gcd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  general() {
    return (new QueryBuilder(this)).general();
  }
  generated() {
    return (new QueryBuilder(this)).generated();
  }
  generateSeries<TArgs extends Parameters<OverrideQueryBuilder["generateSeries"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).generateSeries(...(args as unknown as Parameters<OverrideQueryBuilder["generateSeries"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  generateSubscripts<TArgs extends Parameters<OverrideQueryBuilder["generateSubscripts"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).generateSubscripts(...(args as unknown as Parameters<OverrideQueryBuilder["generateSubscripts"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  genRandomUuid<TArgs extends Parameters<OverrideQueryBuilder["genRandomUuid"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).genRandomUuid(...(args as unknown as Parameters<OverrideQueryBuilder["genRandomUuid"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  get() {
    return (new QueryBuilder(this)).get();
  }
  getBit<TArgs extends Parameters<OverrideQueryBuilder["getBit"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).getBit(...(args as unknown as Parameters<OverrideQueryBuilder["getBit"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  getByte<TArgs extends Parameters<OverrideQueryBuilder["getByte"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).getByte(...(args as unknown as Parameters<OverrideQueryBuilder["getByte"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  getCurrentTsConfig<TArgs extends Parameters<OverrideQueryBuilder["getCurrentTsConfig"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).getCurrentTsConfig(...(args as unknown as Parameters<OverrideQueryBuilder["getCurrentTsConfig"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  ginCleanPendingList<TArgs extends Parameters<OverrideQueryBuilder["ginCleanPendingList"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ginCleanPendingList(...(args as unknown as Parameters<OverrideQueryBuilder["ginCleanPendingList"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  global() {
    return (new QueryBuilder(this)).global();
  }
  go() {
    return (new QueryBuilder(this)).go();
  }
  goto() {
    return (new QueryBuilder(this)).goto();
  }
  grant() {
    return (new QueryBuilder(this)).grant();
  }
  granted() {
    return (new QueryBuilder(this)).granted();
  }
  greatest<TArgs extends Parameters<OverrideQueryBuilder["greatest"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).greatest(...(args as unknown as Parameters<OverrideQueryBuilder["greatest"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  group() {
    return (new QueryBuilder(this)).group();
  }
  groupBy<TArgs extends Parameters<OverrideQueryBuilder["groupBy"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).groupBy(...(args as unknown as Parameters<OverrideQueryBuilder["groupBy"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  groupByDistinct<TArgs extends Parameters<OverrideQueryBuilder["groupByDistinct"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).groupByDistinct(...(args as unknown as Parameters<OverrideQueryBuilder["groupByDistinct"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  grouping<TArgs extends Parameters<OverrideQueryBuilder["grouping"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).grouping(...(args as unknown as Parameters<OverrideQueryBuilder["grouping"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  groups() {
    return (new QueryBuilder(this)).groups();
  }
  gt<TArgs extends Parameters<OverrideQueryBuilder["gt"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).gt(...(args as unknown as Parameters<OverrideQueryBuilder["gt"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  gte<TArgs extends Parameters<OverrideQueryBuilder["gte"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).gte(...(args as unknown as Parameters<OverrideQueryBuilder["gte"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  handler() {
    return (new QueryBuilder(this)).handler();
  }
  hasAnyColumnPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasAnyColumnPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasAnyColumnPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasAnyColumnPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasColumnPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasColumnPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasColumnPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasColumnPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasDatabasePrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasDatabasePrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasDatabasePrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasDatabasePrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasForeignDataWrapperPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasForeignDataWrapperPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasForeignDataWrapperPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasForeignDataWrapperPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasFunctionPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasFunctionPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasFunctionPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasFunctionPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hash<TArgs extends Parameters<OverrideQueryBuilder["hash"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hash(...(args as unknown as Parameters<OverrideQueryBuilder["hash"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasLanguagePrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasLanguagePrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasLanguagePrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasLanguagePrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasLargeobjectPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasLargeobjectPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasLargeobjectPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasLargeobjectPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasParameterPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasParameterPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasParameterPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasParameterPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasSchemaPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasSchemaPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasSchemaPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasSchemaPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasSequencePrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasSequencePrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasSequencePrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasSequencePrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasServerPrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasServerPrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasServerPrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasServerPrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasTablePrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasTablePrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasTablePrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasTablePrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasTablespacePrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasTablespacePrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasTablespacePrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasTablespacePrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hasTypePrivilege<TArgs extends Parameters<OverrideQueryBuilder["hasTypePrivilege"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hasTypePrivilege(...(args as unknown as Parameters<OverrideQueryBuilder["hasTypePrivilege"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  having<TArgs extends Parameters<OverrideQueryBuilder["having"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).having(...(args as unknown as Parameters<OverrideQueryBuilder["having"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  header() {
    return (new QueryBuilder(this)).header();
  }
  height<TArgs extends Parameters<OverrideQueryBuilder["height"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).height(...(args as unknown as Parameters<OverrideQueryBuilder["height"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hex() {
    return (new QueryBuilder(this)).hex();
  }
  hierarchy() {
    return (new QueryBuilder(this)).hierarchy();
  }
  hold() {
    return (new QueryBuilder(this)).hold();
  }
  horizontal<TArgs extends Parameters<OverrideQueryBuilder["horizontal"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).horizontal(...(args as unknown as Parameters<OverrideQueryBuilder["horizontal"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  host<TArgs extends Parameters<OverrideQueryBuilder["host"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).host(...(args as unknown as Parameters<OverrideQueryBuilder["host"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hostmask<TArgs extends Parameters<OverrideQueryBuilder["hostmask"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).hostmask(...(args as unknown as Parameters<OverrideQueryBuilder["hostmask"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  hour() {
    return (new QueryBuilder(this)).hour();
  }
  i(...args: Parameters<BaseRawQueryBuilder["i"]>) {
    return (new QueryBuilder(this)).i(...args);
  }
  icuUnicodeVersion<TArgs extends Parameters<OverrideQueryBuilder["icuUnicodeVersion"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).icuUnicodeVersion(...(args as unknown as Parameters<OverrideQueryBuilder["icuUnicodeVersion"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  id() {
    return (new QueryBuilder(this)).id();
  }
  identifier(...args: Parameters<BaseRawQueryBuilder["identifier"]>) {
    return (new QueryBuilder(this)).identifier(...args);
  }
  identifierArray(...args: Parameters<BaseRawQueryBuilder["identifierArray"]>) {
    return (new QueryBuilder(this)).identifierArray(...args);
  }
  identity() {
    return (new QueryBuilder(this)).identity();
  }
  if() {
    return (new QueryBuilder(this)).if();
  }
  ignore() {
    return (new QueryBuilder(this)).ignore();
  }
  ilike<TArgs extends Parameters<OverrideQueryBuilder["ilike"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ilike(...(args as unknown as Parameters<OverrideQueryBuilder["ilike"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  immediate() {
    return (new QueryBuilder(this)).immediate();
  }
  immediately() {
    return (new QueryBuilder(this)).immediately();
  }
  immutable() {
    return (new QueryBuilder(this)).immutable();
  }
  implementation() {
    return (new QueryBuilder(this)).implementation();
  }
  implicit() {
    return (new QueryBuilder(this)).implicit();
  }
  import() {
    return (new QueryBuilder(this)).import();
  }
  in<TArgs extends Parameters<OverrideQueryBuilder["in"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).in(...(args as unknown as Parameters<OverrideQueryBuilder["in"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  include() {
    return (new QueryBuilder(this)).include();
  }
  including() {
    return (new QueryBuilder(this)).including();
  }
  increment() {
    return (new QueryBuilder(this)).increment();
  }
  indent() {
    return (new QueryBuilder(this)).indent();
  }
  index() {
    return (new QueryBuilder(this)).index();
  }
  indexes() {
    return (new QueryBuilder(this)).indexes();
  }
  indicator() {
    return (new QueryBuilder(this)).indicator();
  }
  inetClientAddr<TArgs extends Parameters<OverrideQueryBuilder["inetClientAddr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).inetClientAddr(...(args as unknown as Parameters<OverrideQueryBuilder["inetClientAddr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  inetClientPort<TArgs extends Parameters<OverrideQueryBuilder["inetClientPort"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).inetClientPort(...(args as unknown as Parameters<OverrideQueryBuilder["inetClientPort"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  inetMerge<TArgs extends Parameters<OverrideQueryBuilder["inetMerge"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).inetMerge(...(args as unknown as Parameters<OverrideQueryBuilder["inetMerge"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  inetSameFamily<TArgs extends Parameters<OverrideQueryBuilder["inetSameFamily"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).inetSameFamily(...(args as unknown as Parameters<OverrideQueryBuilder["inetSameFamily"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  inetServerAddr<TArgs extends Parameters<OverrideQueryBuilder["inetServerAddr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).inetServerAddr(...(args as unknown as Parameters<OverrideQueryBuilder["inetServerAddr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  inetServerPort<TArgs extends Parameters<OverrideQueryBuilder["inetServerPort"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).inetServerPort(...(args as unknown as Parameters<OverrideQueryBuilder["inetServerPort"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  inherit() {
    return (new QueryBuilder(this)).inherit();
  }
  inherits() {
    return (new QueryBuilder(this)).inherits();
  }
  initcap<TArgs extends Parameters<OverrideQueryBuilder["initcap"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).initcap(...(args as unknown as Parameters<OverrideQueryBuilder["initcap"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  initial() {
    return (new QueryBuilder(this)).initial();
  }
  initially() {
    return (new QueryBuilder(this)).initially();
  }
  inline() {
    return (new QueryBuilder(this)).inline();
  }
  inner() {
    return (new QueryBuilder(this)).inner();
  }
  innerJoin<TArgs extends Parameters<OverrideQueryBuilder["innerJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).innerJoin(...(args as unknown as Parameters<OverrideQueryBuilder["innerJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  innerJoinLateral<TArgs extends Parameters<OverrideQueryBuilder["innerJoinLateral"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).innerJoinLateral(...(args as unknown as Parameters<OverrideQueryBuilder["innerJoinLateral"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  inout() {
    return (new QueryBuilder(this)).inout();
  }
  input() {
    return (new QueryBuilder(this)).input();
  }
  insensitive() {
    return (new QueryBuilder(this)).insensitive();
  }
  insert<TArgs extends Parameters<OverrideQueryBuilder["insert"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).insert(...(args as unknown as Parameters<OverrideQueryBuilder["insert"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  insertInto<TArgs extends Parameters<OverrideQueryBuilder["insertInto"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).insertInto(...(args as unknown as Parameters<OverrideQueryBuilder["insertInto"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  instance() {
    return (new QueryBuilder(this)).instance();
  }
  instantiable() {
    return (new QueryBuilder(this)).instantiable();
  }
  instead() {
    return (new QueryBuilder(this)).instead();
  }
  int() {
    return (new QueryBuilder(this)).int();
  }
  integer() {
    return (new QueryBuilder(this)).integer();
  }
  integrity() {
    return (new QueryBuilder(this)).integrity();
  }
  intersect<TArgs extends Parameters<OverrideQueryBuilder["intersect"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).intersect(...(args as unknown as Parameters<OverrideQueryBuilder["intersect"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  intersectAll<TArgs extends Parameters<OverrideQueryBuilder["intersectAll"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).intersectAll(...(args as unknown as Parameters<OverrideQueryBuilder["intersectAll"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  intersection() {
    return (new QueryBuilder(this)).intersection();
  }
  interval() {
    return (new QueryBuilder(this)).interval();
  }
  into<TArgs extends Parameters<OverrideQueryBuilder["into"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).into(...(args as unknown as Parameters<OverrideQueryBuilder["into"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  invoker() {
    return (new QueryBuilder(this)).invoker();
  }
  is<TArgs extends Parameters<OverrideQueryBuilder["is"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).is(...(args as unknown as Parameters<OverrideQueryBuilder["is"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  isclosed<TArgs extends Parameters<OverrideQueryBuilder["isclosed"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).isclosed(...(args as unknown as Parameters<OverrideQueryBuilder["isclosed"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  isempty<TArgs extends Parameters<OverrideQueryBuilder["isempty"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).isempty(...(args as unknown as Parameters<OverrideQueryBuilder["isempty"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  isfinite<TArgs extends Parameters<OverrideQueryBuilder["isfinite"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).isfinite(...(args as unknown as Parameters<OverrideQueryBuilder["isfinite"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  isNot<TArgs extends Parameters<OverrideQueryBuilder["isNot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).isNot(...(args as unknown as Parameters<OverrideQueryBuilder["isNot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  isnull() {
    return (new QueryBuilder(this)).isnull();
  }
  isolation() {
    return (new QueryBuilder(this)).isolation();
  }
  isopen<TArgs extends Parameters<OverrideQueryBuilder["isopen"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).isopen(...(args as unknown as Parameters<OverrideQueryBuilder["isopen"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  isParallel<TArgs extends Parameters<OverrideQueryBuilder["isParallel"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).isParallel(...(args as unknown as Parameters<OverrideQueryBuilder["isParallel"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  join<TArgs extends Parameters<OverrideQueryBuilder["join"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).join(...(args as unknown as Parameters<OverrideQueryBuilder["join"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  json() {
    return (new QueryBuilder(this)).json();
  }
  jsonAgg<TArgs extends Parameters<OverrideQueryBuilder["jsonAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonAgg(...(args as unknown as Parameters<OverrideQueryBuilder["jsonAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonAggStrict<TArgs extends Parameters<OverrideQueryBuilder["jsonAggStrict"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonAggStrict(...(args as unknown as Parameters<OverrideQueryBuilder["jsonAggStrict"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonArray<TArgs extends Parameters<OverrideQueryBuilder["jsonArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonArray(...(args as unknown as Parameters<OverrideQueryBuilder["jsonArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonArrayagg<TArgs extends Parameters<OverrideQueryBuilder["jsonArrayagg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonArrayagg(...(args as unknown as Parameters<OverrideQueryBuilder["jsonArrayagg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonArrayElements<TArgs extends Parameters<OverrideQueryBuilder["jsonArrayElements"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonArrayElements(...(args as unknown as Parameters<OverrideQueryBuilder["jsonArrayElements"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonArrayElementsText<TArgs extends Parameters<OverrideQueryBuilder["jsonArrayElementsText"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonArrayElementsText(...(args as unknown as Parameters<OverrideQueryBuilder["jsonArrayElementsText"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonArrayLength<TArgs extends Parameters<OverrideQueryBuilder["jsonArrayLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonArrayLength(...(args as unknown as Parameters<OverrideQueryBuilder["jsonArrayLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbAgg<TArgs extends Parameters<OverrideQueryBuilder["jsonbAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbAgg(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbAggStrict<TArgs extends Parameters<OverrideQueryBuilder["jsonbAggStrict"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbAggStrict(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbAggStrict"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbArrayElements<TArgs extends Parameters<OverrideQueryBuilder["jsonbArrayElements"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbArrayElements(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbArrayElements"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbArrayElementsText<TArgs extends Parameters<OverrideQueryBuilder["jsonbArrayElementsText"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbArrayElementsText(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbArrayElementsText"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbArrayLength<TArgs extends Parameters<OverrideQueryBuilder["jsonbArrayLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbArrayLength(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbArrayLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbBuildArray<TArgs extends Parameters<OverrideQueryBuilder["jsonbBuildArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbBuildArray(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbBuildArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbBuildObject<TArgs extends Parameters<OverrideQueryBuilder["jsonbBuildObject"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbBuildObject(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbBuildObject"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbEach<TArgs extends Parameters<OverrideQueryBuilder["jsonbEach"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbEach(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbEach"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbEachText<TArgs extends Parameters<OverrideQueryBuilder["jsonbEachText"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbEachText(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbEachText"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbExtractPath<TArgs extends Parameters<OverrideQueryBuilder["jsonbExtractPath"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbExtractPath(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbExtractPath"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbExtractPathText<TArgs extends Parameters<OverrideQueryBuilder["jsonbExtractPathText"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbExtractPathText(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbExtractPathText"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbInsert<TArgs extends Parameters<OverrideQueryBuilder["jsonbInsert"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbInsert(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbInsert"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbObject<TArgs extends Parameters<OverrideQueryBuilder["jsonbObject"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbObject(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbObject"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbObjectAgg<TArgs extends Parameters<OverrideQueryBuilder["jsonbObjectAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbObjectAgg(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbObjectAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbObjectAggStrict<TArgs extends Parameters<OverrideQueryBuilder["jsonbObjectAggStrict"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbObjectAggStrict(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbObjectAggStrict"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbObjectAggUnique<TArgs extends Parameters<OverrideQueryBuilder["jsonbObjectAggUnique"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbObjectAggUnique(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbObjectAggUnique"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbObjectAggUniqueStrict<TArgs extends Parameters<OverrideQueryBuilder["jsonbObjectAggUniqueStrict"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbObjectAggUniqueStrict(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbObjectAggUniqueStrict"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbObjectKeys<TArgs extends Parameters<OverrideQueryBuilder["jsonbObjectKeys"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbObjectKeys(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbObjectKeys"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathExists<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathExists"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathExists(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathExists"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathExistsTz<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathExistsTz"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathExistsTz(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathExistsTz"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathMatch<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathMatch"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathMatch(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathMatch"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathMatchTz<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathMatchTz"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathMatchTz(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathMatchTz"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathQuery<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathQuery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathQuery(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathQuery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathQueryArray<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathQueryArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathQueryArray(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathQueryArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathQueryArrayTz<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathQueryArrayTz"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathQueryArrayTz(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathQueryArrayTz"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathQueryFirst<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathQueryFirst"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathQueryFirst(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathQueryFirst"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathQueryFirstTz<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathQueryFirstTz"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathQueryFirstTz(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathQueryFirstTz"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPathQueryTz<TArgs extends Parameters<OverrideQueryBuilder["jsonbPathQueryTz"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPathQueryTz(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPathQueryTz"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPopulateRecord<TArgs extends Parameters<OverrideQueryBuilder["jsonbPopulateRecord"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPopulateRecord(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPopulateRecord"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPopulateRecordset<TArgs extends Parameters<OverrideQueryBuilder["jsonbPopulateRecordset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPopulateRecordset(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPopulateRecordset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPopulateRecordValid<TArgs extends Parameters<OverrideQueryBuilder["jsonbPopulateRecordValid"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPopulateRecordValid(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPopulateRecordValid"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbPretty<TArgs extends Parameters<OverrideQueryBuilder["jsonbPretty"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbPretty(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbPretty"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbSet<TArgs extends Parameters<OverrideQueryBuilder["jsonbSet"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbSet(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbSet"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbSetLax<TArgs extends Parameters<OverrideQueryBuilder["jsonbSetLax"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbSetLax(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbSetLax"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbStripNulls<TArgs extends Parameters<OverrideQueryBuilder["jsonbStripNulls"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbStripNulls(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbStripNulls"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbToRecord<TArgs extends Parameters<OverrideQueryBuilder["jsonbToRecord"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbToRecord(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbToRecord"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbToRecordset<TArgs extends Parameters<OverrideQueryBuilder["jsonbToRecordset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbToRecordset(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbToRecordset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbToTsvector<TArgs extends Parameters<OverrideQueryBuilder["jsonbToTsvector"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbToTsvector(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbToTsvector"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonbTypeof<TArgs extends Parameters<OverrideQueryBuilder["jsonbTypeof"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonbTypeof(...(args as unknown as Parameters<OverrideQueryBuilder["jsonbTypeof"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonBuildArray<TArgs extends Parameters<OverrideQueryBuilder["jsonBuildArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonBuildArray(...(args as unknown as Parameters<OverrideQueryBuilder["jsonBuildArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonBuildObject<TArgs extends Parameters<OverrideQueryBuilder["jsonBuildObject"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonBuildObject(...(args as unknown as Parameters<OverrideQueryBuilder["jsonBuildObject"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonEach<TArgs extends Parameters<OverrideQueryBuilder["jsonEach"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonEach(...(args as unknown as Parameters<OverrideQueryBuilder["jsonEach"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonEachText<TArgs extends Parameters<OverrideQueryBuilder["jsonEachText"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonEachText(...(args as unknown as Parameters<OverrideQueryBuilder["jsonEachText"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonExists<TArgs extends Parameters<OverrideQueryBuilder["jsonExists"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonExists(...(args as unknown as Parameters<OverrideQueryBuilder["jsonExists"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonExtractPath<TArgs extends Parameters<OverrideQueryBuilder["jsonExtractPath"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonExtractPath(...(args as unknown as Parameters<OverrideQueryBuilder["jsonExtractPath"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonExtractPathText<TArgs extends Parameters<OverrideQueryBuilder["jsonExtractPathText"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonExtractPathText(...(args as unknown as Parameters<OverrideQueryBuilder["jsonExtractPathText"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonObject<TArgs extends Parameters<OverrideQueryBuilder["jsonObject"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonObject(...(args as unknown as Parameters<OverrideQueryBuilder["jsonObject"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonObjectagg<TArgs extends Parameters<OverrideQueryBuilder["jsonObjectagg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonObjectagg(...(args as unknown as Parameters<OverrideQueryBuilder["jsonObjectagg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonObjectAgg<TArgs extends Parameters<OverrideQueryBuilder["jsonObjectAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonObjectAgg(...(args as unknown as Parameters<OverrideQueryBuilder["jsonObjectAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonObjectAggStrict<TArgs extends Parameters<OverrideQueryBuilder["jsonObjectAggStrict"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonObjectAggStrict(...(args as unknown as Parameters<OverrideQueryBuilder["jsonObjectAggStrict"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonObjectAggUnique<TArgs extends Parameters<OverrideQueryBuilder["jsonObjectAggUnique"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonObjectAggUnique(...(args as unknown as Parameters<OverrideQueryBuilder["jsonObjectAggUnique"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonObjectAggUniqueStrict<TArgs extends Parameters<OverrideQueryBuilder["jsonObjectAggUniqueStrict"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonObjectAggUniqueStrict(...(args as unknown as Parameters<OverrideQueryBuilder["jsonObjectAggUniqueStrict"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonObjectKeys<TArgs extends Parameters<OverrideQueryBuilder["jsonObjectKeys"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonObjectKeys(...(args as unknown as Parameters<OverrideQueryBuilder["jsonObjectKeys"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonPopulateRecord<TArgs extends Parameters<OverrideQueryBuilder["jsonPopulateRecord"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonPopulateRecord(...(args as unknown as Parameters<OverrideQueryBuilder["jsonPopulateRecord"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonPopulateRecordset<TArgs extends Parameters<OverrideQueryBuilder["jsonPopulateRecordset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonPopulateRecordset(...(args as unknown as Parameters<OverrideQueryBuilder["jsonPopulateRecordset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonQuery<TArgs extends Parameters<OverrideQueryBuilder["jsonQuery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonQuery(...(args as unknown as Parameters<OverrideQueryBuilder["jsonQuery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonScalar<TArgs extends Parameters<OverrideQueryBuilder["jsonScalar"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonScalar(...(args as unknown as Parameters<OverrideQueryBuilder["jsonScalar"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonSerialize<TArgs extends Parameters<OverrideQueryBuilder["jsonSerialize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonSerialize(...(args as unknown as Parameters<OverrideQueryBuilder["jsonSerialize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonStripNulls<TArgs extends Parameters<OverrideQueryBuilder["jsonStripNulls"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonStripNulls(...(args as unknown as Parameters<OverrideQueryBuilder["jsonStripNulls"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonTable() {
    return (new QueryBuilder(this)).jsonTable();
  }
  jsonTablePrimitive() {
    return (new QueryBuilder(this)).jsonTablePrimitive();
  }
  jsonToRecord<TArgs extends Parameters<OverrideQueryBuilder["jsonToRecord"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonToRecord(...(args as unknown as Parameters<OverrideQueryBuilder["jsonToRecord"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonToRecordset<TArgs extends Parameters<OverrideQueryBuilder["jsonToRecordset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonToRecordset(...(args as unknown as Parameters<OverrideQueryBuilder["jsonToRecordset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonToTsvector<TArgs extends Parameters<OverrideQueryBuilder["jsonToTsvector"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonToTsvector(...(args as unknown as Parameters<OverrideQueryBuilder["jsonToTsvector"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonTypeof<TArgs extends Parameters<OverrideQueryBuilder["jsonTypeof"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonTypeof(...(args as unknown as Parameters<OverrideQueryBuilder["jsonTypeof"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  jsonValue<TArgs extends Parameters<OverrideQueryBuilder["jsonValue"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).jsonValue(...(args as unknown as Parameters<OverrideQueryBuilder["jsonValue"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  justifyDays<TArgs extends Parameters<OverrideQueryBuilder["justifyDays"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).justifyDays(...(args as unknown as Parameters<OverrideQueryBuilder["justifyDays"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  justifyHours<TArgs extends Parameters<OverrideQueryBuilder["justifyHours"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).justifyHours(...(args as unknown as Parameters<OverrideQueryBuilder["justifyHours"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  justifyInterval<TArgs extends Parameters<OverrideQueryBuilder["justifyInterval"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).justifyInterval(...(args as unknown as Parameters<OverrideQueryBuilder["justifyInterval"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  k() {
    return (new QueryBuilder(this)).k();
  }
  keep() {
    return (new QueryBuilder(this)).keep();
  }
  key() {
    return (new QueryBuilder(this)).key();
  }
  keyMember() {
    return (new QueryBuilder(this)).keyMember();
  }
  keys() {
    return (new QueryBuilder(this)).keys();
  }
  keyType() {
    return (new QueryBuilder(this)).keyType();
  }
  l(...args: Parameters<BaseRawQueryBuilder["l"]>) {
    return (new QueryBuilder(this)).l(...args);
  }
  label() {
    return (new QueryBuilder(this)).label();
  }
  lag<TArgs extends Parameters<OverrideQueryBuilder["lag"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lag(...(args as unknown as Parameters<OverrideQueryBuilder["lag"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  language() {
    return (new QueryBuilder(this)).language();
  }
  large() {
    return (new QueryBuilder(this)).large();
  }
  last() {
    return (new QueryBuilder(this)).last();
  }
  lastval<TArgs extends Parameters<OverrideQueryBuilder["lastval"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lastval(...(args as unknown as Parameters<OverrideQueryBuilder["lastval"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lastValue<TArgs extends Parameters<OverrideQueryBuilder["lastValue"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lastValue(...(args as unknown as Parameters<OverrideQueryBuilder["lastValue"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lateral() {
    return (new QueryBuilder(this)).lateral();
  }
  lcm<TArgs extends Parameters<OverrideQueryBuilder["lcm"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lcm(...(args as unknown as Parameters<OverrideQueryBuilder["lcm"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lead<TArgs extends Parameters<OverrideQueryBuilder["lead"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lead(...(args as unknown as Parameters<OverrideQueryBuilder["lead"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  leading() {
    return (new QueryBuilder(this)).leading();
  }
  leakproof() {
    return (new QueryBuilder(this)).leakproof();
  }
  least<TArgs extends Parameters<OverrideQueryBuilder["least"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).least(...(args as unknown as Parameters<OverrideQueryBuilder["least"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  left<TArgs extends Parameters<OverrideQueryBuilder["left"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).left(...(args as unknown as Parameters<OverrideQueryBuilder["left"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  leftJoin<TArgs extends Parameters<OverrideQueryBuilder["leftJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).leftJoin(...(args as unknown as Parameters<OverrideQueryBuilder["leftJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  leftJoinLateral<TArgs extends Parameters<OverrideQueryBuilder["leftJoinLateral"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).leftJoinLateral(...(args as unknown as Parameters<OverrideQueryBuilder["leftJoinLateral"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  length<TArgs extends Parameters<OverrideQueryBuilder["length"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).length(...(args as unknown as Parameters<OverrideQueryBuilder["length"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  level() {
    return (new QueryBuilder(this)).level();
  }
  lgamma<TArgs extends Parameters<OverrideQueryBuilder["lgamma"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lgamma(...(args as unknown as Parameters<OverrideQueryBuilder["lgamma"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  library() {
    return (new QueryBuilder(this)).library();
  }
  like<TArgs extends Parameters<OverrideQueryBuilder["like"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).like(...(args as unknown as Parameters<OverrideQueryBuilder["like"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  likeRegex() {
    return (new QueryBuilder(this)).likeRegex();
  }
  limit<TArgs extends Parameters<OverrideQueryBuilder["limit"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).limit(...(args as unknown as Parameters<OverrideQueryBuilder["limit"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  line<TArgs extends Parameters<OverrideQueryBuilder["line"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).line(...(args as unknown as Parameters<OverrideQueryBuilder["line"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  link() {
    return (new QueryBuilder(this)).link();
  }
  listagg() {
    return (new QueryBuilder(this)).listagg();
  }
  listen() {
    return (new QueryBuilder(this)).listen();
  }
  literal(...args: Parameters<BaseRawQueryBuilder["literal"]>) {
    return (new QueryBuilder(this)).literal(...args);
  }
  literalArray(...args: Parameters<BaseRawQueryBuilder["literalArray"]>) {
    return (new QueryBuilder(this)).literalArray(...args);
  }
  ln<TArgs extends Parameters<OverrideQueryBuilder["ln"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ln(...(args as unknown as Parameters<OverrideQueryBuilder["ln"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  load() {
    return (new QueryBuilder(this)).load();
  }
  local() {
    return (new QueryBuilder(this)).local();
  }
  localtime<TArgs extends Parameters<OverrideQueryBuilder["localtime"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).localtime(...(args as unknown as Parameters<OverrideQueryBuilder["localtime"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  localtimestamp<TArgs extends Parameters<OverrideQueryBuilder["localtimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).localtimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["localtimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  location() {
    return (new QueryBuilder(this)).location();
  }
  locator() {
    return (new QueryBuilder(this)).locator();
  }
  lock() {
    return (new QueryBuilder(this)).lock();
  }
  locked() {
    return (new QueryBuilder(this)).locked();
  }
  log<TArgs extends Parameters<OverrideQueryBuilder["log"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).log(...(args as unknown as Parameters<OverrideQueryBuilder["log"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  log10<TArgs extends Parameters<OverrideQueryBuilder["log10"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).log10(...(args as unknown as Parameters<OverrideQueryBuilder["log10"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  logged() {
    return (new QueryBuilder(this)).logged();
  }
  lower<TArgs extends Parameters<OverrideQueryBuilder["lower"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lower(...(args as unknown as Parameters<OverrideQueryBuilder["lower"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lowerInc<TArgs extends Parameters<OverrideQueryBuilder["lowerInc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lowerInc(...(args as unknown as Parameters<OverrideQueryBuilder["lowerInc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lowerInf<TArgs extends Parameters<OverrideQueryBuilder["lowerInf"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lowerInf(...(args as unknown as Parameters<OverrideQueryBuilder["lowerInf"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lpad<TArgs extends Parameters<OverrideQueryBuilder["lpad"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lpad(...(args as unknown as Parameters<OverrideQueryBuilder["lpad"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lseg<TArgs extends Parameters<OverrideQueryBuilder["lseg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lseg(...(args as unknown as Parameters<OverrideQueryBuilder["lseg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lt<TArgs extends Parameters<OverrideQueryBuilder["lt"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lt(...(args as unknown as Parameters<OverrideQueryBuilder["lt"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  lte<TArgs extends Parameters<OverrideQueryBuilder["lte"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).lte(...(args as unknown as Parameters<OverrideQueryBuilder["lte"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  ltrim<TArgs extends Parameters<OverrideQueryBuilder["ltrim"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ltrim(...(args as unknown as Parameters<OverrideQueryBuilder["ltrim"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  m() {
    return (new QueryBuilder(this)).m();
  }
  macaddr8Set7bit<TArgs extends Parameters<OverrideQueryBuilder["macaddr8Set7bit"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).macaddr8Set7bit(...(args as unknown as Parameters<OverrideQueryBuilder["macaddr8Set7bit"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  makeaclitem<TArgs extends Parameters<OverrideQueryBuilder["makeaclitem"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).makeaclitem(...(args as unknown as Parameters<OverrideQueryBuilder["makeaclitem"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  makeDate<TArgs extends Parameters<OverrideQueryBuilder["makeDate"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).makeDate(...(args as unknown as Parameters<OverrideQueryBuilder["makeDate"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  makeInterval<TArgs extends Parameters<OverrideQueryBuilder["makeInterval"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).makeInterval(...(args as unknown as Parameters<OverrideQueryBuilder["makeInterval"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  makeTime<TArgs extends Parameters<OverrideQueryBuilder["makeTime"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).makeTime(...(args as unknown as Parameters<OverrideQueryBuilder["makeTime"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  makeTimestamp<TArgs extends Parameters<OverrideQueryBuilder["makeTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).makeTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["makeTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  makeTimestamptz<TArgs extends Parameters<OverrideQueryBuilder["makeTimestamptz"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).makeTimestamptz(...(args as unknown as Parameters<OverrideQueryBuilder["makeTimestamptz"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  map() {
    return (new QueryBuilder(this)).map();
  }
  mapping() {
    return (new QueryBuilder(this)).mapping();
  }
  masklen<TArgs extends Parameters<OverrideQueryBuilder["masklen"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).masklen(...(args as unknown as Parameters<OverrideQueryBuilder["masklen"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  match() {
    return (new QueryBuilder(this)).match();
  }
  matched() {
    return (new QueryBuilder(this)).matched();
  }
  matches() {
    return (new QueryBuilder(this)).matches();
  }
  matchNumber() {
    return (new QueryBuilder(this)).matchNumber();
  }
  matchRecognize() {
    return (new QueryBuilder(this)).matchRecognize();
  }
  matchRegex<TArgs extends Parameters<OverrideQueryBuilder["matchRegex"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).matchRegex(...(args as unknown as Parameters<OverrideQueryBuilder["matchRegex"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  matchRegexInsensitive<TArgs extends Parameters<OverrideQueryBuilder["matchRegexInsensitive"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).matchRegexInsensitive(...(args as unknown as Parameters<OverrideQueryBuilder["matchRegexInsensitive"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  materialized() {
    return (new QueryBuilder(this)).materialized();
  }
  max<TArgs extends Parameters<OverrideQueryBuilder["max"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).max(...(args as unknown as Parameters<OverrideQueryBuilder["max"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  maxvalue() {
    return (new QueryBuilder(this)).maxvalue();
  }
  md5<TArgs extends Parameters<OverrideQueryBuilder["md5"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).md5(...(args as unknown as Parameters<OverrideQueryBuilder["md5"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  measures() {
    return (new QueryBuilder(this)).measures();
  }
  member() {
    return (new QueryBuilder(this)).member();
  }
  merge() {
    return (new QueryBuilder(this)).merge();
  }
  mergeAction<TArgs extends Parameters<OverrideQueryBuilder["mergeAction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).mergeAction(...(args as unknown as Parameters<OverrideQueryBuilder["mergeAction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  messageLength() {
    return (new QueryBuilder(this)).messageLength();
  }
  messageOctetLength() {
    return (new QueryBuilder(this)).messageOctetLength();
  }
  messageText() {
    return (new QueryBuilder(this)).messageText();
  }
  method() {
    return (new QueryBuilder(this)).method();
  }
  middle<TArgs extends Parameters<OverrideQueryBuilder["middle"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).middle(...(args as unknown as Parameters<OverrideQueryBuilder["middle"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  min<TArgs extends Parameters<OverrideQueryBuilder["min"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).min(...(args as unknown as Parameters<OverrideQueryBuilder["min"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  minScale<TArgs extends Parameters<OverrideQueryBuilder["minScale"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).minScale(...(args as unknown as Parameters<OverrideQueryBuilder["minScale"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  minus<TArgs extends Parameters<OverrideQueryBuilder["minus"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).minus(...(args as unknown as Parameters<OverrideQueryBuilder["minus"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  minute() {
    return (new QueryBuilder(this)).minute();
  }
  minvalue() {
    return (new QueryBuilder(this)).minvalue();
  }
  mod<TArgs extends Parameters<OverrideQueryBuilder["mod"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).mod(...(args as unknown as Parameters<OverrideQueryBuilder["mod"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  mode<TArgs extends Parameters<OverrideQueryBuilder["mode"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).mode(...(args as unknown as Parameters<OverrideQueryBuilder["mode"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  modifies() {
    return (new QueryBuilder(this)).modifies();
  }
  module() {
    return (new QueryBuilder(this)).module();
  }
  modulo<TArgs extends Parameters<OverrideQueryBuilder["modulo"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).modulo(...(args as unknown as Parameters<OverrideQueryBuilder["modulo"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  month() {
    return (new QueryBuilder(this)).month();
  }
  more() {
    return (new QueryBuilder(this)).more();
  }
  move() {
    return (new QueryBuilder(this)).move();
  }
  multiply<TArgs extends Parameters<OverrideQueryBuilder["multiply"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).multiply(...(args as unknown as Parameters<OverrideQueryBuilder["multiply"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  multirange<TArgs extends Parameters<OverrideQueryBuilder["multirange"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).multirange(...(args as unknown as Parameters<OverrideQueryBuilder["multirange"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  multiset() {
    return (new QueryBuilder(this)).multiset();
  }
  mumps() {
    return (new QueryBuilder(this)).mumps();
  }
  mxidAge<TArgs extends Parameters<OverrideQueryBuilder["mxidAge"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).mxidAge(...(args as unknown as Parameters<OverrideQueryBuilder["mxidAge"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  name() {
    return (new QueryBuilder(this)).name();
  }
  names() {
    return (new QueryBuilder(this)).names();
  }
  namespace() {
    return (new QueryBuilder(this)).namespace();
  }
  national() {
    return (new QueryBuilder(this)).national();
  }
  natural() {
    return (new QueryBuilder(this)).natural();
  }
  naturalCrossJoin<TArgs extends Parameters<OverrideQueryBuilder["naturalCrossJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).naturalCrossJoin(...(args as unknown as Parameters<OverrideQueryBuilder["naturalCrossJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  naturalFullJoin<TArgs extends Parameters<OverrideQueryBuilder["naturalFullJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).naturalFullJoin(...(args as unknown as Parameters<OverrideQueryBuilder["naturalFullJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  naturalInnerJoin<TArgs extends Parameters<OverrideQueryBuilder["naturalInnerJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).naturalInnerJoin(...(args as unknown as Parameters<OverrideQueryBuilder["naturalInnerJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  naturalJoin<TArgs extends Parameters<OverrideQueryBuilder["naturalJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).naturalJoin(...(args as unknown as Parameters<OverrideQueryBuilder["naturalJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  naturalLeftJoin<TArgs extends Parameters<OverrideQueryBuilder["naturalLeftJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).naturalLeftJoin(...(args as unknown as Parameters<OverrideQueryBuilder["naturalLeftJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  naturalRightJoin<TArgs extends Parameters<OverrideQueryBuilder["naturalRightJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).naturalRightJoin(...(args as unknown as Parameters<OverrideQueryBuilder["naturalRightJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nchar() {
    return (new QueryBuilder(this)).nchar();
  }
  nclob() {
    return (new QueryBuilder(this)).nclob();
  }
  ne<TArgs extends Parameters<OverrideQueryBuilder["ne"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ne(...(args as unknown as Parameters<OverrideQueryBuilder["ne"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nested() {
    return (new QueryBuilder(this)).nested();
  }
  nesting() {
    return (new QueryBuilder(this)).nesting();
  }
  netmask<TArgs extends Parameters<OverrideQueryBuilder["netmask"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).netmask(...(args as unknown as Parameters<OverrideQueryBuilder["netmask"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  network<TArgs extends Parameters<OverrideQueryBuilder["network"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).network(...(args as unknown as Parameters<OverrideQueryBuilder["network"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  new() {
    return (new QueryBuilder(this)).new();
  }
  next() {
    return (new QueryBuilder(this)).next();
  }
  nextval<TArgs extends Parameters<OverrideQueryBuilder["nextval"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).nextval(...(args as unknown as Parameters<OverrideQueryBuilder["nextval"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nfc() {
    return (new QueryBuilder(this)).nfc();
  }
  nfd() {
    return (new QueryBuilder(this)).nfd();
  }
  nfkc() {
    return (new QueryBuilder(this)).nfkc();
  }
  nfkd() {
    return (new QueryBuilder(this)).nfkd();
  }
  nil() {
    return (new QueryBuilder(this)).nil();
  }
  no() {
    return (new QueryBuilder(this)).no();
  }
  none() {
    return (new QueryBuilder(this)).none();
  }
  normalize<TArgs extends Parameters<OverrideQueryBuilder["normalize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).normalize(...(args as unknown as Parameters<OverrideQueryBuilder["normalize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  normalized() {
    return (new QueryBuilder(this)).normalized();
  }
  not<TArgs extends Parameters<OverrideQueryBuilder["not"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).not(...(args as unknown as Parameters<OverrideQueryBuilder["not"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notBetween<TArgs extends Parameters<OverrideQueryBuilder["notBetween"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notBetween(...(args as unknown as Parameters<OverrideQueryBuilder["notBetween"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notBetweenSymmetric<TArgs extends Parameters<OverrideQueryBuilder["notBetweenSymmetric"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notBetweenSymmetric(...(args as unknown as Parameters<OverrideQueryBuilder["notBetweenSymmetric"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notEq<TArgs extends Parameters<OverrideQueryBuilder["notEq"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notEq(...(args as unknown as Parameters<OverrideQueryBuilder["notEq"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notExists<TArgs extends Parameters<OverrideQueryBuilder["notExists"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notExists(...(args as unknown as Parameters<OverrideQueryBuilder["notExists"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notExtendAbove<TArgs extends Parameters<OverrideQueryBuilder["notExtendAbove"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notExtendAbove(...(args as unknown as Parameters<OverrideQueryBuilder["notExtendAbove"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notExtendBelow<TArgs extends Parameters<OverrideQueryBuilder["notExtendBelow"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notExtendBelow(...(args as unknown as Parameters<OverrideQueryBuilder["notExtendBelow"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notExtendLeft<TArgs extends Parameters<OverrideQueryBuilder["notExtendLeft"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notExtendLeft(...(args as unknown as Parameters<OverrideQueryBuilder["notExtendLeft"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notExtendRight<TArgs extends Parameters<OverrideQueryBuilder["notExtendRight"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notExtendRight(...(args as unknown as Parameters<OverrideQueryBuilder["notExtendRight"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nothing() {
    return (new QueryBuilder(this)).nothing();
  }
  notify() {
    return (new QueryBuilder(this)).notify();
  }
  notIlike<TArgs extends Parameters<OverrideQueryBuilder["notIlike"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notIlike(...(args as unknown as Parameters<OverrideQueryBuilder["notIlike"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notIn<TArgs extends Parameters<OverrideQueryBuilder["notIn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notIn(...(args as unknown as Parameters<OverrideQueryBuilder["notIn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notLike<TArgs extends Parameters<OverrideQueryBuilder["notLike"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notLike(...(args as unknown as Parameters<OverrideQueryBuilder["notLike"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notMatchRegex<TArgs extends Parameters<OverrideQueryBuilder["notMatchRegex"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notMatchRegex(...(args as unknown as Parameters<OverrideQueryBuilder["notMatchRegex"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notMatchRegexInsensitive<TArgs extends Parameters<OverrideQueryBuilder["notMatchRegexInsensitive"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notMatchRegexInsensitive(...(args as unknown as Parameters<OverrideQueryBuilder["notMatchRegexInsensitive"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  notnull() {
    return (new QueryBuilder(this)).notnull();
  }
  notSimilarTo<TArgs extends Parameters<OverrideQueryBuilder["notSimilarTo"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).notSimilarTo(...(args as unknown as Parameters<OverrideQueryBuilder["notSimilarTo"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  now<TArgs extends Parameters<OverrideQueryBuilder["now"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).now(...(args as unknown as Parameters<OverrideQueryBuilder["now"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nowait() {
    return (new QueryBuilder(this)).nowait();
  }
  npoints<TArgs extends Parameters<OverrideQueryBuilder["npoints"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).npoints(...(args as unknown as Parameters<OverrideQueryBuilder["npoints"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nthValue<TArgs extends Parameters<OverrideQueryBuilder["nthValue"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).nthValue(...(args as unknown as Parameters<OverrideQueryBuilder["nthValue"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  ntile<TArgs extends Parameters<OverrideQueryBuilder["ntile"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).ntile(...(args as unknown as Parameters<OverrideQueryBuilder["ntile"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  null() {
    return (new QueryBuilder(this)).null();
  }
  nullable() {
    return (new QueryBuilder(this)).nullable();
  }
  nullif<TArgs extends Parameters<OverrideQueryBuilder["nullif"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).nullif(...(args as unknown as Parameters<OverrideQueryBuilder["nullif"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nullOrdering() {
    return (new QueryBuilder(this)).nullOrdering();
  }
  nulls() {
    return (new QueryBuilder(this)).nulls();
  }
  nullsFirst<TArgs extends Parameters<OverrideQueryBuilder["nullsFirst"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).nullsFirst(...(args as unknown as Parameters<OverrideQueryBuilder["nullsFirst"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  nullsLast<TArgs extends Parameters<OverrideQueryBuilder["nullsLast"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).nullsLast(...(args as unknown as Parameters<OverrideQueryBuilder["nullsLast"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  number() {
    return (new QueryBuilder(this)).number();
  }
  numeric() {
    return (new QueryBuilder(this)).numeric();
  }
  numnode<TArgs extends Parameters<OverrideQueryBuilder["numnode"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).numnode(...(args as unknown as Parameters<OverrideQueryBuilder["numnode"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  objDescription<TArgs extends Parameters<OverrideQueryBuilder["objDescription"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).objDescription(...(args as unknown as Parameters<OverrideQueryBuilder["objDescription"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  object() {
    return (new QueryBuilder(this)).object();
  }
  objects() {
    return (new QueryBuilder(this)).objects();
  }
  occurrence() {
    return (new QueryBuilder(this)).occurrence();
  }
  occurrencesRegex() {
    return (new QueryBuilder(this)).occurrencesRegex();
  }
  octetLength<TArgs extends Parameters<OverrideQueryBuilder["octetLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).octetLength(...(args as unknown as Parameters<OverrideQueryBuilder["octetLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  octets() {
    return (new QueryBuilder(this)).octets();
  }
  of() {
    return (new QueryBuilder(this)).of();
  }
  off() {
    return (new QueryBuilder(this)).off();
  }
  offset<TArgs extends Parameters<OverrideQueryBuilder["offset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).offset(...(args as unknown as Parameters<OverrideQueryBuilder["offset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  oids() {
    return (new QueryBuilder(this)).oids();
  }
  old() {
    return (new QueryBuilder(this)).old();
  }
  omit() {
    return (new QueryBuilder(this)).omit();
  }
  on<TArgs extends Parameters<OverrideQueryBuilder["on"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).on(...(args as unknown as Parameters<OverrideQueryBuilder["on"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  onConflict<TArgs extends Parameters<OverrideQueryBuilder["onConflict"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).onConflict(...(args as unknown as Parameters<OverrideQueryBuilder["onConflict"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  onConflictDoNothing<TArgs extends Parameters<OverrideQueryBuilder["onConflictDoNothing"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).onConflictDoNothing(...(args as unknown as Parameters<OverrideQueryBuilder["onConflictDoNothing"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  onConflictDoUpdate<TArgs extends Parameters<OverrideQueryBuilder["onConflictDoUpdate"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).onConflictDoUpdate(...(args as unknown as Parameters<OverrideQueryBuilder["onConflictDoUpdate"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  onConstraint<TArgs extends Parameters<OverrideQueryBuilder["onConstraint"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).onConstraint(...(args as unknown as Parameters<OverrideQueryBuilder["onConstraint"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  one() {
    return (new QueryBuilder(this)).one();
  }
  only() {
    return (new QueryBuilder(this)).only();
  }
  op(...args: Parameters<BaseRawQueryBuilder["op"]>) {
    return (new QueryBuilder(this)).op(...args);
  }
  open() {
    return (new QueryBuilder(this)).open();
  }
  operator() {
    return (new QueryBuilder(this)).operator();
  }
  option() {
    return (new QueryBuilder(this)).option();
  }
  options() {
    return (new QueryBuilder(this)).options();
  }
  or<TArgs extends Parameters<OverrideQueryBuilder["or"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).or(...(args as unknown as Parameters<OverrideQueryBuilder["or"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  order() {
    return (new QueryBuilder(this)).order();
  }
  orderBy<TArgs extends Parameters<OverrideQueryBuilder["orderBy"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).orderBy(...(args as unknown as Parameters<OverrideQueryBuilder["orderBy"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  ordering() {
    return (new QueryBuilder(this)).ordering();
  }
  ordinality() {
    return (new QueryBuilder(this)).ordinality();
  }
  others() {
    return (new QueryBuilder(this)).others();
  }
  out() {
    return (new QueryBuilder(this)).out();
  }
  outer() {
    return (new QueryBuilder(this)).outer();
  }
  output() {
    return (new QueryBuilder(this)).output();
  }
  over<TArgs extends Parameters<OverrideQueryBuilder["over"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).over(...(args as unknown as Parameters<OverrideQueryBuilder["over"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  overflow() {
    return (new QueryBuilder(this)).overflow();
  }
  overlaps() {
    return (new QueryBuilder(this)).overlaps();
  }
  overlay<TArgs extends Parameters<OverrideQueryBuilder["overlay"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).overlay(...(args as unknown as Parameters<OverrideQueryBuilder["overlay"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  overriding() {
    return (new QueryBuilder(this)).overriding();
  }
  owned() {
    return (new QueryBuilder(this)).owned();
  }
  owner() {
    return (new QueryBuilder(this)).owner();
  }
  p() {
    return (new QueryBuilder(this)).p();
  }
  pad() {
    return (new QueryBuilder(this)).pad();
  }
  parallel() {
    return (new QueryBuilder(this)).parallel();
  }
  parameter() {
    return (new QueryBuilder(this)).parameter();
  }
  parameterMode() {
    return (new QueryBuilder(this)).parameterMode();
  }
  parameterName() {
    return (new QueryBuilder(this)).parameterName();
  }
  parameterordinalposition() {
    return (new QueryBuilder(this)).parameterordinalposition();
  }
  parameterspecificcatalog() {
    return (new QueryBuilder(this)).parameterspecificcatalog();
  }
  parameterspecificname() {
    return (new QueryBuilder(this)).parameterspecificname();
  }
  parameterspecificschema() {
    return (new QueryBuilder(this)).parameterspecificschema();
  }
  parseIdent<TArgs extends Parameters<OverrideQueryBuilder["parseIdent"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).parseIdent(...(args as unknown as Parameters<OverrideQueryBuilder["parseIdent"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  parser() {
    return (new QueryBuilder(this)).parser();
  }
  partial() {
    return (new QueryBuilder(this)).partial();
  }
  partition() {
    return (new QueryBuilder(this)).partition();
  }
  partitionBy<TArgs extends Parameters<OverrideQueryBuilder["partitionBy"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).partitionBy(...(args as unknown as Parameters<OverrideQueryBuilder["partitionBy"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pascal() {
    return (new QueryBuilder(this)).pascal();
  }
  pass() {
    return (new QueryBuilder(this)).pass();
  }
  passing() {
    return (new QueryBuilder(this)).passing();
  }
  passthrough() {
    return (new QueryBuilder(this)).passthrough();
  }
  password() {
    return (new QueryBuilder(this)).password();
  }
  past() {
    return (new QueryBuilder(this)).past();
  }
  path<TArgs extends Parameters<OverrideQueryBuilder["path"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).path(...(args as unknown as Parameters<OverrideQueryBuilder["path"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pattern() {
    return (new QueryBuilder(this)).pattern();
  }
  pclose<TArgs extends Parameters<OverrideQueryBuilder["pclose"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pclose(...(args as unknown as Parameters<OverrideQueryBuilder["pclose"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  per() {
    return (new QueryBuilder(this)).per();
  }
  percent() {
    return (new QueryBuilder(this)).percent();
  }
  percentCharacter(...args: Parameters<BaseRawQueryBuilder["percentCharacter"]>) {
    return (new QueryBuilder(this)).percentCharacter(...args);
  }
  percentileCont<TArgs extends Parameters<OverrideQueryBuilder["percentileCont"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).percentileCont(...(args as unknown as Parameters<OverrideQueryBuilder["percentileCont"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  percentileDisc<TArgs extends Parameters<OverrideQueryBuilder["percentileDisc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).percentileDisc(...(args as unknown as Parameters<OverrideQueryBuilder["percentileDisc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  percentRank<TArgs extends Parameters<OverrideQueryBuilder["percentRank"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).percentRank(...(args as unknown as Parameters<OverrideQueryBuilder["percentRank"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  period() {
    return (new QueryBuilder(this)).period();
  }
  permission() {
    return (new QueryBuilder(this)).permission();
  }
  permute() {
    return (new QueryBuilder(this)).permute();
  }
  perpendicular<TArgs extends Parameters<OverrideQueryBuilder["perpendicular"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).perpendicular(...(args as unknown as Parameters<OverrideQueryBuilder["perpendicular"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAdvisoryLock<TArgs extends Parameters<OverrideQueryBuilder["pgAdvisoryLock"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAdvisoryLock(...(args as unknown as Parameters<OverrideQueryBuilder["pgAdvisoryLock"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAdvisoryLockShared<TArgs extends Parameters<OverrideQueryBuilder["pgAdvisoryLockShared"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAdvisoryLockShared(...(args as unknown as Parameters<OverrideQueryBuilder["pgAdvisoryLockShared"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAdvisoryUnlock<TArgs extends Parameters<OverrideQueryBuilder["pgAdvisoryUnlock"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAdvisoryUnlock(...(args as unknown as Parameters<OverrideQueryBuilder["pgAdvisoryUnlock"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAdvisoryUnlockAll<TArgs extends Parameters<OverrideQueryBuilder["pgAdvisoryUnlockAll"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAdvisoryUnlockAll(...(args as unknown as Parameters<OverrideQueryBuilder["pgAdvisoryUnlockAll"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAdvisoryUnlockShared<TArgs extends Parameters<OverrideQueryBuilder["pgAdvisoryUnlockShared"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAdvisoryUnlockShared(...(args as unknown as Parameters<OverrideQueryBuilder["pgAdvisoryUnlockShared"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAdvisoryXactLock<TArgs extends Parameters<OverrideQueryBuilder["pgAdvisoryXactLock"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAdvisoryXactLock(...(args as unknown as Parameters<OverrideQueryBuilder["pgAdvisoryXactLock"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAdvisoryXactLockShared<TArgs extends Parameters<OverrideQueryBuilder["pgAdvisoryXactLockShared"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAdvisoryXactLockShared(...(args as unknown as Parameters<OverrideQueryBuilder["pgAdvisoryXactLockShared"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgAvailableWalSummaries<TArgs extends Parameters<OverrideQueryBuilder["pgAvailableWalSummaries"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgAvailableWalSummaries(...(args as unknown as Parameters<OverrideQueryBuilder["pgAvailableWalSummaries"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgBackendPid<TArgs extends Parameters<OverrideQueryBuilder["pgBackendPid"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgBackendPid(...(args as unknown as Parameters<OverrideQueryBuilder["pgBackendPid"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgBackupStart<TArgs extends Parameters<OverrideQueryBuilder["pgBackupStart"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgBackupStart(...(args as unknown as Parameters<OverrideQueryBuilder["pgBackupStart"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgBackupStop<TArgs extends Parameters<OverrideQueryBuilder["pgBackupStop"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgBackupStop(...(args as unknown as Parameters<OverrideQueryBuilder["pgBackupStop"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgBasetype<TArgs extends Parameters<OverrideQueryBuilder["pgBasetype"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgBasetype(...(args as unknown as Parameters<OverrideQueryBuilder["pgBasetype"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgBlockingPids<TArgs extends Parameters<OverrideQueryBuilder["pgBlockingPids"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgBlockingPids(...(args as unknown as Parameters<OverrideQueryBuilder["pgBlockingPids"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCancelBackend<TArgs extends Parameters<OverrideQueryBuilder["pgCancelBackend"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCancelBackend(...(args as unknown as Parameters<OverrideQueryBuilder["pgCancelBackend"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCharToEncoding<TArgs extends Parameters<OverrideQueryBuilder["pgCharToEncoding"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCharToEncoding(...(args as unknown as Parameters<OverrideQueryBuilder["pgCharToEncoding"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgClearAttributeStats<TArgs extends Parameters<OverrideQueryBuilder["pgClearAttributeStats"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgClearAttributeStats(...(args as unknown as Parameters<OverrideQueryBuilder["pgClearAttributeStats"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgClearRelationStats<TArgs extends Parameters<OverrideQueryBuilder["pgClearRelationStats"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgClearRelationStats(...(args as unknown as Parameters<OverrideQueryBuilder["pgClearRelationStats"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgClientEncoding<TArgs extends Parameters<OverrideQueryBuilder["pgClientEncoding"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgClientEncoding(...(args as unknown as Parameters<OverrideQueryBuilder["pgClientEncoding"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCollationActualVersion<TArgs extends Parameters<OverrideQueryBuilder["pgCollationActualVersion"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCollationActualVersion(...(args as unknown as Parameters<OverrideQueryBuilder["pgCollationActualVersion"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCollationIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgCollationIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCollationIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgCollationIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgColumnCompression<TArgs extends Parameters<OverrideQueryBuilder["pgColumnCompression"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgColumnCompression(...(args as unknown as Parameters<OverrideQueryBuilder["pgColumnCompression"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgColumnSize<TArgs extends Parameters<OverrideQueryBuilder["pgColumnSize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgColumnSize(...(args as unknown as Parameters<OverrideQueryBuilder["pgColumnSize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgColumnToastChunkId<TArgs extends Parameters<OverrideQueryBuilder["pgColumnToastChunkId"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgColumnToastChunkId(...(args as unknown as Parameters<OverrideQueryBuilder["pgColumnToastChunkId"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgConfLoadTime<TArgs extends Parameters<OverrideQueryBuilder["pgConfLoadTime"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgConfLoadTime(...(args as unknown as Parameters<OverrideQueryBuilder["pgConfLoadTime"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgControlCheckpoint<TArgs extends Parameters<OverrideQueryBuilder["pgControlCheckpoint"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgControlCheckpoint(...(args as unknown as Parameters<OverrideQueryBuilder["pgControlCheckpoint"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgControlInit<TArgs extends Parameters<OverrideQueryBuilder["pgControlInit"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgControlInit(...(args as unknown as Parameters<OverrideQueryBuilder["pgControlInit"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgControlRecovery<TArgs extends Parameters<OverrideQueryBuilder["pgControlRecovery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgControlRecovery(...(args as unknown as Parameters<OverrideQueryBuilder["pgControlRecovery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgControlSystem<TArgs extends Parameters<OverrideQueryBuilder["pgControlSystem"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgControlSystem(...(args as unknown as Parameters<OverrideQueryBuilder["pgControlSystem"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgConversionIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgConversionIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgConversionIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgConversionIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCopyLogicalReplicationSlot<TArgs extends Parameters<OverrideQueryBuilder["pgCopyLogicalReplicationSlot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCopyLogicalReplicationSlot(...(args as unknown as Parameters<OverrideQueryBuilder["pgCopyLogicalReplicationSlot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCopyPhysicalReplicationSlot<TArgs extends Parameters<OverrideQueryBuilder["pgCopyPhysicalReplicationSlot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCopyPhysicalReplicationSlot(...(args as unknown as Parameters<OverrideQueryBuilder["pgCopyPhysicalReplicationSlot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCreateLogicalReplicationSlot<TArgs extends Parameters<OverrideQueryBuilder["pgCreateLogicalReplicationSlot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCreateLogicalReplicationSlot(...(args as unknown as Parameters<OverrideQueryBuilder["pgCreateLogicalReplicationSlot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCreatePhysicalReplicationSlot<TArgs extends Parameters<OverrideQueryBuilder["pgCreatePhysicalReplicationSlot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCreatePhysicalReplicationSlot(...(args as unknown as Parameters<OverrideQueryBuilder["pgCreatePhysicalReplicationSlot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCreateRestorePoint<TArgs extends Parameters<OverrideQueryBuilder["pgCreateRestorePoint"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCreateRestorePoint(...(args as unknown as Parameters<OverrideQueryBuilder["pgCreateRestorePoint"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCurrentLogfile<TArgs extends Parameters<OverrideQueryBuilder["pgCurrentLogfile"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCurrentLogfile(...(args as unknown as Parameters<OverrideQueryBuilder["pgCurrentLogfile"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCurrentSnapshot<TArgs extends Parameters<OverrideQueryBuilder["pgCurrentSnapshot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCurrentSnapshot(...(args as unknown as Parameters<OverrideQueryBuilder["pgCurrentSnapshot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCurrentWalFlushLsn<TArgs extends Parameters<OverrideQueryBuilder["pgCurrentWalFlushLsn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCurrentWalFlushLsn(...(args as unknown as Parameters<OverrideQueryBuilder["pgCurrentWalFlushLsn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCurrentWalInsertLsn<TArgs extends Parameters<OverrideQueryBuilder["pgCurrentWalInsertLsn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCurrentWalInsertLsn(...(args as unknown as Parameters<OverrideQueryBuilder["pgCurrentWalInsertLsn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCurrentWalLsn<TArgs extends Parameters<OverrideQueryBuilder["pgCurrentWalLsn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCurrentWalLsn(...(args as unknown as Parameters<OverrideQueryBuilder["pgCurrentWalLsn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCurrentXactId<TArgs extends Parameters<OverrideQueryBuilder["pgCurrentXactId"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCurrentXactId(...(args as unknown as Parameters<OverrideQueryBuilder["pgCurrentXactId"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgCurrentXactIdIfAssigned<TArgs extends Parameters<OverrideQueryBuilder["pgCurrentXactIdIfAssigned"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgCurrentXactIdIfAssigned(...(args as unknown as Parameters<OverrideQueryBuilder["pgCurrentXactIdIfAssigned"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgDatabaseCollationActualVersion<TArgs extends Parameters<OverrideQueryBuilder["pgDatabaseCollationActualVersion"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgDatabaseCollationActualVersion(...(args as unknown as Parameters<OverrideQueryBuilder["pgDatabaseCollationActualVersion"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgDatabaseSize<TArgs extends Parameters<OverrideQueryBuilder["pgDatabaseSize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgDatabaseSize(...(args as unknown as Parameters<OverrideQueryBuilder["pgDatabaseSize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgDescribeObject<TArgs extends Parameters<OverrideQueryBuilder["pgDescribeObject"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgDescribeObject(...(args as unknown as Parameters<OverrideQueryBuilder["pgDescribeObject"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgDropReplicationSlot<TArgs extends Parameters<OverrideQueryBuilder["pgDropReplicationSlot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgDropReplicationSlot(...(args as unknown as Parameters<OverrideQueryBuilder["pgDropReplicationSlot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgEncodingToChar<TArgs extends Parameters<OverrideQueryBuilder["pgEncodingToChar"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgEncodingToChar(...(args as unknown as Parameters<OverrideQueryBuilder["pgEncodingToChar"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgEventTriggerDdlCommands<TArgs extends Parameters<OverrideQueryBuilder["pgEventTriggerDdlCommands"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgEventTriggerDdlCommands(...(args as unknown as Parameters<OverrideQueryBuilder["pgEventTriggerDdlCommands"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgEventTriggerDroppedObjects<TArgs extends Parameters<OverrideQueryBuilder["pgEventTriggerDroppedObjects"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgEventTriggerDroppedObjects(...(args as unknown as Parameters<OverrideQueryBuilder["pgEventTriggerDroppedObjects"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgEventTriggerTableRewriteOid<TArgs extends Parameters<OverrideQueryBuilder["pgEventTriggerTableRewriteOid"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgEventTriggerTableRewriteOid(...(args as unknown as Parameters<OverrideQueryBuilder["pgEventTriggerTableRewriteOid"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgEventTriggerTableRewriteReason<TArgs extends Parameters<OverrideQueryBuilder["pgEventTriggerTableRewriteReason"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgEventTriggerTableRewriteReason(...(args as unknown as Parameters<OverrideQueryBuilder["pgEventTriggerTableRewriteReason"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgExportSnapshot<TArgs extends Parameters<OverrideQueryBuilder["pgExportSnapshot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgExportSnapshot(...(args as unknown as Parameters<OverrideQueryBuilder["pgExportSnapshot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgFilenodeRelation<TArgs extends Parameters<OverrideQueryBuilder["pgFilenodeRelation"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgFilenodeRelation(...(args as unknown as Parameters<OverrideQueryBuilder["pgFilenodeRelation"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgFunctionIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgFunctionIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgFunctionIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgFunctionIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetAcl<TArgs extends Parameters<OverrideQueryBuilder["pgGetAcl"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetAcl(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetAcl"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetCatalogForeignKeys<TArgs extends Parameters<OverrideQueryBuilder["pgGetCatalogForeignKeys"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetCatalogForeignKeys(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetCatalogForeignKeys"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetConstraintdef<TArgs extends Parameters<OverrideQueryBuilder["pgGetConstraintdef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetConstraintdef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetConstraintdef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetExpr<TArgs extends Parameters<OverrideQueryBuilder["pgGetExpr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetExpr(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetExpr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetFunctionArguments<TArgs extends Parameters<OverrideQueryBuilder["pgGetFunctionArguments"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetFunctionArguments(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetFunctionArguments"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetFunctiondef<TArgs extends Parameters<OverrideQueryBuilder["pgGetFunctiondef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetFunctiondef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetFunctiondef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetFunctionIdentityArguments<TArgs extends Parameters<OverrideQueryBuilder["pgGetFunctionIdentityArguments"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetFunctionIdentityArguments(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetFunctionIdentityArguments"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetFunctionResult<TArgs extends Parameters<OverrideQueryBuilder["pgGetFunctionResult"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetFunctionResult(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetFunctionResult"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetIndexdef<TArgs extends Parameters<OverrideQueryBuilder["pgGetIndexdef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetIndexdef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetIndexdef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetKeywords<TArgs extends Parameters<OverrideQueryBuilder["pgGetKeywords"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetKeywords(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetKeywords"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetLoadedModules<TArgs extends Parameters<OverrideQueryBuilder["pgGetLoadedModules"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetLoadedModules(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetLoadedModules"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetMultixactMembers<TArgs extends Parameters<OverrideQueryBuilder["pgGetMultixactMembers"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetMultixactMembers(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetMultixactMembers"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetObjectAddress<TArgs extends Parameters<OverrideQueryBuilder["pgGetObjectAddress"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetObjectAddress(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetObjectAddress"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetPartitionConstraintdef<TArgs extends Parameters<OverrideQueryBuilder["pgGetPartitionConstraintdef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetPartitionConstraintdef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetPartitionConstraintdef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetPartkeydef<TArgs extends Parameters<OverrideQueryBuilder["pgGetPartkeydef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetPartkeydef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetPartkeydef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetRuledef<TArgs extends Parameters<OverrideQueryBuilder["pgGetRuledef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetRuledef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetRuledef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetSerialSequence<TArgs extends Parameters<OverrideQueryBuilder["pgGetSerialSequence"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetSerialSequence(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetSerialSequence"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetStatisticsobjdef<TArgs extends Parameters<OverrideQueryBuilder["pgGetStatisticsobjdef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetStatisticsobjdef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetStatisticsobjdef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetTriggerdef<TArgs extends Parameters<OverrideQueryBuilder["pgGetTriggerdef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetTriggerdef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetTriggerdef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetUserbyid<TArgs extends Parameters<OverrideQueryBuilder["pgGetUserbyid"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetUserbyid(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetUserbyid"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetViewdef<TArgs extends Parameters<OverrideQueryBuilder["pgGetViewdef"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetViewdef(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetViewdef"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetWalReplayPauseState<TArgs extends Parameters<OverrideQueryBuilder["pgGetWalReplayPauseState"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetWalReplayPauseState(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetWalReplayPauseState"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetWalResourceManagers<TArgs extends Parameters<OverrideQueryBuilder["pgGetWalResourceManagers"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetWalResourceManagers(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetWalResourceManagers"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgGetWalSummarizerState<TArgs extends Parameters<OverrideQueryBuilder["pgGetWalSummarizerState"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgGetWalSummarizerState(...(args as unknown as Parameters<OverrideQueryBuilder["pgGetWalSummarizerState"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgHasRole<TArgs extends Parameters<OverrideQueryBuilder["pgHasRole"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgHasRole(...(args as unknown as Parameters<OverrideQueryBuilder["pgHasRole"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIdentifyObject<TArgs extends Parameters<OverrideQueryBuilder["pgIdentifyObject"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIdentifyObject(...(args as unknown as Parameters<OverrideQueryBuilder["pgIdentifyObject"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIdentifyObjectAsAddress<TArgs extends Parameters<OverrideQueryBuilder["pgIdentifyObjectAsAddress"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIdentifyObjectAsAddress(...(args as unknown as Parameters<OverrideQueryBuilder["pgIdentifyObjectAsAddress"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgImportSystemCollations<TArgs extends Parameters<OverrideQueryBuilder["pgImportSystemCollations"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgImportSystemCollations(...(args as unknown as Parameters<OverrideQueryBuilder["pgImportSystemCollations"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIndexamHasProperty<TArgs extends Parameters<OverrideQueryBuilder["pgIndexamHasProperty"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIndexamHasProperty(...(args as unknown as Parameters<OverrideQueryBuilder["pgIndexamHasProperty"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIndexColumnHasProperty<TArgs extends Parameters<OverrideQueryBuilder["pgIndexColumnHasProperty"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIndexColumnHasProperty(...(args as unknown as Parameters<OverrideQueryBuilder["pgIndexColumnHasProperty"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIndexesSize<TArgs extends Parameters<OverrideQueryBuilder["pgIndexesSize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIndexesSize(...(args as unknown as Parameters<OverrideQueryBuilder["pgIndexesSize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIndexHasProperty<TArgs extends Parameters<OverrideQueryBuilder["pgIndexHasProperty"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIndexHasProperty(...(args as unknown as Parameters<OverrideQueryBuilder["pgIndexHasProperty"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgInputErrorInfo<TArgs extends Parameters<OverrideQueryBuilder["pgInputErrorInfo"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgInputErrorInfo(...(args as unknown as Parameters<OverrideQueryBuilder["pgInputErrorInfo"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgInputIsValid<TArgs extends Parameters<OverrideQueryBuilder["pgInputIsValid"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgInputIsValid(...(args as unknown as Parameters<OverrideQueryBuilder["pgInputIsValid"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIsInRecovery<TArgs extends Parameters<OverrideQueryBuilder["pgIsInRecovery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIsInRecovery(...(args as unknown as Parameters<OverrideQueryBuilder["pgIsInRecovery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIsOtherTempSchema<TArgs extends Parameters<OverrideQueryBuilder["pgIsOtherTempSchema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIsOtherTempSchema(...(args as unknown as Parameters<OverrideQueryBuilder["pgIsOtherTempSchema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgIsWalReplayPaused<TArgs extends Parameters<OverrideQueryBuilder["pgIsWalReplayPaused"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgIsWalReplayPaused(...(args as unknown as Parameters<OverrideQueryBuilder["pgIsWalReplayPaused"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgJitAvailable<TArgs extends Parameters<OverrideQueryBuilder["pgJitAvailable"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgJitAvailable(...(args as unknown as Parameters<OverrideQueryBuilder["pgJitAvailable"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLastCommittedXact<TArgs extends Parameters<OverrideQueryBuilder["pgLastCommittedXact"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLastCommittedXact(...(args as unknown as Parameters<OverrideQueryBuilder["pgLastCommittedXact"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLastWalReceiveLsn<TArgs extends Parameters<OverrideQueryBuilder["pgLastWalReceiveLsn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLastWalReceiveLsn(...(args as unknown as Parameters<OverrideQueryBuilder["pgLastWalReceiveLsn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLastWalReplayLsn<TArgs extends Parameters<OverrideQueryBuilder["pgLastWalReplayLsn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLastWalReplayLsn(...(args as unknown as Parameters<OverrideQueryBuilder["pgLastWalReplayLsn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLastXactReplayTimestamp<TArgs extends Parameters<OverrideQueryBuilder["pgLastXactReplayTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLastXactReplayTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["pgLastXactReplayTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgListeningChannels<TArgs extends Parameters<OverrideQueryBuilder["pgListeningChannels"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgListeningChannels(...(args as unknown as Parameters<OverrideQueryBuilder["pgListeningChannels"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLogBackendMemoryContexts<TArgs extends Parameters<OverrideQueryBuilder["pgLogBackendMemoryContexts"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLogBackendMemoryContexts(...(args as unknown as Parameters<OverrideQueryBuilder["pgLogBackendMemoryContexts"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLogicalEmitMessage<TArgs extends Parameters<OverrideQueryBuilder["pgLogicalEmitMessage"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLogicalEmitMessage(...(args as unknown as Parameters<OverrideQueryBuilder["pgLogicalEmitMessage"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLogicalSlotGetBinaryChanges<TArgs extends Parameters<OverrideQueryBuilder["pgLogicalSlotGetBinaryChanges"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLogicalSlotGetBinaryChanges(...(args as unknown as Parameters<OverrideQueryBuilder["pgLogicalSlotGetBinaryChanges"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLogicalSlotGetChanges<TArgs extends Parameters<OverrideQueryBuilder["pgLogicalSlotGetChanges"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLogicalSlotGetChanges(...(args as unknown as Parameters<OverrideQueryBuilder["pgLogicalSlotGetChanges"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLogicalSlotPeekBinaryChanges<TArgs extends Parameters<OverrideQueryBuilder["pgLogicalSlotPeekBinaryChanges"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLogicalSlotPeekBinaryChanges(...(args as unknown as Parameters<OverrideQueryBuilder["pgLogicalSlotPeekBinaryChanges"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLogicalSlotPeekChanges<TArgs extends Parameters<OverrideQueryBuilder["pgLogicalSlotPeekChanges"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLogicalSlotPeekChanges(...(args as unknown as Parameters<OverrideQueryBuilder["pgLogicalSlotPeekChanges"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLogStandbySnapshot<TArgs extends Parameters<OverrideQueryBuilder["pgLogStandbySnapshot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLogStandbySnapshot(...(args as unknown as Parameters<OverrideQueryBuilder["pgLogStandbySnapshot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsArchiveStatusdir<TArgs extends Parameters<OverrideQueryBuilder["pgLsArchiveStatusdir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsArchiveStatusdir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsArchiveStatusdir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsDir<TArgs extends Parameters<OverrideQueryBuilder["pgLsDir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsDir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsDir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsLogdir<TArgs extends Parameters<OverrideQueryBuilder["pgLsLogdir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsLogdir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsLogdir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsLogicalmapdir<TArgs extends Parameters<OverrideQueryBuilder["pgLsLogicalmapdir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsLogicalmapdir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsLogicalmapdir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsLogicalsnapdir<TArgs extends Parameters<OverrideQueryBuilder["pgLsLogicalsnapdir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsLogicalsnapdir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsLogicalsnapdir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsReplslotdir<TArgs extends Parameters<OverrideQueryBuilder["pgLsReplslotdir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsReplslotdir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsReplslotdir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsSummariesdir<TArgs extends Parameters<OverrideQueryBuilder["pgLsSummariesdir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsSummariesdir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsSummariesdir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsTmpdir<TArgs extends Parameters<OverrideQueryBuilder["pgLsTmpdir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsTmpdir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsTmpdir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgLsWaldir<TArgs extends Parameters<OverrideQueryBuilder["pgLsWaldir"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgLsWaldir(...(args as unknown as Parameters<OverrideQueryBuilder["pgLsWaldir"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgMcvListItems<TArgs extends Parameters<OverrideQueryBuilder["pgMcvListItems"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgMcvListItems(...(args as unknown as Parameters<OverrideQueryBuilder["pgMcvListItems"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgMyTempSchema<TArgs extends Parameters<OverrideQueryBuilder["pgMyTempSchema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgMyTempSchema(...(args as unknown as Parameters<OverrideQueryBuilder["pgMyTempSchema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgNotificationQueueUsage<TArgs extends Parameters<OverrideQueryBuilder["pgNotificationQueueUsage"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgNotificationQueueUsage(...(args as unknown as Parameters<OverrideQueryBuilder["pgNotificationQueueUsage"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgNumaAvailable<TArgs extends Parameters<OverrideQueryBuilder["pgNumaAvailable"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgNumaAvailable(...(args as unknown as Parameters<OverrideQueryBuilder["pgNumaAvailable"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgOpclassIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgOpclassIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgOpclassIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgOpclassIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgOperatorIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgOperatorIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgOperatorIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgOperatorIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgOpfamilyIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgOpfamilyIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgOpfamilyIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgOpfamilyIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgOptionsToTable<TArgs extends Parameters<OverrideQueryBuilder["pgOptionsToTable"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgOptionsToTable(...(args as unknown as Parameters<OverrideQueryBuilder["pgOptionsToTable"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgPartitionAncestors<TArgs extends Parameters<OverrideQueryBuilder["pgPartitionAncestors"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgPartitionAncestors(...(args as unknown as Parameters<OverrideQueryBuilder["pgPartitionAncestors"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgPartitionRoot<TArgs extends Parameters<OverrideQueryBuilder["pgPartitionRoot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgPartitionRoot(...(args as unknown as Parameters<OverrideQueryBuilder["pgPartitionRoot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgPartitionTree<TArgs extends Parameters<OverrideQueryBuilder["pgPartitionTree"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgPartitionTree(...(args as unknown as Parameters<OverrideQueryBuilder["pgPartitionTree"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgPostmasterStartTime<TArgs extends Parameters<OverrideQueryBuilder["pgPostmasterStartTime"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgPostmasterStartTime(...(args as unknown as Parameters<OverrideQueryBuilder["pgPostmasterStartTime"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgPromote<TArgs extends Parameters<OverrideQueryBuilder["pgPromote"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgPromote(...(args as unknown as Parameters<OverrideQueryBuilder["pgPromote"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReadBinaryFile<TArgs extends Parameters<OverrideQueryBuilder["pgReadBinaryFile"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReadBinaryFile(...(args as unknown as Parameters<OverrideQueryBuilder["pgReadBinaryFile"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReadFile<TArgs extends Parameters<OverrideQueryBuilder["pgReadFile"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReadFile(...(args as unknown as Parameters<OverrideQueryBuilder["pgReadFile"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgRelationFilenode<TArgs extends Parameters<OverrideQueryBuilder["pgRelationFilenode"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgRelationFilenode(...(args as unknown as Parameters<OverrideQueryBuilder["pgRelationFilenode"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgRelationFilepath<TArgs extends Parameters<OverrideQueryBuilder["pgRelationFilepath"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgRelationFilepath(...(args as unknown as Parameters<OverrideQueryBuilder["pgRelationFilepath"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgRelationSize<TArgs extends Parameters<OverrideQueryBuilder["pgRelationSize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgRelationSize(...(args as unknown as Parameters<OverrideQueryBuilder["pgRelationSize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReloadConf<TArgs extends Parameters<OverrideQueryBuilder["pgReloadConf"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReloadConf(...(args as unknown as Parameters<OverrideQueryBuilder["pgReloadConf"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginAdvance<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginAdvance"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginAdvance(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginAdvance"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginCreate<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginCreate"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginCreate(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginCreate"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginDrop<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginDrop"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginDrop(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginDrop"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginOid<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginOid"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginOid(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginOid"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginProgress<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginProgress"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginProgress(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginProgress"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginSessionIsSetup<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginSessionIsSetup"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginSessionIsSetup(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginSessionIsSetup"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginSessionProgress<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginSessionProgress"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginSessionProgress(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginSessionProgress"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginSessionReset<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginSessionReset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginSessionReset(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginSessionReset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginSessionSetup<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginSessionSetup"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginSessionSetup(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginSessionSetup"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginXactReset<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginXactReset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginXactReset(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginXactReset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationOriginXactSetup<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationOriginXactSetup"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationOriginXactSetup(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationOriginXactSetup"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgReplicationSlotAdvance<TArgs extends Parameters<OverrideQueryBuilder["pgReplicationSlotAdvance"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgReplicationSlotAdvance(...(args as unknown as Parameters<OverrideQueryBuilder["pgReplicationSlotAdvance"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgRestoreAttributeStats<TArgs extends Parameters<OverrideQueryBuilder["pgRestoreAttributeStats"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgRestoreAttributeStats(...(args as unknown as Parameters<OverrideQueryBuilder["pgRestoreAttributeStats"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgRestoreRelationStats<TArgs extends Parameters<OverrideQueryBuilder["pgRestoreRelationStats"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgRestoreRelationStats(...(args as unknown as Parameters<OverrideQueryBuilder["pgRestoreRelationStats"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgRotateLogfile<TArgs extends Parameters<OverrideQueryBuilder["pgRotateLogfile"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgRotateLogfile(...(args as unknown as Parameters<OverrideQueryBuilder["pgRotateLogfile"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSafeSnapshotBlockingPids<TArgs extends Parameters<OverrideQueryBuilder["pgSafeSnapshotBlockingPids"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSafeSnapshotBlockingPids(...(args as unknown as Parameters<OverrideQueryBuilder["pgSafeSnapshotBlockingPids"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSettingsGetFlags<TArgs extends Parameters<OverrideQueryBuilder["pgSettingsGetFlags"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSettingsGetFlags(...(args as unknown as Parameters<OverrideQueryBuilder["pgSettingsGetFlags"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSizeBytes<TArgs extends Parameters<OverrideQueryBuilder["pgSizeBytes"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSizeBytes(...(args as unknown as Parameters<OverrideQueryBuilder["pgSizeBytes"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSizePretty<TArgs extends Parameters<OverrideQueryBuilder["pgSizePretty"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSizePretty(...(args as unknown as Parameters<OverrideQueryBuilder["pgSizePretty"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSleep<TArgs extends Parameters<OverrideQueryBuilder["pgSleep"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSleep(...(args as unknown as Parameters<OverrideQueryBuilder["pgSleep"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSleepFor<TArgs extends Parameters<OverrideQueryBuilder["pgSleepFor"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSleepFor(...(args as unknown as Parameters<OverrideQueryBuilder["pgSleepFor"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSleepUntil<TArgs extends Parameters<OverrideQueryBuilder["pgSleepUntil"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSleepUntil(...(args as unknown as Parameters<OverrideQueryBuilder["pgSleepUntil"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSnapshotXip<TArgs extends Parameters<OverrideQueryBuilder["pgSnapshotXip"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSnapshotXip(...(args as unknown as Parameters<OverrideQueryBuilder["pgSnapshotXip"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSnapshotXmax<TArgs extends Parameters<OverrideQueryBuilder["pgSnapshotXmax"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSnapshotXmax(...(args as unknown as Parameters<OverrideQueryBuilder["pgSnapshotXmax"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSnapshotXmin<TArgs extends Parameters<OverrideQueryBuilder["pgSnapshotXmin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSnapshotXmin(...(args as unknown as Parameters<OverrideQueryBuilder["pgSnapshotXmin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSplitWalfileName<TArgs extends Parameters<OverrideQueryBuilder["pgSplitWalfileName"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSplitWalfileName(...(args as unknown as Parameters<OverrideQueryBuilder["pgSplitWalfileName"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgStatFile<TArgs extends Parameters<OverrideQueryBuilder["pgStatFile"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgStatFile(...(args as unknown as Parameters<OverrideQueryBuilder["pgStatFile"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgStatisticsObjIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgStatisticsObjIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgStatisticsObjIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgStatisticsObjIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSwitchWal<TArgs extends Parameters<OverrideQueryBuilder["pgSwitchWal"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSwitchWal(...(args as unknown as Parameters<OverrideQueryBuilder["pgSwitchWal"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgSyncReplicationSlots<TArgs extends Parameters<OverrideQueryBuilder["pgSyncReplicationSlots"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgSyncReplicationSlots(...(args as unknown as Parameters<OverrideQueryBuilder["pgSyncReplicationSlots"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTableIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgTableIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTableIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgTableIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTableSize<TArgs extends Parameters<OverrideQueryBuilder["pgTableSize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTableSize(...(args as unknown as Parameters<OverrideQueryBuilder["pgTableSize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTablespaceDatabases<TArgs extends Parameters<OverrideQueryBuilder["pgTablespaceDatabases"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTablespaceDatabases(...(args as unknown as Parameters<OverrideQueryBuilder["pgTablespaceDatabases"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTablespaceLocation<TArgs extends Parameters<OverrideQueryBuilder["pgTablespaceLocation"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTablespaceLocation(...(args as unknown as Parameters<OverrideQueryBuilder["pgTablespaceLocation"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTablespaceSize<TArgs extends Parameters<OverrideQueryBuilder["pgTablespaceSize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTablespaceSize(...(args as unknown as Parameters<OverrideQueryBuilder["pgTablespaceSize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTerminateBackend<TArgs extends Parameters<OverrideQueryBuilder["pgTerminateBackend"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTerminateBackend(...(args as unknown as Parameters<OverrideQueryBuilder["pgTerminateBackend"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTotalRelationSize<TArgs extends Parameters<OverrideQueryBuilder["pgTotalRelationSize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTotalRelationSize(...(args as unknown as Parameters<OverrideQueryBuilder["pgTotalRelationSize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTriggerDepth<TArgs extends Parameters<OverrideQueryBuilder["pgTriggerDepth"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTriggerDepth(...(args as unknown as Parameters<OverrideQueryBuilder["pgTriggerDepth"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTryAdvisoryLock<TArgs extends Parameters<OverrideQueryBuilder["pgTryAdvisoryLock"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTryAdvisoryLock(...(args as unknown as Parameters<OverrideQueryBuilder["pgTryAdvisoryLock"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTryAdvisoryLockShared<TArgs extends Parameters<OverrideQueryBuilder["pgTryAdvisoryLockShared"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTryAdvisoryLockShared(...(args as unknown as Parameters<OverrideQueryBuilder["pgTryAdvisoryLockShared"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTryAdvisoryXactLock<TArgs extends Parameters<OverrideQueryBuilder["pgTryAdvisoryXactLock"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTryAdvisoryXactLock(...(args as unknown as Parameters<OverrideQueryBuilder["pgTryAdvisoryXactLock"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTryAdvisoryXactLockShared<TArgs extends Parameters<OverrideQueryBuilder["pgTryAdvisoryXactLockShared"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTryAdvisoryXactLockShared(...(args as unknown as Parameters<OverrideQueryBuilder["pgTryAdvisoryXactLockShared"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTsConfigIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgTsConfigIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTsConfigIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgTsConfigIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTsDictIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgTsDictIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTsDictIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgTsDictIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTsParserIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgTsParserIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTsParserIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgTsParserIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTsTemplateIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgTsTemplateIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTsTemplateIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgTsTemplateIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTypeIsVisible<TArgs extends Parameters<OverrideQueryBuilder["pgTypeIsVisible"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTypeIsVisible(...(args as unknown as Parameters<OverrideQueryBuilder["pgTypeIsVisible"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgTypeof<TArgs extends Parameters<OverrideQueryBuilder["pgTypeof"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgTypeof(...(args as unknown as Parameters<OverrideQueryBuilder["pgTypeof"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgVisibleInSnapshot<TArgs extends Parameters<OverrideQueryBuilder["pgVisibleInSnapshot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgVisibleInSnapshot(...(args as unknown as Parameters<OverrideQueryBuilder["pgVisibleInSnapshot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgWalfileName<TArgs extends Parameters<OverrideQueryBuilder["pgWalfileName"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgWalfileName(...(args as unknown as Parameters<OverrideQueryBuilder["pgWalfileName"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgWalfileNameOffset<TArgs extends Parameters<OverrideQueryBuilder["pgWalfileNameOffset"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgWalfileNameOffset(...(args as unknown as Parameters<OverrideQueryBuilder["pgWalfileNameOffset"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgWalLsnDiff<TArgs extends Parameters<OverrideQueryBuilder["pgWalLsnDiff"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgWalLsnDiff(...(args as unknown as Parameters<OverrideQueryBuilder["pgWalLsnDiff"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgWalReplayPause<TArgs extends Parameters<OverrideQueryBuilder["pgWalReplayPause"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgWalReplayPause(...(args as unknown as Parameters<OverrideQueryBuilder["pgWalReplayPause"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgWalReplayResume<TArgs extends Parameters<OverrideQueryBuilder["pgWalReplayResume"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgWalReplayResume(...(args as unknown as Parameters<OverrideQueryBuilder["pgWalReplayResume"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgWalSummaryContents<TArgs extends Parameters<OverrideQueryBuilder["pgWalSummaryContents"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgWalSummaryContents(...(args as unknown as Parameters<OverrideQueryBuilder["pgWalSummaryContents"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgXactCommitTimestamp<TArgs extends Parameters<OverrideQueryBuilder["pgXactCommitTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgXactCommitTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["pgXactCommitTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgXactCommitTimestampOrigin<TArgs extends Parameters<OverrideQueryBuilder["pgXactCommitTimestampOrigin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgXactCommitTimestampOrigin(...(args as unknown as Parameters<OverrideQueryBuilder["pgXactCommitTimestampOrigin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pgXactStatus<TArgs extends Parameters<OverrideQueryBuilder["pgXactStatus"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pgXactStatus(...(args as unknown as Parameters<OverrideQueryBuilder["pgXactStatus"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  phrasetoTsquery<TArgs extends Parameters<OverrideQueryBuilder["phrasetoTsquery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).phrasetoTsquery(...(args as unknown as Parameters<OverrideQueryBuilder["phrasetoTsquery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pi<TArgs extends Parameters<OverrideQueryBuilder["pi"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).pi(...(args as unknown as Parameters<OverrideQueryBuilder["pi"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  pipe() {
    return (new QueryBuilder(this)).pipe();
  }
  placing() {
    return (new QueryBuilder(this)).placing();
  }
  plaintoTsquery<TArgs extends Parameters<OverrideQueryBuilder["plaintoTsquery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).plaintoTsquery(...(args as unknown as Parameters<OverrideQueryBuilder["plaintoTsquery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  plan() {
    return (new QueryBuilder(this)).plan();
  }
  plans() {
    return (new QueryBuilder(this)).plans();
  }
  pli() {
    return (new QueryBuilder(this)).pli();
  }
  plus<TArgs extends Parameters<OverrideQueryBuilder["plus"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).plus(...(args as unknown as Parameters<OverrideQueryBuilder["plus"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  point<TArgs extends Parameters<OverrideQueryBuilder["point"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).point(...(args as unknown as Parameters<OverrideQueryBuilder["point"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  policy() {
    return (new QueryBuilder(this)).policy();
  }
  polygon<TArgs extends Parameters<OverrideQueryBuilder["polygon"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).polygon(...(args as unknown as Parameters<OverrideQueryBuilder["polygon"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  popen<TArgs extends Parameters<OverrideQueryBuilder["popen"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).popen(...(args as unknown as Parameters<OverrideQueryBuilder["popen"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  portion() {
    return (new QueryBuilder(this)).portion();
  }
  position<TArgs extends Parameters<OverrideQueryBuilder["position"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).position(...(args as unknown as Parameters<OverrideQueryBuilder["position"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  positionRegex() {
    return (new QueryBuilder(this)).positionRegex();
  }
  power<TArgs extends Parameters<OverrideQueryBuilder["power"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).power(...(args as unknown as Parameters<OverrideQueryBuilder["power"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  precedes() {
    return (new QueryBuilder(this)).precedes();
  }
  preceding() {
    return (new QueryBuilder(this)).preceding();
  }
  precision() {
    return (new QueryBuilder(this)).precision();
  }
  prepare() {
    return (new QueryBuilder(this)).prepare();
  }
  prepared() {
    return (new QueryBuilder(this)).prepared();
  }
  prepareTransaction<TArgs extends Parameters<OverrideQueryBuilder["prepareTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).prepareTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["prepareTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  preserve() {
    return (new QueryBuilder(this)).preserve();
  }
  prev() {
    return (new QueryBuilder(this)).prev();
  }
  primary() {
    return (new QueryBuilder(this)).primary();
  }
  prior() {
    return (new QueryBuilder(this)).prior();
  }
  private() {
    return (new QueryBuilder(this)).private();
  }
  privileges() {
    return (new QueryBuilder(this)).privileges();
  }
  procedural() {
    return (new QueryBuilder(this)).procedural();
  }
  procedure() {
    return (new QueryBuilder(this)).procedure();
  }
  procedures() {
    return (new QueryBuilder(this)).procedures();
  }
  program() {
    return (new QueryBuilder(this)).program();
  }
  prune() {
    return (new QueryBuilder(this)).prune();
  }
  ptf() {
    return (new QueryBuilder(this)).ptf();
  }
  public() {
    return (new QueryBuilder(this)).public();
  }
  publication() {
    return (new QueryBuilder(this)).publication();
  }
  queryToXml<TArgs extends Parameters<OverrideQueryBuilder["queryToXml"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).queryToXml(...(args as unknown as Parameters<OverrideQueryBuilder["queryToXml"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  queryToXmlAndXmlschema<TArgs extends Parameters<OverrideQueryBuilder["queryToXmlAndXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).queryToXmlAndXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["queryToXmlAndXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  queryToXmlschema<TArgs extends Parameters<OverrideQueryBuilder["queryToXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).queryToXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["queryToXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  querytree<TArgs extends Parameters<OverrideQueryBuilder["querytree"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).querytree(...(args as unknown as Parameters<OverrideQueryBuilder["querytree"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  quote() {
    return (new QueryBuilder(this)).quote();
  }
  quoteIdent<TArgs extends Parameters<OverrideQueryBuilder["quoteIdent"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).quoteIdent(...(args as unknown as Parameters<OverrideQueryBuilder["quoteIdent"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  quoteLiteral<TArgs extends Parameters<OverrideQueryBuilder["quoteLiteral"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).quoteLiteral(...(args as unknown as Parameters<OverrideQueryBuilder["quoteLiteral"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  quoteNullable<TArgs extends Parameters<OverrideQueryBuilder["quoteNullable"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).quoteNullable(...(args as unknown as Parameters<OverrideQueryBuilder["quoteNullable"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  quotes() {
    return (new QueryBuilder(this)).quotes();
  }
  r(...args: Parameters<BaseRawQueryBuilder["r"]>) {
    return (new QueryBuilder(this)).r(...args);
  }
  radians<TArgs extends Parameters<OverrideQueryBuilder["radians"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).radians(...(args as unknown as Parameters<OverrideQueryBuilder["radians"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  radius<TArgs extends Parameters<OverrideQueryBuilder["radius"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).radius(...(args as unknown as Parameters<OverrideQueryBuilder["radius"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  random<TArgs extends Parameters<OverrideQueryBuilder["random"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).random(...(args as unknown as Parameters<OverrideQueryBuilder["random"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  randomNormal<TArgs extends Parameters<OverrideQueryBuilder["randomNormal"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).randomNormal(...(args as unknown as Parameters<OverrideQueryBuilder["randomNormal"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  range() {
    return (new QueryBuilder(this)).range();
  }
  rangeAgg<TArgs extends Parameters<OverrideQueryBuilder["rangeAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rangeAgg(...(args as unknown as Parameters<OverrideQueryBuilder["rangeAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rangeIntersectAgg<TArgs extends Parameters<OverrideQueryBuilder["rangeIntersectAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rangeIntersectAgg(...(args as unknown as Parameters<OverrideQueryBuilder["rangeIntersectAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rangeMerge<TArgs extends Parameters<OverrideQueryBuilder["rangeMerge"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rangeMerge(...(args as unknown as Parameters<OverrideQueryBuilder["rangeMerge"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rank<TArgs extends Parameters<OverrideQueryBuilder["rank"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rank(...(args as unknown as Parameters<OverrideQueryBuilder["rank"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  raw(...args: Parameters<BaseRawQueryBuilder["raw"]>) {
    return (new QueryBuilder(this)).raw(...args);
  }
  rawString(...args: Parameters<BaseRawQueryBuilder["rawString"]>) {
    return (new QueryBuilder(this)).rawString(...args);
  }
  read() {
    return (new QueryBuilder(this)).read();
  }
  reads() {
    return (new QueryBuilder(this)).reads();
  }
  real() {
    return (new QueryBuilder(this)).real();
  }
  reassign() {
    return (new QueryBuilder(this)).reassign();
  }
  recovery() {
    return (new QueryBuilder(this)).recovery();
  }
  recursive() {
    return (new QueryBuilder(this)).recursive();
  }
  ref() {
    return (new QueryBuilder(this)).ref();
  }
  references() {
    return (new QueryBuilder(this)).references();
  }
  referencing() {
    return (new QueryBuilder(this)).referencing();
  }
  refresh() {
    return (new QueryBuilder(this)).refresh();
  }
  regexpCount<TArgs extends Parameters<OverrideQueryBuilder["regexpCount"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpCount(...(args as unknown as Parameters<OverrideQueryBuilder["regexpCount"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpInstr<TArgs extends Parameters<OverrideQueryBuilder["regexpInstr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpInstr(...(args as unknown as Parameters<OverrideQueryBuilder["regexpInstr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpLike<TArgs extends Parameters<OverrideQueryBuilder["regexpLike"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpLike(...(args as unknown as Parameters<OverrideQueryBuilder["regexpLike"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpMatch<TArgs extends Parameters<OverrideQueryBuilder["regexpMatch"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpMatch(...(args as unknown as Parameters<OverrideQueryBuilder["regexpMatch"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpMatches<TArgs extends Parameters<OverrideQueryBuilder["regexpMatches"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpMatches(...(args as unknown as Parameters<OverrideQueryBuilder["regexpMatches"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpReplace<TArgs extends Parameters<OverrideQueryBuilder["regexpReplace"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpReplace(...(args as unknown as Parameters<OverrideQueryBuilder["regexpReplace"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpSplitToArray<TArgs extends Parameters<OverrideQueryBuilder["regexpSplitToArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpSplitToArray(...(args as unknown as Parameters<OverrideQueryBuilder["regexpSplitToArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpSplitToTable<TArgs extends Parameters<OverrideQueryBuilder["regexpSplitToTable"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpSplitToTable(...(args as unknown as Parameters<OverrideQueryBuilder["regexpSplitToTable"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regexpSubstr<TArgs extends Parameters<OverrideQueryBuilder["regexpSubstr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regexpSubstr(...(args as unknown as Parameters<OverrideQueryBuilder["regexpSubstr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrAvgx<TArgs extends Parameters<OverrideQueryBuilder["regrAvgx"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrAvgx(...(args as unknown as Parameters<OverrideQueryBuilder["regrAvgx"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrAvgy<TArgs extends Parameters<OverrideQueryBuilder["regrAvgy"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrAvgy(...(args as unknown as Parameters<OverrideQueryBuilder["regrAvgy"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrCount<TArgs extends Parameters<OverrideQueryBuilder["regrCount"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrCount(...(args as unknown as Parameters<OverrideQueryBuilder["regrCount"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrIntercept<TArgs extends Parameters<OverrideQueryBuilder["regrIntercept"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrIntercept(...(args as unknown as Parameters<OverrideQueryBuilder["regrIntercept"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrR2<TArgs extends Parameters<OverrideQueryBuilder["regrR2"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrR2(...(args as unknown as Parameters<OverrideQueryBuilder["regrR2"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrSlope<TArgs extends Parameters<OverrideQueryBuilder["regrSlope"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrSlope(...(args as unknown as Parameters<OverrideQueryBuilder["regrSlope"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrSxx<TArgs extends Parameters<OverrideQueryBuilder["regrSxx"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrSxx(...(args as unknown as Parameters<OverrideQueryBuilder["regrSxx"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrSxy<TArgs extends Parameters<OverrideQueryBuilder["regrSxy"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrSxy(...(args as unknown as Parameters<OverrideQueryBuilder["regrSxy"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  regrSyy<TArgs extends Parameters<OverrideQueryBuilder["regrSyy"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).regrSyy(...(args as unknown as Parameters<OverrideQueryBuilder["regrSyy"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  reindex() {
    return (new QueryBuilder(this)).reindex();
  }
  relative() {
    return (new QueryBuilder(this)).relative();
  }
  release() {
    return (new QueryBuilder(this)).release();
  }
  releaseTransaction<TArgs extends Parameters<OverrideQueryBuilder["releaseTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).releaseTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["releaseTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rename() {
    return (new QueryBuilder(this)).rename();
  }
  repeat<TArgs extends Parameters<OverrideQueryBuilder["repeat"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).repeat(...(args as unknown as Parameters<OverrideQueryBuilder["repeat"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  repeatable() {
    return (new QueryBuilder(this)).repeatable();
  }
  replace<TArgs extends Parameters<OverrideQueryBuilder["replace"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).replace(...(args as unknown as Parameters<OverrideQueryBuilder["replace"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  replica() {
    return (new QueryBuilder(this)).replica();
  }
  requiring() {
    return (new QueryBuilder(this)).requiring();
  }
  reset() {
    return (new QueryBuilder(this)).reset();
  }
  respect() {
    return (new QueryBuilder(this)).respect();
  }
  restart() {
    return (new QueryBuilder(this)).restart();
  }
  restore() {
    return (new QueryBuilder(this)).restore();
  }
  restrict() {
    return (new QueryBuilder(this)).restrict();
  }
  result() {
    return (new QueryBuilder(this)).result();
  }
  return() {
    return (new QueryBuilder(this)).return();
  }
  returnedCardinality() {
    return (new QueryBuilder(this)).returnedCardinality();
  }
  returnedLength() {
    return (new QueryBuilder(this)).returnedLength();
  }
  returnedoctetlength() {
    return (new QueryBuilder(this)).returnedoctetlength();
  }
  returnedSqlstate() {
    return (new QueryBuilder(this)).returnedSqlstate();
  }
  returning<TArgs extends Parameters<OverrideQueryBuilder["returning"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).returning(...(args as unknown as Parameters<OverrideQueryBuilder["returning"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  returns() {
    return (new QueryBuilder(this)).returns();
  }
  reverse<TArgs extends Parameters<OverrideQueryBuilder["reverse"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).reverse(...(args as unknown as Parameters<OverrideQueryBuilder["reverse"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  revoke() {
    return (new QueryBuilder(this)).revoke();
  }
  right<TArgs extends Parameters<OverrideQueryBuilder["right"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).right(...(args as unknown as Parameters<OverrideQueryBuilder["right"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rightJoin<TArgs extends Parameters<OverrideQueryBuilder["rightJoin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rightJoin(...(args as unknown as Parameters<OverrideQueryBuilder["rightJoin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rightJoinLateral<TArgs extends Parameters<OverrideQueryBuilder["rightJoinLateral"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rightJoinLateral(...(args as unknown as Parameters<OverrideQueryBuilder["rightJoinLateral"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  role() {
    return (new QueryBuilder(this)).role();
  }
  rollback() {
    return (new QueryBuilder(this)).rollback();
  }
  rollbackPreparedTransaction<TArgs extends Parameters<OverrideQueryBuilder["rollbackPreparedTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rollbackPreparedTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["rollbackPreparedTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rollbackToSavepointTransaction<TArgs extends Parameters<OverrideQueryBuilder["rollbackToSavepointTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rollbackToSavepointTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["rollbackToSavepointTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rollbackTransaction<TArgs extends Parameters<OverrideQueryBuilder["rollbackTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rollbackTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["rollbackTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rollup() {
    return (new QueryBuilder(this)).rollup();
  }
  round<TArgs extends Parameters<OverrideQueryBuilder["round"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).round(...(args as unknown as Parameters<OverrideQueryBuilder["round"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  routine() {
    return (new QueryBuilder(this)).routine();
  }
  routineCatalog() {
    return (new QueryBuilder(this)).routineCatalog();
  }
  routineName() {
    return (new QueryBuilder(this)).routineName();
  }
  routines() {
    return (new QueryBuilder(this)).routines();
  }
  routineSchema() {
    return (new QueryBuilder(this)).routineSchema();
  }
  row() {
    return (new QueryBuilder(this)).row();
  }
  rowCount() {
    return (new QueryBuilder(this)).rowCount();
  }
  rowNumber<TArgs extends Parameters<OverrideQueryBuilder["rowNumber"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rowNumber(...(args as unknown as Parameters<OverrideQueryBuilder["rowNumber"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rows() {
    return (new QueryBuilder(this)).rows();
  }
  rowSecurityActive<TArgs extends Parameters<OverrideQueryBuilder["rowSecurityActive"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rowSecurityActive(...(args as unknown as Parameters<OverrideQueryBuilder["rowSecurityActive"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rowToJson<TArgs extends Parameters<OverrideQueryBuilder["rowToJson"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rowToJson(...(args as unknown as Parameters<OverrideQueryBuilder["rowToJson"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rpad<TArgs extends Parameters<OverrideQueryBuilder["rpad"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rpad(...(args as unknown as Parameters<OverrideQueryBuilder["rpad"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rs(...args: Parameters<BaseRawQueryBuilder["rs"]>) {
    return (new QueryBuilder(this)).rs(...args);
  }
  rtrim<TArgs extends Parameters<OverrideQueryBuilder["rtrim"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).rtrim(...(args as unknown as Parameters<OverrideQueryBuilder["rtrim"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  rule() {
    return (new QueryBuilder(this)).rule();
  }
  running() {
    return (new QueryBuilder(this)).running();
  }
  sameAs<TArgs extends Parameters<OverrideQueryBuilder["sameAs"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sameAs(...(args as unknown as Parameters<OverrideQueryBuilder["sameAs"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  savepoint() {
    return (new QueryBuilder(this)).savepoint();
  }
  savepointTransaction<TArgs extends Parameters<OverrideQueryBuilder["savepointTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).savepointTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["savepointTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sc<TArgs extends Parameters<OverrideQueryBuilder["sc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sc(...(args as unknown as Parameters<OverrideQueryBuilder["sc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  scalar() {
    return (new QueryBuilder(this)).scalar();
  }
  scale<TArgs extends Parameters<OverrideQueryBuilder["scale"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).scale(...(args as unknown as Parameters<OverrideQueryBuilder["scale"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  schema() {
    return (new QueryBuilder(this)).schema();
  }
  schemaCase<TKey extends string, TCaseQuery extends QueryBuilder>(key: TKey, queryBuilder: TCaseQuery) {
    return (new QueryBuilder(this)).schemaCase(key, queryBuilder);
  }
  schemaName() {
    return (new QueryBuilder(this)).schemaName();
  }
  schemaParam<TKey extends string>(key: TKey) {
    return (new QueryBuilder(this)).schemaParam(key);
  }
  schemas() {
    return (new QueryBuilder(this)).schemas();
  }
  schemaToXml<TArgs extends Parameters<OverrideQueryBuilder["schemaToXml"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).schemaToXml(...(args as unknown as Parameters<OverrideQueryBuilder["schemaToXml"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  schemaToXmlAndXmlschema<TArgs extends Parameters<OverrideQueryBuilder["schemaToXmlAndXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).schemaToXmlAndXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["schemaToXmlAndXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  schemaToXmlschema<TArgs extends Parameters<OverrideQueryBuilder["schemaToXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).schemaToXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["schemaToXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  scope() {
    return (new QueryBuilder(this)).scope();
  }
  scopeCatalog() {
    return (new QueryBuilder(this)).scopeCatalog();
  }
  scopeName() {
    return (new QueryBuilder(this)).scopeName();
  }
  scopeSchema() {
    return (new QueryBuilder(this)).scopeSchema();
  }
  scroll() {
    return (new QueryBuilder(this)).scroll();
  }
  search() {
    return (new QueryBuilder(this)).search();
  }
  second() {
    return (new QueryBuilder(this)).second();
  }
  section() {
    return (new QueryBuilder(this)).section();
  }
  security() {
    return (new QueryBuilder(this)).security();
  }
  seek() {
    return (new QueryBuilder(this)).seek();
  }
  select<TArgs extends Parameters<OverrideQueryBuilder["select"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).select(...(args as unknown as Parameters<OverrideQueryBuilder["select"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  selectDistinct<TArgs extends Parameters<OverrideQueryBuilder["selectDistinct"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).selectDistinct(...(args as unknown as Parameters<OverrideQueryBuilder["selectDistinct"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  selectDistinctOn<TArgs extends Parameters<OverrideQueryBuilder["selectDistinctOn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).selectDistinctOn(...(args as unknown as Parameters<OverrideQueryBuilder["selectDistinctOn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  selective() {
    return (new QueryBuilder(this)).selective();
  }
  self() {
    return (new QueryBuilder(this)).self();
  }
  semantics() {
    return (new QueryBuilder(this)).semantics();
  }
  semicolon<TArgs extends Parameters<OverrideQueryBuilder["semicolon"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).semicolon(...(args as unknown as Parameters<OverrideQueryBuilder["semicolon"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sensitive() {
    return (new QueryBuilder(this)).sensitive();
  }
  sequence() {
    return (new QueryBuilder(this)).sequence();
  }
  sequences() {
    return (new QueryBuilder(this)).sequences();
  }
  serializable() {
    return (new QueryBuilder(this)).serializable();
  }
  server() {
    return (new QueryBuilder(this)).server();
  }
  serverName() {
    return (new QueryBuilder(this)).serverName();
  }
  session() {
    return (new QueryBuilder(this)).session();
  }
  sessionUser() {
    return (new QueryBuilder(this)).sessionUser();
  }
  set<TArgs extends Parameters<OverrideQueryBuilder["set"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).set(...(args as unknown as Parameters<OverrideQueryBuilder["set"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  setBit<TArgs extends Parameters<OverrideQueryBuilder["setBit"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setBit(...(args as unknown as Parameters<OverrideQueryBuilder["setBit"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  setByte<TArgs extends Parameters<OverrideQueryBuilder["setByte"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setByte(...(args as unknown as Parameters<OverrideQueryBuilder["setByte"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  setConfig<TArgs extends Parameters<OverrideQueryBuilder["setConfig"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setConfig(...(args as unknown as Parameters<OverrideQueryBuilder["setConfig"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  setMasklen<TArgs extends Parameters<OverrideQueryBuilder["setMasklen"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setMasklen(...(args as unknown as Parameters<OverrideQueryBuilder["setMasklen"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  setof() {
    return (new QueryBuilder(this)).setof();
  }
  setParams<TArgs extends Parameters<OverrideQueryBuilder["setParams"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setParams(...(args as unknown as Parameters<OverrideQueryBuilder["setParams"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sets() {
    return (new QueryBuilder(this)).sets();
  }
  setseed<TArgs extends Parameters<OverrideQueryBuilder["setseed"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setseed(...(args as unknown as Parameters<OverrideQueryBuilder["setseed"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  setval<TArgs extends Parameters<OverrideQueryBuilder["setval"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setval(...(args as unknown as Parameters<OverrideQueryBuilder["setval"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  setweight<TArgs extends Parameters<OverrideQueryBuilder["setweight"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).setweight(...(args as unknown as Parameters<OverrideQueryBuilder["setweight"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sha224<TArgs extends Parameters<OverrideQueryBuilder["sha224"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sha224(...(args as unknown as Parameters<OverrideQueryBuilder["sha224"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sha256<TArgs extends Parameters<OverrideQueryBuilder["sha256"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sha256(...(args as unknown as Parameters<OverrideQueryBuilder["sha256"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sha384<TArgs extends Parameters<OverrideQueryBuilder["sha384"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sha384(...(args as unknown as Parameters<OverrideQueryBuilder["sha384"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sha512<TArgs extends Parameters<OverrideQueryBuilder["sha512"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sha512(...(args as unknown as Parameters<OverrideQueryBuilder["sha512"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  share() {
    return (new QueryBuilder(this)).share();
  }
  shobjDescription<TArgs extends Parameters<OverrideQueryBuilder["shobjDescription"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).shobjDescription(...(args as unknown as Parameters<OverrideQueryBuilder["shobjDescription"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  show() {
    return (new QueryBuilder(this)).show();
  }
  sign<TArgs extends Parameters<OverrideQueryBuilder["sign"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sign(...(args as unknown as Parameters<OverrideQueryBuilder["sign"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  similar() {
    return (new QueryBuilder(this)).similar();
  }
  similarTo<TArgs extends Parameters<OverrideQueryBuilder["similarTo"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).similarTo(...(args as unknown as Parameters<OverrideQueryBuilder["similarTo"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  simple() {
    return (new QueryBuilder(this)).simple();
  }
  sin<TArgs extends Parameters<OverrideQueryBuilder["sin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sin(...(args as unknown as Parameters<OverrideQueryBuilder["sin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sind<TArgs extends Parameters<OverrideQueryBuilder["sind"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sind(...(args as unknown as Parameters<OverrideQueryBuilder["sind"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sinh<TArgs extends Parameters<OverrideQueryBuilder["sinh"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sinh(...(args as unknown as Parameters<OverrideQueryBuilder["sinh"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  size() {
    return (new QueryBuilder(this)).size();
  }
  skip() {
    return (new QueryBuilder(this)).skip();
  }
  slope<TArgs extends Parameters<OverrideQueryBuilder["slope"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).slope(...(args as unknown as Parameters<OverrideQueryBuilder["slope"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  smallint() {
    return (new QueryBuilder(this)).smallint();
  }
  snapshot() {
    return (new QueryBuilder(this)).snapshot();
  }
  some<TArgs extends Parameters<OverrideQueryBuilder["some"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).some(...(args as unknown as Parameters<OverrideQueryBuilder["some"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sortDirection() {
    return (new QueryBuilder(this)).sortDirection();
  }
  source() {
    return (new QueryBuilder(this)).source();
  }
  space() {
    return (new QueryBuilder(this)).space();
  }
  specific() {
    return (new QueryBuilder(this)).specific();
  }
  specificName() {
    return (new QueryBuilder(this)).specificName();
  }
  specifictype() {
    return (new QueryBuilder(this)).specifictype();
  }
  splitPart<TArgs extends Parameters<OverrideQueryBuilder["splitPart"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).splitPart(...(args as unknown as Parameters<OverrideQueryBuilder["splitPart"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  sql() {
    return (new QueryBuilder(this)).sql();
  }
  sqlcode() {
    return (new QueryBuilder(this)).sqlcode();
  }
  sqlerror() {
    return (new QueryBuilder(this)).sqlerror();
  }
  sqlexception() {
    return (new QueryBuilder(this)).sqlexception();
  }
  sqlstate() {
    return (new QueryBuilder(this)).sqlstate();
  }
  sqlwarning() {
    return (new QueryBuilder(this)).sqlwarning();
  }
  sqrt<TArgs extends Parameters<OverrideQueryBuilder["sqrt"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sqrt(...(args as unknown as Parameters<OverrideQueryBuilder["sqrt"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  stable() {
    return (new QueryBuilder(this)).stable();
  }
  standalone() {
    return (new QueryBuilder(this)).standalone();
  }
  start() {
    return (new QueryBuilder(this)).start();
  }
  startsWith<TArgs extends Parameters<OverrideQueryBuilder["startsWith"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).startsWith(...(args as unknown as Parameters<OverrideQueryBuilder["startsWith"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  startTransaction<TArgs extends Parameters<OverrideQueryBuilder["startTransaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).startTransaction(...(args as unknown as Parameters<OverrideQueryBuilder["startTransaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  state() {
    return (new QueryBuilder(this)).state();
  }
  statement() {
    return (new QueryBuilder(this)).statement();
  }
  statementTimestamp<TArgs extends Parameters<OverrideQueryBuilder["statementTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).statementTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["statementTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  static() {
    return (new QueryBuilder(this)).static();
  }
  statistics() {
    return (new QueryBuilder(this)).statistics();
  }
  stddev<TArgs extends Parameters<OverrideQueryBuilder["stddev"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).stddev(...(args as unknown as Parameters<OverrideQueryBuilder["stddev"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  stddevPop<TArgs extends Parameters<OverrideQueryBuilder["stddevPop"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).stddevPop(...(args as unknown as Parameters<OverrideQueryBuilder["stddevPop"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  stddevSamp<TArgs extends Parameters<OverrideQueryBuilder["stddevSamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).stddevSamp(...(args as unknown as Parameters<OverrideQueryBuilder["stddevSamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  stdin() {
    return (new QueryBuilder(this)).stdin();
  }
  stdout() {
    return (new QueryBuilder(this)).stdout();
  }
  storage() {
    return (new QueryBuilder(this)).storage();
  }
  stored() {
    return (new QueryBuilder(this)).stored();
  }
  strict() {
    return (new QueryBuilder(this)).strict();
  }
  strictlyAbove<TArgs extends Parameters<OverrideQueryBuilder["strictlyAbove"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).strictlyAbove(...(args as unknown as Parameters<OverrideQueryBuilder["strictlyAbove"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  strictlyBelow<TArgs extends Parameters<OverrideQueryBuilder["strictlyBelow"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).strictlyBelow(...(args as unknown as Parameters<OverrideQueryBuilder["strictlyBelow"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  string() {
    return (new QueryBuilder(this)).string();
  }
  stringAgg<TArgs extends Parameters<OverrideQueryBuilder["stringAgg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).stringAgg(...(args as unknown as Parameters<OverrideQueryBuilder["stringAgg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  stringToArray<TArgs extends Parameters<OverrideQueryBuilder["stringToArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).stringToArray(...(args as unknown as Parameters<OverrideQueryBuilder["stringToArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  stringToTable<TArgs extends Parameters<OverrideQueryBuilder["stringToTable"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).stringToTable(...(args as unknown as Parameters<OverrideQueryBuilder["stringToTable"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  strip<TArgs extends Parameters<OverrideQueryBuilder["strip"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).strip(...(args as unknown as Parameters<OverrideQueryBuilder["strip"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  strpos<TArgs extends Parameters<OverrideQueryBuilder["strpos"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).strpos(...(args as unknown as Parameters<OverrideQueryBuilder["strpos"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  structure() {
    return (new QueryBuilder(this)).structure();
  }
  style() {
    return (new QueryBuilder(this)).style();
  }
  sub<TArgs extends Parameters<OverrideQueryBuilder["sub"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sub(...(args as unknown as Parameters<OverrideQueryBuilder["sub"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  subclassOrigin() {
    return (new QueryBuilder(this)).subclassOrigin();
  }
  submultiset() {
    return (new QueryBuilder(this)).submultiset();
  }
  subscription() {
    return (new QueryBuilder(this)).subscription();
  }
  subset() {
    return (new QueryBuilder(this)).subset();
  }
  substr<TArgs extends Parameters<OverrideQueryBuilder["substr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).substr(...(args as unknown as Parameters<OverrideQueryBuilder["substr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  substring<TArgs extends Parameters<OverrideQueryBuilder["substring"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).substring(...(args as unknown as Parameters<OverrideQueryBuilder["substring"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  substringRegex() {
    return (new QueryBuilder(this)).substringRegex();
  }
  succeeds() {
    return (new QueryBuilder(this)).succeeds();
  }
  sum<TArgs extends Parameters<OverrideQueryBuilder["sum"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).sum(...(args as unknown as Parameters<OverrideQueryBuilder["sum"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  support() {
    return (new QueryBuilder(this)).support();
  }
  suppressRedundantUpdatesTrigger<TArgs extends Parameters<OverrideQueryBuilder["suppressRedundantUpdatesTrigger"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).suppressRedundantUpdatesTrigger(...(args as unknown as Parameters<OverrideQueryBuilder["suppressRedundantUpdatesTrigger"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  symmetric() {
    return (new QueryBuilder(this)).symmetric();
  }
  sysid() {
    return (new QueryBuilder(this)).sysid();
  }
  system() {
    return (new QueryBuilder(this)).system();
  }
  systemTime() {
    return (new QueryBuilder(this)).systemTime();
  }
  systemUser() {
    return (new QueryBuilder(this)).systemUser();
  }
  t<TArgs extends Parameters<OverrideQueryBuilder["t"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).t(...(args as unknown as Parameters<OverrideQueryBuilder["t"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  table() {
    return (new QueryBuilder(this)).table();
  }
  tableName() {
    return (new QueryBuilder(this)).tableName();
  }
  tables() {
    return (new QueryBuilder(this)).tables();
  }
  tablesample() {
    return (new QueryBuilder(this)).tablesample();
  }
  tablespace() {
    return (new QueryBuilder(this)).tablespace();
  }
  tableToXml<TArgs extends Parameters<OverrideQueryBuilder["tableToXml"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tableToXml(...(args as unknown as Parameters<OverrideQueryBuilder["tableToXml"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tableToXmlAndXmlschema<TArgs extends Parameters<OverrideQueryBuilder["tableToXmlAndXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tableToXmlAndXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["tableToXmlAndXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tableToXmlschema<TArgs extends Parameters<OverrideQueryBuilder["tableToXmlschema"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tableToXmlschema(...(args as unknown as Parameters<OverrideQueryBuilder["tableToXmlschema"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tan<TArgs extends Parameters<OverrideQueryBuilder["tan"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tan(...(args as unknown as Parameters<OverrideQueryBuilder["tan"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tand<TArgs extends Parameters<OverrideQueryBuilder["tand"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tand(...(args as unknown as Parameters<OverrideQueryBuilder["tand"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tanh<TArgs extends Parameters<OverrideQueryBuilder["tanh"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tanh(...(args as unknown as Parameters<OverrideQueryBuilder["tanh"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  target() {
    return (new QueryBuilder(this)).target();
  }
  temp() {
    return (new QueryBuilder(this)).temp();
  }
  template() {
    return (new QueryBuilder(this)).template();
  }
  temporary() {
    return (new QueryBuilder(this)).temporary();
  }
  text() {
    return (new QueryBuilder(this)).text();
  }
  textCat<TArgs extends Parameters<OverrideQueryBuilder["textCat"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).textCat(...(args as unknown as Parameters<OverrideQueryBuilder["textCat"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  then<TArgs extends Parameters<OverrideQueryBuilder["then"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).then(...(args as unknown as Parameters<OverrideQueryBuilder["then"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  through() {
    return (new QueryBuilder(this)).through();
  }
  ties() {
    return (new QueryBuilder(this)).ties();
  }
  time() {
    return (new QueryBuilder(this)).time();
  }
  timeofday<TArgs extends Parameters<OverrideQueryBuilder["timeofday"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).timeofday(...(args as unknown as Parameters<OverrideQueryBuilder["timeofday"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  timestamp() {
    return (new QueryBuilder(this)).timestamp();
  }
  timezoneHour() {
    return (new QueryBuilder(this)).timezoneHour();
  }
  timezoneMinute() {
    return (new QueryBuilder(this)).timezoneMinute();
  }
  to() {
    return (new QueryBuilder(this)).to();
  }
  toAscii<TArgs extends Parameters<OverrideQueryBuilder["toAscii"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toAscii(...(args as unknown as Parameters<OverrideQueryBuilder["toAscii"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toBin<TArgs extends Parameters<OverrideQueryBuilder["toBin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toBin(...(args as unknown as Parameters<OverrideQueryBuilder["toBin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toChar<TArgs extends Parameters<OverrideQueryBuilder["toChar"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toChar(...(args as unknown as Parameters<OverrideQueryBuilder["toChar"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toDate<TArgs extends Parameters<OverrideQueryBuilder["toDate"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toDate(...(args as unknown as Parameters<OverrideQueryBuilder["toDate"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toHex<TArgs extends Parameters<OverrideQueryBuilder["toHex"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toHex(...(args as unknown as Parameters<OverrideQueryBuilder["toHex"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toJson<TArgs extends Parameters<OverrideQueryBuilder["toJson"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toJson(...(args as unknown as Parameters<OverrideQueryBuilder["toJson"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toJsonb<TArgs extends Parameters<OverrideQueryBuilder["toJsonb"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toJsonb(...(args as unknown as Parameters<OverrideQueryBuilder["toJsonb"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  token() {
    return (new QueryBuilder(this)).token();
  }
  toNumber<TArgs extends Parameters<OverrideQueryBuilder["toNumber"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toNumber(...(args as unknown as Parameters<OverrideQueryBuilder["toNumber"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toOct<TArgs extends Parameters<OverrideQueryBuilder["toOct"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toOct(...(args as unknown as Parameters<OverrideQueryBuilder["toOct"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  topLevelCount() {
    return (new QueryBuilder(this)).topLevelCount();
  }
  toRegclass<TArgs extends Parameters<OverrideQueryBuilder["toRegclass"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegclass(...(args as unknown as Parameters<OverrideQueryBuilder["toRegclass"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegcollation<TArgs extends Parameters<OverrideQueryBuilder["toRegcollation"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegcollation(...(args as unknown as Parameters<OverrideQueryBuilder["toRegcollation"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegnamespace<TArgs extends Parameters<OverrideQueryBuilder["toRegnamespace"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegnamespace(...(args as unknown as Parameters<OverrideQueryBuilder["toRegnamespace"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegoper<TArgs extends Parameters<OverrideQueryBuilder["toRegoper"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegoper(...(args as unknown as Parameters<OverrideQueryBuilder["toRegoper"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegoperator<TArgs extends Parameters<OverrideQueryBuilder["toRegoperator"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegoperator(...(args as unknown as Parameters<OverrideQueryBuilder["toRegoperator"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegproc<TArgs extends Parameters<OverrideQueryBuilder["toRegproc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegproc(...(args as unknown as Parameters<OverrideQueryBuilder["toRegproc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegprocedure<TArgs extends Parameters<OverrideQueryBuilder["toRegprocedure"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegprocedure(...(args as unknown as Parameters<OverrideQueryBuilder["toRegprocedure"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegrole<TArgs extends Parameters<OverrideQueryBuilder["toRegrole"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegrole(...(args as unknown as Parameters<OverrideQueryBuilder["toRegrole"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegtype<TArgs extends Parameters<OverrideQueryBuilder["toRegtype"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegtype(...(args as unknown as Parameters<OverrideQueryBuilder["toRegtype"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toRegtypemod<TArgs extends Parameters<OverrideQueryBuilder["toRegtypemod"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toRegtypemod(...(args as unknown as Parameters<OverrideQueryBuilder["toRegtypemod"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  totalLength<TArgs extends Parameters<OverrideQueryBuilder["totalLength"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).totalLength(...(args as unknown as Parameters<OverrideQueryBuilder["totalLength"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toText<TArgs extends Parameters<OverrideQueryBuilder["toText"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toText(...(args as unknown as Parameters<OverrideQueryBuilder["toText"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toTimestamp<TArgs extends Parameters<OverrideQueryBuilder["toTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["toTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toTsquery<TArgs extends Parameters<OverrideQueryBuilder["toTsquery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toTsquery(...(args as unknown as Parameters<OverrideQueryBuilder["toTsquery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  toTsvector<TArgs extends Parameters<OverrideQueryBuilder["toTsvector"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).toTsvector(...(args as unknown as Parameters<OverrideQueryBuilder["toTsvector"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  trailing() {
    return (new QueryBuilder(this)).trailing();
  }
  transaction<TArgs extends Parameters<OverrideQueryBuilder["transaction"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).transaction(...(args as unknown as Parameters<OverrideQueryBuilder["transaction"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  transactionActive() {
    return (new QueryBuilder(this)).transactionActive();
  }
  transactionscommitted() {
    return (new QueryBuilder(this)).transactionscommitted();
  }
  transactionsrolledback() {
    return (new QueryBuilder(this)).transactionsrolledback();
  }
  transactionTimestamp<TArgs extends Parameters<OverrideQueryBuilder["transactionTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).transactionTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["transactionTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  transform() {
    return (new QueryBuilder(this)).transform();
  }
  transforms() {
    return (new QueryBuilder(this)).transforms();
  }
  translate<TArgs extends Parameters<OverrideQueryBuilder["translate"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).translate(...(args as unknown as Parameters<OverrideQueryBuilder["translate"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  translateRegex() {
    return (new QueryBuilder(this)).translateRegex();
  }
  translation() {
    return (new QueryBuilder(this)).translation();
  }
  treat() {
    return (new QueryBuilder(this)).treat();
  }
  trigger() {
    return (new QueryBuilder(this)).trigger();
  }
  triggerCatalog() {
    return (new QueryBuilder(this)).triggerCatalog();
  }
  triggerName() {
    return (new QueryBuilder(this)).triggerName();
  }
  triggerSchema() {
    return (new QueryBuilder(this)).triggerSchema();
  }
  trim<TArgs extends Parameters<OverrideQueryBuilder["trim"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).trim(...(args as unknown as Parameters<OverrideQueryBuilder["trim"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  trimArray<TArgs extends Parameters<OverrideQueryBuilder["trimArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).trimArray(...(args as unknown as Parameters<OverrideQueryBuilder["trimArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  trimScale<TArgs extends Parameters<OverrideQueryBuilder["trimScale"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).trimScale(...(args as unknown as Parameters<OverrideQueryBuilder["trimScale"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  true() {
    return (new QueryBuilder(this)).true();
  }
  trunc<TArgs extends Parameters<OverrideQueryBuilder["trunc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).trunc(...(args as unknown as Parameters<OverrideQueryBuilder["trunc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  truncate() {
    return (new QueryBuilder(this)).truncate();
  }
  trusted() {
    return (new QueryBuilder(this)).trusted();
  }
  tsDebug<TArgs extends Parameters<OverrideQueryBuilder["tsDebug"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsDebug(...(args as unknown as Parameters<OverrideQueryBuilder["tsDebug"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsDelete<TArgs extends Parameters<OverrideQueryBuilder["tsDelete"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsDelete(...(args as unknown as Parameters<OverrideQueryBuilder["tsDelete"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsFilter<TArgs extends Parameters<OverrideQueryBuilder["tsFilter"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsFilter(...(args as unknown as Parameters<OverrideQueryBuilder["tsFilter"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsHeadline<TArgs extends Parameters<OverrideQueryBuilder["tsHeadline"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsHeadline(...(args as unknown as Parameters<OverrideQueryBuilder["tsHeadline"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsLexize<TArgs extends Parameters<OverrideQueryBuilder["tsLexize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsLexize(...(args as unknown as Parameters<OverrideQueryBuilder["tsLexize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsParse<TArgs extends Parameters<OverrideQueryBuilder["tsParse"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsParse(...(args as unknown as Parameters<OverrideQueryBuilder["tsParse"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsqueryPhrase<TArgs extends Parameters<OverrideQueryBuilder["tsqueryPhrase"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsqueryPhrase(...(args as unknown as Parameters<OverrideQueryBuilder["tsqueryPhrase"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsRank<TArgs extends Parameters<OverrideQueryBuilder["tsRank"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsRank(...(args as unknown as Parameters<OverrideQueryBuilder["tsRank"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsRankCd<TArgs extends Parameters<OverrideQueryBuilder["tsRankCd"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsRankCd(...(args as unknown as Parameters<OverrideQueryBuilder["tsRankCd"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsRewrite<TArgs extends Parameters<OverrideQueryBuilder["tsRewrite"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsRewrite(...(args as unknown as Parameters<OverrideQueryBuilder["tsRewrite"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsStat<TArgs extends Parameters<OverrideQueryBuilder["tsStat"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsStat(...(args as unknown as Parameters<OverrideQueryBuilder["tsStat"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsTokenType<TArgs extends Parameters<OverrideQueryBuilder["tsTokenType"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsTokenType(...(args as unknown as Parameters<OverrideQueryBuilder["tsTokenType"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsvectorToArray<TArgs extends Parameters<OverrideQueryBuilder["tsvectorToArray"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsvectorToArray(...(args as unknown as Parameters<OverrideQueryBuilder["tsvectorToArray"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsvectorUpdateTrigger<TArgs extends Parameters<OverrideQueryBuilder["tsvectorUpdateTrigger"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsvectorUpdateTrigger(...(args as unknown as Parameters<OverrideQueryBuilder["tsvectorUpdateTrigger"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  tsvectorUpdateTriggerColumn<TArgs extends Parameters<OverrideQueryBuilder["tsvectorUpdateTriggerColumn"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).tsvectorUpdateTriggerColumn(...(args as unknown as Parameters<OverrideQueryBuilder["tsvectorUpdateTriggerColumn"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidCurrent<TArgs extends Parameters<OverrideQueryBuilder["txidCurrent"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidCurrent(...(args as unknown as Parameters<OverrideQueryBuilder["txidCurrent"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidCurrentIfAssigned<TArgs extends Parameters<OverrideQueryBuilder["txidCurrentIfAssigned"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidCurrentIfAssigned(...(args as unknown as Parameters<OverrideQueryBuilder["txidCurrentIfAssigned"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidCurrentSnapshot<TArgs extends Parameters<OverrideQueryBuilder["txidCurrentSnapshot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidCurrentSnapshot(...(args as unknown as Parameters<OverrideQueryBuilder["txidCurrentSnapshot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidSnapshotXip<TArgs extends Parameters<OverrideQueryBuilder["txidSnapshotXip"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidSnapshotXip(...(args as unknown as Parameters<OverrideQueryBuilder["txidSnapshotXip"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidSnapshotXmax<TArgs extends Parameters<OverrideQueryBuilder["txidSnapshotXmax"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidSnapshotXmax(...(args as unknown as Parameters<OverrideQueryBuilder["txidSnapshotXmax"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidSnapshotXmin<TArgs extends Parameters<OverrideQueryBuilder["txidSnapshotXmin"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidSnapshotXmin(...(args as unknown as Parameters<OverrideQueryBuilder["txidSnapshotXmin"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidStatus<TArgs extends Parameters<OverrideQueryBuilder["txidStatus"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidStatus(...(args as unknown as Parameters<OverrideQueryBuilder["txidStatus"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  txidVisibleInSnapshot<TArgs extends Parameters<OverrideQueryBuilder["txidVisibleInSnapshot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).txidVisibleInSnapshot(...(args as unknown as Parameters<OverrideQueryBuilder["txidVisibleInSnapshot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  type() {
    return (new QueryBuilder(this)).type();
  }
  types() {
    return (new QueryBuilder(this)).types();
  }
  uescape() {
    return (new QueryBuilder(this)).uescape();
  }
  unbounded() {
    return (new QueryBuilder(this)).unbounded();
  }
  uncommitted() {
    return (new QueryBuilder(this)).uncommitted();
  }
  unconditional() {
    return (new QueryBuilder(this)).unconditional();
  }
  under() {
    return (new QueryBuilder(this)).under();
  }
  unencrypted() {
    return (new QueryBuilder(this)).unencrypted();
  }
  unicodeAssigned<TArgs extends Parameters<OverrideQueryBuilder["unicodeAssigned"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).unicodeAssigned(...(args as unknown as Parameters<OverrideQueryBuilder["unicodeAssigned"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  unicodeVersion<TArgs extends Parameters<OverrideQueryBuilder["unicodeVersion"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).unicodeVersion(...(args as unknown as Parameters<OverrideQueryBuilder["unicodeVersion"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  union<TArgs extends Parameters<OverrideQueryBuilder["union"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).union(...(args as unknown as Parameters<OverrideQueryBuilder["union"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  unionAll<TArgs extends Parameters<OverrideQueryBuilder["unionAll"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).unionAll(...(args as unknown as Parameters<OverrideQueryBuilder["unionAll"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  unique() {
    return (new QueryBuilder(this)).unique();
  }
  unistr<TArgs extends Parameters<OverrideQueryBuilder["unistr"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).unistr(...(args as unknown as Parameters<OverrideQueryBuilder["unistr"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  unknown() {
    return (new QueryBuilder(this)).unknown();
  }
  unlink() {
    return (new QueryBuilder(this)).unlink();
  }
  unlisten() {
    return (new QueryBuilder(this)).unlisten();
  }
  unlogged() {
    return (new QueryBuilder(this)).unlogged();
  }
  unmatched() {
    return (new QueryBuilder(this)).unmatched();
  }
  unnamed() {
    return (new QueryBuilder(this)).unnamed();
  }
  unnest<TArgs extends Parameters<OverrideQueryBuilder["unnest"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).unnest(...(args as unknown as Parameters<OverrideQueryBuilder["unnest"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  until() {
    return (new QueryBuilder(this)).until();
  }
  untyped() {
    return (new QueryBuilder(this)).untyped();
  }
  update<TArgs extends Parameters<OverrideQueryBuilder["update"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).update(...(args as unknown as Parameters<OverrideQueryBuilder["update"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  upper<TArgs extends Parameters<OverrideQueryBuilder["upper"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).upper(...(args as unknown as Parameters<OverrideQueryBuilder["upper"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  upperInc<TArgs extends Parameters<OverrideQueryBuilder["upperInc"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).upperInc(...(args as unknown as Parameters<OverrideQueryBuilder["upperInc"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  upperInf<TArgs extends Parameters<OverrideQueryBuilder["upperInf"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).upperInf(...(args as unknown as Parameters<OverrideQueryBuilder["upperInf"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  uri() {
    return (new QueryBuilder(this)).uri();
  }
  usage() {
    return (new QueryBuilder(this)).usage();
  }
  user() {
    return (new QueryBuilder(this)).user();
  }
  userdefinedtypecatalog() {
    return (new QueryBuilder(this)).userdefinedtypecatalog();
  }
  userdefinedtypecode() {
    return (new QueryBuilder(this)).userdefinedtypecode();
  }
  userdefinedtypename() {
    return (new QueryBuilder(this)).userdefinedtypename();
  }
  userdefinedtypeschema() {
    return (new QueryBuilder(this)).userdefinedtypeschema();
  }
  using() {
    return (new QueryBuilder(this)).using();
  }
  utf16() {
    return (new QueryBuilder(this)).utf16();
  }
  utf32() {
    return (new QueryBuilder(this)).utf32();
  }
  utf8() {
    return (new QueryBuilder(this)).utf8();
  }
  uuidExtractTimestamp<TArgs extends Parameters<OverrideQueryBuilder["uuidExtractTimestamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).uuidExtractTimestamp(...(args as unknown as Parameters<OverrideQueryBuilder["uuidExtractTimestamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  uuidExtractVersion<TArgs extends Parameters<OverrideQueryBuilder["uuidExtractVersion"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).uuidExtractVersion(...(args as unknown as Parameters<OverrideQueryBuilder["uuidExtractVersion"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  uuidv4<TArgs extends Parameters<OverrideQueryBuilder["uuidv4"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).uuidv4(...(args as unknown as Parameters<OverrideQueryBuilder["uuidv4"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  uuidv7<TArgs extends Parameters<OverrideQueryBuilder["uuidv7"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).uuidv7(...(args as unknown as Parameters<OverrideQueryBuilder["uuidv7"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  v(...args: Parameters<BaseRawQueryBuilder["v"]>) {
    return (new QueryBuilder(this)).v(...args);
  }
  vacuum() {
    return (new QueryBuilder(this)).vacuum();
  }
  valid() {
    return (new QueryBuilder(this)).valid();
  }
  validate() {
    return (new QueryBuilder(this)).validate();
  }
  validator() {
    return (new QueryBuilder(this)).validator();
  }
  value() {
    return (new QueryBuilder(this)).value();
  }
  valueOfKeyword() {
    return (new QueryBuilder(this)).valueOfKeyword();
  }
  values<TArgs extends Parameters<OverrideQueryBuilder["values"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).values(...(args as unknown as Parameters<OverrideQueryBuilder["values"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  varbinary() {
    return (new QueryBuilder(this)).varbinary();
  }
  varchar() {
    return (new QueryBuilder(this)).varchar();
  }
  variadic() {
    return (new QueryBuilder(this)).variadic();
  }
  variance<TArgs extends Parameters<OverrideQueryBuilder["variance"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).variance(...(args as unknown as Parameters<OverrideQueryBuilder["variance"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  varPop<TArgs extends Parameters<OverrideQueryBuilder["varPop"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).varPop(...(args as unknown as Parameters<OverrideQueryBuilder["varPop"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  varSamp<TArgs extends Parameters<OverrideQueryBuilder["varSamp"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).varSamp(...(args as unknown as Parameters<OverrideQueryBuilder["varSamp"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  varying() {
    return (new QueryBuilder(this)).varying();
  }
  verbose() {
    return (new QueryBuilder(this)).verbose();
  }
  version<TArgs extends Parameters<OverrideQueryBuilder["version"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).version(...(args as unknown as Parameters<OverrideQueryBuilder["version"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  versioning() {
    return (new QueryBuilder(this)).versioning();
  }
  vertical<TArgs extends Parameters<OverrideQueryBuilder["vertical"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).vertical(...(args as unknown as Parameters<OverrideQueryBuilder["vertical"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  view() {
    return (new QueryBuilder(this)).view();
  }
  views() {
    return (new QueryBuilder(this)).views();
  }
  virtual() {
    return (new QueryBuilder(this)).virtual();
  }
  volatile() {
    return (new QueryBuilder(this)).volatile();
  }
  websearchToTsquery<TArgs extends Parameters<OverrideQueryBuilder["websearchToTsquery"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).websearchToTsquery(...(args as unknown as Parameters<OverrideQueryBuilder["websearchToTsquery"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  when<TArgs extends Parameters<OverrideQueryBuilder["when"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).when(...(args as unknown as Parameters<OverrideQueryBuilder["when"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  whenever() {
    return (new QueryBuilder(this)).whenever();
  }
  where<TArgs extends Parameters<OverrideQueryBuilder["where"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).where(...(args as unknown as Parameters<OverrideQueryBuilder["where"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  whitespace() {
    return (new QueryBuilder(this)).whitespace();
  }
  width<TArgs extends Parameters<OverrideQueryBuilder["width"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).width(...(args as unknown as Parameters<OverrideQueryBuilder["width"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  widthBucket<TArgs extends Parameters<OverrideQueryBuilder["widthBucket"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).widthBucket(...(args as unknown as Parameters<OverrideQueryBuilder["widthBucket"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  window<TArgs extends Parameters<OverrideQueryBuilder["window"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).window(...(args as unknown as Parameters<OverrideQueryBuilder["window"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  with<TArgs extends Parameters<OverrideQueryBuilder["with"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).with(...(args as unknown as Parameters<OverrideQueryBuilder["with"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  within() {
    return (new QueryBuilder(this)).within();
  }
  without() {
    return (new QueryBuilder(this)).without();
  }
  withTies<TArgs extends Parameters<OverrideQueryBuilder["withTies"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).withTies(...(args as unknown as Parameters<OverrideQueryBuilder["withTies"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  work() {
    return (new QueryBuilder(this)).work();
  }
  wrapper() {
    return (new QueryBuilder(this)).wrapper();
  }
  write() {
    return (new QueryBuilder(this)).write();
  }
  xml() {
    return (new QueryBuilder(this)).xml();
  }
  xmlagg<TArgs extends Parameters<OverrideQueryBuilder["xmlagg"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlagg(...(args as unknown as Parameters<OverrideQueryBuilder["xmlagg"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlattributes<TArgs extends Parameters<OverrideQueryBuilder["xmlattributes"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlattributes(...(args as unknown as Parameters<OverrideQueryBuilder["xmlattributes"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlbinary() {
    return (new QueryBuilder(this)).xmlbinary();
  }
  xmlcast() {
    return (new QueryBuilder(this)).xmlcast();
  }
  xmlcomment<TArgs extends Parameters<OverrideQueryBuilder["xmlcomment"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlcomment(...(args as unknown as Parameters<OverrideQueryBuilder["xmlcomment"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlconcat<TArgs extends Parameters<OverrideQueryBuilder["xmlconcat"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlconcat(...(args as unknown as Parameters<OverrideQueryBuilder["xmlconcat"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmldeclaration() {
    return (new QueryBuilder(this)).xmldeclaration();
  }
  xmldocument() {
    return (new QueryBuilder(this)).xmldocument();
  }
  xmlelement<TArgs extends Parameters<OverrideQueryBuilder["xmlelement"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlelement(...(args as unknown as Parameters<OverrideQueryBuilder["xmlelement"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlexists<TArgs extends Parameters<OverrideQueryBuilder["xmlexists"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlexists(...(args as unknown as Parameters<OverrideQueryBuilder["xmlexists"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlforest<TArgs extends Parameters<OverrideQueryBuilder["xmlforest"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlforest(...(args as unknown as Parameters<OverrideQueryBuilder["xmlforest"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlIsWellFormed<TArgs extends Parameters<OverrideQueryBuilder["xmlIsWellFormed"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlIsWellFormed(...(args as unknown as Parameters<OverrideQueryBuilder["xmlIsWellFormed"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlIsWellFormedContent<TArgs extends Parameters<OverrideQueryBuilder["xmlIsWellFormedContent"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlIsWellFormedContent(...(args as unknown as Parameters<OverrideQueryBuilder["xmlIsWellFormedContent"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlIsWellFormedDocument<TArgs extends Parameters<OverrideQueryBuilder["xmlIsWellFormedDocument"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlIsWellFormedDocument(...(args as unknown as Parameters<OverrideQueryBuilder["xmlIsWellFormedDocument"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmliterate() {
    return (new QueryBuilder(this)).xmliterate();
  }
  xmlnamespaces() {
    return (new QueryBuilder(this)).xmlnamespaces();
  }
  xmlparse<TArgs extends Parameters<OverrideQueryBuilder["xmlparse"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlparse(...(args as unknown as Parameters<OverrideQueryBuilder["xmlparse"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlpi<TArgs extends Parameters<OverrideQueryBuilder["xmlpi"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlpi(...(args as unknown as Parameters<OverrideQueryBuilder["xmlpi"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlquery() {
    return (new QueryBuilder(this)).xmlquery();
  }
  xmlroot<TArgs extends Parameters<OverrideQueryBuilder["xmlroot"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlroot(...(args as unknown as Parameters<OverrideQueryBuilder["xmlroot"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlschema() {
    return (new QueryBuilder(this)).xmlschema();
  }
  xmlserialize<TArgs extends Parameters<OverrideQueryBuilder["xmlserialize"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmlserialize(...(args as unknown as Parameters<OverrideQueryBuilder["xmlserialize"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmltable() {
    return (new QueryBuilder(this)).xmltable();
  }
  xmltext<TArgs extends Parameters<OverrideQueryBuilder["xmltext"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xmltext(...(args as unknown as Parameters<OverrideQueryBuilder["xmltext"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xmlvalidate() {
    return (new QueryBuilder(this)).xmlvalidate();
  }
  xpath<TArgs extends Parameters<OverrideQueryBuilder["xpath"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xpath(...(args as unknown as Parameters<OverrideQueryBuilder["xpath"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  xpathExists<TArgs extends Parameters<OverrideQueryBuilder["xpathExists"]>>(...args: TArgs): ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>> {
    return (new QueryBuilder(this)).xpathExists(...(args as unknown as Parameters<OverrideQueryBuilder["xpathExists"]>)) as ApplyInferredBuilderParams<QueryBuilder, InferSchemaParamsFromArgs<TArgs>>;
  }
  year() {
    return (new QueryBuilder(this)).year();
  }
  yes() {
    return (new QueryBuilder(this)).yes();
  }
  zone() {
    return (new QueryBuilder(this)).zone();
  }
}