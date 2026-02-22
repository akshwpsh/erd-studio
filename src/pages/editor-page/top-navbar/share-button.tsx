import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/button/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/tooltip/tooltip';
import { useChartDB } from '@/hooks/use-chartdb';
import { useDialog } from '@/hooks/use-dialog';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export interface ShareButtonProps {
    className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ className }) => {
    const { currentDiagram } = useChartDB();
    const { openShareDiagramDialog } = useDialog();
    const { t } = useTranslation();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className={cn('size-6 rounded-full md:size-8', className)}
                    onClick={() => openShareDiagramDialog()}
                    disabled={!currentDiagram.id}
                    aria-label={t('top_nav.share_tooltip')}
                >
                    <Share2 className="size-3.5 md:size-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>{t('top_nav.share_tooltip')}</TooltipContent>
        </Tooltip>
    );
};
