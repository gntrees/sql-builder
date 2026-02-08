"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryInstance = void 0;
const query_builder_1 = require("../query-builder");
class QueryInstance {
    dbInstance;
    constructor(dbInstance) {
        this.dbInstance = dbInstance;
    }
    getDbInstance() {
        return this.dbInstance;
    }
    a() {
        return (new query_builder_1.QueryBuilder(this)).a();
    }
    abbrev(...args) {
        return (new query_builder_1.QueryBuilder(this)).abbrev(...args);
    }
    abort() {
        return (new query_builder_1.QueryBuilder(this)).abort();
    }
    above(...args) {
        return (new query_builder_1.QueryBuilder(this)).above(...args);
    }
    abs(...args) {
        return (new query_builder_1.QueryBuilder(this)).abs(...args);
    }
    absent() {
        return (new query_builder_1.QueryBuilder(this)).absent();
    }
    absolute() {
        return (new query_builder_1.QueryBuilder(this)).absolute();
    }
    access() {
        return (new query_builder_1.QueryBuilder(this)).access();
    }
    according() {
        return (new query_builder_1.QueryBuilder(this)).according();
    }
    acldefault(...args) {
        return (new query_builder_1.QueryBuilder(this)).acldefault(...args);
    }
    aclexplode(...args) {
        return (new query_builder_1.QueryBuilder(this)).aclexplode(...args);
    }
    acos(...args) {
        return (new query_builder_1.QueryBuilder(this)).acos(...args);
    }
    acosd(...args) {
        return (new query_builder_1.QueryBuilder(this)).acosd(...args);
    }
    acosh(...args) {
        return (new query_builder_1.QueryBuilder(this)).acosh(...args);
    }
    action() {
        return (new query_builder_1.QueryBuilder(this)).action();
    }
    ada() {
        return (new query_builder_1.QueryBuilder(this)).ada();
    }
    add() {
        return (new query_builder_1.QueryBuilder(this)).add();
    }
    admin() {
        return (new query_builder_1.QueryBuilder(this)).admin();
    }
    after() {
        return (new query_builder_1.QueryBuilder(this)).after();
    }
    age(...args) {
        return (new query_builder_1.QueryBuilder(this)).age(...args);
    }
    aggregate() {
        return (new query_builder_1.QueryBuilder(this)).aggregate();
    }
    all(...args) {
        return (new query_builder_1.QueryBuilder(this)).all(...args);
    }
    allocate() {
        return (new query_builder_1.QueryBuilder(this)).allocate();
    }
    also() {
        return (new query_builder_1.QueryBuilder(this)).also();
    }
    alter() {
        return (new query_builder_1.QueryBuilder(this)).alter();
    }
    always() {
        return (new query_builder_1.QueryBuilder(this)).always();
    }
    analyse() {
        return (new query_builder_1.QueryBuilder(this)).analyse();
    }
    analyze() {
        return (new query_builder_1.QueryBuilder(this)).analyze();
    }
    and(...args) {
        return (new query_builder_1.QueryBuilder(this)).and(...args);
    }
    any(...args) {
        return (new query_builder_1.QueryBuilder(this)).any(...args);
    }
    anyValue(...args) {
        return (new query_builder_1.QueryBuilder(this)).anyValue(...args);
    }
    are() {
        return (new query_builder_1.QueryBuilder(this)).are();
    }
    area(...args) {
        return (new query_builder_1.QueryBuilder(this)).area(...args);
    }
    array() {
        return (new query_builder_1.QueryBuilder(this)).array();
    }
    arrayAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayAgg(...args);
    }
    arrayAppend(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayAppend(...args);
    }
    arrayCat(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayCat(...args);
    }
    arrayDims(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayDims(...args);
    }
    arrayFill(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayFill(...args);
    }
    arrayLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayLength(...args);
    }
    arrayLower(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayLower(...args);
    }
    arraymaxcardinality() {
        return (new query_builder_1.QueryBuilder(this)).arraymaxcardinality();
    }
    arrayNdims(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayNdims(...args);
    }
    arrayPosition(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayPosition(...args);
    }
    arrayPositions(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayPositions(...args);
    }
    arrayPrepend(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayPrepend(...args);
    }
    arrayRemove(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayRemove(...args);
    }
    arrayReplace(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayReplace(...args);
    }
    arrayReverse(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayReverse(...args);
    }
    arraySample(...args) {
        return (new query_builder_1.QueryBuilder(this)).arraySample(...args);
    }
    arrayShuffle(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayShuffle(...args);
    }
    arraySort(...args) {
        return (new query_builder_1.QueryBuilder(this)).arraySort(...args);
    }
    arrayToJson(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayToJson(...args);
    }
    arrayToString(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayToString(...args);
    }
    arrayToTsvector(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayToTsvector(...args);
    }
    arrayUpper(...args) {
        return (new query_builder_1.QueryBuilder(this)).arrayUpper(...args);
    }
    as(...args) {
        return (new query_builder_1.QueryBuilder(this)).as(...args);
    }
    asc(...args) {
        return (new query_builder_1.QueryBuilder(this)).asc(...args);
    }
    ascii(...args) {
        return (new query_builder_1.QueryBuilder(this)).ascii(...args);
    }
    asensitive() {
        return (new query_builder_1.QueryBuilder(this)).asensitive();
    }
    asin(...args) {
        return (new query_builder_1.QueryBuilder(this)).asin(...args);
    }
    asind(...args) {
        return (new query_builder_1.QueryBuilder(this)).asind(...args);
    }
    asinh(...args) {
        return (new query_builder_1.QueryBuilder(this)).asinh(...args);
    }
    assertion() {
        return (new query_builder_1.QueryBuilder(this)).assertion();
    }
    assignment() {
        return (new query_builder_1.QueryBuilder(this)).assignment();
    }
    asymmetric() {
        return (new query_builder_1.QueryBuilder(this)).asymmetric();
    }
    at() {
        return (new query_builder_1.QueryBuilder(this)).at();
    }
    atan(...args) {
        return (new query_builder_1.QueryBuilder(this)).atan(...args);
    }
    atan2(...args) {
        return (new query_builder_1.QueryBuilder(this)).atan2(...args);
    }
    atan2d(...args) {
        return (new query_builder_1.QueryBuilder(this)).atan2d(...args);
    }
    atand(...args) {
        return (new query_builder_1.QueryBuilder(this)).atand(...args);
    }
    atanh(...args) {
        return (new query_builder_1.QueryBuilder(this)).atanh(...args);
    }
    atLocal(...args) {
        return (new query_builder_1.QueryBuilder(this)).atLocal(...args);
    }
    atLocalIdentifier(...args) {
        return (new query_builder_1.QueryBuilder(this)).atLocalIdentifier(...args);
    }
    atomic() {
        return (new query_builder_1.QueryBuilder(this)).atomic();
    }
    atSign(...args) {
        return (new query_builder_1.QueryBuilder(this)).atSign(...args);
    }
    attach() {
        return (new query_builder_1.QueryBuilder(this)).attach();
    }
    atTimeZone(...args) {
        return (new query_builder_1.QueryBuilder(this)).atTimeZone(...args);
    }
    atTimeZoneIdentifier(...args) {
        return (new query_builder_1.QueryBuilder(this)).atTimeZoneIdentifier(...args);
    }
    attribute() {
        return (new query_builder_1.QueryBuilder(this)).attribute();
    }
    attributes() {
        return (new query_builder_1.QueryBuilder(this)).attributes();
    }
    authorization() {
        return (new query_builder_1.QueryBuilder(this)).authorization();
    }
    avg(...args) {
        return (new query_builder_1.QueryBuilder(this)).avg(...args);
    }
    backward() {
        return (new query_builder_1.QueryBuilder(this)).backward();
    }
    base64() {
        return (new query_builder_1.QueryBuilder(this)).base64();
    }
    before() {
        return (new query_builder_1.QueryBuilder(this)).before();
    }
    begin() {
        return (new query_builder_1.QueryBuilder(this)).begin();
    }
    beginFrame() {
        return (new query_builder_1.QueryBuilder(this)).beginFrame();
    }
    beginPartition() {
        return (new query_builder_1.QueryBuilder(this)).beginPartition();
    }
    beginTransaction(...args) {
        return (new query_builder_1.QueryBuilder(this)).beginTransaction(...args);
    }
    below(...args) {
        return (new query_builder_1.QueryBuilder(this)).below(...args);
    }
    bernoulli() {
        return (new query_builder_1.QueryBuilder(this)).bernoulli();
    }
    between() {
        return (new query_builder_1.QueryBuilder(this)).between();
    }
    bigint() {
        return (new query_builder_1.QueryBuilder(this)).bigint();
    }
    binary() {
        return (new query_builder_1.QueryBuilder(this)).binary();
    }
    bit() {
        return (new query_builder_1.QueryBuilder(this)).bit();
    }
    bitAnd(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitAnd(...args);
    }
    bitCount(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitCount(...args);
    }
    bitLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitLength(...args);
    }
    bitOr(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitOr(...args);
    }
    bitwiseAnd(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitwiseAnd(...args);
    }
    bitwiseLeftShift(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitwiseLeftShift(...args);
    }
    bitwiseLeftShiftAssign(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitwiseLeftShiftAssign(...args);
    }
    bitwiseOr(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitwiseOr(...args);
    }
    bitwiseRightShift(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitwiseRightShift(...args);
    }
    bitwiseRightShiftAssign(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitwiseRightShiftAssign(...args);
    }
    bitwiseXor(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitwiseXor(...args);
    }
    bitXor(...args) {
        return (new query_builder_1.QueryBuilder(this)).bitXor(...args);
    }
    blob() {
        return (new query_builder_1.QueryBuilder(this)).blob();
    }
    blocked() {
        return (new query_builder_1.QueryBuilder(this)).blocked();
    }
    bom() {
        return (new query_builder_1.QueryBuilder(this)).bom();
    }
    boolAnd(...args) {
        return (new query_builder_1.QueryBuilder(this)).boolAnd(...args);
    }
    boolean() {
        return (new query_builder_1.QueryBuilder(this)).boolean();
    }
    boolOr(...args) {
        return (new query_builder_1.QueryBuilder(this)).boolOr(...args);
    }
    both() {
        return (new query_builder_1.QueryBuilder(this)).both();
    }
    boundBox(...args) {
        return (new query_builder_1.QueryBuilder(this)).boundBox(...args);
    }
    box(...args) {
        return (new query_builder_1.QueryBuilder(this)).box(...args);
    }
    breadth() {
        return (new query_builder_1.QueryBuilder(this)).breadth();
    }
    brinDesummarizeRange(...args) {
        return (new query_builder_1.QueryBuilder(this)).brinDesummarizeRange(...args);
    }
    brinSummarizeNewValues(...args) {
        return (new query_builder_1.QueryBuilder(this)).brinSummarizeNewValues(...args);
    }
    brinSummarizeRange(...args) {
        return (new query_builder_1.QueryBuilder(this)).brinSummarizeRange(...args);
    }
    broadcast(...args) {
        return (new query_builder_1.QueryBuilder(this)).broadcast(...args);
    }
    btrim(...args) {
        return (new query_builder_1.QueryBuilder(this)).btrim(...args);
    }
    by() {
        return (new query_builder_1.QueryBuilder(this)).by();
    }
    byteaConcat(...args) {
        return (new query_builder_1.QueryBuilder(this)).byteaConcat(...args);
    }
    c(...args) {
        return (new query_builder_1.QueryBuilder(this)).c(...args);
    }
    cache() {
        return (new query_builder_1.QueryBuilder(this)).cache();
    }
    call() {
        return (new query_builder_1.QueryBuilder(this)).call();
    }
    called() {
        return (new query_builder_1.QueryBuilder(this)).called();
    }
    cardinality(...args) {
        return (new query_builder_1.QueryBuilder(this)).cardinality(...args);
    }
    caretAt(...args) {
        return (new query_builder_1.QueryBuilder(this)).caretAt(...args);
    }
    cascade() {
        return (new query_builder_1.QueryBuilder(this)).cascade();
    }
    cascaded() {
        return (new query_builder_1.QueryBuilder(this)).cascaded();
    }
    case(...args) {
        return (new query_builder_1.QueryBuilder(this)).case(...args);
    }
    casefold(...args) {
        return (new query_builder_1.QueryBuilder(this)).casefold(...args);
    }
    cast() {
        return (new query_builder_1.QueryBuilder(this)).cast();
    }
    catalog() {
        return (new query_builder_1.QueryBuilder(this)).catalog();
    }
    catalogName() {
        return (new query_builder_1.QueryBuilder(this)).catalogName();
    }
    cbrt(...args) {
        return (new query_builder_1.QueryBuilder(this)).cbrt(...args);
    }
    ceil(...args) {
        return (new query_builder_1.QueryBuilder(this)).ceil(...args);
    }
    ceiling(...args) {
        return (new query_builder_1.QueryBuilder(this)).ceiling(...args);
    }
    center(...args) {
        return (new query_builder_1.QueryBuilder(this)).center(...args);
    }
    chain() {
        return (new query_builder_1.QueryBuilder(this)).chain();
    }
    chaining() {
        return (new query_builder_1.QueryBuilder(this)).chaining();
    }
    char() {
        return (new query_builder_1.QueryBuilder(this)).char();
    }
    character() {
        return (new query_builder_1.QueryBuilder(this)).character();
    }
    characteristics() {
        return (new query_builder_1.QueryBuilder(this)).characteristics();
    }
    characterLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).characterLength(...args);
    }
    characters() {
        return (new query_builder_1.QueryBuilder(this)).characters();
    }
    charactersetcatalog() {
        return (new query_builder_1.QueryBuilder(this)).charactersetcatalog();
    }
    characterSetName() {
        return (new query_builder_1.QueryBuilder(this)).characterSetName();
    }
    characterSetSchema() {
        return (new query_builder_1.QueryBuilder(this)).characterSetSchema();
    }
    charLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).charLength(...args);
    }
    check() {
        return (new query_builder_1.QueryBuilder(this)).check();
    }
    checkpoint() {
        return (new query_builder_1.QueryBuilder(this)).checkpoint();
    }
    chr(...args) {
        return (new query_builder_1.QueryBuilder(this)).chr(...args);
    }
    circle(...args) {
        return (new query_builder_1.QueryBuilder(this)).circle(...args);
    }
    class() {
        return (new query_builder_1.QueryBuilder(this)).class();
    }
    classifier() {
        return (new query_builder_1.QueryBuilder(this)).classifier();
    }
    classOrigin() {
        return (new query_builder_1.QueryBuilder(this)).classOrigin();
    }
    clob() {
        return (new query_builder_1.QueryBuilder(this)).clob();
    }
    clockTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).clockTimestamp(...args);
    }
    close() {
        return (new query_builder_1.QueryBuilder(this)).close();
    }
    closestPoint(...args) {
        return (new query_builder_1.QueryBuilder(this)).closestPoint(...args);
    }
    cluster() {
        return (new query_builder_1.QueryBuilder(this)).cluster();
    }
    coalesce(...args) {
        return (new query_builder_1.QueryBuilder(this)).coalesce(...args);
    }
    cobol() {
        return (new query_builder_1.QueryBuilder(this)).cobol();
    }
    colDescription(...args) {
        return (new query_builder_1.QueryBuilder(this)).colDescription(...args);
    }
    collate() {
        return (new query_builder_1.QueryBuilder(this)).collate();
    }
    collation() {
        return (new query_builder_1.QueryBuilder(this)).collation();
    }
    collationCatalog() {
        return (new query_builder_1.QueryBuilder(this)).collationCatalog();
    }
    collationName() {
        return (new query_builder_1.QueryBuilder(this)).collationName();
    }
    collationSchema() {
        return (new query_builder_1.QueryBuilder(this)).collationSchema();
    }
    collect() {
        return (new query_builder_1.QueryBuilder(this)).collect();
    }
    column(...args) {
        return (new query_builder_1.QueryBuilder(this)).column(...args);
    }
    columnName() {
        return (new query_builder_1.QueryBuilder(this)).columnName();
    }
    columns() {
        return (new query_builder_1.QueryBuilder(this)).columns();
    }
    comma(...args) {
        return (new query_builder_1.QueryBuilder(this)).comma(...args);
    }
    commandFunction() {
        return (new query_builder_1.QueryBuilder(this)).commandFunction();
    }
    commandfunctioncode() {
        return (new query_builder_1.QueryBuilder(this)).commandfunctioncode();
    }
    comment() {
        return (new query_builder_1.QueryBuilder(this)).comment();
    }
    comments() {
        return (new query_builder_1.QueryBuilder(this)).comments();
    }
    commit() {
        return (new query_builder_1.QueryBuilder(this)).commit();
    }
    committed() {
        return (new query_builder_1.QueryBuilder(this)).committed();
    }
    commitTransaction(...args) {
        return (new query_builder_1.QueryBuilder(this)).commitTransaction(...args);
    }
    compression() {
        return (new query_builder_1.QueryBuilder(this)).compression();
    }
    concat(...args) {
        return (new query_builder_1.QueryBuilder(this)).concat(...args);
    }
    concatWs(...args) {
        return (new query_builder_1.QueryBuilder(this)).concatWs(...args);
    }
    concurrently() {
        return (new query_builder_1.QueryBuilder(this)).concurrently();
    }
    condition() {
        return (new query_builder_1.QueryBuilder(this)).condition();
    }
    conditional() {
        return (new query_builder_1.QueryBuilder(this)).conditional();
    }
    conditionNumber() {
        return (new query_builder_1.QueryBuilder(this)).conditionNumber();
    }
    configuration() {
        return (new query_builder_1.QueryBuilder(this)).configuration();
    }
    conflict() {
        return (new query_builder_1.QueryBuilder(this)).conflict();
    }
    connect() {
        return (new query_builder_1.QueryBuilder(this)).connect();
    }
    connection() {
        return (new query_builder_1.QueryBuilder(this)).connection();
    }
    connectionName() {
        return (new query_builder_1.QueryBuilder(this)).connectionName();
    }
    constraint() {
        return (new query_builder_1.QueryBuilder(this)).constraint();
    }
    constraintCatalog() {
        return (new query_builder_1.QueryBuilder(this)).constraintCatalog();
    }
    constraintName() {
        return (new query_builder_1.QueryBuilder(this)).constraintName();
    }
    constraints() {
        return (new query_builder_1.QueryBuilder(this)).constraints();
    }
    constraintSchema() {
        return (new query_builder_1.QueryBuilder(this)).constraintSchema();
    }
    constructorKeyword() {
        return (new query_builder_1.QueryBuilder(this)).constructorKeyword();
    }
    containedBy(...args) {
        return (new query_builder_1.QueryBuilder(this)).containedBy(...args);
    }
    containment(...args) {
        return (new query_builder_1.QueryBuilder(this)).containment(...args);
    }
    contains() {
        return (new query_builder_1.QueryBuilder(this)).contains();
    }
    content() {
        return (new query_builder_1.QueryBuilder(this)).content();
    }
    continue() {
        return (new query_builder_1.QueryBuilder(this)).continue();
    }
    control() {
        return (new query_builder_1.QueryBuilder(this)).control();
    }
    conversion() {
        return (new query_builder_1.QueryBuilder(this)).conversion();
    }
    convert(...args) {
        return (new query_builder_1.QueryBuilder(this)).convert(...args);
    }
    convertFrom(...args) {
        return (new query_builder_1.QueryBuilder(this)).convertFrom(...args);
    }
    convertTo(...args) {
        return (new query_builder_1.QueryBuilder(this)).convertTo(...args);
    }
    copartition() {
        return (new query_builder_1.QueryBuilder(this)).copartition();
    }
    copy() {
        return (new query_builder_1.QueryBuilder(this)).copy();
    }
    corr(...args) {
        return (new query_builder_1.QueryBuilder(this)).corr(...args);
    }
    corresponding() {
        return (new query_builder_1.QueryBuilder(this)).corresponding();
    }
    cos(...args) {
        return (new query_builder_1.QueryBuilder(this)).cos(...args);
    }
    cosd(...args) {
        return (new query_builder_1.QueryBuilder(this)).cosd(...args);
    }
    cosh(...args) {
        return (new query_builder_1.QueryBuilder(this)).cosh(...args);
    }
    cost() {
        return (new query_builder_1.QueryBuilder(this)).cost();
    }
    cot(...args) {
        return (new query_builder_1.QueryBuilder(this)).cot(...args);
    }
    cotd(...args) {
        return (new query_builder_1.QueryBuilder(this)).cotd(...args);
    }
    count(...args) {
        return (new query_builder_1.QueryBuilder(this)).count(...args);
    }
    covarPop(...args) {
        return (new query_builder_1.QueryBuilder(this)).covarPop(...args);
    }
    covarSamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).covarSamp(...args);
    }
    crc32(...args) {
        return (new query_builder_1.QueryBuilder(this)).crc32(...args);
    }
    crc32c(...args) {
        return (new query_builder_1.QueryBuilder(this)).crc32c(...args);
    }
    create() {
        return (new query_builder_1.QueryBuilder(this)).create();
    }
    cross() {
        return (new query_builder_1.QueryBuilder(this)).cross();
    }
    crosses(...args) {
        return (new query_builder_1.QueryBuilder(this)).crosses(...args);
    }
    crossJoin(...args) {
        return (new query_builder_1.QueryBuilder(this)).crossJoin(...args);
    }
    crossJoinLateral(...args) {
        return (new query_builder_1.QueryBuilder(this)).crossJoinLateral(...args);
    }
    csv() {
        return (new query_builder_1.QueryBuilder(this)).csv();
    }
    cube() {
        return (new query_builder_1.QueryBuilder(this)).cube();
    }
    cumeDist(...args) {
        return (new query_builder_1.QueryBuilder(this)).cumeDist(...args);
    }
    current() {
        return (new query_builder_1.QueryBuilder(this)).current();
    }
    currentCatalog() {
        return (new query_builder_1.QueryBuilder(this)).currentCatalog();
    }
    currentDatabase(...args) {
        return (new query_builder_1.QueryBuilder(this)).currentDatabase(...args);
    }
    currentDate() {
        return (new query_builder_1.QueryBuilder(this)).currentDate();
    }
    currentdefaulttransformgroup() {
        return (new query_builder_1.QueryBuilder(this)).currentdefaulttransformgroup();
    }
    currentPath() {
        return (new query_builder_1.QueryBuilder(this)).currentPath();
    }
    currentQuery(...args) {
        return (new query_builder_1.QueryBuilder(this)).currentQuery(...args);
    }
    currentRole() {
        return (new query_builder_1.QueryBuilder(this)).currentRole();
    }
    currentRow() {
        return (new query_builder_1.QueryBuilder(this)).currentRow();
    }
    currentSchema() {
        return (new query_builder_1.QueryBuilder(this)).currentSchema();
    }
    currentSchemas(...args) {
        return (new query_builder_1.QueryBuilder(this)).currentSchemas(...args);
    }
    currentSetting(...args) {
        return (new query_builder_1.QueryBuilder(this)).currentSetting(...args);
    }
    currentTime(...args) {
        return (new query_builder_1.QueryBuilder(this)).currentTime(...args);
    }
    currentTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).currentTimestamp(...args);
    }
    currenttransformgroupfortype() {
        return (new query_builder_1.QueryBuilder(this)).currenttransformgroupfortype();
    }
    currentUser() {
        return (new query_builder_1.QueryBuilder(this)).currentUser();
    }
    currval(...args) {
        return (new query_builder_1.QueryBuilder(this)).currval(...args);
    }
    cursor() {
        return (new query_builder_1.QueryBuilder(this)).cursor();
    }
    cursorName() {
        return (new query_builder_1.QueryBuilder(this)).cursorName();
    }
    cursorToXml(...args) {
        return (new query_builder_1.QueryBuilder(this)).cursorToXml(...args);
    }
    cursorToXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).cursorToXmlschema(...args);
    }
    cycle() {
        return (new query_builder_1.QueryBuilder(this)).cycle();
    }
    data() {
        return (new query_builder_1.QueryBuilder(this)).data();
    }
    database() {
        return (new query_builder_1.QueryBuilder(this)).database();
    }
    databaseToXml(...args) {
        return (new query_builder_1.QueryBuilder(this)).databaseToXml(...args);
    }
    databaseToXmlAndXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).databaseToXmlAndXmlschema(...args);
    }
    databaseToXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).databaseToXmlschema(...args);
    }
    datalink() {
        return (new query_builder_1.QueryBuilder(this)).datalink();
    }
    date() {
        return (new query_builder_1.QueryBuilder(this)).date();
    }
    dateAdd(...args) {
        return (new query_builder_1.QueryBuilder(this)).dateAdd(...args);
    }
    dateBin(...args) {
        return (new query_builder_1.QueryBuilder(this)).dateBin(...args);
    }
    datePart(...args) {
        return (new query_builder_1.QueryBuilder(this)).datePart(...args);
    }
    dateSubtract(...args) {
        return (new query_builder_1.QueryBuilder(this)).dateSubtract(...args);
    }
    datetimeintervalcode() {
        return (new query_builder_1.QueryBuilder(this)).datetimeintervalcode();
    }
    datetimeintervalprecision() {
        return (new query_builder_1.QueryBuilder(this)).datetimeintervalprecision();
    }
    dateTrunc(...args) {
        return (new query_builder_1.QueryBuilder(this)).dateTrunc(...args);
    }
    day() {
        return (new query_builder_1.QueryBuilder(this)).day();
    }
    db() {
        return (new query_builder_1.QueryBuilder(this)).db();
    }
    deallocate() {
        return (new query_builder_1.QueryBuilder(this)).deallocate();
    }
    dec() {
        return (new query_builder_1.QueryBuilder(this)).dec();
    }
    decfloat() {
        return (new query_builder_1.QueryBuilder(this)).decfloat();
    }
    decimal() {
        return (new query_builder_1.QueryBuilder(this)).decimal();
    }
    declare() {
        return (new query_builder_1.QueryBuilder(this)).declare();
    }
    decode(...args) {
        return (new query_builder_1.QueryBuilder(this)).decode(...args);
    }
    default() {
        return (new query_builder_1.QueryBuilder(this)).default();
    }
    defaults() {
        return (new query_builder_1.QueryBuilder(this)).defaults();
    }
    deferrable() {
        return (new query_builder_1.QueryBuilder(this)).deferrable();
    }
    deferred() {
        return (new query_builder_1.QueryBuilder(this)).deferred();
    }
    define() {
        return (new query_builder_1.QueryBuilder(this)).define();
    }
    defined() {
        return (new query_builder_1.QueryBuilder(this)).defined();
    }
    definer() {
        return (new query_builder_1.QueryBuilder(this)).definer();
    }
    degree() {
        return (new query_builder_1.QueryBuilder(this)).degree();
    }
    degrees(...args) {
        return (new query_builder_1.QueryBuilder(this)).degrees(...args);
    }
    delete(...args) {
        return (new query_builder_1.QueryBuilder(this)).delete(...args);
    }
    delimiter() {
        return (new query_builder_1.QueryBuilder(this)).delimiter();
    }
    delimiters() {
        return (new query_builder_1.QueryBuilder(this)).delimiters();
    }
    denseRank(...args) {
        return (new query_builder_1.QueryBuilder(this)).denseRank(...args);
    }
    depends() {
        return (new query_builder_1.QueryBuilder(this)).depends();
    }
    depth() {
        return (new query_builder_1.QueryBuilder(this)).depth();
    }
    deref() {
        return (new query_builder_1.QueryBuilder(this)).deref();
    }
    derived() {
        return (new query_builder_1.QueryBuilder(this)).derived();
    }
    desc(...args) {
        return (new query_builder_1.QueryBuilder(this)).desc(...args);
    }
    describe() {
        return (new query_builder_1.QueryBuilder(this)).describe();
    }
    descriptor() {
        return (new query_builder_1.QueryBuilder(this)).descriptor();
    }
    detach() {
        return (new query_builder_1.QueryBuilder(this)).detach();
    }
    deterministic() {
        return (new query_builder_1.QueryBuilder(this)).deterministic();
    }
    diagnostics() {
        return (new query_builder_1.QueryBuilder(this)).diagnostics();
    }
    diagonal(...args) {
        return (new query_builder_1.QueryBuilder(this)).diagonal(...args);
    }
    diameter(...args) {
        return (new query_builder_1.QueryBuilder(this)).diameter(...args);
    }
    dictionary() {
        return (new query_builder_1.QueryBuilder(this)).dictionary();
    }
    disable() {
        return (new query_builder_1.QueryBuilder(this)).disable();
    }
    discard() {
        return (new query_builder_1.QueryBuilder(this)).discard();
    }
    disconnect() {
        return (new query_builder_1.QueryBuilder(this)).disconnect();
    }
    dispatch() {
        return (new query_builder_1.QueryBuilder(this)).dispatch();
    }
    distance(...args) {
        return (new query_builder_1.QueryBuilder(this)).distance(...args);
    }
    distinct() {
        return (new query_builder_1.QueryBuilder(this)).distinct();
    }
    div(...args) {
        return (new query_builder_1.QueryBuilder(this)).div(...args);
    }
    divide(...args) {
        return (new query_builder_1.QueryBuilder(this)).divide(...args);
    }
    dlnewcopy() {
        return (new query_builder_1.QueryBuilder(this)).dlnewcopy();
    }
    dlpreviouscopy() {
        return (new query_builder_1.QueryBuilder(this)).dlpreviouscopy();
    }
    dlurlcomplete() {
        return (new query_builder_1.QueryBuilder(this)).dlurlcomplete();
    }
    dlurlcompleteonly() {
        return (new query_builder_1.QueryBuilder(this)).dlurlcompleteonly();
    }
    dlurlcompletewrite() {
        return (new query_builder_1.QueryBuilder(this)).dlurlcompletewrite();
    }
    dlurlpath() {
        return (new query_builder_1.QueryBuilder(this)).dlurlpath();
    }
    dlurlpathonly() {
        return (new query_builder_1.QueryBuilder(this)).dlurlpathonly();
    }
    dlurlpathwrite() {
        return (new query_builder_1.QueryBuilder(this)).dlurlpathwrite();
    }
    dlurlscheme() {
        return (new query_builder_1.QueryBuilder(this)).dlurlscheme();
    }
    dlurlserver() {
        return (new query_builder_1.QueryBuilder(this)).dlurlserver();
    }
    dlvalue() {
        return (new query_builder_1.QueryBuilder(this)).dlvalue();
    }
    do() {
        return (new query_builder_1.QueryBuilder(this)).do();
    }
    document() {
        return (new query_builder_1.QueryBuilder(this)).document();
    }
    domain() {
        return (new query_builder_1.QueryBuilder(this)).domain();
    }
    double() {
        return (new query_builder_1.QueryBuilder(this)).double();
    }
    drop() {
        return (new query_builder_1.QueryBuilder(this)).drop();
    }
    dynamic() {
        return (new query_builder_1.QueryBuilder(this)).dynamic();
    }
    dynamicFunction() {
        return (new query_builder_1.QueryBuilder(this)).dynamicFunction();
    }
    dynamicfunctioncode() {
        return (new query_builder_1.QueryBuilder(this)).dynamicfunctioncode();
    }
    each() {
        return (new query_builder_1.QueryBuilder(this)).each();
    }
    element() {
        return (new query_builder_1.QueryBuilder(this)).element();
    }
    else(...args) {
        return (new query_builder_1.QueryBuilder(this)).else(...args);
    }
    empty() {
        return (new query_builder_1.QueryBuilder(this)).empty();
    }
    enable() {
        return (new query_builder_1.QueryBuilder(this)).enable();
    }
    encode(...args) {
        return (new query_builder_1.QueryBuilder(this)).encode(...args);
    }
    encoding() {
        return (new query_builder_1.QueryBuilder(this)).encoding();
    }
    encrypted() {
        return (new query_builder_1.QueryBuilder(this)).encrypted();
    }
    end() {
        return (new query_builder_1.QueryBuilder(this)).end();
    }
    endExec() {
        return (new query_builder_1.QueryBuilder(this)).endExec();
    }
    endFrame() {
        return (new query_builder_1.QueryBuilder(this)).endFrame();
    }
    endPartition() {
        return (new query_builder_1.QueryBuilder(this)).endPartition();
    }
    enforced() {
        return (new query_builder_1.QueryBuilder(this)).enforced();
    }
    enum() {
        return (new query_builder_1.QueryBuilder(this)).enum();
    }
    enumFirst(...args) {
        return (new query_builder_1.QueryBuilder(this)).enumFirst(...args);
    }
    enumLast(...args) {
        return (new query_builder_1.QueryBuilder(this)).enumLast(...args);
    }
    enumRange(...args) {
        return (new query_builder_1.QueryBuilder(this)).enumRange(...args);
    }
    eq(...args) {
        return (new query_builder_1.QueryBuilder(this)).eq(...args);
    }
    equals() {
        return (new query_builder_1.QueryBuilder(this)).equals();
    }
    erf(...args) {
        return (new query_builder_1.QueryBuilder(this)).erf(...args);
    }
    erfc(...args) {
        return (new query_builder_1.QueryBuilder(this)).erfc(...args);
    }
    error() {
        return (new query_builder_1.QueryBuilder(this)).error();
    }
    escape(...args) {
        return (new query_builder_1.QueryBuilder(this)).escape(...args);
    }
    event() {
        return (new query_builder_1.QueryBuilder(this)).event();
    }
    every(...args) {
        return (new query_builder_1.QueryBuilder(this)).every(...args);
    }
    except(...args) {
        return (new query_builder_1.QueryBuilder(this)).except(...args);
    }
    exceptAll(...args) {
        return (new query_builder_1.QueryBuilder(this)).exceptAll(...args);
    }
    exception() {
        return (new query_builder_1.QueryBuilder(this)).exception();
    }
    exclamation(...args) {
        return (new query_builder_1.QueryBuilder(this)).exclamation(...args);
    }
    exclude() {
        return (new query_builder_1.QueryBuilder(this)).exclude();
    }
    excluding() {
        return (new query_builder_1.QueryBuilder(this)).excluding();
    }
    exclusive() {
        return (new query_builder_1.QueryBuilder(this)).exclusive();
    }
    execKeyword() {
        return (new query_builder_1.QueryBuilder(this)).execKeyword();
    }
    executeKeyword() {
        return (new query_builder_1.QueryBuilder(this)).executeKeyword();
    }
    exists(...args) {
        return (new query_builder_1.QueryBuilder(this)).exists(...args);
    }
    exp(...args) {
        return (new query_builder_1.QueryBuilder(this)).exp(...args);
    }
    explain() {
        return (new query_builder_1.QueryBuilder(this)).explain();
    }
    expression() {
        return (new query_builder_1.QueryBuilder(this)).expression();
    }
    extension() {
        return (new query_builder_1.QueryBuilder(this)).extension();
    }
    external() {
        return (new query_builder_1.QueryBuilder(this)).external();
    }
    extract(...args) {
        return (new query_builder_1.QueryBuilder(this)).extract(...args);
    }
    factorial(...args) {
        return (new query_builder_1.QueryBuilder(this)).factorial(...args);
    }
    false() {
        return (new query_builder_1.QueryBuilder(this)).false();
    }
    family() {
        return (new query_builder_1.QueryBuilder(this)).family();
    }
    fetch(...args) {
        return (new query_builder_1.QueryBuilder(this)).fetch(...args);
    }
    file() {
        return (new query_builder_1.QueryBuilder(this)).file();
    }
    filter() {
        return (new query_builder_1.QueryBuilder(this)).filter();
    }
    final() {
        return (new query_builder_1.QueryBuilder(this)).final();
    }
    finalize() {
        return (new query_builder_1.QueryBuilder(this)).finalize();
    }
    finish() {
        return (new query_builder_1.QueryBuilder(this)).finish();
    }
    first() {
        return (new query_builder_1.QueryBuilder(this)).first();
    }
    firstValue(...args) {
        return (new query_builder_1.QueryBuilder(this)).firstValue(...args);
    }
    flag() {
        return (new query_builder_1.QueryBuilder(this)).flag();
    }
    float() {
        return (new query_builder_1.QueryBuilder(this)).float();
    }
    floor(...args) {
        return (new query_builder_1.QueryBuilder(this)).floor(...args);
    }
    following() {
        return (new query_builder_1.QueryBuilder(this)).following();
    }
    for() {
        return (new query_builder_1.QueryBuilder(this)).for();
    }
    force() {
        return (new query_builder_1.QueryBuilder(this)).force();
    }
    foreign() {
        return (new query_builder_1.QueryBuilder(this)).foreign();
    }
    format(...args) {
        return (new query_builder_1.QueryBuilder(this)).format(...args);
    }
    formatType(...args) {
        return (new query_builder_1.QueryBuilder(this)).formatType(...args);
    }
    fortran() {
        return (new query_builder_1.QueryBuilder(this)).fortran();
    }
    forward() {
        return (new query_builder_1.QueryBuilder(this)).forward();
    }
    found() {
        return (new query_builder_1.QueryBuilder(this)).found();
    }
    frameRow() {
        return (new query_builder_1.QueryBuilder(this)).frameRow();
    }
    free() {
        return (new query_builder_1.QueryBuilder(this)).free();
    }
    freeze() {
        return (new query_builder_1.QueryBuilder(this)).freeze();
    }
    from(...args) {
        return (new query_builder_1.QueryBuilder(this)).from(...args);
    }
    fs() {
        return (new query_builder_1.QueryBuilder(this)).fs();
    }
    fulfill() {
        return (new query_builder_1.QueryBuilder(this)).fulfill();
    }
    full() {
        return (new query_builder_1.QueryBuilder(this)).full();
    }
    fullJoin(...args) {
        return (new query_builder_1.QueryBuilder(this)).fullJoin(...args);
    }
    function() {
        return (new query_builder_1.QueryBuilder(this)).function();
    }
    functions() {
        return (new query_builder_1.QueryBuilder(this)).functions();
    }
    fusion() {
        return (new query_builder_1.QueryBuilder(this)).fusion();
    }
    g() {
        return (new query_builder_1.QueryBuilder(this)).g();
    }
    gamma(...args) {
        return (new query_builder_1.QueryBuilder(this)).gamma(...args);
    }
    gcd(...args) {
        return (new query_builder_1.QueryBuilder(this)).gcd(...args);
    }
    general() {
        return (new query_builder_1.QueryBuilder(this)).general();
    }
    generated() {
        return (new query_builder_1.QueryBuilder(this)).generated();
    }
    generateSeries(...args) {
        return (new query_builder_1.QueryBuilder(this)).generateSeries(...args);
    }
    generateSubscripts(...args) {
        return (new query_builder_1.QueryBuilder(this)).generateSubscripts(...args);
    }
    genRandomUuid(...args) {
        return (new query_builder_1.QueryBuilder(this)).genRandomUuid(...args);
    }
    get() {
        return (new query_builder_1.QueryBuilder(this)).get();
    }
    getBit(...args) {
        return (new query_builder_1.QueryBuilder(this)).getBit(...args);
    }
    getByte(...args) {
        return (new query_builder_1.QueryBuilder(this)).getByte(...args);
    }
    getCurrentTsConfig(...args) {
        return (new query_builder_1.QueryBuilder(this)).getCurrentTsConfig(...args);
    }
    ginCleanPendingList(...args) {
        return (new query_builder_1.QueryBuilder(this)).ginCleanPendingList(...args);
    }
    global() {
        return (new query_builder_1.QueryBuilder(this)).global();
    }
    go() {
        return (new query_builder_1.QueryBuilder(this)).go();
    }
    goto() {
        return (new query_builder_1.QueryBuilder(this)).goto();
    }
    grant() {
        return (new query_builder_1.QueryBuilder(this)).grant();
    }
    granted() {
        return (new query_builder_1.QueryBuilder(this)).granted();
    }
    greatest(...args) {
        return (new query_builder_1.QueryBuilder(this)).greatest(...args);
    }
    group() {
        return (new query_builder_1.QueryBuilder(this)).group();
    }
    groupBy(...args) {
        return (new query_builder_1.QueryBuilder(this)).groupBy(...args);
    }
    grouping(...args) {
        return (new query_builder_1.QueryBuilder(this)).grouping(...args);
    }
    groups() {
        return (new query_builder_1.QueryBuilder(this)).groups();
    }
    gt(...args) {
        return (new query_builder_1.QueryBuilder(this)).gt(...args);
    }
    gte(...args) {
        return (new query_builder_1.QueryBuilder(this)).gte(...args);
    }
    handler() {
        return (new query_builder_1.QueryBuilder(this)).handler();
    }
    hasAnyColumnPrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasAnyColumnPrivilege(...args);
    }
    hasColumnPrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasColumnPrivilege(...args);
    }
    hasDatabasePrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasDatabasePrivilege(...args);
    }
    hasFunctionPrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasFunctionPrivilege(...args);
    }
    hash(...args) {
        return (new query_builder_1.QueryBuilder(this)).hash(...args);
    }
    hasLanguagePrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasLanguagePrivilege(...args);
    }
    hasLargeobjectPrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasLargeobjectPrivilege(...args);
    }
    hasParameterPrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasParameterPrivilege(...args);
    }
    hasSchemaPrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasSchemaPrivilege(...args);
    }
    hasSequencePrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasSequencePrivilege(...args);
    }
    hasServerPrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasServerPrivilege(...args);
    }
    hasTablePrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasTablePrivilege(...args);
    }
    hasTablespacePrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasTablespacePrivilege(...args);
    }
    hasTypePrivilege(...args) {
        return (new query_builder_1.QueryBuilder(this)).hasTypePrivilege(...args);
    }
    having(...args) {
        return (new query_builder_1.QueryBuilder(this)).having(...args);
    }
    header() {
        return (new query_builder_1.QueryBuilder(this)).header();
    }
    height(...args) {
        return (new query_builder_1.QueryBuilder(this)).height(...args);
    }
    hex() {
        return (new query_builder_1.QueryBuilder(this)).hex();
    }
    hierarchy() {
        return (new query_builder_1.QueryBuilder(this)).hierarchy();
    }
    hold() {
        return (new query_builder_1.QueryBuilder(this)).hold();
    }
    horizontal(...args) {
        return (new query_builder_1.QueryBuilder(this)).horizontal(...args);
    }
    host(...args) {
        return (new query_builder_1.QueryBuilder(this)).host(...args);
    }
    hostmask(...args) {
        return (new query_builder_1.QueryBuilder(this)).hostmask(...args);
    }
    hour() {
        return (new query_builder_1.QueryBuilder(this)).hour();
    }
    i(...args) {
        return (new query_builder_1.QueryBuilder(this)).i(...args);
    }
    icuUnicodeVersion(...args) {
        return (new query_builder_1.QueryBuilder(this)).icuUnicodeVersion(...args);
    }
    id() {
        return (new query_builder_1.QueryBuilder(this)).id();
    }
    identifier(...args) {
        return (new query_builder_1.QueryBuilder(this)).identifier(...args);
    }
    identifierArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).identifierArray(...args);
    }
    identity() {
        return (new query_builder_1.QueryBuilder(this)).identity();
    }
    if() {
        return (new query_builder_1.QueryBuilder(this)).if();
    }
    ignore() {
        return (new query_builder_1.QueryBuilder(this)).ignore();
    }
    ilike(...args) {
        return (new query_builder_1.QueryBuilder(this)).ilike(...args);
    }
    immediate() {
        return (new query_builder_1.QueryBuilder(this)).immediate();
    }
    immediately() {
        return (new query_builder_1.QueryBuilder(this)).immediately();
    }
    immutable() {
        return (new query_builder_1.QueryBuilder(this)).immutable();
    }
    implementation() {
        return (new query_builder_1.QueryBuilder(this)).implementation();
    }
    implicit() {
        return (new query_builder_1.QueryBuilder(this)).implicit();
    }
    import() {
        return (new query_builder_1.QueryBuilder(this)).import();
    }
    in(...args) {
        return (new query_builder_1.QueryBuilder(this)).in(...args);
    }
    include() {
        return (new query_builder_1.QueryBuilder(this)).include();
    }
    including() {
        return (new query_builder_1.QueryBuilder(this)).including();
    }
    increment() {
        return (new query_builder_1.QueryBuilder(this)).increment();
    }
    indent() {
        return (new query_builder_1.QueryBuilder(this)).indent();
    }
    index() {
        return (new query_builder_1.QueryBuilder(this)).index();
    }
    indexes() {
        return (new query_builder_1.QueryBuilder(this)).indexes();
    }
    indicator() {
        return (new query_builder_1.QueryBuilder(this)).indicator();
    }
    inetClientAddr(...args) {
        return (new query_builder_1.QueryBuilder(this)).inetClientAddr(...args);
    }
    inetClientPort(...args) {
        return (new query_builder_1.QueryBuilder(this)).inetClientPort(...args);
    }
    inetMerge(...args) {
        return (new query_builder_1.QueryBuilder(this)).inetMerge(...args);
    }
    inetSameFamily(...args) {
        return (new query_builder_1.QueryBuilder(this)).inetSameFamily(...args);
    }
    inetServerAddr(...args) {
        return (new query_builder_1.QueryBuilder(this)).inetServerAddr(...args);
    }
    inetServerPort(...args) {
        return (new query_builder_1.QueryBuilder(this)).inetServerPort(...args);
    }
    inherit() {
        return (new query_builder_1.QueryBuilder(this)).inherit();
    }
    inherits() {
        return (new query_builder_1.QueryBuilder(this)).inherits();
    }
    initcap(...args) {
        return (new query_builder_1.QueryBuilder(this)).initcap(...args);
    }
    initial() {
        return (new query_builder_1.QueryBuilder(this)).initial();
    }
    initially() {
        return (new query_builder_1.QueryBuilder(this)).initially();
    }
    inline() {
        return (new query_builder_1.QueryBuilder(this)).inline();
    }
    inner() {
        return (new query_builder_1.QueryBuilder(this)).inner();
    }
    innerJoin(...args) {
        return (new query_builder_1.QueryBuilder(this)).innerJoin(...args);
    }
    innerJoinLateral(...args) {
        return (new query_builder_1.QueryBuilder(this)).innerJoinLateral(...args);
    }
    inout() {
        return (new query_builder_1.QueryBuilder(this)).inout();
    }
    input() {
        return (new query_builder_1.QueryBuilder(this)).input();
    }
    insensitive() {
        return (new query_builder_1.QueryBuilder(this)).insensitive();
    }
    insert(...args) {
        return (new query_builder_1.QueryBuilder(this)).insert(...args);
    }
    insertInto(...args) {
        return (new query_builder_1.QueryBuilder(this)).insertInto(...args);
    }
    instance() {
        return (new query_builder_1.QueryBuilder(this)).instance();
    }
    instantiable() {
        return (new query_builder_1.QueryBuilder(this)).instantiable();
    }
    instead() {
        return (new query_builder_1.QueryBuilder(this)).instead();
    }
    int() {
        return (new query_builder_1.QueryBuilder(this)).int();
    }
    integer() {
        return (new query_builder_1.QueryBuilder(this)).integer();
    }
    integrity() {
        return (new query_builder_1.QueryBuilder(this)).integrity();
    }
    intersect(...args) {
        return (new query_builder_1.QueryBuilder(this)).intersect(...args);
    }
    intersectAll(...args) {
        return (new query_builder_1.QueryBuilder(this)).intersectAll(...args);
    }
    intersection() {
        return (new query_builder_1.QueryBuilder(this)).intersection();
    }
    interval() {
        return (new query_builder_1.QueryBuilder(this)).interval();
    }
    into() {
        return (new query_builder_1.QueryBuilder(this)).into();
    }
    invoker() {
        return (new query_builder_1.QueryBuilder(this)).invoker();
    }
    is(...args) {
        return (new query_builder_1.QueryBuilder(this)).is(...args);
    }
    isclosed(...args) {
        return (new query_builder_1.QueryBuilder(this)).isclosed(...args);
    }
    isDocument(...args) {
        return (new query_builder_1.QueryBuilder(this)).isDocument(...args);
    }
    isempty(...args) {
        return (new query_builder_1.QueryBuilder(this)).isempty(...args);
    }
    isfinite(...args) {
        return (new query_builder_1.QueryBuilder(this)).isfinite(...args);
    }
    isNot(...args) {
        return (new query_builder_1.QueryBuilder(this)).isNot(...args);
    }
    isnull() {
        return (new query_builder_1.QueryBuilder(this)).isnull();
    }
    isolation() {
        return (new query_builder_1.QueryBuilder(this)).isolation();
    }
    isopen(...args) {
        return (new query_builder_1.QueryBuilder(this)).isopen(...args);
    }
    isParallel(...args) {
        return (new query_builder_1.QueryBuilder(this)).isParallel(...args);
    }
    join() {
        return (new query_builder_1.QueryBuilder(this)).join();
    }
    json() {
        return (new query_builder_1.QueryBuilder(this)).json();
    }
    jsonAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonAgg(...args);
    }
    jsonAggStrict(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonAggStrict(...args);
    }
    jsonArray() {
        return (new query_builder_1.QueryBuilder(this)).jsonArray();
    }
    jsonArrayagg(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonArrayagg(...args);
    }
    jsonArrayElements(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonArrayElements(...args);
    }
    jsonArrayElementsText(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonArrayElementsText(...args);
    }
    jsonArrayLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonArrayLength(...args);
    }
    jsonbAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbAgg(...args);
    }
    jsonbAggStrict(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbAggStrict(...args);
    }
    jsonbArrayElements(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbArrayElements(...args);
    }
    jsonbArrayElementsText(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbArrayElementsText(...args);
    }
    jsonbArrayLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbArrayLength(...args);
    }
    jsonbBuildArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbBuildArray(...args);
    }
    jsonbBuildObject(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbBuildObject(...args);
    }
    jsonbEach(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbEach(...args);
    }
    jsonbEachText(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbEachText(...args);
    }
    jsonbExtractPath(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbExtractPath(...args);
    }
    jsonbExtractPathText(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbExtractPathText(...args);
    }
    jsonbInsert(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbInsert(...args);
    }
    jsonbObjectAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbObjectAgg(...args);
    }
    jsonbObjectAggStrict(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbObjectAggStrict(...args);
    }
    jsonbObjectAggUnique(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbObjectAggUnique(...args);
    }
    jsonbObjectAggUniqueStrict(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbObjectAggUniqueStrict(...args);
    }
    jsonbObjectFromArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbObjectFromArray(...args);
    }
    jsonbObjectFromPairs(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbObjectFromPairs(...args);
    }
    jsonbObjectKeys(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbObjectKeys(...args);
    }
    jsonbPathExists(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathExists(...args);
    }
    jsonbPathExistsTz(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathExistsTz(...args);
    }
    jsonbPathMatch(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathMatch(...args);
    }
    jsonbPathMatchTz(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathMatchTz(...args);
    }
    jsonbPathQuery(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathQuery(...args);
    }
    jsonbPathQueryArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathQueryArray(...args);
    }
    jsonbPathQueryArrayTz(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathQueryArrayTz(...args);
    }
    jsonbPathQueryFirst(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathQueryFirst(...args);
    }
    jsonbPathQueryFirstTz(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathQueryFirstTz(...args);
    }
    jsonbPathQueryTz(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPathQueryTz(...args);
    }
    jsonbPopulateRecord(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPopulateRecord(...args);
    }
    jsonbPopulateRecordset(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPopulateRecordset(...args);
    }
    jsonbPopulateRecordValid(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPopulateRecordValid(...args);
    }
    jsonbPretty(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbPretty(...args);
    }
    jsonbSet(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbSet(...args);
    }
    jsonbSetLax(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbSetLax(...args);
    }
    jsonbStripNulls(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbStripNulls(...args);
    }
    jsonbToRecord(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbToRecord(...args);
    }
    jsonbToRecordset(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbToRecordset(...args);
    }
    jsonbToTsvector(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbToTsvector(...args);
    }
    jsonbTypeof(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonbTypeof(...args);
    }
    jsonBuildArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonBuildArray(...args);
    }
    jsonBuildObject(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonBuildObject(...args);
    }
    jsonEach(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonEach(...args);
    }
    jsonEachText(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonEachText(...args);
    }
    jsonExists() {
        return (new query_builder_1.QueryBuilder(this)).jsonExists();
    }
    jsonExtractPath(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonExtractPath(...args);
    }
    jsonExtractPathText(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonExtractPathText(...args);
    }
    jsonObject() {
        return (new query_builder_1.QueryBuilder(this)).jsonObject();
    }
    jsonObjectagg(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectagg(...args);
    }
    jsonObjectAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectAgg(...args);
    }
    jsonObjectAggStrict(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectAggStrict(...args);
    }
    jsonObjectAggUnique(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectAggUnique(...args);
    }
    jsonObjectAggUniqueStrict(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectAggUniqueStrict(...args);
    }
    jsonObjectFromArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectFromArray(...args);
    }
    jsonObjectFromPairs(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectFromPairs(...args);
    }
    jsonObjectKeys(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonObjectKeys(...args);
    }
    jsonPopulateRecord(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonPopulateRecord(...args);
    }
    jsonPopulateRecordset(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonPopulateRecordset(...args);
    }
    jsonQuery() {
        return (new query_builder_1.QueryBuilder(this)).jsonQuery();
    }
    jsonScalar() {
        return (new query_builder_1.QueryBuilder(this)).jsonScalar();
    }
    jsonSerialize() {
        return (new query_builder_1.QueryBuilder(this)).jsonSerialize();
    }
    jsonStripNulls(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonStripNulls(...args);
    }
    jsonTable() {
        return (new query_builder_1.QueryBuilder(this)).jsonTable();
    }
    jsonTablePrimitive() {
        return (new query_builder_1.QueryBuilder(this)).jsonTablePrimitive();
    }
    jsonToRecord(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonToRecord(...args);
    }
    jsonToRecordset(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonToRecordset(...args);
    }
    jsonToTsvector(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonToTsvector(...args);
    }
    jsonTypeof(...args) {
        return (new query_builder_1.QueryBuilder(this)).jsonTypeof(...args);
    }
    jsonValue() {
        return (new query_builder_1.QueryBuilder(this)).jsonValue();
    }
    justifyDays(...args) {
        return (new query_builder_1.QueryBuilder(this)).justifyDays(...args);
    }
    justifyHours(...args) {
        return (new query_builder_1.QueryBuilder(this)).justifyHours(...args);
    }
    justifyInterval(...args) {
        return (new query_builder_1.QueryBuilder(this)).justifyInterval(...args);
    }
    k() {
        return (new query_builder_1.QueryBuilder(this)).k();
    }
    keep() {
        return (new query_builder_1.QueryBuilder(this)).keep();
    }
    key() {
        return (new query_builder_1.QueryBuilder(this)).key();
    }
    keyMember() {
        return (new query_builder_1.QueryBuilder(this)).keyMember();
    }
    keys() {
        return (new query_builder_1.QueryBuilder(this)).keys();
    }
    keyType() {
        return (new query_builder_1.QueryBuilder(this)).keyType();
    }
    l(...args) {
        return (new query_builder_1.QueryBuilder(this)).l(...args);
    }
    label() {
        return (new query_builder_1.QueryBuilder(this)).label();
    }
    lag(...args) {
        return (new query_builder_1.QueryBuilder(this)).lag(...args);
    }
    language() {
        return (new query_builder_1.QueryBuilder(this)).language();
    }
    large() {
        return (new query_builder_1.QueryBuilder(this)).large();
    }
    last() {
        return (new query_builder_1.QueryBuilder(this)).last();
    }
    lastval(...args) {
        return (new query_builder_1.QueryBuilder(this)).lastval(...args);
    }
    lastValue(...args) {
        return (new query_builder_1.QueryBuilder(this)).lastValue(...args);
    }
    lateral() {
        return (new query_builder_1.QueryBuilder(this)).lateral();
    }
    lcm(...args) {
        return (new query_builder_1.QueryBuilder(this)).lcm(...args);
    }
    lead(...args) {
        return (new query_builder_1.QueryBuilder(this)).lead(...args);
    }
    leading() {
        return (new query_builder_1.QueryBuilder(this)).leading();
    }
    leakproof() {
        return (new query_builder_1.QueryBuilder(this)).leakproof();
    }
    least(...args) {
        return (new query_builder_1.QueryBuilder(this)).least(...args);
    }
    left(...args) {
        return (new query_builder_1.QueryBuilder(this)).left(...args);
    }
    leftJoin(...args) {
        return (new query_builder_1.QueryBuilder(this)).leftJoin(...args);
    }
    leftJoinLateral(...args) {
        return (new query_builder_1.QueryBuilder(this)).leftJoinLateral(...args);
    }
    length(...args) {
        return (new query_builder_1.QueryBuilder(this)).length(...args);
    }
    level() {
        return (new query_builder_1.QueryBuilder(this)).level();
    }
    lgamma(...args) {
        return (new query_builder_1.QueryBuilder(this)).lgamma(...args);
    }
    library() {
        return (new query_builder_1.QueryBuilder(this)).library();
    }
    like(...args) {
        return (new query_builder_1.QueryBuilder(this)).like(...args);
    }
    likeRegex() {
        return (new query_builder_1.QueryBuilder(this)).likeRegex();
    }
    limit(...args) {
        return (new query_builder_1.QueryBuilder(this)).limit(...args);
    }
    line(...args) {
        return (new query_builder_1.QueryBuilder(this)).line(...args);
    }
    link() {
        return (new query_builder_1.QueryBuilder(this)).link();
    }
    listagg() {
        return (new query_builder_1.QueryBuilder(this)).listagg();
    }
    listen() {
        return (new query_builder_1.QueryBuilder(this)).listen();
    }
    literal(...args) {
        return (new query_builder_1.QueryBuilder(this)).literal(...args);
    }
    literalArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).literalArray(...args);
    }
    ln(...args) {
        return (new query_builder_1.QueryBuilder(this)).ln(...args);
    }
    load() {
        return (new query_builder_1.QueryBuilder(this)).load();
    }
    local() {
        return (new query_builder_1.QueryBuilder(this)).local();
    }
    localtime(...args) {
        return (new query_builder_1.QueryBuilder(this)).localtime(...args);
    }
    localtimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).localtimestamp(...args);
    }
    location() {
        return (new query_builder_1.QueryBuilder(this)).location();
    }
    locator() {
        return (new query_builder_1.QueryBuilder(this)).locator();
    }
    lock() {
        return (new query_builder_1.QueryBuilder(this)).lock();
    }
    locked() {
        return (new query_builder_1.QueryBuilder(this)).locked();
    }
    log(...args) {
        return (new query_builder_1.QueryBuilder(this)).log(...args);
    }
    log10(...args) {
        return (new query_builder_1.QueryBuilder(this)).log10(...args);
    }
    logged() {
        return (new query_builder_1.QueryBuilder(this)).logged();
    }
    lower(...args) {
        return (new query_builder_1.QueryBuilder(this)).lower(...args);
    }
    lowerInc(...args) {
        return (new query_builder_1.QueryBuilder(this)).lowerInc(...args);
    }
    lowerInf(...args) {
        return (new query_builder_1.QueryBuilder(this)).lowerInf(...args);
    }
    lpad(...args) {
        return (new query_builder_1.QueryBuilder(this)).lpad(...args);
    }
    lseg(...args) {
        return (new query_builder_1.QueryBuilder(this)).lseg(...args);
    }
    lt(...args) {
        return (new query_builder_1.QueryBuilder(this)).lt(...args);
    }
    lte(...args) {
        return (new query_builder_1.QueryBuilder(this)).lte(...args);
    }
    ltrim(...args) {
        return (new query_builder_1.QueryBuilder(this)).ltrim(...args);
    }
    m() {
        return (new query_builder_1.QueryBuilder(this)).m();
    }
    macaddr8Set7bit(...args) {
        return (new query_builder_1.QueryBuilder(this)).macaddr8Set7bit(...args);
    }
    macaddr8Trunc(...args) {
        return (new query_builder_1.QueryBuilder(this)).macaddr8Trunc(...args);
    }
    macaddrTrunc(...args) {
        return (new query_builder_1.QueryBuilder(this)).macaddrTrunc(...args);
    }
    makeaclitem(...args) {
        return (new query_builder_1.QueryBuilder(this)).makeaclitem(...args);
    }
    makeDate(...args) {
        return (new query_builder_1.QueryBuilder(this)).makeDate(...args);
    }
    makeInterval(...args) {
        return (new query_builder_1.QueryBuilder(this)).makeInterval(...args);
    }
    makeTime(...args) {
        return (new query_builder_1.QueryBuilder(this)).makeTime(...args);
    }
    makeTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).makeTimestamp(...args);
    }
    makeTimestamptz(...args) {
        return (new query_builder_1.QueryBuilder(this)).makeTimestamptz(...args);
    }
    map() {
        return (new query_builder_1.QueryBuilder(this)).map();
    }
    mapping() {
        return (new query_builder_1.QueryBuilder(this)).mapping();
    }
    masklen(...args) {
        return (new query_builder_1.QueryBuilder(this)).masklen(...args);
    }
    match() {
        return (new query_builder_1.QueryBuilder(this)).match();
    }
    matched() {
        return (new query_builder_1.QueryBuilder(this)).matched();
    }
    matches() {
        return (new query_builder_1.QueryBuilder(this)).matches();
    }
    matchNumber() {
        return (new query_builder_1.QueryBuilder(this)).matchNumber();
    }
    matchRecognize() {
        return (new query_builder_1.QueryBuilder(this)).matchRecognize();
    }
    matchRegex(...args) {
        return (new query_builder_1.QueryBuilder(this)).matchRegex(...args);
    }
    matchRegexInsensitive(...args) {
        return (new query_builder_1.QueryBuilder(this)).matchRegexInsensitive(...args);
    }
    materialized() {
        return (new query_builder_1.QueryBuilder(this)).materialized();
    }
    max(...args) {
        return (new query_builder_1.QueryBuilder(this)).max(...args);
    }
    maxvalue() {
        return (new query_builder_1.QueryBuilder(this)).maxvalue();
    }
    md5(...args) {
        return (new query_builder_1.QueryBuilder(this)).md5(...args);
    }
    measures() {
        return (new query_builder_1.QueryBuilder(this)).measures();
    }
    member() {
        return (new query_builder_1.QueryBuilder(this)).member();
    }
    merge() {
        return (new query_builder_1.QueryBuilder(this)).merge();
    }
    mergeAction(...args) {
        return (new query_builder_1.QueryBuilder(this)).mergeAction(...args);
    }
    messageLength() {
        return (new query_builder_1.QueryBuilder(this)).messageLength();
    }
    messageOctetLength() {
        return (new query_builder_1.QueryBuilder(this)).messageOctetLength();
    }
    messageText() {
        return (new query_builder_1.QueryBuilder(this)).messageText();
    }
    method() {
        return (new query_builder_1.QueryBuilder(this)).method();
    }
    middle(...args) {
        return (new query_builder_1.QueryBuilder(this)).middle(...args);
    }
    min(...args) {
        return (new query_builder_1.QueryBuilder(this)).min(...args);
    }
    minScale(...args) {
        return (new query_builder_1.QueryBuilder(this)).minScale(...args);
    }
    minus(...args) {
        return (new query_builder_1.QueryBuilder(this)).minus(...args);
    }
    minute() {
        return (new query_builder_1.QueryBuilder(this)).minute();
    }
    minvalue() {
        return (new query_builder_1.QueryBuilder(this)).minvalue();
    }
    mod(...args) {
        return (new query_builder_1.QueryBuilder(this)).mod(...args);
    }
    mode(...args) {
        return (new query_builder_1.QueryBuilder(this)).mode(...args);
    }
    modifies() {
        return (new query_builder_1.QueryBuilder(this)).modifies();
    }
    module() {
        return (new query_builder_1.QueryBuilder(this)).module();
    }
    modulo(...args) {
        return (new query_builder_1.QueryBuilder(this)).modulo(...args);
    }
    month() {
        return (new query_builder_1.QueryBuilder(this)).month();
    }
    more() {
        return (new query_builder_1.QueryBuilder(this)).more();
    }
    move() {
        return (new query_builder_1.QueryBuilder(this)).move();
    }
    multiply(...args) {
        return (new query_builder_1.QueryBuilder(this)).multiply(...args);
    }
    multirange(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirange(...args);
    }
    multirangeIsempty(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeIsempty(...args);
    }
    multirangeLower(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeLower(...args);
    }
    multirangeLowerInc(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeLowerInc(...args);
    }
    multirangeLowerInf(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeLowerInf(...args);
    }
    multirangeRangeMerge(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeRangeMerge(...args);
    }
    multirangeUpper(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeUpper(...args);
    }
    multirangeUpperInc(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeUpperInc(...args);
    }
    multirangeUpperInf(...args) {
        return (new query_builder_1.QueryBuilder(this)).multirangeUpperInf(...args);
    }
    multiset() {
        return (new query_builder_1.QueryBuilder(this)).multiset();
    }
    mumps() {
        return (new query_builder_1.QueryBuilder(this)).mumps();
    }
    mxidAge(...args) {
        return (new query_builder_1.QueryBuilder(this)).mxidAge(...args);
    }
    name() {
        return (new query_builder_1.QueryBuilder(this)).name();
    }
    names() {
        return (new query_builder_1.QueryBuilder(this)).names();
    }
    namespace() {
        return (new query_builder_1.QueryBuilder(this)).namespace();
    }
    national() {
        return (new query_builder_1.QueryBuilder(this)).national();
    }
    natural() {
        return (new query_builder_1.QueryBuilder(this)).natural();
    }
    nchar() {
        return (new query_builder_1.QueryBuilder(this)).nchar();
    }
    nclob() {
        return (new query_builder_1.QueryBuilder(this)).nclob();
    }
    ne(...args) {
        return (new query_builder_1.QueryBuilder(this)).ne(...args);
    }
    nested() {
        return (new query_builder_1.QueryBuilder(this)).nested();
    }
    nesting() {
        return (new query_builder_1.QueryBuilder(this)).nesting();
    }
    netmask(...args) {
        return (new query_builder_1.QueryBuilder(this)).netmask(...args);
    }
    network(...args) {
        return (new query_builder_1.QueryBuilder(this)).network(...args);
    }
    new() {
        return (new query_builder_1.QueryBuilder(this)).new();
    }
    next() {
        return (new query_builder_1.QueryBuilder(this)).next();
    }
    nextval(...args) {
        return (new query_builder_1.QueryBuilder(this)).nextval(...args);
    }
    nfc() {
        return (new query_builder_1.QueryBuilder(this)).nfc();
    }
    nfd() {
        return (new query_builder_1.QueryBuilder(this)).nfd();
    }
    nfkc() {
        return (new query_builder_1.QueryBuilder(this)).nfkc();
    }
    nfkd() {
        return (new query_builder_1.QueryBuilder(this)).nfkd();
    }
    nil() {
        return (new query_builder_1.QueryBuilder(this)).nil();
    }
    no() {
        return (new query_builder_1.QueryBuilder(this)).no();
    }
    none() {
        return (new query_builder_1.QueryBuilder(this)).none();
    }
    normalize(...args) {
        return (new query_builder_1.QueryBuilder(this)).normalize(...args);
    }
    normalized() {
        return (new query_builder_1.QueryBuilder(this)).normalized();
    }
    not() {
        return (new query_builder_1.QueryBuilder(this)).not();
    }
    notEq(...args) {
        return (new query_builder_1.QueryBuilder(this)).notEq(...args);
    }
    notExists(...args) {
        return (new query_builder_1.QueryBuilder(this)).notExists(...args);
    }
    notExtendAbove(...args) {
        return (new query_builder_1.QueryBuilder(this)).notExtendAbove(...args);
    }
    notExtendBelow(...args) {
        return (new query_builder_1.QueryBuilder(this)).notExtendBelow(...args);
    }
    notExtendLeft(...args) {
        return (new query_builder_1.QueryBuilder(this)).notExtendLeft(...args);
    }
    notExtendRight(...args) {
        return (new query_builder_1.QueryBuilder(this)).notExtendRight(...args);
    }
    nothing() {
        return (new query_builder_1.QueryBuilder(this)).nothing();
    }
    notify() {
        return (new query_builder_1.QueryBuilder(this)).notify();
    }
    notIlike(...args) {
        return (new query_builder_1.QueryBuilder(this)).notIlike(...args);
    }
    notIn(...args) {
        return (new query_builder_1.QueryBuilder(this)).notIn(...args);
    }
    notLike(...args) {
        return (new query_builder_1.QueryBuilder(this)).notLike(...args);
    }
    notMatchRegex(...args) {
        return (new query_builder_1.QueryBuilder(this)).notMatchRegex(...args);
    }
    notMatchRegexInsensitive(...args) {
        return (new query_builder_1.QueryBuilder(this)).notMatchRegexInsensitive(...args);
    }
    notnull() {
        return (new query_builder_1.QueryBuilder(this)).notnull();
    }
    notSimilarTo(...args) {
        return (new query_builder_1.QueryBuilder(this)).notSimilarTo(...args);
    }
    now(...args) {
        return (new query_builder_1.QueryBuilder(this)).now(...args);
    }
    nowait() {
        return (new query_builder_1.QueryBuilder(this)).nowait();
    }
    npoints(...args) {
        return (new query_builder_1.QueryBuilder(this)).npoints(...args);
    }
    nthValue(...args) {
        return (new query_builder_1.QueryBuilder(this)).nthValue(...args);
    }
    ntile(...args) {
        return (new query_builder_1.QueryBuilder(this)).ntile(...args);
    }
    null() {
        return (new query_builder_1.QueryBuilder(this)).null();
    }
    nullable() {
        return (new query_builder_1.QueryBuilder(this)).nullable();
    }
    nullif(...args) {
        return (new query_builder_1.QueryBuilder(this)).nullif(...args);
    }
    nullOrdering() {
        return (new query_builder_1.QueryBuilder(this)).nullOrdering();
    }
    nulls() {
        return (new query_builder_1.QueryBuilder(this)).nulls();
    }
    number() {
        return (new query_builder_1.QueryBuilder(this)).number();
    }
    numeric() {
        return (new query_builder_1.QueryBuilder(this)).numeric();
    }
    numnode(...args) {
        return (new query_builder_1.QueryBuilder(this)).numnode(...args);
    }
    objDescription(...args) {
        return (new query_builder_1.QueryBuilder(this)).objDescription(...args);
    }
    object() {
        return (new query_builder_1.QueryBuilder(this)).object();
    }
    objects() {
        return (new query_builder_1.QueryBuilder(this)).objects();
    }
    occurrence() {
        return (new query_builder_1.QueryBuilder(this)).occurrence();
    }
    occurrencesRegex() {
        return (new query_builder_1.QueryBuilder(this)).occurrencesRegex();
    }
    octetLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).octetLength(...args);
    }
    octets() {
        return (new query_builder_1.QueryBuilder(this)).octets();
    }
    of() {
        return (new query_builder_1.QueryBuilder(this)).of();
    }
    off() {
        return (new query_builder_1.QueryBuilder(this)).off();
    }
    offset(...args) {
        return (new query_builder_1.QueryBuilder(this)).offset(...args);
    }
    oids() {
        return (new query_builder_1.QueryBuilder(this)).oids();
    }
    old() {
        return (new query_builder_1.QueryBuilder(this)).old();
    }
    omit() {
        return (new query_builder_1.QueryBuilder(this)).omit();
    }
    on() {
        return (new query_builder_1.QueryBuilder(this)).on();
    }
    onConflictDoNothing(...args) {
        return (new query_builder_1.QueryBuilder(this)).onConflictDoNothing(...args);
    }
    onConflictDoUpdate(...args) {
        return (new query_builder_1.QueryBuilder(this)).onConflictDoUpdate(...args);
    }
    one() {
        return (new query_builder_1.QueryBuilder(this)).one();
    }
    only() {
        return (new query_builder_1.QueryBuilder(this)).only();
    }
    op(...args) {
        return (new query_builder_1.QueryBuilder(this)).op(...args);
    }
    open() {
        return (new query_builder_1.QueryBuilder(this)).open();
    }
    operator() {
        return (new query_builder_1.QueryBuilder(this)).operator();
    }
    option() {
        return (new query_builder_1.QueryBuilder(this)).option();
    }
    options() {
        return (new query_builder_1.QueryBuilder(this)).options();
    }
    or(...args) {
        return (new query_builder_1.QueryBuilder(this)).or(...args);
    }
    order() {
        return (new query_builder_1.QueryBuilder(this)).order();
    }
    orderBy(...args) {
        return (new query_builder_1.QueryBuilder(this)).orderBy(...args);
    }
    ordering() {
        return (new query_builder_1.QueryBuilder(this)).ordering();
    }
    ordinality() {
        return (new query_builder_1.QueryBuilder(this)).ordinality();
    }
    others() {
        return (new query_builder_1.QueryBuilder(this)).others();
    }
    out() {
        return (new query_builder_1.QueryBuilder(this)).out();
    }
    outer() {
        return (new query_builder_1.QueryBuilder(this)).outer();
    }
    output() {
        return (new query_builder_1.QueryBuilder(this)).output();
    }
    over() {
        return (new query_builder_1.QueryBuilder(this)).over();
    }
    overflow() {
        return (new query_builder_1.QueryBuilder(this)).overflow();
    }
    overlaps() {
        return (new query_builder_1.QueryBuilder(this)).overlaps();
    }
    overlay(...args) {
        return (new query_builder_1.QueryBuilder(this)).overlay(...args);
    }
    overriding() {
        return (new query_builder_1.QueryBuilder(this)).overriding();
    }
    owned() {
        return (new query_builder_1.QueryBuilder(this)).owned();
    }
    owner() {
        return (new query_builder_1.QueryBuilder(this)).owner();
    }
    p() {
        return (new query_builder_1.QueryBuilder(this)).p();
    }
    pad() {
        return (new query_builder_1.QueryBuilder(this)).pad();
    }
    parallel() {
        return (new query_builder_1.QueryBuilder(this)).parallel();
    }
    parameter() {
        return (new query_builder_1.QueryBuilder(this)).parameter();
    }
    parameterMode() {
        return (new query_builder_1.QueryBuilder(this)).parameterMode();
    }
    parameterName() {
        return (new query_builder_1.QueryBuilder(this)).parameterName();
    }
    parameterordinalposition() {
        return (new query_builder_1.QueryBuilder(this)).parameterordinalposition();
    }
    parameterspecificcatalog() {
        return (new query_builder_1.QueryBuilder(this)).parameterspecificcatalog();
    }
    parameterspecificname() {
        return (new query_builder_1.QueryBuilder(this)).parameterspecificname();
    }
    parameterspecificschema() {
        return (new query_builder_1.QueryBuilder(this)).parameterspecificschema();
    }
    parseIdent(...args) {
        return (new query_builder_1.QueryBuilder(this)).parseIdent(...args);
    }
    parser() {
        return (new query_builder_1.QueryBuilder(this)).parser();
    }
    partial() {
        return (new query_builder_1.QueryBuilder(this)).partial();
    }
    partition() {
        return (new query_builder_1.QueryBuilder(this)).partition();
    }
    pascal() {
        return (new query_builder_1.QueryBuilder(this)).pascal();
    }
    pass() {
        return (new query_builder_1.QueryBuilder(this)).pass();
    }
    passing() {
        return (new query_builder_1.QueryBuilder(this)).passing();
    }
    passthrough() {
        return (new query_builder_1.QueryBuilder(this)).passthrough();
    }
    password() {
        return (new query_builder_1.QueryBuilder(this)).password();
    }
    past() {
        return (new query_builder_1.QueryBuilder(this)).past();
    }
    path(...args) {
        return (new query_builder_1.QueryBuilder(this)).path(...args);
    }
    pattern() {
        return (new query_builder_1.QueryBuilder(this)).pattern();
    }
    pclose(...args) {
        return (new query_builder_1.QueryBuilder(this)).pclose(...args);
    }
    per() {
        return (new query_builder_1.QueryBuilder(this)).per();
    }
    percent() {
        return (new query_builder_1.QueryBuilder(this)).percent();
    }
    percentCharacter(...args) {
        return (new query_builder_1.QueryBuilder(this)).percentCharacter(...args);
    }
    percentileCont(...args) {
        return (new query_builder_1.QueryBuilder(this)).percentileCont(...args);
    }
    percentileDisc(...args) {
        return (new query_builder_1.QueryBuilder(this)).percentileDisc(...args);
    }
    percentRank(...args) {
        return (new query_builder_1.QueryBuilder(this)).percentRank(...args);
    }
    period() {
        return (new query_builder_1.QueryBuilder(this)).period();
    }
    permission() {
        return (new query_builder_1.QueryBuilder(this)).permission();
    }
    permute() {
        return (new query_builder_1.QueryBuilder(this)).permute();
    }
    perpendicular(...args) {
        return (new query_builder_1.QueryBuilder(this)).perpendicular(...args);
    }
    pgAdvisoryLock(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAdvisoryLock(...args);
    }
    pgAdvisoryLockShared(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAdvisoryLockShared(...args);
    }
    pgAdvisoryUnlock(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAdvisoryUnlock(...args);
    }
    pgAdvisoryUnlockAll(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAdvisoryUnlockAll(...args);
    }
    pgAdvisoryUnlockShared(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAdvisoryUnlockShared(...args);
    }
    pgAdvisoryXactLock(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAdvisoryXactLock(...args);
    }
    pgAdvisoryXactLockShared(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAdvisoryXactLockShared(...args);
    }
    pgAvailableWalSummaries(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgAvailableWalSummaries(...args);
    }
    pgBackendPid(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgBackendPid(...args);
    }
    pgBackupStart(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgBackupStart(...args);
    }
    pgBackupStop(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgBackupStop(...args);
    }
    pgBasetype(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgBasetype(...args);
    }
    pgBlockingPids(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgBlockingPids(...args);
    }
    pgCancelBackend(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCancelBackend(...args);
    }
    pgCharToEncoding(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCharToEncoding(...args);
    }
    pgClientEncoding(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgClientEncoding(...args);
    }
    pgCollationActualVersion(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCollationActualVersion(...args);
    }
    pgCollationIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCollationIsVisible(...args);
    }
    pgColumnCompression(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgColumnCompression(...args);
    }
    pgColumnSize(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgColumnSize(...args);
    }
    pgColumnToastChunkId(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgColumnToastChunkId(...args);
    }
    pgConfLoadTime(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgConfLoadTime(...args);
    }
    pgControlCheckpoint(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgControlCheckpoint(...args);
    }
    pgControlInit(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgControlInit(...args);
    }
    pgControlRecovery(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgControlRecovery(...args);
    }
    pgControlSystem(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgControlSystem(...args);
    }
    pgConversionIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgConversionIsVisible(...args);
    }
    pgCopyLogicalReplicationSlot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCopyLogicalReplicationSlot(...args);
    }
    pgCopyPhysicalReplicationSlot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCopyPhysicalReplicationSlot(...args);
    }
    pgCreateLogicalReplicationSlot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCreateLogicalReplicationSlot(...args);
    }
    pgCreatePhysicalReplicationSlot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCreatePhysicalReplicationSlot(...args);
    }
    pgCreateRestorePoint(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCreateRestorePoint(...args);
    }
    pgCurrentLogfile(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCurrentLogfile(...args);
    }
    pgCurrentSnapshot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCurrentSnapshot(...args);
    }
    pgCurrentWalFlushLsn(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCurrentWalFlushLsn(...args);
    }
    pgCurrentWalInsertLsn(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCurrentWalInsertLsn(...args);
    }
    pgCurrentWalLsn(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCurrentWalLsn(...args);
    }
    pgCurrentXactId(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCurrentXactId(...args);
    }
    pgCurrentXactIdIfAssigned(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgCurrentXactIdIfAssigned(...args);
    }
    pgDatabaseCollationActualVersion(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgDatabaseCollationActualVersion(...args);
    }
    pgDatabaseSize(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgDatabaseSize(...args);
    }
    pgDescribeObject(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgDescribeObject(...args);
    }
    pgDropReplicationSlot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgDropReplicationSlot(...args);
    }
    pgEncodingToChar(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgEncodingToChar(...args);
    }
    pgEventTriggerDdlCommands(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgEventTriggerDdlCommands(...args);
    }
    pgEventTriggerDroppedObjects(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgEventTriggerDroppedObjects(...args);
    }
    pgEventTriggerTableRewriteOid(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgEventTriggerTableRewriteOid(...args);
    }
    pgEventTriggerTableRewriteReason(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgEventTriggerTableRewriteReason(...args);
    }
    pgExportSnapshot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgExportSnapshot(...args);
    }
    pgFilenodeRelation(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgFilenodeRelation(...args);
    }
    pgFunctionIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgFunctionIsVisible(...args);
    }
    pgGetAcl(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetAcl(...args);
    }
    pgGetCatalogForeignKeys(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetCatalogForeignKeys(...args);
    }
    pgGetConstraintdef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetConstraintdef(...args);
    }
    pgGetExpr(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetExpr(...args);
    }
    pgGetFunctionArguments(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetFunctionArguments(...args);
    }
    pgGetFunctiondef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetFunctiondef(...args);
    }
    pgGetFunctionIdentityArguments(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetFunctionIdentityArguments(...args);
    }
    pgGetFunctionResult(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetFunctionResult(...args);
    }
    pgGetIndexdef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetIndexdef(...args);
    }
    pgGetKeywords(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetKeywords(...args);
    }
    pgGetLoadedModules(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetLoadedModules(...args);
    }
    pgGetMultixactMembers(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetMultixactMembers(...args);
    }
    pgGetObjectAddress(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetObjectAddress(...args);
    }
    pgGetPartkeydef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetPartkeydef(...args);
    }
    pgGetRuledef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetRuledef(...args);
    }
    pgGetSerialSequence(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetSerialSequence(...args);
    }
    pgGetStatisticsobjdef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetStatisticsobjdef(...args);
    }
    pgGetTriggerdef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetTriggerdef(...args);
    }
    pgGetUserbyid(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetUserbyid(...args);
    }
    pgGetViewdef(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetViewdef(...args);
    }
    pgGetViewdefWrap(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetViewdefWrap(...args);
    }
    pgGetWalReplayPauseState(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetWalReplayPauseState(...args);
    }
    pgGetWalResourceManagers(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetWalResourceManagers(...args);
    }
    pgGetWalSummarizerState(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgGetWalSummarizerState(...args);
    }
    pgHasRole(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgHasRole(...args);
    }
    pgIdentifyObject(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIdentifyObject(...args);
    }
    pgIdentifyObjectAsAddress(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIdentifyObjectAsAddress(...args);
    }
    pgImportSystemCollations(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgImportSystemCollations(...args);
    }
    pgIndexamHasProperty(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIndexamHasProperty(...args);
    }
    pgIndexColumnHasProperty(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIndexColumnHasProperty(...args);
    }
    pgIndexesSize(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIndexesSize(...args);
    }
    pgIndexHasProperty(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIndexHasProperty(...args);
    }
    pgInputErrorInfo(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgInputErrorInfo(...args);
    }
    pgInputIsValid(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgInputIsValid(...args);
    }
    pgIsInRecovery(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIsInRecovery(...args);
    }
    pgIsOtherTempSchema(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIsOtherTempSchema(...args);
    }
    pgIsWalReplayPaused(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgIsWalReplayPaused(...args);
    }
    pgJitAvailable(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgJitAvailable(...args);
    }
    pgLastCommittedXact(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLastCommittedXact(...args);
    }
    pgLastWalReceiveLsn(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLastWalReceiveLsn(...args);
    }
    pgLastWalReplayLsn(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLastWalReplayLsn(...args);
    }
    pgLastXactReplayTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLastXactReplayTimestamp(...args);
    }
    pgListeningChannels(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgListeningChannels(...args);
    }
    pgLogBackendMemoryContexts(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLogBackendMemoryContexts(...args);
    }
    pgLogicalEmitMessage(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLogicalEmitMessage(...args);
    }
    pgLogicalSlotGetBinaryChanges(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLogicalSlotGetBinaryChanges(...args);
    }
    pgLogicalSlotGetChanges(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLogicalSlotGetChanges(...args);
    }
    pgLogicalSlotPeekBinaryChanges(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLogicalSlotPeekBinaryChanges(...args);
    }
    pgLogicalSlotPeekChanges(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLogicalSlotPeekChanges(...args);
    }
    pgLogStandbySnapshot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLogStandbySnapshot(...args);
    }
    pgLsArchiveStatusdir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsArchiveStatusdir(...args);
    }
    pgLsDir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsDir(...args);
    }
    pgLsLogdir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsLogdir(...args);
    }
    pgLsLogicalmapdir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsLogicalmapdir(...args);
    }
    pgLsLogicalsnapdir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsLogicalsnapdir(...args);
    }
    pgLsReplslotdir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsReplslotdir(...args);
    }
    pgLsSummariesdir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsSummariesdir(...args);
    }
    pgLsTmpdir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsTmpdir(...args);
    }
    pgLsWaldir(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgLsWaldir(...args);
    }
    pgMcvListItems(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgMcvListItems(...args);
    }
    pgMyTempSchema(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgMyTempSchema(...args);
    }
    pgNotificationQueueUsage(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgNotificationQueueUsage(...args);
    }
    pgNumaAvailable(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgNumaAvailable(...args);
    }
    pgOpclassIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgOpclassIsVisible(...args);
    }
    pgOperatorIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgOperatorIsVisible(...args);
    }
    pgOpfamilyIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgOpfamilyIsVisible(...args);
    }
    pgOptionsToTable(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgOptionsToTable(...args);
    }
    pgPartitionAncestors(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgPartitionAncestors(...args);
    }
    pgPartitionRoot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgPartitionRoot(...args);
    }
    pgPartitionTree(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgPartitionTree(...args);
    }
    pgPostmasterStartTime(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgPostmasterStartTime(...args);
    }
    pgPromote(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgPromote(...args);
    }
    pgReadBinaryFile(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReadBinaryFile(...args);
    }
    pgReadFile(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReadFile(...args);
    }
    pgRelationFilenode(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgRelationFilenode(...args);
    }
    pgRelationFilepath(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgRelationFilepath(...args);
    }
    pgRelationSize(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgRelationSize(...args);
    }
    pgReloadConf(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReloadConf(...args);
    }
    pgReplicationOriginAdvance(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginAdvance(...args);
    }
    pgReplicationOriginCreate(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginCreate(...args);
    }
    pgReplicationOriginDrop(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginDrop(...args);
    }
    pgReplicationOriginOid(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginOid(...args);
    }
    pgReplicationOriginProgress(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginProgress(...args);
    }
    pgReplicationOriginSessionIsSetup(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginSessionIsSetup(...args);
    }
    pgReplicationOriginSessionProgress(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginSessionProgress(...args);
    }
    pgReplicationOriginSessionReset(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginSessionReset(...args);
    }
    pgReplicationOriginSessionSetup(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginSessionSetup(...args);
    }
    pgReplicationOriginXactReset(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginXactReset(...args);
    }
    pgReplicationOriginXactSetup(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationOriginXactSetup(...args);
    }
    pgReplicationSlotAdvance(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgReplicationSlotAdvance(...args);
    }
    pgRotateLogfile(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgRotateLogfile(...args);
    }
    pgSafeSnapshotBlockingPids(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSafeSnapshotBlockingPids(...args);
    }
    pgSettingsGetFlags(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSettingsGetFlags(...args);
    }
    pgSizeBytes(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSizeBytes(...args);
    }
    pgSizePretty(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSizePretty(...args);
    }
    pgSleep(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSleep(...args);
    }
    pgSleepFor(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSleepFor(...args);
    }
    pgSleepUntil(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSleepUntil(...args);
    }
    pgSnapshotXip(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSnapshotXip(...args);
    }
    pgSnapshotXmax(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSnapshotXmax(...args);
    }
    pgSnapshotXmin(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSnapshotXmin(...args);
    }
    pgSplitWalfileName(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSplitWalfileName(...args);
    }
    pgStatFile(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgStatFile(...args);
    }
    pgStatisticsObjIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgStatisticsObjIsVisible(...args);
    }
    pgSwitchWal(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSwitchWal(...args);
    }
    pgSyncReplicationSlots(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgSyncReplicationSlots(...args);
    }
    pgTableIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTableIsVisible(...args);
    }
    pgTableSize(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTableSize(...args);
    }
    pgTablespaceDatabases(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTablespaceDatabases(...args);
    }
    pgTablespaceLocation(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTablespaceLocation(...args);
    }
    pgTablespaceSize(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTablespaceSize(...args);
    }
    pgTerminateBackend(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTerminateBackend(...args);
    }
    pgTotalRelationSize(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTotalRelationSize(...args);
    }
    pgTriggerDepth(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTriggerDepth(...args);
    }
    pgTryAdvisoryLock(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTryAdvisoryLock(...args);
    }
    pgTryAdvisoryLockShared(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTryAdvisoryLockShared(...args);
    }
    pgTryAdvisoryXactLock(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTryAdvisoryXactLock(...args);
    }
    pgTryAdvisoryXactLockShared(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTryAdvisoryXactLockShared(...args);
    }
    pgTsConfigIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTsConfigIsVisible(...args);
    }
    pgTsDictIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTsDictIsVisible(...args);
    }
    pgTsParserIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTsParserIsVisible(...args);
    }
    pgTsTemplateIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTsTemplateIsVisible(...args);
    }
    pgTypeIsVisible(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTypeIsVisible(...args);
    }
    pgTypeof(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgTypeof(...args);
    }
    pgVisibleInSnapshot(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgVisibleInSnapshot(...args);
    }
    pgWalfileName(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgWalfileName(...args);
    }
    pgWalfileNameOffset(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgWalfileNameOffset(...args);
    }
    pgWalLsnDiff(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgWalLsnDiff(...args);
    }
    pgWalReplayPause(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgWalReplayPause(...args);
    }
    pgWalReplayResume(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgWalReplayResume(...args);
    }
    pgWalSummaryContents(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgWalSummaryContents(...args);
    }
    pgXactCommitTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgXactCommitTimestamp(...args);
    }
    pgXactCommitTimestampOrigin(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgXactCommitTimestampOrigin(...args);
    }
    pgXactStatus(...args) {
        return (new query_builder_1.QueryBuilder(this)).pgXactStatus(...args);
    }
    phrasetoTsquery(...args) {
        return (new query_builder_1.QueryBuilder(this)).phrasetoTsquery(...args);
    }
    pi(...args) {
        return (new query_builder_1.QueryBuilder(this)).pi(...args);
    }
    pipe() {
        return (new query_builder_1.QueryBuilder(this)).pipe();
    }
    placing() {
        return (new query_builder_1.QueryBuilder(this)).placing();
    }
    plaintoTsquery(...args) {
        return (new query_builder_1.QueryBuilder(this)).plaintoTsquery(...args);
    }
    plan() {
        return (new query_builder_1.QueryBuilder(this)).plan();
    }
    plans() {
        return (new query_builder_1.QueryBuilder(this)).plans();
    }
    pli() {
        return (new query_builder_1.QueryBuilder(this)).pli();
    }
    plus(...args) {
        return (new query_builder_1.QueryBuilder(this)).plus(...args);
    }
    point(...args) {
        return (new query_builder_1.QueryBuilder(this)).point(...args);
    }
    policy() {
        return (new query_builder_1.QueryBuilder(this)).policy();
    }
    polygon(...args) {
        return (new query_builder_1.QueryBuilder(this)).polygon(...args);
    }
    popen(...args) {
        return (new query_builder_1.QueryBuilder(this)).popen(...args);
    }
    portion() {
        return (new query_builder_1.QueryBuilder(this)).portion();
    }
    position(...args) {
        return (new query_builder_1.QueryBuilder(this)).position(...args);
    }
    positionRegex() {
        return (new query_builder_1.QueryBuilder(this)).positionRegex();
    }
    power(...args) {
        return (new query_builder_1.QueryBuilder(this)).power(...args);
    }
    precedes() {
        return (new query_builder_1.QueryBuilder(this)).precedes();
    }
    preceding() {
        return (new query_builder_1.QueryBuilder(this)).preceding();
    }
    precision() {
        return (new query_builder_1.QueryBuilder(this)).precision();
    }
    prepare() {
        return (new query_builder_1.QueryBuilder(this)).prepare();
    }
    prepared() {
        return (new query_builder_1.QueryBuilder(this)).prepared();
    }
    preserve() {
        return (new query_builder_1.QueryBuilder(this)).preserve();
    }
    prev() {
        return (new query_builder_1.QueryBuilder(this)).prev();
    }
    primary() {
        return (new query_builder_1.QueryBuilder(this)).primary();
    }
    prior() {
        return (new query_builder_1.QueryBuilder(this)).prior();
    }
    private() {
        return (new query_builder_1.QueryBuilder(this)).private();
    }
    privileges() {
        return (new query_builder_1.QueryBuilder(this)).privileges();
    }
    procedural() {
        return (new query_builder_1.QueryBuilder(this)).procedural();
    }
    procedure() {
        return (new query_builder_1.QueryBuilder(this)).procedure();
    }
    procedures() {
        return (new query_builder_1.QueryBuilder(this)).procedures();
    }
    program() {
        return (new query_builder_1.QueryBuilder(this)).program();
    }
    prune() {
        return (new query_builder_1.QueryBuilder(this)).prune();
    }
    ptf() {
        return (new query_builder_1.QueryBuilder(this)).ptf();
    }
    public() {
        return (new query_builder_1.QueryBuilder(this)).public();
    }
    publication() {
        return (new query_builder_1.QueryBuilder(this)).publication();
    }
    queryToXml(...args) {
        return (new query_builder_1.QueryBuilder(this)).queryToXml(...args);
    }
    queryToXmlAndXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).queryToXmlAndXmlschema(...args);
    }
    queryToXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).queryToXmlschema(...args);
    }
    querytree(...args) {
        return (new query_builder_1.QueryBuilder(this)).querytree(...args);
    }
    quote() {
        return (new query_builder_1.QueryBuilder(this)).quote();
    }
    quoteIdent(...args) {
        return (new query_builder_1.QueryBuilder(this)).quoteIdent(...args);
    }
    quoteLiteral(...args) {
        return (new query_builder_1.QueryBuilder(this)).quoteLiteral(...args);
    }
    quoteNullable(...args) {
        return (new query_builder_1.QueryBuilder(this)).quoteNullable(...args);
    }
    quotes() {
        return (new query_builder_1.QueryBuilder(this)).quotes();
    }
    r(...args) {
        return (new query_builder_1.QueryBuilder(this)).r(...args);
    }
    radians(...args) {
        return (new query_builder_1.QueryBuilder(this)).radians(...args);
    }
    radius(...args) {
        return (new query_builder_1.QueryBuilder(this)).radius(...args);
    }
    random(...args) {
        return (new query_builder_1.QueryBuilder(this)).random(...args);
    }
    randomNormal(...args) {
        return (new query_builder_1.QueryBuilder(this)).randomNormal(...args);
    }
    range() {
        return (new query_builder_1.QueryBuilder(this)).range();
    }
    rangeAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).rangeAgg(...args);
    }
    rangeIntersectAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).rangeIntersectAgg(...args);
    }
    rangeMerge(...args) {
        return (new query_builder_1.QueryBuilder(this)).rangeMerge(...args);
    }
    rank(...args) {
        return (new query_builder_1.QueryBuilder(this)).rank(...args);
    }
    raw(...args) {
        return (new query_builder_1.QueryBuilder(this)).raw(...args);
    }
    rawString(...args) {
        return (new query_builder_1.QueryBuilder(this)).rawString(...args);
    }
    read() {
        return (new query_builder_1.QueryBuilder(this)).read();
    }
    reads() {
        return (new query_builder_1.QueryBuilder(this)).reads();
    }
    real() {
        return (new query_builder_1.QueryBuilder(this)).real();
    }
    reassign() {
        return (new query_builder_1.QueryBuilder(this)).reassign();
    }
    recovery() {
        return (new query_builder_1.QueryBuilder(this)).recovery();
    }
    recursive() {
        return (new query_builder_1.QueryBuilder(this)).recursive();
    }
    ref() {
        return (new query_builder_1.QueryBuilder(this)).ref();
    }
    references() {
        return (new query_builder_1.QueryBuilder(this)).references();
    }
    referencing() {
        return (new query_builder_1.QueryBuilder(this)).referencing();
    }
    refresh() {
        return (new query_builder_1.QueryBuilder(this)).refresh();
    }
    regexpCount(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpCount(...args);
    }
    regexpInstr(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpInstr(...args);
    }
    regexpLike(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpLike(...args);
    }
    regexpMatch(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpMatch(...args);
    }
    regexpMatches(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpMatches(...args);
    }
    regexpReplace(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpReplace(...args);
    }
    regexpSplitToArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpSplitToArray(...args);
    }
    regexpSplitToTable(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpSplitToTable(...args);
    }
    regexpSubstr(...args) {
        return (new query_builder_1.QueryBuilder(this)).regexpSubstr(...args);
    }
    regrAvgx(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrAvgx(...args);
    }
    regrAvgy(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrAvgy(...args);
    }
    regrCount(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrCount(...args);
    }
    regrIntercept(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrIntercept(...args);
    }
    regrR2(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrR2(...args);
    }
    regrSlope(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrSlope(...args);
    }
    regrSxx(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrSxx(...args);
    }
    regrSxy(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrSxy(...args);
    }
    regrSyy(...args) {
        return (new query_builder_1.QueryBuilder(this)).regrSyy(...args);
    }
    reindex() {
        return (new query_builder_1.QueryBuilder(this)).reindex();
    }
    relative() {
        return (new query_builder_1.QueryBuilder(this)).relative();
    }
    release() {
        return (new query_builder_1.QueryBuilder(this)).release();
    }
    rename() {
        return (new query_builder_1.QueryBuilder(this)).rename();
    }
    repeat(...args) {
        return (new query_builder_1.QueryBuilder(this)).repeat(...args);
    }
    repeatable() {
        return (new query_builder_1.QueryBuilder(this)).repeatable();
    }
    replace(...args) {
        return (new query_builder_1.QueryBuilder(this)).replace(...args);
    }
    replica() {
        return (new query_builder_1.QueryBuilder(this)).replica();
    }
    requiring() {
        return (new query_builder_1.QueryBuilder(this)).requiring();
    }
    reset() {
        return (new query_builder_1.QueryBuilder(this)).reset();
    }
    respect() {
        return (new query_builder_1.QueryBuilder(this)).respect();
    }
    restart() {
        return (new query_builder_1.QueryBuilder(this)).restart();
    }
    restore() {
        return (new query_builder_1.QueryBuilder(this)).restore();
    }
    restrict() {
        return (new query_builder_1.QueryBuilder(this)).restrict();
    }
    result() {
        return (new query_builder_1.QueryBuilder(this)).result();
    }
    return() {
        return (new query_builder_1.QueryBuilder(this)).return();
    }
    returnedCardinality() {
        return (new query_builder_1.QueryBuilder(this)).returnedCardinality();
    }
    returnedLength() {
        return (new query_builder_1.QueryBuilder(this)).returnedLength();
    }
    returnedoctetlength() {
        return (new query_builder_1.QueryBuilder(this)).returnedoctetlength();
    }
    returnedSqlstate() {
        return (new query_builder_1.QueryBuilder(this)).returnedSqlstate();
    }
    returning(...args) {
        return (new query_builder_1.QueryBuilder(this)).returning(...args);
    }
    returns() {
        return (new query_builder_1.QueryBuilder(this)).returns();
    }
    reverse(...args) {
        return (new query_builder_1.QueryBuilder(this)).reverse(...args);
    }
    revoke() {
        return (new query_builder_1.QueryBuilder(this)).revoke();
    }
    right(...args) {
        return (new query_builder_1.QueryBuilder(this)).right(...args);
    }
    rightJoin(...args) {
        return (new query_builder_1.QueryBuilder(this)).rightJoin(...args);
    }
    rightJoinLateral(...args) {
        return (new query_builder_1.QueryBuilder(this)).rightJoinLateral(...args);
    }
    role() {
        return (new query_builder_1.QueryBuilder(this)).role();
    }
    rollback() {
        return (new query_builder_1.QueryBuilder(this)).rollback();
    }
    rollbackTransaction(...args) {
        return (new query_builder_1.QueryBuilder(this)).rollbackTransaction(...args);
    }
    rollup() {
        return (new query_builder_1.QueryBuilder(this)).rollup();
    }
    round(...args) {
        return (new query_builder_1.QueryBuilder(this)).round(...args);
    }
    routine() {
        return (new query_builder_1.QueryBuilder(this)).routine();
    }
    routineCatalog() {
        return (new query_builder_1.QueryBuilder(this)).routineCatalog();
    }
    routineName() {
        return (new query_builder_1.QueryBuilder(this)).routineName();
    }
    routines() {
        return (new query_builder_1.QueryBuilder(this)).routines();
    }
    routineSchema() {
        return (new query_builder_1.QueryBuilder(this)).routineSchema();
    }
    row() {
        return (new query_builder_1.QueryBuilder(this)).row();
    }
    rowCount() {
        return (new query_builder_1.QueryBuilder(this)).rowCount();
    }
    rowNumber(...args) {
        return (new query_builder_1.QueryBuilder(this)).rowNumber(...args);
    }
    rows() {
        return (new query_builder_1.QueryBuilder(this)).rows();
    }
    rowSecurityActive(...args) {
        return (new query_builder_1.QueryBuilder(this)).rowSecurityActive(...args);
    }
    rowToJson(...args) {
        return (new query_builder_1.QueryBuilder(this)).rowToJson(...args);
    }
    rpad(...args) {
        return (new query_builder_1.QueryBuilder(this)).rpad(...args);
    }
    rs(...args) {
        return (new query_builder_1.QueryBuilder(this)).rs(...args);
    }
    rtrim(...args) {
        return (new query_builder_1.QueryBuilder(this)).rtrim(...args);
    }
    rule() {
        return (new query_builder_1.QueryBuilder(this)).rule();
    }
    running() {
        return (new query_builder_1.QueryBuilder(this)).running();
    }
    sameAs(...args) {
        return (new query_builder_1.QueryBuilder(this)).sameAs(...args);
    }
    savepoint() {
        return (new query_builder_1.QueryBuilder(this)).savepoint();
    }
    savepointTransaction(...args) {
        return (new query_builder_1.QueryBuilder(this)).savepointTransaction(...args);
    }
    sc(...args) {
        return (new query_builder_1.QueryBuilder(this)).sc(...args);
    }
    scalar() {
        return (new query_builder_1.QueryBuilder(this)).scalar();
    }
    scale(...args) {
        return (new query_builder_1.QueryBuilder(this)).scale(...args);
    }
    schema() {
        return (new query_builder_1.QueryBuilder(this)).schema();
    }
    schemaName() {
        return (new query_builder_1.QueryBuilder(this)).schemaName();
    }
    schemas() {
        return (new query_builder_1.QueryBuilder(this)).schemas();
    }
    schemaToXml(...args) {
        return (new query_builder_1.QueryBuilder(this)).schemaToXml(...args);
    }
    schemaToXmlAndXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).schemaToXmlAndXmlschema(...args);
    }
    schemaToXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).schemaToXmlschema(...args);
    }
    scope() {
        return (new query_builder_1.QueryBuilder(this)).scope();
    }
    scopeCatalog() {
        return (new query_builder_1.QueryBuilder(this)).scopeCatalog();
    }
    scopeName() {
        return (new query_builder_1.QueryBuilder(this)).scopeName();
    }
    scopeSchema() {
        return (new query_builder_1.QueryBuilder(this)).scopeSchema();
    }
    scroll() {
        return (new query_builder_1.QueryBuilder(this)).scroll();
    }
    search() {
        return (new query_builder_1.QueryBuilder(this)).search();
    }
    second() {
        return (new query_builder_1.QueryBuilder(this)).second();
    }
    section() {
        return (new query_builder_1.QueryBuilder(this)).section();
    }
    security() {
        return (new query_builder_1.QueryBuilder(this)).security();
    }
    seek() {
        return (new query_builder_1.QueryBuilder(this)).seek();
    }
    select(...args) {
        return (new query_builder_1.QueryBuilder(this)).select(...args);
    }
    selectDistinct(...args) {
        return (new query_builder_1.QueryBuilder(this)).selectDistinct(...args);
    }
    selectDistinctOn(...args) {
        return (new query_builder_1.QueryBuilder(this)).selectDistinctOn(...args);
    }
    selective() {
        return (new query_builder_1.QueryBuilder(this)).selective();
    }
    self() {
        return (new query_builder_1.QueryBuilder(this)).self();
    }
    semantics() {
        return (new query_builder_1.QueryBuilder(this)).semantics();
    }
    semicolon(...args) {
        return (new query_builder_1.QueryBuilder(this)).semicolon(...args);
    }
    sensitive() {
        return (new query_builder_1.QueryBuilder(this)).sensitive();
    }
    sequence() {
        return (new query_builder_1.QueryBuilder(this)).sequence();
    }
    sequences() {
        return (new query_builder_1.QueryBuilder(this)).sequences();
    }
    serializable() {
        return (new query_builder_1.QueryBuilder(this)).serializable();
    }
    server() {
        return (new query_builder_1.QueryBuilder(this)).server();
    }
    serverName() {
        return (new query_builder_1.QueryBuilder(this)).serverName();
    }
    session() {
        return (new query_builder_1.QueryBuilder(this)).session();
    }
    sessionUser() {
        return (new query_builder_1.QueryBuilder(this)).sessionUser();
    }
    set(...args) {
        return (new query_builder_1.QueryBuilder(this)).set(...args);
    }
    setBit(...args) {
        return (new query_builder_1.QueryBuilder(this)).setBit(...args);
    }
    setByte(...args) {
        return (new query_builder_1.QueryBuilder(this)).setByte(...args);
    }
    setConfig(...args) {
        return (new query_builder_1.QueryBuilder(this)).setConfig(...args);
    }
    setMasklen(...args) {
        return (new query_builder_1.QueryBuilder(this)).setMasklen(...args);
    }
    setof() {
        return (new query_builder_1.QueryBuilder(this)).setof();
    }
    sets() {
        return (new query_builder_1.QueryBuilder(this)).sets();
    }
    setseed(...args) {
        return (new query_builder_1.QueryBuilder(this)).setseed(...args);
    }
    setval(...args) {
        return (new query_builder_1.QueryBuilder(this)).setval(...args);
    }
    setweight(...args) {
        return (new query_builder_1.QueryBuilder(this)).setweight(...args);
    }
    sha224(...args) {
        return (new query_builder_1.QueryBuilder(this)).sha224(...args);
    }
    sha256(...args) {
        return (new query_builder_1.QueryBuilder(this)).sha256(...args);
    }
    sha384(...args) {
        return (new query_builder_1.QueryBuilder(this)).sha384(...args);
    }
    sha512(...args) {
        return (new query_builder_1.QueryBuilder(this)).sha512(...args);
    }
    share() {
        return (new query_builder_1.QueryBuilder(this)).share();
    }
    shobjDescription(...args) {
        return (new query_builder_1.QueryBuilder(this)).shobjDescription(...args);
    }
    show() {
        return (new query_builder_1.QueryBuilder(this)).show();
    }
    sign(...args) {
        return (new query_builder_1.QueryBuilder(this)).sign(...args);
    }
    similar() {
        return (new query_builder_1.QueryBuilder(this)).similar();
    }
    similarTo(...args) {
        return (new query_builder_1.QueryBuilder(this)).similarTo(...args);
    }
    simple() {
        return (new query_builder_1.QueryBuilder(this)).simple();
    }
    sin(...args) {
        return (new query_builder_1.QueryBuilder(this)).sin(...args);
    }
    sind(...args) {
        return (new query_builder_1.QueryBuilder(this)).sind(...args);
    }
    sinh(...args) {
        return (new query_builder_1.QueryBuilder(this)).sinh(...args);
    }
    size() {
        return (new query_builder_1.QueryBuilder(this)).size();
    }
    skip() {
        return (new query_builder_1.QueryBuilder(this)).skip();
    }
    slope(...args) {
        return (new query_builder_1.QueryBuilder(this)).slope(...args);
    }
    smallint() {
        return (new query_builder_1.QueryBuilder(this)).smallint();
    }
    snapshot() {
        return (new query_builder_1.QueryBuilder(this)).snapshot();
    }
    some(...args) {
        return (new query_builder_1.QueryBuilder(this)).some(...args);
    }
    sortDirection() {
        return (new query_builder_1.QueryBuilder(this)).sortDirection();
    }
    source() {
        return (new query_builder_1.QueryBuilder(this)).source();
    }
    space() {
        return (new query_builder_1.QueryBuilder(this)).space();
    }
    specific() {
        return (new query_builder_1.QueryBuilder(this)).specific();
    }
    specificName() {
        return (new query_builder_1.QueryBuilder(this)).specificName();
    }
    specifictype() {
        return (new query_builder_1.QueryBuilder(this)).specifictype();
    }
    splitPart(...args) {
        return (new query_builder_1.QueryBuilder(this)).splitPart(...args);
    }
    sql() {
        return (new query_builder_1.QueryBuilder(this)).sql();
    }
    sqlcode() {
        return (new query_builder_1.QueryBuilder(this)).sqlcode();
    }
    sqlerror() {
        return (new query_builder_1.QueryBuilder(this)).sqlerror();
    }
    sqlexception() {
        return (new query_builder_1.QueryBuilder(this)).sqlexception();
    }
    sqlstate() {
        return (new query_builder_1.QueryBuilder(this)).sqlstate();
    }
    sqlwarning() {
        return (new query_builder_1.QueryBuilder(this)).sqlwarning();
    }
    sqrt(...args) {
        return (new query_builder_1.QueryBuilder(this)).sqrt(...args);
    }
    stable() {
        return (new query_builder_1.QueryBuilder(this)).stable();
    }
    standalone() {
        return (new query_builder_1.QueryBuilder(this)).standalone();
    }
    start() {
        return (new query_builder_1.QueryBuilder(this)).start();
    }
    startsWith(...args) {
        return (new query_builder_1.QueryBuilder(this)).startsWith(...args);
    }
    state() {
        return (new query_builder_1.QueryBuilder(this)).state();
    }
    statement() {
        return (new query_builder_1.QueryBuilder(this)).statement();
    }
    statementTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).statementTimestamp(...args);
    }
    static() {
        return (new query_builder_1.QueryBuilder(this)).static();
    }
    statistics() {
        return (new query_builder_1.QueryBuilder(this)).statistics();
    }
    stddev(...args) {
        return (new query_builder_1.QueryBuilder(this)).stddev(...args);
    }
    stddevPop(...args) {
        return (new query_builder_1.QueryBuilder(this)).stddevPop(...args);
    }
    stddevSamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).stddevSamp(...args);
    }
    stdin() {
        return (new query_builder_1.QueryBuilder(this)).stdin();
    }
    stdout() {
        return (new query_builder_1.QueryBuilder(this)).stdout();
    }
    storage() {
        return (new query_builder_1.QueryBuilder(this)).storage();
    }
    stored() {
        return (new query_builder_1.QueryBuilder(this)).stored();
    }
    strict() {
        return (new query_builder_1.QueryBuilder(this)).strict();
    }
    strictlyAbove(...args) {
        return (new query_builder_1.QueryBuilder(this)).strictlyAbove(...args);
    }
    strictlyBelow(...args) {
        return (new query_builder_1.QueryBuilder(this)).strictlyBelow(...args);
    }
    string() {
        return (new query_builder_1.QueryBuilder(this)).string();
    }
    stringAgg(...args) {
        return (new query_builder_1.QueryBuilder(this)).stringAgg(...args);
    }
    stringToArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).stringToArray(...args);
    }
    stringToTable(...args) {
        return (new query_builder_1.QueryBuilder(this)).stringToTable(...args);
    }
    strip(...args) {
        return (new query_builder_1.QueryBuilder(this)).strip(...args);
    }
    strpos(...args) {
        return (new query_builder_1.QueryBuilder(this)).strpos(...args);
    }
    structure() {
        return (new query_builder_1.QueryBuilder(this)).structure();
    }
    style() {
        return (new query_builder_1.QueryBuilder(this)).style();
    }
    sub(...args) {
        return (new query_builder_1.QueryBuilder(this)).sub(...args);
    }
    subclassOrigin() {
        return (new query_builder_1.QueryBuilder(this)).subclassOrigin();
    }
    submultiset() {
        return (new query_builder_1.QueryBuilder(this)).submultiset();
    }
    subscription() {
        return (new query_builder_1.QueryBuilder(this)).subscription();
    }
    subset() {
        return (new query_builder_1.QueryBuilder(this)).subset();
    }
    substr(...args) {
        return (new query_builder_1.QueryBuilder(this)).substr(...args);
    }
    substring(...args) {
        return (new query_builder_1.QueryBuilder(this)).substring(...args);
    }
    substringRegex() {
        return (new query_builder_1.QueryBuilder(this)).substringRegex();
    }
    succeeds() {
        return (new query_builder_1.QueryBuilder(this)).succeeds();
    }
    sum(...args) {
        return (new query_builder_1.QueryBuilder(this)).sum(...args);
    }
    support() {
        return (new query_builder_1.QueryBuilder(this)).support();
    }
    suppressRedundantUpdatesTrigger(...args) {
        return (new query_builder_1.QueryBuilder(this)).suppressRedundantUpdatesTrigger(...args);
    }
    symmetric() {
        return (new query_builder_1.QueryBuilder(this)).symmetric();
    }
    sysid() {
        return (new query_builder_1.QueryBuilder(this)).sysid();
    }
    system() {
        return (new query_builder_1.QueryBuilder(this)).system();
    }
    systemTime() {
        return (new query_builder_1.QueryBuilder(this)).systemTime();
    }
    systemUser() {
        return (new query_builder_1.QueryBuilder(this)).systemUser();
    }
    t(...args) {
        return (new query_builder_1.QueryBuilder(this)).t(...args);
    }
    table() {
        return (new query_builder_1.QueryBuilder(this)).table();
    }
    tableName() {
        return (new query_builder_1.QueryBuilder(this)).tableName();
    }
    tables() {
        return (new query_builder_1.QueryBuilder(this)).tables();
    }
    tablesample() {
        return (new query_builder_1.QueryBuilder(this)).tablesample();
    }
    tablespace() {
        return (new query_builder_1.QueryBuilder(this)).tablespace();
    }
    tableToXml(...args) {
        return (new query_builder_1.QueryBuilder(this)).tableToXml(...args);
    }
    tableToXmlAndXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).tableToXmlAndXmlschema(...args);
    }
    tableToXmlschema(...args) {
        return (new query_builder_1.QueryBuilder(this)).tableToXmlschema(...args);
    }
    tan(...args) {
        return (new query_builder_1.QueryBuilder(this)).tan(...args);
    }
    tand(...args) {
        return (new query_builder_1.QueryBuilder(this)).tand(...args);
    }
    tanh(...args) {
        return (new query_builder_1.QueryBuilder(this)).tanh(...args);
    }
    target() {
        return (new query_builder_1.QueryBuilder(this)).target();
    }
    temp() {
        return (new query_builder_1.QueryBuilder(this)).temp();
    }
    template() {
        return (new query_builder_1.QueryBuilder(this)).template();
    }
    temporary() {
        return (new query_builder_1.QueryBuilder(this)).temporary();
    }
    text() {
        return (new query_builder_1.QueryBuilder(this)).text();
    }
    textCat(...args) {
        return (new query_builder_1.QueryBuilder(this)).textCat(...args);
    }
    textInet(...args) {
        return (new query_builder_1.QueryBuilder(this)).textInet(...args);
    }
    then(...args) {
        return (new query_builder_1.QueryBuilder(this)).then(...args);
    }
    through() {
        return (new query_builder_1.QueryBuilder(this)).through();
    }
    ties() {
        return (new query_builder_1.QueryBuilder(this)).ties();
    }
    time() {
        return (new query_builder_1.QueryBuilder(this)).time();
    }
    timeofday(...args) {
        return (new query_builder_1.QueryBuilder(this)).timeofday(...args);
    }
    timestamp() {
        return (new query_builder_1.QueryBuilder(this)).timestamp();
    }
    timezone(...args) {
        return (new query_builder_1.QueryBuilder(this)).timezone(...args);
    }
    timezoneHour() {
        return (new query_builder_1.QueryBuilder(this)).timezoneHour();
    }
    timezoneMinute() {
        return (new query_builder_1.QueryBuilder(this)).timezoneMinute();
    }
    to() {
        return (new query_builder_1.QueryBuilder(this)).to();
    }
    toAscii(...args) {
        return (new query_builder_1.QueryBuilder(this)).toAscii(...args);
    }
    toBin(...args) {
        return (new query_builder_1.QueryBuilder(this)).toBin(...args);
    }
    toChar(...args) {
        return (new query_builder_1.QueryBuilder(this)).toChar(...args);
    }
    toDate(...args) {
        return (new query_builder_1.QueryBuilder(this)).toDate(...args);
    }
    toHex(...args) {
        return (new query_builder_1.QueryBuilder(this)).toHex(...args);
    }
    toJson(...args) {
        return (new query_builder_1.QueryBuilder(this)).toJson(...args);
    }
    toJsonb(...args) {
        return (new query_builder_1.QueryBuilder(this)).toJsonb(...args);
    }
    token() {
        return (new query_builder_1.QueryBuilder(this)).token();
    }
    toNumber(...args) {
        return (new query_builder_1.QueryBuilder(this)).toNumber(...args);
    }
    toOct(...args) {
        return (new query_builder_1.QueryBuilder(this)).toOct(...args);
    }
    topLevelCount() {
        return (new query_builder_1.QueryBuilder(this)).topLevelCount();
    }
    toRegclass(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegclass(...args);
    }
    toRegcollation(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegcollation(...args);
    }
    toRegnamespace(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegnamespace(...args);
    }
    toRegoper(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegoper(...args);
    }
    toRegoperator(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegoperator(...args);
    }
    toRegproc(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegproc(...args);
    }
    toRegprocedure(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegprocedure(...args);
    }
    toRegrole(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegrole(...args);
    }
    toRegtype(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegtype(...args);
    }
    toRegtypemod(...args) {
        return (new query_builder_1.QueryBuilder(this)).toRegtypemod(...args);
    }
    totalLength(...args) {
        return (new query_builder_1.QueryBuilder(this)).totalLength(...args);
    }
    toTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).toTimestamp(...args);
    }
    toTsquery(...args) {
        return (new query_builder_1.QueryBuilder(this)).toTsquery(...args);
    }
    toTsvector(...args) {
        return (new query_builder_1.QueryBuilder(this)).toTsvector(...args);
    }
    trailing() {
        return (new query_builder_1.QueryBuilder(this)).trailing();
    }
    transaction(...args) {
        return (new query_builder_1.QueryBuilder(this)).transaction(...args);
    }
    transactionActive() {
        return (new query_builder_1.QueryBuilder(this)).transactionActive();
    }
    transactionscommitted() {
        return (new query_builder_1.QueryBuilder(this)).transactionscommitted();
    }
    transactionsrolledback() {
        return (new query_builder_1.QueryBuilder(this)).transactionsrolledback();
    }
    transactionTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).transactionTimestamp(...args);
    }
    transform() {
        return (new query_builder_1.QueryBuilder(this)).transform();
    }
    transforms() {
        return (new query_builder_1.QueryBuilder(this)).transforms();
    }
    translate(...args) {
        return (new query_builder_1.QueryBuilder(this)).translate(...args);
    }
    translateRegex() {
        return (new query_builder_1.QueryBuilder(this)).translateRegex();
    }
    translation() {
        return (new query_builder_1.QueryBuilder(this)).translation();
    }
    treat() {
        return (new query_builder_1.QueryBuilder(this)).treat();
    }
    trigger() {
        return (new query_builder_1.QueryBuilder(this)).trigger();
    }
    triggerCatalog() {
        return (new query_builder_1.QueryBuilder(this)).triggerCatalog();
    }
    triggerName() {
        return (new query_builder_1.QueryBuilder(this)).triggerName();
    }
    triggerSchema() {
        return (new query_builder_1.QueryBuilder(this)).triggerSchema();
    }
    trim(...args) {
        return (new query_builder_1.QueryBuilder(this)).trim(...args);
    }
    trimArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).trimArray(...args);
    }
    trimScale(...args) {
        return (new query_builder_1.QueryBuilder(this)).trimScale(...args);
    }
    true() {
        return (new query_builder_1.QueryBuilder(this)).true();
    }
    trunc(...args) {
        return (new query_builder_1.QueryBuilder(this)).trunc(...args);
    }
    truncate() {
        return (new query_builder_1.QueryBuilder(this)).truncate();
    }
    trusted() {
        return (new query_builder_1.QueryBuilder(this)).trusted();
    }
    tsDebug(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsDebug(...args);
    }
    tsDelete(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsDelete(...args);
    }
    tsFilter(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsFilter(...args);
    }
    tsHeadline(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsHeadline(...args);
    }
    tsLexize(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsLexize(...args);
    }
    tsParse(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsParse(...args);
    }
    tsqueryPhrase(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsqueryPhrase(...args);
    }
    tsRank(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsRank(...args);
    }
    tsRankCd(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsRankCd(...args);
    }
    tsRewrite(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsRewrite(...args);
    }
    tsStat(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsStat(...args);
    }
    tsTokenType(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsTokenType(...args);
    }
    tsvectorToArray(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsvectorToArray(...args);
    }
    tsvectorUpdateTrigger(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsvectorUpdateTrigger(...args);
    }
    tsvectorUpdateTriggerColumn(...args) {
        return (new query_builder_1.QueryBuilder(this)).tsvectorUpdateTriggerColumn(...args);
    }
    txidCurrent(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidCurrent(...args);
    }
    txidCurrentIfAssigned(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidCurrentIfAssigned(...args);
    }
    txidCurrentSnapshot(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidCurrentSnapshot(...args);
    }
    txidSnapshotXip(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidSnapshotXip(...args);
    }
    txidSnapshotXmax(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidSnapshotXmax(...args);
    }
    txidSnapshotXmin(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidSnapshotXmin(...args);
    }
    txidStatus(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidStatus(...args);
    }
    txidVisibleInSnapshot(...args) {
        return (new query_builder_1.QueryBuilder(this)).txidVisibleInSnapshot(...args);
    }
    type() {
        return (new query_builder_1.QueryBuilder(this)).type();
    }
    types() {
        return (new query_builder_1.QueryBuilder(this)).types();
    }
    uescape() {
        return (new query_builder_1.QueryBuilder(this)).uescape();
    }
    unbounded() {
        return (new query_builder_1.QueryBuilder(this)).unbounded();
    }
    uncommitted() {
        return (new query_builder_1.QueryBuilder(this)).uncommitted();
    }
    unconditional() {
        return (new query_builder_1.QueryBuilder(this)).unconditional();
    }
    under() {
        return (new query_builder_1.QueryBuilder(this)).under();
    }
    unencrypted() {
        return (new query_builder_1.QueryBuilder(this)).unencrypted();
    }
    unicodeAssigned(...args) {
        return (new query_builder_1.QueryBuilder(this)).unicodeAssigned(...args);
    }
    unicodeVersion(...args) {
        return (new query_builder_1.QueryBuilder(this)).unicodeVersion(...args);
    }
    union(...args) {
        return (new query_builder_1.QueryBuilder(this)).union(...args);
    }
    unionAll(...args) {
        return (new query_builder_1.QueryBuilder(this)).unionAll(...args);
    }
    unique() {
        return (new query_builder_1.QueryBuilder(this)).unique();
    }
    unistr(...args) {
        return (new query_builder_1.QueryBuilder(this)).unistr(...args);
    }
    unknown() {
        return (new query_builder_1.QueryBuilder(this)).unknown();
    }
    unlink() {
        return (new query_builder_1.QueryBuilder(this)).unlink();
    }
    unlisten() {
        return (new query_builder_1.QueryBuilder(this)).unlisten();
    }
    unlogged() {
        return (new query_builder_1.QueryBuilder(this)).unlogged();
    }
    unmatched() {
        return (new query_builder_1.QueryBuilder(this)).unmatched();
    }
    unnamed() {
        return (new query_builder_1.QueryBuilder(this)).unnamed();
    }
    unnest(...args) {
        return (new query_builder_1.QueryBuilder(this)).unnest(...args);
    }
    unnestMultirange(...args) {
        return (new query_builder_1.QueryBuilder(this)).unnestMultirange(...args);
    }
    until() {
        return (new query_builder_1.QueryBuilder(this)).until();
    }
    untyped() {
        return (new query_builder_1.QueryBuilder(this)).untyped();
    }
    update(...args) {
        return (new query_builder_1.QueryBuilder(this)).update(...args);
    }
    upper(...args) {
        return (new query_builder_1.QueryBuilder(this)).upper(...args);
    }
    upperInc(...args) {
        return (new query_builder_1.QueryBuilder(this)).upperInc(...args);
    }
    upperInf(...args) {
        return (new query_builder_1.QueryBuilder(this)).upperInf(...args);
    }
    uri() {
        return (new query_builder_1.QueryBuilder(this)).uri();
    }
    usage() {
        return (new query_builder_1.QueryBuilder(this)).usage();
    }
    user() {
        return (new query_builder_1.QueryBuilder(this)).user();
    }
    userdefinedtypecatalog() {
        return (new query_builder_1.QueryBuilder(this)).userdefinedtypecatalog();
    }
    userdefinedtypecode() {
        return (new query_builder_1.QueryBuilder(this)).userdefinedtypecode();
    }
    userdefinedtypename() {
        return (new query_builder_1.QueryBuilder(this)).userdefinedtypename();
    }
    userdefinedtypeschema() {
        return (new query_builder_1.QueryBuilder(this)).userdefinedtypeschema();
    }
    using() {
        return (new query_builder_1.QueryBuilder(this)).using();
    }
    utf16() {
        return (new query_builder_1.QueryBuilder(this)).utf16();
    }
    utf32() {
        return (new query_builder_1.QueryBuilder(this)).utf32();
    }
    utf8() {
        return (new query_builder_1.QueryBuilder(this)).utf8();
    }
    uuidExtractTimestamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).uuidExtractTimestamp(...args);
    }
    uuidExtractVersion(...args) {
        return (new query_builder_1.QueryBuilder(this)).uuidExtractVersion(...args);
    }
    uuidv4(...args) {
        return (new query_builder_1.QueryBuilder(this)).uuidv4(...args);
    }
    uuidv7(...args) {
        return (new query_builder_1.QueryBuilder(this)).uuidv7(...args);
    }
    v(...args) {
        return (new query_builder_1.QueryBuilder(this)).v(...args);
    }
    vacuum() {
        return (new query_builder_1.QueryBuilder(this)).vacuum();
    }
    valid() {
        return (new query_builder_1.QueryBuilder(this)).valid();
    }
    validate() {
        return (new query_builder_1.QueryBuilder(this)).validate();
    }
    validator() {
        return (new query_builder_1.QueryBuilder(this)).validator();
    }
    value() {
        return (new query_builder_1.QueryBuilder(this)).value();
    }
    valueOfKeyword() {
        return (new query_builder_1.QueryBuilder(this)).valueOfKeyword();
    }
    values(...args) {
        return (new query_builder_1.QueryBuilder(this)).values(...args);
    }
    varbinary() {
        return (new query_builder_1.QueryBuilder(this)).varbinary();
    }
    varchar() {
        return (new query_builder_1.QueryBuilder(this)).varchar();
    }
    variadic() {
        return (new query_builder_1.QueryBuilder(this)).variadic();
    }
    variance(...args) {
        return (new query_builder_1.QueryBuilder(this)).variance(...args);
    }
    varPop(...args) {
        return (new query_builder_1.QueryBuilder(this)).varPop(...args);
    }
    varSamp(...args) {
        return (new query_builder_1.QueryBuilder(this)).varSamp(...args);
    }
    varying() {
        return (new query_builder_1.QueryBuilder(this)).varying();
    }
    verbose() {
        return (new query_builder_1.QueryBuilder(this)).verbose();
    }
    version() {
        return (new query_builder_1.QueryBuilder(this)).version();
    }
    versioning() {
        return (new query_builder_1.QueryBuilder(this)).versioning();
    }
    vertical(...args) {
        return (new query_builder_1.QueryBuilder(this)).vertical(...args);
    }
    view() {
        return (new query_builder_1.QueryBuilder(this)).view();
    }
    views() {
        return (new query_builder_1.QueryBuilder(this)).views();
    }
    virtual() {
        return (new query_builder_1.QueryBuilder(this)).virtual();
    }
    volatile() {
        return (new query_builder_1.QueryBuilder(this)).volatile();
    }
    websearchToTsquery(...args) {
        return (new query_builder_1.QueryBuilder(this)).websearchToTsquery(...args);
    }
    when(...args) {
        return (new query_builder_1.QueryBuilder(this)).when(...args);
    }
    whenever() {
        return (new query_builder_1.QueryBuilder(this)).whenever();
    }
    where(...args) {
        return (new query_builder_1.QueryBuilder(this)).where(...args);
    }
    whitespace() {
        return (new query_builder_1.QueryBuilder(this)).whitespace();
    }
    width(...args) {
        return (new query_builder_1.QueryBuilder(this)).width(...args);
    }
    widthBucket(...args) {
        return (new query_builder_1.QueryBuilder(this)).widthBucket(...args);
    }
    window() {
        return (new query_builder_1.QueryBuilder(this)).window();
    }
    with(...args) {
        return (new query_builder_1.QueryBuilder(this)).with(...args);
    }
    within() {
        return (new query_builder_1.QueryBuilder(this)).within();
    }
    without() {
        return (new query_builder_1.QueryBuilder(this)).without();
    }
    work() {
        return (new query_builder_1.QueryBuilder(this)).work();
    }
    wrapper() {
        return (new query_builder_1.QueryBuilder(this)).wrapper();
    }
    write() {
        return (new query_builder_1.QueryBuilder(this)).write();
    }
    xml() {
        return (new query_builder_1.QueryBuilder(this)).xml();
    }
    xmlagg(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlagg(...args);
    }
    xmlattributes(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlattributes(...args);
    }
    xmlbinary() {
        return (new query_builder_1.QueryBuilder(this)).xmlbinary();
    }
    xmlcast() {
        return (new query_builder_1.QueryBuilder(this)).xmlcast();
    }
    xmlcomment(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlcomment(...args);
    }
    xmlconcat(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlconcat(...args);
    }
    xmldeclaration() {
        return (new query_builder_1.QueryBuilder(this)).xmldeclaration();
    }
    xmldocument() {
        return (new query_builder_1.QueryBuilder(this)).xmldocument();
    }
    xmlelement(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlelement(...args);
    }
    xmlexists() {
        return (new query_builder_1.QueryBuilder(this)).xmlexists();
    }
    xmlExists(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlExists(...args);
    }
    xmlforest(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlforest(...args);
    }
    xmlIsWellFormed(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlIsWellFormed(...args);
    }
    xmlIsWellFormedContent(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlIsWellFormedContent(...args);
    }
    xmlIsWellFormedDocument(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlIsWellFormedDocument(...args);
    }
    xmliterate() {
        return (new query_builder_1.QueryBuilder(this)).xmliterate();
    }
    xmlnamespaces() {
        return (new query_builder_1.QueryBuilder(this)).xmlnamespaces();
    }
    xmlparse(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlparse(...args);
    }
    xmlpi(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlpi(...args);
    }
    xmlquery() {
        return (new query_builder_1.QueryBuilder(this)).xmlquery();
    }
    xmlroot(...args) {
        return (new query_builder_1.QueryBuilder(this)).xmlroot(...args);
    }
    xmlschema() {
        return (new query_builder_1.QueryBuilder(this)).xmlschema();
    }
    xmlserialize() {
        return (new query_builder_1.QueryBuilder(this)).xmlserialize();
    }
    xmltable() {
        return (new query_builder_1.QueryBuilder(this)).xmltable();
    }
    xmltext() {
        return (new query_builder_1.QueryBuilder(this)).xmltext();
    }
    xmlvalidate() {
        return (new query_builder_1.QueryBuilder(this)).xmlvalidate();
    }
    xpath(...args) {
        return (new query_builder_1.QueryBuilder(this)).xpath(...args);
    }
    xpathExists(...args) {
        return (new query_builder_1.QueryBuilder(this)).xpathExists(...args);
    }
    year() {
        return (new query_builder_1.QueryBuilder(this)).year();
    }
    yes() {
        return (new query_builder_1.QueryBuilder(this)).yes();
    }
    zone() {
        return (new query_builder_1.QueryBuilder(this)).zone();
    }
}
exports.QueryInstance = QueryInstance;
