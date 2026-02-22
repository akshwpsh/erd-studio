import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OpenDiagramDialog } from '@/dialogs/open-diagram-dialog/open-diagram-dialog';
import { DatabaseType } from '@/lib/domain/database-type';
import type { Diagram } from '@/lib/domain/diagram';

const mockListDiagrams = vi.fn();
const mockCloseOpenDiagramDialog = vi.fn();
const mockOpenCreateDiagramDialog = vi.fn();
const mockUpdateConfig = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('@/hooks/use-storage', () => ({
    useStorage: () => ({
        listDiagrams: mockListDiagrams,
    }),
}));

vi.mock('@/hooks/use-dialog', () => ({
    useDialog: () => ({
        closeOpenDiagramDialog: mockCloseOpenDiagramDialog,
        openCreateDiagramDialog: mockOpenCreateDiagramDialog,
    }),
}));

vi.mock('@/hooks/use-config', () => ({
    useConfig: () => ({
        updateConfig: mockUpdateConfig,
    }),
}));

vi.mock(
    '@/dialogs/open-diagram-dialog/diagram-row-actions-menu/diagram-row-actions-menu',
    () => ({
        DiagramRowActionsMenu: () => null,
    })
);

vi.mock('@/components/diagram-icon/diagram-icon', () => ({
    DiagramIcon: () => null,
}));

const createDiagram = (id: string): Diagram => ({
    id,
    name: `Diagram ${id}`,
    databaseType: DatabaseType.GENERIC,
    createdAt: new Date(),
    updatedAt: new Date(),
    tables: [],
});

describe('OpenDiagramDialog', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('auto-switches to create dialog when force-opened and list is empty', async () => {
        mockListDiagrams.mockResolvedValue([]);

        render(<OpenDiagramDialog dialog={{ open: true }} canClose={false} />);

        await waitFor(() => {
            expect(mockCloseOpenDiagramDialog).toHaveBeenCalledTimes(1);
            expect(mockOpenCreateDiagramDialog).toHaveBeenCalledTimes(1);
        });
    });

    it('keeps open dialog when force-opened and diagrams exist', async () => {
        mockListDiagrams.mockResolvedValue([createDiagram('d-1')]);

        render(<OpenDiagramDialog dialog={{ open: true }} canClose={false} />);

        await waitFor(() => {
            expect(mockListDiagrams).toHaveBeenCalledTimes(1);
        });

        expect(mockCloseOpenDiagramDialog).not.toHaveBeenCalled();
        expect(mockOpenCreateDiagramDialog).not.toHaveBeenCalled();
    });

    it('does not auto-switch when dialog is user-closable', async () => {
        mockListDiagrams.mockResolvedValue([]);

        render(<OpenDiagramDialog dialog={{ open: true }} canClose />);

        await waitFor(() => {
            expect(mockListDiagrams).toHaveBeenCalledTimes(1);
        });

        expect(mockCloseOpenDiagramDialog).not.toHaveBeenCalled();
        expect(mockOpenCreateDiagramDialog).not.toHaveBeenCalled();
    });

    it('opens selected diagram when open button is clicked', async () => {
        mockListDiagrams.mockResolvedValue([createDiagram('d-1')]);

        render(<OpenDiagramDialog dialog={{ open: true }} canClose />);

        await waitFor(() => {
            expect(screen.getByText('Diagram d-1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Diagram d-1'));
        fireEvent.click(
            screen.getByRole('button', { name: 'open_diagram_dialog.open' })
        );

        expect(mockUpdateConfig).toHaveBeenCalledWith({
            config: { defaultDiagramId: 'd-1' },
        });
        expect(mockNavigate).toHaveBeenCalledWith('/diagrams/d-1');
        expect(mockCloseOpenDiagramDialog).toHaveBeenCalled();
    });
});
