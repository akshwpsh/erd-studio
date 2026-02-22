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
    y: number,
    schema?: string
): CrossingAwareLayoutNode => ({
    id,
    x,
    y,
    width: 220,
    height: 120,
    schema,
});

const positionsFromNodes = (nodes: CrossingAwareLayoutNode[]) => {
    return new Map(nodes.map((node) => [node.id, { x: node.x, y: node.y }]));
};

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

describe('crossing-aware-layout', () => {
    it('is deterministic for identical input', () => {
        const tables = [
            makeNode('a', 0, 0),
            makeNode('b', 0, 200),
            makeNode('c', 500, 0),
            makeNode('d', 500, 200),
        ];
        const edges: CrossingAwareLayoutEdge[] = [
            { id: 'e1', sourceId: 'a', targetId: 'd' },
            { id: 'e2', sourceId: 'b', targetId: 'c' },
            { id: 'e3', sourceId: 'a', targetId: 'c' },
        ];

        const first = createCrossingAwareLayout({
            tables,
            edges,
            mode: 'all',
        });
        const second = createCrossingAwareLayout({
            tables,
            edges,
            mode: 'all',
        });

        expect([...first.entries()]).toEqual([...second.entries()]);
    });

    it('reduces crossings on a crossing-prone graph', () => {
        const tables = [
            makeNode('a', 0, 0),
            makeNode('b', 0, 260),
            makeNode('c', 540, 0),
            makeNode('d', 540, 260),
        ];

        const edges: CrossingAwareLayoutEdge[] = [
            { id: 'e1', sourceId: 'a', targetId: 'd' },
            { id: 'e2', sourceId: 'b', targetId: 'c' },
        ];

        const beforeCrossings = countEdgeCrossingsFromPositions({
            tables,
            edges,
            positions: positionsFromNodes(tables),
        });

        const positions = createCrossingAwareLayout({
            tables,
            edges,
        });

        const afterCrossings = countEdgeCrossingsFromPositions({
            tables,
            edges,
            positions,
        });

        expect(beforeCrossings).toBeGreaterThan(0);
        expect(afterCrossings).toBeLessThan(beforeCrossings);
    });

    it('handles disconnected components and places all nodes', () => {
        const tables = [
            makeNode('a', 0, 0),
            makeNode('b', 220, 0),
            makeNode('c', 1200, 80),
            makeNode('d', 1460, 80),
            makeNode('e', 1720, 80),
        ];

        const edges: CrossingAwareLayoutEdge[] = [
            { id: 'e1', sourceId: 'a', targetId: 'b' },
            { id: 'e2', sourceId: 'c', targetId: 'd' },
            { id: 'e3', sourceId: 'd', targetId: 'e' },
        ];

        const positions = createCrossingAwareLayout({
            tables,
            edges,
            mode: 'all',
        });

        expect(positions.size).toBe(tables.length);

        tables.forEach((table) => {
            const pos = positions.get(table.id);
            expect(pos).toBeDefined();
            expect(Number.isFinite(pos!.x)).toBe(true);
            expect(Number.isFinite(pos!.y)).toBe(true);
        });
    });

    it('supports per-schema grouping with stable output', () => {
        const tables = [
            makeNode('public.users', 0, 0, 'public'),
            makeNode('public.posts', 200, 220, 'public'),
            makeNode('audit.logs', 1200, 40, 'audit'),
            makeNode('audit.events', 1400, 240, 'audit'),
        ];

        const edges: CrossingAwareLayoutEdge[] = [
            { id: 'e1', sourceId: 'public.users', targetId: 'public.posts' },
            { id: 'e2', sourceId: 'audit.logs', targetId: 'audit.events' },
        ];

        const positions = createCrossingAwareLayout({
            tables,
            edges,
            mode: 'perSchema',
        });

        expect(positions.size).toBe(4);
        const publicX = positions.get('public.users')!.x;
        const auditX = positions.get('audit.logs')!.x;
        expect(auditX).toBeGreaterThan(publicX);
    });

    it('reduces excessive vertical span for hub-like graphs', () => {
        const tables = Array.from({ length: 13 }, (_, index) => {
            return makeNode(`t${index}`, 100, index * 320);
        });

        const edges: CrossingAwareLayoutEdge[] = [];
        for (let index = 1; index < tables.length; index += 1) {
            edges.push({
                id: `e${index}`,
                sourceId: 't0',
                targetId: `t${index}`,
            });
        }

        const beforePositions = positionsFromNodes(tables);
        const before = getBoundsSize({
            tables,
            positions: beforePositions,
        });

        const afterPositions = createCrossingAwareLayout({
            tables,
            edges,
            mode: 'all',
        });
        const after = getBoundsSize({
            tables,
            positions: afterPositions,
        });

        expect(after.height).toBeLessThan(before.height);
    });
});
