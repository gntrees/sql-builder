import { SubqueryFunctionBuilder } from "./override-subquery-functions";
import type { QueryBuilder } from "../../query-builder";

export class InfoFunctionBuilder extends SubqueryFunctionBuilder {
    // Session Information Functions (9.27.1)

    currentDatabase(value?: QueryBuilder) {
        return this.pushFunction("CURRENT_DATABASE", value);
    }

    currentQuery(value?: QueryBuilder) {
        return this.pushFunction("CURRENT_QUERY", value);
    }

    currentSchemas(value?: QueryBuilder) {
        return this.pushFunction("CURRENT_SCHEMAS", value);
    }

    inetClientAddr(value?: QueryBuilder) {
        return this.pushFunction("INET_CLIENT_ADDR", value);
    }

    inetClientPort(value?: QueryBuilder) {
        return this.pushFunction("INET_CLIENT_PORT", value);
    }

    inetServerAddr(value?: QueryBuilder) {
        return this.pushFunction("INET_SERVER_ADDR", value);
    }

    inetServerPort(value?: QueryBuilder) {
        return this.pushFunction("INET_SERVER_PORT", value);
    }

    pgBackendPid(value?: QueryBuilder) {
        return this.pushFunction("PG_BACKEND_PID", value);
    }

    pgBlockingPids(value?: QueryBuilder) {
        return this.pushFunction("PG_BLOCKING_PIDS", value);
    }

    pgConfLoadTime(value?: QueryBuilder) {
        return this.pushFunction("PG_CONF_LOAD_TIME", value);
    }

    pgCurrentLogfile(value?: QueryBuilder) {
        return this.pushFunction("PG_CURRENT_LOGFILE", value);
    }

    pgGetLoadedModules(value?: QueryBuilder) {
        return this.pushFunction("PG_GET_LOADED_MODULES", value);
    }

    pgMyTempSchema(value?: QueryBuilder) {
        return this.pushFunction("PG_MY_TEMP_SCHEMA", value);
    }

    pgIsOtherTempSchema(value?: QueryBuilder) {
        return this.pushFunction("PG_IS_OTHER_TEMP_SCHEMA", value);
    }

    pgJitAvailable(value?: QueryBuilder) {
        return this.pushFunction("PG_JIT_AVAILABLE", value);
    }

    pgNumaAvailable(value?: QueryBuilder) {
        return this.pushFunction("PG_NUMA_AVAILABLE", value);
    }

    pgListeningChannels(value?: QueryBuilder) {
        return this.pushFunction("PG_LISTENING_CHANNELS", value);
    }

    pgNotificationQueueUsage(value?: QueryBuilder) {
        return this.pushFunction("PG_NOTIFICATION_QUEUE_USAGE", value);
    }

    pgPostmasterStartTime(value?: QueryBuilder) {
        return this.pushFunction("PG_POSTMASTER_START_TIME", value);
    }

    pgSafeSnapshotBlockingPids(value?: QueryBuilder) {
        return this.pushFunction("PG_SAFE_SNAPSHOT_BLOCKING_PIDS", value);
    }

    pgTriggerDepth(value?: QueryBuilder) {
        return this.pushFunction("PG_TRIGGER_DEPTH", value);
    }

    // Access Privilege Inquiry Functions (9.27.2)

    hasAnyColumnPrivilege(user?:QueryBuilder, table?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_ANY_COLUMN_PRIVILEGE", user,table, privilege);
    }

    hasColumnPrivilege(user?: QueryBuilder, table?: QueryBuilder, column?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_COLUMN_PRIVILEGE", user, table, column, privilege);
    }

    hasDatabasePrivilege(user?: QueryBuilder, database?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_DATABASE_PRIVILEGE", user, database, privilege);
    }

    hasFunctionPrivilege(user?: QueryBuilder, fn?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_FUNCTION_PRIVILEGE", user, fn, privilege);
    }

   
    hasLanguagePrivilege(user?: QueryBuilder, language?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_LANGUAGE_PRIVILEGE", user, language, privilege);
    }

