"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueryBuilder = void 0;
const base_raw_query_builder_1 = require("../base-raw-query-builder");
class BaseQueryBuilder extends base_raw_query_builder_1.BaseRawQueryBuilder {
    a() {
        this.query.sql.push('A');
        return this;
    }
    abort() {
        this.query.sql.push('ABORT');
        return this;
    }
    abs() {
        this.query.sql.push('ABS');
        return this;
    }
    absent() {
        this.query.sql.push('ABSENT');
        return this;
    }
    absolute() {
        this.query.sql.push('ABSOLUTE');
        return this;
    }
    access() {
        this.query.sql.push('ACCESS');
        return this;
    }
    according() {
        this.query.sql.push('ACCORDING');
        return this;
    }
    acos() {
        this.query.sql.push('ACOS');
        return this;
    }
    action() {
        this.query.sql.push('ACTION');
        return this;
    }
    ada() {
        this.query.sql.push('ADA');
        return this;
    }
    add() {
        this.query.sql.push('ADD');
        return this;
    }
    admin() {
        this.query.sql.push('ADMIN');
        return this;
    }
    after() {
        this.query.sql.push('AFTER');
        return this;
    }
    aggregate() {
        this.query.sql.push('AGGREGATE');
        return this;
    }
    all() {
        this.query.sql.push('ALL');
        return this;
    }
    allocate() {
        this.query.sql.push('ALLOCATE');
        return this;
    }
    also() {
        this.query.sql.push('ALSO');
        return this;
    }
    alter() {
        this.query.sql.push('ALTER');
        return this;
    }
    always() {
        this.query.sql.push('ALWAYS');
        return this;
    }
    analyse() {
        this.query.sql.push('ANALYSE');
        return this;
    }
    analyze() {
        this.query.sql.push('ANALYZE');
        return this;
    }
    and() {
        this.query.sql.push('AND');
        return this;
    }
    any() {
        this.query.sql.push('ANY');
        return this;
    }
    anyValue() {
        this.query.sql.push('ANY_VALUE');
        return this;
    }
    are() {
        this.query.sql.push('ARE');
        return this;
    }
    array() {
        this.query.sql.push('ARRAY');
        return this;
    }
    arrayAgg() {
        this.query.sql.push('ARRAY_AGG');
        return this;
    }
    arraymaxcardinality() {
        this.query.sql.push('ARRAY_MAX_CARDINALITY');
        return this;
    }
    as() {
        this.query.sql.push('AS');
        return this;
    }
    asc() {
        this.query.sql.push('ASC');
        return this;
    }
    asensitive() {
        this.query.sql.push('ASENSITIVE');
        return this;
    }
    asin() {
        this.query.sql.push('ASIN');
        return this;
    }
    assertion() {
        this.query.sql.push('ASSERTION');
        return this;
    }
    assignment() {
        this.query.sql.push('ASSIGNMENT');
        return this;
    }
    asymmetric() {
        this.query.sql.push('ASYMMETRIC');
        return this;
    }
    at() {
        this.query.sql.push('AT');
        return this;
    }
    atan() {
        this.query.sql.push('ATAN');
        return this;
    }
    atomic() {
        this.query.sql.push('ATOMIC');
        return this;
    }
    attach() {
        this.query.sql.push('ATTACH');
        return this;
    }
    attribute() {
        this.query.sql.push('ATTRIBUTE');
        return this;
    }
    attributes() {
        this.query.sql.push('ATTRIBUTES');
        return this;
    }
    authorization() {
        this.query.sql.push('AUTHORIZATION');
        return this;
    }
    avg() {
        this.query.sql.push('AVG');
        return this;
    }
    backward() {
        this.query.sql.push('BACKWARD');
        return this;
    }
    base64() {
        this.query.sql.push('BASE64');
        return this;
    }
    before() {
        this.query.sql.push('BEFORE');
        return this;
    }
    begin() {
        this.query.sql.push('BEGIN');
        return this;
    }
    beginFrame() {
        this.query.sql.push('BEGIN_FRAME');
        return this;
    }
    beginPartition() {
        this.query.sql.push('BEGIN_PARTITION');
        return this;
    }
    bernoulli() {
        this.query.sql.push('BERNOULLI');
        return this;
    }
    between() {
        this.query.sql.push('BETWEEN');
        return this;
    }
    bigint() {
        this.query.sql.push('BIGINT');
        return this;
    }
    binary() {
        this.query.sql.push('BINARY');
        return this;
    }
    bit() {
        this.query.sql.push('BIT');
        return this;
    }
    bitLength() {
        this.query.sql.push('BIT_LENGTH');
        return this;
    }
    blob() {
        this.query.sql.push('BLOB');
        return this;
    }
    blocked() {
        this.query.sql.push('BLOCKED');
        return this;
    }
    bom() {
        this.query.sql.push('BOM');
        return this;
    }
    boolean() {
        this.query.sql.push('BOOLEAN');
        return this;
    }
    both() {
        this.query.sql.push('BOTH');
        return this;
    }
    breadth() {
        this.query.sql.push('BREADTH');
        return this;
    }
    btrim() {
        this.query.sql.push('BTRIM');
        return this;
    }
    by() {
        this.query.sql.push('BY');
        return this;
    }
    c() {
        this.query.sql.push('C');
        return this;
    }
    cache() {
        this.query.sql.push('CACHE');
        return this;
    }
    call() {
        this.query.sql.push('CALL');
        return this;
    }
    called() {
        this.query.sql.push('CALLED');
        return this;
    }
    cardinality() {
        this.query.sql.push('CARDINALITY');
        return this;
    }
    cascade() {
        this.query.sql.push('CASCADE');
        return this;
    }
    cascaded() {
        this.query.sql.push('CASCADED');
        return this;
    }
    case() {
        this.query.sql.push('CASE');
        return this;
    }
    cast() {
        this.query.sql.push('CAST');
        return this;
    }
    catalog() {
        this.query.sql.push('CATALOG');
        return this;
    }
    catalogName() {
        this.query.sql.push('CATALOG_NAME');
        return this;
    }
    ceil() {
        this.query.sql.push('CEIL');
        return this;
    }
    ceiling() {
        this.query.sql.push('CEILING');
        return this;
    }
    chain() {
        this.query.sql.push('CHAIN');
        return this;
    }
    chaining() {
        this.query.sql.push('CHAINING');
        return this;
    }
    char() {
        this.query.sql.push('CHAR');
        return this;
    }
    character() {
        this.query.sql.push('CHARACTER');
        return this;
    }
    characteristics() {
        this.query.sql.push('CHARACTERISTICS');
        return this;
    }
    characters() {
        this.query.sql.push('CHARACTERS');
        return this;
    }
    characterLength() {
        this.query.sql.push('CHARACTER_LENGTH');
        return this;
    }
    charactersetcatalog() {
        this.query.sql.push('CHARACTER_SET_CATALOG');
        return this;
    }
    characterSetName() {
        this.query.sql.push('CHARACTER_SET_NAME');
        return this;
    }
    characterSetSchema() {
        this.query.sql.push('CHARACTER_SET_SCHEMA');
        return this;
    }
    charLength() {
        this.query.sql.push('CHAR_LENGTH');
        return this;
    }
    check() {
        this.query.sql.push('CHECK');
        return this;
    }
    checkpoint() {
        this.query.sql.push('CHECKPOINT');
        return this;
    }
    class() {
        this.query.sql.push('CLASS');
        return this;
    }
    classifier() {
        this.query.sql.push('CLASSIFIER');
        return this;
    }
    classOrigin() {
        this.query.sql.push('CLASS_ORIGIN');
        return this;
    }
    clob() {
        this.query.sql.push('CLOB');
        return this;
    }
    close() {
        this.query.sql.push('CLOSE');
        return this;
    }
    cluster() {
        this.query.sql.push('CLUSTER');
        return this;
    }
    coalesce() {
        this.query.sql.push('COALESCE');
        return this;
    }
    cobol() {
        this.query.sql.push('COBOL');
        return this;
    }
    collate() {
        this.query.sql.push('COLLATE');
        return this;
    }
    collation() {
        this.query.sql.push('COLLATION');
        return this;
    }
    collationCatalog() {
        this.query.sql.push('COLLATION_CATALOG');
        return this;
    }
    collationName() {
        this.query.sql.push('COLLATION_NAME');
        return this;
    }
    collationSchema() {
        this.query.sql.push('COLLATION_SCHEMA');
        return this;
    }
    collect() {
        this.query.sql.push('COLLECT');
        return this;
    }
    column() {
        this.query.sql.push('COLUMN');
        return this;
    }
    columns() {
        this.query.sql.push('COLUMNS');
        return this;
    }
    columnName() {
        this.query.sql.push('COLUMN_NAME');
        return this;
    }
    commandFunction() {
        this.query.sql.push('COMMAND_FUNCTION');
        return this;
    }
    commandfunctioncode() {
        this.query.sql.push('COMMAND_FUNCTION_CODE');
        return this;
    }
    comment() {
        this.query.sql.push('COMMENT');
        return this;
    }
    comments() {
        this.query.sql.push('COMMENTS');
        return this;
    }
    commit() {
        this.query.sql.push('COMMIT');
        return this;
    }
    committed() {
        this.query.sql.push('COMMITTED');
        return this;
    }
    compression() {
        this.query.sql.push('COMPRESSION');
        return this;
    }
    concurrently() {
        this.query.sql.push('CONCURRENTLY');
        return this;
    }
    condition() {
        this.query.sql.push('CONDITION');
        return this;
    }
    conditional() {
        this.query.sql.push('CONDITIONAL');
        return this;
    }
    conditionNumber() {
        this.query.sql.push('CONDITION_NUMBER');
        return this;
    }
    configuration() {
        this.query.sql.push('CONFIGURATION');
        return this;
    }
    conflict() {
        this.query.sql.push('CONFLICT');
        return this;
    }
    connect() {
        this.query.sql.push('CONNECT');
        return this;
    }
    connection() {
        this.query.sql.push('CONNECTION');
        return this;
    }
    connectionName() {
        this.query.sql.push('CONNECTION_NAME');
        return this;
    }
    constraint() {
        this.query.sql.push('CONSTRAINT');
        return this;
    }
    constraints() {
        this.query.sql.push('CONSTRAINTS');
        return this;
    }
    constraintCatalog() {
        this.query.sql.push('CONSTRAINT_CATALOG');
        return this;
    }
    constraintName() {
        this.query.sql.push('CONSTRAINT_NAME');
        return this;
    }
    constraintSchema() {
        this.query.sql.push('CONSTRAINT_SCHEMA');
        return this;
    }
    constructorKeyword() {
        this.query.sql.push('CONSTRUCTOR');
        return this;
    }
    contains() {
        this.query.sql.push('CONTAINS');
        return this;
    }
    content() {
        this.query.sql.push('CONTENT');
        return this;
    }
    continue() {
        this.query.sql.push('CONTINUE');
        return this;
    }
    control() {
        this.query.sql.push('CONTROL');
        return this;
    }
    conversion() {
        this.query.sql.push('CONVERSION');
        return this;
    }
    convert() {
        this.query.sql.push('CONVERT');
        return this;
    }
    copartition() {
        this.query.sql.push('COPARTITION');
        return this;
    }
    copy() {
        this.query.sql.push('COPY');
        return this;
    }
    corr() {
        this.query.sql.push('CORR');
        return this;
    }
    corresponding() {
        this.query.sql.push('CORRESPONDING');
        return this;
    }
    cos() {
        this.query.sql.push('COS');
        return this;
    }
    cosh() {
        this.query.sql.push('COSH');
        return this;
    }
    cost() {
        this.query.sql.push('COST');
        return this;
    }
    count() {
        this.query.sql.push('COUNT');
        return this;
    }
    covarPop() {
        this.query.sql.push('COVAR_POP');
        return this;
    }
    covarSamp() {
        this.query.sql.push('COVAR_SAMP');
        return this;
    }
    create() {
        this.query.sql.push('CREATE');
        return this;
    }
    cross() {
        this.query.sql.push('CROSS');
        return this;
    }
    csv() {
        this.query.sql.push('CSV');
        return this;
    }
    cube() {
        this.query.sql.push('CUBE');
        return this;
    }
    cumeDist() {
        this.query.sql.push('CUME_DIST');
        return this;
    }
    current() {
        this.query.sql.push('CURRENT');
        return this;
    }
    currentCatalog() {
        this.query.sql.push('CURRENT_CATALOG');
        return this;
    }
    currentDate() {
        this.query.sql.push('CURRENT_DATE');
        return this;
    }
    currentdefaulttransformgroup() {
        this.query.sql.push('CURRENT_DEFAULT_TRANSFORM_GROUP');
        return this;
    }
    currentPath() {
        this.query.sql.push('CURRENT_PATH');
        return this;
    }
    currentRole() {
        this.query.sql.push('CURRENT_ROLE');
        return this;
    }
    currentRow() {
        this.query.sql.push('CURRENT_ROW');
        return this;
    }
    currentSchema() {
        this.query.sql.push('CURRENT_SCHEMA');
        return this;
    }
    currentTime() {
        this.query.sql.push('CURRENT_TIME');
        return this;
    }
    currentTimestamp() {
        this.query.sql.push('CURRENT_TIMESTAMP');
        return this;
    }
    currenttransformgroupfortype() {
        this.query.sql.push('CURRENT_TRANSFORM_GROUP_FOR_TYPE');
        return this;
    }
    currentUser() {
        this.query.sql.push('CURRENT_USER');
        return this;
    }
    cursor() {
        this.query.sql.push('CURSOR');
        return this;
    }
    cursorName() {
        this.query.sql.push('CURSOR_NAME');
        return this;
    }
    cycle() {
        this.query.sql.push('CYCLE');
        return this;
    }
    data() {
        this.query.sql.push('DATA');
        return this;
    }
    database() {
        this.query.sql.push('DATABASE');
        return this;
    }
    datalink() {
        this.query.sql.push('DATALINK');
        return this;
    }
    date() {
        this.query.sql.push('DATE');
        return this;
    }
    datetimeintervalcode() {
        this.query.sql.push('DATETIME_INTERVAL_CODE');
        return this;
    }
    datetimeintervalprecision() {
        this.query.sql.push('DATETIME_INTERVAL_PRECISION');
        return this;
    }
    day() {
        this.query.sql.push('DAY');
        return this;
    }
    db() {
        this.query.sql.push('DB');
        return this;
    }
    deallocate() {
        this.query.sql.push('DEALLOCATE');
        return this;
    }
    dec() {
        this.query.sql.push('DEC');
        return this;
    }
    decfloat() {
        this.query.sql.push('DECFLOAT');
        return this;
    }
    decimal() {
        this.query.sql.push('DECIMAL');
        return this;
    }
    declare() {
        this.query.sql.push('DECLARE');
        return this;
    }
    default() {
        this.query.sql.push('DEFAULT');
        return this;
    }
    defaults() {
        this.query.sql.push('DEFAULTS');
        return this;
    }
    deferrable() {
        this.query.sql.push('DEFERRABLE');
        return this;
    }
    deferred() {
        this.query.sql.push('DEFERRED');
        return this;
    }
    define() {
        this.query.sql.push('DEFINE');
        return this;
    }
    defined() {
        this.query.sql.push('DEFINED');
        return this;
    }
    definer() {
        this.query.sql.push('DEFINER');
        return this;
    }
    degree() {
        this.query.sql.push('DEGREE');
        return this;
    }
    delete() {
        this.query.sql.push('DELETE');
        return this;
    }
    delimiter() {
        this.query.sql.push('DELIMITER');
        return this;
    }
    delimiters() {
        this.query.sql.push('DELIMITERS');
        return this;
    }
    denseRank() {
        this.query.sql.push('DENSE_RANK');
        return this;
    }
    depends() {
        this.query.sql.push('DEPENDS');
        return this;
    }
    depth() {
        this.query.sql.push('DEPTH');
        return this;
    }
    deref() {
        this.query.sql.push('DEREF');
        return this;
    }
    derived() {
        this.query.sql.push('DERIVED');
        return this;
    }
    desc() {
        this.query.sql.push('DESC');
        return this;
    }
    describe() {
        this.query.sql.push('DESCRIBE');
        return this;
    }
    descriptor() {
        this.query.sql.push('DESCRIPTOR');
        return this;
    }
    detach() {
        this.query.sql.push('DETACH');
        return this;
    }
    deterministic() {
        this.query.sql.push('DETERMINISTIC');
        return this;
    }
    diagnostics() {
        this.query.sql.push('DIAGNOSTICS');
        return this;
    }
    dictionary() {
        this.query.sql.push('DICTIONARY');
        return this;
    }
    disable() {
        this.query.sql.push('DISABLE');
        return this;
    }
    discard() {
        this.query.sql.push('DISCARD');
        return this;
    }
    disconnect() {
        this.query.sql.push('DISCONNECT');
        return this;
    }
    dispatch() {
        this.query.sql.push('DISPATCH');
        return this;
    }
    distinct() {
        this.query.sql.push('DISTINCT');
        return this;
    }
    dlnewcopy() {
        this.query.sql.push('DLNEWCOPY');
        return this;
    }
    dlpreviouscopy() {
        this.query.sql.push('DLPREVIOUSCOPY');
        return this;
    }
    dlurlcomplete() {
        this.query.sql.push('DLURLCOMPLETE');
        return this;
    }
    dlurlcompleteonly() {
        this.query.sql.push('DLURLCOMPLETEONLY');
        return this;
    }
    dlurlcompletewrite() {
        this.query.sql.push('DLURLCOMPLETEWRITE');
        return this;
    }
    dlurlpath() {
        this.query.sql.push('DLURLPATH');
        return this;
    }
    dlurlpathonly() {
        this.query.sql.push('DLURLPATHONLY');
        return this;
    }
    dlurlpathwrite() {
        this.query.sql.push('DLURLPATHWRITE');
        return this;
    }
    dlurlscheme() {
        this.query.sql.push('DLURLSCHEME');
        return this;
    }
    dlurlserver() {
        this.query.sql.push('DLURLSERVER');
        return this;
    }
    dlvalue() {
        this.query.sql.push('DLVALUE');
        return this;
    }
    do() {
        this.query.sql.push('DO');
        return this;
    }
    document() {
        this.query.sql.push('DOCUMENT');
        return this;
    }
    domain() {
        this.query.sql.push('DOMAIN');
        return this;
    }
    double() {
        this.query.sql.push('DOUBLE');
        return this;
    }
    drop() {
        this.query.sql.push('DROP');
        return this;
    }
    dynamic() {
        this.query.sql.push('DYNAMIC');
        return this;
    }
    dynamicFunction() {
        this.query.sql.push('DYNAMIC_FUNCTION');
        return this;
    }
    dynamicfunctioncode() {
        this.query.sql.push('DYNAMIC_FUNCTION_CODE');
        return this;
    }
    each() {
        this.query.sql.push('EACH');
        return this;
    }
    element() {
        this.query.sql.push('ELEMENT');
        return this;
    }
    else() {
        this.query.sql.push('ELSE');
        return this;
    }
    empty() {
        this.query.sql.push('EMPTY');
        return this;
    }
    enable() {
        this.query.sql.push('ENABLE');
        return this;
    }
    encoding() {
        this.query.sql.push('ENCODING');
        return this;
    }
    encrypted() {
        this.query.sql.push('ENCRYPTED');
        return this;
    }
    end() {
        this.query.sql.push('END');
        return this;
    }
    endExec() {
        this.query.sql.push('END-EXEC');
        return this;
    }
    endFrame() {
        this.query.sql.push('END_FRAME');
        return this;
    }
    endPartition() {
        this.query.sql.push('END_PARTITION');
        return this;
    }
    enforced() {
        this.query.sql.push('ENFORCED');
        return this;
    }
    enum() {
        this.query.sql.push('ENUM');
        return this;
    }
    equals() {
        this.query.sql.push('EQUALS');
        return this;
    }
    error() {
        this.query.sql.push('ERROR');
        return this;
    }
    escape() {
        this.query.sql.push('ESCAPE');
        return this;
    }
    event() {
        this.query.sql.push('EVENT');
        return this;
    }
    every() {
        this.query.sql.push('EVERY');
        return this;
    }
    except() {
        this.query.sql.push('EXCEPT');
        return this;
    }
    exception() {
        this.query.sql.push('EXCEPTION');
        return this;
    }
    exclude() {
        this.query.sql.push('EXCLUDE');
        return this;
    }
    excluding() {
        this.query.sql.push('EXCLUDING');
        return this;
    }
    exclusive() {
        this.query.sql.push('EXCLUSIVE');
        return this;
    }
    execKeyword() {
        this.query.sql.push('EXEC');
        return this;
    }
    executeKeyword() {
        this.query.sql.push('EXECUTE');
        return this;
    }
    exists() {
        this.query.sql.push('EXISTS');
        return this;
    }
    exp() {
        this.query.sql.push('EXP');
        return this;
    }
    explain() {
        this.query.sql.push('EXPLAIN');
        return this;
    }
    expression() {
        this.query.sql.push('EXPRESSION');
        return this;
    }
    extension() {
        this.query.sql.push('EXTENSION');
        return this;
    }
    external() {
        this.query.sql.push('EXTERNAL');
        return this;
    }
    extract() {
        this.query.sql.push('EXTRACT');
        return this;
    }
    false() {
        this.query.sql.push('FALSE');
        return this;
    }
    family() {
        this.query.sql.push('FAMILY');
        return this;
    }
    fetch() {
        this.query.sql.push('FETCH');
        return this;
    }
    file() {
        this.query.sql.push('FILE');
        return this;
    }
    filter() {
        this.query.sql.push('FILTER');
        return this;
    }
    final() {
        this.query.sql.push('FINAL');
        return this;
    }
    finalize() {
        this.query.sql.push('FINALIZE');
        return this;
    }
    finish() {
        this.query.sql.push('FINISH');
        return this;
    }
    first() {
        this.query.sql.push('FIRST');
        return this;
    }
    firstValue() {
        this.query.sql.push('FIRST_VALUE');
        return this;
    }
    flag() {
        this.query.sql.push('FLAG');
        return this;
    }
    float() {
        this.query.sql.push('FLOAT');
        return this;
    }
    floor() {
        this.query.sql.push('FLOOR');
        return this;
    }
    following() {
        this.query.sql.push('FOLLOWING');
        return this;
    }
    for() {
        this.query.sql.push('FOR');
        return this;
    }
    force() {
        this.query.sql.push('FORCE');
        return this;
    }
    foreign() {
        this.query.sql.push('FOREIGN');
        return this;
    }
    format() {
        this.query.sql.push('FORMAT');
        return this;
    }
    fortran() {
        this.query.sql.push('FORTRAN');
        return this;
    }
    forward() {
        this.query.sql.push('FORWARD');
        return this;
    }
    found() {
        this.query.sql.push('FOUND');
        return this;
    }
    frameRow() {
        this.query.sql.push('FRAME_ROW');
        return this;
    }
    free() {
        this.query.sql.push('FREE');
        return this;
    }
    freeze() {
        this.query.sql.push('FREEZE');
        return this;
    }
    from() {
        this.query.sql.push('FROM');
        return this;
    }
    fs() {
        this.query.sql.push('FS');
        return this;
    }
    fulfill() {
        this.query.sql.push('FULFILL');
        return this;
    }
    full() {
        this.query.sql.push('FULL');
        return this;
    }
    function() {
        this.query.sql.push('FUNCTION');
        return this;
    }
    functions() {
        this.query.sql.push('FUNCTIONS');
        return this;
    }
    fusion() {
        this.query.sql.push('FUSION');
        return this;
    }
    g() {
        this.query.sql.push('G');
        return this;
    }
    general() {
        this.query.sql.push('GENERAL');
        return this;
    }
    generated() {
        this.query.sql.push('GENERATED');
        return this;
    }
    get() {
        this.query.sql.push('GET');
        return this;
    }
    global() {
        this.query.sql.push('GLOBAL');
        return this;
    }
    go() {
        this.query.sql.push('GO');
        return this;
    }
    goto() {
        this.query.sql.push('GOTO');
        return this;
    }
    grant() {
        this.query.sql.push('GRANT');
        return this;
    }
    granted() {
        this.query.sql.push('GRANTED');
        return this;
    }
    greatest() {
        this.query.sql.push('GREATEST');
        return this;
    }
    group() {
        this.query.sql.push('GROUP');
        return this;
    }
    grouping() {
        this.query.sql.push('GROUPING');
        return this;
    }
    groups() {
        this.query.sql.push('GROUPS');
        return this;
    }
    handler() {
        this.query.sql.push('HANDLER');
        return this;
    }
    having() {
        this.query.sql.push('HAVING');
        return this;
    }
    header() {
        this.query.sql.push('HEADER');
        return this;
    }
    hex() {
        this.query.sql.push('HEX');
        return this;
    }
    hierarchy() {
        this.query.sql.push('HIERARCHY');
        return this;
    }
    hold() {
        this.query.sql.push('HOLD');
        return this;
    }
    hour() {
        this.query.sql.push('HOUR');
        return this;
    }
    id() {
        this.query.sql.push('ID');
        return this;
    }
    identity() {
        this.query.sql.push('IDENTITY');
        return this;
    }
    if() {
        this.query.sql.push('IF');
        return this;
    }
    ignore() {
        this.query.sql.push('IGNORE');
        return this;
    }
    ilike() {
        this.query.sql.push('ILIKE');
        return this;
    }
    immediate() {
        this.query.sql.push('IMMEDIATE');
        return this;
    }
    immediately() {
        this.query.sql.push('IMMEDIATELY');
        return this;
    }
    immutable() {
        this.query.sql.push('IMMUTABLE');
        return this;
    }
    implementation() {
        this.query.sql.push('IMPLEMENTATION');
        return this;
    }
    implicit() {
        this.query.sql.push('IMPLICIT');
        return this;
    }
    import() {
        this.query.sql.push('IMPORT');
        return this;
    }
    in() {
        this.query.sql.push('IN');
        return this;
    }
    include() {
        this.query.sql.push('INCLUDE');
        return this;
    }
    including() {
        this.query.sql.push('INCLUDING');
        return this;
    }
    increment() {
        this.query.sql.push('INCREMENT');
        return this;
    }
    indent() {
        this.query.sql.push('INDENT');
        return this;
    }
    index() {
        this.query.sql.push('INDEX');
        return this;
    }
    indexes() {
        this.query.sql.push('INDEXES');
        return this;
    }
    indicator() {
        this.query.sql.push('INDICATOR');
        return this;
    }
    inherit() {
        this.query.sql.push('INHERIT');
        return this;
    }
    inherits() {
        this.query.sql.push('INHERITS');
        return this;
    }
    initial() {
        this.query.sql.push('INITIAL');
        return this;
    }
    initially() {
        this.query.sql.push('INITIALLY');
        return this;
    }
    inline() {
        this.query.sql.push('INLINE');
        return this;
    }
    inner() {
        this.query.sql.push('INNER');
        return this;
    }
    inout() {
        this.query.sql.push('INOUT');
        return this;
    }
    input() {
        this.query.sql.push('INPUT');
        return this;
    }
    insensitive() {
        this.query.sql.push('INSENSITIVE');
        return this;
    }
    insert() {
        this.query.sql.push('INSERT');
        return this;
    }
    instance() {
        this.query.sql.push('INSTANCE');
        return this;
    }
    instantiable() {
        this.query.sql.push('INSTANTIABLE');
        return this;
    }
    instead() {
        this.query.sql.push('INSTEAD');
        return this;
    }
    int() {
        this.query.sql.push('INT');
        return this;
    }
    integer() {
        this.query.sql.push('INTEGER');
        return this;
    }
    integrity() {
        this.query.sql.push('INTEGRITY');
        return this;
    }
    intersect() {
        this.query.sql.push('INTERSECT');
        return this;
    }
    intersection() {
        this.query.sql.push('INTERSECTION');
        return this;
    }
    interval() {
        this.query.sql.push('INTERVAL');
        return this;
    }
    into() {
        this.query.sql.push('INTO');
        return this;
    }
    invoker() {
        this.query.sql.push('INVOKER');
        return this;
    }
    is() {
        this.query.sql.push('IS');
        return this;
    }
    isnull() {
        this.query.sql.push('ISNULL');
        return this;
    }
    isolation() {
        this.query.sql.push('ISOLATION');
        return this;
    }
    join() {
        this.query.sql.push('JOIN');
        return this;
    }
    json() {
        this.query.sql.push('JSON');
        return this;
    }
    jsonArray() {
        this.query.sql.push('JSON_ARRAY');
        return this;
    }
    jsonArrayagg() {
        this.query.sql.push('JSON_ARRAYAGG');
        return this;
    }
    jsonExists() {
        this.query.sql.push('JSON_EXISTS');
        return this;
    }
    jsonObject() {
        this.query.sql.push('JSON_OBJECT');
        return this;
    }
    jsonObjectagg() {
        this.query.sql.push('JSON_OBJECTAGG');
        return this;
    }
    jsonQuery() {
        this.query.sql.push('JSON_QUERY');
        return this;
    }
    jsonScalar() {
        this.query.sql.push('JSON_SCALAR');
        return this;
    }
    jsonSerialize() {
        this.query.sql.push('JSON_SERIALIZE');
        return this;
    }
    jsonTable() {
        this.query.sql.push('JSON_TABLE');
        return this;
    }
    jsonTablePrimitive() {
        this.query.sql.push('JSON_TABLE_PRIMITIVE');
        return this;
    }
    jsonValue() {
        this.query.sql.push('JSON_VALUE');
        return this;
    }
    k() {
        this.query.sql.push('K');
        return this;
    }
    keep() {
        this.query.sql.push('KEEP');
        return this;
    }
    key() {
        this.query.sql.push('KEY');
        return this;
    }
    keys() {
        this.query.sql.push('KEYS');
        return this;
    }
    keyMember() {
        this.query.sql.push('KEY_MEMBER');
        return this;
    }
    keyType() {
        this.query.sql.push('KEY_TYPE');
        return this;
    }
    label() {
        this.query.sql.push('LABEL');
        return this;
    }
    lag() {
        this.query.sql.push('LAG');
        return this;
    }
    language() {
        this.query.sql.push('LANGUAGE');
        return this;
    }
    large() {
        this.query.sql.push('LARGE');
        return this;
    }
    last() {
        this.query.sql.push('LAST');
        return this;
    }
    lastValue() {
        this.query.sql.push('LAST_VALUE');
        return this;
    }
    lateral() {
        this.query.sql.push('LATERAL');
        return this;
    }
    lead() {
        this.query.sql.push('LEAD');
        return this;
    }
    leading() {
        this.query.sql.push('LEADING');
        return this;
    }
    leakproof() {
        this.query.sql.push('LEAKPROOF');
        return this;
    }
    least() {
        this.query.sql.push('LEAST');
        return this;
    }
    left() {
        this.query.sql.push('LEFT');
        return this;
    }
    length() {
        this.query.sql.push('LENGTH');
        return this;
    }
    level() {
        this.query.sql.push('LEVEL');
        return this;
    }
    library() {
        this.query.sql.push('LIBRARY');
        return this;
    }
    like() {
        this.query.sql.push('LIKE');
        return this;
    }
    likeRegex() {
        this.query.sql.push('LIKE_REGEX');
        return this;
    }
    limit() {
        this.query.sql.push('LIMIT');
        return this;
    }
    link() {
        this.query.sql.push('LINK');
        return this;
    }
    listagg() {
        this.query.sql.push('LISTAGG');
        return this;
    }
    listen() {
        this.query.sql.push('LISTEN');
        return this;
    }
    ln() {
        this.query.sql.push('LN');
        return this;
    }
    load() {
        this.query.sql.push('LOAD');
        return this;
    }
    local() {
        this.query.sql.push('LOCAL');
        return this;
    }
    localtime() {
        this.query.sql.push('LOCALTIME');
        return this;
    }
    localtimestamp() {
        this.query.sql.push('LOCALTIMESTAMP');
        return this;
    }
    location() {
        this.query.sql.push('LOCATION');
        return this;
    }
    locator() {
        this.query.sql.push('LOCATOR');
        return this;
    }
    lock() {
        this.query.sql.push('LOCK');
        return this;
    }
    locked() {
        this.query.sql.push('LOCKED');
        return this;
    }
    log() {
        this.query.sql.push('LOG');
        return this;
    }
    log10() {
        this.query.sql.push('LOG10');
        return this;
    }
    logged() {
        this.query.sql.push('LOGGED');
        return this;
    }
    lower() {
        this.query.sql.push('LOWER');
        return this;
    }
    lpad() {
        this.query.sql.push('LPAD');
        return this;
    }
    ltrim() {
        this.query.sql.push('LTRIM');
        return this;
    }
    m() {
        this.query.sql.push('M');
        return this;
    }
    map() {
        this.query.sql.push('MAP');
        return this;
    }
    mapping() {
        this.query.sql.push('MAPPING');
        return this;
    }
    match() {
        this.query.sql.push('MATCH');
        return this;
    }
    matched() {
        this.query.sql.push('MATCHED');
        return this;
    }
    matches() {
        this.query.sql.push('MATCHES');
        return this;
    }
    matchNumber() {
        this.query.sql.push('MATCH_NUMBER');
        return this;
    }
    matchRecognize() {
        this.query.sql.push('MATCH_RECOGNIZE');
        return this;
    }
    materialized() {
        this.query.sql.push('MATERIALIZED');
        return this;
    }
    max() {
        this.query.sql.push('MAX');
        return this;
    }
    maxvalue() {
        this.query.sql.push('MAXVALUE');
        return this;
    }
    measures() {
        this.query.sql.push('MEASURES');
        return this;
    }
    member() {
        this.query.sql.push('MEMBER');
        return this;
    }
    merge() {
        this.query.sql.push('MERGE');
        return this;
    }
    mergeAction() {
        this.query.sql.push('MERGE_ACTION');
        return this;
    }
    messageLength() {
        this.query.sql.push('MESSAGE_LENGTH');
        return this;
    }
    messageOctetLength() {
        this.query.sql.push('MESSAGE_OCTET_LENGTH');
        return this;
    }
    messageText() {
        this.query.sql.push('MESSAGE_TEXT');
        return this;
    }
    method() {
        this.query.sql.push('METHOD');
        return this;
    }
    min() {
        this.query.sql.push('MIN');
        return this;
    }
    minute() {
        this.query.sql.push('MINUTE');
        return this;
    }
    minvalue() {
        this.query.sql.push('MINVALUE');
        return this;
    }
    mod() {
        this.query.sql.push('MOD');
        return this;
    }
    mode() {
        this.query.sql.push('MODE');
        return this;
    }
    modifies() {
        this.query.sql.push('MODIFIES');
        return this;
    }
    module() {
        this.query.sql.push('MODULE');
        return this;
    }
    month() {
        this.query.sql.push('MONTH');
        return this;
    }
    more() {
        this.query.sql.push('MORE');
        return this;
    }
    move() {
        this.query.sql.push('MOVE');
        return this;
    }
    multiset() {
        this.query.sql.push('MULTISET');
        return this;
    }
    mumps() {
        this.query.sql.push('MUMPS');
        return this;
    }
    name() {
        this.query.sql.push('NAME');
        return this;
    }
    names() {
        this.query.sql.push('NAMES');
        return this;
    }
    namespace() {
        this.query.sql.push('NAMESPACE');
        return this;
    }
    national() {
        this.query.sql.push('NATIONAL');
        return this;
    }
    natural() {
        this.query.sql.push('NATURAL');
        return this;
    }
    nchar() {
        this.query.sql.push('NCHAR');
        return this;
    }
    nclob() {
        this.query.sql.push('NCLOB');
        return this;
    }
    nested() {
        this.query.sql.push('NESTED');
        return this;
    }
    nesting() {
        this.query.sql.push('NESTING');
        return this;
    }
    new() {
        this.query.sql.push('NEW');
        return this;
    }
    next() {
        this.query.sql.push('NEXT');
        return this;
    }
    nfc() {
        this.query.sql.push('NFC');
        return this;
    }
    nfd() {
        this.query.sql.push('NFD');
        return this;
    }
    nfkc() {
        this.query.sql.push('NFKC');
        return this;
    }
    nfkd() {
        this.query.sql.push('NFKD');
        return this;
    }
    nil() {
        this.query.sql.push('NIL');
        return this;
    }
    no() {
        this.query.sql.push('NO');
        return this;
    }
    none() {
        this.query.sql.push('NONE');
        return this;
    }
    normalize() {
        this.query.sql.push('NORMALIZE');
        return this;
    }
    normalized() {
        this.query.sql.push('NORMALIZED');
        return this;
    }
    not() {
        this.query.sql.push('NOT');
        return this;
    }
    nothing() {
        this.query.sql.push('NOTHING');
        return this;
    }
    notify() {
        this.query.sql.push('NOTIFY');
        return this;
    }
    notnull() {
        this.query.sql.push('NOTNULL');
        return this;
    }
    nowait() {
        this.query.sql.push('NOWAIT');
        return this;
    }
    nthValue() {
        this.query.sql.push('NTH_VALUE');
        return this;
    }
    ntile() {
        this.query.sql.push('NTILE');
        return this;
    }
    null() {
        this.query.sql.push('NULL');
        return this;
    }
    nullable() {
        this.query.sql.push('NULLABLE');
        return this;
    }
    nullif() {
        this.query.sql.push('NULLIF');
        return this;
    }
    nulls() {
        this.query.sql.push('NULLS');
        return this;
    }
    nullOrdering() {
        this.query.sql.push('NULL_ORDERING');
        return this;
    }
    number() {
        this.query.sql.push('NUMBER');
        return this;
    }
    numeric() {
        this.query.sql.push('NUMERIC');
        return this;
    }
    object() {
        this.query.sql.push('OBJECT');
        return this;
    }
    objects() {
        this.query.sql.push('OBJECTS');
        return this;
    }
    occurrence() {
        this.query.sql.push('OCCURRENCE');
        return this;
    }
    occurrencesRegex() {
        this.query.sql.push('OCCURRENCES_REGEX');
        return this;
    }
    octets() {
        this.query.sql.push('OCTETS');
        return this;
    }
    octetLength() {
        this.query.sql.push('OCTET_LENGTH');
        return this;
    }
    of() {
        this.query.sql.push('OF');
        return this;
    }
    off() {
        this.query.sql.push('OFF');
        return this;
    }
    offset() {
        this.query.sql.push('OFFSET');
        return this;
    }
    oids() {
        this.query.sql.push('OIDS');
        return this;
    }
    old() {
        this.query.sql.push('OLD');
        return this;
    }
    omit() {
        this.query.sql.push('OMIT');
        return this;
    }
    on() {
        this.query.sql.push('ON');
        return this;
    }
    one() {
        this.query.sql.push('ONE');
        return this;
    }
    only() {
        this.query.sql.push('ONLY');
        return this;
    }
    open() {
        this.query.sql.push('OPEN');
        return this;
    }
    operator() {
        this.query.sql.push('OPERATOR');
        return this;
    }
    option() {
        this.query.sql.push('OPTION');
        return this;
    }
    options() {
        this.query.sql.push('OPTIONS');
        return this;
    }
    or() {
        this.query.sql.push('OR');
        return this;
    }
    order() {
        this.query.sql.push('ORDER');
        return this;
    }
    ordering() {
        this.query.sql.push('ORDERING');
        return this;
    }
    ordinality() {
        this.query.sql.push('ORDINALITY');
        return this;
    }
    others() {
        this.query.sql.push('OTHERS');
        return this;
    }
    out() {
        this.query.sql.push('OUT');
        return this;
    }
    outer() {
        this.query.sql.push('OUTER');
        return this;
    }
    output() {
        this.query.sql.push('OUTPUT');
        return this;
    }
    over() {
        this.query.sql.push('OVER');
        return this;
    }
    overflow() {
        this.query.sql.push('OVERFLOW');
        return this;
    }
    overlaps() {
        this.query.sql.push('OVERLAPS');
        return this;
    }
    overlay() {
        this.query.sql.push('OVERLAY');
        return this;
    }
    overriding() {
        this.query.sql.push('OVERRIDING');
        return this;
    }
    owned() {
        this.query.sql.push('OWNED');
        return this;
    }
    owner() {
        this.query.sql.push('OWNER');
        return this;
    }
    p() {
        this.query.sql.push('P');
        return this;
    }
    pad() {
        this.query.sql.push('PAD');
        return this;
    }
    parallel() {
        this.query.sql.push('PARALLEL');
        return this;
    }
    parameter() {
        this.query.sql.push('PARAMETER');
        return this;
    }
    parameterMode() {
        this.query.sql.push('PARAMETER_MODE');
        return this;
    }
    parameterName() {
        this.query.sql.push('PARAMETER_NAME');
        return this;
    }
    parameterordinalposition() {
        this.query.sql.push('PARAMETER_ORDINAL_POSITION');
        return this;
    }
    parameterspecificcatalog() {
        this.query.sql.push('PARAMETER_SPECIFIC_CATALOG');
        return this;
    }
    parameterspecificname() {
        this.query.sql.push('PARAMETER_SPECIFIC_NAME');
        return this;
    }
    parameterspecificschema() {
        this.query.sql.push('PARAMETER_SPECIFIC_SCHEMA');
        return this;
    }
    parser() {
        this.query.sql.push('PARSER');
        return this;
    }
    partial() {
        this.query.sql.push('PARTIAL');
        return this;
    }
    partition() {
        this.query.sql.push('PARTITION');
        return this;
    }
    pascal() {
        this.query.sql.push('PASCAL');
        return this;
    }
    pass() {
        this.query.sql.push('PASS');
        return this;
    }
    passing() {
        this.query.sql.push('PASSING');
        return this;
    }
    passthrough() {
        this.query.sql.push('PASSTHROUGH');
        return this;
    }
    password() {
        this.query.sql.push('PASSWORD');
        return this;
    }
    past() {
        this.query.sql.push('PAST');
        return this;
    }
    path() {
        this.query.sql.push('PATH');
        return this;
    }
    pattern() {
        this.query.sql.push('PATTERN');
        return this;
    }
    per() {
        this.query.sql.push('PER');
        return this;
    }
    percent() {
        this.query.sql.push('PERCENT');
        return this;
    }
    percentileCont() {
        this.query.sql.push('PERCENTILE_CONT');
        return this;
    }
    percentileDisc() {
        this.query.sql.push('PERCENTILE_DISC');
        return this;
    }
    percentRank() {
        this.query.sql.push('PERCENT_RANK');
        return this;
    }
    period() {
        this.query.sql.push('PERIOD');
        return this;
    }
    permission() {
        this.query.sql.push('PERMISSION');
        return this;
    }
    permute() {
        this.query.sql.push('PERMUTE');
        return this;
    }
    pipe() {
        this.query.sql.push('PIPE');
        return this;
    }
    placing() {
        this.query.sql.push('PLACING');
        return this;
    }
    plan() {
        this.query.sql.push('PLAN');
        return this;
    }
    plans() {
        this.query.sql.push('PLANS');
        return this;
    }
    pli() {
        this.query.sql.push('PLI');
        return this;
    }
    policy() {
        this.query.sql.push('POLICY');
        return this;
    }
    portion() {
        this.query.sql.push('PORTION');
        return this;
    }
    position() {
        this.query.sql.push('POSITION');
        return this;
    }
    positionRegex() {
        this.query.sql.push('POSITION_REGEX');
        return this;
    }
    power() {
        this.query.sql.push('POWER');
        return this;
    }
    precedes() {
        this.query.sql.push('PRECEDES');
        return this;
    }
    preceding() {
        this.query.sql.push('PRECEDING');
        return this;
    }
    precision() {
        this.query.sql.push('PRECISION');
        return this;
    }
    prepare() {
        this.query.sql.push('PREPARE');
        return this;
    }
    prepared() {
        this.query.sql.push('PREPARED');
        return this;
    }
    preserve() {
        this.query.sql.push('PRESERVE');
        return this;
    }
    prev() {
        this.query.sql.push('PREV');
        return this;
    }
    primary() {
        this.query.sql.push('PRIMARY');
        return this;
    }
    prior() {
        this.query.sql.push('PRIOR');
        return this;
    }
    private() {
        this.query.sql.push('PRIVATE');
        return this;
    }
    privileges() {
        this.query.sql.push('PRIVILEGES');
        return this;
    }
    procedural() {
        this.query.sql.push('PROCEDURAL');
        return this;
    }
    procedure() {
        this.query.sql.push('PROCEDURE');
        return this;
    }
    procedures() {
        this.query.sql.push('PROCEDURES');
        return this;
    }
    program() {
        this.query.sql.push('PROGRAM');
        return this;
    }
    prune() {
        this.query.sql.push('PRUNE');
        return this;
    }
    ptf() {
        this.query.sql.push('PTF');
        return this;
    }
    public() {
        this.query.sql.push('PUBLIC');
        return this;
    }
    publication() {
        this.query.sql.push('PUBLICATION');
        return this;
    }
    quote() {
        this.query.sql.push('QUOTE');
        return this;
    }
    quotes() {
        this.query.sql.push('QUOTES');
        return this;
    }
    range() {
        this.query.sql.push('RANGE');
        return this;
    }
    rank() {
        this.query.sql.push('RANK');
        return this;
    }
    read() {
        this.query.sql.push('READ');
        return this;
    }
    reads() {
        this.query.sql.push('READS');
        return this;
    }
    real() {
        this.query.sql.push('REAL');
        return this;
    }
    reassign() {
        this.query.sql.push('REASSIGN');
        return this;
    }
    recovery() {
        this.query.sql.push('RECOVERY');
        return this;
    }
    recursive() {
        this.query.sql.push('RECURSIVE');
        return this;
    }
    ref() {
        this.query.sql.push('REF');
        return this;
    }
    references() {
        this.query.sql.push('REFERENCES');
        return this;
    }
    referencing() {
        this.query.sql.push('REFERENCING');
        return this;
    }
    refresh() {
        this.query.sql.push('REFRESH');
        return this;
    }
    regrAvgx() {
        this.query.sql.push('REGR_AVGX');
        return this;
    }
    regrAvgy() {
        this.query.sql.push('REGR_AVGY');
        return this;
    }
    regrCount() {
        this.query.sql.push('REGR_COUNT');
        return this;
    }
    regrIntercept() {
        this.query.sql.push('REGR_INTERCEPT');
        return this;
    }
    regrR2() {
        this.query.sql.push('REGR_R2');
        return this;
    }
    regrSlope() {
        this.query.sql.push('REGR_SLOPE');
        return this;
    }
    regrSxx() {
        this.query.sql.push('REGR_SXX');
        return this;
    }
    regrSxy() {
        this.query.sql.push('REGR_SXY');
        return this;
    }
    regrSyy() {
        this.query.sql.push('REGR_SYY');
        return this;
    }
    reindex() {
        this.query.sql.push('REINDEX');
        return this;
    }
    relative() {
        this.query.sql.push('RELATIVE');
        return this;
    }
    release() {
        this.query.sql.push('RELEASE');
        return this;
    }
    rename() {
        this.query.sql.push('RENAME');
        return this;
    }
    repeatable() {
        this.query.sql.push('REPEATABLE');
        return this;
    }
    replace() {
        this.query.sql.push('REPLACE');
        return this;
    }
    replica() {
        this.query.sql.push('REPLICA');
        return this;
    }
    requiring() {
        this.query.sql.push('REQUIRING');
        return this;
    }
    reset() {
        this.query.sql.push('RESET');
        return this;
    }
    respect() {
        this.query.sql.push('RESPECT');
        return this;
    }
    restart() {
        this.query.sql.push('RESTART');
        return this;
    }
    restore() {
        this.query.sql.push('RESTORE');
        return this;
    }
    restrict() {
        this.query.sql.push('RESTRICT');
        return this;
    }
    result() {
        this.query.sql.push('RESULT');
        return this;
    }
    return() {
        this.query.sql.push('RETURN');
        return this;
    }
    returnedCardinality() {
        this.query.sql.push('RETURNED_CARDINALITY');
        return this;
    }
    returnedLength() {
        this.query.sql.push('RETURNED_LENGTH');
        return this;
    }
    returnedoctetlength() {
        this.query.sql.push('RETURNED_OCTET_LENGTH');
        return this;
    }
    returnedSqlstate() {
        this.query.sql.push('RETURNED_SQLSTATE');
        return this;
    }
    returning() {
        this.query.sql.push('RETURNING');
        return this;
    }
    returns() {
        this.query.sql.push('RETURNS');
        return this;
    }
    revoke() {
        this.query.sql.push('REVOKE');
        return this;
    }
    right() {
        this.query.sql.push('RIGHT');
        return this;
    }
    role() {
        this.query.sql.push('ROLE');
        return this;
    }
    rollback() {
        this.query.sql.push('ROLLBACK');
        return this;
    }
    rollup() {
        this.query.sql.push('ROLLUP');
        return this;
    }
    routine() {
        this.query.sql.push('ROUTINE');
        return this;
    }
    routines() {
        this.query.sql.push('ROUTINES');
        return this;
    }
    routineCatalog() {
        this.query.sql.push('ROUTINE_CATALOG');
        return this;
    }
    routineName() {
        this.query.sql.push('ROUTINE_NAME');
        return this;
    }
    routineSchema() {
        this.query.sql.push('ROUTINE_SCHEMA');
        return this;
    }
    row() {
        this.query.sql.push('ROW');
        return this;
    }
    rows() {
        this.query.sql.push('ROWS');
        return this;
    }
    rowCount() {
        this.query.sql.push('ROW_COUNT');
        return this;
    }
    rowNumber() {
        this.query.sql.push('ROW_NUMBER');
        return this;
    }
    rpad() {
        this.query.sql.push('RPAD');
        return this;
    }
    rtrim() {
        this.query.sql.push('RTRIM');
        return this;
    }
    rule() {
        this.query.sql.push('RULE');
        return this;
    }
    running() {
        this.query.sql.push('RUNNING');
        return this;
    }
    savepoint() {
        this.query.sql.push('SAVEPOINT');
        return this;
    }
    scalar() {
        this.query.sql.push('SCALAR');
        return this;
    }
    scale() {
        this.query.sql.push('SCALE');
        return this;
    }
    schema() {
        this.query.sql.push('SCHEMA');
        return this;
    }
    schemas() {
        this.query.sql.push('SCHEMAS');
        return this;
    }
    schemaName() {
        this.query.sql.push('SCHEMA_NAME');
        return this;
    }
    scope() {
        this.query.sql.push('SCOPE');
        return this;
    }
    scopeCatalog() {
        this.query.sql.push('SCOPE_CATALOG');
        return this;
    }
    scopeName() {
        this.query.sql.push('SCOPE_NAME');
        return this;
    }
    scopeSchema() {
        this.query.sql.push('SCOPE_SCHEMA');
        return this;
    }
    scroll() {
        this.query.sql.push('SCROLL');
        return this;
    }
    search() {
        this.query.sql.push('SEARCH');
        return this;
    }
    second() {
        this.query.sql.push('SECOND');
        return this;
    }
    section() {
        this.query.sql.push('SECTION');
        return this;
    }
    security() {
        this.query.sql.push('SECURITY');
        return this;
    }
    seek() {
        this.query.sql.push('SEEK');
        return this;
    }
    select() {
        this.query.sql.push('SELECT');
        return this;
    }
    selective() {
        this.query.sql.push('SELECTIVE');
        return this;
    }
    self() {
        this.query.sql.push('SELF');
        return this;
    }
    semantics() {
        this.query.sql.push('SEMANTICS');
        return this;
    }
    sensitive() {
        this.query.sql.push('SENSITIVE');
        return this;
    }
    sequence() {
        this.query.sql.push('SEQUENCE');
        return this;
    }
    sequences() {
        this.query.sql.push('SEQUENCES');
        return this;
    }
    serializable() {
        this.query.sql.push('SERIALIZABLE');
        return this;
    }
    server() {
        this.query.sql.push('SERVER');
        return this;
    }
    serverName() {
        this.query.sql.push('SERVER_NAME');
        return this;
    }
    session() {
        this.query.sql.push('SESSION');
        return this;
    }
    sessionUser() {
        this.query.sql.push('SESSION_USER');
        return this;
    }
    set() {
        this.query.sql.push('SET');
        return this;
    }
    setof() {
        this.query.sql.push('SETOF');
        return this;
    }
    sets() {
        this.query.sql.push('SETS');
        return this;
    }
    share() {
        this.query.sql.push('SHARE');
        return this;
    }
    show() {
        this.query.sql.push('SHOW');
        return this;
    }
    similar() {
        this.query.sql.push('SIMILAR');
        return this;
    }
    simple() {
        this.query.sql.push('SIMPLE');
        return this;
    }
    sin() {
        this.query.sql.push('SIN');
        return this;
    }
    sinh() {
        this.query.sql.push('SINH');
        return this;
    }
    size() {
        this.query.sql.push('SIZE');
        return this;
    }
    skip() {
        this.query.sql.push('SKIP');
        return this;
    }
    smallint() {
        this.query.sql.push('SMALLINT');
        return this;
    }
    snapshot() {
        this.query.sql.push('SNAPSHOT');
        return this;
    }
    some() {
        this.query.sql.push('SOME');
        return this;
    }
    sortDirection() {
        this.query.sql.push('SORT_DIRECTION');
        return this;
    }
    source() {
        this.query.sql.push('SOURCE');
        return this;
    }
    space() {
        this.query.sql.push('SPACE');
        return this;
    }
    specific() {
        this.query.sql.push('SPECIFIC');
        return this;
    }
    specifictype() {
        this.query.sql.push('SPECIFICTYPE');
        return this;
    }
    specificName() {
        this.query.sql.push('SPECIFIC_NAME');
        return this;
    }
    sql() {
        this.query.sql.push('SQL');
        return this;
    }
    sqlcode() {
        this.query.sql.push('SQLCODE');
        return this;
    }
    sqlerror() {
        this.query.sql.push('SQLERROR');
        return this;
    }
    sqlexception() {
        this.query.sql.push('SQLEXCEPTION');
        return this;
    }
    sqlstate() {
        this.query.sql.push('SQLSTATE');
        return this;
    }
    sqlwarning() {
        this.query.sql.push('SQLWARNING');
        return this;
    }
    sqrt() {
        this.query.sql.push('SQRT');
        return this;
    }
    stable() {
        this.query.sql.push('STABLE');
        return this;
    }
    standalone() {
        this.query.sql.push('STANDALONE');
        return this;
    }
    start() {
        this.query.sql.push('START');
        return this;
    }
    state() {
        this.query.sql.push('STATE');
        return this;
    }
    statement() {
        this.query.sql.push('STATEMENT');
        return this;
    }
    static() {
        this.query.sql.push('STATIC');
        return this;
    }
    statistics() {
        this.query.sql.push('STATISTICS');
        return this;
    }
    stddevPop() {
        this.query.sql.push('STDDEV_POP');
        return this;
    }
    stddevSamp() {
        this.query.sql.push('STDDEV_SAMP');
        return this;
    }
    stdin() {
        this.query.sql.push('STDIN');
        return this;
    }
    stdout() {
        this.query.sql.push('STDOUT');
        return this;
    }
    storage() {
        this.query.sql.push('STORAGE');
        return this;
    }
    stored() {
        this.query.sql.push('STORED');
        return this;
    }
    strict() {
        this.query.sql.push('STRICT');
        return this;
    }
    string() {
        this.query.sql.push('STRING');
        return this;
    }
    strip() {
        this.query.sql.push('STRIP');
        return this;
    }
    structure() {
        this.query.sql.push('STRUCTURE');
        return this;
    }
    style() {
        this.query.sql.push('STYLE');
        return this;
    }
    subclassOrigin() {
        this.query.sql.push('SUBCLASS_ORIGIN');
        return this;
    }
    submultiset() {
        this.query.sql.push('SUBMULTISET');
        return this;
    }
    subscription() {
        this.query.sql.push('SUBSCRIPTION');
        return this;
    }
    subset() {
        this.query.sql.push('SUBSET');
        return this;
    }
    substring() {
        this.query.sql.push('SUBSTRING');
        return this;
    }
    substringRegex() {
        this.query.sql.push('SUBSTRING_REGEX');
        return this;
    }
    succeeds() {
        this.query.sql.push('SUCCEEDS');
        return this;
    }
    sum() {
        this.query.sql.push('SUM');
        return this;
    }
    support() {
        this.query.sql.push('SUPPORT');
        return this;
    }
    symmetric() {
        this.query.sql.push('SYMMETRIC');
        return this;
    }
    sysid() {
        this.query.sql.push('SYSID');
        return this;
    }
    system() {
        this.query.sql.push('SYSTEM');
        return this;
    }
    systemTime() {
        this.query.sql.push('SYSTEM_TIME');
        return this;
    }
    systemUser() {
        this.query.sql.push('SYSTEM_USER');
        return this;
    }
    t() {
        this.query.sql.push('T');
        return this;
    }
    table() {
        this.query.sql.push('TABLE');
        return this;
    }
    tables() {
        this.query.sql.push('TABLES');
        return this;
    }
    tablesample() {
        this.query.sql.push('TABLESAMPLE');
        return this;
    }
    tablespace() {
        this.query.sql.push('TABLESPACE');
        return this;
    }
    tableName() {
        this.query.sql.push('TABLE_NAME');
        return this;
    }
    tan() {
        this.query.sql.push('TAN');
        return this;
    }
    tanh() {
        this.query.sql.push('TANH');
        return this;
    }
    target() {
        this.query.sql.push('TARGET');
        return this;
    }
    temp() {
        this.query.sql.push('TEMP');
        return this;
    }
    template() {
        this.query.sql.push('TEMPLATE');
        return this;
    }
    temporary() {
        this.query.sql.push('TEMPORARY');
        return this;
    }
    text() {
        this.query.sql.push('TEXT');
        return this;
    }
    then() {
        this.query.sql.push('THEN');
        return this;
    }
    through() {
        this.query.sql.push('THROUGH');
        return this;
    }
    ties() {
        this.query.sql.push('TIES');
        return this;
    }
    time() {
        this.query.sql.push('TIME');
        return this;
    }
    timestamp() {
        this.query.sql.push('TIMESTAMP');
        return this;
    }
    timezoneHour() {
        this.query.sql.push('TIMEZONE_HOUR');
        return this;
    }
    timezoneMinute() {
        this.query.sql.push('TIMEZONE_MINUTE');
        return this;
    }
    to() {
        this.query.sql.push('TO');
        return this;
    }
    token() {
        this.query.sql.push('TOKEN');
        return this;
    }
    topLevelCount() {
        this.query.sql.push('TOP_LEVEL_COUNT');
        return this;
    }
    trailing() {
        this.query.sql.push('TRAILING');
        return this;
    }
    transaction() {
        this.query.sql.push('TRANSACTION');
        return this;
    }
    transactionscommitted() {
        this.query.sql.push('TRANSACTIONS_COMMITTED');
        return this;
    }
    transactionsrolledback() {
        this.query.sql.push('TRANSACTIONS_ROLLED_BACK');
        return this;
    }
    transactionActive() {
        this.query.sql.push('TRANSACTION_ACTIVE');
        return this;
    }
    transform() {
        this.query.sql.push('TRANSFORM');
        return this;
    }
    transforms() {
        this.query.sql.push('TRANSFORMS');
        return this;
    }
    translate() {
        this.query.sql.push('TRANSLATE');
        return this;
    }
    translateRegex() {
        this.query.sql.push('TRANSLATE_REGEX');
        return this;
    }
    translation() {
        this.query.sql.push('TRANSLATION');
        return this;
    }
    treat() {
        this.query.sql.push('TREAT');
        return this;
    }
    trigger() {
        this.query.sql.push('TRIGGER');
        return this;
    }
    triggerCatalog() {
        this.query.sql.push('TRIGGER_CATALOG');
        return this;
    }
    triggerName() {
        this.query.sql.push('TRIGGER_NAME');
        return this;
    }
    triggerSchema() {
        this.query.sql.push('TRIGGER_SCHEMA');
        return this;
    }
    trim() {
        this.query.sql.push('TRIM');
        return this;
    }
    trimArray() {
        this.query.sql.push('TRIM_ARRAY');
        return this;
    }
    true() {
        this.query.sql.push('TRUE');
        return this;
    }
    truncate() {
        this.query.sql.push('TRUNCATE');
        return this;
    }
    trusted() {
        this.query.sql.push('TRUSTED');
        return this;
    }
    type() {
        this.query.sql.push('TYPE');
        return this;
    }
    types() {
        this.query.sql.push('TYPES');
        return this;
    }
    uescape() {
        this.query.sql.push('UESCAPE');
        return this;
    }
    unbounded() {
        this.query.sql.push('UNBOUNDED');
        return this;
    }
    uncommitted() {
        this.query.sql.push('UNCOMMITTED');
        return this;
    }
    unconditional() {
        this.query.sql.push('UNCONDITIONAL');
        return this;
    }
    under() {
        this.query.sql.push('UNDER');
        return this;
    }
    unencrypted() {
        this.query.sql.push('UNENCRYPTED');
        return this;
    }
    union() {
        this.query.sql.push('UNION');
        return this;
    }
    unique() {
        this.query.sql.push('UNIQUE');
        return this;
    }
    unknown() {
        this.query.sql.push('UNKNOWN');
        return this;
    }
    unlink() {
        this.query.sql.push('UNLINK');
        return this;
    }
    unlisten() {
        this.query.sql.push('UNLISTEN');
        return this;
    }
    unlogged() {
        this.query.sql.push('UNLOGGED');
        return this;
    }
    unmatched() {
        this.query.sql.push('UNMATCHED');
        return this;
    }
    unnamed() {
        this.query.sql.push('UNNAMED');
        return this;
    }
    unnest() {
        this.query.sql.push('UNNEST');
        return this;
    }
    until() {
        this.query.sql.push('UNTIL');
        return this;
    }
    untyped() {
        this.query.sql.push('UNTYPED');
        return this;
    }
    update() {
        this.query.sql.push('UPDATE');
        return this;
    }
    upper() {
        this.query.sql.push('UPPER');
        return this;
    }
    uri() {
        this.query.sql.push('URI');
        return this;
    }
    usage() {
        this.query.sql.push('USAGE');
        return this;
    }
    user() {
        this.query.sql.push('USER');
        return this;
    }
    userdefinedtypecatalog() {
        this.query.sql.push('USER_DEFINED_TYPE_CATALOG');
        return this;
    }
    userdefinedtypecode() {
        this.query.sql.push('USER_DEFINED_TYPE_CODE');
        return this;
    }
    userdefinedtypename() {
        this.query.sql.push('USER_DEFINED_TYPE_NAME');
        return this;
    }
    userdefinedtypeschema() {
        this.query.sql.push('USER_DEFINED_TYPE_SCHEMA');
        return this;
    }
    using() {
        this.query.sql.push('USING');
        return this;
    }
    utf16() {
        this.query.sql.push('UTF16');
        return this;
    }
    utf32() {
        this.query.sql.push('UTF32');
        return this;
    }
    utf8() {
        this.query.sql.push('UTF8');
        return this;
    }
    vacuum() {
        this.query.sql.push('VACUUM');
        return this;
    }
    valid() {
        this.query.sql.push('VALID');
        return this;
    }
    validate() {
        this.query.sql.push('VALIDATE');
        return this;
    }
    validator() {
        this.query.sql.push('VALIDATOR');
        return this;
    }
    value() {
        this.query.sql.push('VALUE');
        return this;
    }
    values() {
        this.query.sql.push('VALUES');
        return this;
    }
    valueOfKeyword() {
        this.query.sql.push('VALUE_OF');
        return this;
    }
    varbinary() {
        this.query.sql.push('VARBINARY');
        return this;
    }
    varchar() {
        this.query.sql.push('VARCHAR');
        return this;
    }
    variadic() {
        this.query.sql.push('VARIADIC');
        return this;
    }
    varying() {
        this.query.sql.push('VARYING');
        return this;
    }
    varPop() {
        this.query.sql.push('VAR_POP');
        return this;
    }
    varSamp() {
        this.query.sql.push('VAR_SAMP');
        return this;
    }
    verbose() {
        this.query.sql.push('VERBOSE');
        return this;
    }
    version() {
        this.query.sql.push('VERSION');
        return this;
    }
    versioning() {
        this.query.sql.push('VERSIONING');
        return this;
    }
    view() {
        this.query.sql.push('VIEW');
        return this;
    }
    views() {
        this.query.sql.push('VIEWS');
        return this;
    }
    virtual() {
        this.query.sql.push('VIRTUAL');
        return this;
    }
    volatile() {
        this.query.sql.push('VOLATILE');
        return this;
    }
    when() {
        this.query.sql.push('WHEN');
        return this;
    }
    whenever() {
        this.query.sql.push('WHENEVER');
        return this;
    }
    where() {
        this.query.sql.push('WHERE');
        return this;
    }
    whitespace() {
        this.query.sql.push('WHITESPACE');
        return this;
    }
    widthBucket() {
        this.query.sql.push('WIDTH_BUCKET');
        return this;
    }
    window() {
        this.query.sql.push('WINDOW');
        return this;
    }
    with() {
        this.query.sql.push('WITH');
        return this;
    }
    within() {
        this.query.sql.push('WITHIN');
        return this;
    }
    without() {
        this.query.sql.push('WITHOUT');
        return this;
    }
    work() {
        this.query.sql.push('WORK');
        return this;
    }
    wrapper() {
        this.query.sql.push('WRAPPER');
        return this;
    }
    write() {
        this.query.sql.push('WRITE');
        return this;
    }
    xml() {
        this.query.sql.push('XML');
        return this;
    }
    xmlagg() {
        this.query.sql.push('XMLAGG');
        return this;
    }
    xmlattributes() {
        this.query.sql.push('XMLATTRIBUTES');
        return this;
    }
    xmlbinary() {
        this.query.sql.push('XMLBINARY');
        return this;
    }
    xmlcast() {
        this.query.sql.push('XMLCAST');
        return this;
    }
    xmlcomment() {
        this.query.sql.push('XMLCOMMENT');
        return this;
    }
    xmlconcat() {
        this.query.sql.push('XMLCONCAT');
        return this;
    }
    xmldeclaration() {
        this.query.sql.push('XMLDECLARATION');
        return this;
    }
    xmldocument() {
        this.query.sql.push('XMLDOCUMENT');
        return this;
    }
    xmlelement() {
        this.query.sql.push('XMLELEMENT');
        return this;
    }
    xmlexists() {
        this.query.sql.push('XMLEXISTS');
        return this;
    }
    xmlforest() {
        this.query.sql.push('XMLFOREST');
        return this;
    }
    xmliterate() {
        this.query.sql.push('XMLITERATE');
        return this;
    }
    xmlnamespaces() {
        this.query.sql.push('XMLNAMESPACES');
        return this;
    }
    xmlparse() {
        this.query.sql.push('XMLPARSE');
        return this;
    }
    xmlpi() {
        this.query.sql.push('XMLPI');
        return this;
    }
    xmlquery() {
        this.query.sql.push('XMLQUERY');
        return this;
    }
    xmlroot() {
        this.query.sql.push('XMLROOT');
        return this;
    }
    xmlschema() {
        this.query.sql.push('XMLSCHEMA');
        return this;
    }
    xmlserialize() {
        this.query.sql.push('XMLSERIALIZE');
        return this;
    }
    xmltable() {
        this.query.sql.push('XMLTABLE');
        return this;
    }
    xmltext() {
        this.query.sql.push('XMLTEXT');
        return this;
    }
    xmlvalidate() {
        this.query.sql.push('XMLVALIDATE');
        return this;
    }
    year() {
        this.query.sql.push('YEAR');
        return this;
    }
    yes() {
        this.query.sql.push('YES');
        return this;
    }
    zone() {
        this.query.sql.push('ZONE');
        return this;
    }
}
exports.BaseQueryBuilder = BaseQueryBuilder;
