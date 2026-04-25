var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseRawQueryBuilder } from "../base-raw-query-builder";
var BaseQueryBuilder = /** @class */ (function (_super) {
    __extends(BaseQueryBuilder, _super);
    function BaseQueryBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseQueryBuilder.prototype.a = function () {
        this.query.sql.push('A');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.abort = function () {
        this.query.sql.push('ABORT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.abs = function () {
        this.query.sql.push('ABS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.absent = function () {
        this.query.sql.push('ABSENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.absolute = function () {
        this.query.sql.push('ABSOLUTE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.access = function () {
        this.query.sql.push('ACCESS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.according = function () {
        this.query.sql.push('ACCORDING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.acos = function () {
        this.query.sql.push('ACOS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.action = function () {
        this.query.sql.push('ACTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ada = function () {
        this.query.sql.push('ADA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.add = function () {
        this.query.sql.push('ADD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.admin = function () {
        this.query.sql.push('ADMIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.after = function () {
        this.query.sql.push('AFTER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.aggregate = function () {
        this.query.sql.push('AGGREGATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.all = function () {
        this.query.sql.push('ALL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.allocate = function () {
        this.query.sql.push('ALLOCATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.also = function () {
        this.query.sql.push('ALSO');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.alter = function () {
        this.query.sql.push('ALTER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.always = function () {
        this.query.sql.push('ALWAYS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.analyse = function () {
        this.query.sql.push('ANALYSE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.analyze = function () {
        this.query.sql.push('ANALYZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.and = function () {
        this.query.sql.push('AND');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.any = function () {
        this.query.sql.push('ANY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.anyValue = function () {
        this.query.sql.push('ANY_VALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.are = function () {
        this.query.sql.push('ARE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.array = function () {
        this.query.sql.push('ARRAY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.arrayAgg = function () {
        this.query.sql.push('ARRAY_AGG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.arraymaxcardinality = function () {
        this.query.sql.push('ARRAY_MAX_CARDINALITY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.as = function () {
        this.query.sql.push('AS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.asc = function () {
        this.query.sql.push('ASC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.asensitive = function () {
        this.query.sql.push('ASENSITIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.asin = function () {
        this.query.sql.push('ASIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.assertion = function () {
        this.query.sql.push('ASSERTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.assignment = function () {
        this.query.sql.push('ASSIGNMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.asymmetric = function () {
        this.query.sql.push('ASYMMETRIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.at = function () {
        this.query.sql.push('AT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.atan = function () {
        this.query.sql.push('ATAN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.atomic = function () {
        this.query.sql.push('ATOMIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.attach = function () {
        this.query.sql.push('ATTACH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.attribute = function () {
        this.query.sql.push('ATTRIBUTE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.attributes = function () {
        this.query.sql.push('ATTRIBUTES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.authorization = function () {
        this.query.sql.push('AUTHORIZATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.avg = function () {
        this.query.sql.push('AVG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.backward = function () {
        this.query.sql.push('BACKWARD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.base64 = function () {
        this.query.sql.push('BASE64');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.before = function () {
        this.query.sql.push('BEFORE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.begin = function () {
        this.query.sql.push('BEGIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.beginFrame = function () {
        this.query.sql.push('BEGIN_FRAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.beginPartition = function () {
        this.query.sql.push('BEGIN_PARTITION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.bernoulli = function () {
        this.query.sql.push('BERNOULLI');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.between = function () {
        this.query.sql.push('BETWEEN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.bigint = function () {
        this.query.sql.push('BIGINT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.binary = function () {
        this.query.sql.push('BINARY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.bit = function () {
        this.query.sql.push('BIT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.bitLength = function () {
        this.query.sql.push('BIT_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.blob = function () {
        this.query.sql.push('BLOB');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.blocked = function () {
        this.query.sql.push('BLOCKED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.bom = function () {
        this.query.sql.push('BOM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.boolean = function () {
        this.query.sql.push('BOOLEAN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.both = function () {
        this.query.sql.push('BOTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.breadth = function () {
        this.query.sql.push('BREADTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.btrim = function () {
        this.query.sql.push('BTRIM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.by = function () {
        this.query.sql.push('BY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.c = function () {
        this.query.sql.push('C');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cache = function () {
        this.query.sql.push('CACHE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.call = function () {
        this.query.sql.push('CALL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.called = function () {
        this.query.sql.push('CALLED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cardinality = function () {
        this.query.sql.push('CARDINALITY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cascade = function () {
        this.query.sql.push('CASCADE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cascaded = function () {
        this.query.sql.push('CASCADED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.case = function () {
        this.query.sql.push('CASE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cast = function () {
        this.query.sql.push('CAST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.catalog = function () {
        this.query.sql.push('CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.catalogName = function () {
        this.query.sql.push('CATALOG_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ceil = function () {
        this.query.sql.push('CEIL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ceiling = function () {
        this.query.sql.push('CEILING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.chain = function () {
        this.query.sql.push('CHAIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.chaining = function () {
        this.query.sql.push('CHAINING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.char = function () {
        this.query.sql.push('CHAR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.character = function () {
        this.query.sql.push('CHARACTER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.characteristics = function () {
        this.query.sql.push('CHARACTERISTICS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.characters = function () {
        this.query.sql.push('CHARACTERS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.characterLength = function () {
        this.query.sql.push('CHARACTER_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.charactersetcatalog = function () {
        this.query.sql.push('CHARACTER_SET_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.characterSetName = function () {
        this.query.sql.push('CHARACTER_SET_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.characterSetSchema = function () {
        this.query.sql.push('CHARACTER_SET_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.charLength = function () {
        this.query.sql.push('CHAR_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.check = function () {
        this.query.sql.push('CHECK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.checkpoint = function () {
        this.query.sql.push('CHECKPOINT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.class = function () {
        this.query.sql.push('CLASS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.classifier = function () {
        this.query.sql.push('CLASSIFIER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.classOrigin = function () {
        this.query.sql.push('CLASS_ORIGIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.clob = function () {
        this.query.sql.push('CLOB');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.close = function () {
        this.query.sql.push('CLOSE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cluster = function () {
        this.query.sql.push('CLUSTER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.coalesce = function () {
        this.query.sql.push('COALESCE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cobol = function () {
        this.query.sql.push('COBOL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.collate = function () {
        this.query.sql.push('COLLATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.collation = function () {
        this.query.sql.push('COLLATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.collationCatalog = function () {
        this.query.sql.push('COLLATION_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.collationName = function () {
        this.query.sql.push('COLLATION_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.collationSchema = function () {
        this.query.sql.push('COLLATION_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.collect = function () {
        this.query.sql.push('COLLECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.column = function () {
        this.query.sql.push('COLUMN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.columns = function () {
        this.query.sql.push('COLUMNS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.columnName = function () {
        this.query.sql.push('COLUMN_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.commandFunction = function () {
        this.query.sql.push('COMMAND_FUNCTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.commandfunctioncode = function () {
        this.query.sql.push('COMMAND_FUNCTION_CODE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.comment = function () {
        this.query.sql.push('COMMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.comments = function () {
        this.query.sql.push('COMMENTS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.commit = function () {
        this.query.sql.push('COMMIT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.committed = function () {
        this.query.sql.push('COMMITTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.compression = function () {
        this.query.sql.push('COMPRESSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.concurrently = function () {
        this.query.sql.push('CONCURRENTLY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.condition = function () {
        this.query.sql.push('CONDITION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.conditional = function () {
        this.query.sql.push('CONDITIONAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.conditionNumber = function () {
        this.query.sql.push('CONDITION_NUMBER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.configuration = function () {
        this.query.sql.push('CONFIGURATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.conflict = function () {
        this.query.sql.push('CONFLICT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.connect = function () {
        this.query.sql.push('CONNECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.connection = function () {
        this.query.sql.push('CONNECTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.connectionName = function () {
        this.query.sql.push('CONNECTION_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.constraint = function () {
        this.query.sql.push('CONSTRAINT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.constraints = function () {
        this.query.sql.push('CONSTRAINTS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.constraintCatalog = function () {
        this.query.sql.push('CONSTRAINT_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.constraintName = function () {
        this.query.sql.push('CONSTRAINT_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.constraintSchema = function () {
        this.query.sql.push('CONSTRAINT_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.constructorKeyword = function () {
        this.query.sql.push('CONSTRUCTOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.contains = function () {
        this.query.sql.push('CONTAINS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.content = function () {
        this.query.sql.push('CONTENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.continue = function () {
        this.query.sql.push('CONTINUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.control = function () {
        this.query.sql.push('CONTROL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.conversion = function () {
        this.query.sql.push('CONVERSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.convert = function () {
        this.query.sql.push('CONVERT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.copartition = function () {
        this.query.sql.push('COPARTITION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.copy = function () {
        this.query.sql.push('COPY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.corr = function () {
        this.query.sql.push('CORR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.corresponding = function () {
        this.query.sql.push('CORRESPONDING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cos = function () {
        this.query.sql.push('COS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cosh = function () {
        this.query.sql.push('COSH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cost = function () {
        this.query.sql.push('COST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.count = function () {
        this.query.sql.push('COUNT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.covarPop = function () {
        this.query.sql.push('COVAR_POP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.covarSamp = function () {
        this.query.sql.push('COVAR_SAMP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.create = function () {
        this.query.sql.push('CREATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cross = function () {
        this.query.sql.push('CROSS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.csv = function () {
        this.query.sql.push('CSV');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cube = function () {
        this.query.sql.push('CUBE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cumeDist = function () {
        this.query.sql.push('CUME_DIST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.current = function () {
        this.query.sql.push('CURRENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentCatalog = function () {
        this.query.sql.push('CURRENT_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentDate = function () {
        this.query.sql.push('CURRENT_DATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentdefaulttransformgroup = function () {
        this.query.sql.push('CURRENT_DEFAULT_TRANSFORM_GROUP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentPath = function () {
        this.query.sql.push('CURRENT_PATH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentRole = function () {
        this.query.sql.push('CURRENT_ROLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentRow = function () {
        this.query.sql.push('CURRENT_ROW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentSchema = function () {
        this.query.sql.push('CURRENT_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentTime = function () {
        this.query.sql.push('CURRENT_TIME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentTimestamp = function () {
        this.query.sql.push('CURRENT_TIMESTAMP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currenttransformgroupfortype = function () {
        this.query.sql.push('CURRENT_TRANSFORM_GROUP_FOR_TYPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.currentUser = function () {
        this.query.sql.push('CURRENT_USER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cursor = function () {
        this.query.sql.push('CURSOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cursorName = function () {
        this.query.sql.push('CURSOR_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.cycle = function () {
        this.query.sql.push('CYCLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.data = function () {
        this.query.sql.push('DATA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.database = function () {
        this.query.sql.push('DATABASE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.datalink = function () {
        this.query.sql.push('DATALINK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.date = function () {
        this.query.sql.push('DATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.datetimeintervalcode = function () {
        this.query.sql.push('DATETIME_INTERVAL_CODE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.datetimeintervalprecision = function () {
        this.query.sql.push('DATETIME_INTERVAL_PRECISION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.day = function () {
        this.query.sql.push('DAY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.db = function () {
        this.query.sql.push('DB');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.deallocate = function () {
        this.query.sql.push('DEALLOCATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dec = function () {
        this.query.sql.push('DEC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.decfloat = function () {
        this.query.sql.push('DECFLOAT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.decimal = function () {
        this.query.sql.push('DECIMAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.declare = function () {
        this.query.sql.push('DECLARE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.default = function () {
        this.query.sql.push('DEFAULT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.defaults = function () {
        this.query.sql.push('DEFAULTS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.deferrable = function () {
        this.query.sql.push('DEFERRABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.deferred = function () {
        this.query.sql.push('DEFERRED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.define = function () {
        this.query.sql.push('DEFINE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.defined = function () {
        this.query.sql.push('DEFINED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.definer = function () {
        this.query.sql.push('DEFINER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.degree = function () {
        this.query.sql.push('DEGREE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.delete = function () {
        this.query.sql.push('DELETE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.delimiter = function () {
        this.query.sql.push('DELIMITER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.delimiters = function () {
        this.query.sql.push('DELIMITERS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.denseRank = function () {
        this.query.sql.push('DENSE_RANK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.depends = function () {
        this.query.sql.push('DEPENDS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.depth = function () {
        this.query.sql.push('DEPTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.deref = function () {
        this.query.sql.push('DEREF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.derived = function () {
        this.query.sql.push('DERIVED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.desc = function () {
        this.query.sql.push('DESC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.describe = function () {
        this.query.sql.push('DESCRIBE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.descriptor = function () {
        this.query.sql.push('DESCRIPTOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.detach = function () {
        this.query.sql.push('DETACH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.deterministic = function () {
        this.query.sql.push('DETERMINISTIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.diagnostics = function () {
        this.query.sql.push('DIAGNOSTICS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dictionary = function () {
        this.query.sql.push('DICTIONARY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.disable = function () {
        this.query.sql.push('DISABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.discard = function () {
        this.query.sql.push('DISCARD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.disconnect = function () {
        this.query.sql.push('DISCONNECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dispatch = function () {
        this.query.sql.push('DISPATCH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.distinct = function () {
        this.query.sql.push('DISTINCT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlnewcopy = function () {
        this.query.sql.push('DLNEWCOPY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlpreviouscopy = function () {
        this.query.sql.push('DLPREVIOUSCOPY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlcomplete = function () {
        this.query.sql.push('DLURLCOMPLETE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlcompleteonly = function () {
        this.query.sql.push('DLURLCOMPLETEONLY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlcompletewrite = function () {
        this.query.sql.push('DLURLCOMPLETEWRITE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlpath = function () {
        this.query.sql.push('DLURLPATH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlpathonly = function () {
        this.query.sql.push('DLURLPATHONLY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlpathwrite = function () {
        this.query.sql.push('DLURLPATHWRITE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlscheme = function () {
        this.query.sql.push('DLURLSCHEME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlurlserver = function () {
        this.query.sql.push('DLURLSERVER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dlvalue = function () {
        this.query.sql.push('DLVALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.do = function () {
        this.query.sql.push('DO');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.document = function () {
        this.query.sql.push('DOCUMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.domain = function () {
        this.query.sql.push('DOMAIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.double = function () {
        this.query.sql.push('DOUBLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.drop = function () {
        this.query.sql.push('DROP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dynamic = function () {
        this.query.sql.push('DYNAMIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dynamicFunction = function () {
        this.query.sql.push('DYNAMIC_FUNCTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.dynamicfunctioncode = function () {
        this.query.sql.push('DYNAMIC_FUNCTION_CODE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.each = function () {
        this.query.sql.push('EACH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.element = function () {
        this.query.sql.push('ELEMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.else = function () {
        this.query.sql.push('ELSE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.empty = function () {
        this.query.sql.push('EMPTY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.enable = function () {
        this.query.sql.push('ENABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.encoding = function () {
        this.query.sql.push('ENCODING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.encrypted = function () {
        this.query.sql.push('ENCRYPTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.end = function () {
        this.query.sql.push('END');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.endExec = function () {
        this.query.sql.push('END-EXEC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.endFrame = function () {
        this.query.sql.push('END_FRAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.endPartition = function () {
        this.query.sql.push('END_PARTITION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.enforced = function () {
        this.query.sql.push('ENFORCED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.enum = function () {
        this.query.sql.push('ENUM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.equals = function () {
        this.query.sql.push('EQUALS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.error = function () {
        this.query.sql.push('ERROR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.escape = function () {
        this.query.sql.push('ESCAPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.event = function () {
        this.query.sql.push('EVENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.every = function () {
        this.query.sql.push('EVERY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.except = function () {
        this.query.sql.push('EXCEPT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.exception = function () {
        this.query.sql.push('EXCEPTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.exclude = function () {
        this.query.sql.push('EXCLUDE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.excluding = function () {
        this.query.sql.push('EXCLUDING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.exclusive = function () {
        this.query.sql.push('EXCLUSIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.execKeyword = function () {
        this.query.sql.push('EXEC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.executeKeyword = function () {
        this.query.sql.push('EXECUTE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.exists = function () {
        this.query.sql.push('EXISTS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.exp = function () {
        this.query.sql.push('EXP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.explain = function () {
        this.query.sql.push('EXPLAIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.expression = function () {
        this.query.sql.push('EXPRESSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.extension = function () {
        this.query.sql.push('EXTENSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.external = function () {
        this.query.sql.push('EXTERNAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.extract = function () {
        this.query.sql.push('EXTRACT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.false = function () {
        this.query.sql.push('FALSE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.family = function () {
        this.query.sql.push('FAMILY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.fetch = function () {
        this.query.sql.push('FETCH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.file = function () {
        this.query.sql.push('FILE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.filter = function () {
        this.query.sql.push('FILTER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.final = function () {
        this.query.sql.push('FINAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.finalize = function () {
        this.query.sql.push('FINALIZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.finish = function () {
        this.query.sql.push('FINISH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.first = function () {
        this.query.sql.push('FIRST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.firstValue = function () {
        this.query.sql.push('FIRST_VALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.flag = function () {
        this.query.sql.push('FLAG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.float = function () {
        this.query.sql.push('FLOAT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.floor = function () {
        this.query.sql.push('FLOOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.following = function () {
        this.query.sql.push('FOLLOWING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.for = function () {
        this.query.sql.push('FOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.force = function () {
        this.query.sql.push('FORCE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.foreign = function () {
        this.query.sql.push('FOREIGN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.format = function () {
        this.query.sql.push('FORMAT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.fortran = function () {
        this.query.sql.push('FORTRAN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.forward = function () {
        this.query.sql.push('FORWARD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.found = function () {
        this.query.sql.push('FOUND');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.frameRow = function () {
        this.query.sql.push('FRAME_ROW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.free = function () {
        this.query.sql.push('FREE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.freeze = function () {
        this.query.sql.push('FREEZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.from = function () {
        this.query.sql.push('FROM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.fs = function () {
        this.query.sql.push('FS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.fulfill = function () {
        this.query.sql.push('FULFILL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.full = function () {
        this.query.sql.push('FULL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.function = function () {
        this.query.sql.push('FUNCTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.functions = function () {
        this.query.sql.push('FUNCTIONS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.fusion = function () {
        this.query.sql.push('FUSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.g = function () {
        this.query.sql.push('G');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.general = function () {
        this.query.sql.push('GENERAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.generated = function () {
        this.query.sql.push('GENERATED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.get = function () {
        this.query.sql.push('GET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.global = function () {
        this.query.sql.push('GLOBAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.go = function () {
        this.query.sql.push('GO');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.goto = function () {
        this.query.sql.push('GOTO');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.grant = function () {
        this.query.sql.push('GRANT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.granted = function () {
        this.query.sql.push('GRANTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.greatest = function () {
        this.query.sql.push('GREATEST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.group = function () {
        this.query.sql.push('GROUP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.grouping = function () {
        this.query.sql.push('GROUPING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.groups = function () {
        this.query.sql.push('GROUPS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.handler = function () {
        this.query.sql.push('HANDLER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.having = function () {
        this.query.sql.push('HAVING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.header = function () {
        this.query.sql.push('HEADER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.hex = function () {
        this.query.sql.push('HEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.hierarchy = function () {
        this.query.sql.push('HIERARCHY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.hold = function () {
        this.query.sql.push('HOLD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.hour = function () {
        this.query.sql.push('HOUR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.id = function () {
        this.query.sql.push('ID');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.identity = function () {
        this.query.sql.push('IDENTITY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.if = function () {
        this.query.sql.push('IF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ignore = function () {
        this.query.sql.push('IGNORE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ilike = function () {
        this.query.sql.push('ILIKE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.immediate = function () {
        this.query.sql.push('IMMEDIATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.immediately = function () {
        this.query.sql.push('IMMEDIATELY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.immutable = function () {
        this.query.sql.push('IMMUTABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.implementation = function () {
        this.query.sql.push('IMPLEMENTATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.implicit = function () {
        this.query.sql.push('IMPLICIT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.import = function () {
        this.query.sql.push('IMPORT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.in = function () {
        this.query.sql.push('IN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.include = function () {
        this.query.sql.push('INCLUDE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.including = function () {
        this.query.sql.push('INCLUDING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.increment = function () {
        this.query.sql.push('INCREMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.indent = function () {
        this.query.sql.push('INDENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.index = function () {
        this.query.sql.push('INDEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.indexes = function () {
        this.query.sql.push('INDEXES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.indicator = function () {
        this.query.sql.push('INDICATOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.inherit = function () {
        this.query.sql.push('INHERIT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.inherits = function () {
        this.query.sql.push('INHERITS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.initial = function () {
        this.query.sql.push('INITIAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.initially = function () {
        this.query.sql.push('INITIALLY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.inline = function () {
        this.query.sql.push('INLINE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.inner = function () {
        this.query.sql.push('INNER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.inout = function () {
        this.query.sql.push('INOUT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.input = function () {
        this.query.sql.push('INPUT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.insensitive = function () {
        this.query.sql.push('INSENSITIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.insert = function () {
        this.query.sql.push('INSERT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.instance = function () {
        this.query.sql.push('INSTANCE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.instantiable = function () {
        this.query.sql.push('INSTANTIABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.instead = function () {
        this.query.sql.push('INSTEAD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.int = function () {
        this.query.sql.push('INT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.integer = function () {
        this.query.sql.push('INTEGER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.integrity = function () {
        this.query.sql.push('INTEGRITY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.intersect = function () {
        this.query.sql.push('INTERSECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.intersection = function () {
        this.query.sql.push('INTERSECTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.interval = function () {
        this.query.sql.push('INTERVAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.into = function () {
        this.query.sql.push('INTO');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.invoker = function () {
        this.query.sql.push('INVOKER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.is = function () {
        this.query.sql.push('IS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.isnull = function () {
        this.query.sql.push('ISNULL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.isolation = function () {
        this.query.sql.push('ISOLATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.join = function () {
        this.query.sql.push('JOIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.json = function () {
        this.query.sql.push('JSON');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonArray = function () {
        this.query.sql.push('JSON_ARRAY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonArrayagg = function () {
        this.query.sql.push('JSON_ARRAYAGG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonExists = function () {
        this.query.sql.push('JSON_EXISTS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonObject = function () {
        this.query.sql.push('JSON_OBJECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonObjectagg = function () {
        this.query.sql.push('JSON_OBJECTAGG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonQuery = function () {
        this.query.sql.push('JSON_QUERY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonScalar = function () {
        this.query.sql.push('JSON_SCALAR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonSerialize = function () {
        this.query.sql.push('JSON_SERIALIZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonTable = function () {
        this.query.sql.push('JSON_TABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonTablePrimitive = function () {
        this.query.sql.push('JSON_TABLE_PRIMITIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.jsonValue = function () {
        this.query.sql.push('JSON_VALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.k = function () {
        this.query.sql.push('K');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.keep = function () {
        this.query.sql.push('KEEP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.key = function () {
        this.query.sql.push('KEY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.keys = function () {
        this.query.sql.push('KEYS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.keyMember = function () {
        this.query.sql.push('KEY_MEMBER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.keyType = function () {
        this.query.sql.push('KEY_TYPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.label = function () {
        this.query.sql.push('LABEL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.lag = function () {
        this.query.sql.push('LAG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.language = function () {
        this.query.sql.push('LANGUAGE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.large = function () {
        this.query.sql.push('LARGE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.last = function () {
        this.query.sql.push('LAST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.lastValue = function () {
        this.query.sql.push('LAST_VALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.lateral = function () {
        this.query.sql.push('LATERAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.lead = function () {
        this.query.sql.push('LEAD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.leading = function () {
        this.query.sql.push('LEADING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.leakproof = function () {
        this.query.sql.push('LEAKPROOF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.least = function () {
        this.query.sql.push('LEAST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.left = function () {
        this.query.sql.push('LEFT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.length = function () {
        this.query.sql.push('LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.level = function () {
        this.query.sql.push('LEVEL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.library = function () {
        this.query.sql.push('LIBRARY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.like = function () {
        this.query.sql.push('LIKE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.likeRegex = function () {
        this.query.sql.push('LIKE_REGEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.limit = function () {
        this.query.sql.push('LIMIT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.link = function () {
        this.query.sql.push('LINK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.listagg = function () {
        this.query.sql.push('LISTAGG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.listen = function () {
        this.query.sql.push('LISTEN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ln = function () {
        this.query.sql.push('LN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.load = function () {
        this.query.sql.push('LOAD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.local = function () {
        this.query.sql.push('LOCAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.localtime = function () {
        this.query.sql.push('LOCALTIME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.localtimestamp = function () {
        this.query.sql.push('LOCALTIMESTAMP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.location = function () {
        this.query.sql.push('LOCATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.locator = function () {
        this.query.sql.push('LOCATOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.lock = function () {
        this.query.sql.push('LOCK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.locked = function () {
        this.query.sql.push('LOCKED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.log = function () {
        this.query.sql.push('LOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.log10 = function () {
        this.query.sql.push('LOG10');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.logged = function () {
        this.query.sql.push('LOGGED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.lower = function () {
        this.query.sql.push('LOWER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.lpad = function () {
        this.query.sql.push('LPAD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ltrim = function () {
        this.query.sql.push('LTRIM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.m = function () {
        this.query.sql.push('M');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.map = function () {
        this.query.sql.push('MAP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.mapping = function () {
        this.query.sql.push('MAPPING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.match = function () {
        this.query.sql.push('MATCH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.matched = function () {
        this.query.sql.push('MATCHED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.matches = function () {
        this.query.sql.push('MATCHES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.matchNumber = function () {
        this.query.sql.push('MATCH_NUMBER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.matchRecognize = function () {
        this.query.sql.push('MATCH_RECOGNIZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.materialized = function () {
        this.query.sql.push('MATERIALIZED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.max = function () {
        this.query.sql.push('MAX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.maxvalue = function () {
        this.query.sql.push('MAXVALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.measures = function () {
        this.query.sql.push('MEASURES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.member = function () {
        this.query.sql.push('MEMBER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.merge = function () {
        this.query.sql.push('MERGE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.mergeAction = function () {
        this.query.sql.push('MERGE_ACTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.messageLength = function () {
        this.query.sql.push('MESSAGE_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.messageOctetLength = function () {
        this.query.sql.push('MESSAGE_OCTET_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.messageText = function () {
        this.query.sql.push('MESSAGE_TEXT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.method = function () {
        this.query.sql.push('METHOD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.min = function () {
        this.query.sql.push('MIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.minute = function () {
        this.query.sql.push('MINUTE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.minvalue = function () {
        this.query.sql.push('MINVALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.mod = function () {
        this.query.sql.push('MOD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.mode = function () {
        this.query.sql.push('MODE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.modifies = function () {
        this.query.sql.push('MODIFIES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.module = function () {
        this.query.sql.push('MODULE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.month = function () {
        this.query.sql.push('MONTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.more = function () {
        this.query.sql.push('MORE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.move = function () {
        this.query.sql.push('MOVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.multiset = function () {
        this.query.sql.push('MULTISET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.mumps = function () {
        this.query.sql.push('MUMPS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.name = function () {
        this.query.sql.push('NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.names = function () {
        this.query.sql.push('NAMES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.namespace = function () {
        this.query.sql.push('NAMESPACE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.national = function () {
        this.query.sql.push('NATIONAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.natural = function () {
        this.query.sql.push('NATURAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nchar = function () {
        this.query.sql.push('NCHAR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nclob = function () {
        this.query.sql.push('NCLOB');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nested = function () {
        this.query.sql.push('NESTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nesting = function () {
        this.query.sql.push('NESTING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.new = function () {
        this.query.sql.push('NEW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.next = function () {
        this.query.sql.push('NEXT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nfc = function () {
        this.query.sql.push('NFC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nfd = function () {
        this.query.sql.push('NFD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nfkc = function () {
        this.query.sql.push('NFKC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nfkd = function () {
        this.query.sql.push('NFKD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nil = function () {
        this.query.sql.push('NIL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.no = function () {
        this.query.sql.push('NO');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.none = function () {
        this.query.sql.push('NONE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.normalize = function () {
        this.query.sql.push('NORMALIZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.normalized = function () {
        this.query.sql.push('NORMALIZED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.not = function () {
        this.query.sql.push('NOT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nothing = function () {
        this.query.sql.push('NOTHING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.notify = function () {
        this.query.sql.push('NOTIFY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.notnull = function () {
        this.query.sql.push('NOTNULL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nowait = function () {
        this.query.sql.push('NOWAIT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nthValue = function () {
        this.query.sql.push('NTH_VALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ntile = function () {
        this.query.sql.push('NTILE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.null = function () {
        this.query.sql.push('NULL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nullable = function () {
        this.query.sql.push('NULLABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nullif = function () {
        this.query.sql.push('NULLIF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nulls = function () {
        this.query.sql.push('NULLS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.nullOrdering = function () {
        this.query.sql.push('NULL_ORDERING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.number = function () {
        this.query.sql.push('NUMBER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.numeric = function () {
        this.query.sql.push('NUMERIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.object = function () {
        this.query.sql.push('OBJECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.objects = function () {
        this.query.sql.push('OBJECTS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.occurrence = function () {
        this.query.sql.push('OCCURRENCE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.occurrencesRegex = function () {
        this.query.sql.push('OCCURRENCES_REGEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.octets = function () {
        this.query.sql.push('OCTETS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.octetLength = function () {
        this.query.sql.push('OCTET_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.of = function () {
        this.query.sql.push('OF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.off = function () {
        this.query.sql.push('OFF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.offset = function () {
        this.query.sql.push('OFFSET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.oids = function () {
        this.query.sql.push('OIDS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.old = function () {
        this.query.sql.push('OLD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.omit = function () {
        this.query.sql.push('OMIT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.on = function () {
        this.query.sql.push('ON');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.one = function () {
        this.query.sql.push('ONE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.only = function () {
        this.query.sql.push('ONLY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.open = function () {
        this.query.sql.push('OPEN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.operator = function () {
        this.query.sql.push('OPERATOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.option = function () {
        this.query.sql.push('OPTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.options = function () {
        this.query.sql.push('OPTIONS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.or = function () {
        this.query.sql.push('OR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.order = function () {
        this.query.sql.push('ORDER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ordering = function () {
        this.query.sql.push('ORDERING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ordinality = function () {
        this.query.sql.push('ORDINALITY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.others = function () {
        this.query.sql.push('OTHERS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.out = function () {
        this.query.sql.push('OUT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.outer = function () {
        this.query.sql.push('OUTER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.output = function () {
        this.query.sql.push('OUTPUT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.over = function () {
        this.query.sql.push('OVER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.overflow = function () {
        this.query.sql.push('OVERFLOW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.overlaps = function () {
        this.query.sql.push('OVERLAPS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.overlay = function () {
        this.query.sql.push('OVERLAY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.overriding = function () {
        this.query.sql.push('OVERRIDING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.owned = function () {
        this.query.sql.push('OWNED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.owner = function () {
        this.query.sql.push('OWNER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.p = function () {
        this.query.sql.push('P');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.pad = function () {
        this.query.sql.push('PAD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parallel = function () {
        this.query.sql.push('PARALLEL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parameter = function () {
        this.query.sql.push('PARAMETER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parameterMode = function () {
        this.query.sql.push('PARAMETER_MODE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parameterName = function () {
        this.query.sql.push('PARAMETER_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parameterordinalposition = function () {
        this.query.sql.push('PARAMETER_ORDINAL_POSITION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parameterspecificcatalog = function () {
        this.query.sql.push('PARAMETER_SPECIFIC_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parameterspecificname = function () {
        this.query.sql.push('PARAMETER_SPECIFIC_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parameterspecificschema = function () {
        this.query.sql.push('PARAMETER_SPECIFIC_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.parser = function () {
        this.query.sql.push('PARSER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.partial = function () {
        this.query.sql.push('PARTIAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.partition = function () {
        this.query.sql.push('PARTITION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.pascal = function () {
        this.query.sql.push('PASCAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.pass = function () {
        this.query.sql.push('PASS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.passing = function () {
        this.query.sql.push('PASSING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.passthrough = function () {
        this.query.sql.push('PASSTHROUGH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.password = function () {
        this.query.sql.push('PASSWORD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.past = function () {
        this.query.sql.push('PAST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.path = function () {
        this.query.sql.push('PATH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.pattern = function () {
        this.query.sql.push('PATTERN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.per = function () {
        this.query.sql.push('PER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.percent = function () {
        this.query.sql.push('PERCENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.percentileCont = function () {
        this.query.sql.push('PERCENTILE_CONT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.percentileDisc = function () {
        this.query.sql.push('PERCENTILE_DISC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.percentRank = function () {
        this.query.sql.push('PERCENT_RANK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.period = function () {
        this.query.sql.push('PERIOD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.permission = function () {
        this.query.sql.push('PERMISSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.permute = function () {
        this.query.sql.push('PERMUTE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.pipe = function () {
        this.query.sql.push('PIPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.placing = function () {
        this.query.sql.push('PLACING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.plan = function () {
        this.query.sql.push('PLAN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.plans = function () {
        this.query.sql.push('PLANS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.pli = function () {
        this.query.sql.push('PLI');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.policy = function () {
        this.query.sql.push('POLICY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.portion = function () {
        this.query.sql.push('PORTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.position = function () {
        this.query.sql.push('POSITION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.positionRegex = function () {
        this.query.sql.push('POSITION_REGEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.power = function () {
        this.query.sql.push('POWER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.precedes = function () {
        this.query.sql.push('PRECEDES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.preceding = function () {
        this.query.sql.push('PRECEDING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.precision = function () {
        this.query.sql.push('PRECISION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.prepare = function () {
        this.query.sql.push('PREPARE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.prepared = function () {
        this.query.sql.push('PREPARED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.preserve = function () {
        this.query.sql.push('PRESERVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.prev = function () {
        this.query.sql.push('PREV');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.primary = function () {
        this.query.sql.push('PRIMARY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.prior = function () {
        this.query.sql.push('PRIOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.private = function () {
        this.query.sql.push('PRIVATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.privileges = function () {
        this.query.sql.push('PRIVILEGES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.procedural = function () {
        this.query.sql.push('PROCEDURAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.procedure = function () {
        this.query.sql.push('PROCEDURE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.procedures = function () {
        this.query.sql.push('PROCEDURES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.program = function () {
        this.query.sql.push('PROGRAM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.prune = function () {
        this.query.sql.push('PRUNE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ptf = function () {
        this.query.sql.push('PTF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.public = function () {
        this.query.sql.push('PUBLIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.publication = function () {
        this.query.sql.push('PUBLICATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.quote = function () {
        this.query.sql.push('QUOTE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.quotes = function () {
        this.query.sql.push('QUOTES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.range = function () {
        this.query.sql.push('RANGE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rank = function () {
        this.query.sql.push('RANK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.read = function () {
        this.query.sql.push('READ');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.reads = function () {
        this.query.sql.push('READS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.real = function () {
        this.query.sql.push('REAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.reassign = function () {
        this.query.sql.push('REASSIGN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.recovery = function () {
        this.query.sql.push('RECOVERY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.recursive = function () {
        this.query.sql.push('RECURSIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ref = function () {
        this.query.sql.push('REF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.references = function () {
        this.query.sql.push('REFERENCES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.referencing = function () {
        this.query.sql.push('REFERENCING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.refresh = function () {
        this.query.sql.push('REFRESH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrAvgx = function () {
        this.query.sql.push('REGR_AVGX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrAvgy = function () {
        this.query.sql.push('REGR_AVGY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrCount = function () {
        this.query.sql.push('REGR_COUNT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrIntercept = function () {
        this.query.sql.push('REGR_INTERCEPT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrR2 = function () {
        this.query.sql.push('REGR_R2');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrSlope = function () {
        this.query.sql.push('REGR_SLOPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrSxx = function () {
        this.query.sql.push('REGR_SXX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrSxy = function () {
        this.query.sql.push('REGR_SXY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.regrSyy = function () {
        this.query.sql.push('REGR_SYY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.reindex = function () {
        this.query.sql.push('REINDEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.relative = function () {
        this.query.sql.push('RELATIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.release = function () {
        this.query.sql.push('RELEASE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rename = function () {
        this.query.sql.push('RENAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.repeatable = function () {
        this.query.sql.push('REPEATABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.replace = function () {
        this.query.sql.push('REPLACE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.replica = function () {
        this.query.sql.push('REPLICA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.requiring = function () {
        this.query.sql.push('REQUIRING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.reset = function () {
        this.query.sql.push('RESET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.respect = function () {
        this.query.sql.push('RESPECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.restart = function () {
        this.query.sql.push('RESTART');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.restore = function () {
        this.query.sql.push('RESTORE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.restrict = function () {
        this.query.sql.push('RESTRICT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.result = function () {
        this.query.sql.push('RESULT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.return = function () {
        this.query.sql.push('RETURN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.returnedCardinality = function () {
        this.query.sql.push('RETURNED_CARDINALITY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.returnedLength = function () {
        this.query.sql.push('RETURNED_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.returnedoctetlength = function () {
        this.query.sql.push('RETURNED_OCTET_LENGTH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.returnedSqlstate = function () {
        this.query.sql.push('RETURNED_SQLSTATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.returning = function () {
        this.query.sql.push('RETURNING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.returns = function () {
        this.query.sql.push('RETURNS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.revoke = function () {
        this.query.sql.push('REVOKE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.right = function () {
        this.query.sql.push('RIGHT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.role = function () {
        this.query.sql.push('ROLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rollback = function () {
        this.query.sql.push('ROLLBACK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rollup = function () {
        this.query.sql.push('ROLLUP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.routine = function () {
        this.query.sql.push('ROUTINE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.routines = function () {
        this.query.sql.push('ROUTINES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.routineCatalog = function () {
        this.query.sql.push('ROUTINE_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.routineName = function () {
        this.query.sql.push('ROUTINE_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.routineSchema = function () {
        this.query.sql.push('ROUTINE_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.row = function () {
        this.query.sql.push('ROW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rows = function () {
        this.query.sql.push('ROWS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rowCount = function () {
        this.query.sql.push('ROW_COUNT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rowNumber = function () {
        this.query.sql.push('ROW_NUMBER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rpad = function () {
        this.query.sql.push('RPAD');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rtrim = function () {
        this.query.sql.push('RTRIM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.rule = function () {
        this.query.sql.push('RULE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.running = function () {
        this.query.sql.push('RUNNING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.savepoint = function () {
        this.query.sql.push('SAVEPOINT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.scalar = function () {
        this.query.sql.push('SCALAR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.scale = function () {
        this.query.sql.push('SCALE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.schema = function () {
        this.query.sql.push('SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.schemas = function () {
        this.query.sql.push('SCHEMAS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.schemaName = function () {
        this.query.sql.push('SCHEMA_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.scope = function () {
        this.query.sql.push('SCOPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.scopeCatalog = function () {
        this.query.sql.push('SCOPE_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.scopeName = function () {
        this.query.sql.push('SCOPE_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.scopeSchema = function () {
        this.query.sql.push('SCOPE_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.scroll = function () {
        this.query.sql.push('SCROLL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.search = function () {
        this.query.sql.push('SEARCH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.second = function () {
        this.query.sql.push('SECOND');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.section = function () {
        this.query.sql.push('SECTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.security = function () {
        this.query.sql.push('SECURITY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.seek = function () {
        this.query.sql.push('SEEK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.select = function () {
        this.query.sql.push('SELECT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.selective = function () {
        this.query.sql.push('SELECTIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.self = function () {
        this.query.sql.push('SELF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.semantics = function () {
        this.query.sql.push('SEMANTICS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sensitive = function () {
        this.query.sql.push('SENSITIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sequence = function () {
        this.query.sql.push('SEQUENCE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sequences = function () {
        this.query.sql.push('SEQUENCES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.serializable = function () {
        this.query.sql.push('SERIALIZABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.server = function () {
        this.query.sql.push('SERVER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.serverName = function () {
        this.query.sql.push('SERVER_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.session = function () {
        this.query.sql.push('SESSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sessionUser = function () {
        this.query.sql.push('SESSION_USER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.set = function () {
        this.query.sql.push('SET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.setof = function () {
        this.query.sql.push('SETOF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sets = function () {
        this.query.sql.push('SETS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.share = function () {
        this.query.sql.push('SHARE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.show = function () {
        this.query.sql.push('SHOW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.similar = function () {
        this.query.sql.push('SIMILAR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.simple = function () {
        this.query.sql.push('SIMPLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sin = function () {
        this.query.sql.push('SIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sinh = function () {
        this.query.sql.push('SINH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.size = function () {
        this.query.sql.push('SIZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.skip = function () {
        this.query.sql.push('SKIP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.smallint = function () {
        this.query.sql.push('SMALLINT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.snapshot = function () {
        this.query.sql.push('SNAPSHOT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.some = function () {
        this.query.sql.push('SOME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sortDirection = function () {
        this.query.sql.push('SORT_DIRECTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.source = function () {
        this.query.sql.push('SOURCE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.space = function () {
        this.query.sql.push('SPACE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.specific = function () {
        this.query.sql.push('SPECIFIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.specifictype = function () {
        this.query.sql.push('SPECIFICTYPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.specificName = function () {
        this.query.sql.push('SPECIFIC_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sql = function () {
        this.query.sql.push('SQL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sqlcode = function () {
        this.query.sql.push('SQLCODE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sqlerror = function () {
        this.query.sql.push('SQLERROR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sqlexception = function () {
        this.query.sql.push('SQLEXCEPTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sqlstate = function () {
        this.query.sql.push('SQLSTATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sqlwarning = function () {
        this.query.sql.push('SQLWARNING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sqrt = function () {
        this.query.sql.push('SQRT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.stable = function () {
        this.query.sql.push('STABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.standalone = function () {
        this.query.sql.push('STANDALONE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.start = function () {
        this.query.sql.push('START');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.state = function () {
        this.query.sql.push('STATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.statement = function () {
        this.query.sql.push('STATEMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.static = function () {
        this.query.sql.push('STATIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.statistics = function () {
        this.query.sql.push('STATISTICS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.stddevPop = function () {
        this.query.sql.push('STDDEV_POP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.stddevSamp = function () {
        this.query.sql.push('STDDEV_SAMP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.stdin = function () {
        this.query.sql.push('STDIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.stdout = function () {
        this.query.sql.push('STDOUT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.storage = function () {
        this.query.sql.push('STORAGE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.stored = function () {
        this.query.sql.push('STORED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.strict = function () {
        this.query.sql.push('STRICT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.string = function () {
        this.query.sql.push('STRING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.strip = function () {
        this.query.sql.push('STRIP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.structure = function () {
        this.query.sql.push('STRUCTURE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.style = function () {
        this.query.sql.push('STYLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.subclassOrigin = function () {
        this.query.sql.push('SUBCLASS_ORIGIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.submultiset = function () {
        this.query.sql.push('SUBMULTISET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.subscription = function () {
        this.query.sql.push('SUBSCRIPTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.subset = function () {
        this.query.sql.push('SUBSET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.substring = function () {
        this.query.sql.push('SUBSTRING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.substringRegex = function () {
        this.query.sql.push('SUBSTRING_REGEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.succeeds = function () {
        this.query.sql.push('SUCCEEDS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sum = function () {
        this.query.sql.push('SUM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.support = function () {
        this.query.sql.push('SUPPORT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.symmetric = function () {
        this.query.sql.push('SYMMETRIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.sysid = function () {
        this.query.sql.push('SYSID');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.system = function () {
        this.query.sql.push('SYSTEM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.systemTime = function () {
        this.query.sql.push('SYSTEM_TIME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.systemUser = function () {
        this.query.sql.push('SYSTEM_USER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.t = function () {
        this.query.sql.push('T');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.table = function () {
        this.query.sql.push('TABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.tables = function () {
        this.query.sql.push('TABLES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.tablesample = function () {
        this.query.sql.push('TABLESAMPLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.tablespace = function () {
        this.query.sql.push('TABLESPACE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.tableName = function () {
        this.query.sql.push('TABLE_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.tan = function () {
        this.query.sql.push('TAN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.tanh = function () {
        this.query.sql.push('TANH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.target = function () {
        this.query.sql.push('TARGET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.temp = function () {
        this.query.sql.push('TEMP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.template = function () {
        this.query.sql.push('TEMPLATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.temporary = function () {
        this.query.sql.push('TEMPORARY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.text = function () {
        this.query.sql.push('TEXT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.then = function () {
        this.query.sql.push('THEN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.through = function () {
        this.query.sql.push('THROUGH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.ties = function () {
        this.query.sql.push('TIES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.time = function () {
        this.query.sql.push('TIME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.timestamp = function () {
        this.query.sql.push('TIMESTAMP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.timezoneHour = function () {
        this.query.sql.push('TIMEZONE_HOUR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.timezoneMinute = function () {
        this.query.sql.push('TIMEZONE_MINUTE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.to = function () {
        this.query.sql.push('TO');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.token = function () {
        this.query.sql.push('TOKEN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.topLevelCount = function () {
        this.query.sql.push('TOP_LEVEL_COUNT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.trailing = function () {
        this.query.sql.push('TRAILING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.transaction = function () {
        this.query.sql.push('TRANSACTION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.transactionscommitted = function () {
        this.query.sql.push('TRANSACTIONS_COMMITTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.transactionsrolledback = function () {
        this.query.sql.push('TRANSACTIONS_ROLLED_BACK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.transactionActive = function () {
        this.query.sql.push('TRANSACTION_ACTIVE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.transform = function () {
        this.query.sql.push('TRANSFORM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.transforms = function () {
        this.query.sql.push('TRANSFORMS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.translate = function () {
        this.query.sql.push('TRANSLATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.translateRegex = function () {
        this.query.sql.push('TRANSLATE_REGEX');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.translation = function () {
        this.query.sql.push('TRANSLATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.treat = function () {
        this.query.sql.push('TREAT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.trigger = function () {
        this.query.sql.push('TRIGGER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.triggerCatalog = function () {
        this.query.sql.push('TRIGGER_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.triggerName = function () {
        this.query.sql.push('TRIGGER_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.triggerSchema = function () {
        this.query.sql.push('TRIGGER_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.trim = function () {
        this.query.sql.push('TRIM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.trimArray = function () {
        this.query.sql.push('TRIM_ARRAY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.true = function () {
        this.query.sql.push('TRUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.truncate = function () {
        this.query.sql.push('TRUNCATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.trusted = function () {
        this.query.sql.push('TRUSTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.type = function () {
        this.query.sql.push('TYPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.types = function () {
        this.query.sql.push('TYPES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.uescape = function () {
        this.query.sql.push('UESCAPE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unbounded = function () {
        this.query.sql.push('UNBOUNDED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.uncommitted = function () {
        this.query.sql.push('UNCOMMITTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unconditional = function () {
        this.query.sql.push('UNCONDITIONAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.under = function () {
        this.query.sql.push('UNDER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unencrypted = function () {
        this.query.sql.push('UNENCRYPTED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.union = function () {
        this.query.sql.push('UNION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unique = function () {
        this.query.sql.push('UNIQUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unknown = function () {
        this.query.sql.push('UNKNOWN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unlink = function () {
        this.query.sql.push('UNLINK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unlisten = function () {
        this.query.sql.push('UNLISTEN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unlogged = function () {
        this.query.sql.push('UNLOGGED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unmatched = function () {
        this.query.sql.push('UNMATCHED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unnamed = function () {
        this.query.sql.push('UNNAMED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.unnest = function () {
        this.query.sql.push('UNNEST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.until = function () {
        this.query.sql.push('UNTIL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.untyped = function () {
        this.query.sql.push('UNTYPED');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.update = function () {
        this.query.sql.push('UPDATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.upper = function () {
        this.query.sql.push('UPPER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.uri = function () {
        this.query.sql.push('URI');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.usage = function () {
        this.query.sql.push('USAGE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.user = function () {
        this.query.sql.push('USER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.userdefinedtypecatalog = function () {
        this.query.sql.push('USER_DEFINED_TYPE_CATALOG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.userdefinedtypecode = function () {
        this.query.sql.push('USER_DEFINED_TYPE_CODE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.userdefinedtypename = function () {
        this.query.sql.push('USER_DEFINED_TYPE_NAME');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.userdefinedtypeschema = function () {
        this.query.sql.push('USER_DEFINED_TYPE_SCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.using = function () {
        this.query.sql.push('USING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.utf16 = function () {
        this.query.sql.push('UTF16');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.utf32 = function () {
        this.query.sql.push('UTF32');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.utf8 = function () {
        this.query.sql.push('UTF8');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.vacuum = function () {
        this.query.sql.push('VACUUM');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.valid = function () {
        this.query.sql.push('VALID');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.validate = function () {
        this.query.sql.push('VALIDATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.validator = function () {
        this.query.sql.push('VALIDATOR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.value = function () {
        this.query.sql.push('VALUE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.values = function () {
        this.query.sql.push('VALUES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.valueOfKeyword = function () {
        this.query.sql.push('VALUE_OF');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.varbinary = function () {
        this.query.sql.push('VARBINARY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.varchar = function () {
        this.query.sql.push('VARCHAR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.variadic = function () {
        this.query.sql.push('VARIADIC');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.varying = function () {
        this.query.sql.push('VARYING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.varPop = function () {
        this.query.sql.push('VAR_POP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.varSamp = function () {
        this.query.sql.push('VAR_SAMP');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.verbose = function () {
        this.query.sql.push('VERBOSE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.version = function () {
        this.query.sql.push('VERSION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.versioning = function () {
        this.query.sql.push('VERSIONING');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.view = function () {
        this.query.sql.push('VIEW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.views = function () {
        this.query.sql.push('VIEWS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.virtual = function () {
        this.query.sql.push('VIRTUAL');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.volatile = function () {
        this.query.sql.push('VOLATILE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.when = function () {
        this.query.sql.push('WHEN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.whenever = function () {
        this.query.sql.push('WHENEVER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.where = function () {
        this.query.sql.push('WHERE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.whitespace = function () {
        this.query.sql.push('WHITESPACE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.widthBucket = function () {
        this.query.sql.push('WIDTH_BUCKET');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.window = function () {
        this.query.sql.push('WINDOW');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.with = function () {
        this.query.sql.push('WITH');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.within = function () {
        this.query.sql.push('WITHIN');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.without = function () {
        this.query.sql.push('WITHOUT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.work = function () {
        this.query.sql.push('WORK');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.wrapper = function () {
        this.query.sql.push('WRAPPER');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.write = function () {
        this.query.sql.push('WRITE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xml = function () {
        this.query.sql.push('XML');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlagg = function () {
        this.query.sql.push('XMLAGG');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlattributes = function () {
        this.query.sql.push('XMLATTRIBUTES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlbinary = function () {
        this.query.sql.push('XMLBINARY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlcast = function () {
        this.query.sql.push('XMLCAST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlcomment = function () {
        this.query.sql.push('XMLCOMMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlconcat = function () {
        this.query.sql.push('XMLCONCAT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmldeclaration = function () {
        this.query.sql.push('XMLDECLARATION');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmldocument = function () {
        this.query.sql.push('XMLDOCUMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlelement = function () {
        this.query.sql.push('XMLELEMENT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlexists = function () {
        this.query.sql.push('XMLEXISTS');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlforest = function () {
        this.query.sql.push('XMLFOREST');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmliterate = function () {
        this.query.sql.push('XMLITERATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlnamespaces = function () {
        this.query.sql.push('XMLNAMESPACES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlparse = function () {
        this.query.sql.push('XMLPARSE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlpi = function () {
        this.query.sql.push('XMLPI');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlquery = function () {
        this.query.sql.push('XMLQUERY');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlroot = function () {
        this.query.sql.push('XMLROOT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlschema = function () {
        this.query.sql.push('XMLSCHEMA');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlserialize = function () {
        this.query.sql.push('XMLSERIALIZE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmltable = function () {
        this.query.sql.push('XMLTABLE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmltext = function () {
        this.query.sql.push('XMLTEXT');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.xmlvalidate = function () {
        this.query.sql.push('XMLVALIDATE');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.year = function () {
        this.query.sql.push('YEAR');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.yes = function () {
        this.query.sql.push('YES');
        return this.endClass();
    };
    BaseQueryBuilder.prototype.zone = function () {
        this.query.sql.push('ZONE');
        return this.endClass();
    };
    return BaseQueryBuilder;
}(BaseRawQueryBuilder));
export { BaseQueryBuilder };
