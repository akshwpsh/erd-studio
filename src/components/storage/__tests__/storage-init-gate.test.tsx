import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorageInitGate } from '@/components/storage/storage-init-gate';
import { useStorage } from '@/hooks/use-storage';

vi.mock('@/hooks/use-storage', () => ({
    useStorage: vi.fn(),
}));

const mockedUseStorage = vi.mocked(useStorage);

describe('StorageInitGate', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state while initializing', () => {
        mockedUseStorage.mockReturnValue({
            storageInitStatus: 'initializing',
            storageInitError: null,
            retryStorageInitialization: vi.fn(),
        } as never);

        render(
            <StorageInitGate>
                <div>Ready Content</div>
            </StorageInitGate>
        );

        expect(screen.queryByText('Ready Content')).not.toBeInTheDocument();
        expect(
            screen.queryByRole('button', { name: 'Retry initialization' })
        ).not.toBeInTheDocument();
    });

    it('renders error state and retries', async () => {
        const retryStorageInitialization = vi.fn().mockResolvedValue(undefined);
        mockedUseStorage.mockReturnValue({
            storageInitStatus: 'error',
            storageInitError: 'boom',
            retryStorageInitialization,
        } as never);

        render(
            <StorageInitGate>
                <div>Ready Content</div>
            </StorageInitGate>
        );

        expect(
            screen.getByText('Cloud storage initialization failed')
        ).toBeInTheDocument();
        expect(screen.getByText('boom')).toBeInTheDocument();

        await userEvent.click(
            screen.getByRole('button', { name: 'Retry initialization' })
        );

        await waitFor(() => {
            expect(retryStorageInitialization).toHaveBeenCalledTimes(1);
        });
    });

    it('renders children when storage is ready', () => {
        mockedUseStorage.mockReturnValue({
            storageInitStatus: 'ready',
            storageInitError: null,
            retryStorageInitialization: vi.fn(),
        } as never);

        render(
            <StorageInitGate>
                <div>Ready Content</div>
            </StorageInitGate>
        );

        expect(screen.getByText('Ready Content')).toBeInTheDocument();
    });
});
