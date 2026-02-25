import { describe, expect, it } from 'vitest';
import {
    getCollaborationErrorMessage,
    getKnownCollaborationErrorKey,
} from '../collaboration-error-utils';

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

describe('getCollaborationErrorMessage', () => {
    it('returns Error.message when provided an Error instance', () => {
        expect(
            getCollaborationErrorMessage(
                new Error('Could not find function'),
                'fallback'
            )
        ).toBe('Could not find function');
    });

    it('extracts message from PostgREST-like error objects', () => {
        expect(
            getCollaborationErrorMessage(
                {
                    message:
                        'Could not find function public.create_diagram_invitation',
                },
                'fallback'
            )
        ).toBe('Could not find function public.create_diagram_invitation');
    });

    it('extracts nested message from error objects', () => {
        expect(
            getCollaborationErrorMessage(
                { error: { message: 'Invitation not found' } },
                'fallback'
            )
        ).toBe('Invitation not found');
    });

    it('returns fallback when no message is available', () => {
        expect(getCollaborationErrorMessage({}, 'fallback')).toBe('fallback');
        expect(getCollaborationErrorMessage(null, 'fallback')).toBe('fallback');
    });
});
