import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProfileDialog } from '@/dialogs/profile-dialog/profile-dialog';

const mockState = vi.hoisted(() => ({
    closeProfileDialog: vi.fn(),
    signOut: vi.fn(),
    uploadAvatar: vi.fn(),
    updateProfileMetadata: vi.fn(),
    changePasswordWithCurrentPassword: vi.fn(),
    toast: vi.fn(),
}));

vi.mock('@/hooks/use-dialog', () => ({
    useDialog: () => ({
        closeProfileDialog: mockState.closeProfileDialog,
    }),
}));

vi.mock('@/hooks/use-auth', () => ({
    useAuth: () => ({
        user: {
            id: 'user-1',
            email: 'user@example.com',
            created_at: '2026-01-01T00:00:00.000Z',
            user_metadata: {
                nickname: 'Tester',
                avatar_url: 'https://cdn.example.com/avatar.png',
            },
        },
        signOut: mockState.signOut,
        uploadAvatar: mockState.uploadAvatar,
        updateProfileMetadata: mockState.updateProfileMetadata,
        changePasswordWithCurrentPassword:
            mockState.changePasswordWithCurrentPassword,
    }),
}));

vi.mock('@/components/toast/use-toast', () => ({
    toast: mockState.toast,
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string, options?: Record<string, string>) =>
            (
                ({
                    'profile_dialog.title': 'Profile',
                    'profile_dialog.description':
                        'View and update your account settings.',
                    'profile_dialog.fields.email': 'Email',
                    'profile_dialog.fields.nickname': 'Nickname',
                    'profile_dialog.fields.joined': 'Joined',
                    'profile_dialog.fields.profile_image': 'Profile image',
                    'profile_dialog.fields.current_password':
                        'Current password',
                    'profile_dialog.fields.new_password': 'New password',
                    'profile_dialog.fields.confirm_new_password':
                        'Confirm new password',
                    'profile_dialog.actions.logout': 'Log out',
                    'profile_dialog.actions.logging_out': 'Signing out...',
                    'profile_dialog.actions.cancel': 'Cancel',
                    'profile_dialog.actions.save_changes': 'Save changes',
                    'profile_dialog.actions.saving': 'Saving...',
                    'profile_dialog.errors.password_confirmation_mismatch':
                        'New password confirmation does not match.',
                    'profile_dialog.toasts.avatar_upload_failed.title':
                        'Avatar upload failed',
                    'profile_dialog.toasts.profile_updated.title':
                        'Profile updated',
                    'profile_dialog.toasts.password_update_failed.description_with_error': `Profile changes were saved. ${options?.error ?? ''}`,
                    'profile_dialog.toasts.password_update_failed.description_without_error':
                        'Profile changes were saved, but password update failed.',
                }) as Record<string, string>
            )[key] ?? key,
    }),
}));

describe('ProfileDialog', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockState.signOut.mockResolvedValue(undefined);
        mockState.uploadAvatar.mockResolvedValue(
            'https://cdn.example.com/new-avatar.png'
        );
        mockState.updateProfileMetadata.mockResolvedValue(undefined);
        mockState.changePasswordWithCurrentPassword.mockResolvedValue(
            undefined
        );
    });

    it('renders account status information', () => {
        render(<ProfileDialog dialog={{ open: true }} />);

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getAllByText('user@example.com').length).toBeGreaterThan(
            0
        );
        expect(screen.getAllByText('Tester').length).toBeGreaterThan(0);
        expect(screen.getByText('Joined')).toBeInTheDocument();
    });

    it('shows validation error when password confirmation does not match', async () => {
        render(<ProfileDialog dialog={{ open: true }} />);

        fireEvent.change(screen.getByLabelText('Current password'), {
            target: { value: 'old-password' },
        });
        fireEvent.change(screen.getByLabelText('New password'), {
            target: { value: 'new-password' },
        });
        fireEvent.change(screen.getByLabelText('Confirm new password'), {
            target: { value: 'not-matching' },
        });

        fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

        expect(
            await screen.findByText('New password confirmation does not match.')
        ).toBeInTheDocument();
        expect(mockState.updateProfileMetadata).not.toHaveBeenCalled();
    });

    it('continues nickname save when avatar upload fails', async () => {
        mockState.uploadAvatar.mockRejectedValue(new Error('Upload failed'));

        render(<ProfileDialog dialog={{ open: true }} />);

        fireEvent.change(screen.getByLabelText('Nickname'), {
            target: { value: 'Updated Nick' },
        });
        fireEvent.change(screen.getByLabelText('Profile image'), {
            target: {
                files: [
                    new File(['avatar'], 'avatar.png', { type: 'image/png' }),
                ],
            },
        });

        fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

        await waitFor(() => {
            expect(mockState.updateProfileMetadata).toHaveBeenCalledWith({
                nickname: 'Updated Nick',
                avatarUrl: undefined,
            });
        });
        expect(mockState.toast).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Avatar upload failed',
            })
        );
        expect(mockState.toast).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Profile updated',
            })
        );
    });

    it('logs out user from profile dialog', async () => {
        render(<ProfileDialog dialog={{ open: true }} />);

        fireEvent.click(screen.getByRole('button', { name: 'Log out' }));

        await waitFor(() => {
            expect(mockState.signOut).toHaveBeenCalledTimes(1);
        });
        expect(mockState.closeProfileDialog).toHaveBeenCalledTimes(1);
    });
});
