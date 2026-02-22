import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CanvasProvider } from '@/context/canvas-context/canvas-provider';
import { useCanvas } from '@/hooks/use-canvas';
import type { DBTable } from '@/lib/domain/db-table';
import type { DBRelationship } from '@/lib/domain/db-relationship';
import type { DBDependency } from '@/lib/domain/db-dependency';
import { createGraph } from '@/lib/graph';

const {
    mockAdjustTablePositions,
    mockUpdateTablesState,
    mockFitView,
    mockSetNodes,
    mockFindOverlappingTables,
} = vi.hoisted(() => ({
    mockAdjustTablePositions: vi.fn(),
    mockUpdateTablesState: vi.fn(),
    mockFitView: vi.fn(),
    mockSetNodes: vi.fn(),
    mockFindOverlappingTables: vi.fn(),
}));

const tables: DBTable[] = [
    {
        id: 't1',
        name: 't1',
        x: 0,
        y: 0,
        fields: [],
        indexes: [],
        color: '#8eb7ff',
        isView: false,
        createdAt: 1,
    },
    {
        id: 't2',
        name: 't2',
        x: 500,
        y: 0,
        fields: [],
        indexes: [],
        color: '#8eb7ff',
        isView: false,
        createdAt: 1,
    },
];

const relationships: DBRelationship[] = [
    {
        id: 'r1',
        name: 'r1',
        sourceTableId: 't1',
        targetTableId: 't2',
        sourceFieldId: 'f1',
        targetFieldId: 'f2',
        sourceCardinality: 'one',
        targetCardinality: 'many',
        createdAt: 1,
    },
];

const dependencies: DBDependency[] = [
    {
        id: 'd1',
        tableId: 't1',
        dependentTableId: 't2',
        createdAt: 1,
    },
];

vi.mock('@/hooks/use-chartdb', () => ({
    useChartDB: () => ({
        tables,
        relationships,
        dependencies,
        updateTablesState: mockUpdateTablesState,
        databaseType: 'postgresql',
        areas: [],
        diagramId: 'diagram-1',
    }),
}));

vi.mock('@/lib/domain/db-table', async () => {
    const actual = await vi.importActual('@/lib/domain/db-table');
    return {
        ...actual,
        adjustTablePositions: mockAdjustTablePositions,
    };
});

vi.mock('@xyflow/react', () => ({
    useReactFlow: () => ({
        fitView: mockFitView,
        screenToFlowPosition: ({ x, y }: { x: number; y: number }) => ({
            x,
            y,
        }),
        setNodes: mockSetNodes,
    }),
}));

vi.mock('@/pages/editor-page/canvas/canvas-utils', () => ({
    findOverlappingTables: mockFindOverlappingTables,
}));

vi.mock('@/context/diagram-filter-context/use-diagram-filter', () => ({
    useDiagramFilter: () => ({
        filter: undefined,
        loading: false,
        hasActiveFilter: false,
    }),
}));

vi.mock('@/lib/domain/diagram-filter/filter', () => ({
    filterTable: () => true,
}));

vi.mock('@/hooks/use-local-config', () => ({
    useLocalConfig: () => ({
        showDBViews: true,
    }),
}));

const TriggerReorder: React.FC = () => {
    const { reorderTables } = useCanvas();

    useEffect(() => {
        reorderTables();
    }, [reorderTables]);

    return null;
};

describe('CanvasProvider reorderTables', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockFindOverlappingTables.mockReturnValue(createGraph());
        mockAdjustTablePositions.mockReturnValue([
            { ...tables[0], x: 100, y: 200 },
            { ...tables[1], x: 400, y: 200 },
        ]);
    });

    it('passes dependencies to adjustTablePositions', async () => {
        render(
            <CanvasProvider>
                <TriggerReorder />
            </CanvasProvider>
        );

        await waitFor(() => {
            expect(mockAdjustTablePositions).toHaveBeenCalled();
        });

        expect(mockAdjustTablePositions).toHaveBeenCalledWith(
            expect.objectContaining({
                relationships,
                dependencies,
            })
        );
        expect(mockUpdateTablesState).toHaveBeenCalled();
    });
});
