import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("info functions", () => {
    describe("session information functions (9.27.1)", () => {
        it("builds current_database", () => {
            const builder = q.select(q.currentDatabase());
            expectQuery(builder, "info", "current_database");
        });

        it("builds current_query", () => {
            const builder = q.select(q.currentQuery());
            expectQuery(builder, "info", "current_query");
        });

        it("builds current_schemas", () => {
            const builder = q.select(q.currentSchemas(q.l(true)));
            expectQuery(builder, "info", "current_schemas");
        });

        it("builds inet_client_addr", () => {
            const builder = q.select(q.inetClientAddr());
            expectQuery(builder, "info", "inet_client_addr");
        });

        it("builds inet_client_port", () => {
            const builder = q.select(q.inetClientPort());
            expectQuery(builder, "info", "inet_client_port");
        });

        it("builds inet_server_addr", () => {
            const builder = q.select(q.inetServerAddr());
            expectQuery(builder, "info", "inet_server_addr");
        });

        it("builds inet_server_port", () => {
            const builder = q.select(q.inetServerPort());
            expectQuery(builder, "info", "inet_server_port");
        });

        it("builds pg_backend_pid", () => {
            const builder = q.select(q.pgBackendPid());
            expectQuery(builder, "info", "pg_backend_pid");
        });

        it("builds pg_blocking_pids", () => {
            const builder = q.select(q.pgBlockingPids(q.l(12345)));
            expectQuery(builder, "info", "pg_blocking_pids");
        });

        it("builds pg_conf_load_time", () => {
            const builder = q.select(q.pgConfLoadTime());
            expectQuery(builder, "info", "pg_conf_load_time");
        });

        it("builds pg_current_logfile", () => {
            const builder = q.select(q.pgCurrentLogfile(q.l("stderr")));
            expectQuery(builder, "info", "pg_current_logfile");
        });

        it("builds pg_get_loaded_modules", () => {
            const builder = q.select(q.pgGetLoadedModules());
            expectQuery(builder, "info", "pg_get_loaded_modules");
        });

        it("builds pg_my_temp_schema", () => {
            const builder = q.select(q.pgMyTempSchema());
            expectQuery(builder, "info", "pg_my_temp_schema");
        });

        it("builds pg_is_other_temp_schema", () => {
            const builder = q.select(q.pgIsOtherTempSchema(q.l(12345)));
            expectQuery(builder, "info", "pg_is_other_temp_schema");
        });

        it("builds pg_jit_available", () => {
            const builder = q.select(q.pgJitAvailable());
            expectQuery(builder, "info", "pg_jit_available");
        });

        it("builds pg_numa_available", () => {
            const builder = q.select(q.pgNumaAvailable());
            expectQuery(builder, "info", "pg_numa_available");
        });

        it("builds pg_listening_channels", () => {
            const builder = q.select(q.pgListeningChannels());
            expectQuery(builder, "info", "pg_listening_channels");
        });

        it("builds pg_notification_queue_usage", () => {
            const builder = q.select(q.pgNotificationQueueUsage());
            expectQuery(builder, "info", "pg_notification_queue_usage");
        });

        it("builds pg_postmaster_start_time", () => {
            const builder = q.select(q.pgPostmasterStartTime());
            expectQuery(builder, "info", "pg_postmaster_start_time");
        });

        it("builds pg_safe_snapshot_blocking_pids", () => {
            const builder = q.select(q.pgSafeSnapshotBlockingPids(q.l(12345)));
            expectQuery(builder, "info", "pg_safe_snapshot_blocking_pids");
        });

        it("builds pg_trigger_depth", () => {
            const builder = q.select(q.pgTriggerDepth());
            expectQuery(builder, "info", "pg_trigger_depth");
        });
    });

    describe("access privilege inquiry functions (9.27.2)", () => {
        it("builds has_any_column_privilege with table and privilege", () => {
            const builder = q.select(q.hasAnyColumnPrivilege(q.i("users"), q.l("SELECT")));
            expectQuery(builder, "info", "has_any_column_privilege with table and privilege");
        });

        it("builds has_any_column_privilege with user, table, and privilege", () => {
            const builder = q.select(q.hasAnyColumnPrivilege(q.l("current_user"), q.i("users"), q.l("SELECT")));
            expectQuery(builder, "info", "has_any_column_privilege with user table and privilege");
        });

        it("builds has_column_privilege", () => {
            const builder = q.select(q.hasColumnPrivilege(q.i("users"), q.i("id"), q.l("SELECT")));
            expectQuery(builder, "info", "has_column_privilege");
        });

        it("builds has_database_privilege", () => {
            const builder = q.select(q.hasDatabasePrivilege(q.l("mydb"), q.l("CREATE")));
            expectQuery(builder, "info", "has_database_privilege");
        });

        it("builds has_function_privilege", () => {
            const builder = q.select(q.hasFunctionPrivilege(q.l("calculate"), q.l("EXECUTE")));
            expectQuery(builder, "info", "has_function_privilege");
        });

        it("builds has_language_privilege", () => {
            const builder = q.select(q.hasLanguagePrivilege(q.l("plpgsql"), q.l("USAGE")));
            expectQuery(builder, "info", "has_language_privilege");
        });

        it("builds has_schema_privilege", () => {
            const builder = q.select(q.hasSchemaPrivilege(q.l("public"), q.l("CREATE")));
            expectQuery(builder, "info", "has_schema_privilege");
        });

        it("builds has_sequence_privilege", () => {
            const builder = q.select(q.hasSequencePrivilege(q.i("user_id_seq"), q.l("USAGE")));
            expectQuery(builder, "info", "has_sequence_privilege");
        });

        it("builds has_table_privilege", () => {
            const builder = q.select(q.hasTablePrivilege(q.i("users"), q.l("INSERT")));
            expectQuery(builder, "info", "has_table_privilege");
        });

        it("builds has_tablespace_privilege", () => {
            const builder = q.select(q.hasTablespacePrivilege(q.l("pg_default"), q.l("CREATE")));
            expectQuery(builder, "info", "has_tablespace_privilege");
        });

        it("builds has_type_privilege", () => {
            const builder = q.select(q.hasTypePrivilege(q.i("my_type"), q.l("USAGE")));
            expectQuery(builder, "info", "has_type_privilege");
        });

        it("builds pg_has_role", () => {
            const builder = q.select(q.pgHasRole(q.l("postgres"), q.l("MEMBER")));
            expectQuery(builder, "info", "pg_has_role");
        });

        it("builds row_security_active", () => {
            const builder = q.select(q.rowSecurityActive(q.i("users")));
            expectQuery(builder, "info", "row_security_active");
        });

        it("builds acldefault", () => {
            const builder = q.select(q.acldefault(q.l("TABLE"), q.l(1)));
            expectQuery(builder, "info", "acldefault");
        });

        it("builds aclexplode", () => {
            const builder = q.select(q.aclexplode(q.c("users.acl")));
            expectQuery(builder, "info", "aclexplode");
        });

        it("builds makeaclitem", () => {
            const builder = q.select(q.makeaclitem(q.l(1), q.l(2), q.l("SELECT"), q.l(false)));
            expectQuery(builder, "info", "makeaclitem");
        });
    });

    describe("schema visibility inquiry functions (9.27.3)", () => {
        it("builds pg_collation_is_visible", () => {
            const builder = q.select(q.pgCollationIsVisible(q.l("en_US")));
            expectQuery(builder, "info", "pg_collation_is_visible");
        });

        it("builds pg_conversion_is_visible", () => {
            const builder = q.select(q.pgConversionIsVisible(q.l("latin1_to_utf8")));
            expectQuery(builder, "info", "pg_conversion_is_visible");
        });

        it("builds pg_function_is_visible", () => {
            const builder = q.select(q.pgFunctionIsVisible(q.l("calculate")));
            expectQuery(builder, "info", "pg_function_is_visible");
        });

        it("builds pg_table_is_visible", () => {
            const builder = q.select(q.pgTableIsVisible(q.i("users")));
            expectQuery(builder, "info", "pg_table_is_visible");
        });

        it("builds pg_type_is_visible", () => {
            const builder = q.select(q.pgTypeIsVisible(q.l("my_type")));
            expectQuery(builder, "info", "pg_type_is_visible");
        });
    });

    describe("system catalog information functions (9.27.4)", () => {
        it("builds format_type", () => {
            const builder = q.select(q.formatType(q.l("integer"), q.l(-1)));
            expectQuery(builder, "info", "format_type");
        });

        it("builds pg_get_constraintdef", () => {
            const builder = q.select(q.pgGetConstraintdef(q.l(12345)));
            expectQuery(builder, "info", "pg_get_constraintdef");
        });

        it("builds pg_get_functiondef", () => {
            const builder = q.select(q.pgGetFunctiondef(q.l("calculate")));
            expectQuery(builder, "info", "pg_get_functiondef");
        });

        it("builds pg_get_indexdef", () => {
            const builder = q.select(q.pgGetIndexdef(q.l(12345)));
            expectQuery(builder, "info", "pg_get_indexdef");
        });

        it("builds pg_get_keywords", () => {
            const builder = q.select(q.pgGetKeywords());
            expectQuery(builder, "info", "pg_get_keywords");
        });

        it("builds pg_get_ruledef", () => {
            const builder = q.select(q.pgGetRuledef(q.l(12345)));
            expectQuery(builder, "info", "pg_get_ruledef");
        });

        it("builds pg_get_serial_sequence", () => {
            const builder = q.select(q.pgGetSerialSequence(q.i("users"), q.i("id")));
            expectQuery(builder, "info", "pg_get_serial_sequence");
        });

        it("builds pg_get_triggerdef", () => {
            const builder = q.select(q.pgGetTriggerdef(q.l(12345)));
            expectQuery(builder, "info", "pg_get_triggerdef");
        });

        it("builds pg_get_userbyid", () => {
            const builder = q.select(q.pgGetUserbyid(q.l(1)));
            expectQuery(builder, "info", "pg_get_userbyid");
        });

        it("builds pg_get_viewdef", () => {
            const builder = q.select(q.pgGetViewdef(q.i("my_view")));
            expectQuery(builder, "info", "pg_get_viewdef");
        });

        it("builds pg_index_has_property", () => {
            const builder = q.select(q.pgIndexHasProperty(q.l(12345), q.l("clusterable")));
            expectQuery(builder, "info", "pg_index_has_property");
        });

        it("builds pg_tablespace_location", () => {
            const builder = q.select(q.pgTablespaceLocation(q.l("pg_default")));
            expectQuery(builder, "info", "pg_tablespace_location");
        });

        it("builds pg_typeof override", () => {
            const builder = q.select(q.pgTypeof(q.l(42)));
            expectQuery(builder, "info", "pg_typeof override");
        });

        it("builds to_regclass", () => {
            const builder = q.select(q.toRegclass(q.l("users")));
            expectQuery(builder, "info", "to_regclass");
        });

        it("builds to_regtype", () => {
            const builder = q.select(q.toRegtype(q.l("integer")));
            expectQuery(builder, "info", "to_regtype");
        });
    });

    describe("object information functions (9.27.5)", () => {
        it("builds pg_get_acl", () => {
            const builder = q.select(q.pgGetAcl(q.l("pg_class"), q.l(12345), q.l(0)));
            expectQuery(builder, "info", "pg_get_acl");
        });

        it("builds pg_describe_object", () => {
            const builder = q.select(q.pgDescribeObject(q.l("pg_class"), q.l(12345), q.l(0)));
            expectQuery(builder, "info", "pg_describe_object");
        });

        it("builds pg_identify_object", () => {
            const builder = q.select(q.pgIdentifyObject(q.l("pg_class"), q.l(12345), q.l(0)));
            expectQuery(builder, "info", "pg_identify_object");
        });
    });

    describe("comment information functions (9.27.6)", () => {
        it("builds col_description", () => {
            const builder = q.select(q.colDescription(q.i("users"), q.i("id")));
            expectQuery(builder, "info", "col_description");
        });

        it("builds obj_description", () => {
            const builder = q.select(q.objDescription(q.l(12345), q.l("pg_class")));
            expectQuery(builder, "info", "obj_description");
        });

        it("builds shobj_description", () => {
            const builder = q.select(q.shobjDescription(q.l(12345), q.l("pg_database")));
            expectQuery(builder, "info", "shobj_description");
        });
    });

    describe("data validity checking functions (9.27.7)", () => {
        it("builds pg_input_is_valid", () => {
            const builder = q.select(q.pgInputIsValid(q.l("123"), q.l("integer")));
            expectQuery(builder, "info", "pg_input_is_valid");
        });

        it("builds pg_input_error_info", () => {
            const builder = q.select(q.pgInputErrorInfo(q.l("abc"), q.l("integer")));
            expectQuery(builder, "info", "pg_input_error_info");
        });
    });

    describe("transaction ID and snapshot information functions (9.27.8)", () => {
        it("builds age", () => {
            const builder = q.select(q.age(q.l("12345")));
            expectQuery(builder, "info", "age (transaction ID)");
        });

        it("builds mxid_age", () => {
            const builder = q.select(q.mxidAge(q.l("12345")));
            expectQuery(builder, "info", "mxid_age");
        });

        it("builds pg_current_xact_id", () => {
            const builder = q.select(q.pgCurrentXactId());
            expectQuery(builder, "info", "pg_current_xact_id");
        });

        it("builds pg_current_xact_id_if_assigned", () => {
            const builder = q.select(q.pgCurrentXactIdIfAssigned());
            expectQuery(builder, "info", "pg_current_xact_id_if_assigned");
        });

        it("builds pg_xact_status", () => {
            const builder = q.select(q.pgXactStatus(q.l("12345")));
            expectQuery(builder, "info", "pg_xact_status");
        });

        it("builds pg_current_snapshot", () => {
            const builder = q.select(q.pgCurrentSnapshot());
            expectQuery(builder, "info", "pg_current_snapshot");
        });

        it("builds pg_snapshot_xip", () => {
            const builder = q.select(q.pgSnapshotXip(q.pgCurrentSnapshot()));
            expectQuery(builder, "info", "pg_snapshot_xip");
        });

        it("builds pg_snapshot_xmax", () => {
            const builder = q.select(q.pgSnapshotXmax(q.pgCurrentSnapshot()));
            expectQuery(builder, "info", "pg_snapshot_xmax");
        });

        it("builds pg_snapshot_xmin", () => {
            const builder = q.select(q.pgSnapshotXmin(q.pgCurrentSnapshot()));
            expectQuery(builder, "info", "pg_snapshot_xmin");
        });

        it("builds pg_visible_in_snapshot", () => {
            const builder = q.select(q.pgVisibleInSnapshot(q.l("12345"), q.pgCurrentSnapshot()));
            expectQuery(builder, "info", "pg_visible_in_snapshot");
        });

        it("builds pg_get_multixact_members", () => {
            const builder = q.select(q.pgGetMultixactMembers(q.l("12345")));
            expectQuery(builder, "info", "pg_get_multixact_members");
        });

        it("builds txid_current (deprecated)", () => {
            const builder = q.select(q.txidCurrent());
            expectQuery(builder, "info", "txid_current");
        });

        it("builds txid_current_snapshot (deprecated)", () => {
            const builder = q.select(q.txidCurrentSnapshot());
            expectQuery(builder, "info", "txid_current_snapshot");
        });

        it("builds txid_status (deprecated)", () => {
            const builder = q.select(q.txidStatus(q.l("12345")));
            expectQuery(builder, "info", "txid_status");
        });
    });

    describe("committed transaction information functions (9.27.9)", () => {
        it("builds pg_xact_commit_timestamp", () => {
            const builder = q.select(q.pgXactCommitTimestamp(q.l("12345")));
            expectQuery(builder, "info", "pg_xact_commit_timestamp");
        });

        it("builds pg_xact_commit_timestamp_origin", () => {
            const builder = q.select(q.pgXactCommitTimestampOrigin(q.l("12345")));
            expectQuery(builder, "info", "pg_xact_commit_timestamp_origin");
        });

        it("builds pg_last_committed_xact", () => {
            const builder = q.select(q.pgLastCommittedXact());
            expectQuery(builder, "info", "pg_last_committed_xact");
        });
    });

    describe("control data functions (9.27.10)", () => {
        it("builds pg_control_checkpoint", () => {
            const builder = q.select(q.pgControlCheckpoint());
            expectQuery(builder, "info", "pg_control_checkpoint");
        });

        it("builds pg_control_system", () => {
            const builder = q.select(q.pgControlSystem());
            expectQuery(builder, "info", "pg_control_system");
        });

        it("builds pg_control_init", () => {
            const builder = q.select(q.pgControlInit());
            expectQuery(builder, "info", "pg_control_init");
        });

        it("builds pg_control_recovery", () => {
            const builder = q.select(q.pgControlRecovery());
            expectQuery(builder, "info", "pg_control_recovery");
        });
    });

    describe("version information functions (9.27.11)", () => {
        it("builds unicode_version override", () => {
            const builder = q.select(q.unicodeVersion());
            expectQuery(builder, "info", "unicode_version override");
        });

        it("builds icu_unicode_version", () => {
            const builder = q.select(q.icuUnicodeVersion());
            expectQuery(builder, "info", "icu_unicode_version");
        });
    });

    describe("WAL summarization information functions (9.27.12)", () => {
        it("builds pg_available_wal_summaries", () => {
            const builder = q.select(q.pgAvailableWalSummaries());
            expectQuery(builder, "info", "pg_available_wal_summaries");
        });

        it("builds pg_wal_summary_contents", () => {
            const builder = q.select(q.pgWalSummaryContents(q.l(1), q.l("0/0"), q.l("0/100")));
            expectQuery(builder, "info", "pg_wal_summary_contents");
        });

        it("builds pg_get_wal_summarizer_state", () => {
            const builder = q.select(q.pgGetWalSummarizerState());
            expectQuery(builder, "info", "pg_get_wal_summarizer_state");
        });
    });

    describe("complex queries with info functions", () => {
        it("builds query with info function in SELECT clause", () => {
            const builder = q.select(
                q.i("id"),
                q.currentDatabase().as(q.c("db")),
                q.sessionUser().as(q.c("session_user_name")),
            ).from(q.t("users"));
            expectQuery(builder, "info", "query with info function in SELECT clause");
        });

        it("builds query with privilege check in WHERE clause", () => {
            const builder = q.select("*")
                .from(q.t("table_names"))
                .where(q.hasTablePrivilege(q.l("current_user"), q.i("table_names"), q.l("SELECT")));
            expectQuery(builder, "info", "query with privilege check in WHERE clause");
        });

        it("builds query with pg_typeof in SELECT", () => {
            const builder = q.select(q.i("id"), q.pgTypeof(q.i("id")).as(q.c("type"))).from(q.t("users"));
            expectQuery(builder, "info", "query with pg_typeof in SELECT");
        });

        it("builds query with multiple session info functions", () => {
            const builder = q.select(
                q.currentDatabase(),
                q.currentUser(),
                q.pgBackendPid(),
                q.inetClientAddr(),
            );
            expectQuery(builder, "info", "query with multiple session info functions");
        });
    });
});
