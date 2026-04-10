import { QueryBuilder } from "../query-builder";
export class QueryInstance {
    dbInstance;
    constructor(dbInstance) {
        this.dbInstance = dbInstance;
    }
    getDbInstance() {
        return this.dbInstance;
    }
    a() {
        return (new QueryBuilder(this)).a();
    }
    abbrev(...args) {
        return (new QueryBuilder(this)).abbrev(...args);
    }
    abort() {
        return (new QueryBuilder(this)).abort();
    }
    above(...args) {
        return (new QueryBuilder(this)).above(...args);
    }
    abs(...args) {
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
    acldefault(...args) {
        return (new QueryBuilder(this)).acldefault(...args);
    }
    aclexplode(...args) {
        return (new QueryBuilder(this)).aclexplode(...args);
    }
    acos(...args) {
        return (new QueryBuilder(this)).acos(...args);
    }
    acosd(...args) {
        return (new QueryBuilder(this)).acosd(...args);
    }
    acosh(...args) {
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
    age(...args) {
        return (new QueryBuilder(this)).age(...args);
    }
    aggregate() {
        return (new QueryBuilder(this)).aggregate();
    }
    all(...args) {
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
    and(...args) {
        return (new QueryBuilder(this)).and(...args);
    }
    any(...args) {
        return (new QueryBuilder(this)).any(...args);
    }
    anyValue(...args) {
        return (new QueryBuilder(this)).anyValue(...args);
    }
    are() {
        return (new QueryBuilder(this)).are();
    }
    area(...args) {
        return (new QueryBuilder(this)).area(...args);
    }
    array() {
        return (new QueryBuilder(this)).array();
    }
    arrayAgg(...args) {
        return (new QueryBuilder(this)).arrayAgg(...args);
    }
    arrayAppend(...args) {
        return (new QueryBuilder(this)).arrayAppend(...args);
    }
    arrayCat(...args) {
        return (new QueryBuilder(this)).arrayCat(...args);
    }
    arrayDims(...args) {
        return (new QueryBuilder(this)).arrayDims(...args);
    }
    arrayFill(...args) {
        return (new QueryBuilder(this)).arrayFill(...args);
    }
    arrayLength(...args) {
        return (new QueryBuilder(this)).arrayLength(...args);
    }
    arrayLower(...args) {
        return (new QueryBuilder(this)).arrayLower(...args);
    }
    arraymaxcardinality() {
        return (new QueryBuilder(this)).arraymaxcardinality();
    }
    arrayNdims(...args) {
        return (new QueryBuilder(this)).arrayNdims(...args);
    }
    arrayPosition(...args) {
        return (new QueryBuilder(this)).arrayPosition(...args);
    }
    arrayPositions(...args) {
        return (new QueryBuilder(this)).arrayPositions(...args);
    }
    arrayPrepend(...args) {
        return (new QueryBuilder(this)).arrayPrepend(...args);
    }
    arrayRemove(...args) {
        return (new QueryBuilder(this)).arrayRemove(...args);
    }
    arrayReplace(...args) {
        return (new QueryBuilder(this)).arrayReplace(...args);
    }
    arrayReverse(...args) {
        return (new QueryBuilder(this)).arrayReverse(...args);
    }
    arraySample(...args) {
        return (new QueryBuilder(this)).arraySample(...args);
    }
    arrayShuffle(...args) {
        return (new QueryBuilder(this)).arrayShuffle(...args);
    }
    arraySort(...args) {
        return (new QueryBuilder(this)).arraySort(...args);
    }
    arrayToJson(...args) {
        return (new QueryBuilder(this)).arrayToJson(...args);
    }
    arrayToString(...args) {
        return (new QueryBuilder(this)).arrayToString(...args);
    }
    arrayToTsvector(...args) {
        return (new QueryBuilder(this)).arrayToTsvector(...args);
    }
    arrayUpper(...args) {
        return (new QueryBuilder(this)).arrayUpper(...args);
    }
    as(...args) {
        return (new QueryBuilder(this)).as(...args);
    }
    asc(...args) {
        return (new QueryBuilder(this)).asc(...args);
    }
    ascii(...args) {
        return (new QueryBuilder(this)).ascii(...args);
    }
    asensitive() {
        return (new QueryBuilder(this)).asensitive();
    }
    asin(...args) {
        return (new QueryBuilder(this)).asin(...args);
    }
    asind(...args) {
        return (new QueryBuilder(this)).asind(...args);
    }
    asinh(...args) {
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
    atan(...args) {
        return (new QueryBuilder(this)).atan(...args);
    }
    atan2(...args) {
        return (new QueryBuilder(this)).atan2(...args);
    }
    atan2d(...args) {
        return (new QueryBuilder(this)).atan2d(...args);
    }
    atand(...args) {
        return (new QueryBuilder(this)).atand(...args);
    }
    atanh(...args) {
        return (new QueryBuilder(this)).atanh(...args);
    }
    atomic() {
        return (new QueryBuilder(this)).atomic();
    }
    atSign(...args) {
        return (new QueryBuilder(this)).atSign(...args);
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
    avg(...args) {
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
    beginTransaction(...args) {
        return (new QueryBuilder(this)).beginTransaction(...args);
    }
    below(...args) {
        return (new QueryBuilder(this)).below(...args);
    }
    bernoulli() {
        return (new QueryBuilder(this)).bernoulli();
    }
    between(...args) {
        return (new QueryBuilder(this)).between(...args);
    }
    betweenSymmetric(...args) {
        return (new QueryBuilder(this)).betweenSymmetric(...args);
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
    bitAnd(...args) {
        return (new QueryBuilder(this)).bitAnd(...args);
    }
    bitCount(...args) {
        return (new QueryBuilder(this)).bitCount(...args);
    }
    bitLength(...args) {
        return (new QueryBuilder(this)).bitLength(...args);
    }
    bitOr(...args) {
        return (new QueryBuilder(this)).bitOr(...args);
    }
    bitwiseAnd(...args) {
        return (new QueryBuilder(this)).bitwiseAnd(...args);
    }
    bitwiseLeftShift(...args) {
        return (new QueryBuilder(this)).bitwiseLeftShift(...args);
    }
    bitwiseLeftShiftAssign(...args) {
        return (new QueryBuilder(this)).bitwiseLeftShiftAssign(...args);
    }
    bitwiseOr(...args) {
        return (new QueryBuilder(this)).bitwiseOr(...args);
    }
    bitwiseRightShift(...args) {
        return (new QueryBuilder(this)).bitwiseRightShift(...args);
    }
    bitwiseRightShiftAssign(...args) {
        return (new QueryBuilder(this)).bitwiseRightShiftAssign(...args);
    }
    bitwiseXor(...args) {
        return (new QueryBuilder(this)).bitwiseXor(...args);
    }
    bitXor(...args) {
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
    boolAnd(...args) {
        return (new QueryBuilder(this)).boolAnd(...args);
    }
    boolean() {
        return (new QueryBuilder(this)).boolean();
    }
    boolOr(...args) {
        return (new QueryBuilder(this)).boolOr(...args);
    }
    both() {
        return (new QueryBuilder(this)).both();
    }
    boundBox(...args) {
        return (new QueryBuilder(this)).boundBox(...args);
    }
    box(...args) {
        return (new QueryBuilder(this)).box(...args);
    }
    breadth() {
        return (new QueryBuilder(this)).breadth();
    }
    brinDesummarizeRange(...args) {
        return (new QueryBuilder(this)).brinDesummarizeRange(...args);
    }
    brinSummarizeNewValues(...args) {
        return (new QueryBuilder(this)).brinSummarizeNewValues(...args);
    }
    brinSummarizeRange(...args) {
        return (new QueryBuilder(this)).brinSummarizeRange(...args);
    }
    broadcast(...args) {
        return (new QueryBuilder(this)).broadcast(...args);
    }
    btrim(...args) {
        return (new QueryBuilder(this)).btrim(...args);
    }
    by() {
        return (new QueryBuilder(this)).by();
    }
    c(...args) {
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
    cardinality(...args) {
        return (new QueryBuilder(this)).cardinality(...args);
    }
    caretAt(...args) {
        return (new QueryBuilder(this)).caretAt(...args);
    }
    cascade() {
        return (new QueryBuilder(this)).cascade();
    }
    cascaded() {
        return (new QueryBuilder(this)).cascaded();
    }
    case(...args) {
        return (new QueryBuilder(this)).case(...args);
    }
    casefold(...args) {
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
    cbrt(...args) {
        return (new QueryBuilder(this)).cbrt(...args);
    }
    ceil(...args) {
        return (new QueryBuilder(this)).ceil(...args);
    }
    ceiling(...args) {
        return (new QueryBuilder(this)).ceiling(...args);
    }
    center(...args) {
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
    characterLength(...args) {
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
    charLength(...args) {
        return (new QueryBuilder(this)).charLength(...args);
    }
    check() {
        return (new QueryBuilder(this)).check();
    }
    checkpoint() {
        return (new QueryBuilder(this)).checkpoint();
    }
    chr(...args) {
        return (new QueryBuilder(this)).chr(...args);
    }
    circle(...args) {
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
    clockTimestamp(...args) {
        return (new QueryBuilder(this)).clockTimestamp(...args);
    }
    close() {
        return (new QueryBuilder(this)).close();
    }
    closestPoint(...args) {
        return (new QueryBuilder(this)).closestPoint(...args);
    }
    cluster() {
        return (new QueryBuilder(this)).cluster();
    }
    coalesce(...args) {
        return (new QueryBuilder(this)).coalesce(...args);
    }
    cobol() {
        return (new QueryBuilder(this)).cobol();
    }
    colDescription(...args) {
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
    collationFor(...args) {
        return (new QueryBuilder(this)).collationFor(...args);
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
    column(...args) {
        return (new QueryBuilder(this)).column(...args);
    }
    columnName() {
        return (new QueryBuilder(this)).columnName();
    }
    columns() {
        return (new QueryBuilder(this)).columns();
    }
    comma(...args) {
        return (new QueryBuilder(this)).comma(...args);
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
    commitPreparedTransaction(...args) {
        return (new QueryBuilder(this)).commitPreparedTransaction(...args);
    }
    committed() {
        return (new QueryBuilder(this)).committed();
    }
    commitTransaction(...args) {
        return (new QueryBuilder(this)).commitTransaction(...args);
    }
    compression() {
        return (new QueryBuilder(this)).compression();
    }
    concat(...args) {
        return (new QueryBuilder(this)).concat(...args);
    }
    concatWs(...args) {
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
    containedBy(...args) {
        return (new QueryBuilder(this)).containedBy(...args);
    }
    containment(...args) {
        return (new QueryBuilder(this)).containment(...args);
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
    convert(...args) {
        return (new QueryBuilder(this)).convert(...args);
    }
    convertFrom(...args) {
        return (new QueryBuilder(this)).convertFrom(...args);
    }
    convertTo(...args) {
        return (new QueryBuilder(this)).convertTo(...args);
    }
    copartition() {
        return (new QueryBuilder(this)).copartition();
    }
    copy() {
        return (new QueryBuilder(this)).copy();
    }
    corr(...args) {
        return (new QueryBuilder(this)).corr(...args);
    }
    corresponding() {
        return (new QueryBuilder(this)).corresponding();
    }
    cos(...args) {
        return (new QueryBuilder(this)).cos(...args);
    }
    cosd(...args) {
        return (new QueryBuilder(this)).cosd(...args);
    }
    cosh(...args) {
        return (new QueryBuilder(this)).cosh(...args);
    }
    cost() {
        return (new QueryBuilder(this)).cost();
    }
    cot(...args) {
        return (new QueryBuilder(this)).cot(...args);
    }
    cotd(...args) {
        return (new QueryBuilder(this)).cotd(...args);
    }
    count(...args) {
        return (new QueryBuilder(this)).count(...args);
    }
    covarPop(...args) {
        return (new QueryBuilder(this)).covarPop(...args);
    }
    covarSamp(...args) {
        return (new QueryBuilder(this)).covarSamp(...args);
    }
    crc32(...args) {
        return (new QueryBuilder(this)).crc32(...args);
    }
    crc32c(...args) {
        return (new QueryBuilder(this)).crc32c(...args);
    }
    create() {
        return (new QueryBuilder(this)).create();
    }
    cross() {
        return (new QueryBuilder(this)).cross();
    }
    crosses(...args) {
        return (new QueryBuilder(this)).crosses(...args);
    }
    crossJoin(...args) {
        return (new QueryBuilder(this)).crossJoin(...args);
    }
    crossJoinLateral(...args) {
        return (new QueryBuilder(this)).crossJoinLateral(...args);
    }
    csv() {
        return (new QueryBuilder(this)).csv();
    }
    cube() {
        return (new QueryBuilder(this)).cube();
    }
    cumeDist(...args) {
        return (new QueryBuilder(this)).cumeDist(...args);
    }
    current() {
        return (new QueryBuilder(this)).current();
    }
    currentCatalog() {
        return (new QueryBuilder(this)).currentCatalog();
    }
    currentDatabase(...args) {
        return (new QueryBuilder(this)).currentDatabase(...args);
    }
    currentDate(...args) {
        return (new QueryBuilder(this)).currentDate(...args);
    }
    currentdefaulttransformgroup() {
        return (new QueryBuilder(this)).currentdefaulttransformgroup();
    }
    currentPath() {
        return (new QueryBuilder(this)).currentPath();
    }
    currentQuery(...args) {
        return (new QueryBuilder(this)).currentQuery(...args);
    }
    currentRole() {
        return (new QueryBuilder(this)).currentRole();
    }
    currentRow() {
        return (new QueryBuilder(this)).currentRow();
    }
    currentSchema(...args) {
        return (new QueryBuilder(this)).currentSchema(...args);
    }
    currentSchemas(...args) {
        return (new QueryBuilder(this)).currentSchemas(...args);
    }
    currentSetting(...args) {
        return (new QueryBuilder(this)).currentSetting(...args);
    }
    currentTime(...args) {
        return (new QueryBuilder(this)).currentTime(...args);
    }
    currentTimestamp(...args) {
        return (new QueryBuilder(this)).currentTimestamp(...args);
    }
    currenttransformgroupfortype() {
        return (new QueryBuilder(this)).currenttransformgroupfortype();
    }
    currentUser() {
        return (new QueryBuilder(this)).currentUser();
    }
    currval(...args) {
        return (new QueryBuilder(this)).currval(...args);
    }
    cursor() {
        return (new QueryBuilder(this)).cursor();
    }
    cursorName() {
        return (new QueryBuilder(this)).cursorName();
    }
    cursorToXml(...args) {
        return (new QueryBuilder(this)).cursorToXml(...args);
    }
    cursorToXmlschema(...args) {
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
    databaseToXml(...args) {
        return (new QueryBuilder(this)).databaseToXml(...args);
    }
    databaseToXmlAndXmlschema(...args) {
        return (new QueryBuilder(this)).databaseToXmlAndXmlschema(...args);
    }
    databaseToXmlschema(...args) {
        return (new QueryBuilder(this)).databaseToXmlschema(...args);
    }
    datalink() {
        return (new QueryBuilder(this)).datalink();
    }
    date() {
        return (new QueryBuilder(this)).date();
    }
    dateAdd(...args) {
        return (new QueryBuilder(this)).dateAdd(...args);
    }
    dateBin(...args) {
        return (new QueryBuilder(this)).dateBin(...args);
    }
    datePart(...args) {
        return (new QueryBuilder(this)).datePart(...args);
    }
    dateSubtract(...args) {
        return (new QueryBuilder(this)).dateSubtract(...args);
    }
    datetimeintervalcode() {
        return (new QueryBuilder(this)).datetimeintervalcode();
    }
    datetimeintervalprecision() {
        return (new QueryBuilder(this)).datetimeintervalprecision();
    }
    dateTrunc(...args) {
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
    decode(...args) {
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
    degrees(...args) {
        return (new QueryBuilder(this)).degrees(...args);
    }
    delete(...args) {
        return (new QueryBuilder(this)).delete(...args);
    }
    delimiter() {
        return (new QueryBuilder(this)).delimiter();
    }
    delimiters() {
        return (new QueryBuilder(this)).delimiters();
    }
    denseRank(...args) {
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
    desc(...args) {
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
    diagonal(...args) {
        return (new QueryBuilder(this)).diagonal(...args);
    }
    diameter(...args) {
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
    distance(...args) {
        return (new QueryBuilder(this)).distance(...args);
    }
    distinct() {
        return (new QueryBuilder(this)).distinct();
    }
    div(...args) {
        return (new QueryBuilder(this)).div(...args);
    }
    divide(...args) {
        return (new QueryBuilder(this)).divide(...args);
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
    doNothing(...args) {
        return (new QueryBuilder(this)).doNothing(...args);
    }
    double() {
        return (new QueryBuilder(this)).double();
    }
    doUpdate(...args) {
        return (new QueryBuilder(this)).doUpdate(...args);
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
    else(...args) {
        return (new QueryBuilder(this)).else(...args);
    }
    empty() {
        return (new QueryBuilder(this)).empty();
    }
    enable() {
        return (new QueryBuilder(this)).enable();
    }
    encode(...args) {
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
    enumFirst(...args) {
        return (new QueryBuilder(this)).enumFirst(...args);
    }
    enumLast(...args) {
        return (new QueryBuilder(this)).enumLast(...args);
    }
    enumRange(...args) {
        return (new QueryBuilder(this)).enumRange(...args);
    }
    eq(...args) {
        return (new QueryBuilder(this)).eq(...args);
    }
    equals() {
        return (new QueryBuilder(this)).equals();
    }
    erf(...args) {
        return (new QueryBuilder(this)).erf(...args);
    }
    erfc(...args) {
        return (new QueryBuilder(this)).erfc(...args);
    }
    error() {
        return (new QueryBuilder(this)).error();
    }
    escape(...args) {
        return (new QueryBuilder(this)).escape(...args);
    }
    event() {
        return (new QueryBuilder(this)).event();
    }
    every(...args) {
        return (new QueryBuilder(this)).every(...args);
    }
    except(...args) {
        return (new QueryBuilder(this)).except(...args);
    }
    exceptAll(...args) {
        return (new QueryBuilder(this)).exceptAll(...args);
    }
    exception() {
        return (new QueryBuilder(this)).exception();
    }
    exclamation(...args) {
        return (new QueryBuilder(this)).exclamation(...args);
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
    exists(...args) {
        return (new QueryBuilder(this)).exists(...args);
    }
    exp(...args) {
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
    extract(...args) {
        return (new QueryBuilder(this)).extract(...args);
    }
    factorial(...args) {
        return (new QueryBuilder(this)).factorial(...args);
    }
    false() {
        return (new QueryBuilder(this)).false();
    }
    family(...args) {
        return (new QueryBuilder(this)).family(...args);
    }
    fetch(...args) {
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
    firstValue(...args) {
        return (new QueryBuilder(this)).firstValue(...args);
    }
    flag() {
        return (new QueryBuilder(this)).flag();
    }
    float() {
        return (new QueryBuilder(this)).float();
    }
    floor(...args) {
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
    format(...args) {
        return (new QueryBuilder(this)).format(...args);
    }
    formatType(...args) {
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
    from(...args) {
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
    fullJoin(...args) {
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
    gamma(...args) {
        return (new QueryBuilder(this)).gamma(...args);
    }
    gcd(...args) {
        return (new QueryBuilder(this)).gcd(...args);
    }
    general() {
        return (new QueryBuilder(this)).general();
    }
    generated() {
        return (new QueryBuilder(this)).generated();
    }
    generateSeries(...args) {
        return (new QueryBuilder(this)).generateSeries(...args);
    }
    generateSubscripts(...args) {
        return (new QueryBuilder(this)).generateSubscripts(...args);
    }
    genRandomUuid(...args) {
        return (new QueryBuilder(this)).genRandomUuid(...args);
    }
    get() {
        return (new QueryBuilder(this)).get();
    }
    getBit(...args) {
        return (new QueryBuilder(this)).getBit(...args);
    }
    getByte(...args) {
        return (new QueryBuilder(this)).getByte(...args);
    }
    getCurrentTsConfig(...args) {
        return (new QueryBuilder(this)).getCurrentTsConfig(...args);
    }
    ginCleanPendingList(...args) {
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
    greatest(...args) {
        return (new QueryBuilder(this)).greatest(...args);
    }
    group() {
        return (new QueryBuilder(this)).group();
    }
    groupBy(...args) {
        return (new QueryBuilder(this)).groupBy(...args);
    }
    groupByDistinct(...args) {
        return (new QueryBuilder(this)).groupByDistinct(...args);
    }
    grouping(...args) {
        return (new QueryBuilder(this)).grouping(...args);
    }
    groups() {
        return (new QueryBuilder(this)).groups();
    }
    gt(...args) {
        return (new QueryBuilder(this)).gt(...args);
    }
    gte(...args) {
        return (new QueryBuilder(this)).gte(...args);
    }
    handler() {
        return (new QueryBuilder(this)).handler();
    }
    hasAnyColumnPrivilege(...args) {
        return (new QueryBuilder(this)).hasAnyColumnPrivilege(...args);
    }
    hasColumnPrivilege(...args) {
        return (new QueryBuilder(this)).hasColumnPrivilege(...args);
    }
    hasDatabasePrivilege(...args) {
        return (new QueryBuilder(this)).hasDatabasePrivilege(...args);
    }
    hasForeignDataWrapperPrivilege(...args) {
        return (new QueryBuilder(this)).hasForeignDataWrapperPrivilege(...args);
    }
    hasFunctionPrivilege(...args) {
        return (new QueryBuilder(this)).hasFunctionPrivilege(...args);
    }
    hash(...args) {
        return (new QueryBuilder(this)).hash(...args);
    }
    hasLanguagePrivilege(...args) {
        return (new QueryBuilder(this)).hasLanguagePrivilege(...args);
    }
    hasLargeobjectPrivilege(...args) {
        return (new QueryBuilder(this)).hasLargeobjectPrivilege(...args);
    }
    hasParameterPrivilege(...args) {
        return (new QueryBuilder(this)).hasParameterPrivilege(...args);
    }
    hasSchemaPrivilege(...args) {
        return (new QueryBuilder(this)).hasSchemaPrivilege(...args);
    }
    hasSequencePrivilege(...args) {
        return (new QueryBuilder(this)).hasSequencePrivilege(...args);
    }
    hasServerPrivilege(...args) {
        return (new QueryBuilder(this)).hasServerPrivilege(...args);
    }
    hasTablePrivilege(...args) {
        return (new QueryBuilder(this)).hasTablePrivilege(...args);
    }
    hasTablespacePrivilege(...args) {
        return (new QueryBuilder(this)).hasTablespacePrivilege(...args);
    }
    hasTypePrivilege(...args) {
        return (new QueryBuilder(this)).hasTypePrivilege(...args);
    }
    having(...args) {
        return (new QueryBuilder(this)).having(...args);
    }
    header() {
        return (new QueryBuilder(this)).header();
    }
    height(...args) {
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
    horizontal(...args) {
        return (new QueryBuilder(this)).horizontal(...args);
    }
    host(...args) {
        return (new QueryBuilder(this)).host(...args);
    }
    hostmask(...args) {
        return (new QueryBuilder(this)).hostmask(...args);
    }
    hour() {
        return (new QueryBuilder(this)).hour();
    }
    i(...args) {
        return (new QueryBuilder(this)).i(...args);
    }
    icuUnicodeVersion(...args) {
        return (new QueryBuilder(this)).icuUnicodeVersion(...args);
    }
    id() {
        return (new QueryBuilder(this)).id();
    }
    identifier(...args) {
        return (new QueryBuilder(this)).identifier(...args);
    }
    identifierArray(...args) {
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
    ilike(...args) {
        return (new QueryBuilder(this)).ilike(...args);
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
    in(...args) {
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
    inetClientAddr(...args) {
        return (new QueryBuilder(this)).inetClientAddr(...args);
    }
    inetClientPort(...args) {
        return (new QueryBuilder(this)).inetClientPort(...args);
    }
    inetMerge(...args) {
        return (new QueryBuilder(this)).inetMerge(...args);
    }
    inetSameFamily(...args) {
        return (new QueryBuilder(this)).inetSameFamily(...args);
    }
    inetServerAddr(...args) {
        return (new QueryBuilder(this)).inetServerAddr(...args);
    }
    inetServerPort(...args) {
        return (new QueryBuilder(this)).inetServerPort(...args);
    }
    inherit() {
        return (new QueryBuilder(this)).inherit();
    }
    inherits() {
        return (new QueryBuilder(this)).inherits();
    }
    initcap(...args) {
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
    innerJoin(...args) {
        return (new QueryBuilder(this)).innerJoin(...args);
    }
    innerJoinLateral(...args) {
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
    insert(...args) {
        return (new QueryBuilder(this)).insert(...args);
    }
    insertInto(...args) {
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
    intersect(...args) {
        return (new QueryBuilder(this)).intersect(...args);
    }
    intersectAll(...args) {
        return (new QueryBuilder(this)).intersectAll(...args);
    }
    intersection() {
        return (new QueryBuilder(this)).intersection();
    }
    interval() {
        return (new QueryBuilder(this)).interval();
    }
    into(...args) {
        return (new QueryBuilder(this)).into(...args);
    }
    invoker() {
        return (new QueryBuilder(this)).invoker();
    }
    is(...args) {
        return (new QueryBuilder(this)).is(...args);
    }
    isclosed(...args) {
        return (new QueryBuilder(this)).isclosed(...args);
    }
    isempty(...args) {
        return (new QueryBuilder(this)).isempty(...args);
    }
    isfinite(...args) {
        return (new QueryBuilder(this)).isfinite(...args);
    }
    isNot(...args) {
        return (new QueryBuilder(this)).isNot(...args);
    }
    isnull() {
        return (new QueryBuilder(this)).isnull();
    }
    isolation() {
        return (new QueryBuilder(this)).isolation();
    }
    isopen(...args) {
        return (new QueryBuilder(this)).isopen(...args);
    }
    isParallel(...args) {
        return (new QueryBuilder(this)).isParallel(...args);
    }
    join(...args) {
        return (new QueryBuilder(this)).join(...args);
    }
    json() {
        return (new QueryBuilder(this)).json();
    }
    jsonAgg(...args) {
        return (new QueryBuilder(this)).jsonAgg(...args);
    }
    jsonAggStrict(...args) {
        return (new QueryBuilder(this)).jsonAggStrict(...args);
    }
    jsonArray(...args) {
        return (new QueryBuilder(this)).jsonArray(...args);
    }
    jsonArrayagg(...args) {
        return (new QueryBuilder(this)).jsonArrayagg(...args);
    }
    jsonArrayElements(...args) {
        return (new QueryBuilder(this)).jsonArrayElements(...args);
    }
    jsonArrayElementsText(...args) {
        return (new QueryBuilder(this)).jsonArrayElementsText(...args);
    }
    jsonArrayLength(...args) {
        return (new QueryBuilder(this)).jsonArrayLength(...args);
    }
    jsonbAgg(...args) {
        return (new QueryBuilder(this)).jsonbAgg(...args);
    }
    jsonbAggStrict(...args) {
        return (new QueryBuilder(this)).jsonbAggStrict(...args);
    }
    jsonbArrayElements(...args) {
        return (new QueryBuilder(this)).jsonbArrayElements(...args);
    }
    jsonbArrayElementsText(...args) {
        return (new QueryBuilder(this)).jsonbArrayElementsText(...args);
    }
    jsonbArrayLength(...args) {
        return (new QueryBuilder(this)).jsonbArrayLength(...args);
    }
    jsonbBuildArray(...args) {
        return (new QueryBuilder(this)).jsonbBuildArray(...args);
    }
    jsonbBuildObject(...args) {
        return (new QueryBuilder(this)).jsonbBuildObject(...args);
    }
    jsonbEach(...args) {
        return (new QueryBuilder(this)).jsonbEach(...args);
    }
    jsonbEachText(...args) {
        return (new QueryBuilder(this)).jsonbEachText(...args);
    }
    jsonbExtractPath(...args) {
        return (new QueryBuilder(this)).jsonbExtractPath(...args);
    }
    jsonbExtractPathText(...args) {
        return (new QueryBuilder(this)).jsonbExtractPathText(...args);
    }
    jsonbInsert(...args) {
        return (new QueryBuilder(this)).jsonbInsert(...args);
    }
    jsonbObject(...args) {
        return (new QueryBuilder(this)).jsonbObject(...args);
    }
    jsonbObjectAgg(...args) {
        return (new QueryBuilder(this)).jsonbObjectAgg(...args);
    }
    jsonbObjectAggStrict(...args) {
        return (new QueryBuilder(this)).jsonbObjectAggStrict(...args);
    }
    jsonbObjectAggUnique(...args) {
        return (new QueryBuilder(this)).jsonbObjectAggUnique(...args);
    }
    jsonbObjectAggUniqueStrict(...args) {
        return (new QueryBuilder(this)).jsonbObjectAggUniqueStrict(...args);
    }
    jsonbObjectKeys(...args) {
        return (new QueryBuilder(this)).jsonbObjectKeys(...args);
    }
    jsonbPathExists(...args) {
        return (new QueryBuilder(this)).jsonbPathExists(...args);
    }
    jsonbPathExistsTz(...args) {
        return (new QueryBuilder(this)).jsonbPathExistsTz(...args);
    }
    jsonbPathMatch(...args) {
        return (new QueryBuilder(this)).jsonbPathMatch(...args);
    }
    jsonbPathMatchTz(...args) {
        return (new QueryBuilder(this)).jsonbPathMatchTz(...args);
    }
    jsonbPathQuery(...args) {
        return (new QueryBuilder(this)).jsonbPathQuery(...args);
    }
    jsonbPathQueryArray(...args) {
        return (new QueryBuilder(this)).jsonbPathQueryArray(...args);
    }
    jsonbPathQueryArrayTz(...args) {
        return (new QueryBuilder(this)).jsonbPathQueryArrayTz(...args);
    }
    jsonbPathQueryFirst(...args) {
        return (new QueryBuilder(this)).jsonbPathQueryFirst(...args);
    }
    jsonbPathQueryFirstTz(...args) {
        return (new QueryBuilder(this)).jsonbPathQueryFirstTz(...args);
    }
    jsonbPathQueryTz(...args) {
        return (new QueryBuilder(this)).jsonbPathQueryTz(...args);
    }
    jsonbPopulateRecord(...args) {
        return (new QueryBuilder(this)).jsonbPopulateRecord(...args);
    }
    jsonbPopulateRecordset(...args) {
        return (new QueryBuilder(this)).jsonbPopulateRecordset(...args);
    }
    jsonbPopulateRecordValid(...args) {
        return (new QueryBuilder(this)).jsonbPopulateRecordValid(...args);
    }
    jsonbPretty(...args) {
        return (new QueryBuilder(this)).jsonbPretty(...args);
    }
    jsonbSet(...args) {
        return (new QueryBuilder(this)).jsonbSet(...args);
    }
    jsonbSetLax(...args) {
        return (new QueryBuilder(this)).jsonbSetLax(...args);
    }
    jsonbStripNulls(...args) {
        return (new QueryBuilder(this)).jsonbStripNulls(...args);
    }
    jsonbToRecord(...args) {
        return (new QueryBuilder(this)).jsonbToRecord(...args);
    }
    jsonbToRecordset(...args) {
        return (new QueryBuilder(this)).jsonbToRecordset(...args);
    }
    jsonbToTsvector(...args) {
        return (new QueryBuilder(this)).jsonbToTsvector(...args);
    }
    jsonbTypeof(...args) {
        return (new QueryBuilder(this)).jsonbTypeof(...args);
    }
    jsonBuildArray(...args) {
        return (new QueryBuilder(this)).jsonBuildArray(...args);
    }
    jsonBuildObject(...args) {
        return (new QueryBuilder(this)).jsonBuildObject(...args);
    }
    jsonEach(...args) {
        return (new QueryBuilder(this)).jsonEach(...args);
    }
    jsonEachText(...args) {
        return (new QueryBuilder(this)).jsonEachText(...args);
    }
    jsonExists(...args) {
        return (new QueryBuilder(this)).jsonExists(...args);
    }
    jsonExtractPath(...args) {
        return (new QueryBuilder(this)).jsonExtractPath(...args);
    }
    jsonExtractPathText(...args) {
        return (new QueryBuilder(this)).jsonExtractPathText(...args);
    }
    jsonObject(...args) {
        return (new QueryBuilder(this)).jsonObject(...args);
    }
    jsonObjectagg(...args) {
        return (new QueryBuilder(this)).jsonObjectagg(...args);
    }
    jsonObjectAgg(...args) {
        return (new QueryBuilder(this)).jsonObjectAgg(...args);
    }
    jsonObjectAggStrict(...args) {
        return (new QueryBuilder(this)).jsonObjectAggStrict(...args);
    }
    jsonObjectAggUnique(...args) {
        return (new QueryBuilder(this)).jsonObjectAggUnique(...args);
    }
    jsonObjectAggUniqueStrict(...args) {
        return (new QueryBuilder(this)).jsonObjectAggUniqueStrict(...args);
    }
    jsonObjectKeys(...args) {
        return (new QueryBuilder(this)).jsonObjectKeys(...args);
    }
    jsonPopulateRecord(...args) {
        return (new QueryBuilder(this)).jsonPopulateRecord(...args);
    }
    jsonPopulateRecordset(...args) {
        return (new QueryBuilder(this)).jsonPopulateRecordset(...args);
    }
    jsonQuery(...args) {
        return (new QueryBuilder(this)).jsonQuery(...args);
    }
    jsonScalar(...args) {
        return (new QueryBuilder(this)).jsonScalar(...args);
    }
    jsonSerialize(...args) {
        return (new QueryBuilder(this)).jsonSerialize(...args);
    }
    jsonStripNulls(...args) {
        return (new QueryBuilder(this)).jsonStripNulls(...args);
    }
    jsonTable() {
        return (new QueryBuilder(this)).jsonTable();
    }
    jsonTablePrimitive() {
        return (new QueryBuilder(this)).jsonTablePrimitive();
    }
    jsonToRecord(...args) {
        return (new QueryBuilder(this)).jsonToRecord(...args);
    }
    jsonToRecordset(...args) {
        return (new QueryBuilder(this)).jsonToRecordset(...args);
    }
    jsonToTsvector(...args) {
        return (new QueryBuilder(this)).jsonToTsvector(...args);
    }
    jsonTypeof(...args) {
        return (new QueryBuilder(this)).jsonTypeof(...args);
    }
    jsonValue(...args) {
        return (new QueryBuilder(this)).jsonValue(...args);
    }
    justifyDays(...args) {
        return (new QueryBuilder(this)).justifyDays(...args);
    }
    justifyHours(...args) {
        return (new QueryBuilder(this)).justifyHours(...args);
    }
    justifyInterval(...args) {
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
    l(...args) {
        return (new QueryBuilder(this)).l(...args);
    }
    label() {
        return (new QueryBuilder(this)).label();
    }
    lag(...args) {
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
    lastval(...args) {
        return (new QueryBuilder(this)).lastval(...args);
    }
    lastValue(...args) {
        return (new QueryBuilder(this)).lastValue(...args);
    }
    lateral() {
        return (new QueryBuilder(this)).lateral();
    }
    lcm(...args) {
        return (new QueryBuilder(this)).lcm(...args);
    }
    lead(...args) {
        return (new QueryBuilder(this)).lead(...args);
    }
    leading() {
        return (new QueryBuilder(this)).leading();
    }
    leakproof() {
        return (new QueryBuilder(this)).leakproof();
    }
    least(...args) {
        return (new QueryBuilder(this)).least(...args);
    }
    left(...args) {
        return (new QueryBuilder(this)).left(...args);
    }
    leftJoin(...args) {
        return (new QueryBuilder(this)).leftJoin(...args);
    }
    leftJoinLateral(...args) {
        return (new QueryBuilder(this)).leftJoinLateral(...args);
    }
    length(...args) {
        return (new QueryBuilder(this)).length(...args);
    }
    level() {
        return (new QueryBuilder(this)).level();
    }
    lgamma(...args) {
        return (new QueryBuilder(this)).lgamma(...args);
    }
    library() {
        return (new QueryBuilder(this)).library();
    }
    like(...args) {
        return (new QueryBuilder(this)).like(...args);
    }
    likeRegex() {
        return (new QueryBuilder(this)).likeRegex();
    }
    limit(...args) {
        return (new QueryBuilder(this)).limit(...args);
    }
    line(...args) {
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
    literal(...args) {
        return (new QueryBuilder(this)).literal(...args);
    }
    literalArray(...args) {
        return (new QueryBuilder(this)).literalArray(...args);
    }
    ln(...args) {
        return (new QueryBuilder(this)).ln(...args);
    }
    load() {
        return (new QueryBuilder(this)).load();
    }
    local() {
        return (new QueryBuilder(this)).local();
    }
    localtime(...args) {
        return (new QueryBuilder(this)).localtime(...args);
    }
    localtimestamp(...args) {
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
    log(...args) {
        return (new QueryBuilder(this)).log(...args);
    }
    log10(...args) {
        return (new QueryBuilder(this)).log10(...args);
    }
    logged() {
        return (new QueryBuilder(this)).logged();
    }
    lower(...args) {
        return (new QueryBuilder(this)).lower(...args);
    }
    lowerInc(...args) {
        return (new QueryBuilder(this)).lowerInc(...args);
    }
    lowerInf(...args) {
        return (new QueryBuilder(this)).lowerInf(...args);
    }
    lpad(...args) {
        return (new QueryBuilder(this)).lpad(...args);
    }
    lseg(...args) {
        return (new QueryBuilder(this)).lseg(...args);
    }
    lt(...args) {
        return (new QueryBuilder(this)).lt(...args);
    }
    lte(...args) {
        return (new QueryBuilder(this)).lte(...args);
    }
    ltrim(...args) {
        return (new QueryBuilder(this)).ltrim(...args);
    }
    m() {
        return (new QueryBuilder(this)).m();
    }
    macaddr8Set7bit(...args) {
        return (new QueryBuilder(this)).macaddr8Set7bit(...args);
    }
    makeaclitem(...args) {
        return (new QueryBuilder(this)).makeaclitem(...args);
    }
    makeDate(...args) {
        return (new QueryBuilder(this)).makeDate(...args);
    }
    makeInterval(...args) {
        return (new QueryBuilder(this)).makeInterval(...args);
    }
    makeTime(...args) {
        return (new QueryBuilder(this)).makeTime(...args);
    }
    makeTimestamp(...args) {
        return (new QueryBuilder(this)).makeTimestamp(...args);
    }
    makeTimestamptz(...args) {
        return (new QueryBuilder(this)).makeTimestamptz(...args);
    }
    map() {
        return (new QueryBuilder(this)).map();
    }
    mapping() {
        return (new QueryBuilder(this)).mapping();
    }
    masklen(...args) {
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
    matchRegex(...args) {
        return (new QueryBuilder(this)).matchRegex(...args);
    }
    matchRegexInsensitive(...args) {
        return (new QueryBuilder(this)).matchRegexInsensitive(...args);
    }
    materialized() {
        return (new QueryBuilder(this)).materialized();
    }
    max(...args) {
        return (new QueryBuilder(this)).max(...args);
    }
    maxvalue() {
        return (new QueryBuilder(this)).maxvalue();
    }
    md5(...args) {
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
    mergeAction(...args) {
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
    middle(...args) {
        return (new QueryBuilder(this)).middle(...args);
    }
    min(...args) {
        return (new QueryBuilder(this)).min(...args);
    }
    minScale(...args) {
        return (new QueryBuilder(this)).minScale(...args);
    }
    minus(...args) {
        return (new QueryBuilder(this)).minus(...args);
    }
    minute() {
        return (new QueryBuilder(this)).minute();
    }
    minvalue() {
        return (new QueryBuilder(this)).minvalue();
    }
    mod(...args) {
        return (new QueryBuilder(this)).mod(...args);
    }
    mode(...args) {
        return (new QueryBuilder(this)).mode(...args);
    }
    modifies() {
        return (new QueryBuilder(this)).modifies();
    }
    module() {
        return (new QueryBuilder(this)).module();
    }
    modulo(...args) {
        return (new QueryBuilder(this)).modulo(...args);
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
    multiply(...args) {
        return (new QueryBuilder(this)).multiply(...args);
    }
    multirange(...args) {
        return (new QueryBuilder(this)).multirange(...args);
    }
    multiset() {
        return (new QueryBuilder(this)).multiset();
    }
    mumps() {
        return (new QueryBuilder(this)).mumps();
    }
    mxidAge(...args) {
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
    naturalCrossJoin(...args) {
        return (new QueryBuilder(this)).naturalCrossJoin(...args);
    }
    naturalFullJoin(...args) {
        return (new QueryBuilder(this)).naturalFullJoin(...args);
    }
    naturalInnerJoin(...args) {
        return (new QueryBuilder(this)).naturalInnerJoin(...args);
    }
    naturalJoin(...args) {
        return (new QueryBuilder(this)).naturalJoin(...args);
    }
    naturalLeftJoin(...args) {
        return (new QueryBuilder(this)).naturalLeftJoin(...args);
    }
    naturalRightJoin(...args) {
        return (new QueryBuilder(this)).naturalRightJoin(...args);
    }
    nchar() {
        return (new QueryBuilder(this)).nchar();
    }
    nclob() {
        return (new QueryBuilder(this)).nclob();
    }
    ne(...args) {
        return (new QueryBuilder(this)).ne(...args);
    }
    nested() {
        return (new QueryBuilder(this)).nested();
    }
    nesting() {
        return (new QueryBuilder(this)).nesting();
    }
    netmask(...args) {
        return (new QueryBuilder(this)).netmask(...args);
    }
    network(...args) {
        return (new QueryBuilder(this)).network(...args);
    }
    new() {
        return (new QueryBuilder(this)).new();
    }
    next() {
        return (new QueryBuilder(this)).next();
    }
    nextval(...args) {
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
    normalize(...args) {
        return (new QueryBuilder(this)).normalize(...args);
    }
    normalized() {
        return (new QueryBuilder(this)).normalized();
    }
    not(...args) {
        return (new QueryBuilder(this)).not(...args);
    }
    notBetween(...args) {
        return (new QueryBuilder(this)).notBetween(...args);
    }
    notBetweenSymmetric(...args) {
        return (new QueryBuilder(this)).notBetweenSymmetric(...args);
    }
    notEq(...args) {
        return (new QueryBuilder(this)).notEq(...args);
    }
    notExists(...args) {
        return (new QueryBuilder(this)).notExists(...args);
    }
    notExtendAbove(...args) {
        return (new QueryBuilder(this)).notExtendAbove(...args);
    }
    notExtendBelow(...args) {
        return (new QueryBuilder(this)).notExtendBelow(...args);
    }
    notExtendLeft(...args) {
        return (new QueryBuilder(this)).notExtendLeft(...args);
    }
    notExtendRight(...args) {
        return (new QueryBuilder(this)).notExtendRight(...args);
    }
    nothing() {
        return (new QueryBuilder(this)).nothing();
    }
    notify() {
        return (new QueryBuilder(this)).notify();
    }
    notIlike(...args) {
        return (new QueryBuilder(this)).notIlike(...args);
    }
    notIn(...args) {
        return (new QueryBuilder(this)).notIn(...args);
    }
    notLike(...args) {
        return (new QueryBuilder(this)).notLike(...args);
    }
    notMatchRegex(...args) {
        return (new QueryBuilder(this)).notMatchRegex(...args);
    }
    notMatchRegexInsensitive(...args) {
        return (new QueryBuilder(this)).notMatchRegexInsensitive(...args);
    }
    notnull() {
        return (new QueryBuilder(this)).notnull();
    }
    notSimilarTo(...args) {
        return (new QueryBuilder(this)).notSimilarTo(...args);
    }
    now(...args) {
        return (new QueryBuilder(this)).now(...args);
    }
    nowait() {
        return (new QueryBuilder(this)).nowait();
    }
    npoints(...args) {
        return (new QueryBuilder(this)).npoints(...args);
    }
    nthValue(...args) {
        return (new QueryBuilder(this)).nthValue(...args);
    }
    ntile(...args) {
        return (new QueryBuilder(this)).ntile(...args);
    }
    null() {
        return (new QueryBuilder(this)).null();
    }
    nullable() {
        return (new QueryBuilder(this)).nullable();
    }
    nullif(...args) {
        return (new QueryBuilder(this)).nullif(...args);
    }
    nullOrdering() {
        return (new QueryBuilder(this)).nullOrdering();
    }
    nulls() {
        return (new QueryBuilder(this)).nulls();
    }
    nullsFirst(...args) {
        return (new QueryBuilder(this)).nullsFirst(...args);
    }
    nullsLast(...args) {
        return (new QueryBuilder(this)).nullsLast(...args);
    }
    number() {
        return (new QueryBuilder(this)).number();
    }
    numeric() {
        return (new QueryBuilder(this)).numeric();
    }
    numnode(...args) {
        return (new QueryBuilder(this)).numnode(...args);
    }
    objDescription(...args) {
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
    octetLength(...args) {
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
    offset(...args) {
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
    on(...args) {
        return (new QueryBuilder(this)).on(...args);
    }
    onConflict(...args) {
        return (new QueryBuilder(this)).onConflict(...args);
    }
    onConflictDoNothing(...args) {
        return (new QueryBuilder(this)).onConflictDoNothing(...args);
    }
    onConflictDoUpdate(...args) {
        return (new QueryBuilder(this)).onConflictDoUpdate(...args);
    }
    onConstraint(...args) {
        return (new QueryBuilder(this)).onConstraint(...args);
    }
    one() {
        return (new QueryBuilder(this)).one();
    }
    only() {
        return (new QueryBuilder(this)).only();
    }
    op(...args) {
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
    or(...args) {
        return (new QueryBuilder(this)).or(...args);
    }
    order() {
        return (new QueryBuilder(this)).order();
    }
    orderBy(...args) {
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
    over(...args) {
        return (new QueryBuilder(this)).over(...args);
    }
    overflow() {
        return (new QueryBuilder(this)).overflow();
    }
    overlaps() {
        return (new QueryBuilder(this)).overlaps();
    }
    overlay(...args) {
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
    parseIdent(...args) {
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
    partitionBy(...args) {
        return (new QueryBuilder(this)).partitionBy(...args);
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
    path(...args) {
        return (new QueryBuilder(this)).path(...args);
    }
    pattern() {
        return (new QueryBuilder(this)).pattern();
    }
    pclose(...args) {
        return (new QueryBuilder(this)).pclose(...args);
    }
    per() {
        return (new QueryBuilder(this)).per();
    }
    percent() {
        return (new QueryBuilder(this)).percent();
    }
    percentCharacter(...args) {
        return (new QueryBuilder(this)).percentCharacter(...args);
    }
    percentileCont(...args) {
        return (new QueryBuilder(this)).percentileCont(...args);
    }
    percentileDisc(...args) {
        return (new QueryBuilder(this)).percentileDisc(...args);
    }
    percentRank(...args) {
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
    perpendicular(...args) {
        return (new QueryBuilder(this)).perpendicular(...args);
    }
    pgAdvisoryLock(...args) {
        return (new QueryBuilder(this)).pgAdvisoryLock(...args);
    }
    pgAdvisoryLockShared(...args) {
        return (new QueryBuilder(this)).pgAdvisoryLockShared(...args);
    }
    pgAdvisoryUnlock(...args) {
        return (new QueryBuilder(this)).pgAdvisoryUnlock(...args);
    }
    pgAdvisoryUnlockAll(...args) {
        return (new QueryBuilder(this)).pgAdvisoryUnlockAll(...args);
    }
    pgAdvisoryUnlockShared(...args) {
        return (new QueryBuilder(this)).pgAdvisoryUnlockShared(...args);
    }
    pgAdvisoryXactLock(...args) {
        return (new QueryBuilder(this)).pgAdvisoryXactLock(...args);
    }
    pgAdvisoryXactLockShared(...args) {
        return (new QueryBuilder(this)).pgAdvisoryXactLockShared(...args);
    }
    pgAvailableWalSummaries(...args) {
        return (new QueryBuilder(this)).pgAvailableWalSummaries(...args);
    }
    pgBackendPid(...args) {
        return (new QueryBuilder(this)).pgBackendPid(...args);
    }
    pgBackupStart(...args) {
        return (new QueryBuilder(this)).pgBackupStart(...args);
    }
    pgBackupStop(...args) {
        return (new QueryBuilder(this)).pgBackupStop(...args);
    }
    pgBasetype(...args) {
        return (new QueryBuilder(this)).pgBasetype(...args);
    }
    pgBlockingPids(...args) {
        return (new QueryBuilder(this)).pgBlockingPids(...args);
    }
    pgCancelBackend(...args) {
        return (new QueryBuilder(this)).pgCancelBackend(...args);
    }
    pgCharToEncoding(...args) {
        return (new QueryBuilder(this)).pgCharToEncoding(...args);
    }
    pgClearAttributeStats(...args) {
        return (new QueryBuilder(this)).pgClearAttributeStats(...args);
    }
    pgClearRelationStats(...args) {
        return (new QueryBuilder(this)).pgClearRelationStats(...args);
    }
    pgClientEncoding(...args) {
        return (new QueryBuilder(this)).pgClientEncoding(...args);
    }
    pgCollationActualVersion(...args) {
        return (new QueryBuilder(this)).pgCollationActualVersion(...args);
    }
    pgCollationIsVisible(...args) {
        return (new QueryBuilder(this)).pgCollationIsVisible(...args);
    }
    pgColumnCompression(...args) {
        return (new QueryBuilder(this)).pgColumnCompression(...args);
    }
    pgColumnSize(...args) {
        return (new QueryBuilder(this)).pgColumnSize(...args);
    }
    pgColumnToastChunkId(...args) {
        return (new QueryBuilder(this)).pgColumnToastChunkId(...args);
    }
    pgConfLoadTime(...args) {
        return (new QueryBuilder(this)).pgConfLoadTime(...args);
    }
    pgControlCheckpoint(...args) {
        return (new QueryBuilder(this)).pgControlCheckpoint(...args);
    }
    pgControlInit(...args) {
        return (new QueryBuilder(this)).pgControlInit(...args);
    }
    pgControlRecovery(...args) {
        return (new QueryBuilder(this)).pgControlRecovery(...args);
    }
    pgControlSystem(...args) {
        return (new QueryBuilder(this)).pgControlSystem(...args);
    }
    pgConversionIsVisible(...args) {
        return (new QueryBuilder(this)).pgConversionIsVisible(...args);
    }
    pgCopyLogicalReplicationSlot(...args) {
        return (new QueryBuilder(this)).pgCopyLogicalReplicationSlot(...args);
    }
    pgCopyPhysicalReplicationSlot(...args) {
        return (new QueryBuilder(this)).pgCopyPhysicalReplicationSlot(...args);
    }
    pgCreateLogicalReplicationSlot(...args) {
        return (new QueryBuilder(this)).pgCreateLogicalReplicationSlot(...args);
    }
    pgCreatePhysicalReplicationSlot(...args) {
        return (new QueryBuilder(this)).pgCreatePhysicalReplicationSlot(...args);
    }
    pgCreateRestorePoint(...args) {
        return (new QueryBuilder(this)).pgCreateRestorePoint(...args);
    }
    pgCurrentLogfile(...args) {
        return (new QueryBuilder(this)).pgCurrentLogfile(...args);
    }
    pgCurrentSnapshot(...args) {
        return (new QueryBuilder(this)).pgCurrentSnapshot(...args);
    }
    pgCurrentWalFlushLsn(...args) {
        return (new QueryBuilder(this)).pgCurrentWalFlushLsn(...args);
    }
    pgCurrentWalInsertLsn(...args) {
        return (new QueryBuilder(this)).pgCurrentWalInsertLsn(...args);
    }
    pgCurrentWalLsn(...args) {
        return (new QueryBuilder(this)).pgCurrentWalLsn(...args);
    }
    pgCurrentXactId(...args) {
        return (new QueryBuilder(this)).pgCurrentXactId(...args);
    }
    pgCurrentXactIdIfAssigned(...args) {
        return (new QueryBuilder(this)).pgCurrentXactIdIfAssigned(...args);
    }
    pgDatabaseCollationActualVersion(...args) {
        return (new QueryBuilder(this)).pgDatabaseCollationActualVersion(...args);
    }
    pgDatabaseSize(...args) {
        return (new QueryBuilder(this)).pgDatabaseSize(...args);
    }
    pgDescribeObject(...args) {
        return (new QueryBuilder(this)).pgDescribeObject(...args);
    }
    pgDropReplicationSlot(...args) {
        return (new QueryBuilder(this)).pgDropReplicationSlot(...args);
    }
    pgEncodingToChar(...args) {
        return (new QueryBuilder(this)).pgEncodingToChar(...args);
    }
    pgEventTriggerDdlCommands(...args) {
        return (new QueryBuilder(this)).pgEventTriggerDdlCommands(...args);
    }
    pgEventTriggerDroppedObjects(...args) {
        return (new QueryBuilder(this)).pgEventTriggerDroppedObjects(...args);
    }
    pgEventTriggerTableRewriteOid(...args) {
        return (new QueryBuilder(this)).pgEventTriggerTableRewriteOid(...args);
    }
    pgEventTriggerTableRewriteReason(...args) {
        return (new QueryBuilder(this)).pgEventTriggerTableRewriteReason(...args);
    }
    pgExportSnapshot(...args) {
        return (new QueryBuilder(this)).pgExportSnapshot(...args);
    }
    pgFilenodeRelation(...args) {
        return (new QueryBuilder(this)).pgFilenodeRelation(...args);
    }
    pgFunctionIsVisible(...args) {
        return (new QueryBuilder(this)).pgFunctionIsVisible(...args);
    }
    pgGetAcl(...args) {
        return (new QueryBuilder(this)).pgGetAcl(...args);
    }
    pgGetCatalogForeignKeys(...args) {
        return (new QueryBuilder(this)).pgGetCatalogForeignKeys(...args);
    }
    pgGetConstraintdef(...args) {
        return (new QueryBuilder(this)).pgGetConstraintdef(...args);
    }
    pgGetExpr(...args) {
        return (new QueryBuilder(this)).pgGetExpr(...args);
    }
    pgGetFunctionArguments(...args) {
        return (new QueryBuilder(this)).pgGetFunctionArguments(...args);
    }
    pgGetFunctiondef(...args) {
        return (new QueryBuilder(this)).pgGetFunctiondef(...args);
    }
    pgGetFunctionIdentityArguments(...args) {
        return (new QueryBuilder(this)).pgGetFunctionIdentityArguments(...args);
    }
    pgGetFunctionResult(...args) {
        return (new QueryBuilder(this)).pgGetFunctionResult(...args);
    }
    pgGetIndexdef(...args) {
        return (new QueryBuilder(this)).pgGetIndexdef(...args);
    }
    pgGetKeywords(...args) {
        return (new QueryBuilder(this)).pgGetKeywords(...args);
    }
    pgGetLoadedModules(...args) {
        return (new QueryBuilder(this)).pgGetLoadedModules(...args);
    }
    pgGetMultixactMembers(...args) {
        return (new QueryBuilder(this)).pgGetMultixactMembers(...args);
    }
    pgGetObjectAddress(...args) {
        return (new QueryBuilder(this)).pgGetObjectAddress(...args);
    }
    pgGetPartitionConstraintdef(...args) {
        return (new QueryBuilder(this)).pgGetPartitionConstraintdef(...args);
    }
    pgGetPartkeydef(...args) {
        return (new QueryBuilder(this)).pgGetPartkeydef(...args);
    }
    pgGetRuledef(...args) {
        return (new QueryBuilder(this)).pgGetRuledef(...args);
    }
    pgGetSerialSequence(...args) {
        return (new QueryBuilder(this)).pgGetSerialSequence(...args);
    }
    pgGetStatisticsobjdef(...args) {
        return (new QueryBuilder(this)).pgGetStatisticsobjdef(...args);
    }
    pgGetTriggerdef(...args) {
        return (new QueryBuilder(this)).pgGetTriggerdef(...args);
    }
    pgGetUserbyid(...args) {
        return (new QueryBuilder(this)).pgGetUserbyid(...args);
    }
    pgGetViewdef(...args) {
        return (new QueryBuilder(this)).pgGetViewdef(...args);
    }
    pgGetWalReplayPauseState(...args) {
        return (new QueryBuilder(this)).pgGetWalReplayPauseState(...args);
    }
    pgGetWalResourceManagers(...args) {
        return (new QueryBuilder(this)).pgGetWalResourceManagers(...args);
    }
    pgGetWalSummarizerState(...args) {
        return (new QueryBuilder(this)).pgGetWalSummarizerState(...args);
    }
    pgHasRole(...args) {
        return (new QueryBuilder(this)).pgHasRole(...args);
    }
    pgIdentifyObject(...args) {
        return (new QueryBuilder(this)).pgIdentifyObject(...args);
    }
    pgIdentifyObjectAsAddress(...args) {
        return (new QueryBuilder(this)).pgIdentifyObjectAsAddress(...args);
    }
    pgImportSystemCollations(...args) {
        return (new QueryBuilder(this)).pgImportSystemCollations(...args);
    }
    pgIndexamHasProperty(...args) {
        return (new QueryBuilder(this)).pgIndexamHasProperty(...args);
    }
    pgIndexColumnHasProperty(...args) {
        return (new QueryBuilder(this)).pgIndexColumnHasProperty(...args);
    }
    pgIndexesSize(...args) {
        return (new QueryBuilder(this)).pgIndexesSize(...args);
    }
    pgIndexHasProperty(...args) {
        return (new QueryBuilder(this)).pgIndexHasProperty(...args);
    }
    pgInputErrorInfo(...args) {
        return (new QueryBuilder(this)).pgInputErrorInfo(...args);
    }
    pgInputIsValid(...args) {
        return (new QueryBuilder(this)).pgInputIsValid(...args);
    }
    pgIsInRecovery(...args) {
        return (new QueryBuilder(this)).pgIsInRecovery(...args);
    }
    pgIsOtherTempSchema(...args) {
        return (new QueryBuilder(this)).pgIsOtherTempSchema(...args);
    }
    pgIsWalReplayPaused(...args) {
        return (new QueryBuilder(this)).pgIsWalReplayPaused(...args);
    }
    pgJitAvailable(...args) {
        return (new QueryBuilder(this)).pgJitAvailable(...args);
    }
    pgLastCommittedXact(...args) {
        return (new QueryBuilder(this)).pgLastCommittedXact(...args);
    }
    pgLastWalReceiveLsn(...args) {
        return (new QueryBuilder(this)).pgLastWalReceiveLsn(...args);
    }
    pgLastWalReplayLsn(...args) {
        return (new QueryBuilder(this)).pgLastWalReplayLsn(...args);
    }
    pgLastXactReplayTimestamp(...args) {
        return (new QueryBuilder(this)).pgLastXactReplayTimestamp(...args);
    }
    pgListeningChannels(...args) {
        return (new QueryBuilder(this)).pgListeningChannels(...args);
    }
    pgLogBackendMemoryContexts(...args) {
        return (new QueryBuilder(this)).pgLogBackendMemoryContexts(...args);
    }
    pgLogicalEmitMessage(...args) {
        return (new QueryBuilder(this)).pgLogicalEmitMessage(...args);
    }
    pgLogicalSlotGetBinaryChanges(...args) {
        return (new QueryBuilder(this)).pgLogicalSlotGetBinaryChanges(...args);
    }
    pgLogicalSlotGetChanges(...args) {
        return (new QueryBuilder(this)).pgLogicalSlotGetChanges(...args);
    }
    pgLogicalSlotPeekBinaryChanges(...args) {
        return (new QueryBuilder(this)).pgLogicalSlotPeekBinaryChanges(...args);
    }
    pgLogicalSlotPeekChanges(...args) {
        return (new QueryBuilder(this)).pgLogicalSlotPeekChanges(...args);
    }
    pgLogStandbySnapshot(...args) {
        return (new QueryBuilder(this)).pgLogStandbySnapshot(...args);
    }
    pgLsArchiveStatusdir(...args) {
        return (new QueryBuilder(this)).pgLsArchiveStatusdir(...args);
    }
    pgLsDir(...args) {
        return (new QueryBuilder(this)).pgLsDir(...args);
    }
    pgLsLogdir(...args) {
        return (new QueryBuilder(this)).pgLsLogdir(...args);
    }
    pgLsLogicalmapdir(...args) {
        return (new QueryBuilder(this)).pgLsLogicalmapdir(...args);
    }
    pgLsLogicalsnapdir(...args) {
        return (new QueryBuilder(this)).pgLsLogicalsnapdir(...args);
    }
    pgLsReplslotdir(...args) {
        return (new QueryBuilder(this)).pgLsReplslotdir(...args);
    }
    pgLsSummariesdir(...args) {
        return (new QueryBuilder(this)).pgLsSummariesdir(...args);
    }
    pgLsTmpdir(...args) {
        return (new QueryBuilder(this)).pgLsTmpdir(...args);
    }
    pgLsWaldir(...args) {
        return (new QueryBuilder(this)).pgLsWaldir(...args);
    }
    pgMcvListItems(...args) {
        return (new QueryBuilder(this)).pgMcvListItems(...args);
    }
    pgMyTempSchema(...args) {
        return (new QueryBuilder(this)).pgMyTempSchema(...args);
    }
    pgNotificationQueueUsage(...args) {
        return (new QueryBuilder(this)).pgNotificationQueueUsage(...args);
    }
    pgNumaAvailable(...args) {
        return (new QueryBuilder(this)).pgNumaAvailable(...args);
    }
    pgOpclassIsVisible(...args) {
        return (new QueryBuilder(this)).pgOpclassIsVisible(...args);
    }
    pgOperatorIsVisible(...args) {
        return (new QueryBuilder(this)).pgOperatorIsVisible(...args);
    }
    pgOpfamilyIsVisible(...args) {
        return (new QueryBuilder(this)).pgOpfamilyIsVisible(...args);
    }
    pgOptionsToTable(...args) {
        return (new QueryBuilder(this)).pgOptionsToTable(...args);
    }
    pgPartitionAncestors(...args) {
        return (new QueryBuilder(this)).pgPartitionAncestors(...args);
    }
    pgPartitionRoot(...args) {
        return (new QueryBuilder(this)).pgPartitionRoot(...args);
    }
    pgPartitionTree(...args) {
        return (new QueryBuilder(this)).pgPartitionTree(...args);
    }
    pgPostmasterStartTime(...args) {
        return (new QueryBuilder(this)).pgPostmasterStartTime(...args);
    }
    pgPromote(...args) {
        return (new QueryBuilder(this)).pgPromote(...args);
    }
    pgReadBinaryFile(...args) {
        return (new QueryBuilder(this)).pgReadBinaryFile(...args);
    }
    pgReadFile(...args) {
        return (new QueryBuilder(this)).pgReadFile(...args);
    }
    pgRelationFilenode(...args) {
        return (new QueryBuilder(this)).pgRelationFilenode(...args);
    }
    pgRelationFilepath(...args) {
        return (new QueryBuilder(this)).pgRelationFilepath(...args);
    }
    pgRelationSize(...args) {
        return (new QueryBuilder(this)).pgRelationSize(...args);
    }
    pgReloadConf(...args) {
        return (new QueryBuilder(this)).pgReloadConf(...args);
    }
    pgReplicationOriginAdvance(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginAdvance(...args);
    }
    pgReplicationOriginCreate(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginCreate(...args);
    }
    pgReplicationOriginDrop(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginDrop(...args);
    }
    pgReplicationOriginOid(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginOid(...args);
    }
    pgReplicationOriginProgress(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginProgress(...args);
    }
    pgReplicationOriginSessionIsSetup(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginSessionIsSetup(...args);
    }
    pgReplicationOriginSessionProgress(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginSessionProgress(...args);
    }
    pgReplicationOriginSessionReset(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginSessionReset(...args);
    }
    pgReplicationOriginSessionSetup(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginSessionSetup(...args);
    }
    pgReplicationOriginXactReset(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginXactReset(...args);
    }
    pgReplicationOriginXactSetup(...args) {
        return (new QueryBuilder(this)).pgReplicationOriginXactSetup(...args);
    }
    pgReplicationSlotAdvance(...args) {
        return (new QueryBuilder(this)).pgReplicationSlotAdvance(...args);
    }
    pgRestoreAttributeStats(...args) {
        return (new QueryBuilder(this)).pgRestoreAttributeStats(...args);
    }
    pgRestoreRelationStats(...args) {
        return (new QueryBuilder(this)).pgRestoreRelationStats(...args);
    }
    pgRotateLogfile(...args) {
        return (new QueryBuilder(this)).pgRotateLogfile(...args);
    }
    pgSafeSnapshotBlockingPids(...args) {
        return (new QueryBuilder(this)).pgSafeSnapshotBlockingPids(...args);
    }
    pgSettingsGetFlags(...args) {
        return (new QueryBuilder(this)).pgSettingsGetFlags(...args);
    }
    pgSizeBytes(...args) {
        return (new QueryBuilder(this)).pgSizeBytes(...args);
    }
    pgSizePretty(...args) {
        return (new QueryBuilder(this)).pgSizePretty(...args);
    }
    pgSleep(...args) {
        return (new QueryBuilder(this)).pgSleep(...args);
    }
    pgSleepFor(...args) {
        return (new QueryBuilder(this)).pgSleepFor(...args);
    }
    pgSleepUntil(...args) {
        return (new QueryBuilder(this)).pgSleepUntil(...args);
    }
    pgSnapshotXip(...args) {
        return (new QueryBuilder(this)).pgSnapshotXip(...args);
    }
    pgSnapshotXmax(...args) {
        return (new QueryBuilder(this)).pgSnapshotXmax(...args);
    }
    pgSnapshotXmin(...args) {
        return (new QueryBuilder(this)).pgSnapshotXmin(...args);
    }
    pgSplitWalfileName(...args) {
        return (new QueryBuilder(this)).pgSplitWalfileName(...args);
    }
    pgStatFile(...args) {
        return (new QueryBuilder(this)).pgStatFile(...args);
    }
    pgStatisticsObjIsVisible(...args) {
        return (new QueryBuilder(this)).pgStatisticsObjIsVisible(...args);
    }
    pgSwitchWal(...args) {
        return (new QueryBuilder(this)).pgSwitchWal(...args);
    }
    pgSyncReplicationSlots(...args) {
        return (new QueryBuilder(this)).pgSyncReplicationSlots(...args);
    }
    pgTableIsVisible(...args) {
        return (new QueryBuilder(this)).pgTableIsVisible(...args);
    }
    pgTableSize(...args) {
        return (new QueryBuilder(this)).pgTableSize(...args);
    }
    pgTablespaceDatabases(...args) {
        return (new QueryBuilder(this)).pgTablespaceDatabases(...args);
    }
    pgTablespaceLocation(...args) {
        return (new QueryBuilder(this)).pgTablespaceLocation(...args);
    }
    pgTablespaceSize(...args) {
        return (new QueryBuilder(this)).pgTablespaceSize(...args);
    }
    pgTerminateBackend(...args) {
        return (new QueryBuilder(this)).pgTerminateBackend(...args);
    }
    pgTotalRelationSize(...args) {
        return (new QueryBuilder(this)).pgTotalRelationSize(...args);
    }
    pgTriggerDepth(...args) {
        return (new QueryBuilder(this)).pgTriggerDepth(...args);
    }
    pgTryAdvisoryLock(...args) {
        return (new QueryBuilder(this)).pgTryAdvisoryLock(...args);
    }
    pgTryAdvisoryLockShared(...args) {
        return (new QueryBuilder(this)).pgTryAdvisoryLockShared(...args);
    }
    pgTryAdvisoryXactLock(...args) {
        return (new QueryBuilder(this)).pgTryAdvisoryXactLock(...args);
    }
    pgTryAdvisoryXactLockShared(...args) {
        return (new QueryBuilder(this)).pgTryAdvisoryXactLockShared(...args);
    }
    pgTsConfigIsVisible(...args) {
        return (new QueryBuilder(this)).pgTsConfigIsVisible(...args);
    }
    pgTsDictIsVisible(...args) {
        return (new QueryBuilder(this)).pgTsDictIsVisible(...args);
    }
    pgTsParserIsVisible(...args) {
        return (new QueryBuilder(this)).pgTsParserIsVisible(...args);
    }
    pgTsTemplateIsVisible(...args) {
        return (new QueryBuilder(this)).pgTsTemplateIsVisible(...args);
    }
    pgTypeIsVisible(...args) {
        return (new QueryBuilder(this)).pgTypeIsVisible(...args);
    }
    pgTypeof(...args) {
        return (new QueryBuilder(this)).pgTypeof(...args);
    }
    pgVisibleInSnapshot(...args) {
        return (new QueryBuilder(this)).pgVisibleInSnapshot(...args);
    }
    pgWalfileName(...args) {
        return (new QueryBuilder(this)).pgWalfileName(...args);
    }
    pgWalfileNameOffset(...args) {
        return (new QueryBuilder(this)).pgWalfileNameOffset(...args);
    }
    pgWalLsnDiff(...args) {
        return (new QueryBuilder(this)).pgWalLsnDiff(...args);
    }
    pgWalReplayPause(...args) {
        return (new QueryBuilder(this)).pgWalReplayPause(...args);
    }
    pgWalReplayResume(...args) {
        return (new QueryBuilder(this)).pgWalReplayResume(...args);
    }
    pgWalSummaryContents(...args) {
        return (new QueryBuilder(this)).pgWalSummaryContents(...args);
    }
    pgXactCommitTimestamp(...args) {
        return (new QueryBuilder(this)).pgXactCommitTimestamp(...args);
    }
    pgXactCommitTimestampOrigin(...args) {
        return (new QueryBuilder(this)).pgXactCommitTimestampOrigin(...args);
    }
    pgXactStatus(...args) {
        return (new QueryBuilder(this)).pgXactStatus(...args);
    }
    phrasetoTsquery(...args) {
        return (new QueryBuilder(this)).phrasetoTsquery(...args);
    }
    pi(...args) {
        return (new QueryBuilder(this)).pi(...args);
    }
    pipe() {
        return (new QueryBuilder(this)).pipe();
    }
    placing() {
        return (new QueryBuilder(this)).placing();
    }
    plaintoTsquery(...args) {
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
    plus(...args) {
        return (new QueryBuilder(this)).plus(...args);
    }
    point(...args) {
        return (new QueryBuilder(this)).point(...args);
    }
    policy() {
        return (new QueryBuilder(this)).policy();
    }
    polygon(...args) {
        return (new QueryBuilder(this)).polygon(...args);
    }
    popen(...args) {
        return (new QueryBuilder(this)).popen(...args);
    }
    portion() {
        return (new QueryBuilder(this)).portion();
    }
    position(...args) {
        return (new QueryBuilder(this)).position(...args);
    }
    positionRegex() {
        return (new QueryBuilder(this)).positionRegex();
    }
    power(...args) {
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
    prepareTransaction(...args) {
        return (new QueryBuilder(this)).prepareTransaction(...args);
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
    queryToXml(...args) {
        return (new QueryBuilder(this)).queryToXml(...args);
    }
    queryToXmlAndXmlschema(...args) {
        return (new QueryBuilder(this)).queryToXmlAndXmlschema(...args);
    }
    queryToXmlschema(...args) {
        return (new QueryBuilder(this)).queryToXmlschema(...args);
    }
    querytree(...args) {
        return (new QueryBuilder(this)).querytree(...args);
    }
    quote() {
        return (new QueryBuilder(this)).quote();
    }
    quoteIdent(...args) {
        return (new QueryBuilder(this)).quoteIdent(...args);
    }
    quoteLiteral(...args) {
        return (new QueryBuilder(this)).quoteLiteral(...args);
    }
    quoteNullable(...args) {
        return (new QueryBuilder(this)).quoteNullable(...args);
    }
    quotes() {
        return (new QueryBuilder(this)).quotes();
    }
    r(...args) {
        return (new QueryBuilder(this)).r(...args);
    }
    radians(...args) {
        return (new QueryBuilder(this)).radians(...args);
    }
    radius(...args) {
        return (new QueryBuilder(this)).radius(...args);
    }
    random(...args) {
        return (new QueryBuilder(this)).random(...args);
    }
    randomNormal(...args) {
        return (new QueryBuilder(this)).randomNormal(...args);
    }
    range() {
        return (new QueryBuilder(this)).range();
    }
    rangeAgg(...args) {
        return (new QueryBuilder(this)).rangeAgg(...args);
    }
    rangeIntersectAgg(...args) {
        return (new QueryBuilder(this)).rangeIntersectAgg(...args);
    }
    rangeMerge(...args) {
        return (new QueryBuilder(this)).rangeMerge(...args);
    }
    rank(...args) {
        return (new QueryBuilder(this)).rank(...args);
    }
    raw(...args) {
        return (new QueryBuilder(this)).raw(...args);
    }
    rawString(...args) {
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
    regexpCount(...args) {
        return (new QueryBuilder(this)).regexpCount(...args);
    }
    regexpInstr(...args) {
        return (new QueryBuilder(this)).regexpInstr(...args);
    }
    regexpLike(...args) {
        return (new QueryBuilder(this)).regexpLike(...args);
    }
    regexpMatch(...args) {
        return (new QueryBuilder(this)).regexpMatch(...args);
    }
    regexpMatches(...args) {
        return (new QueryBuilder(this)).regexpMatches(...args);
    }
    regexpReplace(...args) {
        return (new QueryBuilder(this)).regexpReplace(...args);
    }
    regexpSplitToArray(...args) {
        return (new QueryBuilder(this)).regexpSplitToArray(...args);
    }
    regexpSplitToTable(...args) {
        return (new QueryBuilder(this)).regexpSplitToTable(...args);
    }
    regexpSubstr(...args) {
        return (new QueryBuilder(this)).regexpSubstr(...args);
    }
    regrAvgx(...args) {
        return (new QueryBuilder(this)).regrAvgx(...args);
    }
    regrAvgy(...args) {
        return (new QueryBuilder(this)).regrAvgy(...args);
    }
    regrCount(...args) {
        return (new QueryBuilder(this)).regrCount(...args);
    }
    regrIntercept(...args) {
        return (new QueryBuilder(this)).regrIntercept(...args);
    }
    regrR2(...args) {
        return (new QueryBuilder(this)).regrR2(...args);
    }
    regrSlope(...args) {
        return (new QueryBuilder(this)).regrSlope(...args);
    }
    regrSxx(...args) {
        return (new QueryBuilder(this)).regrSxx(...args);
    }
    regrSxy(...args) {
        return (new QueryBuilder(this)).regrSxy(...args);
    }
    regrSyy(...args) {
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
    releaseTransaction(...args) {
        return (new QueryBuilder(this)).releaseTransaction(...args);
    }
    rename() {
        return (new QueryBuilder(this)).rename();
    }
    repeat(...args) {
        return (new QueryBuilder(this)).repeat(...args);
    }
    repeatable() {
        return (new QueryBuilder(this)).repeatable();
    }
    replace(...args) {
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
    returning(...args) {
        return (new QueryBuilder(this)).returning(...args);
    }
    returns() {
        return (new QueryBuilder(this)).returns();
    }
    reverse(...args) {
        return (new QueryBuilder(this)).reverse(...args);
    }
    revoke() {
        return (new QueryBuilder(this)).revoke();
    }
    right(...args) {
        return (new QueryBuilder(this)).right(...args);
    }
    rightJoin(...args) {
        return (new QueryBuilder(this)).rightJoin(...args);
    }
    rightJoinLateral(...args) {
        return (new QueryBuilder(this)).rightJoinLateral(...args);
    }
    role() {
        return (new QueryBuilder(this)).role();
    }
    rollback() {
        return (new QueryBuilder(this)).rollback();
    }
    rollbackPreparedTransaction(...args) {
        return (new QueryBuilder(this)).rollbackPreparedTransaction(...args);
    }
    rollbackToSavepointTransaction(...args) {
        return (new QueryBuilder(this)).rollbackToSavepointTransaction(...args);
    }
    rollbackTransaction(...args) {
        return (new QueryBuilder(this)).rollbackTransaction(...args);
    }
    rollup() {
        return (new QueryBuilder(this)).rollup();
    }
    round(...args) {
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
    rowNumber(...args) {
        return (new QueryBuilder(this)).rowNumber(...args);
    }
    rows() {
        return (new QueryBuilder(this)).rows();
    }
    rowSecurityActive(...args) {
        return (new QueryBuilder(this)).rowSecurityActive(...args);
    }
    rowToJson(...args) {
        return (new QueryBuilder(this)).rowToJson(...args);
    }
    rpad(...args) {
        return (new QueryBuilder(this)).rpad(...args);
    }
    rs(...args) {
        return (new QueryBuilder(this)).rs(...args);
    }
    rtrim(...args) {
        return (new QueryBuilder(this)).rtrim(...args);
    }
    rule() {
        return (new QueryBuilder(this)).rule();
    }
    running() {
        return (new QueryBuilder(this)).running();
    }
    sameAs(...args) {
        return (new QueryBuilder(this)).sameAs(...args);
    }
    savepoint() {
        return (new QueryBuilder(this)).savepoint();
    }
    savepointTransaction(...args) {
        return (new QueryBuilder(this)).savepointTransaction(...args);
    }
    sc(...args) {
        return (new QueryBuilder(this)).sc(...args);
    }
    scalar() {
        return (new QueryBuilder(this)).scalar();
    }
    scale(...args) {
        return (new QueryBuilder(this)).scale(...args);
    }
    schema() {
        return (new QueryBuilder(this)).schema();
    }
    schemaCase(key, queryBuilder) {
        return (new QueryBuilder(this)).schemaCase(key, queryBuilder);
    }
    schemaName() {
        return (new QueryBuilder(this)).schemaName();
    }
    schemaParam(key) {
        return (new QueryBuilder(this)).schemaParam(key);
    }
    schemas() {
        return (new QueryBuilder(this)).schemas();
    }
    schemaToXml(...args) {
        return (new QueryBuilder(this)).schemaToXml(...args);
    }
    schemaToXmlAndXmlschema(...args) {
        return (new QueryBuilder(this)).schemaToXmlAndXmlschema(...args);
    }
    schemaToXmlschema(...args) {
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
    select(...args) {
        return (new QueryBuilder(this)).select(...args);
    }
    selectDistinct(...args) {
        return (new QueryBuilder(this)).selectDistinct(...args);
    }
    selectDistinctOn(...args) {
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
    semicolon(...args) {
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
    set(...args) {
        return (new QueryBuilder(this)).set(...args);
    }
    setBit(...args) {
        return (new QueryBuilder(this)).setBit(...args);
    }
    setByte(...args) {
        return (new QueryBuilder(this)).setByte(...args);
    }
    setConfig(...args) {
        return (new QueryBuilder(this)).setConfig(...args);
    }
    setMasklen(...args) {
        return (new QueryBuilder(this)).setMasklen(...args);
    }
    setof() {
        return (new QueryBuilder(this)).setof();
    }
    setParams(...args) {
        return (new QueryBuilder(this)).setParams(...args);
    }
    sets() {
        return (new QueryBuilder(this)).sets();
    }
    setseed(...args) {
        return (new QueryBuilder(this)).setseed(...args);
    }
    setval(...args) {
        return (new QueryBuilder(this)).setval(...args);
    }
    setweight(...args) {
        return (new QueryBuilder(this)).setweight(...args);
    }
    sha224(...args) {
        return (new QueryBuilder(this)).sha224(...args);
    }
    sha256(...args) {
        return (new QueryBuilder(this)).sha256(...args);
    }
    sha384(...args) {
        return (new QueryBuilder(this)).sha384(...args);
    }
    sha512(...args) {
        return (new QueryBuilder(this)).sha512(...args);
    }
    share() {
        return (new QueryBuilder(this)).share();
    }
    shobjDescription(...args) {
        return (new QueryBuilder(this)).shobjDescription(...args);
    }
    show() {
        return (new QueryBuilder(this)).show();
    }
    sign(...args) {
        return (new QueryBuilder(this)).sign(...args);
    }
    similar() {
        return (new QueryBuilder(this)).similar();
    }
    similarTo(...args) {
        return (new QueryBuilder(this)).similarTo(...args);
    }
    simple() {
        return (new QueryBuilder(this)).simple();
    }
    sin(...args) {
        return (new QueryBuilder(this)).sin(...args);
    }
    sind(...args) {
        return (new QueryBuilder(this)).sind(...args);
    }
    sinh(...args) {
        return (new QueryBuilder(this)).sinh(...args);
    }
    size() {
        return (new QueryBuilder(this)).size();
    }
    skip() {
        return (new QueryBuilder(this)).skip();
    }
    slope(...args) {
        return (new QueryBuilder(this)).slope(...args);
    }
    smallint() {
        return (new QueryBuilder(this)).smallint();
    }
    snapshot() {
        return (new QueryBuilder(this)).snapshot();
    }
    some(...args) {
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
    splitPart(...args) {
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
    sqrt(...args) {
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
    startsWith(...args) {
        return (new QueryBuilder(this)).startsWith(...args);
    }
    startTransaction(...args) {
        return (new QueryBuilder(this)).startTransaction(...args);
    }
    state() {
        return (new QueryBuilder(this)).state();
    }
    statement() {
        return (new QueryBuilder(this)).statement();
    }
    statementTimestamp(...args) {
        return (new QueryBuilder(this)).statementTimestamp(...args);
    }
    static() {
        return (new QueryBuilder(this)).static();
    }
    statistics() {
        return (new QueryBuilder(this)).statistics();
    }
    stddev(...args) {
        return (new QueryBuilder(this)).stddev(...args);
    }
    stddevPop(...args) {
        return (new QueryBuilder(this)).stddevPop(...args);
    }
    stddevSamp(...args) {
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
    strictlyAbove(...args) {
        return (new QueryBuilder(this)).strictlyAbove(...args);
    }
    strictlyBelow(...args) {
        return (new QueryBuilder(this)).strictlyBelow(...args);
    }
    string() {
        return (new QueryBuilder(this)).string();
    }
    stringAgg(...args) {
        return (new QueryBuilder(this)).stringAgg(...args);
    }
    stringToArray(...args) {
        return (new QueryBuilder(this)).stringToArray(...args);
    }
    stringToTable(...args) {
        return (new QueryBuilder(this)).stringToTable(...args);
    }
    strip(...args) {
        return (new QueryBuilder(this)).strip(...args);
    }
    strpos(...args) {
        return (new QueryBuilder(this)).strpos(...args);
    }
    structure() {
        return (new QueryBuilder(this)).structure();
    }
    style() {
        return (new QueryBuilder(this)).style();
    }
    sub(...args) {
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
    substr(...args) {
        return (new QueryBuilder(this)).substr(...args);
    }
    substring(...args) {
        return (new QueryBuilder(this)).substring(...args);
    }
    substringRegex() {
        return (new QueryBuilder(this)).substringRegex();
    }
    succeeds() {
        return (new QueryBuilder(this)).succeeds();
    }
    sum(...args) {
        return (new QueryBuilder(this)).sum(...args);
    }
    support() {
        return (new QueryBuilder(this)).support();
    }
    suppressRedundantUpdatesTrigger(...args) {
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
    t(...args) {
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
    tableToXml(...args) {
        return (new QueryBuilder(this)).tableToXml(...args);
    }
    tableToXmlAndXmlschema(...args) {
        return (new QueryBuilder(this)).tableToXmlAndXmlschema(...args);
    }
    tableToXmlschema(...args) {
        return (new QueryBuilder(this)).tableToXmlschema(...args);
    }
    tan(...args) {
        return (new QueryBuilder(this)).tan(...args);
    }
    tand(...args) {
        return (new QueryBuilder(this)).tand(...args);
    }
    tanh(...args) {
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
    textCat(...args) {
        return (new QueryBuilder(this)).textCat(...args);
    }
    then(...args) {
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
    timeofday(...args) {
        return (new QueryBuilder(this)).timeofday(...args);
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
    toAscii(...args) {
        return (new QueryBuilder(this)).toAscii(...args);
    }
    toBin(...args) {
        return (new QueryBuilder(this)).toBin(...args);
    }
    toChar(...args) {
        return (new QueryBuilder(this)).toChar(...args);
    }
    toDate(...args) {
        return (new QueryBuilder(this)).toDate(...args);
    }
    toHex(...args) {
        return (new QueryBuilder(this)).toHex(...args);
    }
    toJson(...args) {
        return (new QueryBuilder(this)).toJson(...args);
    }
    toJsonb(...args) {
        return (new QueryBuilder(this)).toJsonb(...args);
    }
    token() {
        return (new QueryBuilder(this)).token();
    }
    toNumber(...args) {
        return (new QueryBuilder(this)).toNumber(...args);
    }
    toOct(...args) {
        return (new QueryBuilder(this)).toOct(...args);
    }
    topLevelCount() {
        return (new QueryBuilder(this)).topLevelCount();
    }
    toRegclass(...args) {
        return (new QueryBuilder(this)).toRegclass(...args);
    }
    toRegcollation(...args) {
        return (new QueryBuilder(this)).toRegcollation(...args);
    }
    toRegnamespace(...args) {
        return (new QueryBuilder(this)).toRegnamespace(...args);
    }
    toRegoper(...args) {
        return (new QueryBuilder(this)).toRegoper(...args);
    }
    toRegoperator(...args) {
        return (new QueryBuilder(this)).toRegoperator(...args);
    }
    toRegproc(...args) {
        return (new QueryBuilder(this)).toRegproc(...args);
    }
    toRegprocedure(...args) {
        return (new QueryBuilder(this)).toRegprocedure(...args);
    }
    toRegrole(...args) {
        return (new QueryBuilder(this)).toRegrole(...args);
    }
    toRegtype(...args) {
        return (new QueryBuilder(this)).toRegtype(...args);
    }
    toRegtypemod(...args) {
        return (new QueryBuilder(this)).toRegtypemod(...args);
    }
    totalLength(...args) {
        return (new QueryBuilder(this)).totalLength(...args);
    }
    toText(...args) {
        return (new QueryBuilder(this)).toText(...args);
    }
    toTimestamp(...args) {
        return (new QueryBuilder(this)).toTimestamp(...args);
    }
    toTsquery(...args) {
        return (new QueryBuilder(this)).toTsquery(...args);
    }
    toTsvector(...args) {
        return (new QueryBuilder(this)).toTsvector(...args);
    }
    trailing() {
        return (new QueryBuilder(this)).trailing();
    }
    transaction(...args) {
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
    transactionTimestamp(...args) {
        return (new QueryBuilder(this)).transactionTimestamp(...args);
    }
    transform() {
        return (new QueryBuilder(this)).transform();
    }
    transforms() {
        return (new QueryBuilder(this)).transforms();
    }
    translate(...args) {
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
    trim(...args) {
        return (new QueryBuilder(this)).trim(...args);
    }
    trimArray(...args) {
        return (new QueryBuilder(this)).trimArray(...args);
    }
    trimScale(...args) {
        return (new QueryBuilder(this)).trimScale(...args);
    }
    true() {
        return (new QueryBuilder(this)).true();
    }
    trunc(...args) {
        return (new QueryBuilder(this)).trunc(...args);
    }
    truncate() {
        return (new QueryBuilder(this)).truncate();
    }
    trusted() {
        return (new QueryBuilder(this)).trusted();
    }
    tsDebug(...args) {
        return (new QueryBuilder(this)).tsDebug(...args);
    }
    tsDelete(...args) {
        return (new QueryBuilder(this)).tsDelete(...args);
    }
    tsFilter(...args) {
        return (new QueryBuilder(this)).tsFilter(...args);
    }
    tsHeadline(...args) {
        return (new QueryBuilder(this)).tsHeadline(...args);
    }
    tsLexize(...args) {
        return (new QueryBuilder(this)).tsLexize(...args);
    }
    tsParse(...args) {
        return (new QueryBuilder(this)).tsParse(...args);
    }
    tsqueryPhrase(...args) {
        return (new QueryBuilder(this)).tsqueryPhrase(...args);
    }
    tsRank(...args) {
        return (new QueryBuilder(this)).tsRank(...args);
    }
    tsRankCd(...args) {
        return (new QueryBuilder(this)).tsRankCd(...args);
    }
    tsRewrite(...args) {
        return (new QueryBuilder(this)).tsRewrite(...args);
    }
    tsStat(...args) {
        return (new QueryBuilder(this)).tsStat(...args);
    }
    tsTokenType(...args) {
        return (new QueryBuilder(this)).tsTokenType(...args);
    }
    tsvectorToArray(...args) {
        return (new QueryBuilder(this)).tsvectorToArray(...args);
    }
    tsvectorUpdateTrigger(...args) {
        return (new QueryBuilder(this)).tsvectorUpdateTrigger(...args);
    }
    tsvectorUpdateTriggerColumn(...args) {
        return (new QueryBuilder(this)).tsvectorUpdateTriggerColumn(...args);
    }
    txidCurrent(...args) {
        return (new QueryBuilder(this)).txidCurrent(...args);
    }
    txidCurrentIfAssigned(...args) {
        return (new QueryBuilder(this)).txidCurrentIfAssigned(...args);
    }
    txidCurrentSnapshot(...args) {
        return (new QueryBuilder(this)).txidCurrentSnapshot(...args);
    }
    txidSnapshotXip(...args) {
        return (new QueryBuilder(this)).txidSnapshotXip(...args);
    }
    txidSnapshotXmax(...args) {
        return (new QueryBuilder(this)).txidSnapshotXmax(...args);
    }
    txidSnapshotXmin(...args) {
        return (new QueryBuilder(this)).txidSnapshotXmin(...args);
    }
    txidStatus(...args) {
        return (new QueryBuilder(this)).txidStatus(...args);
    }
    txidVisibleInSnapshot(...args) {
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
    unicodeAssigned(...args) {
        return (new QueryBuilder(this)).unicodeAssigned(...args);
    }
    unicodeVersion(...args) {
        return (new QueryBuilder(this)).unicodeVersion(...args);
    }
    union(...args) {
        return (new QueryBuilder(this)).union(...args);
    }
    unionAll(...args) {
        return (new QueryBuilder(this)).unionAll(...args);
    }
    unique() {
        return (new QueryBuilder(this)).unique();
    }
    unistr(...args) {
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
    unnest(...args) {
        return (new QueryBuilder(this)).unnest(...args);
    }
    until() {
        return (new QueryBuilder(this)).until();
    }
    untyped() {
        return (new QueryBuilder(this)).untyped();
    }
    update(...args) {
        return (new QueryBuilder(this)).update(...args);
    }
    upper(...args) {
        return (new QueryBuilder(this)).upper(...args);
    }
    upperInc(...args) {
        return (new QueryBuilder(this)).upperInc(...args);
    }
    upperInf(...args) {
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
    uuidExtractTimestamp(...args) {
        return (new QueryBuilder(this)).uuidExtractTimestamp(...args);
    }
    uuidExtractVersion(...args) {
        return (new QueryBuilder(this)).uuidExtractVersion(...args);
    }
    uuidv4(...args) {
        return (new QueryBuilder(this)).uuidv4(...args);
    }
    uuidv7(...args) {
        return (new QueryBuilder(this)).uuidv7(...args);
    }
    v(...args) {
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
    values(...args) {
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
    variance(...args) {
        return (new QueryBuilder(this)).variance(...args);
    }
    varPop(...args) {
        return (new QueryBuilder(this)).varPop(...args);
    }
    varSamp(...args) {
        return (new QueryBuilder(this)).varSamp(...args);
    }
    varying() {
        return (new QueryBuilder(this)).varying();
    }
    verbose() {
        return (new QueryBuilder(this)).verbose();
    }
    version(...args) {
        return (new QueryBuilder(this)).version(...args);
    }
    versioning() {
        return (new QueryBuilder(this)).versioning();
    }
    vertical(...args) {
        return (new QueryBuilder(this)).vertical(...args);
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
    websearchToTsquery(...args) {
        return (new QueryBuilder(this)).websearchToTsquery(...args);
    }
    when(...args) {
        return (new QueryBuilder(this)).when(...args);
    }
    whenever() {
        return (new QueryBuilder(this)).whenever();
    }
    where(...args) {
        return (new QueryBuilder(this)).where(...args);
    }
    whitespace() {
        return (new QueryBuilder(this)).whitespace();
    }
    width(...args) {
        return (new QueryBuilder(this)).width(...args);
    }
    widthBucket(...args) {
        return (new QueryBuilder(this)).widthBucket(...args);
    }
    window(...args) {
        return (new QueryBuilder(this)).window(...args);
    }
    with(...args) {
        return (new QueryBuilder(this)).with(...args);
    }
    within() {
        return (new QueryBuilder(this)).within();
    }
    without() {
        return (new QueryBuilder(this)).without();
    }
    withTies(...args) {
        return (new QueryBuilder(this)).withTies(...args);
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
    xmlagg(...args) {
        return (new QueryBuilder(this)).xmlagg(...args);
    }
    xmlattributes(...args) {
        return (new QueryBuilder(this)).xmlattributes(...args);
    }
    xmlbinary() {
        return (new QueryBuilder(this)).xmlbinary();
    }
    xmlcast() {
        return (new QueryBuilder(this)).xmlcast();
    }
    xmlcomment(...args) {
        return (new QueryBuilder(this)).xmlcomment(...args);
    }
    xmlconcat(...args) {
        return (new QueryBuilder(this)).xmlconcat(...args);
    }
    xmldeclaration() {
        return (new QueryBuilder(this)).xmldeclaration();
    }
    xmldocument() {
        return (new QueryBuilder(this)).xmldocument();
    }
    xmlelement(...args) {
        return (new QueryBuilder(this)).xmlelement(...args);
    }
    xmlexists(...args) {
        return (new QueryBuilder(this)).xmlexists(...args);
    }
    xmlforest(...args) {
        return (new QueryBuilder(this)).xmlforest(...args);
    }
    xmlIsWellFormed(...args) {
        return (new QueryBuilder(this)).xmlIsWellFormed(...args);
    }
    xmlIsWellFormedContent(...args) {
        return (new QueryBuilder(this)).xmlIsWellFormedContent(...args);
    }
    xmlIsWellFormedDocument(...args) {
        return (new QueryBuilder(this)).xmlIsWellFormedDocument(...args);
    }
    xmliterate() {
        return (new QueryBuilder(this)).xmliterate();
    }
    xmlnamespaces() {
        return (new QueryBuilder(this)).xmlnamespaces();
    }
    xmlparse(...args) {
        return (new QueryBuilder(this)).xmlparse(...args);
    }
    xmlpi(...args) {
        return (new QueryBuilder(this)).xmlpi(...args);
    }
    xmlquery() {
        return (new QueryBuilder(this)).xmlquery();
    }
    xmlroot(...args) {
        return (new QueryBuilder(this)).xmlroot(...args);
    }
    xmlschema() {
        return (new QueryBuilder(this)).xmlschema();
    }
    xmlserialize(...args) {
        return (new QueryBuilder(this)).xmlserialize(...args);
    }
    xmltable() {
        return (new QueryBuilder(this)).xmltable();
    }
    xmltext(...args) {
        return (new QueryBuilder(this)).xmltext(...args);
    }
    xmlvalidate() {
        return (new QueryBuilder(this)).xmlvalidate();
    }
    xpath(...args) {
        return (new QueryBuilder(this)).xpath(...args);
    }
    xpathExists(...args) {
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
