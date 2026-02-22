import React, { useCallback } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { BrandLogo } from '@/components/brand/brand-logo';
import { DiagramName } from './diagram-name';
import { LastSaved } from './last-saved';
import { LanguageNav } from './language-nav/language-nav';
import { Menu } from './menu/menu';
import { CollabPresenceStrip } from './collab-presence-strip';
import { ShareButton } from './share-button';

export interface TopNavbarProps {}

export const TopNavbar: React.FC<TopNavbarProps> = () => {
    const { effectiveTheme } = useTheme();

    const renderStars = useCallback(() => {
        return (
            <iframe
                src={`https://ghbtns.com/github-btn.html?user=akshwpsh&repo=erd-studio&type=star&size=large&text=false`}
                width="40"
                height="30"
                title="GitHub"
            ></iframe>
        );
    }, []);

    return (
        <nav className="flex flex-col justify-between border-b px-3 md:h-12 md:flex-row md:items-center md:px-4">
            <div className="flex flex-1 flex-col justify-between gap-x-1 md:flex-row md:items-center md:justify-start md:gap-x-0.5">
                <div className="flex shrink-0 items-center justify-start pt-[8px] font-primary md:py-0">
                    <div className="inline-flex">
                        <BrandLogo
                            variant="app-nav"
                            theme={effectiveTheme}
                            className="h-6"
                        />
                    </div>
                </div>
                <Menu />
            </div>
            <DiagramName />
            <div className="hidden flex-1 items-center justify-end gap-2 sm:flex">
                <CollabPresenceStrip />
                <LastSaved />
                {renderStars()}
                <ShareButton />
                <LanguageNav />
            </div>
        </nav>
    );
};
