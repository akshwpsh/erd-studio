import React, { useMemo, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import { Spinner } from '@/components/spinner/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert/alert';
import { useTranslation } from 'react-i18next';

type AuthMode = 'signin' | 'signup';

export const AuthGate: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { user, loading, signInWithPassword, signUpWithPassword } = useAuth();
    const { t } = useTranslation();
    const [mode, setMode] = useState<AuthMode>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [submitting, setSubmitting] = useState(false);

    const normalizedEmail = useMemo(() => email.trim(), [email]);
    const normalizedNickname = useMemo(() => nickname.trim(), [nickname]);

    const resetMessages = () => {
        setSuccessMessage(undefined);
        setErrorMessage(undefined);
    };

    const switchMode = (nextMode: AuthMode) => {
        setMode(nextMode);
        resetMessages();
    };

    const onSignIn = async () => {
        if (!normalizedEmail || !password) {
            setErrorMessage(
                t('auth_gate.validation.email_and_password_required')
            );
            return;
        }

        setSubmitting(true);
        resetMessages();

        try {
            await signInWithPassword({
                email: normalizedEmail,
                password,
            });
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage(t('auth_gate.validation.sign_in_failed'));
            }
        } finally {
            setSubmitting(false);
        }
    };

    const onSignUp = async () => {
        if (!normalizedNickname) {
            setErrorMessage(t('auth_gate.validation.nickname_required'));
            return;
        }

        if (!normalizedEmail) {
            setErrorMessage(t('auth_gate.validation.email_required'));
            return;
        }

        if (!password) {
            setErrorMessage(t('auth_gate.validation.password_required'));
            return;
        }

        if (password.length < 6) {
            setErrorMessage(t('auth_gate.validation.password_min_length'));
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage(
                t('auth_gate.validation.password_confirmation_mismatch')
            );
            return;
        }

        setSubmitting(true);
        resetMessages();

        try {
            await signUpWithPassword({
                email: normalizedEmail,
                password,
                nickname: normalizedNickname,
            });
            setSuccessMessage(t('auth_gate.success.account_created'));
            setConfirmPassword('');
            setPassword('');
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage(
                    t('auth_gate.validation.create_account_failed')
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <section className="flex h-dvh w-screen items-center justify-center bg-background">
                <Spinner size="large" />
            </section>
        );
    }

    if (user) {
        return <>{children}</>;
    }

    return (
        <section className="flex min-h-dvh w-screen items-center justify-center bg-background px-4">
            <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
                <h1 className="text-xl font-semibold">
                    {t('auth_gate.title')}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {t('auth_gate.subtitle')}
                </p>

                {!isSupabaseConfigured ? (
                    <Alert variant="destructive">
                        <AlertTitle>
                            {t(
                                'auth_gate.alerts.supabase_not_configured_title'
                            )}
                        </AlertTitle>
                        <AlertDescription>
                            {t(
                                'auth_gate.alerts.supabase_not_configured_description'
                            )}
                        </AlertDescription>
                    </Alert>
                ) : null}

                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant={mode === 'signin' ? 'default' : 'secondary'}
                        onClick={() => switchMode('signin')}
                        disabled={submitting}
                    >
                        {t('auth_gate.tabs.sign_in')}
                    </Button>
                    <Button
                        variant={mode === 'signup' ? 'default' : 'secondary'}
                        onClick={() => switchMode('signup')}
                        disabled={submitting}
                    >
                        {t('auth_gate.tabs.sign_up')}
                    </Button>
                </div>

                {mode === 'signup' ? (
                    <>
                        <Input
                            type="text"
                            placeholder={t('auth_gate.placeholders.nickname')}
                            value={nickname}
                            onChange={(event) =>
                                setNickname(event.target.value)
                            }
                            disabled={!isSupabaseConfigured || submitting}
                        />
                        <Input
                            type="email"
                            placeholder={t('auth_gate.placeholders.email')}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            disabled={!isSupabaseConfigured || submitting}
                        />
                        <Input
                            type="password"
                            placeholder={t('auth_gate.placeholders.password')}
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            disabled={!isSupabaseConfigured || submitting}
                        />
                        <Input
                            type="password"
                            placeholder={t(
                                'auth_gate.placeholders.confirm_password'
                            )}
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            disabled={!isSupabaseConfigured || submitting}
                        />
                        <Button
                            onClick={onSignUp}
                            disabled={
                                !isSupabaseConfigured ||
                                submitting ||
                                normalizedEmail.length === 0 ||
                                normalizedNickname.length === 0 ||
                                password.length === 0 ||
                                confirmPassword.length === 0
                            }
                        >
                            {submitting
                                ? t('auth_gate.actions.creating_account')
                                : t('auth_gate.actions.create_account')}
                        </Button>
                    </>
                ) : (
                    <>
                        <Input
                            type="email"
                            placeholder={t('auth_gate.placeholders.email')}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            disabled={!isSupabaseConfigured || submitting}
                        />
                        <Input
                            type="password"
                            placeholder={t('auth_gate.placeholders.password')}
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            disabled={!isSupabaseConfigured || submitting}
                        />
                        <Button
                            onClick={onSignIn}
                            disabled={
                                !isSupabaseConfigured ||
                                submitting ||
                                normalizedEmail.length === 0 ||
                                password.length === 0
                            }
                        >
                            {submitting
                                ? t('auth_gate.actions.signing_in')
                                : t('auth_gate.actions.sign_in')}
                        </Button>
                    </>
                )}

                {successMessage ? (
                    <Alert>
                        <AlertTitle>
                            {t('auth_gate.alerts.success_title')}
                        </AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                ) : null}

                {errorMessage ? (
                    <Alert variant="destructive">
                        <AlertTitle>
                            {t('auth_gate.alerts.authentication_failed_title')}
                        </AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                ) : null}
            </div>
        </section>
    );
};
