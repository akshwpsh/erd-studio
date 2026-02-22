import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_PUBLISHABLE_DEFAULT_KEY, SUPABASE_URL } from '@/lib/env';

let supabaseClient: SupabaseClient | null = null;

export const isSupabaseConfigured =
    SUPABASE_URL.trim().length > 0 &&
    SUPABASE_PUBLISHABLE_DEFAULT_KEY.trim().length > 0;

export const getSupabaseClient = (): SupabaseClient | null => {
    if (!isSupabaseConfigured) {
        return null;
    }

    if (!supabaseClient) {
        supabaseClient = createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_DEFAULT_KEY,
            {
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: true,
                },
            }
        );
    }

    return supabaseClient;
};
