"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoFunctionBuilder = void 0;
const override_subquery_functions_1 = require("./override-subquery-functions");
class InfoFunctionBuilder extends override_subquery_functions_1.SubqueryFunctionBuilder {
    // Session Information Functions (9.27.1)
    currentDatabase(value) {
        return this.pushFunction("CURRENT_DATABASE", value);
    }
    currentQuery(value) {
        return this.pushFunction("CURRENT_QUERY", value);
    }
    currentSchemas(value) {
        return this.pushFunction("CURRENT_SCHEMAS", value);
    }
    inetClientAddr(value) {
        return this.pushFunction("INET_CLIENT_ADDR", value);
    }
    inetClientPort(value) {
        return this.pushFunction("INET_CLIENT_PORT", value);
    }
    inetServerAddr(value) {
        return this.pushFunction("INET_SERVER_ADDR", value);
    }
    inetServerPort(value) {
        return this.pushFunction("INET_SERVER_PORT", value);
    }
    pgBackendPid(value) {
        return this.pushFunction("PG_BACKEND_PID", value);
    }
    pgBlockingPids(value) {
        return this.pushFunction("PG_BLOCKING_PIDS", value);
    }
    pgConfLoadTime(value) {
        return this.pushFunction("PG_CONF_LOAD_TIME", value);
    }
    pgCurrentLogfile(value) {
        return this.pushFunction("PG_CURRENT_LOGFILE", value);
    }
    pgGetLoadedModules(value) {
        return this.pushFunction("PG_GET_LOADED_MODULES", value);
    }
    pgMyTempSchema(value) {
        return this.pushFunction("PG_MY_TEMP_SCHEMA", value);
    }
    pgIsOtherTempSchema(value) {
        return this.pushFunction("PG_IS_OTHER_TEMP_SCHEMA", value);
    }
    pgJitAvailable(value) {
        return this.pushFunction("PG_JIT_AVAILABLE", value);
    }
    pgNumaAvailable(value) {
        return this.pushFunction("PG_NUMA_AVAILABLE", value);
    }
    pgListeningChannels(value) {
        return this.pushFunction("PG_LISTENING_CHANNELS", value);
    }
    pgNotificationQueueUsage(value) {
        return this.pushFunction("PG_NOTIFICATION_QUEUE_USAGE", value);
    }
    pgPostmasterStartTime(value) {
        return this.pushFunction("PG_POSTMASTER_START_TIME", value);
    }
    pgSafeSnapshotBlockingPids(value) {
        return this.pushFunction("PG_SAFE_SNAPSHOT_BLOCKING_PIDS", value);
    }
    pgTriggerDepth(value) {
        return this.pushFunction("PG_TRIGGER_DEPTH", value);
    }
    // Access Privilege Inquiry Functions (9.27.2)
    hasAnyColumnPrivilege(user, table, privilege) {
        return this.pushFunction("HAS_ANY_COLUMN_PRIVILEGE", user, table, privilege);
    }
    hasColumnPrivilege(user, table, column, privilege) {
        return this.pushFunction("HAS_COLUMN_PRIVILEGE", user, table, column, privilege);
    }
    hasDatabasePrivilege(user, database, privilege) {
        return this.pushFunction("HAS_DATABASE_PRIVILEGE", user, database, privilege);
    }
    hasFunctionPrivilege(user, fn, privilege) {
        return this.pushFunction("HAS_FUNCTION_PRIVILEGE", user, fn, privilege);
    }
    hasLanguagePrivilege(user, language, privilege) {
        return this.pushFunction("HAS_LANGUAGE_PRIVILEGE", user, language, privilege);
    }
    hasLargeobjectPrivilege(user, largeobject, privilege) {
        return this.pushFunction("HAS_LARGEOBJECT_PRIVILEGE", user, largeobject, privilege);
    }
    hasParameterPrivilege(user, parameter, privilege) {
        return this.pushFunction("HAS_PARAMETER_PRIVILEGE", user, parameter, privilege);
    }
    hasSchemaPrivilege(user, schema, privilege) {
        return this.pushFunction("HAS_SCHEMA_PRIVILEGE", user, schema, privilege);
    }
    hasSequencePrivilege(user, sequence, privilege) {
        return this.pushFunction("HAS_SEQUENCE_PRIVILEGE", user, sequence, privilege);
    }
    hasServerPrivilege(user, server, privilege) {
        return this.pushFunction("HAS_SERVER_PRIVILEGE", user, server, privilege);
    }
    hasTablePrivilege(user, table, privilege) {
        return this.pushFunction("HAS_TABLE_PRIVILEGE", user, table, privilege);
    }
    hasTablespacePrivilege(user, tablespace, privilege) {
        return this.pushFunction("HAS_TABLESPACE_PRIVILEGE", user, tablespace, privilege);
    }
    hasTypePrivilege(user, type, privilege) {
        return this.pushFunction("HAS_TYPE_PRIVILEGE", user, type, privilege);
    }
    pgHasRole(user, role, privilege) {
        return this.pushFunction("PG_HAS_ROLE", user, role, privilege);
    }
    rowSecurityActive(table) {
        return this.pushFunction("ROW_SECURITY_ACTIVE", table);
    }
    // aclitem functions
    acldefault(type, ownerId) {
        return this.pushFunction("ACLDEFAULT", type, ownerId);
    }
    aclexplode(aclitemArray) {
        return this.pushFunction("ACLEXPLODE", aclitemArray);
    }
    makeaclitem(grantee, grantor, privileges, isGrantable) {
        return this.pushFunction("MAKEACLITEM", grantee, grantor, privileges, isGrantable);
    }
    // Schema Visibility Inquiry Functions (9.27.3)
    pgCollationIsVisible(collation) {
        return this.pushFunction("PG_COLLATION_IS_VISIBLE", collation);
    }
    pgConversionIsVisible(conversion) {
        return this.pushFunction("PG_CONVERSION_IS_VISIBLE", conversion);
    }
    pgFunctionIsVisible(fn) {
        return this.pushFunction("PG_FUNCTION_IS_VISIBLE", fn);
    }
    pgOpclassIsVisible(opclass) {
        return this.pushFunction("PG_OPCLASS_IS_VISIBLE", opclass);
    }
    pgOperatorIsVisible(operator) {
        return this.pushFunction("PG_OPERATOR_IS_VISIBLE", operator);
    }
    pgOpfamilyIsVisible(opfamily) {
        return this.pushFunction("PG_OPFAMILY_IS_VISIBLE", opfamily);
    }
    pgStatisticsObjIsVisible(stat) {
        return this.pushFunction("PG_STATISTICS_OBJ_IS_VISIBLE", stat);
    }
    pgTableIsVisible(table) {
        return this.pushFunction("PG_TABLE_IS_VISIBLE", table);
    }
    pgTsConfigIsVisible(config) {
        return this.pushFunction("PG_TSCONFIG_IS_VISIBLE", config);
    }
    pgTsDictIsVisible(dict) {
        return this.pushFunction("PG_TSDICT_IS_VISIBLE", dict);
    }
    pgTsParserIsVisible(parser) {
        return this.pushFunction("PG_TSPARSER_IS_VISIBLE", parser);
    }
    pgTsTemplateIsVisible(template) {
        return this.pushFunction("PG_TSTEMPLATE_IS_VISIBLE", template);
    }
    pgTypeIsVisible(type) {
        return this.pushFunction("PG_TYPE_IS_VISIBLE", type);
    }
    // System Catalog Information Functions (9.27.4)
    formatType(type, typemod) {
        return this.pushFunction("FORMAT_TYPE", type, typemod);
    }
    pgBasetype(regtype) {
        return this.pushFunction("PG_BASETYPE", regtype);
    }
    pgCharToEncoding(encoding) {
        return this.pushFunction("PG_CHAR_TO_ENCODING", encoding);
    }
    pgEncodingToChar(encoding) {
        return this.pushFunction("PG_ENCODING_TO_CHAR", encoding);
    }
    pgGetCatalogForeignKeys() {
        return this.pushFunction("PG_GET_CATALOG_FOREIGN_KEYS");
    }
    pgGetConstraintdef(constraint, pretty) {
        return this.pushFunction("PG_GET_CONSTRAINTDEF", constraint, pretty);
    }
    pgGetExpr(expr, relation, pretty) {
        return this.pushFunction("PG_GET_EXPR", expr, relation, pretty);
    }
    pgGetFunctiondef(func) {
        return this.pushFunction("PG_GET_FUNCTIONDEF", func);
    }
    pgGetFunctionArguments(func) {
        return this.pushFunction("PG_GET_FUNCTION_ARGUMENTS", func);
    }
    pgGetFunctionIdentityArguments(func) {
        return this.pushFunction("PG_GET_FUNCTION_IDENTITY_ARGUMENTS", func);
    }
    pgGetFunctionResult(func) {
        return this.pushFunction("PG_GET_FUNCTION_RESULT", func);
    }
    pgGetIndexdef(index, column, pretty) {
        return this.pushFunction("PG_GET_INDEXDEF", index, column, pretty);
    }
    pgGetKeywords() {
        return this.pushFunction("PG_GET_KEYWORDS");
    }
    pgGetPartkeydef(table) {
        return this.pushFunction("PG_GET_PARTKEYDEF", table);
    }
    pgGetRuledef(rule, pretty) {
        return this.pushFunction("PG_GET_RULEDEF", rule, pretty);
    }
    pgGetSerialSequence(table, column) {
        return this.pushFunction("PG_GET_SERIAL_SEQUENCE", table, column);
    }
    pgGetStatisticsobjdef(statobj) {
        return this.pushFunction("PG_GET_STATISTICSOBJDEF", statobj);
    }
    pgGetTriggerdef(trigger, pretty) {
        return this.pushFunction("PG_GET_TRIGGERDEF", trigger, pretty);
    }
    pgGetUserbyid(role) {
        return this.pushFunction("PG_GET_USERBYID", role);
    }
    pgGetViewdef(view, pretty) {
        return this.pushFunction("PG_GET_VIEWDEF", view, pretty);
    }
    pgGetViewdefWrap(view, wrapColumn) {
        return this.pushFunction("PG_GET_VIEWDEF", view, wrapColumn);
    }
    pgIndexColumnHasProperty(index, column, property) {
        return this.pushFunction("PG_INDEX_COLUMN_HAS_PROPERTY", index, column, property);
    }
    pgIndexHasProperty(index, property) {
        return this.pushFunction("PG_INDEX_HAS_PROPERTY", index, property);
    }
    pgIndexamHasProperty(am, property) {
        return this.pushFunction("PG_INDEXAM_HAS_PROPERTY", am, property);
    }
    pgOptionsToTable(optionsArray) {
        return this.pushFunction("PG_OPTIONS_TO_TABLE", optionsArray);
    }
    pgSettingsGetFlags(guc) {
        return this.pushFunction("PG_SETTINGS_GET_FLAGS", guc);
    }
    pgTablespaceDatabases(tablespace) {
        return this.pushFunction("PG_TABLESPACE_DATABASES", tablespace);
    }
    pgTablespaceLocation(tablespace) {
        return this.pushFunction("PG_TABLESPACE_LOCATION", tablespace);
    }
    pgTypeof(value) {
        return this.pushFunction("PG_TYPEOF", value);
    }
    toRegclass(text) {
        return this.pushFunction("TO_REGCLASS", text);
    }
    toRegcollation(text) {
        return this.pushFunction("TO_REGCOLLATION", text);
    }
    toRegnamespace(text) {
        return this.pushFunction("TO_REGNAMESPACE", text);
    }
    toRegoper(text) {
        return this.pushFunction("TO_REGOPER", text);
    }
    toRegoperator(text) {
        return this.pushFunction("TO_REGOPERATOR", text);
    }
    toRegproc(text) {
        return this.pushFunction("TO_REGPROC", text);
    }
    toRegprocedure(text) {
        return this.pushFunction("TO_REGPROCEDURE", text);
    }
    toRegrole(text) {
        return this.pushFunction("TO_REGROLE", text);
    }
    toRegtype(text) {
        return this.pushFunction("TO_REGTYPE", text);
    }
    toRegtypemod(text) {
        return this.pushFunction("TO_REGTYPEMOD", text);
    }
    // Object Information Functions (9.27.5)
    pgGetAcl(classid, objid, objsubid) {
        return this.pushFunction("PG_GET_ACL", classid, objid, objsubid);
    }
    pgDescribeObject(classid, objid, objsubid) {
        return this.pushFunction("PG_DESCRIBE_OBJECT", classid, objid, objsubid);
    }
    pgIdentifyObject(classid, objid, objsubid) {
        return this.pushFunction("PG_IDENTIFY_OBJECT", classid, objid, objsubid);
    }
    pgIdentifyObjectAsAddress(classid, objid, objsubid) {
        return this.pushFunction("PG_IDENTIFY_OBJECT_AS_ADDRESS", classid, objid, objsubid);
    }
    pgGetObjectAddress(type, objectNames, objectArgs) {
        return this.pushFunction("PG_GET_OBJECT_ADDRESS", type, objectNames, objectArgs);
    }
    // Comment Information Functions (9.27.6)
    colDescription(table, column) {
        return this.pushFunction("COL_DESCRIPTION", table, column);
    }
    objDescription(object, catalog) {
        return this.pushFunction("OBJ_DESCRIPTION", object, catalog);
    }
    shobjDescription(object, catalog) {
        return this.pushFunction("SHOBJ_DESCRIPTION", object, catalog);
    }
    // Data Validity Checking Functions (9.27.7)
    pgInputIsValid(string, type) {
        return this.pushFunction("PG_INPUT_IS_VALID", string, type);
    }
    pgInputErrorInfo(string, type) {
        return this.pushFunction("PG_INPUT_ERROR_INFO", string, type);
    }
    mxidAge(xid) {
        return this.pushFunction("MXID_AGE", xid);
    }
    pgCurrentXactId() {
        return this.pushFunction("PG_CURRENT_XACT_ID");
    }
    pgCurrentXactIdIfAssigned() {
        return this.pushFunction("PG_CURRENT_XACT_ID_IF_ASSIGNED");
    }
    pgXactStatus(xid) {
        return this.pushFunction("PG_XACT_STATUS", xid);
    }
    pgCurrentSnapshot() {
        return this.pushFunction("PG_CURRENT_SNAPSHOT");
    }
    pgSnapshotXip(snapshot) {
        return this.pushFunction("PG_SNAPSHOT_XIP", snapshot);
    }
    pgSnapshotXmax(snapshot) {
        return this.pushFunction("PG_SNAPSHOT_XMAX", snapshot);
    }
    pgSnapshotXmin(snapshot) {
        return this.pushFunction("PG_SNAPSHOT_XMIN", snapshot);
    }
    pgVisibleInSnapshot(xid, snapshot) {
        return this.pushFunction("PG_VISIBLE_IN_SNAPSHOT", xid, snapshot);
    }
    pgGetMultixactMembers(multixid) {
        return this.pushFunction("PG_GET_MULTIXACT_MEMBERS", multixid);
    }
    // Deprecated functions (for backward compatibility)
    txidCurrent() {
        return this.pushFunction("TXID_CURRENT");
    }
    txidCurrentIfAssigned() {
        return this.pushFunction("TXID_CURRENT_IF_ASSIGNED");
    }
    txidCurrentSnapshot() {
        return this.pushFunction("TXID_CURRENT_SNAPSHOT");
    }
    txidSnapshotXip(snapshot) {
        return this.pushFunction("TXID_SNAPSHOT_XIP", snapshot);
    }
    txidSnapshotXmax(snapshot) {
        return this.pushFunction("TXID_SNAPSHOT_XMAX", snapshot);
    }
    txidSnapshotXmin(snapshot) {
        return this.pushFunction("TXID_SNAPSHOT_XMIN", snapshot);
    }
    txidVisibleInSnapshot(xid, snapshot) {
        return this.pushFunction("TXID_VISIBLE_IN_SNAPSHOT", xid, snapshot);
    }
    txidStatus(xid) {
        return this.pushFunction("TXID_STATUS", xid);
    }
    // Committed Transaction Information Functions (9.27.9)
    pgXactCommitTimestamp(xid) {
        return this.pushFunction("PG_XACT_COMMIT_TIMESTAMP", xid);
    }
    pgXactCommitTimestampOrigin(xid) {
        return this.pushFunction("PG_XACT_COMMIT_TIMESTAMP_ORIGIN", xid);
    }
    pgLastCommittedXact() {
        return this.pushFunction("PG_LAST_COMMITTED_XACT");
    }
    // Control Data Functions (9.27.10)
    pgControlCheckpoint() {
        return this.pushFunction("PG_CONTROL_CHECKPOINT");
    }
    pgControlSystem() {
        return this.pushFunction("PG_CONTROL_SYSTEM");
    }
    pgControlInit() {
        return this.pushFunction("PG_CONTROL_INIT");
    }
    pgControlRecovery() {
        return this.pushFunction("PG_CONTROL_RECOVERY");
    }
    // Version Information Functions (9.27.11)
    unicodeVersion() {
        return this.pushFunction("UNICODE_VERSION");
    }
    icuUnicodeVersion() {
        return this.pushFunction("ICU_UNICODE_VERSION");
    }
    // WAL Summarization Information Functions (9.27.12)
    pgAvailableWalSummaries() {
        return this.pushFunction("PG_AVAILABLE_WAL_SUMMARIES");
    }
    pgWalSummaryContents(tli, startLsn, endLsn) {
        return this.pushFunction("PG_WAL_SUMMARY_CONTENTS", tli, startLsn, endLsn);
    }
    pgGetWalSummarizerState() {
        return this.pushFunction("PG_GET_WAL_SUMMARIZER_STATE");
    }
}
exports.InfoFunctionBuilder = InfoFunctionBuilder;
