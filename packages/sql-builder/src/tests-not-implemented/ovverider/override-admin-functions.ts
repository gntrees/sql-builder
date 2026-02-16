import { InfoFunctionBuilder } from "./override-info-functions";
import type { QueryBuilder } from "../../query-builder";

export class AdminFunctionBuilder extends InfoFunctionBuilder {
    // 9.28.1. Configuration Settings Functions

    currentSetting(...params: QueryBuilder[]) {
        return this.pushFunction("CURRENT_SETTING", ...params);
    }

    setConfig(...params: QueryBuilder[]) {
        return this.pushFunction("SET_CONFIG", ...params);
    }

    // 9.28.2. Server Signaling Functions

    pgCancelBackend(pid?: QueryBuilder) {
        return this.pushFunction("PG_CANCEL_BACKEND", pid);
    }

    pgLogBackendMemoryContexts(pid?: QueryBuilder) {
        return this.pushFunction("PG_LOG_BACKEND_MEMORY_CONTEXTS", pid);
    }

    pgReloadConf() {
        return this.pushFunction("PG_RELOAD_CONF");
    }

    pgRotateLogfile() {
        return this.pushFunction("PG_ROTATE_LOGFILE");
    }

    pgTerminateBackend(...params: QueryBuilder[]) {
        return this.pushFunction("PG_TERMINATE_BACKEND", ...params);
    }

    // 9.28.3. Backup Control Functions

    pgCreateRestorePoint(name?: QueryBuilder) {
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

    pgBackupStart(...params: QueryBuilder[]) {
        return this.pushFunction("PG_BACKUP_START", ...params);
    }

    pgBackupStop(waitForArchive?: QueryBuilder) {
        return this.pushFunction("PG_BACKUP_STOP", waitForArchive);
    }

    pgSwitchWal() {
        return this.pushFunction("PG_SWITCH_WAL");
    }

    pgWalfileName(lsn?: QueryBuilder) {
        return this.pushFunction("PG_WALFILE_NAME", lsn);
    }

    pgWalfileNameOffset(lsn?: QueryBuilder) {
        return this.pushFunction("PG_WALFILE_NAME_OFFSET", lsn);
    }

    pgSplitWalfileName(fileName?: QueryBuilder) {
        return this.pushFunction("PG_SPLIT_WALFILE_NAME", fileName);
    }

    pgWalLsnDiff(...params: QueryBuilder[]) {
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

    pgPromote(...params: QueryBuilder[]) {
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

    pgCreatePhysicalReplicationSlot(...params: QueryBuilder[]) {
        return this.pushFunction("PG_CREATE_PHYSICAL_REPLICATION_SLOT", ...params);
    }

    pgDropReplicationSlot(slotName?: QueryBuilder) {
        return this.pushFunction("PG_DROP_REPLICATION_SLOT", slotName);
    }

    pgCreateLogicalReplicationSlot(...params: QueryBuilder[]) {
        return this.pushFunction("PG_CREATE_LOGICAL_REPLICATION_SLOT", ...params);
    }

    pgCopyPhysicalReplicationSlot(...params: QueryBuilder[]) {
        return this.pushFunction("PG_COPY_PHYSICAL_REPLICATION_SLOT", ...params);
    }

    pgCopyLogicalReplicationSlot(...params: QueryBuilder[]) {
        return this.pushFunction("PG_COPY_LOGICAL_REPLICATION_SLOT", ...params);
    }

    pgLogicalSlotGetChanges(...params: QueryBuilder[]) {
        return this.pushFunction("PG_LOGICAL_SLOT_GET_CHANGES", ...params);
    }

    pgLogicalSlotPeekChanges(...params: QueryBuilder[]) {
        return this.pushFunction("PG_LOGICAL_SLOT_PEEK_CHANGES", ...params);
    }

    pgLogicalSlotGetBinaryChanges(...params: QueryBuilder[]) {
        return this.pushFunction("PG_LOGICAL_SLOT_GET_BINARY_CHANGES", ...params);
    }

    pgLogicalSlotPeekBinaryChanges(...params: QueryBuilder[]) {
        return this.pushFunction("PG_LOGICAL_SLOT_PEEK_BINARY_CHANGES", ...params);
    }

    pgReplicationSlotAdvance(...params: QueryBuilder[]) {
        return this.pushFunction("PG_REPLICATION_SLOT_ADVANCE", ...params);
    }

    pgReplicationOriginCreate(nodeName?: QueryBuilder) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_CREATE", nodeName);
    }

    pgReplicationOriginDrop(nodeName?: QueryBuilder) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_DROP", nodeName);
    }

    pgReplicationOriginOid(nodeName?: QueryBuilder) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_OID", nodeName);
    }

