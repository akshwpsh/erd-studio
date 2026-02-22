import React from 'react';
import ERDSLogoLight from '@/assets/brand/erds-logo-light.svg';
import ERDSLogoDark from '@/assets/brand/erds-logo-dark.svg';
import ERDSLogoMobile from '@/assets/brand/erds-logo-mobile.svg';
import ERDSLogoCompactLight from '@/assets/brand/erds-logo-compact-light.svg';
import ERDSLogoCompactDark from '@/assets/brand/erds-logo-compact-dark.svg';
import ERDSMark from '@/assets/brand/erds-mark.svg';
import { BRAND_SHORT } from '@/lib/brand';
import { cn } from '@/lib/utils';

export type BrandLogoVariant = 'app-nav' | 'sidebar' | 'page-nav' | 'mobile';

export interface BrandLogoProps extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'src' | 'alt'
> {
    variant: BrandLogoVariant;
    theme: 'light' | 'dark';
    showWordmark?: boolean;
    alt?: string;
}

const classByVariant: Record<BrandLogoVariant, string> = {
    'app-nav': 'h-8 w-auto',
    sidebar: 'h-7 w-auto',
    'page-nav': 'h-7 w-auto',
    mobile: 'h-7 w-auto',
};

const sourceByVariant = ({
    variant,
    theme,
    showWordmark,
}: {
    variant: BrandLogoVariant;
    theme: 'light' | 'dark';
    showWordmark: boolean;
}): string => {
    if (!showWordmark) {
        return ERDSMark;
    }

    if (variant === 'app-nav') {
        return theme === 'light' ? ERDSLogoCompactLight : ERDSLogoCompactDark;
    }

    if (variant === 'mobile') {
        return ERDSLogoMobile;
    }

    return theme === 'light' ? ERDSLogoLight : ERDSLogoDark;
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
    variant,
    theme,
    showWordmark = true,
    alt = BRAND_SHORT,
    className,
    ...imgProps
}) => {
    const source = sourceByVariant({
        variant,
        theme,
        showWordmark,
    });

    return (
        <img
            src={source}
            alt={alt}
            className={cn(classByVariant[variant], 'select-none', className)}
            {...imgProps}
        />
    );
};
