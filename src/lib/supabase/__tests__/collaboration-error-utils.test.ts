import { describe, expect, it } from 'vitest';
import { getKnownCollaborationErrorKey } from '../collaboration-error-utils';

describe('getKnownCollaborationErrorKey', () => {
    it('maps known collaboration errors', () => {
        expect(getKnownCollaborationErrorKey('Invitation expired')).toBe(
            'expired'
        );
        expect(getKnownCollaborationErrorKey('Invitation email mismatch')).toBe(
            'mismatch'
        );
        expect(
            getKnownCollaborationErrorKey('Invitation has been revoked')
        ).toBe('revoked');
        expect(getKnownCollaborationErrorKey('Invitation is not pending')).toBe(
            'not_pending'
        );
        expect(getKnownCollaborationErrorKey('Invitation not found')).toBe(
            'not_found'
        );
        expect(getKnownCollaborationErrorKey('Invitee email is required')).toBe(
            'invitee_email_required'
        );
        expect(
            getKnownCollaborationErrorKey('Invitation token is required')
        ).toBe('token_missing');
        expect(
            getKnownCollaborationErrorKey('Supabase is not configured')
        ).toBe('supabase_not_configured');
    });

    it('returns null for unknown errors', () => {
        expect(
            getKnownCollaborationErrorKey('Unexpected upstream timeout')
        ).toBeNull();
    });
});
