import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockCreateCrossingAwareLayout = vi.hoisted(() => vi.fn());

vi.mock('@/lib/layout/crossing-aware-layout', async () => {
    const actual = await vi.importActual('@/lib/layout/crossing-aware-layout');

    return {
        ...actual,
        createCrossingAwareLayout: mockCreateCrossingAwareLayout,
    };
});

import { adjustTablePositions, type DBTable } from '@/lib/domain/db-table';
import type { DBRelationship } from '@/lib/domain/db-relationship';

const makeTable = (id: string, x: number, y: number): DBTable => ({
    id,
    name: id,
    x,
    y,
    fields: [],
    indexes: [],
    color: '#8eb7ff',
    isView: false,
    createdAt: 1,
});

const makeRelationship = (
    id: string,
    sourceTableId: string,
    targetTableId: string
): DBRelationship => ({
    id,
    name: id,
    sourceTableId,
    targetTableId,
    sourceFieldId: `${sourceTableId}_id`,
    targetFieldId: `${targetTableId}_id`,
    sourceCardinality: 'one',
    targetCardinality: 'many',
    createdAt: 1,
});

describe('adjustTablePositions legacy fallback', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockCreateCrossingAwareLayout.mockImplementation(() => {
            throw new Error('layout failed');
        });
    });

    it('falls back to legacy layout when crossing-aware layout throws', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const tables = [
            makeTable('a', 0, 0),
            makeTable('b', 500, 0),
            makeTable('c', 1000, 0),
        ];
        const relationships = [
            makeRelationship('r1', 'a', 'b'),
            makeRelationship('r2', 'b', 'c'),
        ];

        const positioned = adjustTablePositions({
            tables,
            relationships,
            mode: 'all',
        });

        expect(positioned).toHaveLength(3);
        positioned.forEach((table) => {
            expect(Number.isFinite(table.x)).toBe(true);
            expect(Number.isFinite(table.y)).toBe(true);
        });
        expect(warnSpy).toHaveBeenCalled();

        warnSpy.mockRestore();
    });
});
