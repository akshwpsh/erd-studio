import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/button/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogInternalContent,
    DialogTitle,
} from '@/components/dialog/dialog';
import { Input } from '@/components/input/input';
import { Badge } from '@/components/badge/badge';
import { Label } from '@/components/label/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/select/select';
import { Separator } from '@/components/separator/separator';
import { toast } from '@/components/toast/use-toast';
import { useChartDB } from '@/hooks/use-chartdb';
import { useCollaboration } from '@/hooks/use-collaboration';
import { useAuth } from '@/hooks/use-auth';
import { useDialog } from '@/hooks/use-dialog';
import { useTranslation } from 'react-i18next';
import type {
    CollaborationRole,
    DiagramInvitationStatus,
} from '@/lib/supabase/types';
import { getKnownCollaborationErrorKey } from '@/lib/supabase/collaboration-error-utils';
import type { BaseDialogProps } from '../common/base-dialog-props';

export interface ShareDiagramDialogProps extends BaseDialogProps {}

const dateLabel = (
    value: string | null | undefined,
    language: string
): string => {
    if (!value) {
        return '-';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '-';
    }

    return date.toLocaleString(language);
};

export const ShareDiagramDialog: React.FC<ShareDiagramDialogProps> = ({
    dialog,
}) => {
    const { currentDiagram } = useChartDB();
    const { user } = useAuth();
    const {
        listMembers,
        listInvitations,
        invite,
        changeMemberRole,
        removeMember,
        revokeInvitation,
    } = useCollaboration();
    const { closeShareDiagramDialog } = useDialog();
    const { t, i18n } = useTranslation();

    const [inviteeEmail, setInviteeEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<CollaborationRole>('editor');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [members, setMembers] = useState<
        Awaited<ReturnType<typeof listMembers>>
    >([]);
    const [invitations, setInvitations] = useState<
        Awaited<ReturnType<typeof listInvitations>>
    >([]);

    const diagramId = currentDiagram.id;
    const accessRole =
        currentDiagram.accessRole ??
        (currentDiagram.ownerUserId === user?.id ? 'owner' : 'viewer');
    const isOwner = accessRole === 'owner';
    const diagramOwnerUserId = currentDiagram.ownerUserId ?? user?.id ?? '';

    const acceptedInvitationByUserId = useMemo(() => {
        const map = new Map<string, string>();
        invitations.forEach((invitation) => {
            if (invitation.acceptedByUserId) {
                map.set(invitation.acceptedByUserId, invitation.inviteeEmail);
            }
        });
        return map;
    }, [invitations]);

    const pendingInvitations = useMemo(
        () =>
            invitations.filter((invitation) => invitation.status === 'pending'),
        [invitations]
    );

    const roleLabel = useCallback(
        (role: 'owner' | CollaborationRole) => t(`share_dialog.roles.${role}`),
        [t]
    );

    const invitationStatusLabel = useCallback(
        (status: DiagramInvitationStatus) => t(`share_dialog.status.${status}`),
        [t]
    );

    const resolveErrorMessage = useCallback(
        (error: unknown): string => {
            if (error instanceof Error) {
                const knownErrorKey = getKnownCollaborationErrorKey(
                    error.message
                );
                if (knownErrorKey) {
                    return t(`collaboration_errors.${knownErrorKey}`);
                }
                return error.message;
            }

            return t('share_dialog.errors.unknown_error');
        },
        [t]
    );

    const refresh = useCallback(async () => {
        if (!diagramId) {
            setMembers([]);
            setInvitations([]);
            return;
        }

        setLoading(true);
        try {
            const [nextMembers, nextInvitations] = await Promise.all([
                listMembers(diagramId),
                listInvitations(diagramId),
            ]);
            setMembers(nextMembers);
            setInvitations(nextInvitations);
        } finally {
            setLoading(false);
        }
    }, [diagramId, listInvitations, listMembers]);

    useEffect(() => {
        if (!dialog.open) {
            return;
        }

        void refresh();
    }, [dialog.open, refresh]);

    const onInvite = useCallback(async () => {
        if (!diagramId || !isOwner) {
            return;
        }

        const email = inviteeEmail.trim();
        if (!email) {
            toast({
                variant: 'destructive',
                title: t('share_dialog.toasts.invite_failed.title'),
                description: t('share_dialog.errors.email_required'),
            });
            return;
        }

        setSubmitting(true);
        try {
            await invite({
                diagramId,
                email,
                role: inviteRole,
            });
            setInviteeEmail('');
            await refresh();
            toast({
                title: t('share_dialog.toasts.invite_created.title'),
                description: t(
                    'share_dialog.toasts.invite_created.description',
                    {
                        email,
                        role: roleLabel(inviteRole),
                    }
                ),
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: t('share_dialog.toasts.invite_failed.title'),
                description: resolveErrorMessage(error),
            });
        } finally {
            setSubmitting(false);
        }
    }, [
        diagramId,
        invite,
        inviteRole,
        inviteeEmail,
        isOwner,
        refresh,
        roleLabel,
        resolveErrorMessage,
        t,
    ]);

    const onChangeRole = useCallback(
        async (memberUserId: string, role: CollaborationRole) => {
            if (!diagramId || !isOwner) {
                return;
            }

            setSubmitting(true);
            try {
                await changeMemberRole({
                    diagramId,
                    memberUserId,
                    role,
                });
                await refresh();
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: t('share_dialog.toasts.role_update_failed.title'),
                    description: resolveErrorMessage(error),
                });
            } finally {
                setSubmitting(false);
            }
        },
        [changeMemberRole, diagramId, isOwner, refresh, resolveErrorMessage, t]
    );

    const onRemoveMember = useCallback(
        async (memberUserId: string) => {
            if (!diagramId || !isOwner) {
                return;
            }

            setSubmitting(true);
            try {
                await removeMember({
                    diagramId,
                    memberUserId,
                });
                await refresh();
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: t('share_dialog.toasts.remove_failed.title'),
                    description: resolveErrorMessage(error),
                });
            } finally {
                setSubmitting(false);
            }
        },
        [diagramId, isOwner, refresh, removeMember, resolveErrorMessage, t]
    );

    const onRevokeInvitation = useCallback(
        async (invitationId: string) => {
            if (!isOwner) {
                return;
            }

            setSubmitting(true);
            try {
                await revokeInvitation(invitationId);
                await refresh();
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: t('share_dialog.toasts.revoke_failed.title'),
                    description: resolveErrorMessage(error),
                });
            } finally {
                setSubmitting(false);
            }
        },
        [isOwner, refresh, resolveErrorMessage, revokeInvitation, t]
    );

    const onCopyInviteLink = useCallback(
        (inviteToken: string) => {
            const inviteUrl = `${window.location.origin}/invites/${inviteToken}`;
            void navigator.clipboard
                .writeText(inviteUrl)
                .then(() => {
                    toast({
                        title: t('share_dialog.toasts.copy_success.title'),
                        description: t(
                            'share_dialog.toasts.copy_success.description',
                            {
                                url: inviteUrl,
                            }
                        ),
                    });
                })
                .catch(() => {
                    toast({
                        variant: 'destructive',
                        title: t('share_dialog.toasts.copy_failed.title'),
                        description: t(
                            'share_dialog.toasts.copy_failed.description'
                        ),
                    });
                });
        },
        [t]
    );

    return (
        <Dialog
            {...dialog}
            onOpenChange={(open) => {
                if (!open) {
                    closeShareDiagramDialog();
                }
            }}
        >
            <DialogContent className="max-h-[80vh] overflow-y-auto md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{t('share_dialog.title')}</DialogTitle>
                    <DialogDescription>
                        {t('share_dialog.description')}
                    </DialogDescription>
                </DialogHeader>
                <DialogInternalContent>
                    {!diagramId ? (
                        <div className="rounded border p-3 text-sm text-muted-foreground">
                            {t('share_dialog.errors.no_diagram_selected')}
                        </div>
                    ) : null}

                    {diagramId ? (
                        <div className="space-y-4">
                            <div className="rounded border p-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">
                                        {t('share_dialog.labels.your_access')}
                                    </span>
                                    <Badge variant="secondary">
                                        {roleLabel(accessRole)}
                                    </Badge>
                                </div>
                                {!isOwner ? (
                                    <p className="mt-2 text-muted-foreground">
                                        {t('share_dialog.access.readonly_hint')}
                                    </p>
                                ) : null}
                            </div>

                            <div className="space-y-2 rounded border p-3">
                                <Label>
                                    {t('share_dialog.invite.section_title')}
                                </Label>
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <Input
                                        type="email"
                                        placeholder={t(
                                            'share_dialog.invite.email_placeholder'
                                        )}
                                        value={inviteeEmail}
                                        onChange={(event) =>
                                            setInviteeEmail(event.target.value)
                                        }
                                        disabled={!isOwner || submitting}
                                    />
                                    <Select
                                        value={inviteRole}
                                        onValueChange={(value) =>
                                            setInviteRole(
                                                value as CollaborationRole
                                            )
                                        }
                                        disabled={!isOwner || submitting}
                                    >
                                        <SelectTrigger className="md:w-[160px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="editor">
                                                {roleLabel('editor')}
                                            </SelectItem>
                                            <SelectItem value="viewer">
                                                {roleLabel('viewer')}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        onClick={onInvite}
                                        disabled={
                                            !isOwner ||
                                            submitting ||
                                            inviteeEmail.trim().length === 0
                                        }
                                    >
                                        {t('share_dialog.actions.invite')}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2 rounded border p-3">
                                <Label>
                                    {t('share_dialog.members.section_title')}
                                </Label>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between rounded border px-3 py-2 text-sm">
                                        <div className="min-w-0">
                                            <p className="truncate font-medium">
                                                {user?.email ??
                                                    diagramOwnerUserId}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {diagramOwnerUserId}
                                            </p>
                                        </div>
                                        <Badge>{roleLabel('owner')}</Badge>
                                    </div>

                                    {members.map((member) => (
                                        <div
                                            key={member.userId}
                                            className="flex flex-wrap items-center gap-2 rounded border px-3 py-2 text-sm"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">
                                                    {acceptedInvitationByUserId.get(
                                                        member.userId
                                                    ) ?? member.userId}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {member.userId}
                                                </p>
                                            </div>
                                            <Select
                                                value={member.role}
                                                onValueChange={(value) =>
                                                    void onChangeRole(
                                                        member.userId,
                                                        value as CollaborationRole
                                                    )
                                                }
                                                disabled={
                                                    !isOwner || submitting
                                                }
                                            >
                                                <SelectTrigger className="w-[130px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="editor">
                                                        {roleLabel('editor')}
                                                    </SelectItem>
                                                    <SelectItem value="viewer">
                                                        {roleLabel('viewer')}
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    void onRemoveMember(
                                                        member.userId
                                                    )
                                                }
                                                disabled={
                                                    !isOwner || submitting
                                                }
                                            >
                                                {t(
                                                    'share_dialog.actions.remove'
                                                )}
                                            </Button>
                                        </div>
                                    ))}

                                    {!loading && members.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            {t('share_dialog.members.empty')}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="space-y-2 rounded border p-3">
                                <Label>
                                    {t(
                                        'share_dialog.invitations.section_title'
                                    )}
                                </Label>
                                <div className="space-y-2">
                                    {pendingInvitations.map((invitation) => (
                                        <div
                                            key={invitation.invitationId}
                                            className="flex flex-wrap items-center gap-2 rounded border px-3 py-2 text-sm"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">
                                                    {invitation.inviteeEmail}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {roleLabel(invitation.role)}{' '}
                                                    |{' '}
                                                    {t(
                                                        'share_dialog.labels.expires'
                                                    )}{' '}
                                                    {dateLabel(
                                                        invitation.expiresAt,
                                                        i18n.language
                                                    )}
                                                </p>
                                            </div>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    onCopyInviteLink(
                                                        invitation.inviteToken
                                                    )
                                                }
                                            >
                                                {t(
                                                    'share_dialog.actions.copy_link'
                                                )}
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    void onRevokeInvitation(
                                                        invitation.invitationId
                                                    )
                                                }
                                                disabled={
                                                    !isOwner || submitting
                                                }
                                            >
                                                {t(
                                                    'share_dialog.actions.revoke'
                                                )}
                                            </Button>
                                        </div>
                                    ))}

                                    {!loading &&
                                    pendingInvitations.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            {t(
                                                'share_dialog.invitations.empty'
                                            )}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label>
                                    {t('share_dialog.history.section_title')}
                                </Label>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    {invitations.map((invitation) => (
                                        <p key={invitation.invitationId}>
                                            {invitation.inviteeEmail} |{' '}
                                            {roleLabel(invitation.role)} |{' '}
                                            {invitationStatusLabel(
                                                invitation.status
                                            )}{' '}
                                            | {t('share_dialog.labels.updated')}{' '}
                                            {dateLabel(
                                                invitation.updatedAt,
                                                i18n.language
                                            )}
                                        </p>
                                    ))}
                                    {!loading && invitations.length === 0 ? (
                                        <p>{t('share_dialog.history.empty')}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </DialogInternalContent>
                <DialogFooter className="gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => void refresh()}
                        disabled={!diagramId || loading || submitting}
                    >
                        {t('share_dialog.actions.refresh')}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            {t('share_dialog.actions.close')}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
