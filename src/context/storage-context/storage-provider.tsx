import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { StorageContext, StorageInitStatus } from './storage-context';
import { storageContext } from './storage-context';
import Dexie, { type EntityTable } from 'dexie';
import type { Diagram } from '@/lib/domain/diagram';
import type { DBTable } from '@/lib/domain/db-table';
import type { DBRelationship } from '@/lib/domain/db-relationship';
import { determineCardinalities } from '@/lib/domain/db-relationship';
import type { ChartDBConfig } from '@/lib/domain/config';
import type { DBDependency } from '@/lib/domain/db-dependency';
import type { Area } from '@/lib/domain/area';
import type { DBCustomType } from '@/lib/domain/db-custom-type';
import type { DiagramFilter } from '@/lib/domain/diagram-filter/diagram-filter';
import type { Note } from '@/lib/domain/note';
import { useAuth } from '@/hooks/use-auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import type {
    CollaborationRole,
    DiagramMembershipRow,
    DiagramFilterCloudRow,
    DiagramSnapshotRow,
    SyncQueueState,
    UserConfigRow,
} from '@/lib/supabase/types';
import {
    buildMembershipRoleMap,
    configToRow,
    deserializeSet,
    diagramToSnapshotRow,
    filterToRow,
    getCompositeDiagramKey,
    parseCompositeDiagramKey,
    getRetryBackoffMs,
    rowToConfig,
    rowToFilter,
    serializeSet,
    shouldIgnoreSelfEvent,
    snapshotRowToDiagram,
} from '@/lib/supabase/storage-sync-utils';
import { generateId } from '@/lib/utils';
import { toast } from '@/components/toast/use-toast';
import { useTranslation } from 'react-i18next';

const FLUSH_DEBOUNCE_MS = 600;
const BACKGROUND_FLUSH_MS = 15000;
const BOOTSTRAP_VERSION = 'v1';

const toDate = (value: Date | string | number | null | undefined): Date => {
    if (!value) {
        return new Date();
    }

    return value instanceof Date ? value : new Date(value);
};

const toErrorMessage = (error: unknown, fallback: string): string => {
    if (error instanceof Error && error.message) {
        return error.message;
    }

    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
    ) {
        return (error as { message: string }).message;
    }

    return fallback;
};

const getQueueKeys = (userId: string) => {
    return {
        dirtyDiagrams: `cloud_sync_dirty_diagrams:${userId}`,
        deletedDiagrams: `cloud_sync_deleted_diagrams:${userId}`,
        dirtyFilters: `cloud_sync_dirty_filters:${userId}`,
        dirtyConfig: `cloud_sync_dirty_config:${userId}`,
    };
};

const getBootstrapKey = (userId: string) =>
    `cloud_bootstrap_${BOOTSTRAP_VERSION}:${userId}`;

const createEmptySyncQueueState = (): SyncQueueState => ({
    dirtyDiagramIds: new Set<string>(),
    deletedDiagramIds: new Set<string>(),
    dirtyFilterDiagramIds: new Set<string>(),
    dirtyConfig: false,
});

const parseQueueKeyWithFallback = (
    key: string,
    fallbackOwnerUserId: string
): { ownerUserId: string; diagramId: string } | null => {
    const parsed = parseCompositeDiagramKey(key);
    if (parsed) {
        return parsed;
    }

    if (!key) {
        return null;
    }

    return {
        ownerUserId: fallbackOwnerUserId,
        diagramId: key,
    };
};

