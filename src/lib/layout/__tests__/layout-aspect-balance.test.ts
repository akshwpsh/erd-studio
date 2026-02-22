import { describe, expect, it } from 'vitest';
import {
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
    width: 220,
    height: 120,
});

const getBoundsSize = ({
    tables,
    positions,
}: {
    tables: CrossingAwareLayoutNode[];
    positions: Map<string, { x: number; y: number }>;
}) => {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    tables.forEach((table) => {
        const pos = positions.get(table.id);
        if (!pos) return;
        minX = Math.min(minX, pos.x);
        minY = Math.min(minY, pos.y);
        maxX = Math.max(maxX, pos.x + table.width);
        maxY = Math.max(maxY, pos.y + table.height);
    });

    return {
        width: maxX - minX,
        height: maxY - minY,
    };
};

describe('layout aspect balance', () => {
    it('keeps width/height ratio above a minimum threshold for elongated hubs', () => {
        const tables = [
            makeNode('core', 120, 0),
            ...Array.from({ length: 14 }, (_, index) =>
                makeNode(`leaf_${index}`, 120, (index + 1) * 280)
            ),
        ];

        const edges: CrossingAwareLayoutEdge[] = tables
            .slice(1)
            .map((table, index) => ({
                id: `e_${index}`,
                sourceId: 'core',
                targetId: table.id,
            }));

        const positions = createCrossingAwareLayout({
            tables,
            edges,
            mode: 'all',
        });

        const bounds = getBoundsSize({ tables, positions });
        const ratio = bounds.width / Math.max(bounds.height, 1);

        expect(ratio).toBeGreaterThanOrEqual(1.3);
    });
});
