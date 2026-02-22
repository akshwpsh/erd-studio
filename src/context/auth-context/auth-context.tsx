import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { emptyFn } from '@/lib/utils';

export interface AuthContext {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signInWithPassword: (params: {
        email: string;
        password: string;
    }) => Promise<void>;
    signUpWithPassword: (params: {
        email: string;
        password: string;
        nickname: string;
    }) => Promise<void>;
    updateProfileMetadata: (params: {
        nickname: string;
        avatarUrl?: string | null;
    }) => Promise<void>;
    changePasswordWithCurrentPassword: (params: {
        currentPassword: string;
        newPassword: string;
    }) => Promise<void>;
    uploadAvatar: (file: File) => Promise<string>;
    signOut: () => Promise<void>;
}

export const authInitialValue: AuthContext = {
    user: null,
    session: null,
    loading: true,
    signInWithPassword: emptyFn,
    signUpWithPassword: emptyFn,
    updateProfileMetadata: emptyFn,
    changePasswordWithCurrentPassword: emptyFn,
    uploadAvatar: emptyFn,
    signOut: emptyFn,
};

export const authContext = createContext<AuthContext>(authInitialValue);
