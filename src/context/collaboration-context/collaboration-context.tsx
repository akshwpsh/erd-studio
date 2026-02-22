import { createContext } from 'react';
import type {
    AcceptDiagramInvitationResult,
    CollaborationRole,
    DiagramAccessRole,
    DiagramPresenceUser,
} from '@/lib/supabase/types';
import { emptyFn } from '@/lib/utils';

export interface DiagramMember {
    ownerUserId: string;
    diagramId: string;
    userId: string;
    role: CollaborationRole;
    invitedByUserId: string;
    createdAt: string;
    updatedAt: string;
}

export interface DiagramInvitation {
    invitationId: string;
    ownerUserId: string;
    diagramId: string;
    inviteeEmail: string;
    role: CollaborationRole;
    status: 'pending' | 'accepted' | 'revoked' | 'expired';
    inviteToken: string;
    invitedByUserId: string;
    acceptedByUserId: string | null;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface CollaborationContext {
    getCurrentAccessRole: (
        diagramId: string
    ) => Promise<DiagramAccessRole | undefined>;
    listMembers: (diagramId: string) => Promise<DiagramMember[]>;
    listInvitations: (diagramId: string) => Promise<DiagramInvitation[]>;
    invite: (params: {
        diagramId: string;
        email: string;
        role: CollaborationRole;
    }) => Promise<DiagramInvitation>;
    changeMemberRole: (params: {
        diagramId: string;
        memberUserId: string;
        role: CollaborationRole;
    }) => Promise<void>;
    removeMember: (params: {
        diagramId: string;
        memberUserId: string;
    }) => Promise<void>;
    revokeInvitation: (invitationId: string) => Promise<void>;
    acceptInvitation: (
        inviteToken: string
    ) => Promise<AcceptDiagramInvitationResult>;
    listPresence: (diagramId: string) => DiagramPresenceUser[];
    updateCursor: (
        diagramId: string,
        flowX: number,
        flowY: number
    ) => Promise<void>;
}

export const collaborationInitialValue: CollaborationContext = {
    getCurrentAccessRole: emptyFn,
    listMembers: emptyFn,
    listInvitations: emptyFn,
    invite: emptyFn,
    changeMemberRole: emptyFn,
    removeMember: emptyFn,
    revokeInvitation: emptyFn,
    acceptInvitation: emptyFn,
    listPresence: () => [],
    updateCursor: emptyFn,
};

export const collaborationContext = createContext<CollaborationContext>(
    collaborationInitialValue
);
