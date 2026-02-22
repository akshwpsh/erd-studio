import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '@/context/auth-context/auth-provider';
import { useAuth } from '@/hooks/use-auth';

const mockState = vi.hoisted(() => ({
    supabase: null as {
        auth: {
            getSession: ReturnType<typeof vi.fn>;
            onAuthStateChange: ReturnType<typeof vi.fn>;
            signInWithPassword: ReturnType<typeof vi.fn>;
            signUp: ReturnType<typeof vi.fn>;
            signOut: ReturnType<typeof vi.fn>;
            updateUser: ReturnType<typeof vi.fn>;
        };
        storage: {
            from: ReturnType<typeof vi.fn>;
        };
    } | null,
}));

vi.mock('@/lib/supabase/client', () => ({
    getSupabaseClient: () => mockState.supabase,
}));

let authSnapshot: ReturnType<typeof useAuth> | null = null;

const AuthConsumer: React.FC = () => {
    authSnapshot = useAuth();
    return null;
};

describe('AuthProvider profile APIs', () => {
    const subscription = {
        unsubscribe: vi.fn(),
    };
    const baseUser = {
        id: 'user-1',
        email: 'user@example.com',
        created_at: '2026-01-01T00:00:00.000Z',
        user_metadata: {
            nickname: 'Old Nickname',
            theme: 'dark',
        },
    };

    const auth = {
        getSession: vi.fn(),
        onAuthStateChange: vi.fn(),
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        updateUser: vi.fn(),
    };
    const bucket = {
        upload: vi.fn(),
        getPublicUrl: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        authSnapshot = null;

        auth.getSession.mockResolvedValue({
            data: {
                session: {
                    user: baseUser,
                },
            },
        });
        auth.onAuthStateChange.mockReturnValue({
            data: {
                subscription,
            },
        });
        auth.signInWithPassword.mockResolvedValue({
            data: {},
            error: null,
        });
        auth.updateUser.mockImplementation(
            async (params: { data?: Record<string, unknown> }) => {
                if (params?.data) {
                    return {
                        data: {
                            user: {
                                ...baseUser,
                                user_metadata: params.data,
                            },
                        },
                        error: null,
                    };
                }

                return {
                    data: {
                        user: baseUser,
                    },
                    error: null,
                };
            }
        );
        bucket.upload.mockResolvedValue({
            data: {
                path: 'user-1/avatar.png',
            },
            error: null,
        });
        bucket.getPublicUrl.mockReturnValue({
            data: {
                publicUrl: 'https://cdn.example.com/user-1/avatar.png',
            },
        });

        mockState.supabase = {
            auth,
            storage: {
                from: vi.fn().mockReturnValue(bucket),
            },
        };
    });

    const renderProvider = async () => {
        render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(authSnapshot?.loading).toBe(false);
        });
    };

    it('updates profile metadata with nickname and avatar URL', async () => {
        await renderProvider();

        await act(async () => {
            await authSnapshot?.updateProfileMetadata({
                nickname: 'New Nickname',
                avatarUrl: 'https://cdn.example.com/new-avatar.png',
            });
        });

        expect(auth.updateUser).toHaveBeenCalledWith({
            data: {
                nickname: 'New Nickname',
                theme: 'dark',
                avatar_url: 'https://cdn.example.com/new-avatar.png',
            },
        });
    });

    it('reauthenticates with current password before changing password', async () => {
        await renderProvider();

        await act(async () => {
            await authSnapshot?.changePasswordWithCurrentPassword({
                currentPassword: 'old-password',
                newPassword: 'new-password-123',
            });
        });

        expect(auth.signInWithPassword).toHaveBeenCalledWith({
            email: 'user@example.com',
            password: 'old-password',
        });
        expect(auth.updateUser).toHaveBeenCalledWith({
            password: 'new-password-123',
        });
    });

    it('uploads avatar image and returns cache-busted URL', async () => {
        await renderProvider();

        const file = new File(['image-data'], 'avatar.png', {
            type: 'image/png',
        });
        const uploadedUrl = await authSnapshot?.uploadAvatar(file);

        expect(mockState.supabase!.storage.from).toHaveBeenCalledWith(
            'profile-images'
        );
        expect(bucket.upload).toHaveBeenCalledWith(
            'user-1/avatar.png',
            file,
            expect.objectContaining({
                upsert: true,
            })
        );
        expect(uploadedUrl).toMatch(
            /^https:\/\/cdn\.example\.com\/user-1\/avatar\.png\?v=\d+$/
        );
    });
});
