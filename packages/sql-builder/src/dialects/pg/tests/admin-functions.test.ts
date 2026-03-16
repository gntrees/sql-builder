import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("Admin Functions", () => {
    describe("9.28.1. Configuration Settings Functions", () => {
        it("builds current_setting", () => {
            const builder = q.select(q.currentSetting(q.l("datestyle")));
            expectQuery(builder, "admin", "current_setting");
        });

        it("builds current_setting with missing_ok", () => {
            const builder = q.select(q.currentSetting(q.l("unknown_setting"), q.l(true)));
            expectQuery(builder, "admin", "current_setting with missing_ok");
        });

        it("builds set_config", () => {
            const builder = q.select(q.setConfig(q.l("datestyle"), q.l("ISO, MDY"), q.l(false)));
            expectQuery(builder, "admin", "set_config");
        });
    });

    describe("9.28.2. Server Signaling Functions", () => {
        it("builds pg_cancel_backend", () => {
            const builder = q.select(q.pgCancelBackend(q.l(12345)));
            expectQuery(builder, "admin", "pg_cancel_backend");
        });

        it("builds pg_log_backend_memory_contexts", () => {
            const builder = q.select(q.pgLogBackendMemoryContexts(q.l(12345)));
            expectQuery(builder, "admin", "pg_log_backend_memory_contexts");
        });

        it("builds pg_reload_conf", () => {
            const builder = q.select(q.pgReloadConf());
            expectQuery(builder, "admin", "pg_reload_conf");
        });

        it("builds pg_rotate_logfile", () => {
            const builder = q.select(q.pgRotateLogfile());
            expectQuery(builder, "admin", "pg_rotate_logfile");
        });

        it("builds pg_terminate_backend", () => {
            const builder = q.select(q.pgTerminateBackend(q.l(12345)));
            expectQuery(builder, "admin", "pg_terminate_backend");
        });

        it("builds pg_terminate_backend with timeout", () => {
            const builder = q.select(q.pgTerminateBackend(q.l(12345), q.l(5000)));
            expectQuery(builder, "admin", "pg_terminate_backend with timeout");
        });
    });

    describe("9.28.3. Backup Control Functions", () => {
        it("builds pg_create_restore_point", () => {
            const builder = q.select(q.pgCreateRestorePoint(q.l("my_restore_point")));
            expectQuery(builder, "admin", "pg_create_restore_point");
        });

        it("builds pg_current_wal_flush_lsn", () => {
            const builder = q.select(q.pgCurrentWalFlushLsn());
            expectQuery(builder, "admin", "pg_current_wal_flush_lsn");
        });

        it("builds pg_current_wal_insert_lsn", () => {
            const builder = q.select(q.pgCurrentWalInsertLsn());
            expectQuery(builder, "admin", "pg_current_wal_insert_lsn");
        });

        it("builds pg_current_wal_lsn", () => {
            const builder = q.select(q.pgCurrentWalLsn());
            expectQuery(builder, "admin", "pg_current_wal_lsn");
        });

        it("builds pg_backup_start", () => {
            const builder = q.select(q.pgBackupStart(q.l("my_backup"), q.l(false)));
            expectQuery(builder, "admin", "pg_backup_start");
        });

        it("builds pg_backup_stop", () => {
            const builder = q.select(q.pgBackupStop(q.l(true)));
            expectQuery(builder, "admin", "pg_backup_stop");
        });

        it("builds pg_switch_wal", () => {
            const builder = q.select(q.pgSwitchWal());
            expectQuery(builder, "admin", "pg_switch_wal");
        });

        it("builds pg_walfile_name", () => {
            const builder = q.select(q.pgWalfileName(q.l("0/16A4400")));
            expectQuery(builder, "admin", "pg_walfile_name");
        });

        it("builds pg_walfile_name_offset", () => {
            const builder = q.select(q.pgWalfileNameOffset(q.l("0/16A4400")));
            expectQuery(builder, "admin", "pg_walfile_name_offset");
        });

        it("builds pg_split_walfile_name", () => {
            const builder = q.select(q.pgSplitWalfileName(q.l("000000010000000000000001")));
            expectQuery(builder, "admin", "pg_split_walfile_name");
        });

        it("builds pg_wal_lsn_diff", () => {
            const builder = q.select(q.pgWalLsnDiff(q.l("0/16A4400"), q.l("0/16A3218")));
            expectQuery(builder, "admin", "pg_wal_lsn_diff");
        });
    });

    describe("9.28.4. Recovery Control Functions", () => {
        it("builds pg_is_in_recovery", () => {
            const builder = q.select(q.pgIsInRecovery());
            expectQuery(builder, "admin", "pg_is_in_recovery");
        });

        it("builds pg_last_wal_receive_lsn", () => {
            const builder = q.select(q.pgLastWalReceiveLsn());
            expectQuery(builder, "admin", "pg_last_wal_receive_lsn");
        });

        it("builds pg_last_wal_replay_lsn", () => {
            const builder = q.select(q.pgLastWalReplayLsn());
            expectQuery(builder, "admin", "pg_last_wal_replay_lsn");
        });

        it("builds pg_last_xact_replay_timestamp", () => {
            const builder = q.select(q.pgLastXactReplayTimestamp());
            expectQuery(builder, "admin", "pg_last_xact_replay_timestamp");
        });

        it("builds pg_get_wal_resource_managers", () => {
            const builder = q.select(q.pgGetWalResourceManagers());
            expectQuery(builder, "admin", "pg_get_wal_resource_managers");
        });

        it("builds pg_is_wal_replay_paused", () => {
            const builder = q.select(q.pgIsWalReplayPaused());
            expectQuery(builder, "admin", "pg_is_wal_replay_paused");
        });

        it("builds pg_get_wal_replay_pause_state", () => {
            const builder = q.select(q.pgGetWalReplayPauseState());
            expectQuery(builder, "admin", "pg_get_wal_replay_pause_state");
        });

        it("builds pg_promote", () => {
            const builder = q.select(q.pgPromote());
            expectQuery(builder, "admin", "pg_promote");
        });

        it("builds pg_promote with wait", () => {
            const builder = q.select(q.pgPromote(q.l(true)));
            expectQuery(builder, "admin", "pg_promote with wait");
        });

        it("builds pg_promote with wait and wait_seconds", () => {
            const builder = q.select(q.pgPromote(q.l(true), q.l(30)));
            expectQuery(builder, "admin", "pg_promote with wait and wait_seconds");
        });

        it("builds pg_wal_replay_pause", () => {
            const builder = q.select(q.pgWalReplayPause());
            expectQuery(builder, "admin", "pg_wal_replay_pause");
        });

        it("builds pg_wal_replay_resume", () => {
            const builder = q.select(q.pgWalReplayResume());
            expectQuery(builder, "admin", "pg_wal_replay_resume");
        });
    });

    describe("9.28.5. Snapshot Synchronization Functions", () => {
        it("builds pg_export_snapshot", () => {
            const builder = q.select(q.pgExportSnapshot());
            expectQuery(builder, "admin", "pg_export_snapshot");
        });

        it("builds pg_log_standby_snapshot", () => {
            const builder = q.select(q.pgLogStandbySnapshot());
            expectQuery(builder, "admin", "pg_log_standby_snapshot");
        });
    });

    describe("9.28.6. Replication Management Functions", () => {
        it("builds pg_create_physical_replication_slot", () => {
            const builder = q.select(q.pgCreatePhysicalReplicationSlot(q.l("my_slot")));
            expectQuery(builder, "admin", "pg_create_physical_replication_slot");
        });

        it("builds pg_drop_replication_slot", () => {
            const builder = q.select(q.pgDropReplicationSlot(q.l("my_slot")));
            expectQuery(builder, "admin", "pg_drop_replication_slot");
        });

        it("builds pg_create_logical_replication_slot", () => {
            const builder = q.select(q.pgCreateLogicalReplicationSlot(q.l("my_slot"), q.l("pgoutput")));
            expectQuery(builder, "admin", "pg_create_logical_replication_slot");
        });

        it("builds pg_copy_physical_replication_slot", () => {
            const builder = q.select(q.pgCopyPhysicalReplicationSlot(q.l("src_slot"), q.l("dst_slot")));
            expectQuery(builder, "admin", "pg_copy_physical_replication_slot");
        });

        it("builds pg_copy_logical_replication_slot", () => {
            const builder = q.select(q.pgCopyLogicalReplicationSlot(q.l("src_slot"), q.l("dst_slot")));
            expectQuery(builder, "admin", "pg_copy_logical_replication_slot");
        });

        it("builds pg_logical_slot_get_changes", () => {
            const builder = q.select(q.pgLogicalSlotGetChanges(q.l("my_slot"), q.l("0/16A4400"), q.l(10)));
            expectQuery(builder, "admin", "pg_logical_slot_get_changes");
        });

        it("builds pg_logical_slot_peek_changes", () => {
            const builder = q.select(q.pgLogicalSlotPeekChanges(q.l("my_slot"), q.l("0/16A4400"), q.l(10)));
            expectQuery(builder, "admin", "pg_logical_slot_peek_changes");
        });

        it("builds pg_replication_slot_advance", () => {
            const builder = q.select(q.pgReplicationSlotAdvance(q.l("my_slot"), q.l("0/16A4400")));
            expectQuery(builder, "admin", "pg_replication_slot_advance");
        });

        it("builds pg_replication_origin_create", () => {
            const builder = q.select(q.pgReplicationOriginCreate(q.l("my_origin")));
            expectQuery(builder, "admin", "pg_replication_origin_create");
        });

        it("builds pg_replication_origin_drop", () => {
            const builder = q.select(q.pgReplicationOriginDrop(q.l("my_origin")));
            expectQuery(builder, "admin", "pg_replication_origin_drop");
        });

        it("builds pg_replication_origin_oid", () => {
            const builder = q.select(q.pgReplicationOriginOid(q.l("my_origin")));
            expectQuery(builder, "admin", "pg_replication_origin_oid");
        });

        it("builds pg_replication_origin_session_setup", () => {
            const builder = q.select(q.pgReplicationOriginSessionSetup(q.l("my_origin")));
            expectQuery(builder, "admin", "pg_replication_origin_session_setup");
        });

        it("builds pg_replication_origin_session_reset", () => {
            const builder = q.select(q.pgReplicationOriginSessionReset());
            expectQuery(builder, "admin", "pg_replication_origin_session_reset");
        });

        it("builds pg_replication_origin_session_is_setup", () => {
            const builder = q.select(q.pgReplicationOriginSessionIsSetup());
            expectQuery(builder, "admin", "pg_replication_origin_session_is_setup");
        });

        it("builds pg_replication_origin_session_progress", () => {
            const builder = q.select(q.pgReplicationOriginSessionProgress(q.l(true)));
            expectQuery(builder, "admin", "pg_replication_origin_session_progress");
        });

        it("builds pg_replication_origin_xact_setup", () => {
            const builder = q.select(q.pgReplicationOriginXactSetup(q.l("0/16A4400"), q.l("2023-01-01 00:00:00")));
            expectQuery(builder, "admin", "pg_replication_origin_xact_setup");
        });

        it("builds pg_replication_origin_xact_reset", () => {
            const builder = q.select(q.pgReplicationOriginXactReset());
            expectQuery(builder, "admin", "pg_replication_origin_xact_reset");
        });

        it("builds pg_replication_origin_advance", () => {
            const builder = q.select(q.pgReplicationOriginAdvance(q.l("my_origin"), q.l("0/16A4400")));
            expectQuery(builder, "admin", "pg_replication_origin_advance");
        });

        it("builds pg_replication_origin_progress", () => {
            const builder = q.select(q.pgReplicationOriginProgress(q.l("my_origin"), q.l(true)));
            expectQuery(builder, "admin", "pg_replication_origin_progress");
        });

        it("builds pg_logical_emit_message", () => {
            const builder = q.select(q.pgLogicalEmitMessage(q.l(true), q.l("prefix"), q.l("message")));
            expectQuery(builder, "admin", "pg_logical_emit_message");
        });

        it("builds pg_sync_replication_slots", () => {
            const builder = q.select(q.pgSyncReplicationSlots());
            expectQuery(builder, "admin", "pg_sync_replication_slots");
        });
    });

    describe("9.28.7. Database Object Management Functions", () => {
        it("builds pg_column_size", () => {
            const builder = q.select(q.pgColumnSize(q.i("my_column")));
            expectQuery(builder, "admin", "pg_column_size");
        });

        it("builds pg_column_compression", () => {
            const builder = q.select(q.pgColumnCompression(q.i("my_column")));
            expectQuery(builder, "admin", "pg_column_compression");
        });

        it("builds pg_column_toast_chunk_id", () => {
            const builder = q.select(q.pgColumnToastChunkId(q.i("my_column")));
            expectQuery(builder, "admin", "pg_column_toast_chunk_id");
        });

        it("builds pg_database_size", () => {
            const builder = q.select(q.pgDatabaseSize(q.l("mydb")));
            expectQuery(builder, "admin", "pg_database_size");
        });

        it("builds pg_indexes_size", () => {
            const builder = q.select(q.pgIndexesSize(q.i("my_table")));
            expectQuery(builder, "admin", "pg_indexes_size");
        });

        it("builds pg_relation_size", () => {
            const builder = q.select(q.pgRelationSize(q.i("my_table")));
            expectQuery(builder, "admin", "pg_relation_size");
        });

        it("builds pg_relation_size with fork", () => {
            const builder = q.select(q.pgRelationSize(q.i("my_table"), q.l("main")));
            expectQuery(builder, "admin", "pg_relation_size with fork");
        });

        it("builds pg_size_bytes", () => {
            const builder = q.select(q.pgSizeBytes(q.l("10 GB")));
            expectQuery(builder, "admin", "pg_size_bytes");
        });

        it("builds pg_size_pretty", () => {
            const builder = q.select(q.pgSizePretty(q.l(10737418240)));
            expectQuery(builder, "admin", "pg_size_pretty");
        });

        it("builds pg_table_size", () => {
            const builder = q.select(q.pgTableSize(q.i("my_table")));
            expectQuery(builder, "admin", "pg_table_size");
        });

        it("builds pg_tablespace_size", () => {
            const builder = q.select(q.pgTablespaceSize(q.l("pg_default")));
            expectQuery(builder, "admin", "pg_tablespace_size");
        });

        it("builds pg_total_relation_size", () => {
            const builder = q.select(q.pgTotalRelationSize(q.i("my_table")));
            expectQuery(builder, "admin", "pg_total_relation_size");
        });

        it("builds pg_relation_filenode", () => {
            const builder = q.select(q.pgRelationFilenode(q.i("my_table")));
            expectQuery(builder, "admin", "pg_relation_filenode");
        });

        it("builds pg_relation_filepath", () => {
            const builder = q.select(q.pgRelationFilepath(q.i("my_table")));
            expectQuery(builder, "admin", "pg_relation_filepath");
        });

        it("builds pg_filenode_relation", () => {
            const builder = q.select(q.pgFilenodeRelation(q.l("pg_default"), q.l(12345)));
            expectQuery(builder, "admin", "pg_filenode_relation");
        });

        it("builds pg_collation_actual_version", () => {
            const builder = q.select(q.pgCollationActualVersion(q.l("en_US")));
            expectQuery(builder, "admin", "pg_collation_actual_version");
        });

        it("builds pg_database_collation_actual_version", () => {
            const builder = q.select(q.pgDatabaseCollationActualVersion(q.l("mydb")));
            expectQuery(builder, "admin", "pg_database_collation_actual_version");
        });

        it("builds pg_import_system_collations", () => {
            const builder = q.select(q.pgImportSystemCollations(q.l("public")));
            expectQuery(builder, "admin", "pg_import_system_collations");
        });

        it("builds pg_partition_tree", () => {
            const builder = q.select(q.pgPartitionTree(q.i("my_table")));
            expectQuery(builder, "admin", "pg_partition_tree");
        });

        it("builds pg_partition_ancestors", () => {
            const builder = q.select(q.pgPartitionAncestors(q.i("my_table")));
            expectQuery(builder, "admin", "pg_partition_ancestors");
        });

        it("builds pg_partition_root", () => {
            const builder = q.select(q.pgPartitionRoot(q.i("my_table")));
            expectQuery(builder, "admin", "pg_partition_root");
        });
    });

    describe("9.28.8. Index Maintenance Functions", () => {
        it("builds brin_summarize_new_values", () => {
            const builder = q.select(q.brinSummarizeNewValues(q.i("my_index")));
            expectQuery(builder, "admin", "brin_summarize_new_values");
        });

        it("builds brin_summarize_range", () => {
            const builder = q.select(q.brinSummarizeRange(q.i("my_index"), q.l(1000)));
            expectQuery(builder, "admin", "brin_summarize_range");
        });

        it("builds brin_desummarize_range", () => {
            const builder = q.select(q.brinDesummarizeRange(q.i("my_index"), q.l(1000)));
            expectQuery(builder, "admin", "brin_desummarize_range");
        });

        it("builds gin_clean_pending_list", () => {
            const builder = q.select(q.ginCleanPendingList(q.i("my_index")));
            expectQuery(builder, "admin", "gin_clean_pending_list");
        });
    });

    describe("9.28.9. Generic File Access Functions", () => {
        it("builds pg_ls_dir", () => {
            const builder = q.select(q.pgLsDir(q.l("/tmp")));
            expectQuery(builder, "admin", "pg_ls_dir");
        });

        it("builds pg_ls_dir with missing_ok", () => {
            const builder = q.select(q.pgLsDir(q.l("/tmp"), q.l(true)));
            expectQuery(builder, "admin", "pg_ls_dir with missing_ok");
        });

        it("builds pg_ls_dir with all options", () => {
            const builder = q.select(q.pgLsDir(q.l("/tmp"), q.l(true), q.l(true)));
            expectQuery(builder, "admin", "pg_ls_dir with all options");
        });

        it("builds pg_ls_logdir", () => {
            const builder = q.select(q.pgLsLogdir());
            expectQuery(builder, "admin", "pg_ls_logdir");
        });

        it("builds pg_ls_waldir", () => {
            const builder = q.select(q.pgLsWaldir());
            expectQuery(builder, "admin", "pg_ls_waldir");
        });

        it("builds pg_ls_logicalmapdir", () => {
            const builder = q.select(q.pgLsLogicalmapdir());
            expectQuery(builder, "admin", "pg_ls_logicalmapdir");
        });

        it("builds pg_ls_logicalsnapdir", () => {
            const builder = q.select(q.pgLsLogicalsnapdir());
            expectQuery(builder, "admin", "pg_ls_logicalsnapdir");
        });

        it("builds pg_ls_replslotdir", () => {
            const builder = q.select(q.pgLsReplslotdir(q.l("my_slot")));
            expectQuery(builder, "admin", "pg_ls_replslotdir");
        });

        it("builds pg_ls_summariesdir", () => {
            const builder = q.select(q.pgLsSummariesdir());
            expectQuery(builder, "admin", "pg_ls_summariesdir");
        });

        it("builds pg_ls_archivestatusdir", () => {
            const builder = q.select(q.pgLsArchiveStatusdir());
            expectQuery(builder, "admin", "pg_ls_archivestatusdir");
        });

        it("builds pg_ls_tmpdir", () => {
            const builder = q.select(q.pgLsTmpdir());
            expectQuery(builder, "admin", "pg_ls_tmpdir");
        });

        it("builds pg_ls_tmpdir with tablespace", () => {
            const builder = q.select(q.pgLsTmpdir(q.l("my_tablespace")));
            expectQuery(builder, "admin", "pg_ls_tmpdir with tablespace");
        });

        it("builds pg_read_file", () => {
            const builder = q.select(q.pgReadFile(q.l("/tmp/file.txt")));
            expectQuery(builder, "admin", "pg_read_file");
        });

        it("builds pg_read_file with offset and length", () => {
            const builder = q.select(q.pgReadFile(q.l("/tmp/file.txt"), q.l(0), q.l(100)));
            expectQuery(builder, "admin", "pg_read_file with offset and length");
        });

        it("builds pg_read_file with all options", () => {
            const builder = q.select(q.pgReadFile(q.l("/tmp/file.txt"), q.l(0), q.l(100), q.l(true)));
            expectQuery(builder, "admin", "pg_read_file with all options");
        });

        it("builds pg_read_binary_file", () => {
            const builder = q.select(q.pgReadBinaryFile(q.l("/tmp/file.bin")));
            expectQuery(builder, "admin", "pg_read_binary_file");
        });

        it("builds pg_read_binary_file with offset and length", () => {
            const builder = q.select(q.pgReadBinaryFile(q.l("/tmp/file.bin"), q.l(0), q.l(100)));
            expectQuery(builder, "admin", "pg_read_binary_file with offset and length");
        });

        it("builds pg_read_binary_file with all options", () => {
            const builder = q.select(q.pgReadBinaryFile(q.l("/tmp/file.bin"), q.l(0), q.l(100), q.l(true)));
            expectQuery(builder, "admin", "pg_read_binary_file with all options");
        });

        it("builds pg_stat_file", () => {
            const builder = q.select(q.pgStatFile(q.l("/tmp/file.txt")));
            expectQuery(builder, "admin", "pg_stat_file");
        });

        it("builds pg_stat_file with missing_ok", () => {
            const builder = q.select(q.pgStatFile(q.l("/tmp/file.txt"), q.l(true)));
            expectQuery(builder, "admin", "pg_stat_file with missing_ok");
        });
    });

    describe("9.28.10. Advisory Lock Functions", () => {
        it("builds pg_advisory_lock", () => {
            const builder = q.select(q.pgAdvisoryLock(q.l(12345)));
            expectQuery(builder, "admin", "pg_advisory_lock");
        });

        it("builds pg_advisory_lock_shared", () => {
            const builder = q.select(q.pgAdvisoryLockShared(q.l(12345)));
            expectQuery(builder, "admin", "pg_advisory_lock_shared");
        });

        it("builds pg_advisory_unlock", () => {
            const builder = q.select(q.pgAdvisoryUnlock(q.l(12345)));
            expectQuery(builder, "admin", "pg_advisory_unlock");
        });

        it("builds pg_advisory_unlock_all", () => {
            const builder = q.select(q.pgAdvisoryUnlockAll());
            expectQuery(builder, "admin", "pg_advisory_unlock_all");
        });

        it("builds pg_advisory_unlock_shared", () => {
            const builder = q.select(q.pgAdvisoryUnlockShared(q.l(12345)));
            expectQuery(builder, "admin", "pg_advisory_unlock_shared");
        });

        it("builds pg_advisory_xact_lock", () => {
            const builder = q.select(q.pgAdvisoryXactLock(q.l(12345)));
            expectQuery(builder, "admin", "pg_advisory_xact_lock");
        });

        it("builds pg_advisory_xact_lock_shared", () => {
            const builder = q.select(q.pgAdvisoryXactLockShared(q.l(12345)));
            expectQuery(builder, "admin", "pg_advisory_xact_lock_shared");
        });

        it("builds pg_try_advisory_lock", () => {
            const builder = q.select(q.pgTryAdvisoryLock(q.l(12345)));
            expectQuery(builder, "admin", "pg_try_advisory_lock");
        });

        it("builds pg_try_advisory_lock_shared", () => {
            const builder = q.select(q.pgTryAdvisoryLockShared(q.l(12345)));
            expectQuery(builder, "admin", "pg_try_advisory_lock_shared");
        });

        it("builds pg_try_advisory_xact_lock", () => {
            const builder = q.select(q.pgTryAdvisoryXactLock(q.l(12345)));
            expectQuery(builder, "admin", "pg_try_advisory_xact_lock");
        });

        it("builds pg_try_advisory_xact_lock_shared", () => {
            const builder = q.select(q.pgTryAdvisoryXactLockShared(q.l(12345)));
            expectQuery(builder, "admin", "pg_try_advisory_xact_lock_shared");
        });
    });
});
