const isRecord = (value: unknown): value is Record<string, unknown> =>
    !!value && typeof value === 'object';

const getStringField = (
    value: Record<string, unknown>,
    key: string
): string | null => {
    const candidate = value[key];
    if (typeof candidate !== 'string') {
        return null;
    }

    const normalized = candidate.trim();
    return normalized.length > 0 ? normalized : null;
};

export const getCollaborationErrorMessage = (
    error: unknown,
    fallbackMessage: string
): string => {
    if (error instanceof Error && error.message.trim().length > 0) {
        return error.message;
    }

    if (!isRecord(error)) {
        return fallbackMessage;
    }

    const directMessage = getStringField(error, 'message');
    if (directMessage) {
        return directMessage;
    }

    const nestedError = error.error;
    if (typeof nestedError === 'string' && nestedError.trim().length > 0) {
        return nestedError;
    }

    if (isRecord(nestedError)) {
        const nestedMessage = getStringField(nestedError, 'message');
        if (nestedMessage) {
            return nestedMessage;
        }
    }

    return fallbackMessage;
};

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
