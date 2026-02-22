import { describe, expect, it } from 'vitest';
import { DatabaseType } from '@/lib/domain/database-type';
import {
    configToRow,
    deserializeSet,
    diagramToSnapshotRow,
    filterToRow,
    getRetryBackoffMs,
    rowToConfig,
    rowToFilter,
    serializeSet,
    shouldIgnoreSelfEvent,
    snapshotRowToDiagram,
} from '@/lib/supabase/storage-sync-utils';

describe('storage-sync-utils', () => {
    it('converts diagram to snapshot row and back with Date fields', () => {
        const createdAt = new Date('2025-01-01T00:00:00.000Z');
        const updatedAt = new Date('2025-01-02T00:00:00.000Z');

        const row = diagramToSnapshotRow({
            userId: 'user-1',
            clientInstanceId: 'client-1',
            diagram: {
                id: 'diagram-1',
                name: 'Test',
                databaseType: DatabaseType.POSTGRESQL,
                createdAt,
                updatedAt,
                tables: [],
                relationships: [],
                dependencies: [],
                areas: [],
                customTypes: [],
                notes: [],
            },
        });

        expect(row.user_id).toBe('user-1');
        expect(row.diagram_id).toBe('diagram-1');
        expect(row.created_at).toBe(createdAt.toISOString());
        expect(row.updated_at).toBe(updatedAt.toISOString());

        const diagram = snapshotRowToDiagram({
            ...row,
            table_count: 0,
        });

        expect(diagram.id).toBe('diagram-1');
        expect(diagram.createdAt).toBeInstanceOf(Date);
        expect(diagram.updatedAt).toBeInstanceOf(Date);
        expect(diagram.createdAt.toISOString()).toBe(createdAt.toISOString());
        expect(diagram.updatedAt.toISOString()).toBe(updatedAt.toISOString());
    });

    it('serializes and deserializes sync queue sets safely', () => {
        const serialized = serializeSet(new Set(['a', 'b']));
        const deserialized = deserializeSet(serialized);

        expect(Array.from(deserialized).sort()).toEqual(['a', 'b']);
        expect(Array.from(deserializeSet('invalid-json'))).toEqual([]);
    });

    it('maps retry backoff with upper cap', () => {
        expect(getRetryBackoffMs(1)).toBe(2000);
        expect(getRetryBackoffMs(2)).toBe(5000);
        expect(getRetryBackoffMs(3)).toBe(15000);
        expect(getRetryBackoffMs(4)).toBe(30000);
        expect(getRetryBackoffMs(100)).toBe(30000);
    });

    it('ignores only self realtime events', () => {
        expect(shouldIgnoreSelfEvent('client-a', 'client-a')).toBe(true);
        expect(shouldIgnoreSelfEvent('client-b', 'client-a')).toBe(false);
        expect(shouldIgnoreSelfEvent(null, 'client-a')).toBe(false);
    });

    it('converts config and filter rows', () => {
        const configRow = configToRow({
            userId: 'user-1',
            clientInstanceId: 'client-1',
            config: {
                defaultDiagramId: 'diagram-1',
                exportActions: [new Date('2025-01-03T00:00:00.000Z')],
            },
        });

        const config = rowToConfig({
            ...configRow,
            updated_at: new Date('2025-01-03T00:00:00.000Z').toISOString(),
        });

        expect(config.defaultDiagramId).toBe('diagram-1');
        expect(config.exportActions?.[0]).toBeInstanceOf(Date);

        const filterRow = filterToRow({
            userId: 'user-1',
            clientInstanceId: 'client-1',
            diagramId: 'diagram-1',
            filter: {
                schemaIds: ['public'],
                tableIds: ['table-1'],
            },
        });

        const filter = rowToFilter({
            ...filterRow,
            updated_at: new Date().toISOString(),
        });

        expect(filter.schemaIds).toEqual(['public']);
        expect(filter.tableIds).toEqual(['table-1']);
    });
});
