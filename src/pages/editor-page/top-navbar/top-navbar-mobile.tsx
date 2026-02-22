import React, { useCallback } from 'react';
import { DiagramName } from './diagram-name';
import { LanguageNav } from './language-nav/language-nav';
import { Menu } from './menu/menu';
import { Button } from '@/components/button/button';
import { useSidebar } from '@/components/sidebar/use-sidebar';
import { MenuIcon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { BrandLogo } from '@/components/brand/brand-logo';
import { ShareButton } from './share-button';

export interface TopNavbarMobileProps {}

export const TopNavbarMobile: React.FC<TopNavbarMobileProps> = () => {
    const { effectiveTheme } = useTheme();
    const renderStars = useCallback(() => {
        return (
            <iframe
                src="https://ghbtns.com/github-btn.html?user=akshwpsh&repo=erd-studio&type=star&size=small&text=false"
                width="25"
                height="20"
                title="GitHub"
            ></iframe>
        );
    }, []);

    const { toggleSidebar } = useSidebar();

    return (
        <nav className="flex flex-col justify-between border-b px-3 md:h-12 md:flex-row md:items-center md:px-4">
            <div className="flex flex-1 flex-col justify-between gap-x-1 md:flex-row md:items-center md:justify-normal">
                <div className="flex items-center justify-between pt-[10px] font-primary md:py-0">
                    <div className="flex items-center gap-2">
                        <Button
                            size={'icon'}
                            variant="ghost"
                            onClick={toggleSidebar}
                        >
                            <MenuIcon className="size-5" />
                        </Button>
                        <div className="inline-flex">
                            <BrandLogo
                                variant="mobile"
                                theme={effectiveTheme}
                                className="h-6"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {renderStars()}
                        <ShareButton />
                        <LanguageNav />
                    </div>
                </div>
                <Menu />
            </div>

            <div className="flex flex-1 justify-center pb-3 pt-1.5">
                <DiagramName />
            </div>
        </nav>
    );
};