    hasLargeobjectPrivilege(user?: QueryBuilder, largeobject?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_LARGEOBJECT_PRIVILEGE", user, largeobject, privilege);
    }

    hasParameterPrivilege(user?: QueryBuilder, parameter?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_PARAMETER_PRIVILEGE", user, parameter, privilege);
    }

    hasSchemaPrivilege(user?: QueryBuilder, schema?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_SCHEMA_PRIVILEGE", user, schema, privilege);
    }

    hasSequencePrivilege(user?: QueryBuilder, sequence?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_SEQUENCE_PRIVILEGE", user, sequence, privilege);
    }

    hasServerPrivilege(user?: QueryBuilder, server?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_SERVER_PRIVILEGE", user, server, privilege);
    }

    hasTablePrivilege(user?: QueryBuilder, table?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_TABLE_PRIVILEGE", user, table, privilege);
    }

    hasTablespacePrivilege(user?: QueryBuilder, tablespace?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_TABLESPACE_PRIVILEGE", user, tablespace, privilege);
    }

    hasTypePrivilege(user?: QueryBuilder, type?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("HAS_TYPE_PRIVILEGE", user, type, privilege);
    }

    pgHasRole(user?: QueryBuilder, role?: QueryBuilder, privilege?: QueryBuilder) {
        return this.pushFunction("PG_HAS_ROLE", user, role, privilege);
    }

    rowSecurityActive(table?: QueryBuilder) {
        return this.pushFunction("ROW_SECURITY_ACTIVE", table);
    }

    // aclitem functions
    acldefault(type?: QueryBuilder, ownerId?: QueryBuilder) {
        return this.pushFunction("ACLDEFAULT", type, ownerId);
    }

    aclexplode(aclitemArray?: QueryBuilder) {
        return this.pushFunction("ACLEXPLODE", aclitemArray);
    }

    makeaclitem(grantee?: QueryBuilder, grantor?: QueryBuilder, privileges?: QueryBuilder, isGrantable?: QueryBuilder) {
        return this.pushFunction("MAKEACLITEM", grantee, grantor, privileges, isGrantable);
    }

    // Schema Visibility Inquiry Functions (9.27.3)

    pgCollationIsVisible(collation?: QueryBuilder) {
        return this.pushFunction("PG_COLLATION_IS_VISIBLE", collation);
    }

    pgConversionIsVisible(conversion?: QueryBuilder) {
        return this.pushFunction("PG_CONVERSION_IS_VISIBLE", conversion);
    }

    pgFunctionIsVisible(fn?: QueryBuilder) {
        return this.pushFunction("PG_FUNCTION_IS_VISIBLE", fn);
    }

    pgOpclassIsVisible(opclass?: QueryBuilder) {
        return this.pushFunction("PG_OPCLASS_IS_VISIBLE", opclass);
    }

    pgOperatorIsVisible(operator?: QueryBuilder) {
        return this.pushFunction("PG_OPERATOR_IS_VISIBLE", operator);
    }

    pgOpfamilyIsVisible(opfamily?: QueryBuilder) {
        return this.pushFunction("PG_OPFAMILY_IS_VISIBLE", opfamily);
    }

    pgStatisticsObjIsVisible(stat?: QueryBuilder) {
        return this.pushFunction("PG_STATISTICS_OBJ_IS_VISIBLE", stat);
    }

    pgTableIsVisible(table?: QueryBuilder) {
        return this.pushFunction("PG_TABLE_IS_VISIBLE", table);
    }

    pgTsConfigIsVisible(config?: QueryBuilder) {
        return this.pushFunction("PG_TSCONFIG_IS_VISIBLE", config);
    }

    pgTsDictIsVisible(dict?: QueryBuilder) {
        return this.pushFunction("PG_TSDICT_IS_VISIBLE", dict);
    }

