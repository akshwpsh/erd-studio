import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { authContext, type AuthContext } from './auth-context';
import { getSupabaseClient } from '@/lib/supabase/client';

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const supabase = useMemo(() => getSupabaseClient(), []);
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        const bootstrap = async () => {
            if (!supabase) {
                if (mounted) {
                    setLoading(false);
                }
                return;
            }

            const { data } = await supabase.auth.getSession();
            if (!mounted) {
                return;
            }

            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        };

        bootstrap();

        if (!supabase) {
            return () => {
                mounted = false;
            };
        }

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            setLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [supabase]);

    const signInWithPassword: AuthContext['signInWithPassword'] = useCallback(
        async ({ email, password }) => {
            if (!supabase) {
                throw new Error('Supabase is not configured.');
            }

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }
        },
        [supabase]
    );

    const signUpWithPassword: AuthContext['signUpWithPassword'] = useCallback(
        async ({ email, password, nickname }) => {
            if (!supabase) {
                throw new Error('Supabase is not configured.');
            }

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: window.location.href,
                    data: {
                        nickname,
                    },
                },
            });

            if (error) {
                throw error;
            }
        },
        [supabase]
    );

    const signOut: AuthContext['signOut'] = useCallback(async () => {
        if (!supabase) {
            return;
        }

        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
    }, [supabase]);

    const updateProfileMetadata: AuthContext['updateProfileMetadata'] =
        useCallback(
            async ({ nickname, avatarUrl }) => {
                if (!supabase) {
                    throw new Error('Supabase is not configured.');
                }

                if (!user) {
                    throw new Error('User is not authenticated.');
                }

                const currentMetadata =
                    (user.user_metadata as Record<string, unknown>) ?? {};
                const nextMetadata: Record<string, unknown> = {
                    ...currentMetadata,
                    nickname,
                };

                if (avatarUrl !== undefined) {
                    nextMetadata.avatar_url = avatarUrl;
                }

                const { data, error } = await supabase.auth.updateUser({
                    data: nextMetadata,
                });

                if (error) {
                    throw error;
                }

                if (data.user) {
                    setUser(data.user);
                }
            },
            [supabase, user]
        );

    const changePasswordWithCurrentPassword: AuthContext['changePasswordWithCurrentPassword'] =
        useCallback(
            async ({ currentPassword, newPassword }) => {
                if (!supabase) {
                    throw new Error('Supabase is not configured.');
                }

                if (!user?.email) {
                    throw new Error('User email is not available.');
                }

                const { error: reauthError } =
                    await supabase.auth.signInWithPassword({
                        email: user.email,
                        password: currentPassword,
                    });

                if (reauthError) {
                    throw reauthError;
                }

                const { data, error } = await supabase.auth.updateUser({
                    password: newPassword,
                });

                if (error) {
                    throw error;
                }

                if (data.user) {
                    setUser(data.user);
                }
            },
            [supabase, user]
        );

    const uploadAvatar: AuthContext['uploadAvatar'] = useCallback(
        async (file) => {
            if (!supabase) {
                throw new Error('Supabase is not configured.');
            }

            if (!user) {
                throw new Error('User is not authenticated.');
            }

            const extension =
                file.name.split('.').pop()?.toLowerCase() || 'png';
            const path = `${user.id}/avatar.${extension}`;

            const { error: uploadError } = await supabase.storage
                .from('profile-images')
                .upload(path, file, {
                    upsert: true,
                    cacheControl: '3600',
                    contentType: file.type,
                });

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('profile-images')
                .getPublicUrl(path);

            if (!data.publicUrl) {
                throw new Error('Failed to resolve avatar URL.');
            }

            return `${data.publicUrl}?v=${Date.now()}`;
        },
        [supabase, user]
    );

    return (
        <authContext.Provider
            value={{
                user,
                session,
                loading,
                signInWithPassword,
                signUpWithPassword,
                updateProfileMetadata,
                changePasswordWithCurrentPassword,
                uploadAvatar,
                signOut,
            }}
        >
            {children}
        </authContext.Provider>
    );
};