    pgReplicationOriginSessionSetup(nodeName?: QueryBuilder) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_SETUP", nodeName);
    }

    pgReplicationOriginSessionReset() {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_RESET");
    }

    pgReplicationOriginSessionIsSetup() {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_IS_SETUP");
    }

    pgReplicationOriginSessionProgress(flush?: QueryBuilder) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_SESSION_PROGRESS", flush);
    }

    pgReplicationOriginXactSetup(...params: QueryBuilder[]) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_XACT_SETUP", ...params);
    }

    pgReplicationOriginXactReset() {
        return this.pushFunction("PG_REPLICATION_ORIGIN_XACT_RESET");
    }

    pgReplicationOriginAdvance(...params: QueryBuilder[]) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_ADVANCE", ...params);
    }

    pgReplicationOriginProgress(...params: QueryBuilder[]) {
        return this.pushFunction("PG_REPLICATION_ORIGIN_PROGRESS", ...params);
    }

    pgLogicalEmitMessage(...params: QueryBuilder[]) {
        return this.pushFunction("PG_LOGICAL_EMIT_MESSAGE", ...params);
    }

    pgSyncReplicationSlots() {
        return this.pushFunction("PG_SYNC_REPLICATION_SLOTS");
    }

    // 9.28.7. Database Object Management Functions

    pgColumnSize(value?: QueryBuilder) {
        return this.pushFunction("PG_COLUMN_SIZE", value);
    }

    pgColumnCompression(value?: QueryBuilder) {
        return this.pushFunction("PG_COLUMN_COMPRESSION", value);
    }

    pgColumnToastChunkId(value?: QueryBuilder) {
        return this.pushFunction("PG_COLUMN_TOAST_CHUNK_ID", value);
    }

    pgDatabaseSize(nameOrOid?: QueryBuilder) {
        return this.pushFunction("PG_DATABASE_SIZE", nameOrOid);
    }

    pgIndexesSize(regclass?: QueryBuilder) {
        return this.pushFunction("PG_INDEXES_SIZE", regclass);
    }

    pgRelationSize(...params: QueryBuilder[]) {
        return this.pushFunction("PG_RELATION_SIZE", ...params);
    }

    pgSizeBytes(text?: QueryBuilder) {
        return this.pushFunction("PG_SIZE_BYTES", text);
    }

    pgSizePretty(bigintOrNumeric?: QueryBuilder) {
        return this.pushFunction("PG_SIZE_PRETTY", bigintOrNumeric);
    }

    pgTableSize(regclass?: QueryBuilder) {
        return this.pushFunction("PG_TABLE_SIZE", regclass);
    }

    pgTablespaceSize(nameOrOid?: QueryBuilder) {
        return this.pushFunction("PG_TABLESPACE_SIZE", nameOrOid);
    }

    pgTotalRelationSize(regclass?: QueryBuilder) {
        return this.pushFunction("PG_TOTAL_RELATION_SIZE", regclass);
    }

    pgRelationFilenode(relation?: QueryBuilder) {
        return this.pushFunction("PG_RELATION_FILENODE", relation);
    }

    pgRelationFilepath(relation?: QueryBuilder) {
        return this.pushFunction("PG_RELATION_FILEPATH", relation);
    }

    pgFilenodeRelation(...params: QueryBuilder[]) {
        return this.pushFunction("PG_FILENODE_RELATION", ...params);
    }

    pgCollationActualVersion(oid?: QueryBuilder) {
        return this.pushFunction("PG_COLLATION_ACTUAL_VERSION", oid);
    }

    pgDatabaseCollationActualVersion(oid?: QueryBuilder) {
        return this.pushFunction("PG_DATABASE_COLLATION_ACTUAL_VERSION", oid);
    }

    pgImportSystemCollations(schema?: QueryBuilder) {
        return this.pushFunction("PG_IMPORT_SYSTEM_COLLATIONS", schema);
    }

    pgPartitionTree(regclass?: QueryBuilder) {
        return this.pushFunction("PG_PARTITION_TREE", regclass);
    }

    pgPartitionAncestors(regclass?: QueryBuilder) {
        return this.pushFunction("PG_PARTITION_ANCESTORS", regclass);
    }

    pgPartitionRoot(regclass?: QueryBuilder) {
        return this.pushFunction("PG_PARTITION_ROOT", regclass);
    }

    // 9.28.8. Index Maintenance Functions

    brinSummarizeNewValues(index?: QueryBuilder) {
        return this.pushFunction("BRIN_SUMMARIZE_NEW_VALUES", index);
    }

    brinSummarizeRange(...params: QueryBuilder[]) {
        return this.pushFunction("BRIN_SUMMARIZE_RANGE", ...params);
    }

    brinDesummarizeRange(...params: QueryBuilder[]) {
        return this.pushFunction("BRIN_DESUMMARIZE_RANGE", ...params);
    }

    ginCleanPendingList(index?: QueryBuilder) {
        return this.pushFunction("GIN_CLEAN_PENDING_LIST", index);
    }

    // 9.28.9. Generic File Access Functions

    pgLsDir(...params: QueryBuilder[]) {
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

    pgLsReplslotdir(slotName?: QueryBuilder) {
        return this.pushFunction("PG_LS_REPLSLOTDIR", slotName);
    }

    pgLsSummariesdir() {
        return this.pushFunction("PG_LS_SUMMARIESDIR");
    }

    pgLsArchiveStatusdir() {
        return this.pushFunction("PG_LS_ARCHIVESTATUSDIR");
    }

    pgLsTmpdir(...params: QueryBuilder[]) {
        return this.pushFunction("PG_LS_TMPDIR", ...params);
    }

    pgReadFile(...params: QueryBuilder[]) {
        return this.pushFunction("PG_READ_FILE", ...params);
    }

    pgReadBinaryFile(...params: QueryBuilder[]) {
        return this.pushFunction("PG_READ_BINARY_FILE", ...params);
    }

    pgStatFile(...params: QueryBuilder[]) {
        return this.pushFunction("PG_STAT_FILE", ...params);
    }

    // 9.28.10. Advisory Lock Functions

    pgAdvisoryLock(key?: QueryBuilder) {
        return this.pushFunction("PG_ADVISORY_LOCK", key);
    }

    pgAdvisoryLockShared(key?: QueryBuilder) {
        return this.pushFunction("PG_ADVISORY_LOCK_SHARED", key);
    }

    pgAdvisoryUnlock(key?: QueryBuilder) {
        return this.pushFunction("PG_ADVISORY_UNLOCK", key);
    }

    pgAdvisoryUnlockAll() {
        return this.pushFunction("PG_ADVISORY_UNLOCK_ALL");
    }

    pgAdvisoryUnlockShared(key?: QueryBuilder) {
        return this.pushFunction("PG_ADVISORY_UNLOCK_SHARED", key);
    }

    pgAdvisoryXactLock(key?: QueryBuilder) {
        return this.pushFunction("PG_ADVISORY_XACT_LOCK", key);
    }

    pgAdvisoryXactLockShared(key?: QueryBuilder) {
        return this.pushFunction("PG_ADVISORY_XACT_LOCK_SHARED", key);
    }

    pgTryAdvisoryLock(key?: QueryBuilder) {
        return this.pushFunction("PG_TRY_ADVISORY_LOCK", key);
    }

    pgTryAdvisoryLockShared(key?: QueryBuilder) {
        return this.pushFunction("PG_TRY_ADVISORY_LOCK_SHARED", key);
    }

    pgTryAdvisoryXactLock(key?: QueryBuilder) {
        return this.pushFunction("PG_TRY_ADVISORY_XACT_LOCK", key);
    }

    pgTryAdvisoryXactLockShared(key?: QueryBuilder) {
        return this.pushFunction("PG_TRY_ADVISORY_XACT_LOCK_SHARED", key);
    }
}
