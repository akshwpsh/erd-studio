import { useChartDB } from '@/hooks/use-chartdb';
import { useDialog } from '@/hooks/use-dialog';
import { useFullScreenLoader } from '@/hooks/use-full-screen-spinner';
import { useRedoUndoStack } from '@/hooks/use-redo-undo-stack';
import { useStorage } from '@/hooks/use-storage';
import type { Diagram } from '@/lib/domain/diagram';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useDiagramLoader = () => {
    const [initialDiagram, setInitialDiagram] = useState<Diagram | undefined>();
    const { diagramId } = useParams<{ diagramId: string }>();
    const { loadDiagram, currentDiagram } = useChartDB();
    const { resetRedoStack, resetUndoStack } = useRedoUndoStack();
    const { showLoader, hideLoader } = useFullScreenLoader();
    const { openCreateDiagramDialog, openOpenDiagramDialog } = useDialog();
    const { listDiagrams, storageInitStatus } = useStorage();

    const currentDiagramLoadingRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (storageInitStatus !== 'ready') {
            return;
        }

        if (diagramId && currentDiagram?.id === diagramId) {
            return;
        }

        const loadKey = diagramId ?? '';
        if (currentDiagramLoadingRef.current === loadKey) {
            return;
        }
        currentDiagramLoadingRef.current = loadKey;

        let cancelled = false;

        const loadDefaultDiagram = async () => {
            if (diagramId) {
                setInitialDiagram(undefined);
                showLoader();
                resetRedoStack();
                resetUndoStack();
                try {
                    const diagram = await loadDiagram(diagramId);
                    if (cancelled) {
                        return;
                    }

                    if (diagram) {
                        setInitialDiagram(diagram);
                        return;
                    }
                } finally {
                    hideLoader();
                }
            }

            const diagrams = await listDiagrams();
            if (cancelled) {
                return;
            }

            if (diagrams.length > 0) {
                openOpenDiagramDialog({ canClose: false });
            } else {
                openCreateDiagramDialog();
            }
        };

        void loadDefaultDiagram();

        return () => {
            cancelled = true;
            if (currentDiagramLoadingRef.current === loadKey) {
                currentDiagramLoadingRef.current = undefined;
            }
        };
    }, [
        storageInitStatus,
        diagramId,
        openCreateDiagramDialog,
        listDiagrams,
        loadDiagram,
        resetRedoStack,
        resetUndoStack,
        hideLoader,
        showLoader,
        currentDiagram?.id,
        openOpenDiagramDialog,
    ]);

    return { initialDiagram };
};
