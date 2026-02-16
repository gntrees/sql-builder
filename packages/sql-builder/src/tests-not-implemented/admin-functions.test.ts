import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("Admin Functions", () => {
    describe("9.28.1. Configuration Settings Functions", () => {
        it("builds current_setting", () => {
            const builder = q.select(q.currentSetting(q.l("datestyle")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT CURRENT_SETTING($1)");
            expect(parameters).toEqual(["datestyle"]);
        });

        it("builds current_setting with missing_ok", () => {
            const builder = q.select(q.currentSetting(q.l("unknown_setting"), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT CURRENT_SETTING($1, $2)");
            expect(parameters).toEqual(["unknown_setting", true]);
        });

        it("builds set_config", () => {
            const builder = q.select(q.setConfig(q.l("datestyle"), q.l("ISO, MDY"), q.l(false)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT SET_CONFIG($1, $2, $3)");
            expect(parameters).toEqual(["datestyle", "ISO, MDY", false]);
        });
    });

    describe("9.28.2. Server Signaling Functions", () => {
        it("builds pg_cancel_backend", () => {
            const builder = q.select(q.pgCancelBackend(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CANCEL_BACKEND($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_log_backend_memory_contexts", () => {
            const builder = q.select(q.pgLogBackendMemoryContexts(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LOG_BACKEND_MEMORY_CONTEXTS($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_reload_conf", () => {
            const builder = q.select(q.pgReloadConf());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_RELOAD_CONF()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_rotate_logfile", () => {
            const builder = q.select(q.pgRotateLogfile());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ROTATE_LOGFILE()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_terminate_backend", () => {
            const builder = q.select(q.pgTerminateBackend(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TERMINATE_BACKEND($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_terminate_backend with timeout", () => {
            const builder = q.select(q.pgTerminateBackend(q.l(12345), q.l(5000)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TERMINATE_BACKEND($1, $2)");
            expect(parameters).toEqual([12345, 5000]);
        });
    });

    describe("9.28.3. Backup Control Functions", () => {
        it("builds pg_create_restore_point", () => {
            const builder = q.select(q.pgCreateRestorePoint(q.l("my_restore_point")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CREATE_RESTORE_POINT($1)");
            expect(parameters).toEqual(["my_restore_point"]);
        });

        it("builds pg_current_wal_flush_lsn", () => {
            const builder = q.select(q.pgCurrentWalFlushLsn());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CURRENT_WAL_FLUSH_LSN()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_current_wal_insert_lsn", () => {
            const builder = q.select(q.pgCurrentWalInsertLsn());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CURRENT_WAL_INSERT_LSN()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_current_wal_lsn", () => {
            const builder = q.select(q.pgCurrentWalLsn());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CURRENT_WAL_LSN()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_backup_start", () => {
            const builder = q.select(q.pgBackupStart(q.l("my_backup"), q.l(false)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_BACKUP_START($1, $2)");
            expect(parameters).toEqual(["my_backup", false]);
        });

        it("builds pg_backup_stop", () => {
            const builder = q.select(q.pgBackupStop(q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_BACKUP_STOP($1)");
            expect(parameters).toEqual([true]);
        });

        it("builds pg_switch_wal", () => {
            const builder = q.select(q.pgSwitchWal());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_SWITCH_WAL()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_walfile_name", () => {
            const builder = q.select(q.pgWalfileName(q.l("0/16A4400")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_WALFILE_NAME($1)");
            expect(parameters).toEqual(["0/16A4400"]);
        });

        it("builds pg_walfile_name_offset", () => {
            const builder = q.select(q.pgWalfileNameOffset(q.l("0/16A4400")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_WALFILE_NAME_OFFSET($1)");
            expect(parameters).toEqual(["0/16A4400"]);
        });

        it("builds pg_split_walfile_name", () => {
            const builder = q.select(q.pgSplitWalfileName(q.l("000000010000000000000001")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_SPLIT_WALFILE_NAME($1)");
            expect(parameters).toEqual(["000000010000000000000001"]);
        });

        it("builds pg_wal_lsn_diff", () => {
            const builder = q.select(q.pgWalLsnDiff(q.l("0/16A4400"), q.l("0/16A3218")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_WAL_LSN_DIFF($1, $2)");
            expect(parameters).toEqual(["0/16A4400", "0/16A3218"]);
        });
    });

    describe("9.28.4. Recovery Control Functions", () => {
        it("builds pg_is_in_recovery", () => {
            const builder = q.select(q.pgIsInRecovery());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_IS_IN_RECOVERY()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_last_wal_receive_lsn", () => {
            const builder = q.select(q.pgLastWalReceiveLsn());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LAST_WAL_RECEIVE_LSN()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_last_wal_replay_lsn", () => {
            const builder = q.select(q.pgLastWalReplayLsn());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LAST_WAL_REPLAY_LSN()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_last_xact_replay_timestamp", () => {
            const builder = q.select(q.pgLastXactReplayTimestamp());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LAST_XACT_REPLAY_TIMESTAMP()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_get_wal_resource_managers", () => {
            const builder = q.select(q.pgGetWalResourceManagers());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_WAL_RESOURCE_MANAGERS()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_is_wal_replay_paused", () => {
            const builder = q.select(q.pgIsWalReplayPaused());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_IS_WAL_REPLAY_PAUSED()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_get_wal_replay_pause_state", () => {
            const builder = q.select(q.pgGetWalReplayPauseState());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_GET_WAL_REPLAY_PAUSE_STATE()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_promote", () => {
            const builder = q.select(q.pgPromote());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_PROMOTE()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_promote with wait", () => {
            const builder = q.select(q.pgPromote(q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_PROMOTE($1)");
            expect(parameters).toEqual([true]);
        });

        it("builds pg_promote with wait and wait_seconds", () => {
            const builder = q.select(q.pgPromote(q.l(true), q.l(30)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_PROMOTE($1, $2)");
            expect(parameters).toEqual([true, 30]);
        });

        it("builds pg_wal_replay_pause", () => {
            const builder = q.select(q.pgWalReplayPause());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_WAL_REPLAY_PAUSE()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_wal_replay_resume", () => {
            const builder = q.select(q.pgWalReplayResume());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_WAL_REPLAY_RESUME()");
            expect(parameters).toEqual([]);
        });
    });

    describe("9.28.5. Snapshot Synchronization Functions", () => {
        it("builds pg_export_snapshot", () => {
            const builder = q.select(q.pgExportSnapshot());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_EXPORT_SNAPSHOT()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_log_standby_snapshot", () => {
            const builder = q.select(q.pgLogStandbySnapshot());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LOG_STANDBY_SNAPSHOT()");
            expect(parameters).toEqual([]);
        });
    });

    describe("9.28.6. Replication Management Functions", () => {
        it("builds pg_create_physical_replication_slot", () => {
            const builder = q.select(q.pgCreatePhysicalReplicationSlot(q.l("my_slot")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CREATE_PHYSICAL_REPLICATION_SLOT($1)");
            expect(parameters).toEqual(["my_slot"]);
        });

        it("builds pg_drop_replication_slot", () => {
            const builder = q.select(q.pgDropReplicationSlot(q.l("my_slot")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_DROP_REPLICATION_SLOT($1)");
            expect(parameters).toEqual(["my_slot"]);
        });

        it("builds pg_create_logical_replication_slot", () => {
            const builder = q.select(q.pgCreateLogicalReplicationSlot(q.l("my_slot"), q.l("pgoutput")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_CREATE_LOGICAL_REPLICATION_SLOT($1, $2)");
            expect(parameters).toEqual(["my_slot", "pgoutput"]);
        });

        it("builds pg_copy_physical_replication_slot", () => {
            const builder = q.select(q.pgCopyPhysicalReplicationSlot(q.l("src_slot"), q.l("dst_slot")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_COPY_PHYSICAL_REPLICATION_SLOT($1, $2)");
            expect(parameters).toEqual(["src_slot", "dst_slot"]);
        });

        it("builds pg_copy_logical_replication_slot", () => {
            const builder = q.select(q.pgCopyLogicalReplicationSlot(q.l("src_slot"), q.l("dst_slot")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_COPY_LOGICAL_REPLICATION_SLOT($1, $2)");
            expect(parameters).toEqual(["src_slot", "dst_slot"]);
        });

        it("builds pg_logical_slot_get_changes", () => {
            const builder = q.select(q.pgLogicalSlotGetChanges(q.l("my_slot"), q.l("0/16A4400"), q.l(10)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LOGICAL_SLOT_GET_CHANGES($1, $2, $3)");
            expect(parameters).toEqual(["my_slot", "0/16A4400", 10]);
        });

        it("builds pg_logical_slot_peek_changes", () => {
            const builder = q.select(q.pgLogicalSlotPeekChanges(q.l("my_slot"), q.l("0/16A4400"), q.l(10)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LOGICAL_SLOT_PEEK_CHANGES($1, $2, $3)");
            expect(parameters).toEqual(["my_slot", "0/16A4400", 10]);
        });

        it("builds pg_replication_slot_advance", () => {
            const builder = q.select(q.pgReplicationSlotAdvance(q.l("my_slot"), q.l("0/16A4400")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_SLOT_ADVANCE($1, $2)");
            expect(parameters).toEqual(["my_slot", "0/16A4400"]);
        });

        it("builds pg_replication_origin_create", () => {
            const builder = q.select(q.pgReplicationOriginCreate(q.l("my_origin")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_CREATE($1)");
            expect(parameters).toEqual(["my_origin"]);
        });

        it("builds pg_replication_origin_drop", () => {
            const builder = q.select(q.pgReplicationOriginDrop(q.l("my_origin")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_DROP($1)");
            expect(parameters).toEqual(["my_origin"]);
        });

        it("builds pg_replication_origin_oid", () => {
            const builder = q.select(q.pgReplicationOriginOid(q.l("my_origin")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_OID($1)");
            expect(parameters).toEqual(["my_origin"]);
        });

        it("builds pg_replication_origin_session_setup", () => {
            const builder = q.select(q.pgReplicationOriginSessionSetup(q.l("my_origin")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_SESSION_SETUP($1)");
            expect(parameters).toEqual(["my_origin"]);
        });

        it("builds pg_replication_origin_session_reset", () => {
            const builder = q.select(q.pgReplicationOriginSessionReset());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_SESSION_RESET()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_replication_origin_session_is_setup", () => {
            const builder = q.select(q.pgReplicationOriginSessionIsSetup());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_SESSION_IS_SETUP()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_replication_origin_session_progress", () => {
            const builder = q.select(q.pgReplicationOriginSessionProgress(q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_SESSION_PROGRESS($1)");
            expect(parameters).toEqual([true]);
        });

        it("builds pg_replication_origin_xact_setup", () => {
            const builder = q.select(q.pgReplicationOriginXactSetup(q.l("0/16A4400"), q.l("2023-01-01 00:00:00")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_XACT_SETUP($1, $2)");
            expect(parameters).toEqual(["0/16A4400", "2023-01-01 00:00:00"]);
        });

        it("builds pg_replication_origin_xact_reset", () => {
            const builder = q.select(q.pgReplicationOriginXactReset());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_XACT_RESET()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_replication_origin_advance", () => {
            const builder = q.select(q.pgReplicationOriginAdvance(q.l("my_origin"), q.l("0/16A4400")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_ADVANCE($1, $2)");
            expect(parameters).toEqual(["my_origin", "0/16A4400"]);
        });

        it("builds pg_replication_origin_progress", () => {
            const builder = q.select(q.pgReplicationOriginProgress(q.l("my_origin"), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_REPLICATION_ORIGIN_PROGRESS($1, $2)");
            expect(parameters).toEqual(["my_origin", true]);
        });

        it("builds pg_logical_emit_message", () => {
            const builder = q.select(q.pgLogicalEmitMessage(q.l(true), q.l("prefix"), q.l("message")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LOGICAL_EMIT_MESSAGE($1, $2, $3)");
            expect(parameters).toEqual([true, "prefix", "message"]);
        });

        it("builds pg_sync_replication_slots", () => {
            const builder = q.select(q.pgSyncReplicationSlots());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_SYNC_REPLICATION_SLOTS()");
            expect(parameters).toEqual([]);
        });
    });

    describe("9.28.7. Database Object Management Functions", () => {
        it("builds pg_column_size", () => {
            const builder = q.select(q.pgColumnSize(q.i("my_column")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_COLUMN_SIZE(my_column)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_column_compression", () => {
            const builder = q.select(q.pgColumnCompression(q.i("my_column")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_COLUMN_COMPRESSION(my_column)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_column_toast_chunk_id", () => {
            const builder = q.select(q.pgColumnToastChunkId(q.i("my_column")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_COLUMN_TOAST_CHUNK_ID(my_column)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_database_size", () => {
            const builder = q.select(q.pgDatabaseSize(q.l("mydb")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_DATABASE_SIZE($1)");
            expect(parameters).toEqual(["mydb"]);
        });

        it("builds pg_indexes_size", () => {
            const builder = q.select(q.pgIndexesSize(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_INDEXES_SIZE(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_relation_size", () => {
            const builder = q.select(q.pgRelationSize(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_RELATION_SIZE(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_relation_size with fork", () => {
            const builder = q.select(q.pgRelationSize(q.i("my_table"), q.l("main")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_RELATION_SIZE(my_table, $1)");
            expect(parameters).toEqual(["main"]);
        });

        it("builds pg_size_bytes", () => {
            const builder = q.select(q.pgSizeBytes(q.l("10 GB")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_SIZE_BYTES($1)");
            expect(parameters).toEqual(["10 GB"]);
        });

        it("builds pg_size_pretty", () => {
            const builder = q.select(q.pgSizePretty(q.l(10737418240)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_SIZE_PRETTY($1)");
            expect(parameters).toEqual([10737418240]);
        });

        it("builds pg_table_size", () => {
            const builder = q.select(q.pgTableSize(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TABLE_SIZE(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_tablespace_size", () => {
            const builder = q.select(q.pgTablespaceSize(q.l("pg_default")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TABLESPACE_SIZE($1)");
            expect(parameters).toEqual(["pg_default"]);
        });

        it("builds pg_total_relation_size", () => {
            const builder = q.select(q.pgTotalRelationSize(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TOTAL_RELATION_SIZE(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_relation_filenode", () => {
            const builder = q.select(q.pgRelationFilenode(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_RELATION_FILENODE(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_relation_filepath", () => {
            const builder = q.select(q.pgRelationFilepath(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_RELATION_FILEPATH(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_filenode_relation", () => {
            const builder = q.select(q.pgFilenodeRelation(q.l("pg_default"), q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_FILENODE_RELATION($1, $2)");
            expect(parameters).toEqual(["pg_default", 12345]);
        });

        it("builds pg_collation_actual_version", () => {
            const builder = q.select(q.pgCollationActualVersion(q.l("en_US")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_COLLATION_ACTUAL_VERSION($1)");
            expect(parameters).toEqual(["en_US"]);
        });

        it("builds pg_database_collation_actual_version", () => {
            const builder = q.select(q.pgDatabaseCollationActualVersion(q.l("mydb")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_DATABASE_COLLATION_ACTUAL_VERSION($1)");
            expect(parameters).toEqual(["mydb"]);
        });

        it("builds pg_import_system_collations", () => {
            const builder = q.select(q.pgImportSystemCollations(q.l("public")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_IMPORT_SYSTEM_COLLATIONS($1)");
            expect(parameters).toEqual(["public"]);
        });

        it("builds pg_partition_tree", () => {
            const builder = q.select(q.pgPartitionTree(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_PARTITION_TREE(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_partition_ancestors", () => {
            const builder = q.select(q.pgPartitionAncestors(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_PARTITION_ANCESTORS(my_table)");
            expect(parameters).toEqual([]);
        });

        it("builds pg_partition_root", () => {
            const builder = q.select(q.pgPartitionRoot(q.i("my_table")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_PARTITION_ROOT(my_table)");
            expect(parameters).toEqual([]);
        });
    });

    describe("9.28.8. Index Maintenance Functions", () => {
        it("builds brin_summarize_new_values", () => {
            const builder = q.select(q.brinSummarizeNewValues(q.i("my_index")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT BRIN_SUMMARIZE_NEW_VALUES(my_index)");
            expect(parameters).toEqual([]);
        });

        it("builds brin_summarize_range", () => {
            const builder = q.select(q.brinSummarizeRange(q.i("my_index"), q.l(1000)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT BRIN_SUMMARIZE_RANGE(my_index, $1)");
            expect(parameters).toEqual([1000]);
        });

        it("builds brin_desummarize_range", () => {
            const builder = q.select(q.brinDesummarizeRange(q.i("my_index"), q.l(1000)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT BRIN_DESUMMARIZE_RANGE(my_index, $1)");
            expect(parameters).toEqual([1000]);
        });

        it("builds gin_clean_pending_list", () => {
            const builder = q.select(q.ginCleanPendingList(q.i("my_index")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT GIN_CLEAN_PENDING_LIST(my_index)");
            expect(parameters).toEqual([]);
        });
    });

    describe("9.28.9. Generic File Access Functions", () => {
        it("builds pg_ls_dir", () => {
            const builder = q.select(q.pgLsDir(q.l("/tmp")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_DIR($1)");
            expect(parameters).toEqual(["/tmp"]);
        });

        it("builds pg_ls_dir with missing_ok", () => {
            const builder = q.select(q.pgLsDir(q.l("/tmp"), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_DIR($1, $2)");
            expect(parameters).toEqual(["/tmp", true]);
        });

        it("builds pg_ls_dir with all options", () => {
            const builder = q.select(q.pgLsDir(q.l("/tmp"), q.l(true), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_DIR($1, $2, $3)");
            expect(parameters).toEqual(["/tmp", true, true]);
        });

        it("builds pg_ls_logdir", () => {
            const builder = q.select(q.pgLsLogdir());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_LOGDIR()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_ls_waldir", () => {
            const builder = q.select(q.pgLsWaldir());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_WALDIR()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_ls_logicalmapdir", () => {
            const builder = q.select(q.pgLsLogicalmapdir());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_LOGICALMAPDIR()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_ls_logicalsnapdir", () => {
            const builder = q.select(q.pgLsLogicalsnapdir());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_LOGICALSNAPDIR()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_ls_replslotdir", () => {
            const builder = q.select(q.pgLsReplslotdir(q.l("my_slot")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_REPLSLOTDIR($1)");
            expect(parameters).toEqual(["my_slot"]);
        });

        it("builds pg_ls_summariesdir", () => {
            const builder = q.select(q.pgLsSummariesdir());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_SUMMARIESDIR()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_ls_archivestatusdir", () => {
            const builder = q.select(q.pgLsArchiveStatusdir());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_ARCHIVESTATUSDIR()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_ls_tmpdir", () => {
            const builder = q.select(q.pgLsTmpdir());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_TMPDIR()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_ls_tmpdir with tablespace", () => {
            const builder = q.select(q.pgLsTmpdir(q.l("my_tablespace")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_LS_TMPDIR($1)");
            expect(parameters).toEqual(["my_tablespace"]);
        });

        it("builds pg_read_file", () => {
            const builder = q.select(q.pgReadFile(q.l("/tmp/file.txt")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_READ_FILE($1)");
            expect(parameters).toEqual(["/tmp/file.txt"]);
        });

        it("builds pg_read_file with offset and length", () => {
            const builder = q.select(q.pgReadFile(q.l("/tmp/file.txt"), q.l(0), q.l(100)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_READ_FILE($1, $2, $3)");
            expect(parameters).toEqual(["/tmp/file.txt", 0, 100]);
        });

        it("builds pg_read_file with all options", () => {
            const builder = q.select(q.pgReadFile(q.l("/tmp/file.txt"), q.l(0), q.l(100), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_READ_FILE($1, $2, $3, $4)");
            expect(parameters).toEqual(["/tmp/file.txt", 0, 100, true]);
        });

        it("builds pg_read_binary_file", () => {
            const builder = q.select(q.pgReadBinaryFile(q.l("/tmp/file.bin")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_READ_BINARY_FILE($1)");
            expect(parameters).toEqual(["/tmp/file.bin"]);
        });

        it("builds pg_read_binary_file with offset and length", () => {
            const builder = q.select(q.pgReadBinaryFile(q.l("/tmp/file.bin"), q.l(0), q.l(100)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_READ_BINARY_FILE($1, $2, $3)");
            expect(parameters).toEqual(["/tmp/file.bin", 0, 100]);
        });

        it("builds pg_read_binary_file with all options", () => {
            const builder = q.select(q.pgReadBinaryFile(q.l("/tmp/file.bin"), q.l(0), q.l(100), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_READ_BINARY_FILE($1, $2, $3, $4)");
            expect(parameters).toEqual(["/tmp/file.bin", 0, 100, true]);
        });

        it("builds pg_stat_file", () => {
            const builder = q.select(q.pgStatFile(q.l("/tmp/file.txt")));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_STAT_FILE($1)");
            expect(parameters).toEqual(["/tmp/file.txt"]);
        });

        it("builds pg_stat_file with missing_ok", () => {
            const builder = q.select(q.pgStatFile(q.l("/tmp/file.txt"), q.l(true)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_STAT_FILE($1, $2)");
            expect(parameters).toEqual(["/tmp/file.txt", true]);
        });
    });

    describe("9.28.10. Advisory Lock Functions", () => {
        it("builds pg_advisory_lock", () => {
            const builder = q.select(q.pgAdvisoryLock(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ADVISORY_LOCK($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_advisory_lock_shared", () => {
            const builder = q.select(q.pgAdvisoryLockShared(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ADVISORY_LOCK_SHARED($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_advisory_unlock", () => {
            const builder = q.select(q.pgAdvisoryUnlock(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ADVISORY_UNLOCK($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_advisory_unlock_all", () => {
            const builder = q.select(q.pgAdvisoryUnlockAll());
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ADVISORY_UNLOCK_ALL()");
            expect(parameters).toEqual([]);
        });

        it("builds pg_advisory_unlock_shared", () => {
            const builder = q.select(q.pgAdvisoryUnlockShared(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ADVISORY_UNLOCK_SHARED($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_advisory_xact_lock", () => {
            const builder = q.select(q.pgAdvisoryXactLock(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ADVISORY_XACT_LOCK($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_advisory_xact_lock_shared", () => {
            const builder = q.select(q.pgAdvisoryXactLockShared(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_ADVISORY_XACT_LOCK_SHARED($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_try_advisory_lock", () => {
            const builder = q.select(q.pgTryAdvisoryLock(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TRY_ADVISORY_LOCK($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_try_advisory_lock_shared", () => {
            const builder = q.select(q.pgTryAdvisoryLockShared(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TRY_ADVISORY_LOCK_SHARED($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_try_advisory_xact_lock", () => {
            const builder = q.select(q.pgTryAdvisoryXactLock(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TRY_ADVISORY_XACT_LOCK($1)");
            expect(parameters).toEqual([12345]);
        });

        it("builds pg_try_advisory_xact_lock_shared", () => {
            const builder = q.select(q.pgTryAdvisoryXactLockShared(q.l(12345)));
            const sql = builder.getSql();
            const parameters = builder.getParameters();
            expect(sql).toBe("SELECT PG_TRY_ADVISORY_XACT_LOCK_SHARED($1)");
            expect(parameters).toEqual([12345]);
        });
    });
});
