import { QueryBuilder } from "../query-builder";
var QueryInstance = /** @class */ (function () {
    function QueryInstance(dbInstance) {
        this.dbInstance = dbInstance;
    }
    QueryInstance.prototype.getDbInstance = function () {
        return this.dbInstance;
    };
    QueryInstance.prototype.a = function () {
        return (new QueryBuilder(this)).a();
    };
    QueryInstance.prototype.abbrev = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).abbrev.apply(_a, args);
    };
    QueryInstance.prototype.abort = function () {
        return (new QueryBuilder(this)).abort();
    };
    QueryInstance.prototype.above = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).above.apply(_a, args);
    };
    QueryInstance.prototype.abs = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).abs.apply(_a, args);
    };
    QueryInstance.prototype.absent = function () {
        return (new QueryBuilder(this)).absent();
    };
    QueryInstance.prototype.absolute = function () {
        return (new QueryBuilder(this)).absolute();
    };
    QueryInstance.prototype.access = function () {
        return (new QueryBuilder(this)).access();
    };
    QueryInstance.prototype.according = function () {
        return (new QueryBuilder(this)).according();
    };
    QueryInstance.prototype.acldefault = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).acldefault.apply(_a, args);
    };
    QueryInstance.prototype.aclexplode = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).aclexplode.apply(_a, args);
    };
    QueryInstance.prototype.acos = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).acos.apply(_a, args);
    };
    QueryInstance.prototype.acosd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).acosd.apply(_a, args);
    };
    QueryInstance.prototype.acosh = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).acosh.apply(_a, args);
    };
    QueryInstance.prototype.action = function () {
        return (new QueryBuilder(this)).action();
    };
    QueryInstance.prototype.ada = function () {
        return (new QueryBuilder(this)).ada();
    };
    QueryInstance.prototype.add = function () {
        return (new QueryBuilder(this)).add();
    };
    QueryInstance.prototype.admin = function () {
        return (new QueryBuilder(this)).admin();
    };
    QueryInstance.prototype.after = function () {
        return (new QueryBuilder(this)).after();
    };
    QueryInstance.prototype.age = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).age.apply(_a, args);
    };
    QueryInstance.prototype.aggregate = function () {
        return (new QueryBuilder(this)).aggregate();
    };
    QueryInstance.prototype.all = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).all.apply(_a, args);
    };
    QueryInstance.prototype.allocate = function () {
        return (new QueryBuilder(this)).allocate();
    };
    QueryInstance.prototype.also = function () {
        return (new QueryBuilder(this)).also();
    };
    QueryInstance.prototype.alter = function () {
        return (new QueryBuilder(this)).alter();
    };
    QueryInstance.prototype.always = function () {
        return (new QueryBuilder(this)).always();
    };
    QueryInstance.prototype.analyse = function () {
        return (new QueryBuilder(this)).analyse();
    };
    QueryInstance.prototype.analyze = function () {
        return (new QueryBuilder(this)).analyze();
    };
    QueryInstance.prototype.and = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).and.apply(_a, args);
    };
    QueryInstance.prototype.any = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).any.apply(_a, args);
    };
    QueryInstance.prototype.anyValue = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).anyValue.apply(_a, args);
    };
    QueryInstance.prototype.are = function () {
        return (new QueryBuilder(this)).are();
    };
    QueryInstance.prototype.area = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).area.apply(_a, args);
    };
    QueryInstance.prototype.array = function () {
        return (new QueryBuilder(this)).array();
    };
    QueryInstance.prototype.arrayAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayAgg.apply(_a, args);
    };
    QueryInstance.prototype.arrayAppend = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayAppend.apply(_a, args);
    };
    QueryInstance.prototype.arrayCat = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayCat.apply(_a, args);
    };
    QueryInstance.prototype.arrayDims = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayDims.apply(_a, args);
    };
    QueryInstance.prototype.arrayFill = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayFill.apply(_a, args);
    };
    QueryInstance.prototype.arrayLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayLength.apply(_a, args);
    };
    QueryInstance.prototype.arrayLower = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayLower.apply(_a, args);
    };
    QueryInstance.prototype.arraymaxcardinality = function () {
        return (new QueryBuilder(this)).arraymaxcardinality();
    };
    QueryInstance.prototype.arrayNdims = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayNdims.apply(_a, args);
    };
    QueryInstance.prototype.arrayPosition = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayPosition.apply(_a, args);
    };
    QueryInstance.prototype.arrayPositions = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayPositions.apply(_a, args);
    };
    QueryInstance.prototype.arrayPrepend = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayPrepend.apply(_a, args);
    };
    QueryInstance.prototype.arrayRemove = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayRemove.apply(_a, args);
    };
    QueryInstance.prototype.arrayReplace = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayReplace.apply(_a, args);
    };
    QueryInstance.prototype.arrayReverse = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayReverse.apply(_a, args);
    };
    QueryInstance.prototype.arraySample = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arraySample.apply(_a, args);
    };
    QueryInstance.prototype.arrayShuffle = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayShuffle.apply(_a, args);
    };
    QueryInstance.prototype.arraySort = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arraySort.apply(_a, args);
    };
    QueryInstance.prototype.arrayToJson = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayToJson.apply(_a, args);
    };
    QueryInstance.prototype.arrayToString = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayToString.apply(_a, args);
    };
    QueryInstance.prototype.arrayToTsvector = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayToTsvector.apply(_a, args);
    };
    QueryInstance.prototype.arrayUpper = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).arrayUpper.apply(_a, args);
    };
    QueryInstance.prototype.as = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).as.apply(_a, args);
    };
    QueryInstance.prototype.asc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).asc.apply(_a, args);
    };
    QueryInstance.prototype.ascii = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ascii.apply(_a, args);
    };
    QueryInstance.prototype.asensitive = function () {
        return (new QueryBuilder(this)).asensitive();
    };
    QueryInstance.prototype.asin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).asin.apply(_a, args);
    };
    QueryInstance.prototype.asind = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).asind.apply(_a, args);
    };
    QueryInstance.prototype.asinh = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).asinh.apply(_a, args);
    };
    QueryInstance.prototype.assertion = function () {
        return (new QueryBuilder(this)).assertion();
    };
    QueryInstance.prototype.assignment = function () {
        return (new QueryBuilder(this)).assignment();
    };
    QueryInstance.prototype.asymmetric = function () {
        return (new QueryBuilder(this)).asymmetric();
    };
    QueryInstance.prototype.at = function () {
        return (new QueryBuilder(this)).at();
    };
    QueryInstance.prototype.atan = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).atan.apply(_a, args);
    };
    QueryInstance.prototype.atan2 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).atan2.apply(_a, args);
    };
    QueryInstance.prototype.atan2d = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).atan2d.apply(_a, args);
    };
    QueryInstance.prototype.atand = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).atand.apply(_a, args);
    };
    QueryInstance.prototype.atanh = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).atanh.apply(_a, args);
    };
    QueryInstance.prototype.atomic = function () {
        return (new QueryBuilder(this)).atomic();
    };
    QueryInstance.prototype.atSign = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).atSign.apply(_a, args);
    };
    QueryInstance.prototype.attach = function () {
        return (new QueryBuilder(this)).attach();
    };
    QueryInstance.prototype.attribute = function () {
        return (new QueryBuilder(this)).attribute();
    };
    QueryInstance.prototype.attributes = function () {
        return (new QueryBuilder(this)).attributes();
    };
    QueryInstance.prototype.authorization = function () {
        return (new QueryBuilder(this)).authorization();
    };
    QueryInstance.prototype.avg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).avg.apply(_a, args);
    };
    QueryInstance.prototype.backward = function () {
        return (new QueryBuilder(this)).backward();
    };
    QueryInstance.prototype.base64 = function () {
        return (new QueryBuilder(this)).base64();
    };
    QueryInstance.prototype.before = function () {
        return (new QueryBuilder(this)).before();
    };
    QueryInstance.prototype.begin = function () {
        return (new QueryBuilder(this)).begin();
    };
    QueryInstance.prototype.beginFrame = function () {
        return (new QueryBuilder(this)).beginFrame();
    };
    QueryInstance.prototype.beginPartition = function () {
        return (new QueryBuilder(this)).beginPartition();
    };
    QueryInstance.prototype.beginTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).beginTransaction.apply(_a, args);
    };
    QueryInstance.prototype.below = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).below.apply(_a, args);
    };
    QueryInstance.prototype.bernoulli = function () {
        return (new QueryBuilder(this)).bernoulli();
    };
    QueryInstance.prototype.between = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).between.apply(_a, args);
    };
    QueryInstance.prototype.betweenSymmetric = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).betweenSymmetric.apply(_a, args);
    };
    QueryInstance.prototype.bigint = function () {
        return (new QueryBuilder(this)).bigint();
    };
    QueryInstance.prototype.binary = function () {
        return (new QueryBuilder(this)).binary();
    };
    QueryInstance.prototype.bit = function () {
        return (new QueryBuilder(this)).bit();
    };
    QueryInstance.prototype.bitAnd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitAnd.apply(_a, args);
    };
    QueryInstance.prototype.bitCount = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitCount.apply(_a, args);
    };
    QueryInstance.prototype.bitLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitLength.apply(_a, args);
    };
    QueryInstance.prototype.bitOr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitOr.apply(_a, args);
    };
    QueryInstance.prototype.bitwiseAnd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitwiseAnd.apply(_a, args);
    };
    QueryInstance.prototype.bitwiseLeftShift = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitwiseLeftShift.apply(_a, args);
    };
    QueryInstance.prototype.bitwiseLeftShiftAssign = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitwiseLeftShiftAssign.apply(_a, args);
    };
    QueryInstance.prototype.bitwiseOr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitwiseOr.apply(_a, args);
    };
    QueryInstance.prototype.bitwiseRightShift = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitwiseRightShift.apply(_a, args);
    };
    QueryInstance.prototype.bitwiseRightShiftAssign = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitwiseRightShiftAssign.apply(_a, args);
    };
    QueryInstance.prototype.bitwiseXor = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitwiseXor.apply(_a, args);
    };
    QueryInstance.prototype.bitXor = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).bitXor.apply(_a, args);
    };
    QueryInstance.prototype.blob = function () {
        return (new QueryBuilder(this)).blob();
    };
    QueryInstance.prototype.blocked = function () {
        return (new QueryBuilder(this)).blocked();
    };
    QueryInstance.prototype.bom = function () {
        return (new QueryBuilder(this)).bom();
    };
    QueryInstance.prototype.boolAnd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).boolAnd.apply(_a, args);
    };
    QueryInstance.prototype.boolean = function () {
        return (new QueryBuilder(this)).boolean();
    };
    QueryInstance.prototype.boolOr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).boolOr.apply(_a, args);
    };
    QueryInstance.prototype.both = function () {
        return (new QueryBuilder(this)).both();
    };
    QueryInstance.prototype.boundBox = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).boundBox.apply(_a, args);
    };
    QueryInstance.prototype.box = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).box.apply(_a, args);
    };
    QueryInstance.prototype.breadth = function () {
        return (new QueryBuilder(this)).breadth();
    };
    QueryInstance.prototype.brinDesummarizeRange = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).brinDesummarizeRange.apply(_a, args);
    };
    QueryInstance.prototype.brinSummarizeNewValues = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).brinSummarizeNewValues.apply(_a, args);
    };
    QueryInstance.prototype.brinSummarizeRange = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).brinSummarizeRange.apply(_a, args);
    };
    QueryInstance.prototype.broadcast = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).broadcast.apply(_a, args);
    };
    QueryInstance.prototype.btrim = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).btrim.apply(_a, args);
    };
    QueryInstance.prototype.by = function () {
        return (new QueryBuilder(this)).by();
    };
    QueryInstance.prototype.c = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).c.apply(_a, args);
    };
    QueryInstance.prototype.cache = function () {
        return (new QueryBuilder(this)).cache();
    };
    QueryInstance.prototype.call = function () {
        return (new QueryBuilder(this)).call();
    };
    QueryInstance.prototype.called = function () {
        return (new QueryBuilder(this)).called();
    };
    QueryInstance.prototype.cardinality = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cardinality.apply(_a, args);
    };
    QueryInstance.prototype.caretAt = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).caretAt.apply(_a, args);
    };
    QueryInstance.prototype.cascade = function () {
        return (new QueryBuilder(this)).cascade();
    };
    QueryInstance.prototype.cascaded = function () {
        return (new QueryBuilder(this)).cascaded();
    };
    QueryInstance.prototype.case = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).case.apply(_a, args);
    };
    QueryInstance.prototype.casefold = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).casefold.apply(_a, args);
    };
    QueryInstance.prototype.cast = function () {
        return (new QueryBuilder(this)).cast();
    };
    QueryInstance.prototype.catalog = function () {
        return (new QueryBuilder(this)).catalog();
    };
    QueryInstance.prototype.catalogName = function () {
        return (new QueryBuilder(this)).catalogName();
    };
    QueryInstance.prototype.cbrt = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cbrt.apply(_a, args);
    };
    QueryInstance.prototype.ceil = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ceil.apply(_a, args);
    };
    QueryInstance.prototype.ceiling = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ceiling.apply(_a, args);
    };
    QueryInstance.prototype.center = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).center.apply(_a, args);
    };
    QueryInstance.prototype.chain = function () {
        return (new QueryBuilder(this)).chain();
    };
    QueryInstance.prototype.chaining = function () {
        return (new QueryBuilder(this)).chaining();
    };
    QueryInstance.prototype.char = function () {
        return (new QueryBuilder(this)).char();
    };
    QueryInstance.prototype.character = function () {
        return (new QueryBuilder(this)).character();
    };
    QueryInstance.prototype.characteristics = function () {
        return (new QueryBuilder(this)).characteristics();
    };
    QueryInstance.prototype.characterLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).characterLength.apply(_a, args);
    };
    QueryInstance.prototype.characters = function () {
        return (new QueryBuilder(this)).characters();
    };
    QueryInstance.prototype.charactersetcatalog = function () {
        return (new QueryBuilder(this)).charactersetcatalog();
    };
    QueryInstance.prototype.characterSetName = function () {
        return (new QueryBuilder(this)).characterSetName();
    };
    QueryInstance.prototype.characterSetSchema = function () {
        return (new QueryBuilder(this)).characterSetSchema();
    };
    QueryInstance.prototype.charLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).charLength.apply(_a, args);
    };
    QueryInstance.prototype.check = function () {
        return (new QueryBuilder(this)).check();
    };
    QueryInstance.prototype.checkpoint = function () {
        return (new QueryBuilder(this)).checkpoint();
    };
    QueryInstance.prototype.chr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).chr.apply(_a, args);
    };
    QueryInstance.prototype.circle = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).circle.apply(_a, args);
    };
    QueryInstance.prototype.class = function () {
        return (new QueryBuilder(this)).class();
    };
    QueryInstance.prototype.classifier = function () {
        return (new QueryBuilder(this)).classifier();
    };
    QueryInstance.prototype.classOrigin = function () {
        return (new QueryBuilder(this)).classOrigin();
    };
    QueryInstance.prototype.clob = function () {
        return (new QueryBuilder(this)).clob();
    };
    QueryInstance.prototype.clockTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).clockTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.close = function () {
        return (new QueryBuilder(this)).close();
    };
    QueryInstance.prototype.closestPoint = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).closestPoint.apply(_a, args);
    };
    QueryInstance.prototype.cluster = function () {
        return (new QueryBuilder(this)).cluster();
    };
    QueryInstance.prototype.coalesce = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).coalesce.apply(_a, args);
    };
    QueryInstance.prototype.cobol = function () {
        return (new QueryBuilder(this)).cobol();
    };
    QueryInstance.prototype.colDescription = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).colDescription.apply(_a, args);
    };
    QueryInstance.prototype.collate = function () {
        return (new QueryBuilder(this)).collate();
    };
    QueryInstance.prototype.collation = function () {
        return (new QueryBuilder(this)).collation();
    };
    QueryInstance.prototype.collationCatalog = function () {
        return (new QueryBuilder(this)).collationCatalog();
    };
    QueryInstance.prototype.collationFor = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).collationFor.apply(_a, args);
    };
    QueryInstance.prototype.collationName = function () {
        return (new QueryBuilder(this)).collationName();
    };
    QueryInstance.prototype.collationSchema = function () {
        return (new QueryBuilder(this)).collationSchema();
    };
    QueryInstance.prototype.collect = function () {
        return (new QueryBuilder(this)).collect();
    };
    QueryInstance.prototype.column = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).column.apply(_a, args);
    };
    QueryInstance.prototype.columnName = function () {
        return (new QueryBuilder(this)).columnName();
    };
    QueryInstance.prototype.columns = function () {
        return (new QueryBuilder(this)).columns();
    };
    QueryInstance.prototype.comma = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).comma.apply(_a, args);
    };
    QueryInstance.prototype.commandFunction = function () {
        return (new QueryBuilder(this)).commandFunction();
    };
    QueryInstance.prototype.commandfunctioncode = function () {
        return (new QueryBuilder(this)).commandfunctioncode();
    };
    QueryInstance.prototype.comment = function () {
        return (new QueryBuilder(this)).comment();
    };
    QueryInstance.prototype.comments = function () {
        return (new QueryBuilder(this)).comments();
    };
    QueryInstance.prototype.commit = function () {
        return (new QueryBuilder(this)).commit();
    };
    QueryInstance.prototype.commitPreparedTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).commitPreparedTransaction.apply(_a, args);
    };
    QueryInstance.prototype.committed = function () {
        return (new QueryBuilder(this)).committed();
    };
    QueryInstance.prototype.commitTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).commitTransaction.apply(_a, args);
    };
    QueryInstance.prototype.compression = function () {
        return (new QueryBuilder(this)).compression();
    };
    QueryInstance.prototype.concat = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).concat.apply(_a, args);
    };
    QueryInstance.prototype.concatWs = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).concatWs.apply(_a, args);
    };
    QueryInstance.prototype.concurrently = function () {
        return (new QueryBuilder(this)).concurrently();
    };
    QueryInstance.prototype.condition = function () {
        return (new QueryBuilder(this)).condition();
    };
    QueryInstance.prototype.conditional = function () {
        return (new QueryBuilder(this)).conditional();
    };
    QueryInstance.prototype.conditionNumber = function () {
        return (new QueryBuilder(this)).conditionNumber();
    };
    QueryInstance.prototype.configuration = function () {
        return (new QueryBuilder(this)).configuration();
    };
    QueryInstance.prototype.conflict = function () {
        return (new QueryBuilder(this)).conflict();
    };
    QueryInstance.prototype.connect = function () {
        return (new QueryBuilder(this)).connect();
    };
    QueryInstance.prototype.connection = function () {
        return (new QueryBuilder(this)).connection();
    };
    QueryInstance.prototype.connectionName = function () {
        return (new QueryBuilder(this)).connectionName();
    };
    QueryInstance.prototype.constraint = function () {
        return (new QueryBuilder(this)).constraint();
    };
    QueryInstance.prototype.constraintCatalog = function () {
        return (new QueryBuilder(this)).constraintCatalog();
    };
    QueryInstance.prototype.constraintName = function () {
        return (new QueryBuilder(this)).constraintName();
    };
    QueryInstance.prototype.constraints = function () {
        return (new QueryBuilder(this)).constraints();
    };
    QueryInstance.prototype.constraintSchema = function () {
        return (new QueryBuilder(this)).constraintSchema();
    };
    QueryInstance.prototype.constructorKeyword = function () {
        return (new QueryBuilder(this)).constructorKeyword();
    };
    QueryInstance.prototype.containedBy = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).containedBy.apply(_a, args);
    };
    QueryInstance.prototype.containment = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).containment.apply(_a, args);
    };
    QueryInstance.prototype.contains = function () {
        return (new QueryBuilder(this)).contains();
    };
    QueryInstance.prototype.content = function () {
        return (new QueryBuilder(this)).content();
    };
    QueryInstance.prototype.continue = function () {
        return (new QueryBuilder(this)).continue();
    };
    QueryInstance.prototype.control = function () {
        return (new QueryBuilder(this)).control();
    };
    QueryInstance.prototype.conversion = function () {
        return (new QueryBuilder(this)).conversion();
    };
    QueryInstance.prototype.convert = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).convert.apply(_a, args);
    };
    QueryInstance.prototype.convertFrom = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).convertFrom.apply(_a, args);
    };
    QueryInstance.prototype.convertTo = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).convertTo.apply(_a, args);
    };
    QueryInstance.prototype.copartition = function () {
        return (new QueryBuilder(this)).copartition();
    };
    QueryInstance.prototype.copy = function () {
        return (new QueryBuilder(this)).copy();
    };
    QueryInstance.prototype.corr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).corr.apply(_a, args);
    };
    QueryInstance.prototype.corresponding = function () {
        return (new QueryBuilder(this)).corresponding();
    };
    QueryInstance.prototype.cos = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cos.apply(_a, args);
    };
    QueryInstance.prototype.cosd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cosd.apply(_a, args);
    };
    QueryInstance.prototype.cosh = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cosh.apply(_a, args);
    };
    QueryInstance.prototype.cost = function () {
        return (new QueryBuilder(this)).cost();
    };
    QueryInstance.prototype.cot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cot.apply(_a, args);
    };
    QueryInstance.prototype.cotd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cotd.apply(_a, args);
    };
    QueryInstance.prototype.count = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).count.apply(_a, args);
    };
    QueryInstance.prototype.covarPop = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).covarPop.apply(_a, args);
    };
    QueryInstance.prototype.covarSamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).covarSamp.apply(_a, args);
    };
    QueryInstance.prototype.crc32 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).crc32.apply(_a, args);
    };
    QueryInstance.prototype.crc32c = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).crc32c.apply(_a, args);
    };
    QueryInstance.prototype.create = function () {
        return (new QueryBuilder(this)).create();
    };
    QueryInstance.prototype.cross = function () {
        return (new QueryBuilder(this)).cross();
    };
    QueryInstance.prototype.crosses = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).crosses.apply(_a, args);
    };
    QueryInstance.prototype.crossJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).crossJoin.apply(_a, args);
    };
    QueryInstance.prototype.crossJoinLateral = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).crossJoinLateral.apply(_a, args);
    };
    QueryInstance.prototype.csv = function () {
        return (new QueryBuilder(this)).csv();
    };
    QueryInstance.prototype.cube = function () {
        return (new QueryBuilder(this)).cube();
    };
    QueryInstance.prototype.cumeDist = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cumeDist.apply(_a, args);
    };
    QueryInstance.prototype.current = function () {
        return (new QueryBuilder(this)).current();
    };
    QueryInstance.prototype.currentCatalog = function () {
        return (new QueryBuilder(this)).currentCatalog();
    };
    QueryInstance.prototype.currentDatabase = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentDatabase.apply(_a, args);
    };
    QueryInstance.prototype.currentDate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentDate.apply(_a, args);
    };
    QueryInstance.prototype.currentdefaulttransformgroup = function () {
        return (new QueryBuilder(this)).currentdefaulttransformgroup();
    };
    QueryInstance.prototype.currentPath = function () {
        return (new QueryBuilder(this)).currentPath();
    };
    QueryInstance.prototype.currentQuery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentQuery.apply(_a, args);
    };
    QueryInstance.prototype.currentRole = function () {
        return (new QueryBuilder(this)).currentRole();
    };
    QueryInstance.prototype.currentRow = function () {
        return (new QueryBuilder(this)).currentRow();
    };
    QueryInstance.prototype.currentSchema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentSchema.apply(_a, args);
    };
    QueryInstance.prototype.currentSchemas = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentSchemas.apply(_a, args);
    };
    QueryInstance.prototype.currentSetting = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentSetting.apply(_a, args);
    };
    QueryInstance.prototype.currentTime = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentTime.apply(_a, args);
    };
    QueryInstance.prototype.currentTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currentTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.currenttransformgroupfortype = function () {
        return (new QueryBuilder(this)).currenttransformgroupfortype();
    };
    QueryInstance.prototype.currentUser = function () {
        return (new QueryBuilder(this)).currentUser();
    };
    QueryInstance.prototype.currval = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).currval.apply(_a, args);
    };
    QueryInstance.prototype.cursor = function () {
        return (new QueryBuilder(this)).cursor();
    };
    QueryInstance.prototype.cursorName = function () {
        return (new QueryBuilder(this)).cursorName();
    };
    QueryInstance.prototype.cursorToXml = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cursorToXml.apply(_a, args);
    };
    QueryInstance.prototype.cursorToXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).cursorToXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.cycle = function () {
        return (new QueryBuilder(this)).cycle();
    };
    QueryInstance.prototype.data = function () {
        return (new QueryBuilder(this)).data();
    };
    QueryInstance.prototype.database = function () {
        return (new QueryBuilder(this)).database();
    };
    QueryInstance.prototype.databaseToXml = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).databaseToXml.apply(_a, args);
    };
    QueryInstance.prototype.databaseToXmlAndXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).databaseToXmlAndXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.databaseToXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).databaseToXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.datalink = function () {
        return (new QueryBuilder(this)).datalink();
    };
    QueryInstance.prototype.date = function () {
        return (new QueryBuilder(this)).date();
    };
    QueryInstance.prototype.dateAdd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).dateAdd.apply(_a, args);
    };
    QueryInstance.prototype.dateBin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).dateBin.apply(_a, args);
    };
    QueryInstance.prototype.datePart = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).datePart.apply(_a, args);
    };
    QueryInstance.prototype.dateSubtract = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).dateSubtract.apply(_a, args);
    };
    QueryInstance.prototype.datetimeintervalcode = function () {
        return (new QueryBuilder(this)).datetimeintervalcode();
    };
    QueryInstance.prototype.datetimeintervalprecision = function () {
        return (new QueryBuilder(this)).datetimeintervalprecision();
    };
    QueryInstance.prototype.dateTrunc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).dateTrunc.apply(_a, args);
    };
    QueryInstance.prototype.day = function () {
        return (new QueryBuilder(this)).day();
    };
    QueryInstance.prototype.db = function () {
        return (new QueryBuilder(this)).db();
    };
    QueryInstance.prototype.deallocate = function () {
        return (new QueryBuilder(this)).deallocate();
    };
    QueryInstance.prototype.dec = function () {
        return (new QueryBuilder(this)).dec();
    };
    QueryInstance.prototype.decfloat = function () {
        return (new QueryBuilder(this)).decfloat();
    };
    QueryInstance.prototype.decimal = function () {
        return (new QueryBuilder(this)).decimal();
    };
    QueryInstance.prototype.declare = function () {
        return (new QueryBuilder(this)).declare();
    };
    QueryInstance.prototype.decode = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).decode.apply(_a, args);
    };
    QueryInstance.prototype.default = function () {
        return (new QueryBuilder(this)).default();
    };
    QueryInstance.prototype.defaults = function () {
        return (new QueryBuilder(this)).defaults();
    };
    QueryInstance.prototype.deferrable = function () {
        return (new QueryBuilder(this)).deferrable();
    };
    QueryInstance.prototype.deferred = function () {
        return (new QueryBuilder(this)).deferred();
    };
    QueryInstance.prototype.define = function () {
        return (new QueryBuilder(this)).define();
    };
    QueryInstance.prototype.defined = function () {
        return (new QueryBuilder(this)).defined();
    };
    QueryInstance.prototype.definer = function () {
        return (new QueryBuilder(this)).definer();
    };
    QueryInstance.prototype.degree = function () {
        return (new QueryBuilder(this)).degree();
    };
    QueryInstance.prototype.degrees = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).degrees.apply(_a, args);
    };
    QueryInstance.prototype.delete = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).delete.apply(_a, args);
    };
    QueryInstance.prototype.delimiter = function () {
        return (new QueryBuilder(this)).delimiter();
    };
    QueryInstance.prototype.delimiters = function () {
        return (new QueryBuilder(this)).delimiters();
    };
    QueryInstance.prototype.denseRank = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).denseRank.apply(_a, args);
    };
    QueryInstance.prototype.depends = function () {
        return (new QueryBuilder(this)).depends();
    };
    QueryInstance.prototype.depth = function () {
        return (new QueryBuilder(this)).depth();
    };
    QueryInstance.prototype.deref = function () {
        return (new QueryBuilder(this)).deref();
    };
    QueryInstance.prototype.derived = function () {
        return (new QueryBuilder(this)).derived();
    };
    QueryInstance.prototype.desc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).desc.apply(_a, args);
    };
    QueryInstance.prototype.describe = function () {
        return (new QueryBuilder(this)).describe();
    };
    QueryInstance.prototype.descriptor = function () {
        return (new QueryBuilder(this)).descriptor();
    };
    QueryInstance.prototype.detach = function () {
        return (new QueryBuilder(this)).detach();
    };
    QueryInstance.prototype.deterministic = function () {
        return (new QueryBuilder(this)).deterministic();
    };
    QueryInstance.prototype.diagnostics = function () {
        return (new QueryBuilder(this)).diagnostics();
    };
    QueryInstance.prototype.diagonal = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).diagonal.apply(_a, args);
    };
    QueryInstance.prototype.diameter = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).diameter.apply(_a, args);
    };
    QueryInstance.prototype.dictionary = function () {
        return (new QueryBuilder(this)).dictionary();
    };
    QueryInstance.prototype.disable = function () {
        return (new QueryBuilder(this)).disable();
    };
    QueryInstance.prototype.discard = function () {
        return (new QueryBuilder(this)).discard();
    };
    QueryInstance.prototype.disconnect = function () {
        return (new QueryBuilder(this)).disconnect();
    };
    QueryInstance.prototype.dispatch = function () {
        return (new QueryBuilder(this)).dispatch();
    };
    QueryInstance.prototype.distance = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).distance.apply(_a, args);
    };
    QueryInstance.prototype.distinct = function () {
        return (new QueryBuilder(this)).distinct();
    };
    QueryInstance.prototype.div = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).div.apply(_a, args);
    };
    QueryInstance.prototype.divide = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).divide.apply(_a, args);
    };
    QueryInstance.prototype.dlnewcopy = function () {
        return (new QueryBuilder(this)).dlnewcopy();
    };
    QueryInstance.prototype.dlpreviouscopy = function () {
        return (new QueryBuilder(this)).dlpreviouscopy();
    };
    QueryInstance.prototype.dlurlcomplete = function () {
        return (new QueryBuilder(this)).dlurlcomplete();
    };
    QueryInstance.prototype.dlurlcompleteonly = function () {
        return (new QueryBuilder(this)).dlurlcompleteonly();
    };
    QueryInstance.prototype.dlurlcompletewrite = function () {
        return (new QueryBuilder(this)).dlurlcompletewrite();
    };
    QueryInstance.prototype.dlurlpath = function () {
        return (new QueryBuilder(this)).dlurlpath();
    };
    QueryInstance.prototype.dlurlpathonly = function () {
        return (new QueryBuilder(this)).dlurlpathonly();
    };
    QueryInstance.prototype.dlurlpathwrite = function () {
        return (new QueryBuilder(this)).dlurlpathwrite();
    };
    QueryInstance.prototype.dlurlscheme = function () {
        return (new QueryBuilder(this)).dlurlscheme();
    };
    QueryInstance.prototype.dlurlserver = function () {
        return (new QueryBuilder(this)).dlurlserver();
    };
    QueryInstance.prototype.dlvalue = function () {
        return (new QueryBuilder(this)).dlvalue();
    };
    QueryInstance.prototype.do = function () {
        return (new QueryBuilder(this)).do();
    };
    QueryInstance.prototype.document = function () {
        return (new QueryBuilder(this)).document();
    };
    QueryInstance.prototype.domain = function () {
        return (new QueryBuilder(this)).domain();
    };
    QueryInstance.prototype.doNothing = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).doNothing.apply(_a, args);
    };
    QueryInstance.prototype.double = function () {
        return (new QueryBuilder(this)).double();
    };
    QueryInstance.prototype.doUpdate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).doUpdate.apply(_a, args);
    };
    QueryInstance.prototype.drop = function () {
        return (new QueryBuilder(this)).drop();
    };
    QueryInstance.prototype.dynamic = function () {
        return (new QueryBuilder(this)).dynamic();
    };
    QueryInstance.prototype.dynamicFunction = function () {
        return (new QueryBuilder(this)).dynamicFunction();
    };
    QueryInstance.prototype.dynamicfunctioncode = function () {
        return (new QueryBuilder(this)).dynamicfunctioncode();
    };
    QueryInstance.prototype.each = function () {
        return (new QueryBuilder(this)).each();
    };
    QueryInstance.prototype.element = function () {
        return (new QueryBuilder(this)).element();
    };
    QueryInstance.prototype.else = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).else.apply(_a, args);
    };
    QueryInstance.prototype.empty = function () {
        return (new QueryBuilder(this)).empty();
    };
    QueryInstance.prototype.enable = function () {
        return (new QueryBuilder(this)).enable();
    };
    QueryInstance.prototype.encode = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).encode.apply(_a, args);
    };
    QueryInstance.prototype.encoding = function () {
        return (new QueryBuilder(this)).encoding();
    };
    QueryInstance.prototype.encrypted = function () {
        return (new QueryBuilder(this)).encrypted();
    };
    QueryInstance.prototype.end = function () {
        return (new QueryBuilder(this)).end();
    };
    QueryInstance.prototype.endExec = function () {
        return (new QueryBuilder(this)).endExec();
    };
    QueryInstance.prototype.endFrame = function () {
        return (new QueryBuilder(this)).endFrame();
    };
    QueryInstance.prototype.endPartition = function () {
        return (new QueryBuilder(this)).endPartition();
    };
    QueryInstance.prototype.enforced = function () {
        return (new QueryBuilder(this)).enforced();
    };
    QueryInstance.prototype.enum = function () {
        return (new QueryBuilder(this)).enum();
    };
    QueryInstance.prototype.enumFirst = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).enumFirst.apply(_a, args);
    };
    QueryInstance.prototype.enumLast = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).enumLast.apply(_a, args);
    };
    QueryInstance.prototype.enumRange = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).enumRange.apply(_a, args);
    };
    QueryInstance.prototype.eq = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).eq.apply(_a, args);
    };
    QueryInstance.prototype.equals = function () {
        return (new QueryBuilder(this)).equals();
    };
    QueryInstance.prototype.erf = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).erf.apply(_a, args);
    };
    QueryInstance.prototype.erfc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).erfc.apply(_a, args);
    };
    QueryInstance.prototype.error = function () {
        return (new QueryBuilder(this)).error();
    };
    QueryInstance.prototype.escape = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).escape.apply(_a, args);
    };
    QueryInstance.prototype.event = function () {
        return (new QueryBuilder(this)).event();
    };
    QueryInstance.prototype.every = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).every.apply(_a, args);
    };
    QueryInstance.prototype.except = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).except.apply(_a, args);
    };
    QueryInstance.prototype.exceptAll = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).exceptAll.apply(_a, args);
    };
    QueryInstance.prototype.exception = function () {
        return (new QueryBuilder(this)).exception();
    };
    QueryInstance.prototype.exclamation = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).exclamation.apply(_a, args);
    };
    QueryInstance.prototype.exclude = function () {
        return (new QueryBuilder(this)).exclude();
    };
    QueryInstance.prototype.excluding = function () {
        return (new QueryBuilder(this)).excluding();
    };
    QueryInstance.prototype.exclusive = function () {
        return (new QueryBuilder(this)).exclusive();
    };
    QueryInstance.prototype.execKeyword = function () {
        return (new QueryBuilder(this)).execKeyword();
    };
    QueryInstance.prototype.executeKeyword = function () {
        return (new QueryBuilder(this)).executeKeyword();
    };
    QueryInstance.prototype.exists = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).exists.apply(_a, args);
    };
    QueryInstance.prototype.exp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).exp.apply(_a, args);
    };
    QueryInstance.prototype.explain = function () {
        return (new QueryBuilder(this)).explain();
    };
    QueryInstance.prototype.expression = function () {
        return (new QueryBuilder(this)).expression();
    };
    QueryInstance.prototype.extension = function () {
        return (new QueryBuilder(this)).extension();
    };
    QueryInstance.prototype.external = function () {
        return (new QueryBuilder(this)).external();
    };
    QueryInstance.prototype.extract = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).extract.apply(_a, args);
    };
    QueryInstance.prototype.factorial = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).factorial.apply(_a, args);
    };
    QueryInstance.prototype.false = function () {
        return (new QueryBuilder(this)).false();
    };
    QueryInstance.prototype.family = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).family.apply(_a, args);
    };
    QueryInstance.prototype.fetch = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).fetch.apply(_a, args);
    };
    QueryInstance.prototype.file = function () {
        return (new QueryBuilder(this)).file();
    };
    QueryInstance.prototype.filter = function () {
        return (new QueryBuilder(this)).filter();
    };
    QueryInstance.prototype.final = function () {
        return (new QueryBuilder(this)).final();
    };
    QueryInstance.prototype.finalize = function () {
        return (new QueryBuilder(this)).finalize();
    };
    QueryInstance.prototype.finish = function () {
        return (new QueryBuilder(this)).finish();
    };
    QueryInstance.prototype.first = function () {
        return (new QueryBuilder(this)).first();
    };
    QueryInstance.prototype.firstValue = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).firstValue.apply(_a, args);
    };
    QueryInstance.prototype.flag = function () {
        return (new QueryBuilder(this)).flag();
    };
    QueryInstance.prototype.float = function () {
        return (new QueryBuilder(this)).float();
    };
    QueryInstance.prototype.floor = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).floor.apply(_a, args);
    };
    QueryInstance.prototype.following = function () {
        return (new QueryBuilder(this)).following();
    };
    QueryInstance.prototype.for = function () {
        return (new QueryBuilder(this)).for();
    };
    QueryInstance.prototype.force = function () {
        return (new QueryBuilder(this)).force();
    };
    QueryInstance.prototype.foreign = function () {
        return (new QueryBuilder(this)).foreign();
    };
    QueryInstance.prototype.format = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).format.apply(_a, args);
    };
    QueryInstance.prototype.formatType = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).formatType.apply(_a, args);
    };
    QueryInstance.prototype.fortran = function () {
        return (new QueryBuilder(this)).fortran();
    };
    QueryInstance.prototype.forward = function () {
        return (new QueryBuilder(this)).forward();
    };
    QueryInstance.prototype.found = function () {
        return (new QueryBuilder(this)).found();
    };
    QueryInstance.prototype.frameRow = function () {
        return (new QueryBuilder(this)).frameRow();
    };
    QueryInstance.prototype.free = function () {
        return (new QueryBuilder(this)).free();
    };
    QueryInstance.prototype.freeze = function () {
        return (new QueryBuilder(this)).freeze();
    };
    QueryInstance.prototype.from = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).from.apply(_a, args);
    };
    QueryInstance.prototype.fs = function () {
        return (new QueryBuilder(this)).fs();
    };
    QueryInstance.prototype.fulfill = function () {
        return (new QueryBuilder(this)).fulfill();
    };
    QueryInstance.prototype.full = function () {
        return (new QueryBuilder(this)).full();
    };
    QueryInstance.prototype.fullJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).fullJoin.apply(_a, args);
    };
    QueryInstance.prototype.function = function () {
        return (new QueryBuilder(this)).function();
    };
    QueryInstance.prototype.functions = function () {
        return (new QueryBuilder(this)).functions();
    };
    QueryInstance.prototype.fusion = function () {
        return (new QueryBuilder(this)).fusion();
    };
    QueryInstance.prototype.g = function () {
        return (new QueryBuilder(this)).g();
    };
    QueryInstance.prototype.gamma = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).gamma.apply(_a, args);
    };
    QueryInstance.prototype.gcd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).gcd.apply(_a, args);
    };
    QueryInstance.prototype.general = function () {
        return (new QueryBuilder(this)).general();
    };
    QueryInstance.prototype.generated = function () {
        return (new QueryBuilder(this)).generated();
    };
    QueryInstance.prototype.generateSeries = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).generateSeries.apply(_a, args);
    };
    QueryInstance.prototype.generateSubscripts = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).generateSubscripts.apply(_a, args);
    };
    QueryInstance.prototype.genRandomUuid = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).genRandomUuid.apply(_a, args);
    };
    QueryInstance.prototype.get = function () {
        return (new QueryBuilder(this)).get();
    };
    QueryInstance.prototype.getBit = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).getBit.apply(_a, args);
    };
    QueryInstance.prototype.getByte = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).getByte.apply(_a, args);
    };
    QueryInstance.prototype.getCurrentTsConfig = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).getCurrentTsConfig.apply(_a, args);
    };
    QueryInstance.prototype.ginCleanPendingList = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ginCleanPendingList.apply(_a, args);
    };
    QueryInstance.prototype.global = function () {
        return (new QueryBuilder(this)).global();
    };
    QueryInstance.prototype.go = function () {
        return (new QueryBuilder(this)).go();
    };
    QueryInstance.prototype.goto = function () {
        return (new QueryBuilder(this)).goto();
    };
    QueryInstance.prototype.grant = function () {
        return (new QueryBuilder(this)).grant();
    };
    QueryInstance.prototype.granted = function () {
        return (new QueryBuilder(this)).granted();
    };
    QueryInstance.prototype.greatest = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).greatest.apply(_a, args);
    };
    QueryInstance.prototype.group = function () {
        return (new QueryBuilder(this)).group();
    };
    QueryInstance.prototype.groupBy = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).groupBy.apply(_a, args);
    };
    QueryInstance.prototype.groupByDistinct = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).groupByDistinct.apply(_a, args);
    };
    QueryInstance.prototype.grouping = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).grouping.apply(_a, args);
    };
    QueryInstance.prototype.groups = function () {
        return (new QueryBuilder(this)).groups();
    };
    QueryInstance.prototype.gt = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).gt.apply(_a, args);
    };
    QueryInstance.prototype.gte = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).gte.apply(_a, args);
    };
    QueryInstance.prototype.handler = function () {
        return (new QueryBuilder(this)).handler();
    };
    QueryInstance.prototype.hasAnyColumnPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasAnyColumnPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasColumnPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasColumnPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasDatabasePrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasDatabasePrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasForeignDataWrapperPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasForeignDataWrapperPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasFunctionPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasFunctionPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hash = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hash.apply(_a, args);
    };
    QueryInstance.prototype.hasLanguagePrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasLanguagePrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasLargeobjectPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasLargeobjectPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasParameterPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasParameterPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasSchemaPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasSchemaPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasSequencePrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasSequencePrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasServerPrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasServerPrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasTablePrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasTablePrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasTablespacePrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasTablespacePrivilege.apply(_a, args);
    };
    QueryInstance.prototype.hasTypePrivilege = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hasTypePrivilege.apply(_a, args);
    };
    QueryInstance.prototype.having = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).having.apply(_a, args);
    };
    QueryInstance.prototype.header = function () {
        return (new QueryBuilder(this)).header();
    };
    QueryInstance.prototype.height = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).height.apply(_a, args);
    };
    QueryInstance.prototype.hex = function () {
        return (new QueryBuilder(this)).hex();
    };
    QueryInstance.prototype.hierarchy = function () {
        return (new QueryBuilder(this)).hierarchy();
    };
    QueryInstance.prototype.hold = function () {
        return (new QueryBuilder(this)).hold();
    };
    QueryInstance.prototype.horizontal = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).horizontal.apply(_a, args);
    };
    QueryInstance.prototype.host = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).host.apply(_a, args);
    };
    QueryInstance.prototype.hostmask = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).hostmask.apply(_a, args);
    };
    QueryInstance.prototype.hour = function () {
        return (new QueryBuilder(this)).hour();
    };
    QueryInstance.prototype.i = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).i.apply(_a, args);
    };
    QueryInstance.prototype.icuUnicodeVersion = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).icuUnicodeVersion.apply(_a, args);
    };
    QueryInstance.prototype.id = function () {
        return (new QueryBuilder(this)).id();
    };
    QueryInstance.prototype.identifier = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).identifier.apply(_a, args);
    };
    QueryInstance.prototype.identifierArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).identifierArray.apply(_a, args);
    };
    QueryInstance.prototype.identity = function () {
        return (new QueryBuilder(this)).identity();
    };
    QueryInstance.prototype.if = function () {
        return (new QueryBuilder(this)).if();
    };
    QueryInstance.prototype.ignore = function () {
        return (new QueryBuilder(this)).ignore();
    };
    QueryInstance.prototype.ilike = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ilike.apply(_a, args);
    };
    QueryInstance.prototype.immediate = function () {
        return (new QueryBuilder(this)).immediate();
    };
    QueryInstance.prototype.immediately = function () {
        return (new QueryBuilder(this)).immediately();
    };
    QueryInstance.prototype.immutable = function () {
        return (new QueryBuilder(this)).immutable();
    };
    QueryInstance.prototype.implementation = function () {
        return (new QueryBuilder(this)).implementation();
    };
    QueryInstance.prototype.implicit = function () {
        return (new QueryBuilder(this)).implicit();
    };
    QueryInstance.prototype.import = function () {
        return (new QueryBuilder(this)).import();
    };
    QueryInstance.prototype.in = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).in.apply(_a, args);
    };
    QueryInstance.prototype.include = function () {
        return (new QueryBuilder(this)).include();
    };
    QueryInstance.prototype.including = function () {
        return (new QueryBuilder(this)).including();
    };
    QueryInstance.prototype.increment = function () {
        return (new QueryBuilder(this)).increment();
    };
    QueryInstance.prototype.indent = function () {
        return (new QueryBuilder(this)).indent();
    };
    QueryInstance.prototype.index = function () {
        return (new QueryBuilder(this)).index();
    };
    QueryInstance.prototype.indexes = function () {
        return (new QueryBuilder(this)).indexes();
    };
    QueryInstance.prototype.indicator = function () {
        return (new QueryBuilder(this)).indicator();
    };
    QueryInstance.prototype.inetClientAddr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).inetClientAddr.apply(_a, args);
    };
    QueryInstance.prototype.inetClientPort = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).inetClientPort.apply(_a, args);
    };
    QueryInstance.prototype.inetMerge = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).inetMerge.apply(_a, args);
    };
    QueryInstance.prototype.inetSameFamily = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).inetSameFamily.apply(_a, args);
    };
    QueryInstance.prototype.inetServerAddr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).inetServerAddr.apply(_a, args);
    };
    QueryInstance.prototype.inetServerPort = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).inetServerPort.apply(_a, args);
    };
    QueryInstance.prototype.inherit = function () {
        return (new QueryBuilder(this)).inherit();
    };
    QueryInstance.prototype.inherits = function () {
        return (new QueryBuilder(this)).inherits();
    };
    QueryInstance.prototype.initcap = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).initcap.apply(_a, args);
    };
    QueryInstance.prototype.initial = function () {
        return (new QueryBuilder(this)).initial();
    };
    QueryInstance.prototype.initially = function () {
        return (new QueryBuilder(this)).initially();
    };
    QueryInstance.prototype.inline = function () {
        return (new QueryBuilder(this)).inline();
    };
    QueryInstance.prototype.inner = function () {
        return (new QueryBuilder(this)).inner();
    };
    QueryInstance.prototype.innerJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).innerJoin.apply(_a, args);
    };
    QueryInstance.prototype.innerJoinLateral = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).innerJoinLateral.apply(_a, args);
    };
    QueryInstance.prototype.inout = function () {
        return (new QueryBuilder(this)).inout();
    };
    QueryInstance.prototype.input = function () {
        return (new QueryBuilder(this)).input();
    };
    QueryInstance.prototype.insensitive = function () {
        return (new QueryBuilder(this)).insensitive();
    };
    QueryInstance.prototype.insert = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).insert.apply(_a, args);
    };
    QueryInstance.prototype.insertInto = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).insertInto.apply(_a, args);
    };
    QueryInstance.prototype.instance = function () {
        return (new QueryBuilder(this)).instance();
    };
    QueryInstance.prototype.instantiable = function () {
        return (new QueryBuilder(this)).instantiable();
    };
    QueryInstance.prototype.instead = function () {
        return (new QueryBuilder(this)).instead();
    };
    QueryInstance.prototype.int = function () {
        return (new QueryBuilder(this)).int();
    };
    QueryInstance.prototype.integer = function () {
        return (new QueryBuilder(this)).integer();
    };
    QueryInstance.prototype.integrity = function () {
        return (new QueryBuilder(this)).integrity();
    };
    QueryInstance.prototype.intersect = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).intersect.apply(_a, args);
    };
    QueryInstance.prototype.intersectAll = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).intersectAll.apply(_a, args);
    };
    QueryInstance.prototype.intersection = function () {
        return (new QueryBuilder(this)).intersection();
    };
    QueryInstance.prototype.interval = function () {
        return (new QueryBuilder(this)).interval();
    };
    QueryInstance.prototype.into = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).into.apply(_a, args);
    };
    QueryInstance.prototype.invoker = function () {
        return (new QueryBuilder(this)).invoker();
    };
    QueryInstance.prototype.is = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).is.apply(_a, args);
    };
    QueryInstance.prototype.isclosed = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).isclosed.apply(_a, args);
    };
    QueryInstance.prototype.isempty = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).isempty.apply(_a, args);
    };
    QueryInstance.prototype.isfinite = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).isfinite.apply(_a, args);
    };
    QueryInstance.prototype.isNot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).isNot.apply(_a, args);
    };
    QueryInstance.prototype.isnull = function () {
        return (new QueryBuilder(this)).isnull();
    };
    QueryInstance.prototype.isolation = function () {
        return (new QueryBuilder(this)).isolation();
    };
    QueryInstance.prototype.isopen = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).isopen.apply(_a, args);
    };
    QueryInstance.prototype.isParallel = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).isParallel.apply(_a, args);
    };
    QueryInstance.prototype.join = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).join.apply(_a, args);
    };
    QueryInstance.prototype.json = function () {
        return (new QueryBuilder(this)).json();
    };
    QueryInstance.prototype.jsonAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonAgg.apply(_a, args);
    };
    QueryInstance.prototype.jsonAggStrict = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonAggStrict.apply(_a, args);
    };
    QueryInstance.prototype.jsonArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonArray.apply(_a, args);
    };
    QueryInstance.prototype.jsonArrayagg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonArrayagg.apply(_a, args);
    };
    QueryInstance.prototype.jsonArrayElements = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonArrayElements.apply(_a, args);
    };
    QueryInstance.prototype.jsonArrayElementsText = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonArrayElementsText.apply(_a, args);
    };
    QueryInstance.prototype.jsonArrayLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonArrayLength.apply(_a, args);
    };
    QueryInstance.prototype.jsonbAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbAgg.apply(_a, args);
    };
    QueryInstance.prototype.jsonbAggStrict = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbAggStrict.apply(_a, args);
    };
    QueryInstance.prototype.jsonbArrayElements = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbArrayElements.apply(_a, args);
    };
    QueryInstance.prototype.jsonbArrayElementsText = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbArrayElementsText.apply(_a, args);
    };
    QueryInstance.prototype.jsonbArrayLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbArrayLength.apply(_a, args);
    };
    QueryInstance.prototype.jsonbBuildArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbBuildArray.apply(_a, args);
    };
    QueryInstance.prototype.jsonbBuildObject = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbBuildObject.apply(_a, args);
    };
    QueryInstance.prototype.jsonbEach = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbEach.apply(_a, args);
    };
    QueryInstance.prototype.jsonbEachText = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbEachText.apply(_a, args);
    };
    QueryInstance.prototype.jsonbExtractPath = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbExtractPath.apply(_a, args);
    };
    QueryInstance.prototype.jsonbExtractPathText = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbExtractPathText.apply(_a, args);
    };
    QueryInstance.prototype.jsonbInsert = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbInsert.apply(_a, args);
    };
    QueryInstance.prototype.jsonbObject = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbObject.apply(_a, args);
    };
    QueryInstance.prototype.jsonbObjectAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbObjectAgg.apply(_a, args);
    };
    QueryInstance.prototype.jsonbObjectAggStrict = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbObjectAggStrict.apply(_a, args);
    };
    QueryInstance.prototype.jsonbObjectAggUnique = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbObjectAggUnique.apply(_a, args);
    };
    QueryInstance.prototype.jsonbObjectAggUniqueStrict = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbObjectAggUniqueStrict.apply(_a, args);
    };
    QueryInstance.prototype.jsonbObjectKeys = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbObjectKeys.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathExists = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathExists.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathExistsTz = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathExistsTz.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathMatch = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathMatch.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathMatchTz = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathMatchTz.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathQuery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathQuery.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathQueryArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathQueryArray.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathQueryArrayTz = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathQueryArrayTz.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathQueryFirst = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathQueryFirst.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathQueryFirstTz = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathQueryFirstTz.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPathQueryTz = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPathQueryTz.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPopulateRecord = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPopulateRecord.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPopulateRecordset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPopulateRecordset.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPopulateRecordValid = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPopulateRecordValid.apply(_a, args);
    };
    QueryInstance.prototype.jsonbPretty = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbPretty.apply(_a, args);
    };
    QueryInstance.prototype.jsonbSet = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbSet.apply(_a, args);
    };
    QueryInstance.prototype.jsonbSetLax = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbSetLax.apply(_a, args);
    };
    QueryInstance.prototype.jsonbStripNulls = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbStripNulls.apply(_a, args);
    };
    QueryInstance.prototype.jsonbToRecord = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbToRecord.apply(_a, args);
    };
    QueryInstance.prototype.jsonbToRecordset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbToRecordset.apply(_a, args);
    };
    QueryInstance.prototype.jsonbToTsvector = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbToTsvector.apply(_a, args);
    };
    QueryInstance.prototype.jsonbTypeof = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonbTypeof.apply(_a, args);
    };
    QueryInstance.prototype.jsonBuildArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonBuildArray.apply(_a, args);
    };
    QueryInstance.prototype.jsonBuildObject = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonBuildObject.apply(_a, args);
    };
    QueryInstance.prototype.jsonEach = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonEach.apply(_a, args);
    };
    QueryInstance.prototype.jsonEachText = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonEachText.apply(_a, args);
    };
    QueryInstance.prototype.jsonExists = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonExists.apply(_a, args);
    };
    QueryInstance.prototype.jsonExtractPath = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonExtractPath.apply(_a, args);
    };
    QueryInstance.prototype.jsonExtractPathText = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonExtractPathText.apply(_a, args);
    };
    QueryInstance.prototype.jsonObject = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonObject.apply(_a, args);
    };
    QueryInstance.prototype.jsonObjectagg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonObjectagg.apply(_a, args);
    };
    QueryInstance.prototype.jsonObjectAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonObjectAgg.apply(_a, args);
    };
    QueryInstance.prototype.jsonObjectAggStrict = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonObjectAggStrict.apply(_a, args);
    };
    QueryInstance.prototype.jsonObjectAggUnique = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonObjectAggUnique.apply(_a, args);
    };
    QueryInstance.prototype.jsonObjectAggUniqueStrict = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonObjectAggUniqueStrict.apply(_a, args);
    };
    QueryInstance.prototype.jsonObjectKeys = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonObjectKeys.apply(_a, args);
    };
    QueryInstance.prototype.jsonPopulateRecord = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonPopulateRecord.apply(_a, args);
    };
    QueryInstance.prototype.jsonPopulateRecordset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonPopulateRecordset.apply(_a, args);
    };
    QueryInstance.prototype.jsonQuery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonQuery.apply(_a, args);
    };
    QueryInstance.prototype.jsonScalar = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonScalar.apply(_a, args);
    };
    QueryInstance.prototype.jsonSerialize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonSerialize.apply(_a, args);
    };
    QueryInstance.prototype.jsonStripNulls = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonStripNulls.apply(_a, args);
    };
    QueryInstance.prototype.jsonTable = function () {
        return (new QueryBuilder(this)).jsonTable();
    };
    QueryInstance.prototype.jsonTablePrimitive = function () {
        return (new QueryBuilder(this)).jsonTablePrimitive();
    };
    QueryInstance.prototype.jsonToRecord = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonToRecord.apply(_a, args);
    };
    QueryInstance.prototype.jsonToRecordset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonToRecordset.apply(_a, args);
    };
    QueryInstance.prototype.jsonToTsvector = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonToTsvector.apply(_a, args);
    };
    QueryInstance.prototype.jsonTypeof = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonTypeof.apply(_a, args);
    };
    QueryInstance.prototype.jsonValue = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).jsonValue.apply(_a, args);
    };
    QueryInstance.prototype.justifyDays = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).justifyDays.apply(_a, args);
    };
    QueryInstance.prototype.justifyHours = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).justifyHours.apply(_a, args);
    };
    QueryInstance.prototype.justifyInterval = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).justifyInterval.apply(_a, args);
    };
    QueryInstance.prototype.k = function () {
        return (new QueryBuilder(this)).k();
    };
    QueryInstance.prototype.keep = function () {
        return (new QueryBuilder(this)).keep();
    };
    QueryInstance.prototype.key = function () {
        return (new QueryBuilder(this)).key();
    };
    QueryInstance.prototype.keyMember = function () {
        return (new QueryBuilder(this)).keyMember();
    };
    QueryInstance.prototype.keys = function () {
        return (new QueryBuilder(this)).keys();
    };
    QueryInstance.prototype.keyType = function () {
        return (new QueryBuilder(this)).keyType();
    };
    QueryInstance.prototype.l = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).l.apply(_a, args);
    };
    QueryInstance.prototype.label = function () {
        return (new QueryBuilder(this)).label();
    };
    QueryInstance.prototype.lag = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lag.apply(_a, args);
    };
    QueryInstance.prototype.language = function () {
        return (new QueryBuilder(this)).language();
    };
    QueryInstance.prototype.large = function () {
        return (new QueryBuilder(this)).large();
    };
    QueryInstance.prototype.last = function () {
        return (new QueryBuilder(this)).last();
    };
    QueryInstance.prototype.lastval = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lastval.apply(_a, args);
    };
    QueryInstance.prototype.lastValue = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lastValue.apply(_a, args);
    };
    QueryInstance.prototype.lateral = function () {
        return (new QueryBuilder(this)).lateral();
    };
    QueryInstance.prototype.lcm = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lcm.apply(_a, args);
    };
    QueryInstance.prototype.lead = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lead.apply(_a, args);
    };
    QueryInstance.prototype.leading = function () {
        return (new QueryBuilder(this)).leading();
    };
    QueryInstance.prototype.leakproof = function () {
        return (new QueryBuilder(this)).leakproof();
    };
    QueryInstance.prototype.least = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).least.apply(_a, args);
    };
    QueryInstance.prototype.left = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).left.apply(_a, args);
    };
    QueryInstance.prototype.leftJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).leftJoin.apply(_a, args);
    };
    QueryInstance.prototype.leftJoinLateral = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).leftJoinLateral.apply(_a, args);
    };
    QueryInstance.prototype.length = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).length.apply(_a, args);
    };
    QueryInstance.prototype.level = function () {
        return (new QueryBuilder(this)).level();
    };
    QueryInstance.prototype.lgamma = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lgamma.apply(_a, args);
    };
    QueryInstance.prototype.library = function () {
        return (new QueryBuilder(this)).library();
    };
    QueryInstance.prototype.like = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).like.apply(_a, args);
    };
    QueryInstance.prototype.likeRegex = function () {
        return (new QueryBuilder(this)).likeRegex();
    };
    QueryInstance.prototype.limit = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).limit.apply(_a, args);
    };
    QueryInstance.prototype.line = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).line.apply(_a, args);
    };
    QueryInstance.prototype.link = function () {
        return (new QueryBuilder(this)).link();
    };
    QueryInstance.prototype.listagg = function () {
        return (new QueryBuilder(this)).listagg();
    };
    QueryInstance.prototype.listen = function () {
        return (new QueryBuilder(this)).listen();
    };
    QueryInstance.prototype.literal = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).literal.apply(_a, args);
    };
    QueryInstance.prototype.literalArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).literalArray.apply(_a, args);
    };
    QueryInstance.prototype.ln = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ln.apply(_a, args);
    };
    QueryInstance.prototype.load = function () {
        return (new QueryBuilder(this)).load();
    };
    QueryInstance.prototype.local = function () {
        return (new QueryBuilder(this)).local();
    };
    QueryInstance.prototype.localtime = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).localtime.apply(_a, args);
    };
    QueryInstance.prototype.localtimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).localtimestamp.apply(_a, args);
    };
    QueryInstance.prototype.location = function () {
        return (new QueryBuilder(this)).location();
    };
    QueryInstance.prototype.locator = function () {
        return (new QueryBuilder(this)).locator();
    };
    QueryInstance.prototype.lock = function () {
        return (new QueryBuilder(this)).lock();
    };
    QueryInstance.prototype.locked = function () {
        return (new QueryBuilder(this)).locked();
    };
    QueryInstance.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).log.apply(_a, args);
    };
    QueryInstance.prototype.log10 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).log10.apply(_a, args);
    };
    QueryInstance.prototype.logged = function () {
        return (new QueryBuilder(this)).logged();
    };
    QueryInstance.prototype.lower = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lower.apply(_a, args);
    };
    QueryInstance.prototype.lowerInc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lowerInc.apply(_a, args);
    };
    QueryInstance.prototype.lowerInf = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lowerInf.apply(_a, args);
    };
    QueryInstance.prototype.lpad = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lpad.apply(_a, args);
    };
    QueryInstance.prototype.lseg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lseg.apply(_a, args);
    };
    QueryInstance.prototype.lt = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lt.apply(_a, args);
    };
    QueryInstance.prototype.lte = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).lte.apply(_a, args);
    };
    QueryInstance.prototype.ltrim = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ltrim.apply(_a, args);
    };
    QueryInstance.prototype.m = function () {
        return (new QueryBuilder(this)).m();
    };
    QueryInstance.prototype.macaddr8Set7bit = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).macaddr8Set7bit.apply(_a, args);
    };
    QueryInstance.prototype.makeaclitem = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).makeaclitem.apply(_a, args);
    };
    QueryInstance.prototype.makeDate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).makeDate.apply(_a, args);
    };
    QueryInstance.prototype.makeInterval = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).makeInterval.apply(_a, args);
    };
    QueryInstance.prototype.makeTime = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).makeTime.apply(_a, args);
    };
    QueryInstance.prototype.makeTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).makeTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.makeTimestamptz = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).makeTimestamptz.apply(_a, args);
    };
    QueryInstance.prototype.map = function () {
        return (new QueryBuilder(this)).map();
    };
    QueryInstance.prototype.mapping = function () {
        return (new QueryBuilder(this)).mapping();
    };
    QueryInstance.prototype.masklen = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).masklen.apply(_a, args);
    };
    QueryInstance.prototype.match = function () {
        return (new QueryBuilder(this)).match();
    };
    QueryInstance.prototype.matched = function () {
        return (new QueryBuilder(this)).matched();
    };
    QueryInstance.prototype.matches = function () {
        return (new QueryBuilder(this)).matches();
    };
    QueryInstance.prototype.matchNumber = function () {
        return (new QueryBuilder(this)).matchNumber();
    };
    QueryInstance.prototype.matchRecognize = function () {
        return (new QueryBuilder(this)).matchRecognize();
    };
    QueryInstance.prototype.matchRegex = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).matchRegex.apply(_a, args);
    };
    QueryInstance.prototype.matchRegexInsensitive = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).matchRegexInsensitive.apply(_a, args);
    };
    QueryInstance.prototype.materialized = function () {
        return (new QueryBuilder(this)).materialized();
    };
    QueryInstance.prototype.max = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).max.apply(_a, args);
    };
    QueryInstance.prototype.maxvalue = function () {
        return (new QueryBuilder(this)).maxvalue();
    };
    QueryInstance.prototype.md5 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).md5.apply(_a, args);
    };
    QueryInstance.prototype.measures = function () {
        return (new QueryBuilder(this)).measures();
    };
    QueryInstance.prototype.member = function () {
        return (new QueryBuilder(this)).member();
    };
    QueryInstance.prototype.merge = function () {
        return (new QueryBuilder(this)).merge();
    };
    QueryInstance.prototype.mergeAction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).mergeAction.apply(_a, args);
    };
    QueryInstance.prototype.messageLength = function () {
        return (new QueryBuilder(this)).messageLength();
    };
    QueryInstance.prototype.messageOctetLength = function () {
        return (new QueryBuilder(this)).messageOctetLength();
    };
    QueryInstance.prototype.messageText = function () {
        return (new QueryBuilder(this)).messageText();
    };
    QueryInstance.prototype.method = function () {
        return (new QueryBuilder(this)).method();
    };
    QueryInstance.prototype.middle = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).middle.apply(_a, args);
    };
    QueryInstance.prototype.min = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).min.apply(_a, args);
    };
    QueryInstance.prototype.minScale = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).minScale.apply(_a, args);
    };
    QueryInstance.prototype.minus = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).minus.apply(_a, args);
    };
    QueryInstance.prototype.minute = function () {
        return (new QueryBuilder(this)).minute();
    };
    QueryInstance.prototype.minvalue = function () {
        return (new QueryBuilder(this)).minvalue();
    };
    QueryInstance.prototype.mod = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).mod.apply(_a, args);
    };
    QueryInstance.prototype.mode = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).mode.apply(_a, args);
    };
    QueryInstance.prototype.modifies = function () {
        return (new QueryBuilder(this)).modifies();
    };
    QueryInstance.prototype.module = function () {
        return (new QueryBuilder(this)).module();
    };
    QueryInstance.prototype.modulo = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).modulo.apply(_a, args);
    };
    QueryInstance.prototype.month = function () {
        return (new QueryBuilder(this)).month();
    };
    QueryInstance.prototype.more = function () {
        return (new QueryBuilder(this)).more();
    };
    QueryInstance.prototype.move = function () {
        return (new QueryBuilder(this)).move();
    };
    QueryInstance.prototype.multiply = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).multiply.apply(_a, args);
    };
    QueryInstance.prototype.multirange = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).multirange.apply(_a, args);
    };
    QueryInstance.prototype.multiset = function () {
        return (new QueryBuilder(this)).multiset();
    };
    QueryInstance.prototype.mumps = function () {
        return (new QueryBuilder(this)).mumps();
    };
    QueryInstance.prototype.mxidAge = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).mxidAge.apply(_a, args);
    };
    QueryInstance.prototype.name = function () {
        return (new QueryBuilder(this)).name();
    };
    QueryInstance.prototype.names = function () {
        return (new QueryBuilder(this)).names();
    };
    QueryInstance.prototype.namespace = function () {
        return (new QueryBuilder(this)).namespace();
    };
    QueryInstance.prototype.national = function () {
        return (new QueryBuilder(this)).national();
    };
    QueryInstance.prototype.natural = function () {
        return (new QueryBuilder(this)).natural();
    };
    QueryInstance.prototype.naturalCrossJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).naturalCrossJoin.apply(_a, args);
    };
    QueryInstance.prototype.naturalFullJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).naturalFullJoin.apply(_a, args);
    };
    QueryInstance.prototype.naturalInnerJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).naturalInnerJoin.apply(_a, args);
    };
    QueryInstance.prototype.naturalJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).naturalJoin.apply(_a, args);
    };
    QueryInstance.prototype.naturalLeftJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).naturalLeftJoin.apply(_a, args);
    };
    QueryInstance.prototype.naturalRightJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).naturalRightJoin.apply(_a, args);
    };
    QueryInstance.prototype.nchar = function () {
        return (new QueryBuilder(this)).nchar();
    };
    QueryInstance.prototype.nclob = function () {
        return (new QueryBuilder(this)).nclob();
    };
    QueryInstance.prototype.ne = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ne.apply(_a, args);
    };
    QueryInstance.prototype.nested = function () {
        return (new QueryBuilder(this)).nested();
    };
    QueryInstance.prototype.nesting = function () {
        return (new QueryBuilder(this)).nesting();
    };
    QueryInstance.prototype.netmask = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).netmask.apply(_a, args);
    };
    QueryInstance.prototype.network = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).network.apply(_a, args);
    };
    QueryInstance.prototype.new = function () {
        return (new QueryBuilder(this)).new();
    };
    QueryInstance.prototype.next = function () {
        return (new QueryBuilder(this)).next();
    };
    QueryInstance.prototype.nextval = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).nextval.apply(_a, args);
    };
    QueryInstance.prototype.nfc = function () {
        return (new QueryBuilder(this)).nfc();
    };
    QueryInstance.prototype.nfd = function () {
        return (new QueryBuilder(this)).nfd();
    };
    QueryInstance.prototype.nfkc = function () {
        return (new QueryBuilder(this)).nfkc();
    };
    QueryInstance.prototype.nfkd = function () {
        return (new QueryBuilder(this)).nfkd();
    };
    QueryInstance.prototype.nil = function () {
        return (new QueryBuilder(this)).nil();
    };
    QueryInstance.prototype.no = function () {
        return (new QueryBuilder(this)).no();
    };
    QueryInstance.prototype.none = function () {
        return (new QueryBuilder(this)).none();
    };
    QueryInstance.prototype.normalize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).normalize.apply(_a, args);
    };
    QueryInstance.prototype.normalized = function () {
        return (new QueryBuilder(this)).normalized();
    };
    QueryInstance.prototype.not = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).not.apply(_a, args);
    };
    QueryInstance.prototype.notBetween = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notBetween.apply(_a, args);
    };
    QueryInstance.prototype.notBetweenSymmetric = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notBetweenSymmetric.apply(_a, args);
    };
    QueryInstance.prototype.notEq = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notEq.apply(_a, args);
    };
    QueryInstance.prototype.notExists = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notExists.apply(_a, args);
    };
    QueryInstance.prototype.notExtendAbove = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notExtendAbove.apply(_a, args);
    };
    QueryInstance.prototype.notExtendBelow = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notExtendBelow.apply(_a, args);
    };
    QueryInstance.prototype.notExtendLeft = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notExtendLeft.apply(_a, args);
    };
    QueryInstance.prototype.notExtendRight = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notExtendRight.apply(_a, args);
    };
    QueryInstance.prototype.nothing = function () {
        return (new QueryBuilder(this)).nothing();
    };
    QueryInstance.prototype.notify = function () {
        return (new QueryBuilder(this)).notify();
    };
    QueryInstance.prototype.notIlike = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notIlike.apply(_a, args);
    };
    QueryInstance.prototype.notIn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notIn.apply(_a, args);
    };
    QueryInstance.prototype.notLike = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notLike.apply(_a, args);
    };
    QueryInstance.prototype.notMatchRegex = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notMatchRegex.apply(_a, args);
    };
    QueryInstance.prototype.notMatchRegexInsensitive = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notMatchRegexInsensitive.apply(_a, args);
    };
    QueryInstance.prototype.notnull = function () {
        return (new QueryBuilder(this)).notnull();
    };
    QueryInstance.prototype.notSimilarTo = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).notSimilarTo.apply(_a, args);
    };
    QueryInstance.prototype.now = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).now.apply(_a, args);
    };
    QueryInstance.prototype.nowait = function () {
        return (new QueryBuilder(this)).nowait();
    };
    QueryInstance.prototype.npoints = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).npoints.apply(_a, args);
    };
    QueryInstance.prototype.nthValue = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).nthValue.apply(_a, args);
    };
    QueryInstance.prototype.ntile = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).ntile.apply(_a, args);
    };
    QueryInstance.prototype.null = function () {
        return (new QueryBuilder(this)).null();
    };
    QueryInstance.prototype.nullable = function () {
        return (new QueryBuilder(this)).nullable();
    };
    QueryInstance.prototype.nullif = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).nullif.apply(_a, args);
    };
    QueryInstance.prototype.nullOrdering = function () {
        return (new QueryBuilder(this)).nullOrdering();
    };
    QueryInstance.prototype.nulls = function () {
        return (new QueryBuilder(this)).nulls();
    };
    QueryInstance.prototype.nullsFirst = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).nullsFirst.apply(_a, args);
    };
    QueryInstance.prototype.nullsLast = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).nullsLast.apply(_a, args);
    };
    QueryInstance.prototype.number = function () {
        return (new QueryBuilder(this)).number();
    };
    QueryInstance.prototype.numeric = function () {
        return (new QueryBuilder(this)).numeric();
    };
    QueryInstance.prototype.numnode = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).numnode.apply(_a, args);
    };
    QueryInstance.prototype.objDescription = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).objDescription.apply(_a, args);
    };
    QueryInstance.prototype.object = function () {
        return (new QueryBuilder(this)).object();
    };
    QueryInstance.prototype.objects = function () {
        return (new QueryBuilder(this)).objects();
    };
    QueryInstance.prototype.occurrence = function () {
        return (new QueryBuilder(this)).occurrence();
    };
    QueryInstance.prototype.occurrencesRegex = function () {
        return (new QueryBuilder(this)).occurrencesRegex();
    };
    QueryInstance.prototype.octetLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).octetLength.apply(_a, args);
    };
    QueryInstance.prototype.octets = function () {
        return (new QueryBuilder(this)).octets();
    };
    QueryInstance.prototype.of = function () {
        return (new QueryBuilder(this)).of();
    };
    QueryInstance.prototype.off = function () {
        return (new QueryBuilder(this)).off();
    };
    QueryInstance.prototype.offset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).offset.apply(_a, args);
    };
    QueryInstance.prototype.oids = function () {
        return (new QueryBuilder(this)).oids();
    };
    QueryInstance.prototype.old = function () {
        return (new QueryBuilder(this)).old();
    };
    QueryInstance.prototype.omit = function () {
        return (new QueryBuilder(this)).omit();
    };
    QueryInstance.prototype.on = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).on.apply(_a, args);
    };
    QueryInstance.prototype.onConflict = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).onConflict.apply(_a, args);
    };
    QueryInstance.prototype.onConflictDoNothing = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).onConflictDoNothing.apply(_a, args);
    };
    QueryInstance.prototype.onConflictDoUpdate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).onConflictDoUpdate.apply(_a, args);
    };
    QueryInstance.prototype.onConstraint = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).onConstraint.apply(_a, args);
    };
    QueryInstance.prototype.one = function () {
        return (new QueryBuilder(this)).one();
    };
    QueryInstance.prototype.only = function () {
        return (new QueryBuilder(this)).only();
    };
    QueryInstance.prototype.op = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).op.apply(_a, args);
    };
    QueryInstance.prototype.open = function () {
        return (new QueryBuilder(this)).open();
    };
    QueryInstance.prototype.operator = function () {
        return (new QueryBuilder(this)).operator();
    };
    QueryInstance.prototype.option = function () {
        return (new QueryBuilder(this)).option();
    };
    QueryInstance.prototype.options = function () {
        return (new QueryBuilder(this)).options();
    };
    QueryInstance.prototype.or = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).or.apply(_a, args);
    };
    QueryInstance.prototype.order = function () {
        return (new QueryBuilder(this)).order();
    };
    QueryInstance.prototype.orderBy = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).orderBy.apply(_a, args);
    };
    QueryInstance.prototype.ordering = function () {
        return (new QueryBuilder(this)).ordering();
    };
    QueryInstance.prototype.ordinality = function () {
        return (new QueryBuilder(this)).ordinality();
    };
    QueryInstance.prototype.others = function () {
        return (new QueryBuilder(this)).others();
    };
    QueryInstance.prototype.out = function () {
        return (new QueryBuilder(this)).out();
    };
    QueryInstance.prototype.outer = function () {
        return (new QueryBuilder(this)).outer();
    };
    QueryInstance.prototype.output = function () {
        return (new QueryBuilder(this)).output();
    };
    QueryInstance.prototype.over = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).over.apply(_a, args);
    };
    QueryInstance.prototype.overflow = function () {
        return (new QueryBuilder(this)).overflow();
    };
    QueryInstance.prototype.overlaps = function () {
        return (new QueryBuilder(this)).overlaps();
    };
    QueryInstance.prototype.overlay = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).overlay.apply(_a, args);
    };
    QueryInstance.prototype.overriding = function () {
        return (new QueryBuilder(this)).overriding();
    };
    QueryInstance.prototype.owned = function () {
        return (new QueryBuilder(this)).owned();
    };
    QueryInstance.prototype.owner = function () {
        return (new QueryBuilder(this)).owner();
    };
    QueryInstance.prototype.p = function () {
        return (new QueryBuilder(this)).p();
    };
    QueryInstance.prototype.pad = function () {
        return (new QueryBuilder(this)).pad();
    };
    QueryInstance.prototype.parallel = function () {
        return (new QueryBuilder(this)).parallel();
    };
    QueryInstance.prototype.parameter = function () {
        return (new QueryBuilder(this)).parameter();
    };
    QueryInstance.prototype.parameterMode = function () {
        return (new QueryBuilder(this)).parameterMode();
    };
    QueryInstance.prototype.parameterName = function () {
        return (new QueryBuilder(this)).parameterName();
    };
    QueryInstance.prototype.parameterordinalposition = function () {
        return (new QueryBuilder(this)).parameterordinalposition();
    };
    QueryInstance.prototype.parameterspecificcatalog = function () {
        return (new QueryBuilder(this)).parameterspecificcatalog();
    };
    QueryInstance.prototype.parameterspecificname = function () {
        return (new QueryBuilder(this)).parameterspecificname();
    };
    QueryInstance.prototype.parameterspecificschema = function () {
        return (new QueryBuilder(this)).parameterspecificschema();
    };
    QueryInstance.prototype.parseIdent = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).parseIdent.apply(_a, args);
    };
    QueryInstance.prototype.parser = function () {
        return (new QueryBuilder(this)).parser();
    };
    QueryInstance.prototype.partial = function () {
        return (new QueryBuilder(this)).partial();
    };
    QueryInstance.prototype.partition = function () {
        return (new QueryBuilder(this)).partition();
    };
    QueryInstance.prototype.partitionBy = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).partitionBy.apply(_a, args);
    };
    QueryInstance.prototype.pascal = function () {
        return (new QueryBuilder(this)).pascal();
    };
    QueryInstance.prototype.pass = function () {
        return (new QueryBuilder(this)).pass();
    };
    QueryInstance.prototype.passing = function () {
        return (new QueryBuilder(this)).passing();
    };
    QueryInstance.prototype.passthrough = function () {
        return (new QueryBuilder(this)).passthrough();
    };
    QueryInstance.prototype.password = function () {
        return (new QueryBuilder(this)).password();
    };
    QueryInstance.prototype.past = function () {
        return (new QueryBuilder(this)).past();
    };
    QueryInstance.prototype.path = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).path.apply(_a, args);
    };
    QueryInstance.prototype.pattern = function () {
        return (new QueryBuilder(this)).pattern();
    };
    QueryInstance.prototype.pclose = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pclose.apply(_a, args);
    };
    QueryInstance.prototype.per = function () {
        return (new QueryBuilder(this)).per();
    };
    QueryInstance.prototype.percent = function () {
        return (new QueryBuilder(this)).percent();
    };
    QueryInstance.prototype.percentCharacter = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).percentCharacter.apply(_a, args);
    };
    QueryInstance.prototype.percentileCont = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).percentileCont.apply(_a, args);
    };
    QueryInstance.prototype.percentileDisc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).percentileDisc.apply(_a, args);
    };
    QueryInstance.prototype.percentRank = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).percentRank.apply(_a, args);
    };
    QueryInstance.prototype.period = function () {
        return (new QueryBuilder(this)).period();
    };
    QueryInstance.prototype.permission = function () {
        return (new QueryBuilder(this)).permission();
    };
    QueryInstance.prototype.permute = function () {
        return (new QueryBuilder(this)).permute();
    };
    QueryInstance.prototype.perpendicular = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).perpendicular.apply(_a, args);
    };
    QueryInstance.prototype.pgAdvisoryLock = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAdvisoryLock.apply(_a, args);
    };
    QueryInstance.prototype.pgAdvisoryLockShared = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAdvisoryLockShared.apply(_a, args);
    };
    QueryInstance.prototype.pgAdvisoryUnlock = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAdvisoryUnlock.apply(_a, args);
    };
    QueryInstance.prototype.pgAdvisoryUnlockAll = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAdvisoryUnlockAll.apply(_a, args);
    };
    QueryInstance.prototype.pgAdvisoryUnlockShared = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAdvisoryUnlockShared.apply(_a, args);
    };
    QueryInstance.prototype.pgAdvisoryXactLock = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAdvisoryXactLock.apply(_a, args);
    };
    QueryInstance.prototype.pgAdvisoryXactLockShared = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAdvisoryXactLockShared.apply(_a, args);
    };
    QueryInstance.prototype.pgAvailableWalSummaries = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgAvailableWalSummaries.apply(_a, args);
    };
    QueryInstance.prototype.pgBackendPid = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgBackendPid.apply(_a, args);
    };
    QueryInstance.prototype.pgBackupStart = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgBackupStart.apply(_a, args);
    };
    QueryInstance.prototype.pgBackupStop = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgBackupStop.apply(_a, args);
    };
    QueryInstance.prototype.pgBasetype = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgBasetype.apply(_a, args);
    };
    QueryInstance.prototype.pgBlockingPids = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgBlockingPids.apply(_a, args);
    };
    QueryInstance.prototype.pgCancelBackend = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCancelBackend.apply(_a, args);
    };
    QueryInstance.prototype.pgCharToEncoding = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCharToEncoding.apply(_a, args);
    };
    QueryInstance.prototype.pgClearAttributeStats = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgClearAttributeStats.apply(_a, args);
    };
    QueryInstance.prototype.pgClearRelationStats = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgClearRelationStats.apply(_a, args);
    };
    QueryInstance.prototype.pgClientEncoding = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgClientEncoding.apply(_a, args);
    };
    QueryInstance.prototype.pgCollationActualVersion = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCollationActualVersion.apply(_a, args);
    };
    QueryInstance.prototype.pgCollationIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCollationIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgColumnCompression = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgColumnCompression.apply(_a, args);
    };
    QueryInstance.prototype.pgColumnSize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgColumnSize.apply(_a, args);
    };
    QueryInstance.prototype.pgColumnToastChunkId = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgColumnToastChunkId.apply(_a, args);
    };
    QueryInstance.prototype.pgConfLoadTime = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgConfLoadTime.apply(_a, args);
    };
    QueryInstance.prototype.pgControlCheckpoint = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgControlCheckpoint.apply(_a, args);
    };
    QueryInstance.prototype.pgControlInit = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgControlInit.apply(_a, args);
    };
    QueryInstance.prototype.pgControlRecovery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgControlRecovery.apply(_a, args);
    };
    QueryInstance.prototype.pgControlSystem = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgControlSystem.apply(_a, args);
    };
    QueryInstance.prototype.pgConversionIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgConversionIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgCopyLogicalReplicationSlot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCopyLogicalReplicationSlot.apply(_a, args);
    };
    QueryInstance.prototype.pgCopyPhysicalReplicationSlot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCopyPhysicalReplicationSlot.apply(_a, args);
    };
    QueryInstance.prototype.pgCreateLogicalReplicationSlot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCreateLogicalReplicationSlot.apply(_a, args);
    };
    QueryInstance.prototype.pgCreatePhysicalReplicationSlot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCreatePhysicalReplicationSlot.apply(_a, args);
    };
    QueryInstance.prototype.pgCreateRestorePoint = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCreateRestorePoint.apply(_a, args);
    };
    QueryInstance.prototype.pgCurrentLogfile = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCurrentLogfile.apply(_a, args);
    };
    QueryInstance.prototype.pgCurrentSnapshot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCurrentSnapshot.apply(_a, args);
    };
    QueryInstance.prototype.pgCurrentWalFlushLsn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCurrentWalFlushLsn.apply(_a, args);
    };
    QueryInstance.prototype.pgCurrentWalInsertLsn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCurrentWalInsertLsn.apply(_a, args);
    };
    QueryInstance.prototype.pgCurrentWalLsn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCurrentWalLsn.apply(_a, args);
    };
    QueryInstance.prototype.pgCurrentXactId = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCurrentXactId.apply(_a, args);
    };
    QueryInstance.prototype.pgCurrentXactIdIfAssigned = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgCurrentXactIdIfAssigned.apply(_a, args);
    };
    QueryInstance.prototype.pgDatabaseCollationActualVersion = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgDatabaseCollationActualVersion.apply(_a, args);
    };
    QueryInstance.prototype.pgDatabaseSize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgDatabaseSize.apply(_a, args);
    };
    QueryInstance.prototype.pgDescribeObject = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgDescribeObject.apply(_a, args);
    };
    QueryInstance.prototype.pgDropReplicationSlot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgDropReplicationSlot.apply(_a, args);
    };
    QueryInstance.prototype.pgEncodingToChar = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgEncodingToChar.apply(_a, args);
    };
    QueryInstance.prototype.pgEventTriggerDdlCommands = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgEventTriggerDdlCommands.apply(_a, args);
    };
    QueryInstance.prototype.pgEventTriggerDroppedObjects = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgEventTriggerDroppedObjects.apply(_a, args);
    };
    QueryInstance.prototype.pgEventTriggerTableRewriteOid = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgEventTriggerTableRewriteOid.apply(_a, args);
    };
    QueryInstance.prototype.pgEventTriggerTableRewriteReason = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgEventTriggerTableRewriteReason.apply(_a, args);
    };
    QueryInstance.prototype.pgExportSnapshot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgExportSnapshot.apply(_a, args);
    };
    QueryInstance.prototype.pgFilenodeRelation = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgFilenodeRelation.apply(_a, args);
    };
    QueryInstance.prototype.pgFunctionIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgFunctionIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgGetAcl = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetAcl.apply(_a, args);
    };
    QueryInstance.prototype.pgGetCatalogForeignKeys = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetCatalogForeignKeys.apply(_a, args);
    };
    QueryInstance.prototype.pgGetConstraintdef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetConstraintdef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetExpr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetExpr.apply(_a, args);
    };
    QueryInstance.prototype.pgGetFunctionArguments = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetFunctionArguments.apply(_a, args);
    };
    QueryInstance.prototype.pgGetFunctiondef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetFunctiondef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetFunctionIdentityArguments = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetFunctionIdentityArguments.apply(_a, args);
    };
    QueryInstance.prototype.pgGetFunctionResult = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetFunctionResult.apply(_a, args);
    };
    QueryInstance.prototype.pgGetIndexdef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetIndexdef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetKeywords = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetKeywords.apply(_a, args);
    };
    QueryInstance.prototype.pgGetLoadedModules = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetLoadedModules.apply(_a, args);
    };
    QueryInstance.prototype.pgGetMultixactMembers = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetMultixactMembers.apply(_a, args);
    };
    QueryInstance.prototype.pgGetObjectAddress = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetObjectAddress.apply(_a, args);
    };
    QueryInstance.prototype.pgGetPartitionConstraintdef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetPartitionConstraintdef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetPartkeydef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetPartkeydef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetRuledef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetRuledef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetSerialSequence = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetSerialSequence.apply(_a, args);
    };
    QueryInstance.prototype.pgGetStatisticsobjdef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetStatisticsobjdef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetTriggerdef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetTriggerdef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetUserbyid = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetUserbyid.apply(_a, args);
    };
    QueryInstance.prototype.pgGetViewdef = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetViewdef.apply(_a, args);
    };
    QueryInstance.prototype.pgGetWalReplayPauseState = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetWalReplayPauseState.apply(_a, args);
    };
    QueryInstance.prototype.pgGetWalResourceManagers = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetWalResourceManagers.apply(_a, args);
    };
    QueryInstance.prototype.pgGetWalSummarizerState = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgGetWalSummarizerState.apply(_a, args);
    };
    QueryInstance.prototype.pgHasRole = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgHasRole.apply(_a, args);
    };
    QueryInstance.prototype.pgIdentifyObject = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIdentifyObject.apply(_a, args);
    };
    QueryInstance.prototype.pgIdentifyObjectAsAddress = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIdentifyObjectAsAddress.apply(_a, args);
    };
    QueryInstance.prototype.pgImportSystemCollations = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgImportSystemCollations.apply(_a, args);
    };
    QueryInstance.prototype.pgIndexamHasProperty = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIndexamHasProperty.apply(_a, args);
    };
    QueryInstance.prototype.pgIndexColumnHasProperty = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIndexColumnHasProperty.apply(_a, args);
    };
    QueryInstance.prototype.pgIndexesSize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIndexesSize.apply(_a, args);
    };
    QueryInstance.prototype.pgIndexHasProperty = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIndexHasProperty.apply(_a, args);
    };
    QueryInstance.prototype.pgInputErrorInfo = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgInputErrorInfo.apply(_a, args);
    };
    QueryInstance.prototype.pgInputIsValid = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgInputIsValid.apply(_a, args);
    };
    QueryInstance.prototype.pgIsInRecovery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIsInRecovery.apply(_a, args);
    };
    QueryInstance.prototype.pgIsOtherTempSchema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIsOtherTempSchema.apply(_a, args);
    };
    QueryInstance.prototype.pgIsWalReplayPaused = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgIsWalReplayPaused.apply(_a, args);
    };
    QueryInstance.prototype.pgJitAvailable = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgJitAvailable.apply(_a, args);
    };
    QueryInstance.prototype.pgLastCommittedXact = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLastCommittedXact.apply(_a, args);
    };
    QueryInstance.prototype.pgLastWalReceiveLsn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLastWalReceiveLsn.apply(_a, args);
    };
    QueryInstance.prototype.pgLastWalReplayLsn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLastWalReplayLsn.apply(_a, args);
    };
    QueryInstance.prototype.pgLastXactReplayTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLastXactReplayTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.pgListeningChannels = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgListeningChannels.apply(_a, args);
    };
    QueryInstance.prototype.pgLogBackendMemoryContexts = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLogBackendMemoryContexts.apply(_a, args);
    };
    QueryInstance.prototype.pgLogicalEmitMessage = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLogicalEmitMessage.apply(_a, args);
    };
    QueryInstance.prototype.pgLogicalSlotGetBinaryChanges = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLogicalSlotGetBinaryChanges.apply(_a, args);
    };
    QueryInstance.prototype.pgLogicalSlotGetChanges = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLogicalSlotGetChanges.apply(_a, args);
    };
    QueryInstance.prototype.pgLogicalSlotPeekBinaryChanges = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLogicalSlotPeekBinaryChanges.apply(_a, args);
    };
    QueryInstance.prototype.pgLogicalSlotPeekChanges = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLogicalSlotPeekChanges.apply(_a, args);
    };
    QueryInstance.prototype.pgLogStandbySnapshot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLogStandbySnapshot.apply(_a, args);
    };
    QueryInstance.prototype.pgLsArchiveStatusdir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsArchiveStatusdir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsDir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsDir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsLogdir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsLogdir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsLogicalmapdir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsLogicalmapdir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsLogicalsnapdir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsLogicalsnapdir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsReplslotdir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsReplslotdir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsSummariesdir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsSummariesdir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsTmpdir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsTmpdir.apply(_a, args);
    };
    QueryInstance.prototype.pgLsWaldir = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgLsWaldir.apply(_a, args);
    };
    QueryInstance.prototype.pgMcvListItems = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgMcvListItems.apply(_a, args);
    };
    QueryInstance.prototype.pgMyTempSchema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgMyTempSchema.apply(_a, args);
    };
    QueryInstance.prototype.pgNotificationQueueUsage = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgNotificationQueueUsage.apply(_a, args);
    };
    QueryInstance.prototype.pgNumaAvailable = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgNumaAvailable.apply(_a, args);
    };
    QueryInstance.prototype.pgOpclassIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgOpclassIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgOperatorIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgOperatorIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgOpfamilyIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgOpfamilyIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgOptionsToTable = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgOptionsToTable.apply(_a, args);
    };
    QueryInstance.prototype.pgPartitionAncestors = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgPartitionAncestors.apply(_a, args);
    };
    QueryInstance.prototype.pgPartitionRoot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgPartitionRoot.apply(_a, args);
    };
    QueryInstance.prototype.pgPartitionTree = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgPartitionTree.apply(_a, args);
    };
    QueryInstance.prototype.pgPostmasterStartTime = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgPostmasterStartTime.apply(_a, args);
    };
    QueryInstance.prototype.pgPromote = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgPromote.apply(_a, args);
    };
    QueryInstance.prototype.pgReadBinaryFile = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReadBinaryFile.apply(_a, args);
    };
    QueryInstance.prototype.pgReadFile = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReadFile.apply(_a, args);
    };
    QueryInstance.prototype.pgRelationFilenode = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgRelationFilenode.apply(_a, args);
    };
    QueryInstance.prototype.pgRelationFilepath = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgRelationFilepath.apply(_a, args);
    };
    QueryInstance.prototype.pgRelationSize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgRelationSize.apply(_a, args);
    };
    QueryInstance.prototype.pgReloadConf = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReloadConf.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginAdvance = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginAdvance.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginCreate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginCreate.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginDrop = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginDrop.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginOid = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginOid.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginProgress = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginProgress.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginSessionIsSetup = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginSessionIsSetup.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginSessionProgress = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginSessionProgress.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginSessionReset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginSessionReset.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginSessionSetup = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginSessionSetup.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginXactReset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginXactReset.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationOriginXactSetup = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationOriginXactSetup.apply(_a, args);
    };
    QueryInstance.prototype.pgReplicationSlotAdvance = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgReplicationSlotAdvance.apply(_a, args);
    };
    QueryInstance.prototype.pgRestoreAttributeStats = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgRestoreAttributeStats.apply(_a, args);
    };
    QueryInstance.prototype.pgRestoreRelationStats = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgRestoreRelationStats.apply(_a, args);
    };
    QueryInstance.prototype.pgRotateLogfile = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgRotateLogfile.apply(_a, args);
    };
    QueryInstance.prototype.pgSafeSnapshotBlockingPids = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSafeSnapshotBlockingPids.apply(_a, args);
    };
    QueryInstance.prototype.pgSettingsGetFlags = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSettingsGetFlags.apply(_a, args);
    };
    QueryInstance.prototype.pgSizeBytes = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSizeBytes.apply(_a, args);
    };
    QueryInstance.prototype.pgSizePretty = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSizePretty.apply(_a, args);
    };
    QueryInstance.prototype.pgSleep = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSleep.apply(_a, args);
    };
    QueryInstance.prototype.pgSleepFor = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSleepFor.apply(_a, args);
    };
    QueryInstance.prototype.pgSleepUntil = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSleepUntil.apply(_a, args);
    };
    QueryInstance.prototype.pgSnapshotXip = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSnapshotXip.apply(_a, args);
    };
    QueryInstance.prototype.pgSnapshotXmax = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSnapshotXmax.apply(_a, args);
    };
    QueryInstance.prototype.pgSnapshotXmin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSnapshotXmin.apply(_a, args);
    };
    QueryInstance.prototype.pgSplitWalfileName = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSplitWalfileName.apply(_a, args);
    };
    QueryInstance.prototype.pgStatFile = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgStatFile.apply(_a, args);
    };
    QueryInstance.prototype.pgStatisticsObjIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgStatisticsObjIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgSwitchWal = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSwitchWal.apply(_a, args);
    };
    QueryInstance.prototype.pgSyncReplicationSlots = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgSyncReplicationSlots.apply(_a, args);
    };
    QueryInstance.prototype.pgTableIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTableIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgTableSize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTableSize.apply(_a, args);
    };
    QueryInstance.prototype.pgTablespaceDatabases = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTablespaceDatabases.apply(_a, args);
    };
    QueryInstance.prototype.pgTablespaceLocation = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTablespaceLocation.apply(_a, args);
    };
    QueryInstance.prototype.pgTablespaceSize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTablespaceSize.apply(_a, args);
    };
    QueryInstance.prototype.pgTerminateBackend = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTerminateBackend.apply(_a, args);
    };
    QueryInstance.prototype.pgTotalRelationSize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTotalRelationSize.apply(_a, args);
    };
    QueryInstance.prototype.pgTriggerDepth = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTriggerDepth.apply(_a, args);
    };
    QueryInstance.prototype.pgTryAdvisoryLock = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTryAdvisoryLock.apply(_a, args);
    };
    QueryInstance.prototype.pgTryAdvisoryLockShared = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTryAdvisoryLockShared.apply(_a, args);
    };
    QueryInstance.prototype.pgTryAdvisoryXactLock = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTryAdvisoryXactLock.apply(_a, args);
    };
    QueryInstance.prototype.pgTryAdvisoryXactLockShared = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTryAdvisoryXactLockShared.apply(_a, args);
    };
    QueryInstance.prototype.pgTsConfigIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTsConfigIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgTsDictIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTsDictIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgTsParserIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTsParserIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgTsTemplateIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTsTemplateIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgTypeIsVisible = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTypeIsVisible.apply(_a, args);
    };
    QueryInstance.prototype.pgTypeof = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgTypeof.apply(_a, args);
    };
    QueryInstance.prototype.pgVisibleInSnapshot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgVisibleInSnapshot.apply(_a, args);
    };
    QueryInstance.prototype.pgWalfileName = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgWalfileName.apply(_a, args);
    };
    QueryInstance.prototype.pgWalfileNameOffset = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgWalfileNameOffset.apply(_a, args);
    };
    QueryInstance.prototype.pgWalLsnDiff = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgWalLsnDiff.apply(_a, args);
    };
    QueryInstance.prototype.pgWalReplayPause = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgWalReplayPause.apply(_a, args);
    };
    QueryInstance.prototype.pgWalReplayResume = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgWalReplayResume.apply(_a, args);
    };
    QueryInstance.prototype.pgWalSummaryContents = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgWalSummaryContents.apply(_a, args);
    };
    QueryInstance.prototype.pgXactCommitTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgXactCommitTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.pgXactCommitTimestampOrigin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgXactCommitTimestampOrigin.apply(_a, args);
    };
    QueryInstance.prototype.pgXactStatus = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pgXactStatus.apply(_a, args);
    };
    QueryInstance.prototype.phrasetoTsquery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).phrasetoTsquery.apply(_a, args);
    };
    QueryInstance.prototype.pi = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).pi.apply(_a, args);
    };
    QueryInstance.prototype.pipe = function () {
        return (new QueryBuilder(this)).pipe();
    };
    QueryInstance.prototype.placing = function () {
        return (new QueryBuilder(this)).placing();
    };
    QueryInstance.prototype.plaintoTsquery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).plaintoTsquery.apply(_a, args);
    };
    QueryInstance.prototype.plan = function () {
        return (new QueryBuilder(this)).plan();
    };
    QueryInstance.prototype.plans = function () {
        return (new QueryBuilder(this)).plans();
    };
    QueryInstance.prototype.pli = function () {
        return (new QueryBuilder(this)).pli();
    };
    QueryInstance.prototype.plus = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).plus.apply(_a, args);
    };
    QueryInstance.prototype.point = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).point.apply(_a, args);
    };
    QueryInstance.prototype.policy = function () {
        return (new QueryBuilder(this)).policy();
    };
    QueryInstance.prototype.polygon = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).polygon.apply(_a, args);
    };
    QueryInstance.prototype.popen = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).popen.apply(_a, args);
    };
    QueryInstance.prototype.portion = function () {
        return (new QueryBuilder(this)).portion();
    };
    QueryInstance.prototype.position = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).position.apply(_a, args);
    };
    QueryInstance.prototype.positionRegex = function () {
        return (new QueryBuilder(this)).positionRegex();
    };
    QueryInstance.prototype.power = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).power.apply(_a, args);
    };
    QueryInstance.prototype.precedes = function () {
        return (new QueryBuilder(this)).precedes();
    };
    QueryInstance.prototype.preceding = function () {
        return (new QueryBuilder(this)).preceding();
    };
    QueryInstance.prototype.precision = function () {
        return (new QueryBuilder(this)).precision();
    };
    QueryInstance.prototype.prepare = function () {
        return (new QueryBuilder(this)).prepare();
    };
    QueryInstance.prototype.prepared = function () {
        return (new QueryBuilder(this)).prepared();
    };
    QueryInstance.prototype.prepareTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).prepareTransaction.apply(_a, args);
    };
    QueryInstance.prototype.preserve = function () {
        return (new QueryBuilder(this)).preserve();
    };
    QueryInstance.prototype.prev = function () {
        return (new QueryBuilder(this)).prev();
    };
    QueryInstance.prototype.primary = function () {
        return (new QueryBuilder(this)).primary();
    };
    QueryInstance.prototype.prior = function () {
        return (new QueryBuilder(this)).prior();
    };
    QueryInstance.prototype.private = function () {
        return (new QueryBuilder(this)).private();
    };
    QueryInstance.prototype.privileges = function () {
        return (new QueryBuilder(this)).privileges();
    };
    QueryInstance.prototype.procedural = function () {
        return (new QueryBuilder(this)).procedural();
    };
    QueryInstance.prototype.procedure = function () {
        return (new QueryBuilder(this)).procedure();
    };
    QueryInstance.prototype.procedures = function () {
        return (new QueryBuilder(this)).procedures();
    };
    QueryInstance.prototype.program = function () {
        return (new QueryBuilder(this)).program();
    };
    QueryInstance.prototype.prune = function () {
        return (new QueryBuilder(this)).prune();
    };
    QueryInstance.prototype.ptf = function () {
        return (new QueryBuilder(this)).ptf();
    };
    QueryInstance.prototype.public = function () {
        return (new QueryBuilder(this)).public();
    };
    QueryInstance.prototype.publication = function () {
        return (new QueryBuilder(this)).publication();
    };
    QueryInstance.prototype.queryToXml = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).queryToXml.apply(_a, args);
    };
    QueryInstance.prototype.queryToXmlAndXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).queryToXmlAndXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.queryToXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).queryToXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.querytree = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).querytree.apply(_a, args);
    };
    QueryInstance.prototype.quote = function () {
        return (new QueryBuilder(this)).quote();
    };
    QueryInstance.prototype.quoteIdent = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).quoteIdent.apply(_a, args);
    };
    QueryInstance.prototype.quoteLiteral = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).quoteLiteral.apply(_a, args);
    };
    QueryInstance.prototype.quoteNullable = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).quoteNullable.apply(_a, args);
    };
    QueryInstance.prototype.quotes = function () {
        return (new QueryBuilder(this)).quotes();
    };
    QueryInstance.prototype.r = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).r.apply(_a, args);
    };
    QueryInstance.prototype.radians = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).radians.apply(_a, args);
    };
    QueryInstance.prototype.radius = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).radius.apply(_a, args);
    };
    QueryInstance.prototype.random = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).random.apply(_a, args);
    };
    QueryInstance.prototype.randomNormal = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).randomNormal.apply(_a, args);
    };
    QueryInstance.prototype.range = function () {
        return (new QueryBuilder(this)).range();
    };
    QueryInstance.prototype.rangeAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rangeAgg.apply(_a, args);
    };
    QueryInstance.prototype.rangeIntersectAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rangeIntersectAgg.apply(_a, args);
    };
    QueryInstance.prototype.rangeMerge = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rangeMerge.apply(_a, args);
    };
    QueryInstance.prototype.rank = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rank.apply(_a, args);
    };
    QueryInstance.prototype.raw = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).raw.apply(_a, args);
    };
    QueryInstance.prototype.rawString = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rawString.apply(_a, args);
    };
    QueryInstance.prototype.read = function () {
        return (new QueryBuilder(this)).read();
    };
    QueryInstance.prototype.reads = function () {
        return (new QueryBuilder(this)).reads();
    };
    QueryInstance.prototype.real = function () {
        return (new QueryBuilder(this)).real();
    };
    QueryInstance.prototype.reassign = function () {
        return (new QueryBuilder(this)).reassign();
    };
    QueryInstance.prototype.recovery = function () {
        return (new QueryBuilder(this)).recovery();
    };
    QueryInstance.prototype.recursive = function () {
        return (new QueryBuilder(this)).recursive();
    };
    QueryInstance.prototype.ref = function () {
        return (new QueryBuilder(this)).ref();
    };
    QueryInstance.prototype.references = function () {
        return (new QueryBuilder(this)).references();
    };
    QueryInstance.prototype.referencing = function () {
        return (new QueryBuilder(this)).referencing();
    };
    QueryInstance.prototype.refresh = function () {
        return (new QueryBuilder(this)).refresh();
    };
    QueryInstance.prototype.regexpCount = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpCount.apply(_a, args);
    };
    QueryInstance.prototype.regexpInstr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpInstr.apply(_a, args);
    };
    QueryInstance.prototype.regexpLike = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpLike.apply(_a, args);
    };
    QueryInstance.prototype.regexpMatch = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpMatch.apply(_a, args);
    };
    QueryInstance.prototype.regexpMatches = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpMatches.apply(_a, args);
    };
    QueryInstance.prototype.regexpReplace = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpReplace.apply(_a, args);
    };
    QueryInstance.prototype.regexpSplitToArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpSplitToArray.apply(_a, args);
    };
    QueryInstance.prototype.regexpSplitToTable = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpSplitToTable.apply(_a, args);
    };
    QueryInstance.prototype.regexpSubstr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regexpSubstr.apply(_a, args);
    };
    QueryInstance.prototype.regrAvgx = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrAvgx.apply(_a, args);
    };
    QueryInstance.prototype.regrAvgy = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrAvgy.apply(_a, args);
    };
    QueryInstance.prototype.regrCount = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrCount.apply(_a, args);
    };
    QueryInstance.prototype.regrIntercept = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrIntercept.apply(_a, args);
    };
    QueryInstance.prototype.regrR2 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrR2.apply(_a, args);
    };
    QueryInstance.prototype.regrSlope = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrSlope.apply(_a, args);
    };
    QueryInstance.prototype.regrSxx = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrSxx.apply(_a, args);
    };
    QueryInstance.prototype.regrSxy = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrSxy.apply(_a, args);
    };
    QueryInstance.prototype.regrSyy = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).regrSyy.apply(_a, args);
    };
    QueryInstance.prototype.reindex = function () {
        return (new QueryBuilder(this)).reindex();
    };
    QueryInstance.prototype.relative = function () {
        return (new QueryBuilder(this)).relative();
    };
    QueryInstance.prototype.release = function () {
        return (new QueryBuilder(this)).release();
    };
    QueryInstance.prototype.releaseTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).releaseTransaction.apply(_a, args);
    };
    QueryInstance.prototype.rename = function () {
        return (new QueryBuilder(this)).rename();
    };
    QueryInstance.prototype.repeat = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).repeat.apply(_a, args);
    };
    QueryInstance.prototype.repeatable = function () {
        return (new QueryBuilder(this)).repeatable();
    };
    QueryInstance.prototype.replace = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).replace.apply(_a, args);
    };
    QueryInstance.prototype.replica = function () {
        return (new QueryBuilder(this)).replica();
    };
    QueryInstance.prototype.requiring = function () {
        return (new QueryBuilder(this)).requiring();
    };
    QueryInstance.prototype.reset = function () {
        return (new QueryBuilder(this)).reset();
    };
    QueryInstance.prototype.respect = function () {
        return (new QueryBuilder(this)).respect();
    };
    QueryInstance.prototype.restart = function () {
        return (new QueryBuilder(this)).restart();
    };
    QueryInstance.prototype.restore = function () {
        return (new QueryBuilder(this)).restore();
    };
    QueryInstance.prototype.restrict = function () {
        return (new QueryBuilder(this)).restrict();
    };
    QueryInstance.prototype.result = function () {
        return (new QueryBuilder(this)).result();
    };
    QueryInstance.prototype.return = function () {
        return (new QueryBuilder(this)).return();
    };
    QueryInstance.prototype.returnedCardinality = function () {
        return (new QueryBuilder(this)).returnedCardinality();
    };
    QueryInstance.prototype.returnedLength = function () {
        return (new QueryBuilder(this)).returnedLength();
    };
    QueryInstance.prototype.returnedoctetlength = function () {
        return (new QueryBuilder(this)).returnedoctetlength();
    };
    QueryInstance.prototype.returnedSqlstate = function () {
        return (new QueryBuilder(this)).returnedSqlstate();
    };
    QueryInstance.prototype.returning = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).returning.apply(_a, args);
    };
    QueryInstance.prototype.returns = function () {
        return (new QueryBuilder(this)).returns();
    };
    QueryInstance.prototype.reverse = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).reverse.apply(_a, args);
    };
    QueryInstance.prototype.revoke = function () {
        return (new QueryBuilder(this)).revoke();
    };
    QueryInstance.prototype.right = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).right.apply(_a, args);
    };
    QueryInstance.prototype.rightJoin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rightJoin.apply(_a, args);
    };
    QueryInstance.prototype.rightJoinLateral = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rightJoinLateral.apply(_a, args);
    };
    QueryInstance.prototype.role = function () {
        return (new QueryBuilder(this)).role();
    };
    QueryInstance.prototype.rollback = function () {
        return (new QueryBuilder(this)).rollback();
    };
    QueryInstance.prototype.rollbackPreparedTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rollbackPreparedTransaction.apply(_a, args);
    };
    QueryInstance.prototype.rollbackToSavepointTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rollbackToSavepointTransaction.apply(_a, args);
    };
    QueryInstance.prototype.rollbackTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rollbackTransaction.apply(_a, args);
    };
    QueryInstance.prototype.rollup = function () {
        return (new QueryBuilder(this)).rollup();
    };
    QueryInstance.prototype.round = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).round.apply(_a, args);
    };
    QueryInstance.prototype.routine = function () {
        return (new QueryBuilder(this)).routine();
    };
    QueryInstance.prototype.routineCatalog = function () {
        return (new QueryBuilder(this)).routineCatalog();
    };
    QueryInstance.prototype.routineName = function () {
        return (new QueryBuilder(this)).routineName();
    };
    QueryInstance.prototype.routines = function () {
        return (new QueryBuilder(this)).routines();
    };
    QueryInstance.prototype.routineSchema = function () {
        return (new QueryBuilder(this)).routineSchema();
    };
    QueryInstance.prototype.row = function () {
        return (new QueryBuilder(this)).row();
    };
    QueryInstance.prototype.rowCount = function () {
        return (new QueryBuilder(this)).rowCount();
    };
    QueryInstance.prototype.rowNumber = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rowNumber.apply(_a, args);
    };
    QueryInstance.prototype.rows = function () {
        return (new QueryBuilder(this)).rows();
    };
    QueryInstance.prototype.rowSecurityActive = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rowSecurityActive.apply(_a, args);
    };
    QueryInstance.prototype.rowToJson = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rowToJson.apply(_a, args);
    };
    QueryInstance.prototype.rpad = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rpad.apply(_a, args);
    };
    QueryInstance.prototype.rs = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rs.apply(_a, args);
    };
    QueryInstance.prototype.rtrim = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).rtrim.apply(_a, args);
    };
    QueryInstance.prototype.rule = function () {
        return (new QueryBuilder(this)).rule();
    };
    QueryInstance.prototype.running = function () {
        return (new QueryBuilder(this)).running();
    };
    QueryInstance.prototype.sameAs = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sameAs.apply(_a, args);
    };
    QueryInstance.prototype.savepoint = function () {
        return (new QueryBuilder(this)).savepoint();
    };
    QueryInstance.prototype.savepointTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).savepointTransaction.apply(_a, args);
    };
    QueryInstance.prototype.sc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sc.apply(_a, args);
    };
    QueryInstance.prototype.scalar = function () {
        return (new QueryBuilder(this)).scalar();
    };
    QueryInstance.prototype.scale = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).scale.apply(_a, args);
    };
    QueryInstance.prototype.schema = function () {
        return (new QueryBuilder(this)).schema();
    };
    QueryInstance.prototype.schemaCase = function (key, queryBuilder) {
        return (new QueryBuilder(this)).schemaCase(key, queryBuilder);
    };
    QueryInstance.prototype.schemaName = function () {
        return (new QueryBuilder(this)).schemaName();
    };
    QueryInstance.prototype.schemaParam = function (key) {
        return (new QueryBuilder(this)).schemaParam(key);
    };
    QueryInstance.prototype.schemas = function () {
        return (new QueryBuilder(this)).schemas();
    };
    QueryInstance.prototype.schemaToXml = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).schemaToXml.apply(_a, args);
    };
    QueryInstance.prototype.schemaToXmlAndXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).schemaToXmlAndXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.schemaToXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).schemaToXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.scope = function () {
        return (new QueryBuilder(this)).scope();
    };
    QueryInstance.prototype.scopeCatalog = function () {
        return (new QueryBuilder(this)).scopeCatalog();
    };
    QueryInstance.prototype.scopeName = function () {
        return (new QueryBuilder(this)).scopeName();
    };
    QueryInstance.prototype.scopeSchema = function () {
        return (new QueryBuilder(this)).scopeSchema();
    };
    QueryInstance.prototype.scroll = function () {
        return (new QueryBuilder(this)).scroll();
    };
    QueryInstance.prototype.search = function () {
        return (new QueryBuilder(this)).search();
    };
    QueryInstance.prototype.second = function () {
        return (new QueryBuilder(this)).second();
    };
    QueryInstance.prototype.section = function () {
        return (new QueryBuilder(this)).section();
    };
    QueryInstance.prototype.security = function () {
        return (new QueryBuilder(this)).security();
    };
    QueryInstance.prototype.seek = function () {
        return (new QueryBuilder(this)).seek();
    };
    QueryInstance.prototype.select = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).select.apply(_a, args);
    };
    QueryInstance.prototype.selectDistinct = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).selectDistinct.apply(_a, args);
    };
    QueryInstance.prototype.selectDistinctOn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).selectDistinctOn.apply(_a, args);
    };
    QueryInstance.prototype.selective = function () {
        return (new QueryBuilder(this)).selective();
    };
    QueryInstance.prototype.self = function () {
        return (new QueryBuilder(this)).self();
    };
    QueryInstance.prototype.semantics = function () {
        return (new QueryBuilder(this)).semantics();
    };
    QueryInstance.prototype.semicolon = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).semicolon.apply(_a, args);
    };
    QueryInstance.prototype.sensitive = function () {
        return (new QueryBuilder(this)).sensitive();
    };
    QueryInstance.prototype.sequence = function () {
        return (new QueryBuilder(this)).sequence();
    };
    QueryInstance.prototype.sequences = function () {
        return (new QueryBuilder(this)).sequences();
    };
    QueryInstance.prototype.serializable = function () {
        return (new QueryBuilder(this)).serializable();
    };
    QueryInstance.prototype.server = function () {
        return (new QueryBuilder(this)).server();
    };
    QueryInstance.prototype.serverName = function () {
        return (new QueryBuilder(this)).serverName();
    };
    QueryInstance.prototype.session = function () {
        return (new QueryBuilder(this)).session();
    };
    QueryInstance.prototype.sessionUser = function () {
        return (new QueryBuilder(this)).sessionUser();
    };
    QueryInstance.prototype.set = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).set.apply(_a, args);
    };
    QueryInstance.prototype.setBit = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setBit.apply(_a, args);
    };
    QueryInstance.prototype.setByte = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setByte.apply(_a, args);
    };
    QueryInstance.prototype.setConfig = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setConfig.apply(_a, args);
    };
    QueryInstance.prototype.setMasklen = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setMasklen.apply(_a, args);
    };
    QueryInstance.prototype.setof = function () {
        return (new QueryBuilder(this)).setof();
    };
    QueryInstance.prototype.setParams = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setParams.apply(_a, args);
    };
    QueryInstance.prototype.sets = function () {
        return (new QueryBuilder(this)).sets();
    };
    QueryInstance.prototype.setseed = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setseed.apply(_a, args);
    };
    QueryInstance.prototype.setval = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setval.apply(_a, args);
    };
    QueryInstance.prototype.setweight = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).setweight.apply(_a, args);
    };
    QueryInstance.prototype.sha224 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sha224.apply(_a, args);
    };
    QueryInstance.prototype.sha256 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sha256.apply(_a, args);
    };
    QueryInstance.prototype.sha384 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sha384.apply(_a, args);
    };
    QueryInstance.prototype.sha512 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sha512.apply(_a, args);
    };
    QueryInstance.prototype.share = function () {
        return (new QueryBuilder(this)).share();
    };
    QueryInstance.prototype.shobjDescription = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).shobjDescription.apply(_a, args);
    };
    QueryInstance.prototype.show = function () {
        return (new QueryBuilder(this)).show();
    };
    QueryInstance.prototype.sign = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sign.apply(_a, args);
    };
    QueryInstance.prototype.similar = function () {
        return (new QueryBuilder(this)).similar();
    };
    QueryInstance.prototype.similarTo = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).similarTo.apply(_a, args);
    };
    QueryInstance.prototype.simple = function () {
        return (new QueryBuilder(this)).simple();
    };
    QueryInstance.prototype.sin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sin.apply(_a, args);
    };
    QueryInstance.prototype.sind = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sind.apply(_a, args);
    };
    QueryInstance.prototype.sinh = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sinh.apply(_a, args);
    };
    QueryInstance.prototype.size = function () {
        return (new QueryBuilder(this)).size();
    };
    QueryInstance.prototype.skip = function () {
        return (new QueryBuilder(this)).skip();
    };
    QueryInstance.prototype.slope = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).slope.apply(_a, args);
    };
    QueryInstance.prototype.smallint = function () {
        return (new QueryBuilder(this)).smallint();
    };
    QueryInstance.prototype.snapshot = function () {
        return (new QueryBuilder(this)).snapshot();
    };
    QueryInstance.prototype.some = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).some.apply(_a, args);
    };
    QueryInstance.prototype.sortDirection = function () {
        return (new QueryBuilder(this)).sortDirection();
    };
    QueryInstance.prototype.source = function () {
        return (new QueryBuilder(this)).source();
    };
    QueryInstance.prototype.space = function () {
        return (new QueryBuilder(this)).space();
    };
    QueryInstance.prototype.specific = function () {
        return (new QueryBuilder(this)).specific();
    };
    QueryInstance.prototype.specificName = function () {
        return (new QueryBuilder(this)).specificName();
    };
    QueryInstance.prototype.specifictype = function () {
        return (new QueryBuilder(this)).specifictype();
    };
    QueryInstance.prototype.splitPart = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).splitPart.apply(_a, args);
    };
    QueryInstance.prototype.sql = function () {
        return (new QueryBuilder(this)).sql();
    };
    QueryInstance.prototype.sqlcode = function () {
        return (new QueryBuilder(this)).sqlcode();
    };
    QueryInstance.prototype.sqlerror = function () {
        return (new QueryBuilder(this)).sqlerror();
    };
    QueryInstance.prototype.sqlexception = function () {
        return (new QueryBuilder(this)).sqlexception();
    };
    QueryInstance.prototype.sqlstate = function () {
        return (new QueryBuilder(this)).sqlstate();
    };
    QueryInstance.prototype.sqlwarning = function () {
        return (new QueryBuilder(this)).sqlwarning();
    };
    QueryInstance.prototype.sqrt = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sqrt.apply(_a, args);
    };
    QueryInstance.prototype.stable = function () {
        return (new QueryBuilder(this)).stable();
    };
    QueryInstance.prototype.standalone = function () {
        return (new QueryBuilder(this)).standalone();
    };
    QueryInstance.prototype.start = function () {
        return (new QueryBuilder(this)).start();
    };
    QueryInstance.prototype.startsWith = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).startsWith.apply(_a, args);
    };
    QueryInstance.prototype.startTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).startTransaction.apply(_a, args);
    };
    QueryInstance.prototype.state = function () {
        return (new QueryBuilder(this)).state();
    };
    QueryInstance.prototype.statement = function () {
        return (new QueryBuilder(this)).statement();
    };
    QueryInstance.prototype.statementTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).statementTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.static = function () {
        return (new QueryBuilder(this)).static();
    };
    QueryInstance.prototype.statistics = function () {
        return (new QueryBuilder(this)).statistics();
    };
    QueryInstance.prototype.stddev = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).stddev.apply(_a, args);
    };
    QueryInstance.prototype.stddevPop = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).stddevPop.apply(_a, args);
    };
    QueryInstance.prototype.stddevSamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).stddevSamp.apply(_a, args);
    };
    QueryInstance.prototype.stdin = function () {
        return (new QueryBuilder(this)).stdin();
    };
    QueryInstance.prototype.stdout = function () {
        return (new QueryBuilder(this)).stdout();
    };
    QueryInstance.prototype.storage = function () {
        return (new QueryBuilder(this)).storage();
    };
    QueryInstance.prototype.stored = function () {
        return (new QueryBuilder(this)).stored();
    };
    QueryInstance.prototype.strict = function () {
        return (new QueryBuilder(this)).strict();
    };
    QueryInstance.prototype.strictlyAbove = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).strictlyAbove.apply(_a, args);
    };
    QueryInstance.prototype.strictlyBelow = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).strictlyBelow.apply(_a, args);
    };
    QueryInstance.prototype.string = function () {
        return (new QueryBuilder(this)).string();
    };
    QueryInstance.prototype.stringAgg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).stringAgg.apply(_a, args);
    };
    QueryInstance.prototype.stringToArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).stringToArray.apply(_a, args);
    };
    QueryInstance.prototype.stringToTable = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).stringToTable.apply(_a, args);
    };
    QueryInstance.prototype.strip = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).strip.apply(_a, args);
    };
    QueryInstance.prototype.strpos = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).strpos.apply(_a, args);
    };
    QueryInstance.prototype.structure = function () {
        return (new QueryBuilder(this)).structure();
    };
    QueryInstance.prototype.style = function () {
        return (new QueryBuilder(this)).style();
    };
    QueryInstance.prototype.sub = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sub.apply(_a, args);
    };
    QueryInstance.prototype.subclassOrigin = function () {
        return (new QueryBuilder(this)).subclassOrigin();
    };
    QueryInstance.prototype.submultiset = function () {
        return (new QueryBuilder(this)).submultiset();
    };
    QueryInstance.prototype.subscription = function () {
        return (new QueryBuilder(this)).subscription();
    };
    QueryInstance.prototype.subset = function () {
        return (new QueryBuilder(this)).subset();
    };
    QueryInstance.prototype.substr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).substr.apply(_a, args);
    };
    QueryInstance.prototype.substring = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).substring.apply(_a, args);
    };
    QueryInstance.prototype.substringRegex = function () {
        return (new QueryBuilder(this)).substringRegex();
    };
    QueryInstance.prototype.succeeds = function () {
        return (new QueryBuilder(this)).succeeds();
    };
    QueryInstance.prototype.sum = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).sum.apply(_a, args);
    };
    QueryInstance.prototype.support = function () {
        return (new QueryBuilder(this)).support();
    };
    QueryInstance.prototype.suppressRedundantUpdatesTrigger = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).suppressRedundantUpdatesTrigger.apply(_a, args);
    };
    QueryInstance.prototype.symmetric = function () {
        return (new QueryBuilder(this)).symmetric();
    };
    QueryInstance.prototype.sysid = function () {
        return (new QueryBuilder(this)).sysid();
    };
    QueryInstance.prototype.system = function () {
        return (new QueryBuilder(this)).system();
    };
    QueryInstance.prototype.systemTime = function () {
        return (new QueryBuilder(this)).systemTime();
    };
    QueryInstance.prototype.systemUser = function () {
        return (new QueryBuilder(this)).systemUser();
    };
    QueryInstance.prototype.t = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).t.apply(_a, args);
    };
    QueryInstance.prototype.table = function () {
        return (new QueryBuilder(this)).table();
    };
    QueryInstance.prototype.tableName = function () {
        return (new QueryBuilder(this)).tableName();
    };
    QueryInstance.prototype.tables = function () {
        return (new QueryBuilder(this)).tables();
    };
    QueryInstance.prototype.tablesample = function () {
        return (new QueryBuilder(this)).tablesample();
    };
    QueryInstance.prototype.tablespace = function () {
        return (new QueryBuilder(this)).tablespace();
    };
    QueryInstance.prototype.tableToXml = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tableToXml.apply(_a, args);
    };
    QueryInstance.prototype.tableToXmlAndXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tableToXmlAndXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.tableToXmlschema = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tableToXmlschema.apply(_a, args);
    };
    QueryInstance.prototype.tan = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tan.apply(_a, args);
    };
    QueryInstance.prototype.tand = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tand.apply(_a, args);
    };
    QueryInstance.prototype.tanh = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tanh.apply(_a, args);
    };
    QueryInstance.prototype.target = function () {
        return (new QueryBuilder(this)).target();
    };
    QueryInstance.prototype.temp = function () {
        return (new QueryBuilder(this)).temp();
    };
    QueryInstance.prototype.template = function () {
        return (new QueryBuilder(this)).template();
    };
    QueryInstance.prototype.temporary = function () {
        return (new QueryBuilder(this)).temporary();
    };
    QueryInstance.prototype.text = function () {
        return (new QueryBuilder(this)).text();
    };
    QueryInstance.prototype.textCat = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).textCat.apply(_a, args);
    };
    QueryInstance.prototype.then = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).then.apply(_a, args);
    };
    QueryInstance.prototype.through = function () {
        return (new QueryBuilder(this)).through();
    };
    QueryInstance.prototype.ties = function () {
        return (new QueryBuilder(this)).ties();
    };
    QueryInstance.prototype.time = function () {
        return (new QueryBuilder(this)).time();
    };
    QueryInstance.prototype.timeofday = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).timeofday.apply(_a, args);
    };
    QueryInstance.prototype.timestamp = function () {
        return (new QueryBuilder(this)).timestamp();
    };
    QueryInstance.prototype.timezoneHour = function () {
        return (new QueryBuilder(this)).timezoneHour();
    };
    QueryInstance.prototype.timezoneMinute = function () {
        return (new QueryBuilder(this)).timezoneMinute();
    };
    QueryInstance.prototype.to = function () {
        return (new QueryBuilder(this)).to();
    };
    QueryInstance.prototype.toAscii = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toAscii.apply(_a, args);
    };
    QueryInstance.prototype.toBin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toBin.apply(_a, args);
    };
    QueryInstance.prototype.toChar = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toChar.apply(_a, args);
    };
    QueryInstance.prototype.toDate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toDate.apply(_a, args);
    };
    QueryInstance.prototype.toHex = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toHex.apply(_a, args);
    };
    QueryInstance.prototype.toJson = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toJson.apply(_a, args);
    };
    QueryInstance.prototype.toJsonb = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toJsonb.apply(_a, args);
    };
    QueryInstance.prototype.token = function () {
        return (new QueryBuilder(this)).token();
    };
    QueryInstance.prototype.toNumber = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toNumber.apply(_a, args);
    };
    QueryInstance.prototype.toOct = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toOct.apply(_a, args);
    };
    QueryInstance.prototype.topLevelCount = function () {
        return (new QueryBuilder(this)).topLevelCount();
    };
    QueryInstance.prototype.toRegclass = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegclass.apply(_a, args);
    };
    QueryInstance.prototype.toRegcollation = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegcollation.apply(_a, args);
    };
    QueryInstance.prototype.toRegnamespace = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegnamespace.apply(_a, args);
    };
    QueryInstance.prototype.toRegoper = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegoper.apply(_a, args);
    };
    QueryInstance.prototype.toRegoperator = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegoperator.apply(_a, args);
    };
    QueryInstance.prototype.toRegproc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegproc.apply(_a, args);
    };
    QueryInstance.prototype.toRegprocedure = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegprocedure.apply(_a, args);
    };
    QueryInstance.prototype.toRegrole = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegrole.apply(_a, args);
    };
    QueryInstance.prototype.toRegtype = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegtype.apply(_a, args);
    };
    QueryInstance.prototype.toRegtypemod = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toRegtypemod.apply(_a, args);
    };
    QueryInstance.prototype.totalLength = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).totalLength.apply(_a, args);
    };
    QueryInstance.prototype.toText = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toText.apply(_a, args);
    };
    QueryInstance.prototype.toTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.toTsquery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toTsquery.apply(_a, args);
    };
    QueryInstance.prototype.toTsvector = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).toTsvector.apply(_a, args);
    };
    QueryInstance.prototype.trailing = function () {
        return (new QueryBuilder(this)).trailing();
    };
    QueryInstance.prototype.transaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).transaction.apply(_a, args);
    };
    QueryInstance.prototype.transactionActive = function () {
        return (new QueryBuilder(this)).transactionActive();
    };
    QueryInstance.prototype.transactionscommitted = function () {
        return (new QueryBuilder(this)).transactionscommitted();
    };
    QueryInstance.prototype.transactionsrolledback = function () {
        return (new QueryBuilder(this)).transactionsrolledback();
    };
    QueryInstance.prototype.transactionTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).transactionTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.transform = function () {
        return (new QueryBuilder(this)).transform();
    };
    QueryInstance.prototype.transforms = function () {
        return (new QueryBuilder(this)).transforms();
    };
    QueryInstance.prototype.translate = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).translate.apply(_a, args);
    };
    QueryInstance.prototype.translateRegex = function () {
        return (new QueryBuilder(this)).translateRegex();
    };
    QueryInstance.prototype.translation = function () {
        return (new QueryBuilder(this)).translation();
    };
    QueryInstance.prototype.treat = function () {
        return (new QueryBuilder(this)).treat();
    };
    QueryInstance.prototype.trigger = function () {
        return (new QueryBuilder(this)).trigger();
    };
    QueryInstance.prototype.triggerCatalog = function () {
        return (new QueryBuilder(this)).triggerCatalog();
    };
    QueryInstance.prototype.triggerName = function () {
        return (new QueryBuilder(this)).triggerName();
    };
    QueryInstance.prototype.triggerSchema = function () {
        return (new QueryBuilder(this)).triggerSchema();
    };
    QueryInstance.prototype.trim = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).trim.apply(_a, args);
    };
    QueryInstance.prototype.trimArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).trimArray.apply(_a, args);
    };
    QueryInstance.prototype.trimScale = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).trimScale.apply(_a, args);
    };
    QueryInstance.prototype.true = function () {
        return (new QueryBuilder(this)).true();
    };
    QueryInstance.prototype.trunc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).trunc.apply(_a, args);
    };
    QueryInstance.prototype.truncate = function () {
        return (new QueryBuilder(this)).truncate();
    };
    QueryInstance.prototype.trusted = function () {
        return (new QueryBuilder(this)).trusted();
    };
    QueryInstance.prototype.tsDebug = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsDebug.apply(_a, args);
    };
    QueryInstance.prototype.tsDelete = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsDelete.apply(_a, args);
    };
    QueryInstance.prototype.tsFilter = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsFilter.apply(_a, args);
    };
    QueryInstance.prototype.tsHeadline = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsHeadline.apply(_a, args);
    };
    QueryInstance.prototype.tsLexize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsLexize.apply(_a, args);
    };
    QueryInstance.prototype.tsParse = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsParse.apply(_a, args);
    };
    QueryInstance.prototype.tsqueryPhrase = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsqueryPhrase.apply(_a, args);
    };
    QueryInstance.prototype.tsRank = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsRank.apply(_a, args);
    };
    QueryInstance.prototype.tsRankCd = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsRankCd.apply(_a, args);
    };
    QueryInstance.prototype.tsRewrite = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsRewrite.apply(_a, args);
    };
    QueryInstance.prototype.tsStat = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsStat.apply(_a, args);
    };
    QueryInstance.prototype.tsTokenType = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsTokenType.apply(_a, args);
    };
    QueryInstance.prototype.tsvectorToArray = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsvectorToArray.apply(_a, args);
    };
    QueryInstance.prototype.tsvectorUpdateTrigger = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsvectorUpdateTrigger.apply(_a, args);
    };
    QueryInstance.prototype.tsvectorUpdateTriggerColumn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).tsvectorUpdateTriggerColumn.apply(_a, args);
    };
    QueryInstance.prototype.txidCurrent = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidCurrent.apply(_a, args);
    };
    QueryInstance.prototype.txidCurrentIfAssigned = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidCurrentIfAssigned.apply(_a, args);
    };
    QueryInstance.prototype.txidCurrentSnapshot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidCurrentSnapshot.apply(_a, args);
    };
    QueryInstance.prototype.txidSnapshotXip = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidSnapshotXip.apply(_a, args);
    };
    QueryInstance.prototype.txidSnapshotXmax = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidSnapshotXmax.apply(_a, args);
    };
    QueryInstance.prototype.txidSnapshotXmin = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidSnapshotXmin.apply(_a, args);
    };
    QueryInstance.prototype.txidStatus = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidStatus.apply(_a, args);
    };
    QueryInstance.prototype.txidVisibleInSnapshot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).txidVisibleInSnapshot.apply(_a, args);
    };
    QueryInstance.prototype.type = function () {
        return (new QueryBuilder(this)).type();
    };
    QueryInstance.prototype.types = function () {
        return (new QueryBuilder(this)).types();
    };
    QueryInstance.prototype.uescape = function () {
        return (new QueryBuilder(this)).uescape();
    };
    QueryInstance.prototype.unbounded = function () {
        return (new QueryBuilder(this)).unbounded();
    };
    QueryInstance.prototype.uncommitted = function () {
        return (new QueryBuilder(this)).uncommitted();
    };
    QueryInstance.prototype.unconditional = function () {
        return (new QueryBuilder(this)).unconditional();
    };
    QueryInstance.prototype.under = function () {
        return (new QueryBuilder(this)).under();
    };
    QueryInstance.prototype.unencrypted = function () {
        return (new QueryBuilder(this)).unencrypted();
    };
    QueryInstance.prototype.unicodeAssigned = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).unicodeAssigned.apply(_a, args);
    };
    QueryInstance.prototype.unicodeVersion = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).unicodeVersion.apply(_a, args);
    };
    QueryInstance.prototype.union = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).union.apply(_a, args);
    };
    QueryInstance.prototype.unionAll = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).unionAll.apply(_a, args);
    };
    QueryInstance.prototype.unique = function () {
        return (new QueryBuilder(this)).unique();
    };
    QueryInstance.prototype.unistr = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).unistr.apply(_a, args);
    };
    QueryInstance.prototype.unknown = function () {
        return (new QueryBuilder(this)).unknown();
    };
    QueryInstance.prototype.unlink = function () {
        return (new QueryBuilder(this)).unlink();
    };
    QueryInstance.prototype.unlisten = function () {
        return (new QueryBuilder(this)).unlisten();
    };
    QueryInstance.prototype.unlogged = function () {
        return (new QueryBuilder(this)).unlogged();
    };
    QueryInstance.prototype.unmatched = function () {
        return (new QueryBuilder(this)).unmatched();
    };
    QueryInstance.prototype.unnamed = function () {
        return (new QueryBuilder(this)).unnamed();
    };
    QueryInstance.prototype.unnest = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).unnest.apply(_a, args);
    };
    QueryInstance.prototype.until = function () {
        return (new QueryBuilder(this)).until();
    };
    QueryInstance.prototype.untyped = function () {
        return (new QueryBuilder(this)).untyped();
    };
    QueryInstance.prototype.update = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).update.apply(_a, args);
    };
    QueryInstance.prototype.upper = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).upper.apply(_a, args);
    };
    QueryInstance.prototype.upperInc = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).upperInc.apply(_a, args);
    };
    QueryInstance.prototype.upperInf = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).upperInf.apply(_a, args);
    };
    QueryInstance.prototype.uri = function () {
        return (new QueryBuilder(this)).uri();
    };
    QueryInstance.prototype.usage = function () {
        return (new QueryBuilder(this)).usage();
    };
    QueryInstance.prototype.user = function () {
        return (new QueryBuilder(this)).user();
    };
    QueryInstance.prototype.userdefinedtypecatalog = function () {
        return (new QueryBuilder(this)).userdefinedtypecatalog();
    };
    QueryInstance.prototype.userdefinedtypecode = function () {
        return (new QueryBuilder(this)).userdefinedtypecode();
    };
    QueryInstance.prototype.userdefinedtypename = function () {
        return (new QueryBuilder(this)).userdefinedtypename();
    };
    QueryInstance.prototype.userdefinedtypeschema = function () {
        return (new QueryBuilder(this)).userdefinedtypeschema();
    };
    QueryInstance.prototype.using = function () {
        return (new QueryBuilder(this)).using();
    };
    QueryInstance.prototype.utf16 = function () {
        return (new QueryBuilder(this)).utf16();
    };
    QueryInstance.prototype.utf32 = function () {
        return (new QueryBuilder(this)).utf32();
    };
    QueryInstance.prototype.utf8 = function () {
        return (new QueryBuilder(this)).utf8();
    };
    QueryInstance.prototype.uuidExtractTimestamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).uuidExtractTimestamp.apply(_a, args);
    };
    QueryInstance.prototype.uuidExtractVersion = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).uuidExtractVersion.apply(_a, args);
    };
    QueryInstance.prototype.uuidv4 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).uuidv4.apply(_a, args);
    };
    QueryInstance.prototype.uuidv7 = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).uuidv7.apply(_a, args);
    };
    QueryInstance.prototype.v = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).v.apply(_a, args);
    };
    QueryInstance.prototype.vacuum = function () {
        return (new QueryBuilder(this)).vacuum();
    };
    QueryInstance.prototype.valid = function () {
        return (new QueryBuilder(this)).valid();
    };
    QueryInstance.prototype.validate = function () {
        return (new QueryBuilder(this)).validate();
    };
    QueryInstance.prototype.validator = function () {
        return (new QueryBuilder(this)).validator();
    };
    QueryInstance.prototype.value = function () {
        return (new QueryBuilder(this)).value();
    };
    QueryInstance.prototype.valueOfKeyword = function () {
        return (new QueryBuilder(this)).valueOfKeyword();
    };
    QueryInstance.prototype.values = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).values.apply(_a, args);
    };
    QueryInstance.prototype.varbinary = function () {
        return (new QueryBuilder(this)).varbinary();
    };
    QueryInstance.prototype.varchar = function () {
        return (new QueryBuilder(this)).varchar();
    };
    QueryInstance.prototype.variadic = function () {
        return (new QueryBuilder(this)).variadic();
    };
    QueryInstance.prototype.variance = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).variance.apply(_a, args);
    };
    QueryInstance.prototype.varPop = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).varPop.apply(_a, args);
    };
    QueryInstance.prototype.varSamp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).varSamp.apply(_a, args);
    };
    QueryInstance.prototype.varying = function () {
        return (new QueryBuilder(this)).varying();
    };
    QueryInstance.prototype.verbose = function () {
        return (new QueryBuilder(this)).verbose();
    };
    QueryInstance.prototype.version = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).version.apply(_a, args);
    };
    QueryInstance.prototype.versioning = function () {
        return (new QueryBuilder(this)).versioning();
    };
    QueryInstance.prototype.vertical = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).vertical.apply(_a, args);
    };
    QueryInstance.prototype.view = function () {
        return (new QueryBuilder(this)).view();
    };
    QueryInstance.prototype.views = function () {
        return (new QueryBuilder(this)).views();
    };
    QueryInstance.prototype.virtual = function () {
        return (new QueryBuilder(this)).virtual();
    };
    QueryInstance.prototype.volatile = function () {
        return (new QueryBuilder(this)).volatile();
    };
    QueryInstance.prototype.websearchToTsquery = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).websearchToTsquery.apply(_a, args);
    };
    QueryInstance.prototype.when = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).when.apply(_a, args);
    };
    QueryInstance.prototype.whenever = function () {
        return (new QueryBuilder(this)).whenever();
    };
    QueryInstance.prototype.where = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).where.apply(_a, args);
    };
    QueryInstance.prototype.whitespace = function () {
        return (new QueryBuilder(this)).whitespace();
    };
    QueryInstance.prototype.width = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).width.apply(_a, args);
    };
    QueryInstance.prototype.widthBucket = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).widthBucket.apply(_a, args);
    };
    QueryInstance.prototype.window = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).window.apply(_a, args);
    };
    QueryInstance.prototype.with = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).with.apply(_a, args);
    };
    QueryInstance.prototype.within = function () {
        return (new QueryBuilder(this)).within();
    };
    QueryInstance.prototype.without = function () {
        return (new QueryBuilder(this)).without();
    };
    QueryInstance.prototype.withTies = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).withTies.apply(_a, args);
    };
    QueryInstance.prototype.work = function () {
        return (new QueryBuilder(this)).work();
    };
    QueryInstance.prototype.wrapper = function () {
        return (new QueryBuilder(this)).wrapper();
    };
    QueryInstance.prototype.write = function () {
        return (new QueryBuilder(this)).write();
    };
    QueryInstance.prototype.xml = function () {
        return (new QueryBuilder(this)).xml();
    };
    QueryInstance.prototype.xmlagg = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlagg.apply(_a, args);
    };
    QueryInstance.prototype.xmlattributes = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlattributes.apply(_a, args);
    };
    QueryInstance.prototype.xmlbinary = function () {
        return (new QueryBuilder(this)).xmlbinary();
    };
    QueryInstance.prototype.xmlcast = function () {
        return (new QueryBuilder(this)).xmlcast();
    };
    QueryInstance.prototype.xmlcomment = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlcomment.apply(_a, args);
    };
    QueryInstance.prototype.xmlconcat = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlconcat.apply(_a, args);
    };
    QueryInstance.prototype.xmldeclaration = function () {
        return (new QueryBuilder(this)).xmldeclaration();
    };
    QueryInstance.prototype.xmldocument = function () {
        return (new QueryBuilder(this)).xmldocument();
    };
    QueryInstance.prototype.xmlelement = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlelement.apply(_a, args);
    };
    QueryInstance.prototype.xmlexists = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlexists.apply(_a, args);
    };
    QueryInstance.prototype.xmlforest = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlforest.apply(_a, args);
    };
    QueryInstance.prototype.xmlIsWellFormed = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlIsWellFormed.apply(_a, args);
    };
    QueryInstance.prototype.xmlIsWellFormedContent = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlIsWellFormedContent.apply(_a, args);
    };
    QueryInstance.prototype.xmlIsWellFormedDocument = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlIsWellFormedDocument.apply(_a, args);
    };
    QueryInstance.prototype.xmliterate = function () {
        return (new QueryBuilder(this)).xmliterate();
    };
    QueryInstance.prototype.xmlnamespaces = function () {
        return (new QueryBuilder(this)).xmlnamespaces();
    };
    QueryInstance.prototype.xmlparse = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlparse.apply(_a, args);
    };
    QueryInstance.prototype.xmlpi = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlpi.apply(_a, args);
    };
    QueryInstance.prototype.xmlquery = function () {
        return (new QueryBuilder(this)).xmlquery();
    };
    QueryInstance.prototype.xmlroot = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlroot.apply(_a, args);
    };
    QueryInstance.prototype.xmlschema = function () {
        return (new QueryBuilder(this)).xmlschema();
    };
    QueryInstance.prototype.xmlserialize = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmlserialize.apply(_a, args);
    };
    QueryInstance.prototype.xmltable = function () {
        return (new QueryBuilder(this)).xmltable();
    };
    QueryInstance.prototype.xmltext = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xmltext.apply(_a, args);
    };
    QueryInstance.prototype.xmlvalidate = function () {
        return (new QueryBuilder(this)).xmlvalidate();
    };
    QueryInstance.prototype.xpath = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xpath.apply(_a, args);
    };
    QueryInstance.prototype.xpathExists = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = (new QueryBuilder(this))).xpathExists.apply(_a, args);
    };
    QueryInstance.prototype.year = function () {
        return (new QueryBuilder(this)).year();
    };
    QueryInstance.prototype.yes = function () {
        return (new QueryBuilder(this)).yes();
    };
    QueryInstance.prototype.zone = function () {
        return (new QueryBuilder(this)).zone();
    };
    return QueryInstance;
}());
export { QueryInstance };
