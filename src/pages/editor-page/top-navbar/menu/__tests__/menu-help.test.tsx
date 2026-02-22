import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Menu } from '@/pages/editor-page/top-navbar/menu/menu';
import { DatabaseType } from '@/lib/domain/database-type';

const mockOpenCreateDiagramDialog = vi.fn();
const mockOpenOpenDiagramDialog = vi.fn();
const mockOpenExportSQLDialog = vi.fn();
const mockOpenImportDatabaseDialog = vi.fn();
const mockOpenExportImageDialog = vi.fn();
const mockOpenExportDiagramDialog = vi.fn();
const mockOpenImportDiagramDialog = vi.fn();

vi.mock('@/hooks/use-chartdb', () => ({
    useChartDB: () => ({
        clearDiagramData: vi.fn(),
        deleteDiagram: vi.fn(),
        updateDiagramUpdatedAt: vi.fn(),
        databaseType: DatabaseType.GENERIC,
    }),
}));

vi.mock('@/hooks/use-dialog', () => ({
    useDialog: () => ({
        openCreateDiagramDialog: mockOpenCreateDiagramDialog,
        openOpenDiagramDialog: mockOpenOpenDiagramDialog,
        openExportSQLDialog: mockOpenExportSQLDialog,
        openImportDatabaseDialog: mockOpenImportDatabaseDialog,
        openExportImageDialog: mockOpenExportImageDialog,
        openExportDiagramDialog: mockOpenExportDiagramDialog,
        openImportDiagramDialog: mockOpenImportDiagramDialog,
    }),
}));

vi.mock('@/hooks/use-export-image', () => ({
    useExportImage: () => ({
        exportImage: vi.fn(),
    }),
}));

vi.mock('@/context/alert-context/alert-context', () => ({
    useAlert: () => ({
        showAlert: vi.fn(),
    }),
}));

vi.mock('@/hooks/use-theme', () => ({
    useTheme: () => ({
        setTheme: vi.fn(),
        theme: 'dark',
    }),
}));

vi.mock('@/hooks/use-layout', () => ({
    useLayout: () => ({
        hideSidePanel: vi.fn(),
        isSidePanelShowed: true,
        showSidePanel: vi.fn(),
    }),
}));

vi.mock('@/hooks/use-local-config', () => ({
    useLocalConfig: () => ({
        scrollAction: 'zoom',
        setScrollAction: vi.fn(),
        setShowCardinality: vi.fn(),
        showCardinality: true,
        setShowFieldAttributes: vi.fn(),
        showFieldAttributes: true,
        setShowMiniMapOnCanvas: vi.fn(),
        showMiniMapOnCanvas: true,
        showDBViews: true,
        setShowDBViews: vi.fn(),
    }),
}));

vi.mock('@/hooks/use-history', () => ({
    useHistory: () => ({
        redo: vi.fn(),
        undo: vi.fn(),
        hasRedo: false,
        hasUndo: false,
    }),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) =>
            (
                ({
                    'menu.actions.actions': 'Actions',
                    'menu.edit.edit': 'Edit',
                    'menu.view.view': 'View',
                    'menu.backup.backup': 'Backup',
                    'menu.help.help': 'Help',
                    'menu.help.docs_website': 'Docs',
                    'menu.help.join_discord': 'Join us on Discord',
                }) as Record<string, string>
            )[key] ?? key,
    }),
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');

    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe('Menu help section', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows docs item and removes discord item', async () => {
        render(<Menu />);

        fireEvent.pointerDown(screen.getByText('Help'));

        expect(await screen.findByText('Docs')).toBeInTheDocument();
        expect(
            screen.queryByText('Join us on Discord')
        ).not.toBeInTheDocument();
    });
});