    pgTsParserIsVisible(parser?: QueryBuilder) {
        return this.pushFunction("PG_TSPARSER_IS_VISIBLE", parser);
    }

    pgTsTemplateIsVisible(template?: QueryBuilder) {
        return this.pushFunction("PG_TSTEMPLATE_IS_VISIBLE", template);
    }

    pgTypeIsVisible(type?: QueryBuilder) {
        return this.pushFunction("PG_TYPE_IS_VISIBLE", type);
    }

    // System Catalog Information Functions (9.27.4)

    formatType(type?: QueryBuilder, typemod?: QueryBuilder) {
        return this.pushFunction("FORMAT_TYPE", type, typemod);
    }

    pgBasetype(regtype?: QueryBuilder) {
        return this.pushFunction("PG_BASETYPE", regtype);
    }

    pgCharToEncoding(encoding?: QueryBuilder) {
        return this.pushFunction("PG_CHAR_TO_ENCODING", encoding);
    }

    pgEncodingToChar(encoding?: QueryBuilder) {
        return this.pushFunction("PG_ENCODING_TO_CHAR", encoding);
    }

    pgGetCatalogForeignKeys() {
        return this.pushFunction("PG_GET_CATALOG_FOREIGN_KEYS");
    }

    pgGetConstraintdef(constraint?: QueryBuilder, pretty?: QueryBuilder) {
        return this.pushFunction("PG_GET_CONSTRAINTDEF", constraint, pretty);
    }

    pgGetExpr(expr?: QueryBuilder, relation?: QueryBuilder, pretty?: QueryBuilder) {
        return this.pushFunction("PG_GET_EXPR", expr, relation, pretty);
    }

    pgGetFunctiondef(func?: QueryBuilder) {
        return this.pushFunction("PG_GET_FUNCTIONDEF", func);
    }

    pgGetFunctionArguments(func?: QueryBuilder) {
        return this.pushFunction("PG_GET_FUNCTION_ARGUMENTS", func);
    }

    pgGetFunctionIdentityArguments(func?: QueryBuilder) {
        return this.pushFunction("PG_GET_FUNCTION_IDENTITY_ARGUMENTS", func);
    }

    pgGetFunctionResult(func?: QueryBuilder) {
        return this.pushFunction("PG_GET_FUNCTION_RESULT", func);
    }

    pgGetIndexdef(index?: QueryBuilder, column?: QueryBuilder, pretty?: QueryBuilder) {
        return this.pushFunction("PG_GET_INDEXDEF", index, column, pretty);
    }

    pgGetKeywords() {
        return this.pushFunction("PG_GET_KEYWORDS");
    }

    pgGetPartkeydef(table?: QueryBuilder) {
        return this.pushFunction("PG_GET_PARTKEYDEF", table);
    }

    pgGetRuledef(rule?: QueryBuilder, pretty?: QueryBuilder) {
        return this.pushFunction("PG_GET_RULEDEF", rule, pretty);
    }

    pgGetSerialSequence(table?: QueryBuilder, column?: QueryBuilder) {
        return this.pushFunction("PG_GET_SERIAL_SEQUENCE", table, column);
    }

    pgGetStatisticsobjdef(statobj?: QueryBuilder) {
        return this.pushFunction("PG_GET_STATISTICSOBJDEF", statobj);
    }

    pgGetTriggerdef(trigger?: QueryBuilder, pretty?: QueryBuilder) {
        return this.pushFunction("PG_GET_TRIGGERDEF", trigger, pretty);
    }

    pgGetUserbyid(role?: QueryBuilder) {
        return this.pushFunction("PG_GET_USERBYID", role);
    }

    pgGetViewdef(view?: QueryBuilder, pretty?: QueryBuilder) {
        return this.pushFunction("PG_GET_VIEWDEF", view, pretty);
    }

