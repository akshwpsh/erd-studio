import { describe, expect, it } from 'vitest';
import {
    countEdgeCrossingsFromPositions,
    createCrossingAwareLayout,
    type CrossingAwareLayoutEdge,
    type CrossingAwareLayoutNode,
} from '@/lib/layout/crossing-aware-layout';

const makeNode = (
    id: string,
    x: number,
    y: number
): CrossingAwareLayoutNode => ({
    id,
    x,
    y,
    width: 200,
    height: 120,
});

describe('crossing-aware-layout area behavior', () => {
    it('keeps tables inside provided bounds', () => {
        const tables = [
            makeNode('a', 40, 40),
            makeNode('b', 40, 320),
            makeNode('c', 520, 40),
            makeNode('d', 520, 320),
        ];

        const edges: CrossingAwareLayoutEdge[] = [
            { id: 'e1', sourceId: 'a', targetId: 'd' },
            { id: 'e2', sourceId: 'b', targetId: 'c' },
        ];

        const bounds = {
            x: 100,
            y: 100,
            width: 1200,
            height: 700,
        };

        const positions = createCrossingAwareLayout({
            tables,
            edges,
            bounds,
            mode: 'all',
        });

        tables.forEach((table) => {
            const pos = positions.get(table.id);
            expect(pos).toBeDefined();
            expect(pos!.x).toBeGreaterThanOrEqual(bounds.x);
            expect(pos!.y).toBeGreaterThanOrEqual(bounds.y);
            expect(pos!.x + table.width).toBeLessThanOrEqual(
                bounds.x + bounds.width
            );
            expect(pos!.y + table.height).toBeLessThanOrEqual(
                bounds.y + bounds.height
            );
        });
    });

    it('does not increase crossings compared to simple grid in area', () => {
        const tables = [
            makeNode('a', 0, 0),
            makeNode('b', 0, 220),
            makeNode('c', 420, 0),
            makeNode('d', 420, 220),
        ];

        const edges: CrossingAwareLayoutEdge[] = [
            { id: 'e1', sourceId: 'a', targetId: 'd' },
            { id: 'e2', sourceId: 'b', targetId: 'c' },
            { id: 'e3', sourceId: 'a', targetId: 'c' },
        ];

        const gridPositions = new Map(
            tables.map((table) => [table.id, { x: table.x, y: table.y }])
        );

        const beforeCrossings = countEdgeCrossingsFromPositions({
            tables,
            edges,
            positions: gridPositions,
        });

        const afterPositions = createCrossingAwareLayout({
            tables,
            edges,
            bounds: {
                x: 50,
                y: 50,
                width: 1200,
                height: 700,
            },
            mode: 'all',
        });

        const afterCrossings = countEdgeCrossingsFromPositions({
            tables,
            edges,
            positions: afterPositions,
        });

        expect(afterCrossings).toBeLessThanOrEqual(beforeCrossings);
    });
});
