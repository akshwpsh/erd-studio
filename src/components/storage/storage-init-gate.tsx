import React, { useState } from 'react';
import { useStorage } from '@/hooks/use-storage';
import { Spinner } from '@/components/spinner/spinner';
import { Button } from '@/components/button/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert/alert';

export const StorageInitGate: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const { storageInitStatus, storageInitError, retryStorageInitialization } =
        useStorage();
    const [retrying, setRetrying] = useState(false);

    if (storageInitStatus === 'ready') {
        return <>{children}</>;
    }

    if (storageInitStatus === 'error') {
        return (
            <section className="flex min-h-dvh w-screen items-center justify-center bg-background px-4">
                <div className="flex w-full max-w-md flex-col gap-4">
                    <Alert variant="destructive">
                        <AlertTitle>
                            Cloud storage initialization failed
                        </AlertTitle>
                        <AlertDescription>
                            {storageInitError ??
                                'Could not connect to Supabase. Please retry.'}
                        </AlertDescription>
                    </Alert>
                    <Button
                        onClick={async () => {
                            if (retrying) {
                                return;
                            }

                            setRetrying(true);
                            try {
                                await retryStorageInitialization();
                            } finally {
                                setRetrying(false);
                            }
                        }}
                        disabled={retrying}
                    >
                        {retrying ? 'Retrying...' : 'Retry initialization'}
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="flex h-dvh w-screen items-center justify-center bg-background">
            <Spinner size="large" />
        </section>
    );
};