    pgGetViewdefWrap(view?: QueryBuilder, wrapColumn?: QueryBuilder) {
        return this.pushFunction("PG_GET_VIEWDEF", view, wrapColumn);
    }

    pgIndexColumnHasProperty(index?: QueryBuilder, column?: QueryBuilder, property?: QueryBuilder) {
        return this.pushFunction("PG_INDEX_COLUMN_HAS_PROPERTY", index, column, property);
    }

    pgIndexHasProperty(index?: QueryBuilder, property?: QueryBuilder) {
        return this.pushFunction("PG_INDEX_HAS_PROPERTY", index, property);
    }

    pgIndexamHasProperty(am?: QueryBuilder, property?: QueryBuilder) {
        return this.pushFunction("PG_INDEXAM_HAS_PROPERTY", am, property);
    }

    pgOptionsToTable(optionsArray?: QueryBuilder) {
        return this.pushFunction("PG_OPTIONS_TO_TABLE", optionsArray);
    }

    pgSettingsGetFlags(guc?: QueryBuilder) {
        return this.pushFunction("PG_SETTINGS_GET_FLAGS", guc);
    }

    pgTablespaceDatabases(tablespace?: QueryBuilder) {
        return this.pushFunction("PG_TABLESPACE_DATABASES", tablespace);
    }

    pgTablespaceLocation(tablespace?: QueryBuilder) {
        return this.pushFunction("PG_TABLESPACE_LOCATION", tablespace);
    }

    pgTypeof(value?: QueryBuilder) {
        return this.pushFunction("PG_TYPEOF", value);
    }

    toRegclass(text?: QueryBuilder) {
        return this.pushFunction("TO_REGCLASS", text);
    }

    toRegcollation(text?: QueryBuilder) {
        return this.pushFunction("TO_REGCOLLATION", text);
    }

    toRegnamespace(text?: QueryBuilder) {
        return this.pushFunction("TO_REGNAMESPACE", text);
    }

    toRegoper(text?: QueryBuilder) {
        return this.pushFunction("TO_REGOPER", text);
    }

    toRegoperator(text?: QueryBuilder) {
        return this.pushFunction("TO_REGOPERATOR", text);
    }

    toRegproc(text?: QueryBuilder) {
        return this.pushFunction("TO_REGPROC", text);
    }

    toRegprocedure(text?: QueryBuilder) {
        return this.pushFunction("TO_REGPROCEDURE", text);
    }

    toRegrole(text?: QueryBuilder) {
        return this.pushFunction("TO_REGROLE", text);
    }

    toRegtype(text?: QueryBuilder) {
        return this.pushFunction("TO_REGTYPE", text);
    }

    toRegtypemod(text?: QueryBuilder) {
        return this.pushFunction("TO_REGTYPEMOD", text);
    }

    // Object Information Functions (9.27.5)

    pgGetAcl(classid?: QueryBuilder, objid?: QueryBuilder, objsubid?: QueryBuilder) {
        return this.pushFunction("PG_GET_ACL", classid, objid, objsubid);
    }

    pgDescribeObject(classid?: QueryBuilder, objid?: QueryBuilder, objsubid?: QueryBuilder) {
        return this.pushFunction("PG_DESCRIBE_OBJECT", classid, objid, objsubid);
    }

    pgIdentifyObject(classid?: QueryBuilder, objid?: QueryBuilder, objsubid?: QueryBuilder) {
        return this.pushFunction("PG_IDENTIFY_OBJECT", classid, objid, objsubid);
    }

    pgIdentifyObjectAsAddress(classid?: QueryBuilder, objid?: QueryBuilder, objsubid?: QueryBuilder) {
        return this.pushFunction("PG_IDENTIFY_OBJECT_AS_ADDRESS", classid, objid, objsubid);
    }

    pgGetObjectAddress(type?: QueryBuilder, objectNames?: QueryBuilder, objectArgs?: QueryBuilder) {
        return this.pushFunction("PG_GET_OBJECT_ADDRESS", type, objectNames, objectArgs);
    }

