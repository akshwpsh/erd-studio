export const getKnownCollaborationErrorKey = (
    message: string
): string | null => {
    const lowered = message.toLowerCase();

    if (lowered.includes('expired')) {
        return 'expired';
    }

    if (lowered.includes('mismatch')) {
        return 'mismatch';
    }

    if (lowered.includes('revoked')) {
        return 'revoked';
    }

    if (lowered.includes('not pending')) {
        return 'not_pending';
    }

    if (lowered.includes('not found')) {
        return 'not_found';
    }

    if (lowered.includes('invitee email') && lowered.includes('required')) {
        return 'invitee_email_required';
    }

    if (lowered.includes('token') && lowered.includes('required')) {
        return 'token_missing';
    }

    if (lowered.includes('supabase') && lowered.includes('configured')) {
        return 'supabase_not_configured';
    }

    return null;
};