export const StorageProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const { t } = useTranslation();
    const db = useMemo(() => {
        const dexieDB = new Dexie('ChartDB') as Dexie & {
            diagrams: EntityTable<
                Diagram,
                'id' // primary key "id" (for the typings only)
            >;
            db_tables: EntityTable<
                DBTable & { diagramId: string },
                'id' // primary key "id" (for the typings only)
            >;
            db_relationships: EntityTable<
                DBRelationship & { diagramId: string },
                'id' // primary key "id" (for the typings only)
            >;
            db_dependencies: EntityTable<
                DBDependency & { diagramId: string },
                'id' // primary key "id" (for the typings only)
            >;
            areas: EntityTable<
                Area & { diagramId: string },
                'id' // primary key "id" (for the typings only)
            >;
            db_custom_types: EntityTable<
                DBCustomType & { diagramId: string },
                'id' // primary key "id" (for the typings only)
            >;
            notes: EntityTable<
                Note & { diagramId: string },
                'id' // primary key "id" (for the typings only)
            >;
            config: EntityTable<
                ChartDBConfig & { id: number },
                'id' // primary key "id" (for the typings only)
            >;
            diagram_filters: EntityTable<
                DiagramFilter & { diagramId: string },
                'diagramId' // primary key "id" (for the typings only)
            >;
        };

        // Schema declaration:
        dexieDB.version(1).stores({
            diagrams: '++id, name, databaseType, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, x, y, fields, indexes, color, createdAt, width',
            db_relationships:
                '++id, diagramId, name, sourceTableId, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            config: '++id, defaultDiagramId',
        });

        dexieDB.version(2).upgrade((tx) =>
            tx
                .table<DBTable & { diagramId: string }>('db_tables')
                .toCollection()
                .modify((table) => {
                    for (const field of table.fields) {
                        field.type = {
                            // @ts-expect-error string before
                            id: (field.type as string).split(' ').join('_'),
                            // @ts-expect-error string before
                            name: field.type,
                        };
                    }
                })
        );

        dexieDB.version(3).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, x, y, fields, indexes, color, createdAt, width',
            db_relationships:
                '++id, diagramId, name, sourceTableId, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            config: '++id, defaultDiagramId',
        });

        dexieDB.version(4).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, x, y, fields, indexes, color, createdAt, width, comment',
            db_relationships:
                '++id, diagramId, name, sourceTableId, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            config: '++id, defaultDiagramId',
        });

        dexieDB.version(5).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment',
            db_relationships:
                '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            config: '++id, defaultDiagramId',
        });

        dexieDB.version(6).upgrade((tx) =>
            tx
                .table<DBRelationship & { diagramId: string }>(
                    'db_relationships'
                )
                .toCollection()
                .modify((relationship, ref) => {
                    const { sourceCardinality, targetCardinality } =
                        determineCardinalities(
                            // @ts-expect-error string before
                            relationship.type ?? 'one_to_one'
                        );

                    relationship.sourceCardinality = sourceCardinality;
                    relationship.targetCardinality = targetCardinality;

                    // @ts-expect-error string before
                    delete ref.value.type;
                })
        );

        dexieDB.version(7).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment',
            db_relationships:
                '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            db_dependencies:
                '++id, diagramId, schema, tableId, dependentSchema, dependentTableId, createdAt',
            config: '++id, defaultDiagramId',
        });

        dexieDB.version(8).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment, isView, isMaterializedView, order',
            db_relationships:
                '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            db_dependencies:
                '++id, diagramId, schema, tableId, dependentSchema, dependentTableId, createdAt',
            config: '++id, defaultDiagramId',
        });

        dexieDB.version(9).upgrade((tx) =>
            tx
                .table<DBTable & { diagramId: string }>('db_tables')
                .toCollection()
                .modify((table) => {
                    for (const field of table.fields) {
                        if (typeof field.nullable === 'string') {
                            field.nullable =
                                (field.nullable as string).toLowerCase() ===
                                'true';
                        }
                    }
                })
        );

        dexieDB.version(10).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment, isView, isMaterializedView, order',
            db_relationships:
                '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            db_dependencies:
                '++id, diagramId, schema, tableId, dependentSchema, dependentTableId, createdAt',
            areas: '++id, diagramId, name, x, y, width, height, color',
            config: '++id, defaultDiagramId',
        });

        dexieDB.version(11).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment, isView, isMaterializedView, order',
            db_relationships:
                '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            db_dependencies:
                '++id, diagramId, schema, tableId, dependentSchema, dependentTableId, createdAt',
            areas: '++id, diagramId, name, x, y, width, height, color',
            db_custom_types:
                '++id, diagramId, schema, type, kind, values, fields',
            config: '++id, defaultDiagramId',
        });

        dexieDB
            .version(12)
            .stores({
                diagrams:
                    '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
                db_tables:
                    '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment, isView, isMaterializedView, order',
                db_relationships:
                    '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
                db_dependencies:
                    '++id, diagramId, schema, tableId, dependentSchema, dependentTableId, createdAt',
                areas: '++id, diagramId, name, x, y, width, height, color',
                db_custom_types:
                    '++id, diagramId, schema, type, kind, values, fields',
                config: '++id, defaultDiagramId',
                diagram_filters: 'diagramId, tableIds, schemasIds',
            })
            .upgrade((tx) => {
                tx.table('config').clear();
            });

        dexieDB.version(13).stores({
            diagrams:
                '++id, name, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment, isView, isMaterializedView, order',
            db_relationships:
                '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            db_dependencies:
                '++id, diagramId, schema, tableId, dependentSchema, dependentTableId, createdAt',
            areas: '++id, diagramId, name, x, y, width, height, color',
            db_custom_types:
                '++id, diagramId, schema, type, kind, values, fields',
            config: '++id, defaultDiagramId',
            diagram_filters: 'diagramId, tableIds, schemasIds',
            notes: '++id, diagramId, content, x, y, width, height, color',
        });

        dexieDB.version(14).stores({
            diagrams:
                '++id, name, ownerUserId, accessRole, databaseType, databaseEdition, createdAt, updatedAt',
            db_tables:
                '++id, diagramId, name, schema, x, y, fields, indexes, color, createdAt, width, comment, isView, isMaterializedView, order',
            db_relationships:
                '++id, diagramId, name, sourceSchema, sourceTableId, targetSchema, targetTableId, sourceFieldId, targetFieldId, type, createdAt',
            db_dependencies:
                '++id, diagramId, schema, tableId, dependentSchema, dependentTableId, createdAt',
            areas: '++id, diagramId, name, x, y, width, height, color',
            db_custom_types:
                '++id, diagramId, schema, type, kind, values, fields',
            config: '++id, defaultDiagramId',
            diagram_filters: 'diagramId, tableIds, schemasIds',
            notes: '++id, diagramId, content, x, y, width, height, color',
        });

        dexieDB.on('ready', async () => {
            const config = await dexieDB.config.get(1);

            if (!config) {
                const diagrams = await dexieDB.diagrams.toArray();

                await dexieDB.config.add({
                    id: 1,
                    defaultDiagramId: diagrams?.[0]?.id ?? '',
                });
            }
        });
        return dexieDB;
    }, []);

    const { user } = useAuth();
    const supabase = useMemo(() => getSupabaseClient(), []);
    const clientInstanceId = useMemo(() => generateId(), []);

    const activeUserIdRef = useRef<string | null>(null);
    const syncQueueRef = useRef<SyncQueueState>(createEmptySyncQueueState());
    const diagramOwnerRef = useRef<Map<string, string>>(new Map());
    const membershipRoleMapRef = useRef<Map<string, CollaborationRole>>(
        new Map()
    );
    const isFlushingRef = useRef(false);
    const retryAttemptRef = useRef(0);
    const flushDebounceTimerRef = useRef<number>();
    const retryTimerRef = useRef<number>();
    const backgroundTimerRef = useRef<number>();
    const syncErrorToastShownRef = useRef(false);
    const writePermissionToastAtRef = useRef(0);
    const initRunIdRef = useRef(0);
    const syncLifecycleCleanupRef = useRef<(() => void) | undefined>(undefined);
    const pendingRetryResolversRef = useRef<Array<() => void>>([]);

    const [storageInitStatus, setStorageInitStatus] =
        useState<StorageInitStatus>('idle');
    const [storageInitError, setStorageInitError] = useState<string | null>(
        null
    );
    const [retryNonce, setRetryNonce] = useState(0);

    const clearTimers = useCallback(() => {
        if (flushDebounceTimerRef.current) {
            clearTimeout(flushDebounceTimerRef.current);
            flushDebounceTimerRef.current = undefined;
        }

        if (retryTimerRef.current) {
            clearTimeout(retryTimerRef.current);
            retryTimerRef.current = undefined;
        }

        if (backgroundTimerRef.current) {
            clearInterval(backgroundTimerRef.current);
            backgroundTimerRef.current = undefined;
        }
    }, []);

    const resolvePendingRetryRequests = useCallback(() => {
        if (pendingRetryResolversRef.current.length === 0) {
            return;
        }

        for (const resolve of pendingRetryResolversRef.current) {
            resolve();
        }
        pendingRetryResolversRef.current = [];
    }, []);

    const clearSyncLifecycle = useCallback(() => {
        syncLifecycleCleanupRef.current?.();
        syncLifecycleCleanupRef.current = undefined;
        clearTimers();
    }, [clearTimers]);

    const persistSyncQueue = useCallback(() => {
        const userId = activeUserIdRef.current;
        if (!userId) {
            return;
        }

        const queueKeys = getQueueKeys(userId);
        const queue = syncQueueRef.current;

        try {
            localStorage.setItem(
                queueKeys.dirtyDiagrams,
                serializeSet(queue.dirtyDiagramIds)
            );
            localStorage.setItem(
                queueKeys.deletedDiagrams,
                serializeSet(queue.deletedDiagramIds)
            );
            localStorage.setItem(
                queueKeys.dirtyFilters,
                serializeSet(queue.dirtyFilterDiagramIds)
            );
            localStorage.setItem(
                queueKeys.dirtyConfig,
                queue.dirtyConfig ? '1' : '0'
            );
        } catch {
            // localStorage might be blocked (private mode/security policy)
        }
    }, []);

    const loadSyncQueue = useCallback((userId: string): SyncQueueState => {
        const queueKeys = getQueueKeys(userId);

        try {
            return {
                dirtyDiagramIds: deserializeSet(
                    localStorage.getItem(queueKeys.dirtyDiagrams)
                ),
                deletedDiagramIds: deserializeSet(
                    localStorage.getItem(queueKeys.deletedDiagrams)
                ),
                dirtyFilterDiagramIds: deserializeSet(
                    localStorage.getItem(queueKeys.dirtyFilters)
                ),
                dirtyConfig:
                    localStorage.getItem(queueKeys.dirtyConfig) === '1',
            };
        } catch {
            return {
                dirtyDiagramIds: new Set<string>(),
                deletedDiagramIds: new Set<string>(),
                dirtyFilterDiagramIds: new Set<string>(),
                dirtyConfig: false,
            };
        }
    }, []);

    const resolveDiagramOwnerUserId = useCallback(
        async (diagramId: string): Promise<string | undefined> => {
            const cachedOwner = diagramOwnerRef.current.get(diagramId);
            if (cachedOwner) {
                return cachedOwner;
            }

            const diagram = await db.diagrams.get(diagramId);
            const ownerUserId = diagram?.ownerUserId;
            if (!ownerUserId) {
                return undefined;
            }

            diagramOwnerRef.current.set(diagramId, ownerUserId);
            return ownerUserId;
        },
        [db]
    );

    const resolveDiagramAccessRole = useCallback(
        async (diagramId: string): Promise<'owner' | 'editor' | 'viewer'> => {
            const diagram = await db.diagrams.get(diagramId);
            if (!diagram) {
                return 'owner';
            }

            return diagram.accessRole ?? 'owner';
        },
        [db]
    );

    const hydrateLocalDiagramAccessCache = useCallback(async () => {
        const activeUserId = activeUserIdRef.current;
        if (!activeUserId) {
            return;
        }

        const diagrams = await db.diagrams.toArray();
        diagramOwnerRef.current.clear();
        membershipRoleMapRef.current.clear();

        diagrams.forEach((diagram) => {
            const ownerUserId = diagram.ownerUserId ?? activeUserId;
            diagramOwnerRef.current.set(diagram.id, ownerUserId);

            if (
                ownerUserId !== activeUserId &&
                (diagram.accessRole === 'editor' ||
                    diagram.accessRole === 'viewer')
            ) {
                membershipRoleMapRef.current.set(
                    getCompositeDiagramKey(ownerUserId, diagram.id),
                    diagram.accessRole
                );
            }
        });
    }, [db]);

    const readDiagramFromLocalSnapshot = useCallback(
        async (diagramId: string): Promise<Diagram | undefined> => {
            const diagram = await db.diagrams.get(diagramId);
            if (!diagram) {
                return undefined;
            }

            const [
                tables,
                relationships,
                dependencies,
                areas,
                customTypes,
                notes,
            ] = await Promise.all([
                db.db_tables.where('diagramId').equals(diagramId).toArray(),
                db.db_relationships
                    .where('diagramId')
                    .equals(diagramId)
                    .toArray(),
                db.db_dependencies
                    .where('diagramId')
                    .equals(diagramId)
                    .toArray(),
                db.areas.where('diagramId').equals(diagramId).toArray(),
                db.db_custom_types
                    .where('diagramId')
                    .equals(diagramId)
                    .toArray(),
                db.notes.where('diagramId').equals(diagramId).toArray(),
            ]);

            return {
                ...diagram,
                ownerUserId:
                    diagram.ownerUserId ??
                    diagramOwnerRef.current.get(diagramId) ??
                    activeUserIdRef.current ??
                    undefined,
                accessRole: diagram.accessRole ?? 'owner',
                createdAt: toDate(diagram.createdAt),
                updatedAt: toDate(diagram.updatedAt),
                tables,
                relationships,
                dependencies,
                areas,
                customTypes,
                notes,
            } satisfies Diagram;
        },
        [db]
    );

    const clearLocalDiagramData = useCallback(async () => {
        await Promise.all([
            db.diagrams.clear(),
            db.db_tables.clear(),
            db.db_relationships.clear(),
            db.db_dependencies.clear(),
            db.areas.clear(),
            db.db_custom_types.clear(),
            db.notes.clear(),
            db.config.clear(),
            db.diagram_filters.clear(),
        ]);
    }, [db]);

    const applyCloudDiagramSilently = useCallback(
        async (
            row: DiagramSnapshotRow,
            options?: { accessRole?: 'owner' | 'editor' | 'viewer' }
        ) => {
            const localDiagram = await db.diagrams.get(row.diagram_id);
            const localUpdatedAt = localDiagram
                ? toDate(localDiagram.updatedAt).getTime()
                : 0;
            const remoteUpdatedAt = toDate(row.updated_at).getTime();
            const ownerUserId = row.user_id;
            const compositeKey = getCompositeDiagramKey(
                ownerUserId,
                row.diagram_id
            );
            const isDirtyLocally =
                syncQueueRef.current.dirtyDiagramIds.has(compositeKey);

            if (isDirtyLocally && localUpdatedAt >= remoteUpdatedAt) {
                return;
            }

            if (isDirtyLocally && remoteUpdatedAt > localUpdatedAt) {
                syncQueueRef.current.dirtyDiagramIds.delete(compositeKey);
                syncQueueRef.current.deletedDiagramIds.delete(compositeKey);
                persistSyncQueue();
            }

            const diagram = snapshotRowToDiagram(row, {
                ownerUserId,
                accessRole:
                    options?.accessRole ??
                    (ownerUserId === activeUserIdRef.current
                        ? 'owner'
                        : 'viewer'),
            });

            diagramOwnerRef.current.set(diagram.id, ownerUserId);

            await db.diagrams.put({
                id: diagram.id,
                name: diagram.name,
                ownerUserId: diagram.ownerUserId,
                accessRole: diagram.accessRole,
                databaseType: diagram.databaseType,
                databaseEdition: diagram.databaseEdition,
                createdAt: diagram.createdAt,
                updatedAt: diagram.updatedAt,
            });

            await Promise.all([
                db.db_tables.where('diagramId').equals(diagram.id).delete(),
                db.db_relationships
                    .where('diagramId')
                    .equals(diagram.id)
                    .delete(),
                db.db_dependencies
                    .where('diagramId')
                    .equals(diagram.id)
                    .delete(),
                db.areas.where('diagramId').equals(diagram.id).delete(),
                db.db_custom_types
                    .where('diagramId')
                    .equals(diagram.id)
                    .delete(),
                db.notes.where('diagramId').equals(diagram.id).delete(),
            ]);

            if (diagram.tables && diagram.tables.length > 0) {
                await db.db_tables.bulkPut(
                    diagram.tables.map((table) => ({
                        ...table,
                        diagramId: diagram.id,
                    }))
                );
            }

            if (diagram.relationships && diagram.relationships.length > 0) {
                await db.db_relationships.bulkPut(
                    diagram.relationships.map((relationship) => ({
                        ...relationship,
                        diagramId: diagram.id,
                    }))
                );
            }

            if (diagram.dependencies && diagram.dependencies.length > 0) {
                await db.db_dependencies.bulkPut(
                    diagram.dependencies.map((dependency) => ({
                        ...dependency,
                        diagramId: diagram.id,
                    }))
                );
            }

            if (diagram.areas && diagram.areas.length > 0) {
                await db.areas.bulkPut(
                    diagram.areas.map((area) => ({
                        ...area,
                        diagramId: diagram.id,
                    }))
                );
            }

            if (diagram.customTypes && diagram.customTypes.length > 0) {
                await db.db_custom_types.bulkPut(
                    diagram.customTypes.map((customType) => ({
                        ...customType,
                        diagramId: diagram.id,
                    }))
                );
            }

            if (diagram.notes && diagram.notes.length > 0) {
                await db.notes.bulkPut(
                    diagram.notes.map((note) => ({
                        ...note,
                        diagramId: diagram.id,
                    }))
                );
            }
        },
        [db, persistSyncQueue]
    );

    const applyCloudConfigSilently = useCallback(
        async (row?: UserConfigRow) => {
            if (syncQueueRef.current.dirtyConfig) {
                return;
            }

            const config = rowToConfig(row);
            await db.config.put({
                id: 1,
                ...config,
            });
        },
        [db]
    );

    const applyCloudFilterSilently = useCallback(
        async (row: DiagramFilterCloudRow) => {
            const ownerUserId =
                diagramOwnerRef.current.get(row.diagram_id) ??
                activeUserIdRef.current ??
                row.user_id;
            const compositeKey = getCompositeDiagramKey(
                ownerUserId,
                row.diagram_id
            );

            if (syncQueueRef.current.dirtyFilterDiagramIds.has(compositeKey)) {
                return;
            }

            await db.diagram_filters.put({
                diagramId: row.diagram_id,
                ...rowToFilter(row),
            });
        },
        [db]
    );

    const flushSyncQueue = useCallback(async () => {
        if (!supabase || !user?.id || isFlushingRef.current) {
            return;
        }

        const userId = user.id;
        const queue = syncQueueRef.current;

        if (
            queue.dirtyDiagramIds.size === 0 &&
            queue.deletedDiagramIds.size === 0 &&
            queue.dirtyFilterDiagramIds.size === 0 &&
            !queue.dirtyConfig
        ) {
            retryAttemptRef.current = 0;
            return;
        }

        isFlushingRef.current = true;

        try {
            for (const diagramQueueKey of Array.from(queue.deletedDiagramIds)) {
                const parsedKey = parseQueueKeyWithFallback(
                    diagramQueueKey,
                    userId
                );
                if (!parsedKey) {
                    queue.deletedDiagramIds.delete(diagramQueueKey);
                    continue;
                }

                const { ownerUserId, diagramId } = parsedKey;
                const { error } = await supabase
                    .from('diagram_snapshots')
                    .delete()
                    .eq('user_id', ownerUserId)
                    .eq('diagram_id', diagramId);
                if (error) {
                    throw error;
                }

                const { error: filterDeleteError } = await supabase
                    .from('diagram_filters_cloud')
                    .delete()
                    .eq('user_id', userId)
                    .eq('diagram_id', diagramId);
                if (filterDeleteError) {
                    throw filterDeleteError;
                }

                queue.deletedDiagramIds.delete(diagramQueueKey);
                queue.dirtyDiagramIds.delete(diagramQueueKey);
                queue.dirtyFilterDiagramIds.delete(diagramQueueKey);
            }

            for (const diagramQueueKey of Array.from(queue.dirtyDiagramIds)) {
                const parsedKey = parseQueueKeyWithFallback(
                    diagramQueueKey,
                    userId
                );
                if (!parsedKey) {
                    queue.dirtyDiagramIds.delete(diagramQueueKey);
                    continue;
                }

                const { ownerUserId, diagramId } = parsedKey;
                const diagram = await readDiagramFromLocalSnapshot(diagramId);

                if (!diagram) {
                    const { error } = await supabase
                        .from('diagram_snapshots')
                        .delete()
                        .eq('user_id', ownerUserId)
                        .eq('diagram_id', diagramId);
                    if (error) {
                        throw error;
                    }

                    queue.dirtyDiagramIds.delete(diagramQueueKey);
                    continue;
                }

                const row = diagramToSnapshotRow({
                    userId: ownerUserId,
                    clientInstanceId,
                    diagram,
                });

                const { error } = await supabase
                    .from('diagram_snapshots')
                    .upsert(row, { onConflict: 'user_id,diagram_id' });
                if (error) {
                    throw error;
                }

                queue.dirtyDiagramIds.delete(diagramQueueKey);
            }

            if (queue.dirtyConfig) {
                const config = await db.config.get(1);
                const row = configToRow({
                    userId,
                    clientInstanceId,
                    config,
                });

                const { error } = await supabase
                    .from('user_configs')
                    .upsert(row, { onConflict: 'user_id' });
                if (error) {
                    throw error;
                }

                queue.dirtyConfig = false;
            }

            for (const diagramQueueKey of Array.from(
                queue.dirtyFilterDiagramIds
            )) {
                const parsedKey = parseQueueKeyWithFallback(
                    diagramQueueKey,
                    userId
                );
                if (!parsedKey) {
                    queue.dirtyFilterDiagramIds.delete(diagramQueueKey);
                    continue;
                }

                const { diagramId } = parsedKey;
                const filter = await db.diagram_filters.get({ diagramId });

                if (!filter) {
                    const { error } = await supabase
                        .from('diagram_filters_cloud')
                        .delete()
                        .eq('user_id', userId)
                        .eq('diagram_id', diagramId);
                    if (error) {
                        throw error;
                    }

                    queue.dirtyFilterDiagramIds.delete(diagramQueueKey);
                    continue;
                }

                const row = filterToRow({
                    userId,
                    clientInstanceId,
                    diagramId,
                    filter,
                });

                const { error } = await supabase
                    .from('diagram_filters_cloud')
                    .upsert(row, { onConflict: 'user_id,diagram_id' });
                if (error) {
                    throw error;
                }

                queue.dirtyFilterDiagramIds.delete(diagramQueueKey);
            }

            retryAttemptRef.current = 0;
            persistSyncQueue();

            if (syncErrorToastShownRef.current) {
                syncErrorToastShownRef.current = false;
                toast({
                    title: t('cloud_sync_toasts.restored_title'),
                    description: t('cloud_sync_toasts.restored_description'),
                });
            }
        } catch {
            persistSyncQueue();

            if (!syncErrorToastShownRef.current) {
                syncErrorToastShownRef.current = true;
                toast({
                    variant: 'destructive',
                    title: t('cloud_sync_toasts.paused_title'),
                    description: t('cloud_sync_toasts.paused_description'),
                });
            }

            retryAttemptRef.current += 1;
            const waitMs = getRetryBackoffMs(retryAttemptRef.current);

            if (retryTimerRef.current) {
                clearTimeout(retryTimerRef.current);
            }

            retryTimerRef.current = window.setTimeout(() => {
                void flushSyncQueue();
            }, waitMs);
        } finally {
            isFlushingRef.current = false;
        }
    }, [
        clientInstanceId,
        db,
        persistSyncQueue,
        readDiagramFromLocalSnapshot,
        supabase,
        t,
        user?.id,
    ]);

    const scheduleFlush = useCallback(() => {
        if (!supabase || !activeUserIdRef.current) {
            return;
        }

        if (flushDebounceTimerRef.current) {
            clearTimeout(flushDebounceTimerRef.current);
        }

        flushDebounceTimerRef.current = window.setTimeout(() => {
            void flushSyncQueue();
        }, FLUSH_DEBOUNCE_MS);
    }, [flushSyncQueue, supabase]);

    const notifyWritePermissionDenied = useCallback(() => {
        const now = Date.now();
        if (now - writePermissionToastAtRef.current < 2000) {
            return;
        }

        writePermissionToastAtRef.current = now;
        toast({
            variant: 'destructive',
            title: t('cloud_sync_toasts.read_only_title'),
            description: t('cloud_sync_toasts.read_only_description'),
        });
    }, [t]);

    const resolveCompositeQueueKey = useCallback(
        async (diagramId: string): Promise<string | null> => {
            if (!activeUserIdRef.current || !diagramId) {
                return null;
            }

            const ownerUserId =
                (await resolveDiagramOwnerUserId(diagramId)) ??
                activeUserIdRef.current;

            return getCompositeDiagramKey(ownerUserId, diagramId);
        },
        [resolveDiagramOwnerUserId]
    );

    const markDiagramDirty = useCallback(
        async (diagramId: string) => {
            if (!activeUserIdRef.current || !diagramId) {
                return;
            }

            const accessRole = await resolveDiagramAccessRole(diagramId);
            if (accessRole === 'viewer') {
                notifyWritePermissionDenied();
                return;
            }

            const queueKey = await resolveCompositeQueueKey(diagramId);
            if (!queueKey) {
                return;
            }

            syncQueueRef.current.deletedDiagramIds.delete(queueKey);
            syncQueueRef.current.dirtyDiagramIds.add(queueKey);
            persistSyncQueue();
            scheduleFlush();
        },
        [
            notifyWritePermissionDenied,
            persistSyncQueue,
            resolveCompositeQueueKey,
            resolveDiagramAccessRole,
            scheduleFlush,
        ]
    );

    const markDiagramDeleted = useCallback(
        async (diagramId: string) => {
            if (!activeUserIdRef.current || !diagramId) {
                return;
            }

            const ownerUserId = await resolveDiagramOwnerUserId(diagramId);
            if (!ownerUserId || ownerUserId !== activeUserIdRef.current) {
                notifyWritePermissionDenied();
                return;
            }

            const queueKey = getCompositeDiagramKey(ownerUserId, diagramId);
            syncQueueRef.current.dirtyDiagramIds.delete(queueKey);
            syncQueueRef.current.dirtyFilterDiagramIds.delete(queueKey);
            syncQueueRef.current.deletedDiagramIds.add(queueKey);
            persistSyncQueue();
            scheduleFlush();
        },
        [
            notifyWritePermissionDenied,
            persistSyncQueue,
            resolveDiagramOwnerUserId,
            scheduleFlush,
        ]
    );

    const markConfigDirty = useCallback(() => {
        if (!activeUserIdRef.current) {
            return;
        }

        syncQueueRef.current.dirtyConfig = true;
        persistSyncQueue();
        scheduleFlush();
    }, [persistSyncQueue, scheduleFlush]);

    const markFilterDirty = useCallback(
        async (diagramId: string) => {
            if (!activeUserIdRef.current || !diagramId) {
                return;
            }

            const queueKey = await resolveCompositeQueueKey(diagramId);
            if (!queueKey) {
                return;
            }

            syncQueueRef.current.dirtyFilterDiagramIds.add(queueKey);
            persistSyncQueue();
            scheduleFlush();
        },
        [persistSyncQueue, resolveCompositeQueueKey, scheduleFlush]
    );

    const bootstrapFromCloud = useCallback(
        async (userId: string) => {
            if (!supabase) {
                return;
            }

            const bootstrapKey = getBootstrapKey(userId);
            const hasBootstrapped = localStorage.getItem(bootstrapKey) === '1';
            const hasPendingLocalMutations =
                syncQueueRef.current.dirtyDiagramIds.size > 0 ||
                syncQueueRef.current.deletedDiagramIds.size > 0 ||
                syncQueueRef.current.dirtyFilterDiagramIds.size > 0 ||
                syncQueueRef.current.dirtyConfig;

            if (hasPendingLocalMutations && hasBootstrapped) {
                return;
            }

            const [
                diagramResult,
                configResult,
                filterResult,
                membershipResult,
            ] = await Promise.all([
                supabase.from('diagram_snapshots').select('*'),
                supabase
                    .from('user_configs')
                    .select('*')
                    .eq('user_id', userId)
                    .maybeSingle(),
                supabase
                    .from('diagram_filters_cloud')
                    .select('*')
                    .eq('user_id', userId),
                supabase
                    .from('diagram_memberships')
                    .select('*')
                    .eq('member_user_id', userId),
            ]);

            if (diagramResult.error) {
                throw diagramResult.error;
            }

            if (configResult.error) {
                throw configResult.error;
            }

            if (filterResult.error) {
                throw filterResult.error;
            }

            if (membershipResult.error) {
                throw membershipResult.error;
            }

            const membershipRoleMap = buildMembershipRoleMap(
                (membershipResult.data as DiagramMembershipRow[]) ?? []
            );
            membershipRoleMapRef.current = membershipRoleMap;
            diagramOwnerRef.current.clear();

            await clearLocalDiagramData();

            for (const row of diagramResult.data as DiagramSnapshotRow[]) {
                const accessRole =
                    row.user_id === userId
                        ? 'owner'
                        : (membershipRoleMap.get(
                              getCompositeDiagramKey(
                                  row.user_id,
                                  row.diagram_id
                              )
                          ) ?? 'viewer');
                await applyCloudDiagramSilently(row, { accessRole });
            }

            await applyCloudConfigSilently(configResult.data as UserConfigRow);

            for (const row of filterResult.data as DiagramFilterCloudRow[]) {
                await applyCloudFilterSilently(row);
            }

            const localConfig = await db.config.get(1);
            if (!localConfig) {
                const diagrams = await db.diagrams.toArray();
                await db.config.put({
                    id: 1,
                    defaultDiagramId: diagrams?.[0]?.id ?? '',
                });
            }

            localStorage.setItem(bootstrapKey, '1');
        },
        [
            applyCloudConfigSilently,
            applyCloudDiagramSilently,
            applyCloudFilterSilently,
            clearLocalDiagramData,
            db,
            supabase,
        ]
    );

    const retryStorageInitialization: StorageContext['retryStorageInitialization'] =
        useCallback(async () => {
            if (!user?.id) {
                return;
            }

            await new Promise<void>((resolve) => {
                pendingRetryResolversRef.current.push(resolve);
                setRetryNonce((prev) => prev + 1);
            });
        }, [user?.id]);

    useEffect(() => {
        if (!user?.id) {
            initRunIdRef.current += 1;
            clearSyncLifecycle();
            activeUserIdRef.current = null;
            syncQueueRef.current = createEmptySyncQueueState();
            diagramOwnerRef.current.clear();
            membershipRoleMapRef.current.clear();
            retryAttemptRef.current = 0;
            syncErrorToastShownRef.current = false;
            setStorageInitStatus('idle');
            setStorageInitError(null);
            resolvePendingRetryRequests();
            return;
        }

        const initRunId = ++initRunIdRef.current;
        clearSyncLifecycle();
        activeUserIdRef.current = user.id;
        syncQueueRef.current = loadSyncQueue(user.id);
        diagramOwnerRef.current.clear();
        membershipRoleMapRef.current.clear();
        retryAttemptRef.current = 0;
        syncErrorToastShownRef.current = false;
        setStorageInitStatus('initializing');
        setStorageInitError(null);
        let disposed = false;

        const init = async () => {
            try {
                await hydrateLocalDiagramAccessCache();
                await bootstrapFromCloud(user.id);

                if (disposed || initRunId !== initRunIdRef.current) {
                    return;
                }

                if (backgroundTimerRef.current) {
                    clearInterval(backgroundTimerRef.current);
                }

                backgroundTimerRef.current = window.setInterval(() => {
                    void flushSyncQueue();
                }, BACKGROUND_FLUSH_MS);

                const onOnline = () => {
                    void flushSyncQueue();
                };
                const onVisibilityChange = () => {
                    if (document.visibilityState === 'hidden') {
                        void flushSyncQueue();
                    }
                };

                window.addEventListener('online', onOnline);
                document.addEventListener(
                    'visibilitychange',
                    onVisibilityChange
                );

                const channel = supabase
                    ?.channel(`chartdb-cloud-sync-${user.id}`)
                    .on(
                        'postgres_changes',
                        {
                            event: '*',
                            schema: 'public',
                            table: 'diagram_snapshots',
                        },
                        async (payload) => {
                            const newRow = payload.new as DiagramSnapshotRow;
                            const oldRow = payload.old as DiagramSnapshotRow;

                            if (
                                shouldIgnoreSelfEvent(
                                    (newRow ?? oldRow)?.client_instance_id,
                                    clientInstanceId
                                )
                            ) {
                                return;
                            }

                            if (payload.eventType === 'DELETE' && oldRow) {
                                const diagramId = oldRow.diagram_id;
                                const ownerUserId = oldRow.user_id;
                                const queueKey = getCompositeDiagramKey(
                                    ownerUserId,
                                    diagramId
                                );
                                const localDirty =
                                    syncQueueRef.current.dirtyDiagramIds.has(
                                        queueKey
                                    );
                                if (localDirty) {
                                    return;
                                }

                                await Promise.all([
                                    db.diagrams.delete(diagramId),
                                    db.db_tables
                                        .where('diagramId')
                                        .equals(diagramId)
                                        .delete(),
                                    db.db_relationships
                                        .where('diagramId')
                                        .equals(diagramId)
                                        .delete(),
                                    db.db_dependencies
                                        .where('diagramId')
                                        .equals(diagramId)
                                        .delete(),
                                    db.areas
                                        .where('diagramId')
                                        .equals(diagramId)
                                        .delete(),
                                    db.db_custom_types
                                        .where('diagramId')
                                        .equals(diagramId)
                                        .delete(),
                                    db.notes
                                        .where('diagramId')
                                        .equals(diagramId)
                                        .delete(),
                                    db.diagram_filters
                                        .where({ diagramId })
                                        .delete(),
                                ]);
                                diagramOwnerRef.current.delete(diagramId);
                                membershipRoleMapRef.current.delete(queueKey);

                                if (
                                    window.location.pathname ===
                                    `/diagrams/${diagramId}`
                                ) {
                                    window.location.href = '/';
                                }
                                return;
                            }

                            if (
                                (payload.eventType === 'INSERT' ||
                                    payload.eventType === 'UPDATE') &&
                                newRow
                            ) {
                                const membershipKey = getCompositeDiagramKey(
                                    newRow.user_id,
                                    newRow.diagram_id
                                );
                                const accessRole =
                                    newRow.user_id === user.id
                                        ? 'owner'
                                        : membershipRoleMapRef.current.get(
                                              membershipKey
                                          );
                                if (newRow.user_id !== user.id && !accessRole) {
                                    return;
                                }

                                await applyCloudDiagramSilently(newRow, {
                                    accessRole: accessRole ?? 'owner',
                                });
                            }
                        }
                    )
                    .on(
                        'postgres_changes',
                        {
                            event: '*',
                            schema: 'public',
                            table: 'user_configs',
                            filter: `user_id=eq.${user.id}`,
                        },
                        async (payload) => {
                            const newRow = payload.new as UserConfigRow;
                            const oldRow = payload.old as UserConfigRow;

                            if (
                                shouldIgnoreSelfEvent(
                                    (newRow ?? oldRow)?.client_instance_id,
                                    clientInstanceId
                                )
                            ) {
                                return;
                            }

                            if (payload.eventType === 'DELETE') {
                                await db.config.put({
                                    id: 1,
                                    defaultDiagramId: '',
                                });
                                return;
                            }

                            if (
                                (payload.eventType === 'INSERT' ||
                                    payload.eventType === 'UPDATE') &&
                                newRow
                            ) {
                                await applyCloudConfigSilently(newRow);
                            }
                        }
                    )
                    .on(
                        'postgres_changes',
                        {
                            event: '*',
                            schema: 'public',
                            table: 'diagram_filters_cloud',
                            filter: `user_id=eq.${user.id}`,
                        },
                        async (payload) => {
                            const newRow = payload.new as DiagramFilterCloudRow;
                            const oldRow = payload.old as DiagramFilterCloudRow;

                            if (
                                shouldIgnoreSelfEvent(
                                    (newRow ?? oldRow)?.client_instance_id,
                                    clientInstanceId
                                )
                            ) {
                                return;
                            }

                            if (payload.eventType === 'DELETE' && oldRow) {
                                const ownerUserId =
                                    diagramOwnerRef.current.get(
                                        oldRow.diagram_id
                                    ) ?? user.id;
                                if (
                                    syncQueueRef.current.dirtyFilterDiagramIds.has(
                                        getCompositeDiagramKey(
                                            ownerUserId,
                                            oldRow.diagram_id
                                        )
                                    )
                                ) {
                                    return;
                                }

                                await db.diagram_filters
                                    .where({ diagramId: oldRow.diagram_id })
                                    .delete();
                                return;
                            }

                            if (
                                (payload.eventType === 'INSERT' ||
                                    payload.eventType === 'UPDATE') &&
                                newRow
                            ) {
                                await applyCloudFilterSilently(newRow);
                            }
                        }
                    )
                    .on(
                        'postgres_changes',
                        {
                            event: '*',
                            schema: 'public',
                            table: 'diagram_memberships',
                        },
                        async (payload) => {
                            const newRow = payload.new as DiagramMembershipRow;
                            const oldRow = payload.old as DiagramMembershipRow;
                            const membershipRow = newRow ?? oldRow;
                            if (!membershipRow) {
                                return;
                            }

                            if (membershipRow.member_user_id !== user.id) {
                                return;
                            }

                            const membershipKey = getCompositeDiagramKey(
                                membershipRow.owner_user_id,
                                membershipRow.diagram_id
                            );

                            if (payload.eventType === 'DELETE') {
                                membershipRoleMapRef.current.delete(
                                    membershipKey
                                );

                                await Promise.all([
                                    db.diagrams.delete(
                                        membershipRow.diagram_id
                                    ),
                                    db.db_tables
                                        .where('diagramId')
                                        .equals(membershipRow.diagram_id)
                                        .delete(),
                                    db.db_relationships
                                        .where('diagramId')
                                        .equals(membershipRow.diagram_id)
                                        .delete(),
                                    db.db_dependencies
                                        .where('diagramId')
                                        .equals(membershipRow.diagram_id)
                                        .delete(),
                                    db.areas
                                        .where('diagramId')
                                        .equals(membershipRow.diagram_id)
                                        .delete(),
                                    db.db_custom_types
                                        .where('diagramId')
                                        .equals(membershipRow.diagram_id)
                                        .delete(),
                                    db.notes
                                        .where('diagramId')
                                        .equals(membershipRow.diagram_id)
                                        .delete(),
                                    db.diagram_filters
                                        .where({
                                            diagramId: membershipRow.diagram_id,
                                        })
                                        .delete(),
                                ]);

                                diagramOwnerRef.current.delete(
                                    membershipRow.diagram_id
                                );
                                syncQueueRef.current.dirtyDiagramIds.delete(
                                    membershipKey
                                );
                                syncQueueRef.current.deletedDiagramIds.delete(
                                    membershipKey
                                );
                                syncQueueRef.current.dirtyFilterDiagramIds.delete(
                                    membershipKey
                                );
                                persistSyncQueue();

                                if (
                                    window.location.pathname ===
                                    `/diagrams/${membershipRow.diagram_id}`
                                ) {
                                    toast({
                                        title: t(
                                            'cloud_sync_toasts.access_removed_title'
                                        ),
                                        description: t(
                                            'cloud_sync_toasts.access_removed_description'
                                        ),
                                    });
                                    window.location.href = '/';
                                }
                                return;
                            }

                            if (
                                payload.eventType === 'INSERT' ||
                                payload.eventType === 'UPDATE'
                            ) {
                                membershipRoleMapRef.current.set(
                                    membershipKey,
                                    membershipRow.role
                                );
                                const { data: latestDiagram, error } =
                                    await supabase
                                        .from('diagram_snapshots')
                                        .select('*')
                                        .eq(
                                            'user_id',
                                            membershipRow.owner_user_id
                                        )
                                        .eq(
                                            'diagram_id',
                                            membershipRow.diagram_id
                                        )
                                        .maybeSingle();

                                if (error) {
                                    throw error;
                                }

                                if (latestDiagram) {
                                    await applyCloudDiagramSilently(
                                        latestDiagram as DiagramSnapshotRow,
                                        {
                                            accessRole: membershipRow.role,
                                        }
                                    );
                                }
                            }
                        }
                    )
                    .on(
                        'postgres_changes',
                        {
                            event: '*',
                            schema: 'public',
                            table: 'diagram_invitations',
                        },
                        () => {
                            // Invitation changes are consumed by the collaboration context.
                        }
                    )
                    .subscribe();

                syncLifecycleCleanupRef.current = () => {
                    window.removeEventListener('online', onOnline);
                    document.removeEventListener(
                        'visibilitychange',
                        onVisibilityChange
                    );
                    if (channel && supabase) {
                        void supabase.removeChannel(channel);
                    }
                };

                void flushSyncQueue();
                setStorageInitStatus('ready');
                setStorageInitError(null);
            } catch (error) {
                if (disposed || initRunId !== initRunIdRef.current) {
                    return;
                }

                setStorageInitStatus('error');
                setStorageInitError(
                    toErrorMessage(error, 'Failed to initialize cloud storage.')
                );
            } finally {
                if (!disposed && initRunId === initRunIdRef.current) {
                    resolvePendingRetryRequests();
                }
            }
        };

        void init();

        return () => {
            disposed = true;
            if (initRunId === initRunIdRef.current) {
                initRunIdRef.current += 1;
            }
            clearSyncLifecycle();
        };
    }, [
        applyCloudConfigSilently,
        applyCloudDiagramSilently,
        applyCloudFilterSilently,
        bootstrapFromCloud,
        clearSyncLifecycle,
        clientInstanceId,
        db,
        flushSyncQueue,
        hydrateLocalDiagramAccessCache,
        loadSyncQueue,
        persistSyncQueue,
        resolvePendingRetryRequests,
        retryNonce,
        supabase,
        t,
        user?.id,
    ]);

    const getConfig: StorageContext['getConfig'] =
        useCallback(async (): Promise<ChartDBConfig | undefined> => {
            return await db.config.get(1);
        }, [db]);

    const updateConfig: StorageContext['updateConfig'] = useCallback(
        async (config) => {
            const prevConfig = await db.config.get(1);
            await db.config.put({
                id: 1,
                defaultDiagramId: '',
                ...prevConfig,
                ...config,
            });
        },
        [db]
    );

    const getDiagramFilter: StorageContext['getDiagramFilter'] = useCallback(
        async (diagramId: string): Promise<DiagramFilter | undefined> => {
            const filter = await db.diagram_filters.get({ diagramId });

            return filter;
        },
        [db]
    );

    const updateDiagramFilter: StorageContext['updateDiagramFilter'] =
        useCallback(
            async (diagramId, filter): Promise<void> => {
                await db.diagram_filters.put({
                    diagramId,
                    ...filter,
                });
            },
            [db]
        );

    const deleteDiagramFilter: StorageContext['deleteDiagramFilter'] =
        useCallback(
            async (diagramId: string): Promise<void> => {
                await db.diagram_filters.where({ diagramId }).delete();
            },
            [db]
        );

    const addTable: StorageContext['addTable'] = useCallback(
        async ({ diagramId, table }) => {
            await db.db_tables.add({
                ...table,
                diagramId,
            });
        },
        [db]
    );

    const getTable: StorageContext['getTable'] = useCallback(
        async ({ id, diagramId }): Promise<DBTable | undefined> => {
            return await db.db_tables.get({ id, diagramId });
        },
        [db]
    );

    const deleteDiagramTables: StorageContext['deleteDiagramTables'] =
        useCallback(
            async (diagramId) => {
                await db.db_tables
                    .where('diagramId')
                    .equals(diagramId)
                    .delete();
            },
            [db]
        );

    const updateTable: StorageContext['updateTable'] = useCallback(
        async ({ id, attributes }) => {
            await db.db_tables.update(id, attributes);
        },
        [db]
    );

    const putTable: StorageContext['putTable'] = useCallback(
        async ({ diagramId, table }) => {
            await db.db_tables.put({ ...table, diagramId });
        },
        [db]
    );

    const deleteTable: StorageContext['deleteTable'] = useCallback(
        async ({ id, diagramId }) => {
            await db.db_tables.where({ id, diagramId }).delete();
        },
        [db]
    );

    const listTables: StorageContext['listTables'] = useCallback(
        async (diagramId): Promise<DBTable[]> => {
            // Fetch all tables associated with the diagram
            const tables = await db.db_tables
                .where('diagramId')
                .equals(diagramId)
                .toArray();

            return tables;
        },
        [db]
    );

    const addRelationship: StorageContext['addRelationship'] = useCallback(
        async ({ diagramId, relationship }) => {
            await db.db_relationships.add({
                ...relationship,
                diagramId,
            });
        },
        [db]
    );

    const deleteDiagramRelationships: StorageContext['deleteDiagramRelationships'] =
        useCallback(
            async (diagramId) => {
                await db.db_relationships
                    .where('diagramId')
                    .equals(diagramId)
                    .delete();
            },
            [db]
        );

    const getRelationship: StorageContext['getRelationship'] = useCallback(
        async ({ id, diagramId }): Promise<DBRelationship | undefined> => {
            return await db.db_relationships.get({ id, diagramId });
        },
        [db]
    );

    const updateRelationship: StorageContext['updateRelationship'] =
        useCallback(
            async ({ id, attributes }) => {
                await db.db_relationships.update(id, attributes);
            },
            [db]
        );

    const deleteRelationship: StorageContext['deleteRelationship'] =
        useCallback(
            async ({ id, diagramId }) => {
                await db.db_relationships.where({ id, diagramId }).delete();
            },
            [db]
        );

    const listRelationships: StorageContext['listRelationships'] = useCallback(
        async (diagramId): Promise<DBRelationship[]> => {
            // Sort relationships alphabetically
            return (
                await db.db_relationships
                    .where('diagramId')
                    .equals(diagramId)
                    .toArray()
            ).sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        [db]
    );

    const addDependency: StorageContext['addDependency'] = useCallback(
        async ({ diagramId, dependency }) => {
            await db.db_dependencies.add({
                ...dependency,
                diagramId,
            });
        },
        [db]
    );

    const getDependency: StorageContext['getDependency'] = useCallback(
        async ({ diagramId, id }) => {
            return await db.db_dependencies.get({ id, diagramId });
        },
        [db]
    );

    const updateDependency: StorageContext['updateDependency'] = useCallback(
        async ({ id, attributes }) => {
            await db.db_dependencies.update(id, attributes);
        },
        [db]
    );

    const deleteDependency: StorageContext['deleteDependency'] = useCallback(
        async ({ diagramId, id }) => {
            await db.db_dependencies.where({ id, diagramId }).delete();
        },
        [db]
    );

    const listDependencies: StorageContext['listDependencies'] = useCallback(
        async (diagramId) => {
            return await db.db_dependencies
                .where('diagramId')
                .equals(diagramId)
                .toArray();
        },
        [db]
    );

    const deleteDiagramDependencies: StorageContext['deleteDiagramDependencies'] =
        useCallback(
            async (diagramId) => {
                await db.db_dependencies
                    .where('diagramId')
                    .equals(diagramId)
                    .delete();
            },
            [db]
        );

    const addArea: StorageContext['addArea'] = useCallback(
        async ({ area, diagramId }) => {
            await db.areas.add({
                ...area,
                diagramId,
            });
        },
        [db]
    );

    const getArea: StorageContext['getArea'] = useCallback(
        async ({ diagramId, id }) => {
            return await db.areas.get({ id, diagramId });
        },
        [db]
    );

    const updateArea: StorageContext['updateArea'] = useCallback(
        async ({ id, attributes }) => {
            await db.areas.update(id, attributes);
        },
        [db]
    );

    const deleteArea: StorageContext['deleteArea'] = useCallback(
        async ({ diagramId, id }) => {
            await db.areas.where({ id, diagramId }).delete();
        },
        [db]
    );

    const listAreas: StorageContext['listAreas'] = useCallback(
        async (diagramId) => {
            return await db.areas
                .where('diagramId')
                .equals(diagramId)
                .toArray();
        },
        [db]
    );

    const deleteDiagramAreas: StorageContext['deleteDiagramAreas'] =
        useCallback(
            async (diagramId) => {
                await db.areas.where('diagramId').equals(diagramId).delete();
            },
            [db]
        );

    // Custom type operations
    const addCustomType: StorageContext['addCustomType'] = useCallback(
        async ({ diagramId, customType }) => {
            await db.db_custom_types.add({
                ...customType,
                diagramId,
            });
        },
        [db]
    );

    const getCustomType: StorageContext['getCustomType'] = useCallback(
        async ({ diagramId, id }): Promise<DBCustomType | undefined> => {
            return await db.db_custom_types.get({ id, diagramId });
        },
        [db]
    );

    const updateCustomType: StorageContext['updateCustomType'] = useCallback(
        async ({ id, attributes }) => {
            await db.db_custom_types.update(id, attributes);
        },
        [db]
    );

    const deleteCustomType: StorageContext['deleteCustomType'] = useCallback(
        async ({ diagramId, id }) => {
            await db.db_custom_types.where({ id, diagramId }).delete();
        },
        [db]
    );

    const listCustomTypes: StorageContext['listCustomTypes'] = useCallback(
        async (diagramId): Promise<DBCustomType[]> => {
            return (
                await db.db_custom_types
                    .where('diagramId')
                    .equals(diagramId)
                    .toArray()
            ).sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        [db]
    );

    const deleteDiagramCustomTypes: StorageContext['deleteDiagramCustomTypes'] =
        useCallback(
            async (diagramId) => {
                await db.db_custom_types
                    .where('diagramId')
                    .equals(diagramId)
                    .delete();
            },
            [db]
        );

    // Note operations
    const addNote: StorageContext['addNote'] = useCallback(
        async ({ note, diagramId }) => {
            await db.notes.add({
                ...note,
                diagramId,
            });
        },
        [db]
    );

    const getNote: StorageContext['getNote'] = useCallback(
        async ({ diagramId, id }) => {
            return await db.notes.get({ id, diagramId });
        },
        [db]
    );

    const updateNote: StorageContext['updateNote'] = useCallback(
        async ({ id, attributes }) => {
            await db.notes.update(id, attributes);
        },
        [db]
    );

    const deleteNote: StorageContext['deleteNote'] = useCallback(
        async ({ diagramId, id }) => {
            await db.notes.where({ id, diagramId }).delete();
        },
        [db]
    );

    const listNotes: StorageContext['listNotes'] = useCallback(
        async (diagramId) => {
            return await db.notes
                .where('diagramId')
                .equals(diagramId)
                .toArray();
        },
        [db]
    );

    const deleteDiagramNotes: StorageContext['deleteDiagramNotes'] =
        useCallback(
            async (diagramId) => {
                await db.notes.where('diagramId').equals(diagramId).delete();
            },
            [db]
        );

    const addDiagram: StorageContext['addDiagram'] = useCallback(
        async ({ diagram }) => {
            const ownerUserId =
                diagram.ownerUserId ?? activeUserIdRef.current ?? '';
            const accessRole =
                diagram.accessRole ??
                (ownerUserId && ownerUserId !== activeUserIdRef.current
                    ? 'editor'
                    : 'owner');

            const promises = [];
            promises.push(
                db.diagrams.add({
                    id: diagram.id,
                    name: diagram.name,
                    ownerUserId,
                    accessRole,
                    databaseType: diagram.databaseType,
                    databaseEdition: diagram.databaseEdition,
                    createdAt: diagram.createdAt,
                    updatedAt: diagram.updatedAt,
                })
            );

            if (ownerUserId) {
                diagramOwnerRef.current.set(diagram.id, ownerUserId);
            }

            const tables = diagram.tables ?? [];
            promises.push(
                ...tables.map((table) =>
                    addTable({ diagramId: diagram.id, table })
                )
            );

            const relationships = diagram.relationships ?? [];
            promises.push(
                ...relationships.map((relationship) =>
                    addRelationship({ diagramId: diagram.id, relationship })
                )
            );

            const dependencies = diagram.dependencies ?? [];
            promises.push(
                ...dependencies.map((dependency) =>
                    addDependency({ diagramId: diagram.id, dependency })
                )
            );

            const areas = diagram.areas ?? [];
            promises.push(
                ...areas.map((area) => addArea({ diagramId: diagram.id, area }))
            );

            const customTypes = diagram.customTypes ?? [];
            promises.push(
                ...customTypes.map((customType) =>
                    addCustomType({ diagramId: diagram.id, customType })
                )
            );

            const notes = diagram.notes ?? [];
            promises.push(
                ...notes.map((note) => addNote({ diagramId: diagram.id, note }))
            );

            await Promise.all(promises);
        },
        [
            db,
            addArea,
            addCustomType,
            addDependency,
            addRelationship,
            addTable,
            addNote,
        ]
    );

    const listDiagrams: StorageContext['listDiagrams'] = useCallback(
        async (
            options = {
                includeRelationships: false,
                includeTables: false,
                includeDependencies: false,
                includeAreas: false,
                includeCustomTypes: false,
                includeNotes: false,
            }
        ): Promise<Diagram[]> => {
            let diagrams = await db.diagrams.toArray();

            if (options.includeTables) {
                diagrams = await Promise.all(
                    diagrams.map(async (diagram) => {
                        diagram.tables = await listTables(diagram.id);
                        return diagram;
                    })
                );
            }

            if (options.includeRelationships) {
                diagrams = await Promise.all(
                    diagrams.map(async (diagram) => {
                        diagram.relationships = await listRelationships(
                            diagram.id
                        );
                        return diagram;
                    })
                );
            }

            if (options.includeDependencies) {
                diagrams = await Promise.all(
                    diagrams.map(async (diagram) => {
                        diagram.dependencies = await listDependencies(
                            diagram.id
                        );
                        return diagram;
                    })
                );
            }

            if (options.includeAreas) {
                diagrams = await Promise.all(
                    diagrams.map(async (diagram) => {
                        diagram.areas = await listAreas(diagram.id);
                        return diagram;
                    })
                );
            }

            if (options.includeCustomTypes) {
                diagrams = await Promise.all(
                    diagrams.map(async (diagram) => {
                        diagram.customTypes = await listCustomTypes(diagram.id);
                        return diagram;
                    })
                );
            }

            if (options.includeNotes) {
                diagrams = await Promise.all(
                    diagrams.map(async (diagram) => {
                        diagram.notes = await listNotes(diagram.id);
                        return diagram;
                    })
                );
            }

            return diagrams.map((diagram) => ({
                ...diagram,
                ownerUserId:
                    diagram.ownerUserId ??
                    diagramOwnerRef.current.get(diagram.id) ??
                    activeUserIdRef.current ??
                    undefined,
                accessRole: diagram.accessRole ?? 'owner',
                createdAt: toDate(diagram.createdAt),
                updatedAt: toDate(diagram.updatedAt),
            }));
        },
        [
            db,
            listAreas,
            listCustomTypes,
            listDependencies,
            listRelationships,
            listTables,
            listNotes,
        ]
    );

    const getDiagram: StorageContext['getDiagram'] = useCallback(
        async (
            id,
            options = {
                includeRelationships: false,
                includeTables: false,
                includeDependencies: false,
                includeAreas: false,
                includeCustomTypes: false,
                includeNotes: false,
            }
        ): Promise<Diagram | undefined> => {
            const diagram = await db.diagrams.get(id);

            if (!diagram) {
                return undefined;
            }

            if (options.includeTables) {
                diagram.tables = await listTables(id);
            }

            if (options.includeRelationships) {
                diagram.relationships = await listRelationships(id);
            }

            if (options.includeDependencies) {
                diagram.dependencies = await listDependencies(id);
            }

            if (options.includeAreas) {
                diagram.areas = await listAreas(id);
            }

            if (options.includeCustomTypes) {
                diagram.customTypes = await listCustomTypes(id);
            }

            if (options.includeNotes) {
                diagram.notes = await listNotes(id);
            }

            return {
                ...diagram,
                ownerUserId:
                    diagram.ownerUserId ??
                    diagramOwnerRef.current.get(diagram.id) ??
                    activeUserIdRef.current ??
                    undefined,
                accessRole: diagram.accessRole ?? 'owner',
                createdAt: toDate(diagram.createdAt),
                updatedAt: toDate(diagram.updatedAt),
            };
        },
        [
            db,
            listAreas,
            listCustomTypes,
            listDependencies,
            listRelationships,
            listTables,
            listNotes,
        ]
    );

    const updateDiagram: StorageContext['updateDiagram'] = useCallback(
        async ({ id, attributes }) => {
            await db.diagrams.update(id, attributes);

            const resolvedOwnerUserId =
                attributes.ownerUserId ??
                diagramOwnerRef.current.get(id) ??
                activeUserIdRef.current ??
                undefined;
            if (resolvedOwnerUserId) {
                diagramOwnerRef.current.set(
                    attributes.id ?? id,
                    resolvedOwnerUserId
                );
            }

            if (attributes.id && attributes.id !== id) {
                diagramOwnerRef.current.delete(id);
            }

            if (attributes.id) {
                await Promise.all([
                    db.db_tables
                        .where('diagramId')
                        .equals(id)
                        .modify({ diagramId: attributes.id }),
                    db.db_relationships
                        .where('diagramId')
                        .equals(id)
                        .modify({ diagramId: attributes.id }),
                    db.db_dependencies
                        .where('diagramId')
                        .equals(id)
                        .modify({ diagramId: attributes.id }),
                    db.areas.where('diagramId').equals(id).modify({
                        diagramId: attributes.id,
                    }),
                    db.db_custom_types
                        .where('diagramId')
                        .equals(id)
                        .modify({ diagramId: attributes.id }),
                    db.notes.where('diagramId').equals(id).modify({
                        diagramId: attributes.id,
                    }),
                ]);
            }
        },
        [db]
    );

    const deleteDiagram: StorageContext['deleteDiagram'] = useCallback(
        async (id) => {
            await Promise.all([
                db.diagrams.delete(id),
                db.db_tables.where('diagramId').equals(id).delete(),
                db.db_relationships.where('diagramId').equals(id).delete(),
                db.db_dependencies.where('diagramId').equals(id).delete(),
                db.areas.where('diagramId').equals(id).delete(),
                db.db_custom_types.where('diagramId').equals(id).delete(),
                db.notes.where('diagramId').equals(id).delete(),
            ]);
            diagramOwnerRef.current.delete(id);
        },
        [db]
    );

    const getDiagramIdByTableId = useCallback(
        async (id: string): Promise<string | undefined> => {
            const table = await db.db_tables.get(id);
            return table?.diagramId;
        },
        [db]
    );

    const getDiagramIdByRelationshipId = useCallback(
        async (id: string): Promise<string | undefined> => {
            const relationship = await db.db_relationships.get(id);
            return relationship?.diagramId;
        },
        [db]
    );

    const getDiagramIdByDependencyId = useCallback(
        async (id: string): Promise<string | undefined> => {
            const dependency = await db.db_dependencies.get(id);
            return dependency?.diagramId;
        },
        [db]
    );

    const getDiagramIdByAreaId = useCallback(
        async (id: string): Promise<string | undefined> => {
            const area = await db.areas.get(id);
            return area?.diagramId;
        },
        [db]
    );

    const getDiagramIdByCustomTypeId = useCallback(
        async (id: string): Promise<string | undefined> => {
            const customType = await db.db_custom_types.get(id);
            return customType?.diagramId;
        },
        [db]
    );

    const getDiagramIdByNoteId = useCallback(
        async (id: string): Promise<string | undefined> => {
            const note = await db.notes.get(id);
            return note?.diagramId;
        },
        [db]
    );

    const storageValue: StorageContext = {
        storageInitStatus,
        storageInitError,
        retryStorageInitialization,
        getConfig,
        updateConfig: async (config) => {
            await updateConfig(config);
            markConfigDirty();
        },
        getDiagramFilter,
        updateDiagramFilter: async (diagramId, filter) => {
            await updateDiagramFilter(diagramId, filter);
            await markFilterDirty(diagramId);
        },
        deleteDiagramFilter: async (diagramId) => {
            await deleteDiagramFilter(diagramId);
            await markFilterDirty(diagramId);
        },
        addDiagram: async ({ diagram }) => {
            await addDiagram({ diagram });
            await markDiagramDirty(diagram.id);
        },
        listDiagrams,
        getDiagram,
        updateDiagram: async ({ id, attributes }) => {
            await updateDiagram({ id, attributes });
            if (attributes.id && attributes.id !== id) {
                await markDiagramDeleted(id);
                await markDiagramDirty(attributes.id);
                await markFilterDirty(id);
                await markFilterDirty(attributes.id);
                return;
            }

            await markDiagramDirty(id);
        },
        deleteDiagram: async (id) => {
            await deleteDiagram(id);
            await markDiagramDeleted(id);
        },
        addTable: async ({ diagramId, table }) => {
            await addTable({ diagramId, table });
            await markDiagramDirty(diagramId);
        },
        getTable,
        updateTable: async ({ id, attributes }) => {
            await updateTable({ id, attributes });
            const diagramId = await getDiagramIdByTableId(id);
            if (diagramId) {
                await markDiagramDirty(diagramId);
            }
        },
        putTable: async ({ diagramId, table }) => {
            await putTable({ diagramId, table });
            await markDiagramDirty(diagramId);
        },
        deleteTable: async ({ diagramId, id }) => {
            await deleteTable({ diagramId, id });
            await markDiagramDirty(diagramId);
        },
        listTables,
        deleteDiagramTables: async (diagramId) => {
            await deleteDiagramTables(diagramId);
            await markDiagramDirty(diagramId);
        },
        addRelationship: async ({ diagramId, relationship }) => {
            await addRelationship({ diagramId, relationship });
            await markDiagramDirty(diagramId);
        },
        getRelationship,
        updateRelationship: async ({ id, attributes }) => {
            await updateRelationship({ id, attributes });
            const diagramId = await getDiagramIdByRelationshipId(id);
            if (diagramId) {
                await markDiagramDirty(diagramId);
            }
        },
        deleteRelationship: async ({ diagramId, id }) => {
            await deleteRelationship({ diagramId, id });
            await markDiagramDirty(diagramId);
        },
        listRelationships,
        deleteDiagramRelationships: async (diagramId) => {
            await deleteDiagramRelationships(diagramId);
            await markDiagramDirty(diagramId);
        },
        addDependency: async ({ diagramId, dependency }) => {
            await addDependency({ diagramId, dependency });
            await markDiagramDirty(diagramId);
        },
        getDependency,
        updateDependency: async ({ id, attributes }) => {
            await updateDependency({ id, attributes });
            const diagramId = await getDiagramIdByDependencyId(id);
            if (diagramId) {
                await markDiagramDirty(diagramId);
            }
        },
        deleteDependency: async ({ diagramId, id }) => {
            await deleteDependency({ diagramId, id });
            await markDiagramDirty(diagramId);
        },
        listDependencies,
        deleteDiagramDependencies: async (diagramId) => {
            await deleteDiagramDependencies(diagramId);
            await markDiagramDirty(diagramId);
        },
        addArea: async ({ diagramId, area }) => {
            await addArea({ diagramId, area });
            await markDiagramDirty(diagramId);
        },
        getArea,
        updateArea: async ({ id, attributes }) => {
            await updateArea({ id, attributes });
            const diagramId = await getDiagramIdByAreaId(id);
            if (diagramId) {
                await markDiagramDirty(diagramId);
            }
        },
        deleteArea: async ({ diagramId, id }) => {
            await deleteArea({ diagramId, id });
            await markDiagramDirty(diagramId);
        },
        listAreas,
        deleteDiagramAreas: async (diagramId) => {
            await deleteDiagramAreas(diagramId);
            await markDiagramDirty(diagramId);
        },
        addCustomType: async ({ diagramId, customType }) => {
            await addCustomType({ diagramId, customType });
            await markDiagramDirty(diagramId);
        },
        getCustomType,
        updateCustomType: async ({ id, attributes }) => {
            await updateCustomType({ id, attributes });
            const diagramId = await getDiagramIdByCustomTypeId(id);
            if (diagramId) {
                await markDiagramDirty(diagramId);
            }
        },
        deleteCustomType: async ({ diagramId, id }) => {
            await deleteCustomType({ diagramId, id });
            await markDiagramDirty(diagramId);
        },
        listCustomTypes,
        deleteDiagramCustomTypes: async (diagramId) => {
            await deleteDiagramCustomTypes(diagramId);
            await markDiagramDirty(diagramId);
        },
        addNote: async ({ diagramId, note }) => {
            await addNote({ diagramId, note });
            await markDiagramDirty(diagramId);
        },
        getNote,
        updateNote: async ({ id, attributes }) => {
            await updateNote({ id, attributes });
            const diagramId = await getDiagramIdByNoteId(id);
            if (diagramId) {
                await markDiagramDirty(diagramId);
            }
        },
        deleteNote: async ({ diagramId, id }) => {
            await deleteNote({ diagramId, id });
            await markDiagramDirty(diagramId);
        },
        listNotes,
        deleteDiagramNotes: async (diagramId) => {
            await deleteDiagramNotes(diagramId);
            await markDiagramDirty(diagramId);
        },
    };

    return (
        <storageContext.Provider value={storageValue}>
            {children}
        </storageContext.Provider>
    );
};
