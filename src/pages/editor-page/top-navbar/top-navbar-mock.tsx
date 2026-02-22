import React from 'react';

import { useTheme } from '@/hooks/use-theme';
import { BrandLogo } from '@/components/brand/brand-logo';

export const TopNavbarMock: React.FC = () => {
    const { effectiveTheme } = useTheme();
    return (
        <nav className="flex h-[105px] flex-col justify-between border-b px-3 md:h-12 md:flex-row md:items-center md:px-4">
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
            </div>
        </nav>
    );
};
