import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type {
    RealtimeChannel,
    RealtimePresenceState,
} from '@supabase/supabase-js';
import {
    collaborationContext,
    type CollaborationContext,
    type DiagramInvitation,
    type DiagramMember,
} from './collaboration-context';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { useStorage } from '@/hooks/use-storage';
import { getCompositeDiagramKey } from '@/lib/supabase/storage-sync-utils';
import type {
    AcceptDiagramInvitationResult,
    DiagramInvitationRow,
    DiagramMembershipRow,
    DiagramPresenceUser,
} from '@/lib/supabase/types';

const STALE_PRESENCE_MS = 10000;

const normalizeEmail = (value: string): string => value.trim().toLowerCase();

const rowToMember = (row: DiagramMembershipRow): DiagramMember => ({
    ownerUserId: row.owner_user_id,
    diagramId: row.diagram_id,
    userId: row.member_user_id,
    role: row.role,
    invitedByUserId: row.invited_by_user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

const rowToInvitation = (row: DiagramInvitationRow): DiagramInvitation => ({
    invitationId: row.invitation_id,
    ownerUserId: row.owner_user_id,
    diagramId: row.diagram_id,
    inviteeEmail: row.invitee_email,
    role: row.role,
    status: row.status,
    inviteToken: row.invite_token,
    invitedByUserId: row.invited_by_user_id,
    acceptedByUserId: row.accepted_by_user_id,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

type PresencePayload = {
    userId: string;
    nickname: string;
    avatarUrl: string | null;
    role: 'owner' | 'editor' | 'viewer';
    cursor: { x: number; y: number } | null;
    updatedAt: number;
};

const isPresencePayload = (value: unknown): value is PresencePayload => {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const candidate = value as PresencePayload;
    return (
        typeof candidate.userId === 'string' &&
        typeof candidate.nickname === 'string' &&
        (candidate.avatarUrl === null ||
            typeof candidate.avatarUrl === 'string') &&
        (candidate.role === 'owner' ||
            candidate.role === 'editor' ||
            candidate.role === 'viewer') &&
        (candidate.cursor === null ||
            (typeof candidate.cursor === 'object' &&
                typeof candidate.cursor.x === 'number' &&
                typeof candidate.cursor.y === 'number')) &&
        typeof candidate.updatedAt === 'number'
    );
};

export const CollaborationProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const supabase = useMemo(() => getSupabaseClient(), []);
    const { user } = useAuth();
    const { getDiagram } = useStorage();

    const channelsRef = useRef<Map<string, RealtimeChannel>>(new Map());
    const presenceMapRef = useRef<
        Map<string, Map<string, DiagramPresenceUser>>
    >(new Map());
    const diagramPresenceKeyRef = useRef<Map<string, string>>(new Map());
    const lastCursorPayloadRef = useRef<Map<string, PresencePayload>>(
        new Map()
    );
    const [, setPresenceVersion] = useState(0);

    const resolveDiagramOwner = useCallback(
        async (diagramId: string) => {
            const diagram = await getDiagram(diagramId);
            if (!diagram) {
                throw new Error('Diagram not found.');
            }

            if (!diagram.ownerUserId) {
                throw new Error(
                    'Diagram owner is unavailable. Reload and try again.'
                );
            }

            return {
                ownerUserId: diagram.ownerUserId,
                accessRole:
                    diagram.accessRole ??
                    (diagram.ownerUserId === user?.id ? 'owner' : 'viewer'),
            } as const;
        },
        [getDiagram, user?.id]
    );

    const notifyPresenceChanged = useCallback(() => {
        setPresenceVersion((prev) => prev + 1);
    }, []);

    const refreshPresenceFromChannel = useCallback(
        (presenceKey: string, channel: RealtimeChannel) => {
            const rawState = channel.presenceState() as RealtimePresenceState;
            const nextMap = new Map<string, DiagramPresenceUser>();

            Object.values(rawState).forEach((entries) => {
                entries.forEach((entry) => {
                    if (!isPresencePayload(entry)) {
                        return;
                    }

                    nextMap.set(entry.userId, {
                        userId: entry.userId,
                        nickname: entry.nickname,
                        avatarUrl: entry.avatarUrl,
                        role: entry.role,
                        cursor: entry.cursor,
                        updatedAt: entry.updatedAt,
                    });
                });
            });

            presenceMapRef.current.set(presenceKey, nextMap);
            notifyPresenceChanged();
        },
        [notifyPresenceChanged]
    );

    const closePresenceChannels = useCallback(() => {
        if (!supabase) {
            channelsRef.current.clear();
            presenceMapRef.current.clear();
            diagramPresenceKeyRef.current.clear();
            lastCursorPayloadRef.current.clear();
            notifyPresenceChanged();
            return;
        }

        channelsRef.current.forEach((channel) => {
            void supabase.removeChannel(channel);
        });

        channelsRef.current.clear();
        presenceMapRef.current.clear();
        diagramPresenceKeyRef.current.clear();
        lastCursorPayloadRef.current.clear();
        notifyPresenceChanged();
    }, [notifyPresenceChanged, supabase]);

    useEffect(() => {
        if (!user?.id) {
            closePresenceChannels();
        }
    }, [closePresenceChannels, user?.id]);

    useEffect(() => {
        const interval = window.setInterval(() => {
            let hasChanges = false;
            const now = Date.now();

            presenceMapRef.current.forEach((presence, key) => {
                const filtered = new Map<string, DiagramPresenceUser>();
                presence.forEach((participant, participantId) => {
                    if (now - participant.updatedAt <= STALE_PRESENCE_MS) {
                        filtered.set(participantId, participant);
                    }
                });

                if (filtered.size !== presence.size) {
                    hasChanges = true;
                    presenceMapRef.current.set(key, filtered);
                }
            });

            if (hasChanges) {
                notifyPresenceChanged();
            }
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [notifyPresenceChanged]);

    const ensurePresenceChannel = useCallback(
        async (
            diagramId: string
        ): Promise<{ presenceKey: string; channel: RealtimeChannel }> => {
            if (!supabase) {
                throw new Error('Supabase is not configured.');
            }

            if (!user) {
                throw new Error('You must be signed in to collaborate.');
            }

            const { ownerUserId, accessRole } =
                await resolveDiagramOwner(diagramId);
            const presenceKey = getCompositeDiagramKey(ownerUserId, diagramId);
            diagramPresenceKeyRef.current.set(diagramId, presenceKey);

            const existing = channelsRef.current.get(presenceKey);
            if (existing) {
                return { presenceKey, channel: existing };
            }

            const channelName = `chartdb-collab-presence:${presenceKey}`;
            const channel = supabase.channel(channelName, {
                config: {
                    presence: {
                        key: user.id,
                    },
                },
            });

            channel
                .on('presence', { event: 'sync' }, () => {
                    refreshPresenceFromChannel(presenceKey, channel);
                })
                .on('presence', { event: 'join' }, () => {
                    refreshPresenceFromChannel(presenceKey, channel);
                })
                .on('presence', { event: 'leave' }, () => {
                    refreshPresenceFromChannel(presenceKey, channel);
                })
                .subscribe(async (status) => {
                    if (status !== 'SUBSCRIBED') {
                        return;
                    }

                    const metadata =
                        (user.user_metadata as Record<
                            string,
                            unknown
                        > | null) ?? {};
                    const payload: PresencePayload = {
                        userId: user.id,
                        nickname:
                            typeof metadata.nickname === 'string'
                                ? metadata.nickname
                                : (user.email ?? 'User'),
                        avatarUrl:
                            typeof metadata.avatar_url === 'string'
                                ? metadata.avatar_url
                                : null,
                        role: accessRole,
                        cursor: null,
                        updatedAt: Date.now(),
                    };

                    lastCursorPayloadRef.current.set(presenceKey, payload);
                    await channel.track(payload);
                });

            channelsRef.current.set(presenceKey, channel);
            return { presenceKey, channel };
        },
        [refreshPresenceFromChannel, resolveDiagramOwner, supabase, user]
    );

    const getCurrentAccessRole: CollaborationContext['getCurrentAccessRole'] =
        useCallback(
            async (diagramId) => {
                const diagram = await getDiagram(diagramId);
                return diagram?.accessRole;
            },
            [getDiagram]
        );

    const listMembers: CollaborationContext['listMembers'] = useCallback(
        async (diagramId) => {
            if (!supabase) {
                throw new Error('Supabase is not configured.');
            }

            const { ownerUserId } = await resolveDiagramOwner(diagramId);
            const { data, error } = await supabase
                .from('diagram_memberships')
                .select('*')
                .eq('owner_user_id', ownerUserId)
                .eq('diagram_id', diagramId)
                .order('created_at', { ascending: true });

            if (error) {
                throw error;
            }

            return (data as DiagramMembershipRow[]).map(rowToMember);
        },
        [resolveDiagramOwner, supabase]
    );

    const listInvitations: CollaborationContext['listInvitations'] =
        useCallback(
            async (diagramId) => {
                if (!supabase) {
                    throw new Error('Supabase is not configured.');
                }

                const { ownerUserId } = await resolveDiagramOwner(diagramId);
                const { data, error } = await supabase
                    .from('diagram_invitations')
                    .select('*')
                    .eq('owner_user_id', ownerUserId)
                    .eq('diagram_id', diagramId)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                return (data as DiagramInvitationRow[]).map(rowToInvitation);
            },
            [resolveDiagramOwner, supabase]
        );

    const invite: CollaborationContext['invite'] = useCallback(
        async ({ diagramId, email, role }) => {
            if (!supabase) {
                throw new Error('Supabase is not configured.');
            }

            const { ownerUserId } = await resolveDiagramOwner(diagramId);
            const normalizedEmail = normalizeEmail(email);
            if (!normalizedEmail) {
                throw new Error('Invitee email is required.');
            }

            const { data, error } = await supabase.rpc(
                'create_diagram_invitation',
                {
                    p_owner_user_id: ownerUserId,
                    p_diagram_id: diagramId,
                    p_invitee_email: normalizedEmail,
                    p_role: role,
                }
            );

            if (error) {
                throw error;
            }

            return rowToInvitation(data as DiagramInvitationRow);
        },
        [resolveDiagramOwner, supabase]
    );

    const changeMemberRole: CollaborationContext['changeMemberRole'] =
        useCallback(
            async ({ diagramId, memberUserId, role }) => {
                if (!supabase) {
                    throw new Error('Supabase is not configured.');
                }

                const { ownerUserId } = await resolveDiagramOwner(diagramId);
                const { error } = await supabase
                    .from('diagram_memberships')
                    .update({ role })
                    .eq('owner_user_id', ownerUserId)
                    .eq('diagram_id', diagramId)
                    .eq('member_user_id', memberUserId);

                if (error) {
                    throw error;
                }
            },
            [resolveDiagramOwner, supabase]
        );

    const removeMember: CollaborationContext['removeMember'] = useCallback(
        async ({ diagramId, memberUserId }) => {
            if (!supabase) {
                throw new Error('Supabase is not configured.');
            }

            const { ownerUserId } = await resolveDiagramOwner(diagramId);
            const { error } = await supabase
                .from('diagram_memberships')
                .delete()
                .eq('owner_user_id', ownerUserId)
                .eq('diagram_id', diagramId)
                .eq('member_user_id', memberUserId);

            if (error) {
                throw error;
            }
        },
        [resolveDiagramOwner, supabase]
    );

    const revokeInvitation: CollaborationContext['revokeInvitation'] =
        useCallback(
            async (invitationId) => {
                if (!supabase) {
                    throw new Error('Supabase is not configured.');
                }

                const { error } = await supabase
                    .from('diagram_invitations')
                    .update({ status: 'revoked' })
                    .eq('invitation_id', invitationId);

                if (error) {
                    throw error;
                }
            },
            [supabase]
        );

    const acceptInvitation: CollaborationContext['acceptInvitation'] =
        useCallback(
            async (inviteToken) => {
                if (!supabase) {
                    throw new Error('Supabase is not configured.');
                }

                const token = inviteToken.trim();
                if (!token) {
                    throw new Error('Invitation token is required.');
                }

                const { data, error } = await supabase.rpc(
                    'accept_diagram_invitation',
                    {
                        p_invite_token: token,
                    }
                );

                if (error) {
                    throw error;
                }

                const first = (data as AcceptDiagramInvitationResult[])[0];
                if (!first) {
                    throw new Error(
                        'Invitation was accepted but no diagram was returned.'
                    );
                }

                return first;
            },
            [supabase]
        );

    const listPresence: CollaborationContext['listPresence'] = useCallback(
        (diagramId) => {
            const presenceKey = diagramPresenceKeyRef.current.get(diagramId);
            if (!presenceKey) {
                void ensurePresenceChannel(diagramId).catch(() => undefined);
                return [];
            }

            const participants = presenceMapRef.current.get(presenceKey);
            if (!participants) {
                return [];
            }

            const now = Date.now();
            return Array.from(participants.values()).filter(
                (participant) =>
                    now - participant.updatedAt <= STALE_PRESENCE_MS
            );
        },
        [ensurePresenceChannel]
    );

    const updateCursor: CollaborationContext['updateCursor'] = useCallback(
        async (diagramId, flowX, flowY) => {
            const { presenceKey, channel } =
                await ensurePresenceChannel(diagramId);
            if (!user) {
                return;
            }

            const previousPayload =
                lastCursorPayloadRef.current.get(presenceKey);
            if (!previousPayload) {
                return;
            }

            const nextPayload: PresencePayload = {
                ...previousPayload,
                cursor: {
                    x: flowX,
                    y: flowY,
                },
                updatedAt: Date.now(),
            };

            lastCursorPayloadRef.current.set(presenceKey, nextPayload);
            await channel.track(nextPayload);
        },
        [ensurePresenceChannel, user]
    );

    useEffect(() => {
        return () => {
            closePresenceChannels();
        };
    }, [closePresenceChannels]);

    const value: CollaborationContext = {
        getCurrentAccessRole,
        listMembers,
        listInvitations,
        invite,
        changeMemberRole,
        removeMember,
        revokeInvitation,
        acceptInvitation,
        listPresence,
        updateCursor,
    };

    return (
        <collaborationContext.Provider value={value}>
            {children}
        </collaborationContext.Provider>
    );
};
