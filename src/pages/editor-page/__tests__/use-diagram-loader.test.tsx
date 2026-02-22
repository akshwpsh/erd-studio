import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDiagramLoader } from '@/pages/editor-page/use-diagram-loader';
import type { Diagram } from '@/lib/domain/diagram';
import { DatabaseType } from '@/lib/domain/database-type';
import type { StorageInitStatus } from '@/context/storage-context/storage-context';

let mockDiagramId: string | undefined;
const mockLoadDiagram = vi.fn();
const mockListDiagrams = vi.fn();
const mockOpenCreateDiagramDialog = vi.fn();
const mockOpenOpenDiagramDialog = vi.fn();
const mockShowLoader = vi.fn();
const mockHideLoader = vi.fn();
const mockResetRedoStack = vi.fn();
const mockResetUndoStack = vi.fn();
let mockCurrentDiagram: { id?: string } | undefined;
let mockStorageInitStatus: StorageInitStatus = 'idle';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');

    return {
        ...actual,
        useParams: () => ({ diagramId: mockDiagramId }),
    };
});

vi.mock('@/hooks/use-chartdb', () => ({
    useChartDB: () => ({
        loadDiagram: mockLoadDiagram,
        currentDiagram: mockCurrentDiagram,
    }),
}));

vi.mock('@/hooks/use-dialog', () => ({
    useDialog: () => ({
        openCreateDiagramDialog: mockOpenCreateDiagramDialog,
        openOpenDiagramDialog: mockOpenOpenDiagramDialog,
    }),
}));

vi.mock('@/hooks/use-full-screen-spinner', () => ({
    useFullScreenLoader: () => ({
        showLoader: mockShowLoader,
        hideLoader: mockHideLoader,
    }),
}));

vi.mock('@/hooks/use-redo-undo-stack', () => ({
    useRedoUndoStack: () => ({
        resetRedoStack: mockResetRedoStack,
        resetUndoStack: mockResetUndoStack,
    }),
}));

vi.mock('@/hooks/use-storage', () => ({
    useStorage: () => ({
        storageInitStatus: mockStorageInitStatus,
        listDiagrams: mockListDiagrams,
    }),
}));

const HookConsumer: React.FC = () => {
    useDiagramLoader();
    return null;
};

const createDiagram = (id: string): Diagram => ({
    id,
    name: `Diagram ${id}`,
    databaseType: DatabaseType.GENERIC,
    createdAt: new Date(),
    updatedAt: new Date(),
});

describe('useDiagramLoader', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockDiagramId = undefined;
        mockCurrentDiagram = { id: '' };
        mockStorageInitStatus = 'ready';
        mockLoadDiagram.mockResolvedValue(undefined);
        mockListDiagrams.mockResolvedValue([]);
    });

    it('does not load before storage initialization is ready', async () => {
        mockStorageInitStatus = 'initializing';

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockListDiagrams).not.toHaveBeenCalled();
            expect(mockOpenCreateDiagramDialog).not.toHaveBeenCalled();
            expect(mockOpenOpenDiagramDialog).not.toHaveBeenCalled();
        });
    });

    it('opens browse dialog when diagrams already exist', async () => {
        mockListDiagrams.mockResolvedValue([createDiagram('d-1')]);

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockOpenOpenDiagramDialog).toHaveBeenCalledWith({
                canClose: false,
            });
        });
        expect(mockOpenCreateDiagramDialog).not.toHaveBeenCalled();
    });

    it('does not attempt diagram-id loading on root route', async () => {
        mockListDiagrams.mockResolvedValue([createDiagram('existing-1')]);

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockOpenOpenDiagramDialog).toHaveBeenCalledWith({
                canClose: false,
            });
        });
        expect(mockLoadDiagram).not.toHaveBeenCalled();
    });

    it('opens create dialog when no diagrams exist', async () => {
        mockListDiagrams.mockResolvedValue([]);

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockOpenCreateDiagramDialog).toHaveBeenCalledTimes(1);
        });
        expect(mockOpenOpenDiagramDialog).not.toHaveBeenCalled();
    });

    it('treats empty-string route param as root and opens create dialog', async () => {
        mockDiagramId = '';
        mockListDiagrams.mockResolvedValue([]);

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockOpenCreateDiagramDialog).toHaveBeenCalledTimes(1);
        });
        expect(mockOpenOpenDiagramDialog).not.toHaveBeenCalled();
        expect(mockLoadDiagram).not.toHaveBeenCalled();
    });

    it('opens create dialog once in React.StrictMode on root route', async () => {
        mockDiagramId = undefined;
        mockListDiagrams.mockResolvedValue([]);

        render(
            <React.StrictMode>
                <HookConsumer />
            </React.StrictMode>
        );

        await waitFor(() => {
            expect(mockOpenCreateDiagramDialog).toHaveBeenCalledTimes(1);
        });
    });

    it('loads diagram directly when URL diagramId is valid', async () => {
        mockDiagramId = 'diagram-1';
        mockLoadDiagram.mockResolvedValue(createDiagram('diagram-1'));

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockLoadDiagram).toHaveBeenCalledWith('diagram-1');
        });
        expect(mockOpenCreateDiagramDialog).not.toHaveBeenCalled();
        expect(mockOpenOpenDiagramDialog).not.toHaveBeenCalled();
    });

    it('falls back to create dialog for invalid URL diagramId when there are no diagrams', async () => {
        mockDiagramId = 'missing-id';
        mockLoadDiagram.mockResolvedValue(undefined);
        mockListDiagrams.mockResolvedValue([]);

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockOpenCreateDiagramDialog).toHaveBeenCalledTimes(1);
        });
        expect(mockOpenOpenDiagramDialog).not.toHaveBeenCalled();
    });

    it('falls back to open dialog for invalid URL diagramId when diagrams exist', async () => {
        mockDiagramId = 'missing-id';
        mockLoadDiagram.mockResolvedValue(undefined);
        mockListDiagrams.mockResolvedValue([createDiagram('existing-1')]);

        render(<HookConsumer />);

        await waitFor(() => {
            expect(mockOpenOpenDiagramDialog).toHaveBeenCalledWith({
                canClose: false,
            });
        });
        expect(mockOpenCreateDiagramDialog).not.toHaveBeenCalled();
    });
});