    // Comment Information Functions (9.27.6)

    colDescription(table?: QueryBuilder, column?: QueryBuilder) {
        return this.pushFunction("COL_DESCRIPTION", table, column);
    }

    objDescription(object?: QueryBuilder, catalog?: QueryBuilder) {
        return this.pushFunction("OBJ_DESCRIPTION", object, catalog);
    }

    shobjDescription(object?: QueryBuilder, catalog?: QueryBuilder) {
        return this.pushFunction("SHOBJ_DESCRIPTION", object, catalog);
    }

    // Data Validity Checking Functions (9.27.7)

    pgInputIsValid(string?: QueryBuilder, type?: QueryBuilder) {
        return this.pushFunction("PG_INPUT_IS_VALID", string, type);
    }

    pgInputErrorInfo(string?: QueryBuilder, type?: QueryBuilder) {
        return this.pushFunction("PG_INPUT_ERROR_INFO", string, type);
    }

    mxidAge(xid?: QueryBuilder) {
        return this.pushFunction("MXID_AGE", xid);
    }

    pgCurrentXactId() {
        return this.pushFunction("PG_CURRENT_XACT_ID");
    }

    pgCurrentXactIdIfAssigned() {
        return this.pushFunction("PG_CURRENT_XACT_ID_IF_ASSIGNED");
    }

    pgXactStatus(xid?: QueryBuilder) {
        return this.pushFunction("PG_XACT_STATUS", xid);
    }

    pgCurrentSnapshot() {
        return this.pushFunction("PG_CURRENT_SNAPSHOT");
    }

    pgSnapshotXip(snapshot?: QueryBuilder) {
        return this.pushFunction("PG_SNAPSHOT_XIP", snapshot);
    }

    pgSnapshotXmax(snapshot?: QueryBuilder) {
        return this.pushFunction("PG_SNAPSHOT_XMAX", snapshot);
    }

    pgSnapshotXmin(snapshot?: QueryBuilder) {
        return this.pushFunction("PG_SNAPSHOT_XMIN", snapshot);
    }

    pgVisibleInSnapshot(xid?: QueryBuilder, snapshot?: QueryBuilder) {
        return this.pushFunction("PG_VISIBLE_IN_SNAPSHOT", xid, snapshot);
    }

    pgGetMultixactMembers(multixid?: QueryBuilder) {
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

    txidSnapshotXip(snapshot?: QueryBuilder) {
        return this.pushFunction("TXID_SNAPSHOT_XIP", snapshot);
    }

    txidSnapshotXmax(snapshot?: QueryBuilder) {
        return this.pushFunction("TXID_SNAPSHOT_XMAX", snapshot);
    }

    txidSnapshotXmin(snapshot?: QueryBuilder) {
        return this.pushFunction("TXID_SNAPSHOT_XMIN", snapshot);
    }

    txidVisibleInSnapshot(xid?: QueryBuilder, snapshot?: QueryBuilder) {
        return this.pushFunction("TXID_VISIBLE_IN_SNAPSHOT", xid, snapshot);
    }

    txidStatus(xid?: QueryBuilder) {
        return this.pushFunction("TXID_STATUS", xid);
    }

    // Committed Transaction Information Functions (9.27.9)

    pgXactCommitTimestamp(xid?: QueryBuilder) {
        return this.pushFunction("PG_XACT_COMMIT_TIMESTAMP", xid);
    }

    pgXactCommitTimestampOrigin(xid?: QueryBuilder) {
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

    pgWalSummaryContents(tli?: QueryBuilder, startLsn?: QueryBuilder, endLsn?: QueryBuilder) {
        return this.pushFunction("PG_WAL_SUMMARY_CONTENTS", tli, startLsn, endLsn);
    }

    pgGetWalSummarizerState() {
        return this.pushFunction("PG_GET_WAL_SUMMARIZER_STATE");
    }
}
