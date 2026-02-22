import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SidebarProvider } from '@/components/sidebar/sidebar';
import { EditorSidebar } from '@/pages/editor-page/editor-sidebar/editor-sidebar';

const mockOpenProfileDialog = vi.fn();

vi.mock('@/hooks/use-layout', () => ({
    useLayout: () => ({
        selectSidebarSection: vi.fn(),
        selectedSidebarSection: 'tables',
        showSidePanel: vi.fn(),
        selectVisualsTab: vi.fn(),
    }),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) =>
            (
                ({
                    'profile_dialog.title': 'Profile',
                }) as Record<string, string>
            )[key] ?? key,
    }),
}));

vi.mock('@/hooks/use-breakpoint', () => ({
    useBreakpoint: () => ({
        isMd: true,
    }),
}));

vi.mock('@/hooks/use-theme', () => ({
    useTheme: () => ({
        effectiveTheme: 'dark',
    }),
}));

vi.mock('@/hooks/use-chartdb', () => ({
    useChartDB: () => ({
        databaseType: 'generic',
    }),
}));

vi.mock('@/hooks/use-dialog', () => ({
    useDialog: () => ({
        openCreateDiagramDialog: vi.fn(),
        openOpenDiagramDialog: vi.fn(),
        openProfileDialog: mockOpenProfileDialog,
    }),
}));

describe('EditorSidebar footer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('removes social/docs links and opens profile dialog from footer button', () => {
        render(
            <SidebarProvider>
                <EditorSidebar />
            </SidebarProvider>
        );

        expect(screen.queryByText('Discord')).not.toBeInTheDocument();
        expect(screen.queryByText('Twitter')).not.toBeInTheDocument();
        expect(screen.queryByText('Docs')).not.toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Profile/i }));
        expect(mockOpenProfileDialog).toHaveBeenCalledTimes(1);
    });
});
