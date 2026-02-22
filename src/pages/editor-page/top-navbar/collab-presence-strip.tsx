import React, { useEffect, useMemo, useState } from 'react';
import { useChartDB } from '@/hooks/use-chartdb';
import { useCollaboration } from '@/hooks/use-collaboration';
import { useAuth } from '@/hooks/use-auth';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/avatar/avatar';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/tooltip/tooltip';
import { useTranslation } from 'react-i18next';

export const CollabPresenceStrip: React.FC = () => {
    const { currentDiagram } = useChartDB();
    const { listPresence } = useCollaboration();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [participants, setParticipants] = useState<
        ReturnType<typeof listPresence>
    >([]);

    useEffect(() => {
        if (!currentDiagram.id) {
            setParticipants([]);
            return;
        }

        const sync = () => {
            const next = listPresence(currentDiagram.id)
                .filter((participant) => participant.userId !== user?.id)
                .sort((a, b) => b.updatedAt - a.updatedAt);
            setParticipants(next);
        };

        sync();
        const interval = window.setInterval(sync, 700);
        return () => clearInterval(interval);
    }, [currentDiagram.id, listPresence, user?.id]);

    const totalParticipants = useMemo(
        () => participants.length,
        [participants]
    );

    if (totalParticipants === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
                {t('collab_presence.online_count', {
                    count: totalParticipants,
                })}
            </span>
            <div className="flex items-center -space-x-2">
                {participants.slice(0, 5).map((participant) => {
                    const fallback = participant.nickname
                        .slice(0, 1)
                        .toUpperCase();
                    return (
                        <Tooltip key={participant.userId}>
                            <TooltipTrigger asChild>
                                <Avatar className="size-7 border border-background">
                                    <AvatarImage
                                        src={participant.avatarUrl ?? ''}
                                    />
                                    <AvatarFallback>{fallback}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                {participant.nickname} (
                                {t(`collab_presence.role.${participant.role}`)})
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
};
