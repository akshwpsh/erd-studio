import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from '@/context/auth-context/auth-provider';
import { AuthGate } from '@/components/auth/auth-gate';
import { ThemeProvider } from '@/context/theme-context/theme-provider';
import { Spinner } from '@/components/spinner/spinner';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/card/card';
import { Button } from '@/components/button/button';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { AcceptDiagramInvitationResult } from '@/lib/supabase/types';
import { useTranslation } from 'react-i18next';
import {
    getCollaborationErrorMessage,
    getKnownCollaborationErrorKey,
} from '@/lib/supabase/collaboration-error-utils';

type AcceptStatus = 'idle' | 'loading' | 'error';

const InviteAcceptPageContent: React.FC = () => {
    const supabase = useMemo(() => getSupabaseClient(), []);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { inviteToken } = useParams<{ inviteToken: string }>();
    const [status, setStatus] = useState<AcceptStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [acceptedDiagramId, setAcceptedDiagramId] = useState<string | null>(
        null
    );

    const acceptInvitation = useCallback(async () => {
        if (!inviteToken) {
            setStatus('error');
            setErrorMessage(t('invite_accept_page.errors.token_missing'));
            return;
        }

        if (!supabase) {
            setStatus('error');
            setErrorMessage(
                t('invite_accept_page.errors.supabase_not_configured')
            );
            return;
        }

        setStatus('loading');
        setErrorMessage(null);

        try {
            const { data, error } = await supabase.rpc(
                'accept_diagram_invitation',
                {
                    p_invite_token: inviteToken,
                }
            );

            if (error) {
                throw error;
            }

            const accepted = (data as AcceptDiagramInvitationResult[])?.[0];
            if (!accepted?.diagram_id) {
                throw new Error(
                    t('invite_accept_page.errors.no_diagram_returned')
                );
            }

            setAcceptedDiagramId(accepted.diagram_id);
            navigate(`/diagrams/${accepted.diagram_id}`, { replace: true });
        } catch (error) {
            setStatus('error');
            const rawMessage = getCollaborationErrorMessage(
                error,
                t('invite_accept_page.errors.accept_failed')
            );
            const mappedKey = getKnownCollaborationErrorKey(rawMessage);
            setErrorMessage(
                mappedKey
                    ? t(`invite_accept_page.errors.${mappedKey}`)
                    : rawMessage
            );
        }
    }, [inviteToken, navigate, supabase, t]);

    useEffect(() => {
        void acceptInvitation();
    }, [acceptInvitation]);

    if (status === 'loading' || status === 'idle') {
        return (
            <section className="flex min-h-dvh items-center justify-center bg-background px-4">
                <div className="flex flex-col items-center gap-3">
                    <Spinner size="large" />
                    <p className="text-sm text-muted-foreground">
                        {t('invite_accept_page.loading')}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="flex min-h-dvh items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{t('invite_accept_page.error_title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {errorMessage ??
                            t('invite_accept_page.errors.unknown_error')}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => void acceptInvitation()}
                        >
                            {t('invite_accept_page.actions.retry')}
                        </Button>
                        <Button
                            type="button"
                            onClick={() =>
                                navigate(
                                    acceptedDiagramId
                                        ? `/diagrams/${acceptedDiagramId}`
                                        : '/'
                                )
                            }
                        >
                            {t('invite_accept_page.actions.go_to_app')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export const InviteAcceptPage: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AuthGate>
                    <InviteAcceptPageContent />
                </AuthGate>
            </AuthProvider>
        </ThemeProvider>
    );
};
