import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("info functions", () => {
    describe("session information functions (9.27.1)", () => {
        it("builds current_database", () => {
            const builder = q.select(q.currentDatabase());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT CURRENT_DATABASE()");
        });

        it("builds current_query", () => {
            const builder = q.select(q.currentQuery());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT CURRENT_QUERY()");
        });

        it("builds current_schemas", () => {
            const builder = q.select(q.currentSchemas(q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT CURRENT_SCHEMAS($1)");
            expect(parameters).toEqual([true]);
        });

        it("builds inet_client_addr", () => {
            const builder = q.select(q.inetClientAddr());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT INET_CLIENT_ADDR()");
        });

        it("builds inet_client_port", () => {
            const builder = q.select(q.inetClientPort());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT INET_CLIENT_PORT()");
        });

        it("builds inet_server_addr", () => {
            const builder = q.select(q.inetServerAddr());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT INET_SERVER_ADDR()");
        });

        it("builds inet_server_port", () => {
            const builder = q.select(q.inetServerPort());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT INET_SERVER_PORT()");
        });

        it("builds pg_backend_pid", () => {
            const builder = q.select(q.pgBackendPid());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_BACKEND_PID()");
        });

        it("builds pg_blocking_pids", () => {
            const builder = q.select(q.pgBlockingPids(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_BLOCKING_PIDS($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_conf_load_time", () => {
            const builder = q.select(q.pgConfLoadTime());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CONF_LOAD_TIME()");
        });

        it("builds pg_current_logfile", () => {
            const builder = q.select(q.pgCurrentLogfile(q.l("stderr")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CURRENT_LOGFILE($1)");
            expect(parameters).toEqual(["stderr"]);
        });

        it("builds pg_get_loaded_modules", () => {
            const builder = q.select(q.pgGetLoadedModules());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_GET_LOADED_MODULES()");
        });

        it("builds pg_my_temp_schema", () => {
            const builder = q.select(q.pgMyTempSchema());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_MY_TEMP_SCHEMA()");
        });

        it("builds pg_is_other_temp_schema", () => {
            const builder = q.select(q.pgIsOtherTempSchema(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_IS_OTHER_TEMP_SCHEMA($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_jit_available", () => {
            const builder = q.select(q.pgJitAvailable());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_JIT_AVAILABLE()");
        });

        it("builds pg_numa_available", () => {
            const builder = q.select(q.pgNumaAvailable());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_NUMA_AVAILABLE()");
        });

        it("builds pg_listening_channels", () => {
            const builder = q.select(q.pgListeningChannels());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_LISTENING_CHANNELS()");
        });

        it("builds pg_notification_queue_usage", () => {
            const builder = q.select(q.pgNotificationQueueUsage());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_NOTIFICATION_QUEUE_USAGE()");
        });

        it("builds pg_postmaster_start_time", () => {
            const builder = q.select(q.pgPostmasterStartTime());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_POSTMASTER_START_TIME()");
        });

        it("builds pg_safe_snapshot_blocking_pids", () => {
            const builder = q.select(q.pgSafeSnapshotBlockingPids(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_SAFE_SNAPSHOT_BLOCKING_PIDS($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_trigger_depth", () => {
            const builder = q.select(q.pgTriggerDepth());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_TRIGGER_DEPTH()");
        });
    });

    describe("access privilege inquiry functions (9.27.2)", () => {
        it("builds has_any_column_privilege with table and privilege", () => {
            const builder = q.select(q.hasAnyColumnPrivilege(q.i("users"), q.l("SELECT")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_ANY_COLUMN_PRIVILEGE(users, $1)");
            expect(parameters).toEqual(["SELECT"]);
        });

        it("builds has_any_column_privilege with user, table, and privilege", () => {
            const builder = q.select(q.hasAnyColumnPrivilege(q.l("current_user"), q.i("users"), q.l("SELECT")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_ANY_COLUMN_PRIVILEGE($1, users, $2)");
            expect(parameters).toEqual(["current_user", "SELECT"]);
        });

        it("builds has_column_privilege", () => {
            const builder = q.select(q.hasColumnPrivilege(q.i("users"), q.i("id"), q.l("SELECT")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_COLUMN_PRIVILEGE(users, id, $1)");
            expect(parameters).toEqual(["SELECT"]);
        });

        it("builds has_database_privilege", () => {
            const builder = q.select(q.hasDatabasePrivilege(q.l("mydb"), q.l("CREATE")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_DATABASE_PRIVILEGE($1, $2)");
            expect(parameters).toEqual(["mydb", "CREATE"]);
        });

        it("builds has_function_privilege", () => {
            const builder = q.select(q.hasFunctionPrivilege(q.l("calculate"), q.l("EXECUTE")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_FUNCTION_PRIVILEGE($1, $2)");
            expect(parameters).toEqual(["calculate", "EXECUTE"]);
        });

        it("builds has_language_privilege", () => {
            const builder = q.select(q.hasLanguagePrivilege(q.l("plpgsql"), q.l("USAGE")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_LANGUAGE_PRIVILEGE($1, $2)");
            expect(parameters).toEqual(["plpgsql", "USAGE"]);
        });

        it("builds has_schema_privilege", () => {
            const builder = q.select(q.hasSchemaPrivilege(q.l("public"), q.l("CREATE")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_SCHEMA_PRIVILEGE($1, $2)");
            expect(parameters).toEqual(["public", "CREATE"]);
        });

        it("builds has_sequence_privilege", () => {
            const builder = q.select(q.hasSequencePrivilege(q.i("user_id_seq"), q.l("USAGE")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_SEQUENCE_PRIVILEGE(user_id_seq, $1)");
            expect(parameters).toEqual(["USAGE"]);
        });

        it("builds has_table_privilege", () => {
            const builder = q.select(q.hasTablePrivilege(q.i("users"), q.l("INSERT")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_TABLE_PRIVILEGE(users, $1)");
            expect(parameters).toEqual(["INSERT"]);
        });

        it("builds has_tablespace_privilege", () => {
            const builder = q.select(q.hasTablespacePrivilege(q.l("pg_default"), q.l("CREATE")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_TABLESPACE_PRIVILEGE($1, $2)");
            expect(parameters).toEqual(["pg_default", "CREATE"]);
        });

        it("builds has_type_privilege", () => {
            const builder = q.select(q.hasTypePrivilege(q.i("my_type"), q.l("USAGE")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT HAS_TYPE_PRIVILEGE(my_type, $1)");
            expect(parameters).toEqual(["USAGE"]);
        });

        it("builds pg_has_role", () => {
            const builder = q.select(q.pgHasRole(q.l("postgres"), q.l("MEMBER")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_HAS_ROLE($1, $2)");
            expect(parameters).toEqual(["postgres", "MEMBER"]);
        });

        it("builds row_security_active", () => {
            const builder = q.select(q.rowSecurityActive(q.i("users")));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT ROW_SECURITY_ACTIVE(users)");
        });

        it("builds acldefault", () => {
            const builder = q.select(q.acldefault(q.l("TABLE"), q.l(1)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT ACLDEFAULT($1, $2)");
            expect(parameters).toEqual(["TABLE", 1]);
        });

        it("builds aclexplode", () => {
            const builder = q.select(q.aclexplode(q.c("users.acl")));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT ACLEXPLODE(users.acl)");
        });

        it("builds makeaclitem", () => {
            const builder = q.select(q.makeaclitem(q.l(1), q.l(2), q.l("SELECT"), q.l(false)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT MAKEACLITEM($1, $2, $3, $4)");
            expect(parameters).toEqual([1, 2, "SELECT", false]);
        });
    });

    describe("schema visibility inquiry functions (9.27.3)", () => {
        it("builds pg_collation_is_visible", () => {
            const builder = q.select(q.pgCollationIsVisible(q.l("en_US")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_COLLATION_IS_VISIBLE($1)");
            expect(parameters).toEqual(["en_US"]);
        });

        it("builds pg_conversion_is_visible", () => {
            const builder = q.select(q.pgConversionIsVisible(q.l("latin1_to_utf8")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CONVERSION_IS_VISIBLE($1)");
            expect(parameters).toEqual(["latin1_to_utf8"]);
        });

        it("builds pg_function_is_visible", () => {
            const builder = q.select(q.pgFunctionIsVisible(q.l("calculate")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_FUNCTION_IS_VISIBLE($1)");
            expect(parameters).toEqual(["calculate"]);
        });

        it("builds pg_table_is_visible", () => {
            const builder = q.select(q.pgTableIsVisible(q.i("users")));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_TABLE_IS_VISIBLE(users)");
        });

        it("builds pg_type_is_visible", () => {
            const builder = q.select(q.pgTypeIsVisible(q.l("my_type")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TYPE_IS_VISIBLE($1)");
            expect(parameters).toEqual(["my_type"]);
        });
    });

    describe("system catalog information functions (9.27.4)", () => {
        it("builds format_type", () => {
            const builder = q.select(q.formatType(q.l("integer"), q.l(-1)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT FORMAT_TYPE($1, $2)");
            expect(parameters).toEqual(["integer", -1]);
        });

        it("builds pg_get_constraintdef", () => {
            const builder = q.select(q.pgGetConstraintdef(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_CONSTRAINTDEF($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_get_functiondef", () => {
            const builder = q.select(q.pgGetFunctiondef(q.l("calculate")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_FUNCTIONDEF($1)");
            expect(parameters).toEqual(["calculate"]);
        });

        it("builds pg_get_indexdef", () => {
            const builder = q.select(q.pgGetIndexdef(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_INDEXDEF($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_get_keywords", () => {
            const builder = q.select(q.pgGetKeywords());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_GET_KEYWORDS()");
        });

        it("builds pg_get_ruledef", () => {
            const builder = q.select(q.pgGetRuledef(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_RULEDEF($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_get_serial_sequence", () => {
            const builder = q.select(q.pgGetSerialSequence(q.i("users"), q.i("id")));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_GET_SERIAL_SEQUENCE(users, id)");
        });

        it("builds pg_get_triggerdef", () => {
            const builder = q.select(q.pgGetTriggerdef(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_TRIGGERDEF($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_get_userbyid", () => {
            const builder = q.select(q.pgGetUserbyid(q.l(1)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_USERBYID($1)");
            expect(parameters).toEqual([1]);
        });

        it("builds pg_get_viewdef", () => {
            const builder = q.select(q.pgGetViewdef(q.i("my_view")));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_GET_VIEWDEF(my_view)");
        });

        it("builds pg_index_has_property", () => {
            const builder = q.select(q.pgIndexHasProperty(q.l(12345), q.l("clusterable")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_INDEX_HAS_PROPERTY($1, $2)");
            expect(parameters).toEqual([12345, "clusterable"]);
        });

        it("builds pg_tablespace_location", () => {
            const builder = q.select(q.pgTablespaceLocation(q.l("pg_default")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TABLESPACE_LOCATION($1)");
            expect(parameters).toEqual(["pg_default"]);
        });

        it("builds pg_typeof override", () => {
            const builder = q.select(q.pgTypeof(q.l(42)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TYPEOF($1)");
            expect(parameters).toEqual([42]);
        });

        it("builds to_regclass", () => {
            const builder = q.select(q.toRegclass(q.l("users")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT TO_REGCLASS($1)");
            expect(parameters).toEqual(["users"]);
        });

        it("builds to_regtype", () => {
            const builder = q.select(q.toRegtype(q.l("integer")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT TO_REGTYPE($1)");
            expect(parameters).toEqual(["integer"]);
        });
    });

    describe("object information functions (9.27.5)", () => {
        it("builds pg_get_acl", () => {
            const builder = q.select(q.pgGetAcl(q.l("pg_class"), q.l(12345), q.l(0)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_ACL($1, $2, $3)");
            expect(parameters).toEqual(["pg_class", 12345, 0]);
        });

        it("builds pg_describe_object", () => {
            const builder = q.select(q.pgDescribeObject(q.l("pg_class"), q.l(12345), q.l(0)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_DESCRIBE_OBJECT($1, $2, $3)");
            expect(parameters).toEqual(["pg_class", 12345, 0]);
        });

        it("builds pg_identify_object", () => {
            const builder = q.select(q.pgIdentifyObject(q.l("pg_class"), q.l(12345), q.l(0)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_IDENTIFY_OBJECT($1, $2, $3)");
            expect(parameters).toEqual(["pg_class", 12345, 0]);
        });
    });

    describe("comment information functions (9.27.6)", () => {
        it("builds col_description", () => {
            const builder = q.select(q.colDescription(q.i("users"), q.i("id")));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT COL_DESCRIPTION(users, id)");
        });

        it("builds obj_description", () => {
            const builder = q.select(q.objDescription(q.l(12345), q.l("pg_class")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT OBJ_DESCRIPTION($1, $2)");
            expect(parameters).toEqual([12345, "pg_class"]);
        });

        it("builds shobj_description", () => {
            const builder = q.select(q.shobjDescription(q.l(12345), q.l("pg_database")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SHOBJ_DESCRIPTION($1, $2)");
            expect(parameters).toEqual([12345, "pg_database"]);
        });
    });

    describe("data validity checking functions (9.27.7)", () => {
        it("builds pg_input_is_valid", () => {
            const builder = q.select(q.pgInputIsValid(q.l("123"), q.l("integer")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_INPUT_IS_VALID($1, $2)");
            expect(parameters).toEqual(["123", "integer"]);
        });

        it("builds pg_input_error_info", () => {
            const builder = q.select(q.pgInputErrorInfo(q.l("abc"), q.l("integer")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_INPUT_ERROR_INFO($1, $2)");
            expect(parameters).toEqual(["abc", "integer"]);
        });
    });

    describe("transaction ID and snapshot information functions (9.27.8)", () => {
        it("builds age", () => {
            const builder = q.select(q.age(q.l("12345")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT AGE($1)");
            expect(parameters).toEqual(["12345"]);
        });

        it("builds mxid_age", () => {
            const builder = q.select(q.mxidAge(q.l("12345")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT MXID_AGE($1)");
            expect(parameters).toEqual(["12345"]);
        });

        it("builds pg_current_xact_id", () => {
            const builder = q.select(q.pgCurrentXactId());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CURRENT_XACT_ID()");
        });

        it("builds pg_current_xact_id_if_assigned", () => {
            const builder = q.select(q.pgCurrentXactIdIfAssigned());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CURRENT_XACT_ID_IF_ASSIGNED()");
        });

        it("builds pg_xact_status", () => {
            const builder = q.select(q.pgXactStatus(q.l("12345")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_XACT_STATUS($1)");
            expect(parameters).toEqual(["12345"]);
        });

        it("builds pg_current_snapshot", () => {
            const builder = q.select(q.pgCurrentSnapshot());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CURRENT_SNAPSHOT()");
        });

        it("builds pg_snapshot_xip", () => {
            const builder = q.select(q.pgSnapshotXip(q.pgCurrentSnapshot()));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_SNAPSHOT_XIP(PG_CURRENT_SNAPSHOT())");
        });

        it("builds pg_snapshot_xmax", () => {
            const builder = q.select(q.pgSnapshotXmax(q.pgCurrentSnapshot()));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_SNAPSHOT_XMAX(PG_CURRENT_SNAPSHOT())");
        });

        it("builds pg_snapshot_xmin", () => {
            const builder = q.select(q.pgSnapshotXmin(q.pgCurrentSnapshot()));
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_SNAPSHOT_XMIN(PG_CURRENT_SNAPSHOT())");
        });

        it("builds pg_visible_in_snapshot", () => {
            const builder = q.select(q.pgVisibleInSnapshot(q.l("12345"), q.pgCurrentSnapshot()));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_VISIBLE_IN_SNAPSHOT($1, PG_CURRENT_SNAPSHOT())");
            expect(parameters).toEqual(["12345"]);
        });

        it("builds pg_get_multixact_members", () => {
            const builder = q.select(q.pgGetMultixactMembers(q.l("12345")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_MULTIXACT_MEMBERS($1)");
            expect(parameters).toEqual(["12345"]);
        });

        it("builds txid_current (deprecated)", () => {
            const builder = q.select(q.txidCurrent());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT TXID_CURRENT()");
        });

        it("builds txid_current_snapshot (deprecated)", () => {
            const builder = q.select(q.txidCurrentSnapshot());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT TXID_CURRENT_SNAPSHOT()");
        });

        it("builds txid_status (deprecated)", () => {
            const builder = q.select(q.txidStatus(q.l("12345")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT TXID_STATUS($1)");
            expect(parameters).toEqual(["12345"]);
        });
    });

    describe("committed transaction information functions (9.27.9)", () => {
        it("builds pg_xact_commit_timestamp", () => {
            const builder = q.select(q.pgXactCommitTimestamp(q.l("12345")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_XACT_COMMIT_TIMESTAMP($1)");
            expect(parameters).toEqual(["12345"]);
        });

        it("builds pg_xact_commit_timestamp_origin", () => {
            const builder = q.select(q.pgXactCommitTimestampOrigin(q.l("12345")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_XACT_COMMIT_TIMESTAMP_ORIGIN($1)");
            expect(parameters).toEqual(["12345"]);
        });

        it("builds pg_last_committed_xact", () => {
            const builder = q.select(q.pgLastCommittedXact());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_LAST_COMMITTED_XACT()");
        });
    });

    describe("control data functions (9.27.10)", () => {
        it("builds pg_control_checkpoint", () => {
            const builder = q.select(q.pgControlCheckpoint());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CONTROL_CHECKPOINT()");
        });

        it("builds pg_control_system", () => {
            const builder = q.select(q.pgControlSystem());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CONTROL_SYSTEM()");
        });

        it("builds pg_control_init", () => {
            const builder = q.select(q.pgControlInit());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CONTROL_INIT()");
        });

        it("builds pg_control_recovery", () => {
            const builder = q.select(q.pgControlRecovery());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_CONTROL_RECOVERY()");
        });
    });

    describe("version information functions (9.27.11)", () => {
        it("builds unicode_version override", () => {
            const builder = q.select(q.unicodeVersion());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT UNICODE_VERSION()");
        });

        it("builds icu_unicode_version", () => {
            const builder = q.select(q.icuUnicodeVersion());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT ICU_UNICODE_VERSION()");
        });
    });

    describe("WAL summarization information functions (9.27.12)", () => {
        it("builds pg_available_wal_summaries", () => {
            const builder = q.select(q.pgAvailableWalSummaries());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_AVAILABLE_WAL_SUMMARIES()");
        });

        it("builds pg_wal_summary_contents", () => {
            const builder = q.select(q.pgWalSummaryContents(q.l(1), q.l("0/0"), q.l("0/100")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_WAL_SUMMARY_CONTENTS($1, $2, $3)");
            expect(parameters).toEqual([1, "0/0", "0/100"]);
        });

        it("builds pg_get_wal_summarizer_state", () => {
            const builder = q.select(q.pgGetWalSummarizerState());
            const sql = builder.getSql();
            expect(sql).toBe("SELECT PG_GET_WAL_SUMMARIZER_STATE()");
        });
    });

    describe("complex queries with info functions", () => {
        it("builds query with info function in SELECT clause", () => {
            const builder = q.select(
                q.i("id"),
                q.currentDatabase().as("db"),
                q.sessionUser().as("session_user_name"),
            ).from("users");
            const sql = builder.getSql();
            expect(sql).toBe("SELECT id, CURRENT_DATABASE() AS db, SESSION_USER AS session_user_name FROM users");
        });

        it("builds query with privilege check in WHERE clause", () => {
            const builder = q.select("*")
                .from("table_names")
                .where(q.hasTablePrivilege(q.l("current_user"), q.i("table_names"), q.l("SELECT")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT * FROM table_names WHERE HAS_TABLE_PRIVILEGE($1, table_names, $2)");
            expect(parameters).toEqual(["current_user", "SELECT"]);
        });

        it("builds query with pg_typeof in SELECT", () => {
            const builder = q.select(q.i("id"), q.pgTypeof(q.i("id")).as("type")).from("users");
            const sql = builder.getSql();
            expect(sql).toBe("SELECT id, PG_TYPEOF(id) AS type FROM users");
        });

        it("builds query with multiple session info functions", () => {
            const builder = q.select(
                q.currentDatabase(),
                q.currentUser(),
                q.pgBackendPid(),
                q.inetClientAddr(),
            );
            const sql = builder.getSql();
            expect(sql).toBe("SELECT CURRENT_DATABASE(), CURRENT_USER, PG_BACKEND_PID(), INET_CLIENT_ADDR()");
        });
    });
});
