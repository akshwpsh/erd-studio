import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
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
import { Label } from '@/components/label/label';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/avatar/avatar';
import { useDialog } from '@/hooks/use-dialog';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/components/toast/use-toast';
import type { BaseDialogProps } from '../common/base-dialog-props';
import { useTranslation } from 'react-i18next';

const MAX_AVATAR_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export interface ProfileDialogProps extends BaseDialogProps {}

export const ProfileDialog: React.FC<ProfileDialogProps> = ({ dialog }) => {
    const { t } = useTranslation();
    const {
        user,
        signOut,
        uploadAvatar,
        updateProfileMetadata,
        changePasswordWithCurrentPassword,
    } = useAuth();
    const { closeProfileDialog } = useDialog();

    const [nickname, setNickname] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(
        null
    );
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    const objectUrlRef = useRef<string | null>(null);

    const metadata = useMemo(
        () => (user?.user_metadata as Record<string, unknown>) ?? {},
        [user]
    );
    const metadataNickname =
        typeof metadata.nickname === 'string' ? metadata.nickname : '';
    const metadataAvatarUrl =
        typeof metadata.avatar_url === 'string' ? metadata.avatar_url : '';

    const joinedAt = useMemo(() => {
        if (!user?.created_at) {
            return '-';
        }

        return new Date(user.created_at).toLocaleString();
    }, [user?.created_at]);

    useEffect(() => {
        if (!dialog.open) {
            return;
        }

        setNickname(metadataNickname);
        setAvatarFile(null);
        setAvatarPreviewUrl(null);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage(null);
    }, [dialog.open, metadataNickname]);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    const handleAvatarFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) {
                setAvatarFile(null);
                return;
            }

            if (!file.type.startsWith('image/')) {
                setErrorMessage(t('profile_dialog.errors.image_type'));
                event.target.value = '';
                return;
            }

            if (file.size > MAX_AVATAR_FILE_SIZE_BYTES) {
                setErrorMessage(t('profile_dialog.errors.image_size'));
                event.target.value = '';
                return;
            }

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }

            const objectUrl = URL.createObjectURL(file);
            objectUrlRef.current = objectUrl;

            setErrorMessage(null);
            setAvatarFile(file);
            setAvatarPreviewUrl(objectUrl);
        },
        [t]
    );

    const handleSave = useCallback(async () => {
        const normalizedNickname = nickname.trim();
        const wantsPasswordChange =
            currentPassword.length > 0 ||
            newPassword.length > 0 ||
            confirmPassword.length > 0;

        if (!normalizedNickname) {
            setErrorMessage(t('profile_dialog.errors.nickname_required'));
            return;
        }

        if (wantsPasswordChange) {
            if (!currentPassword) {
                setErrorMessage(
                    t('profile_dialog.errors.current_password_required')
                );
                return;
            }

            if (!newPassword) {
                setErrorMessage(
                    t('profile_dialog.errors.new_password_required')
                );
                return;
            }

            if (newPassword.length < 6) {
                setErrorMessage(t('profile_dialog.errors.new_password_length'));
                return;
            }

            if (newPassword !== confirmPassword) {
                setErrorMessage(
                    t('profile_dialog.errors.password_confirmation_mismatch')
                );
                return;
            }
        }

        setSaving(true);
        setErrorMessage(null);

        let avatarUploadFailed = false;
        let avatarUploadError: string | null = null;
        let avatarUrlToSave: string | undefined;

        try {
            if (avatarFile) {
                try {
                    avatarUrlToSave = await uploadAvatar(avatarFile);
                } catch (error) {
                    avatarUploadFailed = true;
                    avatarUploadError =
                        error instanceof Error
                            ? error.message
                            : 'Avatar upload failed.';
                }
            }

            await updateProfileMetadata({
                nickname: normalizedNickname,
                avatarUrl: avatarUrlToSave,
            });

            if (wantsPasswordChange) {
                try {
                    await changePasswordWithCurrentPassword({
                        currentPassword,
                        newPassword,
                    });
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: t(
                            'profile_dialog.toasts.password_update_failed.title'
                        ),
                        description:
                            error instanceof Error
                                ? t(
                                      'profile_dialog.toasts.password_update_failed.description_with_error',
                                      { error: error.message }
                                  )
                                : t(
                                      'profile_dialog.toasts.password_update_failed.description_without_error'
                                  ),
                    });
                    return;
                }
            }

            if (avatarUploadFailed) {
                toast({
                    variant: 'destructive',
                    title: t(
                        'profile_dialog.toasts.avatar_upload_failed.title'
                    ),
                    description:
                        avatarUploadError ??
                        t(
                            'profile_dialog.toasts.avatar_upload_failed.description_fallback'
                        ),
                });
            }

            toast({
                title: t('profile_dialog.toasts.profile_updated.title'),
                description: t(
                    'profile_dialog.toasts.profile_updated.description'
                ),
            });
            closeProfileDialog();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : t('profile_dialog.errors.update_failed')
            );
        } finally {
            setSaving(false);
        }
    }, [
        avatarFile,
        changePasswordWithCurrentPassword,
        closeProfileDialog,
        confirmPassword,
        currentPassword,
        newPassword,
        nickname,
        t,
        updateProfileMetadata,
        uploadAvatar,
    ]);

    const handleSignOut = useCallback(async () => {
        setSigningOut(true);
        setErrorMessage(null);

        try {
            await signOut();
            closeProfileDialog();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : t('profile_dialog.errors.signout_failed')
            );
        } finally {
            setSigningOut(false);
        }
    }, [closeProfileDialog, signOut, t]);

    const fallbackLabel = useMemo(() => {
        const value = nickname.trim() || metadataNickname || user?.email || '?';
        return value.slice(0, 1).toUpperCase();
    }, [metadataNickname, nickname, user?.email]);

    return (
        <Dialog
            {...dialog}
            onOpenChange={(open) => {
                if (!open) {
                    closeProfileDialog();
                }
            }}
        >
            <DialogContent
                className="flex h-[36rem] max-h-screen flex-col overflow-y-auto md:min-w-[36rem]"
                showClose
            >
                <DialogHeader>
                    <DialogTitle>{t('profile_dialog.title')}</DialogTitle>
                    <DialogDescription>
                        {t('profile_dialog.description')}
                    </DialogDescription>
                </DialogHeader>

                <DialogInternalContent>
                    <section className="space-y-4 p-1">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-14">
                                <AvatarImage
                                    src={avatarPreviewUrl ?? metadataAvatarUrl}
                                />
                                <AvatarFallback>{fallbackLabel}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                    {nickname.trim() || metadataNickname || '-'}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                    {user?.email ?? '-'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2 text-sm">
                            <p className="text-muted-foreground">
                                {t('profile_dialog.fields.email')}
                            </p>
                            <p className="truncate">{user?.email ?? '-'}</p>
                            <p className="text-muted-foreground">
                                {t('profile_dialog.fields.nickname')}
                            </p>
                            <p className="truncate">
                                {metadataNickname || '-'}
                            </p>
                            <p className="text-muted-foreground">
                                {t('profile_dialog.fields.joined')}
                            </p>
                            <p>{joinedAt}</p>
                        </div>

                        <Button
                            variant="secondary"
                            onClick={handleSignOut}
                            disabled={saving || signingOut}
                        >
                            {signingOut
                                ? t('profile_dialog.actions.logging_out')
                                : t('profile_dialog.actions.logout')}
                        </Button>
                    </section>

                    <section className="mt-6 space-y-4 p-1">
                        <div className="space-y-2">
                            <Label htmlFor="profile-avatar">
                                {t('profile_dialog.fields.profile_image')}
                            </Label>
                            <Input
                                id="profile-avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarFileChange}
                                disabled={saving || signingOut}
                            />
                            <p className="text-xs text-muted-foreground">
                                {t('profile_dialog.hints.profile_image')}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profile-nickname">
                                {t('profile_dialog.fields.nickname')}
                            </Label>
                            <Input
                                id="profile-nickname"
                                type="text"
                                value={nickname}
                                onChange={(event) =>
                                    setNickname(event.target.value)
                                }
                                disabled={saving || signingOut}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profile-current-password">
                                {t('profile_dialog.fields.current_password')}
                            </Label>
                            <Input
                                id="profile-current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(event) =>
                                    setCurrentPassword(event.target.value)
                                }
                                disabled={saving || signingOut}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profile-new-password">
                                {t('profile_dialog.fields.new_password')}
                            </Label>
                            <Input
                                id="profile-new-password"
                                type="password"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                disabled={saving || signingOut}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profile-confirm-password">
                                {t(
                                    'profile_dialog.fields.confirm_new_password'
                                )}
                            </Label>
                            <Input
                                id="profile-confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                disabled={saving || signingOut}
                            />
                        </div>
                    </section>

                    {errorMessage ? (
                        <p className="mt-4 p-1 text-sm text-red-500">
                            {errorMessage}
                        </p>
                    ) : null}
                </DialogInternalContent>

                <DialogFooter className="flex gap-1 md:justify-between">
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                            disabled={saving || signingOut}
                        >
                            {t('profile_dialog.actions.cancel')}
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSave}
                        disabled={saving || signingOut}
                    >
                        {saving
                            ? t('profile_dialog.actions.saving')
                            : t('profile_dialog.actions.save_changes')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
