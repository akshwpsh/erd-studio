import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_HOST, BRAND_FULL, BRAND_SHORT } from '@/lib/brand';

export const HelmetData: React.FC = () => (
    <Helmet>
        <meta
            name="description"
            content="Free and Open-source database diagrams editor, visualize and design your database with a single query. Tool to help you draw your DB relationship diagrams and export DDL scripts."
        />
        <meta property="og:type" content="website" />
        <meta
            property="og:title"
            content={`${BRAND_SHORT} - Database schema diagrams visualizer`}
        />
        <meta
            property="og:description"
            content="Free and Open-source database diagrams editor, visualize and design your database with a single query. Tool to help you draw your DB relationship diagrams and export DDL scripts."
        />
        <meta property="og:image" content={`${APP_HOST}/erds.png`} />
        <meta property="og:url" content={APP_HOST} />
        <meta property="og:site_name" content={BRAND_FULL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
            name="twitter:title"
            content={`${BRAND_SHORT} - Database schema diagrams visualizer`}
        />
        <meta
            name="twitter:description"
            content="Free and Open-source database diagrams editor, visualize and design your database with a single query. Tool to help you draw your DB relationship diagrams and export DDL scripts."
        />
        <meta name="twitter:image" content={`${APP_HOST}/erds.png`} />
        <title>{`${BRAND_SHORT} - Database schema diagrams visualizer`}</title>
    </Helmet>
);
