"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFunctionBuilder = void 0;
const override_info_functions_1 = require("./override-info-functions");
class AdminFunctionBuilder extends override_info_functions_1.InfoFunctionBuilder {
    // 9.28.1. Configuration Settings Functions
    currentSetting(...params) {
        return this.pushFunction("CURRENT_SETTING", ...params);
    }
    setConfig(...params) {
        return this.pushFunction("SET_CONFIG", ...params);
    }
    // 9.28.2. Server Signaling Functions
    pgCancelBackend(pid) {
        return this.pushFunction("PG_CANCEL_BACKEND", pid);
    }
    pgLogBackendMemoryContexts(pid) {
        return this.pushFunction("PG_LOG_BACKEND_MEMORY_CONTEXTS", pid);
    }
    pgReloadConf() {
        return this.pushFunction("PG_RELOAD_CONF");
    }
    pgRotateLogfile() {
        return this.pushFunction("PG_ROTATE_LOGFILE");
    }
    pgTerminateBackend(...params) {
        return this.pushFunction("PG_TERMINATE_BACKEND", ...params);
    }
    // 9.28.3. Backup Control Functions
    pgCreateRestorePoint(name) {
        return this.pushFunction("PG_CREATE_RESTORE_POINT", name);
    }
    pgCurrentWalFlushLsn() {
        return this.pushFunction("PG_CURRENT_WAL_FLUSH_LSN");
    }
    pgCurrentWalInsertLsn() {
        return this.pushFunction("PG_CURRENT_WAL_INSERT_LSN");
    }
    pgCurrentWalLsn() {
        return this.pushFunction("PG_CURRENT_WAL_LSN");
    }
    pgBackupStart(...params) {
        return this.pushFunction("PG_BACKUP_START", ...params);
    }
    pgBackupStop(waitForArchive) {
        return this.pushFunction("PG_BACKUP_STOP", waitForArchive);
    }
    pgSwitchWal() {
        return this.pushFunction("PG_SWITCH_WAL");
    }
    pgWalfileName(lsn) {
        return this.pushFunction("PG_WALFILE_NAME", lsn);
    }
    pgWalfileNameOffset(lsn) {
        return this.pushFunction("PG_WALFILE_NAME_OFFSET", lsn);
    }
    pgSplitWalfileName(fileName) {
        return this.pushFunction("PG_SPLIT_WALFILE_NAME", fileName);
    }
    pgWalLsnDiff(...params) {
        return this.pushFunction("PG_WAL_LSN_DIFF", ...params);
    }
    // 9.28.4. Recovery Control Functions
    pgIsInRecovery() {
        return this.pushFunction("PG_IS_IN_RECOVERY");
    }
    pgLastWalReceiveLsn() {
        return this.pushFunction("PG_LAST_WAL_RECEIVE_LSN");
    }
    pgLastWalReplayLsn() {
        return this.pushFunction("PG_LAST_WAL_REPLAY_LSN");
    }
    pgLastXactReplayTimestamp() {
        return this.pushFunction("PG_LAST_XACT_REPLAY_TIMESTAMP");
    }
    pgGetWalResourceManagers() {
        return this.pushFunction("PG_GET_WAL_RESOURCE_MANAGERS");
    }
    pgIsWalReplayPaused() {
        return this.pushFunction("PG_IS_WAL_REPLAY_PAUSED");
    }
    pgGetWalReplayPauseState() {
        return this.pushFunction("PG_GET_WAL_REPLAY_PAUSE_STATE");
    }
    pgPromote(...params) {
        return this.pushFunction("PG_PROMOTE", ...params);
    }
    pgWalReplayPause() {
        return this.pushFunction("PG_WAL_REPLAY_PAUSE");
    }
    pgWalReplayResume() {
        return this.pushFunction("PG_WAL_REPLAY_RESUME");
    }
    // 9.28.5. Snapshot Synchronization Functions
    pgExportSnapshot() {
        return this.pushFunction("PG_EXPORT_SNAPSHOT");
    }
    pgLogStandbySnapshot() {
        return this.pushFunction("PG_LOG_STANDBY_SNAPSHOT");
    }
    // 9.28.6. Replication Management Functions
    pgCreatePhysicalReplicationSlot(...params) {
        return this.pushFunction("PG_CREATE_PHYSICAL_REPLICATION_SLOT", ...params);
    }
    pgDropReplicationSlot(slotName) {
        return this.pushFunction("PG_DROP_REPLICATION_SLOT", slotName);
    }
    pgCreateLogicalReplicationSlot(...params) {
        return this.pushFunction("PG_CREATE_LOGICAL_REPLICATION_SLOT", ...params);
    }
    pgCopyPhysicalReplicationSlot(...params) {
        return this.pushFunction("PG_COPY_PHYSICAL_REPLICATION_SLOT", ...params);
    }
    pgCopyLogicalReplicationSlot(...params) {
        return this.pushFunction("PG_COPY_LOGICAL_REPLICATION_SLOT", ...params);
    }
    pgLogicalSlotGetChanges(...params) {
        return this.pushFunction("PG_LOGICAL_SLOT_GET_CHANGES", ...params);
    }
    pgLogicalSlotPeekChanges(...params) {
        return this.pushFunction("PG_LOGICAL_SLOT_PEEK_CHANGES", ...params);
    }
    pgLogicalSlotGetBinaryChanges(...params) {
        return this.pushFunction("PG_LOGICAL_SLOT_GET_BINARY_CHANGES", ...params);
    }
    pgLogicalSlotPeekBinaryChanges(...params) {
        return this.pushFunction("PG_LOGICAL_SLOT_PEEK_BINARY_CHANGES", ...params);
    }
    pgReplicationSlotAdvance(...params) {
        return this.pushFunction("PG_REPLICATION_SLOT_ADVANCE", ...params);
    }
    pgReplicationOriginCreate(nodeName) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_CREATE", nodeName);
    }
    pgReplicationOriginDrop(nodeName) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_DROP", nodeName);
    }
    pgReplicationOriginOid(nodeName) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_OID", nodeName);
    }
    pgReplicationOriginSessionSetup(nodeName) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_SETUP", nodeName);
    }
    pgReplicationOriginSessionReset() {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_RESET");
    }
    pgReplicationOriginSessionIsSetup() {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_IS_SETUP");
    }
    pgReplicationOriginSessionProgress(flush) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_PROGRESS", flush);
    }
    pgReplicationOriginXactSetup(...params) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_XACT_SETUP", ...params);
    }
    pgReplicationOriginXactReset() {
        return this.pushFunction("PG_REPLICATION_ORIGIN_XACT_RESET");
    }
    pgReplicationOriginAdvance(...params) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_ADVANCE", ...params);
    }
    pgReplicationOriginProgress(...params) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_PROGRESS", ...params);
    }
    pgLogicalEmitMessage(...params) {
        return this.pushFunction("PG_LOGICAL_EMIT_MESSAGE", ...params);
    }
    pgSyncReplicationSlots() {
        return this.pushFunction("PG_SYNC_REPLICATION_SLOTS");
    }
    // 9.28.7. Database Object Management Functions
    pgColumnSize(value) {
        return this.pushFunction("PG_COLUMN_SIZE", value);
    }
    pgColumnCompression(value) {
        return this.pushFunction("PG_COLUMN_COMPRESSION", value);
    }
    pgColumnToastChunkId(value) {
        return this.pushFunction("PG_COLUMN_TOAST_CHUNK_ID", value);
    }
    pgDatabaseSize(nameOrOid) {
        return this.pushFunction("PG_DATABASE_SIZE", nameOrOid);
    }
    pgIndexesSize(regclass) {
        return this.pushFunction("PG_INDEXES_SIZE", regclass);
    }
    pgRelationSize(...params) {
        return this.pushFunction("PG_RELATION_SIZE", ...params);
    }
    pgSizeBytes(text) {
        return this.pushFunction("PG_SIZE_BYTES", text);
    }
    pgSizePretty(bigintOrNumeric) {
        return this.pushFunction("PG_SIZE_PRETTY", bigintOrNumeric);
    }
    pgTableSize(regclass) {
        return this.pushFunction("PG_TABLE_SIZE", regclass);
    }
    pgTablespaceSize(nameOrOid) {
        return this.pushFunction("PG_TABLESPACE_SIZE", nameOrOid);
    }
    pgTotalRelationSize(regclass) {
        return this.pushFunction("PG_TOTAL_RELATION_SIZE", regclass);
    }
    pgRelationFilenode(relation) {
        return this.pushFunction("PG_RELATION_FILENODE", relation);
    }
    pgRelationFilepath(relation) {
        return this.pushFunction("PG_RELATION_FILEPATH", relation);
    }
    pgFilenodeRelation(...params) {
        return this.pushFunction("PG_FILENODE_RELATION", ...params);
    }
    pgCollationActualVersion(oid) {
        return this.pushFunction("PG_COLLATION_ACTUAL_VERSION", oid);
    }
    pgDatabaseCollationActualVersion(oid) {
        return this.pushFunction("PG_DATABASE_COLLATION_ACTUAL_VERSION", oid);
    }
    pgImportSystemCollations(schema) {
        return this.pushFunction("PG_IMPORT_SYSTEM_COLLATIONS", schema);
    }
    pgPartitionTree(regclass) {
        return this.pushFunction("PG_PARTITION_TREE", regclass);
    }
    pgPartitionAncestors(regclass) {
        return this.pushFunction("PG_PARTITION_ANCESTORS", regclass);
    }
    pgPartitionRoot(regclass) {
        return this.pushFunction("PG_PARTITION_ROOT", regclass);
    }
    // 9.28.8. Index Maintenance Functions
    brinSummarizeNewValues(index) {
        return this.pushFunction("BRIN_SUMMARIZE_NEW_VALUES", index);
    }
    brinSummarizeRange(...params) {
        return this.pushFunction("BRIN_SUMMARIZE_RANGE", ...params);
    }
    brinDesummarizeRange(...params) {
        return this.pushFunction("BRIN_DESUMMARIZE_RANGE", ...params);
    }
    ginCleanPendingList(index) {
        return this.pushFunction("GIN_CLEAN_PENDING_LIST", index);
    }
    // 9.28.9. Generic File Access Functions
    pgLsDir(...params) {
        return this.pushFunction("PG_LS_DIR", ...params);
    }
    pgLsLogdir() {
        return this.pushFunction("PG_LS_LOGDIR");
    }
    pgLsWaldir() {
        return this.pushFunction("PG_LS_WALDIR");
    }
    pgLsLogicalmapdir() {
        return this.pushFunction("PG_LS_LOGICALMAPDIR");
    }
    pgLsLogicalsnapdir() {
        return this.pushFunction("PG_LS_LOGICALSNAPDIR");
    }
    pgLsReplslotdir(slotName) {
        return this.pushFunction("PG_LS_REPLSLOTDIR", slotName);
    }
    pgLsSummariesdir() {
        return this.pushFunction("PG_LS_SUMMARIESDIR");
    }
    pgLsArchiveStatusdir() {
        return this.pushFunction("PG_LS_ARCHIVESTATUSDIR");
    }
    pgLsTmpdir(...params) {
        return this.pushFunction("PG_LS_TMPDIR", ...params);
    }
    pgReadFile(...params) {
        return this.pushFunction("PG_READ_FILE", ...params);
    }
    pgReadBinaryFile(...params) {
        return this.pushFunction("PG_READ_BINARY_FILE", ...params);
    }
    pgStatFile(...params) {
        return this.pushFunction("PG_STAT_FILE", ...params);
    }
    // 9.28.10. Advisory Lock Functions
    pgAdvisoryLock(key) {
        return this.pushFunction("PG_ADVISORY_LOCK", key);
    }
    pgAdvisoryLockShared(key) {
        return this.pushFunction("PG_ADVISORY_LOCK_SHARED", key);
    }
    pgAdvisoryUnlock(key) {
        return this.pushFunction("PG_ADVISORY_UNLOCK", key);
    }
    pgAdvisoryUnlockAll() {
        return this.pushFunction("PG_ADVISORY_UNLOCK_ALL");
    }
    pgAdvisoryUnlockShared(key) {
        return this.pushFunction("PG_ADVISORY_UNLOCK_SHARED", key);
    }
    pgAdvisoryXactLock(key) {
        return this.pushFunction("PG_ADVISORY_XACT_LOCK", key);
    }
    pgAdvisoryXactLockShared(key) {
        return this.pushFunction("PG_ADVISORY_XACT_LOCK_SHARED", key);
    }
    pgTryAdvisoryLock(key) {
        return this.pushFunction("PG_TRY_ADVISORY_LOCK", key);
    }
    pgTryAdvisoryLockShared(key) {
        return this.pushFunction("PG_TRY_ADVISORY_LOCK_SHARED", key);
    }
    pgTryAdvisoryXactLock(key) {
        return this.pushFunction("PG_TRY_ADVISORY_XACT_LOCK", key);
    }
    pgTryAdvisoryXactLockShared(key) {
        return this.pushFunction("PG_TRY_ADVISORY_XACT_LOCK_SHARED", key);
    }
}
exports.AdminFunctionBuilder = AdminFunctionBuilder;
