// AUTO-GENERATED - DO NOT EDIT.
import type { RequiredDBInstance } from "../types";
import { QueryBuilder } from "../query-builder";
import { BaseRawQueryBuilder } from "../base-raw-query-builder";
import { OverrideQueryBuilder } from "../override-query-builder";

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
  abbrev(...args: Parameters<OverrideQueryBuilder["abbrev"]>) {
    return (new QueryBuilder(this)).abbrev(...args);
  }
  abort() {
    return (new QueryBuilder(this)).abort();
  }
  abs(...args: Parameters<OverrideQueryBuilder["abs"]>) {
    return (new QueryBuilder(this)).abs(...args);
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
  acldefault(...args: Parameters<OverrideQueryBuilder["acldefault"]>) {
    return (new QueryBuilder(this)).acldefault(...args);
  }
  aclexplode(...args: Parameters<OverrideQueryBuilder["aclexplode"]>) {
    return (new QueryBuilder(this)).aclexplode(...args);
  }
  acos(...args: Parameters<OverrideQueryBuilder["acos"]>) {
    return (new QueryBuilder(this)).acos(...args);
  }
  acosd(...args: Parameters<OverrideQueryBuilder["acosd"]>) {
    return (new QueryBuilder(this)).acosd(...args);
  }
  acosh(...args: Parameters<OverrideQueryBuilder["acosh"]>) {
    return (new QueryBuilder(this)).acosh(...args);
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
  age(...args: Parameters<OverrideQueryBuilder["age"]>) {
    return (new QueryBuilder(this)).age(...args);
  }
  aggregate() {
    return (new QueryBuilder(this)).aggregate();
  }
  all(...args: Parameters<OverrideQueryBuilder["all"]>) {
    return (new QueryBuilder(this)).all(...args);
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
  and(...args: Parameters<OverrideQueryBuilder["and"]>) {
    return (new QueryBuilder(this)).and(...args);
  }
  any(...args: Parameters<OverrideQueryBuilder["any"]>) {
    return (new QueryBuilder(this)).any(...args);
  }
  anyValue(...args: Parameters<OverrideQueryBuilder["anyValue"]>) {
    return (new QueryBuilder(this)).anyValue(...args);
  }
  are() {
    return (new QueryBuilder(this)).are();
  }
  area(...args: Parameters<OverrideQueryBuilder["area"]>) {
    return (new QueryBuilder(this)).area(...args);
  }
  array() {
    return (new QueryBuilder(this)).array();
  }
  arrayAgg(...args: Parameters<OverrideQueryBuilder["arrayAgg"]>) {
    return (new QueryBuilder(this)).arrayAgg(...args);
  }
  arrayAppend(...args: Parameters<OverrideQueryBuilder["arrayAppend"]>) {
    return (new QueryBuilder(this)).arrayAppend(...args);
  }
  arrayCat(...args: Parameters<OverrideQueryBuilder["arrayCat"]>) {
    return (new QueryBuilder(this)).arrayCat(...args);
  }
  arrayDims(...args: Parameters<OverrideQueryBuilder["arrayDims"]>) {
    return (new QueryBuilder(this)).arrayDims(...args);
  }
  arrayFill(...args: Parameters<OverrideQueryBuilder["arrayFill"]>) {
    return (new QueryBuilder(this)).arrayFill(...args);
  }
  arrayLength(...args: Parameters<OverrideQueryBuilder["arrayLength"]>) {
    return (new QueryBuilder(this)).arrayLength(...args);
  }
  arrayLower(...args: Parameters<OverrideQueryBuilder["arrayLower"]>) {
    return (new QueryBuilder(this)).arrayLower(...args);
  }
  arraymaxcardinality() {
    return (new QueryBuilder(this)).arraymaxcardinality();
  }
  arrayNdims(...args: Parameters<OverrideQueryBuilder["arrayNdims"]>) {
    return (new QueryBuilder(this)).arrayNdims(...args);
  }
  arrayPosition(...args: Parameters<OverrideQueryBuilder["arrayPosition"]>) {
    return (new QueryBuilder(this)).arrayPosition(...args);
  }
  arrayPositions(...args: Parameters<OverrideQueryBuilder["arrayPositions"]>) {
    return (new QueryBuilder(this)).arrayPositions(...args);
  }
  arrayPrepend(...args: Parameters<OverrideQueryBuilder["arrayPrepend"]>) {
    return (new QueryBuilder(this)).arrayPrepend(...args);
  }
  arrayRemove(...args: Parameters<OverrideQueryBuilder["arrayRemove"]>) {
    return (new QueryBuilder(this)).arrayRemove(...args);
  }
  arrayReplace(...args: Parameters<OverrideQueryBuilder["arrayReplace"]>) {
    return (new QueryBuilder(this)).arrayReplace(...args);
  }
  arrayReverse(...args: Parameters<OverrideQueryBuilder["arrayReverse"]>) {
    return (new QueryBuilder(this)).arrayReverse(...args);
  }
  arraySample(...args: Parameters<OverrideQueryBuilder["arraySample"]>) {
    return (new QueryBuilder(this)).arraySample(...args);
  }
  arrayShuffle(...args: Parameters<OverrideQueryBuilder["arrayShuffle"]>) {
    return (new QueryBuilder(this)).arrayShuffle(...args);
  }
  arraySort(...args: Parameters<OverrideQueryBuilder["arraySort"]>) {
    return (new QueryBuilder(this)).arraySort(...args);
  }
  arrayToJson(...args: Parameters<OverrideQueryBuilder["arrayToJson"]>) {
    return (new QueryBuilder(this)).arrayToJson(...args);
  }
  arrayToString(...args: Parameters<OverrideQueryBuilder["arrayToString"]>) {
    return (new QueryBuilder(this)).arrayToString(...args);
  }
  arrayToTsvector(...args: Parameters<OverrideQueryBuilder["arrayToTsvector"]>) {
    return (new QueryBuilder(this)).arrayToTsvector(...args);
  }
  arrayUpper(...args: Parameters<OverrideQueryBuilder["arrayUpper"]>) {
    return (new QueryBuilder(this)).arrayUpper(...args);
  }
  as(...args: Parameters<OverrideQueryBuilder["as"]>) {
    return (new QueryBuilder(this)).as(...args);
  }
  asc(...args: Parameters<OverrideQueryBuilder["asc"]>) {
    return (new QueryBuilder(this)).asc(...args);
  }
  ascii(...args: Parameters<OverrideQueryBuilder["ascii"]>) {
    return (new QueryBuilder(this)).ascii(...args);
  }
  asensitive() {
    return (new QueryBuilder(this)).asensitive();
  }
  asin(...args: Parameters<OverrideQueryBuilder["asin"]>) {
    return (new QueryBuilder(this)).asin(...args);
  }
  asind(...args: Parameters<OverrideQueryBuilder["asind"]>) {
    return (new QueryBuilder(this)).asind(...args);
  }
  asinh(...args: Parameters<OverrideQueryBuilder["asinh"]>) {
    return (new QueryBuilder(this)).asinh(...args);
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
  atan(...args: Parameters<OverrideQueryBuilder["atan"]>) {
    return (new QueryBuilder(this)).atan(...args);
  }
  atan2(...args: Parameters<OverrideQueryBuilder["atan2"]>) {
    return (new QueryBuilder(this)).atan2(...args);
  }
  atan2d(...args: Parameters<OverrideQueryBuilder["atan2d"]>) {
    return (new QueryBuilder(this)).atan2d(...args);
  }
  atand(...args: Parameters<OverrideQueryBuilder["atand"]>) {
    return (new QueryBuilder(this)).atand(...args);
  }
  atanh(...args: Parameters<OverrideQueryBuilder["atanh"]>) {
    return (new QueryBuilder(this)).atanh(...args);
  }
  atLocal(...args: Parameters<OverrideQueryBuilder["atLocal"]>) {
    return (new QueryBuilder(this)).atLocal(...args);
  }
  atLocalIdentifier(...args: Parameters<OverrideQueryBuilder["atLocalIdentifier"]>) {
    return (new QueryBuilder(this)).atLocalIdentifier(...args);
  }
  atomic() {
    return (new QueryBuilder(this)).atomic();
  }
  attach() {
    return (new QueryBuilder(this)).attach();
  }
  atTimeZone(...args: Parameters<OverrideQueryBuilder["atTimeZone"]>) {
    return (new QueryBuilder(this)).atTimeZone(...args);
  }
  atTimeZoneIdentifier(...args: Parameters<OverrideQueryBuilder["atTimeZoneIdentifier"]>) {
    return (new QueryBuilder(this)).atTimeZoneIdentifier(...args);
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
  avg(...args: Parameters<OverrideQueryBuilder["avg"]>) {
    return (new QueryBuilder(this)).avg(...args);
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
  beginTransaction(...args: Parameters<OverrideQueryBuilder["beginTransaction"]>) {
    return (new QueryBuilder(this)).beginTransaction(...args);
  }
  bernoulli() {
    return (new QueryBuilder(this)).bernoulli();
  }
  between() {
    return (new QueryBuilder(this)).between();
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
  bitAnd(...args: Parameters<OverrideQueryBuilder["bitAnd"]>) {
    return (new QueryBuilder(this)).bitAnd(...args);
  }
  bitCount(...args: Parameters<OverrideQueryBuilder["bitCount"]>) {
    return (new QueryBuilder(this)).bitCount(...args);
  }
  bitLength(...args: Parameters<OverrideQueryBuilder["bitLength"]>) {
    return (new QueryBuilder(this)).bitLength(...args);
  }
  bitOr(...args: Parameters<OverrideQueryBuilder["bitOr"]>) {
    return (new QueryBuilder(this)).bitOr(...args);
  }
  bitXor(...args: Parameters<OverrideQueryBuilder["bitXor"]>) {
    return (new QueryBuilder(this)).bitXor(...args);
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
  boolAnd(...args: Parameters<OverrideQueryBuilder["boolAnd"]>) {
    return (new QueryBuilder(this)).boolAnd(...args);
  }
  boolean() {
    return (new QueryBuilder(this)).boolean();
  }
  boolOr(...args: Parameters<OverrideQueryBuilder["boolOr"]>) {
    return (new QueryBuilder(this)).boolOr(...args);
  }
  both() {
    return (new QueryBuilder(this)).both();
  }
  boundBox(...args: Parameters<OverrideQueryBuilder["boundBox"]>) {
    return (new QueryBuilder(this)).boundBox(...args);
  }
  box(...args: Parameters<OverrideQueryBuilder["box"]>) {
    return (new QueryBuilder(this)).box(...args);
  }
  breadth() {
    return (new QueryBuilder(this)).breadth();
  }
  brinDesummarizeRange(...args: Parameters<OverrideQueryBuilder["brinDesummarizeRange"]>) {
    return (new QueryBuilder(this)).brinDesummarizeRange(...args);
  }
  brinSummarizeNewValues(...args: Parameters<OverrideQueryBuilder["brinSummarizeNewValues"]>) {
    return (new QueryBuilder(this)).brinSummarizeNewValues(...args);
  }
  brinSummarizeRange(...args: Parameters<OverrideQueryBuilder["brinSummarizeRange"]>) {
    return (new QueryBuilder(this)).brinSummarizeRange(...args);
  }
  broadcast(...args: Parameters<OverrideQueryBuilder["broadcast"]>) {
    return (new QueryBuilder(this)).broadcast(...args);
  }
  btrim(...args: Parameters<OverrideQueryBuilder["btrim"]>) {
    return (new QueryBuilder(this)).btrim(...args);
  }
  by() {
    return (new QueryBuilder(this)).by();
  }
  byteaConcat(...args: Parameters<OverrideQueryBuilder["byteaConcat"]>) {
    return (new QueryBuilder(this)).byteaConcat(...args);
  }
  c(...args: Parameters<OverrideQueryBuilder["c"]>) {
    return (new QueryBuilder(this)).c(...args);
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
  cardinality(...args: Parameters<OverrideQueryBuilder["cardinality"]>) {
    return (new QueryBuilder(this)).cardinality(...args);
  }
  cascade() {
    return (new QueryBuilder(this)).cascade();
  }
  cascaded() {
    return (new QueryBuilder(this)).cascaded();
  }
  case(...args: Parameters<OverrideQueryBuilder["case"]>) {
    return (new QueryBuilder(this)).case(...args);
  }
  casefold(...args: Parameters<OverrideQueryBuilder["casefold"]>) {
    return (new QueryBuilder(this)).casefold(...args);
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
  cbrt(...args: Parameters<OverrideQueryBuilder["cbrt"]>) {
    return (new QueryBuilder(this)).cbrt(...args);
  }
  ceil(...args: Parameters<OverrideQueryBuilder["ceil"]>) {
    return (new QueryBuilder(this)).ceil(...args);
  }
  ceiling(...args: Parameters<OverrideQueryBuilder["ceiling"]>) {
    return (new QueryBuilder(this)).ceiling(...args);
  }
  center(...args: Parameters<OverrideQueryBuilder["center"]>) {
    return (new QueryBuilder(this)).center(...args);
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
  characterLength(...args: Parameters<OverrideQueryBuilder["characterLength"]>) {
    return (new QueryBuilder(this)).characterLength(...args);
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
  charLength(...args: Parameters<OverrideQueryBuilder["charLength"]>) {
    return (new QueryBuilder(this)).charLength(...args);
  }
  check() {
    return (new QueryBuilder(this)).check();
  }
  checkpoint() {
    return (new QueryBuilder(this)).checkpoint();
  }
  chr(...args: Parameters<OverrideQueryBuilder["chr"]>) {
    return (new QueryBuilder(this)).chr(...args);
  }
  circle(...args: Parameters<OverrideQueryBuilder["circle"]>) {
    return (new QueryBuilder(this)).circle(...args);
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
  clockTimestamp(...args: Parameters<OverrideQueryBuilder["clockTimestamp"]>) {
    return (new QueryBuilder(this)).clockTimestamp(...args);
  }
  close() {
    return (new QueryBuilder(this)).close();
  }
  cluster() {
    return (new QueryBuilder(this)).cluster();
  }
  coalesce(...args: Parameters<OverrideQueryBuilder["coalesce"]>) {
    return (new QueryBuilder(this)).coalesce(...args);
  }
  cobol() {
    return (new QueryBuilder(this)).cobol();
  }
  colDescription(...args: Parameters<OverrideQueryBuilder["colDescription"]>) {
    return (new QueryBuilder(this)).colDescription(...args);
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
  collationName() {
    return (new QueryBuilder(this)).collationName();
  }
  collationSchema() {
    return (new QueryBuilder(this)).collationSchema();
  }
  collect() {
    return (new QueryBuilder(this)).collect();
  }
  column(...args: Parameters<OverrideQueryBuilder["column"]>) {
    return (new QueryBuilder(this)).column(...args);
  }
  columnName() {
    return (new QueryBuilder(this)).columnName();
  }
  columns() {
    return (new QueryBuilder(this)).columns();
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
  committed() {
    return (new QueryBuilder(this)).committed();
  }
  commitTransaction(...args: Parameters<OverrideQueryBuilder["commitTransaction"]>) {
    return (new QueryBuilder(this)).commitTransaction(...args);
  }
  compression() {
    return (new QueryBuilder(this)).compression();
  }
  concat(...args: Parameters<OverrideQueryBuilder["concat"]>) {
    return (new QueryBuilder(this)).concat(...args);
  }
  concatWs(...args: Parameters<OverrideQueryBuilder["concatWs"]>) {
    return (new QueryBuilder(this)).concatWs(...args);
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
  convert(...args: Parameters<OverrideQueryBuilder["convert"]>) {
    return (new QueryBuilder(this)).convert(...args);
  }
  convertFrom(...args: Parameters<OverrideQueryBuilder["convertFrom"]>) {
    return (new QueryBuilder(this)).convertFrom(...args);
  }
  convertTo(...args: Parameters<OverrideQueryBuilder["convertTo"]>) {
    return (new QueryBuilder(this)).convertTo(...args);
  }
  copartition() {
    return (new QueryBuilder(this)).copartition();
  }
  copy() {
    return (new QueryBuilder(this)).copy();
  }
  corr(...args: Parameters<OverrideQueryBuilder["corr"]>) {
    return (new QueryBuilder(this)).corr(...args);
  }
  corresponding() {
    return (new QueryBuilder(this)).corresponding();
  }
  cos(...args: Parameters<OverrideQueryBuilder["cos"]>) {
    return (new QueryBuilder(this)).cos(...args);
  }
  cosd(...args: Parameters<OverrideQueryBuilder["cosd"]>) {
    return (new QueryBuilder(this)).cosd(...args);
  }
  cosh(...args: Parameters<OverrideQueryBuilder["cosh"]>) {
    return (new QueryBuilder(this)).cosh(...args);
  }
  cost() {
    return (new QueryBuilder(this)).cost();
  }
  cot(...args: Parameters<OverrideQueryBuilder["cot"]>) {
    return (new QueryBuilder(this)).cot(...args);
  }
  cotd(...args: Parameters<OverrideQueryBuilder["cotd"]>) {
    return (new QueryBuilder(this)).cotd(...args);
  }
  count(...args: Parameters<OverrideQueryBuilder["count"]>) {
    return (new QueryBuilder(this)).count(...args);
  }
  covarPop(...args: Parameters<OverrideQueryBuilder["covarPop"]>) {
    return (new QueryBuilder(this)).covarPop(...args);
  }
  covarSamp(...args: Parameters<OverrideQueryBuilder["covarSamp"]>) {
    return (new QueryBuilder(this)).covarSamp(...args);
  }
  crc32(...args: Parameters<OverrideQueryBuilder["crc32"]>) {
    return (new QueryBuilder(this)).crc32(...args);
  }
  crc32c(...args: Parameters<OverrideQueryBuilder["crc32c"]>) {
    return (new QueryBuilder(this)).crc32c(...args);
  }
  create() {
    return (new QueryBuilder(this)).create();
  }
  cross() {
    return (new QueryBuilder(this)).cross();
  }
  crossJoin(...args: Parameters<OverrideQueryBuilder["crossJoin"]>) {
    return (new QueryBuilder(this)).crossJoin(...args);
  }
  crossJoinLateral(...args: Parameters<OverrideQueryBuilder["crossJoinLateral"]>) {
    return (new QueryBuilder(this)).crossJoinLateral(...args);
  }
  csv() {
    return (new QueryBuilder(this)).csv();
  }
  cube() {
    return (new QueryBuilder(this)).cube();
  }
  cumeDist(...args: Parameters<OverrideQueryBuilder["cumeDist"]>) {
    return (new QueryBuilder(this)).cumeDist(...args);
  }
  current() {
    return (new QueryBuilder(this)).current();
  }
  currentCatalog() {
    return (new QueryBuilder(this)).currentCatalog();
  }
  currentDatabase(...args: Parameters<OverrideQueryBuilder["currentDatabase"]>) {
    return (new QueryBuilder(this)).currentDatabase(...args);
  }
  currentDate() {
    return (new QueryBuilder(this)).currentDate();
  }
  currentdefaulttransformgroup() {
    return (new QueryBuilder(this)).currentdefaulttransformgroup();
  }
  currentPath() {
    return (new QueryBuilder(this)).currentPath();
  }
  currentQuery(...args: Parameters<OverrideQueryBuilder["currentQuery"]>) {
    return (new QueryBuilder(this)).currentQuery(...args);
  }
  currentRole() {
    return (new QueryBuilder(this)).currentRole();
  }
  currentRow() {
    return (new QueryBuilder(this)).currentRow();
  }
  currentSchema() {
    return (new QueryBuilder(this)).currentSchema();
  }
  currentSchemas(...args: Parameters<OverrideQueryBuilder["currentSchemas"]>) {
    return (new QueryBuilder(this)).currentSchemas(...args);
  }
  currentSetting(...args: Parameters<OverrideQueryBuilder["currentSetting"]>) {
    return (new QueryBuilder(this)).currentSetting(...args);
  }
  currentTime(...args: Parameters<OverrideQueryBuilder["currentTime"]>) {
    return (new QueryBuilder(this)).currentTime(...args);
  }
  currentTimestamp(...args: Parameters<OverrideQueryBuilder["currentTimestamp"]>) {
    return (new QueryBuilder(this)).currentTimestamp(...args);
  }
  currenttransformgroupfortype() {
    return (new QueryBuilder(this)).currenttransformgroupfortype();
  }
  currentUser() {
    return (new QueryBuilder(this)).currentUser();
  }
  currval(...args: Parameters<OverrideQueryBuilder["currval"]>) {
    return (new QueryBuilder(this)).currval(...args);
  }
  cursor() {
    return (new QueryBuilder(this)).cursor();
  }
  cursorName() {
    return (new QueryBuilder(this)).cursorName();
  }
  cursorToXml(...args: Parameters<OverrideQueryBuilder["cursorToXml"]>) {
    return (new QueryBuilder(this)).cursorToXml(...args);
  }
  cursorToXmlschema(...args: Parameters<OverrideQueryBuilder["cursorToXmlschema"]>) {
    return (new QueryBuilder(this)).cursorToXmlschema(...args);
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
  databaseToXml(...args: Parameters<OverrideQueryBuilder["databaseToXml"]>) {
    return (new QueryBuilder(this)).databaseToXml(...args);
  }
  databaseToXmlAndXmlschema(...args: Parameters<OverrideQueryBuilder["databaseToXmlAndXmlschema"]>) {
    return (new QueryBuilder(this)).databaseToXmlAndXmlschema(...args);
  }
  databaseToXmlschema(...args: Parameters<OverrideQueryBuilder["databaseToXmlschema"]>) {
    return (new QueryBuilder(this)).databaseToXmlschema(...args);
  }
  datalink() {
    return (new QueryBuilder(this)).datalink();
  }
  date() {
    return (new QueryBuilder(this)).date();
  }
  dateAdd(...args: Parameters<OverrideQueryBuilder["dateAdd"]>) {
    return (new QueryBuilder(this)).dateAdd(...args);
  }
  dateBin(...args: Parameters<OverrideQueryBuilder["dateBin"]>) {
    return (new QueryBuilder(this)).dateBin(...args);
  }
  datePart(...args: Parameters<OverrideQueryBuilder["datePart"]>) {
    return (new QueryBuilder(this)).datePart(...args);
  }
  dateSubtract(...args: Parameters<OverrideQueryBuilder["dateSubtract"]>) {
    return (new QueryBuilder(this)).dateSubtract(...args);
  }
  datetimeintervalcode() {
    return (new QueryBuilder(this)).datetimeintervalcode();
  }
  datetimeintervalprecision() {
    return (new QueryBuilder(this)).datetimeintervalprecision();
  }
  dateTrunc(...args: Parameters<OverrideQueryBuilder["dateTrunc"]>) {
    return (new QueryBuilder(this)).dateTrunc(...args);
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
  decode(...args: Parameters<OverrideQueryBuilder["decode"]>) {
    return (new QueryBuilder(this)).decode(...args);
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
  degrees(...args: Parameters<OverrideQueryBuilder["degrees"]>) {
    return (new QueryBuilder(this)).degrees(...args);
  }
  delete(...args: Parameters<OverrideQueryBuilder["delete"]>) {
    return (new QueryBuilder(this)).delete(...args);
  }
  delimiter() {
    return (new QueryBuilder(this)).delimiter();
  }
  delimiters() {
    return (new QueryBuilder(this)).delimiters();
  }
  denseRank(...args: Parameters<OverrideQueryBuilder["denseRank"]>) {
    return (new QueryBuilder(this)).denseRank(...args);
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
  desc(...args: Parameters<OverrideQueryBuilder["desc"]>) {
    return (new QueryBuilder(this)).desc(...args);
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
  diagonal(...args: Parameters<OverrideQueryBuilder["diagonal"]>) {
    return (new QueryBuilder(this)).diagonal(...args);
  }
  diameter(...args: Parameters<OverrideQueryBuilder["diameter"]>) {
    return (new QueryBuilder(this)).diameter(...args);
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
  distinct() {
    return (new QueryBuilder(this)).distinct();
  }
  div(...args: Parameters<OverrideQueryBuilder["div"]>) {
    return (new QueryBuilder(this)).div(...args);
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
  double() {
    return (new QueryBuilder(this)).double();
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
  else(...args: Parameters<OverrideQueryBuilder["else"]>) {
    return (new QueryBuilder(this)).else(...args);
  }
  empty() {
    return (new QueryBuilder(this)).empty();
  }
  enable() {
    return (new QueryBuilder(this)).enable();
  }
  encode(...args: Parameters<OverrideQueryBuilder["encode"]>) {
    return (new QueryBuilder(this)).encode(...args);
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
  enumFirst(...args: Parameters<OverrideQueryBuilder["enumFirst"]>) {
    return (new QueryBuilder(this)).enumFirst(...args);
  }
  enumLast(...args: Parameters<OverrideQueryBuilder["enumLast"]>) {
    return (new QueryBuilder(this)).enumLast(...args);
  }
  enumRange(...args: Parameters<OverrideQueryBuilder["enumRange"]>) {
    return (new QueryBuilder(this)).enumRange(...args);
  }
  equals() {
    return (new QueryBuilder(this)).equals();
  }
  erf(...args: Parameters<OverrideQueryBuilder["erf"]>) {
    return (new QueryBuilder(this)).erf(...args);
  }
  erfc(...args: Parameters<OverrideQueryBuilder["erfc"]>) {
    return (new QueryBuilder(this)).erfc(...args);
  }
  error() {
    return (new QueryBuilder(this)).error();
  }
  escape(...args: Parameters<OverrideQueryBuilder["escape"]>) {
    return (new QueryBuilder(this)).escape(...args);
  }
  event() {
    return (new QueryBuilder(this)).event();
  }
  every(...args: Parameters<OverrideQueryBuilder["every"]>) {
    return (new QueryBuilder(this)).every(...args);
  }
  except(...args: Parameters<OverrideQueryBuilder["except"]>) {
    return (new QueryBuilder(this)).except(...args);
  }
  exceptAll(...args: Parameters<OverrideQueryBuilder["exceptAll"]>) {
    return (new QueryBuilder(this)).exceptAll(...args);
  }
  exception() {
    return (new QueryBuilder(this)).exception();
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
  exists(...args: Parameters<OverrideQueryBuilder["exists"]>) {
    return (new QueryBuilder(this)).exists(...args);
  }
  exp(...args: Parameters<OverrideQueryBuilder["exp"]>) {
    return (new QueryBuilder(this)).exp(...args);
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
  extract(...args: Parameters<OverrideQueryBuilder["extract"]>) {
    return (new QueryBuilder(this)).extract(...args);
  }
  factorial(...args: Parameters<OverrideQueryBuilder["factorial"]>) {
    return (new QueryBuilder(this)).factorial(...args);
  }
  false() {
    return (new QueryBuilder(this)).false();
  }
  family() {
    return (new QueryBuilder(this)).family();
  }
  fetch(...args: Parameters<OverrideQueryBuilder["fetch"]>) {
    return (new QueryBuilder(this)).fetch(...args);
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
  firstValue(...args: Parameters<OverrideQueryBuilder["firstValue"]>) {
    return (new QueryBuilder(this)).firstValue(...args);
  }
  flag() {
    return (new QueryBuilder(this)).flag();
  }
  float() {
    return (new QueryBuilder(this)).float();
  }
  floor(...args: Parameters<OverrideQueryBuilder["floor"]>) {
    return (new QueryBuilder(this)).floor(...args);
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
  format(...args: Parameters<OverrideQueryBuilder["format"]>) {
    return (new QueryBuilder(this)).format(...args);
  }
  formatType(...args: Parameters<OverrideQueryBuilder["formatType"]>) {
    return (new QueryBuilder(this)).formatType(...args);
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
  from(...args: Parameters<OverrideQueryBuilder["from"]>) {
    return (new QueryBuilder(this)).from(...args);
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
  fullJoin(...args: Parameters<OverrideQueryBuilder["fullJoin"]>) {
    return (new QueryBuilder(this)).fullJoin(...args);
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
  gamma(...args: Parameters<OverrideQueryBuilder["gamma"]>) {
    return (new QueryBuilder(this)).gamma(...args);
  }
  gcd(...args: Parameters<OverrideQueryBuilder["gcd"]>) {
    return (new QueryBuilder(this)).gcd(...args);
  }
  general() {
    return (new QueryBuilder(this)).general();
  }
  generated() {
    return (new QueryBuilder(this)).generated();
  }
  generateSeries(...args: Parameters<OverrideQueryBuilder["generateSeries"]>) {
    return (new QueryBuilder(this)).generateSeries(...args);
  }
  generateSubscripts(...args: Parameters<OverrideQueryBuilder["generateSubscripts"]>) {
    return (new QueryBuilder(this)).generateSubscripts(...args);
  }
  genRandomUuid(...args: Parameters<OverrideQueryBuilder["genRandomUuid"]>) {
    return (new QueryBuilder(this)).genRandomUuid(...args);
  }
  get() {
    return (new QueryBuilder(this)).get();
  }
  getBit(...args: Parameters<OverrideQueryBuilder["getBit"]>) {
    return (new QueryBuilder(this)).getBit(...args);
  }
  getByte(...args: Parameters<OverrideQueryBuilder["getByte"]>) {
    return (new QueryBuilder(this)).getByte(...args);
  }
  getCurrentTsConfig(...args: Parameters<OverrideQueryBuilder["getCurrentTsConfig"]>) {
    return (new QueryBuilder(this)).getCurrentTsConfig(...args);
  }
  ginCleanPendingList(...args: Parameters<OverrideQueryBuilder["ginCleanPendingList"]>) {
    return (new QueryBuilder(this)).ginCleanPendingList(...args);
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
  greatest(...args: Parameters<OverrideQueryBuilder["greatest"]>) {
    return (new QueryBuilder(this)).greatest(...args);
  }
  group() {
    return (new QueryBuilder(this)).group();
  }
  groupBy(...args: Parameters<OverrideQueryBuilder["groupBy"]>) {
    return (new QueryBuilder(this)).groupBy(...args);
  }
  grouping(...args: Parameters<OverrideQueryBuilder["grouping"]>) {
    return (new QueryBuilder(this)).grouping(...args);
  }
  groups() {
    return (new QueryBuilder(this)).groups();
  }
  handler() {
    return (new QueryBuilder(this)).handler();
  }
  hasAnyColumnPrivilege(...args: Parameters<OverrideQueryBuilder["hasAnyColumnPrivilege"]>) {
    return (new QueryBuilder(this)).hasAnyColumnPrivilege(...args);
  }
  hasColumnPrivilege(...args: Parameters<OverrideQueryBuilder["hasColumnPrivilege"]>) {
    return (new QueryBuilder(this)).hasColumnPrivilege(...args);
  }
  hasDatabasePrivilege(...args: Parameters<OverrideQueryBuilder["hasDatabasePrivilege"]>) {
    return (new QueryBuilder(this)).hasDatabasePrivilege(...args);
  }
  hasFunctionPrivilege(...args: Parameters<OverrideQueryBuilder["hasFunctionPrivilege"]>) {
    return (new QueryBuilder(this)).hasFunctionPrivilege(...args);
  }
  hasLanguagePrivilege(...args: Parameters<OverrideQueryBuilder["hasLanguagePrivilege"]>) {
    return (new QueryBuilder(this)).hasLanguagePrivilege(...args);
  }
  hasLargeobjectPrivilege(...args: Parameters<OverrideQueryBuilder["hasLargeobjectPrivilege"]>) {
    return (new QueryBuilder(this)).hasLargeobjectPrivilege(...args);
  }
  hasParameterPrivilege(...args: Parameters<OverrideQueryBuilder["hasParameterPrivilege"]>) {
    return (new QueryBuilder(this)).hasParameterPrivilege(...args);
  }
  hasSchemaPrivilege(...args: Parameters<OverrideQueryBuilder["hasSchemaPrivilege"]>) {
    return (new QueryBuilder(this)).hasSchemaPrivilege(...args);
  }
  hasSequencePrivilege(...args: Parameters<OverrideQueryBuilder["hasSequencePrivilege"]>) {
    return (new QueryBuilder(this)).hasSequencePrivilege(...args);
  }
  hasServerPrivilege(...args: Parameters<OverrideQueryBuilder["hasServerPrivilege"]>) {
    return (new QueryBuilder(this)).hasServerPrivilege(...args);
  }
  hasTablePrivilege(...args: Parameters<OverrideQueryBuilder["hasTablePrivilege"]>) {
    return (new QueryBuilder(this)).hasTablePrivilege(...args);
  }
  hasTablespacePrivilege(...args: Parameters<OverrideQueryBuilder["hasTablespacePrivilege"]>) {
    return (new QueryBuilder(this)).hasTablespacePrivilege(...args);
  }
  hasTypePrivilege(...args: Parameters<OverrideQueryBuilder["hasTypePrivilege"]>) {
    return (new QueryBuilder(this)).hasTypePrivilege(...args);
  }
  having(...args: Parameters<OverrideQueryBuilder["having"]>) {
    return (new QueryBuilder(this)).having(...args);
  }
  header() {
    return (new QueryBuilder(this)).header();
  }
  height(...args: Parameters<OverrideQueryBuilder["height"]>) {
    return (new QueryBuilder(this)).height(...args);
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
  host(...args: Parameters<OverrideQueryBuilder["host"]>) {
    return (new QueryBuilder(this)).host(...args);
  }
  hostmask(...args: Parameters<OverrideQueryBuilder["hostmask"]>) {
    return (new QueryBuilder(this)).hostmask(...args);
  }
  hour() {
    return (new QueryBuilder(this)).hour();
  }
  i(...args: Parameters<BaseRawQueryBuilder["i"]>) {
    return (new QueryBuilder(this)).i(...args);
  }
  icuUnicodeVersion(...args: Parameters<OverrideQueryBuilder["icuUnicodeVersion"]>) {
    return (new QueryBuilder(this)).icuUnicodeVersion(...args);
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
  ilike() {
    return (new QueryBuilder(this)).ilike();
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
  in(...args: Parameters<OverrideQueryBuilder["in"]>) {
    return (new QueryBuilder(this)).in(...args);
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
  inetClientAddr(...args: Parameters<OverrideQueryBuilder["inetClientAddr"]>) {
    return (new QueryBuilder(this)).inetClientAddr(...args);
  }
  inetClientPort(...args: Parameters<OverrideQueryBuilder["inetClientPort"]>) {
    return (new QueryBuilder(this)).inetClientPort(...args);
  }
  inetMerge(...args: Parameters<OverrideQueryBuilder["inetMerge"]>) {
    return (new QueryBuilder(this)).inetMerge(...args);
  }
  inetSameFamily(...args: Parameters<OverrideQueryBuilder["inetSameFamily"]>) {
    return (new QueryBuilder(this)).inetSameFamily(...args);
  }
  inetServerAddr(...args: Parameters<OverrideQueryBuilder["inetServerAddr"]>) {
    return (new QueryBuilder(this)).inetServerAddr(...args);
  }
  inetServerPort(...args: Parameters<OverrideQueryBuilder["inetServerPort"]>) {
    return (new QueryBuilder(this)).inetServerPort(...args);
  }
  inherit() {
    return (new QueryBuilder(this)).inherit();
  }
  inherits() {
    return (new QueryBuilder(this)).inherits();
  }
  initcap(...args: Parameters<OverrideQueryBuilder["initcap"]>) {
    return (new QueryBuilder(this)).initcap(...args);
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
  innerJoin(...args: Parameters<OverrideQueryBuilder["innerJoin"]>) {
    return (new QueryBuilder(this)).innerJoin(...args);
  }
  innerJoinLateral(...args: Parameters<OverrideQueryBuilder["innerJoinLateral"]>) {
    return (new QueryBuilder(this)).innerJoinLateral(...args);
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
  insert(...args: Parameters<OverrideQueryBuilder["insert"]>) {
    return (new QueryBuilder(this)).insert(...args);
  }
  insertInto(...args: Parameters<OverrideQueryBuilder["insertInto"]>) {
    return (new QueryBuilder(this)).insertInto(...args);
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
  intersect(...args: Parameters<OverrideQueryBuilder["intersect"]>) {
    return (new QueryBuilder(this)).intersect(...args);
  }
  intersectAll(...args: Parameters<OverrideQueryBuilder["intersectAll"]>) {
    return (new QueryBuilder(this)).intersectAll(...args);
  }
  intersection() {
    return (new QueryBuilder(this)).intersection();
  }
  interval() {
    return (new QueryBuilder(this)).interval();
  }
  into() {
    return (new QueryBuilder(this)).into();
  }
  invoker() {
    return (new QueryBuilder(this)).invoker();
  }
  is() {
    return (new QueryBuilder(this)).is();
  }
  isclosed(...args: Parameters<OverrideQueryBuilder["isclosed"]>) {
    return (new QueryBuilder(this)).isclosed(...args);
  }
  isDocument(...args: Parameters<OverrideQueryBuilder["isDocument"]>) {
    return (new QueryBuilder(this)).isDocument(...args);
  }
  isempty(...args: Parameters<OverrideQueryBuilder["isempty"]>) {
    return (new QueryBuilder(this)).isempty(...args);
  }
  isfinite(...args: Parameters<OverrideQueryBuilder["isfinite"]>) {
    return (new QueryBuilder(this)).isfinite(...args);
  }
  isnull() {
    return (new QueryBuilder(this)).isnull();
  }
  isolation() {
    return (new QueryBuilder(this)).isolation();
  }
  isopen(...args: Parameters<OverrideQueryBuilder["isopen"]>) {
    return (new QueryBuilder(this)).isopen(...args);
  }
  join() {
    return (new QueryBuilder(this)).join();
  }
  json() {
    return (new QueryBuilder(this)).json();
  }
  jsonAgg(...args: Parameters<OverrideQueryBuilder["jsonAgg"]>) {
    return (new QueryBuilder(this)).jsonAgg(...args);
  }
  jsonAggStrict(...args: Parameters<OverrideQueryBuilder["jsonAggStrict"]>) {
    return (new QueryBuilder(this)).jsonAggStrict(...args);
  }
  jsonArray() {
    return (new QueryBuilder(this)).jsonArray();
  }
  jsonArrayagg(...args: Parameters<OverrideQueryBuilder["jsonArrayagg"]>) {
    return (new QueryBuilder(this)).jsonArrayagg(...args);
  }
  jsonArrayElements(...args: Parameters<OverrideQueryBuilder["jsonArrayElements"]>) {
    return (new QueryBuilder(this)).jsonArrayElements(...args);
  }
  jsonArrayElementsText(...args: Parameters<OverrideQueryBuilder["jsonArrayElementsText"]>) {
    return (new QueryBuilder(this)).jsonArrayElementsText(...args);
  }
  jsonArrayLength(...args: Parameters<OverrideQueryBuilder["jsonArrayLength"]>) {
    return (new QueryBuilder(this)).jsonArrayLength(...args);
  }
  jsonbAgg(...args: Parameters<OverrideQueryBuilder["jsonbAgg"]>) {
    return (new QueryBuilder(this)).jsonbAgg(...args);
  }
  jsonbAggStrict(...args: Parameters<OverrideQueryBuilder["jsonbAggStrict"]>) {
    return (new QueryBuilder(this)).jsonbAggStrict(...args);
  }
  jsonbArrayElements(...args: Parameters<OverrideQueryBuilder["jsonbArrayElements"]>) {
    return (new QueryBuilder(this)).jsonbArrayElements(...args);
  }
  jsonbArrayElementsText(...args: Parameters<OverrideQueryBuilder["jsonbArrayElementsText"]>) {
    return (new QueryBuilder(this)).jsonbArrayElementsText(...args);
  }
  jsonbArrayLength(...args: Parameters<OverrideQueryBuilder["jsonbArrayLength"]>) {
    return (new QueryBuilder(this)).jsonbArrayLength(...args);
  }
  jsonbBuildArray(...args: Parameters<OverrideQueryBuilder["jsonbBuildArray"]>) {
    return (new QueryBuilder(this)).jsonbBuildArray(...args);
  }
  jsonbBuildObject(...args: Parameters<OverrideQueryBuilder["jsonbBuildObject"]>) {
    return (new QueryBuilder(this)).jsonbBuildObject(...args);
  }
  jsonbEach(...args: Parameters<OverrideQueryBuilder["jsonbEach"]>) {
    return (new QueryBuilder(this)).jsonbEach(...args);
  }
  jsonbEachText(...args: Parameters<OverrideQueryBuilder["jsonbEachText"]>) {
    return (new QueryBuilder(this)).jsonbEachText(...args);
  }
  jsonbExtractPath(...args: Parameters<OverrideQueryBuilder["jsonbExtractPath"]>) {
    return (new QueryBuilder(this)).jsonbExtractPath(...args);
  }
  jsonbExtractPathText(...args: Parameters<OverrideQueryBuilder["jsonbExtractPathText"]>) {
    return (new QueryBuilder(this)).jsonbExtractPathText(...args);
  }
  jsonbInsert(...args: Parameters<OverrideQueryBuilder["jsonbInsert"]>) {
    return (new QueryBuilder(this)).jsonbInsert(...args);
  }
  jsonbObjectAgg(...args: Parameters<OverrideQueryBuilder["jsonbObjectAgg"]>) {
    return (new QueryBuilder(this)).jsonbObjectAgg(...args);
  }
  jsonbObjectAggStrict(...args: Parameters<OverrideQueryBuilder["jsonbObjectAggStrict"]>) {
    return (new QueryBuilder(this)).jsonbObjectAggStrict(...args);
  }
  jsonbObjectAggUnique(...args: Parameters<OverrideQueryBuilder["jsonbObjectAggUnique"]>) {
    return (new QueryBuilder(this)).jsonbObjectAggUnique(...args);
  }
  jsonbObjectAggUniqueStrict(...args: Parameters<OverrideQueryBuilder["jsonbObjectAggUniqueStrict"]>) {
    return (new QueryBuilder(this)).jsonbObjectAggUniqueStrict(...args);
  }
  jsonbObjectFromArray(...args: Parameters<OverrideQueryBuilder["jsonbObjectFromArray"]>) {
    return (new QueryBuilder(this)).jsonbObjectFromArray(...args);
  }
  jsonbObjectFromPairs(...args: Parameters<OverrideQueryBuilder["jsonbObjectFromPairs"]>) {
    return (new QueryBuilder(this)).jsonbObjectFromPairs(...args);
  }
  jsonbObjectKeys(...args: Parameters<OverrideQueryBuilder["jsonbObjectKeys"]>) {
    return (new QueryBuilder(this)).jsonbObjectKeys(...args);
  }
  jsonbPathExists(...args: Parameters<OverrideQueryBuilder["jsonbPathExists"]>) {
    return (new QueryBuilder(this)).jsonbPathExists(...args);
  }
  jsonbPathExistsTz(...args: Parameters<OverrideQueryBuilder["jsonbPathExistsTz"]>) {
    return (new QueryBuilder(this)).jsonbPathExistsTz(...args);
  }
  jsonbPathMatch(...args: Parameters<OverrideQueryBuilder["jsonbPathMatch"]>) {
    return (new QueryBuilder(this)).jsonbPathMatch(...args);
  }
  jsonbPathMatchTz(...args: Parameters<OverrideQueryBuilder["jsonbPathMatchTz"]>) {
    return (new QueryBuilder(this)).jsonbPathMatchTz(...args);
  }
  jsonbPathQuery(...args: Parameters<OverrideQueryBuilder["jsonbPathQuery"]>) {
    return (new QueryBuilder(this)).jsonbPathQuery(...args);
  }
  jsonbPathQueryArray(...args: Parameters<OverrideQueryBuilder["jsonbPathQueryArray"]>) {
    return (new QueryBuilder(this)).jsonbPathQueryArray(...args);
  }
  jsonbPathQueryArrayTz(...args: Parameters<OverrideQueryBuilder["jsonbPathQueryArrayTz"]>) {
    return (new QueryBuilder(this)).jsonbPathQueryArrayTz(...args);
  }
  jsonbPathQueryFirst(...args: Parameters<OverrideQueryBuilder["jsonbPathQueryFirst"]>) {
    return (new QueryBuilder(this)).jsonbPathQueryFirst(...args);
  }
  jsonbPathQueryFirstTz(...args: Parameters<OverrideQueryBuilder["jsonbPathQueryFirstTz"]>) {
    return (new QueryBuilder(this)).jsonbPathQueryFirstTz(...args);
  }
  jsonbPathQueryTz(...args: Parameters<OverrideQueryBuilder["jsonbPathQueryTz"]>) {
    return (new QueryBuilder(this)).jsonbPathQueryTz(...args);
  }
  jsonbPopulateRecord(...args: Parameters<OverrideQueryBuilder["jsonbPopulateRecord"]>) {
    return (new QueryBuilder(this)).jsonbPopulateRecord(...args);
  }
  jsonbPopulateRecordset(...args: Parameters<OverrideQueryBuilder["jsonbPopulateRecordset"]>) {
    return (new QueryBuilder(this)).jsonbPopulateRecordset(...args);
  }
  jsonbPopulateRecordValid(...args: Parameters<OverrideQueryBuilder["jsonbPopulateRecordValid"]>) {
    return (new QueryBuilder(this)).jsonbPopulateRecordValid(...args);
  }
  jsonbPretty(...args: Parameters<OverrideQueryBuilder["jsonbPretty"]>) {
    return (new QueryBuilder(this)).jsonbPretty(...args);
  }
  jsonbSet(...args: Parameters<OverrideQueryBuilder["jsonbSet"]>) {
    return (new QueryBuilder(this)).jsonbSet(...args);
  }
  jsonbSetLax(...args: Parameters<OverrideQueryBuilder["jsonbSetLax"]>) {
    return (new QueryBuilder(this)).jsonbSetLax(...args);
  }
  jsonbStripNulls(...args: Parameters<OverrideQueryBuilder["jsonbStripNulls"]>) {
    return (new QueryBuilder(this)).jsonbStripNulls(...args);
  }
  jsonbToRecord(...args: Parameters<OverrideQueryBuilder["jsonbToRecord"]>) {
    return (new QueryBuilder(this)).jsonbToRecord(...args);
  }
  jsonbToRecordset(...args: Parameters<OverrideQueryBuilder["jsonbToRecordset"]>) {
    return (new QueryBuilder(this)).jsonbToRecordset(...args);
  }
  jsonbToTsvector(...args: Parameters<OverrideQueryBuilder["jsonbToTsvector"]>) {
    return (new QueryBuilder(this)).jsonbToTsvector(...args);
  }
  jsonbTypeof(...args: Parameters<OverrideQueryBuilder["jsonbTypeof"]>) {
    return (new QueryBuilder(this)).jsonbTypeof(...args);
  }
  jsonBuildArray(...args: Parameters<OverrideQueryBuilder["jsonBuildArray"]>) {
    return (new QueryBuilder(this)).jsonBuildArray(...args);
  }
  jsonBuildObject(...args: Parameters<OverrideQueryBuilder["jsonBuildObject"]>) {
    return (new QueryBuilder(this)).jsonBuildObject(...args);
  }
  jsonEach(...args: Parameters<OverrideQueryBuilder["jsonEach"]>) {
    return (new QueryBuilder(this)).jsonEach(...args);
  }
  jsonEachText(...args: Parameters<OverrideQueryBuilder["jsonEachText"]>) {
    return (new QueryBuilder(this)).jsonEachText(...args);
  }
  jsonExists() {
    return (new QueryBuilder(this)).jsonExists();
  }
  jsonExtractPath(...args: Parameters<OverrideQueryBuilder["jsonExtractPath"]>) {
    return (new QueryBuilder(this)).jsonExtractPath(...args);
  }
  jsonExtractPathText(...args: Parameters<OverrideQueryBuilder["jsonExtractPathText"]>) {
    return (new QueryBuilder(this)).jsonExtractPathText(...args);
  }
  jsonObject() {
    return (new QueryBuilder(this)).jsonObject();
  }
  jsonObjectagg(...args: Parameters<OverrideQueryBuilder["jsonObjectagg"]>) {
    return (new QueryBuilder(this)).jsonObjectagg(...args);
  }
  jsonObjectAgg(...args: Parameters<OverrideQueryBuilder["jsonObjectAgg"]>) {
    return (new QueryBuilder(this)).jsonObjectAgg(...args);
  }
  jsonObjectAggStrict(...args: Parameters<OverrideQueryBuilder["jsonObjectAggStrict"]>) {
    return (new QueryBuilder(this)).jsonObjectAggStrict(...args);
  }
  jsonObjectAggUnique(...args: Parameters<OverrideQueryBuilder["jsonObjectAggUnique"]>) {
    return (new QueryBuilder(this)).jsonObjectAggUnique(...args);
  }
  jsonObjectAggUniqueStrict(...args: Parameters<OverrideQueryBuilder["jsonObjectAggUniqueStrict"]>) {
    return (new QueryBuilder(this)).jsonObjectAggUniqueStrict(...args);
  }
  jsonObjectFromArray(...args: Parameters<OverrideQueryBuilder["jsonObjectFromArray"]>) {
    return (new QueryBuilder(this)).jsonObjectFromArray(...args);
  }
  jsonObjectFromPairs(...args: Parameters<OverrideQueryBuilder["jsonObjectFromPairs"]>) {
    return (new QueryBuilder(this)).jsonObjectFromPairs(...args);
  }
  jsonObjectKeys(...args: Parameters<OverrideQueryBuilder["jsonObjectKeys"]>) {
    return (new QueryBuilder(this)).jsonObjectKeys(...args);
  }
  jsonPopulateRecord(...args: Parameters<OverrideQueryBuilder["jsonPopulateRecord"]>) {
    return (new QueryBuilder(this)).jsonPopulateRecord(...args);
  }
  jsonPopulateRecordset(...args: Parameters<OverrideQueryBuilder["jsonPopulateRecordset"]>) {
    return (new QueryBuilder(this)).jsonPopulateRecordset(...args);
  }
  jsonQuery() {
    return (new QueryBuilder(this)).jsonQuery();
  }
  jsonScalar() {
    return (new QueryBuilder(this)).jsonScalar();
  }
  jsonSerialize() {
    return (new QueryBuilder(this)).jsonSerialize();
  }
  jsonStripNulls(...args: Parameters<OverrideQueryBuilder["jsonStripNulls"]>) {
    return (new QueryBuilder(this)).jsonStripNulls(...args);
  }
  jsonTable() {
    return (new QueryBuilder(this)).jsonTable();
  }
  jsonTablePrimitive() {
    return (new QueryBuilder(this)).jsonTablePrimitive();
  }
  jsonToRecord(...args: Parameters<OverrideQueryBuilder["jsonToRecord"]>) {
    return (new QueryBuilder(this)).jsonToRecord(...args);
  }
  jsonToRecordset(...args: Parameters<OverrideQueryBuilder["jsonToRecordset"]>) {
    return (new QueryBuilder(this)).jsonToRecordset(...args);
  }
  jsonToTsvector(...args: Parameters<OverrideQueryBuilder["jsonToTsvector"]>) {
    return (new QueryBuilder(this)).jsonToTsvector(...args);
  }
  jsonTypeof(...args: Parameters<OverrideQueryBuilder["jsonTypeof"]>) {
    return (new QueryBuilder(this)).jsonTypeof(...args);
  }
  jsonValue() {
    return (new QueryBuilder(this)).jsonValue();
  }
  justifyDays(...args: Parameters<OverrideQueryBuilder["justifyDays"]>) {
    return (new QueryBuilder(this)).justifyDays(...args);
  }
  justifyHours(...args: Parameters<OverrideQueryBuilder["justifyHours"]>) {
    return (new QueryBuilder(this)).justifyHours(...args);
  }
  justifyInterval(...args: Parameters<OverrideQueryBuilder["justifyInterval"]>) {
    return (new QueryBuilder(this)).justifyInterval(...args);
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
  lag(...args: Parameters<OverrideQueryBuilder["lag"]>) {
    return (new QueryBuilder(this)).lag(...args);
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
  lastval(...args: Parameters<OverrideQueryBuilder["lastval"]>) {
    return (new QueryBuilder(this)).lastval(...args);
  }
  lastValue(...args: Parameters<OverrideQueryBuilder["lastValue"]>) {
    return (new QueryBuilder(this)).lastValue(...args);
  }
  lateral() {
    return (new QueryBuilder(this)).lateral();
  }
  lcm(...args: Parameters<OverrideQueryBuilder["lcm"]>) {
    return (new QueryBuilder(this)).lcm(...args);
  }
  lead(...args: Parameters<OverrideQueryBuilder["lead"]>) {
    return (new QueryBuilder(this)).lead(...args);
  }
  leading() {
    return (new QueryBuilder(this)).leading();
  }
  leakproof() {
    return (new QueryBuilder(this)).leakproof();
  }
  least(...args: Parameters<OverrideQueryBuilder["least"]>) {
    return (new QueryBuilder(this)).least(...args);
  }
  left(...args: Parameters<OverrideQueryBuilder["left"]>) {
    return (new QueryBuilder(this)).left(...args);
  }
  leftJoin(...args: Parameters<OverrideQueryBuilder["leftJoin"]>) {
    return (new QueryBuilder(this)).leftJoin(...args);
  }
  leftJoinLateral(...args: Parameters<OverrideQueryBuilder["leftJoinLateral"]>) {
    return (new QueryBuilder(this)).leftJoinLateral(...args);
  }
  length(...args: Parameters<OverrideQueryBuilder["length"]>) {
    return (new QueryBuilder(this)).length(...args);
  }
  level() {
    return (new QueryBuilder(this)).level();
  }
  lgamma(...args: Parameters<OverrideQueryBuilder["lgamma"]>) {
    return (new QueryBuilder(this)).lgamma(...args);
  }
  library() {
    return (new QueryBuilder(this)).library();
  }
  like() {
    return (new QueryBuilder(this)).like();
  }
  likeRegex() {
    return (new QueryBuilder(this)).likeRegex();
  }
  limit(...args: Parameters<OverrideQueryBuilder["limit"]>) {
    return (new QueryBuilder(this)).limit(...args);
  }
  line(...args: Parameters<OverrideQueryBuilder["line"]>) {
    return (new QueryBuilder(this)).line(...args);
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
  ln(...args: Parameters<OverrideQueryBuilder["ln"]>) {
    return (new QueryBuilder(this)).ln(...args);
  }
  load() {
    return (new QueryBuilder(this)).load();
  }
  local() {
    return (new QueryBuilder(this)).local();
  }
  localtime(...args: Parameters<OverrideQueryBuilder["localtime"]>) {
    return (new QueryBuilder(this)).localtime(...args);
  }
  localtimestamp(...args: Parameters<OverrideQueryBuilder["localtimestamp"]>) {
    return (new QueryBuilder(this)).localtimestamp(...args);
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
  log(...args: Parameters<OverrideQueryBuilder["log"]>) {
    return (new QueryBuilder(this)).log(...args);
  }
  log10(...args: Parameters<OverrideQueryBuilder["log10"]>) {
    return (new QueryBuilder(this)).log10(...args);
  }
  logged() {
    return (new QueryBuilder(this)).logged();
  }
  lower(...args: Parameters<OverrideQueryBuilder["lower"]>) {
    return (new QueryBuilder(this)).lower(...args);
  }
  lowerInc(...args: Parameters<OverrideQueryBuilder["lowerInc"]>) {
    return (new QueryBuilder(this)).lowerInc(...args);
  }
  lowerInf(...args: Parameters<OverrideQueryBuilder["lowerInf"]>) {
    return (new QueryBuilder(this)).lowerInf(...args);
  }
  lpad(...args: Parameters<OverrideQueryBuilder["lpad"]>) {
    return (new QueryBuilder(this)).lpad(...args);
  }
  lseg(...args: Parameters<OverrideQueryBuilder["lseg"]>) {
    return (new QueryBuilder(this)).lseg(...args);
  }
  ltrim(...args: Parameters<OverrideQueryBuilder["ltrim"]>) {
    return (new QueryBuilder(this)).ltrim(...args);
  }
  m() {
    return (new QueryBuilder(this)).m();
  }
  macaddr8Set7bit(...args: Parameters<OverrideQueryBuilder["macaddr8Set7bit"]>) {
    return (new QueryBuilder(this)).macaddr8Set7bit(...args);
  }
  macaddr8Trunc(...args: Parameters<OverrideQueryBuilder["macaddr8Trunc"]>) {
    return (new QueryBuilder(this)).macaddr8Trunc(...args);
  }
  macaddrTrunc(...args: Parameters<OverrideQueryBuilder["macaddrTrunc"]>) {
    return (new QueryBuilder(this)).macaddrTrunc(...args);
  }
  makeaclitem(...args: Parameters<OverrideQueryBuilder["makeaclitem"]>) {
    return (new QueryBuilder(this)).makeaclitem(...args);
  }
  makeDate(...args: Parameters<OverrideQueryBuilder["makeDate"]>) {
    return (new QueryBuilder(this)).makeDate(...args);
  }
  makeInterval(...args: Parameters<OverrideQueryBuilder["makeInterval"]>) {
    return (new QueryBuilder(this)).makeInterval(...args);
  }
  makeTime(...args: Parameters<OverrideQueryBuilder["makeTime"]>) {
    return (new QueryBuilder(this)).makeTime(...args);
  }
  makeTimestamp(...args: Parameters<OverrideQueryBuilder["makeTimestamp"]>) {
    return (new QueryBuilder(this)).makeTimestamp(...args);
  }
  makeTimestamptz(...args: Parameters<OverrideQueryBuilder["makeTimestamptz"]>) {
    return (new QueryBuilder(this)).makeTimestamptz(...args);
  }
  map() {
    return (new QueryBuilder(this)).map();
  }
  mapping() {
    return (new QueryBuilder(this)).mapping();
  }
  masklen(...args: Parameters<OverrideQueryBuilder["masklen"]>) {
    return (new QueryBuilder(this)).masklen(...args);
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
  materialized() {
    return (new QueryBuilder(this)).materialized();
  }
  max(...args: Parameters<OverrideQueryBuilder["max"]>) {
    return (new QueryBuilder(this)).max(...args);
  }
  maxvalue() {
    return (new QueryBuilder(this)).maxvalue();
  }
  md5(...args: Parameters<OverrideQueryBuilder["md5"]>) {
    return (new QueryBuilder(this)).md5(...args);
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
  mergeAction(...args: Parameters<OverrideQueryBuilder["mergeAction"]>) {
    return (new QueryBuilder(this)).mergeAction(...args);
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
  min(...args: Parameters<OverrideQueryBuilder["min"]>) {
    return (new QueryBuilder(this)).min(...args);
  }
  minScale(...args: Parameters<OverrideQueryBuilder["minScale"]>) {
    return (new QueryBuilder(this)).minScale(...args);
  }
  minute() {
    return (new QueryBuilder(this)).minute();
  }
  minvalue() {
    return (new QueryBuilder(this)).minvalue();
  }
  mod(...args: Parameters<OverrideQueryBuilder["mod"]>) {
    return (new QueryBuilder(this)).mod(...args);
  }
  mode(...args: Parameters<OverrideQueryBuilder["mode"]>) {
    return (new QueryBuilder(this)).mode(...args);
  }
  modifies() {
    return (new QueryBuilder(this)).modifies();
  }
  module() {
    return (new QueryBuilder(this)).module();
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
  multirange(...args: Parameters<OverrideQueryBuilder["multirange"]>) {
    return (new QueryBuilder(this)).multirange(...args);
  }
  multirangeIsempty(...args: Parameters<OverrideQueryBuilder["multirangeIsempty"]>) {
    return (new QueryBuilder(this)).multirangeIsempty(...args);
  }
  multirangeLower(...args: Parameters<OverrideQueryBuilder["multirangeLower"]>) {
    return (new QueryBuilder(this)).multirangeLower(...args);
  }
  multirangeLowerInc(...args: Parameters<OverrideQueryBuilder["multirangeLowerInc"]>) {
    return (new QueryBuilder(this)).multirangeLowerInc(...args);
  }
  multirangeLowerInf(...args: Parameters<OverrideQueryBuilder["multirangeLowerInf"]>) {
    return (new QueryBuilder(this)).multirangeLowerInf(...args);
  }
  multirangeRangeMerge(...args: Parameters<OverrideQueryBuilder["multirangeRangeMerge"]>) {
    return (new QueryBuilder(this)).multirangeRangeMerge(...args);
  }
  multirangeUpper(...args: Parameters<OverrideQueryBuilder["multirangeUpper"]>) {
    return (new QueryBuilder(this)).multirangeUpper(...args);
  }
  multirangeUpperInc(...args: Parameters<OverrideQueryBuilder["multirangeUpperInc"]>) {
    return (new QueryBuilder(this)).multirangeUpperInc(...args);
  }
  multirangeUpperInf(...args: Parameters<OverrideQueryBuilder["multirangeUpperInf"]>) {
    return (new QueryBuilder(this)).multirangeUpperInf(...args);
  }
  multiset() {
    return (new QueryBuilder(this)).multiset();
  }
  mumps() {
    return (new QueryBuilder(this)).mumps();
  }
  mxidAge(...args: Parameters<OverrideQueryBuilder["mxidAge"]>) {
    return (new QueryBuilder(this)).mxidAge(...args);
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
  nchar() {
    return (new QueryBuilder(this)).nchar();
  }
  nclob() {
    return (new QueryBuilder(this)).nclob();
  }
  nested() {
    return (new QueryBuilder(this)).nested();
  }
  nesting() {
    return (new QueryBuilder(this)).nesting();
  }
  netmask(...args: Parameters<OverrideQueryBuilder["netmask"]>) {
    return (new QueryBuilder(this)).netmask(...args);
  }
  network(...args: Parameters<OverrideQueryBuilder["network"]>) {
    return (new QueryBuilder(this)).network(...args);
  }
  new() {
    return (new QueryBuilder(this)).new();
  }
  next() {
    return (new QueryBuilder(this)).next();
  }
  nextval(...args: Parameters<OverrideQueryBuilder["nextval"]>) {
    return (new QueryBuilder(this)).nextval(...args);
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
  normalize(...args: Parameters<OverrideQueryBuilder["normalize"]>) {
    return (new QueryBuilder(this)).normalize(...args);
  }
  normalized() {
    return (new QueryBuilder(this)).normalized();
  }
  not() {
    return (new QueryBuilder(this)).not();
  }
  notExists(...args: Parameters<OverrideQueryBuilder["notExists"]>) {
    return (new QueryBuilder(this)).notExists(...args);
  }
  nothing() {
    return (new QueryBuilder(this)).nothing();
  }
  notify() {
    return (new QueryBuilder(this)).notify();
  }
  notIn(...args: Parameters<OverrideQueryBuilder["notIn"]>) {
    return (new QueryBuilder(this)).notIn(...args);
  }
  notnull() {
    return (new QueryBuilder(this)).notnull();
  }
  now(...args: Parameters<OverrideQueryBuilder["now"]>) {
    return (new QueryBuilder(this)).now(...args);
  }
  nowait() {
    return (new QueryBuilder(this)).nowait();
  }
  npoints(...args: Parameters<OverrideQueryBuilder["npoints"]>) {
    return (new QueryBuilder(this)).npoints(...args);
  }
  nthValue(...args: Parameters<OverrideQueryBuilder["nthValue"]>) {
    return (new QueryBuilder(this)).nthValue(...args);
  }
  ntile(...args: Parameters<OverrideQueryBuilder["ntile"]>) {
    return (new QueryBuilder(this)).ntile(...args);
  }
  null() {
    return (new QueryBuilder(this)).null();
  }
  nullable() {
    return (new QueryBuilder(this)).nullable();
  }
  nullif(...args: Parameters<OverrideQueryBuilder["nullif"]>) {
    return (new QueryBuilder(this)).nullif(...args);
  }
  nullOrdering() {
    return (new QueryBuilder(this)).nullOrdering();
  }
  nulls() {
    return (new QueryBuilder(this)).nulls();
  }
  number() {
    return (new QueryBuilder(this)).number();
  }
  numeric() {
    return (new QueryBuilder(this)).numeric();
  }
  numnode(...args: Parameters<OverrideQueryBuilder["numnode"]>) {
    return (new QueryBuilder(this)).numnode(...args);
  }
  objDescription(...args: Parameters<OverrideQueryBuilder["objDescription"]>) {
    return (new QueryBuilder(this)).objDescription(...args);
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
  octetLength(...args: Parameters<OverrideQueryBuilder["octetLength"]>) {
    return (new QueryBuilder(this)).octetLength(...args);
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
  offset(...args: Parameters<OverrideQueryBuilder["offset"]>) {
    return (new QueryBuilder(this)).offset(...args);
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
  on() {
    return (new QueryBuilder(this)).on();
  }
  onConflictDoNothing(...args: Parameters<OverrideQueryBuilder["onConflictDoNothing"]>) {
    return (new QueryBuilder(this)).onConflictDoNothing(...args);
  }
  onConflictDoUpdate(...args: Parameters<OverrideQueryBuilder["onConflictDoUpdate"]>) {
    return (new QueryBuilder(this)).onConflictDoUpdate(...args);
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
  or(...args: Parameters<OverrideQueryBuilder["or"]>) {
    return (new QueryBuilder(this)).or(...args);
  }
  order() {
    return (new QueryBuilder(this)).order();
  }
  orderBy(...args: Parameters<OverrideQueryBuilder["orderBy"]>) {
    return (new QueryBuilder(this)).orderBy(...args);
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
  over() {
    return (new QueryBuilder(this)).over();
  }
  overflow() {
    return (new QueryBuilder(this)).overflow();
  }
  overlaps() {
    return (new QueryBuilder(this)).overlaps();
  }
  overlay(...args: Parameters<OverrideQueryBuilder["overlay"]>) {
    return (new QueryBuilder(this)).overlay(...args);
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
  parseIdent(...args: Parameters<OverrideQueryBuilder["parseIdent"]>) {
    return (new QueryBuilder(this)).parseIdent(...args);
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
  path(...args: Parameters<OverrideQueryBuilder["path"]>) {
    return (new QueryBuilder(this)).path(...args);
  }
  pattern() {
    return (new QueryBuilder(this)).pattern();
  }
  pclose(...args: Parameters<OverrideQueryBuilder["pclose"]>) {
    return (new QueryBuilder(this)).pclose(...args);
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
  percentileCont(...args: Parameters<OverrideQueryBuilder["percentileCont"]>) {
    return (new QueryBuilder(this)).percentileCont(...args);
  }
  percentileDisc(...args: Parameters<OverrideQueryBuilder["percentileDisc"]>) {
    return (new QueryBuilder(this)).percentileDisc(...args);
  }
  percentRank(...args: Parameters<OverrideQueryBuilder["percentRank"]>) {
    return (new QueryBuilder(this)).percentRank(...args);
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
  pgAdvisoryLock(...args: Parameters<OverrideQueryBuilder["pgAdvisoryLock"]>) {
    return (new QueryBuilder(this)).pgAdvisoryLock(...args);
  }
  pgAdvisoryLockShared(...args: Parameters<OverrideQueryBuilder["pgAdvisoryLockShared"]>) {
    return (new QueryBuilder(this)).pgAdvisoryLockShared(...args);
  }
  pgAdvisoryUnlock(...args: Parameters<OverrideQueryBuilder["pgAdvisoryUnlock"]>) {
    return (new QueryBuilder(this)).pgAdvisoryUnlock(...args);
  }
  pgAdvisoryUnlockAll(...args: Parameters<OverrideQueryBuilder["pgAdvisoryUnlockAll"]>) {
    return (new QueryBuilder(this)).pgAdvisoryUnlockAll(...args);
  }
  pgAdvisoryUnlockShared(...args: Parameters<OverrideQueryBuilder["pgAdvisoryUnlockShared"]>) {
    return (new QueryBuilder(this)).pgAdvisoryUnlockShared(...args);
  }
  pgAdvisoryXactLock(...args: Parameters<OverrideQueryBuilder["pgAdvisoryXactLock"]>) {
    return (new QueryBuilder(this)).pgAdvisoryXactLock(...args);
  }
  pgAdvisoryXactLockShared(...args: Parameters<OverrideQueryBuilder["pgAdvisoryXactLockShared"]>) {
    return (new QueryBuilder(this)).pgAdvisoryXactLockShared(...args);
  }
  pgAvailableWalSummaries(...args: Parameters<OverrideQueryBuilder["pgAvailableWalSummaries"]>) {
    return (new QueryBuilder(this)).pgAvailableWalSummaries(...args);
  }
  pgBackendPid(...args: Parameters<OverrideQueryBuilder["pgBackendPid"]>) {
    return (new QueryBuilder(this)).pgBackendPid(...args);
  }
  pgBackupStart(...args: Parameters<OverrideQueryBuilder["pgBackupStart"]>) {
    return (new QueryBuilder(this)).pgBackupStart(...args);
  }
  pgBackupStop(...args: Parameters<OverrideQueryBuilder["pgBackupStop"]>) {
    return (new QueryBuilder(this)).pgBackupStop(...args);
  }
  pgBasetype(...args: Parameters<OverrideQueryBuilder["pgBasetype"]>) {
    return (new QueryBuilder(this)).pgBasetype(...args);
  }
  pgBlockingPids(...args: Parameters<OverrideQueryBuilder["pgBlockingPids"]>) {
    return (new QueryBuilder(this)).pgBlockingPids(...args);
  }
  pgCancelBackend(...args: Parameters<OverrideQueryBuilder["pgCancelBackend"]>) {
    return (new QueryBuilder(this)).pgCancelBackend(...args);
  }
  pgCharToEncoding(...args: Parameters<OverrideQueryBuilder["pgCharToEncoding"]>) {
    return (new QueryBuilder(this)).pgCharToEncoding(...args);
  }
  pgClientEncoding(...args: Parameters<OverrideQueryBuilder["pgClientEncoding"]>) {
    return (new QueryBuilder(this)).pgClientEncoding(...args);
  }
  pgCollationActualVersion(...args: Parameters<OverrideQueryBuilder["pgCollationActualVersion"]>) {
    return (new QueryBuilder(this)).pgCollationActualVersion(...args);
  }
  pgCollationIsVisible(...args: Parameters<OverrideQueryBuilder["pgCollationIsVisible"]>) {
    return (new QueryBuilder(this)).pgCollationIsVisible(...args);
  }
  pgColumnCompression(...args: Parameters<OverrideQueryBuilder["pgColumnCompression"]>) {
    return (new QueryBuilder(this)).pgColumnCompression(...args);
  }
  pgColumnSize(...args: Parameters<OverrideQueryBuilder["pgColumnSize"]>) {
    return (new QueryBuilder(this)).pgColumnSize(...args);
  }
  pgColumnToastChunkId(...args: Parameters<OverrideQueryBuilder["pgColumnToastChunkId"]>) {
    return (new QueryBuilder(this)).pgColumnToastChunkId(...args);
  }
  pgConfLoadTime(...args: Parameters<OverrideQueryBuilder["pgConfLoadTime"]>) {
    return (new QueryBuilder(this)).pgConfLoadTime(...args);
  }
  pgControlCheckpoint(...args: Parameters<OverrideQueryBuilder["pgControlCheckpoint"]>) {
    return (new QueryBuilder(this)).pgControlCheckpoint(...args);
  }
  pgControlInit(...args: Parameters<OverrideQueryBuilder["pgControlInit"]>) {
    return (new QueryBuilder(this)).pgControlInit(...args);
  }
  pgControlRecovery(...args: Parameters<OverrideQueryBuilder["pgControlRecovery"]>) {
    return (new QueryBuilder(this)).pgControlRecovery(...args);
  }
  pgControlSystem(...args: Parameters<OverrideQueryBuilder["pgControlSystem"]>) {
    return (new QueryBuilder(this)).pgControlSystem(...args);
  }
  pgConversionIsVisible(...args: Parameters<OverrideQueryBuilder["pgConversionIsVisible"]>) {
    return (new QueryBuilder(this)).pgConversionIsVisible(...args);
  }
  pgCopyLogicalReplicationSlot(...args: Parameters<OverrideQueryBuilder["pgCopyLogicalReplicationSlot"]>) {
    return (new QueryBuilder(this)).pgCopyLogicalReplicationSlot(...args);
  }
  pgCopyPhysicalReplicationSlot(...args: Parameters<OverrideQueryBuilder["pgCopyPhysicalReplicationSlot"]>) {
    return (new QueryBuilder(this)).pgCopyPhysicalReplicationSlot(...args);
  }
  pgCreateLogicalReplicationSlot(...args: Parameters<OverrideQueryBuilder["pgCreateLogicalReplicationSlot"]>) {
    return (new QueryBuilder(this)).pgCreateLogicalReplicationSlot(...args);
  }
  pgCreatePhysicalReplicationSlot(...args: Parameters<OverrideQueryBuilder["pgCreatePhysicalReplicationSlot"]>) {
    return (new QueryBuilder(this)).pgCreatePhysicalReplicationSlot(...args);
  }
  pgCreateRestorePoint(...args: Parameters<OverrideQueryBuilder["pgCreateRestorePoint"]>) {
    return (new QueryBuilder(this)).pgCreateRestorePoint(...args);
  }
  pgCurrentLogfile(...args: Parameters<OverrideQueryBuilder["pgCurrentLogfile"]>) {
    return (new QueryBuilder(this)).pgCurrentLogfile(...args);
  }
  pgCurrentSnapshot(...args: Parameters<OverrideQueryBuilder["pgCurrentSnapshot"]>) {
    return (new QueryBuilder(this)).pgCurrentSnapshot(...args);
  }
  pgCurrentWalFlushLsn(...args: Parameters<OverrideQueryBuilder["pgCurrentWalFlushLsn"]>) {
    return (new QueryBuilder(this)).pgCurrentWalFlushLsn(...args);
  }
  pgCurrentWalInsertLsn(...args: Parameters<OverrideQueryBuilder["pgCurrentWalInsertLsn"]>) {
    return (new QueryBuilder(this)).pgCurrentWalInsertLsn(...args);
  }
  pgCurrentWalLsn(...args: Parameters<OverrideQueryBuilder["pgCurrentWalLsn"]>) {
    return (new QueryBuilder(this)).pgCurrentWalLsn(...args);
  }
  pgCurrentXactId(...args: Parameters<OverrideQueryBuilder["pgCurrentXactId"]>) {
    return (new QueryBuilder(this)).pgCurrentXactId(...args);
  }
  pgCurrentXactIdIfAssigned(...args: Parameters<OverrideQueryBuilder["pgCurrentXactIdIfAssigned"]>) {
    return (new QueryBuilder(this)).pgCurrentXactIdIfAssigned(...args);
  }
  pgDatabaseCollationActualVersion(...args: Parameters<OverrideQueryBuilder["pgDatabaseCollationActualVersion"]>) {
    return (new QueryBuilder(this)).pgDatabaseCollationActualVersion(...args);
  }
  pgDatabaseSize(...args: Parameters<OverrideQueryBuilder["pgDatabaseSize"]>) {
    return (new QueryBuilder(this)).pgDatabaseSize(...args);
  }
  pgDescribeObject(...args: Parameters<OverrideQueryBuilder["pgDescribeObject"]>) {
    return (new QueryBuilder(this)).pgDescribeObject(...args);
  }
  pgDropReplicationSlot(...args: Parameters<OverrideQueryBuilder["pgDropReplicationSlot"]>) {
    return (new QueryBuilder(this)).pgDropReplicationSlot(...args);
  }
  pgEncodingToChar(...args: Parameters<OverrideQueryBuilder["pgEncodingToChar"]>) {
    return (new QueryBuilder(this)).pgEncodingToChar(...args);
  }
  pgEventTriggerDdlCommands(...args: Parameters<OverrideQueryBuilder["pgEventTriggerDdlCommands"]>) {
    return (new QueryBuilder(this)).pgEventTriggerDdlCommands(...args);
  }
  pgEventTriggerDroppedObjects(...args: Parameters<OverrideQueryBuilder["pgEventTriggerDroppedObjects"]>) {
    return (new QueryBuilder(this)).pgEventTriggerDroppedObjects(...args);
  }
  pgEventTriggerTableRewriteOid(...args: Parameters<OverrideQueryBuilder["pgEventTriggerTableRewriteOid"]>) {
    return (new QueryBuilder(this)).pgEventTriggerTableRewriteOid(...args);
  }
  pgEventTriggerTableRewriteReason(...args: Parameters<OverrideQueryBuilder["pgEventTriggerTableRewriteReason"]>) {
    return (new QueryBuilder(this)).pgEventTriggerTableRewriteReason(...args);
  }
  pgExportSnapshot(...args: Parameters<OverrideQueryBuilder["pgExportSnapshot"]>) {
    return (new QueryBuilder(this)).pgExportSnapshot(...args);
  }
  pgFilenodeRelation(...args: Parameters<OverrideQueryBuilder["pgFilenodeRelation"]>) {
    return (new QueryBuilder(this)).pgFilenodeRelation(...args);
  }
  pgFunctionIsVisible(...args: Parameters<OverrideQueryBuilder["pgFunctionIsVisible"]>) {
    return (new QueryBuilder(this)).pgFunctionIsVisible(...args);
  }
  pgGetAcl(...args: Parameters<OverrideQueryBuilder["pgGetAcl"]>) {
    return (new QueryBuilder(this)).pgGetAcl(...args);
  }
  pgGetCatalogForeignKeys(...args: Parameters<OverrideQueryBuilder["pgGetCatalogForeignKeys"]>) {
    return (new QueryBuilder(this)).pgGetCatalogForeignKeys(...args);
  }
  pgGetConstraintdef(...args: Parameters<OverrideQueryBuilder["pgGetConstraintdef"]>) {
    return (new QueryBuilder(this)).pgGetConstraintdef(...args);
  }
  pgGetExpr(...args: Parameters<OverrideQueryBuilder["pgGetExpr"]>) {
    return (new QueryBuilder(this)).pgGetExpr(...args);
  }
  pgGetFunctionArguments(...args: Parameters<OverrideQueryBuilder["pgGetFunctionArguments"]>) {
    return (new QueryBuilder(this)).pgGetFunctionArguments(...args);
  }
  pgGetFunctiondef(...args: Parameters<OverrideQueryBuilder["pgGetFunctiondef"]>) {
    return (new QueryBuilder(this)).pgGetFunctiondef(...args);
  }
  pgGetFunctionIdentityArguments(...args: Parameters<OverrideQueryBuilder["pgGetFunctionIdentityArguments"]>) {
    return (new QueryBuilder(this)).pgGetFunctionIdentityArguments(...args);
  }
  pgGetFunctionResult(...args: Parameters<OverrideQueryBuilder["pgGetFunctionResult"]>) {
    return (new QueryBuilder(this)).pgGetFunctionResult(...args);
  }
  pgGetIndexdef(...args: Parameters<OverrideQueryBuilder["pgGetIndexdef"]>) {
    return (new QueryBuilder(this)).pgGetIndexdef(...args);
  }
  pgGetKeywords(...args: Parameters<OverrideQueryBuilder["pgGetKeywords"]>) {
    return (new QueryBuilder(this)).pgGetKeywords(...args);
  }
  pgGetLoadedModules(...args: Parameters<OverrideQueryBuilder["pgGetLoadedModules"]>) {
    return (new QueryBuilder(this)).pgGetLoadedModules(...args);
  }
  pgGetMultixactMembers(...args: Parameters<OverrideQueryBuilder["pgGetMultixactMembers"]>) {
    return (new QueryBuilder(this)).pgGetMultixactMembers(...args);
  }
  pgGetObjectAddress(...args: Parameters<OverrideQueryBuilder["pgGetObjectAddress"]>) {
    return (new QueryBuilder(this)).pgGetObjectAddress(...args);
  }
  pgGetPartkeydef(...args: Parameters<OverrideQueryBuilder["pgGetPartkeydef"]>) {
    return (new QueryBuilder(this)).pgGetPartkeydef(...args);
  }
  pgGetRuledef(...args: Parameters<OverrideQueryBuilder["pgGetRuledef"]>) {
    return (new QueryBuilder(this)).pgGetRuledef(...args);
  }
  pgGetSerialSequence(...args: Parameters<OverrideQueryBuilder["pgGetSerialSequence"]>) {
    return (new QueryBuilder(this)).pgGetSerialSequence(...args);
  }
  pgGetStatisticsobjdef(...args: Parameters<OverrideQueryBuilder["pgGetStatisticsobjdef"]>) {
    return (new QueryBuilder(this)).pgGetStatisticsobjdef(...args);
  }
  pgGetTriggerdef(...args: Parameters<OverrideQueryBuilder["pgGetTriggerdef"]>) {
    return (new QueryBuilder(this)).pgGetTriggerdef(...args);
  }
  pgGetUserbyid(...args: Parameters<OverrideQueryBuilder["pgGetUserbyid"]>) {
    return (new QueryBuilder(this)).pgGetUserbyid(...args);
  }
  pgGetViewdef(...args: Parameters<OverrideQueryBuilder["pgGetViewdef"]>) {
    return (new QueryBuilder(this)).pgGetViewdef(...args);
  }
  pgGetViewdefWrap(...args: Parameters<OverrideQueryBuilder["pgGetViewdefWrap"]>) {
    return (new QueryBuilder(this)).pgGetViewdefWrap(...args);
  }
  pgGetWalReplayPauseState(...args: Parameters<OverrideQueryBuilder["pgGetWalReplayPauseState"]>) {
    return (new QueryBuilder(this)).pgGetWalReplayPauseState(...args);
  }
  pgGetWalResourceManagers(...args: Parameters<OverrideQueryBuilder["pgGetWalResourceManagers"]>) {
    return (new QueryBuilder(this)).pgGetWalResourceManagers(...args);
  }
  pgGetWalSummarizerState(...args: Parameters<OverrideQueryBuilder["pgGetWalSummarizerState"]>) {
    return (new QueryBuilder(this)).pgGetWalSummarizerState(...args);
  }
  pgHasRole(...args: Parameters<OverrideQueryBuilder["pgHasRole"]>) {
    return (new QueryBuilder(this)).pgHasRole(...args);
  }
  pgIdentifyObject(...args: Parameters<OverrideQueryBuilder["pgIdentifyObject"]>) {
    return (new QueryBuilder(this)).pgIdentifyObject(...args);
  }
  pgIdentifyObjectAsAddress(...args: Parameters<OverrideQueryBuilder["pgIdentifyObjectAsAddress"]>) {
    return (new QueryBuilder(this)).pgIdentifyObjectAsAddress(...args);
  }
  pgImportSystemCollations(...args: Parameters<OverrideQueryBuilder["pgImportSystemCollations"]>) {
    return (new QueryBuilder(this)).pgImportSystemCollations(...args);
  }
  pgIndexamHasProperty(...args: Parameters<OverrideQueryBuilder["pgIndexamHasProperty"]>) {
    return (new QueryBuilder(this)).pgIndexamHasProperty(...args);
  }
  pgIndexColumnHasProperty(...args: Parameters<OverrideQueryBuilder["pgIndexColumnHasProperty"]>) {
    return (new QueryBuilder(this)).pgIndexColumnHasProperty(...args);
  }
  pgIndexesSize(...args: Parameters<OverrideQueryBuilder["pgIndexesSize"]>) {
    return (new QueryBuilder(this)).pgIndexesSize(...args);
  }
  pgIndexHasProperty(...args: Parameters<OverrideQueryBuilder["pgIndexHasProperty"]>) {
    return (new QueryBuilder(this)).pgIndexHasProperty(...args);
  }
  pgInputErrorInfo(...args: Parameters<OverrideQueryBuilder["pgInputErrorInfo"]>) {
    return (new QueryBuilder(this)).pgInputErrorInfo(...args);
  }
  pgInputIsValid(...args: Parameters<OverrideQueryBuilder["pgInputIsValid"]>) {
    return (new QueryBuilder(this)).pgInputIsValid(...args);
  }
  pgIsInRecovery(...args: Parameters<OverrideQueryBuilder["pgIsInRecovery"]>) {
    return (new QueryBuilder(this)).pgIsInRecovery(...args);
  }
  pgIsOtherTempSchema(...args: Parameters<OverrideQueryBuilder["pgIsOtherTempSchema"]>) {
    return (new QueryBuilder(this)).pgIsOtherTempSchema(...args);
  }
  pgIsWalReplayPaused(...args: Parameters<OverrideQueryBuilder["pgIsWalReplayPaused"]>) {
    return (new QueryBuilder(this)).pgIsWalReplayPaused(...args);
  }
  pgJitAvailable(...args: Parameters<OverrideQueryBuilder["pgJitAvailable"]>) {
    return (new QueryBuilder(this)).pgJitAvailable(...args);
  }
  pgLastCommittedXact(...args: Parameters<OverrideQueryBuilder["pgLastCommittedXact"]>) {
    return (new QueryBuilder(this)).pgLastCommittedXact(...args);
  }
  pgLastWalReceiveLsn(...args: Parameters<OverrideQueryBuilder["pgLastWalReceiveLsn"]>) {
    return (new QueryBuilder(this)).pgLastWalReceiveLsn(...args);
  }
  pgLastWalReplayLsn(...args: Parameters<OverrideQueryBuilder["pgLastWalReplayLsn"]>) {
    return (new QueryBuilder(this)).pgLastWalReplayLsn(...args);
  }
  pgLastXactReplayTimestamp(...args: Parameters<OverrideQueryBuilder["pgLastXactReplayTimestamp"]>) {
    return (new QueryBuilder(this)).pgLastXactReplayTimestamp(...args);
  }
  pgListeningChannels(...args: Parameters<OverrideQueryBuilder["pgListeningChannels"]>) {
    return (new QueryBuilder(this)).pgListeningChannels(...args);
  }
  pgLogBackendMemoryContexts(...args: Parameters<OverrideQueryBuilder["pgLogBackendMemoryContexts"]>) {
    return (new QueryBuilder(this)).pgLogBackendMemoryContexts(...args);
  }
  pgLogicalEmitMessage(...args: Parameters<OverrideQueryBuilder["pgLogicalEmitMessage"]>) {
    return (new QueryBuilder(this)).pgLogicalEmitMessage(...args);
  }
  pgLogicalSlotGetBinaryChanges(...args: Parameters<OverrideQueryBuilder["pgLogicalSlotGetBinaryChanges"]>) {
    return (new QueryBuilder(this)).pgLogicalSlotGetBinaryChanges(...args);
  }
  pgLogicalSlotGetChanges(...args: Parameters<OverrideQueryBuilder["pgLogicalSlotGetChanges"]>) {
    return (new QueryBuilder(this)).pgLogicalSlotGetChanges(...args);
  }
  pgLogicalSlotPeekBinaryChanges(...args: Parameters<OverrideQueryBuilder["pgLogicalSlotPeekBinaryChanges"]>) {
    return (new QueryBuilder(this)).pgLogicalSlotPeekBinaryChanges(...args);
  }
  pgLogicalSlotPeekChanges(...args: Parameters<OverrideQueryBuilder["pgLogicalSlotPeekChanges"]>) {
    return (new QueryBuilder(this)).pgLogicalSlotPeekChanges(...args);
  }
  pgLogStandbySnapshot(...args: Parameters<OverrideQueryBuilder["pgLogStandbySnapshot"]>) {
    return (new QueryBuilder(this)).pgLogStandbySnapshot(...args);
  }
  pgLsArchiveStatusdir(...args: Parameters<OverrideQueryBuilder["pgLsArchiveStatusdir"]>) {
    return (new QueryBuilder(this)).pgLsArchiveStatusdir(...args);
  }
  pgLsDir(...args: Parameters<OverrideQueryBuilder["pgLsDir"]>) {
    return (new QueryBuilder(this)).pgLsDir(...args);
  }
  pgLsLogdir(...args: Parameters<OverrideQueryBuilder["pgLsLogdir"]>) {
    return (new QueryBuilder(this)).pgLsLogdir(...args);
  }
  pgLsLogicalmapdir(...args: Parameters<OverrideQueryBuilder["pgLsLogicalmapdir"]>) {
    return (new QueryBuilder(this)).pgLsLogicalmapdir(...args);
  }
  pgLsLogicalsnapdir(...args: Parameters<OverrideQueryBuilder["pgLsLogicalsnapdir"]>) {
    return (new QueryBuilder(this)).pgLsLogicalsnapdir(...args);
  }
  pgLsReplslotdir(...args: Parameters<OverrideQueryBuilder["pgLsReplslotdir"]>) {
    return (new QueryBuilder(this)).pgLsReplslotdir(...args);
  }
  pgLsSummariesdir(...args: Parameters<OverrideQueryBuilder["pgLsSummariesdir"]>) {
    return (new QueryBuilder(this)).pgLsSummariesdir(...args);
  }
  pgLsTmpdir(...args: Parameters<OverrideQueryBuilder["pgLsTmpdir"]>) {
    return (new QueryBuilder(this)).pgLsTmpdir(...args);
  }
  pgLsWaldir(...args: Parameters<OverrideQueryBuilder["pgLsWaldir"]>) {
    return (new QueryBuilder(this)).pgLsWaldir(...args);
  }
  pgMcvListItems(...args: Parameters<OverrideQueryBuilder["pgMcvListItems"]>) {
    return (new QueryBuilder(this)).pgMcvListItems(...args);
  }
  pgMyTempSchema(...args: Parameters<OverrideQueryBuilder["pgMyTempSchema"]>) {
    return (new QueryBuilder(this)).pgMyTempSchema(...args);
  }
  pgNotificationQueueUsage(...args: Parameters<OverrideQueryBuilder["pgNotificationQueueUsage"]>) {
    return (new QueryBuilder(this)).pgNotificationQueueUsage(...args);
  }
  pgNumaAvailable(...args: Parameters<OverrideQueryBuilder["pgNumaAvailable"]>) {
    return (new QueryBuilder(this)).pgNumaAvailable(...args);
  }
  pgOpclassIsVisible(...args: Parameters<OverrideQueryBuilder["pgOpclassIsVisible"]>) {
    return (new QueryBuilder(this)).pgOpclassIsVisible(...args);
  }
  pgOperatorIsVisible(...args: Parameters<OverrideQueryBuilder["pgOperatorIsVisible"]>) {
    return (new QueryBuilder(this)).pgOperatorIsVisible(...args);
  }
  pgOpfamilyIsVisible(...args: Parameters<OverrideQueryBuilder["pgOpfamilyIsVisible"]>) {
    return (new QueryBuilder(this)).pgOpfamilyIsVisible(...args);
  }
  pgOptionsToTable(...args: Parameters<OverrideQueryBuilder["pgOptionsToTable"]>) {
    return (new QueryBuilder(this)).pgOptionsToTable(...args);
  }
  pgPartitionAncestors(...args: Parameters<OverrideQueryBuilder["pgPartitionAncestors"]>) {
    return (new QueryBuilder(this)).pgPartitionAncestors(...args);
  }
  pgPartitionRoot(...args: Parameters<OverrideQueryBuilder["pgPartitionRoot"]>) {
    return (new QueryBuilder(this)).pgPartitionRoot(...args);
  }
  pgPartitionTree(...args: Parameters<OverrideQueryBuilder["pgPartitionTree"]>) {
    return (new QueryBuilder(this)).pgPartitionTree(...args);
  }
  pgPostmasterStartTime(...args: Parameters<OverrideQueryBuilder["pgPostmasterStartTime"]>) {
    return (new QueryBuilder(this)).pgPostmasterStartTime(...args);
  }
  pgPromote(...args: Parameters<OverrideQueryBuilder["pgPromote"]>) {
    return (new QueryBuilder(this)).pgPromote(...args);
  }
  pgReadBinaryFile(...args: Parameters<OverrideQueryBuilder["pgReadBinaryFile"]>) {
    return (new QueryBuilder(this)).pgReadBinaryFile(...args);
  }
  pgReadFile(...args: Parameters<OverrideQueryBuilder["pgReadFile"]>) {
    return (new QueryBuilder(this)).pgReadFile(...args);
  }
  pgRelationFilenode(...args: Parameters<OverrideQueryBuilder["pgRelationFilenode"]>) {
    return (new QueryBuilder(this)).pgRelationFilenode(...args);
  }
  pgRelationFilepath(...args: Parameters<OverrideQueryBuilder["pgRelationFilepath"]>) {
    return (new QueryBuilder(this)).pgRelationFilepath(...args);
  }
  pgRelationSize(...args: Parameters<OverrideQueryBuilder["pgRelationSize"]>) {
    return (new QueryBuilder(this)).pgRelationSize(...args);
  }
  pgReloadConf(...args: Parameters<OverrideQueryBuilder["pgReloadConf"]>) {
    return (new QueryBuilder(this)).pgReloadConf(...args);
  }
  pgReplicationOriginAdvance(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginAdvance"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginAdvance(...args);
  }
  pgReplicationOriginCreate(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginCreate"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginCreate(...args);
  }
  pgReplicationOriginDrop(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginDrop"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginDrop(...args);
  }
  pgReplicationOriginOid(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginOid"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginOid(...args);
  }
  pgReplicationOriginProgress(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginProgress"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginProgress(...args);
  }
  pgReplicationOriginSessionIsSetup(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginSessionIsSetup"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginSessionIsSetup(...args);
  }
  pgReplicationOriginSessionProgress(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginSessionProgress"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginSessionProgress(...args);
  }
  pgReplicationOriginSessionReset(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginSessionReset"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginSessionReset(...args);
  }
  pgReplicationOriginSessionSetup(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginSessionSetup"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginSessionSetup(...args);
  }
  pgReplicationOriginXactReset(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginXactReset"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginXactReset(...args);
  }
  pgReplicationOriginXactSetup(...args: Parameters<OverrideQueryBuilder["pgReplicationOriginXactSetup"]>) {
    return (new QueryBuilder(this)).pgReplicationOriginXactSetup(...args);
  }
  pgReplicationSlotAdvance(...args: Parameters<OverrideQueryBuilder["pgReplicationSlotAdvance"]>) {
    return (new QueryBuilder(this)).pgReplicationSlotAdvance(...args);
  }
  pgRotateLogfile(...args: Parameters<OverrideQueryBuilder["pgRotateLogfile"]>) {
    return (new QueryBuilder(this)).pgRotateLogfile(...args);
  }
  pgSafeSnapshotBlockingPids(...args: Parameters<OverrideQueryBuilder["pgSafeSnapshotBlockingPids"]>) {
    return (new QueryBuilder(this)).pgSafeSnapshotBlockingPids(...args);
  }
  pgSettingsGetFlags(...args: Parameters<OverrideQueryBuilder["pgSettingsGetFlags"]>) {
    return (new QueryBuilder(this)).pgSettingsGetFlags(...args);
  }
  pgSizeBytes(...args: Parameters<OverrideQueryBuilder["pgSizeBytes"]>) {
    return (new QueryBuilder(this)).pgSizeBytes(...args);
  }
  pgSizePretty(...args: Parameters<OverrideQueryBuilder["pgSizePretty"]>) {
    return (new QueryBuilder(this)).pgSizePretty(...args);
  }
  pgSleep(...args: Parameters<OverrideQueryBuilder["pgSleep"]>) {
    return (new QueryBuilder(this)).pgSleep(...args);
  }
  pgSleepFor(...args: Parameters<OverrideQueryBuilder["pgSleepFor"]>) {
    return (new QueryBuilder(this)).pgSleepFor(...args);
  }
  pgSleepUntil(...args: Parameters<OverrideQueryBuilder["pgSleepUntil"]>) {
    return (new QueryBuilder(this)).pgSleepUntil(...args);
  }
  pgSnapshotXip(...args: Parameters<OverrideQueryBuilder["pgSnapshotXip"]>) {
    return (new QueryBuilder(this)).pgSnapshotXip(...args);
  }
  pgSnapshotXmax(...args: Parameters<OverrideQueryBuilder["pgSnapshotXmax"]>) {
    return (new QueryBuilder(this)).pgSnapshotXmax(...args);
  }
  pgSnapshotXmin(...args: Parameters<OverrideQueryBuilder["pgSnapshotXmin"]>) {
    return (new QueryBuilder(this)).pgSnapshotXmin(...args);
  }
  pgSplitWalfileName(...args: Parameters<OverrideQueryBuilder["pgSplitWalfileName"]>) {
    return (new QueryBuilder(this)).pgSplitWalfileName(...args);
  }
  pgStatFile(...args: Parameters<OverrideQueryBuilder["pgStatFile"]>) {
    return (new QueryBuilder(this)).pgStatFile(...args);
  }
  pgStatisticsObjIsVisible(...args: Parameters<OverrideQueryBuilder["pgStatisticsObjIsVisible"]>) {
    return (new QueryBuilder(this)).pgStatisticsObjIsVisible(...args);
  }
  pgSwitchWal(...args: Parameters<OverrideQueryBuilder["pgSwitchWal"]>) {
    return (new QueryBuilder(this)).pgSwitchWal(...args);
  }
  pgSyncReplicationSlots(...args: Parameters<OverrideQueryBuilder["pgSyncReplicationSlots"]>) {
    return (new QueryBuilder(this)).pgSyncReplicationSlots(...args);
  }
  pgTableIsVisible(...args: Parameters<OverrideQueryBuilder["pgTableIsVisible"]>) {
    return (new QueryBuilder(this)).pgTableIsVisible(...args);
  }
  pgTableSize(...args: Parameters<OverrideQueryBuilder["pgTableSize"]>) {
    return (new QueryBuilder(this)).pgTableSize(...args);
  }
  pgTablespaceDatabases(...args: Parameters<OverrideQueryBuilder["pgTablespaceDatabases"]>) {
    return (new QueryBuilder(this)).pgTablespaceDatabases(...args);
  }
  pgTablespaceLocation(...args: Parameters<OverrideQueryBuilder["pgTablespaceLocation"]>) {
    return (new QueryBuilder(this)).pgTablespaceLocation(...args);
  }
  pgTablespaceSize(...args: Parameters<OverrideQueryBuilder["pgTablespaceSize"]>) {
    return (new QueryBuilder(this)).pgTablespaceSize(...args);
  }
  pgTerminateBackend(...args: Parameters<OverrideQueryBuilder["pgTerminateBackend"]>) {
    return (new QueryBuilder(this)).pgTerminateBackend(...args);
  }
  pgTotalRelationSize(...args: Parameters<OverrideQueryBuilder["pgTotalRelationSize"]>) {
    return (new QueryBuilder(this)).pgTotalRelationSize(...args);
  }
  pgTriggerDepth(...args: Parameters<OverrideQueryBuilder["pgTriggerDepth"]>) {
    return (new QueryBuilder(this)).pgTriggerDepth(...args);
  }
  pgTryAdvisoryLock(...args: Parameters<OverrideQueryBuilder["pgTryAdvisoryLock"]>) {
    return (new QueryBuilder(this)).pgTryAdvisoryLock(...args);
  }
  pgTryAdvisoryLockShared(...args: Parameters<OverrideQueryBuilder["pgTryAdvisoryLockShared"]>) {
    return (new QueryBuilder(this)).pgTryAdvisoryLockShared(...args);
  }
  pgTryAdvisoryXactLock(...args: Parameters<OverrideQueryBuilder["pgTryAdvisoryXactLock"]>) {
    return (new QueryBuilder(this)).pgTryAdvisoryXactLock(...args);
  }
  pgTryAdvisoryXactLockShared(...args: Parameters<OverrideQueryBuilder["pgTryAdvisoryXactLockShared"]>) {
    return (new QueryBuilder(this)).pgTryAdvisoryXactLockShared(...args);
  }
  pgTsConfigIsVisible(...args: Parameters<OverrideQueryBuilder["pgTsConfigIsVisible"]>) {
    return (new QueryBuilder(this)).pgTsConfigIsVisible(...args);
  }
  pgTsDictIsVisible(...args: Parameters<OverrideQueryBuilder["pgTsDictIsVisible"]>) {
    return (new QueryBuilder(this)).pgTsDictIsVisible(...args);
  }
  pgTsParserIsVisible(...args: Parameters<OverrideQueryBuilder["pgTsParserIsVisible"]>) {
    return (new QueryBuilder(this)).pgTsParserIsVisible(...args);
  }
  pgTsTemplateIsVisible(...args: Parameters<OverrideQueryBuilder["pgTsTemplateIsVisible"]>) {
    return (new QueryBuilder(this)).pgTsTemplateIsVisible(...args);
  }
  pgTypeIsVisible(...args: Parameters<OverrideQueryBuilder["pgTypeIsVisible"]>) {
    return (new QueryBuilder(this)).pgTypeIsVisible(...args);
  }
  pgTypeof(...args: Parameters<OverrideQueryBuilder["pgTypeof"]>) {
    return (new QueryBuilder(this)).pgTypeof(...args);
  }
  pgVisibleInSnapshot(...args: Parameters<OverrideQueryBuilder["pgVisibleInSnapshot"]>) {
    return (new QueryBuilder(this)).pgVisibleInSnapshot(...args);
  }
  pgWalfileName(...args: Parameters<OverrideQueryBuilder["pgWalfileName"]>) {
    return (new QueryBuilder(this)).pgWalfileName(...args);
  }
  pgWalfileNameOffset(...args: Parameters<OverrideQueryBuilder["pgWalfileNameOffset"]>) {
    return (new QueryBuilder(this)).pgWalfileNameOffset(...args);
  }
  pgWalLsnDiff(...args: Parameters<OverrideQueryBuilder["pgWalLsnDiff"]>) {
    return (new QueryBuilder(this)).pgWalLsnDiff(...args);
  }
  pgWalReplayPause(...args: Parameters<OverrideQueryBuilder["pgWalReplayPause"]>) {
    return (new QueryBuilder(this)).pgWalReplayPause(...args);
  }
  pgWalReplayResume(...args: Parameters<OverrideQueryBuilder["pgWalReplayResume"]>) {
    return (new QueryBuilder(this)).pgWalReplayResume(...args);
  }
  pgWalSummaryContents(...args: Parameters<OverrideQueryBuilder["pgWalSummaryContents"]>) {
    return (new QueryBuilder(this)).pgWalSummaryContents(...args);
  }
  pgXactCommitTimestamp(...args: Parameters<OverrideQueryBuilder["pgXactCommitTimestamp"]>) {
    return (new QueryBuilder(this)).pgXactCommitTimestamp(...args);
  }
  pgXactCommitTimestampOrigin(...args: Parameters<OverrideQueryBuilder["pgXactCommitTimestampOrigin"]>) {
    return (new QueryBuilder(this)).pgXactCommitTimestampOrigin(...args);
  }
  pgXactStatus(...args: Parameters<OverrideQueryBuilder["pgXactStatus"]>) {
    return (new QueryBuilder(this)).pgXactStatus(...args);
  }
  phrasetoTsquery(...args: Parameters<OverrideQueryBuilder["phrasetoTsquery"]>) {
    return (new QueryBuilder(this)).phrasetoTsquery(...args);
  }
  pi(...args: Parameters<OverrideQueryBuilder["pi"]>) {
    return (new QueryBuilder(this)).pi(...args);
  }
  pipe() {
    return (new QueryBuilder(this)).pipe();
  }
  placing() {
    return (new QueryBuilder(this)).placing();
  }
  plaintoTsquery(...args: Parameters<OverrideQueryBuilder["plaintoTsquery"]>) {
    return (new QueryBuilder(this)).plaintoTsquery(...args);
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
  point(...args: Parameters<OverrideQueryBuilder["point"]>) {
    return (new QueryBuilder(this)).point(...args);
  }
  policy() {
    return (new QueryBuilder(this)).policy();
  }
  polygon(...args: Parameters<OverrideQueryBuilder["polygon"]>) {
    return (new QueryBuilder(this)).polygon(...args);
  }
  popen(...args: Parameters<OverrideQueryBuilder["popen"]>) {
    return (new QueryBuilder(this)).popen(...args);
  }
  portion() {
    return (new QueryBuilder(this)).portion();
  }
  position(...args: Parameters<OverrideQueryBuilder["position"]>) {
    return (new QueryBuilder(this)).position(...args);
  }
  positionRegex() {
    return (new QueryBuilder(this)).positionRegex();
  }
  power(...args: Parameters<OverrideQueryBuilder["power"]>) {
    return (new QueryBuilder(this)).power(...args);
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
  queryToXml(...args: Parameters<OverrideQueryBuilder["queryToXml"]>) {
    return (new QueryBuilder(this)).queryToXml(...args);
  }
  queryToXmlAndXmlschema(...args: Parameters<OverrideQueryBuilder["queryToXmlAndXmlschema"]>) {
    return (new QueryBuilder(this)).queryToXmlAndXmlschema(...args);
  }
  queryToXmlschema(...args: Parameters<OverrideQueryBuilder["queryToXmlschema"]>) {
    return (new QueryBuilder(this)).queryToXmlschema(...args);
  }
  querytree(...args: Parameters<OverrideQueryBuilder["querytree"]>) {
    return (new QueryBuilder(this)).querytree(...args);
  }
  quote() {
    return (new QueryBuilder(this)).quote();
  }
  quoteIdent(...args: Parameters<OverrideQueryBuilder["quoteIdent"]>) {
    return (new QueryBuilder(this)).quoteIdent(...args);
  }
  quoteLiteral(...args: Parameters<OverrideQueryBuilder["quoteLiteral"]>) {
    return (new QueryBuilder(this)).quoteLiteral(...args);
  }
  quoteNullable(...args: Parameters<OverrideQueryBuilder["quoteNullable"]>) {
    return (new QueryBuilder(this)).quoteNullable(...args);
  }
  quotes() {
    return (new QueryBuilder(this)).quotes();
  }
  r(...args: Parameters<BaseRawQueryBuilder["r"]>) {
    return (new QueryBuilder(this)).r(...args);
  }
  radians(...args: Parameters<OverrideQueryBuilder["radians"]>) {
    return (new QueryBuilder(this)).radians(...args);
  }
  radius(...args: Parameters<OverrideQueryBuilder["radius"]>) {
    return (new QueryBuilder(this)).radius(...args);
  }
  random(...args: Parameters<OverrideQueryBuilder["random"]>) {
    return (new QueryBuilder(this)).random(...args);
  }
  randomNormal(...args: Parameters<OverrideQueryBuilder["randomNormal"]>) {
    return (new QueryBuilder(this)).randomNormal(...args);
  }
  range() {
    return (new QueryBuilder(this)).range();
  }
  rangeAgg(...args: Parameters<OverrideQueryBuilder["rangeAgg"]>) {
    return (new QueryBuilder(this)).rangeAgg(...args);
  }
  rangeIntersectAgg(...args: Parameters<OverrideQueryBuilder["rangeIntersectAgg"]>) {
    return (new QueryBuilder(this)).rangeIntersectAgg(...args);
  }
  rangeMerge(...args: Parameters<OverrideQueryBuilder["rangeMerge"]>) {
    return (new QueryBuilder(this)).rangeMerge(...args);
  }
  rank(...args: Parameters<OverrideQueryBuilder["rank"]>) {
    return (new QueryBuilder(this)).rank(...args);
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
  regexpCount(...args: Parameters<OverrideQueryBuilder["regexpCount"]>) {
    return (new QueryBuilder(this)).regexpCount(...args);
  }
  regexpInstr(...args: Parameters<OverrideQueryBuilder["regexpInstr"]>) {
    return (new QueryBuilder(this)).regexpInstr(...args);
  }
  regexpLike(...args: Parameters<OverrideQueryBuilder["regexpLike"]>) {
    return (new QueryBuilder(this)).regexpLike(...args);
  }
  regexpMatch(...args: Parameters<OverrideQueryBuilder["regexpMatch"]>) {
    return (new QueryBuilder(this)).regexpMatch(...args);
  }
  regexpMatches(...args: Parameters<OverrideQueryBuilder["regexpMatches"]>) {
    return (new QueryBuilder(this)).regexpMatches(...args);
  }
  regexpReplace(...args: Parameters<OverrideQueryBuilder["regexpReplace"]>) {
    return (new QueryBuilder(this)).regexpReplace(...args);
  }
  regexpSplitToArray(...args: Parameters<OverrideQueryBuilder["regexpSplitToArray"]>) {
    return (new QueryBuilder(this)).regexpSplitToArray(...args);
  }
  regexpSplitToTable(...args: Parameters<OverrideQueryBuilder["regexpSplitToTable"]>) {
    return (new QueryBuilder(this)).regexpSplitToTable(...args);
  }
  regexpSubstr(...args: Parameters<OverrideQueryBuilder["regexpSubstr"]>) {
    return (new QueryBuilder(this)).regexpSubstr(...args);
  }
  regrAvgx(...args: Parameters<OverrideQueryBuilder["regrAvgx"]>) {
    return (new QueryBuilder(this)).regrAvgx(...args);
  }
  regrAvgy(...args: Parameters<OverrideQueryBuilder["regrAvgy"]>) {
    return (new QueryBuilder(this)).regrAvgy(...args);
  }
  regrCount(...args: Parameters<OverrideQueryBuilder["regrCount"]>) {
    return (new QueryBuilder(this)).regrCount(...args);
  }
  regrIntercept(...args: Parameters<OverrideQueryBuilder["regrIntercept"]>) {
    return (new QueryBuilder(this)).regrIntercept(...args);
  }
  regrR2(...args: Parameters<OverrideQueryBuilder["regrR2"]>) {
    return (new QueryBuilder(this)).regrR2(...args);
  }
  regrSlope(...args: Parameters<OverrideQueryBuilder["regrSlope"]>) {
    return (new QueryBuilder(this)).regrSlope(...args);
  }
  regrSxx(...args: Parameters<OverrideQueryBuilder["regrSxx"]>) {
    return (new QueryBuilder(this)).regrSxx(...args);
  }
  regrSxy(...args: Parameters<OverrideQueryBuilder["regrSxy"]>) {
    return (new QueryBuilder(this)).regrSxy(...args);
  }
  regrSyy(...args: Parameters<OverrideQueryBuilder["regrSyy"]>) {
    return (new QueryBuilder(this)).regrSyy(...args);
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
  rename() {
    return (new QueryBuilder(this)).rename();
  }
  repeat(...args: Parameters<OverrideQueryBuilder["repeat"]>) {
    return (new QueryBuilder(this)).repeat(...args);
  }
  repeatable() {
    return (new QueryBuilder(this)).repeatable();
  }
  replace(...args: Parameters<OverrideQueryBuilder["replace"]>) {
    return (new QueryBuilder(this)).replace(...args);
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
  returning(...args: Parameters<OverrideQueryBuilder["returning"]>) {
    return (new QueryBuilder(this)).returning(...args);
  }
  returns() {
    return (new QueryBuilder(this)).returns();
  }
  reverse(...args: Parameters<OverrideQueryBuilder["reverse"]>) {
    return (new QueryBuilder(this)).reverse(...args);
  }
  revoke() {
    return (new QueryBuilder(this)).revoke();
  }
  right(...args: Parameters<OverrideQueryBuilder["right"]>) {
    return (new QueryBuilder(this)).right(...args);
  }
  rightJoin(...args: Parameters<OverrideQueryBuilder["rightJoin"]>) {
    return (new QueryBuilder(this)).rightJoin(...args);
  }
  rightJoinLateral(...args: Parameters<OverrideQueryBuilder["rightJoinLateral"]>) {
    return (new QueryBuilder(this)).rightJoinLateral(...args);
  }
  role() {
    return (new QueryBuilder(this)).role();
  }
  rollback() {
    return (new QueryBuilder(this)).rollback();
  }
  rollbackTransaction(...args: Parameters<OverrideQueryBuilder["rollbackTransaction"]>) {
    return (new QueryBuilder(this)).rollbackTransaction(...args);
  }
  rollup() {
    return (new QueryBuilder(this)).rollup();
  }
  round(...args: Parameters<OverrideQueryBuilder["round"]>) {
    return (new QueryBuilder(this)).round(...args);
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
  rowNumber(...args: Parameters<OverrideQueryBuilder["rowNumber"]>) {
    return (new QueryBuilder(this)).rowNumber(...args);
  }
  rows() {
    return (new QueryBuilder(this)).rows();
  }
  rowSecurityActive(...args: Parameters<OverrideQueryBuilder["rowSecurityActive"]>) {
    return (new QueryBuilder(this)).rowSecurityActive(...args);
  }
  rowToJson(...args: Parameters<OverrideQueryBuilder["rowToJson"]>) {
    return (new QueryBuilder(this)).rowToJson(...args);
  }
  rpad(...args: Parameters<OverrideQueryBuilder["rpad"]>) {
    return (new QueryBuilder(this)).rpad(...args);
  }
  rs(...args: Parameters<BaseRawQueryBuilder["rs"]>) {
    return (new QueryBuilder(this)).rs(...args);
  }
  rtrim(...args: Parameters<OverrideQueryBuilder["rtrim"]>) {
    return (new QueryBuilder(this)).rtrim(...args);
  }
  rule() {
    return (new QueryBuilder(this)).rule();
  }
  running() {
    return (new QueryBuilder(this)).running();
  }
  savepoint() {
    return (new QueryBuilder(this)).savepoint();
  }
  savepointTransaction(...args: Parameters<OverrideQueryBuilder["savepointTransaction"]>) {
    return (new QueryBuilder(this)).savepointTransaction(...args);
  }
  sc(...args: Parameters<OverrideQueryBuilder["sc"]>) {
    return (new QueryBuilder(this)).sc(...args);
  }
  scalar() {
    return (new QueryBuilder(this)).scalar();
  }
  scale(...args: Parameters<OverrideQueryBuilder["scale"]>) {
    return (new QueryBuilder(this)).scale(...args);
  }
  schema() {
    return (new QueryBuilder(this)).schema();
  }
  schemaName() {
    return (new QueryBuilder(this)).schemaName();
  }
  schemas() {
    return (new QueryBuilder(this)).schemas();
  }
  schemaToXml(...args: Parameters<OverrideQueryBuilder["schemaToXml"]>) {
    return (new QueryBuilder(this)).schemaToXml(...args);
  }
  schemaToXmlAndXmlschema(...args: Parameters<OverrideQueryBuilder["schemaToXmlAndXmlschema"]>) {
    return (new QueryBuilder(this)).schemaToXmlAndXmlschema(...args);
  }
  schemaToXmlschema(...args: Parameters<OverrideQueryBuilder["schemaToXmlschema"]>) {
    return (new QueryBuilder(this)).schemaToXmlschema(...args);
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
  select(...args: Parameters<OverrideQueryBuilder["select"]>) {
    return (new QueryBuilder(this)).select(...args);
  }
  selectDistinct(...args: Parameters<OverrideQueryBuilder["selectDistinct"]>) {
    return (new QueryBuilder(this)).selectDistinct(...args);
  }
  selectDistinctOn(...args: Parameters<OverrideQueryBuilder["selectDistinctOn"]>) {
    return (new QueryBuilder(this)).selectDistinctOn(...args);
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
  semicolon(...args: Parameters<OverrideQueryBuilder["semicolon"]>) {
    return (new QueryBuilder(this)).semicolon(...args);
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
  set(...args: Parameters<OverrideQueryBuilder["set"]>) {
    return (new QueryBuilder(this)).set(...args);
  }
  setBit(...args: Parameters<OverrideQueryBuilder["setBit"]>) {
    return (new QueryBuilder(this)).setBit(...args);
  }
  setByte(...args: Parameters<OverrideQueryBuilder["setByte"]>) {
    return (new QueryBuilder(this)).setByte(...args);
  }
  setConfig(...args: Parameters<OverrideQueryBuilder["setConfig"]>) {
    return (new QueryBuilder(this)).setConfig(...args);
  }
  setMasklen(...args: Parameters<OverrideQueryBuilder["setMasklen"]>) {
    return (new QueryBuilder(this)).setMasklen(...args);
  }
  setof() {
    return (new QueryBuilder(this)).setof();
  }
  sets() {
    return (new QueryBuilder(this)).sets();
  }
  setseed(...args: Parameters<OverrideQueryBuilder["setseed"]>) {
    return (new QueryBuilder(this)).setseed(...args);
  }
  setval(...args: Parameters<OverrideQueryBuilder["setval"]>) {
    return (new QueryBuilder(this)).setval(...args);
  }
  setweight(...args: Parameters<OverrideQueryBuilder["setweight"]>) {
    return (new QueryBuilder(this)).setweight(...args);
  }
  sha224(...args: Parameters<OverrideQueryBuilder["sha224"]>) {
    return (new QueryBuilder(this)).sha224(...args);
  }
  sha256(...args: Parameters<OverrideQueryBuilder["sha256"]>) {
    return (new QueryBuilder(this)).sha256(...args);
  }
  sha384(...args: Parameters<OverrideQueryBuilder["sha384"]>) {
    return (new QueryBuilder(this)).sha384(...args);
  }
  sha512(...args: Parameters<OverrideQueryBuilder["sha512"]>) {
    return (new QueryBuilder(this)).sha512(...args);
  }
  share() {
    return (new QueryBuilder(this)).share();
  }
  shobjDescription(...args: Parameters<OverrideQueryBuilder["shobjDescription"]>) {
    return (new QueryBuilder(this)).shobjDescription(...args);
  }
  show() {
    return (new QueryBuilder(this)).show();
  }
  sign(...args: Parameters<OverrideQueryBuilder["sign"]>) {
    return (new QueryBuilder(this)).sign(...args);
  }
  similar() {
    return (new QueryBuilder(this)).similar();
  }
  simple() {
    return (new QueryBuilder(this)).simple();
  }
  sin(...args: Parameters<OverrideQueryBuilder["sin"]>) {
    return (new QueryBuilder(this)).sin(...args);
  }
  sind(...args: Parameters<OverrideQueryBuilder["sind"]>) {
    return (new QueryBuilder(this)).sind(...args);
  }
  sinh(...args: Parameters<OverrideQueryBuilder["sinh"]>) {
    return (new QueryBuilder(this)).sinh(...args);
  }
  size() {
    return (new QueryBuilder(this)).size();
  }
  skip() {
    return (new QueryBuilder(this)).skip();
  }
  slope(...args: Parameters<OverrideQueryBuilder["slope"]>) {
    return (new QueryBuilder(this)).slope(...args);
  }
  smallint() {
    return (new QueryBuilder(this)).smallint();
  }
  snapshot() {
    return (new QueryBuilder(this)).snapshot();
  }
  some(...args: Parameters<OverrideQueryBuilder["some"]>) {
    return (new QueryBuilder(this)).some(...args);
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
  splitPart(...args: Parameters<OverrideQueryBuilder["splitPart"]>) {
    return (new QueryBuilder(this)).splitPart(...args);
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
  sqrt(...args: Parameters<OverrideQueryBuilder["sqrt"]>) {
    return (new QueryBuilder(this)).sqrt(...args);
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
  startsWith(...args: Parameters<OverrideQueryBuilder["startsWith"]>) {
    return (new QueryBuilder(this)).startsWith(...args);
  }
  state() {
    return (new QueryBuilder(this)).state();
  }
  statement() {
    return (new QueryBuilder(this)).statement();
  }
  statementTimestamp(...args: Parameters<OverrideQueryBuilder["statementTimestamp"]>) {
    return (new QueryBuilder(this)).statementTimestamp(...args);
  }
  static() {
    return (new QueryBuilder(this)).static();
  }
  statistics() {
    return (new QueryBuilder(this)).statistics();
  }
  stddev(...args: Parameters<OverrideQueryBuilder["stddev"]>) {
    return (new QueryBuilder(this)).stddev(...args);
  }
  stddevPop(...args: Parameters<OverrideQueryBuilder["stddevPop"]>) {
    return (new QueryBuilder(this)).stddevPop(...args);
  }
  stddevSamp(...args: Parameters<OverrideQueryBuilder["stddevSamp"]>) {
    return (new QueryBuilder(this)).stddevSamp(...args);
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
  string() {
    return (new QueryBuilder(this)).string();
  }
  stringAgg(...args: Parameters<OverrideQueryBuilder["stringAgg"]>) {
    return (new QueryBuilder(this)).stringAgg(...args);
  }
  stringToArray(...args: Parameters<OverrideQueryBuilder["stringToArray"]>) {
    return (new QueryBuilder(this)).stringToArray(...args);
  }
  stringToTable(...args: Parameters<OverrideQueryBuilder["stringToTable"]>) {
    return (new QueryBuilder(this)).stringToTable(...args);
  }
  strip(...args: Parameters<OverrideQueryBuilder["strip"]>) {
    return (new QueryBuilder(this)).strip(...args);
  }
  strpos(...args: Parameters<OverrideQueryBuilder["strpos"]>) {
    return (new QueryBuilder(this)).strpos(...args);
  }
  structure() {
    return (new QueryBuilder(this)).structure();
  }
  style() {
    return (new QueryBuilder(this)).style();
  }
  sub(...args: Parameters<OverrideQueryBuilder["sub"]>) {
    return (new QueryBuilder(this)).sub(...args);
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
  substr(...args: Parameters<OverrideQueryBuilder["substr"]>) {
    return (new QueryBuilder(this)).substr(...args);
  }
  substring(...args: Parameters<OverrideQueryBuilder["substring"]>) {
    return (new QueryBuilder(this)).substring(...args);
  }
  substringRegex() {
    return (new QueryBuilder(this)).substringRegex();
  }
  succeeds() {
    return (new QueryBuilder(this)).succeeds();
  }
  sum(...args: Parameters<OverrideQueryBuilder["sum"]>) {
    return (new QueryBuilder(this)).sum(...args);
  }
  support() {
    return (new QueryBuilder(this)).support();
  }
  suppressRedundantUpdatesTrigger(...args: Parameters<OverrideQueryBuilder["suppressRedundantUpdatesTrigger"]>) {
    return (new QueryBuilder(this)).suppressRedundantUpdatesTrigger(...args);
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
  t(...args: Parameters<OverrideQueryBuilder["t"]>) {
    return (new QueryBuilder(this)).t(...args);
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
  tableToXml(...args: Parameters<OverrideQueryBuilder["tableToXml"]>) {
    return (new QueryBuilder(this)).tableToXml(...args);
  }
  tableToXmlAndXmlschema(...args: Parameters<OverrideQueryBuilder["tableToXmlAndXmlschema"]>) {
    return (new QueryBuilder(this)).tableToXmlAndXmlschema(...args);
  }
  tableToXmlschema(...args: Parameters<OverrideQueryBuilder["tableToXmlschema"]>) {
    return (new QueryBuilder(this)).tableToXmlschema(...args);
  }
  tan(...args: Parameters<OverrideQueryBuilder["tan"]>) {
    return (new QueryBuilder(this)).tan(...args);
  }
  tand(...args: Parameters<OverrideQueryBuilder["tand"]>) {
    return (new QueryBuilder(this)).tand(...args);
  }
  tanh(...args: Parameters<OverrideQueryBuilder["tanh"]>) {
    return (new QueryBuilder(this)).tanh(...args);
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
  textInet(...args: Parameters<OverrideQueryBuilder["textInet"]>) {
    return (new QueryBuilder(this)).textInet(...args);
  }
  then(...args: Parameters<OverrideQueryBuilder["then"]>) {
    return (new QueryBuilder(this)).then(...args);
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
  timeofday(...args: Parameters<OverrideQueryBuilder["timeofday"]>) {
    return (new QueryBuilder(this)).timeofday(...args);
  }
  timestamp() {
    return (new QueryBuilder(this)).timestamp();
  }
  timezone(...args: Parameters<OverrideQueryBuilder["timezone"]>) {
    return (new QueryBuilder(this)).timezone(...args);
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
  toAscii(...args: Parameters<OverrideQueryBuilder["toAscii"]>) {
    return (new QueryBuilder(this)).toAscii(...args);
  }
  toBin(...args: Parameters<OverrideQueryBuilder["toBin"]>) {
    return (new QueryBuilder(this)).toBin(...args);
  }
  toChar(...args: Parameters<OverrideQueryBuilder["toChar"]>) {
    return (new QueryBuilder(this)).toChar(...args);
  }
  toDate(...args: Parameters<OverrideQueryBuilder["toDate"]>) {
    return (new QueryBuilder(this)).toDate(...args);
  }
  toHex(...args: Parameters<OverrideQueryBuilder["toHex"]>) {
    return (new QueryBuilder(this)).toHex(...args);
  }
  toJson(...args: Parameters<OverrideQueryBuilder["toJson"]>) {
    return (new QueryBuilder(this)).toJson(...args);
  }
  toJsonb(...args: Parameters<OverrideQueryBuilder["toJsonb"]>) {
    return (new QueryBuilder(this)).toJsonb(...args);
  }
  token() {
    return (new QueryBuilder(this)).token();
  }
  toNumber(...args: Parameters<OverrideQueryBuilder["toNumber"]>) {
    return (new QueryBuilder(this)).toNumber(...args);
  }
  toOct(...args: Parameters<OverrideQueryBuilder["toOct"]>) {
    return (new QueryBuilder(this)).toOct(...args);
  }
  topLevelCount() {
    return (new QueryBuilder(this)).topLevelCount();
  }
  toRegclass(...args: Parameters<OverrideQueryBuilder["toRegclass"]>) {
    return (new QueryBuilder(this)).toRegclass(...args);
  }
  toRegcollation(...args: Parameters<OverrideQueryBuilder["toRegcollation"]>) {
    return (new QueryBuilder(this)).toRegcollation(...args);
  }
  toRegnamespace(...args: Parameters<OverrideQueryBuilder["toRegnamespace"]>) {
    return (new QueryBuilder(this)).toRegnamespace(...args);
  }
  toRegoper(...args: Parameters<OverrideQueryBuilder["toRegoper"]>) {
    return (new QueryBuilder(this)).toRegoper(...args);
  }
  toRegoperator(...args: Parameters<OverrideQueryBuilder["toRegoperator"]>) {
    return (new QueryBuilder(this)).toRegoperator(...args);
  }
  toRegproc(...args: Parameters<OverrideQueryBuilder["toRegproc"]>) {
    return (new QueryBuilder(this)).toRegproc(...args);
  }
  toRegprocedure(...args: Parameters<OverrideQueryBuilder["toRegprocedure"]>) {
    return (new QueryBuilder(this)).toRegprocedure(...args);
  }
  toRegrole(...args: Parameters<OverrideQueryBuilder["toRegrole"]>) {
    return (new QueryBuilder(this)).toRegrole(...args);
  }
  toRegtype(...args: Parameters<OverrideQueryBuilder["toRegtype"]>) {
    return (new QueryBuilder(this)).toRegtype(...args);
  }
  toRegtypemod(...args: Parameters<OverrideQueryBuilder["toRegtypemod"]>) {
    return (new QueryBuilder(this)).toRegtypemod(...args);
  }
  toTimestamp(...args: Parameters<OverrideQueryBuilder["toTimestamp"]>) {
    return (new QueryBuilder(this)).toTimestamp(...args);
  }
  toTsquery(...args: Parameters<OverrideQueryBuilder["toTsquery"]>) {
    return (new QueryBuilder(this)).toTsquery(...args);
  }
  toTsvector(...args: Parameters<OverrideQueryBuilder["toTsvector"]>) {
    return (new QueryBuilder(this)).toTsvector(...args);
  }
  trailing() {
    return (new QueryBuilder(this)).trailing();
  }
  transaction(...args: Parameters<OverrideQueryBuilder["transaction"]>) {
    return (new QueryBuilder(this)).transaction(...args);
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
  transactionTimestamp(...args: Parameters<OverrideQueryBuilder["transactionTimestamp"]>) {
    return (new QueryBuilder(this)).transactionTimestamp(...args);
  }
  transform() {
    return (new QueryBuilder(this)).transform();
  }
  transforms() {
    return (new QueryBuilder(this)).transforms();
  }
  translate(...args: Parameters<OverrideQueryBuilder["translate"]>) {
    return (new QueryBuilder(this)).translate(...args);
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
  trim(...args: Parameters<OverrideQueryBuilder["trim"]>) {
    return (new QueryBuilder(this)).trim(...args);
  }
  trimArray(...args: Parameters<OverrideQueryBuilder["trimArray"]>) {
    return (new QueryBuilder(this)).trimArray(...args);
  }
  trimScale(...args: Parameters<OverrideQueryBuilder["trimScale"]>) {
    return (new QueryBuilder(this)).trimScale(...args);
  }
  true() {
    return (new QueryBuilder(this)).true();
  }
  trunc(...args: Parameters<OverrideQueryBuilder["trunc"]>) {
    return (new QueryBuilder(this)).trunc(...args);
  }
  truncate() {
    return (new QueryBuilder(this)).truncate();
  }
  trusted() {
    return (new QueryBuilder(this)).trusted();
  }
  tsDebug(...args: Parameters<OverrideQueryBuilder["tsDebug"]>) {
    return (new QueryBuilder(this)).tsDebug(...args);
  }
  tsDelete(...args: Parameters<OverrideQueryBuilder["tsDelete"]>) {
    return (new QueryBuilder(this)).tsDelete(...args);
  }
  tsFilter(...args: Parameters<OverrideQueryBuilder["tsFilter"]>) {
    return (new QueryBuilder(this)).tsFilter(...args);
  }
  tsHeadline(...args: Parameters<OverrideQueryBuilder["tsHeadline"]>) {
    return (new QueryBuilder(this)).tsHeadline(...args);
  }
  tsLexize(...args: Parameters<OverrideQueryBuilder["tsLexize"]>) {
    return (new QueryBuilder(this)).tsLexize(...args);
  }
  tsParse(...args: Parameters<OverrideQueryBuilder["tsParse"]>) {
    return (new QueryBuilder(this)).tsParse(...args);
  }
  tsqueryPhrase(...args: Parameters<OverrideQueryBuilder["tsqueryPhrase"]>) {
    return (new QueryBuilder(this)).tsqueryPhrase(...args);
  }
  tsRank(...args: Parameters<OverrideQueryBuilder["tsRank"]>) {
    return (new QueryBuilder(this)).tsRank(...args);
  }
  tsRankCd(...args: Parameters<OverrideQueryBuilder["tsRankCd"]>) {
    return (new QueryBuilder(this)).tsRankCd(...args);
  }
  tsRewrite(...args: Parameters<OverrideQueryBuilder["tsRewrite"]>) {
    return (new QueryBuilder(this)).tsRewrite(...args);
  }
  tsStat(...args: Parameters<OverrideQueryBuilder["tsStat"]>) {
    return (new QueryBuilder(this)).tsStat(...args);
  }
  tsTokenType(...args: Parameters<OverrideQueryBuilder["tsTokenType"]>) {
    return (new QueryBuilder(this)).tsTokenType(...args);
  }
  tsvectorToArray(...args: Parameters<OverrideQueryBuilder["tsvectorToArray"]>) {
    return (new QueryBuilder(this)).tsvectorToArray(...args);
  }
  tsvectorUpdateTrigger(...args: Parameters<OverrideQueryBuilder["tsvectorUpdateTrigger"]>) {
    return (new QueryBuilder(this)).tsvectorUpdateTrigger(...args);
  }
  tsvectorUpdateTriggerColumn(...args: Parameters<OverrideQueryBuilder["tsvectorUpdateTriggerColumn"]>) {
    return (new QueryBuilder(this)).tsvectorUpdateTriggerColumn(...args);
  }
  txidCurrent(...args: Parameters<OverrideQueryBuilder["txidCurrent"]>) {
    return (new QueryBuilder(this)).txidCurrent(...args);
  }
  txidCurrentIfAssigned(...args: Parameters<OverrideQueryBuilder["txidCurrentIfAssigned"]>) {
    return (new QueryBuilder(this)).txidCurrentIfAssigned(...args);
  }
  txidCurrentSnapshot(...args: Parameters<OverrideQueryBuilder["txidCurrentSnapshot"]>) {
    return (new QueryBuilder(this)).txidCurrentSnapshot(...args);
  }
  txidSnapshotXip(...args: Parameters<OverrideQueryBuilder["txidSnapshotXip"]>) {
    return (new QueryBuilder(this)).txidSnapshotXip(...args);
  }
  txidSnapshotXmax(...args: Parameters<OverrideQueryBuilder["txidSnapshotXmax"]>) {
    return (new QueryBuilder(this)).txidSnapshotXmax(...args);
  }
  txidSnapshotXmin(...args: Parameters<OverrideQueryBuilder["txidSnapshotXmin"]>) {
    return (new QueryBuilder(this)).txidSnapshotXmin(...args);
  }
  txidStatus(...args: Parameters<OverrideQueryBuilder["txidStatus"]>) {
    return (new QueryBuilder(this)).txidStatus(...args);
  }
  txidVisibleInSnapshot(...args: Parameters<OverrideQueryBuilder["txidVisibleInSnapshot"]>) {
    return (new QueryBuilder(this)).txidVisibleInSnapshot(...args);
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
  unicodeAssigned(...args: Parameters<OverrideQueryBuilder["unicodeAssigned"]>) {
    return (new QueryBuilder(this)).unicodeAssigned(...args);
  }
  unicodeVersion(...args: Parameters<OverrideQueryBuilder["unicodeVersion"]>) {
    return (new QueryBuilder(this)).unicodeVersion(...args);
  }
  union(...args: Parameters<OverrideQueryBuilder["union"]>) {
    return (new QueryBuilder(this)).union(...args);
  }
  unionAll(...args: Parameters<OverrideQueryBuilder["unionAll"]>) {
    return (new QueryBuilder(this)).unionAll(...args);
  }
  unique() {
    return (new QueryBuilder(this)).unique();
  }
  unistr(...args: Parameters<OverrideQueryBuilder["unistr"]>) {
    return (new QueryBuilder(this)).unistr(...args);
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
  unnest(...args: Parameters<OverrideQueryBuilder["unnest"]>) {
    return (new QueryBuilder(this)).unnest(...args);
  }
  unnestMultirange(...args: Parameters<OverrideQueryBuilder["unnestMultirange"]>) {
    return (new QueryBuilder(this)).unnestMultirange(...args);
  }
  until() {
    return (new QueryBuilder(this)).until();
  }
  untyped() {
    return (new QueryBuilder(this)).untyped();
  }
  update(...args: Parameters<OverrideQueryBuilder["update"]>) {
    return (new QueryBuilder(this)).update(...args);
  }
  upper(...args: Parameters<OverrideQueryBuilder["upper"]>) {
    return (new QueryBuilder(this)).upper(...args);
  }
  upperInc(...args: Parameters<OverrideQueryBuilder["upperInc"]>) {
    return (new QueryBuilder(this)).upperInc(...args);
  }
  upperInf(...args: Parameters<OverrideQueryBuilder["upperInf"]>) {
    return (new QueryBuilder(this)).upperInf(...args);
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
  uuidExtractTimestamp(...args: Parameters<OverrideQueryBuilder["uuidExtractTimestamp"]>) {
    return (new QueryBuilder(this)).uuidExtractTimestamp(...args);
  }
  uuidExtractVersion(...args: Parameters<OverrideQueryBuilder["uuidExtractVersion"]>) {
    return (new QueryBuilder(this)).uuidExtractVersion(...args);
  }
  uuidv4(...args: Parameters<OverrideQueryBuilder["uuidv4"]>) {
    return (new QueryBuilder(this)).uuidv4(...args);
  }
  uuidv7(...args: Parameters<OverrideQueryBuilder["uuidv7"]>) {
    return (new QueryBuilder(this)).uuidv7(...args);
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
  values(...args: Parameters<OverrideQueryBuilder["values"]>) {
    return (new QueryBuilder(this)).values(...args);
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
  variance(...args: Parameters<OverrideQueryBuilder["variance"]>) {
    return (new QueryBuilder(this)).variance(...args);
  }
  varPop(...args: Parameters<OverrideQueryBuilder["varPop"]>) {
    return (new QueryBuilder(this)).varPop(...args);
  }
  varSamp(...args: Parameters<OverrideQueryBuilder["varSamp"]>) {
    return (new QueryBuilder(this)).varSamp(...args);
  }
  varying() {
    return (new QueryBuilder(this)).varying();
  }
  verbose() {
    return (new QueryBuilder(this)).verbose();
  }
  version() {
    return (new QueryBuilder(this)).version();
  }
  versioning() {
    return (new QueryBuilder(this)).versioning();
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
  websearchToTsquery(...args: Parameters<OverrideQueryBuilder["websearchToTsquery"]>) {
    return (new QueryBuilder(this)).websearchToTsquery(...args);
  }
  when(...args: Parameters<OverrideQueryBuilder["when"]>) {
    return (new QueryBuilder(this)).when(...args);
  }
  whenever() {
    return (new QueryBuilder(this)).whenever();
  }
  where(...args: Parameters<OverrideQueryBuilder["where"]>) {
    return (new QueryBuilder(this)).where(...args);
  }
  whitespace() {
    return (new QueryBuilder(this)).whitespace();
  }
  width(...args: Parameters<OverrideQueryBuilder["width"]>) {
    return (new QueryBuilder(this)).width(...args);
  }
  widthBucket(...args: Parameters<OverrideQueryBuilder["widthBucket"]>) {
    return (new QueryBuilder(this)).widthBucket(...args);
  }
  window() {
    return (new QueryBuilder(this)).window();
  }
  with(...args: Parameters<OverrideQueryBuilder["with"]>) {
    return (new QueryBuilder(this)).with(...args);
  }
  within() {
    return (new QueryBuilder(this)).within();
  }
  without() {
    return (new QueryBuilder(this)).without();
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
  xmlagg(...args: Parameters<OverrideQueryBuilder["xmlagg"]>) {
    return (new QueryBuilder(this)).xmlagg(...args);
  }
  xmlattributes(...args: Parameters<OverrideQueryBuilder["xmlattributes"]>) {
    return (new QueryBuilder(this)).xmlattributes(...args);
  }
  xmlbinary() {
    return (new QueryBuilder(this)).xmlbinary();
  }
  xmlcast() {
    return (new QueryBuilder(this)).xmlcast();
  }
  xmlcomment(...args: Parameters<OverrideQueryBuilder["xmlcomment"]>) {
    return (new QueryBuilder(this)).xmlcomment(...args);
  }
  xmlconcat(...args: Parameters<OverrideQueryBuilder["xmlconcat"]>) {
    return (new QueryBuilder(this)).xmlconcat(...args);
  }
  xmldeclaration() {
    return (new QueryBuilder(this)).xmldeclaration();
  }
  xmldocument() {
    return (new QueryBuilder(this)).xmldocument();
  }
  xmlelement(...args: Parameters<OverrideQueryBuilder["xmlelement"]>) {
    return (new QueryBuilder(this)).xmlelement(...args);
  }
  xmlexists() {
    return (new QueryBuilder(this)).xmlexists();
  }
  xmlExists(...args: Parameters<OverrideQueryBuilder["xmlExists"]>) {
    return (new QueryBuilder(this)).xmlExists(...args);
  }
  xmlforest(...args: Parameters<OverrideQueryBuilder["xmlforest"]>) {
    return (new QueryBuilder(this)).xmlforest(...args);
  }
  xmlIsWellFormed(...args: Parameters<OverrideQueryBuilder["xmlIsWellFormed"]>) {
    return (new QueryBuilder(this)).xmlIsWellFormed(...args);
  }
  xmlIsWellFormedContent(...args: Parameters<OverrideQueryBuilder["xmlIsWellFormedContent"]>) {
    return (new QueryBuilder(this)).xmlIsWellFormedContent(...args);
  }
  xmlIsWellFormedDocument(...args: Parameters<OverrideQueryBuilder["xmlIsWellFormedDocument"]>) {
    return (new QueryBuilder(this)).xmlIsWellFormedDocument(...args);
  }
  xmliterate() {
    return (new QueryBuilder(this)).xmliterate();
  }
  xmlnamespaces() {
    return (new QueryBuilder(this)).xmlnamespaces();
  }
  xmlparse(...args: Parameters<OverrideQueryBuilder["xmlparse"]>) {
    return (new QueryBuilder(this)).xmlparse(...args);
  }
  xmlpi(...args: Parameters<OverrideQueryBuilder["xmlpi"]>) {
    return (new QueryBuilder(this)).xmlpi(...args);
  }
  xmlquery() {
    return (new QueryBuilder(this)).xmlquery();
  }
  xmlroot(...args: Parameters<OverrideQueryBuilder["xmlroot"]>) {
    return (new QueryBuilder(this)).xmlroot(...args);
  }
  xmlschema() {
    return (new QueryBuilder(this)).xmlschema();
  }
  xmlserialize() {
    return (new QueryBuilder(this)).xmlserialize();
  }
  xmltable() {
    return (new QueryBuilder(this)).xmltable();
  }
  xmltext() {
    return (new QueryBuilder(this)).xmltext();
  }
  xmlvalidate() {
    return (new QueryBuilder(this)).xmlvalidate();
  }
  xpath(...args: Parameters<OverrideQueryBuilder["xpath"]>) {
    return (new QueryBuilder(this)).xpath(...args);
  }
  xpathExists(...args: Parameters<OverrideQueryBuilder["xpathExists"]>) {
    return (new QueryBuilder(this)).xpathExists(...args);
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
